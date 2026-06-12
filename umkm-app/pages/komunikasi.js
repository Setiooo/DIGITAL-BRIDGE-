/* pages/komunikasi.js — Komunikasi Strategis ala WhatsApp Business */
window.App = window.App || {};
(function(App){
  const U=App.util;
  let activeChat=null;

  App.komm={
    open(i){ activeChat=i; App.router.refresh(); },
    backToList(){ activeChat=null; App.router.refresh(); },
    quick(tpl){ const inp=App.$('#wa-input'); inp.value=tpl; },
    send(){
      const inp=App.$('#wa-input'); const text=(inp.value||'').trim(); if(!text) return;
      const c=App.DATA.chatData.threads[activeChat];
      c.msgs.push({from:'me',text,time:U.hhmm()});
      inp.value=''; App.komm.renderThread(); App.komm.scroll();
      // auto-reply
      setTimeout(()=>{
        const r=App.DATA.AUTO_REPLIES[Math.floor(Math.random()*App.DATA.AUTO_REPLIES.length)];
        c.msgs.push({from:'them',text:r,time:U.hhmm()});
        App.komm.renderThread(); App.komm.scroll();
      }, 1200);
    },
    scroll(){ const m=App.$('#wa-msgs'); if(m) m.scrollTop=m.scrollHeight; },
    renderThread(){
      const c=App.DATA.chatData.threads[activeChat]; const m=App.$('#wa-msgs'); if(!m||!c) return;
      m.innerHTML=c.msgs.map(x=>App.ui.bubble(U.esc(x.text), x.from==='me'?'me':'them', x.time)).join('');
    },
  };

  App.registerRoute('komunikasi', {
    tab:null, back:true, title:'Komunikasi', subtitle:'Pesan Bisnis', headerActions:false,
    render(){
      // ===== List view =====
      if(activeChat===null){
        const items=App.DATA.chatData.threads.map((c,i)=>{
          const last=c.msgs[c.msgs.length-1];
          return `<button class="wa-item" onclick="App.komm.open(${i})">
            <span class="wa-ava">${c.emoji}</span>
            <span class="grow" style="text-align:left;min-width:0">
              <span class="between"><b style="font-size:.88rem">${U.esc(c.name)}</b><span class="t-xs t-muted">${last?last.time:''}</span></span>
              <span class="t-xs t-muted" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.role} \u00B7 ${last?U.esc(last.text):''}</span>
            </span>${i===0?'<span class="wa-unread">2</span>':''}</button>`;
        }).join('');
        return `<div class="wa-search"><div class="searchbar" style="background:var(--surface-2)"><span class="si">\uD83D\uDD0D</span><input placeholder="Cari percakapan..."></div></div>${items}
          <div class="view-pad"><div class="card card-pad row" style="gap:10px;background:#e7f6ec"><span style="font-size:1.4rem">\u2705</span><span class="t-xs" style="color:#0f5132">Akun Bisnis Terverifikasi \u00B7 Balasan otomatis aktif</span></div></div>`;
      }
      // ===== Thread view =====
      const c=App.DATA.chatData.threads[activeChat];
      const tpl=App.DATA.CHAT_TEMPLATES.map(t=>`<button class="qchip" onclick="App.komm.quick('${t.replace(/'/g,"\\'")}')">${t}</button>`).join('');
      return `
        <div class="wa-thread-head">
          <button class="ah-back" onclick="App.komm.backToList()">\u2039</button>
          <span class="wa-ava sm">${c.emoji}</span>
          <div class="grow"><b style="font-size:.9rem">${U.esc(c.name)}</b><div class="t-xs" style="color:#16a34a">\u25CF online \u00B7 ${c.role}</div></div>
          <button class="ah-btn">\uD83D\uDCDE</button>
        </div>
        <div id="wa-msgs" class="wa-msgs"></div>
        <div class="ai-quick">${tpl}</div>
        <div class="ai-inputbar wa">
          <input id="wa-input" placeholder="Ketik pesan..." onkeydown="if(event.key==='Enter')App.komm.send()">
          <button class="ai-send wa" onclick="App.komm.send()">\u27A4</button>
        </div>`;
    },
    onMount(){ if(activeChat!==null){ App.komm.renderThread(); App.komm.scroll(); } }
  });
})(window.App);
