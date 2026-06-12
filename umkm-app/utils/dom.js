/* utils/dom.js — helper DOM ringkas */
window.App = window.App || {};
App.$  = (s,r)=> (r||document).querySelector(s);
App.$$ = (s,r)=> Array.from((r||document).querySelectorAll(s));
App.dom = {
  set(sel,html){ const e=App.$(sel); if(e) e.innerHTML=html; },
  on(sel,ev,fn){ const e=App.$(sel); if(e) e.addEventListener(ev,fn); },
  // animate a numeric counter inside an element
  count(el,to,opts){
    opts=opts||{}; const dur=opts.dur||900, fmt=opts.fmt||(v=>Math.round(v).toLocaleString('id-ID'));
    const start=performance.now();
    function step(t){
      const p=Math.min(1,(t-start)/dur), e=1-Math.pow(1-p,3);
      el.textContent=(opts.prefix||'')+fmt(to*e)+(opts.suffix||'');
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  },
};
