#!/usr/bin/env node
/* 把 src/app.js 拆成 core + 按分类懒加载的 chunk，生成带内容哈希的资源，重写 index.html 与 sw.js */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PUB = path.join(ROOT, 'public');
const ASSETS = path.join(PUB, 'assets');
const read = f => fs.readFileSync(f, 'utf8');
const hash8 = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);

let src = read(path.join(ROOT, 'src/app.js'));
const html = read(path.join(PUB, 'index.html'));

/* ---------- 1. tab -> 分类 ---------- */
const tabCat = {};
const tabSub = {};
for (const m of html.matchAll(/<button class="tab[^"]*"([^>]*)>/g)) {
  const attrs = m[1];
  const id = /data-tab="([^"]+)"/.exec(attrs);
  const cat = /data-cat="([^"]+)"/.exec(attrs);
  const grp = /data-grp="([^"]*)"/.exec(attrs);
  if (id) tabCat[id[1]] = cat ? cat[1] : 'hot';
  if (id && grp) tabSub[id[1]] = grp[1];
}

/* ---------- 1.5 搜索增强：给每个 tab 注入拼音首字母/全拼（data-py）与别名（data-alias） ---------- */
const ALIAS = {
  deposit: 'cunqian ck lixi dingqi', loan: 'fangdai fd anjie yuegong', combo: 'zuhedai zhgd',
  prepay: 'tqhk tiqianhuanakuan', compound: 'fuli dttz dingtou', goal: 'zanqian mb mbiao',
  installment: 'fenqi fqlv', annual: 'nianhua nh', inflation: 'tongzhang tz', tax: 'geshui gs',
  salary: 'daoshou dakeren gongzi', deal: 'zhekou dj danjia', fx: 'huilv hl duihuan',
  healthcheck: 'tijian caiwutijian jk', report: 'baogao yiyetijian bg', snaps: 'kuaizhao fangan kz',
  planner: 'guihua zhdai maifanghou', housecash: 'goufang yicixing shoufu sf',
  rentbuy: 'zumaifang zmf', rentyield: 'zushoubi zsb', debitfree: 'haiqian hd'
};

/* 拼音表来自仓库里的 scripts/pinyin-map.json（已生成、无需 pypinyin，CI 上也能用）。
   新增模块后要重生成：python3 scripts/pinyin.py public/index.html > scripts/pinyin-map.json */
let pyMap = {};
const pyFile = path.join(ROOT, 'scripts/pinyin-map.json');
if (fs.existsSync(pyFile)) {
  try { pyMap = JSON.parse(fs.readFileSync(pyFile, 'utf8')); }
  catch (e) { console.warn('拼音表读取失败，搜索退化为文字/英文匹配：' + e.message); }
} else {
  console.warn('缺少 scripts/pinyin-map.json，拼音搜索不可用');
}

/* ---------- 2. calcMap 条目 ---------- */
const cmStart = src.indexOf('  var calcMap = {');
if (cmStart < 0) throw new Error('calcMap not found');
const cmEnd = src.indexOf('\n  };', cmStart);
const cmBlock = src.slice(cmStart, cmEnd);
const raw = [...cmBlock.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*([A-Za-z_$][\w$]*)/g)].map(m => [m[1], m[2]]);
const seenKey = new Set();
const entries = raw.filter(([k]) => (seenKey.has(k) ? (console.warn('去掉重复 calcMap 键：' + k), false) : (seenKey.add(k), true)));
const keys = entries.map(e => e[0]);
if (keys.length !== Object.keys(tabCat).length) console.warn('warn: calcMap', keys.length, 'tabs', Object.keys(tabCat).length);

/* ---------- 3. 抽取 function 块（两空格缩进的顶层函数，花括号配平） ---------- */
function extractFn(name) {
  const re = new RegExp('^  function ' + name.replace(/\$/g, '\\$') + '\\s*\\(', 'm');
  const m = re.exec(src);
  if (!m) return null;
  const start = m.index;
  let i = src.indexOf('{', m.index), depth = 0, inStr = null, inCom = null, inRegex = false;
  for (; i < src.length; i++) {
    const ch = src[i], prev = src[i - 1], next = src[i + 1];
    if (inCom) { if (inCom === '//' && ch === '\n') inCom = null; else if (inCom === '/*' && ch === '/' && prev === '*') inCom = null; continue; }
    if (inStr) { if (ch === '\\') { i++; continue; } if (ch === inStr) inStr = null; continue; }
    if (ch === '/' && next === '/') { inCom = '//'; continue; }
    if (ch === '/' && next === '*') { inCom = '/*'; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { return { start, end: i + 1, code: src.slice(start, i + 1) }; } }
  }
  return null;
}

const fnChunk = {};           // fnName -> group
const fnKeys = {};            // fnName -> [keys]
const groupOf = {};
for (const [k, fn] of entries) {
  const cats = (tabCat[k] || 'hot').split(/\s+/);
  let grp = cats.find(c => c !== 'hot') || 'hot';
  /* 公司财务太大（557KB），按二级分组再拆成 acct-cost / acct-tax / … */
  if (grp === 'acct') grp = 'acct-' + (tabSub[k] || 'misc');
  groupOf[k] = grp;
  (fnKeys[fn] = fnKeys[fn] || []).push(k);
  if (fnChunk[fn] && fnChunk[fn] !== grp) throw new Error('fn in two groups: ' + fn);
  fnChunk[fn] = grp;
}
const groups = [...new Set(entries.map(([k]) => groupOf[k]))];

/* ---------- 4. 抽取函数体（一次性按原始偏移量取出，再倒序删除） ---------- */
const bodies = {};
const ranges = [];
for (const fn of Object.keys(fnChunk)) {
  const f = extractFn(fn);
  if (!f) throw new Error('fn not found: ' + fn);
  bodies[fn] = f.code;
  ranges.push(f);
}
ranges.sort((a, b) => b.start - a.start);
let core = src;
for (const r of ranges) core = core.slice(0, r.start) + core.slice(r.end);
const cm2 = core.indexOf('  var calcMap = {');
const cm2end = core.indexOf('\n  };', cm2);
if (cm2 < 0 || cm2end < 0) throw new Error('calcMap block lost');
core = core.slice(0, cm2) + '@@CALCMAP@@' + core.slice(cm2end + '\n  };'.length);

const toCore = new Set();
// 函数体里给 core 顶层变量赋值（共享状态）→ 该函数必须留在 core
const coreVarNames = new Set();
for (const m of core.replace('@@CALCMAP@@', '').matchAll(/^  var ([A-Za-z_$][\w$]*)/gm)) coreVarNames.add(m[1]);
const esc = n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const [fn, code] of Object.entries(bodies)) {
  for (const nm of coreVarNames) {
    const e = esc(nm);
    const assigned = new RegExp('(?<![\\w$.])' + e + '\\s*(?:[-+*/%&|^]?=|(?:\\+\\+|--))').test(code);
    const local = new RegExp('(?:var|let|const)\\s+' + e + '\\b').test(code) || new RegExp('function\\s+' + e + '\\b').test(code) || new RegExp('\\(\\s*' + e + '\\s*[,)]').test(code);
    if (assigned && !local) { toCore.add(fn); break; }
  }
}
for (const fn of toCore) if (bodies[fn]) console.log('→ 共享状态/跨分类依赖，保留在 core：', fn, '(', fnChunk[fn], ')');
for (const fn of toCore) {
  if (!bodies[fn]) continue;
  core = core.replace('@@CALCMAP@@', bodies[fn] + '\n\n@@CALCMAP@@');
  delete bodies[fn];
}

// 跨 chunk 引用：某函数体里出现了别的 chunk 的函数名
for (const [fn, code] of Object.entries(bodies)) {
  for (const other of Object.keys(bodies)) {
    if (other === fn) continue;
    if (fnChunk[other] !== fnChunk[fn] && new RegExp('\\b' + other.replace(/\$/g, '\\$') + '\\b').test(code)) toCore.add(other);
  }
}
for (const fn of toCore) {
  core = core.replace('@@CALCMAP@@', bodies[fn] + '\n\n@@CALCMAP@@');
  delete bodies[fn];
  console.log('→ 跨分类引用，保留在 core：', fn, '(', fnChunk[fn], ')');
}

/* ---------- 5. core 顶层名字（供 chunk 解构） ---------- */
const coreNames = new Set();
for (const m of core.replace('@@CALCMAP@@', '').matchAll(/^  function ([A-Za-z_$][\w$]*)\s*\(/gm)) coreNames.add(m[1]);
for (const m of core.replace('@@CALCMAP@@', '').matchAll(/^  var ([A-Za-z_$][\w$]*)/gm)) coreNames.add(m[1]);

// 运行期注入的名字也要让 chunk 能看到
["runCalc", "ensureChunk", "TABS", "CHUNK_OF", "CHUNK_FILES", "calcMap", "CORE_CALC"].forEach(n => coreNames.add(n));

/* ---------- 5.5 面板 HTML：源码在 src/panels.html，按分类切进 chunk（首屏只留 core 面板） ---------- */
const panelSrc = read(path.join(ROOT, 'src/panels.html'));
const panelRe = /^ {2,6}<section class="panel( is-on)?" id="panel-([a-z0-9]+)">\n[\s\S]*?^ {2,6}<\/section>\n/gm;
const panelHtml = {};
const foundKeys = [];
let m2;
while ((m2 = panelRe.exec(panelSrc))) {
  const key = m2[2];
  if (panelHtml[key]) throw new Error('重复面板：' + key);
  panelHtml[key] = m2[0];
  foundKeys.push(key);
}
if (foundKeys.length < 100) throw new Error('面板抓取失败，只拿到 ' + foundKeys.length);
const coreKeys = new Set(entries.filter(([k, fn]) => !bodies[fn]).map(([k]) => k));
const panelWrap = {};
let corePanelsHtml = '';
for (const key of foundKeys) {
  if (coreKeys.has(key)) { corePanelsHtml += panelHtml[key]; continue; }
  const grp = groupOf[key];
  (panelWrap[grp] = panelWrap[grp] || {})[key] = panelHtml[key];
}
const missing = entries.map(([k]) => k).filter(k => !panelHtml[k]);
if (missing.length) throw new Error('这些模块没有面板：' + missing.join(','));
console.log('面板：外移 ' + (foundKeys.length - coreKeys.size) + ' 个，留在 HTML 的 core 面板：' + [...coreKeys].join(','));

/* ---------- 6. 生成 chunk 文件 ---------- */
fs.mkdirSync(ASSETS, { recursive: true });
const chunkFiles = {};
const written = [];
for (const grp of groups) {
  const fns = Object.keys(bodies).filter(fn => fnChunk[fn] === grp);
  if (!fns.length) continue;
  const code = fns.map(fn => bodies[fn]).join('\n\n');
  const used = [...coreNames].sort();
  const map = fns.flatMap(fn => fnKeys[fn].map(k => k + ': ' + fn)).join(', ');
  const out = '/* 自动生成，勿手改：' + grp + ' 分类模块（点开才下载） */\n'
    + 'const { ' + used.join(', ') + ' } = window.FC;\n\n'
    + code + '\n\n'
    + (panelWrap[grp] ? 'export const PANELS = ' + JSON.stringify(panelWrap[grp]) + ';\n' : '')
    + 'export default { ' + map + ' };\n';
  const h = hash8(out);
  const name = 'c-' + grp + '.' + h + '.js';
  fs.writeFileSync(path.join(ASSETS, name), out);
  chunkFiles[grp] = './assets/' + name;
  written.push(name);
}

/* ---------- 7. core 运行时 ---------- */
const chunkOfJs = '{ ' + entries.map(([k]) => '"' + k + '": "' + groupOf[k] + '"').join(', ') + ' }';
const tabsJs = '{ ' + keys.map(k => '"' + k + '": 1').join(', ') + ' }';
const filesJs = '{ ' + groups.filter(g => chunkFiles[g]).map(g => '"' + g + '": "' + chunkFiles[g].replace('./', '') + '"').join(', ') + ' }';
const fcNames = [...coreNames].sort().join(', ');
const coreCalcJs = '{ ' + entries.filter(([k, fn]) => !bodies[fn]).map(([k, fn]) => '"' + k + '": ' + fn).join(', ') + ' }';
console.log('留在 core 的模块：', entries.filter(([k, fn]) => !bodies[fn]).map(([k]) => k).join(',') || '(无)');
const runtime = [
  '  /* ---- 按分类懒加载：只有点到的模块才下载对应 chunk ---- */',
  '  var CHUNK_OF = ' + chunkOfJs + ';',
  '  var TABS = ' + tabsJs + ';',
  '  var CHUNK_FILES = ' + filesJs + ';',
  '  var CORE_CALC = ' + coreCalcJs + ';',
  '  var calcMap = {};',
  '  Object.keys(CORE_CALC).forEach(function (k) { calcMap[k] = CORE_CALC[k]; });',
  '  var chunkReady = {};',
  '  var PANEL_HTML = {}, ACTIVE = null;',
  '  function mountPanels(grp) {',
  '    var set = PANEL_HTML[grp];',
  '    if (!set) return;',
  '    var host = document.getElementById("panels");',
  '    if (!host) return;',
  '    for (var k in set) {',
  '      if (document.getElementById("panel-" + k)) continue;',
  '      var box = document.createElement("div");',
  '      box.innerHTML = set[k];',
  '      var el = box.firstElementChild;',
  '      if (!el) continue;',
  '      host.appendChild(el);',
  '      applyStoredTo(el);',
  '      var bgl = el.querySelector(".big");',
  '      if (bgl && !bgl.getAttribute("aria-live")) { bgl.setAttribute("aria-live", "polite"); bgl.setAttribute("aria-atomic", "true"); }',
  '      if (el.id === "panel-" + ACTIVE) el.classList.add("is-on");',
  '    }',
  '    delete PANEL_HTML[grp];',
  '    runDeferredTaps();',
  '  }',
  '  function ensureChunk(grp) {',
  '    if (chunkReady[grp]) return chunkReady[grp];',
  '    var file = CHUNK_FILES[grp];',
  '    if (!file) return Promise.resolve();',
  '    chunkReady[grp] = import(new URL(file, document.baseURI).href).then(function (mod) {',
  '      var api = (mod && mod.default) ? mod.default : mod;',
  '      Object.keys(api).forEach(function (k) { calcMap[k] = api[k]; });',
  '      if (mod && mod.PANELS) PANEL_HTML[grp] = mod.PANELS;',
  '      mountPanels(grp);',
  '      flushParams();',
  '    }).catch(function (err) {',
  '      chunkReady[grp] = null;',
  '      if (window.console) console.error("chunk 加载失败: " + grp, err);',
  '    });',
  '    return chunkReady[grp];',
  '  }',
  '  var PREFETCH_TIMER = {};',
  '  function prefetch(name) {',
  '    var grp = CHUNK_OF[name];',
  '    if (!grp || chunkReady[grp]) return;',
  '    ensureChunk(grp);',
  '  }',
  '  function bindPrefetch() {',
  '    function onOver(ev) {',
  '      var t = ev.target && ev.target.closest ? ev.target.closest(".tab[data-tab]") : null;',
  '      if (!t) return;',
  '      var name = t.getAttribute("data-tab");',
  '      if (PREFETCH_TIMER[name]) return;',
  '      PREFETCH_TIMER[name] = setTimeout(function () { PREFETCH_TIMER[name] = null; prefetch(name); }, 120);',
  '    }',
  '    document.addEventListener("mouseover", onOver, { passive: true });',
  '    document.addEventListener("focusin", onOver);',
  '    var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1800); };',
  '    idle(function () { prefetch("deposit"); prefetch("loan"); });',
  '  }',
  '  function runCalc(name) {',
  '    if (calcMap[name]) { calcMap[name](); return Promise.resolve(); }',
  '    var grp = CHUNK_OF[name];',
  '    if (!grp) return Promise.resolve();',
  '    var pn = document.getElementById("panel-" + name);',
  '    var bgs = pn ? pn.querySelector(".big strong") : null;',
  '    if (bgs && (bgs.textContent === "—" || bgs.textContent === "")) bgs.textContent = "载入中…";',
  '    return ensureChunk(grp).then(function () {',
  '      mountPanels(grp);',
  '      flushParams();',
  '      if (calcMap[name]) calcMap[name]();',
  '    });',
  '  }',
].join('\n');
core = core.replace('@@CALCMAP@@', runtime);

/* 调用点改写（正则，容忍空白差异） */
const repl = [
  [/if \(calcMap\[name\]\) calcMap\[name\]\(\);\s*\n(\s*)if \(location\.hash/, 'runCalc(name);\n$1if (location.hash'],
  [/if \(st\.name && calcMap\[st\.name\]\) \{/, 'if (st.name && TABS[st.name]) {'],
  [/if \(st\.params\) \{ applyParams\(st\.params\); calcMap\[st\.name\]\(\); \}/, 'if (st.params) { applyParams(st.params); runCalc(st.name); }'],
  [/if \(calcMap\[name\]\) calcMap\[name\]\(\);\s*\n(\s*)save\(\);/, 'runCalc(name);\n$1save();'],
  [/if \(calcMap\[p\.module\]\) activate\(p\.module\);/, 'if (TABS[p.module]) activate(p.module);'],
  [/if \(calcMap\[p\.module\]\) calcMap\[p\.module\]\(\);/, 'runCalc(p.module);'],
  [/var startName = calcMap\[st0\.name\] \? st0\.name : "deposit";/, 'var startName = TABS[st0.name] ? st0.name : "deposit";'],
  [/  function activate\(name\) \{\n/, '  function activate(name) {\n    ACTIVE = name;\n'],
  [/if \(st0\.params\) \{ applyParams\(st0\.params\); if \(calcMap\[startName\]\) calcMap\[startName\]\(\); \}/, 'if (st0.params) { applyParams(st0.params); runCalc(startName); }'],
];
for (const [re, b] of repl) {
  if (!re.test(core)) throw new Error('call site not found: ' + re);
  core = core.replace(re, b);
}
if (/calcMap\[/.test(core)) {
  const left = [...core.matchAll(/.*calcMap\[.*/g)].map(m => m[0].trim());
  console.warn('仍有 calcMap[ 残留：', left);
}

// 把 FC 暴露给 chunk，放在启动段之前
const bootMark = '  /* ---------------- 启动 ---------------- */';
if (!core.includes(bootMark)) throw new Error('boot marker not found');
core = core.replace(bootMark, '  /* chunk 里要用到的工具函数，统一挂到 window.FC */\n  window.FC = { ' + fcNames + ' };\n\n' + bootMark);

const coreHash = hash8(core);
const coreName = 'app.' + coreHash + '.js';
fs.writeFileSync(path.join(ASSETS, coreName), core);
written.push(coreName);

/* ---------- 8. CSS 指纹 ---------- */
const css = read(path.join(PUB, 'style.css'));
const cssHash = hash8(css);
const cssName = 'style.' + cssHash + '.css';
fs.writeFileSync(path.join(ASSETS, cssName), css);
written.push(cssName);

/* ---------- 9. 重写 index.html ---------- */
let out = html
  .replace(/<!-- PANELS-CORE:START -->[\s\S]*?<!-- PANELS-CORE:END -->/, '<!-- PANELS-CORE:START -->\n' + corePanelsHtml + '  <!-- PANELS-CORE:END -->')
  .replace(/<link rel="stylesheet" href="\.\/assets\/style\.[^"]*\.css">/, '<link rel="stylesheet" href="./assets/' + cssName + '">')
  .replace(/<script src="\.\/assets\/app\.[^"]*\.js"><\/script>/, '<script src="./assets/' + coreName + '"></script>');
/* 给 tab 注入拼音与别名（幂等：已有属性则覆盖） */
out = out.replace(/<button class="tab([^"]*)"([^>]*)>/g, (all, cls, attrs) => {
  const idm = /data-tab="([^"]+)"/.exec(attrs);
  if (!idm) return all;
  const id = idm[1];
  let a = attrs.replace(/\s*data-(py|alias)="[^"]*"/g, '');
  if (pyMap[id]) a += ' data-py="' + pyMap[id].replace(/"/g, '') + '"';
  if (ALIAS[id]) a += ' data-alias="' + ALIAS[id].replace(/"/g, '') + '"';
  return '<button class="tab' + cls + '"' + a + '>';
});
if (!out.includes('./assets/' + coreName) || !out.includes('./assets/' + cssName)) throw new Error('index.html 引用未替换');
fs.writeFileSync(path.join(PUB, 'index.html'), out);

/* ---------- 10. sw.js ---------- */
const ver = hash8(written.join('|'));
const shell = ['/', './assets/' + coreName, './assets/' + cssName, './manifest.webmanifest', './icon-192.png'];
const sw = '/* 自动生成，勿手改 */\nconst VERSION = "fc-' + ver + '";\n'
  + 'const SHELL = ' + JSON.stringify(shell, null, 0) + ';\n'
  + 'const RUNTIME = "fc-rt-' + ver + '";\n'
  + read(path.join(ROOT, 'scripts/sw.template.js'));
fs.writeFileSync(path.join(PUB, 'sw.js'), sw);

/* ---------- 11. 清理旧资源 ---------- */
for (const f of fs.readdirSync(ASSETS)) if (!written.includes(f)) { fs.unlinkSync(path.join(ASSETS, f)); console.log('删除旧资源', f); }

const sizes = written.map(f => f + ' ' + Math.round(fs.statSync(path.join(ASSETS, f)).size / 1024) + 'KB');
console.log('groups:', groups.join(','));
console.log('chunks:', sizes.join(' | '));
console.log('version:', ver);
