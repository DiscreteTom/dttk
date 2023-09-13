import{d as F,r as y,o as oe,l as _,A as $e,B as pe,V as Be,W as qe,c as N,R as xe,S as Z,k as d,m as B,F as L,D as ye,I as O,N as fe,E as p,q as n,L as V,v as K,t as U,X as Ve,H as ve,Y as Pe,e as Ie,Z as Te,s as v,$ as Oe,a0 as _e,a1 as De,a2 as Re,K as A,a3 as Ae,a4 as Ue,a5 as Ee,f as C,C as Me,J as je,G as me,u as ze,_ as We}from"./entry.c2e56329.js";import{u as Ke}from"./useEmitter.43e253ae.js";const Le=F({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(a,{slots:t,attrs:e}){const o=y(!1);return oe(()=>{o.value=!0}),u=>{var g;if(o.value)return(g=t.default)==null?void 0:g.call(t);const k=t.fallback||t.placeholder;if(k)return k();const m=u.fallback||u.placeholder||"",w=u.fallbackTag||u.placeholderTag||"span";return _(w,e,m)}}}),Ce={theme:"system",invertToastColor:!1,toastDuration:5e3},I=$e({...Ce});let ke=!1;function Fe(){if(ke)return I;ke=!0;const a=localStorage.getItem("settings");if(console.log(`Settings loaded: ${a}`),a!==null){const t=JSON.parse(a);Object.assign(I,t)}return console.log(`Settings applied: ${JSON.stringify(I)}`),pe(I,be),I}function be(){localStorage.setItem("settings",JSON.stringify(I)),console.log(`Settings saved: ${JSON.stringify(I)}`)}function Je(){Object.assign(I,Ce),console.log(`Settings reset: ${JSON.stringify(I)}`),be()}const Ne=()=>({current:I,load:Fe,save:be,reset:Je});function Ge(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}const He=()=>{const a=Be(),t=Ne(),e=y(!0);function o(m){a.global.name.value=m=="system"?Ge():m,e.value=m=="system",t.current.theme=m}function u(){o(a.global.name.value=="light"?"dark":"light")}function k(){o(t.current.theme),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>o("system"))}return pe(e,m=>{o(m?"system":a.global.name.value=="dark"?"dark":"light")}),pe(t.current,m=>{o(m.theme)}),{followSystemTheme:e,init:k,set:o,toggle:u}};var Ye=Object.defineProperty,Qe=(a,t,e)=>t in a?Ye(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,P=(a,t,e)=>(Qe(a,typeof t!="symbol"?t+"":t,e),e);let X=0;class Xe{constructor(){P(this,"subscribers"),P(this,"toasts"),P(this,"subscribe",t=>(this.subscribers.push(t),()=>{const e=this.subscribers.indexOf(t);this.subscribers.splice(e,1)})),P(this,"publish",t=>{this.subscribers.forEach(e=>e(t)),this.toasts=[...this.toasts,t]}),P(this,"dismiss",t=>(t||this.toasts.forEach(e=>{this.subscribers.forEach(o=>o({id:e.id,dismiss:!0}))}),this.subscribers.forEach(e=>e({id:t,dismiss:!0})),t)),P(this,"message",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,id:o,title:t}),o}),P(this,"error",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,id:o,type:"error",title:t}),o}),P(this,"success",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,id:o,type:"success",title:t}),o}),P(this,"promise",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,promise:t,id:o}),o}),P(this,"custom",(t,e)=>{const o=(e==null?void 0:e.id)||X++;this.publish({...e,id:o,title:t})}),this.subscribers=[],this.toasts=[]}}const W=new Xe,Ze=(a,t)=>{const e=(t==null?void 0:t.id)||X++;return W.publish({title:a,...t,id:e}),e},et=Ze,he=Object.assign(et,{success:W.success,error:W.error,custom:W.custom,message:W.message,promise:W.promise,dismiss:W.dismiss}),tt=["data-visible"],at={className:"sonner-spinner"},ot=F({__name:"Loader",props:{visible:Boolean},setup(a){const t=Array(12).fill(0);return(e,o)=>(d(),_("div",{className:"sonner-loading-wrapper","data-visible":a.visible},[B("div",at,[(d(!0),_(L,null,ye(p(t),u=>(d(),_("div",{key:`spinner-bar-${u}`,className:"sonner-loading-bar"}))),128))])],8,tt))}}),ge=(a,t)=>{const e=a.__vccOpts||a;for(const[o,u]of t)e[o]=u;return e},st={},nt={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},lt=B("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z","clip-rule":"evenodd"},null,-1),it=[lt];function rt(a,t){return d(),_("svg",nt,it)}const ut=ge(st,[["render",rt]]),dt={},ct={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},pt=B("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z","clip-rule":"evenodd"},null,-1),vt=[pt];function mt(a,t){return d(),_("svg",ct,vt)}const ft=ge(dt,[["render",mt]]),ht={},yt={xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stoke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},bt=B("line",{x1:"18",y1:"6",x2:"6",y2:"18"},null,-1),gt=B("line",{x1:"6",y1:"6",x2:"18",y2:"18"},null,-1),_t=[bt,gt];function kt(a,t){return d(),_("svg",yt,_t)}const wt=ge(ht,[["render",kt]]),xt=["aria-live","data-styled","data-mounted","data-promise","data-removed","data-visible","data-y-position","data-x-position","data-index","data-front","data-swiping","data-type","data-invert","data-swipe-out","data-expanded"],Tt=["data-disabled"],Ct={key:1,"data-icon":""},Nt={"data-content":""},St={"data-title":""},$t=4e3,Bt=14,qt=20,Vt=200,Pt=F({__name:"Toast",props:{toast:{type:Object,required:!0},toasts:{type:Array,required:!0},index:{type:Number,required:!0},expanded:{type:Boolean,required:!0},invert:{type:Boolean,required:!0},heights:{type:Array,required:!0},position:{type:String,required:!0},visibleToasts:{type:Number,required:!0},expandByDefault:{type:Boolean,required:!0},closeButton:{type:Boolean,required:!0},interacting:{type:Boolean,required:!0},duration:{type:Number,required:!1},descriptionClass:{type:String,required:!1}},emits:["update:heights","removeToast"],setup(a,{emit:t}){const e=a,o=r=>!!r.promise,u=y(!1),k=y(!1),m=y(!1),w=y(!1),g=y(null),E=y(0),f=y(0),s=y(null),i=y(null),x=N(()=>e.index===0),b=N(()=>e.index+1<=e.visibleToasts),T=N(()=>e.toast.type),S=e.toast.className||"",J=e.toast.descriptionClassName||"",G=e.toast.style||{},H=N(()=>e.heights.findIndex(r=>r.toastId===e.toast.id)||0),se=N(()=>e.toast.duration||e.duration||$t),ee=y(0),M=y(0),te=y(se.value),ne=y(0),Y=y(null),ae=N(()=>e.position.split("-")),le=N(()=>e.heights.reduce((r,c,h)=>h>=H.value?r:r+c.height,0)),l=N(()=>e.toast.invert||e.invert),$=N(()=>g.value==="loading"),Q=N(()=>g.value??(e.toast.type||null)),D=N(()=>!o(e.toast)&&typeof e.toast.title=="object"),ie=N(()=>{if(!o(e.toast))return null;switch(g.value){case"loading":return e.toast.loading;case"success":return typeof e.toast.success=="function"?s.value:e.toast.success;case"error":return typeof e.toast.error=="function"?s.value:e.toast.error;default:return null}});oe(()=>u.value=!0),Z(()=>{M.value=H.value*Bt+le.value}),Z(()=>{var r,c;if(e.toast&&o(e.toast)){const h=e.toast;g.value="loading";const q=R=>{R.then(z=>{h.success&&typeof h.success=="function"&&(s.value=h.success(z)),g.value="success"}).catch(z=>{h.error&&typeof h.error=="function"&&(s.value=h.error(z)),g.value="error"})};e.toast.promise instanceof Promise?q(e.toast.promise):typeof e.toast.promise=="function"&&q((c=(r=e.toast)==null?void 0:r.promise)==null?void 0:c.call(r))}});function re(){var r,c;$.value||(j(),(c=(r=e.toast).onDismiss)==null||c.call(r,e.toast))}function j(){k.value=!0,E.value=M.value;const r=e.heights.filter(c=>c.toastId!==e.toast.id);t("update:heights",r),setTimeout(()=>{t("removeToast",e.toast)},Vt)}const ue=r=>{$||(E.value=M.value,r.target.setPointerCapture(r.pointerId),r.target.tagName!=="BUTTON"&&(m.value=!0,Y.value=r.clientY))},de=r=>{var c,h,q,R;if(w.value)return;const z=Number(((c=i.value)==null?void 0:c.style.getPropertyValue("--swipe-amount").replace("px",""))||0);if(Math.abs(z)>=qt){E.value=M.value,(q=(h=e.toast).onDismiss)==null||q.call(h,e.toast),j(),w.value=!0;return}(R=i.value)==null||R.style.setProperty("--swipe-amount","0px"),Y.value=null,m.value=!0},ce=r=>{var c,h;if(!Y.value)return;const q=r.clientY-Y.value;if(!(ae.value[0]==="top"?q<0:q>0)){(c=i.value)==null||c.style.setProperty("--swipe-amount","0px");return}(h=i.value)==null||h.style.setProperty("--swipe-amount",`${q}px`)};return Z(r=>{if(e.toast.promise&&g.value==="loading"||e.toast.duration===1/0)return;let c;const h=()=>{if(ne.value<ee.value){const R=new Date().getTime()-ee.value;te.value=te.value-R}ne.value=new Date().getTime()},q=()=>{ee.value=new Date().getTime(),c=setTimeout(()=>{var R,z;(z=(R=e.toast).onAutoClose)==null||z.call(R,e.toast),j()},te.value)};e.expanded||e.interacting?h():q(),r(()=>{clearTimeout(c)})}),oe(()=>{if(i.value){const r=i.value.getBoundingClientRect().height;f.value=r;const c=[{toastId:e.toast.id,height:r},...e.heights];t("update:heights",c)}}),xe(()=>{if(i.value){const r=e.heights.filter(c=>c.toastId!==e.toast.id);t("update:heights",r)}}),Z(()=>{e.toast.delete&&j()}),(r,c)=>(d(),_("li",{"aria-live":a.toast.important?"assertive":"polite","aria-atomic":"",role:"status",tabindex:"0",ref_key:"toastRef",ref:i,"data-sonner-toast":"",class:ve(p(S)),"data-styled":!D.value,"data-mounted":u.value,"data-promise":!!a.toast.promise,"data-removed":k.value,"data-visible":b.value,"data-y-position":ae.value[0],"data-x-position":ae.value[1],"data-index":e.index,"data-front":x.value,"data-swiping":m.value,"data-type":g.value!=="loading"&&g.value?g.value:T.value,"data-invert":l.value,"data-swipe-out":w.value,"data-expanded":!!(e.expanded||e.expandByDefault&&u.value),style:fe({"--index":e.index,"--toasts-before":e.index,"--z-index":a.toasts.length-e.index,"--offset":`${k.value?E.value:M.value}px`,"--initial-height":e.expandByDefault?"auto":`${f.value}px`,...p(G)}),onPointerdown:ue,onPointerup:de,onPointermove:ce},[e.closeButton&&!D.value?(d(),_("button",{key:0,"aria-label":"Close toast","data-disabled":$.value,"data-close-button":"",onClick:re},[n(wt)],8,Tt)):V("",!0),T.value||a.toast.icon||a.toast.promise?(d(),_("div",Ct,[typeof a.toast.promise=="function"?(d(),O(ot,{key:0,visible:g.value==="loading"},null,8,["visible"])):V("",!0),Q.value==="success"?(d(),O(ut,{key:1})):V("",!0),Q.value==="error"?(d(),O(ft,{key:2})):V("",!0)])):V("",!0),B("div",Nt,[B("div",St,[typeof a.toast.title=="string"?(d(),_(L,{key:0},[K(U(a.toast.title),1)],64)):a.toast.title===void 0||a.toast.title===null?(d(),_(L,{key:1},[K(U(ie.value),1)],64)):D.value?(d(),O(Ve(a.toast.title),{key:2,onCloseToast:c[0]||(c[0]=()=>{var h;j(),(h=a.toast.cancel)!=null&&h.onClick&&a.toast.cancel.onClick()})},null,32)):V("",!0)]),a.toast.description?(d(),_("div",{key:0,"data-description":"",class:ve(a.descriptionClass+p(J))},U(a.toast.description),3)):V("",!0)]),a.toast.cancel?(d(),_("button",{key:2,"data-button":"","data-cancel":"",onClick:c[1]||(c[1]=()=>{var h;j(),(h=a.toast.cancel)!=null&&h.onClick&&a.toast.cancel.onClick()})},U(a.toast.cancel.label),1)):V("",!0),a.toast.action?(d(),_("button",{key:3,"data-button":"",onClick:c[2]||(c[2]=()=>{var h;j(),(h=a.toast.action)==null||h.onClick()})},U(a.toast.action.label),1)):V("",!0)],46,xt))}}),It=["aria-label"],Ot=["data-theme","data-rich-colors","data-y-position","data-x-position"],Dt="32px",Rt=356,At=14,Ut=F({name:"Toaster",inheritAttrs:!1,__name:"Toaster",props:{invert:{type:Boolean,default:!1},theme:{default:"light"},position:{default:"bottom-right"},hotkey:{default:()=>["altKey","KeyT"]},richColors:{type:Boolean,default:!1},expand:{type:Boolean,default:!1},duration:{default:Number},visibleToasts:{default:3},closeButton:{type:Boolean,default:!1},toastOptions:{default:()=>({})},className:{},style:{},offset:{default:0}},setup(a){const t=a,e=qe(),o=y([]),u=y([]),k=y(!1),m=y(!1),w=N(()=>t.position.split("-")),g=y(null),E=t.hotkey.join("+").replace(/Key/g,"").replace(/Digit/g,"");function f(s){o.value=o.value.filter(({id:i})=>i!==s.id)}return oe(()=>{const s=W.subscribe(i=>{if(i.dismiss){o.value=o.value.map(x=>x.id===i.id?{...x,delete:!0}:x);return}o.value=[i,...o.value]});xe(()=>{s()})}),Z(()=>{o.value.length<=1&&(k.value=!1)}),Z(s=>{function i(x){var b,T;t.hotkey.every(S=>x[S]||x.code===S)&&(k.value=!0,(b=g.value)==null||b.focus()),x.code==="Escape"&&(document.activeElement===g.value||(T=g.value)!=null&&T.contains(document.activeElement))&&(k.value=!1)}document.addEventListener("keydown",i),s(()=>{document.removeEventListener("keydown",i)})}),(s,i)=>{var x;return d(),_("section",{"aria-label":`Notifications ${p(E)}`,tabIndex:-1},[B("ol",{ref_key:"listRef",ref:g,tabIndex:-1,"data-sonner-toaster":"","data-theme":s.theme,"data-rich-colors":s.richColors,"data-y-position":w.value[0],"data-x-position":w.value[1],style:fe({"--front-toast-height":`${(x=u.value[0])==null?void 0:x.height}px`,"--offset":typeof s.offset=="number"?`${s.offset}px`:s.offset||Dt,"--width":`${Rt}px`,"--gap":`${At}px`,...p(e).style}),onMouseenter:i[1]||(i[1]=b=>k.value=!0),onMousemove:i[2]||(i[2]=b=>k.value=!0),onMouseleave:i[3]||(i[3]=()=>{m.value||(k.value=!1)}),onPointerdown:i[4]||(i[4]=b=>m.value=!1),onPointerup:i[5]||(i[5]=b=>m.value=!1)},[(d(!0),_(L,null,ye(o.value,(b,T)=>{var S,J,G;return d(),O(Pt,{key:b.id,index:T,toast:b,duration:s.duration,className:(S=s.toastOptions)==null?void 0:S.className,descriptionClassName:(J=s.toastOptions)==null?void 0:J.descriptionClassName,invert:s.invert,visibleToasts:s.visibleToasts,closeButton:s.closeButton,interacting:m.value,position:s.position,style:fe((G=s.toastOptions)==null?void 0:G.style),toasts:o.value,expandByDefault:s.expand,expanded:k.value,heights:u.value,"onUpdate:heights":i[0]||(i[0]=H=>u.value=H),onRemoveToast:f},null,8,["index","toast","duration","className","descriptionClassName","invert","visibleToasts","closeButton","interacting","position","style","toasts","expandByDefault","expanded","heights"])}),128))],44,Ot)],8,It)}}});var Et=F({__name:"VSonner",props:{invert:{type:Boolean,required:!1},position:{type:String,required:!1,default:"bottom-center"},hotkey:{type:Array,required:!1,default:()=>["altKey","KeyT"]},expand:{type:Boolean,required:!1,default:!1},duration:{type:Number,required:!1},visibleToasts:{type:Number,required:!1,default:3},toastOptions:{type:Object,required:!1},offset:{type:[String,Number],required:!1,default:32}},setup(a){return(t,e)=>(d(),_(L,null,[n(p(Ut),{position:t.position,hotkey:t.hotkey,expand:t.expand,"visible-toasts":t.visibleToasts,duration:t.duration,"toast-options":t.toastOptions,offset:t.offset},null,8,["position","hotkey","expand","visible-toasts","duration","toast-options","offset"]),Te(t.$slots,"default")],64))}}),Se=(a,t)=>{const e=a.__vccOpts||a;for(const[o,u]of t)e[o]=u;return e},Mt=Se(Et,[["__file","/Users/wobsoriano/tmp/v-sonner/src/VSonner.vue"]]),jt={class:"pb-1"},zt={class:"font-weight-light"},Wt=F({__name:"Toast",props:{text:{type:String,required:!0},description:{type:String,required:!1},vertical:{type:Boolean,required:!1,default:!1},cardProps:{type:null,required:!1},cardTextProps:{type:null,required:!1},cardActionsProps:{type:null,required:!1,default:()=>({})},action:{type:Object,required:!1}},emits:["closeToast"],setup(a){return(t,e)=>(d(),O(p(Ee),A({class:"card-snackbar"},t.cardProps),{default:v(()=>[B("div",{class:ve({"d-flex flex-no-wrap justify-space-between":!t.vertical})},[n(p(Oe),_e(De(t.cardTextProps)),{default:v(()=>[t.description?(d(),_(L,{key:0},[B("div",jt,U(t.text),1),B("p",zt,U(t.description),1)],64)):(d(),_(L,{key:1},[K(U(t.text),1)],64))]),_:1},16),t.action?(d(),O(p(Re),_e(A({key:0},t.cardActionsProps)),{default:v(()=>[n(p(Ae)),n(p(Ue),A(t.action.buttonProps,{text:t.action.label,onClick:e[0]||(e[0]=()=>{var o,u;t.$emit("closeToast"),(u=(o=t.action)==null?void 0:o.onClick)==null||u.call(o)})}),null,16,["text"])]),_:1},16)):V("v-if",!0)],2)]),_:1},16))}}),Kt=Se(Wt,[["__scopeId","data-v-a2d3075d"],["__file","/Users/wobsoriano/tmp/v-sonner/src/Toast.vue"]]);function Lt(a,t){const{description:e,action:o,...u}=t||{};return he.custom(Pe(Ie(Kt,{...u,description:e,action:o,text:a})),{...u})}var we=Object.assign(Lt,{dismiss(a){return he.dismiss(a)},toastOriginal:he});const Ft=F({__name:"default",setup(a){const t=ze(),e=Ke(),o=Ne(),{followSystemTheme:u,...k}=He(),m=y(!1),w=y(!1),g=y([{to:"/time",icon:"mdi-clock-outline",text:"Time Calculator"},{to:"/codec",icon:"mdi-message-text-lock-outline",text:"Text Codec"},{to:"/number",icon:"mdi-hexadecimal",text:"Number Convertor"},{to:"/qrcode",icon:"mdi-qrcode",text:"QR Code Generator"},{to:"/uuid",icon:"mdi-identifier",text:"UUID Generator"},{to:"/ip",icon:"mdi-ip-outline",text:"IP Address Calculator"},{to:"/random",icon:"mdi-help-circle-outline",text:"Random Generator"},{to:"/recorder",icon:"mdi-file-video-outline",text:"Media Recorder"},{to:"/websocket",icon:"mdi-swap-vertical",text:"WebSocket Client"}]);function E(){return window.location.href}return oe(()=>{o.load(),e.on("toast",f=>{typeof f=="string"?we(f,{action:{buttonProps:{icon:"mdi-close",size:"small"}}}):we(f.message,f.props)}),k.init()}),pe(()=>t.$pwa.needRefresh,f=>{f&&e.emit("toast",{message:"New content available, click to refresh the page.",props:{action:{buttonProps:{icon:"mdi-refresh",size:"small"},onClick:async()=>{await t.$pwa.updateServiceWorker(!0),window.location.reload()}}}})}),(f,s)=>{const i=C("v-app-bar-nav-icon"),x=C("v-app-bar-title"),b=C("v-btn"),T=C("v-tooltip"),S=Le,J=C("v-app-bar"),G=C("v-list-item"),H=C("v-list"),se=C("v-navigation-drawer"),ee=C("v-text-field"),M=C("v-checkbox"),te=C("v-card-text"),ne=C("v-container"),Y=C("v-main"),ae=C("v-layout"),le=Me("clipboard");return d(),O(ae,null,{default:v(()=>[n(J,null,{prepend:v(()=>[n(i,{onClick:s[0]||(s[0]=l=>m.value=!p(m))})]),append:v(()=>[n(T,{text:"Home",location:"bottom"},{activator:v(({props:l})=>[n(b,A(l,{icon:"mdi-home",to:"/",exact:""}),null,16)]),_:1}),n(S,null,{default:v(()=>{var l;return[(l=f.$pwa)!=null&&l.isInstalled?V("",!0):(d(),O(T,{key:0,text:"Install PWA",location:"bottom"},{activator:v(({props:$})=>[n(b,A($,{icon:"mdi-download",class:"hidden-sm-and-down",onClick:s[1]||(s[1]=Q=>{var D;return(D=f.$pwa)==null?void 0:D.install()})}),null,16)]),_:1}))]}),_:1}),n(T,{text:"View Source Code",location:"bottom"},{activator:v(({props:l})=>[n(b,A(l,{icon:"mdi-github",class:"hidden-sm-and-down",href:"https://github.com/DiscreteTom/dttk"}),null,16)]),_:1}),n(T,{text:"Toggle Theme",location:"bottom"},{activator:v(({props:l})=>[n(b,A(l,{icon:"mdi-theme-light-dark",class:"hidden-sm-and-down",onClick:k.toggle}),null,16,["onClick"])]),_:1}),n(T,{text:"Copy URL",location:"bottom"},{activator:v(({props:l})=>[je(n(b,A(l,{icon:"mdi-share-variant"}),null,16),[[le,E(),"copy"],[le,()=>p(e).emit("toast","Copied"),"success"]])]),_:1}),n(T,{text:"Settings",location:"bottom"},{activator:v(({props:l})=>[n(b,A(l,{icon:"mdi-cog-outline",onClick:s[2]||(s[2]=$=>w.value=!p(w))}),null,16)]),_:1})]),default:v(()=>[n(x,null,{default:v(()=>[K("DTTK🛠️")]),_:1})]),_:1}),n(se,{modelValue:p(m),"onUpdate:modelValue":s[3]||(s[3]=l=>me(m)?m.value=l:null)},{default:v(()=>[n(H,null,{default:v(()=>[(d(!0),_(L,null,ye(p(g),l=>(d(),O(G,{key:l.text,exact:"",to:l.to,"prepend-icon":l.icon},{default:v(()=>[K(U(l.text),1)]),_:2},1032,["to","prepend-icon"]))),128))]),_:1})]),_:1},8,["modelValue"]),n(se,{modelValue:p(w),"onUpdate:modelValue":s[11]||(s[11]=l=>me(w)?w.value=l:null),temporary:"",location:"right"},{default:v(()=>[n(te,null,{default:v(()=>[n(ee,{label:"Toast duration (ms)",variant:"solo",type:"number","model-value":p(o).current.toastDuration,onInput:s[4]||(s[4]=l=>p(o).current.toastDuration=l.target.valueAsNumber),"hide-details":""},null,8,["model-value"]),n(M,{label:"Invert toast color",modelValue:p(o).current.invertToastColor,"onUpdate:modelValue":[s[5]||(s[5]=l=>p(o).current.invertToastColor=l),s[6]||(s[6]=l=>p(e).emit("toast","Toast color inverted"))],"hide-details":""},null,8,["modelValue"]),n(M,{label:"Follow system theme",modelValue:p(u),"onUpdate:modelValue":s[7]||(s[7]=l=>me(u)?u.value=l:null),"hide-details":""},null,8,["modelValue"]),n(b,{onClick:k.toggle,"hide-details":"",block:"",class:"my-2","prepend-icon":"mdi-theme-light-dark"},{default:v(()=>[K(" Toggle Theme ")]),_:1},8,["onClick"]),n(b,{onClick:s[8]||(s[8]=l=>{p(o).reset(),p(e).emit("toast","Reset settings")}),"hide-details":"",block:"",class:"my-2","prepend-icon":"mdi-restore"},{default:v(()=>[K(" Reset ")]),_:1}),n(S,null,{default:v(()=>{var l,$,Q,D,ie,re;return[n(b,{"hide-details":"",block:"",class:"my-2","prepend-icon":(l=f.$pwa)!=null&&l.isInstalled?($=f.$pwa)!=null&&$.needRefresh?"mdi-refresh":"mdi-check":"mdi-download",disabled:((Q=f.$pwa)==null?void 0:Q.isInstalled)&&!((D=f.$pwa)!=null&&D.needRefresh),onClick:s[9]||(s[9]=j=>{var ue,de,ce;return(ue=f.$pwa)!=null&&ue.isInstalled?(de=f.$pwa)==null?void 0:de.updateServiceWorker(!0):(ce=f.$pwa)==null?void 0:ce.install()}),text:(ie=f.$pwa)!=null&&ie.isInstalled?(re=f.$pwa)!=null&&re.needRefresh?"Refresh to Update":"PWA Installed":"Install PWA"},null,8,["prepend-icon","disabled","text"])]}),_:1}),n(S,null,{default:v(()=>[n(b,{"hide-details":"",block:"",class:"my-2","prepend-icon":"mdi-update",onClick:s[10]||(s[10]=l=>{var $;return($=f.$pwa)==null?void 0:$.updateServiceWorker(!0)}),text:"Force Update"})]),_:1}),n(b,{"hide-details":"",block:"",class:"my-2","prepend-icon":"mdi-github",href:"https://github.com/DiscreteTom/dttk"},{default:v(()=>[K(" View Source Code ")]),_:1})]),_:1})]),_:1},8,["modelValue"]),n(Y,null,{default:v(()=>[n(ne,{fluid:""},{default:v(()=>[Te(f.$slots,"default",{},void 0,!0)]),_:3})]),_:3}),B("div",{class:ve(p(o).current.invertToastColor?"":"normal-toast")},[n(S,null,{default:v(()=>[n(p(Mt),{position:"bottom-right",duration:p(o).current.toastDuration},null,8,["duration"])]),_:1})],2)]),_:3})}}});const Ht=We(Ft,[["__scopeId","data-v-79c08f46"]]);export{Ht as default};
