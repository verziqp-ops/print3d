(function(root){'use strict';
// Contours of a continuous metaball field: joined necks, splitting drops,
// vector-sharp edges and one soft, matte light. No tiles or image crops.
function unit(n){let x=(n+0x9e3779b9)|0;x=Math.imul(x^(x>>>16),0x21f0aaad);x=Math.imul(x^(x>>>15),0x735a2d97);return ((x^(x>>>15))>>>0)/4294967296}
function balls(width,height,scroll,time,dark){
 const scale=Math.min(1.5,Math.max(.7,width/1000)),band=460*scale,out=[];
 for(let row=Math.floor((scroll-400*scale)/band);row<=Math.ceil((scroll+height+400*scale)/band);row++){
  const seed=row*37+(dark?701:71),cx=width*(.12+unit(seed)*.76),cy=row*band+band*.5;
  const phase=time*.085+unit(seed+3)*Math.PI*2;
  const radius=(dark?62:90)*scale*(.7+unit(seed+4)*.8);
  const split=(.6+.5*Math.sin(phase*.83+row))*radius;
  for(let i=0;i<3;i++){
   const angle=phase*.55+i*2.094+row;
   out.push({x:cx+Math.cos(phase*.6+row)*width*.085+Math.cos(angle)*split,
    y:cy-scroll+Math.sin(phase+row)*band*.17+Math.sin(angle)*split,
    r:radius*(i===0?1:.61+.12*Math.sin(phase+i))});
  }
  out.push({x:width*unit(seed+19)+Math.sin(phase*.7)*28*scale,
   y:cy+band*.4-scroll+Math.cos(phase)*44*scale,r:(22+unit(seed+20)*25)*scale});
 }
 return out;
}
const cases=[[],[[3,0]],[[0,1]],[[3,1]],[[1,2]],[[3,2],[0,1]],[[0,2]],[[3,2]],[[2,3]],[[0,2]],[[0,3],[1,2]],[[1,2]],[[1,3]],[[0,1]],[[3,0]],[]];
function contours(width,height,items,step){
 const pad=step*2,nx=Math.ceil((width+pad*2)/step)+1,ny=Math.ceil((height+pad*2)/step)+1,field=new Float32Array(nx*ny);
 for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){
  if(x===0||y===0||x===nx-1||y===ny-1)continue;
  let f=0,px=x*step-pad,py=y*step-pad;
  for(const b of items){const dx=px-b.x,dy=py-b.y;f+=b.r*b.r/(dx*dx+dy*dy+1)}field[y*nx+x]=f;
 }
 const nodes=new Map(),edges=[];
 const point=(x,y,e,v)=>{const endpoints=[[0,1],[1,2],[3,2],[0,3]][e],a=endpoints[0],b=endpoints[1],coords=[[x,y],[x+1,y],[x+1,y+1],[x,y+1]],t=(1-v[a])/(v[b]-v[a]);
  const key=e===0?'h'+x+','+y:e===2?'h'+x+','+(y+1):e===1?'v'+(x+1)+','+y:'v'+x+','+y;
  if(!nodes.has(key))nodes.set(key,{x:(coords[a][0]+(coords[b][0]-coords[a][0])*t)*step-pad,y:(coords[a][1]+(coords[b][1]-coords[a][1])*t)*step-pad,links:[]});return key;};
 for(let y=0;y<ny-1;y++)for(let x=0;x<nx-1;x++){
  const at=y*nx+x,v=[field[at],field[at+1],field[at+nx+1],field[at+nx]],mask=v.reduce((m,f,i)=>m|(f>=1?1<<i:0),0);
  for(const [a,b] of cases[mask]){const ka=point(x,y,a,v),kb=point(x,y,b,v),id=edges.length;edges.push([ka,kb]);nodes.get(ka).links.push(id);nodes.get(kb).links.push(id)}
 }
 const used=new Set(),paths=[];
 for(let i=0;i<edges.length;i++){if(used.has(i))continue;let key=edges[i][0],start=key,path=[];
  for(let guard=0;guard<=edges.length;guard++){const n=nodes.get(key);path.push(n);const edge=n.links.find(id=>!used.has(id));if(edge===undefined)break;used.add(edge);key=edges[edge][0]===key?edges[edge][1]:edges[edge][0];if(key===start)break}
  if(path.length>2)paths.push(path);
 }return paths;
}
function paint(ctx,paths,fill){ctx.fillStyle=fill;ctx.beginPath();for(const path of paths){const last=path[path.length-1],first=path[0];ctx.moveTo((last.x+first.x)/2,(last.y+first.y)/2);for(let i=0;i<path.length;i++){const p=path[i],q=path[(i+1)%path.length];ctx.quadraticCurveTo(p.x,p.y,(p.x+q.x)/2,(p.y+q.y)/2)}ctx.closePath()}ctx.fill('evenodd')}
function mount(host){
 const canvas=document.createElement('canvas');host.appendChild(canvas);const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return()=>{};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let w=0,h=0,frame=0,last=0,time=0,offset=Math.max(0,scrollY),disposed=false;
 const fit=()=>{w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)};
 const render=()=>{ctx.fillStyle='#090807';ctx.fillRect(0,0,w,h);
  const shade=ctx.createLinearGradient(0,0,w,h);shade.addColorStop(0,'#34302b');shade.addColorStop(.55,'#191716');shade.addColorStop(1,'#10100f');
  const step=Math.max(5,Math.sqrt(w*h/21000));paint(ctx,contours(w,h,balls(w,h,offset,time,true),step),shade);
  const orange=ctx.createLinearGradient(0,0,w*.8,h);orange.addColorStop(0,'#e98932');orange.addColorStop(.42,'#c36522');orange.addColorStop(1,'#743718');
  paint(ctx,contours(w,h,balls(w,h,offset,time,false),step),orange);
 };
 const tick=now=>{frame=0;if(disposed||document.hidden)return;const dt=last?Math.min((now-last)/1000,.05):0;last=now;
  const target=Math.max(0,scrollY);offset+=(target-offset)*(1-Math.exp(-dt*9));if(Math.abs(target-offset)<.1)offset=target;
  if(!reduced.matches)time+=dt;render();if(!reduced.matches||Math.abs(target-offset)>.1)frame=requestAnimationFrame(tick);
 };
 const wake=()=>{if(!disposed&&!document.hidden&&!frame){last=0;frame=requestAnimationFrame(tick)}};
 const resize=()=>{fit();wake()};const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0}else wake()};
 fit();wake();addEventListener('resize',resize,{passive:true});addEventListener('scroll',wake,{passive:true});document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',wake);
 return()=>{disposed=true;cancelAnimationFrame(frame);removeEventListener('resize',resize);removeEventListener('scroll',wake);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',wake);canvas.remove()};
}
const api={mount,balls,contours};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DLava=api;
})(typeof window!=='undefined'?window:this);
