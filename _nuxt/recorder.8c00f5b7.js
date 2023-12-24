import{u as J}from"./useDttkMeta.7220e911.js";import{u as K}from"./useEmitter.43e253ae.js";import{d as Q,F as X,r as u,o as Z,c as O,i as x,x as ee,A as o,y as N,B as m,L as a,M as k,N as U,Y as C,P as B,S as I,v as ae,C as V}from"./entry.aeecbbd7.js";const le={class:"mx-3"},te={class:"d-flex align-center mb-3 flex-wrap"},se={class:"d-flex align-center flex-wrap mb-3"},ie={class:"d-flex align-center flex-wrap"},oe=["muted"],ve=Q({__name:"recorder",setup(de){J({title:"Media Recorder",description:"Online free media recorder. Record audio and video in the browser.",path:"/recorder"});const r=X(),D=K(),_=u(!0),v=u(!1),d=u("none"),h=u(!0),f=u([]),R=u(""),T=u(""),c=u(!1),A=u(!0),b=u(null),s=u(null),g=u(null),p=u(null),P=u(null),$=[];async function j(){var l;(l=s.value)==null||l.getTracks().map(e=>e.stop()),s.value=null;try{s.value=await navigator.mediaDevices.getDisplayMedia({audio:!0,video:!0})}catch(e){console.log(e),s.value=null,d.value="none"}w("video")}async function w(l){if(!h.value){P.value.srcObject=null;return}await F(l),P.value.srcObject=g.value}async function W(){if(g.value==null){D.emit("toast","No stream to record");return}c.value=!0,$.length=0,p.value=new MediaRecorder(g.value,s.value==null?void 0:{mimeType:"video/webm;codecs=vp9"}),p.value.ondataavailable=l=>{$.push(l.data)},p.value.onstop=()=>{var l=document.createElement("a");l.download=s.value==null?"recording.mp3":"recording.webm",l.href=URL.createObjectURL(new Blob($,s.value==null?{type:"audio/mpeg-3"}:void 0)),l.click()},p.value.start(),D.emit("toast","Recording started"),console.log(p.value.state)}function z(){var l,e;c.value=!1,(l=p.value)==null||l.stop(),console.log((e=p.value)==null?void 0:e.state),p.value=null}async function F(l){var y,i,M,S;await Y(),["audio","all"].includes(l)&&((y=b.value)==null||y.getTracks().map(n=>n.stop()),b.value=null,v.value&&(b.value=await navigator.mediaDevices.getUserMedia({audio:{deviceId:{exact:f.value.filter(n=>n.label==R.value)[0].deviceId}}}))),["video","all"].includes(l)&&(d.value!="screen"&&((i=s.value)==null||i.getTracks().map(n=>n.stop()),s.value=null),d.value=="camera"&&(s.value=await navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:f.value.filter(n=>n.label==T.value)[0].deviceId}}})));let e=new MediaStream;(M=b.value)==null||M.getTracks().map(n=>e.addTrack(n)),(S=s.value)==null||S.getTracks().map(n=>e.addTrack(n)),g.value=e.getTracks().length==0?null:e}async function Y(){if(!_.value||!v.value&&d.value!="camera")return;(f.value.length==0||f.value.some(e=>e.label==""))&&D.emit("toast","Refreshing device list...");let l=await navigator.mediaDevices.enumerateDevices();if(l.some(e=>e.label==""))try{_.value=!1,(await navigator.mediaDevices.getUserMedia({audio:v.value,video:d.value=="camera"})).getTracks().map(e=>e.stop()),l=await navigator.mediaDevices.enumerateDevices()}catch{D.emit("toast","Failed to get media devices."),v.value=!1,d.value="screen",_.value=!0;return}f.value=l,R.value=E.value[0]||"",T.value=L.value[0]||"",_.value=!0,D.emit("toast","Device list refreshed")}function q(){var l,e,y;v.value=!1,d.value="none",h.value=!0,A.value=!0,(l=s.value)==null||l.getTracks().map(i=>i.stop()),s.value=null,(e=b.value)==null||e.getTracks().map(i=>i.stop()),b.value=null,(y=g.value)==null||y.getTracks().map(i=>i.stop()),g.value=null}Z(()=>{w("all")});const E=O(()=>f.value.filter(l=>l.kind.startsWith("audio")).map(l=>l.label)),L=O(()=>f.value.filter(l=>l.kind.startsWith("video")).map(l=>l.label));return(l,e)=>{const y=x("v-alert"),i=x("v-btn"),M=x("v-btn-toggle"),S=x("v-select"),n=x("v-checkbox"),G=x("v-card-text"),H=x("v-card");return ae(),ee("div",le,[o(y,{type:"info",closable:"",text:"The recording is handled by the local browser and will not be uploaded to any server.",class:"mb-3",density:"compact",variant:"tonal"}),N("div",te,[o(M,{mandatory:"",modelValue:a(v),"onUpdate:modelValue":[e[0]||(e[0]=t=>k(v)?v.value=t:null),e[1]||(e[1]=t=>w("audio"))],disabled:a(c),class:U(a(r).smAndUp.value?"":"flex-grow-1 mb-3")},{default:m(()=>[o(i,{value:!1,disabled:!a(v),"prepend-icon":"mdi-microphone-off",class:U(a(r).smAndUp.value?"":"flex-grow-1")},{default:m(()=>[V(" No Mic ")]),_:1},8,["disabled","class"]),o(i,{value:!0,disabled:a(v),"prepend-icon":"mdi-microphone",class:U(a(r).smAndUp.value?"":"flex-grow-1")},{default:m(()=>[V(" Enable Mic ")]),_:1},8,["disabled","class"])]),_:1},8,["modelValue","disabled","class"]),o(S,{label:"Microphone Device",items:a(E),modelValue:a(R),"onUpdate:modelValue":[e[2]||(e[2]=t=>k(R)?R.value=t:null),e[3]||(e[3]=t=>w("audio"))],variant:"outlined",density:"compact","hide-details":"",disabled:!a(v)||a(c),class:U(a(r).smAndUp.value?"ml-3":"flex-grow-1"),style:C(a(r).smAndUp.value?"":"min-width: 100%")},null,8,["items","modelValue","disabled","class","style"])]),N("div",se,[o(M,{divided:a(r).smAndUp.value,mandatory:"",modelValue:a(d),"onUpdate:modelValue":[e[4]||(e[4]=t=>k(d)?d.value=t:null),e[5]||(e[5]=t=>w("video"))],disabled:a(c),class:U(a(r).smAndUp.value?"mr-3":"flex-wrap mb-3"),style:C(a(r).smAndUp.value?"":"height: auto")},{default:m(()=>[o(i,{value:"none",disabled:a(d)=="none","prepend-icon":"mdi-video-off",style:C(a(r).smAndUp.value?"":"width: 100%; height: 48px")},{default:m(()=>[V(" No Video ")]),_:1},8,["disabled","style"]),o(i,{value:"screen",disabled:a(d)=="screen","prepend-icon":"mdi-monitor",onClick:j,style:C(a(r).smAndUp.value?"":"width: 100%; height: 48px")},{default:m(()=>[V(" Record Screen ")]),_:1},8,["disabled","style"]),o(i,{value:"camera",disabled:a(d)=="camera","prepend-icon":"mdi-camera",style:C(a(r).smAndUp.value?"":"width: 100%; height: 48px")},{default:m(()=>[V(" Camera ")]),_:1},8,["disabled","style"])]),_:1},8,["divided","modelValue","disabled","class","style"]),o(S,{label:"Camera Device",items:a(L),modelValue:a(T),"onUpdate:modelValue":[e[6]||(e[6]=t=>k(T)?T.value=t:null),e[7]||(e[7]=t=>w("video"))],variant:"outlined",density:"compact","hide-details":"",disabled:a(c)||a(d)!="camera"},null,8,["items","modelValue","disabled"])]),N("div",ie,[o(i,{color:"primary",disabled:!a(_)||a(g)==null,onClick:e[8]||(e[8]=t=>a(c)?z():W()),text:a(c)?"Stop Recording":a(s)?"Start Recording (mp4)":a(b)?"Start Recording (mp3)":"Start Recording","prepend-icon":a(c)?"mdi-stop":"mdi-record"},null,8,["disabled","text","prepend-icon"]),o(i,{class:"ml-3",onClick:q,text:"Reset","prepend-icon":"mdi-restart"}),o(n,{label:"Preview",modelValue:a(h),"onUpdate:modelValue":[e[9]||(e[9]=t=>k(h)?h.value=t:null),e[10]||(e[10]=t=>w("all"))],class:U(a(r).smAndUp.value?"ml-3":""),disabled:!a(_),"hide-details":"",style:{"flex-grow":"0"}},null,8,["modelValue","class","disabled"]),o(n,{label:"Mute Preview",modelValue:a(A),"onUpdate:modelValue":e[11]||(e[11]=t=>k(A)?A.value=t:null),class:"ml-3",style:{"flex-grow":"0"},"hide-details":""},null,8,["modelValue"])]),B(N("div",null,[B(o(H,{style:{width:"100%"}},{default:m(()=>[o(G,null,{default:m(()=>[V(" No preview available. Please select a video source. ")]),_:1})]),_:1},512),[[I,a(s)==null]]),B(N("video",{autoplay:"",ref_key:"preview",ref:P,muted:a(A),style:{width:"100%"}},null,8,oe),[[I,a(s)!=null]])],512),[[I,a(h)]])])}}});export{ve as default};
