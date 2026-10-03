const {test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const context=vm.createContext({localStorage:{getItem:()=>null},Number,Math});
vm.runInContext(source.slice(source.indexOf('const CALC_FIELDS='),source.indexOf('async function admin(){')),context);
vm.runInContext('this.moneyUA=moneyUA;',context);
vm.runInContext(source.slice(source.indexOf('function canViewPrint('),source.indexOf('function orderItem(')),context);
vm.runInContext(source.slice(source.indexOf('function headerShouldHide('),source.indexOf('function updateHeaderScroll(')),context);
const inputs={tariff:4.32,watts:100,spoolGrams:1000,spoolPrice:600,hours:2,minutes:30,grams:50,markup:50};
test('actual material and kWh costs include both hours and minutes',()=>{
 const r=context.calculatePrintCost(inputs);assert.equal(r.plastic,30);assert.equal(r.energy,.25);assert.equal(r.electricity,1.08);assert.equal(context.moneyUA(r.cost),'31,08');assert.equal(context.moneyUA(r.price),'46,62');assert.equal(Math.ceil(r.price),47);
});
test('invalid inputs do not show misleading free or infinite print prices',()=>{
 for(const overrides of [{spoolGrams:0},{tariff:''},{hours:-1},{grams:-10},{markup:-1},{minutes:60},{hours:.5},{watts:Infinity}])assert.equal(context.calculatePrintCost({...inputs,...overrides}),null);
 assert.ok(context.calculatePrintCost({...inputs,tariff:0,markup:0}));
});
test('pending G-code stays hidden from clients but remains available to admins',()=>{
 assert.equal(context.canViewPrint({gcode:'file',status:'pending'}),false);assert.equal(context.canViewPrint({gcode:'file',status:'pending'},true),true);
 for(const status of ['printing','ready','shipping','delivered'])assert.equal(context.canViewPrint({gcode:'file',status}),true);
 assert.equal(context.canViewPrint({status:'printing'}),false);
});
test('home header hides down, reappears on slight upward scroll, stays visible elsewhere',()=>{
 assert.equal(context.headerShouldHide(true,200,20,20,false),true);assert.equal(context.headerShouldHide(true,190,-10,10,true),false);
 assert.equal(context.headerShouldHide(true,199,-1,1,true),true);assert.equal(context.headerShouldHide(true,40,30,30,true),false);assert.equal(context.headerShouldHide(false,300,30,30,true),false);
});
