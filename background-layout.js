(function(root){'use strict';
// Whole, individually placed forms. No image strips or repeated tile edges.
const sources=[{x:803,y:423,rx:218,ry:158},{x:1168,y:485,rx:116,ry:150},{x:615,y:231,rx:64,ry:68},{x:529,y:369,rx:49,ry:48},{x:838,y:121,rx:36,ry:36}];
function unit(n){let x=(Math.trunc(n)+0x9e3779b9)|0;x=Math.imul(x^(x>>>16),0x21f0aaad);x=Math.imul(x^(x>>>15),0x735a2d97);return ((x^(x>>>15))>>>0)/4294967296}
function layout(width,height){const placed=[],out=[],spacing=width<700?56:38;
 for(let id=0;id<Math.ceil(height/spacing)+7;id++){const kind=Math.min(4,Math.floor(unit(id+81)*5)),p=sources[kind],large=unit(id+63)>.67;
 const size=Math.min(width*.42,(large?180:48)+unit(id+13)*(large?170:105)),w=size,h=size*p.ry/p.rx;
 let chosen=null;for(let attempt=0;attempt<10;attempt++){const x=16+unit(id*13+attempt*19+31)*Math.max(0,width-w-32),y=Math.max(24,id*spacing+unit(id+attempt*11+7)*130-50);
 const cx=x+w/2,cy=y+h/2;
 // Uneven spacing without stacking every shape into regular rows.
 if(placed.some(q=>Math.hypot((cx-q.x-q.w/2)/((w+q.w)*.52),(cy-q.y-q.h/2)/((h+q.h)*.52))<.87))continue;
 chosen={id,kind,x,y,w,h,angle:(unit(id+41)-.5)*90,duration:10+unit(id+99)*6,phase:-unit(id+44)*12,dx:6+unit(id+21)*5,dy:10+unit(id+22)*6};break}
 if(!chosen)continue;placed.push(chosen);if(chosen.y+chosen.h+18<height)out.push(chosen);
 }return out}
function outline(id){const points=Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2,r=102+24*Math.sin(a*(2+id%3)+id*.7)+12*Math.cos(a*3-id*.31);return [150+Math.cos(a)*r,150+Math.sin(a)*r]});let path=`M ${points[0].join(' ')}`;for(let i=0;i<24;i++){const a=points[(i+23)%24],b=points[i],c=points[(i+1)%24],d=points[(i+2)%24];path+=` C ${b[0]+(c[0]-a[0])/6} ${b[1]+(c[1]-a[1])/6} ${c[0]-(d[0]-b[0])/6} ${c[1]-(d[1]-b[1])/6} ${c.join(' ')}`}return path+' Z'}
const api={layout,sources,outline};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DBackdrop=api;
})(typeof window!=='undefined'?window:this);
