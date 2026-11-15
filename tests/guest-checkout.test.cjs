const {test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
test('guest catalog loading never queries profiles or favorites',async()=>{
 const queried=[];const sb={from(name){queried.push(name);return {select(){return this},order(){return Promise.resolve({data:[]})}}}};
 const c=vm.createContext({sb,user:null,Promise});vm.runInContext('let me,D,favs;'+source.slice(source.indexOf('async function load(){'),source.indexOf('async function up(')),c);
 await c.load();assert.deepEqual(queried,['colors','plastics','products','categories']);
});
test('guest order and cart submissions stop at authentication without inserting',async()=>{
 for(const [action,destination] of [['send','order'],['checkout','cart']]){
  const requests=[];const c=vm.createContext({user:null,requestAuth:t=>requests.push(t)});
  vm.runInContext(source.slice(source.indexOf('async function onClick(e){'),source.indexOf('async function onChange(e){')),c);
  await c.onClick({target:{closest:()=>({tagName:'BUTTON',dataset:{a:action}})}});assert.deepEqual(requests,[destination]);
 }
});
test('public navigation remains open while account and chat require authentication',async()=>{
 const calls=[];const c=vm.createContext({user:null,me:{},closeModal(){},render:async()=>calls.push('render'),scrollTo(){},requestAuth:t=>calls.push(t)});
 vm.runInContext(source.slice(source.indexOf('const go=async'),source.indexOf('async function onClick('))+'this.go=go;',c);
 await c.go('home');await c.go('cart');await c.go('prof');await c.go('chat');assert.deepEqual(calls,['render','render','prof','chat']);
});
