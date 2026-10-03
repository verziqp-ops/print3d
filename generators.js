(function(root){'use strict';
// Maximum envelope for standard cells; Li-ion names are nominal bare-cell sizes.
const round=(label,diameter,height)=>({label,width:diameter,depth:diameter,height,round:true});
const slot=(label,width,depth,height)=>({label,width,depth,height});
const PRESETS={
 AA:round('AA / HR6',14.5,50.5),AAA:round('AAA / HR03',10.5,44.5),AAAA:round('AAAA',8.3,42.5),C:round('C / LR14',26.2,50),D:round('D / LR20',34.2,61.5),
 '9V':slot('9V / Крона',26.5,17.5,48.5),A23:round('A23 / 23A',10.3,28.5),A27:round('A27 / 27A',8,28.2),CR123A:round('CR123A',17,34.5),CR2:round('CR2',15.6,27),
 '10440':round('10440 · без захисту',10,44),'14500':round('14500 · без захисту',14,50),'16340':round('16340 · без захисту',16,34),'18350':round('18350 · без захисту',18,35),'18500':round('18500 · без захисту',18,50),'18650':round('18650 · без захисту',18.6,65.2),'21700':round('21700 · без захисту',21.2,70.5),'26650':round('26650 · без захисту',26.5,65.5),
 CR2032:slot('CR2032 · вертикально',20,3.2,20),CR2025:slot('CR2025 · вертикально',20,2.5,20),CR2016:slot('CR2016 · вертикально',20,1.6,20),CR2450:slot('CR2450 · вертикально',24.5,5,24.5),LR44:round('LR44 / AG13',11.6,5.4),
 SD:slot('SD / SDHC / SDXC',24,2.1,32),microSD:slot('microSD / microSDHC / microSDXC',11,1,15),miniSD:slot('miniSD',20,1.4,21.5),
 nano:slot('Nano-SIM',8.9,.7,12.4),micro:slot('Micro-SIM',12.1,.8,15.1),mini:slot('Mini-SIM',15.1,.8,25.1),
 customRound:round('Свій розмір · кругла батарейка',18,65),customSlot:slot('Свій розмір · карта / батарейка',24,2,32)
};
const earcut=typeof module!=='undefined'&&module.exports?require('./earcut.js'):root.earcut;
function voxel(x,y,z,solid){
 const vertices=[],triangles=[],ids=new Map(),nx=x.length-1,ny=y.length-1,nz=z.length-1,cells=new Uint8Array(nx*ny*nz);
 const key=(i,j,k)=>(i*ny+j)*nz+k;
 for(let i=0;i<nx;i++)for(let j=0;j<ny;j++)for(let k=0;k<nz;k++)cells[key(i,j,k)]=solid((x[i]+x[i+1])/2,(y[j]+y[j+1])/2,(z[k]+z[k+1])/2)?1:0;
 const occupied=(i,j,k)=>i>=0&&j>=0&&k>=0&&i<nx&&j<ny&&k<nz&&cells[key(i,j,k)];
 const vertex=q=>{const key=q.join(',');if(!ids.has(key)){ids.set(key,vertices.length/3);vertices.push(x[q[0]],y[q[1]],z[q[2]])}return ids.get(key)};
 const face=q=>{const v=q.map(vertex);triangles.push(v[0],v[1],v[2],v[0],v[2],v[3])};
 for(let i=0;i<nx;i++)for(let j=0;j<ny;j++)for(let k=0;k<nz;k++)if(occupied(i,j,k)){
 if(!occupied(i-1,j,k))face([[i,j,k],[i,j,k+1],[i,j+1,k+1],[i,j+1,k]]);
 if(!occupied(i+1,j,k))face([[i+1,j,k],[i+1,j+1,k],[i+1,j+1,k+1],[i+1,j,k+1]]);
 if(!occupied(i,j-1,k))face([[i,j,k],[i+1,j,k],[i+1,j,k+1],[i,j,k+1]]);
 if(!occupied(i,j+1,k))face([[i,j+1,k],[i,j+1,k+1],[i+1,j+1,k+1],[i+1,j+1,k]]);
 if(!occupied(i,j,k-1))face([[i,j,k],[i,j+1,k],[i+1,j+1,k],[i+1,j,k]]);
 if(!occupied(i,j,k+1))face([[i,j,k+1],[i+1,j,k+1],[i+1,j+1,k+1],[i,j+1,k+1]]);
 }return {vertices,triangles};
}
function tray(p){
 if(!Array.isArray(p.items)||p.items.length<1||p.items.length>24||p.items.some(k=>!PRESETS[k]))throw Error('Додай від 1 до 24 комірок.');
 if(!Number.isInteger(p.columns)||p.columns<1||p.columns>6||!Number.isFinite(p.clearance)||p.clearance<.05||p.clearance>1||!Number.isFinite(p.wall)||p.wall<.8||p.wall>3||!Number.isFinite(p.bottom)||p.bottom<.8||p.bottom>2)throw Error('Перевір зазор, товщину та кількість колонок.');
 const specs=p.items.map(type=>{const s={...PRESETS[type]};if(type.startsWith('custom')){s.width=+p.customWidth;s.depth=s.round?s.width:+p.customDepth;s.height=+p.customHeight;if([s.width,s.depth,s.height].some(v=>!Number.isFinite(v)||v<.5||v>150))throw Error('Власні розміри: від 0,5 до 150 мм.')}return s});
 const cells=[];let width=0,depth=0;
 for(let start=0;start<p.items.length;start+=p.columns){let ox=0,rowDepth=0;
 for(let i=start;i<Math.min(start+p.columns,p.items.length);i++){const s=specs[i],w=s.width+2*p.clearance,d=s.depth+2*p.clearance,outerW=w+2*p.wall+2,outerD=d+2*p.wall+2;
 cells.push({type:p.items[i],x:ox,y:depth,w,d,outerW,outerD,round:s.round,height:p.bottom+Math.min(s.height*.45,22),itemHeight:s.height});ox+=outerW;rowDepth=Math.max(rowDepth,outerD)}width=Math.max(width,ox);depth+=rowDepth;
 }
 const vertices=[],triangles=[],ids=new Map();
 const vertex=(x,y,z)=>{const q=[x,y,z].map(v=>+v.toFixed(7)),key=q.join(',');if(!ids.has(key)){ids.set(key,vertices.length/3);vertices.push(...q)}return ids.get(key)};
 const tri=(a,b,c)=>triangles.push(a,b,c),quad=(a,b,c,d)=>{tri(a,b,c);tri(a,c,d)};
 const rectangle=(x,y,w,d)=>[[x,y],[x+w,y],[x+w,y+d],[x,y+d]];
 const circle=(x,y,r)=>Array.from({length:64},(_,i)=>[x+r*Math.cos(i*Math.PI/32),y+r*Math.sin(i*Math.PI/32)]);
 const outer=rectangle(0,0,width,depth),loops=cells.map(c=>{const cx=c.x+c.outerW/2,cy=c.y+c.outerD/2;
 const r=c.w/2/Math.cos(Math.PI/64);return {outer:c.round?circle(cx,cy,r+p.wall):rectangle(cx-c.w/2-p.wall,cy-c.d/2-p.wall,c.w+2*p.wall,c.d+2*p.wall),inner:c.round?circle(cx,cy,r):rectangle(cx-c.w/2,cy-c.d/2,c.w,c.d)};});
 const flat=outer.flat(),holes=[];for(const l of loops){holes.push(flat.length/2);flat.push(...l.outer.flat())}const faces=earcut(flat,holes,2),top=[];for(let i=0;i<flat.length;i+=2)top.push(vertex(flat[i],flat[i+1],p.bottom));// Earcut can bridge collinear holes with a long edge; split at every boundary vertex.
 const planar=(a,b,c)=>{if(Math.abs((vertices[b*3]-vertices[a*3])*(vertices[c*3+1]-vertices[a*3+1])-(vertices[b*3+1]-vertices[a*3+1])*(vertices[c*3]-vertices[a*3]))<1e-9)return;const q=[a,b,c];for(let j=0;j<3;j++){const u=q[j],v=q[(j+1)%3],apex=q[(j+2)%3],dx=vertices[v*3]-vertices[u*3],dy=vertices[v*3+1]-vertices[u*3+1],len=dx*dx+dy*dy;
 const mids=top.filter(k=>k!==u&&k!==v).map(k=>({k,t:((vertices[k*3]-vertices[u*3])*dx+(vertices[k*3+1]-vertices[u*3+1])*dy)/len,cross:(vertices[k*3]-vertices[u*3])*dy-(vertices[k*3+1]-vertices[u*3+1])*dx})).filter(q=>q.t>1e-7&&q.t<1-1e-7&&Math.abs(q.cross)<1e-6).sort((a,b)=>a.t-b.t);
 if(mids.length){const chain=[u,...mids.map(q=>q.k),v];for(let i=0;i<chain.length-1;i++)planar(chain[i],chain[i+1],apex);return}}tri(a,b,c)};
 for(let i=0;i<faces.length;i+=3)planar(top[faces[i]],top[faces[i+1]],top[faces[i+2]]);
 const b=outer.map(q=>vertex(...q,0)),t=outer.map(q=>vertex(...q,p.bottom));tri(b[0],b[2],b[1]);tri(b[0],b[3],b[2]);for(let i=0;i<4;i++){const j=(i+1)%4;quad(b[i],b[j],t[j],t[i])}
 loops.forEach((l,k)=>{const h=cells[k].height,ob=l.outer.map(q=>vertex(...q,p.bottom)),ot=l.outer.map(q=>vertex(...q,h)),ib=l.inner.map(q=>vertex(...q,p.bottom)),it=l.inner.map(q=>vertex(...q,h));
 const floor=earcut(l.inner.flat(),null,2);for(let i=0;i<floor.length;i+=3)tri(ib[floor[i]],ib[floor[i+1]],ib[floor[i+2]]);
 for(let i=0;i<ob.length;i++){const j=(i+1)%ob.length;quad(ob[i],ob[j],ot[j],ot[i]);quad(ib[i],it[i],it[j],ib[j]);quad(ot[i],ot[j],it[j],it[i])}});
 const model={vertices,triangles,parameters:{width,depth,height:Math.max(...cells.map(c=>c.height))},cells};
 if(p.lid){const gap=p.lidClearance??.25;if(!Number.isFinite(gap)||gap<.1||gap>1)throw Error('Зазор кришки: 0,1–1 мм на бік.');
 const w=width+2*gap+2*p.wall,d=depth+2*gap+2*p.wall,h=p.bottom+Math.max(...cells.map(c=>c.itemHeight))+gap+p.bottom;
 model.lid={...voxel([0,p.wall,w-p.wall,w],[0,p.wall,d-p.wall,d],[0,p.bottom,h],(x,y,z)=>z<p.bottom||x<p.wall||x>w-p.wall||y<p.wall||y>d-p.wall),parameters:{width:w,depth:d,height:h},clearance:gap};
 }return model;
}
function vase(p){
 if(!Number.isFinite(p.height)||p.height<20||p.height>400||!Number.isFinite(p.wall)||p.wall<.8||p.wall>4||!Number.isFinite(p.bottom)||p.bottom<.8||p.bottom>5||p.bottom>=p.height||!Number.isFinite(p.twist)||Math.abs(p.twist)>360||!Number.isInteger(p.lobes)||p.lobes<3||p.lobes>24||!Number.isInteger(p.ribs)||p.ribs<0||p.ribs>96||!Number.isFinite(p.amplitude)||p.amplitude<0||p.amplitude>.28)throw Error('Перевір параметри вази.');
 if(!['circle','flower','square','polygon'].includes(p.shape)||!Array.isArray(p.profile)||p.profile.length<2||p.profile.length>12)throw Error('Перевір профіль вази.');
 const profile=p.profile.map(q=>({...q})).sort((a,b)=>a.z-b.z);if(profile[0].z!==0||profile.at(-1).z!==1||profile.some((q,i)=>!Number.isFinite(q.z)||!Number.isFinite(q.radius)||q.radius<8||q.radius>120||q.z<0||q.z>1||(i&&q.z-profile[i-1].z<.02)))throw Error('Вузли профілю мають бути розділені; радіус — 8–120 мм.');
 const radius=u=>{let i=0;while(i<profile.length-2&&profile[i+1].z<u)i++;const a=profile[i],b=profile[i+1],v=Math.max(0,Math.min(1,(u-a.z)/(b.z-a.z)));return a.radius+(b.radius-a.radius)*(v*v*(3-2*v))};
 const count=192,levels=[...new Set([0,p.bottom/p.height,...Array.from({length:81},(_,i)=>i/80),...profile.map(q=>q.z)])].sort((a,b)=>a-b),vertices=[],triangles=[],outer=[],inner=[];
 function surfaceRadius(u,theta){let factor=1;
 if(p.shape==='flower')factor=1+p.amplitude*Math.cos(p.lobes*theta);
 if(p.shape==='square')factor=1/Math.max(Math.abs(Math.cos(theta)),Math.abs(Math.sin(theta)));
 if(p.shape==='polygon'){const sector=2*Math.PI/p.lobes,angle=((theta+sector/2)%sector+sector)%sector-sector/2;factor=Math.cos(Math.PI/p.lobes)/Math.cos(angle)}
 return radius(u)*factor+(p.ribs?p.amplitude*radius(u)*.25*(1+Math.cos(p.ribs*theta)):0);
 }
 function ring(u,inward){const indices=[];for(let j=0;j<count;j++){const theta=j/count*Math.PI*2,rotation=p.twist*Math.PI/180*u;let r=surfaceRadius(u,theta);
 if(inward){const eps=.0001,dt=(surfaceRadius(u,theta+eps)-surfaceRadius(u,theta-eps))/(2*eps),a=Math.max(0,u-eps),b=Math.min(1,u+eps),du=(surfaceRadius(b,theta)-surfaceRadius(a,theta))/(b-a),gradient=(du-dt*p.twist*Math.PI/180)/p.height;
 r-=p.wall*Math.sqrt(1+(dt/r)**2+gradient**2)}
 if(r<2)throw Error('Візерунок надто щільний: зменш ребра, закручування чи виразність, або збільш радіус.');indices.push(vertices.length/3);vertices.push(r*Math.cos(theta+rotation),r*Math.sin(theta+rotation),u*p.height)}return indices}
 for(const u of levels)outer.push(ring(u,false));const insideLevels=levels.filter(u=>u>=p.bottom/p.height);for(const u of insideLevels)inner.push(ring(u,true));
 const quad=(a,b,c,d)=>triangles.push(a,b,c,a,c,d);
 for(let i=0;i<outer.length-1;i++)for(let j=0;j<count;j++){const k=(j+1)%count;quad(outer[i][j],outer[i][k],outer[i+1][k],outer[i+1][j])}
 for(let i=0;i<inner.length-1;i++)for(let j=0;j<count;j++){const k=(j+1)%count;quad(inner[i][j],inner[i+1][j],inner[i+1][k],inner[i][k])}
 const bottom=vertices.length/3;vertices.push(0,0,0);const floor=vertices.length/3;vertices.push(0,0,p.bottom);
 for(let j=0;j<count;j++){const k=(j+1)%count;triangles.push(bottom,outer[0][k],outer[0][j],floor,inner[0][j],inner[0][k]);quad(outer.at(-1)[j],outer.at(-1)[k],inner.at(-1)[k],inner.at(-1)[j])}
 const xs=vertices.filter((_,i)=>i%3===0),ys=vertices.filter((_,i)=>i%3===1);return {vertices,triangles,parameters:{width:Math.max(...xs)-Math.min(...xs),depth:Math.max(...ys)-Math.min(...ys),height:p.height},centered:true};
}
const api={PRESETS,tray,vase};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DGenerators=api;
})(typeof window!=='undefined'?window:this);
