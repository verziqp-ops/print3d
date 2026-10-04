(function(root){'use strict';
function indexed(positions){
 if(!positions||!positions.length||positions.length%9||positions.length>2700000)throw Error('Потрібна трикутна модель до 300 000 граней.');
 const vertices=[],indices=new Uint32Array(positions.length/3),map=new Map();
 for(let i=0;i<positions.length;i+=3){const x=positions[i],y=positions[i+1],z=positions[i+2];if(![x,y,z].every(Number.isFinite))throw Error('Модель містить некоректні координати.');const key=x+','+y+','+z;let j=map.get(key);if(j===undefined){j=vertices.length/3;map.set(key,j);vertices.push(x,y,z)}indices[i/3]=j}
 return {numProp:3,vertProperties:new Float32Array(vertices),triVerts:indices};
}
function transform(positions,matrix){if(matrix.length!==16||!matrix.every(Number.isFinite))throw Error('Некоректне положення різака.');const out=new Float32Array(positions.length);for(let i=0;i<positions.length;i+=3){const x=positions[i],y=positions[i+1],z=positions[i+2];out[i]=matrix[0]*x+matrix[4]*y+matrix[8]*z+matrix[12];out[i+1]=matrix[1]*x+matrix[5]*y+matrix[9]*z+matrix[13];out[i+2]=matrix[2]*x+matrix[6]*y+matrix[10]*z+matrix[14]}return out}
function bounds(p){const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<p.length;i+=3)for(let j=0;j<3;j++){min[j]=Math.min(min[j],p[i+j]);max[j]=Math.max(max[j],p[i+j])}return {min,max}}
function solid(M,p,label){const mesh=new M.Mesh(indexed(p));mesh.merge();let value;try{value=new M.Manifold(mesh);if(value.status()!=='NoError')throw Error(label+': модель має відкриті або некоректні поверхні. Виправ її у слайсері й завантаж знову.');return value}catch(e){value?.delete();throw Error(label+': модель має відкриті або некоректні поверхні. Виправ її у слайсері й завантаж знову.')}}
function cut(M,{base,cutter,matrices,floor=0}){
 if(!matrices||matrices.length>16||!Number.isFinite(floor)||floor<0||floor>10)throw Error('Некоректні параметри вирізання.');
 let body=solid(M,base,'Основна модель');const before=body.volume();let negatives=[],components=[];
 try{
  if(matrices.length){const template=solid(M,cutter,'Різак');try{for(const matrix of matrices){if(matrix.length!==16||!matrix.every(Number.isFinite))throw Error('Некоректне положення різака.');negatives.push(template.transform(matrix))}}finally{template.delete()}}
  if(floor>0){const b=bounds(base),span=b.max.map((n,i)=>n-b.min[i]),margin=Math.max(...span,10);const block=M.Manifold.cube([span[0]+2*margin,margin+floor,span[2]+2*margin]);try{negatives.push(block.translate([b.min[0]-margin,-margin,b.min[2]-margin]))}finally{block.delete()}}
  for(const negative of negatives){const next=body.subtract(negative);body.delete();body=next;if(body.status()!=='NoError')throw Error('Не вдалося побудувати замкнений результат.');}
  const volume=body.volume();if(body.isEmpty()||volume<=0)throw Error('Різаки прибрали всю модель. Зменш їх або зміни положення.');
  if(before-volume<=Math.max(before*1e-7,1e-6))throw Error('Різаки не перетинають модель. Перемісти їх усередину.');
  const mesh=body.getMesh(),positions=new Float32Array(mesh.triVerts.length*3);for(let i=0;i<mesh.triVerts.length;i++)for(let j=0;j<3;j++)positions[i*3+j]=mesh.vertProperties[mesh.triVerts[i]*mesh.numProp+j];
  const bottom=bounds(positions).min[1];for(let i=1;i<positions.length;i+=3)positions[i]-=bottom;
  components=body.decompose();return {positions,volume,parts:components.length,triangles:positions.length/9};
 }finally{components.forEach(x=>x.delete());negatives.forEach(x=>x.delete());body.delete()}
}
const api={indexed,transform,bounds,cut};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DFlexiCore=api;
})(typeof self!=='undefined'?self:globalThis);
