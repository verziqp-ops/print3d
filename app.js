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
cartEmpty:["Кошик порожній","Корзина пуста"],edit:["Змінити","Изменить"],cancel:["Скасувати","Отмена"],chat:["Чат","Чат"],writeMsg:["Напишіть повідомлення…","Напишите сообщение…"],sendMsg:["Надіслати","Отправить"],noThreads:["Повідомлень ще немає","Сообщений пока нет"],backChats:["← Усі чати","← Все чаты"],photoT:["Фото","Фото"],load3d:["Завантаження 3D…","Загрузка 3D…"],err3d:["3D недоступне, дивіться фото","3D недоступно, смотрите фото"],big:["Файл завеликий (макс. ~45 МБ). Зменшіть модель.","Файл слишком большой (макс. ~45 МБ). Уменьшите модель."],pick:["Оберіть людину зі списку","Выберите человека из списка"],layers:["Подивитись процес друку","Посмотреть процесс печати"],video:["Відео 360° (mp4, за бажанням)","Видео 360° (mp4, по желанию)"],live:["live","live"],process:["Процес","Процесс"],simulation:["Розрахункова симуляція · час від початку друку","Расчётная симуляция · время от начала печати"],noStart:["Режим live почнеться зі статусу «Друкується»","Режим live начнётся со статуса «Печатается»"],layer:["Шар","Слой"],left:["залишилось ≈","осталось ≈"],stockHint:["Підсвічені кольори є в наявності й показуються клієнтам","Подсвеченные цвета есть в наличии и видны клиентам"]};
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
.app-on .blob,.bg-ready .blob{display:none}.app-on .wrap{max-width:1200px!important;margin:0 auto!important;padding:0 16px}
body.bg-ready:not(.app-on){--bg:#080605;--bg2:#1a0d04;--text:#f5ece2;--muted:#a8998a;--card:rgba(20,15,11,.78);--line:rgba(255,255,255,.1);--field:#19120d;--accent:#ff8a1f;background:#080605}
body.bg-ready{position:relative;min-height:100svh}
#bubbles{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:#090807}
#bubbles canvas{display:block;width:100%;height:100%}
@keyframes fl{to{transform:translateY(-14px)}}
.glass,.card2{background:var(--card);backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);border:1px solid var(--line);border-radius:26px;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
#app{position:relative;z-index:1;padding-bottom:110px}#app.hide{display:none}
.card2{padding:18px;margin-bottom:12px}.print-process{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;white-space:normal;text-align:center;padding:12px 20px}
.hdr{position:sticky;top:12px;z-index:10;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:10px 16px;margin:12px 0 22px;border-radius:999px}
.hdr{transition:transform .6s cubic-bezier(.22,1,.36,1),opacity .5s ease;will-change:transform}.hdr.scroll-hidden{transform:translate3d(0,calc(-100% - 24px),0);opacity:0;pointer-events:none}
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
.gc{display:flex;gap:8px;align-items:center;margin-top:10px}.gc input[type=range]{flex:1;min-width:0;accent-color:#ff8a1f}.gc .chip{white-space:nowrap}
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
.chip:disabled{opacity:.45;cursor:not-allowed}.studio [hidden]{display:none!important}.studio{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px}.studio h2{margin-top:12px!important}.studio-right{position:sticky;top:100px;align-self:start}.studio-slider>div{display:flex;gap:10px;align-items:center}.studio-slider input[type=range]{flex:1;min-width:0;accent-color:var(--accent)}.studio-slider input[type=number]{width:82px;padding:8px;border-radius:10px;border:1px solid var(--line);background:var(--field);color:var(--text);font:14px var(--f)}#vase-profile{width:100%;max-height:320px;touch-action:none;background:var(--field);border-radius:18px}#vase-profile circle{cursor:grab}@media(max-width:760px){.studio{grid-template-columns:1fr}.studio-right{order:-1;position:sticky;top:8px;z-index:4;background:rgba(14,10,7,.97);border-radius:18px;padding:8px}.studio-right .org-preview{height:210px}.studio-right>.mut{display:none}.studio-right .rw{margin:4px 0}.studio-right .f{margin:0}}
.org-panel{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px}.org-panel h2{margin-top:12px!important}.org-preview{height:420px;background:radial-gradient(ellipse at top,rgba(255,138,31,.08),rgba(0,0,0,.25));border:1px solid var(--line);border-radius:22px;overflow:hidden;display:grid;place-items:center}.org-preview canvas{display:block;width:100%;height:100%}@media(max-width:760px){.org-panel{grid-template-columns:1fr}.org-preview{height:340px}}
.calc-panel{max-width:720px}.calc-panel h2{margin-top:12px!important}.calc-fields{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px}.calc-fields input{width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:var(--field);color:var(--text);font:16px var(--f)}.calc-breakdown{display:grid;grid-template-columns:1fr auto;gap:10px;padding:18px 0;border-top:1px solid var(--line)}.calc-totals{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:8px 0 20px}.calc-totals>div{padding:18px;border-radius:18px;background:var(--field);border:1px solid var(--line)}.calc-totals span{display:block;font-size:12px;color:var(--muted)}.calc-totals strong{display:block;font-size:25px;margin-top:8px;color:var(--accent);overflow-wrap:anywhere}@media(max-width:450px){.calc-fields,.calc-totals{grid-template-columns:1fr}}
.g-modes{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px}.g-modes .pill{margin-left:auto;font-size:9px;letter-spacing:1.4px}.g-progress{height:4px;background:var(--field);border-radius:4px;overflow:hidden;margin-top:12px}.g-progress i{display:block;height:100%;background:var(--accent);box-shadow:0 0 12px var(--accent)}
.m{white-space:pre-wrap}.m a{color:inherit;text-decoration:underline}.m{animation:message-in .5s var(--sp)}
@keyframes message-in{from{opacity:0;transform:translateY(10px) scale(.95)}}
#app .glass,#app .card2{transition:transform .55s var(--sp),border-color .3s,box-shadow .3s}
#app .pcard:hover{transform:translateY(-5px);border-color:rgba(255,138,31,.35);box-shadow:0 18px 50px -25px rgba(255,138,31,.3)}
#app button{transition:transform .5s var(--sp),background .3s,box-shadow .3s}#app button:not(:disabled):active{transform:scale(.92)}
#app input:focus,#app textarea:focus,#app select:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(255,138,31,.12)}
#view .grid>*{animation:message-in .6s var(--sp) both}#view .grid>*:nth-child(3n+2){animation-delay:.05s}#view .grid>*:nth-child(3n){animation-delay:.1s}
#app .logo{letter-spacing:-.6px}#app .btn{box-shadow:0 8px 28px -14px rgba(255,138,31,.65)}
@media (prefers-reduced-motion:reduce){#view>*,.bub,.bub::after,.hd img,#bg-filament{animation:none}#bg-spot{display:none}}`;
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
const msgBody=body=>String(body||'').split(/(https?:\/\/[^\s<>"']+)/g).map((part,i)=>i%2?`<a href="${esc(part)}" target="_blank" rel="noopener noreferrer">${esc(part)}</a>`:esc(part)).join('');
const msgHTML=m=>`<div class="m ${m.sender_id===user.id?"me":""}">${m.image?`<img src="${esc(m.image)}">`:""}${msgBody(m.body)}<small>${new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</small></div>`;
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

function canViewPrint(o,admin=false){return !!o.gcode&&(admin||['printing','ready','shipping','delivered'].includes(o.status))}
function orderItem(o,adm,names){
  return `<div class="card2 oi"><div data-a="oopen" data-id="${o.id}" style="cursor:pointer">${o.image?`<img src="${esc(o.image)}">`:""}<b>${esc(o.title)}</b> ${badge(o.status)}
  ${adm?`<p class="mut">${a("client")}: ${esc(names[o.user_id]||"")}</p>`:""}
  <p class="mut">${esc(o.plastic||"")} ${esc(o.color||"")} · ${new Date(o.created_at).toLocaleDateString()}${o.qty>1?" · ×"+o.qty:""}${o.price!=null?" · "+o.price*(o.qty||1)+" грн":""}</p>
  </div>
  ${canViewPrint(o,adm)?`<div class="rw"><button type="button" class="btn print-process" data-a="oopen" data-id="${o.id}"><span aria-hidden="true">▶</span> ${a("layers")}</button></div>`:""}
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
const CALC_FIELDS=[
  ['tariff','Тариф за світло, грн/кВт·год','Тариф за свет, грн/кВт·ч','0.01',''],
  ['watts','Середня потужність принтера, Вт','Средняя мощность принтера, Вт','1',''],
  ['spoolGrams','Маса пластику в котушці, г','Масса пластика в катушке, г','1','1000'],
  ['spoolPrice','Ціна котушки, грн','Цена катушки, грн','0.01',''],
  ['hours','Час друку — години','Время печати — часы','1','0'],
  ['minutes','Час друку — хвилини','Время печати — минуты','1','0'],
  ['grams','Пластик на деталь, г','Пластик на деталь, г','0.01',''],
  ['markup','Націнка, %','Наценка, %','0.01','0']
];
let calculatorValues={};try{calculatorValues=JSON.parse(localStorage.getItem('print3d:calculator')||'{}')||{}}catch(e){}
function calculatePrintCost(v){
  const keys=['tariff','watts','spoolGrams','spoolPrice','hours','minutes','grams','markup'];
  if(keys.some(k=>v[k]===''||v[k]==null||!Number.isFinite(Number(v[k]))))return null;
  const n=Object.fromEntries(keys.map(k=>[k,Number(v[k])]));
  if(keys.some(k=>n[k]<0)||n.spoolGrams<=0||n.minutes>=60||!Number.isInteger(n.hours)||!Number.isInteger(n.minutes))return null;
  const time=n.hours+n.minutes/60,energy=n.watts/1000*time,electricity=energy*n.tariff,plastic=n.spoolPrice/n.spoolGrams*n.grams,cost=plastic+electricity,price=cost*(1+n.markup/100);
  return [energy,electricity,plastic,cost,price].every(Number.isFinite)?{energy,electricity,plastic,cost,price}:null;
}
const moneyUA=n=>(Math.round((n+Number.EPSILON)*100)/100).toFixed(2).replace('.',',');
function calculatorHTML(){
  const ru=lang==='ru';
  return `<section class="card2 calc-panel"><span class="pill">PRINT3D</span><h2>${ru?'Себестоимость печати':'Собівартість друку'}</h2>
  <p class="mut">${ru?'Введите свои цены и среднюю мощность принтера во время печати.':'Введи свої ціни та середню потужність принтера під час друку.'}</p>
  <div class="calc-fields">${CALC_FIELDS.map(([key,uk,rus,step,defaultValue])=>`<label class="f"><span>${ru?rus:uk}</span><input type="number" data-calc="${key}" min="0" ${key==='minutes'?'max="59"':''} step="${step}" inputmode="decimal" value="${esc(calculatorValues[key]??defaultValue)}"></label>`).join('')}</div>
  <p class="mut" id="calc-error" role="status"></p>
  <div class="calc-breakdown"><span>${ru?'Пластик':'Пластик'}</span><b id="calc-plastic">—</b><span>${ru?'Электричество':'Електроенергія'}</span><b id="calc-electricity">—</b><span>${ru?'Расход энергии':'Споживання енергії'}</span><b id="calc-energy">—</b></div>
  <div class="calc-totals"><div><span>${ru?'Себестоимость':'Собівартість'}</span><strong id="calc-cost">—</strong></div><div><span>${ru?'Цена с наценкой':'Ціна з націнкою'}</span><strong id="calc-price">—</strong></div></div>
  <div class="rw"><button class="btn" data-a="roundprice">${ru?'Округлить вверх':'Округлити вгору'}</button><b id="calc-rounded" aria-live="polite"></b></div>
  <p class="mut">${ru?'Наценка начисляется на себестоимость. Округление — вверх до целой гривны. Здесь учитываются пластик и свет; работа, износ принтера, упаковка и брак не включены.':'Націнка додається до собівартості. Округлення — вгору до цілої гривні. Тут враховані пластик і світло; робота, зношення принтера, пакування та брак не включені.'}</p></section>`;
}
function readCalculator(){return calculatePrintCost(Object.fromEntries([...document.querySelectorAll('[data-calc]')].map(input=>[input.dataset.calc,input.value])))}
function updateCalculator(){
  const inputs=[...document.querySelectorAll('[data-calc]')];if(!inputs.length)return;
  calculatorValues=Object.fromEntries(inputs.map(input=>[input.dataset.calc,input.value]));try{localStorage.setItem('print3d:calculator',JSON.stringify(calculatorValues))}catch(e){}
  const result=readCalculator();document.getElementById('calc-error').textContent=result?'':(lang==='ru'?'Заполните все поля. Масса катушки должна быть больше 0, минуты — от 0 до 59.':'Заповни всі поля. Маса котушки має бути більшою за 0, хвилини — від 0 до 59.');
  for(const key of ['plastic','electricity','cost','price'])document.getElementById('calc-'+key).textContent=result?moneyUA(result[key])+' грн':'—';
  document.getElementById('calc-energy').textContent=result?result.energy.toFixed(3).replace('.',',')+' кВт·год':'—';
  document.getElementById('calc-rounded').textContent='';document.querySelector('[data-a="roundprice"]').disabled=!result;
}

const ORG_DEFAULT={width:180,depth:120,height:45,wall:2,bottom:2,columns:3,rows:2,color:'#ff8a1f'};
let orgValues={...ORG_DEFAULT},orgModel=null,orgViewer=null,orgTimer=null;
try{orgValues={...ORG_DEFAULT,...JSON.parse(localStorage.getItem('print3d:organizer')||'{}')}}catch(e){}
function organizerHTML(){
  const fields=[['width','Ширина, мм'],['depth','Глибина, мм'],['height','Висота, мм'],['columns','Колонки'],['rows','Ряди'],['wall','Товщина стінок, мм'],['bottom','Товщина дна, мм']];
  return `<section class="card2 org-panel"><div><span class="pill">PRINT3D / GENERATOR</span><h2>Генератор органайзерів</h2><p class="mut">Задай зовнішні розміри в міліметрах. Відділення однакового розміру, верх відкритий.</p>
  <div class="chips"><button class="chip" data-a="org-preset" data-n="desk">Для столу</button><button class="chip" data-a="org-preset" data-n="drawer">Для шухляди</button><button class="chip" data-a="org-preset" data-n="pens">Для ручок</button></div>
  <div class="calc-fields" style="margin-top:16px">${fields.map(([key,label])=>{const count=['rows','columns'].includes(key),min=count?1:['width','depth'].includes(key)?10:key==='height'?5:.8,max=count?12:['width','depth','height'].includes(key)?1000:10,step=count?1:.1;return `<label class="f studio-slider"><span>${label}</span><div><input type="range" data-org="${key}" min="${min}" max="${max}" step="${step}" value="${esc(orgValues[key])}"><input type="number" data-org="${key}" min="${min}" max="${max}" step="${step}" value="${esc(orgValues[key])}"></div></label>`}).join('')}<label class="f"><span>Колір прев’ю</span><input type="color" data-org="color" value="${esc(orgValues.color)}" style="height:44px;width:100%"></label></div>
  <p class="err" id="org-error" role="status"></p><p class="mut" id="org-info"></p><p class="mut" id="org-fit"></p>
  <div class="rw" style="flex-wrap:wrap"><button class="btn" data-a="org-download">Завантажити STL</button><button class="chip" data-a="org-reset">Скинути</button></div><p class="mut">STL — у міліметрах, без кольору. Відкрий його в слайсері, щоб вибрати пластик, якість і отримати G-code.</p></div>
  <div><div id="org-preview" class="org-preview"><p class="mut">Завантаження 3D…</p></div><p class="gl">Обертай мишею або пальцем · коліщатко для масштабу</p><button class="chip" id="org-camera">Повернути камеру</button></div></section>`;
}
function readOrganizer(){return Object.fromEntries([...document.querySelectorAll('[data-org]')].map(input=>[input.dataset.org,input.dataset.org==='color'?input.value:input.value===''?NaN:Number(input.value)]))}
function updateOrganizer(){
  if(!document.getElementById('org-error'))return;
  const values=readOrganizer();orgModel=null;const button=document.querySelector('[data-a="org-download"]');
  try{
    const model=window.Print3DOrganizer.build(values);orgModel=model;orgValues=values;try{localStorage.setItem('print3d:organizer',JSON.stringify(values))}catch(e){}
    document.getElementById('org-error').textContent='';document.getElementById('org-info').textContent=`${values.columns*values.rows} відділень · кожне ${model.cellWidth.toFixed(1)} × ${model.cellDepth.toFixed(1)} × ${(values.height-values.bottom).toFixed(1)} мм`;
    const fits=values.width<=256&&values.depth<=256&&values.height<=256;document.getElementById('org-fit').textContent=fits?'✓ Габарити поміщаються в 256 × 256 × 256 мм. Залиш місце для кайми у слайсері.':'⚠ Габарити перевищують 256 × 256 × 256 мм — перевір розмір свого принтера.';
    if(orgViewer)orgViewer.update(model,values.color);button.disabled=false;
  }catch(e){document.getElementById('org-error').textContent=e.message;document.getElementById('org-info').textContent='';document.getElementById('org-fit').textContent='';button.disabled=true;if(orgViewer)orgViewer.clear()}
}
function queueOrganizerUpdate(){clearTimeout(orgTimer);const button=document.querySelector('[data-a="org-download"]');if(button)button.disabled=true;orgTimer=setTimeout(updateOrganizer,140)}
function organizerPreset(name){
  const presets={default:ORG_DEFAULT,desk:{...ORG_DEFAULT},drawer:{...ORG_DEFAULT,width:240,depth:180,height:30,columns:4,rows:3},pens:{...ORG_DEFAULT,width:120,depth:90,height:100,columns:3,rows:1}};
  const preset=presets[name];if(!preset)return;document.querySelectorAll('[data-org]').forEach(input=>input.value=preset[input.dataset.org]);clearTimeout(orgTimer);updateOrganizer();if(orgViewer)orgViewer.fit();
}
function downloadOrganizer(){
  clearTimeout(orgTimer);updateOrganizer();if(!orgModel)return;const p=orgModel.parameters,blob=new Blob([window.Print3DOrganizer.stl(orgModel)],{type:'model/stl'}),url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download=`Print3D-organizer-${p.width}x${p.depth}x${p.height}-${p.columns}x${p.rows}.stl`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);
}
async function mountOrganizer(){
  const host=document.getElementById('org-preview');if(!host)return;updateOrganizer();
  try{
    const {T,OrbitControls}=await load3();if(!host.isConnected)return;
    const scene=new T.Scene(),renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));host.innerHTML='';host.appendChild(renderer.domElement);renderer.domElement.style.touchAction='none';
    const camera=new T.PerspectiveCamera(42,1,.1,10000),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=15;controls.maxDistance=4000;
    scene.add(new T.HemisphereLight(0xffffff,0x59616c,2.2));const light=new T.DirectionalLight(0xffffff,2.5);light.position.set(200,400,300);scene.add(light);
    const material=new T.MeshStandardMaterial({color:orgValues.color,roughness:.55,metalness:.05}),mesh=new T.Mesh(new T.BufferGeometry(),material);scene.add(mesh);
    let disposed=false,first=true;
    function fit(){const p=orgModel?orgModel.parameters:ORG_DEFAULT,span=Math.max(p.width,p.depth,p.height),aspect=Math.max(.3,host.clientWidth/host.clientHeight),distance=span*1.9/Math.min(1,aspect);camera.position.set(distance*.72,p.height+distance*.75,distance*.95);controls.target.set(0,p.height*.4,0);controls.update()}
    function resize(){const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}
    const observer=new ResizeObserver(resize);observer.observe(host);resize();
    const viewer={fit,clear(){mesh.visible=false},update(model,color){const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(Float32Array.from(model.vertices),3));geometry.setIndex(model.triangles);const flat=geometry.toNonIndexed();geometry.dispose();flat.translate(-model.parameters.width/2,-model.parameters.depth/2,0);flat.rotateX(-Math.PI/2);flat.computeVertexNormals();mesh.geometry.dispose();mesh.geometry=flat;mesh.visible=true;material.color.set(color);if(first){first=false;fit()}},dispose(){if(disposed)return;disposed=true;observer.disconnect();controls.dispose();mesh.geometry.dispose();material.dispose();renderer.dispose();if(orgViewer===viewer)orgViewer=null}};
    orgViewer=viewer;document.getElementById('org-camera').onclick=fit;updateOrganizer();
    function loop(){if(disposed)return;if(!host.isConnected){viewer.dispose();return}controls.update();renderer.render(scene,camera);requestAnimationFrame(loop)}loop();
  }catch(e){console.error('Organizer preview',e);if(host.isConnected)host.innerHTML='<p class="mut">3D-прев’ю недоступне. Генерація та завантаження STL працюють.</p>'}
}

let generatorKind='organizer';
const generatorTabs=()=>`<div class="tabs">${[['organizer','Органайзер'],['tray','Лотки під предмети'],['vase','Вази']].map(([key,name])=>`<button class="chip ${generatorKind===key?'on':''}" data-a="genkind" data-n="${key}">${name}</button>`).join('')}</div>`;
async function admin(){
  let h=tabs([["orders",a("orders")],["calc","Калькулятор"],["generators",lang==="ru"?"Генераторы":"Генератори"],["prods",a("prods")],["cats",a("cats")],["colors",a("colors")],["plastics",a("plastics")]],asub,"asub");
  if(asub==="orders"){
    const [o,p]=await Promise.all([sb.from("orders").select("*").order("id",{ascending:false}),sb.from("profiles").select("id,first_name,last_name")]);
    const names={};(p.data||[]).forEach(x=>names[x.id]=((x.first_name||"")+" "+(x.last_name||"")).trim());
    (o.data||[]).forEach(x=>ORD[x.id]=x);
    return h+`<div class="rw" style="max-width:360px"><select data-c="cl"><option value="">${a("client")}: —</option>${Object.entries(names).map(([i,n])=>`<option value="${i}" ${i===fcl?"selected":""}>${esc(n)}</option>`).join("")}</select></div>`+
      ((o.data||[]).filter(x=>!fcl||x.user_id===fcl).map(x=>orderItem(x,true,names)).join("")||`<p class="mut">${a("empty")}</p>`);
  }
  if(asub==="calc")return h+calculatorHTML();
  if(asub==="generators")return h+generatorTabs()+(generatorKind==='organizer'?organizerHTML():window.Print3DStudio.html(generatorKind));
  if(asub==="prods"){
    const e=EP();
    return h+`<div class="card2" style="max-width:560px"><label class="f"><span>${a("title")}</span><input type="text" id="n1" value="${esc(e.title)}"></label>
    <label class="f"><span>${a("descr")}</span><textarea id="n2">${esc(e.descr)}</textarea></label>
    <div class="rw"><input type="text" id="n4" inputmode="decimal" placeholder="${a("price")}" value="${e.price??""}"><input type="text" id="n5" inputmode="numeric" placeholder="${a("mins")}" value="${e.print_minutes??""}"><input type="text" id="n6" inputmode="decimal" placeholder="${a("grams")}" value="${e.grams??""}"></div>
    <div class="rw"><select id="n8"><option value="">${a("category")}: —</option>${D.cats.map(c=>`<option value="${c.id}" ${e.category_id==c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select></div>
    <div class="rw"><select id="n9"><option value="">${a("material")}: ${a("byClient")}</option>${D.plastics.map(x=>`<option ${e.plastic===x.name?"selected":""}>${esc(x.name)}</option>`).join("")}</select></div>
    <div class="lb">${a("color")}</div><div class="chips" id="n10">${D.colors.map(c=>`<button class="chip ${(e.colors||[]).includes(c.name)?"on":""}" data-a="pc" data-n="${esc(c.name)}"><i style="background:${esc(c.hex)}"></i>${esc(c.name)}</button>`).join("")}</div>
    ${fp("n3",a("photo"),"image/*")}${fp("n7",a("model"),".stl,.3mf")}${fp("n11",a("gcode"),".gcode,.gco,.gc")}${e.gcode?`<p class="mut">G-code завантажений · новий файл замінить його</p>`:""}
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
let headerY=0,headerDirection=0,headerDistance=0;
function headerShouldHide(home,y,delta,distance,hidden){
  if(!home||y<90)return false;
  if(delta>0&&distance>64)return true;
  if(delta<0&&distance>18)return false;
  return hidden;
}
function updateHeaderScroll(reset=false){
  if(!hdr)return;const y=Math.max(0,scrollY),delta=y-headerY,direction=Math.sign(delta);
  if(reset){headerDirection=0;headerDistance=0;if(y<90)hdr.classList.remove('scroll-hidden')}
  else{if(direction&&direction!==headerDirection)headerDistance=0;headerDistance+=Math.abs(delta);if(direction)headerDirection=direction;
    hdr.classList.toggle('scroll-hidden',headerShouldHide(true,y,delta,headerDistance,hdr.classList.contains('scroll-hidden')))}
  headerY=y;
}
async function render(){
  window.Print3DStudio?.dispose();clearTimeout(orgTimer);if(orgViewer)orgViewer.dispose();
  head();let h="";
  try{
    if(tab==="home")h=home();else if(tab==="order")h=orderForm(D.products.find(p=>p.id==oopen));
    else if(tab==="fav")h=favView();else if(tab==="cart")h=cartView();else if(tab==="chat")h=await chatView();else h=await profile();
  }catch(e){console.error(e);h=`<p class="err">${a("err")}</p>`}
  view.innerHTML=h;
  if(tab==="prof"&&sub==="adm"&&asub==="calc")updateCalculator();
  if(tab==="prof"&&sub==="adm"&&asub==="generators"){if(generatorKind==='organizer')mountOrganizer();else window.Print3DStudio.mount(generatorKind,load3)}
  updateHeaderScroll(true);
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
  </div></div>`;
  modal.classList.add("show");
}
const ORD={};
function parseG(txt){
  const layers=[],moves=[],byZ=new Map();
  let x=0,y=0,z=0,e=0,f=1500,relative=false,relativeE=false,unit=1,t=0;
  let modelTime=null,totalTime=null,totalLayers=null,maxZ=null,width=.45,height=.2,role='',inModel=!/;\s*(?:CHANGE_LAYER|LAYER_CHANGE|LAYER\s*:)/i.test(txt),layerHeightKnown=false;
  const duration=s=>{let sum=0,found=false;for(const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(d(?:ays?)?|h(?:ours?)?|m(?:in(?:utes?)?)?|s(?:ec(?:onds?)?)?)/gi)){found=true;sum+=+m[1]*({d:86400,h:3600,m:60,s:1}[m[2][0].toLowerCase()])}return found?sum:null};
  function add(ax,ay,bx,by,az,bz,amount,time){
    const len=Math.hypot(bx-ax,by-ay);if(len<1e-7||amount<=0||!inModel||/custom|wipe|prime tower/i.test(role))return;
    const key=Math.round(bz*10000);let L=byZ.get(key);
    if(!L){L={z:bz,h:height,s:[],w:[],t:[],ts:[],t0:t-time};byZ.set(key,L);layers.push(L)}
    // Slicers annotate width/height. Otherwise derive deposited volume from 1.75 mm filament.
    const w=width||Math.max(.15,Math.min(1.5,amount*Math.PI*.875*.875/(len*height)+(1-Math.PI/4)*height));
    L.s.push(ax,ay,az,bx,by,bz);L.w.push(w);L.t.push(t);L.ts.push(t-time);
  }
  for(const raw of txt.split(/\r?\n/)){
    const comment=raw.slice(raw.indexOf(';')+1);
    if(raw.includes(';')){
      let m=comment.match(/model printing time\s*[:=]\s*([^;]+)/i);if(m)modelTime=duration(m[1]);
      m=comment.match(/total estimated time\s*[:=]\s*([^;]+)/i);if(m)totalTime=duration(m[1]);
      m=comment.match(/total layer number\s*[:=]\s*(\d+)/i);if(m)totalLayers=+m[1];
      m=comment.match(/max_z_height\s*[:=]\s*([\d.]+)/i);if(m)maxZ=+m[1];
      if(/^(?:\s*)(?:CHANGE_LAYER|LAYER_CHANGE|LAYER\s*:)/i.test(comment))inModel=true;
      m=comment.match(/(?:LINE_WIDTH|WIDTH)\s*[:=]\s*([\d.]+)/i);if(m)width=+m[1];
      m=comment.match(/(?:LAYER_HEIGHT|HEIGHT)\s*[:=]\s*([\d.]+)/i);if(m&&+m[1]>0){height=+m[1];layerHeightKnown=true}
      m=comment.match(/(?:FEATURE|TYPE)\s*:\s*(.*)/i);if(m)role=m[1].trim();
    }
    const line=raw.split(';')[0].replace(/\([^)]*\)/g,'').replace(/\*\d+\s*$/,'').trim();
    const match=line.match(/^(?:N\d+\s*)?([GMT])0*(\d+(?:\.\d+)?)/i);if(!match)continue;
    const cmd=match[1].toUpperCase()+Number(match[2]),p={};
    for(const m of line.slice(match[0].length).matchAll(/([A-Z])\s*([-+]?(?:\d*\.\d+|\d+\.?\d*))/gi))p[m[1].toUpperCase()]=+m[2];
    if(cmd==='G20'){unit=25.4;continue}if(cmd==='G21'){unit=1;continue}
    if(cmd==='G90'){relative=false;relativeE=false;continue}if(cmd==='G91'){relative=true;relativeE=true;continue}
    if(cmd==='M82'){relativeE=false;continue}if(cmd==='M83'){relativeE=true;continue}
    if(cmd==='G92'){if(p.X!==undefined)x=p.X*unit;if(p.Y!==undefined)y=p.Y*unit;if(p.Z!==undefined)z=p.Z*unit;if(p.E!==undefined)e=p.E*unit;continue}
    if(!['G0','G1','G2','G3'].includes(cmd))continue;
    const nx=p.X===undefined?x:p.X*unit+(relative?x:0),ny=p.Y===undefined?y:p.Y*unit+(relative?y:0),nz=p.Z===undefined?z:p.Z*unit+(relative?z:0);
    const ne=p.E===undefined?e:p.E*unit+(relativeE?e:0),amount=ne-e;if(p.F>0)f=p.F*unit;
    let points=[[nx,ny,nz]];
    if(cmd==='G2'||cmd==='G3'){
      let cx,cy;const cw=cmd==='G2',tau=2*Math.PI;
      const sweep=(a,b)=>{let d=b-a;if(cw){while(d>=-1e-9)d-=tau}else{while(d<=1e-9)d+=tau}return d};
      if(p.I!==undefined||p.J!==undefined){cx=x+(p.I||0)*unit;cy=y+(p.J||0)*unit}
      else if(p.R!==undefined){
        const dx=nx-x,dy=ny-y,chord=Math.hypot(dx,dy),radius=Math.abs(p.R*unit);
        if(chord>1e-8&&chord<=2*radius+1e-5){
          const off=Math.sqrt(Math.max(0,radius*radius-chord*chord/4));
          for(const sign of [1,-1]){const a=(x+nx)/2-sign*dy/chord*off,b=(y+ny)/2+sign*dx/chord*off,d=sweep(Math.atan2(y-b,x-a),Math.atan2(ny-b,nx-a));if((p.R>=0&&Math.abs(d)<=Math.PI+1e-7)||(p.R<0&&Math.abs(d)>=Math.PI-1e-7)){cx=a;cy=b;break}}
        }
      }
      if(cx!==undefined){const radius=Math.hypot(x-cx,y-cy),start=Math.atan2(y-cy,x-cx),delta=sweep(start,Math.atan2(ny-cy,nx-cx));
        // At most 0.02 mm chord error; never drop short curved moves.
        const step=2*Math.acos(Math.max(-1,Math.min(1,1-.02/Math.max(radius,.02)))),count=Math.max(1,Math.min(8192,Math.ceil(Math.abs(delta)/Math.min(.15,step||.15))));
        points=[];for(let i=1;i<=count;i++){const u=i/count,a=start+delta*u;points.push(i===count?[nx,ny,nz]:[cx+radius*Math.cos(a),cy+radius*Math.sin(a),z+(nz-z)*u])}
      }
    }
    let px=x,py=y,pz=z;for(const [qx,qy,qz] of points){const dt=Math.hypot(qx-px,qy-py,qz-pz)/(Math.max(1,f)/60);t+=dt;if(inModel)moves.push(px,py,pz,qx,qy,qz,t-dt,t);add(px,py,qx,qy,pz,qz,amount/points.length,dt);px=qx;py=qy;pz=qz}
    x=nx;y=ny;z=nz;e=ne;
  }
  const target=modelTime||totalTime||t,k=t?target/t:1;
  layers.sort((a,b)=>a.z-b.z);
  layers.forEach((L,i)=>{if(!layerHeightKnown)L.h=Math.max(.04,Math.min(.6,i?L.z-layers[i-1].z:L.z||.2));L.s=Float32Array.from(L.s);L.w=Float32Array.from(L.w);L.t=Float32Array.from(L.t,v=>v*k);L.ts=Float32Array.from(L.ts,v=>v*k);L.t0*=k;L.t1=L.t.length?L.t[L.t.length-1]:L.t0});
  for(let i=0;i<moves.length;i+=8){moves[i+6]*=k;moves[i+7]*=k}
  return {layers,moves:Float32Array.from(moves),T:target,modelTime,totalTime,totalLayers,maxZ};
}
function gSegmentAt(L,elapsed){
  let lo=0,hi=L.t.length;while(lo<hi){const mid=(lo+hi)>>1;if(L.t[mid]<=elapsed)lo=mid+1;else hi=mid}
  const start=L.ts[lo],end=L.t[lo];return {index:lo,fraction:lo<L.t.length?Math.max(0,Math.min(1,(elapsed-start)/Math.max(1e-9,end-start))):1};
}
function gMotionAt(moves,elapsed){
  let lo=0,hi=moves.length/8;while(lo<hi){const mid=(lo+hi)>>1;if(moves[mid*8+7]<=elapsed)lo=mid+1;else hi=mid}
  if(!moves.length)return null;const j=Math.min(lo,moves.length/8-1)*8,u=Math.max(0,Math.min(1,(elapsed-moves[j+6])/Math.max(1e-9,moves[j+7]-moves[j+6])));
  return [0,1,2].map(axis=>moves[j+axis]+(moves[j+axis+3]-moves[j+axis])*u);
}
function gLayerGeometry(T,L,cx,cy,base){
  const count=L.s.length/6,positions=new Float32Array(count*36),normals=new Float32Array(count*36),indices=new Uint32Array(count*60);
  // A flattened six-sided bead: broad top/bottom, rounded-looking filament shoulders.
  const ring=[[-.32,.5],[.32,.5],[.5,0],[.32,-.5],[-.32,-.5],[-.5,0]];
  for(let j=0;j<count;j++){
    const s=j*6,dx=L.s[s+3]-L.s[s],dy=-(L.s[s+4]-L.s[s+1]),len=Math.hypot(dx,dy),ux=-dy/len,uz=dx/len,w=L.w[j],h=L.h;
    for(let end=0;end<2;end++)for(let q=0;q<6;q++){
      const v=j*36+end*18+q*3,[side,up]=ring[q],offset=side*w;
      positions[v]=L.s[s+end*3]-cx+ux*offset;positions[v+1]=L.s[s+end*3+2]-base-h/2+up*h;positions[v+2]=-(L.s[s+end*3+1]-cy)+uz*offset;
      const n=Math.hypot(side,up);normals[v]=ux*side/n;normals[v+1]=up/n;normals[v+2]=uz*side/n;
    }
    let k=j*60,b=j*12;for(let q=0;q<6;q++){const n=(q+1)%6;indices.set([b+q,b+n,b+6+q,b+n,b+6+n,b+6+q],k);k+=6}
    for(let q=1;q<5;q++){indices.set([b,b+q+1,b+q,b+6,b+6+q,b+6+q+1],k);k+=6}
  }
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(positions,3));geo.setAttribute('normal',new T.BufferAttribute(normals,3));geo.setIndex(new T.BufferAttribute(indices,1));return geo;
}
async function gview(box,url,o){
  box.innerHTML='<p class="mut">…</p>';let G;
  try{const response=await fetch(url);if(!response.ok)throw Error('G-code download');G=parseG(await response.text())}catch(e){console.error('G-code',e);box.innerHTML='<p class="mut">'+a('err')+'</p>';return}
  if(!box.isConnected)return;if(!G.layers.length){box.innerHTML='<p class="mut">'+a('err')+'</p>';return}
  try{
    const {T,OrbitControls}=await load3();if(!box.isConnected)return;
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    for(const L of G.layers)for(let i=0;i<L.s.length;i+=3){minX=Math.min(minX,L.s[i]);maxX=Math.max(maxX,L.s[i]);minY=Math.min(minY,L.s[i+1]);maxY=Math.max(maxY,L.s[i+1])}
    const cx=(minX+maxX)/2,cy=(minY+maxY)/2,base=G.layers[0].z-G.layers[0].h,modelHeight=G.layers.at(-1).z-base,span=Math.max(maxX-minX,maxY-minY,modelHeight,1);
    const scene=new T.Scene();scene.background=new T.Color(0x111317);
    const normal=new T.MeshStandardMaterial({color:0xf39a36,roughness:.68,metalness:0,side:T.DoubleSide}),active=new T.MeshStandardMaterial({color:0xffd06a,roughness:.65,side:T.DoubleSide});
    const meshes=[];
    // Yield between batches so large files do not freeze touch/scroll controls.
    for(let i=0;i<G.layers.length;i++){const mesh=new T.Mesh(gLayerGeometry(T,G.layers[i],cx,cy,base),normal);scene.add(mesh);meshes.push(mesh);if(i%16===15){await new Promise(resolve=>setTimeout(resolve,0));if(!box.isConnected){meshes.forEach(m=>m.geometry.dispose());normal.dispose();active.dispose();return}}}
    scene.add(new T.HemisphereLight(0xffffff,0x4c5263,2.4));const light=new T.DirectionalLight(0xffffff,2.8);light.position.set(span,span*2,span);scene.add(light);
    const plateSize=Math.max(maxX-minX,maxY-minY,10)*1.25,plateGeo=new T.PlaneGeometry(plateSize,plateSize),plateMat=new T.MeshStandardMaterial({color:0x23272d,roughness:1,side:T.DoubleSide}),plate=new T.Mesh(plateGeo,plateMat);plate.rotation.x=-Math.PI/2;plate.position.y=-.06;scene.add(plate);
    const grid=new T.GridHelper(plateSize,20,0x555c65,0x343a42);grid.position.y=-.04;scene.add(grid);
    const n=meshes.length;
    box.innerHTML='<div class="g-modes"><button class="chip on" id="gm">'+a('process')+'</button><button class="chip" id="gl2" '+(!o.started?'disabled':'')+'>'+a('live')+'</button><span class="pill">PRINT3D</span></div><div class="g3box"></div><div class="gc"><button class="ib" id="gp" aria-label="Play">▶</button><input type="range" id="gs" aria-label="'+a('layer')+'" min="1" max="'+n+'" value="'+n+'"><button class="chip" id="gf">'+(lang==='ru'?'Весь объект':'Вся модель')+'</button></div><div class="g-progress"><i></i></div><div class="gl" id="gl"></div><p class="gl">'+a(o.started?'simulation':'noStart')+'</p>';
    const host=box.querySelector('.g3box');host.style.cssText='width:100%;height:min(58vh,520px);min-height:330px;border-radius:20px;overflow:hidden;cursor:grab;';
    const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));host.appendChild(renderer.domElement);renderer.domElement.style.touchAction='none';
    const camera=new T.PerspectiveCamera(42,1,Math.max(.01,span/10000),span*50),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.09;controls.enablePan=true;controls.minDistance=span*.1;controls.maxDistance=span*10;
    const center=new T.Vector3(0,modelHeight/2,0),direction=new T.Vector3(1,.8,1.3).normalize();
    function fit(){const aspect=Math.max(.1,host.clientWidth/host.clientHeight),vf=camera.fov*Math.PI/180,hf=2*Math.atan(Math.tan(vf/2)*aspect),radius=Math.hypot(maxX-minX,maxY-minY,modelHeight)/2+.5,distance=radius/Math.sin(Math.min(vf,hf)/2)*1.12;controls.target.copy(center);camera.position.copy(center).addScaledVector(direction,distance);controls.update()}
    function resize(){const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}
    resize();fit();const observer=new ResizeObserver(resize);observer.observe(host);
    const gp=box.querySelector('#gp'),slider=box.querySelector('#gs'),label=box.querySelector('#gl'),liveButton=box.querySelector('#gl2');
    const nozzle=new T.Group(),nozzleMat=new T.MeshStandardMaterial({color:0xb8c0ce,metalness:.65,roughness:.3}),tipMat=new T.MeshStandardMaterial({color:0xffaa35,metalness:.6,roughness:.35});
    const nozzleSize=Math.max(.7,Math.min(3,span*.025)),bodyGeo=new T.BoxGeometry(nozzleSize*1.5,nozzleSize*1.1,nozzleSize*1.5),tipGeo=new T.ConeGeometry(nozzleSize*.38,nozzleSize*.65,12);
    const body=new T.Mesh(bodyGeo,nozzleMat),tip=new T.Mesh(tipGeo,tipMat);body.position.y=nozzleSize*1.1;tip.rotation.z=Math.PI;tip.position.y=nozzleSize*.325;nozzle.add(body,tip);scene.add(nozzle);
    const beadGeo=gLayerGeometry(T,{s:[0,0,0,1,0,0],w:[1],h:1},0,0,0),bead=new T.Mesh(beadGeo,active);scene.add(bead);
    let selected=n,play=false,live=false,elapsed=G.T,dirty=true;
    function update(){
      if(live||play){selected=1;for(let i=0;i<n;i++)if(G.layers[i].t0<=elapsed)selected=i+1}
      nozzle.visible=bead.visible=false;
      for(let i=0;i<n;i++){const mesh=meshes[i],L=G.layers[i];mesh.visible=i<selected;mesh.material=i===selected-1?active:normal;let count=L.s.length/6;
        if((play||live)&&mesh.visible){count=gSegmentAt(L,elapsed).index}mesh.geometry.setDrawRange(0,count*60)}
      if(play||live){const L=G.layers[selected-1],cursor=gSegmentAt(L,elapsed),j=cursor.index*6;
        if(j<L.s.length){const u=cursor.fraction,x=L.s[j]+(L.s[j+3]-L.s[j])*u,y=L.s[j+1]+(L.s[j+4]-L.s[j+1])*u,z=L.s[j+2]+(L.s[j+5]-L.s[j+2])*u;
          nozzle.position.set(x-cx,z-base,-(y-cy));nozzle.visible=elapsed>=L.ts[cursor.index];
          bead.position.set(L.s[j]-cx,L.s[j+2]-base,-(L.s[j+1]-cy));bead.rotation.y=Math.atan2(y-L.s[j+1],x-L.s[j]);bead.scale.set(Math.hypot(x-L.s[j],y-L.s[j+1]),L.h,L.w[cursor.index]);bead.visible=nozzle.visible&&u>0;
        }
      }
      if(play||live){const position=gMotionAt(G.moves,elapsed);if(position){nozzle.position.set(position[0]-cx,position[2]-base,-(position[1]-cy));nozzle.visible=elapsed<G.T}}
      slider.value=selected;slider.disabled=live;gp.disabled=live;gp.textContent=play?'❚❚':'▶';liveButton.classList.toggle('on',live);box.querySelector('#gm').classList.toggle('on',!live);
      const progress=G.T?Math.min(1,elapsed/G.T):1,rem=Math.max(0,Math.ceil((G.T-elapsed)/60));box.querySelector('.g-progress i').style.width=(progress*100)+'%';
      label.textContent=a('layer')+' '+selected+' / '+n+' · '+Math.round(progress*100)+'% · '+(elapsed>=G.T?a('ready'):a('left')+' '+fmt(rem));
    }
    slider.oninput=()=>{selected=+slider.value;live=false;play=false;elapsed=G.layers[selected-1].t1;dirty=true};
    gp.onclick=()=>{live=false;if(!play&&elapsed>=G.T)elapsed=0;play=!play;dirty=true};
    liveButton.onclick=()=>{if(!o.started)return;live=true;play=false;dirty=true};
    box.querySelector('#gm').onclick=()=>{live=false;play=false;dirty=true};
    box.querySelector('#gf').onclick=()=>{selected=n;elapsed=G.T;play=live=false;fit();dirty=true};
    let last=performance.now(),disposed=false;
    function dispose(){if(disposed)return;disposed=true;observer.disconnect();controls.dispose();meshes.forEach(m=>m.geometry.dispose());normal.dispose();active.dispose();bodyGeo.dispose();tipGeo.dispose();nozzleMat.dispose();tipMat.dispose();beadGeo.dispose();plateGeo.dispose();plateMat.dispose();grid.geometry.dispose();(Array.isArray(grid.material)?grid.material:[grid.material]).forEach(m=>m.dispose());renderer.dispose()}
    function loop(now){if(!host.isConnected){dispose();return}const dt=Math.min(.1,(now-last)/1000);last=now;if(live){elapsed=["ready","shipping","delivered"].includes(o.status)?G.T:Math.max(0,Math.min(G.T,(Date.now()-o.started)/1000));dirty=true}else if(play){elapsed=Math.min(G.T,elapsed+dt*G.T/35);if(elapsed>=G.T)play=false;dirty=true}if(dirty){update();dirty=false}controls.update();renderer.render(scene,camera);requestAnimationFrame(loop)}requestAnimationFrame(loop);
  }catch(e){console.error('G-code 3D',e);if(box.isConnected)box.innerHTML='<p class="mut">'+a('err')+'</p>'}
}
function openOrder(id){
  const o=ORD[id];if(!o)return;
  const showPrint=canViewPrint(o,me.is_admin);
  const started=o.print_started_at?new Date(o.print_started_at).getTime():null;
  modal.innerHTML=`<div class="sheet glass"><button class="x" data-a="close">${ic("x")}</button>
  ${showPrint?`<div class="gv" id="gv"></div>`:`<div class="media">${o.image?`<img src="${esc(o.image)}">`:ic("cube")}</div>`}
  <div><h2>${esc(o.title)}</h2><p>${badge(o.status)}</p>
  <p class="mut">${esc([o.plastic,o.color].filter(Boolean).join(" · "))} · ${new Date(o.created_at).toLocaleDateString()}${o.qty>1?" · ×"+o.qty:""}${o.price!=null?" · "+o.price*(o.qty||1)+" грн":""}</p>
  ${o.descr?`<p class="mut">${esc(o.descr)}</p>`:""}${showPrint&&o.image?`<img src="${esc(o.image)}" style="width:100%;max-height:200px;object-fit:contain;border-radius:14px;margin-top:8px">`:""}
  ${o.file?`<p><a class="link" href="${esc(o.file)}" target="_blank">📎 файл</a></p>`:""}</div></div>`;
  modal.classList.add("show");
  if(showPrint)gview(document.getElementById("gv"),o.gcode,{status:o.status,started});
}
let T3=null;const G3={};
const load3=()=>T3||(T3=(async()=>{const B="https://cdn.jsdelivr.net/npm/three@0.160.0/";const T=await import(B+"+esm");const {OrbitControls}=await import(B+"examples/jsm/controls/OrbitControls.js/+esm");return {T,OrbitControls,B}})());
function paintModel(obj,color){
  obj.traverse(node=>{if(!node.isMesh)return;const materials=Array.isArray(node.material)?node.material:[node.material];
    materials.forEach(material=>{if(material.color)material.color.set(color);material.vertexColors=false;material.map=null;material.needsUpdate=true})});
}
async function show3d(box,url,fb,color){
  const request=Symbol('model');box.modelRequest=request;box.dataset.modelColor=color||'#ff8a1f';delete box.setModelColor;
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
    if(!box.isConnected||box.modelRequest!==request)return;
    // Keep cached geometry, but give each viewer its own materials and color.
    obj=obj.clone(true);const ownedMaterials=[];
    obj.traverse(node=>{if(!node.isMesh)return;const clone=material=>{const copy=material.clone();ownedMaterials.push(copy);return copy};node.material=Array.isArray(node.material)?node.material.map(clone):clone(node.material)});
    paintModel(obj,box.dataset.modelColor);
    let need=true;box.setModelColor=color=>{box.dataset.modelColor=color;paintModel(obj,color);need=true};
    const sz=obj.userData.size||100,sc=new T.Scene();sc.add(obj);
    sc.add(new T.HemisphereLight(0xffffff,0x332211,1.6));const dl=new T.DirectionalLight(0xffffff,1.4);dl.position.set(2,3,4);sc.add(dl);
    const dpr=Math.min(devicePixelRatio||1,1.5);
    const r=new T.WebGLRenderer({antialias:dpr<1.5,alpha:true,powerPreference:"high-performance"});r.setPixelRatio(dpr);
    const w=box.clientWidth,h=box.clientHeight;r.setSize(w,h);box.innerHTML="";box.appendChild(r.domElement);
    const cam=new T.PerspectiveCamera(48,w/h,Math.max(.01,sz/1000),sz*20);cam.position.set(sz*.62,sz*.5,sz*.78);
    const ct=new OrbitControls(cam,r.domElement);ct.enableDamping=true;ct.dampingFactor=.075;ct.enablePan=false;ct.enableZoom=true;ct.minDistance=sz*.18;ct.maxDistance=sz*4;ct.autoRotate=true;ct.autoRotateSpeed=1.5;
    ct.addEventListener("change",()=>need=true);ct.addEventListener("start",()=>{ct.autoRotate=false});
    setTimeout(()=>{ct.autoRotate=false},8000);
    (function loop(){
      if(!r.domElement.isConnected){sc.remove(obj);ct.dispose();ownedMaterials.forEach(material=>material.dispose());if(box.modelRequest===request)delete box.setModelColor;r.dispose();return}
      const ch=ct.update();if(ch||need){r.render(sc,cam);need=false}
      requestAnimationFrame(loop);
    })();
  }catch(e){console.error("3D",e);if(!box.isConnected||box.modelRequest!==request)return;box.innerHTML=fb||"";box.insertAdjacentHTML("beforeend",`<span class="e3">${a("err3d")}</span>`)}
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
  if(k==="genkind"){generatorKind=n;return render()}
  if(k==="org-download")return downloadOrganizer();
  if(k==="org-preset")return organizerPreset(n);
  if(k==="org-reset")return organizerPreset('default');
  if(k==="roundprice"){const result=readCalculator();if(result){document.getElementById("calc-rounded").textContent=moneyUA(Math.ceil(result.price))+" грн";}return}
  if(k==="new"){oopen=id;return go("order")}
  if(k==="goto"){const el=document.getElementById(n);return el&&el.scrollIntoView({behavior:"smooth",block:"start"})}
  if(k==="cf"){fcat=n===""?null:+n;document.getElementById("cg").innerHTML=catBlock();return}
  if(k==="open")return openProduct(id);
  if(k==="oopen")return openOrder(id);
  if(k==="m3d"||k==="mph"){
    const p=D.products.find(x=>x.id==id),box=document.getElementById("media");if(!p||!box)return;
    b.parentNode.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===b));
    if(k==="m3d")show3d(box,p.model,photoHTML(p),msel.color?colHex(msel.color):'#ff8a1f');else{box.modelRequest=null;delete box.setModelColor;box.innerHTML=photoHTML(p)}return;
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
    if(k.endsWith("pl")){o.plastic=n;const p=D.plastics.find(x=>x.name===n);const d=document.getElementById(m?"mpd":"pdesc");if(d)d.textContent=p?p.descr||"":""}else{o.color=n;if(m){const box=document.getElementById('media');if(box){box.dataset.modelColor=colHex(n);if(box.setModelColor)box.setModelColor(colHex(n))}}}
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
      const im=fil("n3"),md=fil("n7"),gc=fil("n11");
      const f={title:val("n1"),descr:val("n2"),price:num("n4"),print_minutes:num("n5"),grams:num("n6"),category_id:num("n8"),plastic:val("n9")||null,colors:[...document.querySelectorAll("#n10 .chip.on")].map(x=>x.dataset.n)};
      if(im)f.image=await up(im,"products");if(md){if(md.size>45e6){alert(a("big"));return}f.model=await up(md,"models")}
      if(gc)f.gcode=await up(gc,"gcode");
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
    if(c==="st"){const {error}=await sb.from("orders").update({status:t.value}).eq("id",t.dataset.id);if(error)throw error;await render()}
    if(c==="gc"&&t.files[0]){const {error}=await sb.from("orders").update({gcode:await up(t.files[0],"gcode")}).eq("id",t.dataset.id);if(error)throw error;await render()}
    if(c==="av"&&t.files[0]){const u=await up(t.files[0],"avatars");await sb.from("profiles").update({avatar:u}).eq("id",user.id);me.avatar=u;await render()}
  });
}

function initBackground(){
 if(bub)return;document.body.classList.add('bg-ready');
 bub=document.createElement('div');bub.id='bubbles';bub.setAttribute('aria-hidden','true');document.body.appendChild(bub);
 const dispose=Print3DLava.mount(bub);
 window.addEventListener('pagehide',e=>{if(!e.persisted)dispose()});
}
window.openApp=async()=>{
  CARDS.forEach(x=>$(x).classList.add("hide"));
  if(!root){
    root=document.createElement("div");root.id="app";root.innerHTML='<header class="hdr glass" id="hdr"></header><main id="view"></main>';
    document.querySelectorAll(".wrap")[1].appendChild(root);hdr=root.querySelector("#hdr");view=root.querySelector("#view");
    initBackground();
    help=document.createElement("div");help.id="help";help.className="glass";help.dataset.a="tab";help.dataset.n="chat";
    help.innerHTML=`<span class="hi">${ic("chat")}</span><span><b></b><small></small></span>`;document.body.appendChild(help);
    modal=document.createElement("div");modal.id="modal";document.body.appendChild(modal);
    modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
    let scrollPending=false;addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(()=>{scrollPending=false;updateHeaderScroll()})}},{passive:true});
    document.addEventListener('input',e=>{if(e.target.matches('[data-calc]'))updateCalculator();if(e.target.matches('[data-org]')){const input=e.target;document.querySelectorAll(`[data-org="${input.dataset.org}"]`).forEach(other=>{if(other!==input)other.value=input.value});queueOrganizerUpdate()}});
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
  root.classList.add("hide");help.style.display="none";closeModal();
  document.body.classList.remove("app-on");document.querySelectorAll(".wrap")[0].style.display="";
};
const sl=window.setLang;window.setLang=l=>{sl(l);if(root&&user&&!root.classList.contains("hide"))render()};
initBackground();
if(user)openApp();
})();
