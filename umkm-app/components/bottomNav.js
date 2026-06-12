/* components/bottomNav.js — Bottom Navigation Bar */
window.App = window.App || {};
(function(App){
  const ITEMS = [
    { tab:'home',      ico:'\uD83C\uDFE0', label:'Home',     route:'home' },
    { tab:'market',    ico:'\uD83D\uDED2', label:'Market',   route:'marketplace' },
    { tab:'dashboard', ico:'\uD83D\uDCCA', label:'Dashboard',route:'dashboard', center:true },
    { tab:'ai',        ico:'\uD83E\uDD16', label:'AI Advisor',route:'aiAdvisor' },
    { tab:'profile',   ico:'\uD83D\uDC64', label:'Profile',  route:'profile' },
  ];
  App.BottomNav = {
    render(){
      return ITEMS.map(it=>{
        if(it.center){
          return `<div class="bn-center">
            <button class="bn-fab-center" id="bn-${it.tab}" onclick="App.go('${it.route}')">${it.ico}</button>
          </div>`;
        }
        return `<button class="bn-item" id="bn-${it.tab}" onclick="App.go('${it.route}')">
          <span class="bn-ico">${it.ico}</span><span>${it.label}</span></button>`;
      }).join('');
    },
    setActive(tab){
      App.$$('.bn-item').forEach(e=>e.classList.remove('active'));
      if(tab){ const e=App.$('#bn-'+tab); if(e && e.classList.contains('bn-item')) e.classList.add('active'); }
    }
  };
})(window.App);
