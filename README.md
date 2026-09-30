# Handoff · DR Mode trên App WinMoney · Phase 1

Bản bàn giao thiết kế cho ticket **#17137 — DR Mode (View Mode)**: khi site chính sự cố, app chạy site dự phòng, user chỉ xem được thông tin, mọi action làm đổi tiền hoặc dữ liệu bị chặn khi tap. Trên UI gọi là **“Hệ thống đang bảo trì”**.

Site tĩnh, không cần build để xem. Mở được trực tiếp bằng `file://` hoặc qua GitHub Pages.

## Xem nhanh

| Trang | Đường dẫn |
|---|---|
| Landing (danh sách bản) | `index.html` |
| Handoff v1.0 | `v1.0/index.html` |
| Prototype (3 kịch bản) | `v1.0/prototype.html` |
| Bản cho AI của dev đọc (Markdown) | `v1.0/out/ai/` |

Chạy local (để iframe màn hình nạp đủ):

```bash
python3 -m http.server 4323
```

rồi mở `http://localhost:4323`.

### GitHub Pages

Settings → Pages → Deploy from a branch → chọn nhánh `main`, thư mục `/ (root)`. File `.nojekyll` đã có sẵn để Pages không bỏ qua file bắt đầu bằng `_` (vd `v1.0/dom/_dr.css`).

## Nội dung bản v1.0

- **Overview**: flow tổng thể + link prototype.
- **FL-01 → FL-05**: sơ đồ flow từng luồng (UC1–UC5) và bảng case theo màn.
- **Handoff UI**: UI-01 Banner bảo trì (2 variant + behavior khi scroll), UI-02 Dialog bảo trì (2 variant).
- **2 view mode**: “Người đọc” và “AI của dev đọc” (markdown máy đọc: node/cạnh sơ đồ, điểm neo `data-el`, token kèm giá trị, hình học, chuỗi chữ). Hai mode sinh từ cùng một nguồn dữ liệu.

Nguồn thiết kế: Figma `[Overview] WinMoney Masterflow` (fileKey `L8SweQCDdHX93TJFBPjGsp`), trang **DR Mode**. Token theo WIN-DLS, câu chữ theo WIN-UXW.

## Cấu trúc

```
index.html                  landing
.nojekyll
v1.0/
  index.html                bản phát hành (đã nhúng data.js + anchors.js) — KHÔNG sửa tay
  prototype.html            prototype phát hành — KHÔNG sửa tay
  index.template.html       nguồn SPA (renderer flow, Handoff UI, view AI)
  prototype.template.html   nguồn prototype
  data.js                   NGUỒN NỘI DUNG: flow, case, màn, Handoff UI
  anchors.js                toạ độ element trong từng màn (sinh bởi gen_dom.py)
  gen_dom.py                ghép màn DR từ dom/base/* và đo toạ độ element
  build.py                  nhúng dữ liệu vào index/prototype, xuất out/ai/**
  flowcheck.js              script kiểm sơ đồ flow (phải đạt 0 mọi mục)
  dom/
    base/*.html             màn nền dựng lại từ Figma (markup, không phải ảnh)
    _dr.src.css             CSS component DR (nguồn) → _dr.css (đã nhúng icon)
    scr-*.html, ui-*.html   màn/biến thể đã ghép (sinh bởi gen_dom.py)
  assets/                   icon, illustration, asset xuất từ Figma
  out/ai/                   bản markdown cho AI của dev (sinh bởi build.py)
```

## Cập nhật nội dung

Yêu cầu: Python 3 và Google Chrome (dùng chế độ headless để đo toạ độ và xuất markdown).

1. Sửa nội dung ở `v1.0/data.js` (hoặc `dom/base/*`, `dom/_dr.src.css`, `gen_dom.py` nếu đổi UI).
2. Build lại:

   ```bash
   cd v1.0
   python3 gen_dom.py   # chỉ cần khi đổi màn/markup
   python3 build.py
   ```

   Nếu Chrome không nằm ở đường dẫn mặc định của macOS, đặt biến môi trường `CHROME`:

   ```bash
   CHROME="/usr/bin/google-chrome" python3 build.py
   ```

3. Kiểm flow: mở `v1.0/index.html`, dán nội dung `flowcheck.js` vào console → mọi mục trong `total` phải bằng 0.
4. Commit cả file nguồn lẫn file đã build (`index.html`, `prototype.html`, `dom/*.html`, `anchors.js`, `out/ai/**`).

## Deploy lên Vercel

Repo là site tĩnh, không cần build. Trên Vercel: **Add New → Project → Import** repo này, Framework Preset chọn **Other**, để trống Build Command, Output Directory để mặc định (thư mục gốc). Mỗi lần push lên `main`, Vercel tự deploy lại trên cùng domain.
