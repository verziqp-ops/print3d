const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('touch drag follows projected axes, restores orbit controls and disposes safely',()=>{
 class Element{constructor(){this.children=[];this.style={};this.classList={add(){},remove(){}};this.small={};this.attrs={}}appendChild(b){this.children.push(b)}setAttribute(k,v){this.attrs[k]=v}querySelector(){return this.small}setPointerCapture(id){this.capture=id}hasPointerCapture(id){return this.capture===id}releasePointerCapture(){this.capture=null}remove(){this.removed=true}}
 class Vector3{constructor(x,y,z){Object.assign(this,{x,y,z})}clone(){return new Vector3(this.x,this.y,this.z)}add(v){this.x+=v.x;this.y+=v.y;this.z+=v.z;return this}project(){const x=this.x,y=this.y,z=this.z;this.x=(x-z*.6)/200;this.y=(y+z*.4)/200;this.z=0;return this}}
 const document={createElement:()=>new Element(),head:new Element()},window={};vm.runInNewContext(fs.readFileSync(require.resolve('../drag-handles.js'),'utf8'),{document,window});
 const host=new Element();host.clientWidth=400;host.clientHeight=400;const p={width:100,depth:60,height:30},controls={enabled:true},handle=window.Print3DWallHandles.mount({T:{Vector3},host,camera:{updateMatrixWorld(){}},controls,getDimensions:()=>p,onResize:(key,value)=>p[key]=value});handle.update();const [width,depth,height]=host.children[0].children,event=(x,y)=>({pointerId:2,button:0,clientX:x,clientY:y,preventDefault(){},stopPropagation(){}});
 width.onpointerdown(event(100,100));assert.equal(controls.enabled,false);width.onpointermove(event(110,100));assert.ok(Math.abs(p.width-120)<1e-7);width.onpointerup(event(110,100));assert.equal(controls.enabled,true);
 depth.onpointerdown(event(100,100));depth.onpointermove(event(94,96));assert.ok(Math.abs(p.depth-80)<1e-7);depth.onpointercancel(event(94,96));assert.equal(controls.enabled,true);
 height.onkeydown({key:'ArrowUp',shiftKey:true,preventDefault(){}});assert.equal(p.height,40);
 width.onpointerdown(event(100,100));handle.dispose();assert.equal(controls.enabled,true);assert.equal(host.children[0].removed,true);
});
