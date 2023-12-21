import{u as x}from"./useDttkMeta.33b0664f.js";import{u as L}from"./useEmitter.43e253ae.js";import{R as P,d as T,r as R,o as D,S as F,f as E,C as V,l as I,m as p,q as $,s as O,J as H,E as S,I as W,k,v as M,G as b}from"./entry.bf8a9811.js";class n{constructor(e,t,i,a,s){this._legacyCanvasSize=n.DEFAULT_CANVAS_SIZE,this._preferredCamera="environment",this._maxScansPerSecond=25,this._lastScanTimestamp=-1,this._destroyed=this._flashOn=this._paused=this._active=!1,this.$video=e,this.$canvas=document.createElement("canvas"),i&&typeof i=="object"?this._onDecode=t:(console.warn(i||a||s?"You're using a deprecated version of the QrScanner constructor which will be removed in the future":"Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),this._legacyOnDecode=t),t=typeof i=="object"?i:{},this._onDecodeError=t.onDecodeError||(typeof i=="function"?i:this._onDecodeError),this._calculateScanRegion=t.calculateScanRegion||(typeof a=="function"?a:this._calculateScanRegion),this._preferredCamera=t.preferredCamera||s||this._preferredCamera,this._legacyCanvasSize=typeof i=="number"?i:typeof a=="number"?a:this._legacyCanvasSize,this._maxScansPerSecond=t.maxScansPerSecond||this._maxScansPerSecond,this._onPlay=this._onPlay.bind(this),this._onLoadedMetaData=this._onLoadedMetaData.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),this._updateOverlay=this._updateOverlay.bind(this),e.disablePictureInPicture=!0,e.playsInline=!0,e.muted=!0;let o=!1;if(e.hidden&&(e.hidden=!1,o=!0),document.body.contains(e)||(document.body.appendChild(e),o=!0),i=e.parentElement,t.highlightScanRegion||t.highlightCodeOutline){if(a=!!t.overlay,this.$overlay=t.overlay||document.createElement("div"),s=this.$overlay.style,s.position="absolute",s.display="none",s.pointerEvents="none",this.$overlay.classList.add("scan-region-highlight"),!a&&t.highlightScanRegion){this.$overlay.innerHTML='<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';try{this.$overlay.firstElementChild.animate({transform:["scale(.98)","scale(1.01)"]},{duration:400,iterations:1/0,direction:"alternate",easing:"ease-in-out"})}catch{}i.insertBefore(this.$overlay,this.$video.nextSibling)}t.highlightCodeOutline&&(this.$overlay.insertAdjacentHTML("beforeend",'<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'),this.$codeOutlineHighlight=this.$overlay.lastElementChild)}this._scanRegion=this._calculateScanRegion(e),requestAnimationFrame(()=>{let l=window.getComputedStyle(e);l.display==="none"&&(e.style.setProperty("display","block","important"),o=!0),l.visibility!=="visible"&&(e.style.setProperty("visibility","visible","important"),o=!0),o&&(console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."),e.style.opacity="0",e.style.width="0",e.style.height="0",this.$overlay&&this.$overlay.parentElement&&this.$overlay.parentElement.removeChild(this.$overlay),delete this.$overlay,delete this.$codeOutlineHighlight),this.$overlay&&this._updateOverlay()}),e.addEventListener("play",this._onPlay),e.addEventListener("loadedmetadata",this._onLoadedMetaData),document.addEventListener("visibilitychange",this._onVisibilityChange),window.addEventListener("resize",this._updateOverlay),this._qrEnginePromise=n.createQrEngine()}static set WORKER_PATH(e){console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.")}static async hasCamera(){try{return!!(await n.listCameras(!1)).length}catch{return!1}}static async listCameras(e=!1){if(!navigator.mediaDevices)return[];let t=async()=>(await navigator.mediaDevices.enumerateDevices()).filter(a=>a.kind==="videoinput"),i;try{e&&(await t()).every(a=>!a.label)&&(i=await navigator.mediaDevices.getUserMedia({audio:!1,video:!0}))}catch{}try{return(await t()).map((a,s)=>({id:a.deviceId,label:a.label||(s===0?"Default Camera":`Camera ${s+1}`)}))}finally{i&&(console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"),n._stopVideoStream(i))}}async hasFlash(){let e;try{if(this.$video.srcObject){if(!(this.$video.srcObject instanceof MediaStream))return!1;e=this.$video.srcObject}else e=(await this._getCameraStream()).stream;return"torch"in e.getVideoTracks()[0].getSettings()}catch{return!1}finally{e&&e!==this.$video.srcObject&&(console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"),n._stopVideoStream(e))}}isFlashOn(){return this._flashOn}async toggleFlash(){this._flashOn?await this.turnFlashOff():await this.turnFlashOn()}async turnFlashOn(){if(!this._flashOn&&!this._destroyed&&(this._flashOn=!0,this._active&&!this._paused))try{if(!await this.hasFlash())throw"No flash available";await this.$video.srcObject.getVideoTracks()[0].applyConstraints({advanced:[{torch:!0}]})}catch(e){throw this._flashOn=!1,e}}async turnFlashOff(){this._flashOn&&(this._flashOn=!1,await this._restartVideoStream())}destroy(){this.$video.removeEventListener("loadedmetadata",this._onLoadedMetaData),this.$video.removeEventListener("play",this._onPlay),document.removeEventListener("visibilitychange",this._onVisibilityChange),window.removeEventListener("resize",this._updateOverlay),this._destroyed=!0,this._flashOn=!1,this.stop(),n._postWorkerMessage(this._qrEnginePromise,"close")}async start(){if(this._destroyed)throw Error("The QR scanner can not be started as it had been destroyed.");if((!this._active||this._paused)&&(window.location.protocol!=="https:"&&console.warn("The camera stream is only accessible if the page is transferred via https."),this._active=!0,!document.hidden))if(this._paused=!1,this.$video.srcObject)await this.$video.play();else try{let{stream:e,facingMode:t}=await this._getCameraStream();!this._active||this._paused?n._stopVideoStream(e):(this._setVideoMirror(t),this.$video.srcObject=e,await this.$video.play(),this._flashOn&&(this._flashOn=!1,this.turnFlashOn().catch(()=>{})))}catch(e){if(!this._paused)throw this._active=!1,e}}stop(){this.pause(),this._active=!1}async pause(e=!1){if(this._paused=!0,!this._active)return!0;this.$video.pause(),this.$overlay&&(this.$overlay.style.display="none");let t=()=>{this.$video.srcObject instanceof MediaStream&&(n._stopVideoStream(this.$video.srcObject),this.$video.srcObject=null)};return e?(t(),!0):(await new Promise(i=>setTimeout(i,300)),this._paused?(t(),!0):!1)}async setCamera(e){e!==this._preferredCamera&&(this._preferredCamera=e,await this._restartVideoStream())}static async scanImage(e,t,i,a,s=!1,o=!1){let l,d=!1;t&&("scanRegion"in t||"qrEngine"in t||"canvas"in t||"disallowCanvasResizing"in t||"alsoTryWithoutScanRegion"in t||"returnDetailedScanResult"in t)?(l=t.scanRegion,i=t.qrEngine,a=t.canvas,s=t.disallowCanvasResizing||!1,o=t.alsoTryWithoutScanRegion||!1,d=!0):console.warn(t||i||a||s||o?"You're using a deprecated api for scanImage which will be removed in the future.":"Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),t=!!i;try{let m,c;[i,m]=await Promise.all([i||n.createQrEngine(),n._loadImage(e)]),[a,c]=n._drawToCanvas(m,l,a,s);let u;if(i instanceof Worker){let r=i;t||n._postWorkerMessageSync(r,"inversionMode","both"),u=await new Promise((h,f)=>{let _,y,v,C=-1;y=g=>{g.data.id===C&&(r.removeEventListener("message",y),r.removeEventListener("error",v),clearTimeout(_),g.data.data!==null?h({data:g.data.data,cornerPoints:n._convertPoints(g.data.cornerPoints,l)}):f(n.NO_QR_CODE_FOUND))},v=g=>{r.removeEventListener("message",y),r.removeEventListener("error",v),clearTimeout(_),f("Scanner error: "+(g?g.message||g:"Unknown Error"))},r.addEventListener("message",y),r.addEventListener("error",v),_=setTimeout(()=>v("timeout"),1e4);let w=c.getImageData(0,0,a.width,a.height);C=n._postWorkerMessageSync(r,"decode",w,[w.data.buffer])})}else u=await Promise.race([new Promise((r,h)=>window.setTimeout(()=>h("Scanner error: timeout"),1e4)),(async()=>{try{var[r]=await i.detect(a);if(!r)throw n.NO_QR_CODE_FOUND;return{data:r.rawValue,cornerPoints:n._convertPoints(r.cornerPoints,l)}}catch(h){if(r=h.message||h,/not implemented|service unavailable/.test(r))return n._disableBarcodeDetector=!0,n.scanImage(e,{scanRegion:l,canvas:a,disallowCanvasResizing:s,alsoTryWithoutScanRegion:o});throw`Scanner error: ${r}`}})()]);return d?u:u.data}catch(m){if(!l||!o)throw m;let c=await n.scanImage(e,{qrEngine:i,canvas:a,disallowCanvasResizing:s});return d?c:c.data}finally{t||n._postWorkerMessage(i,"close")}}setGrayscaleWeights(e,t,i,a=!0){n._postWorkerMessage(this._qrEnginePromise,"grayscaleWeights",{red:e,green:t,blue:i,useIntegerApproximation:a})}setInversionMode(e){n._postWorkerMessage(this._qrEnginePromise,"inversionMode",e)}static async createQrEngine(e){if(e&&console.warn("Specifying a worker path is not required and not supported anymore."),e=()=>P(()=>import("./qr-scanner-worker.min.5f44a019.js"),[],import.meta.url).then(i=>i.createWorker()),!(!n._disableBarcodeDetector&&"BarcodeDetector"in window&&BarcodeDetector.getSupportedFormats&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code")))return e();let t=navigator.userAgentData;return t&&t.brands.some(({brand:i})=>/Chromium/i.test(i))&&/mac ?OS/i.test(t.platform)&&await t.getHighEntropyValues(["architecture","platformVersion"]).then(({architecture:i,platformVersion:a})=>/arm/i.test(i||"arm")&&13<=parseInt(a||"13")).catch(()=>!0)?e():new BarcodeDetector({formats:["qr_code"]})}_onPlay(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay(),this.$overlay&&(this.$overlay.style.display=""),this._scanFrame()}_onLoadedMetaData(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay()}_onVisibilityChange(){document.hidden?this.pause():this._active&&this.start()}_calculateScanRegion(e){let t=Math.round(.6666666666666666*Math.min(e.videoWidth,e.videoHeight));return{x:Math.round((e.videoWidth-t)/2),y:Math.round((e.videoHeight-t)/2),width:t,height:t,downScaledWidth:this._legacyCanvasSize,downScaledHeight:this._legacyCanvasSize}}_updateOverlay(){requestAnimationFrame(()=>{if(this.$overlay){var e=this.$video,t=e.videoWidth,i=e.videoHeight,a=e.offsetWidth,s=e.offsetHeight,o=e.offsetLeft,l=e.offsetTop,d=window.getComputedStyle(e),m=d.objectFit,c=t/i,u=a/s;switch(m){case"none":var r=t,h=i;break;case"fill":r=a,h=s;break;default:(m==="cover"?c>u:c<u)?(h=s,r=h*c):(r=a,h=r/c),m==="scale-down"&&(r=Math.min(r,t),h=Math.min(h,i))}var[f,_]=d.objectPosition.split(" ").map((v,C)=>{const w=parseFloat(v);return v.endsWith("%")?(C?s-h:a-r)*w/100:w});d=this._scanRegion.width||t,u=this._scanRegion.height||i,m=this._scanRegion.x||0;var y=this._scanRegion.y||0;c=this.$overlay.style,c.width=`${d/t*r}px`,c.height=`${u/i*h}px`,c.top=`${l+_+y/i*h}px`,i=/scaleX\(-1\)/.test(e.style.transform),c.left=`${o+(i?a-f-r:f)+(i?t-m-d:m)/t*r}px`,c.transform=e.style.transform}})}static _convertPoints(e,t){if(!t)return e;let i=t.x||0,a=t.y||0,s=t.width&&t.downScaledWidth?t.width/t.downScaledWidth:1;t=t.height&&t.downScaledHeight?t.height/t.downScaledHeight:1;for(let o of e)o.x=o.x*s+i,o.y=o.y*t+a;return e}_scanFrame(){!this._active||this.$video.paused||this.$video.ended||("requestVideoFrameCallback"in this.$video?this.$video.requestVideoFrameCallback.bind(this.$video):requestAnimationFrame)(async()=>{if(!(1>=this.$video.readyState)){var e=Date.now()-this._lastScanTimestamp,t=1e3/this._maxScansPerSecond;e<t&&await new Promise(a=>setTimeout(a,t-e)),this._lastScanTimestamp=Date.now();try{var i=await n.scanImage(this.$video,{scanRegion:this._scanRegion,qrEngine:this._qrEnginePromise,canvas:this.$canvas})}catch(a){if(!this._active)return;this._onDecodeError(a)}!n._disableBarcodeDetector||await this._qrEnginePromise instanceof Worker||(this._qrEnginePromise=n.createQrEngine()),i?(this._onDecode?this._onDecode(i):this._legacyOnDecode&&this._legacyOnDecode(i.data),this.$codeOutlineHighlight&&(clearTimeout(this._codeOutlineHighlightRemovalTimeout),this._codeOutlineHighlightRemovalTimeout=void 0,this.$codeOutlineHighlight.setAttribute("viewBox",`${this._scanRegion.x||0} ${this._scanRegion.y||0} ${this._scanRegion.width||this.$video.videoWidth} ${this._scanRegion.height||this.$video.videoHeight}`),this.$codeOutlineHighlight.firstElementChild.setAttribute("points",i.cornerPoints.map(({x:a,y:s})=>`${a},${s}`).join(" ")),this.$codeOutlineHighlight.style.display="")):this.$codeOutlineHighlight&&!this._codeOutlineHighlightRemovalTimeout&&(this._codeOutlineHighlightRemovalTimeout=setTimeout(()=>this.$codeOutlineHighlight.style.display="none",100))}this._scanFrame()})}_onDecodeError(e){e!==n.NO_QR_CODE_FOUND&&console.log(e)}async _getCameraStream(){if(!navigator.mediaDevices)throw"Camera not found.";let e=/^(environment|user)$/.test(this._preferredCamera)?"facingMode":"deviceId",t=[{width:{min:1024}},{width:{min:768}},{}],i=t.map(a=>Object.assign({},a,{[e]:{exact:this._preferredCamera}}));for(let a of[...i,...t])try{let s=await navigator.mediaDevices.getUserMedia({video:a,audio:!1}),o=this._getFacingMode(s)||(a.facingMode?this._preferredCamera:this._preferredCamera==="environment"?"user":"environment");return{stream:s,facingMode:o}}catch{}throw"Camera not found."}async _restartVideoStream(){let e=this._paused;await this.pause(!0)&&!e&&this._active&&await this.start()}static _stopVideoStream(e){for(let t of e.getTracks())t.stop(),e.removeTrack(t)}_setVideoMirror(e){this.$video.style.transform="scaleX("+(e==="user"?-1:1)+")"}_getFacingMode(e){return(e=e.getVideoTracks()[0])?/rear|back|environment/i.test(e.label)?"environment":/front|user|face/i.test(e.label)?"user":null:null}static _drawToCanvas(e,t,i,a=!1){i=i||document.createElement("canvas");let s=t&&t.x?t.x:0,o=t&&t.y?t.y:0,l=t&&t.width?t.width:e.videoWidth||e.width,d=t&&t.height?t.height:e.videoHeight||e.height;return a||(a=t&&t.downScaledWidth?t.downScaledWidth:l,t=t&&t.downScaledHeight?t.downScaledHeight:d,i.width!==a&&(i.width=a),i.height!==t&&(i.height=t)),t=i.getContext("2d",{alpha:!1}),t.imageSmoothingEnabled=!1,t.drawImage(e,s,o,l,d,0,0,i.width,i.height),[i,t]}static async _loadImage(e){if(e instanceof Image)return await n._awaitImageLoad(e),e;if(e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement||e instanceof SVGImageElement||"OffscreenCanvas"in window&&e instanceof OffscreenCanvas||"ImageBitmap"in window&&e instanceof ImageBitmap)return e;if(e instanceof File||e instanceof Blob||e instanceof URL||typeof e=="string"){let t=new Image;t.src=e instanceof File||e instanceof Blob?URL.createObjectURL(e):e.toString();try{return await n._awaitImageLoad(t),t}finally{(e instanceof File||e instanceof Blob)&&URL.revokeObjectURL(t.src)}}else throw"Unsupported image type."}static async _awaitImageLoad(e){e.complete&&e.naturalWidth!==0||await new Promise((t,i)=>{let a=s=>{e.removeEventListener("load",a),e.removeEventListener("error",a),s instanceof ErrorEvent?i("Image load error"):t()};e.addEventListener("load",a),e.addEventListener("error",a)})}static async _postWorkerMessage(e,t,i,a){return n._postWorkerMessageSync(await e,t,i,a)}static _postWorkerMessageSync(e,t,i,a){if(!(e instanceof Worker))return-1;let s=n._workerMessageId++;return e.postMessage({id:s,type:t,data:i},a),s}}n.DEFAULT_CANVAS_SIZE=400;n.NO_QR_CODE_FOUND="No QR code found";n._disableBarcodeDetector=!1;n._workerMessageId=0;const j={class:"mx-3"},A={class:"d-flex flex-wrap justify-center flex-wrap"},q={class:"d-flex flex-column align-center mx-3"},B={class:"flex-grow-1 d-flex flex-column align-center"},U=p("div",{class:"d-flex justify-center"},[p("p",{style:{color:"grey","font-style":"italic","font-weight":"bold"}}," You can also paste image in this page. (Ctrl+V or Cmd+V) ")],-1),Y=T({__name:"scan-qrcode",setup(N){x({title:"QRCode Scanner",description:"Scan QRCode from an image",path:"/scan-qrcode"});const e=L(),t=R(null),i=R("");D(()=>{t.value.onload=()=>{n.scanImage(t.value.src,{returnDetailedScanResult:!0}).then(s=>{i.value=s.data}).catch(s=>{i.value=s.toString()})}});function a(){const s=document.createElement("input");s.type="file",s.accept="image/*",s.onchange=()=>{var l;const o=(l=s.files)==null?void 0:l[0];if(o){const d=new FileReader;d.onload=()=>{t.value.src=d.result},d.readAsDataURL(o)}},s.click()}return D(()=>{document.onpaste=function(s){var o=s.clipboardData.items;for(var l in o){var d=o[l];if(d.kind==="file"){var m=d.getAsFile(),c=new FileReader;c.onload=function(u){t.value.src=u.target.result},c.readAsDataURL(m);return}}e.emit("toast","No image found in clipboard")}}),F(()=>{document.onpaste=null}),(s,o)=>{const l=E("v-btn"),d=E("v-textarea"),m=E("v-card"),c=V("clipboard");return k(),I("div",j,[p("div",A,[p("div",q,[p("img",{style:{"min-width":"300px"},height:"300",ref_key:"img",ref:t},null,512),$(l,{block:"",onClick:a,class:"my-2"},{default:O(()=>[M(" Choose a File ")]),_:1})]),p("div",B,[H((k(),W(m,{style:{width:"100%"},density:"compact",onClick:S(i).length},{default:O(()=>[$(d,{modelValue:S(i),"onUpdate:modelValue":o[0]||(o[0]=u=>b(i)?i.value=u:null),label:"QR Code Content"+(S(i).length===0?"":" (Click to Copy)"),variant:"solo",counter:"","no-resize":"",rows:"11",disabled:"","hide-details":""},null,8,["modelValue","label"])]),_:1},8,["onClick"])),[[c,S(i),"copy"],[c,()=>S(e).emit("toast","Copied"),"success"]]),$(l,{block:"",style:{width:"100%"},onClick:o[1]||(o[1]=u=>i.value=""),class:"my-2"},{default:O(()=>[M(" Clear Result ")]),_:1})])]),U])}}});export{Y as default};
