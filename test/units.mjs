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
