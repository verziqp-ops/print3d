(function(root){'use strict';
// Whole, individually placed forms. No image strips or repeated tile edges.
const sources=[{x:803,y:423,rx:218,ry:158},{x:1168,y:485,rx:116,ry:150},{x:615,y:231,rx:64,ry:68},{x:529,y:369,rx:49,ry:48},{x:838,y:121,rx:36,ry:36}];
function hash(n){return (Math.sin(n*127.1+311.7)*43758.5453)%1+.5}
function unit(n){const f=hash(n);return f-Math.floor(f)}
function layout(width,height){const out=[],gap=width<700?275:370;for(let row=0;row*gap+30<height;row++){for(let j=0;j<4;j++){const id=row*4+j,kind=j<2?(row+j)%3:3+(id%2),p=sources[kind],size=j<2?Math.min(width*.42,260+unit(id)*80):45+unit(id)*50,w=size,h=size*p.ry/p.rx;const x=j===0?12+unit(id+31)*width*.05:j===1?width-w-12-unit(id+29)*width*.04:width*(.38+unit(id+17)*.25)-w/2;const y=row*gap+24+unit(id+7)*(j<2?55:180);if(y+h+18>height)continue;out.push({id,kind,x:Math.max(12,x),y,w,h,angle:(unit(id+41)-.5)*34,duration:10+unit(id+99)*6,phase:-unit(id+44)*12,dx:6+unit(id+21)*5,dy:10+unit(id+22)*6})}}return out}
function outline(id){const points=Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2,r=102+24*Math.sin(a*(2+id%3)+id*.7)+12*Math.cos(a*3-id*.31);return [150+Math.cos(a)*r,150+Math.sin(a)*r]});let path=`M ${points[0].join(' ')}`;for(let i=0;i<24;i++){const a=points[(i+23)%24],b=points[i],c=points[(i+1)%24],d=points[(i+2)%24];path+=` C ${b[0]+(c[0]-a[0])/6} ${b[1]+(c[1]-a[1])/6} ${c[0]-(d[0]-b[0])/6} ${c[1]-(d[1]-b[1])/6} ${c.join(' ')}`}return path+' Z'}
const api={layout,sources,outline};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DBackdrop=api;
})(typeof window!=='undefined'?window:this);
