/* utils/router.js — SPA router dengan page transition & history stack */
window.App = window.App || {};
App.routes = {};
App.state = { route:null, params:{}, role:'guest' };
App.NONAV = { productDetail:true, login:true };

App.registerRoute = function(name, def){ App.routes[name]=def; };

App.router = {
  stack:[],
  go(name, params, opts){
    params=params||{}; opts=opts||{};
    const route = App.routes[name];
    if(!route){ console.warn('no route',name); return; }
    const back = !!opts.back;
    if(back){ this.stack.pop(); }
    else if(App.state.route && App.state.route!==name){ this.stack.push({name:App.state.route,params:App.state.params}); }
    App.state.route=name; App.state.params=params;

    // Shell chrome
    App.AppShell.applyHeader(route, params);
    App.AppShell.applyNav(!App.NONAV[name]);
    App.BottomNav.setActive(route.tab||null);
    App.AppShell.applyFab(route, params);

    const view = App.$('#app-view');
    view.onscroll=null; // reset per-page scroll handlers
    view.scrollTop = 0;
    const wrap = document.createElement('div');
    wrap.className = back ? 'view-anim-back' : 'view-anim';
    wrap.id = 'route-root';

    if(route.skeleton){
      wrap.innerHTML = route.skeleton(params);
      view.innerHTML=''; view.appendChild(wrap);
      setTimeout(()=>{
        if(App.state.route!==name) return; // navigated away
        wrap.innerHTML = route.render(params)||'';
        if(route.onMount) route.onMount(params, wrap);
      }, route.skeletonMs||500);
    } else {
      wrap.innerHTML = route.render(params)||'';
      view.innerHTML=''; view.appendChild(wrap);
      if(route.onMount) route.onMount(params, wrap);
    }
  },
  back(){
    const prev = this.stack.length ? this.stack[this.stack.length-1] : {name:'home',params:{}};
    this.go(prev.name, prev.params, {back:true});
  },
  refresh(){
    const r=App.state.route; const route=App.routes[r];
    const wrap=App.$('#route-root');
    if(route && wrap){ wrap.innerHTML=route.render(App.state.params)||''; if(route.onMount) route.onMount(App.state.params,wrap); }
  }
};
App.go = (n,p,o)=>App.router.go(n,p,o);
