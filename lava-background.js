(function(root){'use strict';
// Contours of a continuous metaball field: joined necks, splitting drops,
// vector-sharp edges and one soft, matte light. No tiles or image crops.
function unit(n){let x=(n+0x9e3779b9)|0;x=Math.imul(x^(x>>>16),0x21f0aaad);x=Math.imul(x^(x>>>15),0x735a2d97);return ((x^(x>>>15))>>>0)/4294967296}
const palettes=[[255,150,54],[237,108,28],[184,68,17],[255,180,85],[210,88,24]];
function balls(width,height,scroll,time,dark){
 const scale=Math.min(1.5,Math.max(.7,width/1000)),band=460*scale,rise=time*18*scale,out=[];
 // New rows enter from below without wrapping or resetting existing drops.
 for(let row=Math.floor((scroll+rise-440*scale)/band);row<=Math.ceil((scroll+rise+height+440*scale)/band);row++){
  const seed=row*37+(dark?701:71),cx=width*(.12+unit(seed)*.76),cy=row*band+band*.5-rise;
  const phase=time*.16+unit(seed+3)*Math.PI*2;
  const radius=(dark?62:90)*scale*(.7+unit(seed+4)*.8);
  const split=(.6+.5*Math.sin(phase*.83+row))*radius;
  for(let i=0;i<3;i++){
   const angle=phase*.35+i*2.094+row;
   const color=dark?[18+unit(seed+i+11)*24,18+unit(seed+i+11)*22,19+unit(seed+i+11)*19]:palettes[Math.floor(unit(seed+i*17+8)*palettes.length)];
   out.push({x:cx+Math.cos(phase*.6+row)*width*.065+Math.cos(angle)*split,
    y:cy-scroll+Math.sin(phase+row)*band*.025+Math.sin(angle)*split,
    r:radius*(i===0?1:.61+.12*Math.sin(phase+i)),color});
  }
  out.push({x:width*unit(seed+19)+Math.sin(phase*.7)*28*scale,
   y:cy+band*.4-scroll+Math.cos(phase)*12*scale,r:(22+unit(seed+20)*25)*scale,
   color:dark?[34,32,30]:palettes[Math.floor(unit(seed+21)*palettes.length)]});
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
function trace(ctx,paths){ctx.beginPath();for(const path of paths){const last=path[path.length-1],first=path[0];ctx.moveTo((last.x+first.x)/2,(last.y+first.y)/2);for(let i=0;i<path.length;i++){const p=path[i],q=path[(i+1)%path.length];ctx.quadraticCurveTo(p.x,p.y,(p.x+q.x)/2,(p.y+q.y)/2)}ctx.closePath()}}
// Blend each drop's own color by its field strength, including black/orange
// necks. Shared diffuse light gives depth without hard glossy highlights.
function colorField(items,width,height,data){
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  let weight=0,red=0,green=0,blue=0;
  for(const b of items){const dx=x-b.x,dy=y-b.y,r2=b.r*b.r,f=r2/(dx*dx+dy*dy+r2*.18),a=f*f*f;
   const light=Math.max(.55,Math.min(1.24,1.02-.13*dx/b.r-.19*dy/b.r));
   weight+=a;red+=a*b.color[0]*light;green+=a*b.color[1]*light;blue+=a*b.color[2]*light;
  }
  const at=(y*width+x)*4;data[at]=red/weight;data[at+1]=green/weight;data[at+2]=blue/weight;data[at+3]=255;
 }
}
function mount(host){
 const canvas=document.createElement('canvas');host.appendChild(canvas);const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return()=>{};
 const texture=document.createElement('canvas'),ink=texture.getContext('2d');let pixels;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let w=0,h=0,frame=0,last=0,time=0,offset=Math.max(0,scrollY),disposed=false;
 const fit=()=>{w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);const cell=Math.max(3,Math.sqrt(w*h/35000));texture.width=Math.ceil(w/cell);texture.height=Math.ceil(h/cell);pixels=ink.createImageData(texture.width,texture.height)};
 const render=()=>{ctx.fillStyle='#090807';ctx.fillRect(0,0,w,h);
  const items=[...balls(w,h,offset,time,true),...balls(w,h,offset,time,false)];
  const paths=contours(w,h,items,Math.max(5,Math.sqrt(w*h/21000)));
  const sx=texture.width/w,sy=texture.height/h;
  colorField(items.map(b=>({...b,x:b.x*sx,y:b.y*sy,r:b.r*sx})),texture.width,texture.height,pixels.data);ink.putImageData(pixels,0,0);
  ctx.save();trace(ctx,paths);ctx.clip('evenodd');ctx.imageSmoothingEnabled=true;ctx.drawImage(texture,0,0,w,h);ctx.restore();
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
const api={mount,balls,contours,colorField};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DLava=api;
})(typeof window!=='undefined'?window:this);
