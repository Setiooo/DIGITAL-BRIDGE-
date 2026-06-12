/* pages/training.js — Pelatihan UMKM (expandable cards + filter kategori) */
window.App = window.App || {};
(function(App){
  const U=App.util;
  let cat='all';
  App.train={ setCat(v,btn){ cat=v; App.$$('#tr-chips .chip').forEach(c=>c.classList.remove('on')); btn.classList.add('on'); App.train.renderList(); },
    daftar(title){ App.toast('Terdaftar: '+title,'ok'); App.sheet.close(); },
    detail(id){ const t=App.DATA.TRAINING.find(x=>x.id===id); App.sheet.open({title:t.title,body:`
      <div class="row" style="gap:10px;margin-bottom:10px"><span class="xcard-emoji">${t.emoji}</span><div><b>${t.org}</b><div class="t-xs t-muted">${t.cat} \u00B7 ${t.mode}</div></div></div>
      <div class="card card-pad"><div class="xrow"><span>Tanggal</span><span>${t.date}</span></div><div class="xrow"><span>Waktu</span><span>${t.time}</span></div><div class="xrow"><span>Mode</span><span>${t.mode}</span></div><div class="xrow"><span>Status</span><span>${t.statusLabel}</span></div></div>
      <p style="font-size:.84rem;color:var(--muted);line-height:1.7;margin:12px 0">${t.desc}</p>
      <b style="font-size:.82rem">Manfaat:</b><ul style="margin:6px 0 14px;padding-left:18px;font-size:.82rem;color:var(--muted);line-height:1.7">${t.benefits.map(b=>'<li>'+b+'</li>').join('')}</ul>
      <button class="btn btn-primary btn-block btn-lg" onclick="App.train.daftar('${U.esc(t.title)}')">Daftar Sekarang</button>`}); },
    renderList(){
      const list=App.DATA.TRAINING.filter(t=>cat==='all'||t.catKey===cat);
      const g=App.$('#tr-list'); if(!g) return;
      g.innerHTML=list.map(t=>App.ui.xcard({
        emoji:t.emoji, title:t.title, sub:`${t.org} \u00B7 ${t.date}`,
        badge:{label:t.statusLabel, cls:t.status==='open'?'ok':t.status==='soon'?'warn':'neutral'},
        rows:[['Penyelenggara',t.org],['Tanggal',t.date],['Waktu',t.time],['Mode',t.mode],['Kategori',t.cat]],
        body:`<button class="btn btn-sm btn-primary btn-block" style="margin-top:8px" onclick="event.stopPropagation();App.train.detail(${t.id})">Lihat Detail & Daftar</button>`
      })).join('');
    }
  };
  App.registerRoute('training', {
    tab:'home', back:true, title:'Pelatihan UMKM', subtitle:'Program peningkatan kapasitas',
    skeleton(){ return App.skeleton.list(5); },
    render(){
      return `
        <div class="section"><div class="card card-pad row" style="gap:12px;background:var(--grad-primary);color:#fff">
          <div style="font-size:2rem">\uD83C\uDF93</div><div class="grow"><b>6 Program Tersedia</b><div class="t-xs" style="opacity:.85">Gratis untuk UMKM terdaftar Jawa Timur</div></div></div></div>
        <div id="tr-chips">${App.ui.chips([['all','Semua']].concat(App.DATA.TRAINING_CATS), cat, 'App.train.setCat')}</div>
        <div id="tr-list" class="view-pad" style="padding-top:6px"></div>`;
    },
    onMount(){ App.train.renderList(); }
  });
})(window.App);
