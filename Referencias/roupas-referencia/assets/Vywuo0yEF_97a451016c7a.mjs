import{t as e}from"./rolldown-runtime.fXUlgfaW.mjs";import{B as t,C as n,D as r,F as i,H as a,I as o,L as s,N as c,P as l,R as u,c as d,j as f,l as p,s as m,u as h,v as g,w as _,x as v,z as ee}from"./react.BzNcCqOR.mjs";import{E as te,a as y,r as ne,t as re}from"./motion.DFHkooaG.mjs";import{F as ie,I as ae,Mt as oe,Ot as se,St as ce,_t as le,jt as ue,mt as de,o as b,pt as fe,tt as pe,z as me}from"./framer.C0ezIaSf.mjs";import{a as he,c as ge,d as _e,i as ve,n as ye,r as be,s as xe,t as Se,u as Ce}from"./Zustand.J2xjEi5Q.mjs";import{C as we,S as x,w as Te}from"./Shared_images.6a6V4nLc.mjs";function Ee(e){return g((t,n)=>{let{style:r,...i}=t;return p(e,{ref:n,...i,style:{...r,maxHeight:`100dvh`}})})}var De=e((()=>{m(),r()})),Oe,ke,Ae=e((()=>{Oe=`framership-open-cart`,ke=`framership-close-cart`}));function je(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function Me(e,t){return t.get?t.get.call(e):t.value}function Ne(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw TypeError(`attempted to set read only private field`);t.value=n}}function Pe(e,t){if(t.set){if(!t.get)throw TypeError(`attempted to read set only private field`);return`__destrWrapper`in t||(t.__destrWrapper={set value(n){t.set.call(e,n)},get value(){return t.get.call(e)}}),t.__destrWrapper}else{if(!t.writable)throw TypeError(`attempted to set read only private field`);return t}}function Fe(e,t,n){if(!t.has(e))throw TypeError(`attempted to `+n+` private field on non-instance`);return t.get(e)}function S(e,t){return Me(e,Fe(e,t,`get`))}function C(e,t,n){je(e,t),t.set(e,n)}function w(e,t,n){return Ne(e,Fe(e,t,`set`),n),n}function Ie(e,t){return Pe(e,Fe(e,t,`update`))}function T(e,t,n){if(!t.has(e))throw TypeError(`attempted to get private field on non-instance`);return n}function E(e,t){je(e,t),t.add(e)}function D(){}function Le(e){return typeof e==`number`&&e>=0&&e!==1/0}function Re(e,t){return Math.max(e+(t||0)-Date.now(),0)}function O(e,t){return typeof e==`function`?e(t):e}function k(e,t){return typeof e==`function`?e(t):e}function ze(e,t){let{type:n=`all`,exact:r,fetchStatus:i,predicate:a,queryKey:o,stale:s}=e;if(o){if(r){if(t.queryHash!==Ve(o,t.options))return!1}else if(!Ue(t.queryKey,o))return!1}if(n!==`all`){let e=t.isActive();if(n===`active`&&!e||n===`inactive`&&e)return!1}return(typeof s!=`boolean`||t.isStale()===s)&&(!i||i===t.state.fetchStatus)&&!(a&&!a(t))}function Be(e,t){let{exact:n,status:r,predicate:i,mutationKey:a}=e;if(a){if(!t.options.mutationKey)return!1;if(n){if(He(t.options.mutationKey)!==He(a))return!1}else if(!Ue(t.options.mutationKey,a))return!1}return(!r||t.state.status===r)&&!(i&&!i(t))}function Ve(e,t){return(t?.queryKeyHashFn||He)(e)}function He(e){return JSON.stringify(e,(e,t)=>qe(t)?Object.keys(t).sort().reduce((e,n)=>(e[n]=t[n],e),{}):t)}function Ue(e,t){return e===t||typeof e==typeof t&&!(!e||!t||typeof e!=`object`||typeof t!=`object`)&&Object.keys(t).every(n=>Ue(e[n],t[n]))}function We(e,t){if(e===t)return e;let n=Ke(e)&&Ke(t);if(n||qe(e)&&qe(t)){let r=n?e:Object.keys(e),i=r.length,a=n?t:Object.keys(t),o=a.length,s=n?[]:{},c=new Set(r),l=0;for(let r=0;r<o;r++){let i=n?r:a[r];(!n&&c.has(i)||n)&&e[i]===void 0&&t[i]===void 0?(s[i]=void 0,l++):(s[i]=We(e[i],t[i]),s[i]===e[i]&&e[i]!==void 0&&l++)}return i===o&&l===i?e:s}return t}function Ge(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if(e[n]!==t[n])return!1;return!0}function Ke(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function qe(e){if(!Je(e))return!1;let t=e.constructor;if(t===void 0)return!0;let n=t.prototype;return!!Je(n)&&!!n.hasOwnProperty(`isPrototypeOf`)&&Object.getPrototypeOf(e)===Object.prototype}function Je(e){return Object.prototype.toString.call(e)===`[object Object]`}function Ye(e,t,n){return typeof n.structuralSharing==`function`?n.structuralSharing(e,t):!1===n.structuralSharing?t:We(e,t)}function Xe(e,t,n=0){let r=[...e,t];return n&&r.length>n?r.slice(1):r}function Ze(e,t,n=0){let r=[t,...e];return n&&r.length>n?r.slice(0,-1):r}function Qe(e,t){return!e.queryFn&&t?.initialPromise?()=>t.initialPromise:e.queryFn&&e.queryFn!==Wn?e.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`))}function $e(e,t){return typeof e==`function`?e(...t):!!e}function et(){let e,t,n=new Promise((n,r)=>{e=n,t=r});function r(e){Object.assign(n,e),delete n.resolve,delete n.reject}return n.status=`pending`,n.catch(()=>{}),n.resolve=t=>{r({status:`fulfilled`,value:t}),e(t)},n.reject=e=>{r({status:`rejected`,reason:e}),t(e)},n}function tt(e){return Math.min(1e3*2**e,3e4)}function nt(e){return(e??`online`)!==`online`||Kn.isOnline()}function rt(e){let t,n=!1,r=0,i=et(),a=()=>i.status!==`pending`,o=()=>Gn.isFocused()&&(e.networkMode===`always`||Kn.isOnline())&&e.canRun(),s=()=>nt(e.networkMode)&&e.canRun(),c=e=>{a()||(t?.(),i.resolve(e))},l=e=>{a()||(t?.(),i.reject(e))},u=()=>new Promise(n=>{t=e=>{(a()||o())&&n(e)},e.onPause?.()}).then(()=>{t=void 0,a()||e.onContinue?.()}),d=()=>{if(a())return;let t,i=r===0?e.initialPromise:void 0;try{t=i??e.fn()}catch(e){t=Promise.reject(e)}Promise.resolve(t).then(c).catch(t=>{if(a())return;let i=e.retry??(Y?0:3),s=e.retryDelay??tt,c=typeof s==`function`?s(r,t):s,f=!0===i||typeof i==`number`&&r<i||typeof i==`function`&&i(r,t);var p;!n&&f?(r++,e.onFail?.(r,t),(p=c,new Promise(e=>{setTimeout(e,p)})).then(()=>o()?void 0:u()).then(()=>{n?l(t):d()})):l(t)})};return{promise:i,status:()=>i.status,cancel:t=>{a()||(l(new qn(t)),e.abort?.())},continue:()=>(t?.(),i),cancelRetry:()=>{n=!0},continueRetry:()=>{n=!1},canStart:s,start:()=>(s()?d():u().then(d),i)}}function it(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:nt(t.networkMode)?`fetching`:`paused`,...e===void 0&&{error:null,status:`pending`}}}function at(e){return e.options.scope?.id}function ot(e){return{onFetch:(t,n)=>{let r=t.options,i=t.fetchOptions?.meta?.fetchMore?.direction,a=t.state.data?.pages||[],o=t.state.data?.pageParams||[],s={pages:[],pageParams:[]},c=0,l=async()=>{let n=!1,l=Qe(t.options,t.fetchOptions),u=async(e,r,i)=>{if(n)return Promise.reject();if(r==null&&e.pages.length)return Promise.resolve(e);let a=await l((()=>{let e={client:t.client,queryKey:t.queryKey,pageParam:r,direction:i?`backward`:`forward`,meta:t.options.meta};var a;return a=e,Object.defineProperty(a,`signal`,{enumerable:!0,get:()=>(t.signal.aborted?n=!0:t.signal.addEventListener(`abort`,()=>{n=!0}),t.signal)}),e})()),{maxPages:o}=t.options,s=i?Ze:Xe;return{pages:s(e.pages,a,o),pageParams:s(e.pageParams,r,o)}};if(i&&a.length){let e=i===`backward`,t={pages:a,pageParams:o};s=await u(t,(e?ct:st)(r,t),e)}else{let t=e??a.length;do{let e=c===0?o[0]??r.initialPageParam:st(r,s);if(c>0&&e==null)break;s=await u(s,e),c++}while(c<t)}return s};t.options.persister?t.fetchFn=()=>t.options.persister?.(l,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},n):t.fetchFn=l}}}function st(e,{pages:t,pageParams:n}){let r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,n[r],n):void 0}function ct(e,{pages:t,pageParams:n}){return t.length>0?e.getPreviousPageParam?.(t[0],t,n[0],n):void 0}function lt(e,t){return function(e,t){return!1!==k(t.enabled,e)&&e.state.data===void 0&&!(e.state.status===`error`&&!1===t.retryOnMount)}(e,t)||e.state.data!==void 0&&ut(e,t,t.refetchOnMount)}function ut(e,t,n){if(!1!==k(t.enabled,e)&&O(t.staleTime,e)!==`static`){let r=typeof n==`function`?n(e):n;return r===`always`||!1!==r&&ft(e,t)}return!1}function dt(e,t,n,r){return(e!==t||!1===k(r.enabled,e))&&(!n.suspense||e.state.status!==`error`)&&ft(e,n)}function ft(e,t){return!1!==k(t.enabled,e)&&e.isStaleByTime(O(t.staleTime,e))}function pt(e,t){let n=new Set(t);return e.filter(e=>!n.has(e))}function mt({queries:e,...t},r){let a=ar(r),s=cr(),c=ur(),d=l(()=>e.map(e=>{let t=a.defaultQueryOptions(e);return t._optimisticResults=s?`isRestoring`:`optimistic`,t}),[e,a,s]);d.forEach(e=>{mr(e),dr(e,c)}),fr(c);let[f]=u(()=>new nr(a,d,t)),[p,m,h]=f.getOptimisticResult(d,t.combine),g=!s&&!1!==t.subscribed;n(i(e=>g?f.subscribe(X.batchCalls(e)):D,[f,g]),()=>f.getCurrentResult(),()=>f.getCurrentResult()),o(()=>{f.setQueries(d,t)},[d,t,f]);let _=p.some((e,t)=>gr(d[t],e))?p.flatMap((e,t)=>{let n=d[t];if(n){let t=new tr(a,n);if(gr(n,e))return _r(n,t,c);hr(e,s)&&_r(n,t,c)}return[]}):[];if(_.length>0)throw Promise.all(_);let v=p.find((e,t)=>{let n=d[t];return n&&pr({result:e,errorResetBoundary:c,throwOnError:n.throwOnError,query:a.getQueryCache().get(n.queryHash),suspense:n.suspense})});if(v?.error)throw v.error;return m(h())}function ht(e,t){return function(e,t,r){let a=cr(),s=ur(),c=ar(r),l=c.defaultQueryOptions(e);c.getDefaultOptions().queries?._experimental_beforeQuery?.(l),l._optimisticResults=a?`isRestoring`:`optimistic`,mr(l),dr(l,s),fr(s);let d=!c.getQueryCache().get(l.queryHash),[f]=u(()=>new t(c,l)),p=f.getOptimisticResult(l),m=!a&&!1!==e.subscribed;if(n(i(e=>{let t=m?f.subscribe(X.batchCalls(e)):D;return f.updateResult(),t},[f,m]),()=>f.getCurrentResult(),()=>f.getCurrentResult()),o(()=>{f.setOptions(l)},[l,f]),gr(l,p))throw _r(l,f,s);if(pr({result:p,errorResetBoundary:s,throwOnError:l.throwOnError,query:c.getQueryCache().get(l.queryHash),suspense:l.suspense}))throw p.error;return c.getDefaultOptions().queries?._experimental_afterQuery?.(l,p),l.experimental_prefetchInRender&&!Y&&hr(p,a)&&(d?_r(l,f,s):c.getQueryCache().get(l.queryHash)?.promise)?.catch(D).finally(()=>{f.updateResult()}),l.notifyOnChangeProps?p:f.trackResult(p)}(e,tr,t)}function gt(e,t){let r=ar(t),[a]=u(()=>new rr(r,e));o(()=>{a.setOptions(e)},[a,e]);let s=n(i(e=>a.subscribe(X.batchCalls(e)),[a]),()=>a.getCurrentResult(),()=>a.getCurrentResult()),c=i((e,t)=>{a.mutate(e,t).catch(D)},[a]);if(s.error&&$e(a.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:c,mutateAsync:s.mutate}}function _t(e){this.state=(t=>{switch(e.type){case`failed`:return{...t,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case`pause`:return{...t,fetchStatus:`paused`};case`continue`:return{...t,fetchStatus:`fetching`};case`fetch`:return{...t,...it(t.data,this.options),fetchMeta:e.meta??null};case`success`:let n={...t,data:e.data,dataUpdateCount:t.dataUpdateCount+1,dataUpdatedAt:e.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:`success`,...!e.manual&&{fetchStatus:`idle`,fetchFailureCount:0,fetchFailureReason:null}};return w(this,Ut,e.manual?n:void 0),n;case`error`:let r=e.error;return{...t,error:r,errorUpdateCount:t.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:t.fetchFailureCount+1,fetchFailureReason:r,fetchStatus:`idle`,status:`error`};case`invalidate`:return{...t,isInvalidated:!0};case`setState`:return{...t,...e.state}}})(this.state),X.batch(()=>{this.observers.forEach(e=>{e.onQueryUpdate()}),S(this,A).notify({query:this,type:`updated`,action:e})})}function vt(e){this.state=(t=>{switch(e.type){case`failed`:return{...t,failureCount:e.failureCount,failureReason:e.error};case`pause`:return{...t,isPaused:!0};case`continue`:return{...t,isPaused:!1};case`pending`:return{...t,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:e.isPaused,status:`pending`,variables:e.variables,submittedAt:Date.now()};case`success`:return{...t,data:e.data,failureCount:0,failureReason:null,error:null,status:`success`,isPaused:!1};case`error`:return{...t,data:void 0,error:e.error,failureCount:t.failureCount+1,failureReason:e.error,isPaused:!1,status:`error`}}})(this.state),X.batch(()=>{S(this,P).forEach(t=>{t.onMutationUpdate(e)}),S(this,F).notify({mutation:this,type:`updated`,action:e})})}function yt(e){T(this,Cn,Et).call(this);let t=S(this,V).fetch(this.options,e);return e?.throwOnError||(t=t.catch(D)),t}function bt(){T(this,xn,wt).call(this);let e=O(this.options.staleTime,S(this,V));if(Y||S(this,H).isStale||!Le(e))return;let t=Re(S(this,H).dataUpdatedAt,e)+1;w(this,fn,setTimeout(()=>{S(this,H).isStale||this.updateResult()},t))}function xt(){return(typeof this.options.refetchInterval==`function`?this.options.refetchInterval(S(this,V)):this.options.refetchInterval)??!1}function St(e){T(this,Sn,Tt).call(this),w(this,mn,e),!Y&&!1!==k(this.options.enabled,S(this,V))&&Le(S(this,mn))&&S(this,mn)!==0&&w(this,pn,setInterval(()=>{(this.options.refetchIntervalInBackground||Gn.isFocused())&&T(this,gn,yt).call(this)},S(this,mn)))}function Ct(){T(this,_n,bt).call(this),T(this,yn,St).call(this,T(this,vn,xt).call(this))}function wt(){S(this,fn)&&(clearTimeout(S(this,fn)),w(this,fn,void 0))}function Tt(){S(this,pn)&&(clearInterval(S(this,pn)),w(this,pn,void 0))}function Et(){let e=S(this,B).getQueryCache().build(S(this,B),this.options);if(e===S(this,V))return;let t=S(this,V);w(this,V,e),w(this,an,e.state),this.hasListeners()&&(t?.removeObserver(this),e.addObserver(this))}function Dt(e){X.batch(()=>{e.listeners&&this.listeners.forEach(e=>{e(S(this,H))}),S(this,B).getQueryCache().notify({query:S(this,V),type:`observerResultsUpdated`})})}function Ot(e,t){return t.map((n,r)=>{let i=e[r];return n.defaultedQueryOptions.notifyOnChangeProps?i:n.observer.trackResult(i,e=>{t.forEach(t=>{t.observer.trackProp(e)})})})}function kt(e,t){return t?(S(this,kn)&&S(this,W)===S(this,jn)&&t===S(this,An)||(w(this,An,t),w(this,jn,S(this,W)),w(this,kn,We(S(this,kn),t(e)))),S(this,kn)):e}function At(e){let t=new Map(S(this,G).map(e=>[e.options.queryHash,e])),n=[];return e.forEach(e=>{let r=S(this,En).defaultQueryOptions(e),i=t.get(r.queryHash);i?n.push({defaultedQueryOptions:r,observer:i}):n.push({defaultedQueryOptions:r,observer:new tr(S(this,En),r)})}),n}function jt(e,t){let n=S(this,G).indexOf(e);n!==-1&&(w(this,W,function(e,t,n){let r=e.slice(0);return r[t]=n,r}(S(this,W),n,t)),T(this,Ln,Mt).call(this))}function Mt(){if(this.hasListeners()){let e=S(this,kn),t=T(this,Nn,Ot).call(this,S(this,W),S(this,Mn));e!==T(this,Pn,kt).call(this,t,S(this,On)?.combine)&&X.batch(()=>{this.listeners.forEach(e=>{e(S(this,W))})})}}function Nt(){let e=S(this,K)?.state??{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:`idle`,variables:void 0,submittedAt:0};w(this,Bn,{...e,isPending:e.status===`pending`,isSuccess:e.status===`success`,isError:e.status===`error`,isIdle:e.status===`idle`,mutate:this.mutate,reset:this.reset})}function Pt(e){X.batch(()=>{if(S(this,q)&&this.hasListeners()){let t=S(this,Bn).variables,n=S(this,Bn).context;e?.type===`success`?(S(this,q).onSuccess?.(e.data,t,n),S(this,q).onSettled?.(e.data,null,t,n)):e?.type===`error`&&(S(this,q).onError?.(e.error,t,n),S(this,q).onSettled?.(void 0,e.error,t,n))}this.listeners.forEach(e=>{e(S(this,Bn))})})}var Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,A,Wt,j,Gt,Kt,M,qt,N,P,F,Jt,I,Yt,L,R,Xt,z,Zt,Qt,$t,en,tn,nn,rn,B,V,an,H,on,sn,U,cn,ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn,En,W,Dn,On,G,kn,An,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,K,q,Vn,Hn,Un,J,Y,Wn,Gn,Kn,qn,Jn,X,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr=e((()=>{t(),r(),m(),J=class{subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}},Y=a===void 0||`Deno`in globalThis,Wn=Symbol(),Gn=new(Ft=new WeakMap,It=new WeakMap,Lt=new WeakMap,class extends J{onSubscribe(){S(this,It)||this.setEventListener(S(this,Lt))}onUnsubscribe(){this.hasListeners()||(S(this,It)?.call(this),w(this,It,void 0))}setEventListener(e){w(this,Lt,e),S(this,It)?.call(this),w(this,It,e(e=>{typeof e==`boolean`?this.setFocused(e):this.onFocus()}))}setFocused(e){S(this,Ft)!==e&&(w(this,Ft,e),this.onFocus())}onFocus(){let e=this.isFocused();this.listeners.forEach(t=>{t(e)})}isFocused(){return typeof S(this,Ft)==`boolean`?S(this,Ft):globalThis.document?.visibilityState!==`hidden`}constructor(){super(),C(this,Ft,{writable:!0,value:void 0}),C(this,It,{writable:!0,value:void 0}),C(this,Lt,{writable:!0,value:void 0}),w(this,Lt,e=>{if(!Y&&a.addEventListener){let t=()=>e();return a.addEventListener(`visibilitychange`,t,!1),()=>{a.removeEventListener(`visibilitychange`,t)}}})}}),Kn=new(Rt=new WeakMap,zt=new WeakMap,Bt=new WeakMap,class extends J{onSubscribe(){S(this,zt)||this.setEventListener(S(this,Bt))}onUnsubscribe(){this.hasListeners()||(S(this,zt)?.call(this),w(this,zt,void 0))}setEventListener(e){w(this,Bt,e),S(this,zt)?.call(this),w(this,zt,e(this.setOnline.bind(this)))}setOnline(e){S(this,Rt)!==e&&(w(this,Rt,e),this.listeners.forEach(t=>{t(e)}))}isOnline(){return S(this,Rt)}constructor(){super(),C(this,Rt,{writable:!0,value:!0}),C(this,zt,{writable:!0,value:void 0}),C(this,Bt,{writable:!0,value:void 0}),w(this,Bt,e=>{if(!Y&&a.addEventListener){let t=()=>e(!0),n=()=>e(!1);return a.addEventListener(`online`,t,!1),a.addEventListener(`offline`,n,!1),()=>{a.removeEventListener(`online`,t),a.removeEventListener(`offline`,n)}}})}}),qn=class extends Error{constructor(e){super(`CancelledError`),this.revert=e?.revert,this.silent=e?.silent}},Jn=e=>setTimeout(e,0),X=function(){let e=[],t=0,n=e=>{e()},r=e=>{e()},i=Jn,a=r=>{t?e.push(r):i(()=>{n(r)})};return{batch:a=>{let o;t++;try{o=a()}finally{t--,t||(()=>{let t=e;e=[],t.length&&i(()=>{r(()=>{t.forEach(e=>{n(e)})})})})()}return o},batchCalls:e=>(...t)=>{a(()=>{e(...t)})},schedule:a,setNotifyFunction:e=>{n=e},setBatchNotifyFunction:e=>{r=e},setScheduler:e=>{i=e}}}(),Yn=(Vt=new WeakMap,class{destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Le(this.gcTime)&&w(this,Vt,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(Y?1/0:3e5))}clearGcTimeout(){S(this,Vt)&&(clearTimeout(S(this,Vt)),w(this,Vt,void 0))}constructor(){C(this,Vt,{writable:!0,value:void 0})}}),Xn=(Ht=new WeakMap,Ut=new WeakMap,A=new WeakMap,Wt=new WeakMap,j=new WeakMap,Gt=new WeakMap,Kt=new WeakMap,M=new WeakSet,qt=class extends Yn{get meta(){return this.options.meta}get promise(){return S(this,j)?.promise}setOptions(e){this.options={...S(this,Gt),...e},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||this.state.fetchStatus!==`idle`||S(this,A).remove(this)}setData(e,t){let n=Ye(this.state.data,e,this.options);return T(this,M,_t).call(this,{data:n,type:`success`,dataUpdatedAt:t?.updatedAt,manual:t?.manual}),n}setState(e,t){T(this,M,_t).call(this,{type:`setState`,state:e,setStateOptions:t})}cancel(e){let t=S(this,j)?.promise;return S(this,j)?.cancel(e),t?t.then(D).catch(D):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(S(this,Ht))}isActive(){return this.observers.some(e=>!1!==k(e.options.enabled,this))}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Wn||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0&&this.observers.some(e=>O(e.options.staleTime,this)===`static`)}isStale(){return this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(e=0){return this.state.data===void 0||e!==`static`&&(!!this.state.isInvalidated||!Re(this.state.dataUpdatedAt,e))}onFocus(){this.observers.find(e=>e.shouldFetchOnWindowFocus())?.refetch({cancelRefetch:!1}),S(this,j)?.continue()}onOnline(){this.observers.find(e=>e.shouldFetchOnReconnect())?.refetch({cancelRefetch:!1}),S(this,j)?.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),S(this,A).notify({type:`observerAdded`,query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(S(this,j)&&(S(this,Kt)?S(this,j).cancel({revert:!0}):S(this,j).cancelRetry()),this.scheduleGc()),S(this,A).notify({type:`observerRemoved`,query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||T(this,M,_t).call(this,{type:`invalidate`})}async fetch(e,t){if(this.state.fetchStatus!==`idle`&&S(this,j)?.status()!==`rejected`){if(this.state.data!==void 0&&t?.cancelRefetch)this.cancel({silent:!0});else if(S(this,j))return S(this,j).continueRetry(),S(this,j).promise}if(e&&this.setOptions(e),!this.options.queryFn){let e=this.observers.find(e=>e.options.queryFn);e&&this.setOptions(e.options)}let n=new AbortController,r=e=>{Object.defineProperty(e,`signal`,{enumerable:!0,get:()=>(w(this,Kt,!0),n.signal)})},i=()=>{let e=Qe(this.options,t),n=(()=>{let e={client:S(this,Wt),queryKey:this.queryKey,meta:this.meta};return r(e),e})();return w(this,Kt,!1),this.options.persister?this.options.persister(e,n,this):e(n)},a=(()=>{let e={fetchOptions:t,options:this.options,queryKey:this.queryKey,client:S(this,Wt),state:this.state,fetchFn:i};return r(e),e})();this.options.behavior?.onFetch(a,this),w(this,Ut,this.state),this.state.fetchStatus!==`idle`&&this.state.fetchMeta===a.fetchOptions?.meta||T(this,M,_t).call(this,{type:`fetch`,meta:a.fetchOptions?.meta}),w(this,j,rt({initialPromise:t?.initialPromise,fn:a.fetchFn,abort:n.abort.bind(n),onFail:(e,t)=>{T(this,M,_t).call(this,{type:`failed`,failureCount:e,error:t})},onPause:()=>{T(this,M,_t).call(this,{type:`pause`})},onContinue:()=>{T(this,M,_t).call(this,{type:`continue`})},retry:a.options.retry,retryDelay:a.options.retryDelay,networkMode:a.options.networkMode,canRun:()=>!0}));try{let e=await S(this,j).start();if(e===void 0)throw Error(`${this.queryHash} data is undefined`);return this.setData(e),S(this,A).config.onSuccess?.(e,this),S(this,A).config.onSettled?.(e,this.state.error,this),e}catch(e){if(e instanceof qn){if(e.silent)return S(this,j).promise;if(e.revert){if(this.setState({...S(this,Ut),fetchStatus:`idle`}),this.state.data===void 0)throw e;return this.state.data}}throw T(this,M,_t).call(this,{type:`error`,error:e}),S(this,A).config.onError?.(e,this),S(this,A).config.onSettled?.(this.state.data,e,this),e}finally{this.scheduleGc()}}constructor(e){super(),E(this,M),C(this,Ht,{writable:!0,value:void 0}),C(this,Ut,{writable:!0,value:void 0}),C(this,A,{writable:!0,value:void 0}),C(this,Wt,{writable:!0,value:void 0}),C(this,j,{writable:!0,value:void 0}),C(this,Gt,{writable:!0,value:void 0}),C(this,Kt,{writable:!0,value:void 0}),w(this,Kt,!1),w(this,Gt,e.defaultOptions),this.setOptions(e.options),this.observers=[],w(this,Wt,e.client),w(this,A,S(this,Wt).getQueryCache()),this.queryKey=e.queryKey,this.queryHash=e.queryHash,w(this,Ht,function(e){let t=typeof e.initialData==`function`?e.initialData():e.initialData,n=t!==void 0,r=n?typeof e.initialDataUpdatedAt==`function`?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?`success`:`pending`,fetchStatus:`idle`}}(this.options)),this.state=e.state??S(this,Ht),this.scheduleGc()}},qt),Zn=(N=new WeakMap,class extends J{build(e,t,n){let r=t.queryKey,i=t.queryHash??Ve(r,t),a=this.get(i);return a||(a=new Xn({client:e,queryKey:r,queryHash:i,options:e.defaultQueryOptions(t),state:n,defaultOptions:e.getQueryDefaults(r)}),this.add(a)),a}add(e){S(this,N).has(e.queryHash)||(S(this,N).set(e.queryHash,e),this.notify({type:`added`,query:e}))}remove(e){let t=S(this,N).get(e.queryHash);t&&(e.destroy(),t===e&&S(this,N).delete(e.queryHash),this.notify({type:`removed`,query:e}))}clear(){X.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return S(this,N).get(e)}getAll(){return[...S(this,N).values()]}find(e){let t={exact:!0,...e};return this.getAll().find(e=>ze(t,e))}findAll(e={}){let t=this.getAll();return Object.keys(e).length>0?t.filter(t=>ze(e,t)):t}notify(e){X.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){X.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){X.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}constructor(e={}){super(),C(this,N,{writable:!0,value:void 0}),this.config=e,w(this,N,new Map)}}),Qn=(P=new WeakMap,F=new WeakMap,Jt=new WeakMap,I=new WeakSet,Yt=class extends Yn{setOptions(e){this.options=e,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(e){S(this,P).includes(e)||(S(this,P).push(e),this.clearGcTimeout(),S(this,F).notify({type:`observerAdded`,mutation:this,observer:e}))}removeObserver(e){w(this,P,S(this,P).filter(t=>t!==e)),this.scheduleGc(),S(this,F).notify({type:`observerRemoved`,mutation:this,observer:e})}optionalRemove(){S(this,P).length||(this.state.status===`pending`?this.scheduleGc():S(this,F).remove(this))}continue(){return S(this,Jt)?.continue()??this.execute(this.state.variables)}async execute(e){let t=()=>{T(this,I,vt).call(this,{type:`continue`})};w(this,Jt,rt({fn:()=>this.options.mutationFn?this.options.mutationFn(e):Promise.reject(Error(`No mutationFn found`)),onFail:(e,t)=>{T(this,I,vt).call(this,{type:`failed`,failureCount:e,error:t})},onPause:()=>{T(this,I,vt).call(this,{type:`pause`})},onContinue:t,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>S(this,F).canRun(this)}));let n=this.state.status===`pending`,r=!S(this,Jt).canStart();try{if(n)t();else{T(this,I,vt).call(this,{type:`pending`,variables:e,isPaused:r}),await S(this,F).config.onMutate?.(e,this);let t=await this.options.onMutate?.(e);t!==this.state.context&&T(this,I,vt).call(this,{type:`pending`,context:t,variables:e,isPaused:r})}let i=await S(this,Jt).start();return await S(this,F).config.onSuccess?.(i,e,this.state.context,this),await this.options.onSuccess?.(i,e,this.state.context),await S(this,F).config.onSettled?.(i,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(i,null,e,this.state.context),T(this,I,vt).call(this,{type:`success`,data:i}),i}catch(t){try{throw await S(this,F).config.onError?.(t,e,this.state.context,this),await this.options.onError?.(t,e,this.state.context),await S(this,F).config.onSettled?.(void 0,t,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,t,e,this.state.context),t}finally{T(this,I,vt).call(this,{type:`error`,error:t})}}finally{S(this,F).runNext(this)}}constructor(e){super(),E(this,I),C(this,P,{writable:!0,value:void 0}),C(this,F,{writable:!0,value:void 0}),C(this,Jt,{writable:!0,value:void 0}),this.mutationId=e.mutationId,w(this,F,e.mutationCache),w(this,P,[]),this.state=e.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:`idle`,variables:void 0,submittedAt:0},this.setOptions(e.options),this.scheduleGc()}},Yt),$n=(L=new WeakMap,R=new WeakMap,Xt=new WeakMap,class extends J{build(e,t,n){let r=new Qn({mutationCache:this,mutationId:++Ie(this,Xt).value,options:e.defaultMutationOptions(t),state:n});return this.add(r),r}add(e){S(this,L).add(e);let t=at(e);if(typeof t==`string`){let n=S(this,R).get(t);n?n.push(e):S(this,R).set(t,[e])}this.notify({type:`added`,mutation:e})}remove(e){if(S(this,L).delete(e)){let t=at(e);if(typeof t==`string`){let n=S(this,R).get(t);if(n)if(n.length>1){let t=n.indexOf(e);t!==-1&&n.splice(t,1)}else n[0]===e&&S(this,R).delete(t)}}this.notify({type:`removed`,mutation:e})}canRun(e){let t=at(e);if(typeof t==`string`){let n=S(this,R).get(t)?.find(e=>e.state.status===`pending`);return!n||n===e}return!0}runNext(e){let t=at(e);return typeof t==`string`?(S(this,R).get(t)?.find(t=>t!==e&&t.state.isPaused))?.continue()??Promise.resolve():Promise.resolve()}clear(){X.batch(()=>{S(this,L).forEach(e=>{this.notify({type:`removed`,mutation:e})}),S(this,L).clear(),S(this,R).clear()})}getAll(){return Array.from(S(this,L))}find(e){let t={exact:!0,...e};return this.getAll().find(e=>Be(t,e))}findAll(e={}){return this.getAll().filter(t=>Be(e,t))}notify(e){X.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){let e=this.getAll().filter(e=>e.state.isPaused);return X.batch(()=>Promise.all(e.map(e=>e.continue().catch(D))))}constructor(e={}){super(),C(this,L,{writable:!0,value:void 0}),C(this,R,{writable:!0,value:void 0}),C(this,Xt,{writable:!0,value:void 0}),this.config=e,w(this,L,new Set),w(this,R,new Map),w(this,Xt,0)}}),er=(z=new WeakMap,Zt=new WeakMap,Qt=new WeakMap,$t=new WeakMap,en=new WeakMap,tn=new WeakMap,nn=new WeakMap,rn=new WeakMap,class{mount(){Ie(this,tn).value++,S(this,tn)===1&&(w(this,nn,Gn.subscribe(async e=>{e&&(await this.resumePausedMutations(),S(this,z).onFocus())})),w(this,rn,Kn.subscribe(async e=>{e&&(await this.resumePausedMutations(),S(this,z).onOnline())})))}unmount(){Ie(this,tn).value--,S(this,tn)===0&&(S(this,nn)?.call(this),w(this,nn,void 0),S(this,rn)?.call(this),w(this,rn,void 0))}isFetching(e){return S(this,z).findAll({...e,fetchStatus:`fetching`}).length}isMutating(e){return S(this,Zt).findAll({...e,status:`pending`}).length}getQueryData(e){let t=this.defaultQueryOptions({queryKey:e});return S(this,z).get(t.queryHash)?.state.data}ensureQueryData(e){let t=this.defaultQueryOptions(e),n=S(this,z).build(this,t),r=n.state.data;return r===void 0?this.fetchQuery(e):(e.revalidateIfStale&&n.isStaleByTime(O(t.staleTime,n))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return S(this,z).findAll(e).map(({queryKey:e,state:t})=>[e,t.data])}setQueryData(e,t,n){let r=this.defaultQueryOptions({queryKey:e}),i=function(e,t){return typeof e==`function`?e(t):e}(t,S(this,z).get(r.queryHash)?.state.data);if(i!==void 0)return S(this,z).build(this,r).setData(i,{...n,manual:!0})}setQueriesData(e,t,n){return X.batch(()=>S(this,z).findAll(e).map(({queryKey:e})=>[e,this.setQueryData(e,t,n)]))}getQueryState(e){let t=this.defaultQueryOptions({queryKey:e});return S(this,z).get(t.queryHash)?.state}removeQueries(e){let t=S(this,z);X.batch(()=>{t.findAll(e).forEach(e=>{t.remove(e)})})}resetQueries(e,t){let n=S(this,z);return X.batch(()=>(n.findAll(e).forEach(e=>{e.reset()}),this.refetchQueries({type:`active`,...e},t)))}cancelQueries(e,t={}){let n={revert:!0,...t},r=X.batch(()=>S(this,z).findAll(e).map(e=>e.cancel(n)));return Promise.all(r).then(D).catch(D)}invalidateQueries(e,t={}){return X.batch(()=>(S(this,z).findAll(e).forEach(e=>{e.invalidate()}),e?.refetchType===`none`?Promise.resolve():this.refetchQueries({...e,type:e?.refetchType??e?.type??`active`},t)))}refetchQueries(e,t={}){let n={...t,cancelRefetch:t.cancelRefetch??!0},r=X.batch(()=>S(this,z).findAll(e).filter(e=>!e.isDisabled()&&!e.isStatic()).map(e=>{let t=e.fetch(void 0,n);return n.throwOnError||(t=t.catch(D)),e.state.fetchStatus===`paused`?Promise.resolve():t}));return Promise.all(r).then(D)}fetchQuery(e){let t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);let n=S(this,z).build(this,t);return n.isStaleByTime(O(t.staleTime,n))?n.fetch(t):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(D).catch(D)}fetchInfiniteQuery(e){return e.behavior=ot(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(D).catch(D)}ensureInfiniteQueryData(e){return e.behavior=ot(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return Kn.isOnline()?S(this,Zt).resumePausedMutations():Promise.resolve()}getQueryCache(){return S(this,z)}getMutationCache(){return S(this,Zt)}getDefaultOptions(){return S(this,Qt)}setDefaultOptions(e){w(this,Qt,e)}setQueryDefaults(e,t){S(this,$t).set(He(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){let t=[...S(this,$t).values()],n={};return t.forEach(t=>{Ue(e,t.queryKey)&&Object.assign(n,t.defaultOptions)}),n}setMutationDefaults(e,t){S(this,en).set(He(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){let t=[...S(this,en).values()],n={};return t.forEach(t=>{Ue(e,t.mutationKey)&&Object.assign(n,t.defaultOptions)}),n}defaultQueryOptions(e){if(e._defaulted)return e;let t={...S(this,Qt).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||=Ve(t.queryKey,t),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!==`always`),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode=`offlineFirst`),t.queryFn===Wn&&(t.enabled=!1),t}defaultMutationOptions(e){return e?._defaulted?e:{...S(this,Qt).mutations,...e?.mutationKey&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){S(this,z).clear(),S(this,Zt).clear()}constructor(e={}){C(this,z,{writable:!0,value:void 0}),C(this,Zt,{writable:!0,value:void 0}),C(this,Qt,{writable:!0,value:void 0}),C(this,$t,{writable:!0,value:void 0}),C(this,en,{writable:!0,value:void 0}),C(this,tn,{writable:!0,value:void 0}),C(this,nn,{writable:!0,value:void 0}),C(this,rn,{writable:!0,value:void 0}),w(this,z,e.queryCache||new Zn),w(this,Zt,e.mutationCache||new $n),w(this,Qt,e.defaultOptions||{}),w(this,$t,new Map),w(this,en,new Map),w(this,tn,0)}}),tr=(B=new WeakMap,V=new WeakMap,an=new WeakMap,H=new WeakMap,on=new WeakMap,sn=new WeakMap,U=new WeakMap,cn=new WeakMap,ln=new WeakMap,un=new WeakMap,dn=new WeakMap,fn=new WeakMap,pn=new WeakMap,mn=new WeakMap,hn=new WeakMap,gn=new WeakSet,_n=new WeakSet,vn=new WeakSet,yn=new WeakSet,bn=new WeakSet,xn=new WeakSet,Sn=new WeakSet,Cn=new WeakSet,wn=new WeakSet,Tn=class extends J{bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(S(this,V).addObserver(this),lt(S(this,V),this.options)?T(this,gn,yt).call(this):this.updateResult(),T(this,bn,Ct).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return ut(S(this,V),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return ut(S(this,V),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,T(this,xn,wt).call(this),T(this,Sn,Tt).call(this),S(this,V).removeObserver(this)}setOptions(e){let t=this.options,n=S(this,V);if(this.options=S(this,B).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!=`boolean`&&typeof this.options.enabled!=`function`&&typeof k(this.options.enabled,S(this,V))!=`boolean`)throw Error(`Expected enabled to be a boolean or a callback that returns a boolean`);T(this,Cn,Et).call(this),S(this,V).setOptions(this.options),t._defaulted&&!Ge(this.options,t)&&S(this,B).getQueryCache().notify({type:`observerOptionsUpdated`,query:S(this,V),observer:this});let r=this.hasListeners();r&&dt(S(this,V),n,this.options,t)&&T(this,gn,yt).call(this),this.updateResult(),!r||S(this,V)===n&&k(this.options.enabled,S(this,V))===k(t.enabled,S(this,V))&&O(this.options.staleTime,S(this,V))===O(t.staleTime,S(this,V))||T(this,_n,bt).call(this);let i=T(this,vn,xt).call(this);!r||S(this,V)===n&&k(this.options.enabled,S(this,V))===k(t.enabled,S(this,V))&&i===S(this,mn)||T(this,yn,St).call(this,i)}getOptimisticResult(e){let t=S(this,B).getQueryCache().build(S(this,B),e),n=this.createResult(t,e);return function(e,t){return!Ge(e.getCurrentResult(),t)}(this,n)&&(w(this,H,n),w(this,sn,this.options),w(this,on,S(this,V).state)),n}getCurrentResult(){return S(this,H)}trackResult(e,t){return new Proxy(e,{get:(e,n)=>(this.trackProp(n),t?.(n),n!==`promise`||this.options.experimental_prefetchInRender||S(this,U).status!==`pending`||S(this,U).reject(Error(`experimental_prefetchInRender feature flag is not enabled`)),Reflect.get(e,n))})}trackProp(e){S(this,hn).add(e)}getCurrentQuery(){return S(this,V)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){let t=S(this,B).defaultQueryOptions(e),n=S(this,B).getQueryCache().build(S(this,B),t);return n.fetch().then(()=>this.createResult(n,t))}fetch(e){return T(this,gn,yt).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),S(this,H)))}createResult(e,t){let n=S(this,V),r=this.options,i=S(this,H),a=S(this,on),o=S(this,sn),s=e===n?S(this,an):e.state,{state:c}=e,l,u={...c},d=!1;if(t._optimisticResults){let i=this.hasListeners(),a=!i&&lt(e,t),o=i&&dt(e,n,t,r);(a||o)&&(u={...u,...it(c.data,e.options)}),t._optimisticResults===`isRestoring`&&(u.fetchStatus=`idle`)}let{error:f,errorUpdatedAt:p,status:m}=u;l=u.data;let h=!1;if(t.placeholderData!==void 0&&l===void 0&&m===`pending`){let e;i?.isPlaceholderData&&t.placeholderData===o?.placeholderData?(e=i.data,h=!0):e=typeof t.placeholderData==`function`?t.placeholderData(S(this,dn)?.state.data,S(this,dn)):t.placeholderData,e!==void 0&&(m=`success`,l=Ye(i?.data,e,t),d=!0)}if(t.select&&l!==void 0&&!h)if(i&&l===a?.data&&t.select===S(this,ln))l=S(this,un);else try{w(this,ln,t.select),l=t.select(l),l=Ye(i?.data,l,t),w(this,un,l),w(this,cn,null)}catch(e){w(this,cn,e)}S(this,cn)&&(f=S(this,cn),l=S(this,un),p=Date.now(),m=`error`);let g=u.fetchStatus===`fetching`,_=m===`pending`,v=m===`error`,ee=_&&g,te=l!==void 0,y={status:m,fetchStatus:u.fetchStatus,isPending:_,isSuccess:m===`success`,isError:v,isInitialLoading:ee,isLoading:ee,data:l,dataUpdatedAt:u.dataUpdatedAt,error:f,errorUpdatedAt:p,failureCount:u.fetchFailureCount,failureReason:u.fetchFailureReason,errorUpdateCount:u.errorUpdateCount,isFetched:u.dataUpdateCount>0||u.errorUpdateCount>0,isFetchedAfterMount:u.dataUpdateCount>s.dataUpdateCount||u.errorUpdateCount>s.errorUpdateCount,isFetching:g,isRefetching:g&&!_,isLoadingError:v&&!te,isPaused:u.fetchStatus===`paused`,isPlaceholderData:d,isRefetchError:v&&te,isStale:ft(e,t),refetch:this.refetch,promise:S(this,U),isEnabled:!1!==k(t.enabled,e)};if(this.options.experimental_prefetchInRender){let t=e=>{y.status===`error`?e.reject(y.error):y.data!==void 0&&e.resolve(y.data)},r=()=>{t(w(this,U,y.promise=et()))},i=S(this,U);switch(i.status){case`pending`:e.queryHash===n.queryHash&&t(i);break;case`fulfilled`:y.status!==`error`&&y.data===i.value||r();break;case`rejected`:y.status===`error`&&y.error===i.reason||r()}}return y}updateResult(){let e=S(this,H),t=this.createResult(S(this,V),this.options);w(this,on,S(this,V).state),w(this,sn,this.options),S(this,on).data!==void 0&&w(this,dn,S(this,V)),!Ge(t,e)&&(w(this,H,t),T(this,wn,Dt).call(this,{listeners:(()=>{if(!e)return!0;let{notifyOnChangeProps:t}=this.options,n=typeof t==`function`?t():t;if(n===`all`||!n&&!S(this,hn).size)return!0;let r=new Set(n??S(this,hn));return this.options.throwOnError&&r.add(`error`),Object.keys(S(this,H)).some(t=>{let n=t;return S(this,H)[n]!==e[n]&&r.has(n)})})()}))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&T(this,bn,Ct).call(this)}constructor(e,t){super(),E(this,gn),E(this,_n),E(this,vn),E(this,yn),E(this,bn),E(this,xn),E(this,Sn),E(this,Cn),E(this,wn),C(this,B,{writable:!0,value:void 0}),C(this,V,{writable:!0,value:void 0}),C(this,an,{writable:!0,value:void 0}),C(this,H,{writable:!0,value:void 0}),C(this,on,{writable:!0,value:void 0}),C(this,sn,{writable:!0,value:void 0}),C(this,U,{writable:!0,value:void 0}),C(this,cn,{writable:!0,value:void 0}),C(this,ln,{writable:!0,value:void 0}),C(this,un,{writable:!0,value:void 0}),C(this,dn,{writable:!0,value:void 0}),C(this,fn,{writable:!0,value:void 0}),C(this,pn,{writable:!0,value:void 0}),C(this,mn,{writable:!0,value:void 0}),C(this,hn,{writable:!0,value:new Set}),this.options=t,w(this,B,e),w(this,cn,null),w(this,U,et()),this.bindMethods(),this.setOptions(t)}},Tn),nr=(En=new WeakMap,W=new WeakMap,Dn=new WeakMap,On=new WeakMap,G=new WeakMap,kn=new WeakMap,An=new WeakMap,jn=new WeakMap,Mn=new WeakMap,Nn=new WeakSet,Pn=new WeakSet,Fn=new WeakSet,In=new WeakSet,Ln=new WeakSet,Rn=class extends J{onSubscribe(){this.listeners.size===1&&S(this,G).forEach(e=>{e.subscribe(t=>{T(this,In,jt).call(this,e,t)})})}onUnsubscribe(){this.listeners.size||this.destroy()}destroy(){this.listeners=new Set,S(this,G).forEach(e=>{e.destroy()})}setQueries(e,t){w(this,Dn,e),w(this,On,t),X.batch(()=>{let e=S(this,G),t=T(this,Fn,At).call(this,S(this,Dn));w(this,Mn,t),t.forEach(e=>e.observer.setOptions(e.defaultedQueryOptions));let n=t.map(e=>e.observer),r=n.map(e=>e.getCurrentResult()),i=n.some((t,n)=>t!==e[n]);(e.length!==n.length||i)&&(w(this,G,n),w(this,W,r),this.hasListeners()&&(pt(e,n).forEach(e=>{e.destroy()}),pt(n,e).forEach(e=>{e.subscribe(t=>{T(this,In,jt).call(this,e,t)})}),T(this,Ln,Mt).call(this)))})}getCurrentResult(){return S(this,W)}getQueries(){return S(this,G).map(e=>e.getCurrentQuery())}getObservers(){return S(this,G)}getOptimisticResult(e,t){let n=T(this,Fn,At).call(this,e),r=n.map(e=>e.observer.getOptimisticResult(e.defaultedQueryOptions));return[r,e=>T(this,Pn,kt).call(this,e??r,t),()=>T(this,Nn,Ot).call(this,r,n)]}constructor(e,t,n){super(),E(this,Nn),E(this,Pn),E(this,Fn),E(this,In),E(this,Ln),C(this,En,{writable:!0,value:void 0}),C(this,W,{writable:!0,value:void 0}),C(this,Dn,{writable:!0,value:void 0}),C(this,On,{writable:!0,value:void 0}),C(this,G,{writable:!0,value:void 0}),C(this,kn,{writable:!0,value:void 0}),C(this,An,{writable:!0,value:void 0}),C(this,jn,{writable:!0,value:void 0}),C(this,Mn,{writable:!0,value:[]}),w(this,En,e),w(this,On,n),w(this,Dn,[]),w(this,G,[]),w(this,W,[]),this.setQueries(t)}},Rn),rr=(zn=new WeakMap,Bn=new WeakMap,K=new WeakMap,q=new WeakMap,Vn=new WeakSet,Hn=new WeakSet,Un=class extends J{bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){let t=this.options;this.options=S(this,zn).defaultMutationOptions(e),Ge(this.options,t)||S(this,zn).getMutationCache().notify({type:`observerOptionsUpdated`,mutation:S(this,K),observer:this}),t?.mutationKey&&this.options.mutationKey&&He(t.mutationKey)!==He(this.options.mutationKey)?this.reset():S(this,K)?.state.status===`pending`&&S(this,K).setOptions(this.options)}onUnsubscribe(){this.hasListeners()||S(this,K)?.removeObserver(this)}onMutationUpdate(e){T(this,Vn,Nt).call(this),T(this,Hn,Pt).call(this,e)}getCurrentResult(){return S(this,Bn)}reset(){S(this,K)?.removeObserver(this),w(this,K,void 0),T(this,Vn,Nt).call(this),T(this,Hn,Pt).call(this)}mutate(e,t){return w(this,q,t),S(this,K)?.removeObserver(this),w(this,K,S(this,zn).getMutationCache().build(S(this,zn),this.options)),S(this,K).addObserver(this),S(this,K).execute(e)}constructor(e,t){super(),E(this,Vn),E(this,Hn),C(this,zn,{writable:!0,value:void 0}),C(this,Bn,{writable:!0,value:void 0}),C(this,K,{writable:!0,value:void 0}),C(this,q,{writable:!0,value:void 0}),w(this,zn,e),this.setOptions(t),this.bindMethods(),T(this,Vn,Nt).call(this)}},Un),ir=ee(void 0),ar=e=>{let t=c(ir);if(e)return e;if(!t)throw Error(`No QueryClient set, use QueryClientProvider to set one`);return t},or=({client:e,children:t})=>(o(()=>(e.mount(),()=>{e.unmount()}),[e]),p(ir.Provider,{value:e,children:t})),sr=ee(!1),cr=()=>c(sr),sr.Provider,lr=ee(function(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}()),ur=()=>c(lr),dr=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&(t.isReset()||(e.retryOnMount=!1))},fr=e=>{o(()=>{e.clearReset()},[e])},pr=({result:e,errorResetBoundary:t,throwOnError:n,query:r,suspense:i})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&(i&&e.data===void 0||$e(n,[e.error,r])),mr=e=>{if(e.suspense){let t=e=>e===`static`?e:Math.max(e??1e3,1e3),n=e.staleTime;e.staleTime=typeof n==`function`?(...e)=>t(n(...e)):t(n),typeof e.gcTime==`number`&&(e.gcTime=Math.max(e.gcTime,1e3))}},hr=(e,t)=>e.isLoading&&e.isFetching&&!t,gr=(e,t)=>e?.suspense&&t.isPending,_r=(e,t,n)=>t.fetchOptimistic(e).catch(()=>{n.clearReset()})}));function yr(e,t){return`gid://shopify/${e}/${t}`}function br(e){return yr(`Product`,e)}function xr(e){return yr(`ProductVariant`,e)}function Sr(e){let t=e.match(/^gid:\/\/shopify\/([^\/]+)\/(.+)$/);if(!t)throw Error(`Invalid Shopify GID format: ${e}`);return{type:t[1],id:t[2]}}function Cr(e){let{type:t,id:n}=Sr(e);if(t!==`Product`)throw Error(`Expected Product GID, got ${t}: ${e}`);return n}var wr=e((()=>{})),Tr,Er=e((()=>{be(),wr(),Tr=async e=>await ve({query:`#graphql
    query getInventory($productId: ID!) {
      product(id: $productId) {
        variants(first: 100) {
          edges {
            node {
              id
              availableForSale
              quantityAvailable
            }
          }
        }
      }
    }
  `,variables:{productId:br(e)}})})),Dr,Or,kr=e((()=>{vr(),Er(),Dr={all:[`inventory`],byId:e=>[`inventory`,e]},Or=e=>{let{data:t,isLoading:n,error:r}=ht({queryKey:Dr.byId(e),queryFn:()=>Tr(e),enabled:!!e});return{data:t,isLoading:n,error:r}}}));function Ar(e,t){if(t)return e.find(e=>e.node.id.endsWith(`/${t}`))?.node}function jr(e){if(!e)return{isAvailableForSale:!1,isNotTrackedLike:!1,inventoryCount:null,isPurchaseDisabled:!0,maxPurchasableQuantity:0,inventoryLabelState:`outOfStock`};let t=e.quantityAvailable,n=typeof t==`number`&&t>0,r=t===null||t===-1,i=e.availableForSale&&typeof t==`number`&&t<=0,a=r||i;return e.availableForSale?n?{isAvailableForSale:!0,isNotTrackedLike:!1,inventoryCount:t,isPurchaseDisabled:!1,maxPurchasableQuantity:t,inventoryLabelState:`inStock`}:{isAvailableForSale:!0,isNotTrackedLike:a,inventoryCount:null,isPurchaseDisabled:!1,maxPurchasableQuantity:1/0,inventoryLabelState:`notTrackedStock`}:{isAvailableForSale:!1,isNotTrackedLike:!1,inventoryCount:n?t:null,isPurchaseDisabled:!0,maxPurchasableQuantity:0,inventoryLabelState:`outOfStock`}}var Mr=e((()=>{}));function Nr(e,t){let n=e=>{if(typeof e!=`object`||!e||typeof e==`function`)return e;if(Array.isArray(e))return e.map(n);let t={};for(let r in e)e.hasOwnProperty(r)&&(t[r]=n(e[r]));return t},r=n(e);return Object.entries(t).forEach(([e,t])=>{let n=e.split(`.`),i=r,a=null,o=null;for(let r=0;r<n.length;r++){let s=n[r];if(r===n.length-1){if(s===`defaultValue`&&a&&o){let e=a[o];e&&typeof e==`object`&&e.defaultValue!==void 0&&(e.defaultValue=t)}else if(s===`hidden`)if(i[s]&&typeof i[s]==`object`&&i[s].controls)i[s].hidden=t;else if(a&&o){let e=a[o];e&&(e.hidden=t)}else i[s]&&typeof i[s]==`object`&&(i[s].hidden=t);else if(s===`title`)if(i[s]&&typeof i[s]==`object`&&i[s].controls)i[s].title=t;else if(a&&o){let e=a[o];e&&(e.title=t)}else i[s]&&typeof i[s]==`object`&&(i[s].title=t);else if(i[s]&&typeof i[s]==`object`){if(i[s].controls)console.warn(`Cannot override ${e} - it's a parent control with nested controls`);else if(i[s].defaultValue!==void 0)i[s].defaultValue=t;else if(a&&o){let e=a[o];e?.defaultValue&&typeof e.defaultValue==`object`&&(e.defaultValue[s]=t)}}else if(a&&o){let e=a[o];e?.defaultValue&&typeof e.defaultValue==`object`&&(e.defaultValue[s]=t)}}else if(i[s]?.controls)a=i,o=s,i=i[s].controls;else if(i[s]&&typeof i[s]==`object`)i[s].defaultValue===void 0?(a=i,o=s,i=i[s]):(a=i,o=s,i=typeof i[s].defaultValue==`object`&&i[s].defaultValue!==null?i[s].defaultValue:i[s]);else{console.warn(`Path ${e} not found in controls`);return}}}),r}function Pr(e,t,n){let r=Ce(),i=_e(),{data:a,isLoading:o,error:s}=Or(e);if(r||i)return{isDisabled:!1};let c=Ar(a?.data?.product?.variants?.edges||[],t);if(o||s)return{isDisabled:!1};let l=jr(c);return{isDisabled:n&&l.isPurchaseDisabled}}var Z,Q,Fr,$,Ir,Lr,Rr,zr,Br,Vr,Hr=e((()=>{pe(),Te(),kr(),ge(),Mr(),Z={presetButtonStyle:{alignItems:`center`,justifyContent:`center`,gap:8,padding:we.buttonPadding,border:{borderWidth:0,borderStyle:`solid`,borderColor:x.foregroundMuted},borderRadius:we.borderRadius,textColor:x.background,backgroundColor:x.foreground,shadow:void 0,hover:{textColor:x.backgroundHover,backgroundColor:x.foregroundHover,shadow:void 0,border:{borderWidth:0,borderStyle:`solid`,borderColor:x.foregroundMuted}},tapScale:.98}},Q={presetButtonStyle:{...Z.presetButtonStyle,backgroundColor:x.background,textColor:x.foreground,hover:{...Z.presetButtonStyle.hover,backgroundColor:x.backgroundHover,textColor:x.foreground}}},Fr={text:`Out of Stock`,textColor:x.background,backgroundColor:x.foregroundMuted,border:{borderWidth:0,borderStyle:`solid`,borderColor:x.foregroundMuted},opacity:.7},$={disabledStyle:{alignItems:`center`,justifyContent:`center`,gap:8,padding:we.buttonPadding,border:{borderWidth:0,borderStyle:`solid`,borderColor:x.foregroundMuted},borderRadius:we.borderRadius,textColor:x.foregroundMuted,backgroundColor:x.backgroundMuted,shadow:void 0,tapScale:1}},Ir={presetButtonStyle:{title:`🎨 Styling`,type:b.Object,controls:{alignItems:{title:`Align`,type:b.Enum,defaultValue:Z.presetButtonStyle?.alignItems,options:[`start`,`center`,`end`],optionTitles:[`Start`,`Center`,`End`],optionIcons:[`align-bottom`,`align-middle`,`align-top`],displaySegmentedControl:!0},justifyContent:{title:`Distribute`,type:b.Enum,options:[`center`,`start`,`end`,`space-between`],optionTitles:[`Center`,`Start`,`End`,`Space Between`],defaultValue:Z.presetButtonStyle?.justifyContent},gap:{type:b.Number,title:`Gap`,defaultValue:Z.presetButtonStyle?.gap,unit:`px`},padding:{type:b.Padding,title:`Padding`,defaultValue:Z.presetButtonStyle?.padding},border:{type:b.Border,title:`Border`,defaultValue:{borderWidth:(Z.presetButtonStyle?.border).borderWidth,borderStyle:(Z.presetButtonStyle?.border).borderStyle,borderColor:(Z.presetButtonStyle?.border).borderColor}},borderRadius:{type:b.BorderRadius,title:`Border Radius`,defaultValue:Z.presetButtonStyle?.borderRadius},textColor:{title:`Text Color`,type:b.Color,defaultValue:Z.presetButtonStyle?.textColor},backgroundColor:{title:`Background`,type:b.Color,defaultValue:Z.presetButtonStyle?.backgroundColor},shadow:{title:`Shadow`,type:b.BoxShadow,defaultValue:Z.presetButtonStyle?.shadow},hover:{title:`Hover`,type:b.Object,controls:{textColor:{title:`Text`,type:b.Color,defaultValue:Z.presetButtonStyle?.hover?.textColor},backgroundColor:{title:`Background`,type:b.Color,defaultValue:Z.presetButtonStyle?.hover?.backgroundColor},shadow:{title:`Shadow`,type:b.BoxShadow,defaultValue:Z.presetButtonStyle?.hover?.shadow},border:{title:`Border`,type:b.Border,defaultValue:Z.presetButtonStyle?.hover?.border}},buttonTitle:`Style`},tapScale:{title:`Tap Scale`,type:b.Number,defaultValue:Z.presetButtonStyle?.tapScale,min:0,max:1,step:.01},font:{title:`Font`,type:b.Font,defaultFontType:`sans-serif`,controls:`extended`,defaultValue:{fontSize:`16px`,variant:`Regular`,lineHeight:`1em`},hidden:e=>e.buttonType===`custom`}},hidden:e=>e.buttonType===`custom`}},Lr={disabledStyle:{title:`🎨 Disabled Styling`,type:b.Object,controls:{alignItems:{title:`Align`,type:b.Enum,defaultValue:$.disabledStyle?.alignItems,options:[`start`,`center`,`end`],optionTitles:[`Start`,`Center`,`End`],optionIcons:[`align-bottom`,`align-middle`,`align-top`],displaySegmentedControl:!0},justifyContent:{title:`Distribute`,type:b.Enum,options:[`center`,`start`,`end`,`space-between`],optionTitles:[`Center`,`Start`,`End`,`Space Between`],defaultValue:$.disabledStyle?.justifyContent},gap:{type:b.Number,title:`Gap`,defaultValue:$.disabledStyle?.gap,unit:`px`},padding:{type:b.Padding,title:`Padding`,defaultValue:$.disabledStyle?.padding},border:{type:b.Border,title:`Border`,defaultValue:{borderWidth:($.disabledStyle?.border).borderWidth,borderStyle:($.disabledStyle?.border).borderStyle,borderColor:($.disabledStyle?.border).borderColor}},borderRadius:{type:b.BorderRadius,title:`Border Radius`,defaultValue:$.disabledStyle?.borderRadius},textColor:{title:`Text Color`,type:b.Color,defaultValue:$.disabledStyle?.textColor},backgroundColor:{title:`Background`,type:b.Color,defaultValue:$.disabledStyle?.backgroundColor},shadow:{title:`Shadow`,type:b.BoxShadow,defaultValue:$.disabledStyle?.shadow},tapScale:{title:`Tap Scale`,type:b.Number,defaultValue:$.disabledStyle?.tapScale,min:0,max:1,step:.01},font:{title:`Font`,type:b.Font,defaultFontType:`sans-serif`,controls:`extended`,hidden:e=>e.buttonType===`custom`}},hidden:e=>e.buttonType===`custom`}},Rr={presetButtonStyle:{title:`🎨 Styling`,type:b.Object,controls:{alignItems:{title:`Align`,type:b.Enum,defaultValue:Q.presetButtonStyle?.alignItems,options:[`start`,`center`,`end`],optionTitles:[`Start`,`Center`,`End`],optionIcons:[`align-bottom`,`align-middle`,`align-top`],displaySegmentedControl:!0},justifyContent:{title:`Distribute`,type:b.Enum,options:[`center`,`start`,`end`,`space-between`],optionTitles:[`Center`,`Start`,`End`,`Space Between`],defaultValue:Q.presetButtonStyle?.justifyContent},gap:{type:b.Number,title:`Gap`,defaultValue:Q.presetButtonStyle?.gap,unit:`px`},padding:{type:b.Padding,title:`Padding`,defaultValue:Q.presetButtonStyle?.padding},border:{type:b.Border,title:`Border`,defaultValue:{borderWidth:(Q.presetButtonStyle?.border).borderWidth,borderStyle:(Q.presetButtonStyle?.border).borderStyle,borderColor:(Q.presetButtonStyle?.border).borderColor}},borderRadius:{type:b.BorderRadius,title:`Border Radius`,defaultValue:Q.presetButtonStyle?.borderRadius},textColor:{title:`Text Color`,type:b.Color,defaultValue:Q.presetButtonStyle?.textColor},backgroundColor:{title:`Background`,type:b.Color,defaultValue:Q.presetButtonStyle?.backgroundColor},shadow:{title:`Shadow`,type:b.BoxShadow,defaultValue:Q.presetButtonStyle?.shadow},hover:{title:`Hover`,type:b.Object,controls:{textColor:{title:`Text`,type:b.Color,defaultValue:Q.presetButtonStyle?.hover?.textColor},backgroundColor:{title:`Background`,type:b.Color,defaultValue:Q.presetButtonStyle?.hover?.backgroundColor},shadow:{title:`Shadow`,type:b.BoxShadow,defaultValue:Q.presetButtonStyle?.hover?.shadow},border:{title:`Border`,type:b.Border,defaultValue:Q.presetButtonStyle?.hover?.border}},buttonTitle:`Style`},tapScale:{title:`Tap Scale`,type:b.Number,defaultValue:Q.presetButtonStyle?.tapScale,min:0,max:1,step:.01},font:{title:`Font`,type:b.Font,defaultFontType:`sans-serif`,controls:`extended`,hidden:e=>e.buttonType===`custom`}},hidden:e=>e.buttonType===`custom`}},zr={showDefaultIcon:{title:`Default Icon`,type:b.Boolean,defaultValue:!0,hidden:()=>!0,enabledTitle:`Show`,disabledTitle:`Hide`},text:{title:`Text`,type:b.String,defaultValue:`Button`,hidden:e=>e.buttonType===`custom`},leftIcon:{title:`Left Icon`,type:b.ComponentInstance,hidden:e=>e.buttonType===`custom`},rightIcon:{title:`Right Icon`,type:b.ComponentInstance,hidden:e=>e.buttonType===`custom`}},Br={buttonType:{title:`Button Type`,type:b.Enum,options:[`preset`,`custom`],optionTitles:[`Preset`,`Custom`],displaySegmentedControl:!0,defaultValue:`preset`},customButton:{title:`Button`,type:b.ComponentInstance,hidden:e=>e.buttonType===`preset`},customButtonDisabled:{title:`Button Disabled`,type:b.ComponentInstance,hidden:e=>e.buttonType===`preset`},customButtonSize:{title:`Button Size`,type:b.Object,controls:{width:{type:b.Enum,title:`Width`,options:[`default`,`fill`],optionTitles:[`Default`,`Fill`],defaultValue:`default`,displaySegmentedControl:!0,segmentedControlDirection:`vertical`},height:{type:b.Enum,title:`Height`,options:[`default`,`fill`],optionTitles:[`Default`,`Fill`],defaultValue:`default`,displaySegmentedControl:!0,segmentedControlDirection:`vertical`}},hidden:e=>e.buttonType===`preset`}},Vr={outOfStockStyle:{title:`Out of Stock Style`,type:b.Object,controls:{text:{title:`Text`,type:b.String,defaultValue:Fr.text},textColor:{title:`Text Color`,type:b.Color,defaultValue:Fr.textColor},backgroundColor:{title:`Background`,type:b.Color,defaultValue:Fr.backgroundColor},border:{title:`Border`,type:b.Border,defaultValue:Fr.border},shadow:{title:`Shadow`,type:b.BoxShadow,defaultValue:Fr.shadow},opacity:{title:`Opacity`,type:b.Number,defaultValue:Fr.opacity,min:0,max:1,step:.01}},hidden:e=>e.buttonType===`custom`}},b.Object,b.Enum,Q.presetButtonStyle?.alignItems,b.Enum,Q.presetButtonStyle?.justifyContent,b.Number,Q.presetButtonStyle?.gap,b.Padding,Q.presetButtonStyle?.padding,b.Border,(Q.presetButtonStyle?.border).borderWidth,(Q.presetButtonStyle?.border).borderStyle,(Q.presetButtonStyle?.border).borderColor,b.BorderRadius,Q.presetButtonStyle?.borderRadius,b.Color,x.background,b.Color,x.primary,b.BoxShadow,Q.presetButtonStyle?.shadow,b.Object,b.Color,x.background,b.Color,x.primary,b.BoxShadow,Q.presetButtonStyle?.hover?.shadow,b.Border,Q.presetButtonStyle?.hover?.border,b.Number,Q.presetButtonStyle?.tapScale,b.Font}));function Ur({style:e}){return p(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,className:`lucide lucide-loader-circle-icon lucide-loader-circle`,style:{...e},children:p(`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`})})}var Wr=e((()=>{m()}));function Gr({style:e}){return h(d,{children:[p(`style`,{children:`
          @keyframes loading-spinner {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}),p(Ur,{style:{animation:`loading-spinner 1s linear infinite`,...e}})]})}var Kr=e((()=>{m(),Wr()}));function qr(e){let{leftIcon:t,rightIcon:n,font:r,text:i,onClick:a,presetButtonStyle:o,disabledStyle:s,style:c,disabled:l,isLoading:u,...d}=e,f={...Z.presetButtonStyle,...o||{},hover:{...Z.presetButtonStyle?.hover,...o?.hover||{}}},m=s===void 0,g={...$.disabledStyle,...s||{}},_=l?m?f:g:f;return h(te.button,{onClick:e=>{a(e)},style:{width:`100%`,height:`100%`,display:`flex`,cursor:l?`not-allowed`:`pointer`,opacity:l&&m?.5:void 0,alignItems:_?.alignItems,justifyContent:_?.justifyContent,gap:_?.gap,padding:_?.padding,whiteSpace:`nowrap`,overflow:`hidden`,border:typeof _?.border==`string`?_.border:_?.border?`${_.border.borderWidth||0}px ${_.border.borderStyle||`solid`} ${_.border.borderColor||`transparent`}`:void 0,borderRadius:_?.borderRadius,backgroundColor:_?.backgroundColor,color:_?.textColor,boxShadow:_?.shadow,...l&&s?.font?s.font:r,...c},animate:{backgroundColor:_?.backgroundColor,color:_?.textColor,boxShadow:_?.shadow,opacity:l&&m?.5:1,border:typeof _?.border==`string`?_.border:_?.border?`${_.border.borderWidth||0}px ${_.border.borderStyle||`solid`} ${_.border.borderColor||`transparent`}`:void 0},whileHover:l?void 0:{backgroundColor:f?.hover?.backgroundColor,color:f?.hover?.textColor,boxShadow:f?.hover?.shadow,border:typeof f?.hover?.border==`string`?f.hover.border:f?.hover?.border?`${f.hover.border.borderWidth||0}px ${f.hover.border.borderStyle||`solid`} ${f.hover.border.borderColor||`transparent`}`:void 0,transition:{duration:.3,ease:`easeOut`}},whileTap:{scale:_?.tapScale,transition:{duration:.1,ease:`easeOut`}},disabled:l||u,...d,children:[u&&p(Gr,{style:{width:d.loadingSpinnerSize||24,height:d.loadingSpinnerSize||24}}),t&&!u&&p(`span`,{children:t}),i&&!u&&p(`span`,{style:{overflow:`hidden`,textOverflow:`ellipsis`},children:i}),n&&!u&&p(`span`,{children:n})]})}var Jr=e((()=>{m(),re(),Hr(),Kr()}));function Yr(e,t){return _.Children.map(e,e=>_.cloneElement(e,{style:{...e.props.style,width:t?.width===`fill`?`100%`:e.props.width,height:t?.height===`fill`?`100%`:e.props.height}}))}function Xr(e){let t=e.disabled&&e.disabledButton!=null;return p(`div`,{onClick:e.disabled?void 0:e.onClick,style:{overflow:`visible`,width:e.customButtonSize?.width===`default`?`fit-content`:`100%`,height:e.customButtonSize?.height===`default`?`fit-content`:`100%`,display:`flex`,cursor:e.disabled?`not-allowed`:`pointer`,opacity:t?1:e.disabled?.5:1},children:p(d,{children:Yr(t?e.disabledButton:e.children,e.customButtonSize)})})}var Zr=e((()=>{m(),r()}));function Qr({style:e}){return h(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{...e},children:[p(`circle`,{cx:`8`,cy:`21`,r:`1`}),p(`circle`,{cx:`19`,cy:`21`,r:`1`}),p(`path`,{d:`m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12`})]})}var $r=e((()=>{m()})),ei,ti,ni,ri=e((()=>{ei=`frameship_cart_id`,ti=()=>{try{return localStorage.getItem(ei)}catch(e){return console.error(`Error getting cart ID from localStorage:`,e),null}},ni=e=>{try{localStorage.setItem(ei,e)}catch(e){console.error(`Error saving cart ID to localStorage:`,e)}}})),ii,ai,oi=e((()=>{ii=`frameship_selected_market`,ai=()=>{try{let e=localStorage.getItem(ii);return e?JSON.parse(e):null}catch(e){return console.error(`Error getting market from localStorage:`,e),null}}})),si,ci=e((()=>{ye(),oi(),si=Se((e,t)=>({selectedMarket:ai(),defaultMarket:null,setMarket:t=>{e({selectedMarket:t}),import(`./Live_pricing_store.B2IpTpIQ.mjs`).then(({useLivePricingStore:e})=>{e.getState().fetchLivePricingData(t.countryCode)}).catch(e=>{console.error(`[Market Store] Error importing live pricing store:`,e)})},getMarket:()=>t().selectedMarket||t().defaultMarket,setDefaultMarket:n=>{e({defaultMarket:n}),t().selectedMarket||e({selectedMarket:n})},clearMarket:()=>{e({selectedMarket:null})}}))})),li,ui,di,fi,pi,mi,hi,gi,_i,vi=e((()=>{be(),ri(),li=`
              sellingPlanAllocation {
                sellingPlan {
                  id
                  name
                  options {
                    name
                    value
                  }
                }
                priceAdjustments {
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  perDeliveryPrice { amount currencyCode }
                }
              }
`,ui=(e,t)=>{let n=t?li:``;return e.split(`SELLING_PLAN_ALLOCATION_PLACEHOLDER`).join(n)},di=async(e,t)=>{let n=ti();return await ve({query:ui(`#graphql
          query getCart($cartId: ID!, $country: CountryCode)
          @inContext(country: $country) {
            cart(id: $cartId) {
              id
              createdAt
              updatedAt
              checkoutUrl
              lines(first: 100) {
                edges {
                  node {
                    id
                    quantity
                    attributes {
                      key
                      value
                    }
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          id
                          title
                          handle
                        }
                        image {
                          url
                          altText
                        }
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                    SELLING_PLAN_ALLOCATION_PLACEHOLDER
                  discountAllocations {
                    discountedAmount {
                      amount
                      currencyCode
                    }
                    discountApplication {
                      allocationMethod
                      targetSelection
                      targetType
                    }
                  }
                  }
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
              discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
          discountApplication {
            allocationMethod
            targetSelection
            targetType
          }
        }
        discountCodes {
                code
                applicable
              }
            }
          }
  `,t),variables:{cartId:n,...e&&{country:e}}})},fi=async(e,t)=>{let n=await ve({query:ui(`#graphql
  mutation cartCreate($country: CountryCode)
  @inContext(country: $country) {
    cartCreate {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
              SELLING_PLAN_ALLOCATION_PLACEHOLDER
            discountAllocations {
              discountedAmount {
                amount
                currencyCode
              }
              discountApplication {
                allocationMethod
                targetSelection
                targetType
              }
            }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
          discountApplication {
            allocationMethod
            targetSelection
            targetType
          }
        }
        discountCodes {
          code
          applicable
        }
      }
    }
  }
  `,t),variables:{...e&&{country:e}}});return n.data?.cartCreate?.cart?.id&&ni(n.data.cartCreate.cart.id),n},pi=async({cartId:e,variantId:t,quantity:n=1,country:r,sellingPlanId:i,attributes:a,includeSellingPlans:o})=>{let s=ui(`#graphql
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode)
  @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
              SELLING_PLAN_ALLOCATION_PLACEHOLDER
            discountAllocations {
              discountedAmount {
                amount
                currencyCode
              }
              discountApplication {
                allocationMethod
                targetSelection
                targetType
              }
            }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
          discountApplication {
            allocationMethod
            targetSelection
            targetType
          }
        }
        discountCodes {
          code
          applicable
        }
      }
    }
  }
  `,o),c={merchandiseId:t,quantity:n};return i&&(c.sellingPlanId=i),a&&a.length>0&&(c.attributes=a),await ve({query:s,variables:{cartId:e,lines:[c],...r&&{country:r}}})},mi=async({cartId:e,lineId:t,quantity:n,country:r,includeSellingPlans:i})=>await ve({query:ui(`#graphql
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $country: CountryCode)
  @inContext(country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
              SELLING_PLAN_ALLOCATION_PLACEHOLDER
            discountAllocations {
              discountedAmount {
                amount
                currencyCode
              }
              discountApplication {
                allocationMethod
                targetSelection
                targetType
              }
            }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
          discountApplication {
            allocationMethod
            targetSelection
            targetType
          }
        }
        discountCodes {
          code
          applicable
        }
      }
    }
  }
`,i),variables:{cartId:e,lines:[{id:t,quantity:n}],...r&&{country:r}}}),hi=async({cartId:e,lineId:t,country:n,includeSellingPlans:r})=>await ve({query:ui(`#graphql
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode)
  @inContext(country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                    handle
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
              SELLING_PLAN_ALLOCATION_PLACEHOLDER
            discountAllocations {
              discountedAmount {
                amount
                currencyCode
              }
              discountApplication {
                allocationMethod
                targetSelection
                targetType
              }
            }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
          discountApplication {
            allocationMethod
            targetSelection
            targetType
          }
        }
        discountCodes {
          code
          applicable
        }
      }
    }
  }
`,r),variables:{cartId:e,lineIds:[t],...n&&{country:n}}}),gi=async({cartId:e,discountCodes:t,country:n,includeSellingPlans:r})=>ve({query:ui(`#graphql
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!], $country: CountryCode)
  @inContext(country: $country) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
              SELLING_PLAN_ALLOCATION_PLACEHOLDER
            discountAllocations {
              discountedAmount {
                amount
                currencyCode
              }
              discountApplication {
                allocationMethod
                targetSelection
                targetType
              }
            }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
          discountApplication {
            allocationMethod
            targetSelection
            targetType
          }
        }
        discountCodes {
          code
          applicable
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`,r),variables:{cartId:e,discountCodes:t,...n&&{country:n}}}),_i=async({cartId:e,countryCode:t,includeSellingPlans:n})=>await ve({query:ui(`#graphql
  mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
              SELLING_PLAN_ALLOCATION_PLACEHOLDER
            discountAllocations {
              discountedAmount {
                amount
                currencyCode
              }
              discountApplication {
                allocationMethod
                targetSelection
                targetType
              }
            }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
          discountApplication {
            allocationMethod
            targetSelection
            targetType
          }
        }
        discountCodes {
          code
          applicable
        }
      }
    }
  }
  `,n),variables:{cartId:e,buyerIdentity:{countryCode:t}}})})),yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi=e((()=>{vr(),r(),ri(),ci(),vi(),ge(),xe(),yi=new Map,bi=new Set,xi=new Map,Si=0,Ci=()=>{let e=Ce(),{getMarket:t}=si(),n=t()?.countryCode,r=he(),{data:i,isLoading:a,error:o}=ht({queryKey:[`cart`,n],queryFn:async()=>{if(e)return{data:null};if(ti()){let e=await di(n,r);return e.data?.cart===null?await fi(n,r):e}else{let e=await fi(n,r);return e.data?.cartCreate?.cart?.id||console.error(`[useCreateCart] Failed to create cart. Response:`,e),e}},enabled:!e,staleTime:300*1e3});return e?{data:null,isLoading:!1,error:null}:{data:i,isLoading:a,error:o}},wi=()=>{let e=ar(),{getMarket:t}=si(),n=t()?.countryCode,r=he(),i=gt({mutationFn:async({cartId:e,variantId:t,quantity:i=1,sellingPlanId:a,attributes:o})=>pi({cartId:e,variantId:t,quantity:i,country:n,sellingPlanId:a,attributes:o,includeSellingPlans:r}),onMutate:async({variantId:t,quantity:r=1,sellingPlanId:i,attributes:a,variantData:o})=>{let s=[`cart`,n],c=JSON.stringify(a||[]),l=++Si,u=`${t}-${i||`none`}-${c}`;xi.set(u,{counter:l,variantId:t,quantity:r,sellingPlanId:i,attributesKey:c}),await e.cancelQueries({queryKey:s});let d=e.getQueryData(s),f=Di(d);if(!f||!o)return{previousCart:d,addKey:u,counter:l};let p=Ni(f,t,i,a),m;if(p){let e=f.lines.edges.map(e=>e.node.id===p.id?{...e,node:{...e.node,quantity:e.node.quantity+r}}:e);m=Pi({...f,lines:{...f.lines,edges:e}})}else{let e=[{node:{id:`temp-${t}-${l}`,quantity:r,attributes:a,merchandise:{id:t,title:o.title,product:{id:o.productId,title:o.productTitle,handle:o.productHandle},image:o.image,price:o.price},discountAllocations:[]}},...f.lines.edges];m=Pi({...f,lines:{...f.lines,edges:e}})}return e.setQueryData(s,e=>e&&Oi(e,m)),{previousCart:d,addKey:u,counter:l}},onError:(t,r,i)=>{if(!i)return;let{previousCart:a,addKey:o,counter:s}=i,c=xi.get(o);if(!(c&&c.counter!==s)&&a){let t=[`cart`,n];e.setQueryData(t,a)}},onSettled:(t,r,i,a)=>{if(!a)return;let{addKey:o,counter:s}=a,c=xi.get(o);if(c&&c.counter!==s)return;xi.delete(o);let l=[`cart`,n];e.invalidateQueries({queryKey:l})}});return{addToCart:i.mutate,addToCartAsync:i.mutateAsync,isAdding:i.isPending,error:i.error}},Ti=()=>{let e=ar(),{getMarket:t}=si(),n=t()?.countryCode,r=he(),i=gt({mutationFn:async({cartId:e,lineId:t,quantity:i})=>mi({cartId:e,lineId:t,quantity:i,country:n,includeSellingPlans:r}),onMutate:async({lineId:t,quantity:r})=>{yi.set(t,r);let i=[`cart`,n];await e.cancelQueries({queryKey:i});let a=e.getQueryData(i),o=Di(a);if(!o)return{previousCart:a};let s=o.lines.edges.map(e=>e.node.id===t?{...e,node:{...e.node,quantity:r}}:e),c=Pi({...o,lines:{...o.lines,edges:s}});return e.setQueryData(i,e=>e&&Oi(e,c)),{previousCart:a}},onError:(t,r,i)=>{if(yi.get(r.lineId)!==r.quantity||!i)return;let{previousCart:a}=i;if(a){let t=[`cart`,n];e.setQueryData(t,a)}},onSettled:(t,r,i)=>{if(yi.get(i.lineId)!==i.quantity)return;yi.delete(i.lineId);let a=[`cart`,n];e.invalidateQueries({queryKey:a})}}),a=gt({mutationFn:async({cartId:e,lineId:t})=>await hi({cartId:e,lineId:t,country:n,includeSellingPlans:r}),onMutate:async({lineId:t})=>{bi.add(t);let r=[`cart`,n];await e.cancelQueries({queryKey:r});let i=e.getQueryData(r),a=Di(i);if(!a)return{previousCart:i};let o=a.lines.edges.filter(e=>e.node.id!==t),s=Pi({...a,lines:{...a.lines,edges:o}});return e.setQueryData(r,e=>e&&Oi(e,s)),{previousCart:i}},onError:(t,r,i)=>{if(!bi.has(r.lineId)||!i)return;let{previousCart:a}=i;if(a){let t=[`cart`,n];e.setQueryData(t,a)}},onSuccess:(e,t)=>{bi.delete(t.lineId)}}),o=gt({mutationFn:async({cartId:e,discountCodes:t})=>gi({cartId:e,discountCodes:t,country:n,includeSellingPlans:r}),onSuccess:t=>{let r=t.data?.cartDiscountCodesUpdate?.cart;if(!r)return;let i=[`cart`,n];e.setQueryData(i,e=>e?Oi(e,r):{data:{cart:r},errors:t.errors??[]})},onSettled:()=>{let t=[`cart`,n];e.invalidateQueries({queryKey:t})}});return{updateQuantity:{mutate:i.mutate,mutateAsync:i.mutateAsync,isPending:i.isPending,error:i.error},removeLine:{mutate:a.mutate,mutateAsync:a.mutateAsync,isPending:a.isPending,error:a.error},discountCodes:{mutate:o.mutate,mutateAsync:o.mutateAsync,isPending:o.isPending,error:o.error}}},Ei=()=>{let e=ar(),{getMarket:t}=si(),n=t(),r=f(),i=Ce(),{data:a,isLoading:s,error:c}=Ci(),l=a?.data?.cart||a?.data?.cartCreate?.cart||null,u=l?.id||ti(),{addToCart:d,addToCartAsync:p,isAdding:m,error:h}=wi(),{updateQuantity:g,removeLine:_,discountCodes:v}=Ti(),ee=he();return o(()=>{i||(async()=>{let t=n?.countryCode,i=r.current;if(i&&t&&i!==t&&u)try{await _i({cartId:u,countryCode:t,includeSellingPlans:ee});let n=[`cart`,t];e.invalidateQueries({queryKey:n})}catch(e){console.error(`[Cart] Failed to update cart market:`,e)}r.current=t})()},[n?.countryCode,u,e,i,ee]),i?{cart:null,cartId:void 0,isLoading:!1,isAdding:!1,isUpdatingDiscountCodes:!1,error:null,addToCart:()=>{},addToCartAsync:()=>Promise.reject(Error(`Cart not available on Framer canvas`)),updateQuantity:()=>{},removeLine:()=>{},applyDiscountCode:()=>Promise.resolve({ok:!1,errorMessage:`Cart not available on Framer canvas.`}),removeDiscountCode:()=>Promise.resolve({ok:!1,errorMessage:`Cart not available on Framer canvas.`})}:(i||(!u&&!s&&c?console.error(`[useCart] Cart initialization failed:`,c,`Response data:`,a):!u&&!s&&!c&&console.warn(`[useCart] Cart ID is missing and loading finished, but no error. Response:`,a)),{cart:l,cartId:u,isLoading:s,isAdding:m,isUpdatingDiscountCodes:v.isPending,error:c||h,addToCart:(e,t=1,n,r,i)=>{if(!u){console.warn(`[useCart] Cannot add to cart: cartId is not available.`,`isLoading:`,s,`error:`,c);return}d({cartId:u,variantId:e,quantity:t,sellingPlanId:n,variantData:r,attributes:i})},addToCartAsync:(e,t=1,n,r,i)=>u?p({cartId:u,variantId:e,quantity:t,sellingPlanId:n,variantData:r,attributes:i}):(console.warn(`[useCart] Cannot add to cart async: cartId is not available.`,`isLoading:`,s,`error:`,c),Promise.reject(Error(`Cart ID not available. Please wait for cart to initialize.`))),updateQuantity:(e,t)=>{if(!u){console.warn(`[useCart] Cannot update quantity: cartId is not available.`);return}g.mutate({cartId:u,lineId:e,quantity:t})},removeLine:e=>{if(!u){console.warn(`[useCart] Cannot remove line: cartId is not available.`);return}_.mutate({cartId:u,lineId:e})},applyDiscountCode:async e=>{if(!u)return{ok:!1,errorMessage:`Cart ID not available. Please wait for cart to initialize.`};let t=ki(e);if(!t)return{ok:!1,errorMessage:`Discount code cannot be empty.`};let n=ji([...Ai(l),t]);try{let e=await v.mutateAsync({cartId:u,discountCodes:n}),r=Mi(e);if(r)return{ok:!1,errorMessage:r};let i=(e.data?.cartDiscountCodesUpdate?.cart?.discountCodes||[]).find(e=>e.code.toUpperCase()===t.toUpperCase());return i&&!i.applicable?{ok:!1,errorMessage:`Discount code ${t} is not applicable.`}:{ok:!0}}catch(e){return{ok:!1,errorMessage:e instanceof Error?e.message:`Failed to apply discount code.`}}},removeDiscountCode:async e=>{if(!u)return{ok:!1,errorMessage:`Cart ID not available. Please wait for cart to initialize.`};let t=ki(e);if(!t)return{ok:!1,errorMessage:`Discount code cannot be empty.`};let n=Ai(l);if(!n.includes(t))return{ok:!0};let r=n.filter(e=>e!==t);try{let e=Mi(await v.mutateAsync({cartId:u,discountCodes:r}));return e?{ok:!1,errorMessage:e}:{ok:!0}}catch(e){return{ok:!1,errorMessage:e instanceof Error?e.message:`Failed to remove discount code.`}}}})},Di=e=>e?.data&&(e.data.cart||e.data.cartCreate?.cart||e.data.cartLinesAdd?.cart||e.data.cartLinesUpdate?.cart||e.data.cartLinesRemove?.cart||e.data.cartDiscountCodesUpdate?.cart)||null,Oi=(e,t)=>e.data?e.data.cart?{...e,data:{...e.data,cart:t}}:e.data.cartCreate?.cart?{...e,data:{...e.data,cartCreate:{cart:t}}}:e.data.cartLinesAdd?.cart?{...e,data:{...e.data,cartLinesAdd:{cart:t}}}:e.data.cartLinesUpdate?.cart?{...e,data:{...e.data,cartLinesUpdate:{cart:t}}}:e.data.cartLinesRemove?.cart?{...e,data:{...e.data,cartLinesRemove:{cart:t}}}:e.data.cartDiscountCodesUpdate?.cart?{...e,data:{...e.data,cartDiscountCodesUpdate:{...e.data.cartDiscountCodesUpdate,cart:t}}}:e:e,ki=e=>e.trim().toUpperCase(),Ai=e=>e?.discountCodes?e.discountCodes.filter(e=>e.applicable).map(e=>ki(e.code)).filter(e=>e.length>0):[],ji=e=>Array.from(new Set(e)),Mi=e=>e.data?.cartDiscountCodesUpdate?.userErrors?.[0]?.message||e.errors?.[0]?.message,Ni=(e,t,n,r)=>{if(!e)return;let i=JSON.stringify(r||[]);return e.lines.edges.find(e=>{let r=e.node.merchandise.id===t,a=e.node.sellingPlanAllocation?.sellingPlan?.id,o=n?a===n:!a,s=JSON.stringify(e.node.attributes||[]);return r&&o&&s===i})?.node},Pi=e=>{let t=e.lines.edges.reduce((e,t)=>e+parseFloat(t.node.merchandise.price.amount||`0`)*t.node.quantity,0),n=e.cost.subtotalAmount.currencyCode||e.lines.edges[0]?.node.merchandise.price.currencyCode||`USD`;return{...e,cost:{...e.cost,subtotalAmount:{amount:t.toFixed(2),currencyCode:n},totalAmount:{amount:t.toFixed(2),currencyCode:n}}}}})),Ii,Li,Ri=e((()=>{vr(),Ii=null,Li=()=>(Ii||=new er({defaultOptions:{queries:{staleTime:300*1e3,gcTime:600*1e3}}}),Ii)}));function zi(e){return p(or,{client:Li(),children:e.children})}var Bi=e((()=>{m(),vr(),Ri()})),Vi,Hi=e((()=>{t(),m(),pe(),Vi=e=>{let{navigate:t,routes:n}=se(),r=le();return[n?.[r]?.path,r=>{let[i,o]=r.split(`#`),s=Object.entries(n)?.find(([,e])=>e?.path===i)?.[0];s?t(s,o):e?.strict||a.location.assign(i)}]}})),Ui=e((()=>{Hi(),Hi()}));function Wi(e,...t){let n={};return t?.forEach(t=>t&&Object.assign(n,e[t])),n}var Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea,ta=e((()=>{m(),pe(),re(),r(),Gi={FrRIKOc58:{hover:!0}},Ki=`framer-IsxBO`,qi={FrRIKOc58:`framer-v-1hyl32r`},Ji={bounce:.2,delay:0,duration:.6,type:`spring`},Yi=({value:e,children:t})=>{let n=c(y),r=e??n.transition,i=l(()=>({...n,transition:r}),[JSON.stringify(r)]);return p(y.Provider,{value:i,children:t})},Xi=te.create(s),Zi=({click:e,height:t,id:n,width:r,...i})=>({...i,bQnfLfSbw:e??i.bQnfLfSbw}),Qi=(e,t)=>e.layoutDependency?t.join(`-`)+e.layoutDependency:t.join(`-`),$i=oe(g(function(e,t){let n=f(null),r=t??n,i=v(),{activeLocale:a,setLocale:o}=ce();de();let{style:s,className:c,layoutId:l,variant:u,bQnfLfSbw:d,...m}=Zi(e),{baseVariant:g,classNames:_,clearLoadingGesture:ee,gestureHandlers:y,gestureVariant:re,isLoading:ie,setGestureState:ae,setVariant:oe,variants:se}=ue({defaultVariant:`FrRIKOc58`,enabledGestures:Gi,ref:r,variant:u,variantClassNames:qi}),le=Qi(e,se),{activeVariantCallback:b,delay:pe}=fe(g),he=b(async(...e)=>{if(ae({isPressed:!1}),d&&await d(...e)===!1)return!1}),ge=me(Ki);return p(ne,{id:l??i,children:p(Xi,{animate:se,initial:!1,children:p(Yi,{value:Ji,children:h(te.div,{...m,...y,className:me(ge,`framer-1hyl32r`,c,_),"data-framer-name":`Variant 1`,"data-highlight":!0,layoutDependency:le,layoutId:`FrRIKOc58`,onTap:he,ref:r,style:{...s},...Wi({"FrRIKOc58-hover":{"data-framer-name":void 0}},g,re),children:[p(te.div,{className:`framer-nzthpl`,"data-framer-name":`Line`,layoutDependency:le,layoutId:`pQYQseZto`,style:{backgroundColor:`var(--token-577c06ad-f6a6-4157-abe2-69f6ad5cc389, rgb(255, 255, 255))`,rotate:-45},variants:{"FrRIKOc58-hover":{rotate:0}}}),p(te.div,{className:`framer-1qkysrj`,"data-framer-name":`Line`,layoutDependency:le,layoutId:`WAH88XmEg`,style:{backgroundColor:`var(--token-577c06ad-f6a6-4157-abe2-69f6ad5cc389, rgb(255, 255, 255))`,rotate:45},variants:{"FrRIKOc58-hover":{rotate:0}}})]})})})})}),[`@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,`.framer-IsxBO.framer-14xwsrg, .framer-IsxBO .framer-14xwsrg { display: block; }`,`.framer-IsxBO.framer-1hyl32r { cursor: pointer; height: 30px; overflow: hidden; position: relative; width: 30px; }`,`.framer-IsxBO .framer-nzthpl, .framer-IsxBO .framer-1qkysrj { flex: none; height: 2px; left: calc(50.00000000000002% - 20px / 2); overflow: hidden; position: absolute; top: calc(50.00000000000002% - 2px / 2); width: 20px; }`],`framer-IsxBO`),ea=$i,$i.displayName=`X Icon`,$i.defaultProps={height:30,width:30},ae($i,{bQnfLfSbw:{title:`Click`,type:b.EventHandler}}),ie($i,[{explicitInter:!0,fonts:[]}],{supportsExplicitInterCodegen:!0})}));export{Mr as A,mt as B,Ir as C,Pr as D,Nr as E,Cr as F,Ee as G,Oe as H,wr as I,or as L,Or as M,br as N,jr as O,xr as P,ht as R,Lr as S,Hr as T,Ae as U,ke as V,De as W,qr as _,zi as a,Vr as b,Ri as c,ci as d,si as f,Zr as g,Xr as h,Vi as i,kr as j,Ar as k,Fi as l,$r as m,ta as n,Bi as o,Qr as p,Ui as r,Li as s,ea as t,Ei as u,Jr as v,Rr as w,zr as x,Br as y,vr as z};
//# sourceMappingURL=Vywuo0yEF.CG3VWSLv.mjs.map