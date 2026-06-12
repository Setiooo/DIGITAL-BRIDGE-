/* utils/charts.js — chart ringan berbasis SVG (tanpa CDN) */
window.App = window.App || {};
App.charts = {
  // Sparkline / area line
  line(values,opts){
    opts=opts||{}; const w=opts.w||260,h=opts.h||80,pad=6;
    const max=Math.max.apply(null,values),min=Math.min.apply(null,values);
    const rng=(max-min)||1;
    const pts=values.map((v,i)=>{
      const x=pad+i*((w-pad*2)/(values.length-1));
      const y=h-pad-((v-min)/rng)*(h-pad*2);
      return [x,y];
    });
    const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
    const area=d+' L'+pts[pts.length-1][0].toFixed(1)+' '+(h-pad)+' L'+pad+' '+(h-pad)+' Z';
    const c=opts.color||'#143a86';
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".25"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs>
      <path d="${area}" fill="url(#lg)"/>
      <path d="${d}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  },
  // Grouped bars (pemasukan vs pengeluaran) with labels
  bars(labels,series,opts){
    opts=opts||{}; const h=opts.h||150;
    const all=[].concat.apply([],series.map(s=>s.data));
    const max=Math.max.apply(null,all)||1;
    return `<div style="display:flex;align-items:flex-end;gap:10px;height:${h}px;padding:6px 2px 0">`+
      labels.map((lb,i)=>{
        const cols=series.map(s=>{
          const ht=Math.max(3,(s.data[i]/max)*(h-26));
          return `<div title="${s.label}: ${App.util.rpShort(s.data[i])}" style="width:9px;border-radius:5px 5px 0 0;height:${ht}px;background:${s.color}"></div>`;
        }).join('');
        return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
          <div style="display:flex;align-items:flex-end;gap:3px;height:${h-22}px">${cols}</div>
          <span style="font-size:.6rem;color:var(--muted)">${lb}</span></div>`;
      }).join('')+`</div>`;
  },
  // Donut (single value vs total) returns svg ring with center label
  donut(value,total,opts){
    opts=opts||{}; const size=opts.size||96,sw=opts.sw||11,r=(size-sw)/2,c=2*Math.PI*r;
    const p=Math.min(1,total? value/total:0), off=c*(1-p);
    const col=opts.color||'#143a86';
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#eef1f6" stroke-width="${sw}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col}" stroke-width="${sw}"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"
        transform="rotate(-90 ${size/2} ${size/2})"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="${opts.fs||18}" font-weight="800" fill="${col}">${opts.label||Math.round(p*100)+'%'}</text>
    </svg>`;
  },
  // Multi-segment horizontal bar
  stack(segments,opts){
    const total=segments.reduce((a,s)=>a+s.value,0)||1;
    return `<div style="display:flex;height:${(opts&&opts.h)||10}px;border-radius:6px;overflow:hidden;background:#eef1f6">`+
      segments.map(s=>`<div style="width:${(s.value/total*100).toFixed(1)}%;background:${s.color}"></div>`).join('')+`</div>`;
  }
};
