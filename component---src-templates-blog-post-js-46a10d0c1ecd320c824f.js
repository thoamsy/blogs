(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{180:function(e,t,a){"use strict";a.r(t);a(40);var n=a(0),r=a.n(n),c=a(28),o=a(183),l=a(184),i=function(e){var t=e.previous,a=e.next;return r.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},r.a.createElement("li",null,t&&r.a.createElement(l.a,{to:t.fields.slug,rel:"prev"},"← ",t.frontmatter.title)),r.a.createElement("li",null,a&&r.a.createElement(l.a,{to:a.fields.slug,rel:"next"},a.frontmatter.title," →")))},s=a(188);a.d(t,"pageQuery",function(){return u});t.default=function(e){var t=e.location,a=e.pageContext,n=e.data,l=n.markdownRemark,u=n.site.siteMetadata.title;return r.a.createElement(s.a,{location:t,title:u},r.a.createElement("hgroup",null,r.a.createElement("h1",{style:{color:"var(--textTitle)",transition:"color 0.3s ease-out, background 0.3s ease-out"}},l.frontmatter.title),r.a.createElement("time",{style:Object.assign({},Object(c.b)(-.2),{display:"block",marginBottom:Object(c.a)(1),marginTop:Object(c.a)(-1)})},l.frontmatter.date)),r.a.createElement("main",{style:{fontSize:Object(c.a)(.7)},dangerouslySetInnerHTML:{__html:l.html}}),r.a.createElement("hr",{style:{marginBottom:Object(c.a)(1)}}),r.a.createElement("footer",null,r.a.createElement(o.a,null),r.a.createElement("br",null),r.a.createElement(i,a)))};var u="332236514"},182:function(e,t,a){var n;e.exports=(n=a(186))&&n.default||n},183:function(e,t,a){"use strict";var n=a(64),r=a.n(n),c=a(0),o=a.n(c),l=a(65),i=a(28),s=a(185),u=a.n(s);function m(){var e=r()(["\n  display: flex;\n  flex-direction: column;\n  h3 {\n    margin: 8px 0;\n    font-size: 16px;\n  }\n"]);return m=function(){return e},e}var d=l.a.aside(m());t.a=function(){return o.a.createElement("figure",{style:{display:"flex",alignItems:"center"}},o.a.createElement("img",{src:u.a,alt:"A cat named musa",style:{marginRight:Object(i.a)(.5),marginBottom:0,borderRadius:"50%",width:Object(i.a)(2),height:Object(i.a)(2)}}),o.a.createElement(d,null,o.a.createElement("h3",null,o.a.createElement("span",{role:"img","aria-label":"personal blogs"},"👤 📜")," ","by ",o.a.createElement("a",{href:"http://github.com/thoamsy"},"thoamsy")),o.a.createElement("h3",null,"Write some personal summary")))}},184:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(3),o=a.n(c),l=a(39),i=a.n(l);a.d(t,"a",function(){return i.a});a(182),r.a.createContext({});o.a.object,o.a.string.isRequired,o.a.func,o.a.func},185:function(e,t,a){e.exports=a.p+"static/avatar-6c83ccb0db60a97539ade1fe12738717.jpg"},186:function(e,t,a){"use strict";a.r(t);a(40);var n=a(0),r=a.n(n),c=a(3),o=a.n(c),l=a(70),i=a(2),s=function(e){var t=e.location,a=i.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(l.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},187:function(e,t){!function(e){"object"!=typeof globalThis&&(e.defineProperty(e.prototype,"foobar",{get:function(){this.globalThis=this,delete e.prototype.foobar},configurable:!0}),foobar)}(Object)},188:function(e,t,a){"use strict";a(40);var n=a(64),r=a.n(n),c=a(184),o=(a(175),a(0)),l=a.n(o),i=a(65),s=(a(187),a(28)),u=a(183),m=a(93),d=a.n(m),f=(a(176),function(){});var g=function e(t){var a=t.onChange,n=d()(t,["onChange"]),r=n.className,c=(n.icons,n.disabled),i=n.onFocus,s=n.checked,u=d()(n,["className","icons","disabled","onFocus","checked"]),m=Object(o.useRef)(null),g=Object(o.useRef)({moved:!1,previouslyChecked:!(!n.checked&&!n.defaultChecked),touchMoved:!1,startX:null,hadFocusAtTouchStart:!1,touchStarted:!1}),p=Object(o.useState)(!1),h=p[0],b=p[1],v=Object(o.useCallback)(function(e){var t=m.current;if(g.current.previouslyChecked=t.checked,e.target!==t&&g.current.moved)return e.preventDefault(),t.focus(),void t.click();a(!t.checked)},[a]),y=Object(o.useCallback)(function(e){i&&i(e),g.current.hadFocusAtTouchStart=!0,b(!0)},[i]),E=function(t){var a=n.icons;return a?void 0===a[t]?e.defaultProps.icons[t]:a[t]:null},k="react-toggle"+(s?" react-toggle--checked":"")+(h?" react-toggle--focus":"")+(c?" react-toggle--disabled":"")+(r?" "+r:"");return l.a.createElement("div",{className:k,onClick:v},l.a.createElement("div",{className:"react-toggle-track"},l.a.createElement("div",{className:"react-toggle-track-check"},E("checked")),l.a.createElement("div",{className:"react-toggle-track-x"},E("unchecked"))),l.a.createElement("div",{className:"react-toggle-thumb"}),l.a.createElement("input",Object.assign({},u,{checked:s,onChange:f,ref:m,onFocus:y,className:"react-toggle-screenreader-only",type:"checkbox","aria-label":"Switch between Dark and Light mode"})))};function p(){var e=r()(["\n  .page-enter & {\n    transform: translateX(100%);\n    opacity: 0;\n    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n  }\n\n  .page-enter-active & {\n    opacity: 1;\n    transform: translateX(0);\n  }\n\n  .page-exit & {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  .page-exit-active & {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n"]);return p=function(){return e},e}function h(){var e=r()(["\n  .page-enter & {\n    opacity: 0;\n    transform: translateX(-100%);\n    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n  }\n  .page-enter-active & {\n    opacity: 1;\n    transform: translateX(0);\n  }\n  .page-exit & {\n    opacity: 1;\n    transform: translateX(0);\n  }\n  .page-exit-active & {\n    opacity: 0;\n    transform: translateX(-100%);\n  }\n"]);return h=function(){return e},e}var b=i.a.div(h()),v=i.a.div(p());function y(){var e=r()(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2.625rem;\n"]);return y=function(){return e},e}function E(){var e=r()(["\n  box-shadow: none;\n  text-decoration: none;\n  color: var(--textTitle);\n"]);return E=function(){return e},e}var k=Object(i.a)(c.a).attrs({to:"/"})(E()),j=i.a.header(y()),x=function(e){e.location;var t=e.isRoot,a=e.title;return t?l.a.createElement("h1",{style:Object.assign({},Object(s.b)(1),{marginBottom:0,marginTop:0})},l.a.createElement(k,null,a)):l.a.createElement("h3",{style:{fontFamily:"sans-serif",marginTop:0,marginBottom:Object(s.a)(-1)}},l.a.createElement(k,null,a))},O=function(e){var t,a=e.location,n=e.title,r=e.isRoot,c=Object(o.useState)(function(){return"undefined"!=typeof localStorage&&"dark"===(t=localStorage.getItem("theme"))}),i=c[0],s=c[1];return Object(o.useEffect)(function(){var e=function(e){var t=e.matches;document.body.className=t?"dark":"light",s(t)},a=window.matchMedia("(prefers-color-scheme: dark)");return a&&a.addListener(e),e({matches:void 0===t?a.matches:i}),function(){return a&&a.removeListener(e)}},[]),l.a.createElement(l.a.Fragment,null,l.a.createElement(j,null,l.a.createElement(x,{title:n,location:a,isRoot:r}),l.a.createElement(g,{checked:i,icons:{checked:l.a.createElement("span",null,"🌚"),unchecked:l.a.createElement("span",null,"🌞")},onChange:function(e){var t=e?"dark":"light";document.body.className=t,s(e),localStorage.setItem("theme",t)}})),r&&l.a.createElement(u.a,null))};t.a=function(e){var t=e.location,a=e.title,n=e.children,r="/";r="/blogs/";var c=t.pathname===r,o=c?b:v;return l.a.createElement(o,null,l.a.createElement(O,{isRoot:c,title:a,location:t}),n)}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-46a10d0c1ecd320c824f.js.map