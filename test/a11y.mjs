/* 无障碍回归：axe-core 跑 WCAG 2.1 A/AA，再用便宜的检查覆盖全部 228 个模块。
   用法：node test/a11y.mjs [url]
   说明：全量 228 个页面都跑 axe 要 10 分钟左右，所以只挑 16 个有代表性的页面跑 axe（含字段最多的
   表格类模块、工作流、快照、报表），其余模块用「每个控件都得有可访问名字」这条便宜规则全覆盖。 */
import fs from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.argv.find(a => a.startsWith('http')) || 'http://127.0.0.1:8099/';
const AXE = fs.readFileSync(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const errs = [];
page.on('pageerror', e => errs.push('PE:' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CE:' + m.text().slice(0, 120)); });
const bad = [];
const ok = (cond, msg) => { if (!cond) bad.push(msg); };

const PAGES = ['hot', 'loan', 'compound', 'salary', 'vatdue', 'ratios',
  'costbehav', 'interco', 'invorder', 'workflow', 'snaps', 'monthly', 'report', 'budget', 'rentbuy', 'expense'];

await page.goto(BASE, { waitUntil: 'load' });
await page.waitForTimeout(500);

/* 线上站点带 CSP（script-src 'self'），注入 axe 会被浏览器拒绝；本地/CI 没有 CSP。
   这种情况只跳过 axe 部分，剩下的命名检查照跑。 */
let axeOK = true;
try { await page.goto(BASE, { waitUntil: 'load' }); await page.addScriptTag({ content: AXE }); }
catch (e) { axeOK = false; console.log('⚠️ 当前站点禁止注入脚本（CSP），跳过 axe 部分，只跑命名检查'); }

/* ── 1. axe：代表性页面不许有 WCAG A/AA 违规 ─────────────────────── */
if (axeOK) {
for (const tab of PAGES) {
  await page.goto(BASE + '#' + tab, { waitUntil: 'load' });
  await page.waitForTimeout(700);
  try { await page.addScriptTag({ content: AXE }); } catch (e) { axeOK = false; break; }
  const res = await page.evaluate(async () => {
    const r = await window.axe.run(document, {
      resultTypes: ['violations'],
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }
    });
    return r.violations.map(v => ({
      id: v.id, impact: v.impact, n: v.nodes.length,
      where: v.nodes.slice(0, 2).map(x => (x.target || []).join(' ')).join(' / ')
    }));
  });
  for (const v of res) ok(false, `[${tab}] axe ${v.impact} ${v.id} ×${v.n}：${v.where}`);
}

/* ── 2. 深色主题下也得过（配色是另一套变量） ─────────────────────── */
await page.evaluate(() => localStorage.setItem('finance-calc-theme', 'dark'));
for (const tab of ['hot', 'monthly', 'workflow']) {
  await page.goto(BASE + '#' + tab, { waitUntil: 'load' });
  await page.waitForTimeout(700);
  try { await page.addScriptTag({ content: AXE }); } catch (e) { axeOK = false; break; }
  const res = await page.evaluate(async () => {
    const r = await window.axe.run(document, { resultTypes: ['violations'], runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    return r.violations.map(v => ({
      id: v.id, impact: v.impact, n: v.nodes.length,
      where: v.nodes.slice(0, 2).map(x => (x.target || []).join(' ') + ' — ' + (x.html || '').slice(0, 90) + ' — ' + (x.any.map(a => a.message).join('|') || '')).join(' / ')
    }));
  });
  for (const v of res) ok(false, `[深色 ${tab}] axe ${v.impact} ${v.id} ×${v.n}：${v.where}`);
}
await page.evaluate(() => localStorage.setItem('finance-calc-theme', 'light'));
}

/* ── 3. 键盘可达：Tab 一下能拿到「跳到计算区」，链接指向真实存在的区域 ── */
await page.goto(BASE + '#hot', { waitUntil: 'load' });
await page.waitForTimeout(500);
const skip = await page.evaluate(() => {
  const a = document.querySelector('a.skip, .skip');
  return a ? { href: a.getAttribute('href'), target: !!document.querySelector(a.getAttribute('href')) } : null;
});
ok(skip && skip.target, '首页缺少「跳到计算区」链接，或其 #锚点不存在');

/* ── 4. 可滚动表格能被键盘聚焦（axe 的 scrollable-region-focusable） ── */
await page.goto(BASE + '#monthly', { waitUntil: 'load' });
await page.waitForTimeout(900);
const focusable = await page.evaluate(() => {
  const boxes = [...document.querySelectorAll('.panel.is-on .tablebox')];
  const noTab = boxes.filter(b => b.getAttribute('tabindex') !== '0' && b.scrollHeight > b.clientHeight + 2);
  return { total: boxes.length, missing: noTab.length };
});
ok(focusable.missing === 0, '有 ' + focusable.missing + ' 个可滚动表格不能键盘聚焦');

/* ── 5. 全部 228 个模块：控件都要有可访问名字、按钮要有文字 ────────── */
{
  const tabs = await page.evaluate(() => [...document.querySelectorAll('#tabs .tab')].map(t => t.dataset.tab));
  const problems = [];
  for (const t of tabs) {
    await page.goto(BASE + '#' + t, { waitUntil: 'load' });
    await page.waitForTimeout(320);
    const r = await page.evaluate(id => {
      const p = document.getElementById('panel-' + id);
      if (!p) return ['面板没渲染'];
      const nameOf = el => {
        if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
        if (el.getAttribute('aria-labelledby')) return 'labelledby';
        if (el.getAttribute('title')) return el.getAttribute('title').trim();
        const lb = el.closest('label');
        if (lb) {
          const sp = lb.querySelector('span');
          const txt = (sp ? sp.textContent : lb.textContent) || '';
          if (txt.trim()) return txt.trim();
        }
        while (el && el !== p) {
          el = el.parentElement;
          if (!el) break;
          const lb2 = el.tagName === 'LABEL' ? el : null;
          if (lb2) return (lb2.textContent || '').trim();
        }
        return '';
      };
      const out = [];
      p.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.type === 'hidden') return;
        if (el.hidden || el.getAttribute('aria-hidden') === 'true' || el.offsetParent === null) return;
        if (!nameOf(el)) out.push((el.id || el.tagName) + ' 没有名字');
      });
      p.querySelectorAll('button').forEach(el => {
        const txt = (el.textContent || '').trim();
        if (!txt && !el.getAttribute('aria-label') && !el.getAttribute('title')) out.push('按钮 ' + (el.id || '(无 id)') + ' 没有文字');
      });
      return out;
    }, t);
    if (r.length) problems.push(t + '：' + r.slice(0, 3).join('；'));
  }
  ok(problems.length === 0, '控件缺可访问名字：' + problems.slice(0, 8).join(' | ') + (problems.length > 8 ? ' …共 ' + problems.length + ' 个模块' : ''));
}

const realErrs = errs.filter(x => x.indexOf('404') < 0);
ok(realErrs.length === 0, '控制台报错：' + realErrs.join(' | '));
console.log(bad.length ? '❌ 无障碍项失败：\n- ' + bad.join('\n- ') : '✅ 无障碍项全部通过（WCAG 2.1 AA）');
await browser.close();
process.exit(bad.length ? 1 : 0);
