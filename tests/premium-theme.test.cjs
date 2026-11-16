const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const script=fs.readFileSync(require.resolve('../premium-theme.js'),'utf8');
test('theme persists across reloads and does not replace form or cart DOM',()=>{
 const values=new Map(),document={documentElement:{dataset:{},style:{}}};
 const localStorage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
 const c=vm.createContext({document,localStorage,window:{}});vm.runInContext(script,c);
 assert.equal(c.window.Print3DTheme.isDark(),false);c.window.Print3DTheme.toggle();assert.equal(document.documentElement.dataset.theme,'dark');
 const next=vm.createContext({document:{documentElement:{dataset:{},style:{}}},localStorage,window:{}});vm.runInContext(script,next);assert.equal(next.window.Print3DTheme.isDark(),true);next.window.Print3DTheme.toggle();assert.equal(values.get('print3d:theme'),'light');
});
test('theme switching works when browser storage is unavailable',()=>{
 const c=vm.createContext({document:{documentElement:{dataset:{},style:{}}},localStorage:{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}},window:{}});vm.runInContext(script,c);c.window.Print3DTheme.toggle();assert.equal(c.window.Print3DTheme.isDark(),true);
});
test('header retains admin generators and every storefront action',()=>{
 const src=fs.readFileSync(require.resolve('../app.js'),'utf8');const c=vm.createContext({hdr:{innerHTML:'',querySelectorAll:()=>[]},lang:'uk',tab:'home',me:{is_admin:true},ic:x=>x,a:x=>x,cartN:()=>2,favs:new Set([1]),window:{Print3DTheme:{isDark:()=>false}}});
 vm.runInContext(src.slice(src.indexOf('function head(){'),src.indexOf('const card=p=>')),c);c.head();
 for(const action of ['generators','chat','fav','cart','prof'])assert.match(c.hdr.innerHTML,new RegExp('data-n="'+action+'"'));
 assert.match(c.hdr.innerHTML,/data-a="theme"/);assert.match(c.hdr.innerHTML,/aria-label="fav"/);
 c.me.is_admin=false;c.head();assert.doesNotMatch(c.hdr.innerHTML,/data-n="generators"/);
});
test('rapid theme switches commit one shared palette with color transitions blocked through paint',()=>{
 const classes=new Set(),frames=new Map();let frame=0,flushes=0;
 const root={dataset:{},style:{},classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)},get offsetHeight(){assert.ok(classes.has('theme-switching'));flushes++;return 800}};
 const c=vm.createContext({document:{documentElement:root},localStorage:{getItem:()=>null,setItem:()=>{}},window:{},requestAnimationFrame:fn=>{frames.set(++frame,fn);return frame},cancelAnimationFrame:id=>frames.delete(id)});
 vm.runInContext(script,c);c.window.Print3DTheme.toggle();c.window.Print3DTheme.toggle();c.window.Print3DTheme.toggle();
 assert.equal(root.dataset.theme,'dark');assert.equal(root.style.colorScheme,'dark');assert.equal(flushes,4);assert.equal(frames.size,1);
 let cb=[...frames.values()][0];frames.clear();cb();assert.ok(classes.has('theme-switching'));
 cb=[...frames.values()][0];frames.clear();cb();assert.equal(classes.has('theme-switching'),false);
});
