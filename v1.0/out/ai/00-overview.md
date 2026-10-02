# DR Mode trên App WinMoney · View Mode · Phase 1 — đặc tả cho máy đọc

Ticket #17137 · bản 1.0 · 29/09/2026 · Figma file `L8SweQCDdHX93TJFBPjGsp` ([Overview] WinMoney Masterflow)

## Phạm vi
- Site chính sự cố → app chạy site dự phòng. User chỉ xem được thông tin; mọi action làm đổi tiền hoặc dữ liệu bị chặn khi tap.
- Chữ trên UI dùng “Hệ thống đang bảo trì” / “đang bảo trì”. Không dùng “chế độ chỉ xem”, “tạm dừng”, “dự phòng” trên UI.
- Ngày giờ trên UI: `dd/mm/yyyy hh:mm:ss`.

## File trong bộ này
| File | Nội dung |
|---|---|
| `00-overview.md` | Phạm vi, danh sách luồng, màn, component, sơ đồ Overview |
| `01-flows/FL-01.md` | User biết app đang ở DR mode |
| `01-flows/FL-02.md` | Xem thông tin khi đang DR mode |
| `01-flows/FL-03.md` | Tap vào action bị chặn |
| `01-flows/FL-04.md` | DR mode bật khi user đang giao dịch |
| `01-flows/FL-05.md` | DR mode tắt, app về bình thường |
| `02-screens.md` | Từng màn: markup, chiều cao, điểm neo data-el |
| `03-ui/UI-01.md` | Banner bảo trì |
| `03-ui/UI-02.md` | Dialog bảo trì |

## Luồng
| ID | Tên | UC | Mô tả |
|---|---|---|---|
| FL-01 | User biết app đang ở DR mode | UC1 | Banner luôn hiện trên mọi màn xem. Dialog giải thích tự bật 1 lần mỗi session DR. |
| FL-02 | Xem thông tin khi đang DR mode | UC2 | Mọi màn xem chạy như thường. Mốc dữ liệu (data timestamp) nằm trong banner. |
| FL-03 | Tap vào action bị chặn | UC3 | Mọi entry point vào giao dịch hoặc đổi thông tin → Dialog chặn ngay khi tap, trước màn nhập và OTP/PIN. Nút giữ nguyên style. |
| FL-04 | DR mode bật khi user đang giao dịch | UC4 | Không trừ tiền khi user không biết, không bắt nhập lại. |
| FL-05 | DR mode tắt, app về bình thường | UC5 | Toast chỉ hiện khi user đang trong app và pull-to-refresh. Không cần login lại. |

## Handoff UI
| ID | Tên | Loại | Variant | Figma |
|---|---|---|---|---|
| UI-01 | Banner bảo trì | Component mới | Có data timestamp, Không có data timestamp | Chưa có trong Figma (dựng theo token WIN-DLS) |
| UI-02 | Dialog bảo trì | Dùng lại | Giải thích, Chặn action | Dialog 1672:2730 · khuôn “Dialog - Feature locked” 107:6796 |

## Màn
| ID | Tên | Figma node | Markup | Mục đích |
|---|---|---|---|---|
| SCR-01 | Trang chủ · DR mode | 1:13043 | `dom/scr-01.html` | Banner dưới navbar, data timestamp trong banner. Nút giữ style, tap thì bị chặn. |
| SCR-02 | Dialog giải thích DR | khuôn 107:6796 | `dom/scr-02.html` | Xem được gì, chưa làm được gì, dự kiến xong lúc nào. Dòng dự kiến ẩn nếu backend không trả. |
| SCR-03 | Dialog chặn action | khuôn 107:6796 | `dom/scr-03.html` | Đóng: ở lại màn cũ. Tìm hiểu thêm: mở SCR-02. |
| SCR-04 | Lịch sử giao dịch · DR mode | 1:37591 | `dom/scr-04.html` | Data tới mốc. Cuối list có note; giao dịch chưa có kết quả hiện “Đang xử lý”. |
| SCR-05 | Chi tiết giao dịch · DR mode | 1:37605 | `dom/scr-05.html` | Như thường, thêm banner. |
| SCR-06 | Tài khoản · DR mode | 1:41327 | `dom/scr-06.html` | Xem như thường. Bảo mật, định danh, thanh toán, thông báo, Đăng xuất: tap thì bị chặn. |
| SCR-07 | Quản lý tài khoản/thẻ · DR mode | 1:27571 | `dom/scr-07.html` | List như thường. Thêm tài khoản: bị chặn. |
| SCR-08 | Chuyển tiền · DR bật giữa luồng | 1:31946 | `dom/scr-08.html` | Màn không bị đóng. Bấm Chuyển tiền khi DR còn on: Dialog chặn, data giữ nguyên. |
| SCR-09 | Kết quả · đang xử lý | 1:31824 | `dom/scr-09.html` | Dùng lại màn Pending hiện có, không đổi. |
| SCR-10 | Trang chủ · pull-to-refresh | 1:13043 + Loading | `dom/scr-10.html` | Icon Loading 24 xoay trong vùng cao 56 dưới banner. |
| SCR-11 | Trang chủ · DR tắt | 1:13043 + Toast bar | `dom/scr-11.html` | Banner mất. Toast Positive chỉ khi vừa pull-to-refresh. |
| SCR-13 | Notification center · DR mode | 21:8494 | `dom/scr-13.html` | List như thường + banner + 1 noti “Hệ thống đang bảo trì” (demo). |
| SCR-14 | Login · DR mode | 1:8132 | `dom/scr-14.html` | Không cho đăng nhập. Banner dưới status bar; tap nút đăng nhập bất kỳ: Dialog giải thích. |
| SCR-17 | Nhập số điện thoại · DR mode | 1:8028 | `dom/scr-17.html` | Màn đầu của luồng đăng nhập khi máy chưa lưu tài khoản. Banner dưới status bar; tap Tiếp tục hoặc chọn SĐT đã dùng: Dialog giải thích. |
| SCR-16 | Chi tiết nguồn tiền · DR mode | 1:27572 | `dom/scr-16.html` | Như thường, thêm banner. ⋯ → Huỷ liên kết: Dialog chặn. |

## Sơ đồ Overview
### Node
| Node | Loại | Nội dung | Markup |
|---|---|---|---|
| `start` | Start/End | DR mode bật | — |
| `dA` | Decision (YES/NO) | Lần đầu mở app trong session DR? | — |
| `SCR-02` | Màn | SCR-02 · Dialog giải thích DR | `dom/scr-02.html` |
| `SCR-01` | Màn | SCR-01 · Trang chủ · DR mode | `dom/scr-01.html` |
| `SCR-03` | Màn | SCR-03 · Dialog chặn action | `dom/scr-03.html` |
| `SCR-02#b` | Màn | SCR-02 · Dialog giải thích DR | `dom/scr-02.html` |
| `SCR-10` | Màn | SCR-10 · Trang chủ · pull-to-refresh | `dom/scr-10.html` |
| `dE` | Decision (YES/NO) | DR mode đã tắt? | — |
| `SCR-11` | Màn | SCR-11 · Trang chủ · DR tắt | `dom/scr-11.html` |
| `SCR-01#c` | Màn | SCR-01 · Trang chủ · DR mode | `dom/scr-01.html` |
| `start2` | Start/End | DR bật khi đang giao dịch | — |
| `dF` | Decision (YES/NO) | Đã submit trước khi chuyển site? | — |
| `SCR-09` | Màn | SCR-09 · Kết quả · đang xử lý | `dom/scr-09.html` |
| `SCR-08#a` | Màn | SCR-08 · Chuyển tiền · DR bật giữa luồng | `dom/scr-08a.html` |
| `SCR-08` | Màn | SCR-08 · Chuyển tiền · DR bật giữa luồng | `dom/scr-08.html` |

### Cạnh
| Cạnh | Từ | Đến | Điều kiện / thao tác | Neo nguồn (data-el · x,y,w,h) |
|---|---|---|---|---|
| OV.E01 | `start` | `dA` | tiếp theo | — |
| OV.E02 | `dA` | `SCR-02` | YES | — |
| OV.E03 | `SCR-02` | `SCR-01` | tap `dlg-close` | `dlg-close` · 40,506,295,48 |
| OV.E04 | `dA` | `SCR-01` | NO | — |
| OV.E05 | `SCR-01` | `SCR-03` | tap `chuyen-tien` | `chuyen-tien` · 255,386,120,76 |
| OV.E06 | `SCR-03` | `SCR-02#b` | tap `dlg-learn` | `dlg-learn` · 40,510,295,48 |
| OV.E07 | `SCR-01` | `SCR-10` | Kéo xuống | — |
| OV.E08 | `SCR-10` | `dE` | tiếp theo | — |
| OV.E09 | `dE` | `SCR-11` | YES | — |
| OV.E10 | `dE` | `SCR-01#c` | NO | — |
| OV.E11 | `start2` | `dF` | tiếp theo | — |
| OV.E12 | `dF` | `SCR-09` | YES | — |
| OV.E13 | `dF` | `SCR-08#a` | NO | — |
| OV.E14 | `SCR-08#a` | `SCR-08` | tap `cta` | `cta` · 16,409,343,48 |
