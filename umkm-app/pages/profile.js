/* pages/profile.js — Profil & pengaturan akun multi-role */
window.App = window.App || {};
(function(App){
  App.profile={
    logout(){ App.auth.logout(); App.toast('Berhasil keluar','ok'); App.go('home'); },
  };
  App.registerRoute('profile', {
    tab:'profile', title:'Profile', subtitle:'Akun Saya', headerActions:false,
    render(){
      const info=App.auth.info(); const logged=App.auth.isLoggedIn();
      const menu=(ico,label,onclick,extra)=>`<button class="li-item" onclick="${onclick}"><span class="li-ico">${ico}</span><span class="grow" style="text-align:left;font-weight:600;font-size:.88rem">${label}</span>${extra||'<span class="t-muted">\u203A</span>'}</button>`;
      return `
        <div style="background:var(--grad-navy-gold);color:#fff;padding:24px 16px;text-align:center">
          <div style="width:80px;height:80px;border-radius:26px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:2.4rem;margin:0 auto 10px;backdrop-filter:blur(6px)">${info.emoji}</div>
          <div style="font-weight:800;font-size:1.1rem">${info.name}</div>
          <div style="font-size:.8rem;opacity:.9;margin-top:2px">${logged?'Peran: '+info.label:'Belum masuk'}</div>
          ${logged?'<span class="badge ok" style="margin-top:8px;display:inline-block">\u2705 Akun Aktif</span>':`<button class="btn btn-gold" style="margin-top:12px" onclick="App.go('login')">Masuk / Daftar</button>`}
        </div>
        <div class="section">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
            <div class="card card-pad center"><div class="h3">12</div><div class="t-xs t-muted">Pesanan</div></div>
            <div class="card card-pad center"><div class="h3">5</div><div class="t-xs t-muted">Wishlist</div></div>
            <div class="card card-pad center"><div class="h3">3</div><div class="t-xs t-muted">Pelatihan</div></div>
          </div>
        </div>
        <div class="view-pad" style="padding-top:0">
          <div class="li-group">
            ${menu('\uD83D\uDCCA','Dashboard Saya',"App.go('dashboard')")}
            ${menu('\uD83D\uDED2','Pesanan & Transaksi',"App.toast('Demo: belum ada pesanan','info')")}
            ${menu('\uD83C\uDF93','Pelatihan Diikuti',"App.go('training')")}
            ${menu('\uD83D\uDCAC','Komunikasi',"App.go('komunikasi')")}
          </div>
          <div class="li-group" style="margin-top:12px">
            ${menu('\uD83D\uDD14','Notifikasi',"App.actions.openNotif()")}
            ${menu('\uD83C\uDFAD','Ganti Peran (Demo)',"App.go('login')")}
            ${menu('\u2699\uFE0F','Pengaturan',"App.toast('Pengaturan (demo)','info')")}
            ${menu('\u2139\uFE0F','Tentang Aplikasi',"App.actions.about()")}
          </div>
          ${logged?`<button class="btn btn-ghost btn-block" style="margin-top:16px;color:var(--danger)" onclick="App.profile.logout()">\uD83D\uDEAA Keluar</button>`:''}
          <div class="center t-xs t-muted" style="margin-top:16px">UMKM Jatim Super App \u00B7 v2.0</div>
          <div style="height:10px"></div>
        </div>`;
    }
  });
})(window.App);
