const {test}=require('node:test');
const assert=require('node:assert/strict');
const {call,fileURL,generate}=require('../hf-generation.js');
const original=global.fetch;
test('SSE split across chunks completes without resubmitting',async()=>{
 let calls=0;global.fetch=async()=>{calls++;return calls===1?Response.json({event_id:'abc123'}):new Response(new ReadableStream({start(c){for(const s of ['event: heartbeat\ndata: null\n\nevent: com','plete\ndata: ["result"]\n','\n'])c.enqueue(new TextEncoder().encode(s));c.close()}}))};
 try{assert.deepEqual(await call('https://example.test','','shape',[],undefined),['result']);assert.equal(calls,2)}finally{global.fetch=original}
});
test('Server errors and interrupted streams never resubmit',async()=>{
 for(const data of ['event: error\ndata: "quota exhausted"\n\n','event: heartbeat\ndata: null\n\n']){let calls=0;global.fetch=async()=>++calls===1?Response.json({event_id:'id'}):new Response(data);try{await assert.rejects(call('https://example.test','','shape',[]));assert.equal(calls,2)}finally{global.fetch=original}}
});
test('File URLs ignore server HTML and malformed relative URLs',()=>{
 assert.equal(fileURL('https://example.test',{__type__:'update',value:{path:'/tmp/gradio/abc/model.stl',url:'https://evil.test'}}),'https://example.test/file=/tmp/gradio/abc/model.stl');
 assert.throws(()=>fileURL('https://example.test',{path:'/tmp/gradio/../secret'}));
});
test('Full text-image-mesh-STL pipeline uses verified schemas',async()=>{
 const file=name=>({path:'/tmp/gradio/abc/'+name,meta:{_type:'gradio.FileData'}});let i=0;const stages=[];
 global.fetch=async(url,opts)=>{
  i++;if(opts?.method==='POST'){const data=JSON.parse(opts.body).data;if(url.endsWith('/infer'))assert.equal(data.length,6);if(url.endsWith('/shape_generation')){assert.equal(data.length,13);assert.match(data[1].path,/flux-1-schnell/)}if(url.endsWith('/on_export_click')){assert.equal(data[2],'stl');assert.equal(data[5],100000)}return Response.json({event_id:'job'})}
  if(url.includes('/file='))return new Response(new Uint8Array(100));
  const data=url.includes('/infer/')?[file('image.webp'),123]:url.includes('/shape_generation/')?[{__type__:'update',value:file('mesh.glb')},'<untrusted html>']:['<untrusted html>',{__type__:'update',value:file('model.stl')}];
  return new Response('event: complete\ndata: '+JSON.stringify(data)+'\n\n');
 };
 try{const result=await generate('Panda with a hat',{onProgress:x=>stages.push(x)});assert.equal(result.buffer.byteLength,100);assert.equal(i,7);assert.equal(stages.length,4)}finally{global.fetch=original}
});
