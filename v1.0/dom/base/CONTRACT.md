# Hợp đồng dựng màn nền (base screen) — handoff DR Mode

Mục tiêu: dựng lại màn hiện có trong Figma thành **UI element thật (HTML/CSS)**, không dùng ảnh
chụp màn. Figma file `L8SweQCDdHX93TJFBPjGsp` (WinMoney Masterflow). Load skill
`figma:figma-design-to-code` trước khi gọi `get_design_context`. Token theo WIN-DLS (`alias/*`,
`gap/*`, `font size/*`…) — dùng `var(--token, #fallback)` đúng như code Figma trả về.

## File ra
- `v1.0/dom/base/<key>.html` — **fragment**, không có `<html>/<head>/<body>`:
  ```html
  <style>/* mọi selector bắt đầu bằng .b-<key> */</style>
  <div class="b-<key>" data-h="<chiều cao frame Figma>"> … </div>
  ```
- Root: `position:relative; width:375px; height:<H>px; overflow:hidden;` H = chiều cao frame Figma.
- Font: Inter (trang bọc ngoài đã nạp). Không `@import` font trong fragment.
- Layout: dùng flex / auto-layout như Figma (gap, padding) — chỉ dùng `position:absolute` khi Figma
  cũng absolute. Số đo lấy từ Figma, không ước lượng.

## Asset
- Tải mọi SVG/ảnh bằng `curl` từ URL mà `get_design_context` / `download_assets` trả về, lưu vào
  `v1.0/assets/figma/<key>/<tên-mô-tả>.<ext>`; tham chiếu **tương đối từ thư mục dom/**:
  `../assets/figma/<key>/<file>`. Không để lại URL `figma.com/api/mcp/asset`.
- Icon, logo, illustration, ảnh banner khuyến mãi = asset ảnh (hợp lệ). **Toàn bộ màn không được là
  một ảnh chụp.** Chữ, nút, list, card phải là markup.
- Bàn phím iOS (nếu có) là mock của OS: được phép export 1 ảnh PNG, gắn `data-mock="os"`.
- Status bar, home indicator: dựng markup/asset như Figma, gắn `data-mock="os"`.
- Layer đang `hidden` trong Figma thì không dựng.

## Điểm neo cho flow
Gắn `data-el="<id>"` lên đúng element (nút, row, chip…) theo danh sách của từng màn. Element
phải có kích thước thật (không phải wrapper 0×0).

## Chỗ chèn banner DR
Đặt `<div data-slot="banner"></div>` (rỗng, không style) tại vị trí nêu trong danh sách của màn.
Không tự thêm padding/khoảng trống cho slot.

## Kiểm tra trước khi báo xong
1. Tạo trang bọc tạm trong scratchpad: `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">` + nội dung fragment, `body{margin:0}`; đường dẫn asset phải đúng khi đặt trang bọc cạnh `v1.0/dom/` (hoặc dùng `<base href="file:///…/v1.0/dom/">`).
2. Chụp bằng Chrome headless 2x:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=375,<H> --virtual-time-budget=4000 --screenshot=<out.png> file://<wrapper>`
3. So với `get_screenshot` của node Figma. Sửa đến khi khớp (vị trí, cỡ chữ, màu, icon). Chỉ 1–2 vòng sửa.
4. Báo lại ngắn: file, H, danh sách data-el đã gắn, chỗ lệch còn lại (nếu có).
