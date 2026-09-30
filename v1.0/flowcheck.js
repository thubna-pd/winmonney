/* GHL-07 (+ GHL-10) · kiểm sơ đồ flow — chạy trong browser (dán vào console hoặc javascript_tool).
   Phải đạt 0 ở cả 5 mục: đoạn chéo · sai đầu mũi tên (thiếu mũi arrow ở đầu kết thúc, hoặc còn chấm
   tròn ở đầu bắt đầu) · điểm neo không ở giữa cạnh · cạnh cắt qua thân node khác · cạnh cắt qua chữ
   (nhãn vùng + Flow status pill). Thêm: pill đè lên node hoặc pill khác · End (tròn) ngay sau một màn. Duyệt overview + mọi FL. */
(async () => {
  const routes = ['overview', ...window.DATA.flows.map(f => f.id)];
  const report = {};
  const bbOf = el => { const [x0, y0, x1, y1] = el.dataset.bb.split(',').map(Number); return { x0, y0, x1, y1 }; };
  const hits = (a, b, r) => {
    const x0 = Math.min(a.x, b.x), x1 = Math.max(a.x, b.x), y0 = Math.min(a.y, b.y), y1 = Math.max(a.y, b.y);
    return x1 > r.x0 && x0 < r.x1 && y1 > r.y0 && y0 < r.y1;
  };
  for (const r of routes) {
    location.hash = '#/' + r;
    await new Promise(res => setTimeout(res, 150));
    const out = { diagonal: [], arrowEnds: [], anchor: [], throughNode: [], throughText: [], pillOverlap: [] };
    document.querySelectorAll('.flowsvg').forEach((svg, si) => {
      const nodes = [...svg.querySelectorAll('[data-node]')].map(g => ({ el: g, id: g.dataset.nid, ...bbOf(g) }));
      const anchors = [...svg.querySelectorAll('[data-anchor]')].map(g => ({ el: g, ...bbOf(g) }));  // element trong màn (GHL-14)
      const texts = [...svg.querySelectorAll(':scope > text')].map(t => { const b = t.getBBox(); return { t: t.textContent, x0: b.x, y0: b.y, x1: b.x + b.width, y1: b.y + b.height }; })
        .concat([...svg.querySelectorAll('.pill:not(.on-arrow)')].map(g => ({ t: g.textContent, ...bbOf(g) })));  // YES/NO nằm TRÊN mũi tên theo GHL-13
      const ov = (a, b) => a.x1 > b.x0 && a.x0 < b.x1 && a.y1 > b.y0 && a.y0 < b.y1;
      const pills = [...svg.querySelectorAll('.pill')].map(g => ({ t: g.textContent, ...bbOf(g) }));
      pills.forEach((a, i) => { if (nodes.some(n => ov(a, n)) || pills.some((b, j) => j !== i && ov(a, b))) out.pillOverlap.push(`${r}#${si} "${a.t}"`); });
      svg.querySelectorAll('path.edge').forEach((pl, ei) => {
        const pts = pl.dataset.pts.trim().split(/\s+/).map(p => { const [x, y] = p.split(',').map(Number); return { x, y }; });
        const tag = `${r}#${si}.e${ei}`;
        for (let i = 1; i < pts.length; i++) if (pts[i].x !== pts[i-1].x && pts[i].y !== pts[i-1].y) out.diagonal.push(tag);
        if (!pl.getAttribute('marker-end') || pl.getAttribute('marker-start')) out.arrowEnds.push(tag);
        const onMid = p => nodes.concat(anchors).find(n => {
          const cx = (n.x0 + n.x1) / 2, cy = (n.y0 + n.y1) / 2, e = 0.6;
          return (Math.abs(p.x - cx) < e && (Math.abs(p.y - n.y0) < e || Math.abs(p.y - n.y1) < e)) ||
                 (Math.abs(p.y - cy) < e && (Math.abs(p.x - n.x0) < e || Math.abs(p.x - n.x1) < e));
        });
        const na = onMid(pts[0]), nb = onMid(pts[pts.length - 1]);
        if (!na || !nb) out.anchor.push(tag);
        for (let i = 1; i < pts.length; i++) {
          nodes.forEach(n => { if (n !== na && n !== nb && n.id !== pl.dataset.from && n.id !== pl.dataset.to && hits(pts[i-1], pts[i], { x0: n.x0 + 1, y0: n.y0 + 1, x1: n.x1 - 1, y1: n.y1 - 1 })) out.throughNode.push(tag); });
          texts.forEach(t => { if (hits(pts[i-1], pts[i], t)) out.throughText.push(tag + ' "' + t.t + '"'); });
        }
      });
    });
    report[r] = out;
  }
  // Không kết thúc bằng Start&End ngay sau một màn (màn đã là điểm kết thúc) — yêu cầu 29/09
  report.data = { endAfterScreen: [] };
  [{ id: 'overview', dg: window.DATA.overallFlow }, ...window.DATA.flows.flatMap(f => f.diagrams.map(g => ({ id: f.id + '/' + g.id, dg: g.dg })))].forEach(f => {
    const by = {}; f.dg.nodes.forEach(n => by[n.id] = n);
    f.dg.edges.forEach(e => { if (by[e.to].type === 'terminal' && by[e.from].type.startsWith('screen')) report.data.endAfterScreen.push(`${f.id}: ${e.from} → ${e.to}`); });
  });
  location.hash = '#/overview';
  const total = {}, bad = {};
  Object.entries(report).forEach(([r, o]) => Object.entries(o).forEach(([k, v]) => { total[k] = (total[k] || 0) + v.length; if (v.length) (bad[r] ||= {})[k] = [...new Set(v)]; }));
  return { total, bad };
})();
