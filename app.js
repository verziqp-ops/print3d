(()=>{
const S={
home:["Головна","Главная"],order:["Замовити друк","Заказать печать"],cat:["Каталог","Каталог"],all:["Усі товари","Все товары"],
fav:["Обране","Избранное"],cart:["Кошик","Корзина"],prof:["Профіль","Профиль"],adm:["Адмінка","Админка"],
tag:["3D-друк — це реальність","3D-печать — это реальность"],h1a:["Ваші ідеї","Ваши идеи"],h1b:["у 3D","в 3D"],
heroP:["Друкуємо деталі на замовлення: обирайте готові моделі або надішліть своє фото чи креслення.","Печатаем детали на заказ: выбирайте готовые модели или присылайте своё фото или чертёж."],
toCat:["Перейти до каталогу","Перейти в каталог"],more:["Дізнатися більше","Узнать больше"],how:["Як це працює","Как это работает"],
s1:["Оберіть модель або запропонуйте свою","Выберите модель или предложите свою"],s2:["Погоджуємо ціну й розміри в чаті","Согласуем цену и размеры в чате"],
s3:["Стежте за друком у профілі","Следите за печатью в профиле"],s4:["Отримайте готову деталь","Получите готовую деталь"],
help:["Потрібна допомога?","Нужна помощь?"],helpS:["Напишіть нам","Напишите нам"],soon:["Чат з'явиться незабаром","Чат появится скоро"],
favEmpty:["Тут з'являться товари, які ви додасте в обране","Здесь появятся товары из избранного"],empty:["Поки порожньо","Пока пусто"],
name:["Назва деталі","Название детали"],note:["Опис (за бажанням)","Описание (по желанию)"],photo:["Фото (за можливості)","Фото (по возможности)"],
file:["Файл / креслення (за можливості)","Файл / чертёж (по возможности)"],plastic:["Тип пластику","Тип пластика"],color:["Колір","Цвет"],
material:["Матеріал","Материал"],byClient:["обирає клієнт","выбирает клиент"],category:["Категорія","Категория"],cats:["Категорії","Категории"],
model:["3D-модель (STL / 3MF)","3D-модель (STL / 3MF)"],send:["Відправити","Отправить"],orders:["Замовлення","Заказы"],info:["Профіль","Профиль"],
phone:["Телефон","Телефон"],save:["Зберегти","Сохранить"],out:["Вийти","Выйти"],need:["Введіть назву деталі","Введите название детали"],
sent:["Замовлення відправлено","Заказ отправлен"],pending:["Очікує","Ожидает"],printing:["Друкується","Печатается"],ready:["Готове","Готово"],
shipping:["Доставляється","Доставляется"],delivered:["Доставлено","Доставлено"],client:["Клієнт","Клиент"],gcode:["Додати G-код","Добавить G-код"],
add:["Додати","Добавить"],del:["Видалити","Удалить"],stock:["В наявності","В наличии"],prods:["Товари","Товары"],colors:["Кольори","Цвета"],
plastics:["Пластик","Пластик"],title:["Назва","Название"],descr:["Опис","Описание"],err:["Помилка, спробуйте ще раз","Ошибка, попробуйте ещё раз"],
price:["Ціна, грн","Цена, грн"],mins:["Час друку, хв","Время печати, мин"],grams:["Пластик, г","Пластик, г"],addCart:["В кошик","В корзину"],
orderThis:["Замовити окремо","Заказать отдельно"],total:["Разом","Итого"],checkout:["Оформити замовлення","Оформить заказ"],
cartEmpty:["Кошик порожній","Корзина пуста"],edit:["Змінити","Изменить"],cancel:["Скасувати","Отмена"]};
const a=k=>(S[k]||[k,k])[lang==="ru"?1:0];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ST=["pending","printing","ready","shipping","delivered"];
const STC={pending:"#8a8a8a",printing:"#ff8a1f",ready:"#2e9e57",shipping:"#3a7bd5",delivered:"#8a6fe0"};
const P={cube:'<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20.5 8H6"/>',
x:'<path d="M6 6l12 12M18 6 6 18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>',wt:'<path d="M6 8h12l2 12H4z"/><circle cx="12" cy="5" r="2"/>',
up:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
let me={},D={},favs=new Set(),tab="home",sub="info",asub="orders",fcat=null,fcl="",editId=null,oopen=null,osel={},msel={},root,view,hdr,help,bub,modal;
let cart=[];try{cart=JSON.parse(localStorage.getItem("cart")||"[]")}catch(e){}
const cartN=()=>cart.reduce((s,x)=>s+x.qty,0);
const saveCart=()=>{try{localStorage.setItem("cart",JSON.stringify(cart))}catch(e){}head()};

const css=document.createElement("style");
css.textContent=`
:root{--f:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--sp:cubic-bezier(.34,1.56,.64,1)}
body.app-on{--bg:#080605;--bg2:#1a0d04;--text:#f5ece2;--muted:#a8998a;--card:rgba(20,15,11,.58);--line:rgba(255,255,255,.1);--field:rgba(255,255,255,.07);--accent:#ff8a1f;display:block;padding:0;background:#080605;color:var(--text)}
.app-on .blob{display:none}.app-on .wrap{max-width:1200px!important;margin:0 auto!important;padding:0 16px}
#bubbles{position:fixed;inset:0;overflow:hidden;z-index:0;pointer-events:none}
.bub{position:absolute;border-radius:50%;animation:bf 20s ease-in-out infinite alternate}
.bub::after{content:"";position:absolute;left:20%;top:13%;width:30%;height:18%;border-radius:50%;background:rgba(255,255,255,.4);filter:blur(5px);transform:rotate(-30deg)}
.bo{background:radial-gradient(circle at 32% 26%,#ffe2bd 0,#ffa24a 14%,#f2690d 42%,#a33a00 82%,#5b1d00 100%);box-shadow:0 0 80px rgba(255,120,20,.35),inset -14px -18px 44px rgba(60,15,0,.55)}
.bk{background:radial-gradient(circle at 32% 26%,#707070 0,#262626 22%,#070707 66%,#000 100%);box-shadow:inset -10px -12px 30px rgba(0,0,0,.85),0 0 40px rgba(0,0,0,.6)}
@keyframes bf{to{transform:translate(40px,-50px) scale(1.06)}}
.glass,.card2{background:var(--card);backdrop-filter:blur(22px) saturate(1.5);-webkit-backdrop-filter:blur(22px) saturate(1.5);border:1px solid var(--line);border-radius:26px;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
#app{position:relative;z-index:1;padding-bottom:110px}#app.hide{display:none}
.card2{padding:18px;margin-bottom:12px}
.hdr{position:sticky;top:12px;z-index:10;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:10px 16px;margin:12px 0 22px;border-radius:999px}
.hdr .logo{cursor:pointer}.hdr nav{display:flex;gap:2px;flex:1}.ico{display:flex;align-items:center;gap:8px;margin-left:auto}
.nl{border:0;background:none;color:var(--muted);font:600 15px var(--f);padding:8px 14px;border-radius:999px;cursor:pointer;transition:color .3s,transform .5s var(--sp)}
.nl:hover{color:var(--text);transform:scale(1.07)}.nl.on{color:var(--accent)}
.ib{position:relative;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:var(--field);color:var(--text);display:grid;place-items:center;cursor:pointer;transition:transform .5s var(--sp),color .3s}
.ib svg{width:20px;height:20px}.ib:hover{transform:scale(1.12)}.ib:active{transform:scale(.88)}.ib.on{color:var(--accent)}
.ib i{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:9px;background:var(--accent);color:#1a0d00;font:700 11px/18px var(--f);text-align:center;font-style:normal;padding:0 4px}.ib i:empty{display:none}
@media(max-width:640px){.hdr{border-radius:26px}.hdr nav{order:3;flex-basis:100%}}
.hero{display:grid;grid-template-columns:1.35fr 1fr;gap:18px;margin-bottom:38px}@media(max-width:820px){.hero{grid-template-columns:1fr}}
.hl{padding:34px}.hl h1{font-size:clamp(40px,7vw,68px);line-height:1.02;margin:14px 0}.hl h1 b{color:var(--accent)}.hl p{color:var(--muted);max-width:480px;margin:0 0 22px}
.pill{display:inline-block;padding:6px 12px;border:1px solid rgba(255,138,31,.45);color:var(--accent);border-radius:999px;font-size:12px;font-weight:600}
.hr{padding:22px 24px}.hr h3{margin:0 0 6px}.step{display:flex;gap:12px;align-items:center;padding:13px 0;border-top:1px solid var(--line)}
.step span{width:30px;height:30px;border-radius:50%;background:var(--accent);color:#1a0d00;display:grid;place-items:center;font-weight:700;flex:none}
section[id]{scroll-margin-top:90px}section h2{font-size:30px;margin:0 0 14px}
.pills{display:flex;gap:8px;overflow-x:auto;padding:4px 2px 16px}
.chip{display:inline-flex;align-items:center;gap:6px;flex:none;border:1px solid var(--line);background:var(--field);color:var(--text);padding:9px 16px;border-radius:999px;font:600 14px var(--f);cursor:pointer;transition:transform .5s var(--sp),background .3s,color .3s}
.chip.on{background:var(--accent);border-color:var(--accent);color:#1a0d00}.chip:hover{transform:scale(1.05)}.chip:active{transform:scale(.92)}
.chip i{width:14px;height:14px;border-radius:50%;border:1px solid var(--line);display:block}.chips{display:flex;flex-wrap:wrap;gap:8px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
.pcard{position:relative;padding:12px;cursor:pointer;display:flex;flex-direction:column;gap:6px;transition:transform .5s var(--sp)}
.pcard:hover{transform:translateY(-4px) scale(1.02)}.pcard:active{transform:scale(.97)}
.pimg,.media{aspect-ratio:1;border-radius:18px;background:rgba(255,255,255,.05);display:grid;place-items:center;overflow:hidden}
.pimg img,.media img,.media canvas{width:100%;height:100%;object-fit:contain}.pimg svg,.media>svg{width:38%;color:var(--muted)}
.pcard>b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pr{color:var(--accent);font-size:17px}
.cb{width:38px;height:38px;border-radius:12px;border:0;background:var(--accent);color:#1a0d00;display:grid;place-items:center;cursor:pointer;margin-left:auto;transition:transform .5s var(--sp);box-shadow:0 8px 20px -8px rgba(255,120,20,.8)}
.cb svg{width:20px;height:20px}.cb:hover{transform:scale(1.12)}.cb:active{transform:scale(.86)}
.hb{position:absolute;top:18px;right:18px;z-index:2;width:34px;height:34px;border-radius:50%;border:0;background:rgba(0,0,0,.5);color:#fff;display:grid;place-items:center;cursor:pointer;transition:transform .5s var(--sp)}
.hb svg{width:18px;height:18px}.hb.on{color:#ff5a4d}.hb.on svg{fill:currentColor}.hb:active{transform:scale(.8)}
.mut{color:var(--muted);font-size:13px;margin:2px 0}.lb{font-size:12px;color:var(--muted);margin:12px 0 6px 4px}
.stats{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.stat{display:flex;align-items:center;gap:6px;background:var(--field);border:1px solid var(--line);border-radius:999px;padding:7px 12px;font:600 13px var(--f)}
.stat svg{width:16px;height:16px;color:var(--accent)}
#modal{position:fixed;inset:0;z-index:30;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.45);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
#modal.show{display:flex;animation:fade .25s}
.sheet{position:relative;width:100%;max-width:880px;max-height:90vh;overflow:auto;padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:22px;animation:pop .5s var(--sp);background:rgba(14,10,7,.85)}
@media(max-width:700px){.sheet{grid-template-columns:1fr}}.sheet h2{margin:0 0 6px;font-size:26px}.sheet p.mut{font-size:13.5px}
.x{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--text);display:grid;place-items:center;cursor:pointer;z-index:3}.x svg{width:18px;height:18px}
@keyframes fade{from{opacity:0}}
#help{position:fixed;left:16px;bottom:16px;z-index:9;display:flex;gap:10px;align-items:center;padding:8px 18px 8px 8px;border-radius:999px;cursor:pointer;transition:transform .5s var(--sp)}
#help:hover{transform:scale(1.05)}#help:active{transform:scale(.94)}
.hi{width:40px;height:40px;border-radius:14px;background:var(--accent);color:#1a0d00;display:grid;place-items:center}.hi svg{width:22px;height:22px}
#help b{display:block;font-size:13px}#help small{color:var(--muted);font-size:12px}
#app h2{margin:0 0 12px}.f{display:block;margin-bottom:12px;min-width:0}.f span{display:block;font-size:12px;color:var(--muted);margin:0 0 5px 4px}
#app textarea,#app select,#app input[type=text]{width:100%;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--field);color:var(--text);font:16px var(--f);outline:0}
#app textarea{min-height:70px;resize:vertical}
#app select{-webkit-appearance:none;appearance:none;padding-right:40px;background:var(--field) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a99886' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center/16px}
#app select option{background:#1a1511;color:#f5ece2}
.rw{display:flex;gap:8px;align-items:center;margin:8px 0}.rw>*{min-width:0}.rw>input,.rw>select{flex:1}
.tabs{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}.badge{display:inline-block;color:#fff;font:700 12px var(--f);padding:3px 10px;border-radius:999px}
.fp{display:flex;align-items:center;gap:10px;padding:13px 14px;margin-bottom:10px;border:1.5px dashed var(--line);border-radius:16px;background:var(--field);color:var(--muted);cursor:pointer;font-size:14px;overflow:hidden;transition:transform .5s var(--sp)}
.fp:hover{transform:scale(1.02)}.fp svg{width:20px;height:20px;flex:none;color:var(--accent)}.fp span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fp.has{border-style:solid;border-color:var(--accent);color:var(--text)}
.av{width:84px;height:84px;border-radius:50%;background:var(--field);border:2px solid var(--accent);display:grid;place-items:center;overflow:hidden;margin:0 auto 8px;cursor:pointer;font:700 28px var(--f);color:var(--accent)}.av img{width:100%;height:100%;object-fit:cover}
.oi img{width:100%;max-height:170px;object-fit:contain;border-radius:14px;margin-bottom:8px}
.ci{display:flex;gap:10px;align-items:center}.ci img{width:56px;height:56px;object-fit:contain;border-radius:12px;background:var(--field)}
.qty{display:flex;align-items:center;gap:8px}.qty button{width:32px;height:32px;border-radius:50%;border:1px solid var(--line);background:var(--field);color:var(--text);cursor:pointer;font:700 16px var(--f)}
#app .btn:active,.chip:active{transform:scale(.93)!important}#app .btn{width:auto;min-width:140px}#app .btn.blk{width:100%}
#view>*{animation:rise .55s cubic-bezier(.2,.9,.3,1) both}
@media (prefers-reduced-motion:reduce){#view>*,.bub{animation:none}}`;
document.head.appendChild(css);

async function load(){
  const [p,c,pl,pr,ca,fv]=await Promise.all([sb.from("profiles").select("*").eq("id",user.id).single(),
    sb.from("colors").select("*").order("id"),sb.from("plastics").select("*").order("id"),
    sb.from("products").select("*").order("id",{ascending:false}),sb.from("categories").select("*").order("id"),
    sb.from("favorites").select("product_id")]);
  me=p.data||{};D={colors:c.data||[],plastics:pl.data||[],products:pr.data||[],cats:ca.data||[]};
  favs=new Set((fv.data||[]).map(x=>x.product_id));
}
async function up(f,dir){
  const n=`${dir}/${crypto.randomUUID()}-${f.name.replace(/[^\w.]/g,"_")}`;
  const {error}=await sb.storage.from("uploads").upload(n,f);if(error)throw error;
  return sb.storage.from("uploads").getPublicUrl(n).data.publicUrl;
}
const fp=(id,txt,acc)=>`<label class="fp" data-x="${esc(txt)}">${ic("up")}<span>${esc(txt)}</span><input type="file" id="${id}" ${acc?`accept="${acc}"`:""} data-c="fp" hidden></label>`;
const badge=s=>`<span class="badge" style="background:${STC[s]||"#888"}">${a(s)}</span>`;
const tabs=(list,cur,key)=>`<div class="tabs">${list.map(([k,t])=>`<button class="chip ${k===cur?"on":""}" data-a="${key}" data-n="${k}">${t}</button>`).join("")}</div>`;
const fmt=m=>(m>=60?Math.floor(m/60)+(lang==="ru"?" ч ":" год "):"")+(m%60?m%60+(lang==="ru"?" мин":" хв"):"");
const pinfo=p=>[p.price!=null?p.price+" грн":"",p.print_minutes?fmt(p.print_minutes):"",p.grams?p.grams+" г":""].filter(Boolean).join(" · ");
const EP=()=>D.products.find(x=>x.id==editId)||{};
const val=id=>(document.getElementById(id)||{}).value||"";
const num=id=>{const v=parseFloat(val(id).replace(",","."));return isNaN(v)?null:v};
const fil=id=>{const f=document.getElementById(id);return f&&f.files[0]};
const colHex=n=>(D.colors.find(c=>c.name===n)||{}).hex||"#888";

function head(){
  if(!hdr)return;
  hdr.innerHTML=`<div class="logo" data-a="tab" data-n="home">${ic("cube")}Print3D</div>
  <nav><button class="nl ${tab==="home"?"on":""}" data-a="tab" data-n="home">${a("home")}</button><button class="nl ${tab==="order"?"on":""}" data-a="new">${a("order")}</button></nav>
  <div class="ico"><button class="ib ${tab==="fav"?"on":""}" data-a="tab" data-n="fav">${ic("heart")}<i>${favs.size||""}</i></button>
  <button class="ib ${tab==="cart"?"on":""}" data-a="tab" data-n="cart">${ic("cart")}<i>${cartN()||""}</i></button>
  <button class="ib ${tab==="prof"?"on":""}" data-a="tab" data-n="prof">${ic("user")}</button>
  <div class="lang"><button data-a="lang" data-l="uk">UA</button><button data-a="lang" data-l="ru">RU</button></div></div>`;
  hdr.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("on",b.dataset.l===lang));
}
const card=p=>`<div class="pcard glass" data-a="open" data-id="${p.id}"><button class="hb ${favs.has(p.id)?"on":""}" data-a="fav" data-id="${p.id}">${ic("heart")}</button>
<div class="pimg">${p.image?`<img src="${esc(p.image)}" loading="lazy">`:ic("cube")}</div><b>${esc(p.title)}</b>
<span class="mut">${esc([p.plastic,p.grams?p.grams+" г":""].filter(Boolean).join(" · "))||"&nbsp;"}</span>
<div class="rw"><b class="pr">${p.price!=null?p.price+" грн":""}</b><button class="cb" data-a="qadd" data-id="${p.id}">${ic("cart")}</button></div></div>`;
const grid=l=>l.length?`<div class="grid">${l.map(card).join("")}</div>`:`<p class="mut">${a("empty")}</p>`;
const catBlock=()=>`<div class="pills"><button class="chip ${fcat==null?"on":""}" data-a="cf" data-n="">${a("all")}</button>${D.cats.map(c=>`<button class="chip ${fcat==c.id?"on":""}" data-a="cf" data-n="${c.id}">${esc(c.name)}</button>`).join("")}</div>${grid(D.products.filter(p=>fcat==null||p.category_id==fcat))}`;
const home=()=>`<section class="hero"><div class="hl glass"><span class="pill">${a("tag")}</span><h1>${a("h1a")}<br><b>${a("h1b")}</b></h1><p>${a("heroP")}</p>
<div class="rw" style="flex-wrap:wrap"><button class="btn" data-a="goto" data-n="catalog">${a("toCat")} →</button><button class="btn ghost" data-a="goto" data-n="how">${a("more")}</button></div></div>
<div class="hr glass" id="how"><h3>${a("how")}</h3>${[1,2,3,4].map(i=>`<div class="step"><span>${i}</span>${a("s"+i)}</div>`).join("")}</div></section>
<section id="catalog"><h2>${a("cat")}</h2><div id="cg">${catBlock()}</div></section>`;
const favView=()=>`<h2>${a("fav")}</h2>`+(favs.size?grid(D.products.filter(p=>favs.has(p.id))):`<p class="mut">${a("favEmpty")}</p>`);
const chatView=()=>`<div class="card2"><h2>${a("help")}</h2><p class="mut">${a("soon")}</p></div>`;

function orderItem(o,adm,names){
  return `<div class="card2 oi">${o.image?`<img src="${esc(o.image)}">`:""}<b>${esc(o.title)}</b> ${badge(o.status)}
  ${adm?`<p class="mut">${a("client")}: ${esc(names[o.user_id]||"")}</p>`:""}
  <p class="mut">${esc(o.plastic||"")} ${esc(o.color||"")} · ${new Date(o.created_at).toLocaleDateString()}${o.qty>1?" · ×"+o.qty:""}${o.price!=null?" · "+o.price*(o.qty||1)+" грн":""}</p>
  ${o.descr?`<p>${esc(o.descr)}</p>`:""}${o.file?`<p><a class="link" href="${esc(o.file)}" target="_blank">📎 файл</a></p>`:""}
  ${adm?`<div class="rw"><select data-c="st" data-id="${o.id}">${ST.map(s=>`<option value="${s}" ${s===o.status?"selected":""}>${a(s)}</option>`).join("")}</select></div>
  <div class="rw"><label class="btn ghost" style="cursor:pointer;min-width:0">${a("gcode")}<input type="file" data-c="gc" data-id="${o.id}" hidden></label>${o.gcode?`<a class="link" href="${esc(o.gcode)}" target="_blank">G-code</a>`:""}
  <button class="link" data-a="delo" data-id="${o.id}">${a("del")}</button></div>`:""}</div>`;
}
function orderForm(p){
  osel={plastic:null,color:null,pid:p?p.id:null};
  return `<div class="card2" style="max-width:560px;margin:0 auto"><h2>${a("order")}</h2>
  <label class="f"><span>${a("name")}</span><input type="text" id="o-t" value="${esc(p?p.title:"")}"></label>
  <label class="f"><span>${a("note")}</span><textarea id="o-d"></textarea></label>
  ${fp("o-i",a("photo"),"image/*")}${fp("o-f",a("file"))}
  <div class="lb">${a("plastic")}</div><div class="chips">${D.plastics.map(x=>`<button class="chip" data-a="pl" data-n="${esc(x.name)}">${esc(x.name)}</button>`).join("")}</div><p class="mut" id="pdesc"></p>
  <div class="lb">${a("color")}</div><div class="chips">${D.colors.filter(c=>c.in_stock).map(c=>`<button class="chip" data-a="co" data-n="${esc(c.name)}"><i style="background:${esc(c.hex)}"></i>${esc(c.name)}</button>`).join("")}</div>
  <p class="err" id="o-e"></p><button class="btn blk" data-a="send">${a("send")}</button></div>`;
}
const cartView=()=>{
  if(!cart.length)return `<h2>${a("cart")}</h2><p class="mut">${a("cartEmpty")}</p>`;
  const tot=cart.reduce((s,x)=>s+(x.price||0)*x.qty,0);
  return `<h2>${a("cart")}</h2><div style="max-width:620px">`+cart.map((x,i)=>`<div class="card2 ci">${x.image?`<img src="${esc(x.image)}">`:""}<div style="flex:1;min-width:0"><b>${esc(x.title)}</b><p class="mut">${esc([x.plastic,x.color].filter(Boolean).join(" · "))}${x.price!=null?" · "+x.price+" грн":""}</p></div><div class="qty"><button data-a="qm" data-id="${i}">−</button><b>${x.qty}</b><button data-a="qp" data-id="${i}">+</button></div></div>`).join("")+
    `<div class="card2"><div class="rw"><b style="flex:1">${a("total")}</b><b>${tot} грн</b></div><button class="btn blk" data-a="checkout">${a("checkout")}</button></div></div>`;
};
async function profile(){
  let h=tabs([["info",a("info")],["orders",a("orders")],...(me.is_admin?[["adm",a("adm")]]:[])],sub,"sub");
  if(sub==="orders"){
    const {data}=await sb.from("orders").select("*").eq("user_id",user.id).order("id",{ascending:false});
    return h+((data||[]).map(o=>orderItem(o)).join("")||`<p class="mut">${a("empty")}</p>`);
  }
  if(sub==="adm")return h+await admin();
  const ini=(me.first_name||user.email||"?")[0].toUpperCase();
  return h+`<div class="card2" style="max-width:480px"><label class="av">${me.avatar?`<img src="${esc(me.avatar)}">`:ini}<input type="file" accept="image/*" data-c="av" hidden></label>
  <h2 style="text-align:center">${esc(((me.first_name||"")+" "+(me.last_name||"")).trim())}</h2><p class="mut" style="text-align:center">${esc(user.email)}</p>
  <div class="lb">${a("phone")}</div><div class="rw"><input type="text" id="ph" inputmode="tel" value="${esc(me.phone||"")}"><button class="btn" style="min-width:0" data-a="phone">${a("save")}</button></div>
  <div style="height:10px"></div><button class="btn ghost blk" data-a="out">${a("out")}</button></div>`;
}
async function admin(){
  let h=tabs([["orders",a("orders")],["prods",a("prods")],["cats",a("cats")],["colors",a("colors")],["plastics",a("plastics")]],asub,"asub");
  if(asub==="orders"){
    const [o,p]=await Promise.all([sb.from("orders").select("*").order("id",{ascending:false}),sb.from("profiles").select("id,first_name,last_name")]);
    const names={};(p.data||[]).forEach(x=>names[x.id]=((x.first_name||"")+" "+(x.last_name||"")).trim());
    return h+`<div class="rw" style="max-width:360px"><select data-c="cl"><option value="">${a("client")}: —</option>${Object.entries(names).map(([i,n])=>`<option value="${i}" ${i===fcl?"selected":""}>${esc(n)}</option>`).join("")}</select></div>`+
      ((o.data||[]).filter(x=>!fcl||x.user_id===fcl).map(x=>orderItem(x,true,names)).join("")||`<p class="mut">${a("empty")}</p>`);
  }
  if(asub==="prods"){
    const e=EP();
    return h+`<div class="card2" style="max-width:560px"><label class="f"><span>${a("title")}</span><input type="text" id="n1" value="${esc(e.title)}"></label>
    <label class="f"><span>${a("descr")}</span><textarea id="n2">${esc(e.descr)}</textarea></label>
    <div class="rw"><input type="text" id="n4" inputmode="decimal" placeholder="${a("price")}" value="${e.price??""}"><input type="text" id="n5" inputmode="numeric" placeholder="${a("mins")}" value="${e.print_minutes??""}"><input type="text" id="n6" inputmode="decimal" placeholder="${a("grams")}" value="${e.grams??""}"></div>
    <div class="rw"><select id="n8"><option value="">${a("category")}: —</option>${D.cats.map(c=>`<option value="${c.id}" ${e.category_id==c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select></div>
    <div class="rw"><select id="n9"><option value="">${a("material")}: ${a("byClient")}</option>${D.plastics.map(x=>`<option ${e.plastic===x.name?"selected":""}>${esc(x.name)}</option>`).join("")}</select>
    <select id="n10"><option value="">${a("color")}: ${a("byClient")}</option>${D.colors.map(c=>`<option ${e.color===c.name?"selected":""}>${esc(c.name)}</option>`).join("")}</select></div>
    ${fp("n3",a("photo"),"image/*")}${fp("n7",a("model"),".stl,.3mf")}
    <button class="btn blk" data-a="addp">${editId?a("save"):a("add")}</button>${editId?`<p class="mut" style="text-align:center"><button class="link" data-a="cancelp">${a("cancel")}</button></p>`:""}</div>`+
    D.products.map(p=>`<div class="card2 rw"><b style="flex:1">${esc(p.title)}<br><span class="mut">${esc(pinfo(p))}${p.model?" · 3D":""}</span></b><button class="link" data-a="editp" data-id="${p.id}">${a("edit")}</button><button class="link" data-a="delp" data-id="${p.id}">${a("del")}</button></div>`).join("");
  }
  if(asub==="cats")return h+`<div class="card2" style="max-width:420px"><div class="rw"><input type="text" id="n1" placeholder="${a("title")}"><button class="btn" style="min-width:0" data-a="addcat">${a("add")}</button></div></div>`+
    D.cats.map(c=>`<div class="card2 rw"><b style="flex:1">${esc(c.name)}</b><button class="link" data-a="delcat" data-id="${c.id}">${a("del")}</button></div>`).join("");
  if(asub==="colors")return h+`<div class="card2" style="max-width:420px"><div class="rw"><input type="text" id="n1" placeholder="${a("title")}"><input type="color" id="n2" value="#ff8a1f" style="width:60px;height:44px;border:0;background:none"></div><button class="btn blk" data-a="addc">${a("add")}</button></div>`+
    D.colors.map(c=>`<div class="card2 rw"><i class="chip" style="padding:0;width:22px;height:22px;background:${esc(c.hex)}"></i><b style="flex:1">${esc(c.name)}</b><button class="chip ${c.in_stock?"on":""}" data-a="stock" data-id="${c.id}">${a("stock")}</button><button class="link" data-a="delc" data-id="${c.id}">${a("del")}</button></div>`).join("");
  return h+`<div class="card2" style="max-width:480px"><label class="f"><span>${a("title")}</span><input type="text" id="n1" placeholder="PLA"></label><label class="f"><span>${a("descr")}</span><textarea id="n2"></textarea></label><button class="btn blk" data-a="addpl">${a("add")}</button></div>`+
    D.plastics.map(x=>`<div class="card2"><div class="rw"><b style="flex:1">${esc(x.name)}</b><button class="link" data-a="delpl" data-id="${x.id}">${a("del")}</button></div><p class="mut">${esc(x.descr)}</p></div>`).join("");
}
async function render(){
  head();let h="";
  try{
    if(tab==="home")h=home();else if(tab==="order")h=orderForm(D.products.find(p=>p.id==oopen));
    else if(tab==="fav")h=favView();else if(tab==="cart")h=cartView();else if(tab==="chat")h=chatView();else h=await profile();
  }catch(e){console.error(e);h=`<p class="err">${a("err")}</p>`}
  view.innerHTML=h;
  help.querySelector("b").textContent=a("help");help.querySelector("small").textContent=a("helpS");
}

const closeModal=()=>{if(modal){modal.classList.remove("show");modal.innerHTML=""}};
function openProduct(id){
  const p=D.products.find(x=>x.id==id);if(!p)return;
  msel={id:p.id,plastic:p.plastic||null,color:p.color||null};
  const pl=D.plastics.find(x=>x.name===p.plastic);
  const mat=p.plastic?`<div class="chips"><span class="chip on">${esc(p.plastic)}</span></div>`:`<div class="chips">${D.plastics.map(x=>`<button class="chip" data-a="mpl" data-n="${esc(x.name)}">${esc(x.name)}</button>`).join("")}</div>`;
  const col=p.color?`<div class="chips"><span class="chip on"><i style="background:${esc(colHex(p.color))}"></i>${esc(p.color)}</span></div>`:`<div class="chips">${D.colors.filter(c=>c.in_stock).map(c=>`<button class="chip" data-a="mco" data-n="${esc(c.name)}"><i style="background:${esc(c.hex)}"></i>${esc(c.name)}</button>`).join("")}</div>`;
  modal.innerHTML=`<div class="sheet glass"><button class="x" data-a="close">${ic("x")}</button>
  <div class="media" id="media">${p.image?`<img src="${esc(p.image)}">`:ic("cube")}</div>
  <div><h2>${esc(p.title)}</h2>${p.descr?`<p class="mut">${esc(p.descr)}</p>`:""}
  <div class="stats">${p.price!=null?`<span class="stat">${ic("tag")}${p.price} грн</span>`:""}${p.print_minutes?`<span class="stat">${ic("clock")}${fmt(p.print_minutes)}</span>`:""}${p.grams?`<span class="stat">${ic("wt")}${p.grams} г</span>`:""}</div>
  ${D.plastics.length||p.plastic?`<div class="lb">${a("material")}</div>${mat}<p class="mut" id="mpd">${esc(pl?pl.descr||"":"")}</p>`:""}
  ${D.colors.length||p.color?`<div class="lb">${a("color")}</div>${col}`:""}
  <div class="rw" style="margin-top:16px"><button class="btn" style="flex:1" data-a="addcart" data-id="${p.id}">${a("addCart")}</button><button class="ib ${favs.has(p.id)?"on":""}" data-a="fav" data-id="${p.id}">${ic("heart")}</button></div>
  <button class="btn ghost blk" data-a="new" data-id="${p.id}">${a("orderThis")}</button></div></div>`;
  modal.classList.add("show");
  if(p.model)show3d(document.getElementById("media"),p.model);
}
async function show3d(box,url){
  try{
    const B="https://cdn.jsdelivr.net/npm/three@0.160.0/";
    const T=await import(B+"+esm"),{OrbitControls}=await import(B+"examples/jsm/controls/OrbitControls.js/+esm");
    const ext=url.split("?")[0].split(".").pop().toLowerCase();let obj;
    if(ext==="3mf"){const {ThreeMFLoader}=await import(B+"examples/jsm/loaders/3MFLoader.js/+esm");obj=await new ThreeMFLoader().loadAsync(url)}
    else{const {STLLoader}=await import(B+"examples/jsm/loaders/STLLoader.js/+esm");const g=await new STLLoader().loadAsync(url);g.computeVertexNormals();
      obj=new T.Mesh(g,new T.MeshStandardMaterial({color:0xff8a1f,roughness:.4,metalness:.15}))}
    if(!box.isConnected)return;
    obj.rotation.x=-Math.PI/2;const g2=new T.Group();g2.add(obj);
    const bx=new T.Box3().setFromObject(g2),c=bx.getCenter(new T.Vector3()),sz=bx.getSize(new T.Vector3()).length();
    obj.position.sub(c);const sc=new T.Scene();sc.add(g2);
    sc.add(new T.HemisphereLight(0xffffff,0x332211,1.2));const dl=new T.DirectionalLight(0xffffff,1.6);dl.position.set(2,3,4);sc.add(dl);
    const r=new T.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
    const w=box.clientWidth,h=box.clientHeight;r.setSize(w,h);box.innerHTML="";box.appendChild(r.domElement);
    const cam=new T.PerspectiveCamera(40,w/h,sz/100,sz*20);cam.position.set(sz*.8,sz*.6,sz*1.1);
    const ct=new OrbitControls(cam,r.domElement);ct.enableDamping=true;ct.autoRotate=true;ct.autoRotateSpeed=2;
    (function loop(){if(!box.isConnected){r.dispose();return}ct.update();r.render(sc,cam);requestAnimationFrame(loop)})();
  }catch(e){console.error("3D",e)}
}
function addToCart(p,pl,co){
  const f=cart.find(x=>x.pid==p.id&&x.plastic==pl&&x.color==co);
  f?f.qty++:cart.push({pid:p.id,title:p.title,price:p.price,image:p.image,plastic:pl,color:co,qty:1});
  saveCart();
}
async function toggleFav(pid){
  const on=favs.has(pid);on?favs.delete(pid):favs.add(pid);
  document.querySelectorAll(`[data-a=fav][data-id="${pid}"]`).forEach(x=>x.classList.toggle("on",!on));head();
  const r=on?await sb.from("favorites").delete().eq("product_id",pid).eq("user_id",user.id):await sb.from("favorites").insert({product_id:pid});
  if(r.error){on?favs.add(pid):favs.delete(pid);render()}else if(tab==="fav")render();
}
const run=async fn=>{try{await fn()}catch(e){console.error(e);alert(a("err"))}};
const refresh=async()=>{await load();await render()};
const go=async t=>{closeModal();tab=t;await render();scrollTo(0,0)};

async function onClick(e){
  const b=e.target.closest("[data-a]");if(!b||b.tagName==="SELECT"||b.type==="file")return;
  const k=b.dataset.a,id=b.dataset.id,n=b.dataset.n;
  if(k==="tab")return go(n);
  if(k==="lang")return setLang(b.dataset.l);
  if(k==="sub"){sub=n;return render()}
  if(k==="asub"){asub=n;return render()}
  if(k==="new"){oopen=id;return go("order")}
  if(k==="goto"){const el=document.getElementById(n);return el&&el.scrollIntoView({behavior:"smooth",block:"start"})}
  if(k==="cf"){fcat=n===""?null:+n;document.getElementById("cg").innerHTML=catBlock();return}
  if(k==="open")return openProduct(id);
  if(k==="close")return closeModal();
  if(k==="fav")return toggleFav(+id);
  if(k==="qadd"){
    const p=D.products.find(x=>x.id==id);
    const need=(!p.plastic&&D.plastics.length)||(!p.color&&D.colors.some(c=>c.in_stock));
    if(need)return openProduct(id);
    b.animate([{transform:"scale(1)"},{transform:"scale(1.3)"},{transform:"scale(1)"}],{duration:450,easing:"cubic-bezier(.34,1.56,.64,1)"});
    return addToCart(p,p.plastic||null,p.color||null);
  }
  if(k==="mpl"||k==="mco"||k==="pl"||k==="co"){
    b.parentNode.querySelectorAll(".chip").forEach(c=>c.classList.remove("on"));b.classList.add("on");
    const m=k[0]==="m",o=m?msel:osel;
    if(k.endsWith("pl")){o.plastic=n;const p=D.plastics.find(x=>x.name===n);const d=document.getElementById(m?"mpd":"pdesc");if(d)d.textContent=p?p.descr||"":""}else o.color=n;
    return;
  }
  if(k==="addcart"){
    const p=D.products.find(x=>x.id==id);addToCart(p,msel.plastic,msel.color);closeModal();
    document.querySelector(".ib[data-n=cart]").animate([{transform:"scale(1)"},{transform:"scale(1.35)"},{transform:"scale(1)"}],{duration:500,easing:"cubic-bezier(.34,1.56,.64,1)"});return;
  }
  if(k==="qm"||k==="qp"){const it=cart[+id];if(it){it.qty+=k==="qp"?1:-1;if(it.qty<1)cart.splice(+id,1)}saveCart();return render()}
  if(k==="out")return sb.auth.signOut();
  if(k==="editp"){editId=id;await render();scrollTo(0,0);return}
  if(k==="cancelp"){editId=null;return render()}
  run(async()=>{
    if(k==="send"){
      if(!val("o-t").trim()){document.getElementById("o-e").textContent=a("need");return}
      b.disabled=true;const im=fil("o-i"),fl=fil("o-f");
      const {error}=await sb.from("orders").insert({title:val("o-t").trim(),descr:val("o-d"),plastic:osel.plastic,color:osel.color,product_id:osel.pid,
        image:im?await up(im,"orders"):null,file:fl?await up(fl,"orders"):null});
      if(error)throw error;alert(a("sent"));sub="orders";return go("prof");
    }
    if(k==="checkout"){
      b.disabled=true;
      const {error}=await sb.from("orders").insert(cart.map(x=>({title:x.title,plastic:x.plastic,color:x.color,product_id:x.pid,qty:x.qty,price:x.price,image:x.image})));
      if(error)throw error;cart=[];saveCart();alert(a("sent"));sub="orders";return go("prof");
    }
    if(k==="phone"){const {error}=await sb.from("profiles").update({phone:val("ph")}).eq("id",user.id);if(error)throw error;me.phone=val("ph");return}
    if(k==="delo")await sb.from("orders").delete().eq("id",id);
    if(k==="addp"){
      const im=fil("n3"),md=fil("n7");
      const f={title:val("n1"),descr:val("n2"),price:num("n4"),print_minutes:num("n5"),grams:num("n6"),category_id:num("n8"),plastic:val("n9")||null,color:val("n10")||null};
      if(im)f.image=await up(im,"products");if(md)f.model=await up(md,"models");
      const r=editId?await sb.from("products").update(f).eq("id",editId):await sb.from("products").insert(f);
      if(r.error)throw r.error;editId=null;
    }
    if(k==="delp")await sb.from("products").delete().eq("id",id);
    if(k==="addcat")await sb.from("categories").insert({name:val("n1")});
    if(k==="delcat")await sb.from("categories").delete().eq("id",id);
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
  if(c==="fp"){const l=t.closest(".fp");l.classList.toggle("has",!!t.files[0]);l.querySelector("span").textContent=t.files[0]?t.files[0].name:l.dataset.x;return}
  if(c==="cl"){fcl=t.value;return render()}
  run(async()=>{
    if(c==="st")await sb.from("orders").update({status:t.value}).eq("id",t.dataset.id);
    if(c==="gc"&&t.files[0]){await sb.from("orders").update({gcode:await up(t.files[0],"gcode")}).eq("id",t.dataset.id);await render()}
    if(c==="av"&&t.files[0]){const u=await up(t.files[0],"avatars");await sb.from("profiles").update({avatar:u}).eq("id",user.id);me.avatar=u;await render()}
  });
}

const BUBS=[[-6,6,240,"bo",19],[68,-5,150,"bk",23],[86,18,270,"bo",21],[3,56,140,"bk",25],[76,62,200,"bk",20],[38,82,120,"bo",27],[90,86,170,"bo",22]];
window.openApp=async()=>{
  CARDS.forEach(x=>$(x).classList.add("hide"));
  if(!root){
    root=document.createElement("div");root.id="app";root.innerHTML='<header class="hdr glass" id="hdr"></header><main id="view"></main>';
    document.querySelectorAll(".wrap")[1].appendChild(root);hdr=root.querySelector("#hdr");view=root.querySelector("#view");
    bub=document.createElement("div");bub.id="bubbles";bub.innerHTML=BUBS.map(([x,y,s,c,d])=>`<i class="bub ${c}" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;animation-duration:${d}s"></i>`).join("");document.body.appendChild(bub);
    help=document.createElement("div");help.id="help";help.className="glass";help.dataset.a="tab";help.dataset.n="chat";
    help.innerHTML=`<span class="hi">${ic("chat")}</span><span><b></b><small></small></span>`;document.body.appendChild(help);
    modal=document.createElement("div");modal.id="modal";document.body.appendChild(modal);
    modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
    document.addEventListener("click",onClick);document.addEventListener("change",onChange);
  }
  document.body.classList.add("app-on");document.querySelectorAll(".wrap")[0].style.display="none";
  root.classList.remove("hide");bub.style.display="";help.style.display="";
  await load();tab="home";await render();
};
window.closeApp=()=>{
  if(!root)return;
  root.classList.add("hide");bub.style.display="none";help.style.display="none";closeModal();
  document.body.classList.remove("app-on");document.querySelectorAll(".wrap")[0].style.display="";
};
const sl=window.setLang;window.setLang=l=>{sl(l);if(root&&user&&!root.classList.contains("hide"))render()};
if(user)openApp();
})();
