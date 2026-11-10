#!/usr/bin/env python3
"""读 index.html 里的模块名，输出 {tab: 拼音首字母串}，给搜索用。
用法：python3 scripts/pinyin.py public/index.html
没有 pypinyin 时输出 {}（搜索退化为按文字/英文 id 匹配）。"""
import json, re, sys

path = sys.argv[1] if len(sys.argv) > 1 else 'public/index.html'
html = open(path, encoding='utf-8').read()

try:
    from pypinyin import lazy_pinyin, Style
except Exception:
    print('{}')
    sys.exit(0)

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
