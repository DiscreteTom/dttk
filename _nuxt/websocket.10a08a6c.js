import{u as z}from"./useEmitter.43e253ae.js";import{d as E,F as R,r,i as u,I as H,x as h,y as p,A as n,L as e,M as C,N as J,W as b,B as c,U as P,T as W,J as I,K as Q,v as m,Q as S,O as V,R as M,P as q,C as $,z as A}from"./entry.3b5d6111.js";const G={class:"d-flex flex-wrap"},X={class:"d-flex flex-wrap"},Y={class:"d-flex flex-wrap"},Z={class:"d-flex flex-grow-1 align-end"},ee=p("div",{class:"flex-grow-1"},null,-1),ne=E({__name:"websocket",setup(te){const D=z(),f=R(),y=r("ws://localhost:8080"),x=r(""),w=r(!1),s=r(!1),_=r(void 0),l=r(null),i=r(""),d=r([]);function L(){s.value=!0,l.value!=null&&l.value.close(),l.value=new WebSocket(y.value,x.value.split(",").map(a=>a.trim()).filter(a=>a!="")),l.value.onopen=()=>{s.value=!1,d.value.unshift({time:new Date,from:"system",type:"text",content:"Connected"})},l.value.onclose=()=>{l.value=null,s.value=!1,d.value.unshift({time:new Date,from:"system",type:"text",content:"Disconnected"})},l.value.onmessage=a=>{d.value.unshift({time:new Date,from:"server",type:"text",content:a.data,json:N(a.data)})},l.value.onerror=a=>{l.value=null,s.value=!1,d.value.unshift({time:new Date,from:"system",type:"error",content:a.type})}}function U(){if(l.value==null){D.emit("toast","Not connected");return}l.value.send(i.value),d.value.unshift({time:new Date,from:"client",type:"text",content:i.value,json:N(i.value)}),i.value=""}function N(a){try{return JSON.stringify(JSON.parse(a),null,2)}catch{return}}return(a,o)=>{const F=u("v-text-field"),v=u("v-btn"),g=u("v-tooltip"),T=u("v-textarea"),j=u("v-card-text"),K=u("v-card-subtitle"),O=u("v-card"),B=H("clipboard");return m(),h("div",null,[p("div",G,[n(F,{label:"Server URL",modelValue:e(y),"onUpdate:modelValue":o[0]||(o[0]=t=>C(y)?y.value=t:null),variant:"outlined",density:"compact",clearable:"","hide-details":"",placeholder:"ws://localhost:8080",disabled:e(s)||e(l)!=null,class:J(e(f).smAndUp.value?"mr-3":"mb-3"),style:b(e(f).smAndUp.value?"":"width:100%")},null,8,["modelValue","disabled","class","style"]),n(F,{label:"Subprotocols (optional, comma separated)",modelValue:e(x),"onUpdate:modelValue":o[1]||(o[1]=t=>C(x)?x.value=t:null),variant:"outlined",density:"compact",clearable:"","hide-details":"",placeholder:"ship, done",disabled:e(s)||e(l)!=null},null,8,["modelValue","disabled"])]),n(v,{onClick:o[2]||(o[2]=t=>e(l)==null?L():e(l).close()),disabled:e(s),block:"",class:"my-2","prepend-icon":e(l)==null?"mdi-link-variant":"mdi-link-variant-off",text:e(l)==null?"Connect":"Disconnect",loading:e(s)},null,8,["disabled","prepend-icon","text","loading"]),n(T,{label:"",rows:"1",modelValue:e(i),"onUpdate:modelValue":o[3]||(o[3]=t=>C(i)?i.value=t:null),"auto-grow":"",variant:"outlined",density:"compact",clearable:"","hide-details":"",disabled:e(l)==null,onKeyup:P(W(U,["ctrl"]),["enter"]),placeholder:"Type message here"},{"append-inner":c(()=>[n(g,{text:"Send (Ctrl+Enter)",location:"top"},{activator:c(({props:t})=>[n(v,S(t,{icon:"mdi-send",variant:"plain",onClick:U}),null,16)]),_:1})]),_:1},8,["modelValue","disabled","onKeyup"]),p("div",X,[n(v,{onClick:o[4]||(o[4]=t=>w.value=!e(w)),class:J(e(f).smAndUp.value?"mr-2 my-2 flex-grow-1":"mt-2"),"prepend-icon":"mdi-code-json",text:e(w)?"Show Unformatted Message":"Show Formatted JSON",style:b(e(f).smAndUp.value?"":"width:100%")},null,8,["class","text","style"]),n(v,{onClick:o[5]||(o[5]=t=>e(d).length=0),class:"my-2 flex-grow-1","prepend-icon":"mdi-delete-outline",text:"Clear History",style:b(e(_)&&`color:${e(_)}`),onMouseover:o[6]||(o[6]=t=>_.value="red"),onMouseleave:o[7]||(o[7]=t=>_.value=void 0)},null,8,["style"])]),(m(!0),h(I,null,Q(e(d),t=>(m(),h("div",{key:t.time.getTime(),class:"my-2 d-flex"},[t.from=="server"||t.from=="system"?(m(),V(g,{key:0,text:t.from=="server"?"From Server":"From System",location:"top"},{activator:c(({props:k})=>[n(v,S(k,{variant:"plain",icon:t.from=="server"?"mdi-arrow-bottom-right-thick":"mdi-robot-outline"}),null,16,["icon"])]),_:2},1032,["text"])):M("",!0),q((m(),V(O,{class:"flex-grow-1",onClick:o[8]||(o[8]=()=>{})},{default:c(()=>[p("div",Y,[n(j,{style:b([t.type=="error"?"color:red":void 0,{"word-break":"break-all","white-space":"pre",overflow:"auto","font-family":"monospace"}])},{default:c(()=>[$(A(e(w)?t.json??t.content:t.content),1)]),_:2},1032,["style"]),p("div",Z,[ee,n(K,null,{default:c(()=>[$(A(t.time.toLocaleTimeString()),1)]),_:2},1024)])])]),_:2},1024)),[[B,t.content,"copy"],[B,()=>e(D).emit("toast","Copied"),"success"]]),t.from=="client"?(m(),V(g,{key:1,text:"From Local",location:"top"},{activator:c(({props:k})=>[n(v,S(k,{variant:"plain",icon:"mdi-arrow-top-left-thick"}),null,16)]),_:1})):M("",!0)]))),128))])}}});export{ne as default};
