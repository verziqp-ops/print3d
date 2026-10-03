const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const context=vm.createContext({});
vm.runInContext(source.slice(source.indexOf('function parseG('),source.indexOf('function gLayerGeometry(')),context);
const parse=txt=>context.parseG(txt);
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-4,`${actual} != ${expected}`);
test('Bambu metadata keeps accurate model time',()=>{
  const g=parse('; model printing time: 1h 2m 3s; total estimated time: 1h 4m 5s\nG90\nM83\nG1 Z.2\nG1 X10 E1 F600');
  assert.equal(g.T,3723);near(g.layers[0].t1,3723);
});
test('minute-only and total-time fallback metadata',()=>{
  assert.equal(parse('; total estimated time = 2m\nG1 X10 E1').T,120);
  assert.equal(parse('; model printing time = 2m 30s\nG1 X10 E1').T,150);
});
test('CW and CCW arcs retain endpoints and do not create long chords',()=>{
  for(const cmd of ['G2','G3']){
    const g=parse(`G90\nM83\nG1 X10 Z.2\n${cmd} X-10 Y0 I-10 J0 E2\nG1 X-9 E.1`),s=g.layers[0].s;
    assert.ok(s.length>100);
    near(s[s.length-6],-10);near(s[s.length-3],-9);
    for(let i=0;i<s.length-6;i+=6){assert.ok(Math.hypot(s[i+3]-s[i],s[i+4]-s[i+1])<1.6);if(i<s.length-12)near(Math.hypot(s[i+3],s[i+4]),10)}
    assert.ok(cmd==='G2'?s[4]<0:s[4]>0);
  }
});
test('closed arcs with omitted XY make a full circle',()=>{
  const s=parse('M83\nG1 X10 Z.2\nG3 I-10 J0 E4').layers[0].s;
  assert.ok(s.length>200);near(s.at(-3),10);near(s.at(-2),0);
});
test('radius arcs select minor and major curves',()=>{
  const minor=parse('M83\nG1 Z.2\nG3 X10 Y0 R10 E2').layers[0].s;
  const major=parse('M83\nG1 Z.2\nG3 X10 Y0 R-10 E2').layers[0].s;
  assert.ok(major.length>minor.length*3);near(major.at(-3),10);
});
test('G92 resets XYZ and E; absolute extrusion survives reset',()=>{
  const s=parse('M82\nG1 X10 Z.2 E1\nG92 X0 E0\nG1 X5 E.5').layers[0].s;
  near(s[6],0);near(s[9],5);assert.equal(s.length,12);
});
test('compact words, line numbers, relative motion and leading zero commands',()=>{
  const s=parse('N1 G01X10Z.2E1\nG91\nM83\nG01X5Y2E.5').layers[0].s;
  near(s.at(-3),15);near(s.at(-2),2);
});
test('travel, retractions and Z hops are not drawn or counted as extra layers',()=>{
  const g=parse('M83\nG1 Z.2\nG1 X10 E1\nG1 E-1\nG1 Z.6\nG0 X20\nG1 Z.2\nG1 E1\nG1 X30 E1\nG1 Z.4\nG1 X40 E1');
  assert.equal(g.layers.length,2);assert.equal(g.layers[0].s.length,12);near(g.layers[0].s[6],20);
});
test('Bambu layer markers exclude startup purge and custom G-code',()=>{
  const g=parse('M83\nG1 X200 Z.2 E2\n; CHANGE_LAYER\n; FEATURE: Outer wall\n; WIDTH: .42\n; HEIGHT: .16\nG1 X201 E.1\n; FEATURE: Custom\nG1 X250 E2');
  assert.equal(g.layers.length,1);assert.equal(g.layers[0].s.length,6);near(g.layers[0].w[0],.42);near(g.layers[0].h,.16);
});
test('non-extruding arcs still move the start of the next printed segment',()=>{
  const s=parse('M83\nG1 X10 Z.2\nG2 X-10 Y0 I-10 J0\nG1 X-9 E.1').layers[0].s;
  assert.equal(s.length,6);near(s[0],-10);
});
test('empty or travel-only files do not invent geometry',()=>{
  assert.equal(parse('G1 X10 Y20\nG1 Z1').layers.length,0);
});
test('segment animation is continuous and respects travel gaps',()=>{
  const g=parse('M83\nG1 Z.2 F600\nG1 X10 E1\nG0 X20\nG1 X30 E1'),L=g.layers[0];
  const mid=(L.ts[0]+L.t[0])/2,c=context.gSegmentAt(L,mid);
  assert.equal(c.index,0);near(c.fraction,.5);
  const gap=(L.t[0]+L.ts[1])/2;near(context.gSegmentAt(L,gap).fraction,0);
  const motion=context.gMotionAt(g.moves,gap);near(motion[0],15);
  near(context.gMotionAt(g.moves,g.T+100)[0],30);
});
test('scaled slicer timing applies equally to tool motion and deposited segments',()=>{
  const g=parse('; model printing time: 2m\nM83\nG1 Z.2 F600\nG1 X10 E1');
  near(g.moves.at(-1),120);near(g.layers[0].t[0],120);
  near(context.gMotionAt(g.moves, (g.layers[0].ts[0]+120)/2)[0],5);
});
