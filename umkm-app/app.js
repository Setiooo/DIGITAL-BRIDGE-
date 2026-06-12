/* app.js — boot aplikasi & aksi global */
window.App = window.App || {};
(function(App){
  App.actions = {
    openSearch(){
      App.sheet.open({title:'\uD83D\uDD0D Pencarian',body:`
        <div class="searchbar" style="background:var(--surface-2)"><span class="si">\uD83D\uDD0D</span><input id="gs-q" placeholder="Cari produk, UMKM, pelatihan..." autofocus></div>
        <div id="gs-res" style="margin-top:12px"></div>`,
        onMount(){
          const inp=App.$('#gs-q'), res=App.$('#gs-res');
          inp.addEventListener('input',App.util.debounce(e=>{
            const q=e.target.value.toLowerCase().trim();
            if(!q){ res.innerHTML=''; return; }
            const hits=App.data.approved().filter(p=>(p.name+p.seller+p.cat).toLowerCase().includes(q)).slice(0,6);
            res.innerHTML = hits.length? hits.map(p=>`<button class="li-item" style="width:100%;border-bottom:1px solid var(--border)" onclick="App.sheet.close();App.go('productDetail',{id:${p.id}})"><span class="li-ico">${p.emoji}</span><span class="grow" style="text-align:left"><b style="font-size:.85rem">${App.util.esc(p.name)}</b><br><span class="t-xs t-muted">${p.cat} \u00B7 ${App.util.rp(p.price)}</span></span></button>`).join('') : App.ui.empty('\uD83D\uDD0D','Tidak ada hasil untuk "'+App.util.esc(q)+'"');
          },200));
        }
      });
    },
    openNotif(){
      const items=[
        ['\u2705','Produk disetujui','Onde-onde Bu Sari kini tampil di marketplace','2 jam lalu'],
        ['\uD83D\uDCAC','Pesan baru dari investor','PT Maju Bersama menanyakan kapasitas produksi','5 jam lalu'],
        ['\uD83C\uDF93','Pelatihan dibuka','Digital Marketing UMKM \u2014 daftar sekarang','1 hari lalu'],
        ['\uD83D\uDCC8','Laporan mingguan','Penjualan naik 8,4% minggu ini','2 hari lalu'],
      ];
      App.sheet.open({title:'\uD83D\uDD14 Notifikasi',body:items.map(n=>`<div class="li-item" style="border-bottom:1px solid var(--border)"><span class="li-ico">${n[0]}</span><span class="grow" style="text-align:left"><b style="font-size:.85rem">${n[1]}</b><br><span class="t-xs t-muted">${n[2]}</span><br><span class="t-xs" style="color:var(--primary-600)">${n[3]}</span></span></div>`).join('')});
    },
    about(){
      App.sheet.open({title:'\u2139\uFE0F Tentang Aplikasi',body:`
        <p style="font-size:.86rem;color:var(--muted);line-height:1.7"><b style="color:var(--ink)">UMKM Jatim Super App</b> adalah platform terpadu untuk memajukan UMKM Jawa Timur \u2014 menghubungkan pelaku usaha, pemerintah, dan investor dalam satu pengalaman aplikasi mobile modern.</p>
        <div class="card card-pad" style="margin-top:12px"><div class="xrow"><span>Versi</span><span>2.0 (Super App)</span></div><div class="xrow"><span>Modul</span><span>10 fitur</span></div><div class="xrow"><span>Arsitektur</span><span>Modular SPA</span></div></div>`});
    },
  };

  function boot(){
    App.auth.restore();
    App.AppShell.mount();
    App.go('home');
    // splash fade
    const sp=App.$('#splash'); if(sp){ setTimeout(()=>{ sp.style.opacity='0'; setTimeout(()=>sp.remove(),400); }, 600); }
  }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})(window.App);
