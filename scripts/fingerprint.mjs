#!/usr/bin/env node
/* 给 app.js / style.css 加内容哈希文件名（长缓存用），并生成 sw.js。
   用法：node scripts/fingerprint.mjs   （每次改完 public/app.js 或 style.css 后、deploy 前跑一次） */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const assetsDir = join(pub, "assets");
mkdirSync(assetsDir, { recursive: true });

const hash = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 10);

function emit(srcName, outName) {
  const buf = readFileSync(join(pub, srcName));
  const name = `${outName}.${hash(buf)}${srcName.slice(srcName.lastIndexOf("."))}`;
  writeFileSync(join(assetsDir, name), buf);
  return name;
}

const appName = emit("app.js", "app");
const cssName = emit("style.css", "style");

// 清理旧哈希文件
for (const f of readdirSync(assetsDir)) {
  if (f !== appName && f !== cssName) unlinkSync(join(assetsDir, f));
}

// 改写 index.html 引用（已带哈希的也会被重新指向最新版本）
let html = readFileSync(join(pub, "index.html"), "utf8");
html = html.replace(/\.\/assets\/style\.[0-9a-f]{6,}\.css/g, `./assets/${cssName}`)
           .replace(/\.\/assets\/app\.[0-9a-f]{6,}\.js/g, `./assets/${appName}`)
           .replace(/\.\/style\.css/g, `./assets/${cssName}`)
           .replace(/\.\/app\.js/g, `./assets/${appName}`);
writeFileSync(join(pub, "index.html"), html);

// 生成 sw.js
const version = `fc-${hash(appName + cssName)}`;
const shell = ["/", `./assets/${appName}`, `./assets/${cssName}`, "./manifest.webmanifest", "./icon-192.png"];
const tpl = readFileSync(join(root, "scripts", "sw.template.js"), "utf8");
writeFileSync(join(pub, "sw.js"),
  tpl.replace("__VERSION__", version).replace("__ASSETS__", JSON.stringify(shell, null, 2)));

console.log(`assets/app -> ${appName}`);
console.log(`assets/style -> ${cssName}`);
console.log(`sw.js version ${version}`);
if (!existsSync(join(pub, "index.html"))) process.exit(1);
