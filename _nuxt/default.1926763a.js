import{d as W,r as h,o as oe,l as g,A as Be,B as me,U as Se,V as $e,c as N,Q as we,R as Z,k as d,m as B,F as J,D as ye,I as P,N as fe,E as v,q as n,L as q,v as L,t as U,W as qe,H as pe,X as Ve,e as Ie,Y as xe,s as p,Z as Pe,$ as _e,a0 as Oe,a1 as De,K as R,a2 as Ae,a3 as Re,a4 as Ue,f as C,C as Ee,u as je,J as Me,G as ve,_ as ze}from"./entry.a89c87ab.js";import{u as Ke}from"./useEmitter.43e253ae.js";const Le=W({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(a,{slots:t,attrs:e}){const o=h(!1);return oe(()=>{o.value=!0}),u=>{var b;if(o.value)return(b=t.default)==null?void 0:b.call(t);const _=t.fallback||t.placeholder;if(_)return _();const m=u.fallback||u.placeholder||"",w=u.fallbackTag||u.placeholderTag||"span";return g(w,e,m)}}}),Te={theme:"system",invertToastColor:!1,toastDuration:5e3},I=Be({...Te});let ke=!1;function Je(){if(ke)return I;ke=!0;const a=localStorage.getItem("settings");if(console.log(`Settings loaded: ${a}`),a!==null){const t=JSON.parse(a);Object.assign(I,t)}return console.log(`Settings applied: ${JSON.stringify(I)}`),me(I,be),I}function be(){localStorage.setItem("settings",JSON.stringify(I)),console.log(`Settings saved: ${JSON.stringify(I)}`)}function We(){Object.assign(I,Te),console.log(`Settings reset: ${JSON.stringify(I)}`),be()}const Ce=()=>({current:I,load:Je,save:be,reset:We});function Fe(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}const Ge=()=>{const a=Se(),t=Ce(),e=h(!0);function o(m){a.global.name.value=m=="system"?Fe():m,e.value=m=="system",t.current.theme=m}function u(){o(a.global.name.value=="light"?"dark":"light")}function _(){o(t.current.theme),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>o("system"))}return me(e,m=>{o(m?"system":a.global.name.value=="dark"?"dark":"light")}),me(t.current,m=>{o(m.theme)}),{followSystemTheme:e,init:_,set:o,toggle:u}};var He=Object.defineProperty,Qe=(a,t,e)=>t in a?He(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,V=(a,t,e)=>(Qe(a,typeof t!="symbol"?t+"":t,e),e);let X=0;class Ye{constructor(){V(this,"subscribers"),V(this,"toasts"),V(this,"subscribe",t=>(this.subscribers.push(t),()=>{const e=this.subscribers.indexOf(t);this.subscribers.splice(e,1)})),V(this,"publish",t=>{this.subscribers.forEach(e=>e(t)),this.toasts=[...this.toasts,t]}),V(this,"dismiss",t=>(t||this.toasts.forEach(e=>{this.subscribers.forEach(o=>o({id:e.id,dismiss:!0}))}),this.subscribers.forEach(e=>e({id:t,dismiss:!0})),t)),V(this,"message",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,id:o,title:t}),o}),V(this,"error",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,id:o,type:"error",title:t}),o}),V(this,"success",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,id:o,type:"success",title:t}),o}),V(this,"promise",(t,e)=>{const o=(e==null?void 0:e.id)||X++;return this.publish({...e,promise:t,id:o}),o}),V(this,"custom",(t,e)=>{const o=(e==null?void 0:e.id)||X++;this.publish({...e,id:o,title:t})}),this.subscribers=[],this.toasts=[]}}const K=new Ye,Xe=(a,t)=>{const e=(t==null?void 0:t.id)||X++;return K.publish({title:a,...t,id:e}),e},Ze=Xe,he=Object.assign(Ze,{success:K.success,error:K.error,custom:K.custom,message:K.message,promise:K.promise,dismiss:K.dismiss}),et=["data-visible"],tt={className:"sonner-spinner"},at=W({__name:"Loader",props:{visible:Boolean},setup(a){const t=Array(12).fill(0);return(e,o)=>(d(),g("div",{className:"sonner-loading-wrapper","data-visible":a.visible},[B("div",tt,[(d(!0),g(J,null,ye(v(t),u=>(d(),g("div",{key:`spinner-bar-${u}`,className:"sonner-loading-bar"}))),128))])],8,et))}}),ge=(a,t)=>{const e=a.__vccOpts||a;for(const[o,u]of t)e[o]=u;return e},ot={},st={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},nt=B("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z","clip-rule":"evenodd"},null,-1),lt=[nt];function it(a,t){return d(),g("svg",st,lt)}const rt=ge(ot,[["render",it]]),ut={},dt={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},ct=B("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z","clip-rule":"evenodd"},null,-1),pt=[ct];function vt(a,t){return d(),g("svg",dt,pt)}const mt=ge(ut,[["render",vt]]),ft={},ht={xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stoke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},yt=B("line",{x1:"18",y1:"6",x2:"6",y2:"18"},null,-1),bt=B("line",{x1:"6",y1:"6",x2:"18",y2:"18"},null,-1),gt=[yt,bt];function _t(a,t){return d(),g("svg",ht,gt)}const kt=ge(ft,[["render",_t]]),wt=["aria-live","data-styled","data-mounted","data-promise","data-removed","data-visible","data-y-position","data-x-position","data-index","data-front","data-swiping","data-type","data-invert","data-swipe-out","data-expanded"],xt=["data-disabled"],Tt={key:1,"data-icon":""},Ct={"data-content":""},Nt={"data-title":""},Bt=4e3,St=14,$t=20,qt=200,Vt=W({__name:"Toast",props:{toast:{type:Object,required:!0},toasts:{type:Array,required:!0},index:{type:Number,required:!0},expanded:{type:Boolean,required:!0},invert:{type:Boolean,required:!0},heights:{type:Array,required:!0},position:{type:String,required:!0},visibleToasts:{type:Number,required:!0},expandByDefault:{type:Boolean,required:!0},closeButton:{type:Boolean,required:!0},interacting:{type:Boolean,required:!0},duration:{type:Number,required:!1},descriptionClass:{type:String,required:!1}},emits:["update:heights","removeToast"],setup(a,{emit:t}){const e=a,o=r=>!!r.promise,u=h(!1),_=h(!1),m=h(!1),w=h(!1),b=h(null),E=h(0),k=h(0),s=h(null),i=h(null),x=N(()=>e.index===0),y=N(()=>e.index+1<=e.visibleToasts),T=N(()=>e.toast.type),S=e.toast.className||"",F=e.toast.descriptionClassName||"",G=e.toast.style||{},H=N(()=>e.heights.findIndex(r=>r.toastId===e.toast.id)||0),se=N(()=>e.toast.duration||e.duration||Bt),ee=h(0),j=h(0),te=h(se.value),ne=h(0),Q=h(null),ae=N(()=>e.position.split("-")),le=N(()=>e.heights.reduce((r,c,f)=>f>=H.value?r:r+c.height,0)),l=N(()=>e.toast.invert||e.invert),O=N(()=>b.value==="loading"),Y=N(()=>b.value??(e.toast.type||null)),D=N(()=>!o(e.toast)&&typeof e.toast.title=="object"),ie=N(()=>{if(!o(e.toast))return null;switch(b.value){case"loading":return e.toast.loading;case"success":return typeof e.toast.success=="function"?s.value:e.toast.success;case"error":return typeof e.toast.error=="function"?s.value:e.toast.error;default:return null}});oe(()=>u.value=!0),Z(()=>{j.value=H.value*St+le.value}),Z(()=>{var r,c;if(e.toast&&o(e.toast)){const f=e.toast;b.value="loading";const $=A=>{A.then(z=>{f.success&&typeof f.success=="function"&&(s.value=f.success(z)),b.value="success"}).catch(z=>{f.error&&typeof f.error=="function"&&(s.value=f.error(z)),b.value="error"})};e.toast.promise instanceof Promise?$(e.toast.promise):typeof e.toast.promise=="function"&&$((c=(r=e.toast)==null?void 0:r.promise)==null?void 0:c.call(r))}});function re(){var r,c;O.value||(M(),(c=(r=e.toast).onDismiss)==null||c.call(r,e.toast))}function M(){_.value=!0,E.value=j.value;const r=e.heights.filter(c=>c.toastId!==e.toast.id);t("update:heights",r),setTimeout(()=>{t("removeToast",e.toast)},qt)}const ue=r=>{O||(E.value=j.value,r.target.setPointerCapture(r.pointerId),r.target.tagName!=="BUTTON"&&(m.value=!0,Q.value=r.clientY))},de=r=>{var c,f,$,A;if(w.value)return;const z=Number(((c=i.value)==null?void 0:c.style.getPropertyValue("--swipe-amount").replace("px",""))||0);if(Math.abs(z)>=$t){E.value=j.value,($=(f=e.toast).onDismiss)==null||$.call(f,e.toast),M(),w.value=!0;return}(A=i.value)==null||A.style.setProperty("--swipe-amount","0px"),Q.value=null,m.value=!0},ce=r=>{var c,f;if(!Q.value)return;const $=r.clientY-Q.value;if(!(ae.value[0]==="top"?$<0:$>0)){(c=i.value)==null||c.style.setProperty("--swipe-amount","0px");return}(f=i.value)==null||f.style.setProperty("--swipe-amount",`${$}px`)};return Z(r=>{if(e.toast.promise&&b.value==="loading"||e.toast.duration===1/0)return;let c;const f=()=>{if(ne.value<ee.value){const A=new Date().getTime()-ee.value;te.value=te.value-A}ne.value=new Date().getTime()},$=()=>{ee.value=new Date().getTime(),c=setTimeout(()=>{var A,z;(z=(A=e.toast).onAutoClose)==null||z.call(A,e.toast),M()},te.value)};e.expanded||e.interacting?f():$(),r(()=>{clearTimeout(c)})}),oe(()=>{if(i.value){const r=i.value.getBoundingClientRect().height;k.value=r;const c=[{toastId:e.toast.id,height:r},...e.heights];t("update:heights",c)}}),we(()=>{if(i.value){const r=e.heights.filter(c=>c.toastId!==e.toast.id);t("update:heights",r)}}),Z(()=>{e.toast.delete&&M()}),(r,c)=>(d(),g("li",{"aria-live":a.toast.important?"assertive":"polite","aria-atomic":"",role:"status",tabindex:"0",ref_key:"toastRef",ref:i,"data-sonner-toast":"",class:pe(v(S)),"data-styled":!D.value,"data-mounted":u.value,"data-promise":!!a.toast.promise,"data-removed":_.value,"data-visible":y.value,"data-y-position":ae.value[0],"data-x-position":ae.value[1],"data-index":e.index,"data-front":x.value,"data-swiping":m.value,"data-type":b.value!=="loading"&&b.value?b.value:T.value,"data-invert":l.value,"data-swipe-out":w.value,"data-expanded":!!(e.expanded||e.expandByDefault&&u.value),style:fe({"--index":e.index,"--toasts-before":e.index,"--z-index":a.toasts.length-e.index,"--offset":`${_.value?E.value:j.value}px`,"--initial-height":e.expandByDefault?"auto":`${k.value}px`,...v(G)}),onPointerdown:ue,onPointerup:de,onPointermove:ce},[e.closeButton&&!D.value?(d(),g("button",{key:0,"aria-label":"Close toast","data-disabled":O.value,"data-close-button":"",onClick:re},[n(kt)],8,xt)):q("",!0),T.value||a.toast.icon||a.toast.promise?(d(),g("div",Tt,[typeof a.toast.promise=="function"?(d(),P(at,{key:0,visible:b.value==="loading"},null,8,["visible"])):q("",!0),Y.value==="success"?(d(),P(rt,{key:1})):q("",!0),Y.value==="error"?(d(),P(mt,{key:2})):q("",!0)])):q("",!0),B("div",Ct,[B("div",Nt,[typeof a.toast.title=="string"?(d(),g(J,{key:0},[L(U(a.toast.title),1)],64)):a.toast.title===void 0||a.toast.title===null?(d(),g(J,{key:1},[L(U(ie.value),1)],64)):D.value?(d(),P(qe(a.toast.title),{key:2,onCloseToast:c[0]||(c[0]=()=>{var f;M(),(f=a.toast.cancel)!=null&&f.onClick&&a.toast.cancel.onClick()})},null,32)):q("",!0)]),a.toast.description?(d(),g("div",{key:0,"data-description":"",class:pe(a.descriptionClass+v(F))},U(a.toast.description),3)):q("",!0)]),a.toast.cancel?(d(),g("button",{key:2,"data-button":"","data-cancel":"",onClick:c[1]||(c[1]=()=>{var f;M(),(f=a.toast.cancel)!=null&&f.onClick&&a.toast.cancel.onClick()})},U(a.toast.cancel.label),1)):q("",!0),a.toast.action?(d(),g("button",{key:3,"data-button":"",onClick:c[2]||(c[2]=()=>{var f;M(),(f=a.toast.action)==null||f.onClick()})},U(a.toast.action.label),1)):q("",!0)],46,wt))}}),It=["aria-label"],Pt=["data-theme","data-rich-colors","data-y-position","data-x-position"],Ot="32px",Dt=356,At=14,Rt=W({name:"Toaster",inheritAttrs:!1,__name:"Toaster",props:{invert:{type:Boolean,default:!1},theme:{default:"light"},position:{default:"bottom-right"},hotkey:{default:()=>["altKey","KeyT"]},richColors:{type:Boolean,default:!1},expand:{type:Boolean,default:!1},duration:{default:Number},visibleToasts:{default:3},closeButton:{type:Boolean,default:!1},toastOptions:{default:()=>({})},className:{},style:{},offset:{default:0}},setup(a){const t=a,e=$e(),o=h([]),u=h([]),_=h(!1),m=h(!1),w=N(()=>t.position.split("-")),b=h(null),E=t.hotkey.join("+").replace(/Key/g,"").replace(/Digit/g,"");function k(s){o.value=o.value.filter(({id:i})=>i!==s.id)}return oe(()=>{const s=K.subscribe(i=>{if(i.dismiss){o.value=o.value.map(x=>x.id===i.id?{...x,delete:!0}:x);return}o.value=[i,...o.value]});we(()=>{s()})}),Z(()=>{o.value.length<=1&&(_.value=!1)}),Z(s=>{function i(x){var y,T;t.hotkey.every(S=>x[S]||x.code===S)&&(_.value=!0,(y=b.value)==null||y.focus()),x.code==="Escape"&&(document.activeElement===b.value||(T=b.value)!=null&&T.contains(document.activeElement))&&(_.value=!1)}document.addEventListener("keydown",i),s(()=>{document.removeEventListener("keydown",i)})}),(s,i)=>{var x;return d(),g("section",{"aria-label":`Notifications ${v(E)}`,tabIndex:-1},[B("ol",{ref_key:"listRef",ref:b,tabIndex:-1,"data-sonner-toaster":"","data-theme":s.theme,"data-rich-colors":s.richColors,"data-y-position":w.value[0],"data-x-position":w.value[1],style:fe({"--front-toast-height":`${(x=u.value[0])==null?void 0:x.height}px`,"--offset":typeof s.offset=="number"?`${s.offset}px`:s.offset||Ot,"--width":`${Dt}px`,"--gap":`${At}px`,...v(e).style}),onMouseenter:i[1]||(i[1]=y=>_.value=!0),onMousemove:i[2]||(i[2]=y=>_.value=!0),onMouseleave:i[3]||(i[3]=()=>{m.value||(_.value=!1)}),onPointerdown:i[4]||(i[4]=y=>m.value=!1),onPointerup:i[5]||(i[5]=y=>m.value=!1)},[(d(!0),g(J,null,ye(o.value,(y,T)=>{var S,F,G;return d(),P(Vt,{key:y.id,index:T,toast:y,duration:s.duration,className:(S=s.toastOptions)==null?void 0:S.className,descriptionClassName:(F=s.toastOptions)==null?void 0:F.descriptionClassName,invert:s.invert,visibleToasts:s.visibleToasts,closeButton:s.closeButton,interacting:m.value,position:s.position,style:fe((G=s.toastOptions)==null?void 0:G.style),toasts:o.value,expandByDefault:s.expand,expanded:_.value,heights:u.value,"onUpdate:heights":i[0]||(i[0]=H=>u.value=H),onRemoveToast:k},null,8,["index","toast","duration","className","descriptionClassName","invert","visibleToasts","closeButton","interacting","position","style","toasts","expandByDefault","expanded","heights"])}),128))],44,Pt)],8,It)}}});var Ut=W({__name:"VSonner",props:{invert:{type:Boolean,required:!1},position:{type:String,required:!1,default:"bottom-center"},hotkey:{type:Array,required:!1,default:()=>["altKey","KeyT"]},expand:{type:Boolean,required:!1,default:!1},duration:{type:Number,required:!1},visibleToasts:{type:Number,required:!1,default:3},toastOptions:{type:Object,required:!1},offset:{type:[String,Number],required:!1,default:32}},setup(a){return(t,e)=>(d(),g(J,null,[n(v(Rt),{position:t.position,hotkey:t.hotkey,expand:t.expand,"visible-toasts":t.visibleToasts,duration:t.duration,"toast-options":t.toastOptions,offset:t.offset},null,8,["position","hotkey","expand","visible-toasts","duration","toast-options","offset"]),xe(t.$slots,"default")],64))}}),Ne=(a,t)=>{const e=a.__vccOpts||a;for(const[o,u]of t)e[o]=u;return e},Et=Ne(Ut,[["__file","/Users/wobsoriano/tmp/v-sonner/src/VSonner.vue"]]),jt={class:"pb-1"},Mt={class:"font-weight-light"},zt=W({__name:"Toast",props:{text:{type:String,required:!0},description:{type:String,required:!1},vertical:{type:Boolean,required:!1,default:!1},cardProps:{type:null,required:!1},cardTextProps:{type:null,required:!1},cardActionsProps:{type:null,required:!1,default:()=>({})},action:{type:Object,required:!1}},emits:["closeToast"],setup(a){return(t,e)=>(d(),P(v(Ue),R({class:"card-snackbar"},t.cardProps),{default:p(()=>[B("div",{class:pe({"d-flex flex-no-wrap justify-space-between":!t.vertical})},[n(v(Pe),_e(Oe(t.cardTextProps)),{default:p(()=>[t.description?(d(),g(J,{key:0},[B("div",jt,U(t.text),1),B("p",Mt,U(t.description),1)],64)):(d(),g(J,{key:1},[L(U(t.text),1)],64))]),_:1},16),t.action?(d(),P(v(De),_e(R({key:0},t.cardActionsProps)),{default:p(()=>[n(v(Ae)),n(v(Re),R(t.action.buttonProps,{text:t.action.label,onClick:e[0]||(e[0]=()=>{var o,u;t.$emit("closeToast"),(u=(o=t.action)==null?void 0:o.onClick)==null||u.call(o)})}),null,16,["text"])]),_:1},16)):q("v-if",!0)],2)]),_:1},16))}}),Kt=Ne(zt,[["__scopeId","data-v-a2d3075d"],["__file","/Users/wobsoriano/tmp/v-sonner/src/Toast.vue"]]);function Lt(a,t){const{description:e,action:o,...u}=t||{};return he.custom(Ve(Ie(Kt,{...u,description:e,action:o,text:a})),{...u})}var Jt=Object.assign(Lt,{dismiss(a){return he.dismiss(a)},toastOriginal:he});const Wt=W({__name:"default",setup(a){const t=je(),e=Ke(),o=Ce(),{followSystemTheme:u,..._}=Ge(),m=h(!1),w=h(!1),b=h([{to:"/time",icon:"mdi-clock-outline",text:"Time Calculator"},{to:"/codec",icon:"mdi-message-text-lock-outline",text:"Text Codec"},{to:"/number",icon:"mdi-hexadecimal",text:"Number Convertor"},{to:"/qrcode",icon:"mdi-qrcode",text:"QR Code Generator"},{to:"/uuid",icon:"mdi-identifier",text:"UUID Generator"},{to:"/ip",icon:"mdi-ip-outline",text:"IP Address Calculator"},{to:"/random",icon:"mdi-help-circle-outline",text:"Random Generator"}]);function E(){return window.location.href}return oe(()=>{o.load(),e.on("toast",k=>{Jt(k,{action:{buttonProps:{icon:"mdi-close",size:"small"}}})}),_.init(),t.$pwa.isInstalled&&t.$pwa.needRefresh&&e.emit("toast","New content available, please refresh the page.")}),(k,s)=>{const i=C("v-app-bar-nav-icon"),x=C("v-app-bar-title"),y=C("v-btn"),T=C("v-tooltip"),S=Le,F=C("v-app-bar"),G=C("v-list-item"),H=C("v-list"),se=C("v-navigation-drawer"),ee=C("v-text-field"),j=C("v-checkbox"),te=C("v-card-text"),ne=C("v-container"),Q=C("v-main"),ae=C("v-layout"),le=Ee("clipboard");return d(),P(ae,null,{default:p(()=>[n(F,null,{prepend:p(()=>[n(i,{onClick:s[0]||(s[0]=l=>m.value=!v(m))})]),append:p(()=>[n(T,{text:"Home",location:"bottom"},{activator:p(({props:l})=>[n(y,R(l,{icon:"mdi-home",to:"/",exact:""}),null,16)]),_:1}),n(S,null,{default:p(()=>{var l;return[(l=k.$pwa)!=null&&l.isInstalled?q("",!0):(d(),P(T,{key:0,text:"Install PWA",location:"bottom"},{activator:p(({props:O})=>[n(y,R(O,{icon:"mdi-download",class:"hidden-sm-and-down",onClick:s[1]||(s[1]=Y=>{var D;return(D=k.$pwa)==null?void 0:D.install()})}),null,16)]),_:1}))]}),_:1}),n(T,{text:"View Source Code",location:"bottom"},{activator:p(({props:l})=>[n(y,R(l,{icon:"mdi-github",class:"hidden-sm-and-down",href:"https://github.com/DiscreteTom/dttk"}),null,16)]),_:1}),n(T,{text:"Toggle Theme",location:"bottom"},{activator:p(({props:l})=>[n(y,R(l,{icon:"mdi-theme-light-dark",class:"hidden-sm-and-down",onClick:_.toggle}),null,16,["onClick"])]),_:1}),n(T,{text:"Copy URL",location:"bottom"},{activator:p(({props:l})=>[Me(n(y,R(l,{icon:"mdi-share-variant"}),null,16),[[le,E(),"copy"],[le,()=>v(e).emit("toast","Copied"),"success"]])]),_:1}),n(T,{text:"Settings",location:"bottom"},{activator:p(({props:l})=>[n(y,R(l,{icon:"mdi-cog-outline",onClick:s[2]||(s[2]=O=>w.value=!v(w))}),null,16)]),_:1})]),default:p(()=>[n(x,null,{default:p(()=>[L("DTTK🛠️")]),_:1})]),_:1}),n(se,{modelValue:v(m),"onUpdate:modelValue":s[3]||(s[3]=l=>ve(m)?m.value=l:null)},{default:p(()=>[n(H,null,{default:p(()=>[(d(!0),g(J,null,ye(v(b),l=>(d(),P(G,{key:l.text,exact:"",to:l.to,"prepend-icon":l.icon},{default:p(()=>[L(U(l.text),1)]),_:2},1032,["to","prepend-icon"]))),128))]),_:1})]),_:1},8,["modelValue"]),n(se,{modelValue:v(w),"onUpdate:modelValue":s[8]||(s[8]=l=>ve(w)?w.value=l:null),temporary:"",location:"right"},{default:p(()=>[n(te,null,{default:p(()=>[n(ee,{label:"Toast duration (ms)",variant:"solo",type:"number","model-value":v(o).current.toastDuration,onInput:s[4]||(s[4]=l=>v(o).current.toastDuration=l.target.valueAsNumber),"hide-details":""},null,8,["model-value"]),n(j,{label:"Invert toast color",modelValue:v(o).current.invertToastColor,"onUpdate:modelValue":s[5]||(s[5]=l=>v(o).current.invertToastColor=l),"hide-details":""},null,8,["modelValue"]),n(j,{label:"Follow system theme",modelValue:v(u),"onUpdate:modelValue":s[6]||(s[6]=l=>ve(u)?u.value=l:null),"hide-details":""},null,8,["modelValue"]),n(y,{onClick:_.toggle,"hide-details":"",block:"",class:"my-2","prepend-icon":"mdi-theme-light-dark"},{default:p(()=>[L(" Toggle Theme ")]),_:1},8,["onClick"]),n(y,{onClick:v(o).reset,"hide-details":"",block:"",class:"my-2","prepend-icon":"mdi-restore"},{default:p(()=>[L(" Reset ")]),_:1},8,["onClick"]),n(S,null,{default:p(()=>{var l,O,Y,D,ie,re;return[n(y,{"hide-details":"",block:"",class:"my-2","prepend-icon":(l=k.$pwa)!=null&&l.isInstalled?(O=k.$pwa)!=null&&O.needRefresh?"mdi-refresh":"mdi-check":"mdi-download",disabled:((Y=k.$pwa)==null?void 0:Y.isInstalled)&&!((D=k.$pwa)!=null&&D.needRefresh),onClick:s[7]||(s[7]=M=>{var ue,de,ce;return(ue=k.$pwa)!=null&&ue.isInstalled?(de=k.$pwa)==null?void 0:de.updateServiceWorker(!0):(ce=k.$pwa)==null?void 0:ce.install()}),text:(ie=k.$pwa)!=null&&ie.isInstalled?(re=k.$pwa)!=null&&re.needRefresh?"Refresh to Update":"PWA Installed":"Install PWA"},null,8,["prepend-icon","disabled","text"])]}),_:1}),n(y,{"hide-details":"",block:"",class:"my-2","prepend-icon":"mdi-github",href:"https://github.com/DiscreteTom/dttk"},{default:p(()=>[L(" View Source Code ")]),_:1})]),_:1})]),_:1},8,["modelValue"]),n(Q,null,{default:p(()=>[n(ne,{fluid:""},{default:p(()=>[xe(k.$slots,"default",{},void 0,!0)]),_:3})]),_:3}),B("div",{class:pe(v(o).current.invertToastColor?"":"normal-toast")},[n(S,null,{default:p(()=>[n(v(Et),{position:"bottom-right",duration:v(o).current.toastDuration},null,8,["duration"])]),_:1})],2)]),_:3})}}});const Ht=ze(Wt,[["__scopeId","data-v-52e44c75"]]);export{Ht as default};
