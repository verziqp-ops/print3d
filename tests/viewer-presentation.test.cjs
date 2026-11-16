const {test}=require('node:test'),assert=require('node:assert/strict');const V=require('../viewer-presentation.js');
test('unselected previews are neutral and valid chosen filament color is preserved',()=>{
 for(const dark of [false,true]){assert.equal(V.selectedColor(null,dark),V.palette(dark).model);assert.notEqual(V.selectedColor(null,dark),'#ff8a1f');assert.equal(V.selectedColor('#ff8a1f',dark),'#ff8a1f');assert.equal(V.selectedColor('broken',dark),V.palette(dark).model)}
});
test('process counters clamp elapsed time without changing G-code timing',()=>{
 assert.deepEqual(V.progress(-10,100,0,20),{percent:0,remaining:2,layer:1,layers:20});assert.deepEqual(V.progress(150,100,30,20),{percent:100,remaining:0,layer:20,layers:20});assert.equal(V.progress(50,100,10,20).percent,50);
});
test('future outline is bounded for huge files and preserves scene coordinates',()=>{
 const layers=Array.from({length:500},(_,i)=>({s:Float32Array.from(Array.from({length:2400},(_,j)=>j%6===2||j%6===5?i*.2:j%6))}));const result=V.ghostPaths(layers,1,2,0);
 assert.ok(result.positions.length<=48*160*6);assert.equal(result.starts.length,501);assert.equal(result.positions[0],-1);assert.equal(result.positions[2],1);assert.equal(result.starts.at(-1),result.positions.length/3);for(let i=1;i<result.starts.length;i++)assert.ok(result.starts[i]>=result.starts[i-1]);
});
test('dimensions use real model values rather than invented product dimensions',()=>{assert.equal(V.dimensions({x:12.34,y:20,z:5},'uk'),'12,3 × 20 × 5 мм')});
