/* pages/home.js — Landing / beranda super app */
window.App = window.App || {};
(function(App){
  const U=App.util;
  function kpis(){
    const s=App.data.stats();
    return [
      {ico:'\uD83C\uDFEA',theme:'navy', val:U.num(s.umkm),         label:'Total UMKM',  trend:'\u25B2 +124 bulan ini'},
      {ico:'\uD83D\uDCE6',theme:'gold', val:U.num(s.produk),       label:'Total Produk',trend:'\u25B2 +318 minggu ini'},
      {ico:'\uD83D\uDCB3',theme:'green',val:U.num(s.transaksi),    label:'Transaksi',   trend:'\u25B2 +8,4%'},
      {ico:'\uD83D\uDCC8',theme:'purple',val:'Rp'+s.investasi+'M', label:'Investasi',   trend:'\u25B2 +2 mitra baru'},
    ];
  }
  function quickMenu(){
    const items=[
      ['\uD83D\uDED2','Marketplace',"App.go('marketplace')"],
      ['\uD83D\uDCCA','Dashboard',"App.go('dashboard')"],
      ['\uD83E\uDD16','AI Advisor',"App.go('aiAdvisor')"],
      ['\uD83C\uDF93','Pelatihan',"App.go('training')"],
      ['\uD83D\uDD25','Trending',"App.go('trending')"],
      ['\uD83D\uDCAC','Komunikasi',"App.go('komunikasi')"],
      ['\uD83C\uDFDB\uFE0F','Pemerintah',"App.go('dashboard',{role:'gov'})"],
      ['\uD83D\uDCBC','Investor',"App.go('dashboard',{role:'investor'})"],
    ];
    return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">`+items.map(it=>`
      <button onclick="${it[2]}" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:none">
        <span style="width:52px;height:52px;border-radius:16px;background:var(--surface);box-shadow:var(--sh-sm);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.4rem">${it[0]}</span>
        <span style="font-size:.66rem;font-weight:600;color:var(--ink);text-align:center;line-height:1.1">${it[1]}</span>
      </button>`).join('')+`</div>`;
  }
  App.registerRoute('home', {
    tab:'home', title:'UMKM Jatim', subtitle:'Super App Jawa Timur',
    skeleton(){ return App.skeleton.kpiRow()+App.skeleton.prodGrid(4); },
    skeletonMs:480,
    render(){
      const t=App.data.trending(6);
      return `
        <div class="hero" style="background:var(--grad-navy-gold);color:#fff;padding:18px 16px 22px;margin-bottom:6px">
          <div style="font-size:.72rem;opacity:.85;letter-spacing:.4px">SELAMAT DATANG \uD83D\uDC4B</div>
          <div style="font-size:1.25rem;font-weight:800;margin-top:3px">Majukan UMKM Jawa Timur</div>
          <div style="font-size:.8rem;opacity:.9;margin-top:4px">Belanja produk lokal, pantau usaha, & temukan peluang investasi.</div>
          <div class="searchbar" style="margin-top:14px" onclick="App.go('marketplace')">
            <span class="si">\uD83D\uDD0D</span><input placeholder="Cari produk UMKM, kategori..." readonly style="background:none;cursor:pointer">
          </div>
        </div>
        ${App.ui.kpiScroller(kpis())}
        <div class="section">${quickMenu()}</div>
        <div class="section">
          <div style="background:var(--grad-gold);border-radius:20px;padding:16px;display:flex;align-items:center;gap:12px;color:#3a2a05">
            <div style="font-size:2rem">\uD83C\uDF93</div>
            <div style="flex:1"><div style="font-weight:800;font-size:.95rem">Pelatihan UMKM Gratis</div><div style="font-size:.76rem;opacity:.85">6 program siap diikuti bulan ini</div></div>
            <button class="btn btn-sm" style="background:#3a2a05;color:#fff" onclick="App.go('training')">Lihat</button>
          </div>
        </div>
        ${App.ui.sectionTitle('\uD83D\uDD25 Produk Terlaris',{label:'Semua',onclick:"App.go('trending')"})}
        <div class="prod-grid view-pad" style="padding-top:0">${t.map(App.ui.pcard).join('')}</div>
        <div style="height:8px"></div>`;
    }
  });
})(window.App);
