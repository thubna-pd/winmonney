# Màn — đặc tả cho máy đọc

Mỗi màn là markup HTML/CSS dựng từ Figma (không phải ảnh). Toạ độ data-el tính trong root màn (rộng 375), đo trên bản dựng bằng Chrome headless. Status bar, bàn phím iOS: `data-mock="os"` — KHÔNG DỰNG, do OS vẽ.

## SCR-01 · Trang chủ · DR mode

- Figma node: 1:13043
- Markup: `dom/scr-01.html` · khổ 375×812
- Mục đích: Banner dưới navbar, data timestamp trong banner. Nút giữ style, tap thì bị chặn.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `avatar` | 12 | 56 | 32 | 32 |
| `bell` | 331 | 56 | 32 | 32 |
| `banner` | 16 | 100 | 343 | 58 |
| `qr` | 162 | 182 | 80 | 32 |
| `bank-chip` | 248 | 182 | 68 | 32 |
| `nap-rut` | 0 | 386 | 120 | 76 |
| `quet-qr` | 128 | 386 | 120 | 76 |
| `chuyen-tien` | 255 | 386 | 120 | 76 |
| `slide-cta` | 40 | 575 | 108 | 31 |
| `xem-them` | 291 | 657 | 68 | 20 |

## SCR-02 · Dialog giải thích DR

- Figma node: khuôn 107:6796
- Markup: `dom/scr-02.html` · khổ 375×812
- Mục đích: Xem được gì, chưa làm được gì, dự kiến xong lúc nào. Dòng dự kiến ẩn nếu backend không trả.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `avatar` | 12 | 56 | 32 | 32 |
| `bell` | 331 | 56 | 32 | 32 |
| `banner` | 16 | 100 | 343 | 58 |
| `qr` | 162 | 182 | 80 | 32 |
| `bank-chip` | 248 | 182 | 68 | 32 |
| `nap-rut` | 0 | 386 | 120 | 76 |
| `quet-qr` | 128 | 386 | 120 | 76 |
| `chuyen-tien` | 255 | 386 | 120 | 76 |
| `slide-cta` | 40 | 575 | 108 | 31 |
| `xem-them` | 291 | 657 | 68 | 20 |
| `dlg-close` | 40 | 506 | 295 | 48 |

## SCR-03 · Dialog chặn action

- Figma node: khuôn 107:6796
- Markup: `dom/scr-03.html` · khổ 375×812
- Mục đích: Đóng: ở lại màn cũ. Tìm hiểu thêm: mở SCR-02.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `avatar` | 12 | 56 | 32 | 32 |
| `bell` | 331 | 56 | 32 | 32 |
| `banner` | 16 | 100 | 343 | 58 |
| `qr` | 162 | 182 | 80 | 32 |
| `bank-chip` | 248 | 182 | 68 | 32 |
| `nap-rut` | 0 | 386 | 120 | 76 |
| `quet-qr` | 128 | 386 | 120 | 76 |
| `chuyen-tien` | 255 | 386 | 120 | 76 |
| `slide-cta` | 40 | 575 | 108 | 31 |
| `xem-them` | 291 | 657 | 68 | 20 |
| `dlg-close` | 40 | 454 | 295 | 48 |
| `dlg-learn` | 40 | 510 | 295 | 48 |

## SCR-04 · Lịch sử giao dịch · DR mode

- Figma node: 1:37591
- Markup: `dom/scr-04.html` · khổ 375×812
- Mục đích: Data tới mốc. Cuối list có note; giao dịch chưa có kết quả hiện “Đang xử lý”.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `back` | 12 | 56 | 32 | 32 |
| `search` | 287 | 56 | 32 | 32 |
| `filter` | 331 | 56 | 32 | 32 |
| `banner` | 16 | 120 | 343 | 58 |
| `row-1` | 16 | 266 | 343 | 90 |
| `row-failed` | 16 | 742 | 343 | 84 |
| `amount-failed` | 295 | 754 | 64 | 24 |
| `status-failed` | 312 | 798 | 47 | 16 |

## SCR-05 · Chi tiết giao dịch · DR mode

- Figma node: 1:37605
- Markup: `dom/scr-05.html` · khổ 375×812
- Mục đích: Như thường, thêm banner.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `back` | 12 | 56 | 32 | 32 |
| `banner` | 16 | 120 | 343 | 58 |

## SCR-06 · Tài khoản · DR mode

- Figma node: 1:41327
- Markup: `dom/scr-06.html` · khổ 375×1046
- Mục đích: Xem như thường. Bảo mật, định danh, thanh toán, thông báo: tap thì bị chặn. Đăng xuất: như thường.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `back` | 12 | 56 | 80 | 32 |
| `banner` | 16 | 116 | 343 | 58 |
| `xac-minh` | 16 | 278 | 343 | 56 |
| `cai-dat-thong-bao` | 16 | 382 | 343 | 56 |
| `doi-pin` | 16 | 438 | 343 | 56 |
| `sinh-trac` | 16 | 494 | 343 | 73 |
| `smart-otp` | 270 | 579 | 89 | 32 |
| `thanh-toan-tu-dong` | 16 | 671 | 343 | 70 |
| `lien-he` | 16 | 789 | 343 | 56 |
| `dieu-khoan` | 16 | 845 | 343 | 56 |
| `logout` | 16 | 961 | 343 | 48 |

## SCR-07 · Quản lý tài khoản/thẻ · DR mode

- Figma node: 1:27571
- Markup: `dom/scr-07.html` · khổ 375×812
- Mục đích: List như thường. Thêm tài khoản: bị chặn.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `back` | 12 | 56 | 80 | 32 |
| `banner` | 16 | 120 | 343 | 58 |
| `item-tcb` | 16 | 194 | 343 | 66 |
| `item-bidv` | 16 | 276 | 343 | 66 |
| `add-account` | 16 | 727 | 343 | 48 |

## SCR-08 · Chuyển tiền · DR bật giữa luồng

- Figma node: 1:31946
- Markup: `dom/scr-08.html` · khổ 375×812
- Mục đích: Màn không bị đóng. Bấm Chuyển tiền khi DR còn on: Dialog chặn, data giữ nguyên.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `amount` | 171 | 245 | 34 | 48 |
| `cta` | 16 | 409 | 343 | 48 |
| `dlg-close` | 40 | 454 | 295 | 48 |
| `dlg-learn` | 40 | 510 | 295 | 48 |

## SCR-09 · Kết quả · đang xử lý

- Figma node: 1:31824
- Markup: `dom/scr-09.html` · khổ 375×812
- Mục đích: Dùng lại màn Pending hiện có, không đổi.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `status` | 32 | 284 | 311 | 28 |
| `cta-dong` | 16 | 727 | 343 | 48 |

## SCR-10 · Trang chủ · pull-to-refresh

- Figma node: 1:13043 + Loading
- Markup: `dom/scr-10.html` · khổ 375×812
- Mục đích: Icon Loading 24 xoay trong vùng cao 56 dưới banner.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `avatar` | 12 | 56 | 32 | 32 |
| `bell` | 331 | 56 | 32 | 32 |
| `banner` | 16 | 100 | 343 | 58 |
| `qr` | 162 | 238 | 80 | 32 |
| `bank-chip` | 248 | 238 | 68 | 32 |
| `nap-rut` | 0 | 442 | 120 | 76 |
| `quet-qr` | 128 | 442 | 120 | 76 |
| `chuyen-tien` | 255 | 442 | 120 | 76 |
| `slide-cta` | 40 | 631 | 108 | 31 |
| `xem-them` | 291 | 713 | 68 | 20 |

## SCR-11 · Trang chủ · DR tắt

- Figma node: 1:13043 + Toast bar
- Markup: `dom/scr-11.html` · khổ 375×812
- Mục đích: Banner mất. Toast Positive chỉ khi vừa pull-to-refresh.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `avatar` | 12 | 56 | 32 | 32 |
| `bell` | 331 | 56 | 32 | 32 |
| `qr` | 162 | 124 | 80 | 32 |
| `bank-chip` | 248 | 124 | 68 | 32 |
| `nap-rut` | 0 | 328 | 120 | 76 |
| `quet-qr` | 128 | 328 | 120 | 76 |
| `chuyen-tien` | 255 | 328 | 120 | 76 |
| `slide-cta` | 40 | 517 | 108 | 31 |
| `xem-them` | 291 | 599 | 68 | 20 |
| `toast` | 16 | 648 | 343 | 40 |

## SCR-13 · Notification center · DR mode

- Figma node: 21:8494
- Markup: `dom/scr-13.html` · khổ 375×812
- Mục đích: List như thường + banner + 1 noti “Hệ thống đang bảo trì” (demo).

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `back` | 12 | 56 | 32 | 32 |
| `banner` | 16 | 121 | 343 | 58 |
| `chip-he-thong` | 294 | 195 | 81 | 32 |
| `doc-tat-ca` | 236 | 243 | 134 | 32 |
| `noti-dr` | 1 | 275 | 373 | 103 |

## SCR-14 · Login · DR mode

- Figma node: 1:8132
- Markup: `dom/scr-14.html` · khổ 375×812
- Mục đích: Đăng nhập như thường, banner dưới status bar. Quên mã PIN?: Dialog chặn.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `banner` | 16 | 60 | 343 | 58 |
| `pin` | 110 | 230 | 156 | 16 |
| `face` | 16 | 286 | 343 | 48 |
| `cta` | 16 | 409 | 343 | 48 |
| `forgot` | 16 | 465 | 170 | 48 |
| `switch` | 189 | 465 | 170 | 48 |

## SCR-17 · Nhập số điện thoại · DR mode

- Figma node: 1:8028
- Markup: `dom/scr-17.html` · khổ 375×812
- Mục đích: Nhập SĐT như thường, banner dưới status bar. SĐT chưa có tài khoản (đăng ký mới): Dialog chặn.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `banner` | 16 | 60 | 343 | 58 |
| `phone-input` | 16 | 178 | 343 | 48 |
| `phone-saved` | 16 | 242 | 192 | 78 |
| `cta` | 16 | 457 | 343 | 48 |

## SCR-16 · Chi tiết nguồn tiền · DR mode

- Figma node: 1:27572
- Markup: `dom/scr-16.html` · khổ 375×1029
- Mục đích: Như thường, thêm banner. ⋯ → Huỷ liên kết: Dialog chặn.

| data-el | X | Y | W | H |
|---|---|---|---|---|
| `back` | 12 | 56 | 80 | 32 |
| `more` | 331 | 56 | 32 | 32 |
| `banner` | 16 | 120 | 343 | 58 |

