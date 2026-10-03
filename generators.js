(function(root){'use strict';
const PRESETS={AA:{label:'AA — 50,5 × 14,5 мм',width:50.5,depth:14.5,height:6},AAA:{label:'AAA — 44,5 × 10,5 мм',width:44.5,depth:10.5,height:5},nano:{label:'Nano-SIM — 12,3 × 8,8 мм',width:12.4,depth:8.9,height:2.2},micro:{label:'Micro-SIM — 15 × 12 мм',width:15.1,depth:12.1,height:2.2},mini:{label:'Mini-SIM — 25 × 15 мм',width:25.1,depth:15.1,height:2.2}};
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
 const cells=[];let maxWidth=0,totalDepth=0;
 for(let start=0;start<p.items.length;start+=p.columns){let ox=0,rowDepth=0;const row=[];
 for(const type of p.items.slice(start,start+p.columns)){const s=PRESETS[type],w=s.width+2*p.clearance,d=s.depth+2*p.clearance;row.push({type,x:ox,y:totalDepth,w,d,outerW:w+2*p.wall,outerD:d+2*p.wall,height:Math.max(s.height,p.bottom+1)});ox+=w+2*p.wall;rowDepth=Math.max(rowDepth,d+2*p.wall)}
 cells.push(...row);maxWidth=Math.max(maxWidth,ox);totalDepth+=rowDepth;
 }
 const axis=values=>[...new Set(values.map(v=>+v.toFixed(7)))].sort((a,b)=>a-b),x=axis([0,maxWidth,...cells.flatMap(c=>[c.x,c.x+p.wall,c.x+p.wall+c.w,c.x+c.outerW,...(!['AA','AAA'].includes(c.type)?[c.x+p.wall+c.w*.35,c.x+p.wall+c.w*.65]:[])])]),y=axis([0,totalDepth,...cells.flatMap(c=>[c.y,c.y+p.wall,c.y+p.wall+c.d,c.y+c.outerD])]),z=axis([0,p.bottom,...cells.map(c=>c.height)]);
 const model=voxel(x,y,z,(x,y,z)=>{if(z<p.bottom)return true;return cells.some(c=>z<c.height&&x>c.x&&x<c.x+c.outerW&&y>c.y&&y<c.y+c.outerD&&!(x>c.x+p.wall&&x<c.x+p.wall+c.w&&y>c.y+p.wall&&y<c.y+p.wall+c.d)&&!(!['AA','AAA'].includes(c.type)&&y<c.y+p.wall&&x>c.x+p.wall+c.w*.35&&x<c.x+p.wall+c.w*.65))});
 return {...model,parameters:{width:maxWidth,depth:totalDepth,height:Math.max(...cells.map(c=>c.height))},cells};
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
