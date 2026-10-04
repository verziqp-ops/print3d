const {test}=require('node:test'),assert=require('node:assert/strict'),G=require('../generators.js'),{stl}=require('../organizer.js');
const tray={items:['AA','nano','AAA','micro','mini'],columns:3,clearance:.2,wall:1.2,bottom:1.2};
const vase={height:150,wall:1.6,bottom:2,twist:90,lobes:6,ribs:8,amplitude:.12,shape:'flower',profile:[{z:0,radius:35},{z:.5,radius:55},{z:1,radius:32}]};
function verify(m){const edges=new Map(),v=m.vertices,t=m.triangles;let volume=0;for(let i=0;i<t.length;i+=3){const ids=t.slice(i,i+3),[a,b,c]=ids.map(k=>k*3),u=[v[b]-v[a],v[b+1]-v[a+1],v[b+2]-v[a+2]],w=[v[c]-v[a],v[c+1]-v[a+1],v[c+2]-v[a+2]],cross=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];assert.ok(Math.hypot(...cross)>1e-9,'degenerate face');volume+=(v[a]*(v[b+1]*v[c+2]-v[b+2]*v[c+1])+v[a+1]*(v[b+2]*v[c]-v[b]*v[c+2])+v[a+2]*(v[b]*v[c+1]-v[b+1]*v[c]))/6;for(let j=0;j<3;j++){const a=ids[j],b=ids[(j+1)%3],k=[Math.min(a,b),Math.max(a,b)].join(','),e=edges.get(k)||[0,0];e[0]++;e[1]+=a<b?1:-1;edges.set(k,e)}}for(const e of edges.values()){assert.equal(e[0],2);assert.equal(e[1],0)}assert.ok(volume>0);const binary=stl(m);assert.equal(binary.byteLength,84+t.length/3*50)}
test('mixed trays and single calibration cells are closed printable solids',()=>{for(const columns of [1,2,3,6])verify(G.tray({...tray,columns}));verify(G.tray({...tray,items:['nano'],columns:1}))});
test('every cavity keeps preset maximum size plus clearance on each side',()=>{const m=G.tray(tray);for(const c of m.cells){const p=G.PRESETS[c.type];assert.ok(Math.abs(c.w-p.width-.4)<1e-8);assert.ok(Math.abs(c.d-p.depth-.4)<1e-8)}assert.equal(G.PRESETS.AA.height,50.5);assert.equal(G.PRESETS.AAA.depth,10.5)});
test('circle, flower, square and polygon vases have closed bottoms and open mouths',()=>{for(const shape of ['circle','flower','square','polygon'])verify(G.vase({...vase,shape}));const m=G.vase(vase);assert.equal(Math.max(...m.vertices.filter((_,i)=>i%3===2)),150)});
test('profile nodes, twist and ribs actually alter the exported mesh',()=>{const a=G.vase(vase),b=G.vase({...vase,twist:0,ribs:0});assert.notDeepEqual(a.vertices,b.vertices);verify(G.vase({...vase,profile:[{z:0,radius:25},{z:.3,radius:40},{z:.7,radius:30},{z:1,radius:20}]}))});
test('invalid preset geometry cannot create a broken STL',()=>{assert.throws(()=>G.tray({...tray,clearance:-.1}));assert.throws(()=>G.tray({...tray,items:['unknown']}));assert.throws(()=>G.vase({...vase,height:NaN}));assert.throws(()=>G.vase({...vase,profile:[{z:0,radius:35},{z:0,radius:32}]}))});

test('every battery and card preset exports manifold upright holders and fitting lids',()=>{for(const type of Object.keys(G.PRESETS)){const p={...tray,items:[type],columns:1,lid:true,lidClearance:.3,customWidth:19,customDepth:2,customHeight:70},m=G.tray(p);verify(m);verify(m.lid);assert.ok(m.lid.parameters.width>=m.parameters.width+2*.3+2*p.wall-1e-8);assert.ok(m.lid.parameters.height>=p.bottom+m.cells[0].itemHeight+.3+p.bottom-1e-8)}assert.equal(G.PRESETS.SD.depth,2.1);assert.equal(G.PRESETS.microSD.width,11)});
test('mixed full trays, optional lid and custom sizes remain printable',()=>{const types=Object.keys(G.PRESETS).filter(k=>!k.startsWith('custom')).slice(0,24);for(const columns of [1,3,6]){const m=G.tray({...tray,items:types,columns,lid:true});verify(m);verify(m.lid)}assert.equal(G.tray(tray).lid,undefined);assert.throws(()=>G.tray({...tray,items:['customRound'],customWidth:NaN}));assert.throws(()=>G.tray({...tray,lid:true,lidClearance:0}));});

test('mixed circular and thin card holders stay manifold across print tolerances',()=>{const keys=Object.keys(G.PRESETS).filter(k=>!k.startsWith('custom'));let seed=91;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};for(let i=0;i<12;i++){const items=Array.from({length:24},()=>keys[Math.floor(rnd()*keys.length)]);verify(G.tray({...tray,items,columns:1+i%6,clearance:.1+(i%4)*.2,wall:.8+(i%3)*.4,bottom:.8+(i%4)*.3}))}});

test('unified rounded body has a flat top, variable pocket floors and a cover clearing contents',()=>{const m=G.tray({...tray,items:['AA','AAA','microSD','LR44'],bodyHeight:18,lid:true});verify(m);verify(m.lid);assert.equal(m.parameters.height,18);assert.ok(m.cells.every(c=>c.height===18&&c.floor>=tray.bottom-1e-8));assert.ok(m.lid.parameters.height>=Math.max(...m.cells.map(c=>c.floor+c.itemHeight))+.25+tray.bottom-1e-8);const top=m.vertices.filter((_,i)=>i%3===2);assert.equal(Math.max(...top),18);assert.notDeepEqual(m.vertices,G.tray({...tray,items:['AA','AAA','microSD','LR44'],bodyHeight:10}).vertices);assert.throws(()=>G.tray({...tray,bodyHeight:NaN}));});

test('underside is open between pockets while each battery keeps a solid floor',()=>{const p={...tray,items:['AA','AA','AA','AA'],columns:3,bodyHeight:22},m=G.tray(p);verify(m);
 function surfaces(x,y){const v=m.vertices,t=m.triangles,z=[];for(let i=0;i<t.length;i+=3){const [a,b,c]=t.slice(i,i+3).map(k=>v.slice(k*3,k*3+3));if(Math.abs(a[2]-b[2])>1e-7||Math.abs(a[2]-c[2])>1e-7)continue;const area=(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);if(Math.abs(area)<1e-9)continue;const u=((x-a[0])*(c[1]-a[1])-(y-a[1])*(c[0]-a[0]))/area,w=((b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0]))/area;if(u>=-1e-7&&w>=-1e-7&&u+w<=1+1e-7)z.push(+a[2].toFixed(5))}return [...new Set(z)].sort((a,b)=>a-b)}
 assert.deepEqual(surfaces(m.parameters.width*.79,m.parameters.depth*.77),[22-p.wall,22]);const c=m.cells[0];assert.deepEqual(surfaces(c.x+c.outerW/2,c.y+c.outerD/2),[0,+c.floor.toFixed(5)]);
 for(const height of [6,35])for(const wall of [.8,3])verify(G.tray({...p,items:['AA','LR44','microSD'],bodyHeight:height,wall,bottom:2}));});

test('print orientation puts the upper panel on the bed and preserves outward closed surfaces',()=>{const m=G.tray({...tray,bodyHeight:22}),r=G.printTray(m);verify(r);assert.equal(Math.min(...r.vertices.filter((_,i)=>i%3===2)),0);assert.equal(Math.max(...r.vertices.filter((_,i)=>i%3===2)),22);assert.notDeepEqual(r.vertices,m.vertices);});

test('dragging tray walls preserves calibrated holes and exports matching manifold lids',()=>{
 const original=G.tray({...tray,lid:true});
 for(const [paddingX,paddingY] of [[.1,.1],[20,0],[0,35],[80,80]]){
  const m=G.tray({...tray,lid:true,paddingX,paddingY});verify(m);verify(m.lid);
  assert.ok(Math.abs(m.parameters.width-original.parameters.width-2*paddingX)<1e-7);
  assert.ok(Math.abs(m.parameters.depth-original.parameters.depth-2*paddingY)<1e-7);
  m.cells.forEach((cell,i)=>{const old=original.cells[i];assert.equal(cell.w,old.w);assert.equal(cell.d,old.d);assert.ok(Math.abs(cell.x-old.x-paddingX)<1e-7);assert.ok(Math.abs(cell.y-old.y-paddingY)<1e-7)});
 }
 assert.throws(()=>G.tray({...tray,paddingX:-1}));assert.throws(()=>G.tray({...tray,paddingY:NaN}));
});
test('individual pocket translation rotation and scaling are exported into manifold STL',()=>{
 const p={...tray,items:['AA','nano','AAA'],paddingX:25,paddingY:25,lid:true},original=G.tray(p),transforms=[{dx:-12,dy:7},{dy:-15,rotation:45,scaleX:1.2,scaleY:1.1}];
 const m=G.tray({...p,transforms});verify(m);verify(m.lid);assert.ok(Math.abs(m.cells[0].cx-original.cells[0].cx+12)<1e-7);assert.ok(Math.abs(m.cells[0].cy-original.cells[0].cy-7)<1e-7);assert.equal(m.cells[0].w,original.cells[0].w);assert.equal(m.cells[1].rotation,45);assert.equal(m.cells[1].w,original.cells[1].w*1.2);assert.equal(m.cells[2].cx,original.cells[2].cx);assert.equal(m.parameters.width,original.parameters.width);
 assert.throws(()=>G.tray({...p,transforms:[{dx:500}]}));assert.throws(()=>G.tray({...p,transforms:[{dx:original.cells[1].cx-original.cells[0].cx}]}));assert.throws(()=>G.tray({...p,transforms:[{scaleX:3}]}));
});
