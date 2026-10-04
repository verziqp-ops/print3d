importScripts('flexi-core.js?v=20261004-flexi40');
const engine=import('https://cdn.jsdelivr.net/npm/manifold-3d@3.5.1/manifold.js').then(async({default:Module})=>{const M=await Module({locateFile:file=>'https://cdn.jsdelivr.net/npm/manifold-3d@3.5.1/'+file});M.setup();return M});
self.onmessage=async({data})=>{try{const M=await engine;const result=self.Print3DFlexiCore.cut(M,data);self.postMessage({ok:true,...result},[result.positions.buffer])}catch(e){self.postMessage({ok:false,error:e.message||'Не вдалося вирізати суглоби.'})}};
