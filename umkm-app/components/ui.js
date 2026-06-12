/* components/ui.js — UI primitives (render helpers) */
window.App = window.App || {};
(function(App){
  const U=App.util;
  App.ui = {
    sectionTitle(title, action){
      return `<div class="sec-title"><h2>${title}</h2>${action?`<a onclick="${action.onclick}">${action.label} \u203A</a>`:''}</div>`;
    },

    /* KPI horizontal scroller. items: [{ico,val,label,trend,theme}] */
    kpiScroller(items){
      return `<div class="kpi-scroll">`+items.map(k=>`
        <div class="kpi-card kpi-${k.theme||'navy'}">
          <div class="kpi-ico">${k.ico||''}</div>
          <div class="kpi-val">${k.val}</div>
          <div class="kpi-lbl">${k.label}</div>
          ${k.trend?`<div class="kpi-trend">${k.trend}</div>`:''}
        </div>`).join('')+`</div>`;
    },

    /* Expandable card. {id,emoji,img,title,sub,badge:{label,cls},rows:[[k,v]],body} */
    xcard(o){
      const badge=o.badge?`<span class="badge ${o.badge.cls||'neutral'}">${o.badge.label}</span>`:'';
      const media=o.img?`<div class="xcard-emoji"><img src="${o.img}"></div>`:`<div class="xcard-emoji">${o.emoji||'\uD83D\uDCCB'}</div>`;
      const rows=(o.rows||[]).map(r=>`<div class="xrow"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('');
      return `<div class="xcard" id="${o.id||''}">
        <div class="xcard-head" onclick="App.ui.toggleX(this)">
          ${media}
          <div class="xcard-main">
            <div class="xcard-title">${o.title}</div>
            <div class="xcard-sub">${o.sub||''}</div>
          </div>
          ${badge}
          <span class="xcard-chev">\u25BE</span>
        </div>
        <div class="xcard-body"><div class="xcard-body-inner">${rows}${o.body||''}</div></div>
      </div>`;
    },
    toggleX(head){
      const card=head.closest('.xcard'); const body=card.querySelector('.xcard-body');
      const open=card.classList.toggle('open');
      body.style.maxHeight = open ? body.scrollHeight+'px' : '0';
    },

    /* Product card (2-col) */
    pcard(p){
      const badge = p.status==='pending'?'<span class="pcard-badge"><span class="badge warn">\u23F3 Review</span></span>':p.status==='rejected'?'<span class="pcard-badge"><span class="badge err">\u274C Ditolak</span></span>':'';
      const colors={Kuliner:'#e8f5ee,#c8e8d4',Fashion:'#ede9fe,#ddd6fe',Kerajinan:'#fef3c7,#fde68a',Jasa:'#dbeafe,#bfdbfe'};
      const c=colors[p.cat]||'#eef2fb,#dfe7f7';
      const img = p.img?`<img src="${p.img}">`:p.emoji;
      return `<div class="pcard" onclick="App.go('productDetail',{id:${p.id}})">
        <div class="pcard-img" style="background:linear-gradient(135deg,${c})">${img}
          <div class="pcard-fav">\u2661</div>${badge}
        </div>
        <div class="pcard-body">
          <div class="pcard-cat">${p.cat}</div>
          <div class="pcard-name">${U.esc(p.name)}</div>
          <div class="pcard-price">${U.rp(p.price)}</div>
          <div class="pcard-meta">\u2B50 ${p.rating||'-'} \u00B7 ${p.sold} terjual</div>
          <div class="pcard-seller">\uD83C\uDFEA ${U.esc(p.seller)}</div>
        </div>
      </div>`;
    },

    chips(items, activeVal, onclickName){
      return `<div class="chips">`+items.map(it=>{
        const val=Array.isArray(it)?it[0]:it, lbl=Array.isArray(it)?it[1]:it;
        return `<button class="chip ${val===activeVal?'on':''}" onclick="${onclickName}('${val}',this)">${lbl}</button>`;
      }).join('')+`</div>`;
    },

    bubble(text, who, time){
      return `<div class="bubble ${who}">${text}${time?`<span class="b-time">${time}</span>`:''}</div>`;
    },

    progress(p){ return `<div class="pbar"><i style="width:${p}%"></i></div>`; },

    empty(icon, msg){ return `<div class="center" style="padding:3rem 1rem;color:var(--muted)"><div style="font-size:2.6rem">${icon}</div><p style="margin-top:.6rem;font-size:.86rem">${msg}</p></div>`; },
  };
})(window.App);
