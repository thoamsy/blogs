(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{131:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return m});var a=n(0),r=n.n(a),i=n(133),o=n.n(i),c=n(141),u=n.n(c),l=(n(160),n(140)),s=n(138),d=n(134);t.default=function(e){var t=e.location,n=e.data,a=n.site.siteMetadata.title,i=n.allMarkdownRemark.edges;return r.a.createElement(l.a,{location:t,title:a},r.a.createElement(u.a,{title:a,htmlAttributes:{lang:"zh-cn"}}),r.a.createElement(s.a,null),i.map(function(e){var t=e.node,n=t.frontmatter.title||t.fields.slug;return r.a.createElement("div",{key:t.fields.slug},r.a.createElement("h3",{className:"blog-index",style:{marginBottom:Object(d.a)(.25)}},r.a.createElement(o.a,{style:{boxShadow:"none"},to:t.fields.slug},n)),r.a.createElement("small",null,t.frontmatter.date),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.excerpt}}))}))};var m="3880392878"},134:function(e,t,n){"use strict";n.d(t,"a",function(){return u}),n.d(t,"b",function(){return l});var a=n(146),r=n.n(a),i=n(147),o=n.n(i);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete o.a.googleFonts;var c=new r.a(o.a);var u=c.rhythm,l=c.scale},135:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return p}),n.d(t,"StaticQueryContext",function(){return m}),n.d(t,"StaticQuery",function(){return f});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(133),u=n.n(c);n.d(t,"Link",function(){return u.a}),n.d(t,"withPrefix",function(){return c.withPrefix}),n.d(t,"navigate",function(){return c.navigate}),n.d(t,"push",function(){return c.push}),n.d(t,"replace",function(){return c.replace}),n.d(t,"navigateTo",function(){return c.navigateTo});var l=n(136),s=n.n(l);n.d(t,"PageRenderer",function(){return s.a});var d=n(29);n.d(t,"parsePath",function(){return d.a});var m=r.a.createContext({}),f=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function p(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},136:function(e,t,n){var a;e.exports=(a=n(137))&&a.default||a},137:function(e,t,n){"use strict";n.r(t);n(28);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(49),u=n(2),l=function(e){var t=e.location,n=u.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json))};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=l},138:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=(n(144),n(145),n(139)),o=n.n(i),c=n(134);t.a=function(){return r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("img",{src:o.a,alt:"A cat named musa",style:{marginRight:Object(c.a)(.5),marginBottom:0,borderRadius:"50%",width:Object(c.a)(2),height:Object(c.a)(2)}}),r.a.createElement("h4",{style:{margin:0}},"Just Happy"))}},139:function(e,t,n){e.exports=n.p+"static/profile-pic-6b7afd22a39ed60d2b081c18b1bc0000.jpg"},140:function(e,t,n){"use strict";n(28);var a=n(6),r=n.n(a),i=n(0),o=n.n(i),c=n(135),u=(n(148),n(134)),l=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e,t=this.props,n=t.location,a=t.title,r=t.children;return e="/blogs/"===n.pathname?o.a.createElement("h1",{style:Object.assign({},Object(u.b)(1),{marginBottom:Object(u.a)(1.5),marginTop:0})},o.a.createElement(c.Link,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)):o.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:Object(u.a)(-1)}},o.a.createElement(c.Link,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)),o.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(u.a)(24),padding:Object(u.a)(1.5)+" "+Object(u.a)(.75)}},e,r)},t}(o.a.Component);t.a=l},160:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-index-js-84ebac21b5c84ea8a57a.js.map