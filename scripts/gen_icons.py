# -*- coding: utf-8 -*-
"""生成 PWA 图标：蓝紫渐变圆角底 + 白色日历卡片。"""
import os
from PIL import Image, ImageDraw

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "icons")
os.makedirs(OUT, exist_ok=True)

C_START = (138, 124, 255)   # #8a7cff
C_END = (58, 44, 168)       # #3a2ca8
C_ACCENT = (79, 195, 247)   # #4fc3f7
C_PURPLE = (109, 93, 252)   # #6d5dfc


def gradient(size):
    """135° 线性渐变底"""
    img = Image.new("RGB", (size, size))
    px = img.load()
    m = 2 * (size - 1)
    for y in range(size):
        for x in range(size):
            t = (x + y) / m
            px[x, y] = (
                int(C_START[0] + (C_END[0] - C_START[0]) * t),
                int(C_START[1] + (C_END[1] - C_START[1]) * t),
                int(C_START[2] + (C_END[2] - C_START[2]) * t),
            )
    return img


def draw_glyph(img, scale=1.0):
    """在图上绘制日历字形，scale 为内容缩放比例（用于 maskable 安全区）"""
    size = img.size[0]
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    s = size

    def r(v):
        return v * s

    # 顶部两个挂环（先画，被卡片遮住下半部分）
    for cx in (0.345, 0.655):
        d.rounded_rectangle(
            [r(cx - 0.028), r(0.155), r(cx + 0.028), r(0.30)],
            radius=r(0.028), fill=(255, 255, 255, 255),
        )

    # 卡片主体
    d.rounded_rectangle(
        [r(0.18), r(0.25), r(0.82), r(0.83)],
        radius=r(0.075), fill=(255, 255, 255, 255),
    )

    # 顶部色带
    d.rounded_rectangle(
        [r(0.18), r(0.25), r(0.82), r(0.42)],
        radius=r(0.075), fill=C_ACCENT + (255,),
    )
    d.rectangle([r(0.18), r(0.36), r(0.82), r(0.42)], fill=C_ACCENT + (255,))

    # 日期方块 3×2
    cols = (0.305, 0.50, 0.695)
    rows = (0.545, 0.695)
    half = 0.048
    for ri, cy in enumerate(rows):
        for ci, cx in enumerate(cols):
            color = C_ACCENT if (ri == 0 and ci == 1) else C_PURPLE
            d.rounded_rectangle(
                [r(cx - half), r(cy - half), r(cx + half), r(cy + half)],
                radius=r(0.018), fill=color + (255,),
            )

    if scale != 1.0:
        new = int(size * scale)
        layer = layer.resize((new, new), Image.LANCZOS)
        off = (size - new) // 2
        img.paste(layer, (off, off), layer)
    else:
        img.paste(layer, (0, 0), layer)
    return img


def rounded(img, radius_ratio=0.22):
    size = img.size[0]
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255
    )
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def make(size, name, maskable=False):
    base = gradient(size)
    if maskable:
        base = draw_glyph(base, scale=0.72).convert("RGBA")
    else:
        base = draw_glyph(base)
        base = rounded(base)
    path = os.path.join(OUT, name)
    base.save(path, "PNG")
    print("saved", path, base.size)


make(192, "icon-192.png")
make(512, "icon-512.png")
make(180, "icon-180.png")
make(512, "icon-maskable-512.png", maskable=True)
