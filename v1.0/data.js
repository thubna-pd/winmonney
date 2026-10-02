window.DATA = {
project: "DR Mode trên App WinMoney · View Mode · Phase 1",
version: "1.0",
date: "29/09/2026",
ticket: "#17137",
figma: { fileKey: "L8SweQCDdHX93TJFBPjGsp", name: "[Overview] WinMoney Masterflow" },

/* ================= FLOW TỔNG THỂ (Overview) ================= */
overallFlow: {
  sections: [
    { label: "① Mở app & tap action bị chặn", x: 26, y: 140, w: 1290 },
    { label: "② Pull-to-refresh", x: 780, y: 640, w: 536 },
    { label: "③ DR bật khi đang giao dịch", x: 26, y: 1000, w: 560 }
  ],
  nodes: [
    { id: "start", type: "terminal", label: "DR mode bật", x: 80, y: 320 },
    { id: "dA", type: "decision", label: "Lần đầu mở app trong session DR?", x: 300, y: 320 },
    { id: "SCR-02", type: "screenL", x: 520, y: 320 },
    { id: "SCR-01", type: "screenL", x: 740, y: 320 },
    { id: "SCR-03", type: "screenL", x: 980, y: 320 },
    { id: "SCR-02#b", ref: "SCR-02", type: "screenL", x: 1220, y: 320 },
    { id: "SCR-10", type: "screenL", x: 740, y: 800 },
    { id: "dE", type: "decision", label: "DR mode đã tắt?", x: 980, y: 800 },
    { id: "SCR-11", type: "screenL", x: 1220, y: 800 },
    { id: "SCR-01#c", ref: "SCR-01", type: "screenL", x: 980, y: 1080 },
    { id: "start2", type: "terminal", label: "DR bật khi đang giao dịch", x: 70, y: 1170 },
    { id: "dF", type: "decision", label: "Đã submit trước khi chuyển site?", x: 270, y: 1170 },
    { id: "SCR-09", type: "screenL", x: 470, y: 1170 },
    { id: "SCR-08#a", ref: "SCR-08", dom: "dom/scr-08a.html", type: "screenL", x: 270, y: 1480 },
    { id: "SCR-08", type: "screenL", x: 470, y: 1480 }
  ],
  edges: [
    { from: "start", to: "dA" },
    { from: "dA", to: "SCR-02", label: "YES" },
    { from: "SCR-02", to: "SCR-01", fromEl: "dlg-close", fromSide: "right" },
    { from: "dA", to: "SCR-01", label: "NO", via: [{ x: 300, y: 165 }, { x: 740, y: 165 }] },
    { from: "SCR-01", to: "SCR-03", fromEl: "chuyen-tien", fromSide: "right" },
    { from: "SCR-03", to: "SCR-02#b", fromEl: "dlg-learn", fromSide: "right" },
    { from: "SCR-01", to: "SCR-10", label: "Kéo xuống" },
    { from: "SCR-10", to: "dE" },
    { from: "dE", to: "SCR-11", label: "YES" },
    { from: "dE", to: "SCR-01#c", label: "NO" },
    { from: "start2", to: "dF" },
    { from: "dF", to: "SCR-09", label: "YES" },
    { from: "dF", to: "SCR-08#a", label: "NO" },
    { from: "SCR-08#a", to: "SCR-08", fromEl: "cta", fromSide: "right" }
  ]
},

/* ================= LUỒNG ================= */
flows: [
{
  id: "FL-01", name: "User biết app đang ở DR mode", uc: "UC1",
  desc: "Banner luôn hiện trên mọi màn xem. Dialog giải thích tự bật 1 lần mỗi session DR.",
  diagrams: [
    { id: "sc-0", name: "Mở app hoặc app quay lại foreground",
      note: "User mất mạng không phải DR: hiện lỗi mạng như hiện tại, không hiện banner.",
      dg: { nodes: [
        { id: "s", type: "terminal", label: "Mở app / quay lại foreground", x: 0, y: 0 },
        { id: "d0", type: "decision", label: "Backend báo DR mode on?", x: 200, y: 0 },
        { id: "e0", type: "terminal", label: "App chạy bình thường", x: 200, y: 230 },
        { id: "d1", type: "decision", label: "Lần đầu trong session DR?", x: 420, y: 0 },
        { id: "a", ref: "SCR-02", type: "screen", x: 620, y: 0 },
        { id: "b", ref: "SCR-01", type: "screen", x: 820, y: 0 } ],
      edges: [
        { from: "s", to: "d0" }, { from: "d0", to: "d1", label: "YES" }, { from: "d0", to: "e0", label: "NO" },
        { from: "d1", to: "a", label: "YES" }, { from: "a", to: "b", fromEl: "dlg-close", fromSide: "right" },
        { from: "d1", to: "b", label: "NO", via: [{ x: 420, y: 170 }, { x: 820, y: 170 }] } ] } },
    { id: "sc-1", name: "DR mode bật khi user đang dùng app",
      note: "Màn đang xem không bị đóng, không bật dialog. Banner hiện từ lần chuyển màn hoặc refresh kế tiếp.",
      dg: { nodes: [
        { id: "s", type: "terminal", label: "DR bật khi đang dùng", x: 0, y: 0 },
        { id: "d", type: "decision", label: "Chuyển màn hoặc refresh?", x: 200, y: 0 },
        { id: "a", ref: "SCR-04", type: "screen", x: 400, y: 0 },
        { id: "e2", type: "terminal", label: "Giữ màn đang xem", x: 200, y: 230 } ],
      edges: [ { from: "s", to: "d" }, { from: "d", to: "a", label: "YES" }, { from: "d", to: "e2", label: "NO" } ] } },
    { id: "sc-2", name: "Mở app khi cần đăng nhập",
      note: "Chặn ngay từ màn đầu tiên của luồng đăng nhập: màn nhập SĐT (chưa lưu tài khoản) hoặc màn nhập PIN (đã lưu). Không tự bật dialog khi mở màn. Tap CTA nào cũng mở Dialog giải thích, không gửi request.",
      dg: { nodes: [
        { id: "s", type: "terminal", label: "Mở app, cần đăng nhập", x: 0, y: 0 },
        { id: "d", type: "decision", label: "Backend báo DR mode on?", x: 200, y: 0 },
        { id: "e", type: "terminal", label: "Đăng nhập như thường", x: 200, y: 230 },
        { id: "d2", type: "decision", label: "Máy đã lưu tài khoản?", x: 420, y: 0 },
        { id: "a", ref: "SCR-14", type: "screen", x: 640, y: 0 },
        { id: "b", ref: "SCR-14", dom: "dom/scr-14b.html", type: "screen", x: 860, y: 0 },
        { id: "p", ref: "SCR-17", type: "screen", x: 640, y: 280 },
        { id: "pb", ref: "SCR-17", dom: "dom/scr-17b.html", type: "screen", x: 860, y: 280 } ],
      edges: [ { from: "s", to: "d" }, { from: "d", to: "d2", label: "YES" }, { from: "d", to: "e", label: "NO" },
        { from: "d2", to: "a", label: "YES" }, { from: "a", to: "b", fromEl: "cta", fromSide: "right" },
        { from: "d2", to: "p", label: "NO", via: [{ x: 420, y: 280 }] }, { from: "p", to: "pb", fromEl: "cta", fromSide: "right" } ] } }
  ],
  cases: [
    ["Mở app, chưa lưu tài khoản (cài mới, đã xoá tài khoản)", "SCR-17", "Màn nhập SĐT + banner; không cho đăng nhập", "—"],
    ["Tap Tiếp tục (kể cả khi chưa nhập SĐT) hoặc chọn SĐT đã dùng", "SCR-17 + Dialog giải thích", "Dialog giải thích; không gửi request, không gửi OTP", "Đóng → SCR-17, giữ SĐT đã nhập"],
    ["Mở app, đã lưu tài khoản (hết phiên)", "SCR-14", "Màn nhập PIN + banner; không cho đăng nhập", "—"],
    ["Tap Đăng nhập, Đăng nhập bằng khuôn mặt, Quên mã PIN?, Đổi tài khoản hoặc nhập đủ 6 số PIN", "SCR-14 + Dialog giải thích", "Dialog giải thích; không gửi request đăng nhập", "Đóng → SCR-14, xoá PIN đã nhập"],
    ["Mở app, lần đầu trong session DR", "SCR-02 trên SCR-01", "Dialog giải thích + banner", "Đóng → SCR-01"],
    ["Mở lại app, cùng session", "SCR-01", "Chỉ banner", "—"],
    ["App quay lại foreground", "Màn đang xem", "Check DR status trước khi nhận tap vào action giao dịch", "—"],
    ["DR bật khi đang dùng app", "Màn đang xem", "Giữ nguyên; banner hiện từ lần chuyển màn / refresh kế tiếp", "—"],
    ["Tap banner", "SCR-02", "Dialog giải thích", "Đóng → màn cũ"],
    ["DR bật lại (session mới)", "SCR-02", "Dialog giải thích bật lại 1 lần", "Đóng → SCR-01"],
    ["User mất mạng", "Màn đang xem", "Lỗi mạng như hiện tại, không banner", "—"],
    ["Trong suốt DR mode", "Mọi màn", "Không logout, không xoá data đang hiển thị", "—"]
  ],
  stops: []
},
{
  id: "FL-02", name: "Xem thông tin khi đang DR mode", uc: "UC2",
  desc: "Mọi màn xem chạy như thường. Mốc dữ liệu (data timestamp) nằm trong banner.",
  diagrams: [
    { id: "sc-0", name: "Từ Trang chủ đi các màn xem",
      note: "SCR-04 cuối list: có note về giao dịch sau mốc và row “Đang xử lý” cho giao dịch chưa có kết quả.",
      dg: { nodes: [
        { id: "s", type: "terminal", label: "Vào Trang chủ", x: 0, y: 0 },
        { id: "d", type: "decision", label: "Lấy được data timestamp?", x: 200, y: 0 },
        { id: "h", ref: "SCR-01", type: "screen", x: 400, y: 0 },
        { id: "hb", ref: "SCR-01", dom: "dom/scr-01b.html", type: "screen", x: 200, y: 280 },
        { id: "l", ref: "SCR-04", type: "screen", x: 620, y: 0 },
        { id: "lc", ref: "SCR-04", dom: "dom/scr-04c.html", type: "screen", x: 620, y: 300 },
        { id: "t", ref: "SCR-05", type: "screen", x: 850, y: 0 },
        { id: "ac", ref: "SCR-06", type: "screen", x: 400, y: 280 },
        { id: "sr", ref: "SCR-07", type: "screen", x: 400, y: -300 },
        { id: "nc", ref: "SCR-13", type: "screen", x: 620, y: -300 } ],
      edges: [
        { from: "s", to: "d" }, { from: "d", to: "h", label: "YES" }, { from: "d", to: "hb", label: "NO" },
        { from: "h", to: "l", fromEl: "xem-them", fromSide: "right" }, { from: "l", to: "t", fromEl: "row-1", fromSide: "right" },
        { from: "l", to: "lc", label: "Scroll tới cuối" },
        { from: "h", to: "ac", fromEl: "avatar", fromSide: "down" }, { from: "h", to: "sr", fromEl: "bank-chip", fromSide: "up" },
        { from: "h", to: "nc", fromEl: "bell", fromSide: "up" } ] } }
  ],
  cases: [
    ["Có data timestamp", "Mọi màn xem", "Banner: “Dữ liệu tính đến 28/09/2026 14:30:00”", "—"],
    ["Không lấy được timestamp", "Mọi màn xem", "Banner: “Dữ liệu có thể chưa được cập nhật mới nhất”; vẫn hiện số dư", "—"],
    ["Scroll tới cuối Lịch sử", "SCR-04", "Note: giao dịch sau mốc sẽ hiện sau khi bảo trì xong", "—"],
    ["Giao dịch chưa có kết quả tại mốc", "SCR-04", "Label “Đang xử lý” (support-warning) thay chỗ “Thất bại”; số tiền màu thường", "—"],
    ["Vào Notification center", "SCR-13", "List như thường + 1 noti “Hệ thống đang bảo trì”; mark as read xử lý ngầm", "—"],
    ["Ẩn/hiện số dư, filter lịch sử, FAQ, hotline, điều khoản", "Màn tương ứng", "Như thường", "—"]
  ],
  stops: []
},
{
  id: "FL-03", name: "Tap vào action bị chặn", uc: "UC3",
  desc: "Mọi entry point vào giao dịch hoặc đổi thông tin → Dialog chặn ngay khi tap, trước màn nhập và OTP/PIN. Nút giữ nguyên style.",
  diagrams: [
    { id: "sc-0", name: "Mọi entry point đều dẫn tới Dialog chặn",
      note: "Dialog hiện đè lên đúng màn user vừa tap. Đóng: ở lại màn đó. SCR-16: ⋯ mở sheet, tap Huỷ liên kết mới bị chặn.",
      dg: { nodes: [
        { id: "m1", ref: "SCR-01", type: "screen", x: 0, y: 0 },
        { id: "m2", ref: "SCR-06", type: "screen", x: 0, y: 260 },
        { id: "m3", ref: "SCR-07", type: "screen", x: 0, y: 520 },
        { id: "m4", ref: "SCR-16", type: "screen", x: 0, y: 780 },
        { id: "s", type: "terminal", label: "Deeplink / QR ngoài / push", x: 0, y: 1040 },
        { id: "dl", type: "decision", label: "Đích là tính năng giao dịch?", x: 200, y: 1040 },
        { id: "el", type: "terminal", label: "Mở màn đích như thường", x: 200, y: 1260 },
        { id: "b", ref: "SCR-03", type: "screen", x: 460, y: 520 },
        { id: "x", ref: "SCR-02", type: "screen", x: 680, y: 520 } ],
      edges: [
        { from: "m1", to: "b", fromEl: "chuyen-tien", fromSide: "right", toSide: "left", mergeX: 250 },
        { from: "m2", to: "b", fromEl: "logout", fromSide: "right", toSide: "left", mergeX: 250 },
        { from: "m3", to: "b", fromEl: "add-account", fromSide: "right", toSide: "left", mergeX: 250 },
        { from: "m4", to: "b", fromEl: "more", fromSide: "right", toSide: "left", mergeX: 250 },
        { from: "s", to: "dl" },
        { from: "dl", to: "b", label: "YES", toSide: "left", via: [{ x: 340, y: 1040 }, { x: 340, y: 520 }] },
        { from: "dl", to: "el", label: "NO" },
        { from: "b", to: "x", fromEl: "dlg-learn", fromSide: "right" } ] } }
  ],
  cases: [
    ["Nạp/Rút · Quét QR · Chuyển tiền", "SCR-01", "Dialog chặn", "Đóng → ở lại · Tìm hiểu thêm → SCR-02"],
    ["Mã QR trên thẻ số dư", "SCR-01", "Dialog chặn", "như trên"],
    ["“Liên kết ngay” trên slide banner", "SCR-01", "Dialog chặn", "như trên"],
    ["Thêm tài khoản", "SCR-07", "Dialog chặn", "như trên"],
    ["⋯ → Huỷ liên kết", "SCR-16", "Sheet mở như thường; tap Huỷ liên kết → Dialog chặn", "như trên"],
    ["Xác minh tài khoản · Cài đặt thông báo · Đổi PIN · Biometric · Smart OTP · Thanh toán tự động · Đăng xuất", "SCR-06", "Dialog chặn; toggle giữ nguyên state", "như trên"],
    ["Deeplink / QR ngoài / push tới giao dịch", "SCR-01", "Dialog chặn, không mở màn nhập", "Đóng → SCR-01"],
    ["Bấm CTA đi tiếp giữa luồng giao dịch", "SCR-08", "Dialog chặn", "Xem FL-04"]
  ],
  stops: []
},
{
  id: "FL-04", name: "DR mode bật khi user đang giao dịch", uc: "UC4",
  desc: "Không trừ tiền khi user không biết, không bắt nhập lại.",
  diagrams: [
    { id: "sc-0", name: "Đã submit hay còn ở màn nhập",
      note: "Áp dụng mọi màn nhập: Chuyển tiền, Nạp, Rút, Thanh toán. Đóng dialog thì data đã nhập giữ nguyên.",
      dg: { nodes: [
        { id: "s", type: "terminal", label: "DR bật khi đang giao dịch", x: 0, y: 0 },
        { id: "d1", type: "decision", label: "Đã submit giao dịch?", x: 200, y: 0 },
        { id: "p", ref: "SCR-09", type: "screen", x: 410, y: 0 },
        { id: "i", ref: "SCR-08", dom: "dom/scr-08a.html", type: "screen", x: 200, y: 260 },
        { id: "d2", type: "decision", label: "Bấm CTA khi DR còn on?", x: 440, y: 260 },
        { id: "b", ref: "SCR-08", type: "screen", x: 660, y: 260 },
        { id: "e3", type: "terminal", label: "Đi tiếp như thường", x: 440, y: 480 } ],
      edges: [
        { from: "s", to: "d1" }, { from: "d1", to: "p", label: "YES" },
        { from: "d1", to: "i", label: "NO" }, { from: "i", to: "d2", fromEl: "cta", fromSide: "right" },
        { from: "d2", to: "b", label: "YES" }, { from: "d2", to: "e3", label: "NO" } ] } }
  ],
  cases: [
    ["Đang ở màn nhập khi DR bật", "SCR-08", "Giữ nguyên, màn không bị đóng", "—"],
    ["Bấm CTA khi DR còn on", "SCR-08", "Dialog chặn", "Đóng → ở lại, data còn nguyên"],
    ["Đã submit trước khi chuyển site", "SCR-09", "Giao dịch đang xử lý, không báo thất bại", "—"],
    ["DR tắt khi vẫn ở màn nhập", "SCR-08", "CTA hoạt động lại", "—"]
  ],
  stops: []
},
{
  id: "FL-05", name: "DR mode tắt, app về bình thường", uc: "UC5",
  desc: "Toast chỉ hiện khi user đang trong app và pull-to-refresh. Không cần login lại.",
  diagrams: [
    { id: "sc-0", name: "Pull-to-refresh", note: "Có ở Trang chủ và Lịch sử giao dịch.",
      dg: { nodes: [
        { id: "h", ref: "SCR-01", type: "screen", x: 0, y: 0 },
        { id: "r", ref: "SCR-10", type: "screen", x: 220, y: 0 },
        { id: "d", type: "decision", label: "DR mode đã tắt?", x: 440, y: 0 },
        { id: "ok", ref: "SCR-11", type: "screen", x: 660, y: 0 },
        { id: "no", ref: "SCR-01", type: "screen", x: 440, y: 260 } ],
      edges: [
        { from: "h", to: "r", label: "Kéo xuống" }, { from: "r", to: "d" },
        { from: "d", to: "ok", label: "YES" }, { from: "d", to: "no", label: "NO" } ] } },
    { id: "sc-1", name: "Mở lại app hoặc chuyển màn", note: "Banner mất nhưng không có toast.",
      dg: { nodes: [
        { id: "s", type: "terminal", label: "Mở lại app / chuyển màn", x: 0, y: 0 },
        { id: "d", type: "decision", label: "DR mode đã tắt?", x: 200, y: 0 },
        { id: "ok", ref: "SCR-11", dom: "dom/scr-11b.html", type: "screen", x: 410, y: 0 },
        { id: "no", ref: "SCR-01", type: "screen", x: 200, y: 260 } ],
      edges: [ { from: "s", to: "d" }, { from: "d", to: "ok", label: "YES" }, { from: "d", to: "no", label: "NO" } ] } }
  ],
  cases: [
    ["Pull-to-refresh, DR đã tắt", "SCR-10 → SCR-11", "Banner mất + toast 1 lần", "—"],
    ["Pull-to-refresh, DR còn on", "SCR-10 → SCR-01", "Giữ banner, không báo gì thêm", "—"],
    ["Mở lại app / chuyển màn, DR đã tắt", "Màn tiếp theo", "Banner mất, không toast", "—"],
    ["Sau khi về site chính", "SCR-01, SCR-04", "Số dư, lịch sử đầy đủ; hết data timestamp", "—"],
    ["DR bật lại", "SCR-02", "Session mới, dialog giải thích bật lại (FL-01)", "—"]
  ],
  stops: []
}
],

/* ================= HANDOFF UI (component mới / dùng lại) ================= */
ui: [
{
  id: "UI-01", name: "Banner bảo trì", kind: "Component mới", node: "Chưa có trong Figma (dựng theo token WIN-DLS)",
  desc: "Báo app đang bảo trì và mốc dữ liệu (data timestamp). Hiện ở đầu mọi màn xem trong suốt DR mode.",
  css: ".dr-banner-wrap > .dr-banner",
  variants: [
    { id: "known", name: "Có data timestamp", dom: "dom/ui-banner-known.html", when: "Backend trả được mốc dữ liệu.", strings: ["Hệ thống đang bảo trì", "Dữ liệu tính đến {dd/mm/yyyy hh:mm:ss}"] },
    { id: "unknown", name: "Không có data timestamp", dom: "dom/ui-banner-unknown.html", when: "Backend không trả mốc, hoặc lỗi khi lấy mốc. Vẫn hiện số dư như thường.", strings: ["Hệ thống đang bảo trì", "Dữ liệu có thể chưa được cập nhật mới nhất"] }
  ],
  anatomy: [
    { n: 1, el: "banner", name: "Container", spec: "Nền support-warning-subtle, bo góc rounded-xl, padding 10 / 12, gap 8. Cả banner là 1 vùng tap.",
      tokens: [["background", "alias/support/support-warning-subtle", "#fff7ed"], ["radius", "border-radius/rounded-xl", "12px"], ["padding", "gap/gap-2-5 · gap/gap-3", "10px 12px"], ["gap", "gap/gap-2", "8px"]] },
    { n: 2, el: "b-icon", name: "Icon Warning 20", spec: "Canh trên cùng dòng tiêu đề.", tokens: [["color", "alias/support/support-warning", "#f97316"], ["size", "—", "20×20 (live area 17.78)"]] },
    { n: 3, el: "b-title", name: "Tiêu đề", spec: "1 dòng, cố định.", tokens: [["type", "Small/Semi Bold", "14/20 · 600"], ["color", "alias/text/text-primary", "#0a0a0a"]] },
    { n: 4, el: "b-sub", name: "Dòng phụ", spec: "Theo variant. Chữ dài thì xuống dòng, không cắt. Cách tiêu đề 2px.", tokens: [["type", "X-Small/Regular", "12/16 · 400"], ["color", "alias/text/text-secondary", "#737373"], ["gap", "gap/gap-0-5", "2px"]] },
    { n: 5, el: "b-chev", name: "Chevron right 20", spec: "Báo banner tap được.", tokens: [["color", "alias/icon/icon-secondary", "#737373"], ["size", "—", "20×20"]] }
  ],
  behavior: [
    ["Tap banner", "Mở Dialog giải thích (UI-02, variant Giải thích) đè lên màn đang xem. Đóng dialog: ở lại màn cũ."],
    ["Scroll nội dung", "Banner sticky ở mép trên vùng cuộn, ngay dưới header/navbar của màn. Nội dung cuộn phía dưới banner. Nền quanh banner (phần lề) lấy đúng màu nền của vùng cuộn để nội dung không lộ qua lề."],
    ["Pull-to-refresh", "Banner đứng yên; vùng Loading cao 56 hiện ngay dưới banner (SCR-10)."],
    ["DR mode tắt", "Banner mất ở lần refresh / chuyển màn kế tiếp. Nếu vừa pull-to-refresh thì hiện Toast Positive (SCR-11)."],
    ["Lề theo màn", "Lề 16 hai bên. Khoảng cách trên/dưới banner giữ theo layout của từng màn (vd Tài khoản 16 / 8, Trang chủ 0)."]
  ],
  scroll: [
    { name: "Đầu trang", dom: "dom/ui-scroll-0.html" },
    { name: "Đã scroll 260px", dom: "dom/ui-scroll-1.html" }
  ],
  usedIn: ["SCR-01", "SCR-04", "SCR-05", "SCR-06", "SCR-07", "SCR-10", "SCR-13", "SCR-14", "SCR-16", "SCR-17"],
  assets: [["icon-warning.svg", "WIN DLS icon Warning", "dùng làm mask, tô màu bằng token"], ["icon-chevron-right.svg", "WIN DLS icon Chevron right", "dùng làm mask"]]
},
{
  id: "UI-02", name: "Dialog bảo trì", kind: "Dùng lại", node: "Dialog 1672:2730 · khuôn “Dialog - Feature locked” 107:6796",
  desc: "Dialog dùng chung khuôn Dialog của WIN DLS, 2 variant: giải thích DR mode và chặn action.",
  css: ".dlg-overlay > .dlg",
  variants: [
    { id: "explain", name: "Giải thích", dom: "dom/ui-dialog-explain.html", screen: "dom/scr-02.html",
      when: "Tự bật 1 lần mỗi session DR khi mở app; khi tap banner; khi tap Tìm hiểu thêm ở Dialog chặn; hoặc khi tap CTA đăng nhập (SCR-14, SCR-17).",
      strings: ["Hệ thống đang bảo trì", "Bạn vẫn xem được số dư, lịch sử giao dịch và thông tin tài khoản. Giao dịch và thay đổi thông tin sẽ thực hiện được sau khi bảo trì hoàn tất.", "Dự kiến hoàn tất lúc {dd/mm/yyyy hh:mm:ss}.", "Đóng"] },
    { id: "block", name: "Chặn action", dom: "dom/ui-dialog-block.html", screen: "dom/scr-03.html",
      when: "Tap vào action bị chặn: giao dịch, thay đổi thông tin.",
      strings: ["Tính năng đang bảo trì", "Hệ thống đang bảo trì nên chưa thực hiện được thao tác này. Bạn vui lòng thử lại sau khi bảo trì hoàn tất.", "Đóng", "Tìm hiểu thêm"] }
  ],
  anatomy: [
    { n: 1, el: "d-overlay", name: "Overlay", spec: "Phủ toàn màn, padding 48 / 24, dialog canh giữa.", tokens: [["background", "alias/miscellaneous/overlay", "rgba(10,10,10,.5)"], ["padding", "gap/gap-12 · gap/gap-6", "48px 24px"]] },
    { n: 2, el: "dlg", name: "Container", spec: "Rộng theo màn (max 540), padding 16, gap 16 giữa nội dung và nút.", tokens: [["background", "alias/background/background", "#ffffff"], ["radius", "border-radius/rounded-2xl", "16px"], ["padding · gap", "gap/gap-4", "16px"]] },
    { n: 3, el: "d-illus", name: "Illus/Warning", spec: "80×80, cả 2 variant dùng chung.", tokens: [["size", "—", "80×80"]] },
    { n: 4, el: "d-title", name: "Tiêu đề", spec: "Canh giữa. Cách illus và nội dung 8.", tokens: [["type", "Large/Semi Bold", "18/28 · 600"], ["color", "alias/text/text-primary", "#0a0a0a"], ["gap", "gap/gap-2", "8px"]] },
    { n: 5, el: "d-body", name: "Nội dung", spec: "Canh giữa, xuống dòng tự do.", tokens: [["type", "Small/Regular", "14/20 · 400"]] },
    { n: 6, el: "d-eta", name: "Dòng dự kiến (chỉ variant Giải thích)", spec: "Ẩn cả dòng nếu backend không trả giờ dự kiến.", tokens: [["type", "Small/Regular", "14/20 · 400"]] },
    { n: 7, el: "dlg-close", name: "Nút Đóng (Primary)", spec: "Cao 48, full width, bo tròn.", tokens: [["background", "alias/background/background-inverse", "#262626"], ["text", "alias/text/text-inverse · Base/Medium", "#ffffff · 16/24 · 500"], ["radius", "border-radius/rounded-circle", "10000px"]] },
    { n: 8, el: "dlg-learn", name: "Nút Tìm hiểu thêm (Secondary, chỉ variant Chặn)", spec: "Cao 48, viền 1px, cách nút Đóng 8.", tokens: [["border", "alias/border/border-strong-01", "1px #737373"], ["text", "alias/text/text-primary · Base/Medium", "#0a0a0a · 16/24 · 500"], ["gap", "gap/gap-2", "8px"]] }
  ],
  behavior: [
    ["Đóng", "Đóng dialog, ở lại màn cũ. Data và input đang có trên màn giữ nguyên (riêng Login: xoá PIN đã nhập)."],
    ["Tìm hiểu thêm (variant Chặn)", "Đóng Dialog chặn, mở Dialog giải thích."],
    ["Tap overlay", "Không đóng dialog, không nhận tap vào màn phía sau."],
    ["Back Android", "Như Đóng."],
    ["Tự bật (variant Giải thích)", "Tối đa 1 lần mỗi session DR. Session DR mới (DR bật lại) thì bật lại 1 lần."],
    ["Motion", "Overlay fade in 200ms; dialog fade + scale 0.96 → 1, 200ms ease-out. prefers-reduced-motion: chỉ fade."]
  ],
  usedIn: ["SCR-02", "SCR-03", "SCR-06", "SCR-08", "SCR-14", "SCR-16", "SCR-17"],
  assets: [["illus-warning.png", "Illus/Warning (Figma)", "dùng chung 2 variant"]]
}
],

/* ================= MÀN (xem trước trên flow) ================= */
screens: [
{ id: "SCR-01", name: "Trang chủ · DR mode", node: "1:13043", dom: "dom/scr-01.html", purpose: "Banner dưới navbar, data timestamp trong banner. Nút giữ style, tap thì bị chặn." },
{ id: "SCR-02", name: "Dialog giải thích DR", node: "khuôn 107:6796", dom: "dom/scr-02.html", purpose: "Xem được gì, chưa làm được gì, dự kiến xong lúc nào. Dòng dự kiến ẩn nếu backend không trả." },
{ id: "SCR-03", name: "Dialog chặn action", node: "khuôn 107:6796", dom: "dom/scr-03.html", purpose: "Đóng: ở lại màn cũ. Tìm hiểu thêm: mở SCR-02." },
{ id: "SCR-04", name: "Lịch sử giao dịch · DR mode", node: "1:37591", dom: "dom/scr-04.html", purpose: "Data tới mốc. Cuối list có note; giao dịch chưa có kết quả hiện “Đang xử lý”." },
{ id: "SCR-05", name: "Chi tiết giao dịch · DR mode", node: "1:37605", dom: "dom/scr-05.html", purpose: "Như thường, thêm banner." },
{ id: "SCR-06", name: "Tài khoản · DR mode", node: "1:41327", dom: "dom/scr-06.html", purpose: "Xem như thường. Bảo mật, định danh, thanh toán, thông báo, Đăng xuất: tap thì bị chặn." },
{ id: "SCR-07", name: "Quản lý tài khoản/thẻ · DR mode", node: "1:27571", dom: "dom/scr-07.html", purpose: "List như thường. Thêm tài khoản: bị chặn." },
{ id: "SCR-08", name: "Chuyển tiền · DR bật giữa luồng", node: "1:31946", dom: "dom/scr-08.html", purpose: "Màn không bị đóng. Bấm Chuyển tiền khi DR còn on: Dialog chặn, data giữ nguyên." },
{ id: "SCR-09", name: "Kết quả · đang xử lý", node: "1:31824", dom: "dom/scr-09.html", purpose: "Dùng lại màn Pending hiện có, không đổi." },
{ id: "SCR-10", name: "Trang chủ · pull-to-refresh", node: "1:13043 + Loading", dom: "dom/scr-10.html", purpose: "Icon Loading 24 xoay trong vùng cao 56 dưới banner." },
{ id: "SCR-11", name: "Trang chủ · DR tắt", node: "1:13043 + Toast bar", dom: "dom/scr-11.html", purpose: "Banner mất. Toast Positive chỉ khi vừa pull-to-refresh." },
{ id: "SCR-13", name: "Notification center · DR mode", node: "21:8494", dom: "dom/scr-13.html", purpose: "List như thường + banner + 1 noti “Hệ thống đang bảo trì” (demo)." },
{ id: "SCR-14", name: "Login · DR mode", node: "1:8132", dom: "dom/scr-14.html", purpose: "Không cho đăng nhập. Banner dưới status bar; tap nút đăng nhập bất kỳ: Dialog giải thích." },
{ id: "SCR-17", name: "Nhập số điện thoại · DR mode", node: "1:8028", dom: "dom/scr-17.html", purpose: "Màn đầu của luồng đăng nhập khi máy chưa lưu tài khoản. Banner dưới status bar; tap Tiếp tục hoặc chọn SĐT đã dùng: Dialog giải thích." },
{ id: "SCR-16", name: "Chi tiết nguồn tiền · DR mode", node: "1:27572", dom: "dom/scr-16.html", purpose: "Như thường, thêm banner. ⋯ → Huỷ liên kết: Dialog chặn." }
]
};
