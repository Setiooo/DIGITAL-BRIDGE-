/* pages/marketplace.js — e-commerce: sticky search, kategori horizontal, grid 2 kolom, infinite scroll */
window.App = window.App || {};
(function(App){
  const state={ cat:'Semua', kec:'semua', price:'all', sort:'default', q:'', shown:6 };

  App.mkt={
    setCat(v,btn){ state.cat=v; state.shown=6; App.$$('#mkt-chips .chip').forEach(c=>c.classList.remove('on')); btn.classList.add('on'); App.mkt.renderList(); },
    setSort(v){ state.sort=v; App.mkt.renderList(); App.sheet.close(); App.toast('Urutkan: '+v,'info'); },
    setKec(v){ state.kec=v; state.shown=6; App.mkt.renderList(); App.sheet.close(); },
    setPrice(v){ state.price=v; state.shown=6; App.mkt.renderList(); App.sheet.close(); },
    search(v){ state.q=v; state.shown=6; App.mkt.renderList(); },
    openFilter(){
      const kecBtns=App.DATA.KEC.map(k=>`<button class="chip ${state.kec===k[0]?'on':''}" onclick="App.mkt.setKec('${k[0]}')">${k[1]}</button>`).join('');
      const priceBtns=[['all','Semua Harga'],['under25','< Rp25rb'],['25to100','Rp25\u2013100rb'],['over100','> Rp100rb']].map(p=>`<button class="chip ${state.price===p[0]?'on':''}" onclick="App.mkt.setPrice('${p[0]}')">${p[1]}</button>`).join('');
      App.sheet.open({title:'Filter Produk',body:`
        <div style="font-size:.78rem;font-weight:700;color:var(--muted);margin:6px 0 8px">WILAYAH</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">${kecBtns}</div>
        <div style="font-size:.78rem;font-weight:700;color:var(--muted);margin:16px 0 8px">RENTANG HARGA</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">${priceBtns}</div>`});
    },
    openSort(){
      const opts=[['default','\u2B50 Relevan'],['price-asc','\uD83D\uDCB0 Termurah'],['price-desc','\uD83D\uDC8E Termahal'],['popular','\uD83D\uDD25 Terpopuler'],['rating','\u2B50 Rating Tertinggi']];
      App.sheet.open({title:'Urutkan',body:opts.map(o=>`<button class="li-item" style="width:100%;border-radius:12px;margin-bottom:6px;border:1px solid var(--border)" onclick="App.mkt.setSort('${o[0]}')"><span class="grow" style="text-align:left;font-weight:600">${o[1]}</span>${state.sort===o[0]?'\u2705':''}</button>`).join('')});
    },
    renderList(){
      const all=App.data.filterProds(state);
      const list=all.slice(0,state.shown);
      const grid=App.$('#mkt-grid');
      if(!grid) return;
      grid.innerHTML = list.length? list.map(App.ui.pcard).join('') : '';
      const empty=App.$('#mkt-empty'); if(empty) empty.innerHTML = list.length?'':App.ui.empty('\uD83D\uDD0D','Tidak ada produk yang cocok');
      const more=App.$('#mkt-more');
      if(more) more.style.display = all.length>state.shown ? 'flex':'none';
      const cnt=App.$('#mkt-count'); if(cnt) cnt.textContent=all.length+' produk';
    },
    loadMore(){ state.shown+=4; App.mkt.renderList(); },
  };

  App.registerRoute('marketplace', {
    tab:'market', title:'Marketplace', subtitle:'Produk UMKM Jawa Timur',
    fab:{ icon:'\uD83D\uDED2', onclick:()=>App.toast('Keranjang masih kosong','info') },
    skeleton(){ return `<div class="search-sticky"><div class="searchbar"><span class="si">\uD83D\uDD0D</span><input placeholder="Cari..."></div></div>`+App.skeleton.prodGrid(6); },
    skeletonMs:520,
    render(){
      return `
        <div class="search-sticky">
          <div class="searchbar">
            <span class="si">\uD83D\uDD0D</span>
            <input id="mkt-q" placeholder="Cari produk, UMKM, kategori..." value="${App.util.esc(state.q)}">
            <button onclick="App.mkt.openFilter()" style="font-size:1.1rem">\u2699\uFE0F</button>
            <button onclick="App.mkt.openSort()" style="font-size:1.1rem">\u21C5</button>
          </div>
        </div>
        <div id="mkt-chips">${App.ui.chips(App.DATA.CATS, state.cat, 'App.mkt.setCat')}</div>
        <div class="between" style="padding:6px 16px 2px"><span class="t-xs t-muted" id="mkt-count"></span><button class="t-xs" style="font-weight:700;color:var(--primary-600)" onclick="App.mkt.openFilter()">Filter \u2022 Wilayah</button></div>
        <div id="mkt-grid" class="prod-grid view-pad" style="padding-top:8px"></div>
        <div id="mkt-empty"></div>
        <div id="mkt-more" style="display:none;justify-content:center;padding:6px 14px 18px">
          <button class="btn btn-soft btn-block" onclick="App.mkt.loadMore()">Muat lebih banyak \u25BE</button>
        </div>`;
    },
    onMount(){
      App.mkt.renderList();
      const q=App.$('#mkt-q'); if(q) q.addEventListener('input', App.util.debounce(e=>App.mkt.search(e.target.value),250));
      // infinite scroll
      const view=App.$('#app-view');
      view.onscroll=function(){
        App.$('#app-header').classList.toggle('scrolled', this.scrollTop>4);
        if(this.scrollTop+this.clientHeight >= this.scrollHeight-120){ const m=App.$('#mkt-more'); if(m && m.style.display!=='none') App.mkt.loadMore(); }
      };
    }
  });
})(window.App);
