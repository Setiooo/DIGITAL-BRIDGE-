/* services/dataService.js — akses & komputasi data domain */
window.App = window.App || {};
(function(App){
  const D = App.DATA;
  let userProducts = [];
  let nextId = 100;

  App.data = {
    /* ===== Produk ===== */
    allProds(){ return D.PRODS.concat(userProducts); },
    approved(){ return this.allProds().filter(p=>p.status==='approved'); },
    byId(id){ return this.allProds().find(p=>p.id==id); },
    userProds(){ return userProducts; },
    addProduct(p){ p.id=nextId++; p.status='pending'; p.views=0; p.sold=0; p.rating=0; p.reviews=0; userProducts.unshift(p); return p; },
    filterProds(f){
      let list=this.approved();
      if(f.cat && f.cat!=='Semua') list=list.filter(p=>p.cat===f.cat);
      if(f.kec && f.kec!=='semua') list=list.filter(p=>p.kec===f.kec);
      if(f.price==='under25') list=list.filter(p=>p.price<25000);
      else if(f.price==='25to100') list=list.filter(p=>p.price>=25000&&p.price<=100000);
      else if(f.price==='over100') list=list.filter(p=>p.price>100000);
      if(f.q){ const q=f.q.toLowerCase(); list=list.filter(p=>(p.name+p.seller+p.cat).toLowerCase().includes(q)); }
      const s=f.sort;
      if(s==='price-asc') list.sort((a,b)=>a.price-b.price);
      else if(s==='price-desc') list.sort((a,b)=>b.price-a.price);
      else if(s==='popular') list.sort((a,b)=>App.util.score(b)-App.util.score(a));
      else if(s==='rating') list.sort((a,b)=>b.rating-a.rating);
      return list;
    },
    trending(n){ return this.approved().slice().sort((a,b)=>App.util.score(b)-App.util.score(a)).slice(0,n||5); },

    /* ===== Transaksi UMKM ===== */
    tx(){ return D.txList; },
    addTx(t){ t.id=Date.now(); D.txList.unshift(t); return t; },
    delTx(id){ const i=D.txList.findIndex(t=>t.id==id); if(i>-1) D.txList.splice(i,1); },
    neraca(){
      const inc=D.txList.filter(t=>t.jenis==='pemasukan').reduce((a,b)=>a+b.jml,0);
      const exp=D.txList.filter(t=>t.jenis==='pengeluaran').reduce((a,b)=>a+b.jml,0);
      return { inc, exp, profit:inc-exp, margin: inc? ((inc-exp)/inc*100):0 };
    },

    /* ===== Statistik agregat ===== */
    stats(){
      const prods=this.approved();
      const totalUMKM=new Set(prods.map(p=>p.seller)).size + 1240;
      const totalProduk=prods.length + 3580;
      const totalSold=prods.reduce((a,p)=>a+p.sold,0);
      const totalInvest=D.INV_OPPS.reduce((a,o)=>a+ (parseInt(o.omzet.replace(/\D/g,''))||0),0);
      return {
        umkm: totalUMKM, produk: totalProduk, transaksi: totalSold*1000+845000,
        investasi: 12.4, // miliar
        verified: 982, pending: 47, kecamatan: 38,
      };
    },

    /* ===== Finance per UMKM (investor) ===== */
    finance(id){ return D.UMKM_FINANCE[id]; },
    financeSummary(id){
      const d=D.UMKM_FINANCE[id]; if(!d) return null;
      const inc=d.pemasukan.reduce((a,b)=>a+b,0), exp=d.pengeluaran.reduce((a,b)=>a+b,0);
      const profit=inc-exp, margin=inc?((profit/inc)*100):0;
      const growth=((d.pemasukan[5]-d.pemasukan[4])/d.pemasukan[4])*100;
      const debtRatio=d.utang/d.modal;
      let health='SEHAT', healthCls='ok';
      if(!(margin>30 && debtRatio<0.5)){ if(margin>15){health='CUKUP';healthCls='warn';} else {health='PERHATIAN';healthCls='err';} }
      return { inc, exp, profit, margin, growth, debtRatio, health, healthCls };
    },
    laporan(id){ return D.UMKM_LAPORAN[id]; },

    /* ===== Kelayakan investasi ===== */
    readinessScore(ind){ const v=Object.values(ind); return Math.round(v.reduce((a,b)=>a+b,0)/v.length); },
    verdict(score){
      if(score>=80) return {label:'Layak Didanai',icon:'\u2705',cls:'ok',color:'#166534',desc:'UMKM ini memenuhi standar kelayakan investasi. Profil lengkap, legalitas kuat, dan konsisten mengikuti pelatihan.'};
      if(score>=60) return {label:'Perlu Pembinaan',icon:'\u26A0\uFE0F',cls:'warn',color:'#92590a',desc:'UMKM memiliki potensi namun memerlukan pendampingan lebih lanjut terutama di bidang pembukuan dan legalitas.'};
      return {label:'Risiko Tinggi',icon:'\uD83D\uDD34',cls:'err',color:'#991b1b',desc:'UMKM belum siap untuk investasi. Diperlukan program pembinaan intensif sebelum pertimbangan pendanaan.'};
    },
  };
})(window.App);
