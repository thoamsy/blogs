(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{147:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return s});a(33);var n=a(0),r=a.n(n),c=a(152),o=a(154),l=a(156),u=a(150),i=function(e){var t=e.previous,a=e.next;return r.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},r.a.createElement("li",null,t&&r.a.createElement(c.a,{to:t.fields.slug,rel:"prev"},"← ",t.frontmatter.title)),r.a.createElement("li",null,a&&r.a.createElement(c.a,{to:a.fields.slug,rel:"next"},a.frontmatter.title," →")))};t.default=function(e){var t=e.location,a=e.pageContext,n=e.data,c=n.markdownRemark,s=n.site.siteMetadata.title;return r.a.createElement(l.a,{location:t,title:s},r.a.createElement("header",null,r.a.createElement("h1",{style:{color:"var(--textTitle)",transition:"color 0.3s ease-out, background 0.3s ease-out"}},c.frontmatter.title),r.a.createElement("p",{style:Object.assign({},Object(u.b)(-.2),{display:"block",marginBottom:Object(u.a)(1),marginTop:Object(u.a)(-1)})},c.frontmatter.date)),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:c.html}}),r.a.createElement("hr",{style:{marginBottom:Object(u.a)(1)}}),r.a.createElement(o.a,null),r.a.createElement("br",null),r.a.createElement(i,a))};var s="332236514"},150:function(e,t,a){"use strict";a.d(t,"a",function(){return u}),a.d(t,"b",function(){return i});var n=a(158),r=a.n(n),c=a(159),o=a.n(c);a(160);o.a.overrideThemeStyles=function(){return{a:{color:"var(--textLink)"},hr:{background:"var(--hr)"},"a.gatsby-resp-image-link":{boxShadow:"none"},"a.anchor":{boxShadow:"none"},'a.anchor svg[aria-hidden="true"]':{stroke:"var(--textLink)"},"p code":{fontSize:"1rem"},"h1 code, h2 code, h3 code, h4 code, h5 code, h6 code":{fontSize:"inherit"},"li code":{fontSize:"1rem"},blockquote:{color:"inherit",borderLeftColor:"inherit",opacity:"0.8"},"blockquote.translation":{fontSize:"1em"}}},delete o.a.googleFonts;var l=new r.a(o.a);var u=l.rhythm,i=l.scale},151:function(e,t,a){var n;e.exports=(n=a(153))&&n.default||n},152:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(4),o=a.n(c),l=a(32),u=a.n(l);a.d(t,"a",function(){return u.a});a(151),r.a.createContext({});o.a.object,o.a.string.isRequired,o.a.func,o.a.func},153:function(e,t,a){"use strict";a.r(t);a(33);var n=a(0),r=a.n(n),c=a(4),o=a.n(c),l=a(55),u=a(2),i=function(e){var t=e.location,a=u.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(l.a,Object.assign({location:t,pageResources:a},a.json))};i.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=i},154:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(155),o=a.n(c),l=a(150);t.a=function(){return r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("img",{src:o.a,alt:"A cat named musa",style:{marginRight:Object(l.a)(.5),marginBottom:0,borderRadius:"50%",width:Object(l.a)(2),height:Object(l.a)(2)}}),r.a.createElement("h4",{style:{margin:0}},"Just Happy"))}},155:function(e,t,a){e.exports=a.p+"static/avatar-6c83ccb0db60a97539ade1fe12738717.jpg"},156:function(e,t,a){"use strict";(function(e){a(33);var n=a(161),r=a.n(n),c=a(0),o=a.n(c),l=a(164),u=a(152),i=a(157),s=(a(163),a(150));function d(){var e=r()(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2.625rem;\n"]);return d=function(){return e},e}function h(){var e=r()(["\n  box-shadow: none;\n  text-decoration: none;\n  color: var(--textTitle);\n"]);return h=function(){return e},e}function m(){var e=r()(["\n  color: var(--textNormal);\n  background: var(--bg);\n  transition: color 0.3s ease-out, background 0.3s ease-out;\n  min-height: 100vh;\n"]);return m=function(){return e},e}var f=l.a.main(m()),g=Object(l.a)(u.a).attrs({to:"/"})(h()),b=l.a.header(d());t.a=function(t){var a,n=t.location,r=t.title,l=t.children,u=Object(c.useState)(function(){return"dark"===(a=(e||window).__preferTheme)}),d=u[0],h=u[1];Object(c.useEffect)(function(){var e=function(e){var t=e.matches;document.body.className=t?"dark":"light",h(t)},t=window.matchMedia("(prefers-color-scheme: dark)");return t&&t.addListener(e),e({matches:void 0===a?t.matches:d}),function(){return t&&t.removeListener(e)}},[]);var m,v="/";return v="/blogs/",m=n.pathname===v?o.a.createElement("h1",{style:Object.assign({},Object(s.b)(1),{marginBottom:0,marginTop:0})},o.a.createElement(g,null,r)):o.a.createElement("h3",{style:{fontFamily:"sans-serif",marginTop:0,marginBottom:Object(s.a)(-1)}},o.a.createElement(g,null,r)),o.a.createElement(f,null,o.a.createElement("article",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(s.a)(24),padding:Object(s.a)(1.5)+" "+Object(s.a)(.75)}},o.a.createElement(b,null,m,o.a.createElement(i.a,{checked:d,icons:{checked:o.a.createElement("span",null,"🌚"),unchecked:o.a.createElement("span",null,"🌞")},onChange:function(e){var t=e?"dark":"light";document.body.className=t,h(e),localStorage.setItem("theme",t)}})),l))}}).call(this,a(73))},157:function(e,t,a){"use strict";a(33);var n=a(74),r=a.n(n),c=a(0),o=a.n(c),l=(a(162),function(){});function u(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var a=t[0];return{x:a.clientX,y:a.clientY}}var n=e.pageX;if(void 0!==n)return{x:n,y:e.pageY}}return{x:0,y:0}}t.a=function e(t){var a=t.onChange,n=r()(t,["onChange"]),i=Object(c.useRef)(null),s=Object(c.useRef)({moved:!1,previouslyChecked:!(!n.checked&&!n.defaultChecked),touchMoved:!1,startX:null,hadFocusAtTouchStart:!1,touchStarted:!1}),d=Object(c.useState)(!1),h=d[0],m=d[1],f=Object(c.useCallback)(function(e){var t=i.current;if(s.current.previouslyChecked=t.checked,e.target!==t&&s.current.moved)return e.preventDefault(),t.focus(),void t.click();a(!t.checked)},[i,s]),g=Object(c.useCallback)(function(e){Object.assign(s.current,{startX:u(e).x,touchStarted:!0,hadFocusAtTouchStart:h}),m(!0)},[s]),b=Object(c.useCallback)(function(e){if(s.current.touchStarted){s.current.touchMoved=!0;var t=s.current.startX;if(null!=t){var n=u(e).x;x&&n+15<t?(a(!1),s.current.startX=n):!x&&n-15>t&&(a(!0),s.current.startX=n)}}},[s]),v=Object(c.useCallback)(function(e){var t=s.current,a=t.touchMoved,n=t.startX,r=t.previouslyChecked,c=t.hadFocusAtTouchStart;if(a){var o=i.current;e.preventDefault(),null!=n&&(r!==x&&o.click(),Object.assign(s.current,{touchedStarted:!1,startX:null,touchMoved:!1})),c||m(!1)}},[s]),p=Object(c.useCallback)(function(){var e=s.current,t=e.startX,a=e.hadFocusAtTouchStart;null!=t&&Object.assign(s.current,{touchStarted:!1,startX:null,touchMoved:!1}),a&&m(!1)},[s]),k=Object(c.useCallback)(function(e){n.onFocus&&n.onFocus(e),s.current.hadFocusAtTouchStart=!0,m(!0)},[s]),j=Object(c.useCallback)(function(e){n.onBlur&&n.onBlur(e),s.hadFocusAtTouchStart=!1,m(!1)},[s]),y=function(t){var a=n.icons;return a?void 0===a[t]?e.defaultProps.icons[t]:a[t]:null},E=n.className,O=(n.icons,n.disabled),x=n.checked,S=r()(n,["className","icons","disabled","checked"]),w="react-toggle"+(x?" react-toggle--checked":"")+(h?" react-toggle--focus":"")+(O?" react-toggle--disabled":"")+(E?" "+E:"");return o.a.createElement("div",{className:w,onClick:f,onTouchStart:g,onTouchMove:b,onTouchEnd:v,onTouchCancel:p},o.a.createElement("div",{className:"react-toggle-track"},o.a.createElement("div",{className:"react-toggle-track-check"},y("checked")),o.a.createElement("div",{className:"react-toggle-track-x"},y("unchecked"))),o.a.createElement("div",{className:"react-toggle-thumb"}),o.a.createElement("input",Object.assign({},S,{checked:x,onChange:l,ref:i,onFocus:k,onBlur:j,className:"react-toggle-screenreader-only",type:"checkbox","aria-label":"Switch between Dark and Light mode"})))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-fa141c9009765d540d18.js.map