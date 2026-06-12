/* services/authService.js — sesi & login multi-role (demo) */
window.App = window.App || {};
(function(App){
  const ROLES = {
    guest:   { label:'Tamu', emoji:'\uD83D\uDC64', name:'Pengunjung' },
    umkm:    { label:'UMKM', emoji:'\uD83C\uDFEA', name:'UMKM Bu Sari' },
    gov:     { label:'Pemerintah', emoji:'\uD83C\uDFDB\uFE0F', name:'Admin Bapperida' },
    investor:{ label:'Investor', emoji:'\uD83D\uDCBC', name:'PT Maju Bersama' },
  };
  const DEMO = {
    umkm:    { email:'demo@umkm.com', pass:'demo123' },
    gov:     { email:'admin@jatimprov.go.id', pass:'gov2025' },
    investor:{ email:'investor@kadin-jatim.id', pass:'invest2025' },
  };
  App.auth = {
    ROLES, DEMO,
    role(){ return App.state.role; },
    info(){ return ROLES[App.state.role]||ROLES.guest; },
    isLoggedIn(){ return App.state.role!=='guest'; },
    login(role){ App.state.role=role; try{localStorage.setItem('umkm_role',role);}catch(e){} },
    logout(){ App.state.role='guest'; try{localStorage.removeItem('umkm_role');}catch(e){} },
    tryLogin(role, email, pass){
      const d=DEMO[role]; if(!d) return false;
      if(email===d.email && pass===d.pass){ this.login(role); return true; }
      // demo: terima juga jika kosong (mode cepat)
      if(!email && !pass){ this.login(role); return true; }
      return false;
    },
    restore(){ try{ const r=localStorage.getItem('umkm_role'); if(r&&ROLES[r]) App.state.role=r; }catch(e){} },
  };
})(window.App);
