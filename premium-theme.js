/* Theme changes never re-render forms, chats, editors or carts. */
(()=>{
  const key='print3d:theme';
  const isDark=()=>document.documentElement.dataset.theme==='dark';
  const apply=theme=>{
    document.documentElement.dataset.theme=theme;
    document.documentElement.style.colorScheme=theme;
    try{localStorage.setItem(key,theme)}catch(e){}
  };
  let saved;try{saved=localStorage.getItem(key)}catch(e){}
  apply(saved==='dark'?'dark':'light');
  window.Print3DTheme={isDark,toggle(){apply(isDark()?'light':'dark')}};
})();
