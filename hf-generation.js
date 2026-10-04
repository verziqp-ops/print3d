(function(root){'use strict';
const FLUX='https://black-forest-labs-flux-1-schnell.hf.space',SHAPE='https://tencent-hunyuan3d-2.hf.space';
const unwrap=x=>x?.__type__==='update'?x.value:x;
function fileURL(host,file,prefix=''){
 file=unwrap(file);if(!file||typeof file.path!=='string'||!file.path.startsWith('/tmp/gradio/')||file.path.includes('..'))throw Error('Сервіс повернув некоректний файл.');
 return host+prefix+'/file='+encodeURI(file.path);
}
function record(block){const lines=block.split('\n');return {event:lines.find(x=>x.startsWith('event:'))?.slice(6).trim(),data:lines.filter(x=>x.startsWith('data:')).map(x=>x.slice(5).trimStart()).join('\n')}}
async function call(host,prefix,api,data,signal){
 const url=host+prefix+'/call/'+api;
 const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data}),signal,credentials:'omit'});
 if(!response.ok)throw Error(response.status===429?'Безкоштовний ліміт вичерпано. Спробуй пізніше.':'Сервіс генерації недоступний ('+response.status+'). Спробуй пізніше.');
 const job=await response.json();if(!/^[a-zA-Z0-9_-]+$/.test(job.event_id||''))throw Error('Сервіс не повернув номер завдання.');
 const stream=await fetch(url+'/'+job.event_id,{signal,credentials:'omit'});
 if(!stream.ok||!stream.body)throw Error('Не вдалося отримати результат. Запит уже відправлено; автоматичного повтору немає.');
 const reader=stream.body.getReader(),decoder=new TextDecoder();let buffer='';
 try{while(true){const chunk=await reader.read();buffer+=decoder.decode(chunk.value||new Uint8Array(),{stream:!chunk.done}).replace(/\r/g,'');let end;
  while((end=buffer.indexOf('\n\n'))>=0){const item=record(buffer.slice(0,end));buffer=buffer.slice(end+2);
   if(item.event==='error'){let message='';try{const value=JSON.parse(item.data);message=typeof value==='string'?value:value?.error||''}catch(_){}throw Error(/quota|limit|duration/i.test(message)?'Безкоштовний ліміт Hugging Face вичерпано. Спробуй пізніше.':'Генерація не вдалася. Space міг вичерпати ліміт або бути перевантаженим. Спробуй пізніше.');}
   if(item.event==='complete'){const result=JSON.parse(item.data);if(!Array.isArray(result))throw Error('Некоректний результат генерації.');return result;}
  }
  if(chunk.done)throw Error('З’єднання перервалося. Запит уже відправлено; автоматичного повтору немає.');
 }}finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
}
async function generate(description,{signal,onProgress=()=>{}}={}){
 description=String(description||'').trim();if(description.length<3||description.length>1500)throw Error('Напиши опис від 3 до 1500 символів.');
 const controller=new AbortController(),abort=()=>controller.abort(signal?.reason);if(signal?.aborted)abort();signal?.addEventListener('abort',abort,{once:true});let timedOut=false;
 const timer=setTimeout(()=>{timedOut=true;controller.abort()},360000);
 try{
  onProgress('Створюю зображення за описом… очікую в черзі FLUX.');
  const prompt=description+'. Single sculpted toy creature lying flat on its belly, legs spread sideways, low profile, full body visible, three-quarter top view, plain white background, no text, no pedestal.';
  const image=unwrap((await call(FLUX,'/gradio_api','infer',[prompt,1234,true,768,768,4],controller.signal))[0]);
  const imageURL=fileURL(FLUX,image,'/gradio_api');
  onProgress('Будую 3D за зображенням… очікую в черзі Hunyuan3D.');
  const shape=await call(SHAPE,'','shape_generation',[null,{path:imageURL,meta:{_type:'gradio.FileData'}},null,null,null,null,20,5,1234,128,true,8000,true],controller.signal);
  const mesh=unwrap(shape[0]);fileURL(SHAPE,mesh);
  onProgress('Готую STL і зменшую кількість граней…');
  const exported=await call(SHAPE,'','on_export_click',[mesh,null,'stl',true,false,100000],controller.signal);
  const url=fileURL(SHAPE,exported[1]);onProgress('Завантажую модель у редактор…');
  const response=await fetch(url,{signal:controller.signal,credentials:'omit'});if(!response.ok)throw Error('STL недоступний. Спробуй пізніше.');
  const max=15*1024*1024;if(+response.headers.get('content-length')>max)throw Error('Модель перевищує 15 МБ.');
  const reader=response.body.getReader(),parts=[];let size=0;
  try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>max)throw Error('Модель перевищує 15 МБ.');parts.push(value)}}finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
  const buffer=new Uint8Array(size);let offset=0;for(const part of parts){buffer.set(part,offset);offset+=part.length}if(size<84)throw Error('Сервіс повернув порожню модель.');
  return {buffer:buffer.buffer,imageURL};
 }catch(e){if(timedOut)throw Error('Очікування перевищило 6 хвилин. Запит міг залишитися в черзі сервісу.');throw e}
 finally{clearTimeout(timer);signal?.removeEventListener('abort',abort)}
}
const api={generate};if(typeof module!=='undefined'&&module.exports)module.exports={...api,call,fileURL,record};else root.Print3DCloud3D=api;
})(typeof window!=='undefined'?window:globalThis);
