/* app.js — boot aplikasi & aksi global */
window.App = window.App || {};
(function(App){
  App.actions = {
    openSearch(){
      App.sheet.open({title:'🔍 Pencarian',body:`
        <div class="searchbar" style="background:var(--surface-2)"><span class="si">🔍</span><input id="gs-q" placeholder="Cari produk, UMKM, pelatihan..." autofocus></div>
        <div id="gs-res" style="margin-top:12px"></div>`,
        onMount(){
          const inp=App.\( ('#gs-q'), res=App. \)('#gs-res');
          inp.addEventListener('input',App.util.debounce(e=>{
            const q=e.target.value.toLowerCase().trim();
            if(!q){ res.innerHTML=''; return; }
            const hits=App.data.approved().filter(p=>(p.name+p.seller+p.cat).toLowerCase().includes(q)).slice(0,6);
            res.innerHTML = hits.length? hits.map(p=>`<button class="li-item" style="width:100%;border-bottom:1px solid var(--border)" onclick="App.sheet.close();App.go('productDetail',{id:\( {p.id}})"><span class="li-ico"> \){p.emoji}</span><span class="grow" style="text-align:left"><b style="font-size:.85rem">\( {App.util.esc(p.name)}</b><br><span class="t-xs t-muted"> \){p.cat} · ${App.util.rp(p.price)}</span></span></button>`).join('') : App.ui.empty('🔍','Tidak ada hasil untuk "'+App.util.esc(q)+'"');
          },200));
        }
      });
    },
    openNotif(){
      const items=[
        ['✅','Produk disetujui','Onde-onde Bu Sari kini tampil di marketplace','2 jam lalu'],
        ['💬','Pesan baru dari investor','PT Maju Bersama menanyakan kapasitas produksi','5 jam lalu'],
        ['🎓','Pelatihan dibuka','Digital Marketing UMKM — daftar sekarang','1 hari lalu'],
        ['📈','Laporan mingguan','Penjualan naik 8,4% minggu ini','2 hari lalu'],
      ];
      App.sheet.open({title:'🔔 Notifikasi',body:items.map(n=>`<div class="li-item" style="border-bottom:1px solid var(--border)"><span class="li-ico">\( {n[0]}</span><span class="grow" style="text-align:left"><b style="font-size:.85rem"> \){n[1]}</b><br><span class="t-xs t-muted">\( {n[2]}</span><br><span class="t-xs" style="color:var(--primary-600)"> \){n[3]}</span></span></div>`).join('')});
    },
    about(){
      App.sheet.open({title:'ℹ️ Tentang Aplikasi',body:`
        <p style="font-size:.86rem;color:var(--muted);line-height:1.7"><b style="color:var(--ink)">Kent's Store 24 Hours</b> adalah Super App UMKM Jatim — menghubungkan pelaku usaha, pemerintah, dan investor.</p>
        <div class="card card-pad" style="margin-top:12px"><div class="xrow"><span>Versi</span><span>2.0 (PWA)</span></div><div class="xrow"><span>Modul</span><span>10 fitur</span></div></div>`});
    },
  };

  function boot(){
    App.auth.restore();
    App.AppShell.mount();
    App.go('home');
    
    // === FIX SPLASH SCREEN (Penting untuk PWA) ===
    const sp = App.$('#splash');
    if (sp) {
      setTimeout(() => {
        sp.style.transition = 'opacity 0.6s ease-out';
        sp.style.opacity = '0';
        setTimeout(() => {
          if (sp && sp.parentNode) sp.parentNode.removeChild(sp);
        }, 800);
      }, 1200);
    }
  }

  if(document.readyState!=='loading') boot(); 
  else document.addEventListener('DOMContentLoaded',boot);

  // === PWA SERVICE WORKER ===
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/DIGITAL-BRIDGE-/umkm-app/sw.js')
        .then(reg => console.log('✅ SW Registered'))
        .catch(err => console.log('❌ SW Failed', err));
    });
  }

})(window.App);
