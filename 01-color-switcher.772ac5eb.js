function e(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}const t=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");let d=null;t.addEventListener("click",(t=>{document.querySelector("body").style.backgroundColor=e(),d=setInterval((()=>{document.querySelector("body").style.backgroundColor=e()}),1e3),t.currentTarget.disabled=!0,r.disabled=!1})),r.addEventListener("click",(e=>{clearInterval(d),t.disabled=!1,e.currentTarget.disabled=!0}));
//# sourceMappingURL=01-color-switcher.772ac5eb.js.map