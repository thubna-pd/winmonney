"""Sinh dom/scr-*.html từ màn nền dựng bằng UI element thật (dom/base/<key>.html — markup từ Figma,
KHÔNG dùng ảnh chụp màn) + phần DR (banner, dialog, toast, loading, noti) cũng là markup.
Sau đó đo vị trí mọi [data-el] bằng Chrome headless → anchors.js (điểm neo mũi tên flow, GHL-14).
Chạy: python3 gen_dom.py   rồi   python3 build.py"""
import base64, html, json, pathlib, re, subprocess
ROOT = pathlib.Path(__file__).parent
DOM, BASE = ROOT/'dom', ROOT/'dom'/'base'
CHROME = __import__('os').environ.get('CHROME', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')

# _dr.css = _dr.src.css với icon mask nhúng data URI (CSS mask bị chặn cross-origin khi mở file://)
_src = (DOM/'_dr.src.css').read_text(encoding='utf-8')
_css = re.sub(r'url\("\.\./assets/([^"]+\.svg)"\)',
              lambda m: 'url("data:image/svg+xml;base64,' + base64.b64encode((ROOT/'assets'/m.group(1)).read_bytes()).decode() + '")', _src)
(DOM/'_dr.css').write_text(_css, encoding='utf-8')

COPY = dict(
  bannerTitle='Hệ thống đang bảo trì',
  bannerKnown='Dữ liệu tính đến 28/09/2026 14:30:00',
  bannerUnknown='Dữ liệu có thể chưa được cập nhật mới nhất',
  listNote='Giao dịch sau 28/09/2026 14:30:00 sẽ hiển thị sau khi bảo trì hoàn tất.',
  explainTitle='Hệ thống đang bảo trì',
  explainBody='Bạn vẫn xem được số dư, lịch sử giao dịch và thông tin tài khoản. Giao dịch và thay đổi thông tin sẽ thực hiện được sau khi bảo trì hoàn tất.',
  explainEta='Dự kiến hoàn tất lúc 28/09/2026 16:00:00.',
  blockTitle='Tính năng đang bảo trì',
  blockBody='Hệ thống đang bảo trì nên chưa thực hiện được thao tác này. Bạn vui lòng thử lại sau khi bảo trì hoàn tất.',
  close='Đóng', learn='Tìm hiểu thêm', toast='Hệ thống đã hoạt động bình thường',
  notiDr='Hệ thống đang bảo trì. Bạn vẫn xem được số dư và lịch sử giao dịch; giao dịch sẽ thực hiện được sau khi bảo trì hoàn tất.',
  notiDrill='Hệ thống bảo trì từ 23/10/2026 22:00:00 đến 23/10/2026 23:00:00. Trong thời gian này, bạn chỉ xem được số dư và lịch sử giao dịch.',
)

def base(key): return (BASE/f'{key}.html').read_text(encoding='utf-8')
def P(parts, name): return f' data-el="{name}"' if parts else ''
def banner(kind='known', parts=False):
    s = COPY['bannerUnknown'] if kind == 'unknown' else COPY['bannerKnown']
    return (f'<button class="dr-banner" type="button" data-el="banner"><span class="ic warn"{P(parts,"b-icon")}><i></i></span>'
            f'<span class="txt"><span class="t"{P(parts,"b-title")}>{COPY["bannerTitle"]}</span><span class="s"{P(parts,"b-sub")}>{s}</span></span>'
            f'<span class="ic chev"{P(parts,"b-chev")}><i></i></span></button>')
def dialog(kind, parts=False):
    if kind == 'explain':
        c = (f'<p class="title"{P(parts,"d-title")}>{COPY["explainTitle"]}</p><p class="body"{P(parts,"d-body")}>{COPY["explainBody"]}</p>'
             f'<p class="body"{P(parts,"d-eta")}>{COPY["explainEta"]}</p>')
        b = f'<button class="btn primary" type="button" data-el="dlg-close">{COPY["close"]}</button>'
        ill = 'illus-warning.png'              # 29/09: dùng chung Illus/Warning với Dialog chặn
    else:
        c = f'<p class="title"{P(parts,"d-title")}>{COPY["blockTitle"]}</p><p class="body"{P(parts,"d-body")}>{COPY["blockBody"]}</p>'
        b = (f'<button class="btn primary" type="button" data-el="dlg-close">{COPY["close"]}</button>'
             f'<button class="btn secondary" type="button" data-el="dlg-learn">{COPY["learn"]}</button>')
        ill = 'illus-warning.png'
    return (f'<div class="dlg-overlay"{P(parts,"d-overlay")}><div class="dlg"{P(parts,"dlg")}><div class="content"><img alt="" src="../assets/{ill}"{P(parts,"d-illus")}>{c}</div>'
            f'<div class="btns">{b}</div></div></div>')
def toast(): return f'<div class="toast" data-el="toast"><div class="tc"><img alt="" src="../assets/icon-check.svg"><p>{COPY["toast"]}</p></div></div>'
PTR = '<div class="ptr"><span class="ic loading"><i></i></span></div>'
def noti(text):
    # Noti item (Figma I21:8494;40:477) — Hệ thống · Vừa xong · chấm đỏ · nội dung Semi Bold (chưa đọc), tối đa 2 dòng
    return ('<div class="noti" data-el="noti-dr"><div class="nic"><span class="ic warn-k"><i></i></span></div><div class="nd">'
            '<div class="nt"><span class="cat">Hệ thống</span><span class="tm">Vừa xong</span><span class="dot"></span></div>'
            f'<p class="nb">{text}</p></div></div>')

def slot(frag, name, content):
    tag = f'<div data-slot="{name}"></div>'
    assert tag in frag, f'thiếu slot {name}'
    return frag.replace(tag, content, 1)
def with_banner(key, kind='known', pad='16px 16px 0', extra=''):
    return slot(base(key), 'banner', f'<div class="dr-banner-wrap" style="padding:{pad}">{banner(kind)}</div>{extra}')
def overlay(frag, content):                     # lớp phủ đặt SAU root (cấp body) để không bị CSS của màn nền ghi đè
    return frag + content
def grow(frag):                                  # bỏ chiều cao cố định của root để thấy hết nội dung
    return re.sub(r'(<div class="b-[\w-]+")', r'\1 data-grow', frag, count=1)

HOME_PAD = '0 16px'
PAGES = {
  'scr-01':  with_banner('home', pad=HOME_PAD),
  'scr-01b': with_banner('home', 'unknown', pad=HOME_PAD),
  'scr-02':  overlay(with_banner('home', pad=HOME_PAD), dialog('explain')),
  'scr-03':  overlay(with_banner('home', pad=HOME_PAD), dialog('block')),
  'scr-10':  with_banner('home', pad=HOME_PAD, extra=PTR),
  'scr-11':  overlay(base('home'), toast()),
  'scr-11b': base('home'),
  'scr-04':  with_banner('history'),
  'scr-05':  with_banner('detail'),
  'scr-06':  grow(with_banner('account', pad='16px 16px 8px')),
  'scr-06b': overlay(grow(with_banner('account', pad='16px 16px 8px')), dialog('block')),
  'scr-07':  with_banner('sources'),
  'scr-08a': base('transfer'),
  'scr-08':  overlay(base('transfer'), dialog('block')),
  'scr-09':  base('pending'),
  'scr-13':  slot(with_banner('notification'), 'noti-first', noti(COPY['notiDr'])),
  'scr-14':  slot(base('login'),'banner',''),
  'scr-14b': overlay(slot(base('login'),'banner',''), dialog('block')),
  'scr-17':  slot(base('phone'),'banner',''),
  'scr-17b': overlay(slot(base('phone'),'banner',''), dialog('explain')),
  'scr-18':  base('otp'),
  'scr-18b': overlay(base('otp'), dialog('block')),
  'scr-19':  base('pin'),
  'scr-19b': overlay(base('pin'), dialog('block')),
  'scr-16':  grow(with_banner('source-detail')),
  'scr-16b': overlay(grow(with_banner('source-detail')), dialog('block')),
}
# Trang Handoff UI: component đứng riêng (gắn data-el từng thành phần để đo Hình học) + demo scroll của banner
UIB = '<div class="b-ui" style="width:375px;padding:16px;background:#fafafa">{}</div>'
PAGES['ui-banner-known'] = UIB.format(banner('known', True))
PAGES['ui-banner-unknown'] = UIB.format(banner('unknown', True))
UID = '<div class="b-ui" style="width:375px;height:812px;background:#fff"></div>'
PAGES['ui-dialog-explain'] = UID + dialog('explain', True)
PAGES['ui-dialog-block'] = UID + dialog('block', True)
# Q10: banner sticky ở mép trên vùng cuộn (dưới header); nội dung cuộn phía dưới banner
SCROLL_CSS = ('<style>.b-account{height:812px!important;display:flex;flex-direction:column}'
  '.b-account .body{flex:1 1 0;min-height:0;overflow-y:auto!important;scrollbar-width:none}'
  '.b-account .body::-webkit-scrollbar{display:none}.b-account .body>*{flex-shrink:0}'
  '.b-account .body>.dr-banner-wrap{position:sticky;top:0;z-index:5;background:var(--alias\\/layer\\/layer-01,#fafafa)}</style>')
_acc = with_banner('account', pad='16px 16px 8px')
PAGES['ui-scroll-0'] = SCROLL_CSS + _acc
PAGES['ui-scroll-1'] = SCROLL_CSS + _acc + '<script>document.querySelector(".b-account .body").scrollTop=260</script>'
# Lớp phủ riêng cho prototype: chỉ dialog, nền trong suốt, đặt đè lên màn đang xem
OV = '<style>html,body{{background:transparent!important}}</style><div class="b-ov" style="position:relative;width:375px;height:812px">{}</div>'
PAGES['ov-explain'] = OV.format(dialog('explain'))
PAGES['ov-block'] = OV.format(dialog('block'))
PAGES['ov-toast'] = OV.format(toast())
# Q14 + Q20: dòng "Đang xử lý" (thay nhãn Thất bại, màu support-warning; số tiền màu thường) + ghi chú cuối list
_h = with_banner('history')
_h = re.sub(r'(data-el="status-failed"[^>]*>)\s*Thất bại', r'\1Đang xử lý', _h, count=1)
_h = ('<style>[data-el=status-failed]{color:var(--support-warning)!important}'
      '[data-el=amount-failed],[data-el=amount-failed] *{color:var(--text-primary)!important;opacity:1!important}</style>') + _h
PAGES['scr-04c'] = grow(slot(_h, 'list-end', f'<div class="dr-list-note" data-el="list-note">{COPY["listNote"]}</div>')) if 'data-slot="list-end"' in _h else grow(_h)

TPL = '''<!DOCTYPE html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=375">
<title>{name} · DR Mode</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="_dr.css"></head>
<body class="page" style="--ph:{ph}px">{body}
<script>
/* đo toạ độ [data-el] trong màn (375 × H) — dùng làm điểm neo mũi tên flow */
(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){{
  var root=document.querySelector('[class^="b-"]'); var R=root.getBoundingClientRect(); var out={{__h:Math.round(root.hasAttribute('data-grow')?root.scrollHeight:root.offsetHeight)}};
  document.querySelectorAll('[data-el]').forEach(function(e){{var r=e.getBoundingClientRect(); out[e.dataset.el]=[r.left-R.left,r.top-R.top,r.width,r.height].map(function(v){{return Math.round(v*10)/10;}});}});
  document.documentElement.setAttribute('data-anchors',JSON.stringify(out));
}});
</script></body></html>
'''
anch = {}
for name, body in PAGES.items():
    f = DOM/f'{name}.html'
    f.write_text(TPL.format(name=name, body=body, ph=812), encoding='utf-8')
    def measure(hgt):
        out = subprocess.run([CHROME, '--headless=new', '--disable-gpu', f'--window-size=375,{hgt}', '--virtual-time-budget=5000',
                              '--dump-dom', f.as_uri()], capture_output=True, text=True).stdout
        m = re.search(r'data-anchors="([^"]*)"', out)
        return json.loads(html.unescape(m.group(1))) if m else {'__h': 812}
    a = measure(812)
    if a.get('__h', 812) != 812:                         # trang cao hơn 812: lớp phủ phủ đúng chiều cao trang
        f.write_text(TPL.format(name=name, body=body, ph=a['__h']), encoding='utf-8'); a = measure(a['__h'])
    anch[f'dom/{name}.html'] = a
    print('ok', name, anch[f'dom/{name}.html'].get('__h'), len(anch[f'dom/{name}.html']) - 1, 'el')
(ROOT/'anchors.js').write_text('window.ANCH = ' + json.dumps(anch, ensure_ascii=False, indent=0) + ';\n', encoding='utf-8')
