(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{232:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return p});n(15),n(8),n(243),n(244);var a=n(251),r=n(83),c=n.n(r),o=n(0),i=n.n(o),l=n(245),s=n.n(l),u=n(241),f=n(66),m="undefined"!=typeof window?window.localStorage:{getItem:function(){},setItem:function(){}},d=function(e){var t=e.to,n=e.title,a=e.date,r=e.spoiler;return i.a.createElement("article",null,i.a.createElement("h3",{className:"blog-index",style:{marginBottom:Object(f.a)(.25)}},i.a.createElement(c.a,{tabIndex:-1,style:{boxShadow:"none"},to:t},n)),i.a.createElement("div",{style:{color:"var(--text-secondary)"}},i.a.createElement("time",null,i.a.createElement("small",null,a)),i.a.createElement("p",{dangerouslySetInnerHTML:{__html:r}})))};t.default=function(e){var t=e.location,n=e.data,r=e.navigate,c=n.site.siteMetadata.title,l=n.allMarkdownRemark.edges,f=Object(o.useRef)(),p=Object(o.useRef)(+m.getItem("selectedIndex")||-1);Object(o.useEffect)(function(){var e=p.current;f.current&&!Number.isNaN(e)&&-1!==e&&(f.current.firstChild.children[e].focus(),m.setItem("selectedIndex",null))},[f]);var g=Object(o.useRef)(),b=Object(o.useCallback)(function(e){var t=e.key.toLowerCase(),n=p.current;switch(t){case"tab":e.preventDefault();break;case"arrowdown":case"j":n<l.length-1&&(p.current=++n),f.current.firstChild.children[n].focus();break;case"arrowup":case"k":if(n<1)return;p.current=--n,f.current.firstChild.children[n].focus(),n||document.body.scrollIntoView();break;case"g":e.shiftKey?p.current=n=l.length-1:e.key===g.current.key&&e.metaKey===g.current.metaKey&&(p.current=n=0),f.current.firstChild.children[n].focus()}g.current=e},[l.length]);return Object(o.useEffect)(function(){return window.addEventListener("keydown",b),function(){window.removeEventListener("keydown",b)}},[]),i.a.createElement(u.a,{location:t,title:c},i.a.createElement(s.a,{title:c,htmlAttributes:{lang:"zh-cn"}}),i.a.createElement("nav",{ref:f},i.a.createElement(a.a,{defaultIsOpen:!0,initialIsOpen:!0,itemToString:function(e){return e?e.title:""}},function(e){var n=e.getMenuProps,a=e.getItemProps;return i.a.createElement("ol",n({},{suppressRefError:!0}),l.map(function(e,n){var c=e.node,o=c.fields.slug,l=c.frontmatter,s=l.title,u=void 0===s?o:s,f=l.spoiler,p=l.date;return i.a.createElement("li",Object.assign({tabIndex:0},a({key:c.fields.slug,index:n,onKeyDown:function(e){switch(e.preventDefault(),e.key.toLowerCase()){case"enter":case" ":m.setItem("selectedIndex",n),r((t.pathname+o).replace(/\/{2}/g,"/"))}},item:c.frontmatter})),i.a.createElement(d,{to:o,title:u,date:p,spoiler:f||c.excerpt}))}))})))};var p="2168062249"},235:function(e,t,n){var a;e.exports=(a=n(239))&&a.default||a},236:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(108),o=n(66),i=n(238),l=n.n(i);function s(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  display: flex;\n  flex-direction: column;\n  h3 {\n    margin: 8px 0;\n    font-size: 16px;\n  }\n"]);return s=function(){return e},e}var u=c.a.aside(s());t.a=function(){return r.a.createElement("figure",{style:{display:"flex",alignItems:"center"}},r.a.createElement("img",{src:l.a,alt:"A cat named musa",style:{marginRight:Object(o.a)(.5),marginBottom:0,borderRadius:"50%",width:Object(o.a)(2),height:Object(o.a)(2)}}),r.a.createElement(u,null,r.a.createElement("h3",null,r.a.createElement("span",{role:"img","aria-label":"personal blogs"},"👤 📜")," ","by ",r.a.createElement("a",{href:"http://github.com/thoamsy"},"thoamsy")),r.a.createElement("h3",null,"Write some personal summary")))}},237:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(83),o=n.n(c);n.d(t,"a",function(){return o.a});n(235),n(12).default.enqueue,r.a.createContext({})},238:function(e,t,n){e.exports=n.p+"static/avatar-6c83ccb0db60a97539ade1fe12738717.jpg"},239:function(e,t,n){"use strict";n.r(t);n(15);var a=n(0),r=n.n(a),c=n(116);t.default=function(e){var t=e.location,n=e.pageResources;return n?r.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json)):null}},240:function(e,t){!function(e){"object"!=typeof globalThis&&(e.defineProperty(e.prototype,"foobar",{get:function(){this.globalThis=this,delete e.prototype.foobar},configurable:!0}),foobar)}(Object)},241:function(e,t,n){"use strict";n(15);var a=n(237),r=(n(230),n(0)),c=n.n(r),o=n(108),i=(n(240),n(66)),l=n(236);function s(){var e=f(["\n  .page-enter & {\n    transform: translateX(100%);\n    opacity: 0;\n    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n  }\n\n  .page-enter-active & {\n    opacity: 1;\n    transform: translateX(0);\n  }\n\n  .page-exit & {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  .page-exit-active & {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n"]);return s=function(){return e},e}function u(){var e=f(["\n  .page-enter & {\n    opacity: 0;\n    transform: translateX(-100%);\n    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n  }\n  .page-enter-active & {\n    opacity: 1;\n    transform: translateX(0);\n  }\n  .page-exit & {\n    opacity: 1;\n    transform: translateX(0);\n  }\n  .page-exit-active & {\n    opacity: 0;\n    transform: translateX(-100%);\n  }\n"]);return u=function(){return e},e}function f(e,t){return t||(t=e.slice(0)),e.raw=t,e}var m=o.a.div(u()),d=o.a.div(s());function p(){var e=b(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2.625rem;\n"]);return p=function(){return e},e}function g(){var e=b(["\n  box-shadow: none;\n  text-decoration: none;\n  color: var(--text-title);\n"]);return g=function(){return e},e}function b(e,t){return t||(t=e.slice(0)),e.raw=t,e}var h=Object(o.a)(a.a).attrs({to:"/"})(g()),v=o.a.header(p()),y=function(e){e.location;var t=e.isRoot,n=e.title;return t?c.a.createElement("h1",{style:Object.assign({},Object(i.b)(1),{marginBottom:0,marginTop:0})},c.a.createElement(h,null,n)):c.a.createElement("h3",{style:{fontFamily:"sans-serif",marginTop:0,marginBottom:Object(i.a)(-1)}},c.a.createElement(h,null,n))},E=function(e){var t=e.location,n=e.title,a=e.isRoot;return Object(r.useEffect)(function(){var e=function(e){var t=e.matches;document.body.className=t?"dark":"light"},t=window.matchMedia("(prefers-color-scheme: dark)");return t&&t.addListener(e),e({matches:t.matches}),function(){return t&&t.removeListener(e)}},[]),c.a.createElement(c.a.Fragment,null,c.a.createElement(v,null,c.a.createElement(y,{title:n,location:t,isRoot:a})),a&&c.a.createElement(l.a,null))};t.a=function(e){var t=e.location,n=e.title,a=e.children,r="/";r="/";var o=t.pathname===r,i=o?m:d;return c.a.createElement(i,null,c.a.createElement(E,{isRoot:o,title:n,location:t}),a)}}}]);
//# sourceMappingURL=component---src-pages-index-js-9854f30c4f66e4031e2c.js.map