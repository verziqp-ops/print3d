(function(root){'use strict';
// Whole, individually placed forms. No image strips or repeated tile edges.
const sources=[{x:803,y:423,rx:218,ry:158},{x:1168,y:485,rx:116,ry:150},{x:615,y:231,rx:64,ry:68},{x:529,y:369,rx:49,ry:48},{x:838,y:121,rx:36,ry:36}];
function hash(n){return (Math.sin(n*127.1+311.7)*43758.5453)%1+.5}
function unit(n){const f=hash(n);return f-Math.floor(f)}
function layout(width,height){const out=[],gap=width<700?275:370;for(let row=0;row*gap+30<height;row++){for(let j=0;j<4;j++){const id=row*4+j,kind=j<2?(row+j)%3:3+(id%2),p=sources[kind],size=j<2?Math.min(width*.42,260+unit(id)*80):45+unit(id)*50,w=size,h=size*p.ry/p.rx;const x=j===0?12+unit(id+31)*width*.05:j===1?width-w-12-unit(id+29)*width*.04:width*(.38+unit(id+17)*.25)-w/2;const y=row*gap+24+unit(id+7)*(j<2?55:180);if(y+h+18>height)continue;out.push({id,kind,x:Math.max(12,x),y,w,h,angle:(unit(id+41)-.5)*34,duration:10+unit(id+99)*6,phase:-unit(id+44)*12,dx:6+unit(id+21)*5,dy:10+unit(id+22)*6})}}return out}
const api={layout,sources};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Print3DBackdrop=api;
})(typeof window!=='undefined'?window:this);
