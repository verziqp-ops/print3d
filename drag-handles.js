(function(root){'use strict';
function mount({T,host,camera,controls,getDimensions,onResize,enabled=()=>true}){
 const overlay=document.createElement('div');overlay.className='wall-handles';host.appendChild(overlay);let drag=null;
 const definitions=[['width','Ширина','↔',2],['depth','Глибина','↔',2],['height','Висота','↕',1]];
 const project=v=>{const p=v.clone().project(camera);return {x:(p.x+1)*host.clientWidth/2,y:(1-p.y)*host.clientHeight/2,z:p.z}};
 const anchor=(key,p)=>new T.Vector3(key==='width'?p.width/2:0,key==='height'?p.height:p.height*.5,key==='depth'?p.depth/2:0);
 const axis=key=>new T.Vector3(key==='width'?1:0,key==='height'?1:0,key==='depth'?1:0);
 const buttons=definitions.map(([key,label,symbol,factor])=>{
  const b=document.createElement('button');b.type='button';b.className='wall-handle';b.innerHTML=`${symbol}<small></small>`;b.setAttribute('aria-label',`Перетягнути: ${label}`);b.title=`${label}: потягни стінку`;overlay.appendChild(b);
  b.onpointerdown=e=>{if(!enabled()||drag||e.button!==0)return;const p=getDimensions();if(!p)return;camera.updateMatrixWorld();const a=anchor(key,p),s=project(a),end=project(a.clone().add(axis(key))),dx=end.x-s.x,dy=end.y-s.y,len=dx*dx+dy*dy;if(len<.002)return;drag={id:e.pointerId,key,start:p[key],x:e.clientX,y:e.clientY,dx,dy,len,factor,b,controlsEnabled:controls.enabled};controls.enabled=false;b.setPointerCapture(e.pointerId);b.classList.add('dragging');e.preventDefault();e.stopPropagation()};
  b.onpointermove=e=>{if(!drag||drag.b!==b||drag.id!==e.pointerId)return;const d=drag;onResize(d.key,d.start+((e.clientX-d.x)*d.dx+(e.clientY-d.y)*d.dy)/d.len*d.factor);e.preventDefault()};
  const end=e=>{if(!drag||drag.b!==b||drag.id!==e.pointerId)return;controls.enabled=drag.controlsEnabled;b.classList.remove('dragging');drag=null;if(b.hasPointerCapture(e.pointerId))b.releasePointerCapture(e.pointerId)};
  b.onpointerup=end;b.onpointercancel=end;b.onlostpointercapture=end;
  b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)||!enabled())return;e.preventDefault();onResize(key,getDimensions()[key]+(['ArrowRight','ArrowUp'].includes(e.key)?1:-1)*(e.shiftKey?10:1))};
  return {b,key,label};
 });
 return {update(){const p=getDimensions();overlay.hidden=!p||!enabled();if(overlay.hidden)return;camera.updateMatrixWorld();for(const {b,key,label} of buttons){const s=project(anchor(key,p));b.hidden=s.z<-1||s.z>1;b.style.left=Math.max(24,Math.min(host.clientWidth-24,s.x))+'px';b.style.top=Math.max(24,Math.min(host.clientHeight-24,s.y))+'px';b.querySelector('small').textContent=p[key].toFixed(1)+' мм';b.setAttribute('aria-label',`${label}: ${p[key].toFixed(1)} мм. Перетягни або скористайся стрілками`)}},dispose(){if(drag)controls.enabled=drag.controlsEnabled;drag=null;overlay.remove()}};
}
const style=document.createElement('style');style.textContent='.org-preview{position:relative}.wall-handles{position:absolute;inset:0;pointer-events:none}.wall-handles[hidden],.wall-handle[hidden]{display:none!important}.wall-handle{position:absolute;transform:translate(-50%,-50%);width:44px;height:44px;border:2px solid #ff8a1f;border-radius:50%;background:#28170deb;color:#ffab5c;font-size:24px;cursor:grab;touch-action:none;pointer-events:auto;box-shadow:0 3px 15px #0005}.wall-handle small{position:absolute;top:44px;left:50%;transform:translateX(-50%);white-space:nowrap;background:#140e09ed;color:#fff;font:11px sans-serif;padding:3px 6px;border-radius:7px;pointer-events:none}.wall-handle.dragging{cursor:grabbing;background:#ff8a1f;color:#201209}.wall-handle:focus-visible{outline:2px solid white;outline-offset:3px}';document.head.appendChild(style);
root.Print3DWallHandles={mount};
})(window);
