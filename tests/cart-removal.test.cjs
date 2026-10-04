const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('animated deletion finds the same variant after reorder and undo merges quantities',async()=>{
 const source=fs.readFileSync(require.resolve('../app.js'),'utf8'),first={pid:1,plastic:'PLA',color:'Чорний',title:'A',qty:2},second={pid:2,plastic:'PLA',color:'Білий',title:'B',qty:1};let finish,toast,animated=false,saves=0;
 const row={querySelectorAll:()=>[],getBoundingClientRect:()=>({height:80}),animate(){animated=true;return {finished:new Promise(r=>finish=r)}}};
 const context={cart:[first,second],tab:'cart',matchMedia:()=>({matches:false}),saveCart(){saves++},render:async()=>{},esc:x=>x,clearTimeout(){},setTimeout(){},document:{getElementById:()=>null,body:{appendChild(t){toast=t}},createElement(){const button={};return {setAttribute(){},querySelector:()=>button,remove(){this.removed=true}}}}};vm.createContext(context);vm.runInContext(source.slice(source.indexOf('const cartKey='),source.indexOf('const cartView=')),context);
 const removing=context.removeCartItem(0,{closest:()=>row});assert.ok(animated);assert.equal(context.cart.length,2);context.cart.reverse();finish();await removing;assert.deepEqual(context.cart,[second]);
 context.cart.push({...first,qty:3});toast.querySelector().onclick();assert.equal(context.cart.length,2);assert.equal(context.cart.find(x=>x.pid===1).qty,5);assert.ok(toast.removed);assert.equal(saves,2);
});
