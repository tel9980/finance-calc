#!/usr/bin/env python3
"""生成 PWA / OG 图标（纯 python，无第三方依赖）。"""
import struct, zlib, os, math

BG = (30, 58, 138)
FG = (255, 255, 255)

def png(path, w, h, pixel):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        for x in range(w):
            r, g, b = pixel(x, y, w, h)
            raw += bytes((r, g, b))
    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)
    out = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + chunk(b"IEND", b"")
    open(path, "wb").write(out)

def make_icon(size, rounded=True):
    pad = size * 0.16          # 内边距
    cx, cy = size / 2, size / 2
    s = size * 0.30            # ¥ 半宽
    top, bot = cy - size * 0.26, cy + size * 0.28
    lw = max(2.0, size * 0.055)  # 线宽
    def in_seg(px, py, x1, y1, x2, y2, w):
        dx, dy = x2 - x1, y2 - y1
        L = dx * dx + dy * dy
        t = 0 if L == 0 else max(0, min(1, ((px - x1) * dx + (py - y1) * dy) / L))
        nx, ny = x1 + t * dx, y1 + t * dy
        return (px - nx) ** 2 + (py - ny) ** 2 <= (w / 2) ** 2
    def pixel(x, y, w, h):
        if rounded:
            r = size * 0.22
            qx = min(max(x, r), w - 1 - r); qy = min(max(y, r), h - 1 - r)
            if (x - qx) ** 2 + (y - qy) ** 2 > r * r:
                return (244, 246, 251)
        # ¥：两撇 + 竖 + 两横
        hit = (
            in_seg(x, y, cx - s, top, cx, cy + size * 0.02, lw)
            or in_seg(x, y, cx + s, top, cx, cy + size * 0.02, lw)
            or in_seg(x, y, cx, cy - size * 0.02, cx, bot, lw)
            or in_seg(x, y, cx - s * 0.85, cy + size * 0.05, cx + s * 0.85, cy + size * 0.05, lw)
            or in_seg(x, y, cx - s * 0.85, cy + size * 0.17, cx + s * 0.85, cy + size * 0.17, lw)
        )
        return FG if hit else BG
    return pixel

def make_og(w, h):
    def pixel(x, y, ww, hh):
        # 左深蓝块 + 右侧留白，中间画 ¥
        if x < ww * 0.34:
            return BG
        return (244, 246, 251)
    return pixel

base = os.path.join(os.path.dirname(__file__), "..", "public")
png(os.path.join(base, "icon-192.png"), 192, 192, make_icon(192))
png(os.path.join(base, "icon-512.png"), 512, 512, make_icon(512))
# OG：1200x630，左侧色块 + 大 ¥
def og_pixel(x, y, w, h):
    band = w * 0.34
    if x < band:
        size = h * 1.0
        px = make_icon(int(h * 0.62))(x - (band - h * 0.62) / 2, y - h * 0.19, int(h * 0.62), int(h * 0.62))
        return px
    return (244, 246, 251)
png(os.path.join(base, "og.png"), 1200, 630, og_pixel)
print("icons ok")
