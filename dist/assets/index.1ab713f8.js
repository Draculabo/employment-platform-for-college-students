var f=Object.defineProperty;var y=(e,t,o)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var p=(e,t,o)=>(y(e,typeof t!="symbol"?t+"":t,o),o);import{_ as m,E as w}from"./jspdf.93f2685e.js";import E from"./html2canvas.4d0ab5af.js";import{t as D}from"./theme.720c8352.js";import{E as g,a as P}from"./element-plus.deaf38ec.js";function v(e){g({showClose:!0,message:e,type:"success"})}function b(e){g({showClose:!0,message:e,type:"warning"})}function C(e){g({showClose:!0,message:e,type:"error"})}const L=(e,t)=>{const o=e[t];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((a,s)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+t)))})};async function V(e){return(await L(Object.assign({"../../assets/styles/common.scss":()=>m(()=>Promise.resolve({}),["./common.5520d807.css"],import.meta.url),"../../assets/styles/front_end.scss":()=>m(()=>Promise.resolve({}),["./front_end.72367926.css"],import.meta.url),"../../assets/styles/general.scss":()=>m(()=>Promise.resolve({}),["./general.97b17505.css"],import.meta.url),"../../assets/styles/internet.scss":()=>m(()=>Promise.resolve({}),["./internet.1d8f3b8e.css"],import.meta.url),"../../assets/styles/internet_avatar.scss":()=>m(()=>Promise.resolve({}),["./internet_avatar.f4b984b8.css"],import.meta.url),"../../assets/styles/operation.scss":()=>m(()=>Promise.resolve({}),["./operation.88109992.css"],import.meta.url),"../../assets/styles/operation_avatar.scss":()=>m(()=>Promise.resolve({}),["./operation_avatar.bba6dffc.css"],import.meta.url)}),`../../assets/styles/${e}.scss`)).default}const k=e=>{for(let t of D)if(e===t.type)return t.content;return""},B={h1:{max:20,min:-15,top:0,tag:"",optimal:0},h2:{max:20,min:-15,top:0,tag:"",optimal:0},h3:{max:20,min:-15,top:0,tag:"",optimal:0},h4:{max:30,min:-15,top:0,tag:"",optimal:0},h5:{max:30,min:-15,top:0,tag:"",optimal:0},h6:{max:30,min:-15,top:0,tag:"",optimal:0},li:{max:20,min:-15,top:0,tag:"",optimal:0},p:{max:20,min:-10,top:0,tag:"",optimal:0}},x=(e,t)=>e.optimal>t.optimal,h=(e,t,o)=>[e[t],e[o]]=[e[o],e[t]];class H{constructor(t){p(this,"container",[]);p(this,"cmp",x);this.cmp=t}push(t){const{container:o,cmp:a}=this;o.push(t);let s=o.length-1;for(;s;){let n=Math.floor((s-1)/2);if(!a(o[s],o[n]))return;h(o,s,n),s=n}}pop(){const{container:t,cmp:o}=this;if(!t.length)return null;h(t,0,t.length-1);const a=t.pop(),s=t.length;let n=0,i=n*2+1;for(;i<s;){let r=n*2+2;if(r<s&&o(t[r],t[i])&&(i=r),!o(t[i],t[n]))break;h(t,i,n),n=i,i=n*2+1}return a}top(){return this.container.length?this.container[0]:null}isEmpty(){return this.container.length===0}}function S(){return document.createElement("style")}function q(){return document.createElement("div")}function F(e){return document.head.querySelector(`style[${e}]`)}function $(e){var t;(t=F(e))==null||t.remove()}function U(e,t){const{showLoading:o,closeLoading:a}=I();o("\u6B63\u5728\u5BFC\u51FAPDF \u8BF7\u8010\u5FC3\u7B49\u5F85..."),E(t,{allowTaint:!1,logging:!1,useCORS:!0,scale:4}).then(s=>{var _;const n=new w("p","mm","a4"),i=s.getContext("2d"),r=210,d=297,c=Math.floor(d*s.width/r);let u=0;for(;u<s.height;){const l=document.createElement("canvas");l.width=s.width,l.height=Math.min(c,s.height-u),(_=l.getContext("2d"))==null||_.putImageData(i==null?void 0:i.getImageData(0,u,s.width,Math.min(c,s.height-u)),0,0),n.addImage(l.toDataURL("image/jpeg",1),"JPEG",0,0,r,Math.min(d,r*l.height/l.width)),u+=c,s.height-u>1&&n.addPage()}n.save(`${e}.pdf`),v("PDF\u5BFC\u51FA\u6210\u529F")}).catch(s=>{C("\u5BFC\u51FA\u5931\u8D25, "+s)}).finally(a)}function I(){let e=null;function t(a){e=P.service({lock:!0,text:a,background:"rgba(0, 0, 0, 0.7)"})}function o(){e&&e.close()}return{showLoading:t,closeLoading:o}}export{H,S as a,U as b,q as c,C as e,k as g,V as i,B as o,F as q,$ as r,v as s,b as w};