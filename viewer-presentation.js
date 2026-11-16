/* Presentation helpers only; G-code parsing, timing and access rules stay in app.js. */
(function(root){
  const palette=dark=>dark?{background:'#242a30',floor:'#303840',grid:'#46525f',text:'#c4cdd5',model:'#d1d5da',active:'#9bafc2'}:{background:'#eff0ef',floor:'#e1e4e5',grid:'#c6ced4',text:'#657484',model:'#c8cbd0',active:'#586c83'};
  function selectedColor(color,dark=false){return /^#[0-9a-f]{6}$/i.test(color||'')?color:palette(dark).model}
  function dimensions(size,locale='uk',unit='mm'){const format=n=>Number.isFinite(n)?Number(n.toFixed(1)).toLocaleString(locale==='ru'?'ru-RU':'uk-UA'):'—';return [size.x,size.y,size.z].map(format).join(' × ')+(unit==='model'?(locale==='ru'?' ед. модели':' од. моделі'):' мм')}
  function progress(elapsed,total,selected,count){return {percent:total>0?Math.round(Math.max(0,Math.min(1,elapsed/total))*100):0,remaining:Math.max(0,Math.ceil((total-elapsed)/60)),layer:Math.max(1,Math.min(count,selected)),layers:count}}
  function ghostPaths(layers,cx,cy,base){
    const positions=[],starts=[];const layerStep=Math.max(1,Math.ceil(layers.length/48));
    for(let i=0;i<layers.length;i++){starts[i]=positions.length/3;if(i%layerStep)continue;const L=layers[i],step=Math.max(1,Math.ceil(L.s.length/6/160));for(let j=0;j<L.s.length;j+=6*step)positions.push(L.s[j]-cx,L.s[j+2]-base,-(L.s[j+1]-cy),L.s[j+3]-cx,L.s[j+5]-base,-(L.s[j+4]-cy))}
    starts[layers.length]=positions.length/3;return {positions:Float32Array.from(positions),starts};
  }
  async function fullscreen(host){
    if(document.fullscreenElement){await document.exitFullscreen();return}
    if(host.requestFullscreen){try{await host.requestFullscreen();return}catch(e){/* CSS fallback for browsers without element fullscreen. */}}
    host.classList.toggle('viewer-focus');window.dispatchEvent(new Event('resize'));
  }
  if(typeof document!=='undefined')document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.viewer-focus').forEach(el=>el.classList.remove('viewer-focus'))});
  const api={palette,selectedColor,dimensions,progress,ghostPaths,fullscreen};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DViewer=api;
})(typeof window!=='undefined'?window:globalThis);
