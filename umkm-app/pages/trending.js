/* pages/trending.js — produk terlaris (ranking) */
window.App = window.App || {};
(function(App){
  const U=App.util;
  App.registerRoute('trending', {
    tab:'home', back:true, title:'Produk Terlaris', subtitle:'Ranking populer',
    skeleton(){ return App.skeleton.list(5); },
    render(){
      const list=App.data.trending(20);
      const max=U.score(list[0]||{views:1,sold:0})||1;
      return `<div class="view-pad">
        ${list.map((p,i)=>{
          const sc=U.score(p), pct=Math.round(sc/max*100);
          const medal=i===0?'\uD83E\uDD47':i===1?'\uD83E\uDD48':i===2?'\uD83E\uDD49':`<span style="font-weight:800;color:var(--muted)">${i+1}</span>`;
          return `<div class="card card-pad" style="margin-bottom:10px;display:flex;gap:12px;align-items:center" onclick="App.go('productDetail',{id:${p.id}})">
            <div style="width:30px;text-align:center;font-size:1.3rem">${medal}</div>
            <div class="xcard-emoji">${p.emoji}</div>
            <div class="grow">
              <div style="font-weight:700;font-size:.86rem">${U.esc(p.name)}</div>
              <div class="t-xs t-muted">${p.cat} \u00B7 ${p.sold} terjual \u00B7 \u2B50 ${p.rating}</div>
              <div style="margin-top:6px">${App.ui.progress(pct)}</div>
            </div>
            <div style="text-align:right"><div style="font-weight:800;color:var(--primary);font-size:.85rem">${U.rp(p.price)}</div><div class="t-xs t-muted">\uD83D\uDC41\uFE0F ${p.views}</div></div>
          </div>`;
        }).join('')}
      </div>`;
    }
  });
})(window.App);
