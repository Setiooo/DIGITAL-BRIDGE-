/* pages/productDetail.js — detail produk ala e-commerce mobile */
window.App = window.App || {};
(function(App){
  const U=App.util;
  App.registerRoute('productDetail', {
    tab:'market', back:true, title:'Detail Produk', headerActions:false,
    fab:false,
    render(params){
      const p=App.data.byId(params.id);
      if(!p) return App.ui.empty('\uD83D\uDE15','Produk tidak ditemukan');
      const colors={Kuliner:'#e8f5ee,#c8e8d4',Fashion:'#ede9fe,#ddd6fe',Kerajinan:'#fef3c7,#fde68a',Jasa:'#dbeafe,#bfdbfe'};
      const c=colors[p.cat]||'#eef2fb,#dfe7f7';
      const related=App.data.approved().filter(x=>x.cat===p.cat && x.id!==p.id).slice(0,4);
      return `
        <div style="height:240px;background:linear-gradient(135deg,${c});display:flex;align-items:center;justify-content:center;font-size:6rem">${p.img?`<img src="${p.img}" style="width:100%;height:100%;object-fit:cover">`:p.emoji}</div>
        <div class="view-pad">
          <div class="between">
            <span class="badge gold">${p.cat}</span>
            <span class="t-xs t-muted">\uD83D\uDC41\uFE0F ${p.views} dilihat</span>
          </div>
          <div class="h2" style="margin:8px 0 4px">${U.esc(p.name)}</div>
          <div class="h1 t-gold" style="color:var(--primary)">${U.rp(p.price)}</div>
          <div class="row" style="margin-top:6px">
            <span style="color:var(--secondary)">${U.stars(p.rating)}</span>
            <span style="font-weight:700;font-size:.85rem">${p.rating}</span>
            <span class="t-xs t-muted">(${p.reviews} ulasan) \u00B7 ${p.sold} terjual</span>
          </div>
          <hr class="hr">
          <div class="card card-pad row" style="gap:12px">
            <div class="li-ico" style="background:var(--grad-primary);color:#fff">\uD83C\uDFEA</div>
            <div class="grow"><div style="font-weight:700;font-size:.9rem">${U.esc(p.seller)}</div><div class="t-xs t-muted">\uD83D\uDCCD Kec. ${p.kec}, Jawa Timur</div></div>
            <span class="badge ok">\u2705 Terverifikasi</span>
          </div>
          <div class="h3" style="margin:16px 0 6px">Deskripsi Produk</div>
          <p style="font-size:.86rem;color:var(--muted);line-height:1.7">${U.esc(p.desc)}</p>
          <div class="card card-pad" style="margin-top:12px">
            <div class="xrow"><span>Berat / Satuan</span><span>${p.weight}</span></div>
            <div class="xrow"><span>Kategori</span><span>${p.cat}</span></div>
            <div class="xrow"><span>Status</span><span>${p.status==='approved'?'\u2705 Aktif':p.status}</span></div>
          </div>
          ${related.length?`<div class="h3" style="margin:18px 0 8px">Produk Serupa</div><div class="prod-grid">${related.map(App.ui.pcard).join('')}</div>`:''}
          <div style="height:80px"></div>
        </div>
        <div style="position:absolute;left:0;right:0;bottom:0;display:flex;gap:10px;padding:12px 14px calc(12px + var(--safe-bottom));background:var(--surface);border-top:1px solid var(--border);z-index:30">
          <button class="btn btn-ghost" onclick="App.toast('Ditambahkan ke wishlist','ok')" style="flex:0 0 auto">\u2661</button>
          <a class="btn btn-wa grow" href="${U.waLink(p)}" target="_blank">\uD83D\uDCAC Chat Penjual</a>
          <button class="btn btn-gold grow" onclick="App.toast('Pesanan dibuat (demo)','ok')">Beli Sekarang</button>
        </div>`;
    }
  });
})(window.App);
