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
cartEmpty:["Кошик порожній","Корзина пуста"],edit:["Змінити","Изменить"],cancel:["Скасувати","Отмена"],chat:["Чат","Чат"],writeMsg:["Напишіть повідомлення…","Напишите сообщение…"],sendMsg:["Надіслати","Отправить"],noThreads:["Повідомлень ще немає","Сообщений пока нет"],backChats:["← Усі чати","← Все чаты"],photoT:["Фото","Фото"],load3d:["Завантаження 3D…","Загрузка 3D…"],err3d:["3D недоступне, дивіться фото","3D недоступно, смотрите фото"],big:["Файл завеликий (макс. ~45 МБ). Зменшіть модель.","Файл слишком большой (макс. ~45 МБ). Уменьшите модель."],pick:["Оберіть людину зі списку","Выберите человека из списка"],layers:["Переглянути друк по шарах","Посмотреть печать по слоям"],video:["Відео 360° (mp4, за бажанням)","Видео 360° (mp4, по желанию)"],live:["Наживо","Вживую"],layer:["Шар","Слой"],left:["залишилось ≈","осталось ≈"],stockHint:["Підсвічені кольори є в наявності й показуються клієнтам","Подсвеченные цвета есть в наличии и видны клиентам"]};
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
@keyframes bf{to{transform:translate(40px,-50px) scale(1.06)}}
.bub{position:absolute;border-radius:50%;will-change:transform;animation:bf 26s ease-in-out infinite alternate}
.bub::after{content:"";position:absolute;left:18%;top:11%;width:34%;height:20%;border-radius:50%;background:radial-gradient(ellipse,rgba(255,255,255,.75),rgba(255,255,255,0) 70%);transform:rotate(-32deg)}
.bo{background:radial-gradient(circle at 30% 24%,#fff1dc 0,#ffc47d 7%,#ff9a3a 22%,#f26a0a 50%,#b84300 80%,#6a2300 100%);box-shadow:inset -18px -26px 54px rgba(90,25,0,.6),inset 14px 16px 38px rgba(255,214,160,.38),0 0 100px rgba(255,110,20,.3)}
.bk{background:radial-gradient(circle at 30% 24%,#9a9a9a 0,#3a3a3a 14%,#121212 48%,#000 100%);box-shadow:inset -14px -20px 40px rgba(0,0,0,.95),inset 10px 12px 28px rgba(255,255,255,.1),0 0 70px rgba(0,0,0,.75)}
.bk::before{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 76% 86%,rgba(255,130,30,.42),transparent 46%)}
@keyframes fl{to{transform:translateY(-14px)}}
.glass,.card2{background:var(--card);backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);border:1px solid var(--line);border-radius:26px;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
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
.hero{display:grid;grid-template-columns:1fr;gap:18px;margin-bottom:22px;align-items:center}.hero:has(.hd){grid-template-columns:1.1fr 1fr}@media(max-width:820px){.hero:has(.hd){grid-template-columns:1fr}}
.hd img{width:100%;max-height:440px;object-fit:contain;filter:drop-shadow(0 20px 50px rgba(255,120,20,.35));animation:fl 6s ease-in-out infinite alternate}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin-bottom:38px}.steps .step{border-top:0;padding:14px 16px;font-size:14px}
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
.pimg img,.media img,.media video,.media canvas{width:100%;height:100%;object-fit:contain}.pimg svg,.media>svg{width:38%;color:var(--muted)}
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
.media{position:relative}.mw{position:relative}.mt{position:absolute;left:10px;bottom:10px;display:flex;gap:6px;z-index:2}.mt .chip{padding:6px 14px;font-size:13px;backdrop-filter:blur(8px)}
.e3{position:absolute;top:10px;left:12px;font-size:12px;color:var(--muted)}
.gv canvas{width:100%;aspect-ratio:1/1;border-radius:18px;background:radial-gradient(circle at 50% 30%,#1c130b,#070504);display:block}
.gc{display:flex;gap:8px;align-items:center;margin-top:10px}.gc input[type=range]{flex:1;accent-color:#ff8a1f}
.gl{font-size:12px;color:var(--muted);margin-top:6px;text-align:center}
.chat{display:flex;flex-direction:column;height:min(620px,calc(100vh - 190px));max-width:720px;margin:0 auto;padding:14px}
#msgs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:6px 2px}
.m{max-width:78%;padding:9px 13px;border-radius:18px 18px 18px 6px;font-size:15px;line-height:1.35;word-break:break-word;background:rgba(255,255,255,.1);align-self:flex-start}
.m.me{align-self:flex-end;background:var(--accent);color:#1a0d00;border-radius:18px 18px 6px 18px}
.m img{max-width:100%;border-radius:12px;display:block;margin-bottom:4px}.m small{display:block;opacity:.6;font-size:11px;margin-top:3px}
.cw{display:grid;grid-template-columns:300px 1fr;gap:14px;align-items:start}
.clist{padding:8px;max-height:min(620px,calc(100vh - 190px));overflow-y:auto;margin:0}
.pr2{display:flex;gap:10px;align-items:center;padding:10px;border-radius:16px;cursor:pointer;transition:background .25s,transform .4s var(--sp)}
.pr2:hover{background:rgba(255,255,255,.07)}.pr2.on{background:rgba(255,138,31,.18)}.pr2:active{transform:scale(.97)}
.av2{width:42px;height:42px;border-radius:50%;background:var(--field);border:1.5px solid var(--accent);display:grid;place-items:center;overflow:hidden;flex:none;font:700 16px var(--f);color:var(--accent)}.av2 img{width:100%;height:100%;object-fit:cover}
.pn{flex:1;min-width:0}.pn b{display:block;font-size:15px}.pn small{display:block;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dot{width:10px;height:10px;border-radius:50%;background:var(--accent);flex:none;box-shadow:0 0 10px var(--accent)}
.cth .chat{max-width:none;margin:0}.back{display:none;margin-bottom:8px}
@media(max-width:760px){.cw{grid-template-columns:1fr}.cw.has .clist{display:none}.cw:not(.has) .cth{display:none}.back{display:inline-block}}
.cin{display:flex;gap:8px;align-items:center;margin-top:10px}.cin input[type=text]{flex:1}
@media (prefers-reduced-motion:reduce){#view>*,.bub,.hd img{animation:none}}`;
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
const photoHTML=p=>p.image?`<img src="${esc(p.image)}">`:ic("cube");
const pcols=p=>{const base=p.colors&&p.colors.length?D.colors.filter(c=>p.colors.includes(c.name)):D.colors;return base.filter(c=>c.in_stock)};
const fixC=p=>p.colors&&p.colors.length===1?p.colors[0]:null;

function head(){
  if(!hdr)return;
  hdr.innerHTML=`<div class="logo" data-a="tab" data-n="home">${ic("cube")}Print3D</div>
  <nav><button class="nl ${tab==="home"?"on":""}" data-a="tab" data-n="home">${a("home")}</button><button class="nl ${tab==="order"?"on":""}" data-a="new">${a("order")}</button><button class="nl ${tab==="chat"?"on":""}" data-a="tab" data-n="chat">${a("chat")}</button></nav>
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
<button class="btn" data-a="goto" data-n="catalog">${a("toCat")} →</button></div>
<div class="hd"><img src="dragon.png" alt="" onerror="this.parentNode.remove()"></div></section>
<div class="steps">${[1,2,3,4].map(i=>`<div class="step glass"><span>${i}</span>${a("s"+i)}</div>`).join("")}</div>
<section id="catalog"><h2>${a("cat")}</h2><div id="cg">${catBlock()}</div></section>`;
const favView=()=>`<h2>${a("fav")}</h2>`+(favs.size?grid(D.products.filter(p=>favs.has(p.id))):`<p class="mut">${a("favEmpty")}</p>`);
let chatUid=null,chatSig="";
const seenGet=u=>+localStorage.getItem("seen:"+u)||0;
const seenSet=(u,id)=>{try{localStorage.setItem("seen:"+u,id)}catch(e){}};
const msgHTML=m=>`<div class="m ${m.sender_id===user.id?"me":""}">${m.image?`<img src="${esc(m.image)}">`:""}${esc(m.body||"")}<small>${new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</small></div>`;
async function threadHTML(uid){
  const {data}=await sb.from("messages").select("*").eq("user_id",uid).order("id");
  chatSig=String(data&&data.length?data[data.length-1].id:0);
  if(data&&data.length)seenSet(uid,data[data.length-1].id);
  return `<div class="card2 chat glass"><div id="msgs">${(data||[]).map(msgHTML).join("")||`<p class="mut">${a("noThreads")}</p>`}</div>
  <div class="cin"><label class="ib" style="cursor:pointer">${ic("up")}<input type="file" id="cimg" accept="image/*" data-c="ci" hidden></label><input type="text" id="cin" placeholder="${a("writeMsg")}"><button class="btn" style="min-width:0" data-a="msg">${a("sendMsg")}</button></div></div>`;
}
async function adminList(){
  const [m,p]=await Promise.all([sb.from("messages").select("id,user_id,sender_id,body,image").order("id",{ascending:false}).limit(1000),sb.from("profiles").select("id,first_name,last_name,avatar")]);
  const last=new Map();(m.data||[]).forEach(x=>{if(!last.has(x.user_id))last.set(x.user_id,x)});
  const ppl=(p.data||[]).filter(x=>x.id!==user.id).map(x=>({...x,name:((x.first_name||"")+" "+(x.last_name||"")).trim()||"—",m:last.get(x.id)}));
  ppl.sort((u,v)=>(v.m?v.m.id:0)-(u.m?u.m.id:0)||u.name.localeCompare(v.name));
  return ppl.map(x=>{const un=x.m&&x.m.sender_id!==user.id&&x.m.id>seenGet(x.id);
    return `<div class="pr2 ${chatUid===x.id?"on":""}" data-a="thread" data-id="${x.id}"><span class="av2">${x.avatar?`<img src="${esc(x.avatar)}">`:esc((x.name[0]||"?").toUpperCase())}</span><span class="pn"><b>${esc(x.name)}</b><small>${x.m?esc(x.m.body||"📷"):"&nbsp;"}</small></span>${un?`<i class="dot"></i>`:""}</div>`}).join("")||`<p class="mut">${a("noThreads")}</p>`;
}
async function chatView(){
  if(!me.is_admin){chatUid=user.id;return `<h2>${a("chat")}</h2>`+await threadHTML(user.id)}
  const list=await adminList();
  const th=chatUid?await threadHTML(chatUid):`<div class="card2 chat glass"><p class="mut" style="margin:auto">${a("pick")}</p></div>`;
  return `<h2>${a("chat")}</h2><div class="cw ${chatUid?"has":""}"><div class="card2 clist glass" id="clist">${list}</div><div class="cth">${chatUid?`<button class="link back" data-a="threads">${a("backChats")}</button>`:""}${th}</div></div>`;
}
async function pollChat(force){
  if(tab!=="chat")return;
  if(me.is_admin){const cl=document.getElementById("clist");if(cl){const h=await adminList();if(cl.innerHTML!==h)cl.innerHTML=h}}
  if(!chatUid||!document.getElementById("msgs"))return;
  const {data}=await sb.from("messages").select("*").eq("user_id",chatUid).order("id");
  const last=String(data&&data.length?data[data.length-1].id:0);
  if(!force&&last===chatSig)return;chatSig=last;
  if(data&&data.length)seenSet(chatUid,data[data.length-1].id);
  const box=document.getElementById("msgs");if(!box)return;
  const bottom=force||box.scrollHeight-box.scrollTop-box.clientHeight<80;
  box.innerHTML=(data||[]).map(msgHTML).join("")||`<p class="mut">${a("noThreads")}</p>`;
  if(bottom)box.scrollTop=box.scrollHeight;
}

function orderItem(o,adm,names){
  return `<div class="card2 oi"><div data-a="oopen" data-id="${o.id}" style="cursor:pointer">${o.image?`<img src="${esc(o.image)}">`:""}<b>${esc(o.title)}</b> ${badge(o.status)}
  ${adm?`<p class="mut">${a("client")}: ${esc(names[o.user_id]||"")}</p>`:""}
  <p class="mut">${esc(o.plastic||"")} ${esc(o.color||"")} · ${new Date(o.created_at).toLocaleDateString()}${o.qty>1?" · ×"+o.qty:""}${o.price!=null?" · "+o.price*(o.qty||1)+" грн":""}</p>
  ${o.gcode?`<p class="mut" style="color:var(--accent)">▶ ${a("layers")}</p>`:""}</div>
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
    (data||[]).forEach(o=>ORD[o.id]=o);
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
    (o.data||[]).forEach(x=>ORD[x.id]=x);
    return h+`<div class="rw" style="max-width:360px"><select data-c="cl"><option value="">${a("client")}: —</option>${Object.entries(names).map(([i,n])=>`<option value="${i}" ${i===fcl?"selected":""}>${esc(n)}</option>`).join("")}</select></div>`+
      ((o.data||[]).filter(x=>!fcl||x.user_id===fcl).map(x=>orderItem(x,true,names)).join("")||`<p class="mut">${a("empty")}</p>`);
  }
  if(asub==="prods"){
    const e=EP();
    return h+`<div class="card2" style="max-width:560px"><label class="f"><span>${a("title")}</span><input type="text" id="n1" value="${esc(e.title)}"></label>
    <label class="f"><span>${a("descr")}</span><textarea id="n2">${esc(e.descr)}</textarea></label>
    <div class="rw"><input type="text" id="n4" inputmode="decimal" placeholder="${a("price")}" value="${e.price??""}"><input type="text" id="n5" inputmode="numeric" placeholder="${a("mins")}" value="${e.print_minutes??""}"><input type="text" id="n6" inputmode="decimal" placeholder="${a("grams")}" value="${e.grams??""}"></div>
    <div class="rw"><select id="n8"><option value="">${a("category")}: —</option>${D.cats.map(c=>`<option value="${c.id}" ${e.category_id==c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select></div>
    <div class="rw"><select id="n9"><option value="">${a("material")}: ${a("byClient")}</option>${D.plastics.map(x=>`<option ${e.plastic===x.name?"selected":""}>${esc(x.name)}</option>`).join("")}</select></div>
    <div class="lb">${a("color")}</div><div class="chips" id="n10">${D.colors.map(c=>`<button class="chip ${(e.colors||[]).includes(c.name)?"on":""}" data-a="pc" data-n="${esc(c.name)}"><i style="background:${esc(c.hex)}"></i>${esc(c.name)}</button>`).join("")}</div>
    ${fp("n3",a("photo"),"image/*")}${fp("n7",a("model"),".stl,.3mf")}
    <button class="btn blk" data-a="addp">${editId?a("save"):a("add")}</button>${editId?`<p class="mut" style="text-align:center"><button class="link" data-a="cancelp">${a("cancel")}</button></p>`:""}</div>`+
    D.products.map(p=>`<div class="card2 rw"><b style="flex:1">${esc(p.title)}<br><span class="mut">${esc(pinfo(p))}</span></b><button class="link" data-a="editp" data-id="${p.id}">${a("edit")}</button><button class="link" data-a="delp" data-id="${p.id}">${a("del")}</button></div>`).join("");
  }
  if(asub==="cats")return h+`<div class="card2" style="max-width:420px"><div class="rw"><input type="text" id="n1" placeholder="${a("title")}"><button class="btn" style="min-width:0" data-a="addcat">${a("add")}</button></div></div>`+
    D.cats.map(c=>`<div class="card2 rw"><b style="flex:1">${esc(c.name)}</b><button class="link" data-a="delcat" data-id="${c.id}">${a("del")}</button></div>`).join("");
  if(asub==="colors")return h+`<div class="card2" style="max-width:420px"><div class="rw"><input type="text" id="n1" placeholder="${a("title")}"><input type="color" id="n2" value="#ff8a1f" style="width:60px;height:44px;border:0;background:none;padding:0"></div><button class="btn blk" data-a="addc">${a("add")}</button></div>`+
    D.colors.map(c=>`<div class="card2 rw"><i class="chip" style="padding:0;width:22px;height:22px;background:${esc(c.hex)}"></i><b style="flex:1">${esc(c.name)}</b><button class="chip ${c.in_stock?"on":""}" data-a="stock" data-id="${c.id}">${a("stock")}</button><button class="link" data-a="delc" data-id="${c.id}">${a("del")}</button></div>`).join("");
  return h+`<div class="card2" style="max-width:480px"><label class="f"><span>${a("title")}</span><input type="text" id="n1" placeholder="PLA"></label><label class="f"><span>${a("descr")}</span><textarea id="n2"></textarea></label><button class="btn blk" data-a="addpl">${a("add")}</button></div>`+
    D.plastics.map(x=>`<div class="card2"><div class="rw"><b style="flex:1">${esc(x.name)}</b><button class="link" data-a="delpl" data-id="${x.id}">${a("del")}</button></div><p class="mut">${esc(x.descr)}</p></div>`).join("");
}
async function render(){
  head();let h="";
  try{
    if(tab==="home")h=home();else if(tab==="order")h=orderForm(D.products.find(p=>p.id==oopen));
    else if(tab==="fav")h=favView();else if(tab==="cart")h=cartView();else if(tab==="chat")h=await chatView();else h=await profile();
  }catch(e){console.error(e);h=`<p class="err">${a("err")}</p>`}
  view.innerHTML=h;
  const mb=document.getElementById("msgs");if(mb)mb.scrollTop=mb.scrollHeight;
  help.querySelector("b").textContent=a("help");help.querySelector("small").textContent=a("helpS");
}

const closeModal=()=>{if(modal){modal.classList.remove("show");modal.innerHTML=""}};
function openProduct(id){
  const p=D.products.find(x=>x.id==id);if(!p)return;
  const fc=fixC(p);msel={id:p.id,plastic:p.plastic||null,color:fc};
  const pl=D.plastics.find(x=>x.name===p.plastic);
  const mat=p.plastic?`<div class="chips"><span class="chip on">${esc(p.plastic)}</span></div>`:`<div class="chips">${D.plastics.map(x=>`<button class="chip" data-a="mpl" data-n="${esc(x.name)}">${esc(x.name)}</button>`).join("")}</div>`;
  const cl=pcols(p);const col=fc?`<div class="chips"><span class="chip on"><i style="background:${esc(colHex(fc))}"></i>${esc(fc)}</span></div>`:`<div class="chips">${cl.map(c=>`<button class="chip" data-a="mco" data-n="${esc(c.name)}"><i style="background:${esc(c.hex)}"></i>${esc(c.name)}</button>`).join("")}</div>`;
  modal.innerHTML=`<div class="sheet glass"><button class="x" data-a="close">${ic("x")}</button>
  <div class="mw"><div class="media" id="media">${photoHTML(p)}</div>${p.model?`<div class="mt"><button class="chip on" data-a="mph" data-id="${p.id}">${a("photoT")}</button><button class="chip" data-a="m3d" data-id="${p.id}">3D</button></div>`:""}</div>
  <div><h2>${esc(p.title)}</h2>${p.descr?`<p class="mut">${esc(p.descr)}</p>`:""}
  <div class="stats">${p.price!=null?`<span class="stat">${ic("tag")}${p.price} грн</span>`:""}${p.print_minutes?`<span class="stat">${ic("clock")}${fmt(p.print_minutes)}</span>`:""}${p.grams?`<span class="stat">${ic("wt")}${p.grams} г</span>`:""}</div>
  ${D.plastics.length||p.plastic?`<div class="lb">${a("material")}</div>${mat}<p class="mut" id="mpd">${esc(pl?pl.descr||"":"")}</p>`:""}
  ${cl.length?`<div class="lb">${a("color")}</div>${col}`:""}
  <div class="rw" style="margin-top:16px"><button class="btn" style="flex:1" data-a="addcart" data-id="${p.id}">${a("addCart")}</button><button class="ib ${favs.has(p.id)?"on":""}" data-a="fav" data-id="${p.id}">${ic("heart")}</button></div>
  <button class="btn ghost blk" data-a="new" data-id="${p.id}">${a("orderThis")}</button></div></div>`;
  modal.classList.add("show");
}
const ORD={};
function parseG(txt){
  const lines=txt.split(/\r?\n/),layers=[];
  let x=0,y=0,z=0,e=0,f=1500,rx=false,re=false,t=0,cz=null,cur=null;
  let modelTime=null,totalTime=null,totalLayers=null,maxZ=null;
  const parseDuration=s=>{
    const m=String(s).match(/(?:(\d+)\s*d(?:ays?)?\s*)?(?:(\d+)\s*h(?:ours?)?\s*)?(?:(\d+)\s*m(?:in(?:utes?)?)?\s*)?(?:(\d+(?:\.\d+)?)\s*s(?:ec(?:onds?)?)?)/i);
    if(!m)return null;
    return (+m[1]||0)*86400+(+m[2]||0)*3600+(+m[3]||0)*60+(+m[4]||0);
  };
  for(let i=0;i<lines.length;i++){
    let raw=lines[i],ln=raw.trim();
    if(ln.startsWith(";")){
      let m=ln.match(/model printing time\s*[:=]\s*(.*?)(?:;|$)/i);
      if(m){const v=parseDuration(m[1]);if(v!=null)modelTime=v}
      m=ln.match(/total estimated time\s*[:=]\s*(.*?)(?:;|$)/i);
      if(m){const v=parseDuration(m[1]);if(v!=null)totalTime=v}
      m=ln.match(/total layer number\s*[:=]\s*(\d+)/i);if(m)totalLayers=+m[1];
      m=ln.match(/max_z_height\s*[:=]\s*([\d.]+)/i);if(m)maxZ=+m[1];
      continue;
    }
    const c=ln.indexOf(";");if(c>=0)ln=ln.slice(0,c);
    ln=ln.trim();if(!ln)continue;
    const w=ln.split(/\s+/),cmd=w[0].toUpperCase();
    if(cmd==="G90"){rx=false;continue} if(cmd==="G91"){rx=true;continue}
    if(cmd==="M82"){re=false;continue} if(cmd==="M83"){re=true;continue}
    if(cmd==="G92"){for(let k=1;k<w.length;k++)if(w[k][0]?.toUpperCase()==="E")e=parseFloat(w[k].slice(1))||0;continue}
    if(cmd!=="G0"&&cmd!=="G1")continue;
    let nx=x,ny=y,nz=z,ne=e,eIn=0;
    for(let k=1;k<w.length;k++){
      const v=parseFloat(w[k].slice(1));if(isNaN(v))continue;
      const q=w[k][0].toUpperCase();
      switch(q){case"X":nx=rx?x+v:v;break;case"Y":ny=rx?y+v:v;break;case"Z":nz=rx?z+v:v;break;case"E":eIn=re?v:v-e;ne=re?e+v:v;break;case"F":f=v||f;break}
    }
    const dx=nx-x,dy=ny-y,dz=nz-z,d=Math.hypot(dx,dy,dz),dt=d/(Math.max(1,f)/60),t0=t;t+=dt;
    if(eIn>0&&(dx||dy||dz)){
      if(cz===null||Math.abs(nz-cz)>1e-4){cz=nz;cur={z:nz,s:[],t:[],t0:t-dt};layers.push(cur)}
      cur.s.push(x,y,nx,ny);cur.t.push(t);
    }
    x=nx;y=ny;z=nz;e=ne;
  }
  const rawPathTime=t,target=modelTime||totalTime||rawPathTime,k=target&&rawPathTime?target/rawPathTime:1;
  for(const L of layers){L.s=Float32Array.from(L.s);L.t=Float32Array.from(L.t,v=>v*k);L.t0*=k;L.t1=L.t.length?L.t[L.t.length-1]:L.t0}
  return {layers,T:target||rawPathTime,modelTime,totalTime,totalLayers,maxZ};
}
async function gview(box,url,o){
  box.innerHTML='<p class="mut">…</p>';let G;
  try{const r=await fetch(url);if(!r.ok)throw 0;G=parseG(await r.text())}catch(e){console.error("G-code",e);box.innerHTML='<p class="mut">'+a("err")+'</p>';return}
  if(!box.isConnected||!G.layers.length){box.innerHTML='<p class="mut">'+a("err")+'</p>';return}
  try{
    const {T,OrbitControls}=await load3();
    let mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9,mnz=1e9,mxz=-1e9;
    const segs=[];
    G.layers.forEach((L,layer)=>{
      mnz=Math.min(mnz,L.z);mxz=Math.max(mxz,L.z);
      for(let i=0;i<L.s.length;i+=4){const j=i/4,x1=L.s[i],y1=L.s[i+1],x2=L.s[i+2],y2=L.s[i+3];mnx=Math.min(mnx,x1,x2);mxx=Math.max(mxx,x1,x2);mny=Math.min(mny,y1,y2);mxy=Math.max(mxy,y1,y2);segs.push({x1,y1,x2,y2,z:L.z,t1:L.t[j]||L.t0,t0:j?L.t[j-1]:L.t0,layer})}
    });
    const cx=(mnx+mxx)/2,cy=(mny+mxy)/2,span=Math.max(mxx-mnx,mxy-mny,mxz-mnz,1),scene=new T.Scene();
    const pos=new Float32Array(segs.length*6),colors=new Float32Array(segs.length*6),color=new T.Color();
    for(let i=0;i<segs.length;i++){const s=segs[i],p=i*6;pos[p]=s.x1-cx;pos[p+1]=s.z-mnz;pos[p+2]=-(s.y1-cy);pos[p+3]=s.x2-cx;pos[p+4]=s.z-mnz;pos[p+5]=-(s.y2-cy);color.setHSL(.07,.95,.34+.38*(s.z-mnz)/Math.max(1,mxz-mnz));for(let q=0;q<2;q++){colors[p+q*3]=color.r;colors[p+q*3+1]=color.g;colors[p+q*3+2]=color.b}}
    const geo=new T.BufferGeometry();geo.setAttribute("position",new T.BufferAttribute(pos,3));geo.setAttribute("color",new T.BufferAttribute(colors,3));
    const mat=new T.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.9});const path=new T.LineSegments(geo,mat);scene.add(path);
    const plateSize=Math.max(span*1.18,20),pg=new T.PlaneGeometry(plateSize,plateSize),pm=new T.MeshBasicMaterial({color:0x24170e,transparent:true,opacity:.55,side:T.DoubleSide});
    const plate=new T.Mesh(pg,pm);plate.rotation.x=-Math.PI/2;plate.position.y=-.18;scene.add(plate);
    const grid=new T.GridHelper(plateSize,Math.max(10,Math.min(40,Math.round(plateSize/5))),0x7a4a27,0x3b2a1c);grid.position.y=-.16;scene.add(grid);
    const nozzle=new T.Mesh(new T.ConeGeometry(Math.max(span*.012,.7),Math.max(span*.055,2.2),12),new T.MeshStandardMaterial({color:0xff8a1f,metalness:.2,roughness:.35,emissive:0x3a1600,emissiveIntensity:.45}));scene.add(nozzle);
    scene.add(new T.HemisphereLight(0xffead6,0x120b06,1.9));const dl=new T.DirectionalLight(0xffffff,1.7);dl.position.set(span,span*1.5,span);scene.add(dl);
    box.innerHTML='<div class="g3box"></div><div class="gc"><button class="ib" id="gp">▶</button><input type="range" id="gs" min="0" max="1000" value="1000">'+(o.started?'<button class="chip" id="gl2">'+a("live")+'</button>':'')+'</div><div class="gl" id="gl"></div>';
    const host=box.querySelector(".g3box");host.style.cssText="width:100%;height:min(58vh,520px);min-height:330px;border-radius:20px;overflow:hidden;cursor:grab;";
    const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight),r=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});r.setPixelRatio(Math.min(devicePixelRatio||1,1.5));r.setSize(w,h);host.appendChild(r.domElement);
    const cam=new T.PerspectiveCamera(48,w/h,Math.max(.01,span/1000),span*20);cam.position.set(span*.72,span*.68,span*.88);
    const ct=new OrbitControls(cam,r.domElement);ct.enableDamping=true;ct.dampingFactor=.075;ct.enablePan=false;ct.minDistance=span*.25;ct.maxDistance=span*4;ct.autoRotate=true;ct.autoRotateSpeed=1.2;ct.target.set(0,span*.18,0);ct.addEventListener("start",()=>{ct.autoRotate=false});
    let play=false,live=!!(o.started&&o.status==="printing"),tm=live?Math.min(G.T,(Date.now()-o.started)/1000):G.T,dirty=true;
    const gp=box.querySelector("#gp"),gs=box.querySelector("#gs"),gl=box.querySelector("#gl"),gl2=box.querySelector("#gl2"),totalSegs=segs.length;
    function update(){
      let lo=0,hi=totalSegs;while(lo<hi){const m=(lo+hi)>>1;if(segs[m].t1<=tm)lo=m+1;else hi=m}const full=lo;path.geometry.setDrawRange(0,full*2);
      if(full<totalSegs){const s=segs[full],f=Math.min(1,Math.max(0,(tm-s.t0)/Math.max(.0001,s.t1-s.t0)));nozzle.position.set(s.x1+(s.x2-s.x1)*f-cx,s.z-mnz,-(s.y1+(s.y2-s.y1)*f-cy))}else if(totalSegs){const s=segs[totalSegs-1];nozzle.position.set(s.x2-cx,s.z-mnz,-(s.y2-cy))}
      const rem=Math.max(0,Math.round((G.T-tm)/60));gl.textContent=a("layer")+" "+(full?segs[full-1].layer+1:1)+" / "+(G.totalLayers||G.layers.length)+" · "+a("left")+" "+(rem?fmt(rem):"<1 "+(lang==="ru"?"мин":"хв"));gp.textContent=play?"❚❚":"▶";gs.value=G.T?Math.round(tm/G.T*1000):0;
    }
    gp.onclick=()=>{live=false;if(!play&&tm>=G.T)tm=0;play=!play;dirty=true};gs.oninput=()=>{live=false;play=false;tm=gs.value/1000*G.T;dirty=true};if(gl2)gl2.onclick=()=>{live=true;play=false;dirty=true};
    let last=performance.now();(function loop(now){if(!host.isConnected){r.dispose();geo.dispose();mat.dispose();return}const dt=(now-last)/1000;last=now;if(live){tm=Math.min(G.T,(Date.now()-o.started)/1000);dirty=true}else if(play){tm+=dt*G.T/28;if(tm>=G.T){tm=G.T;play=false}dirty=true}if(dirty){update();dirty=false}ct.update();r.render(scene,cam);requestAnimationFrame(loop)})(last);
  }catch(e){console.error("G-code 3D",e);box.innerHTML='<p class="mut">'+a("err")+'</p>'}
}function openOrder(id){
  const o=ORD[id];if(!o)return;
  const started=o.print_started_at?new Date(o.print_started_at).getTime():null;
  modal.innerHTML=`<div class="sheet glass"><button class="x" data-a="close">${ic("x")}</button>
  ${o.gcode?`<div class="gv" id="gv"></div>`:`<div class="media">${o.image?`<img src="${esc(o.image)}">`:ic("cube")}</div>`}
  <div><h2>${esc(o.title)}</h2><p>${badge(o.status)}</p>
  <p class="mut">${esc([o.plastic,o.color].filter(Boolean).join(" · "))} · ${new Date(o.created_at).toLocaleDateString()}${o.qty>1?" · ×"+o.qty:""}${o.price!=null?" · "+o.price*(o.qty||1)+" грн":""}</p>
  ${o.descr?`<p class="mut">${esc(o.descr)}</p>`:""}${o.gcode&&o.image?`<img src="${esc(o.image)}" style="width:100%;max-height:200px;object-fit:contain;border-radius:14px;margin-top:8px">`:""}
  ${o.file?`<p><a class="link" href="${esc(o.file)}" target="_blank">📎 файл</a></p>`:""}</div></div>`;
  modal.classList.add("show");
  if(o.gcode)gview(document.getElementById("gv"),o.gcode,{status:o.status,started});
}
let T3=null;const G3={};
const load3=()=>T3||(T3=(async()=>{const B="https://cdn.jsdelivr.net/npm/three@0.160.0/";const T=await import(B+"+esm");const {OrbitControls}=await import(B+"examples/jsm/controls/OrbitControls.js/+esm");return {T,OrbitControls,B}})());
async function show3d(box,url,fb){
  box.innerHTML=`<p class="mut" id="p3">${a("load3d")}</p>`;
  try{
    const {T,OrbitControls,B}=await load3();
    let obj=G3[url];
    if(!obj){
      const pg=e=>{const el=document.getElementById("p3");if(el&&e.total)el.textContent=a("load3d")+" "+Math.round(e.loaded/e.total*100)+"%"};
      if(url.split("?")[0].toLowerCase().endsWith(".3mf")){const {ThreeMFLoader}=await import(B+"examples/jsm/loaders/3MFLoader.js/+esm");obj=await new ThreeMFLoader().loadAsync(url,pg)}
      else{const {STLLoader}=await import(B+"examples/jsm/loaders/STLLoader.js/+esm");const g=await new STLLoader().loadAsync(url,pg);
        obj=new T.Mesh(g,new T.MeshLambertMaterial({color:0xff8a1f}))}
      obj.rotation.x=-Math.PI/2;const bb=new T.Box3().setFromObject(obj),c=bb.getCenter(new T.Vector3());
      const grp=new T.Group();obj.position.sub(c);grp.add(obj);grp.userData.size=bb.getSize(new T.Vector3()).length();obj=G3[url]=grp;
    }
    if(!box.isConnected)return;
    const sz=obj.userData.size||100,sc=new T.Scene();sc.add(obj);
    sc.add(new T.HemisphereLight(0xffffff,0x332211,1.6));const dl=new T.DirectionalLight(0xffffff,1.4);dl.position.set(2,3,4);sc.add(dl);
    const dpr=Math.min(devicePixelRatio||1,1.5);
    const r=new T.WebGLRenderer({antialias:dpr<1.5,alpha:true,powerPreference:"high-performance"});r.setPixelRatio(dpr);
    const w=box.clientWidth,h=box.clientHeight;r.setSize(w,h);box.innerHTML="";box.appendChild(r.domElement);
    const cam=new T.PerspectiveCamera(48,w/h,Math.max(.01,sz/1000),sz*20);cam.position.set(sz*.62,sz*.5,sz*.78);
    const ct=new OrbitControls(cam,r.domElement);ct.enableDamping=true;ct.dampingFactor=.075;ct.enablePan=false;ct.enableZoom=true;ct.minDistance=sz*.18;ct.maxDistance=sz*4;ct.autoRotate=true;ct.autoRotateSpeed=1.5;
    let need=true;ct.addEventListener("change",()=>need=true);ct.addEventListener("start",()=>{ct.autoRotate=false});
    setTimeout(()=>{ct.autoRotate=false},8000);
    (function loop(){
      if(!r.domElement.isConnected){sc.remove(obj);r.dispose();return}
      const ch=ct.update();if(ch||need){r.render(sc,cam);need=false}
      requestAnimationFrame(loop);
    })();
  }catch(e){console.error("3D",e);box.innerHTML=fb||"";box.insertAdjacentHTML("beforeend",`<span class="e3">${a("err3d")}</span>`)}
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
const go=async t=>{closeModal();if(t==="chat")chatUid=null;tab=t;await render();scrollTo(0,0)};

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
  if(k==="oopen")return openOrder(id);
  if(k==="m3d"||k==="mph"){
    const p=D.products.find(x=>x.id==id),box=document.getElementById("media");if(!p||!box)return;
    b.parentNode.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===b));
    if(k==="m3d")show3d(box,p.model,photoHTML(p));else box.innerHTML=photoHTML(p);return;
  }
  if(k==="close")return closeModal();
  if(k==="fav")return toggleFav(+id);
  if(k==="qadd"){
    const p=D.products.find(x=>x.id==id);
    const fc=fixC(p);const need=(!p.plastic&&D.plastics.length)||(!fc&&pcols(p).length);
    if(need)return openProduct(id);
    b.animate([{transform:"scale(1)"},{transform:"scale(1.3)"},{transform:"scale(1)"}],{duration:450,easing:"cubic-bezier(.34,1.56,.64,1)"});
    return addToCart(p,p.plastic||null,fc);
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
  if(k==="thread"){chatUid=id;return render()}
  if(k==="threads"){chatUid=null;return render()}
  if(k==="pc"){b.classList.toggle("on");return}
  if(k==="out")return sb.auth.signOut();
  if(k==="editp"){editId=id;await render();scrollTo(0,0);return}
  if(k==="cancelp"){editId=null;return render()}
  run(async()=>{
    if(k==="msg"){
      const inp=document.getElementById("cin"),im=fil("cimg"),body=inp.value.trim();if(!body&&!im)return;
      b.disabled=true;
      try{const {error}=await sb.from("messages").insert({user_id:chatUid,body:body||null,image:im?await up(im,"chat"):null});if(error)throw error}
      finally{b.disabled=false}
      inp.value="";const ci=document.getElementById("cimg");ci.value="";ci.parentNode.classList.remove("on");await pollChat(true);return;
    }
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
      const f={title:val("n1"),descr:val("n2"),price:num("n4"),print_minutes:num("n5"),grams:num("n6"),category_id:num("n8"),plastic:val("n9")||null,colors:[...document.querySelectorAll("#n10 .chip.on")].map(x=>x.dataset.n)};
      if(im)f.image=await up(im,"products");if(md){if(md.size>45e6){alert(a("big"));return}f.model=await up(md,"models")}
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
  if(c==="ci"){t.parentNode.classList.toggle("on",!!t.files[0]);return}
  if(c==="cl"){fcl=t.value;return render()}
  run(async()=>{
    if(c==="st")await sb.from("orders").update({status:t.value,...(t.value==="printing"?{print_started_at:new Date().toISOString()}:{})}).eq("id",t.dataset.id);
    if(c==="gc"&&t.files[0]){await sb.from("orders").update({gcode:await up(t.files[0],"gcode")}).eq("id",t.dataset.id);await render()}
    if(c==="av"&&t.files[0]){const u=await up(t.files[0],"avatars");await sb.from("profiles").update({avatar:u}).eq("id",user.id);me.avatar=u;await render()}
  });
}

const BUBS=[[-7,4,260,"bo",24,0],[64,-6,150,"bk",28,0],[84,16,300,"bo",26,0],[2,52,150,"bk",30,0],[74,60,210,"bk",25,1],[36,84,130,"bo",32,2],[90,84,190,"bo",27,0],[48,34,70,"bk",22,3],[20,18,90,"bo",34,3]];
window.openApp=async()=>{
  CARDS.forEach(x=>$(x).classList.add("hide"));
  if(!root){
    root=document.createElement("div");root.id="app";root.innerHTML='<header class="hdr glass" id="hdr"></header><main id="view"></main>';
    document.querySelectorAll(".wrap")[1].appendChild(root);hdr=root.querySelector("#hdr");view=root.querySelector("#view");
    bub=document.createElement("div");bub.id="bubbles";bub.innerHTML=BUBS.map(([x,y,z,c,d,b])=>`<i class="bub ${c}" style="left:${x}%;top:${y}%;width:${z}px;height:${z}px;animation-duration:${d}s;${b?"filter:blur("+b+"px);":""}"></i>`).join("");document.body.appendChild(bub);
    help=document.createElement("div");help.id="help";help.className="glass";help.dataset.a="tab";help.dataset.n="chat";
    help.innerHTML=`<span class="hi">${ic("chat")}</span><span><b></b><small></small></span>`;document.body.appendChild(help);
    modal=document.createElement("div");modal.id="modal";document.body.appendChild(modal);
    modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
    document.addEventListener("click",onClick);document.addEventListener("change",onChange);
    document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.id==="cin"){e.preventDefault();const b=document.querySelector("[data-a=msg]");b&&b.click()}});
    setInterval(()=>{if(!document.hidden)pollChat()},4000);
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
