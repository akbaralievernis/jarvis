(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[558],{3267:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var i=t(4924),o=t(5893),a=t(7294),r=t(6010),s=t(8022),c=t(793),l=t(1640),u=t(7548),d=function(e){var n={root:{position:"fixed",zIndex:1,top:0,left:0,width:"100%",height:"var(--vh)",overflow:"hidden",pointerEvents:"none",padding:"var(--margin)",display:"flex",alignItems:"flex-start",justifyContent:"flex-end",flexDirection:"column","& a, & button":{pointerEvents:function(e){return e.ready?"all":"none"},transition:"opacity .2s ease-out","@media (hover: hover)":{"&:hover":{opacity:.5}}}},links:{opacity:.6,display:"flex",extend:e.typography.footerLink,"& > div":{marginRight:10}},copy:{opacity:.5,marginTop:5,extend:e.typography.footerCopy},socials:{opacity:.6,display:"flex",extend:e.typography.footerCopy,position:"absolute",zIndex:2,right:125,bottom:"var(--margin)","& > div":{marginLeft:10}}};return n[e.mq.sm]={copy:{marginTop:9},socials:{position:"static",marginTop:9,"& > div":{marginLeft:0,marginRight:10}}},n},p=(0,s.QM)(d);function h(e){var n,t=e.className,s=e.ready,d=e.type,h=p({ready:s}),f=(0,a.useRef)();(0,c.Z)(f,s);var g=function(e){e.preventDefault();var n=document.querySelector(".iubenda-cs-preferences-link");null==n||n.removeAttribute("style"),null==n||n.click()};return(0,o.jsxs)("div",{ref:f,className:(0,r.Z)((n={},(0,i.Z)(n,h.root,!0),(0,i.Z)(n,h.inNav,"nav"===d),(0,i.Z)(n,t,t),n)),children:[(0,o.jsxs)("div",{className:h.links,children:[(0,o.jsx)(u.Z,{children:(0,o.jsx)(l.Z,{inview:s,link:"https://www.studiogusto.com",target:"_blank",value:"Credits",type:"lines",enterDelay:"nav"===d?1:0,exitDelay:.5,once:!1})}),(0,o.jsx)(u.Z,{children:(0,o.jsx)(l.Z,{inview:s,link:"https://www.iubenda.com/privacy-policy/35517576",target:"_blank",value:"Privacy Policy",type:"lines",enterDelay:"nav"===d?1.1:.1,exitDelay:.4,once:!1})}),(0,o.jsx)(u.Z,{children:(0,o.jsx)(l.Z,{inview:s,link:"https://www.iubenda.com/privacy-policy/35517576/cookie-policy",target:"_blank",value:"Cookies Settings",type:"lines",onClick:g,enterDelay:"nav"===d?1.2:.2,exitDelay:.3,once:!1})})]}),(0,o.jsx)("div",{className:h.copy,children:(0,o.jsx)(u.Z,{children:(0,o.jsx)(l.Z,{inview:s,value:"Copyright 2022 Rossinavi . VAT number 01431670460",type:"lines",enterDelay:"nav"===d?1.3:.3,exitDelay:.2,once:!1})})}),(0,o.jsxs)("div",{className:h.socials,children:[(0,o.jsx)(u.Z,{children:(0,o.jsx)(l.Z,{inview:s,link:"https://www.facebook.com/Rossinavi/",target:"_blank",value:"Facebook",type:"lines",enterDelay:"nav"===d?1.4:.4,exitDelay:.1,once:!1})}),(0,o.jsx)(u.Z,{children:(0,o.jsx)(l.Z,{inview:s,link:"https://instagram.com/rossinavi",target:"_blank",value:"Instagram",type:"lines",enterDelay:"nav"===d?1.5:.5,exitDelay:0,once:!1})})]})]})}h.defaultProps={};var f=(0,a.memo)(h)},9599:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return C}});var i=t(4924),o=t(5893),a=t(7294),r=t(6010),s=t(8022),c=t(2775),l=t(828),u=t(619),d=t(4682),p=t(7410),h=t(7245),f=t(7469),g=function(e){var n={root:{position:"absolute",zIndex:-1,top:0,left:0,width:"100vw",height:"var(--vh)",background:e.colors[0]},bigWrap:{position:"absolute",zIndex:1,top:"50%",left:"50%",width:1127,height:634,transformOrigin:"50% 50%",transform:"translate(-50%, -50%) rotate(-20deg)"},big:{position:"absolute",display:"flex",flexWrap:"nowrap",zIndex:1,top:0,left:0,width:"100vw",height:"var(--vh)",opacity:.3},imgBig:{zIndex:1,width:1127,height:634,maxWidth:"none"},hotPoint:{position:"absolute",zIndex:3,top:"50%",left:"50%",width:300,height:300,transform:"translate(-50%, -50%)",mixBlendMode:"screen"},smallWrap:{position:"absolute",zIndex:2,top:"50%",left:"50%",width:300,height:300,transform:"translate(-50%, -50%)",clipPath:"polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"},small:{position:"absolute",display:"flex",flexWrap:"nowrap",zIndex:1,top:0,left:0,width:"100%",height:"100%"},imgSmall:{zIndex:1,width:300,height:300,maxWidth:"none"}};return n[e.mq.sm]={bigWrap:{width:722,height:406},imgBig:{width:722,height:406},hotPoint:{width:194,height:194},smallWrap:{width:194,height:194},imgSmall:{width:194,height:194,maxWidth:"none"}},n},v=(0,s.QM)(g),m=function(e){var n,t=e.className,s=e.nav,c=e.navActive,l=v(),u=(0,a.useRef)(),d=(0,a.useRef)(),h=(0,a.useRef)(),g=(0,f.Z)().isMobile,m=(0,a.useMemo)(function(){return{bigWidth:g?722:1124,smallWidth:g?194:300}},[g]);return(0,a.useEffect)(function(){u.current&&(p.gsap.to(d.current,{x:"".concat(-c*m.bigWidth,"px"),duration:3,ease:"expo.out"}),p.gsap.to(h.current,{x:"".concat(-c*m.smallWidth,"px"),duration:3,ease:"expo.out"}))},[c,m]),(0,o.jsxs)("div",{ref:u,className:(0,r.Z)((n={},(0,i.Z)(n,l.root,!0),(0,i.Z)(n,t,t),n)),children:[(0,o.jsx)("div",{className:l.bigWrap,children:(0,o.jsx)("div",{ref:d,className:l.big,children:s.map(function(e,n){return(0,o.jsx)("img",{className:l.imgBig,src:e.menuBackImage,alt:e.name,width:"1127",height:"634"},n.toString())})})}),(0,o.jsx)("img",{className:l.hotPoint,src:"/images/hot-point-big.png",alt:"hot-point",width:"300",height:"300"}),(0,o.jsx)("div",{className:l.smallWrap,children:(0,o.jsx)("div",{ref:h,className:l.small,children:s.map(function(e,n){return(0,o.jsx)("img",{className:l.imgSmall,src:e.menuFrontImage,alt:e.name,width:"300",height:"300"},n.toString())})})})]})},x=t(653),y=t(7548),b=function(e){var n={root:{position:"relative",zIndex:"1",textTransform:"uppercase"},item:{padding:"17px 0 17px 42px",height:58,textTransform:"uppercase",color:e.colors[1],extend:e.typography.menuItem,appearance:"none",border:"none",userSelect:"none",whiteSpace:"nowrap",cursor:"pointer","&:hover":{"@media (hover: hover)":{"& $text":{"&:before":{transform:"scaleX(1)"}}}}},big:{padding:"16px 0 20px 59px",height:114,extend:e.typography.menuItemActive},num:{extend:e.typography.menuItemNum,letterSpacing:"0.05em",position:"absolute",top:"29px",left:"0",opacity:"1",background:"-webkit-linear-gradient(".concat(e.colors[2],", ").concat(e.colors[0],")"),"-webkit-background-clip":"text","-webkit-text-fill-color":"transparent",display:function(e){return e.big?"block":"none"}},text:{position:"relative",zIndex:1,"&:before":{content:'""',position:"absolute",zIndex:1,bottom:-8,left:0,width:"100%",height:2,background:e.colors[2],display:function(e){return e.big?"block":"none"},transform:"scaleX(0)",transition:"transform .8s ".concat(e.easings["power3.out"])}}};return n[e.mq.sm]={item:{padding:"9px 0 9px 24px",height:40},big:{height:60,padding:"10px 0 10px 32px"},num:{extend:e.typography.menuItemNum,top:"20px"}},n},w=(0,s.QM)(b);function Z(e){var n,t,s=e.className,c=e.debug,l=e.onClick,u=e.opacity,d=e.name,h=e.num,f=e.length,g=e.big,v=e.navActive,m=e.type,b=e.isMenuOpen,Z=(0,a.useRef)(),j=(0,a.useRef)(),k=w({big:g});return(0,a.useEffect)(function(){u&&Z.current&&p.gsap.to(Z.current,{opacity:.5-Math.abs(("first"===m?v+1:v)-parseInt(h,10))/f,duration:2,ease:"expo.out"})},[f,v,h,u,c]),(0,o.jsx)(y.Z,{ref:Z,tag:"li",hover:!1,className:(0,r.Z)((n={},(0,i.Z)(n,k.root,!0),(0,i.Z)(n,s,s),n)),children:(0,o.jsxs)("button",{ref:j,tabIndex:b&&g?0:-1,onClick:function(){return l()},className:(0,r.Z)((t={},(0,i.Z)(t,k.item,!0),(0,i.Z)(t,k.big,g),t)),"aria-label":"go-to",children:[(0,o.jsx)("span",{className:k.num,children:h}),(0,o.jsx)("span",{className:k.text,children:(0,x.ZP)(d)})]})})}Z.defaultProps={big:!1};var j=(0,a.memo)(Z),k=t(661),N=function(e){var n={root:{}};return n[e.mq.sm]={root:{}},n},I=(0,s.QM)(N),z=function(e){var n,t=e.onClick,s=e.className,c=e.opacity,h=e.nav,f=e.navActive,g=e.big,v=e.height,m=e.debug,x=e.type,y=e.isMenuOpen,b=I(),w=(0,a.useRef)(),Z=(0,a.useRef)(),N=(0,l.Z)((0,u.Z)("/audio/c.mp3",{volume:.3}),1)[0],z=(0,d.qp)(k._y).isAudioActive,E=(0,a.useState)(null),M=E[0],A=E[1];return(0,a.useEffect)(function(){Z.current&&p.gsap.to(Z.current,{y:-f*v,duration:2,ease:"expo.out",modifiers:{y:function(e){return g&&A(Math.round(parseInt(e,10)/v)),e}}})},[f,v,g]),(0,a.useEffect)(function(){z&&y&&N()},[M,z,y]),(0,o.jsx)("nav",{ref:w,className:(0,r.Z)((n={},(0,i.Z)(n,b.nav,!0),(0,i.Z)(n,s,s),n)),children:(0,o.jsx)("ul",{ref:Z,children:h.map(function(e,n){return(0,o.jsx)(j,{onClick:function(){return t(n)},name:e.name,navActive:f,length:h.length-1,num:n<9?"0".concat(n+1):n+1,big:g,opacity:c,debug:m,type:x,isMenuOpen:y},n.toString())})})})},E=function(e){var n={navs:{position:"relative",zIndex:2,cursor:"grab"},grabbing:{cursor:"grabbing"},nav:{paddingLeft:"20vw",overflow:"hidden"},first:{"--top":"30vh",paddingTop:"calc(var(--top) - 67px)",height:"var(--top)"},second:{height:114},line:{position:"absolute",pointerEvents:"none",userSelect:"none"},line1:{zIndex:10,top:150,left:-45,transform:"rotate(151deg)"},line2:{zIndex:10,bottom:80,right:-10,transform:"rotate(-13deg)"}};return n[e.mq.sm]={first:{paddingTop:"calc(var(--top) - 36px)"},second:{height:60},nav:{paddingLeft:"var(--margin)"}},n},M=(0,s.QM)(E),A=(0,a.memo)(function(){var e,n,t,s,c,g,v=M(),x=(0,a.useRef)(),y=(0,a.useRef)(),b=(0,a.useRef)(),w=(0,a.useRef)(),Z=(0,d.qp)(k._y).isAudioActive,j=(0,h.Z)(function(e){return e.active}),N=(0,h.Z)(function(e){return e.setActive}),I=(0,h.Z)(function(e){return e.setMenuOpen}),E=(0,h.Z)(function(e){return e.isMenuOpen}),A=(0,f.Z)(function(e){return e.sections}),W=(0,f.Z)(function(e){return e.isMobile}),R=(0,a.useState)(j),S=R[0],D=R[1],C=(0,a.useState)(!1),T=C[0],L=C[1],P=p.gsap.utils,O=P.snap,_=P.clamp,q=(0,l.Z)((0,u.Z)("/audio/m.mp3"),1)[0],H=(0,a.useRef)(),Q=(0,a.useRef)({value:0}),Y=A.map(function(e,n){return n/A.length}),B=function(e){Q.current.value=e/A.length,D(e)},F=function(e){I(!1),Z&&q(),setTimeout(function(){N(e)},200)},U=function(e){var n=e.isDragging?-.003:7e-4;Q.current.value=_(0,1,Q.current.value+e.deltaY*n);var t=O(Y,_(0,1,Q.current.value));D(Math.floor(t*A.length))},X=function(e){"ArrowUp"===e.key&&B(Math.max(0,S-1)),"ArrowDown"===e.key&&B(Math.min(A.length-1,S+1))};return(0,a.useEffect)(function(){return E?window.addEventListener("keydown",X):window.removeEventListener("keydown",X),function(){window.removeEventListener("keydown",X)}},[E,S]),(0,a.useEffect)(function(){return w.current&&w.current.kill(),w.current=p.Observer.create({target:x.current,type:"wheel,touch,scroll,pointer",onChangeY:U,onDragStart:function(){L(!0)},onDragEnd:function(){L(!1)},preventDefault:!0}),function(){w.current.kill()}},[]),(0,a.useEffect)(function(){clearTimeout(H.current),E?setTimeout(function(){Q.current.value=j/A.length,H.current=D(j)},500):setTimeout(function(){Q.current.value=j/A.length,H.current=D(0)},1500),!W&&(y.current&&p.gsap.to(y.current,{y:E?0:-40,opacity:E?1:0,delay:E?1:0,duration:2,ease:"expo.out"}),b.current&&p.gsap.to(b.current,{y:E?0:40,opacity:E?1:0,delay:E?1:0,duration:2,ease:"expo.out"}))},[E,j,W]),(0,o.jsxs)("div",{className:v.root,ref:x,children:[(0,o.jsx)(m,{nav:A,className:v.images,navActive:S}),(0,o.jsxs)("div",{className:(0,r.Z)((e={},(0,i.Z)(e,v.navs,!0),(0,i.Z)(e,v.grabbing,T),e)),children:[(0,o.jsx)(z,{onClick:B,className:(0,r.Z)((n={},(0,i.Z)(n,v.nav,!0),(0,i.Z)(n,v.first,!0),n)),nav:A,navActive:S-1,type:"first",height:W?40:58,opacity:!0,big:!1,debug:!0}),(0,o.jsx)(z,{onClick:F,className:(0,r.Z)((t={},(0,i.Z)(t,v.nav,!0),(0,i.Z)(t,v.second,!0),t)),type:"second",nav:A,navActive:S,height:W?60:114,opacity:!1,big:!0,isMenuOpen:E}),(0,o.jsx)(z,{onClick:B,className:(0,r.Z)((s={},(0,i.Z)(s,v.nav,!0),(0,i.Z)(s,v.third,!0),s)),type:"third",nav:A,navActive:S+1,height:W?40:58,opacity:!0,big:!1})]}),!W&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{ref:y,className:(0,r.Z)((c={},(0,i.Z)(c,v.line,!0),(0,i.Z)(c,v.line1,!0),c)),children:(0,o.jsx)("img",{src:"/images/menu-line.png",alt:"line",width:"658",height:"3"})}),(0,o.jsx)("div",{ref:b,className:(0,r.Z)((g={},(0,i.Z)(g,v.line,!0),(0,i.Z)(g,v.line2,!0),g)),children:(0,o.jsx)("img",{src:"/images/menu-line.png",alt:"line",width:"658",height:"3"})})]})]})}),W=t(3267),R=function(e){var n={mainNav:{position:"fixed",zIndex:e.zindex.mainNav,top:0,left:0,width:"100%",height:"var(--vh)",overflow:"hidden",pointerEvents:"none",clipPath:"url(#maskMenu)"},activeNav:{zIndex:e.zindex.mainNav},root:{position:"absolute",zIndex:1,top:0,left:0,width:"100%",height:"var(--vh)",overflow:"hidden",pointerEvents:"none"},active:{pointerEvents:"all"},bars:{pointerEvents:"none"},bar:{position:"absolute",zIndex:e.zindex.mainNav+1,left:0,top:0,width:"50%",height:"100vh",background:e.getRgba(e.colors[2],.8),pointerEvents:"none",transformOrigin:"0% 100%",willChange:"transform",transform:"scaleY(0)"},bar2:{left:"50%"},footer:{}};return n[e.mq.sm]={footer:{zIndex:e.zindex.header}},n},S=(0,s.QM)(R);function D(){var e,n,t,s,l=S(),u=(0,h.Z)(function(e){return e.isMenuOpen}),d=(0,f.Z)().isMobile,g=(0,c.i)(),v=g.innerWidth,m=g.innerHeight,x=(0,a.useState)(),y=x[0],b=x[1],w=(0,a.useRef)(),Z=(0,a.useRef)(),j=(0,a.useMemo)(function(){return[{y:m},{y:m}]},[m]),k=p.gsap.utils.selector(w),N=(0,a.useRef)();return(0,a.useEffect)(function(){N.current&&N.current.progress(0).kill(),N.current=p.gsap.timeline().addLabel("start",0).fromTo(k("div"),{y:"0%",scaleY:0},{y:"-35%",scaleY:.3,duration:.7,stagger:.07,ease:"expo.in"}).to(k("div"),{y:"-100%",scaleY:0,duration:.7,stagger:.07,ease:"expo.out"},"-=.05").fromTo(j,{y:m},{y:0,duration:1.4,stagger:.07,ease:"expo.inOut",onUpdate:function(){Z.current&&Z.current.setAttribute("points","\n            0, ".concat(j[0].y,"\n            ").concat(.5*v,", ").concat(j[0].y,"\n            ").concat(.5*v,", ").concat(j[1].y,"\n            ").concat(v,", ").concat(j[1].y,"\n            ").concat(v,", ").concat(m,"\n            ").concat(.5*v,", ").concat(m,"\n            ").concat(.5*v,", ").concat(m,"\n            0, ").concat(m,"\n          "))}},"start")},[m,v]),(0,a.useEffect)(function(){y&&(N.current[u?"play":"reverse"](),/Safari/.test(navigator.userAgent)&&/17/.test(navigator.userAgent)&&p.gsap.to(y,{opacity:u?1:0,pointerEvents:u?"auto":"none",duration:.3,delay:u?.5:.7}))},[u,y,m,v]),(0,a.useEffect)(function(){console.log(" ---->"),/Safari/.test(navigator.userAgent)&&/17/.test(navigator.userAgent)&&(document.body.style.overflow="hidden")},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("svg",{style:{height:0,position:"fixed",zIndex:-100,top:-100,left:-100},children:(0,o.jsx)("clipPath",{id:"maskMenu",children:(0,o.jsx)("polygon",{id:"col1",ref:Z,points:"\n              0, ".concat(j[0].y,"\n              ").concat(.5*v,", ").concat(j[0].y,"\n              ").concat(.5*v,", ").concat(j[1].y,"\n              ").concat(v,", ").concat(j[1].y,"\n              ").concat(v,", ").concat(m,"\n              ").concat(.5*v,", ").concat(m,"\n              ").concat(.5*v,", ").concat(m,"\n              0, ").concat(m,"\n            ")})})}),(0,o.jsxs)("div",{className:(0,r.Z)((e={},(0,i.Z)(e,l.mainNav,!0),(0,i.Z)(e,l.activeNav,u),e)),children:[(0,o.jsx)("div",{ref:b,className:(0,r.Z)((n={},(0,i.Z)(n,l.root,!0),(0,i.Z)(n,l.active,u),n)),children:(0,o.jsx)(A,{})}),(0,o.jsxs)("div",{className:l.bars,ref:w,children:[(0,o.jsx)("div",{className:(0,r.Z)((t={},(0,i.Z)(t,l.bar,!0),(0,i.Z)(t,l.bar1,!0),t))}),(0,o.jsx)("div",{className:(0,r.Z)((s={},(0,i.Z)(s,l.bar,!0),(0,i.Z)(s,l.bar2,!0),s))})]}),d&&(0,o.jsx)(W.Z,{ready:u,className:l.footer,type:"nav"})]})]})}D.defaultProps={};var C=(0,a.memo)(D)},2775:function(e,n,t){"use strict";t.d(n,{i:function(){return s}});var i=t(7294),o="undefined"==typeof window?i.useEffect:i.useLayoutEffect,a={innerHeight:null,innerWidth:null,outerHeight:null,outerWidth:null};function r(){return{innerHeight:window.innerHeight,innerWidth:window.innerWidth,outerHeight:window.outerHeight,outerWidth:window.outerWidth}}function s(){var e=(0,i.useState)(function(){return"undefined"!=typeof window?r():a}),n=e[0],t=e[1];return o(function(){function e(){t(r())}if("undefined"!=typeof window)return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)};console.warn("useWindowSize: window is undefined.")},[]),n}},247:function(){}}]);