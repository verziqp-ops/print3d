(function(root){'use strict';
// All positions and lighting share one viewport coordinate system.
const SPEC=[[-.07,.06,510,1,.28],[.69,-.1,610,1,.3],[1.04,.22,330,1,.24],[-.08,.75,430,1,.28],[.67,1.12,430,1,.27],[1.05,1,370,1,.26],[.035,.38,155,0,.12],[.96,.63,135,0,.1],[.32,.94,145,0,.08],[.48,.07,44,0,.03],[.22,.26,84,1,.14],[.74,.41,64,1,.1],[.16,.8,52,1,.08],[.57,.82,70,1,.12],[.84,.11,45,0,.03],[.48,.48,240,1,.26],[.06,.05,64,0,.05],[.91,.89,48,0,.04]];
function layout(width,height){const scale=Math.min(1,width/1100);return SPEC.map(([x,y,d,orange,amount],i)=>({x:x*width,y:y*height,r:d*scale/2,orange,amount,seed:i*1.73,amplitude:(d>200?55:34)*Math.max(.55,scale)}))}
function sample(node,time,reduced=false){if(reduced)return {x:node.x,y:node.y};return {x:node.x+Math.sin(time*.42+node.seed)*node.amplitude,y:node.y+Math.cos(time*.36+node.seed*.7)*node.amplitude*.8}}
function lightAt(width,height,time){return {x:width*(.5+.3*Math.sin(time*.26)),y:height*(.23+.18*Math.cos(time*.31))}}
// Canvas keeps the same fluid silhouette and common lamp when WebGL is unavailable.
function contour(node,angle,time){return 1+node.amount*(.65*Math.sin(angle*3+node.seed+time*.32)+.35*Math.sin(angle*2-node.seed-time*.23))}
function mountCanvas(host){
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');if(!ctx)return;canvas.id='bubble-scene';canvas.setAttribute('aria-hidden','true');host.appendChild(canvas);host.classList.add('webgl-ready');canvas.dataset.renderer='canvas';
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let w=1,h=1,scale=1,nodes=[],frame=0,last=0,t=0,dead=false,pointer={x:0,y:0,at:-Infinity},lamp={x:0,y:0},pulse=null;
 const move=e=>{pointer={x:e.clientX,y:e.clientY,at:performance.now()}};const press=e=>{move(e);pulse={x:e.clientX,y:e.clientY,t}};
 function draw(dt){ctx.clearRect(0,0,w,h);const target=performance.now()-pointer.at<1800?pointer:lightAt(w,h,t),ease=dt?1-Math.exp(-dt*3):1;lamp.x+=(target.x-lamp.x)*ease;lamp.y+=(target.y-lamp.y)*ease;
 const spot=host.querySelector('#bg-spot');if(spot){spot.style.transition='none';spot.style.transform=`translate3d(${lamp.x}px,${lamp.y}px,0)`}
 for(const n of nodes){const p=sample(n,t,reduced.matches);if(pulse&&!reduced.matches){const age=t-pulse.t,dx=p.x-pulse.x,dy=p.y-pulse.y,d=Math.hypot(dx,dy);if(age<2&&d>1){const f=Math.sin(age*Math.PI)*Math.exp(-age*2)*Math.max(0,1-d/500)*65;p.x+=dx/d*f;p.y+=dy/d*f}}
 const dx=lamp.x-p.x,dy=lamp.y-p.y,d=Math.hypot(dx,dy),k=.54/Math.sqrt(1+(d/Math.max(w,h))**2),hx=p.x+dx/Math.max(1,d)*n.r*k,hy=p.y+dy/Math.max(1,d)*n.r*k;
 ctx.save();ctx.beginPath();for(let j=0;j<=100;j++){const a=j/100*Math.PI*2,r=n.r*contour(n,a,t);const x=p.x+Math.cos(a)*r,y=p.y+Math.sin(a)*r;j?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();
 ctx.shadowColor=n.orange?'rgba(255,92,0,.22)':'rgba(0,0,0,.65)';ctx.shadowBlur=n.orange?35:20;ctx.shadowOffsetY=12;
 const base=ctx.createRadialGradient(hx,hy,n.r*.025,p.x,p.y,n.r*1.3);const colors=n.orange?['#ffcf83','#ff9b29','#ef6407','#7a2304','#27140e']:['#726664','#373033','#171518','#09090b','#030305'];[0,.18,.47,.78,1].forEach((v,i)=>base.addColorStop(v,colors[i]));ctx.fillStyle=base;ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.clip();
 const gloss=ctx.createRadialGradient(hx,hy,0,hx,hy,n.r*.6);gloss.addColorStop(0,n.orange?'rgba(255,245,212,.75)':'rgba(255,240,225,.48)');gloss.addColorStop(.18,'rgba(255,229,207,.18)');gloss.addColorStop(1,'rgba(255,210,190,0)');ctx.fillStyle=gloss;ctx.fillRect(p.x-n.r*1.4,p.y-n.r*1.4,n.r*2.8,n.r*2.8);ctx.restore();}
 canvas.dataset.frame=String(Math.round(t*30));}
 const resize=()=>{w=Math.max(1,host.clientWidth);h=Math.max(1,host.clientHeight);scale=Math.min(devicePixelRatio||1,1.35);canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);ctx.setTransform(scale,0,0,scale,0,0);nodes=layout(w,h);lamp=lightAt(w,h,t);draw(0)};
 function loop(now){frame=0;if(dead||document.hidden||reduced.matches)return;if(!last||now-last>=32){const dt=last?Math.min(.06,(now-last)/1000):0;last=now;t+=dt;draw(dt)}frame=requestAnimationFrame(loop)}
 const restart=()=>{if(dead)return;cancelAnimationFrame(frame);last=0;if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(loop);else draw(0)};
 const cleanup=e=>{if(e.persisted){cancelAnimationFrame(frame);return}dead=true;cancelAnimationFrame(frame);window.removeEventListener('resize',resize);window.removeEventListener('pageshow',restart);window.removeEventListener('pagehide',cleanup);document.removeEventListener('visibilitychange',restart);document.removeEventListener('pointermove',move);document.removeEventListener('pointerdown',press);reduced.removeEventListener('change',restart);canvas.remove()};
 window.addEventListener('resize',resize,{passive:true});window.addEventListener('pagehide',cleanup);window.addEventListener('pageshow',restart);document.addEventListener('visibilitychange',restart);document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerdown',press,{passive:true});reduced.addEventListener('change',restart);resize();restart();
}
const shaderHead=`uniform float bgTime;uniform float bgSeed;uniform float bgAmount;
vec4 bgField(vec3 n){float a=n.x*2.4+bgTime*.35+bgSeed;float b=n.y*2.8-bgTime*.27+bgSeed*.6;float c=n.z*2.2+bgTime*.2;
float f=sin(a)*sin(b)*cos(c);vec3 g=bgAmount*vec3(2.4*cos(a)*sin(b)*cos(c),2.8*sin(a)*cos(b)*cos(c),-2.2*sin(a)*sin(b)*sin(c));return vec4(g,1.0+bgAmount*f);}
`;
let mounted=false;
async function mount(host){if(mounted||!host)return;mounted=true;let renderer=null,frame=0,dead=false,dispose=null;
 try{const T=await import('https://cdn.jsdelivr.net/npm/three@0.160.0/+esm');if(!host.isConnected)return;
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-1,1,1,-1,.1,5000);camera.position.z=1800;
 renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.35));renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const canvas=renderer.domElement;canvas.id='bubble-scene';canvas.setAttribute('aria-hidden','true');host.appendChild(canvas);
 const geometry=new T.SphereGeometry(1,40,28),timeUniform={value:0},nodes=[];
 const lamp=new T.PointLight(0xffe6c9,1,0,2);scene.add(lamp);scene.add(new T.AmbientLight(0xffffff,.62));
 for(let i=0;i<SPEC.length;i++){const orange=SPEC[i][3],material=new T.MeshPhysicalMaterial({color:orange?0xff7208:0x181619,roughness:orange?.3:.24,metalness:orange?.06:.2,clearcoat:1,clearcoatRoughness:.16,emissive:orange?0x371000:0x000000,emissiveIntensity:.15});
 material.onBeforeCompile=shader=>{shader.uniforms.bgTime=timeUniform;shader.uniforms.bgSeed={value:i*1.73};shader.uniforms.bgAmount={value:SPEC[i][4]};shader.vertexShader=shaderHead+shader.vertexShader;
 shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>',`#include <beginnormal_vertex>
 vec3 bgN=normalize(position);vec4 bgF=bgField(bgN);vec3 bgTangent=bgF.xyz-bgN*dot(bgN,bgF.xyz);objectNormal=normalize(bgN-bgTangent/bgF.w);`);
 shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','vec3 transformed=position*bgF.w;');};material.customProgramCacheKey=()=> 'print3d-fluid-v1';
 const mesh=new T.Mesh(geometry,material);mesh.frustumCulled=false;scene.add(mesh);nodes.push({mesh,offsetX:0,offsetY:0})}
 let width=1,height=1,positions=[],elapsed=0,last=0,lastPaint=0,pointer={x:0,y:0,at:-Infinity},light={x:0,y:0},impulse=null;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),spot=host.querySelector('#bg-spot');
 const resize=()=>{width=Math.max(1,host.clientWidth);height=Math.max(1,host.clientHeight);positions=layout(width,height);camera.left=-width/2;camera.right=width/2;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix();renderer.setSize(width,height);light={x:width*.5,y:height*.2};const distance=Math.max(width,height)*.65;lamp.position.z=distance;lamp.intensity=distance*distance*2.8;nodes.forEach((n,i)=>n.mesh.scale.setScalar(positions[i].r));draw(0);};
 const move=e=>{pointer={x:e.clientX,y:e.clientY,at:performance.now()};};
 const press=e=>{move(e);if(!reduced.matches)impulse={x:e.clientX,y:e.clientY,at:elapsed}};
 document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerdown',press,{passive:true});
 function draw(dt){timeUniform.value=elapsed;const desired=performance.now()-pointer.at<1800?pointer:lightAt(width,height,elapsed);const ease=dt?1-Math.exp(-dt*3):1;light.x+=(desired.x-light.x)*ease;light.y+=(desired.y-light.y)*ease;lamp.position.x=light.x-width/2;lamp.position.y=height/2-light.y;
 if(spot){spot.style.transform=`translate3d(${light.x}px,${light.y}px,0)`;spot.style.transition='none'}
 nodes.forEach((n,i)=>{const p=sample(positions[i],elapsed,reduced.matches);let tx=0,ty=0;if(!reduced.matches&&performance.now()-pointer.at<900){const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy),reach=positions[i].r+110;if(d<reach&&d>1){const force=(1-d/reach)*30;tx=dx/d*force;ty=dy/d*force}}
 if(impulse&&!reduced.matches){const age=elapsed-impulse.at,dx=p.x-impulse.x,dy=p.y-impulse.y,d=Math.hypot(dx,dy);if(age<2&&d>1){const force=Math.sin(age*Math.PI)*Math.exp(-age*2)*Math.max(0,1-d/500)*65;tx+=dx/d*force;ty+=dy/d*force}}
 n.offsetX+=(tx-n.offsetX)*(dt?1-Math.exp(-dt*5):1);n.offsetY+=(ty-n.offsetY)*(dt?1-Math.exp(-dt*5):1);n.mesh.position.set(p.x+n.offsetX-width/2,height/2-p.y-n.offsetY,(i%4)*12-60);});renderer.render(scene,camera)}
 function loop(now){frame=0;if(dead||document.hidden||reduced.matches)return;if(now-lastPaint>=32){const dt=last?Math.min(.05,(now-last)/1000):0;last=now;lastPaint=now;elapsed+=dt;draw(dt)}frame=requestAnimationFrame(loop)}
 const restart=()=>{cancelAnimationFrame(frame);frame=0;last=0;if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(loop);else draw(0)};
 window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
 const cleanup=()=>{if(dead)return;dead=true;cancelAnimationFrame(frame);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',restart);reduced.removeEventListener('change',restart);document.removeEventListener('pointermove',move);document.removeEventListener('pointerdown',press);nodes.forEach(n=>n.mesh.material.dispose());geometry.dispose();renderer.dispose();canvas.remove();host.classList.remove('webgl-ready')};
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cleanup();mountCanvas(host)},{once:true});dispose=cleanup;window.addEventListener('pagehide',e=>{if(e.persisted){cancelAnimationFrame(frame);frame=0}else cleanup()});window.addEventListener('pageshow',restart);
 resize();if(renderer.info.programs?.some(p=>p.diagnostics?.runnable===false))throw Error('Background shader failed');host.classList.add('webgl-ready');restart();
 }catch(error){if(dispose)dispose();else{dead=true;cancelAnimationFrame(frame);if(renderer){renderer.domElement.remove();renderer.dispose()}}host.classList.remove('webgl-ready');mountCanvas(host)}
}
const api={mount,layout,sample,lightAt,contour};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DBackground=api;
})(typeof window!=='undefined'?window:this);
