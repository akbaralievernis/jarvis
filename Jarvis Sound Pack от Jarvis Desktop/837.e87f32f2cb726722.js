(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[837],{538:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return I}});var n=t(828),o=t(5893),i=t(7294),a=t(653),s=t(8022),c=t(4682),u=t(793),l=t(549),d=t(7410),f=t(619),p=t(7245),h=t(9797),g=t(4924),v=t(1033),m=function(e){var r=e.ref,t=void 0===r?null:r,n=e.callback,o=void 0===n?function(){}:n,a=(0,i.useRef)();return(0,i.useEffect)(function(){return t&&(a.current=new v.Z(function(){t&&o&&o()}),a.current.observe(t)),function(){t&&a.current.disconnect(t)}},[t]),null},b=t(6010),x=function(e){var r={root:{position:"absolute",zIndex:5,top:"50%",right:0,height:245,width:2,transform:"translateY(-50%)",borderRadius:2,transition:"opacity 0.3s ease-out",opacity:0},rootVisible:{opacity:1},track:{width:"100%",height:"100%",position:"absolute",zIndex:1,background:e.getRgba(e.colors[5],.7)},thumb:{position:"absolute",zIndex:1,width:2,minHeight:100,borderRadius:2,background:e.colors[2]}};return r[e.mq.sm]={},r},w=(0,s.ZP)(x)(function(e){var r,t=e.classes,n=e.scroller,a=e.wrapper,s=(0,i.useRef)(),c=(0,i.useRef)(),u=(0,i.useRef)(),l=(0,i.useState)(!0),f=l[0],p=l[1],h=(0,i.useCallback)(function(){n&&u&&a&&d.gsap.to(u.current,{y:d.gsap.utils.mapRange(0,a.offsetHeight-window.innerHeight,0,145,n.scrollTop),duration:1.2,ease:"expo.out"})},[n]),v=function(){a&&p(a.offsetHeight>n.offsetHeight)};return m({ref:n,callback:v}),m({ref:a,callback:v}),(0,i.useEffect)(function(){return n&&n.addEventListener("scroll",h),function(){n&&n.removeEventListener("scroll",h)}},[n]),(0,o.jsxs)("div",{ref:s,className:(0,b.Z)((r={},(0,g.Z)(r,t.root,!0),(0,g.Z)(r,t.rootVisible,f),r)),children:[(0,o.jsx)("div",{ref:c,className:t.track}),(0,o.jsx)("div",{ref:u,className:t.thumb})]})}),k=t(6722),R=t(7469),Z=t(7548),y=t(661),E=t(3988),j=t.n(E),N=function(e){var r={overlay:{position:"fixed",top:0,right:0,zIndex:e.zindex.modal-1,width:"100%",height:"var(--vh)"},root:{position:"fixed",top:0,right:0,zIndex:e.zindex.modal,width:"calc(520px - var(--margin))",height:"var(--vh)",background:"black",transform:"translateX(140%)","--separator":"50px","& h2":{marginTop:-10,extend:e.typography.title,textTransform:"uppercase",color:e.colors[2],marginBottom:"var(--separator)",paddingRight:30},"& p":{marginBottom:"var(--separator)",color:e.getRgba(e.colors[1],.6)},"& a":{marginBottom:"var(--separator)",color:e.getRgba(e.colors[2],1),transition:"color .2s ease-out"},"& a:hover":{color:e.getRgba(e.colors[2],.5)},"& p:nth-child(2n+1)":{color:e.colors[1]},"& img":{marginBottom:"var(--separator)",verticalAlign:"middle",height:"auto"},"& .youtube":{height:0,position:"relative",zIndex:1,paddingBottom:"56.25%",marginBottom:"var(--separator)","& iframe":{position:"absolute",zIndex:1,top:0,left:0,width:"100%",height:"100%"}},"&:before":{content:'""',position:"absolute",zIndex:2,top:0,left:0,width:"100%",height:"var(--margin)",background:"linear-gradient(180deg, black, transparent)"},"&:after":{content:'""',position:"absolute",zIndex:2,top:0,left:-150,width:150,height:"100%",background:"linear-gradient(-90deg, black 30%, transparent)"}},scrollerWrap:{position:"absolute",zIndex:1,top:0,left:0,width:"100%",height:"100%",overflow:j().nativescroll?"scroll":"hidden"},close:{cursor:"pointer",position:"absolute",zIndex:2,top:"calc(var(--margin) - 4px)",right:"var(--margin)",padding:[4,4],"& svg":{transform:"rotate(-45deg)",stroke:e.colors[1]}},scrollable:{height:"100vh"},wrapper:{paddingBottom:"var(--margin)",padding:"var(--margin)",paddingLeft:0}};return r[e.mq.sm]={root:{width:"calc(100% - var(--margin))","--separator":"30px","& h2":{marginTop:-5,marginRight:20}},scrollable:{height:"var(--vh-fixed)"}},r},z=(0,s.QM)(N),I=(0,i.memo)(function(e){var r,t=e.sections,s=z(),g=(0,i.useRef)(),v=(0,i.useRef)(),m=(0,i.useRef)(),b=(0,i.useRef)(),x=(0,i.useRef)(),E=(0,p.Z)(),j=E.isDetailsOpen,N=E.active,I=(0,l.Z)(j),L=(0,p.Z)(function(e){return e.setDetailsOpen}),B=(0,i.useState)(!1),T=B[0],A=B[1],M=(0,R.Z)(function(e){return e.isMobile}),q=(0,n.Z)((0,f.Z)("/audio/scrollLong.mp3",{volume:.8}),1)[0],C=(0,c.qp)(y._y).isAudioActive;(0,u.Z)(v,j);var H=function(e){"Escape"===e.key&&L(!1)};return(0,i.useEffect)(function(){if(d.gsap.to(v.current,{x:j?"0%":"140%",pointerEvents:j?"all":"none",duration:3,delay:j?0:.2,ease:"expo.inOut"}),d.gsap.to(m.current,{y:j?"0":"50px",opacity:j?1:0,duration:3,ease:"expo.inOut"}),d.gsap.killTweensOf(g.current),d.gsap.to(g.current,{pointerEvents:j?"all":"none",delay:j?3:0}),j&&(b.current.scrollTop=0),I&&!j){var e=d.gsap.utils.selector(v);e("iframe").length>0&&e("iframe").forEach(function(e){setTimeout(function(){e.setAttribute("src",e.src)},3e3)})}return j?window.addEventListener("keydown",H):window.removeEventListener("keydown",H),C&&I!==j&&q(),function(){window.removeEventListener("keydown",H)}},[N,t,j]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{ref:g,className:s.overlay,onClick:function(){L(!1)}}),(0,o.jsxs)("div",{ref:v,className:s.root,children:[(0,o.jsx)("button",{className:s.close,onClick:function(){L(!1)},onMouseEnter:function(){A(!0)},onMouseLeave:function(){A(!1)},"aria-label":"close-detail",children:(0,o.jsx)(Z.Z,{children:(0,o.jsx)(k.Z,{className:s.buttonSvg,hover:T})})}),(0,o.jsx)("div",{ref:m,className:s.scrollerWrap,children:(0,o.jsxs)(h.Z,{className:s.scrollable,ref:b,children:[(0,o.jsx)("div",{ref:x,className:s.wrapper,children:(0,a.ZP)(null===(r=t[N])||void 0===r?void 0:r.detail)}),!M&&(0,o.jsx)(w,{scroller:b.current,wrapper:x.current})]})})]})]})})},9797:function(e,r,t){"use strict";var n=t(5893),o=t(7294),i=t(1033),a=t(6530),s=t(9961),c=t(6546),u=t(294),l=t(7469),d=(0,o.forwardRef)(function(e,r){var t=e.children,d=e.className,f=e.duration,p=e.smooth,h=e.direction,g=(0,o.useRef)(null),v=(0,o.useRef)(),m=(0,o.useRef)(),b=(0,o.useRef)(),x=(0,u.Z)(),w=x.setLenis,k=x.setWrapper,R=x.setNode,Z=(0,l.Z)(function(e){return e.isMobile}),y=(0,l.Z)(function(e){return e.isIpad});return(0,o.useEffect)(function(){return v.current&&(b.current=new i.Z(function(){v.current&&c.ScrollTrigger.refresh()}),b.current.observe(v.current)),function(){v.current&&b.current.disconnect(v.current)}},[v]),(0,o.useEffect)(function(){return g.current=new s.Z({duration:f,easing:function(e){return 1===e?1:1-Math.pow(2,-10*e)},smooth:p,direction:h,wrapper:v.current,content:m.current}),w(g.current),R(v.current),k(m.current),function(){g.current.destroy(),w(null)}},[]),(0,o.useEffect)(function(){var e=function(r){g.current.raf(r),requestAnimationFrame(e)},r=requestAnimationFrame(e);return function(){return cancelAnimationFrame(r)}},[]),(0,n.jsx)("div",{style:{overflow:Z||y?"scroll":"hidden",overscrollBehavior:Z||y?"none":"contain"},className:d,ref:(0,a.l)([r,v]),children:(0,n.jsx)("div",{ref:m,children:t})})});d.defaultProps={duration:1.2,smooth:!0,direction:"vertical"},r.Z=d},247:function(){}}]);