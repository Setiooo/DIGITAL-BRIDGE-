/* utils/format.js — helper format & angka */
window.App = window.App || {};
App.util = {
  rp(n){ return 'Rp' + Number(n||0).toLocaleString('id-ID'); },
  rpShort(n){
    n = Number(n||0);
    if(n>=1e9) return 'Rp'+(n/1e9).toFixed(1).replace('.0','')+'M';
    if(n>=1e6) return 'Rp'+(n/1e6).toFixed(1).replace('.0','')+'Jt';
    if(n>=1e3) return 'Rp'+Math.round(n/1e3)+'Rb';
    return 'Rp'+n;
  },
  num(n){ return Number(n||0).toLocaleString('id-ID'); },
  stars(r){ let s=''; for(let i=1;i<=5;i++) s+= i<=Math.floor(r)?'\u2605':'\u2606'; return s; },
  score(p){ return p.views*0.4 + p.sold*0.6; },
  pct(a,b){ return b? Math.round((a/b)*100):0; },
  esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); },
  hhmm(d){ d=d||new Date(); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); },
  waLink(p){ return 'https://wa.me/'+p.wa+'?text='+encodeURIComponent('Halo '+p.seller+', saya tertarik produk '+p.name); },
  debounce(fn,ms){ let t; return function(){ clearTimeout(t); const a=arguments,c=this; t=setTimeout(()=>fn.apply(c,a),ms||200); }; },
};
