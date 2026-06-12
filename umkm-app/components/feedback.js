/* components/feedback.js — Toast, BottomSheet, Skeleton, PullToRefresh, FAB */
window.App = window.App || {};
(function(App){

  /* ===== Toast ===== */
  App.toast = function(msg, type){
    const host=App.$('#toast-host'); if(!host) return;
    const ic = type==='ok'?'\u2705':type==='err'?'\u26A0\uFE0F':type==='info'?'\u2139\uFE0F':'\uD83D\uDD14';
    const t=document.createElement('div'); t.className='toast';
    t.innerHTML=`<span>${ic}</span><span>${App.util.esc(msg)}</span>`;
    host.appendChild(t);
    setTimeout(()=>{ t.style.transition='opacity .3s,transform .3s'; t.style.opacity='0'; t.style.transform='translateY(10px)'; setTimeout(()=>t.remove(),300); }, 2400);
  };

  /* ===== Bottom Sheet ===== */
  App.sheet = {
    open(opts){
      opts=opts||{};
      const scrim=App.$('#sheet-scrim'), sheet=App.$('#app-sheet');
      App.$('#sheet-title').textContent=opts.title||'';
      App.$('#sheet-body').innerHTML=opts.body||'';
      scrim.classList.add('show'); sheet.classList.add('show');
      if(opts.onMount) opts.onMount(sheet);
    },
    close(){ App.$('#sheet-scrim').classList.remove('show'); App.$('#app-sheet').classList.remove('show'); },
  };

  /* ===== Skeleton builders ===== */
  App.skeleton = {
    line(w){ return `<div class="skel skel-line" style="width:${w||'100%'}"></div>`; },
    kpiRow(){ return `<div class="kpi-scroll">`+Array(4).fill('<div class="skel" style="flex:0 0 auto;width:150px;height:96px;border-radius:20px"></div>').join('')+`</div>`; },
    prodGrid(n){ return `<div class="prod-grid view-pad">`+Array(n||4).fill('<div><div class="skel skel-card"></div><div class="skel skel-line" style="width:80%"></div><div class="skel skel-line" style="width:50%"></div></div>').join('')+`</div>`; },
    list(n){ return `<div class="view-pad">`+Array(n||4).fill('<div class="card card-pad" style="margin-bottom:10px"><div class="skel skel-line" style="width:60%"></div><div class="skel skel-line" style="width:90%"></div></div>').join('')+`</div>`; },
  };

  /* ===== Pull To Refresh (attach to #app-view) ===== */
  App.ptr = {
    init(){
      const view=App.$('#app-view'); if(!view) return;
      let startY=0, pulling=false, dist=0;
      const ind=document.createElement('div'); ind.className='ptr'; ind.id='ptr-ind';
      ind.innerHTML='<div class="spin"></div><span>Tarik untuk menyegarkan</span>';
      view.prepend(ind);
      view.addEventListener('touchstart',e=>{ if(view.scrollTop<=0){ startY=e.touches[0].clientY; pulling=true; } },{passive:true});
      view.addEventListener('touchmove',e=>{
        if(!pulling) return; dist=e.touches[0].clientY-startY;
        if(dist>0 && view.scrollTop<=0){ const d=Math.min(70,dist*0.5); ind.style.transform='translateY('+d+'px)'; if(dist>90) ind.querySelector('span').textContent='Lepas untuk menyegarkan'; }
      },{passive:true});
      view.addEventListener('touchend',()=>{
        if(pulling && dist>90){ App.ptr.trigger(); } else { ind.style.transition='transform .25s'; ind.style.transform=''; setTimeout(()=>ind.style.transition='',260); }
        pulling=false; dist=0;
      });
    },
    trigger(){
      const ind=App.$('#ptr-ind'); if(!ind) return;
      ind.classList.add('loading'); ind.style.transform='translateY(54px)';
      ind.querySelector('span').textContent='Menyegarkan...';
      setTimeout(()=>{ App.router.refresh(); ind.classList.remove('loading'); ind.style.transition='transform .25s'; ind.style.transform=''; setTimeout(()=>{ind.style.transition='';ind.querySelector('span').textContent='Tarik untuk menyegarkan';},260); App.toast('Diperbarui','ok'); }, 900);
    }
  };

})(window.App);
