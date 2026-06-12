/* components/appHeader.js — App Header universal (logo | judul | aksi) */
window.App = window.App || {};
(function(App){
  App.AppHeader = {
    render(route, params){
      const hasBack = route.back;
      const title = typeof route.title==='function' ? route.title(params) : (route.title||'UMKM Jatim');
      const sub = route.subtitle || 'Super App Jawa Timur';
      const left = hasBack
        ? `<button class="ah-back" onclick="App.router.back()">\u2039</button>`
        : `<div class="ah-logo">\uD83C\uDFEA</div>`;
      const actions = route.headerActions===false ? '' : `
        <div class="ah-actions">
          <button class="ah-btn" onclick="App.actions.openSearch()">\uD83D\uDD0D</button>
          <button class="ah-btn" onclick="App.actions.openNotif()">\uD83D\uDD14<span class="ah-dot"></span></button>
          <button class="ah-btn" onclick="App.go('profile')"><span class="ah-avatar">${App.auth.info().emoji}</span></button>
        </div>`;
      return `${left}
        <div class="ah-title"><b>${title}</b><small>${sub}</small></div>
        ${actions}`;
    }
  };
})(window.App);
