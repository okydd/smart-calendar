const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./localNotify-Dj2HAYFZ.js","./index-DNzFMgCo.js","./vendor-CXP2eCqR.js","./vendor-react-DFxU1kFX.js","./vendor-antd-Cb0Idufk.js","./vendor-antd-BdOndhxL.css"])))=>i.map(i=>d[i]);
var uo=Object.defineProperty;var ho=(t,e,o)=>e in t?uo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var Lt=(t,e,o)=>ho(t,typeof e!="symbol"?e+"":e,o);import{r as i,j as n,u as _n,f as mo,h as vo,i as po,k as hn,N as qt,R as ye,l as fo,H as go}from"./vendor-react-DFxU1kFX.js";import{s as Cn,I as xn,A as fn,R as ut,a as It,b as _t,M as cn,c as et,d as Yn,e as Yt,f as bt,g as gn,h as Vt,i as Co,j as xo,k as jt,l as Bt,m as yo,n as be,o as je,p as ke,q as bo,r as jo,t as ko,D as So,u as Fn,E as kt,v as Se,w as No,S as wo,x as Eo,y as To,z as Ao,B as ot,C as Ne,F as $o,G as we,H as Ro,J as Po,K as Io,L as _o,N as Ee,O as Do,P as Mo,Q as Te,T as mt,U as Ae,V as Oo,W as wn,X as Uo,Y as Lo,Z as qo,_ as Yo,$ as zt,a0 as Vo,a1 as Bo,a2 as An,a3 as vt,a4 as zo,a5 as Wo,a6 as Ko,a7 as Ho,a8 as Wt,a9 as Fo}from"./vendor-antd-Cb0Idufk.js";import{x as U,A as Jo,I as Go,y as Xo,J as Qo,K as Zo}from"./vendor-CXP2eCqR.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const na="modulepreload",ta=function(t,e){return new URL(t,e).href},Kt={},Bn=function(e,o,a){let s=Promise.resolve();if(o&&o.length>0){const c=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),l=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=Promise.allSettled(o.map(m=>{if(m=ta(m,a),m in Kt)return;Kt[m]=!0;const u=m.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(!!a)for(let x=c.length-1;x>=0;x--){const g=c[x];if(g.href===m&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${m}"]${p}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":na,u||(f.as="script"),f.crossOrigin="",f.href=m,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((x,g)=>{f.addEventListener("load",x),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return s.then(c=>{for(const d of c||[])d.status==="rejected"&&r(d.reason);return e().catch(r)})};U.extend(Jo);U.extend(Go);U.extend(Xo);U.locale("zh-cn");const ea=["日","一","二","三","四","五","六"],pt=t=>t.format("YYYY-MM-DD"),an=t=>U(t,"YYYY-MM-DD",!0),oa=t=>t.isoWeekday(1),aa=t=>t.date(1),bn=t=>`星期${ea[t.day()]}`,sa=t=>`${t.format("MM")}月${t.format("DD")}日`,Kn=t=>t.allDay||!t.startTime?"全天":t.endTime?`${t.startTime} - ${t.endTime}`:t.startTime,yn=t=>{if(!t)return 0;const[e,o]=t.split(":").map(Number);return e*60+(o||0)},ra=()=>U().format("YYYY-MM-DD HH:mm:ss"),ca=t=>{try{const o=Qo.Solar.fromYmd(t.year(),t.month()+1,t.date()).getLunar();return`${o.getMonthInChinese()}月${o.getDayInChinese()}`}catch{return""}},St="calendarEvents",Jn={headerGradientStart:"#5e60ff",headerGradientEnd:"#3b7cff",textDark:"#1c1c1e"},Nt="007722",wt="#ff3b30",ia=[{label:"14天",unit:"day",value:14},{label:"7天",unit:"day",value:7},{label:"3天",unit:"day",value:3},{label:"2天",unit:"day",value:2},{label:"1天",unit:"day",value:1},{label:"2小时",unit:"hour",value:2},{label:"1小时",unit:"hour",value:1},{label:"30分钟",unit:"minute",value:30},{label:"15分钟",unit:"minute",value:15}],jn="https://github.com/okydd/smart-calendar/releases/download/apk/smart-calendar.apk",Tn="https://okydd.github.io/smart-calendar/",In="https://github.com/okydd/smart-calendar/releases/tag/apk",la=90;function ua(){try{const t=localStorage.getItem(St);if(!t)return null;const e=JSON.parse(t);if(!Array.isArray(e))return null;const o=Date.now(),a=la*24*3600*1e3;return e.filter(s=>{if(!(s!=null&&s.deleted))return!0;const r=s.updatedAt?Date.parse(s.updatedAt):0;return o-r<a}).map(s=>({...s,updatedAt:s.updatedAt||new Date(0).toISOString()}))}catch{return null}}let Et=null;function Ht(t){Et=t}async function da(t){try{return localStorage.setItem(St,JSON.stringify(t)),{ok:!0}}catch(e){const o=String((e==null?void 0:e.message)??""),a=o.includes("Quota")||o.includes("quota")||o.includes("exceeded")||o.includes("Exceeded");if(a&&Et)try{const r=await Et(t);return localStorage.setItem(St,JSON.stringify(r)),{ok:!0,rescued:!0}}catch(r){const c=String((r==null?void 0:r.message)??"");return console.error("配额救援失败",r),{ok:!1,error:"本机存储空间已满，自动把图片上传到云端失败："+c+"。请手动导出 JSON 备份后删除部分旧事件，或登录云同步后重试。"}}const s=a?"本机存储空间已满：事件中的图片过多，请导出 JSON 备份后删除部分旧事件，或开启云同步把图片上传到云端。":"保存日历事件失败："+o;return console.error("保存日历事件失败",e),{ok:!1,error:s}}}const ha=["sample-weekly-meeting","sample-fitness","sample-doctor","sample-review","sample-birthday","sample-reading"];function ma(t){const e=(t.title||"").trim().replace(/\s+/g," "),o=t.allDay?"":(t.startTime||"").trim(),a=t.allDay?"":(t.endTime||"").trim();return[e,t.date,o,a,t.allDay?"1":"0"].join("")}function Ft(t){let e=0;return t.description&&t.description.trim()&&(e+=2),t.images&&t.images.length&&(e+=t.images.length*3),t.reminder&&t.reminder.length&&(e+=2),t.important&&(e+=1),t.done&&(e+=1),e}function $e(t){const e=new Map;for(const a of t){if(a.deleted||!a.title||!a.date)continue;const s=ma(a),r=e.get(s);r?r.push(a):e.set(s,[a])}const o=[];for(const[a,s]of e){if(s.length<2)continue;const r=[...s].sort((l,m)=>{const u=Ft(m)-Ft(l);if(u!==0)return u;const p=Date.parse(l.updatedAt||"")||0,h=Date.parse(m.updatedAt||"")||0;return h!==p?h-p:l.id.localeCompare(m.id)}),[c,...d]=r;o.push({key:a,title:c.title,date:c.date,keep:c,drop:d})}return o.sort((a,s)=>a.date.localeCompare(s.date)),o}function va(t){return $e(t).reduce((e,o)=>e+o.drop.length,0)}function Jt(t){const e=$e(t);if(!e.length)return{events:t,removed:0};const o=new Set;for(const r of e)for(const c of r.drop)o.add(c.id);const a=new Date().toISOString();return{events:t.map(r=>o.has(r.id)?{...r,deleted:!0,updatedAt:a}:r),removed:o.size}}const Rn=()=>new Date().toISOString(),Gt="calendarDedupeV1",Xt="calendarCleanSampleV1";function pa(){return ua()??[]}function Qt(t){return{...t,updatedAt:Rn()}}const Re=i.createContext(null);function fa({children:t}){const[e,o]=i.useState(pa),[a,s]=i.useState("month"),[r,c]=i.useState(U()),[d,l]=i.useState(null),[m,u]=i.useState(""),[p,h]=i.useState(null),[f,x]=i.useState(0),g=i.useRef(e);g.current=e;const v=i.useRef(!1);i.useEffect(()=>{let I=!1;return(async()=>{const C=await da(e);I||(C.ok?(C.rescued&&Cn.success("本机存储已满，已自动把图片上传到云端并释放空间",4),v.current=!1):v.current||(v.current=!0,Cn.error(C.error,6)))})(),()=>{I=!0}},[e]);const j=i.useCallback(I=>{o(C=>{const $=I(C);return g.current=$,$}),x(C=>C+1)},[]),w=i.useMemo(()=>e.filter(I=>!I.deleted&&I.kind!=="question"),[e]),S=i.useMemo(()=>{const I=m.trim().toLowerCase();return w.filter(C=>!(I&&!`${C.title} ${C.description||""}`.toLowerCase().includes(I)))},[w,m]),P=i.useMemo(()=>w.find(I=>I.id===d)??null,[w,d]),E=i.useCallback(I=>l(I),[]),A=i.useCallback(I=>{j(C=>{var $;return[...C,Qt({...I,id:(($=crypto.randomUUID)==null?void 0:$.call(crypto))??`${Date.now()}-${Math.random()}`})]})},[j]),L=i.useCallback((I,C)=>{j($=>$.map(W=>W.id===I?{...W,...Qt(C)}:W))},[j]),q=i.useCallback(I=>{j(C=>C.map($=>$.id===I?{...$,deleted:!0,updatedAt:Rn()}:$)),l(C=>C===I?null:C)},[j]),N=i.useCallback(I=>{j(C=>C.map($=>$.id===I?{...$,done:!$.done,updatedAt:Rn()}:$))},[j]),b=i.useCallback(I=>{j(C=>{const $=new Set(I.map(R=>R.id)),W=C.filter(R=>!$.has(R.id)&&!R.deleted).map(R=>({...R,deleted:!0,updatedAt:Rn()}));return[...I.map(R=>({...R,updatedAt:Rn()})),...W]}),l(null)},[j]),T=i.useMemo(()=>va(e),[e]);i.useEffect(()=>{try{if(localStorage.getItem(Gt))return}catch{return}const I=setTimeout(()=>{try{localStorage.setItem(Gt,"1")}catch{}const{events:C,removed:$}=Jt(g.current);$>0&&(j(()=>C),Cn.success(`已自动清理 ${$} 条重复事件`,4))},8e3);return()=>clearTimeout(I)},[j]);const O=i.useCallback(()=>{const{events:I,removed:C}=Jt(g.current);return C>0&&j(()=>I),C},[j]);i.useEffect(()=>{try{if(localStorage.getItem(Xt))return}catch{return}const I=setTimeout(()=>{try{localStorage.setItem(Xt,"1")}catch{}const C=new Set(ha);let $=0;const W=g.current.map(_=>!_.deleted&&C.has(_.id)?($++,{..._,deleted:!0,updatedAt:Rn()}):_);$>0&&(j(()=>W),Cn.success(`已移除 ${$} 条示例数据`,4))},9e3);return()=>clearTimeout(I)},[j]);const V=i.useCallback(I=>{o(()=>(g.current=I,I))},[]),F=i.useCallback(()=>g.current,[]),X={events:w,allEvents:e,filteredEvents:S,view:a,currentDate:r,selectedEventId:d,selectedEvent:P,search:m,focusQuestionId:p,setFocusQuestionId:h,revision:f,setView:s,setCurrentDate:c,selectEvent:E,setSearch:u,addEvent:A,updateEvent:L,deleteEvent:q,toggleDone:N,importEvents:b,duplicateCount:T,dedupeNow:O,applyMerged:V,snapshot:F};return n.jsx(Re.Provider,{value:X,children:t})}function mn(){const t=i.useContext(Re);if(!t)throw new Error("useCalendar 必须在 CalendarProvider 内使用");return t}const Dt="calendarSyncConfig";function Pe(){const t="https://uppdqtukckhwkyuwpmuz.supabase.co".trim(),e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcGRxdHVrY2tod2t5dXdwbXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NDIyMTgsImV4cCI6MjEwMTQxODIxOH0.USdg-dX47lnQvD5JJ9dY_0sT1hj1rsvcGqU0K6hu1do".trim();return t&&e?{url:t,anonKey:e}:null}function ga(){try{const t=localStorage.getItem(Dt);if(!t)return null;const e=JSON.parse(t);if(typeof(e==null?void 0:e.url)=="string"&&typeof(e==null?void 0:e.anonKey)=="string"&&e.url&&e.anonKey)return{url:e.url.trim(),anonKey:e.anonKey.trim()}}catch{}return null}function at(){return Pe()??ga()}function Ca(){return Pe()!==null}function xa(t){localStorage.setItem(Dt,JSON.stringify({url:t.url.trim().replace(/\/+$/,""),anonKey:t.anonKey.trim()}))}function ya(){localStorage.removeItem(Dt)}function ba(t,e){const o=t.trim(),a=e.trim();return o?/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(o.replace(/\/+$/,""))?a?a.length<40?"anon key 看起来不完整，请复制完整的一长串字符":null:"请填写 anon public key":"Project URL 格式应为 https://xxxxx.supabase.co":"请填写 Project URL"}let Pn=null,st="";function un(){const t=at();if(!t)return Pn=null,st="",null;const e=`${t.url}|${t.anonKey}`;return Pn&&e===st||(Pn=Zo(t.url,t.anonKey,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!1,storageKey:"calendarAuth"}}),st=e),Pn}function Zt(){Pn=null,st=""}const Ie=["purple","green","orange","red","blue","pink"];function ja(t){return{id:t.id,title:t.title??"",date:t.date??"",startTime:t.start_time??"",endTime:t.end_time??"",allDay:!!t.all_day,description:t.description??"",tag:Ie.includes(t.tag)?t.tag:"purple",kind:t.kind==="question"?"question":"event",done:!!t.done,deleted:!!t.deleted,important:!!t.important,images:Array.isArray(t.images)?t.images:[],reminder:Array.isArray(t.reminder)?t.reminder:void 0,updatedAt:t.updated_at}}function ka(t,e){return{id:t.id,user_id:e,title:t.title??"",date:t.date??"",start_time:t.startTime??"",end_time:t.endTime??"",all_day:!!t.allDay,description:t.description??"",tag:Ie.includes(t.tag)?t.tag:"purple",kind:t.kind==="question"?"question":"event",done:!!t.done,deleted:!!t.deleted,important:!!t.important,images:Array.isArray(t.images)?t.images:[],reminder:Array.isArray(t.reminder)?t.reminder:[],updated_at:t.updatedAt||new Date(0).toISOString()}}const ne=t=>t&&Date.parse(t)||0;function Sa(t,e){const o=new Map,a=[];let s=0;for(const c of t)o.set(c.id,c);for(const c of e){const d=o.get(c.id);if(!d){o.set(c.id,c),s++;continue}const l=ne(c.updatedAt),m=ne(d.updatedAt);let u,p,h;if(l>m)u=c,p=!0,h=!1;else if(m>l)u=d,p=!1,h=!0;else{const f=Array.isArray(c.images)&&c.images.length>0,x=Array.isArray(d.images)&&d.images.length>0;f&&!x?(u=c,p=!0,h=!1):x&&!f?(u=d,p=!1,h=!0):(u=c,p=!0,h=!1)}if(!Array.isArray(u.images)||u.images.length===0){const f=u===c?d:c;Array.isArray(f.images)&&f.images.length>0&&(u={...u,images:f.images},h=!0,p=!1)}if(!Array.isArray(u.reminder)||u.reminder.length===0){const f=u===c?d:c;Array.isArray(f.reminder)&&f.reminder.length>0&&(u={...u,reminder:f.reminder},h=!0,p=!1)}o.set(c.id,u),p&&s++,h&&a.push(u)}const r=new Set(e.map(c=>c.id));for(const c of t)r.has(c.id)||a.push(c);return{merged:Array.from(o.values()),toPush:a,pulledCount:s}}const _e="calendarStrongRemind",te={enabled:!0,sound:!0,vibrate:!0};function rt(){try{const t=localStorage.getItem(_e);if(t)return{...te,...JSON.parse(t)}}catch{}return te}function Na(t){try{localStorage.setItem(_e,JSON.stringify(t))}catch{}}const De=`

────────────
📱 智能日历安卓版（当前版本 APK）下载：
${jn}`,wa=`<p class="foot"><a href="${jn}" style="color:#3b7cff;text-decoration:none;">📱 下载智能日历安卓版（当前版本 APK）</a></p>`,Me="calendarNotify";function Ea(t){const e=new TextEncoder().encode(t);let o="";return e.forEach(a=>{o+=String.fromCharCode(a)}),btoa(o)}const ee={emailTarget:"",emailjsServiceId:"",emailjsTemplateId:"",emailjsPublicKey:"",wechatSendKey:"",dingtalkWebhook:"",dingtalkSecret:""};function ln(){try{const t=localStorage.getItem(Me);if(t)return{...ee,...JSON.parse(t)}}catch{}return ee}function Oe(t){localStorage.setItem(Me,JSON.stringify(t))}function Dn(t=ln()){return!!(t.emailTarget&&t.emailjsServiceId&&t.emailjsTemplateId&&t.emailjsPublicKey)}function zn(t=ln()){return!!t.wechatSendKey}function Wn(t=ln()){return!!(t.dingtalkWebhook&&t.dingtalkWebhook.includes("access_token="))}function Ta(t,e){const o=t.filter(s=>!s.deleted).sort((s,r)=>s.date<r.date?-1:1).map(s=>{const r=an(s.date);return`${r.isValid()?`${r.month()+1}月${r.date()}日`:s.date} ${Kn(s)} ${s.title}`});return["【日历事件清单】",`选取时间范围：${e.rangeStart} 至 ${e.rangeEnd}`,`导出数据时间：${e.exportTime}`,`事件总数：${o.length} 条`].join(`
`)+`
`+(o.join(`
`)||"（无事件）")}function Ue(t,e){const o=t.filter(s=>!s.deleted).sort((s,r)=>s.date<r.date?-1:1),a=o.map((s,r)=>{const c=an(s.date),d=c.isValid()?`${c.year()}年${c.month()+1}月${c.date()}日 ${bn(c)}`:s.date,l=[`${r+1}. ${s.title}${s.important?"【重要】":""}${s.done?"【已完成】":""}`,`   时间：${d} ｜ ${Kn(s)}`,s.description?`   备注：${s.description}`:""];if(s.images&&s.images.length){const m=s.images.filter(u=>/^https?:\/\//i.test(u));l.push(m.length?`   图片(${s.images.length} 张)：${m.join("  ")}`:`   图片：${s.images.length} 张（本地存储，详见网页端）`)}return l.filter(Boolean).join(`
`)}).join(`
`);return["【日历事件清单（完整版）】",`选取时间范围：${e.rangeStart} 至 ${e.rangeEnd}`,`导出数据时间：${e.exportTime}`,`事件总数：${o.length} 条`,"",a||"（无事件）"].join(`
`)+De}function dn(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Le(t){return t.filter(o=>!o.deleted).sort((o,a)=>o.date<a.date?-1:1).map(o=>{const a=an(o.date),s=a.isValid()?`${a.year()}年${a.month()+1}月${a.date()}日 ${bn(a)}`:o.date,r=Kn(o),c=(o.images||[]).filter(h=>/^https?:\/\//i.test(h)),d=(o.images||[]).length>c.length,l=c.length?`<div class="imgs">${c.map(h=>`<img src="${dn(h)}" alt="事件图片" />`).join("")}</div>`:"",m=d?'<div class="d" style="color:#999;">（含本地图片，未上传前不显示在邮件中）</div>':"",u=(o.important?'<span class="tag imp">重要</span>':"")+(o.done?'<span class="tag done">已完成</span>':""),p=o.description?dn(o.description).slice(0,500)+(o.description.length>500?"…":""):"";return`<div class="ev">
  <div class="t">${dn(o.title)}${u}</div>
  <div class="m">📅 ${s} ｜ 🕒 ${r}</div>
  ${p?`<div class="d"><b>备注：</b>${p}</div>`:""}
  ${l}
  ${m}
</div>`}).join(`
`)}function Aa(t,e){const o=t.filter(s=>!s.deleted).sort((s,r)=>s.date<r.date?-1:1),a=Le(t);return`<div style="font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;background:#f3f4f8;color:#1c1c1e;padding:18px;margin:0;">
  <div style="background:linear-gradient(135deg,#3b7cff,#5e60ff);color:#fff;border-radius:14px;padding:14px 18px;">
    <h1 style="margin:0 0 6px;font-size:18px;">智能日历 · 事件清单（完整版）</h1>
    <p style="margin:2px 0;font-size:12px;opacity:.9;">选取时间范围：${dn(e.rangeStart)} 至 ${dn(e.rangeEnd)}</p>
    <p style="margin:2px 0;font-size:12px;opacity:.9;">导出时间：${dn(e.exportTime)} ｜ 共 ${o.length} 条事件</p>
  </div>
  ${a||'<p style="text-align:center;color:#9aa0b4;font-size:12px;margin-top:14px;">（无事件）</p>'}
  <p style="text-align:center;color:#9aa0b4;font-size:12px;margin-top:14px;">由「智能日历」自动生成</p>
  ${wa}
</div>`}function $a(t,e){const o=t.filter(m=>!m.deleted).sort((m,u)=>m.date<u.date?-1:1),a=Le(t),s=JSON.stringify(o,null,2),r=`data:application/json;base64,${Ea(s)}`;let c=!1,d;return qn(r)<=28*1024?(c=!0,d=`<a href="${r}" download="calendar-events-${dn(e.rangeStart)}_${dn(e.rangeEnd)}.json" class="btn" style="display:inline-block;background:linear-gradient(135deg,#3b7cff,#5e60ff);color:#fff;font-size:14px;font-weight:600;padding:10px 18px;border-radius:10px;text-decoration:none;">⬇️ 下载完整 JSON 数据</a>`):d='<div style="color:#999;font-size:12px;margin-top:10px;">本期数据较大，邮件内未生成下载链接，请在 APP 内「导出数据」获取 JSON。</div>',{html:`<div style="font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;background:#f3f4f8;color:#1c1c1e;padding:18px;margin:0;">
  <div style="background:linear-gradient(135deg,#3b7cff,#5e60ff);color:#fff;border-radius:14px;padding:14px 18px;">
    <h1 style="margin:0 0 6px;font-size:18px;">智能日历 · 每日自动数据推送</h1>
    <p style="margin:2px 0;font-size:12px;opacity:.9;">时间范围：${dn(e.rangeStart)} 至 ${dn(e.rangeEnd)}</p>
    <p style="margin:2px 0;font-size:12px;opacity:.9;">推送时间：${dn(e.exportTime)} ｜ 共 ${o.length} 条事件</p>
  </div>
  ${a||'<p style="text-align:center;color:#9aa0b4;font-size:12px;margin-top:14px;">（该时间段无事件）</p>'}
  <div style="text-align:center;margin-top:14px;">${d}</div>
  <div style="background:#fff;border-radius:12px;padding:14px 16px;margin-top:14px;">
    <div style="font-size:13px;font-weight:700;margin-bottom:8px;">相关链接</div>
    <a href="${Tn}" style="display:block;color:#3b7cff;text-decoration:none;font-size:13px;margin:6px 0;">🔗 电脑网页版：${Tn}</a>
    <a href="${jn}" style="display:block;color:#3b7cff;text-decoration:none;font-size:13px;margin:6px 0;">📱 安卓 APK 下载：${jn}</a>
    <a href="${In}" style="display:block;color:#3b7cff;text-decoration:none;font-size:13px;margin:6px 0;">📦 GitHub 发布页：${In}</a>
  </div>
  <p style="text-align:center;color:#9aa0b4;font-size:12px;margin-top:14px;">由「智能日历」每日自动生成，无需手动操作</p>
</div>`,withJson:c}}const ft=35*1024,Ra=3;function qn(t){try{return new Blob([t]).size}catch{return t.length}}function Gn(t,e,o){return JSON.stringify({service_id:e.emailjsServiceId,template_id:e.emailjsTemplateId,user_id:e.emailjsPublicKey,template_params:{...t,...o?{attachments:[{name:o.name,data:o.data,mimeType:o.mimeType}]}:{}}})}function Pa(t){return new Promise(e=>setTimeout(e,t))}function Ia(t){if(!t)return!1;const e=String(t.message??"");return e.includes("CONNECTION_CLOSED")||e.includes("CONNECTION_REFUSED")||e.includes("CONNECTION_RESET")||e.includes("ETIMEDOUT")||e.includes("ECONNRESET")||e.includes("ECONNREFUSED")||e.includes("ETIMEDOUT")||e.includes("NetworkError")||e.includes("network")||e.includes("abort")||e.includes("timeout")||t.name==="TypeError"||t.name==="AbortError"}const qe=15e3;function _a(t){return new Promise((e,o)=>{const a=new XMLHttpRequest;a.open("POST","https://api.emailjs.com/api/v1.0/email/send",!0),a.setRequestHeader("Content-Type","application/json"),a.timeout=qe,a.onload=()=>{a.status>=200&&a.status<300?e(new Response(a.responseText,{status:a.status})):e(new Response(a.responseText,{status:a.status,statusText:a.statusText}))},a.onerror=()=>o(new Error("XHR network error")),a.ontimeout=()=>o(new Error("XHR timeout")),a.onabort=()=>o(new Error("XHR abort")),a.send(t)})}async function oe(t,e=Ra){let o=null;for(let a=0;a<e;a++){try{let s;try{const c=new AbortController,d=setTimeout(()=>c.abort(),qe);s=await fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},body:t,signal:c.signal,keepalive:!0}),clearTimeout(d)}catch{s=await _a(t)}if(s.ok)return s;const r=await s.text().catch(()=>"");if(r.toLowerCase().includes("size limit")||s.status===413)throw new Error("EmailJS size limit: "+r.slice(0,80));o=new Error(`HTTP ${s.status}: ${r.slice(0,80)}`);break}catch(s){if(o=s,!Ia(s))break}a<e-1&&await Pa(800*(a+1))}throw o??new Error("邮件发送失败：网络异常，请检查网络后重试")}async function ct(t,e,o){const a=ln();if(!Dn(a))return{ok:!1,msg:"未配置邮箱，仅本地操作"};const s=a.emailTarget.split(/[,\n]/).map(p=>p.trim()).filter(Boolean);if(s.length===0)return{ok:!1,msg:"未配置接收邮箱"};const r={to_email:s.join(","),subject:t,title:t,message:e};let c=e,d=o==null?void 0:o.html,l=!1;(()=>{if(d){const x=Gn({...r,message:c,html:d},a);if(qn(x)<=ft)return;d=void 0,l=!0}const p=Gn({...r,message:c},a);if(qn(p)<=ft)return;const h=`

[内容过长，已自动截断。完整数据请使用「导出JSON」备份。]`,f=ft-qn(Gn({...r,message:""},a))-qn(h)-200;f>0?c=c.slice(0,Math.floor(f/3))+h:c="【智能日历】事件过多，无法通过邮件发送。请使用「导出JSON」功能备份。",l=!0})();const u=p=>Gn({...r,message:c,...d?{html:d}:{}},a,p);try{if(o!=null&&o.attachment&&(await oe(u(o.attachment))).ok)return{ok:!0,msg:"已发送到邮箱（含附件）",downgraded:l};const p=await oe(u());return p.ok?{ok:!0,msg:l?"已发送到邮箱（内容较长，已自动精简排版）":"已发送到邮箱",downgraded:l}:{ok:!1,msg:"邮件发送失败："+(await p.text()).slice(0,80)}}catch(p){const h=((p==null?void 0:p.message)??"").slice(0,120);return h.toLowerCase().includes("size limit")?{ok:!1,msg:"邮件发送失败：内容超过 EmailJS 限制，请减少事件数量或用「导出JSON」备份"}:{ok:!1,msg:"邮件发送失败：网络异常，请检查网络后重试。若多次失败，可改用「复制事件」生成云端链接，或先「导出JSON」备份。("+h+")"}}}async function Ye(t,e){const o=ln();if(!zn(o))return{ok:!1,msg:"未配置微信推送"};try{const a=`https://sctapi.ftqq.com/${o.wechatSendKey}.send?title=${encodeURIComponent(t)}&desp=${encodeURIComponent(e)}`,r=await(await fetch(a)).json().catch(()=>({}));return r&&r.code===0?{ok:!0,msg:"微信提醒已发送"}:{ok:!1,msg:"微信推送失败："+((r==null?void 0:r.message)??"未知错误")}}catch(a){return{ok:!1,msg:"微信推送失败："+((a==null?void 0:a.message)??"")}}}async function Ve(t,e){var a;const o=ln();if(!Wn(o))return{ok:!1,msg:"未配置钉钉推送"};try{let s=o.dingtalkWebhook;const r=(a=o.dingtalkSecret)==null?void 0:a.trim();if(r){const l=Date.now(),m=`${l}
${r}`,u=new TextEncoder().encode(m),p=await crypto.subtle.importKey("raw",new TextEncoder().encode(r),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),h=await crypto.subtle.sign("HMAC",p,u),f=btoa(String.fromCharCode(...new Uint8Array(h))),x=`&timestamp=${l}&sign=${encodeURIComponent(f)}`;s+=s.includes("?")?x:`?${x.replace(/^&/,"")}`}const d=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({msgtype:"text",text:{content:`${t}
${e}`}})})).json().catch(()=>({}));return d&&d.errcode===0?{ok:!0,msg:"钉钉提醒已发送"}:{ok:!1,msg:"钉钉推送失败："+((d==null?void 0:d.errmsg)??"未知错误")}}catch(s){return{ok:!1,msg:"钉钉推送失败："+((s==null?void 0:s.message)??"")}}}const Be="calendarReminderSent";function ze(){try{return new Set(JSON.parse(localStorage.getItem(Be)||"[]"))}catch{return new Set}}function Da(t){const e=ze();e.add(t),localStorage.setItem(Be,JSON.stringify([...e].slice(-500)))}async function Ma(t){const e=rt().enabled;if(!e&&!zn()&&!Wn())return;const o=U(),a=ze();for(const s of t){if(s.deleted||s.done||!s.reminder||s.reminder.length===0)continue;const r=an(s.date);if(!r.isValid())continue;let c=r.hour(9).minute(0);if(!s.allDay&&s.startTime){const[l,m]=s.startTime.split(":").map(Number);c=r.hour(l).minute(m)}const d=s.allDay?"全天":s.startTime;for(const l of s.reminder){const m=l.unit==="day"?c.subtract(l.value,"day"):l.unit==="hour"?c.subtract(l.value,"hour"):c.subtract(l.value,"minute");if(o.isBefore(m)||o.isAfter(c.add(2,"hour")))continue;const u=`${s.id}:${l.unit}:${l.value}`;if(a.has(u))continue;const p=`时间：${r.month()+1}月${r.date()}日 ${d}
${s.description?"备注："+s.description:""}`;if(e){const f=l.unit==="day"?"天":l.unit==="hour"?"小时":"分钟";try{const{fireReminderNow:x}=await Bn(async()=>{const{fireReminderNow:g}=await import("./localNotify-Dj2HAYFZ.js");return{fireReminderNow:g}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);await x(`⏰ ${s.title}`,`${r.month()+1}月${r.date()}日 ${d}（提前${l.value}${f}提醒）`+(s.description?`
${s.description.slice(0,60)}`:""))}catch{}}const h=[];zn()&&h.push(Ye(`事件提醒：${s.title}`,p)),Wn()&&h.push(Ve(`事件提醒：${s.title}`,p)),await Promise.all(h),Da(u)}}}const We="user_notify_settings";function Oa(t,e){return{user_id:e,email_target:t.emailTarget??"",emailjs_service_id:t.emailjsServiceId??"",emailjs_template_id:t.emailjsTemplateId??"",emailjs_public_key:t.emailjsPublicKey??"",wechat_send_key:t.wechatSendKey??"",dingtalk_webhook:t.dingtalkWebhook??"",dingtalk_secret:t.dingtalkSecret??""}}function Ua(t){return{emailTarget:t.email_target??"",emailjsServiceId:t.emailjs_service_id??"",emailjsTemplateId:t.emailjs_template_id??"",emailjsPublicKey:t.emailjs_public_key??"",wechatSendKey:t.wechat_send_key??"",dingtalkWebhook:t.dingtalk_webhook??"",dingtalkSecret:t.dingtalk_secret??""}}async function La(t,e){try{const{data:o,error:a}=await t.from(We).select("*").eq("user_id",e).maybeSingle();return a?(console.warn("[notify-sync] 读取云端通知设置失败:",a.message),null):o?Ua(o):null}catch(o){return console.warn("[notify-sync] 读取云端通知设置异常:",o==null?void 0:o.message),null}}async function qa(t,e,o){try{const a={...Oa(o,e),updated_at:new Date().toISOString()},{error:s}=await t.from(We).upsert(a,{onConflict:"user_id"});return s?(console.warn("[notify-sync] 推送云端通知设置失败:",s.message),!1):!0}catch(a){return console.warn("[notify-sync] 推送云端通知设置异常:",a==null?void 0:a.message),!1}}const ae="calendar_events",se="calendarLastSync",Ya=3e5,Va=1500,Ke=i.createContext(null);function Xn(t){const e=t.toLowerCase();return e.includes("invalid login credentials")?"邮箱或密码不正确":e.includes("user already registered")?"该邮箱已注册，请直接登录":e.includes("password should be at least")?"密码至少需要 6 位":e.includes("unable to validate email")||e.includes("invalid email")?"邮箱格式不正确":e.includes("email not confirmed")?"邮箱尚未验证，请先到邮箱点击验证链接":e.includes("signups not allowed")||e.includes("signup is disabled")||e.includes("not allowed to sign up")?"当前已关闭开放注册，如需账号请联系管理员开通":e.includes("does not exist")&&e.includes("relation")?"云端数据表未创建，请先在 Supabase 执行建表 SQL（见 SETUP.md）":e.includes("failed to fetch")||e.includes("networkerror")?"网络连接失败，请检查网络或 Project URL 是否正确":e.includes("row-level security")||e.includes("violates row-level")?"权限策略未生效，请确认已执行 SETUP.md 中的 RLS 策略语句":e.includes("over_email_send_rate_limit")||e.includes("rate limit")?"操作过于频繁，请稍后再试":t}function Ba({children:t}){const{snapshot:e,applyMerged:o,revision:a}=mn(),[s,r]=i.useState(()=>at()!==null),[c]=i.useState(()=>Ca()),[d,l]=i.useState(()=>{var _;return((_=at())==null?void 0:_.url)??""}),[m,u]=i.useState(()=>at()?"signedOut":"disabled"),[p,h]=i.useState(null),[f,x]=i.useState(null),[g,v]=i.useState(()=>localStorage.getItem(se)),[j,w]=i.useState(null),[S,P]=i.useState(0),E=i.useRef(null),A=i.useRef(!1),L=i.useRef(!1),q=i.useCallback(async _=>{const R=un(),B=E.current;if(!(!R||!B)){if(A.current){L.current=!0;return}if(typeof navigator<"u"&&navigator.onLine===!1){_||u("offline");return}A.current=!0,_||(u("syncing"),w(null));try{const{data:J,error:K}=await R.from(ae).select("*").eq("user_id",B);if(K)throw new Error(K.message);const tn=(J??[]).map(ja),k=e(),{merged:D,toPush:z}=Sa(k,tn);if(o(D),z.length){const M=z.map(H=>ka(H,B));for(let H=0;H<M.length;H+=200){const{error:G}=await R.from(ae).upsert(M.slice(H,H+200),{onConflict:"user_id,id"});if(G)throw new Error(G.message)}}const y=new Date().toISOString();localStorage.setItem(se,y),v(y),_||u("idle")}catch(J){const K=Xn(J instanceof Error?J.message:String(J));w(K),_||u("error")}finally{A.current=!1,L.current&&(L.current=!1,q(_))}}},[e,o]),N=i.useCallback(()=>q(!1),[q]),b=i.useCallback(()=>q(!0),[q]),T=i.useCallback(async()=>{const _=un(),R=E.current;if(!_||!R)return;const B=await La(_,R);B&&(Oe(B),P(J=>J+1))},[]),O=i.useCallback(async _=>{const R=un(),B=E.current;return!R||!B?!1:qa(R,B,_)},[]);i.useEffect(()=>{if(!s)return;const _=un();if(!_)return;let R=!0;_.auth.getSession().then(({data:J})=>{if(!R)return;const K=J.session;K!=null&&K.user?(E.current=K.user.id,x(K.user.id),h(K.user.email??null),u("idle"),b(),T()):u("signedOut")});const{data:B}=_.auth.onAuthStateChange((J,K)=>{R&&(K!=null&&K.user?(E.current=K.user.id,x(K.user.id),h(K.user.email??null),u("idle"),T()):(E.current=null,x(null),h(null),u("signedOut")))});return()=>{R=!1,B.subscription.unsubscribe()}},[s]),i.useEffect(()=>{if(a===0||!E.current)return;const _=setTimeout(()=>void b(),Va);return()=>clearTimeout(_)},[a,b]),i.useEffect(()=>{if(!s)return;const _=setInterval(()=>{E.current&&document.visibilityState==="visible"&&b()},Ya),R=()=>{E.current&&document.visibilityState==="visible"&&b()},B=()=>{E.current&&b()};return document.addEventListener("visibilitychange",R),window.addEventListener("focus",R),window.addEventListener("online",B),()=>{clearInterval(_),document.removeEventListener("visibilitychange",R),window.removeEventListener("focus",R),window.removeEventListener("online",B)}},[s,N]);const V=i.useCallback((_,R)=>{const B=ba(_,R);return B||(xa({url:_,anonKey:R}),Zt(),l(_.trim().replace(/\/+$/,"")),r(!0),u("signedOut"),w(null),null)},[]),F=i.useCallback(()=>{ya(),Zt(),E.current=null,h(null),l(""),r(!1),u("disabled")},[]),X=i.useCallback(async(_,R)=>{const B=un();if(!B)return"请先填写 Supabase 连接参数";const{data:J,error:K}=await B.auth.signInWithPassword({email:_.trim(),password:R});return K?Xn(K.message):(J.user&&(E.current=J.user.id,x(J.user.id),h(J.user.email??null),u("idle"),N(),T()),null)},[N]),I=i.useCallback(async(_,R)=>{const B=un();if(!B)return"请先填写 Supabase 连接参数";const{data:J,error:K}=await B.auth.signUp({email:_.trim(),password:R});return K?Xn(K.message):J.session?(J.user&&(E.current=J.user.id,x(J.user.id),h(J.user.email??null),u("idle"),N(),T()),null):"__NEED_CONFIRM__"},[N]),C=i.useCallback(async()=>{const _=un();_&&await _.auth.signOut(),E.current=null,h(null),u("signedOut")},[]),$=i.useCallback(async _=>{const R=un();if(!R)return"请先填写 Supabase 连接参数";const{error:B}=await R.auth.resetPasswordForEmail(_.trim(),{redirectTo:window.location.origin+window.location.pathname});return B?Xn(B.message):null},[]),W=i.useMemo(()=>({status:m,email:p,lastSyncAt:g,error:j,configured:s,configLocked:c,configUrl:d,saveConfig:V,removeConfig:F,signIn:X,signUp:I,signOut:C,sendReset:$,syncNow:N,silentSync:b,userId:f,notifySettingsVersion:S,syncNotifySettings:O}),[m,p,g,j,s,c,d,V,F,X,I,C,$,N,b,f,S,O]);return n.jsx(Ke.Provider,{value:W,children:t})}function Sn(){const t=i.useContext(Ke);if(!t)throw new Error("useSync 必须在 SyncProvider 内使用");return t}const He=i.createContext(null);function za({children:t}){const[e,o]=i.useState({open:!1,mode:"create",initial:null}),[a,s]=i.useState({open:!1,event:null}),[r,c]=i.useState(!1),[d,l]=i.useState(!1),{userId:m}=Sn(),u=i.useCallback(v=>{if(!m){Cn.warning("请先在「更多 → 云同步」登录后再新建事件");return}o({open:!0,mode:"create",initial:v??null})},[m]),p=i.useCallback(v=>{if(!m){Cn.warning("请先在「更多 → 云同步」登录后再编辑事件");return}o({open:!0,mode:"edit",initial:v})},[m]),h=i.useCallback(()=>{o(v=>({...v,open:!1}))},[]),f=i.useCallback(v=>{s({open:!0,event:v})},[]),x=i.useCallback(()=>{s(v=>({...v,open:!1}))},[]),g={eventModal:e,openCreate:u,openEdit:p,closeEventModal:h,eventView:a,openView:f,closeEventView:x,sidebarOpen:r,setSidebarOpen:c,detailOpen:d,setDetailOpen:l};return n.jsx(He.Provider,{value:g,children:t})}function Hn(){const t=i.useContext(He);if(!t)throw new Error("useUI 必须在 UIProvider 内使用");return t}const re="event-images",ce=3,Wa=800;function Ka(t){return typeof t=="string"&&t.startsWith("data:")}function Ha(t){return typeof t=="string"&&(t.startsWith("http://")||t.startsWith("https://"))}function Fa(t){return new Promise(e=>setTimeout(e,t))}function Ja(t){const e=String((t==null?void 0:t.message)??"");return e.includes("CONNECTION_CLOSED")||e.includes("CONNECTION_REFUSED")||e.includes("CONNECTION_RESET")||e.includes("ERR_HTTP2")||e.includes("HTTP2")||e.includes("ECONNRESET")||e.includes("ECONNREFUSED")||e.includes("ETIMEDOUT")||e.includes("NetworkError")||e.includes("network")||e.includes("timeout")||e.includes("abort")||(t==null?void 0:t.name)==="TypeError"||(t==null?void 0:t.name)==="AbortError"}function Ga(t){try{const[e,o]=t.split(","),a=(e.match(/data:(.*?);base64/)||[])[1]||"image/jpeg",s=atob(o),r=new Uint8Array(s.length);for(let c=0;c<s.length;c++)r[c]=s.charCodeAt(c);return new Blob([r],{type:a})}catch{return null}}async function Xa(t){if(!t||Ha(t)||!Ka(t))return t;const e=un();if(!e)return t;let o;try{const{data:l}=await e.auth.getUser();if(!l.user)return t;o=l.user.id}catch{return t}const a=Ga(t);if(!a)return t;const s=a.type==="image/png"?"png":"jpg",r=Math.random().toString(36).slice(2,8),c=`${o}/${Date.now()}-${r}.${s}`;let d=null;for(let l=0;l<ce;l++)try{const{data:m,error:u}=await e.storage.from(re).upload(c,a,{contentType:a.type,upsert:!1,cacheControl:"31536000"});if(u)throw u;if(!m)throw new Error("upload returned no data");const{data:p}=e.storage.from(re).getPublicUrl(m.path);return p.publicUrl||t}catch(m){if(d=m,!Ja(m))break;l<ce-1&&await Fa(Wa*(l+1))}return console.error("[imageHost] upload failed after retries, fallback to dataURL:",d),t}async function it(t){const e=[];for(const o of t||[])e.push(await Xa(o));return e}function Tt({columns:t,selected:e,onChange:o,itemHeight:a=36}){const s=i.useRef([]),r=i.useRef(o);r.current=o;const c=i.useRef({});i.useEffect(()=>{t.forEach((l,m)=>{if(c.current[m])return;const u=s.current[m];if(!u)return;const p=l.values.findIndex(h=>h.value===e[m]);if(p>=0){const h=p*a;Math.abs(u.scrollTop-h)>1&&(u.scrollTop=h)}})},[e,t,a]);const d=l=>{var h;const m=s.current[l];if(!m)return;window.clearTimeout(c.current[l]),c.current[l]=window.setTimeout(()=>{delete c.current[l]},260);const u=Math.max(0,Math.min(t[l].values.length-1,Math.round(m.scrollTop/a))),p=(h=t[l].values[u])==null?void 0:h.value;if(p!==void 0&&p!==e[l]){const f=[...e];f[l]=p,r.current(f)}};return n.jsx("div",{className:"wheel-picker",children:t.map((l,m)=>n.jsxs("div",{className:"wheel-col",children:[n.jsxs("div",{className:"wheel-scroll",ref:u=>{s.current[m]=u},style:{height:a*5},onScroll:()=>d(m),children:[n.jsx("div",{style:{height:a*2}}),l.values.map((u,p)=>n.jsx("div",{className:`wheel-item${e[m]===u.value?" active":""}`,style:{height:a,lineHeight:`${a}px`},onClick:()=>{const h=s.current[m];h&&h.scrollTo({top:p*a,behavior:"smooth"});const f=[...e];f[m]=u.value,r.current(f)},children:u.label},p)),n.jsx("div",{style:{height:a*2}})]}),n.jsx("div",{className:"wheel-hl",style:{height:a,top:a*2}})]},m))})}const{TextArea:Qa}=xn,Nn=10;function Za(t,e=1280,o=.72){return new Promise(a=>{const s=new FileReader;s.onerror=()=>a(""),s.onload=()=>{const r=new Image;r.onerror=()=>a(""),r.onload=()=>{let{width:c,height:d}=r;if(c>e||d>e){const p=Math.min(e/c,e/d);c=Math.round(c*p),d=Math.round(d*p)}const l=document.createElement("canvas");l.width=c,l.height=d;const m=l.getContext("2d");if(!m){a("");return}m.drawImage(r,0,0,c,d);const u=(t.type||"").toLowerCase()==="image/png";try{a(l.toDataURL(u?"image/png":"image/jpeg",o))}catch{a("")}},r.src=String(s.result)},s.readAsDataURL(t)})}const ns=Array.from({length:16},(t,e)=>2020+e),ts=Array.from({length:24},(t,e)=>({label:`${e}时`,value:e})),es=Array.from({length:12},(t,e)=>{const o=e*5;return{label:`${String(o).padStart(2,"0")}分`,value:o}});function Fe(t,e){return new Date(t,e,0).getDate()}function os(t,e){const o=Fe(t,e);return[{values:ns.map(a=>({label:`${a}年`,value:a}))},{values:Array.from({length:12},(a,s)=>({label:`${s+1}月`,value:s+1}))},{values:Array.from({length:o},(a,s)=>({label:`${s+1}日`,value:s+1}))}]}const as=()=>[{values:ts},{values:es}];function ss(){const{eventModal:t,closeEventModal:e}=Hn(),{addEvent:o,updateEvent:a,deleteEvent:s}=mn(),{message:r}=fn.useApp(),[c,d]=i.useState([]),l=i.useRef(null),{open:m,mode:u,initial:p}=t,h=p??{},[f,x]=i.useState(""),[g,v]=i.useState(""),[j,w]=i.useState("normal"),[S,P]=i.useState(!1),[E,A]=i.useState([2026,8,5]),[L,q]=i.useState([9,0]),[N,b]=i.useState([]),[T,O]=i.useState(!1),[V,F]=i.useState(!1),[X,I]=i.useState(E),[C,$]=i.useState(L),[W,_]=i.useState(S);i.useEffect(()=>{if(!m)return;x(h.title??""),v(h.description??""),w(h.important?"important":"normal"),d(Array.isArray(h.images)?h.images.slice(0,Nn):[]);const y=h.date?U(h.date,"YYYY-MM-DD"):U();if(A([y.year(),y.month()+1,y.date()]),u==="create")P(!1),q([9,0]);else{const M=h.allDay??!h.startTime;if(P(M),!M&&h.startTime){const[H,G]=h.startTime.split(":").map(Number);q([H,Math.min(55,Math.max(0,Math.round(G/5)*5))])}else q([9,0])}b(h.reminder&&h.reminder.length?h.reminder.map(M=>({...M})):[])},[m,p]);const R=y=>{const M=Array.from(y.target.files??[]);if(y.target.value="",!M.length)return;const H=Nn-c.length;M.length>H&&r.warning(`最多添加 ${Nn} 张图片，已为您保留前 ${H} 张`);const G=M.slice(0,Math.max(0,H));G.length!==0&&Promise.all(G.map(Z=>Za(Z))).then(Z=>d(en=>[...en,...Z.filter(Boolean)].slice(0,Nn)))},B=y=>d(M=>M.filter((H,G)=>G!==y)),J=y=>{let[M,H,G]=y;const Z=Fe(M,H);G>Z&&(G=Z),I([M,H,G])},K=()=>{const y=U();I([y.year(),y.month()+1,y.date()])},tn=y=>N.some(M=>M.unit===y.unit&&M.value===y.value),k=y=>{tn(y)?b(N.filter(M=>!(M.unit===y.unit&&M.value===y.value))):b([...N,{unit:y.unit,value:y.value}])},D=async()=>{if(!f.trim()){r.warning("请输入事件标题");return}const[y,M,H]=E,G=U(`${y}-${String(M).padStart(2,"0")}-${String(H).padStart(2,"0")}`);let Z=c;try{Z=await it(c)}catch{}const en={title:f.trim(),date:G.format("YYYY-MM-DD"),allDay:S,startTime:S?"":`${String(L[0]).padStart(2,"0")}:${String(L[1]).padStart(2,"0")}`,endTime:"",description:g.trim(),tag:h.tag??"purple",important:j==="important",images:Z,reminder:N};u==="edit"&&h.id?a(h.id,en):o(en),e()},z=()=>{u==="edit"&&h.id&&cn.confirm({title:"确认删除该事件？",content:`「${h.title??f}」删除后将从所有设备移除，确定删除吗？`,okText:"删除",okButtonProps:{danger:!0},cancelText:"取消",onOk:()=>{s(h.id),e()}})};return m?n.jsxs("div",{className:"ev-overlay",onClick:e,children:[n.jsxs("div",{className:"ev-modal",onClick:y=>y.stopPropagation(),children:[n.jsxs("div",{className:"ev-head",children:[n.jsx("span",{className:"ev-title",children:u==="edit"?"编辑事件":"新建事件"}),n.jsx("button",{className:"ev-close",onClick:e,"aria-label":"关闭",children:n.jsx(ut,{})})]}),n.jsxs("div",{className:"ev-body",children:[n.jsxs("div",{className:"ev-field",children:[n.jsx("label",{className:"ev-label",children:"事件标题"}),n.jsx(xn,{value:f,onChange:y=>x(y.target.value),placeholder:"例如：团队周会",maxLength:20})]}),n.jsxs("div",{className:"ev-field",children:[n.jsx("label",{className:"ev-label",children:"日期与时间"}),n.jsxs("div",{className:"ev-datetime-row",children:[n.jsxs("button",{type:"button",className:"ev-datetime-card",onClick:()=>{I(E),O(!0)},children:[n.jsx("span",{className:"ev-dt-label",children:"日期"}),n.jsx("span",{className:"ev-dt-value",children:`${E[0]}/${String(E[1]).padStart(2,"0")}/${String(E[2]).padStart(2,"0")}`})]}),n.jsxs("button",{type:"button",className:`ev-datetime-card${S?" muted":""}`,onClick:()=>{const y=Math.min(55,Math.max(0,Math.round(L[1]/5)*5));$([L[0],y]),_(S),F(!0)},children:[n.jsx("span",{className:"ev-dt-label",children:"时间"}),n.jsx("span",{className:"ev-dt-value",children:S?"不选":`${String(L[0]).padStart(2,"0")}:${String(L[1]).padStart(2,"0")}`})]})]})]}),n.jsxs("div",{className:"imp-block",children:[n.jsx("div",{className:"imp-label ev-section-title",children:"事件级别"}),n.jsxs("div",{className:"imp-btns",children:[n.jsx("button",{type:"button",className:`imp-btn${j==="normal"?" active":""}`,onClick:()=>w("normal"),children:"普通事件"}),n.jsx("button",{type:"button",className:`imp-btn danger${j==="important"?" active":""}`,onClick:()=>w("important"),style:j==="important"?{borderColor:wt,color:"#fff",background:wt}:void 0,children:"重要事件"})]})]}),n.jsxs("div",{className:"remind-block",children:[n.jsx("div",{className:"imp-label ev-section-title",children:"消息通知"}),n.jsx("div",{className:"remind-presets",children:ia.map(y=>n.jsx("button",{type:"button",className:`tag-chip-select${tn(y)?" active":""}`,onClick:()=>k(y),children:y.label},`${y.unit}-${y.value}`))})]}),n.jsxs("div",{className:"ev-field",children:[n.jsx("label",{className:"ev-label ev-section-title",children:"描述"}),n.jsx(Qa,{value:g,onChange:y=>v(y.target.value),autoSize:{minRows:1,maxRows:10},placeholder:"补充说明（可选，最多 200 字）",maxLength:200})]}),n.jsxs("div",{className:"img-upload-block",children:[n.jsxs("div",{className:"img-upload-head",children:[n.jsxs("span",{className:"ev-section-title",children:["图片（最多 ",Nn," 张）"]}),n.jsxs("span",{className:"img-count",children:[c.length,"/",Nn]})]}),n.jsxs("div",{className:"img-thumbs",children:[c.map((y,M)=>n.jsxs("div",{className:"img-thumb",children:[n.jsx("img",{src:y,alt:""}),n.jsx("button",{type:"button",className:"img-del",onClick:()=>B(M),"aria-label":"删除图片",children:"×"})]},M)),c.length<Nn&&n.jsx("button",{type:"button",className:"img-add",onClick:()=>{var y;return(y=l.current)==null?void 0:y.click()},"aria-label":"添加图片",children:n.jsx(It,{})})]}),n.jsx("input",{ref:l,type:"file",accept:"image/*",multiple:!0,hidden:!0,onChange:R})]})]}),n.jsxs("div",{className:"ev-foot",children:[u==="edit"&&n.jsxs("button",{className:"ev-del",onClick:z,children:[n.jsx(_t,{})," 删除"]}),n.jsx("button",{className:"ev-cancel",onClick:e,children:"取消"}),n.jsx("button",{className:"ev-save",onClick:D,children:"保存"})]})]}),T&&n.jsx("div",{className:"ev-picker-overlay",onClick:y=>{y.stopPropagation(),O(!1)},children:n.jsxs("div",{className:"ev-picker-modal",onClick:y=>y.stopPropagation(),children:[n.jsx("div",{className:"ev-picker-body",children:n.jsx(Tt,{columns:os(X[0],X[1]),selected:X,onChange:J})}),n.jsxs("div",{className:"ev-picker-foot three",children:[n.jsx("button",{type:"button",onClick:y=>{y.stopPropagation(),O(!1)},children:"取消"}),n.jsx("button",{type:"button",onClick:y=>{y.stopPropagation(),K()},children:"清除"}),n.jsx("button",{type:"button",className:"primary",onClick:y=>{y.stopPropagation(),A(X),O(!1)},children:"设置"})]})]})}),V&&n.jsx("div",{className:"ev-picker-overlay ev-time-overlay",onClick:y=>{y.stopPropagation(),F(!1)},children:n.jsxs("div",{className:"ev-time-sheet",onClick:y=>y.stopPropagation(),children:[n.jsxs("div",{className:"ev-time-head",children:[n.jsx("button",{type:"button",onClick:y=>{y.stopPropagation(),F(!1)},children:"取消"}),n.jsx("span",{className:"ev-time-title",children:"选择时间"}),n.jsx("button",{type:"button",className:"primary",onClick:y=>{y.stopPropagation(),q(C),P(W),F(!1)},children:"确定"})]}),n.jsxs("div",{className:"ev-time-tabs",children:[n.jsx("button",{type:"button",className:W?"active":"",onClick:y=>{y.stopPropagation(),_(!0)},children:"不选择时间"}),n.jsx("button",{type:"button",className:W?"":"active",onClick:y=>{y.stopPropagation(),_(!1)},children:"选择时间"})]}),n.jsx("div",{className:`ev-time-wheels${W?" disabled":""}`,children:n.jsx(Tt,{columns:as(),selected:C,onChange:y=>{_(!1),$(y)}})})]})})]}):null}function rs({images:t,gridClassName:e="evv-imgs",thumbClassName:o="evv-img"}){const[a,s]=i.useState(!1),[r,c]=i.useState(0),[d,l]=i.useState(null),m=i.useRef(null),u=i.useRef(null),p=t.length,h=i.useCallback(v=>{c(j=>(j+v+p)%p)},[p]);i.useEffect(()=>{if(!a)return;const v=j=>{j.key==="ArrowLeft"?h(-1):j.key==="ArrowRight"?h(1):j.key==="Escape"&&s(!1)};return window.addEventListener("keydown",v),()=>window.removeEventListener("keydown",v)},[a,h]),i.useEffect(()=>{if(!a)return;const v=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=v}},[a]);const f=v=>{m.current=v.touches[0].clientX,u.current=v.touches[0].clientY,l(0)},x=v=>{if(m.current==null||u.current==null)return;const j=v.touches[0].clientX-m.current,w=v.touches[0].clientY-u.current;Math.abs(j)>Math.abs(w)&&l(j)},g=v=>{const j=m.current,w=u.current;if(m.current=null,u.current=null,l(null),j==null||w==null)return;const S=v.changedTouches[0].clientX-j,P=v.changedTouches[0].clientY-w;Math.abs(S)>50&&Math.abs(S)>Math.abs(P)&&h(S<0?1:-1)};return p===0?null:n.jsxs(n.Fragment,{children:[n.jsx("div",{className:e,children:t.map((v,j)=>n.jsx("img",{src:v,className:o,alt:`图片 ${j+1}`,loading:"lazy",onClick:()=>{c(j),s(!0)}},j))}),a&&n.jsxs("div",{className:"img-lightbox",onClick:()=>s(!1),children:[n.jsx("button",{className:"img-lb-close","aria-label":"关闭",onClick:v=>{v.stopPropagation(),s(!1)},children:n.jsx(ut,{})}),p>1&&n.jsx("button",{className:"img-lb-nav img-lb-prev","aria-label":"上一张",onClick:v=>{v.stopPropagation(),h(-1)},children:"‹"}),n.jsx("img",{className:"img-lb-img",src:t[r],alt:`图片 ${r+1}`,draggable:!1,onClick:v=>v.stopPropagation(),style:{transform:d?`translateX(${d}px)`:void 0,transition:d?"none":"transform 0.25s ease",touchAction:"pan-y"},onTouchStart:f,onTouchMove:x,onTouchEnd:g},r),p>1&&n.jsx("button",{className:"img-lb-nav img-lb-next","aria-label":"下一张",onClick:v=>{v.stopPropagation(),h(1)},children:"›"}),p>1&&n.jsxs("div",{className:"img-lb-count",onClick:v=>v.stopPropagation(),children:[r+1," / ",p]})]})]})}function cs(){const{eventView:t,openEdit:e,openCreate:o,closeEventView:a}=Hn(),{deleteEvent:s,toggleDone:r,filteredEvents:c}=mn(),d=t.event;if(!t.open||!d)return null;const l=c.find(v=>v.id===d.id),m=l?l.done:d.done,u=an(d.date),p=u.isValid()?`${u.month()+1}月${u.date()}日 ${bn(u)}`:d.date,h=Kn(d),f=!!(d.description&&d.description.trim()),x=!!(d.images&&d.images.length>0),g=()=>{cn.confirm({title:"确认删除该事件？",content:`「${d.title}」删除后本地保留 90 天可恢复，确定删除吗？`,okText:"删除",okButtonProps:{danger:!0},cancelText:"取消",centered:!0,onOk:()=>{s(d.id),a()}})};return n.jsx("div",{className:"ev-overlay",onClick:a,children:n.jsxs("div",{className:"ev-modal ev-view",onClick:v=>v.stopPropagation(),children:[n.jsxs("div",{className:"ev-head",children:[n.jsx("span",{className:"ev-title",children:"事件详情"}),n.jsx("button",{className:"ev-close",onClick:a,"aria-label":"关闭",children:n.jsx(ut,{})})]}),n.jsxs("div",{className:"ev-body",children:[n.jsxs("div",{className:"evv-card evv-main",children:[n.jsxs("div",{className:"evv-title-row",children:[n.jsx("span",{className:`evv-title${m?" done":""}`,children:d.title}),d.important&&n.jsx("span",{className:"imp-flag",style:{background:"#ffe9e8",color:wt},children:"重"}),m&&n.jsx("span",{className:"evv-done-tag",children:"已完成"})]}),n.jsxs("div",{className:"evv-meta2",children:[n.jsxs("div",{className:"evv-meta-item",children:[n.jsx("span",{className:"evv-ico",children:"📅"}),n.jsx("span",{children:p})]}),n.jsxs("div",{className:"evv-meta-item",children:[n.jsx("span",{className:"evv-ico",children:"🕒"}),n.jsx("span",{children:h})]})]})]}),f&&n.jsxs("div",{className:"evv-card",children:[n.jsx("div",{className:"evv-card-label",children:"备注"}),n.jsx("div",{className:"evv-desc",children:d.description})]}),x&&n.jsxs("div",{className:"evv-card",children:[n.jsxs("div",{className:"evv-card-label",children:["图片（",d.images.length,"）"]}),n.jsx(rs,{images:d.images})]}),n.jsxs("div",{className:"evv-status-row",children:[n.jsx("span",{className:"evv-status-label",children:"完成状态"}),n.jsxs("div",{className:"evv-toggle",children:[n.jsx("button",{type:"button",className:`opt${m?"":" active"}`,onClick:()=>{m&&r(d.id)},children:"未完成"}),n.jsx("button",{type:"button",className:`opt done${m?" active":""}`,onClick:()=>{m||r(d.id)},children:"已完成"})]})]})]}),n.jsxs("div",{className:"ev-foot ev-foot-stack",children:[n.jsxs("div",{className:"ev-foot-row",children:[n.jsx("button",{className:"ev-btn-new",onClick:()=>{o({date:d.date}),a()},children:"新建"}),n.jsx("button",{className:"ev-btn-edit",onClick:()=>{e(d),a()},children:"编辑"})]}),n.jsxs("div",{className:"ev-foot-row",children:[n.jsx("button",{className:"ev-btn-danger",onClick:g,children:"删除"}),n.jsx("button",{className:"ev-btn-gray",onClick:a,children:"取消"})]})]})]})})}const lt="calendarFabPos",ie="calendarFabPosVer",le=3,ue=56;try{localStorage.getItem(ie)!==String(le)&&(localStorage.removeItem(lt),localStorage.setItem(ie,String(le)))}catch{}function is(){try{const t=localStorage.getItem(lt);if(!t)return null;const e=JSON.parse(t);if(typeof(e==null?void 0:e.x)=="number"&&typeof(e==null?void 0:e.y)=="number")return e}catch{}return null}function de(t){const e=Math.max(8,window.innerWidth-ue-8),o=Math.max(8,window.innerHeight-ue-8);return{x:Math.min(Math.max(8,t.x),e),y:Math.min(Math.max(8,t.y),o)}}function Je({onClick:t,color:e="primary"}){const[o,a]=i.useState(()=>is()),[s,r]=i.useState(!1),c=i.useRef({moved:!1,dx:0,dy:0,id:-1});i.useEffect(()=>{const h=()=>a(f=>f&&de(f));return window.addEventListener("resize",h),()=>window.removeEventListener("resize",h)},[]);const d=h=>{const f=h.currentTarget.getBoundingClientRect();c.current={moved:!1,dx:h.clientX-f.left,dy:h.clientY-f.top,id:h.pointerId},h.currentTarget.setPointerCapture(h.pointerId)},l=h=>{if(c.current.id!==h.pointerId||!h.currentTarget.hasPointerCapture(h.pointerId))return;const f=de({x:h.clientX-c.current.dx,y:h.clientY-c.current.dy}),x=h.currentTarget.getBoundingClientRect();!c.current.moved&&Math.abs(f.x-x.left)<5&&Math.abs(f.y-x.top)<5||(c.current.moved=!0,r(!0),a(f))},m=h=>{if(c.current.id===h.pointerId){try{h.currentTarget.releasePointerCapture(h.pointerId)}catch{}if(c.current.id=-1,c.current.moved){r(!1),a(f=>(f&&localStorage.setItem(lt,JSON.stringify(f)),f));return}r(!1),t()}},u=()=>{localStorage.removeItem(lt),a(null)},p=o?{left:o.x,top:o.y,right:"auto",bottom:"auto"}:void 0;return n.jsx("button",{className:`fab${e==="green"?" green":""}${s?" dragging":""}`,style:p,onPointerDown:d,onPointerMove:l,onPointerUp:m,onDoubleClick:u,"aria-label":"新建日程（可拖动）",title:"点击新建 · 按住可拖动 · 双击复位",children:n.jsx(It,{})})}function he({e:t}){const e=!!(t.description&&t.description.trim()),o=!!(t.images&&t.images.length>0);return!e&&!o?null:n.jsxs("span",{className:"ev-flags-mini",children:[e&&n.jsx("span",{className:"ev-chip ev-chip-note",title:"有备注",children:"注"}),o&&n.jsx("span",{className:"ev-chip ev-chip-img",title:"有图片",children:"图"})]})}const me=["周一","周二","周三","周四","周五","周六","周日"],ls=["一","二","三","四","五","六","日"];function us(t){const e=new Map;for(const o of t){const a=e.get(o.date);a?a.push(o):e.set(o.date,[o])}for(const o of e.values())o.sort((a,s)=>a.allDay!==s.allDay?a.allDay?-1:1:yn(a.startTime)-yn(s.startTime));return e}function ds(t,e){const o=U().startOf("day"),a=t.startOf("day");if(a.isBefore(o,"day"))return"已过期";if(a.isAfter(o,"day"))return`剩${a.diff(o,"day")}天`;if(!e.allDay&&e.startTime){const s=U(),[r,c]=e.startTime.split(":").map(Number),d=U().hour(r).minute(c).startOf("minute");if(d.isAfter(s))return`剩${Math.max(1,Math.ceil(d.diff(s,"hour",!0)))}小时`}return""}function hs(t,e){return t.isSame(e,"day")?"今天":t.isSame(e.add(1,"day"),"day")?"明天":t.isSame(e.add(2,"day"),"day")?"后天":""}function ms({showFab:t=!0}){const{filteredEvents:e,currentDate:o,setCurrentDate:a}=mn(),{openCreate:s,openView:r}=Hn(),{userId:c,silentSync:d}=Sn(),[l,m]=i.useState(""),[u,p]=i.useState(null),[h,f]=i.useState(null),[x,g]=i.useState(!1),[v,j]=i.useState(!1),w=i.useRef(null);i.useEffect(()=>{c&&d()},[c,d]);const S=U(),P=i.useMemo(()=>{if(v){const D=o.startOf("month").subtract((o.date(1).day()+6)%7,"day");return Array.from({length:42},(z,y)=>D.add(y,"day"))}const k=o.startOf("isoWeek");return Array.from({length:14},(D,z)=>k.add(z,"day"))},[v,o]),E=i.useMemo(()=>us(e),[e]),A=k=>{if(k.done)return!0;const D=U(k.date);return D.isValid()&&D.isBefore(S,"day")},L=k=>{m(k>0?"slide-left":"slide-right"),a(o.add(k,"month")),window.setTimeout(()=>m(""),260)},q=()=>{m(""),a(U())},N=k=>{const D=k.touches[0];w.current={x:D.clientX,y:D.clientY}},b=k=>{const D=w.current;if(!D)return;w.current=null;const z=k.changedTouches[0],y=z.clientX-D.x,M=z.clientY-D.y;Math.abs(y)>55&&Math.abs(y)>Math.abs(M)*1.6&&L(y<0?1:-1)},{dayActive:T,weekActive:O,monthActiveEvents:V,monthRangeLabel:F,weekRangeLabel:X}=i.useMemo(()=>{const k=S.isoWeekday(1),D=k,z=k.add(6,"day"),y=D.add(7,"day"),M=z.add(7,"day"),H=D.add(14,"day"),G=z.add(14,"day"),Z=D.add(21,"day"),en=z.add(21,"day"),Y=(Q,rn,lo)=>!Q.isBefore(rn,"day")&&!Q.isAfter(lo,"day"),sn=pt(o),vn=[],Mn=[],dt=[];for(const Q of e){const rn=U(Q.date);if(rn.isValid()){if(Q.date===sn){vn.push(Q);continue}if(Y(rn,D,z)||Y(rn,y,M)){Mn.push(Q);continue}if(Y(rn,H,G)||Y(rn,Z,en)){dt.push(Q);continue}}}const ht=(Q,rn)=>Q.date!==rn.date?Q.date<rn.date?-1:1:Q.allDay!==rn.allDay?Q.allDay?-1:1:yn(Q.startTime)-yn(rn.startTime);vn.sort(ht),Mn.sort(ht),dt.sort(ht);const ao=vn.filter(Q=>!A(Q)),so=Mn.filter(Q=>!A(Q)),ro=dt.filter(Q=>!A(Q)),co=`${H.month()+1}月${H.date()}日 - ${en.month()+1}月${en.date()}日`,io=`${D.month()+1}月${D.date()}日 - ${M.month()+1}月${M.date()}日`;return{dayActive:ao,weekActive:so,monthActiveEvents:ro,monthRangeLabel:co,weekRangeLabel:io}},[e,o]),I=i.useMemo(()=>{if(!u)return[];const k=u.format("YYYY-MM");return e.filter(D=>D.date.startsWith(k)&&!D.deleted).sort((D,z)=>D.date!==z.date?D.date<z.date?-1:1:D.allDay!==z.allDay?D.allDay?-1:1:yn(D.startTime)-yn(z.startTime))},[e,u]),C=i.useMemo(()=>I.filter(k=>!A(k)),[I]),$=i.useMemo(()=>(h?e.filter(D=>D.date.startsWith(h.format("YYYY-MM"))):e).filter(D=>A(D)).reverse(),[h,e]),{doneThisWeek:W,doneRest:_}=i.useMemo(()=>{const k=S.isoWeekday(1),D=k.add(6,"day"),z=y=>{const M=U(y.date);return M.isValid()&&!M.isBefore(k,"day")&&!M.isAfter(D,"day")};return{doneThisWeek:$.filter(z),doneRest:$.filter(y=>!z(y))}},[$]),R=pt(o),B=o.isSame(S,"day"),J=me[(o.day()+6)%7],K=`${o.month()+1}月${o.date()}日 ${J}`,tn=(k,D,z=!1)=>{const y=U(k.date),M=!!k.done,H=!k.done&&y.isValid()&&y.isBefore(S,"day"),G=k.allDay||!k.startTime?"全天":k.startTime,Z=D&&y.isValid()?`${y.month()+1}月${y.date()}日 ${me[(y.day()+6)%7]}`:"",en=`event-pill${z?" event-pill-day":""}${k.important?" important":""}${k.done?" done-pill":" not-done"}`,Y=`remind-title${M?" struck":""}`,sn=D&&!z&&!k.done?hs(y,S):"";return z?n.jsx("div",{className:en,onClick:()=>r(k),children:n.jsxs("div",{className:"remind-oneline",children:[y.isSame(S,"day")&&!k.done?n.jsxs("span",{className:"remind-rel-time",children:[n.jsx("span",{className:"remind-rel",children:"今天"}),n.jsx("span",{className:`day-time${k.allDay||!k.startTime?" all-day":""}`,children:G})]}):n.jsx("span",{className:`day-time${k.allDay||!k.startTime?" all-day":""}${M?" struck":""}`,children:G}),n.jsx("span",{className:Y,children:k.title}),k.important&&n.jsx("span",{className:"imp-flag",children:"重"}),n.jsx(he,{e:k})]})},k.id):n.jsx("div",{className:en,onClick:()=>r(k),children:n.jsxs("div",{className:"remind-main",children:[n.jsxs("div",{className:"remind-title-line",children:[n.jsx("span",{className:Y,children:k.title}),k.important&&n.jsx("span",{className:"imp-flag",children:"重"}),n.jsx(he,{e:k})]}),n.jsxs("div",{className:"remind-time-line",children:[D&&Z&&n.jsx("span",{className:`remind-date${M?" struck":""}${H?" expired":""}`,children:Z}),sn?n.jsxs("span",{className:"remind-rel-time",children:[n.jsx("span",{className:"remind-rel",children:sn}),n.jsx("span",{className:`remind-time${k.allDay||!k.startTime?" all-day":""}${M?" struck":""}${H?" expired":""}`,children:G})]}):n.jsx("span",{className:`remind-time${k.allDay||!k.startTime?" all-day":""}${M?" struck":""}${H?" expired":""}`,children:G}),n.jsx("span",{className:`remind-hint${M||H?" expired":""}`,children:ds(y,k)})]})]})},k.id)};return n.jsxs("div",{className:"page",children:[n.jsxs("div",{className:"cal-card",children:[n.jsxs("div",{className:"month-bar",children:[n.jsxs("div",{className:"month-title",children:[o.year(),"年",o.month()+1,"月"]}),n.jsxs("div",{className:"month-nav",children:[n.jsx("button",{className:"nav-btn",onClick:()=>L(-1),"aria-label":"上个月",children:n.jsx(et,{})}),n.jsx("button",{className:"nav-btn",onClick:()=>L(1),"aria-label":"下个月",children:n.jsx(Yn,{})}),n.jsx("button",{className:"today-btn",onClick:q,children:"今天"})]})]}),n.jsx("div",{className:"week-head",children:ls.map((k,D)=>n.jsx("span",{className:D>=5?"we":"",children:k},k))}),n.jsx("div",{className:`month-grid ${l}`,onTouchStart:N,onTouchEnd:b,children:P.map(k=>{const D=pt(k),z=E.get(D)??[],y=k.month()!==o.month(),M=k.day()===0||k.day()===6,H=k.isSame(S,"day"),G=["mcell",y?"out":"",M?"weekend":"",H?"today":"",D===R?"selected":"",z.length>0&&!y&&!H&&D!==R?"has-event":""].filter(Boolean).join(" ");return n.jsx("div",{className:G,onClick:()=>a(k),children:n.jsx("span",{className:"dnum",children:k.date()})},D)})}),n.jsx("div",{className:"month-toggle",children:v?n.jsxs("button",{className:"month-toggle-btn",onClick:()=>j(!1),children:[n.jsx(Yt,{})," 收起"]}):n.jsxs("button",{className:"month-toggle-btn",onClick:()=>j(!0),children:[n.jsx(bt,{})," 展开整月"]})})]}),n.jsxs("section",{className:"remind-card",children:[n.jsxs("div",{className:"remind-header today",children:[n.jsx(gn,{className:"remind-ico"}),n.jsx("span",{className:"remind-label",children:"日提醒"}),n.jsx("span",{className:"remind-range",children:K}),n.jsx("span",{className:`today-tag${B?" active":""}`,onClick:q,"aria-label":"今日提醒数",children:T.length})]}),T.length===0?n.jsxs("div",{className:"empty-remind",onClick:()=>s({date:R}),children:[n.jsx(gn,{className:"empty-check"}),"暂无安排",n.jsx(It,{className:"empty-plus"})]}):n.jsx("div",{className:"remind-list",children:T.map(k=>tn(k,!1,!0))})]}),O.length>0&&n.jsxs("section",{className:"remind-card",children:[n.jsxs("div",{className:"remind-header week",children:[n.jsx(gn,{className:"remind-ico"}),n.jsx("span",{className:"remind-label",children:"周提醒"}),n.jsx("span",{className:"remind-range",children:X}),n.jsx("span",{className:"remind-count",children:O.length})]}),n.jsx("div",{className:"remind-list",children:O.map(k=>tn(k,!0))})]}),n.jsxs("section",{className:"remind-card",children:[n.jsxs("div",{className:"remind-header month",children:[n.jsx(gn,{className:"remind-ico"}),n.jsx("span",{className:"remind-label",children:"月提醒"}),u?n.jsxs(n.Fragment,{children:[n.jsx("button",{className:"nav-btn month-nav-inline",onClick:()=>p(u.subtract(1,"month")),"aria-label":"上个月",children:n.jsx(et,{})}),n.jsxs("span",{className:"remind-range month-nav-inline-label",children:[u.year(),"年",u.month()+1,"月（",I.length,"）"]}),n.jsx("button",{className:"nav-btn month-nav-inline",onClick:()=>p(u.add(1,"month")),"aria-label":"下个月",children:n.jsx(Yn,{})}),n.jsx("button",{className:"remind-back",onClick:()=>p(null),"aria-label":"返回近4周",children:"返回近4周"})]}):n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"remind-range",children:F}),n.jsxs("button",{className:"remind-back",onClick:()=>p(o.startOf("month")),"aria-label":"按月查看",children:[n.jsx(Vt,{})," 按月查看"]})]})]}),u?n.jsx(n.Fragment,{children:C.length===0?n.jsx("div",{className:"empty-remind",children:"本月暂无安排"}):n.jsx("div",{className:"remind-list",children:C.map(k=>tn(k,!0))})}):n.jsx(n.Fragment,{children:V.length===0?n.jsx("div",{className:"empty-remind",children:"近 4 周暂无更多安排"}):n.jsx("div",{className:"remind-list",children:V.map(k=>tn(k,!0))})})]}),n.jsxs("section",{className:"remind-card done-card",children:[n.jsxs("div",{className:"remind-header done",children:[n.jsx(gn,{className:"remind-ico"}),n.jsx("span",{className:"remind-label",children:"已完成"}),h?n.jsxs(n.Fragment,{children:[n.jsx("button",{className:"nav-btn month-nav-inline",onClick:()=>f(h.subtract(1,"month")),"aria-label":"上个月",children:n.jsx(et,{})}),n.jsxs("span",{className:"remind-range month-nav-inline-label",children:[h.year(),"年",h.month()+1,"月（",$.length,"）"]}),n.jsx("button",{className:"nav-btn month-nav-inline",onClick:()=>f(h.add(1,"month")),"aria-label":"下个月",children:n.jsx(Yn,{})}),n.jsx("button",{className:"remind-back",onClick:()=>f(null),"aria-label":"返回全部",children:"返回全部"})]}):n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"remind-range",children:x?"全部":"本周"}),n.jsx("span",{className:"remind-count",children:x?$.length:W.length}),n.jsxs("button",{className:"remind-back",onClick:()=>f(o.startOf("month")),"aria-label":"按月查看",children:[n.jsx(Vt,{})," 按月查看"]})]})]}),n.jsx("div",{className:"remind-list done-list",children:h?$.length===0?n.jsx("div",{className:"empty-remind",children:"暂无已完成或已过期的事件"}):$.map(k=>tn(k,!0)):n.jsxs(n.Fragment,{children:[W.length===0&&!x?n.jsx("div",{className:"empty-remind",children:"暂无已完成事件"}):W.map(k=>tn(k,!0)),x&&_.map(k=>tn(k,!0))]})}),!h&&_.length>0&&n.jsx("div",{className:"month-toggle",children:n.jsxs("button",{className:"month-toggle-btn",onClick:()=>g(k=>!k),children:[x?n.jsx(Yt,{}):n.jsx(bt,{}),x?"收起":`展开全部（${_.length}）`]})})]}),t&&n.jsx(Je,{onClick:()=>s({date:R})})]})}function ve(t){const e=U(t);return e.isValid()?`${e.month()+1}月${e.date()}日`:t||"未设置"}function vs(){var V,F,X,I;const{allEvents:t,addEvent:e,updateEvent:o,deleteEvent:a,toggleDone:s,focusQuestionId:r,setFocusQuestionId:c}=mn(),d=i.useMemo(()=>t.filter(C=>C.kind==="question"&&!C.deleted),[t]),l=i.useMemo(()=>{const C=new Set;for(const $ of d)$.date&&C.add($.date);return[...C].sort(($,W)=>W.localeCompare($))},[d]),m=U().format("YYYY-MM-DD"),[u,p]=i.useState(null),[h,f]=i.useState(null),[x,g]=i.useState(!1),[v,j]=i.useState(null),w=i.useRef(null),S=i.useRef({}),P=i.useMemo(()=>[...d].sort((C,$)=>($.date||"").localeCompare(C.date||"")),[d]),E=i.useMemo(()=>{if(!u)return null;const C=P.findIndex($=>$.date===u);return C>=0?P[C].id:null},[P,u]),A=d.find(C=>C.id===h)||null;i.useEffect(()=>{r&&(f(r),g(!1),c(null))},[r,c]),i.useEffect(()=>{g(!1)},[h]),i.useEffect(()=>{l.length&&!u&&p(l.includes(m)?m:l[0])},[l]);const L=C=>{p(C);const $=S.current[C];$&&$.scrollIntoView({behavior:"smooth",block:"start"})},q=()=>j({mode:"create",q:{date:U().format("YYYY-MM-DD"),title:"",description:"",done:!1}}),N=C=>j({mode:"edit",q:{...C}}),b=()=>{var W;if(!v)return;const C=v.q;if(!((W=C.title)!=null&&W.trim())){Cn.warning("请填写题目");return}const $={title:C.title.trim(),date:C.date||U().format("YYYY-MM-DD"),startTime:"",endTime:"",allDay:!0,description:C.description||"",tag:"blue",kind:"question",done:!!C.done};v.mode==="create"?e($):C.id&&o(C.id,$),j(null)},T=C=>{cn.confirm({title:"删除该思考题？",content:C.title,okText:"删除",cancelText:"取消",okButtonProps:{danger:!0},onOk:()=>{a(C.id),h===C.id&&f(null)}})},O=C=>s(C.id);return n.jsxs("div",{className:"page questions-page",children:[n.jsx("div",{className:"q-dates",children:l.length===0?n.jsx("div",{className:"q-dates-empty",children:"暂无"}):l.map(C=>{const $=U(C),W=C===u,_=C===m;return n.jsxs("button",{className:`q-date-chip${W?" active":""}${_?" today":""}`,onClick:()=>L(C),children:[n.jsx("span",{className:"q-day",children:$.isValid()?$.date():"?"}),n.jsx("span",{className:"q-wk",children:$.isValid()?bn($):""})]},C)})}),n.jsx("div",{className:"q-main",children:n.jsx("div",{className:"q-list",ref:w,children:P.length===0?n.jsxs("div",{className:"q-list-empty",children:[n.jsx(Co,{className:"q-empty-ico"}),n.jsx("p",{children:"暂无思考题，点击右下角「+」新建"})]}):P.map(C=>{const $=C.id===E;return n.jsxs("div",{ref:W=>{S.current[C.date]=W},className:`q-card${C.done?" done":""}${$?" hi":""}`,onClick:()=>f(C.id),children:[n.jsxs("div",{className:"q-card-top",children:[n.jsx("span",{className:"q-card-date",children:ve(C.date)}),C.done&&n.jsx("span",{className:"q-card-done-tag",children:"已完成"})]}),n.jsx("div",{className:"q-card-title",children:C.title})]},C.id)})})}),n.jsx(Je,{color:"green",onClick:q}),n.jsx(cn,{open:!!A,title:null,onCancel:()=>f(null),footer:null,destroyOnClose:!0,centered:!0,className:"q-detail-modal",children:A&&n.jsxs("div",{className:"q-detail",children:[n.jsx("div",{className:"q-detail-title",children:A.title}),n.jsxs("div",{className:"q-detail-meta",children:[n.jsx(gn,{})," ",ve(A.date)]}),A.description&&n.jsxs("div",{className:"q-detail-note",children:[n.jsxs("button",{type:"button",className:"q-note-toggle",onClick:()=>g(C=>!C),children:[n.jsx("span",{className:"q-note-label",children:"备注"}),n.jsxs("span",{className:"q-note-caret",children:[x?"收起":"展开",n.jsx(bt,{className:`q-caret-ico${x?" up":""}`})]})]}),x&&n.jsx("div",{className:"q-detail-note-body",children:A.description})]}),n.jsxs("div",{className:"q-actions",children:[n.jsxs("div",{className:"q-row",children:[n.jsx("div",{className:"q-status-block",children:n.jsxs("div",{className:"evv-toggle",children:[n.jsx("button",{type:"button",className:`opt${A.done?"":" active"}`,onClick:()=>{A.done&&O(A)},children:"未完成"}),n.jsx("button",{type:"button",className:`opt done${A.done?" active":""}`,onClick:()=>{A.done||O(A)},children:"已完成"})]})}),n.jsxs("button",{className:"q-btn edit",onClick:()=>N(A),children:[n.jsx(xo,{})," 编辑"]})]}),n.jsxs("div",{className:"q-row",children:[n.jsxs("button",{className:"q-btn danger",onClick:()=>T(A),children:[n.jsx(_t,{})," 删除"]}),n.jsx("button",{className:"q-btn cancel",onClick:()=>f(null),children:"取消"})]})]})]})}),n.jsx(cn,{open:!!v,title:(v==null?void 0:v.mode)==="edit"?"修改思考题":"新建思考题",onCancel:()=>j(null),onOk:b,okText:"保存",cancelText:"取消",destroyOnClose:!0,children:v&&n.jsxs("div",{className:"q-form",children:[n.jsx("label",{children:"题目"}),n.jsx("input",{className:"q-input",value:((V=v.q)==null?void 0:V.title)||"",onChange:C=>j({...v,q:{...v.q,title:C.target.value}}),placeholder:"输入题目"}),n.jsx("label",{children:"议题日期"}),n.jsx("input",{type:"date",className:"q-input",value:((F=v.q)==null?void 0:F.date)||"",onChange:C=>j({...v,q:{...v.q,date:C.target.value}})}),n.jsx("label",{children:"思考内容"}),n.jsx("textarea",{className:"q-input q-textarea",value:((X=v.q)==null?void 0:X.description)||"",onChange:C=>j({...v,q:{...v.q,description:C.target.value}}),placeholder:"记录你的思考……"}),n.jsxs("label",{className:"q-check",children:[n.jsx("input",{type:"checkbox",checked:!!((I=v.q)!=null&&I.done),onChange:C=>j({...v,q:{...v.q,done:C.target.checked}})}),"思考完毕"]})]})})]})}const ps=[{id:"1621625955",question:"你有哪些提升自我的好习惯？",author:"黛西巫巫",voteUp:500923,excerpt:"1.保持早睡，至少能修复30%的颜值bug。 2.猛看片，不挑国家。不管是中国的，日本的还是美国的，各个国家的奥斯卡、纪录片、TED、科普片都可以去看。 补充自己的知识盲区，聊天时还能有更多话题。 3.不刷朋友圈、抖音。每天比同龄人，至少多出1小时时间，用来看书、护肤、健身。 4.吃饭时，不看任何电子屏幕（手机、电视、电脑）。很简单，追剧不差这点时间，反而一起吃饭的人很重要，多聊会天，说不定就发现了一个好项目。其次，…",content:`1.保持早睡，至少能修复30%的颜值bug。
2.猛看片，不挑国家。
不管是中国的，日本的还是美国的，各个国家的奥斯卡、纪录片、TED、科普片都可以去看。
补充自己的知识盲区，聊天时还能有更多话题。
3.不刷朋友圈、抖音。
每天比同龄人，至少多出1小时时间，用来看书、护肤、健身。
4.吃饭时，不看任何电子屏幕（手机、电视、电脑）。
很简单，追剧不差这点时间，反而一起吃饭的人很重要，多聊会天，说不定就发现了一个好项目。其次，还能防止颈椎病。
5.嘴巴闭合时，舌尖要轻抵在上颚，脸型才会更好看，呼吸也会更顺畅哦~
6.说话柔软，内心坚硬，做事果断。
做到这三点的人，人生会像开挂一样，工作顺利，爱情美满~
7.看到好回答大方点个赞，这样你以后会看到更多优质回答。
8.一不开心就喜欢收拾东西，等到房间被收拾得焕然一新，心情就开始变美丽。我爸还说，我这习惯让他少挨几顿骂（捂脸笑）。
9.多向大佬学习。
结识良师益友，是成长进步的最快方式。
10.人生80%的时间，往往都要用来工作，解决问题，剩下的20%时间，一定要做一些能减压的事。
比如，假期去小众景点旅行，感受异地人文风情和自然风光，既为生活增添乐趣，还能让工作更有动力~11.定期运动。
慢跑、俯卧撑、卷腹、瑜伽等等都可以。坚持下来，你会发现，以后遇到什么困境和挑战，都难不倒你！
12.提高睡眠质量，才能高效休息，提高做事效率！黛西提高睡眠质量的小技巧：
①睡前不进食不喝水；②睡前三件套：泡脚、冥想、听书；③裸睡。13.读书，各种类型都去读。
哲学类、社科类、历史类 、文学类 、自然科学类等等。读书，是一辈子都值得去做的事，持续大量地阅读能带给你的，不止是浮于纸面的知识，更重要的是对你思维认知的隐性提升。
如果你真的不知道读什么书，可以关注我的公众号「黛西巫巫」，我从我的私人书库里精选了200本「值得跪读」的优质好书，还有一套高效的阅读方法分享给你，让你内外兼修，快速提升你的个人气质。
https://xg.zhihu.com/plugin/30bcffd183b4a8d42b8ae2fa651b441e?BIZ=ECOMMERCE14.灵活运用「番茄工作法」。
工作学习25min，用5min来休息。人的注意力是极易分散的，无法长时间专注。将时间分块的好处是，可以保证每个时间段内，注意力是最集中的。
15.拜访亲朋好友，带点水果、酒水过去，对方口里说不用不用，其实心里乐着呢！
16.早起时，不要老想着起床的痛苦，要想想一些让人幸福的事，刺激一下你的大脑皮层，提高大脑兴奋度。
比如，可以吃一顿美味的早餐，可以看到暗恋的同学/同事。17.刷牙洗脸时，放点BGM，不仅能放松心情，还能变身电影主角，放点新闻、财经等资讯，不仅能get到更多有用信息，还能唤醒大脑，调整好状态~
18.再忙也要吃早餐，给自己充充电。
黛西有段时间工作忙，经常不吃早餐，结果皮肤超干，整个人沧桑了三岁！而且，还会因为饿肚子，拉低至少10%的工作效率！
19.做事要有「提前思维」。
比如，睡前想一想明天要做的事，把要带出门的东西准备好（文件、证件、钥匙、纸巾等等）。这样，第二天就不会慌慌张张，忘东忘西啦。
20.学会感恩。
感恩能让双方产生愉悦与快乐，比如在知乎上看到有帮助的答案反手一个赞，你会小开心，答主也会偷偷乐。
21.千万别躺着接工作电话！
躺着接电话声音会不一样，会让你整个人都显得很懒。
每次我躺着接我妈电话，她在电话里头都能准确判断出来：你是不是还在睡觉？哎～22.出门前，无论多急，都花5秒照下镜子。
不光可以检查一下发型、穿搭，还可以对镜子里的自己笑一笑，给自己打打气！没有搬不完的砖，只有不努力的打工人，加油，打工人！
23.微信发消息，少发语音，能发文字就发文字。（异地恋情侣除外）
24.在小红书上学简单耐看的懒人餐，不仅造福自己，还能造福身边人。或许，还能凭借精湛厨艺，俘获你的心动男神/女神哦~
25.不会在朋友圈立各种flag，只会在成功后分享喜悦。
立各种flag，别人只会在心里想：咦~又在吹牛皮；直接晒出成绩单，别人才会疯狂给你摁点赞。
26.学会自己消化糟糕的情绪。
再痛苦，也不会随便找人倾诉。你哭得再大声，别人只会觉得你很吵。你的伤疤再深，别人只会觉得很难看。
27.生活遇到难题，先花5分钟时间嚼一块口香糖，再去思考怎么处理。
28.要想治好拖延症，凡事先做「10min」。
万事开头难，当你开始做了10min，你会发现继续做下去也没有那么难。
29.享受独处的时间。
不必通过合群证明自己，别人参加各种局的时间，可以用来沉淀自己，认真生活。比如，散步、听歌、读书，都挺好。
30.需要专注做事时，比如写文、写报告，黛西会做这三件事：
①把手机有多远放多远
②用发夹把头发挽起，深呼吸一口气
③心里默念：3、2、1，变身！完成这三件事，我敲键盘的手速快过你抢红包、打游戏！
31.日常分类记账，并坚持理财。比如伙食、交通、服饰、生活用品等等，让自己知道赚的钱大头都花哪了，避免浪费。
我还没毕业时就开始学理财，现在每个月都能拿到丰厚的理财收入，有时甚至达到我工作收益的2倍。想学理财又怕踩坑的同学，可以关注我的公众号「黛西巫巫」，我把我花2K向金融大牛请教回来的理财秘诀，和这几年积累的理财经验，手把手分享给你，让你早日通过理财收获自己的第一桶金~
32.下载时间管理APP记录时间，不要再问时间都跑哪去了。
黛西最喜欢用的是forest，每写作10~120min，就能种一棵树。不仅能解锁各种各样的树，还能种真树，真的超有成就感~
33.及时清洗穿过的内衣裤，并且不要和其他衣服混着洗，这样才能防止细菌交叉感染，身体才会干干净净，无异味~
34.每天花15min，复盘一下当日。
问问自己，今天收获了什么？哪里做的不好？做得不好的原因是什么？以后怎样避免或改进？坚持一个月，你会发现你能把事都做得更好了。
35.坚持写作，坚持用备忘录记录灵感。写作不仅可以用输出倒逼输入，还能通过写作变现。
36.永远保持对新知识、新技能的汲取。
不论是生活还是工作上的技能，每天花30分钟专注去学习，会让你避免原地踏步的同时，有机会抓住更多机遇和意外惊喜。
37.不追求100%达标，75%就够了。
人不是电脑程序，不是下达指令就能100%执行。不用对自己要求太高，逼急了只会自暴自弃。
38.减肥减不下去时，学习学不下去时，想想刘昊然、想想王一博、想想易烊千玺。
39.适当「直爽」一些。
别人请教专业问题，会耐心为他解答，一来可以帮助别人，二来可以巩固自身专业知识。如果对方送小礼物，会大方收下并表达惊喜。因为，有来有往，才能让关系更亲密、更融洽~
40.拒绝「低价值」社交。
几百年没联系的同学，突然让你参加他的婚礼；关系很一般的同事，邀你下载拼多多帮他砍一刀。不想去，不想下载，就找个理由拒绝。不要想着拒绝别人不好，平时也没见他们这么关心你。
41.不会一股脑地帮别人。因为有些忙，有些人，真的不值得帮！
上大学时，黛西总是主动帮室友买饭、买单、分享学习资料。结果，后来每次买饭、买单的总是我。最无语的是，期末复习，室友A早就拿到了学姐的笔记，却躲躲藏藏怕被我们看到。考完了还得意洋洋，说试卷好多题学姐笔记上都有。
42.为自己保留1㎡的「秘密空间」。
没有神秘感的人，就像一部没有悬念的书，看了几眼就让人不想再读。
43.去外地时，带一个轻便的相机扫街。
拍下街道上摇摇晃晃的树影，拍下小巷子里下棋的老爷爷，拍下路边的煎饼果子摊。不是为了发朋友圈，而是为了感受更多烟火气息，给日常写作带来更多奇妙的灵感~
44.听别人发表不同观点时，不随意中断他人的讲话，而是耐心聆听，认真消化。这样不仅显得你有礼貌、有教养，还能让你从中学会用不同的视角看问题。
45.日常多说谢谢，尤其是别人帮你拿外卖、快递的时候，你不经意的一句「谢谢」，对小哥就是莫大的鼓舞，跟现在看完这篇回答后，你给我点个赞，都属于日常里的善行。

另外，如果你想要更多成长干货和学习方法，欢迎你到我的公众号「黛西巫巫」找答案。里面有我最宝贵的私家逆袭经验，全都毫无保留分享给你，比如优质书单和阅读方法推荐，理财经验技巧分享，哑巴英语变成英语达人的秘诀、自律长达10年的独门诀窍、连续高效学习工作10个小时的专注技巧……
我还会每天分享一篇优质成长干货，如果你不甘于平庸，我就在那边等你，陪你一起精进噢~
https://xg.zhihu.com/plugin/334885e2e76b584e9a7faab2096dcefb?BIZ=ECOMMERCE让你快速辨认聪明人的26个超能技巧：
如何辨认身边的聪明人？
推荐让你能轻松消遣时间的良心app：
你手机最消遣时间的软件是什么？
让你一眼就忘不掉的宝藏女孩全在这了：
什么样的女生称得上宝藏女孩？`,grade:"SSS",commentCount:3123,comments:[{author:"(匿名)",content:"话说我不敢裸睡怕半夜地震",voteCount:2454},{author:"(匿名)",content:"很喜欢泰戈尔写的一段话：有一个夜晚我烧毁了所有的记忆，从此我的梦就透明了；有一个早晨我扔掉了所有的昨天，从此我的脚步就轻盈了。 ​​​",voteCount:2324},{author:"(匿名)",content:"读书，是一辈子的事",voteCount:855},{author:"(匿名)",content:"怎么样改掉犹豫不决的毛病[大哭]",voteCount:600},{author:"(匿名)",content:"很喜欢看你的建议，如果可以，再来个介绍一些有用的app就更好了",voteCount:380},{author:"(匿名)",content:"感谢分享，现在就用！",voteCount:330},{author:"(匿名)",content:"我也不敢，生怕别人说这小伙子换对象真快[惊喜][惊喜]",voteCount:306},{author:"(匿名)",content:"嘿嘿嘿 想想王一博我会倍感十足",voteCount:276},{author:"(匿名)",content:"12挺有感触的",voteCount:141},{author:"(匿名)",content:`哈哈，这个必须安排，这是黛西之前写过的一篇7万赞app推荐：
你手机里有哪些不想卸载的良心 App？ 
https://www.zhihu.com/question/319414486/answer/858137620
同学可以看看，里面有没有你需要的呀~`,voteCount:62}]},{id:"1747627643",question:"有哪些越早知道越好的人生经验？",author:"嘉伟",voteUp:326645,excerpt:"1、要会识人，拥有强壮手臂的男生，他的健壮可能不是健身锻炼来的。2、人生的每一次成长，都是从“觉得自己是个傻逼”开始的，人生每一次的陷入困境，都是从“觉得别人是个傻逼”开始的。 3、结婚前的同居是不可或缺的。同居更能全方面了解一个人的习惯、饮食、身体情况。4、多看看书，如果你觉得无书可学，那你看的书真是少得可怜。 5、当学业、工作、生活不顺利的时候切记不要把爱情当作你的全部。6、任何事，只要你接受，就不…",content:`1、要会识人，拥有强壮手臂的男生，他的健壮可能不是健身锻炼来的。
2、人生的每一次成长，都是从“觉得自己是个傻逼”开始的，人生每一次的陷入困境，都是从“觉得别人是个傻逼”开始的。
3、结婚前的同居是不可或缺的。同居更能全方面了解一个人的习惯、饮食、身体情况。
4、多看看书，如果你觉得无书可学，那你看的书真是少得可怜。
5、当学业、工作、生活不顺利的时候切记不要把爱情当作你的全部。
6、任何事，只要你接受，就不痛苦。你不接受，就会一直痛苦，学会接受无法改变的事实。
7、失恋可以哭，但爱人的心不要死。记住，这世上所有的前任都是在给真爱铺路。
8、尽早利用知识去挣钱，钱不庸俗，庸俗的是懒惰。假装对钱不在乎，你就会真的没有钱。
9、人生的最大错觉就是以为来日方长。有些人有些事，可能一个随口的改天就没有了下文，普通的道别就是海角天涯。
10、刷知乎感觉到累的时候，就点两下屏幕，你会发现不一样的收获。
11、改变自己是一件很痛苦的事情，但是当你迈出第一步，你就会享受在路上的感觉。
12、运气就是机会正好撞上你的努力，但是你得先努力，不然机会来了，你也只能干看着。
13、不要贪便宜，天下没有免费的午餐。想得到任何东西之前都要扪心自问，自己是否付得起相应的代价。
14、有兴趣并且持续优化的人都是王者，能靠兴趣变现的人，往往已经跑赢了大部分连自己兴趣都不知道的人。
15、任何时候都不要轻易下结论，多思考，眼见不一定为实，也有可能是别人设下的局。
16、道理说的再多不如自己吃亏一次，实打实的经历才是教训。
17、谦虚低调，适时示弱是一种生存智慧，更是一种能够获取成功的技巧。
18、不要因为恐惧而犹豫，前进有时候会是消除恐惧的最佳方法。
19、很多时候要主动吃亏，从长远来看暂时的退让反而对你有利。
20、几人同行时留意一下后面的人，如果他在系鞋带就等等他。花不了几秒钟，但能温暖一个人的心。都看到这儿了，我不知道你还在等什么，现在花0.2秒点个赞，就能温暖作者的心！
21、不要怕犯错误。犯错并不可怕，错位是一个快速知道自身弱点的机会。其实每个人都是在试错当中成长。
22、无论什么时候读书一定是提升自己最快、成本最低的方式。
23、用心交一两个知心朋友。朋友不必多，只要有一两个知心的就好。
24、记得你有放弃的权力。现在知乎风气太“鸡血”了。我们都是人，都会累。不要压垮自己，放弃并不都是丢人的，要给自己喘息和从头再来的机会。
25、酒局要么滴酒不沾，要么千杯不醉。如果第一次喝了没有烂醉，那么下次聚会还是会拉着你喝，还是拒绝不了的那种。
26、手机闹钟只设置一个就好了，这样你就不会有侥幸心理。因为如果第一个闹钟你赖床了，那今天就迟到了。
27、与人交往，先想好自己是否能够提供给别人需要的价值。
28、选择真的比努力重要。做选择时，别总觉得自己不行，要思考“我怎样才能行”。一点点思维上的改变，你的世界会发生巨大改变。
29、紧张的时候去一下“洗手间”，能缓解紧绷的情绪，让脑子清晰一下，接下来该怎么做。
30、要多和在知乎上常给别人点赞的人做朋友。他们一般都心思细腻、温柔善良，并且他们财运特别好，多和他们在一起，你的运气也会跟着变好！

最后，自我介绍下： @嘉伟学长 
曾经的我迷茫了很久，期间也走过很多弯路，后来从传统行业转行，现在从事新媒体行业。知乎也是我互联网起步的地方，希望能给大家带来一些帮助。我现在也会更新一些电子产品、家居相关的内容，关注嘉伟，不再后悔。`,grade:"SSS",commentCount:1850,comments:[{author:"(匿名)",content:"我老公就是长期搬运货品，导致手臂变粗[捂脸]，苦力活赚辛苦钱不容易啊",voteCount:1180},{author:"(匿名)",content:"想让手臂粗真的可以不用健身，想知道原因，去社会底层看看吧",voteCount:795},{author:"(匿名)",content:"同居的时间越长，结婚的可能性越小",voteCount:553},{author:"(匿名)",content:"1，我胳膊不是健身练出来的是咋来的？来来来，你告诉我",voteCount:498},{author:"(匿名)",content:"不一定，我就是手臂粗其他地方都很瘦，因为我家里开超市的，经常回去帮我父母搬一些货物到架台上，久而久之就变粗了",voteCount:405},{author:"(匿名)",content:"2条认真的吗，我现在就觉得自己是个傻逼[思考]",voteCount:196},{author:"(匿名)",content:"什么时候开始啥文章第一点必GHS",voteCount:161},{author:"(匿名)",content:"不是，作者第一条的意思我是这样理解的，手臂粗壮不一定是健身，有可能是做体力劳动造成的，比如搬砖啊，意思这个人可能以前做的活比较辛苦的体力活",voteCount:152},{author:"(匿名)",content:"没干过体力活吗？",voteCount:148},{author:"(匿名)",content:"同意，我是打羽毛球的...持拍手就比非持拍手粗很多..",voteCount:63}]},{id:"1273732514",question:"有哪些应该坚持的好习惯？",author:"科技鸣人",voteUp:170002,excerpt:"1、女生不要嫌麻烦，最好在家里装一个针孔摄像头，门外和屋内都装一个，特别是一个人的人，最好装上，时时刻刻监控着家里没人时候的情况，不怕一万，就怕万一，手上有证据不仅能够提前避免危险，也能够有效的报警。 2、住酒店，要么就不喝热水，要么就自己带迷你热水壶自己烧，不要用酒店自带的热水壶烧水，你永远不知道这个热水壶在你来之前煮过什么东西，袜子，内裤等等，只有你想不到，没有它煮不了。 3、除非你住的是星级以…",content:`1、女生不要嫌麻烦，最好在家里装一个针孔摄像头，门外和屋内都装一个，特别是一个人的人，最好装上，时时刻刻监控着家里没人时候的情况，不怕一万，就怕万一，手上有证据不仅能够提前避免危险，也能够有效的报警。

2、住酒店，要么就不喝热水，要么就自己带迷你热水壶自己烧，不要用酒店自带的热水壶烧水，你永远不知道这个热水壶在你来之前煮过什么东西，袜子，内裤等等，只有你想不到，没有它煮不了。

3、除非你住的是星级以上的酒店，否则最好自己带一个旅行一次性床单，不要看酒店床单洗的白白的，其实根本没有你想的那么干净，有些酒店甚至都不会给床单进行消毒，上一个住在这里的人干的那些事还有残留，你就直接睡上去，想想都难受。

4、搬家的时候一定要先看小区环境，然后看房子的采光，最后搬进去的时候，一定一定要把所有的柜子都打开看一看，还有床底都要看一看，柜子藏人，床底躲人的新闻也不是没有，安全是最最重要的。

5、女生尽量不要穿深色的内衣内裤，男生也是不要过多的穿深色内裤，深色的内衣裤长期穿会对身体那些部位染色。

6、如果你容易赖床，害怕迟到，可以将家里的窗帘换成透光好一点的，每天阳光直接照射进来的时候，是你最容易清醒的时候，比闹钟还要好用。

7、手指的灵活对于大脑的思维敏捷非常有帮助，每天没事的时候可以多做做手指运动，例如现在，聪明的人已经开始双击屏幕锻炼了。

8、吃完饭的第一时间就把碗洗了，不然你只会越拖越久，明明5分钟就能做完的事情，你愣是拖了两三个小时，同样的，脱完衣服洗澡之前，先把内裤洗了，洗完澡你就会特别轻松，不然你又会开始痛苦的拖延。

9、没有什么特别好的机会，就先学着存钱理财，每个月存一点，刚开始你可能觉得没什么，但是两年之后，你就会比身边很多同龄人有底气很多，做任何事情都会更自信更从容。
钱才是一个成年人实力和底气。我在上大学的时候每个月生活费只有几百块，家里不富裕，也不能问爸妈多要钱，经常被同学嘲笑。
那时，我赚钱的欲望已经达到了顶峰，我在学校就开始了各种野路子，直到现在已经N多年了，我整理了超多的可靠理财方案，大多数普通人，甚至学生都可以尝试，绝不是那种垃圾的理财项目。

10、当你因为情绪不小心误解或者伤害到他人时，一定要当下立马去进行道歉，越及时处理，就越容易缓解，如果因为不好意思就不说了，只会越拖越恶劣，你们的关系越来越糟糕，反而到时候你的道歉花费的代价更大。

11、晚上睡觉时，不要去想明天要做什么，还有什么没完成的，越想你的思维就会越活跃，你自己会越焦虑，反而睡的一点也不好，可以想想今天发生的开心的事，有趣的事，让自己的心情变得轻松愉悦，能够很好的提高睡眠质量。

12、第二天要穿的衣服，要背的包，要拿的东西提前在晚上都收拾好，避免第二天起来慌慌张张，忘东忘西，到时候还要回来取就麻烦了，影响心情又耽误时间。

13、打喷嚏的时候记得拿张纸捂住自己的口鼻，不然随意的打喷嚏真的很让人嫌弃，口水真的会乱飞的，周围的空气都充斥着你的口水，如果没有纸就用衣袖捂住或者用书，本子捂住。

14、借急不借穷，不要总想着去主动帮忙，帮忙也是要分人的，那种时时刻刻都要人帮忙的，你最好躲远点，一旦你帮了他一次，他就会赖上你，你后面不帮了，他就会在背后说你；那种不经常求帮助，偶尔遇见一件棘手的事，这种人你帮了，他之后也会帮助你。

15、随时告诉自己，你当下最重要的不是谈恋爱，不是想着怎么找前任复合，而是赚钱，一定要让你的脑子充满赚钱的欲望，脱单不一定能脱贫，但是脱贫一定能脱单。
如果你连赚钱这种事都需要别人催着你，盯着你，时时刻刻鼓励你，那我劝你还是早点混吃等死吧。任何时候，都不要只追求稳定，而不去寻找新机遇。
现在赚钱的方式让人眼花缭乱，但是真正能赚大钱的永远是那些自身能力过硬的人。
所以，我选择了自学的自媒体写作、Ps、Python、PPT技能，这技能在之后都成了我的安全感，如果你也想学习一些可以傍身的技能，我把一路走来的各种经验、法宝分享给你。

16、走路的时候，把脚抬起来，不要拖着地走，鞋子磨坏了你不心疼我还心疼呢！而且拖着鞋走的声音真的很让人不舒服，恨不得把你鞋给你扔了，而且会显得你整个人拖沓没精神。

17、吃饭的时候不要看综艺，追剧，玩手机，不然你会发现，明明20分钟可以吃完的饭，你硬是吃了一两个小时，等你开始收拾的时候，别人都已经刷完一套题，做完一个工作任务了，有事情的时候一定要讲究效率，除非你今天的任务都完成了，那你吃三四个小时都行。

18、洗手间是给你上厕所的，不是让你在那儿闻屁聊八卦的，上完厕所洗好手就直接走人，不要和别人在那儿说别人的家里长短，因为你根本不知道哪个坑蹲的就是你们口中的人。

19、定期清理一下你的好友列表和朋友圈，有些人早就已经把你拉黑了，有些人你可能根本就不认识，可能就是喝醉了随便加的，也可能是路边搞活动送你把扇子让你加的，清理不必要的人，其实是对你自己隐私的一个保护。

20、在饭局聚会上认识的人，如果你们互相加了微信，并且是你主动提出的，第二天一定要和别人主动打招呼，表达一下认识的喜悦，争取有第二次见面，不然他只会成为你列表里一个一面之缘的陌生人。

 
21、做不到按时给家里人打电话，就聊微信，现在电话用的确实少了些，但是语音，视频聊天用的还是比较频繁的，没事儿的时候和家里人聊聊微信，开个视频，家里人远比你想象中的更加想你。

22、定期去检查身体，最好半年或者一年做一次全身检查，不止是你自己，还要带着你的家人一起去，有些疾病不检查真的很难看出来，要在最好的时间杜绝一切身体隐患的发生，身体健康是做任何事的基础和前提。

23、不要翘二郎腿，对腿型和私处都非常不好，容易有小腿肌肉，腿型歪，私处滋生细菌。

24、走路的时候尽量不要戴耳机，以防被人跟踪自己还不知道，过马路的时候不要低头玩手机，你不差这几分钟的，安全是最最重要的，有时候不是你不遵守交通规则，而是有些人不遵守，但是会连累到你。

25、吃东西的时候把嘴闭好了，不要吧唧嘴，吧唧嘴真的很招人烦，嘴巴里的东西没咽下去之前，不要开口对着别人讲话，一开口嘴里全是碎菜渣子，那种视觉冲击有多强，你应该能想象的到。

26、出门回来，没换衣服裤子不要直接往床上铺，你永远不知道你衣服裤子挨过的地方，坐过的位置有多脏。

27、上完厕所必须洗手，不管你是上小还是上大，都要洗手，我知道这件事很小，但是很多人就是不好好做！你上完厕所不洗手，一会儿你又去吃饭，这不是等于你在厕所吃饭嘛！

28、别人和你说话时，如果你在忙，你要先停下来告诉他“你现在有点事，晚一点我来找你说可以吗？”，而不要自己做自己的事情，直接把别人忽略了，万一那个人的事情很重要，之后你再去问，别人就不会那么尽心尽力和你说了。
这是一种社交礼貌，如果，你想知道自己的社交能力到底怎么样，我这里有一套判断社交能力的测试题，根据你的自身心态、社交情景、应急选择，等等方面对你的社交能力进行综合判断。
我测过，超级准！我就是那种在网上蹦跶挺欢，一见面怂得一批！知道自己的缺点之后，我会刻意练习，弥补短板，现在社交水平已经有了明显的提升。

29、一桌子人吃饭聚会的时候，你可以适当的找一下那个一直不怎么说话的人，把话题适当的引到他身上，让他有一些存在感，他心里会非常感激你，人总是对那个重视他注意他的人更信任。

30、每天记录收集听到的，看到的有用的东西，如果手边没有笔和纸，可以记在手机备忘录里，也可以进行点赞保存，这样下次你需要的时候，就能很快的找到了，而且，只要你愿意点赞保存，你就会收到越来越多的帮助和机会。

推荐给你另外几个高赞回答：
现在还有什么普通人不太知道的暴利行业？
你有什么道理幸好你早就知道的？
你在生活中有哪些观人术和识人技巧？`,grade:"SSS",commentCount:0},{id:"2036917683",question:"怎么才能心无旁骛地学习？",author:"林有声",voteUp:110211,excerpt:"这套方法，是流传在衡水、黄冈、人大附等部分学霸圈子里的超牛理论。 不是费曼技巧、番茄学习法这种全网都是的操作方法，而是学霸们透过现象直达本质的思考和行为，用起来非常的爽。 我当时的高中是省重点，学校组织尖子生去几个神级学校交流，我才略知一二。至今还跪谢这次交流！ 这套方法概括来说， 就五个字：真、霸、道、总、裁。 1、“真”式学习状态 学霸们在学习的时候，会进入一个状态，周围的一切都变得暗淡，连隔壁同…",content:`这套方法，是流传在衡水、黄冈、人大附等部分学霸圈子里的超牛理论。

不是费曼技巧、番茄学习法这种全网都是的操作方法，而是学霸们透过现象直达本质的思考和行为，用起来非常的爽。

我当时的高中是省重点，学校组织尖子生去几个神级学校交流，我才略知一二。至今还跪谢这次交流！

这套方法概括来说，就五个字：真、霸、道、总、裁。

1、“真”式学习状态

学霸们在学习的时候，会进入一个状态，周围的一切都变得暗淡，连隔壁同学嗑瓜子的声音你都听不见，精神完全集中于手头的事情，时间不知不觉变得很快。

类似于我们在打王者荣耀时候的感觉，他们称这种状态为“真式学习状态”。

在这个状态里，学习一分钟，等于别人学习十分钟。我们可能偶然进入过这种状态一两次，而学霸则是随时都可以进入。

我们平常看似在努力学习，实际上只是低效的“假式学习状态”， 很多人会说，啊，我已经很努力了就是学不进去呀咋办，错，你不是学不进去。而是你的大脑下线了。

很多人在学习时总会感到倦意，看书不一会儿就昏昏沉沉的，这是因为，大脑神经元不活跃。看书对你来说只是一个机械的动作，没能引起大脑运转。

比如，我们每天上厕所，洗脸、刷牙、穿鞋、关门。都能一气呵成。

因为，我们在做这些的时候，都是潜意识在操作，大脑不用思考。哪天你突然想在中间插一个烧开水的步骤，就得专门去记着烧水，这时候脑子才开始转。

运动员赛前要做热身、电脑运行要先安驱动，大脑也需要一个明确的信号，来告知它即将进入一个更加高效、更加紧张的“真性学习状态”。

如果，你还不清楚这个信号的重要性，我们可以举一个例子：

比如说，你妈每次打你的时候，都会用鸡毛掸子，久而久之你就对拿鸡毛掸子这个动作，形成了“信号记忆”，久而久之她一拿鸡毛掸子，你就直接跑没影了。

学霸告诉我，启动大脑状态最好的信号——就是深呼吸。

因为深呼吸是一个天然的活跃脑细胞的方式，每次深呼吸之后，由于氧气的摄入变多，脑部神经会活跃起来。

这样最有利于，进入“真性学习状态”。

好下面就跟我尝试一次。

坐直放松腹部，

用鼻子深呼吸，

平稳吸气，

吸到底。

直到肺部充满空气。

让空气在肺部停留3秒钟，

1秒

2秒

3秒

接下来，用嘴慢慢把气呼完。

好现在，你的大脑比99%的人转得快了。

双击屏幕点个赞，让我看到你已经做完了。
关于学习这个，我还想多说两句，很多人上大学之后，才后悔自己努力学习了好几年，最后选择了一个不适合自己的专业，还有更多的人大学上了四年，毕业之后才发现当初选的专业屁用没有。
咱们努力学习不就是为了能有一个好的未来么，我之前做过一套专业心理学机构出版的测试题，能够通过你对事物的判断，多种场景下的反映感受，来分析出你大学适合学习什么专业。
还真挺准，对你的学业生涯一定会有帮助。
好了，言归正传接下来的四点将是更硬的干货，我们继续。

2、“霸”占法则——让老师给你打工

我初中上的省重点，成绩垫底找关系进校，最后中考成绩班级第三，年级前十。

秘密就是我每天下课就拿着课外题的卷子去围攻老师。

别人做课间操我就躲进厕所，等人走完了溜进办公室找化学老师问，别人自习写今天的作业，我去办公室问数学老师明天的问题。

别人下课先去个厕所再找老师，我先憋着尿冲上讲台让teacher走不出教室。

去疯狂霸占老师的时间，让他们变成唯你是从的打工人。总有一天，老师会红着脸羞羞的说哎呀，好像你这个解题方法更简单。

那种爽，完爆偷塔。

具体操作方法：

上课老师讲的哪一点让你皱眉头了，下课就去蹲办公室。讲不明白就不让他去厕所。

搞懂一种题，就骂题两分钟：

在我面前装批，我还不是把你拿下！

精髓：

记住，老师和难题都是欠虐体质，你越强势，他们就越歇菜。

这跟打麻将一个道理，气势起来了，再难摸的边张你都能胡。

一会儿扣手机一会儿要撒尿的，一把上听的牌也能让你打的稀烂。

3、“道”理法则——黄冈中学学霸的秘密

这个方法是当年我黄冈中学的学霸朋友教我的，我都走出校园6年了，还在用。这个方法不仅让我提高了成绩，还让我敢在舞台上大方说话。

由此获得了很多机会和自信。

具体方法：

在你家客厅的沙发上放几个娃娃坐着，模拟上课，你当老师。拿着你刚学会的知识，对着他们按你的逻辑，讲一遍。讲的不爽了还可以批评一下某位2b学生。

上帝视角的爽，你拥有了。以前学不会的知识，你也拥有了。等你不满足于给傻不拉几的娃娃讲课的时候，就可以去班里给你的女神讲题了。

女神的一句：哇哦你好厉害！又能让你有动力解锁新的难题。

注意：

讲课声音响亮。
当学生是白痴，把道理讲透。
逐渐加快讲题速度。
此处可以点赞。

4、“总”看底层逻辑法则——你和985的差距在这儿

所有的知识，就跟生活里的破事儿一样，都有规律。而且规律就那么几条。只不过有规律这件事，只有过了独木桥的15%的人意识到了。

所有的学习只需要弄懂这三个问题：

What：这个知识点的基本定义是什么？此时你超过了30%的人。
Why：这个知识为什么这样应用？此时你超过了60%的人。
How：我要是出题，我会怎么出？恭喜你，你的一只脚已经在985了。

比如，我现在出题：简要写出这篇回答教给你的爽学法则以及你的感悟。

你的解题思路：

1、what：题目中问了两个问题，一个是爽学法则，一个是感悟。爽学法则的定义就是真、霸、道、总、裁。五个字。

2、Why：这四个法则用起来有效的原因是能给我带来1234种的结果.

3、用“我.....”的句式写几句试用测评。

这道题就完整的答完了。

最后，（how）回过头来看题目中有两个问题，也就是两个得分点，检查一下你都回答了没？如果你出这道题你会设置几个知识点？每个知识点的分值是多少？

掌握这个思路，你的成绩就不可能下得来。出题人的心思你一眼就能看穿，怎么可能有你不会做的题？

每个985院校的学生必定有一双透视眼，他们最强的学习能力不是记忆力，也不是智商高，而是他们能透过现象看见本质。

5、“裁”减法则——没用的统统打包扔回收站

注重质而不是量，裁掉哪些无效用功，别再自欺欺人。

1、时间上：不要再以你起多早睡多晚为骄傲，用这么多时间学习还这个成绩，你这是在告诉别人你水平不行。

留意你真正能学进去的时间点，在那个时间内集中注意力。

2、知识点上：不要再以你刷了多少题为骄傲，你这样刷题就和大妈跟团游一样：上车睡觉，下车尿尿，回家一问，啥也不知道。

多去和你的娃娃讲课，你能讲出来的才是你考试能写出来的答案。

3、选择上：利用好一篇高质量文章，比你看100篇文章啥也不干有用。

付费知识（已被证实有效的）里的内容更可能是高效，随便百度出来的内容一般都是别人乱写的。

4、学习环境上：这一点快被说烂了，把你桌子上一切让你分心的东西都清理走。你要是还管不住自己分心，就找一个跟你比着学的，坐他旁边。在专注的人跟前，你不好意思荒废时间。

5、进度上：买一小包便利贴，每天早上把今天要完成的学习任务写上去，一个任务一张便利贴。贴在你的桌角排列整齐。完成一件事就撕掉一张便利贴。使劲踩踩。

刚开始你不太能把握自己每天能完成多少量，坚持7天，就顺畅了。这个小细节，不仅能让你学习爽起来，日后你会成为一个思路清晰、做事缜密且时间充裕的人。

不到最后关头千万不要打开的爽学锦囊，双击屏幕，即可领取。

能告诉你的全告诉你了还要啥自行车。

如果你还有问题，那大概率是你读的不够仔细，点个赞标记一下，留着以后多刷几遍。

这些回答也许对你有用：
1个月提高颜值的50个小技巧
男生做到这5点才算走向成熟
用过就停不下来的10个小玩意
有哪些应该坚持的好习惯？
有哪些高情商的聊天技巧？
有哪些布局精心、长久的骗局？ 
你有哪些看过五遍以上的经典电影?`,grade:"SSS",commentCount:973,comments:[{author:"(匿名)",content:"深呼吸那一关，我就觉得我要睡觉了。",voteCount:2425},{author:"(匿名)",content:"黄冈人表示没听说过·",voteCount:1091},{author:"(匿名)",content:"您为了点击量真是拼了",voteCount:1049},{author:"(匿名)",content:"看过这么多篇有关学习效率，学习方法的文章，答主的文章中的小方法算是最朴实的了[捂脸]希望我能鼓起勇气，好好拼搏这一年！一年后，请各位网友来踢踢我，见证我的高考成绩[害羞]",voteCount:875},{author:"(匿名)",content:"课下也是老师的上班时间 怎么没义务了",voteCount:534},{author:"(匿名)",content:"强行用几个字来概括，还要搭配霸道总裁这些字眼，瞬间让人觉得就是随便凑数的回答，形式主义。",voteCount:463},{author:"(匿名)",content:"更重要的还是自己多多思考 实在不会才问老师。我们班一学生就是啥都问老师把各科老师给烦透了[捂脸]",voteCount:382},{author:"(匿名)",content:"讲知识点不就是费曼学习法？你搁这偷换概念好玩吗",voteCount:288},{author:"(匿名)",content:"一直烦老师好像不太好吧，课下他们没有义务辅导你",voteCount:227},{author:"(匿名)",content:"人分人表示没听说过",voteCount:213}]},{id:"1298542501",question:"你最庆幸自己养成了什么习惯？",author:"黄同学Live",voteUp:105122,excerpt:"1，入住酒店，习惯性的把酒店里的浴巾，茶壶，杯子，拖鞋以及墙边上的小卡片随手丢在一旁，不干净。 2，家里时刻备份个药箱，比如坐车晕车时的风油精和陈皮，关键时刻能够及时对伤口进行护理抢救，记得配上锁扣，以防小孩碰触而误食。 3，洗澡搓泥，不会让你皮肤更加干净洁白，光泽，若皮肤搓伤，导致湿气侵袭。 4，女孩子出门在外，带上个防狼喷雾，对准其双眼，单人行走的时候尽量穿的多些，并不会因为你没做错事而侵犯你，你…",content:`1，入住酒店，习惯性的把酒店里的浴巾，茶壶，杯子，拖鞋以及墙边上的小卡片随手丢在一旁，不干净。
2，家里时刻备份个药箱，比如坐车晕车时的风油精和陈皮，关键时刻能够及时对伤口进行护理抢救，记得配上锁扣，以防小孩碰触而误食。
3，洗澡搓泥，不会让你皮肤更加干净洁白，光泽，若皮肤搓伤，导致湿气侵袭。
4，女孩子出门在外，带上个防狼喷雾，对准其双眼，单人行走的时候尽量穿的多些，并不会因为你没做错事而侵犯你，你做好自我防卫和别人想要侵犯你这是两码事。
5，适当的时候去拔火罐，刮痧，按摩下，能改善局部血液循环，松懈局部肌肉，调整局部内能，你别偷偷的去叫保健服务去了。
6，积极参与表现自己本没错，但不要在别人说话时插入，不会带给别人好印象，反倒觉得这人毫无耐心和修养。
7，双击屏幕你会解锁一个新功能（收获一个小爱心）。
8，社交礼仪下，化点淡妆，不仅给人干净舒服的好印象，自己看到美美哒的形象也能心情愉悦，没有人会去跟一个拉里邋遢，满脸蜡黄的人深交，男生也同样，不娘。
9，懂得拒绝别人，别人不会因为遭受你的拒绝远离你，如果因为这点原因疏远，那么这个朋友其实也不值得深交，亲测清理辣鸡好友好用。
10，出席酒会，酒席上的位置不能随便坐，主次都有严格的秩序；敬酒时，酒杯略微比别人低一点，这是对别人的尊敬，也显得自己的谦卑，无论与自己的领导，同事和长辈都一样。
11，读书是最廉价的增值方式，比如在思维方式上，不读书的人，看世界的角度上比较狭隘，片面，因为他们所获取知识的方式是网文等快餐式阅读，这带来的是对知识深度思考能力的不足。
相反，经常读书的人，因为书籍本身解构问题都是由浅入深，循序渐进到独到精深；所以当看到问题时大多也能快速抓住事物的本质，解决问题。
这就是读书带给我们思维提升上的好处，如果你暂时没有适合自己个人书单，那么我这里推荐给你我精选的100本优质私人书单，并分好了7大类，包括认知思维提升，投资理财，心理学，时间管理等书籍，帮助你在思维提升，情商，财商，自我管理方面的提升，关注我的公众号「黄同学LIve」回复「书单」即可，把这份精选书单分享给你，大大节省你找书的时间啦~
https://xg.zhihu.com/plugin/aac9e5957808dfdd8859f879e515b6bf?BIZ=ECOMMERCE12，睡觉时与手机分房睡，关入小黑屋，最好远离床头，以防你手贱会去摸，第二也有利于你远离辐射。
13，走路时挺起胸膛，面带微笑，展现你的自信，早晨遇到同学同事亲切的打个问候语，一天心情也会很好。
14，年轻肆无忌惮透支身体，混迹于夜店，蹦迪，烧烤，把吸烟当作是个性，时髦的表现，殊不知这些都将会成为你未来无知的代价。
年少不知身体贵，老来那啥那那啥。
15，适当时候清理下朋友圈，同频共振，共质相吸，把一些无趣的，低俗，媚俗情绪化的人都过滤掉一遍，第一你自己不会太压抑被其影响到，第二你会发现也没有多少可以点赞的朋友。
16，不要拖拖拉拉，一天中最清醒的时候早晨可以先去工作会，屏蔽掉手机，你会发现效率是真的高。
17，想找女朋友，也要选择好场地，去到书店，花店，手艺场所上找，和去夜店，KTV，网咖里边，试问渣女，浪子哪个场所的概率更高点？
18，恋爱后，记住对方的生日，纪念日，如果你懒，那么了解下微信的备注功能，增加个日历提醒功能。重大节日需要点仪式感，穷和敷衍是两码事，女人“不讲理”不是一天两天了。
19，带耳机听歌的时候不要哼哼小曲，别以为你唱着吻别，你就是张学友了，永远不知道有人背后手机记录着你的动听美妙的音乐，别一自嗨时别人把你发上网上，一步小心你就火了。
20，晚上睡觉看手机手机调成护眼模式，养眼又养颜。
21，长期坚持对你有益的事情，比如，经常早期跑步，你会发现这个城市不一样的风采。坚持写作，输出倒逼输入，与人交流也会文绉绉，而不是一句卧槽。
22，毕业22岁以后，尽早的开始理财投资，不会理财的人反而是对生活是没有规划的，他们一贯是先消费再去理财，然而遇到不可抗力因素，却毫无风险抵抗能力。
相反，懂理财的人，会更懂得生活，他们先理财然后再去消费，有能力规划好自己的资产，且能够将它们复利增值。
今天能够将10%收益，明天就能获得100%的收益。如果你想学习理财，我将我学习理财以来实现15%的收益方法和普通人可以参与的投资产品给到你，更重要的是，这里有我零成本每个月赚取500-1000元收益的秘密可转债打新，学生党同样可以参与；关注我的公众号「黄同学LIve」回复「理财」即可，把这份理财秘籍给到你，相信你也能有一份睡后收入~
https://xg.zhihu.com/plugin/b367433c127dbd04184e6c13f958f9b8?BIZ=ECOMMERCE23，喝酒一时爽，想着清醒一下，洗个澡，我劝你三思，这是有依据的。
酒后身体机能发热，而洗澡会使得血液循环加快而大量地消耗，致使体内含糖量下降，从而导致体温降低，轻则体力匮乏，重则危及生命。24，公用东西，考虑下别人的感受。公用电脑，不要下载到c盘，空间已经很满了；餐上有公用筷子的，别用自己的筷子夹，谁都不想间接接吻；还有公用厕所，记得清理。
25，一年一次，定期清洗牙齿，不但可以去除牙结石，还能让你笑的时候露出大白牙，美观自信，若一口蒜味，估计人家更愿意戴口罩和你说话。
26，定期做个断舍离，把花呗，借呗，信用卡各种借贷软件卸载了，把家里没用的东西闲鱼上卖了，把不经常看的各类充值会员取消续费，你会发现，每个月能多屯出上千元来。
27，出门在外，随手带多一包纸巾，特别是出门上班，逛街，出游时候，一不小心，新陈代谢，汗流浃背，可以解决大部分尴尬的局面。
28，不要熬夜刷着抖音，微博，甚至知乎等短频快消遣的娱乐项目，看完后估计已经两点了。
29，睡前喝一杯热牛奶，能让你迅速安心下来，快速入眠。因为牛奶含有一种能使人疲倦欲睡的生化物L色氨酸和微量的吗啡类物质，这些物质对身体有一定的镇静催眠作用。
30，表达观点时，多用第一，二人称，更容易拉近彼此之间的距离。比如：
把“谢谢”改为“谢谢你&#39;; 把”觉得“改为”我觉得“；把”懂了吗“改为”我说的听懂了吗“31，下次见面，能够记住他人的名字，好感瞬间上升。
32，开诚布公，请求别人事情，别一句一句”在吗“，有事直说好嘛，信息看到会回复，如果不回代表我不想理你。
33，日常收拾下房间，杂乱的衣服包包，桌下的抽屉，搜搜兜里袋子，可能会有大惊喜。
34，不自觉的给别人一个谢谢，拿外卖，收快递，别人派发传单给你都可以说声谢谢，能使别人开心好久，尤其是下雨或炎热的时候。比如此刻你现在给我点个赞，我也会开心许久。
35，记住上面每一条，收藏起来，反复阅读

自我介绍一下，我是 @黄同学Live ，一个有料又有趣的干货答主，宝藏男孩，来我的公众号“黄同学LIve”，你会惊叹没有早日发现这一个宝藏地，在这里我还会继续分享：
分享我两次快速转行互联网的方法，给到不喜欢当下工作状态，但想要改变的你，并且啊每一步都是可以借鉴学习的。
分享我求职路上，撰写腾讯等大厂都认可的两份简历模板，以及让他们一眼前一亮的两份面试作品，祝你当下求职的你有个借鉴参考。
分享我一路学习自媒体时涨粉，变现的运营干货知识，工具技能，给到想通过自媒体赚钱的你。
https://xg.zhihu.com/plugin/ceef4aaa822c91a536cee535dcf894e5?BIZ=ECOMMERCE

推荐下面我今年深刻体会关于社交，职场，恋爱两篇慢慢懂得的道理：
你有什么道理幸好你早就知道的？`,grade:"SSS",commentCount:1640,comments:[{author:"(匿名)",content:`输出倒逼输入
这会是个很好的办法
你若每日强制早起，则必会开始早睡`,voteCount:856},{author:"(匿名)",content:"第33条，哈哈哈，好真的有惊喜，之前整理小房间的时候，发现了老妈藏在墙角的小袋子（我妈没上过学不识字，只会写自己名字，她没银行卡），打开一看，我勒个去，偷偷数了两遍，10W现金，我特么就没一次性拿过这么多钱在手上（穷逼见笑了）。",voteCount:592},{author:"(匿名)",content:"这对北方的小伙伴来说完全不可能，北方风沙大，搓澡肯定不会放弃",voteCount:439},{author:"(匿名)",content:"搓泥跟湿气有啥关系 搓泥只是去角质油脂而已",voteCount:261},{author:"(匿名)",content:"假的，我北方人，从小搓到大",voteCount:244},{author:"(匿名)",content:"好一点的酒店一般不会有黄色小卡片，需要刷卡才能上电梯[大笑][大笑]",voteCount:218},{author:"(匿名)",content:"不，你还可能一天只能睡2-4小时，导致严重偏头痛，心脏肝肾严重损伤。",voteCount:193},{author:"(匿名)",content:`强制早起
早上工作学习打瞌睡
中午午睡之后，下午能清醒一点
晚上又不困了[捂脸][捂脸]`,voteCount:182},{author:"(匿名)",content:"湿气和环境有关吧，生活习惯没变，在北方没湿气症状，在江浙沪呆久了，湿气症状明显。",voteCount:179},{author:"(匿名)",content:"对于北方人来说，不搓澡等于没洗澡。。。",voteCount:166}]},{id:"764049007",question:"有哪些越早知道越好的人生经验？",author:"山山笔记",voteUp:100590,excerpt:"1.事情没有做成之前，不要告诉任何人。 2.世界不是善意的，收起你的天真。 3.自己明确知道没有意义的事情，就不要去做，真正学会自控。 4.毅力和自控力是很可怕的东西，因为99%的人根本不具备这种品质。拥有它你就比大多数人都要强。 5.这些年我一直提醒自己一件事情，千万不要自己感动自己。大部分人看似的努力，不过是愚蠢导致的。 6.人生，除了生老病死，其他都是小事，这世上最重要的是你的性命，在此基础上才可以谈及其他。…",content:`1.事情没有做成之前，不要告诉任何人。
2.世界不是善意的，收起你的天真。
3.自己明确知道没有意义的事情，就不要去做，真正学会自控。
4.毅力和自控力是很可怕的东西，因为99%的人根本不具备这种品质。拥有它你就比大多数人都要强。
5.这些年我一直提醒自己一件事情，千万不要自己感动自己。大部分人看似的努力，不过是愚蠢导致的。
6.人生，除了生老病死，其他都是小事，这世上最重要的是你的性命，在此基础上才可以谈及其他。
7.在工作上学会喜怒不形于色，若你的情绪一眼被老板看穿，那你的前途便需要重新考虑。
8.一定要摆脱讨好型人格！建立在讨好上的社交关系百分之九十以上都是无效的。不要再依赖被人喜欢的样子活下去。是活不下去也过不好人生的。那样的人生简直就是废墟一片。
9.圈子不同，不必强融。
10.千万不要有任何改变别人的想法，你拯救不了任何人，你也改变不了任何人。人只能被自己改变，你要知道，以后走任何的路，你只能控制你自己一个人。你无法选择考试时旁边是音响还是石头，你只能依靠改变自己才能保证自己的人生。
11.如果某件事情唯一的好处就是让你有片刻的痛快，尽量不要去做。
12.读书是最低成本的成长方式。
大多数人的生活之所以会越来越糟糕，是因为把时间都用在了游\uFEFF戏、吃喝玩乐刷手机上，而那些越来越牛逼的人，「想要」跟「得到」的欲望非常强烈，他们把更多时间花在了提升自己的事情上。
我一直认为读书是最低成本的成长方式，如果你想读书学习却不知道怎么开始，可以关注我的公众号【山山笔记】，与你分享一份被18W人收藏过的必读书单，这份书单可以让你三年内不用再去找书读，快速获得3倍成长。
13.不如意事常八九，可与人言无二三。
14.不要光看别人说什么，多结合他做什么，再去想他的真实目的究竟是什么。
多发现生活中隐藏的一些细节，不光用眼、用耳，还要用心。
15.人到了一定的年龄，就要扔掉四样东西：没意义的酒局，不爱你的人，看不起你的亲戚，虚情假意的朋友。必须拥有四样东西:扬在脸上的自信，长在心底的善良，融进血液的骨气，刻在生命里的坚强。
16.每一个人都在自己的智识、情感、欲望、经验等限制条件下做出了给自己利益最佳的选择，每个人都在为自己而战，谁也不比谁高尚。不要再说什么自私，太幼稚了。
17.一个人如果去了做了自己不适合的工作，那他所有的优点都会变成缺点。一个人如果做了自己喜欢且适合的工作，那他所有的特点（注意是特点，不含缺点）都会化成优点。
18.与人交往，先想好自己能够提供的价值是否是别人需要的。
19.如果家人文化程度低，做大事不要与他们商量，但要对他们展现出你无比的敬意。
20.别工作了就忘记学习，学习能够让你有更多的选择。
21.越早明白越好的道理：每天发生在自己身上的99%的事情对于别人而言根本毫无意义。世界上没有感同身受。
22.当你落难的时候，最容易看清谁才是朋友。那些平时毫不关心，在你辉煌成功的时候才找你的，都不是朋友。真正的朋友不会在意你的身份，也不会看你的处境，有难必帮，有福同享。
23.人们普遍知道的很多，但是能照做到、能想开的很少。人最重要的，就是应该清楚自己想要什么，并且认真的去对待。
24.健康永远是第一位的，早睡，早起，运动。
25.别等全会再做，边做边学。
就拿学英语来说，我之前是个英语渣渣，每次考试都稳居班里倒数前十，后来一边学语法，一边做题，再加上科学的方法，我的英语开始突飞猛进。
26.学会表达，不要让对方猜。
27.当下的感受，要学会说出来。
28.不要在深夜做一个重要的决定，很容易后悔，大多数人深夜是非常脆弱的，很容易产生极端的想法。
29.真正的醒悟，是需要实实在在的经历的。
30.有机会帮助别人时，尽量多帮助别人，不求回报。人生，都是不断在结缘。结善缘，得善果。今天你帮了他，明天他又可能帮了你。积善之家必有余庆。比如在知乎看到好的答案，反手就是一个赞，以后在动态就能看到答案，很方便。

我是山山，一个出身普通，但仍拼劲全力向人生目标进发的追梦青年。
如果你想吸收更多干货方法，实现野蛮生长，关注我的公众号【山山笔记】，我把我不到2年时间从一个普通大学生，到大厂核心主管层的经验分享给你。
里面还有我精选的几百本高质量好书，能让英语渣逆袭高分的神速提分秘诀，轻松高效早起妙招，以及让你看透人心的实用小技巧等，助你少走弯路，更快坐上属于自己的高速人生直通车。
最后，希望看完回答的你能给答主一个小小的赞，这对我来说是最大的认可，同时，你也会收到更多优质的回答～
另外，推荐3个我更高质量的回答：
在人际交往中你悟出过什么道理？（3万人认同的超实用人际交往原则~）
生活中有哪些实用的心理学知识？（超实用心理学知识，让你一下恍然大悟！）
你读过哪些令你有跪感的书？（本书单获得32万收藏，不容错过！！）`,grade:"SSS",commentCount:1665,comments:[{author:"(匿名)",content:"不是所有的人都值得深交",voteCount:3765},{author:"(匿名)",content:`不请自来。觉得作者写的特别好，1.看到第一条就秒点进来了，感觉和自己很像，一般自己做很多事情，没做好之前不会对其他人说，藏在心里，除非遇到问题再去找相关人员，再就是自己学一门艺术或是技能，也是不会告诉他人，低调一点，不张扬。
2.自控与毅力，我还是做的不好，心里乱，很多时候静不下。听说冥想会有帮助[酷]
3.现在放假，我把游戏都卸载了(真的不玩了，没兴趣了，这里打包票[耶])，还有一开始迷恋小说，那天也卸载了。我现在每天看直播学英语，再自己学习编程，让自己变得更好(如果爱一个人，不要整天你你我我，而是做一个出色的人，在以后的以后，与别人竞争时，希望会有更大的自信与实力。(许多年前朋友送给我的）)
4.我现在还是学生，经历的并没有那么多，也无法体会作者提出的那些，但以后肯定会有的，在这里看到了这些，心里也有所缓冲，感谢山山[爱]。
5.头一次发评论，不小心说的很多，但确实是心里有些触动，再加上我写作不是很好，有逻辑乱的地方，请忽略[捂脸]
有幸遇见这篇文章`,voteCount:2725},{author:"(匿名)",content:"不仅是爱情，朋友有时候也需要“门当户对”",voteCount:1012},{author:"(匿名)",content:`第八点和第二十九点，超级赞[赞][握手]
我们都是以一种积极的态度来应对看似消极的人生，在这个过程中，经历的事情太多太多。
做自己，不必随波逐流，每一个灵魂，都是独立而高贵的存在，我们都有追求自己喜欢的东西的权利，人生这么美好，不要为了一些小事牵绊住脚
还有，相信缘分，soulmate和alter ego这种事，真的存在，遇见了，你就会明白这种美好。`,voteCount:830},{author:"(匿名)",content:"虽然没有感同身受，但也要说出来，让人清楚你的想法，事情都憋在心理的话，别人会更加不理解你，有时候说了不一定有用，但不说一定没有用。",voteCount:445},{author:"(匿名)",content:`每当毕业就能理解这句话了，而且越大便体会的更加深刻。那些平时好的很的“狐朋狗友”，毕业后就同消失一般。
而“门当户对”的朋友，因为会有过相同的人生经历，所以互相理解，惺惺相惜`,voteCount:235},{author:"(匿名)",content:"第一条没坚持住搞砸了",voteCount:47},{author:"(匿名)",content:"22和28，看似有点矛盾，可以解释一下，怎么才能不冲突么",voteCount:18},{author:"(匿名)",content:"做自己。",voteCount:18},{author:"(匿名)",content:"哦哦，好的",voteCount:4}]},{id:"1603986561",question:"你有哪些提升自我的好习惯？",author:"北陌大叔",voteUp:63185,excerpt:"1、 不断看片。B站、新闻、纪录片，各种优秀的片子都可以大量看，提升自我的第一步，就是扩宽你的知识来源，先输入，再输出。2、 不求早睡早起，起码要充足睡眠。正常人每天至少要有6小时的睡眠，养足了精神，才有精力做事。3、 每天留出一小时娱乐。生活的本质是做让自己开心的事，如果放松都没有，可能东西没学到，人就累死了。4、 凡事提早。提早出门、提早准备、提早起床…才不会老出意外，比如迟到。5、 定期打扫清洁。保…",content:`1、不断看片。B站、新闻、纪录片，各种优秀的片子都可以大量看，提升自我的第一步，就是扩宽你的知识来源，先输入，再输出。
2、不求早睡早起，起码要充足睡眠。正常人每天至少要有6小时的睡眠，养足了精神，才有精力做事。
3、每天留出一小时娱乐。生活的本质是做让自己开心的事，如果放松都没有，可能东西没学到，人就累死了。
4、凡事提早。提早出门、提早准备、提早起床……才不会老出意外，比如迟到。
5、定期打扫清洁。保持环境舒适，不说别的，整洁干净的卧室看起来心情都会变好不少。
6、养成收藏点赞的习惯。特别是在知乎看到喜欢的好回答双击屏幕，能防止宝藏丢失。
7、周末多出去走走。哪怕公园、小巷、田野……都好过在家待着，你可以试着踏出一次试试。
8、每天抽出一小时运动。生命的本源是运动，床上躺着人会越变越废，亲身体验。（大叔每天50个俯卧撑少不了哈哈~）
9、不拖，有马上行动的爽快。想到就去做，不会像杰伦发专辑一样，能鸽就鸽，嘻嘻。
10、学会专注。上班摸鱼、游戏、抖音，现在能专注的人不多了，如果你拥有专注的能力，就能超越90%的人。
11、遇到事情，先思考为什么，再来谈怎么做。这是“实事求是”的好习惯，大大减少做事出错的概率。
12、不要随便透露100％的自己。也许平时很聊得来，看似他都为你着想，等你真正被背叛的时候，后悔都来不及。
13、多读书，读好书。各种类型的书都可以多读，但不是读一天就有效，它需要长期的积累，才能潜移默化的成长。
我从大学开始，就开始不断读好书，现在也积累了一个私人书库，认知和思维都得到了质的变化。如果你也想通过读书提升自己，又不知道看啥书，可以关注我的公众号［北陌大叔］，我把这几年来自己积累的200本超级好书分享给你，省去你找好书的时间。
14、睡前复盘。不用拿上笔那么麻烦，睡前闭上眼睛，回想今天发生的事，收获了什么就足够了。（顺便敷个蒸汽眼罩也不错~）
15、养成随时控制音量的习惯。说话声可时大时小，能根据场合调整音量，你的人缘会更好。
16、培养恋爱的敏锐力。可以没有女朋友，但一定要有撩妹的技术。（这条值得你一个赞）
17、早上起来制定计划。一年之计在于春，一日之计在于晨，计划好了别落下。
18、出门摸摸口袋，检查手机、钥匙…… 最好随身带包纸，以免在外面发生尴尬，也能增加你的异性魅力。
19、不要插手与你无关的事。你永远不知道什么时候会犯错，做的越多，出错概率越大。
20、定期理财规划。控制好自己的收入和支出，合理分配金钱，一段时间后你会发现能存很多钱。
21、保持帅气和美丽。不管男生女生，首先可以提升的习惯是打理自己，定期理发，买几套好看喜欢的衣服，马上你就会有改变。
22、不定时吹牛逼。这是好习惯，那些牛逼都不敢吹的人，首先就失去了自信。自信的第一步，就是要敢信自己。
真正厉害的人，不是低调不吹牛逼，而是把吹过的牛逼一个个实现！！！
23、养成打不死，不认输的骨气。跌倒爬起的人即使再次跌倒，也会受到尊敬。
24、整理有计划。把自己安排的妥妥帖帖，也是一种牛逼的做事习惯。
25、任何好习惯，都需要绝对的行动力。看完觉得大叔说的有道理，就马上行动起来吧，加油！
整整25条，希望能对你的习惯养成有所帮助，喜欢的朋友别忘了送个赞和喜欢哦，谢谢~
我是 @北陌大叔 ，一个不服输、不妥协、不幻想的精进少年，愿意在知乎与你分享知识和快乐。
如果你喜欢我的文字，真诚希望你能点个赞，为自己的生活，狠狠打上一口气，加油！！！`,grade:"SS",commentCount:3584,comments:[{author:"(匿名)",content:"每天坚持一千五百个跳绳 虽然不多 但是不管夜班还是白班每天都在跳 已经坚持了快半年了 变化很大 生命真的在于运动",voteCount:481},{author:"(匿名)",content:"把吹过的牛逼一条条实现。",voteCount:332},{author:"(匿名)",content:"我每天坚持500个俯卧撑，虽然不多，现在两只手直接废了",voteCount:172},{author:"(匿名)",content:"原来我也是很厉害的人呀，哈哈哈",voteCount:161},{author:"(匿名)",content:"冲着16条点赞爱心！！！",voteCount:118},{author:"(匿名)",content:"点赞关注是因为你的名字我喜欢",voteCount:100},{author:"(匿名)",content:"第一句话直接就让我笑喷了，拜托刚才在办公室，那气氛紧张的大家眼神互杀呼吸都是错，让我直接没憋住喷了，这会吓得跑卫生间了[飙泪笑]",voteCount:96},{author:"(匿名)",content:"学以致用",voteCount:85},{author:"(匿名)",content:"加油[赞]",voteCount:5},{author:"(匿名)",content:"看到第一条的时候 我..嘿嘿嘿 哦 原来是b站啊 那没事了",voteCount:0}]},{id:"570941536",question:"有哪些让人欲罢不能的学习方法？",author:"落崖惊风",voteUp:61560,excerpt:"本人985金融本硕，上大学时每次期末考成绩都名列前茅，奖学金从未中断，大四顺利保研，也来分享一下自己的学习方法。 首先是时间安排方面，一开始我有两个误区： 误区1：逼自己早起学习。看到有同学7点多就起床出门去学习，我非常焦虑，也想和他们一样。因此有一个学期，我每天早上6点40就起床，7点15到学校的湖边读英语，结果整个上午的课程都昏昏欲睡，那个学期的考试成绩也相对较差（不过英语考了全年级第一哈哈）。期末复习…",content:`本人985金融本硕，上大学时每次期末考成绩都名列前茅，奖学金从未中断，大四顺利保研，也来分享一下自己的学习方法。
首先是时间安排方面，一开始我有两个误区：
误区1：逼自己早起学习。看到有同学7点多就起床出门去学习，我非常焦虑，也想和他们一样。因此有一个学期，我每天早上6点40就起床，7点15到学校的湖边读英语，结果整个上午的课程都昏昏欲睡，那个学期的考试成绩也相对较差（不过英语考了全年级第一哈哈）。期末复习阶段，也曾尝试7点多起床，8点半就开始学习，但发现真的很困，11点多一点就撑不住去吃饭了，效率也不高。这才意识到：复习不一定要早睡早起，找到自己状态最好的时间段去学习才是最高效的。
误区二：出门晚了就干脆不去自习室。很多次午睡起来已经4点多了，内心非常愧疚，想着这么晚了出去自习也没什么用，就干脆待在宿舍，结果破罐破摔，没忍住一直看剧，一晚上就废了，愧疚感更深。因此，今后我无论多晚醒来，只要能迈出宿舍去自习室，必有收获。
在这种过程持续一段时间后，我探索出了最适合自己的作息和复习时间，在最紧张的期末考前复习期间，既能保证复习质量，拥有让自己不挣扎的作息，每天还能至少看3集电视剧（在我读大学时智能手机的功能还没那么强大，每天的娱乐活动还是以看剧为主）。调整后期末的复习时间表如下：
9点-9点半左右起床，到饭堂打包一个面包和酸奶，到自习室10点左右（其实我比较喜欢图书馆的复习环境，但起得太晚已经占不到位置）。
10：00-12：30 吃饱喝足，专注复习2.5h。充足睡眠后复习状态特别好，由于早餐吃得比较晚，所以可以稍晚一些去吃中饭。
12：30-13：00 饭堂吃午餐
13：10 回到宿舍
13：15-14：00 看一集电视剧
14：00-16：00 午睡2h
16：30 到达自习室
16：30-18：30 下午复习时间，2h
18：30-19：00 饭堂吃晚饭
19：00-19：30 回到自习室玩会手机
19：30-22：00 复习2.5h
22：15 回到宿舍
22：30-00：00 看两集电视剧
00：00-00：30 洗洗睡（上大学时不怎么护肤，洗澡很神速，以上还包括洗衣服的时间）
通过上述的调整，我每天的专注复习时间累计7h，对于期末复习，这样的工作量已经足够了。而且幸福感很高，不用挣扎着早起，每天上午就期待着复习完中午可以看剧。晚上10点从自习室出来，走在回去的路上，感觉非常充实开心，还会去超市买点零食，晚上边看剧边吃。不得不说，劳动后的享受最安心，只有每天学习了这么长时间，我才觉得我配去娱乐玩耍。
第二点，想说说复习节奏的问题。我有一个诀窍就是书看三遍。
期末复习，我通常会把书看三遍及以上，我不喜欢题海战术，从高中到研究生以及现在工作后考证，都习惯研读教材，“以本为本，以纲为纲”，无招胜有招。
第一遍：通读全书。在书上写写划划，不作笔记，遇到不明白的地方不去深究，先留个记号。
第二遍：细看，且边看边做笔记。看第二遍时会惊奇的发现，很多看第一遍时看不懂或难以理解的地方，第二遍自然就懂了，这就是潜移默化吧。做笔记的原则是自己完全能够理解、出题保证不会错的地方不用摘录，只摘录那些自己认为的考点、重要知识点和需要记忆的（这个我相信大部分经历过高考的人都能判断出来）。摘录方式尽量简洁，不能和书本一样啰嗦。我通常用一支黑色水笔和一支红笔摘录即可，红笔标注重要知识点和需要注意的地方。
第三遍：只看笔记。在第二遍的时候，一本厚的金融学专业书，我通常浓缩成十几页笔记（A4纸大小的薄的笔记本，双面），且保证知识点无遗漏。看第三遍笔记通常只需要两三个小时，有时间还可以看第4遍第5遍第 n遍，会发现速度会越来越快，考前过一遍笔记只需半小时左右。通过上述方法，我每门专业课的成绩都在90分以上。
最近在复习CFA二级，还是保留了记笔记的习惯，字很丑，不过自己看得懂就行 

第三点，说说复习质量的衡量标准问题。
1.以复习的进度来衡量一天的学习情况，而不是以复习的时间。
我每天复习开始都会定一个进度的目标，以保证在整个有限的时间内能看完3遍。提早看完了可以选择提早离开自习室，如果没完成进度，就算在自习室待到10点也要进行反思，第二天加大任务量。有时我们会有种自己很努力的错觉，认为一整天待在自习室就是完成了任务，其实这只是一种我很努力的错觉，真正还是要以绩效来衡量。
2.考前有一个期望得分，并评估自己的复习水准能考几分。
我的目标就是每门金融的专业课90分以上，绩点和89分有质的区别，且基本可以保证能拿到奖学金。一般在我考试的前一晚，我一定会把所有知识点都从头到尾过一遍，最后达到一种效果就可以离开自习室：如果这都考不到90分，那就是老师对不起我。到了这个程度，其实最后的结果已经不重要了，但通过这种方式复习，我最终每门专业课也确实考了90分以上。
结语：以上就是我的经验总结，主要针对期末复习，如果是比较难考的证就另当别论了。我觉得我的方法比较适合像我一样的普通人，真正的学霸牛人是完全不用如此费尽心机的，哈哈。欢迎大家一起讨论有效的学习方法。`,grade:"SS",commentCount:2047,comments:[{author:"(匿名)",content:"午睡两个小时 幸福感可以说很高了[飙泪笑][飙泪笑][飙泪笑]",voteCount:5732},{author:"(匿名)",content:"读书3遍，其意自现。",voteCount:2657},{author:"(匿名)",content:"医学生表示打扰了",voteCount:2536},{author:"(匿名)",content:"是呀[害羞]对自己太好了，不给自己找罪受☺",voteCount:950},{author:"(匿名)",content:"高考比大学的期末考试要求高太多[捂脸]后期如果只看笔记，知识掌握的深度可能不够，也需要大量做题，建议还是按你们老师的方法来吧[捂嘴]",voteCount:742},{author:"(匿名)",content:"确实每遍看后感觉都不一样的[大笑]谁看谁知道[机智]",voteCount:518},{author:"(匿名)",content:"同 一天7.5h根本满足不了内外妇儿生理生化的需求",voteCount:462},{author:"(匿名)",content:"过来人告诉你最好别，趁能拼的时候拼一点，大学期末才是能稍微比高考放松的时候。",voteCount:312},{author:"(匿名)",content:"好酷的学习方法",voteCount:251},{author:"(匿名)",content:"高中的历史我就是这样做的，不用怎么背，就看书，分数挺高的",voteCount:159}]},{id:"34723592",question:"有哪些生活小习惯，慢慢地可以改变一个人的性格或者生活？",author:"warfalcon",voteUp:51779,excerpt:"2014年12月29日更新第三部分时，发现超出字数限制了，文章最后面的100天行动读者反馈 下面的链接已经被顶没了，还有好多习惯要继续写，下一次更新我写在到微信和Blog上，然后在这里加上链接： 对这方面有些研究，分享一些改变性格和人生的习惯，会慢慢更新一段时间，这会是一个很长的文章，请大家有些耐心。 我花了好几年时间在研究习惯，同时在微信(read01)上发起100天行动，通过100天来培养一个好习惯，到现在（20141207）为止…",content:`2014年12月29日更新第三部分时，发现超出字数限制了，文章最后面的100天行动读者反馈
下面的链接已经被顶没了，还有好多习惯要继续写，下一次更新我写在到微信和Blog上，然后在这里加上链接：

对这方面有些研究，分享一些改变性格和人生的习惯，会慢慢更新一段时间，这会是一个很长的文章，请大家有些耐心。
我花了好几年时间在研究习惯，同时在微信(read01)上发起100天行动，通过100天来培养一个好习惯，到现在（20141207）为止进行了1年半左右，有数万人参与，在各种不同途径收到几千人的反馈和总结，从大家的反馈过程中发现了很多有意思的现象，同时现在也在做一些习惯养成方面的培训，对这个问题有很多心得可以跟大家分享。
先从只要你坚持就一定能改变你的性格或者生活的习惯来说：
1、记录自己的时间花销
这个习惯能让你明白一件事情，你的时间哪去了？
培养这个习惯花了好几年时间，这个习惯是时间管理中一入门就要做的，刚开始时可以按小时来记录，当时你记录一段时间之后，才能真正认识到自己的时间到底哪去了，真实的反应出自己把时间都花在哪了。
人会有一种错觉，觉得自己如何努力，表现还行，当你开始记录和统计自己的时间花销之后，才会真正认识到一天中真正花在有意义事情的时间少得可怜，一不小心就会浪费很多时间。
不管你是谁，有什么梦想，只要你看看你的时间花在哪了，就知道你是什么样的人，时间是没办法做假的。
这个习惯的进阶技巧就是柳比歇夫的时间管理统计法，可以精确记录一天每分钟的时间花销。
《奇特的一生》时间统计法

时间统计法让你超越自己

善用科技--通过软件来提升你的效率

在电脑记录你的时间花销
使用RescueTime或Hronos 来记录和追踪一下你在电脑上的时间花销。
两个软件不同之处在于，Hronos是只运行在本机的软件，而RescueTime是本机软件和网络统计服务相结合的软件
1、Hronos 能跟踪你花在每个程序上的时间，并且以使用百分比的形式提供完整的统计数据。这个绿色软件不需要安装，运行后它就会静静的呆在系统托盘区“监视”你，不需要你的干预。缺点是数据无法保存或导出，只能截图
2、RescueTime如何使用 
首先需要在RescueTime网站上注册一个帐号，然后下载RescueTime软件并安装。启动软件以后出现的是配置对话框，需要输入刚才注册的帐户信息才能开始使用： 
输入完毕按下“Verify”登录，编辑框下方会显示“login success”登录成功。保存设置后就可以开始使用了。 

它会常驻内存，在后台记录每个软件的使用时间。默认每隔30分钟将记录到的数据上传一次（你可以在设置对话框的“Advance”页面中设置上传时间间隔）。 
你必须登录RescueTime网站才能看到统计数据。访问 RescueTime : Log in to RescueTime ，就能看到统计图表了，它的图表非常的漂亮。
目前已知的习惯中，这个习惯养成的难度是最高，需要几年的时间，最终目标是象柳比歇夫不看表就可以精确的感知时间。
好消息是随着科技的发展，可以通过手环、手机和PC上的APP来半自动的记录和统计时间花销，期待有一天能做到全自动的记录和统计。
把评论中的回复补充一下：
这么说记录时间花销本身只是一个中性行动，不能激励你也不会产生焦虑和恐慌，只会让你有个清醒直观的认识，而你本身的态度会让你产生正面或负面的想法。对自己的要求别过高，别想一开始就追求完美，每天优先完成三件要事和一个梦想番茄（每天在梦想、年度目标上花费30分钟），记录下来，就可以了。
从个人的感觉和别人的反馈来说，只有准确的数据才能反应真实的情况。自己的感觉在任何的时段都不可靠。 
你可能没办法准确的统计和记录自己的产出，时间本身也是有不同质量的，并不是你花在学习上就一定有收获，同时产出本来也是比较模糊？我不知道你如何定义。
学习上，有明确收益的叫产出? 陪家人，跟朋友吃饭，是产出吗？ 有很多的时间花销，不积累到一定程度之后，可能看不到明确而直接的收益。比如睡眠，如果你一年时间的睡眠记录，进行分享和统计，你能发生很多有意思的数据，你觉得睡眠是产出吗？
再说记录，确保自己尽量少买不需要的东西，跟了解自己几年的花销比例是两回事，记帐跟买东西多少并没有直接的联系，但可以从总体的角度来了解自己的花费比例，哪怕你就是什么东西都不乱买，但还有会一些固定的花销，不可避免，而且这些花费会随着时间而变化，比如饮食，自己吃和在外面吃，记录几年后，你会发现你的饮食习惯就会跟经济、物价也能产生联系。还有交通费用、着装费用、人情来往，会随着收入、环境而有不同的变化，当你有一个很长的时间段数据，这些数据都会反应出真实的生活。
2、记帐
对于你的时间哪去了和你的钱哪去了，绝大多数人都只能说出一个大概，当你开始记录和统计之后，就会发现很多你不在意的事情上，会花了远远超出你想象的比例。
从自己身上找个例子：记帐一段时间之后，做统计之后，发现在不到3个月左右在饮料上竟然花了1000多了，平均每天在饮料上花了10元左右，以前只是有个大概有感觉，在饮料上花钱有些多，对具体的数量和费用没感觉。统计之后，发现自己的饮料上花费过多，费钱而且对健康不利，开始有意识的少喝饮料，多喝白水，花了几个月时间，最终把碳酸饮料完全戒掉，一点瘾也没有，现在偶尔也会喝零度可乐，但已经对饮料处于完全可控的情况。
很多理财课程的第一步就是记帐，当你明白你的钱具体花费在哪些，哪些应该花，哪些不应该，就开始了财务自由的第一步。
建议通过手机上的APP来随时记录自己的各项花销：
重量级：挖财、随手记、支付宝帐单（所有的线上消费基本可以在这里汇总）

轻量级：DailyCost、Monny、Timi时光记账

3、每天运动或定期运动
这是每个人从小听到大的建议，但只是极少数的人能真正做到，一旦当你养成这个习惯之后，你会发现这些习惯会影响你的整个生活，让你的世界完全不一样。 
有运动习惯的人，整个人的精气神都会不一样，更不说当你身材比例合适的时候，穿什么衣服都好看。在这个习惯培养过程中，你会发现必须要改变你的生活方式才行，比如睡眠、饮食都需要同样需要注意和改变。而且运动会上瘾，并且能帮助你改变很多坏的生活习惯，已经看到不止一个人在培养慢跑和健身习惯过程把烟戒掉。
这个习惯对性格、注意力、意志力、精神、拖延、忧郁上的改变能在很短的时间（2-3个）月就能看到效果，当养成成固定的运动习惯之后，每一次运动都在增加你的自信心、锻炼注意力和意志力，别小瞧这一点，会让你跟其它人立刻区别开来。
在知乎上写过一个回答，分享了一些自己的改变：
体质极差的人如何从头开始恢复身体素质？（2）
运动并不是必须要要去健身房或出去慢跑才行，只要你真的想做，随时随地都可以做，推荐过一些APP、视频和最简单的方法可以帮助你从入门开始：
《拉伸：最好的运动》适合在办公室里做的5个动作

运动App推荐

让我们每天做10分钟运动吧！

晚饭后进行15分钟步行有助减肥

想减肥吗?从每天多走2000步开始

腹部运动女生版

微信上还有大量的文章，有兴趣的可以关注之后，输入不同的关键字来查看。
4、定期总结
无论再怎么强调这个习惯的重要性都不为过，当你培养定期总结的习惯，能让你避免很多麻烦，可以参加以前在这个问题的答案：
哪些你熟知的重要知识或方法，外人却常常因不了解而陷入困境？ - warfalcon 的回答
如果你从刚开始工作时就刻意的去记录自己所遇到的事情，包括正常工作、学到的经验，遇到的问题，每周或每月花了1、2天时间去分析自己的记录，不断的总结、分析和思考，你工作的一年时间可能比别人三年经验还要强，这个方法在目前我看到的所有行业和岗位中都适用。 完全可以通过定期总结来提升生活的质量和延长生命的长度
定期总结这个习惯长期效果很好，但培养时间要几个月，看到效果也要几个月或几年。
100天行动之自我总结

我应该选择怎样的输出方式来启迪思维和总结自身？ - warfalcon 的回答

5、每隔几年学习一门新的技能
在看德鲁克《个人的管理》看到一段内容，反复读了好多遍，正在身体力行：
每过三四年，他就选择一个新的学科。例如，统计、中世纪史、日本艺术或经济学。要精通一门学科，3年时间的学习是绝对不够的。不过，要了解一门学科，3年的时间就足够了。 60多年来，德鲁克坚持一次选修一门学科。“这种学习习惯不仅为我打下坚实的知识基础，而且迫使我接触新学科、新学说和新方法，因为我学的每一门学科都有不同的假说，并且采用不同的方法论。因为时间关系，执行这个计划的时间还太短，从去年开始把精力放到慢跑和运动上，只用了三个月时间，体重就减掉了20多斤，现在一年过去了，这个习惯给我带来的收益大到无法想象。我期待再过一年左右，开始下一个学科的学习。
虽然今年30年多了，但才感觉到生命刚刚开始，有些非常多的知识可以选择和学习，我有足够的耐心和动力，去把这个习惯坚持下去，期待把这个习惯坚持到死为止。
6、静坐或冥想
静坐、冥想或、打座禅修都可以，这东西一深入，就能细分成很多种。这是极少数传统和科学都推荐的运动方式之一，有大量的科学研究、试验和论文都讨论这方面的优点。
随意找几项：
1、有研究表明普通人跟禅修大师（1万小时以上禅修）在听起一些负面声音时（女人尖叫），禅修大师大脑中与情绪有关的杏仁体部分，显示出更少的激活反应。进行禅修越长的人，杏仁体的激活支应也就越少。杏仁体能直接影响你的情绪，反应越好，也是越冷静。
2、而另一个研究表现，冥想之后会提高大脑左前额叶皮质的活跃度，降低右侧的额叶皮质的活跃度。左前额活跃度高让你呈现更多的正面情绪。而右侧的额叶皮质的活跃度提高之后，会让人表现出负面情绪。
3、在威斯康星大学的一项初步研究中，研究人员发现：一位有经验的冥想者仅仅在15分钟的冥想之后，他血液中的干细胞数量就有了明显的上升。需要说明的是，这个测试只是一群好奇的科学家进行的一次随意调查，但是实验结果确实让人大吃一惊。在采访过程中，托瑞斯·泰勒几乎无法隐藏她的兴奋，称这一现象为“我见过的（干细胞数目的）最大的增长。”这一结果可能有助于解释冥想对于人类健康的巨大影响，定期进行冥想的人可能会：
● 患中风的几率降低33%；
● 患癌症的几率降低50%；
● 患心脏病的几率降低20
看过一些这方面的书籍，去除一些夸张的部分，个人认为最终冥想或静坐能让你更冷静，释放压力，掌控情绪，提高注意力，改善睡眠质量，提高情商。用更专业的说法就是：神经可塑性，可以有目的的改变自己的大脑。
冥想、静坐并不能立刻看到效果，在初期你需要花很多精力维持对于外在事物的关注—这种精力消耗非常大，会让我们感觉特别疲惫。
任何人都可以闭上眼睛，花一个小时或者更长的时间进行思考，但这并不是冥想；冥想的质量远比冥想的时间和数量要重要得多。初期几分钟就足够了。
每天坚持5、10分钟，看到效果要100天左右。收到过几十位，坚持静坐、冥想的反馈，坚持100天之后，改变的情况都非常的明显。
《硅谷最受欢迎的情商课》

《贪婪的大脑》冥想的作用

增加注意力小技巧----观察自己的呼吸

7、练字
每天花上时间平心静气的写上几篇字，坚持2、3个月之后，效果跟冥想、静坐类似。最初的收获是通过写字能静心，减少焦虑。
当你坚持1、2年之后，字会慢慢变得好看，能让你多一点自信。
坚持这个习惯的人不多，因为想看到效果通常要几个月时间或1、2年时间，但目前坚持越过半年之后的反馈都比较正面，很高兴这些人找到适合自己的方法。
如果觉得用毛笔练写麻烦写钢笔字，练正楷字，可以从每天2-3页开始，最好要用有格子的纸来写。 
培养习惯的具体方法，知乎上已经有很好的回答
练字的诀窍有哪些？ - 书法

如何系统地练字？ - 硬笔书法

8、早起
培养这个习惯是2011年的时候，这是当年的早起总结：
早起早睡100天总结（1）

早起早睡100天总结（2）

早起早睡100天总结（3）

早起早睡总结（4）
早起不懒床的方法
第二年又做了一下总结：
个人总结：有效的利用清晨时间
早起这个习惯也是参加人数多最的习惯之一，但最终成功并享受到好处的人不多，看到最励志一个反馈是一个读者，通过早起1小时来跑步，3、4个月左右减了20斤。
别只停留在早起，要把早起多出来的大块时间好好利用起来，早起才会对你产生影响和改变。
早起的前提是早睡，一定在每天保证7、8个小时充足睡眠的基础上再早起，睡眠比早起重要，别忽视这点。
9、送礼物
不知道有多少人过生日的时候，唯一记得的人只是银行短信，如果这时候你收到一份别人的礼物，你会有什么反映？ 
当你能把亲人、好朋友、身边的同事、客户，这些人的生日都记录下来，然后手写一个贺卡放在上面，在合适的时间送过去，能大幅改变别人跟你的关系。
知道别人的生日除了特意去问，平时多注意一些，很容易就收集到，比如订飞机、火车票之类的，顺便记录一下这个人的兴趣爱好，没事逛淘宝或购物时，遇到合适的东西就提前买下来，包装好。
在购宝上能买到各种好看、特殊的贺卡，手写一些祝福的话，跟礼物包装在在一起。方便的话，当面送或者发快递，这样不管在哪里都能收到这个快递。
我习惯每年年底前做下一年的礼物日历，把日历上标记所有需要赠送的日期。
完成你的2014年礼物日历

这种方法杀伤巨大，别瞎用，关系一般可以不送，对给异性，非常容易误会。但如果你送给客户，客户会对你印象深刻。
给同事和朋友，都能加深关系，顺便找个电话发个微信什么的。
正常人都会有来有往，你送他礼物，对方也会找时间请吃饭，几次之后，关系会加强不少。
家人就不用说了，这是应该做的。特别是好朋友，哪怕不在一个地方，一年发个快递送过去，关系也能一直保持着。如果在国外，可以在各国的亚马逊买礼物，网站就提供包装服务。
10、每年订一个有挑战的习惯挑战自己
这几年我每年设立几个必须完成的年度目标，然后花上100天时间去全力挑战一下。已经坚持四、年了，有成功的，有失败，每一个习惯的坚持都对自己有改变和影响。

分享几个效果比较明显的年度目标：

（1）写Blog：我写了两个Blog ，下面是其中一个Blog的更新记录，2011年时2个Blog一共更新了303篇。
2009 (110)

2008 (196)

2007 (219)

（2）阅读：现在每天阅读1-2小时，保持好几年了。在2011年时挑战过每天一本书，坚持了378天，看了428本书，写了378本书的笔记和书评。
（3）早起：20`,grade:"SS",commentCount:765,comments:[{author:"(匿名)",content:"感谢细致的整理",voteCount:250},{author:"(匿名)",content:"每个答案都是满满的干货！大赞",voteCount:130},{author:"(匿名)",content:"战隼老师我爱你！记账现在已经成为习惯了，每天都会记，基本上不会忘了。接下来开始培养运动这个习惯！",voteCount:48},{author:"(匿名)",content:"老师的答案被收藏数远高于赞同数啊，而且被分享数刚好是今年的年份:2014，哈哈，好神奇~最后，感谢~",voteCount:48},{author:"(匿名)",content:"记账软件是什么？",voteCount:28},{author:"(匿名)",content:"大东北 大冬天不去健身房很难做到慢跑和运动怎么办……",voteCount:14},{author:"(匿名)",content:"好东西啊。。。",voteCount:12},{author:"(匿名)",content:"超级喜欢答主，很负责任的干货！！",voteCount:6},{author:"(匿名)",content:"坐等",voteCount:5},{author:"(匿名)",content:"半个小时前刚好开始跑十三周计划~！",voteCount:5}]},{id:"223468870",question:"经常看书的人和不看书的人有什么区别？",author:"徐三石",voteUp:50885,excerpt:"讲故事的人太多，我讲点实在的吧。 1、经常看书的人谈资更多这点很明显，因为书读多了，知道的事自然也变多了。比如我之前对台湾很不了解，后来读了一本台湾的70后写的书，通过他的文字，了解了台湾不少有意思的事。 我记得书里有一处写到97年竞选台北市长时，陈水扁为了筹集选举经费，搞了一次义卖，义卖的东西是一顶墨绿色的毛线帽。结果这顶原谅色帽子竟然成为了当年的流行单品，被全台湾的年轻人哄抢了… 2、经常看书的人…",content:`讲故事的人太多，我讲点实在的吧。
1、经常看书的人谈资更多
这点很明显，因为书读多了，知道的事自然也变多了。比如我之前对台湾很不了解，后来读了一本台湾的70后写的书，通过他的文字，了解了台湾不少有意思的事。
我记得书里有一处写到97年竞选台北市长时，陈水扁为了筹集选举经费，搞了一次义卖，义卖的东西是一顶墨绿色的毛线帽。结果这顶原谅色帽子竟然成为了当年的流行单品，被全台湾的年轻人哄抢了……
2、经常看书的人更了解现象背后的道理和原理
有些看似很普通的事，背后其实是有经济学、心理学等原理在的。读过相关书籍的人，就会因为知道这些原理，而看到事情的本质。
比如说KFC把一个汉堡定价16块，包含这个汉堡在内的套餐定价为20块，这时你就不大可能会去选择汉堡，而是会选择套餐。你会觉得没错啊，因为套餐便宜啊，所以我当然选套餐。其实这背后就有一个叫“锚点效应”的原理在。
汉堡的16块定价就是锚点，你一看到它，就把它作为参照点了，而以它作为参照点，套餐20块当然很便宜。也就是说，人家给汉堡定价16块，就是为了让你买套餐的。
你要是找中介买房子，假如你看好一套房，中介八成会主动给你找同小区的其他几套房，并且会先带你去看那些在你看来不咋地的房子。为什么这么做呢？就是为了让一个性价比较差的房子作为锚点，这样你再去看自己想买的房子，一定觉得自己的眼光和选择特别好。一高兴，这笔交易就成了。
这种原理还有很多，比如推销下我的一个4千赞答案：什么是知识的诅咒？
3、经常看书的人更敏感，也更富有同理心
经常看书，尤其经常看文学书的人，心思会比较细腻，对身边发生的事会比较敏感。他们更容易去为别人着想，这是因为他们在文学作品中见识到了太多的灵魂。
不管是葛朗台这样的吝啬鬼，还是堂吉诃德这种别人眼中的疯子，读书多的人都见识过，他们看过大师笔下的故事与人物，因此对人性的理解更深刻，在生活中也就更富有同理心。
4、经常看书的人能够包容不同声音
这一点是上一点的延伸，读书越多，人其实是越宽容的，而读书少的人，在观念上则容易表现为保守与专制。
比如我们读到一篇文章，文章作者的观点和我们自身的观点不一样，读书多的人会去想他为什么会有这样的观点，他的观点对不对，有没有可以吸收的地方。
而基本不读书的人，很难去接受与自己不一样的观点。
知乎的评论中不是经常出现“三观正”这种评价嘛，可是现实中，很多人并不是站在客观角度来评价其他人的三观的，他们通常有一个简单粗暴的评判标准：和我的三观一样，你就叫三观正，和我不一样的，就叫三观不正。
读书越多的人，越清楚自己的贫瘠，而基本不读书的人，反而容易认为自己的灵魂是丰盛的。
5、经常看书的人重逻辑，不容易被情绪带偏
现在的热点事件太多了，应接不暇的，吃瓜群众很容易被情绪给带偏。
以最近的郭敬明事件为例，当李枫的那篇文章出来后，网民几乎一边倒地站边李枫，讨伐郭敬明。
有人说，这件事只可能是真的，因为如果是假的，那么李枫一定会身败名裂。
这个逻辑是这样的：如果一个人赌上了自己的前途和声誉去证明一件事，那么一定可以说明这件事是真实发生的。
可是，这个逻辑真的百分百正确吗？不一定，因为人类不是一个百分百理性的动物。
事实上，即便这件事有99%的可能性是真的，但是目前来看，这也只是一面之词。我本人也不喜欢郭敬明，但我只看证据，不看情绪。
李枫想扳倒郭敬明，还是抓紧拿出点证据来吧。
6、经常看书的人好奇心与求知欲更强
一个人经常看书，除了专业或职业上的原因，就是因为爱看书。为什么爱看书？因为书中的世界实在是太精彩，太缤纷了。
爱看书的人，不管多大，都还抱有孩童时期那种旺盛的好奇心，我们对世界有很多不了解，所以我们想去知道。
我原先是只看文学和哲学的，后来又去读了天文学方面的书，因为我对宇宙太感兴趣了。再后来我又去读心理学，读经济学，读历史，越读越发现自己太浅薄了。
人一生的时间是有限的，而面临的问题却是无限的，我并非要去解决这些问题，我只是想知道一些事的真相是什么。当你从书中了解了一件不曾了解的事，懂得了一个不曾懂得的道理时，那种喜悦感是难以言表的。
7、经常看书的人会更客观地去思考一件事
说实话，一个人想要做到客观是很难的，我们都是主观而自私的，但是读书多的人会刻意让自己抽身出来，站在一个客观的角度去审视问题。
为什么要这么做？因为在带有强烈情绪，或与自身利益过分相关的时候，人就戴上了有色眼镜。读书越多，你就越有勇气，也越有自觉去摘掉这副眼镜，因为你知道它正在蒙蔽你的双眼。

我自己是一个每天都读书，每个月都买书的人。
最后说一句：一个没有输入的人，未来是很难持续输出的。

————————————————————————
2020.2.4更新，看到有要推荐书单的，正好最近在家有空，发几本上来，都是我以前在公众号文章里推荐过的：`,grade:"SS",commentCount:1539,comments:[{author:"(匿名)",content:"不猥琐发育，怎能超神翻盘。",voteCount:3611},{author:"(匿名)",content:"很赞成您的观点，看到每一条都想说：真是深得我心啊！只是我的语言表达能力不够好，无法和您一样表达得这么清晰😊",voteCount:2033},{author:"(匿名)",content:`看书一点都不高大上，很多人不看书也照样过一辈子，但这不代表看书无用。不是所有的知识，你靠日常生活就能理解的。
打个不恰当的类比，科学不是万能的，说吸烟有害健康是对的，但你也能找出吸烟的百岁老人这样的例子。但你不能因为有人抽烟但活得久，就否认吸烟有害健康，我们之所以传播这样一句话，是因为它可以大概率地避免你患病。
读书也一样，读书不能解决所有问题，但读书可以提升你解决问题的概率。没有人强迫别人去读书，这只是你自己的选择。`,voteCount:577},{author:"(匿名)",content:"你能够直接感受到他经常读书和他不读书，这就是最大的区别。",voteCount:446},{author:"(匿名)",content:"多读书的人会吹牛逼，天南地北啥都会，吹到你怀疑人生，so，博主这个不像是读书多的样子啊，不聊聊历史，聊聊财经，再吹吹代码，怎么能算装逼呢是不是",voteCount:300},{author:"(匿名)",content:"写作就是读书输出的一种方式，也是思考的一种检验。",voteCount:253},{author:"(匿名)",content:"你的话也是深得我心，毕竟我也是不会表达，但你其实已经表达了，还很好👍",voteCount:247},{author:"(匿名)",content:"首赞？？",voteCount:226},{author:"(匿名)",content:"读书越多，你就越有勇气，也越有自觉去摘掉这副眼镜，因为你知道强烈情绪正在蒙蔽你的双眼。蛰中大家的共鸣啊，一个人没有足够的积累，做到有同情心，同理心，他想的东西大部分都是比较主观的",voteCount:197},{author:"(匿名)",content:"哲学：《大问题》；经济学：萨缪尔森《经济学》；心理学：阿伦森《社会性动物》；营销：《定位》。外行读书，就先读这类经典的作品。",voteCount:163}]},{id:"2596104794",question:"我们穷极一生，究竟追寻的是什么？",author:"匿名用户",voteUp:46758,excerpt:"2018年秋，我大三。膝盖反复剧痛，门诊医生直接开了核磁。 取结果时问检查室医生有没有事，她没有回答只说让我找门诊医生看，路上拿出报告，写的是骨肿瘤，那刻是懵的。 门诊医生只看了报告，很简短地说，你这么年轻不能放过去，叫我立马请假，联系家长，住院检查。心里咯噔一下 住院医生看了片子说，和组内的医生会诊认为90％的概率是良性，良性只需要手术切除就好了，但最后良恶性质的确诊还要看病理，心想应该不会倒霉到那10…",content:`2018年秋，我大三。膝盖反复剧痛，门诊医生直接开了核磁。
取结果时问检查室医生有没有事，她没有回答只说让我找门诊医生看，路上拿出报告，写的是骨肿瘤，那刻是懵的。
门诊医生只看了报告，很简短地说，你这么年轻不能放过去，叫我立马请假，联系家长，住院检查。心里咯噔一下
住院医生看了片子说，和组内的医生会诊认为90％的概率是良性，良性只需要手术切除就好了，但最后良恶性质的确诊还要看病理，心想应该不会倒霉到那10％的概率，会有柳暗花明。
当时想着治疗完赶快出院回学校。后来才明白，概率具体到一个人身上只有0或1。
穿刺、核磁、ct、骨扫描都做了一遍。而穿刺的病理报告是最后出的，恶性小圆细胞肿瘤。
看到报告整个人蜷坐在哪里，脑子空白，走路脚下发软，妈妈泣不成声，心脏不好站不起来，爸爸知道消息打电话过来哭的撕心裂肺。瞬间觉得我应该表现的坚强一点，我只能安慰他们说先别急看看大夫怎么说吧，而第二天就是中秋节，焦急地等了三天。自己看了百度，心如死灰
癌症，当时只在影视剧里看过。
接着就开始着急的四处寻医(中医西医甚至玄学大师)，捉住任何稻草。走在去医院的路上，抬起头，路边的树叶在深秋还绿着，一下子恍惚，心想还能活多久呢？还能看到明年的树叶吗
认真听每个医生的治疗方案，期待从他们的只言片语中抓到希望。更期望有医生能告诉我，是误诊，这一切都是不真实的噩梦。但并没有，北京的医院给出了相同的病理诊断
那些天开始，我意识到，我的人生一切都变了。我的大三就暂停在这了，学校里的事突然变得与我无关，那些关于未来的憧憬也破灭了∶找个好工作挣钱，让家里人过上好日子，成家立业。从此便是另一种人生，还能活多久呢？我总是恐惧，我才21岁
漫长的治疗开始了，化疗，计划是18次化疗，一次手术。每天都很痛苦煎熬，不再去想未来的事，不敢想，怕是奢求。明年、或下个月的事，太远了，只想今天能够舒服一些，化疗反应小一点，可以不吐不晕，能吃一点东西，火锅什么的成了奢望的美食。
想今天能早一点输完液，能不要从早晨九点输液到晚上九点。不输液的日子也成了期盼
只想每一次检查结果好一点，白细胞红细胞血小板不那么低，能少打两针肌肉针。可以不用贫血到输血，输血小板，很贵。
手术那些天便想可以不持续发烧，不用输血。躺了一个多月，每天都期盼早点下床，能够走路，去外面呼吸吸鲜空气
只想凑够钱完成下一步的治疗。想快一点打完计划的十八次化疗。
打了无数的针，头发眉毛掉光，吐的翻江倒海，都能忍着，没办法，想活就只能忍着。但看到知乎，贴吧上病友治疗失败的帖子还是恐惧到哭了。
……那一年都没能回家，不是在住院就是在小旅店准备住院，过年也是在医院里。
那时的追求一下子就变得很低，只是活着，身体舒服一点的活着。这样的日子挨过了一年，家里人一直陪护，没有他们，我可能会彻底溃败，很多次感到自己是个拖累
一年后，化疗结束了。每三月复查，每次都心惊胆战，只祈祷有个好结果。住院时遇到的小病友有恶化甚至走了的，于是从来也不敢主动打听他们的消息。
两年后，复学了。继续大三，但这已经不是那个曾经的大三了，心心念念的复学，并不是想象那样。不再是以前的同学，室友。手术后的我也不能跑跳，打篮球跑步只是记忆中的事。
后来，毕业了。由于病史的关系，工作不好找，对象也不容易找，但慢慢的对于结婚买房不再在意，不奢求反而轻松。家里日子十分拮据，父母年纪越来越大，想要挣钱贴补家用也放弃了当初考研的计划
余华说，苦难不值得歌颂，磨练意志是因为无法躲避。
是的，只有经历过才知道多绝望。苦难也没把我磨练得更好，反而生活变得更糟糕
医生说，时间越长，复发的可能越小，治愈的可能越大，我走在这条路上。但是并没有万事大吉，活着就有烦恼，而现在甚至更多。可能因为活着就是如此，要面对自己，和家人的生病，老去。这是我现在最在意的。而且，就像我不是药神里说，世上只有一种病，就是穷病。没钱真的很难
一切都变了。我曾经追寻的是什么，都已远去。而现在可能就是一种普通人的生活。
在面对死亡时，反而那些每天发生在身上的、唾手可的事成为最想要的东西∶在教室里上课，去操场跑步打球，吃好吃的，身体不疼不痒，自由地呼吸外面的空气，散步晒太阳，甚至陪家人慢慢变老，体验生活的柴米油盐…

有人跟我说，病好了就好了，就出头了。不过当我一点点熬过来后发现，也并完全是这样。那些普通人的压力不会因为我大病一场历经生死而放我一马。
再走出来后，那些普通人的烦恼依旧存在，有时更多。因为依旧要在这个社会生存，活着就难免要继续扮演自己的角色，而我身体里的能量却虚弱了许多
听到这儿你也许有些失落，仿佛刚用尽全力跨过一座大山，发现前面还有一座又一座。问题不断
后来，我读到一句话∶世界上只有一种英雄主义，那就是认清生活的真相后依旧热爱生活。
我想生活的真相就是问题不断的吧，就是没有那么美好，甚至残酷，一帆风顺需要太多太多的运气。
最近非常喜欢苏轼的《定风波》，“一蓑烟雨任平生”“也无风雨也无晴”，也发现原来中学学习这首诗时并没有理解得很深，只知道有种豁达乐观的精神。看了他的纪录片，越来越发觉苏轼的可爱与其生活的智慧，我想他就有一种所谓的英雄主义吧
人生追求什么，我也不能回答这个问题，每个人都有其所求。世俗上的成功我比不上各位，但是希望通过我让大家发现，有时候纠结的烦恼，没那么紧要。
这个问题不一定有标准答案，就像能救赎自己的最后只有自己，别人的帮助只是助力。每个人活着都有自己的答案
记得确诊后姐姐帮我剃光头的画面，那时候我端着手机看《士兵突击》。
许三多有一段台词∶好好活就是有意义的事，有意义的事就是好好活。`,grade:"S",commentCount:2397,comments:[{author:"(匿名)",content:"活着就是最好的。经历了生死，其他的都是小事",voteCount:511},{author:"(匿名)",content:"有人活着就已是万幸，而我却为那么多没什么意义的事情烦恼，真是浪费这短短的人生啊",voteCount:455},{author:"(匿名)",content:"以前我抑郁的要死，论人生坎坷肯定不能和你相比，但我走出来了，想开了好多，我觉得活着能感受四季，感受鸟语花香，能四肢健全，精神心里正常就可以了，什么出人头地买房买车甚至结婚生孩子都无所谓了，活着就行，能感受生命就行。建议看看哲学书籍心灵成长之类的书。",voteCount:380},{author:"(匿名)",content:"祝福[拜托]，希望一切顺遂[拜托]",voteCount:297},{author:"(匿名)",content:"大难不死必有后福",voteCount:229},{author:"(匿名)",content:"加油哥们。活下来就不容易。",voteCount:227},{author:"(匿名)",content:"愿你渡过难关",voteCount:218},{author:"(匿名)",content:"能说什么呢？祝好吧！",voteCount:208},{author:"(匿名)",content:"好好活",voteCount:166},{author:"(匿名)",content:"祝老哥好运👍",voteCount:158}]},{id:"278409457",question:"如何长时间高效学习？",author:"小猫倩倩",voteUp:40466,excerpt:"本文约7.6k字，阅读全文预计花费17min。 我用3个月的时间，汇集13本书的精华，结合自己16年的学习经验，写成这篇文章。算是期末考试周到来前送给大家的礼物吧~相信不会让你失望哒～ 强烈建议先点赞+收藏再看！！！ 以前你可能已经看过很多讲学习方法的文章。什么“番茄工作法”啦，“清单学习法”、“任务表学习法”之类的，乍一看好像都挺有用，至于效果嘛…只能说因人而异。因为就算你知道了很多的方法，如果不知道这些方法…",content:`本文约7.6k字，阅读全文预计花费17min。我用3个月的时间，汇集13本书的精华，结合自己16年的学习经验，写成这篇文章。算是期末考试周到来前送给大家的礼物吧~相信不会让你失望哒～

强烈建议先点赞+收藏再看！！！

以前你可能已经看过很多讲学习方法的文章。什么“番茄工作法”啦，“清单学习法”、“任务表学习法”之类的，乍一看好像都挺有用，至于效果嘛……只能说因人而异。因为就算你知道了很多的方法，如果不知道这些方法的适用条件，还是没办法取得理想的效果。

这就是我写本文的缘由。

移动阅读最大的弊病就是碎片化，你看完一篇干货，觉得自己好像学到了不少知识，但是放下手机很快就不记得了。因为它仅仅是一粒沙子，和其他知识没有联结，看得再多，堆在一起也只是一盘散沙。为了解决这个问题，我花了3个月来写这篇文章。在这3个月的时间里，我写了十几篇文章作为铺垫，直到今天能把它们搭成一个知识体系。今天这篇文章会讲到很多学习方法，我会先阐述它们在学习的过程中起到了什么样的作用，然后再讲该怎样操作效果最好。

第一部分先介绍学习的系统模型，第二部分介绍学习前的准备工作，第三部分是一些具体可行的学习方法。

篇幅比较长，为了便于大家理解，这里贴上文章结构图和内容简介：
第一部分：方法比努力更重要——从系统思维看学习过程
系统思维就是认为事物之间都是有关联的，会相互影响、相互作用。学习是我们日常生活的一部分，会受情绪、身体健康、精神状态等很多因素的影响。我们首先要把自己调整到一个适合学习的状态，“高效学习法”才能起作用。

第二部分：学习的准备阶段
如果你刚刚和女朋友大吵一架，相信你很难平复心情专心学习；如果你没有办法静下心来，一坐在书桌前就情不自禁地拿起手机，再好的学习方法也不管用。所以，在开始学习之前我们要做两件事：先解决情绪的问题，并且快速进入专注的状态。

第三部分：学习过程
这一部分围绕学习系统的五个环节——预习、听课、记笔记、自习和回想展开，给出了每一部分的要点。比如，预习可以“不求甚解”，只要知道哪里不懂就行了；上课听讲的时候要留心预习时不会的内容；记笔记不是机械地抄写，而是先要辨别哪些是重要的内容；自习是学习过程中最重要的一个环节，有6种方法可以帮你加深记忆；回想的过程贯穿学习的全部，回想能够帮助我们记得更牢固、更久远。

由于本篇文章涵盖内容较多，为了更好地吸收这些知识，可以来我的公众号【小猫倩倩】看看，我会把学习时如何专注、考前如何高效复习、怎么样可以“背过就不忘”的秘诀全部告诉你。
知乎营销平台一、方法比努力更重要——从系统思维看学习过程
为什么老师讲课都认真听了而且做了笔记，考试成绩却不理想？为什么明明做了很多题，分数还是原地踏步？为什么考前复习的时候感觉啥都会，一上考场却频频出错？已经很努力了，每天很晚睡觉很早起床其他时间都在学习，成绩还是平平，难道真的因为我笨……

别急着给自己下论断。智商的差异的确存在，但是没我们想象的那么夸张。天赋异禀者毕竟少数，多的是靠努力取得优秀成绩的人。不过这里的“努力”并不是说晚睡早起刷很多题就能考高分了，更重要的是学习的策略。如果用公式来表达学习效果的话，可以写成：

学习效果=学习效率*学习时间

这是个很好理解的公式。好的策略可以帮助你少做甚至不做“无用功”：你背诵的每一分钟都有单词印在脑海里，解答每一道题都能掌握相关的一串知识点，和别人学习相同多的时间，你能学的更好。

如果把“学习”的过程看作一个系统，它包含着许多环节：预习、上课听讲、记笔记、自习、回想等等，而我们的精力——体能、情感、思维、意志则影响着其中每个环节的效果。
要是你刚刚和女朋友大吵一架，恐怕接下来好几节课都会心乱如麻；要是你生病了还坚持去上自习，平时能背100个单词的时间，恐怕此时只能记住50个词；要是你刚刚从球场上回来，这时候如果坐在书桌前开始学习，你八成还要先用几分钟回味一下刚刚自己潇洒的扣篮的英姿。

学习系统属于“增长极限模型”：你投入了一个“努力”的因素，比如说做很多题，一开始成绩是有提高的，但是很快就会进入瓶颈。你开始怀疑自己，是否因为自己不够努力才停滞不前，于是投入了更多的时间与精力，但结果收效甚微，甚至成绩开始下降。
“增长极限模型”的杠杆作用点在“负反馈”的环节。要想改变现状，就必须识别并改变负反馈限制因素的影响，比如说总是做重复的题人会心烦、不想学习；你要花很长时间来做这些题，可能会睡眠不足，从而导致记忆力衰退、内分泌失调；又因为成绩没有提高，你会感到很挫败，对自己没信心……

掌握了这种方法，你就不会沉溺于“埋头苦干”，而是同时会关注提高成绩的其他方面。
二、学习的准备阶段

1. 先解决情绪问题

在一切困扰学习的问题之中，先解决情绪的问题。如果你刚刚和基友闹矛盾，现在还要强迫自己背政治简答题的话，相信我，你记不住多少内容的；如果去做理工科习题，出错率也会极高。

这里建议大家尝试“理性情绪行为疗法”的“ABCDE法”，非常简单而且有效。这种方法能帮助我们在遇到负面情绪的时候不被其吞噬，慢慢地把自己修炼成为一个理性的、心态平和的人，时常保持愉悦放松的心情。

喵之前写了一篇7k字的文章非常详细地阐述了“ABCDE法”如何使用，戳这里叶倩倩：如何控制负面情绪？

没有情绪问题就继续往下看啦~

2. 快速集中注意力进入状态

开始学习之前，把桌面收拾整洁，桌子上只留下你需要看的书，把与学习无关的东西统统拿走。

找一个舒服的姿势坐在书桌前，活动一下肩膀和脖子，放松。缓慢地用鼻腔吸气，让气体在胸腔里停留一段时间，再缓慢地经由口中吐出。这样重复好几次，在心中细数呼吸的次数，不要去想别的事情。如果环境比较嘈杂的话，可以买一对柔软的耳塞，或者用入耳式耳机听白噪声。

能让心情变得安静的歌单：『纯』大自然的声音 - 歌单 - 网易云音乐

我高中的时候特别讨厌数学和物理，大学时候却上了985的工科专业。如果你想知道如何学好自己不擅长的科目，可以来我的公众号【小猫倩倩】看看，我会把自己如何克服厌学情绪，如何解决学不懂、学不会的办法分享给你，希望你也可以取得好成绩。
知乎营销平台三、学习过程
这个部分是本文的重点，会用很长的篇幅来写。在系统思维部分我提到了学习的5个环节，下面来把这些环节拆开讲解。分别说说它们在掌握知识的过程中起到了什么样的作用，该怎样操作效果最好。

1. 预习

我们首先要搞清楚为什么预习。很多同学不喜欢预习，觉得浪费时间，要想在没有老师讲解的情况下弄懂一个知识点实在太费劲了。

注意，这里说的预习并不是“自学”，不需要你完全懂。预习的目的是“提前了解重点”。并不需要花很多时间，大概一个科目分配10min就足够了，有一些自己擅长的科目甚至不需要预习。我一般会在当天写完所有作业以后用半小时完成第二天所有科目的预习工作，实在来不及的话就在上课前的课间看一眼。当我们遇到难以理解的段落时，眼睛会不由自主地慢下来，提醒你这里要多留心。

“知道这里不懂，明天上课讲到这个知识点时我要注意听。”预习的目的就达到了。

2. 上课听讲

一节课的时间通常有45min，想要在这么长的时间里保持高度专注是非常困难的，难免会走神。这时候前一天的预习成果就要派上用场了：你已经知道了老师上课要讲的内容，其中会花很长时间讲你已经知道的内容——这些内容是不大需要你仔细听的。但是，当老师讲到你昨天预习“这里我不懂”的时候，迅速收回思绪认真听讲。

这样，一节课大概只需要保持10~15min的专注，就能掌握大部分重点（重点就是你预习的时候看不懂的）。在这个时间长度里保持专注，对于大多数同学来说还是很容易实现的。

3. 记笔记

为什么记了那么多笔记，一考试分数还是不理想？不记笔记吧，又感觉一堂课下来什么也没学。怎么办呢？

当我们学习的时候，大脑会交替经历两个过程——存储和提取。你背一篇古诗文的时候要读好几遍，通过读把内容印在大脑里的过程就是存储，合上书，复诵出来这个过程就是提取。

如果你记笔记的时候大脑空空，只是机械地把老师PPT上的内容抄在笔记本上，那么这种记笔记的方式就是无意义的，写多少字成绩都很难提高；但是，如果你听完一句话不要马上写，而是先理解这句话，搞清楚其中的重点是什么，然后只记下这些重点，在书写的过程中你已经把这些知识印在脑海里了。

我自己读书的时候喜欢用思维导图笔记法，听课的时候一般用康纳尔笔记法，或者直接就写在教科书的空白处了。用什么笔记法都只是辅助工具，“写”是次要的；重要的是理解一句话，并且提取重点这个过程。

（附一张大学时在书上记笔记的图，写在书上主要是因为把图在笔记本上重画一遍太浪费时间了）
后来发现其实A4纸比笔记本更好用，可以直接把公式的推导过程、老师课堂上延伸讲解案例写在纸上，然后夹在书里。
4. 自习

（1） 更换学习场所

大家有没有这样的经历：考试的时候在卷面上见过一道似曾相识的题，但是怎么也想不起来该怎么做了。这时候，为了回忆起它的解答过程，你会先想起那是一个晴天，教室的门敞开着，窗帘随风而动，老师站在讲台上讲这道题目，然后在黑板右边偏下的位置写下解答过程……随着回忆起越来越真实，那些板书的影像在脑海中越来越清晰，突然灵光一现！于是赶紧拾起笔把解答过程写在了试卷上。

这是因为人有两套记忆系统，一个叫做显意识记忆，还有一个叫做潜意识记忆。比如说你背课文的时候，看起来只是记住了那些字连缀而成的语句，事实上，在你背的这个过程中，窗外树叶的沙沙声、黑板旁边滴滴答答走着的钟表、教室里桌子的位置……这些环境内容也被录制进了大脑中，只是你可能没有意识到。

我们要做的是，换一个完全不同的房间，拿上你的书到外面去，到咖啡店去，从自习室搬到图书馆；换一个完全不同的时间段，以前习惯早上学英语，现在就在早上学数学，把英语换到下午、傍晚时段。学习的时候环境越是复杂多变，学到的内容就越能记得清晰、长久，所依赖的“好地方”对记忆的限制也就越少。

（2） 拉开学习间隔

打散你的学习时间，把一长段时间分成好几段，这样会大幅提高学习效果。

比如说你打算用2小时来学英语，那与你一口气连学2小时相比，今天学1小时、明天再学1小时的方式能记得更多、更牢固。经过一段时间之后，你已经忘掉了一些知识；时间跨度越大，你忘记的内容越多，但是也因此能发现自己的弱项在哪里，从而花更多的时间来巩固。刚刚学过一个概念，你没必要立即复习，因为这样做几乎是没什么效果的；如果一小时甚至一天之后才复习，这时候才是有用的。把一大段时间分成好几段会强迫你把已经学过的东西从记忆里挖出来，重新存储一次，从而进一步加深你的记忆。

但是这个“间隔”是有阈值的，如果间隔太久的话你可能会怀疑“我真的学过这个吗？”这里给出一张心理学实验得到的表格。“学习间隔”指的是从你“第一次学到这个知识”到“第一次复习”之间的时间跨度，在这个期限内复习才能确保考试的时候还记得。
大家都经历过考前抱佛脚吧。看上一天一夜的书，然后去考试，很快这部分记忆就像被删除了一样无影无踪。对付一场考试固然有用，但是对后面的学习很不利。大学高年级的很多专业课都是建立在前面课程基础上的。比如说要是你“模电”学的不好，在学习“电力电子”这门课的时候就会遇到很多障碍；要是你“复变函数”和“电路基础”学的不好，“信号与系统”这门课会让你很心塞。所以啊，学习不要偷懒，出来混迟早要还的。

要想真正掌握一门学科，只有经过遗忘才能记得更深刻。我们的记忆就像肌肉增长一样，先“损耗”一些，随后才能变得更强壮。想知道如何高效记忆，可以来我的公众号【小猫倩倩】看看哦~我还写了很多其他对学习有用的方法。
知乎营销平台

（3） 先考试后学习

为什么我明明已经认真复习了，还是会考砸？为什么题目看着都眼熟，一提笔就不会做了？

其实，这是一种典型的能力错觉——熟练度错觉。学习的时候你一眼就能看“明白”的内容会让你误以为自己已经“掌握”了，然并卵。熟练度错觉会在潜意识里自动形成，因此要小心这些强化熟练度错觉的学习方法：

用荧光笔划线、再抄一遍笔记、再看一遍老师说的重点、刚刚看完一遍就立即复习。

这些大多都是被动的、不经过脑子的学习，几乎不会提升任何学习效果。相反，你需要让脑筋动起来，比如我在【记笔记】那个部分写到的，你要用心想一想重点是什么然后记下来，而不是无脑抄。学到差不多的时候放一放，然后用心去回想刚刚的内容；如果此时能够回想出刚刚的那个诗句，那下次大概率还能想出来；要是“直接去看书”的话，下次可能还是离不开书。

这里的“考试”其实是一个广义的概念，就是把已经记住的内容再表达出来。合上书背诵、不看课后答案完整地进行一次演算，这些都属于不同形式的“考试”。

如果能在学习之前来一次预考就更好了。可以拿往年试卷和课后习题来练练手。这个时候因为你还没有真正学过这些内容，只能靠猜测完成，大脑运作起来会格外费劲。也正因为此，“熟练度错觉”会被消除。如果一上来就学习，你只看到了正确答案，自然不会被干扰项弄混；但是等到真正考试的时候，干扰项就会让你犯迷糊了。

预考能让我们看到接下来要学的内容，会给我们一个机会去思考接下来该怎么学，相当于“剧透”了重点。这样当你学到重要内容的时候，就会格外留心。

这里给大家推荐一种非常有利于自测的方法——费曼技巧。你去百度费曼技巧会发现很多高大上的解释，这里我只用一句简单的话概括，就是把你学到的内容将给别人听。讲给你的爸爸妈妈、讲给你室友听，把所有似乎“只可意会”的内容都讲出来，这个过程你自己的知识脉络会越来越清晰。教科书上大段的术语很难记忆，费曼技巧会帮助你“用自己的话记下来”。

（4） 交替学习

大家学习的时候一定有过这样的经历：一道题在章节课后习题出现的时候，你是会做的；但放在综合卷里之后，你就不会做了（对，说的就是理综考试）。你明明是会那个知识点的，但是怎么都想不起来该用哪种办法解决。

每次专注于一个技巧的练习，比如解微分方程、练习某一个调号的音阶等等，会让你感到实实在在的、明显的提高；但是如果把时间线拉长来看，这些专一练习却限制了你在每一个技巧上的进步速度。而混合练习则能深化你对每一门学科的掌握。

我们前面讲到的换环境、打散学习时间都属于交替学习的方法，还可以在学习的间隔中穿插一些其他事情：比如说学45min数学，然后站起来接杯水、吃点水果休息15min，接下来学习英语而不是继续看数学。我在上中学的时候，晚饭后通常先弹1小时钢琴，然后才开始写作业。

交替学习会损失一些学习的专注度，也会导致我们学过之`,grade:"S",commentCount:546,comments:[{author:"(匿名)",content:"不愧我东南学霸哦",voteCount:166},{author:"(匿名)",content:"抢到了首赞😊",voteCount:134},{author:"(匿名)",content:"收藏好了，下次阅读。",voteCount:67},{author:"(匿名)",content:"😘😘😘",voteCount:31},{author:"(匿名)",content:"答主用心了👍",voteCount:28},{author:"(匿名)",content:"先赞再看",voteCount:22},{author:"(匿名)",content:"前",voteCount:20},{author:"(匿名)",content:"电机学。。。。膜拜一下",voteCount:10},{author:"(匿名)",content:"可怕。",voteCount:9},{author:"(匿名)",content:"那我先存为敬啦！",voteCount:9}]},{id:"1352645637",question:"你有什么建议给女孩子吗?",author:"兰麝细香",voteUp:39494,excerpt:"太多给女生的建议都是关于爱情，家庭之类的。 但我想给女孩子的建议是： 去看看那些给男生关于梦想和事业的人生规划和建议， 不要拘于社会对女性的成见。",content:`太多给女生的建议都是关于爱情，家庭之类的。
但我想给女孩子的建议是：
去看看那些给男生关于梦想和事业的人生规划和建议，
不要拘于社会对女性的成见。`,grade:"S",commentCount:534,comments:[{author:"(匿名)",content:"看了所有 只有这个值得点赞",voteCount:4204},{author:"(匿名)",content:"其实我们的社会一直有一个很矛盾的点，就是不管男女，大多数人上大学之前都被要求一样的努力学习，努力考好高中、好大学，分数、排名也都不会看性别。而一旦进入社会，在职场、婚姻问题中，就出现了“女性可以弱一点”“女性不需要有多么强的事业”“只要嫁的好”类似的声音，这与我们18岁之前所受的教育观念背道而驰。如果是这样，那我们从小到大的努力是为了什么？希望女孩子们都为了自己而努力，去实现自己的人生目标。",voteCount:3176},{author:"(匿名)",content:"赞成，作为女生，我不太喜欢看那些外貌、身材护理的建议……唯有理想最可贵，最值得去追寻。",voteCount:1949},{author:"(匿名)",content:"太对了，人生建议本来就应该是针对全人类这个群体，不知道那些伞兵为什么非要分男女",voteCount:1497},{author:"(匿名)",content:"豁然开朗的答案",voteCount:973},{author:"(匿名)",content:"果然学理科的这个思维就是不一样(没有其他意思，就单纯夸博主)",voteCount:327},{author:"(匿名)",content:"作为文科也一直这么觉得，没必要针对文理科，应该说答主思想有高度深度",voteCount:325},{author:"(匿名)",content:"看了你的答案已经看不下去其他答案了",voteCount:225},{author:"(匿名)",content:"上面回答委婉地让女性服从社会偏见",voteCount:176}]},{id:"887992129",question:"新手如何开始练习写作？",author:"铁木君",voteUp:39095,excerpt:"受村上春树 、林清玄两位大师启发，这 14 个写作方法，一针见血，毫无基础的小白也能轻松学会。 他们写了一辈子书 ，早已参透新手的苦恼：对写作充满信心，却总因难以下笔而失败告终。 刚开始我也和你一样 ，喜欢写作，可就是不知道写什么，一度想要放弃。后来我从两位大师的书中，看到了他们对写作的态度，重拾信心，精心研究写作，整理出了一套有用的方法。 利用这套方法 ，我从一个啥都不懂的小白，到写网络小说、再到投稿《…",content:`受村上春树、林清玄两位大师启发，这 14 个写作方法，一针见血，毫无基础的小白也能轻松学会。

他们写了一辈子书，早已参透新手的苦恼：对写作充满信心，却总因难以下笔而失败告终。

刚开始我也和你一样，喜欢写作，可就是不知道写什么，一度想要放弃。后来我从两位大师的书中，看到了他们对写作的态度，重拾信心，精心研究写作，整理出了一套有用的方法。

利用这套方法，我从一个啥都不懂的小白，到写网络小说、再到投稿《中国青年杂志》6 投 6 中，带领 20 人的兼职团队做内容，半年实现了多数人向往的自由职业。

大学时投稿青年杂志
为了帮助大家写好文章，今天我就把从小白进阶到大神的写作经验，拿出来与大家分享。

在分享经验前，我们先来研究一个问题：那些刚开始对写作颇有兴趣的人，为什么到最后大多都放弃了？

因为写作是个低门槛的苦差，谁都可以写，可不是谁都能写得好。

踏入写作前你要明白：能把自己心中所想，跃然于纸上，其实也是一种能力。

很多时候，你会怀疑：写作真的有出路吗？

在我离开新媒体公司，决定创业的时候，我磕破脑袋地去想它的答案，却始终没找到答案。

直到创业后我才明白，支撑我的并不是写作的出路，而是写作本身。因为它就是一种能力，我能从中得到获得感、成就感，让我有源源不断的动力。

开始前，请再问自己一遍：是否热爱写作并能坚持下去？

如果你准备好了，我们就进入方法吧！

一、新手写作第一步，做好动笔前的准备。

很简单，先想好「标题」、「类型」、「主旨」就可以了。

作为新手，我们对文字是陌生的，不要一开始就想写得有多好，写作是一个持续积累的过程。

看了很多回答，都说到一点：「要不停地写，不要有顾虑」，其实我是实名反对的。

谁都知道水滴石穿，但很少人考虑到「石穿」的时间。

如果石头还没穿，水已经断了呢？（写作成就还没达到，自己就先放弃了）

新手写作不要单纯「写写写」，更重要的是「有收获地写」。

为方便大家理解，我举个例子：

想磨好一把刀，要选取合适的磨刀石，掌握磨刀力度、手法；磨的力气大了，容易有缺口，磨的力气小了，时间就要很长。
你看，磨刀这么简单的动作，细节也大有讲究，更何况是写作。

写作前，一定要想好你要写的内容，如果没想好，千万别急着动笔，因为困难的创作过程，很可能会伤害你对写作的态度。

实在不知道写什么？

不用怕，我们可以从基础入手：

从日记写起，写身边发生的事。这么做，一是锻炼文感，二是培养思考习惯，别看写日记只是记录生活，实际上，日记没有太多虚构的成分，属于最基础的创作。

 写自己的故事、想法。每个人都有描述故事和想法的能力，努力把它们写出来，哪怕写得让人费解也没关系，因为你描述的故事里，有时间、地点、人物、背景，是有逻辑的创作，可以训练你的创作思维。

二、林清玄、村上春树的写作奥秘。

这两位知名作家，说话很直接，但很有用。其中，他们分享的写作方法，让我受益匪浅，下面是我分别整理的写作建议，给你们一个可靠的方法参考。

林清玄（由内而外）：注重文章内容，建议多写，写出自己的风格、态度。

用情感去写作。（投入感情去写，文章才有味道）

 有独到的观点。（成为有思想的人，写的观点要新颖）

 多写有趣味的文章。（不要有负担，乐观积极）

 如能三百莫写三千。（句子要简短有力）

 不去做一颗咸龙眼。（环境影响人心，多阅读好书）

 要不断不断地去写。（积累永远是成长最好最快的方法）

村上春树（内外兼修）：偏向行为，很具体的跟我们讲述了创作细节，如果你掌握了他说的 8 个方法，创作起来就会得心应手，且不容易出错，把它用到熟练，你就不是新手了。

好作品和不好的作品都要广泛读。（看多了，脑子才有足够的东西）

 建立分类清晰的素材库。（素材积累）

 有明确的对象感，用最简单易懂的语言。（一句话能表达的，不要用两句话）

 不断制造惊喜。（描写给读者反馈，不能永远那么平淡）

 有规律地完成写作训练。（刻意规律的去写，培养习惯）

 不纠结完美度，先确保进度。（不要一边改一边写，也不要纠结不写）

 每次修改只专注一个方向。（修改不要漫无目的，要有自己的一套方法）

 只要有人提意见，必会修改。（理性看待别人的意见）

三、超越大多新手的 3 个创作细节。

（1）别害怕写错，想到什么就写下来。（犹豫降低兴趣，量变引起质变）

有时候我们迟迟不敢下笔，就是害怕写错、写不好，犹豫来犹豫去，一个字也没憋出来，这也是新手写作中最常见的现象之一。

我可以很坦诚地跟大家说，「有收获地多写」真的对写作提升有很大帮助，从一开始就犹豫「要不要这样写」的人，注定写不好。

写作，是培养出来的，成千上万字，远远好过空有一张白纸，现在和从前写的每一个字，都是你未来成为大神的资本。

我在大学时，有过和你们一样的想法：动笔就要一鸣惊人，出手就要一跃成神。不过和大多数人不一样的是，我写作从不犹豫，偶然冒出想法、句子，就马上在纸上写下来，也不管它是对是错，是草稿纸还是笔记本。

就这样，持续写了半年，写下了足足一百多篇文章。我特意回头翻了翻，看完都想骂自己一句脏话了，感觉以前写的太烂，跟现在比完全不是一个级别。

但我很感谢那时的自己，多亏那时的不犹豫，才有了现在的我。

身边学物理的伙伴告诉我：量变引起质变，多年的「写写写」培养了我的写作思维，当积累到一定程度，写作的感觉和功力自然就上来了。

（2）把写作当成吃饭本事。（以专业态度对待写作）

之前我看到一句话：永远不要用业余去挑战别人吃饭的本事。

看完深有感触，业余和专业原来有这么大的区别。写作也是一样，要有专业态度，不懂就问，深入学习，以专业标准要求自己，才能突破天花板。

（3）好文章不怕千修万改。（无情删、减、改）

没有好文章是一蹴而就的，即便是大师，都是经过了无数遍精心打磨、修修补补才肯拿出手。鲁迅先生也提倡过：写完后至少看两遍，竭力将可有可无的字、句、段删掉，毫不可惜。

我对写作的态度也是如此，写完文章不会不管不顾，去看多几遍，然后字字斟酌，进行「删减改」三步法，把多余的字句删除、减少废话，再把不通顺的句式进行变换，这样一来，极大程度的保证了文章的质量。

你很幸运，看到这里完成了新手写作 80% 的方法，接下来铁木君要拿出必杀技了，请挺直腰板，继续学习。

四、灵感真的是写作必要么？

写作这东西，如果单靠灵感，那你的写作生涯基本结束了。没那么多灵感能让你随时创作，因为灵感是自然而然的，刻意创造不来。

估计很多人认为：没有灵感的创作，就失去了灵魂。那如果一直都没灵感的话咋办，一辈子都不写了吗？当然不可能。

对于写作来说，灵感只不过是加分项，就算没有，也能创作。

使用 App 查看完整内容目前，该付费内容的完整版仅支持在 App 中查看
🔗App 内查看`,grade:"S",commentCount:421,comments:[{author:"(匿名)",content:`认认真真读完了。
心境跟我两三个月前初次读这些回答时截然不同，那时刚萌生写作想法，心中对这件事懵懵懂懂、一知半解。这时再看文内所述，心中已然多了些掂量。
1.坚持。包括读，写，思考，观察。
2.个人。包括思想，三观，知识面，作息规律。
3.技巧。卖油翁说，无他，唯手熟尔。
这些是我总结出的基本功，望指教。`,voteCount:649},{author:"(匿名)",content:"感谢分享，其实感觉最难在坚持",voteCount:318},{author:"(匿名)",content:"不知道什么原因，我看文章看到前面的后面就看不下去了 好没有耐心",voteCount:58},{author:"(匿名)",content:"素质三连",voteCount:50},{author:"(匿名)",content:"写东西是挺难的，感觉是肚里有，能说出来，就是写不出来。还是怪以前上学的时候没有好好学习的原因吧。",voteCount:41},{author:"(匿名)",content:"请问被困在自己的世界应该怎么打开房门？",voteCount:20},{author:"(匿名)",content:"这两个作家恰好我都特别喜欢💕",voteCount:15},{author:"(匿名)",content:"能否分享一下你的投稿经历？谢谢[拜托][拜托]",voteCount:10},{author:"(匿名)",content:"厉害哦",voteCount:3},{author:"(匿名)",content:"感谢分享",voteCount:0}]},{id:"813484954",question:"有哪些值得长期坚持下去的好习惯？",author:"柠檬初上",voteUp:38324,excerpt:"1、心情糟糕时认真清理房间，心情莫名就开始清爽起来； 2、受人恩惠帮助后除了说声谢谢，再赠送一件小礼品，可以结识到更亲密的关系； 3、每周问候几位优质而“无用”的朋友； 4、将朋友圈有趣真实的人，设为星标，偶尔主动点赞，点赞是一种连接和支持； 5、在聚会中遇见一位感觉不错的人，进行一对一交谈，主动请求加微信，第二天表达初识之喜与问候； 6、出差、旅行，记得带上一双跑鞋，一身运动服，去陌生城市/地域的清晨跑个…",content:`1、心情糟糕时认真清理房间，心情莫名就开始清爽起来；
2、受人恩惠帮助后除了说声谢谢，再赠送一件小礼品，可以结识到更亲密的关系；
 3、每周问候几位优质而“无用”的朋友；
4、将朋友圈有趣真实的人，设为星标，偶尔主动点赞，点赞是一种连接和支持；
 5、在聚会中遇见一位感觉不错的人，进行一对一交谈，主动请求加微信，第二天表达初识之喜与问候；
 6、出差、旅行，记得带上一双跑鞋，一身运动服，去陌生城市/地域的清晨跑个步，或许收获新的灵感；
 7、晨起刷牙时问问自己，如果要过好这一天，有什么可改良创造之处；
 8、睡前1小时远离手机和任何电子设备；
 9、戒糖，戒所有含糖饮料，将可口可乐改为零度可乐（之类无糖甜味饮料）；
 10、每天在线或当面对所遇见的人表达某方面的欣赏和激励；
 11、遇见心仪的异性，用大方得体的方式释放好感；
 12、为自己做一张能量及时间管理表格，规划一天中的高能时间要完成的事情，以及低能时间可以做的事情；
 13、 为自己做一张能量建设表格，列出哪些事情可以让自己增加能量（为自己充电），保持良好状态，比如早睡、早起、健身、和喜欢的人在一起、做喜欢的事情……等等；
 14、当出现负面情绪和自我否定时，想办法转移自己的负面情绪，听增强自信的音乐，或者看励志书籍/电影，或者找人夸夸自己；
 15、误解或伤害过他人，一定要专门去道歉和解释；
 16、睡前5小时，绝对不进食，戒糖，低碳，控制体重；
 17、改变饮食结构，从一天三顿主食，过渡到一天一到两顿主食，多吃优质蛋白和蔬菜，远离肥胖；
 18、清理家中一年以上未使用的非必须物品/衣物，来一次断舍离，多余的送人；
 19、每天问问自己，最重要的人，最重要的事情，最重要的目标，到底是什么；对那些不重要的人、事、物，尽可能少分配精力；
 20、给人第二次机会，但不要给第三次，圣经上说过：凡第二次犯错者，必有第三次；
 21、在熟悉的城市找到自己的避难所和舒适区，也许是一个饭馆，一个街区，一个酒吧，一个朋友的住处，一个人的心里。总有些时候，我们会猝不及防地崩溃，我们需要逃离现实去到那里。就像日剧里的深夜食堂。
22、建立自己的日常事项，比如日常写日记，日常有氧健身半小时，用恒定不变的习惯，抵抗人生的无常。会建立自信，缓解焦虑。
坚持下来，会看到不一样的自己，那更美。 我们都一起，每日每月以求寸进，加油 

2021.10追更
记住《论语》里的8个字，特别好，理解这8个字，苦日子会变成好日子，好日子绝不会过成苦日子。
这8个字是“子罕言利，与命，与仁。”与是赞同、接受的意思，孔夫子很少说利，多是接受命与赞同仁。利很重要，有利才能买房子，过好日子。但只有利，就为贪婪控制，利越大，贪婪越大，永不知足，永远焦虑。命和仁，才更重要，是人生的基石，是幸福的保障。命是天命，孔夫子说50岁才能知道，按我的人生经验，孔夫子并没有骗人。再努力，再聪明，得看够人生的起伏，体验世界的几次摇摆，才会接受天命。天命就是现在说的概率，坚持原则可能未受赏识，努力可能没有结果，甚至好人没有好报。这是人力不可控的，不忧虑，接受它，这样一个人才能继续坚持原则，不停努力，永远当好人，在仁的道路上走完一生。仁是什么？仁是爱人。是爱长辈，爱自己。
2022.3追更
人生苦短甜长。
你的人生，根本只和自己相关，大部分人与你无关，少数人暂时性与你有关。相关之人寥寥可数。可我们总想抓住这些无常。
 to me：静定生慧。 
 1、温暖是一个人记忆深处最治愈的芬芳，要给人以温暖，创造愉悦和新鲜。
个人认知：做文化产品，走温暖抚慰的途径，可以进入正向循环，长长久久。

 2、人世间 一切让人产生迷恋的产品／人，要经过的过程：以我为例。
 （1）他的出现，打破了你原有的生命体验和边界。
（2）引发了新的体验，并对这种新的体验产生一种新的想象。
（3）我开始对此注入自身想象。
（4）开始有了更大的迷恋。
 （5）在这种迷恋当中寻求自我对应。
 品茶如此，嗜酒如此，爱一个人，亦如此，沉溺于某个物件，也是如此。物质不匮乏的时代，一切产品都最好要做成精神产品。
3、上瘾和上瘾不尽相同。
 做互联网产品，我们往往提倡做&#34;精神鸦片&#34;和&#34;毒品&#34;。但其实，人们的精神越来越冷漠麻痹，难以刺激，就需要不断升级用量及出新。
最终会导致反感排异。
就像所有利用人性弱点的公司，实际上都更容易反噬自身，因果不虚。
而类似茶这种与人为善的“瘾”，则可以流芳百世。
因此，一个看似起步缓慢的产品，不利用人性弱点的产品，迭代成本更低，市场开拓更为稳健。在更大空间里给了自身创造天地的机会。
但考验创造者的用心和耐力。
俗称：人间正道是沧桑。
这种耐力和定力又和健康状况有关。身体是革命的本钱，心力的基础。性格和心力共同决定命运，而非经验和智慧，我非常相信阿甘的故事。
4、生活在很多节点上给了重要的暗示和机会，我们每个人身后都有神灵看护，只是一般人会视而不见，不一般的人会趁机抓住。所以要静定，要心空，要活在一种诚实当中，明心见性。
5、生活很多时候是殊途同归，少环顾左右，少对比借鉴，走自己的路。或者，许多现成可借用的条件、经验和路径都会将我们引向非真正的目的地，是障碍。要破障，走原本应该走的路，和现有的路都不同的路，属于你的少数人走的路；
听从内心，听从直觉，往往才能看见那条路；
6、所以，人生就是试错和冒险。没有可复制借鉴的路；
7、人走了很多条路径，往往最终会导向原点。我就是如此。所以，我认为：初心和第一直觉，最初的想法，往往最准，最对。所谓新手的运气，以及重要的“初心”；
8、人生实苦。不以物喜，不以己悲，活在一种平静遂顺中，就是最大的福报；省去诸多内耗纠结。
9、记得有人和我说：人到中年，短板就不要补了。要避开。要扬长避短。
10、人与人的关系，是我们诸多痛苦的来源，也是幸福与依靠的来源，是成事的仰仗，尽管无常，还是要学会与人打交道。既要在乎，又不要太在乎人与人的关系，因为一直在变。
1、一年不比一天重要，认真过好每一天，比年底计划过好每一年重要；
2、我们总不能事事如意，那些未如意的世事，大多是命运之手在背后出手相助，坏事未必是坏事，好事未必就真好；
3、学会弯腰、学会臣服，方能保存体力，暗藏心力，拼命挣扎只会越陷越深；
4、人性充满罪恶，也留有善面。不要以己之善面，对付他人之恶面，也不要以己之恶面，对待他人之善面；有时需要躲闪、有时需要回击，常常需要激发对方的善意；
5、我的深度：无常为常，失控为常。失无所失时，你还有自己。保养好自己，投资健康和大脑，比投资任何东西，都值得和正确。
6、人与人的关系没那么重要，人与自己的元神的关系最为重要；人都卑微，值得原谅，人都变幻，值得浅交。可有的人或许会除外。？
7、财务状况要健康，不要把所有现金都用来清偿房贷；以及以后的投资。
8、节省情绪，少伤春悲秋，少被轻易激怒，不轻易爱上一个人。
9、如此情深，却难以启齿。原来我深爱一个人，会内心酸涩，反而会说不出话来。
10、困难之时，一小步一小步地走，不伤心，不断行，莫存顺逆。
11、诸多前辈的例子：最好要有宗教信仰。
12、认真不是良好品质，是本分。
13、爱与被爱，是世界上最重要的事。
14、质简为上。
能提前预判和规划的，一定要提前规划。凡是都逃不脱客观规律，不要抱有幻想，按照最糟糕的外部环境来做应对的准备不会错。
至于无法预测的变量，和不受控制的人性，属于天要下雨娘要嫁人，就都随它去吧。
15、“我又转念，见日光之下，快跑的未必能赢，力战的未必得胜，智慧的未必得粮食，明哲的未必得赀财，灵巧的未必得喜悦。所临到众人的，是在乎当时的机会。”
这是圣经中的一段话，适合解释世上你认为的一切不公平。我以此度己。
16、话语新大陆远不及思维。思维认知及系统很重要。要练习可开拓。
17、延迟满足。
18、行胜于言。
19、想到什么及时去做。 及时完成核心工作，忽略无关紧要的细节或者不关键的要点，不能成为完成该件事情的障碍。或者思考和寻找可替代的非关键因素。替代性方案。
20、想到什么及时完成，及时搞定，不能一放占用更多时间。`,grade:"S",commentCount:810,comments:[{author:"(匿名)",content:`优秀的人，永远优秀！ 不像我自我感觉优秀…
例子随便列！能听进去算我输！啊！这浮躁的社会啊！`,voteCount:1e3},{author:"(匿名)",content:"带跑鞋跑步这个真的赞同",voteCount:504},{author:"(匿名)",content:"认真地看完，每一条都很赞，加油，一起做更好的自己",voteCount:474},{author:"(匿名)",content:"间接性踌躇满志，持续性混吃等死，啊，这浮躁的我啊[好气哦]",voteCount:282},{author:"(匿名)",content:"第一个！！就是我！我爸说我这个一生气就收拾家让他少了好多顿的骂",voteCount:207},{author:"(匿名)",content:"不吃主食这个真有用 俩月不吃主食 也没运动 瘦十斤",voteCount:183},{author:"(匿名)",content:"处女座♍怒赞第一条",voteCount:180},{author:"(匿名)",content:"突然相加你微信",voteCount:120},{author:"(匿名)",content:"所以列表就有了意义",voteCount:21},{author:"(匿名)",content:"戒糖。。我低血糖[捂脸][捂脸]",voteCount:10}]},{id:"409389787",question:"你有什么值得分享的高效学习方法？",author:"珩之之",voteUp:37116,excerpt:"相见恨晚的【练字方法】 早点遇到的话，高考肯定能＋20分！！ 错过了一百个清华北大的感觉！！！ 我从小字就很渣渣，只能说是能看得清的那种。 每个暑假寒假计划，都要写上：练字！ 字帖描了一本又一本，哪怕是高三的中午还偷偷描个一页纸。然而并没有什么…用。 直到大学选修课无意间碰到了我的老师，仙风道骨，惊为天人，打通了任督二脉。在b站书法主播的路上越走越远。 [图片] 我get到的很简单，但是一直都没人告诉你的道理。 【震惊…",content:`相见恨晚的【练字方法】
早点遇到的话，高考肯定能＋20分！！
错过了一百个清华北大的感觉！！！
我从小字就很渣渣，只能说是能看得清的那种。
每个暑假寒假计划，都要写上：练字！
字帖描了一本又一本，哪怕是高三的中午还偷偷描个一页纸。然而并没有什么…用。
直到大学选修课无意间碰到了我的老师，仙风道骨，惊为天人，打通了任督二脉。在b站书法主播的路上越走越远。
自己单刷字帖 vs 掌握方法后我get到的很简单，但是一直都没人告诉你的道理。
【震惊！再这样练字你就废了！】
1.描字帖！就是附一层半透明纸的那种！
2.每天都写一张，但是全凭自己怼。
3.想学连笔字，却从楷书开始学。
4.想学钢笔字，书法班却让你先学毛笔。
5.练了一个月，越写越丑了，索性不练了。
身中数箭的请让我看到你们的双手 ~
其实不是你不努力，
也不是你手笨，
而是你，不知道正确的方法，被蒙蔽了而已！
文章快速导读：
一、提高练字效率必须知道的五件事【重要】
二、大学书法课上GET的科学、完整、系统的练字方法
三、如何选择字帖、纸、笔
四、让练字上瘾的方法
一、提高练字效率必知的五件事【重要】
1、首先，在此强烈提出：「描字帖是自杀式练字行为。」
随便买一本带透明纸描的字帖，回家自己描啊描啊描，肯定是没有长进，或是越写越丑。
很多人都深深陷在这里，不能自已。
因为描的话，会有依赖性，记不住字形，一离开字帖，自己就不知道怎么写了。
同理，凹槽字帖、水写布都很糟糕。
就是这样的描红字帖2、「错而不知，越练越丑！」
做错了，不知是哪儿错了，还不改，刷了一千套题，你能考满分吗？
练字也是同理，一个好的老师能快速带你入门。
没有老师自己一味怼字帖，会让你不知道自己错在哪儿，该怎么纠正，所以会出现字越练越丑的状况。
我大学的那门课，讲选纸选笔坐姿拿笔，先楷书，课上讲楷书历史，讲笔画，结构，布局；然后行书，加上运笔，连带技巧等；最后草书，再加草书代表符等等。还有书法作品赏析。很系统的了解了书法的一个轮廓，知道自己喜欢什么样的字，该如何着手。
感觉这就是所谓「得法」。

3、「你想学连笔字，你他喵就直接学啊！」
我真的看不下去，让那些觉得 连笔字 很帅的少年们，从 正楷 开始学。
连笔字，又称行书。因为行书要改变笔画顺序，并不是每个人都会“绕”的。
所以，会写连笔字的同学，在平日里就显得比较帅气了。
很多人有时候想写，有时候是为了追求写字速度，就自己强行连在一起。
剪不断，理还乱，如同稻草一般，让阅卷老师大为头疼，老眼昏花。
而让这些为了速度的人、为了酷炫的人，从楷书开始学，
最大的缺点就是：磨灭写字兴趣！！！
楷书人人都会写，人人都认识，所以没有了神秘感，从而会写楷书，成就感也会下降。
让一个想要酷炫的连笔的少年，从楷书开始学，无异于是一种酷刑！
容易让他学到第三天，就不想学了。
况且，练字 本来就可以从行书开始学习 啊！！！！（震惊！！好多老师都不告诉你的事实！！！）
现在的行书（笔是派通的科学毛笔）https://www.zhihu.com/video/987105260346847232普通的楷书写的好的普通人，不一定会写行书。行书有一套自己的连笔方法，并不是写的快了，把笔画连在一起了就叫行书。
而且行书真的很帅气啊很帅气！！！！超爱的！！！很有成就感啊！！！给妹子写情书什么的！！！撩妹必备！！！

4、「拿笔方法不对，可以写好字！！！」
很多人写不好字，周围的人总是从拿笔姿势开始纠正你。
非要让你用这种正确拿笔方法写字，
不这样拿笔就是异类！永远也写不好字！（看我的白眼0 0~）
拿笔方法不一定非要这样我在直播的时候，遇到的最多的问题之一就是，UP主你拿笔姿势不对！
不管他们写字比我丑了多少，好像我拿笔姿势不对，他们就可以站在高处指导我。
执笔无定法！！！执笔无定法！！！执笔无定法！！！
我觉得就算你用脚写字，只要结果出来好看，那也达到了目的！
我觉得教小朋友肯定要教正确的执笔的，但是对于一个成年人来说，拿笔方式已经根深蒂固了，如果死磕这个，改过来需要时日，还容易使字变丑，从而容易丧失写字兴趣。
我的两任书法老师都没有纠正我的执笔，他们觉得如果你写出来的好看，那就是ok的，不要过多纠结于此。从而我就很开心的学习写字了！

5、「学同桌的字，最快！」
大家有没有发现，学习周围人的字，比学什么庞中华\\田英章\\李放鸣快很多！虽然同桌的字也算不上什么好的，但是你一模仿就出来了。这是为啥咧？
因为没有 距离感 。
因为这些人是你的身边人，你可以接触到，可以问，可以拿到他们第一手笔迹。他们的字只比你好一丢丢，并没有跑到天边去，是你可以追逐的对象。比学王羲之，比学田英章轻松多了对不对？
可以学习周围人的字，简单上手，轻松愉悦。
但是如果要正规学的话，就是模仿你老师的字，也很快，虽然比同桌高了很多个高度，但是至少可以触碰得到，不至于对着一个冷冰冰的字帖。我的老师就吐槽说学生学他的字，比学原帖像多了（正规是要临原帖，古帖的）
虽然原帖很好，但是由于它们太完美，在神坛的位置，会导致你觉得“”我模仿得不像是肯定的呀，我只是个小学生，又不是王羲之”然后就放纵自己了。
在日常中，择其善者而学之，同桌的作业，老师的批阅字迹，路边的招牌上的字都可以是你学习的对象。

二、大学书法课上GET的科学、完整、系统的练字方法。
我大学的书法课程大致这样教的：
1. 书法艺术与书法来源
2、坐姿与拿笔姿势、纸和笔的选择
3、楷书鉴赏+练习+作品
4、行书鉴赏+行书代表符+连带方法+作品
5、草书鉴赏+草书代表符+作品
6、书法作品的章法
大概是这样，教程上还有签名设计方法，这节课的作业就是给自己设计四款不同的签名233333（老师看我写的太丑，给我设计了一个，由于太酷炫，导致我到今天也不太会写他的那款ORZ_(:з」∠)_）
其实能看出来，大学的教学真的跟普通的书法班教的很不一样！真的很严格啊哈哈哈，我当时学了才发现，噫！真好！比我之前见过的书法班棒多了！
后来我掌握了这一套方法后，毕业了只能跟着普通的书法班的老师学，就有指导思想了，就不会被他们带跑了（我要吐槽现在市面上的普通书法班，就一个老师写，你跟着写，再给你改改的这种…没有一套自己的框架）

练字基本方法：
想练习行书（连笔字）的人：行书-草书-楷书-行书
以行书为主，辅之以楷书和草书。
步骤基本：
（0）前期准备：纸、笔、帖（1周）
（1）基本笔画：点横竖撇捺（1周）
行书基础笔画1行书基础笔画2行书基础笔画3嗯，我老师就是这么厉害，自己手写了一本教材，买不到的不用找了哈哈哈（文末有提供一份类似的福利）
这些基础笔画呢，先练习个一周时间。
（2）偏旁部首：走之底、竖心旁、提手旁等等（3周）
（3）结构：独体字、左右结构、上下结构、半包围、全包围等（3周）
（4）行书技法：点画连带、呼应、省略、替换、代表符之类的，就是传说中的“绕法”（2周）
为了学好行书，得学习一些草书。需要学习草书代表符和 特殊变例，草书代表符其实就是很多偏旁部首的草书 简省写法，不学是不会的。
课上的草书代表符我们看不懂草书，也正是因为没有学过这些奇奇怪怪的代表符号。
（5）布局：行间距、字间距、放大缩小、落款等（1周）
如果时间很紧张，最快的方法，就是调整你的布局，使得你的字，看上去清爽一点，让人能够辨识得出来。三分字，七分布局。一个美的字，一定是讲究章法的。
如何短时间内使自己的字看起来更舒服？（6）行书作品（1周）

大概3个月的时间，基本可以掌握这一套基本的方法。
如果扎实的练习加有老师带，一定能取得翻天覆地的变化的。
注意，练字净时长，不是每天练习半小时就算一天的，＞2h才能算一天，如果你每天只练了1h，就是6个月，懂咩？净时长要180h最少。
嘤嘤嘤，少于180个小时，说没有效果的都是耍流氓……

三、如何选择字帖、纸、笔
（一）选帖主旨：【买你想学的！觉得帅得不要不要的！那种字体的字帖！】
1、想学瘦金体就学！想学静蕾体就学！想学江湖体就学！
没时间解释了，快上车！我知道很多少侠想学瘦金体，或许是因为高逼格，或者是《盗墓笔记》。 但是，一般你要学瘦金体会被书法老师拒绝o(￣ヘ￣o＃)因为这种字体一旦陷进去，就不容易出来了，还有是因为他们大多自己……也没练过这个体23333.....
静蕾体，是比较秀气的，然后很多妹子觉得很可爱、秀美。感觉写这种字体的人都是一个美少女的感觉呢，也受到很多人的欢迎~
江湖体，见微博上的多种很帅气的连笔字，经常能圈粉一大票粉丝~
虽然这三种字体，可能会被书法圈大佬们所鄙视，我这么说，可能也会被怼……
但是，你学一种，你觉得很帅的字体，能够促使你很快动手，上车。
真的，学这些字体，比我学庞中华的字，有动力一百倍好吗？？（乖巧.jpg）
方正静蕾体上了车之后，练习可以使你提高对字体的 模仿能力 与 审美能力 。
比如，我现在模仿能力提升了很多，给我一个任何字体基本都可以仿出来（不行就画），有了一种“随心所欲不逾矩”的通关能力的感觉。
审美能力，指你在不断学习的过程中，审美会提高的，发现当初你那么崇拜的江湖体，其实写的真烂啊……然后……你就会开始新的字帖了。

2、字帖有那么那么多，为什么你就只盯着庞中华\\李放鸣\\田英章呢？
了解多一点字帖嘛。最好的方法，就是去一家很大的书店，有一面墙字帖的那种，然后去确认眼神，去找到你觉得“卧槽卧槽卧槽！世间竟然有如此出尘绝绝的字帖！”
那一本，就是你的真命字帖了。
记得，也可以学习古帖的！钢笔字不一定非要学现代人的字体的！这样，你的选择余地，就开阔了很多很多。
小楷《灵飞经》现代的书法家，也有很多啊，吴玉生、王慧松了解一下？还有一些书法家没有出字帖，但是在钢笔杂志上，有作品的展示，可以买杂志来看，对照莫方，或许能看到你更喜欢的字体。
吴玉生行书王慧松草书（二）选纸
1、买贵的、好看的：
买三块一张的纸，来写作品。
好处就是：有BUFF加成！！！一是纸太贵，你写起来会心疼，就会认真写；一是花纹衬托出美。
会让你产生「我写的真好看！」的错觉~
从而提升你的信心，从而使得你还能够肝一下。

2、普通的：
第一个，A4纸。
作为练习纸的话，推荐80g的A4纸就可以了，20块500张，够写半年？？需要买好一点的A4，所以克数要跟上。如果用钢笔写的渗水就算了。
因为行书的话用方格纸练习是有BUG的，因为它是要两个字连笔的，特别是古帖的竖向排版，这个时候方格纸就会出现很大的缺陷。
第二个，米字格。
就是单字练习，推荐的普通的十字、米字格。
这个纸缺点就是，会显得你的字贼丑！从而容易自抱自泣。优点就是，易于落格，有助于模仿，同时让你面对血淋淋的真相。
最后，记得，不要太依赖米字格，适当用空白的A4纸也是必要的，因为你日常书写，哪有米字格给你啊摔桌！(╯‵□′)╯︵┻━┻

3、避免选择的纸张：
花草宣纸，贼难写，对于钢笔，签字笔，科学毛笔都很难在上面书写。
生宣，钢笔写上去会晕染开来…
部分熟宣，有时候太熟了，墨水都是浮在上面的。
报纸、草稿纸也不推荐，因为你会容易放纵自己，随便写写。纸张质量贼差的纸，一写就晕染的纸，还有那些让你心情不好的纸~统统扔掉~
（三）选笔
1、钢笔
（1）普通钢笔（正经练字）
正经练字的少年们，买钢笔（敲黑板了）！
日本的百乐：笑脸钢笔、百乐78g、88g、贵妃
个人喜欢笑脸钢笔，因为笑脸钢笔很萌！出水很顺畅，感觉不错，刚拿到的时候被惊艳到了。然后百乐78g也是很多大神强推的神器，我试用了下，觉得78g比较细，笔杆比较轻，不适合我这样帅气的男孩子o(*￣▽￣*)ブ，所以我就入手了88g,重了不少，沉甸甸的。我一般买M尖，因为我感觉日系笔笔尖整体偏细，而自己又喜欢粗一点的使得粗细对比明显。
贵妃，透明的，非常适合彩墨，真的太优雅了。之前最萌笑脸钢笔，现在贵妃超越了前面几个，一跃成为我的心头好，开心。

德国的LAMY：凌美真的很美貌啊，如果说百乐是日本的学生钢笔，那么凌美就是德国的学生钢笔了。颜色可选范围特别多，设计简约美观。有一种观点是说，凌美适合写英文，百乐适合写汉字，个人感觉都行。凌美会粗一点，ef尖都比百乐粗，会重一点，可能更适合男孩纸。UP买的是凌美的恒星系列的小绿。
LAMY恒星小绿（2）美工笔
就是弯头的这种，才不是因为摔坏了呢！
美工笔可以混合着普通钢笔一起练习。他们本质上都是钢笔。美工笔的弯头，使得粗细更为明显，笔锋变化非常大，从而会产生很酷炫的效果！图上的是英雄的美工笔，才20块。

2、签字笔
选择0.5以上的，0.5、0.8、1.0的都可以。
0.5的适合考试党呀，我喜欢图上天卓的这个0.5，从我高考那年开始，已经写完十盒了，可能我喜欢出水量比较大的笔吧~
然后0.8和1.0真的很适合练字的原因是，笔画够粗，从而使得粗细变化可以很明显。
很重要的“横细竖粗”原则，所有的横画都比竖画细！用这样的笔就很容易表现。
3、有Buff加成的笔（不正经练字看这里）
派通科学毛笔科学毛笔、秀丽笔、小楷笔、铅笔等等。
科学毛笔，就是我常用的这支~我的真爱是派通的科学毛笔（中楷），当时是在澳门逛到一家文具店看到的，其实很多人也用它来画画。看过我直播的都知道，这支笔出水非常顺滑，而且粗细变化特别明显，是练字作弊、装X必备之良药。但是另外的一些写书法的UP主们说，这个非常容易侧峰，他们用不惯。我老师也觉得总不如普通的毛笔小楷顺手。反正我自己真的很喜欢，买过一打了已经。我觉得比muji的科学毛笔优秀多了。
提一下铅笔，普通铅笔其实也有BUFF的，铅笔的变化也不错，加上它呈现的是灰色，从而也能使得字更好看（自动铅笔就算了啊诸位）。
4、避免选择的笔
圆珠笔、玻璃笔、竹笔等。强排圆珠笔，因为极其顺滑，容易轻易狗带，还能使得好好的字废掉。玻璃笔真的只是好看，真的……不适合练字啊哭，太细了主要是。竹笔也是个练字辣鸡，太美貌了，适合装X，不适合练字。不信的可以都买一遍，把答主走过的弯路都走一遍也挺有趣的。

四、让练字上瘾的方法
建立【激励-反馈-乐趣】机制

激励，是指你需要收到正向的鼓励。
激励就是说写字要给你带来成就感，
比如大家的夸奖，朋友圈的点赞，直播的礼物，考试的加分等等，
得到积极的反馈是你不断前行的动力，
不容易一个人死怼苦行，而是很愉快地练字，
像我爱学习，学习使我快乐一样。写字是会上瘾的。
反馈，你需要知道你哪里写的不好，及时纠正。
你的错误你要能看出来，或者是老师和他人给你指出来，错误加以改正才能前进。

乐趣。换了个漂亮的纸写不`,grade:"S",commentCount:1210,comments:[{author:"(匿名)",content:"期待答主能继续更下去，这个暑假也有练字的计划",voteCount:397},{author:"(匿名)",content:"后天高考！！！快！！！来不及了！！",voteCount:350},{author:"(匿名)",content:"不更的话我会到你梦里面吓你(•ω•)（和善的微笑）",voteCount:297},{author:"(匿名)",content:"我从初中就一直想练字，然而到大二了，我的字还是看起来像小学生，只是很工整，练多少次失败多少次😭",voteCount:255},{author:"(匿名)",content:"同感，我从小到大一直没有系统的练过字，但是很多人都说我的字越来越好看了，因为我总是不断在模仿周围人的字",voteCount:164},{author:"(匿名)",content:"自己怼字每天看的难受，过一天再看的时候更难受(;_;)",voteCount:153},{author:"(匿名)",content:"学同桌的字真的最快，我记得当时初中天天抄同桌作业（反例啊）我同桌的字属于那种练过超好看的，然后我的字也变成她那样的了，很像。",voteCount:97},{author:"(匿名)",content:`看到：练了一个月，越写越丑了，索性不练了。
我笑了，这不就是我吗？😂`,voteCount:97},{author:"(匿名)",content:"因为行书出现的比楷书早～～第一次在课上听老师说下巴都要惊掉了🌚",voteCount:82},{author:"(匿名)",content:"我先去找铁匠打个40米刀(´▽｀)ノ♪",voteCount:72}]},{id:"1639574790",question:"怎么样才能把自律当作一种习惯 ？",author:"Tiamo",voteUp:37005,excerpt:"你起床后顺手把被子叠一叠， 床单整理一下、 把床头柜的垃圾清理之后垃圾桶换个袋子； 窗户打开。 洗脸的时候刷刷牙敷个面膜。 敷面膜的时候有时间冲个热水澡，没时间就湿湿毛巾把今天要穿的鞋子，拿的包包和外套擦一擦。 擦完把阳台挂着的衣服被子收一下。 然后把前一天的袜子挂起来。 敷完面膜化完妆梳头发，穿衣服鞋子。 戴好首饰喷点淡香水拿把伞和自己的水杯出门。 顺手带上垃圾。 在外面能吃减脂餐就吃减脂餐，吃不了也尽…",content:`你起床后顺手把被子叠一叠，
床单整理一下、
把床头柜的垃圾清理之后垃圾桶换个袋子；
窗户打开。

洗脸的时候刷刷牙敷个面膜。
敷面膜的时候有时间冲个热水澡，没时间就湿湿毛巾把今天要穿的鞋子，拿的包包和外套擦一擦。
擦完把阳台挂着的衣服被子收一下。
然后把前一天的袜子挂起来。

敷完面膜化完妆梳头发，穿衣服鞋子。
戴好首饰喷点淡香水拿把伞和自己的水杯出门。
顺手带上垃圾。

在外面能吃减脂餐就吃减脂餐，吃不了也尽量少摄入点垃圾食品。咖啡饮品都不用喝，你有水杯喝水就行。可以多走路的时候就多走路，谁说去健身房才算锻炼？
到家第一件事把外套口袋的所有物品整理出来，
钥匙挂在应该在的地方。
墨镜口罩放在门口衣架上。
外套挂书房。
鞋子脱好整理到鞋架上，袜子顺手扔到洗衣机开15分钟快洗清理一下。
脱完内衣 上衣裤子以后依次顺手叠放在凳子上。
然后开始把耳钉 戒指 项链全部放回首饰盒内。
然后卸妆，敷面膜。
敷面膜的时候顺手点燃香薰蜡烛，
打开热水器放热水，顺手清洗内裤。

手机所有APP通知关闭，垃圾短信随手随删。相册隔一段时间整理一次不存多余照片浪费空间。
碰到喜欢的东西想买，无论价格是否在接受范围内都别着急做决定。先放下，然后接着逛。如果到最后离开的时候你还在思考就证明可以买，如果一会就忘记说明只是前额皮质分泌的多巴胺作祟罢了。
把钱花在可以节省时间速率，
投资学习的地方。而不是无端奢靡荒废。
你可以请保洁，可以叫专车甚至可以买车。只要这些东西可以帮你节省自己的时间，能用钱换时间的时候不用犹豫。大胆去换，因为这些时间可以帮助你挣得更多金钱。
有钱去行万里路，多看看这个世界。了解了解不同的人文思想，宗教信仰。亲眼见识见识大自然的鬼斧神刀；而不是一味攀比追求品牌。
可以买奢侈品，可以有大牌。
前提是在自己能力范围内，适度即可。哪怕只是二手、因为只有自己真正拥有。才能有足够的底气与勇气展示自身不足、用的越多时间越久你就越能理解，为什么有的包卖1w，有的只需要100。
为什么有的酒店一夜5000，
而有的只需要100。
一万的风衣贵在哪里？
跟1000或者500的差别在哪儿？
那些潮流设计款又是什么？
所谓设计，到底是什么设计？
大牌的企业文化到底是什么东西。我们在购入轻奢或重奢物品时真的是为了购入物品本身还是为了它的服务甚至理念买单。
10万的车也不是不可以开，为什么300万的法拉利或者兰博基尼就能那么炫酷？
一分价钱一分货真的是智商税吗？
一线的整形医生和二线差在哪里？
为什么大家挤破头想去北上广，
仅仅只是贫富差距？
或许又是审美？品味？思想？
什么叫大环境？
什么是氛围？

如果你成为不了富人，那就去服务富人。
服务的过程中你会有很多感悟，比如：“富人为什么会拥有财富？”“他们工作的意义到底是什么？”“什么才算中产阶级，什么是顶级富豪？”“如果我想跨越阶级，我需要做出什么努力和改变？”
你见的越多，越能区分好坏。
审美品味越高，
反而越容易保护好自己的财富。
多跟比自己卓越的人交流，才能提升自己努力的阔值。不要说什么宁做鸡头不做凤尾，从F到A可以降维打击，但如果你只会做A如何胜任F的工作？

什么叫自律？
是你天天五点起来，每天戒碳戒碳减肥？
或者一天十公里，天天朋友圈打卡英文单词？
真正的自律是你能找到生活学习跟工作的平衡点，你为自己的生活方式感到发自内心由内而外的快乐。
这是一种张弛有度的状态，
我可以九点起来，也可以11点起。
我可以孤苦伶仃的一个人，也可以天天聚餐。
我可以偶尔打卡网红餐厅，也可以逛遍所有美术博物馆。我可以把金钱消费在所有自己认为值得的地方。而非为了他人如何。
我尊重米德提出的客我与自我，
但依旧可以轻松找到平衡。
我接受自己的平庸后依旧热爱生活。
真正的自律不是以一种明文规定的规章制度活着，也不是照搬照抄他人的生活方式。
比如我喜欢村上，但我不会因为他说跑步好我就去跑步、因为我更喜欢快走。
自律是为了让我们在生活中的每个年龄阶段，每一个水平层次每一种生活状态中找寻真正自我需求与期待；这个需求和期待不是他人所求，而是你真正喜欢 并且想要追寻的、就算没有任何人知道。
但你依旧可以坚持下去的事情。
真正的自律，
是为了让我们可以更加从容不迫的活着。
而不是做什么形式主义，我可以彬彬有礼。也可以为了自己的利益破口大骂。可以戒油戒碳、也可以在三两好友相聚时把酒言欢。
我可以忠贞不渝，充满理性。但也可以写下：“趁着夜色撩人，我被感性冲昏头脑的时候 我们相爱吧；做任何事、太阳升起再醒来的时候，理智的我将不再浪漫。”
真正的自律是随性洒脱且淡然的生活状态，而非刻板生搬硬套。
所以别再问怎么做到自律了，
为了自己喜欢的东西甚至生活有所担当勇于付出。这样的生活方式在我看来就称得上所谓的自律。
22的时候，我可以仅仅只是在活着。
但我希望 30岁的时候、我可以选择生活。`,grade:"S",commentCount:694,comments:[{author:"(匿名)",content:"除了叠被子都赞同，我个人真的特别特别不喜欢叠被子",voteCount:892},{author:"(匿名)",content:"面膜不能敷太多次，容易引起角质层糜烂…",voteCount:571},{author:"(匿名)",content:"有点麻烦，我做不到这么多自律，我能每天刷牙洗脸就不错了",voteCount:328},{author:"(匿名)",content:"那就整理一下平铺在床上就好啦",voteCount:244},{author:"(匿名)",content:"顺手？什么都是顺手，这个文章20多个顺手，语言再怎么包装也掩盖不了这些琐碎行为累人的本质",voteCount:214},{author:"(匿名)",content:"抓住脚那边的两个角，张开双臂，向上挥的时候使劲向下甩，你就会发现，跟酒店的一模一样",voteCount:187},{author:"(匿名)",content:"怎么做到刷牙的时候敷面膜",voteCount:173},{author:"(匿名)",content:"这个已经是习惯了。 自律是很消耗意志力的，如果最后没有养成习惯，最终也会放弃。",voteCount:154},{author:"(匿名)",content:"十分认同！",voteCount:47},{author:"(匿名)",content:"谢谢分享，感觉对我很有帮助",voteCount:44}]},{id:"453688121",question:"有一个「不上进」的男朋友是种怎样的体验？",author:"木人看花鸟",voteUp:34800,excerpt:"我长的一点也不帅，工作一般，家里又没钱，想找个富婆养我是不可能了，所以我要找个有上进心的女朋友，和她结婚，这样等她将来事业有成的时候，我就可以顺理成章地享用她的财富，还会被人夸有眼光会识人，还免去了和其他帅哥竞争富婆的残酷斗争。 为了达到我的目的，我要天天鞭策她，逢人就说她没上进心，不努力，她取得一点成绩我就给她泼凉水，她和别的成功女士比较，不能让她松懈，我还在知乎上发文“有个没上进心的女朋友是…",content:`我长的一点也不帅，工作一般，家里又没钱，想找个富婆养我是不可能了，所以我要找个有上进心的女朋友，和她结婚，这样等她将来事业有成的时候，我就可以顺理成章地享用她的财富，还会被人夸有眼光会识人，还免去了和其他帅哥竞争富婆的残酷斗争。
为了达到我的目的，我要天天鞭策她，逢人就说她没上进心，不努力，她取得一点成绩我就给她泼凉水，她和别的成功女士比较，不能让她松懈，我还在知乎上发文“有个没上进心的女朋友是一种什么样的体验”来羞辱她，这一切都是为了她好，为了我们的将来。
这样她就能像牲畜一样每天起早贪黑的奋斗，给我争取财富，我们的生活也会越来越好。万一哪天她猝死了怎么办？还别说，我还真的认真思考过这个问题，她死之前怎么也能赚到不少财富了，死就死了，到时候我有了钱，再找个更漂亮更“上进”的就行了。
嗯，完美的计划。`,grade:"S",commentCount:2651,comments:[{author:"(匿名)",content:"赞一个，黑的不留痕迹",voteCount:11167},{author:"(匿名)",content:"完美的计划啊，要不要建个群交流下流程、心得？名字就叫资源共享",voteCount:5649},{author:"(匿名)",content:"反向答题，稳中带皮",voteCount:4707},{author:"(匿名)",content:"把男女对调一下，就是现实中常见的故事了",voteCount:4107},{author:"(匿名)",content:"你是魔鬼吗哈哈哈哈",voteCount:3941},{author:"(匿名)",content:"来人啊，我的意大利面呢",voteCount:2939},{author:"(匿名)",content:"二营长，你他娘的意大利......面呢？快给友军端上来！！！",voteCount:2803},{author:"(匿名)",content:"呵，男人",voteCount:555},{author:"(匿名)",content:"666五体投地",voteCount:348},{author:"(匿名)",content:"嗯嗯，好的，好主意",voteCount:198}]},{id:"562772745",question:"有没有比逻辑思维更高级的思维方式？",author:"谢春霖",voteUp:32007,excerpt:"首先，逻辑思维能力只是基础 如果你的逻辑思维能力不行 ，在思维模式这条路上，可以说还没有入门，它就像造房子用的「砖瓦」，如果砖瓦的质量不行，你是造不出摩天大楼的，就算碰巧造出来了，也会是个豆腐渣工程，一推就倒！ 那如果你已经能够锻造出坚实耐用的砖瓦后 ，下一步，该如何建造摩天大楼呢？ 如果把逻辑思维比作是一维的线性思维 ，那么比逻辑思维更高级的思考方式有两种： 二维/三维的结构化思维：用立体视角，360°…",content:`首先，逻辑思维能力只是基础

如果你的逻辑思维能力不行，在思维模式这条路上，可以说还没有入门，它就像造房子用的「砖瓦」，如果砖瓦的质量不行，你是造不出摩天大楼的，就算碰巧造出来了，也会是个豆腐渣工程，一推就倒！

那如果你已经能够锻造出坚实耐用的砖瓦后，下一步，该如何建造摩天大楼呢？

如果把逻辑思维比作是一维的线性思维，那么比逻辑思维更高级的思考方式有两种：

二维/三维的结构化思维：用立体视角，360°观测一件事的全貌，拆解事物的内部结构

 四维的系统性思维：一种加入了时间轴的动态思考，除了能拆解问题的当下，还能预测到它的过去与未来……

这里，我先来说一下「结构化思维」

请你花 10 秒钟的时间，记住以下的 20 个数字：

71438059269250741863

好，我们再来试一组数字，还是花 10 秒钟来记住它：

99887766554433221100

其实这两组的 20 个数字是一样的，但是不是觉得第二组一下子就记住了？

为什么会这样？

因为第二组数据更符合我们大脑的使用习惯，数字与数字之间有清晰的逻辑和结构。

我们大脑处理信息有两个规律：

太多的信息记不住。

 喜欢有规律的信息。

你有没有遇到过这样的情况：有人口若悬河地和你讲了半天，他说的每个字你都听得懂，然而组合在一起，你并不知道他想说什么，内容没有逻辑，语句没有重点，就像刚才那一串杂乱的数字……

听他说话时间一长，你甚至开始头疼，变得焦躁，心里骂道：「你 TM 到底想说什么？」

你别觉得听着难受，讲的人，他自己也许更难受！

明明心里有很多想法，甚至做了上百页的 PPT，但就是讲不清楚……为什么会这样？

因为思维没有结构。

我们思考问题的时候，脑子里的想法会不断地涌现出来，看似很多，却杂乱无章，就像是衣橱里的一堆没有整理的衣服，堆砌在一起。

当有人问你，你能说说你有哪些衣服吗？

「嗯…….我有很多衣服（想法）……」

 能详细点说吗？

 「我有一条蓝裤子，一条橘黄色裙子，一件白衬衫，还有件灰白条纹衬衫，一条牛仔裤，一条蓝色竖条纹的裤子，还有顶黑色的帽子，哦对了，还有一条蓝色裤子（这个刚才好像说过了）……」

 ￥#%@#￥%@……你到底有些啥？

 「我刚才说的都是我有的啊……」

如果你的思维没有经过整理，就会像这堆乱糟糟的衣服，你拥有它们，却无法理解它们！

那怎么办？如何让思维变得既全面又有序呢？

你需要结构化思维。

所谓结构化思维，就像是把衣橱里的这些衣服分门别类地整理好。

比如按季节分类，按穿着场合分类，按服装风格分类……

这时候，别人再问你：你有些什么衣服呢？

你回答：

我一共有 208 件装备，分为：

夏季、春秋季、冬季 3 大类；

 每个季节的衣服又分为工作装、休闲装、宴会装、运动装 4 大系列；

 其中，休闲装里有田园、淑女、简约 3 种风格；

 每种风格的衣服，拥有深色、浅色各 3 套搭配；

 另外配了 4 双运动鞋，5 双皮鞋，6 双休闲鞋，7 个包包，8 顶帽子来应对不同需要……

是不是听着清楚多了？

并且，当你需要使用这些整理好的衣服时，也会变得很方便。

比如，今天你想要和男朋友晚上去一个 party，那么你不需要再从所有的衣服里翻来覆去地寻找，一件件试穿……

而是直接在已经分类好的衣橱中，找到宴会装区域，从里面拿起一套适合的即可。

把你的想法和思维内容，像整理衣服一样，分门别类地安放好，组成一个结构分明的整体，方便日后的理解、存储、使用。这个，就称为「结构化思维」。

一、学会结构化思维，有什么好处？

如果你能够习惯用结构化的方式进行思考，你的思维能力、沟通能力、学习能力都将获得大幅度的提升。

比如，公司的线下门店，生意突然下滑，怎么办？

如果你不会结构化思维，你可能会这样说……

有结构化思维的人会这样表达……

思路清晰，考虑周全。

再比如，你们公司近期要举办一场大型的相亲活动，你是项目的负责人，目前正在召开项目工作会议，老板请你介绍一下本次活动目前的安排。

如果你不会结构化思维，你可能会这样表达……

有结构化思维的人会这样表达……

是不是感觉整个表达逻辑非常有序，层次分明？

除了表达和思考，结构化的能力还能帮助我们提高学习的效率，比如我问你：过去一年，你都学了些啥呢？

如果你不会结构化思维，你可能会这样回答……

有结构化思维的人会这样表达……

怎么样？是不是感觉很不一样呢？

好，说了那么多结构化思维的好处，那么，我们如何才能拥有这种能力呢？

接下来，我就带你从最基本的地方开始说起，帮助你快速学会结构化思维。

试想一下，有一天，你驾驶着自己的汽车，在路上游荡，汽车突然停下，发出轰轰的巨响，无法行驶，怎么办？

是哪里出了问题？轮胎？轴承？发动机？油箱？还是有只猫在车里作怪？

一辆汽车，拥有上万个零件，当你发现汽车的行驶功能出现故障时，如果你不是专业修汽车的，你根本不知道是哪个零件出了问题，你能想到的也是这上万零件里的一小部分……

那怎么办？

你一通乱试后，最终无果，只得叫来拖车，将汽车送入了修理厂……

师傅一看，说：小问题，你稍等片刻……

然后咔咔咔，不到一局《王者荣耀》的时间，就把车给修好了！

为什么能那么快？

不是有上万个零件吗？

如果逐个检查一遍，至少也需要一天的时间啊，这还不算更换和维修的时间！

师傅为什么能那么快？

因为：结构！

在维修师傅的眼中，汽车并不是由上万个零件拼接而成的，而是「结构化」的：

有了结构，师傅就能由局部到整体，快速判断可能导致问题的所有区域。

 有了结构，师傅就能由混乱到有序，以模块为单位进行整块整组的排查。

 有了结构，师傅就能由复杂到简单，将大问题切成多个小问题逐个击破。

透过结构看世界，你就拥有了化繁为简的能力！

结构化思维，关键就在于「结构」二字，如果你能找到复杂问题背后的结构，就能像修车师傅那样，将问题化繁为简，变成若干个小问题，从而更快速地找到解决方案。

那么，我们该如何将一个问题结构化呢？

二、结构化思维的步骤

第一步：明确目的，找到分解角度

所谓的结构化，是不是就是把问题拆散、切碎，然后再分类汇总就行了？

比如刚才整理衣服的例子、汽车零件的例子，就是把一个整体，拆分成一个个小零件，然后根据小零件的属性，进行了分类汇总。

真的是这样吗？

并没有那么简单……

将一个「整体」拆成一个个独立的「要素」，再将一个个「要素」组合成一个整体，其实可以有很多种组合方式。

比如刚才的汽车零件，你也可以把它们按材质分类，方便垃圾回收；

 或者按生产零件的厂家分类，方便返厂维修；

 或者按头部、身体、四肢的构造分类，就能组合成一个大黄蜂……

同样的要素，组合成不同的结构，就能实现不同的功能和目的。因此，结构化思维，并不是简单地做个分类汇总，而是要明白分解后，以什么方式组合，要达成什么目的。

所以，我们得在问题分解之前，先弄清楚分解的目的是什么，然后根据目的进行拆解与结构化。比如说，对于一个项目：

如果目标是分析进度：那就按时间进度、过程阶段来分解；

 如果目标是分析成本：那就按工作项来分解；

 如果目标是分析客户：那就按性别、年龄、学历、职业、收入等来分解。

第二步：按 MECE 原则，组成结构

确定了分解目的，然后我们就要开始搭建结构了，先说一种最基本的结构形态：金字塔结构。

什么是金字塔结构？

简单来说就是，先确认目标问题，再根据分解的目的，将问题分解成不同的类别，类别下再放入对应的不同要素，这样逐层分解，最终形成类似于金字塔的形状结构。

并且，金字塔的每一层，都必须牢固，不能少一块砖，也不能多一块砖，不然整个结构就会垮塌，这个就称为 MECE 原则。

MECE 是麦肯锡著名咨询师巴巴拉·明托在她的著作《金字塔原理》中提出的核心概念，意思是：相互独立、完全穷尽。

也就是金字塔的每一层，内容不能有重复的部分，也不能有遗漏的部分。

比如，你把衣服分类为：春秋季服饰，职业套装。

这个就有重叠的部分：有些衣服既是职业装，也是春秋季服饰。

也有遗漏的部分：夏天穿的休闲服应该归到哪一类？

那么，什么才是不重叠，不遗漏，符合 MECE 原则的呢？

你可以按季节分：春秋装，冬装，夏装。

除了这 3 类之外，没有其他季节了，这个就是「不遗漏」；春秋的衣服差不多，所以归为一类，夏天的衣服，春秋冬穿不了；冬天的衣服，也不能归类在春夏秋这三个季节里，因此「不重叠」，符合 MECE 原则。

是不是有点听晕了？

不着急，下面我用一个例子来说明：

问题：如何在未来 3 个月完成 100 万销售业绩？

我们可以通过以下两种方式来构建金字塔结构：

方式 1：自上而下使用「演绎法」设计结构。

要完成 100 万的业绩，关键是客户，因此我们可以根据客户的类别进行划分，对不同客户类别采取不同的营销策略来完成业绩。

根据 MECE 原则我们发现，客户无非来源于三类：
使用 App 查看完整内容目前，该付费内容的完整版仅支持在 App 中查看
🔗App 内查看`,grade:"S",commentCount:754,comments:[{author:"(匿名)",content:"我一度以为知乎已经被“你婆婆有多讨厌”、“你老公最让你心寒的是什么”、“某某有多美”给占据了呢。这种文章才是知乎区别于其他论坛网站的重要因素",voteCount:1378},{author:"(匿名)",content:"感谢，谢老师，老师的文章一篇我要大概看十遍，理解能力比较差。一边回味一边记笔记，晚上睡觉还在脑子里面过一遍，希望能足能吸收老师的精髓！感恩！",voteCount:265},{author:"(匿名)",content:"即便内容付费我也不介意，质量好高啊！",voteCount:95},{author:"(匿名)",content:"这篇文章我有看过类似的，里面的很多案例都和这篇文章接近？",voteCount:63},{author:"(匿名)",content:"谢谢谢老师。没毛病。每周的更新值得读3遍以上，不过这种深度文章通常阅读和留言都会很少，因为太难了。咪蒙一类无脑文章才会常常10万+。",voteCount:35},{author:"(匿名)",content:"太棒了！相当好的文章。精简版“思考的技术”",voteCount:30},{author:"(匿名)",content:"透过结构看画同样有用，非常感谢！",voteCount:20},{author:"(匿名)",content:"金字塔原理",voteCount:19},{author:"(匿名)",content:"把之前知道的点串起来了，更加深了理解和记忆，就差运用了，感谢作者",voteCount:10},{author:"(匿名)",content:"[棒]",voteCount:8}]},{id:"29414843",question:"哪些思维方式是你刻意训练过的？",author:"温烟",voteUp:31009,excerpt:"绝大多数时候，凑合着做完，比完美地半途而废要好。 绝大多数时候，决定要做就直接开始，比自认为准备充分了再开始要好。 脑内山水千万里，不如脚下一步。哪怕是跌出去的一步。 这个思维方式是我花了很长时间很大精力去养成的，至今都没有完全贯彻到行动中去，但多少有点进步。如果能真正实行，拖延症估计就好了吧。",content:`绝大多数时候，凑合着做完，比完美地半途而废要好。
绝大多数时候，决定要做就直接开始，比自认为准备充分了再开始要好。
脑内山水千万里，不如脚下一步。哪怕是跌出去的一步。

这个思维方式是我花了很长时间很大精力去养成的，至今都没有完全贯彻到行动中去，但多少有点进步。如果能真正实行，拖延症估计就好了吧。`,grade:"S",commentCount:748,comments:[{author:"(匿名)",content:"完美主义拖延症病史3年重度患者手动点赞！",voteCount:1738},{author:"(匿名)",content:`绝大多数时候，凑合着做完，比完美地半途而废要好。
绝大多数时候，决定要做就直接开始，比自认为准备充分了再开始要好。
两句话胜过各种治愈拖延症的书了`,voteCount:919},{author:"(匿名)",content:"这个要分情况对待，试错成本小的，可以马上做。试错成本高的，还是要做基本的研究。",voteCount:522},{author:"(匿名)",content:"曾经抑郁过，终于快好了（撒花），在发病之前一直都认为完美主义是宇宙顶尖技能TUT",voteCount:300},{author:"(匿名)",content:"我可以理解为：如同写篇文章先把构思的粗略的大概写上，然后再丰富血肉和精化细节，而不是一次性就出一篇完美好文~么？",voteCount:225},{author:"(匿名)",content:"吾尝终日而思矣，不如须臾之所学也。赞。",voteCount:199},{author:"(匿名)",content:"共勉QAQ",voteCount:27},{author:"(匿名)",content:"说的太好了 TvT",voteCount:15},{author:"(匿名)",content:"就是做不到T.T",voteCount:13},{author:"(匿名)",content:"同",voteCount:6}]},{id:"79860188",question:"长时间坚持做一件事是种怎样的体验？",author:"程杰",voteUp:30273,excerpt:"长期坚持一件事，如果可以记录下来整个过程，结果就是会清晰地感受到那种不断进步的力量，那种化腐朽为神奇的力量。注： 多图预警，因为是在讲长时间坚持的体验，所以准备按月定期追加图片文字。请时常关注，谢谢！当前更新时间2017年8月。分享一下我孩子三年来学画画的经历。 三年前，也就是孩子五岁上中班时，我们让孩子到少年宫学画画。学了约半年，2012年10月13日，在那天画画课后，老师将孩子们课上画的画放到了台上让大家…",content:`长期坚持一件事，如果可以记录下来整个过程，结果就是会清晰地感受到那种不断进步的力量，那种化腐朽为神奇的力量。
注：多图预警，因为是在讲长时间坚持的体验，所以准备按月定期追加图片文字。请时常关注，谢谢！当前更新时间2017年8月。
分享一下我孩子三年来学画画的经历。
三年前，也就是孩子五岁上中班时，我们让孩子到少年宫学画画。学了约半年，2012年10月13日，在那天画画课后，老师将孩子们课上画的画放到了台上让大家比较感受一下。我在窗外拍了当时的场景。

所有孩子都是白纸一张开始学画画的，我作为家长其实也很期待孩子有一个比较好的表现。所以看到这些各式各样的头像，我的感觉除了中间一张以外，其他都各有特点，是可以接受的。
可惜……那张我用成人眼光看非常糟糕，涂抹得很厉害的画就是我儿子画的。见下图。

这是什么鬼？
这是什么鬼？
这是什么鬼？
我当时的糟糕心情，现在依然能清楚记得。也许你无法完全理解，但你可以想象一下自己不得不承认失败的感觉。
可能有人说，这画也有特色啊，不拘泥原形，用色大胆。但我知道，这其实就是他画好一部分后，开始放纵自己顽皮，没有克制的随意涂抹颜色的结果，或者说，就是不理解什么才是美。
当然，我承认不应该用过于功利的眼光来看待儿童的绘画。不过在当时，得知这就是自己儿子画的画时，我还是很失望的。
当天课后，我和老师沟通了一下。老师的说法，孩子画画很一般（这个我完全能理解，画成这样还说一般已经是比较客气了，应该就是不行的意思），多培养认真专注的习惯，否则上小学学习就比较麻烦了，画画不是很重要的事。老师的好意，我还是理解的。孩子因为坐不住，画画上容易乱来，不够专注，或许有暗示我们不用继续学的意味。
过后我们确实一度有打算上完这期后就放弃画画的想法。但多次反复问孩子，是否喜欢画画，他都给出了肯定的回答，那作为家长还能怎么办？只能继续坚持呗！
2012年12月1日，儿子对我说，他画了一个故事，拿过来给我看。我以为是多么复杂的东西，原来就是下面这样的图案。儿子的说法，这些是即将要孵出小恐龙的恐龙蛋。

好吧，虽然谈不上好，但也是一个有想法的小作品。我就借机问他，是否可以做到每天画一个故事给我们看，他居然同意了。
你知道吗？他居然同意了。
一个承诺，张口一句话，说起来很容易，但是这个承诺，需要无数的时间精力去兑现才有意义。
于是……于是……于是……时光飞逝，一晃三年过去了。

三年36个月一共803张，平均每月22张。因为涉及到旅行在外、节假日早出晚归、作业特别多等各种特殊情况，现实是做不到每天画的。不过当同年龄孩子以玩手机游戏、看电视动画片来作为家庭休闲娱乐方式时，我们孩子可以把画画当作爱好无功利地去喜欢，有空就画一张，这个已经很值得让我骄傲了。

目前孩子八岁，在临摹的笔法控制、色彩搭配等技巧上依然极其普通（画画好的孩子实际上是非常多的），用对成人要求的眼光看，这些画没有什么价值。但大量的涂鸦确实训练了一定的想象力，对未来学习真正的绘画打好了一个比较好的基础。
一些孩子的原创作品
《围城》

《鲸鱼聚会》

上面这张图我本以为是高空俯视图，没太多稀奇。在我发了微信朋友圈后，有人提醒我，这是一张以海底仰视视角画的图（可以通过右下角那条鱼和船桨判断），我才发现这张画的独特之处。从来没有潜水经历的儿子可以想象到如此场景，还真是让我惊讶。
近期的一些临摹作品
《圣诞老人》
《撑伞姑娘》
《蓝鲸》

今天再次回忆起那三年前着急上火的情形，不觉感慨，被认为没有天赋又有什么关系，一天天画下来，也可以画好的。
把过程记录下来，看着孩子的画在慢慢地进步，确实非常欣慰，而且这种欣慰会促使我不断鼓励孩子继续努力下去。这是长期坚持后的一种平淡却恒久的美丽体验。
写下这些文字，也是希望激励那些已经放弃，或准备放弃爱好的朋友，可以拾起兴趣，继续努力，继续加油，并坚持下去！
因为——坚持真的存在力量，做任何事都是如此！
--------------发文两月分割线--------------
目前收到了超过五千个赞和344条评论，非常感谢大家的鼓励。孩子在寒假期间画画更起劲了，给大家看看孩子近期的画作。
原创作品
上图借鉴了游戏《纪念碑谷》的某个造型

临摹《Doodle Invasion》中插图，自己涂色作品
上面这张原图并没有这么多小人，孩子把大蘑菇画歪了（孩子临摹能力还不够好），造成右侧下方很空，重心不稳，所以自己添加了多个小人和蘑菇，其中的小超人挺有趣。

------------发文8个月后分割线-------------
目前收到了超过一万个赞和614条评论，非常感谢大家的鼓励。孩子在这半年间又画了不少作品，分享给大家，也算是来一起见证一下孩子的成长。
临摹+原创《家》

临摹各种鸟

其他临摹作品
临摹《外星人飞行器》
临摹《家中一角》
临摹《达芬奇的速写头像》
实物速写《相机》

原创作品

以上是选了一些孩子比较好画作，不好的要多得多。
其中临摹作品，是有老师或我们家长指导的，虽然大人没有动手帮助，但会指出很多错误让其修改完善，相当于四只眼睛一支笔在完成，所以不能算孩子的独立作品。孩子自己的原创作品则完全由他发挥，没有任何干预。

个人认为，技巧的练习是可以不断完善的，不用过于着急，但想象力的训练——那种随意的下笔的自信是不能停息的，否则孩子很容易失去天马行空，无所畏惧的创作能力。所以每周让其尽量多的想象画是很有必要的。
慢慢画下去，我相信孩子会有更好的作品出现。
-------------2016年9月分割线--------------
暑假期间，孩子画了一些不错的作品。
临摹作品
原创作品

原创《Up Is Down》
该作品获得上海市动漫大赛一等奖

半年统计

截至2016年5月，半年内又画画95张，三年半42个月一共898张，平均每月21.38张（之后数据2016年12月再统计）。
-------------2016年10月分割线-------------
临摹作品

-------------2016年11月分割线-------------
原创作品

-------------2016年12月分割线-------------
临摹作品

原创作品

截至2016年11月，半年内又画画96张，四年48个月一共994张，平均每月20.7张（之后数据2017年6月再统计）。

-------------2017年1月分割线-------------
跨年原创作品，可以理解为“2016去死吧”

-------------2017年2月分割线-------------
临摹作品

-------------2017年3月分割线-------------
临摹＋原创

------------2017年4～5月分割线------------
原创《The Dream World》
此画已经被选入2017年上海市学生书画大赛，并获得二等奖

-------------2017年6月分割线-------------

临摹+原创《狗狗的梦》（又名《单身狗的梦》），此画参加上海市艺术单项比赛，获得市级金奖第一名。

-------------2017年8月分割线-------------

临摹+原创，此画参加主题为“一带一路”的2017年上海市动漫大赛区市级二等奖 
-------------2020年7月分割线-------------
-------------2021年4月分割线-------------
《众人拾柴火焰高》，灵感来自做核酸排队-------------2022年7月分割线-------------

另外强烈推荐我写的关于《兴趣是如何产生的》的文章（见https://zhuanlan.zhihu.com/p/24822387），或许你就理解为何我会这么做了。

——————————————————————————————

孩子最终考上了 上海大学 上海电影学院 动画 专业，也算是实现了自己的梦想。感谢所有点赞收藏评论支持的朋友。`,grade:"S",commentCount:1559,comments:[{author:"(匿名)",content:"我除了点赞，都不知道如何评论了。",voteCount:2521},{author:"(匿名)",content:"原来这也只是极其普通。。。以我小时候对画画得热爱，要是能画成这样，我就毅然决然的去考美术生了。。。还好没有。。。",voteCount:906},{author:"(匿名)",content:"天哪画的太好了！完成度超级高！",voteCount:596},{author:"(匿名)",content:"一路翻下来，细细的看，由最初的懵懵懂懂到愈渐成熟再到如今的有模有样，我作为一个萍水相逢的路人，真的看得非常感动。相信孩子在一路走来的过程中不但收获的画技和一种良好的习惯，更是有了一段无法割舍的情怀，以至于以后回首望去时，可以寻着这样一条“波浪式前进，螺旋式上升”的路看到自己的过去，以及自己一路成长的踪迹，这份弥足珍贵的经历是没有这种经历的孩子所无法想象的。家长也是非常用心，把孩子的画作都整整齐齐收藏好，也都拍照留念，非常值得学习。祝福孩子能有一片远大前程，前路是一片广阔的星辰大海。",voteCount:428},{author:"(匿名)",content:`再次感谢各位的支持和鼓励！发文8个月后，到今天为止，收到了超过10000个赞和614条评论。孩子在这半年间又画了不少作品，分享给大家，也算是来一起见证一下孩子的成长。

孩子的临摹作品，是有老师或我们家长指导的，虽然大人没有动手帮助，但会指出很多错误让其修改完善，相当于四只眼睛一支笔在完成，所以不能算孩子的独立作品。孩子自己的原创作品则完全由他发挥，没有任何干预。

个人认为，技巧的练习是可以不断完善的，不用过于着急，但想象力的训练——那种随意的下笔的自信是不能停息的，否则孩子很容易失去天马行空，无所畏惧的创作能力。

慢慢画下去，我相信孩子会有更好的作品出现。`,voteCount:389},{author:"(匿名)",content:"一直以为天赋更为重要，懊恼自己没有任何天赋，也没能给孩子遗传到天赋，却忘记了坚持的力量。感谢楼主，重新燃起了信心。",voteCount:376},{author:"(匿名)",content:"正确的坚持是成功的必要因素",voteCount:324},{author:"(匿名)",content:"比我现在画的都好！ps我小学6年都是学习名列前茅，小学在课外班学画2年，初中蹭课1年。真的比我现在画的都好，完成度特别高！看开头还以为答主要说“后来我就自己也开始学画画”，其实答主要是自己试试就知道，下笔很难，你可能画的比这更没有想象力",voteCount:215},{author:"(匿名)",content:"你儿子明明是个天才好吗？从小就对作画的整体结构和颜色搭配那么敏感。所有作品完成度都那么高。顺便我可以给你分析一下你儿子最早那张画的成因，当一个人脑子里有很多东西想要画但是又没有绘画技巧去表达的时候就容易对自己作品的整体感产生厌恶，我想他涂起来大概是不希望让别人看到他自认为画的不好的作品（你儿子从小就有对美感的超级追求），因为我以前也有和你儿子一样的习惯，一直坚持到初中留学，我的作品里也有很多被这样涂抹的东西，别人问我为什么要擦掉？为什么要撕掉？为什么要涂花的时候，我实话实说，因为我不满意，也不想被别人看到。",voteCount:157},{author:"(匿名)",content:`之前记得有本叫《五天学绘画》的老书里头好像有一小部分多少探讨过小孩习画阶段的事儿， 想起好像里面说 小孩子一开始画成那样其实应该也是一种蛮正常的现象.....和他对图形和空间的理解能力的成长似乎有很多联系~~（而且会随着成长产生新的变化） 
另外我发觉，小孩貌似在紧张的状态下很不容易画出“好”画（或者说是让她自己都满意的东西） ，而自由且更放松的状态下的随性的涂鸦，反倒更容易将他内在的感受和奇想流动出来，所以看来多接触纸笔多保持无鸭梨的涂鸦心态也应该挺关键且有意义的说~~ 
不过我还是想说： 画得真多 真好 真厉害！
突然意识到 ，即便是很小年龄段的 保持练习量+认真对待每一幅画作， 也着实是能让作品达到一定的品质啊（能看出来很细心呢ToT 而且我觉得画得真在同龄段里应该算很精致很很认真的段位了啊）
总之还是想感叹下：着实棒极了 印象深刻`,voteCount:151}]},{id:"763195787",question:"有哪些值得长期坚持下去的好习惯？",author:"尤加利",voteUp:29022,excerpt:"介绍下自己，97年，但是已经被身边同龄树为健康生活标杆…把我从小养成的每天的一些习惯在这里分享一下～ ❗️ 超长篇预警哈——包括运动、生活、护肤、养生四类，每一条都有详细的解释，另外我每天都会在知乎想法里面更新一些护肤养生小知识，可以关注我～ @尤加利 [图片] …以下是原文… △【健康] 1、早起一杯温开水这个必须要做到哇，人体经过一夜的睡眠，在呼吸排尿过程中消耗大量水分，早上起床体内处于…",content:`介绍下自己，97年，但是已经被身边同龄树为健康生活标杆…把我从小养成的每天的一些习惯在这里分享一下～
❗️超长篇预警哈——包括运动、生活、护肤、养生四类，每一条都有详细的解释，另外我每天都会在知乎想法里面更新一些护肤养生小知识，可以关注我～ @尤加利
嘻嘻，糊照求关注…………………以下是原文………………
△【健康]
1、早起一杯温开水
这个必须要做到哇，人体经过一夜的睡眠，在呼吸排尿过程中消耗大量水分，早上起床体内处于一种生理性缺水的状态，这时饮用，既可以补充水分，也可以洗涤肠胃。

2、必须吃早饭 
这个简单的事情，我身边有90％的人做不到，与其劝诫你们一定要吃，不如直接把危害摆在你们眼前——
①不吃早餐老得快 ，不吃早餐，人体就会动用体内贮存的糖元和蛋白质，久而久之，会导致皮肤干躁、起皱和贫血等，加速人体的衰老。
②人体经过一夜的睡眠，体内的营养消耗殆尽，血糖浓度处于偏低状态，不吃或少吃早餐，不能及时充分补充血糖浓度，上午就会出现头昏心慌、四肢无力、精神不振等症状，容易出现低血糖休克）
切记！三餐是健康身体的基础步骤❤
贴一张早餐图~

 我有写过一篇早餐制作回答~
在家怎么做早餐好？

3、学会做饭，提升厨艺
很多宝宝可能会觉得做饭麻烦，但是说真的，自己做饭真的要比叫外卖干净许多，因为所有的步骤都是你自己在做，你清楚什么东西对身体有益什么东西不是很好，但是外边的饭菜不会去考虑这么多。会为了色与味，加很多调料，对肝有很大负担。
几只洋葱、几片肉，一炒变出一个菜，这是艺术，更是渗透在生活里不浮躁的烟火气。

4、一日三餐，细嚼慢咽
不经过咀嚼的食物，会很艰难的在肠道中走过，增加肠道分解食物的工作量，而经过反复咀嚼的食物，会把食物磨碎，让胃在宽松的环境下工作，减少了胃的工作量，更加有利于营养吸收。
另外美国的一项研究表明，吃得慢让人不容易有饥饿感，有助减少热量摄入，两组人员在细嚼慢咽后出现饱腹感的时间更长，更不容易出现饥饿感。
总结来讲，细嚼慢咽不容易增加肠胃负担，而且还不容易胖～
不信的话试着把每一口食物在嘴里咀嚼15下再吞下去哈哈，相信我你吃几口就饱了 。

6.注意控油，控盐
（我们日常的调味品，耗油，生抽，酱油等都含有盐哈baby们）
健康成年人日摄油量是25~30g，盐＜6g。油盐摄入过多，年轻的时候可能也就是一些皮肤体重上的表现，皮肤粗糙，长痘痘，油脂分泌旺盛，肥胖啦等等，慢慢累积到老，就是高血压糖尿病慢性病。而一旦得了慢性病，就难治愈了。
所以日常喜欢做饭的新手宝宝，无法熟练掌控油盐量，最好买个控瓶哈

6、戒糖戒饮料
先解释一下可能很多宝宝比较困惑的一点
糖化反应：是指肌肤因为新陈代谢过慢，导致多余的糖分整日里在血液中游离，过多的糖分会附着在胶原蛋白上，使胶原蛋白断裂或紊乱，肌肤便会出现皱纹、粗糙。通俗的讲，就是如果不控制的喝饮料，吃甜食会老的很快。
而且喝多碳酸饮料，老了以后特别容易骨质疏松的哦

7.每天都会喝花茶
接上条，其实很多习惯喝饮料奶茶的baby，可能多数是不爱喝白开水星人。是的我就是其一…
本身就不怎么喜欢饮料奶茶，就会选择喝花茶来替代。养生快乐水儿啊~而且花儿果实，女孩子很养颜哇~我的肤色暗黄暗沉，也是因为喝了花茶慢慢变好气色的。
我有写过一篇详细的适宜花茶匹配人群，感兴趣的baby可以看一下~~
女生喝什么花茶比较好?

7、一定会睡午觉，时间在20～30分钟
从小养到大的习惯之一，午睡的好处相信大家都清楚，保护心脑血管，给大脑充电等等这里不多阐述，不过要注意的一点是，不管是夏季还是冬季，午睡时间都要控制在30分钟内，小休憩一下就好～

8、每天都会吃芝麻丸子
其实是很适合现在的熬夜脱发女孩的…我不太脱发，但是发质不太好，经常毛毛躁躁的，还分叉，吃了一个月左右的芝麻丸子，头发现在乌黑好多~

9、定期体检，有不适状况及时检查
这个非常重要！一个真实栗子。我好朋友去年夏天腰疼到不行去医院检查，检查出来是腰间盘突出压迫神经，跟我说的事后我还不相信，毕竟那段时间“大家都是腰间盘，为何你如此突出”的梗很火，然后他还真就腰间盘了我的娘。
做完手术他跟我说了很多，第一次做手术的恐惧，还有就是一点，现在很多医院觉得你的情况严重的话，不会像电视剧里演的一样通知你的亲属，而是直接告诉你，让你签字，非常直接的就通知了他下半身可能会瘫痪。我想如果是我的话应该会直接晕在那里吧，他还算镇定，但做完手术就全是后怕，想想就知道了啊，他才20岁，一个人应对了自己可能会瘫痪的事实，签字，进手术台……（他是去外省实习，朋友陪着去体检的但是只能在外面等着，他一开始只是觉得腰不舒服，没怎么重视就没及时通知父母）手术是很成功，但是这整个过程足够他后怕好一段时间了，我跟他打电话他头一次话痨了好长时间，跟我叨叨一定要定时体检，注意养生……整的我整个人都跟着害怕了起来，赶紧去吃了一个苹果压了压惊。
但是他很成功的影响了我，今年月初的时候我腰疼了一整天，动都不敢动的那种，呼吸都疼（想来是心理作用占据很大一部分）直接奔医院，拍了片子——
然后结果是，受凉引起的腰肌劳损…开了一副药吃了两天好了。
其实如果是以前我会觉得我特别小题大作的矫情，但是18年经历的种种，我男朋友住院，住院过程中隔壁床突然查出绝症、好朋友做手术，身边亲人逝世……
感觉健康还真的不是随随便便就能拥有到老的一样东西，反倒是所有愿望里最难实现的。好了不啰嗦啦，说这么多，就是一句重点。
一年一次体检，身体不适超过三日马上去医院，照顾好自己才是最重要的！身体是一切革命的本钱！

10、经常吃西蓝花、紫红薯，小南瓜等抗氧化食物和各式绿叶蔬菜
我摄入较多的绿色蔬菜里，西蓝花排第一，谁让他是在低脂低gi食物中含有抗老抗衰元素的又维生素A与维生素C排名都靠前的食物呢！
还有紫红薯，除了拥有普通红薯的营养成分在，还富含丰富的硒元素和花青素啊，抗疲劳抗衰老抗氧化这三者女孩子必备啊！

我有时候晚上不想做饭，就会蒸一锅紫薯和小南瓜，好吃还营养，最主要的是…
饱腹感强！！简直女孩子们的必备哈哈

11、起床的问题必须重视起来
真的是有注意到身边太多的人，家人朋友舍友，早上闹钟一响马上被惊醒，猛的就坐起来开始穿衣服，虽然我知道如果赖床，缓慢换衣服会上学迟到，上班晚点……
但是宁愿早订5分钟的闹钟，也不要再这样了宝贝们，
人们在睡眠时，各项生理机能维持着“低速运转”。早晨醒来，呼吸、心跳、血压、肌张力等迅速恢复“常速运转”，引起心跳加快、血管收缩、血压上升。所以醒后立即下床，对心脏造成负担，甚至诱发心血管疾病。而且很容易出现心慌头晕的状况，我就是个活生生的例子……
所以总结一下，闹钟响过之后，在床上躺至少5分钟再起身，然后缓慢的穿衣下床，去做别的事，为了身体健康，一定要养成习惯！❤

12.养成去湿气的习惯。
经常长痘痘，t区以及头皮油脂分泌旺盛，早上起来脸大一圈，口臭脾胃差，大便沾马桶…这些都是湿气存体的表现。
湿气的累积根源简单来说就三种：摄入寒凉过多，居住环境湿度大。熬夜。
大家可以检查一下自己有没有~有的话自动喝起祛湿茶哈

，然后晚上多泡泡脚关于泡脚的注意事项，我有专门写：

【护肤方面】
致评论区baby：整理好了！适合不同肤质的完整护肤流程！（我写了整一周终于！
怎样才能用最少的钱把皮肤养好？ 先说下基本的护肤流程，要清晰，每一步都不可或缺 早：洁面—爽肤水—眼霜—精华—乳液—面霜（油皮慎用）—防晒 晚：卸妆—洁面—爽肤水—眼霜—精华—乳液—睡眠面霜
 1、四季都要防晒 春秋紫外线不强烈spf值35以下，冬季或者日常在家spf值15，夏季spf值35以上（根据紫外线指数），海边旅游或者出行spf50,pa＋＋＋，并且随身携带防晒喷雾。两小时一次。
 2、把脸部护肤“拍拍拍”变成“敷敷敷” 湿敷5分钟相当于拍脸20分钟（这里要说明两点，湿敷次数频繁确实会造成脸部角质层脆弱，所以时间最好是隔天一次，一次5分钟，痘痘肌的宝宝们不要去湿敷，等痘痘全部消下去，皮肤屏障完好的情况下再进行哈）
》回复评论宝贝私信，湿敷化妆棉我用的是下图链接里面的木乃伊化妆棉哈，因为拉伸性强，一张就能敷了额头，普通的化妆棉，一弯腰或者活动大了就会掉…让人焦虑！

3、洗脸问题重视起来 1.不要频繁洗脸。会破坏皮脂膜，使皮肤变得干燥，敏感； 2.洁面乳的选择—— ①油性肌肤，氨基酸洗面奶和皂基搭配使用，（一周一次皂基就可以）这样的话会在不很刺激皮肤的基础上很好的清理脸上的油脂； ②干性皮肤，氨基酸洗面奶； 3.洗脸工具，有很多，像是洁面仪，洗脸刷等等，四个字，因人而异，角质层很薄，又敏感肌，脸上有痘痘这些状况不要用，更加损害肌肤。但是我个人最推荐一款，所有肤质通用，起泡网哈哈～看下图片： ❤（注意：不管使用那种洁面工具，都不要吧洁面乳直接用在脸上，长久对皮肤有一定刺激性，相同的还有打泡瓶，我买了两款，旅行的话就带着起泡网，在家就用打泡瓶）
△选择用打泡瓶的宝贝们。我一定要跟你们说，打泡瓶因为自制的缘故，虽然卖家都会说可以使用一周左右，但是我建议制三天的量就好！自制的东西本来就容易产生细菌。所以可千万别一劳永逸哇～

4.把毛巾换成一次性洁面巾——挂在洗手间里久湿不干的毛巾有利于各种微生物滋生，用湿毛巾洗脸擦脸无异于向脸上涂抹各种细菌，这里可以自动想象一下
(在家可以用这个，一次抽一张，可以用超久)
(我有时候出去，就会带压缩的，旅途无忧哈哈哈)

 4、认真去角质并涂身体乳 脸部一周一次，敏感肌要慎重，想要拥有白花花又嫩嫩的肌肤一定熬每天擦身体乳！
 5、注意脖子的保养 建议身边有小镜子的女孩子打开镜子照一下自己的脖子，是不是很多都是这个样子的——
女孩子们切记！一条颈纹老十岁啊！！！
而且就算是很多明星也会忽略到这一点，像是FBB
脖子的护理上一定要重视起来，在认真给脸部拍水的同时注意下脖子，天鹅颈不是一日养成的～记住一句重点，像护理脸部一样护理脖子～
△△颈霜的作用跟面霜的作用差不多，想要靠颈霜恢复自己的天鹅颈的宝贝，还是去做嗨体吧，日常除了涂水乳霜，最好叠加上刮痧板，给淋巴排排毒，效果会好一点
(我用的是60块的牛角板，真没发现和300多的刮痧板啥区别……

6、不要天天敷面膜 天天敷面膜会扰乱皮肤的保湿机制，降低角质层的屏障能力，皮肤会处于一个相对脆弱的状态，容易引发过去没有过的过敏。【正常的一个时间段——3天一次，每次不超过15分钟，敷完必须洗脸，脸上有痘痘不可以敷，敏感肌要慎重选择面膜】

 7、敷完面膜一定要洗脸 敷完面膜后的面膜液在脸上自然风干的话，20－30分钟都不被吸收完全，面膜液中的高分子增稠剂成分，可能会对后续护肤品中的某些有效成分造成阻隔，护肤效果会受到影响 通俗的来讲——也就是说我们敷面膜的过程中，面膜中的精华和营养成分基本上肌肤能吸收的已经都吸收了，剩下的是饱和于肌肤吸收状态的多余的精华，敷完以后洗脸能让皮肤更好的呼吸和吸收接下来基础护肤品里中的营养和精华。不容易造成搓泥的效果。

 8、涂护手霜 写到这里是一个很值得开心的事情，我坚持每天洗完手涂护手霜应该半年了，手上皮肤真的有细腻光滑很多，建议宝宝们买一款自己喜欢的味道的护手霜，这样每天涂都有动力～

 9、眼霜过了18岁就要入手了 虽然这个也根据眼部的不同状态来定，但是因为眼部的肌肤比其他部位薄，所以很容易因为干燥而产生眼纹。所以最好尽早去做好眼部的皮肤管理。
具体的也写好了！！
你用过哪些万年安利的眼霜？你知道眼霜的有效成分吗？

10、定期敷脚膜去老茧
其实我很早就有看到很多明星在推荐去脚底角质的产品，撕下一层层皮然后说“好爽”我个人只觉得瘆得慌……所以一直没觉得是必要的，直到我晚上睡觉听见了自己的jio跟新换的冰丝床单摩擦出了“愉快”的声音……你懂的……然后…第一天敷上，第二天皮肤开始皱，说实话这个过程挺难受，但是第三天开始脱皮，总而言之还不错哈哈～
（还是和我家老李，感觉我已经把他带成了精致的猪猪男孩哈哈）

 △【生活方面】
 1、一周一次更换被褥，枕套，可以入手一套除螨仪
 这条痘痘肌与敏感肌的宝宝们要格外重视，正常肌肤的宝贝们对螨虫不用太恐慌，多把被子晒晒太阳就好~
 2、闭嘴睡觉 看图：不良呼吸习惯是可以影响人的面相的，建议宝贝们买矫正带和闭嘴贴

如果你们不相信，那么我就拿我家老李做个例子。哎这是在知乎第三次拿他开刀，再次默默祈祷不要被发现···
四年前还是五年前，忘记了···但是五官硬朗，下巴也很正常那么我们一起来看现在···
五官依旧硬朗，但是，下巴明显后缩，看是不是和图片那个正太一样写到这里我深深的担忧起来我的命运，第一次给他在平台生公开露脸，他知道了会咋样···
给我的勇敢点赞啊!!!!

3.【定期做牙齿检查与洗牙，注意口腔护理】△
坚决不能忽视的一点！
一年前我牙疼进了口腔医院时，检查出来有四颗智齿，6颗牙需要补，三处牙结石，口腔卫生问题非常严重，而且牙还很黄。每天早上刷牙都会出血，当时也根本没有把牙齿作为重点，直到洗牙的时候，钻心的疼痛感让我幡然醒悟。是真的要重视起来牙齿的健康！
再次划重点！！
刷牙问题大家一定要重视起来！
 1、选择正确的刷牙方法跟牙刷（这个下面有跟大家分享）；2、针对性的选择美白牙膏；

医生的建议：“每次吃完饭都要用漱口水漱口，使用牙线或者洁牙器代替牙签清洁牙齿，刷牙时将刷毛呈45°斜面上下刷，牙齿内测更要刷细致”
我一般都是买这种便携款漱口水，可以随身携带，有时候出去聚会吃饭或者外出可以很方便抽出来~~
（❤这里强调一下漱口水的问题，漱口水分保健性与药物性两种，宝宝们在购买时一定不要买成药物性，药物性漱口水是针对牙周炎，口腔粘膜疾病等特殊人群，我们健康牙齿用前者普通的漱口水就可以，主要作用是清除口腔残渣，保护牙齿，而不会损害口腔菌群，别买错啦）

4、用气垫梳梳头，定期做头发护理抹发油
头发是女孩子的第三张脸，这条是针对脱发、头发干燥分叉严重的美少女们的秘籍～除了我上面说的要吃一些芝麻丸子，日常用气垫梳梳头（比普通梳子按摩头皮），买一个可以调控温度的热发帽子，一周做一次头发护理，每次洗完头发一定要抹发油，拍上我个人用的，三个加起来不到100块～

5、喜欢做各种各样的鲜榨果汁
方上一些美白又营养的水果搭配果汁和奶昔给小仙女们借鉴~
【加水类】——西红柿、芹菜➕苹果、石榴，香蕉➕西兰花➕黄瓜、胡萝卜➕苹果（这个可能很多宝宝会觉得怪异，但是我几乎是两天一喝，真的超级好喝，前提是胡萝卜一定不要买蔫了苹果一定不要买酸的哈）香蕉➕猕`,grade:"S",commentCount:586,comments:[{author:"(匿名)",content:"想看眼霜篇的宝贝们右边集合[爱]",voteCount:479},{author:"(匿名)",content:"牛",voteCount:24},{author:"(匿名)",content:"感谢分享 很实在也很受用",voteCount:15},{author:"(匿名)",content:"真的是生活标杆呀",voteCount:11},{author:"(匿名)",content:"答主，在宿舍你怎么做菜呀",voteCount:10},{author:"(匿名)",content:"[爱]头像超美",voteCount:8},{author:"(匿名)",content:"[不抬杠]",voteCount:6},{author:"(匿名)",content:"厉害",voteCount:2},{author:"(匿名)",content:"棒棒哒，很实用",voteCount:0},{author:"(匿名)",content:"[害羞]",voteCount:0}]},{id:"1977042770205110538",question:"如何评价2025年11月，《人民日报》发布短视频《我们不说“包的”，但可以说“志在必得”》？",author:"SeanLee",voteUp:28465,excerpt:"昨天看到这个新闻，评论里立刻出现了： 「快来吃你妈志在必得饺子。」 除了看笑话我不知道怎么评价。 和上次那个「就不跪」有异曲同工之妙。 宣传口的人总带着一股小家子气的味道，硬要接地气，又接得不伦不类，又想玩梗，又放不下身段。 有种老头硬要和年轻人打成一片，拿着烂梗耍宝的感觉。",content:`昨天看到这个新闻，评论里立刻出现了：
「快来吃你妈志在必得饺子。」
除了看笑话我不知道怎么评价。
和上次那个「就不跪」有异曲同工之妙。
宣传口的人总带着一股小家子气的味道，硬要接地气，又接得不伦不类，又想玩梗，又放不下身段。
有种老头硬要和年轻人打成一片，拿着烂梗耍宝的感觉。`,grade:"S",commentCount:587,comments:[{author:"(匿名)",content:`没话找话耍宝也就算了，顶多有点尬。这已经到了你们玩的都是坏梗 快来学我玩好梗的程度，
又想打成一片、又不想放下身段，更想教你茴字的写法`,voteCount:4864},{author:"(匿名)",content:"一边不让玩烂梗，一边春晚上又硬蹭烂梗",voteCount:3844},{author:"(匿名)",content:"二流媒体这不是一般人能下定义的[发呆]",voteCount:2744},{author:"(匿名)",content:"装修师傅你好，这是我家的无与伦比[飙泪笑]",voteCount:662},{author:"(匿名)",content:"理解下，毕竟都是些关系户，只能写成这样了[doge]",voteCount:656},{author:"(匿名)",content:"最后一段太精辟了，但是它们其实并非不懂，而是在装老头，装出一副老头硬要和年轻人打成一片，拿着烂梗耍宝的感觉。只有这样才能体现出他们的高高在上的身段。",voteCount:642},{author:"(匿名)",content:"说对咯，这就是大家常说的＂你别没话找话＂",voteCount:580},{author:"(匿名)",content:"毕竟他说没事儿，那个时代普通老百姓哪敢说",voteCount:402},{author:"(匿名)",content:"呜呜呜，我阿中哥哥那么努力，你为什么总贬低他",voteCount:174}]},{id:"770274375",question:"有哪些越早知道越好的人生经验？",author:"along阿龙",voteUp:27041,excerpt:"辛辛苦苦写了4个小时，总结20条精华的人生经验，对你没有帮助欢迎来锤我！一定要看到最后啊，后面有彩蛋。 1 及时养成复盘的习惯何谓复盘？复盘是对以前做过的事情如以前做过的项目（如主持的会议、考试的过程）进行一次回顾和总结,从中发现问题，这就像刻意练习里说的那样，只有对反馈进行总结并且调整优化，我们才有可能进步，否则你说你练习了几十年 ，但你其实只是把1天的经验机械地重复了几十年而已。 2唯有行动才能解决焦虑…",content:`辛辛苦苦写了4个小时，总结20条精华的人生经验，对你没有帮助欢迎来锤我！一定要看到最后啊，后面有彩蛋。
1 及时养成复盘的习惯
何谓复盘？复盘是对以前做过的事情如以前做过的项目（如主持的会议、考试的过程）进行一次回顾和总结,从中发现问题，这就像刻意练习里说的那样，只有对反馈进行总结并且调整优化，我们才有可能进步，否则你说你练习了几十年，但你其实只是把1天的经验机械地重复了几十年而已。
2唯有行动才能解决焦虑
很多事情在我们没有开始做之前，总是会有很多错误的判断，会有很多疑惑，会很焦虑，不知道自己能不能做好。其实，我们在明白了一定的原理之后就可以开始去做了，因为往往只有我们行动了才能有更深的体会，行动了大部分焦虑就自然解决了，在行动中学习，学习中行动，即互联网思维中的：小步试错，快速迭代。
3精力/注意力管理
对人来说最重要的财富不是时间，而是我们的注意力:注意力>时间>金钱 这才是三者的价值排序，而很多人忽略了注意力对于我们每个人的价值。注意力即为能有价值产出的时间。
珍惜自己的注意力和精力，把它用在最有价值的地方，去学习，工作，成长。而不是玩抖音手机里千万不要下抖音、快手这些时间黑洞应用里。长期来看这些玩这些东西基本没用，当然要你完全戒除肯定很难，不过可以慢慢减少花在这上面的时间。
4学会独立思考
我们中国几乎不教我们如何独立思考，培养批判性思维，教授、专家说的话就一定是对的吗？那些网络谣言如此荒谬，为何还有一堆人上当受骗？而独立思考的能力注定是一个人能有所成就的必备的能力，一个人如果不会独立思考，很大程度上被谣言所蒙骗，被传销所迷惑。甚至可能仅仅因为某些砖家推荐了几个“涨停板”，就全仓杀入股市，到头来连“底裤”都输光。。

5少做高刺激低收益的事，比如王者荣耀、抖音等等，多做高收益的事情比如看书、学一门乐器、健身。因为王者荣耀那些东西长远来看对你的人生基本没有帮助。抖音不可怕，可怕的是你因为长时间坐高刺激的事情提高了自己的阈值，再也不能沉下心思考了。
6自觉地持续优化自我
工作中，不做伸手党，遇到问题自己先想办法，要锻炼自己思考的能力。问别人只是为了优化自己的答案。领导交代的工作，做之前先问清楚和领导确认一遍，这样做事有清晰的目标，有反馈。这样才能做得更好。
7正确对待金钱
钱重要吗？的确很重要，可它是不是世界上最重要的东西呢？其实不是
并不是越富有就越幸福人们会适应财富的增加，收入水平存在一个临界点，过了这个点，幸福感的增强速度远慢于收入的增长速度。（虽然平均来讲，收入的增加总是伴随着幸福感的增加）
比如对大多数人而言5千万和5亿的幸福感差距不太大。
所以我们应该在“视金钱如粪土”和”金钱至上”之间保持一个微妙的平衡，这个平衡点对不同的人，具体的位置也不同。
8 学好英语，用对的方法
英语作为一种通用语言，在国际化的今天，尤其北上广深的优秀企业，英语好的人，职业发展空间会更大。很多权威书籍都是先有英文版的，甚至有的只有英文版，另外一些学科的文献都是英文版的，可以这么说学好英语，你就拥有了打开另外一个世界大门的钥匙，你可以浏览外国的知乎quora，上YouTube观看学习视频，感受一下外国人和我们中国人的思维差异。

9不要像机器人一样，做繁琐和精确到分钟的计划表，比如网上盛传的浙大学霸那个学习计划表（甚至精确到秒）这种看起来很好的习惯，但本质上，它是存在很大误区的，生活中的突发事件有很多，我们不能完全按照计划表上的事情做好，偶然的突发事情让计划脱离了轨道，就会很受挫，得不偿失！

10越早学会理财越好（更准确地说是学会理财的思维）
很多人说：我工资才5000，用不了几下就月光了，怎么理财啊，等我有钱再理吧！现实情况是“你不理财，财不理你”即使有一天你走大运，中了500万大奖，相信我不出两年，你迟早给它败光。这里的理财思维指的是一种金钱的分配方式，比如X%存XX宝，Y%当做救济金，Z%买基金，以及一些节流的思维。和财富的绝对值没有那么相关。我给大家找了一个理财入门课，可以帮助大家学习一些理财知识。
11不背后说人坏话
因为在微信群等等里背后讨论别人，难免会被其他人截图传到当事人那里，从而造成关系的决裂，很可能别人一辈子都不会信任你，不会跟你有深入的合作，因为你背地里都这样，谁知道你究竟是个什么样的人？所以我们不要在背后说人坏话，哪怕是线下，不会被截图，这不仅是为了提高修养，更是为了保护自己的安全。
12记得要给自己和家人买保险
当你工作之后会发现，周围的人除了基本的医保还会买其他的保险，经济困难的话可以单纯买健康险，能保个平安，给家人和自己一个保障，一个普通的家庭是没有办法承担那些重大疾病的打击的，生病之后很容易压垮一个人，毁灭一个家庭。

13快速从过程导向转变为结果导向的思维
什么是结果导向呢？结果导向指的是做一件事情，以结果为最终目标，以如何完成目标为导向的思考方式，与之相对的就是过程导向：只关心做事情的过程，不在乎结果。结果导向只关心事情的结果，不在乎你用什么方法完成的事情（只要没有违反道德、法律）。
日本经营四圣之一的稻盛和夫在自传中提过这样一件事：在京瓷刚创立的时候，为了抢到订单，无论客户有什么技术上的要求，他都答应，其中有很多“看似不可能完成的任务”，但是他都一一解决了。只有当你以结果为导向，对结果负责，而不是沉浸在“我已经很努力了的过程里面”你才不会遇到困难找借口，总想着逃避。
14、升米恩，斗米仇。不要成为一个没有原则的滥好人，否则你帮助过的人不会感谢你，你没帮助到的人会怨恨你。我想起了有一个笑话，某个乞丐在街上祈祷，A路过后天天给了他10块钱，B看乞丐好欺负，天天打他一顿。某天A突然忘带零钱了，乞丐问他说你今天怎么不给我钱! 某天B忘记打了乞丐，乞丐却感激涕零觉得B内心其实是一个好人。虽然是个笑话，不过对我们理解道理有所帮助。
15.不要看对方说了什么，而是思考他说这个的真实需求（其实就是追问黄金圈里的那个why是什么）
比如说你爸妈突然给你打了个电话，给你说你们那里的天气怎么样怎么样,叫你注意保暖等等。表面上看是她想和你聊天气，但其实是你好久没回家，他们想你了，这时候你不应该回答：我知道了，我会注意保暖的。而应该说我XX时候就回来了。因为时代、观念的原因，他们只好这样表达他们的想法。
16年轻没多少钱的时候，尽量把大多数可调用的钱砸在提升自己上，这是回报最高的投资方式了。
你说你去投资一年20%的净收益率算高了吧？50W的本金能挣10W，可是刚毕业的大学生有几个人有50W以上呢？只有2W块钱的时候与其把精力全花在炒股上，不如先拿来提升自己，等你有了10W以上再想着投资也不迟。
17实践最重要
很多人都说：为什么我看了这么多书，懂得了这么多道理，可为何还是过不好这一生？那我想问你按书中的实践了吗？你有刻意地按照某些书里的道理控制自己的行为吗？ 这就好比一个人听了很多游泳的理论却从未下过一次水，却说：老天啊，我为什么不能成为一个游泳高手呢？你觉得这些道理都有点用而不行动，等于在死循环里继续挣扎。
18决策的时候记得考虑机会成本和沉没成本
 举个例子上班的时候很多人为了省钱，选择租离公司很远的房子，通勤就要2个小时但是租金却比较低，以为自己赚到了。但是你还忽略了时间这个成本啊，你租一个离公司通勤只需半个小时的房子，虽然租金贵但大大地减少你时间、精力的浪费也许更划算呢？
19人生比我们想得还短暂，只有900个 方格。
每隔一个月，我就亲手把一块方格涂黑。
以前我总以为时间还很长，自己还很年轻，直到有一天我了解了这个东西。
死亡方格：以平均寿命75年计算，人生只有900个月。把这900个月以格子的形式画在纸上，对应900个格子。
如果你今年20岁，那么已经走完的人生是这样的。

如果你今年50岁，那么已经走完的人生是这样的。

其实死亡一天天地都在接近我们，只是我们在大学的时候忙于打游戏、K歌，上班的时候忙于加班，中年的时候忙于带孩子。可是什么时候有时间做自己真正想做的事情呢？做那些让你激动不已的事情？
当你60岁格子快涂满的时候，你会不会后悔要是自己在20岁时多努力一点，在25岁的时候多去看一看这个世界？所以说趁年轻多去做一做你梦想的事情吧，因为每一天，每一个月你都在划去这900个方格里的一格啊！
20 为你自己打工，对自己的成长负责
很多人这样想：我们付出自己的工作时间，老板付我们报酬，那么老板付我多少钱，我就干多少钱的活，拿6000块我就干6000块的活，要是我在工作之余打打游戏，只干了5000块的活我就赚了！然而这样想完全是错误的，给老板打工，我们会总觉得老板在剥削自己，自己是那个“受害者”。不可否认，总会有不太公平的老板，不会按照你做的贡献、你的工作水平给你相应的薪资。可是你始终是为自己打工啊，你工作里面获得的成长，积累的项目经验，做出的业绩等等完全是自己的，别人都抢不走。
如果你因为公司环境不好，老板不公平的环境而放弃好好工作，那就太傻了。环境不好，那我好好干积累项目经验跳槽就是。假如因为老板不公平，你作为一个程序员，选择每天上班就是网上随便找个代码复制再随便修改了事，你又得到了什么呢？除了那基本薪水外你什么都没有得到，技术没有得到提升，还浪费了最宝贵的光阴，如果再过两年还这样，估计要被老板开除了…… 记住你永远都在为一家叫做“自己”的无限责任公司打工。

21感情的中不存在离开谁，ta就活不下去的说法。 失恋了不要过度沉湎于悲伤之中，对身体不好～
你最初喜欢一个人开始可能因为他的颜值、身高等外在条件，后面被他的才华等等所吸引，最后被他的一些品质:诸如诚实、友善福等我品质所折服。
如果某一天，他甩了你，请不要伤心，更不要去做一只舔狗，就让他走。
你爱的不是具体的某一个人，而是他背后的那些东西（才华、品质等）。只是你们的共同经历让感情升了温。
他甩了你，也恰恰说明他不是你的Mrright。你只需耐心的等待或者是主动出击下一个。非你我就活不下去的爱情那不叫爱情，那叫依赖!
同意的朋友们鼓鼓掌～
22 给别人鼓励或者给别人点赞会让你的运气变好，这是有心理学效应的（这叫皮格马利翁效应），如果你觉得我的答案对你有帮助，请赞一个，看看三个月内会不会有一件超出预期的好事发生，反正也不花钱。

力荐最高赞回答121K，知乎热榜第一：有哪些道理是你毕业多年后才明白的？
另外：很多答主的道理都是从书中读来的，所以说读书也是很好的提升自己的方式。我也翻遍了很多高赞答主书单，汇总起来，需要的可以来这领取：有哪些书非常有利于年轻人未来发展？
道理是理论，习惯是实操，有理论也要有实操，请看我的曾排名热榜第一的回答：10小时筛选高赞的：有哪些让人受益无穷的好习惯？工作后，你悟出什么职场道理？`,grade:"S",commentCount:438,comments:[{author:"(匿名)",content:"走心的建议，感谢答主",voteCount:190},{author:"(匿名)",content:"才75年？那我得设计一个100岁的格子",voteCount:178},{author:"(匿名)",content:"这答案用心良苦",voteCount:86},{author:"(匿名)",content:"实锤了，很现实的点，不能说点点有用，至少是没有错的，四小时的时间就是精，辛苦答主",voteCount:67},{author:"(匿名)",content:"900个方格很有实际感！感谢答主！是个好办法[赞同]",voteCount:43},{author:"(匿名)",content:"真的是太赞了，每一条都很中肯",voteCount:18},{author:"(匿名)",content:"说的太对了，人生感悟",voteCount:17},{author:"(匿名)",content:"21条黑色加粗。🤣🤣🤣",voteCount:13},{author:"(匿名)",content:"感谢支持～",voteCount:11},{author:"(匿名)",content:"坐等该贴火",voteCount:11}]},{id:"1984372019006039960",question:"职场年轻人为什么对工作失去了激情？",author:"励志脱坑的化学妹",voteUp:26293,excerpt:"这就是原因，别笑，很多公司都在做这事。 [图片]",content:"这就是原因，别笑，很多公司都在做这事。",grade:"S",commentCount:235,comments:[{author:"(匿名)",content:"如何白嫖？",voteCount:4850},{author:"(匿名)",content:"我以前做过人力资源薪酬绩效方向的工作，大部分老板都把绩效当做是考核不是激励。最好是活干了钱不发。。。",voteCount:3607},{author:"(匿名)",content:"降本增笑罢了[飙泪笑]开始搞这些的公司基本上都是要死了，没啥挣钱的地方了",voteCount:1595},{author:"(匿名)",content:"这评论也太添柴了！",voteCount:1074},{author:"(匿名)",content:"这种东西就是马斯洛需求理论里基层的需求不打算给予满足，就开始跟你谈顶层的需求。完全违背人性的奇怪想法，也就黑心老板能显得出来。",voteCount:958},{author:"(匿名)",content:"心情不好了还能“有理有据”的扣点[语塞]我做薪酬，每次做工资都有部门领导来问，这个钱能不能扣，那个钱能不能不发。",voteCount:543},{author:"(匿名)",content:"把大环境搞差就行了[飙泪笑]",voteCount:436},{author:"(匿名)",content:"评论区都是人才，不但完美类比了这个话题，还贴心的给出了可行性方案。",voteCount:271},{author:"(匿名)",content:"我们公司绩效分90以上，绩效工资125%，我发现我好几个月都是89，89.5，后面故意扣了几分，总分依旧卡89，也就差几百块，这么做超级恶心",voteCount:260},{author:"(匿名)",content:"[飙泪笑]明面上待遇上不要降，延长工作时间，加大工作强度。",voteCount:253}]},{id:"2093828190",question:"怎样看待中国的 10 后？",author:"匿名用户",voteUp:25305,excerpt:"哈哈哈哈哈哈哈哈哈终于从90说到00说到10了！老阿姨露出了灿烂的笑容。 看到这里的孩子，不论你是几零。 我都想告诉你，你不是被毁掉的一代。 你永远比上一代的我们更加优秀、更加活力。 你不是垮掉的中国人。 你是10后，是即将进入青春期的人。 当你进入青春期后，你会发现，身边的sb怎么那么多？ 不要慌张，不要骄傲，这是因为你发现你是你自己了。 你开始思考你和别人的不同。 也许会有些幼稚，也许会有些可笑。 但这是你，这…",content:`哈哈哈哈哈哈哈哈哈终于从90说到00说到10了！老阿姨露出了灿烂的笑容。

看到这里的孩子，不论你是几零。
我都想告诉你，你不是被毁掉的一代。
你永远比上一代的我们更加优秀、更加活力。
你不是垮掉的中国人。
你是10后，是即将进入青春期的人。
当你进入青春期后，你会发现，身边的sb怎么那么多？
不要慌张，不要骄傲，这是因为你发现你是你自己了。
你开始思考你和别人的不同。
也许会有些幼稚，也许会有些可笑。
但这是你，这是你对世界作出的判断。

我希望你能够尊重和你不同的人。
我希望你能在爱自己的同时也爱别人。
我希望你不要一昧追求与众不同。
我希望你不要盲从。
我希望你理智而独立。

作为曾经被称为垮掉的一代九零后的我相信你们大有可为。
你们看见的世界和我们经历的世界不同。
在我十多岁的时候这个国家还不甚强大，它受制于日本，它受制于美国。
但是你们不同，你们不必仰视别的国家。

我相信你，相信你们会是最骄傲，最自信的一代。
你们是中国的未来。`,grade:"S",commentCount:565,comments:[{author:"(匿名)",content:"从来没有哪一代垮掉了，只是大部分人只愿意去看那些垮掉的，然后高高在上，说出讥讽的话语",voteCount:2715},{author:"(匿名)",content:"震惊，10后至今没有人活过15岁",voteCount:2304},{author:"(匿名)",content:"下一代永远都是上一代嘴上垮掉的一代[doge]",voteCount:813},{author:"(匿名)",content:"真有一代垮掉了，国家早就垮了，不可能发展得越来越好。",voteCount:775},{author:"(匿名)",content:"震惊！20后至今竟然没有一个能活到三岁。",voteCount:617},{author:"(匿名)",content:"身为00年的老大哥祝10后的小萌新多多思考，这个阿姨[飙泪笑]说的很好",voteCount:504},{author:"(匿名)",content:"阿姨……【瞳孔地震】不过说起来也确实到了会被小孩子们叫阿姨的年龄了[思考]",voteCount:235},{author:"(匿名)",content:"果然，从90，到00，再到10（泪）",voteCount:171},{author:"(匿名)",content:`要垮早就从我们80后就垮了。
但不得不说，有些优秀的传统没有继承下来。比如我看不惯我50后父母的某些思路，但不得不佩服他们目前社会上仍具有某些很多的闪光品质。
我下一辈基本是00后或者10后，在同龄时期的最大区别，是对于他们的学习成绩有了更大的容忍度，因为有了两代人的积累。
目前的孩子有了更多的选择自由，这也是我们希望看到的并去做的。`,voteCount:160},{author:"(匿名)",content:"这帮子瓜皮只要韭菜割的不顺心指定会骂街",voteCount:155}]},{id:"2658448797",question:"和听不懂话的人沟通是什么体验？",author:"匿名用户",voteUp:25138,excerpt:"我不吃香菜，不是觉得味道怪，是胃对香菜排斥，简而言之，就是吃一口香菜能把胆汁儿都吐出来。 这是前提。 我爸带我去拜访某亲戚（逢年过节例行走动），对方热情留客吃饭。 饭桌上： 亲戚：你咋不吃香菜呢？ 我：吃不了，吃了反胃。 我爸：这孩子从小就不吃香菜。 亲戚：香菜对身体好，你吃点试试。 我：我不吃香菜。 亲戚：哎呀，你这就是家里给你惯的，这么好的东西怎么不吃，你尝一尝嘛。 我：我真的吃不了香菜。 亲戚：哎呀…",content:`我不吃香菜，不是觉得味道怪，是胃对香菜排斥，简而言之，就是吃一口香菜能把胆汁儿都吐出来。
这是前提。
我爸带我去拜访某亲戚（逢年过节例行走动），对方热情留客吃饭。
饭桌上：
亲戚：你咋不吃香菜呢？
我：吃不了，吃了反胃。
我爸：这孩子从小就不吃香菜。
亲戚：香菜对身体好，你吃点试试。
我：我不吃香菜。
亲戚：哎呀，你这就是家里给你惯的，这么好的东西怎么不吃，你尝一尝嘛。
我：我真的吃不了香菜。
亲戚：哎呀，我家跟外面的不一样，今天你们爷俩来，我特地去菜园子里拔的新鲜香菜，自己家种的，又香又有营养。
我：（叹气）
亲戚：你这孩子怎么听不懂好赖话了，劝你吃是为你好，你叹什么气？
我：您确定让我吃哈？
亲戚：这有啥不确定的，你吃嘛。
我看了我爸一眼，我爸微微往后挪椅子，开始离开餐桌。
我吃了一口。
不出30秒，吐了一桌。
所有人都不用吃了……`,grade:"S",commentCount:1940,comments:[{author:"(匿名)",content:"我觉得你爸已经做好看戏的准备了[惊喜]",voteCount:8059},{author:"(匿名)",content:"你爸：检测到在途的不明物体打击[惊喜]",voteCount:6085},{author:"(匿名)",content:`我奶奶（亲生奶奶去世多年，此处说的是我爸的继母，没有血缘关系，无底线偏向她自己的孩子，还一天天事儿的不行）劝我吃香菜的时候我特地展示过一次，我爸就是有经验了。
人生第一次吃到香菜，在自己家抱着马桶吐的天昏地暗，所以，其实是具备走到卫生间的能力的[捂嘴][捂嘴][捂嘴]`,voteCount:4434},{author:"(匿名)",content:"你爸:有好戏看了我可得把凳子拉远点免得殃及池鱼[doge]",voteCount:4278},{author:"(匿名)",content:"干的漂！亮！[吃瓜]",voteCount:1277},{author:"(匿名)",content:"嚯！舒服！！！！太舒服了",voteCount:868},{author:"(匿名)",content:`我管他具体是因为什么，就这种亲戚，全部定义为“听不懂人话”。
而且这号亲戚跟父母确实没什么可比性，他们可不是为我好。`,voteCount:725},{author:"(匿名)",content:`这不是听不懂话，这是不相信你家没溺爱你，不相信你确实吃不了香菜。
我妈也有类似情况，她认为好的东西想给我吃，就是不相信我吃饱了/不想吃/反感…随着我年龄的增大生活分开的时候多，还有我回怼过几次以后就很少遇到了。
毕竟是亲妈，也是真心想我好，怼的时候都是身体不适不想说话的时候，反复问多了就“不吃不吃不吃不吃不吃不吃不吃不吃”连续重复好几遍…`,voteCount:687},{author:"(匿名)",content:`首先，我爸这个人，说好听点是少言寡语，说直白点就是有点蔫坏。
其次，被劝吃香菜的状况发生过很多次，之前都是坚持拒绝的，但是某些嘴碎的亲戚就到处跟人说我家溺爱孩子，说我挑食，说我家家教有问题等等各种说辞，更难听的就不说了。
最后，我选定这家主要是因为这家亲戚人品不咋地，贪小便宜贪到去你家串个门儿恨不得把墙皮都刮走那种。
这个事情之后，也算一劳永逸，再也没有亲戚劝我吃香菜了[飙泪笑][飙泪笑][飙泪笑]`,voteCount:421},{author:"(匿名)",content:"[飙泪笑][飙泪笑][飙泪笑]",voteCount:413}]},{id:"2001287121999259464",question:"你见过的人间尤物是什么样的？",author:"小新新",voteUp:24541,excerpt:"最近一个世界小姐大赛选手。 突出一个正常健康，比那些科技狠活好看很多 [图片] [图片]",content:"最近一个世界小姐大赛选手。 突出一个正常健康，比那些科技狠活好看很多",grade:"S",commentCount:1309,comments:[{author:"(匿名)",content:"这个一看就是自然人，没有科技狠活。",voteCount:5292},{author:"(匿名)",content:"不说脸，这样的体型就是我的梦中情体了",voteCount:4094},{author:"(匿名)",content:"自然美＞人工美＞自然普通＞自然丑＞政治正确丑黑肥[魔性笑]",voteCount:967},{author:"(匿名)",content:"我好了，非常感谢",voteCount:883},{author:"(匿名)",content:"这只是整的更高端罢了，结合自身优势微整",voteCount:631},{author:"(匿名)",content:`一般吧，没啥意思
[图片]`,voteCount:433},{author:"(匿名)",content:"最难得的是，广西妹子长到177",voteCount:415},{author:"(匿名)",content:"广西，杨雨蓉，身高177。",voteCount:363},{author:"(匿名)",content:"在我这里，可能是自然普通>人工美",voteCount:276},{author:"(匿名)",content:"那就是自然",voteCount:225}]},{id:"2049478724165296214",question:"为什么要读书？",author:"虞美人大鱼",voteUp:24272,excerpt:"张雪峰有次在直播间跟一个不想读书的孩子聊了二十多分钟，我听完觉得很震撼，这是我听过的为什么要读书的最好的回答，他从底层逻辑和现实层面让你明白读书究竟有多重要！ 他第一句话说，孩子，你知不知道什么叫隐形天花板。你家不是大富大贵，对吧，那你爸妈这辈子能做的最大的投资，就是让你多读几年书。不是因为你读书多了能当大官，是因为你不读书，你连那个天花板在哪都看不见。什么意思呢，就是你会发现，等你二十岁去打工…",content:`张雪峰有次在直播间跟一个不想读书的孩子聊了二十多分钟，我听完觉得很震撼，这是我听过的为什么要读书的最好的回答，他从底层逻辑和现实层面让你明白读书究竟有多重要！
他第一句话说，孩子，你知不知道什么叫隐形天花板。你家不是大富大贵，对吧，那你爸妈这辈子能做的最大的投资，就是让你多读几年书。不是因为你读书多了能当大官，是因为你不读书，你连那个天花板在哪都看不见。什么意思呢，就是你会发现，等你二十岁去打工，你身边工友的聊天内容，永远是你女朋友多好看，你老板多抠门，谁打架赢了。
你不觉得有什么问题，因为你没见过别的生活。可那些读了书的人，他们在聊行业趋势，聊技能提升，聊怎么跳槽加薪。
你不是比他们笨，你是从来没听过那些词，你连模仿都不知道从哪模仿起。
这个天花板就是这么落下来的，它不是一下子砸你头上，是慢慢把你压扁，压到最后你觉得喘气都费劲，你还不知道为什么。
张雪峰又问他，你知道为什么很多不读书的孩子后来都信了那些很傻的东西吗。
比如信什么买课就能暴富，信什么拉人头就能躺赚，信什么大师能改命。
不是他们傻，是他们从小到大没有见过一套完整靠谱的逻辑。
你读过数学，你就知道什么叫复利陷阱，你读过政治，你就知道什么叫洗脑话术，你读过语文，你就知道什么叫偷换概念。
可你没读过，别人说日赚五百，你脑子里只会出现五百可你没读过，别人说日赚五百，你脑子里只会出现五百块钱，不会出现他凭什么给你五百块钱这个问题。
读书的本质，是在你脑子里装一个叫凭什么的反问按钮。
别人每说一句话，你的脑子会自动弹出一个弹窗，凭什么信你，凭什么给你钱，凭什么你是对的。
不读书的人没有这个弹窗，别人说什么就是什么，一辈子活在别人画的大饼里。
你爸妈最怕的不是你没出息，是怕你被人骗了还帮人数钱，因为他们拉不住你，你的脑子没有护栏。
张雪峰最后说了一段特别让人坐不住的话。他说，孩子，你想想十年后的某一天，你孩子放学回来跟你说，爸，老师让买个学习平板，两千块。
你说，爸这个月工资还没发，等下个月。你孩子低下头说，哦，然后默默回屋了。
他不是怪你，他是习惯了，因为他每次要什么东西，你都说等一等，等一等。
你等到了什么，你等到了自己活成了小时候最怕成为的那种人，就是连孩子一个小愿望都满足不了的人。
你回头看看今天，你逃课打游戏的那几个小时，你在被窝里刷短视频的那几个小时，你觉得那叫自由。
可那些自由，到了十年后，全变成了你张不开嘴的愧疚。
我不是吓唬你，我是想让你明白，普通家庭的孩子，你没有什么本钱可以挥霍，你的每一次偷懒，都是在透支你将来的底气。
你现在多背一页书，多弄懂一道题，这些东西现在看着没用，等有一天你孩子仰着脸看你的时候，你能笑着掏出那个平板说，拿去用，爸准备好了。
那一刻你才会知道，你当年读的那些书，全都变成了你爱家人的能力。
别把你爸妈给你的这牌打烂了，他们这辈子就指着你这把牌翻身呢。`,grade:"S",commentCount:1131,comments:[{author:"(匿名)",content:"烂大街的道理到处都是，能讲到人心里去的话术凤毛麟角[赞]",voteCount:2693},{author:"(匿名)",content:"有人说要问如何评价张雪峰：一个劝你读书的人，他再坏能坏到哪去？",voteCount:2197},{author:"(匿名)",content:"其实吧不管用，特别是叛逆期的孩子，听不进任何劝告，他们玩的游戏是从生理最底层种的种子，就跟成年人减肥减不下去一样，生理依赖。能醒悟的都不是一般人。我记得有人说用几年时间做好一件事可以改变命运。很多人熬不过那几年时间。",voteCount:586},{author:"(匿名)",content:"读书的作用不是立竿见影，但会成为你一辈子的底气。",voteCount:552},{author:"(匿名)",content:"而且读书是一个一层层的圈子，比如你985本科，那你身边都是985本科，你唯一能跟大专（不是瞧不起大专，我也是大专）接触的地方，可能就是你去吃饭，然后服务员是大专生，或者在网上和一个死犟死犟的大专生吵几句，你现实几乎不会与他有深交，如果你是研究生，你圈子更进一步，你身边都是研究生，说不定哪个进不错的公司了，缺人了，让你来面试，你就有一份不错的工作了，这些都藏在读了书一个好的圈子里，而且因为我也是大专生，我也进厂过还是在车间，车间的人倒是都不坏，但是他们确实关心的都是什么，谁的女朋友好看，谁的女朋友化妆好，谁的女朋友身材好这些很俗的问题，当然他们也没有错，但是你但凡是个上进的人，谁愿意天天跟他们讨论这些东西，我来来回回听了几百遍这些，但他们依旧讨论的不知疲惫，可能时间长了，你要合群就受影响和他们一起讨论这些了，所以读书真的很有用，我自己也想明白了才想考研学习",voteCount:394},{author:"(匿名)",content:"因为对于大部分普通家庭的小孩来说，知识真的可以改变命运[机智]",voteCount:344},{author:"(匿名)",content:"建议让正在上学的孩子们看看这一篇。",voteCount:308},{author:"(匿名)",content:"张雪峰每年掏钱主动资助未来可期的学子，比在他死后抹黑他的群体高尚太多",voteCount:268},{author:"(匿名)",content:"我一直跟我孩子说的就是，读书最重要的就是可以让你不那么容易被骗，哪怕有些问题解决不了，读了书也可以知道为什么，而不是别人说什么就是什么。",voteCount:196},{author:"(匿名)",content:"鸡汤很动听，但是现实世界是混沌的。并不是那套简单的读了书=有更多知识更有高认知能力=不会受骗+赚更多钱的线性叙事。甚至张雪峰自己都不符合这套说辞。",voteCount:3}]},{id:"690515803",question:"哪些思维方式是你刻意训练过的？",author:"苏菲",voteUp:23936,excerpt:"快速停止自己的负面情绪。 为了练成这个技能，我做了几件事： 1. 注意到一件事开始影响自己情绪时立刻进行调整。这个状态就好像脑海里随时有一个监控小人， 无论情绪是兴奋至极点还是丧成狗，这个小人都兢兢业业地进行着理性的观察。所以当我不自知的沉浸在负面情绪里时，这个小人就开始工作了，它举起警灯（应该是红色的），对我说，你要注意了，这件事开始影响你了。 当我得到这样的提示时，就会尽量跳出情绪的泥沼来分析： 到…",content:`快速停止自己的负面情绪。

为了练成这个技能，我做了几件事：

1. 注意到一件事开始影响自己情绪时立刻进行调整。
这个状态就好像脑海里随时有一个监控小人，无论情绪是兴奋至极点还是丧成狗，这个小人都兢兢业业地进行着理性的观察。
所以当我不自知的沉浸在负面情绪里时，这个小人就开始工作了，它举起警灯（应该是红色的），对我说，你要注意了，这件事开始影响你了。
当我得到这样的提示时，就会尽量跳出情绪的泥沼来分析：
到底是什么影响了我的情绪？
是一件事，还是这件事背后隐藏的恐惧或愤怒？
或者我只是身体状态不太好or受荷尔蒙影响？

在有一个初步判断后，就会采取相应的措施：
如果不是必须面对的事情，可以放弃（逃避可耻但有用）；
如果有面对的必要，直接思考解决方法；
如果是身体状态或者荷尔蒙的原因，就给自己买一盒巧克力；
有时候会选择和亲密的朋友倾诉；
……等等等等
情绪低落并不是坏事，也不需要自责，但是需要被观察，被认识到。这就能在越陷越深之前，努力拉自己一把，不一定能拉的上岸，但是至少可以减缓这个进程。

2 注意到自己开始进入&#34;敏感伤感模式&#34;，或者有任何开始怀疑自己或自己生活方式的迹象就立刻强行进入“弱智模式”。
日本有一本书叫做《钝感力》，这三个字很精妙地概括了此&#34;弱智模式&#34;。
就是我注意到了，但我傻乎乎的，我不在乎的这样一个状态。
这一点是最需要练习的，不过我们很多人在幼年童年时期都曾经熟练掌握这种状态。
心理学上有一种理论：有些事情如果小孩子明确意识到了，就会对他造成严重的心理伤害。所以很多时候，幼时的我们会无意识中触发心理保护机制，不去&#34;弄懂&#34;那些会伤害我们的事。
因此我们很多心理问题在童年还不太明显，都是成人之后突然发生的。
但是呢！即使成年以后，这个状态也是可以反复训练进入的。
这有点像我们故意让眼睛失去焦点。你明明在看，但是可以故意放松眼部肌肉让自己&#34;看不清&#34;。就是这么一种感觉。
最开始，每次陷入不好的情绪中，我都会用大脑用力的说服自己“不要多想” “其实没你想象的那么差的” “多想想快乐的事嘛” 但越是这样强行说服，心情越是郁闷（因为大脑都在责备自己心情不好是有罪的，当然更委屈啊）。 
那之后我找到的方式就是“弱智模式”。停止思考，不要深想，不要说服自己在这件事上的观点，而是让自己变笨——不深究，不思索，然后马上去想些快乐肤浅的事情，比如要吃的好吃的，想买买买的东西，最近看的电视剧等等。 
人们都说聪明人不快乐，反过来就是肤浅而愚笨的我们更容易快乐。所以有时我们可以故意肤浅愚笨一些，给自己一个好情绪。
当然了，总是肤浅而愚笨那肯定会给自己的人生带来大问题，所以我们只在调节情绪的时候进入这样的状态。
时不时做一个快乐的二傻子，有助于心理健康，也有助于人际关系哦。

3 尽量不依赖任何SNS来进行心态调整 / 获取对自己的认可。
SNS: 指网络社交媒体，朋友圈，微博，知乎, etc.
之所以说『尽量』，是因为我自己也真忍不住……别人的夸夸诱惑太大了。
不提倡依赖外界来调整心态的原因，主要因为没 啥 用。当我们获得正面反馈几次之后就会上瘾。那就意味着会更加依赖，最后结果可想而知。大家随便刷刷朋友圈就能看到无数SNS认同中毒者了。
依赖外界认同获得的能量，也会因为外界失去，只有自己内心生成的能量，才能够恒久发光。
认同，积极心态这些东西，如果能够自产自销，就意味着面对负面消极情绪时可以自愈。所以，我可以随时通过给自己做心理建设来快速恢复情绪。
接受他人帮助是必要的…但只能做为辅助，不能单指着别人来恢复情绪，这样下去再好的朋友也会厌烦的。
为什么我会认为快速停止负面情绪是一个很重要的技能呢？
因为我发现，自己正常发挥时基本可以把事情做的很好。而把事情搞砸时，大部分原因都是因为情绪作祟。这情绪有时候自知，有时候不自知。
同样一件事，我心情好时的处理方法，和心情不好时的处理方法是完全不同的。而长远看来，前者往往可以带来更好的结果。有负面情绪时，却做不到。
那就很简单了，管理好自己的情绪，以理性、平稳、沉着的心态面对大部分事情，就可以让自己始终「正常发挥」智力和情商。自此，无论是工作，生活，人际关系还是我看待自己的方式，都有了巨大的转变。
只要勤加练习，思维是可以控制情绪的。这样做的时候，我感到自己的「人性」凌驾于「动物性」之上。那感觉，满棒的。
大家生活当中都难免会出现一些小情绪，持续的负面情绪会影响我们的人际关系、生活状态和身体健康，所以掌握一些自我调节的方法是告别负面情绪最快的办法。
知乎旗下的职业教育品牌「知学堂」 APP 有非常多的心理学相关课程，心理咨询师老师们提供了多种自我疗愈的办法和途径，内容简单易懂，具有非常强的可行性，帮助你快速度过情绪低谷，看见生活中的更多美好。`,grade:"S",commentCount:441,comments:[{author:"(匿名)",content:"我想知道怎么从弱智模式变回来，以前为了不让自己受到伤害时刻处于弱智模式，现在大脑习惯了不思考，哎",voteCount:411},{author:"(匿名)",content:"我是属于实战派的，理论确实不如答主那么详细，但是基本上自己也已经摸索出了一套非常高明的自我消化负面情绪的能力，而且这能力最大的好处我发现：我甚至可以避免社交，我发现社交的本质也是从外界寻求快乐，可是任何外界总不可能避免的一个就是无常，这就是我们最痛苦的地方，我们人都希望无条件的不停的接受快乐的感受，不想要痛苦的感受，可是假如快乐是从外界来的，那么无常对人的影响就太大了，比如有朋友你就开心，没朋友你就孤独拉！那太糟糕了，等于就完全依靠了外界，那么人就根本停不下来，停不下来才是人最焦虑的地方，人本身需要的其实就俩个东西：一个是可以停下来做自己想做的事，第二个是在这个状态里还要保持舒服的感觉，所以大部分人是做不来的，其实舒服的感觉我现在通过积年累月加上看很多人的感受也做出了一个判断：一个人经历过生活的痛苦 各种困苦知道之后，才会知道，其实舒服我们不动就舒服，只要一动，就会不舒服的，所以很多时候，我们自身其实有个能让自己开心幸福的能力，但是这个东西反正我做到了，别人我看做到的寥寥无几，所以我想，没或许每个人都不一样，或许和经历有很大关系，总之很多时候就是这样，所以我现在不轻易给别人传授经验，我的经验给了别人，假如别人还信我，那么就会变成我的知识和他的潜意识有冲突（不可千万别不信我说的，你的绝大部分痛苦或者甚至说全部的痛苦都是冲突造成了），所以很多时候没减少社交才是真正让自己减少冲突增加快乐地关键，但是假如你不许人多你ibixu你必须人多你才能快乐的话，那么和别人的好充分体育冲突特会也会咋能家咋鞥增加你的痛苦。",voteCount:249},{author:"(匿名)",content:"成年人，稳住，正常发挥就是成功",voteCount:241},{author:"(匿名)",content:"我一不开心就吃巧克力结果成了胖子，最好是疯狂运动效果明显",voteCount:61},{author:"(匿名)",content:"这个答案给我上去，太棒了",voteCount:60},{author:"(匿名)",content:"Social Networking Service",voteCount:47},{author:"(匿名)",content:"SNS是神马的缩写呀",voteCount:14},{author:"(匿名)",content:"愿意我选择啦游泳，哈哈哈",voteCount:8},{author:"(匿名)",content:"这个范围好大...社交网络服务",voteCount:7},{author:"(匿名)",content:"社交媒体……就是朋友圈微博知乎这类，我修改一下",voteCount:2}]},{id:"1394098371",question:"为什么现在很多女人择偶都要求“男方要有上进心”？",author:"写手一条城",voteUp:21793,excerpt:"意思就是： 我现在条件不怎么样，找条件更好的不太现实。 但是我深深地嫌弃和鄙视着与我同等条件的你。 所以我想让你现在给我一个承诺，保证你以后会非常牛逼。 这样就能勉慰我这颗没有逼数的心。 别杠别杠，我还有好听一点的说法： 我现在条件不怎么样，但我深知我会通过努力让自己变得更好。 所以我期待你也是一个如我一般的男生。 这样在我们未来的时光里，就可以一起去拼一个美好的未来。 尽管这事儿特不靠谱，但至少还有个…",content:`意思就是：
我现在条件不怎么样，找条件更好的不太现实。

但是我深深地嫌弃和鄙视着与我同等条件的你。

所以我想让你现在给我一个承诺，保证你以后会非常牛逼。

这样就能勉慰我这颗没有逼数的心。

别杠别杠，我还有好听一点的说法：
我现在条件不怎么样，但我深知我会通过努力让自己变得更好。

所以我期待你也是一个如我一般的男生。

这样在我们未来的时光里，就可以一起去拼一个美好的未来。

尽管这事儿特不靠谱，但至少还有个奔头。

行行行，还有更好听的版本：
没错，现在的我看起来贫穷、卑微、丑陋。

我不知道迪奥口红的色号，也不知道香水的前中后调。

但我深深的知道，我不会就这样浑浑噩噩的度过一生。

我会用尽毕生努力，去让自己变得优秀，去更远的地方，看更大的世界。

所以我生命中的另一半，一定要有与我一起振翅飞翔的觉悟。

这很累，也很苦，所以我一定要搞清，你是否有这种渴望。

对号入座了？

都坐在第三排了？

有什么区别么？

女人，终归是好听就行。

上进也是一个道理，吹就完了。

先骗到手，反正我上进着呢。

具体效果，到时候再说。
更多内容来我公众号：毒舌一条城。`,grade:"S",commentCount:2608,comments:[{author:"(匿名)",content:"想反驳你，但是又找不到可杠的点。。。",voteCount:2141},{author:"(匿名)",content:`那你就不要找一个有上进心的，找一个“努力”的就好，但是很可惜，富士康流水线上每一个员工都很努力。
所以你要的，明明是美好的未来。`,voteCount:1815},{author:"(匿名)",content:"别那么累，找不到就说明你想支持我。",voteCount:1686},{author:"(匿名)",content:"别吧城哥，你说的这些我一点都联想不到，女生说上进心纯粹是找不到别的词，又不想显得自己俗，实际上可能代表的是各种东西",voteCount:1295},{author:"(匿名)",content:"可是…谁不想要美好的未来？男的想要叫有前途女的想要就得被恶意嘲讽？上进心这个词怎么就被扭曲成这样了？难道两个人一起努力不是好事儿？我在外面拼命工作回家做家务结果你每天想着怎么打游戏这就是男人心里的完美恋爱？u1s1，富士康流水线上的工人也是有男女朋友的～",voteCount:1031},{author:"(匿名)",content:"你要是个女的就更没数了。女的才需要找个努力赚钱的对象，男的更喜欢找漂亮的。男的努力干活可不是为了找一个一起努力的人。",voteCount:526},{author:"(匿名)",content:"第一不是说男生很少这样要求，而是这个社会本身对男女的要求就有区别，虽然现在女孩子也要顶半边天，但是在大家的思想里女孩子其实还是要对整个家庭的事情更加操心一点，这样的话男生就会被要求在外面更努力，否则一个家庭怎么才能安稳和谐稳定的走下去呢？其次也要分人群，我和我前男友刚分手，恋爱六年，我是属于一定要去闯一闯的人，他是属于能安稳就安稳的人，两个价值观不同的人努力磨合了六年还是走向分开，如果我也是喜欢安稳的人，那我男朋友其实就是一个非常好的选择，可是我一直都不是，他也没有办法做到真正的努力，每次都是得过且过。所以我感觉上进心这个东西还是得看人叭，现在粗糙的标准大概就是少沉迷游戏多关注当下我觉得就已经挺不错的了…",voteCount:502},{author:"(匿名)",content:"颇有道理，但很可惜，不知道为何，男生很少会这样要求。",voteCount:302},{author:"(匿名)",content:"不啊，只有第一段的时候有一堆女生给我点反对啊。",voteCount:207},{author:"(匿名)",content:"关键我没要求她有整容的心啊。",voteCount:176}]},{id:"1685146179",question:"年轻人如何在独居时有效地保持自律？",author:"李栩然",voteUp:20820,excerpt:"我是从一个伟大的人物身上，学会自律的。 01 1945 年 ，重庆。 这座 70 年后在抖音上火得一塌糊涂的 「网红」城市，一定没想到，自己在这一年的 9 月比半个世纪后还要红。 因为 ，一场举世瞩目的谈判正在这里举行。 国共两党的主要负责人 ，在美国的斡旋下，进行了马拉松式的一系列会谈。 马拉松要跑 42 公里多 。 而重庆谈判也谈了 42 天多 。 当蒋介石给毛泽东发出电报邀请其来重庆会谈时 ，估计也没有想到毛泽东真的会来。 他…",content:`我是从一个伟大的人物身上，学会自律的。
01

1945 年，重庆。

这座 70 年后在抖音上火得一塌糊涂的「网红」城市，一定没想到，自己在这一年的 9 月比半个世纪后还要红。

因为，一场举世瞩目的谈判正在这里举行。

国共两党的主要负责人，在美国的斡旋下，进行了马拉松式的一系列会谈。

马拉松要跑 42 公里多。

而重庆谈判也谈了 42 天多。

当蒋介石给毛泽东发出电报邀请其来重庆会谈时，估计也没有想到毛泽东真的会来。

他原本的想法大概是只要毛不来，就一把掀翻谈判桌，摊着双手对着所有人大喊：看，毛泽东对和平谈判没有诚意，都不敢来重庆，我也很无奈啊！

偏偏，毛泽东居然真的来了。

仅这一消息就已让全国都沸腾了。

毛泽东之所以敢赴「鸿门宴」，各方面其实考虑了很多因素，也做了最坏的准备。

但蒋介石认为，毛泽东之所以来主要是因为天命所归。

他在日记里写道：毛泽东果应召来渝，此虽威德所致，而实上帝所赐也。

这既是两个老对手十几年较量后的一场面对面交锋，更是一场关乎国运，关乎两党未来，并最终影响了历史走向的大事件。

在这场被后世称为「重庆谈判」的 40 多天里，有太多的明枪暗箭，风起云涌。

也就有了无数的唇枪舌战、针锋相对，甚至就连重庆谈判期间，围绕毛泽东创作的《沁园春·雪》，都有一箩筐的精彩故事。

但所有的这些故事，都没有一个非常不起眼的细节让我震撼。

02

据统计，重庆谈判期间，毛泽东与蒋介石的直接会谈差不多有 10 次左右。

在谈判桌上, 双方围绕政府、军队等重大原则问题，进行了激烈的辩论和斗争。

谈判之外，毛泽东还要参加各类宴会，出席各种公开场合，会见各个派系的代表人物，时不时和别有用心的记者们谈笑风生。

压力之大，精神之高度紧张，可以想象。

出人意料的是，虽然毛泽东每天都需要竭尽心力斗智斗勇，但在重庆的时间里，原本烟不离手的他，却像戒烟了一样，从来不靠香烟提神醒脑,，思考论战。

在和蒋介石进行的数次会谈中，更是一根都没有抽！

特别值得说明的是，这个细节并不是我发现的。

真正第一个注意到这个细节的人，是蒋介石。

重庆谈判后，蒋介石的亲信陈布雷问他对毛泽东的评价。

蒋介石回忆了一会儿，深有感触地说;

「毛泽东此人不可轻视。他嗜烟如命, 手执一缕, 绵绵不断, 据说一天要抽 50 支烟。但他知道我不吸烟, 在同我会谈期间, 竟然决不抽一支烟。对他的决心和精神, 不可少视啊! 」

从这段评价里，我们至少可以得出两个结论：

第一，蒋介石虽然一开始并不把毛泽东和红军放在眼里，动辄斥之以「共匪」，但对手多年，惺惺相惜，他依然尊重对手，并给予了公正客观的评价。这种心胸值得我们肯定。

第二，毛泽东居然能够对几十年的老烟瘾说停就停，这是何等惊人的意志力和自控能力！这样的自律更是值得我们去探究学习。

当然，除了毛泽东，客观来说，蒋介石年轻的时候也有过一段痛苦悔恨后，刻苦自律的经历。

而且两人都推崇的曾国藩，也是一个自律到极致的人。

曾国藩还经常引用一句名言来激励自己：

律己足以服人，量宽足以得人，身先足以率人。

而毛泽东拥有这样的自律能力，真的不是天生的。

1921 年 1 月 28 日，他在给彭璜写的一封信里吐露: 「弟有一最大缺点而不好意思向人公开者，即意弱是也。兄常谓我意志强，实则我有自知之明: 知最弱莫如我之意志!

但仅仅二十年后，他的意志力和自律能力就让蒋介石感到震惊。

这种意志力和自律能力一直保持到了他晚年。

1972 年 2 月，中美建交，毛泽东与尼克松、基辛格进行了一场历史性的会见。整个会见的过程是在幽默、轻松的气氛中展开的。

但从实质上看，并非一般说笑，毛泽东在会见的全过程中始终贯穿着自己坚定的原则和意志。他漫不经心、诙谐随意地驾驭着整个谈话。

以至使基辛格感到，除了戴高乐之外，从来没有遇到过一个人像毛泽东那样具有如此高度集中、不加掩饰的意志力。他成了凌驾整个房间的中心。

其实，毛泽东之所以能够有惊人的意志力和自律能力，正是因为他在年轻的时候，就意识到了自身意志的薄弱，更意识到了意志力对于人生的重要意义，经过刻苦修炼后的结果。

这段苦心修炼的经历值得每一个想要自律、想要升华自己人生的人学习。

我综合了大量史料，深入分析后，将这种修炼的过程，分为了四个层次。和大家一起分享。

03

第一个层次：学会从小事小节开始修炼自律

早在湖南第一师范求学的时候, 毛泽东就有意识地到喧闹的地方去练习闹中求静, 静中求学。

有一次, 他拿着书到长沙市最热闹的南门口去阅读， 任凭人来人往。声音嘈杂, 他只顾自己专心致志地看书。

有一位同学问他: 「你怎么到这种地方来看书啊?人来车往那么乱, 能看得下去吗? 」

毛泽东说:「就因为乱, 我才要来这里看。我要锻炼自己。」

同学又问「这是练的哪门子功？」

毛泽东答道: 「我们的国家不乱吗? 我要锻炼自己不为乱所动, 在乱中仍然集中全部精力去办成一件事, 朝着自己的目标走下去!」

在闹市中坚持读书，只是一件非常不起眼的小事。

却是修炼心性的一个好方法。

因为，成大事的人，首先就是要管得住小节。

要想修炼自律，从来都不是天天想着：现在自律不重要，等哪天要做大事了，需要了，我再来修炼。

因为真正要做一件大事的时候，需要的是你全身心的投入，已经没有精力和时间来给你练自律了。

不要一上来就给自己设计如何宏大的自律改变计划。

从一个小目标开始，形成一种习惯，让自律成为本能，又不带来很大的心理负担。

很多人就是因为调子定的太高，一尝试后发现根本做不到，而变得更加堕落的。

自律的关键，就是在私底下、无人时、细微处能否做到慎独慎微。

在这件事上，小的、连续不断的改变，比憋半天放个大招要有效的多。

这也是为什么很多人加强自律，都是从定期整理房间、每天去健身、早上背单词开始的。

因为这样坚持起来比较容易，而效果又非常明显。

每天自律一点点，就能一点点自律起来。

04

第二个层次：学会借助各种方式帮助强化自律

1912 年的时候毛泽东曾经有过一段时间的退学。

退学后的毛泽东寄居在湘乡会馆
使用 App 查看完整内容目前，该付费内容的完整版仅支持在 App 中查看
🔗App 内查看`,grade:"S",commentCount:136,comments:[{author:"(匿名)",content:"这是高考作文吗？以毛泽东为例，阐述自律的方法。",voteCount:1265},{author:"(匿名)",content:"但是夸主席的，我一律点赞。",voteCount:1122},{author:"(匿名)",content:`简单的来说，不要一直关注"我想变的很自律，或者我想成为一个自律的人"这件事，这个是结果，是结果! 颠倒因果，本末倒置肯定自律不起来。
我更喜欢用"专注"这个词代替自律，对于一些不懂何为真正的自律的新人来讲，自律会给我我们带来一种铺面而来的压迫感和很大的强制性，那会损伤很大的情绪力量，更加不利于学习。
换句话说"自律"是"专注"的产物，我们关注的重点应该是内容本身，学习这件事本身，把自己全身心的投入到过程本身，令自己能真正感受到学习的快乐和自我满足，这个才是最重要的。所以研究怎么激励自己是最重要的，或者说享受学习。`,voteCount:521},{author:"(匿名)",content:"像满分文案一样优秀，但目的不在应试而是育人[调皮]",voteCount:438},{author:"(匿名)",content:"不用学其他人，专心学习教员，就能指导人生了。",voteCount:433},{author:"(匿名)",content:`和自律没关系，自律已然是果上的事了。因是毛主席是拥有一定的定力，主席通过在人群嘈杂的环境下读书训练定力，也就是控制起心动念的能力，控制眼耳鼻舌身意六根的能力，有了这种能力什么都可以做好，
自律只不过就是靠意志力强迫自己做一件事情成为习惯而已，人的意志力是有限的，早些年被自律害惨了，没有自律的因，想有自律的果，不可能的。`,voteCount:386},{author:"(匿名)",content:"毛泽东还和同学尝试过一段时间“共产主义”生活，衣服大家穿，东西一起吃，工资一起用，不过不到一个月他就表示这种生活是不可行的。是不是真共产不重要，而是他真的会去尝试自己理想中的生活，进行实践，而不是对自己相信的理论盲信。",voteCount:303},{author:"(匿名)",content:`谈的成果和事迹多了，反而有点厌。
教员那些不叫自律，是懂得什么有意义什么没意义，分得清事情轻重。
国民革命失败了，他要去再探一条新路出来，知道在国民党底下干不长久，所以不留恋；
钱财珠宝不能吃不能喝，在国民党统治下大概也换不来真东西，不如换些人心，所以洒脱；
民国动荡不安，只要有吃有穿，其他任何东西无益于救亡，革命时时转移随时都会失去，不如买两本书来思索前路，来的实在。

这种行为说成是自律，实在有些偏差，对想要自律的人还有些误导[语塞]把他们再次引导到类似于定“不晚睡”目标的无意义的目标自律里。

没有核心的思想体系和远大目标，即便完美地完成了计划，和工厂里24小时连轴转的麻木工人有多大区别。这种自律恐怕也随时会崩塌，根本做不到教员的无缝切换。

说来说去，还是得有远大理想目标，然后坚持不懈的为之奋斗[捂脸]问题又绕回来了，现代的青年群体，到底应该有什么样的理想，什么样的目标，国家究竟有什么问题，到哪里学什么才能解决，现代的生活吃喝穿行完全够了，在这之上又要追寻什么幸福。

看过先辈的生涯，问题简直越绕越大[语塞]要改变社会，个人实在是太渺小了，最后还是回到要自身努力学习奋斗上来，但是我是为什么要到这里来着？`,voteCount:186},{author:"(匿名)",content:"凡是。九宫格输入错误。",voteCount:174},{author:"(匿名)",content:"这个角度讲伟人，很好，贴合当下大众关注的点，而且讲的是事实，不黑不吹，这才是宣传仁人志士的基本基调。",voteCount:0}]},{id:"653414400",question:"如何看待现在的初中生高中生普遍睡 5~6 个小时？",author:"怀石",voteUp:19663,excerpt:"我可能是父母口中别人家的孩子。 初三之际， 每天五点前（pm） 写好所有作业，书包都是空荡荡的。 准时10.00pm 睡觉中考成绩全校第三，高分进入最好的高中 羡慕吗？ 编得和神话一样！ 它的确是真实的，但还有部分是人们看不见的。 主要有两个原因 写作业效率过高一定是有问题的放学前写完作业的代价是： A. 我从来不下课。 下课是我写作业的黄金时间 两耳不闻窗外事，搞得班里发生了什么事情，我是一概不知 （有两个同学轰轰烈烈…",content:`我可能是父母口中别人家的孩子。
初三之际，
每天五点前（pm）写好所有作业，书包都是空荡荡的。
准时10.00pm 睡觉
中考成绩全校第三，高分进入最好的高中

羡慕吗？
编得和神话一样！
它的确是真实的，但还有部分是人们看不见的。

主要有两个原因
写作业效率过高一定是有问题的
放学前写完作业的代价是：
A. 我从来不下课。
 下课是我写作业的黄金时间
 两耳不闻窗外事，搞得班里发生了什么事情，我是一概不知
 （有两个同学轰轰烈烈地恋爱，满城风雨，
 直到班主任在班里宣布对他们处分，我才知道，
 这两人居然是一对的！）
 甚至上课我都在偷偷写作业，很少听
 被老师抓到过，骂过，撕过本子，继续写
 老师为了预防我们上课写作业
 进行了“供给侧”改革
 作业（亲爱的试卷们）非得到放学才发
 上有政策，下有对策
 怎么破？
偷试卷呗！
 一行人在下午的灿阳下行动，大摇大摆地走进教师办公室，
 看到桌上出现的那一叠试卷，随手卷起几张
 走人。。。
 当然也被抓到过，当面
 辩解：“读书人的事，怎么能算作偷呢！”
 结果非常耐人寻味
 老师觉得我们特别喜欢写试卷，每人额外加了两张科学卷子
B. 我抄作业，即使我是他人心中的好学生
 一份基本的作业
 在我一拿到的时候，就分为三部分，
 分由我们三个人做，每人做两个部分
 等价于每个部分都有两个人做，方便查错
 这样产生的答案，高效而且精准
 这份答案背后有复杂的产业链
 很多同学都是这份答案的“受益者”
 第一梯队当然是我们三人
 第二梯队则是我们三人的好友，尤其是同桌
 （因此很多人希望成为我同桌）
 也许会问，那么抄抄写写的作业总高效不起来了吧
 不，有的同学为了让我先写“高技术含量”的作业
 主动提出“我帮你写抄写作业，你把那道压轴题快写完”
 所以抄写词语，默写古诗之类的作业我基本没做过......
 不用担心我古诗古文背不来
 因为语文老师和我“有仇”
 每天一来不上课，先抽我背古文，抽得最多的是《岳阳楼记》
 我敢保证一字不差、流利地背完，直到现在。
 后来抄我作业的人太多了
 别问我为什么不建群抄作业（我不玩手机因为 【其实是我爸妈不给我配设备】）
 我的作业开始乱了 经常不知道在谁手里
 每天交作业我都很崩溃：
 作为一个全班第一个写完作业的人，我却交不了作业！岂有此理！
然后我拥有了第一个私人秘书——我的同桌
她负责登记：谁/什么时候/借走了/我的什么作业/何时归还

2. 每个优秀的人都有默默努力的时光。
统一补课下课结束（8.00pm）
20min 背单词 + 30min 看英文原版书 + 30min 英文电影
 然后洗漱睡觉
我的中考英语满分（15人之一）不是凭空而来的
我从小就背的那些古文古诗
厚厚地一大摞 （虽然以前也是一把鼻涕一把泪地背完的）
不要问我为什么上课不听也能名列前茅
我之前的努力你没看见而已

因此，我觉得我读书还行的主要原因有两个
充足的睡眠
睡眠真的很重要，这个不仅仅与学习有关
这个和 寿命（！）有关，所以，还是珍爱生命吧
2. 防止无效学习
我抄作业的本质是：节约时间
节省下来的时间分为两块：a) 睡觉 b）做更有效用的提升成绩的事情
比如：自己做压轴题+奥赛教程+背单词+看原版书
刷题很多时候是考试技巧的磨炼，像多吸收新知识、新方法才是提升实力的硬核步骤啊
一遍又一遍、机械地重复解二元一次方程（一个例子）没有任何意义
这个时候，你可以选择不做此类题型
为了应付老师，只有抄作业了
当然和老师沟通好，直接不做也是本领（至少我没沟通好，还被语文老师穿小鞋了）

【 结 论 】
怎么看待普遍睡5/6h？
我认为不妥。
如何改进？ 减少无效学习！

FAQ：
 1. 这个是对雅思（答主雅思7.5）的一些心得
我的雅思之路

2. 为什么我在高中没必要 抄作业？
 我们是答案和练习一起发的，老师也基本不查。不想做的不做就行了，没必要自欺欺人。 
3. 为什么我们初中这么早就放了？
教育局规定的学校放学时间是5.00pm（我觉得不早）
但是初三，家长和老师联合组织统一补习（有偿/违规/可能被抓），所以真正下课时间8.00pm
4. 评论区有两类：a) 我不相信你编的故事
 b) 这种事情多了去了，没什么稀奇
以上两类同学可以自己杠啊，别怼我
你们的言论成功证明了：a）我所言属实 b）这不是什么大概率事件
5. 说我读书好本质是聪明的各位，真的谬赞了。我觉得大家智商都差不多，就是从小积累的学习习惯和恶性循环罢了...
今天起早写了一点干货
十个“你一看就嫌弃 / 其实很有用的”学习技巧

2025更新：看到高中的自己写的稚嫩回答还是蛮好玩的，答主马上要去读Phd了，方向的话给大家一点提示“attention is all you need”。希望各位都能找到自己喜欢的道路，并且坚定地走下去`,grade:"A",commentCount:1548,comments:[{author:"(匿名)",content:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈人设啊我也为了人设活着",voteCount:1448},{author:"(匿名)",content:"脑子灵活的学生学习效率真高啊！👍小时候家长给你打得基础没有白费！",voteCount:937},{author:"(匿名)",content:"哈哈哈哈笑死我了",voteCount:919},{author:"(匿名)",content:"我的人设已经崩了，上课传纸条和在家偷偷玩手机被老师发现了，然后我就从老师眼中乖巧听话的好学生变成了问题学生",voteCount:496},{author:"(匿名)",content:"我中考是全校第七 然而现在在一个普通211上大学",voteCount:254},{author:"(匿名)",content:"跟我一模一样!!",voteCount:236},{author:"(匿名)",content:"人设都是狗屎，老师就算再拿白眼翻我也阻止不了我拿高分，况且她还指望我给她挣奖金呢。所以，有分就有一切，一个脑子正常的老师不管心理有多变态也会尽量容忍一个高分学生的。（我今天才知道我当时早恋的事我班主任还跟我妈提过，但愣是没来找我事，更别提啥处分了，相较那些低分的老哥们有点事让她不爽就要被暴揍，我就是活在天堂hhhhh）",voteCount:163},{author:"(匿名)",content:"才初三啊，压力这么大的么，睡得也太少了吧，我初三也是10点就睡觉了，高三才会拼命啊，这现在初三就这么狠了么？",voteCount:157},{author:"(匿名)",content:"这个其实挺真实的",voteCount:157},{author:"(匿名)",content:"写到十二点我该怎么办☹️",voteCount:140}]},{id:"1992688020843946197",question:"如何评价埃隆·马斯克这个人？",author:"月下小狸",voteUp:19480,excerpt:"马斯克身上，几乎看不到那种典型的老登气息。 老登最明显的特征之一，就是说话假大空、弯弯绕——满嘴正确、满口宏大叙事，但一落到具体问题就开始打太极、绕圈子、回避现实。要么摆资格，要么讲情怀，就是不说真话。有的甚至还夹杂着凶狠和戾气，比如那个西贝。 但马斯克不是这样。 我看过他在猎鹰九号项目接连失败时接受的采访。那不是一次两次的小挫折，而是连续的、公开的、被所有人围观的失败。镜头里的他，眼睛红了，甚至…",content:`马斯克身上，几乎看不到那种典型的老登气息。

老登最明显的特征之一，就是说话假大空、弯弯绕——满嘴正确、满口宏大叙事，但一落到具体问题就开始打太极、绕圈子、回避现实。要么摆资格，要么讲情怀，就是不说真话。有的甚至还夹杂着凶狠和戾气，比如那个西贝。

但马斯克不是这样。

我看过他在猎鹰九号项目接连失败时接受的采访。那不是一次两次的小挫折，而是连续的、公开的、被所有人围观的失败。镜头里的他，眼睛红了，甚至饱含热泪，但说话依然克制，态度非常坚定：难是难，但我会继续。

那一刻真的很打动人。他没有用空话给自己找台阶，也没有用宏大的说辞粉饰失败，你能同时看到脆弱和执着，眼泪和倔强，还有一种不遮不掩的真实和坦诚。

还有一个场景我印象很深，他早期和杨元庆同台参加节目，聊到产品和市场时说，一个真正好的产品，不应该依赖销售，也不应该靠营销轰炸。如果产品足够好，大家自然会喜欢，自然会买。面对杨的强势和轻蔑，他不卑不亢地表达了自己很强的信念：把产品本身做到极致，就是最大的竞争力。你们可以去看那段视频，那一刻，他的眼神真的是在发光。

给我类似感受的，还有杨振宁。他身上同样没有老登气息。

有一次记者问他和李政道之间的矛盾，甚至追问将来还有没有可能和解。换成很多人，可能会打哈哈、转移话题，或者用几句空泛的话糊弄过去。但杨振宁没有，他是微笑着正面回答的，态度温和，真诚，直率，没有回避，也没有表演。

还有一次节目，有听众问他：是不是你们那个年代发论文更容易，现在学术竞争是不是比以前激烈得多？他很坦然地承认，现在确实难多了，还说，他自己现在的论文，也被拒过。这种回答一点都不伟光正，非常真实，让人舒服。
他们都有一个很清晰的共同点：说话不假、不空、不绕。没有端着，没有居高临下，没有打太极，没有那种“我早就看透一切”的老成油滑，更没有说一堆无用的话。更多的是一种平视世界的状态——承认复杂、承认失败、承认不确定，但依然坚定向前，这才是真正的高认知、高水平。
在他们身上看到的，是一些很难得的东西：真实、坦诚、笃定、热情、旺盛的生命力，还有没有被磨掉的少年气。`,grade:"A",commentCount:1108,comments:[{author:"(匿名)",content:"国内那么多大佬采访，很少能听到实话的。大部分都是吹。有几个采访你是真能学到东西的。或者会跟你说点真话的，王健林，雷军，潘石屹。这几个是我觉得采访会说真话给你听的人。其他的要么只是分享，很少表达过于主观的内容。不过现在大佬都不怎么公开发言了。还有人能说就不错了。[为难]",voteCount:2239},{author:"(匿名)",content:"他们是“不背叛自我”的人。",voteCount:822},{author:"(匿名)",content:"老登的“老”不代表年纪。",voteCount:604},{author:"(匿名)",content:"新闻上的成语 官话 生怕普通人能听懂。",voteCount:545},{author:"(匿名)",content:"还有马云，给人一种他是真这么想的，很理想主义，很摇滚的感觉",voteCount:522},{author:"(匿名)",content:`他们都有一个很清晰的共同点：说话不假、不空、不绕。没有端着，没有居高临下，没有打太极，没有那种“我早就看透一切”的老成油滑，更没有说一堆无用的话。更多的是一种平视世界的状态——承认复杂、承认失败、承认不确定，但依然坚定向前，这才是真正的高认知、高水平。

在他们身上看到的，是一些很难得的东西：真实、坦诚、笃定、热情、旺盛的生命力，还有没有被磨掉的少年气。`,voteCount:394},{author:"(匿名)",content:"雷军？",voteCount:312},{author:"(匿名)",content:"简单真实的人很少有老登味，这些都是孩子一样的品质",voteCount:202},{author:"(匿名)",content:`他当时就是这么想的，有问题？

你的意思是，有人高三立志要考清华，后来没考上，就是「不诚实」？那你从小到大喊过多少口号，都100%实现了？[尴尬]`,voteCount:185},{author:"(匿名)",content:`就冲他为了解决工程问题，一个月不离开厂房，而且真的直接拿个枕头就睡在了桌子下面了，而且一直以来都是这样。收购推特，7000多人，一点点查代码，干到最后只有1000多人
国内哪个大佬能做到？`,voteCount:184}]},{id:"352716797",question:"那些你认识的高考严重超常发挥考入名校的人，后来怎么样了？",author:"暮年",voteUp:19427,excerpt:"是本人了 家在甘肃，平时年级180+，高考爆发，年级14，现在在同济 填志愿的时候就有会被吊打的准备，来了之后才发现我还是太天真 舍友一个浙江的，一个江苏的，平时总说自己英语不行怎样怎样，考试才知道他们高考练习都做的六级(手动微笑) 英语课上很多沿海城市的同学上课发言，口音真的很棒。一做听力我全程懵逼，其他同学轻轻松松面带微笑最后全对 当然，英语只是其中一方面，但同时也是很能反映问题的一面 其他就还有很多了，…",content:`是本人了
家在甘肃，平时年级180+，高考爆发，年级14，现在在同济
填志愿的时候就有会被吊打的准备，来了之后才发现我还是太天真
舍友一个浙江的，一个江苏的，平时总说自己英语不行怎样怎样，考试才知道他们高考练习都做的六级(手动微笑)
英语课上很多沿海城市的同学上课发言，口音真的很棒。一做听力我全程懵逼，其他同学轻轻松松面带微笑最后全对
当然，英语只是其中一方面，但同时也是很能反映问题的一面
其他就还有很多了，我认识的很多现在的同学，能力什么都很出众，兴趣爱好也很多，各方面习惯等等都能看出，他们都是非常优秀的人。但在我记忆中，我高中所在的尖子班，大多数同学都很“乖”，本来我以为，学霸就是那样的，来到这里之后才发现根本不是这样
就不细说其他培养方式等等方面的差别了
来了之后真的是各方面一直在被吊打
有的时候不禁也在怀疑我当时是不是应该选择复读，考一个符合我实力的分数，去一个就那样的大学，也不至于这么累
但我不后悔，在这样一个优秀的环境中，我明显的能感受到自己的进步，每天都在逼着自己努力再努力
继续加油吧，总有一天我会和他们一样

分割线怎么弄啊我不太会所以这行字就当是分割线了

此回答最初写于17年底的一个深夜（没记错的话），在感受到与周围同学的差距后算是堕落了一段日子，还好及时调整状态。大学四年过得平平淡淡，没有什么逆袭打脸也没让自己落后，这四年里也陆陆续续能收到私信或是回复，有些回答了，有些不知该怎么答就放着了。
不知道为什么，这个回答最近又每天都能收到一些点赞，以及询问近况和有所共鸣的私信，于是统一给大家更新下状况。
21年考研，现已上岸复旦。因为报志愿时没考虑清楚，调剂到一个没接触过的专业。相当于又是从头开始，但可能因为已经有本科时的经验了，近期并不焦虑和慌张，每天都在努力充实自己。
祝看到这条回答的所有知友也都能一步步实现自己的梦想，谢谢大家支持。`,grade:"A",commentCount:1602,comments:[{author:"(匿名)",content:"浙江和江苏的考生应该都是被逼出来的，高考的数学试卷简直丧心病狂",voteCount:2831},{author:"(匿名)",content:"年级十四上同济 天水一中还是兰炼一中？",voteCount:1382},{author:"(匿名)",content:"同甘肃，英语被吊打真的是感同身受",voteCount:870},{author:"(匿名)",content:"不地图炮，就仅我所见，甘肃的同学们英语跟不上但是数学物理还是可以的。",voteCount:750},{author:"(匿名)",content:"甘肃+1嘻嘻(♡˙︶˙♡)",voteCount:658},{author:"(匿名)",content:"哥也是同济的",voteCount:530},{author:"(匿名)",content:"学长?",voteCount:336},{author:"(匿名)",content:"对的，我真的觉得数学物理什么的差别并不是很大，而且理科的学习相对来说偏短期一些，努力一下半个学期都能进步跟多，而英语的学习不仅仅是一个学期的努力就能赶上的，口语，听力等各方面的提升是一个长期的工作",voteCount:313},{author:"(匿名)",content:"他们数学也很可怕，但感觉大学数学考试中基础题偏多数，所以不会体现的很明显，而且数学之类理科学科凭借较短时期的努力就可以弥补差距",voteCount:297},{author:"(匿名)",content:"厉害了",voteCount:202}]},{id:"50898442",question:"记忆力超群是种怎样的体验？",author:"匿名用户",voteUp:18603,excerpt:"这是要首答的节奏啊。初三的时候复习数学，可以清楚的说出来现在做的复习题我以前做过，在哪本书的第几页。见过的人长什么样叫什么，还没忘记过。大学同学的手机号全部背得出来，上课考勤点名，完全不用考勤表。我觉得记忆力算好了吧，可是马勒戈壁，我是个路痴啊卧槽！！ 体验的话，考试之前复习效率高，临时抱佛脚成绩超过了好多学霸。 大一的时候辩论赛，比赛前一夜，会召集几个人针对明天的辩题模拟辩论，讨论如何应对各种问…",content:`这是要首答的节奏啊。初三的时候复习数学，可以清楚的说出来现在做的复习题我以前做过，在哪本书的第几页。见过的人长什么样叫什么，还没忘记过。大学同学的手机号全部背得出来，上课考勤点名，完全不用考勤表。我觉得记忆力算好了吧，可是马勒戈壁，我是个路痴啊卧槽！！

体验的话，考试之前复习效率高，临时抱佛脚成绩超过了好多学霸。
大一的时候辩论赛，比赛前一夜，会召集几个人针对明天的辩题模拟辩论，讨论如何应对各种问题，完全不用做笔记。然后默默的拿到了学校辩论赛的冠军。这里吐槽一下，奖品不是奖杯，是塔马一个保温杯一张奖状和一人一箱加多宝卧槽，敢不敢再傻逼点。。。

其实我自认为还是有一些可以提高记忆力的好方法的，赞多的话写出来分享下。

⊙▽⊙

并不是吊大家胃口，我只是一只苦逼大学狗，也得上课不是。

首先给大家信心，记忆力完全是可以自我训练出来的。
关于方法，且听我讲讲我的小学。
小学的时候丢三落四，花样忘记带作业，花样忘记用过的东西放在了哪里，总之就是鱼的记忆。小时候总是被同学嘲笑粗心大意，被父母指责，还要被老师说。
我并不是粗心大意，真的是塔马记不住事情啊卧槽。
革命性的改变是在我四年级的时候。
当时学校发了一本小书，优秀古诗词精选。当年真的是无聊吧，不知道为什么就和所谓的“别人家的孩子”比背这本书，看谁背的多背的快。那货爸爸是个语文老师啊，理所当然，被碾压了。还他妈冷嘲热讽我啊卧槽。小学的孩子什么样大家都懂。 大家全他妈来笑话我，当年脆弱的自尊啊。委屈你了。当时决定有朝一日，我要让那些嘲笑我的讽刺我的人全部跪下来仰望我（当年并不能懂这么多，当年只是觉得不服） 从那以后就很少和旁边的朋友交流了，因为我记仇！！！
然后嘞我就天天六点钟起床背书， 然后在家里放了一块小黑板天天背写古诗词 。两三个月之后，我就能把200首古诗词全部 背写下来了。期间每天晚上八点开始写日记，给自己的规定是九点上床睡觉。但是小学生的日记能写多少东西呢，所以写完日记以后到九点睡觉这段时间，是无聊的是寂寞的，是没事干的，又不想睡觉，干什么呢，只能把最近发生的事，看到的事，非学习上的事，回忆梳理，想来想去，自己的心里就会对每件事情有自己的看法自己的疑问，有时候还能想起来一些自己当时做的不好的一些事怎么做能更好一些，或者想起来自己之前找不着的东西放在哪里了。一来二去 ，初中了。
写日记回忆总结已经变成了习惯，莫名其妙的发现自己的记忆力并不差还好像出奇的好，经常被一个特别漂亮的女孩（现女朋友）夸记性真好 ，我现在还能回忆起她夸我时候的场景，真的是她的眼睛会发光，流光溢彩，让我的虚荣心蹭蹭蹭的膨胀。从那以后就很有意识的记住自己能记住的所有东西。
但是记性好怎么显摆呢，也就好好学习最直接了吧。 
然后数理化历史生物习惯满分（这个和记忆力没什么关系，对，就是因为我好好学习来着）。

这时候大家心里一定已经开始骂我了吧，切，说来说去并没有什么卵用。
这你就错了。
干货就得留在最后讲。
初中放假的时候花样无聊，自己就老在想，人能记的住东西到底是个什么原理。现在想想，要是大学报志愿的时候选个什么哲学系，是不是早就走上人生的巅峰了。 
扯远了，接下来再讲一句废话，直播剁屌。
想来想去，还是没想明白，但是却让我研究出一套用来记忆的方法。

来来来大家跟着我一起回想，回想留在记忆深处因为自己感受特别深刻从而留在内心里的一句话，想到了没？ 重点来了，努力回想当时看见这句话是自己的心理状态，好好感受这种感觉。
对，就是你心里称赞你看到的这句话好有道理或者这句话好美的前一瞬间的那种感觉。 记住，是称赞感叹前一瞬间的感觉。
没找着的话说明咱俩没有缘分。 
感觉找到了的话，保持这个感觉和心里状态。
然后让我们给这个保持这个感觉的状态起个名，就叫他高能状态。
好继续，保持住这个感觉，拿起来书，报纸，名片，打开电话本，反正能让你背的东西，开始一字一句的念，不要念太多，两三句话，一定慢，不要急。
然后闭眼，想想刚才念的那几句话，看看记住了没。
应该是记住了的，然后重复上边的步骤，往后背。记住了之后，再重复，再往后。
然后你会发现， 前边记住的好像又忘了，很正常，从头开始，再来一次。然后你会发现 前边的只能隐隐约约记得住。对，没错，去干别的，去想别的事情过一会再回忆，刚才背的东西。能不能想的起来？
估计是有点悬，莫慌，慢慢练习，你的记忆力真的会提升的特别快。

其实高中的时候我就想明白了，这其实是一种让自己注意力高度集中的一种方法 ，只是我用来记东西罢了。
这种我所谓的高能状态，还可以帮助大家快速睡眠。
相信大家都有胡思乱想然后慢慢睡着的经历，对，方法类似，抓自己睡着前一瞬间的感觉，记住。
以后想要 快速睡眠就努力的回忆模拟当自己抓到的这种感觉，我个人觉得是异常的实用。
5
好了，方法就是如此。背东西这方面找不着感觉的话，可以先从睡觉方面学习下怎么抓感觉。

我的方法就是这样了。没帮助到大家的话，还是很愧疚的。
以上。
收藏之前点个赞让我满足下行不行？
==================================================

聊天收费，千字五元。照片或唱歌亦可。欢迎私信试用。

==================================================

秀恩爱死的快，真的是不变的真理，心好塞。求美腻妹子安慰。`,grade:"A",commentCount:1300,comments:[{author:"(匿名)",content:`必须强答。
记忆力好是有弊端的。比如说。拖延症。反正都会记住。考前三个月准备和考前一周背诵没有差别。于是各种拖延。
 一本300多页的教材。用6个小时左右可以读完并记住重点百分之八十。传说中的一目十行吧。但是后遗症是整个人虚脱。吃不下饭。
 这得益于小学时强大的阅读量。家里有面书墙。它是空的。有天我说。老爸你能把书墙填满嘛。我爸说我填满了你会认真读每本书嘛。我说会。不但要读还要快。我说好的。那个暑假没日没夜的看书。只是为了和爸爸打赌。就是那个夏天。我认识了三毛。席慕蓉。余秋雨。等等等等。
 阅读量大带给我的感受是：
 1功能性书籍:快速阅读的话看前言和目录。书的核心思想在前言里阐述鲜明。目录存在的意义就是达到核心思想的过程。掐头去尾。知识点get。
 2文学性书籍：自传型经历感受居多。回忆录轶事为主。散文类心情漫步。励志类无数鸡汤。小说类故事主线和写作环境布局。不同类型带着不同心情。有的放矢。哦。忘了。名著之所以是名著。在梗概。人物刻画。细节补充。性格测写。自成一统。我最爱的名著是。《简爱》。哦哈哈。
 3语言性书籍：语言始源。基本发音。单词。组合词。同义词。反义词。诶。英语的字母发音大部分是固定的。跟中文边旁部首一样。发音和单词结构组合记忆更配哦。中文博大精深。语式结构巩固巩固再巩固。主谓宾。顺过来。倒过去。 语法提炼和重点总结相辅相成。4学术性书籍：论点。实验模型。数据表格。应用反馈。代入性。再论证。这类书籍我更喜欢先倒后正看。逻辑上更合理。节约纠结疑惑的时间。个人习惯哈。不喜勿喷。 
 理解再记忆比直接记忆有效。一份资料。初读找出架构或者脉络。再度确认重点与非重点。最后重复重点记忆和寻找相关文献或理论支撑素材。记忆流程结束。
 说了这么多。核心是。鼓励大家多读多看。量变产生质变。千古恒理。
 记忆力好其实并没有什么卵用。对于我。记忆模式真的只是模式。遇到学术时自动启动。大部分时候。我都活的很无助。
 丢东西。找东西。再丢东西。找东西。家里钥匙放朋友那好几把。因为总丢。
 最后。补充一句。说了这么多。我只是想论证下。记忆力好的人。路痴的几率会无限增大。比如答主和我。筒子们。高楼码起来。`,voteCount:663},{author:"(匿名)",content:"我去年学习了记忆宫殿，效果很好。现在记单词根本不是事。",voteCount:561},{author:"(匿名)",content:`英语高考范文五分钟就背的下来，文言文读读读几遍就可以大差不多背下来，手机号只要想记住就能过目不忘，很多年之前上过辅导班的同学都还能叫得出名字 文综长篇大论别人几小时背会我用几十分钟 ...

呜~至今记得三岁的时候奶奶为了让我乖乖听话骗我有小鸟给我从远方带来果冻吃 然而并不是这样！果冻只是被藏到厨房小柜子里了 ><这算是记忆力较好了吧~ 

不过其实这样的深刻记忆应该大家都会多多少少有一些吧(⊙v⊙)`,voteCount:541},{author:"(匿名)",content:"求分享，作为一个上一秒别人说的东西我下一秒都会忘记的人，觉得自己活着实属不易(ಥ_ಥ)路痴了一年才记住现在学校地图，然而前一个月开启校园夜景模式，我又走丢了。真心羡慕答主这样的人_(:_」∠)_",voteCount:371},{author:"(匿名)",content:"快粗来和我们战五渣分享！！！",voteCount:19},{author:"(匿名)",content:"求分享，求交流。",voteCount:16},{author:"(匿名)",content:"求分享",voteCount:11},{author:"(匿名)",content:"求分享",voteCount:11},{author:"(匿名)",content:"吊胃口",voteCount:7},{author:"(匿名)",content:"写出来啊",voteCount:1}]},{id:"1496759469",question:"有哪些应该坚持的好习惯？",author:"知乎用户X47GrJ",voteUp:17677,excerpt:"1、没事的时候，多看一些高质量的纪录片。 看高质量的纪录片，真的是一种享受。它们能够增加我们的人生体验，引发思考，同时，还会影响我们的三观。 要学会用豆瓣评分筛选影片，一般9.0以上的评分，属于必看的类型。 这里推荐几个我最喜欢的纪录片给大家，一定能够给你启发： （1）河西走廊（五星推荐） （2）人生七年 （3）但是还有书籍 （4）人生第一次 看《河西走廊 》的时候，千万别跳过片头曲，不然你会损失一个亿 2、坚持…",content:`1、没事的时候，多看一些高质量的纪录片。

看高质量的纪录片，真的是一种享受。它们能够增加我们的人生体验，引发思考，同时，还会影响我们的三观。

要学会用豆瓣评分筛选影片，一般9.0以上的评分，属于必看的类型。

这里推荐几个我最喜欢的纪录片给大家，一定能够给你启发：

（1）河西走廊（五星推荐）

（2）人生七年

（3）但是还有书籍

（4）人生第一次

看《河西走廊​​​》的时候，千万别跳过片头曲，不然你会损失一个亿

2、坚持每天复盘。

复盘是精进路上有利的武器，人每天都有很多事要做，有时候忙的晕头转向。复盘可以帮助你看清当下的自己，什么该做，什么不该做。

每天23点，我都会写复盘日记，坚持了大半年，收获很足，它让我思维更敏锐，更专注，不会被一些琐事分散精力。
3、熟练的掌握一门外语

外语不仅是学校里的必修课，更有可能是你走进社会安身立命的根本。即使我们没有出国的需求，在工作中与客户的交流，查阅国外文献乃至企业间的国际合作，都是需要良好的外语基础的，而英语应用的广泛性，决定了英语方面有一技之长的人，是被社会普遍需要的，也是对自身未来的发展大有裨益的，如果觉得独自学习缺乏积极性，那找一个人专业的老师陪伴你就是最好的选择。

4、无论何时何地，保持干净的外表，会给你带来意想不到的收获。

除了衣着外，如果说什么能让你在人群中脱颖而出，那一定是香水，香水如衣服，同时也是一个人的自我表达，一个适合自己的香水可以极大的提升气质，尤其是男生。

我最近常用的也是木质香的一款，被名字吸引到的，叫苦尽，是乌木和茶叶的味道，茶的清雅醇香，再加上随后乌木的深沉，闻着虽然苦，但并不沉闷，中间穿插的蜂蜜中和了木质香的清冷，到后面就是淡淡的回甘了，干净又舒服，很贴合名字，苦尽之后总有回甘。小众且高级，不撞香。
5、坚持护肤
曾有调查显示，如果用10分钟看一个人，那目光停留在脸部的时间是7分钟，停留在身上的是3分钟。可以说，养成一张干净的脸，会给人留下非常好的第一印象。

护肤基础篇
护肤的第一步当然是洁面啦，自己用的这款洗面奶的泡泡特别细腻，配方保护皮脂膜，减少皮肤出油信号，预防油脂堵塞毛孔，避免毛孔被撑大。很温和，适合所有肤质，对面部一点也不刺激，早上起来也不会感到刺鼻难受，清洁力不错的同时，洗完也不会干巴巴的。

护肤进阶篇
护肤是一个长期且要坚持的过程，想要养成一张干净的脸部最重要的就是没有痘痘粉刺出油旺盛等问题。

6、保持定期整理。

生活上面：

（1）家里别堆太多东西，容易影响人的情绪。别想着有一天能用上，相信我，你就是放那积灰的，基本用不上。所以该扔的就扔掉，没什么可惜的。精简的生活，人生才会高效。

（2）一次别买太多东西，很多时候也派不上用场，我的建议，三个月内用不上的就别买了。

学习上面：

（1）定期清空收藏夹。微信、豆瓣、知乎收藏的文章，建议一个月清理一次，千万不要一键收藏、永远尘封。一篇好文，收藏不等于掌握了，反复吸收实践，才能真正消化。

（2）与其收藏，不如点赞，起码找起来省事方便。就如这篇回答一样，你收藏之后不一定找得到，但是点赞了很容易在首页看到。

7、要养成读书、学习、健身的好习惯，记住一点：规范化的执行。

同样的时间做同样的事，这就是规范化。

多数人最自律的时期是高三，那时候，你的所有计划是不是都安排好了，什么时候做什么事，这就是规范化。

规范化能够把习惯融入你的生物钟里，到了某个时间，大脑里的生物钟就会推动你去做这件事。

8、每天都要吃早餐。

有些人或者为了减肥、或者是时间太赶没时间，选择不吃早餐。

早餐不吃，容易导致血糖不足，血糖浓度低于正常值，大脑的兴奋性降低，反应迟钝，注意力不集中，影响工作和学习效率。
而且，早餐的营养应当是一天中最全面的，

9、克服拖延的有效方法：5秒法则。

早上不想起床的时候，在心里默念5秒，然后马上起床，亲测有效。

10、阅读是回报最丰厚的一笔投资。

坚持阅读快3年了，回过头看，变化真的好大。`,grade:"A",commentCount:259,comments:[{author:"(匿名)",content:`长期阅读真的是能改变一个人的气质，心态会越来越平和，而不至于让偏见导致自己的局限和狭隘。
我决定以后刷知乎真的不能只刷高赞的答案，第一时间先看作者的主页所有回答是不是有公众号导向，那些大部分答主主页回答都是高赞答案更多的像是搬运整合拼凑出来的替代性经验，看似有用但答主其实自身没有真实体验过，因为一个人的一生的时间和精力有限，那些答主不可能有那么多实践经验回答问题，只能搬运书籍或者老瓶装新酒，所以显得不够深刻、贴近现实，而像作者这样主页高赞答案很少只有零星几个的普通人给出的建议反而才更纯粹更真实更能给我带来惊喜，因为大家都只是芸芸众生中的一个平凡人，都是在为了自己不平凡而努力着，与作者共勉之。[拜托][拜托]`,voteCount:831},{author:"(匿名)",content:"河西走廊 感觉真的不错。",voteCount:74},{author:"(匿名)",content:"比动辄几十条的人生建议有用多了。",voteCount:48},{author:"(匿名)",content:"人生第一次 会边看边哭的",voteCount:46},{author:"(匿名)",content:"看完河西走廊，再走一趟青甘大环线，领略青海长云暗雪山，感受大漠孤烟，长河落日，很难忘的一次回忆。",voteCount:39},{author:"(匿名)",content:"我也超喜欢看纪录片，[捂嘴][捂嘴]但倾向于动物世界自然类的",voteCount:23},{author:"(匿名)",content:"除了3不同意",voteCount:14},{author:"(匿名)",content:"简单易行",voteCount:12},{author:"(匿名)",content:"片头曲能给人看的热泪盈眶",voteCount:10},{author:"(匿名)",content:"6严重同意",voteCount:3}]},{id:"1373525545",question:"一个自律的人有多可怕？",author:"萝卜吃了你",voteUp:16764,excerpt:"我妈，从30岁左右开始，十几年来，每天早上醒来运动一小时，晚上不吃面食，只吃水果或者一些低热量食物，再运动一小时到两小时，现在快50了，平板支撑可以一次性做15分钟，我都服了！生我弟的时候，胖到150，自己一年时间减到85，坚持到现在快20年，体重没有超过95的，我真的太佩服她了，很自律，每天必喝蜂蜜，必做运动，必吃水果，必大量饮水，必搞卫生两遍。我怎么又懒又没自律呢？感觉不像亲生的，一天胡吃海喝还胖得要死，…",content:"我妈，从30岁左右开始，十几年来，每天早上醒来运动一小时，晚上不吃面食，只吃水果或者一些低热量食物，再运动一小时到两小时，现在快50了，平板支撑可以一次性做15分钟，我都服了！生我弟的时候，胖到150，自己一年时间减到85，坚持到现在快20年，体重没有超过95的，我真的太佩服她了，很自律，每天必喝蜂蜜，必做运动，必吃水果，必大量饮水，必搞卫生两遍。我怎么又懒又没自律呢？感觉不像亲生的，一天胡吃海喝还胖得要死，还没有毅力减肥，愁死个人，最后附上快50的老妈的照片哈哈，身材比我好很多，还很潮的小姐姐既视感",grade:"A",commentCount:2752,comments:[{author:"(匿名)",content:"懒妈妈养出勤快女儿，勤快妈妈养出懒女儿，我就是这样[捂脸]",voteCount:5420},{author:"(匿名)",content:"好看~ 我也看过同学妈妈比她都像少女的，就是同学放两个背影照片在朋友圈，我觉得有张背影就很少女、很娇俏，没想到是她妈妈，保养的太牛了[捂脸]",voteCount:1359},{author:"(匿名)",content:"哈哈哈哈，对呀，我和我妈出街，别人都以为是我姐，甚至平时不怎么聊天的邻居，都以为是我姐。而且她每天护肤也很严格。而且我家是非常普通的家庭，父母离异很早，老妈一个人带我和弟弟，也没有再婚，除了照顾我们，还要努力挣钱，每天也很忙很累，所以我更佩服她了",voteCount:1109},{author:"(匿名)",content:"光看腿，你说20我都信",voteCount:514},{author:"(匿名)",content:"天呐，一个人带你们姐弟，还有时间打扫两边屋子和做运动～我要好好反省反省自己了。",voteCount:495},{author:"(匿名)",content:"看这家乱的不像是做两遍卫生啊……我一个85后家里都比这干净整齐",voteCount:389},{author:"(匿名)",content:"我妈懒我也懒，两个人互相比懒，看谁懒得过谁。我不在家我妈就日常搞卫生，我在家我妈就想我帮她多做做家务[捂脸]",voteCount:267},{author:"(匿名)",content:"而且我妈妈做菜特别好吃，还经常会出一些新菜新花样给我们做，真的不是我夸好吃，不论亲戚邻居都特别喜欢过节的时候来我家蹭饭",voteCount:209},{author:"(匿名)",content:"作为一个单亲妈妈，我好像能理解你的妈妈，运动是害怕身体一旦垮了就没有办法照顾孩子，必须是不敢生病不敢死，另外一个原因就是能做一个更好的自己[爱]",voteCount:185},{author:"(匿名)",content:"已赞。",voteCount:63}]},{id:"1857488153",question:"你坚持使用了一年以上的时间管理方法是怎样的？",author:"常青",voteUp:16648,excerpt:"这是我实践 6 年的方法论，让我的时间效率提升了三倍不止，生活效率极高，本文全程干货，请仔细阅读，你一定收获巨大！ 下面正文开始... 你可能知道时间管理的重要性，但是不知道怎么去安排时间，结果就是计划定的倒是一箩筐一箩筐的，但是臣妾做不到啊... 为什么会这样？ 因为你制定的计划是无效计划。 那什么是有效计划？ 我从执行的角度，给你一个一看就懂，可落地的定义 ~ 1. 计划的安排必须符合人性，它不能反人性，必…",content:`这是我实践 6 年的方法论，让我的时间效率提升了三倍不止，生活效率极高，本文全程干货，请仔细阅读，你一定收获巨大！

下面正文开始.....

你可能知道时间管理的重要性，但是不知道怎么去安排时间，结果就是计划定的倒是一箩筐一箩筐的，但是臣妾做不到啊....

为什么会这样？

因为你制定的计划是无效计划。

那什么是有效计划？

我从执行的角度，给你一个一看就懂，可落地的定义 ~

 1. 计划的安排必须符合人性，它不能反人性，必须是能执行下去的。

这个没啥疑问吧，如果你制定的计划无法落地，一切都白搭。

至于反人性的计划是什么，这个我们一会下面说 ~

2. 事项梳理的像路线一样清楚，我们永远都知道下一步该做啥。

也就是说，好的计划是不会让我们出现没事干，无聊发呆，不停的去摸手机刷抖音快手等，打发时间的情况。

3. 好的计划，一定是少思考多执行的，需要花费大量时间去思考的是规划，不是计划。

很多人每天单单的做个计划就费姥姥劲了，还不够折腾的。事实上，我们不需要每天在做计划上本身浪费太多时间，而是要把时间用在执行和完成计划上，最好是做到不需要花时间去做计划，就能做到胸中有计划。

总之，只要你的计划符合以上三个标准，就是有效计划。

看到这里，你可能会说：「老常，大道理咱都懂，但是如何做到你说的那三个标准呢？」

好的，下面咱就上干货，一步步手把手带你做出有效可执行的计划 ~

如何做出有效计划？

这里，我给你送上做有效计划的三板斧，首先咱先来聊聊第一板斧 ~

1. 有逻辑的梳理计划

什么叫有逻辑的梳理计划呢？

咱先不回答这个问题，我来还原下，大多数人是如何梳理计划的 ~

嗯，我明天要把衣服洗了我明天还要看书，明天还要给家人打个电话还有，我明天要锻炼身体，对了，我需要把项目预案做出来还有，我领导还安排我去处理点别的事情.......

请问，你给自己梳理计划的时候脑中是不是这样？中没中枪？

妈呀，东一榔头，西一棒槌的，你累不累啊？

也就是说，你的这种梳理计划的方式就基本决定了你的计划执行不下去了，你脑子都是乱的，又怎么能保证执行呢。

那怎样做才能有效梳理呢？

熟悉老常的朋友，应该都知道，我有一套万能维度法，即所有的事都可以归纳为：（学习、工作、生活），嗯，就是这么简单粗暴，因为只有简单的东西，你脑子才不会乱。

也就是说，你梳理计划的时候：

从学习上，思考下明天要做什么？

从工作上，思考下明天你要做什么？

从生活上，思考下明天做什么？

如此你的思路就会非常清晰有逻辑，而且还不会有漏 ~

好了，我们用这个万能维度来梳理下，你看看成色如何 ~

如此，一套走下来，怎么样？

缜密不？清晰不？

它可以帮助你，快速有逻辑的梳理出计划，而不是东一榔头，西一棒槌的在那苦思冥想。

但是仅仅通过「三维度法」搞清楚还不够，你还需要合理的把它们部署和打入到你的日程之中，要清楚的知道如何执行他们，以及什么时候执行他们。

那么如何部署打入呢？

我送你第二板斧 ~

2. 按照一天的时间维度划分，部署日程

什么意思呢？

咱们先不解释，先来看个案例 ~

我不知道你做没做过类似于这样的日程表。

我上文说的反人性的计划指的就是指的这种。

这种把项目定死在钟表上的计划是最愚蠢，大错特错的，你看着好像很牛逼，但真正执行的时候，你会发现它根本不落地！！

因为除非你真的是有非常具体的时间预约，不得不这样安排，比如：大老板的时间真的都是被助理钉在表上的，但是对于我们大多数人，我们是远远不到那个层次...

而且，这种死的东西会大幅度的加大你任务时间安排的出错率，还会出现像多米诺骨牌那样一片倒的场景。

如此会极大的挫败你的信心，受挫后你很快就会回到想到哪做到哪的凭感觉做事状态，再去懒得去做计划了.....

所以它是反人性的，千万不要做这种愚蠢计划。

那什么是符合人性的计划呢？

当然是做弹性的计划安排。

那什么是弹性安排呢？
使用 App 查看完整内容目前，该付费内容的完整版仅支持在 App 中查看
🔗App 内查看`,grade:"A",commentCount:156,comments:[{author:"(匿名)",content:"用阅读小标题的方式读完了这篇文章，不由得感叹自己的明智……",voteCount:349},{author:"(匿名)",content:"我以为什么牛逼的计划呢，还不是只是在停留做计划的层面，做计划可以很多种方式，即便写出时间，只要自己可控都可以，比如读书，你不写时间怎么知道如何分配，读多少，每页尽量快点。被割韭菜了！！！你靠这些玩意来割韭菜吗？大家现在的问题是如何执行，这个才是重点，不是你在忽悠如何写计划",voteCount:285},{author:"(匿名)",content:"是的，找到一些有的没的小痛点，勾你开会员，这才是知乎的大头收入，不是说本文还有和本文类似的科普文没有用，本来就是搬运，无非出处费点功夫和时间，你盐选作者质量再高一点，我钱掏的也心甘情愿啊，原来不收费的高赞就排后面，前排推荐就这些要钱的，你说这搬运费花的我自己找不自在吗，唉。盐选下面之所以清一色好评就是因为沉默的大多数，然后沉默螺旋，咱不在乎自来水，我就是发表一下不同意见，让评论区恢复正常[白眼]。",voteCount:218},{author:"(匿名)",content:"为了看完本文开了知乎会员。因为方法实在太吸引我了，简单、实用、清晰明了，不像其他那些教时间管理的太过理论化，难以实操。对我太有用了。👍👍",voteCount:181},{author:"(匿名)",content:"太有用了，看到过的最落地最简单的时间管理方案，为此买了个知乎会员[赞同]",voteCount:79},{author:"(匿名)",content:"为了看完我开了个会员！！！不过我觉得很值哦！讲的很清楚，也很容易执行，不是纯理论，例子清晰易懂，不错不错！",voteCount:45},{author:"(匿名)",content:"实打实的干货，为啥点赞的人那么少？",voteCount:9},{author:"(匿名)",content:"赞👍",voteCount:0},{author:"(匿名)",content:"[赞同][赞同]",voteCount:0},{author:"(匿名)",content:"给你点赞",voteCount:0}]},{id:"514598536",question:"怎样提升自己的逻辑思维能力?",author:"谢春霖",voteUp:16341,excerpt:"我给你先做个测试题 ： 请你花 10 秒钟的时间，记住以下的 20 个数字： 71438059269250741863 好，我们再来试一组数字，还是花 10 秒钟来记住它： 99887766554433221100 其实这两组的 20 个数字是一样的 ，但是不是觉得第二组一下子就记住了？ 为什么会这样 ？ 因为第二组数据更符合我们大脑的使用习惯，数字与数字之间有清晰的逻辑和结构。 我们大脑处理信息有两个规律： 太多的信息记不住。 喜欢有规律的信息。 你有没有遇到过…",content:`我给你先做个测试题：

请你花 10 秒钟的时间，记住以下的 20 个数字：

71438059269250741863

好，我们再来试一组数字，还是花 10 秒钟来记住它：

99887766554433221100

其实这两组的 20 个数字是一样的，但是不是觉得第二组一下子就记住了？

为什么会这样？

因为第二组数据更符合我们大脑的使用习惯，数字与数字之间有清晰的逻辑和结构。

我们大脑处理信息有两个规律：

太多的信息记不住。

 喜欢有规律的信息。

你有没有遇到过这样的情况：有人口若悬河地和你讲了半天，他说的每个字你都听得懂，然而组合在一起，你并不知道他想说什么，内容没有逻辑，语句没有重点，就像刚才那一串杂乱的数字……

听他说话时间一长，你甚至开始头疼，变得焦躁，心里骂道：「你 TM 到底想说什么？」

你别觉得听着难受，讲的人，他自己也许更难受！

明明心里有很多想法，甚至做了上百页的 PPT，但就是讲不清楚……为什么会这样？

因为思维没有结构。

我们思考问题的时候，脑子里的想法会不断地涌现出来，看似很多，却杂乱无章，就像是衣橱里的一堆没有整理的衣服，堆砌在一起。

当有人问你，你能说说你有哪些衣服吗？

「嗯…….我有很多衣服（想法）……」

 能详细点说吗？

 「我有一条蓝裤子，一条橘黄色裙子，一件白衬衫，还有件灰白条纹衬衫，一条牛仔裤，一条蓝色竖条纹的裤子，还有顶黑色的帽子，哦对了，还有一条蓝色裤子（这个刚才好像说过了）……」

 ￥#%@#￥%@……你到底有些啥？

 「我刚才说的都是我有的啊……」

如果你的思维没有经过整理，就会像这堆乱糟糟的衣服，你拥有它们，却无法理解它们！

那怎么办？如何让思维变得既全面又有序呢？

你需要结构化思维。

所谓结构化思维，就像是把衣橱里的这些衣服分门别类地整理好。

比如按季节分类，按穿着场合分类，按服装风格分类……

这时候，别人再问你：你有些什么衣服呢？

你回答：

我一共有 208 件装备，分为：

夏季、春秋季、冬季 3 大类；

 每个季节的衣服又分为工作装、休闲装、宴会装、运动装 4 大系列；

 其中，休闲装里有田园、淑女、简约 3 种风格；

 每种风格的衣服，拥有深色、浅色各 3 套搭配；

 另外配了 4 双运动鞋，5 双皮鞋，6 双休闲鞋，7 个包包，8 顶帽子来应对不同需要……

是不是听着清楚多了？

并且，当你需要使用这些整理好的衣服时，也会变得很方便。

比如，今天你想要和男朋友晚上去一个 party，那么你不需要再从所有的衣服里翻来覆去地寻找，一件件试穿……

而是直接在已经分类好的衣橱中，找到宴会装区域，从里面拿起一套适合的即可。

把你的想法和思维内容，像整理衣服一样，分门别类地安放好，组成一个结构分明的整体，方便日后的理解、存储、使用。这个，就称为「结构化思维」。

一、学会结构化思维，有什么好处？

如果你能够习惯用结构化的方式进行思考，你的思维能力、沟通能力、学习能力都将获得大幅度的提升。

比如，公司的线下门店，生意突然下滑，怎么办？

如果你不会结构化思维，你可能会这样说……

有结构化思维的人会这样表达……

思路清晰，考虑周全。

再比如，你们公司近期要举办一场大型的相亲活动，你是项目的负责人，目前正在召开项目工作会议，老板请你介绍一下本次活动目前的安排。

如果你不会结构化思维，你可能会这样表达……

有结构化思维的人会这样表达……

是不是感觉整个表达逻辑非常有序，层次分明？

除了表达和思考，结构化的能力还能帮助我们提高学习的效率，比如我问你：过去一年，你都学了些啥呢？

如果你不会结构化思维，你可能会这样回答……

有结构化思维的人会这样表达……

怎么样？是不是感觉很不一样呢？

好，说了那么多结构化思维的好处，那么，我们如何才能拥有这种能力呢？

接下来，我就带你从最基本的地方开始说起，帮助你快速学会结构化思维。

试想一下，有一天，你驾驶着自己的汽车，在路上游荡，汽车突然停下，发出轰轰的巨响，无法行驶，怎么办？

是哪里出了问题？轮胎？轴承？发动机？油箱？还是有只猫在车里作怪？

一辆汽车，拥有上万个零件，当你发现汽车的行驶功能出现故障时，如果你不是专业修汽车的，你根本不知道是哪个零件出了问题，你能想到的也是这上万零件里的一小部分……

那怎么办？

你一通乱试后，最终无果，只得叫来拖车，将汽车送入了修理厂……

师傅一看，说：小问题，你稍等片刻……

然后咔咔咔，不到一局《王者荣耀》的时间，就把车给修好了！

为什么能那么快？

不是有上万个零件吗？

如果逐个检查一遍，至少也需要一天的时间啊，这还不算更换和维修的时间！

师傅为什么能那么快？

因为：结构！

在维修师傅的眼中，汽车并不是由上万个零件拼接而成的，而是「结构化」的：

有了结构，师傅就能由局部到整体，快速判断可能导致问题的所有区域。

 有了结构，师傅就能由混乱到有序，以模块为单位进行整块整组的排查。

 有了结构，师傅就能由复杂到简单，将大问题切成多个小问题逐个击破。

透过结构看世界，你就拥有了化繁为简的能力！

结构化思维，关键就在于「结构」二字，如果你能找到复杂问题背后的结构，就能像修车师傅那样，将问题化繁为简，变成若干个小问题，从而更快速地找到解决方案。

那么，我们该如何将一个问题结构化呢？

二、结构化思维的步骤

第一步：明确目的，找到分解角度

所谓的结构化，是不是就是把问题拆散、切碎，然后再分类汇总就行了？

比如刚才整理衣服的例子、汽车零件的例子，就是把一个整体，拆分成一个个小零件，然后根据小零件的属性，进行了分类汇总。

真的是这样吗？

并没有那么简单……

将一个「整体」拆成一个个独立的「要素」，再将一个个「要素」组合成一个整体，其实可以有很多种组合方式。

比如刚才的汽车零件，你也可以把它们按材质分类，方便垃圾回收；

 或者按生产零件的厂家分类，方便返厂维修；

 或者按头部、身体、四肢的构造分类，就能组合成一个大黄蜂……

同样的要素，组合成不同的结构，就能实现不同的功能和目的。因此，结构化思维，并不是简单地做个分类汇总，而是要明白分解后，以什么方式组合，要达成什么目的。

所以，我们得在问题分解之前，先弄清楚分解的目的是什么，然后根据目的进行拆解与结构化。比如说，对于一个项目：

如果目标是分析进度：那就按时间进度、过程阶段来分解；

 如果目标是分析成本：那就按工作项来分解；

 如果目标是分析客户：那就按性别、年龄、学历、职业、收入等来分解。

第二步：按 MECE 原则，组成结构

确定了分解目的，然后我们就要开始搭建结构了，先说一种最基本的结构形态：金字塔结构。

什么是金字塔结构？

简单来说就是，先确认目标问题，再根据分解的目的，将问题分解成不同的类别，类别下再放入对应的不同要素，这样逐层分解，最终形成类似于金字塔的形状结构。

并且，金字塔的每一层，都必须牢固，不能少一块砖，也不能多一块砖，不然整个结构就会垮塌，这个就称为 MECE 原则。

MECE 是麦肯锡著名咨询师巴巴拉·明托在她的著作《金字塔原理》中提出的核心概念，意思是：相互独立、完全穷尽。

也就是金字塔的每一层，内容不能有重复的部分，也不能有遗漏的部分。

比如，你把衣服分类为：春秋季服饰，职业套装。

这个就有重叠的部分：有些衣服既是职业装，也是春秋季服饰。

也有遗漏的部分：夏天穿的休闲服应该归到哪一类？

那么，什么才是不重叠，不遗漏，符合 MECE 原则的呢？

你可以按季节分：春秋装，冬装，夏装。

除了这 3 类之外，没有其他季节了，这个就是「不遗漏」；春秋的衣服差不多，所以归为一类，夏天的衣服，春秋冬穿不了；冬天的衣服，也不能归类在春夏秋这三个季节里，因此「不重叠」，符合 MECE 原则。

是不是有点听晕了？

不着急，下面我用一个例子来说明：

问题：如何在未来 3 个月完成 100 万销售业绩？

我们可以通过以下两种方式来构建金字塔结构：

方式 1：自上而下使用「演绎法」设计结构。

要完成 100 万的业绩，关键是客户，因此我们可以根据客户的类别进行划分，对不同客户类别采取不同的营销策略来完成业绩。

根据 MECE 原则我们发现，客户无非来源于三类：
使用 App 查看完整内容目前，该付费内容的完整版仅支持在 App 中查看
🔗App 内查看`,grade:"A",commentCount:433,comments:[{author:"(匿名)",content:`单纯商榷，不是杠。
我觉得老师其实也没错，你在一个应试环境下，需要的是正确答案。
而且阿米尔汗的想法也说不上多高级，而是一种对于机械装置的感性认识。
好学生回答的是总结出来的抽象认知。
单从答案而论，后者是强过前者的。
这样的定义不仅清晰，而且才具有指导意义。
比如要发明一个机械装置，或者判断具体的装置是不是机械装置，那么后者的定义就有意义了。`,voteCount:751},{author:"(匿名)",content:"你的这些思维，只会把自己累死！从层面上看，你这些思维都只停留在心智层面！很零散，片面，一点都不系统化！",voteCount:220},{author:"(匿名)",content:"你的答案都这样吗？",voteCount:44},{author:"(匿名)",content:"看了两段就感到这是个非常好的答案，但是作为拖延症的我只能收藏＋点赞，留着以后慢慢看(⊙o⊙)",voteCount:41},{author:"(匿名)",content:"很详细，很受用，感谢分享(^_^)",voteCount:34},{author:"(匿名)",content:"你的每篇文章我都想拜读，好久没有这种被知识吸引的感觉了",voteCount:25},{author:"(匿名)",content:"这答案竟然没有被干",voteCount:19},{author:"(匿名)",content:"受教了，谢谢",voteCount:16},{author:"(匿名)",content:"？",voteCount:8},{author:"(匿名)",content:"写的太多了",voteCount:2}]},{id:"330239463",question:"你的父亲传授过你什么经验，让你受益终生？",author:"匿名用户",voteUp:15722,excerpt:"高中我早恋了。 母亲疯了，躺在床上一天一夜没起。问她怎么了，她说她太失败了，没想到她的女儿会早恋。各种看不上我当时的男朋友，表面上为了安抚我，快高考了嘛。实际上，找到前男友，要拆散我们。（当时没被拆散） 高考，结束后。父亲也没说我，好像不知道一样。他只说了一句话，我记得是在楼下的十字路口说的。他说一个女孩子谈恋爱，不论，找什么对象不算本事。只有自己有本事，才不会看轻。之后，无论在大学，生活，学习上…",content:`高中我早恋了。
母亲疯了，躺在床上一天一夜没起。问她怎么了，她说她太失败了，没想到她的女儿会早恋。各种看不上我当时的男朋友，表面上为了安抚我，快高考了嘛。实际上，找到前男友，要拆散我们。（当时没被拆散）
高考，结束后。父亲也没说我，好像不知道一样。他只说了一句话，我记得是在楼下的十字路口说的。他说一个女孩子谈恋爱，不论，找什么对象不算本事。只有自己有本事，才不会看轻。之后，无论在大学，生活，学习上我都保持高度的独立。谢谢父亲的这句话，当我难过，坚持不下去，我就会想起，女孩子要坚强。`,grade:"A",commentCount:707,comments:[{author:"(匿名)",content:"你母亲的反应令人匪夷所思",voteCount:4742},{author:"(匿名)",content:"阿姨真的令人匪夷所思啊",voteCount:2364},{author:"(匿名)",content:"这个表达能力喔…真的难受",voteCount:1361},{author:"(匿名)",content:"这些句号看得我难受。",voteCount:1216},{author:"(匿名)",content:"二十六岁我爸找我男朋友让他跟我分手是不是更匪夷所思",voteCount:788},{author:"(匿名)",content:"其实是对女儿期望很大吧…当然老思想肯定有点的 ，怕恋爱耽误学习什么的………（因为我妈也是这样~）",voteCount:705},{author:"(匿名)",content:"虽然匪夷所思但是据我所了解大部分母亲都会这样。",voteCount:489},{author:"(匿名)",content:"这是一个母亲对女儿早恋最正常不过的反应了。其实不想打击答主，单纯认为父亲不干预是因为父亲并不上心。",voteCount:250},{author:"(匿名)",content:"所以就躺在床上。。。？",voteCount:47},{author:"(匿名)",content:"疯了+躺床上一天一夜这是正常表现麽？ 十七八岁的男孩女孩有点恋爱是正常的吧？看家长怎么引导了",voteCount:35}]},{id:"2062502872256870353",question:"如何评价如今的 Bilibili？",author:"lee",voteUp:15271,excerpt:"清远16岁女孩诬告亲父案， 蔡雅奇录了个有点尖锐的视频， 最大的几个平台， 某音直接不过审。 微博能发但直接限流， 只有B站发出来了，评论很快就上万了。 今天他又发了个视频，怼其他平台，合理合法的视频为什么不给发。 这个视频依旧只有B站发出来了。 B站还允许一些有一定体量且能够直白评论XX问题的up主存在。 所以， 懂我的意思吧。 这几乎是唯一还能稍微还下手的平台了。有些哥们没控制住火力太猛了的话会被删视频但起码不…",content:`清远16岁女孩诬告亲父案，
蔡雅奇录了个有点尖锐的视频，
最大的几个平台，
某音直接不过审。
微博能发但直接限流，
只有B站发出来了，评论很快就上万了。
今天他又发了个视频，怼其他平台，合理合法的视频为什么不给发。
这个视频依旧只有B站发出来了。
B站还允许一些有一定体量且能够直白评论XX问题的up主存在。
所以，
懂我的意思吧。
这几乎是唯一还能稍微还下手的平台了。有些哥们没控制住火力太猛了的话会被删视频但起码不随便封号。
——————————————
额，他的第二个视频没看完，我以为他是在怼平台，刚刚又刷了，就看顺便看完了。
他中间的时候直接向体系开炮了。
这位大哥有猛哦。`,grade:"A",commentCount:706,comments:[{author:"(匿名)",content:"蔡老师向来是直言不讳，他视频被下架很多了，B站还能找到很多尖锐视频的留档，不过还是少看，就当掩耳盗铃吧",voteCount:2857},{author:"(匿名)",content:"蔡老师他真有个女儿",voteCount:2077},{author:"(匿名)",content:"看183冯律师直播，本来是多平台同时开播，说个罪名都不敢说。后来别的平台下播了只开B站，把那些罪名当贯口说了一遍，啥事没有。",voteCount:1767},{author:"(匿名)",content:"蔡老师现在有点破罐破摔了，啥爆的都敢说",voteCount:766},{author:"(匿名)",content:`这些律师么[飙泪笑]不好评论。
已经形成一个律师赛道，开始内卷了，剧本问题非常严重。现在不用剧本都没流量的。
所以，哪天要是这个赛道挨了铁拳，我一点不意外。[飙泪笑]
哪怕他们是吃男人情绪流量的。也不好为他们辩解什么。
因为他们内容真的是越来越离奇，越来越诡异了。`,voteCount:684},{author:"(匿名)",content:"真担心蔡老师每天直面克苏鲁san值掉光[捂脸]或者被封号",voteCount:390},{author:"(匿名)",content:"蚌埠住了",voteCount:356},{author:"(匿名)",content:"这不是B站好 而是他快死了 审核跟不上 你看那些盗版电视剧动漫现在又都复活了",voteCount:282},{author:"(匿名)",content:"这方面你乎也还凑合，例如我的动态置顶，我发b站和抖音都是过不了审的，知乎起码能让我发出来了，我还挺意外",voteCount:187},{author:"(匿名)",content:`你这个离谱了，
你这个不是常态，你是漏网了[飙泪笑]`,voteCount:156}]},{id:"16147081",question:"日常生活中如何提高逻辑思维能力和表达能力？",author:"程毅南",voteUp:14356,excerpt:"首先说，看懂别人的逻辑和产出自己的逻辑是不一样的大脑过程。逻辑分析能力固然重要，学会表达自己的观点，把复杂的东西讲清楚、讲简单、甚至讲得有意思也是相当高深的学问。 有鉴于此，便现在开篇提出本文纲要： 日常写作（非艺术类写作）要点： 1. 简单 2. 明了 3. 简单明了为什么一定要简单明了？ 从心理语言学上讲，语句从大脑中产生的过程是这样的： 1. 有一个想法（一些概念） 2. 形成一个表达想法的逻辑（想法中的主动被…",content:`首先说，看懂别人的逻辑和产出自己的逻辑是不一样的大脑过程。逻辑分析能力固然重要，学会表达自己的观点，把复杂的东西讲清楚、讲简单、甚至讲得有意思也是相当高深的学问。
有鉴于此，便现在开篇提出本文纲要：
日常写作（非艺术类写作）要点：
1. 简单
2. 明了
3. 简单明了
为什么一定要简单明了？
从心理语言学上讲，语句从大脑中产生的过程是这样的：
1. 有一个想法（一些概念）
2. 形成一个表达想法的逻辑（想法中的主动被动、肯定否定，即概念元素之间的关系）
3. 选择句式
4. 填合适的词
5. 如果你是说出来的话，就是确定发音，如果你是写字的话，就是确定字形或拼写
大部分写东西写得不太好的人，问题都出在前两步，尤其是第二步。这两步简要说，就是“想好了再说”。你要知道自己想说什么。有很多人在说话和写东西前，自己的逻辑还没理清，你能指望他说出来的东西有逻辑吗？如果把这篇文章看成是一个表达过程，那么我在下笔写作之前，首先需要想好我要表达的想法是什么，我很清楚我现在想要表达的是“写东西要简单明了”，想清楚了之后，才开始动笔，找论据，想文章结构。如果你只是有一些杂七杂八的碎碎念，他们无法构成一个清晰明确的想法，那么你自然无法写成一篇有明确主题、逻辑清晰的文章。
其次，句式的问题。常常有英文老师说，中文差的人，一般英语也不好，这是有道理的。中文英文在前两步的“想法形成”是共通的，而在第三部选择句式时，中文、英文或其他语言，也都考验着一个相同的能力，也是表达逻辑能力中最重要的环节——选择一个高效的表达句式。我们母语中文的人在说中文时可能没有感受，但在学英语的时候，就会有一个流毒甚深的观点——写东西句式复杂才体现写作水平。大错特错！写东西的目的是什么？让别人看明白。怎样才能让别人看明白？简单明了。你在写中文的时候，也只有凑字数和糊弄人的时候才会绕圈子写东西，不是嘛？这么简单的道理大家都懂，可一写起来就开始想着“我要加分、我要秀语法、我要看起来牛逼”，结果你往往硬加上去的东西，都是生硬、不连贯、脱离了原来句子的本意的。
我并不是说，只能用简单句，必须惜字如金、言简意赅。所谓“简单明了”，其实是说，在表达完整意义的同时，尽量简洁。句式都是为表达想法服务的，所以，如果你要表达的想法很复杂，就可以考虑用复杂句式，因为这会让你的逻辑层次清晰，关系明确，比如 只要-就、因为-所以、虽然-但是等等。但是，如果你想表达的想法简单，你根本没必要把它变复杂，甚至很多复杂的想法也可以提炼一下，让他们变得简单。这样，你的想法显而易见，你的重点突出，别人就很好理解。如果我不说“写东西要简单明了”，而是说“虽然语言优美是一种艺术，但是简单明了同样也是一种艺术”，是不是就显得很罗嗦，没重点？
那么，锻炼表达逻辑能力的方式是什么？
最简单的方法是，复述。你从别的地方看到一个东西，比如教科书上的一个知识点、别人的故事、一个精彩的讨论，你看明白了，好，你就讲给别人听，看看能不能把别人也讲明白。这个过程考验到的能力有很多，比如提炼重点、排列观点的顺序、分清逻辑的层次、记忆力等等（足够大的记忆空间和知识储备对于表达也很重要，这意味着你可以在短时间内调集足够多的概念元素，帮你选择一种高效精确的表达）。复述别人成型、完整、有道理的论述，比自己瞎琢磨说什么要高效得多。学生们可以尝试给别人讲题，一般讲题讲得好的，写东西不会差。另外，经验老道的教师，一般都是能把复杂知识点讲简单的老师，道理也相似。同时，锻炼复述会不可避免地要求你多读书，知识的增加也可以丰富谈吐。
更进阶的锻炼方式，个人认为是翻译。在复述的时候，因为是同一种语言（虽然我没明说），所以可以套用别人相似的句法和结构，但在翻译别的语言时，句法和结构就不能套用了。一旦套用，会显得很生硬，很不流畅。也就是说，用不同语言复述，你就必须从语句生成的第三步开始，自己用逻辑能力来挑选一个高效的表达句式，这比之前同语言的复述，更加考验逻辑能力。如果能熟练地将你从外语中读到的东西转换成中文，甚至能把中文流畅地翻译成外文，这不仅说明，你两种语言的运用能力已经很不错了，更说明，你整体语言逻辑的运行已经非常流畅了。
我个人就经常通过翻译锻炼，平时总要把看英文看来的东西讲给中国同学听，后来又讲给各位知友听，在这个过程中，我确确实实感受到，我的语言逻辑获得了很大提升，连英文写作水平也一年比一年好。我写的大部分知乎答案，其来源都是英文（我从来没在中文的环境下学过心理学），能让知友们看懂，并且获得知友们的支持（感谢大家~），说明这种写作原则是有效的，经得起考验的。`,grade:"A",commentCount:378,comments:[{author:"(匿名)",content:"一言以蔽之，写作的要点是简单明了；锻炼方式有复述和翻译。",voteCount:1035},{author:"(匿名)",content:"你说的复述我也用过，能起到一定的作用，但是我反应较慢，一般跟别人复述完以后，我就又快速的被别人的观点带走了。而且我觉得我的复述很生硬，能让别人直接发现我就是在复述，没有自己讲出来的那种感觉。所以我一直为此而苦恼。所以后来我开始习惯写东西，因为说东西比写东西除了智商层面上的东西还有情商层面的，鄙人情商低，智商也有待开发，所以就不想直接从最容易受打击的方式入手。所以我锻炼逻辑的方式是从写东西开始。我非常爱看影视剧，所以我会用写影评或者剧评的方式表达我的观点、锻炼自己的逻辑思维能力。但这个有一个缺点就是，互动性比较差，一般没有耐力的人是坚持不了的。但我相信，每周一评，长久这样坚持下去，我的文字表达能力和思维逻辑能力也会有从量变到质变的变化。等到我文字表达能力和思维逻辑提高到一定的水平后，我再尝试在QQ群里发表自己的观点，成为某一方面的领袖，之后再练说话。这是我的一些浅薄之见，希望能够获得亲提一些更有建设性的意见。",voteCount:229},{author:"(匿名)",content:"怒赞，写作与口头表达方面应该有些差异，口头表达是不是还要考虑到受众的反映？",voteCount:26},{author:"(匿名)",content:"有帮助！",voteCount:24},{author:"(匿名)",content:"「复述」确实是一个好方法，和人交谈的时候也能用到。",voteCount:23},{author:"(匿名)",content:"有道理有道理有道理！",voteCount:15},{author:"(匿名)",content:"有道理！谢谢:)",voteCount:14},{author:"(匿名)",content:"同上",voteCount:7},{author:"(匿名)",content:"学习了，感谢。",voteCount:7},{author:"(匿名)",content:"都要啊。。",voteCount:5}]},{id:"2174703899",question:"人在什么情况下成长最快？",author:"地球玩家 MMMia",voteUp:14200,excerpt:"成长最快的条件，其实是面对。痛苦是一个条件，但不是决定性的条件。 众生皆苦，但不是众生皆成长。 人在面对痛苦的时候，往往是先回避、否认，然后会有两个方向，一个是沉沦，一个是成长。 卡在沉沦和成长的中间地带，就叫挣扎。 沉沦和成长的区别，就在于你是不是愿意主动面对。 大部人都不甘心沉沦，可是也没有勇气成长，于是就卡在一个要溺水，但是又扑腾，不上不下的困境里。 不是人人都是肖申克里的安迪，不是人人都是基督…",content:`成长最快的条件，其实是面对。
痛苦是一个条件，但不是决定性的条件。
众生皆苦，但不是众生皆成长。
人在面对痛苦的时候，往往是先回避、否认，然后会有两个方向，一个是沉沦，一个是成长。
卡在沉沦和成长的中间地带，就叫挣扎。

沉沦和成长的区别，就在于你是不是愿意主动面对。

大部人都不甘心沉沦，可是也没有勇气成长，于是就卡在一个要溺水，但是又扑腾，不上不下的困境里。
不是人人都是肖申克里的安迪，不是人人都是基督山伯爵。
安迪能在肖申克里成长，是因为他是安迪，而不是因为他进了肖申克监狱。
我们大部人，都只是会被困在监狱里的普通人。

那怎么才能让自己面对呢？

不要急着成长。
我有很多客户，都很急着成长，急着成为自己想要成为的人。
看起来很积极，看起来短期有效果，但是往往又会被打回原形。

所以要先接纳自己的原形。
接纳得越快，成长得就越快。

这也是我自己成长的转折点。
我在痛苦里挣扎了很多很多很多年。
直到最后，我发现我的挣扎是徒劳的。
然后我开始认了。
我就是个糟糕的人。

对，你就是个糟糕的人。
先认了，认了就不会攻击自己，也不会急着逃避。
然后你具体糟糕在哪些地方？
你是为什么会有这些糟糕的特质的？

然后就会把这些问题具体化、清晰化。
当问题变得具体的时候，你就开始客观了。
你就会沉下心来，把注意力放在面对自己的具体问题上。
这个时候你就能从自己的“原形”出发了。
而不是急着想要跳过自己的“原形”，直接成为变身后的自己。
当你急着变身的时候，你的潜意识就会想要回避掉你原有的bug，而不是面对它们。

成长不是变强，而是填坑。
成长不是变成更好的人，而是回归原本的自然的自己。

当你去面对你原有的bug、病毒、木马的时候，
当你每清除掉一个你原有的问题的时候，
你就会发现你变强了很多。

这种变强，不是你增加了你没有的东西，而是打破了原来局限你的东西。
不是强求自己，而是释放自己。

当你清除的bug越来越多以后，
你就会发现你自己越来越强。
而这个越来越强的你才是真正的你，
之前那个糟糕的你，不过是被bug困住、耽误了的你。

&#34;本自具足，不假外求&#34;——王阳明

成长不是给自己增加超能力，而是解开自己的一条条枷锁。

你不需要成为超人，只需要找回真正的自己。

面对自己的不够好，才是最快的捷径。
长痛不如短痛。
当你真的面对的时候，其实你会发现，并没有你以为的那么痛，只是你在想象中把直面的痛苦放大了。

第一次你要鼓起勇气面对。
然后你慢慢的就会越来越习惯。
再然后你就会主动面对。
再然后你就会从被“问题”猎杀的猎物，变成主动狙击“问题”的猎人。
你会去主动面对问题，主动找问题，主动成长。

然后成长本身就会变成你的一个特质，而不是要痛苦逼着你才会成长。
成长会成为你的习惯 ，而不是对自己的强迫。

人不是本来就要完美、优秀、没有问题的。
人终其一生都会是个凡人。
变得优秀不是目的，成长本身才是目的。
所以‘Stay hungry, stay foolish.’

我是@人类维修师MMMia，可以从内心深处疗愈你的咨询师。
地球玩家聚集地：高质量的社群和活动，唤醒更多人“地球玩家”的身份。
· MORE ·
【焦虑/抑郁】
特别容易疲劳是为什么？-4W赞
为什么孩子会离奇地抑郁？-2.5W赞
什么是「高功能抑郁症」？-1.3W赞
焦虑的本质是什么？-1.3W赞
什么性格的人容易得抑郁症？-8K赞
怎样让一个抑郁的人开心呢？ - 4K赞

【个人成长】
人是怎么变强的？-3.5W赞
吸引力法则是真的吗？ - 1.3W赞
人在什么情况下成长最快？-9K赞
虚无主义，到底有多可怕？ - 7K赞
如何才能做到爱自己？-3K赞`,grade:"A",commentCount:336,comments:[{author:"(匿名)",content:"成长不是变强，而是填坑！深有体会[赞]",voteCount:530},{author:"(匿名)",content:"说得很有道理啊，所以有的人说感谢苦难，但其实苦难本身并不值得感谢，该感谢的是那个在苦难中不放弃成长的自己。",voteCount:393},{author:"(匿名)",content:`我对于自己的状态特别了解，敏感，喜欢胡思乱想，容易形成内耗。这是我无法控制的一件事，因为从小养成的这样一种状态。
所以我的解决办法，曾经是冷漠，不把任何人放心上，每个人都会离开，那就是把他们当做一个随时都会走的人。
这样有好处，就是大多数时间我很安宁，你走影响不了我，你留我也不会因此很快乐。
同样，弊端就是我内心深处是觉得自己很孤单的，只是不断告诉自己，一个人也可以很好。
后来，我反复思考我想要的到底是什么，想啊想啊，承认自己需要别人，朋友，恋人，我需要亲密关系，我不是真的享受孤独。
我又改变了自己的行为，积极寻找，积极面对，对人很主动，感知身边人对我的好，逐渐觉得自己内心充盈了起来。
但是又有了新的问题，那就是对别人好，热情，就是会被一些人伤害，所以又迷茫了起来。到底怎么做，才能让自己舒服？
很多人喜欢跟我说，顺其自然，想那么多干嘛。但我不行，我顺不了自然，我不把事情想透了，我就会一直想。
所以现在解决问题的方式变成了，在一段时间内，放任自己想个痛快，挖到根，问题在哪，我想要什么，我是什么，去查，去看，去问，如和别人聊。
想着想着，通了，累了，懂了，就成长了。
来自于一个已经想了五天，感觉快结束这段思考的人。`,voteCount:197},{author:"(匿名)",content:"不愿意面对自己的过错，不想承认自己的缺点，是很痛苦的，因为意识到自己是这样一个人以后，会打破心中对自己完美的印象，感觉自己恶心，虚伪，假。越是发现自己有这样的一面，越害怕家人朋友发现自己的样子，被恐惧蒙住了双眼，更可怕的以前只会挑自己的刺，自我攻击，后面心很累了，居然开始挑别人的刺，怨天尤人，我不想再这样了，我不想再这样了。面对，面对。",voteCount:101},{author:"(匿名)",content:"精辟，填坑其实就是面对自己的缺点，从看见到接纳，再到改变。改变就是个不断沉浸在缺点中直到改变的过程，需要接纳和勇气去面对！",voteCount:61},{author:"(匿名)",content:"最值得感谢的人是自己呀，当然不排除天意",voteCount:30},{author:"(匿名)",content:"谢谢你！你说得对，成长不是变强，而是填坑。我一直在逃避，无法面对自己的不完美，为此也很焦虑，今天看到了这篇文章，对我的帮助很大。我现在要做的就是解开枷锁，正视自己的不完美，而不是让这种焦虑的情绪成为我的负担。",voteCount:17},{author:"(匿名)",content:"核心在于人类天性完美，无须假借外物。但是人为什么被限制住，因为环境。",voteCount:15},{author:"(匿名)",content:"不愧是你",voteCount:1},{author:"(匿名)",content:"@汤玖氿 来看这个文章！",voteCount:0}]},{id:"3442472840",question:"女性慕强慕的到底是什么？",author:"转世仙妃",voteUp:14008,excerpt:"我可以告诉你，大多数普通女人要的只是“看起来强大”就行了。",content:"我可以告诉你，大多数普通女人要的只是“看起来强大”就行了。",grade:"A",commentCount:850,comments:[{author:"(匿名)",content:"渣男和骗子就是要做到即使自己实际很弱小，也要给女人制造一种强大的错觉，然后生米煮成熟饭，她们就会自我pua了[大笑]",voteCount:3578},{author:"(匿名)",content:"因为普通女性找不到真强的，只能找到看起来强的[捂脸][捂脸]真强的男性周围都一帮年轻优秀的女生围着抢，普通女性根本抢不到。",voteCount:2298},{author:"(匿名)",content:"查看图片",voteCount:1273},{author:"(匿名)",content:"女生慕的东西是一种幻象，很多“强大”是虚张声势装出来的，不用去学习、打磨自己，是看着强。真正的强是隐忍的，是十年磨一剑的，有一种技能比别人强很多产生的自信 查看图片",voteCount:1069},{author:"(匿名)",content:"纪录片里嫁非洲留学生的一个养男方全家隔三差五挨顿打的一直没事，直到有一天男方妹妹偷拿她东西吵起来男方站自己妹妹，感觉没被男方当家人立马离婚了",voteCount:806},{author:"(匿名)",content:"真相了，长不长脸吧，拿得出去不丢人就行",voteCount:300},{author:"(匿名)",content:"毕竟穿透现象看本质是一件很难的事情。",voteCount:288},{author:"(匿名)",content:"确实，身边老实本分的有些长得还可以的但是大学寡了四年，但凡能来事儿会装的，就算长得不太行，有些肥头大耳的都能有不错的女朋友。[吃瓜]",voteCount:171},{author:"(匿名)",content:"要么长得好看，要么擅长虚张声势，俗称装b",voteCount:162}]},{id:"1966454017275204391",question:"如何学英语才能达到流畅阅读英语原著的水准？",author:"silence",voteUp:13791,excerpt:"给你个路线，pxx上几块钱买电子版的The week junior这个报纸的pdf版本，读个50期。这个报纸难度大概是普通高中英语难度（非发达地区高中），可能有难的单词，但是总体来说不认识的单词应该不算多，可以积累词汇量。 读完50期之后，你的词汇量可能会提高到1万了，然后再去整The week junior science +nature ,读个 30期左右，这是一个青少年科普杂志，非常适合培养阅读长难句接触一些比较难的单词，这样词汇量大概可能增长到15000…",content:`给你个路线，pxx上几块钱买电子版的The week junior这个报纸的pdf版本，读个50期。这个报纸难度大概是普通高中英语难度（非发达地区高中），可能有难的单词，但是总体来说不认识的单词应该不算多，可以积累词汇量。
读完50期之后，你的词汇量可能会提高到1万了，然后再去整The week junior science +nature ,读个 30期左右，这是一个青少年科普杂志，非常适合培养阅读长难句接触一些比较难的单词，这样词汇量大概可能增长到15000左右。
然后再去买The week UK或者US杂志的电子版，然后读，这个是面向英语母语成年人的新闻杂志了，前面两个属于青少年版的，但是都是针对母语人期刊。这个时候因为你已经有15000左右的词汇量，你再读这个虽然也还会有不认识的单词，应该会轻松不少，生词不算多了。读个一段时间，估计词汇量就可以达到英语母语者平均的20000多词汇量了。
至此，你就已经完成了从青少年读物到成年人阅读作品的进阶路线。
等你The week 读的很顺利了，剩下什么New York times，The economist 这种母语期刊也是咫尺之遥了。
这个路线，个人感觉是非常科学的，进阶式的。如果你一上来读很难的东西，以大部分人的自律性，估计不超过三天就放弃了，还不如一开始找点简单的读一下
The week junior 难度如上
The week Junior science +nature ，难度如上，科普类文章句子文章会更长，也会有更难一点的词汇出现，适合进阶
选择这三个，主要是因为几点。
1.新闻为主，篇幅比较短，碎片化时代，如果你看不进去长篇的小说，这个就很适合，一篇花不了多久时间，很容易有成就感。当然喜欢看小说也是一样的。
2.这三个看名字就知道是一家媒体出的期刊。那一般一家媒体出的东西，用词造句风格是比较类似的，你可以高效进行狭窄输入。如果经常东看一家西看一家，很容易增加阅读难度。在学习英语阶段，一直阅读同一个媒体的东西比较合适。
3.这一点比较功利，大部分的英文考试的阅读文章都是以新闻杂志上的文章为主，比如the week junior就出现在上海的中考模拟题上过。读这种类型文章，有助于培养考试阅读的能力。
4.读新闻可以在学英语的过程顺便了解一下世界上发生的事。
关于听力
我找到了the week junior 配套的播客，英音。难度也不大，一般配合杂志内容来的，每日英语听力上有。如下
The week junior，还有science+nature 那个，别看语言不是很难，但是一期杂志动辄也有30～50多页，一页a4纸大小，如果原来只有过试卷阅读题经验，没有读过英文小说报纸的话，一开始可能阅读压力会有点大，坚持一下读着读着就能速度加快了。50本应该也不是太大问题。

这是2025年高考英语一卷真题第四篇阅读，一般情况下，最后一篇阅读是最难的，但是我阅读下来感觉和the week junior 难度差不多，
如果有大学之前考试需求的，读读国外青少年科普杂志是够了的
但是如果你的词汇量比较小，比如词汇量不到5000，可能读起来会累一些，这个时候，不一定非要拘泥于这个材料，可以从更简单的开始，比如中国日报下面的21世纪学生英文报，或者上海学生英文报，这个是国内的学生英文报，可以根据水平选不同年级，比如基础差一点就选择初中版，甚至可以选小学版都行。

我很喜欢阅读，不仅因为阅读让我获取了很多信息，而且为我的英语听力和写作打了非常好的基础。
你不可能听懂你读不懂的东西，除非你是处于语言敏感期的儿童
有人质疑读the week junior能不能达到1w的词汇量。
The week junior官方的定位是给8-14岁以英语为母语的儿童青少年阅读的杂志。
那8岁的英语母语者大概多少词汇量呢
8岁就可以达到1万了，而我们大多数国内的考试，比如考研英语，要求词汇量也就大概5500-7000的样子。高考英语3500。英语专业专八词汇量可能是1w-1.3w。
所以可以看到英语母语和非英语母语者词汇量的差距。
英语母语的成年人词汇量，只要接受过高中左右的教育，基本上都会到2w。
有人统计过老友记的不重复词汇，也是1w多，如果没有词汇量，连这种通俗的电视剧都看不懂。
国内的英语考试词汇量要求是非常低的，所以为什么读了这么多年英语，依然没办法阅读英语当代小说杂志，去无字幕看美国电影。
虽然英语学习不是词汇量为主，但是词汇量太低，不足1w的情况下的确读很多东西都会困难重重。
有人说现在有ai很方便，但是我始终不喜欢一边阅读一边还要分心去看ai解析，感觉这不是在阅读。
阅读应该是沉浸式的，会因为知识而好奇，而有所感悟，有所欣喜，而不是变成查单词的活动
关于什么基础读什么。最准确的就是你自己找一些来读一下，哪个杂志让你觉得能坚持读，不算太难，但是也不是那种一眼看过去跟看中文一样就行。
如果按照词汇量划分。有专门测词汇量的网站。
500以下词汇量还是背单词比较好一点
 500_1500词汇量就选择21世纪或者上海那个小学版本
1500_3000建议读21世纪学生英文报或者上海学生英文报的初中版。
如果是3000-5000可以选21世纪或者上海学生英文报的高中版。
5000-8000可以选择the week junior。
如果8000_15000选the week junior science+nature 。
15000以上再去读the week UKor US比较合适。
23000+可以读The Economist会没那么多不认识的单词啦
更新，虽然推荐了the week,但是过了一段时间看，似乎这并不是一个很好的材料，不知道大家有没有同感，读英文读到后面，很多不是在考验你的英文水平，很多是在考验你的知识背景，文化背景，其实the week 不管是UK还是USA都是有大量的 cultural and social references也就是文化社会典故的，就好比我们中国人如果说到街道办，说到单位，任何中国特色的东西马上就能懂，但是如果说到英国的政府，美国的政府，美国社会的一些问题，如果你不在国外生活，你会容易出现每个单词都认识，但是不知道在讲什么的情况。
这一点从the week junior 就能有体现，只不过杂志的语言简单一些，我最早读的是UK版本的，说实话，我对英国不是很了解，所以当时更多集中于去阅读很普世大众的东西，science +nature就很好，科普的东西，不管哪个国家，都是没有太多障碍的，所以选择读物，如果你不是生活在相应的国家，最好选择可以横跨文化的材料，不然读起来就容易无聊且不知道在说什么。
更新一点听力吧。
我个人觉得英语听力对于成年人来说，一定程度上取决于你的阅读水平。阅读水平高的话虽然做不到100%听懂，可能会出现因为发音不熟悉听不懂，但是大概意思还是能听懂的，但是如果你阅读水平很低，那就可能大概意思都听不懂了。
英文听力从简单到难的材料推荐，如果你不知道选择什么的话。。。
高中基础英语听力水平（如果听力水平达不到高中听力的，可以去买一本初中听力同步训练，用应试听力去练，不用做题，目的是听懂对话，感觉初中太难就买小学听力去练）
大名鼎鼎的family album 走遍美国。有点像电视剧，也比较古老了，但是胜在语速慢。
当然你也可以选择这个
这个也不错，这个博主语速非常清楚还很慢，最难得的是，她就是会介绍各种场景的英语，所以你能快速增长单词。
这些看过之后，你可以进阶到去听Bob the Canadian 
这个大叔在英语教学这方面属于语速接近正常，他和上一个博主一样，会通过视频的方式全英文讲解。难度会比上一个博主稍微大一些，所以算得上进阶。他还会教你一些日常表达，比如怎么去点餐啊。教你一些idioms 成语这种。
再然后当然就是大名鼎鼎的Englishpod 365,一共365期，你可以根据难度的不同去逐渐进阶听。
这365期你听个2,3遍，你的听力会有很大的进步（前提是阅读不能丢）
以上基本上是美音为主的，下面的材料是英音。
当你的听力词汇量提高到7000之后，就可以听
BBC 6 minutes English 
这也是我最爱的英文播客，因为它属于中级难度的听力了，不再是日常对话了，它会讨论很多有趣的话题，比如我最近听的关于年老女性生育的问题，非常有意思，里面最好的就是他们会选取一段或两段真实的电视节目采访，里面采访都是常速，而且什么口音都有，印度口音，英国口音，美国口音，韩国口音，俄罗斯口音，什么都有。。。而且两个主持人语速虽然也慢但是已经不会是那种慢的不正常的速度了。最重要的是它有1000多集，还在不停更新，所以量大管饱。但是6分钟英语会涉及很多科学知识，专业知识，所以难度还是有一些的，但是听懂了绝对能让英语听力上一大截。
然后如果你bbc6分钟听懂后，就可以尝试听这个播客English learning for curious mind
这个播客，虽然说是English learning但是讲解的部分少了很多，更多是用英文去讲解各种故事，或者科普介绍，如图，它的选题都是比较有趣的，但是因为没太多讲解，所以 他的难度也是最大的，可以说偏向于中高级的水平才能听懂的那种。
最后如果curious mind听的没啥问题了，基本上你可以自主选择听力材料了，什么母语者播客啥的可以尝试听一下了。就不推荐了`,grade:"A",commentCount:380,comments:[{author:"(匿名)",content:"用词造句风格类似，这一点真的特别重要，阅读类似。这也是我为什么不推荐别人看经济学人，每篇文章下笔风格迥异，里面包含各种阴阳怪气典故修辞一大堆乱七八糟的东西，根本不适合英语学习",voteCount:331},{author:"(匿名)",content:"这方法挺好，唯一不足的是没有听力输入。我觉得听力输入很重要的。",voteCount:206},{author:"(匿名)",content:"来这里感谢答主，我是研一学生，但是英语很烂（六级430分)，26年二月份看了这篇答案后，到现在已经读了30篇the week Junior，感觉词汇量真的大大增加，从最初10天读完一期报纸，到现在半天可以很快读两期，事实上证明不用50篇，我现在已经很少遇到不会的单词，及时不会也很快能根据上下午猜出意思，所以我决定开始去读science+nature了[感谢][感谢][感谢]",voteCount:130},{author:"(匿名)",content:"因人而异吧，我感觉还好，科普新闻类的杂志，只是句子单词简单，但是内容不无聊",voteCount:9},{author:"(匿名)",content:"这个杂志有个大辩论栏目还是很好的",voteCount:3},{author:"(匿名)",content:"成年人不要读儿童杂志，背景知识多，还无聊，虽然能读懂。",voteCount:2},{author:"(匿名)",content:"[赞] 很对 我走的是小说这条线路 不过逻辑是一样的 [打招呼]",voteCount:0},{author:"(匿名)",content:"发夸克链接的人呢？",voteCount:0},{author:"(匿名)",content:"咸鱼一分钱就可以买到",voteCount:0},{author:"(匿名)",content:"牛津书虫也行，感觉有些小孩子的故事也挺有趣的",voteCount:0}]},{id:"675003097",question:"一个自律的人有多可怕？",author:"孕e家",voteUp:13563,excerpt:"【多图警告！！！】一个自律的人有多可怕，从娱乐圈看一圈就很明显了！ 娱乐圈的女明星在保持身材这方面总是很厉害的，不仅日常能维持体重，连怀孕生娃都是只长肚子，脸还是小的，四肢也还是纤细的。 比起普通人，女明星似乎不需要坐月子或者产后恢复，只要生完娃，立马恢复到产前。15天拍广告，30天拍戏，恢复的速度简直像坐火箭一样。 在这方面，陈意涵就是其中的佼佼者。怀孕5个月长跑5.5km，产后两个月，跨夜接力完成210km的…",content:`【多图警告！！！】一个自律的人有多可怕，从娱乐圈看一圈就很明显了！
娱乐圈的女明星在保持身材这方面总是很厉害的，不仅日常能维持体重，连怀孕生娃都是只长肚子，脸还是小的，四肢也还是纤细的。
比起普通人，女明星似乎不需要坐月子或者产后恢复，只要生完娃，立马恢复到产前。15天拍广告，30天拍戏，恢复的速度简直像坐火箭一样。
在这方面，陈意涵就是其中的佼佼者。怀孕5个月长跑5.5km，产后两个月，跨夜接力完成210km的马拉松，被被网友称为“史上最硬核孕妇”。
关于陈意涵孕产期的运动状态，引起了网友们的热烈议论，有支持的，也有反对的。但无论如何，有一点可以确定：懂得自律的女人真的太可怕了...
女人总是过了25岁就不敢轻易谈论年龄，仿佛人生最好的阶段已经过去；
过了25岁以后，各种抗皱产品早早用起来，生怕脸上长出一条皱纹；
30岁之前要赶紧结婚生子，否则恢复不好，对身材影响很大；
......
种种的条条框框，似乎都在告诉我们：过了25岁就不再青春了。
然而，陈意涵身体力行地告诉我们：女生，哪怕将近40岁，依然能获得元气满满，充满青春活力！
你能相信吗？这是37岁的陈意涵
这是怀孕7个月的陈意涵
这是在坐月子的陈意涵
这是刚坐完月子的陈意涵
素颜、没洗头、没p图，但满脸胶原蛋白，充满了青春的少女气。只看照片，真真像一个十七八岁的少女。甚至和18岁时候的照片对比，现在的状态甚至比年轻的时候更好。
而这一切和她的自律有关。
从《痞子英雄》开始，她就爱上了运动。长跑、游泳、登山、跆拳道，我们能想象到的运动她都尝试过。
更难得的是，她的坚持不只是为了发票圈晒晒图，更不是为了立人设，而是实实在在的坚持。
七年以来，不管多忙多累，每天都坚持晚上十点睡觉，早上五点起床到公园跑步。还因为晨跑经常遇到朋友的父母，成了“别人家的孩子”。
甚至在录制一档旅行节目的时候，仍然坚持每晚睡前做卷腹，晨起长跑。要知道，拍摄旅行综艺节目是非常消耗体力的工作，但在其他嘉宾仍然熟睡的时候，陈意涵仍然坚持晨跑12km，最后累得随行摄影师都跟不上。
因为热爱运动，孕期在咨询过医生的情况下，从怀孕开始一直坚持运动到分娩前。
她还立志要在100个城市倒立，听起来非常的“荒诞”，但她的确一个一个在执行。
上海、伦敦、首尔、巴黎......
和好友张钧甯约定好了30岁的5件事，也一样一样做到了。纹身、编辫子头、跳海、裸泳、和陌生人亲吻
其实，不止陈意涵，娱乐圈里不少“女神级”的人物都身体力行的告诉我们，自律的重要性。
44岁的林志玲整整美了几十年，靠的就是几十年如一日的坚持运动和健身。不仅颜值和身材在线，更难得是气质和状态宛若少女，完全没有人到中年的疲态。
48岁的莫文蔚在演唱会上穿了一身肉色连体衣，非常挑战身材，可她完美hold住了。那双腿简直美得过分了！想要保持一双美腿，必须每天运动和跑步，连莫文蔚本人也说：每天跑10km，“肥底”都变“瘦底”。
50岁的许晴，在《邪不压正》上的造型和身材秒杀一众年轻女演员，这样的风情万种，丝毫看不出是一个年过半百的女人。
以上种种例子都在告诉我们，运动真的是永葆青春的最好方法。女人到了一定年纪以后，身材和气质就能反映出一个人的生活。所以才会说：中年人的崩溃，是从长胖开始的。
自律是什么？
自律=行动力+耐力+内驱力。
当陈意涵的生活席卷网络的时候，有的人可能认为这都不算什么大事，不就跑跑步而已；也有的人酸，她作为一个明星，有专门的营养师和教练帮她计划。
然而，迈出第一步，坚持运动的一直都是她本人。所有她给自己定的小目标，她立了的所有flag，都在一样一样地慢慢做到。
陈意涵有一番话，说得很在理：“如果你现在想要运动，你就立刻出门，我现在感觉突然好想可以跑步，我会立刻穿上跑鞋。因为你们还在想的时候，我已经出门了”。
想要练出马甲线，就要付出努力
想要保持好身材，就要忍住嘴迈开腿
想要青春永驻，更要保持年轻的心态
......
不要抱怨人和人之间为什么差距这么大，抱怨就抱怨自己不够努力，不够坚持，不够自律。
我们扪心自问，年初时写下的计划表，如今完成了多少？每周看一本书，周末出门爬爬山，放下手机多陪陪爸妈......这些简单的小计划，大家又完成了多少呢？
如果我们缺少行动力，就永远不会迈出第一步，更不会达成想要的目标。无论事情本身是难还是易，不去行动永远只会是空谈。
所谓的自律，需要我们有行动力。不要犹豫，不要为自己找借口，想做就要去做。
有心理学家认为，自律是有规律的：前期是兴奋的，中期是痛苦的，后期是享受的。自律是一个过程，最难熬的就是中期阶段，因为需要无比的耐力和坚持。
30岁之前，陈意涵也不过是一个娱乐圈里平平无奇的小演员：
新人辈出，年龄增长，却没有立足的资历；
好不容易拍摄了一部大电影，但所有镜头都被剪掉；
谈了好几段恋情，但都没有走向童话故事的结尾；
镜头全被剪掉，她在颁奖现场委屈落泪让人心疼
是不是很像现在的我们？
工作勉强糊口，却没有资本找更好的工作；
无论是家庭还是工作，总是得过且过；
和老公家人发生矛盾，就怨天怨地怨别人；
......
谁的人生都没有容易的事情，都需要自己的努力和付出。
陈意涵说“我一直跑步，是因为，这是我现在，唯一能确定我可以做好的事。沉醉在数字的增加中，很单纯，很纯粹。”
或许现阶段还不能达到“质变”，但持之以恒，有耐心的坚持去练习，最有一天会“质变”。
自律，需要我们走过一段漫长的旅程，才能收获最后的果实。要记住：上坡路，永远是辛苦的。
自律的“自”，是靠自己。
前阵子，48岁闫妮的逆生长“屠屏”微博，让我们重新认识了一个不一样的“佟湘玉”。
闫妮年轻时候气质其实并不出众，甚至可以说不洋气。连她自己都自嘲：“我的气质不咋地。”从佟湘玉开始，就一直给人土土的感觉。
但前阵子她上快乐大本营的时候，一双“少女腿”霸屏微博。
又细又长又白，不禁让人感叹，这是48岁女人的状态吗？这身材，这气质，比年轻的时候还好！
为了这样的好身材，闫妮也付出了超出常人的自律。减肥时期的她，健身操、瑜伽、游泳、跑步、拳击什么都练，每天都疯狂燃烧自己的卡路里，只要是休息就会泡在健身房里。在所有人都不曾对她抱任何希望的时候，她硬是靠着自己的毅力和坚持，瘦了整整30斤！
现在和女儿在一起，简直如同两姐妹！
在采访中，闫妮曾说：“我原来想，我这个年龄的人减肥有什么用呢，可是，真的还挺有用的，这是我没想到”、“有时候，人自身的节制还是一定要有的，有了之后你会发现还有另一种风景”。
别人不要求没有关系，但自己不能跟着纵容自己。
自律的“自”，也是自由。
自由并不代表随心所欲，而是自我主宰。只有当自己能掌握自己的人生，而不是随着欲望驱使，才能真正的掌握自己。
最近，杨丽萍又有新的舞蹈作品要演出了。
那个跳孔雀舞的杨丽萍已经60岁了！她仍在舞台上翩翩起舞，每一帧动作都美得无以复加。
看着舞台上的她，相信大家都是深深的羡慕，同样也是敬佩的。
为了保持最好的身材，她的饮食从来都很克制，她不吃米饭，只吃蔬菜水果。几十年如一日的清淡的生活，所有的一切都只为舞蹈服务。
自律不仅是一种态度，更是一种行动，是让自己变得更好的力量。
无论我们是否生得平凡，但绝不能活得平凡！女人的青春和状态从来不是根据年龄去划分的，只要足够自律，就能活得漂亮。`,grade:"A",commentCount:662,comments:[{author:"(匿名)",content:"前提是你得有钱和有时间去做这些",voteCount:2078},{author:"(匿名)",content:"运动健身节食是演员工作的一部分了 普通人还能够这样坚持才是真正的自律啊！",voteCount:1233},{author:"(匿名)",content:"时间是挤出来的，有些简单的运动也不需要花太多的钱。不过如果是996，确实下班回家也只想咸鱼了……QwQ",voteCount:455},{author:"(匿名)",content:"每天下班都去跑步，其实也就花费半个小时的时间。如果实在没时间，就在家跳健身操，跟着视频学就行。其实有没有时间，有没有钱，都是借口。",voteCount:347},{author:"(匿名)",content:"要是996还是老实回家做条咸鱼吧",voteCount:218},{author:"(匿名)",content:"确实，保持身材也是演员的自我修养",voteCount:84},{author:"(匿名)",content:"我们还是把话题集中在自律上面吧o(╥﹏╥)o",voteCount:40},{author:"(匿名)",content:"许晴说了，天生！",voteCount:28},{author:"(匿名)",content:"确实，主要是坚持下来真的不容易……",voteCount:22},{author:"(匿名)",content:"吾日三省吾身，肉还在不？肥减了不？[害羞][思考]",voteCount:7}]},{id:"90167686442",question:"如何看待柯洁和战鹰的矛盾？",author:"知乎用户gka1Dn",voteUp:13466,excerpt:"柯洁一堆粉丝说要开盒战鹰全家 然而战鹰父亲是空军大校。。。",content:`柯洁一堆粉丝说要开盒战鹰全家
然而战鹰父亲是空军大校。。。`,grade:"A",commentCount:862,comments:[{author:"(匿名)",content:"真开了[飙泪笑]战鹰都回应了",voteCount:7315},{author:"(匿名)",content:"大校什么概念？刘培强炸木星的时候才中校。",voteCount:5210},{author:"(匿名)",content:"要是退役军官的盒都保不住，现役的指定能给上头掀了",voteCount:4032},{author:"(匿名)",content:"把副师级的空军大校给开了是吧[飙泪笑]",voteCount:2952},{author:"(匿名)",content:"战鹰和家属都回应了",voteCount:2264},{author:"(匿名)",content:"地级市市长概念",voteCount:1248},{author:"(匿名)",content:"退役了，但是家属的军属身份不会变吧",voteCount:989},{author:"(匿名)",content:"一步将军",voteCount:910},{author:"(匿名)",content:"大校？照样全家被开咯，真的是啥都不怕[捂脸]",voteCount:667},{author:"(匿名)",content:"退役了，现在在的那个地方是个私人的飞行学校，现在是在做教练。",voteCount:462}]},{id:"354165081",question:"那些你认识的高考严重超常发挥考入名校的人，后来怎么样了？",author:"Samuel",voteUp:13248,excerpt:"高中时的女友，自主招生考我航，没考上。高考大爆发，728分去了北大医学部，8年本博连读。 刚开始的两年老是会哭，尽管很努力也考不上班级平均，自我调侃毕不了业。寒暑假总是掐头去尾。后来拿的奖学金渐渐高了，我们之间的联系也渐渐少了… 应该变得更开朗了吧，应该有了新男友了吧，祝你幸福。 7月25日更新 谢谢大家的关注。 在这里统一回复一下大家的评论： 1.我高考那年还是浙江老高考，总分810，所以，728跟状元还差的远…",content:`高中时的女友，自主招生考我航，没考上。高考大爆发，728分去了北大医学部，8年本博连读。
 刚开始的两年老是会哭，尽管很努力也考不上班级平均，自我调侃毕不了业。寒暑假总是掐头去尾。后来拿的奖学金渐渐高了，我们之间的联系也渐渐少了……
 应该变得更开朗了吧，应该有了新男友了吧，祝你幸福。
7月25日更新
谢谢大家的关注。
在这里统一回复一下大家的评论：
1.我高考那年还是浙江老高考，总分810，所以，728跟状元还差的远呢。
2.我比较菜，上的并不是北医对面的北航，而是南航。异地恋是有远近之分的，北京和南京还是太远了。
3.我是比较理性的，知道她是八年制之后，也明白我们不太会有结果，没有挣扎，早已释然。
4.现在除了过年时会互相问候，已没有再多交集，各自安好就足够了。
5.评论里也有祝我幸福，感谢感谢！下面几个回答是我的现状，我现在生活得很好。有兴趣的知友可以点击查看。
七月份准备考研还来得及么？

2026年在上海，你的择偶标准是什么？最后，祝所有能读到这里的朋友，都能超常发挥，考入名校！在以后的日子，找到那个对的人，找到自己的幸福！`,grade:"A",commentCount:594,comments:[{author:"(匿名)",content:"厉害了，728应该是状元吧",voteCount:2320},{author:"(匿名)",content:"为祝你幸福四个字点赞。",voteCount:1986},{author:"(匿名)",content:"和状元差远了，浙江省高考满分810！在750满分的省一般绝对是状元！",voteCount:1949},{author:"(匿名)",content:"表态狂才能考那么高。",voteCount:627},{author:"(匿名)",content:"浙江往届满分810时期，清北本一批要740+。然后复交730，复交医、北医、浙大竺院分数线是720左右，中科大710左右，接下来浙大690左右，差不多这样",voteCount:422},{author:"(匿名)",content:"厉害厉害，，都是大神!",voteCount:193},{author:"(匿名)",content:"728。。。",voteCount:98},{author:"(匿名)",content:"浙江么？",voteCount:47},{author:"(匿名)",content:"帝花之秀",voteCount:42},{author:"(匿名)",content:"728……",voteCount:35}]},{id:"1351202585",question:"阅读对人的影响有多大？",author:"罗翔说刑法",voteUp:13178,excerpt:"在回答这个问题之前，我想请大家慎重思考三个问题。 为什么要读书? 读什么书? 如何去读书? 在搞明白这三个问题之后，你就能明白读书能让带给人什么样的影响。 一、 为什么要读书 我们为什么要读书? 你会毫不犹豫地说因为读书能够获得知识。 那人又为什么要获得知识呢? 我想答案不外乎是以下几点: 因为知识可以改变人的命运、 知识可以让你将来找一个好工作、 知识能够让你摆脱愚昧等。 宋朝皇帝真宗赵恒说得比大家更为直白: 「富…",content:`在回答这个问题之前，我想请大家慎重思考三个问题。

为什么要读书? 读什么书? 如何去读书?

在搞明白这三个问题之后，你就能明白读书能让带给人什么样的影响。

一、 为什么要读书

我们为什么要读书? 你会毫不犹豫地说因为读书能够获得知识。 那人又为什么要获得知识呢? 我想答案不外乎是以下几点: 因为知识可以改变人的命运、 知识可以让你将来找一个好工作、 知识能够让你摆脱愚昧等。 

宋朝皇帝真宗赵恒说得比大家更为直白: 「富家不用买良田, 书中自有千钟粟; 安居不用架高堂, 书中自有黄金屋; 出门莫恨无人随, 书中车马多如簇; 娶妻莫恨无良媒, 书中自有颜如玉; 男儿若遂平生志, 六经勤向窗前读。」 你看, 读书的好处真不少: 车子、 票子、 房子、 妻子都有了。

我并不否认读书会带来这些功利性价值, 但如果只是定睛于读书的功利性价值, 那我要非常遗憾地告诉大家, 我们在大学学的很多东西将来可能都没有用处。 

做律师, 能赚大钱, 那我为什么要学高数, 难道要用高数数钱吗? 做大官, 「祖坟能冒烟」, 那我为什么要学法律, 学学关系学、 领导学就行了。

功利性读书必然让你接受成功主义的价值观, 我们身处的社会弥漫的都是成功主义的哲学———你要成功, 你要出名, 你要成为人上人, 这几乎主宰了我们一切的价值观。 成功主义将成功作为重估一切价值的尺度, 为了成功, 你可以不择手段, 你可以牺牲一切利益。 

大家看过 《魔鬼代言人》吧, 年轻有为的律师凯文 (基努·里维斯扮演) 经不住高薪豪宅的诱惑, 带着妻子从家乡来到纽约发展, 在一个又一个成功中迷失了自己, 为了追求利益和打赢官司, 他放弃了律师操守; 为了追逐胜诉, 不惜隐瞒证据; 他为了事业也牺牲了家庭, 甚至放弃了家庭, 导致妻子自杀。 

最后他才发现, 他其实是魔鬼的私生子, 成功全都来源于魔鬼的操控。 魔鬼正是试图通过成功让我们放弃自己安身立命的美好价值。 在影片的结尾, 魔鬼说了一句意味深长的话, 「虚荣, 无疑是我最爱的罪。」

功利性读书让你只想成功, 无法接受失败。 但我始终认为, 一个人的真正成功不是在于你取得多少辉煌, 而是在挫折中, 你能不能勇敢地爬起来。 

只有非功利性阅读, 才能让你坦然接受失败。 在大量与功利无关的文学作品、 名人传记中, 主人公的失败、 困苦、 绝望比比皆是。 那么多伟大的灵魂, 他们也曾有跌倒的时候, 你为什么不能跌倒?

功利性的读书让你只注重外在的功名, 而忽视了内心的丰富。 孔门七十二贤, 不乏博学多能, 高官厚禄者, 但孔子最欣赏的学生却是单纯的颜回, 「一箪食, 一瓢饮, 在陋巷, 人不堪其忧, 回也不改其乐」。 

孔子说颜回好学, 「有颜回者好学, 不迁怒, 不贰过」, 也就是说颜回心态平和, 情绪稳定, 善于改过自新, 注重德行。 这种内心的丰富在功利性阅读中不可能习得。

功利性读书会让人自高自大, 孤标傲世。 知识经常会让人骄傲, 给人带来智力上的优越感, 让你瞧不起人, 无法与人建立正常的人际关系。 曹丕说 「文人相轻, 自古而然」。

这可能就是知识带来的恶果, 为什么中国的文人总是互相瞧不上? 因为知识让我们觉得自己与众不同, 高人一等。 所以很多知识分子不懂得如何去合作, 只擅于单打独斗。 

很长一段时间, 中国都没有出现世界性的大师, 一个很重要的原因就是这些人过于骄傲。 在座的同学们中会出现大师吗? 我不知道, 但我想, 如果你真的想为人类的进步做出贡献的话, 你必须承认自己的无知与有限, 必须与他人互相配合。

因此, 读书的目的不能仅限于功利, 必须去追逐非功利性的价值。

在我看来, 读书的真正目的是追求智慧, 而非单纯的知识, 从表面上来看, 读书是一个悖论: 让你在求知的过程中越来越觉得自己的无知。 这就像苏格拉底所说的 「承认自己的无知才是开启智慧的大门」。

庄子说 「吾生也有涯, 而知也无涯, 以有涯随无涯, 殆已」, 这句话被很多人误读为励志名句———鼓励人多读书, 其实庄子的意思完全相反, 庄子想说的是, 生命是有限的, 而知识是无限的, 以有限的生命去追逐无限的知识, 会把自己搞得非常疲倦。 

所罗门王也说过类似的话,「著书多, 没有穷尽; 读书多, 身体疲倦。这些话表面上很消极, 但他其实是想告诉我们, 知识是无限的, 在求知的过程中, 必须对知识的无限性保持足够的谦卑。

所以, 读书首先可以培养自己对未知世界的敬畏。 随着阅读的深入, 你才能知道知识的大海是没有边界的, 我们所知道的真的是太有限了。

读书可以激发我们对未知世界的探索, 虽然知识的海洋是无限的, 个体生命是有限的, 但后人对庄子的误读有合理之处。 正是因为人类有智慧, 不同于其他生物, 所以我们必须用我们的智慧去探索未知世界的奥秘, 然后更加认识到宇宙的奇妙, 以避免人类的狂妄自大。

二、 读什么书

刚才我们说过, 读书的目的有功利性目的和非功利性目的。 前者是为了
使用 App 查看完整内容目前，该付费内容的完整版仅支持在 App 中查看
🔗App 内查看`,grade:"A",commentCount:175,comments:[{author:"(匿名)",content:`为什么要读书？
一是通过读书到达你去不到的地方、领略你未曾领略的风景、接触你不曾见过的人或事，了解超越空间和时间的事物。
二是潜移默化丰富你内心的世界，可以让你的视野更加开阔，思维更加敏锐，洞见更加精准。
三是多维看待世界和人生的角度，加深对世间万物的变迁迭代和人生意义不舍追求的深刻认知。

读什么书？
哲学、历史、人文、社科等等，都可以涉略，
摒弃功利性读书的态度，抱以非功利性读书的态度，博观以达约取，厚积才能薄发。

怎么读书？
好的书可以反复读，力求新的启发、新的感受。`,voteCount:1017},{author:"(匿名)",content:`就像老师说的，读书可以知道自己的无知，从而时刻保持谦逊。我喜欢看关于中国历史的书，里面有很多王侯将相，帝王皇帝。他们用冠绝时代的才华妄图打造完美的制度，但往往是死后甚至没死制度就迅速崩坏，甚至造成巨大的反噬。
从来没有什么人定胜天，我们只是认识并运用了更多的自然规律从而挖掘出了自然的能量。从某种角度上来讲，我们与自然的联系正越来越紧密！这就是所谓“天人合一”吧。`,voteCount:253},{author:"(匿名)",content:"我终于知道为什么张三愿意任由你摆布了，你这知识水平，我也服你",voteCount:175},{author:"(匿名)",content:"读书让我宁静",voteCount:108},{author:"(匿名)",content:"毛主席曾经也遇到过“鬼都不愿意搭理他”的窘境，如此厉害的人出现白璧蒙尘的局面，那我们又何必在意一时失意呢，古之立大事者，不惟有超世之才，亦必有坚韧不拔之志！功利主义真的会让人迷失，一旦发现自己赚不了钱，就会堕落！查看图片",voteCount:107},{author:"(匿名)",content:"不带有功利性去读书的话，绝大部分的学生家长根本都不会让孩子去读书。",voteCount:94},{author:"(匿名)",content:"我知道我一无所知",voteCount:45},{author:"(匿名)",content:"功利性读书和非功利性读书都没错。读书不在多而在精，能够将前人的知识经验吸纳获得自己的见解就算没白读。不过读书也是陶冶情操的一种行为，阅读能使人静心怡情，并不需要获得什么知识。[飙泪笑]",voteCount:28},{author:"(匿名)",content:"读书使我不无聊！",voteCount:23},{author:"(匿名)",content:"陶渊明那段写的好，不过我还是要写作。想成为大师[爱]",voteCount:8}]},{id:"1765444786",question:"高中你有哪些吹爆的学习秘诀与经验？",author:"幻夜梦屿",voteUp:12522,excerpt:"这些文章 总分600以下，语数外单科110分以下的同学必须认真阅读 高于此成绩者可以直接忽略或者当做厕所读物 目录： 1、数学废物如何自救？ 2、五分钟搞定病句，下次月考前再多拿三分 3、化学有机选择题，全被我安排明白了 4、生物0基础，老师上课全程放屁，怎么办？ 5、在你寒假看小说的时候，我通过原著把读后续写搞明白了 6、上网课都听不懂的水平滑块，我这里一次性给你安排明白咯 7、一道题和一个公式带你打通高中数学思维 [图片] …",content:`这些文章
总分600以下，语数外单科110分以下的同学必须认真阅读
高于此成绩者可以直接忽略或者当做厕所读物

目录：
1、数学废物如何自救？
2、五分钟搞定病句，下次月考前再多拿三分
3、化学有机选择题，全被我安排明白了
4、生物0基础，老师上课全程放屁，怎么办？
5、在你寒假看小说的时候，我通过原著把读后续写搞明白了
6、上网课都听不懂的水平滑块，我这里一次性给你安排明白咯
7、一道题和一个公式带你打通高中数学思维

1、数学废物如何自救？
阅读本篇文章并且认真执行，大概能让平时水平80上下的你取得理论上104－120左右的分数
注意这里的卷子参考是新高考数学，所以接下来的内容里会有多选题，ok现在我们开始正题。

首先让我们先建立一个认知，即身为一个数学废物，数学卷子上的一部分题你是可以不用做的。为什么？因为它对你而言难到再给你九十分钟也做不出来。并且在每一次考试中，你一定会有巨多的分数是因为各种乱七八糟的非知识性错误丢掉的，比如算错数或者看错题之类的弱智失误。
所以本篇文章的中心思想，就是带你看看哪些题是数学废物可以争取的，顺便减轻一下你考试时的心理压力以便你集中精力做该做的题（同样的时间你要做的题少可不就轻松了么），从而达到多混一点分的目的。
我们来看单选，共计八个，你要明白这里面注定有一个是你绝对做不出来的，并且这通常是最后一个。所以你在单选部分的任务就是尽力把前七个题做好，然后直接给第八题选c跳过。
但是如果前七个题里面存在一个你耗了五分钟仍然没有明确思路的，那你就扔掉它，并且在最后看一眼第八题。因为有些比较苟的老师会把难题放在前面，然后把第八题出的特别简单来搞你一下，或者他给单选里面出两个特别变态的，那就真的没办法了。
另外，如果你在单选里面有超过两个完全不会做的题，那要么去抱着2000补基础，要么去模拟题疯狂刷里面的1－7题。因为除非老师想你死，否则绝不会给单选里面搞出三个超级变态来，那只能证明你基础实在实在实在弱到爆炸了，所以抓紧去补ok？
到这里，单选部分你能争取的分数就是30－35分，部分欧皇蒙对了说不定还能40，当然这个要看命，所以我们先按30－35算。
接下来看多选，指导思想非常之简单——当单选题做。通常我们都能找到一个正确选项，这样玩的话最多扣8分，你要是选错一个可就直接5分没有了。所以最保险的方案就是直接当单选题处理，选一个就跑路，省时省力多骗分。当然事无绝对，比如一般来说多选第一个做全对的问题不太大，你要是再优秀一点连第二个也会，那就只扣4分了嚯嚯嚯。
所以在多选这里，你能稳稳争取到的就是12分，加上前面的单选，你现在已经到手42－47分了。再然后我们看填空，三个可能有点压力，但两个一般没问题的对吧（如果你有问题，请立刻现在马上去补基础，方法参照单选）？你做完前两个然后瞄一眼后两个，直接有思路就写否则就跑路，起码十分就到手了。这样你已经累积到52－57分了，此时大题才刚刚开始哟。
17题通常是选条件解三角形相关，这个东西你要拿全分明白不？第一个大题都拿不满你还考个什么大学啊同学。解三角形的大题其实相当套路化的，一般第一问让你求个边或角，第二问让你找找三角形周长或面积的范围极值之类的。解法就那么几种，自己去模拟题上搜罗个十几道出来然后一波做完纠错，相关的方法也就收集的七七八八了（这一部分的题我不建议用2000，我感觉效果不好，如果你有不同意见可以当做没看到这句话）。不过这个题一般只给十分，所以目前我们的得分是62－67分。
18题一般是数列相关，这个东西也要全分。数列的大题真的比选择填空简单多了，尤其是当它出现在18题的位置时。通常第一问让你求下an，第二问拿裂项相消或者错位相减来搞一搞你。前者基本就是送，裂项相消的时候做慢一点注意下要保留几项，错位相减去2000里面看那个公式，然后装模作样写写过程最后直接化简得Sn就完事了。极个别情况下第二问需要你观察观察式子的特点，看看怎么能转化成和题目要的格式差不多，但其实看出来了之后就非常简单了。18题共计12分，到这里我们已经拿到74－79分了。
19题是立体几何，很多人一看到这里就怂了大叫哎呦这个好难啊。其实有什么嘛，第一问证个平行垂直，第二问算算角的正弦余弦或者干脆问你角多少度，把2000里的相关章节刷明白之后完全就可以pass掉了，差的只是写步骤的时间。耐心点我们一步步列各种条件，建建系求求法向量就能完事（顺便，2000里那个求法向量的叉乘方法我觉得非常不好，我一算一个错，所以我还是用设出来法向量然后让它和所求平面上的两条线相乘等于零的方法，写的多一点但是基本不会出错）。这个题也是12分，目前我们的得分是86－91，欸是不是已经快要赶上甚至超过你平时考的分数了？别忘了我们还有三个大题没做呢嚯嚯嚯。
最后三个大题的位置就很不固定了，不过总还是在统计、圆锥曲线和导数里面轮回。如果20题出了导数or统计的话，你的任务就是争取满分，但如果20题是圆锥曲线的话就真的死掉了（我的圆锥曲线学的很差劲，所以我默认所有圆锥曲线大题都难得要死，如果碰到20题圆锥曲线，21/22题导数/统计这种顺序的话就直接去世，能上一百分就很不错了）。不过绝大多数老师还是比较宅心仁厚的，所以通常情况下20题我们还是能拿到12分的，这样分数就是98－103。
21题我们先默认是圆锥曲线，这道题你的任务就是把第一问的解析式求对，拿到那3/4分直接跑路。如果你还想再挑战一下第二问，那就根据题目条件把直线设出来再和曲线联立，用韦达定理得一个x1+x2和x1x2再跑，运气好的话共计能骗到7分，但这个也要看人品，万一第二问不是联立就又不行了，所以我们还是按3/4分算。此时你的分数已经到101－107了。
22题就是大家最头疼的导数了，这道题你的任务还是第一问，混到3/4分万岁，有理想的孩子可以试试把第二问的g（x）求出来然后求个导再跑路，运气好的话能多骗1－2分。
至此，你本次考试的得分即为104－111，由于我们是按偏低的分数计算的，实际操作中还有很多可以多混分的点，所以这个方法的极限值应该在120分左右，再往上就不太可能了，毕竟我们扔掉了很多的题。另外，如果你本人和我一样在数学方面属于偏科选手（我个人极其擅长导数大题，考八十多分的时候里面是有10－12分出自最后的导数大题），那么你就根据自身情况对题目的取舍进行自我调节，切忌盲目照搬。
好了，本次数学废物的修养课就到此结束。

2、五分钟搞定病句，下次月考前再多拿三分
史上最全的病句攻略，你再学不会病句我光速倒立洗脚！！！
用极端通俗易懂的方法给你讲清楚病句的所有所有所有所有所有类型，顺便直接教你最全的答题流程
看好了

我通过乘风老师的网课学习+自己的大量训练，为大家总结出下面这些
写这篇文章是最重要的目的是

求大家看看我那篇“为什么我狂刷2000成绩依旧垃圾？？？”的文章吧，QQ群里面很多人说话的方式我一眼就知道他们完全不懂那个道理，虽然里面介绍的也是一些基本的常识，但是还是希望大家能看一看，尤其是高一高二的圈友们。那篇文章会救很多人

好正式开始上菜

第一部分 病句的所有分类+例句辅助理解

一、语序不当

1.修饰语和中心语语序失调。
eg.我爱数学的令人愉悦。
应该是我爱令人愉悦的数学

2.定语和状语序失调。
eg.发挥自身充分的优势。
充分发挥自身的优势

3.多层定语：属数动形名。
eg.北大的一位有多年割韭菜经验的优秀的懒狗（正确句子）
属指领属地

4.多层状语：目原时地能副形对象
eg.他们昨天在生产车间都热情地与工人合影留念（正确句子）
这里的形容词=……地

5.关联词：主语相同，关联在后．
eg.不仅他是SB,而且是脑残
他不仅是sb，而且是脑残

6.主客颠倒（条件反射：对、对于、和．与）
eg.幻夜梦屿对我很热悉。
应该是我对幻夜梦屿很熟悉。

7.并列成分：按照词或句的先后。
eg.我认真写了800和2000
我认真写了2000和800
先写2000，再写800，要有顺序

二.搭配不当

1、主宾不当。
eg.你是狗
你是人

2.修饰语和中心语不当。
eg.一条猪
一头猪

3.介宾不当。
eg.从我的帮助下，你终于学会了病句
在我的帮助下

4.关联词不当。
eg.因为自主区有置顶贴，但总有些智障把它当p。
把因为改成虽然

5.2对1
eg.幻夜梦屿更课的速度慢，决定了我们对他是否满意。
幻夜梦屿更课的速度慢，决定了我们对他不满意
一面对两面型错误

6、肯定否定
eg.它这么简单，没有谁不会做不出的。
（三重否定表肯定）
去掉一重否定即可

三.矛盾

1、分类不当．
eg.这里堆着废纸、空瓶子、寒假作业等垃圾。
虽然寒假作业胜似垃圾，但是语文考试里这玩意不属于垃圾。

2.不合事理，
eg.他成功打败了上届冠军，蝉联冠军。
上届冠军不是他，何谈蝉联？

3、强加因果．
eg.因为地球是圆的，所以我爱你。
强加因果不多解释

4.否定不当．
eg.防止脑瘫不再出现，自主学习小剧场设置了置顶帖。
防止和不再，否定不当，应该去掉不再

5、滥用数词．
eg.北京大学学费要比高中学费低一倍多
降价不能用倍数

四、杂糅

1.特定条件反射：
见下图

2.藕断丝连：
eg.你学会了病句如此简单
“你学会了病句”和“病句如此简单”两个不同的句式杂在一起，就叫藕断丝连
通常的改法就是删掉后边的“如此简单”

3.举棋不定：
eg.遵守置顶帖，对于傻吊听起来确实感到困难。
对于和听起来杂糅，去掉任意一个即可

五、歧义

1.成分歧义
eg.我将于3月1日前去学校。
（3月1日前 去。或者是3月1日 前去）
两种不同的意思

2.代词歧义．
eg.甲和乙两个男生一起走，突然，他说：“病句太难了啊啊啊啊啊！”
（他是甲还是乙）

3.量词歧义
eg.两个圈友发的求资源贴子让我问号连连。
（两个帖子还是两个圈友）

4.多义词歧义
eq.他走了五分钟了．
①死了②离开5min③路上走5min

5、兼类词歧义
eg.他背着老婆吃饭去了。
背，四声还是一声，不同的读法会引出不同的意思

六、缺失

1、缺主语

（1)偷换（主语后跟状语）
eg.帖子自爆火之后，他的钱越赚越多越赚越多越赚越多。
应该是自帖子爆火之后

（2)主语顺廷（中途易辙）
eg.幻夜梦屿知名度高，给幻夜梦屿送钱。
第二个分句没有主语怎么办？就用第一个句子的主语。举个例子嗷
他不会做题目，只会求资源。
这句话逗号后面省了个主语，补全了就是
他不会做题目，他只会求资源。
这就叫主语顺延
回到例句，补齐了就是
幻夜梦屿知名度高，幻夜梦屿给幻夜梦屿送钱。
这他妈什么屁话
所以是病句，这种类型就这个屌样子

（3)滥用介词、使动
eg.经过我的努力，使寒假作业一天搞定。
初中难度，像什么通过和使不能连用之类的见得太多了
介词+使动，直接排他就完事了

2、缺谓语
eg.幻夜梦屿已经从骂粉丝的嘴臭青年向温柔贤惠的暖心学长。
从xxx向xxx转变转变转变转变转变
这就是缺谓语

3.缺宾语：
eg.他们大力发扬敢于拼搏，终于夺得了冠军。
发扬xxx的精神

4.缺中心语：
eg各种求资源、发广告、求计划，令一些人非常厌恶。
各种xxx的帖子

5、缺关联词、介词：
eg.他虽然只有三百分，喜欢幻想，总觉得一百天后能考北大。
虽然但是，在喜欢前面加个但是

七。成分赘余：
固定的条件反射，见下图。

杂糅在此：

赘余在此：

大家可以看到，我很多例句都是自己编的，这样有三个好处
1.这样的学习才有意思，一篇文章刷出我一堆多巴胺
2.如果你也能像我这样，把学到的知识用自己的语言表达出来，那绝对学得扎实
3.我不仅写得爽，而且大家也能轻轻松松轻轻松松学到知识，何乐而不为？
4.你绝对能记住我，而且也会返回去看我之前那个加精文章

其实生活中处处都能自己刻意说个病句，随时随处锻炼，比如我上两行那个第三点，这叫主语不同，关联在前

第二部分，病句的答题流程
流程超级伟大无比牛逼，这个方法幻大已经提了无数遍，可惜估计很多人都没能深深理会，反正我是屡试不爽。大家可以按照我这个例子，学着在全科推广这种流程式答题方法。

其实就是按照词性挨个找

1.先寻找明显条件反射，就那两张图，杂糅和赘余。找到了直接出答案。
2.关联词
3.多层定语or状语
4.介词
5.数量词
6.代词
7.否定词
8.顿号（并列词句）
9.一对二二对一
10.主谓宾有缺或者搭配不当
11.歧义，前后矛盾
12.其他

2.关联词=缺失+不当+主语位置
4.介词=缺失+搭配不当+主客颠倒

就这么多，这些是基本的病句分类与答题流程。认识完毕，那就剩下实践咯。配以一些题目理解，相信大家高考中能够稳拿这三分。
加油，上学人！
3、化学有机选择题，全被我安排明白了
对于选修结构的同学来说，有机只用把必修二搞定，选修五用不了太多。
有机选择题一般考什么？
褪色、加成、消去、聚合、酯化、共面、钠家族、同分异构、取代物、命名、手性碳原子。
其中命名属于基础知识，这里不作涉及。同分异构、取代物对基础要求较高，我的总结也只是a rough sketch，必须辅以大量练习。
褪色
首先，发生褪色的有三位：酸性高锰酸钾溶液、溴水、溴的四氯化碳溶液。
酸性高锰酸钾溶液KMnO4（H+）褪色条件：碳碳不饱和键、—CHO、苯的同系物、—NH2—OH（醇、酚都可以）。

注意，碳碳不饱和键是指碳碳双键、碳碳三键，千万不要看到两根线就兴奋激动！苯不能使其褪色，那三道杠是来迷惑你的！因为它们不表示三个碳碳双键，而是一个大派键。羧基酯基当中的双键也是白搭，不能使高锰酸钾褪色。
溴水褪色条件：碳碳不饱和键、—CHO、碱性溶液(如NaOH溶液、Na2CO3溶液）、较强的无机还原剂(如H2S、SO2、KI、FeSO4)分割线苯环、CCl4、CS2、氯仿CHCl3、液态饱和烃、液态饱和酯。分割线前是正儿八经和溴水发生氧化还原反应，分割线后都是纯纯的萃取，物理变化。
溴的四氯化碳溶液褪色条件：碳碳不饱和键、—CHO。简单省心。
加成
和谁加成？氢气。加成条件？老三样：碳碳不饱和键、—CHO、苯环。好消息，酸性高锰酸钾溶液褪色的坑加成时可以放心大胆跳。苯环嘛，三道杠，1mol苯环加成消耗3mol H2。
现学现练：加成1mol上面这玩意儿要多少氢气？

正确答案是4mol氢气，你数对了吗？
消去

卤代烃呢，要氢氧化钠的醇溶液。醇呢，需要浓硫酸并且加热。（不要看到—OH就上头哈，醇`,grade:"A",commentCount:199,comments:[{author:"(匿名)",content:"现在多选漏选只有两分了...",voteCount:202},{author:"(匿名)",content:"数学苟分方法简直和我一模一样，不过因为本身水平不咋地最后只有100左右，不会做的题真的不要死磕，大多数时候就算想二十分钟也做不出来[发呆]就算做出来也是亏了。水平不高的人不要在前面叽叽歪歪的，到后面把该拿的都拿了才是首选。",voteCount:145},{author:"(匿名)",content:"旧文新法割韭菜",voteCount:36},{author:"(匿名)",content:`报名链接：
离高考不到一百天了，我好慌，怎么办？`,voteCount:26},{author:"(匿名)",content:"幻老师写的太有意思了",voteCount:7},{author:"(匿名)",content:"爱了爱了(⑉°з°)-♡",voteCount:3},{author:"(匿名)",content:"厉害",voteCount:0},{author:"(匿名)",content:"不应该是双重否定表肯定嘛……",voteCount:0},{author:"(匿名)",content:"爱了 数学这个太真实了这不就是我吗",voteCount:0},{author:"(匿名)",content:"自主学习剧场在哪",voteCount:0}]},{id:"812523656",question:"有哪些方法可以提升自我？",author:"阿彬学长",voteUp:12452,excerpt:"嗷！说真的，我就是靠这些方法，成长为自己喜欢的模样，答应我，死死撑住，把它看完，并实践。真的很羡慕你们能够看到这篇文章，希望能够帮助到你们~我自己通过这样的方法，养成了至今十几个好习惯，度过了一个充实的大学生活。 在大学四年里，我卖过灯管，销售过二手书，批发过军训鞋垫，教过数学，当过物理家教，做过驾校中介； 四年里，我参加各种比赛，演讲、写作、主持、书画，机械、电子、模型等等，只要是有举办我就报名…",content:`嗷！说真的，我就是靠这些方法，成长为自己喜欢的模样，答应我，死死撑住，把它看完，并实践。
真的很羡慕你们能够看到这篇文章，希望能够帮助到你们~
我自己通过这样的方法，养成了至今十几个好习惯，度过了一个充实的大学生活。
在大学四年里，我卖过灯管，销售过二手书，批发过军训鞋垫，教过数学，当过物理家教，做过驾校中介；
四年里，我参加各种比赛，演讲、写作、主持、书画，机械、电子、模型等等，只要是有举办我就报名，只要有空的我就参加；
四年里，我做了四年的学生工作，舍长、学委、班长，赛车队经理，再到电台主任，党支部书记，直到毕业后的那一个月里，还在忙着支部的事情;
四年里，我拼命地看书，只要有闲暇的时间，我就去图书馆，传记、经典小说、散文、诗歌等等，杂七杂八的书我都看了一遍；
四年里，我也看了不少电影，最喜欢的事情是在下雨天，边看着电影边啃着零食；或者是去学校图书馆的光电影院，在最后一排默默坐着，在角落处安静地享受一次饕餮大餐
四年里，我坚持着跑步，坚持着健身，坚持着写日记，坚持着行走福州的角落，深层次地感受这座我生活了四年城市的脉搏；
四年，一个短暂的人间历程，我完成了从一个带有书生气的学生到一个社会人的改变。
一、学会精力管理：
医学研究发现，成年人的精力水平在30岁以后是逐年下降的，但是事业、家庭和个人对你的要求却是不断增加的。
在提升自己时，一定要先进行自我的精力管理，我们的目标不是延长这16小时的时间，更重要的是我们在这16个小时中间的状态。
提升自己需要大量的精力，而进行的精力的管理需要我们源源不断的精力，因此，精力的管理尤其重要。
精力管理的模式是金字塔样式：体能，情绪，注意力，意义感。
好的精力= 充沛的体能+积极下面的情绪+随时可以聚集的注意力+明确的意义感。以上是得到APP张遇升老师的课程《怎样成为精力管理的高手》中的内容，以下的几件事我结合老师的进行实践，很有收获，和各位分享。
1.1早上起床后的30分钟，会固定做七件事：
1、睁眼以后，在床上做一些简单的活动，双手搓脸、梳头发，和简单的拉伸；做这些时，我会用脑子回忆自己昨晚自己做了什么样子的梦，因为在做梦的时候，我们的潜意识是在工作的；
2、起床后会发一分钟整理好自己的床铺，暗示自己的一天之晨做成功了意见事情，每天都会很整洁地来工作和学习；
3、会喝一大杯的温水，大概有600毫升，相当于一整瓶的矿泉水；
4、我会用自己不常用的那支手去刷牙，同时我会换着用两只腿单脚立着去刷；
5、做情绪热启动练习，大概花10到15分钟的时间，感恩自己高兴的事情，并且能够不断提醒自己当下和未来的目标。
6、在手机上，把今天最重要的三个目标记下来，并且在大脑里去想象，这三个目标完成后的那种快乐；
7、准备一些比较有营养，热量比较低的食物。不吃馒头和包子这些热量特别低的食物。
这七件事大概需要半小时。
在去上班的路上，我会在脑子里面回忆，提醒自己，今天最重要的三件事情。并且仔细去策划这三件事情的过程。一般走路到自己的办公室，到了之后立即开始去做这三件事情，并不会去打开邮箱和微信去做很多被动的回复。
从最重要的事情开始，开始后的45分钟，有5到10分钟的休息时间，稍微做一下运动。
吃午饭的时候，吃饭的顺序一般是先吃大量的蔬菜，然后是肉类蛋白质，最后还没吃饱的话，吃一点碳水化合物，米饭和面条。
午饭后到楼下走一走，一般边走路边打电话。
在下午工作的间隙，打开我的奇妙清单，回顾自己哪些事情做完可以划掉，哪些事情还需要安排。
在下班之前，我会复盘一下今天早上自己哪些事情没有做好，是否考虑晚上回来继续做，还是第二天接着做。
1.2 睡前七件事：
1、花几分钟冥想一下。让自己安静下来；
2、用热水泡脚；
3、把第二天要喝的水准备好；
4、回顾下自己当天的3各目标有没有完成；
5、花时间看下自己的日程表，看看我自己是不是把重要的时间花在重要的事情上；
6、对第二天的日历进行一个简单的准备，看看有没有一些事情是要注意的；
7、把自己的看的书放在床头，上了床以后，读几分钟的书再入睡；
8、把明天要穿的衣服准备好；
9、写一下日记，反思下自己的成果；
二、学会时间管理
每个人每天都是24小时，但是每个人的时间利用率却又不一样，管理好时间从某种意义上来讲无形中创造了很多时间。
我通过傻瓜日记去让自己养成各种习惯，通过时间记录工具:app: a time logger记录自己的时间，从而让自己的生活变得更加充实。
2.1 傻瓜日记：
其实很简单，你用EXCEL表格建立如下的表格，想养成什么样的习惯，就去做一个这样的表格，然后每天完成后打个勾，不要怀疑，就是这么简单。刚开始你可以把目标定得少一点，比如两三个，后面等养成后再累积，再增加。如果你怕自己还是完成不了，你可以叫同学帮你监督，甚至可以让你觉得最重要的人在上面签字，就像军令状一样。我之前做的一个，你可以参考下。
2. 2 时间记录工具:app: a time logger
这是我从今年4月份开始的记录时间的工具，具体是记录自己的时间花销，哪些方面多，哪些时间浪费掉，以提醒自己不要浪费时间。
这两个工具结合起来，你就能很好的了解自己了。
如果你想知道这套时间管理方法的具体应用，你可以关注我的公众号：柒年客栈 获得。
三、学会写作
在2019年时，我正式开始在自己的公众号：柒年客栈 
19年写作至今，我已经写了百篇文章，如果问我有什么收获，最大的收获也许是知道写作的道路有多远，知道我还远远不能称得上是个知行合一的写作人， 我写的很多道理自己还不能真正意义上的做到。
甚至回过头来，我会发现曾经写过的观点，我现在反而不能接受，曾经写下的论点，在我心中已不再成立。当然，也许这才是成长吧。
我也认为在今天，自媒体依然还有机会，只不过没有那么多红利了，做起来没有那么简单了，但这本身也是个机会，你想，如此一来竞争的人少了，由此同时也去促成那些真心愿意从事这一行的人真正地成长，写出真正有价值的东西。
在这一行，确实需要时间的积累，也需要运气。
我从19年下半年开始运营，只运营了3个月，后面，甚至整个2020年，我都没有再持续引流，公众号没有赚到什么钱，反而原本作为引流工具的知乎偶尔接到广告，这倒出乎于我的意料。
从这个角度来看，这一行我依然有可为，只是过去的我耐心不足，方法不当罢了。
有了前期的思考，以及得到的一些回馈，读者的收获也好，广告的收入也罢，让我更有动力在这里输出。
同时，这也符合我做事的逻辑：做事，要有叠加性的进步。比如，粉丝的增长，在知乎的回答一直在为我引流；另一方面，一份时间可以同时出售多次，因此，我实在没有理由放弃已经搭建好的平台和形成的引流思维，还有正在建立的个人品牌。哪怕最后做不成也没有关系，至少无憾。
四、学会元认知思维
在复杂的时代，认知的升级能够决定我们能够走得多远。而在诸多认知中，最重要的是提升元认知能力。
所谓的元认知能力是指认知的认知。
通俗的讲就是，你在思考的时候，你会清晰地意识到你是在思考。
举个例子，在我们明知道某些事情有用，但却本能地不想去做某些事情时，你一定要与自己的大脑做挣扎。就好像两个人打架一样，其实你的内心是想做的，但是你的大脑另外一个声音让你别去做，你要使劲地去听真正的声音。
其实很多人所谓的懒惰，所谓的脾气大，归根结底是缺少元认知能力。在我们的认知体系里，存在着三个我，本我，自我和超我。也可以理解成为黑马，白马和骑手。黑马代表着直觉，白马代表着情绪，而骑手代表着理性。
你要知道，大脑是我们的一个器官，而我们不是大脑的。并且，一旦你出现了惰性，那你一定要启动自己的元认知能力，告诉自己，你才是自己的灵魂主人，你一定要成为骑手，管理好黑马和白马，让直觉和情绪并行，而不是随着其中的一方随便行走，以至于失去了自我。
有元认知能力和没有元认知能力的人的差别：
4.1 元认知在读书的作用
有元认知的人在读书的时候，会去思考作者的写作思路，知道作者为什么要这样写，还能找出作者的思维漏洞；
无元认知的人在读书的时候，只是阅读书面上的文字，理解字面上的意思，最终读了书但是用处不大；
4.2 元认知在做事的应用
有元认知的人会去想老板交代这件事情的用意，目的，也会提前去想怎么做好这件事情，如何把这件事情做得更好，除了了这件事情外，还有什么事情可以辅助做好；
无元认知的人，只会做好老板布置的任务，从不想着这件事情的目的是什么，如何做得更好，与之相关的事情是什么；
至于如何 提高元认知能力，方法是：
1）每天都反省一下自己，想下今天做了什么事，做错了哪些，为什么做错，当时的思路是什么，哪一步想错了，如果让你重来一次机会，你会怎么办；
2）冥想。
3）把自己平时的一些选择记录下来，想清楚自己选择的依据是什么，然后由此去做判断。等到事情结束后，再来看，当初哪些想对了，哪些想错了。
五、读书
书籍不受时间和空间的限制，因此，我们可以充分在自由的时空中看书，与诸多聪明人谈话。
在我个人的经验中，读书主要有怡情、修身、长智的作用。
5.1 怡情
在刚开始读书的时候，我对读书这件事当作兴趣，对生活的一种仪式。
记得在上大学时，最开心的事情是在下雨天，一个人去图书馆，一张桌子，一把椅子，倒上一杯水，拿着一本书，开心地待在图书馆一下午。
有时索性就直接坐在地板上读，那种感觉悠闲自得。
期末考也是不例外，明明跟舍友说好要去图书馆好好复习功课，没想到我还是忍不住拿了书来看。一看一下午就过去了，有一段时间，我都不敢去图书馆复习，怕自己看书担负了复习。
可能每个人都曾是个文艺少年吧，有时候我更喜欢在自然风景中读书，
三月桃花开时，我总是喜欢一大早去学校那片开满桃花的路上读诗。三月的天气温柔得刚刚好，不会太热，也不是太冷，拿起书，在阳光下读了半个小时，不为了什么考试，也不是为了在人前显摆，只是真心喜欢这样的时光。
时而读读拜伦、卢梭，时而读读海子、席慕容，那样的生活至今回忆起来都充满惬意。
读书有时并不是为了能够获得什么，而是读书这个过程本身就充满
5.2 修身
十八岁以前，我们身上的习惯或者说是品格来自于家庭的培养。
十八岁后，等到我们离开家去了远方，家庭的培养往往被学校教育所代替，我们可能需要通过老师的教导，同学间的学习提升我们的品格。
在这个过程中，我更多的是通过读书完成一些重要品格的塑造。
在这其中，对我影响最深的应该是吴军博士和李笑来老师，他们的书我都看了，而且看了不止一遍，反复践行着他们讲过的道理，给我的生活带来了巨大的改变。
另外，培根、卢梭的随笔，朱光潜、周国平的散文，也让我受益良多。
书读得投入了，感觉自己不是在读书，而是在与一个智者谈话。
也许当时他跟你说的那些话你并不能了解，但在当你自己遇到人生困惑时，他们的人生感悟又会不经意间出现在你的脑海，不知不觉影响着自己看待世事和人生。
5.3 长智
大学前期，我看了大量虚构类的书籍，小说、散文、诗词。
等到快毕业的时候，我才开始大量看非虚构书籍，才发现看说理性书籍比虚构类的来得更快乐。
读诗歌、散文，快乐的来源于品味意境；
读小说、话剧，快乐的来源于品味情节；
读说理性书籍，快乐则来源思考与践行。
渐渐地，我很少读诗歌、小说，转而阅读非虚构书籍，这方面所带来的快乐远超过我在桃花树下读诗时的享受，每当书本上的道理化为我生活中具体的行动，幸福更是难得。
在这个人人都可以发声的时代里，互联网上的文章良莠不齐，很多人为了营销，不惜煽动情绪愚弄大众，伪装文艺卖弄矫情，逻辑错误空谈鸡汤。
遗憾的是，这样的文章依然受到很多人推崇和着迷。
看书本身其实只是一个简单的动作，但是在这动作后，更为重要的是深入的思考，读书后的思考与行动才是读书的最大意义。
这是我大学读书的书单，希望对你有帮助。
你想要这份书单的话，可以关注我的公众号：柒年客栈。
六．学习编程
在互联网时代，编程是一个人人都应该学会的技能，它的好处想必各类Python广告都有提到，代替枯燥重复数据处理工作，得到高薪职业，诸如此类。
他们说的并没错，但在我眼里，编程更重要的是锻炼人的思维，一个好的程序员与差的程序员相差很多，不是技能的差别，本质是思维的差别。
同样的一个功能，一个好的程序员可以让程序简洁，而差的程序员，虽然也能实现相同的功能，但程序复杂，甚至存在着BUG。
因此，如果你不从事程序员工作，也可以学一下编程，一方面提升工作效率，另一方面锻炼自己的思维。
当然，学编程原因是充足的，只不过很多人内心一直心存恐惧，觉得这东西太难，我脑子不够用，诸如此类。
我之前也是如此，前前后后学了好几次，也没有成功，但最近发现了一个宝藏APP：夜曲编程，彻底地打破了我对编程的恐惧，也让我开始了编程的自学之路。
通过对Python 编程概念的学习，最终将这些概念一点一点的串起来，形成自己的编程地图。
而且更让我意外的是，编程的学习可以在手机上操作，相比传统的视频和上机学习，有着很大的改变，无时不刻你都可以拿起手机随时随地地学习，每完成一讲，还有对应的练习。
很多技能一旦学会了，就回不去了，我管它叫做不可逆技能，编程是其中一个，而夜曲编程则是通往这个入口的阶梯，至少对我来说是如此。
这里可以跟大家分享一下参与其中的一个免费体验渠道：
在应用商城里面下载APP：夜曲编程 进行激活。
开始大概20天的免费课程探索了，如果你成功入门了，记得回来感谢我！
七、旅游
随着消费升级，旅游这个昔日看来很高大上的行为成为了大众可以的选择。
旅游的作用可以总结为增长见识；看到更大的世界，知道更小的自己；见天地众生，以见自己。
网页链接7.1 增长见识，亲身体会使大脑中的意识具体形象化
读书与旅游是互补，我们获取知识通常有三种渠道：亲身感知、他人告知和逻辑推知。
一般来说，人们通常只是通过亲身感知和他人告知来获取新知，对于逻辑推知很少有人这样去做。从某种意义上来说，旅游的作用是亲身感知，读书属于他人告知。从书本中获得的知识抽象，而亲身感知则能使其具体形象化。
对于抽象模糊的东西，不管对概念再怎么熟悉，倘若没有见过实物，没有到实地考察过，那样的了解也只能是停留表面。
旅游的意义也是如此，不管别人跟你说得再怎么好，你倘若没有亲眼见过，即使你认可他的话，你的潜意识里面也是打个问号。
因此，旅游的第一个意义是增长见识，亲身体会使大脑中的意识具体形象化。
7.2 看到更大的世界，知道更小的自己
在一个地方生活久了，我们总是会特别容易困在当下，以为自己目中所及就是天地，眼中他人即为众生，常常囿于固定的思维。
前一段时间，一位朋友分享了她去日本所见所闻所感。`,grade:"A",commentCount:314,comments:[{author:"(匿名)",content:"嗯嗯，谢谢你的提醒。每个人都有自己的方式，我们一起加油哈",voteCount:41},{author:"(匿名)",content:"几分钟？是起催眠作用还是？",voteCount:18},{author:"(匿名)",content:"没有头发的怎么办？",voteCount:15},{author:"(匿名)",content:"作者真正生起气来是不是会很可怕？",voteCount:14},{author:"(匿名)",content:"30乘8等于240小时，和你睡眠时间很符合，但你的工作时间呢?不工作，没收入，你是怎么付房贷或房租，水电，食物，网络，养太太的啊？就靠那50小时的写作和1小时的理财?",voteCount:14},{author:"(匿名)",content:"我是学生，那时刚好大学毕业，都是空余时间",voteCount:13},{author:"(匿名)",content:"时间管理那个app叫啥啊",voteCount:12},{author:"(匿名)",content:"很少生气，几乎不生气。生气起来好像也还好",voteCount:11},{author:"(匿名)",content:"a time logger",voteCount:6},{author:"(匿名)",content:"好吧，[耶]",voteCount:0}]},{id:"1920735652",question:"有哪些值得长期坚持下去的好习惯？",author:"U君笔记",voteUp:12432,excerpt:"1. 在亲戚朋友面前哭穷，在陌生人面前炫耀。每加一个微信好友，都要把ta加上一个标签：要么属于哭穷的对象，要么就是炫耀的对象。对于亲戚、家人、朋友、同学、同事，都要哭穷（防止嫉妒和恨）；对于潜在的客户、心仪的对象，都要炫耀（人们普遍喜欢追随强者）。对于知道你家庭住址或者车牌号等私人信息的工作人员，也要哭穷，万万不可炫富，以免招致灾祸。 2. 要么做一个彻底的“好人”，要么做一个彻底的“商人”。喜欢帮助人…",content:`1. 在亲戚朋友面前哭穷，在陌生人面前炫耀。每加一个微信好友，都要把ta加上一个标签：要么属于哭穷的对象，要么就是炫耀的对象。对于亲戚、家人、朋友、同学、同事，都要哭穷（防止嫉妒和恨）；对于潜在的客户、心仪的对象，都要炫耀（人们普遍喜欢追随强者）。对于知道你家庭住址或者车牌号等私人信息的工作人员，也要哭穷，万万不可炫富，以免招致灾祸。
2. 要么做一个彻底的“好人”，要么做一个彻底的“商人”。喜欢帮助人的话，就帮到底，而且是义无反顾那种。即使碰到“好心被当做驴肝肺”，或者是“恩将仇报”的情况，也毫不在意。
如果喜欢赚钱，就把每件事情都商业化，把自己的时间定个价，谁都别想白piao。想要获取我的时间和经验，请先掏钱。最怕的是左右摇摆，今天做好人，觉得亏了；明天做商人，又觉得太冷血。摇摆不定、矛盾的心理是一切痛苦的根源。
3. 永远不要跟别人谈信仰问题，永远不要期待别人跟自己三观一致。这个世界上，除了骗子之外，没有人会跟你三观一致。信仰级别的东西，是从小形成的，很难改，最聪明的做法是求同存异，你需要获取的是对方的利益和资源，来满足你的需求，而不是要跟对方辩论谁对谁错。
什么是信仰问题呢？我列举一些词汇，它们都是信仰层面的东西：zong教，中医，孝道，美国，华为，苹果，特斯拉，保险，微商，直销，国产汽车，日本汽车。这些话题，如果你喜欢跟别人讨论，那么你的级别一定还很低。因为这些东西是无所谓对错的，信则有，不信则无。
4. 想要让自己心情愉悦，需要培养下面几种能力：①不追求完美主义，包括对事、对人，要知道，所有的人际关系终将会消失，所有的人都是自私的；②不做任何画蛇添足的动作，任何事情、任何人际关系都需要“恰到好处”，一旦过了界，所有的美好都会消失；③保持高度警惕，出现上述两种倾向时，迅速选择退出，绝不纠结；④培养自己快速决断、说放就放、不陷入情绪旋涡的能力。
5. 想要求人办事，该砸钱就要砸钱，大部分人的面子都是0价值。你要是真想把事情办好，就把它当个生意来做，你只需要考虑你打算用多少钱来买到这个结果。只要你能这样想，哪怕谁都不认识你，你都可以把事情办得很漂亮。
6. 不要动上层人士的利益，你动了他们的利益，如同动他的生命。不要动底层人士的观念，让他自生自灭即可，你如果动了他的观念，如同挖他的祖坟，他会和你拼命。
7. 不要羡慕有钱人。大部分有钱人的钱，都是他劳动得来的。脑力劳动，体力劳动，总归有一个在劳动（或者他的父辈、祖辈劳动换来的）。靠脑力劳动的人，每天都在算计，都在规划，都在筹划，他的大脑一刻都不能停歇，否则整个公司的人都得跟着自己喝西北风。
靠体力劳动的人，得到处去跑业务，还要陪客户喝酒，伤胃伤肝这些代价也无所谓了。我也从来不歧视任何人，包括当小三的，做鸡做鸭的，他们都是在做交易而已。只不过他们拿出来做交易的筹码，大部分人不愿意拿出来而已。
8. 一定要培养一个长久的兴趣，最好是能赚钱的。人过了30岁，对于性、美食、美景、豪车、奢侈品、健身、旅行之类的事情，虽然也喜欢，也能带来好的感觉。但是如果你仅仅指望这些东西，作为快乐的来源，作为满足感的来源，是支撑不了多久的。
正常人，对于以上我提到这些美好事物，让你玩几年，你就不会再痴迷了，因为它们带来的快乐和成就感是非常短暂的，可能就10分钟，但是一天有1440分钟，那么剩下的那1430分钟你打算用什么填充？
9. 坚持去做以时间为成本的事情。就是说，我们做的事情，不拉长到5年、10年，是看不出明显效果的。之所以我现在写东西很顺畅，那是因为，在2009年，我刚上大一的时候，我就开始在贴吧和论坛上写东西，虽然是断断续续的，但是到今天也写了10多年了。
保持连贯性写作的朋友应该都清楚，想要输出1000字，我们可能需要先输入10000字的信息，然后再经过大脑的处理、关联、深度思考，才能完成。至于想要写的东西有理有据还有趣，让人爱看，看了很爽，没有几年功夫肯定是做不到的。
所以说，这些成长都是有时间的加成，所以会变得非常坚固，即使我现在身无分文了，我只要开始敲键盘，收入马上就来了。对于我们这些没有家底的人来说，时间真的是我们最大的优势。所以大家一定要有5年、10年的规划，不论是写作、塑身还是其他的事业。
10. 如果你是个生性敏感的人，那么你必须努力赚钱，允许自己生活在一个能让自己舒适、安静、放松的环境里，否则每天来自外界的、常人感知不到的细微干扰迟早会把你逼疯。相信内心敏感的人应该能明白我说的是什么意思。
（如果你也想读书但是不会找书，可以关注我的微信公从号：赢在8小时之外，后台回复“书单”，即可领取我的私人书单）
11. 不要随便跟别人倾诉苦难。跟别人倾诉苦难，就相当于在鲨鱼面前流血。喜欢抱怨、喜欢倾诉负面情绪的人，是没有福报的，能量场也会越来越弱。
但凡是幸福的人，或者是富有的人，都是特别在意自己的能量场的，他们不会轻易让负面情绪入侵。如果你散发出来的都是负能量，他们绝对会躲得远远的。而你吸引到的，也都是失败者，然后你们一起大吐苦水，一起顾影自怜。
12. 要时刻意识到，你的生命100%都属于你自己，你需要100%为它负责，必须自己爱自己，除了自己之外，不会有其他任何人来拯救你。父母、爱人、人生导师，都没有办法真正帮到你，真正的人生瓶颈，只能自己去突破。富二代也不例外。成长，本来就是一个孤立无援的过程。
13. 正视自己的欲望。不要总是学习xx文化，去压制自己正常的欲望。对于炫耀的欲望，追求享乐的欲望，也要积极去面对。我在2017年成立第一家公司时，赚了不少钱，当时就膨胀了，去日本或者欧洲都坐头等舱，住洲际和希尔顿，还发朋友圈炫耀。现在想想很可笑，但是我不后悔，因为每一个穷人乍富的人都得经历这个阶段。
14. 不要尝试跨阶层交朋友。人都是分阶层的，一个阶层有一个阶层的消费习惯和品味，以及对金钱、对时间、对生命的理解程度。不同阶层的人之间，是没法交流的，并不是谁瞧不起谁。
我们没法揣测高阶层的人在想什么，同时我们也不要奢望低阶层的人能理解我们。每个人都在自己的阶层，做能让自己舒服的事情，就可以了。
在此基础上，尽量往上提升，你会看到不一样的风景，你的格局会更宽广，包容性也会更强。也就是说，高阶层的人往下看，一眼就能看穿下面人的小心思。因为他就是这样一步步走上来的。
15. 不要随便表露自己的真心和爱意，尤其是男人。最不值钱的就是男人一事无成的温柔。
16. 想要避免被骗，想要避免伤心失落，你就要记住：任何人答应你的事都不算数，只有你自己能做主的事才算数。就像在战场上，一个士兵只能相信自己手里的枪，除此之外其他任何人都有可能发生变故。
我并不是劝大家都变成悲观主义者，而是让大家认清人性。当一件事你不能做主、不能控制时，你就要做好别人随时变卦的准备。当然，更加保险的做法是，自己不能做主、不能主导的事情，尽量不要参与。
比如，我在公众号里面就写过参加饭局的潜规则：如果一个饭局，你不是主导的一方，那么你就不要参加。不要跟我提什么社交圈、人脉拓展之类的鬼话，任何一段你不能主导的人际关系，或者圈子，只要你沉溺其中，最后必定被收割。
至于不打欠条就借钱给别人这种事，也不是不可以，但是有个前提：你的爸爸是公A局局长，或者是H社会老大，那么你想怎么放贷都可以，没人敢不还钱。当你轻信道德和誓言时，那么所有的坏人都会来收割你。当你手里握着gun时，你碰到的都是好人。
17. 所有的人类活动，本质上都是交易而已。上次我提过一次男女关系本质的话题，然后就有人私信我，说他看上了一个女生，但是无论自己怎么表示，对方都无动于衷。想问问我有没有什么好的技巧或者套路，能把对方拿下。
我就说，你特别想得到的东西或者人（不论男女），本质上是其实是一件商品，你得拿出真金白银的筹码来换才可以。比如，人家心理预期的价格是80，而你的外貌、学历、收入、家庭背景、谈吐、情商等等综合价值才60，那么你就没法购买这件“商品”。
这时候，无论你用再多的套路，费再多的吐沫星子，也没戏。这就好比，你去购买iPhone手机，人家定价是8000，你说你手里只有6000，然后就去苹果店里软磨硬泡，那么人家无论如何也不会搭理你的，还会觉得你神经病。
你想追的人，跟你想买的iPhone没有本质区别。只不过买iPhone你得用人民币，而追人的话，你需要拿出综合筹码。所以，你一定要搞清楚，人家想卖多少钱，而你手里的综合筹码值多少钱。如果价格跟商品不匹配，那么人家肯定是不会卖的。
当然也有例外情况，毕竟人是感性动物，有时候会被假象所蒙骗，稀里糊涂就把自己卖出去了。但是这些也都是小概率事件，而且结局都不会太好，搞不好就把自己折腾进去了。成年人，自己到底有几斤几两，应该有点B数了。
（公众号：赢在8小时之外）
【更多犀利好文】
底层的道德，跟富人一点关系都没有
“被捧杀的中国女性”
抱歉，穷人的社交毫无价值`,grade:"A",commentCount:314,comments:[{author:"(匿名)",content:"扑面而来的油腻和市侩",voteCount:325},{author:"(匿名)",content:"收藏夹里呆着去[爱]",voteCount:184},{author:"(匿名)",content:"没开放打赏？？说的很多条都深得我心",voteCount:78},{author:"(匿名)",content:"非常精炼的话，鞭辟入里",voteCount:43},{author:"(匿名)",content:"谢谢认可。不过，我在知乎的回答太犀利，经常会被系统删除。所以，可以看我简介，永远不会删除。",voteCount:37},{author:"(匿名)",content:"天呐！如此精辟的见解，条条入骨！[赞][赞][赞]看得人一身冷汗！为什么这么少赞呢",voteCount:21},{author:"(匿名)",content:"这么好的答案[赞同]，收藏",voteCount:3},{author:"(匿名)",content:"在陌生人面前炫耀和在知乎上吹牛本质是一样的[思考]",voteCount:2},{author:"(匿名)",content:"好[惊喜]",voteCount:1},{author:"(匿名)",content:"文章的分段可以提升一下",voteCount:1}]},{id:"704052534",question:"有哪些让人欲罢不能的学习方法？",author:"张禾禾",voteUp:12380,excerpt:"1、费曼学习法即，自己先学习某一块新知识，理解之后用自己提炼过的语言，通顺地讲述给其他人听，或者讲给自己听，在讲述过程中，遇到卡顿不顺畅的地方重新回过来学习，然后再去讲述它们，如此循环学习直到满意为止。 以教导学就是说的这个意思，该方法很好用，把被动学习变成主动学习，对知识吸收率高达90%，刚开始不要嫌慢，获得知识后记忆深刻，理解透彻，是我推荐的第一个好用的学习方法，一定要尝试一下。 2、思维导图法思…",content:`1、费曼学习法
即，自己先学习某一块新知识，理解之后用自己提炼过的语言，通顺地讲述给其他人听，或者讲给自己听，在讲述过程中，遇到卡顿不顺畅的地方重新回过来学习，然后再去讲述它们，如此循环学习直到满意为止。
以教导学就是说的这个意思，该方法很好用，把被动学习变成主动学习，对知识吸收率高达90%，刚开始不要嫌慢，获得知识后记忆深刻，理解透彻，是我推荐的第一个好用的学习方法，一定要尝试一下。
2、思维导图法
思维导图能帮助我们压缩知识信息，提炼出关键词，它重在结构化思维，把各级信息用隶属和层级的关系表现出来，使知识的无序状态变得有秩序，再通过图像、颜色、符号等建立记忆链接，从而构建起属于自己的的知识框架。
在整理思维导图过程中，还能用思维发散和相关联想找到更多知识，把这些知识重新分类找到其中规律，再整合成新知识，所以遇到学东西时，不管学啥用思维导图盘它就对了，盘着盘着就有思路了，做思维导图工具推荐xmind，使用教程关注微信公众号“一周班会”，回复“思维导图”找我领取，给你发一个免费的学习视频链接，简单易上手。
3、刻意练习法
大家都听过一万小时定律，只要你刻意练习某一项技能或者学习某学科知识一万小时，你就能成为专家，但一万小时并不是无目的的学习，它建立在有效练习的前提下。
即，首先你要有目的地练习，且具有明确的目标；其次保持足够的专注，将大块知识拆分成小知识块，一次只学一样，切记贪多；再次进行大量重复练习，并在这个过程中及时获得反馈复盘，回顾目标，评估练习的有效性，并持续改进；最后跳出舒适区，去挑战一些能再次突破的任务。
这三个方法是我实践过的，希望你也喜欢上它~`,grade:"A",commentCount:239,comments:[{author:"(匿名)",content:"果然是学霸们的学习方法大致相同……学渣的各自不同",voteCount:507},{author:"(匿名)",content:"原来之前一直在用所谓的费曼学习法。",voteCount:271},{author:"(匿名)",content:"费曼学习法，当老师的人应该最有体会了～",voteCount:44},{author:"(匿名)",content:"原来一直在用费曼，也算解了个惑[思考]",voteCount:17},{author:"(匿名)",content:"原来这三种方法我都用过",voteCount:10},{author:"(匿名)",content:"厉害👍",voteCount:9},{author:"(匿名)",content:"都一样，重在实践，执行，",voteCount:6},{author:"(匿名)",content:"谢谢好文章",voteCount:4},{author:"(匿名)",content:"不客气，希望有用",voteCount:1},{author:"(匿名)",content:"厉害[赞]",voteCount:0}]},{id:"1898186962403300625",question:"如何看待现在的初中生高中生普遍睡 5~6 个小时？",author:"yysg",voteUp:12350,excerpt:"蠢。 我说个断论。 课本➕你们普通老师（非省会的市一中级别）➕垃圾题海卷子➕垃圾辅导书＝废物。 高考主科135+和副科90+的都可以站出来分享一下。 你们写大题的思路方法，是你们天生的吗？你们在高一不接触任何高质量辅导书的时候，就能轻松完爆高考卷吗？ 我敢说99%的都不是。 那你们是从哪学来的？ 单说理科。 我是市一中普通班，数学高一高二常年100+偶尔110+，实话说那个时候真的想不通为什么一班（每个年级就一个重点班）…",content:`蠢。
我说个断论。
课本➕你们普通老师（非省会的市一中级别）➕垃圾题海卷子➕垃圾辅导书＝废物。
高考主科135+和副科90+的都可以站出来分享一下。
你们写大题的思路方法，是你们天生的吗？你们在高一不接触任何高质量辅导书的时候，就能轻松完爆高考卷吗？
我敢说99%的都不是。
那你们是从哪学来的？
单说理科。
我是市一中普通班，数学高一高二常年100+偶尔110+，实话说那个时候真的想不通为什么一班（每个年级就一个重点班）他们数学都是考130+140+，真的是因为我蠢吗？
可我是真的按部就班按照学校教授的来，可以说是啥辅导书都没买，平时都是蹭着同学买的写（哈哈，主要是他们买来只做简单的，我可以做些中等难度的）
如果他们一直买垃圾辅导书，我可能高考数学也考不到140。
因为那些垃圾辅导感觉跟弱智短视频没区别，一样垃圾普通的题型，换个数字而已让你算。
我敢说100%人写着写着都会产生一种想法“我到底是在学习知识，还是在做加减乘除的工具人啊”？
但是产生了又怎么样？普通学生不接触网络，接触的也是垃圾网络内容，哪来的胆子抬头看一眼困难一点的，高级一点的题目？
我们只会拿着只配出现在高考前十题的垃圾题目，重复着写三年，然后在高考卷子写完这十道题目，看着后面的题型绝望。
我改变的契机就是一个同学，他买了一本紫色的数学五三，因为太难，他都没动。
于是白嫖的我接手了。
本以为又是一本平平无奇的垃圾刷题书。
结果那个晚自习我震惊了。
因为上次月考出现的压轴题，紫色数学五三里有总结题型和密密麻麻的三种解法。
我那时候就产生一个想法。
那些重点班140+的人，真的是因为他们聪明吗？这答案我抄都要抄五分钟！他们居然能在考试时间内靠着自己的脑子，在12分钟内写完这个大题？
我不信。
我相信你们也不信。
中国不缺天才，但也没泛滥到我们一个普普通通市一中就有几十个这样的天才。
所以我相信第二种可能——他们学过这种题型，所以他们才会写。
当晚我很兴奋，那是冬季，走回宿舍的路上，吹着夜风，但我浑身一点都不冷，只感觉自己脑袋很空灵。
那种感觉就像是吃完薄荷糖，再拿着风油精涂满整个脑袋一样。
因为我知道了为什么我不能考130+140+
——学校根本没想培养你到140+，他们对普通班的期望就是上个一本得了，别学更多了。
明白了这个后，我就开始抵触晚自习发的卷子了，那些卷子只不过是换了个数字来让我不断验算验算再验算。
做它们，我只能停在现在的分数。
而做那本紫色五三，我才能突破我的分数。
结果也显然，我的猜测在我身上得到应验。
接下来的月考大题，我都是做过了。
分数也从110+变成了保底130+。
当然我不是天才，面对一些没在紫色五三上出现过的题目，我基本想破脑汁也写不出来。
但这重要吗？
高考是筛选，而不是选天才。
我吃完紫色五三，已经够超越其他人了。
数学上得利，我开始向着我选的其他科目扩散。
英语，物理，地理，生物……（语文懒得看嘿嘿，反正就是110，也不会多也不会少。）
选最难的辅导书，然后慢慢啃。
我很菜，有时候一节晚自习45分钟，可能就学会两三个大题。
但我很喜欢这种感觉。
因为我知道，明天的我会比今天的我强。
明天的分数，也会比今天的分数高。
而不再是以前那种，天天坐着垃圾重复的卷子，自我麻痹地过着三年。
从那之后我学懂一个道理——人是需要学习的，你不去学，那你永远不会。学了，你会发现它们真不难。
这个意思在互联网上也有一个相同含义的词语——“草台班子”
那些知识真不难，那些岗位专业性真不高。
只要你去学，只要你找到怎么去学。
那一周内，你可以学会这个领域50%的重点核心。
……
再说一个刺激我高中时期觉醒的事情。
我高一高二班主任是生物老师。
有次他给我们出月考卷子。
大题是遗传（离太远有点记不清楚题目，请见谅）
大家都学过嘛，遗传无非就是那交叉互换那套（就是两条染色体，一个A，一个a那套）
题目和答案忘记了。
反正我们年级没几个人做出来。
我们就去问班主任，这题怎么写。
我记得那是晚自习的时候，我们上台问他。
他狡黠一笑，说：“就知道你们做不出来”
忘记他是怎么讲解的了。
只记得他说可以一条染色体上Aa，另一条上啥都没有。
这对初学的我们造成心灵暴击。
还能这样？
那为什么上课的时候，还有课本上写的，都没告诉我们能这样？
不教你们还能考？
六百六十六啊！
这意义就跟你刚会加减，老师就考你乘除符号，然后再告诉你这两个符号的作用。
同时我也明白了，不是我们老师菜，他们平时也在办公室做这些题目，但他们做了不是为了教给我们，而是为了避免我们的问题难到他。
不教就考，是高中的通病。
结果第二天我就在五三看到了这个题型，导致我记忆犹新——只要我月考前多写一页五三，就能在班主任面前装逼了呀喂！
这也刺激了我五三的自学生涯。
我是21年的高考生，不知道你们后面怎么样，但是在我之前，不教就考的情况真的很普遍。
如果你还没高考，在掌握基础知识后
不要把时间浪费到刷垃圾简单题上面了！
你应该考的更高，不要被这个破烂的机制，和一群只想在你面前装逼的老师束缚了。
学！大胆学！朝难的学！
你没有你以为的那么菜！
他们也没有你想象中的那么聪明！
你可以成为更好的自己！
一定要跳出简单垃圾重复题的舒适圈！
外面的世界真的很精彩！
写出来难题的感觉真的很爽！
菜比被学霸夸天才的感觉真的会很爽！
（当然当年我只要是做紫色五三，它对一些常见大题的套路总结很不错，但是对基础知识归纳很垃圾。如果你们能接触其他更好的辅导书，可以给新的高考生推荐一下）
补更：
没想到帖子火了，评论大多是一些有类似经历者的分享，不过当初我和这些分享者分享的主要是自身情绪，只有类似经历者才有相同感触。
而我本意是想号召大家帮助后来者，以及我在评论区也发现一些后来者学弟学妹们的迷茫，他们因为种种原因还没有踏足进来。
（其实人生很多时候都有这种茫然无措——父母哥哥姐姐说的对不对？老师教的对不对？我考这个大学对不对？我进这个专业对不对？我进企业对不对？我创业对不对？……
当然互联网现在发达，会有很多分享者的分享，但是都和我原回答以及评论区大多数类似经历者一样陷入知识诅咒
——即一旦自己掌握了某类知识，就容易默认他人也具备同样知识，难以站在“无知者”的角度思考，忽略信息差的存在。当然对抗这种诅咒也有一个办法，那就是保姆级教程，把所有注意事项全部列举。
当然会有遗漏，希望之后的类似经历分享者评论补充。）
接下来的保姆级教程会分成两个版本形式
①详细版（我会阐述我的思路，告诉你我为什么这么做，希望评论区帮忙补充更正）
②简洁版（抛弃所有注释，只告诉你应该做什么）
我将尽量完备总结思路，总结从0分到高分所有路程，帮助学弟学妹获得更好成绩。
如何有效学习初高中科目（详细版）
1.认清自身。接受知识：抛弃学习羞耻感和歧视链。【目的：调整学习心态】首先是认清自身，是天才还是普通人？这个想必大家活了这么久都有答案。
当然也可能是你因为的天赋不在高考的科目上。
我希望你能够找到自己的天赋所在，
但如果你在这个类目没有天赋，
那请不要抱着傲慢之心，天真的去臆想着自己不学知识也能轻松获得好成绩好成就。
普通人只能靠努力慢慢做一步一个脚印走上去。
然后是抛弃学习羞耻感。
这里我还是“要求”大家购买一些公式总结的教辅小册子、一览表或者小书（不含题目，就单纯的总结基础公式，让你用来背熟看熟记住的，也可以在做题时忘记公式时拿出来看一看）
我知道很多人在学习过程有种“羞耻感”
——即“我怎么这么简单的公式都忘记了？”“明明我背会了，可为什么又不记得了？”“我真笨，怎么老是忘记这种简单的步骤和细节？”……这种情况其实不只是在你身上发生过，其实在我在他在所有普通人身上都发生过。
我们毕竟不是那种过目不忘的天才，
不可能做到一眼就记住，记住就不会忘的境界。
高中时间有很长，不用说三年，一年时间只要每天看你忘记的，那你也足够刻入脑海里。
忘记就再看一遍嘛，看了再背一遍嘛，不用想着一口气吃下，多来几次轻松拿捏它们的。
不要小看你这几百万年称霸地球的种族天赋啊！
在遭遇“羞耻感”时，
你不要自挫自艾甚至绝望，
其实大家都一样，有很多人都是这样走过来的。
三十年河东三十年河西，我们这群老东西只不过比你先走点时间而已，并不意味着我们会永远领先你。
不停留，你迟早能追上超越我们的！
最后就是抛弃歧视链。
这个主要是针对普通人自诩天才，以及自身等级认知不明的情况。
我以前高中青春期，说白了就是爱没实力还硬装逼。
这个题目难？我写它！我堂堂天命之子还不是随便写对？结果不会……那我就装作鸵鸟之后不看它了。
这套试卷这个教辅有答案？我扫一眼就行了，反正我是天命之子，肯定看一眼就懂了的……一眼看完还是不懂，那我就不看了。
这个教辅解题答案这么多？那我看完不得头皮发麻看吐去？我不看了，我还是回去写那些能被我秒杀的题吧！这个情况主要是我自卑心理，但是本身又要强，然后恼羞成怒把自卑转化成自大，最后“歧视”那些新题难题，
仿佛我自己高高在上，那些题不能和我接触，不配被我看，而我却心！安！理！得！的不写不看不碰它们。
这种鸵鸟心态也很误人。
我个人现在的座右铭是一句废话：做对的事情，那就永远不会错。
这些题会考吗？会。
我会做吗？不会。
那我要学会做它，对不对？对。
那这件事既然是对的，
你，为什么不去做？
你应该去做。
你必须去做。
既然你选择高考这条路，那你必须走这条路上正确的地块。
不要高高在上，不要事不关己，这是你的事情，这是对的事情，这是你做的事情。
歧视链里，你从来不是最顶级，而是在链尾，你要做的就是往上走，做对的事情，让自己走到顶级。
所以，
书本上那些笛卡尔牛顿伽利略的知识在你前面，你就要学他们。
那些教辅书上的基础公式总结和常见题型总结，都是几十年来高分且专精这个类目的天才从业者总结的。
你也要学他们。
（叠甲：垃圾教辅也有很多，你是天才的话也另说。）
抛弃自我保护而在心理营造出来的极端歧视链，还是那句话“三十年河东三十年河西，你未来可以会在河西，但你现在在河东。”
打开心防，拥抱那些正确的知识。
不要因为他们现在比你强大，你就痛恨埋怨自己弱小。
说白了他们只是比你早生几年，早学几年而已，你学完肯定干得过他们，没看见现在高斯爱因斯坦牛顿他们现在都不敢和你同台竞技？
这个道理在你以后所有关乎学习里也能用上，不要在未知的时候自大，也不要在已知之后自卑
（前者容易后者难，我相信每个人都是独一无二的强大，你要相信自己。
我不知道现在还有多少人认同这个观点……
但起码在我死之前，你要记住世界上最少还有我一直相信你的强大。）
2.学会基础公式，掌握“加减乘除式题目”。【目的：获取学习的自信。】之前要求大家购买基础公式集合的册子和书，大家要常看常背，争取早点将基础知识刻入脑海。
不要偷懒！不要丧气！
每天都看看背背自己不会的，写时遇到自己忘记的也不要自怨自艾，再看一遍就行了。
然后做会那些“加减乘除式题目”，就是让你把数字代入这些基础公式里，慢慢算就行了。
这个步骤是最简单的，但也是最难熬的。
其实相当于立心立志。
简单平凡的小事，再加上层出不穷的小挫折，克服它们的许许多多小成就，才能淬炼出一个人的顽强意志。
在我当年接触的同学中，做完这一步的都会顺理成章真真正正的开始自己的学习之路。
而不是“撒谎式摸鱼”，拿着题目看半天，结果到了吃饭时还没动笔，一直在发呆。
我也经历过那个时候，那时的我特性就是不自信，面对公式我不信我能背下来，面对题目我不信我能做出来。
这一步只能靠你自己踏出来。
当你建立心志自信走出来后，之后所有都是升级打怪的套路。
可能单论题目难度之后的题目会是基础题的100倍，但是论你自己心路历程难度，这段基础旅程将会是你之后的100亿倍。
以数学科目而言，你完成这一步，再加上平时接触的小变形公式和常见提醒，分数将在100~120中间地带（时间太久了，只记得数学了，就只拿数学举例了哈）
3.掌握变形公式，掌握常见变形题型。【目的：拿到最后一题以外所有见过题目的分数】万丈高楼平地起，辉煌还得看自己。
假如你是在非省会的地级市一中普通班。
在掌握所有基础知识后，你已经强悍的可怕了，在平时做题时耳读目染之下，你早就学会了一些常见题型。
在普通班里的你，已经成为一颗冉冉新星，得到父母的欣慰，老师的关注，学霸群体的接纳，以及学渣们瑟瑟发抖的崇拜。
恭喜你在获得【帅哥美女】称后后的另一称号加持【班级学霸】！
但，
你来不及骄傲自满。
你学会的仅仅是“直拳”，获得的拥戴也只是你们一个普通班同学的赞美嫉妒，
出了你们班根本没人认你这个“学霸”！
如果你没有全科学完基础知识公式，你现在连进年纪前一百都够呛，更别提你们省了。
你要面对的还有那些全省强者，你可能在高二上学期完成这些，
可他们早就碾压之势在高一平推完了，甚至你还能听说你们市一中重点班从高一就参加高考，开局就是600+分数。
对于此时才刚刚学完基础知识，摆脱了及格线的小卡拉米来说，他们还是一座不可逾越的大山。
所以你迫切想要学会“组合拳”，迅速秒杀那些常见题型，把自己突破120的限高，去和那些家伙一决高下。
这时候就得看学校师资了。
我见过有些像衡水的学校会有专门的常见题型的多种解法，但更多学校只学会了衡水的跑操和作息……
你很不幸，在这种只学跑操的学校里。
这意味着你只能靠自己在漫如烟海的教辅山中，抛开那些狗屎教辅，找到记载着一招半式的好教辅。
因为年代久远，我已经遗忘当初自己挑选的很多好教辅。
所以我只能给你一个参考路线——
找有总结常见题型解法的教辅，它们会把题型分门别类放在一起，总结以往出现的各种变形题型，并给出多种解法。（它的答案就在题目下面，不需要你翻到后面再找）评论区有更推荐的教辅可以介绍分享一下，如果互动多我会帮你顶置（以免广告乱蹭）
聪明的你肯定有疑惑：
为什么答主的参考路线是这个啊？
答案为什么要在题目下面，为什么要有多种解法，为什么变形题目要在一起？
那当然是……
方便你记啦。
一开始就说过了，天才第一次看常见题型变形题型，不用看答案就秒杀了。
你如果不看答案，也能一路秒杀下去，就算一天秒杀一题，那恭喜你，你是十足的天才啦！🫡🫡🫡🫡🫡十分感谢天才来看普通人的回答。
如果不能全部秒杀，那只能遗憾高斯牛顿他们没有成功转生……
差点击败高斯的我们，只能遗憾看几遍答案，学会了这个题型题目。
这个似乎是诟病的“题海战术”？
但本回答不讨论应试教育，单纯只为帮助学弟学妹。
对应试教育之下的普通人来说，这条路是对的，所以我们得去做。
我唯一能够建议的方法就是——`,grade:"A",commentCount:962,comments:[{author:"(匿名)",content:`老师不是不教，是很多老师没有能力教，而且很多学生也没有能力学。
如果一个事情班级70%的学生不懂，就没办法教給学生了，哪怕学生会。

以前是通过分级分层解决这个问题，现在不让搞快慢班，重点班。就只能牺牲聪明一点的学生了。

五三很好，但是缺点是不够基础，题目偏难，对基础差的学生不友好。
很可惜一个高中基础差的学生能占到70%-90%。除非是省里排名前几位的高中之外，其余的高中985 211的比例太低了。

基础差的学生四则运算都不熟练，更何况题型了。`,voteCount:2207},{author:"(匿名)",content:"你靠53能到140真不说明53厉害，是你厉害，甚至可以反馈出你们学校不行[捂脸][捂脸][捂脸]",voteCount:1901},{author:"(匿名)",content:"强调次要矛盾，遮掩了主要矛盾，就是学习规律问题。当您说出”不要把时间浪费到刷垃圾简单题上面了！“这意味着您对高中基础知识，以及高中之前前置知识的滚瓜烂熟，这很了不起了。您的滚瓜烂熟，在其他人面前可能是犹犹豫豫，磕磕绊绊的。他们用不熟九九乘法表，算出的每个结果都不是笃定的；他们记不清三角函数公式，对数函数定义和计算法则，你能一目了然瞪眼法，他们可能推都推不出解题所需基本公式定理；他们记不住圆锥曲线几个定义，二级结论，没时间面对最后俩大题……您把自己的成功大肆归功于自己的面对难题的勇气，却没看到究竟是什么带给您的勇气，而其他人为什么没有培养出来这些勇气。目前教学普遍的问题反而是操之过急了，小学，初中的一些基础没打好，导致高中知识永远在体系化前差了最后一”公理“，可老师没法一个个给他们返工打牢基础。这个所谓基础可能就是九九乘法表是否熟练，可能就是楼上四则运算，可能就是读不懂20个字以上的嵌套逻辑题干，可能就是不会列竖式计算乘除法，可能就是不会瞪眼配平。 老师哪有那个时间把这些给他们拉起来？背熟乘法表甚至往往和学钢琴一样，不集中练，不打，不狠，就没法迅速整合到认知体系里。不过还好，虽然不懂教育真正规律的”奴隶人“”槽枥“类教师罪该万死，但这种老师很少（往往是新老师或者无志从教者，时间可以迭代淘汰之），何况”千里马“是有阶级性的。从小不给足资源喂的千里马，高中突击给资源也很难唤醒奇迹了——要靠爹妈和运气。",voteCount:842},{author:"(匿名)",content:"对的，后面我们班老师基本也不管我了。他们需要考虑全班学生的进度，也不想耽误我的进度。所以我都是做自己的，发的基础卷子不写他们也不会问，偶尔下课会找我聊聊题目。[赞同]老师心里还是很希望自己学生考的更好，只是要教几个班上百学生，他们也是有心无力",voteCount:494},{author:"(匿名)",content:"靠五三只能到125左右的水平，再往上只能有名师或者自己天赋怪",voteCount:441},{author:"(匿名)",content:"题主搞错了，是你太厉害了",voteCount:422},{author:"(匿名)",content:"确实是这样。这位答主说得很对，是有潜力优等生的真实情况，您也说得很对，是老师的态度。所以不分班真的害死人…优等生或者潜力生，要懂得自己找路子…",voteCount:388},{author:"(匿名)",content:"可能问题不是你的学校、老师，而是你那儿生源不行，导致学校不会教太深，说白了你被你班的差生绑架了。我也有同样经历，明明中学数学题很简答，老师翻来覆去讲基础题，而对压轴题一笔带过，更多时候直接不讲，我很纳闷，因为解决不了压轴题，数学几无可能上140.",voteCount:363},{author:"(匿名)",content:"其实告诉大家一个筛选课外题的好办法 就是看答案解析出的怎么样。如果一个教辅的解析很详细易懂，甚至一道题有好几种做法（数学），那至少这个教辅就不会差到哪去",voteCount:277},{author:"(匿名)",content:"这么说吧，有个哥们把市面上能买到的题集都写了一遍，省前几名[飙泪笑]",voteCount:161}]},{id:"75404999925",question:"为什么现在很多年轻人不愿意听过来人的建议？",author:"三好诗畅",voteUp:11918,excerpt:"我请来了几位德高望重的过来人，他们想为你的人生提一些建议。 [图片] “打磨过的石器更锋利！” “火…烧过…肉…好吃…” “呜呜呜哇哇哇阿巴阿巴阿巴嘟噜噜阿巴！！” 你是不是感觉很有收获？",content:`我请来了几位德高望重的过来人，他们想为你的人生提一些建议。

“打磨过的石器更锋利！”
“火……烧过……肉……好吃……”
“呜呜呜哇哇哇阿巴阿巴阿巴嘟噜噜阿巴！！”

你是不是感觉很有收获？`,grade:"A",commentCount:280,comments:[{author:"(匿名)",content:"将军：吃饭一定要用嘴吃[大笑]",voteCount:2249},{author:"(匿名)",content:"《猿辅导》",voteCount:1161},{author:"(匿名)",content:"德高望重的过来人：千万不要去种地，打猎才是长久之计，种地会让我们活不下去的，是不务正业的体现",voteCount:712},{author:"(匿名)",content:"[鼓掌]",voteCount:432},{author:"(匿名)",content:`真是醍醐灌顶，受益匪浅！
第一位老先生教的是：磨刀不误砍柴工。
劝我们不要因为大环境浮躁就浮躁，要沉下心来，踏踏实实提升自己，成为一把锋利的石器，才能所向披靡，活出自己的精彩人生！
第二位老先生教的是：讲究饮食的重要性。
生肉不仅不好吃，而且不健康，有细菌和寄生虫。
火烧过之后，不仅美味，而且健康，让我们的体魄更强健，心情更愉悦，从而带来更强大的学习能力、专注力，更好地学习和生活。
老祖宗的智慧，虽然简单却内涵丰富！
佩服，佩服！`,voteCount:263},{author:"(匿名)",content:"[惊喜]什么原始人团建",voteCount:196},{author:"(匿名)",content:"✍️✍️✍️",voteCount:177},{author:"(匿名)",content:"我这个才是老祖宗[doge] 查看图片",voteCount:177},{author:"(匿名)",content:"[惊喜]查看图片",voteCount:156},{author:"(匿名)",content:"呜哇哇嘟噜嘟噜阿巴巴[生气]",voteCount:23}]},{id:"10200390739",question:"女性慕强慕的到底是什么？",author:"只道当时是寻常",voteUp:11497,excerpt:"我前女友到最后跟我分手还一直在强调她慕强，我一个月2.6万，她一个月4000，她说我们不合适，说我买不起帕拉梅拉。",content:"我前女友到最后跟我分手还一直在强调她慕强，我一个月2.6万，她一个月4000，她说我们不合适，说我买不起帕拉梅拉。",grade:"A",commentCount:767,comments:[{author:"(匿名)",content:"人家都放过你了，你要感恩[赞]",voteCount:9582},{author:"(匿名)",content:`她的闺蜜圈子里，一定有一个被开帕拉梅拉的玩过。
导致她们一整个圈子都有种错觉，自己的段位得至少是开帕拉梅拉的男人才能配上`,voteCount:3709},{author:"(匿名)",content:`我前女友也这逼样，毕业工作都找求不到，只能去链家卖房还卖不出去，每天要人接送，结果天天给我说一个月没有5w活不下去。

我一个人比她爸妈加她全家收入高，毕业家里面就给我买了房，转头说我不上进分手了。

后头挤了两周地铁，一下老实了，朋友圈写小作文想复合，然后还让我朋友来试探我。`,voteCount:1098},{author:"(匿名)",content:"哈哈哈，让我想到一个笑话，有一个女孩嫁入豪门，那她认识的100个朋友就会都觉得自己也很有不小的机会嫁入豪门[飙泪笑]",voteCount:1064},{author:"(匿名)",content:"也可能是被租了帕拉梅拉的玩过",voteCount:869},{author:"(匿名)",content:"她是你贵人，跟你上了课，离开你还不拖泥带水，也没想着坑你，仅仅是在一直加强你的学习效果",voteCount:856},{author:"(匿名)",content:"卖房的别要了，后面肯定是买房送劈的",voteCount:782},{author:"(匿名)",content:"接收了又输出到社会上，你难道没有责任吗[doge]",voteCount:316},{author:"(匿名)",content:"她准备下海赚钱搞米了，不想连累你[滑稽]",voteCount:185},{author:"(匿名)",content:"[捂脸]我倒是觉得你是个人才，月薪2.6w，你怎么能找个4k的[飙泪笑]",voteCount:185}]},{id:"542638383",question:"什么是费曼技巧？",author:"YJango",voteUp:11175,excerpt:"前言费曼技巧早就写在了初中课本里。 因为费曼技巧在学习中正是验证集 (validation set ) [视频: 费曼学习法] 下载视频【文稿】和【导图】，请到 http://modevol.com 渐构 Modevol 也可通过网站，来加入学习社群，训练学习能力。",content:`前言
费曼技巧早就写在了初中课本里。因为费曼技巧在学习中正是验证集 (validation set)
费曼学习法https://www.zhihu.com/video/1526709755703246848下载视频【文稿】和【导图】，请到 http://modevol.com
渐构 Modevol也可通过网站，来加入学习社群，训练学习能力。`,grade:"A",commentCount:341,comments:[{author:"(匿名)",content:"深奥的一批……作者厉害",voteCount:378},{author:"(匿名)",content:"因为语速和视频播放速度的问题，不得不反复看了几遍。不过并不算浪费时间，重复的遍数也给了反刍的空间。即使不讨论对错也是能给人以思考的干货，值得点赞。",voteCount:188},{author:"(匿名)",content:"我就说看到开头的时候这不是机器学习的吗😂",voteCount:99},{author:"(匿名)",content:"费曼的崇拜者，十分赞同。",voteCount:74},{author:"(匿名)",content:"收益很多，能早点看到就好了[拜托][拜托][拜托]",voteCount:45},{author:"(匿名)",content:"答主对学习类问题深有研究啊。",voteCount:39},{author:"(匿名)",content:"求思维导图时的 BGM",voteCount:16},{author:"(匿名)",content:"水浒卡做栗子简直棒呆",voteCount:16},{author:"(匿名)",content:"名偵探柯南的推理BGM",voteCount:15},{author:"(匿名)",content:"高手啊！",voteCount:14}]},{id:"1030207889",question:"如何养成习惯性自律？",author:"宾大佳佳聊留学",voteUp:11150,excerpt:"从学习英语西班牙语，到跑步，健身，学乐器。自律已经是一个伴随状态的词了。“自律”本生就是一种生活习惯，一种看起来很难，但是当你一旦开始去行动，会渐渐不难，并成为像你吃饭，喝水一样存在的伴随式状态。一：坚持一件事情，最重要的就是不管每天做多少，先开始做。其实最简单的一个方法，就是想到不想做的事情，开始做，设定一个番茄闹钟，只要你做了最开始的十分钟，你凭着自己的意志强迫这个10分钟的开始，你就容易继续…",content:`从学习英语西班牙语，到跑步，健身，学乐器。自律已经是一个伴随状态的词了。“自律”本生就是一种生活习惯，一种看起来很难，但是当你一旦开始去行动，会渐渐不难，并成为像你吃饭，喝水一样存在的伴随式状态。
一：坚持一件事情，最重要的就是不管每天做多少，先开始做。
其实最简单的一个方法，就是想到不想做的事情，开始做，设定一个番茄闹钟，只要你做了最开始的十分钟，你凭着自己的意志强迫这个10分钟的开始，你就容易继续坚持！
我的案头有一个番茄闹钟，开始设定后就不能，在这10分钟之内就不能去干别的事情了。 
每个人都会偷懒，这是很正常的一个事情。去年我经常会分享英语学习和留学的信息。一年坚持下来，知乎也有了4万粉丝。然后因为生活中的忙碌，停止了更新。等我发现我没更新这件事之前，我发现已经过去了大半年了。仿佛就在一转眼之间。这种时间流逝的恐惧感，让我重新去把不同的事情坚持下来。 
设立目标很重要，但是最重要的，把目标分解掉，然后通过特定时间去做，最后养成一个习惯。
曾经看过一个科比的采访，科比说：他的作息基本每天都差不多，4点起床，然后去健身，然后到6:30回家，叫醒孩子，送孩子去上学。 
任何你想坚持的事情，刚开始做，没有动力，其实是很正常的事情，所有人都是这样的，这是人的正常机制，但是你可以通过分解他，慢慢去适应它，从而养成习惯。 点滴变化意义深大。如果不能一下子坚持，
二： 可以先从养成“微习惯”开始。
有一个很经典的故事就是，从1908年之后，英国车手在奥运会上仅获得过一枚金牌。110年来，没有一个英国自行车运动员在这项赛事中得过奖牌。
后来布雷斯福德被聘请让英国自行车运动步入新的发展道路，与以往不同的是，他一丝不苟的指定“边际收益的聚合”占率。就是把有关自行车的整个环节都分解开，然后每个部分改进1%。随着数百个小改进的积累，收效出乎意料。2015,16,17年连续在环法自行车赛中夺冠。
所以从数学的角度，如果你一年内的每天都进步1%， 那门你将进步37倍。
你每月的收入低于你的收入吗？ 你每周都回去健身房吗？你每天都在看书并学习新东西吗？正是这些每天在做的小事情塑造了未来的你。如果你每天退步1%，那么你未来的拥有的东西将趋近于“零” 。正面和负面的复利都很可怕。所以赶紧行动起来才是最重要的！
我也看了一些关于养成好习惯的书籍，比如
《微习惯》
《掌握习惯》《当下的力量》等等
三：坚持最有效的方法不是关注你想要达到的目标，而是你想成为谁。是形成正确的价值观
要奖励自己，你的感觉神经系统会不断检测哪些行为能满足你的欲望和快乐。快乐和失望的感觉是反馈机制的一部分，帮助你的大脑区分有用和无用的行为。
最后分享几个我是怎么养成自己在坚持的事情的内容。
四：如果将习惯性自律运用到写作？
这项其实是我最近才打算去坚持的。在今年1月的时候，我身边的一位曾经特别要好的朋友，在年近27岁的时候就去世了。他曾经SAT考到1560/1600， AP 8门，托福18岁的时候就考到了115。然而他去世后，似乎什么也没有留下，几乎快找不到他生存过的痕迹。这么优秀的人只活在了大家的记忆力。所以这也是促使我想要去写文章，把自己的思想，日常所见所闻留下痕迹的原因。不出意外的话，从你看到我这般文章的起的每一天，我都会坚持去写下去。 很开心，过去已经有200多万人看到了我的文章。

五：如何将习惯性自律运用到日常爱好？
我个人特别喜欢中华田园犬。所以会不经常更新我和狗子的生活动态，每日的日常生活分享，也让我的抖音有了3.3万，62万个赞，关注到中华田园犬。
抖音分享自家宠物六：如何将习惯性自律运用到日常爱好？
看到很多人会在4,5点起来，我自己也曾经经历过每天4:30起床1个月，但是一个月下来，虽然很早睡，每天都感觉心脏超负荷。关于早起，我觉得每个人的体制是不同的。我见过有的人，每天2,3点睡，只需要5,6个小时睡眠，也能精神抖擞，有的人就是每天需要睡9-10个小时，找到自己身体最舒服的状态，是最终红药的。
健身，其实我从23岁就开始运动锻炼。今年29了，关于健身，其实已经是一项坚持了6年的事业啦~ 不过最近才开始用KEEP，每天早上起来跑个3公里打卡。 其实健身本生就是奖励机制的一个最明显的表达，因为你的身体在变强变好~ 
2013年2014年2019年每天3公里，锻炼下心肺，从小就肺活量不高只要不下暴雨，我每天都会起床跑3公里。喜欢跑步的童鞋也可以关注我的KEEP: IvaHuang
七：如果讲习惯性自律运用到语言学习？
说到坚持一件事情，少不了语言学习。 这个其实没啥好晒的，哈哈，本来这就是我的专业，but一直学语言的习惯，也让我早早就拿到了上海高级口译，GRE334分等等，也是得益于一直的坚持。 有幸被美国宾夕法尼亚大学的教育学专业奖学金录取。个人觉得打卡真的是一种非常好的方式，
1）打卡看到你自己的积累，词汇，日期，时间，本来就是一种正反馈。我大学时期的英语学习也要感谢不停的打卡坚持！
练习口译的笔记最近我也学习西班牙语2）用外教君APP，坚持一周跟外教学习两次语言！
每周和美国外教交流两小时，提高口语以习惯性自律在学乐器的应用~这是从小妈妈给我培养的一个爱好。纯属个人业余
钢琴乌克丽丽，纯属业务。不专业。个人爱好。
钢琴https://www.zhihu.com/video/1214457121405923328古琴https://www.zhihu.com/video/1214457191366905856乌克丽丽！https://www.zhihu.com/video/1214457328591876096其实回看我坚持下来的事情，多数是对我个人有益处，且有正向回馈的事情~~所以要坚持的做下去，最重要的就是先开始，设定十分钟，然后慢慢养成习惯，给自己正面回馈~ 也希望大家能坚持做一件事情！久而久之，会看到很大的变化！
今年打算坚持一件新的事情，把自己学习单词的新的每日更新分享，感兴趣的小伙伴也可以关注我的抖音：IvaEnglish 小红书Ivaenglish
希望大家能跟我一起不停的坚持下去！：）
很久没有看知乎了，突然发现我的这篇文章竟然有这么多人给我点赞有超过10,000的小伙伴给我点赞，其实我也并不是所有的事情都能坚持到底的，当然有了大家的鼓励，我相信我也会更加的努力在2024年今天是2月28号我又决定开展一个新的自律项目因为在过去的2023年，我曾经想坚持发视频却没有坚持下去，所以在2024年我给自己立了一个比较大的flag今年呢？又到了33岁的一个年龄的关口，所以想做出一些更大的改变，在这里跟大家分享一下今年是2024年新年的一是我给自己做的更大的flag以及今年我想通过自律去坚持的一件事情。

今年我想坚持做的一件事情就是坚持做我的一个创业日记，因为虽然我已经创业了十年了，但是其实一直也是在一个学习的过程，所以我想记录一下这个过程的同时，也能鼓励到更多的想尝试创业的同学在创业的过程中没有老板盯着你其实自律对创业者来说就变得更加的重要了。
今年想要的做的事情的flag就立在这里了，我会不断地更新我的创业日记通过一年的努力通过一年的自律生活来实现这些目标。当然，这些目标可能不会被实现，甚至有些人觉得他们会大概率是失败的，但是呢，我会尽自己最大的意志力去实现这些目标，实现自我的价值，给大家带来一个比较Postive的impact！
不管你是喜欢我和不喜欢我都可以关注我。关注我是否有足够的自律，可以把自媒体做起来不喜欢我的小伙伴关注我了，也可以见证我的失败。当然喜欢我的小伙伴，我会尽最大的努力，让大家看到结果是成功的是喜悦的！
2024年让我们拭目以待吧！`,grade:"A",commentCount:710,comments:[{author:"(匿名)",content:"丢太漂亮了吧[思考]求微信",voteCount:285},{author:"(匿名)",content:"答主长得好看还很自律，好厉害。我也养成了几个有正回馈的习惯，但还没活着答主的样子",voteCount:202},{author:"(匿名)",content:"Comptine D’un Autre Ete L’Apres 天使爱美丽电影里的曲子",voteCount:45},{author:"(匿名)",content:"加油坚持就是胜利",voteCount:21},{author:"(匿名)",content:"古琴我是找老师的，这个乐器还是必须得找老师教，因为识谱已经弹法什么的，不听讲解基本很难明白~ 入门比较麻烦，后面就变简单了",voteCount:16},{author:"(匿名)",content:"请问古琴是自学的吗",voteCount:13},{author:"(匿名)",content:"习惯真的很重要⊙∀⊙！",voteCount:9},{author:"(匿名)",content:"佩服佩服！请问，钢琴曲名字是什么？",voteCount:8},{author:"(匿名)",content:"漂亮，长开了",voteCount:6},{author:"(匿名)",content:"谢谢！",voteCount:1}]},{id:"1443246642",question:"你最庆幸自己养成了什么习惯？",author:"克克克",voteUp:11001,excerpt:"1、不在嘈杂的环境下听耳机，比如公交车上、火车上往往要把声音调到最大才能听的清。会对听力造成损伤，而且噪音对听力造成的伤害是不可逆的。 2、加微信前最好是想好话术，不要就一句“hi”就没有了。想好个人介绍以及来意能更高效的达成你的目的。 3、找男女朋友一定要选择合适的场合，一个很简单的道理就是，你很难在垃圾桶里面发现宝藏。 4、 鞋子一定要保持干净。有些人真的是，看到鞋子就仿佛闻到了脚臭味～ 5、平时要注意…",content:`1、不在嘈杂的环境下听耳机，比如公交车上、火车上往往要把声音调到最大才能听的清。会对听力造成损伤，而且噪音对听力造成的伤害是不可逆的。

2、加微信前最好是想好话术，不要就一句“hi”就没有了。想好个人介绍以及来意能更高效的达成你的目的。

3、找男女朋友一定要选择合适的场合，一个很简单的道理就是，你很难在垃圾桶里面发现宝藏。

4、 鞋子一定要保持干净。有些人真的是，看到鞋子就仿佛闻到了脚臭味～ 

5、平时要注意表情管理，有些人笑起来让人如沐春风，有些人笑起来还不如不笑。
石原里美的微笑真的好看！！！
我自己就会经常对着镜子练习。下面是我的练习方法：

6、敷完面膜之后记得洗掉，这时候皮肤能够吸收的营养物质都已经吸收完了，残留在脸上的精华如果不洗掉的话会堵塞毛孔，容易长痘。

7、一定要吃早餐！不吃早餐一天都会感觉饿，反而会吃的更多。而且对胃也不好。我有两个朋友就是经常周六、周日睡到10点然后就直接吃午饭了。他们的胃都不是很好，医院都去了几次了。

8、不要翘二郎腿，两腿互相挤压会影响腿部的塑形。而且对于男生来说，跷二郎腿会导致局部温度变高，会不利于“小蝌蚪”的发育。

9、别人说话的时候要看着对方的眼睛，东张西望会让别人觉得你缺乏最基本的尊重。如果觉得盯着眼睛很尴尬的话，也可以盯着他的鼻子或者是嘴巴，不要直勾勾的盯着。柔和一点。

10、脸上的痘痘不要去挤，我闺蜜就是喜欢挤额头上的痘痘，现在额头上留下了黑黑的痘印。真的不好看。
特别是三角区的痘痘一定不要挤，如果感染了可能会有生命危险。

11、微信尽量不发语音，当你看到一大段长长的语音时，相信你也是崩溃的。因为听语音要比看文字麻烦多了，如果用文字表达不清的话，最好是直接打电话。

12、嘴唇上的死皮不要直接用手去撕，这样会让唇纹越来越深。正确的方法应该是用热毛巾把死皮敷软，然后再用棉签轻轻把死皮搓掉。
我自己在包包里准备一支润唇膏，嘴巴干的时候就涂一涂，这样就不容易有死皮了。
这是我经常用的，还有防晒功能

13、密码不要设置太长，我的第一个qq号就是因为记不起密码而牺牲掉的。

14、没事的时候可以多上体重秤，体重秤上面的数字，就是你最好的减肥动力。“多瘦一斤，老公会不同”

15、女孩过了20岁就要开始眼部皮肤的初抗老了，不要等到眼周皮肤问题比较多了才去补救！
身为贫民窟女孩的表示，我的钱包经不起zao啊，贵妇眼霜还是偶尔奢侈用用，平时护理还是得买性价比高的
这款橄榄日记眼部精华液是一个神仙小众博主推荐的
法国医研品牌，主要成分是雅诗兰黛家智妍眼霜主打的乙酰基六肽-8，可以抗皱提拉眼周。兰蔻小黑瓶的欧洲七叶树提取物淡化黑眼圈，祛除眼袋，还自加了库拉索芦荟提取物保湿维稳。完全是平价中的战斗机！非常适合上班族、学生党和熬夜人群。
质地清爽好推开，油皮也无负担，味道是那种天然的植物香，使用半个月，亲测有效，已经加入无限回购系列啦，当代猪猪女孩就是要花最少的钱买最好用的产品！

16、出门的时候喷点香水，若有若无的香气是最好的。和人交流的时候香气真的会让人好感倍增。

17、早晚用巴氏刷牙法认真刷够3分钟，一般这个时候我会听歌，差不多就是一首歌的时间。记得每年要去洗一次牙，一口好牙能免去你很多烦恼。
18、睡觉的时候手机最好放在桌子上，这样可以避免自己晚手机到很晚。而且第二天早上还要起床关闹钟，可以防止你睡懒觉。

19、养成随身带纸的习惯，别人需要的时候你就能提供帮助。时间一长大家会觉得你很细心/绅士

20、记住别人的名字，特别是第一二次见面的时候，这会让别人觉得你是有在意他的。

21、不要吝啬自己的赞美，常把“你真棒、你真厉害”挂在嘴边的人，大家都会喜欢和他做朋友。

22、坐车的时候系好安全带，无论是坐前排还是后排都要系好安全带。这样可以大大降低风险。

23、卸妆一定要彻底，可能很多姐妹会忽视唇部的卸妆，以为白天的时候口红被蹭掉了就不需要卸妆了，这是错误的，残留的色素会让你的唇色变黑。
一定要用眼唇卸妆水认真卸妆 

24 作为精致的猪猪女孩，足部皮肤也是需要保养的，一双好看的jio是很给女生加分的！
康康俺滴jio

25、少吃外卖，有很多外卖其实是没有门面的，卫生条件非常差。能自己做菜的话最好是自己做着吃吧。

26、走在马路上的时候，要自觉走到车来的一边。特别是约会的时候，这样一个小细节会让她对你产生好感。

27、不在背后议论别人，特别是说别人的坏话。没有不透风的墙，很容易就会传到当事人的耳朵里。

28、玩手机的时候把手机举高一点点，而不是低头玩手机。

29、保持自信，走在路上要抬头挺胸。面对别人的目光不要闪躲。自信的人总是会给人一种非常可靠的感觉。

30、别人说话的时候不插嘴，被打断的感觉真的很不舒服。如果你有观点要说可以等对方说完再表达。

31、睡前喝一杯热牛奶，晚上会睡得更香～
码字不易，先写到这里吧！有时间会继续来更新的！！！笔芯`,grade:"A",commentCount:671,comments:[{author:"(匿名)",content:"第一点买个降噪耳机就好了",voteCount:359},{author:"(匿名)",content:"不自觉的把手机抬高了些[捂嘴]",voteCount:282},{author:"(匿名)",content:`睡前喝任何东西，只会让我有夜里起尿。。
[害羞]`,voteCount:213},{author:"(匿名)",content:"你的脚脚也太可爱了叭[可怜]",voteCount:189},{author:"(匿名)",content:"《不要在垃圾桶里捡男朋友》",voteCount:162},{author:"(匿名)",content:"看到好多地方推荐石原里美的笑容，但是我第一眼看到的时候就觉得她的笑不是不好看，而是给人一种特别的刻意",voteCount:113},{author:"(匿名)",content:"一个人连笑这种表达快乐的方式都要刻意去练习……我有一种说不上来的可悲的感觉 也许题主认为这也是一件让自己愉悦的事情吧",voteCount:111},{author:"(匿名)",content:"说到那个插嘴的，真是绝了，我一个同学超级爱插嘴，我刚开始和她一起玩的时候，在讲一件事，她就插嘴“噢我以前巴拉巴拉……”我话就直接被打断，然后等她说完，我已经不是很想再讲了，就想把那件事结尾讲了快快结束，毕竟讲事讲到一半我也难受，然后神奇的，她又插嘴 ，我当时真是……我@#&*… 对她的印象大打折扣，后面就直接说“能不能听我把话讲完”她才闭嘴，真的，感觉这种人没教养[小情绪]",voteCount:84},{author:"(匿名)",content:"那图画的太灵魂了",voteCount:22},{author:"(匿名)",content:"姐妹的微笑练习方法真的好绝！！我终于找到笑起来好看的肌肉发力方法了！！",voteCount:22}]},{id:"3328838461",question:"你成长的私人暗器是什么？",author:"伍月",voteUp:10994,excerpt:"1、 多看书，疯狂看书。历史、文学、社科、心理学、经济学、哲学等书籍都要有所涉猎。腹有诗书气自华，且经常看书的人思维更透彻。 2、 多看纪录片，少追综艺、电视剧。知道脱贫比脱单重要，把更多的时间和精力投入到提升自己上。 3、 多做少想，计划写出来，而不是留在脑里。在做的时候，就不要想太多，专注于当下的事情，完成了一个目标再去完成下一个目标，同时在内心也不要老是想着下一个目标，一个时间段，尽量只想一个事情…",content:`1、
多看书，疯狂看书。
历史、文学、社科、心理学、经济学、哲学等书籍都要有所涉猎。腹有诗书气自华，且经常看书的人思维更透彻。

2、
多看纪录片，少追综艺、电视剧。
知道脱贫比脱单重要，把更多的时间和精力投入到提升自己上。

3、
多做少想，计划写出来，而不是留在脑里。
在做的时候，就不要想太多，专注于当下的事情，完成了一个目标再去完成下一个目标，同时在内心也不要老是想着下一个目标，一个时间段，尽量只想一个事情，关注当下，这样做事的效率才是十分高的。

4、
关注自我内驱力，养成终身学习的习惯。
所谓内驱力，就是内心有强烈的动力驱使着你行动。一个人的内驱力足够强，就能战胜厌倦，不被其他兴趣裹挟，能面对自律过程中遇到的挫折，更不会轻易地放纵自己。
所以，想要坚持自律，我们要做的第一步就是激发内驱力，让内驱力足够强。蜕变，都是由内向外的。

5、
坚持锻炼。
锻炼身体的好处，不仅有利于身心健康，更重要的的是可以塑造大脑，我们都知道运动可以增加体内的血清素、去甲上腺素和多巴胺的水平，这些都是传递思维和情感的重要的神经递质。抑郁症与血清素缺乏有关，毒性压力会破坏大脑中的几十亿个神经细胞之间的联结，而运动可以释放一连串影响神经系统的化学物质和生长因子，而而这些物质能够扭转血清素的缺乏，并真正维持大脑的基本结构，大脑与我们的肌肉一样不用则废，而运动可以促进这些诶分支生长出许多的侧支，因为从根本上增强大脑的功能。
科特曼在4年时间里，通过对认知功能衰退极少的人进行研究，他发现了3个因素：教育、自我效能感和运动。运动显著特征是，它能提高学习效率，如果你身体健康，就能更有效地学习和工作。
6、
刻意做那些让自己害怕的事。
每完成一件，成长值提升5%。比如，害怕跟陌生人说话，就每天从打招呼开始做起；害怕当众说话，就每次开会主动发一次言。久而久之，你会发现这段日子是你进步最快的时候。

7、
节省自己的注意力。
“在任何事物中，90％都是垃圾。”不要把宝贵的时间花在90％的那部分无意义的事情上，而是把大量注意力放在自己身上，清除无效冗杂的社交圈、精简信息源、减少对无关事情的关注，保护自己有限的注意力（生产力）。

8、
持续禁欲。
放弃短期内能够让你上瘾的东西，比如打游戏、熬夜、刷剧，这些“奶头乐”只能够给你带来短期的快乐，并不能够让你成长，甚至会带来痛苦和无聊。而那些长期能够给你带来快乐和收益的事情，往往一开始是痛苦的、无聊的，比如读书、健身、早睡，但这些事情带来的快乐远比短期快乐反馈更多。

9、
要学会花钱买时间，在经济能力范围内，能够用钱解决的事，就不要浪费时间。

10、
《皮囊》里有一句话：“真正能给你撑腰的，是丰富的知识储备，足够的经济基础，持续的情绪稳定，可控的生活节奏，和那打不败的自己。”
找一个小众爱好，深入研究它，把它变成自己韧性的动力、兜底的第二专业，变成自己特殊性的一部分。
11、
不要等准备好了再行动。
《底层逻辑》里有一句话：完成比完美更重要！想做什么尽管去做，不要有完美主义的包袱，千万别等机会失去了，才后悔当初没抓住。

12、
事以密成，言以泄败。
事情没做成之前，不要到处嚷嚷，说什么不瘦十斤不换头像，默默地做成事情，才会让人刮目相看。

13、
主动吃苦而不是被动吃苦。
我说的吃苦不是对贫穷的忍耐程度，而是为了一个既定的目标长时间坚持付出，暂时克制享乐、克服懒惰。

14、
一定一定要学习理财知识，建立正确的消费观，并且开始存钱。
一个奢侈品没办法让你获得身份认同，对虚荣心的满足也是暂时的，越早开始理财，你就越能跑在同龄人的前头。
要知道“少花钱就能少打工”。

15、
当你把自我价值和工作挂钩时，你就把评价自己的权利，交给上位者。
但工作中的评价大多主观，且为利益既得者服务，这样的动机下的评价，自然不具备参考价值，反而会让你深陷评价标签的困苦中。
16、
用离职的心态打工，工作反而会顺畅很多。
该说的问题说，该推进的工作推进；不愿意的场合，不用强求自己表现。拒绝情绪浪费，干得了就干，干不了就散，不用质疑自己，不合适的不必强求。

17、
打工千万不能入戏太深。
打工的唯一目的是偷师出道，其本质就是拿钱办事。所以，不要恋战，你工作的目的不是为了养老，而是为了在获得资源并熟悉脉络之后，升职或跳槽。你上班只是为下一步晋升做准备，不要在同事和上级的赞赏中迷失了自我，只有浑浑噩噩的庸人才以摸鱼为荣。

18、
创业思维。
当你具备创业思维的时候，你才能与身边的打工仔拉开差距。职场当中的一些勾心斗角，对你来说毫无意义，你根本无需在意。只有这样，你就不会抱怨加班，抱怨吃亏，因为你从进入岗位开始，就是在为创业当老板铺路。

19、
活成 IP ，做自己的私有财产。
一个人在公司表现优异，薪水不错，但是过几年离开这个公司去另一家公司能得到同样高薪水吗？
很难，社会上大多数工作是跟年龄成反比的，年龄越大，越不值钱。
这意味着什么？
意味着你是企业的资产，根据年龄、精力待价而沽，企业破产或下行，你也要被优化，最终结果就是卷铺盖走人。
工作依托于公司，被动，公司破产你的生活也岌岌可危，但独立赚钱，你就可以不依托于任何企业，不受制于人。
独立赚钱意味着活成 ip ，你的赚钱方式不再通过出卖时间精力跟企业交换，你是直接“卖自己”没有中间商赚差价。

我在三年前就明白这个道理，所以去年从供职了7年的公司离职后，我就开始一边着手新工作，一边打造自己的个人IP，自媒体内容创业这条路就是我为自己兜底的第二职业，就算公司不行了，我也还有竞争力。看到这里，希望能得到你的一个赞！❤️
21、
永远的“Plan B”
越长越大就应该明白，任何人答应的事情都不作数，只有你自己能做主的事情，才算数。这个世界变化太快了，没有什么东西是可以一成不变的。上一秒还爱你的人，下一秒可能突然就不爱了；中午答应帮你带饭的人，可能中途有了其他的事情；说好顺路的人，红绿灯路口却又分道扬镳。
所以呀，你要永远有自己的 Plan B ，即使原计划没有照常进行 ，也不至于无可挽回。

21、
定期复盘。
学会复盘，是一个人成长最快的方式。所谓复盘，就是能反观过去，反思不足，总结经验。当一个人走过一段路后，能及时停下，不仅可以关注过去，找到前行的方向，还能展望未来，谋取发展先机，寻得属于自己的一套成功秘笈。

22、
当你把“这件事为什么发生在我身上”换成“这件事要教会／成就我什么”，你离成功就不远了。

23、
享受独处的时光，减少无效社交，学会独立思考，深度思考。叔本华：只有当一个人独处的时候，他才可以完全成为自己。

24、
不要把自己看的太重要。
被称赞，别上头，后面会跟着利用。领导说看好你，默认在画饼，做好自己的本分工作，别轻易被 pua 。所以，重要的不是你干了多少活，而是能不能给你带来积累（包括你的财富、专业经验、人脉资源、背景履历等等）。

25、
建议所有畏手畏脚的年轻人，反复阅读这句话：
所有人的看法和评价都是暂时的，只有自己的经历和成绩是伴随一生的。几乎所有的担忧和畏惧，都是来源于自己的想象，只有你真的去做了，才会发现有多快乐。
以上分享，希望对你有用。觉得不错的话，别忘记点个赞让更多人看到吧

Hi，我是@伍月，热爱文字与一切美好的事物，定期分享优质文案。
“在心里种花，人生才不会荒芜”。关注我，我们一起成为更好的自己！
图文源自网络，侵删`,grade:"A",commentCount:436,comments:[{author:"(匿名)",content:"学会复盘，是一个人成长最快的方式。所谓复盘，就是能反观过去，反思不足，总结经验。",voteCount:93},{author:"(匿名)",content:"当你把“这件事为什么发生在我身上”换成“这件事要教会／成就我什么”，你离成功就不远了。",voteCount:62},{author:"(匿名)",content:"看书和实践结合，我更建议去看人物传记，其实成功者的经历都差不多",voteCount:38},{author:"(匿名)",content:"真的 任何时候都要有“Plan B”[赞同]",voteCount:29},{author:"(匿名)",content:"主动吃苦而不是被动吃苦",voteCount:24},{author:"(匿名)",content:"真正的知识不会被印刷成书",voteCount:14},{author:"(匿名)",content:"创业思维，爱住[爱]",voteCount:7},{author:"(匿名)",content:"每一句都受益匪浅",voteCount:0},{author:"(匿名)",content:"8[赞同][赞同][赞同]",voteCount:0},{author:"(匿名)",content:"主动吃苦而不是被动吃苦[酷]",voteCount:0}]},{id:"88780149458",question:"如何看待柯洁和战鹰的矛盾？",author:"归心未铸",voteUp:10707,excerpt:"柯洁不想接受一个事实：战鹰在互联网上的地位是不低于他的。 当然，只是说“不低于”已经很保守了，准确来说是战鹰的地位高于他，他再怎么能在棋艺上吊打战鹰也没用。",content:`柯洁不想接受一个事实：战鹰在互联网上的地位是不低于他的。
当然，只是说“不低于”已经很保守了，准确来说是战鹰的地位高于他，他再怎么能在棋艺上吊打战鹰也没用。`,grade:"A",commentCount:576,comments:[{author:"(匿名)",content:"的确 关键是战鹰的互联网影响力不受战绩影响 [惊喜]",voteCount:3666},{author:"(匿名)",content:"这话说的不对 之前智运会五连胜 粉丝直呼塌房[惊喜]",voteCount:1241},{author:"(匿名)",content:`现在真的是
没有战鹰谁知道你柯洁啊
了[捂脸]
损失了柯洁，或者柯洁夺冠，大众心理基本就是哦，可惜，或者哦，牛逼
没了战鹰就看着吧`,voteCount:1084},{author:"(匿名)",content:"柯洁出名还是比战老早的，不过现在互联网地位战老确实甩他一条街",voteCount:891},{author:"(匿名)",content:"那是彭荃老师大脑都抡冒烟了c出来的，我怀疑不带战鹰彭老师一打二可能还轻松点[思考]",voteCount:501},{author:"(匿名)",content:"战鹰对围棋推广宣传招新比柯洁影响大，拿再多冠军对不关注围棋的人也就是扫一眼而已，但是战鹰确实靠自己影响叫更多人了关注了解围棋。",voteCount:349},{author:"(匿名)",content:"我感觉战鹰都已经混成B站一姐了，结果看了看她粉丝才180万，柯洁都240万了，这不科学",voteCount:284},{author:"(匿名)",content:"典型的柯式发言，拿成绩当作做人的指标",voteCount:188},{author:"(匿名)",content:"那还是不同的，捷豹出名的时候战老还不知道在哪",voteCount:182},{author:"(匿名)",content:"怎么不受[生气]她要是哪天世界冠军算塌房",voteCount:181}]},{id:"3332863375",question:"如何评价大冰这个人？",author:"卡斯特梅的雨季",voteUp:10615,excerpt:"读过大冰的书不亚于有案底 去过大冰的小屋约等于坐过牢",content:`读过大冰的书不亚于有案底
去过大冰的小屋约等于坐过牢`,grade:"A",commentCount:163,comments:[{author:"(匿名)",content:"坏了，我已经有案底了。幸好当初和同学去丽江旅游的时候他酒吧在休息，不然就更进一步了[大哭]",voteCount:1964},{author:"(匿名)",content:`[尴尬]你让初中时的我情何以堪
而且，看大冰书的那个是过去的我，不是现在的我！！！！！`,voteCount:726},{author:"(匿名)",content:"未成年案底封档[害羞]",voteCount:548},{author:"(匿名)",content:"没关系，知错能改，善莫大焉",voteCount:521},{author:"(匿名)",content:"完了，以前高中的时候不仅喜欢看他的书还摘抄下来写作文用，我是不是大罪",voteCount:301},{author:"(匿名)",content:"你这么做和当众吃翔并拍视频群发有什么区别?",voteCount:264},{author:"(匿名)",content:"好好改造，重新做人",voteCount:240},{author:"(匿名)",content:"即使是最矫情的年纪，我也觉得他的书名太浮夸了[捂脸]，所以我没读过",voteCount:208},{author:"(匿名)",content:"乖，摸摸头",voteCount:190},{author:"(匿名)",content:"见鬼，读了大冰的书连找工作都难！",voteCount:103}]},{id:"330886620",question:"你的父亲传授过你什么经验，让你受益终生？",author:"KnowYourself",voteUp:10513,excerpt:"1. 刚谈恋爱时，平日话不多的父亲和我说了10个字： 现在喜欢，将来也要包容。 2. 我爸告诉我女性受性侵伤害80-90%都是熟人作案，还有很高几率是男朋友。从此我明白要不要发生性行为这件事，必须要是我自己完全自主自愿的。任何人通过任何方式都不能逼迫我。 3. “找伴侣最最最重要的是品德，其次才是才华。” 4. 我父母告诉我，也许他们不是彼此的最爱，感情需要运气和智慧，但 更重要的是认真对待爱自己的人。要努力去找到爱的…",content:`1. 刚谈恋爱时，平日话不多的父亲和我说了10个字：现在喜欢，将来也要包容。

2. 我爸告诉我女性受性侵伤害80-90%都是熟人作案，还有很高几率是男朋友。从此我明白要不要发生性行为这件事，必须要是我自己完全自主自愿的。任何人通过任何方式都不能逼迫我。

3. “找伴侣最最最重要的是品德，其次才是才华。”

4. 我父母告诉我，也许他们不是彼此的最爱，感情需要运气和智慧，但更重要的是认真对待爱自己的人。要努力去找到爱的人，不要辜负别人的感情，如果不爱就要拒绝对方。他们教会我善待别人。

5. 人一辈子很短，戒掉虚荣和虚伪。

6. 初中时有次脚崴了，有个关系很好的同学天天下自习用自行车载我送我回家。有天我上学前拿了一堆零食饮料要带走，我爸问我干嘛，我说带给那个同学感谢她。我爸说：你可以带，但是你要记住，友情不是用这些就能回报。

7. 爸爸跟我讲了二十二年的一句话“人必自爱之，然后人爱之”。

8. 丢的东西不找，跑的人不追。来自阿爹的忠告。

9.爸爸告诉我的一个受用一生的道理：人活着不只是为了享乐挣钱也不只是为了消费，人生应该有更远大的理想与追求，这些事能支持你在困境中不被压垮，反观享乐主义虽然无过，却不能给人以坚定的信念，无法成为永恒的努力方向。

10.最让我刻骨铭心的忠告是:“任何时候，不要把爱情当做救命稻草。”

11.我爸爸和我说，做一件事情、一个选择的时候，不用以向任何人证明自己为目的。

12.人生第一次穿裙子，一向严厉的爸爸突然温柔的坐在我旁边，轻声告诉我穿裙子该怎么坐着。爸爸突然离世，我竟再也记不得他对我的种种教诲，唯这一件。

* 以上故事来自KY粉丝小伙伴们

不知道我们收到的这些来自父亲们的智慧金句，哪一条能够戳中你，也希望你能从这些真诚的忠告中获得力量。
以上。
想更有针对性地解决心理问题，请关注KY心理课：【KnowYourself】KnowYourself,宇宙中最酷的泛心理学社区，人人都能看懂，但只有一部分人才会喜欢。-跟谁学官网
点击查看过往高赞回答：
年轻人千万别碰哪些东西？
有哪些看似很傻，实则聪明的行为？
恋爱中不合适就分手是什么心态？
为什么一部分女性不喜欢生孩子？
有哪些细微但是高效有用的习惯？
点击查看相关微信文章：
“人一辈子很短，戒掉虚荣和虚伪”｜KY粉丝留言精选：爸妈给过你的最好忠告是什么？`,grade:"A",commentCount:370,comments:[{author:"(匿名)",content:`小时候。我爸在我考不好的时候嘲笑我说，那你就考的好了，向我们证明你自己咯。这话是很常见很正常吧。
真是搞笑，我考得好是我自己的事情，凭什么向别人证明自己。
我们做任何事情都只是我们自己的事情，我们的价值是由我们自己来决定，如果自己做什么，全部都取决于别人的肯定或者否定，这种状态实在太危险了。`,voteCount:303},{author:"(匿名)",content:"想认识你爸爸",voteCount:53},{author:"(匿名)",content:"我爸踏马的啥也不告诉我就叫我年纪不小了赶快结婚",voteCount:48},{author:"(匿名)",content:"（我能不能转到朋友圈？）",voteCount:36},{author:"(匿名)",content:"二楼是我的",voteCount:32},{author:"(匿名)",content:"你爸好有文化",voteCount:21},{author:"(匿名)",content:"并腿坐，不要短裙等等。不要露出为中心。",voteCount:18},{author:"(匿名)",content:"很有道理，第五条好评！现实有这种女孩我立马娶回家！",voteCount:15},{author:"(匿名)",content:"看这个问题才顿悟父爱正因严厉而伟大",voteCount:14},{author:"(匿名)",content:"很有道理",voteCount:10}]},{id:"69257415499",question:"为什么现在很多年轻人不愿意听过来人的建议？",author:"红护",voteUp:10483,excerpt:"我们这里人见面打招呼 开头第一句都是 “你吃了吗？” 这并不代表我有多么关注你的饮食状态，这只是一个问候，一个礼貌，一个没话找话避免尴尬的由头。 同样有礼貌的人，即使真的一天饿了三顿，也会说吃了吃了。 回答结束后，大家彼此微笑一下，颔首致意，这个寒暄也就过去了，该吃饭回家吃饭，该消食出门消食，各走各家，各找各妈。 同样的，绝大部分八竿子打不着的长辈甚至八竿子能打着的长辈，那些所谓过来人给你的“建议”，…",content:`我们这里人见面打招呼
开头第一句都是
“你吃了吗？”
这并不代表我有多么关注你的饮食状态，这只是一个问候，一个礼貌，一个没话找话避免尴尬的由头。
同样有礼貌的人，即使真的一天饿了三顿，也会说吃了吃了。
回答结束后，大家彼此微笑一下，颔首致意，这个寒暄也就过去了，该吃饭回家吃饭，该消食出门消食，各走各家，各找各妈。
同样的，绝大部分八竿子打不着的长辈甚至八竿子能打着的长辈，那些所谓过来人给你的“建议”，实际上也只是一种寒暄。
“娃毕业了？哎呀那要好好找个工作呢！考个公吧，考个研吧，买个房吧，进个好单位吧，谈个对象吧，早点结婚吧，抓紧生娃吧，买个保险吧，回来安排吧，找人走动一下吧……”
这种话语，这种言论，这种所谓的建议
归根结底只是这个人，跟你的双亲或者你拉近关系避免尴尬的工具。
他们张口就来，信马由缰，高谈阔论，滔滔不绝，从无实地调研，更无亲身经历，也不懂什么社会变革，环境变迁，更对你人生的具体经历及思想认知一无所知。
他们可能只是从别人那里听了一两耳朵的议论，从自身平庸的一生中发散了那么一两次幻想，甚至于只是刷短视频的时候刷了两句鸡汤，就敢把这种虚无缥缈的认知直接以定义你人生的方式告诉你，归根结底只是因为你的感受与他没话找不出话时的尴尬相比不值一提罢了。
你应该做的，就是像别人问你吃了没时一样，回一句，嗯，嗯，对，好，没问题……就行了，大家互相给个面子，礼貌一下，这事情就过去了，别上心，别认真，别太当回事。
认真了，这话就聊不下去了。
但凡你出于对自己人生负责的态度，反问一句建议人，怎么做？如何做？做成了怎么分红？失败了谁来兜底？按你说的走下去没成功怎么办？未来环境变化了怎么办？具体实施细则是什么？具体指导规划是什么？细分到每一步该怎么做？有无成功案例参考……
相信我，你立刻会变成狗咬吕洞宾不识好人心，小小年纪屁本事没有找理由一个顶俩的懒狗窝囊废。
最后闹得大家都不好看。
什么样的建议是好建议？
兜底性的建议，攻略性的建议，细节性的建议。
“你按我说的来，不成功养你一辈子。”
这是兜底性的，绝大部分人这辈子是听不到一句的。
“你按我说的来，第一步怎样怎样，第二步怎样怎样，第三步怎样怎样，中间环节怎样怎样，哪个人我已经打点好了，哪个项目我已经弄明确了，你只要这么去做能够产生什么样的影响，不这么做会产生什么危害”……
这是攻略性的，下层人这辈子是听不到一句的。
“我分析了这两年的环境，预测了未来的变化，根据你的实际情况，在尊重你理想和性格的基础上做出了几个规划，我们来讨论一下哪个更有可能？”
这是细节性的，上一代认知普通的人，这辈子是听不到一句的。
综上所述，绝大部分人这辈子都听不到一句有用的建议，哪怕是你的双亲，你的父母，能给你的建议无非也就是考个学吧，买个房吧，结个婚吧，生个娃吧，搞个工作吧……至于这其中钱怎么来，恋爱怎么谈，工作怎么发展，环境怎么适应，怎样避免沉没成本，怎么得到原始积累，未来风险怎样应对……
对不起，没有，你也不能问，你但凡多问一句，得到的回应只能是:“就你这么多困难？人家都怎么过来的？”
所以你能听什么呢？礼貌，尊重，嗯嗯啊啊，就行了。自古话不投机半句多，你的人生是你自己的，高兴也好悲伤也罢，于他人只是故事与谈资，他给你建议，你成功了，那是他的高瞻远瞩，逢人就说当初他就知道你是个好苗子；你失败了，那不是他的责任，他会叹息知人知面不知心谁知道你是这么个吊样。
所以，不要管他人的意见。自古以来，能拉过刘亚楼让他记住用哪个纵队去堵住哪条道路，哪个师长去围歼哪个军团的统帅从来都是少数，同一个国家，同一个时代，拿手指头都能划拉清楚，你我大概率是碰不到的。
碰得到的，都是如九头虫一般，张口就让奔波儿灞去把唐僧师徒抓来。至于孙悟空怎么战胜，猪八戒怎么对付，他们从来就没有琢磨过。
他们从来都没有想过一个问题。
我若是打得过孙悟空干的挺猪八戒，我需要你给我建议吗？`,grade:"A",commentCount:409,comments:[{author:"(匿名)",content:`是的，诚哉斯言。
包括父母，催婚、催买房、催要孩子等等所谓“建议”或者“规劝”实际上都是“闲得没话说了”，在他们的认知范围内所能扯出来的最没滋没味的淡话了。
路大多数的上一代“底层”，莫说有建设性的成功的经验和建议了，实际上连“失败”的经验都不具备。
他们只是浑浑噩噩混了一辈子，眼睛所能看到的，就只有那浅浅的一圈，任何主观能动性都不曾用出来过，从生到死，默默无闻，他们的规劝，实际上只不过是一种畏惧，对不确定性骨子里的恐慌和畏惧，迫不及待的想把身边人拉入到和他们一样沉默的漩涡里头去。`,voteCount:766},{author:"(匿名)",content:`已点赞收藏。讲出了我的心里话。

对方能明白自己讲的东西。是客套寒暄话的。已经算通透的人。

怕就怕什么？

他讲一大堆没营养的大道理。然后认为自己指点了你。让你回报感激他。

说白了。这是一次无本买卖。“我为你好。给你出了主意。你得感激我。至于用什么回报我。你看着办。”

这种交流真的挺难受的。。嗯。你单方面的难受。因为对你毫无营养。备受折磨。

对方呢？享受了一把高高在上。还试图从你这里拿走点什么。

哎。什么玩意`,voteCount:649},{author:"(匿名)",content:`作为个成年人，应该分得清寒暄、吹牛活跃气氛和正经讨论。
如果你要来真的，就拉着他找个人少的地方，请他坐下来认真聊聊。这个时候绝大部分人就不敢随便说了。`,voteCount:246},{author:"(匿名)",content:"图图来了[doge]查看图片",voteCount:209},{author:"(匿名)",content:"你拿两条红塔山去加强防线[惊喜]",voteCount:86},{author:"(匿名)",content:"问题来了，塔山怎么布防呢？[小情绪]",voteCount:32},{author:"(匿名)",content:"哈哈哈，护护，我天天被这种“敦敦教诲”搞得不胜其烦，我要转发进我的大家庭群里[大笑]",voteCount:12},{author:"(匿名)",content:"红老哥你吃了没？",voteCount:2},{author:"(匿名)",content:"红红的评论区由我来守护。[doge]",voteCount:1},{author:"(匿名)",content:"我们这见面打招呼也是“你吃了吗？”",voteCount:0}]},{id:"1814081802",question:"你有什么建议给女孩子吗?",author:"叶枳枳",voteUp:10460,excerpt:"1.肩膀、手臂、脚腕，这三个位置一定不要让男生碰，开玩笑也不行！ 2.不要用手抠鼻子，不然鼻翼变宽千万不要用手抠鼻子，就算是小拇指也不行！！难道你想像如花一样？ [图片] 刚开始还是小拇指抠，后来可以容纳下大拇指了...鼻孔被撑大是迟早的事情，直接用手扣也会对鼻粘膜有损伤，易出血，会有呼吸道疾病（鼻炎患者）的感染风险 [图片] 3.美丽芭蕾3天就可以纠正你的弯腰驼背，不信你试试鸭！不要一分钱的运动让你看到小锁骨你愿意吗？ 我…",content:`1.肩膀、手臂、脚腕，这三个位置一定不要让男生碰，开玩笑也不行！
2.不要用手抠鼻子，不然鼻翼变宽
千万不要用手抠鼻子，就算是小拇指也不行！！难道你想像如花一样？

刚开始还是小拇指抠，后来可以容纳下大拇指了....鼻孔被撑大是迟早的事情，直接用手扣也会对鼻粘膜有损伤，易出血，会有呼吸道疾病（鼻炎患者）的感染风险

3.美丽芭蕾3天就可以纠正你的弯腰驼背，不信你试试鸭！
不要一分钱的运动让你看到小锁骨你愿意吗？
我是一个做运动非常需要短期效益来续航的人，试过各大网站收藏多的练锁骨法子，但最有效的宝座一定是这个爱而不得的女人—美丽芭蕾
十五分钟的视频，不用跳不用跑，三天就见效！！简直绝了

4.下巴一定要收住，不仅改善体态，还可以预防颈椎变形
收住下巴可不仅仅是为了好看的体态哦~往后收下巴可以控制头前伸，下颌前伸，不然颈椎会变形哒~~
5.30min看看自己坐姿正确没？肩膀打开没？跷二郎腿没？此为“每日三省”
6.饭后三分钟用漱口水，不然牙缝的韭菜会把男神吓跑滴~~
漱口水是一口大白牙的必备利器呀~~为了你们有一口大白牙也是操碎了心呐

7.洗面奶不要直接上脸，会容易形成过敏肌，说真的！！！
洗面奶是不能直接上脸搓泡泡的，正确的办法是先在手心里打起泡泡后在清洁面部

8.刷牙一定一定要刷舌苔，不然相亲对象一见面就凉凉
先来看看你的舌苔是否健康？

舌头是我们刷牙非常容易忽略的部分，但也是口腔最能味道的部位，口臭除了肠胃的原因就是口腔的问题了
除了早晚正常刷牙之外，也要注意舌苔的部分了！！
9.修剪头发是最快可以改变发质的法子！！什么头发毛躁、干枯、分叉都去见鬼吧
在大学我也很喜欢烫染头发，发质变差后tony老师说一个月剪一次头发，半年就能解决掉干枯毛躁的小问题

10.不要每天都用蒸脸仪，会容易长细纹褶子，变成70岁老太滴~
什么东西都会分利弊两方面！！不要想着每天用蒸脸仪，用多了反而让皮肤缺少水分
每次蒸脸时间不能超过十分钟，中性和油性皮肤一周两到三次就可以了，干性皮肤看皮肤的状态~还不如天天使用身体乳呢~~
11.画上卧蚕，可以让你和颖宝一样有亲和力
内双无中生有的卧蚕术简直是永远滴神！！王霏霏同款粉色卧蚕太好看了啊啊啊，画了卧蚕巨显年轻，放大双眼两倍都是轻松拿捏的

12.第二天没洗头的妹子可以用散粉，不仅能控油，还能让头发蓬松
哪有天天都洗头的人，在哪里我瞧瞧！！
第二天头发会油，早起做定妆这一步的时候顺便扑点散粉在头发上，去油的一把手！！然后用梳子疏散头发，瞬间蓬松三倍~~

13.要是我两年前就重视眼部的保养，现在追求者肯定排到纽约了！！！
姐妹们，眼霜是预防黑眼圈的，都给我提早用起来啊~
这款去黑眼圈的眼霜真真是我的小众宝藏，功效一绝，当之无愧我的心头爱了，直接拿去用，或者我寄给你先试试效果！！！
和兰蔻小黑瓶一样主打的欧洲七叶树提取物！！另外还加入了库拉索芦荟以及乙酰基六肽-8，淡化黑眼圈效果绝绝子！！不到一个月绝对可以看得到效果！！！
姐妹们，duck不必几百上千的眼霜，这款一百多的价格，性价比真的是奇高，盲入都没问题啊啊啊！！！
14.圆圆尖尖的指甲形状，会显得手指纤细修长两倍~~

15.坚持做运动，特别是提肛运动！！总之就很棒棒~~
16.吹头发的时候反向吹，可以让你发量暴涨200%
比如你想要右边的头发更蓬松一点，就把头发侧分到左边，用水风机反向吹发根，最后翻回右边就可以了
17.好看的背包包姿势可以让你魅力提升60%~

两个标准的背包姿势分享给你啦~记得给我点个小心心辣
包包里最好不要放太多东西，随身物品太多显得很杂乱~~
最重要的是！！东西太重单肩背包会导致高低肩的！！
18.练就wink笑眼，再高冷的男神也会心痒痒~~
给大家分解一下wink的教程，用手用力撑开一只眼睛，另外一只眼睛睁闭，多重复几次，形成肌肉记忆~~用嘴角带动脸部的肌肉，再眨一边眼睛，就算和情敌同框都能扳回一局啦
19.美白牙贴的美白效果比换假牙都更直接有效！！
美白牙贴中含有过氧化氢，对牙齿美白有一定作用，使用两三天就马上见效！！
不过牙齿敏感的人不推荐使用哦
20.防晒做好补涂的措施，可以让你加速变白
都清楚防晒的重要性，但是很多人会忽略防晒补涂，上下班通勤的包包里也需要备一只防晒霜来补涂的，防晒霜一般两三个小时就没效果了
补涂办法：
防晒霜点涂在脸颊两处，不要直接抹开！不要直接抹开！！！用你指腹轻轻拍均匀，连底妆都不会蹭掉的补涂办法！！！！
21.一周2次去角质，可以消除鸡皮变更白
去角质就是去掉皮肤的老肤质，不去角质皮肤就会黄黄的
物理性的去角质适合用在身体的部位，比如我们常用的磨砂膏啦，是用植物或矿物质来摩擦去掉老角质
化学性的去角质就是脸上的泥膜啦~比较适合敏感肌啦~

溜啦溜啦~小仙女们早日脱单！！`,grade:"A",commentCount:653,comments:[{author:"(匿名)",content:"想多了吧 能让他碰基本上是信任的人吧。这个顶多就是试探而已，也只有关系好试图更进一步的人才会这样接触[撇嘴]",voteCount:733},{author:"(匿名)",content:"要是我想碰男生的手腕子，胳膊肘子，肩膀头子那咋办呢？",voteCount:452},{author:"(匿名)",content:"我现在都直接用大拇指哈哈哈[捂脸]",voteCount:319},{author:"(匿名)",content:"我当时就是这样一步一步试探我女朋友的 不过后来他说他都知道 优秀的猎人都是以猎物的身份出现的[笑哭]",voteCount:297},{author:"(匿名)",content:"肩膀、手臂、脚腕，这三个位置一定不要让男生碰…其它地方就能随便碰了对吧，懂了✓",voteCount:243},{author:"(匿名)",content:'这种"一定"的句式，用脚趾头想想都知道有有多离谱。比如人家消防员救你出火海，你说"哎呀不行不行，营销号说了，我手臂一定不能男生摸，你换个女消防员来救我吧"。',voteCount:197},{author:"(匿名)",content:"登门槛效应，这一次摸了你的肩，说明你不排斥，不拒绝，就有可能搂你的肩膀，再下次就有可能搂你的腰。就这个道理",voteCount:187},{author:"(匿名)",content:"可是棉签不一定总是带啊[飙泪笑]而且挖的到吗",voteCount:174},{author:"(匿名)",content:"因为所有这种回答，在列表的时候你都只能看见第一条，所以特意选择这种表意不明甚至有争议的放在第一条吸引你点进来，骗点击。如果你还细细思量其合理性，甚至为了让其合理而编撰各种理由让自己相信你就输了。",voteCount:167},{author:"(匿名)",content:"这个太对了。之前的老板，说话的时候就喜欢拍我肩膀，每次我都躲（有话说话拍我肩膀干嘛，就很反感）。即便我每次都躲依旧改不了他拍我肩膀的习惯，还明里暗里的说我心里肮脏。最过分是一次就是先拍了我肩膀，然后手在我肚子几毫米的地方划拉，然后移到胸口划拉，接着拍了拍脑袋，最后拍了下辈（内句话大概意思，我这个怎么着，肚子里怎么想的，心里怎么想的，脑子怎么想的，自己好好想想吧。）太恶心了，直接开骂",voteCount:161}]},{id:"90449920070",question:"如何看待柯洁和战鹰的矛盾？",author:"名字忘记了",voteUp:10440,excerpt:"柯洁没明白一个道理 在网友眼里 他对战鹰的优势，仅限于棋盘以内",content:`柯洁没明白一个道理
在网友眼里
他对战鹰的优势，仅限于棋盘以内`,grade:"A",commentCount:197,comments:[{author:"(匿名)",content:"他对于战鹰的优势仅限于棋艺和身高",voteCount:1690},{author:"(匿名)",content:`大家愿意给他刀.是希望他砍韩国.。
他回来第一时间居然是砍队友.。
他要是挑那个领导砍一砍.也还说得过去.。
毕竟当时领导确实不给力.。
可人家战鹰一直在全力支持他.给他做后勤诶.。`,voteCount:756},{author:"(匿名)",content:"固然搞擦边另有其人，但是单论长相战鹰都远胜柯洁了",voteCount:504},{author:"(匿名)",content:"那看什么[微笑] 查看图片",voteCount:306},{author:"(匿名)",content:"明显在玩梗也是硬较真上了[大笑]",voteCount:241},{author:"(匿名)",content:"智商高就不会利益得失都算不明白[飙泪笑]",voteCount:217},{author:"(匿名)",content:"实际没几个人看棋",voteCount:153},{author:"(匿名)",content:"虎扑女神懂不懂？这可是和贾静雯，高圆圆，邱淑贞才有的称号[惊喜]",voteCount:151},{author:"(匿名)",content:"还有BMI",voteCount:8},{author:"(匿名)",content:"还有智商",voteCount:2}]},{id:"2764417186",question:"个人每日如何深度复盘？",author:"ProcessOn",voteUp:10426,excerpt:"秒杀同龄人的顶级复盘能力，坚持1年，领先5年！ 不得不感慨时间过得真快，在今年过去的日子里，你有没有朝着你的目标努力呢？ 有目标的人生会让你走的更坚定，但学会了有效复盘的方法，则可以让你少走弯路，更快更坚定的接近你的目标。 本周为大家分享比努力更能决定人生的一种能力——复盘。相信这是一个互联网小伙伴常挂在嘴边的一个词，但是你真的有做到了有效复盘吗？我们一起来验证和探讨一下~一、什么是复盘？ 复盘一词起…",content:`秒杀同龄人的顶级复盘能力，坚持1年，领先5年！

不得不感慨时间过得真快，在今年过去的日子里，你有没有朝着你的目标努力呢？

有目标的人生会让你走的更坚定，但学会了有效复盘的方法，则可以让你少走弯路，更快更坚定的接近你的目标。

本周为大家分享比努力更能决定人生的一种能力——复盘。相信这是一个互联网小伙伴常挂在嘴边的一个词，但是你真的有做到了有效复盘吗？我们一起来验证和探讨一下~
一、什么是复盘？

复盘一词起源于围棋术语，本意是对弈者下完一盘棋之后，重新把过程摆一遍，看哪些地方下得好，哪些不好，总结经验。

在头脑中把过去做的事情“过”一遍，通过对过去的思维和行为进行回顾、反思和探究，找出原因，总结规律，指导我们解决问题，提升能力。

复盘最重要的，在于保持一种“成长思维”，复盘的核心价值在于“巩固成功与改正错误”，核心目的是让人从行动中学到经验教训，并将其付诸后续的改进。

为什么要复盘呢？三个原因：

1、知其然与所以然。

2、避免犯同样的错误。

3、总结经验，提升能力，形成方法论。

二、如何复盘？
4个好用的方法！首先，复盘要保持有效的心态，否则有可能浪费时间还收效甚微。接下来是有效复盘和无效复盘的心态对比，希望能帮助大家树立正确的复盘心态。

有效复盘 流程图模板_ProcessOn思维导图、流程图

接下来分享4种公认的好用又高效的复盘方法，大家可以多尝试各种复盘方法，直到找到适合的自己的那一种。

1、KISS复盘法

KISS是一种科学的项目复盘方法，用于促进下一次活动更好的展开，常被应用于活动策划落地执行或者项目执行结束后总结使用。

适用场景：活动结束后、项目结束后、日常生活工作中。

K（keep）——需要保持的：哪些做得好，以后继续保持。
I（Improve）——需要改进的：哪些不理想，后续需要改进。

S（Stop）——需要停止的：哪些不利行为，需要停止。

S（Start）——需要开始的——哪些东西缺失，需要开始执行。
点击查看模板高清原图

2、PDCA复盘法

PDCA戴明环模型是一种持续改进工具，目前被应用到很多领域，它可以帮助你管理项目，甚至管理人生，让你紧盯目标，不断努力执行的同时，不断检查、复盘、修正，直至成功。

PDCA是管理者的基础工具，国内外大厂如百度、华为、小米等都在用，其实个人和企业、普通员工和管理者都可以用来提升工作效率。
PDCA循环的8个步骤 流程图模板_ProcessOn思维导图、流程图

P（Plan）：计划。确定方针和目标，确定活动计划；
D（Do）：执行。实地去做，实现计划中的内容；
C（Check）：检查。总结执行计划的结果，注意效果，找出问题；
A（Action）：行动。对总结检查的结果进行处理，成功的经验加以肯定并适当推广、标准化；失败的教训加以总结，以免重现，未解决的问题放到下一个PDCA循环。

3、GRAI复盘法

GRAI复盘法是一个围绕目标，注重结果和目标之间的偏差，从中分析原因并总结规律的复盘方法。

具体来说，可以按照这个顺序来展开：

G（Goal）回顾目标：当初的目的或期望是什么。
R（Result）评估结果：和原定目标相比有哪些亮点和不足。
A（Analysis）分析原因：事情成功和失败的根本原因，包括主观和客观两方面。
I（Insight）总结规律：通过以上的分析找到实物更有效、更符合本质规律的做法。

GRAI复盘法 流程图模板_ProcessOn思维导图、流程图

4、年月周日复盘法

年月周日复盘法，顾名思义就是每年、每月、每周、每日都定期复盘，很适合用于个人复盘，总结自己的问题和成长。

年月周日复盘法 思维导图模板_ProcessOn思维导图、流程图

三、复盘原则和误区

复盘很有效，但是日常大家在复盘的时候，需要遵循一些原则和避免一些误区才能从现在的迷雾中走出，摆脱过去的思维惯性。

古往今来有大成就的人，几乎都是复盘高手。所以不会复盘，永远只能原地打转。

接下来分享几点复盘规则和需要避免的误区：
点击查看模板高清原图

日常工作中，很多容易忽略的地方其实会严重影响我们的复盘成果，比如必须等到活动、项目完整结束之后才去复盘，过程当中如果遇到问题不及时记录、思考和寻找解决方案，最后可能会因为时间过去太久记不清或者忘记了问题影响复盘效果。

还有一个误区——分析过于笼统，比如执行中不够仔细，太粗心。仔细的标准是什么？这都需要事先定好具体的衡量标准，在复盘中通过深入思考，才能找到问题的关键，避免复盘流于表面，做太多无用功。

四、复盘模板&案例
复盘的方法已经分享给大家，只看不实操并不能真正提高自己。为大家准备了复盘模板&案例，大家一起操作起来吧~也欢迎大家有好的复盘模板和案例，积极发布到模板库让更多的人看到和受益，同时让你的经验和知识得到传播。

1. KISS复盘模板
点击查看模板高清原图

2. 每日/周复盘模板

每日/周复盘模板 流程图模板_ProcessOn思维导图、流程图
3. 工作复盘模板
XXX项目/工作复盘模板 流程图模板_ProcessOn思维导图、流程图

4. 视频号直播复盘数据拆分

点击查看高清模板原图

5. 项目复盘画布（标准模板）

点击查看模板高清原图
不少在职场上风生水起人都掌握了复盘的能力，他们即是复盘的重度用户，也是受益者，复盘不仅能磨炼思维，提升个人能力，更是让他人看见你的绝佳能力，想要在众多竞争者中脱颖而出，从职场透明人变成让领导、老板看的见的人，你需要掌握复盘能力！`,grade:"A",commentCount:207,comments:[{author:"(匿名)",content:"能反思就不错了，太高端，不明觉厉！",voteCount:33},{author:"(匿名)",content:"？问题是如何深度复盘，这个很叩题目了",voteCount:18},{author:"(匿名)",content:"能坚持用一个方法就不错了。",voteCount:15},{author:"(匿名)",content:"要知我是我",voteCount:9},{author:"(匿名)",content:`一行一行读下去，不要先看结果。

发件人告诉我...

测试后10分钟以内他的愿望就实现了。（所以我翻译成中文，在这里留言，原本是韩文的 *翻译技术很烂*）

大约需要1-2分钟，但感觉是值得的。

试试看吧

首先，准备好纸和笔..

选择姓名时，请选择你确实认识的人的实名。

请写出凭直觉，瞬间出现在脑海里的答案。

一次阅读一行..

如果你先看了答案就没什么意思了。

1。首先从上到下（垂直），写出从1到10的数字

2。在数字1和2的旁边各写出一个数字（从1到10之间的一位数）

3。其次在数字3和7的旁边各写出一名异性的名字。

4。在数字4，5，6的旁边各写出一个名字..朋友，家人都可以....

（你不认真回答，等于浪费你自己的时间）

5。 在数字8，9，10的旁边各写出一个歌曲的题目 ..

（凭第一感觉）

6。最后，许一个愿望ba...

最近最希望发生的愿望，奇迹什么的...

许了愿望让我们看看这个游戏的结果吧。

首先在数字3旁边的名字，是你爱的人。

在数字7旁写下的是你喜欢，但不能实现的爱情。

在数字4旁边的人是最关心你的人。

在数字5旁边的人是给你带来好运的人。

在数字6旁边的人是对你不利的人。

在数字8写下的歌曲是对数字3写下的人最适合的歌曲。

在数字9写下的歌曲是对数字7写下的人最适合的歌曲。

在数字10写下的歌曲是歌曲是，最适合表达你的想法的歌曲。

最后，你把这片文章转载到其他留言板上，和数字2旁边写下的数字相应的篇数，

你的愿望就会成真`,voteCount:8},{author:"(匿名)",content:"谢谢作者提供这么好的总结和复盘内容，辛苦了",voteCount:7},{author:"(匿名)",content:"很棒",voteCount:5},{author:"(匿名)",content:"自知者明",voteCount:2},{author:"(匿名)",content:"很优秀，有心了",voteCount:1},{author:"(匿名)",content:"整理地相当详细明了，择其一种适合自己的",voteCount:0}]},{id:"632981745",question:"什么是费曼技巧？",author:"Xmind思维导图",voteUp:10420,excerpt:"费曼技巧是一种 「以教为学」的学习方式，能够帮助你提高知识的吸收效率，真正理解并学会运用知识。这个学习方法其实很简单，就是验证你是否真正掌握一个知识，看你能否用直白浅显的语言把复杂深奥的问题和知识讲清楚。 [图片] 具体应用方式如下： 1、向不熟悉某议题的人解释该议题，用他们能理解的方式及最简单的语言向他们解释； 2、发现自己不能理解的地方或不能简单解释某议题的地方并记录； 3、回头查看资讯来源并研读自己薄弱的地…",content:`费曼技巧是一种「以教为学」的学习方式，能够帮助你提高知识的吸收效率，真正理解并学会运用知识。这个学习方法其实很简单，就是验证你是否真正掌握一个知识，看你能否用直白浅显的语言把复杂深奥的问题和知识讲清楚。
具体应用方式如下：
1、向不熟悉某议题的人解释该议题，用他们能理解的方式及最简单的语言向他们解释；
2、发现自己不能理解的地方或不能简单解释某议题的地方并记录；
3、回头查看资讯来源并研读自己薄弱的地方直到能用简单的语言来解释；
4、重复前面三项步骤直到能够专精这个议题。整理自 @开眼科技精选 什么是费曼技巧？回答中的讲解视频，完整视频的可以戳左边 

如果你能运用好费曼技巧，那么你就可以做到：
真正地了解任何你学习的事物
做出深思熟虑并有智慧的决定
熟练地将知识应用到实际问题
为什么费曼技巧如此高效？
因为要做到能将复杂的问题用简单的语言说清楚，必须对知识有深刻的理解和应用。这需要你做到：
// 拆分和压缩知识 //
费曼技巧具有拆分知识作用的观点引自@YJango《学习观》的11:19处。
拆分问题：当你想了解一个复杂的知识点时，需要把它分而化之，切成小知识块，再逐个对付。比如《金字塔原理》这本书，为了让你理解并运用这个思维方式，作者从表达的逻辑、思考的逻辑、解决问题的逻辑、演示的逻辑这四个方面来进行拆分并阐述。具体细节可以看看下面这张用XMind制作的思维导图。
压缩知识：一本书很厚，里面的信息容量很大，我们无法记住所有的内容。但聪明的人会把书本呈现的信息进行压缩，提炼出规律和知识，来达到和原有的知识体系产生联系。压缩知识的过程，也是理解和内化的过程。// 理解和简化知识 //
为什么很多人不会运用知识，无法做到举一反三？很大原因是因为你没有真正地去理解知识。要理解一个复杂问题，你需要调用自身的知识储备。
比如要理解「沉没成本」这个概念，你需要了解一点经济学和商业知识背景。这就要求你“回头查看资讯来源并研读自己弱点的地方”。
当你真正理解这个概念后，要如何把这个知识传授给没有相关知识背景的人？举例子，简化知识，把复杂的知识用简单的例子来进行说明。
举例子是一个能增进专精程度并学习同理的好方法，这促使你用对方的程度来理解并透过与他们熟悉的议题有关的方式给予他们新的知识。你在理解和简化知识的过程中会不知不觉用到类比、举例、概括、对比等深度学习的方法。
// 理解和复述知识 //
「如果你不能简单地解释一件事，那你就还没有弄懂它。」很多时候我们自以为已经掌握了某个知识，但其实并没有。如果你不能讲清楚，也就说明你没有掌握。这时候你就需要更深度地了解知识。理解和复述是相互促进的作用，费曼技巧就是在不断强化这个过程。`,grade:"A",commentCount:175,comments:[{author:"(匿名)",content:"所以发现自从当了老师之后专业水平突飞猛进[捂脸]",voteCount:646},{author:"(匿名)",content:"关于这个问题，作者本身就做到了用简单的语言讲清楚了原理～",voteCount:72},{author:"(匿名)",content:"对囖～ 实际验证了费曼技巧",voteCount:24},{author:"(匿名)",content:"点赞收藏，一气呵成",voteCount:20},{author:"(匿名)",content:"没有人可以告诉，该怎么应用",voteCount:15},{author:"(匿名)",content:"复杂的东西变简单。好理解好记忆！",voteCount:12},{author:"(匿名)",content:"很好！",voteCount:5},{author:"(匿名)",content:"有没有特别的工具？",voteCount:4},{author:"(匿名)",content:"质性研究？",voteCount:3},{author:"(匿名)",content:"百度",voteCount:0}]},{id:"2947157684",question:"为什么想自律却自律不起来？",author:"小约翰",voteUp:10388,excerpt:"因为拿“自律”这事本身当做目标就是个错误的事情，以“自律”为目标的自律那不叫自律，那叫自虐。 首先我相信大家都承认一点——自律是一件痛苦的事，无论最终目的是什么，它的过程都是痛苦的，因为自律这个词意味着人要克制自己的欲望，这本身就是反人性的。 那么，你总得找一个理由来给自己一个解释——为什么我要忍受这样的痛苦？他一定是要达成某个目标，如果没有一个合适的理由的话，你这是不是无意义的痛苦？ 所以我特别…",content:`因为拿“自律”这事本身当做目标就是个错误的事情，以“自律”为目标的自律那不叫自律，那叫自虐。
首先我相信大家都承认一点——自律是一件痛苦的事，无论最终目的是什么，它的过程都是痛苦的，因为自律这个词意味着人要克制自己的欲望，这本身就是反人性的。
那么，你总得找一个理由来给自己一个解释——为什么我要忍受这样的痛苦？他一定是要达成某个目标，如果没有一个合适的理由的话，你这是不是无意义的痛苦？
所以我特别讨厌小红书上那种“自律”教程，什么五点半起床，每天看什么高分纪录片，什么阅读名著，什么地铁听英语啊等等，搞一系列的操作看的人眼花缭乱。我就特别想问，你做了这些事能怎样？你每天看高分纪录片能让自己当导演吗？每天阅读名著能把自己看成文学家吗？每天地铁听英语能过专八吗？做这些事本身的意义是什么？
更别提什么五点半起床了，长期睡眠不足是会破坏健康的，动辄以早起为标杆来过“自律”生活是典型的自我感动行为。一说起来就是某某大佬也早起，所以呢？跟你有啥关系？干活的劳动者比大佬起的早多了，够自律不？又怎样呢？
这些所谓的“自律”措施，其实很多都是无意义的折磨自己。那些劝你“自律”的人往往都会说你这是“提升”自己，那么请问具体提升在了哪里？提升了以后有什么后果？你看纪录片把自己看升职加薪了吗？地铁学英语把自己学出个第二副业了吗？恐怕没有吧？
他们可能会说，你这样能提升眼界呀！恕我直言，你我这种普通人提升眼界其实真没太大意义，比如我至今仍然认为我这辈子最蠢的事之一就是学了政治学专业，那眼界提升的，咔咔的，上来就学什么柏拉图霍布斯什么斯宾诺莎格劳秀斯，所以呢？有用吗？我能讲清霍布斯的主要政治思想，请问能给我摊的鸡蛋灌饼里加根肠吗？
看到这里你可能会不屑——太功利了，太物质了，天底下哪有那么多付出就有收获的事情，你若盛开蝴蝶自来，只要我坚持提升自己，正义将在终点等待所有人。
那么请问，回报会出现在什么时候？有没有一种可能就是你自律了五年八年，你的人生都没啥改变？
其实我想说的是，我一点都不反对“自律”，相反我非常佩服这些人，但自律也是讲方法的。因为自律的终点，是兴趣。
如果按小红书的标准，我在某一个方面算是自律到家了，比如大学期间我看书的频率那卷的爆棚，几年下来看的书能堆个小山了，那要是拍成自律视频的话配个bgm我绝对算个自律博主，律麻了。
然而我丝毫没觉得这属于啥“自律”，因为这个过程我一点都不痛苦，再强的自制力也比不上热爱。就像你看那些健身博主满身腱子肉，你觉得他们自律吗？也许是的，但是他们中绝大多数还是真的热爱健身，你让一个对健身毫无兴趣的普通人靠自律健成那样，那等于给他上大刑。
所以，如果你注定对某一件事绝对不可能感兴趣，那么你还是趁早放弃，压根就不要做这种“自律”的尝试，动用意志力去努力去做一样注定无法变成兴趣的事情，那叫自虐。
很多人都没意识到一点，人的意志力是一个定额，并不会随着主观意志的改变而无限扩充，人在这件事上自制了，可能在另一件事上就做不到了。比如你节食的时候，就很难塌下心来学习，劳累的时候，就很难再去做一些枯燥的事情“提升自己”。总有些人指责穷人“不提升自己”，其实那纯属放屁，每天挣扎着生存都已经用尽了所有力气，哪还有精力再克制自己去做一些不想做的事？就像很多刚毕业的孩子去北京都会想着，我倒地铁并不是浪费时间，因为我可以在地铁上学习呀！然而现实会告诉你答案的，你在地铁学习中消耗的意志力，一定会在其他的地方造成亏空。
计算使用自己的意志力，是一件需要摸索的事情。有限的资源要科学运用，当你决心要为了某个目标努力时，你才要要真正的开始自律。而不要为了感动自己而追求一个过程，自我感动式的自律往往效率很低且浪费时间，人生在世，还是尽量让自己过得舒服点好，人啊，不能自己跟自己过不去。`,grade:"A",commentCount:453,comments:[{author:"(匿名)",content:"奇葩小国一个月没更新了",voteCount:888},{author:"(匿名)",content:"传下去，可汗将率亲兵讨伐小红书[惊喜]",voteCount:620},{author:"(匿名)",content:"恐怕是没那么多小国能说了，毕竟狠人不限量，但国家就那么多啊[doge]",voteCount:347},{author:"(匿名)",content:"在硬核狠人的选题中，最早的二三十期的选材非常集中，各个故事可以看出是互相关联的，这应该是长期积累的结果。",voteCount:267},{author:"(匿名)",content:"我在蚂蚁庄园喂鸡 每天两个蛋 连续四年不断 根本不消耗意志力 自不自律[doge]",voteCount:263},{author:"(匿名)",content:"看到可汗整这么长，赶紧往下捯，嘿，不是广告[滑稽]",voteCount:237},{author:"(匿名)",content:"真没用，，，即使在文科专业里，也应该被归类于最没用的一类，不仅没用，而且无趣",voteCount:236},{author:"(匿名)",content:"搜狐中国某大佬一天睡四个小时[尴尬]咱也学，大佬开会睡觉，你敢睡吗[飙泪笑]",voteCount:232},{author:"(匿名)",content:"那每周一个吹逼小故事算自律吗[doge][doge][doge]",voteCount:180},{author:"(匿名)",content:"不自律——指一个月不更新奇葩小国[生气]",voteCount:156}]},{id:"3287413326",question:"为什么穷人的家庭大都不和？",author:"小轩",voteUp:10346,excerpt:"一个人可以挨穷，但两个人不行，因为会忍不住把自己的穷怪罪于对方； 一个人可以吃苦，但两个人不行，因为会觉得自己的苦是对方带来的。",content:`一个人可以挨穷，但两个人不行，因为会忍不住把自己的穷怪罪于对方；
一个人可以吃苦，但两个人不行，因为会觉得自己的苦是对方带来的。`,grade:"A",commentCount:174,comments:[{author:"(匿名)",content:"父母辛辛苦苦的工作都是孩子带来的[惊喜]",voteCount:1150},{author:"(匿名)",content:"真是这样的，一件事由某人单独执行，没做好，可能是客观条件太苛刻了或者自己能力不足，但一件事由两个人一起做，那失败的原因肯定是对方太傻逼了。",voteCount:383},{author:"(匿名)",content:"兄弟你说了大实话",voteCount:68},{author:"(匿名)",content:"也不是，还有一种人，我自己吃苦可以，和我在一起让你吃苦，难以接受。",voteCount:64},{author:"(匿名)",content:"啊，婚姻亦是如此",voteCount:37},{author:"(匿名)",content:"[捂脸]透彻呀兄弟[赞][赞]",voteCount:10},{author:"(匿名)",content:"透彻。",voteCount:3},{author:"(匿名)",content:"他们每个人都会这么认为",voteCount:2},{author:"(匿名)",content:"无敌了",voteCount:2},{author:"(匿名)",content:"精辟",voteCount:2}]},{id:"1849379381",question:"你有什么建议给女孩子吗?",author:"小蝎子",voteUp:10221,excerpt:"在做运动的时候，突然发生“噗噗噗”的声音，不要害羞，也不要觉得不好意思，这是正常的！ 姐姐只是在蹬腿！！ [图片] 2.没胸不要练PP！！没胸不要练PP！ [图片] 3.经常在朋友圈秀恩爱的，反而感情都不怎么稳定，常常是今天爱的死去活来，明天就打的不可开交 5.朋友圈经常晒单身照的男生不要去追，已经有目标了 6.法令纹是女生的天敌，会让你比同龄人老十岁！ 为什么会有法令纹？——天生的 颧骨高，上排牙齿凸的人会容易有法令纹，甚至天生…",content:`在做运动的时候，突然发生“噗噗噗”的声音，不要害羞，也不要觉得不好意思，这是正常的！
姐姐只是在蹬腿！！

2.没胸不要练PP！！没胸不要练PP！

3.经常在朋友圈秀恩爱的，反而感情都不怎么稳定，常常是今天爱的死去活来，明天就打的不可开交
5.朋友圈经常晒单身照的男生不要去追，已经有目标了
6.法令纹是女生的天敌，会让你比同龄人老十岁！
为什么会有法令纹？
——天生的颧骨高，上排牙齿凸的人会容易有法令纹，甚至天生就有！
——年龄的日益增长，皮肤渐渐松弛
——经常不控制表情，拉扯脸部的肌肉
分享个30W的淡化法令纹的办法
首先口里憋一口气，把舌头放到牙齿和牙龈之间，转动舌头，顶起来唇周的肌肉，顺时针逆时针分别转动20次
就冲这点就值得你点个赞啦~

7.养成喝绿茶和花茶的习惯，可以延缓衰老，让你变白
绿茶中含有茶多酚，可以抗氧化，花茶的效果也很多的~给你几个推荐好喝养生的花茶啦
玫瑰柠檬茶—调节内分
玫瑰菊花茶—排毒淡斑
枸杞甘草花茶—祛痘养肤
红糖山楂茶—助消化、缓解姨妈痛
枸杞玫瑰花茶—美白嫩肤
山楂荷叶茶—清宿便

8.站立前屈式，一招解决你大腿的硬身板
站直身体，双手手掌贴在地面上，同时保持腿部直立，就像整个人对折了，这个动作三秒就能感受到大腿小腿后面的肌肉在拉扯！！
要知道我这老腿第一次都弯不下去....捂脸

9.要有提前五分钟的意识
不要总觉得自己时间掐的正准刚刚好，让自己处于一个急迫的状态，这会很容易出错，提前五分钟让自己有规划的完成
不然就会像我一样一个月迟到27次....

10.帮别人带早餐、午餐这些没多少钱的东西时，别人转给你，不要客气直接收下，谁也不想因为几块钱就欠个人情
11.都知道头发是女生的第二张脸，赶紧爱护起来，别等秃了才哭！！
之前我熬夜、 吃火锅，看这头发秃成啥样了！
还好身边有个生发“大户”姐妹给我安利的这个
——束友育发液
断断续续也用了挺久了，发际线已经长出来一小撮碎发了！
这个里面的成分是真的好，含有何首乌、人参等十多种名贵的中草药，自然提取，不添加任何刺激成分，温和不敏感，抹在头皮上很清爽，一点也不油腻。
用了一个多月的时候就长出来一些小绒毛了！不懒的话一天可以抹2次，我都是一次，偶尔还会忘了！
无广纯分享，有头发问题的姐妹们真的要注意保养了啊啊啊！！！
12.认识到体态的重要性，再贵的衣服也纠正不了弯腰驼背的仪态
好看的身材，首先关注的就是体态，圆肩驼背会对气质大打折扣的，分享三个日常的体态姿势~

总之就一句话：给我把背挺直
13.养儿不一定防老，但防晒一定防老，防晒霜和防晒伞都得用起来了，紫外线可是我们衰老的第一大元凶，日常防晒霜和防晒伞都是必备，还有，物理防晒比化学防晒更有效！

14.多去认识新朋友，不管职业
建立一套自己的“生活资源系统”，大到房产中介和公司大老板，小到认识了解保姆小时工、tony、健身教练，这些都是在各自行业对你有帮助的，能让生活多了很多乐趣
15.一定要用漱口水，不用都不知道自己嘴里原来那么脏！！有点恶心

饭后用漱口水清理嘴巴的饭渣和牙槽的黄色沉着物，口气清新是真的可以增添好感！咕噜咕噜三十秒，瞬间清清爽爽，连呼出来的空气都是香香的~
这是我自用的一款漱口水，方便携带

16.每年做个定期的体检
新一代的996打工人，一年一次的体检尤其重要，不然哪天去医院是被抬着去的，凡事还是给自己打好预防针，也给爸妈体检一次吧，你会心安的
17.少熬夜，有人熬夜是为了赚更多的钱，你熬夜是刷更多的抖音，值得？？
好好休息，熬夜会让你越来越丑的
18.穿衣颜色不要超过三个颜色，把自己打扮的像圣诞树一样也不会有多出众

19.睡前没事可以做仰卧起坐或空中脚踏车，预防小肚子和大象腿
玩手机的时候是只需要用到手的，睡前来点运动可以维持好身材的啦，空中脚踏车和仰卧起坐都是亲测有效的小办法哦~
20.一天一包每日坚果，可以防止黑色素沉淀
坚果中含有可观的维E元素，和维C或者胡萝卜素结合的时候，能帮助皮肤抵抗紫外线的侵袭，维E可以有效减少黑色素的沉淀，坚果是属于低GI值，对于血糖的影响不大，不容易发胖！
21.不要忽视眼部，眼部问题会非常非常影响颜值！！
我自己是深有体会了～
作为一个追剧狂魔，整天熬夜已经是家常便饭了、
然后我也没用眼霜的习惯，所以黑眼圈也算是我脸上的常客了，太丑了呜呜~
后来意识到眼部保养的重要性，比较了很多款，最终入手了这款眼部精华液
主要是价格对我这种打工人来说可以接受（一百出头），然后成分也非常能打！！
完全是兰蔻小棕瓶的平替，主打欧洲七叶树提取物，可以有效淡化黑眼圈。
成分是非常自然的，没有添加其他乱七八糟的东西。
不会涨脂肪粒，本敏感肌亲测过了！！
现在颜值重回巅峰！！
然后平时建议姐妹们：
①睡觉尽量不要侧卧，容易挤压眼周
②多吃维a类的水果
22.零食别买太多，别高估自己的小嘴巴~
零食就别放在能看到的地方，这样自己就会少吃些，藏到柜子的高处，抽屉里面，这样你会因为懒得去翻就不吃了
23.捡东西的时候不要弯腰直接捡，腰部承受不起滴~
先蹲下，然后直腰捡起，不然腰部会承受50斤的重量，容易受伤，特别是穿裙子的女生，否则你会在哪个小视频中看到自己
24.橘子要少吃一些，不然皮肤的确会变黄的！
大学有个室友贼爱吃小橘子，整个宿舍的姐妹一起跟着干完两斤不是问题，大家都变成黄脸婆了....
橘子中的胡萝卜素含量过高，吃太多会越来越黄的

25.不要捏鼻头，特别是紧张的时候也不要摸鼻子，鼻子会大到塞下鸡蛋的！
26.干完饭不能马上就坐下，不然大肚腩、大象腿都找上你！
腹部积多了食物会消化不良转化成脂肪
27.多微笑，这真的能让你运气越来越好~~
我一直都相信相由心生这个道理，让自己处于一个开心的状态身边的事情也会越来越可爱，先感染自己，再人传人
看完这篇回答，也希望你能开心的为我点个赞，笔芯~`,grade:"A",commentCount:219,comments:[{author:"(匿名)",content:"没胸必须要练屁股",voteCount:452},{author:"(匿名)",content:"没胸不要练PP那个图给我看笑了哈哈哈哈跟我身材一模一样",voteCount:376},{author:"(匿名)",content:"我也这么觉得！有胸没屁股才奇奇怪怪",voteCount:146},{author:"(匿名)",content:"无论如何还是翘臀yyds！",voteCount:132},{author:"(匿名)",content:"这个束友育发液，哈哈哈，我们班男生用了四个月，看起来真的不秃了，[飙泪笑][飙泪笑]，班主任还追着问是什么[捂脸]",voteCount:123},{author:"(匿名)",content:"这个橄榄日记眼霜我也在用，不过效果不快，[流泪]用了一个月才淡化，舍友说她那个一礼拜就可以了，[思考][思考]不过我有点怕，现在还在用这个橄榄眼霜，主要是也没别的副作用吧，比较安全，我怕脂肪粒[捂脸][捂脸]",voteCount:38},{author:"(匿名)",content:"第四点呢",voteCount:1},{author:"(匿名)",content:"单身照是什么玩意",voteCount:0},{author:"(匿名)",content:"什么？女生竟然看小视频[看看你][惊喜]这不是我喜欢的小仙女了[看看你]",voteCount:0},{author:"(匿名)",content:"图二本人吗",voteCount:0}]},{id:"1762418904",question:"如何长时间高效学习？",author:"硬核学长2077",voteUp:10195,excerpt:"作为一个，加州大学洛杉矶全奖硕士，本科全国前十，每天有效学习工作时间10小时+，一周6天+，坚持13年以上的人。我感觉还是有一点点资格来回答这个问题.. 全文1万3千字纯干理论+实践指南，大概需要13分钟，可能是这个问题下面最长的答案，纯手码！ 答应我，看完它。看不完，收藏起来，早点看完。看完之后，执行起来。 你以后一定会感谢自己，看完这篇文章的。（话说，收藏是点赞的两倍是什么情况…收藏的同学，学长祝你考试多10…",content:`作为一个，加州大学洛杉矶全奖硕士，本科全国前十，每天有效学习工作时间10小时+，一周6天+，坚持13年以上的人。我感觉还是有一点点资格来回答这个问题..
全文1万3千字纯干理论+实践指南，大概需要13分钟，可能是这个问题下面最长的答案，纯手码！
答应我，看完它。看不完，收藏起来，早点看完。看完之后，执行起来。
你以后一定会感谢自己，看完这篇文章的。（话说，收藏是点赞的两倍是什么情况…收藏的同学，学长祝你考试多10分。点赞的同学，祝你考试多20分。点赞又收藏的同学，祝你考试多80分哈哈哈）
全文思维导图如下：
我有幸观摩过，我表弟平时是怎么学习的：
晚上七点坐在书桌前，打开了书本，准备好好复习一下今天学的内容，然后去写作业。
不到十分钟，手机就到了手上。
潜意识中，知乎、b站、某博、某音全打开了。
从蔡徐坤到影流之主，从马云到jojo，从李佳琪到咬人猫...
打住，一不小心就到八点了！
“今晚再也不能玩手机了！”
然后翻开了书，发现时间不够了，直接写作业吧。第一道题写了一半，突然手机响了，原来有个朋友发了个小猫咪搞笑视频..
太萌了吧！赶紧看看
然后...“这就十点了！”
不能再堕落下去了！
开始疯狂写作业，终于赶在关灯之前，都写完了。
就这样磨磨蹭蹭，一晚上过去了。
即使关灯了，还是辗转反侧，焦躁后悔，还带着一丝丝，和他这个年龄不相称，的自责。
“表哥，明天我再玩手机，我就是你的...孙子！...”
“...”
然并卵，明天还是一模一样的剧情。
其实，我简单算了一下表弟的时间。他一晚上的有效学习时间，还不到1个小时，其他4个小时，要么是在发呆、要么是在抠脚皮、要么是在转笔、要么是在玩手机...
按照这个时间来算的话，他还不如认认真真地，写1个小时的作业，然后剩下4个小时都去玩手机。
至少，玩手机的时候，还不用提心吊胆。害怕他爸妈，分分钟拿着鸡毛扫进来，男女混合双打..
而且，集中精神十分钟，要远远胜过心不在焉一小时。他用1个小时认真写，记住的知识，都比这么拖拖拉拉5个小时，印象要深刻很多。
其实我表弟，也是意识到，再这样下去不行的。
我看见，他有很多次，在某音上面搜索，如何自律、如何长时间高效学习。
这里我就得吐槽下，某些短视频的营销号。披着自律的皮，随便找了几个番茄工作法、单核工作法的理论，排列组合一下，就敢号称5分钟内，让你像玩手机一样爱上学习。
这些洗稿视频，不成理论体系就不说了，他们中间的一些方法，还互相矛盾，压根实操不起来。
我表弟，一看就懂，一用就废..
除了进收藏夹吃灰以外，并没有什么卵用。
关键是，这些营销号所说的专注，只是让你压迫自己，不要分心玩手机。
但是不玩手机就是专注了吗？眼睛盯着书就是专注了吗？
不，这不一定就是专注，这也可能只是一种伪勤奋。
真正的专注，应该是这个样子的：
当我去学习的时候，我能够一边学，一边对学习内容进行充分的加工。
当我学习完，我能够在大脑中，形成所学知识的模型、框架。
我能够用自己的话，来复述，我刚才所学的东西，本质是什么。
在整个学习过程中，我都知道，我要学什么，要解决什么问题，带着目标来思考。
这才是真正的专注。
只是不玩手机，不叫做专注！

要达到这种专注状态，并且长时间保持，步骤可以拆分成下面这3步：
长时间高效学习 = 1.把注意力保持在，眼前的事情，2.保持这种状态一段时间，3在整个过程中，抵制住诱惑和干扰

1.如何把注意力，保持在眼前的事情
这一部分，要说的是，怎么保持注意力。或者说，如何防止自己走神。
先给出保持注意力的原理：
当大脑处理信息的速度=手上所做事情的速度
就能一直保持注意力
想一下，为什么你在刷小说、看短视频，可以连续看几个小时都不会走神？
那是因为，网络小说和短视频，本身他的信息密度就很低。而你去刷这些内容的时候，往往大脑就处在一个比较放松的状态。
因为信息密度低，你手上刷起来就很快。
因为大脑放松，大脑的信息处理也很快。
所以，结果就是，你能够连续看几个小时的小说和视频，都不带走神的。
通常会发生走神，或者注意力不集中，都是因为大脑和手，速度不一致导致的。
下面给出具体解决方法：
a当大脑处理信息速度>手上所做事情速度
这种情形，就需要给大脑，安排更多的事情，人为降低信息处理速度
典型场景1：上课走神
你在教室里上课，听着老师在讲。但是课前，你已经预习过大部分了。感觉老师讲得好慢啊。虽然说很不想听，但是又担心，老师突然讲了一个重点难点，你没有记下来。
好想像网课那样，可以1.5倍数听下去，那就好了..
要是老师先给出重点，那就好了..
到底听不听了，好纠结啊，要是不用听就好了...
晚上吃什么好呢，要是晚上吃个炸鸡，那就好了..
晚上回家后，要是能打一把吃鸡，那就更好了..
b站要是再多一点坤坤的鬼畜视频，那就最好了...
然后你就彻底走神了..
解决办法：
给大脑安排更多的事情：
因为你的大脑太快了，但是老师又讲得太慢。你可以这样降低大脑的速度：
一边听老师在讲，一边在大脑里面，提取老师说的这一段的关键。
思考一下，老师说了一长串这些，是为了讲清楚什么。
换位思考，如果你是老师，根据刚才讲的内容，会给自己挖哪些坑，出题的时候可以设置些什么陷阱。
既然听完课之后，你也得花时间，整理课本内容、梳理架构，那么你完全可以在课堂上，把这些零碎的事情都做了，既节省了时间，上课也不会走神，一箭双雕。
典型场景2：抄笔记走神
通常发生在，你从课本上面，把内容抄写到笔记，来做整理。
解决方法：
一般抄写的时候，手是跟不上你想的速度的。这时候，你就不要对着课本一顿抄，要提取关键词，挑出重要的东西，舍弃一些废话。
并且逼着自己，一边抄，一边想，我正在抄的这段，中心思想是什么东西，它和上下文有没有什么关系。
通过这个方法，提高手的速度，并且降低大脑处理信息的速度。
----------可以参考现在很火的康奈尔笔记法-------------
b当大脑处理信息速度<手上所做事情速度
这种时候，应该减慢，做事情的速度。
典型场景：看书走神
前面也提过，当你看小说的时候，小说的信息密度低，会比较进入专注的状态。
但是，当你去看课本、专业书的时候，因为书本的信息密度很大。你按照平时刷小说养成的习惯去看书，你大脑处理信息的速度，远远跟不上你的眼睛看的速度。
这个时候，你看完一页了，结果发现什么东西都没看出来。
打开书本孙红雷，合上书本马冬梅...
没办法，又要重头再来，看一遍这一页。觉得好挫折啊，看书哪有刷小说来的爽。于是，看书学习的厌恶感，就形成了恶性循环。
解决方法：
减慢你手上做事情的速度。
看书的时候，不只是用眼睛看。逼着自己的手，一边看，一边写写画画。
哪里是重点啊？圈出来。
哪些东西应该提炼，记到笔记本上啊？抄下来
让自己，眼睛看的速度降下来，和大脑同步，就容易保持专注了。
2.如何保持专注一段时间
通过调整速度，进入专注状态之后，还需要保持这种状态一段时间。
接下来会介绍5种方法，其中前3种是我自己亲测非常有效。后2种，是我的朋友们自己尝试过觉得有效果。
这一部分采用哪种方法，因人而异。比如我自己专注的时候，是不听歌的，但是我有的朋友，很依赖听歌。
所以你可以按照自己的平时习惯，按照需要实践。
a To do list专注法
To do list也叫做待办事项。下面我统一把to do list，缩写成tdl。
这是我本人认为最有效的，长时间保持注意力的方法。
而且，写tdl，也是我开始学习的，一种仪式感。
假设说，我这次要学习2个小时，要学习物理、生物这2个学科吧。
我会在每次学习之前，把接下来的2个小时，按照任务的优先级，还有所需的时间，分配不同的时间。
举例：
19：00-19：30 物理刷3道大题，正确率争取在60%以上
19：30-19：45 回顾题目，记录错题本，积累解题思路
19：45-20：00 buffer缓冲；休息
20：00-20：20 看一眼生物新章节的课后习题；然后预习生物课本，总共5页，圈出重点概念；
20：20-21：00 完成老师布置的部分生物作业
21：00-21：15 buffer缓冲
我排tdl的时候，一个时间段，只会去做一件事情。
没有安排tdl的时候，我只是大概知道，我现在有两个小时，物理要刷题，生物要预习和做作业。我就会觉得，其实时间很多啊，中途玩一下手机，好像也没什么所谓。
但是排完了之后，我就会发现，其实每个具体任务，留给我的，可能就只有20-30分钟，时间其实很紧凑的。
这样，当我进入学习状态之后，我看到这个时间deadline，我就不敢随随便便玩手机，不然我今晚的任务，就完不成了。
deadline就是我保持高效专注的动力。也打破了，我以为时间很多的幻想。
定tdl的时候，要注意两个事情：
1）一个时间段，只安排一个任务。不要多线程
2）我一定会给休息时间，留出时间。松弛有度。我上面举例的buffer缓冲，其实就是我预留的休息时间。因为有些时候，有些任务实际时间，会比想象中更久，所以即使我在计划内，没有完成某个任务，也能用buffer的时间，来完成它
3）一开始，你可能排不好tdl的具体时间，没关系。只要遵循着，不求完美，先定计划。多做几次，你就对任务的工作量，有个比较清晰的时间。以后可以慢慢调整
关于tdl专注法，其实还有很多精华细节。但是篇幅有限，这里只讲了和专注有关的。关于tdl的跳坑指南，以及我正在用的最新最全tdl方法论，可以看下面这个链接：
有没有一种让人很爽的学习方法？

b番茄工作法
我觉得，目前有人对这种主流方法，有点过于神化。而且执行起来，有点流于形式。
因为我按照我的tdl专注法，我发现具体执行的时候，不同任务，要花的时间，其实不能严格按照25分钟、50分钟这么来划分。
如果让我把一个30分钟的任务，划分成一个25分钟，一个5分钟，我又会觉得太二了...
而且对于我来说，我能轻轻松松保持一次专注2小时以上。
所以，本人亲测，我极少会把大块的时间，用番茄工作法。大块时间，我会用我自己的tdl专注法。
但是对于零碎时间，我的确会使用番茄工作法和番茄钟。
番茄钟对我最大的意义，是一种仪式，以及防止我浪费了零碎时间。
典型场景：地铁上
我每天上班走路搭地铁，我都会先打开番茄钟，然后定时25分钟。
然后在手机上，专心看25分钟的电子书。
好处：能有效防止自己，拿着手机去看知乎热搜
坏处：一开始执行的时候，比较容易搭过站..
这里说一个番茄钟的误区：
很多人执行番茄钟的时候，会觉得，我打开番茄钟计时就好了。
但是番茄钟计时，和你在这25分钟内是不是专注，能不能感觉到任务的紧迫感，是没什么必然联系的。
所以我前文提到，很多人执行的时候，会流于形式。
我的建议是：大块时间还是使用tdl专注法，零碎时间用番茄钟。
c冥想法
这是我用在特殊时期、特殊场合的方法。
大部分时间，都用不上。但是遇到了某些特殊的场合，会发生奇效。
冥想法的实操步骤：
我是借鉴了，冥想中的理论。
当我冥想的时候，我需要把注意力，集中在一个事物上。
比如我现在要想的是，描绘一颗五角星的形状。一开始，会很集中。慢慢地，各种杂念就出来了，比如今天中午吃什么啦，比如上午跟老外聊天的时候觉得自己好囧啦，比如今天是周几什么时候才到周末...
此时，我要做的，不是说，我不能去想这些。而是把我的这些杂念，想象成，它们都在一列火车上，慢慢地远离我。把注意力，集中回这颗五角星上。
据说背后的原理是这个样子的：
人类的大脑，是存在爬行动物脑的部分的。而这部分，是无法理解“不”这个概念的。
因此，如果我老是在想，“不要去想，今天中午吃什么”，我的大脑只会理解成，“今天中午吃什么呀吃什么呀吃什么呀”...
越是去想不要干什么，就会越想干什么。
典型场景：遇到重大打击之后
比如，下午踢球比赛输了很不爽，但是晚上还要继续学习；
比如，今天期中考试卷子发下来了，成绩很差，但是现在还要做错题归纳；
这时候，我就会把注意力，放在学习的知识上面。
那些让人不爽的杂念，是一定会出现的。但是我不是去抗拒他们，而是让他们像搭火车一样，慢慢离开我。
而且这个过程，还会反反复复出现很多次，并不是说，它们搭一次火车就能彻底走了..
接受这个事实，慢慢地我就能找到保持专注学习的状态。
而且认真学习完一段时间之后，我会发现，这些不爽的事情，也不会让我太焦躁了。
d听歌法：把自己和外部环境隔绝开来
从这个方法开始，都不是我亲测的。但是我的朋友们，都有测试过有效。你可以按需实践。
对听歌法，要辩证地看。
对某些人，听歌的确可以把自己，和外面的环境隔离开。
但对于其他人来说，听歌可能反而降低了自己的效率。
评判标准很简单：
问自己两个问题，如果答案都是肯定的话，就可以用听歌法
听歌的时候，是否会让自己更加集中精神？
如果不听歌，自己的效率是否，不会降低？
需要注意第二个问题。
就是有些同学，平时做作业的时候，都习惯听歌，此时效率很高。
但是到了考试，因为不能听歌了，导致了自己受到外界的干扰，变得紧张。
这一类同学，也是不适合使用听歌法的。
一般来说，听歌只推荐，听自己比较熟悉的、不带情感的、不带歌词的、安静的纯音乐。
不然的话，很容易本末倒置：学习的时候，注意力去到歌词、歌曲的情感上面，反而更难集中精神。
e表演法
典型例子：
b站、某拍、timing上面，都有不少学习博主，直播自己日常做作业的过程。
相当于，给自己枯燥的学习，寻找一些观众，来监督自己。
原理：
1.每个人都有表演型的人格
当这些博主，在直播的时候，他们会觉得有人在关注自己。
因为有人在看我，所以我得保持，我正在认真学习的学霸的人设。这时候，如果拿出手机来玩，就不太好意思了。
即使我并不是一个真正的学霸，在观众眼球的压力下，也会刺激我向真的学霸靠拢。
2.即使没有人看，但是说不准，什么时候，就会进来一个人，看到我在玩手机。
无形中，我就会觉得，有人在督促着自己学习。让我只能专心在学习上面。
需要注意，有些博主直播的时候，会过分关注，是不是有人给自己点赞啦。时不时，还会被弹幕勾走注意力。这样的话，就形式主义了，还不如不直播。
备选方案：
有些同学觉得，我不太好意思上镜头直播。
对他们而言，同样可以用上表演型人格的心理，来监督自己。而且不需要上镜直播
方法1：找个同学监督自己
方法2：如果图书馆待不下去了，老是玩手机。那么可以换一个地方，例如咖啡厅、书店等，同样存在观众的地方。
比如我高二的时候，周末晚上就会去麦当劳刷题。旁边有个阿姨，对她的小朋友说，你看哥哥学习多认真。
`,grade:"A",commentCount:212,comments:[{author:"(匿名)",content:"这真的是我所看过类似话题中最好的一篇，语言简练舒畅，逻辑清晰，且能够落地。对于我这种从小学习看起来捧着教科书其实底下压着杂志时不时偷看一眼的低效学习者来说，值得好好研究学习一番～",voteCount:148},{author:"(匿名)",content:"我最讨厌阅读长篇了 可能被碎片化坑了。但是刚刚居然认认真真看完了。tdl里面不仅列步骤，还列了考核目标，实用。给自己奖励。还有那个什么不追求完美，则全什么的，挺现实的。代偿哈哈哈 可以很好解决报复性反弹。其实都是人性的问题吧[思考]",voteCount:57},{author:"(匿名)",content:"写得真得很好。经不住诱惑，放飞完内疚，然后，给自己安排个猛人时间表，恨不得变器人，干两天。再然后，感动了自己，再又开始放飞……这个死循环很是我了。这么多年一直都是元婴期，唉╯﹏╰。希望从这评论开始，早日走出死循环。",voteCount:52},{author:"(匿名)",content:"你真的好棒！我会按照这个办法去尝试的",voteCount:23},{author:"(匿名)",content:"今天再刷第三次，简化成自己的构思，装作是自己经验给儿子开讲。[捂嘴]",voteCount:21},{author:"(匿名)",content:"感谢[赞同]真不错，赶快给儿子瞧瞧[调皮]",voteCount:7},{author:"(匿名)",content:"看起来非常厉害(ง •̀_•́)ง，已点赞收藏。明天就开始用起来（因为今天刚下课，要休息一下先） [赞同]",voteCount:6},{author:"(匿名)",content:"非常的哇塞",voteCount:4},{author:"(匿名)",content:"看完了，对我很有帮助，谢谢学长[赞]",voteCount:3},{author:"(匿名)",content:"没看内容，但我是真的服美本名校全奖硕士，难度不亚于名校PhD。",voteCount:1}]},{id:"889723112",question:"是什么让你从堕落变得上进/自律？",author:"啊犀知行说",voteUp:10059,excerpt:"我用了整整7年的时间证明了对我而言，自律是靠不住的。 你千万不要相信那些鸡汤人士的鼓吹，好像人只要有了决心，就会开始自律，他们不会告诉你，那些能做到自律的人，一方面是他天生的反馈系统就和你不一样，另一方面他从小到大的家庭环境、教育环境、工作环境也跟你不一样，这些人的自律根本不能复制。 我那几年不明白这样的道理，不停和自己拉扯、纠结，不断的否定自己为什么做不到自律，换来的是不断的失眠、失控，经常努力…",content:`我用了整整7年的时间证明了对我而言，自律是靠不住的。
你千万不要相信那些鸡汤人士的鼓吹，好像人只要有了决心，就会开始自律，他们不会告诉你，那些能做到自律的人，一方面是他天生的反馈系统就和你不一样，另一方面他从小到大的家庭环境、教育环境、工作环境也跟你不一样，这些人的自律根本不能复制。
我那几年不明白这样的道理，不停和自己拉扯、纠结，不断的否定自己为什么做不到自律，换来的是不断的失眠、失控，经常努力一周，就要消沉一月，心态总是在崩溃的边缘疯狂试探，那我是怎么从这样的泥潭里跳出来的呢？
我放弃了自控，我承认自己没有这样的基因，放弃自控不代表我放弃自己，而是开始从实际情况考虑如何完成自己想做的事，于是我组建了一个对抗惰性的学习群，从自己的性格特征出发，制定了一系列的规则用来督促自己往前走，结果不知不觉我已经坚持3年了，我制定什么样的规则呢？
1、可执行：设定一个长期具体可执行的目标（1-2个月），如看完一本书，再拆分到每天，如每天看5页，把任务公布到群里
目标具体可执行，比如考试拿100分就不是一个可执行的目标，而是一个未来的结果，这个结果是不可控的，也不可能按部就班拆分到每一天，那么最终失败的可能性就很高，从而产生挫败感，而看完一本书，就是一个可以执行且一定能完成的目标，而且我每段时间只设一个目标，这个目标是我能想到的最重要的，也最想要做到的目标。
1-2月是因为我怕一个任务，拖得太长，迟迟没有一个大的反馈我就很难有成就感，像打游戏一样，一直不升级就很难玩下去。
拆分到每一天，就是忘掉目标，聚焦到执行上，每天看5页，这个出发点就是任务要尽肯能的小，最好就是顺手就能完成的，这样执行没有压力，更可能去做，大多数情况下，不可能只看5页，如果状态不好，也不可能5页都不看。
2、正反馈：结果要可视化，如看书则对看过的内容拍照或总结后分享到群、跑步则分享跑步的路线图等。
这是我建群的初衷，因为我这个人比较好面子，说出去的话我很难一点也不做，而人一旦能做一点就反而容易坚持了。这既是一种反馈，也是一种监督，也是一种满足虚荣，有成就感的一个过程。
3、负反馈：当天没有完成的，按群人数发3元的红包。
我对钱比较敏感，超喜欢钱，这个惩罚看起来不痒不痛，但如果每天都不做，也是有负担的，这是一种督促，但也是放下，很多人长时间不做以后，就干脆不做了，发了红包，给自己一个警醒，也是了断今天的心里负担，明天又是新的开始，一两天没有做到没关系，关键是坚持去做。
4、可休息：完成一个大任务可休息3天，周末、法定节假日休息，有事比如出去旅游可以请假
不要苛求自己，感冒了，出去玩了，临时有事了，请个假，完成一个长期任务，自己休息下，不要给自己很多坚持不下去的理由和压力，从人性的角度出发，选择适合自己的方式。
就这么一个小的改变，我再也不需要跟自己对抗了，每天进步一点点，就这样用了7年都没有做到的事情，我却不知不觉坚持3年了，完成了很多很多自己想做的事，对自己也越来越自信，任何的困难我都可以用时间蚕食，不断的成长。
ps：学习群不对外公开，觉得可能会帮助到自己的，可以自行组群，私信我也不会拉的。
ps：不知不觉5k的赞了，收到了很多的感谢和共鸣，衷心祝愿各位能每天进步一点点，但我也知道我的方法并不是适合所有人，所以我说可能帮助到大家，帮不到也实在没办法，我也是靠自己硬生生走出来的，我建的群也有很多人加入后又退出了，因为他们确实做不到每天往前走一点点，并不是我比他们强，而是我的方法不适合他们，仅此而已。
另外给一大堆喜欢找杠点喷的集中说明几点：
1、我对自律的定义：只靠自己控制自己，不需要任何外界的参与！！！
如果你还是说：我不听，我不听，我不听，你这个就是自律！！！
你开心就好，真的……
2、做不到是没有兴趣的
不要高估了兴趣的驱动力，我见过太多一无是处的天才，他们确实对某一方面表现得很有兴趣，甚至在一开始就展露头角，但时间一长他们就觉得索然无味，最终泯然于众人了。所以更不要说大多数连尝试一次都懒得动一下的人，比如说我这个答案下想加群的数不胜数，建群的则屈指可数，他们是没有兴趣吗？是没有足够的驱动力！
3、做不到是没有目标的
每个人的目标都是自己找的，别人是没办法帮你的，你只有不断的尝试才能找到，有的人很幸运，一下就找到了，有些人始终不得其门，我还算是幸运的，至少在30岁的关卡终于找到了自己想做的事，我没说是我没有汇报的义务。
4、做不到是心浮气躁的
你说的对，我就是普通人，经常还要被你这种琐事打扰心境，唯一庆幸的是我会按我的方式坚持下去，走得慢一点无所谓，今天比昨天厉害一点，明天比今天厉害一点，浮躁什么的，根本就不在我考虑的范围内了。`,grade:"A",commentCount:748,comments:[{author:"(匿名)",content:"这个故事告诉我们的启示：只要活的久，没有什么完不成的事。。。",voteCount:1008},{author:"(匿名)",content:"你这不还是自律嘛，之前没找对方法后来找到了。就像马克思主义到了中国就需要中国化一样[调皮]",voteCount:458},{author:"(匿名)",content:"是的，耐心的本质含义就是用时间来蚕食困难",voteCount:254},{author:"(匿名)",content:"不错，变成外部推动",voteCount:111},{author:"(匿名)",content:"嗯嗯，就是用游戏化的方式给与反馈，有些人对自我反馈敏感，有些人对外部反馈敏感，如果能善用外部反馈，何尝不是一种主动机制",voteCount:104},{author:"(匿名)",content:"哈哈，实事求是，知行合一",voteCount:39},{author:"(匿名)",content:"哦 我跟你太像了",voteCount:26},{author:"(匿名)",content:"冲着红包去的吧！😄",voteCount:19},{author:"(匿名)",content:"每天进步一点点，共勉",voteCount:11},{author:"(匿名)",content:"自己找志同道合的朋友组一个吧",voteCount:10}]},{id:"113026066983",question:"目前为止，你总结出的最大人生经验是什么？",author:"南爸误禅",voteUp:10045,excerpt:"这个世界上，不管任何领域，当你一门深入进去达到一定的程度以后，你就会发现一个有趣的现象。 那就是 每一个行业都是一帮人“半内行”的人在忽悠另一帮“纯外行的”人。 而真正称得上专业的“内行人”根本插不上话，甚至他们连登台的资格都没有。 不懂的装懂 懂的装不懂，而且没得选 这个世界就是草台班子加庞氏骗局组成的",content:`这个世界上，不管任何领域，当你一门深入进去达到一定的程度以后，你就会发现一个有趣的现象。
那就是
每一个行业都是一帮人“半内行”的人在忽悠另一帮“纯外行的”人。
而真正称得上专业的“内行人”根本插不上话，甚至他们连登台的资格都没有。
不懂的装懂
懂的装不懂，而且没得选
这个世界就是草台班子加庞氏骗局组成的`,grade:"A",commentCount:460,comments:[{author:"(匿名)",content:"像张雪峰说学电力的，最后你毕业去过西藏的国家电网，也全是一群不学无术的二代在那，你汤都喝不上[捂脸]",voteCount:908},{author:"(匿名)",content:"从我个人经历来看，是这样的，那些半斤的早早的鼓起腰包，要么身居高位，要么衣食无忧的稳定。无他，愿意骗，愿意站队就可以，技术算什么，上不了桌的。",voteCount:655},{author:"(匿名)",content:`他们未必是半内行，而是因为就算是内行，他要挣钱就不能说真话。

如果这个世界上所有的东西都讲得非常透明，严格等价交换，那利润来自于哪里？如果透明，对方就会只愿意付给你必要劳动时间的费用，那不就变成了劳动创造价值，还哪里有资本主义？`,voteCount:552},{author:"(匿名)",content:"就是具体经办人和负责人的区别",voteCount:184},{author:"(匿名)",content:"[捂脸][捂脸]哈哈，是的。在各平台讲普法知识，粉丝和点赞都是个位数，但若讲点炸裂的“奇案”和话题，或者找几个托儿做直播切片，立马爆火~",voteCount:180},{author:"(匿名)",content:"[图片]",voteCount:162},{author:"(匿名)",content:"此处需要点名中国AI教父李一舟[doge]",voteCount:54},{author:"(匿名)",content:"专业的也不出来深入浅出，不划算。",voteCount:1},{author:"(匿名)",content:"真的是这样！",voteCount:0},{author:"(匿名)",content:"是的。认同。",voteCount:0}]}];function pe(t){if(t>=1e4){const e=t/1e4;let o=e>=100?Math.round(e).toString():e.toFixed(1);return o=o.replace(/\.0$/,""),`${o}万赞`}return`${t}赞`}function fs(){const[t,e]=i.useState(null),o=i.useMemo(()=>[...ps].filter(r=>r.voteUp>1e4).sort((r,c)=>c.voteUp-r.voteUp),[]),a=o.find(r=>r.id===t)||null,s=(r,c)=>{if(c)return c;const d=r.replace(/\n+/g," ").trim();return d.length>48?d.slice(0,48)+"…":d};return n.jsxs("div",{className:"page zhihu-page",children:[n.jsxs("div",{className:"zhihu-head",children:[n.jsx(jt,{className:"zhihu-head-ico"}),n.jsx("span",{className:"zhihu-head-title",children:"知乎 · 高赞回答"}),n.jsx("span",{className:"zhihu-head-sub",children:"按点赞从高到低 · 仅显示 > 1万赞"})]}),n.jsx("div",{className:"zhihu-list",children:o.length===0?n.jsxs("div",{className:"zhihu-empty",children:[n.jsx(jt,{className:"zhihu-empty-ico"}),n.jsx("p",{children:"暂无点赞超过 1 万的回答"})]}):o.map((r,c)=>n.jsxs("div",{className:"zhihu-card",onClick:()=>e(r.id),children:[n.jsx("div",{className:"zhihu-rank",children:c+1}),n.jsxs("div",{className:"zhihu-card-body",children:[n.jsx("div",{className:"zhihu-q",children:r.question}),n.jsxs("div",{className:"zhihu-meta",children:[n.jsx("span",{className:"zhihu-author",children:r.author}),n.jsxs("span",{className:"zhihu-vote",children:[n.jsx(Bt,{})," ",pe(r.voteUp)]})]}),n.jsx("div",{className:"zhihu-excerpt",children:s(r.content,r.excerpt)})]})]},r.id))}),n.jsx(cn,{open:!!a,title:null,onCancel:()=>e(null),footer:null,destroyOnClose:!0,centered:!0,className:"zhihu-detail-modal",children:a&&n.jsxs("div",{className:"zhihu-detail",children:[n.jsxs("div",{className:"zhihu-detail-rank",children:["第 ",o.findIndex(r=>r.id===a.id)+1," 名 · 高赞回答"]}),n.jsx("div",{className:"zhihu-detail-q",children:a.question}),n.jsxs("div",{className:"zhihu-detail-meta",children:[n.jsx("span",{className:"zhihu-detail-author",children:a.author}),n.jsxs("span",{className:"zhihu-detail-vote",children:[n.jsx(Bt,{})," ",pe(a.voteUp)]}),a.grade&&n.jsx("span",{className:`zhihu-detail-grade grade-${a.grade}`,children:a.grade}),typeof a.commentCount=="number"&&n.jsxs("span",{className:"zhihu-detail-cmtcount",children:["评论 ",a.commentCount]})]}),n.jsx("div",{className:"zhihu-detail-content",children:a.content.split(`
`).map((r,c)=>r.trim()===""?n.jsx("div",{className:"zhihu-detail-gap"},c):n.jsx("p",{className:"zhihu-detail-p",children:r},c))}),a.comments&&a.comments.length>0&&n.jsxs("div",{className:"zhihu-detail-comments",children:[n.jsxs("div",{className:"zhihu-detail-comments-title",children:["精选评论（",a.comments.length,"）"]}),a.comments.slice(0,10).map((r,c)=>n.jsxs("div",{className:"zhihu-detail-comment",children:[n.jsxs("div",{className:"zhihu-detail-comment-head",children:[n.jsx("span",{className:"zhihu-detail-comment-author",children:r.author}),n.jsxs("span",{className:"zhihu-detail-comment-vote",children:[r.voteCount,"赞"]})]}),n.jsx("div",{className:"zhihu-detail-comment-content",children:r.content})]},c))]}),a.link&&n.jsxs("a",{className:"zhihu-detail-link",href:a.link,target:"_blank",rel:"noreferrer",children:[n.jsx(yo,{})," 查看原回答"]}),n.jsx("button",{className:"zhihu-detail-close",onClick:()=>e(null),children:"关闭"})]})})]})}const gs=Array.from({length:16},(t,e)=>2020+e);function Ge(t,e){return new Date(t,e,0).getDate()}function Cs(t,e){const o=Ge(t,e);return[{values:gs.map(a=>({label:`${a}年`,value:a}))},{values:Array.from({length:12},(a,s)=>({label:`${s+1}月`,value:s+1}))},{values:Array.from({length:o},(a,s)=>({label:`${s+1}日`,value:s+1}))}]}function fe({label:t,value:e,onChange:o}){const[a,s]=i.useState(!1),[r,c]=i.useState([e.year(),e.month()+1,e.date()]),d=()=>{c([e.year(),e.month()+1,e.date()]),s(!0)},l=u=>{let[p,h,f]=u;const x=Ge(p,h);f>x&&(f=x),c([p,h,f])},m=()=>{const u=r[0],p=String(r[1]).padStart(2,"0"),h=String(r[2]).padStart(2,"0");o(U(`${u}-${p}-${h}`)),s(!1)};return n.jsxs("div",{className:"set-range-col",children:[n.jsx("label",{children:t}),n.jsx("button",{type:"button",className:"wheel-date-trigger",onClick:d,children:e.format("YYYY/MM/DD")}),a&&n.jsx("div",{className:"ev-picker-overlay",onClick:u=>{u.stopPropagation(),s(!1)},children:n.jsxs("div",{className:"ev-picker-modal",onClick:u=>u.stopPropagation(),children:[n.jsx("div",{className:"ev-picker-body",children:n.jsx(Tt,{columns:Cs(r[0],r[1]),selected:r,onChange:l})}),n.jsxs("div",{className:"ev-picker-foot three",children:[n.jsx("button",{type:"button",onClick:u=>{u.stopPropagation(),s(!1)},children:"取消"}),n.jsx("button",{type:"button",onClick:u=>{u.stopPropagation();const p=U();c([p.year(),p.month()+1,p.date()])},children:"今天"}),n.jsx("button",{type:"button",className:"primary",onClick:u=>{u.stopPropagation(),m()},children:"设置"})]})]})})]})}function nn({icon:t,label:e,desc:o,value:a,badge:s,onClick:r,danger:c,right:d}){return n.jsxs("button",{type:"button",className:`set-row${c?" danger":""}${r?"":" static"}`,onClick:r,disabled:!r,children:[t&&n.jsx("span",{className:"set-row-ico",children:t}),n.jsxs("span",{className:"set-row-main",children:[n.jsxs("span",{className:"set-row-label",children:[e,!!s&&s>0&&n.jsx("em",{className:"set-row-badge",children:s})]}),o&&n.jsx("span",{className:"set-row-desc",children:o})]}),a!==void 0&&n.jsx("span",{className:"set-row-value",children:a}),d??(r?n.jsx(Yn,{className:"set-row-arrow"}):null)]})}function gt({on:t,onChange:e}){return n.jsx("span",{role:"switch","aria-checked":t,className:`switch-mini${t?" on":""}`,onClick:o=>{o.stopPropagation(),e(!t)},children:n.jsx("span",{className:"knob"})})}function xs(){return n.jsxs("svg",{viewBox:"0 0 1024 1024",width:"1em",height:"1em",fill:"#ff2d78","aria-hidden":"true",children:[n.jsx("path",{d:"M672 64H352c-52.9 0-96 43.1-96 96v704c0 52.9 43.1 96 96 96h320c52.9 0 96-43.1 96-96V160c0-52.9-43.1-96-96-96z m32 800c0 17.6-14.4 32-32 32H352c-17.6 0-32-14.4-32-32V160c0-17.6 14.4-32 32-32h320c17.6 0 32 14.4 32 32v704z"}),n.jsx("path",{d:"M128 320a32 32 0 0 1 32 32v320a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32zM896 320a32 32 0 0 1 32 32v320a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z"})]})}function Xe({open:t,onClose:e,ns:o,setNs:a,userId:s}){const{message:r}=fn.useApp(),{syncNotifySettings:c}=Sn(),d=async()=>{if(Oe(o),s){const u=await c(o);r.success(u?"通知设置已保存并同步到云端":"已保存到本机，云端同步失败")}else r.success("通知设置已保存到本机");e()},l=async()=>{if(!zn(o))return r.warning("请先填写 ServerChan SendKey");const u=await Ye("智能日历 · 通道测试","这是一条测试消息，说明「事件提前通知」已可推送到微信。");u.ok?r.success(u.msg):r.error(u.msg)},m=async()=>{if(!Wn(o))return r.warning("请先填写钉钉机器人 Webhook");const u=await Ve("智能日历 · 通道测试","这是一条测试消息，说明「事件提前通知」已可推送到钉钉。");u.ok?r.success(u.msg):r.error(u.msg)};return n.jsx(cn,{open:t,onCancel:e,footer:null,title:"消息通知",width:560,styles:{body:{maxHeight:"70vh",overflowY:"auto"}},children:n.jsxs("div",{className:"notify-form",children:[n.jsx("div",{className:`notify-cloud-hint${s?" on":""}`,children:s?n.jsxs(n.Fragment,{children:[n.jsx(be,{})," 已登录，设置自动同步到云端，登录同一账号的设备互通"]}):n.jsxs(n.Fragment,{children:[n.jsx(je,{})," 未登录，设置仅保存在本机（登录后自动同步）"]})}),n.jsxs("div",{className:"notify-panel",children:[n.jsxs("div",{className:"notify-panel-head",children:[n.jsx(ke,{}),n.jsx("span",{children:"邮件通知"})]}),n.jsx("label",{children:"接收邮箱（可填多个，用英文逗号分隔）"}),n.jsx("textarea",{rows:2,value:o.emailTarget,placeholder:"me@gmail.com, 123456@qq.com",onChange:u=>a({...o,emailTarget:u.target.value})}),n.jsx("label",{children:"EmailJS 服务 ID"}),n.jsx("input",{value:o.emailjsServiceId,placeholder:"service_xxx",onChange:u=>a({...o,emailjsServiceId:u.target.value})}),n.jsx("label",{children:"EmailJS 模板 ID"}),n.jsx("input",{value:o.emailjsTemplateId,placeholder:"template_xxx",onChange:u=>a({...o,emailjsTemplateId:u.target.value})}),n.jsx("label",{children:"EmailJS Public Key"}),n.jsx("input",{value:o.emailjsPublicKey,placeholder:"public_xxx",onChange:u=>a({...o,emailjsPublicKey:u.target.value})})]}),n.jsxs("div",{className:"notify-panel",children:[n.jsxs("div",{className:"notify-panel-head",children:[n.jsx(bo,{}),n.jsx("span",{children:"微信推送"})]}),n.jsx("label",{children:"ServerChan SendKey（方糖）"}),n.jsx("input",{value:o.wechatSendKey,placeholder:"SCTxxxxx",onChange:u=>a({...o,wechatSendKey:u.target.value})}),n.jsx("button",{className:"notify-test",onClick:l,children:"发送测试消息"})]}),n.jsxs("div",{className:"notify-panel",children:[n.jsxs("div",{className:"notify-panel-head",children:[n.jsx(jo,{}),n.jsx("span",{children:"钉钉推送"})]}),n.jsx("label",{children:"钉钉机器人 Webhook 地址（含 access_token=...）"}),n.jsx("input",{value:o.dingtalkWebhook,placeholder:"https://oapi.dingtalk.com/robot/send?access_token=xxx",onChange:u=>a({...o,dingtalkWebhook:u.target.value})}),n.jsx("label",{children:"加签密钥（安全设置选了「加签」时填写）"}),n.jsx("input",{value:o.dingtalkSecret,placeholder:"SECxxxxxxxx",onChange:u=>a({...o,dingtalkSecret:u.target.value})}),n.jsx("button",{className:"notify-test",onClick:m,children:"发送测试消息"})]}),n.jsxs("button",{className:"notify-save",onClick:d,children:[n.jsx(ko,{})," 保存通知设置"]})]})})}async function Mt(t){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(t),!0}catch{}try{const e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.top="-9999px",e.style.left="0",e.style.opacity="0",document.body.appendChild(e),e.focus(),e.select();const o=document.execCommand("copy");return document.body.removeChild(e),o}catch{return!1}}const At="event-shares";async function ys(t,e){const o=un();if(!o)return{ok:!1,error:"未配置云同步，请先到「云同步」中设置 Supabase"};try{const{data:a}=await o.auth.getUser();if(!a.user)return{ok:!1,error:"请先登录云同步账号再分享数据"};const s=[];for(const g of t){const v=g.images&&g.images.length?await it(g.images):g.images;s.push({...g,images:v??g.images})}const r={app:"smart-calendar",version:1,createdAt:new Date().toISOString(),rangeStart:e.rangeStart,rangeEnd:e.rangeEnd,exportTime:e.exportTime,count:s.length,events:s},c=typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now().toString(36),d=`${c}.json`,{data:l,error:m}=await o.storage.from(At).upload(d,JSON.stringify(r),{contentType:"application/json",upsert:!0,cacheControl:"0"});if(m)return{ok:!1,error:"分享数据上传失败："+(m.message||"")};if(!l)return{ok:!1,error:"分享数据上传失败：服务端未返回文件信息"};const{data:u}=o.storage.from(At).getPublicUrl(l.path),p=u.publicUrl||"",h=typeof location<"u"?location.origin:"https://okydd.github.io",f=typeof location<"u"?location.pathname:"/smart-calendar/",x=`${h}${f}#/share/${c}`;return{ok:!0,result:{id:c,url:p,viewerUrl:x}}}catch(a){return{ok:!1,error:"分享数据上传失败："+((a==null?void 0:a.message)??"网络异常")}}}async function bs(t){const e=un();if(!e)return null;try{const{data:o,error:a}=await e.storage.from(At).download(`${t}.json`);if(a||!o)return null;const s=await o.text();return JSON.parse(s)}catch{return null}}async function Qe(t){const{events:e,start:o,end:a,userId:s,message:r,onNeedConfig:c}=t,d=e.filter(g=>{if(g.deleted)return!1;const v=U(g.date);return v.isValid()&&!v.isBefore(o,"day")&&!v.isAfter(a,"day")});if(!d.length){r.warning("所选日期范围内没有事件");return}if(!Dn()){r.warning("请先在「消息通知」里配置接收邮箱与 EmailJS 参数"),c();return}const l=o.format("YYYY年M月D日"),m=a.format("YYYY年M月D日"),u=U().format("YYYY年M月D日 HH:mm"),p=Ta(d,{rangeStart:l,rangeEnd:m,exportTime:u});if(s){const g=await ys(d,{rangeStart:l,rangeEnd:m,exportTime:u});if(g.ok&&g.result){const v=g.result,j=[p,"","────────────",`🔒 以下分享内容均需访问密码：${Nt}`,"","📎 完整事件在线查看（含下载 JSON）：",v.viewerUrl,"（在密码保护页面内点击「下载JSON」即可获取完整数据）"].join(`
`)+De,w=await ct("智能日历 数据导出",j);await Mt(v.viewerUrl),w.ok?r.success(`已发送 ${d.length} 条事件到邮箱，在线查看链接已复制`):r.error(w.msg||"邮件发送失败");return}r.error(g.error||"上传云端失败，无法生成在线链接");return}const h=Ue(d,{rangeStart:l,rangeEnd:m,exportTime:u}),f=Aa(d,{rangeStart:l,rangeEnd:m,exportTime:u}),x=await ct("智能日历 数据导出",h,{html:f});x.ok?r.success("已把完整清单发送到邮箱（登录后可附带在线查看链接）"):r.error(x.msg||"邮件发送失败")}const js=[{version:"V1.9.23",date:"2026-08-20",title:"知乎模块接入 75 篇真实高赞数据（含正文+评论）",summary:"「知乎」模块由 6 条示例占位数据升级为 75 篇真实高赞回答（全部 ≥1万赞，来自 zhihu-cli 登录态 API 真实采集，非转载、非虚构）。src/data/zhihu.ts 改由 scripts/gen-zhihu-ts.mjs 从 data/zhihu-db.json 自动生成：每条含完整正文、知乎原文链接、分级（SSS≥10万 / SS≥5万 / S≥2万 / A≥1万）与精选评论（按赞排序、前 10 条展示）。详情弹窗新增分级徽章、评论总数与精选评论区。最高赞为黛西巫巫《你有哪些提升自我的好习惯？》（50万赞）。",changes:[]},{version:"V1.9.22",date:"2026-08-19",title:"新增底部导航「知乎」模块（高赞回答收藏）",summary:"底部导航由 3 项扩展为 4 项，从左到右为：日历 / 思考题 / 知乎 / 设置。新增「知乎」页（/zhihu，ZhihuPage）：从本地收藏数据 src/data/zhihu.ts 读取回答，仅展示 voteUp（点赞数）> 10000 的条目，并按点赞从高到低排列（带排名序号）；列表卡片显示问题、答主、点赞数与摘要，点击弹出详情查看完整正文，可附原文链接跳转。数据为本地收藏、不进云同步，教师直接编辑 src/data/zhihu.ts 增删即可（已附示例占位数据）。",changes:[]},{version:"V1.9.21",date:"2026-08-19",title:"事件详情删除/取消按钮清晰化（背景块+边框）",summary:"事件详情页（EventView）底部「删除」「取消」按钮原用 .ev-btn-gray 依赖失效的 --c-text-gray 变量，浅色下几乎不可辨。改为：①「取消」= 浅灰背景色块（#eef0f4 底 + #525866 字 + 1px #e2e5ec 边）；②「删除」= 红色危险样式（#fff1f0 淡红底 + #fa5252 红字 + 1px #ffc9c4 红边），与取消明显区分。删除按钮 className 由 ev-btn-gray 改为 ev-btn-danger，取消保留 ev-btn-gray。新增对应 :active 与深色模式配色。",changes:[]},{version:"V1.9.20",date:"2026-08-17",title:"日期锚点：今日蓝底方块 + 选中 1px 淡蓝边框",summary:"修正 V1.9.19 对日期锚点的过度统一：今日日期锚点恢复「蓝色背景方块」（--c-primary 实心 + 白字，始终保留，与卡片高亮的淡蓝边框区分）；点击切换到的其他选中日期锚点用「1px 淡蓝色边框」(--c-primary-light) + 极浅蓝底表示。卡片高亮规则（1px 淡蓝边框、全屏最多一张）保持不变。",changes:[]},{version:"V1.9.19",date:"2026-08-17",title:"思考题高亮统一为 1px 淡蓝边框 + 全屏最多一张",summary:"思考题列表高亮规则收敛：① 左侧日期锚点与具体思考题卡片统一为 1px 淡蓝色边框（--c-primary-light）+ 极浅蓝底，今日不再用蓝底方块、选中不再用 2px 边框。② 全屏任意时刻最多只有一张卡片显示淡蓝边框——仅「当前高亮日期」（默认今天，若无今日题则最近日期；点击日期可切换）对应的第一张卡片高亮，今日卡片与选中日期卡片不会同时出现淡蓝边框，彻底避免多张被选中的淡蓝边框效果。",changes:[]},{version:"V1.9.18",date:"2026-08-17",title:"思考题卡片按日期呼应高亮",summary:"思考题列表卡片与左侧日期锚点状态呼应：今日日期的卡片显示蓝色边框+浅蓝底（呼应今日蓝底方块）；点击切换到的其他选中日期的卡片显示淡蓝色边框（呼应选中态淡蓝边框）。",changes:[]},{version:"V1.9.17",date:"2026-08-17",title:"版本升级弹窗垂直居中",summary:"「发现新版本」升级确认弹窗（antd modal.confirm）加入 centered，从屏幕上方改为屏幕正中央显示。",changes:[]},{version:"V1.9.16",date:"2026-08-17",title:"思考题列表日期锚点：今日蓝底、选中淡蓝边框",summary:"思考题列表左侧日期锚点中，今日日期保留蓝色背景方框；点击切换到的其他选中日期改用淡蓝色边框（白底浅蓝）表示，与今日蓝底区分。",changes:[]},{version:"V1.9.15",date:"2026-08-17",title:"思考题详情第一行按钮宽度与间距优化",summary:"「未完成 / 已完成」切换段加宽、选项内边距收紧、禁止文字折行，并与「编辑」按钮保持合适间距，避免文字被挤成两行。",changes:[]},{version:"V1.9.14",date:"2026-08-17",title:"思考题详情第一行按钮高度归一",summary:"思考题详情第一行（完成状态切换 + 编辑）去掉外层白色卡片包裹，改为普通按钮高度的横向文字分段，「未完成 / 已完成」并排显示，与「编辑」按钮同高。",changes:[]},{version:"V1.9.13",date:"2026-08-17",title:"思考题详情去除「完成状态」文字标签",summary:"思考题详情第一行左侧的完成状态分段控件去掉「完成状态」文字标签，仅保留「未完成 / 已完成」切换；状态块内切换居中显示以平衡布局。",changes:[]},{version:"V1.9.12",date:"2026-08-17",title:"思考题详情两行按钮 + 备注收起/内部滚动 + 列表去备注/日期短格式",summary:"四处改动：① 思考题列表不再显示备注文字，仅显示日期（「8月18日」短格式，去掉星期）+ 标题。② 详情页备注默认收起，点击「备注」折叠头展开，展开后用内部上下滚动条查看（.q-detail-note-body max-height+overflow，不带动整体弹窗移动）。③ 详情底部按钮改为两行：第一行左=完成状态（复用日历事件的 evv-toggle 分段切换，未完成/已完成 tab 切换）、右=编辑；第二行左=删除、右=取消。④ 列表日期统一为「8月18日」结构。",changes:[]},{version:"V1.9.11",date:"2026-08-17",title:"搜索集中到设置 + 思考题完成淡绿边框 + 右下角绿色可拖动 FAB",summary:"三处改动：① 搜索收口到「设置」页——新增「搜索」分组，含「搜索日历 / 搜索思考题」分段切换（antd Segmented），实时过滤并内联展示结果；日历结果点击用全局 EventView 详情，思考题结果点击跳转思考题页并自动打开对应详情（CalendarContext 新增 focusQuestionId 意图一次性消费）。日历页左侧抽屉与思考题页顶部双搜索均移除，全局 search 状态不再被任何输入写入。② 思考题完成状态由右上角绿色方块改为卡片淡绿色边框 + 淡绿底（.q-card.done），并在日期旁显示「已完成」小标签。③ 思考题「增加」按钮改为右下角可拖动的绿色悬浮 FAB（复用 Fab 组件，新增 green 变体：绿色渐变背景 + 绿色投影，拖动/双击复位逻辑不变）。",type:"feat",rollback:!0},{version:"V1.9.10",date:"2026-08-17",title:"思考题详情：完成/编辑/删除三按钮一行均布 + X 突出 + 去掉议题日期前缀 + 弹窗居中",summary:"思考题详情弹层（QuestionsPage）四处调整：① 取消 iOS 开关，恢复为「完成」按钮（.q-btn.done，绿色渐变实心，文案「标注完毕/取消标注」），与「编辑」「删除」三按钮在同一行 flex:1 平均分布（.q-actions）。② 右上角关闭 X 改为 32px 圆形灰底背景、18px 图标、加 z-index，明显且不与长标题重叠；详情题目 .q-detail-title 加 padding-right:36px 预留 X 空间。③ 详情日期前缀「议题日期：」四字删除，仅保留日历图标 + 日期（.q-detail-meta）。④ Modal 加 centered 属性改为垂直居中显示（不再贴屏幕上方）。",type:"feat",rollback:!0},{version:"V1.9.9",date:"2026-08-17",title:"思考题详情美化：绿色方块加对钩 + 详情去标题 + 完成开关 + 高级按钮",summary:"思考题模块四处升级：① 题卡右上角完成状态由纯绿方块（12px）改为 18px 圆角绿方块并内嵌白色 CheckOutlined 对钩图标（.q-dot.done），更直观表示「已完成」。② 详情弹层去掉「思考题详情」文字标题（Modal title=null，关闭叉仍保留），内容重排为：最上=题目(q-detail-title)→下一行=「议题日期：…」带日历图标(added CalendarOutlined)→有备注才显示「备注」信息块(.q-detail-note)。③ 「标注完毕/取消标注」文字按钮改为 iOS 风格开关切换(.q-switch)，左侧「完成状态」标签 + 实时「未完成/已完成」状态文字，点开关在两者间切换(toggleDone)。④ 编辑/删除按钮重做(.q-btn)：编辑=主题蓝紫渐变实心主按钮(.q-btn.edit)，删除=白底红字红描边(.q-btn.danger)，均加圆角/投影/按压缩放，质感更高级。",type:"feat",rollback:!0},{version:"V1.9.8",date:"2026-08-17",title:"思考题：删除蓝色状态方块 + 顶部去掉标题 + 标题两行省略号",summary:"思考题页（QuestionsPage）三处精简：① 右上角蓝色「思考中」状态方块删除——它对所有未完成项都是蓝色、不区分任何东西、无实际作用；仅保留完成的绿色小方块（q.done 时才渲染 .q-dot.done）。② 顶部「思考题」汉字标题删除（底部 Tab 已有菜单名），头部只保留「+ 增加」按钮右对齐。③ 题卡标题 .q-card-title 加 -webkit-line-clamp:2 两行截断 + 省略号。同步删除废弃的 .q-title CSS。",type:"feat",rollback:!0},{version:"V1.9.7",date:"2026-08-17",title:"已完成卡片默认显示本周 + 向下按钮展开/收起其余",summary:"把「已完成」卡片默认行为改为：非按月查看模式下默认只显示「本周」已完成事件（doneThisWeek，按周一~周日 isBefore/isAfter 判定），本周之外的已完成/已过期事件（doneRest）默认隐藏，卡片底部用与顶部日历同款的 .month-toggle/.month-toggle-btn（下箭头「展开全部（N）」/上箭头「收起」）控制展示或收起，复用顶部日历 展开整月/收起 的视觉与交互。若本周无已完成事件则显示「暂无已完成事件」。范围标签随状态在「本周」/「全部」间切换、计数徽章同步。按月查看模式（独立 doneMonthView）仍保留：进入后直接列出该月全部已完成/已过期，无本周/全部切换。doneExpanded 状态重新引入（默认 false）。",type:"feat",rollback:!0},{version:"V1.9.6",date:"2026-08-17",title:"已完成卡片头部对齐周提醒结构 + 支持按月查看切换日期",summary:"把日历底部「已完成」卡片头部从原来的折叠按钮（.done-collapse）改为与周提醒完全一致的标题结构：图标(CalendarOutlined)+「已完成」标签+范围+计数，并复用已预留的 .remind-header.done 绿色徽章。新增独立的 doneMonthView 状态，点「按月查看」可切换查看指定月份的已完成/已过期事件（左右箭头翻月、返回全部），与月提醒的 monthView 完全解耦。卡片始终渲染（空也显示框），列表直接展示（不再折叠）。移除 doneExpanded 折叠状态与旧的 allArchivedEvents（改为 doneArchivedEvents）。",type:"feat",rollback:!0},{version:"V1.9.5",date:"2026-08-17",title:"已完成卡片改为日历底部统一单卡片（始终显示，收录全部完成/过期）",summary:"修正 V1.9.4 的缺陷：此前「已完成」做成日/周/月各一段的小块，且完成/过期事件多在过去日期、不在「今天+本周下周+第3/4周」提醒范围内，导致整页看不到「已完成」卡片。改为：日历最底部固定一个 `.done-card` 统一卡片，列出全部「已完成」与「已过期」事件（取自 filteredEvents 全量，不受提醒范围限制；按月查看时取当月），默认展开、始终渲染（即使为空也显示「已完成（0）」框）。日/周/月主列表只显示活动事件（未完成且日期≥今天），不再各自带小块。`doneExpanded` 默认改 true。新增组件级 `allArchivedEvents`(isArchived 全量倒序)。",type:"fix",rollback:!0},{version:"V1.9.4",date:"2026-08-17",title:"月提醒底部「已完成」卡片同时收纳已过期事件（方案A）",summary:"日/周/月三段提醒保持原结构；每段主列表只显示活动事件（未完成且日期≥今天），「已完成」或「已过期」(日期早于今天且未完成) 的事件统一归到该段底部的可折叠「已完成（N）」卡片，复用同一 renderEventRow 保持原样式与点击功能。新增组件级 isArchived 判定（done 或 日期早于今天）。day/week 段此前未完成项内联显示、现也移入底部卡片，与月段行为一致。",type:"feature",rollback:!0},{version:"V1.9.3",date:"2026-08-17",title:"思考题页重设计（方案B）：左平铺日期锚点 + 顶部双搜索 + 列表无按钮、详情才出操作",summary:"按用户要求重做「思考题」页布局：① 左侧不再嵌套「月→日」，改为平铺日期+星期锚点（窄 76px，点日期平滑滚动定位，当前日期蓝紫高亮）。② 顶部增加「按日期」(type=date) 与「按关键词」双搜索，带「清除」。③ 右侧所有思考题连续平铺（按日期倒序），列表项不再显示任何操作按钮，只含日期标签+标题+内容预览+右上角状态小方块（蓝=思考中 / 绿=已完成），状态不占额外空间、题卡左侧无色块。④ 点卡片弹出「思考题详情」Modal，操作按钮（标注完毕/修改/删除）只在详情里出现；修改复用原录入弹窗。数据仍为独立 kind='question'，不进日历/提醒。",type:"feature",rollback:!0},{version:"V1.9.2",date:"2026-08-17",title:"月提醒已完成下移可折叠 + 办事清单改为「思考题」独立模块",summary:"① 月提醒：把已完成事件从主列表移到底部独立「已完成（N）」区块，默认收起、可点击展开，复用同一 renderEventRow 保持原功能与样式（日历/周提醒不变）。② 新增独立数据类型 kind='question'：types.ts 增加 kind 字段，merge.ts 三处映射加 kind，云端 calendar_events 加 kind text 列（默认 event，迁移脚本 migrate-kind.mjs 已执行）。CalendarContext 的 events 过滤排除 kind==='question'，使思考题不进日历/周月提醒/今天角标/搜索。③ 原「办事清单」整页替换为「思考题」(QuestionsPage)：左侧按月→日两级可折叠日期目录，点题目在右侧显示详情（题目/议题日期/思考内容/状态）；提供 增加/修改/删除/状态标注(思考完毕) 按钮，录入弹窗含题目、议题日期(默认今天)、思考内容、是否思考完毕。App 底部标签「办事清单」→「思考题」，路由 /todos 指向 QuestionsPage，删除旧 TodoPage。",type:"feature",rollback:!0},{version:"V1.9.1",date:"2026-08-15",title:"修复自动更新被永久熔断（WebView sessionStorage 复用致额度耗尽、用户卡在旧版本）",summary:"用户多次反馈部署后界面「还是老样子」，确认线上 V1.9.0 已含全部所需样式（.remind-rel 蓝字、.remind-rel-time 浅蓝药丸背景 #3b7cff1a、.remind-date/.remind-time.expired 灰字），根因是设备缓存了旧版本未更新。RELOAD_GUARD 的刷新额度存于 sessionStorage，而手机 APK 的 WebView 长期复用该 sessionStorage，导致 appReloadCount 永久停在 MAX=2、自动更新被永久熔断、用户永远停在旧版本。修复：新增 reset()/resetFor(target) 方法，在 SW updatefound（发现新 SW）与 checkAppUpdate 检测到真正新版本时重置额度（resetFor 按目标版本去重，避免 CDN 传播期对同一版本反复重置失去熔断保护），确保本次及以后部署能真正推送到设备。前端渲染逻辑与 V1.9.0 一致。",type:"fix",rollback:!0},{version:"V1.9.0",date:"2026-08-15",title:"日历+办事清单：今天蓝色药丸 + 过期/完成事件日期时间灰显删除线",summary:"用户两点诉求：① 今天的事件在时间前加蓝色「今天」药丸（与明天/后天一致）；② 已过期与已完成的事件，日期与时间均灰色字 + 删除线。改动：TodoPage.relLabel 增加 today 分支(字面「今天」)，已完成不显示药丸改灰显日期；CalendarPage.relLabel 加 !e.done 抑制已完成蓝色药丸、日提醒今天事件加「今天」药丸；日期 span 均加 struck/expired 类；时间 span 加 expired 类。CSS 新增 .remind-date.struck/.expired 与 .remind-time.expired 的 text-decoration:line-through，并把 .remind-time.struck/.day-time.struck 合并规则的删除线补上；新增 .remind-rel-time .day-time 中性化让日提醒药丸内时间去自带蓝底。标题删除线沿用既有 .remind-title.struck。",type:"fix",rollback:!0},{version:"V1.8.9",date:"2026-08-14",title:"办事清单：后天/明天药丸显示字面「明天/后天」+ 已完成事件日期统一灰显",summary:"用户反馈 V1.8.7/1.8.8 部署后办事清单仍是老样子。排查根因：renderItem 的 relLabel 误用 dateLabel，而 dateLabel 对后天返回「月日 星期」(如 8月16日 周六) 而非「后天」二字，导致后天事件仍显示日期与星期；周提醒用的是另一函数 relativeDayLabel 直接返回「后天」，两者未对齐。修复：① relLabel 改为字面返回「明天/后天」(对齐周提醒)；② 已完成(done)事件不再显示蓝色相对药丸，改回普通日期文本(由 .remind-date 灰显)，确保已完成事件的日期、时间(struck)、完成状态(done)三处统一灰显。时间灰显由 .remind-time.struck/.expired(#8a8f9e) 负责，状态由 .todo-days.done/.expired(#8a8f9e) 负责。",type:"fix",rollback:!0},{version:"V1.8.8",date:"2026-08-14",title:"办事清单「已完成」状态文字改为灰色（修复无效 CSS 变量致变黑）",summary:"用户反馈办事清单中已完成事件的日期、时间、完成状态应用灰色字而非黑色。排查：日期（.remind-date 硬编码 #8a8f9e）与时间（.remind-time.struck 硬编码 #8a8f9e）本就灰显；但完成状态 .todo-days.done 与 .todo-days.expired 用了浅色 :root 中自引用的无效变量 --c-text-gray: var(--c-text-gray)，在浅色主题下解析失败、回退为继承的近黑色文字，故「已完成」三个字显示为黑色。修复：将 .todo-days.done/.expired 的颜色改为硬编码 #8a8f9e，与日期、时间一致，确保已完成/过期事件的日期、时间、完成状态三处统一灰显。",type:"fix",rollback:!0},{version:"V1.8.7",date:"2026-08-14",title:"办事清单：明天/后天蓝色药丸标签 + 完成/过期事件第二行灰显",summary:"用户反馈办事清单中，明天/后天事件没有像日历周提醒那样把「明天/后天」以蓝色药丸（背景色块）加在时间前；且已完成或已过期事件的第二行（日期、时间、完成状态）仍显示蓝色、未灰显。修复：① renderItem 对明天/后天事件复用周提醒的 .remind-rel-time/.remind-rel 结构，渲染带蓝色字 + 浅蓝背景色块的「明天/后天」药丸置于时间前（其余日期仍按原样显示灰色日期+时间）；② 修正过期（未完成但日期已过）事件第二行不灰显的缺陷：time 增加 expired 类并由 CSS .remind-time.expired 强制灰显（覆盖默认蓝色），todo-days 补 expired 类使「已过期」状态提示变灰（此前仅 done 类变灰、expired 类从未被添加，故过期事件一直显示蓝色「已过期」）。已完成（done）事件本已通过 struck/done 类灰显，保持不变。",type:"fix",rollback:!0},{version:"V1.8.6",date:"2026-08-14",title:"部署传播期白屏自愈：chunk 加载失败自动重试并弹恢复面板",summary:"用户反馈 V1.8.5 部署后打开 APP 直接白屏、且连错误面板都没有。根因不是代码崩溃，而是 GitHub Pages 多节点 CDN 在部署后存在传播不一致窗口：新 index.html 与入口 chunk 先发布，而入口依赖的某个共享/懒加载 chunk（如 index-DNzFMgCo.js）滞后约数分钟才上线；用户在此期间打开，入口动态 import 该缺失 chunk → 404 → 白屏。由于 React 已挂载（#root 有内容），旧兜底面板被 childElementCount>0 判断抑制，故「连错误面板都没有」。修复：① 内联兜底面板新增「可恢复加载错误」识别（资源加载失败/动态导入/Loading chunk/ChunkLoadError/模块脚本/Failed to fetch dynamically），当捕获到此类错误且在线时，先以纯网络全新加载（__freshLoad，跳过 SW）自动重试一次实现自愈；② 已挂载却出现可恢复致命错误时也弹出浮层恢复面板，避免静默白屏；③ 重试仅限一次（sessionStorage __autoRetry 熔断），仍失败才显示面板。此改动不改变正常渲染路径，仅在部署传播窗口或弱网偶发缺 chunk 时生效，用户通常无感即恢复。APK 为在线壳，网页更新即生效，重开 APP 即可。",type:"fix",rollback:!0},{version:"V1.8.5",date:"2026-08-14",title:"修复多提醒事件经云同步后其余提醒被取消（reminder 字段未同步）",summary:"用户反馈新建事件并设置多个提醒后，最早一个响完，其余提醒被后台默认取消、不再生效。根因：云同步层 src/sync/merge.ts 的 RemoteRow / rowToEvent / eventToRow 从未映射 reminder 字段，且云表 calendar_events 也缺该列。云同步（mergeEvents 以云端行胜出，含时间戳相同分支 winner=云端行）会把事件原有的 reminder 整体清空；事件变更随即触发 syncScheduledReminders 调用 cancelAllScheduled() 把已排期的原生通知全部取消，并因 reminder 为空不再重排，于是后续提醒全部失效。修复：① 云端表新增 reminder jsonb 列（默认 '[]'）；② merge.ts 的 RemoteRow 增加 reminder 字段、rowToEvent/eventToRow 双向映射；③ mergeEvents 增加提醒自愈（任一方有提醒而胜出方无，则补回并写回），避免 LWW 静默丢提醒。本地存储本就保留 reminder，故未登录/纯本地用户不受影响；已登录用户升级后新建或编辑过的事件将正确保留多个提醒并全部按原生通知响铃。注意：在修复前已被旧同步清掉提醒的存量事件，需重新编辑保存一次以把提醒写回云端。",type:"fix",rollback:!0},{version:"V1.8.4",date:"2026-08-11",title:"日提醒/今天待办改为后台静默同步，不再前台闪「同步中」",summary:"用户反馈日提醒与今天待办两张卡片会「经常自动刷新同步」、出现「同步中…」转圈。根因：SyncContext 每 60 秒轮询一次（页面可见且已登录即跑），且切回前台/联网/进入日历页都会触发 syncNow()，每次都把全局 status 置为 syncing，而今天待办卡片在「今天」为空时会显示「同步中…」转圈，于是每过一会儿就闪一下；日提醒卡片虽无转圈，也被这三条高频同步反复重渲染、且每次进页都重拉。修复：① 把同步拆为「可见同步」（仅用户主动点「立即同步」时显示同步状态）与「后台静默同步」（轮询/获焦/联网/进入页面/本地变更防抖推送均走此通道，全程不切换可见状态，前台无任何提示）；② 轮询间隔由 60 秒放宽到 5 分钟，降低频率；③ 今天待办卡片删除「同步中…」前台提示，始终显示中性空态（无事件，或事件已全部完成），数据仍在后台静默同步；④ 日历页（日提醒）进页同步改走静默通道。用户仍可手动点「立即同步」看到同步状态与结果。",type:"fix",rollback:!0},{version:"V1.8.3",date:"2026-08-11",title:"修复页面自动时不时刷新闪动（自动更新机制误触发）",summary:"用户反馈页面已无错误面板，但每个页面会自动时不时刷新闪动。根因：① Service Worker 注册 URL 带 Date.now() 时间戳，每次页面加载都被浏览器当成「不同的 SW」→ 触发 updatefound → 新 SW 激活 → 自动重载；被会话级熔断限制为 2 次，但切回 APP/重新打开（新的 navigation）又来一次，表现为「时不时闪」。② checkAppUpdate 用 version.json 的「构建时间戳」比对版本，而 CDN 多节点传播期可能返回不同时间戳，造成比对横跳、反复重载。修复：① SW 注册改用固定 URL（去掉时间戳），SW 更新改由 updateViaCache:'none' + 构建时注入的 __BUILD_TIME__（每次部署字节不同）自动完成；② 版本比较改用 semver（部署后固定不变，不受 CDN 时间戳抖动影响）；③ 所有自动刷新统一为「纯网络 + 跳过 SW 注册」的 FRESH_LOAD 方式，且 SW updatefound 与 checkAppUpdate 共用同一熔断（RELOAD_GUARD，同会话最多 2 次、间隔≥60s），避免两者叠加成连环刷新；④ 熔断间隔由 15s 放宽到 60s。至此平时（无新部署）页面不再自动刷新，仅在真正发布新版本时一次性平滑更新。",type:"fix",rollback:!0},{version:"V1.8.2",date:"2026-08-11",title:"消除错误面板「偶尔闪一下」+ 自愈合重试",summary:"用户反馈页面不稳定、错误面板偶尔闪过。根因：在线壳 APK 弱网下某个带哈希 JS 包偶发加载失败，SW 兜底返回错误→React 短时未挂载→内联兜底面板在加载间隙一闪而过（旧实现直接替换 #root，且个别 WebView 的 load 事件早于模块执行，导致面板先现、React 后覆盖）。修复：① 错误面板改为「浮层」（append 到 body，不再写 #root），即使短暂出现也不破坏已渲染内容；② main.tsx 在挂载后调用 window.__hideBootFallback 立即移除浮层（自愈合，用户无感）；③ 若失败是「资源加载失败」且在线，自动以纯网络方式（__freshLoad，跳过 SW）重试一次，通常直接恢复、根本不出现面板；④ 轮询检测增加 window.__appReady 早退，避免误报。验证：本地正常渲染 OK；模拟整包崩溃确认 bootFallback 为 body 直接子元素、#root 不被污染；线上（移动 UA，12s 等待）渲染正常（root 10142 字符、__appReady=true、无浮层、无 pageerror）。注：verify-live.mjs 默认等待由 8s 放宽到 12s，避免弱网下误判「异常」。",type:"fix",rollback:!0},{version:"V1.8.1",date:"2026-08-10",title:"修复「清除缓存并重载」后仍在错误面板（旧 SW 兜底错误响应）",summary:"用户反馈点「清除缓存并重载」后仍停在错误面板。根因：该按钮只清了 Cache API，但安卓在线壳 APK 的 WebView 中旧 Service Worker 仍在控制页面；当网络抖动导致新的带哈希 JS 文件请求失败时，SW（network-first）的兜底分支返回 Response.error()，而旧缓存里没有同名新文件，于是整包脚本加载失败、React 永不挂载，刷新后依旧白屏→错误面板。修复：①「清除缓存并重载」改为先 await 旧 SW 注销 + 缓存清空完成，再跳转，并在跳转 URL 写入 sessionStorage 标记 __freshLoad；main.tsx 识别该标记后本次加载跳过 SW 注册与版本自动刷新，以纯网络方式加载，避免被旧 SW 重新接管。② 错误面板增加诊断信息（UA / ServiceWorker 控制状态 / 在线状态 / 文档状态），并改为轮询式检测（文档未加载完成则等待，避免慢网络误报白屏），便于后续若仍失败可直接复制错误定位。③ 复制错误信息默认带上环境信息。本版不改变 V1.8 的首屏无 Capacitor 结论，仅加固恢复路径。",type:"fix",rollback:!0},{version:"V1.8",date:"2026-08-10",title:"白屏修复：Capacitor 移出首屏依赖图 + 三层防白屏兜底",summary:"V1.6 首次引入本地强提醒（localNotify.ts + @capacitor/local-notifications），但 notify.ts / badge.ts / 应用顶层都静态引入了它，加上打包配置把所有 node_modules 兜底并入首屏必加载的 vendor chunk，使 Capacitor 在启动阶段就被求值；在安卓在线壳 APK 的 WebView 中该模块求值抛错，导致整包崩溃、页面白屏（V1.5 不含此依赖故正常）。本版三处修复：① 把纯 localStorage 开关抽到零依赖的 remindPrefs.ts，notify.ts / App.tsx / 提醒设置页改为静态引入 remindPrefs，仅在真正「触发提醒 / 排期 / 设置角标」时才动态 import；badge.ts 顶层的 registerPlugin('BadgePlugin') 也改为惰性执行。② vite manualChunks 对 @capacitor 返回 undefined，交由 Rollup 按可达性放入异步 chunk，首屏静态可达集合已实测不含任何 Capacitor 运行时代码。③ 修复自动更新可能无限刷新的隐患：GitHub Pages 是多节点 CDN，发布传播期内不同节点可能返回不一致的 version.json，旧逻辑会「刷新→版本仍对不上→再刷新」无限循环，页面永远停在空白。现为版本自检与 Service Worker 更新加入统一熔断——同一会话最多自动刷新 2 次、两次间隔至少 15 秒，超限后只静默记录版本号，并对 localStorage/sessionStorage 不可用的环境做了降级。④ 新增两层白屏兜底：main.tsx 顶层 ErrorBoundary 捕获渲染错误，index.html 内联脚本捕获「整包解析/求值失败」这类 React 来不及执行的致命错误，4 秒后自动显示错误详情与「重新加载 / 清除缓存并重载 / 复制错误信息」，任何情况下都不再是纯白板。",type:"fix",rollback:!0},{version:"V1.7",date:"2026-08-10",title:"白屏应急修复：强提醒模块改为动态导入 + 顶层错误边界",summary:"针对 V1.6 出现的启动白屏做第一轮应急处理：App.tsx 不再静态引入 localNotify，改为在提醒排期时动态 import；main.tsx 增加顶层 ErrorBoundary，渲染阶段报错时显示可读错误与「重试」而非白屏。该版本仅覆盖了应用顶层的引用，notify.ts 与 badge.ts 的静态引用未处理，因此白屏未被彻底根除，请优先使用 V1.8。",type:"fix",rollback:!0},{version:"V1.6",date:"2026-08-10",title:"锁屏/后台强提醒接通 + 邮件数据链接统一密码门 + 按钮边框修复",summary:"① 修复事件详情「删除/取消」白底灰框按钮：原 .btn-white-border 被 antd 注入样式覆盖导致看不到边框，改为 .ant-btn.btn-white-border 提高优先级并改用更明显的灰边 #bfbfbf，删除键保留红字。② 接通钉钉式系统级强提醒：在 APP 启动与每次事件增删改/云同步后自动调用 syncScheduledReminders 把未来提醒排期到原生/系统通知（安卓 APK 即使锁屏、后台、被杀也能到点横幅+响铃+振动；Web/PWA 无系统级排期，仅运行时弹通知）；首次启动自动申请通知权限。③ 邮件数据链接统一密码门：导出邮件不再暴露未加密的原始 JSON 公链，仅保留需访问密码 007722 的「完整事件在线查看」页面（其内「下载JSON」同样在密码保护下），访问密码 007722 在邮件中醒目提示。",type:"feature",rollback:!0},{version:"V1.5",date:"2026-08-10",title:"邮件在线查看页重设计（左侧时间导航）+ 白底灰框按钮",summary:"① 邮件「完整事件在线查看」页（ShareView）由单一清单改为「左侧年月日时间导航 + 中间主体事件完整信息」的 master-detail 布局，按年→月分组列出每天及事件数，点选某天即筛选该天全部事件（含标题/重要/已完成/日期/时间/备注/图片），默认「全部日期」展示整个时间段；窄屏自动变为顶部横向日期条；页面明确非日历网格样式。② 事件详情底部「删除」「取消」按钮由灰边框改为白底灰框（white-bg + gray-border），删除按钮保留红色文字提示危险性。",type:"feature",rollback:!0},{version:"V1.4",date:"2026-08-10",title:"灰色按钮框 + 红底白字角标 + 删除事件分类",summary:"① 事件详情「删除」「取消」与导出图片预览「关闭」三个按钮由深色边框改为灰色边框（#bfbfbf）；② 日提醒卡片最右「今」字改为红底白字数字角标（显示今日事件数，QQ 消息式），今天待办卡片标题数字也改为红底白字；③ 移除「事件分类」功能（分类选择器、侧栏按标签筛选、详情分类标签、画布按分类着色全部删除），保留「事件级别」（重要），事件按重要级别着色：重要红、普通蓝；数据模型中 tag 字段保留以兼容已同步事件。",type:"feature",rollback:!0},{version:"V1.3",date:"2026-08-09",title:"淡蓝边框分级 + 深色按钮框 + 版本密码门 + 分享访问密码 + 取消主题外观",summary:"① 常规/已过期/已完成（非重要）事件统一加极细淡蓝边框，日历与办事清单一致，重要事件保持红边不变；② 事件详情「删除/取消」与导出图片预览「关闭」三个按钮加深色边框；③ 版本历史支持自由回退或前进到任意已保留快照的版本，回退前需输入账号登录密码确认（本地确认即可）；④ 分享/数据在线查看链接需访问密码 007722 才能查看，邮件中已附访问密码；⑤ 取消「主题外观」设置，固定常规（浅色）主题，删除「外观」卡片。",type:"feature",rollback:!0},{version:"V1.2",date:"2026-08-09",title:"深色模式 + 事件分类配色",summary:"新增深色模式：设置页「主题外观」可选浅色/深色/自动（跟随系统），全部界面经 CSS 变量重构以适配暗色，月/周/日 Canvas 视图同步切换暗色色板，antd 组件随主题切换暗色算法；新建/编辑事件新增「事件分类」选择器（工作/生活/提醒/重要/学习/社交 六种配色），分类色贯穿事件卡片、待办列表与日历网格。",type:"feature",rollback:!0},{version:"V1.1",date:"2026-08-10",title:"版本回滚体系（Vx.y 版本号 + 改动记录 + 一键回退）",summary:"引入 V主.次 版本号与改动记录；设置页新增「版本历史」可查看每个版本的改动摘要并一键回退到上一版本；每日05:00定时推送保留。部署改为永久保留每个版本的快照（versions/<版本>/），回退即还原该快照。",type:"feature",rollback:!1},{version:"V1.0",date:"2026-08-09",title:"每日05:00定时推送 + 微信风设置 + 边框分级",summary:"自动推送改为真正的每日05:00定时触发（APP运行期间）；设置页提醒/数据改微信风格二级页面（右箭头+返回）；事件边框分级（重要红/今天蓝/其它淡蓝）；状态栏与顶栏渐变融合（theme-color）。",type:"feature",rollback:!1},{version:"V0.9",date:"2026-08-09",title:"微信风格设置二级页 + 搜索上移",summary:"设置页「提醒」「数据」改为带右箭头导航行，点开进入二级页面（渐变顶栏+返回箭头+居中标题）；搜索框上移到导出卡片顶部。",type:"ui",rollback:!1},{version:"V0.8",date:"2026-08-09",title:"每日自动推送（方案A）",summary:"新增后台静默每日推送：登录且已配邮箱时，每天打开APP后把上月1号至今天的数据发到邮箱，页面不暴露任何按钮/提示。",type:"feature",rollback:!1},{version:"V0.7",date:"2026-08-09",title:"状态栏融合 + 淡蓝边框 + 导出精简",summary:"theme-color 改为渐变起始色与手机状态栏融合；日提醒/今天待办边框改淡蓝；导出卡片删除导入json/返回日历按钮，标题与分组对齐。",type:"ui",rollback:!1},{version:"V0.6",date:"2026-08-09",title:"设置页重排 + 导出卡片标题",summary:"设置页顺序调整为账号→导出→关于→数据→提醒；导出卡片加「导出」标题并与按钮拉开间距。",type:"ui",rollback:!1},{version:"V0.5",date:"2026-08-09",title:"删除重复「账号与同步」区",summary:"顶部账号卡片已含登录/同步/退出，删除下方重复区。",type:"ui",rollback:!1},{version:"V0.4",date:"2026-08-09",title:"设置页隐藏顶部渐变导航栏",summary:"设置页改用透明安全区占位，账号邮箱保留在账号卡片。",type:"ui",rollback:!1},{version:"V0.3",date:"2026-08-09",title:"7项体验修正 + 每日导出日期选择器",summary:"办事清单左框修复、今天待办已完成保留蓝边、日提醒已完成置后、顶部色块缩高、设置顶部显账号、新建事件默认选时间、日期选择改齿轮。",type:"fix",rollback:!1},{version:"V0.2",date:"2026-08-09",title:"事件边框分级 + 强提醒 + 版本升级",summary:"边框按重要/今天/已完成/其它分级；新增原生强提醒（铃声+振动+横幅）；新增版本检查与升级进度。",type:"feature",rollback:!1},{version:"V0.1",date:"2026-08-09",title:"智能日历网页版初版",summary:"React+PWA 日历：月/周/日 Canvas 视图、云同步、事件图片托管、分享链接、导出图片/数据。",type:"feature",rollback:!1}],ge={log:js},En="2026-08-20T19:16:16+08:00",$t="V1.9.23",ks=Array.isArray(ge.log)?ge.log:[];function Ss(){return ks.map(t=>({entry:t,current:t.version===$t,canRollback:!!t.rollback&&t.version!==$t}))}function Qn(t){if(!t)return"—";if(t==="dev")return"开发版";const e=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(t);return e?`${e[1]}.${e[2]}.${e[3]} ${e[4]}:${e[5]}`:t}async function Ns(){const t=`./version.json?_=${Date.now()}`;try{const e=new AbortController,o=setTimeout(()=>e.abort(),12e3),a=await fetch(t,{cache:"no-store",signal:e.signal});if(clearTimeout(o),!a.ok)throw new Error(`HTTP ${a.status}`);const s=await a.json(),r=typeof(s==null?void 0:s.version)=="string"?s.version:null;if(!r)throw new Error("版本文件格式异常");return{current:En,latest:r,isLatest:En==="dev"?!0:r===En}}catch(e){const o=e instanceof Error?e.message:String(e);return{current:En,latest:null,isLatest:!0,error:o.includes("abort")?"检查超时，请稍后重试":"网络异常："+o}}}async function Ze(){try{if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistrations();await Promise.all(e.map(o=>o.unregister().catch(()=>!1)))}}catch{}try{if(typeof caches<"u"){const e=await caches.keys();await Promise.all(e.map(o=>caches.delete(o).catch(()=>!1)))}}catch{}try{localStorage.removeItem("appVersion"),sessionStorage.removeItem("appReloading"),sessionStorage.removeItem("appBypassCache")}catch{}const t=location.href.split("#")[0].split("?")[0];location.replace(`${t}?_nocache=${Date.now()}${location.hash}`)}function Rt(t,e,o,a,s,r){const c=Math.max(0,Math.min(r,a/2,s/2));t.beginPath(),t.moveTo(e+c,o),t.arcTo(e+a,o,e+a,o+s,c),t.arcTo(e+a,o+s,e,o+s,c),t.arcTo(e,o+s,e,o,c),t.arcTo(e,o,e+a,o,c),t.closePath()}const kn='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',Zn=750,on=40,ws=230,pn=ws+30,$n=80,nt=92,Ct=80;function no(t,e){const a=t.length,s=Zn-on*2,r=$n+nt*a+Ct,c=pn+r+70,d=document.createElement("canvas");d.width=Zn,d.height=c;const l=d.getContext("2d");l.textBaseline="middle";const m=l.createLinearGradient(0,0,0,c);m.addColorStop(0,"#9b51e0"),m.addColorStop(1,"#6d5dfc"),l.fillStyle=m,l.fillRect(0,0,Zn,c),Es(l,e,t.length),l.save(),l.shadowColor="rgba(0,0,0,0.12)",l.shadowBlur=30,l.shadowOffsetY=10,Rt(l,on,pn,s,r,20),l.fillStyle="#ffffff",l.fill(),l.restore(),l.save(),Rt(l,on,pn,s,r,20),l.clip();const u=l.createLinearGradient(on,0,on+s,0);u.addColorStop(0,Jn.headerGradientStart),u.addColorStop(1,Jn.headerGradientEnd),l.fillStyle=u,l.fillRect(on,pn,s,$n);const p=on+24,h=on+168,f=on+250;l.fillStyle="#ffffff",l.font=`bold 26px ${kn}`,l.textAlign="left",l.fillText("日期",p,pn+$n/2),l.fillText("时间",h,pn+$n/2),l.fillText("事件",f,pn+$n/2),t.forEach((g,v)=>{const j=pn+$n+v*nt;v%2===1&&(l.fillStyle="#f8f9ff",l.fillRect(on,j,s,nt));const w=j+nt/2,S=an(g.date);l.fillStyle=Jn.textDark,l.font=`24px ${kn}`,l.textAlign="left",l.fillText(sa(S),p,w);const P=!g.allDay&&g.startTime?g.startTime:"全天";l.fillStyle="#3b7cff",l.fillText(P,h,w),l.fillStyle=Jn.textDark;const E=As(l,g.title,f,on+s-24);l.fillText(E,f,w)});const x=pn+r-Ct;return l.fillStyle="#9aa0b4",l.font=`22px ${kn}`,l.textAlign="center",l.fillText(`导出时间：${ra()}`,Zn/2,x+Ct/2),l.restore(),{canvas:d,H:c}}function Es(t,e,o){const a=U();Ts(t,on+66,105,92,"#ffffff");const s=on+140;t.textAlign="left",t.fillStyle="#ffffff",t.font=`bold 38px ${kn}`,t.fillText(e.title||"日历事件提醒",s,70),t.fillStyle="rgba(255,255,255,0.85)",t.font=`24px ${kn}`,t.fillText(e.subtitle||`${a.format("YYYY-MM-DD")} 至 ${a.add(1,"month").format("YYYY-MM-DD")}`,s,114),t.fillStyle="rgba(255,255,255,0.9)",t.font=`24px ${kn}`,t.fillText(`共 ${e.total??o} 个事件`,s,156)}function Ts(t,e,o,a,s){t.save(),t.strokeStyle=s,t.fillStyle=s,t.lineWidth=4;const r=a,c=a*1.08,d=e-r/2,l=o-c/2;Rt(t,d,l,r,c,10),t.stroke(),t.beginPath(),t.moveTo(d+r*.26,l+2),t.lineTo(d+r*.26,l-14),t.moveTo(d+r*.74,l+2),t.lineTo(d+r*.74,l-14),t.stroke(),t.beginPath(),t.moveTo(d,l+c*.32),t.lineTo(d+r,l+c*.32),t.stroke();const m=U();t.textAlign="center",t.fillStyle=s,t.font=`bold ${Math.round(a*.26)}px ${kn}`,t.fillText(`${m.month()+1}月`,e,l+c*.22),t.font=`bold ${Math.round(a*.36)}px ${kn}`,t.fillText(String(m.date()).padStart(2,"0"),e,l+c*.58),t.restore()}function As(t,e,o,a){const s=a-o;if(t.measureText(e).width<=s)return e;let r=e;for(;r.length>1&&t.measureText(`${r}…`).width>s;)r=r.slice(0,-1);return`${r}…`}function $s(t,e={}){const{canvas:o}=no(t,e);return o.toDataURL("image/png")}function Rs(t,e={}){const{canvas:o}=no(t,e),a=o.toDataURL("image/png"),s=document.createElement("a");s.href=a,s.download=`Calendar_Export_${U().format("YYYYMMDD_HHmmss")}.png`,document.body.appendChild(s),s.click(),document.body.removeChild(s)}const{RangePicker:Ps}=So;function Is({open:t,onClose:e,initialStart:o,initialEnd:a}){const{message:s}=fn.useApp(),{filteredEvents:r,currentDate:c}=mn(),[d,l]=i.useState(o&&a?"custom":"month"),[m,u]=i.useState(o&&a?[o,a]:null),[p,h]=i.useState(""),[f,x]=i.useState(!1);i.useEffect(()=>{o&&a&&(l("custom"),u([o,a]))},[o,a]);const{start:g,end:v}=i.useMemo(()=>{if(d==="week"){const E=oa(c);return{start:E,end:E.add(6,"day")}}if(d==="month"){const E=aa(c);return{start:E,end:E.endOf("month")}}return m?{start:m[0],end:m[1]}:{start:c,end:c}},[d,m,c]),j=i.useMemo(()=>r.filter(E=>{const A=an(E.date);return!A.isBefore(g,"day")&&!A.isAfter(v,"day")}).sort((E,A)=>{const L=an(E.date),q=an(A.date);return L.isSame(q,"day")?yn(E.startTime)-yn(A.startTime):L.isBefore(q)?-1:1}),[r,g,v]),w=i.useMemo(()=>d==="month"?`${g.year()}年${String(g.month()+1).padStart(2,"0")}月事件提醒`:d==="week"?`${g.year()}年第${g.isoWeek()}周事件提醒`:"日历事件提醒",[d,g]),S=i.useMemo(()=>`${g.format("YYYY-MM-DD")} 至 ${v.format("YYYY-MM-DD")}`,[g,v]);i.useEffect(()=>{if(!t)return;if(!j.length){h("");return}const E=window.setTimeout(()=>{try{h($s(j,{title:w,subtitle:S,total:j.length}))}catch{h("")}},50);return()=>window.clearTimeout(E)},[t,j,w,S]);const P=()=>{if(!j.length){s.warning("所选范围内没有事件");return}x(!0),window.setTimeout(()=>{try{Rs(j,{title:w,subtitle:S,total:j.length}),s.success("图片已保存")}catch{s.error("保存失败")}finally{x(!1)}},30)};return n.jsx(cn,{title:"导出图片预览",open:t,onCancel:e,footer:null,width:420,centered:!0,styles:{body:{padding:"0 16px 16px"}},children:n.jsxs("div",{className:"export-preview-body",children:[n.jsxs("div",{className:"export-range-select",children:[n.jsxs(Fn.Group,{value:d,onChange:E=>l(E.target.value),optionType:"button",buttonStyle:"solid",size:"small",children:[n.jsx(Fn.Button,{value:"week",children:"本周"}),n.jsx(Fn.Button,{value:"month",children:"本月"}),n.jsx(Fn.Button,{value:"custom",children:"自定义"})]}),d==="custom"&&n.jsx(Ps,{style:{width:"100%",marginTop:10},value:m,onChange:E=>u(E),allowClear:!1})]}),n.jsx("div",{className:"export-preview-card",children:p?n.jsx("img",{src:p,alt:"导出预览"}):n.jsx(kt,{image:kt.PRESENTED_IMAGE_SIMPLE,description:"该范围内暂无事件",style:{padding:"40px 0"}})}),n.jsxs("div",{className:"export-preview-actions",children:[n.jsxs("button",{className:"export-save-btn",onClick:P,disabled:!j.length||f,children:[n.jsx(Se,{}),"保存到相册"]}),n.jsx("button",{className:"export-close-btn btn-dark-border",onClick:e,children:"关闭"})]})]})})}function _s({onOpenSync:t}){const{message:e,modal:o}=fn.useApp(),a=_n(),{events:s,allEvents:r,setFocusQuestionId:c}=mn(),{openView:d}=Hn(),{status:l,email:m,lastSyncAt:u,configured:p,userId:h,notifySettingsVersion:f}=Sn(),[x,g]=i.useState("calendar"),[v,j]=i.useState(""),w=i.useMemo(()=>r.filter(Y=>Y.kind==="question"&&!Y.deleted),[r]),S=i.useMemo(()=>{const Y=v.trim().toLowerCase();return Y?(x==="calendar"?s:w).filter(vn=>`${vn.title} ${vn.description||""}`.toLowerCase().includes(Y)).sort((vn,Mn)=>(Mn.date||"").localeCompare(vn.date||"")).slice(0,50):[]},[v,x,s,w]),[P,E]=i.useState(!1),[A,L]=i.useState(U()),[q,N]=i.useState(U().add(1,"month")),[b,T]=i.useState(!1),[O,V]=i.useState(""),[F,X]=i.useState(()=>ln());i.useEffect(()=>{X(ln())},[f]);const[I,C]=i.useState(!1),[$,W]=i.useState(null),[_,R]=i.useState(""),B=!$||$===En||En==="dev",J=["正在检查本地更新…","正在清理旧版本缓存…","正在加载最新页面…"],K=Y=>new Promise(sn=>window.setTimeout(sn,Y)),[tn,k]=i.useState(!1),[D,z]=i.useState(0),y=async()=>{k(!0),z(0),await K(450),z(1),await K(450),z(2),await K(400),await Ze()},M=async()=>{C(!0),R("");const Y=await Ns();if(C(!1),W(Y.latest),Y.error){R(Y.error),e.error(Y.error);return}Y.isLatest?(R("已是最新版本"),e.success("当前已是最新版本")):(R(`发现新版本 ${Qn(Y.latest)}`),o.confirm({title:"发现新版本",centered:!0,content:n.jsxs("div",{style:{lineHeight:1.8},children:[n.jsxs("div",{children:["当前版本：",Qn(En)]}),n.jsxs("div",{children:["最新版本：",Qn(Y.latest)]}),n.jsx("div",{style:{marginTop:8,color:"#8e8e93"},children:"点击「立即升级」会清理缓存并重新加载最新页面，数据不会丢失。"})]}),okText:"立即升级",cancelText:"稍后",onOk:()=>{y()}}))},H=()=>{window.open(jn,"_blank","noopener"),e.info("已打开安卓安装包下载链接")},G=async()=>{V("正在打包并发送…");try{await Qe({events:s,start:A,end:q,userId:h,message:e,onNeedConfig:()=>T(!0)})}finally{V("")}},Z=async(Y,sn)=>{await Mt(Y)?e.success(sn):e.warning("复制失败，请长按手动复制")},en=p?m?l==="syncing"?"同步中…":l==="error"?"同步失败":l==="offline"?"离线":u?`已同步 ${U(u).format("MM-DD HH:mm")}`:"已登录":"未登录":"未开启";return n.jsxs("div",{className:"settings-page",children:[n.jsxs("button",{className:"set-account",onClick:t,children:[n.jsx("span",{className:"set-avatar",children:m?m[0].toUpperCase():n.jsx(No,{})}),n.jsxs("span",{className:"set-account-main",children:[n.jsx("span",{className:"set-account-name",children:m||"未登录"}),n.jsx("span",{className:"set-account-sub",children:m?`云同步 · ${en}`:"登录后数据自动云端备份，多设备互通"})]}),n.jsx(Yn,{className:"set-row-arrow"})]}),n.jsxs("div",{className:"set-actions",children:[n.jsx("div",{className:"set-group-title",children:"搜索"}),n.jsx(wo,{className:"set-search-seg",block:!0,value:x,onChange:Y=>g(Y),options:[{label:"搜索日历",value:"calendar"},{label:"搜索思考题",value:"question"}]}),n.jsxs("div",{className:"set-search-row",children:[n.jsx(Eo,{className:"ico"}),n.jsx("input",{value:v,placeholder:x==="calendar"?"搜索日历标题或备注…":"搜索思考题题目或内容…",onChange:Y=>j(Y.target.value)}),v&&n.jsx("button",{className:"clr",onClick:()=>j(""),"aria-label":"清除",children:n.jsx(ut,{})})]}),n.jsx("div",{className:"set-search-result",children:v.trim()===""?n.jsxs("div",{className:"search-empty",children:["输入关键字后，在此显示",x==="calendar"?"日历":"思考题","搜索结果"]}):S.length===0?n.jsx("div",{className:"search-empty",children:"未找到匹配的内容"}):S.map(Y=>n.jsxs("div",{className:"search-result-item",onClick:()=>{x==="calendar"?d(Y):(a("/todos"),c(Y.id))},children:[n.jsx("span",{className:`sr-title${Y.done?" done":""}`,children:Y.title}),n.jsx("span",{className:"sr-date",children:Y.date})]},Y.id))}),n.jsx("div",{className:"set-group-title",children:"导出"}),n.jsxs("div",{className:"set-range",children:[n.jsx(fe,{label:"导出开始日期",value:A,onChange:L}),n.jsx(fe,{label:"导出结束日期",value:q,onChange:N})]}),n.jsxs("div",{className:"sheet-actions-row export-main-row",children:[n.jsx("div",{className:"btn-wrap",children:n.jsxs("button",{className:"sheet-btn-v2 primary",onClick:()=>E(!0),children:[n.jsx(To,{className:"ico"}),"导出图片"]})}),n.jsx("div",{className:"btn-wrap",children:n.jsxs("button",{className:"sheet-btn-v2 success",onClick:G,children:[n.jsx(Ao,{className:"ico"}),"导出数据"]})})]})]}),n.jsxs("div",{className:"set-group",children:[n.jsx("div",{className:"set-group-title",children:"关于"}),n.jsx(nn,{icon:n.jsx($o,{style:{color:"#3b7cff"}}),label:"版本升级",desc:_||(B?"点击检查是否有新版本":`发现新版本 ${Qn($)}`),value:I?n.jsx(ot,{size:"small"}):B&&_?n.jsx(Ne,{style:{color:"#34c759"}}):void 0,onClick:M}),n.jsx(nn,{icon:n.jsx(we,{style:{color:"#8e8e93"}}),label:"当前版本",value:$t}),n.jsx(nn,{icon:n.jsx(Ro,{style:{color:"#7048e8"}}),label:"版本历史",desc:"查看各版本改动，可一键回退",onClick:()=>a("/settings/versions")}),n.jsx(nn,{icon:n.jsx(Po,{style:{color:"#34c759"}}),label:"下载安卓安装包",desc:"固定地址，永远指向最新版 APK",onClick:H}),n.jsx(nn,{icon:n.jsx(Io,{style:{color:"#5e60ff"}}),label:"电脑网页版地址",desc:Tn,onClick:()=>Z(Tn,"网页版地址已复制")})]}),n.jsxs("div",{className:"set-group",children:[n.jsx(nn,{icon:n.jsx(_o,{style:{color:"#3b7cff"}}),label:"数据",desc:"事件总数、清理重复、备份与恢复",onClick:()=>a("/settings/data")}),n.jsx(nn,{icon:n.jsx(Ee,{style:{color:"#ff9f0a"}}),label:"提醒",desc:"强提醒、消息通知通道",onClick:()=>a("/settings/reminder")})]}),n.jsx(Xe,{open:b,onClose:()=>T(!1),ns:F,setNs:X,userId:h}),n.jsx(Is,{open:P,onClose:()=>E(!1),initialStart:A,initialEnd:q}),O&&n.jsxs("div",{className:"set-busy",children:[n.jsx(ot,{})," ",n.jsx("span",{children:O})]}),tn&&n.jsx("div",{className:"upgrade-overlay",children:n.jsxs("div",{className:"upgrade-card",children:[n.jsx(ot,{size:"large"}),n.jsx("div",{className:"upgrade-title",children:"正在升级到最新版本…"}),n.jsx("div",{className:"upgrade-step",children:J[D]}),n.jsx("div",{className:"upgrade-dots",children:J.map((Y,sn)=>n.jsx("span",{className:`dot${sn<=D?" on":""}`},sn))})]})})]})}function Ot({title:t,onBack:e,right:o}){return n.jsxs("header",{className:"sub-topbar",children:[n.jsx("button",{className:"sub-back",onClick:e,"aria-label":"返回",children:n.jsx(et,{})}),n.jsx("div",{className:"sub-title",children:t}),o&&n.jsx("div",{className:"sub-right",children:o})]})}function Ds(){var N;const{message:t,modal:e}=fn.useApp(),o=_n(),{events:a}=mn(),{userId:s,notifySettingsVersion:r}=Sn(),[c,d]=i.useState(()=>ln()),[l,m]=i.useState(!1);i.useEffect(()=>{d(ln())},[r]);const[u,p]=i.useState(()=>rt()),[h,f]=i.useState("prompt"),[x,g]=i.useState(0),v=i.useRef(null),[j,w]=i.useState(!1);i.useEffect(()=>{let b=!0;return Bn(()=>import("./localNotify-Dj2HAYFZ.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url).then(T=>{b&&(v.current=T,w(!0))}).catch(()=>{}),()=>{b=!1}},[]);const S=i.useCallback(async()=>{var b,T;f(await(((b=v.current)==null?void 0:b.getNotifyPermission())??"unsupported")),g(await(((T=v.current)==null?void 0:T.countScheduled())??0))},[]);i.useEffect(()=>{S()},[S]);const P=async b=>{var V,F,X;const T={...u,...b};if(p(T),Na(T),(V=v.current)==null||V.unlockAudio(),T.enabled&&h!=="granted"){const I=await(((F=v.current)==null?void 0:F.requestNotifyPermission())??"unsupported");f(I),I!=="granted"&&t.warning(I==="denied"?"系统通知权限被拒绝，请到「手机设置 → 应用 → 智能日历 → 通知」中手动允许":"未获得通知权限，弹窗提醒可能不生效")}const O=await(((X=v.current)==null?void 0:X.syncScheduledReminders(a))??0);T.enabled?g(O):g(0)},E=i.useRef("");i.useEffect(()=>{var T;const b=a.filter(O=>{var V;return!O.deleted&&!O.done&&((V=O.reminder)==null?void 0:V.length)}).map(O=>`${O.id}:${O.date}:${O.startTime}:${(O.reminder||[]).map(V=>V.unit+V.value).join(",")}`).join("|");b!==E.current&&(E.current=b,(((T=v.current)==null?void 0:T.syncScheduledReminders(a))??Promise.resolve(0)).then(O=>{O&&g(O)}))},[a]);const A=i.useMemo(()=>{var b;return(((b=v.current)==null?void 0:b.collectUpcomingReminders(a))??[]).length},[a,j]),L=h==="granted"?"已授权":h==="denied"?"已拒绝":h==="prompt"?"待授权":"不支持",q=()=>o("/settings");return n.jsxs("div",{className:"sub-page",children:[n.jsx(Ot,{title:"提醒",onBack:q}),n.jsxs("div",{className:"sub-page-body",children:[n.jsxs("div",{className:"set-group",children:[n.jsx(nn,{icon:n.jsx(Do,{style:{color:"#ff9f0a"}}),label:"强提醒",desc:u.enabled?(N=v.current)!=null&&N.isNativeApp()?`系统弹窗 · 已排期 ${x||A} 条（通知权限：${L}）`:`浏览器通知（权限：${L}）`:"关闭后仅推送到微信/钉钉",right:n.jsx(gt,{on:u.enabled,onChange:b=>void P({enabled:b})})}),u.enabled&&n.jsxs(n.Fragment,{children:[n.jsx(nn,{icon:n.jsx(Mo,{style:{color:"#5e60ff"}}),label:"响铃",right:n.jsx(gt,{on:u.sound,onChange:b=>void P({sound:b})})}),n.jsx(nn,{icon:n.jsx(xs,{}),label:"振动",right:n.jsx(gt,{on:u.vibrate,onChange:b=>void P({vibrate:b})})}),h!=="granted"&&n.jsx(nn,{icon:n.jsx(Te,{style:{color:"#ff3b30"}}),label:"开启通知权限",desc:"未授权时手机不会弹窗，请点此授权",onClick:async()=>{var T,O;const b=await(((T=v.current)==null?void 0:T.requestNotifyPermission())??"unsupported");if(f(b),b==="granted"){const V=await(((O=v.current)==null?void 0:O.syncScheduledReminders(a))??0);g(V),t.success("已开启通知权限")}else t.warning("未获得权限，请到系统设置里手动允许通知")}}),n.jsx(nn,{icon:n.jsx(Ee,{style:{color:"#34c759"}}),label:"测试提醒效果",desc:"立即弹窗 + 振动 + 响铃",onClick:async()=>{var b,T;(b=v.current)==null||b.unlockAudio(),await((T=v.current)==null?void 0:T.testReminder()),t.success("已触发测试提醒")}})]}),n.jsx(nn,{icon:n.jsx(je,{style:{color:"#3b7cff"}}),label:"消息通知",desc:"邮件 / 微信 / 钉钉",value:[Dn(c)&&"邮件",zn(c)&&"微信",Wn(c)&&"钉钉"].filter(Boolean).join(" · ")||"未配置",onClick:()=>m(!0)})]}),n.jsx("div",{className:"sub-page-gap"})]}),n.jsx(Xe,{open:l,onClose:()=>m(!1),ns:c,setNs:d,userId:s})]})}function Ms(){const{message:t,modal:e}=fn.useApp(),o=_n(),{events:a,duplicateCount:s,dedupeNow:r}=mn(),{userId:c,email:d}=Sn(),[l,m]=i.useState(!1),u=a.filter(w=>!w.deleted).length,p=()=>{if(s===0){t.success("没有发现重复事件");return}e.confirm({title:`发现 ${s} 条重复事件`,content:"重复判定依据：标题、日期、时间完全一致。清理后会保留信息最完整的一条，并同步到云端。",okText:"立即清理",cancelText:"取消",onOk:()=>{const w=r();t.success(w>0?`已清理 ${w} 条重复事件`:"没有需要清理的事件")}})},h=()=>{const w=a.filter(q=>!q.deleted),S=JSON.stringify(w,null,2),P=`Calendar_Backup_${U().format("YYYYMMDD_HHmmss")}.json`,E=new Blob([S],{type:"application/json"}),A=URL.createObjectURL(E),L=document.createElement("a");L.href=A,L.download=P,L.click(),URL.revokeObjectURL(A),t.success(`已下载 ${w.length} 条事件到本机（${P}）`)},f=async(w,S)=>{await Mt(w)?t.success(S):t.warning("复制失败，请长按手动复制")},x=async()=>{if(!Dn()){t.warning("请先在「消息通知」里配置接收邮箱");return}const w=["【智能日历 · 恢复信息卡】请长期保存本邮件","","① 网页版（电脑 / 任意手机浏览器，数据与 APP 完全同步）：",Tn,"","② 安卓 APP 安装包（固定地址，永远指向最新版）：",jn,"发布页（可看历史版本）："+In,"","③ 云端账号（数据存放位置）：","登录邮箱："+(d||"未登录"),"云服务：Supabase（数据表 calendar_events，按账号隔离）","","④ 恢复步骤：","1) 打开上面①的网页版或重新安装②的 APP；","2) 进入「设置 → 云同步」，用③的邮箱与密码登录；","3) 登录后数据会自动从云端拉回，无需手动导入。","4) 若云端也不可用，用最近一次「导出数据」邮件里的 JSON 下载链接，","   或本机导出的 Calendar_Backup_*.json，通过「导入json」恢复。","",`当前数据量：${u} 条事件`,`生成时间：${U().format("YYYY-MM-DD HH:mm")}`].join(`
`);v("正在发送恢复信息…");const S=await ct("智能日历 · 恢复信息卡（请长期保存）",w);v(""),S.ok?t.success("恢复信息卡已发送到邮箱"):t.error(S.msg||"发送失败")},[g,v]=i.useState(""),j=()=>o("/settings");return n.jsxs("div",{className:"sub-page",children:[n.jsx(Ot,{title:"数据",onBack:j}),n.jsxs("div",{className:"sub-page-body",children:[n.jsxs("div",{className:"set-group",children:[n.jsx(nn,{icon:n.jsx(we,{style:{color:"#8e8e93"}}),label:"事件总数",value:`${u} 条`}),n.jsx(nn,{icon:n.jsx(_t,{style:{color:s?"#ff3b30":"#8e8e93"}}),label:"清理重复事件",desc:"标题、日期、时间完全相同的事件",badge:s,value:s?`${s} 条`:"无重复",onClick:p}),n.jsx(nn,{icon:n.jsx(Te,{style:{color:"#34c759"}}),label:"备份与灾难恢复",desc:"网页地址、安装包、云端账号、双备份",onClick:()=>m(!0)})]}),n.jsx("div",{className:"sub-page-gap"})]}),n.jsx(cn,{open:l,onCancel:()=>m(!1),footer:null,title:"备份与灾难恢复",width:560,styles:{body:{maxHeight:"72vh",overflowY:"auto"}},children:n.jsxs("div",{className:"backup-panel",children:[n.jsxs("div",{className:"backup-status",children:[n.jsx("div",{className:`backup-dot${c?" on":""}`}),n.jsxs("div",{children:[n.jsxs("b",{children:["云端自动备份：",c?"已开启":"未开启"]}),n.jsx("div",{className:"backup-sub",children:c?`账号 ${d}，共 ${u} 条事件实时同步到云端（Supabase）`:"未登录，数据仅存在本机。强烈建议登录后启用云端备份"})]})]}),n.jsxs("div",{className:"backup-block",children:[n.jsx("div",{className:"backup-title",children:"① 出故障时，去哪里重新拿到软件"}),n.jsxs("div",{className:"backup-item",children:[n.jsx("span",{className:"backup-k",children:"安卓 APP 安装包"}),n.jsx("span",{className:"backup-v",children:jn}),n.jsx("button",{onClick:()=>f(jn,"APK 下载地址已复制"),children:n.jsx(mt,{})})]}),n.jsxs("div",{className:"backup-item",children:[n.jsx("span",{className:"backup-k",children:"发布页（历史版本）"}),n.jsx("span",{className:"backup-v",children:In}),n.jsx("button",{onClick:()=>f(In,"发布页地址已复制"),children:n.jsx(mt,{})})]}),n.jsxs("div",{className:"backup-item",children:[n.jsx("span",{className:"backup-k",children:"电脑 / 浏览器网页版"}),n.jsx("span",{className:"backup-v",children:Tn}),n.jsx("button",{onClick:()=>f(Tn,"网页版地址已复制"),children:n.jsx(mt,{})})]}),n.jsx("div",{className:"backup-tip",children:"网页版与 APP 使用同一套云端数据，登录同一账号即可看到完全一样的内容。"})]}),n.jsxs("div",{className:"backup-block",children:[n.jsx("div",{className:"backup-title",children:"② 数据双备份"}),n.jsxs("div",{className:"backup-item",children:[n.jsx("span",{className:"backup-k",children:"备份一 · 云端"}),n.jsx("span",{className:"backup-v",children:c?"实时自动，无需操作":"未登录，未启用"}),n.jsx("button",{onClick:()=>o("/settings"),children:c?"查看":"去登录"})]}),n.jsxs("div",{className:"backup-item",children:[n.jsx("span",{className:"backup-k",children:"备份二 · 本机文件"}),n.jsx("span",{className:"backup-v",children:"导出完整 JSON 到手机/电脑"}),n.jsx("button",{onClick:h,children:"立即导出"})]}),n.jsxs("div",{className:"backup-item",children:[n.jsx("span",{className:"backup-k",children:"备份三 · 邮箱"}),n.jsx("span",{className:"backup-v",children:"把清单与下载链接发到邮箱"}),n.jsx("button",{onClick:()=>void Qe({events:a,start:U("2000-01-01"),end:U().add(100,"year"),userId:c,message:t,onNeedConfig:()=>t.warning("请先在「消息通知」里配置接收邮箱")}),children:"发送"})]})]}),n.jsxs("div",{className:"backup-block",children:[n.jsx("div",{className:"backup-title",children:"③ 恢复步骤"}),n.jsxs("ol",{className:"backup-steps",children:[n.jsx("li",{children:"重新安装 APP 或打开网页版；"}),n.jsx("li",{children:"进入「设置 → 云同步」，用邮箱和密码登录；"}),n.jsx("li",{children:"登录后数据自动从云端拉回，无需手动导入；"}),n.jsx("li",{children:"若云端也不可用，用「导入json」载入本机或邮箱里的备份文件。"})]})]}),n.jsxs("button",{className:"notify-save",onClick:()=>void x(),children:[n.jsx(ke,{})," 把上面这些信息发到我的邮箱长期保存"]})]})}),g&&n.jsx("div",{className:"set-busy",children:n.jsx("span",{children:g})})]})}const On="okydd",Un="smart-calendar",xt="gh-pages";async function Ln(t,e,o,a){const s=await fetch("https://api.github.com"+e,{method:t,headers:{Authorization:`Bearer ${a}`,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28","Content-Type":"application/json","User-Agent":"smart-calendar-rollback"},body:o?JSON.stringify(o):void 0}),r=await s.text();let c=null;try{c=r?JSON.parse(r):null}catch{c=r}return{ok:s.ok,status:s.status,data:c}}async function Os(t){var a,s,r;const e="".trim();if(!e)return{ok:!1,msg:"未配置回退令牌：请联系开发者执行回退，或前往发布页查看历史版本。"};const o="versions/"+t.toLowerCase()+"/";try{const c=await Ln("GET",`/repos/${On}/${Un}/git/trees/${xt}?recursive=1`,void 0,e);if(!c.ok)return{ok:!1,msg:`读取线上文件树失败（HTTP ${c.status}）`};const d=((a=c.data)==null?void 0:a.tree)||[],l=[],m=[];for(const w of d)w.path.startsWith(o)&&w.type==="blob"?l.push({path:w.path.slice(o.length),mode:w.mode,type:w.type,sha:w.sha}):w.path.startsWith("versions/")&&w.type==="blob"&&m.push(w);if(!l.length)return{ok:!1,msg:`未找到版本 ${t} 的快照，可能该版本未保留回退数据。`};const u=[...l,...m],p=await Ln("POST",`/repos/${On}/${Un}/git/trees`,{tree:u},e);if(!p.ok)return{ok:!1,msg:`创建文件树失败（HTTP ${p.status}）`};const h=p.data.sha,f=await Ln("GET",`/repos/${On}/${Un}/git/refs/heads/${xt}`,void 0,e),x=f.ok?(r=(s=f.data)==null?void 0:s.object)==null?void 0:r.sha:void 0,g=await Ln("POST",`/repos/${On}/${Un}/git/commits`,{message:`rollback to ${t}`,tree:h,parents:x?[x]:[]},e);if(!g.ok)return{ok:!1,msg:`创建回退提交失败（HTTP ${g.status}）`};const v=g.data.sha,j=await Ln("PATCH",`/repos/${On}/${Un}/git/refs/heads/${xt}`,{sha:v,force:!0},e);return j.ok?{ok:!0,msg:`已回退到 ${t}，稍后刷新页面即可生效。`}:{ok:!1,msg:`更新站点引用失败（HTTP ${j.status}）`}}catch(c){return{ok:!1,msg:"回退失败："+(c instanceof Error?c.message:String(c))}}}const Us={feature:"新功能",fix:"修复",ui:"体验",perf:"性能",other:"其他"};function Ls(){const t=_n(),{message:e,modal:o}=fn.useApp(),a=Ss(),[s,r]=i.useState(""),[c,d]=i.useState(null),[l,m]=i.useState(""),[u,p]=i.useState(""),h=x=>{{o.confirm({title:`回退到 ${x}`,content:"当前未配置回退令牌，无法直接在线回退。可前往发布页查看历史版本，或联系开发者执行回退。",okText:"前往发布页",cancelText:"取消",onOk:()=>{window.open(In,"_blank")}});return}},f=async()=>{if(!l.trim()){p("请输入账号登录密码以确认操作");return}const x=c;if(d(null),!x)return;r(x);const g=await Os(x);r(""),g.ok?(e.success(g.msg),setTimeout(()=>Ze(),800)):e.error(g.msg)};return n.jsxs("div",{className:"sub-page",children:[n.jsx(Ot,{title:"版本历史",onBack:()=>t(-1)}),n.jsxs("div",{className:"sub-page-body ver-history",children:[n.jsx("p",{className:"ver-tip",children:"每个版本带有唯一编号（V主.次）与改动摘要。可一键回退或前进到任意已保留快照的版本；回退前需输入账号登录密码确认。"}),a.map(({entry:x,current:g,canRollback:v})=>n.jsxs("div",{className:"ver-item"+(g?" is-current":""),children:[n.jsxs("div",{className:"ver-item-head",children:[n.jsx("span",{className:"ver-badge",children:x.version}),n.jsx("span",{className:"ver-type ver-type-"+x.type,children:Us[x.type]}),n.jsx("span",{className:"ver-date",children:x.date}),g&&n.jsx("span",{className:"ver-current-tag",children:"当前"})]}),n.jsx("div",{className:"ver-title",children:x.title}),n.jsx("div",{className:"ver-summary",children:x.summary}),v?n.jsx("button",{className:"ver-rollback-btn",disabled:!!s,onClick:()=>h(x.version),children:s===x.version?"回退中…":"回退到此版本"}):n.jsx("div",{className:"ver-rollback-disabled",children:g?"正在使用此版本":"历史版本（未保留回退快照）"})]},x.version))]}),n.jsxs(cn,{open:!!c,title:c?`确认回退到 ${c}`:"确认回退",okText:"确认回退",cancelText:"取消",onOk:f,onCancel:()=>d(null),okButtonProps:{disabled:!l.trim()},children:[n.jsx("p",{style:{marginBottom:8,color:"#555"},children:"此操作会立即把站点还原为该版本，当前版本仍可再次回退回来。请输入账号登录密码以确认操作："}),n.jsx(xn.Password,{prefix:n.jsx(Ae,{style:{color:"#bbb"}}),placeholder:"账号登录密码",value:l,onChange:x=>{m(x.target.value),p("")},onPressEnter:f,status:u?"error":void 0,autoFocus:!0}),u&&n.jsx("div",{style:{color:"#fa5252",fontSize:12,marginTop:6},children:u})]})]})}const Ce="calendarLastMail",xe=`-- 在 Supabase → SQL Editor 中粘贴执行（一次即可）
create table if not exists public.calendar_events (
  id          text        not null,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  title       text        not null default '',
  date        text        not null default '',
  start_time  text        not null default '',
  end_time    text        not null default '',
  all_day     boolean     not null default false,
  description text        not null default '',
  tag         text        not null default 'purple',
  done        boolean     not null default false,
  deleted     boolean     not null default false,
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.calendar_events enable row level security;

create policy "read own"   on public.calendar_events
  for select using (auth.uid() = user_id);
create policy "insert own" on public.calendar_events
  for insert with check (auth.uid() = user_id);
create policy "update own" on public.calendar_events
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own" on public.calendar_events
  for delete using (auth.uid() = user_id);`;function qs({open:t,onClose:e}){const{message:o,modal:a}=fn.useApp(),{status:s,email:r,lastSyncAt:c,error:d,configured:l,configLocked:m,configUrl:u,saveConfig:p,removeConfig:h,signIn:f,signUp:x,signOut:g,sendReset:v,syncNow:j}=Sn(),[w,S]=i.useState(u),[P,E]=i.useState(""),[A,L]=i.useState(()=>{try{return localStorage.getItem(Ce)||""}catch{return""}}),[q,N]=i.useState(""),[b,T]=i.useState("signIn"),[O,V]=i.useState(!1),F=!!r,X=()=>{const R=p(w,P);if(R){o.error(R);return}o.success("连接参数已保存，接下来注册或登录账号"),E("")},I=async()=>{if(!A.trim()||!q){o.warning("请填写邮箱和密码");return}V(!0);const R=b==="signIn"?await f(A,q):await x(A,q);if(V(!1),R==="__NEED_CONFIRM__"){a.info({title:"请先验证邮箱",content:`注册成功。我们已向 ${A.trim()} 发送了一封验证邮件，请点击邮件中的链接完成验证，然后回来登录。`,okText:"知道了"}),T("signIn");return}if(R){o.error(R);return}o.success(b==="signIn"?"登录成功，正在同步…":"注册成功，正在同步…");try{localStorage.setItem(Ce,A.trim())}catch{}N("")},C=async()=>{if(!A.trim()){o.warning("请先填写邮箱地址");return}const R=await v(A);R?o.error(R):o.success("重置密码邮件已发送，请查收邮箱")},$=()=>{a.confirm({title:"退出登录？",content:"退出后本设备将停止同步，已同步到云端的数据不会丢失，本机数据也会保留。",okText:"退出登录",cancelText:"取消",onOk:async()=>{await g(),o.success("已退出登录")}})},W=()=>{a.confirm({title:"断开云同步配置？",content:"将清除本机保存的连接参数并退出登录，应用回到纯本地模式。云端数据不受影响。",okText:"断开",cancelText:"取消",okButtonProps:{danger:!0},onOk:async()=>{await g(),h(),o.success("已断开云同步")}})},_=()=>l?F?s==="syncing"?n.jsx(An,{icon:n.jsx(zt,{spin:!0}),color:"processing",children:"同步中"}):s==="error"?n.jsx(An,{color:"error",children:"同步失败"}):s==="offline"?n.jsx(An,{color:"default",children:"离线"}):n.jsx(An,{icon:n.jsx(Ne,{}),color:"success",children:"已同步"}):n.jsx(An,{color:"orange",children:"未登录"}):n.jsx(An,{color:"default",children:"未启用"});return n.jsxs(cn,{open:t,onCancel:e,footer:null,title:n.jsxs("span",{children:[n.jsx(be,{style:{color:"#6d5dfc",marginRight:8}}),"云同步"]}),width:520,children:[n.jsxs("div",{style:{marginBottom:14},children:["当前状态：",_(),F&&n.jsx("span",{style:{marginLeft:8,color:"#666",fontSize:13},children:r})]}),d&&n.jsxs("div",{style:{background:"#fff2f0",border:"1px solid #ffccc7",borderRadius:8,padding:"8px 12px",marginBottom:14,fontSize:13,color:"#cf1322"},children:[n.jsx(Oo,{style:{marginRight:6}}),d]}),!l&&n.jsxs(n.Fragment,{children:[n.jsx("p",{style:{fontSize:13,color:"#666",lineHeight:1.8},children:"填写你自己的 Supabase 项目参数后，手机和电脑登录同一个账号即可自动同步。 数据存放在你自己的数据库里，我们不接触任何内容。"}),n.jsxs("div",{style:{marginBottom:10},children:[n.jsx("label",{style:{fontSize:12,color:"#888"},children:"Project URL"}),n.jsx(xn,{value:w,onChange:R=>S(R.target.value),placeholder:"https://xxxxxxxx.supabase.co"})]}),n.jsxs("div",{style:{marginBottom:14},children:[n.jsx("label",{style:{fontSize:12,color:"#888"},children:"anon public key"}),n.jsx(xn.TextArea,{value:P,onChange:R=>E(R.target.value),placeholder:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",autoSize:{minRows:2,maxRows:4}})]}),n.jsx(wn,{type:"primary",block:!0,icon:n.jsx(Uo,{}),onClick:X,children:"保存连接参数"}),n.jsx(Lo,{ghost:!0,style:{marginTop:12},items:[{key:"how",label:n.jsx("span",{style:{fontSize:13},children:"参数在哪里找？（点击展开）"}),children:n.jsxs("div",{style:{fontSize:13,lineHeight:2,color:"#555"},children:[n.jsx("b",{children:"1."})," 打开 supabase.com 用邮箱免费注册并新建一个项目（Region 选 Singapore 较快）。",n.jsx("br",{}),n.jsx("b",{children:"2."})," 项目左下角 ",n.jsx("b",{children:"Settings → API"}),"，把 ",n.jsx("b",{children:"Project URL"})," 和"," ",n.jsx("b",{children:"anon public"})," 两个值复制过来。",n.jsx("br",{}),n.jsx("b",{children:"3."})," 左侧 ",n.jsx("b",{children:"SQL Editor → New query"}),"，粘贴下面这段建表语句并点 Run：",n.jsx(qo.Paragraph,{copyable:{text:xe},style:{background:"#f6f7fb",border:"1px solid #e8e8f0",borderRadius:8,padding:10,fontSize:11,maxHeight:180,overflow:"auto",marginTop:8,whiteSpace:"pre-wrap",fontFamily:"Consolas, Monaco, monospace"},children:xe})]})}]})]}),l&&!F&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{style:{marginBottom:10},children:[n.jsx("label",{style:{fontSize:12,color:"#888"},children:"邮箱"}),n.jsx(xn,{value:A,onChange:R=>L(R.target.value),placeholder:"邮箱（已为你记住上次账号）",autoComplete:"username"})]}),n.jsxs("div",{style:{marginBottom:14},children:[n.jsx("label",{style:{fontSize:12,color:"#888"},children:"密码（至少 6 位）"}),n.jsx(xn.Password,{value:q,onChange:R=>N(R.target.value),onPressEnter:I,placeholder:"请输入密码",autoComplete:b==="signIn"?"current-password":"new-password"})]}),n.jsx(wn,{type:"primary",block:!0,loading:O,icon:n.jsx(Yo,{}),onClick:I,children:b==="signIn"?"登录并开始同步":"注册新账号"}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:10,fontSize:13},children:[n.jsx("a",{onClick:()=>T(b==="signIn"?"signUp":"signIn"),children:b==="signIn"?"还没有账号？去注册":"已有账号？去登录"}),n.jsx("a",{onClick:C,children:"忘记密码"})]}),!m&&n.jsx("div",{style:{marginTop:16,textAlign:"center"},children:n.jsx("a",{style:{fontSize:12,color:"#999"},onClick:W,children:"重新填写连接参数"})})]}),l&&F&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{style:{background:"#f6f7fb",borderRadius:10,padding:"12px 14px",fontSize:13,lineHeight:2,color:"#555",marginBottom:14},children:[n.jsxs("div",{children:["账号：",n.jsx("b",{children:r})]}),n.jsxs("div",{children:["上次同步：",c?U(c).format("YYYY-MM-DD HH:mm:ss"):"尚未同步"]}),n.jsx("div",{style:{color:"#888",fontSize:12},children:"数据每分钟自动同步一次，修改后 1.5 秒内也会立即上传。"})]}),n.jsx(wn,{type:"primary",block:!0,icon:n.jsx(zt,{spin:s==="syncing"}),loading:s==="syncing",onClick:()=>void j(),style:{marginBottom:10},children:"立即同步"}),n.jsx(wn,{block:!0,icon:n.jsx(Vo,{}),onClick:$,children:"退出登录"}),!m&&n.jsx(wn,{block:!0,type:"text",danger:!0,icon:n.jsx(Bo,{}),style:{marginTop:6},onClick:W,children:"断开云同步"})]})]})}const yt="shareUnlocked",tt="__all__";function Ys(){const{id:t}=mo(),e=_n(),[o,a]=i.useState(null),[s,r]=i.useState(!0),[c,d]=i.useState(""),l=Cn,[m,u]=i.useState(()=>{try{if(sessionStorage.getItem(yt)==="1")return!0}catch{}if(typeof location<"u"&&new URLSearchParams(location.search).get("pwd")===Nt){try{sessionStorage.setItem(yt,"1")}catch{}return!0}return!1}),[p,h]=i.useState(""),[f,x]=i.useState(""),g=()=>{if(p===Nt){try{sessionStorage.setItem(yt,"1")}catch{}u(!0)}else x("访问密码错误")};i.useEffect(()=>{let N=!0;return(async()=>{if(!t){N&&(d("链接缺少分享 ID"),r(!1));return}const b=await bs(t);if(N){if(!b){d("未找到该分享数据，可能链接已失效或尚未生成"),r(!1);return}a(b),r(!1)}})(),()=>{N=!1}},[t]);const v=i.useMemo(()=>((o==null?void 0:o.events)||[]).filter(N=>!N.deleted),[o]),j=i.useMemo(()=>{const N=new Map;for(const b of v){const T=N.get(b.date)||[];T.push(b),N.set(b.date,T)}return[...N.entries()].sort((b,T)=>b[0]<T[0]?-1:1).map(([b,T])=>({date:b,list:T}))},[v]),w=i.useMemo(()=>{const N=[];for(const b of j){const T=an(b.date);if(!T.isValid())continue;const O=`${T.year()}-${T.month()+1}`,V=`${T.year()}年${T.month()+1}月`;let F=N.find(X=>X.key===O);F||(F={key:O,label:V,dates:[]},N.push(F)),F.dates.push(b)}return N},[j]),[S,P]=i.useState(tt),E=i.useMemo(()=>{if(S===tt)return j;const N=j.find(b=>b.date===S);return N?[N]:[]},[S,j]);if(!m)return n.jsxs("div",{className:"share-page",children:[n.jsx("div",{className:"share-topbar",children:n.jsxs("button",{className:"share-back",onClick:()=>e("/calendar"),children:[n.jsx(vt,{})," 返回日历"]})}),n.jsxs("div",{className:"share-lock",children:[n.jsx("div",{className:"share-lock-icon",children:n.jsx(Ae,{})}),n.jsx("div",{className:"share-lock-title",children:"该分享链接需要访问密码"}),n.jsx("div",{className:"share-lock-tip",children:"请输入邮件中提供的访问密码以查看内容"}),n.jsx(xn.Password,{className:"share-lock-input",placeholder:"访问密码",value:p,onChange:N=>{h(N.target.value),x("")},onPressEnter:g,status:f?"error":void 0,autoFocus:!0}),f&&n.jsx("div",{className:"share-lock-err",children:f}),n.jsx(wn,{type:"primary",block:!0,onClick:g,children:"查看内容"})]})]});const A=()=>{if(!o)return;const N=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),b=URL.createObjectURL(N),T=document.createElement("a");T.href=b,T.download=`Calendar_Share_${U().format("YYYYMMDD_HHmmss")}.json`,T.click(),URL.revokeObjectURL(b),l.success("已下载 JSON")},L=N=>{const b=an(N.date),T=b.isValid()?`${b.year()}年${b.month()+1}月${b.date()}日 ${bn(b)}`:N.date;return n.jsxs("div",{className:"share-card",children:[n.jsxs("div",{className:"share-card-title",children:[N.title,N.important&&n.jsx("span",{className:"share-tag imp",children:"重要"}),N.done&&n.jsx("span",{className:"share-tag done",children:"已完成"})]}),n.jsxs("div",{className:"share-card-meta",children:["📅 ",T," ｜ 🕒 ",Kn(N)]}),N.description&&n.jsx("div",{className:"share-card-desc",children:N.description}),N.images&&N.images.length>0&&n.jsx("div",{className:"share-card-imgs",children:N.images.map((O,V)=>n.jsx("img",{src:O,alt:"事件图片",loading:"lazy"},V))})]},N.id)},q=(N,b)=>{const T=an(N),O=T.isValid()?`${T.year()}年${T.month()+1}月${T.date()}日 ${bn(T)}`:N;return n.jsxs("div",{className:"share-day-head",children:[n.jsx("span",{className:"share-day-dot"}),n.jsx("span",{className:"share-day-label",children:O}),n.jsx("span",{className:"share-day-count",children:b})]})};return s?n.jsxs("div",{className:"share-loading",children:[n.jsx(ot,{}),n.jsx("div",{className:"share-loading-text",children:"正在加载分享数据…"})]}):c?n.jsxs("div",{className:"share-page",children:[n.jsx("div",{className:"share-topbar",children:n.jsxs("button",{className:"share-back",onClick:()=>e("/calendar"),children:[n.jsx(vt,{})," 返回日历"]})}),n.jsx("div",{className:"share-error",children:n.jsx(kt,{description:c})})]}):n.jsxs("div",{className:"share-page",children:[n.jsxs("div",{className:"share-topbar",children:[n.jsxs("button",{className:"share-back",onClick:()=>e("/calendar"),children:[n.jsx(vt,{})," 返回日历"]}),n.jsx(wn,{type:"primary",size:"small",icon:n.jsx(Se,{}),onClick:A,children:"下载JSON"})]}),n.jsxs("div",{className:"share-head",children:[n.jsxs("div",{className:"share-head-title",children:[n.jsx(gn,{})," 智能日历 · 数据分享"]}),n.jsxs("div",{className:"share-meta",children:[(o==null?void 0:o.rangeStart)&&(o==null?void 0:o.rangeEnd)&&n.jsxs("span",{children:["范围：",o.rangeStart," 至 ",o.rangeEnd]}),(o==null?void 0:o.exportTime)&&n.jsxs("span",{children:["导出：",o.exportTime]}),n.jsxs("span",{children:["共 ",v.length," 条事件"]})]})]}),n.jsxs("div",{className:"share-shell",children:[n.jsxs("aside",{className:"share-nav",children:[n.jsxs("button",{className:`share-nav-all${S===tt?" active":""}`,onClick:()=>P(tt),children:[n.jsx(zo,{})," 全部日期"]}),w.map(N=>n.jsxs("div",{className:"share-nav-group",children:[n.jsx("div",{className:"share-nav-group-label",children:N.label}),N.dates.map(b=>{const T=an(b.date),O=T.isValid()?`${T.month()+1}月${T.date()}日 ${bn(T)}`:b.date;return n.jsxs("button",{className:`share-nav-item${S===b.date?" active":""}`,onClick:()=>P(b.date),children:[n.jsx("span",{className:"share-nav-date",children:O}),n.jsx("span",{className:"share-nav-count",children:b.list.length})]},b.date)})]},N.key))]}),n.jsx("main",{className:"share-body",children:E.length===0?n.jsx("div",{className:"share-empty-body",children:"（无事件）"}):E.map(N=>n.jsxs("section",{className:"share-day",children:[q(N.date,N.list.length),n.jsx("div",{className:"share-day-cards",children:N.list.map(b=>L(b))})]},N.date))})]}),n.jsx("div",{className:"share-foot",children:"本页面由「智能日历」生成 · 数据保存在日历的云端，链接可分享给任何人查看"})]})}const Ut=5,Pt="autoExportLastSent",Vs=4e3;function Bs(t,e,o){return t.filter(a=>!a.deleted&&a.date>=e&&a.date<=o)}function zs(t,e){try{const o=ln();if(!e||!Dn(o))return;const a=U();if(a.hour()<Ut)return;const s=a.format("YYYY-MM-DD");if(localStorage.getItem(Pt)===s)return;const r=a.subtract(1,"month").date(1).format("YYYY-MM-DD"),c=a.format("YYYY-MM-DD"),d=Bs(t,r,c),l=a.format("YYYY-MM-DD HH:mm"),{html:m}=$a(d,{rangeStart:r,rangeEnd:c,exportTime:l}),u=Ue(d,{rangeStart:r,rangeEnd:c,exportTime:l});ct(`智能日历 · 每日数据推送（${s}）`,u,{html:m}).then(p=>{p.ok&&localStorage.setItem(Pt,s)}).catch(()=>{})}catch{}}function Ws(t){try{const e=ln(),o=U(),a=o.format("YYYY-MM-DD");return!!t&&Dn(e)&&o.hour()>=Ut&&localStorage.getItem(Pt)!==a}catch{return!1}}function Ks(){const t=U();let e=t.hour(Ut).minute(0).second(0).millisecond(0);return e.isAfter(t)||(e=e.add(1,"day")),Math.max(0,e.valueOf()-t.valueOf())}function Hs(t,e){let o=null,a=null;const s=()=>{Ws(e)&&zs(t(),e)};o=setTimeout(s,Vs);const r=()=>{a=setTimeout(()=>{s(),r()},Ks())};r();const c=()=>{document.visibilityState==="visible"&&s()},d=()=>s();return document.addEventListener("visibilitychange",c),window.addEventListener("focus",d),()=>{o&&clearTimeout(o),a&&clearTimeout(a),document.removeEventListener("visibilitychange",c),window.removeEventListener("focus",d)}}async function Fs(t){try{const{Capacitor:e,registerPlugin:o}=await Bn(async()=>{const{Capacitor:r,registerPlugin:c}=await import("./index-DNzFMgCo.js");return{Capacitor:r,registerPlugin:c}},[],import.meta.url);if(!e.isNativePlatform())return;const a=o("BadgePlugin"),s=Math.max(0,Math.floor(t||0));await a.setBadge({count:s})}catch{}}function Js(){const t=_n(),e=vo(),{events:o,search:a,setSearch:s,filteredEvents:r,updateEvent:c}=mn(),{openView:d}=Hn(),{userId:l}=Sn(),m=e.pathname==="/settings",u=e.pathname.startsWith("/settings/"),[p,h]=i.useState(!1),f=i.useRef(o);i.useEffect(()=>{f.current=o},[o]),i.useEffect(()=>Hs(()=>f.current,l),[l]),i.useEffect(()=>{if(!l)return;let S=!1;return(async()=>{const{getNotifyPermission:P,requestNotifyPermission:E,syncScheduledReminders:A}=await Bn(async()=>{const{getNotifyPermission:N,requestNotifyPermission:b,syncScheduledReminders:T}=await import("./localNotify-Dj2HAYFZ.js");return{getNotifyPermission:N,requestNotifyPermission:b,syncScheduledReminders:T}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);if(!rt().enabled)return;if(await P()==="prompt")try{await E()}catch{}S||await A(f.current)})().catch(()=>{}),()=>{S=!0}},[l]),i.useEffect(()=>{if(!l)return;let S=!1,P=0;return(async()=>{const{syncScheduledReminders:E}=await Bn(async()=>{const{syncScheduledReminders:A}=await import("./localNotify-Dj2HAYFZ.js");return{syncScheduledReminders:A}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);rt().enabled&&(P=window.setTimeout(()=>{S||E(f.current).catch(()=>{})},500))})().catch(()=>{}),()=>{S=!0,P&&window.clearTimeout(P)}},[o,l]),i.useEffect(()=>(Ht(async S=>{if(!l)throw new Error("未登录云同步账号，无法上传图片释放空间");const P=[];for(const E of S){const A=E.images||[];if(!A.some(N=>typeof N=="string"&&N.startsWith("data:"))){P.push(E);continue}const q=await it(A);P.push({...E,images:q})}return P}),()=>{Ht(null)}),[l]);const x=i.useRef(!1);i.useEffect(()=>{if(!l||x.current)return;let S=!1;return(async()=>{const P=f.current.filter(A=>(A.images||[]).some(L=>typeof L=="string"&&L.startsWith("data:")));if(!P.length)return;x.current=!0;let E=!0;for(const A of P){if(S)break;try{const L=A.images||[],q=await it(L);q.some((N,b)=>N!==L[b])&&c(A.id,{images:q})}catch{E=!1}}if(E)try{localStorage.setItem("calendarImgMigrated","1")}catch{}})(),()=>{S=!0}},[l,c]),i.useEffect(()=>{let S=!0;const P=async()=>{if(S)try{await Ma(f.current)}catch{}};P();const E=window.setInterval(P,6e4),A=()=>P(),L=()=>{document.visibilityState==="visible"&&P()};return document.addEventListener("visibilitychange",L),window.addEventListener("focus",A),()=>{S=!1,window.clearInterval(E),document.removeEventListener("visibilitychange",L),window.removeEventListener("focus",A)}},[]);const g=U(),v=i.useMemo(()=>ca(g),[g]),j=e.pathname.startsWith("/todos")?"todos":e.pathname.startsWith("/zhihu")?"zhihu":e.pathname.startsWith("/settings")?"settings":"calendar",w=i.useMemo(()=>o.filter(S=>{const P=U(S.date);return P.isValid()&&P.isSame(g,"day")&&!S.done}).length,[o,g]);return i.useEffect(()=>{const S=navigator;if(typeof S.setAppBadge=="function")try{w>0?S.setAppBadge(w).catch(()=>{}):S.clearAppBadge().catch(()=>{})}catch{}Fs(w)},[w]),n.jsxs("div",{className:"app-shell",children:[m?n.jsx("div",{className:"topbar-spacer"}):u?null:n.jsx("header",{className:"topbar",children:n.jsx("div",{className:"topbar-row",children:n.jsxs("div",{className:"topbar-title",children:[n.jsxs("div",{className:"topbar-date",children:[g.year(),"年",g.month()+1,"月",g.date(),"日"]}),n.jsxs("div",{className:"topbar-sub",children:[bn(g)," · 农历",v]})]})})}),n.jsx("div",{className:"app-content",children:n.jsx("div",{className:"app-content-inner",children:n.jsxs(po,{children:[n.jsx(hn,{path:"/",element:n.jsx(qt,{to:"/calendar",replace:!0})}),n.jsx(hn,{path:"/calendar",element:n.jsx(ms,{})}),n.jsx(hn,{path:"/todos",element:n.jsx(vs,{})}),n.jsx(hn,{path:"/zhihu",element:n.jsx(fs,{})}),n.jsx(hn,{path:"/settings",element:n.jsx(_s,{onOpenSync:()=>h(!0)})}),n.jsx(hn,{path:"/settings/reminder",element:n.jsx(Ds,{})}),n.jsx(hn,{path:"/settings/data",element:n.jsx(Ms,{})}),n.jsx(hn,{path:"/settings/versions",element:n.jsx(Ls,{})}),n.jsx(hn,{path:"/share/:id",element:n.jsx(Ys,{})}),n.jsx(hn,{path:"*",element:n.jsx(qt,{to:"/calendar",replace:!0})})]})})}),n.jsxs("nav",{className:"tabbar",children:[n.jsxs("button",{className:`tabbar-item${j==="calendar"?" active":""}`,onClick:()=>t("/calendar"),children:[n.jsx(gn,{className:"tab-ico"}),"日历",w>0&&n.jsx("span",{className:"tab-badge",children:w>99?"99+":w})]}),n.jsxs("button",{className:`tabbar-item${j==="todos"?" active":""}`,onClick:()=>t("/todos"),children:[n.jsx(Wo,{className:"tab-ico"}),"思考题"]}),n.jsxs("button",{className:`tabbar-item${j==="zhihu"?" active":""}`,onClick:()=>t("/zhihu"),children:[n.jsx(jt,{className:"tab-ico"}),"知乎"]}),n.jsxs("button",{className:`tabbar-item${j==="settings"?" active":""}`,onClick:()=>t("/settings"),children:[n.jsx(Ko,{className:"tab-ico"}),"设置"]})]}),n.jsx(ss,{}),n.jsx(cs,{}),n.jsx(qs,{open:p,onClose:()=>h(!1)}),n.jsx(cn,{open:!!a,onCancel:()=>s(""),footer:null,title:`搜索「${a}」共 ${r.length} 条`,className:"search-modal",styles:{body:{maxHeight:"70vh",overflowY:"auto"}},children:n.jsx("div",{className:"search-result-list",children:r.length===0?n.jsx("div",{className:"search-empty",children:"未找到匹配的事件"}):r.map(S=>n.jsxs("div",{className:"search-result-item",onClick:()=>{d(S),s("")},children:[n.jsx("span",{className:`sr-title${S.done?" done":""}`,children:S.title}),n.jsxs("span",{className:"sr-date",children:[S.date,S.startTime?" "+S.startTime:""]})]},S.id))})})]})}function Gs(){return n.jsx(fa,{children:n.jsx(Ba,{children:n.jsx(za,{children:n.jsx(Js,{})})})})}const Xs="calendarTheme",to=i.createContext({mode:"light",resolved:"light",setMode:()=>{}});function Qs({children:t}){const[e]=i.useState("light"),o="light";i.useLayoutEffect(()=>{document.documentElement.dataset.theme=o;try{localStorage.removeItem(Xs)}catch{}window.dispatchEvent(new CustomEvent("themechange",{detail:o}))},[o]);const a=s=>{};return n.jsx(to.Provider,{value:{mode:e,resolved:o,setMode:a},children:t})}function Zs(){return i.useContext(to).resolved}const eo='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';class nr extends ye.Component{constructor(){super(...arguments);Lt(this,"state",{error:null})}static getDerivedStateFromError(o){return{error:o}}componentDidCatch(o,a){console.error("App crashed:",o,a)}render(){var o,a;return this.state.error?n.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,fontFamily:eo,color:"#333",background:"#fff",textAlign:"center"},children:[n.jsx("div",{style:{fontSize:18,fontWeight:700,marginBottom:12},children:"页面加载出错"}),n.jsx("pre",{style:{maxWidth:"90vw",maxHeight:"40vh",overflow:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",fontSize:12,color:"#d4380d",background:"#fff1f0",border:"1px solid #ffccc7",borderRadius:8,padding:12,marginBottom:16},children:String(((o=this.state.error)==null?void 0:o.stack)||((a=this.state.error)==null?void 0:a.message)||this.state.error)}),n.jsx("button",{onClick:()=>location.reload(),style:{padding:"10px 24px",fontSize:15,color:"#fff",background:"#3b7cff",border:"none",borderRadius:10},children:"重试"})]}):this.props.children}}function tr({children:t}){const e=Zs();return n.jsx(Ho,{locale:Fo,theme:{algorithm:e==="dark"?Wt.darkAlgorithm:Wt.defaultAlgorithm,token:{colorPrimary:"#3b7cff",borderRadius:10,fontFamily:eo}},children:n.jsx(fn,{children:t})})}fo.createRoot(document.getElementById("root")).render(n.jsx(ye.StrictMode,{children:n.jsx(nr,{children:n.jsx(Qs,{children:n.jsx(tr,{children:n.jsx(go,{children:n.jsx(Gs,{})})})})})}));try{typeof window<"u"&&window.__hideBootFallback&&window.__hideBootFallback(),window.__appReady=!0}catch{}const Vn={COUNT_KEY:"appReloadCount",LAST_KEY:"appReloadAt",MAX:2,MIN_INTERVAL_MS:6e4,get(t){try{return sessionStorage.getItem(t)}catch{return null}},set(t,e){try{sessionStorage.setItem(t,e)}catch{}},del(t){try{sessionStorage.removeItem(t)}catch{}},can(){if(Number(this.get(this.COUNT_KEY)||"0")>=this.MAX)return!1;const t=Number(this.get(this.LAST_KEY)||"0");return!(t&&Date.now()-t<this.MIN_INTERVAL_MS)},mark(){this.set(this.COUNT_KEY,String(Number(this.get(this.COUNT_KEY)||"0")+1)),this.set(this.LAST_KEY,String(Date.now()))},reset(){this.set(this.COUNT_KEY,"0"),this.set(this.LAST_KEY,"0")},TARGET_KEY:"appReloadTarget",resetFor(t){this.get(this.TARGET_KEY)!==t&&(this.set(this.TARGET_KEY,t),this.reset())}},oo=function(){try{if(sessionStorage.getItem("__freshLoad"))return sessionStorage.removeItem("__freshLoad"),!0}catch{}return!1}();if("serviceWorker"in navigator&&!oo){const t=!!navigator.serviceWorker.controller;window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(o=>{o.update().catch(()=>{}),o.addEventListener("updatefound",()=>{const a=o.installing;a&&(Vn.reset(),a.addEventListener("statechange",()=>{if(a.state==="activated"&&navigator.serviceWorker.controller&&t&&Vn.can()){Vn.mark();try{sessionStorage.setItem("__freshLoad","1")}catch{}const s=location.href.includes("?")?"&":"?";location.replace(location.href.split("#")[0]+s+"_nocache="+Date.now()+(location.hash||""))}}))})}).catch(()=>{})})}(function(){const e="./version.json",o="appVersion",a=Vn;if(oo){fetch(e+"?_="+Date.now(),{cache:"no-store"}).then(s=>s.ok?s.json():null).then(s=>{if(s&&s.semver)try{localStorage.setItem(o,s.semver)}catch{}}).catch(()=>{});return}fetch(e+"?_="+Date.now(),{cache:"no-store"}).then(s=>s.ok?s.json():null).then(s=>{if(!s||!s.semver)return;let r=null;try{r=localStorage.getItem(o)}catch{return}const c=l=>{try{localStorage.setItem(o,l)}catch{}};if(!r||r===s.semver){c(s.semver);return}if(Vn.resetFor(s.semver),!a.can()){c(s.semver);return}a.mark();try{sessionStorage.setItem("__freshLoad","1")}catch{}const d=location.href.includes("?")?"&":"?";location.replace(location.href.split("#")[0]+d+"_nocache="+Date.now()+(location.hash||""))}).catch(()=>{})})();export{Bn as _,rt as g,an as p};
