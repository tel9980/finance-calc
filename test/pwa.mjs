/* 装到主屏（PWA）回归：manifest 完整、iOS 指引、隐藏规则、装好后断网也能算。
   用法：node test/pwa.mjs [url] */
import { chromium } from 'playwright';

const BASE = process.argv.find(a => a.startsWith('http')) || 'http://127.0.0.1:8099/';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const bad = [];
const ok = (cond, msg) => { if (!cond) bad.push(msg); };

/* ---------- 1. manifest 与图标/截图是否齐 ---------- */
const ctx1 = await browser.newContext();
const p1 = await ctx1.newPage();
const errs = [];
p1.on('pageerror', e => errs.push('PE:' + e.message));
p1.on('console', m => { if (m.type() === 'error') errs.push('CE:' + m.text().slice(0, 120)); });
await p1.goto(BASE, { waitUntil: 'load' });

const man = await p1.evaluate(async (base) => {
  const href = document.querySelector('link[rel="manifest"]').href;
  const r = await fetch(href);
  const j = await r.json();
  const sizes = {};
  for (const i of j.icons || []) {
    const rr = await fetch(new URL(i.src, base).href);
    sizes[i.src + '|' + i.purpose] = rr.status;
  }
  for (const s of j.screenshots || []) {
    const rr = await fetch(new URL(s.src, base).href);
    sizes[s.src] = rr.status;
  }
  return { j, sizes, href };
}, BASE);

ok(man.j.id === '/', 'manifest 缺 id（安卓上重装会算成另一个应用）');
ok(man.j.display === 'standalone', 'manifest display 不是 standalone');
ok((man.j.icons || []).some(i => i.purpose === 'maskable'), 'manifest 没有 maskable 图标');
const missing = Object.keys(man.sizes).filter(k => man.sizes[k] !== 200);
ok(missing.length === 0, 'manifest 引用的图标/截图取不到：' + missing.join(','));
ok((man.j.shortcuts || []).length >= 3, 'manifest 没有快捷方式');
ok((man.j.screenshots || []).length >= 1 && man.j.screenshots.some(s => s.form_factor === 'narrow'), 'manifest 缺 narrow 截图');

const head = await p1.evaluate(() => ({
  capable: (document.querySelector('meta[name="apple-mobile-web-app-capable"]') || {}).content,
  icon: (document.querySelector('link[rel="apple-touch-icon"]') || {}).getAttribute ? document.querySelector('link[rel="apple-touch-icon"]').getAttribute('href') : '',
  sw: 'serviceWorker' in navigator
}));
ok(head.capable === 'yes', 'iOS 缺 apple-mobile-web-app-capable，加到主屏后不是全屏');
ok(/icon-180\.png/.test(head.icon || ''), 'apple-touch-icon 不是 180 那张');
ok(head.sw, '浏览器不支持 serviceWorker');

/* 快捷方式指向的 tab 要真实存在 */
const tabs = await p1.evaluate(() => [...document.querySelectorAll('.tab[data-tab]')].map(t => t.dataset.tab));
for (const s of man.j.shortcuts || []) {
  const name = (s.url.split('#')[1] || '').split('?')[0];
  ok(tabs.includes(name), '快捷方式 ' + s.name + ' 指向的 ' + name + ' 不存在');
}
await ctx1.close();

/* ---------- 2. iPhone：给「添加到主屏幕」指引，关掉后不再打扰 ---------- */
const ctx2 = await browser.newContext({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1', viewport: { width: 390, height: 844 } });
const p2 = await ctx2.newPage();
await p2.goto(BASE, { waitUntil: 'load' });
await p2.waitForTimeout(2800);
const ios1 = await p2.evaluate(() => ({
  btn: !!document.getElementById('btn-install') && !document.getElementById('btn-install').hidden,
  btnText: (document.getElementById('btn-install') || {}).textContent || '',
  bar: (document.getElementById('instbar') || {}).innerText || ''
}));
ok(ios1.btn, 'iPhone 上没有出现「安装到主屏」按钮');
ok(/添加到主屏幕/.test(ios1.bar), 'iPhone 上没有出现图文指引（' + ios1.bar + '）');
await p2.click('#instbar .inst-x'); await p2.waitForTimeout(300);
const ios2 = await p2.evaluate(() => ({
  gone: !document.getElementById('instbar'),
  hide: localStorage.getItem('finance-calc-installhide') ? 1 : 0
}));
ok(ios2.gone, '点 × 没关掉提示条');
ok(ios2.hide === 1, '关掉后没记住（下次还会弹）');
await p2.reload({ waitUntil: 'load' });
await p2.waitForTimeout(2800);
ok(await p2.evaluate(() => !document.getElementById('instbar')), '关掉后又弹出来了');
await ctx2.close();

/* ---------- 3. 已经是独立窗口（装好了）：别再提示装 ---------- */
const ctx3 = await browser.newContext();
const p3 = await ctx3.newPage();
await p3.addInitScript(() => {
  const orig = window.matchMedia;
  window.matchMedia = function (q) {
    if (q && q.indexOf('display-mode') >= 0) {
      return { matches: true, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} };
    }
    return orig.call(window, q);
  };
});
await p3.goto(BASE, { waitUntil: 'load' });
await p3.waitForTimeout(2800);
const stand = await p3.evaluate(() => ({
  btn: !!document.getElementById('btn-install') && !document.getElementById('btn-install').hidden,
  bar: !!document.getElementById('instbar')
}));
ok(!stand.btn && !stand.bar, '已经装好了还在提示安装');

/* ---------- 4. 装好后预取全部分组：断网照样算（未访问过的模块也要能算） ---------- */
let prefetched = 0;
for (let i = 0; i < 60; i++) {
  prefetched = await p3.evaluate(() => document.querySelectorAll('.panel').length);
  if (prefetched >= 200) break;
  await p3.waitForTimeout(1000);
}
ok(prefetched >= 200, '装好后没有后台预取（当前只挂了 ' + prefetched + ' 个面板）');
await p3.waitForTimeout(1200);
await ctx3.setOffline(true);
await p3.goto(BASE + '#vatcheck', { waitUntil: 'load' }).catch(() => {});
await p3.waitForTimeout(1500);
const offline = await p3.evaluate(() => {
  const pn = document.getElementById('panel-vatcheck');
  const big = pn && pn.querySelector('.big strong');
  const inp = document.getElementById('vchk-out');
  return { panel: !!pn, big: big && big.textContent.trim(), hasInput: !!inp };
});
ok(offline.panel && offline.hasInput, '断网后没访问过的模块打不开（' + JSON.stringify(offline) + '）');
if (offline.hasInput) {
  await p3.fill('#vchk-out', '113000').catch(() => {});
  await p3.waitForTimeout(600);
}
await ctx3.setOffline(false);
await ctx3.close();

ok(errs.length === 0, '控制台报错：' + errs.join(' | '));

/* ---------- 5. 到期提醒（本地通知，只有装到主屏/授权后才发） ---------- */
/* 通知权限在无头环境里不稳定（CI 上可能直接 denied），这里把权限位打桩成「已允许」，
   测我们自己的开关/去重/发送逻辑；再另开一个「已拒绝」的环境验证不误存开关。 */
const stubNotify = (perm) => {
  if (navigator.serviceWorker) {
    window.__notified = [];
    navigator.serviceWorker.ready.then(reg => {
      /* 真机/CI 里没真授权时调用会异步拒绝，这里照样记下标题再返回一个被拒的 Promise，
         顺便验证我们的代码不会因此抛未处理异常 */
      reg.showNotification = (t, o) => { window.__notified.push(t); return Promise.reject(new Error('no permission')); };
    });
  }
  if (perm) {
    Object.defineProperty(Notification, 'permission', { get: () => perm, configurable: true });
    Notification.requestPermission = (cb) => { if (cb) cb(perm); return Promise.resolve(perm); };
  }
};
const ctx5 = await browser.newContext({ permissions: ['notifications'] });
await ctx5.addInitScript(stubNotify, 'granted');
const p5 = await ctx5.newPage();
const e5 = [];
p5.on('pageerror', e => e5.push('PE:' + e.message));
await p5.goto(BASE + '#workflow', { waitUntil: 'load' });
await p5.waitForTimeout(800);
await p5.evaluate(() => ['wfman', 'wfmeta', 'wfnotify', 'wfnotified'].forEach(k => localStorage.removeItem('finance-calc-' + k)));
await p5.goto(BASE + '#workflow', { waitUntil: 'load' });
await p5.waitForTimeout(700);
await p5.click('#wf-notify');
await p5.waitForTimeout(600);
const nst = await p5.evaluate(() => ({
  pref: localStorage.getItem('finance-calc-wfnotify'),
  txt: document.getElementById('wf-notify').textContent.trim(),
  st: document.getElementById('wf-notify-st').textContent.trim()
}));
ok(nst.pref === '1' && nst.txt.indexOf('关掉') >= 0, '开启到期提醒没生效（' + JSON.stringify(nst) + '）');
/* 造一个「今天到期」的未做步骤，重进工作流应发一条提醒 */
await p5.evaluate(() => {
  localStorage.setItem('finance-calc-wfmeta', JSON.stringify({ 'cash:expcheck': { est: 8, due: new Date().toISOString().slice(0, 10) } }));
  localStorage.removeItem('finance-calc-wfnotified');
});
await p5.goto(BASE + '#deposit', { waitUntil: 'load' });
await p5.waitForTimeout(400);
await p5.goto(BASE + '#workflow', { waitUntil: 'load' });
await p5.waitForTimeout(1600);
const nt = await p5.evaluate(() => window.__notified || []);
ok(nt.length >= 1 && nt.join(' ').indexOf('到期') >= 0, '到期提醒没发出去（' + JSON.stringify(nt) + '）');
/* 同一天不重复推 */
await p5.goto(BASE + '#deposit', { waitUntil: 'load' });
await p5.waitForTimeout(300);
await p5.goto(BASE + '#workflow', { waitUntil: 'load' });
await p5.waitForTimeout(1400);
const nt2 = await p5.evaluate(() => window.__notified || []);
ok(nt2.length === nt.length, '同一天重复发了提醒（' + JSON.stringify(nt2) + '）');
ok(e5.length === 0, '到期提醒相关报错：' + e5.join(' | '));
await ctx5.close();

/* 5b. 权限被拒时不能把开关存成「已开启」 */
const ctx6 = await browser.newContext();
await ctx6.addInitScript(stubNotify, 'denied');
const p6 = await ctx6.newPage();
await p6.goto(BASE + '#workflow', { waitUntil: 'load' });
await p6.waitForTimeout(700);
await p6.evaluate(() => localStorage.removeItem('finance-calc-wfnotify'));
await p6.goto(BASE + '#workflow', { waitUntil: 'load' });
await p6.waitForTimeout(600);
await p6.click('#wf-notify');
await p6.waitForTimeout(500);
const nd = await p6.evaluate(() => ({
  pref: localStorage.getItem('finance-calc-wfnotify'),
  st: document.getElementById('wf-notify-st').textContent.trim()
}));
ok(nd.pref !== '1' && nd.st.indexOf('权限') >= 0, '权限被拒时开关状态不对（' + JSON.stringify(nd) + '）');
await ctx6.close();

console.log(bad.length ? '❌ 安装/离线项失败：\n- ' + bad.join('\n- ') : '✅ 安装与离线项全部通过');
await browser.close();
process.exit(bad.length ? 1 : 0);
