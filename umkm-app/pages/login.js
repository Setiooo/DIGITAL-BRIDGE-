/* pages/login.js — Login multi-role (UMKM / Pemerintah / Investor) */
window.App = window.App || {};
(function(App){
  let role='umkm';
  App.login={
    pick(r,btn){ role=r; App.$$('#lg-roles .role-card').forEach(c=>c.classList.remove('on')); btn.classList.add('on');
      const d=App.auth.DEMO[r]; App.$('#lg-email').value=d.email; App.$('#lg-pass').value=d.pass; App.$('#lg-hint').textContent='Demo: '+d.email+' / '+d.pass; },
    submit(){
      const email=App.$('#lg-email').value.trim(), pass=App.$('#lg-pass').value.trim();
      if(App.auth.tryLogin(role,email,pass)){
        App.toast('Selamat datang, '+App.auth.info().name,'ok');
        App.go('dashboard',{role:role});
      } else App.toast('Email atau kata sandi salah','err');
    }
  };
  App.registerRoute('login', {
    tab:null, back:true, title:'Masuk', subtitle:'Login Multi Peran', headerActions:false,
    render(){
      const roles=[['umkm','\uD83C\uDFEA','UMKM','Kelola usaha & produk'],['gov','\uD83C\uDFDB\uFE0F','Pemerintah','Monitoring & verifikasi'],['investor','\uD83D\uDCBC','Investor','Peluang pendanaan']];
      return `
        <div style="text-align:center;padding:22px 16px 8px">
          <div style="width:64px;height:64px;border-radius:20px;background:var(--grad-primary);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 10px">\uD83C\uDFEA</div>
          <div style="font-weight:800;font-size:1.15rem">UMKM Jatim Super App</div>
          <div class="t-xs t-muted">Pilih peran untuk masuk</div>
        </div>
        <div class="view-pad">
          <div id="lg-roles" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px">
            ${roles.map(r=>`<button class="role-card ${r[0]===role?'on':''}" onclick="App.login.pick('${r[0]}',this)">
              <span style="font-size:1.6rem">${r[1]}</span><b style="font-size:.8rem">${r[2]}</b><span class="t-xs t-muted" style="text-align:center;line-height:1.2">${r[3]}</span></button>`).join('')}
          </div>
          <div class="field"><label>Email</label><input class="input" id="lg-email" value="${App.auth.DEMO[role].email}"></div>
          <div class="field"><label>Kata Sandi</label><input class="input" id="lg-pass" type="password" value="${App.auth.DEMO[role].pass}"></div>
          <div class="t-xs t-muted" id="lg-hint" style="margin:-4px 0 14px">Demo: ${App.auth.DEMO[role].email} / ${App.auth.DEMO[role].pass}</div>
          <button class="btn btn-primary btn-block btn-lg" onclick="App.login.submit()">Masuk</button>
          <button class="btn btn-ghost btn-block" style="margin-top:8px" onclick="App.go('home')">Lewati \u2014 Jelajahi dulu</button>
        </div>`;
    }
  });
})(window.App);
