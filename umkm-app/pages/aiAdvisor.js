/* pages/aiAdvisor.js — AI Advisor ala ChatGPT Mobile: chat bubble, quick prompt, riwayat */
window.App = window.App || {};
(function(App){
  const U=App.util;
  // riwayat percakapan (in-memory)
  let threads = [
    { id:1, title:'Analisis Batik Tulis Sari', target:0, msgs:[] },
  ];
  let activeId = 1;
  let busy=false;

  function active(){ return threads.find(t=>t.id===activeId); }

  App.aiad={
    newChat(){ const id=Date.now(); threads.unshift({id,title:'Percakapan Baru',target:0,msgs:[]}); activeId=id; App.router.refresh(); App.sheet.close(); },
    openHistory(){
      const body=threads.map(t=>`<button class="li-item" style="width:100%;border:1px solid var(--border);border-radius:12px;margin-bottom:6px" onclick="App.aiad.select(${t.id})">
        <span class="li-ico" style="background:var(--grad-primary);color:#fff">\uD83D\uDCAC</span>
        <span class="grow" style="text-align:left"><b style="font-size:.84rem">${U.esc(t.title)}</b><br><span class="t-xs t-muted">${t.msgs.length} pesan</span></span>
        ${t.id===activeId?'\u2705':''}</button>`).join('');
      App.sheet.open({title:'\uD83D\uDDC2\uFE0F Riwayat Percakapan',body:`<button class="btn btn-primary btn-block" style="margin-bottom:12px" onclick="App.aiad.newChat()">\u002B Percakapan Baru</button>${body}`});
    },
    select(id){ activeId=id; App.sheet.close(); App.router.refresh(); },
    setTarget(i){ const t=active(); t.target=+i; App.toast('Fokus analisis: '+App.DATA.INV_OPPS[i].name,'info'); },
    quick(q){ App.$('#ai-input').value=q; App.aiad.send(); },
    async send(){
      if(busy) return;
      const inp=App.$('#ai-input'); const text=(inp.value||'').trim(); if(!text) return;
      const t=active(); const u=App.DATA.INV_OPPS[t.target||0];
      t.msgs.push({from:'user',text,time:U.hhmm()});
      if(t.title==='Percakapan Baru') t.title=text.slice(0,28);
      inp.value=''; App.aiad.renderMsgs(); App.aiad.scroll();
      busy=true; App.aiad.typing(true);
      const ans=await App.ai.reply(u,text);
      App.aiad.typing(false);
      t.msgs.push({from:'ai',text:ans,time:U.hhmm()});
      busy=false; App.aiad.renderMsgs(); App.aiad.scroll();
    },
    typing(on){ const el=App.$('#ai-typing'); if(el) el.style.display=on?'flex':'none'; if(on) App.aiad.scroll(); },
    scroll(){ const m=App.$('#ai-msgs'); if(m) m.scrollTop=m.scrollHeight; },
    renderMsgs(){
      const t=active(); const m=App.$('#ai-msgs'); if(!m) return;
      if(!t.msgs.length){
        m.innerHTML=`<div class="center" style="padding:2rem 1rem;color:var(--muted)">
          <div style="width:64px;height:64px;border-radius:20px;background:var(--grad-primary);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 12px">\uD83E\uDD16</div>
          <b style="color:var(--ink)">AI Investment Advisor</b>
          <p style="font-size:.82rem;margin-top:6px">Tanyakan analisis kelayakan, risiko, dan prospek UMKM untuk keputusan investasi Anda.</p></div>`;
        return;
      }
      m.innerHTML=t.msgs.map(x=>App.ui.bubble(x.from==='ai'?x.text:U.esc(x.text), x.from==='user'?'me':'ai', x.time)).join('')
        +`<div id="ai-typing" class="bubble ai typing" style="display:none"><span></span><span></span><span></span></div>`;
    },
  };

  App.registerRoute('aiAdvisor', {
    tab:'ai', title:'AI Advisor', subtitle:'Asisten Investasi Cerdas', headerActions:false,
    render(params){
      if(params && params.idx!=null){ const t=active(); t.target=params.idx; }
      const t=active(); const u=App.DATA.INV_OPPS[t.target||0];
      const targetOpts=App.DATA.INV_OPPS.map((o,i)=>`<option value="${i}" ${i===(t.target||0)?'selected':''}>${o.name}</option>`).join('');
      const quicks=App.DATA.QUICK_QUESTIONS.map(q=>`<button class="qchip" onclick="App.aiad.quick('${q.replace(/'/g,"\\'")}')">${q}</button>`).join('');
      return `
        <div class="ai-topbar">
          <div class="row" style="gap:8px">
            <span style="font-size:1.1rem">\uD83C\uDFAF</span>
            <select id="ai-target" class="ai-select" onchange="App.aiad.setTarget(this.value)">${targetOpts}</select>
            <button class="ah-btn" onclick="App.aiad.openHistory()" title="Riwayat">\uD83D\uDDC2\uFE0F</button>
            <button class="ah-btn" onclick="App.aiad.newChat()" title="Baru">\u270F\uFE0F</button>
          </div>
        </div>
        <div id="ai-msgs" class="ai-msgs"></div>
        <div class="ai-quick">${quicks}</div>
        <div class="ai-inputbar">
          <input id="ai-input" placeholder="Tanya tentang ${U.esc(u.name)}..." onkeydown="if(event.key==='Enter')App.aiad.send()">
          <button class="ai-send" onclick="App.aiad.send()">\u27A4</button>
        </div>`;
    },
    onMount(){ App.aiad.renderMsgs(); App.aiad.scroll(); }
  });
})(window.App);
