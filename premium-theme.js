/* Theme changes never re-render forms, chats, editors or carts. */
(()=>{
  const key='print3d:theme';
  const isDark=()=>document.documentElement.dataset.theme==='dark';
  let pendingFrame;
  const apply=theme=>{
    const root=document.documentElement;
    // Block inherited color transitions before changing the shared palette.
    root.classList?.add('theme-switching');
    document.documentElement.dataset.theme=theme;
    document.documentElement.style.colorScheme=theme;
    try{localStorage.setItem(key,theme)}catch(e){}
    // Resolve all styles while transitions are blocked. Keep the guard through
    // the next paint so even nested panels adopt the same palette together.
    void root.offsetHeight;
    if(typeof requestAnimationFrame==='function'){
      if(pendingFrame)cancelAnimationFrame(pendingFrame);
      pendingFrame=requestAnimationFrame(()=>{pendingFrame=requestAnimationFrame(()=>{
        root.classList?.remove('theme-switching');pendingFrame=null;
      })});
    }else root.classList?.remove('theme-switching');
  };
  let saved;try{saved=localStorage.getItem(key)}catch(e){}
  apply(saved==='dark'?'dark':'light');
  window.Print3DTheme={isDark,toggle(){apply(isDark()?'light':'dark')}};
})();
