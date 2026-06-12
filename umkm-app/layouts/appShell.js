/* layouts/appShell.js — kerangka aplikasi (header + view + bottom nav + overlay) */
window.App = window.App || {};
(function(App){
  App.AppShell = {
    mount(){
      const app=App.$('#app');
      app.innerHTML = `
        <header id="app-header" class="app-header"></header>
        <main id="app-view" class="app-view"></main>
        <button id="app-fab" class="fab hidden"></button>
        <nav id="app-nav" class="bottom-nav">${App.BottomNav.render()}</nav>
        <div id="sheet-scrim" class="sheet-scrim" onclick="App.sheet.close()"></div>
        <div id="app-sheet" class="sheet">
          <div class="sheet-grip"></div>
          <div class="sheet-head"><h3 id="sheet-title"></h3><button class="sheet-close" onclick="App.sheet.close()">\u2715</button></div>
          <div id="sheet-body" class="sheet-body"></div>
        </div>
        <div id="toast-host" class="toast-host"></div>`;
      App.$('#app-view').addEventListener('scroll',function(){
        App.$('#app-header').classList.toggle('scrolled', this.scrollTop>4);
      },{passive:true});
      App.ptr.init();
    },
    applyHeader(route, params){ App.$('#app-header').innerHTML = App.AppHeader.render(route, params); },
    applyNav(show){ App.$('#app-frame').classList.toggle('no-nav', !show); },
    applyFab(route, params){
      const fab=App.$('#app-fab');
      if(route.fab){ fab.classList.remove('hidden'); fab.innerHTML=route.fab.icon||'\u002B'; fab.onclick=()=>route.fab.onclick(params); }
      else { fab.classList.add('hidden'); fab.onclick=null; }
    }
  };
})(window.App);
