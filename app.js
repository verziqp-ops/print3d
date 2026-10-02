(()=>{
const S={cat:["Каталог","Каталог"],chat:["Чат","Чат"],prof:["Профіль","Профиль"],adm:["Адмінка","Админка"],
order:["Замовити друк","Заказать печать"],orderThis:["Замовити","Заказать"],empty:["Поки порожньо","Пока пусто"],
name:["Назва деталі","Название детали"],note:["Опис (за бажанням)","Описание (по желанию)"],
photo:["Фото (за можливості)","Фото (по возможности)"],file:["Файл / креслення (за можливості)","Файл / чертёж (по возможности)"],
plastic:["Тип пластику","Тип пластика"],color:["Колір","Цвет"],send:["Відправити","Отправить"],
soon:["Чат з'явиться незабаром","Чат появится скоро"],orders:["Замовлення","Заказы"],info:["Профіль","Профиль"],
phone:["Телефон","Телефон"],save:["Зберегти","Сохранить"],theme:["Тема","Тема"],sys:["Системна","Системная"],
light:["Світла","Светлая"],dark:["Темна","Тёмная"],out:["Вийти","Выйти"],need:["Введіть назву деталі","Введите название детали"],
sent:["Замовлення відправлено","Заказ отправлен"],pending:["Очікує","Ожидает"],printing:["Друкується","Печатается"],
ready:["Готове","Готово"],shipping:["Доставляється","Доставляется"],delivered:["Доставлено","Доставлено"],
client:["Клієнт","Клиент"],all:["Усі","Все"],gcode:["Додати G-код","Добавить G-код"],add:["Додати","Добавить"],
del:["Видалити","Удалить"],stock:["В наявності","В наличии"],prods:["Товари","Товары"],colors:["Кольори","Цвета"],
plastics:["Пластик","Пластик"],title:["Назва","Название"],descr:["Опис","Описание"],err:["Помилка, спробуйте ще раз","Ошибка, попробуйте ещё раз"]};
const a=k=>(S[k]||[k,k])[lang==="ru"?1:0];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ST=["pending","printing","ready","shipping","delivered"];
const STC={pending:"#8a8a8a",printing:"#e86a0c",ready:"#2e9e57",shipping:"#3a7bd5",delivered:"#6a4fc2"};
const P={cat:'<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
prof:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
adm:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
let me={},D={},tab="cat",sub="info",asub="orders",sel={},root,view,nav;

const css=document.createElement("style");
css.textContent=`
:root[data-theme=light]{--bg:#fbf4ea;--bg2:#fde6cc;--text:#2b2118;--muted:#7a6a5a;--card:rgba(255,250,242,.75);--line:rgba(120,80,40,.18);--field:#fffdf9;--accent:#e86a0c;--blob:rgba(255,150,60,.35)}
:root[data-theme=dark]{--bg:#15110d;--bg2:#26180d;--text:#f3e9dc;--muted:#a99886;--card:rgba(34,28,22,.78);--line:rgba(255,200,150,.14);--field:#1c1712;--accent:#ff8c2e;--blob:rgba(255,120,30,.28)}
#app{width:100%;padding-bottom:96px}
#app .card2{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:18px;margin-bottom:12px;backdrop-filter:blur(12px)}
#app h2{margin:0 0 12px;font-size:20px}
#app textarea,#app select,#app input[type=text],#app input[type=color]{width:100%;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--field);color:var(--text);font:16px inherit;outline:0}
#app textarea{min-height:70px;resize:vertical}
#app input[type=file]{font-size:13px;max-width:100%}
#app input[type=color]{padding:2px;height:44px}
#app .grid{display:grid;gap:12px;margin-top:12px}
#app .pc img,#app .oi img{width:100%;max-height:170px;object-fit:cover;border-radius:14px;margin-bottom:8px}
#app p{margin:4px 0}.mut{color:var(--muted);font-size:13px}.lb{font-size:12px;color:var(--muted);margin:10px 0 6px 4px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:flex;align-items:center;gap:6px;border:1px solid var(--line);background:var(--field);color:var(--text);padding:8px 14px;border-radius:999px;font:600 14px inherit;cursor:pointer;transition:.25s cubic-bezier(.34,1.56,.64,1)}
.chip.on{background:var(--accent);border-color:var(--accent);color:#2a1303;transform:scale(1.06)}
.chip i{width:14px;height:14px;border-radius:50%;border:1px solid var(--line);display:block}
.tabs{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.badge{display:inline-block;color:#fff;font:700 12px inherit;padding:3px 10px;border-radius:999px}
.av{width:84px;height:84px;border-radius:50%;background:var(--field);border:2px solid var(--accent);display:grid;place-items:center;overflow:hidden;margin:0 auto 8px;cursor:pointer;font:700 28px inherit;color:var(--accent)}
.av img{width:100%;height:100%;object-fit:cover}
.rw{display:flex;gap:8px;align-items:center;margin:8px 0}.rw>*{min-width:0}
#nav{position:fixed;left:50%;transform:translateX(-50%);bottom:max(12px,env(safe-area-inset-bottom));width:min(396px,calc(100% - 24px));display:flex;justify-content:space-around;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:6px;backdrop-filter:blur(18px) saturate(1.4);-webkit-backdrop-filter:blur(18px) saturate(1.4);z-index:5;box-shadow:0 10px 30px -10px rgba(0,0,0,.35)}
#nav button{flex:1;border:0;background:none;color:var(--muted);display:flex;flex-direction:column;align-items:center;gap:2px;font:600 11px inherit;padding:7px 4px;border-radius:999px;cursor:pointer;transition:.25s}
#nav button svg{width:22px;height:22px}#nav button.on{color:#2a1303;background:var(--accent)}
.btn,.chip,#nav button,.seg button,.fp,.card2,.lang button{transition:transform .5s cubic-bezier(.34,1.56,.64,1),background .3s,border-color .3s,box-shadow .3s,color .3s}
@media (hover:hover){.btn:hover,.chip:hover,.fp:hover,.seg button:hover{transform:scale(1.05)}#nav button:hover{transform:scale(1.12)}.card2.pc:hover,.card2.oi:hover{transform:translateY(-3px) scale(1.01)}}
.btn:active,.chip:active,.fp:active,.seg button:active,#nav button:active{transform:scale(.92)!important;transition-duration:.12s}
#view>*{animation:rise .55s cubic-bezier(.2,.9,.3,1) both}
#view>*:nth-child(2){animation-delay:.06s}#view>*:nth-child(3){animation-delay:.12s}#view>*:nth-child(4){animation-delay:.18s}
.seg{display:flex;gap:4px;background:var(--field);border:1px solid var(--line);border-radius:999px;padding:4px}
.seg button{flex:1;border:0;background:none;color:var(--muted);font:600 14px inherit;padding:10px 6px;border-radius:999px;cursor:pointer}
.seg button.on{background:var(--accent);color:#2a1303;box-shadow:0 6px 16px -6px rgba(240,110,20,.7)}
.fp{display:flex;align-items:center;gap:10px;padding:13px 14px;margin-bottom:10px;border:1.5px dashed var(--line);border-radius:16px;background:var(--field);color:var(--muted);cursor:pointer;font-size:14px;overflow:hidden}
.fp svg{width:20px;height:20px;flex:none;color:var(--accent)}
.fp span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fp.has{border-style:solid;border-color:var(--accent);color:var(--text)}
#app select{-webkit-appearance:none;appearance:none;padding-right:40px;background:var(--field) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a99886' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center/16px}
@media (prefers-reduced-motion:reduce){#view>*{animation:none}}`;
document.head.appendChild(css);
const th=localStorage.getItem("theme");if(th)document.documentElement.dataset.theme=th;

async function load(){
  const [p,c,pl,pr]=await Promise.all([sb.from("profiles").select("*").eq("id",user.id).single(),
    sb.from("colors").select("*").order("id"),sb.from("plastics").select("*").order("id"),
    sb.from("products").select("*").order("id",{ascending:false})]);
  me=p.data||{};D={colors:c.data||[],plastics:pl.data||[],products:pr.data||[]};
}
async function up(f,dir){
  const n=`${dir}/${crypto.randomUUID()}-${f.name.replace(/[^\w.]/g,"_")}`;
  const {error}=await sb.storage.from("uploads").upload(n,f);if(error)throw error;
  return sb.storage.from("uploads").getPublicUrl(n).data.publicUrl;
}
const fp=(id,txt,acc)=>`<label class="fp" data-x="${esc(txt)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg><span>${esc(txt)}</span><input type="file" id="${id}" ${acc?`accept="${acc}"`:""} data-c="fp" hidden></label>`;
const badge=s=>`<span class="badge" style="background:${STC[s]||"#888"}">${a(s)}</span>`;
const tabs=(list,cur,key)=>`<div class="tabs">${list.map(([k,t])=>`<button class="chip ${k===cur?"on":""}" data-a="${key}" data-n="${k}">${t}</button>`).join("")}</div>`;

function orderItem(o,adm,names){
  return `<div class="card2 oi">${o.image?`<img src="${esc(o.image)}">`:""}<b>${esc(o.title)}</b> ${badge(o.status)}
  ${adm?`<p class="mut">${a("client")}: ${esc(names[o.user_id]||"")}</p>`:""}
  <p class="mut">${esc(o.plastic||"")} ${esc(o.color||"")} · ${new Date(o.created_at).toLocaleDateString()}</p>
  ${o.descr?`<p>${esc(o.descr)}</p>`:""}
  ${o.file?`<p><a class="link" href="${esc(o.file)}" target="_blank">📎 файл</a></p>`:""}
  ${adm?`<div class="rw"><select data-c="st" data-id="${o.id}">${ST.map(s=>`<option value="${s}" ${s===o.status?"selected":""}>${a(s)}</option>`).join("")}</select></div>
  <div class="rw"><label class="btn sm ghost" style="cursor:pointer">${a("gcode")}<input type="file" data-c="gc" data-id="${o.id}" hidden></label>${o.gcode?`<a class="link" href="${esc(o.gcode)}" target="_blank">G-code</a>`:""}
  <button class="link" data-a="delo" data-id="${o.id}">${a("del")}</button></div>`:""}</div>`;
}
function orderForm(p){
  sel={plastic:null,color:null,pid:p?p.id:null};
  return `<div class="card2"><h2>${a("order")}</h2>
  <label class="f"><span>${a("name")}</span><input type="text" id="o-t" value="${esc(p?p.title:"")}"></label>
  <label class="f"><span>${a("note")}</span><textarea id="o-d"></textarea></label>
  ${fp("o-i",a("photo"),"image/*")}${fp("o-f",a("file"))}
  <div class="lb">${a("plastic")}</div><div class="chips">${D.plastics.map(x=>`<button class="chip" data-a="pl" data-n="${esc(x.name)}">${esc(x.name)}</button>`).join("")}</div><p class="mut" id="pdesc"></p>
  <div class="lb">${a("color")}</div><div class="chips">${D.colors.filter(c=>c.in_stock).map(c=>`<button class="chip" data-a="co" data-n="${esc(c.name)}"><i style="background:${esc(c.hex)}"></i>${esc(c.name)}</button>`).join("")}</div>
  <p class="err" id="o-e"></p><button class="btn" data-a="send">${a("send")}</button></div>`;
}
const catalog=()=>`<button class="btn" data-a="new">${a("order")}</button><div class="grid">${D.products.map(p=>`<div class="card2 pc">${p.image?`<img src="${esc(p.image)}">`:""}<b>${esc(p.title)}</b><p>${esc(p.descr)}</p><button class="btn sm ghost" data-a="new" data-id="${p.id}">${a("orderThis")}</button></div>`).join("")||`<p class="mut">${a("empty")}</p>`}</div>`;

async function profile(){
  let h=tabs([["info",a("info")],["orders",a("orders")]],sub,"sub");
  if(sub==="orders"){
    const {data}=await sb.from("orders").select("*").eq("user_id",user.id).order("id",{ascending:false});
    return h+((data||[]).map(o=>orderItem(o)).join("")||`<p class="mut">${a("empty")}</p>`);
  }
  const ini=(me.first_name||user.email||"?")[0].toUpperCase();
  return h+`<div class="card2"><label class="av">${me.avatar?`<img src="${esc(me.avatar)}">`:ini}<input type="file" accept="image/*" data-c="av" hidden></label>
  <h2 style="text-align:center">${esc(((me.first_name||"")+" "+(me.last_name||"")).trim())}</h2><p class="mut" style="text-align:center">${esc(user.email)}</p>
  <div class="lb">${a("phone")}</div><div class="rw"><input type="text" id="ph" inputmode="tel" value="${esc(me.phone||"")}"><button class="btn sm" data-a="phone">${a("save")}</button></div>
  <div class="lb">${a("theme")}</div><div class="seg">${[["",a("sys")],["light",a("light")],["dark",a("dark")]].map(([v,t])=>`<button data-a="th" data-n="${v}" class="${(localStorage.getItem("theme")||"")===v?"on":""}">${t}</button>`).join("")}</div>
  <div style="height:12px"></div><button class="btn ghost" data-a="out">${a("out")}</button></div>`;
}
async function admin(){
  let h=tabs([["orders",a("orders")],["prods",a("prods")],["colors",a("colors")],["plastics",a("plastics")]],asub,"asub");
  if(asub==="orders"){
    const [o,p]=await Promise.all([sb.from("orders").select("*").order("id",{ascending:false}),sb.from("profiles").select("id,first_name,last_name")]);
    const names={};(p.data||[]).forEach(x=>names[x.id]=((x.first_name||"")+" "+(x.last_name||"")).trim());
    const f=sel.cl||"";
    return h+`<select data-c="cl"><option value="">${a("client")}: ${a("all")}</option>${Object.entries(names).map(([i,n])=>`<option value="${i}" ${i===f?"selected":""}>${esc(n)}</option>`).join("")}</select>`+
      ((o.data||[]).filter(x=>!f||x.user_id===f).map(x=>orderItem(x,true,names)).join("")||`<p class="mut">${a("empty")}</p>`);
  }
  if(asub==="prods")return h+`<div class="card2"><label class="f"><span>${a("title")}</span><input type="text" id="n1"></label><label class="f"><span>${a("descr")}</span><textarea id="n2"></textarea></label>${fp("n3",a("photo"),"image/*")}<button class="btn" data-a="addp">${a("add")}</button></div>`+
    D.products.map(p=>`<div class="card2 rw"><b style="flex:1">${esc(p.title)}</b><button class="link" data-a="delp" data-id="${p.id}">${a("del")}</button></div>`).join("");
  if(asub==="colors")return h+`<div class="card2"><div class="rw"><input type="text" id="n1" placeholder="${a("title")}"><input type="color" id="n2" value="#e86a0c" style="width:70px"></div><button class="btn" data-a="addc">${a("add")}</button></div>`+
    D.colors.map(c=>`<div class="card2 rw"><i class="chip" style="padding:0;width:22px;height:22px;background:${esc(c.hex)}"></i><b style="flex:1">${esc(c.name)}</b><button class="chip ${c.in_stock?"on":""}" data-a="stock" data-id="${c.id}">${a("stock")}</button><button class="link" data-a="delc" data-id="${c.id}">${a("del")}</button></div>`).join("");
  return h+`<div class="card2"><label class="f"><span>${a("title")}</span><input type="text" id="n1" placeholder="PLA"></label><label class="f"><span>${a("descr")}</span><textarea id="n2"></textarea></label><button class="btn" data-a="addpl">${a("add")}</button></div>`+
    D.plastics.map(x=>`<div class="card2"><div class="rw"><b style="flex:1">${esc(x.name)}</b><button class="link" data-a="delpl" data-id="${x.id}">${a("del")}</button></div><p class="mut">${esc(x.descr)}</p></div>`).join("");
}

async function render(){
  const items=[["cat",a("cat")],["chat",a("chat")],["prof",a("prof")]];if(me.is_admin)items.push(["adm",a("adm")]);
  nav.innerHTML=items.map(([k,t])=>`<button data-a="tab" data-n="${k}" class="${k===tab||(tab==="order"&&k==="cat")?"on":""}">${ic(k)}${t}</button>`).join("");
  let h="";
  try{
    if(tab==="cat")h=catalog();
    else if(tab==="order")h=orderForm(D.products.find(p=>p.id==sel.open));
    else if(tab==="chat")h=`<div class="card2"><p class="mut">${a("soon")}</p></div>`;
    else if(tab==="prof")h=await profile();
    else h=await admin();
  }catch(e){h=`<p class="err">${a("err")}</p>`}
  view.innerHTML=h;
  const th=localStorage.getItem("theme")||"";const s=view.querySelector('[data-c=th]');if(s)s.value=th;
}
const go=async(t)=>{tab=t;await render();scrollTo(0,0)};
const refresh=async()=>{await load();await render()};
const val=id=>(document.getElementById(id)||{}).value||"";
const fil=id=>{const f=document.getElementById(id);return f&&f.files[0]};
const run=async fn=>{try{await fn()}catch(e){console.error(e);alert(a("err"))}};

async function onClick(e){
  const b=e.target.closest("[data-a]");if(!b||b.tagName==="SELECT"||b.type==="file")return;
  const k=b.dataset.a,id=b.dataset.id,n=b.dataset.n;
  if(k==="tab")return go(n);
  if(k==="sub"){sub=n;return render()}
  if(k==="asub"){asub=n;return render()}
  if(k==="new"){sel.open=id;tab="order";return render()}
  if(k==="out")return sb.auth.signOut();
  if(k==="th"){
    n?document.documentElement.dataset.theme=n:delete document.documentElement.dataset.theme;
    n?localStorage.setItem("theme",n):localStorage.removeItem("theme");
    b.parentNode.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));return;
  }
  if(k==="pl"||k==="co"){
    b.parentNode.querySelectorAll(".chip").forEach(c=>c.classList.remove("on"));b.classList.add("on");
    if(k==="pl"){sel.plastic=n;const p=D.plastics.find(x=>x.name===n);document.getElementById("pdesc").textContent=p?p.descr||"":""}else sel.color=n;return;
  }
  run(async()=>{
    if(k==="send"){
      if(!val("o-t").trim()){document.getElementById("o-e").textContent=a("need");return}
      b.disabled=true;
      const im=fil("o-i"),fl=fil("o-f");
      const {error}=await sb.from("orders").insert({title:val("o-t").trim(),descr:val("o-d"),plastic:sel.plastic,color:sel.color,product_id:sel.pid,
        image:im?await up(im,"orders"):null,file:fl?await up(fl,"orders"):null});
      if(error)throw error;alert(a("sent"));sub="orders";return go("prof");
    }
    if(k==="phone"){const {error}=await sb.from("profiles").update({phone:val("ph")}).eq("id",user.id);if(error)throw error;me.phone=val("ph");return}
    if(k==="delo"){await sb.from("orders").delete().eq("id",id)}
    if(k==="addp"){const im=fil("n3");await sb.from("products").insert({title:val("n1"),descr:val("n2"),image:im?await up(im,"products"):null})}
    if(k==="delp")await sb.from("products").delete().eq("id",id);
    if(k==="addc")await sb.from("colors").insert({name:val("n1"),hex:val("n2")});
    if(k==="stock"){const c=D.colors.find(x=>x.id==id);await sb.from("colors").update({in_stock:!c.in_stock}).eq("id",id)}
    if(k==="delc")await sb.from("colors").delete().eq("id",id);
    if(k==="addpl")await sb.from("plastics").insert({name:val("n1"),descr:val("n2")});
    if(k==="delpl")await sb.from("plastics").delete().eq("id",id);
    await refresh();
  });
}
async function onChange(e){
  const t=e.target,c=t.dataset.c;if(!c)return;
  if(c==="th"){t.value?document.documentElement.dataset.theme=t.value:delete document.documentElement.dataset.theme;
    t.value?localStorage.setItem("theme",t.value):localStorage.removeItem("theme");return}
  if(c==="fp"){const l=t.closest(".fp");l.classList.toggle("has",!!t.files[0]);l.querySelector("span").textContent=t.files[0]?t.files[0].name:l.dataset.x;return}
  if(c==="cl"){sel.cl=t.value;return render()}
  run(async()=>{
    if(c==="st")await sb.from("orders").update({status:t.value}).eq("id",t.dataset.id);
    if(c==="gc"&&t.files[0]){await sb.from("orders").update({gcode:await up(t.files[0],"gcode")}).eq("id",t.dataset.id);await render()}
    if(c==="av"&&t.files[0]){const u=await up(t.files[0],"avatars");await sb.from("profiles").update({avatar:u}).eq("id",user.id);me.avatar=u;await render()}
  });
}

window.openApp=async()=>{
  CARDS.forEach(x=>$(x).classList.add("hide"));
  if(!root){
    root=document.createElement("div");root.id="app";root.innerHTML='<div id="view"></div>';
    nav=document.createElement("div");nav.id="nav";document.body.appendChild(nav);
    document.querySelectorAll(".wrap")[1].appendChild(root);view=root.querySelector("#view");
    document.addEventListener("click",onClick);document.addEventListener("change",onChange);
  }
  root.classList.remove("hide");nav.style.display="flex";
  await load();tab="cat";await render();
};
window.closeApp=()=>{if(root){root.classList.add("hide");nav.style.display="none"}};
const sl=window.setLang;window.setLang=l=>{sl(l);if(root&&user&&!root.classList.contains("hide"))render()};
if(user)openApp();
})();
