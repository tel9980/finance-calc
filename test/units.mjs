/* 计算单测：用「教科书公式」独立算一遍期望值，再和页面输出对。
   和 regress 的区别：regress 是拿今天的输出和昨天比（只防改坏），这里是对着公式比（能抓一直就错的）。
   用法：node test/units.mjs [url] */
import { chromium } from 'playwright';

const BASE = process.argv.find(a => a.startsWith('http')) || 'http://127.0.0.1:8099/';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const errs = [];
page.on('pageerror', e => errs.push('PE:' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CE:' + m.text().slice(0, 120)); });

const bad = [];
const ok = (cond, msg) => { if (!cond) bad.push(msg); };
const near = (a, b, tol) => Math.abs(a - b) <= tol;

/* 把页面上的 "1,000,000.00 元" / "11.50%" / "360 期（30 年）" 拆成数字 */
const numOf = s => {
  const clean = String(s).replace(/,/g, '');
  const m = clean.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
};

await page.goto(BASE, { waitUntil: 'load' });
await page.waitForTimeout(600);

const open = async tab => {
  await page.goto(BASE + '#' + tab, { waitUntil: 'load' });
  for (let i = 0; i < 40; i++) {
    const ready = await page.evaluate(id => {
      const p = document.getElementById('panel-' + id);
      return !!(p && p.classList.contains('is-on') && p.querySelector('.big strong'));
    }, tab);
    if (ready) break;
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(250);
};
/* 填一个字段就会触发该面板重算（app 里是 input 委托） */
const fill = async (id, v) => {
  await page.fill('#' + id, String(v));
  await page.waitForTimeout(120);
};
const pick = async (id, v) => {          /* 下拉不触发重算，改完再戳一下输入框 */
  await page.selectOption('#' + id, v);
  await page.waitForTimeout(100);
  const firstInput = await page.evaluate(() => {
    const p = document.querySelector('.panel.is-on');
    const el = p && p.querySelector('input.num, input[type="number"], input[type="text"]');
    if (el) el.dispatchEvent(new Event('input', { bubbles: true }));
    return !!el;
  });
  await page.waitForTimeout(200);
  return firstInput;
};
const txt = id => page.textContent('#' + id);

/* ── 1. 贷款：等额本息月供（PMT 公式） ───────────────────────── */
await open('loan');
await pick('ln-method', 'equal-payment');
await fill('ln-principal', 1000000);
await fill('ln-rate', 4.2);
await fill('ln-years', 30);
{
  const P = 1000000, i = 0.042 / 12, n = 360;
  const g = Math.pow(1 + i, n);
  const pmt = P * i * g / (g - 1);          // 教科书：P·i·(1+i)^n / ((1+i)^n − 1)
  const pay = numOf(await txt('ln-pay'));
  const total = numOf(await txt('ln-total'));
  const interest = numOf(await txt('ln-interest'));
  ok(near(pay, pmt, 0.02), '等额本息月供应为 ' + pmt.toFixed(2) + '，页面是 ' + pay);
  ok(near(total, pmt * n, 5), '等额本息还款总额应约 ' + (pmt * n).toFixed(2) + '，页面是 ' + total);
  ok(near(interest, pmt * n - P, 5), '等额本息总利息应约 ' + (pmt * n - P).toFixed(2) + '，页面是 ' + interest);
  ok(near(numOf(await txt('ln-ratio')), (pmt * n - P) / P * 100, 0.02), '利息占比不对：' + await txt('ln-ratio'));
}

/* ── 2. 贷款：等额本金（首月 + 总利息 n·P·i·(n+1)/2） ─────────── */
await pick('ln-method', 'equal-principal');
await fill('ln-principal', 600000);
await fill('ln-rate', 4.9);
await fill('ln-years', 20);
{
  const P = 600000, i = 0.049 / 12, n = 240;
  const first = P / n + P * i;                  // 首月＝本金均摊＋全额利息
  const totalInterest = P * i * (n + 1) / 2;    // 等差数列求和
  const pay = numOf(await txt('ln-pay'));
  const interest = numOf(await txt('ln-interest'));
  ok(near(pay, first, 0.02), '等额本金首月应还 ' + first.toFixed(2) + '，页面是 ' + pay);
  ok(near(interest, totalInterest, 5), '等额本金总利息应约 ' + totalInterest.toFixed(2) + '，页面是 ' + interest);
}

/* ── 3. 复利：期初/期末年金终值 ─────────────────────────────── */
await open('compound');
await fill('cp-start', 100000);
await fill('cp-monthly', 2000);
await fill('cp-rate', 5);
await fill('cp-years', 10);
const fvOf = (P0, pmt, r, years, begin) => {
  const i = r / 12, n = years * 12, g = Math.pow(1 + i, n);
  return P0 * g + (i === 0 ? pmt * n : pmt * (g - 1) / i * (begin ? 1 + i : 1));
};
{
  const end = fvOf(100000, 2000, 0.05, 10, false);
  const begin = fvOf(100000, 2000, 0.05, 10, true);
  const fvEnd = numOf(await txt('cp-fv'));
  ok(near(fvEnd, end, 0.05), '期末投入终值应为 ' + end.toFixed(2) + '，页面是 ' + fvEnd);
  ok(near(numOf(await txt('cp-cost')), 100000 + 2000 * 120, 0.02), '本金投入合计应为 340,000，页面是 ' + await txt('cp-cost'));
  await pick('cp-timing', 'begin');
  const fvBegin = numOf(await txt('cp-fv'));
  ok(near(fvBegin, begin, 0.05), '期初投入终值应为 ' + begin.toFixed(2) + '，页面是 ' + fvBegin);
  ok(fvBegin > fvEnd, '期初投入应比期末多，实际 ' + fvBegin + ' vs ' + fvEnd);
  /* 零利率：终值就该等于本金合计 */
  await fill('cp-rate', 0);
  ok(near(numOf(await txt('cp-fv')), 340000, 0.02), '零利率终值应等于 340,000，页面是 ' + await txt('cp-fv'));
  ok(near(numOf(await txt('cp-gain')), 0, 0.02), '零利率收益应为 0，页面是 ' + await txt('cp-gain'));
}

/* ── 4. 发票税额：含税 113,000 / 13%，附加 12% ──────────────── */
await open('vat');
await pick('vt-mode', 'gross');
await fill('vt-amount', 113000);
await pick('vt-rate', '0.13');
await fill('vt-surtax', 12);
{
  const gross = 113000, rate = 0.13;
  const net = gross / (1 + rate), vat = gross - net, sur = vat * 0.12;
  ok(near(numOf(await txt('vt-net')), net, 0.02), '不含税金额应为 ' + net.toFixed(2) + '，页面是 ' + await txt('vt-net'));
  ok(near(numOf(await txt('vt-vat')), vat, 0.02), '税额应为 ' + vat.toFixed(2) + '，页面是 ' + await txt('vt-vat'));
  ok(near(numOf(await txt('vt-surtax-amt')), sur, 0.02), '附加税费应为 ' + sur.toFixed(2) + '，页面是 ' + await txt('vt-surtax-amt'));
  ok(near(numOf(await txt('vt-total-tax')), vat + sur, 0.02), '税额合计应为 ' + (vat + sur).toFixed(2) + '，页面是 ' + await txt('vt-total-tax'));
  ok(near(numOf(await txt('vt-share')), vat / gross * 100, 0.02), '税额占比应为 11.50%，页面是 ' + await txt('vt-share'));
}

/* ── 5. 应纳增值税：销项−进项−留抵，附加按实际缴纳计征 ───────── */
await open('vatdue');
await fill('vd-out', 52000);
await fill('vd-in', 31000);
await fill('vd-carry', 2000);
await fill('vd-sales', 400000);
await fill('vd-urban', 7);
await fill('vd-edu', 3);
await fill('vd-local', 2);
{
  const due = 52000 - 31000 - 2000, sur = due * (0.07 + 0.03 + 0.02);
  ok(near(numOf(await txt('vd-due')), due, 0.02), '应纳增值税应为 ' + due + '，页面是 ' + await txt('vd-due'));
  ok(near(numOf(await txt('vd-surtax')), sur, 0.02), '附加税费应为 ' + sur.toFixed(2) + '，页面是 ' + await txt('vd-surtax'));
  ok(near(numOf(await txt('vd-total')), due + sur, 0.02), '合计应为 ' + (due + sur).toFixed(2) + '，页面是 ' + await txt('vd-total'));
  ok(near(numOf(await txt('vd-burden')), due / 400000 * 100, 0.02), '税负率应为 4.75%，页面是 ' + await txt('vd-burden'));
  /* 进项大于销项：应为留抵，应纳为 0，不产生附加 */
  await fill('vd-in', 60000);   /* 52,000 − 60,000 − 2,000 = −10,000 → 留抵 */
  ok(near(numOf(await txt('vd-due')), 0, 0.001), '留抵时应纳增值税应为 0，页面是 ' + await txt('vd-due'));
  ok(near(numOf(await txt('vd-left')), 10000, 0.02), '留抵应为 10,000，页面是 ' + await txt('vd-left'));
  ok(near(numOf(await txt('vd-surtax')), 0, 0.001), '留抵时附加税费应为 0，页面是 ' + await txt('vd-surtax'));
}

/* ── 7. 存款利息：单利、年复利、月复利 ─────────────────────── */
await open('deposit');
await pick('dp-unit', 'year');
await pick('dp-mode', 'simple');
await fill('dp-principal', 100000);
await fill('dp-rate', 3);
await fill('dp-term', 3);
{
  const P = 100000, r = 0.03, y = 3;
  ok(near(numOf(await txt('dp-interest')), P * r * y, 0.02), '单利利息应为 9,000，页面是 ' + await txt('dp-interest'));
  ok(near(numOf(await txt('dp-total')), P * (1 + r * y), 0.02), '单利本息应为 109,000，页面是 ' + await txt('dp-total'));
  await pick('dp-mode', 'year');
  ok(near(numOf(await txt('dp-interest')), P * (Math.pow(1 + r, y) - 1), 0.02), '年复利利息应为 ' + (P * (Math.pow(1 + r, y) - 1)).toFixed(2) + '，页面是 ' + await txt('dp-interest'));
  await pick('dp-mode', 'month');
  const i = r / 12, n = y * 12;
  ok(near(numOf(await txt('dp-interest')), P * (Math.pow(1 + i, n) - 1), 0.02), '月复利利息应为 ' + (P * (Math.pow(1 + i, n) - 1)).toFixed(2) + '，页面是 ' + await txt('dp-interest'));
  /* 实际年化 = (本息/本金)^(1/年数) − 1，月复利下约 3.04% */
  ok(near(numOf(await txt('dp-real')), (Math.pow(1 + i, 12) - 1) * 100, 0.02), '实际年化应为 ' + ((Math.pow(1 + i, 12) - 1) * 100).toFixed(3) + '%，页面是 ' + await txt('dp-real'));
}

/* ── 8. 年化收益：复利年化（CAGR）与单利年化 ───────────────── */
await open('annual');
await fill('an-start', 100000);
await fill('an-end', 120000);
await fill('an-days', 730);
{
  const ret = 0.2, days = 730;
  ok(near(numOf(await txt('an-return')), ret * 100, 0.02), '持有收益率应为 20%，页面是 ' + await txt('an-return'));
  ok(near(numOf(await txt('an-cagr')), (Math.pow(1.2, 365 / days) - 1) * 100, 0.02), '复利年化应为 9.54%，页面是 ' + await txt('an-cagr'));
  ok(near(numOf(await txt('an-simple')), ret * 365 / days * 100, 0.02), '单利年化应为 10%，页面是 ' + await txt('an-simple'));
  ok(near(numOf(await txt('an-yeargain')), 100000 * (Math.pow(1.2, 365 / days) - 1), 0.02), '年化收益额应为 ' + (100000 * (Math.pow(1.2, 365 / days) - 1)).toFixed(2) + '，页面是 ' + await txt('an-yeargain'));
}

/* ── 9. 通胀：购买力缩水 / 未来所需 ────────────────────────── */
await open('inflation');
await fill('if-amount', 100000);
await fill('if-rate', 3);
await fill('if-years', 10);
{
  const f = Math.pow(1.03, 10);
  ok(near(numOf(await txt('if-power')), 100000 / f, 0.02), '10 年后购买力应为 ' + (100000 / f).toFixed(2) + '，页面是 ' + await txt('if-power'));
  ok(near(numOf(await txt('if-need')), 100000 * f, 0.02), '届时所需金额应为 ' + (100000 * f).toFixed(2) + '，页面是 ' + await txt('if-need'));
  ok(near(numOf(await txt('if-loss')), (1 - 1 / f) * 100, 0.02), '购买力跌幅应为 ' + ((1 - 1 / f) * 100).toFixed(2) + '%，页面是 ' + await txt('if-loss'));
}

/* ── 10. 组合贷：两笔并行，月供相加 ────────────────────────── */
await open('combo');
await fill('cb-commercial', 700000);
await fill('cb-commercial-rate', 4.2);
await fill('cb-fund', 300000);
await fill('cb-fund-rate', 3.1);
await fill('cb-years', 25);
{
  const n = 300;
  const pmt = (P, r) => { const i = r / 12, g = Math.pow(1 + i, n); return P * i * g / (g - 1); };
  const cP = pmt(700000, 0.042), fP = pmt(300000, 0.031);
  ok(near(numOf(await txt('cb-c-pay')), cP, 0.05), '商贷月供应为 ' + cP.toFixed(2) + '，页面是 ' + await txt('cb-c-pay'));
  ok(near(numOf(await txt('cb-f-pay')), fP, 0.05), '公积金月供应为 ' + fP.toFixed(2) + '，页面是 ' + await txt('cb-f-pay'));
  ok(near(numOf(await txt('cb-pay')), cP + fP, 0.05), '组合月供应为 ' + (cP + fP).toFixed(2) + '，页面是 ' + await txt('cb-pay'));
  ok(near(numOf(await txt('cb-interest')), (cP + fP) * n - 1000000, 1), '组合贷总利息应为 ' + ((cP + fP) * n - 1000000).toFixed(2) + '，页面是 ' + await txt('cb-interest'));
}

/* ── 11. 阶梯储蓄：三份各 1/2/3 年，利息相加 ───────────────── */
await open('ladder');
await fill('ld-total', 300000);
await fill('ld-r1', 1.5);
await fill('ld-r2', 2.1);
await fill('ld-r3', 2.75);
{
  const part = 100000, i1 = part * 0.015, i2 = part * 0.021 * 2, i3 = part * 0.0275 * 3, sum = i1 + i2 + i3;
  ok(near(numOf(await txt('ld-part')), part, 0.02), '每份应为 100,000，页面是 ' + await txt('ld-part'));
  ok(near(numOf(await txt('ld-int')), sum, 0.05), '三年累计利息应为 ' + sum.toFixed(2) + '，页面是 ' + await txt('ld-int'));
  ok(near(numOf(await txt('ld-all')), 300000 * 0.0275 * 3, 0.05), '全存三年的利息应为 24,750，页面是 ' + await txt('ld-all'));
  ok(near(numOf(await txt('ld-avg')), sum / 300000 / 3 * 100, 0.02), '平均年化应为 ' + (sum / 300000 / 3 * 100).toFixed(3) + '%，页面是 ' + await txt('ld-avg'));
}

/* ── 12. 攒钱目标：到目标要几个月 ──────────────────────────── */
await open('goal');
await fill('gl-target', 1000000);
await fill('gl-start', 100000);
await fill('gl-monthly', 5000);
await fill('gl-rate', 4);
{
  const i = 0.04 / 12; let m = -1;
  for (let k = 1; k <= 1200; k++) {
    const fv = 100000 * Math.pow(1 + i, k) + 5000 * ((Math.pow(1 + i, k) - 1) / i);
    if (fv >= 1000000) { m = k; break; }
  }
  const cost = 100000 + 5000 * m;
  ok(near(numOf(await txt('gl-cost')), cost, 1), '投入合计应为 ' + cost + '（' + m + ' 个月），页面是 ' + await txt('gl-cost'));
  ok((await txt('gl-time')).indexOf('年') >= 0, '到目标时间应给出年数，页面是 ' + await txt('gl-time'));
}

/* ── 13. FIRE：目标资产 = 年支出 ÷ 提取率 ──────────────────── */
await open('fire');
await fill('fr-exp', 10000);
await fill('fr-has', 100000);
await fill('fr-save', 5000);
await fill('fr-rate', 5);
await fill('fr-swr', 4);
{
  const target = 10000 * 12 / 0.04;
  ok(near(numOf(await txt('fr-target')), target, 1), 'FIRE 目标应为 ' + target.toLocaleString('zh-CN') + '，页面是 ' + await txt('fr-target'));
  ok(near(numOf(await txt('fr-gap')), target - 100000, 1), '还差金额应为 ' + (target - 100000).toLocaleString('zh-CN') + '，页面是 ' + await txt('fr-gap'));
}

/* ── 14. 应急金：月数规则（基础 3 + 房贷 1 + 养娃 1） ──────── */
await open('emergency');
await fill('em-exp', 8000);
await pick('em-stab', 'normal');
await pick('em-loan', '1');
await pick('em-kid', '1');
{
  ok(near(numOf(await txt('em-target')), 8000 * 5, 1), '应急金目标应为 40,000（5 个月），页面是 ' + await txt('em-target'));
  ok((await txt('em-months')).indexOf('5') >= 0, '月数说明里应有 5 个月，页面是 ' + await txt('em-months'));
}

/* ── 15. 盈亏平衡：边际贡献与保本量 ────────────────────────── */
await open('breakeven');
await fill('be-price', 100);
await fill('be-vc', 60);
await fill('be-fc', 50000);
await fill('be-target', 20000);
await fill('be-qty', 2000);
{
  ok(near(numOf(await txt('be-cm')), 40, 0.02), '单位边际贡献应为 40，页面是 ' + await txt('be-cm'));
  ok(near(numOf(await txt('be-cmr')), 40, 0.02), '边际贡献率应为 40%，页面是 ' + await txt('be-cmr'));
  ok(near(numOf(await txt('be-bep')), 1250, 0.5), '保本量应为 1,250 件，页面是 ' + await txt('be-bep'));
  ok(near(numOf(await txt('be-profit')), 2000 * 40 - 50000, 0.5), '销量 2000 时利润应为 30,000，页面是 ' + await txt('be-profit'));
  ok(near(numOf(await txt('be-mos')), (2000 - 1250) / 2000 * 100, 0.02), '安全边际率应为 37.50%，页面是 ' + await txt('be-mos'));
}

/* ── 16. 财务比率：毛利率 / 净利率 / 流动 / 速动 / 负债率 / ROE ── */
await open('ratios');
await fill('rt-rev', 1000000);
await fill('rt-cogs', 600000);
await fill('rt-np', 120000);
await fill('rt-ca', 500000);
await fill('rt-inv', 150000);
await fill('rt-ar', 100000);
await fill('rt-cl', 250000);
await fill('rt-ta', 800000);
await fill('rt-tl', 300000);
await fill('rt-eq', 500000);
{
  ok(near(numOf(await txt('rt-gm')), 40, 0.02), '毛利率应为 40%，页面是 ' + await txt('rt-gm'));
  ok(near(numOf(await txt('rt-nm')), 12, 0.02), '净利率应为 12%，页面是 ' + await txt('rt-nm'));
  ok(near(numOf(await txt('rt-cr')), 2, 0.01), '流动比率应为 2.00，页面是 ' + await txt('rt-cr'));
  ok(near(numOf(await txt('rt-qr')), 1.4, 0.01), '速动比率应为 1.40（存货不计），页面是 ' + await txt('rt-qr'));
  ok(near(numOf(await txt('rt-lev')), 37.5, 0.02), '资产负债率应为 37.5%，页面是 ' + await txt('rt-lev'));
  ok(near(numOf(await txt('rt-roa')), 15, 0.02), '总资产收益率应为 15%，页面是 ' + await txt('rt-roa'));
  ok(near(numOf(await txt('rt-roe')), 24, 0.02), 'ROE 应为 24%，页面是 ' + await txt('rt-roe'));
}

/* ── 17. 折旧：直线法月折旧 = (原值 − 残值) ÷ 年限 ÷ 12 ────── */
await open('deprec');
await pick('fa-method', 'straight');
await fill('fa-cost', 100000);
await fill('fa-res', 5);
await fill('fa-life', 5);
{
  const base = 100000 * 0.95;
  ok(near(numOf(await txt('fa-month')), base / 5 / 12, 0.02), '直线法月折旧应为 ' + (base / 5 / 12).toFixed(2) + '，页面是 ' + await txt('fa-month'));
  ok(near(numOf(await txt('fa-year')), base / 5, 0.02), '直线法年折旧应为 19,000，页面是 ' + await txt('fa-year'));
  await pick('fa-method', 'syd');
  ok(near(numOf(await txt('fa-year')), base * 5 / 15, 0.02), '年数总和法首年折旧应为 ' + (base * 5 / 15).toFixed(2) + '，页面是 ' + await txt('fa-year'));
  await pick('fa-method', 'ddb');
  ok(near(numOf(await txt('fa-year')), 100000 * 0.4, 0.02), '双倍余额法首年折旧应为 40,000，页面是 ' + await txt('fa-year'));
}

/* ── 18. 分账：总额加手续费再人均 ──────────────────────────── */
await open('split');
await fill('sp-total', 1000);
await fill('sp-people', 3);
await fill('sp-fee', 10);
await pick('sp-who', 'all');
{
  const gross = 1100, each = gross / 3;
  ok(near(numOf(await txt('sp-gross')), gross, 0.02), '含手续费总额应为 1,100，页面是 ' + await txt('sp-gross'));
  ok(near(numOf(await txt('sp-fee-amt')), 100, 0.02), '手续费应为 100，页面是 ' + await txt('sp-fee-amt'));
  ok(near(numOf(await txt('sp-each')), each, 0.02), '人均应为 ' + each.toFixed(2) + '，页面是 ' + await txt('sp-each'));
}

/* ── 19. 全量冒烟：228 个模块点「示例」后不许出现 NaN / undefined ── */
{
  const tabs = await page.evaluate(() => [...document.querySelectorAll('#tabs .tab')].map(e => e.dataset.tab));
  const dirty = [];
  for (const t of tabs) {
    await open(t);
    await page.click('#btn-demo').catch(() => {});
    await page.waitForTimeout(120);
    const bad = await page.evaluate(id => {
      const p = document.getElementById('panel-' + id);
      if (!p) return 'panel missing';
      const s = p.textContent || '';
      if (/NaN|undefined|Infinity/.test(s)) return (s.match(/.{0,14}(NaN|undefined|Infinity).{0,14}/) || [''])[0];
      return '';
    }, t);
    if (bad) dirty.push(t + ': ' + bad.replace(/\s+/g, ' '));
  }
  ok(dirty.length === 0, '示例值下出现 NaN/undefined 的模块：' + dirty.join(' | '));
}

/* ── 6. 打印口径：负数/空值不该算出 NaN ─────────────────────── */
await open('loan');
await fill('ln-principal', 0);
ok((await txt('ln-pay')).indexOf('NaN') < 0, '本金填 0 时月供出现了 NaN：' + await txt('ln-pay'));
await fill('ln-principal', 1000000);
await fill('ln-rate', -5);
ok((await txt('ln-pay')).indexOf('NaN') < 0, '利率填负数时月供出现了 NaN：' + await txt('ln-pay'));

const realErrs = errs;
ok(realErrs.length === 0, '控制台报错：' + realErrs.join(' | '));
console.log(bad.length ? '❌ 计算单测失败：\n- ' + bad.join('\n- ') : '✅ 计算单测全部通过（对照教科书公式）');
await browser.close();
process.exit(bad.length ? 1 : 0);
