/* 体积预算闸：产物体积超预算就让 CI 失败，避免「悄悄胖起来」。
   预算按「用户第一次打开要下载的量」定，不是按总量。 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dir = path.join(root, 'public/assets');
const KB = 1024;

const LIMITS = [
  { name: 'core app.js', test: f => /^app\.[a-f0-9]+\.js$/.test(f), max: 270 * KB },
  { name: 'style.css', test: f => /^style\.[a-f0-9]+\.css$/.test(f), max: 42 * KB },
  { name: '单个分类 chunk', test: f => /^c-.+\.js$/.test(f), max: 160 * KB },
];
const TOTAL_MAX = 2.6 * 1024 * KB;

const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
const rows = [];
let total = 0;
let bad = [];

for (const f of files) {
  const size = fs.statSync(path.join(dir, f)).size;
  total += size;
  for (const l of LIMITS) {
    if (!l.test(f)) continue;
    const over = size > l.max;
    rows.push([l.name, f, size, l.max, over]);
    if (over) bad.push(`${l.name}（${f}）${(size / KB).toFixed(1)}KB 超过预算 ${(l.max / KB).toFixed(0)}KB`);
  }
}
const pubTotal = (() => {
  const walk = d => fs.readdirSync(d).reduce((n, f) => {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    return n + (st.isDirectory() ? walk(p) : st.size);
  }, 0);
  return walk(path.join(root, 'public'));
})();

console.log('产物体积：');
for (const [name, f, size, max] of rows) {
  console.log(`  ${name.padEnd(12)} ${(size / KB).toFixed(1).padStart(6)}KB / 预算 ${(max / KB).toFixed(0)}KB   ${f}`);
}
console.log(`  ${'assets 合计'.padEnd(12)} ${(total / KB).toFixed(1).padStart(6)}KB`);
console.log(`  ${'public 合计'.padEnd(12)} ${(pubTotal / KB).toFixed(1).padStart(6)}KB / 预算 ${(TOTAL_MAX / KB).toFixed(0)}KB`);

if (pubTotal > TOTAL_MAX) bad.push(`public/ 合计 ${(pubTotal / KB).toFixed(1)}KB 超过预算 ${(TOTAL_MAX / KB).toFixed(0)}KB`);

if (bad.length) {
  console.log('❌ 超预算：\n- ' + bad.join('\n- '));
  process.exit(1);
}
console.log('✅ 体积都在预算内');
