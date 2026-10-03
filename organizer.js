(function(root){
'use strict';
function build(p){
  const names=['width','depth','height','wall','bottom','columns','rows'];
  if(names.some(k=>!Number.isFinite(p[k])))throw Error('Заповни всі розміри числами.');
  if(p.width<10||p.depth<10||p.height<5||p.width>1000||p.depth>1000||p.height>1000)throw Error('Розміри: ширина й глибина 10–1000 мм, висота 5–1000 мм.');
  if(p.wall<.8||p.bottom<.8||p.bottom>=p.height)throw Error('Стінки та дно — від 0,8 мм; дно має бути нижчим за органайзер.');
  if(!Number.isInteger(p.columns)||!Number.isInteger(p.rows)||p.columns<1||p.rows<1||p.columns>12||p.rows>12)throw Error('Кількість рядів і колонок — цілі числа від 1 до 12.');
  const cw=(p.width-(p.columns+1)*p.wall)/p.columns,cd=(p.depth-(p.rows+1)*p.wall)/p.rows;
  if(cw<5||cd<5)throw Error('Відділення замалі: збільш розміри або зменш кількість відділень / товщину стінок.');
  const axis=(size,n)=>{const gap=(size-(n+1)*p.wall)/n,a=[0];for(let i=0;i<n;i++){a.push(a.at(-1)+p.wall);a.push(a.at(-1)+gap)}a.push(size);return a};
  const x=axis(p.width,p.columns),y=axis(p.depth,p.rows),z=[0,p.bottom,p.height],vertices=[],triangles=[],ids=new Map(),nx=x.length-1,ny=y.length-1;
  const solid=(i,j,k)=>i>=0&&j>=0&&k>=0&&i<nx&&j<ny&&k<2&&(k===0||i%2===0||j%2===0);
  const vertex=q=>{const key=q.join(',');if(!ids.has(key)){ids.set(key,vertices.length/3);vertices.push(x[q[0]],y[q[1]],z[q[2]])}return ids.get(key)};
  const face=q=>{const v=q.map(vertex);triangles.push(v[0],v[1],v[2],v[0],v[2],v[3])};
  // Only exposed faces of a shared coordinate grid: no overlapping internal walls.
  for(let i=0;i<nx;i++)for(let j=0;j<ny;j++)for(let k=0;k<2;k++)if(solid(i,j,k)){
    if(!solid(i-1,j,k))face([[i,j,k],[i,j,k+1],[i,j+1,k+1],[i,j+1,k]]);
    if(!solid(i+1,j,k))face([[i+1,j,k],[i+1,j+1,k],[i+1,j+1,k+1],[i+1,j,k+1]]);
    if(!solid(i,j-1,k))face([[i,j,k],[i+1,j,k],[i+1,j,k+1],[i,j,k+1]]);
    if(!solid(i,j+1,k))face([[i,j+1,k],[i,j+1,k+1],[i+1,j+1,k+1],[i+1,j+1,k]]);
    if(!solid(i,j,k-1))face([[i,j,k],[i,j+1,k],[i+1,j+1,k],[i+1,j,k]]);
    if(!solid(i,j,k+1))face([[i,j,k+1],[i+1,j,k+1],[i+1,j+1,k+1],[i,j+1,k+1]]);
  }
  return {vertices,triangles,cellWidth:cw,cellDepth:cd,volume:p.width*p.depth*p.height-p.columns*p.rows*cw*cd*(p.height-p.bottom),parameters:{...p}};
}
function stl(model){
  const {vertices:v,triangles:t}=model,n=t.length/3,buffer=new ArrayBuffer(84+n*50),data=new DataView(buffer);data.setUint32(80,n,true);
  for(let i=0;i<n;i++){
    const a=t[i*3]*3,b=t[i*3+1]*3,c=t[i*3+2]*3,ux=v[b]-v[a],uy=v[b+1]-v[a+1],uz=v[b+2]-v[a+2],vx=v[c]-v[a],vy=v[c+1]-v[a+1],vz=v[c+2]-v[a+2];
    const normal=[uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx],len=Math.hypot(...normal);let offset=84+i*50;
    for(const value of normal){data.setFloat32(offset,value/len,true);offset+=4}
    for(const index of [a,b,c])for(let j=0;j<3;j++){data.setFloat32(offset,v[index+j],true);offset+=4}
  }
  return buffer;
}
const api={build,stl};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DOrganizer=api;
})(typeof window!=='undefined'?window:this);
