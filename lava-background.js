(function(root){'use strict';
// Independent depth fields: drops merge only within their own layer.
// Compact influence keeps distant drops apart; soft normals add volume.
function unit(n){let x=(n+0x9e3779b9)|0;x=Math.imul(x^(x>>>16),0x21f0aaad);x=Math.imul(x^(x>>>15),0x735a2d97);return ((x^(x>>>15))>>>0)/4294967296}
const palettes=[[244,112,25],[220,83,15],[168,52,10],[250,128,34],[193,68,13]];
const layers=[{depth:.62,size:.72,blur:12,opacity:.48},{depth:.8,size:.9,blur:5,opacity:.76},{depth:1,size:1,blur:0,opacity:1}];
function balls(width,height,scroll,time,layer=2){
 const config=layers[layer],scale=Math.min(1.35,Math.max(.65,width/1100)),band=245*scale,rise=time*(10+layer*3)*scale,out=[];
 const world=scroll*config.depth+rise,margin=180*scale;
 for(let row=Math.floor((world-margin)/band)-1;row<=Math.ceil((world+height+margin)/band);row++){
  const seed=row*53+layer*937+71,cx=width*(.07+unit(seed)*.86),cy=row*band+unit(seed+2)*band*.65-world;
  const phase=time*.13+unit(seed+3)*Math.PI*2,radius=(30+unit(seed+4)*26)*scale*config.size;
  const split=radius*(1.15+.55*Math.sin(phase*.8+row));
  for(let i=0;i<2;i++){
   const angle=phase*.36+i*Math.PI+row;
   const dark=unit(seed+i*17+8)>.67;
   out.push({id:row*2+i,layer,x:cx+Math.cos(phase*.65+row)*width*.036+Math.cos(angle)*split,
    y:cy+Math.sin(phase+row)*band*.018+Math.sin(angle)*split,
    r:radius*(i===0?1:.65+.08*Math.sin(phase+i)),
    color:dark?[40,37,35]:palettes[Math.floor(unit(seed+i*29+12)*palettes.length)]});
  }
 }return out;
}
const cases=[[],[[3,0]],[[0,1]],[[3,1]],[[1,2]],[[3,2],[0,1]],[[0,2]],[[3,2]],[[2,3]],[[0,2]],[[0,3],[1,2]],[[1,2]],[[1,3]],[[0,1]],[[3,0]],[]];
function contours(width,height,items,step){
 const pad=step*2,nx=Math.ceil((width+pad*2)/step)+1,ny=Math.ceil((height+pad*2)/step)+1,field=new Float32Array(nx*ny);
 for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){
  if(x===0||y===0||x===nx-1||y===ny-1)continue;
  let f=0,px=x*step-pad,py=y*step-pad;
  for(const b of items){const dx=px-b.x,dy=py-b.y;f+=Math.max(0,(b.r*b.r/(dx*dx+dy*dy+1)-.16)/.84)}field[y*nx+x]=f;
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
function trace(ctx,paths){ctx.beginPath();for(const path of paths){const last=path[path.length-1],first=path[0];ctx.moveTo((last.x+first.x)/2,(last.y+first.y)/2);for(let i=0;i<path.length;i++){const p=path[i],q=path[(i+1)%path.length];ctx.quadraticCurveTo(p.x,p.y,(p.x+q.x)/2,(p.y+q.y)/2)}ctx.closePath()}}
// Blend each drop's own color by its field strength, including black/orange
// necks. Shared diffuse light gives depth without hard glossy highlights.
function colorField(items,width,height,data){
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  let weight=0,red=0,green=0,blue=0,nx=0,ny=0,nz=0;
  for(const b of items){const dx=(x-b.x)/b.r,dy=(y-b.y)/b.r,d2=dx*dx+dy*dy;
   if(d2>6.25)continue;
   const f=1/(d2+.22),a=f*f*f;
   weight+=a;red+=a*b.color[0];green+=a*b.color[1];blue+=a*b.color[2];
   nx+=a*dx;ny+=a*dy;nz+=a*Math.sqrt(Math.max(.04,1-d2*.7));
  }
  const at=(y*width+x)*4;if(!weight){data[at+3]=0;continue}
  const norm=Math.hypot(nx,ny,nz),light=Math.max(0,(-nx*.4-ny*.55+nz*.73)/norm);
  const shade=.38+.67*light,sheen=Math.pow(light,14)*12;
  data[at]=red/weight*shade+sheen;data[at+1]=green/weight*shade+sheen*.45;data[at+2]=blue/weight*shade+sheen*.22;data[at+3]=255;
 }
}
function mount(host){
 const surfaces=layers.map(config=>{const canvas=document.createElement('canvas');host.appendChild(canvas);Object.assign(canvas.style,{position:'absolute',inset:'0',filter:config.blur?`blur(${config.blur}px)`:'none',opacity:config.opacity});const texture=document.createElement('canvas');return {canvas,ctx:canvas.getContext('2d'),texture,ink:texture.getContext('2d'),pixels:null}});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let w=0,h=0,frame=0,last=0,time=0,offset=Math.max(0,scrollY),disposed=false;
 const fit=()=>{w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,2),cell=Math.max(3,Math.sqrt(w*h/10000));for(const s of surfaces){s.canvas.width=Math.round(w*dpr);s.canvas.height=Math.round(h*dpr);s.ctx.setTransform(dpr,0,0,dpr,0,0);s.texture.width=Math.ceil(w/cell);s.texture.height=Math.ceil(h/cell);s.pixels=s.ink.createImageData(s.texture.width,s.texture.height)}};
 const render=()=>{for(let layer=0;layer<surfaces.length;layer++){
  const {ctx,texture,ink,pixels}=surfaces[layer];ctx.clearRect(0,0,w,h);
  const items=balls(w,h,offset,time,layer),paths=contours(w,h,items,Math.max(4,Math.sqrt(w*h/11000)));
  const sx=texture.width/w,sy=texture.height/h;
  colorField(items.map(b=>({...b,x:b.x*sx,y:b.y*sy,r:b.r*sx})),texture.width,texture.height,pixels.data);ink.putImageData(pixels,0,0);
  ctx.save();trace(ctx,paths);ctx.clip('evenodd');ctx.imageSmoothingEnabled=true;ctx.drawImage(texture,0,0,w,h);ctx.restore();
 }};
 const tick=now=>{frame=0;if(disposed||document.hidden)return;const dt=last?Math.min((now-last)/1000,.05):0;last=now;
  const target=Math.max(0,scrollY);offset+=(target-offset)*(1-Math.exp(-dt*9));if(Math.abs(target-offset)<.1)offset=target;
  if(!reduced.matches)time+=dt;render();if(!reduced.matches||Math.abs(target-offset)>.1)frame=requestAnimationFrame(tick);
 };
 const wake=()=>{if(!disposed&&!document.hidden&&!frame){last=0;frame=requestAnimationFrame(tick)}};
 const resize=()=>{fit();wake()};const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0}else wake()};
 fit();wake();addEventListener('resize',resize,{passive:true});addEventListener('scroll',wake,{passive:true});document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',wake);
 return()=>{disposed=true;cancelAnimationFrame(frame);removeEventListener('resize',resize);removeEventListener('scroll',wake);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',wake);surfaces.forEach(s=>s.canvas.remove())};
}
const api={mount,balls,contours,colorField,layers};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DLava=api;
})(typeof window!=='undefined'?window:this);
