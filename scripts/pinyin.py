#!/usr/bin/env python3
"""读 index.html 里的模块名，输出 {tab: 拼音首字母串}，给搜索用。
用法：python3 scripts/pinyin.py public/index.html > scripts/pinyin-map.json
依赖 pypinyin（pip install pypinyin）。缺依赖时直接报错退出——以前是静默输出 {}，
配上 > 重定向会把整张拼音表清空、全站拼音搜索一起失效。"""
import json, re, sys

path = sys.argv[1] if len(sys.argv) > 1 else 'public/index.html'
html = open(path, encoding='utf-8').read()

try:
    from pypinyin import lazy_pinyin, Style
except Exception as exc:
    sys.stderr.write('缺 pypinyin，无法生成拼音表：%s\n请先 pip install pypinyin\n' % exc)
    sys.exit(2)

out = {}
for m in re.finditer(r'<button class="tab[^"]*"([^>]*)>([^<]*)</button>', html):
    attrs, text = m.group(1), m.group(2).strip()
    t = re.search(r'data-tab="([^"]+)"', attrs)
    if not t:
        continue
    # 首字母串 + 全拼串，两种都能搜到
    ini = ''.join(lazy_pinyin(text, style=Style.FIRST_LETTER, errors=lambda x: ['']))
    full = ''.join(lazy_pinyin(text, style=Style.NORMAL, errors=lambda x: ['']))
    out[t.group(1)] = (ini + ' ' + full).strip()
print(json.dumps(out, ensure_ascii=False))
