var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(e&&(t=e(e=0)),t),s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,a)=>(a=n==null?{}:e(i(n)),l(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),d=e=>a.call(e,`module.exports`)?e[`module.exports`]:l(t({},`__esModule`,{value:!0}),e),f=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")});(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var p=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var A=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function M(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function N(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,N(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(A,`$&/`)+`/`),N(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(A,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=N(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=N(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return N(M(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function P(e,t,n){if(e==null)return e;var r=[],i=0;return N(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function F(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var I=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},L={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=L,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:F}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,I)}catch(e){I(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.6`})),m=s(((e,t)=>{t.exports=p()})),h=s((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&j(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&j(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function j(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,j(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),g=s(((e,t)=>{t.exports=h()})),_=s((e=>{var t=m();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.6`})),v=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=_()})),y=s((e=>{var t=g(),n=m(),r=v();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function d(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=d(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,p=Symbol.for(`react.element`),h=Symbol.for(`react.transitional.element`),_=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),D=Symbol.for(`react.memo`),O=Symbol.for(`react.lazy`),k=Symbol.for(`react.activity`),A=Symbol.for(`react.memo_cache_sentinel`),j=Symbol.iterator;function M(e){return typeof e!=`object`||!e?null:(e=j&&e[j]||e[`@@iterator`],typeof e==`function`?e:null)}var N=Symbol.for(`react.client.reference`);function P(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===N?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case k:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case _:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case D:return t=e.displayName||null,t===null?P(e.type)||`Memo`:t;case O:t=e._payload,e=e._init;try{return P(e(t))}catch{}}return null}var F=Array.isArray,I=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R={pending:!1,data:null,method:null,action:null},z=[],B=-1;function ee(e){return{current:e}}function te(e){0>B||(e.current=z[B],z[B]=null,B--)}function V(e,t){B++,z[B]=e.current,e.current=t}var H=ee(null),U=ee(null),W=ee(null),ne=ee(null);function re(e,t){switch(V(W,t),V(U,e),V(H,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}te(H),V(H,e)}function ie(){te(H),te(U),te(W)}function ae(e){e.memoizedState!==null&&V(ne,e);var t=H.current,n=Hd(t,e.type);t!==n&&(V(U,e),V(H,n))}function oe(e){U.current===e&&(te(H),te(U)),ne.current===e&&(te(ne),Qf._currentValue=R)}var se,ce;function le(e){if(se===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);se=t&&t[1]||``,ce=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+se+e+ce}var ue=!1;function de(e,t){if(!e||ue)return``;ue=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{ue=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?le(n):``}function fe(e,t){switch(e.tag){case 26:case 27:case 5:return le(e.type);case 16:return le(`Lazy`);case 13:return e.child!==t&&t!==null?le(`Suspense Fallback`):le(`Suspense`);case 19:return le(`SuspenseList`);case 0:case 15:return de(e.type,!1);case 11:return de(e.type.render,!1);case 1:return de(e.type,!0);case 31:return le(`Activity`);default:return``}}function pe(e){try{var t=``,n=null;do t+=fe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var me=Object.prototype.hasOwnProperty,he=t.unstable_scheduleCallback,ge=t.unstable_cancelCallback,_e=t.unstable_shouldYield,G=t.unstable_requestPaint,ve=t.unstable_now,ye=t.unstable_getCurrentPriorityLevel,be=t.unstable_ImmediatePriority,xe=t.unstable_UserBlockingPriority,Se=t.unstable_NormalPriority,Ce=t.unstable_LowPriority,we=t.unstable_IdlePriority,Te=t.log,Ee=t.unstable_setDisableYieldValue,K=null,De=null;function Oe(e){if(typeof Te==`function`&&Ee(e),De&&typeof De.setStrictMode==`function`)try{De.setStrictMode(K,e)}catch{}}var ke=Math.clz32?Math.clz32:Me,Ae=Math.log,je=Math.LN2;function Me(e){return e>>>=0,e===0?32:31-(Ae(e)/je|0)|0}var Ne=256,Pe=262144,Fe=4194304;function Ie(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Le(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ie(n))):i=Ie(o):i=Ie(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ie(n))):i=Ie(o)):i=Ie(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Re(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ze(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Be(){var e=Fe;return Fe<<=1,!(Fe&62914560)&&(Fe=4194304),e}function Ve(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function He(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ue(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-ke(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&We(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function We(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ke(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Ge(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ke(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Ke(e,t){var n=t&-t;return n=n&42?1:qe(n),(n&(e.suspendedLanes|t))===0?n:0}function qe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Je(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Ye(){var e=L.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function Xe(e,t){var n=L.p;try{return L.p=e,t()}finally{L.p=n}}var Ze=Math.random().toString(36).slice(2),Qe=`__reactFiber$`+Ze,$e=`__reactProps$`+Ze,et=`__reactContainer$`+Ze,tt=`__reactEvents$`+Ze,nt=`__reactListeners$`+Ze,rt=`__reactHandles$`+Ze,it=`__reactResources$`+Ze,at=`__reactMarker$`+Ze;function ot(e){delete e[Qe],delete e[$e],delete e[tt],delete e[nt],delete e[rt]}function st(e){var t=e[Qe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[et]||n[Qe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[Qe])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function ct(e){if(e=e[Qe]||e[et]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function lt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function ut(e){var t=e[it];return t||=e[it]={hoistableStyles:new Map,hoistableScripts:new Map},t}function dt(e){e[at]=!0}var ft=new Set,pt={};function mt(e,t){ht(e,t),ht(e+`Capture`,t)}function ht(e,t){for(pt[e]=t,e=0;e<t.length;e++)ft.add(t[e])}var gt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),_t={},vt={};function yt(e){return me.call(vt,e)?!0:me.call(_t,e)?!1:gt.test(e)?vt[e]=!0:(_t[e]=!0,!1)}function bt(e,t,n){if(yt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function xt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function St(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Ct(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function wt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Tt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Et(e){if(!e._valueTracker){var t=wt(e)?`checked`:`value`;e._valueTracker=Tt(e,t,``+e[t])}}function Dt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=wt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ot(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var kt=/[\n"\\]/g;function At(e){return e.replace(kt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function jt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Ct(t)):e.value!==``+Ct(t)&&(e.value=``+Ct(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Nt(e,o,Ct(n)):Nt(e,o,Ct(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Ct(s):e.removeAttribute(`name`)}function Mt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Et(e);return}n=n==null?``:``+Ct(n),t=t==null?n:``+Ct(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Et(e)}function Nt(e,t,n){t===`number`&&Ot(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Pt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Ct(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ft(e,t,n){if(t!=null&&(t=``+Ct(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Ct(n)}function It(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(F(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Ct(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Et(e)}function Lt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Rt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function zt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Rt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Bt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&zt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&zt(e,o,t[o])}function Vt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Ht=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Ut=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Wt(e){return Ut.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Gt(){}var Kt=null;function qt(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Jt=null,Yt=null;function Xt(e){var t=ct(e);if(t&&(e=t.stateNode)){var n=e[$e]||null;a:switch(e=t.stateNode,t.type){case`input`:if(jt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+At(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[$e]||null;if(!a)throw Error(i(90));jt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Dt(r)}break a;case`textarea`:Ft(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Pt(e,!!n.multiple,t,!1)}}}var Zt=!1;function Qt(e,t,n){if(Zt)return e(t,n);Zt=!0;try{return e(t)}finally{if(Zt=!1,(Jt!==null||Yt!==null)&&(vu(),Jt&&(t=Jt,e=Yt,Yt=Jt=null,Xt(t),e)))for(t=0;t<e.length;t++)Xt(e[t])}}function $t(e,t){var n=e.stateNode;if(n===null)return null;var r=n[$e]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var en=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),tn=!1;if(en)try{var nn={};Object.defineProperty(nn,`passive`,{get:function(){tn=!0}}),window.addEventListener(`test`,nn,nn),window.removeEventListener(`test`,nn,nn)}catch{tn=!1}var rn=null,an=null,on=null;function sn(){if(on)return on;var e,t=an,n=t.length,r,i=`value`in rn?rn.value:rn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return on=i.slice(e,1<r?1-r:void 0)}function cn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ln(){return!0}function un(){return!1}function q(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?ln:un,this.isPropagationStopped=un,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=ln)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=ln)},persist:function(){},isPersistent:ln}),t}var dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fn=q(dn),pn=f({},dn,{view:0,detail:0}),mn=q(pn),hn,gn,_n,vn=f({},pn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:kn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==_n&&(_n&&e.type===`mousemove`?(hn=e.screenX-_n.screenX,gn=e.screenY-_n.screenY):gn=hn=0,_n=e),hn)},movementY:function(e){return`movementY`in e?e.movementY:gn}}),yn=q(vn),bn=q(f({},vn,{dataTransfer:0})),xn=q(f({},pn,{relatedTarget:0})),Sn=q(f({},dn,{animationName:0,elapsedTime:0,pseudoElement:0})),Cn=q(f({},dn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),wn=q(f({},dn,{data:0})),Tn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},En={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Dn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function On(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Dn[e])?!!t[e]:!1}function kn(){return On}var An=q(f({},pn,{key:function(e){if(e.key){var t=Tn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=cn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?En[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:kn,charCode:function(e){return e.type===`keypress`?cn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?cn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),jn=q(f({},vn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Mn=q(f({},pn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:kn})),Nn=q(f({},dn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Pn=q(f({},vn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Fn=q(f({},dn,{newState:0,oldState:0})),In=[9,13,27,32],Ln=en&&`CompositionEvent`in window,Rn=null;en&&`documentMode`in document&&(Rn=document.documentMode);var zn=en&&`TextEvent`in window&&!Rn,Bn=en&&(!Ln||Rn&&8<Rn&&11>=Rn),Vn=` `,Hn=!1;function Un(e,t){switch(e){case`keyup`:return In.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Wn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Gn=!1;function Kn(e,t){switch(e){case`compositionend`:return Wn(t);case`keypress`:return t.which===32?(Hn=!0,Vn):null;case`textInput`:return e=t.data,e===Vn&&Hn?null:e;default:return null}}function qn(e,t){if(Gn)return e===`compositionend`||!Ln&&Un(e,t)?(e=sn(),on=an=rn=null,Gn=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Bn&&t.locale!==`ko`?null:t.data;default:return null}}var Jn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Jn[e.type]:t===`textarea`}function Xn(e,t,n,r){Jt?Yt?Yt.push(r):Yt=[r]:Jt=r,t=Td(t,`onChange`),0<t.length&&(n=new fn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Zn=null,Qn=null;function $n(e){vd(e,0)}function er(e){if(Dt(lt(e)))return e}function tr(e,t){if(e===`change`)return t}var nr=!1;if(en){var rr;if(en){var ir=`oninput`in document;if(!ir){var ar=document.createElement(`div`);ar.setAttribute(`oninput`,`return;`),ir=typeof ar.oninput==`function`}rr=ir}else rr=!1;nr=rr&&(!document.documentMode||9<document.documentMode)}function or(){Zn&&(Zn.detachEvent(`onpropertychange`,sr),Qn=Zn=null)}function sr(e){if(e.propertyName===`value`&&er(Qn)){var t=[];Xn(t,Qn,e,qt(e)),Qt($n,t)}}function cr(e,t,n){e===`focusin`?(or(),Zn=t,Qn=n,Zn.attachEvent(`onpropertychange`,sr)):e===`focusout`&&or()}function lr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return er(Qn)}function ur(e,t){if(e===`click`)return er(t)}function dr(e,t){if(e===`input`||e===`change`)return er(t)}function fr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var pr=typeof Object.is==`function`?Object.is:fr;function mr(e,t){if(pr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!me.call(t,i)||!pr(e[i],t[i]))return!1}return!0}function hr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function gr(e,t){var n=hr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=hr(n)}}function _r(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?_r(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ot(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ot(e.document)}return t}function yr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var br=en&&`documentMode`in document&&11>=document.documentMode,xr=null,Sr=null,Cr=null,wr=!1;function Tr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wr||xr==null||xr!==Ot(r)||(r=xr,`selectionStart`in r&&yr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Cr&&mr(Cr,r)||(Cr=r,r=Td(Sr,`onSelect`),0<r.length&&(t=new fn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=xr)))}function Er(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Dr={animationend:Er(`Animation`,`AnimationEnd`),animationiteration:Er(`Animation`,`AnimationIteration`),animationstart:Er(`Animation`,`AnimationStart`),transitionrun:Er(`Transition`,`TransitionRun`),transitionstart:Er(`Transition`,`TransitionStart`),transitioncancel:Er(`Transition`,`TransitionCancel`),transitionend:Er(`Transition`,`TransitionEnd`)},Or={},kr={};en&&(kr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Dr.animationend.animation,delete Dr.animationiteration.animation,delete Dr.animationstart.animation),`TransitionEvent`in window||delete Dr.transitionend.transition);function Ar(e){if(Or[e])return Or[e];if(!Dr[e])return e;var t=Dr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in kr)return Or[e]=t[n];return e}var jr=Ar(`animationend`),Mr=Ar(`animationiteration`),Nr=Ar(`animationstart`),Pr=Ar(`transitionrun`),Fr=Ar(`transitionstart`),Ir=Ar(`transitioncancel`),Lr=Ar(`transitionend`),Rr=new Map,zr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);zr.push(`scrollEnd`);function Br(e,t){Rr.set(e,t),mt(t,[e])}var Vr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Hr=[],Ur=0,Wr=0;function Gr(){for(var e=Ur,t=Wr=Ur=0;t<e;){var n=Hr[t];Hr[t++]=null;var r=Hr[t];Hr[t++]=null;var i=Hr[t];Hr[t++]=null;var a=Hr[t];if(Hr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Yr(n,i,a)}}function Kr(e,t,n,r){Hr[Ur++]=e,Hr[Ur++]=t,Hr[Ur++]=n,Hr[Ur++]=r,Wr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function qr(e,t,n,r){return Kr(e,t,n,r),Xr(e)}function Jr(e,t){return Kr(e,null,null,t),Xr(e)}function Yr(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-ke(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Xr(e){if(50<lu)throw lu=0,uu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Zr={};function Qr(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $r(e,t,n,r){return new Qr(e,t,n,r)}function ei(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ti(e,t){var n=e.alternate;return n===null?(n=$r(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ni(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ri(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ei(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,H.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case k:return e=$r(31,n,t,a),e.elementType=k,e.lanes=o,e;case y:return ii(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=$r(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=$r(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=$r(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case D:s=14;break a;case O:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=$r(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function ii(e,t,n,r){return e=$r(7,e,r,t),e.lanes=n,e}function ai(e,t,n){return e=$r(6,e,null,t),e.lanes=n,e}function oi(e){var t=$r(18,null,null,0);return t.stateNode=e,t}function si(e,t,n){return t=$r(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ci=new WeakMap;function li(e,t){if(typeof e==`object`&&e){var n=ci.get(e);return n===void 0?(t={value:e,source:t,stack:pe(t)},ci.set(e,t),t):n}return{value:e,source:t,stack:pe(t)}}var ui=[],di=0,fi=null,pi=0,mi=[],hi=0,gi=null,_i=1,vi=``;function yi(e,t){ui[di++]=pi,ui[di++]=fi,fi=e,pi=t}function bi(e,t,n){mi[hi++]=_i,mi[hi++]=vi,mi[hi++]=gi,gi=e;var r=_i;e=vi;var i=32-ke(r)-1;r&=~(1<<i),n+=1;var a=32-ke(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,_i=1<<32-ke(t)+i|n<<i|r,vi=a+e}else _i=1<<a|n<<i|r,vi=e}function xi(e){e.return!==null&&(yi(e,1),bi(e,1,0))}function Si(e){for(;e===fi;)fi=ui[--di],ui[di]=null,pi=ui[--di],ui[di]=null;for(;e===gi;)gi=mi[--hi],mi[hi]=null,vi=mi[--hi],mi[hi]=null,_i=mi[--hi],mi[hi]=null}function Ci(e,t){mi[hi++]=_i,mi[hi++]=vi,mi[hi++]=gi,_i=t.id,vi=t.overflow,gi=e}var wi=null,Ti=null,J=!1,Ei=null,Di=!1,Oi=Error(i(519));function ki(e){throw Fi(li(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Oi}function Ai(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Qe]=e,t[$e]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Mt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),It(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=Gt),t=!0):t=!1,t||ki(e,!0)}function ji(e){for(wi=e.return;wi;)switch(wi.tag){case 5:case 31:case 13:Di=!1;return;case 27:case 3:Di=!0;return;default:wi=wi.return}}function Mi(e){if(e!==wi)return!1;if(!J)return ji(e),J=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&Ti&&ki(e),ji(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ti=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ti=uf(e)}else t===27?(t=Ti,Zd(e.type)?(e=lf,lf=null,Ti=e):Ti=t):Ti=wi?cf(e.stateNode.nextSibling):null;return!0}function Ni(){Ti=wi=null,J=!1}function Pi(){var e=Ei;return e!==null&&(Yl===null?Yl=e:Yl.push.apply(Yl,e),Ei=null),e}function Fi(e){Ei===null?Ei=[e]:Ei.push(e)}var Ii=ee(null),Li=null,Ri=null;function zi(e,t,n){V(Ii,t._currentValue),t._currentValue=n}function Bi(e){e._currentValue=Ii.current,te(Ii)}function Vi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Hi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Vi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Vi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ui(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;pr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ne.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Hi(t,e,n,r),t.flags|=262144}function Wi(e){for(e=e.firstContext;e!==null;){if(!pr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Gi(e){Li=e,Ri=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ki(e){return Ji(Li,e)}function qi(e,t){return Li===null&&Gi(e),Ji(e,t)}function Ji(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ri===null){if(e===null)throw Error(i(308));Ri=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ri=Ri.next=t;return n}var Yi=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Xi=t.unstable_scheduleCallback,Zi=t.unstable_NormalPriority,Qi={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function $i(){return{controller:new Yi,data:new Map,refCount:0}}function ea(e){e.refCount--,e.refCount===0&&Xi(Zi,function(){e.controller.abort()})}var ta=null,na=0,ra=0,ia=null;function aa(e,t){if(ta===null){var n=ta=[];na=0,ra=ud(),ia={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return na++,t.then(oa,oa),t}function oa(){if(--na===0&&ta!==null){ia!==null&&(ia.status=`fulfilled`);var e=ta;ta=null,ra=0,ia=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function sa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ca=I.S;I.S=function(e,t){Ql=ve(),typeof t==`object`&&t&&typeof t.then==`function`&&aa(e,t),ca!==null&&ca(e,t)};var la=ee(null);function ua(){var e=la.current;return e===null?Il.pooledCache:e}function da(e,t){t===null?V(la,la.current):V(la,t.pool)}function fa(){var e=ua();return e===null?null:{parent:Qi._currentValue,pool:e}}var pa=Error(i(460)),ma=Error(i(474)),ha=Error(i(542)),ga={then:function(){}};function _a(e){return e=e.status,e===`fulfilled`||e===`rejected`}function va(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Gt,Gt),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Sa(e),e;default:if(typeof t.status==`string`)t.then(Gt,Gt);else{if(e=Il,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Sa(e),e}throw ba=t,pa}}function ya(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ba=e,pa):e}}var ba=null;function xa(){if(ba===null)throw Error(i(459));var e=ba;return ba=null,e}function Sa(e){if(e===pa||e===ha)throw Error(i(483))}var Ca=null,wa=0;function Ta(e){var t=wa;return wa+=1,Ca===null&&(Ca=[]),va(Ca,e,t)}function Ea(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Da(e,t){throw t.$$typeof===p?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Oa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=ti(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=ai(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===O&&ya(i)===t.type)?(t=a(t,n.props),Ea(t,n),t.return=e,t):(t=ri(n.type,n.key,n.props,null,e.mode,r),Ea(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=si(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=ii(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=ai(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case h:return n=ri(t.type,t.key,t.props,null,e.mode,n),Ea(n,t),n.return=e,n;case _:return t=si(t,e.mode,n),t.return=e,t;case O:return t=ya(t),f(e,t,n)}if(F(t)||M(t))return t=ii(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ta(t),n);if(t.$$typeof===C)return f(e,qi(e,t),n);Da(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case h:return n.key===i?l(e,t,n,r):null;case _:return n.key===i?u(e,t,n,r):null;case O:return n=ya(n),p(e,t,n,r)}if(F(n)||M(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ta(n),r);if(n.$$typeof===C)return p(e,t,qi(e,n),r);Da(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case h:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case _:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case O:return r=ya(r),m(e,t,n,r,i)}if(F(r)||M(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ta(r),i);if(r.$$typeof===C)return m(e,t,n,qi(t,r),i);Da(t,r)}return null}function g(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),J&&yi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return J&&yi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),J&&yi(i,h),l}function v(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),J&&yi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return J&&yi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),J&&yi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case h:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===O&&ya(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ea(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=ii(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=ri(o.type,o.key,o.props,null,e.mode,c),Ea(c,o),c.return=e,e=c)}return s(e);case _:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=si(o,e.mode,c),c.return=e,e=c}return s(e);case O:return o=ya(o),b(e,r,o,c)}if(F(o))return g(e,r,o,c);if(M(o)){if(l=M(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),v(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ta(o),c);if(o.$$typeof===C)return b(e,r,qi(e,o),c);Da(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=ai(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{wa=0;var i=b(e,t,n,r);return Ca=null,i}catch(t){if(t===pa||t===ha)throw t;var a=$r(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var ka=Oa(!0),Aa=Oa(!1),ja=!1;function Ma(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Na(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Pa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Fa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Fl&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Xr(e),Yr(e,null,n),t}return Kr(e,r,t,n),Xr(e)}function Ia(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ge(e,n)}}function La(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ra=!1;function za(){if(Ra){var e=ia;if(e!==null)throw e}}function Ba(e,t,n,r){Ra=!1;var i=e.updateQueue;ja=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(Z&p)===p:(r&p)===p){p!==0&&p===ra&&(Ra=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:ja=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Wl|=o,e.lanes=o,e.memoizedState=d}}function Va(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ha(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Va(n[e],t)}var Ua=ee(null),Wa=ee(0);function Ga(e,t){e=Hl,V(Wa,e),V(Ua,t),Hl=e|t.baseLanes}function Ka(){V(Wa,Hl),V(Ua,Ua.current)}function qa(){Hl=Wa.current,te(Ua),te(Wa)}var Ja=ee(null),Ya=null;function Xa(e){var t=e.alternate;V(to,to.current&1),V(Ja,e),Ya===null&&(t===null||Ua.current!==null||t.memoizedState!==null)&&(Ya=e)}function Za(e){V(to,to.current),V(Ja,e),Ya===null&&(Ya=e)}function Qa(e){e.tag===22?(V(to,to.current),V(Ja,e),Ya===null&&(Ya=e)):$a(e)}function $a(){V(to,to.current),V(Ja,Ja.current)}function eo(e){te(Ja),Ya===e&&(Ya=null),te(to)}var to=ee(0);function no(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ro=0,Y=null,io=null,ao=null,oo=!1,so=!1,co=!1,lo=0,uo=0,fo=null,po=0;function mo(){throw Error(i(321))}function ho(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!pr(e[n],t[n]))return!1;return!0}function go(e,t,n,r,i,a){return ro=a,Y=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,I.H=e===null||e.memoizedState===null?Ns:Ps,co=!1,a=n(r,i),co=!1,so&&(a=vo(t,n,r,i)),_o(e),a}function _o(e){I.H=Ms;var t=io!==null&&io.next!==null;if(ro=0,ao=io=Y=null,oo=!1,uo=0,fo=null,t)throw Error(i(300));e===null||Zs||(e=e.dependencies,e!==null&&Wi(e)&&(Zs=!0))}function vo(e,t,n,r){Y=e;var a=0;do{if(so&&(fo=null),uo=0,so=!1,25<=a)throw Error(i(301));if(a+=1,ao=io=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}I.H=Fs,o=t(n,r)}while(so);return o}function yo(){var e=I.H,t=e.useState()[0];return t=typeof t.then==`function`?Eo(t):t,e=e.useState()[0],(io===null?null:io.memoizedState)!==e&&(Y.flags|=1024),t}function bo(){var e=lo!==0;return lo=0,e}function xo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function So(e){if(oo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}oo=!1}ro=0,ao=io=Y=null,so=!1,uo=lo=0,fo=null}function Co(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ao===null?Y.memoizedState=ao=e:ao=ao.next=e,ao}function wo(){if(io===null){var e=Y.alternate;e=e===null?null:e.memoizedState}else e=io.next;var t=ao===null?Y.memoizedState:ao.next;if(t!==null)ao=t,io=e;else{if(e===null)throw Y.alternate===null?Error(i(467)):Error(i(310));io=e,e={memoizedState:io.memoizedState,baseState:io.baseState,baseQueue:io.baseQueue,queue:io.queue,next:null},ao===null?Y.memoizedState=ao=e:ao=ao.next=e}return ao}function To(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Eo(e){var t=uo;return uo+=1,fo===null&&(fo=[]),e=va(fo,e,t),t=Y,(ao===null?t.memoizedState:ao.next)===null&&(t=t.alternate,I.H=t===null||t.memoizedState===null?Ns:Ps),e}function Do(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Eo(e);if(e.$$typeof===C)return Ki(e)}throw Error(i(438,String(e)))}function Oo(e){var t=null,n=Y.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=Y.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=To(),Y.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=A;return t.index++,n}function ko(e,t){return typeof t==`function`?t(e):t}function Ao(e){return jo(wo(),io,e)}function jo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(ro&f)===f:(Z&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ra&&(d=!0);else if((ro&p)===p){u=u.next,p===ra&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,Y.lanes|=p,Wl|=p;f=u.action,co&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,Y.lanes|=f,Wl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!pr(o,e.memoizedState)&&(Zs=!0,d&&(n=ia,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Mo(e){var t=wo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);pr(o,t.memoizedState)||(Zs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function No(e,t,n){var r=Y,a=wo(),o=J;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!pr((io||a).memoizedState,n);if(s&&(a.memoizedState=n,Zs=!0),a=a.queue,is(Io.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||ao!==null&&ao.memoizedState.tag&1){if(r.flags|=2048,$o(9,{destroy:void 0},Fo.bind(null,r,a,n,t),null),Il===null)throw Error(i(349));o||ro&127||Po(r,t,n)}return n}function Po(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Y.updateQueue,t===null?(t=To(),Y.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Fo(e,t,n,r){t.value=n,t.getSnapshot=r,Lo(t)&&Ro(e)}function Io(e,t,n){return n(function(){Lo(t)&&Ro(e)})}function Lo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!pr(e,n)}catch{return!0}}function Ro(e){var t=Jr(e,2);t!==null&&pu(t,e,2)}function zo(e){var t=Co();if(typeof e==`function`){var n=e;if(e=n(),co){Oe(!0);try{n()}finally{Oe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:e},t}function Bo(e,t,n,r){return e.baseState=n,jo(e,io,typeof r==`function`?r:ko)}function Vo(e,t,n,r,a){if(ks(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};I.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ho(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ho(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=I.T,o={};I.T=o;try{var s=n(i,r),c=I.S;c!==null&&c(o,s),Uo(e,t,s)}catch(n){Go(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),I.T=a}}else try{a=n(i,r),Uo(e,t,a)}catch(n){Go(e,t,n)}}function Uo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Wo(e,t,n)},function(n){return Go(e,t,n)}):Wo(e,t,n)}function Wo(e,t,n){t.status=`fulfilled`,t.value=n,Ko(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ho(e,n)))}function Go(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ko(t),t=t.next;while(t!==r)}e.action=null}function Ko(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function qo(e,t){return t}function Jo(e,t){if(J){var n=Il.formState;if(n!==null){a:{var r=Y;if(J){if(Ti){b:{for(var i=Ti,a=Di;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Ti=cf(i.nextSibling),r=i.data===`F!`;break a}}ki(r)}r=!1}r&&(t=n[0])}}return n=Co(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qo,lastRenderedState:t},n.queue=r,n=Es.bind(null,Y,r),r.dispatch=n,r=zo(!1),a=Os.bind(null,Y,!1,r.queue),r=Co(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Vo.bind(null,Y,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Yo(e){return Xo(wo(),io,e)}function Xo(e,t,n){if(t=jo(e,t,qo)[0],e=Ao(ko)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Eo(t)}catch(e){throw e===pa?ha:e}else r=t;t=wo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(Y.flags|=2048,$o(9,{destroy:void 0},Zo.bind(null,i,n),null)),[r,a,e]}function Zo(e,t){e.action=t}function Qo(e){var t=wo(),n=io;if(n!==null)return Xo(t,n,e);wo(),t=t.memoizedState,n=wo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function $o(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=Y.updateQueue,t===null&&(t=To(),Y.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function es(){return wo().memoizedState}function ts(e,t,n,r){var i=Co();Y.flags|=e,i.memoizedState=$o(1|t,{destroy:void 0},n,r===void 0?null:r)}function ns(e,t,n,r){var i=wo();r=r===void 0?null:r;var a=i.memoizedState.inst;io!==null&&r!==null&&ho(r,io.memoizedState.deps)?i.memoizedState=$o(t,a,n,r):(Y.flags|=e,i.memoizedState=$o(1|t,a,n,r))}function rs(e,t){ts(8390656,8,e,t)}function is(e,t){ns(2048,8,e,t)}function as(e){Y.flags|=4;var t=Y.updateQueue;if(t===null)t=To(),Y.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function os(e){var t=wo().memoizedState;return as({ref:t,nextImpl:e}),function(){if(Fl&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ss(e,t){return ns(4,2,e,t)}function cs(e,t){return ns(4,4,e,t)}function ls(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function us(e,t,n){n=n==null?null:n.concat([e]),ns(4,4,ls.bind(null,t,e),n)}function ds(){}function fs(e,t){var n=wo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&ho(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ps(e,t){var n=wo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&ho(t,r[1]))return r[0];if(r=e(),co){Oe(!0);try{e()}finally{Oe(!1)}}return n.memoizedState=[r,t],r}function ms(e,t,n){return n===void 0||ro&1073741824&&!(Z&261930)?e.memoizedState=t:(e.memoizedState=n,e=fu(),Y.lanes|=e,Wl|=e,n)}function hs(e,t,n,r){return pr(n,t)?n:Ua.current===null?!(ro&42)||ro&1073741824&&!(Z&261930)?(Zs=!0,e.memoizedState=n):(e=fu(),Y.lanes|=e,Wl|=e,t):(e=ms(e,n,r),pr(e,t)||(Zs=!0),e)}function gs(e,t,n,r,i){var a=L.p;L.p=a!==0&&8>a?a:8;var o=I.T,s={};I.T=s,Os(e,!1,t,n);try{var c=i(),l=I.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ds(e,t,sa(c,r),du(e)):Ds(e,t,r,du(e))}catch(n){Ds(e,t,{then:function(){},status:`rejected`,reason:n},du())}finally{L.p=a,o!==null&&s.types!==null&&(o.types=s.types),I.T=o}}function _s(){}function vs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ys(e).queue;gs(e,a,t,R,n===null?_s:function(){return bs(e),n(r)})}function ys(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:R,baseState:R,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:R},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function bs(e){var t=ys(e);t.next===null&&(t=e.alternate.memoizedState),Ds(e,t.next.queue,{},du())}function xs(){return Ki(Qf)}function Ss(){return wo().memoizedState}function Cs(){return wo().memoizedState}function ws(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=du();e=Pa(n);var r=Fa(t,e,n);r!==null&&(pu(r,t,n),Ia(r,t,n)),t={cache:$i()},e.payload=t;return}t=t.return}}function Ts(e,t,n){var r=du();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ks(e)?As(t,n):(n=qr(e,t,n,r),n!==null&&(pu(n,e,r),js(n,t,r)))}function Es(e,t,n){Ds(e,t,n,du())}function Ds(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(ks(e))As(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,pr(s,o))return Kr(e,t,i,0),Il===null&&Gr(),!1}catch{}if(n=qr(e,t,i,r),n!==null)return pu(n,e,r),js(n,t,r),!0}return!1}function Os(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},ks(e)){if(t)throw Error(i(479))}else t=qr(e,n,r,2),t!==null&&pu(t,e,2)}function ks(e){var t=e.alternate;return e===Y||t!==null&&t===Y}function As(e,t){so=oo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function js(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ge(e,n)}}var Ms={readContext:Ki,use:Do,useCallback:mo,useContext:mo,useEffect:mo,useImperativeHandle:mo,useLayoutEffect:mo,useInsertionEffect:mo,useMemo:mo,useReducer:mo,useRef:mo,useState:mo,useDebugValue:mo,useDeferredValue:mo,useTransition:mo,useSyncExternalStore:mo,useId:mo,useHostTransitionStatus:mo,useFormState:mo,useActionState:mo,useOptimistic:mo,useMemoCache:mo,useCacheRefresh:mo};Ms.useEffectEvent=mo;var Ns={readContext:Ki,use:Do,useCallback:function(e,t){return Co().memoizedState=[e,t===void 0?null:t],e},useContext:Ki,useEffect:rs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ts(4194308,4,ls.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ts(4194308,4,e,t)},useInsertionEffect:function(e,t){ts(4,2,e,t)},useMemo:function(e,t){var n=Co();t=t===void 0?null:t;var r=e();if(co){Oe(!0);try{e()}finally{Oe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Co();if(n!==void 0){var i=n(t);if(co){Oe(!0);try{n(t)}finally{Oe(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ts.bind(null,Y,e),[r.memoizedState,e]},useRef:function(e){var t=Co();return e={current:e},t.memoizedState=e},useState:function(e){e=zo(e);var t=e.queue,n=Es.bind(null,Y,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ds,useDeferredValue:function(e,t){return ms(Co(),e,t)},useTransition:function(){var e=zo(!1);return e=gs.bind(null,Y,e.queue,!0,!1),Co().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=Y,a=Co();if(J){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Il===null)throw Error(i(349));Z&127||Po(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,rs(Io.bind(null,r,o,e),[e]),r.flags|=2048,$o(9,{destroy:void 0},Fo.bind(null,r,o,n,t),null),n},useId:function(){var e=Co(),t=Il.identifierPrefix;if(J){var n=vi,r=_i;n=(r&~(1<<32-ke(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=lo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=po++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:xs,useFormState:Jo,useActionState:Jo,useOptimistic:function(e){var t=Co();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Os.bind(null,Y,!0,n),n.dispatch=t,[e,t]},useMemoCache:Oo,useCacheRefresh:function(){return Co().memoizedState=ws.bind(null,Y)},useEffectEvent:function(e){var t=Co(),n={impl:e};return t.memoizedState=n,function(){if(Fl&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Ps={readContext:Ki,use:Do,useCallback:fs,useContext:Ki,useEffect:is,useImperativeHandle:us,useInsertionEffect:ss,useLayoutEffect:cs,useMemo:ps,useReducer:Ao,useRef:es,useState:function(){return Ao(ko)},useDebugValue:ds,useDeferredValue:function(e,t){return hs(wo(),io.memoizedState,e,t)},useTransition:function(){var e=Ao(ko)[0],t=wo().memoizedState;return[typeof e==`boolean`?e:Eo(e),t]},useSyncExternalStore:No,useId:Ss,useHostTransitionStatus:xs,useFormState:Yo,useActionState:Yo,useOptimistic:function(e,t){return Bo(wo(),io,e,t)},useMemoCache:Oo,useCacheRefresh:Cs};Ps.useEffectEvent=os;var Fs={readContext:Ki,use:Do,useCallback:fs,useContext:Ki,useEffect:is,useImperativeHandle:us,useInsertionEffect:ss,useLayoutEffect:cs,useMemo:ps,useReducer:Mo,useRef:es,useState:function(){return Mo(ko)},useDebugValue:ds,useDeferredValue:function(e,t){var n=wo();return io===null?ms(n,e,t):hs(n,io.memoizedState,e,t)},useTransition:function(){var e=Mo(ko)[0],t=wo().memoizedState;return[typeof e==`boolean`?e:Eo(e),t]},useSyncExternalStore:No,useId:Ss,useHostTransitionStatus:xs,useFormState:Qo,useActionState:Qo,useOptimistic:function(e,t){var n=wo();return io===null?(n.baseState=e,[e,n.queue.dispatch]):Bo(n,io,e,t)},useMemoCache:Oo,useCacheRefresh:Cs};Fs.useEffectEvent=os;function Is(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ls={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=du(),i=Pa(r);i.payload=t,n!=null&&(i.callback=n),t=Fa(e,i,r),t!==null&&(pu(t,e,r),Ia(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=du(),i=Pa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Fa(e,i,r),t!==null&&(pu(t,e,r),Ia(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=du(),r=Pa(n);r.tag=2,t!=null&&(r.callback=t),t=Fa(e,r,n),t!==null&&(pu(t,e,n),Ia(t,e,n))}};function Rs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!mr(n,r)||!mr(i,a):!0}function zs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ls.enqueueReplaceState(t,t.state,null)}function Bs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Vs(e){Vr(e)}function Hs(e){console.error(e)}function Us(e){Vr(e)}function Ws(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Gs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ks(e,t,n){return n=Pa(n),n.tag=3,n.payload={element:null},n.callback=function(){Ws(e,t)},n}function qs(e){return e=Pa(e),e.tag=3,e}function Js(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Gs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Gs(t,n,r),typeof i!=`function`&&(tu===null?tu=new Set([this]):tu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ys(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ui(t,n,a,!0),n=Ja.current,n!==null){switch(n.tag){case 31:case 13:return Ya===null?Tu():n.alternate===null&&Ul===0&&(Ul=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ga?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===ga?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Tu(),!1}if(J)return t=Ja.current,t===null?(r!==Oi&&(t=Error(i(423),{cause:r}),Fi(li(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=li(r,n),a=Ks(e.stateNode,r,a),La(e,a),Ul!==4&&(Ul=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Oi&&(e=Error(i(422),{cause:r}),Fi(li(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=li(o,n),Jl===null?Jl=[o]:Jl.push(o),Ul!==4&&(Ul=2),t===null)return!0;r=li(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ks(n.stateNode,r,e),La(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(tu===null||!tu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=qs(a),Js(a,e,n,r),La(n,a),!1}n=n.return}while(n!==null);return!1}var Xs=Error(i(461)),Zs=!1;function Qs(e,t,n,r){t.child=e===null?Aa(t,null,n,r):ka(t,e.child,n,r)}function $s(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Gi(t),r=go(e,t,n,o,a,i),s=bo(),e!==null&&!Zs?(xo(e,t,i),Cc(e,t,i)):(J&&s&&xi(t),t.flags|=1,Qs(e,t,r,i),t.child)}function ec(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ei(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,tc(e,t,a,r,i)):(e=ri(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!wc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?mr:n,n(o,r)&&e.ref===t.ref)return Cc(e,t,i)}return t.flags|=1,e=ti(a,r),e.ref=t.ref,e.return=t,t.child=e}function tc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(mr(a,r)&&e.ref===t.ref)if(Zs=!1,t.pendingProps=r=a,wc(e,i))e.flags&131072&&(Zs=!0);else return t.lanes=e.lanes,Cc(e,t,i)}return lc(e,t,n,r,i)}function nc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return ic(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&da(t,a===null?null:a.cachePool),a===null?Ka():Ga(t,a),Qa(t);else return r=t.lanes=536870912,ic(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&da(t,null),Ka(),$a(t)):(da(t,a.cachePool),Ga(t,a),$a(t),t.memoizedState=null);return Qs(e,t,i,n),t.child}function rc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ic(e,t,n,r,i){var a=ua();return a=a===null?null:{parent:Qi._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&da(t,null),Ka(),Qa(t),e!==null&&Ui(e,t,r,!0),t.childLanes=i,null}function ac(e,t){return t=vc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function oc(e,t,n){return ka(t,e.child,null,n),e=ac(t,t.pendingProps),e.flags|=2,eo(t),t.memoizedState=null,e}function sc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(J){if(r.mode===`hidden`)return e=ac(t,r),t.lanes=536870912,rc(null,e);if(Za(t),(e=Ti)?(e=rf(e,Di),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:gi===null?null:{id:_i,overflow:vi},retryLane:536870912,hydrationErrors:null},n=oi(e),n.return=t,t.child=n,wi=t,Ti=null)):e=null,e===null)throw ki(t);return t.lanes=536870912,null}return ac(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Za(t),a)if(t.flags&256)t.flags&=-257,t=oc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(Zs||Ui(e,t,n,!1),a=(n&e.childLanes)!==0,Zs||a){if(r=Il,r!==null&&(s=Ke(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Jr(e,s),pu(r,e,s),Xs;Tu(),t=oc(e,t,n)}else e=o.treeContext,Ti=cf(s.nextSibling),wi=t,J=!0,Ei=null,Di=!1,e!==null&&Ci(t,e),t=ac(t,r),t.flags|=4096;return t}return e=ti(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function cc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function lc(e,t,n,r,i){return Gi(t),n=go(e,t,n,r,void 0,i),r=bo(),e!==null&&!Zs?(xo(e,t,i),Cc(e,t,i)):(J&&r&&xi(t),t.flags|=1,Qs(e,t,n,i),t.child)}function uc(e,t,n,r,i,a){return Gi(t),t.updateQueue=null,n=vo(t,r,n,i),_o(e),r=bo(),e!==null&&!Zs?(xo(e,t,a),Cc(e,t,a)):(J&&r&&xi(t),t.flags|=1,Qs(e,t,n,a),t.child)}function dc(e,t,n,r,i){if(Gi(t),t.stateNode===null){var a=Zr,o=n.contextType;typeof o==`object`&&o&&(a=Ki(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ls,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ma(t),o=n.contextType,a.context=typeof o==`object`&&o?Ki(o):Zr,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Is(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ls.enqueueReplaceState(a,a.state,null),Ba(t,r,a,i),za(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Bs(n,s);a.props=c;var l=a.context,u=n.contextType;o=Zr,typeof u==`object`&&u&&(o=Ki(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&zs(t,a,r,o),ja=!1;var f=t.memoizedState;a.state=f,Ba(t,r,a,i),za(),l=t.memoizedState,s||f!==l||ja?(typeof d==`function`&&(Is(t,n,d,r),l=t.memoizedState),(c=ja||Rs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Na(e,t),o=t.memoizedProps,u=Bs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Zr,typeof l==`object`&&l&&(c=Ki(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&zs(t,a,r,c),ja=!1,f=t.memoizedState,a.state=f,Ba(t,r,a,i),za();var p=t.memoizedState;o!==d||f!==p||ja||e!==null&&e.dependencies!==null&&Wi(e.dependencies)?(typeof s==`function`&&(Is(t,n,s,r),p=t.memoizedState),(u=ja||Rs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Wi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,cc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=ka(t,e.child,null,i),t.child=ka(t,null,n,i)):Qs(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Cc(e,t,i),e}function fc(e,t,n,r){return Ni(),t.flags|=256,Qs(e,t,n,r),t.child}var pc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function mc(e){return{baseLanes:e,cachePool:fa()}}function hc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Q),e}function gc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(to.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(J){if(a?Xa(t):$a(t),(e=Ti)?(e=rf(e,Di),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:gi===null?null:{id:_i,overflow:vi},retryLane:536870912,hydrationErrors:null},n=oi(e),n.return=t,t.child=n,wi=t,Ti=null)):e=null,e===null)throw ki(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?($a(t),a=t.mode,c=vc({mode:`hidden`,children:c},a),r=ii(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=mc(n),r.childLanes=hc(e,s,n),t.memoizedState=pc,rc(null,r)):(Xa(t),_c(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(Xa(t),t.flags&=-257,t=yc(e,t,n)):t.memoizedState===null?($a(t),c=r.fallback,a=t.mode,r=vc({mode:`visible`,children:r.children},a),c=ii(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,ka(t,e.child,null,n),r=t.child,r.memoizedState=mc(n),r.childLanes=hc(e,s,n),t.memoizedState=pc,t=rc(null,r)):($a(t),t.child=e.child,t.flags|=128,t=null);else if(Xa(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Fi({value:r,source:null,stack:null}),t=yc(e,t,n)}else if(Zs||Ui(e,t,n,!1),s=(n&e.childLanes)!==0,Zs||s){if(s=Il,s!==null&&(r=Ke(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,Jr(e,r),pu(s,e,r),Xs;af(c)||Tu(),t=yc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Ti=cf(c.nextSibling),wi=t,J=!0,Ei=null,Di=!1,e!==null&&Ci(t,e),t=_c(t,r.children),t.flags|=4096);return t}return a?($a(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=ti(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=ii(c,a,n,null),c.flags|=2):c=ti(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,rc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=mc(n):(a=c.cachePool,a===null?a=fa():(l=Qi._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=hc(e,s,n),t.memoizedState=pc,rc(e.child,r)):(Xa(t),n=e.child,e=n.sibling,n=ti(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function _c(e,t){return t=vc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function vc(e,t){return e=$r(22,e,null,t),e.lanes=0,e}function yc(e,t,n){return ka(t,e.child,null,n),e=_c(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function bc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Vi(e.return,t,n)}function xc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Sc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=to.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,V(to,o),Qs(e,t,r,n),r=J?pi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&bc(e,n,t);else if(e.tag===19)bc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&no(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),xc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&no(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}xc(t,!0,n,null,a,r);break;case`together`:xc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Cc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ui(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=ti(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ti(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function wc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Wi(e))):!0}function Tc(e,t,n){switch(t.tag){case 3:re(t,t.stateNode.containerInfo),zi(t,Qi,e.memoizedState.cache),Ni();break;case 27:case 5:ae(t);break;case 4:re(t,t.stateNode.containerInfo);break;case 10:zi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Za(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Xa(t),e=Cc(e,t,n),e===null?null:e.sibling):gc(e,t,n):(Xa(t),t.flags|=128,null);Xa(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Ui(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Sc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),V(to,to.current),r)break;return null;case 22:return t.lanes=0,nc(e,t,n,t.pendingProps);case 24:zi(t,Qi,e.memoizedState.cache)}return Cc(e,t,n)}function Ec(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Zs=!0;else{if(!wc(e,n)&&!(t.flags&128))return Zs=!1,Tc(e,t,n);Zs=!!(e.flags&131072)}else Zs=!1,J&&t.flags&1048576&&bi(t,pi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ya(t.elementType),t.type=e,typeof e==`function`)ei(e)?(r=Bs(e,r),t.tag=1,t=dc(null,t,e,r,n)):(t.tag=0,t=lc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=$s(null,t,e,r,n);break a}else if(a===D){t.tag=14,t=ec(null,t,e,r,n);break a}}throw t=P(e)||e,Error(i(306,t,``))}}return t;case 0:return lc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Bs(r,t.pendingProps),dc(e,t,r,a,n);case 3:a:{if(re(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Na(e,t),Ba(t,r,null,n);var s=t.memoizedState;if(r=s.cache,zi(t,Qi,r),r!==o.cache&&Hi(t,[Qi],n,!0),za(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=fc(e,t,r,n);break a}else if(r!==a){a=li(Error(i(424)),t),Fi(a),t=fc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Ti=cf(e.firstChild),wi=t,J=!0,Ei=null,Di=!0,n=Aa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ni(),r===a){t=Cc(e,t,n);break a}Qs(e,t,r,n)}t=t.child}return t;case 26:return cc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:J||(n=t.type,e=t.pendingProps,r=Bd(W.current).createElement(n),r[Qe]=t,r[$e]=e,Pd(r,n,e),dt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ae(t),e===null&&J&&(r=t.stateNode=ff(t.type,t.pendingProps,W.current),wi=t,Di=!0,a=Ti,Zd(t.type)?(lf=a,Ti=cf(r.firstChild)):Ti=a),Qs(e,t,t.pendingProps.children,n),cc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&J&&((a=r=Ti)&&(r=tf(r,t.type,t.pendingProps,Di),r===null?a=!1:(t.stateNode=r,wi=t,Ti=cf(r.firstChild),Di=!1,a=!0)),a||ki(t)),ae(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=go(e,t,yo,null,null,n),Qf._currentValue=a),cc(e,t),Qs(e,t,r,n),t.child;case 6:return e===null&&J&&((e=n=Ti)&&(n=nf(n,t.pendingProps,Di),n===null?e=!1:(t.stateNode=n,wi=t,Ti=null,e=!0)),e||ki(t)),null;case 13:return gc(e,t,n);case 4:return re(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ka(t,null,r,n):Qs(e,t,r,n),t.child;case 11:return $s(e,t,t.type,t.pendingProps,n);case 7:return Qs(e,t,t.pendingProps,n),t.child;case 8:return Qs(e,t,t.pendingProps.children,n),t.child;case 12:return Qs(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,zi(t,t.type,r.value),Qs(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Gi(t),a=Ki(a),r=r(a),t.flags|=1,Qs(e,t,r,n),t.child;case 14:return ec(e,t,t.type,t.pendingProps,n);case 15:return tc(e,t,t.type,t.pendingProps,n);case 19:return Sc(e,t,n);case 31:return sc(e,t,n);case 22:return nc(e,t,n,t.pendingProps);case 24:return Gi(t),r=Ki(Qi),e===null?(a=ua(),a===null&&(a=Il,o=$i(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ma(t),zi(t,Qi,a)):((e.lanes&n)!==0&&(Na(e,t),Ba(t,null,null,n),za()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,zi(t,Qi,r),r!==a.cache&&Hi(t,[Qi],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),zi(t,Qi,r))),Qs(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Dc(e){e.flags|=4}function Oc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Su())e.flags|=8192;else throw ba=ga,ma}else e.flags&=-16777217}function kc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(Su())e.flags|=8192;else throw ba=ga,ma}function Ac(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Be(),e.lanes|=t,ql|=t)}function jc(e,t){if(!J)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Mc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Nc(e,t,n){var r=t.pendingProps;switch(Si(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Mc(t),null;case 1:return Mc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Bi(Qi),ie(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Mi(t)?Dc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Pi())),Mc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Dc(t),o===null?(Mc(t),Oc(t,a,null,r,n)):(Mc(t),kc(t,o))):o?o===e.memoizedState?(Mc(t),t.flags&=-16777217):(Dc(t),Mc(t),kc(t,o)):(e=e.memoizedProps,e!==r&&Dc(t),Mc(t),Oc(t,a,e,r,n)),null;case 27:if(oe(t),n=W.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Dc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Mc(t),null}e=H.current,Mi(t)?Ai(t,e):(e=ff(a,r,n),t.stateNode=e,Dc(t))}return Mc(t),null;case 5:if(oe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Dc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Mc(t),null}if(o=H.current,Mi(t))Ai(t,o);else{var s=Bd(W.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Qe]=t,o[$e]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Dc(t)}}return Mc(t),Oc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Dc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=W.current,Mi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=wi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Qe]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||ki(t,!0)}else e=Bd(e).createTextNode(r),e[Qe]=t,t.stateNode=e}return Mc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Mi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Qe]=t}else Ni(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Mc(t),e=!1}else n=Pi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(eo(t),t):(eo(t),null);if(t.flags&128)throw Error(i(558))}return Mc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Mi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Qe]=t}else Ni(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Mc(t),a=!1}else a=Pi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(eo(t),t):(eo(t),null)}return eo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ac(t,t.updateQueue),Mc(t),null);case 4:return ie(),e===null&&xd(t.stateNode.containerInfo),Mc(t),null;case 10:return Bi(t.type),Mc(t),null;case 19:if(te(to),r=t.memoizedState,r===null)return Mc(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)jc(r,!1);else{if(Ul!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=no(e),o!==null){for(t.flags|=128,jc(r,!1),e=o.updateQueue,t.updateQueue=e,Ac(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ni(n,e),n=n.sibling;return V(to,to.current&1|2),J&&yi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&ve()>$l&&(t.flags|=128,a=!0,jc(r,!1),t.lanes=4194304)}else{if(!a)if(e=no(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Ac(t,e),jc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!J)return Mc(t),null}else 2*ve()-r.renderingStartTime>$l&&n!==536870912&&(t.flags|=128,a=!0,jc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Mc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=ve(),e.sibling=null,n=to.current,V(to,a?n&1|2:n&1),J&&yi(t,r.treeForkCount),e);case 22:case 23:return eo(t),qa(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Mc(t),t.subtreeFlags&6&&(t.flags|=8192)):Mc(t),n=t.updateQueue,n!==null&&Ac(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&te(la),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Bi(Qi),Mc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Pc(e,t){switch(Si(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bi(Qi),ie(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return oe(t),null;case 31:if(t.memoizedState!==null){if(eo(t),t.alternate===null)throw Error(i(340));Ni()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(eo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ni()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return te(to),null;case 4:return ie(),null;case 10:return Bi(t.type),null;case 22:case 23:return eo(t),qa(),e!==null&&te(la),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Bi(Qi),null;case 25:return null;default:return null}}function Fc(e,t){switch(Si(t),t.tag){case 3:Bi(Qi),ie();break;case 26:case 27:case 5:oe(t);break;case 4:ie();break;case 31:t.memoizedState!==null&&eo(t);break;case 13:eo(t);break;case 19:te(to);break;case 10:Bi(t.type);break;case 22:case 23:eo(t),qa(),e!==null&&te(la);break;case 24:Bi(Qi)}}function Ic(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Uu(t,t.return,e)}}function Lc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Uu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Uu(t,t.return,e)}}function Rc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ha(t,n)}catch(t){Uu(e,e.return,t)}}}function zc(e,t,n){n.props=Bs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Uu(e,t,n)}}function Bc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Uu(e,t,n)}}function Vc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Uu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Uu(e,t,n)}else n.current=null}function Hc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Uu(e,e.return,t)}}function Uc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[$e]=t}catch(t){Uu(e,e.return,t)}}function Wc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Gc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Kc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Gt));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Kc(e,t,n),e=e.sibling;e!==null;)Kc(e,t,n),e=e.sibling}function qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(qc(e,t,n),e=e.sibling;e!==null;)qc(e,t,n),e=e.sibling}function Jc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[Qe]=e,t[$e]=n}catch(t){Uu(e,e.return,t)}}var Yc=!1,Xc=!1,Zc=!1,Qc=typeof WeakSet==`function`?WeakSet:Set,$c=null;function el(e,t){if(e=e.containerInfo,Rd=sp,e=vr(e),yr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,$c=t;$c!==null;)if(t=$c,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,$c=e;else for(;$c!==null;){switch(t=$c,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Bs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Uu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,$c=e;break}$c=t.return}}function tl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:gl(e,n),r&4&&Ic(5,n);break;case 1:if(gl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Uu(n,n.return,e)}else{var i=Bs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Uu(n,n.return,e)}}r&64&&Rc(n),r&512&&Bc(n,n.return);break;case 3:if(gl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ha(e,t)}catch(e){Uu(n,n.return,e)}}break;case 27:t===null&&r&4&&Jc(n);case 26:case 5:gl(e,n),t===null&&r&4&&Hc(n),r&512&&Bc(n,n.return);break;case 12:gl(e,n);break;case 31:gl(e,n),r&4&&sl(e,n);break;case 13:gl(e,n),r&4&&cl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Yc,!r){t=t!==null&&t.memoizedState!==null||Xc,i=Yc;var a=Xc;Yc=r,(Xc=t)&&!a?vl(e,n,(n.subtreeFlags&8772)!=0):gl(e,n),Yc=i,Xc=a}break;case 30:break;default:gl(e,n)}}function nl(e){var t=e.alternate;t!==null&&(e.alternate=null,nl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ot(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var rl=null,il=!1;function al(e,t,n){for(n=n.child;n!==null;)ol(e,t,n),n=n.sibling}function ol(e,t,n){if(De&&typeof De.onCommitFiberUnmount==`function`)try{De.onCommitFiberUnmount(K,n)}catch{}switch(n.tag){case 26:Xc||Vc(n,t),al(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xc||Vc(n,t);var r=rl,i=il;Zd(n.type)&&(rl=n.stateNode,il=!1),al(e,t,n),pf(n.stateNode),rl=r,il=i;break;case 5:Xc||Vc(n,t);case 6:if(r=rl,i=il,rl=null,al(e,t,n),rl=r,il=i,rl!==null)if(il)try{(rl.nodeType===9?rl.body:rl.nodeName===`HTML`?rl.ownerDocument.body:rl).removeChild(n.stateNode)}catch(e){Uu(n,t,e)}else try{rl.removeChild(n.stateNode)}catch(e){Uu(n,t,e)}break;case 18:rl!==null&&(il?(e=rl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(rl,n.stateNode));break;case 4:r=rl,i=il,rl=n.stateNode.containerInfo,il=!0,al(e,t,n),rl=r,il=i;break;case 0:case 11:case 14:case 15:Lc(2,n,t),Xc||Lc(4,n,t),al(e,t,n);break;case 1:Xc||(Vc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&zc(n,t,r)),al(e,t,n);break;case 21:al(e,t,n);break;case 22:Xc=(r=Xc)||n.memoizedState!==null,al(e,t,n),Xc=r;break;default:al(e,t,n)}}function sl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Uu(t,t.return,e)}}}function cl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Uu(t,t.return,e)}}function ll(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Qc),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Qc),t;default:throw Error(i(435,e.tag))}}function ul(e,t){var n=ll(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function dl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){rl=c.stateNode,il=!1;break a}break;case 5:rl=c.stateNode,il=!1;break a;case 3:case 4:rl=c.stateNode.containerInfo,il=!0;break a}c=c.return}if(rl===null)throw Error(i(160));ol(o,s,a),rl=null,il=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)pl(t,e),t=t.sibling}var fl=null;function pl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:dl(t,e),ml(e),r&4&&(Lc(3,e,e.return),Ic(3,e),Lc(5,e,e.return));break;case 1:dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),r&64&&Yc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=fl;if(dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[at]||o[Qe]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[Qe]=e,dt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[Qe]=e,dt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Uc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),n!==null&&r&4&&Uc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),e.flags&32){a=e.stateNode;try{Lt(a,``)}catch(t){Uu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Uc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Zc=!0);break;case 6:if(dl(t,e),ml(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Uu(e,e.return,t)}}break;case 3:if(Bf=null,a=fl,fl=gf(t.containerInfo),dl(t,e),fl=a,ml(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Uu(e,e.return,t)}Zc&&(Zc=!1,hl(e));break;case 4:r=fl,fl=gf(e.stateNode.containerInfo),dl(t,e),ml(e),fl=r;break;case 12:dl(t,e),ml(e);break;case 31:dl(t,e),ml(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ul(e,r)));break;case 13:dl(t,e),ml(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Zl=ve()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ul(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Yc,d=Xc;if(Yc=u||a,Xc=d||l,dl(t,e),Xc=d,Yc=u,ml(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Yc||Xc||_l(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Uu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Uu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Uu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ul(e,n))));break;case 19:dl(t,e),ml(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ul(e,r)));break;case 30:break;case 21:break;default:dl(t,e),ml(e)}}function ml(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Wc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;qc(e,Gc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Lt(o,``),n.flags&=-33),qc(e,Gc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Kc(e,Gc(e),s);break;default:throw Error(i(161))}}catch(t){Uu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;hl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function gl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)tl(e,t.alternate,t),t=t.sibling}function _l(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Lc(4,t,t.return),_l(t);break;case 1:Vc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&zc(t,t.return,n),_l(t);break;case 27:pf(t.stateNode);case 26:case 5:Vc(t,t.return),_l(t);break;case 22:t.memoizedState===null&&_l(t);break;case 30:_l(t);break;default:_l(t)}e=e.sibling}}function vl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:vl(i,a,n),Ic(4,a);break;case 1:if(vl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Uu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Va(c[i],s)}catch(e){Uu(r,r.return,e)}}n&&o&64&&Rc(a),Bc(a,a.return);break;case 27:Jc(a);case 26:case 5:vl(i,a,n),n&&r===null&&o&4&&Hc(a),Bc(a,a.return);break;case 12:vl(i,a,n);break;case 31:vl(i,a,n),n&&o&4&&sl(i,a);break;case 13:vl(i,a,n),n&&o&4&&cl(i,a);break;case 22:a.memoizedState===null&&vl(i,a,n),Bc(a,a.return);break;case 30:break;default:vl(i,a,n)}t=t.sibling}}function yl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ea(n))}function bl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ea(e))}function xl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Sl(e,t,n,r),t=t.sibling}function Sl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:xl(e,t,n,r),i&2048&&Ic(9,t);break;case 1:xl(e,t,n,r);break;case 3:xl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ea(e)));break;case 12:if(i&2048){xl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Uu(t,t.return,e)}}else xl(e,t,n,r);break;case 31:xl(e,t,n,r);break;case 13:xl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?xl(e,t,n,r):(a._visibility|=2,Cl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?xl(e,t,n,r):wl(e,t),i&2048&&yl(o,t);break;case 24:xl(e,t,n,r),i&2048&&bl(t.alternate,t);break;default:xl(e,t,n,r)}}function Cl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Cl(a,o,s,c,i),Ic(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Cl(a,o,s,c,i)):u._visibility&2?Cl(a,o,s,c,i):wl(a,o),i&&l&2048&&yl(o.alternate,o);break;case 24:Cl(a,o,s,c,i),i&&l&2048&&bl(o.alternate,o);break;default:Cl(a,o,s,c,i)}t=t.sibling}}function wl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:wl(n,r),i&2048&&yl(r.alternate,r);break;case 24:wl(n,r),i&2048&&bl(r.alternate,r);break;default:wl(n,r)}t=t.sibling}}var Tl=8192;function El(e,t,n){if(e.subtreeFlags&Tl)for(e=e.child;e!==null;)Dl(e,t,n),e=e.sibling}function Dl(e,t,n){switch(e.tag){case 26:El(e,t,n),e.flags&Tl&&e.memoizedState!==null&&Gf(n,fl,e.memoizedState,e.memoizedProps);break;case 5:El(e,t,n);break;case 3:case 4:var r=fl;fl=gf(e.stateNode.containerInfo),El(e,t,n),fl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Tl,Tl=16777216,El(e,t,n),Tl=r):El(e,t,n));break;default:El(e,t,n)}}function Ol(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function kl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];$c=r,Ml(r,e)}Ol(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Al(e),e=e.sibling}function Al(e){switch(e.tag){case 0:case 11:case 15:kl(e),e.flags&2048&&Lc(9,e,e.return);break;case 3:kl(e);break;case 12:kl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,jl(e)):kl(e);break;default:kl(e)}}function jl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];$c=r,Ml(r,e)}Ol(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Lc(8,t,t.return),jl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,jl(t));break;default:jl(t)}e=e.sibling}}function Ml(e,t){for(;$c!==null;){var n=$c;switch(n.tag){case 0:case 11:case 15:Lc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ea(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,$c=r;else a:for(n=e;$c!==null;){r=$c;var i=r.sibling,a=r.return;if(nl(r),r===n){$c=null;break a}if(i!==null){i.return=a,$c=i;break a}$c=a}}}var Nl={getCacheForType:function(e){var t=Ki(Qi),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ki(Qi).controller.signal}},Pl=typeof WeakMap==`function`?WeakMap:Map,Fl=0,Il=null,X=null,Z=0,Ll=0,Rl=null,zl=!1,Bl=!1,Vl=!1,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,Q=0,ql=0,Jl=null,Yl=null,Xl=!1,Zl=0,Ql=0,$l=1/0,eu=null,tu=null,nu=0,ru=null,iu=null,au=0,ou=0,su=null,cu=null,lu=0,uu=null;function du(){return Fl&2&&Z!==0?Z&-Z:I.T===null?Ye():ud()}function fu(){if(Q===0)if(!(Z&536870912)||J){var e=Pe;Pe<<=1,!(Pe&3932160)&&(Pe=262144),Q=e}else Q=536870912;return e=Ja.current,e!==null&&(e.flags|=32),Q}function pu(e,t,n){(e===Il&&(Ll===2||Ll===9)||e.cancelPendingCommit!==null)&&(bu(e,0),_u(e,Z,Q,!1)),He(e,n),(!(Fl&2)||e!==Il)&&(e===Il&&(!(Fl&2)&&(Gl|=n),Ul===4&&_u(e,Z,Q,!1)),nd(e))}function mu(e,t,n){if(Fl&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Re(e,t),a=r?Ou(e,t):Eu(e,t,!0),o=r;do{if(a===0){Bl&&!r&&_u(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!gu(n)){a=Eu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Jl;var l=c.current.memoizedState.isDehydrated;if(l&&(bu(c,s).flags|=256),s=Eu(c,s,!1),s!==2){if(Vl&&!l){c.errorRecoveryDisabledLanes|=o,Gl|=o,a=4;break a}o=Yl,Yl=a,o!==null&&(Yl===null?Yl=o:Yl.push.apply(Yl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){bu(e,0),_u(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:_u(r,t,Q,!zl);break a;case 2:Yl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Zl+300-ve(),10<a)){if(_u(r,t,Q,!zl),Le(r,0,!0)!==0)break a;au=t,r.timeoutHandle=Kd(hu.bind(null,r,n,Yl,eu,Xl,t,Q,Gl,ql,zl,o,`Throttled`,-0,0),a);break a}hu(r,n,Yl,eu,Xl,t,Q,Gl,ql,zl,o,null,-0,0)}}break}while(1);nd(e)}function hu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Gt},Dl(t,a,d);var m=(a&62914560)===a?Zl-ve():(a&4194048)===a?Ql-ve():0;if(m=qf(d,m),m!==null){au=a,e.cancelPendingCommit=m(Fu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),_u(e,a,o,!l);return}}Fu(e,t,a,n,r,i,o,s,c)}function gu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!pr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _u(e,t,n,r){t&=~Kl,t&=~Gl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-ke(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&We(e,n,t)}function vu(){return Fl&6?!0:(rd(0,!1),!1)}function yu(){if(X!==null){if(Ll===0)var e=X.return;else e=X,Ri=Li=null,So(e),Ca=null,wa=0,e=X;for(;e!==null;)Fc(e.alternate,e),e=e.return;X=null}}function bu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),au=0,yu(),Il=e,X=n=ti(e.current,null),Z=t,Ll=0,Rl=null,zl=!1,Bl=Re(e,t),Vl=!1,ql=Q=Kl=Gl=Wl=Ul=0,Yl=Jl=null,Xl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-ke(r),a=1<<i;t|=e[i],r&=~a}return Hl=t,Gr(),n}function xu(e,t){Y=null,I.H=Ms,t===pa||t===ha?(t=xa(),Ll=3):t===ma?(t=xa(),Ll=4):Ll=t===Xs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Rl=t,X===null&&(Ul=1,Ws(e,li(t,e.current)))}function Su(){var e=Ja.current;return e===null?!0:(Z&4194048)===Z?Ya===null:(Z&62914560)===Z||Z&536870912?e===Ya:!1}function Cu(){var e=I.H;return I.H=Ms,e===null?Ms:e}function wu(){var e=I.A;return I.A=Nl,e}function Tu(){Ul=4,zl||(Z&4194048)!==Z&&Ja.current!==null||(Bl=!0),!(Wl&134217727)&&!(Gl&134217727)||Il===null||_u(Il,Z,Q,!1)}function Eu(e,t,n){var r=Fl;Fl|=2;var i=Cu(),a=wu();(Il!==e||Z!==t)&&(eu=null,bu(e,t)),t=!1;var o=Ul;a:do try{if(Ll!==0&&X!==null){var s=X,c=Rl;switch(Ll){case 8:yu(),o=6;break a;case 3:case 2:case 9:case 6:Ja.current===null&&(t=!0);var l=Ll;if(Ll=0,Rl=null,Mu(e,s,c,l),n&&Bl){o=0;break a}break;default:l=Ll,Ll=0,Rl=null,Mu(e,s,c,l)}}Du(),o=Ul;break}catch(t){xu(e,t)}while(1);return t&&e.shellSuspendCounter++,Ri=Li=null,Fl=r,I.H=i,I.A=a,X===null&&(Il=null,Z=0,Gr()),o}function Du(){for(;X!==null;)Au(X)}function Ou(e,t){var n=Fl;Fl|=2;var r=Cu(),a=wu();Il!==e||Z!==t?(eu=null,$l=ve()+500,bu(e,t)):Bl=Re(e,t);a:do try{if(Ll!==0&&X!==null){t=X;var o=Rl;b:switch(Ll){case 1:Ll=0,Rl=null,Mu(e,t,o,1);break;case 2:case 9:if(_a(o)){Ll=0,Rl=null,ju(t);break}t=function(){Ll!==2&&Ll!==9||Il!==e||(Ll=7),nd(e)},o.then(t,t);break a;case 3:Ll=7;break a;case 4:Ll=5;break a;case 7:_a(o)?(Ll=0,Rl=null,ju(t)):(Ll=0,Rl=null,Mu(e,t,o,7));break;case 5:var s=null;switch(X.tag){case 26:s=X.memoizedState;case 5:case 27:var c=X;if(s?Wf(s):c.stateNode.complete){Ll=0,Rl=null;var l=c.sibling;if(l!==null)X=l;else{var u=c.return;u===null?X=null:(X=u,Nu(u))}break b}}Ll=0,Rl=null,Mu(e,t,o,5);break;case 6:Ll=0,Rl=null,Mu(e,t,o,6);break;case 8:yu(),Ul=6;break a;default:throw Error(i(462))}}ku();break}catch(t){xu(e,t)}while(1);return Ri=Li=null,I.H=r,I.A=a,Fl=n,X===null?(Il=null,Z=0,Gr(),Ul):0}function ku(){for(;X!==null&&!_e();)Au(X)}function Au(e){var t=Ec(e.alternate,e,Hl);e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function ju(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=uc(n,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=uc(n,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:So(t);default:Fc(n,t),t=X=ni(t,Hl),t=Ec(n,t,Hl)}e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function Mu(e,t,n,r){Ri=Li=null,So(t),Ca=null,wa=0;var i=t.return;try{if(Ys(e,i,t,n,Z)){Ul=1,Ws(e,li(n,e.current)),X=null;return}}catch(t){if(i!==null)throw X=i,t;Ul=1,Ws(e,li(n,e.current)),X=null;return}t.flags&32768?(J||r===1?e=!0:Bl||Z&536870912?e=!1:(zl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ja.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pu(t,e)):Nu(t)}function Nu(e){var t=e;do{if(t.flags&32768){Pu(t,zl);return}e=t.return;var n=Nc(t.alternate,t,Hl);if(n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Ul===0&&(Ul=5)}function Pu(e,t){do{var n=Pc(e.alternate,e);if(n!==null){n.flags&=32767,X=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){X=e;return}X=e=n}while(e!==null);Ul=6,X=null}function Fu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Bu();while(nu!==0);if(Fl&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Wr,Ue(e,n,o,s,c,l),e===Il&&(X=Il=null,Z=0),iu=t,ru=e,au=n,ou=o,su=a,cu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(Se,function(){return Vu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=I.T,I.T=null,a=L.p,L.p=2,s=Fl,Fl|=4;try{el(e,t,n)}finally{Fl=s,L.p=a,I.T=r}}nu=1,Iu(),Lu(),Ru()}}function Iu(){if(nu===1){nu=0;var e=ru,t=iu,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=I.T,I.T=null;var r=L.p;L.p=2;var i=Fl;Fl|=4;try{pl(t,e);var a=zd,o=vr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&_r(s.ownerDocument.documentElement,s)){if(c!==null&&yr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=gr(s,h),v=gr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{Fl=i,L.p=r,I.T=n}}e.current=t,nu=2}}function Lu(){if(nu===2){nu=0;var e=ru,t=iu,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=I.T,I.T=null;var r=L.p;L.p=2;var i=Fl;Fl|=4;try{tl(e,t.alternate,t)}finally{Fl=i,L.p=r,I.T=n}}nu=3}}function Ru(){if(nu===4||nu===3){nu=0,G();var e=ru,t=iu,n=au,r=cu;t.subtreeFlags&10256||t.flags&10256?nu=5:(nu=0,iu=ru=null,zu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(tu=null),Je(n),t=t.stateNode,De&&typeof De.onCommitFiberRoot==`function`)try{De.onCommitFiberRoot(K,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=I.T,i=L.p,L.p=2,I.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{I.T=t,L.p=i}}au&3&&Bu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===uu?lu++:(lu=0,uu=e):lu=0,rd(0,!1)}}function zu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ea(t)))}function Bu(){return Iu(),Lu(),Ru(),Vu()}function Vu(){if(nu!==5)return!1;var e=ru,t=ou;ou=0;var n=Je(au),r=I.T,a=L.p;try{L.p=32>n?32:n,I.T=null,n=su,su=null;var o=ru,s=au;if(nu=0,iu=ru=null,au=0,Fl&6)throw Error(i(331));var c=Fl;if(Fl|=4,Al(o.current),Sl(o,o.current,s,n),Fl=c,rd(0,!1),De&&typeof De.onPostCommitFiberRoot==`function`)try{De.onPostCommitFiberRoot(K,o)}catch{}return!0}finally{L.p=a,I.T=r,zu(e,t)}}function Hu(e,t,n){t=li(n,t),t=Ks(e.stateNode,t,2),e=Fa(e,t,2),e!==null&&(He(e,2),nd(e))}function Uu(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(tu===null||!tu.has(r))){e=li(n,e),n=qs(2),r=Fa(t,n,2),r!==null&&(Js(n,r,t,e),He(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Pl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Vl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Il===e&&(Z&n)===n&&(Ul===4||Ul===3&&(Z&62914560)===Z&&300>ve()-Zl?!(Fl&2)&&bu(e,0):Kl|=n,ql===Z&&(ql=0)),nd(e)}function Ku(e,t){t===0&&(t=Be()),e=Jr(e,t),e!==null&&(He(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return he(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-ke(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=Z,a=Le(r,r===Il?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Re(r,a)||(n=!0,cd(r,a));r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=ve(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}nu!==0&&nu!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-ke(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=ze(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Il,n=Z,n=Le(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Ll===2||Ll===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ge(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Re(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ge(r),Je(n)){case 2:case 8:n=xe;break;case 32:n=Se;break;case 268435456:n=we;break;default:n=Se}return r=sd.bind(null,e),n=he(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ge(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(nu!==0&&nu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var r=Z;return r=Le(e,e===Il?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(mu(e,r,t),od(e,ve()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Bu())return null;mu(e,t,!0)}function ld(){Yd(function(){Fl&6?he(be,id):ad()})}function ud(){if(td===0){var e=ra;e===0&&(e=Ne,Ne<<=1,!(Ne&261888)&&(Ne=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Wt(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[$e]||null).action),o=r.submitter;o&&(t=(t=o[$e]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new fn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);vs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),vs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<zr.length;md++){var hd=zr[md];Br(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}Br(jr,`onAnimationEnd`),Br(Mr,`onAnimationIteration`),Br(Nr,`onAnimationStart`),Br(`dblclick`,`onDoubleClick`),Br(`focusin`,`onFocus`),Br(`focusout`,`onBlur`),Br(Pr,`onTransitionRun`),Br(Fr,`onTransitionStart`),Br(Ir,`onTransitionCancel`),Br(Lr,`onTransitionEnd`),ht(`onMouseEnter`,[`mouseout`,`mouseover`]),ht(`onMouseLeave`,[`mouseout`,`mouseover`]),ht(`onPointerEnter`,[`pointerout`,`pointerover`]),ht(`onPointerLeave`,[`pointerout`,`pointerover`]),mt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),mt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),mt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),mt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),mt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),mt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Vr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Vr(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[tt];n===void 0&&(n=t[tt]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,ft.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!tn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=st(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Qt(function(){var r=a,i=qt(n),s=[];a:{var c=Rr.get(e);if(c!==void 0){var l=fn,u=e;switch(e){case`keypress`:if(cn(n)===0)break a;case`keydown`:case`keyup`:l=An;break;case`focusin`:u=`focus`,l=xn;break;case`focusout`:u=`blur`,l=xn;break;case`beforeblur`:case`afterblur`:l=xn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=yn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=bn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Mn;break;case jr:case Mr:case Nr:l=Sn;break;case Lr:l=Nn;break;case`scroll`:case`scrollend`:l=mn;break;case`wheel`:l=Pn;break;case`copy`:case`cut`:case`paste`:l=Cn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=jn;break;case`toggle`:case`beforetoggle`:l=Fn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=$t(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==Kt&&(u=n.relatedTarget||n.fromElement)&&(st(u)||u[et]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?st(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=yn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=jn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:lt(l),h=u==null?c:lt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,st(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?lt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=tr;else if(Yn(c))if(nr)v=dr;else{v=lr;var y=cr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Vt(r.elementType)&&(v=tr):v=ur;if(v&&=v(e,r)){Xn(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Nt(c,`number`,c.value)}switch(y=r?lt(r):window,e){case`focusin`:(Yn(y)||y.contentEditable===`true`)&&(xr=y,Sr=r,Cr=null);break;case`focusout`:Cr=Sr=xr=null;break;case`mousedown`:wr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:wr=!1,Tr(s,n,i);break;case`selectionchange`:if(br)break;case`keydown`:case`keyup`:Tr(s,n,i)}var b;if(Ln)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else Gn?Un(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Bn&&n.locale!==`ko`&&(Gn||x!==`onCompositionStart`?x===`onCompositionEnd`&&Gn&&(b=sn()):(rn=i,an=`value`in rn?rn.value:rn.textContent,Gn=!0)),y=Td(r,x),0<y.length&&(x=new wn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Wn(n),b!==null&&(x.data=b)))),(b=zn?Kn(e,n):qn(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new wn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=$t(e,n),i!=null&&r.unshift(wd(e,i,a)),i=$t(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=$t(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=$t(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Lt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Lt(e,``+r);break;case`className`:xt(e,`class`,r);break;case`tabIndex`:xt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:xt(e,n,r);break;case`style`:Bt(e,r,o);break;case`data`:if(t!==`object`){xt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Wt(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Wt(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Gt);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Wt(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),bt(e,`popover`,r);break;case`xlinkActuate`:St(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:St(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:St(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:St(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:St(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:St(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:St(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:St(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:St(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:bt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Ht.get(n)||n,bt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Bt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Lt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Lt(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=Gt);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!pt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[$e]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):bt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Mt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Pt(e,!!r,n,!0):Pt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}It(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if(Vt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}jt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Pt(e,!!n,n?[]:``,!1):Pt(e,!!n,t,!0)):Pt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}Ft(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if(Vt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[at]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),ot(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[at])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ot(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=L.d;L.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=vu();return e||t}function yf(e){var t=ct(e);t!==null&&t.tag===5&&t.type===`form`?bs(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=At(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),dt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+At(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+At(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+At(n.imageSizes)+`"]`)):i+=`[href="`+At(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),dt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+At(r)+`"][href="`+At(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=f({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),dt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=ut(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);dt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=ut(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),dt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=ut(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),dt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=W.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=ut(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=ut(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=ut(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+At(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),dt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+At(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+At(n.href)+`"]`);if(r)return t.instance=r,dt(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),dt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,dt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),dt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,dt(a),a):(r=n,(a=mf.get(o))&&(r=f({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),dt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[at]||a[Qe]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,dt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),dt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:R,_currentValue2:R,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ve(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ve(0),this.hiddenUpdates=Ve(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=$r(3,null,null,t),e.current=a,a.stateNode=e,t=$i(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ma(a),e}function tp(e){return e?(e=Zr,e):Zr}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Pa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Fa(e,r,t),n!==null&&(pu(n,e,t),Ia(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=Jr(e,67108864);t!==null&&pu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=du();t=qe(t);var n=Jr(e,t);n!==null&&pu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=2,up(e,t,n,r)}finally{L.p=a,I.T=i}}function lp(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=8,up(e,t,n,r)}finally{L.p=a,I.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ie(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-ke(o);s.entanglements[1]|=c,o&=~c}nd(a),!(Fl&6)&&($l=ve()+500,rd(0,!1))}}break;case 31:case 13:s=Jr(a,2),s!==null&&pu(s,a,2),vu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=qt(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=st(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(ye()){case be:return 2;case xe:return 8;case Se:case Ce:return 32;case we:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=ct(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=st(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,Xe(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,Xe(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Kt=r,n.target.dispatchEvent(r),Kt=null}else return t=ct(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=ct(n);a!==null&&(e.splice(t,3),t-=3,vs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[$e]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[$e]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,du(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),vu(),t[et]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ye();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.6`)throw Error(i(527,Lp,`19.2.6`));L.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:d(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.6`,rendererPackageName:`react-dom`,currentDispatcherRef:I,reconcilerVersion:`19.2.6`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{K=zp.inject(Rp),De=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Vs,s=Hs,c=Us;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[et]=t.current,xd(e),new Fp(t)}})),b=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=y()})),x=m(),S=b(),C=new TextEncoder,w=new TextDecoder,T=`CodeCafe CV Studio`,E=`CodeCafe-CV-Studio.workspace.json`,D=`codecafe-google-drive-token`,O=`codecafe-google-drive-grant-known`;function k(e){let t=atob(e);return Uint8Array.from(t,e=>e.charCodeAt(0))}async function A(e,t,n){let r=await crypto.subtle.importKey(`raw`,C.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,hash:`SHA-256`,salt:t,iterations:n},r,{name:`AES-GCM`,length:256},!1,[`encrypt`,`decrypt`])}async function j(e,t){if(e.version!==1||e.algorithm!==`AES-GCM`||e.kdf!==`PBKDF2-SHA256`)throw Error(`Formato de respaldo no compatible.`);let n=await A(t,k(e.salt),e.iterations);try{let t=await crypto.subtle.decrypt({name:`AES-GCM`,iv:k(e.iv)},n,k(e.ciphertext));return JSON.parse(w.decode(t))}catch{throw Error(`La contraseÃ±a no corresponde a este respaldo o el archivo estÃ¡ daÃ±ado.`)}}async function M(e){let t=await crypto.subtle.digest(`SHA-256`,C.encode(JSON.stringify(e)));return Array.from(new Uint8Array(t),e=>e.toString(16).padStart(2,`0`)).join(``)}async function N(e,t){let n=await fetch(e,{credentials:`same-origin`,...t,headers:{"Content-Type":`application/json`,...t?.headers??{}}}),r=await n.json().catch(()=>({}));if(!n.ok){let e=Error(r.error||`Error HTTP ${n.status}`);throw e.status=n.status,e.body=r,e}return r}async function P(e){return N(`/api/session`,{method:`POST`,body:JSON.stringify({password:e})})}async function F(e){await N(`/api/session`,{method:`DELETE`,headers:{"X-CSRF-Token":e}})}async function I(){return(await N(`/api/backups/latest`)).backup}async function L(){return(await N(`/api/backups`)).revisions}async function R(e){return(await N(`/api/backups/${e}`)).backup}async function z(e,t,n,r){return N(`/api/backups`,{method:`POST`,headers:{"X-CSRF-Token":r},body:JSON.stringify({payload:e,digest:t,baseRevision:n})})}async function B(){try{let e=await fetch(`/cloud-config.json`,{cache:`no-store`});return e.ok?await e.json():{}}catch{return{}}}async function ee(){window.google?.accounts.oauth2||await new Promise((e,t)=>{let n=document.querySelector(`script[data-codecafe-google="true"]`);if(n){n.addEventListener(`load`,()=>e(),{once:!0}),n.addEventListener(`error`,()=>t(Error(`No fue posible cargar Google Identity Services.`)),{once:!0});return}let r=document.createElement(`script`);r.src=`https://accounts.google.com/gsi/client`,r.async=!0,r.defer=!0,r.dataset.codecafeGoogle=`true`,r.onload=()=>e(),r.onerror=()=>t(Error(`No fue posible cargar Google Identity Services.`)),document.head.appendChild(r)})}async function te(e){return await ee(),new Promise((t,n)=>{window.google.accounts.oauth2.initTokenClient({client_id:e,scope:`https://www.googleapis.com/auth/drive.file`,callback:e=>{if(e.error||!e.access_token)n(Error(e.error||`Google no devolviÃ³ un token de acceso.`));else{let n=Date.now()+Math.max(60,e.expires_in??3600)*1e3;localStorage.setItem(D,JSON.stringify({token:e.access_token,expiresAt:n})),localStorage.setItem(O,`true`),t(e.access_token)}}}).requestAccessToken({prompt:localStorage.getItem(O)?``:`consent`})})}function V(){try{let e=JSON.parse(localStorage.getItem(D)||`null`);if(e?.token&&e.expiresAt&&e.expiresAt>Date.now()+3e4)return e.token}catch{}return localStorage.removeItem(D),``}async function H(e,t,n){let r=await fetch(t,{...n,headers:{Authorization:`Bearer ${e}`,...n?.headers??{}}});if(!r.ok){r.status===401&&localStorage.removeItem(D);let e=await r.text();throw Error(`Google Drive respondiÃ³ HTTP ${r.status}: ${e.slice(0,180)}`)}return r.json()}function U(e){return e.replaceAll(`\\`,`\\\\`).replaceAll(`'`,`\\'`)}async function W(e,t,n,r){let i=[`name='${U(t)}'`,`trashed=false`,...n?[`'${U(n)}' in parents`]:[],...r?[`mimeType='${U(r)}'`]:[]];return(await H(e,`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(i.join(` and `))}&spaces=drive&fields=files(id,modifiedTime)&orderBy=modifiedTime%20desc&pageSize=1`)).files?.[0]?.id??null}async function ne(e,t,n){return await W(e,t,n,`application/vnd.google-apps.folder`)||(await H(e,`https://www.googleapis.com/drive/v3/files?fields=id`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:t,mimeType:`application/vnd.google-apps.folder`,...n?{parents:[n]}:{}})})).id}async function re(e,t,n,r,i,a,o){let s=o?{name:t}:{name:t,mimeType:n,parents:[a]},c=`codecafe_${crypto.randomUUID().replaceAll(`-`,``)}`,l=typeof i==`string`?new Blob([i],{type:r}):i,u=new Blob([`--${c}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,JSON.stringify(s),`\r\n--${c}\r\nContent-Type: ${r}\r\n\r\n`,l,`\r\n--${c}--`],{type:`multipart/related; boundary=${c}`});return(await H(e,o?`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=multipart&fields=id`:`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`,{method:o?`PATCH`:`POST`,headers:{"Content-Type":`multipart/related; boundary=${c}`},body:u})).id}async function ie(e){let t=await W(e,T,void 0,`application/vnd.google-apps.folder`);if(!t)return null;let n=await W(e,E,t,`application/json`);return n?H(e,`https://www.googleapis.com/drive/v3/files/${n}?alt=media`):null}async function ae(e,t,n){let r=await ne(e,T),i=await ne(e,n.collectionName,r),a=await W(e,E,r,`application/json`);await re(e,E,`application/json`,`application/json`,JSON.stringify(t,null,2),r,a);let o=n.fileBaseName,s=await W(e,o,i,`application/vnd.google-apps.document`),c=await re(e,o,`application/vnd.google-apps.document`,`text/html`,n.html,i,s),l=await fetch(`https://www.googleapis.com/drive/v3/files/${c}/export?mimeType=application%2Fpdf`,{headers:{Authorization:`Bearer ${e}`}});if(!l.ok)throw Error(`Google Drive no pudo generar el PDF (HTTP ${l.status}).`);let u=`${n.fileBaseName}.pdf`,d=await W(e,u,i,`application/pdf`);await re(e,u,`application/pdf`,`application/pdf`,await l.blob(),i,d)}var oe=`codecafe-cv-workspace-v2`,se=`profile-owner`,ce=[{id:`it`,name:`IT`,order:0},{id:`construction`,name:`Construction`,order:1},{id:`general`,name:`General Purpose`,order:2}];function le(e){return`${e}-${crypto.randomUUID()}`}function ue(e,t){let n=new Date().toISOString(),r={id:le(`cv`),name:e.title||`Current CV`,collectionId:`general`,cv:e,settings:t,createdAt:n,updatedAt:n,archived:!1,profileId:se};return{schema:2,collections:ce,documents:[r],activeDocumentId:r.id,profiles:[{id:se,name:`Jaime`,createdAt:n}],activeProfileId:se}}function de(e){let t=e.profiles?.length?e.profiles:[{id:se,name:`Jaime`,createdAt:new Date().toISOString()}],n=t.some(t=>t.id===e.activeProfileId)?e.activeProfileId:t[0].id,r=e.documents.map(e=>({...e,profileId:e.profileId||t[0].id})),i=r.some(t=>t.id===e.activeDocumentId&&t.profileId===n&&!t.archived)?e.activeDocumentId:r.find(e=>e.profileId===n&&!e.archived)?.id||e.activeDocumentId;return{...e,profiles:t,activeProfileId:n,documents:r,activeDocumentId:i}}function fe(e){if(!e||typeof e!=`object`)return!1;let t=e;return t.schema===2&&Array.isArray(t.collections)&&Array.isArray(t.documents)&&t.documents.length>0&&t.documents.length<=20&&typeof t.activeDocumentId==`string`&&t.documents.some(e=>e?.id===t.activeDocumentId&&!e.archived)}function pe(e){let t=de(e);return t.documents.find(e=>e.id===t.activeDocumentId&&e.profileId===t.activeProfileId)??t.documents.find(e=>e.profileId===t.activeProfileId&&!e.archived)??e.documents[0]}function me(e,t,n){let r=new Date().toISOString();return{...e,documents:e.documents.map(i=>i.id===e.activeDocumentId?{...i,cv:t,settings:n,updatedAt:r}:i)}}function he(e){localStorage.setItem(oe,JSON.stringify(e))}function ge(e){let t=localStorage.getItem(oe);if(!t)return e;try{let n=JSON.parse(t);return!fe(n)||n.documents.length===0?e:de(n)}catch{return e}}var _e=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),G=s(((e,t)=>{t.exports=_e()}))(),ve={es:{title:`Mis CVs`,subtitle:`Organiza cada CV segÃºn el tipo de trabajo.`,active:`Activos`,archived:`Archivados`,newCv:`Nuevo CV en blanco`,saveAs:`Guardar actual como nuevo`,newName:`Nombre del CV`,collection:`ColecciÃ³n`,create:`Crear`,cancel:`Cancelar`,edit:`Editar`,duplicate:`Duplicar`,rename:`Renombrar`,move:`Mover a`,archive:`Archivar`,restore:`Restaurar`,remove:`Eliminar`,newCollection:`Nueva colecciÃ³n`,collectionName:`Nombre de la colecciÃ³n`,limit:`LÃ­mite actual: 20 CVs en total, incluidos los archivados`,empty:`Esta colecciÃ³n todavÃ­a no contiene CVs.`,close:`Cerrar`},en:{title:`My CVs`,subtitle:`Organize each rÃ©sumÃ© by the kind of work it targets.`,active:`Active`,archived:`Archived`,newCv:`New blank CV`,saveAs:`Save current as new`,newName:`CV name`,collection:`Collection`,create:`Create`,cancel:`Cancel`,edit:`Edit`,duplicate:`Duplicate`,rename:`Rename`,move:`Move to`,archive:`Archive`,restore:`Restore`,remove:`Delete`,newCollection:`New collection`,collectionName:`Collection name`,limit:`Current limit: 20 total CVs, including archived CVs`,empty:`This collection does not contain any CVs yet.`,close:`Close`}};function ye(e){let t=ve[e.lang],n=e.workspace.activeProfileId,r=e.workspace.documents.filter(e=>e.profileId===n),i=r.filter(e=>!e.archived).length,a=e.workspace.documents.length,o=r.filter(t=>e.showArchived?t.archived:!t.archived&&(e.selectedCollection===`all`||t.collectionId===e.selectedCollection)).sort((e,t)=>t.updatedAt.localeCompare(e.updatedAt));return(0,G.jsx)(`div`,{className:`libraryOverlay`,role:`presentation`,onMouseDown:t=>{t.target===t.currentTarget&&e.onClose()},children:(0,G.jsxs)(`section`,{className:`libraryPanel`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`library-title`,children:[(0,G.jsxs)(`div`,{className:`libraryHead`,children:[(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`span`,{className:`eyebrow`,children:`CODECAFE LIBRARY`}),(0,G.jsx)(`h2`,{id:`library-title`,children:t.title}),(0,G.jsx)(`p`,{children:t.subtitle})]}),(0,G.jsx)(`button`,{onClick:e.onClose,"aria-label":t.close,children:`Ã—`})]}),(0,G.jsxs)(`div`,{className:`libraryToolbar`,children:[(0,G.jsxs)(`button`,{className:`primary`,disabled:a>=20,onClick:()=>e.onStartCreate(`blank`),children:[`ï¼‹ `,t.newCv]}),(0,G.jsx)(`button`,{disabled:a>=20,onClick:()=>e.onStartCreate(`copy`),children:t.saveAs})]}),e.creationMode&&(0,G.jsxs)(`div`,{className:`createCvPanel`,children:[(0,G.jsxs)(`label`,{children:[t.newName,(0,G.jsx)(`input`,{className:`inputField`,value:e.draftName,onChange:t=>e.onDraftName(t.target.value)})]}),(0,G.jsxs)(`label`,{children:[t.collection,(0,G.jsx)(`select`,{className:`inputField`,value:e.draftCollection,onChange:t=>e.onDraftCollection(t.target.value),children:[...e.workspace.collections].sort((e,t)=>e.order-t.order).map(e=>(0,G.jsx)(`option`,{value:e.id,children:e.name},e.id))})]}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`button`,{className:`primary`,disabled:!e.draftName.trim(),onClick:e.onCreate,children:t.create}),(0,G.jsx)(`button`,{onClick:e.onCancelCreate,children:t.cancel})]})]}),(0,G.jsxs)(`div`,{className:`libraryBody`,children:[(0,G.jsxs)(`nav`,{className:`collectionNav`,children:[(0,G.jsxs)(`button`,{className:!e.showArchived&&e.selectedCollection===`all`?`selected`:``,onClick:()=>{e.onShowArchived(!1),e.onSelectCollection(`all`)},children:[t.active,(0,G.jsx)(`span`,{children:i})]}),[...e.workspace.collections].sort((e,t)=>e.order-t.order).map(t=>(0,G.jsxs)(`button`,{className:!e.showArchived&&e.selectedCollection===t.id?`selected`:``,onClick:()=>{e.onShowArchived(!1),e.onSelectCollection(t.id)},children:[t.name,(0,G.jsx)(`span`,{children:r.filter(e=>!e.archived&&e.collectionId===t.id).length})]},t.id)),(0,G.jsxs)(`button`,{onClick:e.onCreateCollection,children:[`ï¼‹ `,t.newCollection]}),(0,G.jsxs)(`button`,{className:e.showArchived?`selected`:``,onClick:()=>e.onShowArchived(!0),children:[t.archived,(0,G.jsx)(`span`,{children:r.filter(e=>e.archived).length})]})]}),(0,G.jsxs)(`div`,{className:`cvCardGrid`,children:[o.length===0&&(0,G.jsx)(`p`,{className:`libraryEmpty`,children:t.empty}),o.map(n=>(0,G.jsxs)(`article`,{className:`cvCard ${n.id===e.workspace.activeDocumentId?`current`:``}`,children:[(0,G.jsxs)(`div`,{children:[(0,G.jsxs)(`span`,{children:[n.settings.lang.toUpperCase(),` Â· `,n.settings.template===`ats`?`ATS`:`Modern`]}),(0,G.jsx)(`h3`,{children:n.name}),(0,G.jsx)(`p`,{children:n.cv.title||n.cv.name}),(0,G.jsx)(`time`,{children:new Date(n.updatedAt).toLocaleString(e.lang)})]}),(0,G.jsxs)(`div`,{className:`cvCardActions`,children:[!n.archived&&(0,G.jsx)(`button`,{className:`primary`,onClick:()=>e.onOpen(n.id),children:t.edit}),!n.archived&&(0,G.jsx)(`button`,{disabled:a>=20,onClick:()=>e.onDuplicate(n.id),children:t.duplicate}),(0,G.jsx)(`button`,{onClick:()=>e.onRename(n.id),children:t.rename}),!n.archived&&(0,G.jsxs)(`label`,{className:`moveCv`,children:[t.move,(0,G.jsx)(`select`,{value:n.collectionId,onChange:t=>e.onMove(n.id,t.target.value),children:[...e.workspace.collections].sort((e,t)=>e.order-t.order).map(e=>(0,G.jsx)(`option`,{value:e.id,children:e.name},e.id))})]}),(0,G.jsx)(`button`,{disabled:!n.archived&&i<=1,onClick:()=>e.onArchive(n.id,!n.archived),children:n.archived?t.restore:t.archive}),n.archived&&(0,G.jsx)(`button`,{className:`danger`,onClick:()=>e.onDelete(n.id),children:t.remove})]})]},n.id))]})]}),(0,G.jsxs)(`footer`,{className:`libraryFooter`,children:[(0,G.jsx)(`span`,{children:t.limit}),(0,G.jsx)(`button`,{onClick:e.onClose,children:t.close})]})]})})}var be=s(((e,t)=>{(function(n){typeof e==`object`&&t!==void 0?t.exports=n():typeof define==`function`&&define.amd?define([],n):(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:this).JSZip=n()})(function(){return function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var c=typeof f==`function`&&f;if(!s&&c)return c(o,!0);if(a)return a(o,!0);var l=Error(`Cannot find module '`+o+`'`);throw l.code=`MODULE_NOT_FOUND`,l}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){var n=t[o][1][e];return i(n||e)},u,u.exports,e,t,n,r)}return n[o].exports}for(var a=typeof f==`function`&&f,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){var r=e(`./utils`),i=e(`./support`),a=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;n.encode=function(e){for(var t,n,i,o,s,c,l,u=[],d=0,f=e.length,p=f,m=r.getTypeOf(e)!==`string`;d<e.length;)p=f-d,i=m?(t=e[d++],n=d<f?e[d++]:0,d<f?e[d++]:0):(t=e.charCodeAt(d++),n=d<f?e.charCodeAt(d++):0,d<f?e.charCodeAt(d++):0),o=t>>2,s=(3&t)<<4|n>>4,c=1<p?(15&n)<<2|i>>6:64,l=2<p?63&i:64,u.push(a.charAt(o)+a.charAt(s)+a.charAt(c)+a.charAt(l));return u.join(``)},n.decode=function(e){var t,n,r,o,s,c,l=0,u=0,d=`data:`;if(e.substr(0,d.length)===d)throw Error(`Invalid base64 input, it looks like a data url.`);var f,p=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,``)).length/4;if(e.charAt(e.length-1)===a.charAt(64)&&p--,e.charAt(e.length-2)===a.charAt(64)&&p--,p%1!=0)throw Error(`Invalid base64 input, bad content length.`);for(f=i.uint8array?new Uint8Array(0|p):Array(0|p);l<e.length;)t=a.indexOf(e.charAt(l++))<<2|(o=a.indexOf(e.charAt(l++)))>>4,n=(15&o)<<4|(s=a.indexOf(e.charAt(l++)))>>2,r=(3&s)<<6|(c=a.indexOf(e.charAt(l++))),f[u++]=t,s!==64&&(f[u++]=n),c!==64&&(f[u++]=r);return f}},{"./support":30,"./utils":32}],2:[function(e,t,n){var r=e(`./external`),i=e(`./stream/DataWorker`),a=e(`./stream/Crc32Probe`),o=e(`./stream/DataLengthProbe`);function s(e,t,n,r,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=n,this.compression=r,this.compressedContent=i}s.prototype={getContentWorker:function(){var e=new i(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o(`data_length`)),t=this;return e.on(`end`,function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw Error(`Bug : uncompressed data size mismatch`)}),e},getCompressedWorker:function(){return new i(r.Promise.resolve(this.compressedContent)).withStreamInfo(`compressedSize`,this.compressedSize).withStreamInfo(`uncompressedSize`,this.uncompressedSize).withStreamInfo(`crc32`,this.crc32).withStreamInfo(`compression`,this.compression)}},s.createWorkerFrom=function(e,t,n){return e.pipe(new a).pipe(new o(`uncompressedSize`)).pipe(t.compressWorker(n)).pipe(new o(`compressedSize`)).withStreamInfo(`compression`,t)},t.exports=s},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,n){var r=e(`./stream/GenericWorker`);n.STORE={magic:`\0\0`,compressWorker:function(){return new r(`STORE compression`)},uncompressWorker:function(){return new r(`STORE decompression`)}},n.DEFLATE=e(`./flate`)},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,n){var r=e(`./utils`),i=function(){for(var e,t=[],n=0;n<256;n++){e=n;for(var r=0;r<8;r++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}();t.exports=function(e,t){return e!==void 0&&e.length?r.getTypeOf(e)===`string`?function(e,t,n,r){var a=i,o=r+n;e^=-1;for(var s=r;s<o;s++)e=e>>>8^a[255&(e^t.charCodeAt(s))];return-1^e}(0|t,e,e.length,0):function(e,t,n,r){var a=i,o=r+n;e^=-1;for(var s=r;s<o;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,n){n.base64=!1,n.binary=!1,n.dir=!1,n.createFolders=!0,n.date=null,n.compression=null,n.compressionOptions=null,n.comment=null,n.unixPermissions=null,n.dosPermissions=null},{}],6:[function(e,t,n){var r=null;r=typeof Promise<`u`?Promise:e(`lie`),t.exports={Promise:r}},{lie:37}],7:[function(e,t,n){var r=typeof Uint8Array<`u`&&typeof Uint16Array<`u`&&typeof Uint32Array<`u`,i=e(`pako`),a=e(`./utils`),o=e(`./stream/GenericWorker`),s=r?`uint8array`:`array`;function c(e,t){o.call(this,`FlateWorker/`+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}n.magic=`\b\0`,a.inherits(c,o),c.prototype.processChunk=function(e){this.meta=e.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(s,e.data),!1)},c.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},n.compressWorker=function(e){return new c(`Deflate`,e)},n.uncompressWorker=function(){return new c(`Inflate`,{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,n){function r(e,t){var n,r=``;for(n=0;n<t;n++)r+=String.fromCharCode(255&e),e>>>=8;return r}function i(e,t,n,i,o,u){var d,f,p=e.file,m=e.compression,h=u!==s.utf8encode,g=a.transformTo(`string`,u(p.name)),_=a.transformTo(`string`,s.utf8encode(p.name)),v=p.comment,y=a.transformTo(`string`,u(v)),b=a.transformTo(`string`,s.utf8encode(v)),x=_.length!==p.name.length,S=b.length!==v.length,C=``,w=``,T=``,E=p.dir,D=p.date,O={crc32:0,compressedSize:0,uncompressedSize:0};t&&!n||(O.crc32=e.crc32,O.compressedSize=e.compressedSize,O.uncompressedSize=e.uncompressedSize);var k=0;t&&(k|=8),h||!x&&!S||(k|=2048);var A=0,j=0;E&&(A|=16),o===`UNIX`?(j=798,A|=function(e,t){var n=e;return e||(n=t?16893:33204),(65535&n)<<16}(p.unixPermissions,E)):(j=20,A|=function(e){return 63&(e||0)}(p.dosPermissions)),d=D.getUTCHours(),d<<=6,d|=D.getUTCMinutes(),d<<=5,d|=D.getUTCSeconds()/2,f=D.getUTCFullYear()-1980,f<<=4,f|=D.getUTCMonth()+1,f<<=5,f|=D.getUTCDate(),x&&(w=r(1,1)+r(c(g),4)+_,C+=`up`+r(w.length,2)+w),S&&(T=r(1,1)+r(c(y),4)+b,C+=`uc`+r(T.length,2)+T);var M=``;return M+=`
\0`,M+=r(k,2),M+=m.magic,M+=r(d,2),M+=r(f,2),M+=r(O.crc32,4),M+=r(O.compressedSize,4),M+=r(O.uncompressedSize,4),M+=r(g.length,2),M+=r(C.length,2),{fileRecord:l.LOCAL_FILE_HEADER+M+g+C,dirRecord:l.CENTRAL_FILE_HEADER+r(j,2)+M+r(y.length,2)+`\0\0\0\0`+r(A,4)+r(i,4)+g+C+y}}var a=e(`../utils`),o=e(`../stream/GenericWorker`),s=e(`../utf8`),c=e(`../crc32`),l=e(`../signature`);function u(e,t,n,r){o.call(this,`ZipFileWorker`),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=n,this.encodeFileName=r,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(u,o),u.prototype.push=function(e){var t=e.meta.percent||0,n=this.entriesCount,r=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,o.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:n?(t+100*(n-r-1))/n:100}}))},u.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var n=i(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:n.fileRecord,meta:{percent:0}})}else this.accumulate=!0},u.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,n=i(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(n.dirRecord),t)this.push({data:function(e){return l.DATA_DESCRIPTOR+r(e.crc32,4)+r(e.compressedSize,4)+r(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:n.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},u.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var n=this.bytesWritten-e,i=function(e,t,n,i,o){var s=a.transformTo(`string`,o(i));return l.CENTRAL_DIRECTORY_END+`\0\0\0\0`+r(e,2)+r(e,2)+r(t,4)+r(n,4)+r(s.length,2)+s}(this.dirRecords.length,n,e,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},u.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},u.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on(`data`,function(e){t.processChunk(e)}),e.on(`end`,function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on(`error`,function(e){t.error(e)}),this},u.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},u.prototype.error=function(e){var t=this._sources;if(!o.prototype.error.call(this,e))return!1;for(var n=0;n<t.length;n++)try{t[n].error(e)}catch{}return!0},u.prototype.lock=function(){o.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=u},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,n){var r=e(`../compressions`),i=e(`./ZipFileWorker`);n.generateWorker=function(e,t,n){var a=new i(t.streamFiles,n,t.platform,t.encodeFileName),o=0;try{e.forEach(function(e,n){o++;var i=function(e,t){var n=e||t,i=r[n];if(!i)throw Error(n+` is not a valid compression method !`);return i}(n.options.compression,t.compression),s=n.options.compressionOptions||t.compressionOptions||{},c=n.dir,l=n.date;n._compressWorker(i,s).withStreamInfo(`file`,{name:e,dir:c,date:l,comment:n.comment||``,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions}).pipe(a)}),a.entriesCount=o}catch(e){a.error(e)}return a}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,n){function r(){if(!(this instanceof r))return new r;if(arguments.length)throw Error(`The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.`);this.files=Object.create(null),this.comment=null,this.root=``,this.clone=function(){var e=new r;for(var t in this)typeof this[t]!=`function`&&(e[t]=this[t]);return e}}(r.prototype=e(`./object`)).loadAsync=e(`./load`),r.support=e(`./support`),r.defaults=e(`./defaults`),r.version=`3.10.1`,r.loadAsync=function(e,t){return new r().loadAsync(e,t)},r.external=e(`./external`),t.exports=r},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,n){var r=e(`./utils`),i=e(`./external`),a=e(`./utf8`),o=e(`./zipEntries`),s=e(`./stream/Crc32Probe`),c=e(`./nodejsUtils`);function l(e){return new i.Promise(function(t,n){var r=e.decompressed.getContentWorker().pipe(new s);r.on(`error`,function(e){n(e)}).on(`end`,function(){r.streamInfo.crc32===e.decompressed.crc32?t():n(Error(`Corrupted zip : CRC32 mismatch`))}).resume()})}t.exports=function(e,t){var n=this;return t=r.extend(t||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),c.isNode&&c.isStream(e)?i.Promise.reject(Error(`JSZip can't accept a stream when loading a zip file.`)):r.prepareContent(`the loaded zip file`,e,!0,t.optimizedBinaryString,t.base64).then(function(e){var n=new o(t);return n.load(e),n}).then(function(e){var n=[i.Promise.resolve(e)],r=e.files;if(t.checkCRC32)for(var a=0;a<r.length;a++)n.push(l(r[a]));return i.Promise.all(n)}).then(function(e){for(var i=e.shift(),a=i.files,o=0;o<a.length;o++){var s=a[o],c=s.fileNameStr,l=r.resolve(s.fileNameStr);n.file(l,s.decompressed,{binary:!0,optimizedBinaryString:!0,date:s.date,dir:s.dir,comment:s.fileCommentStr.length?s.fileCommentStr:null,unixPermissions:s.unixPermissions,dosPermissions:s.dosPermissions,createFolders:t.createFolders}),s.dir||(n.file(l).unsafeOriginalName=c)}return i.zipComment.length&&(n.comment=i.zipComment),n})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,n){var r=e(`../utils`),i=e(`../stream/GenericWorker`);function a(e,t){i.call(this,`Nodejs stream input adapter for `+e),this._upstreamEnded=!1,this._bindStream(t)}r.inherits(a,i),a.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on(`data`,function(e){t.push({data:e,meta:{percent:0}})}).on(`error`,function(e){t.isPaused?this.generatedError=e:t.error(e)}).on(`end`,function(){t.isPaused?t._upstreamEnded=!0:t.end()})},a.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=a},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,n){var r=e(`readable-stream`).Readable;function i(e,t,n){r.call(this,t),this._helper=e;var i=this;e.on(`data`,function(e,t){i.push(e)||i._helper.pause(),n&&n(t)}).on(`error`,function(e){i.emit(`error`,e)}).on(`end`,function(){i.push(null)})}e(`../utils`).inherits(i,r),i.prototype._read=function(){this._helper.resume()},t.exports=i},{"../utils":32,"readable-stream":16}],14:[function(e,t,n){t.exports={isNode:typeof Buffer<`u`,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if(typeof e==`number`)throw Error(`The "data" argument must not be a number`);return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&typeof e.on==`function`&&typeof e.pause==`function`&&typeof e.resume==`function`}}},{}],15:[function(e,t,n){function r(e,t,n){var r,i=a.getTypeOf(t),s=a.extend(n||{},c);s.date=s.date||new Date,s.compression!==null&&(s.compression=s.compression.toUpperCase()),typeof s.unixPermissions==`string`&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=h(e)),s.createFolders&&(r=m(e))&&g.call(this,r,!0);var d=i===`string`&&!1===s.binary&&!1===s.base64;n&&n.binary!==void 0||(s.binary=!d),(t instanceof l&&t.uncompressedSize===0||s.dir||!t||t.length===0)&&(s.base64=!1,s.binary=!0,t=``,s.compression=`STORE`,i=`string`);var _=null;_=t instanceof l||t instanceof o?t:f.isNode&&f.isStream(t)?new p(e,t):a.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var v=new u(e,_,s);this.files[e]=v}var i=e(`./utf8`),a=e(`./utils`),o=e(`./stream/GenericWorker`),s=e(`./stream/StreamHelper`),c=e(`./defaults`),l=e(`./compressedObject`),u=e(`./zipObject`),d=e(`./generate`),f=e(`./nodejsUtils`),p=e(`./nodejs/NodejsStreamInputAdapter`),m=function(e){e.slice(-1)===`/`&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf(`/`);return 0<t?e.substring(0,t):``},h=function(e){return e.slice(-1)!==`/`&&(e+=`/`),e},g=function(e,t){return t=t===void 0?c.createFolders:t,e=h(e),this.files[e]||r.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function _(e){return Object.prototype.toString.call(e)===`[object RegExp]`}t.exports={load:function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},forEach:function(e){var t,n,r;for(t in this.files)r=this.files[t],(n=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(n,r)},filter:function(e){var t=[];return this.forEach(function(n,r){e(n,r)&&t.push(r)}),t},file:function(e,t,n){if(arguments.length!==1)return e=this.root+e,r.call(this,e,t,n),this;if(_(e)){var i=e;return this.filter(function(e,t){return!t.dir&&i.test(e)})}var a=this.files[this.root+e];return a&&!a.dir?a:null},folder:function(e){if(!e)return this;if(_(e))return this.filter(function(t,n){return n.dir&&e.test(t)});var t=this.root+e,n=g.call(this,t),r=this.clone();return r.root=n.name,r},remove:function(e){e=this.root+e;var t=this.files[e];if(t||=(e.slice(-1)!==`/`&&(e+=`/`),this.files[e]),t&&!t.dir)delete this.files[e];else for(var n=this.filter(function(t,n){return n.name.slice(0,e.length)===e}),r=0;r<n.length;r++)delete this.files[n[r].name];return this},generate:function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},generateInternalStream:function(e){var t,n={};try{if((n=a.extend(e||{},{streamFiles:!1,compression:`STORE`,compressionOptions:null,type:``,platform:`DOS`,comment:null,mimeType:`application/zip`,encodeFileName:i.utf8encode})).type=n.type.toLowerCase(),n.compression=n.compression.toUpperCase(),n.type===`binarystring`&&(n.type=`string`),!n.type)throw Error(`No output type specified.`);a.checkSupport(n.type),n.platform!==`darwin`&&n.platform!==`freebsd`&&n.platform!==`linux`&&n.platform!==`sunos`||(n.platform=`UNIX`),n.platform===`win32`&&(n.platform=`DOS`);var r=n.comment||this.comment||``;t=d.generateWorker(this,n,r)}catch(e){(t=new o(`error`)).error(e)}return new s(t,n.type||`string`,n.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e||={}).type||(e.type=`nodebuffer`),this.generateInternalStream(e).toNodejsStream(t)}}},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,n){t.exports=e(`stream`)},{stream:void 0}],17:[function(e,t,n){var r=e(`./DataReader`);function i(e){r.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e(`../utils`).inherits(i,r),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.length-4;0<=a;--a)if(this.data[a]===t&&this.data[a+1]===n&&this.data[a+2]===r&&this.data[a+3]===i)return a-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.readData(4);return t===a[0]&&n===a[1]&&r===a[2]&&i===a[3]},i.prototype.readData=function(e){if(this.checkOffset(e),e===0)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,n){var r=e(`../utils`);function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw Error(`End of data reached (data length = `+this.length+`, asked index = `+e+`). Corrupted zip ?`)},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,n=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)n=(n<<8)+this.byteAt(t);return this.index+=e,n},readString:function(e){return r.transformTo(`string`,this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,n){var r=e(`./Uint8ArrayReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,n){var r=e(`./DataReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,n){var r=e(`./ArrayReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.readData=function(e){if(this.checkOffset(e),e===0)return new Uint8Array;var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,n){var r=e(`../utils`),i=e(`../support`),a=e(`./ArrayReader`),o=e(`./StringReader`),s=e(`./NodeBufferReader`),c=e(`./Uint8ArrayReader`);t.exports=function(e){var t=r.getTypeOf(e);return r.checkSupport(t),t!==`string`||i.uint8array?t===`nodebuffer`?new s(e):i.uint8array?new c(r.transformTo(`uint8array`,e)):new a(r.transformTo(`array`,e)):new o(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,n){n.LOCAL_FILE_HEADER=`PK`,n.CENTRAL_FILE_HEADER=`PK`,n.CENTRAL_DIRECTORY_END=`PK`,n.ZIP64_CENTRAL_DIRECTORY_LOCATOR=`PK\x07`,n.ZIP64_CENTRAL_DIRECTORY_END=`PK`,n.DATA_DESCRIPTOR=`PK\x07\b`},{}],24:[function(e,t,n){var r=e(`./GenericWorker`),i=e(`../utils`);function a(e){r.call(this,`ConvertWorker to `+e),this.destType=e}i.inherits(a,r),a.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=a},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,n){var r=e(`./GenericWorker`),i=e(`../crc32`);function a(){r.call(this,`Crc32Probe`),this.withStreamInfo(`crc32`,0)}e(`../utils`).inherits(a,r),a.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=a},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,n){var r=e(`../utils`),i=e(`./GenericWorker`);function a(e){i.call(this,`DataLengthProbe for `+e),this.propName=e,this.withStreamInfo(e,0)}r.inherits(a,i),a.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=a},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,n){var r=e(`../utils`),i=e(`./GenericWorker`);function a(e){i.call(this,`DataWorker`);var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type=``,this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=r.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}r.inherits(a,i),a.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,r.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(r.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case`string`:e=this.data.substring(this.index,t);break;case`uint8array`:e=this.data.subarray(this.index,t);break;case`array`:case`nodebuffer`:e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=a},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,n){function r(e){this.name=e||`default`,this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}r.prototype={push:function(e){this.emit(`data`,e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit(`end`),this.cleanUp(),this.isFinished=!0}catch(e){this.emit(`error`,e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit(`error`,e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var n=0;n<this._listeners[e].length;n++)this._listeners[e][n].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw Error(`The stream '`+this+`' has already been used.`);this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on(`data`,function(e){t.processChunk(e)}),e.on(`end`,function(){t.end()}),e.on(`error`,function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw Error(`The stream '`+this+`' has already been used.`);this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e=`Worker `+this.name;return this.previous?this.previous+` -> `+e:e}},t.exports=r},{}],29:[function(e,t,n){var r=e(`../utils`),i=e(`./ConvertWorker`),a=e(`./GenericWorker`),o=e(`../base64`),s=e(`../support`),c=e(`../external`),l=null;if(s.nodestream)try{l=e(`../nodejs/NodejsStreamOutputAdapter`)}catch{}function u(e,t){return new c.Promise(function(n,i){var a=[],s=e._internalType,c=e._outputType,l=e._mimeType;e.on(`data`,function(e,n){a.push(e),t&&t(n)}).on(`error`,function(e){a=[],i(e)}).on(`end`,function(){try{n(function(e,t,n){switch(e){case`blob`:return r.newBlob(r.transformTo(`arraybuffer`,t),n);case`base64`:return o.encode(t);default:return r.transformTo(e,t)}}(c,function(e,t){var n,r=0,i=null,a=0;for(n=0;n<t.length;n++)a+=t[n].length;switch(e){case`string`:return t.join(``);case`array`:return Array.prototype.concat.apply([],t);case`uint8array`:for(i=new Uint8Array(a),n=0;n<t.length;n++)i.set(t[n],r),r+=t[n].length;return i;case`nodebuffer`:return Buffer.concat(t);default:throw Error(`concat : unsupported type '`+e+`'`)}}(s,a),l))}catch(e){i(e)}a=[]}).resume()})}function d(e,t,n){var o=t;switch(t){case`blob`:case`arraybuffer`:o=`uint8array`;break;case`base64`:o=`string`}try{this._internalType=o,this._outputType=t,this._mimeType=n,r.checkSupport(o),this._worker=e.pipe(new i(o)),e.lock()}catch(e){this._worker=new a(`error`),this._worker.error(e)}}d.prototype={accumulate:function(e){return u(this,e)},on:function(e,t){var n=this;return e===`data`?this._worker.on(e,function(e){t.call(n,e.data,e.meta)}):this._worker.on(e,function(){r.delay(t,arguments,n)}),this},resume:function(){return r.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(r.checkSupport(`nodestream`),this._outputType!==`nodebuffer`)throw Error(this._outputType+` is not supported by this method`);return new l(this,{objectMode:this._outputType!==`nodebuffer`},e)}},t.exports=d},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,n){if(n.base64=!0,n.array=!0,n.string=!0,n.arraybuffer=typeof ArrayBuffer<`u`&&typeof Uint8Array<`u`,n.nodebuffer=typeof Buffer<`u`,n.uint8array=typeof Uint8Array<`u`,typeof ArrayBuffer>`u`)n.blob=!1;else{var r=new ArrayBuffer(0);try{n.blob=new Blob([r],{type:`application/zip`}).size===0}catch{try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(r),n.blob=i.getBlob(`application/zip`).size===0}catch{n.blob=!1}}}try{n.nodestream=!!e(`readable-stream`).Readable}catch{n.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,n){for(var r=e(`./utils`),i=e(`./support`),a=e(`./nodejsUtils`),o=e(`./stream/GenericWorker`),s=Array(256),c=0;c<256;c++)s[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;s[254]=s[254]=1;function l(){o.call(this,`utf-8 decode`),this.leftOver=null}function u(){o.call(this,`utf-8 encode`)}n.utf8encode=function(e){return i.nodebuffer?a.newBufferFrom(e,`utf-8`):function(e){var t,n,r,a,o,s=e.length,c=0;for(a=0;a<s;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(r=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(r-56320),a++),c+=n<128?1:n<2048?2:n<65536?3:4;for(t=i.uint8array?new Uint8Array(c):Array(c),a=o=0;o<c;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(r=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(r-56320),a++),n<128?t[o++]=n:(n<2048?t[o++]=192|n>>>6:(n<65536?t[o++]=224|n>>>12:(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63),t[o++]=128|n>>>6&63),t[o++]=128|63&n);return t}(e)},n.utf8decode=function(e){return i.nodebuffer?r.transformTo(`nodebuffer`,e).toString(`utf-8`):function(e){var t,n,i,a,o=e.length,c=Array(2*o);for(t=n=0;t<o;)if((i=e[t++])<128)c[n++]=i;else if(4<(a=s[i]))c[n++]=65533,t+=a-1;else{for(i&=a===2?31:a===3?15:7;1<a&&t<o;)i=i<<6|63&e[t++],a--;1<a?c[n++]=65533:i<65536?c[n++]=i:(i-=65536,c[n++]=55296|i>>10&1023,c[n++]=56320|1023&i)}return c.length!==n&&(c.subarray?c=c.subarray(0,n):c.length=n),r.applyFromCharCode(c)}(e=r.transformTo(i.uint8array?`uint8array`:`array`,e))},r.inherits(l,o),l.prototype.processChunk=function(e){var t=r.transformTo(i.uint8array?`uint8array`:`array`,e.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var a=t;(t=new Uint8Array(a.length+this.leftOver.length)).set(this.leftOver,0),t.set(a,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var o=function(e,t){var n;for((t||=e.length)>e.length&&(t=e.length),n=t-1;0<=n&&(192&e[n])==128;)n--;return n<0||n===0?t:n+s[e[n]]>t?n:t}(t),c=t;o!==t.length&&(i.uint8array?(c=t.subarray(0,o),this.leftOver=t.subarray(o,t.length)):(c=t.slice(0,o),this.leftOver=t.slice(o,t.length))),this.push({data:n.utf8decode(c),meta:e.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:n.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},n.Utf8DecodeWorker=l,r.inherits(u,o),u.prototype.processChunk=function(e){this.push({data:n.utf8encode(e.data),meta:e.meta})},n.Utf8EncodeWorker=u},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,n){var r=e(`./support`),i=e(`./base64`),a=e(`./nodejsUtils`),o=e(`./external`);function s(e){return e}function c(e,t){for(var n=0;n<e.length;++n)t[n]=255&e.charCodeAt(n);return t}e(`setimmediate`),n.newBlob=function(e,t){n.checkSupport(`blob`);try{return new Blob([e],{type:t})}catch{try{var r=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return r.append(e),r.getBlob(t)}catch{throw Error(`Bug : can't construct the Blob.`)}}};var l={stringifyByChunk:function(e,t,n){var r=[],i=0,a=e.length;if(a<=n)return String.fromCharCode.apply(null,e);for(;i<a;)t===`array`||t===`nodebuffer`?r.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+n,a)))):r.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+n,a)))),i+=n;return r.join(``)},stringifyByChar:function(e){for(var t=``,n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t},applyCanBeUsed:{uint8array:function(){try{return r.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return r.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function u(e){var t=65536,r=n.getTypeOf(e),i=!0;if(r===`uint8array`?i=l.applyCanBeUsed.uint8array:r===`nodebuffer`&&(i=l.applyCanBeUsed.nodebuffer),i)for(;1<t;)try{return l.stringifyByChunk(e,r,t)}catch{t=Math.floor(t/2)}return l.stringifyByChar(e)}function d(e,t){for(var n=0;n<e.length;n++)t[n]=e[n];return t}n.applyFromCharCode=u;var f={};f.string={string:s,array:function(e){return c(e,Array(e.length))},arraybuffer:function(e){return f.string.uint8array(e).buffer},uint8array:function(e){return c(e,new Uint8Array(e.length))},nodebuffer:function(e){return c(e,a.allocBuffer(e.length))}},f.array={string:u,array:s,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(e)}},f.arraybuffer={string:function(e){return u(new Uint8Array(e))},array:function(e){return d(new Uint8Array(e),Array(e.byteLength))},arraybuffer:s,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(new Uint8Array(e))}},f.uint8array={string:u,array:function(e){return d(e,Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:s,nodebuffer:function(e){return a.newBufferFrom(e)}},f.nodebuffer={string:u,array:function(e){return d(e,Array(e.length))},arraybuffer:function(e){return f.nodebuffer.uint8array(e).buffer},uint8array:function(e){return d(e,new Uint8Array(e.length))},nodebuffer:s},n.transformTo=function(e,t){return t||=``,e?(n.checkSupport(e),f[n.getTypeOf(t)][e](t)):t},n.resolve=function(e){for(var t=e.split(`/`),n=[],r=0;r<t.length;r++){var i=t[r];i===`.`||i===``&&r!==0&&r!==t.length-1||(i===`..`?n.pop():n.push(i))}return n.join(`/`)},n.getTypeOf=function(e){return typeof e==`string`?`string`:Object.prototype.toString.call(e)===`[object Array]`?`array`:r.nodebuffer&&a.isBuffer(e)?`nodebuffer`:r.uint8array&&e instanceof Uint8Array?`uint8array`:r.arraybuffer&&e instanceof ArrayBuffer?`arraybuffer`:void 0},n.checkSupport=function(e){if(!r[e.toLowerCase()])throw Error(e+` is not supported by this platform`)},n.MAX_VALUE_16BITS=65535,n.MAX_VALUE_32BITS=-1,n.pretty=function(e){var t,n,r=``;for(n=0;n<(e||``).length;n++)r+=`\\x`+((t=e.charCodeAt(n))<16?`0`:``)+t.toString(16).toUpperCase();return r},n.delay=function(e,t,n){setImmediate(function(){e.apply(n||null,t||[])})},n.inherits=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n},n.extend=function(){var e,t,n={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&n[t]===void 0&&(n[t]=arguments[e][t]);return n},n.prepareContent=function(e,t,a,s,l){return o.Promise.resolve(t).then(function(e){return r.blob&&(e instanceof Blob||[`[object File]`,`[object Blob]`].indexOf(Object.prototype.toString.call(e))!==-1)&&typeof FileReader<`u`?new o.Promise(function(t,n){var r=new FileReader;r.onload=function(e){t(e.target.result)},r.onerror=function(e){n(e.target.error)},r.readAsArrayBuffer(e)}):e}).then(function(t){var u=n.getTypeOf(t);return u?(u===`arraybuffer`?t=n.transformTo(`uint8array`,t):u===`string`&&(l?t=i.decode(t):a&&!0!==s&&(t=function(e){return c(e,r.uint8array?new Uint8Array(e.length):Array(e.length))}(t))),t):o.Promise.reject(Error(`Can't read the data of '`+e+`'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?`))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,n){var r=e(`./reader/readerFor`),i=e(`./utils`),a=e(`./signature`),o=e(`./zipEntry`),s=e(`./support`);function c(e){this.files=[],this.loadOptions=e}c.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw Error(`Corrupted zip or bug: unexpected signature (`+i.pretty(t)+`, expected `+i.pretty(e)+`)`)}},isSignature:function(e,t){var n=this.reader.index;this.reader.setIndex(e);var r=this.reader.readString(4)===t;return this.reader.setIndex(n),r},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=s.uint8array?`uint8array`:`array`,n=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(n)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,n,r=this.zip64EndOfCentralSize-44;0<r;)e=this.reader.readInt(2),t=this.reader.readInt(4),n=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:n}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw Error(`Multi-volumes zip are not supported`)},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(e=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw Error(`Corrupted zip or bug: expected `+this.centralDirRecords+` records in central dir, got `+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(e<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?Error(`Corrupted zip: can't find end of central directory`):Error(`Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html`);this.reader.setIndex(e);var t=e;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw Error(`Corrupted zip: can't find the ZIP64 end of central directory locator`);if(this.reader.setIndex(e),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw Error(`Corrupted zip: can't find the ZIP64 end of central directory`);this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var n=this.centralDirOffset+this.centralDirSize;this.zip64&&(n+=20,n+=12+this.zip64EndOfCentralSize);var r=t-n;if(0<r)this.isSignature(t,a.CENTRAL_FILE_HEADER)||(this.reader.zero=r);else if(r<0)throw Error(`Corrupted zip: missing `+Math.abs(r)+` bytes.`)},prepareReader:function(e){this.reader=r(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,n){var r=e(`./reader/readerFor`),i=e(`./utils`),a=e(`./compressedObject`),o=e(`./crc32`),s=e(`./utf8`),c=e(`./compressions`),l=e(`./support`);function u(e,t){this.options=e,this.loadOptions=t}u.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(e){var t,n;if(e.skip(22),this.fileNameLength=e.readInt(2),n=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(n),this.compressedSize===-1||this.uncompressedSize===-1)throw Error(`Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)`);if((t=function(e){for(var t in c)if(Object.prototype.hasOwnProperty.call(c,t)&&c[t].magic===e)return c[t];return null}(this.compressionMethod))===null)throw Error(`Corrupted zip : compression `+i.pretty(this.compressionMethod)+` unknown (inner file : `+i.transformTo(`string`,this.fileName)+`)`);this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw Error(`Encrypted zip are not supported`);e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),e==0&&(this.dosPermissions=63&this.externalFileAttributes),e==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!==`/`||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=r(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,n,r,i=e.index+this.extraFieldsLength;for(this.extraFields||={};e.index+4<i;)t=e.readInt(2),n=e.readInt(2),r=e.readData(n),this.extraFields[t]={id:t,length:n,value:r};e.setIndex(i)},handleUTF8:function(){var e=l.uint8array?`uint8array`:`array`;if(this.useUTF8())this.fileNameStr=s.utf8decode(this.fileName),this.fileCommentStr=s.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(t!==null)this.fileNameStr=t;else{var n=i.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(n)}var r=this.findExtraFieldUnicodeComment();if(r!==null)this.fileCommentStr=r;else{var a=i.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(a)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=r(e.value);return t.readInt(1)===1&&o(this.fileName)===t.readInt(4)?s.utf8decode(t.readData(e.length-5)):null}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=r(e.value);return t.readInt(1)===1&&o(this.fileComment)===t.readInt(4)?s.utf8decode(t.readData(e.length-5)):null}return null}},t.exports=u},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,n){function r(e,t,n){this.name=e,this.dir=n.dir,this.date=n.date,this.comment=n.comment,this.unixPermissions=n.unixPermissions,this.dosPermissions=n.dosPermissions,this._data=t,this._dataBinary=n.binary,this.options={compression:n.compression,compressionOptions:n.compressionOptions}}var i=e(`./stream/StreamHelper`),a=e(`./stream/DataWorker`),o=e(`./utf8`),s=e(`./compressedObject`),c=e(`./stream/GenericWorker`);r.prototype={internalStream:function(e){var t=null,n=`string`;try{if(!e)throw Error(`No output type specified.`);var r=(n=e.toLowerCase())===`string`||n===`text`;n!==`binarystring`&&n!==`text`||(n=`string`),t=this._decompressWorker();var a=!this._dataBinary;a&&!r&&(t=t.pipe(new o.Utf8EncodeWorker)),!a&&r&&(t=t.pipe(new o.Utf8DecodeWorker))}catch(e){(t=new c(`error`)).error(e)}return new i(t,n,``)},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||`nodebuffer`).toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof s&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var n=this._decompressWorker();return this._dataBinary||(n=n.pipe(new o.Utf8EncodeWorker)),s.createWorkerFrom(n,e,t)},_decompressWorker:function(){return this._data instanceof s?this._data.getContentWorker():this._data instanceof c?this._data:new a(this._data)}};for(var l=[`asText`,`asBinary`,`asNodeBuffer`,`asUint8Array`,`asArrayBuffer`],u=function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},d=0;d<l.length;d++)r.prototype[l[d]]=u;t.exports=r},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,t,n){(function(e){var n,r,i=e.MutationObserver||e.WebKitMutationObserver;if(i){var a=0,o=new i(u),s=e.document.createTextNode(``);o.observe(s,{characterData:!0}),n=function(){s.data=a=++a%2}}else if(e.setImmediate||e.MessageChannel===void 0)n=`document`in e&&`onreadystatechange`in e.document.createElement(`script`)?function(){var t=e.document.createElement(`script`);t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var c=new e.MessageChannel;c.port1.onmessage=u,n=function(){c.port2.postMessage(0)}}var l=[];function u(){var e,t;r=!0;for(var n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length}r=!1}t.exports=function(e){l.push(e)!==1||r||n()}}).call(this,typeof global<`u`?global:typeof self<`u`?self:typeof window<`u`?window:{})},{}],37:[function(e,t,n){var r=e(`immediate`);function i(){}var a={},o=[`REJECTED`],s=[`FULFILLED`],c=[`PENDING`];function l(e){if(typeof e!=`function`)throw TypeError(`resolver must be a function`);this.state=c,this.queue=[],this.outcome=void 0,e!==i&&p(this,e)}function u(e,t,n){this.promise=e,typeof t==`function`&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),typeof n==`function`&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function d(e,t,n){r(function(){var r;try{r=t(n)}catch(t){return a.reject(e,t)}r===e?a.reject(e,TypeError(`Cannot resolve promise with itself`)):a.resolve(e,r)})}function f(e){var t=e&&e.then;if(e&&(typeof e==`object`||typeof e==`function`)&&typeof t==`function`)return function(){t.apply(e,arguments)}}function p(e,t){var n=!1;function r(t){n||(n=!0,a.reject(e,t))}function i(t){n||(n=!0,a.resolve(e,t))}var o=m(function(){t(i,r)});o.status===`error`&&r(o.value)}function m(e,t){var n={};try{n.value=e(t),n.status=`success`}catch(e){n.status=`error`,n.value=e}return n}(t.exports=l).prototype.finally=function(e){if(typeof e!=`function`)return this;var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})},l.prototype.catch=function(e){return this.then(null,e)},l.prototype.then=function(e,t){if(typeof e!=`function`&&this.state===s||typeof t!=`function`&&this.state===o)return this;var n=new this.constructor(i);return this.state===c?this.queue.push(new u(n,e,t)):d(n,this.state===s?e:t,this.outcome),n},u.prototype.callFulfilled=function(e){a.resolve(this.promise,e)},u.prototype.otherCallFulfilled=function(e){d(this.promise,this.onFulfilled,e)},u.prototype.callRejected=function(e){a.reject(this.promise,e)},u.prototype.otherCallRejected=function(e){d(this.promise,this.onRejected,e)},a.resolve=function(e,t){var n=m(f,t);if(n.status===`error`)return a.reject(e,n.value);var r=n.value;if(r)p(e,r);else{e.state=s,e.outcome=t;for(var i=-1,o=e.queue.length;++i<o;)e.queue[i].callFulfilled(t)}return e},a.reject=function(e,t){e.state=o,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},l.resolve=function(e){return e instanceof this?e:a.resolve(new this(i),e)},l.reject=function(e){var t=new this(i);return a.reject(t,e)},l.all=function(e){var t=this;if(Object.prototype.toString.call(e)!==`[object Array]`)return this.reject(TypeError(`must be an array`));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var o=Array(n),s=0,c=-1,l=new this(i);++c<n;)u(e[c],c);return l;function u(e,i){t.resolve(e).then(function(e){o[i]=e,++s!==n||r||(r=!0,a.resolve(l,o))},function(e){r||(r=!0,a.reject(l,e))})}},l.race=function(e){var t=this;if(Object.prototype.toString.call(e)!==`[object Array]`)return this.reject(TypeError(`must be an array`));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var o=-1,s=new this(i);++o<n;)c=e[o],t.resolve(c).then(function(e){r||(r=!0,a.resolve(s,e))},function(e){r||(r=!0,a.reject(s,e))});var c;return s}},{immediate:36}],38:[function(e,t,n){var r={};(0,e(`./lib/utils/common`).assign)(r,e(`./lib/deflate`),e(`./lib/inflate`),e(`./lib/zlib/constants`)),t.exports=r},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,n){var r=e(`./zlib/deflate`),i=e(`./utils/common`),a=e(`./utils/strings`),o=e(`./zlib/messages`),s=e(`./zlib/zstream`),c=Object.prototype.toString,l=0,u=-1,d=0,f=8;function p(e){if(!(this instanceof p))return new p(e);this.options=i.assign({level:u,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:``},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg=``,this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var n=r.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(n!==l)throw Error(o[n]);if(t.header&&r.deflateSetHeader(this.strm,t.header),t.dictionary){var m;if(m=typeof t.dictionary==`string`?a.string2buf(t.dictionary):c.call(t.dictionary)===`[object ArrayBuffer]`?new Uint8Array(t.dictionary):t.dictionary,(n=r.deflateSetDictionary(this.strm,m))!==l)throw Error(o[n]);this._dict_set=!0}}function m(e,t){var n=new p(t);if(n.push(e,!0),n.err)throw n.msg||o[n.err];return n.result}p.prototype.push=function(e,t){var n,o,s=this.strm,u=this.options.chunkSize;if(this.ended)return!1;o=t===~~t?t:!0===t?4:0,typeof e==`string`?s.input=a.string2buf(e):c.call(e)===`[object ArrayBuffer]`?s.input=new Uint8Array(e):s.input=e,s.next_in=0,s.avail_in=s.input.length;do{if(s.avail_out===0&&(s.output=new i.Buf8(u),s.next_out=0,s.avail_out=u),(n=r.deflate(s,o))!==1&&n!==l)return this.onEnd(n),!(this.ended=!0);s.avail_out!==0&&(s.avail_in!==0||o!==4&&o!==2)||(this.options.to===`string`?this.onData(a.buf2binstring(i.shrinkBuf(s.output,s.next_out))):this.onData(i.shrinkBuf(s.output,s.next_out)))}while((0<s.avail_in||s.avail_out===0)&&n!==1);return o===4?(n=r.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===l):o!==2||(this.onEnd(l),!(s.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&(this.options.to===`string`?this.result=this.chunks.join(``):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Deflate=p,n.deflate=m,n.deflateRaw=function(e,t){return(t||={}).raw=!0,m(e,t)},n.gzip=function(e,t){return(t||={}).gzip=!0,m(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,n){var r=e(`./zlib/inflate`),i=e(`./utils/common`),a=e(`./utils/strings`),o=e(`./zlib/constants`),s=e(`./zlib/messages`),c=e(`./zlib/zstream`),l=e(`./zlib/gzheader`),u=Object.prototype.toString;function d(e){if(!(this instanceof d))return new d(e);this.options=i.assign({chunkSize:16384,windowBits:0,to:``},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,t.windowBits===0&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&!(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg=``,this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var n=r.inflateInit2(this.strm,t.windowBits);if(n!==o.Z_OK)throw Error(s[n]);this.header=new l,r.inflateGetHeader(this.strm,this.header)}function f(e,t){var n=new d(t);if(n.push(e,!0),n.err)throw n.msg||s[n.err];return n.result}d.prototype.push=function(e,t){var n,s,c,l,d,f,p=this.strm,m=this.options.chunkSize,h=this.options.dictionary,g=!1;if(this.ended)return!1;s=t===~~t?t:!0===t?o.Z_FINISH:o.Z_NO_FLUSH,typeof e==`string`?p.input=a.binstring2buf(e):u.call(e)===`[object ArrayBuffer]`?p.input=new Uint8Array(e):p.input=e,p.next_in=0,p.avail_in=p.input.length;do{if(p.avail_out===0&&(p.output=new i.Buf8(m),p.next_out=0,p.avail_out=m),(n=r.inflate(p,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&h&&(f=typeof h==`string`?a.string2buf(h):u.call(h)===`[object ArrayBuffer]`?new Uint8Array(h):h,n=r.inflateSetDictionary(this.strm,f)),n===o.Z_BUF_ERROR&&!0===g&&(n=o.Z_OK,g=!1),n!==o.Z_STREAM_END&&n!==o.Z_OK)return this.onEnd(n),!(this.ended=!0);p.next_out&&(p.avail_out!==0&&n!==o.Z_STREAM_END&&(p.avail_in!==0||s!==o.Z_FINISH&&s!==o.Z_SYNC_FLUSH)||(this.options.to===`string`?(c=a.utf8border(p.output,p.next_out),l=p.next_out-c,d=a.buf2string(p.output,c),p.next_out=l,p.avail_out=m-l,l&&i.arraySet(p.output,p.output,c,l,0),this.onData(d)):this.onData(i.shrinkBuf(p.output,p.next_out)))),p.avail_in===0&&p.avail_out===0&&(g=!0)}while((0<p.avail_in||p.avail_out===0)&&n!==o.Z_STREAM_END);return n===o.Z_STREAM_END&&(s=o.Z_FINISH),s===o.Z_FINISH?(n=r.inflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===o.Z_OK):s!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(p.avail_out=0))},d.prototype.onData=function(e){this.chunks.push(e)},d.prototype.onEnd=function(e){e===o.Z_OK&&(this.options.to===`string`?this.result=this.chunks.join(``):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Inflate=d,n.inflate=f,n.inflateRaw=function(e,t){return(t||={}).raw=!0,f(e,t)},n.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,n){var r=typeof Uint8Array<`u`&&typeof Uint16Array<`u`&&typeof Int32Array<`u`;n.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var n=t.shift();if(n){if(typeof n!=`object`)throw TypeError(n+`must be non-object`);for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}}return e},n.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,n,r,i){if(t.subarray&&e.subarray)e.set(t.subarray(n,n+r),i);else for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){var t,n,r,i,a,o;for(t=r=0,n=e.length;t<n;t++)r+=e[t].length;for(o=new Uint8Array(r),t=i=0,n=e.length;t<n;t++)a=e[t],o.set(a,i),i+=a.length;return o}},a={arraySet:function(e,t,n,r,i){for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){return[].concat.apply([],e)}};n.setTyped=function(e){e?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,i)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,a))},n.setTyped(r)},{}],42:[function(e,t,n){var r=e(`./common`),i=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var o=new r.Buf8(256),s=0;s<256;s++)o[s]=252<=s?6:248<=s?5:240<=s?4:224<=s?3:192<=s?2:1;function c(e,t){if(t<65537&&(e.subarray&&a||!e.subarray&&i))return String.fromCharCode.apply(null,r.shrinkBuf(e,t));for(var n=``,o=0;o<t;o++)n+=String.fromCharCode(e[o]);return n}o[254]=o[254]=1,n.string2buf=function(e){var t,n,i,a,o,s=e.length,c=0;for(a=0;a<s;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(i=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(i-56320),a++),c+=n<128?1:n<2048?2:n<65536?3:4;for(t=new r.Buf8(c),a=o=0;o<c;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(i=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(i-56320),a++),n<128?t[o++]=n:(n<2048?t[o++]=192|n>>>6:(n<65536?t[o++]=224|n>>>12:(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63),t[o++]=128|n>>>6&63),t[o++]=128|63&n);return t},n.buf2binstring=function(e){return c(e,e.length)},n.binstring2buf=function(e){for(var t=new r.Buf8(e.length),n=0,i=t.length;n<i;n++)t[n]=e.charCodeAt(n);return t},n.buf2string=function(e,t){var n,r,i,a,s=t||e.length,l=Array(2*s);for(n=r=0;n<s;)if((i=e[n++])<128)l[r++]=i;else if(4<(a=o[i]))l[r++]=65533,n+=a-1;else{for(i&=a===2?31:a===3?15:7;1<a&&n<s;)i=i<<6|63&e[n++],a--;1<a?l[r++]=65533:i<65536?l[r++]=i:(i-=65536,l[r++]=55296|i>>10&1023,l[r++]=56320|1023&i)}return c(l,r)},n.utf8border=function(e,t){var n;for((t||=e.length)>e.length&&(t=e.length),n=t-1;0<=n&&(192&e[n])==128;)n--;return n<0||n===0?t:n+o[e[n]]>t?n:t}},{"./common":41}],43:[function(e,t,n){t.exports=function(e,t,n,r){for(var i=65535&e|0,a=e>>>16&65535|0,o=0;n!==0;){for(n-=o=2e3<n?2e3:n;a=a+(i=i+t[r++]|0)|0,--o;);i%=65521,a%=65521}return i|a<<16|0}},{}],44:[function(e,t,n){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,n){var r=function(){for(var e,t=[],n=0;n<256;n++){e=n;for(var r=0;r<8;r++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}();t.exports=function(e,t,n,i){var a=r,o=i+n;e^=-1;for(var s=i;s<o;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}},{}],46:[function(e,t,n){var r,i=e(`../utils/common`),a=e(`./trees`),o=e(`./adler32`),s=e(`./crc32`),c=e(`./messages`),l=0,u=4,d=0,f=-2,p=-1,m=4,h=2,g=8,_=9,v=286,y=30,b=19,x=2*v+1,S=15,C=3,w=258,T=w+C+1,E=42,D=113,O=1,k=2,A=3,j=4;function M(e,t){return e.msg=c[t],t}function N(e){return(e<<1)-(4<e?9:0)}function P(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,n=t.pending;n>e.avail_out&&(n=e.avail_out),n!==0&&(i.arraySet(e.output,t.pending_buf,t.pending_out,n,e.next_out),e.next_out+=n,t.pending_out+=n,e.total_out+=n,e.avail_out-=n,t.pending-=n,t.pending===0&&(t.pending_out=0))}function I(e,t){a._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function L(e,t){e.pending_buf[e.pending++]=t}function R(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function z(e,t){var n,r,i=e.max_chain_length,a=e.strstart,o=e.prev_length,s=e.nice_match,c=e.strstart>e.w_size-T?e.strstart-(e.w_size-T):0,l=e.window,u=e.w_mask,d=e.prev,f=e.strstart+w,p=l[a+o-1],m=l[a+o];e.prev_length>=e.good_match&&(i>>=2),s>e.lookahead&&(s=e.lookahead);do if(l[(n=t)+o]===m&&l[n+o-1]===p&&l[n]===l[a]&&l[++n]===l[a+1]){a+=2,n++;do;while(l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&a<f);if(r=w-(f-a),a=f-w,o<r){if(e.match_start=t,s<=(o=r))break;p=l[a+o-1],m=l[a+o]}}while((t=d[t&u])>c&&--i!=0);return o<=e.lookahead?o:e.lookahead}function B(e){var t,n,r,a,c,l,u,d,f,p,m=e.w_size;do{if(a=e.window_size-e.lookahead-e.strstart,e.strstart>=m+(m-T)){for(i.arraySet(e.window,e.window,m,m,0),e.match_start-=m,e.strstart-=m,e.block_start-=m,t=n=e.hash_size;r=e.head[--t],e.head[t]=m<=r?r-m:0,--n;);for(t=n=m;r=e.prev[--t],e.prev[t]=m<=r?r-m:0,--n;);a+=m}if(e.strm.avail_in===0)break;if(l=e.strm,u=e.window,d=e.strstart+e.lookahead,f=a,p=void 0,p=l.avail_in,f<p&&(p=f),n=p===0?0:(l.avail_in-=p,i.arraySet(u,l.input,l.next_in,p,d),l.state.wrap===1?l.adler=o(l.adler,u,p,d):l.state.wrap===2&&(l.adler=s(l.adler,u,p,d)),l.next_in+=p,l.total_in+=p,p),e.lookahead+=n,e.lookahead+e.insert>=C)for(c=e.strstart-e.insert,e.ins_h=e.window[c],e.ins_h=(e.ins_h<<e.hash_shift^e.window[c+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[c+C-1])&e.hash_mask,e.prev[c&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=c,c++,e.insert--,!(e.lookahead+e.insert<C)););}while(e.lookahead<T&&e.strm.avail_in!==0)}function ee(e,t){for(var n,r;;){if(e.lookahead<T){if(B(e),e.lookahead<T&&t===l)return O;if(e.lookahead===0)break}if(n=0,e.lookahead>=C&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),n!==0&&e.strstart-n<=e.w_size-T&&(e.match_length=z(e,n)),e.match_length>=C)if(r=a._tr_tally(e,e.strstart-e.match_start,e.match_length-C),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=C){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,--e.match_length!=0;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else r=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(r&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=e.strstart<C-1?e.strstart:C-1,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}function te(e,t){for(var n,r,i;;){if(e.lookahead<T){if(B(e),e.lookahead<T&&t===l)return O;if(e.lookahead===0)break}if(n=0,e.lookahead>=C&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=C-1,n!==0&&e.prev_length<e.max_lazy_match&&e.strstart-n<=e.w_size-T&&(e.match_length=z(e,n),e.match_length<=5&&(e.strategy===1||e.match_length===C&&4096<e.strstart-e.match_start)&&(e.match_length=C-1)),e.prev_length>=C&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-C,r=a._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-C),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),--e.prev_length!=0;);if(e.match_available=0,e.match_length=C-1,e.strstart++,r&&(I(e,!1),e.strm.avail_out===0))return O}else if(e.match_available){if((r=a._tr_tally(e,0,e.window[e.strstart-1]))&&I(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return O}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&=(r=a._tr_tally(e,0,e.window[e.strstart-1]),0),e.insert=e.strstart<C-1?e.strstart:C-1,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}function V(e,t,n,r,i){this.good_length=e,this.max_lazy=t,this.nice_length=n,this.max_chain=r,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=g,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*x),this.dyn_dtree=new i.Buf16(2*(2*y+1)),this.bl_tree=new i.Buf16(2*(2*b+1)),P(this.dyn_ltree),P(this.dyn_dtree),P(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(S+1),this.heap=new i.Buf16(2*v+1),P(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*v+1),P(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function U(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=h,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?E:D,e.adler=t.wrap===2?0:1,t.last_flush=l,a._tr_init(t),d):M(e,f)}function W(e){var t=U(e);return t===d&&function(e){e.window_size=2*e.w_size,P(e.head),e.max_lazy_match=r[e.level].max_lazy,e.good_match=r[e.level].good_length,e.nice_match=r[e.level].nice_length,e.max_chain_length=r[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=C-1,e.match_available=0,e.ins_h=0}(e.state),t}function ne(e,t,n,r,a,o){if(!e)return f;var s=1;if(t===p&&(t=6),r<0?(s=0,r=-r):15<r&&(s=2,r-=16),a<1||_<a||n!==g||r<8||15<r||t<0||9<t||o<0||m<o)return M(e,f);r===8&&(r=9);var c=new H;return(e.state=c).strm=e,c.wrap=s,c.gzhead=null,c.w_bits=r,c.w_size=1<<c.w_bits,c.w_mask=c.w_size-1,c.hash_bits=a+7,c.hash_size=1<<c.hash_bits,c.hash_mask=c.hash_size-1,c.hash_shift=~~((c.hash_bits+C-1)/C),c.window=new i.Buf8(2*c.w_size),c.head=new i.Buf16(c.hash_size),c.prev=new i.Buf16(c.w_size),c.lit_bufsize=1<<a+6,c.pending_buf_size=4*c.lit_bufsize,c.pending_buf=new i.Buf8(c.pending_buf_size),c.d_buf=1*c.lit_bufsize,c.l_buf=3*c.lit_bufsize,c.level=t,c.strategy=o,c.method=n,W(e)}r=[new V(0,0,0,0,function(e,t){var n=65535;for(n>e.pending_buf_size-5&&(n=e.pending_buf_size-5);;){if(e.lookahead<=1){if(B(e),e.lookahead===0&&t===l)return O;if(e.lookahead===0)break}e.strstart+=e.lookahead,e.lookahead=0;var r=e.block_start+n;if((e.strstart===0||e.strstart>=r)&&(e.lookahead=e.strstart-r,e.strstart=r,I(e,!1),e.strm.avail_out===0)||e.strstart-e.block_start>=e.w_size-T&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(I(e,!0),e.strm.avail_out===0?A:j):(e.strstart>e.block_start&&(I(e,!1),e.strm.avail_out),O)}),new V(4,4,8,4,ee),new V(4,5,16,8,ee),new V(4,6,32,32,ee),new V(4,4,16,16,te),new V(8,16,32,32,te),new V(8,16,128,128,te),new V(8,32,128,256,te),new V(32,128,258,1024,te),new V(32,258,258,4096,te)],n.deflateInit=function(e,t){return ne(e,t,g,15,8,0)},n.deflateInit2=ne,n.deflateReset=W,n.deflateResetKeep=U,n.deflateSetHeader=function(e,t){return e&&e.state&&e.state.wrap===2?(e.state.gzhead=t,d):f},n.deflate=function(e,t){var n,i,o,c;if(!e||!e.state||5<t||t<0)return e?M(e,f):f;if(i=e.state,!e.output||!e.input&&e.avail_in!==0||i.status===666&&t!==u)return M(e,e.avail_out===0?-5:f);if(i.strm=e,n=i.last_flush,i.last_flush=t,i.status===E)if(i.wrap===2)e.adler=0,L(i,31),L(i,139),L(i,8),i.gzhead?(L(i,+!!i.gzhead.text+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),L(i,255&i.gzhead.time),L(i,i.gzhead.time>>8&255),L(i,i.gzhead.time>>16&255),L(i,i.gzhead.time>>24&255),L(i,i.level===9?2:2<=i.strategy||i.level<2?4:0),L(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(L(i,255&i.gzhead.extra.length),L(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(e.adler=s(e.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(L(i,0),L(i,0),L(i,0),L(i,0),L(i,0),L(i,i.level===9?2:2<=i.strategy||i.level<2?4:0),L(i,3),i.status=D);else{var p=g+(i.w_bits-8<<4)<<8;p|=(2<=i.strategy||i.level<2?0:i.level<6?1:i.level===6?2:3)<<6,i.strstart!==0&&(p|=32),p+=31-p%31,i.status=D,R(i,p),i.strstart!==0&&(R(i,e.adler>>>16),R(i,65535&e.adler)),e.adler=1}if(i.status===69)if(i.gzhead.extra){for(o=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),F(e),o=i.pending,i.pending!==i.pending_buf_size));)L(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(i.status===73)if(i.gzhead.name){o=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),F(e),o=i.pending,i.pending===i.pending_buf_size)){c=1;break}c=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,L(i,c)}while(c!==0);i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),c===0&&(i.gzindex=0,i.status=91)}else i.status=91;if(i.status===91)if(i.gzhead.comment){o=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),F(e),o=i.pending,i.pending===i.pending_buf_size)){c=1;break}c=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,L(i,c)}while(c!==0);i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),c===0&&(i.status=103)}else i.status=103;if(i.status===103&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(e),i.pending+2<=i.pending_buf_size&&(L(i,255&e.adler),L(i,e.adler>>8&255),e.adler=0,i.status=D)):i.status=D),i.pending!==0){if(F(e),e.avail_out===0)return i.last_flush=-1,d}else if(e.avail_in===0&&N(t)<=N(n)&&t!==u)return M(e,-5);if(i.status===666&&e.avail_in!==0)return M(e,-5);if(e.avail_in!==0||i.lookahead!==0||t!==l&&i.status!==666){var m=i.strategy===2?function(e,t){for(var n;;){if(e.lookahead===0&&(B(e),e.lookahead===0)){if(t===l)return O;break}if(e.match_length=0,n=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,n&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}(i,t):i.strategy===3?function(e,t){for(var n,r,i,o,s=e.window;;){if(e.lookahead<=w){if(B(e),e.lookahead<=w&&t===l)return O;if(e.lookahead===0)break}if(e.match_length=0,e.lookahead>=C&&0<e.strstart&&(r=s[i=e.strstart-1])===s[++i]&&r===s[++i]&&r===s[++i]){o=e.strstart+w;do;while(r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&i<o);e.match_length=w-(o-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=C?(n=a._tr_tally(e,1,e.match_length-C),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(n=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),n&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}(i,t):r[i.level].func(i,t);if(m!==A&&m!==j||(i.status=666),m===O||m===A)return e.avail_out===0&&(i.last_flush=-1),d;if(m===k&&(t===1?a._tr_align(i):t!==5&&(a._tr_stored_block(i,0,0,!1),t===3&&(P(i.head),i.lookahead===0&&(i.strstart=0,i.block_start=0,i.insert=0))),F(e),e.avail_out===0))return i.last_flush=-1,d}return t===u?i.wrap<=0?1:(i.wrap===2?(L(i,255&e.adler),L(i,e.adler>>8&255),L(i,e.adler>>16&255),L(i,e.adler>>24&255),L(i,255&e.total_in),L(i,e.total_in>>8&255),L(i,e.total_in>>16&255),L(i,e.total_in>>24&255)):(R(i,e.adler>>>16),R(i,65535&e.adler)),F(e),0<i.wrap&&(i.wrap=-i.wrap),i.pending===0?1:d):d},n.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==E&&t!==69&&t!==73&&t!==91&&t!==103&&t!==D&&t!==666?M(e,f):(e.state=null,t===D?M(e,-3):d):f},n.deflateSetDictionary=function(e,t){var n,r,a,s,c,l,u,p,m=t.length;if(!e||!e.state||(s=(n=e.state).wrap)===2||s===1&&n.status!==E||n.lookahead)return f;for(s===1&&(e.adler=o(e.adler,t,m,0)),n.wrap=0,m>=n.w_size&&(s===0&&(P(n.head),n.strstart=0,n.block_start=0,n.insert=0),p=new i.Buf8(n.w_size),i.arraySet(p,t,m-n.w_size,n.w_size,0),t=p,m=n.w_size),c=e.avail_in,l=e.next_in,u=e.input,e.avail_in=m,e.next_in=0,e.input=t,B(n);n.lookahead>=C;){for(r=n.strstart,a=n.lookahead-(C-1);n.ins_h=(n.ins_h<<n.hash_shift^n.window[r+C-1])&n.hash_mask,n.prev[r&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=r,r++,--a;);n.strstart=r,n.lookahead=C-1,B(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=C-1,n.match_available=0,e.next_in=l,e.input=u,e.avail_in=c,n.wrap=s,d},n.deflateInfo=`pako deflate (from Nodeca project)`},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,n){t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name=``,this.comment=``,this.hcrc=0,this.done=!1}},{}],48:[function(e,t,n){t.exports=function(e,t){var n=e.state,r=e.next_in,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=e.input,E;i=r+(e.avail_in-5),a=e.next_out,E=e.output,o=a-(t-e.avail_out),s=a+(e.avail_out-257),c=n.dmax,l=n.wsize,u=n.whave,d=n.wnext,f=n.window,p=n.hold,m=n.bits,h=n.lencode,g=n.distcode,_=(1<<n.lenbits)-1,v=(1<<n.distbits)-1;e:do{m<15&&(p+=T[r++]<<m,m+=8,p+=T[r++]<<m,m+=8),y=h[p&_];t:for(;;){if(p>>>=b=y>>>24,m-=b,(b=y>>>16&255)==0)E[a++]=65535&y;else{if(!(16&b)){if(!(64&b)){y=h[(65535&y)+(p&(1<<b)-1)];continue t}if(32&b){n.mode=12;break e}e.msg=`invalid literal/length code`,n.mode=30;break e}x=65535&y,(b&=15)&&(m<b&&(p+=T[r++]<<m,m+=8),x+=p&(1<<b)-1,p>>>=b,m-=b),m<15&&(p+=T[r++]<<m,m+=8,p+=T[r++]<<m,m+=8),y=g[p&v];r:for(;;){if(p>>>=b=y>>>24,m-=b,!(16&(b=y>>>16&255))){if(!(64&b)){y=g[(65535&y)+(p&(1<<b)-1)];continue r}e.msg=`invalid distance code`,n.mode=30;break e}if(S=65535&y,m<(b&=15)&&(p+=T[r++]<<m,(m+=8)<b&&(p+=T[r++]<<m,m+=8)),c<(S+=p&(1<<b)-1)){e.msg=`invalid distance too far back`,n.mode=30;break e}if(p>>>=b,m-=b,(b=a-o)<S){if(u<(b=S-b)&&n.sane){e.msg=`invalid distance too far back`,n.mode=30;break e}if(w=f,(C=0)===d){if(C+=l-b,b<x){for(x-=b;E[a++]=f[C++],--b;);C=a-S,w=E}}else if(d<b){if(C+=l+d-b,(b-=d)<x){for(x-=b;E[a++]=f[C++],--b;);if(C=0,d<x){for(x-=b=d;E[a++]=f[C++],--b;);C=a-S,w=E}}}else if(C+=d-b,b<x){for(x-=b;E[a++]=f[C++],--b;);C=a-S,w=E}for(;2<x;)E[a++]=w[C++],E[a++]=w[C++],E[a++]=w[C++],x-=3;x&&(E[a++]=w[C++],1<x&&(E[a++]=w[C++]))}else{for(C=a-S;E[a++]=E[C++],E[a++]=E[C++],E[a++]=E[C++],2<(x-=3););x&&(E[a++]=E[C++],1<x&&(E[a++]=E[C++]))}break}}break}}while(r<i&&a<s);r-=x=m>>3,p&=(1<<(m-=x<<3))-1,e.next_in=r,e.next_out=a,e.avail_in=r<i?i-r+5:5-(r-i),e.avail_out=a<s?s-a+257:257-(a-s),n.hold=p,n.bits=m}},{}],49:[function(e,t,n){var r=e(`../utils/common`),i=e(`./adler32`),a=e(`./crc32`),o=e(`./inffast`),s=e(`./inftrees`),c=1,l=2,u=0,d=-2,f=1,p=852,m=592;function h(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function g(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new r.Buf16(320),this.work=new r.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function _(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg=``,t.wrap&&(e.adler=1&t.wrap),t.mode=f,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new r.Buf32(p),t.distcode=t.distdyn=new r.Buf32(m),t.sane=1,t.back=-1,u):d}function v(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,_(e)):d}function y(e,t){var n,r;return e&&e.state?(r=e.state,t<0?(n=0,t=-t):(n=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?d:(r.window!==null&&r.wbits!==t&&(r.window=null),r.wrap=n,r.wbits=t,v(e))):d}function b(e,t){var n,r;return e?(r=new g,(e.state=r).window=null,(n=y(e,t))!==u&&(e.state=null),n):d}var x,S,C=!0;function w(e){if(C){var t;for(x=new r.Buf32(512),S=new r.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(s(c,e.lens,0,288,x,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;s(l,e.lens,0,32,S,0,e.work,{bits:5}),C=!1}e.lencode=x,e.lenbits=9,e.distcode=S,e.distbits=5}function T(e,t,n,i){var a,o=e.state;return o.window===null&&(o.wsize=1<<o.wbits,o.wnext=0,o.whave=0,o.window=new r.Buf8(o.wsize)),i>=o.wsize?(r.arraySet(o.window,t,n-o.wsize,o.wsize,0),o.wnext=0,o.whave=o.wsize):(i<(a=o.wsize-o.wnext)&&(a=i),r.arraySet(o.window,t,n-i,a,o.wnext),(i-=a)?(r.arraySet(o.window,t,n-i,i,0),o.wnext=i,o.whave=o.wsize):(o.wnext+=a,o.wnext===o.wsize&&(o.wnext=0),o.whave<o.wsize&&(o.whave+=a))),0}n.inflateReset=v,n.inflateReset2=y,n.inflateResetKeep=_,n.inflateInit=function(e){return b(e,15)},n.inflateInit2=b,n.inflate=function(e,t){var n,p,m,g,_,v,y,b,x,S,C,E,D,O,k,A,j,M,N,P,F,I,L,R,z=0,B=new r.Buf8(4),ee=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&e.avail_in!==0)return d;(n=e.state).mode===12&&(n.mode=13),_=e.next_out,m=e.output,y=e.avail_out,g=e.next_in,p=e.input,v=e.avail_in,b=n.hold,x=n.bits,S=v,C=y,I=u;e:for(;;)switch(n.mode){case f:if(n.wrap===0){n.mode=13;break}for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(2&n.wrap&&b===35615){B[n.check=0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0),x=b=0,n.mode=2;break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&b)<<8)+(b>>8))%31){e.msg=`incorrect header check`,n.mode=30;break}if((15&b)!=8){e.msg=`unknown compression method`,n.mode=30;break}if(x-=4,F=8+(15&(b>>>=4)),n.wbits===0)n.wbits=F;else if(F>n.wbits){e.msg=`invalid window size`,n.mode=30;break}n.dmax=1<<F,e.adler=n.check=1,n.mode=512&b?10:12,x=b=0;break;case 2:for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(n.flags=b,(255&n.flags)!=8){e.msg=`unknown compression method`,n.mode=30;break}if(57344&n.flags){e.msg=`unknown header flags set`,n.mode=30;break}n.head&&(n.head.text=b>>8&1),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0)),x=b=0,n.mode=3;case 3:for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.head&&(n.head.time=b),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,B[2]=b>>>16&255,B[3]=b>>>24&255,n.check=a(n.check,B,4,0)),x=b=0,n.mode=4;case 4:for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.head&&(n.head.xflags=255&b,n.head.os=b>>8),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0)),x=b=0,n.mode=5;case 5:if(1024&n.flags){for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.length=b,n.head&&(n.head.extra_len=b),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0)),x=b=0}else n.head&&(n.head.extra=null);n.mode=6;case 6:if(1024&n.flags&&(v<(E=n.length)&&(E=v),E&&(n.head&&(F=n.head.extra_len-n.length,n.head.extra||(n.head.extra=Array(n.head.extra_len)),r.arraySet(n.head.extra,p,g,E,F)),512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,n.length-=E),n.length))break e;n.length=0,n.mode=7;case 7:if(2048&n.flags){if(v===0)break e;for(E=0;F=p[g+ E++],n.head&&F&&n.length<65536&&(n.head.name+=String.fromCharCode(F)),F&&E<v;);if(512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,F)break e}else n.head&&(n.head.name=null);n.length=0,n.mode=8;case 8:if(4096&n.flags){if(v===0)break e;for(E=0;F=p[g+ E++],n.head&&F&&n.length<65536&&(n.head.comment+=String.fromCharCode(F)),F&&E<v;);if(512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,F)break e}else n.head&&(n.head.comment=null);n.mode=9;case 9:if(512&n.flags){for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b!==(65535&n.check)){e.msg=`header crc mismatch`,n.mode=30;break}x=b=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),e.adler=n.check=0,n.mode=12;break;case 10:for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}e.adler=n.check=h(b),x=b=0,n.mode=11;case 11:if(n.havedict===0)return e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,2;e.adler=n.check=1,n.mode=12;case 12:if(t===5||t===6)break e;case 13:if(n.last){b>>>=7&x,x-=7&x,n.mode=27;break}for(;x<3;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}switch(n.last=1&b,--x,3&(b>>>=1)){case 0:n.mode=14;break;case 1:if(w(n),n.mode=20,t!==6)break;b>>>=2,x-=2;break e;case 2:n.mode=17;break;case 3:e.msg=`invalid block type`,n.mode=30}b>>>=2,x-=2;break;case 14:for(b>>>=7&x,x-=7&x;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if((65535&b)!=(b>>>16^65535)){e.msg=`invalid stored block lengths`,n.mode=30;break}if(n.length=65535&b,x=b=0,n.mode=15,t===6)break e;case 15:n.mode=16;case 16:if(E=n.length){if(v<E&&(E=v),y<E&&(E=y),E===0)break e;r.arraySet(m,p,g,E,_),v-=E,g+=E,y-=E,_+=E,n.length-=E;break}n.mode=12;break;case 17:for(;x<14;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(n.nlen=257+(31&b),b>>>=5,x-=5,n.ndist=1+(31&b),b>>>=5,x-=5,n.ncode=4+(15&b),b>>>=4,x-=4,286<n.nlen||30<n.ndist){e.msg=`too many length or distance symbols`,n.mode=30;break}n.have=0,n.mode=18;case 18:for(;n.have<n.ncode;){for(;x<3;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.lens[ee[n.have++]]=7&b,b>>>=3,x-=3}for(;n.have<19;)n.lens[ee[n.have++]]=0;if(n.lencode=n.lendyn,n.lenbits=7,L={bits:n.lenbits},I=s(0,n.lens,0,19,n.lencode,0,n.work,L),n.lenbits=L.bits,I){e.msg=`invalid code lengths set`,n.mode=30;break}n.have=0,n.mode=19;case 19:for(;n.have<n.nlen+n.ndist;){for(;A=(z=n.lencode[b&(1<<n.lenbits)-1])>>>16&255,j=65535&z,!((k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(j<16)b>>>=k,x-=k,n.lens[n.have++]=j;else{if(j===16){for(R=k+2;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b>>>=k,x-=k,n.have===0){e.msg=`invalid bit length repeat`,n.mode=30;break}F=n.lens[n.have-1],E=3+(3&b),b>>>=2,x-=2}else if(j===17){for(R=k+3;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}x-=k,F=0,E=3+(7&(b>>>=k)),b>>>=3,x-=3}else{for(R=k+7;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}x-=k,F=0,E=11+(127&(b>>>=k)),b>>>=7,x-=7}if(n.have+E>n.nlen+n.ndist){e.msg=`invalid bit length repeat`,n.mode=30;break}for(;E--;)n.lens[n.have++]=F}}if(n.mode===30)break;if(n.lens[256]===0){e.msg=`invalid code -- missing end-of-block`,n.mode=30;break}if(n.lenbits=9,L={bits:n.lenbits},I=s(c,n.lens,0,n.nlen,n.lencode,0,n.work,L),n.lenbits=L.bits,I){e.msg=`invalid literal/lengths set`,n.mode=30;break}if(n.distbits=6,n.distcode=n.distdyn,L={bits:n.distbits},I=s(l,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,L),n.distbits=L.bits,I){e.msg=`invalid distances set`,n.mode=30;break}if(n.mode=20,t===6)break e;case 20:n.mode=21;case 21:if(6<=v&&258<=y){e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,o(e,C),_=e.next_out,m=e.output,y=e.avail_out,g=e.next_in,p=e.input,v=e.avail_in,b=n.hold,x=n.bits,n.mode===12&&(n.back=-1);break}for(n.back=0;A=(z=n.lencode[b&(1<<n.lenbits)-1])>>>16&255,j=65535&z,!((k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(A&&!(240&A)){for(M=k,N=A,P=j;A=(z=n.lencode[P+((b&(1<<M+N)-1)>>M)])>>>16&255,j=65535&z,!(M+(k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}b>>>=M,x-=M,n.back+=M}if(b>>>=k,x-=k,n.back+=k,n.length=j,A===0){n.mode=26;break}if(32&A){n.back=-1,n.mode=12;break}if(64&A){e.msg=`invalid literal/length code`,n.mode=30;break}n.extra=15&A,n.mode=22;case 22:if(n.extra){for(R=n.extra;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.length+=b&(1<<n.extra)-1,b>>>=n.extra,x-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=23;case 23:for(;A=(z=n.distcode[b&(1<<n.distbits)-1])>>>16&255,j=65535&z,!((k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(!(240&A)){for(M=k,N=A,P=j;A=(z=n.distcode[P+((b&(1<<M+N)-1)>>M)])>>>16&255,j=65535&z,!(M+(k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}b>>>=M,x-=M,n.back+=M}if(b>>>=k,x-=k,n.back+=k,64&A){e.msg=`invalid distance code`,n.mode=30;break}n.offset=j,n.extra=15&A,n.mode=24;case 24:if(n.extra){for(R=n.extra;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.offset+=b&(1<<n.extra)-1,b>>>=n.extra,x-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){e.msg=`invalid distance too far back`,n.mode=30;break}n.mode=25;case 25:if(y===0)break e;if(E=C-y,n.offset>E){if((E=n.offset-E)>n.whave&&n.sane){e.msg=`invalid distance too far back`,n.mode=30;break}D=E>n.wnext?(E-=n.wnext,n.wsize-E):n.wnext-E,E>n.length&&(E=n.length),O=n.window}else O=m,D=_-n.offset,E=n.length;for(y<E&&(E=y),y-=E,n.length-=E;m[_++]=O[D++],--E;);n.length===0&&(n.mode=21);break;case 26:if(y===0)break e;m[_++]=n.length,y--,n.mode=21;break;case 27:if(n.wrap){for(;x<32;){if(v===0)break e;v--,b|=p[g++]<<x,x+=8}if(C-=y,e.total_out+=C,n.total+=C,C&&(e.adler=n.check=n.flags?a(n.check,m,C,_-C):i(n.check,m,C,_-C)),C=y,(n.flags?b:h(b))!==n.check){e.msg=`incorrect data check`,n.mode=30;break}x=b=0}n.mode=28;case 28:if(n.wrap&&n.flags){for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b!==(4294967295&n.total)){e.msg=`incorrect length check`,n.mode=30;break}x=b=0}n.mode=29;case 29:I=1;break e;case 30:I=-3;break e;case 31:return-4;case 32:default:return d}return e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,(n.wsize||C!==e.avail_out&&n.mode<30&&(n.mode<27||t!==4))&&T(e,e.output,e.next_out,C-e.avail_out)?(n.mode=31,-4):(S-=e.avail_in,C-=e.avail_out,e.total_in+=S,e.total_out+=C,n.total+=C,n.wrap&&C&&(e.adler=n.check=n.flags?a(n.check,m,C,e.next_out-C):i(n.check,m,C,e.next_out-C)),e.data_type=n.bits+(n.last?64:0)+(n.mode===12?128:0)+(n.mode===20||n.mode===15?256:0),(S==0&&C===0||t===4)&&I===u&&(I=-5),I)},n.inflateEnd=function(e){if(!e||!e.state)return d;var t=e.state;return t.window&&=null,e.state=null,u},n.inflateGetHeader=function(e,t){var n;return e&&e.state&&2&(n=e.state).wrap?((n.head=t).done=!1,u):d},n.inflateSetDictionary=function(e,t){var n,r=t.length;return e&&e.state?(n=e.state).wrap!==0&&n.mode!==11?d:n.mode===11&&i(1,t,r,0)!==n.check?-3:T(e,t,r,r)?(n.mode=31,-4):(n.havedict=1,u):d},n.inflateInfo=`pako inflate (from Nodeca project)`},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,n){var r=e(`../utils/common`),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],s=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,n,c,l,u,d,f){var p,m,h,g,_,v,y,b,x,S=f.bits,C=0,w=0,T=0,E=0,D=0,O=0,k=0,A=0,j=0,M=0,N=null,P=0,F=new r.Buf16(16),I=new r.Buf16(16),L=null,R=0;for(C=0;C<=15;C++)F[C]=0;for(w=0;w<c;w++)F[t[n+w]]++;for(D=S,E=15;1<=E&&F[E]===0;E--);if(E<D&&(D=E),E===0)return l[u++]=20971520,l[u++]=20971520,f.bits=1,0;for(T=1;T<E&&F[T]===0;T++);for(D<T&&(D=T),C=A=1;C<=15;C++)if(A<<=1,(A-=F[C])<0)return-1;if(0<A&&(e===0||E!==1))return-1;for(I[1]=0,C=1;C<15;C++)I[C+1]=I[C]+F[C];for(w=0;w<c;w++)t[n+w]!==0&&(d[I[t[n+w]]++]=w);if(v=e===0?(N=L=d,19):e===1?(N=i,P-=257,L=a,R-=257,256):(N=o,L=s,-1),C=T,_=u,k=w=M=0,h=-1,g=(j=1<<(O=D))-1,e===1&&852<j||e===2&&592<j)return 1;for(;;){for(y=C-k,x=d[w]<v?(b=0,d[w]):d[w]>v?(b=L[R+d[w]],N[P+d[w]]):(b=96,0),p=1<<C-k,T=m=1<<O;l[_+(M>>k)+(m-=p)]=y<<24|b<<16|x|0,m!==0;);for(p=1<<C-1;M&p;)p>>=1;if(p===0?M=0:(M&=p-1,M+=p),w++,--F[C]==0){if(C===E)break;C=t[n+d[w]]}if(D<C&&(M&g)!==h){for(k===0&&(k=D),_+=T,A=1<<(O=C-k);O+k<E&&!((A-=F[O+k])<=0);)O++,A<<=1;if(j+=1<<O,e===1&&852<j||e===2&&592<j)return 1;l[h=M&g]=D<<24|O<<16|_-u|0}}return M!==0&&(l[_+M]=C-k<<24|4194304),f.bits=D,0}},{"../utils/common":41}],51:[function(e,t,n){t.exports={2:`need dictionary`,1:`stream end`,0:``,"-1":`file error`,"-2":`stream error`,"-3":`data error`,"-4":`insufficient memory`,"-5":`buffer error`,"-6":`incompatible version`}},{}],52:[function(e,t,n){var r=e(`../utils/common`),i=0,a=1;function o(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,c=29,l=256,u=l+1+c,d=30,f=19,p=2*u+1,m=15,h=16,g=7,_=256,v=16,y=17,b=18,x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],S=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],C=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],w=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],T=Array(2*(u+2));o(T);var E=Array(2*d);o(E);var D=Array(512);o(D);var O=Array(256);o(O);var k=Array(c);o(k);var A,j,M,N=Array(d);function P(e,t,n,r,i){this.static_tree=e,this.extra_bits=t,this.extra_base=n,this.elems=r,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function I(e){return e<256?D[e]:D[256+(e>>>7)]}function L(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function R(e,t,n){e.bi_valid>h-n?(e.bi_buf|=t<<e.bi_valid&65535,L(e,e.bi_buf),e.bi_buf=t>>h-e.bi_valid,e.bi_valid+=n-h):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=n)}function z(e,t,n){R(e,n[2*t],n[2*t+1])}function B(e,t){for(var n=0;n|=1&e,e>>>=1,n<<=1,0<--t;);return n>>>1}function ee(e,t,n){var r,i,a=Array(m+1),o=0;for(r=1;r<=m;r++)a[r]=o=o+n[r-1]<<1;for(i=0;i<=t;i++){var s=e[2*i+1];s!==0&&(e[2*i]=B(a[s]++,s))}}function te(e){var t;for(t=0;t<u;t++)e.dyn_ltree[2*t]=0;for(t=0;t<d;t++)e.dyn_dtree[2*t]=0;for(t=0;t<f;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*_]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function V(e){8<e.bi_valid?L(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,n,r){var i=2*t,a=2*n;return e[i]<e[a]||e[i]===e[a]&&r[t]<=r[n]}function U(e,t,n){for(var r=e.heap[n],i=n<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,r,e.heap[i],e.depth));)e.heap[n]=e.heap[i],n=i,i<<=1;e.heap[n]=r}function W(e,t,n){var r,i,a,o,s=0;if(e.last_lit!==0)for(;r=e.pending_buf[e.d_buf+2*s]<<8|e.pending_buf[e.d_buf+2*s+1],i=e.pending_buf[e.l_buf+s],s++,r===0?z(e,i,t):(z(e,(a=O[i])+l+1,t),(o=x[a])!==0&&R(e,i-=k[a],o),z(e,a=I(--r),n),(o=S[a])!==0&&R(e,r-=N[a],o)),s<e.last_lit;);z(e,_,t)}function ne(e,t){var n,r,i,a=t.dyn_tree,o=t.stat_desc.static_tree,s=t.stat_desc.has_stree,c=t.stat_desc.elems,l=-1;for(e.heap_len=0,e.heap_max=p,n=0;n<c;n++)a[2*n]===0?a[2*n+1]=0:(e.heap[++e.heap_len]=l=n,e.depth[n]=0);for(;e.heap_len<2;)a[2*(i=e.heap[++e.heap_len]=l<2?++l:0)]=1,e.depth[i]=0,e.opt_len--,s&&(e.static_len-=o[2*i+1]);for(t.max_code=l,n=e.heap_len>>1;1<=n;n--)U(e,a,n);for(i=c;n=e.heap[1],e.heap[1]=e.heap[e.heap_len--],U(e,a,1),r=e.heap[1],e.heap[--e.heap_max]=n,e.heap[--e.heap_max]=r,a[2*i]=a[2*n]+a[2*r],e.depth[i]=(e.depth[n]>=e.depth[r]?e.depth[n]:e.depth[r])+1,a[2*n+1]=a[2*r+1]=i,e.heap[1]=i++,U(e,a,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var n,r,i,a,o,s,c=t.dyn_tree,l=t.max_code,u=t.stat_desc.static_tree,d=t.stat_desc.has_stree,f=t.stat_desc.extra_bits,h=t.stat_desc.extra_base,g=t.stat_desc.max_length,_=0;for(a=0;a<=m;a++)e.bl_count[a]=0;for(c[2*e.heap[e.heap_max]+1]=0,n=e.heap_max+1;n<p;n++)g<(a=c[2*c[2*(r=e.heap[n])+1]+1]+1)&&(a=g,_++),c[2*r+1]=a,l<r||(e.bl_count[a]++,o=0,h<=r&&(o=f[r-h]),s=c[2*r],e.opt_len+=s*(a+o),d&&(e.static_len+=s*(u[2*r+1]+o)));if(_!==0){do{for(a=g-1;e.bl_count[a]===0;)a--;e.bl_count[a]--,e.bl_count[a+1]+=2,e.bl_count[g]--,_-=2}while(0<_);for(a=g;a!==0;a--)for(r=e.bl_count[a];r!==0;)l<(i=e.heap[--n])||(c[2*i+1]!==a&&(e.opt_len+=(a-c[2*i+1])*c[2*i],c[2*i+1]=a),r--)}}(e,t),ee(a,l,e.bl_count)}function re(e,t,n){var r,i,a=-1,o=t[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),t[2*(n+1)+1]=65535,r=0;r<=n;r++)i=o,o=t[2*(r+1)+1],++s<c&&i===o||(s<l?e.bl_tree[2*i]+=s:i===0?s<=10?e.bl_tree[2*y]++:e.bl_tree[2*b]++:(i!==a&&e.bl_tree[2*i]++,e.bl_tree[2*v]++),a=i,l=(s=0)===o?(c=138,3):i===o?(c=6,3):(c=7,4))}function ie(e,t,n){var r,i,a=-1,o=t[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),r=0;r<=n;r++)if(i=o,o=t[2*(r+1)+1],!(++s<c&&i===o)){if(s<l)for(;z(e,i,e.bl_tree),--s!=0;);else i===0?s<=10?(z(e,y,e.bl_tree),R(e,s-3,3)):(z(e,b,e.bl_tree),R(e,s-11,7)):(i!==a&&(z(e,i,e.bl_tree),s--),z(e,v,e.bl_tree),R(e,s-3,2));a=i,l=(s=0)===o?(c=138,3):i===o?(c=6,3):(c=7,4)}}o(N);var ae=!1;function oe(e,t,n,i){R(e,(s<<1)+ +!!i,3),function(e,t,n,i){V(e),i&&(L(e,n),L(e,~n)),r.arraySet(e.pending_buf,e.window,t,n,e.pending),e.pending+=n}(e,t,n,!0)}n._tr_init=function(e){ae||=(function(){var e,t,n,r,i,a=Array(m+1);for(r=n=0;r<c-1;r++)for(k[r]=n,e=0;e<1<<x[r];e++)O[n++]=r;for(O[n-1]=r,r=i=0;r<16;r++)for(N[r]=i,e=0;e<1<<S[r];e++)D[i++]=r;for(i>>=7;r<d;r++)for(N[r]=i<<7,e=0;e<1<<S[r]-7;e++)D[256+ i++]=r;for(t=0;t<=m;t++)a[t]=0;for(e=0;e<=143;)T[2*e+1]=8,e++,a[8]++;for(;e<=255;)T[2*e+1]=9,e++,a[9]++;for(;e<=279;)T[2*e+1]=7,e++,a[7]++;for(;e<=287;)T[2*e+1]=8,e++,a[8]++;for(ee(T,u+1,a),e=0;e<d;e++)E[2*e+1]=5,E[2*e]=B(e,5);A=new P(T,x,l+1,u,m),j=new P(E,S,0,d,m),M=new P([],C,0,f,g)}(),!0),e.l_desc=new F(e.dyn_ltree,A),e.d_desc=new F(e.dyn_dtree,j),e.bl_desc=new F(e.bl_tree,M),e.bi_buf=0,e.bi_valid=0,te(e)},n._tr_stored_block=oe,n._tr_flush_block=function(e,t,n,r){var o,s,c=0;0<e.level?(e.strm.data_type===2&&(e.strm.data_type=function(e){var t,n=4093624447;for(t=0;t<=31;t++,n>>>=1)if(1&n&&e.dyn_ltree[2*t]!==0)return i;if(e.dyn_ltree[18]!==0||e.dyn_ltree[20]!==0||e.dyn_ltree[26]!==0)return a;for(t=32;t<l;t++)if(e.dyn_ltree[2*t]!==0)return a;return i}(e)),ne(e,e.l_desc),ne(e,e.d_desc),c=function(e){var t;for(re(e,e.dyn_ltree,e.l_desc.max_code),re(e,e.dyn_dtree,e.d_desc.max_code),ne(e,e.bl_desc),t=f-1;3<=t&&e.bl_tree[2*w[t]+1]===0;t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),o=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=o&&(o=s)):o=s=n+5,n+4<=o&&t!==-1?oe(e,t,n,r):e.strategy===4||s===o?(R(e,2+ +!!r,3),W(e,T,E)):(R(e,4+ +!!r,3),function(e,t,n,r){var i;for(R(e,t-257,5),R(e,n-1,5),R(e,r-4,4),i=0;i<r;i++)R(e,e.bl_tree[2*w[i]+1],3);ie(e,e.dyn_ltree,t-1),ie(e,e.dyn_dtree,n-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,c+1),W(e,e.dyn_ltree,e.dyn_dtree)),te(e),r&&V(e)},n._tr_tally=function(e,t,n){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&n,e.last_lit++,t===0?e.dyn_ltree[2*n]++:(e.matches++,t--,e.dyn_ltree[2*(O[n]+l+1)]++,e.dyn_dtree[2*I(t)]++),e.last_lit===e.lit_bufsize-1},n._tr_align=function(e){R(e,2,3),z(e,_,T),function(e){e.bi_valid===16?(L(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,n){t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg=``,this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,n){(function(e){(function(e,t){if(!e.setImmediate){var n,r,i,a,o=1,s={},c=!1,l=e.document,u=Object.getPrototypeOf&&Object.getPrototypeOf(e);u=u&&u.setTimeout?u:e,n={}.toString.call(e.process)===`[object process]`?function(e){process.nextTick(function(){f(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage(``,`*`),e.onmessage=n,t}}()?(a=`setImmediate$`+Math.random()+`$`,e.addEventListener?e.addEventListener(`message`,p,!1):e.attachEvent(`onmessage`,p),function(t){e.postMessage(a+t,`*`)}):e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){f(e.data)},function(e){i.port2.postMessage(e)}):l&&`onreadystatechange`in l.createElement(`script`)?(r=l.documentElement,function(e){var t=l.createElement(`script`);t.onreadystatechange=function(){f(e),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}):function(e){setTimeout(f,0,e)},u.setImmediate=function(e){typeof e!=`function`&&(e=Function(``+e));for(var t=Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];return s[o]={callback:e,args:t},n(o),o++},u.clearImmediate=d}function d(e){delete s[e]}function f(e){if(c)setTimeout(f,0,e);else{var n=s[e];if(n){c=!0;try{(function(e){var n=e.callback,r=e.args;switch(r.length){case 0:n();break;case 1:n(r[0]);break;case 2:n(r[0],r[1]);break;case 3:n(r[0],r[1],r[2]);break;default:n.apply(t,r)}})(n)}finally{d(e),c=!1}}}}function p(t){t.source===e&&typeof t.data==`string`&&t.data.indexOf(a)===0&&f(+t.data.slice(a.length))}})(typeof self>`u`?e===void 0?this:e:self)}).call(this,typeof global<`u`?global:typeof self<`u`?self:typeof window<`u`?window:{})},{}]},{},[10])(10)})})),xe,Se,Ce,we,Te,Ee,K,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be=o((()=>{xe=`1.13.8`,Se=typeof self==`object`&&self.self===self&&self||typeof global==`object`&&global.global===global&&global||Function(`return this`)()||{},Ce=Array.prototype,we=Object.prototype,Te=typeof Symbol<`u`?Symbol.prototype:null,Ee=Ce.push,K=Ce.slice,De=we.toString,Oe=we.hasOwnProperty,ke=typeof ArrayBuffer<`u`,Ae=typeof DataView<`u`,je=Array.isArray,Me=Object.keys,Ne=Object.create,Pe=ke&&ArrayBuffer.isView,Fe=isNaN,Ie=isFinite,Le=!{toString:null}.propertyIsEnumerable(`toString`),Re=[`valueOf`,`isPrototypeOf`,`toString`,`propertyIsEnumerable`,`hasOwnProperty`,`toLocaleString`],ze=2**53-1}));function Ve(e,t){return t=t==null?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),r=Array(n),i=0;i<n;i++)r[i]=arguments[i+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var a=Array(t+1);for(i=0;i<t;i++)a[i]=arguments[i];return a[t]=r,e.apply(this,a)}}var He=o((()=>{}));function Ue(e){var t=typeof e;return t===`function`||t===`object`&&!!e}var We=o((()=>{}));function Ge(e){return e===null}var Ke=o((()=>{}));function qe(e){return e===void 0}var Je=o((()=>{}));function Ye(e){return e===!0||e===!1||De.call(e)===`[object Boolean]`}var Xe=o((()=>{Be()}));function Ze(e){return!!(e&&e.nodeType===1)}var Qe=o((()=>{}));function $e(e){var t=`[object `+e+`]`;return function(e){return De.call(e)===t}}var et=o((()=>{Be()})),tt,nt=o((()=>{et(),tt=$e(`String`)})),rt,it=o((()=>{et(),rt=$e(`Number`)})),at,ot=o((()=>{et(),at=$e(`Date`)})),st,ct=o((()=>{et(),st=$e(`RegExp`)})),lt,ut=o((()=>{et(),lt=$e(`Error`)})),dt,ft=o((()=>{et(),dt=$e(`Symbol`)})),pt,mt=o((()=>{et(),pt=$e(`ArrayBuffer`)})),ht,gt,_t,vt=o((()=>{et(),Be(),ht=$e(`Function`),gt=Se.document&&Se.document.childNodes,typeof/./!=`function`&&typeof Int8Array!=`object`&&typeof gt!=`function`&&(ht=function(e){return typeof e==`function`||!1}),_t=ht})),yt,bt=o((()=>{et(),yt=$e(`Object`)})),xt,St,Ct=o((()=>{Be(),bt(),xt=Ae&&(!/\[native code\]/.test(String(DataView))||yt(new DataView(new ArrayBuffer(8)))),St=typeof Map<`u`&&yt(new Map)}));function wt(e){return e!=null&&_t(e.getInt8)&&pt(e.buffer)}var Tt,Et,Dt=o((()=>{et(),vt(),mt(),Ct(),Tt=$e(`DataView`),Et=xt?wt:Tt})),Ot,kt=o((()=>{Be(),et(),Ot=je||$e(`Array`)}));function At(e,t){return e!=null&&Oe.call(e,t)}var jt=o((()=>{Be()})),Mt,Nt,Pt=o((()=>{et(),jt(),Mt=$e(`Arguments`),(function(){Mt(arguments)||(Mt=function(e){return At(e,`callee`)})})(),Nt=Mt}));function Ft(e){return!dt(e)&&Ie(e)&&!isNaN(parseFloat(e))}var It=o((()=>{Be(),ft()}));function Lt(e){return rt(e)&&Fe(e)}var Rt=o((()=>{Be(),it()}));function zt(e){return function(){return e}}var Bt=o((()=>{}));function Vt(e){return function(t){var n=e(t);return typeof n==`number`&&n>=0&&n<=ze}}var Ht=o((()=>{Be()}));function Ut(e){return function(t){return t?.[e]}}var Wt=o((()=>{})),Gt,Kt=o((()=>{Wt(),Gt=Ut(`byteLength`)})),qt,Jt=o((()=>{Ht(),Kt(),qt=Vt(Gt)}));function Yt(e){return Pe?Pe(e)&&!Et(e):qt(e)&&Xt.test(De.call(e))}var Xt,Zt,Qt=o((()=>{Be(),Dt(),Bt(),Jt(),Xt=/\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/,Zt=ke?Yt:zt(!1)})),$t,en=o((()=>{Wt(),$t=Ut(`length`)}));function tn(e){for(var t={},n=e.length,r=0;r<n;++r)t[e[r]]=!0;return{contains:function(e){return t[e]===!0},push:function(n){return t[n]=!0,e.push(n)}}}function nn(e,t){t=tn(t);var n=Re.length,r=e.constructor,i=_t(r)&&r.prototype||we,a=`constructor`;for(At(e,a)&&!t.contains(a)&&t.push(a);n--;)a=Re[n],a in e&&e[a]!==i[a]&&!t.contains(a)&&t.push(a)}var rn=o((()=>{Be(),vt(),jt()}));function an(e){if(!Ue(e))return[];if(Me)return Me(e);var t=[];for(var n in e)At(e,n)&&t.push(n);return Le&&nn(e,t),t}var on=o((()=>{We(),Be(),jt(),rn()}));function sn(e){if(e==null)return!0;var t=$t(e);return typeof t==`number`&&(Ot(e)||tt(e)||Nt(e))?t===0:$t(an(e))===0}var cn=o((()=>{en(),kt(),nt(),Pt(),on()}));function ln(e,t){var n=an(t),r=n.length;if(e==null)return!r;for(var i=Object(e),a=0;a<r;a++){var o=n[a];if(t[o]!==i[o]||!(o in i))return!1}return!0}var un=o((()=>{on()}));function q(e){if(e instanceof q)return e;if(!(this instanceof q))return new q(e);this._wrapped=e}var dn=o((()=>{Be(),q.VERSION=xe,q.prototype.value=function(){return this._wrapped},q.prototype.valueOf=q.prototype.toJSON=q.prototype.value,q.prototype.toString=function(){return String(this._wrapped)}}));function fn(e){return new Uint8Array(e.buffer||e,e.byteOffset||0,Gt(e))}var pn=o((()=>{Kt()}));function mn(e,t){for(var n=[{a:e,b:t}],r=[],i=[];n.length;){var a=n.pop();if(a===!0){r.pop(),i.pop();continue}if(e=a.a,t=a.b,e===t){if(e!==0||1/e==1/t)continue;return!1}if(e==null||t==null)return!1;if(e!==e){if(t!==t)continue;return!1}var o=typeof e;if(o!==`function`&&o!==`object`&&typeof t!=`object`)return!1;e instanceof q&&(e=e._wrapped),t instanceof q&&(t=t._wrapped);var s=De.call(e);if(s!==De.call(t))return!1;if(xt&&s==`[object Object]`&&Et(e)){if(!Et(t))return!1;s=hn}switch(s){case`[object RegExp]`:case`[object String]`:if(``+e==``+t)continue;return!1;case`[object Number]`:n.push({a:+e,b:+t});continue;case`[object Date]`:case`[object Boolean]`:if(+e==+t)continue;return!1;case`[object Symbol]`:if(Te.valueOf.call(e)===Te.valueOf.call(t))continue;return!1;case`[object ArrayBuffer]`:case hn:n.push({a:fn(e),b:fn(t)});continue}var c=s===`[object Array]`;if(!c&&Zt(e)){if(Gt(e)!==Gt(t))return!1;if(e.buffer===t.buffer&&e.byteOffset===t.byteOffset)continue;c=!0}if(!c){if(typeof e!=`object`||typeof t!=`object`)return!1;var l=e.constructor,u=t.constructor;if(l!==u&&!(_t(l)&&l instanceof l&&_t(u)&&u instanceof u)&&`constructor`in e&&`constructor`in t)return!1}for(var d=r.length;d--;)if(r[d]===e){if(i[d]===t)break;return!1}if(!(d>=0))if(r.push(e),i.push(t),n.push(!0),c){if(d=e.length,d!==t.length)return!1;for(;d--;)n.push({a:e[d],b:t[d]})}else{var f=an(e),p;if(d=f.length,an(t).length!==d)return!1;for(;d--;){if(p=f[d],!At(t,p))return!1;n.push({a:e[p],b:t[p]})}}}return!0}var hn,gn=o((()=>{dn(),Be(),Kt(),Qt(),vt(),Ct(),Dt(),on(),jt(),pn(),hn=`[object DataView]`}));function _n(e){if(!Ue(e))return[];var t=[];for(var n in e)t.push(n);return Le&&nn(e,t),t}var vn=o((()=>{We(),Be(),rn()}));function yn(e){var t=$t(e);return function(n){if(n==null||$t(_n(n)))return!1;for(var r=0;r<t;r++)if(!_t(n[e[r]]))return!1;return e!==Tn||!_t(n[bn])}}var bn,xn,Sn,Cn,wn,Tn,En,Dn=o((()=>{en(),vt(),vn(),bn=`forEach`,xn=`has`,Sn=[`clear`,`delete`],Cn=[`get`,xn,`set`],wn=Sn.concat(bn,Cn),Tn=Sn.concat(Cn),En=[`add`].concat(Sn,bn,xn)})),On,kn=o((()=>{et(),Ct(),Dn(),On=St?yn(wn):$e(`Map`)})),An,jn=o((()=>{et(),Ct(),Dn(),An=St?yn(Tn):$e(`WeakMap`)})),Mn,Nn=o((()=>{et(),Ct(),Dn(),Mn=St?yn(En):$e(`Set`)})),Pn,Fn=o((()=>{et(),Pn=$e(`WeakSet`)}));function In(e){for(var t=an(e),n=t.length,r=Array(n),i=0;i<n;i++)r[i]=e[t[i]];return r}var Ln=o((()=>{on()}));function Rn(e){for(var t=an(e),n=t.length,r=Array(n),i=0;i<n;i++)r[i]=[t[i],e[t[i]]];return r}var zn=o((()=>{on()}));function Bn(e){for(var t={},n=an(e),r=0,i=n.length;r<i;r++)t[e[n[r]]]=n[r];return t}var Vn=o((()=>{on()}));function Hn(e){var t=[];for(var n in e)_t(e[n])&&t.push(n);return t.sort()}var Un=o((()=>{vt()}));function Wn(e,t){return function(n){var r=arguments.length;if(t&&(n=Object(n)),r<2||n==null)return n;for(var i=1;i<r;i++)for(var a=arguments[i],o=e(a),s=o.length,c=0;c<s;c++){var l=o[c];(!t||n[l]===void 0)&&(n[l]=a[l])}return n}}var Gn=o((()=>{})),Kn,qn=o((()=>{Gn(),vn(),Kn=Wn(_n)})),Jn,Yn=o((()=>{Gn(),on(),Jn=Wn(an)})),Xn,Zn=o((()=>{Gn(),vn(),Xn=Wn(_n,!0)}));function Qn(){return function(){}}function $n(e){if(!Ue(e))return{};if(Ne)return Ne(e);var t=Qn();t.prototype=e;var n=new t;return t.prototype=null,n}var er=o((()=>{We(),Be()}));function tr(e,t){var n=$n(e);return t&&Jn(n,t),n}var nr=o((()=>{er(),Yn()}));function rr(e){return Ue(e)?Ot(e)?e.slice():Kn({},e):e}var ir=o((()=>{We(),kt(),qn()}));function ar(e,t){return t(e),e}var or=o((()=>{}));function sr(e){return Ot(e)?e:[e]}var cr=o((()=>{dn(),kt(),q.toPath=sr}));function lr(e){return q.toPath(e)}var ur=o((()=>{dn(),cr()}));function dr(e,t){for(var n=t.length,r=0;r<n;r++){if(e==null)return;e=e[t[r]]}return n?e:void 0}var fr=o((()=>{}));function pr(e,t,n){var r=dr(e,lr(t));return qe(r)?n:r}var mr=o((()=>{ur(),fr(),Je()}));function hr(e,t){t=lr(t);for(var n=t.length,r=0;r<n;r++){var i=t[r];if(!At(e,i))return!1;e=e[i]}return!!n}var gr=o((()=>{jt(),ur()}));function _r(e){return e}var vr=o((()=>{}));function yr(e){return e=Jn({},e),function(t){return ln(t,e)}}var br=o((()=>{Yn(),un()}));function xr(e){return e=lr(e),function(t){return dr(t,e)}}var Sr=o((()=>{fr(),ur()}));function Cr(e,t,n){if(t===void 0)return e;switch(n??3){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,i){return e.call(t,n,r,i)};case 4:return function(n,r,i,a){return e.call(t,n,r,i,a)}}return function(){return e.apply(t,arguments)}}var wr=o((()=>{}));function Tr(e,t,n){return e==null?_r:_t(e)?Cr(e,t,n):Ue(e)&&!Ot(e)?yr(e):xr(e)}var Er=o((()=>{vr(),vt(),We(),kt(),br(),Sr(),wr()}));function Dr(e,t){return Tr(e,t,1/0)}var Or=o((()=>{dn(),Er(),q.iteratee=Dr}));function kr(e,t,n){return q.iteratee===Dr?Tr(e,t,n):q.iteratee(e,t)}var Ar=o((()=>{dn(),Er(),Or()}));function jr(e,t,n){t=kr(t,n);for(var r=an(e),i=r.length,a={},o=0;o<i;o++){var s=r[o];a[s]=t(e[s],s,e)}return a}var Mr=o((()=>{Ar(),on()}));function Nr(){}var Pr=o((()=>{}));function Fr(e){return e==null?Nr:function(t){return pr(e,t)}}var Ir=o((()=>{Pr(),mr()}));function Lr(e,t,n){var r=Array(Math.max(0,e));t=Cr(t,n,1);for(var i=0;i<e;i++)r[i]=t(i);return r}var Rr=o((()=>{wr()}));function zr(e,t){return t??(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))}var Br=o((()=>{})),Vr,Hr=o((()=>{Vr=Date.now||function(){return new Date().getTime()}}));function Ur(e){var t=function(t){return e[t]},n=`(?:`+an(e).join(`|`)+`)`,r=RegExp(n),i=RegExp(n,`g`);return function(e){return e=e==null?``:``+e,r.test(e)?e.replace(i,t):e}}var Wr=o((()=>{on()})),Gr,Kr=o((()=>{Gr={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#x27;`,"`":`&#x60;`}})),qr,Jr=o((()=>{Wr(),Kr(),qr=Ur(Gr)})),Yr,Xr=o((()=>{Vn(),Kr(),Yr=Bn(Gr)})),Zr,Qr=o((()=>{Wr(),Xr(),Zr=Ur(Yr)})),$r,ei=o((()=>{dn(),$r=q.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g}}));function ti(e){return`\\`+ii[e]}function ni(e,t,n){!t&&n&&(t=n),t=Xn({},t,q.templateSettings);var r=RegExp([(t.escape||ri).source,(t.interpolate||ri).source,(t.evaluate||ri).source].join(`|`)+`|$`,`g`),i=0,a=`__p+='`;e.replace(r,function(t,n,r,o,s){return a+=e.slice(i,s).replace(ai,ti),i=s+t.length,n?a+=`'+
((__t=(`+n+`))==null?'':_.escape(__t))+
'`:r?a+=`'+
((__t=(`+r+`))==null?'':__t)+
'`:o&&(a+=`';
`+o+`
__p+='`),t}),a+=`';
`;var o=t.variable;if(o){if(!oi.test(o))throw Error(`variable is not a bare identifier: `+o)}else a=`with(obj||{}){
`+a+`}
`,o=`obj`;a=`var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
`+a+`return __p;
`;var s;try{s=Function(o,`_`,a)}catch(e){throw e.source=a,e}var c=function(e){return s.call(this,e,q)};return c.source=`function(`+o+`){
`+a+`}`,c}var ri,ii,ai,oi,si=o((()=>{Zn(),dn(),ei(),ri=/(.)^/,ii={"'":`'`,"\\":`\\`,"\r":`r`,"\n":`n`,"\u2028":`u2028`,"\u2029":`u2029`},ai=/\\|'|\r|\n|\u2028|\u2029/g,oi=/^\s*(\w|\$)+\s*$/}));function ci(e,t,n){t=lr(t);var r=t.length;if(!r)return _t(n)?n.call(e):n;for(var i=0;i<r;i++){var a=e?.[t[i]];a===void 0&&(a=n,i=r),e=_t(a)?a.call(e):a}return e}var li=o((()=>{vt(),ur()}));function ui(e){var t=++di+``;return e?e+t:t}var di,fi=o((()=>{di=0}));function pi(e){var t=q(e);return t._chain=!0,t}var mi=o((()=>{dn()}));function hi(e,t,n,r,i){if(!(r instanceof t))return e.apply(n,i);var a=$n(e.prototype),o=e.apply(a,i);return Ue(o)?o:a}var gi=o((()=>{er(),We()})),_i,vi=o((()=>{He(),gi(),dn(),_i=Ve(function(e,t){var n=_i.placeholder,r=function(){for(var i=0,a=t.length,o=Array(a),s=0;s<a;s++)o[s]=t[s]===n?arguments[i++]:t[s];for(;i<arguments.length;)o.push(arguments[i++]);return hi(e,r,this,this,o)};return r}),_i.placeholder=q})),yi,bi=o((()=>{He(),vt(),gi(),yi=Ve(function(e,t,n){if(!_t(e))throw TypeError(`Bind must be called on a function`);var r=Ve(function(i){return hi(e,r,t,this,n.concat(i))});return r})})),xi,Si=o((()=>{Ht(),en(),xi=Vt($t)}));function Ci(e,t,n){!t&&t!==0&&(t=1/0);for(var r=[],i=0,a=0,o=$t(e)||0,s=[];;){if(a>=o){if(!s.length)break;var c=s.pop();a=c.i,e=c.v,o=$t(e);continue}var l=e[a++];s.length>=t?r[i++]=l:xi(l)&&(Ot(l)||Nt(l))?(s.push({i:a,v:e}),a=0,e=l,o=$t(e)):n||(r[i++]=l)}return r}var wi=o((()=>{en(),Si(),kt(),Pt()})),Ti,J=o((()=>{He(),wi(),bi(),Ti=Ve(function(e,t){t=Ci(t,!1,!1);var n=t.length;if(n<1)throw Error(`bindAll must be passed function names`);for(;n--;){var r=t[n];e[r]=yi(e[r],e)}return e})}));function Ei(e,t){var n=function(r){var i=n.cache,a=``+(t?t.apply(this,arguments):r);return At(i,a)||(i[a]=e.apply(this,arguments)),i[a]};return n.cache={},n}var Di=o((()=>{jt()})),Oi,ki=o((()=>{He(),Oi=Ve(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)})})),Ai,ji=o((()=>{vi(),ki(),dn(),Ai=_i(Oi,q,1)}));function Mi(e,t,n){var r,i,a,o,s=0;n||={};var c=function(){s=n.leading===!1?0:Vr(),r=null,o=e.apply(i,a),r||(i=a=null)},l=function(){var l=Vr();!s&&n.leading===!1&&(s=l);var u=t-(l-s);return i=this,a=arguments,u<=0||u>t?(r&&=(clearTimeout(r),null),s=l,o=e.apply(i,a),r||(i=a=null)):!r&&n.trailing!==!1&&(r=setTimeout(c,u)),o};return l.cancel=function(){clearTimeout(r),s=0,r=i=a=null},l}var Ni=o((()=>{Hr()}));function Pi(e,t,n){var r,i,a,o,s,c=function(){var l=Vr()-i;t>l?r=setTimeout(c,t-l):(r=null,n||(o=e.apply(s,a)),r||(a=s=null))},l=Ve(function(l){return s=this,a=l,i=Vr(),r||(r=setTimeout(c,t),n&&(o=e.apply(s,a))),o});return l.cancel=function(){clearTimeout(r),r=a=s=null},l}var Fi=o((()=>{He(),Hr()}));function Ii(e,t){return _i(t,e)}var Li=o((()=>{vi()}));function Ri(e){return function(){return!e.apply(this,arguments)}}var zi=o((()=>{}));function Bi(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}}var Vi=o((()=>{}));function Hi(e,t){return function(){if(--e<1)return t.apply(this,arguments)}}var Ui=o((()=>{}));function Wi(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}}var Gi=o((()=>{})),Ki,qi=o((()=>{vi(),Gi(),Ki=_i(Wi,2)}));function Ji(e,t,n){t=kr(t,n);for(var r=an(e),i,a=0,o=r.length;a<o;a++)if(i=r[a],t(e[i],i,e))return i}var Yi=o((()=>{Ar(),on()}));function Xi(e){return function(t,n,r){n=kr(n,r);for(var i=$t(t),a=e>0?0:i-1;a>=0&&a<i;a+=e)if(n(t[a],a,t))return a;return-1}}var Zi=o((()=>{Ar(),en()})),Qi,$i=o((()=>{Zi(),Qi=Xi(1)})),ea,ta=o((()=>{Zi(),ea=Xi(-1)}));function na(e,t,n,r){n=kr(n,r,1);for(var i=n(t),a=0,o=$t(e);a<o;){var s=Math.floor((a+o)/2);n(e[s])<i?a=s+1:o=s}return a}var ra=o((()=>{Ar(),en()}));function ia(e,t,n){return function(r,i,a){var o=0,s=$t(r);if(typeof a==`number`)e>0?o=a>=0?a:Math.max(a+s,o):s=a>=0?Math.min(a+1,s):a+s+1;else if(n&&a&&s)return a=n(r,i),r[a]===i?a:-1;if(i!==i)return a=t(K.call(r,o,s),Lt),a>=0?a+o:-1;for(a=e>0?o:s-1;a>=0&&a<s;a+=e)if(r[a]===i)return a;return-1}}var aa=o((()=>{en(),Be(),Rt()})),oa,sa=o((()=>{ra(),$i(),aa(),oa=ia(1,Qi,na)})),ca,la=o((()=>{ta(),aa(),ca=ia(-1,ea)}));function ua(e,t,n){var r=(xi(e)?Qi:Ji)(e,t,n);if(r!==void 0&&r!==-1)return e[r]}var da=o((()=>{Si(),$i(),Yi()}));function fa(e,t){return ua(e,yr(t))}var pa=o((()=>{da(),br()}));function ma(e,t,n){t=Cr(t,n);var r,i;if(xi(e))for(r=0,i=e.length;r<i;r++)t(e[r],r,e);else{var a=an(e);for(r=0,i=a.length;r<i;r++)t(e[a[r]],a[r],e)}return e}var ha=o((()=>{wr(),Si(),on()}));function ga(e,t,n){t=kr(t,n);for(var r=!xi(e)&&an(e),i=(r||e).length,a=Array(i),o=0;o<i;o++){var s=r?r[o]:o;a[o]=t(e[s],s,e)}return a}var _a=o((()=>{Ar(),Si(),on()}));function va(e){var t=function(t,n,r,i){var a=!xi(t)&&an(t),o=(a||t).length,s=e>0?0:o-1;for(i||(r=t[a?a[s]:s],s+=e);s>=0&&s<o;s+=e){var c=a?a[s]:s;r=n(r,t[c],c,t)}return r};return function(e,n,r,i){var a=arguments.length>=3;return t(e,Cr(n,i,4),r,a)}}var ya=o((()=>{Si(),on(),wr()})),ba,xa=o((()=>{ya(),ba=va(1)})),Sa,Ca=o((()=>{ya(),Sa=va(-1)}));function wa(e,t,n){var r=[];return t=kr(t,n),ma(e,function(e,n,i){t(e,n,i)&&r.push(e)}),r}var Ta=o((()=>{Ar(),ha()}));function Ea(e,t,n){return wa(e,Ri(kr(t)),n)}var Da=o((()=>{Ta(),zi(),Ar()}));function Oa(e,t,n){t=kr(t,n);for(var r=!xi(e)&&an(e),i=(r||e).length,a=0;a<i;a++){var o=r?r[a]:a;if(!t(e[o],o,e))return!1}return!0}var ka=o((()=>{Ar(),Si(),on()}));function Aa(e,t,n){t=kr(t,n);for(var r=!xi(e)&&an(e),i=(r||e).length,a=0;a<i;a++){var o=r?r[a]:a;if(t(e[o],o,e))return!0}return!1}var ja=o((()=>{Ar(),Si(),on()}));function Ma(e,t,n,r){return xi(e)||(e=In(e)),(typeof n!=`number`||r)&&(n=0),oa(e,t,n)>=0}var Na=o((()=>{Si(),Ln(),sa()})),Pa,Fa=o((()=>{He(),vt(),_a(),fr(),ur(),Pa=Ve(function(e,t,n){var r,i;return _t(t)?i=t:(t=lr(t),r=t.slice(0,-1),t=t[t.length-1]),ga(e,function(e){var a=i;if(!a){if(r&&r.length&&(e=dr(e,r)),e==null)return;a=e[t]}return a==null?a:a.apply(e,n)})})}));function Ia(e,t){return ga(e,xr(t))}var La=o((()=>{_a(),Sr()}));function Ra(e,t){return wa(e,yr(t))}var za=o((()=>{Ta(),br()}));function Ba(e,t,n){var r=-1/0,i=-1/0,a,o;if(t==null||typeof t==`number`&&typeof e[0]!=`object`&&e!=null){e=xi(e)?e:In(e);for(var s=0,c=e.length;s<c;s++)a=e[s],a!=null&&a>r&&(r=a)}else t=kr(t,n),ma(e,function(e,n,a){o=t(e,n,a),(o>i||o===-1/0&&r===-1/0)&&(r=e,i=o)});return r}var Va=o((()=>{Si(),Ln(),Ar(),ha()}));function Ha(e,t,n){var r=1/0,i=1/0,a,o;if(t==null||typeof t==`number`&&typeof e[0]!=`object`&&e!=null){e=xi(e)?e:In(e);for(var s=0,c=e.length;s<c;s++)a=e[s],a!=null&&a<r&&(r=a)}else t=kr(t,n),ma(e,function(e,n,a){o=t(e,n,a),(o<i||o===1/0&&r===1/0)&&(r=e,i=o)});return r}var Ua=o((()=>{Si(),Ln(),Ar(),ha()}));function Wa(e){return e?Ot(e)?K.call(e):tt(e)?e.match(Ga):xi(e)?ga(e,_r):In(e):[]}var Ga,Ka=o((()=>{kt(),Be(),nt(),Si(),_a(),vr(),Ln(),Ga=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g}));function qa(e,t,n){if(t==null||n)return xi(e)||(e=In(e)),e[zr(e.length-1)];var r=Wa(e),i=$t(r);t=Math.max(Math.min(t,i),0);for(var a=i-1,o=0;o<t;o++){var s=zr(o,a),c=r[o];r[o]=r[s],r[s]=c}return r.slice(0,t)}var Ja=o((()=>{Si(),Ln(),en(),Br(),Ka()}));function Ya(e){return qa(e,1/0)}var Xa=o((()=>{Ja()}));function Za(e,t,n){var r=0;return t=kr(t,n),Ia(ga(e,function(e,n,i){return{value:e,index:r++,criteria:t(e,n,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index-t.index}),`value`)}var Qa=o((()=>{Ar(),La(),_a()}));function $a(e,t){return function(n,r,i){var a=t?[[],[]]:{};return r=kr(r,i),ma(n,function(t,i){e(a,t,r(t,i,n))}),a}}var eo=o((()=>{Ar(),ha()})),to,no=o((()=>{eo(),jt(),to=$a(function(e,t,n){At(e,n)?e[n].push(t):e[n]=[t]})})),ro,Y=o((()=>{eo(),ro=$a(function(e,t,n){e[n]=t})})),io,ao=o((()=>{eo(),jt(),io=$a(function(e,t,n){At(e,n)?e[n]++:e[n]=1})})),oo,so=o((()=>{eo(),oo=$a(function(e,t,n){e[+!n].push(t)},!0)}));function co(e){return e==null?0:xi(e)?e.length:an(e).length}var lo=o((()=>{Si(),on()}));function uo(e,t,n){return t in n}var fo=o((()=>{})),po,mo=o((()=>{He(),vt(),wr(),vn(),fo(),wi(),po=Ve(function(e,t){var n={},r=t[0];if(e==null)return n;_t(r)?(t.length>1&&(r=Cr(r,t[1])),t=_n(e)):(r=uo,t=Ci(t,!1,!1),e=Object(e));for(var i=0,a=t.length;i<a;i++){var o=t[i],s=e[o];r(s,o,e)&&(n[o]=s)}return n})})),ho,go=o((()=>{He(),vt(),zi(),_a(),wi(),Na(),mo(),ho=Ve(function(e,t){var n=t[0],r;return _t(n)?(n=Ri(n),t.length>1&&(r=t[1])):(t=ga(Ci(t,!1,!1),String),n=function(e,n){return!Ma(t,n)}),po(e,n,r)})}));function _o(e,t,n){return K.call(e,0,Math.max(0,e.length-(t==null||n?1:t)))}var vo=o((()=>{Be()}));function yo(e,t,n){return e==null||e.length<1?t==null||n?void 0:[]:t==null||n?e[0]:_o(e,e.length-t)}var bo=o((()=>{vo()}));function xo(e,t,n){return K.call(e,t==null||n?1:t)}var So=o((()=>{Be()}));function Co(e,t,n){return e==null||e.length<1?t==null||n?void 0:[]:t==null||n?e[e.length-1]:xo(e,Math.max(0,e.length-t))}var wo=o((()=>{So()}));function To(e){return wa(e,Boolean)}var Eo=o((()=>{Ta()}));function Do(e,t){return Ci(e,t,!1)}var Oo=o((()=>{wi()})),ko,Ao=o((()=>{He(),wi(),Ta(),Na(),ko=Ve(function(e,t){return t=Ci(t,!0,!0),wa(e,function(e){return!Ma(t,e)})})})),jo,Mo=o((()=>{He(),Ao(),jo=Ve(function(e,t){return ko(e,t)})}));function No(e,t,n,r){Ye(t)||(r=n,n=t,t=!1),n!=null&&(n=kr(n,r));for(var i=[],a=[],o=0,s=$t(e);o<s;o++){var c=e[o],l=n?n(c,o,e):c;t&&!n?((!o||a!==l)&&i.push(c),a=l):n?Ma(a,l)||(a.push(l),i.push(c)):Ma(i,c)||i.push(c)}return i}var Po=o((()=>{Xe(),Ar(),en(),Na()})),Fo,Io=o((()=>{He(),Po(),wi(),Fo=Ve(function(e){return No(Ci(e,!0,!0))})}));function Lo(e){for(var t=[],n=arguments.length,r=0,i=$t(e);r<i;r++){var a=e[r];if(!Ma(t,a)){var o;for(o=1;o<n&&Ma(arguments[o],a);o++);o===n&&t.push(a)}}return t}var Ro=o((()=>{en(),Na()}));function zo(e){for(var t=e&&Ba(e,$t).length||0,n=Array(t),r=0;r<t;r++)n[r]=Ia(e,r);return n}var Bo=o((()=>{Va(),en(),La()})),Vo,Ho=o((()=>{He(),Bo(),Vo=Ve(zo)}));function Uo(e,t){for(var n={},r=0,i=$t(e);r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n}var Wo=o((()=>{en()}));function Go(e,t,n){t??(t=e||0,e=0),n||=t<e?-1:1;for(var r=Math.max(Math.ceil((t-e)/n),0),i=Array(r),a=0;a<r;a++,e+=n)i[a]=e;return i}var Ko=o((()=>{}));function qo(e,t){if(t==null||t<1)return[];for(var n=[],r=0,i=e.length;r<i;)n.push(K.call(e,r,r+=t));return n}var Jo=o((()=>{Be()}));function Yo(e,t){return e._chain?q(t).chain():t}var Xo=o((()=>{dn()}));function Zo(e){return ma(Hn(e),function(t){var n=q[t]=e[t];q.prototype[t]=function(){var e=[this._wrapped];return Ee.apply(e,arguments),Yo(this,n.apply(q,e))}}),q}var Qo=o((()=>{dn(),ha(),Un(),Be(),Xo()})),$o,es=o((()=>{dn(),ha(),Be(),Xo(),ma([`pop`,`push`,`reverse`,`shift`,`sort`,`splice`,`unshift`],function(e){var t=Ce[e];q.prototype[e]=function(){var n=this._wrapped;return n!=null&&(t.apply(n,arguments),(e===`shift`||e===`splice`)&&n.length===0&&delete n[0]),Yo(this,n)}}),ma([`concat`,`join`,`slice`],function(e){var t=Ce[e];q.prototype[e]=function(){var e=this._wrapped;return e!=null&&(e=t.apply(e,arguments)),Yo(this,e)}}),$o=q})),ts=c({VERSION:()=>xe,after:()=>Hi,all:()=>Oa,allKeys:()=>_n,any:()=>Aa,assign:()=>Jn,before:()=>Wi,bind:()=>yi,bindAll:()=>Ti,chain:()=>pi,chunk:()=>qo,clone:()=>rr,collect:()=>ga,compact:()=>To,compose:()=>Bi,constant:()=>zt,contains:()=>Ma,countBy:()=>io,create:()=>tr,debounce:()=>Pi,default:()=>$o,defaults:()=>Xn,defer:()=>Ai,delay:()=>Oi,detect:()=>ua,difference:()=>ko,drop:()=>xo,each:()=>ma,escape:()=>qr,every:()=>Oa,extend:()=>Kn,extendOwn:()=>Jn,filter:()=>wa,find:()=>ua,findIndex:()=>Qi,findKey:()=>Ji,findLastIndex:()=>ea,findWhere:()=>fa,first:()=>yo,flatten:()=>Do,foldl:()=>ba,foldr:()=>Sa,forEach:()=>ma,functions:()=>Hn,get:()=>pr,groupBy:()=>to,has:()=>hr,head:()=>yo,identity:()=>_r,include:()=>Ma,includes:()=>Ma,indexBy:()=>ro,indexOf:()=>oa,initial:()=>_o,inject:()=>ba,intersection:()=>Lo,invert:()=>Bn,invoke:()=>Pa,isArguments:()=>Nt,isArray:()=>Ot,isArrayBuffer:()=>pt,isBoolean:()=>Ye,isDataView:()=>Et,isDate:()=>at,isElement:()=>Ze,isEmpty:()=>sn,isEqual:()=>mn,isError:()=>lt,isFinite:()=>Ft,isFunction:()=>_t,isMap:()=>On,isMatch:()=>ln,isNaN:()=>Lt,isNull:()=>Ge,isNumber:()=>rt,isObject:()=>Ue,isRegExp:()=>st,isSet:()=>Mn,isString:()=>tt,isSymbol:()=>dt,isTypedArray:()=>Zt,isUndefined:()=>qe,isWeakMap:()=>An,isWeakSet:()=>Pn,iteratee:()=>Dr,keys:()=>an,last:()=>Co,lastIndexOf:()=>ca,map:()=>ga,mapObject:()=>jr,matcher:()=>yr,matches:()=>yr,max:()=>Ba,memoize:()=>Ei,methods:()=>Hn,min:()=>Ha,mixin:()=>Zo,negate:()=>Ri,noop:()=>Nr,now:()=>Vr,object:()=>Uo,omit:()=>ho,once:()=>Ki,pairs:()=>Rn,partial:()=>_i,partition:()=>oo,pick:()=>po,pluck:()=>Ia,property:()=>xr,propertyOf:()=>Fr,random:()=>zr,range:()=>Go,reduce:()=>ba,reduceRight:()=>Sa,reject:()=>Ea,rest:()=>xo,restArguments:()=>Ve,result:()=>ci,sample:()=>qa,select:()=>wa,shuffle:()=>Ya,size:()=>co,some:()=>Aa,sortBy:()=>Za,sortedIndex:()=>na,tail:()=>xo,take:()=>yo,tap:()=>ar,template:()=>ni,templateSettings:()=>$r,throttle:()=>Mi,times:()=>Lr,toArray:()=>Wa,toPath:()=>sr,transpose:()=>zo,unescape:()=>Zr,union:()=>Fo,uniq:()=>No,unique:()=>No,uniqueId:()=>ui,unzip:()=>zo,values:()=>In,where:()=>Ra,without:()=>jo,wrap:()=>Ii,zip:()=>Vo}),ns=o((()=>{Be(),He(),We(),Ke(),Je(),Xe(),Qe(),nt(),it(),ot(),ct(),ut(),ft(),mt(),Dt(),kt(),vt(),Pt(),It(),Rt(),Qt(),cn(),un(),gn(),kn(),jn(),Nn(),Fn(),on(),vn(),Ln(),zn(),Vn(),Un(),qn(),Yn(),Zn(),nr(),ir(),or(),mr(),gr(),Mr(),vr(),Bt(),Pr(),cr(),Sr(),Ir(),br(),Rr(),Br(),Hr(),Jr(),Qr(),ei(),si(),li(),fi(),mi(),Or(),vi(),bi(),J(),Di(),ki(),ji(),Ni(),Fi(),Li(),zi(),Vi(),Ui(),Gi(),qi(),Yi(),$i(),ta(),ra(),sa(),la(),da(),pa(),ha(),_a(),xa(),Ca(),Ta(),Da(),ka(),ja(),Na(),Fa(),La(),za(),Va(),Ua(),Xa(),Ja(),Qa(),no(),Y(),ao(),so(),Ka(),lo(),mo(),go(),bo(),vo(),wo(),So(),Eo(),Oo(),Mo(),Po(),Io(),Ro(),Ao(),Bo(),Ho(),Wo(),Ko(),Jo(),Qo(),es()})),rs,is=o((()=>{ns(),rs=Zo(ts),rs._=rs})),as=c({VERSION:()=>xe,after:()=>Hi,all:()=>Oa,allKeys:()=>_n,any:()=>Aa,assign:()=>Jn,before:()=>Wi,bind:()=>yi,bindAll:()=>Ti,chain:()=>pi,chunk:()=>qo,clone:()=>rr,collect:()=>ga,compact:()=>To,compose:()=>Bi,constant:()=>zt,contains:()=>Ma,countBy:()=>io,create:()=>tr,debounce:()=>Pi,default:()=>rs,defaults:()=>Xn,defer:()=>Ai,delay:()=>Oi,detect:()=>ua,difference:()=>ko,drop:()=>xo,each:()=>ma,escape:()=>qr,every:()=>Oa,extend:()=>Kn,extendOwn:()=>Jn,filter:()=>wa,find:()=>ua,findIndex:()=>Qi,findKey:()=>Ji,findLastIndex:()=>ea,findWhere:()=>fa,first:()=>yo,flatten:()=>Do,foldl:()=>ba,foldr:()=>Sa,forEach:()=>ma,functions:()=>Hn,get:()=>pr,groupBy:()=>to,has:()=>hr,head:()=>yo,identity:()=>_r,include:()=>Ma,includes:()=>Ma,indexBy:()=>ro,indexOf:()=>oa,initial:()=>_o,inject:()=>ba,intersection:()=>Lo,invert:()=>Bn,invoke:()=>Pa,isArguments:()=>Nt,isArray:()=>Ot,isArrayBuffer:()=>pt,isBoolean:()=>Ye,isDataView:()=>Et,isDate:()=>at,isElement:()=>Ze,isEmpty:()=>sn,isEqual:()=>mn,isError:()=>lt,isFinite:()=>Ft,isFunction:()=>_t,isMap:()=>On,isMatch:()=>ln,isNaN:()=>Lt,isNull:()=>Ge,isNumber:()=>rt,isObject:()=>Ue,isRegExp:()=>st,isSet:()=>Mn,isString:()=>tt,isSymbol:()=>dt,isTypedArray:()=>Zt,isUndefined:()=>qe,isWeakMap:()=>An,isWeakSet:()=>Pn,iteratee:()=>Dr,keys:()=>an,last:()=>Co,lastIndexOf:()=>ca,map:()=>ga,mapObject:()=>jr,matcher:()=>yr,matches:()=>yr,max:()=>Ba,memoize:()=>Ei,methods:()=>Hn,min:()=>Ha,mixin:()=>Zo,negate:()=>Ri,noop:()=>Nr,now:()=>Vr,object:()=>Uo,omit:()=>ho,once:()=>Ki,pairs:()=>Rn,partial:()=>_i,partition:()=>oo,pick:()=>po,pluck:()=>Ia,property:()=>xr,propertyOf:()=>Fr,random:()=>zr,range:()=>Go,reduce:()=>ba,reduceRight:()=>Sa,reject:()=>Ea,rest:()=>xo,restArguments:()=>Ve,result:()=>ci,sample:()=>qa,select:()=>wa,shuffle:()=>Ya,size:()=>co,some:()=>Aa,sortBy:()=>Za,sortedIndex:()=>na,tail:()=>xo,take:()=>yo,tap:()=>ar,template:()=>ni,templateSettings:()=>$r,throttle:()=>Mi,times:()=>Lr,toArray:()=>Wa,toPath:()=>sr,transpose:()=>zo,unescape:()=>Zr,union:()=>Fo,uniq:()=>No,unique:()=>No,uniqueId:()=>ui,unzip:()=>zo,values:()=>In,where:()=>Ra,without:()=>jo,wrap:()=>Ii,zip:()=>Vo}),os=o((()=>{is(),ns()})),ss=s(((e,t)=>{var n=(function(){return this===void 0})();if(n)t.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:n,propertyIsWritable:function(e,t){var n=Object.getOwnPropertyDescriptor(e,t);return!!(!n||n.writable||n.set)}};else{var r={}.hasOwnProperty,i={}.toString,a={}.constructor.prototype,o=function(e){var t=[];for(var n in e)r.call(e,n)&&t.push(n);return t};t.exports={isArray:function(e){try{return i.call(e)===`[object Array]`}catch{return!1}},keys:o,names:o,defineProperty:function(e,t,n){return e[t]=n.value,e},getDescriptor:function(e,t){return{value:e[t]}},freeze:function(e){return e},getPrototypeOf:function(e){try{return Object(e).constructor.prototype}catch{return a}},isES5:n,propertyIsWritable:function(){return!0}}}})),cs=s(((e,t)=>{var n=ss(),r=typeof navigator>`u`,i={e:{}},a,o=typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:e===void 0?null:e;function s(){try{var e=a;return a=null,e.apply(this,arguments)}catch(e){return i.e=e,i}}function c(e){return a=e,s}var l=function(e,t){var n={}.hasOwnProperty;function r(){for(var r in this.constructor=e,this.constructor$=t,t.prototype)n.call(t.prototype,r)&&r.charAt(r.length-1)!==`$`&&(this[r+`$`]=t.prototype[r])}return r.prototype=t.prototype,e.prototype=new r,e.prototype};function u(e){return e==null||e===!0||e===!1||typeof e==`string`||typeof e==`number`}function d(e){return typeof e==`function`||typeof e==`object`&&!!e}function f(e){return u(e)?Error(w(e)):e}function p(e,t){var n=e.length,r=Array(n+1),i;for(i=0;i<n;++i)r[i]=e[i];return r[i]=t,r}function m(e,t,r){if(n.isES5){var i=Object.getOwnPropertyDescriptor(e,t);if(i!=null)return i.get==null&&i.set==null?i.value:r}else return{}.hasOwnProperty.call(e,t)?e[t]:void 0}function h(e,t,r){if(u(e))return e;var i={value:r,configurable:!0,enumerable:!1,writable:!0};return n.defineProperty(e,t,i),e}function g(e){throw e}var _=(function(){var e=[Array.prototype,Object.prototype,Function.prototype],t=function(t){for(var n=0;n<e.length;++n)if(e[n]===t)return!0;return!1};if(n.isES5){var r=Object.getOwnPropertyNames;return function(e){for(var i=[],a=Object.create(null);e!=null&&!t(e);){var o;try{o=r(e)}catch{return i}for(var s=0;s<o.length;++s){var c=o[s];if(!a[c]){a[c]=!0;var l=Object.getOwnPropertyDescriptor(e,c);l!=null&&l.get==null&&l.set==null&&i.push(c)}}e=n.getPrototypeOf(e)}return i}}else{var i={}.hasOwnProperty;return function(n){if(t(n))return[];var r=[];enumeration:for(var a in n)if(i.call(n,a))r.push(a);else{for(var o=0;o<e.length;++o)if(i.call(e[o],a))continue enumeration;r.push(a)}return r}}})(),v=/this\s*\.\s*\S+\s*=/;function y(e){try{if(typeof e==`function`){var t=n.names(e.prototype),r=n.isES5&&t.length>1,i=t.length>0&&!(t.length===1&&t[0]===`constructor`),a=v.test(e+``)&&n.names(e).length>0;if(r||i||a)return!0}return!1}catch{return!1}}function b(e){function t(){}t.prototype=e;for(var n=8;n--;)new t;return e}var x=/^[a-z$_][a-z$_0-9]*$/i;function S(e){return x.test(e)}function C(e,t,n){for(var r=Array(e),i=0;i<e;++i)r[i]=t+i+n;return r}function w(e){try{return e+``}catch{return`[no string representation]`}}function T(e){return typeof e==`object`&&!!e&&typeof e.message==`string`&&typeof e.name==`string`}function E(e){try{h(e,`isOperational`,!0)}catch{}}function D(e){return e==null?!1:e instanceof Error.__BluebirdErrorTypes__.OperationalError||e.isOperational===!0}function O(e){return T(e)&&n.propertyIsWritable(e,`stack`)}var k=(function(){return`stack`in Error()?function(e){return O(e)?e:Error(w(e))}:function(e){if(O(e))return e;try{throw Error(w(e))}catch(e){return e}}})();function A(e){return{}.toString.call(e)}function j(e,t,r){for(var i=n.names(e),a=0;a<i.length;++a){var o=i[a];if(r(o))try{n.defineProperty(t,o,n.getDescriptor(e,o))}catch{}}}var M=function(e){return n.isArray(e)?e:null};if(typeof Symbol<`u`&&Symbol.iterator){var N=typeof Array.from==`function`?function(e){return Array.from(e)}:function(e){for(var t=[],n=e[Symbol.iterator](),r;!(r=n.next()).done;)t.push(r.value);return t};M=function(e){return n.isArray(e)?e:e!=null&&typeof e[Symbol.iterator]==`function`?N(e):null}}var P=typeof process<`u`&&A(process).toLowerCase()===`[object process]`,F=typeof process<`u`&&!0;function I(e){return F?{}[e]:void 0}function L(){if(typeof Promise==`function`)try{var e=new Promise(function(){});if({}.toString.call(e)===`[object Promise]`)return Promise}catch{}}function R(e,t){return e.bind(t)}var z={isClass:y,isIdentifier:S,inheritedDataKeys:_,getDataPropertyOrDefault:m,thrower:g,isArray:n.isArray,asArray:M,notEnumerableProp:h,isPrimitive:u,isObject:d,isError:T,canEvaluate:r,errorObj:i,tryCatch:c,inherits:l,withAppended:p,maybeWrapAsError:f,toFastProperties:b,filledRange:C,toString:w,canAttachTrace:O,ensureErrorObject:k,originatesFromRejection:D,markAsOriginatingFromRejection:E,classString:A,copyDescriptors:j,hasDevTools:typeof chrome<`u`&&chrome&&typeof chrome.loadTimes==`function`,isNode:P,hasEnvVariables:F,env:I,global:o,getNativePromise:L,domainBind:R};z.isRecentNode=z.isNode&&(function(){var e=process.versions.node.split(`.`).map(Number);return e[0]===0&&e[1]>10||e[0]>0})(),z.isNode&&z.toFastProperties(process);try{throw Error()}catch(e){z.lastLineError=e}t.exports=z})),ls=s(((e,t)=>{var n=cs(),r,i=function(){throw Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`)},a=n.getNativePromise();if(n.isNode&&typeof MutationObserver>`u`){var o=global.setImmediate,s=process.nextTick;r=n.isRecentNode?function(e){o.call(global,e)}:function(e){s.call(process,e)}}else if(typeof a==`function`&&typeof a.resolve==`function`){var c=a.resolve();r=function(e){c.then(e)}}else r=typeof MutationObserver<`u`&&!(typeof window<`u`&&window.navigator&&(window.navigator.standalone||window.cordova))?(function(){var e=document.createElement(`div`),t={attributes:!0},n=!1,r=document.createElement(`div`);new MutationObserver(function(){e.classList.toggle(`foo`),n=!1}).observe(r,t);var i=function(){n||(n=!0,r.classList.toggle(`foo`))};return function(n){var r=new MutationObserver(function(){r.disconnect(),n()});r.observe(e,t),i()}})():typeof setImmediate<`u`?function(e){setImmediate(e)}:typeof setTimeout<`u`?function(e){setTimeout(e,0)}:i;t.exports=r})),us=s(((e,t)=>{function n(e,t,n,r,i){for(var a=0;a<i;++a)n[a+r]=e[a+t],e[a+t]=void 0}function r(e){this._capacity=e,this._length=0,this._front=0}r.prototype._willBeOverCapacity=function(e){return this._capacity<e},r.prototype._pushOne=function(e){var t=this.length();this._checkCapacity(t+1);var n=this._front+t&this._capacity-1;this[n]=e,this._length=t+1},r.prototype.push=function(e,t,n){var r=this.length()+3;if(this._willBeOverCapacity(r)){this._pushOne(e),this._pushOne(t),this._pushOne(n);return}var i=this._front+r-3;this._checkCapacity(r);var a=this._capacity-1;this[i+0&a]=e,this[i+1&a]=t,this[i+2&a]=n,this._length=r},r.prototype.shift=function(){var e=this._front,t=this[e];return this[e]=void 0,this._front=e+1&this._capacity-1,this._length--,t},r.prototype.length=function(){return this._length},r.prototype._checkCapacity=function(e){this._capacity<e&&this._resizeTo(this._capacity<<1)},r.prototype._resizeTo=function(e){var t=this._capacity;this._capacity=e;var r=this._front+this._length&t-1;n(this,0,this,t,r)},t.exports=r})),ds=s(((e,t)=>{var n;try{throw Error()}catch(e){n=e}var r=ls(),i=us(),a=cs();function o(){this._customScheduler=!1,this._isTickUsed=!1,this._lateQueue=new i(16),this._normalQueue=new i(16),this._haveDrainedQueues=!1,this._trampolineEnabled=!0;var e=this;this.drainQueues=function(){e._drainQueues()},this._schedule=r}o.prototype.setScheduler=function(e){var t=this._schedule;return this._schedule=e,this._customScheduler=!0,t},o.prototype.hasCustomScheduler=function(){return this._customScheduler},o.prototype.enableTrampoline=function(){this._trampolineEnabled=!0},o.prototype.disableTrampolineIfNecessary=function(){a.hasDevTools&&(this._trampolineEnabled=!1)},o.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues},o.prototype.fatalError=function(e,t){t?(process.stderr.write(`Fatal `+(e instanceof Error?e.stack:e)+`
`),process.exit(2)):this.throwLater(e)},o.prototype.throwLater=function(e,t){if(arguments.length===1&&(t=e,e=function(){throw t}),typeof setTimeout<`u`)setTimeout(function(){e(t)},0);else try{this._schedule(function(){e(t)})}catch{throw Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`)}};function s(e,t,n){this._lateQueue.push(e,t,n),this._queueTick()}function c(e,t,n){this._normalQueue.push(e,t,n),this._queueTick()}function l(e){this._normalQueue._pushOne(e),this._queueTick()}a.hasDevTools?(o.prototype.invokeLater=function(e,t,n){this._trampolineEnabled?s.call(this,e,t,n):this._schedule(function(){setTimeout(function(){e.call(t,n)},100)})},o.prototype.invoke=function(e,t,n){this._trampolineEnabled?c.call(this,e,t,n):this._schedule(function(){e.call(t,n)})},o.prototype.settlePromises=function(e){this._trampolineEnabled?l.call(this,e):this._schedule(function(){e._settlePromises()})}):(o.prototype.invokeLater=s,o.prototype.invoke=c,o.prototype.settlePromises=l),o.prototype._drainQueue=function(e){for(;e.length()>0;){var t=e.shift();if(typeof t!=`function`){t._settlePromises();continue}var n=e.shift(),r=e.shift();t.call(n,r)}},o.prototype._drainQueues=function(){this._drainQueue(this._normalQueue),this._reset(),this._haveDrainedQueues=!0,this._drainQueue(this._lateQueue)},o.prototype._queueTick=function(){this._isTickUsed||(this._isTickUsed=!0,this._schedule(this.drainQueues))},o.prototype._reset=function(){this._isTickUsed=!1},t.exports=o,t.exports.firstLineError=n})),fs=s(((e,t)=>{var n=ss(),r=n.freeze,i=cs(),a=i.inherits,o=i.notEnumerableProp;function s(e,t){function n(r){if(!(this instanceof n))return new n(r);o(this,`message`,typeof r==`string`?r:t),o(this,`name`,e),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):Error.call(this)}return a(n,Error),n}var c,l,u=s(`Warning`,`warning`),d=s(`CancellationError`,`cancellation error`),f=s(`TimeoutError`,`timeout error`),p=s(`AggregateError`,`aggregate error`);try{c=TypeError,l=RangeError}catch{c=s(`TypeError`,`type error`),l=s(`RangeError`,`range error`)}for(var m=`join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse`.split(` `),h=0;h<m.length;++h)typeof Array.prototype[m[h]]==`function`&&(p.prototype[m[h]]=Array.prototype[m[h]]);n.defineProperty(p.prototype,`length`,{value:0,configurable:!1,writable:!0,enumerable:!0}),p.prototype.isOperational=!0;var g=0;p.prototype.toString=function(){var e=Array(g*4+1).join(` `),t=`
`+e+`AggregateError of:
`;g++,e=Array(g*4+1).join(` `);for(var n=0;n<this.length;++n){for(var r=this[n]===this?`[Circular AggregateError]`:this[n]+``,i=r.split(`
`),a=0;a<i.length;++a)i[a]=e+i[a];r=i.join(`
`),t+=r+`
`}return g--,t};function _(e){if(!(this instanceof _))return new _(e);o(this,`name`,`OperationalError`),o(this,`message`,e),this.cause=e,this.isOperational=!0,e instanceof Error?(o(this,`message`,e.message),o(this,`stack`,e.stack)):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}a(_,Error);var v=Error.__BluebirdErrorTypes__;v||(v=r({CancellationError:d,TimeoutError:f,OperationalError:_,RejectionError:_,AggregateError:p}),n.defineProperty(Error,`__BluebirdErrorTypes__`,{value:v,writable:!1,enumerable:!1,configurable:!1})),t.exports={Error,TypeError:c,RangeError:l,CancellationError:v.CancellationError,OperationalError:v.OperationalError,TimeoutError:v.TimeoutError,AggregateError:v.AggregateError,Warning:u}})),ps=s(((e,t)=>{t.exports=function(e,t){var n=cs(),r=n.errorObj,i=n.isObject;function a(n,a){if(i(n)){if(n instanceof e)return n;var o=s(n);if(o===r){a&&a._pushContext();var c=e.reject(o.e);return a&&a._popContext(),c}else if(typeof o==`function`){if(l(n)){var c=new e(t);return n._then(c._fulfill,c._reject,void 0,c,null),c}return u(n,o,a)}}return n}function o(e){return e.then}function s(e){try{return o(e)}catch(e){return r.e=e,r}}var c={}.hasOwnProperty;function l(e){try{return c.call(e,`_promise0`)}catch{return!1}}function u(i,a,o){var s=new e(t),c=s;o&&o._pushContext(),s._captureStackTrace(),o&&o._popContext();var l=!0,u=n.tryCatch(a).call(i,d,f);l=!1,s&&u===r&&(s._rejectCallback(u.e,!0,!0),s=null);function d(e){s&&=(s._resolveCallback(e),null)}function f(e){s&&=(s._rejectCallback(e,l,!0),null)}return c}return a}})),ms=s(((e,t)=>{t.exports=function(e,t,n,r,i){var a=cs();a.isArray;function o(e){switch(e){case-2:return[];case-3:return{}}}function s(n){var r=this._promise=new e(t);n instanceof e&&r._propagateFrom(n,3),r._setOnCancel(this),this._values=n,this._length=0,this._totalResolved=0,this._init(void 0,-2)}return a.inherits(s,i),s.prototype.length=function(){return this._length},s.prototype.promise=function(){return this._promise},s.prototype._init=function t(i,s){var c=n(this._values,this._promise);if(c instanceof e){c=c._target();var l=c._bitField;if(this._values=c,!(l&50397184))return this._promise._setAsyncGuaranteed(),c._then(t,this._reject,void 0,this,s);if(l&33554432)c=c._value();else if(l&16777216)return this._reject(c._reason());else return this._cancel()}if(c=a.asArray(c),c===null){var u=r(`expecting an array or an iterable object but got `+a.classString(c)).reason();this._promise._rejectCallback(u,!1);return}if(c.length===0){s===-5?this._resolveEmptyArray():this._resolve(o(s));return}this._iterate(c)},s.prototype._iterate=function(t){var r=this.getActualLength(t.length);this._length=r,this._values=this.shouldCopyValues()?Array(r):this._values;for(var i=this._promise,a=!1,o=null,s=0;s<r;++s){var c=n(t[s],i);c instanceof e?(c=c._target(),o=c._bitField):o=null,a?o!==null&&c.suppressUnhandledRejections():o===null?a=this._promiseFulfilled(c,s):o&50397184?a=o&33554432?this._promiseFulfilled(c._value(),s):o&16777216?this._promiseRejected(c._reason(),s):this._promiseCancelled(s):(c._proxy(this,s),this._values[s]=c)}a||i._setAsyncGuaranteed()},s.prototype._isResolved=function(){return this._values===null},s.prototype._resolve=function(e){this._values=null,this._promise._fulfill(e)},s.prototype._cancel=function(){this._isResolved()||!this._promise._isCancellable()||(this._values=null,this._promise._cancel())},s.prototype._reject=function(e){this._values=null,this._promise._rejectCallback(e,!1)},s.prototype._promiseFulfilled=function(e,t){return this._values[t]=e,++this._totalResolved>=this._length?(this._resolve(this._values),!0):!1},s.prototype._promiseCancelled=function(){return this._cancel(),!0},s.prototype._promiseRejected=function(e){return this._totalResolved++,this._reject(e),!0},s.prototype._resultCancelled=function(){if(!this._isResolved()){var t=this._values;if(this._cancel(),t instanceof e)t.cancel();else for(var n=0;n<t.length;++n)t[n]instanceof e&&t[n].cancel()}},s.prototype.shouldCopyValues=function(){return!0},s.prototype.getActualLength=function(e){return e},s}})),hs=s(((e,t)=>{t.exports=function(e){var t=!1,n=[];e.prototype._promiseCreated=function(){},e.prototype._pushContext=function(){},e.prototype._popContext=function(){return null},e._peekContext=e.prototype._peekContext=function(){};function r(){this._trace=new r.CapturedTrace(a())}r.prototype._pushContext=function(){this._trace!==void 0&&(this._trace._promiseCreated=null,n.push(this._trace))},r.prototype._popContext=function(){if(this._trace!==void 0){var e=n.pop(),t=e._promiseCreated;return e._promiseCreated=null,t}return null};function i(){if(t)return new r}function a(){var e=n.length-1;if(e>=0)return n[e]}return r.CapturedTrace=null,r.create=i,r.deactivateLongStackTraces=function(){},r.activateLongStackTraces=function(){var n=e.prototype._pushContext,i=e.prototype._popContext,o=e._peekContext,s=e.prototype._peekContext,c=e.prototype._promiseCreated;r.deactivateLongStackTraces=function(){e.prototype._pushContext=n,e.prototype._popContext=i,e._peekContext=o,e.prototype._peekContext=s,e.prototype._promiseCreated=c,t=!1},t=!0,e.prototype._pushContext=r.prototype._pushContext,e.prototype._popContext=r.prototype._popContext,e._peekContext=e.prototype._peekContext=a,e.prototype._promiseCreated=function(){var e=this._peekContext();e&&e._promiseCreated==null&&(e._promiseCreated=this)}},r}})),gs=s(((e,t)=>{t.exports=function(e,t){var n=e._getDomain,r=e._async,i=fs().Warning,a=cs(),o=a.canAttachTrace,s,c,l=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,u=/\((?:timers\.js):\d+:\d+\)/,d=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,f=null,p=null,m=!1,h,g=!!(a.env(`BLUEBIRD_DEBUG`)!=0&&(a.env(`BLUEBIRD_DEBUG`)||a.env(`NODE_ENV`)===`development`)),_=!!(a.env(`BLUEBIRD_WARNINGS`)!=0&&(g||a.env(`BLUEBIRD_WARNINGS`))),v=!!(a.env(`BLUEBIRD_LONG_STACK_TRACES`)!=0&&(g||a.env(`BLUEBIRD_LONG_STACK_TRACES`))),y=a.env(`BLUEBIRD_W_FORGOTTEN_RETURN`)!=0&&(_||!!a.env(`BLUEBIRD_W_FORGOTTEN_RETURN`));e.prototype.suppressUnhandledRejections=function(){var e=this._target();e._bitField=e._bitField&-1048577|524288},e.prototype._ensurePossibleRejectionHandled=function(){this._bitField&524288||(this._setRejectionIsUnhandled(),r.invokeLater(this._notifyUnhandledRejection,this,void 0))},e.prototype._notifyUnhandledRejectionIsHandled=function(){re(`rejectionHandled`,s,void 0,this)},e.prototype._setReturnedNonUndefined=function(){this._bitField|=268435456},e.prototype._returnedNonUndefined=function(){return(this._bitField&268435456)!=0},e.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var e=this._settledValue();this._setUnhandledRejectionIsNotified(),re(`unhandledRejection`,c,e,this)}},e.prototype._setUnhandledRejectionIsNotified=function(){this._bitField|=262144},e.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField&=-262145},e.prototype._isUnhandledRejectionNotified=function(){return(this._bitField&262144)>0},e.prototype._setRejectionIsUnhandled=function(){this._bitField|=1048576},e.prototype._unsetRejectionIsUnhandled=function(){this._bitField&=-1048577,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},e.prototype._isRejectionUnhandled=function(){return(this._bitField&1048576)>0},e.prototype._warn=function(e,t,n){return B(e,t,n||this)},e.onPossiblyUnhandledRejection=function(e){var t=n();c=typeof e==`function`?t===null?e:a.domainBind(t,e):void 0},e.onUnhandledRejectionHandled=function(e){var t=n();s=typeof e==`function`?t===null?e:a.domainBind(t,e):void 0};var b=function(){};e.longStackTraces=function(){if(r.haveItemsQueued()&&!pe.longStackTraces)throw Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);if(!pe.longStackTraces&&oe()){var n=e.prototype._captureStackTrace,i=e.prototype._attachExtraTrace;pe.longStackTraces=!0,b=function(){if(r.haveItemsQueued()&&!pe.longStackTraces)throw Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);e.prototype._captureStackTrace=n,e.prototype._attachExtraTrace=i,t.deactivateLongStackTraces(),r.enableTrampoline(),pe.longStackTraces=!1},e.prototype._captureStackTrace=I,e.prototype._attachExtraTrace=L,t.activateLongStackTraces(),r.disableTrampolineIfNecessary()}},e.hasLongStackTraces=function(){return pe.longStackTraces&&oe()};var x=(function(){try{if(typeof CustomEvent==`function`){var e=new CustomEvent(`CustomEvent`);return a.global.dispatchEvent(e),function(e,t){var n=new CustomEvent(e.toLowerCase(),{detail:t,cancelable:!0});return!a.global.dispatchEvent(n)}}else if(typeof Event==`function`){var e=new Event(`CustomEvent`);return a.global.dispatchEvent(e),function(e,t){var n=new Event(e.toLowerCase(),{cancelable:!0});return n.detail=t,!a.global.dispatchEvent(n)}}else{var e=document.createEvent(`CustomEvent`);return e.initCustomEvent(`testingtheevent`,!1,!0,{}),a.global.dispatchEvent(e),function(e,t){var n=document.createEvent(`CustomEvent`);return n.initCustomEvent(e.toLowerCase(),!1,!0,t),!a.global.dispatchEvent(n)}}}catch{}return function(){return!1}})(),S=(function(){return a.isNode?function(){return process.emit.apply(process,arguments)}:a.global?function(e){var t=`on`+e.toLowerCase(),n=a.global[t];return n?(n.apply(a.global,[].slice.call(arguments,1)),!0):!1}:function(){return!1}})();function C(e,t){return{promise:t}}var w={promiseCreated:C,promiseFulfilled:C,promiseRejected:C,promiseResolved:C,promiseCancelled:C,promiseChained:function(e,t,n){return{promise:t,child:n}},warning:function(e,t){return{warning:t}},unhandledRejection:function(e,t,n){return{reason:t,promise:n}},rejectionHandled:C},T=function(e){var t=!1;try{t=S.apply(null,arguments)}catch(e){r.throwLater(e),t=!0}var n=!1;try{n=x(e,w[e].apply(null,arguments))}catch(e){r.throwLater(e),n=!0}return n||t};e.config=function(t){if(t=Object(t),`longStackTraces`in t&&(t.longStackTraces?e.longStackTraces():!t.longStackTraces&&e.hasLongStackTraces()&&b()),`warnings`in t){var n=t.warnings;pe.warnings=!!n,y=pe.warnings,a.isObject(n)&&`wForgottenReturn`in n&&(y=!!n.wForgottenReturn)}if(`cancellation`in t&&t.cancellation&&!pe.cancellation){if(r.haveItemsQueued())throw Error(`cannot enable cancellation after promises are in use`);e.prototype._clearCancellationData=j,e.prototype._propagateFrom=M,e.prototype._onCancel=k,e.prototype._setOnCancel=A,e.prototype._attachCancellationCallback=O,e.prototype._execute=D,P=M,pe.cancellation=!0}return`monitoring`in t&&(t.monitoring&&!pe.monitoring?(pe.monitoring=!0,e.prototype._fireEvent=T):!t.monitoring&&pe.monitoring&&(pe.monitoring=!1,e.prototype._fireEvent=E)),e};function E(){return!1}e.prototype._fireEvent=E,e.prototype._execute=function(e,t,n){try{e(t,n)}catch(e){return e}},e.prototype._onCancel=function(){},e.prototype._setOnCancel=function(e){},e.prototype._attachCancellationCallback=function(e){},e.prototype._captureStackTrace=function(){},e.prototype._attachExtraTrace=function(){},e.prototype._clearCancellationData=function(){},e.prototype._propagateFrom=function(e,t){};function D(e,t,n){var r=this;try{e(t,n,function(e){if(typeof e!=`function`)throw TypeError(`onCancel must be a function, got: `+a.toString(e));r._attachCancellationCallback(e)})}catch(e){return e}}function O(e){if(!this._isCancellable())return this;var t=this._onCancel();t===void 0?this._setOnCancel(e):a.isArray(t)?t.push(e):this._setOnCancel([t,e])}function k(){return this._onCancelField}function A(e){this._onCancelField=e}function j(){this._cancellationParent=void 0,this._onCancelField=void 0}function M(e,t){if(t&1){this._cancellationParent=e;var n=e._branchesRemainingToCancel;n===void 0&&(n=0),e._branchesRemainingToCancel=n+1}t&2&&e._isBound()&&this._setBoundTo(e._boundTo)}function N(e,t){t&2&&e._isBound()&&this._setBoundTo(e._boundTo)}var P=N;function F(){var t=this._boundTo;return t!==void 0&&t instanceof e?t.isFulfilled()?t.value():void 0:t}function I(){this._trace=new de(this._peekContext())}function L(e,t){if(o(e)){var n=this._trace;if(n!==void 0&&t&&(n=n._parent),n!==void 0)n.attachExtraTrace(e);else if(!e.__stackCleaned__){var r=W(e);a.notEnumerableProp(e,`stack`,r.message+`
`+r.stack.join(`
`)),a.notEnumerableProp(e,`__stackCleaned__`,!0)}}}function R(e,t,n,r,i){if(e===void 0&&t!==null&&y){if(i!==void 0&&i._returnedNonUndefined()||!(r._bitField&65535))return;n&&(n+=` `);var a=``,o=``;if(t._trace){for(var s=t._trace.stack.split(`
`),c=H(s),l=c.length-1;l>=0;--l){var f=c[l];if(!u.test(f)){var p=f.match(d);p&&(a=`at `+p[1]+`:`+p[2]+`:`+p[3]+` `);break}}if(c.length>0){for(var m=c[0],l=0;l<s.length;++l)if(s[l]===m){l>0&&(o=`
`+s[l-1]);break}}}var h=`a promise was created in a `+n+`handler `+a+`but was not returned from it, see http://goo.gl/rRqMUw`+o;r._warn(h,!0,t)}}function z(e,t){var n=e+` is deprecated and will be removed in a future version.`;return t&&(n+=` Use `+t+` instead.`),B(n)}function B(t,n,r){if(pe.warnings){var a=new i(t),o;if(n)r._attachExtraTrace(a);else if(pe.longStackTraces&&(o=e._peekContext()))o.attachExtraTrace(a);else{var s=W(a);a.stack=s.message+`
`+s.stack.join(`
`)}T(`warning`,a)||ne(a,``,!0)}}function ee(e,t){for(var n=0;n<t.length-1;++n)t[n].push(`From previous event:`),t[n]=t[n].join(`
`);return n<t.length&&(t[n]=t[n].join(`
`)),e+`
`+t.join(`
`)}function te(e){for(var t=0;t<e.length;++t)(e[t].length===0||t+1<e.length&&e[t][0]===e[t+1][0])&&(e.splice(t,1),t--)}function V(e){for(var t=e[0],n=1;n<e.length;++n){for(var r=e[n],i=t.length-1,a=t[i],o=-1,s=r.length-1;s>=0;--s)if(r[s]===a){o=s;break}for(var s=o;s>=0;--s){var c=r[s];if(t[i]===c)t.pop(),i--;else break}t=r}}function H(e){for(var t=[],n=0;n<e.length;++n){var r=e[n],i=r===`    (No stack trace)`||f.test(r),a=i&&se(r);i&&!a&&(m&&r.charAt(0)!==` `&&(r=`    `+r),t.push(r))}return t}function U(e){for(var t=e.stack.replace(/\s+$/g,``).split(`
`),n=0;n<t.length;++n){var r=t[n];if(r===`    (No stack trace)`||f.test(r))break}return n>0&&e.name!=`SyntaxError`&&(t=t.slice(n)),t}function W(e){var t=e.stack,n=e.toString();return t=typeof t==`string`&&t.length>0?U(e):[`    (No stack trace)`],{message:n,stack:e.name==`SyntaxError`?t:H(t)}}function ne(e,t,n){if(typeof console<`u`){var r;if(a.isObject(e)){var i=e.stack;r=t+p(i,e)}else r=t+String(e);typeof h==`function`?h(r,n):(typeof console.log==`function`||typeof console.log==`object`)&&console.log(r)}}function re(e,t,n,i){var a=!1;try{typeof t==`function`&&(a=!0,e===`rejectionHandled`?t(i):t(n,i))}catch(e){r.throwLater(e)}e===`unhandledRejection`?!T(e,n,i)&&!a&&ne(n,`Unhandled rejection `):T(e,i)}function ie(e){var t;if(typeof e==`function`)t=`[function `+(e.name||`anonymous`)+`]`;else{if(t=e&&typeof e.toString==`function`?e.toString():a.toString(e),/\[object [a-zA-Z0-9$_]+\]/.test(t))try{t=JSON.stringify(e)}catch{}t.length===0&&(t=`(empty array)`)}return`(<`+ae(t)+`>, no stack trace)`}function ae(e){var t=41;return e.length<t?e:e.substr(0,t-3)+`...`}function oe(){return typeof fe==`function`}var se=function(){return!1},ce=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;function le(e){var t=e.match(ce);if(t)return{fileName:t[1],line:parseInt(t[2],10)}}function ue(e,t){if(oe()){for(var n=e.stack.split(`
`),r=t.stack.split(`
`),i=-1,a=-1,o,s,c=0;c<n.length;++c){var u=le(n[c]);if(u){o=u.fileName,i=u.line;break}}for(var c=0;c<r.length;++c){var u=le(r[c]);if(u){s=u.fileName,a=u.line;break}}i<0||a<0||!o||!s||o!==s||i>=a||(se=function(e){if(l.test(e))return!0;var t=le(e);return!!(t&&t.fileName===o&&i<=t.line&&t.line<=a)})}}function de(e){this._parent=e,this._promisesCreated=0;var t=this._length=1+(e===void 0?0:e._length);fe(this,de),t>32&&this.uncycle()}a.inherits(de,Error),t.CapturedTrace=de,de.prototype.uncycle=function(){var e=this._length;if(!(e<2)){for(var t=[],n={},r=0,i=this;i!==void 0;++r)t.push(i),i=i._parent;e=this._length=r;for(var r=e-1;r>=0;--r){var a=t[r].stack;n[a]===void 0&&(n[a]=r)}for(var r=0;r<e;++r){var o=n[t[r].stack];if(o!==void 0&&o!==r){o>0&&(t[o-1]._parent=void 0,t[o-1]._length=1),t[r]._parent=void 0,t[r]._length=1;var s=r>0?t[r-1]:this;o<e-1?(s._parent=t[o+1],s._parent.uncycle(),s._length=s._parent._length+1):(s._parent=void 0,s._length=1);for(var c=s._length+1,l=r-2;l>=0;--l)t[l]._length=c,c++;return}}}},de.prototype.attachExtraTrace=function(e){if(!e.__stackCleaned__){this.uncycle();for(var t=W(e),n=t.message,r=[t.stack],i=this;i!==void 0;)r.push(H(i.stack.split(`
`))),i=i._parent;V(r),te(r),a.notEnumerableProp(e,`stack`,ee(n,r)),a.notEnumerableProp(e,`__stackCleaned__`,!0)}};var fe=(function(){var e=/^\s*at\s*/,t=function(e,t){return typeof e==`string`?e:t.name!==void 0&&t.message!==void 0?t.toString():ie(t)};if(typeof Error.stackTraceLimit==`number`&&typeof Error.captureStackTrace==`function`){Error.stackTraceLimit+=6,f=e,p=t;var n=Error.captureStackTrace;return se=function(e){return l.test(e)},function(e,t){Error.stackTraceLimit+=6,n(e,t),Error.stackTraceLimit-=6}}var r=Error();if(typeof r.stack==`string`&&r.stack.split(`
`)[0].indexOf(`stackDetection@`)>=0)return f=/@/,p=t,m=!0,function(e){e.stack=Error().stack};var i;try{throw Error()}catch(e){i=`stack`in e}return!(`stack`in r)&&i&&typeof Error.stackTraceLimit==`number`?(f=e,p=t,function(e){Error.stackTraceLimit+=6;try{throw Error()}catch(t){e.stack=t.stack}Error.stackTraceLimit-=6}):(p=function(e,t){return typeof e==`string`?e:(typeof t==`object`||typeof t==`function`)&&t.name!==void 0&&t.message!==void 0?t.toString():ie(t)},null)})([]);typeof console<`u`&&console.warn!==void 0&&(h=function(e){console.warn(e)},a.isNode&&process.stderr.isTTY?h=function(e,t){console.warn((t?`\x1B[33m`:`\x1B[31m`)+e+`\x1B[0m
`)}:!a.isNode&&typeof Error().stack==`string`&&(h=function(e,t){console.warn(`%c`+e,t?`color: darkorange`:`color: red`)}));var pe={warnings:_,longStackTraces:!1,cancellation:!1,monitoring:!1};return v&&e.longStackTraces(),{longStackTraces:function(){return pe.longStackTraces},warnings:function(){return pe.warnings},cancellation:function(){return pe.cancellation},monitoring:function(){return pe.monitoring},propagateFromFunction:function(){return P},boundValueFunction:function(){return F},checkForgottenReturns:R,setBounds:ue,warn:B,deprecated:z,CapturedTrace:de,fireDomEvent:x,fireGlobalEvent:S}}})),_s=s(((e,t)=>{t.exports=function(e,t){var n=cs(),r=e.CancellationError,i=n.errorObj;function a(e,t,n){this.promise=e,this.type=t,this.handler=n,this.called=!1,this.cancelPromise=null}a.prototype.isFinallyHandler=function(){return this.type===0};function o(e){this.finallyHandler=e}o.prototype._resultCancelled=function(){s(this.finallyHandler)};function s(e,t){return e.cancelPromise==null?!1:(arguments.length>1?e.cancelPromise._reject(t):e.cancelPromise._cancel(),e.cancelPromise=null,!0)}function c(){return u.call(this,this.promise._target()._settledValue())}function l(e){if(!s(this,e))return i.e=e,i}function u(n){var a=this.promise,u=this.handler;if(!this.called){this.called=!0;var d=this.isFinallyHandler()?u.call(a._boundValue()):u.call(a._boundValue(),n);if(d!==void 0){a._setReturnedNonUndefined();var f=t(d,a);if(f instanceof e){if(this.cancelPromise!=null)if(f._isCancelled()){var p=new r(`late cancellation observer`);return a._attachExtraTrace(p),i.e=p,i}else f.isPending()&&f._attachCancellationCallback(new o(this));return f._then(c,l,void 0,this,void 0)}}}return a.isRejected()?(s(this),i.e=n,i):(s(this),n)}return e.prototype._passThrough=function(e,t,n,r){return typeof e==`function`?this._then(n,r,void 0,new a(this,t,e),void 0):this.then()},e.prototype.lastly=e.prototype.finally=function(e){return this._passThrough(e,0,u,u)},e.prototype.tap=function(e){return this._passThrough(e,1,u)},a}})),vs=s(((e,t)=>{t.exports=function(e){var t=cs(),n=ss().keys,r=t.tryCatch,i=t.errorObj;function a(a,o,s){return function(c){var l=s._boundValue();predicateLoop:for(var u=0;u<a.length;++u){var d=a[u];if(d===Error||d!=null&&d.prototype instanceof Error){if(c instanceof d)return r(o).call(l,c)}else if(typeof d==`function`){var f=r(d).call(l,c);if(f===i)return f;if(f)return r(o).call(l,c)}else if(t.isObject(c)){for(var p=n(d),m=0;m<p.length;++m){var h=p[m];if(d[h]!=c[h])continue predicateLoop}return r(o).call(l,c)}}return e}}return a}})),ys=s(((e,t)=>{var n=cs(),r=n.maybeWrapAsError,i=fs().OperationalError,a=ss();function o(e){return e instanceof Error&&a.getPrototypeOf(e)===Error.prototype}var s=/^(?:name|message|stack|cause)$/;function c(e){var t;if(o(e)){t=new i(e),t.name=e.name,t.message=e.message,t.stack=e.stack;for(var r=a.keys(e),c=0;c<r.length;++c){var l=r[c];s.test(l)||(t[l]=e[l])}return t}return n.markAsOriginatingFromRejection(e),e}function l(e,t){return function(n,i){if(e!==null){if(n){var a=c(r(n));e._attachExtraTrace(a),e._reject(a)}else if(!t)e._fulfill(i);else{for(var o=arguments.length,s=Array(Math.max(o-1,0)),l=1;l<o;++l)s[l-1]=arguments[l];e._fulfill(s)}e=null}}}t.exports=l})),bs=s(((e,t)=>{t.exports=function(e,t,n,r,i){var a=cs(),o=a.tryCatch;e.method=function(n){if(typeof n!=`function`)throw new e.TypeError(`expecting a function but got `+a.classString(n));return function(){var r=new e(t);r._captureStackTrace(),r._pushContext();var a=o(n).apply(this,arguments),s=r._popContext();return i.checkForgottenReturns(a,s,`Promise.method`,r),r._resolveFromSyncValue(a),r}},e.attempt=e.try=function(n){if(typeof n!=`function`)return r(`expecting a function but got `+a.classString(n));var s=new e(t);s._captureStackTrace(),s._pushContext();var c;if(arguments.length>1){i.deprecated(`calling Promise.try with more than 1 argument`);var l=arguments[1],u=arguments[2];c=a.isArray(l)?o(n).apply(u,l):o(n).call(u,l)}else c=o(n)();var d=s._popContext();return i.checkForgottenReturns(c,d,`Promise.try`,s),s._resolveFromSyncValue(c),s},e.prototype._resolveFromSyncValue=function(e){e===a.errorObj?this._rejectCallback(e.e,!1):this._resolveCallback(e,!0)}}})),xs=s(((e,t)=>{t.exports=function(e,t,n,r){var i=!1,a=function(e,t){this._reject(t)},o=function(e,t){t.promiseRejectionQueued=!0,t.bindingPromise._then(a,a,null,this,e)},s=function(e,t){this._bitField&50397184||this._resolveCallback(t.target)},c=function(e,t){t.promiseRejectionQueued||this._reject(e)};e.prototype.bind=function(a){i||(i=!0,e.prototype._propagateFrom=r.propagateFromFunction(),e.prototype._boundValue=r.boundValueFunction());var l=n(a),u=new e(t);u._propagateFrom(this,1);var d=this._target();if(u._setBoundTo(l),l instanceof e){var f={promiseRejectionQueued:!1,promise:u,target:d,bindingPromise:l};d._then(t,o,void 0,u,f),l._then(s,c,void 0,u,f),u._setOnCancel(l)}else u._resolveCallback(d);return u},e.prototype._setBoundTo=function(e){e===void 0?this._bitField&=-2097153:(this._bitField|=2097152,this._boundTo=e)},e.prototype._isBound=function(){return(this._bitField&2097152)==2097152},e.bind=function(t,n){return e.resolve(n).bind(t)}}})),Ss=s(((e,t)=>{t.exports=function(e,t,n,r){var i=cs(),a=i.tryCatch,o=i.errorObj,s=e._async;e.prototype.break=e.prototype.cancel=function(){if(!r.cancellation())return this._warn(`cancellation is disabled`);for(var e=this,t=e;e._isCancellable();){if(!e._cancelBy(t)){t._isFollowing()?t._followee().cancel():t._cancelBranched();break}var n=e._cancellationParent;if(n==null||!n._isCancellable()){e._isFollowing()?e._followee().cancel():e._cancelBranched();break}else e._isFollowing()&&e._followee().cancel(),e._setWillBeCancelled(),t=e,e=n}},e.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--},e.prototype._enoughBranchesHaveCancelled=function(){return this._branchesRemainingToCancel===void 0||this._branchesRemainingToCancel<=0},e.prototype._cancelBy=function(e){return e===this?(this._branchesRemainingToCancel=0,this._invokeOnCancel(),!0):(this._branchHasCancelled(),this._enoughBranchesHaveCancelled()?(this._invokeOnCancel(),!0):!1)},e.prototype._cancelBranched=function(){this._enoughBranchesHaveCancelled()&&this._cancel()},e.prototype._cancel=function(){this._isCancellable()&&(this._setCancelled(),s.invoke(this._cancelPromises,this,void 0))},e.prototype._cancelPromises=function(){this._length()>0&&this._settlePromises()},e.prototype._unsetOnCancel=function(){this._onCancelField=void 0},e.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled()},e.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled()},e.prototype._doInvokeOnCancel=function(e,t){if(i.isArray(e))for(var n=0;n<e.length;++n)this._doInvokeOnCancel(e[n],t);else if(e!==void 0)if(typeof e==`function`){if(!t){var r=a(e).call(this._boundValue());r===o&&(this._attachExtraTrace(r.e),s.throwLater(r.e))}}else e._resultCancelled(this)},e.prototype._invokeOnCancel=function(){var e=this._onCancel();this._unsetOnCancel(),s.invoke(this._doInvokeOnCancel,this,e)},e.prototype._invokeInternalOnCancel=function(){this._isCancellable()&&(this._doInvokeOnCancel(this._onCancel(),!0),this._unsetOnCancel())},e.prototype._resultCancelled=function(){this.cancel()}}})),Cs=s(((e,t)=>{t.exports=function(e){function t(){return this.value}function n(){throw this.reason}e.prototype.return=e.prototype.thenReturn=function(n){return n instanceof e&&n.suppressUnhandledRejections(),this._then(t,void 0,void 0,{value:n},void 0)},e.prototype.throw=e.prototype.thenThrow=function(e){return this._then(n,void 0,void 0,{reason:e},void 0)},e.prototype.catchThrow=function(e){if(arguments.length<=1)return this._then(void 0,n,void 0,{reason:e},void 0);var t=arguments[1];return this.caught(e,function(){throw t})},e.prototype.catchReturn=function(n){if(arguments.length<=1)return n instanceof e&&n.suppressUnhandledRejections(),this._then(void 0,t,void 0,{value:n},void 0);var r=arguments[1];return r instanceof e&&r.suppressUnhandledRejections(),this.caught(n,function(){return r})}}})),ws=s(((e,t)=>{t.exports=function(e){function t(e){e===void 0?(this._bitField=0,this._settledValueField=void 0):(e=e._target(),this._bitField=e._bitField,this._settledValueField=e._isFateSealed()?e._settledValue():void 0)}t.prototype._settledValue=function(){return this._settledValueField};var n=t.prototype.value=function(){if(!this.isFulfilled())throw TypeError(`cannot get fulfillment value of a non-fulfilled promise

    See http://goo.gl/MqrFmX
`);return this._settledValue()},r=t.prototype.error=t.prototype.reason=function(){if(!this.isRejected())throw TypeError(`cannot get rejection reason of a non-rejected promise

    See http://goo.gl/MqrFmX
`);return this._settledValue()},i=t.prototype.isFulfilled=function(){return(this._bitField&33554432)!=0},a=t.prototype.isRejected=function(){return(this._bitField&16777216)!=0},o=t.prototype.isPending=function(){return(this._bitField&50397184)==0},s=t.prototype.isResolved=function(){return(this._bitField&50331648)!=0};t.prototype.isCancelled=function(){return(this._bitField&8454144)!=0},e.prototype.__isCancelled=function(){return(this._bitField&65536)==65536},e.prototype._isCancelled=function(){return this._target().__isCancelled()},e.prototype.isCancelled=function(){return(this._target()._bitField&8454144)!=0},e.prototype.isPending=function(){return o.call(this._target())},e.prototype.isRejected=function(){return a.call(this._target())},e.prototype.isFulfilled=function(){return i.call(this._target())},e.prototype.isResolved=function(){return s.call(this._target())},e.prototype.value=function(){return n.call(this._target())},e.prototype.reason=function(){var e=this._target();return e._unsetRejectionIsUnhandled(),r.call(e)},e.prototype._value=function(){return this._settledValue()},e.prototype._reason=function(){return this._unsetRejectionIsUnhandled(),this._settledValue()},e.PromiseInspection=t}})),Ts=s(((e,t)=>{t.exports=function(e,t,n,r,i,a){var o=cs(),s=o.canEvaluate,c=o.tryCatch,l=o.errorObj,u;if(s){for(var d=function(e){return Function(`value`,`holder`,`                             
            'use strict';                                                    
            holder.pIndex = value;                                           
            holder.checkFulfillment(this);                                   
            `.replace(/Index/g,e))},f=function(e){return Function(`promise`,`holder`,`                           
            'use strict';                                                    
            holder.pIndex = promise;                                         
            `.replace(/Index/g,e))},p=function(t){for(var n=Array(t),r=0;r<n.length;++r)n[r]=`this.p`+(r+1);var a=n.join(` = `)+` = null;`,o=`var promise;
`+n.map(function(e){return`                                                         
                promise = `+e+`;                                      
                if (promise instanceof Promise) {                            
                    promise.cancel();                                        
                }                                                            
            `}).join(`
`),s=n.join(`, `),u=`Holder$`+t,d=`return function(tryCatch, errorObj, Promise, async) {    
            'use strict';                                                    
            function [TheName](fn) {                                         
                [TheProperties]                                              
                this.fn = fn;                                                
                this.asyncNeeded = true;                                     
                this.now = 0;                                                
            }                                                                
                                                                             
            [TheName].prototype._callFunction = function(promise) {          
                promise._pushContext();                                      
                var ret = tryCatch(this.fn)([ThePassedArguments]);           
                promise._popContext();                                       
                if (ret === errorObj) {                                      
                    promise._rejectCallback(ret.e, false);                   
                } else {                                                     
                    promise._resolveCallback(ret);                           
                }                                                            
            };                                                               
                                                                             
            [TheName].prototype.checkFulfillment = function(promise) {       
                var now = ++this.now;                                        
                if (now === [TheTotal]) {                                    
                    if (this.asyncNeeded) {                                  
                        async.invoke(this._callFunction, this, promise);     
                    } else {                                                 
                        this._callFunction(promise);                         
                    }                                                        
                                                                             
                }                                                            
            };                                                               
                                                                             
            [TheName].prototype._resultCancelled = function() {              
                [CancellationCode]                                           
            };                                                               
                                                                             
            return [TheName];                                                
        }(tryCatch, errorObj, Promise, async);                               
        `;return d=d.replace(/\[TheName\]/g,u).replace(/\[TheTotal\]/g,t).replace(/\[ThePassedArguments\]/g,s).replace(/\[TheProperties\]/g,a).replace(/\[CancellationCode\]/g,o),Function(`tryCatch`,`errorObj`,`Promise`,`async`,d)(c,l,e,i)},m=[],h=[],g=[],_=0;_<8;++_)m.push(p(_+1)),h.push(d(_+1)),g.push(f(_+1));u=function(e){this._reject(e)}}e.join=function(){var i=arguments.length-1,c;if(i>0&&typeof arguments[i]==`function`&&(c=arguments[i],i<=8&&s)){var l=new e(r);l._captureStackTrace();for(var d=m[i-1],f=new d(c),p=h,_=0;_<i;++_){var v=n(arguments[_],l);if(v instanceof e){v=v._target();var y=v._bitField;y&50397184?y&33554432?p[_].call(l,v._value(),f):y&16777216?l._reject(v._reason()):l._cancel():(v._then(p[_],u,void 0,l,f),g[_](v,f),f.asyncNeeded=!1)}else p[_].call(l,v,f)}if(!l._isFateSealed()){if(f.asyncNeeded){var b=a();b!==null&&(f.fn=o.domainBind(b,f.fn))}l._setAsyncGuaranteed(),l._setOnCancel(f)}return l}var x=[...arguments];c&&x.pop();var l=new t(x).promise();return c===void 0?l:l.spread(c)}}})),Es=s(((e,t)=>{t.exports=function(e,t,n,r,i,a){var o=e._getDomain,s=cs(),c=s.tryCatch,l=s.errorObj,u=e._async;function d(e,t,n,r){this.constructor$(e),this._promise._captureStackTrace();var a=o();this._callback=a===null?t:s.domainBind(a,t),this._preservedValues=r===i?Array(this.length()):null,this._limit=n,this._inFlight=0,this._queue=[],u.invoke(this._asyncInit,this,void 0)}s.inherits(d,t),d.prototype._asyncInit=function(){this._init$(void 0,-2)},d.prototype._init=function(){},d.prototype._promiseFulfilled=function(t,n){var i=this._values,o=this.length(),s=this._preservedValues,u=this._limit;if(n<0){if(n=n*-1-1,i[n]=t,u>=1&&(this._inFlight--,this._drainQueue(),this._isResolved()))return!0}else{if(u>=1&&this._inFlight>=u)return i[n]=t,this._queue.push(n),!1;s!==null&&(s[n]=t);var d=this._promise,f=this._callback,p=d._boundValue();d._pushContext();var m=c(f).call(p,t,n,o),h=d._popContext();if(a.checkForgottenReturns(m,h,s===null?`Promise.map`:`Promise.filter`,d),m===l)return this._reject(m.e),!0;var g=r(m,this._promise);if(g instanceof e){g=g._target();var _=g._bitField;if(!(_&50397184))return u>=1&&this._inFlight++,i[n]=g,g._proxy(this,(n+1)*-1),!1;if(_&33554432)m=g._value();else if(_&16777216)return this._reject(g._reason()),!0;else return this._cancel(),!0}i[n]=m}return++this._totalResolved>=o?(s===null?this._resolve(i):this._filter(i,s),!0):!1},d.prototype._drainQueue=function(){for(var e=this._queue,t=this._limit,n=this._values;e.length>0&&this._inFlight<t;){if(this._isResolved())return;var r=e.pop();this._promiseFulfilled(n[r],r)}},d.prototype._filter=function(e,t){for(var n=t.length,r=Array(n),i=0,a=0;a<n;++a)e[a]&&(r[i++]=t[a]);r.length=i,this._resolve(r)},d.prototype.preservedValues=function(){return this._preservedValues};function f(t,r,i,a){if(typeof r!=`function`)return n(`expecting a function but got `+s.classString(r));var o=0;if(i!==void 0)if(typeof i==`object`&&i){if(typeof i.concurrency!=`number`)return e.reject(TypeError(`'concurrency' must be a number but it is `+s.classString(i.concurrency)));o=i.concurrency}else return e.reject(TypeError(`options argument must be an object but it is `+s.classString(i)));return o=typeof o==`number`&&isFinite(o)&&o>=1?o:0,new d(t,r,o,a).promise()}e.prototype.map=function(e,t){return f(this,e,t,null)},e.map=function(e,t,n,r){return f(e,t,n,r)}}})),Ds=s(((e,t)=>{var n=Object.create;if(n){var r=n(null),i=n(null);r[` size`]=i[` size`]=0}t.exports=function(e){var t=cs(),n=t.canEvaluate,a=t.isIdentifier,o,s,c=function(e){return Function(`ensureMethod`,`                                    
        return function(obj) {                                               
            'use strict'                                                     
            var len = this.length;                                           
            ensureMethod(obj, 'methodName');                                 
            switch(len) {                                                    
                case 1: return obj.methodName(this[0]);                      
                case 2: return obj.methodName(this[0], this[1]);             
                case 3: return obj.methodName(this[0], this[1], this[2]);    
                case 0: return obj.methodName();                             
                default:                                                     
                    return obj.methodName.apply(obj, this);                  
            }                                                                
        };                                                                   
        `.replace(/methodName/g,e))(d)},l=function(e){return Function(`obj`,`                                             
        'use strict';                                                        
        return obj.propertyName;                                             
        `.replace(`propertyName`,e))},u=function(e,t,n){var r=n[e];if(typeof r!=`function`){if(!a(e))return null;if(r=t(e),n[e]=r,n[` size`]++,n[` size`]>512){for(var i=Object.keys(n),o=0;o<256;++o)delete n[i[o]];n[` size`]=i.length-256}}return r};o=function(e){return u(e,c,r)},s=function(e){return u(e,l,i)};function d(n,r){var i;if(n!=null&&(i=n[r]),typeof i!=`function`){var a=`Object `+t.classString(n)+` has no method '`+t.toString(r)+`'`;throw new e.TypeError(a)}return i}function f(e){return d(e,this.pop()).apply(e,this)}e.prototype.call=function(e){for(var t=arguments.length,r=Array(Math.max(t-1,0)),i=1;i<t;++i)r[i-1]=arguments[i];if(n){var a=o(e);if(a!==null)return this._then(a,void 0,void 0,r,void 0)}return r.push(e),this._then(f,void 0,void 0,r,void 0)};function p(e){return e[this]}function m(e){var t=+this;return t<0&&(t=Math.max(0,t+e.length)),e[t]}e.prototype.get=function(e){var t=typeof e==`number`,r;if(t)r=m;else if(n){var i=s(e);r=i===null?p:i}else r=p;return this._then(r,void 0,void 0,e,void 0)}}})),Os=s(((e,t)=>{t.exports=function(e,t,n,r,i,a){var o=cs(),s=fs().TypeError,c=cs().inherits,l=o.errorObj,u=o.tryCatch,d={};function f(e){setTimeout(function(){throw e},0)}function p(e){var t=n(e);return t!==e&&typeof e._isDisposable==`function`&&typeof e._getDisposer==`function`&&e._isDisposable()&&t._setDisposable(e._getDisposer()),t}function m(t,r){var a=0,o=t.length,s=new e(i);function c(){if(a>=o)return s._fulfill();var i=p(t[a++]);if(i instanceof e&&i._isDisposable()){try{i=n(i._getDisposer().tryDispose(r),t.promise)}catch(e){return f(e)}if(i instanceof e)return i._then(c,f,null,null,null)}c()}return c(),s}function h(e,t,n){this._data=e,this._promise=t,this._context=n}h.prototype.data=function(){return this._data},h.prototype.promise=function(){return this._promise},h.prototype.resource=function(){return this.promise().isFulfilled()?this.promise().value():d},h.prototype.tryDispose=function(e){var t=this.resource(),n=this._context;n!==void 0&&n._pushContext();var r=t===d?null:this.doDispose(t,e);return n!==void 0&&n._popContext(),this._promise._unsetDisposable(),this._data=null,r},h.isDisposer=function(e){return e!=null&&typeof e.resource==`function`&&typeof e.tryDispose==`function`};function g(e,t,n){this.constructor$(e,t,n)}c(g,h),g.prototype.doDispose=function(e,t){return this.data().call(e,e,t)};function _(e){return h.isDisposer(e)?(this.resources[this.index]._setDisposable(e),e.promise()):e}function v(e){this.length=e,this.promise=null,this[e-1]=null}v.prototype._resultCancelled=function(){for(var t=this.length,n=0;n<t;++n){var r=this[n];r instanceof e&&r.cancel()}},e.using=function(){var r=arguments.length;if(r<2)return t(`you must pass at least 2 arguments to Promise.using`);var i=arguments[r-1];if(typeof i!=`function`)return t(`expecting a function but got `+o.classString(i));var s,c=!0;r===2&&Array.isArray(arguments[0])?(s=arguments[0],r=s.length,c=!1):(s=arguments,r--);for(var d=new v(r),f=0;f<r;++f){var p=s[f];if(h.isDisposer(p)){var g=p;p=p.promise(),p._setDisposable(g)}else{var y=n(p);y instanceof e&&(p=y._then(_,null,null,{resources:d,index:f},void 0))}d[f]=p}for(var b=Array(d.length),f=0;f<b.length;++f)b[f]=e.resolve(d[f]).reflect();var x=e.all(b).then(function(e){for(var t=0;t<e.length;++t){var n=e[t];if(n.isRejected())return l.e=n.error(),l;if(!n.isFulfilled()){x.cancel();return}e[t]=n.value()}S._pushContext(),i=u(i);var r=c?i.apply(void 0,e):i(e),o=S._popContext();return a.checkForgottenReturns(r,o,`Promise.using`,S),r}),S=x.lastly(function(){return m(d,new e.PromiseInspection(x))});return d.promise=S,S._setOnCancel(d),S},e.prototype._setDisposable=function(e){this._bitField|=131072,this._disposer=e},e.prototype._isDisposable=function(){return(this._bitField&131072)>0},e.prototype._getDisposer=function(){return this._disposer},e.prototype._unsetDisposable=function(){this._bitField&=-131073,this._disposer=void 0},e.prototype.disposer=function(e){if(typeof e==`function`)return new g(e,this,r());throw new s}}})),ks=s(((e,t)=>{t.exports=function(e,t,n){var r=cs(),i=e.TimeoutError;function a(e){this.handle=e}a.prototype._resultCancelled=function(){clearTimeout(this.handle)};var o=function(e){return s(+this).thenReturn(e)},s=e.delay=function(r,i){var s,c;return i===void 0?(s=new e(t),c=setTimeout(function(){s._fulfill()},+r),n.cancellation()&&s._setOnCancel(new a(c)),s._captureStackTrace()):(s=e.resolve(i)._then(o,null,null,r,void 0),n.cancellation()&&i instanceof e&&s._setOnCancel(i)),s._setAsyncGuaranteed(),s};e.prototype.delay=function(e){return s(e,this)};var c=function(e,t,n){var a=typeof t==`string`?new i(t):t instanceof Error?t:new i(`operation timed out`);r.markAsOriginatingFromRejection(a),e._attachExtraTrace(a),e._reject(a),n?.cancel()};function l(e){return clearTimeout(this.handle),e}function u(e){throw clearTimeout(this.handle),e}e.prototype.timeout=function(e,t){e=+e;var r,i,o=new a(setTimeout(function(){r.isPending()&&c(r,t,i)},e));return n.cancellation()?(i=this.then(),r=i._then(l,u,void 0,o,void 0),r._setOnCancel(o)):r=this._then(l,u,void 0,o,void 0),r}}})),As=s(((e,t)=>{t.exports=function(e,t,n,r,i,a){var o=fs().TypeError,s=cs(),c=s.errorObj,l=s.tryCatch,u=[];function d(t,n,i){for(var a=0;a<n.length;++a){i._pushContext();var o=l(n[a])(t);if(i._popContext(),o===c){i._pushContext();var s=e.reject(c.e);return i._popContext(),s}var u=r(o,i);if(u instanceof e)return u}return null}function f(t,r,i,o){if(a.cancellation()){var s=new e(n),c=this._finallyPromise=new e(n);this._promise=s.lastly(function(){return c}),s._captureStackTrace(),s._setOnCancel(this)}else (this._promise=new e(n))._captureStackTrace();this._stack=o,this._generatorFunction=t,this._receiver=r,this._generator=void 0,this._yieldHandlers=typeof i==`function`?[i].concat(u):u,this._yieldedPromise=null,this._cancellationPhase=!1}s.inherits(f,i),f.prototype._isResolved=function(){return this._promise===null},f.prototype._cleanup=function(){this._promise=this._generator=null,a.cancellation()&&this._finallyPromise!==null&&(this._finallyPromise._fulfill(),this._finallyPromise=null)},f.prototype._promiseCancelled=function(){if(!this._isResolved()){var t=this._generator.return!==void 0,n;if(t)this._promise._pushContext(),n=l(this._generator.return).call(this._generator,void 0),this._promise._popContext();else{var r=new e.CancellationError(`generator .return() sentinel`);e.coroutine.returnSentinel=r,this._promise._attachExtraTrace(r),this._promise._pushContext(),n=l(this._generator.throw).call(this._generator,r),this._promise._popContext()}this._cancellationPhase=!0,this._yieldedPromise=null,this._continue(n)}},f.prototype._promiseFulfilled=function(e){this._yieldedPromise=null,this._promise._pushContext();var t=l(this._generator.next).call(this._generator,e);this._promise._popContext(),this._continue(t)},f.prototype._promiseRejected=function(e){this._yieldedPromise=null,this._promise._attachExtraTrace(e),this._promise._pushContext();var t=l(this._generator.throw).call(this._generator,e);this._promise._popContext(),this._continue(t)},f.prototype._resultCancelled=function(){if(this._yieldedPromise instanceof e){var t=this._yieldedPromise;this._yieldedPromise=null,t.cancel()}},f.prototype.promise=function(){return this._promise},f.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver),this._receiver=this._generatorFunction=void 0,this._promiseFulfilled(void 0)},f.prototype._continue=function(t){var n=this._promise;if(t===c)return this._cleanup(),this._cancellationPhase?n.cancel():n._rejectCallback(t.e,!1);var i=t.value;if(t.done===!0)return this._cleanup(),this._cancellationPhase?n.cancel():n._resolveCallback(i);var a=r(i,this._promise);if(!(a instanceof e)&&(a=d(a,this._yieldHandlers,this._promise),a===null)){this._promiseRejected(new o(`A value %s was yielded that could not be treated as a promise

    See http://goo.gl/MqrFmX

`.replace(`%s`,i)+`From coroutine:
`+this._stack.split(`
`).slice(1,-7).join(`
`)));return}a=a._target();var s=a._bitField;s&50397184?s&33554432?e._async.invoke(this._promiseFulfilled,this,a._value()):s&16777216?e._async.invoke(this._promiseRejected,this,a._reason()):this._promiseCancelled():(this._yieldedPromise=a,a._proxy(this,null))},e.coroutine=function(e,t){if(typeof e!=`function`)throw new o(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);var n=Object(t).yieldHandler,r=f,i=Error().stack;return function(){var t=e.apply(this,arguments),a=new r(void 0,void 0,n,i),o=a.promise();return a._generator=t,a._promiseFulfilled(void 0),o}},e.coroutine.addYieldHandler=function(e){if(typeof e!=`function`)throw new o(`expecting a function but got `+s.classString(e));u.push(e)},e.spawn=function(n){if(a.deprecated(`Promise.spawn()`,`Promise.coroutine()`),typeof n!=`function`)return t(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);var r=new f(n,this),i=r.promise();return r._run(e.spawn),i}}})),js=s(((e,t)=>{t.exports=function(e){var t=cs(),n=e._async,r=t.tryCatch,i=t.errorObj;function a(e,a){var s=this;if(!t.isArray(e))return o.call(s,e,a);var c=r(a).apply(s._boundValue(),[null].concat(e));c===i&&n.throwLater(c.e)}function o(e,t){var a=this._boundValue(),o=e===void 0?r(t).call(a,null):r(t).call(a,null,e);o===i&&n.throwLater(o.e)}function s(e,t){var a=this;if(!e){var o=Error(e+``);o.cause=e,e=o}var s=r(t).call(a._boundValue(),e);s===i&&n.throwLater(s.e)}e.prototype.asCallback=e.prototype.nodeify=function(e,t){if(typeof e==`function`){var n=o;t!==void 0&&Object(t).spread&&(n=a),this._then(n,s,void 0,this,e)}return this}}})),Ms=s(((e,t)=>{t.exports=function(e,t){var n={},r=cs(),i=ys(),a=r.withAppended,o=r.maybeWrapAsError,s=r.canEvaluate,c=fs().TypeError,l=`Async`,u={__isPromisified__:!0},d=RegExp(`^(?:`+[`arity`,`length`,`name`,`arguments`,`caller`,`callee`,`prototype`,`__isPromisified__`].join(`|`)+`)$`),f=function(e){return r.isIdentifier(e)&&e.charAt(0)!==`_`&&e!==`constructor`};function p(e){return!d.test(e)}function m(e){try{return e.__isPromisified__===!0}catch{return!1}}function h(e,t,n){var i=r.getDataPropertyOrDefault(e,t+n,u);return i?m(i):!1}function g(e,t,n){for(var r=0;r<e.length;r+=2){var i=e[r];if(n.test(i)){for(var a=i.replace(n,``),o=0;o<e.length;o+=2)if(e[o]===a)throw new c(`Cannot promisify an API that has normal methods with '%s'-suffix

    See http://goo.gl/MqrFmX
`.replace(`%s`,t))}}}function _(e,t,n,i){for(var a=r.inheritedDataKeys(e),o=[],s=0;s<a.length;++s){var c=a[s],l=e[c],u=i===f?!0:f(c,l,e);typeof l==`function`&&!m(l)&&!h(e,c,t)&&i(c,l,e,u)&&o.push(c,l)}return g(o,t,n),o}var v=function(e){return e.replace(/([$])/,`\\$`)},y,b=function(e){for(var t=[e],n=Math.max(0,e-1-3),r=e-1;r>=n;--r)t.push(r);for(var r=e+1;r<=3;++r)t.push(r);return t},x=function(e){return r.filledRange(e,`_arg`,``)},S=function(e){return r.filledRange(Math.max(e,3),`_arg`,``)},C=function(e){return typeof e.length==`number`?Math.max(Math.min(e.length,1024),0):0};y=function(s,c,l,u,d,f){var p=Math.max(0,C(u)-1),m=b(p),h=typeof s==`string`||c===n;function g(e){var t=x(e).join(`, `),n=e>0?`, `:``;return(h?`ret = callback.call(this, {{args}}, nodeback); break;
`:c===void 0?`ret = callback({{args}}, nodeback); break;
`:`ret = callback.call(receiver, {{args}}, nodeback); break;
`).replace(`{{args}}`,t).replace(`, `,n)}function _(){for(var e=``,t=0;t<m.length;++t)e+=`case `+m[t]+`:`+g(m[t]);return e+=`                                                             
        default:                                                             
            var args = new Array(len + 1);                                   
            var i = 0;                                                       
            for (var i = 0; i < len; ++i) {                                  
               args[i] = arguments[i];                                       
            }                                                                
            args[i] = nodeback;                                              
            [CodeForCall]                                                    
            break;                                                           
        `.replace(`[CodeForCall]`,h?`ret = callback.apply(this, args);
`:`ret = callback.apply(receiver, args);
`),e}var v=typeof s==`string`?`this != null ? this['`+s+`'] : fn`:`fn`,y=`'use strict';                                                
        var ret = function (Parameters) {                                    
            'use strict';                                                    
            var len = arguments.length;                                      
            var promise = new Promise(INTERNAL);                             
            promise._captureStackTrace();                                    
            var nodeback = nodebackForPromise(promise, `+f+`);   
            var ret;                                                         
            var callback = tryCatch([GetFunctionCode]);                      
            switch(len) {                                                    
                [CodeForSwitchCase]                                          
            }                                                                
            if (ret === errorObj) {                                          
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);
            }                                                                
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     
            return promise;                                                  
        };                                                                   
        notEnumerableProp(ret, '__isPromisified__', true);                   
        return ret;                                                          
    `.replace(`[CodeForSwitchCase]`,_()).replace(`[GetFunctionCode]`,v);return y=y.replace(`Parameters`,S(p)),Function(`Promise`,`fn`,`receiver`,`withAppended`,`maybeWrapAsError`,`nodebackForPromise`,`tryCatch`,`errorObj`,`notEnumerableProp`,`INTERNAL`,y)(e,u,c,a,o,i,r.tryCatch,r.errorObj,r.notEnumerableProp,t)};function w(s,c,l,u,d,f){var p=(function(){return this})(),m=s;typeof m==`string`&&(s=u);function h(){var r=c;c===n&&(r=this);var l=new e(t);l._captureStackTrace();var u=typeof m==`string`&&this!==p?this[m]:s,d=i(l,f);try{u.apply(r,a(arguments,d))}catch(e){l._rejectCallback(o(e),!0,!0)}return l._isFateSealed()||l._setAsyncGuaranteed(),l}return r.notEnumerableProp(h,`__isPromisified__`,!0),h}var T=s?y:w;function E(e,t,i,a,o){for(var s=_(e,t,RegExp(v(t)+`$`),i),c=0,l=s.length;c<l;c+=2){var u=s[c],d=s[c+1],f=u+t;if(a===T)e[f]=T(u,n,u,d,t,o);else{var p=a(d,function(){return T(u,n,u,d,t,o)});r.notEnumerableProp(p,`__isPromisified__`,!0),e[f]=p}}return r.toFastProperties(e),e}function D(e,t,n){return T(e,t,void 0,e,null,n)}e.promisify=function(e,t){if(typeof e!=`function`)throw new c(`expecting a function but got `+r.classString(e));if(m(e))return e;t=Object(t);var i=D(e,t.context===void 0?n:t.context,!!t.multiArgs);return r.copyDescriptors(e,i,p),i},e.promisifyAll=function(e,t){if(typeof e!=`function`&&typeof e!=`object`)throw new c(`the target of promisifyAll must be an object or a function

    See http://goo.gl/MqrFmX
`);t=Object(t);var n=!!t.multiArgs,i=t.suffix;typeof i!=`string`&&(i=l);var a=t.filter;typeof a!=`function`&&(a=f);var o=t.promisifier;if(typeof o!=`function`&&(o=T),!r.isIdentifier(i))throw RangeError(`suffix must be a valid identifier

    See http://goo.gl/MqrFmX
`);for(var s=r.inheritedDataKeys(e),u=0;u<s.length;++u){var d=e[s[u]];s[u]!==`constructor`&&r.isClass(d)&&(E(d.prototype,i,a,o,n),E(d,i,a,o,n))}return E(e,i,a,o,n)}}})),Ns=s(((e,t)=>{t.exports=function(e,t,n,r){var i=cs(),a=i.isObject,o=ss(),s;typeof Map==`function`&&(s=Map);var c=(function(){var e=0,t=0;function n(n,r){this[e]=n,this[e+t]=r,e++}return function(r){t=r.size,e=0;var i=Array(r.size*2);return r.forEach(n,i),i}})(),l=function(e){for(var t=new s,n=e.length/2|0,r=0;r<n;++r){var i=e[n+r],a=e[r];t.set(i,a)}return t};function u(e){var t=!1,n;if(s!==void 0&&e instanceof s)n=c(e),t=!0;else{var r=o.keys(e),i=r.length;n=Array(i*2);for(var a=0;a<i;++a){var l=r[a];n[a]=e[l],n[a+i]=l}}this.constructor$(n),this._isMap=t,this._init$(void 0,-3)}i.inherits(u,t),u.prototype._init=function(){},u.prototype._promiseFulfilled=function(e,t){if(this._values[t]=e,++this._totalResolved>=this._length){var n;if(this._isMap)n=l(this._values);else{n={};for(var r=this.length(),i=0,a=this.length();i<a;++i)n[this._values[i+r]]=this._values[i]}return this._resolve(n),!0}return!1},u.prototype.shouldCopyValues=function(){return!1},u.prototype.getActualLength=function(e){return e>>1};function d(t){var i,o=n(t);if(a(o))i=o instanceof e?o._then(e.props,void 0,void 0,void 0,void 0):new u(o).promise();else return r(`cannot await properties of a non-object

    See http://goo.gl/MqrFmX
`);return o instanceof e&&i._propagateFrom(o,2),i}e.prototype.props=function(){return d(this)},e.props=function(e){return d(e)}}})),Ps=s(((e,t)=>{t.exports=function(e,t,n,r){var i=cs(),a=function(e){return e.then(function(t){return o(t,e)})};function o(o,s){var c=n(o);if(c instanceof e)return a(c);if(o=i.asArray(o),o===null)return r(`expecting an array or an iterable object but got `+i.classString(o));var l=new e(t);s!==void 0&&l._propagateFrom(s,3);for(var u=l._fulfill,d=l._reject,f=0,p=o.length;f<p;++f){var m=o[f];m===void 0&&!(f in o)||e.cast(m)._then(u,d,void 0,l,null)}return l}e.race=×}}óÊ×¬¢h­µçY]˜]ÊJ^ÚYŠ]\Ëœ›ÛÝ
\™]\›ˆ[Û]]\Ëž™Y‹]™™]ÚY”™YŠ\Ëœ›ÛÝ
KLÙ›ÜŠÛ‹š\ÊÚYØ
NÊ^ÚYŠ
ÊÜŒL
\™]\›ˆJÙX\˜Ú\[Z]™XXÚY›Üˆ‰Ý\Ë—Ý\_Hˆ™YK˜
K[Û]O[‹™Ù]
ÚYØ
NÚYŠP\œ˜^Kš\Ð\œ˜^JJJ\™]\›ˆ[Û]OLÏZK›[™ÝLNÙ›ÜŠØO[ÎÊ^Û]XJÛÏŒKÏ]™™]ÚY”™YŠVÜ—JKÏ\Ë™Ù]
[Z]Ø
NÚYŠO™™]ÚY”™YŠÖÌJJ[Ï\‹LNÙ[ÙHYŠO™™]ÚY”™YŠÖÌWJJXO\ŠÌNÙ[Ù^Û\ÎØœ™XZß_ZYŠO›Ê\™]\›ˆ[[]O[‹™Ù]
\Ë—Ý\JNÚYŠ\œ˜^Kš\Ð\œ˜^JJJ^Û]LZK›[™ÝLŽÙ›ÜŠÛ\ŽÊ^Û]O[ŠÜŒKÏXJÊIŒJKÏ]™™]ÚY”™YŠVÛ×JNÚYŠOÊ\[ËLŽÙ[ÙHYŠOœÊ[[ÊÌŽÙ[ÙH™]\›ˆVÛÊÌW__\™]\›ˆ[YÙ]
J^Ü™]\›ˆ\Ëž™Y‹™™]ÚY”™YŠ\Ë™Ù]˜]ÊJJ__K]OXÛ\ÜÈ^[™È	ØÛÛœÝXÝÜŠK
^ÜÝ\\ŠK˜[Y\Ø
__KOXÛ\ÜÈ^[™È	ØÛÛœÝXÝÜŠK
^ÜÝ\\ŠK[\Ø
__NÙ[˜Ý[ÛˆJ
^ÔÊ
K™J
KJ
KÜ‹˜ÛX[\

_Y[˜Ý[ÛˆJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÙKš\ÊQ˜
OÙK™Ù]
Q˜
N™Kš\Ê˜
OÙK™Ù]
˜
N™Kš\Ê[š^
OÙK™Ù]
[š^
N™Kš\ÊXXØ
OÙK™Ù]
XXØ
N™Kš\ÊÔØ
OÙK™Ù]
ÔØ
N›[›[Y[˜Ý[Ûˆ]JJ^Ü™]\›ˆKœÝXœÝš[™ÊK›\Ý[™^ÙŠØ
JÌJ_]˜\ˆ]OXÛ\ÜÞÈÙOHLNØÛÛœÝXÝÜŠKHLJ^ÙH[œÝ[˜Ù[Ùˆ‰‰Š\Ëž™Y]\Ëœ›ÛÝYKKš\Ê”Ø
I‰Š\Ë™œÏYK™Ù]
”Ø
JKKš\Ê‘˜
I‰J™[]Yš[HÜXÚYšXØ][ÛœÈ\™H›ÝÝ\ÜY
KŸ
Kš\ÊQ˜
OÝ\ËˆÙOHLJ›Û‹Y[X™YYš[HÜXÚYšXØ][ÛœÈ\™H›ÝÝ\ÜY
JJ_YÙ]š[[˜[YJ
^Û]OX\J\Ëœ›ÛÝ
NÜ™]\›ˆ	‰\[ÙˆOXÝš[™Ø	‰ŠOYÙJL
Kœ™\XÙP[

Kœ™\XÙP[
ØØ
Kœ™\XÙP[
Ø
JKŠ\Ëš[[˜[YX_[›˜[YY
_YÙ]ÛÛ[

^ÚYŠ]\ËˆÙJ\™]\›ˆ[Ý\Ë—ØÛÛ[™YŸ\J\Ëœ›ÛÝË™Ù]
Q˜
JNÛ]O[[ÚYŠ\Ë—ØÛÛ[™YŠ^Û]]\Ëž™Y‹™™]ÚY”™YŠ\Ë—ØÛÛ[™YŠNÝ[œÝ[˜Ù[ÙˆÙO]™Ù]ž]\Ê
NJ[X™YYš[HÜXÚYšXØ][ÛˆÚ[ÈÈ›Û‹Y^\Ý[™ËÚ[˜[YÛÛ[
_Y[ÙHJ[X™YYš[HÜXÚYšXØ][ÛˆÙ\È›Ý]™H[žHÛÛ[
NÜ™]\›ˆ_YÙ]\ØÜš\[ÛŠ
^Û]OX]\Ëœ›ÛÝË™Ù]
\ØØ
NÜ™]\›ˆ	‰\[ÙˆOXÝš[™Ø	‰ŠOYÙJ
JKŠ\Ë\ØÜš\[Û˜J_YÙ]Ù\šX[^˜X›J
^Ü™]\›žÜ˜]Ñš[[˜[YN\Ë™š[[˜[YKš[[˜[YNš]J\Ë™š[[˜[YJKÛÛ[\Ë˜ÛÛ[\ØÜš\[ÛŽ\Ë™\ØÜš\[ÛŸ__NÛ]ÝO^Ó›Ñ\œ›ÜŽŒ[™Ù‘ØÝ[Y[‹LK[\›Z[˜]YÙ]‹L‹[\›Z[˜]Y[XÛ\˜][ÛŽ‹LË[\›Z[˜]YØÝ\QXÛ\˜][ÛŽ‹M[\›Z[˜]YÛÛ[Y[‹MKX[›Ü›YY[[Y[‹M‹Ý]Ù“Y[[ÜžN‹MË[\›Z[˜]Y]šX]U˜[YN‹N[\›Z[˜]Y[[Y[‹NK[[Y[™]™\™YÝ[Ž‹LLNÙ[˜Ý[ÛˆÝJK
^Û]YVÝNÜ™]\›ˆOOXOOX˜OOX˜OOXXY[˜Ý[ÛˆÝJJ^Ù›ÜŠ]LYK›[™ÝÝŽÝ
ÊÊZYŠ\ÝJK
J\™]\›ˆLNÜ™]\›ˆL]˜\ˆOXÛ\ÜÞ×Ü™\ÛÛ™Q[]Y\ÊJ^Ü™]\›ˆKœ™\XÙP[
ÉŠ×Ž×JÊNËÙË
K
OOžÚYŠœÝXœÝš[™ÊŠOOOXÞ
\™]\›ˆÝš[™Ë™œ›ÛPÛÙTÚ[
\œÙR[
œÝXœÝš[™ÊŠKMŠJNÚYŠœÝXœÝš[™ÊJOOOXØ
\™]\›ˆÝš[™Ë™œ›ÛPÛÙTÚ[
\œÙR[
œÝXœÝš[™ÊJKL
JNÜÝÚ]Ú

^ØØ\ÙXœ™]\›˜ØØ\ÙXÝœ™]\›˜˜ØØ\ÙX[\œ™]\›˜	˜ØØ\ÙX][Ýœ™]\›˜˜ØØ\ÙX\ÜØœ™]\›˜	Ø\™]\›ˆ\Ë›Û”™\ÛÛ™Q[]J
_J_WÜ\œÙPÛÛ[
K
^Û]V×K]Ù[˜Ý[ÛˆJ
^Ù›ÜŠÜK›[™Ý	‰œÝJKŠNÊJÊÜŸY›ÜŠÜK›[™Ý	‰ˆ\ÝJKŠI‰™VÜ—HOOX˜	‰™VÜ—HOOXØÊJÊÜŽÛ]OYKœÝXœÝš[™ÊŠNÙ›ÜŠJ
NÜK›[™Ý	‰™VÜ—HOOX˜	‰™VÜ—HOOXØ	‰™VÜ—HOOXØÊ^ÚJ
NÛ]XOXÙ›ÜŠÜK›[™Ý	‰ˆ\ÝJKŠI‰™VÜ—HOOXXÊ]
ÏYVÜ—K
ÊÜŽÚYŠJ
KVÜ—HOOXX
\™]\›ˆ[ÊÊÜ‹J
NÛ]ÏYVÜ—NÚYŠÈOOX˜	‰›ÈOOX	Ø
\™]\›ˆ[Û]ÏYKš[™^ÙŠË
ÊÜŠNÚYŠÏ
\™]\›ˆ[ØOYKœÝXœÝš[™Ê‹ÊK‹œ\Ú
Û˜[YN˜[YN\Ë—Ü™\ÛÛ™Q[]Y\ÊJ_JK\ÊÌKJ
_\™]\›žÛ˜[YN˜K]šX]\Î›‹\œÙYœ‹]_WÜ\œÙT›ØÙ\ÜÚ[™Ò[œÝXÝ[ÛŠK
^Û]]Ù[˜Ý[ÛˆŠ
^Ù›ÜŠÛK›[™Ý	‰œÝJKŠNÊJÊÛŸY›ÜŠÛK›[™Ý	‰ˆ\ÝJKŠI‰™VÛ—HOOX˜	‰™VÛ—HOOXØ	‰™VÛ—HOOXØÊJÊÛŽÛ]OYKœÝXœÝš[™ÊŠNÜŠ
NÛ]O[ŽÙ›ÜŠÛK›[™Ý	‰ŠVÛ—HOOXØVÛŠÌWHOOX˜
NÊJÊÛŽÜ™]\›žÛ˜[YNšK˜[YN™KœÝXœÝš[™ÊKŠK\œÙY›‹]_\\œÙV[
J^Û]LÙ›ÜŠÝK›[™ÝÊ^Û]YVÝK]ÚYŠOOX
^ÊÊÜŽÛ]YVÜ—KŽÜÝÚ]Ú

^ØØ\ÙXØšYŠ
ÊÜ‹YKš[™^ÙŠ˜ŠK
^Ý\Ë›Û‘\œ›ÜŠÝK•[\›Z[˜]Y[[Y[
NÜ™]\›Ÿ]\Ë›Û‘[™[[Y[
KœÝXœÝš[™Ê‹ŠJK[ŠÌNØœ™XZÎØØ\ÙXØŠÊÜŽÛ]]\Ë—Ü\œÙT›ØÙ\ÜÚ[™Ò[œÝXÝ[ÛŠKŠNÚYŠKœÝXœÝš[™ÊŠÝœ\œÙYŠÝœ\œÙY
ÌŠHOOXÏ˜
^Ý\Ë›Û‘\œ›ÜŠÝK•[\›Z[˜]Y[XÛ\˜][ÛŠNÜ™]\›Ÿ]\Ë›Û”J›˜[YK˜[YJKŠÏ]œ\œÙY
ÌŽØœ™XZÎØØ\ÙXXšYŠKœÝXœÝš[™ÊŠÌKŠÌÊOOOXKX
^ÚYŠYKš[™^ÙŠKO˜ŠÌÊK
^Ý\Ë›Û‘\œ›ÜŠÝK•[\›Z[˜]YÛÛ[Y[
NÜ™]\›Ÿ]\Ë›ÛÛÛ[Y[
KœÝXœÝš[™ÊŠÌËŠJK[ŠÌßY[ÙHYŠKœÝXœÝš[™ÊŠÌKŠÎ
OOOXÐÑUVØ
^ÚYŠYKš[™^ÙŠWO˜ŠÎ
K
^Ý\Ë›Û‘\œ›ÜŠÝK•[\›Z[˜]YÙ]
NÜ™]\›Ÿ]\Ë›ÛÙ]JKœÝXœÝš[™ÊŠÎŠJK[ŠÌßY[ÙHYŠKœÝXœÝš[™ÊŠÌKŠÎ
OOOXÐÕTX
^Û]YKš[™^ÙŠØŠÎ
KOHLNÚYŠYKš[™^ÙŠ˜ŠÎ
K
^Ý\Ë›Û‘\œ›ÜŠÝK•[\›Z[˜]YØÝ\QXÛ\˜][ÛŠNÜ™]\›ŸZYŠŒ	‰›
^ÚYŠYKš[™^ÙŠO˜ŠÎ
K
^Ý\Ë›Û‘\œ›ÜŠÝK•[\›Z[˜]YØÝ\QXÛ\˜][ÛŠNÜ™]\›ŸZOHL[]OYKœÝXœÝš[™ÊŠÎŠÈ
ÈHZJNÝ\Ë›Û‘ØÝ\JJK[ŠÊOÌŽŒJ_Y[Ù^Ý\Ë›Û‘\œ›ÜŠÝK“X[›Ü›YY[[Y[
NÜ™]\›ŸXœ™XZÎÙY˜][›]O]\Ë—Ü\œÙPÛÛ[
KŠNÚYŠOOO[[
^Ý\Ë›Û‘\œ›ÜŠÝK“X[›Ü›YY[[Y[
NÜ™]\›Ÿ[]OHLNÚYŠKœÝXœÝš[™ÊŠÚKœ\œÙYŠÚKœ\œÙY
ÌŠOOOXÏ˜
XOHLÙ[ÙHYŠKœÝXœÝš[™ÊŠÚKœ\œÙYŠÚKœ\œÙY
ÌJHOOX˜
^Ý\Ë›Û‘\œ›ÜŠÝK•[\›Z[˜]Y[[Y[
NÜ™]\›Ÿ]\Ë›Û™YÚ[‘[[Y[
K›˜[YKK˜]šX]\ËJKŠÏZKœ\œÙY
ÊOÌŽŒJNØœ™XZß_Y[Ù^Ù›ÜŠÜK›[™Ý	‰™VÜ—HOOXÊ\ŠÊÎÛ]YKœÝXœÝš[™ÊŠNÝ\Ë›Û•^
\Ë—Ü™\ÛÛ™Q[]Y\ÊŠJ_]\Ÿ_[Û”™\ÛÛ™Q[]JJ^Ü™]\›˜	‰Ù_NØ[Û”JK
^ß[ÛÛÛ[Y[
J^ß[ÛÙ]JJ^ß[Û‘ØÝ\JJ^ß[Û•^
J^ß[Û™YÚ[‘[[Y[
KŠ^ß[Û‘[™[[Y[
J^ß[Û‘\œ›ÜŠJ^ß_K]OXÛ\ÜÞØÛÛœÝXÝÜŠK
^Ý\Ë››ÙS˜[YOYK\Ë››ÙU˜[YO]Øš™XÝ™Yš[™T›Ü\J\Ë\™[›ÙXÝ˜[YN›[Üš]X›NˆLJ_YÙ]š\œÝÚ[

^Ü™]\›ˆ\Ë˜Ú[›Ù\ÏË–Ì_YÙ]™^ÚX›[™Ê
^Û]O]\Ëœ\™[›ÙK˜Ú[›Ù\ÎÚYŠYJ\™]\›ŽÛ]YKš[™^ÙŠ\ÊNÚYŠOOKLJ\™]\›ˆVÝ
ÌW_YÙ]^ÛÛ[

^Ü™]\›ˆ\Ë˜Ú[›Ù\ÏÝ\Ë˜Ú[›Ù\Ë›X\
OO™K^ÛÛ[
Kš›Ú[Š
N\Ë››ÙU˜[Y_YÙ]Ú[™[Š
^Ü™]\›ˆ\Ë˜Ú[›Ù\ß×_Z\ÐÚ[›Ù\Ê
^Ü™]\›ˆ\Ë˜Ú[›Ù\ÏË›[™ÝŒ\ÙX\˜Ú›ÙJK
^ÚYŠYK›[™Ý
\™]\›ˆ\ÎÛ]YVÝNÚYŠ‹›˜[YKœÝ\ÕÚ]
Ø
I‰K›[™ÝLJ\™]\›ˆ\ËœÙX\˜Ú›ÙJK
ÌJNÛ]V×KO]\ÎÙ›ÜŠÎÊ^ÚYŠ‹›˜[YOOOZK››ÙS˜[YJZYŠ‹œÜÏOOL
^Û]ZKœÙX\˜Ú›ÙJK
ÌJNÚYŠˆOO[[
\™]\›ˆŸY[ÙHYŠ‹›[™ÝOOL
\™]\›ˆ[Ù[Ù^Û]ØWO\‹œÜ

KÏLÙ›ÜŠ]ˆÙˆK˜Ú[›Ù\ÊZYŠ‹›˜[YOOO\‹››ÙS˜[YJ^ÚYŠÏOO[‹œÜÊ\™]\›ˆ‹œÙX\˜Ú›ÙJK
ÌJNÛÊÊß\™]\›ˆKœÙX\˜Ú›ÙJK
ÌJ_ZYŠK˜Ú[›Ù\ÏË›[™ÝŒ
\‹œ\Ú
ÚKJKOZK˜Ú[›Ù\ÖÌNÙ[ÙHYŠ‹›[™ÝOOL
\™]\›ˆ[Ù[Ù^Ù›ÜŠÜ‹›[™ÝOOLÊ^Û]ÙKO\‹œÜ

K]
ÌNÚYŠK˜Ú[›Ù\Ë›[™Ý
^Ü‹œ\Ú
ÙK—JKOYK˜Ú[›Ù\ÖÛ—NØœ™XZß_ZYŠ‹›[™ÝOOL
\™]\›ˆ[__Y[\
J^ÚYŠ\Ë››ÙS˜[YOOOXÝ^
^ÙKœ\Ú
Ý
\Ë››ÙU˜[YJJNÜ™]\›ŸZYŠKœ\Ú
	Ý\Ë››ÙS˜[Y_X
K\Ë˜]šX]\ÊY›ÜŠ]Ùˆ\Ë˜]šX]\ÊYKœ\Ú
	Ý›˜[Y_OH‰ÐÝ
˜[YJ_H˜
NÚYŠ\Ëš\ÐÚ[›Ù\Ê
J^ÙKœ\Ú
˜
NÙ›ÜŠ]Ùˆ\Ë˜Ú[›Ù\Ê]™[\
JNÙKœ\Ú
ÉÝ\Ë››ÙS˜[Y_O˜
_Y[ÙH\Ë››ÙU˜[YOÙKœ\Ú
‰ÐÝ
\Ë››ÙU˜[YJ_OÉÝ\Ë››ÙS˜[Y_O˜
N™Kœ\Ú
Ï˜
__KOXÛ\ÜÈ^[™È^ØÛÛœÝXÝÜŠÚ\Ð]šX]\Î™OHLKÝÙ\Ø\ÙS˜[YNHL_J^ÜÝ\\Š
K\Ë—ØÝ\œ™[œ˜YÛY[[[\Ë—ÜÝXÚÏ[[\Ë—Ù\œ›ÜÛÙO[ÝK“›Ñ\œ›Ü‹\Ë—Ú\Ð]šX]\ÏYK\Ë—ÛÝÙ\Ø\ÙS˜[YO]\\œÙQœ›ÛTÝš[™ÊJ^ÚYŠ\Ë—ØÝ\œ™[œ˜YÛY[V×K\Ë—ÜÝXÚÏV×K\Ë—Ù\œ›ÜÛÙO[ÝK“›Ñ\œ›Ü‹\Ëœ\œÙV[
JK\Ë—Ù\œ›ÜÛÙHOO[ÝK“›Ñ\œ›ÜŠ\™]\›ŽÛ]ÝO]\Ë—ØÝ\œ™[œ˜YÛY[ÚYŠ
\™]\›žÙØÝ[Y[[[Y[_[Û•^
J^ÚYŠÝJJJ\™]\›ŽÛ][™]È]JÝ^JNÝ\Ë—ØÝ\œ™[œ˜YÛY[œ\Ú

_[ÛÙ]JJ^Û][™]È]JÝ^JNÝ\Ë—ØÝ\œ™[œ˜YÛY[œ\Ú

_[Û™YÚ[‘[[Y[
KŠ^Ý\Ë—ÛÝÙ\Ø\ÙS˜[YI‰ŠOYKÓÝÙ\Ø\ÙJ
JNÛ][™]È]JJNÜ‹˜Ú[›Ù\ÏV×K\Ë—Ú\Ð]šX]\É‰Š‹˜]šX]\Ï]
K\Ë—ØÝ\œ™[œ˜YÛY[œ\Ú
ŠK[‰‰Š\Ë—ÜÝXÚËœ\Ú
\Ë—ØÝ\œ™[œ˜YÛY[
K\Ë—ØÝ\œ™[œ˜YÛY[\‹˜Ú[›Ù\Ê_[Û‘[™[[Y[
J^Ý\Ë—ØÝ\œ™[œ˜YÛY[]\Ë—ÜÝXÚËœÜ

_×NÛ]]\Ë—ØÝ\œ™[œ˜YÛY[˜]
LJNÚYŠ]
\™]\›ˆ[Ù›ÜŠ]HÙˆ˜Ú[›Ù\ÊYKœ\™[›ÙO]Ü™]\›ˆ[Û‘\œ›ÜŠJ^Ý\Ë—Ù\œ›ÜÛÙOY__KOXÛ\ÜÞØÛÛœÝXÝÜŠJ^ÙO]\Ë—Ü™\Z\ŠJNÛ][™]ÈJÛÝÙ\Ø\ÙS˜[YNˆLJKœ\œÙQœ›ÛTÝš[™ÊJNÝ\Ë—ÛY]Y]SX\[™]ÈX\\Ë—Ù]OYK	‰\Ë—Ü\œÙJ
_WÜ™\Z\ŠJ^Ü™]\›ˆKœ™\XÙJ×–×JËË
Kœ™\XÙP[
Ï—ÍÍ—ÍÍÊ×JÊKÙË[˜Ý[ÛŠK
^Û]]œ™\XÙP[
×
ÌL×JJÌM×JJÌM×JKÙË[˜Ý[ÛŠK‹Š^Ü™]\›ˆÝš[™Ë™œ›ÛPÚ\ÛÙJ

ÛŠŽ
ÜŠŒJ_JKœ™\XÙP[
ÉŠ[\\ÜßÝ][Ý
NËÙË[˜Ý[ÛŠK
^ÜÝÚ]Ú

^ØØ\ÙX[\œ™]\›˜	˜ØØ\ÙX\ÜØœ™]\›˜	ØØØ\ÙXÝœ™]\›˜˜ØØ\ÙXœ™]\›˜ØØ\ÙX][Ýœ™]\›˜˜]›ÝÈ\œ›ÜŠÜ™\Z\Žˆ	ÝH\Û—	ÝYš[™Y˜
_JKVØ˜NÙ›ÜŠ]OL[‹›[™ÝÙOÙJÏLŠ^Û][‹˜Ú\ÛÙP]
JJŒMŠÛ‹˜Ú\ÛÙP]
JÌJNÝLÌ‰‰LÉ‰OOMŒ	‰OOMŒ‰‰OOLÎÜ‹œ\Ú
Ýš[™Ë™œ›ÛPÚ\ÛÙJ
JNœ‹œ\Ú
	ˆÞ
ÊMLÍŠÝ
KÔÝš[™ÊMŠKœÝXœÝš[™ÊJJØØ
_\™]\›ˆ‹š›Ú[Š
_J_WÙÙ]Ù\]Y[˜ÙJJ^Û]YK››ÙS˜[YNÜ™]\›ˆOOX™Ž˜˜YØ	‰OOX™ŽœÙ\X	‰OOX™Ž˜[Û[™K˜Ú[›Ù\Ë™š[\ŠOO™K››ÙS˜[YOOOX™Ž›X
_WÜ\œÙP\œ˜^JJ^ÚYŠYKš\ÐÚ[›Ù\Ê
J\™]\›ŽÛ]ÝOYK˜Ú[›Ù\Ë]\Ë—ÙÙ]Ù\]Y[˜ÙJ
_×NÝ\Ë—ÛY]Y]SX\œÙ]
K››ÙS˜[YK‹›X\
OO™K^ÛÛ[š[J
JJ_WÜ\œÙJJ^Û]YK™ØÝ[Y[[[Y[ÚYŠ››ÙS˜[YHOOX™Žœ™˜
Y›ÜŠ]™š\œÝÚ[Ý	‰››ÙS˜[YHOOX™Žœ™˜Ê]]›™^ÚX›[™ÎÚYŠJ]››ÙS˜[YHOOX™Žœ™˜]š\ÐÚ[›Ù\Ê
JJ^Ù›ÜŠ]HÙˆ˜Ú[›Ù\ÊZYŠK››ÙS˜[YOOOX™Ž™\ØÜš\[Û˜
Y›ÜŠ]ÙˆK˜Ú[›Ù\Ê^Û]O]››ÙS˜[YNÜÝÚ]Ú
J^ØØ\ÙXÝ^˜ÛÛ[YNØØ\ÙXÎ˜Ü™X]Ü˜˜Ø\ÙXÎœÝXš™XÝ\Ë—Ü\œÙP\œ˜^J
NØÛÛ[Y_]\Ë—ÛY]Y]SX\œÙ]
K^ÛÛ[š[J
J___YÙ]Ù\šX[^˜X›J
^Ü™]\›žÜ\œÙY]N\Ë—ÛY]Y]SX\˜]Ñ]N\Ë—Ù]___NÛ]O^ÔQÑWÐÓÓ•S•ŒKÕ‘PSWÐÓÓ•S•Œ‹Ð’‘PÕŒËS““ÕUSÓŽSSQS•_NÝ˜\ˆ]OXÛ\ÜÈ^ØÛÛœÝXÝÜŠKŠ^Ý\Ëž™YYK\Ë™XÝ]\Ëœ™Y[ˆ[œÝ[˜Ù[ÙˆÛŽ›[\Ëœ›ÛSX\[™]ÈX\\ËœÝXÝ\™[YÏ[[Z[š]

^Ý\Ëœ™XY›ÛSX\

_HÙJKŠ^ÚYŠJH[œÝ[˜Ù[ÙˆŠ_
\™]\›ŽÝ\ËœÝXÝ\™[Yß[™]ÈNÛ]]\ËœÝXÝ\™[YË™Ù]
JNÜŸ
V×K\ËœÝXÝ\™[YËœ]
KŠJK‹œ\Ú
Ý—J_XY[››Ý][Û’YÔYÙJK
^Ý\ËˆÙJKKS““ÕUSÓŠ_\™XY›ÛSX\

^Û]O]\Ë™XÝ™Ù]
›ÛSX\
NÚYŠH[œÝ[˜Ù[ÙˆŠY›ÜŠ]Ý—[ÙˆJ[ˆ[œÝ[˜Ù[Ùˆ	‰\Ëœ›ÛSX\œÙ]
‹›˜[YJ_\Ý]XÈ\Þ[˜ÈØ[Ü™X]TÝXÝ\™U™YJØØ][ÙÔ™YŽ™K“X[˜YÙ\Ž™]Ð[››Ý][ÛœÐžTYÙN›ŸJ^ÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆJØ[››ÝØ]™HHÝXÝ™YNˆ›ÈØ][ÙÈ™Y™\™[˜ÙK˜
KLNÛ]LOHLÙ›ÜŠ]ÙKW[ÙˆŠ^Û]Ü™YŽ›ŸOX]ØZ]™Ù]YÙJJNÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ^ÐJØ[››ÝØ]™HHÝXÝ™YNˆYÙH	Ù_H\È›È™Y‹˜
KOHLØœ™XZßY›ÜŠ]HÙˆJYK˜XØÙ\ÜÚXš[]Q]OË\I‰ŠKœ\™[™YRY\ŠÊËOHLJ_ZYŠJ^Ù›ÜŠ]HÙˆ‹˜[Y\Ê
JY›ÜŠ]ÙˆJY[]Hœ\™[™YRYÜ™]\›ˆL_\™]\›ˆL\Ý]XÈ\Þ[˜ÈÜ™X]TÝXÝ\™U™YJÛ™]Ð[››Ý][ÛœÐžTYÙN™K™YŽØ][ÙÔ™YŽ›‹“X[˜YÙ\Žœ‹Ú[™Ù\Îš_J^Û]OX]ØZ]‹™[œÝ\™PØ][ÙÊÛÛ™QXÝ
KÏ[™]ÈNÛËœ]
‹JNÛ]Ï]™Ù]™]Õ[\Ü˜\žT™YŠ
NØKœÙ]
ÝXÝ™YT›ÛÝÊNÛ]Ï[™]ÈŠ
NØËœÙ]
\X™Ù]
ÝXÝ™YT›ÛÝ
JNÛ]]™Ù]™]Õ[\Ü˜\žT™YŠ
NØËœÙ]
\™[™YX
NÛ]OV×NØËœÙ]
ØJKËœ]
ËÊNÛ][™]ÈŠ
KV×NÙœÙ]
[\ØŠNÛ]X]ØZ]\ËˆÝ
Û™]Ð[››Ý][ÛœÐžTYÙN™KÝXÝ™YT›ÛÝ™YŽœËÝXÝ™YT›ÛÝ›[ÚYÎK[\Î™‹™YŽ“X[˜YÙ\Žœ‹Ú[™Ù\ÎšKØXÚN›ßJNØËœÙ]
\™[™YS™^Ù^X
KËœ]

NÙ›ÜŠ]ÙK[ÙˆËš][\Ê
JZKœ]
KÙ]NJ_X\Þ[˜ÈØ[•\]TÝXÝ™YJÜ“X[˜YÙ\Ž™]Ð[››Ý][ÛœÐžTYÙN›ŸJ^ÚYŠ]\Ëœ™YŠ\™]\›ˆJØ[››Ý\]HHÝXÝ™YNˆ›È›ÛÝ™Y™\™[˜ÙK˜
KLNÛ]]\Ë™XÝ™Ù]
\™[™YS™^Ù^X
NÚYŠS[X™\‹š\Ò[YÙ\ŠŠ_
\™]\›ˆJØ[››Ý\]HHÝXÝ™YNˆ[˜[Y™^Ù^K˜
KLNÛ]O]\Ë™XÝ™Ù]
\™[™YX
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆJØ[››Ý\]HHÝXÝ™YNˆ\™[™YH\Û—	ÝHXÝ˜
KLNÛ]OZK™Ù]
[\Ø
NÚYŠP\œ˜^Kš\Ð\œ˜^JJJ\™]\›ˆJØ[››Ý\]HHÝXÝ™YNˆ[\È\Û—	Ý[ˆ\œ˜^K˜
KLNÛ]Ï[™]ÈJK\Ëž™YŠNÙ›ÜŠ]HÙˆ‹šÙ^\Ê
J^Û]ÜYÙQXÝ›ŸOX]ØZ]™Ù]YÙJJNÚYŠ[‹š\ÊÝXÝ\™[Ø
JXÛÛ[YNÛ][‹™Ù]
ÝXÝ\™[Ø
NÚYŠS[X™\‹š\Ò[YÙ\ŠŠ_P\œ˜^Kš\Ð\œ˜^JË™Ù]
ŠJJ\™]\›ˆJØ[››ÝØ]™HHÝXÝ™YNˆYÙH	Ù_H\ÈHÜ›Û™ÈY˜
KL_[]ÏHLÙ›ÜŠ]ÚKW[ÙˆŠ^Û]ÜYÙQXÝ›ŸOX]ØZ]™Ù]YÙJJNÙKˆÜŠÙ[[Y[Î˜K™YŽ\Ëž™Y‹YÙQXÝ›‹[X™\•™YN›ßJNÙ›ÜŠ]HÙˆJYK˜XØÙ\ÜÚXš[]Q]OË\I‰ŠK˜XØÙ\ÜÚXš[]Q]KœÝXÝ\™[L
Kœ\™[™YRY\ŠÊÊKÏHLJ_ZYŠÊ^Ù›ÜŠ]HÙˆ‹˜[Y\Ê
JY›ÜŠ]ÙˆJY[]Hœ\™[™YRY[]HœÝXÝ™YT\™[Ü™]\›ˆL_\™]\›ˆLX\Þ[˜È\]TÝXÝ\™U™YJÛ™]Ð[››Ý][ÛœÐžTYÙN“X[˜YÙ\Ž›‹Ú[™Ù\ÎœŸJ^Û]Ü™YŽšK™YŽ˜_O]\ËÏ]\Ë™XÝ˜ÛÛ™J
KÏ[™]ÈNÜËœ]
KÊNÛ]Ï[Ë™Ù]˜]Ê\™[™YX
KØÈ[œÝ[˜Ù[ÙˆÛXK™™]Ú
ÊNŠXËÏXK™Ù]™]Õ[\Ü˜\žT™YŠ
KËœÙ]
\™[™YXÊJK[˜ÛÛ™J
KËœ]
Ë
NÛ]O[™Ù]˜]Ê[\Ø
K[[ÝH[œÝ[˜Ù[Ùˆ‰‰Š]KOXK™™]Ú

JKO]KœÛXÙJ
KœÙ]
[\ØJNÛ]X]ØZ]KˆÝ
Û™]Ð[››Ý][ÛœÐžTYÙNÝXÝ™YT›ÛÝ™YŽšKÝXÝ™YT›ÛÝ\ËÚYÎ›[[\ÎK™YŽ˜K“X[˜YÙ\Ž›‹Ú[™Ù\Îœ‹ØXÚNœßJNÚYŠˆOOKLJ^ÛËœÙ]
\™[™YS™^Ù^XŠK	‰œËœ]
JNÙ›ÜŠ]ÙK[ÙˆËš][\Ê
J\‹œ]
KÙ]NJ__\Ý]XÈ\Þ[˜ÈÝ
Û™]Ð[››Ý][ÛœÐžTYÙNÝXÝ™YT›ÛÝ™YŽ›‹ÝXÝ™YT›ÛÝœ‹ÚYÎšK[\Î˜K™YŽ›Ë“X[˜YÙ\ŽœËÚ[™Ù\Î˜ËØXÚN›J^Û]OS™Ù]
Ð’”˜
KKLKŽÙ›ÜŠ]ÜW[Ùˆ
^Û]X]ØZ]Ë™Ù]YÙJ
KÜ™YŽšO]ÏZ[œÝ[˜Ù[ÙˆŽÙ›ÜŠ]ØXØÙ\ÜÚXš[]Q]NœË™YŽ—Ë\™[™YRY‹ÝXÝ™YT\™[ž_[ÙˆJ^ÚYŠ\ÏË\JXÛÛ[YNÛ]ÜÝXÝ\™[›_O\ÎÚYŠ‰‰“[X™\‹š\Ò[YÙ\ŠJI‰›OL
^Û]JŸ[™]ÈX\
K™Ù]

NÛOO]›ÚY	‰Š[™]ÈÝJ‹œYÙQXÝ
K˜ÛÛXÝØš™XÝÊ
K‹œÙ]
ŠJNÛ]O[Ë™Ù]
JNÚYŠJ^Û][Ë™™]Ú
JK˜ÛÛ™J
NÙKˆÛŠÊKËœ]
KÙ]NJNØÛÛ[Y__YSX]›X^
ŠNÛ][Ë™Ù]™]Õ[\Ü˜\žT™YŠ
K[™]ÈŠÊNÙKˆÛŠÊK]ØZ]\ËˆÚJÜÝXÝ™YT\™[žKYÑXÝž™]ÕYÔ™YŽ˜‹ÝXÝ™YT›ÛÝ™YŽ›‹˜[˜XÚÒÚYÎšK™YŽ›ËØXÚN›JNÛ]Ï[™]ÈŠÊNÞœÙ]
ØÊKËœÙ]
\XJKÉ‰”ËœÙ]
Ø
KËœÙ]
Øš˜ÊKœ]
‹
KKœ\Ú
‹Š__\™]\›ˆ
Ì_\Ý]XÈÛŠKÝ\N]N›‹[™Îœ‹[šK^[™Y˜KXÝX[^›ßJ^ÙKœÙ]
Ø™Ù]

JK‰‰™KœÙ]
Ý
ŠJK‰‰™KœÙ]
[™ØÝ
ŠJKI‰™KœÙ]
[Ý
JJKI‰™KœÙ]
XÝ
JJKÉ‰™KœÙ]
XÝX[^Ý
ÊJ_\Ý]XÈÜŠÙ[[Y[Î™K™YŽYÙQXÝ›‹[X™\•™YNœŸJ^Û]O[™]ÈX\Ù›ÜŠ]ÙˆJZYŠœÝXÝ™YT\™[Y
^Û]O\\œÙR[
œÝXÝ™YT\™[YœÜ]
ÛXØ
VÌWKL
KZK™Ù]
JNÛŸ
V×KKœÙ]
KŠJK‹œ\Ú

_[]O[‹™Ù]
ÝXÝ\™[Ø
NÚYŠS[X™\‹š\Ò[YÙ\ŠJJ\™]\›ŽÛ]Ï\‹™Ù]
JKÏJK‹ŠOOžÛ]OZK™Ù]
JNÚYŠJ^Û]O[‹™Ù]˜]Ê
KO]™™]ÚY”™YŠJNÚYŠH[œÝ[˜Ù[Ùˆ‰‰šH[œÝ[˜Ù[ÙˆŠ^Û]O^Ü™YŽœ‹XÝ›ŸNÙ›ÜŠ]ÙˆJ]œÝXÝ™YT\™[Y_\™]\›ˆL\™]\›ˆL_NÙ›ÜŠ]HÙˆÊ^ÚYŠJH[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÛ]]™™]Ú
JK[‹™Ù]
Ø
NÚYŠ[X™\‹š\Ò[YÙ\ŠŠJ^ÜÊ‹‹JNØÛÛ[Y_ZYŠ\œ˜^Kš\Ð\œ˜^JŠJY›ÜŠ]HÙˆŠ^ÚYŠO]™™]ÚY”™YŠJK[X™\‹š\Ò[YÙ\ŠJI‰œÊK‹JJXœ™XZÎÚYŠJH[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÚYŠT™JK™Ù]
\X
KPÔ˜
JXœ™XZÎÛ]ZK™Ù]
PÒQ
NÚYŠ[X™\‹š\Ò[YÙ\ŠŠI‰œÊ‹‹JJXœ™XZß__\Ý]XÈ\Þ[˜ÈÚJÜÝXÝ™YT\™[™KYÑXÝ™]ÕYÔ™YŽ›‹ÝXÝ™YT›ÛÝ™YŽœ‹˜[˜XÚÒÚYÎšK™YŽ˜KØXÚN›ßJ^Û]Ï[[ÎÙOÊÜ™YŽœßOYKÏYK™XÝ™Ù]˜]Ê
_ŠN˜Ï\‹œÙ]
ÊNÛ]XK™™]ÚY”™YŠÊNÚYŠ[
^ÚKœ\Ú
ŠNÜ™]\›Ÿ[]O[Ë™Ù]
ÊNÝ_
O[˜ÛÛ™J
KËœ]
ËJJNÛ]]K™Ù]˜]ÊØ
KY[œÝ[˜Ù[ÙˆÛË™Ù]

N›[ÚYŠYŠ^ÙXK™™]ÚY”™YŠ
KP\œ˜^Kš\Ð\œ˜^JŠOÙ‹œÛXÙJ
N–ÙNÛ]OXK™Ù]™]Õ[\Ü˜\žT™YŠ
NÝKœÙ]
ØJKËœ]
KŠ_[]Y‹š[™^ÙŠÊNÙ‹œÜXÙJLÜ
ÌN™‹›[™ÝŠ__KOXÛ\ÜÞØÛÛœÝXÝÜŠK
^Ý\Ë™YOYK\Ëž™YYKž™Y‹\Ë™XÝ]\ËšÚYÏV×K\Ëœ\œÙRÚYÊ
_YÙ]›ÛJ
^Û]O]\Ë™XÝ™Ù]
Ø
KYH[œÝ[˜Ù[ÙˆÙK›˜[YN˜Ü›ÛÝ›ŸO]\Ë™YNÜ™]\›ˆ‹œ›ÛSX\™Ù]

OÏÝ\\œÙRÚYÊ
^Û]O[[]\Ë™XÝ™Ù]˜]ÊØ
NÝ[œÝ[˜Ù[Ùˆ‰‰ŠO]ÔÝš[™Ê
JNÛ]]\Ë™XÝ™Ù]
Ø
NÚYŠ\œ˜^Kš\Ð\œ˜^JŠJY›ÜŠ]ÙˆŠ^Û]]\Ëœ\œÙRÚY
K\Ëž™Y‹™™]ÚY”™YŠ
JNÛ‰‰\ËšÚYËœ\Ú
Š_Y[Ù^Û]]\Ëœ\œÙRÚY
KŠNÝ	‰\ËšÚYËœ\Ú

__\\œÙRÚY
K
^ÚYŠ[X™\‹š\Ò[YÙ\Š
J\™]\›ˆ\Ë™YKœYÙQXÝ›Øš’YOOYOÛ™]ÈÝJÝ\NœK”QÑWÐÓÓ•S•XÚYYÙSØš’Y™_JN›[ÚYŠJ[œÝ[˜Ù[ÙˆŠJ\™]\›ˆ[Û]]™Ù]˜]ÊØ
NÛˆ[œÝ[˜Ù[Ùˆ‰‰ŠO[‹ÔÝš[™Ê
JNÛ]]™Ù]
\X
Z[œÝ[˜Ù[ÙˆÝ™Ù]
\X
K›˜[YN›[ÚYŠOOXPÔ˜
^ÚYŠ\Ë™YKœYÙQXÝ›Øš’YOOYJ\™]\›ˆ[Û]]™Ù]˜]ÊÝX
NÜ™]\›ˆ™]ÈÝJÝ\NœK”Õ‘PSWÐÓÓ•S•™Y“Øš’Y›ˆ[œÝ[˜Ù[ÙˆÛ‹ÔÝš[™Ê
N›[YÙSØš’Y™KXÚY™Ù]
PÒQ
_J_ZYŠOOXÐ’”˜
^ÚYŠ\Ë™YKœYÙQXÝ›Øš’YOOYJ\™]\›ˆ[Û]]™Ù]˜]ÊØš˜
NÜ™]\›ˆ™]ÈÝJÝ\NœK“Ð’‘PÕ™Y“Øš’Y›ˆ[œÝ[˜Ù[ÙˆÛ‹ÔÝš[™Ê
N›[YÙSØš’Y™_J_\™]\›ˆ™]ÈÝJÝ\NœK‘SSQS•XÝJ__KÝOXÛ\ÜÞØÛÛœÝXÝÜŠÝ\N™KXÝ[[XÚY›[[YÙSØš’Yœ[[™Y“Øš’YšO[[J^Ý\Ë\OYK\Ë™XÝ]\Ë›XÚY[‹\ËœYÙSØš’Y\‹\Ëœ™Y“Øš’YZK\Ëœ\™[›ÙO[[_KÝOXÛ\ÜÞØÛÛœÝXÝÜŠK
^Ý\Ëœ›ÛÝYK\Ëž™YYOËž™YÏÛ[\Ëœ›ÛÝXÝYOË™XÝÏÛ[\ËœYÙQXÝ]\Ë››Ù\ÏV×_XÛÛXÝØš™XÝÊJ^ÚYŠ]\Ëœ›ÛÝ]\Ëœ›ÛÝXÝJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆ[Û]]\Ëœ›ÛÝXÝ™Ù]
\™[™YX
NÚYŠ]
\™]\›ˆ[Û]]\Ëœ›ÛÝœÝXÝ\™[YÏË™Ù]
JNÚYŠ[Š\™]\›ˆ[Û][™]ÈX\O[™]ÈJ\Ëž™YŠNÙ›ÜŠ]ÙW[ÙˆŠ^Û]ZK™Ù]˜]ÊJNÝ[œÝ[˜Ù[Ùˆ‰‰œ‹œÙ]
K
_\™]\›ˆŸ\\œÙJJ^ÚYŠ]\Ëœ›ÛÝ]\Ëœ›ÛÝXÝJH[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]]\Ëœ›ÛÝXÝ™Ù]
\™[™YX
NÚYŠ]
\™]\›ŽÛ]]\ËœYÙQXÝ™Ù]
ÝXÝ\™[Ø
K]\Ëœ›ÛÝœÝXÝ\™[YÏË™Ù]
JNÚYŠS[X™\‹š\Ò[YÙ\ŠŠI‰ˆ\Š\™]\›ŽÛ]O[™]ÈX\O[™]ÈJ\Ëž™YŠNÚYŠ[X™\‹š\Ò[YÙ\ŠŠJ^Û]OXK™Ù]
ŠNÚYŠ\œ˜^Kš\Ð\œ˜^JJJY›ÜŠ]ÙˆJ][œÝ[˜Ù[Ùˆ‰‰\Ë˜Y›ÙJ\Ëž™Y‹™™]Ú

KJ_ZYŠŠY›ÜŠ]ÙK[ÙˆŠ^Û]XK™Ù]
JNÚYŠŠ^Û]O]\Ë˜Y›ÙJ\Ëž™Y‹™™]ÚY”™YŠŠKJNÙOËšÚYÏË›[™ÝOOLI‰™KšÚYÖÌK\OOO\K“Ð’‘PÕ	‰ŠKšÚYÖÌK\O]
___XY›ÙJKL
^ÚYŠ
\™]\›ˆJÝXÝ™YHPVÑT™XXÚY˜
K[ÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆ[ÚYŠš\ÊJJ\™]\›ˆ™Ù]
JNÛ][™]ÈJ\ËJNÝœÙ]
KŠNÛ]OYK™Ù]

NÚYŠJH[œÝ[˜Ù[ÙˆŠ_™JK™Ù]
\X
KÝXÝ™YT›ÛÝ
J\™]\›ˆ\Ë˜YÜ]™[›ÙJKŠ_™[]JJKŽÛ]O]\Ë˜Y›ÙJKŠÌJNÚYŠXJ\™]\›ˆŽÛ]ÏHLNÙ›ÜŠ]ÙˆKšÚYÊ]\OOO\K‘SSQS•	‰™XÝOOYI‰Šœ\™[›ÙO\‹ÏHL
NÜ™]\›ˆß™[]JJKŸXYÜ]™[›ÙJK
^Û]]\Ëœ›ÛÝXÝ™Ù]
Ø
NÚYŠ[Š\™]\›ˆLNÚYŠˆ[œÝ[˜Ù[ÙˆŠ\™]\›ˆ‹›Øš’YOOYK›Øš’YÊ\Ë››Ù\ÖÌO]L
NˆLNÚYŠP\œ˜^Kš\Ð\œ˜^JŠJ\™]\›ˆLÛ]HLNÙ›ÜŠ]OLÚO‹›[™ÝÚJÊÊ[–ÚWOËÔÝš[™Ê
OOOYK›Øš’Y	‰Š\Ë››Ù\ÖÚWO]HL
NÜ™]\›ˆŸYÙ]Ù\šX[^˜X›J
^Ù[˜Ý[ÛˆJ‹L
^ÚYŠ
^ÐJÝXÝ™YHÛÈY\È™H[HÙ\šX[^™Y˜
NÜ™]\›Ÿ[]OSØš™XÝ˜Ü™X]J[
NÚKœ›ÛO]œ›ÛKK˜Ú[™[V×K‹˜Ú[™[‹œ\Ú
JNÛ]O]™XÝ™Ù]
[
NÝ\[ÙˆHOXÝš[™Ø	‰ŠO]™XÝ™Ù]
XÝX[^
JK\[ÙˆOOXÝš[™Ø	‰ŠK˜[YÙJJJNÛ]Ï]™XÝ™Ù]
X
NÚYŠÈ[œÝ[˜Ù[ÙˆŠ^Û]OZ
Ë™Ù]\œ˜^J›Þ
K[
NÚYŠJZK˜˜›ÞYNÙ[Ù^Û]O[Ë™Ù]
ÚY
K[Ë™Ù]
ZYÚ
NÝ\[ÙˆOOX[X™\˜	‰™OŒ	‰\[ÙˆOX[X™\˜	‰Œ	‰ŠK˜˜›ÞVÌKJ__[]Ï]™XÝ™Ù]
[™Ø
NÝ\[ÙˆÏOXÝš[™Ø	‰ŠK›[™ÏYÙJÊJNÙ›ÜŠ]ˆÙˆšÚYÊ^Û][‹\OOO\K‘SSQS•Û‹œ\™[›ÙN›[ÚYŠ
^ÙJKŠÌJNØÛÛ[Y_Y[ÙH‹\OOO\K”QÑWÐÓÓ•S•‹\OOO\K”Õ‘PSWÐÓÓ•S•ÚK˜Ú[™[‹œ\Ú
Ý\N˜ÛÛ[Y˜	Û‹œYÙSØš’YWÛXÉÛ‹›XÚYXJN›‹\OOO\K“Ð’‘PÕÚK˜Ú[™[‹œ\Ú
Ý\N˜Øš™XÝY›‹œ™Y“Øš’YJN›‹\OOO\KS““ÕUSÓ‰‰šK˜Ú[™[‹œ\Ú
Ý\N˜[››Ý][Û˜Y˜šœ×Ú[\›˜[ÚYÉÛ‹œ™Y“Øš’YXJ__[]SØš™XÝ˜Ü™X]J[
NÝ˜Ú[™[V×Kœ›ÛOX›ÛÝÙ›ÜŠ]ˆÙˆ\Ë››Ù\Ê[‰‰™J‹
NÜ™]\›ˆ_NÛ]O]ÙK˜š[™
[OO™H[œÝ[˜Ù[Ùˆ‹™JNÙ[˜Ý[Ûˆ]JJ^Ü™]\›ˆH[œÝ[˜Ù[Ùˆ‰‰ŠOYK™Ù]

JKJJOÙN›[Y[˜Ý[ÛˆJJ^Û]YK™Ù]

NÚYŠ
^ÚYŠ[œÝ[˜Ù[Ùˆ	‰Š]›˜[YJK\[ÙˆOXÝš[™Ø
\™]\›ˆÙJL
NÚYŠJ
J\™]\›ˆ”ÓÓ‹œÝš[™ÚYžJ
_\™]\›ˆ[]˜\ˆOXÛ\ÜÈ^ÈÙO[[ÈÝ[[ØZ[[ÓX\ØXÚO[™]ÈX\Ù›ÛØXÚO[™]ÈNÙÛØ˜[ÛÛÜ”ÜXÙPØXÚO[™]È˜ÎÙÛØ˜[[XYÙPØXÚO[™]È˜ÎÛ›Û›[™[Ù\ÔÙ][™]ÈYNÜYÙQXÝØXÚO[™]ÈNÜYÙR[™^ØXÚO[™]ÈNÜYÙRÚYÐÛÝ[ØXÚO[™]ÈNÜÝ[™\™›Û]PØXÚO[™]ÈX\ÜÞ\Ý[Q›ÛØXÚO[™]ÈX\ØÛÛœÝXÝÜŠK
^ÚYŠ\Ëœ“X[˜YÙ\YK\Ëž™Y]\ËˆÝ]™Ù]Ø][ÙÓØšŠ
KJ\ËˆÝ[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJØ][ÙÈØš™XÝ\È›ÝHXÝ[Û˜\žK˜
NÝ\ËÜ]™[YÙ\ÑXÝXÛÛ™QXÝ

^Ü™]\›ˆ\ËˆÝ˜ÛÛ™J
_YÙ]™\œÚ[ÛŠ
^Û]O]\ËˆÝ™Ù]
™\œÚ[Û˜
NÚYŠH[œÝ[˜Ù[Ùˆ
^ÚYŠK\Ý
K›˜[YJJ\™]\›ˆŠ\Ë™\œÚ[Û˜K›˜[YJNÐJ[˜[YˆØ][ÙÈ™\œÚ[ÛŽˆ	ÙK›˜[Y_X
_\™]\›ˆŠ\Ë™\œÚ[Û˜[
_YÙ][™Ê
^Û]O]\ËˆÝ™Ù]
[™Ø
NÜ™]\›ˆŠ\Ë[™ØI‰\[ÙˆOOXÝš[™ØÙÙJJN›[
_YÙ]™YYÔ™[™\š[™Ê
^Û]O]\ËˆÝ™Ù]
™YYÔ™[™\š[™Ø
NÜ™]\›ˆŠ\Ë™YYÔ™[™\š[™Ø\[ÙˆOOX›ÛÛX[˜ÙNˆLJ_YÙ]ÛÛXÝ[ÛŠ
^Û]O[[Ýž^Û]]\ËˆÝ™Ù]
ÛÛXÝ[Û˜
NÝ[œÝ[˜Ù[Ùˆ‰‰œÚ^™OŒ	‰ŠO]
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÚÊØ[››Ý™]ÚÛÛXÝ[Ûˆ[žNÈ\ÜÝ[Z[™È›ÈÛÛXÝ[Ûˆ\È™\Ù[˜
_\™]\›ˆŠ\ËÛÛXÝ[Û˜J_YÙ]XÜ›Ñ›Ü›J
^Û]O[[Ýž^Û]]\ËˆÝ™Ù]
XÜ›Ñ›Ü›X
NÝ[œÝ[˜Ù[Ùˆ‰‰œÚ^™OŒ	‰ŠO]
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÚÊØ[››Ý™]ÚXÜ›Ñ›Ü›H[žNÈ\ÜÝ[Z[™È›È›Ü›\È\™H™\Ù[˜
_\™]\›ˆŠ\ËXÜ›Ñ›Ü›XJ_YÙ]XÜ›Ñ›Ü›T™YŠ
^Û]O]\ËˆÝ™Ù]˜]ÊXÜ›Ñ›Ü›X
NÜ™]\›ˆŠ\ËXÜ›Ñ›Ü›T™Y˜H[œÝ[˜Ù[ÙˆÙN›[
_YÙ]Y]Y]J
^Û]O]\ËˆÝ™Ù]˜]ÊY]Y]X
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆŠ\ËY]Y]X[
NÛ][[Ýž^Û]]\Ëž™Y‹™™]Ú
K]\Ëž™Y‹™[˜Üž\Ë™[˜Üž\Y]Y]JNÚYŠˆ[œÝ[˜Ù[Ùˆ‰‰›‹™XÝ[œÝ[˜Ù[ÙˆŠ^Û]O[‹™XÝ™Ù]
\X
K[‹™XÝ™Ù]
ÝX\X
NÚYŠ™JKY]Y]X
I‰”™J‹S
J^Û]OWÙJ‹™Ù]Ýš[™Ê
JNÙI‰Š[™]ÈJJKœÙ\šX[^˜X›J___XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÚÊÚÚ\[™È[˜[YY]Y]Nˆ‰Ù_H‹˜
_\™]\›ˆŠ\ËY]Y]X
_YÙ]X\šÒ[™›Ê
^Û]O[[Ýž^ÙO]\ËˆÛŠ
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ[˜X›HÈ™XYX\šÈ[™›Ë˜
_\™]\›ˆŠ\ËX\šÒ[™›ØJ_HÛŠ
^Û]O]\ËˆÝ™Ù]
X\šÒ[™›Ø
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆ[Û]^ÓX\šÙYˆLK\Ù\”›Ü\Y\ÎˆLKÝ\ÜXÝÎˆL_NÙ›ÜŠ]ˆ[ˆ
^Û]YK™Ù]
ŠNÝ\[ÙˆOX›ÛÛX[˜	‰ŠÛ—O\Š_\™]\›ˆYÙ]ÝXÝ™YT›ÛÝ

^Û]O[[Ýž^ÙO]\ËˆÜŠ
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ[˜X›H™XYÈÝXÝ™YT›ÛÝ[™›Ë˜
_\™]\›ˆŠ\ËÝXÝ™YT›ÛÝJ_HÜŠ
^Û]O]\ËˆÝ™Ù]˜]ÊÝXÝ™YT›ÛÝ
K]\Ëž™Y‹™™]ÚY”™YŠJNÚYŠJ[œÝ[˜Ù[ÙˆŠJ\™]\›ˆ[Û][™]È]J\Ëž™Y‹JNÜ™]\›ˆ‹š[š]

KŸYÙ]Ü]™[YÙ\ÑXÝ

^Û]O]\ËˆÝ™Ù]
YÙ\Ø
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJ[˜[YÜ[]™[YÙ\ÈXÝ[Û˜\žK˜
NÜ™]\›ˆŠ\ËÜ]™[YÙ\ÑXÝJ_YÙ]ØÝ[Y[Ý][™J
^Û]O[[Ýž^ÙO]\ËˆÚJ
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ[˜X›HÈ™XYØÝ[Y[Ý][™K˜
_\™]\›ˆŠ\ËØÝ[Y[Ý][™XJ_HÚJ
^Û]]\ËˆÝ™Ù]
Ý][™\Ø
NÚYŠJ[œÝ[˜Ù[ÙˆŠ_
]™Ù]˜]Êš\œÝ
KJ[œÝ[˜Ù[ÙˆŠJJ\™]\›ˆ[Û]^Ú][\Î–×_KVÞÛØšŽ\™[›ŸWKO[™]ÈYNÚKœ]

NÛ]O]\Ëž™Y‹Ï[™]ÈZ[Û[\Y\œ˜^JÊNÙ›ÜŠÜ‹›[™ÝŒÊ^Û]\‹œÚY

KÏXK™™]ÚY”™YŠ‹›ØšŠNÚYŠÏOO[[
XÛÛ[YNÜËš\Ê]X
_J[˜[YÝ][™H][H[˜ÛÝ[\™Y˜
NÛ]Ï^Ý\››[\Ý›[XÝ[ÛŽ›[NÙKœ\œÙQ\ÝXÝ[Û˜\žJÙ\ÝXÝœË™\Ý[ØšŽ˜ËØÐ˜\ÙU\›\Ë˜˜\ÙU\›ØÐ]XÚY[Î\Ë˜]XÚY[ßJNÛ]\Ë™Ù]
]X
KO\Ë™Ù]
˜
_\Ë™Ù]\œ˜^JØ
K\Ë™Ù]
ÛÝ[
K[ÎÙ
ÊI‰ŠÌHOOLÌWHOOLÌ—HOOL
I‰ŠS‹œ™Ø‹™Ù]™ØŠ
JNÛ]O^ØXÝ[ÛŽ˜Ë˜XÝ[Û‹]XÚY[˜Ë˜]XÚY[\Ý˜Ë™\Ý\›˜Ë\›[œØY™U\›˜Ë[œØY™U\›™]ÕÚ[™ÝÎ˜Ë›™]ÕÚ[™ÝËÙ]ÐÑÔÝ]N˜ËœÙ]ÐÑÔÝ]K]N\[ÙˆOXÝš[™ØÙÙJ
N˜ÛÛÜŽœÛÝ[“[X™\‹š\Ò[YÙ\ŠŠOÙŽ›ÚY›ÛˆHJIŒŠK][XÎˆHJIŒJK][\Î–×_NÛ‹œ\™[š][\Ëœ\Ú
JK\Ë™Ù]˜]Êš\œÝ
K[œÝ[˜Ù[Ùˆ‰‰ˆZKš\Ê
I‰Š‹œ\Ú
ÛØšŽ\™[›_JKKœ]

JK\Ë™Ù]˜]Ê™^
K[œÝ[˜Ù[Ùˆ‰‰ˆZKš\Ê
I‰Š‹œ\Ú
ÛØšŽ\™[›‹œ\™[JKKœ]

J_\™]\›ˆ‹š][\Ë›[™ÝŒÛ‹š][\Î›[YÙ]\›Z\ÜÚ[ÛœÊ
^Û]O[[Ýž^ÙO]\ËˆØJ
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ[˜X›HÈ™XY\›Z\ÜÚ[ÛœË˜
_\™]\›ˆŠ\Ë\›Z\ÜÚ[ÛœØJ_HØJ
^Û]O]\Ëž™Y‹˜Z[\‹™Ù]
[˜Üž\
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆ[Û]YK™Ù]

NÚYŠ\[ÙˆOX[X™\˜
\™]\›ˆ[Ý
ÏLŠŠŒÌŽÛ]V×NÙ›ÜŠ]H[ˆ
^Û]YÙWNÝ	œ‰‰›‹œ\Ú
Š_\™]\›ˆŸYÙ]Ü[Û˜[ÛÛ[ÛÛ™šYÊ
^Û]O[[Ýž^Û]]\ËˆÝ™Ù]
ÐÔ›Ü\Y\Ø
NÚYŠ]
\™]\›ˆŠ\ËÜ[Û˜[ÛÛ[ÛÛ™šYØ[
NÛ]]™Ù]

NÚYŠ[Š\™]\›ˆŠ\ËÜ[Û˜[ÛÛ[ÛÛ™šYØ[
NÛ]]™Ù]
ÐÑÜØ
NÚYŠP\œ˜^Kš\Ð\œ˜^JŠJ\™]\›ˆŠ\ËÜ[Û˜[ÛÛ[ÛÛ™šYØ[
NÛ]O[™]ÈNÙ›ÜŠ]HÙˆŠHJH[œÝ[˜Ù[ÙˆŠ_Kš\ÊJ_Kœ]
K\ËˆÛÊJJNÙO]\ËˆÜÊ‹J_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ[˜X›HÈ™XYÜ[Û˜[ÛÛ[ÛÛ™šYÎˆ	Ù_X
_\™]\›ˆŠ\ËÜ[Û˜[ÛÛ[ÛÛ™šYØJ_HÛÊJ^Û]]\Ëž™Y‹™™]Ú
JK^ÚY™KÔÝš[™Ê
K˜[YN›[[[›[\ØYÙNžÜš[›[šY]Î›[K˜‘Ü›Ý\Î–×_K]™Ù]
˜[YX
NÝ\[ÙˆOXÝš[™Ø	‰Š‹›˜[YOYÙJŠJNÛ]O]™Ù]\œ˜^J[[
NÐ\œ˜^Kš\Ð\œ˜^JJ_
OVÚWJKK™]™\žJOO™H[œÝ[˜Ù[Ùˆ
I‰Š‹š[[ZK›X\
OO™K›˜[YJJNÛ]O]™Ù]
\ØYÙX
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆŽÛ]Ï[‹\ØYÙKÏXK™Ù]
š[
NÚYŠÈ[œÝ[˜Ù[ÙˆŠ^Û]O\Ë™Ù]
š[Ý]X
NÚYŠH[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
K›˜[YJ^ØØ\ÙXÓ˜˜Ø\ÙXÑ‘˜›Ëœš[^Üš[Ý]N™K›˜[Y___[]ÏXK™Ù]
šY]Ø
NÚYŠÈ[œÝ[˜Ù[ÙˆŠ^Û]OXË™Ù]
šY]ÔÝ]X
NÚYŠH[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
K›˜[YJ^ØØ\ÙXÓ˜˜Ø\ÙXÑ‘˜›ËšY]Ï^ÝšY]ÔÝ]N™K›˜[Y___\™]\›ˆŸHÜÊK
^Ù[˜Ý[ÛˆŠJ^Û]V×NÚYŠ\œ˜^Kš\Ð\œ˜^JJJY›ÜŠ]ˆÙˆJ\ˆ[œÝ[˜Ù[Ùˆ‰‰š\ÊŠI‰›‹œ\Ú
‹ÔÝš[™Ê
JNÜ™]\›ˆŸY[˜Ý[ÛˆŠKL
^ÚYŠP\œ˜^Kš\Ð\œ˜^JJJ\™]\›ˆ[Û]V×NÙ›ÜŠ]HÙˆJ^ÚYŠH[œÝ[˜Ù[Ùˆ‰‰š\ÊJJ^ÜËœ]
JK‹œ\Ú
KÔÝš[™Ê
JNØÛÛ[Y_[]OZJKŠNÙI‰œ‹œ\Ú
J_ZYŠŒ
\™]\›ˆŽÛ]OV×NÙ›ÜŠ]ÙW[Ùˆš][\Ê
J\Ëš\ÊJ_Kœ\Ú
KÔÝš[™Ê
JNÜ™]\›ˆK›[™Ý	‰œ‹œ\Ú
Û˜[YN›[Ü™\Ž˜_JKŸY[˜Ý[ÛˆJK
^ÚYŠ
ÊÝ˜Ê\™]\›ˆJ\œÙS™\ÝYÜ™\ˆH™XXÚYPVÓ‘TÕQÓU‘SË˜
K[Û][Ë™™]ÚY”™YŠJNÚYŠP\œ˜^Kš\Ð\œ˜^JŠJ\™]\›ˆ[Û]O[Ë™™]ÚY”™YŠ–ÌJNÚYŠ\[ÙˆHOXÝš[™Ø
\™]\›ˆ[Û]O\Š‹œÛXÙJJK
NÜ™]\›ˆOË›[™ÝÞÛ˜[YN™ÙJJKÜ™\Ž˜_N›[Y[˜Ý[ÛˆJJ^ÚYŠ\œ˜^Kš\Ð\œ˜^JJJY›ÜŠ]ˆÙˆJ^Û]O[Ë™™]ÚY”™YŠŠNÚYŠP\œ˜^Kš\Ð\œ˜^JJ_YK›[™Ý
XÛÛ[YNÛ][™]ÈÙ]Ù›ÜŠ]ˆÙˆJ[ˆ[œÝ[˜Ù[Ùˆ‰‰š\ÊŠI‰ˆ\‹š\Ê‹ÔÝš[™Ê
JI‰Š‹˜Y
‹ÔÝš[™Ê
JK™Ù]
ŠKœ˜‘Ü›Ý\Ëœ\Ú
ŠJ__[]Ï]\Ëž™Y‹Ï[™]ÈYKÏLLÜ™]\›ˆJK™Ù]
‘Ü›Ý\Ø
JKÛ˜[YN\[ÙˆK™Ù]
˜[YX
OOXÝš[™ØÙÙJK™Ù]
˜[YX
JN›[Ü™X]ÜŽ\[ÙˆK™Ù]
Ü™X]Ü˜
OOXÝš[™ØÙÙJK™Ù]
Ü™X]Ü˜
JN›[˜\ÙTÝ]N™K™Ù]
˜\ÙTÝ]X
Z[œÝ[˜Ù[ÙˆÙK™Ù]
˜\ÙTÝ]X
K›˜[YN›[ÛŽ›ŠK™Ù]
Ó˜
JKÙ™Ž›ŠK™Ù]
Ñ‘˜
JKÜ™\ŽœŠK™Ù]
Ü™\˜
JKÜ›Ý\Î–Ë‹‹__\Ù]XÝX[[TYÙ\ÊO[[
^Ý\ËˆÙOY_YÙ]\ÐXÝX[[TYÙ\Ê
^Ü™]\›ˆ\ËˆÙHOO[[YÙ]ÜYÙ\ÐÛÝ[

^Û]O]\ËÜ]™[YÙ\ÑXÝ™Ù]
ÛÝ[
NÚYŠS[X™\‹š\Ò[YÙ\ŠJJ]›ÝÈ™]ÈJYÙHÛÝ[[ˆÜ[]™[YÙ\ÈXÝ[Û˜\žH\È›Ý[ˆ[YÙ\‹˜
NÜ™]\›ˆŠ\ËÜYÙ\ÐÛÝ[J_YÙ][TYÙ\Ê
^Ü™]\›ˆ\ËˆÙOÏÝ\Ë—ÜYÙ\ÐÛÝ[YÙ]\Ý[˜][ÛœÊ
^Û]O]\ËˆØÊ
KSØš™XÝ˜Ü™X]J[
NÙ›ÜŠ]ˆÙˆJZYŠˆ[œÝ[˜Ù[Ùˆ]JY›ÜŠ]ÙK—[Ùˆ‹™Ù][

J^Û]^]JŠNÛ‰‰ŠÙÙJKL
WO[Š_Y[ÙHYŠˆ[œÝ[˜Ù[ÙˆŠY›ÜŠ]ÙK—[ÙˆŠ^Û]^]JŠNÛ‰‰ŠÙÙJKL
W_[Š_\™]\›ˆŠ\Ë\Ý[˜][ÛœØ
_YÙ]\Ý[˜][ÛŠJ^ÚYŠ\Ëš\ÓÝÛ”›Ü\J\Ý[˜][ÛœØ
J\™]\›ˆ\Ë™\Ý[˜][ÛœÖÙWOÏÛ[Û]]\ËˆØÊ
NÙ›ÜŠ]ˆÙˆ
ZYŠˆ[œÝ[˜Ù[Ùˆ]_ˆ[œÝ[˜Ù[ÙˆŠ^Û]^]J‹™Ù]
JJNÚYŠ
\™]\›ˆZYŠ›[™Ý
^Û]]\Ë™\Ý[˜][ÛœÖÙWNÚYŠ
\™]\›ˆ\™]\›ˆ[HØÊ
^Û]O]\ËˆÝ™Ù]
˜[Y\Ø
KV×NÜ™]\›ˆOËš\Ê\ÝØ
I‰œ\Ú
™]È]JK™Ù]˜]Ê\ÝØ
K\Ëž™YŠJK\ËˆÝš\Ê\ÝØ
I‰œ\Ú
\ËˆÝ™Ù]
\ÝØ
JKYÙ]YÙSX™[Ê
^Û]O[[Ýž^ÙO]\ËˆÛ

_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ[˜X›HÈ™XYYÙHX™[Ë˜
_\™]\›ˆŠ\ËYÙSX™[ØJ_HÛ

^Û]O]\ËˆÝ™Ù]˜]ÊYÙSX™[Ø
NÚYŠYJ\™]\›ˆ[Û]P\œ˜^J\Ë›[TYÙ\ÊK[[XO[™]ÈJK\Ëž™YŠK™Ù][

KOXÏLNÙ›ÜŠ]OLÏ]\Ë›[TYÙ\ÎÙOÎÙJÊÊ^Û]ÏZK™Ù]
JNÚYŠÈOO]›ÚY
^ÚYŠJÈ[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJYÙSX™[\È›ÝHXÝ[Û˜\žK˜
NÚYŠËš\Ê\X
I‰ˆT™JË™Ù]
\X
KYÙSX™[
J]›ÝÈ™]ÈJ[˜[Y\H[ˆYÙSX™[XÝ[Û˜\žK˜
NÚYŠËš\ÊØ
J^Û]O\Ë™Ù]
Ø
NÚYŠJH[œÝ[˜Ù[Ùˆ
J]›ÝÈ™]ÈJ[˜[YÝ[H[ˆYÙSX™[XÝ[Û˜\žK˜
NÛYK›˜[Y_Y[ÙH[[ÚYŠËš\Ê
J^Û]O\Ë™Ù]

NÚYŠ\[ÙˆHOXÝš[™Ø
]›ÝÈ™]ÈJ[˜[Y™Yš^[ˆYÙSX™[XÝ[Û˜\žK˜
NÜYÙJJ_Y[ÙHXÚYŠËš\ÊÝ
J^Û]O\Ë™Ù]
Ý
NÚYŠJ[X™\‹š\Ò[YÙ\ŠJI‰™OLJJ]›ÝÈ™]ÈJ[˜[YÝ\[ˆYÙSX™[XÝ[Û˜\žK˜
NÛÏY_Y[ÙHÏL_\ÝÚ]Ú
Š^ØØ\ÙX˜O[ÎØœ™XZÎØØ\ÙX˜˜Ø\ÙX˜˜OZ]
ËOOX˜
NØœ™XZÎØØ\ÙXX˜Ø\ÙXX›]O[OOXXÎMÎK[ËLNØOTÝš[™Ë™œ›ÛPÚ\ÛÙJJÝ	LŠKœ™\X]
X]™›ÛÜŠÌŠJÌJNØœ™XZÎÙY˜][šYŠŠ]›ÝÈ™]ÈJ[˜[YÝ[H‰ÛŸHˆ[ˆYÙSX™[XÝ[Û˜\žK˜
NØOX]ÙWO\ŠØKÊÊß\™]\›ˆYÙ]YÙS^[Ý]

^Û]O]\ËˆÝ™Ù]
YÙS^[Ý]
KXÚYŠH[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
K›˜[YJ^ØØ\ÙXÚ[™ÛTYÙX˜Ø\ÙXÛ™PÛÛ[[˜˜Ø\ÙXÛÐÛÛ[[“Y˜Ø\ÙXÛÐÛÛ[[”šYÚ˜Ø\ÙXÛÔYÙSY˜Ø\ÙXÛÔYÙTšYÚYK›˜[Y_\™]\›ˆŠ\ËYÙS^[Ý]
_YÙ]YÙS[ÙJ
^Û]O]\ËˆÝ™Ù]
YÙS[ÙX
KX\ÙS›Û™XÚYŠH[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
K›˜[YJ^ØØ\ÙX\ÙS›Û™X˜Ø\ÙX\ÙSÝ][™\Ø˜Ø\ÙX\ÙU[XœØ˜Ø\ÙX[ØÜ™Y[˜˜Ø\ÙX\ÙSÐØ˜Ø\ÙX\ÙP]XÚY[ØYK›˜[Y_\™]\›ˆŠ\ËYÙS[ÙX
_YÙ]šY]Ù\”™Y™\™[˜Ù\Ê
^Û]O]\ËˆÝ™Ù]
šY]Ù\”™Y™\™[˜Ù\Ø
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆŠ\ËšY]Ù\”™Y™\™[˜Ù\Ø[
NÛ][[Ù›ÜŠ]Û‹—[ÙˆJ^Û]NÜÝÚ]Ú
Š^ØØ\ÙXYUÛÛ˜\˜˜Ø\ÙXYSY[X˜\˜˜Ø\ÙXYUÚ[™ÝÕRX˜Ø\ÙXš]Ú[™ÝØ˜Ø\ÙXÙ[\•Ú[™ÝØ˜Ø\ÙX\Ü^QØÕ]X˜Ø\ÙXXÚÕ˜^PžT”Ú^™X\[ÙˆOX›ÛÛX[˜	‰ŠO\ŠNØœ™XZÎØØ\ÙX›Û‘[ØÜ™Y[”YÙS[ÙXšYŠˆ[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
‹›˜[YJ^ØØ\ÙX\ÙS›Û™X˜Ø\ÙX\ÙSÝ][™\Ø˜Ø\ÙX\ÙU[XœØ˜Ø\ÙX\ÙSÐØ™O\‹›˜[YNØœ™XZÎÙY˜][™OX\ÙS›Û™XXœ™XZÎØØ\ÙX\™XÝ[Û˜šYŠˆ[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
‹›˜[YJ^ØØ\ÙX”˜˜Ø\ÙXŒ“™O\‹›˜[YNØœ™XZÎÙY˜][™OX”˜Xœ™XZÎØØ\ÙXšY]Ð\™XX˜Ø\ÙXšY]ÐÛ\˜Ø\ÙXš[\™XX˜Ø\ÙXš[Û\šYŠˆ[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
‹›˜[YJ^ØØ\ÙXYYXP›Þ˜Ø\ÙXÜ›Ü›Þ˜Ø\ÙX›YY›Þ˜Ø\ÙXš[P›Þ˜Ø\ÙX\›Þ™O\‹›˜[YNØœ™XZÎÙY˜][™OXÜ›Ü›ÞXœ™XZÎØØ\ÙXš[ØØ[[™ØšYŠˆ[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
‹›˜[YJ^ØØ\ÙX›Û™X˜Ø\ÙX\Y˜][™O\‹›˜[YNØœ™XZÎÙY˜][™OX\Y˜][Xœ™XZÎØØ\ÙX\^šYŠˆ[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
‹›˜[YJ^ØØ\ÙXÚ[\^˜Ø\ÙX\^›\ÚÜYÙX˜Ø\ÙX\^›\Û™ÑYÙX™O\‹›˜[YNØœ™XZÎÙY˜][™OX›Û™XXœ™XZÎØØ\ÙXš[YÙT˜[™ÙX\œ˜^Kš\Ð\œ˜^JŠI‰œ‹›[™Ý	LOL	‰œ‹™]™\žJ
KŠOO“[X™\‹š\Ò[YÙ\ŠJI‰™OŒ	‰ŠOOLO[–ÝLWJI‰™O]\Ë›[TYÙ\ÊI‰ŠO\ŠNØœ™XZÎØØ\ÙX[PÛÜY\Ø“[X™\‹š\Ò[YÙ\ŠŠI‰œŒ	‰ŠO\ŠNØœ™XZÎÙY˜][JYÛ›Üš[™È›Û‹\Ý[™\™Ù^H[ˆšY]Ù\”™Y™\™[˜Ù\Îˆ	ÛŸK˜
NØÛÛ[Y_ZYŠOOO]›ÚY
^ÐJ˜Y˜[YK›ÜˆÙ^H‰ÛŸH‹[ˆšY]Ù\”™Y™\™[˜Ù\Îˆ	ÜŸK˜
NØÛÛ[Y_]ÏÏSØš™XÝ˜Ü™X]J[
KÛ—OY_\™]\›ˆŠ\ËšY]Ù\”™Y™\™[˜Ù\Ø
_YÙ]Ü[XÝ[ÛŠ
^Û]]\ËˆÝ™Ù]
Ü[XÝ[Û˜
KSØš™XÝ˜Ü™X]J[
NÚYŠ[œÝ[˜Ù[ÙˆŠ^Û][™]ÈŠ\Ëž™YŠNÜ‹œÙ]
X
NÛ]O^Ý\››[\Ý›[XÝ[ÛŽ›[NÙKœ\œÙQ\ÝXÝ[Û˜\žJÙ\ÝXÝœ‹™\Ý[ØšŽš_JK\œ˜^Kš\Ð\œ˜^JK™\Ý
OÛ‹™\ÝZK™\ÝšK˜XÝ[Û‰‰Š‹˜XÝ[ÛZK˜XÝ[ÛŠ_Y[ÙHJ
I‰Š‹™\Ý]
NÜ™]\›ˆŠ\ËÜ[XÝ[Û˜JŠOŒÛŽ›[
_YÙ]]XÚY[Ê
^Û]O]\ËˆÝ™Ù]
˜[Y\Ø
K[[ÚYŠH[œÝ[˜Ù[Ùˆ‰‰™Kš\Ê[X™YYš[\Ø
J^Û][™]È]JK™Ù]˜]Ê[X™YYš[\Ø
K\Ëž™YŠNÙ›ÜŠ]ÙK—[Ùˆ‹™Ù][

J^Û][™]È]J‹\Ëž™YŠNÝÏÏSØš™XÝ˜Ü™X]J[
KÙÙJKL
WO[‹œÙ\šX[^˜X›__\™]\›ˆŠ\Ë]XÚY[Ø
_YÙ]˜R[XYÙ\Ê
^Û]O]\ËˆÝ™Ù]
˜[Y\Ø
K[[ÚYŠH[œÝ[˜Ù[Ùˆ‰‰™Kš\ÊR[XYÙ\Ø
J^Û][™]È]JK™Ù]˜]ÊR[XYÙ\Ø
K\Ëž™YŠNÙ›ÜŠ]ÙK—[Ùˆ‹™Ù][

J\ˆ[œÝ[˜Ù[Ùˆ‰‰ŠÏÏ[™]ÈX\œÙ]
ÙJKL
K‹™Ù]ž]\Ê
JJ_\™]\›ˆŠ\Ë˜R[XYÙ\Ø
_HÝJ
^Û]O]\ËˆÝ™Ù]
˜[Y\Ø
K[[Ù[˜Ý[ÛˆŠKŠ^ÚYŠJˆ[œÝ[˜Ù[ÙˆŠ_T™J‹™Ù]
Ø
K˜]˜TØÜš\
J\™]\›ŽÛ][‹™Ù]
”Ø
NÚYŠˆ[œÝ[˜Ù[ÙˆŠ\\‹™Ù]Ýš[™Ê
NÙ[ÙHYŠ\[ÙˆˆOXÝš[™Ø
\™]\›ŽÜYÙJ‹L
Kœ™\XÙP[

K‰‰Š[™]ÈX\
KœÙ]
KŠ_ZYŠH[œÝ[˜Ù[Ùˆ‰‰™Kš\Ê˜]˜TØÜš\
J^Û][™]È]JK™Ù]˜]Ê˜]˜TØÜš\
K\Ëž™YŠNÙ›ÜŠ]ÙK—[Ùˆ™Ù][

J[ŠÙJKL
KŠ_[]]\ËˆÝ™Ù]
Ü[XÝ[Û˜
NÜ™]\›ˆ‰‰›ŠÜ[XÝ[Û˜ŠKYÙ]œÐXÝ[ÛœÊ
^Û]O]\ËˆÝJ
KX
\Ëž™Y‹\ËˆÝŠNÚYŠJ^ÝSØš™XÝ˜Ü™X]J[
NÙ›ÜŠ]Û‹—[ÙˆJ[ˆ[ˆÝÛ—Kœ\Ú
ŠNÛ—OVÜ—_\™]\›ˆŠ\ËœÐXÝ[ÛœØ
_X\Þ[˜ÈÛX[\
OHLJ^ÛJ
K\Ë™ÛØ˜[ÛÛÜ”ÜXÙPØXÚK˜ÛX\Š
K\Ë™ÛØ˜[[XYÙPØXÚK˜ÛX\ŠJK\ËœYÙRÚYÐÛÝ[ØXÚK˜ÛX\Š
K\ËœYÙR[™^ØXÚK˜ÛX\Š
K\ËœYÙQXÝØXÚK˜ÛX\Š
K\Ë››Û›[™[Ù\ÔÙ]˜ÛX\Š
NÙ›ÜŠ]ÙXÝ™_[Ùˆ]ØZ]›ÛZ\ÙK˜[
\Ë™›ÛØXÚJJY[]HK˜ØXÚRÙ^NÝ\Ë™›ÛØXÚK˜ÛX\Š
K\Ë˜Z[[ÓX\ØXÚK˜ÛX\Š
K\ËœÝ[™\™›Û]PØXÚK˜ÛX\Š
K\ËœÞ\Ý[Q›ÛØXÚK˜ÛX\Š
_X\Þ[˜ÈÙ]YÙQXÝ
J^Û]VÝ\ËÜ]™[YÙ\ÑXÝK[™]ÈYK]\ËˆÝ™Ù]˜]ÊYÙ\Ø
NÜˆ[œÝ[˜Ù[Ùˆ‰‰›‹œ]
ŠNÛ]O]\Ëž™Y‹O]\ËœYÙRÚYÐÛÝ[ØXÚKÏ]\ËœYÙR[™^ØXÚKÏ]\ËœYÙQXÝØXÚKÏLÙ›ÜŠÝ›[™ÝÊ^Û]]œÜ

NÚYŠˆ[œÝ[˜Ù[ÙˆŠ^Û]XK™Ù]
ŠNÚYŠL	‰˜ÊÛYJ^ØÊÏ[ØÛÛ[Y_ZYŠ‹š\ÊŠJ]›ÝÈ™]ÈJYÙ\È™YHÛÛZ[œÈÚ\˜Ý[\ˆ™Y™\™[˜ÙK˜
NÛ‹œ]
ŠNÛ]OX]ØZ]
Ë™Ù]
Š_K™™]Ú\Þ[˜ÊŠJNÚYŠH[œÝ[˜Ù[ÙˆŠ^Û]]K™Ù]˜]Ê\X
NÚYŠ[œÝ[˜Ù[Ùˆ‰‰ŠX]ØZ]K™™]Ú\Þ[˜Ê
JK™JYÙX
_]Kš\ÊÚYØ
J^ÚYŠKš\ÊŠ_Kœ]
‹JKËš\ÊŠ_Ëœ]
‹ÊKÏOOYJ\™]\›–ÝK—NØÊÊÎØÛÛ[Y__]œ\Ú
JNØÛÛ[Y_ZYŠJˆ[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJYÙHXÝ[Û˜\žHÚY™Y™\™[˜ÙHÚ[ÈÈÜ›Û™È\HÙˆØš™XÝ˜
NÛ]ÛØš’Y›O\‹O\‹™Ù]˜]ÊÛÝ[
NÚYŠH[œÝ[˜Ù[Ùˆ‰‰ŠOX]ØZ]K™™]Ú\Þ[˜ÊJJK[X™\‹š\Ò[YÙ\ŠJI‰OL	‰Š	‰ˆXKš\Ê
I‰˜Kœ]
JKÊÝOYJJ^ØÊÏ]NØÛÛ[Y_[]\‹™Ù]˜]ÊÚYØ
NÚYŠ[œÝ[˜Ù[Ùˆ‰‰ŠX]ØZ]K™™]Ú\Þ[˜Ê
JKP\œ˜^Kš\Ð\œ˜^J
J^Û]\‹™Ù]˜]Ê\X
NÚYŠ[œÝ[˜Ù[Ùˆ‰‰ŠX]ØZ]K™™]Ú\Þ[˜Ê
JK™JYÙX
_\‹š\ÊÚYØ
J^ÚYŠÏOOYJ\™]\›–Ü‹[NØÊÊÎØÛÛ[Y_]›ÝÈ™]ÈJYÙHXÝ[Û˜\žHÚYÈØš™XÝ\È›Ý[ˆ\œ˜^K˜
_Y›ÜŠ]OY›[™ÝLNÙOLÙKKJ^Û]YÙWNÝœ\Ú
ŠKOO]\ËÜ]™[YÙ\ÑXÝ	‰›ˆ[œÝ[˜Ù[Ùˆ‰‰ˆ\Ëš\ÊŠI‰œËœ]
‹K™™]Ú\Þ[˜ÊŠJ__]›ÝÈ\œ›ÜŠYÙH[™^	Ù_H›Ý›Ý[™˜
_X\Þ[˜ÈÙ][YÙQXÝÊOHLJ^Û]ÚYÛ›Ü™Q\œ›ÜœÎO]\Ëœ“X[˜YÙ\‹™]˜[X]Ü“Ü[ÛœËVÞØÝ\œ™[›ÙN\ËÜ]™[YÙ\ÑXÝÜÒ[’ÚYÎŒWK[™]ÈYKO]\ËˆÝ™Ù]˜]ÊYÙ\Ø
NÚH[œÝ[˜Ù[Ùˆ‰‰œ‹œ]
JNÛ]O[™]ÈX\Ï]\Ëž™Y‹Ï]\ËœYÙR[™^ØXÚKÏLÙ[˜Ý[Ûˆ
K
^Ý	‰ˆ\Ëš\Ê
I‰œËœ]
ÊKKœÙ]
ÊÊËÙKJ_Y[˜Ý[ÛˆJŠ^ÚYŠˆ[œÝ[˜Ù[Ùˆ™I‰ˆYJ]›ÝÈŽÙI‰	‰˜ÏOOL	‰ŠJÙ][YÙQXÝÈHÚÚ\[™È[˜[Yš\œÝYÙNˆ‰ÛŸH‹˜
KT‹™[\JKKœÙ]
ÊÊËÛ‹[J_Y›ÜŠÛ‹›[™ÝŒÊ^Û]O[‹˜]
LJKØÝ\œ™[›ÙNÜÒ[’ÚYÎš_OYKO]™Ù]˜]ÊÚYØ
NÚYŠH[œÝ[˜Ù[ÙˆŠ]ž^ØOX]ØZ]Ë™™]Ú\Þ[˜ÊJ_XØ]Ú
J^ÝJJNØœ™XZßZYŠP\œ˜^Kš\Ð\œ˜^JJJ^ÝJ™]ÈJYÙHXÝ[Û˜\žHÚYÈØš™XÝ\È›Ý[ˆ\œ˜^K˜
JNØœ™XZßZYŠOXK›[™Ý
^Û‹œÜ

NØÛÛ[Y_[]ÏXVÚWKÎÚYŠÈ[œÝ[˜Ù[ÙˆŠ^ÚYŠ‹š\ÊÊJ^ÝJ™]ÈJYÙ\È™YHÛÛZ[œÈÚ\˜Ý[\ˆ™Y™\™[˜ÙK˜
JNØœ™XZß\‹œ]
ÊNÝž^ØÏX]ØZ]Ë™™]Ú\Þ[˜ÊÊ_XØ]Ú
J^ÝJJNØœ™XZß_Y[ÙHÏ\ÎÚYŠJÈ[œÝ[˜Ù[ÙˆŠJ^ÝJ™]ÈJYÙHXÝ[Û˜\žHÚY™Y™\™[˜ÙHÚ[ÈÈÜ›Û™È\HÙˆØš™XÝ˜
JNØœ™XZß[]XË™Ù]˜]Ê\X
NÚYŠ[œÝ[˜Ù[ÙˆŠ]ž^ÙX]ØZ]Ë™™]Ú\Þ[˜Ê
_XØ]Ú
J^ÝJJNØœ™XZßT™JYÙX
_XËš\ÊÚYØ
OÛ
ËÈ[œÝ[˜Ù[ÙˆÜÎ›[
N›‹œ\Ú
ØÝ\œ™[›ÙN˜ËÜÒ[’ÚYÎŒJKKœÜÒ[’ÚYÊÊß\™]\›ˆ_YÙ]YÙR[™^
J^Û]]\ËœYÙR[™^ØXÚK™Ù]
JNÚYŠOO]›ÚY
\™]\›ˆ›ÛZ\ÙKœ™\ÛÛ™J
NÛ]]\Ëž™YŽÙ[˜Ý[ÛˆŠ
^Û]LNÜ™]\›ˆ‹™™]Ú\Þ[˜Ê
K[Š[˜Ý[ÛŠŠ^ÚYŠ™JJI‰ˆP™J‹YÙX
I‰ˆJˆ[œÝ[˜Ù[Ùˆ‰‰ˆ[‹š\Ê\X
I‰›‹š\ÊÛÛ[Ø
JJ]›ÝÈ™]ÈJH™Y™\™[˜ÙHÙ\È›ÝÚ[ÈHÔYÙHXÝ[Û˜\žK˜
NÚYŠ[Š\™]\›ˆ[ÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJ›ÙH]\Ý™HHXÝ[Û˜\žK˜
NÜ™]\›ˆO[‹™Ù]˜]Ê\™[
K‹™Ù]\Þ[˜Ê\™[
_JK[Š[˜Ý[ÛŠJ^ÚYŠYJ\™]\›ˆ[ÚYŠJH[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJ\™[]\Ý™HHXÝ[Û˜\žK˜
NÜ™]\›ˆK™Ù]\Þ[˜ÊÚYØ
_JK[Š[˜Ý[ÛŠJ^ÚYŠYJ\™]\›ˆ[Û]OV×KÏHLNÙ›ÜŠ]HÙˆJ^ÚYŠJH[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJÚY]\Ý™HH™Y™\™[˜ÙK˜
NÚYŠ™JK
J^ÛÏHLØœ™XZßXKœ\Ú
‹™™]Ú\Þ[˜ÊJK[Š[˜Ý[ÛŠJ^ÚYŠJH[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJÚY›ÙH]\Ý™HHXÝ[Û˜\žK˜
NÙKš\ÊÛÝ[
OÜŠÏYK™Ù]
ÛÝ[
NœŠÊßJJ_ZYŠ[Ê]›ÝÈ™]ÈJÚY™Y™\™[˜ÙH›Ý›Ý[™[ˆ\™[	ÜÈÚYË˜
NÜ™]\›ˆ›ÛZ\ÙK˜[
JK[Š

OO–Ü‹WJ_J_[]OLO]OœŠ
K[ŠOžÚYŠ]
\™]\›ˆ\ËœYÙR[™^ØXÚKœ]
KJKNÛ]Û‹—O]Ü™]\›ˆJÏ[‹JŠ_JNÜ™]\›ˆJJ_YÙ]˜\ÙU\›

^Û]O]\ËˆÝ™Ù]
T’X
NÚYŠH[œÝ[˜Ù[ÙˆŠ^Û]YK™Ù]
˜\ÙX
NÚYŠ\[ÙˆOXÝš[™Ø
^Û]OT
[ÝžPÛÛ™\[˜ÛÙ[™ÎˆLJNÚYŠJ\™]\›ˆŠ\Ë˜\ÙU\›Kš™YŠ__\™]\›ˆŠ\Ë˜\ÙU\›\Ëœ“X[˜YÙ\‹™ØÐ˜\ÙU\›
_\Ý]XÈ\œÙQ\ÝXÝ[Û˜\žJÙ\ÝXÝ™K™\Ý[ØšŽØÐ˜\ÙU\››[[ØÐ]XÚY[Îœ[[J^ÚYŠJH[œÝ[˜Ù[ÙˆŠJ^ÐJœ\œÙQ\ÝXÝ[Û˜\žNˆ\ÝXÝ]\Ý™HHXÝ[Û˜\žKˆŠNÜ™]\›Ÿ[]OYK™Ù]
X
KKÎÚYŠH[œÝ[˜Ù[ÙˆŸ
Kš\Ê\Ý
OÚOYK™Ù]
\Ý
NŠOYK™Ù]
PX
KH[œÝ[˜Ù[Ùˆ‰‰ŠKš\Ê
OÚOZK™Ù]

NšKš\ÊX
I‰ŠOZK™Ù]
X
JJJJKH[œÝ[˜Ù[ÙˆŠ^Û]OZK™Ù]
Ø
NÚYŠJH[œÝ[˜Ù[Ùˆ
J^ÐJ\œÙQ\ÝXÝ[Û˜\žNˆ[˜[Y\H[ˆXÝ[ÛˆXÝ[Û˜\žK˜
NÜ™]\›Ÿ[]YK›˜[YNÜÝÚ]Ú
Š^ØØ\ÙX™\Ù]›Ü›X›]OZK™Ù]
›YÜØ
KÏJ
\[ÙˆOOX[X™\˜ÙNŒ
IŒJOOLÏV×KV×NÙ›ÜŠ]HÙˆK™Ù]
šY[Ø
_×JYH[œÝ[˜Ù[ÙˆÛœ\Ú
KÔÝš[™Ê
JN\[ÙˆOOXÝš[™Ø	‰˜Ëœ\Ú
ÙJJJNÝœ™\Ù]›Ü›O^ÙšY[Î˜Ë™YœÎ›[˜ÛYNœßNØœ™XZÎØØ\ÙXT’X˜OZK™Ù]
T’X
KH[œÝ[˜Ù[Ùˆ	‰ŠOXØ
ØK›˜[YJNØœ™XZÎØØ\ÙXÛÕØ›ÏZK™Ù]

NØœ™XZÎØØ\ÙX][˜Ú˜Ø\ÙXÛÕÔ˜›]OZK™Ù]
˜
NÚYŠH[œÝ[˜Ù[ÙˆŠ^Û]Ü˜]Ñš[[˜[YN™_O[™]È]JK[L
KœÙ\šX[^˜X›NØOY_Y[ÙH\[ÙˆOOXÝš[™Ø	‰ŠO]JNÛ]XJJNÙ	‰\[ÙˆOOXÝš[™Ø	‰ŠOXKœÜ]
ØJVÌJØØ
Ù
NÛ]ZK™Ù]
™]ÕÚ[™ÝØ
NÝ\[ÙˆOX›ÛÛX[˜	‰Š›™]ÕÚ[™ÝÏYŠNØœ™XZÎØØ\ÙXÛÕÑX›]ZK™Ù]

KNÚYŠ‰‰œ[œÝ[˜Ù[ÙˆŠ^Û]O\™Ù]
˜
K\™Ù]
˜
NÔ™JKØ
I‰\[ÙˆOXÝš[™Ø	‰ŠO\–ÙÙJL
WJ_ZYŠJ^Ý˜]XÚY[[NÛ]OXJJNÙI‰Š˜]XÚY[\ÝYJ_Y[ÙHJ\œÙQ\ÝXÝ[Û˜\žHH[š[\[Y[Y‘ÛÕÑHˆXÝ[Û‹˜
NØœ™XZÎØØ\ÙX˜[YY›]ZK™Ù]
˜
NÚ[œÝ[˜Ù[Ùˆ	‰Š˜XÝ[ÛZ›˜[YJNØœ™XZÎØØ\ÙXÙ]ÐÑÔÝ]X›]ÏZK™Ù]
Ý]X
KÏZK™Ù]
™\Ù\™T˜
NÚYŠP\œ˜^Kš\Ð\œ˜^JÊ_Ë›[™ÝOOL
Xœ™XZÎÛ]V×NÙ›ÜŠ]HÙˆÊZYŠH[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
K›˜[YJ^ØØ\ÙXÓ˜˜Ø\ÙXÑ‘˜˜Ø\ÙXÙÙÛX‹œ\Ú
K›˜[YJNØœ™XZßY[ÙHH[œÝ[˜Ù[Ùˆ‰‰‹œ\Ú
KÔÝš[™Ê
JNÚYŠ‹›[™ÝOOYË›[™Ý
Xœ™XZÎÝœÙ]ÐÑÔÝ]O^ÜÝ]N‹™\Ù\™TŽ\[ÙˆÏOX›ÛÛX[˜×ÎˆLNØœ™XZÎØØ\ÙX˜]˜TØÜš\›]OZK™Ù]
”Ø
KŽÞH[œÝ[˜Ù[ÙˆØ^K™Ù]Ýš[™Ê
N\[ÙˆOOXÝš[™Ø	‰Š^JNÛ]X‰‰‘]
ÙJ‹L
JNÚYŠ
^ØO^\››™]ÕÚ[™ÝÏ^›™]ÕÚ[™ÝÎØœ™XZßYY˜][šYŠOOX˜]˜TØÜš\OOXÝX›Z]›Ü›X
Xœ™XZÎÐJ\œÙQ\ÝXÝ[Û˜\žHH[œÝ\ÜYXÝ[ÛŽˆ‰ÛŸH‹˜
NØœ™XZß_Y[ÙHKš\Ê\Ý
I‰ŠÏYK™Ù]
\Ý
JNÚYŠ\[ÙˆOOXÝš[™Ø
^Û]OT
K‹ØYY˜][›ÝØÛÛˆLžPÛÛ™\[˜ÛÙ[™ÎˆLJNÙI‰Š\›YKš™YŠK[œØY™U\›X_[É‰ŠÈ[œÝ[˜Ù[Ùˆ	‰ŠÏ[Ë›˜[YJK\[ÙˆÏOXÝš[™ØÝ™\ÝYÙJËL
NJÊI‰Š™\Ý[ÊJ__NÙ[˜Ý[ÛˆÝJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆŸH[œÝ[˜Ù[ÙˆŸH[œÝ[˜Ù[ÙˆŸ\œ˜^Kš\Ð\œ˜^JJ_Y[˜Ý[ÛˆÝJK
^ÚYŠH[œÝ[˜Ù[ÙˆŠYOYK™Ù]˜]Õ˜[Y\Ê
NÙ[ÙHYŠH[œÝ[˜Ù[ÙˆŠYOYK™XÝ™Ù]˜]Õ˜[Y\Ê
NÙ[ÙHYŠP\œ˜^Kš\Ð\œ˜^JJJ\™]\›ŽÙ›ÜŠ]ˆÙˆJTÝJŠI‰œ\Ú
Š_]˜\ˆÝOXÛ\ÜÈ^Ü™Y”Ù][™]ÈYNØÛÛœÝXÝÜŠKŠ^Ý\Ë™XÝYK\ËšÙ^\Ï]\Ëž™Y[ŸX\Þ[˜ÈØY

^Û]ÚÙ^\Î™KXÝO]\ËV×NÙ›ÜŠ]ˆÙˆJ^Û]O]™Ù]˜]ÊŠNÙHOO]›ÚY	‰›‹œ\Ú
J_X]ØZ]\ËˆÙJŠK\Ëœ™Y”Ù][[X\Þ[˜ÈÙJJ^Û]V×KV×NÙ›ÜŠÙK›[™ÝÊ^Û]YKœÜ

NÚYŠˆ[œÝ[˜Ù[ÙˆŠ^ÚYŠ\Ëœ™Y”Ù]š\ÊŠJXÛÛ[YNÝž^Ý\Ëœ™Y”Ù]œ]
ŠK]\Ëž™Y‹™™]Ú
Š_XØ]Ú
J^ÚYŠJH[œÝ[˜Ù[ÙˆYJJ^ÐJØš™XÝØY\‹ˆÝØ[ÈH™\]Y\Ý[™È[]Nˆ‰Ù_H‹˜
K]ØZ]\Ëž™Y‹œÝ™X[K›X[˜YÙ\‹œ™\]Y\Ý[Ú[šÜÊ
NÜ™]\›Ÿ]œ\Ú
ŠK‹œ\Ú
Ø™YÚ[Ž™K˜™YÚ[‹[™™K™[™J__ZYŠˆ[œÝ[˜Ù[ÙˆŠ^Û]O\‹™Ù]˜\ÙTÝ™X[\Ê
NÚYŠJ^Û]OHLNÙ›ÜŠ]ÙˆJ]š\Ñ]SØYY
OHL‹œ\Ú
Ø™YÚ[ŽœÝ\[™™[™JJNÚI‰œ\Ú
Š__PÝJ‹J_ZYŠ‹›[™Ý
^Ø]ØZ]\Ëž™Y‹œÝ™X[K›X[˜YÙ\‹œ™\]Y\Ý˜[™Ù\ÊŠNÙ›ÜŠ]HÙˆ
YH[œÝ[˜Ù[Ùˆ‰‰\Ëœ™Y”Ù]œ™[[Ý™JJNØ]ØZ]\ËˆÙJ
__\Ý]XÈ\Þ[˜ÈØY
‹Š^Ü‹œÝ™X[Kš\Ñ]SØYY]ØZ]™]ÈJ‹ŠK›ØY

__NÛ]OTÞ[X›Û

K]OTÞ[X›Û

KOTÞ[X›Û

KÝOTÞ[X›Û

KÝOTÞ[X›Û

K]OTÞ[X›Û

KOTÞ[X›Û

K]OTÞ[X›Û

KOTÞ[X›Û

KTÞ[X›Û
ÛÛ[
KOTÞ[X›Û
]X
KOTÞ[X›Û

KTÞ[X›Û
^˜X
K]OTÞ[X›Û

KOTÞ[X›Û

KOTÞ[X›Û

KOTÞ[X›Û

KOTÞ[X›Û

KOTÞ[X›Û

KOTÞ[X›Û

K]OTÞ[X›Û

KÝOTÞ[X›Û

KÝOTÞ[X›Û

KÝOTÞ[X›Û

K]OTÞ[X›Û

KOTÞ[X›Û

K]OTÞ[X›Û

KOTÞ[X›Û

KOTÞ[X›Û

K]OTÞ[X›Û

K	OTÞ[X›Û

KYTÞ[X›Û

KTÞ[X›Û

K™TÞ[X›Û

K™TÞ[X›Û

KYTÞ[X›Û

KYTÞ[X›Û

KÙTÞ[X›Û

KÙTÞ[X›Û

KÙTÞ[X›Û

KTÞ[X›Û

KYTÞ[X›Û

KTÞ[X›Û

K™TÞ[X›Û

KTÞ[X›Û

KYTÞ[X›Û
˜[Y\ÜXÙRY
KTÞ[X›Û
›ÙS˜[YX
KÙTÞ[X›Û

KÙTÞ[X›Û

K™TÞ[X›Û

KYTÞ[X›Û

K™TÞ[X›Û

KTÞ[X›Û

KÙTÞ[X›Û

KÙTÞ[X›Û

KÙTÞ[X›Û
›ÛÝ
KTÞ[X›Û

KYTÞ[X›Û

KTÞ[X›Û

KÙTÞ[X›Û

KÙTÞ[X›Û

KYTÞ[X›Û

K™TÞ[X›Û

KYTÞ[X›Û

KOTÞ[X›Û

K™TÞ[X›Û

KTÞ[X›Û

K™TÞ[X›Û
ZY
NÛŠLÌJNÛ]YTÞ[X›Û

K^ØÛÛ™šYÎžÚYŒÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞÚKØ
_KÛÛ›™XÝ[Û”Ù]žÚYŒKÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞ˜KXÛÛ›™XÝ[Û‹\Ù]Ø
_K]\Ù]ÎžÚYŒ‹ÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞ˜KY]KØ
_K›Ü›NžÚYŒËÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞ˜KY›Ü›KØ
_KØØ[TÙ]žÚYÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞ˜K[ØØ[K\Ù]Ø
_KŽžÚYKÚXÚÎ™OO™OOOX‹ËÛœË˜YØ™K˜ÛÛKÞÜ‹ØKÚYÛ˜]\™NžÚY‹ÚXÚÎ™OO™OOOX‹ËÝÝÝËÌË›Ü™ËÌŒÌKÞ[ÚYÈØKÛÝ\˜ÙTÙ]žÚYËÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞ˜K\ÛÝ\˜ÙK\Ù]Ø
_KÝ[\ÚY]žÚYŽÚXÚÎ™OO™OOOX‹ËÝÝÝËÌË›Ü™ËÌNNNKÖÓÕ˜[œÙ›Ü›XK[\]NžÚYŽKÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞ˜K][\]KØ
_KÎžÚYŒLÚXÚÎ™OO™KœÝ\ÕÚ]
‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞËØ
_KžÚYŒLKÚXÚÎ™OO™OOOX‹ËÛœË˜YØ™K˜ÛÛKÞØK™ŽžÚYŒL‹ÚXÚÎ™OO™OOOX‹ËÛœË˜YØ™K˜ÛÛKÞ™‹ØK[žÚYŒLËÚXÚÎ™OO™OOOX‹ËÝÝÝËÌË›Ü™ËÌNNNKÞ[K\Y]NžÚYŒMÚXÚÎ™OO™OOOX‹ËÛœË˜YØ™K˜ÛÛKÞ\Y]KØ_K™^Ü™OO™KÛN™OO™KÌ‹M
Ì‹[N™OO™KÊL
Œ‹M
JÌ‹[Ž™OO™JÌ‹™OO™_K™KÊÊËWO×
××
ŠJŠŠKÎÙ[˜Ý[Ûˆ™
J^Ü™]\›ˆKœÝ\ÕÚ]
	Ø
_KœÝ\ÕÚ]
˜
OÙKœÛXÙJKLJN™_Y[˜Ý[ÛˆÊÙ]N™KY˜][˜[YN˜[Y]N›ŸJ^ÚYŠYJ\™]\›ˆÙOYKš[J
NÛ]\\œÙR[
KL
NÜ™]\›ˆZ\Ó˜SŠŠI‰›ŠŠOÜŽY[˜Ý[Ûˆ™
Ù]N™KY˜][˜[YN˜[Y]N›ŸJ^ÚYŠYJ\™]\›ˆÙOYKš[J
NÛ]\\œÙQ›Ø]
JNÜ™]\›ˆZ\Ó˜SŠŠI‰›ŠŠOÜŽY[˜Ý[Ûˆ
Ù]N™KY˜][˜[YN˜[Y]N›ŸJ^Ü™]\›ˆOÊOYKš[J
KŠJOÙN
NY[˜Ý[ÛˆÊK
^Ü™]\›ˆ
Ù]N™KY˜][˜[YNÌK˜[Y]N™OOš[˜ÛY\ÊJ_J_Y[˜Ý[ÛˆÊKX
^ÚYŠXYJ\™]\›ˆÊ
NÛ]YKš[J
K›X]Ú
™
NÚYŠ[Š\™]\›ˆÊ
NÛ]Ë‹WO[‹O\\œÙQ›Ø]
ŠNÚYŠ\Ó˜SŠJJ\™]\›ˆÊ
NÚYŠOOOL
\™]\›ˆÛ]ÏT™ÚWNÜ™]\›ˆÏÛÊJN˜_Y[˜Ý[ÛˆY
J^ÚYŠYJ\™]\›žÛ[NŒK[ŽŒ_NÛ]YKœÜ]
˜ŠK›X\
OOœ\œÙQ›Ø]
Kš[J
JJK™š[\ŠOOˆZ\Ó˜SŠJJNÚYŠ›[™ÝOOLI‰œ\Ú
JK›[™ÝOOL
\™]\›žÛ[NŒK[ŽŒ_NÛ]Û‹—O]Ü™]\›žÛ[N›‹[ŽœŸ_Y[˜Ý[ÛˆÙ
J^Ü™]\›ˆOÙKš[J
KœÜ]
×ÊËÊK›X\
OOŠÙ^ÛYY™VÌOOOXXšY]Û˜[YN™KœÝXœÝš[™ÊJ_JJN–×_Y[˜Ý[ÛˆÙ
KVÌJ^Û]Û‹‹WO]ÚYŠYJ\™]\›žÜŽ›‹Îœ‹Žš_NÛ]OYKœÜ]
ÊK›X\
OO•J\œÙR[
Kš[J
KL
KMJJK›X\
OOš\Ó˜SŠJOÌ™JNÜ™]\›ˆK›[™Ýß
Û‹‹WOXJKÜŽ›‹Îœ‹Žš__Y[˜Ý[ÛˆÙ
J^ÚYŠYJ\™]\›žÞ‹LKN‹LKÚY‹LKZYÚ‹L_NÛ]YKœÜ]

K›X\
OO’ÊKš[J
KLX
JNÚYŠ›[™ÝÌ—OÌ×O
\™]\›žÞ‹LKN‹LKÚY‹LKZYÚ‹L_NÛ]Û‹‹KWO]Ü™]\›žÞ›‹Nœ‹ÚYšKZYÚ˜__]˜\ˆOXÛ\ÜÈ^ÜÝ]XÈÙ]RST‘J
^Ü™]\›ˆŠ\ËRST‘X™]ÈJLK[[[
J_\Ý]XÈÙ]STJ
^Ü™]\›ˆŠ\ËSTX™]ÈJL[[[
J_XÛÛœÝXÝÜŠK‹Š^Ý\ËœÝXØÙ\ÜÏYK\Ëš[]\Ë˜˜›Þ[‹\Ë˜œ™XZÓ›ÙO\ŸZ\Ðœ™XZÊ
^Ü™]\›ˆH]\Ë˜œ™XZÓ›Ù_\Ý]XÈœ™XZÓ›ÙJ
^Ü™]\›ˆ™]ÈJLK[[
_\Ý]XÈÝXØÙ\ÜÊ[[
^Ü™]\›ˆ™]ÈJL‹[
__KYXÛ\ÜÞØÛÛœÝXÝÜŠJ^Ý\Ë™›ÛÏ[™]ÈX\\Ë˜ØXÚO[™]ÈX\\ËØ\›™Y[™]ÈÙ]\Ë™Y˜][›Û[[\Ë˜Y
J_XY
K[[
^Ù›ÜŠ]ÙˆJ]\Ë˜Y‘›Û

NÙ›ÜŠ]HÙˆ\Ë™›ÛË˜[Y\Ê
JYKœ™YÝ[\ŸYKš][XßK˜›ÛK˜›Û][XÎÚYŠ]œÚ^™OOOL
\™]\›ŽÛ]]\Ë™›ÛË™Ù]
’”ËQ˜[˜XÚËT’”ËVX
NÙ›ÜŠ]HÙˆ
]\Ë™›ÛËœÙ]
KŠ_XY‘›Û
J^Û]YK˜ÜÜÑ›Û[™›Ë]™›Û˜[Z[K]\Ë™›ÛË™Ù]
ŠNÜŸ
SØš™XÝ˜Ü™X]J[
K\Ë™›ÛËœÙ]
‹ŠK\Ë™Y˜][›Û\ŠNÛ]OXO\\œÙQ›Ø]
™›ÛÙZYÚ
NÜ\œÙQ›Ø]
š][XÐ[™ÛJOOOLØOMÌ	‰ŠOX›Û
NšOXOMÌØ›Û][XØ˜][XØ_

K›˜[YKš[˜ÛY\Ê›Û
_KœÓ˜[YOËš[˜ÛY\Ê›Û
JI‰ŠOX›Û
K
K›˜[YKš[˜ÛY\Ê][XØ
_K›˜[YK™[™ÕÚ]
]
_KœÓ˜[YOËš[˜ÛY\Ê][XØ
_KœÓ˜[YOË™[™ÕÚ]
]
JI‰ŠJÏX][XØ
JK_X™YÝ[\˜–ÚWOY_YÙ]Y˜][

^Ü™]\›ˆ\Ë™Y˜][›ÛYš[™
KHL
^Û]]\Ë™›ÛË™Ù]
J_\Ë˜ØXÚK™Ù]
JNÚYŠŠ\™]\›ˆŽÛ]KË_ß›Û][Xß›Û][Xß™YÝ[\Ÿ]ÙÚKOYKœ™\XÙP[
‹
NÚYŠ]\Ë™›ÛË™Ù]
JKŠ\™]\›ˆ\Ë˜ØXÚKœÙ]
KŠKŽÚOZKÓÝÙ\Ø\ÙJ
NÛ]OV×NÙ›ÜŠ]ÙK[Ùˆ\Ë™›ÛË™[šY\Ê
JYKœ™\XÙP[
‹
KÓÝÙ\Ø\ÙJ
KœÝ\ÕÚ]
JI‰˜Kœ\Ú

NÚYŠK›[™ÝOOL
Y›ÜŠ]ËW[Ùˆ\Ë™›ÛË™[šY\Ê
JYKœ™YÝ[\‹›˜[YOËœ™\XÙP[
‹
KÓÝÙ\Ø\ÙJ
KœÝ\ÕÚ]
JI‰˜Kœ\Ú
JNÚYŠK›[™ÝOOL
^ÚOZKœ™\XÙP[
ÜÛ]]ÙÚK
NÙ›ÜŠ]ÙK[Ùˆ\Ë™›ÛË™[šY\Ê
JYKœ™\XÙP[
‹
KÓÝÙ\Ø\ÙJ
KœÝ\ÕÚ]
JI‰˜Kœ\Ú

_ZYŠK›[™ÝOOL
Y›ÜŠ]HÙˆ\Ë™›ÛË˜[Y\Ê
JYKœ™YÝ[\‹›˜[YOËœ™\XÙP[
‹
KÓÝÙ\Ø\ÙJ
KœÝ\ÕÚ]
JI‰˜Kœ\Ú
JNÜ™]\›ˆK›[™ÝLOÊK›[™ÝOOLI‰	‰JHHÛÈX[žHÚÚXÙ\ÈÈÝY\ÜÈHÛÜœ™XÝ›Ûˆ	Ù_X
K\Ë˜ØXÚKœÙ]
KVÌJKVÌJNŠ	‰ˆ]\ËØ\›™Yš\ÊJI‰Š\ËØ\›™Y˜Y
JKJHHØ[››Ýš[™H›Ûˆ	Ù_X
JK[
__NÙ[˜Ý[Ûˆ™
K
^Ü™]\›ˆKœÜÝ\™OOOX][XØÙKÙZYÚOOX›ÛÝ˜›Û][XÎš][XÎ™KÙZYÚOOX›ÛÝ˜›Ûœ™YÝ[\ŸY[˜Ý[ÛˆY
KHLJ^Û][[ÚYŠJ^Û]P™
K\Y˜XÙJNÛR™
KVÉWK™›Ûš[™\‹™š[™

J_ZYŠ[Š\™]\›žÛ[™RZYÚŒL‹[™QØ\Œ‹[™S›ÑØ\ŒLNÛ]YKœÚ^™_LO[‹›[™RZYÚÓX]›X^
ÌŒKŒ‹‹›[™RZYÚ
NŒKŒ‹O[‹›[™QØ\OO]›ÚYËŒŽ›‹›[™QØ\Ü™]\›žÛ[™RZYÚšJœ‹[™QØ\˜Jœ‹[™S›ÑØ\“X]›X^
KKXJJœŸ_]˜\ˆXÛ\ÜÞØÛÛœÝXÝÜŠK‹Š^ÚYŠ\Ë›[™RZYÚ[‹\Ëœ\˜SX\™Ú[]ÝÜŒ›ÝÛNŒYŒšYÚŒKYJ^ÖÝ\Ëœ‘›Û\Ëž˜Q›ÛO]\Ë™Y˜][›Û
ŠNÜ™]\›Ÿ]\Ëž˜Q›Û^Ý\Y˜XÙN™K\Y˜XÙKÜÝ\™N™KœÜÝ\™KÙZYÚ™KÙZYÚÚ^™N™KœÚ^™K]\”ÜXÚ[™Î™K›]\”ÜXÚ[™ßNÛ]O\‹™š[™
K\Y˜XÙJNÚYŠZJ^ÖÝ\Ëœ‘›Û\Ëž˜Q›ÛO]\Ë™Y˜][›Û
ŠNÜ™]\›Ÿ]\Ëœ‘›ÛR™
KJK\Ëœ‘›Û
Ý\Ëœ‘›Û\Ëž˜Q›ÛO]\Ë™Y˜][›Û
ŠJ_YY˜][›Û
J^Û]YK™š[™
[™]XØXLJ_K™š[™
^\šXY›ØLJ_K™š[™
\šX[LJ_K™Ù]Y˜][

NÚYŠËœ™YÝ[\Š^Û]O]œ™YÝ[\ŽÜ™]\›–ÙKÝ\Y˜XÙN™K˜ÜÜÑ›Û[™›Ë™›Û˜[Z[KÜÝ\™N˜›Ü›X[ÙZYÚ˜›Ü›X[Ú^™NŒL]\”ÜXÚ[™ÎŒW_\™]\›–Û[Ý\Y˜XÙN˜ÛÝ\šY\˜ÜÝ\™N˜›Ü›X[ÙZYÚ˜›Ü›X[Ú^™NŒL]\”ÜXÚ[™ÎŒW__K™XÛ\ÜÞØÛÛœÝXÝÜŠK‹Š^Ý\Ë™›Ûš[™\\‹\ËœÝXÚÏVÛ™]È
K‹ŠW_\\Ú]JKŠ^Û]]\ËœÝXÚË˜]
LJNÙ›ÜŠ]Ù–Ø\Y˜XÙXÜÝ\™XÙZYÚÚ^™X]\”ÜXÚ[™ØJYVÝ_
VÝO\‹ž˜Q›ÛÝJNÙ›ÜŠ]HÙ–ØÜ›ÝÛXYšYÚJZ\Ó˜SŠÙWJI‰ŠÙWO\‹œ\˜SX\™Ú[–ÙWJNÛ]O[™]È
KŸ‹›[™RZYÚ\Ë™›Ûš[™\ŠNÚKœ‘›Û\‹œ‘›Û\ËœÝXÚËœ\Ú
J_\Ü›Û

^Ý\ËœÝXÚËœÜ

_]Ü›Û

^Ü™]\›ˆ\ËœÝXÚË˜]
LJ__KYXÛ\ÜÞØÛÛœÝXÝÜŠK‹Š^Ý\Ë™Û\ÏV×K\Ë™›ÛÙ[XÝÜ[™]È™
K‹ŠK\Ë™^˜RZYÚL\\Ú]JKŠ^Ý\Ë™›ÛÙ[XÝÜ‹œ\Ú]JKŠ_\Ü›Û
J^Ü™]\›ˆ\Ë™›ÛÙ[XÝÜ‹œÜ›Û

_XY\˜J
^Û]O]\Ë™›ÛÙ[XÝÜ‹Ü›Û

NÝ\Ë™^˜RZYÚ
ÏYKœ\˜SX\™Ú[‹Ü
ÙKœ\˜SX\™Ú[‹˜›ÝÛ_XYÝš[™ÊJ^ÚYŠYJ\™]\›ŽÛ]]\Ë™›ÛÙ[XÝÜ‹Ü›Û

K]ž˜Q›ÛœÚ^™NÚYŠœ‘›Û
^Û]]ž˜Q›Û›]\”ÜXÚ[™ËO]œ‘›ÛOZK›[™RZYÚKŒ‹Ï]›[™RZYÚX]›X^
KŒ‹JJ›‹ÏXKJK›[™QØ\OO]›ÚYËŒŽšK›[™QØ\
KÏSX]›X^
KÊJ›‹[‹ÌYLËOZK™Y˜][ÚYK˜Ú\œÕÑÛ\Ê
VÌKÚYÙ›ÜŠ]ÙˆKœÜ]
Ö×LŒŽW—KÊJ^Û]OZK™[˜ÛÙTÝš[™Ê
Kš›Ú[Š
KZK˜Ú\œÕÑÛ\ÊJNÙ›ÜŠ]HÙˆŠ^Û]YKÚYNÝ\Ë™Û\Ëœ\Ú
Ý
›
Ü‹ËËK[šXÛÙKLWJ_]\Ë™Û\Ëœ\Ú
Ì˜LJ_]\Ë™Û\ËœÜ

NÜ™]\›ŸY›ÜŠ]ÙˆKœÜ]
Ö×LŒŽW—KÊJ^Ù›ÜŠ]HÙˆœÜ]

J]\Ë™Û\Ëœ\Ú
Û‹KŒŠ›‹‹KLWJNÝ\Ë™Û\Ëœ\Ú
Ì˜LJ_]\Ë™Û\ËœÜ

_XÛÛ\]JJ^Û]KLKLLOLOLÏLÏHLKÏHLÙ›ÜŠ]LO]\Ë™Û\Ë›[™ÝÛNÛ
ÊÊ^Û]ÝK‹WO]\Ë™Û\ÖÛK\OOXÏXÏÙŽ™ÚYŠJ^ÜSX]›X^
‹JKOLJÏ[ËÏYËKLKLÏHLNØÛÛ[Y_ZYŠ
^ØJÝO™OÊSX]›X^
‹JKOLJÏ[ËÏYËKLKLÏHLÏHLJNŠÏSX]›X^
ËÊKXKJÏ]K[
NØÛÛ[Y_ZYŠJÝO™J^ÚJÏ[ËÏYËOOKLOÊSX]›X^
‹JKO]JNŠ]SX]›X^
‹ŠKOLKLKL
KÏHLÏHLNØÛÛ[Y_XJÏ]KÏSX]›X^
ËÊ_\™]\›ˆSX]›X^
‹JKJÏ[ÊÝ\Ë™^˜RZYÚÝÚYŒKŒŠœ‹ZYÚšK\Ðœ›ÚÙ[Žœß__NÛ]	K×–×‹–×JËËYK×–×—WJËË^ÙÝŒÝÝŒKÝ\ÚŒ‹Ýœ˜XÚÙ]ŒËÝ\™[ŽK™[™]ÈX\
ÖØ	]X
K
OO™K™]\Ù]ÏÙK™]\Ù]Ë™]N™WKØ	™XÛÜ™
K
OOŠK™]\Ù]ÏÙK™]\Ù]Ë™]N™JVÜ]WJ
VÌWKØ	[\]X
K
OO™K[\]WKØ	ÛÛ›™XÝ[Û”Ù]
K
OO™K˜ÛÛ›™XÝ[Û”Ù]KØ	›Ü›X
K
OO™K™›Ü›WKØ	^[Ý]
K
OO™K›^[Ý]KØ	ÜÝ
K
OO™KšÜÝKØ	]UÚ[™ÝØ
K
OO™K™]UÚ[™Ý×KØ	]™[
K
OO™K™]™[KØX
K
OO™K™]\Ù]×KØ	˜X
K
OO™WKØ˜X
K
OO™WKØ	
K
OOWJK™[™]ÈÙXZÓX\Ù[˜Ý[ÛˆYŠJ^Ü™]\›ˆOYKš[J
KOOOX
˜ÌKÌœ\œÙR[
KL
_Y[˜Ý[ÛˆÙŠKHL
^Û]YK›X]Ú
	
NÚYŠ\Š\™]\›ˆ[Û]ÚWO\‹OVÞÛ˜[YNšKØXÚS˜[YN˜˜
ÚK[™^ŒœÎ›[›Ü›PØ[Î›[Ü\˜]ÜŽ‹™ÝWKÏZK›[™ÝÙ›ÜŠÛÏK›[™ÝÊ^Û]Ï[ÎÚYŠK˜Ú\]
ÊÊÊOOOXØ
^ÚYŠYKœÛXÙJÊK›X]Ú
YŠK\Š\™]\›ˆJHH[˜[Y[™^[ˆÓÓH^™\ÜÚ[Û˜
K[ØK˜]
LJKš[™^XYŠ–ÌJKÊÏ\–ÌK›[™Ý
ÌNØÛÛ[Y_[]ÎÜÝÚ]Ú
K˜Ú\]
ÊJ^ØØ\ÙX˜šYŠ]
\™]\›ˆ[ÛÊÊËÏ]‹™ÝÝØœ™XZÎØØ\ÙXØ›ÊÊËÏ]‹™Ý\ÚØœ™XZÎØØ\ÙXØšYŠŠ\™]\›ˆJHHÓÓH^™\ÜÚ[ÛˆÛÛZ[œÈH›Ü›PØ[ÈÝX™^™\ÜÚ[ÛˆÚXÚ\È›ÝÝ\ÜY›Üˆ›ÝË˜
K[ØÏ]‹™Ýœ˜XÚÙ]Øœ™XZÎØØ\ÙX
šYŠŠ\™]\›ˆJHHÓÓH^™\ÜÚ[ÛˆÛÛZ[œÈH˜]˜TØÜš\ÝX™^™\ÜÚ[ÛˆÚXÚ\È›ÝÝ\ÜY›Üˆ›ÝË˜
K[ØÏ]‹™Ý\™[ŽØœ™XZÎÙY˜][˜Ï]‹™ÝØœ™XZßZYŠYKœÛXÙJÊK›X]Ú
	
K\ŠXœ™XZÎÖÚWO\‹ÊÏZK›[™ÝKœ\Ú
Û˜[YNšKØXÚS˜[YN™KœÛXÙJËÊKÜ\˜]ÜŽ˜Ë[™^ŒœÎ›[›Ü›PØ[Î›[J_\™]\›ˆ_Y[˜Ý[ÛˆÙŠK‹HLOHL
^Û]O[ÙŠ‹ŠNÚYŠXJ\™]\›ˆ[Û]Ï[™‹™Ù]
VÌK›˜[YJKÏLÎÛÏÊÏHLOVÛÊK
WKÏLJNŠÏ]OO[[OVÝWJNÙ›ÜŠ]XK›[™ÝÜÏŽÜÊÊÊ^Û]Û˜[YN›‹ØXÚS˜[YNœ‹Ü\˜]ÜŽ›Ë[™^›OXVÜ×KOV×NÙ›ÜŠ]ÙˆJ^ÚYŠ]š\ÖSØš™XÝ
XÛÛ[YNÛ]KNÚYŠI‰ŠO\™‹™Ù]

K_
O[™]ÈX\™‹œÙ]
JJKOXK™Ù]
ŠJKYJ^ÜÝÚ]Ú
Ê^ØØ\ÙH‹™Ý™O]ÒWJ‹LJNØœ™XZÎØØ\ÙH‹™ÝÝ™O]ÒWJ‹L
NØœ™XZÎØØ\ÙH‹™Ý\Ú™O]ÕWJŠKOYKš\ÖSØš™XÝ\œ˜^OÙK˜Ú[™[Ž–ÙWNØœ™XZÎÙY˜][˜œ™XZßZI‰˜KœÙ]
‹J_YK›[™ÝŒ	‰Kœ\Ú
J_ZYŠK›[™ÝOOL	‰ˆXÉ‰œÏOOL
^ÚYŠ]ÖWJ
K]
\™]\›ˆ[ÜÏKLKOVÝNØÛÛ[Y_YOZ\Ñš[š]J
OÝK™š[\ŠOO›K›[™Ý
K›X\
OO™VÛJNK™›]

_\™]\›ˆK›[™ÝOOLÛ[™_Y[˜Ý[ÛˆÙŠKŠ^Û][ÙŠŠNÚYŠ\Ÿ‹œÛÛYJOO™K›Ü\˜]ÜOO]‹™ÝÝ
J\™]\›ˆ[Û]O[™‹™Ù]
–ÌK›˜[YJKOLÚOÊOZJK
KOLJN™O]NÙ›ÜŠ]\‹›[™ÝØOØJÊÊ^Û]Û˜[YNÜ\˜]ÜŽ›‹[™^š_O\–ØWNÚYŠZ\Ñš[š]JJJ\™]\›ˆ–ØWKš[™^LK˜Ü™X]S›Ù\Ê‹œÛXÙJJJNÛ]ÎÜÝÚ]Ú
Š^ØØ\ÙH‹™Ý›ÏYVÒWJLJNØœ™XZÎØØ\ÙH‹™ÝÝ›ÏYVÒWJL
NØœ™XZÎØØ\ÙH‹™Ý\Ú›ÏYVÕWJ
KÏ[Ëš\ÖSØš™XÝ\œ˜^OÛË˜Ú[™[Ž–Û×NØœ™XZÎÙY˜][˜œ™XZßZYŠË›[™ÝOOL
\™]\›ˆK˜Ü™X]S›Ù\Ê‹œÛXÙJJJNÚYŠOË›[™Ý
^Û][ÖÚWNÚYŠ]š\ÖSØš™XÝ
\™]\›ˆJHHØ[››ÝÜ™X]HH›ÙK˜
K[ÙO]Y[ÙH™]\›ˆ–ØWKš[™^ZK[Ë›[™ÝK˜Ü™X]S›Ù\Ê‹œÛXÙJJJ_\™]\›ˆ[[]TÞ[X›Û

KYTÞ[X›Û

KTÞ[X›Û

K™TÞ[X›Û
ØÚ[™[˜
KTÞ[X›Û

KYTÞ[X›Û

KTÞ[X›Û

KÙTÞ[X›Û

KÙTÞ[X›Û

K™TÞ[X›Û

KYTÞ[X›Û

K™TÞ[X›Û

KTÞ[X›Û

KÙTÞ[X›Û
\™[
KÙTÞ[X›Û

KÙTÞ[X›Û

KTÞ[X›Û

KYLS™]\Ù]ËšYÝ˜\ˆXÛ\ÜÈ^ØÛÛœÝXÝÜŠKHLJ^Ý\ÖÛYOYK\ÖÚO]\ÖÞY—O[‹\ÖÔÙ—O[[\ÖÙ™—OV×K\ÖÑ™OX	ÝIÑYŠÊßX\ÖÉWO[[YÙ]\ÖSØš™XÝ

^Ü™]\›ˆLYÙ]\ÖSØš™XÝ\œ˜^J
^Ü™]\›ˆL_XÜ™X]S›Ù\ÊJ^Û]]\Ë[[Ù›ÜŠ]Û˜[YNœ‹[™^š_[ÙˆJ^Ù›ÜŠ]OLOZ\Ñš[š]JJOÚNŒÙOXNÙJÊÊ[[™]ÈÙŠÛYOOOQËLNÛYKŠKÑWJŠNÝ[Ÿ\™]\›ˆŸV×ÙJJ^ÚYŠ]\ÖÞY—_]\ÖÝ™JJJ\™]\›ˆLNÛ]YVÚK]\ÖÝNÚYŠˆ[œÝ[˜Ù[ÙˆJ^ÚYŠ‹œ\Ú
JJ\™]\›ˆ\ÖÑWJJKLY[ÙH™]\›ˆˆOO[[	‰\ÖÐÙJŠK\ÖÝOYK\ÖÑWJJKLÛ]XÜ™]\›ˆ\ËšYÜX
Yˆ	Ý\ËšYJX\Ë›˜[YI‰ŠX
˜[YNˆ	Ý\Ë›˜[Y_H	Ý\Ëš˜[Y_JX
KJHH›ÙH‰Ý\ÖÚ_H‰ÜŸH\È[™XYH[›ÝYÚ‰ÝHˆX
KL_VÝ™JJ^Ü™]\›ˆ\Ëš\ÓÝÛ”›Ü\JVÚJI‰™VÛYOOO]\ÖÛY_VØÙJ
^Ü™]\›ˆL_VÕWJ
^Ü™]\›ˆL_VÚYJ
^Ü™]\›ˆL_VØYJ
^Ü™]\›ˆL_VÞJ
^Ý\Ëœ\˜I‰\ÖÔ]WJ
VÒKœ\˜TÝXÚËœÜ

_VÔÙJ
^Ý\ÖÔ]WJ
VÒKœ\˜TÝXÚËœ\Ú
\Ëœ\˜J_VÑJJ^Ý\ËšY	‰\ÖÛYOOOS[\]KšY	‰™KœÙ]
\ËšY\Ê_VÔ]WJ
^Ü™]\›ˆ\ÖÉWK[\]_VÛJ
^Ü™]\›ˆL_VÝYJ
^Ü™]\›ˆL_VÑWJJ^ÙVÔÙ—O]\Ë\ÖÙ™—Kœ\Ú
JKYVÉWI‰\ÖÉWI‰ŠVÉWO]\ÖÉWJ_VÐÙJJ^Û]]\ÖÙ™—Kš[™^ÙŠJNÝ\ÖÙ™—KœÜXÙJJ_VÙYJ
^Ü™]\›ˆ\Ëš\ÓÝÛ”›Ü\J˜[YX
_VÚÙJJ^ßVÞYJJ^ßVÒ]WJ
^ßVÚÝWJJ^Ù[]H\ÖÞY—K\ÖÚWI‰ŠK˜ÛX[Š\ÖÚWJK[]H\ÖÚWJ_VÛ™JJ^Ü™]\›ˆ\ÖÙ™—Kš[™^ÙŠJ_VÜ™JK
^ÝÔÙ—O]\Ë\ÖÙ™—KœÜXÙJK
K]ÉWI‰\ÖÉWI‰ŠÉWO]\ÖÉWJ_VÙJ
^Ü™]\›ˆ]\Ë›˜[Y_VÜJ
^Ü™]\›˜VÚ™J
^Ü™]\›ˆ\ÖÙ™—K›[™ÝOOLÝ\ÖÕ—N\ÖÙ™—K›X\
OO™VÚ™J
JKš›Ú[Š
_YÙ]Ù—J
^Û]SØš™XÝ™Ù]›ÝÝ\SÙŠ\ÊNÚYŠ]—Ø]šX]\Ê^Û]]—Ø]šX]\Ï[™]ÈÙ]Ù›ÜŠ]ÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^ÚYŠ\ÖÝOOO[[\ÖÝZ[œÝ[˜Ù[Ùˆ_\ÖÝZ[œÝ[˜Ù[ÙˆJXœ™XZÎÛ‹˜Y

__\™]\›ˆŠ\Ë‹—Ø]šX]\Ê_VÜÙJJ^Û]]\ÎÙ›ÜŠÝÊ^ÚYŠOOYJ\™]\›ˆLÝ]ÖWJ
_\™]\›ˆL_VÖWJ
^Ü™]\›ˆ\ÖÔÙ—_VÖWJ
^Ü™]\›ˆ\ÖÖWJ
_VÜ]WJO[[
^Ü™]\›ˆOÝ\ÖÙWN\ÖÙ™—_VÑWJ
^Û]SØš™XÝ˜Ü™X]J[
NÝ\ÖÕ—I‰Š‰ÛÛ[]\ÖÕ—JNÙ›ÜŠ]ˆÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^Û]]\ÖÛ—NÜˆOO[[	‰Šˆ[œÝ[˜Ù[ÙˆOÝÛ—O\–ÑWJ
Nœˆ[œÝ[˜Ù[ÙˆOÜ‹š\Ñ[\J
_
Û—O\‹™[\

JNÛ—O\Š_\™]\›ˆVÔJ
^Ü™]\›ˆ[VÕWJ
^Ü™]\›ˆK‘ST_J–ÒWJ
^Ù›ÜŠ]HÙˆ\ÖÜ]WJ
J^ZY[_J–ÙÙ—JK
^Ù›ÜŠ]ˆÙˆ\ÖÒWJ
JZYŠY_OOYKš\Ê–ÚJJ^Û]O]\ÖÐWJ
K[–ÕWJJNÝœÝXØÙ\Üß
\ÖÒK™˜Z[[™Ó›ÙO[ŠKZY[_VÓWJ
^Ü™]\›ˆ[VÑ]WJK
^Ý\ÖÒK˜Ú[™[‹œ\Ú
J_VÐWJ
^ßVÓÝWJÙš[\Ž™O[[[˜ÛYNHLJ^ÚYŠ]\ÖÒK™Ù[™\˜]ÜŠ]\ÖÒK™Ù[™\˜]Ü]\ÖÙÙ—JK
NÙ[Ù^Û]O]\ÖÐWJ
K]\ÖÒK™˜Z[[™Ó›ÙVÕWJJNÚYŠ]œÝXØÙ\ÜÊ\™]\›ˆÝš[	‰\ÖÑ]WJš[˜˜›Þ
K[]H\ÖÒK™˜Z[[™Ó›Ù_Y›ÜŠÎÊ^Û]O]\ÖÒK™Ù[™\˜]Ü‹›™^

NÚYŠK™Û™JXœ™XZÎÛ]YK˜[YNÚYŠ]œÝXØÙ\ÜÊ\™]\›ˆÝš[	‰\ÖÑ]WJš[˜˜›Þ
_\™]\›ˆ\ÖÒK™Ù[™\˜]Ü[[K‘ST_VÓÙJJ^Ý\ÖÝÙ—O[™]ÈÙ]
Øš™XÝšÙ^\ÊJJ_VÝ™—JJ^Û]]\ÖÙ—K]\ÖÝÙ—NÜ™]\›–Ë‹‹™WK™š[\ŠOOš\ÊJI‰ˆ[‹š\ÊJJ_VÕJK[™]ÈÙ]
^Ù›ÜŠ]ˆÙˆ\ÖÙ™—J[–ÐÙ—JK
_VÐÙ—JK
^Û]]\Ö×Ù—JK
NÛÝ\ÖÛ—J‹K
N\ÖÕJK
_V×Ù—JK
^Û]Ý\ÙN›‹\ÙZ™YŽœŸO]\ÎÚYŠ[‰‰ˆ\Š\™]\›ˆ[Û]O[[O[[Ï[[Ï[ŽÚYŠÊÏ\‹‹œÝ\ÕÚ]
ÜÛÛJ
I‰œ‹™[™ÕÚ]

X
OØO\‹œÛXÙJKLJNœ‹œÝ\ÕÚ]
ˆÜÛÛJ
I‰œ‹™[™ÕÚ]

X
OØO\‹œÛXÙJ‹LJNœ‹œÝ\ÕÚ]
Ø
OÛÏ\‹œÛXÙJJNœ‹œÝ\ÕÚ]
ˆØ
I‰ŠÏ\‹œÛXÙJŠJJN›‹œÝ\ÕÚ]
Ø
OÛÏ[‹œÛXÙJJN˜O[‹\Ë\ÙO]\Ë\ÙZ™YXÏÚOYK™Ù]
ÊNŠO\ÙŠK™Ù]
Ù
K\ËKLLJKI‰ZVÌJKZJ\™]\›ˆJHH[˜[Y›ÝÝ\H™Y™\™[˜ÙNˆ	ÜßK˜
K[ÚYŠVÚHOO]\ÖÚJ\™]\›ˆJHH[˜ÛÛ\]X›H›ÝÝ\Nˆ	ÚVÚ_HOOH	Ý\ÖÚ_K˜
K[ÚYŠš\ÊJJ\™]\›ˆJHHÞXÛH]XÝY[ˆ›ÝÝ\\È\ÙK˜
K[Ý˜Y
JNÛ]ÏZV×Ù—JK
NÜ™]\›ˆÉ‰šVÛ—JËK
KVÕJK
K™[]JJK_VÛ—JKŠ^ÚYŠ‹š\ÊJJ^ÐJHHÞXÛH]XÝY[ˆ›ÝÝ\\È\ÙK˜
NÜ™]\›ŸH]\ÖÕ—I‰™VÕ—I‰Š\ÖÕ—OYVÕ—JK™]ÈÙ]
ŠK˜Y
JNÙ›ÜŠ]Ùˆ\ÖÝ™—JVÝÙ—JJ]\ÖÝOYVÝK\ÖÝÙ—I‰\ÖÝÙ—K˜Y

NÙ›ÜŠ]ˆÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^ÚYŠ\ÖÙ—Kš\ÊŠJXÛÛ[YNÛ]O]\ÖÜ—KOYVÜ—NÚYŠH[œÝ[˜Ù[ÙˆJ^Ù›ÜŠ]HÙˆVÙ™—JYVÐÙ—JŠNÙ›ÜŠ]ZVÙ™—K›[™ÝÏXVÙ™—K›[™ÝÜÎÜŠÊÊ^Û]OYVÙ™—VÜ—VÓ]WJ
NÚYŠKœ\Ú
JJXVÔÙ—O]\Ë\ÖÙ™—Kœ\Ú
JKVÐÙ—JŠNÙ[ÙHœ™XZßXÛÛ[Y_ZYŠHOO[[
^ÚVÕJŠKI‰šVÛ—JKŠNØÛÛ[Y_ZYŠHOO[[
^Û]OXVÓ]WJ
NÙVÔÙ—O]\Ë\ÖÜ—OYK\ÖÙ™—Kœ\Ú
JKVÐÙ—JŠ___\Ý]XÖÜ—J
^Ü™]\›ˆ\œ˜^Kš\Ð\œ˜^J
OÝ›X\
O™VÜ—J
JN\[ÙˆOXØš™XÝ	‰ÓØš™XÝ˜\ÜÚYÛŠßK
NVÓ]WJ
^Û]SØš™XÝ˜Ü™X]JØš™XÝ™Ù]›ÝÝ\SÙŠ\ÊJNÙ›ÜŠ]HÙˆØš™XÝ™Ù]ÝÛ”›Ü\TÞ[X›ÛÊ\ÊJ]ž^ÝÙWO]\ÖÙW_XØ]ÚÑŠK\ÖÙWJ_]Ñ™OX	ÝÚ_IÑYŠÊßXÙ™—OV×NÙ›ÜŠ]ˆÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^ÚYŠ\ÖÙ—Kš\ÊŠJ^ÝÛ—OYVÜ—J\ÖÛ—JNØÛÛ[Y_[]]\ÖÛ—NÝÛ—O\ˆ[œÝ[˜Ù[ÙˆOÛ™]ÈJ–Ø™—JN›[Y›ÜŠ]HÙˆ\ÖÙ™—J^Û]YVÚKYVÓ]WJ
NÝÙ™—Kœ\Ú
ŠK–ÔÙ—O]Û—OOO[[ÝÛ—O\ŽÛ—VÙ™—Kœ\Ú
Š_\™]\›ˆVÜ]WJO[[
^Ü™]\›ˆOÝ\ÖÙ™—K™š[\ŠOÚOOOYJN\ÖÙ™—_VÕWJJ^Ü™]\›ˆ\ÖÙW_VÒWJKHL
^Ü™]\›ˆ\œ˜^K™œ›ÛJ\ÖÕ]WJKŠJ_J–Õ]WJKHL
^ÚYŠOOOX\™[
^ÞZY[\ÖÔÙ—NÜ™]\›ŸY›ÜŠ]ˆÙˆ\ÖÙ™—J[–ÚOOOYI‰ŠZY[ŠK‹›˜[YOOOYI‰ŠZY[ŠK
–ÙJ
JI‰ŠZY[
›–Õ]WJKLJJNÛ‰‰\ÖÙ—Kš\ÊJI‰ŠZY[™]ÈÙŠ\ËK\ÖÙWJJ__KOXÛ\ÜÈ^ØÛÛœÝXÝÜŠOLKÌ
^Ý\ÖØ™—OYK\ÖÙ™—OV×_YÙ]\ÖSØš™XÝ

^Ü™]\›ˆL_YÙ]\ÖSØš™XÝ\œ˜^J
^Ü™]\›ˆL\\Ú
J^Ü™]\›ˆ\ÖÙ™—K›[™Ý]\ÖØ™—OÊ\ÖÙ™—Kœ\Ú
JKL
NŠJHH›ÙH‰ÙVÚ_HˆXØÙ\È›È[Ü™H[ˆ	Ý\ÖØ™—_HÚ[™[˜
KLJ_Z\Ñ[\J
^Ü™]\›ˆ\ÖÙ™—K›[™ÝOOLY[\

^Ü™]\›ˆ\ÖÙ™—K›[™ÝOOLOÝ\ÖÙ™—VÌVÑWJ
N\ÖÙ™—K›X\
OO™VÑWJ
J_VÓ]WJ
^Û][™]ÈJ\ÖØ™—JNÜ™]\›ˆÙ™—O]\ÖÙ™—K›X\
OO™VÓ]WJ
JKYÙ]Ú[™[Š
^Ü™]\›ˆ\ÖÙ™—_XÛX\Š
^Ý\ÖÙ™—K›[™ÝL_KÙXÛ\ÜÞØÛÛœÝXÝÜŠKŠ^Ý\ÖÔÙ—OYK\ÖÚO]\ÖÕ—O[‹\ÖÓWOHLK\ÖÑ™OX]šX]IÑYŠÊßXVÖWJ
^Ü™]\›ˆ\ÖÔÙ—_VÛÙJ
^Ü™]\›ˆLVÕÝWJ
^Ü™]\›ˆ\ÖÕ—Kš[J
_VÚÙJJ^ÙOYK˜[Y_\ÖÕ—OYKÔÝš[™Ê
_VÚ™J
^Ü™]\›ˆ\ÖÕ—_VÜÙJJ^Ü™]\›ˆ\ÖÔÙ—OOOY_\ÖÔÙ—VÜÙJJ__KÙXÛ\ÜÈH^[™ÈžØÛÛœÝXÝÜŠK^ßJ^ÚYŠÝ\\ŠK
K\ÖÕ—OX\ÖÛY—O[[OOXÝ^
^Û]O[™]ÈX\Ý\ÖÝY—OYNÙ›ÜŠ]Ý—[ÙˆØš™XÝ™[šY\ÊŠJYKœÙ]
™]ÈÙŠ\ËŠJNÚYŠ‹š\ÓÝÛ”›Ü\JÙ
J^Û]O[–ÙÙKž˜K™]S›ÙNÙHOO]›ÚY	‰ŠOOOX]QÜ›Ý\Ý\ÖÛY—OHLN™OOOX]U˜[YX	‰Š\ÖÛY—OHL
J__]\ÖÓWOHL_VÓ™JJ^Û]]\ÖÚNÚYŠOOXÝ^
^ÙKœ\Ú
Ý
\ÖÕ—JJNÜ™]\›Ÿ[]]™J
K]\ÖÛYOOOQØ˜N˜˜ÙKœ\Ú
	ÜŸIÛŸX
NÙ›ÜŠ]Ý—[Ùˆ\ÖÝY—K™[šY\Ê
J^Û]]™J
NÙKœ\Ú
	ÜŸOH‰ÐÝ
–Õ—J_H˜
_ZYŠ\ÖÛY—HOO[[	‰Š\ÖÛY—OÙKœ\Ú
˜N™]S›ÙOH™]U˜[YH˜
N™Kœ\Ú
˜N™]S›ÙOH™]QÜ›Ý\˜
JK]\ÖÕ—I‰\ÖÙ™—K›[™ÝOOL
^ÙKœ\Ú
Ï˜
NÜ™]\›ŸZYŠKœ\Ú
˜
K\ÖÕ—J]\[Ùˆ\ÖÕ—OOXÝš[™ØÙKœ\Ú
Ý
\ÖÕ—JJN\ÖÕ—VÓ™JJNÙ[ÙH›ÜŠ]Ùˆ\ÖÙ™—J]Ó™JJNÙKœ\Ú
ÉÜŸIÛŸO˜
_V×ÙJ
^ÚYŠ\ÖÕ—J^Û][™]ÈJ\ÖÛYKÝ^
NÝ\ÖÑWJ
KÕ—O]\ÖÕ—K\ÖÕ—OX\™]\›ˆ\ÖÑWJ
KLVÞYJJ^Ý\ÖÕ—JÏY_VÒ]WJ
^ÚYŠ\ÖÕ—I‰\ÖÙ™—K›[™ÝŒ
^Û][™]ÈJ\ÖÛYKÝ^
NÝ\ÖÑWJ
KÕ—O]\ÖÕ—K[]H\ÖÕ—__VÕWJ
^Ü™]\›ˆ\ÖÚOOOXÝ^ÜKœÝXØÙ\ÜÊÛ˜[YN˜Ý^˜[YN\ÖÕ—_JNœK‘ST_VÜ]WJO[[
^Ü™]\›ˆOÝ\ÖÙ™—K™š[\ŠOÚOOOYJN\ÖÙ™—_VÞWJ
^Ü™]\›ˆ\ÖÝY—_VÕWJJ^Û]]\ÖÝY—K™Ù]
JNÜ™]\›ˆOO]›ÚYÝ\ÖÜ]WJJNJ–Õ]WJK
^Û]]\ÖÝY—K™Ù]
JNÛ‰‰ŠZY[ŠNÙ›ÜŠ]ˆÙˆ\ÖÙ™—J[–ÚOOOYI‰ŠZY[ŠK	‰ŠZY[
›–Õ]WJK
J_J–ÔWJK
^Û]]\ÖÝY—K™Ù]
JNÛ‰‰Š][–ÓWJI‰ŠZY[ŠNÙ›ÜŠ]ˆÙˆ\ÖÙ™—J^ZY[
›–ÔWJK
_J–ÒÝWJKŠ^Ù›ÜŠ]ˆÙˆ\ÖÙ™—J\–ÚOOOYI‰Š[Ÿ\–ÓWJI‰ŠZY[ŠK	‰ŠZY[
œ–ÒÝWJKŠJ_VÛÙJ
^Ü™]\›ˆ\ÖÛY—OOO[[Ý\ÖÙ™—K›[™ÝOOL\ÖÙ™—VÌVÛYOOOSž[šY\ÖÛY—_VÕÝWJ
^Ü™]\›ˆ\ÖÛY—OOO[[Ý\ÖÙ™—K›[™ÝOOLÝ\ÖÕ—Kš[J
N\ÖÙ™—VÌVÛYOOOSž[šYÝ\ÖÙ™—VÌVÚ™J
Kš[J
N›[\ÖÕ—Kš[J
_VÚÙJJ^ÙOYK˜[Y_\ÖÕ—OYKÔÝš[™Ê
_VÑWJOHLJ^Û]SØš™XÝ˜Ü™X]J[
NÙI‰Š‰œÏ]\ÖÛYJK\ÖÕ—I‰Š‰ÛÛ[]\ÖÕ—JK‰˜[YO]\ÖÚK˜Ú[™[V×NÙ›ÜŠ]ˆÙˆ\ÖÙ™—J]˜Ú[™[‹œ\Ú
–ÑWJJJNÝ˜]šX]\ÏSØš™XÝ˜Ü™X]J[
NÙ›ÜŠ]ÙK—[Ùˆ\ÖÝY—J]˜]šX]\ÖÙWO[–Õ—NÜ™]\›ˆ_KYXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠK
^ÜÝ\\ŠK
K\ÖÕ—OXVÞYJJ^Ý\ÖÕ—JÏY_VÒ]WJ
^ß_K™XÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠKŠ^ÜÝ\\ŠK
K\ÖÞ—O[ŸVÒ]WJ
^Ý\ÖÕ—OR
Ù]N\ÖÕ—KY˜][˜[YN\ÖÞ—VÌK˜[Y]N™OO\ÖÞ—Kš[˜ÛY\ÊJ_J_VÚÝWJJ^ÜÝ\\–ÚÝWJJK[]H\ÖÞ—__KYXÛ\ÜÈ^[™ÈYžÖÒ]WJ
^Ý\ÖÕ—O]\ÖÕ—Kš[J
__K™XÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠK‹Š^ÜÝ\\ŠK
K\ÖÚ—O[‹\ÖÕ—O\ŸVÒ]WJ
^Ý\ÖÕ—OUÊÙ]N\ÖÕ—KY˜][˜[YN\ÖÚ—K˜[Y]N\ÖÕ—_J_VÚÝWJJ^ÜÝ\\–ÚÝWJJK[]H\ÖÚ—K[]H\ÖÕ—__KXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠK
^ÜÝ\\ŠKOO™OOOLJ__K™XÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠK
^ÜÝ\\ŠKKOO™OOOL
__NÙ[˜Ý[Ûˆ
J^Ü™]\›ˆ\[ÙˆOOXÝš[™ØØ“[X™\‹š\Ò[YÙ\ŠJOØ	Ù_\˜	ÙKÑš^Y
Š_\[]Y^Ø[˜ÚÜ•\JK
^Û]YVÖWJ
NÚYŠJ[Ÿ‹›^[Ý]	‰›‹›^[Ý]OOXÜÚ][Û˜
J\ÝÚ]Ú
˜[œÙ›Ü›X[ˆ
˜[œÙ›Ü›OX
KK˜[˜ÚÜ•\J^ØØ\ÙX›ÝÛPÙ[\˜˜[œÙ›Ü›JÏX˜[œÛ]JML	KLL	JXØœ™XZÎØØ\ÙX›ÝÛSY˜[œÙ›Ü›JÏX˜[œÛ]JLL	JXØœ™XZÎØØ\ÙX›ÝÛTšYÚ˜[œÙ›Ü›JÏX˜[œÛ]JLL	KLL	JXØœ™XZÎØØ\ÙXZYPÙ[\˜˜[œÙ›Ü›JÏX˜[œÛ]JML	KML	JXØœ™XZÎØØ\ÙXZYSY˜[œÙ›Ü›JÏX˜[œÛ]JML	JXØœ™XZÎØØ\ÙXZYTšYÚ˜[œÙ›Ü›JÏX˜[œÛ]JLL	KML	JXØœ™XZÎØØ\ÙXÜÙ[\˜˜[œÙ›Ü›JÏX˜[œÛ]JML	K
XØœ™XZÎØØ\ÙXÜšYÚ˜[œÙ›Ü›JÏX˜[œÛ]JLL	K
XØœ™XZß_K[Y[œÚ[ÛœÊK
^Û]YVÖWJ
KYKËOYKšÚYŠ‹›^[Ý]Ëš[˜ÛY\Ê›ÝØ
J^Û][–ÒKOYK˜ÛÛÜ[‹NÚOOOKLOÊOSX]œÝ[T™XÚ\ÙJ˜ÛÛ[[•ÚYËœÛXÙJ˜Ý\œ™[ÛÛ[[ŠJK˜Ý\œ™[ÛÛ[[L
NŠOSX]œÝ[T™XÚ\ÙJ˜ÛÛ[[•ÚYËœÛXÙJ˜Ý\œ™[ÛÛ[[‹˜Ý\œ™[ÛÛ[[ŠÚJJK˜Ý\œ™[ÛÛ[[J˜Ý\œ™[ÛÛ[[ŠÙK˜ÛÛÜ[ŠI]˜ÛÛ[[•ÚYË›[™Ý
K\Ó˜SŠJ_
YKÏXJ_]ÚY\OOXØ]]Ø–
ŠKšZYÚZOOOXØ]]Ø–
J_KÜÚ][ÛŠK
^Û]YVÖWJ
NÛË›^[Ý]	‰›‹›^[Ý]OOXÜÚ][Û˜
œÜÚ][ÛXXœÛÛ]X›YV
Kž
KÜV
KžJJ_K›Ý]JK
^ÙKœ›Ý]I‰Š˜[œÙ›Ü›X[ˆ
˜[œÙ›Ü›OX
K˜[œÙ›Ü›JÏX›Ý]JIÙKœ›Ý]_YYÊX˜[œÙ›Ü›SÜšYÚ[XÜY
_K™\Ù[˜ÙJK
^ÜÝÚ]Ú
Kœ™\Ù[˜ÙJ^ØØ\ÙX[š\ÚX›Xš\ÚXš[]OXY[˜Øœ™XZÎØØ\ÙXY[˜˜Ø\ÙX[˜XÝ]™X™\Ü^OX›Û™XØœ™XZß_K[YÛŠK
^ÚYŠVÚOOOX\˜X
\ÝÚ]Ú
Kš[YÛŠ^ØØ\ÙX\ÝYžP[^[YÛX\ÝYžKX[Øœ™XZÎØØ\ÙX˜Y^^[YÛXYØœ™XZÎÙY˜][^[YÛYKš[YÛŸY[ÙHÝÚ]Ú
Kš[YÛŠ^ØØ\ÙXY˜[YÛ”Ù[XÝ\Øœ™XZÎØØ\ÙXÙ[\˜˜[YÛ”Ù[XÙ[\˜Øœ™XZÎØØ\ÙXšYÚ˜[YÛ”Ù[X[™Øœ™XZß_KX\™Ú[ŠK
^ÙK›X\™Ú[‰‰Š›X\™Ú[YK›X\™Ú[–ÔJ
K›X\™Ú[Š__NÙ[˜Ý[ÛˆŠK
^ÙVÖWJ
K›^[Ý]OOXÜÚ][Û˜	‰ŠK›Z[•ÏŒ	‰Š›Z[•ÚYV
K›Z[•ÊJKK›X^ÏŒ	‰Š›X^ÚYV
K›X^ÊJKK›Z[’Œ	‰Š›Z[’ZYÚV
K›Z[’
JKK›X^Œ	‰Š›X^ZYÚV
K›X^
JJ_Y[˜Ý[Ûˆ™ŠK‹‹KJ^Û]Ï[™]ÈY
‹‹JNÜ™]\›ˆ\[ÙˆOOXÝš[™ØÛË˜YÝš[™ÊJN™VØ™JÊKË˜ÛÛ\]JJ_Y[˜Ý[Ûˆ™ŠK
^Û][[[[OHLNÚYŠ
YKßYKš
I‰™K˜[YJ^Û]OLÏLÙK›X\™Ú[‰‰ŠOYK›X\™Ú[‹›Y[œÙ]
ÙK›X\™Ú[‹œšYÚ[œÙ]ÏYK›X\™Ú[‹Ü[œÙ]
ÙK›X\™Ú[‹˜›ÝÛR[œÙ]
NÛ]Ï[[Ï[[ÙKœ\˜I‰ŠÏSØš™XÝ˜Ü™X]J[
KÏYKœ\˜K›[™RZYÚOOXÛ[™Kœ\˜K›[™RZYÚËÜYKœ\˜KœÜXÙPX›Ý™OOOXÌ™Kœ\˜KœÜXÙPX›Ý™KË˜›ÝÛOYKœ\˜KœÜXÙP™[ÝÏOOXÌ™Kœ\˜KœÜXÙP™[ÝËË›YYKœ\˜K›X\™Ú[“YOOXÌ™Kœ\˜K›X\™Ú[“YËœšYÚYKœ\˜K›X\™Ú[”šYÚOOXÌ™Kœ\˜K›X\™Ú[”šYÚ
NÛ]YK™›ÛÚYŠ[
^Û]YVÔ]WJ
KYVÖWJ
NÙ›ÜŠÛ‰‰›ˆOO]Ê^ÚYŠ‹™›Û
^Û[‹™›ÛØœ™XZß[[–ÖWJ
__[]OJKßÚY
KXKYVÉWK™›Ûš[™\ŽÚYŠK˜[YK™^]I‰™K˜[YK™^]VÕ—I‰™K˜[YK™^]K˜ÛÛ[\OOOX^Ú[
^Û]T™ŠK˜[YK™^]VÕ—KËËJNÜ]ÚY]šZYÚO]š\Ðœ›ÚÙ[ŸY[Ù^Û]YK˜[YVÚ™J
NÚYŠ
^Û]OT™ŠËËJNÜYKÚYYKšZYÚOYKš\Ðœ›ÚÙ[Ÿ_\ˆOO[[	‰ˆYKÉ‰ŠŠÏXJKˆOO[[	‰ˆYKš	‰ŠŠÏ[Ê_\™]\›žÝÎœ‹›‹\Ðœ›ÚÙ[Žš__Y[˜Ý[Ûˆ™ŠKŠ^Û]ŽÚYŠKÈOOX	‰™KšOOX
\VÙKžKžKKËKšNÙ[Ù^ÚYŠ[Š\™]\›ˆ[Û]OYKÎÚYŠOOOX
^ÚYŠK›X^ÏOOL
^Û]YVÖWJ
NÚO]›^[Ý]OOXÜÚ][Û˜	‰ÈOOXÌ™K›Z[•ßY[ÙHOSX]›Z[ŠK›X^Ë‹ÚY
NÝ˜]šX]\ËœÝ[KÚYV
J_[]OYKšÚYŠOOOX
^ÚYŠK›X^OOL
^Û]YVÖWJ
NØO]›^[Ý]OOXÜÚ][Û˜	‰šOOXÌ™K›Z[’Y[ÙHOSX]›Z[ŠK›X^‹šZYÚ
NÝ˜]šX]\ËœÝ[KšZYÚV
J_\VÙKžKžKKW_\™]\›ˆŸY[˜Ý[Ûˆ™ŠJ^Û]YVÖWJ
NÚYŠ›^[Ý]Ëš[˜ÛY\Ê›ÝØ
J^Û]]ÒKYK˜ÛÛÜ[‹NÚO\OOKLOÓX]œÝ[T™XÚ\ÙJ‹˜ÛÛ[[•ÚYËœÛXÙJ‹˜Ý\œ™[ÛÛ[[ŠJN“X]œÝ[T™XÚ\ÙJ‹˜ÛÛ[[•ÚYËœÛXÙJ‹˜Ý\œ™[ÛÛ[[‹‹˜Ý\œ™[ÛÛ[[ŠÜŠJK\Ó˜SŠJ_
KÏZJ_]›^[Ý]	‰›^[Ý]OOXÜÚ][Û˜	‰ŠKžYKžOL
KK›^[Ý]OOXX›X	‰™KÏOOX	‰\œ˜^Kš\Ð\œ˜^JK˜ÛÛ[[•ÚYÊI‰ŠKÏSX]œÝ[T™XÚ\ÙJK˜ÛÛ[[•ÚYÊJ_Y[˜Ý[ÛˆŠJ^ÜÝÚ]Ú
K›^[Ý]
^ØØ\ÙXÜÚ][Û˜œ™]\›˜˜TÜÚ][Û˜ØØ\ÙX‹]˜œ™]\›˜˜S•˜ØØ\ÙX›\›ÝØœ™]\›˜˜T››ÝØØØ\ÙX›]˜œ™]\›˜˜T›˜ØØ\ÙX›ÝØœ™]\›˜˜T›ÝØØØ\ÙXX›Xœ™]\›˜˜UX›XØØ\ÙX˜œ™]\›˜˜U˜ÙY˜][œ™]\›˜˜TÜÚ][Û˜_Y[˜Ý[ÛˆYŠK‹‹
^Û]SØš™XÝ˜Ü™X]J[
NÙ›ÜŠ]ˆÙˆ
^Û]YVÜ—NÚYŠOO[[
^ÚYŠY‹š\ÓÝÛ”›Ü\JŠJ^ÒY–Ü—JKŠNØÛÛ[Y_ZYŠ[œÝ[˜Ù[ÙˆŠ^Û]O]ÔJ
NÙOÓØš™XÝ˜\ÜÚYÛŠ‹JNJ
P•QÊHHHHÝ[H›Üˆ	ÜŸH›Ý[\[Y[YY]
___\™]\›ˆŸY[˜Ý[ÛˆÙŠK
^Û]Ø]šX]\Î›ŸO]ÜÝ[NœŸO[‹O^Û˜[YN˜]˜]šX]\ÎžØÛ\ÜÎ–Ø˜UÜ˜\\˜KÝ[N“Øš™XÝ˜Ü™X]J[
_KÚ[™[Ž–×_NÚYŠ‹˜Û\ÜËœ\Ú
˜UÜ˜\Y
KK˜›Ü™\Š^Û]ÝÚYÎ›‹[œÙ]Î˜_OYK˜›Ü™\–ÒKËËÏXVÌKXVÌ×KOXVÌJØVÌ—KXVÌWJØVÌ×NÜÝÚ]Ú
K˜›Ü™\‹š[™
^ØØ\ÙX]™[˜˜ËO[–ÌKÌ‹O[–Ì×KÌ‹ÏXØ[ÊL	H
È	Ê–ÌWJÛ–Ì×JKÌ‹Y\
XÏXØ[ÊL	H
È	Ê–ÌJÛ–Ì—JKÌ‹]_\
XØœ™XZÎØØ\ÙXY˜ËO[–ÌKO[–Ì×KÏXØ[ÊL	H
È	Û–ÌWJÛ–Ì×KY\
XÏXØ[ÊL	H
È	Û–ÌJÛ–Ì—K]_\
XØœ™XZÎØØ\ÙXšYÚ›ÏYØØ[ÊL	HH	Ù\
X˜L	XÏ]OØØ[ÊL	HH	Ý_\
X˜L	XØœ™XZß[]VØ˜P›Ü™\˜NÜYŠK˜›Ü™\ŠI‰™‹œ\Ú
˜Tš[Û›X
NÛ]^Û˜[YN˜]˜]šX]\ÎžØÛ\ÜÎ™‹Ý[NžÝÜ˜	Øß\Y˜	Û\ÚY›ËZYÚœß_KÚ[™[Ž–×_NÙ›ÜŠ]HÙ–Ø›Ü™\˜›Ü™\•ÚY›Ü™\ÛÛÜ˜›Ü™\”˜Y]\Ø›Ü™\”Ý[XJ\–ÙWHOO]›ÚY	‰Š˜]šX]\ËœÝ[VÙWO\–ÙWK[]H–ÙWJNÚK˜Ú[™[‹œ\Ú

_Y[ÙHK˜Ú[™[‹œ\Ú

NÙ›ÜŠ]HÙ–Ø˜XÚÙÜ›Ý[™˜XÚÙÜ›Ý[™Û\ÜYÚYZYÚZ[•ÚYZ[’ZYÚX^ÚYX^ZYÚ˜[œÙ›Ü›X˜[œÙ›Ü›SÜšYÚ[˜š\ÚXš[]XJ\–ÙWHOO]›ÚY	‰ŠK˜]šX]\ËœÝ[VÙWO\–ÙWK[]H–ÙWJNÜ™]\›ˆK˜]šX]\ËœÝ[KœÜÚ][Û\‹œÜÚ][ÛOOXXœÛÛ]XØXœÛÛ]X˜™[]]™X[]H‹œÜÚ][Û‹‹˜[YÛ”Ù[‰‰ŠK˜]šX]\ËœÝ[K˜[YÛ”Ù[\‹˜[YÛ”Ù[‹[]H‹˜[YÛ”Ù[ŠK_Y[˜Ý[ÛˆÙŠJ^Û]RÊK^[™[
NÚYŠL
\™]\›ŽÛ]XY[™Ø
Ê
K^[YÛOOXšYÚØšYÚ˜Y
OOXYØY˜šYÚ
NÙVÛ—OX	ÒÊVÛ—K
K]\Y[˜Ý[ÛˆÙŠK
^ÜÝÚ]Ú
K˜XØÙ\ÜÊ^ØØ\ÙX›Û’[\˜XÝ]™Xœ\Ú
˜S›Û’[\˜XÝ]™X
NØœ™XZÎØØ\ÙX™XYÛ›Xœ\Ú
˜T™XYÛ›X
NØœ™XZÎØØ\ÙX›ÝXÝYœ\Ú
˜Q\ØX›Y
NØœ™XZß_Y[˜Ý[ÛˆYŠJ^Ü™]\›ˆKœ™[]˜[›[™ÝŒ	‰ˆYKœ™[]˜[ÌK™^ÛYY	‰™Kœ™[]˜[ÌKšY]Û˜[YOOOXš[Y[˜Ý[Ûˆ™ŠJ^Û]YVÔ]WJ
VÒKœ\˜TÝXÚÎÜ™]\›ˆ›[™ÝÝ˜]
LJN›[Y[˜Ý[ÛˆYŠKŠ^ÚYŠ‹˜]šX]\Ë˜Û\ÜÏËš[˜ÛY\Ê˜TšXÚ
J^Ý	‰ŠKšOOX	‰ŠšZYÚX]]Ø
KKÏOOX	‰ŠÚYX]]Ø
JNÛ]R™ŠJNÚYŠŠ^Û]O[‹˜]šX]\ËœÝ[NÜÝÚ]Ú
K™\Ü^OX›^K™›^\™XÝ[ÛXÛÛ[[˜‹[YÛŠ^ØØ\ÙXÜ™Kš\ÝYžPÛÛ[XÝ\Øœ™XZÎØØ\ÙX›ÝÛX™Kš\ÝYžPÛÛ[X[™Øœ™XZÎØØ\ÙXZYX™Kš\ÝYžPÛÛ[XÙ[\˜Øœ™XZß[]\–ÔJ
NÙ›ÜŠ]Û‹—[ÙˆØš™XÝ™[šY\Ê
J[ˆ[ˆ_
VÛ—O\Š___Y[˜Ý[ÛˆŠK‹Š^ÚYŠ[Š^Ù[]H‹™›Û˜[Z[NÜ™]\›Ÿ[]OP™
K\Y˜XÙJNÜ‹™›Û˜[Z[OX‰Ú_H˜Û]O[‹™š[™
JNÚYŠJ^Û]Ù›Û˜[Z[N›ŸOXKœ™YÝ[\‹˜ÜÜÑ›Û[™›ÎÛˆOOZI‰Š‹™›Û˜[Z[OX‰ÛŸH˜
NÛ]ÏR™Š
NÚYŠÉ‰›Ë›[™RZYÚOOX‹›[™RZYÚ
\™]\›ŽÛ]ÏR™
KJNÜÉ‰Š‹›[™RZYÚSX]›X^
KŒ‹Ë›[™RZYÚ
J__Y[˜Ý[Ûˆ™ŠJ^Û]T
K[ØYY˜][›ÝØÛÛˆLžPÛÛ™\[˜ÛÙ[™ÎˆLJNÜ™]\›ˆÝš™YŽ›[Y[˜Ý[ÛˆYŠK
^Ü™]\›žÛ˜[YN˜]˜]šX]\ÎžØÛ\ÜÎ–ÙK›^[Ý]OOX‹]˜Ø˜S˜˜˜T›_KÚ[™[Ž_Y[˜Ý[Ûˆ	ŠJ^ÚYŠYVÒJ\™]\›ˆ[Û]^Û˜[YN˜]˜]šX]\Î™VÒK˜]šX]\ËÚ[™[Ž™VÒK˜Ú[™[ŸNÚYŠVÒK™˜Z[[™Ó›ÙJ^Û]YVÒK™˜Z[[™Ó›ÙVÓWJ
NÛ‰‰ŠK›^[Ý]™[™ÕÚ]
]˜
OÝ˜Ú[™[‹œ\Ú
YŠKÛ—JJN˜Ú[™[‹œ\Ú
ŠJ_\™]\›ˆ˜Ú[™[‹›[™ÝOOLÛ[Y[˜Ý[Ûˆ\
KŠ^Û]YVÒKO\‹˜]˜Z[X›TÜXÙKØKËË×O[ŽÜÝÚ]Ú
K›^[Ý]
^ØØ\ÙXÜÚ][Û˜œ‹ÚYSX]›X^
‹ÚYJÜÊK‹šZYÚSX]›X^
‹šZYÚÊØÊK‹˜Ú[™[‹œ\Ú

NØœ™XZÎØØ\ÙX‹]˜˜Ø\ÙX›]˜Š\‹›[™_‹˜][\OOLJI‰Š‹›[™OTYŠK×JK‹˜Ú[™[‹œ\Ú
‹›[™JK‹›[X™\’[“[™OL
K‹›[X™\’[“[™JÏLK‹›[™K˜Ú[™[‹œ\Ú

K‹˜][\OOLÊ‹˜Ý\œ™[ÚY
Ï\Ë‹šZYÚSX]›X^
‹šZYÚ‹œ™]’ZYÚ
ØÊJNŠ‹˜Ý\œ™[ÚY\Ë‹œ™]’ZYÚ\‹šZYÚ‹šZYÚ
ÏXË‹˜][\L
K‹ÚYSX]›X^
‹ÚY‹˜Ý\œ™[ÚY
NØœ™XZÎØØ\ÙX›\›ÝØ˜Ø\ÙX›ÝØžÜ‹˜Ú[™[‹œ\Ú

K‹ÚY
Ï\Ë‹šZYÚSX]›X^
‹šZYÚÊNÛ]OV
‹šZYÚ
NÙ›ÜŠ]Ùˆ‹˜Ú[™[Š]˜]šX]\ËœÝ[KšZYÚYNØœ™XZßXØ\ÙXX›Xœ‹ÚYUJË‹ÚYKÚY
K‹šZYÚ
ÏXË‹˜Ú[™[‹œ\Ú

NØœ™XZÎØØ\ÙX˜œ‹ÚYUJË‹ÚYKÚY
K‹šZYÚ
ÏXË‹˜Ú[™[‹œ\Ú

NØœ™XZß_Y[˜Ý[Ûˆ
J^Û]YVÒK˜]˜Z[X›TÜXÙKYK›X\™Ú[ÙK›X\™Ú[‹Ü[œÙ]
ÙK›X\™Ú[‹˜›ÝÛR[œÙ]ŒYK›X\™Ú[ÙK›X\™Ú[‹›Y[œÙ]
ÙK›X\™Ú[‹œšYÚ[œÙ]ŒÜÝÚ]Ú
K›^[Ý]
^ØØ\ÙX‹]˜˜Ø\ÙX›]˜œ™]\›ˆVÒK˜][\OOLÞÝÚYÚY\‹YVÒK˜Ý\œ™[ÚYZYÚšZYÚ[‹YVÒKœ™]’ZYÚNžÝÚYÚY\‹ZYÚšZYÚ[‹YVÒKšZYÚNØØ\ÙX›\›ÝØ˜Ø\ÙX›ÝØœ™]\›žÝÚY“X]œÝ[T™XÚ\ÙJVÒK˜ÛÛ[[•ÚYËœÛXÙJVÒK˜Ý\œ™[ÛÛ[[ŠJKZYÚšZYÚ\ŸNØØ\ÙXX›X˜Ø\ÙX˜œ™]\›žÝÚYÚY\‹ZYÚšZYÚ[‹YVÒKšZYÚNÙY˜][œ™]\›ˆ_Y[˜Ý[Ûˆœ
J^Û]YKÏOOXÓ˜SŽ™KËYKšOOXÓ˜SŽ™KšÜ‹WOVÌNÜÝÚ]Ú
K˜[˜ÚÜ•\_
^ØØ\ÙX›ÝÛPÙ[\˜–Ü‹WOVÝÌ‹—NØœ™XZÎØØ\ÙX›ÝÛSY–Ü‹WOVÌ—NØœ™XZÎØØ\ÙX›ÝÛTšYÚ–Ü‹WOVÝ—NØœ™XZÎØØ\ÙXZYPÙ[\˜–Ü‹WOVÝÌ‹‹Ì—NØœ™XZÎØØ\ÙXZYSY–Ü‹WOVÌ‹Ì—NØœ™XZÎØØ\ÙXZYTšYÚ–Ü‹WOVÝ‹Ì—NØœ™XZÎØØ\ÙXÜÙ[\˜–Ü‹WOVÝÌ‹NØœ™XZÎØØ\ÙXÜšYÚ–Ü‹WOVÝNØœ™XZß[]KÎÜÝÚ]Ú
Kœ›Ý]_
^ØØ\ÙH–ØK×OVË\‹ZWNØœ™XZÎØØ\ÙHL–ØK×OVËZK—KÝ—OVÛ‹]NØœ™XZÎØØ\ÙHN–ØK×OVÜ‹WKÝ—OVË][—NØœ™XZÎØØ\ÙHÌ–ØK×OVÚK\—KÝ—OVË[‹NØœ™XZß\™]\›–ÙKž
ØJÓX]›Z[Š
KKžJÛÊÓX]›Z[ŠŠKX]˜XœÊ
KX]˜XœÊŠW_Y[˜Ý[Ûˆœ
K
^ÚYŠVÔ]WJ
VÒK™š\œÝ[œÜ]X›OOO[[KÏOOLKšOOL
\™]\›ˆLÛ]YVÖWJ
K[–ÒOË˜][\ËKK×O[œ
JNÜÝÚ]Ú
‹›^[Ý]
^ØØ\ÙX‹]˜˜Ø\ÙX›]˜œ™]\›ˆOOLÙVÔ]WJ
VÒK››Ó^[Ý]˜Z[\™OÙKÏOOXÝÚYŒŽ“X]œ›Ý[™
K]ÚY
OLŽ™KšOOX	‰“X]œ›Ý[™
Ë]šZYÚ
OŒÈLN™KÏOOXÝÚYŒŽ“X]œ›Ý[™
K]ÚY
OLÈL›–ÒK›[X™\’[“[™OOOLÝšZYÚŒŽˆLN™VÔ]WJ
VÒK››Ó^[Ý]˜Z[\™OÈL™KšOOX	‰“X]œ›Ý[™
Ë]šZYÚ
OŒÈLN™KÏOOXX]œ›Ý[™
K]ÚY
OLÝšZYÚŒŽ›–ÝYJ
OÈLNšZYÚŒŽØØ\ÙXX›X˜Ø\ÙX˜œ™]\›ˆVÔ]WJ
VÒK››Ó^[Ý]˜Z[\™OÈL™KšOOX	‰ˆYVÛJ
OÓX]œ›Ý[™
Ë]šZYÚ
OLŽ™KÏOOXX]œ›Ý[™
K]ÚY
OLÝšZYÚŒŽ›–ÝYJ
OÈLNšZYÚŒŽØØ\ÙXÜÚ][Û˜šYŠVÔ]WJ
VÒK››Ó^[Ý]˜Z[\™_KšOOXX]œ›Ý[™
ÊÚK]šZYÚ
OLŠ\™]\›ˆLÛ]ÏYVÔ]WJ
VÒK˜Ý\œ™[ÛÛ[\™XNÜ™]\›ˆÊÚOœËšØØ\ÙX›\›ÝØ˜Ø\ÙX›ÝØœ™]\›ˆVÔ]WJ
VÒK››Ó^[Ý]˜Z[\™_KšOOXÈL“X]œ›Ý[™
Ë]šZYÚ
OLŽÙY˜][œ™]\›ˆL_[]S[\]KšY\X‹ËÝÝÝËÌË›Ü™ËÌŒÜÝ™Ø\K×’

ÊIËÜ[™]ÈÙ]
Ø[XYÙKÙÚY˜[XYÙKÚœYØ[XYÙKÚœØ[XYÙKÜœYØ[XYÙKÜ™Ø[XYÙKØ\™Ø[XYÙKÞ\™Ø[XYÙKØ›\[XYÙKÞ[\ËX›\[XYÙKÝY™˜[XYÙKÝY˜\XØ][Û‹ÛØÝ]\Ý™X[XJKÜVÖÖÍ‹Í×K[XYÙKØ›\KÖÌMKŒM‹MWK[XYÙKÚœYØKÖÍÌËÌË‹K[XYÙKÝY™˜KÖÍÍËÍË—K[XYÙKÝY™˜KÖÍÌKÌËÌM‹MËM×K[XYÙKÙÚY˜KÖÌLÍËÎÌKLËL‹LK[XYÙKÜ™ØWNÙ[˜Ý[ÛˆÜ
J^ÚYŠY_YK˜›Ü™\Š\™]\›žÝÎŒŒNÛ]YK˜›Ü™\–ÑÝWJ
NÜ™]\›ˆÞÝÎÚYÖÌJÝÚYÖÌ—JÝš[œÙ]ÖÌJÝš[œÙ]ÖÌ—KÚYÖÌWJÝÚYÖÌ×JÝš[œÙ]ÖÌWJÝš[œÙ]ÖÌ×_NžÝÎŒŒ_Y[˜Ý[Ûˆ
J^Ü™]\›ˆK›X\™Ú[‰‰ŠK›X\™Ú[‹Ü[œÙ]K›X\™Ú[‹œšYÚ[œÙ]K›X\™Ú[‹˜›ÝÛR[œÙ]K›X\™Ú[‹›Y[œÙ]
_Y[˜Ý[Ûˆ\
K
^ÚYŠYK˜[YJ^Û][™]ÈÚ
ßJNÙVÑWJ
KK˜[YO]YK˜[YVÚÙJ
_Y[˜Ý[ÛŠ™
J^Ù›ÜŠ]ÙˆVÜ]WJ
J^ÚYŠ[œÝ[˜Ù[ÙˆZ
^ÞZY[
ÒWJ
NØÛÛ[Y_^ZY[_Y[˜Ý[Ûˆœ
J^Ü™]\›ˆK˜[Y]OË›[\ÝOOX\œ›Ü˜Y[˜Ý[Ûˆ
J^Ù›ÜŠÙNÊ^ÚYŠYK˜]™\œØ[
^ÙVÐYOYVÖWJ
VÐYNÜ™]\›ŸZYŠVÐYJ\™]\›ŽÛ][[Ù›ÜŠ]ˆÙˆK˜]™\œØ[Ü]WJ
JZYŠ‹›Ü\˜][ÛOOX™^
^Ý[ŽØœ™XZßZYŠ]]œ™YŠ^ÙVÐYOYVÖWJ
VÐYNÜ™]\›Ÿ[]YVÔ]WJ
NÙVÐYOJÊÛ–ÐYNÛ][–ÑYJœ™Y‹JNÚYŠ\Š\™]\›ŽÙO\–Ì__Y[˜Ý[Ûˆ\
K
^Û]YK˜\ÜÚ\ÝÚYŠŠ^Û]O[–ÕWJ
NÙI‰Š]OYJNÛ][‹œ›ÛK›X]Ú
\
NÚYŠŠ^Û]O\–ÌWNÝœ›ÛOXXY[™ØØ\šXK[]™[OY__ZYŠK›^[Ý]OOXX›X
]œ›ÛOXX›XÙ[ÙHYŠK›^[Ý]OOX›ÝØ
]œ›ÛOX›ÝØÙ[Ù^Û]YVÖWJ
NÛ‹›^[Ý]OOX›ÝØ	‰Šœ›ÛO[‹˜\ÜÚ\ÝËœ›ÛOOOXØÛÛ[[šXY\˜˜Ù[
__Y[˜Ý[Ûˆ
J^ÚYŠYK˜\ÜÚ\Ý
\™]\›ˆ[Û]YK˜\ÜÚ\ÝÜ™]\›ˆœÜXZÉ‰œÜXZÖÕ—HOOXÝœÜXZÖÕ—NÛÛ\ÝÛÛ\Õ—N›[Y[˜Ý[ÛˆÜ
J^Ü™]\›ˆKœÝXØÙ\ÜÊÛ˜[YN˜]˜]šX]\ÎžØÛ\ÜÎ–Ø˜TšXÚKÝ[N“Øš™XÝ˜Ü™X]J[
_KÚ[™[Ž–ÞÛ˜[YN˜Ü[˜]šX]\ÎžÜÝ[N“Øš™XÝ˜Ü™X]J[
_K˜[YN™_W_J_Y[˜Ý[ÛˆÜ
J^Û]YVÔ]WJ
NÝÒK™š\œÝ[œÜ]X›OOO[[	‰ŠÒK™š\œÝ[œÜ]X›OYKÒK››Ó^[Ý]˜Z[\™OHL
_Y[˜Ý[Ûˆœ
J^Û]YVÔ]WJ
NÝÒK™š\œÝ[œÜ]X›OOOYI‰ŠÒK››Ó^[Ý]˜Z[\™OHLJ_Y[˜Ý[Ûˆ\
J^ÚYŠVÒ_
VÒOSØš™XÝ˜Ü™X]J[
KK\™Ù]\OOOX]]Ø
J\™]\›ˆLNÛ]YVÔ]WJ
K[[ÚYŠK\™Ù]
^ÚYŠ]ÑYJK\™Ù]VÖWJ
JK[Š\™]\›ˆLNÛ[–Ì_[]ØÝ\œ™[YÙP\™XNœ‹Ý\œ™[ÛÛ[\™XNš_O]ÒNÚYŠK\™Ù]\OOOXYÙP\™XX
\™]\›ˆˆ[œÝ[˜Ù[Ùˆ[_
[[
KKœÝ\™]ÏÊVÒK\™Ù][Ÿ‹L
N›‰‰›ˆOO\ÊVÒK\™Ù][‹L
NˆLNÛˆ[œÝ[˜Ù[ÙˆÜ
[[
NÛ]O[‰‰›–ÖWJ
KËÏXNÚYŠKœÝ\™]ÊZYŠŠ^Û]OXK˜ÛÛ[\™XK˜Ú[™[‹YKš[™^ÙŠJKYKš[™^ÙŠŠNÝOOKLI‰‰‰ŠÏ[[
KÏ\‹L_Y[ÙHÏ\‹˜ÛÛ[\™XK˜Ú[™[‹š[™^ÙŠJNÙ[ÙHYŠ‰‰›ˆOOZJ[ÏXK˜ÛÛ[\™XK˜Ú[™[‹š[™^ÙŠŠKLKÏXOOO\Û[˜NÙ[ÙH™]\›ˆLNÜ™]\›ˆVÒK\™Ù]\ËVÒKš[™^[ËLY[˜Ý[Ûˆœ
KŠ^Û]YVÔ]WJ
KO\–ÒK››Ó^[Ý]˜Z[\™KO]ÖWNÝÖWOJ
OO™K–ÒK››Ó^[Ý]˜Z[\™OHLÛ]Ï]ÕWJŠNÙVÑ]WJËš[Ë˜˜›Þ
K–ÒK››Ó^[Ý]˜Z[\™OZKÖWOX_]˜\ˆXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\X\˜[˜ÙQš[\˜
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KÜXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\˜ØL
K\Ë˜Ú\˜Ý[\UÊÙ]N™K˜Ú\˜Ý[\‹Y˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ëš[™QÊKš[™Ø]™[˜YšYÚJK\ËšYYKšY\ËœÝ\[™ÛOU™
Ù]N™KœÝ\[™ÛKY˜][˜[YNŒ˜[Y]N™OOˆLJK\ËœÝÙY\[™ÛOU™
Ù]N™KœÝÙY\[™ÛKY˜][˜[YNŒÍŒ˜[Y]N™OOˆLJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™YÙO[[\Ë™š[[[VÕWJ
^Û]O]\Ë™YÙ_™]ÈJßJKYVÔJ
KSØš™XÝ˜Ü™X]J[
NÝ\Ë™š[Ëœ™\Ù[˜ÙOOOXš\ÚX›XÓØš™XÝ˜\ÜÚYÛŠ‹\Ë™š[ÔJ
JN›‹™š[X˜[œÜ\™[‹œÝ›ÚÙUÚYV
Kœ™\Ù[˜ÙOOOXš\ÚX›XÙKXÚÛ™\ÜÎŒ
K‹œÝ›ÚÙO]˜ÛÛÜŽÛ]‹O^Þ[œÎš\Ý[NžÝÚY˜L	XZYÚ˜L	XÝ™\™›ÝÎ˜š\ÚX›X_NÚYŠ\ËœÝÙY\[™ÛOOOLÍŒ
\^Û˜[YN˜[\ÙX]šX]\ÎžÞ[œÎš\Þ˜L	XÞN˜L	Xž˜L	XžN˜L	XÝ[N›Ÿ_NÙ[Ù^Û]O]\ËœÝ\[™ÛJ“X]”KÌN]\ËœÝÙY\[™ÛJ“X]”KÌNOJÊ\ËœÝÙY\[™ÛOŒN
KÛËËËOVÍL
ŠJÓX]˜ÛÜÊJJKL
ŠKSX]œÚ[ŠJJKL
ŠJÓX]˜ÛÜÊJÝ
JKL
ŠKSX]œÚ[ŠJÝ
JWNÜ^Û˜[YN˜]]šX]\ÎžÞ[œÎš\˜H	ÛßH	ÜßHHLL	Ø_H	ØßH	ÛX™XÝÜ‘Y™™XÝ˜›Û‹\ØØ[[™Ë\Ý›ÚÙXÝ[N›Ÿ_KØš™XÝ˜\ÜÚYÛŠKÝšY]Ð›Þ˜LL™\Ù\™P\ÜXÝ˜][Î˜›Û™XJ_[]O^Û˜[YN˜Ý™ØÚ[™[Ž–Ü—K]šX]\Îš_NÜ™]\›ˆ
\ÖÖWJ
VÖWJ
JOÜKœÝXØÙ\ÜÊÛ˜[YN˜]˜]šX]\ÎžÜÝ[NžÙ\Ü^N˜[›[™XÚY˜L	XZYÚ˜L	X_KÚ[™[Ž–ØW_JNŠK˜]šX]\ËœÝ[KœÜÚ][ÛXXœÛÛ]XKœÝXØÙ\ÜÊJJ__KÜXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\™XXL
K\Ë˜ÛÛÜ[UÊÙ]N™K˜ÛÛÜ[‹Y˜][˜[YNŒK˜[Y]N™OO™OL_OOOKL_JK\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËžRÊKž
K\ËžORÊKžK
K\Ë™\ØÏ[[\Ë™^˜\Ï[[\Ë˜\™XO[™]ÈK\Ë™˜]Ï[™]ÈK\Ë™^Øš™XÝ[™]ÈK\Ë™^ÛÜ›Ý\[™]ÈK\Ë™šY[[™]ÈK\ËœÝX™›Ü›O[™]ÈK\ËœÝX™›Ü›TÙ][™]È_J–ÒWJ
^ÞZY[
™
\Ê_VÙJ
^Ü™]\›ˆLVØYJ
^Ü™]\›ˆLVÑ]WJK
^Û]Û‹‹KWO]Ý\ÖÒKÚYSX]›X^
\ÖÒKÚYŠÚJK\ÖÒKšZYÚSX]›X^
\ÖÒKšZYÚŠØJK\ÖÒK˜Ú[™[‹œ\Ú
J_VÐWJ
^Ü™]\›ˆ\ÖÒK˜]˜Z[X›TÜXÙ_VÕWJJ^Û]UYŠ\ËÜÚ][Û˜
K^ÜÝ[NY\ÖÑ™KÛ\ÜÎ–Ø˜P\™XX_NÜYŠ\ÊI‰›‹˜Û\ÜËœ\Ú
˜Tš[Û›X
K\Ë›˜[YI‰Š‹ž˜S˜[YO]\Ë›˜[YJNÛ]V×NÝ\ÖÒO^ØÚ[™[Žœ‹ÚYŒZYÚŒ]˜Z[X›TÜXÙN™_NÛ]O]\ÖÓÝWJÙš[\Ž›™]ÈÙ]
Ø\™XX˜]ØšY[^ÛÜ›Ý\ÝX™›Ü›XÝX™›Ü›TÙ]JK[˜ÛYNˆLJNÚYŠZKœÝXØÙ\ÜÊ\™]\›ˆKš\Ðœ™XZÊ
OÚNŠ[]H\ÖÒKK‘RST‘JNÝÚYV
\ÖÒKÚY
KšZYÚV
\ÖÒKšZYÚ
NÛ]O^Û˜[YN˜]˜]šX]\Î›‹Ú[™[ŽœŸKÏVÝ\Ëž\ËžK\ÖÒKÚY\ÖÒKšZYÚNÜ™]\›ˆ[]H\ÖÒKKœÝXØÙ\ÜÊKÊ__KÜXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\ÜÚ\ÝL
K\ËšYYKšY\Ëœ›ÛOYKœ›Û_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËœÜXZÏ[[\ËÛÛ\[[VÕWJ
^Ü™]\›ˆ\ËÛÛ\Ë–Õ—_[_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜\˜ÛÙXL
K\Ë˜Ú\‘[˜ÛÙ[™ÏR
Ù]N™K˜Ú\‘[˜ÛÙ[™ÏÙK˜Ú\‘[˜ÛÙ[™ËÓÝÙ\Ø\ÙJ
N˜Y˜][˜[YN˜˜[Y]N™OO–Ø]‹NšYËYš]™X›ÛÜXÚYšXØØšØØ‹LNÌØ‹LŒÌL˜ÜØËMMŒX›Û™XÚYZš\ØXÜËL˜]‹LM˜Kš[˜ÛY\ÊJ_K›X]Ú
Ú\ÛËNNKWÌŸKÊ_JK\Ë˜ÚXÚÜÝ[OQÊK˜ÚXÚÜÝ[KØ›Û™X[[ÙL[[ÙLÌ[[ÙLX›[ÙL]]ØJK\Ë™]PÛÛ[[ÛÝ[UÊÙ]N™K™]PÛÛ[[ÛÝ[Y˜][˜[YN‹LK˜[Y]N™OO™OLJK\Ë™]S[™ÝUÊÙ]N™K™]S[™ÝY˜][˜[YN‹LK˜[Y]N™OO™OLJK\Ë™]T™\QÊK™]T™\Ø›Û™X›]PÛÛ\™\ÜØJK\Ë™]T›ÝÐÛÝ[UÊÙ]N™K™]T›ÝÐÛÝ[Y˜][˜[YN‹LK˜[Y]N™OO™OLJK\Ë™[™Ú\YK™[™Ú\Ÿ\Ë™\œ›ÜÛÜœ™XÝ[Û“]™[UÊÙ]N™K™\œ›ÜÛÜœ™XÝ[Û“]™[Y˜][˜[YN‹LK˜[Y]N™OO™OL	‰™ONJK\ËšYYKšY\Ë›[Ù[RZYÚRÊK›[Ù[RZYÚ[[X
K\Ë›[Ù[UÚYRÊK›[Ù[UÚYŒ[[X
K\Ëœš[ÚXÚÑYÚ]UÊÙ]N™Kœš[ÚXÚÑYÚ]Y˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ëœ›ÝÐÛÛ[[”˜][ÏUY
Kœ›ÝÐÛÛ[[”˜][ÊK\ËœÝ\Ú\YKœÝ\Ú\Ÿ\Ë^ØØ][ÛQÊK^ØØ][Û‹Ø™[ÝØX›Ý™XX›Ý™Q[X™YY™[ÝÑ[X™YY›Û™XJK\Ë[˜Ø]OUÊÙ]N™K[˜Ø]KY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë\OQÊK\OÙK\KÓÝÙ\Ø\ÙJ
N˜^XË˜ÛÙX˜\‹˜ÛÙL›ÙZ[™\ÝšX[˜ÛÙL›ÙZ[\›X]™Y˜ÛÙL›Ù[X]š^˜ÛÙL›Ù\Ý[™\™˜ÛÙLÛÙŽK˜ÛÙLÛÙŽY^[™Y˜ÛÙLLK˜ÛÙMK˜ÛÙNLË˜ÛÙLLŽ˜ÛÙLLŽK˜ÛÙLLŽ‹˜ÛÙLLŽË˜ÛÙLLŽÜØØË™][X]š^™X[Ž™X[ŽY‹™X[ŽYK™X[ŒLË™X[ŒLØY‹™X[ŒLØYK™X[ŒLÜØÙ™š[K›ÙÛX\œË›X^XÛÙK›\ÚKœMËœMÛXXÜ›Ëœ\ÜÙ^KœÜÝ]\ØÝ\Ý‹œÜÝ]\ØÝ\ÝËœÜÝ]\Ü™\\ZYœÜÝ]\ÜÝ[™\™œÜÝZÜ›MØØËœÜÝ\Ù˜ËœÜÝ\Ú[X‹œÜÝ\ÜÝ[™\™œÜÝ\Í^š\œ\˜ÛÙKœ™šYœœÜÌMœœÜÌM^[™YœœÜÌM[Z]YœœÜÌMÝXÚÙYœœÜÌMÝXÚÙYÛ[šKœœÜÌM[˜Ø]Y[\[‹XØÌLŽXØÌLŽ˜[™ÛKXØÌLŽÜØØË\ØK\ØXY‹\ØXYK\Ø\ØÙ\ÙK\ÙXY‹\ÙXYK\ÙX[Œ‹\ÙX[K\ÛX^XÛÙXœÜ]
˜
JK\Ë\Ó[ÙOQÊK\Ó[ÙKØ\ÐØ\œšY\˜[\›˜][Û˜[Ø\œšY\˜ÙXÝ\™TÞ[X›ÛÝ[™\™Þ[X›ÛJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÚYS˜\œ›ÝÔ˜][ÏUY
KÚYS˜\œ›ÝÔ˜][ÊK\Ë™[˜Üž\[[\Ë™^˜\Ï[[_K\XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹š[™L
K\Ë›X]ÚQÊK›X]ÚØÛ˜ÙX]T™Y˜ÛØ˜[›Û™XJK\Ëœ™YYKœ™YŸ\ËœXÝ\™O[[_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹š[™][\Ø
K\Ë˜ÛÛ›™XÝ[ÛYK˜ÛÛ›™XÝ[ÛŸ\Ë›X™[™YYK›X™[™YŸ\Ëœ™YYKœ™YŸ\Ë˜[YT™YYK˜[YT™YŸ_KÜXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›ÛÚÙ[™
K\ËšYYKšY\Ë›XY\YK›XY\Ÿ\Ë˜Z[\YK˜Z[\Ÿ\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KÜXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›ÛÛX[˜
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÕWJJ^Ü™]\›ˆÜ
\ÖÕ—OOOLOØX˜
__K\XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›Ü™\˜L
K\Ë˜œ™XZÏQÊK˜œ™XZËØÛÜÙXÜ[˜JK\Ëš[™QÊKš[™Ø]™[˜YšYÚJK\ËšYYKšY\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÜ›™\[™]ÈJ
K\Ë™YÙO[™]ÈJ
K\Ë™^˜\Ï[[\Ë™š[[[\Ë›X\™Ú[[[VÑÝWJ
^ÚYŠ]\ÖÒJ^Û]O]\Ë™YÙK˜Ú[™[‹œÛXÙJ
NÚYŠK›[™Ý
^Û]YK˜]
LJ_™]ÈJßJNÙ›ÜŠ]YK›[™ÝÛÛŠÊÊYKœ\Ú

_[]YK›X\
OO™KXÚÛ™\ÜÊKVÌNÝ\Ë›X\™Ú[‰‰Š–ÌO]\Ë›X\™Ú[‹Ü[œÙ]–ÌWO]\Ë›X\™Ú[‹œšYÚ[œÙ]–Ì—O]\Ë›X\™Ú[‹˜›ÝÛR[œÙ]–Ì×O]\Ë›X\™Ú[‹›Y[œÙ]
K\ÖÒO^ÝÚYÎ[œÙ]Î›‹YÙ\Î™__\™]\›ˆ\ÖÒ_VÔJ
^Û]ÙYÙ\Î™_O]\ÖÑÝWJ
KYK›X\
OOžÛ]YVÔJ
NÜ™]\›ˆ˜ÛÛÜŸXÌJKSØš™XÝ˜Ü™X]J[
NÚYŠ\Ë›X\™Ú[‰‰“Øš™XÝ˜\ÜÚYÛŠ‹\Ë›X\™Ú[–ÔJ
JK\Ë™š[Ëœ™\Ù[˜ÙOOOXš\ÚX›X	‰“Øš™XÝ˜\ÜÚYÛŠ‹\Ë™š[ÔJ
JK\Ë˜ÛÜ›™\‹˜Ú[™[‹œÛÛYJOO™Kœ˜Y]\ÈOOL
J^Û]O]\Ë˜ÛÜ›™\‹˜Ú[™[‹›X\
OO™VÔJ
JNÚYŠK›[™ÝOOLŸK›[™ÝOOLÊ^Û]YK˜]
LJNÙ›ÜŠ]YK›[™ÝÛÛŠÊÊYKœ\Ú

_[‹˜›Ü™\”˜Y]\ÏYK›X\
OO™Kœ˜Y]\ÊKš›Ú[Š
_\ÝÚ]Ú
\Ëœ™\Ù[˜ÙJ^ØØ\ÙX[š\ÚX›X˜Ø\ÙXY[˜›‹˜›Ü™\”Ý[OXØœ™XZÎØØ\ÙX[˜XÝ]™X›‹˜›Ü™\”Ý[OX›Û™XØœ™XZÎÙY˜][›‹˜›Ü™\”Ý[O]›X\
OO™KœÝ[JKš›Ú[Š
NØœ™XZß\™]\›ˆ‹˜›Ü™\•ÚY]›X\
OO™KÚY
Kš›Ú[Š
K‹˜›Ü™\ÛÛÜ]›X\
OO™K˜ÛÛÜŠKš›Ú[Š
KŸ_KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹œ™XZØL
K\Ë˜Y\QÊK˜Y\‹Ø]]ØÛÛ[\™XXYÙP\™XXYÙQ]™[˜YÙSÙJK\Ë˜Y\•\™Ù]YK˜Y\•\™Ù]\Ë˜™Y›Ü™OQÊK˜™Y›Ü™KØ]]ØÛÛ[\™XXYÙP\™XXYÙQ]™[˜YÙSÙJK\Ë˜™Y›Ü™U\™Ù]YK˜™Y›Ü™U\™Ù]\Ë˜›ÛÚÙ[™XY\YK˜›ÛÚÙ[™XY\Ÿ\Ë˜›ÛÚÙ[™˜Z[\YK˜›ÛÚÙ[™˜Z[\Ÿ\ËšYYKšY\Ë›Ý™\™›ÝÓXY\YK›Ý™\™›ÝÓXY\Ÿ\Ë›Ý™\™›ÝÕ\™Ù]YK›Ý™\™›ÝÕ\™Ù]\Ë›Ý™\™›ÝÕ˜Z[\YK›Ý™\™›ÝÕ˜Z[\Ÿ\ËœÝ\™]ÏUÊÙ]N™KœÝ\™]ËY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[_K\XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹œ™XZÐY\˜L
K\ËšYYKšY\Ë›XY\YK›XY\Ÿ\ËœÝ\™]ÏUÊÙ]N™KœÝ\™]ËY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë\™Ù]YK\™Ù]\Ë\™Ù]\OQÊK\™Ù]\KØ]]ØÛÛ[\™XXYÙP\™XXJK\Ë˜Z[\YK˜Z[\Ÿ\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËœØÜš\[[_KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹œ™XZÐ™Y›Ü™XL
K\ËšYYKšY\Ë›XY\YK›XY\Ÿ\ËœÝ\™]ÏUÊÙ]N™KœÝ\™]ËY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë\™Ù]YK\™Ù]\Ë\™Ù]\OQÊK\™Ù]\KØ]]ØÛÛ[\™XXYÙP\™XXJK\Ë˜Z[\YK˜Z[\Ÿ\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËœØÜš\[[VÕWJJ^Ü™]\›ˆ\ÖÒO^ßKK‘RST‘__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]Û˜L
K\ËšYÚYÚQÊKšYÚYÚØ[™\Y›Û™XÝ][™X\ÚJK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[VÕWJJ^Û]]\ÖÖWJ
VÖWJ
K^Û˜[YN˜]Û˜]šX]\ÎžÚY\ÖÑ™KÛ\ÜÎ–Ø˜P]Û˜KÝ[Nžß_KÚ[™[Ž–×_NÙ›ÜŠ]HÙˆ™]™[˜Ú[™[Š^ÚYŠK˜XÝ]š]HOOXÛXÚØYKœØÜš\
XÛÛ[YNÛ]Q]
KœØÜš\Õ—JNÚYŠ]
XÛÛ[YNÛ]V™Š\›
NÜ‰‰›‹˜Ú[™[‹œ\Ú
Û˜[YN˜X]šX]\ÎžÚY˜[šØ
Ý\ÖÑ™K™YŽœ‹™]ÕÚ[™ÝÎ›™]ÕÚ[™ÝËÛ\ÜÎ–Ø˜S[šØKÝ[Nžß_KÚ[™[Ž–×_J_\™]\›ˆKœÝXØÙ\ÜÊŠ__KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ø[Ý[]XL
K\ËšYYKšY\Ë›Ý™\œšYOQÊK›Ý™\œšYKØ\ØX›Y\œ›Ü˜YÛ›Ü™XØ\›š[™ØJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ë›Y\ÜØYÙO[[\ËœØÜš\[[_K\XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ø\[Û˜L
K\ËšYYKšY\ËœXÙ[Y[QÊKœXÙ[Y[ØY›ÝÛX[›[™XšYÚÜJK\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ™\Ù\™OSX]˜ÙZ[
ÊKœ™\Ù\™JJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ë™›Û[[\Ë›X\™Ú[[[\Ëœ\˜O[[\Ë˜[YO[[VÚÙJJ^Ý\
\ËJ_VÑÝWJJ^ÚYŠ]\ÖÒJ^Û]ÝÚYZYÚ›ŸOYNÜÝÚ]Ú
\ËœXÙ[Y[
^ØØ\ÙXY˜Ø\ÙXšYÚ˜Ø\ÙX[›[™X]\Ëœ™\Ù\™OLÝ\Ëœ™\Ù\™NØœ™XZÎØØ\ÙXÜ˜Ø\ÙX›ÝÛX›]\Ëœ™\Ù\™OLÛŽ\Ëœ™\Ù\™NØœ™XZß]\ÖÒO^™Š\ËÝÚYZYÚ›ŸJ_\™]\›ˆ\ÖÒ_VÕWJJ^ÚYŠ]\Ë˜[YJ\™]\›ˆK‘STNÝ\ÖÔÙJ
NÛ]]\Ë˜[YVÕWJJKš[ÚYŠ]
\™]\›ˆ\ÖÞJ
KK‘STNÛ]]\Ëœ™\Ù\™NÚYŠ\Ëœ™\Ù\™OL
^Û]ÝÎ›ŸO]\ÖÑÝWJJNÜÝÚ]Ú
\ËœXÙ[Y[
^ØØ\ÙXY˜Ø\ÙXšYÚ˜Ø\ÙX[›[™X\Ëœ™\Ù\™O]Øœ™XZÎØØ\ÙXÜ˜Ø\ÙX›ÝÛX\Ëœ™\Ù\™O[ŽØœ™XZß_[]V×NÝ\[ÙˆOXÝš[™ØÜ‹œ\Ú
Û˜[YN˜Ý^˜[YNJNœ‹œ\Ú

NÛ]OUYŠ\Ë›ÛX\™Ú[˜š\ÚXš[]X
NÜÝÚ]Ú
\ËœXÙ[Y[
^ØØ\ÙXY˜Ø\ÙXšYÚ\Ëœ™\Ù\™OŒ	‰ŠKÚYV
\Ëœ™\Ù\™JJNØœ™XZÎØØ\ÙXÜ˜Ø\ÙX›ÝÛX\Ëœ™\Ù\™OŒ	‰ŠKšZYÚV
\Ëœ™\Ù\™JJNØœ™XZß\™]\›ˆYŠ\Ë[
K\ÖÞJ
K\Ëœ™\Ù\™O[‹KœÝXØÙ\ÜÊÛ˜[YN˜]˜]šX]\ÎžÜÝ[NšKÛ\ÜÎ–Ø˜PØ\[Û˜_KÚ[™[ŽœŸJ__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ù\YšXØ]X
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ù\YšXØ]\ØL
K\Ë˜Ü™Y[X[Ù\™\”ÛXÞOQÊK˜Ü™Y[X[Ù\™\”ÛXÞKØÜ[Û˜[™\]Z\™YJK\ËšYYKšY\Ë\›YK\›\Ë\›ÛXÞOYK\›ÛXÞ_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™[˜Üž\[Û[[\Ëš\ÜÝY\œÏ[[\ËšÙ^U\ØYÙO[[\Ë›ÚYÏ[[\ËœÚYÛš[™Ï[[\ËœÝXš™XÝœÏ[[_KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÚXÚÐ]Û˜L
K\ËšYYKšY\Ë›X\šÏQÊK›X\šËØY˜][ÚXÚØÚ\˜ÛXÜ›ÜÜØX[[Û™Ü]X\™XÝ\˜JK\ËœÚ\OQÊKœÚ\KØÜ]X\™X›Ý[™JK\ËœÚ^™ORÊKœÚ^™KL
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›Ü™\[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[VÕWJJ^Û]UYŠ\ËX\™Ú[˜
NÝÚY]šZYÚV
\ËœÚ^™JNÛ]‹‹KO]\ÖÖWJ
VÖWJ
KÏXKš][\Ë˜Ú[™[‹›[™Ý	‰˜Kš][\Ë˜Ú[™[–ÌVÕWJ
Kš[×KÏ^ÛÛŽŠÖÌOOO]›ÚYØÛ˜›ÖÌJKÔÝš[™Ê
KÙ™ŽŠÖÌWOOO]›ÚYØÙ™˜›ÖÌWJKÔÝš[™Ê
_KÏJK˜[YOË–Ú™J
_Ù™˜
OOO\Ë›ÛŸ›ÚYXVÖWJ
KOXVÑ™KÛ[œÝ[˜Ù[Ùˆ›OÊO[Ñ™KX˜Y[ØX˜T˜Y[Ø[ÔWOË–Ñ™_Ñ™JNŠXÚXÚØ›ÞX˜PÚXÚØ›ÞXVÔWOË–Ñ™_VÑ™JNÛ]^Û˜[YN˜[œ]]šX]\ÎžØÛ\ÜÎ–Ü—KÝ[NšY[YK]RY™\N›‹ÚXÚÙY˜Ë˜SÛŽœË›Û‹˜SÙ™ŽœË›Ù™‹˜\šXK[X™[Žš
JK˜\šXK\™\]Z\™YŽˆL__NÜ™]\›ˆI‰Š‹˜]šX]\Ë›˜[YOZJKœ
JI‰Š‹˜]šX]\ÖØ\šXK\™\]Z\™YOHL‹˜]šX]\Ëœ™\]Z\™YHL
KKœÝXØÙ\ÜÊÛ˜[YN˜X™[]šX]\ÎžØÛ\ÜÎ–Ø˜SX™[_KÚ[™[Ž–Ù—_J__KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÚÚXÙS\ÝL
K\Ë˜ÛÛ[Z]ÛQÊK˜ÛÛ[Z]Û‹ØÙ[XÝ^]JK\ËšYYKšY\Ë›Ü[QÊK›Ü[‹Ø\Ù\ÛÛ›Û[Ø^\Ø][TÙ[XÝÛ‘[žXJK\Ë^[žOUÊÙ]N™K^[žKY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›Ü™\[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[VÕWJJ^Û]UYŠ\Ë›Ü™\˜X\™Ú[˜
K]\ÖÖWJ
VÖWJ
K^Ù›ÛÚ^™N˜Ø[Ê	Û‹™›ÛËœÚ^™_L\
ˆ˜\ŠK]Ý[\ØØ[KY˜XÝÜŠJXKOV×NÚYŠ‹š][\Ë˜Ú[™[‹›[™ÝŒ
^Û]O[‹š][\ËLOLÙK˜Ú[™[‹›[™ÝOOL‰‰ŠYK˜Ú[™[–ÌKœØ]™KOLK]
NÛ]ÏYK˜Ú[™[–ÝVÕWJ
Kš[ÏYK˜Ú[™[–ØWVÕWJ
Kš[ÏHLK[‹˜[YOË–Ú™J
_Ù›ÜŠ]OL[Ë›[™ÝÙOÙJÊÊ^Û]^Û˜[YN˜Ü[Û˜]šX]\ÎžÝ˜[YNœÖÙW_ÖÙWKÝ[NœŸK˜[YN›ÖÙW_NÜÖÙWOOO[	‰Š˜]šX]\ËœÙ[XÝYXÏHL
KKœ\Ú

_XßKœÜXÙJÛ˜[YN˜Ü[Û˜]šX]\ÎžÚY[ŽˆLÙ[XÝYˆLK˜[YN˜J_[]O^ØÛ\ÜÎ–Ø˜TÙ[XÝKšY[Y›–Ñ™K]RY›–ÔWOË–Ñ™_–Ñ™KÝ[N˜\šXK[X™[Žš
ŠK˜\šXK\™\]Z\™YŽˆL_NÜ™]\›ˆœ
ŠI‰ŠVØ\šXK\™\]Z\™YOHLKœ™\]Z\™YHL
K\Ë›Ü[OOX][TÙ[XÝ	‰ŠK›][\OHL
KKœÝXØÙ\ÜÊÛ˜[YN˜X™[]šX]\ÎžØÛ\ÜÎ–Ø˜SX™[_KÚ[™[Ž–ÞÛ˜[YN˜Ù[XÝÚ[™[ŽšK]šX]\Î˜_W_J__KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÛÜ˜L
K\Ë˜ÔÜXÙOQÊK˜ÔÜXÙKØÔ‘Ð˜JK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜[YOYK˜[YOÑÙ
K˜[YJN˜\Ë™^˜\Ï[[VÙYJ
^Ü™]\›ˆL_VÔJ
^Ü™]\›ˆ\Ë˜[YOÛYK›XZÙR^ÛÛÜŠ\Ë˜[YKœ‹\Ë˜[YK™Ë\Ë˜[YK˜ŠN›[_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÛX˜
K\ËšYYKšY\Ë›[X™\“ÙÙ[ÏUÊÙ]N™K›[X™\“ÙÙ[ËY˜][˜[YNŒ˜[Y]N™OO™OLJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K\XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÛ›™XÝL
K\Ë˜ÛÛ›™XÝ[ÛYK˜ÛÛ›™XÝ[ÛŸ\ËšYYKšY\Ëœ™YYKœ™YŸ\Ë\ØYÙOQÊK\ØYÙKØ^Ü[™[\Ü^ÜÛ›X[\ÜÛ›XJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËœXÝ\™O[[_KÜXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÛ[\™XXL
K\ËšRÊKš
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÏRÊKÊK\ËžRÊKž
K\ËžORÊKžK
K\Ë™\ØÏ[[\Ë™^˜\Ï[[VÕWJJ^Û]^ÛY–
\Ëž
KÜ–
\ËžJKÚY–
\ËÊKZYÚ–
\Ëš
_KVØ˜PÛÛ[\™XXNÜ™]\›ˆYŠ\ÊI‰›‹œ\Ú
˜Tš[Û›X
KKœÝXØÙ\ÜÊÛ˜[YN˜]˜Ú[™[Ž–×K]šX]\ÎžÜÝ[NÛ\ÜÎ›‹Y\ÖÑ™__J__KÜXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÜ›™\˜L
K\ËšYYKšY\Ëš[™\YUÊÙ]N™Kš[™\YY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ëš›Ú[QÊKš›Ú[‹ØÜ]X\™X›Ý[™JK\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ˜Y]\ÏRÊKœ˜Y]\ÊK\ËœÝ›ÚÙOQÊKœÝ›ÚÙKØÛÛY\ÚÝ\ÚÝÝ\ÚYÝY[X›ÜÜÙY]ÚYÝÙ\™Y˜Z\ÙYJK\ËXÚÛ™\ÜÏRÊKXÚÛ™\ÜË\
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÛÜ[[\Ë™^˜\Ï[[VÔJ
^Û]OUYŠ\Ëš\ÚXš[]X
NÜ™]\›ˆKœ˜Y]\ÏV
\Ëš›Ú[OOXÜ]X\™XÌ\Ëœ˜Y]\ÊK__KÜXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]X
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Û]O]\ÖÕ—Kš[J
NÝ\ÖÕ—OYOÛ™]È]JJN›[VÕWJJ^Ü™]\›ˆÜ
\ÖÕ—OÝ\ÖÕ—KÔÝš[™Ê
N˜
__K\XÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]U[YX
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Û]O]\ÖÕ—Kš[J
NÝ\ÖÕ—OYOÛ™]È]JJN›[VÕWJJ^Ü™]\›ˆÜ
\ÖÕ—OÝ\ÖÕ—KÔÝš[™Ê
N˜
__KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]U[YQY]L
K\ËšØÜ›ÛÛXÞOQÊKšØÜ›ÛÛXÞKØ]]ØÙ™˜Û˜JK\ËšYYKšY\ËœXÚÙ\QÊKœXÚÙ\‹ØÜÝ›Û™XJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›Ü™\[[\Ë˜ÛÛX[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[VÕWJJ^Û]UYŠ\Ë›Ü™\˜›ÛX\™Ú[˜
K]\ÖÖWJ
VÖWJ
K^Û˜[YN˜[œ]]šX]\ÎžÝ\N˜^šY[Y›–Ñ™K]RY›–ÔWOË–Ñ™_–Ñ™KÛ\ÜÎ–Ø˜U^šY[KÝ[N˜\šXK[X™[Žš
ŠK˜\šXK\™\]Z\™YŽˆL__NÜ™]\›ˆœ
ŠI‰Š‹˜]šX]\ÖØ\šXK\™\]Z\™YOHL‹˜]šX]\Ëœ™\]Z\™YHL
KKœÝXØÙ\ÜÊÛ˜[YN˜X™[]šX]\ÎžØÛ\ÜÎ–Ø˜SX™[_KÚ[™[Ž–Ü—_J__K\XÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹XÚ[X[
K\Ë™œ˜XÑYÚ]ÏUÊÙ]N™K™œ˜XÑYÚ]ËY˜][˜[YNŒ‹˜[Y]N™OOˆLJK\ËšYYKšY\Ë›XYYÚ]ÏUÊÙ]N™K›XYYÚ]ËY˜][˜[YN‹LK˜[Y]N™OOˆLJK\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Û]O\\œÙQ›Ø]
\ÖÕ—Kš[J
JNÝ\ÖÕ—OZ\Ó˜SŠJOÛ[™_VÕWJJ^Ü™]\›ˆÜ
\ÖÕ—OOO[[Ø\ÖÕ—KÔÝš[™Ê
J__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Y˜][ZXL
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[_KœXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\ØØL
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›ÛÛX[[™]ÈK\Ë™]O[™]ÈK\Ë™]U[YO[™]ÈK\Ë™XÚ[X[[™]ÈK\Ë™^]O[™]ÈK\Ë™›Ø][™]ÈK\Ëš[XYÙO[™]ÈK\Ëš[YÙ\[™]ÈK\Ë^[™]ÈK\Ë[YO[™]È__K\XÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹YÙ\ÝY]ÙØÒLXÒLM˜ÒMLL˜’TSQMŒJK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K	XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹YÙ\ÝY]ÙØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™YÙ\ÝY]Ù[™]È__K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜]ØL
K\Ë˜[˜ÚÜ•\OQÊK˜[˜ÚÜ•\KØÜY›ÝÛPÙ[\˜›ÝÛSY›ÝÛTšYÚZYPÙ[\˜ZYSYZYTšYÚÜÙ[\˜ÜšYÚJK\Ë˜ÛÛÜ[UÊÙ]N™K˜ÛÛÜ[‹Y˜][˜[YNŒK˜[Y]N™OO™OL_OOOKL_JK\ËšYKšÒÊKš
N˜\Ëš[YÛQÊKš[YÛ‹ØYÙ[\˜\ÝYžX\ÝYžP[˜Y^šYÚJK\ËšYYKšY\Ë›ØØ[OYK›ØØ[_\Ë›X^RÊK›X^
K\Ë›X^ÏRÊK›X^Ë
K\Ë›Z[’RÊK›Z[’
K\Ë›Z[•ÏRÊK›Z[•Ë
K\Ë›˜[YOYK›˜[Y_\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ëœ›Ý]OUÊÙ]N™Kœ›Ý]KY˜][˜[YNŒ˜[Y]N™OO™INLOLJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÏYKÏÒÊKÊN˜\ËžRÊKž
K\ËžORÊKžK
K\Ë˜\ÜÚ\Ý[[\Ë˜›Ü™\[[\Ë˜Ø\[Û[[\Ë™\ØÏ[[\Ë™^˜\Ï[[\Ë™›Û[[\ËšÙY\[[\Ë›X\™Ú[[[\Ëœ\˜O[[\Ë˜]™\œØ[[[\ËZO[[\Ë˜[YO[[\ËœÙ]›Ü\O[™]È_VÚÙJJ^Ý\
\ËJ_VÕWJJ^ÚYŠ
\ÊK\Ëœ™\Ù[˜ÙOOOXY[˜\Ëœ™\Ù[˜ÙOOOX[˜XÝ]™X
\™]\›ˆK‘STNÕ™Š\ÊK\ÖÔÙJ
NÛ]]\ËË]\ËšÝÎœ‹šK\Ðœ›ÚÙ[Ž˜_O^™Š\ËJNÚYŠ‰‰\ËÏOOX
^ÚYŠI‰\ÖÖWJ
VÝYJ
J\™]\›ˆ\ÖÞJ
KK‘RST‘NÝ\ËÏ\ŸZYŠI‰\ËšOOX	‰Š\ËšZJKÜ
\ÊK\œ
\ËJJ\™]\›ˆ\ËÏ]\Ëš[‹\ÖÞJ
KK‘RST‘NÝœ
\ÊNÛ]ÏUYŠ\Ë›Û[YÛ˜[Y[œÚ[ÛœØÜÚ][Û˜™\Ù[˜ÙX›Ý]X[˜ÚÜ•\X›Ü™\˜X\™Ú[˜
NÓŠ\ËÊKË›X\™Ú[‰‰ŠËœY[™Ï[Ë›X\™Ú[‹[]HË›X\™Ú[ŠNÛ]ÏVØ˜Q˜]ØNÝ\Ë™›Û	‰œËœ\Ú
˜Q›Û
KYŠ\ÊI‰œËœ\Ú
˜Tš[Û›X
NÛ]Ï^ÜÝ[N›ËY\ÖÑ™KÛ\ÜÎœßNÝ\Ë›˜[YI‰ŠËž˜S˜[YO]\Ë›˜[YJNÛ]^Û˜[YN˜]˜]šX]\Î˜ËÚ[™[Ž–×_NÛ\
\ËÊNÛ]OP™Š\ËJK]\Ë˜[YOÝ\Ë˜[YVÕWJJKš[›[Ü™]\›ˆOO[[Ê\ËÏ]\Ëš[‹\ÖÞJ
KKœÝXØÙ\ÜÊÙŠ\Ë
KJJNŠ˜Ú[™[‹œ\Ú

KYŠ\ËË
K\ËÏ]\Ëš[‹\ÖÞJ
KKœÝXØÙ\ÜÊÙŠ\Ë
KJJ__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹YÙXL
K\Ë˜Ø\QÊK˜Ø\ØÜ]X\™X]›Ý[™JK\ËšYYKšY\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\ËœÝ›ÚÙOQÊKœÝ›ÚÙKØÛÛY\ÚÝ\ÚÝÝ\ÚYÝY[X›ÜÜÙY]ÚYÝÙ\™Y˜Z\ÙYJK\ËXÚÛ™\ÜÏRÊKXÚÛ™\ÜË\
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÛÜ[[\Ë™^˜\Ï[[VÔJ
^Û]OUYŠ\Ëš\ÚXš[]X
NÚYŠØš™XÝ˜\ÜÚYÛŠKÛ[™XØ\\Ë˜Ø\ÚY–
\ËXÚÛ™\ÜÊKÛÛÜŽ\Ë˜ÛÛÜÝ\Ë˜ÛÛÜ–ÔJ
N˜ÌÝ[N˜JK\Ëœ™\Ù[˜ÙHOOXš\ÚX›X
YKœÝ[OX›Û™XÙ[ÙHÝÚ]Ú
\ËœÝ›ÚÙJ^ØØ\ÙXÛÛY™KœÝ[OXÛÛYØœ™XZÎØØ\ÙX\ÚÝ™KœÝ[OX\ÚYØœ™XZÎØØ\ÙX\ÚÝÝ™KœÝ[OX\ÚYØœ™XZÎØØ\ÙX\ÚY™KœÝ[OX\ÚYØœ™XZÎØØ\ÙXÝY™KœÝ[OXÝYØœ™XZÎØØ\ÙX[X›ÜÜÙY™KœÝ[OXšYÙXØœ™XZÎØØ\ÙX]ÚY™KœÝ[OXÜ›ÛÝ™XØœ™XZÎØØ\ÙXÝÙ\™Y™KœÝ[OX[œÙ]Øœ™XZÎØØ\ÙX˜Z\ÙY™KœÝ[OXÝ]Ù]Øœ™XZß\™]\›ˆ__K›OXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[˜ÛÙ[™ØØY™KžLKœœØWÜÚLXY™KœØÜÍË™]XÚYY™KœØÜÍËœÚLXJK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[˜ÛÙ[™ÜØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™[˜ÛÙ[™Ï[™]È__K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[˜Üž\L
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜Ù\YšXØ]O[[_K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[˜Üž\]XL
K\ËšYYKšY\Ë›Ü\˜][ÛQÊK›Ü\˜][Û‹Ø[˜Üž\XÜž\JK\Ë\™Ù]YK\™Ù]\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™š[\[[\Ë›X[šY™\Ý[[_KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[˜Üž\[Û˜L
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜Ù\YšXØ]O[™]È__KÛOXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[˜Üž\[Û“Y]ÙØQTÌM‹PÐØ’TQTËPÐØQTÌLŽPÐØQTÌNL‹PÐØJK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[˜Üž\[Û“Y]ÙØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™[˜Üž\[Û“Y]Ù[™]È__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]™[L
K\Ë˜XÝ]š]OQÊK˜XÝ]š]KÛXÚË˜Ú[™ÙK™ØÐÛÜÙK™ØÔ™XYK™[\‹™^]™[š[™^Ú[™ÙKš[š]X[^™K›[Ý\ÙQÝÛ‹›[Ý\ÙQ[\‹›[Ý\ÙQ^]›[Ý\ÙU\œÜÝ^XÝ]KœÜÝÜ[‹œÜÝš[œÜÝØ]™KœÜÝÚYÛ‹œÜÝÝX›Z]œ™Q^XÝ]Kœ™SÜ[‹œ™Tš[œ™TØ]™Kœ™TÚYÛ‹œ™TÝX›Z]œ™XYK˜[Y][Û”Ý]XœÜ]
˜
JK\ËšYYKšY\Ë›\Ý[QÊK›\Ý[‹Ø™Y“Û›X™Y[™\ØÙ[™[ØJK\Ë›˜[YOYK›˜[Y_\Ëœ™YYKœ™YŸ\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ë™[˜Üž\]O[[\Ë™^XÝ]O[[\ËœØÜš\[[\ËœÚYÛ‘]O[[\ËœÝX›Z][[_K[OXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^]X
K\Ë˜ÛÛ[\OYK˜ÛÛ[\_\Ëš™YYKš™YŸ\ËšYYKšY\Ë›X^[™ÝUÊÙ]N™K›X^[™ÝY˜][˜[YN‹LK˜[Y]N™OO™OKL_JK\Ë›˜[YOYK›˜[Y_\ËœšYYKœšY\Ë˜[œÙ™\‘[˜ÛÙ[™ÏQÊK˜[œÙ™\‘[˜ÛÙ[™ËØ›Û™X˜\ÙMXÚØYÙXJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÚYJ
^Ü™]\›ˆ\Ë˜ÛÛ[\OOOX^Ú[V×ÙJJ^Ü™]\›ˆ\Ë˜ÛÛ[\OOOX^Ú[	‰™VÛYOOOSž[šY\Ë˜ÛÛ[\OOOX^Þ[Ê\ÖÕ—OYKL
NˆL_VÕWJJ^Ü™]\›ˆ\Ë˜ÛÛ[\HOOX^Ú[]\ÖÕ—OÜK‘STN\ÖÕ—VÕWJJ__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^Øš™XÝL
K\Ë˜\˜Ú]™OYK˜\˜Ú]™_\Ë˜Û\ÜÒYYK˜Û\ÜÒY\Ë˜ÛÙP˜\ÙOYK˜ÛÙP˜\Ù_\Ë˜ÛÙU\OYK˜ÛÙU\_\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ë˜›ÛÛX[[™]ÈK\Ë™]O[™]ÈK\Ë™]U[YO[™]ÈK\Ë™XÚ[X[[™]ÈK\Ë™^]O[™]ÈK\Ë™^Øš™XÝ[™]ÈK\Ë™›Ø][™]ÈK\Ëš[XYÙO[™]ÈK\Ëš[YÙ\[™]ÈK\Ë^[™]ÈK\Ë[YO[™]È__K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^ÛÜ›Ý\L
K\Ë˜XØÙ\ÜÏQÊK˜XØÙ\ÜËØÜ[˜›Û’[\˜XÝ]™X›ÝXÝY™XYÛ›XJK\Ë˜XØÙ\ÜÒÙ^OYK˜XØÙ\ÜÒÙ^_\Ë˜[˜ÚÜ•\OQÊK˜[˜ÚÜ•\KØÜY›ÝÛPÙ[\˜›ÝÛSY›ÝÛTšYÚZYPÙ[\˜ZYSYZYTšYÚÜÙ[\˜ÜšYÚJK\Ë˜ÛÛÜ[UÊÙ]N™K˜ÛÛÜ[‹Y˜][˜[YNŒK˜[Y]N™OO™OL_OOOKL_JK\ËšYKšÒÊKš
N˜\Ëš[YÛQÊKš[YÛ‹ØYÙ[\˜\ÝYžX\ÝYžP[˜Y^šYÚJK\ËšYYKšY\Ë›^[Ý]QÊK›^[Ý]ØÜÚ][Û˜‹]˜›\›ÝØ›]˜›ÝØX›X˜JK\Ë›X^RÊK›X^
K\Ë›X^ÏRÊK›X^Ë
K\Ë›Z[’RÊK›Z[’
K\Ë›Z[•ÏRÊK›Z[•Ë
K\Ë›˜[YOYK›˜[Y_\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÏYKÏÒÊKÊN˜\ËžRÊKž
K\ËžORÊKžK
K\Ë˜\ÜÚ\Ý[[\Ë˜š[™[[\Ë˜›Ü™\[[\Ë˜Ø[Ý[]O[[\Ë˜Ø\[Û[[\Ë™\ØÏ[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[\Ëœ\˜O[[\Ë˜]™\œØ[[[\Ë˜[Y]O[[\Ë˜ÛÛ›™XÝ[™]ÈK\Ë™]™[[™]ÈK\Ë™šY[[™]ÈK\ËœÙ]›Ü\O[™]È_VØYJ
^Ü™]\›ˆLVÙYJ
^Ü™]\›ˆLVÚÙJJ^Ù›ÜŠ]Ùˆ\Ë™šY[˜Ú[™[Š^ÚYŠ]˜[YJ^Û]O[™]ÈÚ
ßJNÝÑWJJK˜[YOY_]˜[YVÚÙJJ__VÝYJ
^Ü™]\›ˆ\Ë›^[Ý]™[™ÕÚ]
]˜
I‰\ÖÒK˜][\OOL	‰\ÖÒK›[X™\’[“[™OŒ\ÖÖWJ
VÝYJ
_VÛJ
^Û]O]\ÖÖWJ
NÜ™]\›ˆVÛJ
OÝ\ÖÒK—Ú\ÔÜ]X›OOO]›ÚYÝ\Ë›^[Ý]OOXÜÚ][Û˜\Ë›^[Ý]š[˜ÛY\Ê›ÝØ
OÊ\ÖÒK—Ú\ÔÜ]X›OHLKLJN™K›^[Ý]Ë™[™ÕÚ]
]˜
I‰™VÒK›[X™\’[“[™HOOLÈLNŠ\ÖÒK—Ú\ÔÜ]X›OHLL
N\ÖÒK—Ú\ÔÜ]X›NˆL_VÓWJ
^Ü™]\›ˆ	Š\Ê_VÑ]WJK
^Ù\
\ËK
_VÐWJ
^Ü™]\›ˆ
\Ê_VÕWJJ^ÚYŠ
\ÊK\Ëœ™\Ù[˜ÙOOOXY[˜\Ëœ™\Ù[˜ÙOOOX[˜XÝ]™X\ËšOOL\ËÏOOL
\™]\›ˆK‘STNÕ™Š\ÊNÛ]V×K^ÚY\ÖÑ™KÛ\ÜÎ–×_NÒÙŠ\Ë‹˜Û\ÜÊK\ÖÒ_SØš™XÝ˜Ü™X]J[
KØš™XÝ˜\ÜÚYÛŠ\ÖÒKØÚ[™[Ž]šX]\Î›‹][\Œ[™N›[[X™\’[“[™NŒ]˜Z[X›TÜXÙNžÝÚY“X]›Z[Š\ËßKÌKÚY
KZYÚ“X]›Z[Š\ËšKÌKšZYÚ
_KÚYŒZYÚŒ™]’ZYÚŒÝ\œ™[ÚYŒJNÛ]]\ÖÛJ
NÚYŠŸÜ
\ÊK\œ
\ËJJ\™]\›ˆK‘RST‘NÛ]O[™]ÈÙ]
ØšY[JNÚYŠ\Ë›^[Ý]š[˜ÛY\Ê›ÝØ
J^Û]O]\ÖÖWJ
K˜ÛÛ[[•ÚYÎÐ\œ˜^Kš\Ð\œ˜^JJI‰™K›[™ÝŒ	‰Š\ÖÒK˜ÛÛ[[•ÚYÏYK\ÖÒK˜Ý\œ™[ÛÛ[[L
_[]OUYŠ\Ë[˜ÚÜ•\X[Y[œÚ[ÛœØÜÚ][Û˜™\Ù[˜ÙX›Ü™\˜X\™Ú[˜[YÛ˜
KÏVØ˜Q^ÛÜ›Ý\KÏRŠ\ÊNÜÉ‰›Ëœ\Ú
ÊKYŠ\ÊI‰›Ëœ\Ú
˜Tš[Û›X
K‹œÝ[OXK‹˜Û\ÜÏ[Ë\Ë›˜[YI‰Š‹ž˜S˜[YO]\Ë›˜[YJK\ÖÔÙJ
NÛ]Ï]\Ë›^[Ý]OOX‹]˜\Ë›^[Ý]OOX›]˜XÏÌŽŒNÙ›ÜŠÝ\ÖÒK˜][\Ý\ÖÒK˜][\
ÊÊ^ØÉ‰\ÖÒK˜][\OOLI‰Š\ÖÒK›[X™\’[“[™OL
NÛ]O]\ÖÓÝWJÙš[\ŽšK[˜ÛYNˆLJNÚYŠKœÝXØÙ\ÜÊXœ™XZÎÚYŠKš\Ðœ™XZÊ
J\™]\›ˆ\ÖÞJ
KNÚYŠÉ‰\ÖÒK˜][\OOL	‰\ÖÒK›[X™\’[“[™OOOL	‰ˆ]\ÖÔ]WJ
VÒK››Ó^[Ý]˜Z[\™J^Ý\ÖÒK˜][\[Øœ™XZß_ZYŠ\ÖÞJ
KŸœ
\ÊK\ÖÒK˜][\OO[
\™]\›ˆŸ[]H\ÖÒKK‘RST‘NÛ]OLLÝ\Ë›X\™Ú[‰‰ŠO]\Ë›X\™Ú[‹›Y[œÙ]
Ý\Ë›X\™Ú[‹œšYÚ[œÙ]]\Ë›X\™Ú[‹Ü[œÙ]
Ý\Ë›X\™Ú[‹˜›ÝÛR[œÙ]
NÛ]SX]›X^
\ÖÒKÚY
ÝK\Ëß
KSX]›X^
\ÖÒKšZYÚ
Ù\Ëš
KOVÝ\Ëž\ËžK‹NÝ\ËÏOOX	‰ŠKÚYV
ŠJK\ËšOOX	‰ŠKšZYÚV

JNÛ]^Û˜[YN˜]˜]šX]\Î›‹Ú[™[ŽNÜ™]\›ˆ\
\ËŠK[]H\ÖÒKKœÝXØÙ\ÜÊÙŠ\Ë
KJ__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^XÝ]X
K\Ë˜ÛÛ›™XÝ[ÛYK˜ÛÛ›™XÝ[ÛŸ\Ë™^XÝ]U\OQÊK™^XÝ]U\KØ[\Ü™[Y\™ÙXJK\ËšYYKšY\Ëœ[]QÊKœ[]ØÛY[›ÝÙ\™\˜JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^˜\ØL
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›ÛÛX[[™]ÈK\Ë™]O[™]ÈK\Ë™]U[YO[™]ÈK\Ë™XÚ[X[[™]ÈK\Ë™^]O[™]ÈK\Ë™^˜\Ï[™]ÈK\Ë™›Ø][™]ÈK\Ëš[XYÙO[™]ÈK\Ëš[YÙ\[™]ÈK\Ë^[™]ÈK\Ë[YO[™]È__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹šY[L
K\Ë˜XØÙ\ÜÏQÊK˜XØÙ\ÜËØÜ[˜›Û’[\˜XÝ]™X›ÝXÝY™XYÛ›XJK\Ë˜XØÙ\ÜÒÙ^OYK˜XØÙ\ÜÒÙ^_\Ë˜[˜ÚÜ•\OQÊK˜[˜ÚÜ•\KØÜY›ÝÛPÙ[\˜›ÝÛSY›ÝÛTšYÚZYPÙ[\˜ZYSYZYTšYÚÜÙ[\˜ÜšYÚJK\Ë˜ÛÛÜ[UÊÙ]N™K˜ÛÛÜ[‹Y˜][˜[YNŒK˜[Y]N™OO™OL_OOOKL_JK\ËšYKšÒÊKš
N˜\Ëš[YÛQÊKš[YÛ‹ØYÙ[\˜\ÝYžX\ÝYžP[˜Y^šYÚJK\ËšYYKšY\Ë›ØØ[OYK›ØØ[_\Ë›X^RÊK›X^
K\Ë›X^ÏRÊK›X^Ë
K\Ë›Z[’RÊK›Z[’
K\Ë›Z[•ÏRÊK›Z[•Ë
K\Ë›˜[YOYK›˜[Y_\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ëœ›Ý]OUÊÙ]N™Kœ›Ý]KY˜][˜[YNŒ˜[Y]N™OO™INLOLJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÏYKÏÒÊKÊN˜\ËžRÊKž
K\ËžORÊKžK
K\Ë˜\ÜÚ\Ý[[\Ë˜š[™[[\Ë˜›Ü™\[[\Ë˜Ø[Ý[]O[[\Ë˜Ø\[Û[[\Ë™\ØÏ[[\Ë™^˜\Ï[[\Ë™›Û[[\Ë™›Ü›X][[\Ëš][\Ï[™]ÈJŠK\ËšÙY\[[\Ë›X\™Ú[[[\Ëœ\˜O[[\Ë˜]™\œØ[[[\ËZO[[\Ë˜[Y]O[[\Ë˜[YO[[\Ë˜š[™][\Ï[™]ÈK\Ë˜ÛÛ›™XÝ[™]ÈK\Ë™]™[[™]ÈK\ËœÙ]›Ü\O[™]È_VØYJ
^Ü™]\›ˆLVÚÙJJ^Ý\
\ËJ_VÕWJJ^ÚYŠ
\ÊK]\ËZJ^Ý\ËZO[™]ÈÚ
ßJK\ËZVÉWO]\ÖÉWK\ÖÑWJ\ËZJNÛ]NÜÝÚ]Ú
\Ëš][\Ë˜Ú[™[‹›[™Ý
^ØØ\ÙH™O[™]ÈÚ
ßJK\ËZK^Y]YNØœ™XZÎØØ\ÙHN™O[™]Èœ
ßJK\ËZK˜ÚXÚÐ]ÛYNØœ™XZÎØØ\ÙHŽ™O[™]Èœ
ßJK\ËZK˜ÚÚXÙS\ÝYNØœ™XZß]\ËZVÑWJJ_ZYŠ]\ËZ_\Ëœ™\Ù[˜ÙOOOXY[˜\Ëœ™\Ù[˜ÙOOOX[˜XÝ]™X\ËšOOL\ËÏOOL
\™]\›ˆK‘STNÝ\Ë˜Ø\[Û‰‰™[]H\Ë˜Ø\[Û–ÒK\ÖÔÙJ
NÛ]]\Ë˜Ø\[ÛÝ\Ë˜Ø\[Û–ÕWJJKš[›[]\ËË]\ËšOLOLÝ\Ë›X\™Ú[‰‰ŠO]\Ë›X\™Ú[‹›Y[œÙ]
Ý\Ë›X\™Ú[‹œšYÚ[œÙ]O]\Ë›X\™Ú[‹Ü[œÙ]
Ý\Ë›X\™Ú[‹˜›ÝÛR[œÙ]
NÛ]Ï[[ÚYŠ\ËÏOOX\ËšOOX
^Û][[[[LÏLÚYŠ\ËZK˜ÚXÚÐ]ÛŠ\\Ï]\ËZK˜ÚXÚÐ]Û‹œÚ^™NÙ[Ù^Û]ÝÎ›ŸO^™Š\ËJNÝOO[[ÜÏVY
\Ë™›ÛL
K›[™S›ÑØ\Š]Ï[Š_ZYŠÏXÜ
\ËZVÑÝWJ
JKŠÏ[ËËÊÏ[Ëš\Ë˜Ø\[ÛŠ^Û]ÝÎšK˜K\Ðœ›ÚÙ[Ž›ßO]\Ë˜Ø\[Û–ÑÝWJJNÚYŠÉ‰\ÖÖWJ
VÝYJ
J\™]\›ˆ\ÖÞJ
KK‘RST‘NÜÝÚ]Ú
ZKXK\Ë˜Ø\[Û‹œXÙ[Y[
^ØØ\ÙXY˜Ø\ÙXšYÚ˜Ø\ÙX[›[™X
Ï\ŽØœ™XZÎØØ\ÙXÜ˜Ø\ÙX›ÝÛX›ŠÏ\ÎØœ™XZß_Y[ÙH\‹\ÎÝ	‰\ËÏOOX	‰Š
ÏZK\ËÏSX]›Z[Š\Ë›X^ÏLÌKÌ\Ë›X^Ë\Ë›Z[•ÊÌOÝ\Ë›Z[•ÊJK‰‰\ËšOOX	‰ŠŠÏXK\ËšSX]›Z[Š\Ë›X^LÌKÌ\Ë›X^\Ë›Z[’
ÌOÛŽ\Ë›Z[’
J_ZYŠ\ÖÞJ
K™Š\ÊKÜ
\ÊK\œ
\ËJJ\™]\›ˆ\ËÏ[‹\Ëš\‹\ÖÞJ
KK‘RST‘NÝœ
\ÊNÛ]ÏUYŠ\Ë›Û[Y[œÚ[ÛœØÜÚ][Û˜›Ý]X[˜ÚÜ•\X™\Ù[˜ÙXX\™Ú[˜[YÛ˜
NÓŠ\ËÊNÛ]ÏVØ˜QšY[NÝ\Ë™›Û	‰˜Ëœ\Ú
˜Q›Û
KYŠ\ÊI‰˜Ëœ\Ú
˜Tš[Û›X
NÛ]^ÜÝ[NœËY\ÖÑ™KÛ\ÜÎ˜ßNÜË›X\™Ú[‰‰ŠËœY[™Ï\Ë›X\™Ú[‹[]HË›X\™Ú[ŠKÙŠ\ËÊK\Ë›˜[YI‰Šž˜S˜[YO]\Ë›˜[YJNÛ]OV×K^Û˜[YN˜]˜]šX]\Î›Ú[™[Ž_NÛ\
\Ë
NÛ]]\Ë˜›Ü™\Ý\Ë˜›Ü™\–ÔJ
N›[P™Š\ËJKO]\ËZVÕWJ
Kš[ÚYŠ[J\™]\›ˆØš™XÝ˜\ÜÚYÛŠËŠKKœÝXØÙ\ÜÊÙŠ\Ë
K
NÝ\ÖÐYI‰ŠK˜Ú[™[Ë–ÌOÛK˜Ú[™[–ÌK˜]šX]\ËXš[™^]\ÖÐYN›K˜]šX]\ËXš[™^]\ÖÐYJKK˜]šX]\ËœÝ[_SØš™XÝ˜Ü™X]J[
NÛ][[ÚYŠ\ËZK˜]ÛÊK˜Ú[™[‹›[™ÝOOLI‰ŠÚO[K˜Ú[™[‹œÜXÙJJJKØš™XÝ˜\ÜÚYÛŠK˜]šX]\ËœÝ[KŠJN“Øš™XÝ˜\ÜÚYÛŠËŠKKœ\Ú
JK\Ë˜[YJ^ÚYŠ\ËZKš[XYÙQY]
[K˜Ú[™[‹œ\Ú
\Ë˜[YVÕWJ
Kš[
NÙ[ÙHYŠ]\ËZK˜]ÛŠ^Û]OXÚYŠ\Ë˜[YK™^]JYO]\Ë˜[YK™^]VÚ™J
NÙ[ÙHYŠ\Ë˜[YK^
YO]\Ë˜[YK^ÑÝWJ
NÙ[Ù^Û]]\Ë˜[YVÕWJ
Kš[ÝOO[[	‰ŠO]˜Ú[™[–ÌK˜[YJ_]\ËZK^Y]	‰\Ë˜[YK^Ë›X^Ú\œÉ‰ŠK˜Ú[™[–ÌK˜]šX]\Ë›X^[™Ý]\Ë˜[YK^›X^Ú\œÊKI‰Š\ËZK›[Y\šXÑY]	‰ŠO\\œÙQ›Ø]
JKOZ\Ó˜SŠJOØ™KÔÝš[™Ê
JKK˜Ú[™[–ÌK›˜[YOOOX^\™XXÛK˜Ú[™[–ÌK˜]šX]\Ë^ÛÛ[YN›K˜Ú[™[–ÌK˜]šX]\Ë˜[YOYJ__ZYŠ]\ËZKš[XYÙQY]	‰›K˜Ú[™[Ë–ÌI‰\Ëš
^ÛßXÜ
\ËZVÑÝWJ
JNÛ]LÚYŠ\Ë˜Ø\[Û‰‰–ØÜ›ÝÛXKš[˜ÛY\Ê\Ë˜Ø\[Û‹œXÙ[Y[
J^Ý]\Ë˜Ø\[Û‹œ™\Ù\™KL	‰Š]\Ë˜Ø\[Û–ÑÝWJJKš
NÛ]]\Ëš]XK[ËšÛK˜Ú[™[–ÌK˜]šX]\ËœÝ[KšZYÚV
Š_Y[ÙHK˜Ú[™[–ÌK˜]šX]\ËœÝ[KšZYÚXL	XZYŠ	‰›K˜Ú[™[‹œ\Ú

K]
\™]\›ˆK˜]šX]\Ë˜Û\ÜÉ‰›K˜]šX]\Ë˜Û\ÜËœ\Ú
˜SY
K\ËÏ[‹\Ëš\‹KœÝXØÙ\ÜÊÙŠ\Ë
K
NÚYŠ\ËZK˜]ÛŠ\™]\›ˆËœY[™É‰™[]HËœY[™Ë›˜[YOOOX]˜	‰Š›˜[YOXÜ[˜
KK˜Ú[™[‹œ\Ú

KKœÝXØÙ\ÜÊ
NÜÝÚ]Ú
\ËZK˜ÚXÚÐ]Û‰‰Š˜]šX]\Ë˜Û\ÜÖÌOX˜PØ\[Û‘›ÜÚXÚÐ]Û˜
KK˜]šX]\Ë˜Û\ÜßV×KK˜Ú[™[‹œÜXÙJ
K\Ë˜Ø\[Û‹œXÙ[Y[
^ØØ\ÙXY›K˜]šX]\Ë˜Û\ÜËœ\Ú
˜SY
NØœ™XZÎØØ\ÙXšYÚ›K˜]šX]\Ë˜Û\ÜËœ\Ú
˜TšYÚ
NØœ™XZÎØØ\ÙXÜ›K˜]šX]\Ë˜Û\ÜËœ\Ú
˜UÜ
NØœ™XZÎØØ\ÙX›ÝÛX›K˜]šX]\Ë˜Û\ÜËœ\Ú
˜P›ÝÛX
NØœ™XZÎØØ\ÙX[›[™X›K˜]šX]\Ë˜Û\ÜËœ\Ú
˜SY
NØœ™XZß\™]\›ˆ\ËÏ[‹\Ëš\‹KœÝXØÙ\ÜÊÙŠ\Ë
K
__KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹š[L
K\ËšYYKšY\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÛÜ[[\Ë™^˜\Ï[[\Ë›[™X\[[\Ëœ]\›[[\Ëœ˜YX[[[\ËœÛÛY[[\ËœÝ\O[[VÔJ
^Û]O]\ÖÖWJ
KYVÖWJ
VÖWJ
KSØš™XÝ˜Ü™X]J[
KXÛÛÜ˜O\ŽÙH[œÝ[˜Ù[Ùˆ\	‰ŠX˜XÚÙÜ›Ý[™XÛÛÜ˜OX˜XÚÙÜ›Ý[™[œÝ[˜Ù[ÙˆÚ	‰Š‹˜˜XÚÙÜ›Ý[™ÛÛÜXÚ]X
JK
H[œÝ[˜Ù[Ùˆ	_H[œÝ[˜Ù[ÙˆÜ
I‰ŠZOXš[‹™š[XÚ]X
NÙ›ÜŠ]HÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^ÚYŠOOOX^˜\ØOOOXÛÛÜ˜
XÛÛ[YNÛ]]\ÖÙWNÚYŠJ[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÛ]O]ÔJ\Ë˜ÛÛÜŠNÜ™]\›ˆI‰Š–ØKœÝ\ÕÚ]
Ø
OÜŽšWOXJKŸZYŠ\Ë˜ÛÛÜË˜[YJ^Û]O]\Ë˜ÛÛÜ–ÔJ
NÛ–ÙKœÝ\ÕÚ]
Ø
OÜŽšWOY_\™]\›ˆŸ_KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹š[\˜L
K\Ë˜Y™]›ØØ][Û’[™›ÏQÊK˜Y™]›ØØ][Û’[™›ËØ™\]Z\™YÜ[Û˜[›Û™XJK\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™\œÚ[ÛUÊÙ]N\Ë™\œÚ[Û‹Y˜][˜[YNK˜[Y]N™OO™OLI‰™OM_JK\Ë˜\X\˜[˜ÙQš[\[[\Ë˜Ù\YšXØ]\Ï[[\Ë™YÙ\ÝY]ÙÏ[[\Ë™[˜ÛÙ[™ÜÏ[[\Ë™[˜Üž\[Û“Y]ÙÏ[[\Ëš[™\[[\Ë›ØÚÑØÝ[Y[[[\Ë›Y[[\Ëœ™X\ÛÛœÏ[[\Ë[YTÝ[\[[_K›OXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›Ø]
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Û]O\\œÙQ›Ø]
\ÖÕ—Kš[J
JNÝ\ÖÕ—OZ\Ó˜SŠJOÛ[™_VÕWJJ^Ü™]\›ˆÜ
\ÖÕ—OOO[[Ø\ÖÕ—KÔÝš[™Ê
J__K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›ÛL
K\Ë˜˜\Ù[[™TÚYRÊK˜˜\Ù[[™TÚY
K\Ë™›ÛÜš^›Û[ØØ[OU™
Ù]N™K™›ÛÜš^›Û[ØØ[KY˜][˜[YNŒL˜[Y]N™OO™OLJK\Ë™›Û™\XØ[ØØ[OU™
Ù]N™K™›Û™\XØ[ØØ[KY˜][˜[YNŒL˜[Y]N™OO™OLJK\ËšYYKšY\ËšÙ\›š[™Ó[ÙOQÊKšÙ\›š[™Ó[ÙKØ›Û™XZ\˜JK\Ë›]\”ÜXÚ[™ÏRÊK›]\”ÜXÚ[™Ë
K\Ë›[™U›ÝYÚUÊÙ]N™K›[™U›ÝYÚY˜][˜[YNŒ˜[Y]N™OO™OOOL_OOOLŸJK\Ë›[™U›ÝYÚ\š[ÙQÊK›[™U›ÝYÚ\š[ÙØ[ÛÜ™JK\Ë›Ý™\›[™OUÊÙ]N™K›Ý™\›[™KY˜][˜[YNŒ˜[Y]N™OO™OOOL_OOOLŸJK\Ë›Ý™\›[™T\š[ÙQÊK›Ý™\›[™T\š[ÙØ[ÛÜ™JK\ËœÜÝ\™OQÊKœÜÝ\™KØ›Ü›X[][XØJK\ËœÚ^™ORÊKœÚ^™KL
K\Ë\Y˜XÙOYK\Y˜XÙ_ÛÝ\šY\˜\Ë[™\›[™OUÊÙ]N™K[™\›[™KY˜][˜[YNŒ˜[Y]N™OO™OOOL_OOOLŸJK\Ë[™\›[™T\š[ÙQÊK[™\›[™T\š[ÙØ[ÛÜ™JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÙZYÚQÊKÙZYÚØ›Ü›X[›ÛJK\Ë™^˜\Ï[[\Ë™š[[[VÚÝWJJ^ÜÝ\\–ÚÝWJJK\ÖÉWK\ÙY\Y˜XÙ\Ë˜Y
\Ë\Y˜XÙJ_VÔJ
^Û]OUYŠ\Ëš[
KYK˜ÛÛÜŽÜ™]\›ˆ	‰ŠOOXÌÙ[]HK˜ÛÛÜŽœÝ\ÕÚ]
Ø
_
K˜˜XÚÙÜ›Ý[™]K˜˜XÚÙÜ›Ý[™Û\X^K˜ÛÛÜX˜[œÜ\™[
JK\Ë˜˜\Ù[[™TÚY	‰ŠK™\XØ[[YÛV
\Ë˜˜\Ù[[™TÚY
JKK™›ÛÙ\›š[™Ï]\ËšÙ\›š[™Ó[ÙOOOX›Û™XØ›Û™X˜›Ü›X[K›]\”ÜXÚ[™ÏV
\Ë›]\”ÜXÚ[™ÊK\Ë›[™U›ÝYÚOOL	‰ŠK^XÛÜ˜][ÛX[™K]›ÝYÚ\Ë›[™U›ÝYÚOOL‰‰ŠK^XÛÜ˜][Û”Ý[OXÝX›X
JK\Ë›Ý™\›[™HOOL	‰ŠK^XÛÜ˜][ÛXÝ™\›[™X\Ë›Ý™\›[™OOOL‰‰ŠK^XÛÜ˜][Û”Ý[OXÝX›X
JKK™›ÛÝ[O]\ËœÜÝ\™KK™›ÛÚ^™OV
ŽNJ\ËœÚ^™JKŠ\Ë\Ë\ÖÉWK™›Ûš[™\‹JK\Ë[™\›[™HOOL	‰ŠK^XÛÜ˜][ÛX[™\›[™X\Ë[™\›[™OOOL‰‰ŠK^XÛÜ˜][Û”Ý[OXÝX›X
JKK™›ÛÙZYÚ]\ËÙZYÚ__K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›Ü›X]L
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\ËœXÝ\™O[[_KOXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[™\˜
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\[˜][Û˜
K\Ë™^ÛYP[Ø\ÏUÊÙ]N™K™^ÛYP[Ø\ËY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë™^ÛYR[š]X[Ø\UÊÙ]N™K™^ÛYR[š]X[Ø\Y˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ëš\[˜]OUÊÙ]N™Kš\[˜]KY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\ËšYYKšY\Ëœ\ÚÚ\˜XÝ\ÛÝ[UÊÙ]N™Kœ\ÚÚ\˜XÝ\ÛÝ[Y˜][˜[YNŒË˜[Y]N™OO™OLJK\Ëœ™[XZ[Ú\˜XÝ\ÛÝ[UÊÙ]N™Kœ™[XZ[Ú\˜XÝ\ÛÝ[Y˜][˜[YNŒË˜[Y]N™OO™OLJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÛÜ™Ú\˜XÝ\ÛÝ[UÊÙ]N™KÛÜ™Ú\˜XÝ\ÛÝ[Y˜][˜[YNË˜[Y]N™OO™OLJ__KÛOXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[XYÙX
K\Ë˜\ÜXÝQÊK˜\ÜXÝØš]XÝX[ZYÚ›Û™XÚYJK\Ë˜ÛÛ[\OYK˜ÛÛ[\_\Ëš™YYKš™YŸ\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë˜[œÙ™\‘[˜ÛÙ[™ÏQÊK˜[œÙ™\‘[˜ÛÙ[™ËØ˜\ÙM›Û™XXÚØYÙXJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÕWJ
^ÚYŠ\Ë˜ÛÛ[\I‰ˆ[Üš\Ê\Ë˜ÛÛ[\KÓÝÙ\Ø\ÙJ
JJ\™]\›ˆK‘STNÛ]O]\ÖÉWKš[XYÙ\ÏË™Ù]
\Ëš™YŠNÚYŠYI‰Š\Ëš™YŸ]\ÖÕ—J_
YI‰\Ë˜[œÙ™\‘[˜ÛÙ[™ÏOOX˜\ÙM	‰ŠOQJ\ÖÕ—JJKYJJ\™]\›ˆK‘STNÚYŠ]\Ë˜ÛÛ[\J^Ù›ÜŠ]Ý—[ÙˆÜ
ZYŠK›[™Ý›[™Ý	‰™]™\žJ
ŠOOOOYVÛ—JJ^Ý\Ë˜ÛÛ[\O[ŽØœ™XZßZYŠ]\Ë˜ÛÛ[\J\™]\›ˆK‘ST_[][™]È›ØŠÙWKÝ\N\Ë˜ÛÛ[\_JKŽÜÝÚ]Ú
\Ë˜\ÜXÝ
^ØØ\ÙXš]˜Ø\ÙXXÝX[˜œ™XZÎØØ\ÙXZYÚ›^ÚZYÚ˜L	XØš™XÝš]˜š[NØœ™XZÎØØ\ÙX›Û™X›^ÝÚY˜L	XZYÚ˜L	XØš™XÝš]˜š[NØœ™XZÎØØ\ÙXÚY›^ÝÚY˜L	XØš™XÝš]˜š[NØœ™XZß[]]\ÖÖWJ
NÜ™]\›ˆKœÝXØÙ\ÜÊÛ˜[YN˜[YØ]šX]\ÎžØÛ\ÜÎ–Ø˜R[XYÙXKÝ[N›‹Ü˜Î•T“˜Ü™X]SØš™XÝT“

K[œÚ
–ÖWJ
JN›[_J__KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[XYÙQY]L
K\Ë™]OQÊK™]KØ[šØ[X™YJK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›Ü™\[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[VÕWJJ^Ü™]\›ˆ\Ë™]OOOX[X™YÜKœÝXØÙ\ÜÊÛ˜[YN˜]˜Ú[™[Ž–×K]šX]\Îžß_JNœK‘ST__KOXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[YÙ\˜
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Û]O\\œÙR[
\ÖÕ—Kš[J
KL
NÝ\ÖÕ—OZ\Ó˜SŠJOÛ[™_VÕWJJ^Ü™]\›ˆÜ
\ÖÕ—OOO[[Ø\ÖÕ—KÔÝš[™Ê
J__K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\ÜÝY\œØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜Ù\YšXØ]O[™]È__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹][\ØL
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ™YYKœ™YŸ\ËœØ]™OUÊÙ]N™KœØ]™KY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›ÛÛX[[™]ÈK\Ë™]O[™]ÈK\Ë™]U[YO[™]ÈK\Ë™XÚ[X[[™]ÈK\Ë™^]O[™]ÈK\Ë™›Ø][™]ÈK\Ëš[XYÙO[™]ÈK\Ëš[YÙ\[™]ÈK\Ë^[™]ÈK\Ë[YO[™]È_VÕWJ
^Û]OV×NÙ›ÜŠ]Ùˆ\ÖÜ]WJ
JYKœ\Ú
Ú™J
JNÜ™]\›ˆKœÝXØÙ\ÜÊJ__KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÙY\L
K\ËšYYKšYÛ]VØ›Û™XÛÛ[\™XXYÙP\™XXNÝ\Ëš[XÝQÊKš[XÝ
K\Ë›™^QÊK›™^
K\Ëœ™]š[Ý\ÏQÊKœ™]š[Ý\Ë
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[_KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ù^U\ØYÙX
NÛ]VØY\Ø›ØNÝ\Ë˜Ü›ÚYÛQÊK˜Ü›ÚYÛ‹
K\Ë™]Q[˜Ú\\›Y[QÊK™]Q[˜Ú\\›Y[
K\Ë™XÚ\\“Û›OQÊK™XÚ\\“Û›K
K\Ë™YÚ][ÚYÛ˜]\™OQÊK™YÚ][ÚYÛ˜]\™K
K\Ë™[˜Ú\\“Û›OQÊK™[˜Ú\\“Û›K
K\ËšYYKšY\ËšÙ^PYÜ™Y[Y[QÊKšÙ^PYÜ™Y[Y[
K\ËšÙ^PÙ\ÚYÛQÊKšÙ^PÙ\ÚYÛ‹
K\ËšÙ^Q[˜Ú\\›Y[QÊKšÙ^Q[˜Ú\\›Y[
K\Ë››Û”™\YX][ÛQÊK››Û”™\YX][Û‹
K\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[™XL
K\Ëš[™QÊKš[™Ø]™[˜YšYÚJK\ËšYYKšY\ËœÛÜOQÊKœÛÜKØØJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™YÙO[[VÕWJ
^Û]O]\ÖÖWJ
VÖWJ
K]\Ë™YÙ_™]ÈJßJK]ÔJ
KSØš™XÝ˜Ü™X]J[
KO]œ™\Ù[˜ÙOOOXš\ÚX›XÝXÚÛ™\ÜÎŒÜ‹œÝ›ÚÙUÚYV
JK‹œÝ›ÚÙO[‹˜ÛÛÜŽÛ]KËËËXL	XOXL	XÙKÏZOÊØKËË×OVØL	XL	XL	XK\‹œÝ›ÚÙUÚY
N™KšZOÊØKËË×OVÌL	XL	XL	XKO\‹œÝ›ÚÙUÚY
N\ËœÛÜOOOXÖØKËË×OVÌL	XL	XN–ØKËË×OVÌL	XL	XNÛ]^Û˜[YN˜Ý™ØÚ[™[Ž–ÞÛ˜[YN˜[™X]šX]\ÎžÞ[œÎš\N˜KLN›ËŽœËLŽ˜ËÝ[NœŸ_WK]šX]\ÎžÞ[œÎš\ÚY›ZYÚKÝ[NžÛÝ™\™›ÝÎ˜š\ÚX›X__NÜ™]\›ˆ
JOÜKœÝXØÙ\ÜÊÛ˜[YN˜]˜]šX]\ÎžÜÝ[NžÙ\Ü^N˜[›[™XÚY˜L	XZYÚ˜L	X_KÚ[™[Ž–Ù_JNŠ˜]šX]\ËœÝ[KœÜÚ][ÛXXœÛÛ]XKœÝXØÙ\ÜÊ
J__K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[™X\˜L
K\ËšYYKšY\Ë\OQÊK\KØÔšYÚÐ›ÝÛXÓYÕÜJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÛÜ[[\Ë™^˜\Ï[[VÔJJ^ÙOYOÙVÔJ
N˜Ñ‘‘‘‘‘˜Û]]\Ë\Kœ™\XÙJÊÔ“JKË	X
KÓÝÙ\Ø\ÙJ
K]\Ë˜ÛÛÜÝ\Ë˜ÛÛÜ–ÔJ
N˜ÌÜ™]\›˜[™X\‹YÜ˜YY[
	ÝK	Ù_K	ÛŸJX_K[OXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ØÚÑØÝ[Y[
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Ý\ÖÕ—OQÊ\ÖÕ—KØ]]ØXJ__K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹X[šY™\ÝL
K\Ë˜XÝ[ÛQÊK˜XÝ[Û‹Ø[˜ÛYX[^ÛYXJK\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ëœ™Y[™]È__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹X\™Ú[˜L
K\Ë˜›ÝÛR[œÙ]RÊK˜›ÝÛR[œÙ]
K\ËšYYKšY\Ë›Y[œÙ]RÊK›Y[œÙ]
K\ËœšYÚ[œÙ]RÊKœšYÚ[œÙ]
K\ËÜ[œÙ]RÊKÜ[œÙ]
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[VÔJ
^Ü™]\›žÛX\™Ú[Ž–
\ËÜ[œÙ]
JØ
Ö
\ËœšYÚ[œÙ]
JØ
Ö
\Ë˜›ÝÛR[œÙ]
JØ
Ö
\Ë›Y[œÙ]
___K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Y
K\ËšYYKšY\Ëœ\›Z\ÜÚ[ÛœÏUÊÙ]N™Kœ\›Z\ÜÚ[ÛœËY˜][˜[YNŒ‹˜[Y]N™OO™OOOL_OOOLßJK\ËœÚYÛ˜]\™U\OQÊKœÚYÛ˜]\™U\KØš[\˜]]Ü˜JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹YY][X
K\ËšYYKšY\Ëš[XYÚ[™Ð›ÞRÙ
Kš[XYÚ[™Ð›Þ
K\Ë›Û™ÏRÊK›Û™ÊK\Ë›ÜšY[][ÛQÊK›ÜšY[][Û‹ØÜ˜Z][™ØØ\XJK\ËœÚÜRÊKœÚÜ
K\ËœÝØÚÏYKœÝØÚß\Ë˜^R[QÊK˜^R[‹Ø]]Ø[YØ]XYÙQœ›ÛJK\Ë˜^SÝ]QÊK˜^SÝ]Ø]]Ø[YØ]XJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Y\ÜØYÙXL
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë^[™]È__K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[Y\šXÑY]L
K\ËšØÜ›ÛÛXÞOQÊKšØÜ›ÛÛXÞKØ]]ØÙ™˜Û˜JK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›Ü™\[[\Ë˜ÛÛX[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[VÕWJJ^Û]UYŠ\Ë›Ü™\˜›ÛX\™Ú[˜
K]\ÖÖWJ
VÖWJ
K^Û˜[YN˜[œ]]šX]\ÎžÝ\N˜^šY[Y›–Ñ™K]RY›–ÔWOË–Ñ™_–Ñ™KÛ\ÜÎ–Ø˜U^šY[KÝ[N˜\šXK[X™[Žš
ŠK˜\šXK\™\]Z\™YŽˆL__NÜ™]\›ˆœ
ŠI‰Š‹˜]šX]\ÖØ\šXK\™\]Z\™YOHL‹˜]šX]\Ëœ™\]Z\™YHL
KKœÝXØÙ\ÜÊÛ˜[YN˜X™[]šX]\ÎžØÛ\ÜÎ–Ø˜SX™[_KÚ[™[Ž–Ü—_J__K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ØØÝ\˜L
K\ËšYYKšY\Ëš[š]X[YKš[š]X[OOXØ•ÊÙ]N™Kš[š]X[Y˜][˜[YN˜˜[Y]N™OOˆLJK\Ë›X^YK›X^OOXØ•ÊÙ]N™K›X^Y˜][˜[YNŒK˜[Y]N™OOˆLJK\Ë›Z[YK›Z[OOXØ•ÊÙ]N™K›Z[‹Y˜][˜[YNŒK˜[Y]N™OOˆLJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[VÚÝWJ
^Û]O]\ÖÖWJ
K]\Ë›Z[ŽÝ\Ë›Z[OOX	‰Š\Ë›Z[YH[œÝ[˜Ù[Ùˆ[_H[œÝ[˜Ù[ÙˆÛOÌŒJK\Ë›X^OOX	‰ŠOOXÝ\Ë›X^YH[œÝ[˜Ù[Ùˆ[_H[œÝ[˜Ù[ÙˆÛOËLNŒN\Ë›X^]\Ë›Z[ŠK\Ë›X^OOKLI‰\Ë›X^\Ë›Z[‰‰Š\Ë›X^]\Ë›Z[ŠK\Ëš[š]X[OOX	‰Š\Ëš[š]X[YH[œÝ[˜Ù[ÙˆZÌN\Ë›Z[Š__K›OXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÚY
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K›OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÚYØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë›ÚY[™]È__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ý™\™›ÝØ
K\ËšYYKšY\Ë›XY\YK›XY\Ÿ\Ë\™Ù]YK\™Ù]\Ë˜Z[\YK˜Z[\Ÿ\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÑÝWJ
^ÚYŠ]\ÖÒJ^Û]O]\ÖÖWJ
K]\ÖÔ]WJ
K]ÑYJ\Ë\™Ù]JK]ÑYJ\Ë›XY\‹JKO]ÑYJ\Ë˜Z[\‹JNÝ\ÖÒO^Ý\™Ù]›Ë–Ì_[XY\ŽœË–Ì_[˜Z[\ŽšOË–Ì_[YXY\ŽˆLKY˜Z[\ŽˆL__\™]\›ˆ\ÖÒ__K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹YÙP\™XXL
K\Ë˜›[šÓÜ“›Ý›[šÏQÊK˜›[šÓÜ“›Ý›[šËØ[žX›[šØ›Ý›[šØJK\ËšYYKšY\Ëš[š]X[[X™\UÊÙ]N™Kš[š]X[[X™\‹Y˜][˜[YNŒK˜[Y]N™OOˆLJK\Ë›˜[YOYK›˜[Y_\Ë›[X™\™YUÊÙ]N™K›[X™\™YY˜][˜[YNŒK˜[Y]N™OOˆLJK\Ë›ÙÜ‘]™[QÊK›ÙÜ‘]™[‹Ø[žX]™[˜ÙJK\ËœYÙTÜÚ][ÛQÊKœYÙTÜÚ][Û‹Ø[žXš\œÝ\ÝÛ›X™\ÝJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™\ØÏ[[\Ë™^˜\Ï[[\Ë›YY][O[[\Ë›ØØÝ\[[\Ë˜\™XO[™]ÈK\Ë˜ÛÛ[\™XO[™]ÈK\Ë™˜]Ï[™]ÈK\Ë™^ÛÜ›Ý\[™]ÈK\Ë™šY[[™]ÈK\ËœÝX™›Ü›O[™]È_VÙ™J
^Ü™]\›ˆ\ÖÒOÈ]\Ë›ØØÝ\Ÿ\Ë›ØØÝ\‹›X^OOKL_\ÖÒK›[X™\“Ù•\ÙO\Ë›ØØÝ\‹›X^Š\ÖÒO^Û[X™\“Ù•\ÙNŒKL
_VÐ]WJ
^Ù[]H\ÖÒ_VÖ]WJ
^Ý\ÖÒ_^Û[X™\“Ù•\ÙNŒNÛ]O]\ÖÖWJ
NÜ™]\›ˆKœ™[][ÛOOXÜ™\™YØØÝ\œ™[˜ÙX	‰\ÖÙ™J
OÊ\ÖÒK›[X™\“Ù•\ÙJÏLK\ÊN™VÖ]WJ
_VÐWJ
^Ü™]\›ˆ\ÖÒKœÜXÙ_ÝÚYŒZYÚŒ_VÕWJ
^Ý\ÖÒ_^Û[X™\“Ù•\ÙNŒ_NÛ]OV×NÝ\ÖÒK˜Ú[™[YNÛ]SØš™XÝ˜Ü™X]J[
NÚYŠ\Ë›YY][I‰\Ë›YY][KœÚÜ	‰\Ë›YY][K›Û™Ê^ÚYŠÚYV
\Ë›YY][KœÚÜ
KšZYÚV
\Ë›YY][K›Û™ÊK\ÖÒKœÜXÙO^ÝÚY\Ë›YY][KœÚÜZYÚ\Ë›YY][K›Û™ßK\Ë›YY][K›ÜšY[][ÛOOX[™ØØ\X
^Û]O]ÚYÝÚY]šZYÚšZYÚYK\ÖÒKœÜXÙO^ÝÚY\Ë›YY][K›Û™ËZYÚ\Ë›YY][KœÚÜ__Y[ÙHJHH›ÈYY][HÜXÚYšYY[ˆYÙP\™XNˆX\ÙHš[HHYË˜
NÜ™]\›ˆ\ÖÓÝWJÙš[\Ž›™]ÈÙ]
Ø\™XX˜]ØšY[ÝX™›Ü›XJK[˜ÛYNˆLJK\ÖÓÝWJÙš[\Ž›™]ÈÙ]
ØÛÛ[\™XXJK[˜ÛYNˆLJKKœÝXØÙ\ÜÊÛ˜[YN˜]˜Ú[™[Ž™K]šX]\ÎžØÛ\ÜÎ–Ø˜TYÙXKY\ÖÑ™KÝ[N˜S˜[YN\Ë›˜[Y__J__KÛOXÛ\ÜÈH^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹YÙTÙ]L
K\Ë™\^[\ÜÚ][ÛQÊK™\^[\ÜÚ][Û‹ØÛ™ÑYÙXÚÜYÙXJK\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ëœ™[][ÛQÊKœ™[][Û‹ØÜ™\™YØØÝ\œ™[˜ÙX\^YÚ[˜]YÚ[\^YÚ[˜]YJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ë›ØØÝ\[[\ËœYÙP\™XO[™]ÈK\ËœYÙTÙ][™]È_VÐ]WJ
^Ù›ÜŠ]HÙˆ\ËœYÙP\™XK˜Ú[™[ŠYVÐ]WJ
NÙ›ÜŠ]HÙˆ\ËœYÙTÙ]˜Ú[™[ŠYVÐ]WJ
_VÙ™J
^Ü™]\›ˆ]\Ë›ØØÝ\Ÿ\Ë›ØØÝ\‹›X^OOKL_\ÖÒK›[X™\“Ù•\ÙO\Ë›ØØÝ\‹›X^VÖ]WJ
^ÚYŠ\ÖÒ_^Û[X™\“Ù•\ÙNŒKYÙR[™^‹LKYÙTÙ][™^‹L_K\Ëœ™[][ÛOOXÜ™\™YØØÝ\œ™[˜ÙX
^ÚYŠ\ÖÒKœYÙR[™^
ÌO\ËœYÙP\™XK˜Ú[™[‹›[™Ý
\™]\›ˆ\ÖÒKœYÙR[™^
ÏLK\ËœYÙP\™XK˜Ú[™[–Ý\ÖÒKœYÙR[™^VÖ]WJ
NÚYŠ\ÖÒKœYÙTÙ][™^
ÌO\ËœYÙTÙ]˜Ú[™[‹›[™Ý
\™]\›ˆ\ÖÒKœYÙTÙ][™^
ÏLK\ËœYÙTÙ]˜Ú[™[–Ý\ÖÒKœYÙTÙ][™^VÖ]WJ
NÚYŠ\ÖÙ™J
J\™]\›ˆ\ÖÒK›[X™\“Ù•\ÙJÏLK\ÖÒKœYÙR[™^KLK\ÖÒKœYÙTÙ][™^KLK\ÖÖ]WJ
NÛ]]\ÖÖWJ
NÜ™]\›ˆ[œÝ[˜Ù[ÙˆOÝÖ]WJ
NŠ\ÖÐ]WJ
K\ÖÖ]WJ
J_[]]\ÖÔ]WJ
VÒKœYÙS[X™\‹]	LOLØ]™[˜˜Ù]OOLØš\œÝ˜™\ÝO]\ËœYÙP\™XK˜Ú[™[‹™š[™
OO™K›ÙÜ‘]™[OO[‰‰™KœYÙTÜÚ][ÛOO\ŠNÜ™]\›ˆ_
O]\ËœYÙP\™XK˜Ú[™[‹™š[™
OO™K›ÙÜ‘]™[OOX[žX	‰™KœYÙTÜÚ][ÛOO\ŠKJ_
O]\ËœYÙP\™XK˜Ú[™[‹™š[™
OO™K›ÙÜ‘]™[OOX[žX	‰™KœYÙTÜÚ][ÛOOX[žX
KJOÚN\ËœYÙP\™XK˜Ú[™[–Ì__KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\˜XL
K\Ëš[YÛQÊKš[YÛ‹ØYÙ[\˜\ÝYžX\ÝYžP[˜Y^šYÚJK\ËšYYKšY\Ë›[™RZYÚYK›[™RZYÚÒÊK›[™RZYÚ
N˜\Ë›X\™Ú[“YYK›X\™Ú[“YÒÊK›X\™Ú[“Y
N˜\Ë›X\™Ú[”šYÚYK›X\™Ú[”šYÚÒÊK›X\™Ú[”šYÚ
N˜\Ë›Üœ[œÏUÊÙ]N™K›Üœ[œËY˜][˜[YNŒ˜[Y]N™OO™OLJK\Ëœ™\Ù\™OYKœ™\Ù\™_\Ëœ˜Y^Ù™œÙ]YKœ˜Y^Ù™œÙ]ÒÊKœ˜Y^Ù™œÙ]
N˜\ËœÜXÙPX›Ý™OYKœÜXÙPX›Ý™OÒÊKœÜXÙPX›Ý™K
N˜\ËœÜXÙP™[ÝÏYKœÜXÙP™[ÝÏÒÊKœÜXÙP™[ÝË
N˜\ËX‘Y˜][YKX‘Y˜][ÒÊ\ËX‘Y˜][
N˜\ËX”ÝÜÏJKX”ÝÜß
Kš[J
KœÜ]
×ÊËÊK›X\

K
OO	LOLOÒÊJN™JK\Ë^[™[YK^[™[ÒÊK^[™[
N˜\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë[YÛQÊK[YÛ‹ØÜ›ÝÛXZYXJK\ËÚYÝÜÏUÊÙ]N™KÚYÝÜËY˜][˜[YNŒ˜[Y]N™OO™OLJK\Ëš\[˜][Û[[VÔJ
^Û]OUYŠ\Ë[YÛ˜
NÜ™]\›ˆ\Ë›X\™Ú[“YOOX	‰ŠKœY[™ÓYV
\Ë›X\™Ú[“Y
JK\Ë›X\™Ú[”šYÚOOX	‰ŠKœY[™ÔšYÚV
\Ë›X\™Ú[”šYÚ
JK\ËœÜXÙPX›Ý™HOOX	‰ŠKœY[™ÕÜV
\ËœÜXÙPX›Ý™JJK\ËœÜXÙP™[ÝÈOOX	‰ŠKœY[™Ð›ÝÛOV
\ËœÜXÙP™[ÝÊJK\Ë^[™[OOX	‰ŠK^[™[V
\Ë^[™[
KÙŠJJK\Ë›[™RZYÚŒ	‰ŠK›[™RZYÚV
\Ë›[™RZYÚ
JK\ËX‘Y˜][OOX	‰ŠKX”Ú^™OV
\ËX‘Y˜][
JK\ËX”ÝÜË›[™Ý\Ëš\[˜]][Û‰‰“Øš™XÝ˜\ÜÚYÛŠK\Ëš\[˜]][Û–ÔJ
JK__KÛOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\ÜÝÛÜ™Y]L
K\ËšØÜ›ÛÛXÞOQÊKšØÜ›ÛÛXÞKØ]]ØÙ™˜Û˜JK\ËšYYKšY\Ëœ\ÜÝÛÜ™Ú\YKœ\ÜÝÛÜ™Ú\Ÿ
˜\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›Ü™\[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[_K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]\›˜L
K\ËšYYKšY\Ë\OQÊK\KØÜ›ÜÜÒ]ÚÜ›ÜÜÑXYÛÛ˜[XYÛÛ˜[YXYÛÛ˜[šYÚÜš^›Û[™\XØ[JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÛÜ[[\Ë™^˜\Ï[[VÔJJ^ÙOYOÙVÔJ
N˜Ñ‘‘‘‘‘˜Û]]\Ë˜ÛÛÜÝ\Ë˜ÛÛÜ–ÔJ
N˜ÌX™\X][™Ë[[™X\‹YÜ˜YY[X	Ù_K	Ù_H\	ÝH\	ÝHLÜÝÚ]Ú
\Ë\J^ØØ\ÙXÜ›ÜÜÒ]Úœ™]\›˜	ÛŸJÈÜ	ÜŸJH	ÛŸJÈšYÚ	ÜŸJXØØ\ÙXÜ›ÜÜÑXYÛÛ˜[œ™]\›˜	ÛŸJYYË	ÜŸJH	ÛŸJMYYË	ÜŸJXØØ\ÙXXYÛÛ˜[Yœ™]\›˜	ÛŸJYYË	ÜŸJXØØ\ÙXXYÛÛ˜[šYÚœ™]\›˜	ÛŸJMYYË	ÜŸJXØØ\ÙXÜš^›Û[œ™]\›˜	ÛŸJÈÜ	ÜŸJXØØ\ÙX™\XØ[œ™]\›˜	ÛŸJÈšYÚ	ÜŸJX\™]\›˜_K›OXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹XÝ\™X
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›ÝØL
K\Ë˜\X\˜[˜ÙQš[\[™]ÈK\Ë˜\˜Ï[™]ÈK\Ë˜\™XO[™]ÈK\Ë˜\ÜÚ\Ý[™]ÈK\Ë˜˜\˜ÛÙO[™]ÈK\Ë˜š[™][\Ï[™]ÈK\Ë˜›ÛÚÙ[™[™]ÈK\Ë˜›ÛÛX[[™]ÈK\Ë˜›Ü™\[™]ÈK\Ë˜œ™XZÏ[™]ÈK\Ë˜œ™XZÐY\[™]ÈK\Ë˜œ™XZÐ™Y›Ü™O[™]ÈK\Ë˜]Û[™]ÈK\Ë˜Ø[Ý[]O[™]ÈK\Ë˜Ø\[Û[™]ÈK\Ë˜Ù\YšXØ]O[™]ÈK\Ë˜Ù\YšXØ]\Ï[™]ÈK\Ë˜ÚXÚÐ]Û[™]ÈK\Ë˜ÚÚXÙS\Ý[™]ÈK\Ë˜ÛÛÜ[™]ÈK\Ë˜ÛÛX[™]ÈK\Ë˜ÛÛ›™XÝ[™]ÈK\Ë˜ÛÛ[\™XO[™]ÈK\Ë˜ÛÜ›™\[™]ÈK\Ë™]O[™]ÈK\Ë™]U[YO[™]ÈK\Ë™]U[YQY][™]ÈK\Ë™XÚ[X[[™]ÈK\Ë™Y˜][ZO[™]ÈK\Ë™\ØÏ[™]ÈK\Ë™YÙ\ÝY]Ù[™]ÈK\Ë™YÙ\ÝY]ÙÏ[™]ÈK\Ë™˜]Ï[™]ÈK\Ë™YÙO[™]ÈK\Ë™[˜ÛÙ[™Ï[™]ÈK\Ë™[˜ÛÙ[™ÜÏ[™]ÈK\Ë™[˜Üž\[™]ÈK\Ë™[˜Üž\]O[™]ÈK\Ë™[˜Üž\[Û[™]ÈK\Ë™[˜Üž\[Û“Y]Ù[™]ÈK\Ë™[˜Üž\[Û“Y]ÙÏ[™]ÈK\Ë™]™[[™]ÈK\Ë™^]O[™]ÈK\Ë™^Øš™XÝ[™]ÈK\Ë™^ÛÜ›Ý\[™]ÈK\Ë™^XÝ]O[™]ÈK\Ë™^˜\Ï[™]ÈK\Ë™šY[[™]ÈK\Ë™š[[™]ÈK\Ë™š[\[™]ÈK\Ë™›Ø][™]ÈK\Ë™›Û[™]ÈK\Ë™›Ü›X][™]ÈK\Ëš[™\[™]ÈK\Ëš\[˜][Û[™]ÈK\Ëš[XYÙO[™]ÈK\Ëš[XYÙQY][™]ÈK\Ëš[YÙ\[™]ÈK\Ëš\ÜÝY\œÏ[™]ÈK\Ëš][\Ï[™]ÈK\ËšÙY\[™]ÈK\ËšÙ^U\ØYÙO[™]ÈK\Ë›[™O[™]ÈK\Ë›[™X\[™]ÈK\Ë›ØÚÑØÝ[Y[[™]ÈK\Ë›X[šY™\Ý[™]ÈK\Ë›X\™Ú[[™]ÈK\Ë›Y[™]ÈK\Ë›YY][O[™]ÈK\Ë›Y\ÜØYÙO[™]ÈK\Ë›[Y\šXÑY][™]ÈK\Ë›ØØÝ\[™]ÈK\Ë›ÚY[™]ÈK\Ë›ÚYÏ[™]ÈK\Ë›Ý™\™›ÝÏ[™]ÈK\ËœYÙP\™XO[™]ÈK\ËœYÙTÙ][™]ÈK\Ëœ\˜O[™]ÈK\Ëœ\ÜÝÛÜ™Y][™]ÈK\Ëœ]\›[™]ÈK\ËœXÝ\™O[™]ÈK\Ëœ˜YX[[™]ÈK\Ëœ™X\ÛÛ[™]ÈK\Ëœ™X\ÛÛœÏ[™]ÈK\Ëœ™XÝ[™ÛO[™]ÈK\Ëœ™Y[™]ÈK\ËœØÜš\[™]ÈK\ËœÙ]›Ü\O[™]ÈK\ËœÚYÛ‘]O[™]ÈK\ËœÚYÛ˜]\™O[™]ÈK\ËœÚYÛš[™Ï[™]ÈK\ËœÛÛY[™]ÈK\ËœÜXZÏ[™]ÈK\ËœÝ\O[™]ÈK\ËœÝX™›Ü›O[™]ÈK\ËœÝX™›Ü›TÙ][™]ÈK\ËœÝXš™XÝ[™]ÈK\ËœÝXš™XÝœÏ[™]ÈK\ËœÝX›Z][™]ÈK\Ë^[™]ÈK\Ë^Y][™]ÈK\Ë[YO[™]ÈK\Ë[YTÝ[\[™]ÈK\ËÛÛ\[™]ÈK\Ë˜]™\œØ[[™]ÈK\Ë˜]™\œÙO[™]ÈK\ËZO[™]ÈK\Ë˜[Y]O[™]ÈK\Ë˜[YO[™]ÈK\Ë˜\šXX›\Ï[™]È__KOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜YX[L
K\ËšYYKšY\Ë\OQÊK\KØÑYÙXÐÙ[\˜JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÛÜ[[\Ë™^˜\Ï[[VÔJJ^ÙOYOÙVÔJ
N˜Ñ‘‘‘‘‘˜Û]]\Ë˜ÛÛÜÝ\Ë˜ÛÛÜ–ÔJ
N˜ÌÜ™]\›˜˜YX[YÜ˜YY[
Ú\˜ÛH]Ù[\‹	Ý\Ë\OOOXÑYÙXØ	Ù_K	ÝX˜	ÝK	Ù_XJX_K›OXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹™X\ÛÛ˜
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K[OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹™X\ÛÛœØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ëœ™X\ÛÛ[™]È__K	OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹™XÝ[™ÛXL
K\Ëš[™QÊKš[™Ø]™[˜YšYÚJK\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÜ›™\[™]ÈJ
K\Ë™YÙO[™]ÈJ
K\Ë™š[[[VÕWJ
^Û]O]\Ë™YÙK˜Ú[™[‹›[™ÝÝ\Ë™YÙK˜Ú[™[–ÌN›™]ÈJßJKYVÔJ
KSØš™XÝ˜Ü™X]J[
NÝ\Ë™š[Ëœ™\Ù[˜ÙOOOXš\ÚX›XÓØš™XÝ˜\ÜÚYÛŠ‹\Ë™š[ÔJ
JN›‹™š[X˜[œÜ\™[‹œÝ›ÚÙUÚYV
Kœ™\Ù[˜ÙOOOXš\ÚX›XÙKXÚÛ™\ÜÎŒ
K‹œÝ›ÚÙO]˜ÛÛÜŽÛ]J\Ë˜ÛÜ›™\‹˜Ú[™[‹›[™ÝÝ\Ë˜ÛÜ›™\‹˜Ú[™[–ÌN›™]ÈÜ
ßJJVÔJ
KO^Û˜[YN˜Ý™ØÚ[™[Ž–ÞÛ˜[YN˜™XÝ]šX]\ÎžÞ[œÎš\ÚY˜L	XZYÚ˜L	XŒNŒžœ‹œ˜Y]\ËžNœ‹œ˜Y]\ËÝ[N›Ÿ_WK]šX]\ÎžÞ[œÎš\Ý[NžÛÝ™\™›ÝÎ˜š\ÚX›XKÚY˜L	XZYÚ˜L	X_NÜ™]\›ˆ
\ÖÖWJ
VÖWJ
JOÜKœÝXØÙ\ÜÊÛ˜[YN˜]˜]šX]\ÎžÜÝ[NžÙ\Ü^N˜[›[™XÚY˜L	XZYÚ˜L	X_KÚ[™[Ž–ÚW_JNŠK˜]šX]\ËœÝ[KœÜÚ][ÛXXœÛÛ]XKœÝXØÙ\ÜÊJJ__KZXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹™Y˜
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ØÜš\
K\Ë˜š[™[™ÏYK˜š[™[™ß\Ë˜ÛÛ[\OYK˜ÛÛ[\_\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ëœ[]QÊKœ[]ØÛY[›ÝÙ\™\˜JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ù]›Ü\X
K\Ë˜ÛÛ›™XÝ[ÛYK˜ÛÛ›™XÝ[ÛŸ\Ëœ™YYKœ™YŸ\Ë\™Ù]YK\™Ù]_KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÚYÛ‘]XL
K\ËšYYKšY\Ë›Ü\˜][ÛQÊK›Ü\˜][Û‹ØÚYÛ˜ÛX\˜™\šYžXJK\Ëœ™YYKœ™YŸ\Ë\™Ù]YK\™Ù]\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™š[\[[\Ë›X[šY™\Ý[[_KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÚYÛ˜]\™XL
K\ËšYYKšY\Ë\OQÊK\KØŒKŒØŒK˜JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›Ü™\[[\Ë™^˜\Ï[[\Ë™š[\[[\Ë›X[šY™\Ý[[\Ë›X\™Ú[[[_KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÚYÛš[™ØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜Ù\YšXØ]O[™]È__KÚXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÛYL
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[VÔJJ^Ü™]\›ˆOÙVÔJ
N˜Ñ‘‘‘‘‘˜_KÚXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÜXZØ
K\Ë™\ØX›OUÊÙ]N™K™\ØX›KY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\ËšYYKšY\Ëœš[Üš]OQÊKœš[Üš]KØÝ\ÝÛXØ\[Û˜˜[YXÛÛ\JK\ËœšYYKœšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KÚXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ý\XL
K\ËšYYKšY\Ëœ˜]OUÊÙ]N™Kœ˜]KY˜][˜[YNL˜[Y]N™OO™OL	‰™OLLJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜ÛÛÜ[[\Ë™^˜\Ï[[VÔJJ^Û]]\Ëœ˜]KÌLÜ™]\›ˆYK›XZÙR^ÛÛÜŠX]œ›Ý[™
K˜[YKœŠŠK]
JÝ\Ë˜[YKœŠ
KX]œ›Ý[™
K˜[YK™ÊŠK]
JÝ\Ë˜[YK™Ê
KX]œ›Ý[™
K˜[YK˜ŠŠK]
JÝ\Ë˜[YK˜Š
J__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÝX™›Ü›XL
K\Ë˜XØÙ\ÜÏQÊK˜XØÙ\ÜËØÜ[˜›Û’[\˜XÝ]™X›ÝXÝY™XYÛ›XJK\Ë˜[ÝÓXXÜ›ÏUÊÙ]N™K˜[ÝÓXXÜ›ËY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë˜[˜ÚÜ•\OQÊK˜[˜ÚÜ•\KØÜY›ÝÛPÙ[\˜›ÝÛSY›ÝÛTšYÚZYPÙ[\˜ZYSYZYTšYÚÜÙ[\˜ÜšYÚJK\Ë˜ÛÛÜ[UÊÙ]N™K˜ÛÛÜ[‹Y˜][˜[YNŒK˜[Y]N™OO™OL_OOOKL_JK\Ë˜ÛÛ[[•ÚYÏJK˜ÛÛ[[•ÚYß
Kš[J
KœÜ]
×ÊËÊK›X\
OO™OOOXLXËLN’ÊJJK\ËšYKšÒÊKš
N˜\Ëš[YÛQÊKš[YÛ‹ØYÙ[\˜\ÝYžX\ÝYžP[˜Y^šYÚJK\ËšYYKšY\Ë›^[Ý]QÊK›^[Ý]ØÜÚ][Û˜‹]˜›\›ÝØ›]˜›ÝØX›X˜JK\Ë›ØØ[OYK›ØØ[_\Ë›X^RÊK›X^
K\Ë›X^ÏRÊK›X^Ë
K\Ë›Y\™ÙS[ÙOQÊK›Y\™ÙS[ÙKØÛÛœÝ[YQ]XX]Ú[\]XJK\Ë›Z[’RÊK›Z[’
K\Ë›Z[•ÏRÊK›Z[•Ë
K\Ë›˜[YOYK›˜[Y_\Ëœ™\Ù[˜ÙOQÊKœ™\Ù[˜ÙKØš\ÚX›XY[˜[˜XÝ]™X[š\ÚX›XJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ëœ™\ÝÜ™TÝ]OQÊKœ™\ÝÜ™TÝ]KØX[X[]]ØJK\ËœØÛÜOQÊKœØÛÜKØ˜[YX›Û™XJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËÏYKÏÒÊKÊN˜\ËžRÊKž
K\ËžORÊKžK
K\Ë˜\ÜÚ\Ý[[\Ë˜š[™[[\Ë˜›ÛÚÙ[™[[\Ë˜›Ü™\[[\Ë˜œ™XZÏ[[\Ë˜Ø[Ý[]O[[\Ë™\ØÏ[[\Ë™^˜\Ï[[\ËšÙY\[[\Ë›X\™Ú[[[\Ë›ØØÝ\[[\Ë›Ý™\™›ÝÏ[[\ËœYÙTÙ][[\Ëœ\˜O[[\Ë˜]™\œØ[[[\Ë˜[Y]O[[\Ë˜\šXX›\Ï[[\Ë˜\™XO[™]ÈK\Ë˜œ™XZÐY\[™]ÈK\Ë˜œ™XZÐ™Y›Ü™O[™]ÈK\Ë˜ÛÛ›™XÝ[™]ÈK\Ë™˜]Ï[™]ÈK\Ë™]™[[™]ÈK\Ë™^Øš™XÝ[™]ÈK\Ë™^ÛÜ›Ý\[™]ÈK\Ë™šY[[™]ÈK\Ëœ›ÝÏ[™]ÈK\ËœÙ]›Ü\O[™]ÈK\ËœÝX™›Ü›O[™]ÈK\ËœÝX™›Ü›TÙ][™]È_VÖWJ
^Û]O]\ÖÖWJ
NÜ™]\›ˆH[œÝ[˜Ù[ÙˆZÙVÖWJ
N™_VØYJ
^Ü™]\›ˆLVÝYJ
^Ü™]\›ˆ\Ë›^[Ý]™[™ÕÚ]
]˜
I‰\ÖÒK˜][\OOL	‰\ÖÒK›[X™\’[“[™OŒ\ÖÖWJ
VÝYJ
_J–ÒWJ
^ÞZY[
™
\Ê_VÓWJ
^Ü™]\›ˆ	Š\Ê_VÑ]WJK
^Ù\
\ËK
_VÐWJ
^Ü™]\›ˆ
\Ê_VÛJ
^Û]O]\ÖÖWJ
NÜ™]\›ˆVÛJ
OÝ\ÖÒK—Ú\ÔÜ]X›OOO]›ÚYÝ\Ë›^[Ý]OOXÜÚ][Û˜\Ë›^[Ý]š[˜ÛY\Ê›ÝØ
_\ËšÙY\	‰\ËšÙY\š[XÝOOX›Û™XÊ\ÖÒK—Ú\ÔÜ]X›OHLKLJN™K›^[Ý]Ë™[™ÕÚ]
]˜
I‰™VÒK›[X™\’[“[™HOOLÈLNŠ\ÖÒK—Ú\ÔÜ]X›OHLL
N\ÖÒK—Ú\ÔÜ]X›NˆL_VÕWJJ^ÚYŠ
\ÊK\Ë˜œ™XZÊ^ÚYŠ\Ë˜œ™XZË˜Y\ˆOOX]]Ø\Ë˜œ™XZË˜Y\•\™Ù]OOX
^Û]O[™]È\
Ý\™Ù]\N\Ë˜œ™XZË˜Y\‹\™Ù]\Ë˜œ™XZË˜Y\•\™Ù]Ý\™]Î\Ë˜œ™XZËœÝ\™]ËÔÝš[™Ê
_JNÙVÉWO]\ÖÉWK\ÖÑWJJK\Ë˜œ™XZÐY\‹œ\Ú
J_ZYŠ\Ë˜œ™XZË˜™Y›Ü™HOOX]]Ø\Ë˜œ™XZË˜™Y›Ü™U\™Ù]OOX
^Û]O[™]Èœ
Ý\™Ù]\N\Ë˜œ™XZË˜™Y›Ü™K\™Ù]\Ë˜œ™XZË˜™Y›Ü™U\™Ù]Ý\™]Î\Ë˜œ™XZËœÝ\™]ËÔÝš[™Ê
_JNÙVÉWO]\ÖÉWK\ÖÑWJJK\Ë˜œ™XZÐ™Y›Ü™Kœ\Ú
J_ZYŠ\Ë˜œ™XZË›Ý™\™›ÝÕ\™Ù]OOX
^Û]O[™]ÈJÝ\™Ù]\Ë˜œ™XZË›Ý™\™›ÝÕ\™Ù]XY\Ž\Ë˜œ™XZË›Ý™\™›ÝÓXY\‹˜Z[\Ž\Ë˜œ™XZË›Ý™\™›ÝÕ˜Z[\ŸJNÙVÉWO]\ÖÉWK\ÖÑWJJK\Ë›Ý™\™›ÝËœ\Ú
J_]\ÖÐÙJ\Ë˜œ™XZÊK\Ë˜œ™XZÏ[[ZYŠ\Ëœ™\Ù[˜ÙOOOXY[˜\Ëœ™\Ù[˜ÙOOOX[˜XÝ]™X
\™]\›ˆK‘STNÚYŠ
\Ë˜œ™XZÐ™Y›Ü™K˜Ú[™[‹›[™ÝŒ_\Ë˜œ™XZÐY\‹˜Ú[™[‹›[™ÝŒJI‰JHHÙ]™\˜[œ™XZÐ™Y›Ü™HÜˆœ™XZÐY\ˆ[ˆÝX™›Ü›\ÎˆX\ÙHš[HHYË˜
K\Ë˜œ™XZÐ™Y›Ü™K˜Ú[™[‹›[™ÝLJ^Û]O]\Ë˜œ™XZÐ™Y›Ü™K˜Ú[™[–ÌNÚYŠ\
JJ\™]\›ˆK˜œ™XZÓ›ÙJJ_ZYŠ\ÖÒOË˜Y\œ™XZÐY\Š\™]\›ˆK‘STNÕ™Š\ÊNÛ]V×K^ÚY\ÖÑ™KÛ\ÜÎ–×_NÒÙŠ\Ë‹˜Û\ÜÊK\ÖÒ_SØš™XÝ˜Ü™X]J[
KØš™XÝ˜\ÜÚYÛŠ\ÖÒKØÚ[™[Ž[™N›[]šX]\Î›‹][\Œ[X™\’[“[™NŒ]˜Z[X›TÜXÙNžÝÚY“X]›Z[Š\ËßKÌKÚY
KZYÚ“X]›Z[Š\ËšKÌKšZYÚ
_KÚYŒZYÚŒ™]’ZYÚŒÝ\œ™[ÚYŒJNÛ]]\ÖÔ]WJ
KO\–ÒK››Ó^[Ý]˜Z[\™KO]\ÖÛJ
NÚYŠ_Ü
\ÊK\œ
\ËJJ\™]\›ˆK‘RST‘NÛ]Ï[™]ÈÙ]
Ø\™XX˜]Ø^ÛÜ›Ý\šY[ÝX™›Ü›XÝX™›Ü›TÙ]JNÚYŠ\Ë›^[Ý]š[˜ÛY\Ê›ÝØ
J^Û]O]\ÖÖWJ
K˜ÛÛ[[•ÚYÎÐ\œ˜^Kš\Ð\œ˜^JJI‰™K›[™ÝŒ	‰Š\ÖÒK˜ÛÛ[[•ÚYÏYK\ÖÒK˜Ý\œ™[ÛÛ[[L
_[]ÏUYŠ\Ë[˜ÚÜ•\X[Y[œÚ[ÛœØÜÚ][Û˜™\Ù[˜ÙX›Ü™\˜X\™Ú[˜[YÛ˜
KÏVØ˜TÝX™›Ü›XKRŠ\ÊNÚYŠ	‰˜Ëœ\Ú

K‹œÝ[O\Ë‹˜Û\ÜÏXË\Ë›˜[YI‰Š‹ž˜S˜[YO]\Ë›˜[YJK\Ë›Ý™\™›ÝÊ^Û]]\Ë›Ý™\™›ÝÖÑÝWJ
NÝ˜YXY\‰‰Š˜YXY\HLKœ
\Ë›XY\‹JJ_]\ÖÔÙJ
NÛ]O]\Ë›^[Ý]OOX‹]˜\Ë›^[Ý]OOX›]˜]OÌŽŒNÙ›ÜŠÝ\ÖÒK˜][\Ý\ÖÒK˜][\
ÊÊ^ÝI‰\ÖÒK˜][\OOLI‰Š\ÖÒK›[X™\’[“[™OL
NÛ]O]\ÖÓÝWJÙš[\Ž›Ë[˜ÛYNˆLJNÚYŠKœÝXØÙ\ÜÊXœ™XZÎÚYŠKš\Ðœ™XZÊ
J\™]\›ˆ\ÖÞJ
KNÚYŠI‰\ÖÒK˜][\OOL	‰\ÖÒK›[X™\’[“[™OOOL	‰ˆ\–ÒK››Ó^[Ý]˜Z[\™J^Ý\ÖÒK˜][\YØœ™XZß_ZYŠ\ÖÞJ
K_œ
\ÊK–ÒK››Ó^[Ý]˜Z[\™OZK\ÖÒK˜][\OOY
\™]\›ˆ\Ë›Ý™\™›ÝÉ‰Š\ÖÔ]WJ
VÒK›Ý™\™›ÝÓ›ÙO]\Ë›Ý™\™›ÝÊK_[]H\ÖÒKK‘RST‘NÚYŠ\Ë›Ý™\™›ÝÊ^Û]]\Ë›Ý™\™›ÝÖÑÝWJ
NÝ˜Y˜Z[\‰‰Š˜Y˜Z[\HLKœ
\Ë˜Z[\‹JJ_[]LLÝ\Ë›X\™Ú[‰‰Š]\Ë›X\™Ú[‹›Y[œÙ]
Ý\Ë›X\™Ú[‹œšYÚ[œÙ]]\Ë›X\™Ú[‹Ü[œÙ]
Ý\Ë›X\™Ú[‹˜›ÝÛR[œÙ]
NÛ]OSX]›X^
\ÖÒKÚY
Ù‹\Ëß
KSX]›X^
\ÖÒKšZYÚ
Ü\Ëš
KÏVÝ\Ëž\ËžKKNÚYŠ\ËÏOOX	‰ŠËÚYV
JJK\ËšOOX	‰ŠËšZYÚV

JK
ËÚYOOXËšZYÚOOX
I‰›[™ÝOOL
\™]\›ˆK‘STNÛ]Ï^Û˜[YN˜]˜]šX]\Î›‹Ú[™[ŽNÛ\
\ËŠNÛ]\KœÝXØÙ\ÜÊÙŠ\ËÊKÊNÚYŠ\Ë˜œ™XZÐY\‹˜Ú[™[‹›[™ÝLJ^Û]O]\Ë˜œ™XZÐY\‹˜Ú[™[–ÌNÚYŠ\
JJ\™]\›ˆ\ÖÒK˜Y\œ™XZÐY\]‹K˜œ™XZÓ›ÙJJ_\™]\›ˆ[]H\ÖÒKŸ_KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÝX™›Ü›TÙ]L
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ëœ™[][ÛQÊKœ™[][Û‹ØÜ™\™YÚÚXÙX[›Ü™\™YJK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›ÛÚÙ[™[[\Ë˜œ™XZÏ[[\Ë™\ØÏ[[\Ë™^˜\Ï[[\Ë›ØØÝ\[[\Ë›Ý™\™›ÝÏ[[\Ë˜œ™XZÐY\[™]ÈK\Ë˜œ™XZÐ™Y›Ü™O[™]ÈK\ËœÝX™›Ü›O[™]ÈK\ËœÝX™›Ü›TÙ][™]È_J–ÒWJ
^ÞZY[
™
\Ê_VÖWJ
^Û]O]\ÖÖWJ
NÙ›ÜŠÈJH[œÝ[˜Ù[Ùˆ
NÊYOYVÖWJ
NÜ™]\›ˆ_VØYJ
^Ü™]\›ˆL_KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÝXš™XÝ˜
K\Ë™[[Z]\YK™[[Z]\Ÿ\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Ý\ÖÕ—O[™]ÈX\
\ÖÕ—KœÜ]
\Ë™[[Z]\ŠK›X\
OOŠOYKœÜ]
XŠKVÌOYVÌKš[J
KJJJ__KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÝXš™XÝœØL
K\ËšYYKšY\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËœÝXš™XÝ[™]È__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÝX›Z]L
K\Ë™[X™YUÊÙ]N™K™[X™Y‹Y˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë™›Ü›X]QÊK™›Ü›X]Ø›Ü›Y]X˜\›[˜ÛÙY™[JK\ËšYYKšY\Ë\™Ù]YK\™Ù]\Ë^[˜ÛÙ[™ÏR
Ù]N™K^[˜ÛÙ[™ÏÙK^[˜ÛÙ[™ËÓÝÙ\Ø\ÙJ
N˜Y˜][˜[YN˜˜[Y]N™OO–Ø]‹NšYËYš]™X›ÛÜXÚYšXØØšØØ‹LNÌØ‹LŒÌL˜ÜØËMMŒX›Û™XÚYZš\ØXÜËL˜]‹LM˜Kš[˜ÛY\ÊJ_K›X]Ú
Ú\ÛËNNKWÌŸKÊ_JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\ËžÛÛ[YKžÛÛ[\Ë™[˜Üž\[[\Ë™[˜Üž\]O[™]ÈK\ËœÚYÛ‘]O[™]È__KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[\]XL
K\Ë˜˜\ÙT›Ùš[OQÊK˜˜\ÙT›Ùš[KØ[[\˜XÝ]™Q›Ü›\ØJK\Ë™^˜\Ï[[\ËœÝX™›Ü›O[™]È_VÒ]WJ
^Ý\ËœÝX™›Ü›K˜Ú[™[‹›[™ÝOOL	‰JHH›ÈÝX™›Ü›\È[ˆ[\]H›ÙK˜
K\ËœÝX™›Ü›K˜Ú[™[‹›[™ÝL‰‰JHHÙ]™\˜[ÝX™›Ü›\È[ˆ[\]H›ÙNˆX\ÙHš[HHYË˜
K\ÖÐYOMYLßVÛJ
^Ü™]\›ˆLVÑYJK
^Ü™]\›ˆKœÝ\ÕÚ]
Ø
OÖÝ\ÖÝK™Ù]
KœÛXÙJJJWNœÙŠ\ËKLL
_J–ÓYJ
^ÚYŠ]\ËœÝX™›Ü›K˜Ú[™[‹›[™Ý
\™]\›ˆKœÝXØÙ\ÜÊÛ˜[YN˜]˜Ú[™[Ž–×_JNÝ\ÖÒO^ÛÝ™\™›ÝÓ›ÙN›[š\œÝ[œÜ]X›N›[Ý\œ™[ÛÛ[\™XN›[Ý\œ™[YÙP\™XN›[›Ó^[Ý]˜Z[\™NˆLKYÙS[X™\ŽŒKYÙTÜÚ][ÛŽ˜š\œÝÙÜ‘]™[Ž˜Ù›[šÓÜ“›Ý›[šÎ˜›Û›[šØ\˜TÝXÚÎ–×_NÛ]O]\ËœÝX™›Ü›K˜Ú[™[–ÌNÙKœYÙTÙ]Ð]WJ
NÛ]YKœYÙTÙ]œYÙP\™XK˜Ú[™[‹^Û˜[YN˜]˜Ú[™[Ž–×_K[[O[[O[[ÚYŠK˜œ™XZÐ™Y›Ü™K˜Ú[™[‹›[™ÝLOÊOYK˜œ™XZÐ™Y›Ü™K˜Ú[™[–ÌKOZK\™Ù]
N™KœÝX™›Ü›K˜Ú[™[‹›[™ÝLI‰™KœÝX™›Ü›K˜Ú[™[–ÌK˜œ™XZÐ™Y›Ü™K˜Ú[™[‹›[™ÝLOÊOYKœÝX™›Ü›K˜Ú[™[–ÌK˜œ™XZÐ™Y›Ü™K˜Ú[™[–ÌKOZK\™Ù]
N™K˜œ™XZÏË˜™Y›Ü™U\™Ù]ÊOYK˜œ™XZËOZK˜™Y›Ü™U\™Ù]
N™KœÝX™›Ü›K˜Ú[™[‹›[™ÝLI‰™KœÝX™›Ü›K˜Ú[™[–ÌK˜œ™XZÏË˜™Y›Ü™U\™Ù]	‰ŠOYKœÝX™›Ü›K˜Ú[™[–ÌK˜œ™XZËOZK˜™Y›Ü™U\™Ù]
KJ^Û]O]\ÖÑYJKVÖWJ
JNÙH[œÝ[˜Ù[Ùˆ[I‰ŠYKVÒO^ßJ_\Ÿ]ÌK–ÒO^Û[X™\“Ù•\ÙNŒ_NÛ]Ï\–ÖWJ
NÛÖÒO^Û[X™\“Ù•\ÙNŒKYÙR[™^›ËœYÙP\™XK˜Ú[™[‹š[™^ÙŠŠKYÙTÙ][™^ŒNÛ]ËÏ[[[[OHLLLÙ›ÜŠÎÊ^ÚYŠJYLÙ[ÙHYŠ‹˜Ú[™[‹œÜ

K
ÊÙOOLÊ\™]\›ˆJHHÛÛY][™ÈÛÙ\ÈÜ›Û™ÎˆX\ÙHš[HHYË˜
KŽÜÏ[[\ÖÒK˜Ý\œ™[YÙP\™XO\ŽÛ]\–ÕWJ
Kš[Û‹˜Ú[™[‹œ\Ú

KÉ‰J\ÖÒK››Ó^[Ý]˜Z[\™OHL˜Ú[™[‹œ\Ú
ÖÕWJ–ÒKœÜXÙJKš[
K[
K	‰J\ÖÒK››Ó^[Ý]˜Z[\™OHL˜Ú[™[‹œ\Ú
ÕWJ–ÒKœÜXÙJKš[
K[
NÛ]O\‹˜ÛÛ[\™XK˜Ú[™[‹O]˜Ú[™[‹™š[\ŠOO™K˜]šX]\Ë˜Û\ÜËš[˜ÛY\Ê˜PÛÛ[\™XX
JNÝOHLK\ÖÒK™š\œÝ[œÜ]X›O[[\ÖÒK››Ó^[Ý]˜Z[\™OHLNÛ]Ï]OžÛ]YVÓWJ
NÛ‰‰Š_[‹˜Ú[™[Ë›[™ÝŒVÝK˜Ú[™[‹œ\Ú
ŠJ_NÙ›ÜŠ]Y‹ZK›[™ÝÝŽÝ
ÊÊ^Û]]\ÖÒK˜Ý\œ™[ÛÛ[\™XOZVÝK^ÝÚYœ‹ËZYÚœ‹šNÙLÉ‰JVÝK˜Ú[™[‹œ\Ú
ÖÕWJ
Kš[
K[
K	‰JVÝK˜Ú[™[‹œ\Ú
ÕWJ
Kš[
K[
NÛ]YVÕWJ
NÚYŠœÝXØÙ\ÜÊ\™]\›ˆš[Ê_\š[˜Ú[™[Ë›[™ÝŒVÝK˜Ú[™[‹œ\Ú
š[
JNˆ]I‰›‹˜Ú[™[‹›[™ÝŒI‰›‹˜Ú[™[‹œÜ

KŽÚYŠš\Ðœ™XZÊ
J^Û]O\˜œ™XZÓ›ÙNÚYŠÊ
KK\™Ù]\OOOX]]Ø
XÛÛ[YNÙK›XY\‰‰ŠÏ]\ÖÑYJK›XY\‹VÖWJ
JKÏXÏØÖÌN›[
KK˜Z[\‰‰Š]\ÖÑYJK˜Z[\‹VÖWJ
JK[ÛÌN›[
KK\™Ù]\OOOXYÙP\™XXÊÏYVÒK\™Ù]LKÌ
N™VÒK\™Ù]ÊÏYVÒK\™Ù]YVÒKš[™^
ÌKLKÌ
NYVÒKš[™^ØÛÛ[Y_ZYŠ\ÖÒK›Ý™\™›ÝÓ›ÙJ^Û]O]\ÖÒK›Ý™\™›ÝÓ›ÙNÝ\ÖÒK›Ý™\™›ÝÓ›ÙO[[Û]YVÑÝWJ
K[‹\™Ù]Û‹˜YXY\[‹›XY\ˆOO[[‹˜Y˜Z[\[‹˜Z[\ˆOO[[Ê
NÛ]O]ÚYŠLKÌˆ[œÝ[˜Ù[Ùˆ[J\Ï\ŽÙ[ÙHYŠˆ[œÝ[˜Ù[ÙˆÜ
^Û]OZKš[™^ÙŠŠNÙOOOKLOÊÏ\–ÖWJ
K\Ë˜ÛÛ[\™XK˜Ú[™[‹š[™^ÙŠŠJN™O˜OÝYKLN™Y_XÛÛ[Y_[Ê
_]\ÖÒKœYÙS[X™\ŠÏLKÉ‰ŠÖÙ™J
OÜÖÒK›[X™\“Ù•\ÙJÏLNœÏ[[
K\ß–Ö]WJ
KZY[[__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^
K\ËšYYKšY\Ë›X^Ú\œÏUÊÙ]N™K›X^Ú\œËY˜][˜[YNŒ˜[Y]N™OO™OLJK\Ë›˜[YOYK›˜[Y_\ËœšYYKœšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÕWJ
^Ü™]\›ˆLV×ÙJJ^Ü™]\›ˆVÛYOOOSž[šYÊ\ÖÕ—OYKL
NŠJHH[˜[YÛÛ[[ˆ^ˆ	ÙVÚ_K˜
KLJ_VÞYJJ^Ý\ÖÕ—Z[œÝ[˜Ù[ÙˆŸÝ\\–ÞYJJ_VÒ]WJ
^Ý\[Ùˆ\ÖÕ—OOXÝš[™Ø	‰Š\ÖÕ—O]\ÖÕ—Kœ™\XÙP[
—˜˜
J_VÑÝWJ
^Ü™]\›ˆ\[Ùˆ\ÖÕ—OOXÝš[™ØÝ\ÖÕ—KœÜ]
Ö×LŒŽWLŒŽ—KÊK™š[\ŠOOˆHYJKš›Ú[Š˜
N\ÖÕ—VÚ™J
_VÕWJJ^ÚYŠ\[Ùˆ\ÖÕ—OOXÝš[™Ø
^Û]OYÜ
\ÖÕ—JKš[Ü™]\›ˆ\ÖÕ—Kš[˜ÛY\ÊLŒŽX
OÊK›˜[YOX]˜K˜Ú[™[V×K\ÖÕ—KœÜ]
LŒŽX
K›X\
OO™KœÜ]
Ö×LŒŽ—KÊK™›]X\
OO–ÞÛ˜[YN˜Ü[˜˜[YN™_KÛ˜[YN˜œ˜WJJK™›Ü‘XXÚ
OžÙK˜Ú[™[‹œ\Ú
Û˜[YN˜Ú[™[ŽJ_JJN‹Ö×LŒŽ—KË\Ý
\ÖÕ—JI‰ŠK›˜[YOX]˜K˜Ú[™[V×K\ÖÕ—KœÜ]
Ö×LŒŽ—KÊK™›Ü‘XXÚ
OžÙK˜Ú[™[‹œ\Ú
Û˜[YN˜Ü[˜˜[YNKÛ˜[YN˜œ˜J_JJKKœÝXØÙ\ÜÊJ_\™]\›ˆ\ÖÕ—VÕWJJ__KÚXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^Y]L
K\Ë˜[ÝÔšXÚ^UÊÙ]N™K˜[ÝÔšXÚ^Y˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\ËšØÜ›ÛÛXÞOQÊKšØÜ›ÛÛXÞKØ]]ØÙ™˜Û˜JK\ËšYYKšY\Ë›][S[™OUÊÙ]N™K›][S[™KY˜][˜[YN˜˜[Y]N™OO™OOOLOOOL_JK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë”ØÜ›ÛÛXÞOQÊK”ØÜ›ÛÛXÞKØ]]ØÙ™˜Û˜JK\Ë˜›Ü™\[[\Ë˜ÛÛX[[\Ë™^˜\Ï[[\Ë›X\™Ú[[[VÕWJJ^Û]UYŠ\Ë›Ü™\˜›ÛX\™Ú[˜
K‹]\ÖÖWJ
VÖWJ
NÜ™]\›ˆ\Ë›][S[™OOOX	‰Š\Ë›][S[™OJÊˆ[œÝ[˜Ù[Ùˆ[JJK]\Ë›][S[™OOOLOÞÛ˜[YN˜^\™XX]šX]\ÎžÙ]RYœ–ÔWOË–Ñ™_–Ñ™KšY[Yœ–Ñ™KÛ\ÜÎ–Ø˜U^šY[KÝ[N˜\šXK[X™[Žš
ŠK˜\šXK\™\]Z\™YŽˆL__NžÛ˜[YN˜[œ]]šX]\ÎžÝ\N˜^]RYœ–ÔWOË–Ñ™_–Ñ™KšY[Yœ–Ñ™KÛ\ÜÎ–Ø˜U^šY[KÝ[N˜\šXK[X™[Žš
ŠK˜\šXK\™\]Z\™YŽˆL__Kœ
ŠI‰Š‹˜]šX]\ÖØ\šXK\™\]Z\™YOHL‹˜]šX]\Ëœ™\]Z\™YHL
KKœÝXØÙ\ÜÊÛ˜[YN˜X™[]šX]\ÎžØÛ\ÜÎ–Ø˜SX™[_KÚ[™[Ž–Û—_J__KÚXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[YX
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸVÒ]WJ
^Û]O]\ÖÕ—Kš[J
NÝ\ÖÕ—OYOÛ™]È]JJN›[VÕWJJ^Ü™]\›ˆÜ
\ÖÕ—OÝ\ÖÕ—KÔÝš[™Ê
N˜
__KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[YTÝ[\
K\ËšYYKšY\ËœÙ\™\YKœÙ\™\Ÿ\Ë\OQÊK\KØÜ[Û˜[™\]Z\™YJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KZXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÛ\
K\ËšYYKšY\ËœšYYKœšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜]™\œØ[L
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ë˜]™\œÙO[™]È__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜]™\œÙXL
K\ËšYYKšY\Ë›Ü\˜][ÛQÊK›Ü\˜][Û‹Ø™^˜XÚØÝÛ˜š\œÝYšYÚ\JK\Ëœ™YYKœ™YŸ\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\ËœØÜš\[[YÙ]˜[YJ
^Ü™]\›ˆ\Ë›Ü\˜][ÛŸVÙJ
^Ü™]\›ˆL__KÚXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ZXL
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\ËœXÝ\™O[[\Ë˜˜\˜ÛÙO[[\Ë˜]Û[[\Ë˜ÚXÚÐ]Û[[\Ë˜ÚÚXÙS\Ý[[\Ë™]U[YQY][[\Ë™Y˜][ZO[[\Ëš[XYÙQY][[\Ë›[Y\šXÑY][[\Ëœ\ÜÝÛÜ™Y][[\ËœÚYÛ˜]\™O[[\Ë^Y][[VÑÝWJ
^ÚYŠ\ÖÒOOO]›ÚY
^Ù›ÜŠ]HÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^ÚYŠOOOX^˜\ØOOOXXÝ\™X
XÛÛ[YNÛ]]\ÖÙWNÚYŠ[œÝ[˜Ù[ÙˆŠ\™]\›ˆ\ÖÒO]]\ÖÒO[[\™]\›ˆ\ÖÒ_VÕWJJ^Û]]\ÖÑÝWJ
NÜ™]\›ˆÝÕWJJNœK‘ST__KÚXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜[Y]XL
K\Ë™›Ü›X]\ÝQÊK™›Ü›X]\ÝØØ\›š[™Ø\ØX›Y\œ›Ü˜JK\ËšYYKšY\Ë›[\ÝQÊK›[\ÝØ\ØX›Y\œ›Ü˜Ø\›š[™ØJK\ËœØÜš\\ÝQÊKœØÜš\\ÝØ\œ›Ü˜\ØX›YØ\›š[™ØJK\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë™^˜\Ï[[\Ë›Y\ÜØYÙO[[\ËœXÝ\™O[[\ËœØÜš\[[_KÚXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜[YXL
K\ËšYYKšY\Ë›Ý™\œšYOUÊÙ]N™K›Ý™\œšYKY˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ëœ™[]˜[UÙ
Kœ™[]˜[
K\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜\˜Ï[[\Ë˜›ÛÛX[[[\Ë™]O[[\Ë™]U[YO[[\Ë™XÚ[X[[[\Ë™^]O[[\Ë™›Ø][[\Ëš[XYÙO[[\Ëš[YÙ\[[\Ë›[™O[[\Ëœ™XÝ[™ÛO[[\Ë^[[\Ë[YO[[VÚÙJJ^Û]]\ÖÖWJ
NÚYŠ[œÝ[˜Ù[ÙˆI‰ZOËš[XYÙQY]
^Ý\Ëš[XYÙ_
\Ëš[XYÙO[™]ÈÛJßJK\ÖÑWJ\Ëš[XYÙJJK\Ëš[XYÙVÕ—OYVÕ—NÜ™]\›Ÿ[]YVÚNÚYŠ\ÖÛ—HOO[[
^Ý\ÖÛ—VÕ—OYVÕ—NÜ™]\›ŸY›ÜŠ]HÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^Û]]\ÖÙWNÝ[œÝ[˜Ù[Ùˆ‰‰Š\ÖÙWO[[\ÖÐÙJ
J_]\ÖÙVÚWOYK\ÖÑWJJ_VÚ™J
^ÚYŠ\Ë™^]J\™]\›ˆ\[Ùˆ\Ë™^]VÕ—OOXÝš[™ØÝ\Ë™^]VÕ—Kš[J
N\Ë™^]VÕ—VÚ™J
Kš[J
NÙ›ÜŠ]HÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^ÚYŠOOOX[XYÙX
XÛÛ[YNÛ]]\ÖÙWNÚYŠ[œÝ[˜Ù[ÙˆŠ\™]\›ŠÕ—_
KÔÝš[™Ê
Kš[J
_\™]\›ˆ[VÕWJJ^Ù›ÜŠ]ÙˆØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\Ê\ÊJ^Û]]\ÖÝNÚYŠˆ[œÝ[˜Ù[ÙˆŠ\™]\›ˆ–ÕWJJ_\™]\›ˆK‘ST__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹˜\šXX›\ØL
K\ËšYYKšY\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ\Ë˜›ÛÛX[[™]ÈK\Ë™]O[™]ÈK\Ë™]U[YO[™]ÈK\Ë™XÚ[X[[™]ÈK\Ë™^]O[™]ÈK\Ë™›Ø][™]ÈK\Ëš[XYÙO[™]ÈK\Ëš[YÙ\[™]ÈK\Ë›X[šY™\Ý[™]ÈK\ËœØÜš\[™]ÈK\Ë^[™]ÈK\Ë[YO[™]È_VÙJ
^Ü™]\›ˆL_KZXÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J^Û]YVÝJŠNÜ™]\›ˆ–ÓÙJŠKŸ_\Ý]XÈ\X\˜[˜ÙQš[\ŠJ^Ü™]\›ˆ™]È
J_\Ý]XÈ\˜ÊJ^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈ\™XJJ^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈ\ÜÚ\Ý
J^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈ˜\˜ÛÙJJ^Ü™]\›ˆ™]È
J_\Ý]XÈš[™
J^Ü™]\›ˆ™]È\
J_\Ý]XÈš[™][\ÊJ^Ü™]\›ˆ™]È
J_\Ý]XÈ›ÛÚÙ[™
J^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈ›ÛÛX[ŠJ^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈ›Ü™\ŠJ^Ü™]\›ˆ™]È\
J_\Ý]XÈœ™XZÊJ^Ü™]\›ˆ™]Èœ
J_\Ý]XÈœ™XZÐY\ŠJ^Ü™]\›ˆ™]È\
J_\Ý]XÈœ™XZÐ™Y›Ü™JJ^Ü™]\›ˆ™]Èœ
J_\Ý]XÈ]ÛŠJ^Ü™]\›ˆ™]È
J_\Ý]XÈØ[Ý[]JJ^Ü™]\›ˆ™]Èœ
J_\Ý]XÈØ\[ÛŠJ^Ü™]\›ˆ™]È\
J_\Ý]XÈÙ\YšXØ]JJ^Ü™]\›ˆ™]È
J_\Ý]XÈÙ\YšXØ]\ÊJ^Ü™]\›ˆ™]Èœ
J_\Ý]XÈÚXÚÐ]ÛŠJ^Ü™]\›ˆ™]Èœ
J_\Ý]XÈÚÚXÙS\Ý
J^Ü™]\›ˆ™]Èœ
J_\Ý]XÈÛÛÜŠJ^Ü™]\›ˆ™]Èœ
J_\Ý]XÈÛÛXŠJ^Ü™]\›ˆ™]È
J_\Ý]XÈÛÛ›™XÝ
J^Ü™]\›ˆ™]È\
J_\Ý]XÈÛÛ[\™XJJ^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈÛÜ›™\ŠJ^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈ]JJ^Ü™]\›ˆ™]ÈÜ
J_\Ý]XÈ]U[YJJ^Ü™]\›ˆ™]È\
J_\Ý]XÈ]U[YQY]
J^Ü™]\›ˆ™]Èœ
J_\Ý]XÈXÚ[X[
J^Ü™]\›ˆ™]È\
J_\Ý]XÈY˜][ZJJ^Ü™]\›ˆ™]È
J_\Ý]XÈ\ØÊJ^Ü™]\›ˆ™]Èœ
J_\Ý]XÈYÙ\ÝY]Ù
J^Ü™]\›ˆ™]È\
J_\Ý]XÈYÙ\ÝY]ÙÊJ^Ü™]\›ˆ™]È	
J_\Ý]XÈ˜]ÊJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈYÙJJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ[˜ÛÙ[™ÊJ^Ü™]\›ˆ™]È›JJ_\Ý]XÈ[˜ÛÙ[™ÜÊJ^Ü™]\›ˆ™]È›JJ_\Ý]XÈ[˜Üž\
J^Ü™]\›ˆ™]È[JJ_\Ý]XÈ[˜Üž\]JJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈ[˜Üž\[ÛŠJ^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ[˜Üž\[Û“Y]Ù
J^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ[˜Üž\[Û“Y]ÙÊJ^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ]™[
J^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ^]JJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈ^Øš™XÝ
J^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ^ÛÜ›Ý\
J^Ü™]\›ˆ™]È›JJ_\Ý]XÈ^XÝ]JJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ^˜\ÊJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈšY[
J^Ü™]\›ˆ™]ÈJJ_\Ý]XÈš[
J^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈš[\ŠJ^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ›Ø]
J^Ü™]\›ˆ™]È›JJ_\Ý]XÈ›Û
J^Ü™]\›ˆ™]È[JJ_\Ý]XÈ›Ü›X]
J^Ü™]\›ˆ™]È›JJ_\Ý]XÈ[™\ŠJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ\[˜][ÛŠJ^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ[XYÙJJ^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ[XYÙQY]
J^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ[YÙ\ŠJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ\ÜÝY\œÊJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈ][\ÊJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈÙY\
J^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈÙ^U\ØYÙJJ^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ[™JJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈ[™X\ŠJ^Ü™]\›ˆ™]È›JJ_\Ý]XÈØÚÑØÝ[Y[
J^Ü™]\›ˆ™]È[JJ_\Ý]XÈX[šY™\Ý
J^Ü™]\›ˆ™]È›JJ_\Ý]XÈX\™Ú[ŠJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈY
J^Ü™]\›ˆ™]È›JJ_\Ý]XÈYY][JJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈY\ÜØYÙJJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ[Y\šXÑY]
J^Ü™]\›ˆ™]È›JJ_\Ý]XÈØØÝ\ŠJ^Ü™]\›ˆ™]È›JJ_\Ý]XÈÚY
J^Ü™]\›ˆ™]È›JJ_\Ý]XÈÚYÊJ^Ü™]\›ˆ™]È›JJ_\Ý]XÈÝ™\™›ÝÊJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈYÙP\™XJJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈYÙTÙ]
J^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ\˜JJ^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ\ÜÝÛÜ™Y]
J^Ü™]\›ˆ™]ÈÛJJ_\Ý]XÈ]\›ŠJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈXÝ\™JJ^Ü™]\›ˆ™]È›JJ_\Ý]XÈ›ÝÊJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈ˜YX[
J^Ü™]\›ˆ™]ÈJJ_\Ý]XÈ™X\ÛÛŠJ^Ü™]\›ˆ™]È›JJ_\Ý]XÈ™X\ÛÛœÊJ^Ü™]\›ˆ™]È[JJ_\Ý]XÈ™XÝ[™ÛJJ^Ü™]\›ˆ™]È	JJ_\Ý]XÈ™YŠJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈØÜš\
J^Ü™]\›ˆ™]È
J_\Ý]XÈÙ]›Ü\JJ^Ü™]\›ˆ™]Èš
J_\Ý]XÈÚYÛ‘]JJ^Ü™]\›ˆ™]Èš
J_\Ý]XÈÚYÛ˜]\™JJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈÚYÛš[™ÊJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈÛÛY
J^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈÜXZÊJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈÝ\JJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈÝX™›Ü›JJ^Ü™]\›ˆ™]È
J_\Ý]XÈÝX™›Ü›TÙ]
J^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈÝXš™XÝŠJ^Ü™]\›ˆ™]È
J_\Ý]XÈÝXš™XÝœÊJ^Ü™]\›ˆ™]Èš
J_\Ý]XÈÝX›Z]
J^Ü™]\›ˆ™]È
J_\Ý]XÈ[\]JJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈ^
J^Ü™]\›ˆ™]È
J_\Ý]XÈ^Y]
J^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ[YJJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ[YTÝ[\
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈÛÛ\
J^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈ˜]™\œØ[
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈ˜]™\œÙJJ^Ü™]\›ˆ™]È
J_\Ý]XÈZJJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ˜[Y]JJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ˜[YJJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ˜\šXX›\ÊJ^Ü™]\›ˆ™]È
J__NÛ]S™]\Ù]ËšYÙ[˜Ý[ÛˆÚ
J^Û][™]È
ßJNÜ™]\›ˆÕ—OYK]˜\ˆÚXÛ\ÜÞØÛÛœÝXÝÜŠJ^Ý\Ëœ›ÛÝYK\Ë™]\Ù]ÏYK™]\Ù]Ë\Ë™]OYK™]\Ù]ÏË™]_™]ÈÙŠ™]\Ù]ËšY]X
K\Ë™[\SY\™ÙO]\Ë™]VÜ]WJ
K›[™ÝOOL\Ëœ›ÛÝ™›Ü›O]\Ë™›Ü›OYK[\]VÓ]WJ
_WÚ\ÐÛÛœÝ[YQ]J
^Ü™]\›ˆ]\Ë™[\SY\™ÙI‰\Ë—ÛY\™ÙS[Ù_WÚ\ÓX]Ú[\]J
^Ü™]\›ˆ]\Ë—Ú\ÐÛÛœÝ[YQ]J
_Xš[™

^Ü™]\›ˆ\Ë—Øš[™[[Y[
\Ë™›Ü›K\Ë™]JK\Ë™›Ü›_YÙ]]J
^Ü™]\›ˆ\Ë™]_WØš[™˜[YJKŠ^ÚYŠVÔWO]VÙYJ
JZYŠÛÙJ
J^Û]]ÕÝWJ
NÙVÚÙJÚ
ŠJ_Y[ÙHYŠH[œÝ[˜Ù[ÙˆI‰™KZOË˜ÚÚXÙS\ÝË›Ü[OOX][TÙ[XÝ
^Û]]Ü]WJ
K›X\
OO™VÕ—Kš[J
JKš›Ú[Š˜
NÙVÚÙJÚ
ŠJ_Y[ÙH\Ë—Ú\ÐÛÛœÝ[YQ]J
I‰JHH›Ù\È]™[—	ÝHØ[YH\K˜
NÙ[ÙH]ÛÙJ
_\Ë—Ú\ÓX]Ú[\]J
OÝ\Ë—Øš[™[[Y[
K
NJHH›Ù\È]™[—	ÝHØ[YH\K˜
_WÙš[™]PžS˜[YUÐÛÛœÝ[YJK‹Š^ÚYŠYJ\™]\›ˆ[Û]KNÙ›ÜŠ]LÜÎÜŠÊÊ^Ù›ÜŠO[–ÒÝWJKLKL
NØOZK›™^

K˜[YKNÊZYŠOOXVÛÙJ
J\™]\›ˆNÚYŠ–ÛYOOOS™]\Ù]ËšY	‰›–ÚOOOX]X
Xœ™XZÎÛ[–ÖWJ
_\™]\›ˆÊO]\Ë™]VÒÝWJKLLJKOZK›™^

K˜[YK_
O]\Ë™]VÔWJKL
KOZK›™^

K˜[YKOË–ÛÙJ
JOØN›[
N›[WÜÙ]›Ü\Y\ÊK
^ÚYŠKš\ÓÝÛ”›Ü\JÙ]›Ü\X
JY›ÜŠ]Ü™YŽ›‹\™Ù]œ‹ÛÛ›™XÝ[ÛŽš_[ÙˆKœÙ]›Ü\K˜Ú[™[Š^ÚYŠ_[ŠXÛÛ[YNÛ]O\ÙŠ\Ëœ›ÛÝ‹LKLJNÚYŠXJ^ÐJHH[˜[Y™Y™\™[˜ÙNˆ	ÛŸK˜
NØÛÛ[Y_[]Û×OXNÚYŠ[ÖÜÙJ\Ë™]JJ^ÐJHH[˜[Y›ÙNˆ]\Ý™HH]H›ÙK˜
NØÛÛ[Y_[]Ï\ÙŠ\Ëœ›ÛÝK‹LKLJNÚYŠ\Ê^ÐJHH[˜[Y\™Ù]ˆ	ÜŸK˜
NØÛÛ[Y_[]Ø×O\ÎÚYŠXÖÜÙJJJ^ÐJHH[˜[Y\™Ù]ˆ]\Ý™HH›Ü\HÜˆÝXœ›Ü\K˜
NØÛÛ[Y_[]XÖÖWJ
NÚYŠÈ[œÝ[˜Ù[Ùˆš[œÝ[˜Ù[Ùˆš
^ÐJHH[˜[Y\™Ù]ˆØ[››Ý™HHÙ]›Ü\HÜˆÛ™HÙˆ]È›Ü\Y\Ë˜
NØÛÛ[Y_ZYŠÈ[œÝ[˜Ù[Ùˆ[œÝ[˜Ù[Ùˆ
^ÐJHH[˜[Y\™Ù]ˆØ[››Ý™HHš[™][\ÈÜˆÛ™HÙˆ]È›Ü\Y\Ë˜
NØÛÛ[Y_[]O[ÖÚ™J
KXÖÚNÚYŠÈ[œÝ[˜Ù[ÙˆÙŠ^Û]OSØš™XÝ˜Ü™X]J[
NÙVÙO]KÙOT™Y›XÝ˜ÛÛœÝXÝ
Øš™XÝ™Ù]›ÝÝ\SÙŠ
K˜ÛÛœÝXÝÜ‹ÙWJVÙNØÛÛ[Y_ZYŠXËš\ÓÝÛ”›Ü\JŠJ^ÐJHH[˜[Y›ÙHÈ\ÙH[ˆÙ]›Ü\X
NØÛÛ[Y_XÖÔWO[ËÖÕ—O]KÖÒ]WJ
__WØš[™][\ÊK
^ÚYŠYKš\ÓÝÛ”›Ü\J][\Ø
_YKš\ÓÝÛ”›Ü\Jš[™][\Ø
_K˜š[™][\Ëš\Ñ[\J
J\™]\›ŽÙ›ÜŠ]ÙˆKš][\Ë˜Ú[™[ŠYVÐÙJ
NÙKš][\Ë˜ÛX\Š
NÛ][™]ÈJßJK[™]ÈJßJNÙVÑWJŠKKš][\Ëœ\Ú
ŠKVÑWJŠKKš][\Ëœ\Ú
ŠNÙ›ÜŠ]Ü™YŽšKX™[™YŽ˜K˜[YT™YŽ›ËÛÛ›™XÝ[ÛŽœß[ÙˆK˜š[™][\Ë˜Ú[™[Š^ÚYŠßZJXÛÛ[YNÛ]O\ÙŠ\Ëœ›ÛÝKLKLJNÚYŠYJ^ÐJHH[˜[Y™Y™\™[˜ÙNˆ	Ú_K˜
NØÛÛ[Y_Y›ÜŠ]ÙˆJ^ÚYŠ]ÜÙJ\Ë™]\Ù]ÊJ^ÐJHH[˜[Y™Yˆ
	Ú_JNˆ]\Ý™HH]\Ù]ÈÚ[˜
NØÛÛ[Y_[]O\ÙŠ\Ëœ›ÛÝKLLJNÚYŠYJ^ÐJHH[˜[YX™[ˆ	Ø_K˜
NØÛÛ[Y_[]Ü×OYNÚYŠ\ÖÜÙJ\Ë™]\Ù]ÊJ^ÐJHH[˜[YX™[ˆ]\Ý™HH]\Ù]ÈÚ[˜
NØÛÛ[Y_[]Ï\ÙŠ\Ëœ›ÛÝËLLJNÚYŠXÊ^ÐJHH[˜[Y˜[YNˆ	ÛßK˜
NØÛÛ[Y_[]ÛOXÎÚYŠ[ÜÙJ\Ë™]\Ù]ÊJ^ÐJHH[˜[Y˜[YNˆ]\Ý™HH]\Ù]ÈÚ[˜
NØÛÛ[Y_[]OSÚ
ÖÚ™J
JKSÚ
Ú™J
JNÛ–ÑWJJK‹^œ\Ú
JK–ÑWJ
K‹^œ\Ú

___WØš[™ØØÝ\œ™[˜Ù\ÊKŠ^Û]ŽÚYŠ›[™ÝŒI‰ŠYVÓ]WJ
K–ÐÙJ‹›ØØÝ\ŠK‹›ØØÝ\[[
K\Ë—Øš[™˜[YJKÌKŠK\Ë—ÜÙ]›Ü\Y\ÊKÌJK\Ë—Øš[™][\ÊKÌJK›[™ÝOOLJ\™]\›ŽÛ]OYVÖWJ
KOYVÚKÏZVÛ™JJNÙ›ÜŠ]OLKÏ]›[™ÝÙOÎÙJÊÊ^Û]Ï]ÙWKÏ\–Ó]WJ
NÚVØWKœ\Ú
ÊKVÜ™JÊÙKÊK\Ë—Øš[™˜[YJËËŠK\Ë—ÜÙ]›Ü\Y\ÊËÊK\Ë—Øš[™][\ÊËÊ__WØÜ™X]SØØÝ\œ™[˜Ù\ÊJ^ÚYŠ]\Ë™[\SY\™ÙJ\™]\›ŽÛ]ÛØØÝ\ŽOYNÚYŠ]š[š]X[LJ\™]\›ŽÛ]YVÖWJ
KYVÚNÚYŠJ–Ü—Z[œÝ[˜Ù[ÙˆJJ\™]\›ŽÛ]NÚOYK›˜[YOÛ–Ü—K˜Ú[™[‹™š[\ŠO›˜[YOOOYK›˜[YJK›[™Ý›–Ü—K˜Ú[™[‹›[™ÝÛ]O[–Û™JJJÌKÏ]š[š]X[ZNÚYŠÊ^Û]YVÓ]WJ
NÝÐÙJ›ØØÝ\ŠK›ØØÝ\[[–Ü—Kœ\Ú

K–Ü™JK
NÙ›ÜŠ]OLNÙOÎÙJÊÊ^Û]O]Ó]WJ
NÛ–Ü—Kœ\Ú
JK–Ü™JJÙKJ___WÙÙ]ØØÝ\’[™›ÊJ^Û]Û˜[YNØØÝ\Ž›ŸOYNÚYŠ[Ÿ]
\™]\›–ÌKWNÛ][‹›X^OOKLOÌKÌ›‹›X^Ü™]\›–Û‹›Z[‹—_WÜÙ][™š[™
K
^Ý\Ë—ÜÙ]›Ü\Y\ÊK
K\Ë—Øš[™][\ÊK
K\Ë—Øš[™[[Y[
K
_WØš[™[[Y[
K
^Û]V×NÝ\Ë—ØÜ™X]SØØÝ\œ™[˜Ù\ÊJNÙ›ÜŠ]ˆÙˆVÜ]WJ
J^ÚYŠ–ÔWJXÛÛ[YNÚYŠ\Ë—ÛY\™ÙS[ÙOOO]›ÚY	‰œ–ÚOOOXÝX™›Ü›X
^Ý\Ë—ÛY\™ÙS[ÙO\‹›Y\™ÙS[ÙOOOXÛÛœÝ[YQ]XÛ]O]Ü]WJ
NÚYŠK›[™ÝŒ
]\Ë—Øš[™ØØÝ\œ™[˜Ù\Ê‹ÙVÌWK[
NÙ[ÙHYŠ\Ë™[\SY\™ÙJ^Û]O\–ÔWO[™]ÈÙŠÛYOOOQËLNÛYK‹›˜[Y_›ÛÝ
NÝÑWJJK\Ë—Øš[™[[Y[
‹J_XÛÛ[Y_ZYŠ\–ØYJ
JXÛÛ[YNÛ]OHLKO[[O[[Ï[[ÚYŠ‹˜š[™
^ÜÝÚ]Ú
‹˜š[™›X]Ú
^ØØ\ÙX›Û™X\Ë—ÜÙ][™š[™
‹
NØÛÛ[YNØØ\ÙXÛØ˜[™OHLØœ™XZÎØØ\ÙX]T™Y˜šYŠ\‹˜š[™œ™YŠ^ÐJHH™Yˆ\È[\H[ˆ›ÙH	Ü–Ú_K˜
K\Ë—ÜÙ][™š[™
‹
NØÛÛ[Y_XO\‹˜š[™œ™YŽØœ™XZÎÙY˜][˜œ™XZß\‹˜š[™œXÝ\™I‰ŠO\‹˜š[™œXÝ\™VÕ—J_[]ÜË×O]\Ë—ÙÙ]ØØÝ\’[™›ÊŠNÚYŠJZYŠÏ\ÙŠ\Ëœ›ÛÝKLLJKÏOO[[
^ÚYŠÏXÙŠ\Ë™]KJK[ÊXÛÛ[YNÝ\Ë—Ú\ÐÛÛœÝ[YQ]J
I‰ŠÖÓWOHL
K\Ë—ÜÙ][™š[™
‹ÊNØÛÛ[Y_Y[ÙH\Ë—Ú\ÐÛÛœÝ[YQ]J
I‰ŠÏ[Ë™š[\ŠOOˆYVÓWJJKË›[™Ý˜ÏÛÏ[ËœÛXÙJÊN›Ë›[™ÝOOL	‰ŠÏ[[
KÉ‰\Ë—Ú\ÐÛÛœÝ[YQ]J
I‰›Ë™›Ü‘XXÚ
OOžÙVÓWOHLJNÙ[Ù^ÚYŠ\‹›˜[YJ^Ý\Ë—ÜÙ][™š[™
‹
NØÛÛ[Y_ZYŠ\Ë—Ú\ÐÛÛœÝ[YQ]J
J^Û]V×NÙ›ÜŠÛ‹›[™ÝÎÊ^Û]O]\Ë—Ùš[™]PžS˜[YUÐÛÛœÝ[YJ‹›˜[YK–ÙYJ
KJNÚYŠZJXœ™XZÎÚVÓWOHL‹œ\Ú
J_[Ï[‹›[™ÝŒÛŽ›[Y[Ù^ÚYŠÏ]ÒÝWJ‹›˜[YKLK\Ë™[\SY\™ÙJK›™^

K˜[YK[Ê^ÚYŠÏOOL
^Û‹œ\Ú
ŠNØÛÛ[Y_[Ï\–ÔWO[™]ÈÙŠÛYOOOQËLNÛYK‹›˜[YJK\Ë™[\SY\™ÙI‰ŠÖÓWOHL
KÑWJÊK\Ë—ÜÙ][™š[™
‹ÊNØÛÛ[Y_]\Ë™[\SY\™ÙI‰ŠÖÓWOHL
KÏVÛ×__[ÏÝ\Ë—Øš[™ØØÝ\œ™[˜Ù\Ê‹ËJNœÏŒÝ\Ë—ÜÙ][™š[™
‹
N›‹œ\Ú
Š_[‹™›Ü‘XXÚ
OO™VÖWJ
VÐÙJJJ__KZXÛ\ÜÞØÛÛœÝXÝÜŠK
^Ý\Ë™]O]\Ë™]\Ù]YK™]\Ù]ß[\Ù\šX[^™JJ^Û]VÖËLK\Ë™]VÜ]WJ
WWNÙ›ÜŠÝ›[™ÝŒÊ^Û]]˜]
LJKÜ‹WO[ŽÚYŠŠÌOOOZK›[™Ý
^ÝœÜ

NØÛÛ[Y_[]OZVÊÊÛ–ÌWKÏYK™Ù]
VÑ™JNÚYŠÊXVÚÙJÊNÙ[Ù^Û]XVÞWJ
NÙ›ÜŠ]ˆÙˆ˜[Y\Ê
J^Û]YK™Ù]
–Ñ™JNÚYŠ
^Û–ÚÙJ
NØœ™XZß__[]ÏXVÜ]WJ
NÜË›[™ÝŒ	‰œ\Ú
ËLK×J_[]VØ˜N™]\Ù]È[œÎž˜OHš‹ËÝÝÝËž˜K›Ü™ËÜØÚ[XKÞ˜KY]KÌKŒÈ˜NÚYŠ\Ë™]\Ù]
Y›ÜŠ]HÙˆ\Ë™]\Ù]Ü]WJ
JYVÚHOOX]X	‰™VÓ™JŠNÜ™]\›ˆ\Ë™]VÓ™JŠK‹œ\Ú
Þ˜N™]\Ù]Ï˜
K‹š›Ú[Š
__NÛ]OS˜ÛÛ™šYËšYÝ˜\ˆšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKXÜ›Ø˜]L
K\Ë˜XÜ›Ø˜]Ï[[\Ë˜]]ÔØ]™O[[\Ë˜ÛÛ[[Û[[\Ë˜[Y]O[[\Ë˜[Y]P\›Ý˜[ÚYÛ˜]\™\Ï[[\ËœÝX›Z]\›[™]È__KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKXÜ›Ø˜]ØL
K\Ë™[˜[ZXÔ™[™\[[_KšXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKQ‘WÒ”ÐÛÛœÛÛXØ[YØ]X[˜X›X\ØX›XJ__KXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKQ‘WÒ”ÑXYÙÙ\˜Ø[YØ]X[˜X›X\ØX›XJ__KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYÚ[[š[
__KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYšY]Ù\”™Y™\™[˜Ù\Ø
__KXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKY\Ý]X
__KšXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYØ™Q^[œÚ[Û“]™[OO™OLI‰™ON
__KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYÙ[L
K\Ë›˜[YOYK›˜[YOÙK›˜[YKš[J
N˜\Ë˜ÛÛ[[Û[™]È__KšXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[Ø^\Ñ[X™Y
__KšXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[Y
__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\™XX
K\Ë›]™[UÊÙ]N™K›]™[Y˜][˜[YNŒ˜[Y]N™OO™OLI‰™OLßJK\Ë›˜[YOQÊK›˜[YKØ˜\˜ÛÙXÛÜ™Z[š]]šXÙQš]™\˜›ÛÙ[™\˜[^[Ý]Y\™ÙXØÜš\ÚYÛ˜]\™XÛÝ\˜ÙTÙ][\]PØXÚXJ__KZXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK]šX]\ØØ™\Ù\™X[YØ]XYÛ›Ü™XJ__KÚXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK]]ÔØ]™XØ\ØX›Y[˜X›YJ__KÚXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜\ÙX
__KÚXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜]ÚÝ]]
K\Ë™›Ü›X]QÊK™›Ü›X]Ø›Û™XÛÛ˜Ø]š\š\ÛÛ\™\ÜØJ__KZXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™Z]š[Ü“Ý™\œšYX
_VÒ]WJ
^Ý\ÖÕ—O[™]ÈX\
\ÖÕ—Kš[J
KœÜ]
×ÊËÊK™š[\ŠOO™Kš[˜ÛY\Ê˜
JK›X\
OO™KœÜ]
˜ŠJJ__KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØXÚXL
K\Ë[\]PØXÚO[[_KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÚ[™ÙX
__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ[[Û˜L
K\Ë™]O[[\Ë›ØØ[O[[\Ë›ØØ[TÙ][[\Ë›Y\ÜØYÚ[™Ï[[\ËœÝ\™\ÜÐ˜[›™\[[\Ë[\]O[[\Ë˜[Y][Û“Y\ÜØYÚ[™Ï[[\Ë™\œÚ[ÛÛÛ›Û[[\Ë›ÙÏ[™]È__KšXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ\™\ÜØ
K\ËœØÛÜOQÊKœØÛÜKØ[XYÙSÛ›XØÝ[Y[J__KZXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ\™\ÜÓÙÚXØ[ÝXÝ\™X
__K	XÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ\™\ÜÓØš™XÝÝ™X[X
__KYÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ\™\ÜÚ[Û˜L
K\Ë˜ÛÛ\™\ÜÓÙÚXØ[ÝXÝ\™O[[\Ë˜ÛÛ\™\ÜÓØš™XÝÝ™X[O[[\Ë›]™[[[\Ë\O[[_KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ™šYØL
K\Ë˜XÜ›Ø˜][[\Ëœ™\Ù[[[\Ë˜XÙO[[\Ë˜YÙ[[™]È__K™ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ™›Ü›X[˜ÙXØX˜J__K™ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÛ[ÛÜX
__KYÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛÜY\ØKOO™OLJ__KYÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÜ™X]Ü˜
__KÙÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ\œ™[YÙXOO™OL
__KÙÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK]XL
K\Ë˜Y\Ý]O[[\Ë˜]šX]\Ï[[\Ëš[˜Ü™[Y[[ØY[[\Ë›Ý]]Ó[[\Ëœ˜[™ÙO[[\Ëœ™XÛÜ™[[\ËœÝ\›ÙO[[\Ë\šO[[\ËÚ[™ÝÏ[[\ËžÛ[[\Ë™^ÛYS”Ï[™]ÈK\Ë˜[œÙ›Ü›O[™]È__KÙÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKXYØL
K\Ë\šO[[_KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKY˜][\Y˜XÙX
K\ËÜš][™ÔØÜš\QÊKÜš][™ÔØÜš\Ø
˜\˜XšXØÞ\š[XØX\Ý]\›ÜX[”›ÛX[˜Ü™YZØXœ™]Ø˜\[™\ÙXÛÜ™X[˜›ÛX[˜Ú[\YšYYÚ[™\ÙXZX˜Y][Û˜[Ú[™\ÙXšY]˜[Y\ÙXJ__KYÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\Ý[˜][Û˜Ø˜ÛØÙXÛY[œJ__KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØÝ[Y[\ÜÙ[X›X
__K™ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKš]™\˜L
K\Ë›˜[YOYK›˜[YOÙK›˜[YKš[J
N˜\Ë™›Û[™›Ï[[\ËžÏ[[_KÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\^Ü[Û˜ØÚ[\^\^›\Û™ÑYÙX\^›\ÚÜYÙXJ__KYÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[˜[ZXÔ™[™\˜Ø›Ü˜šY[˜™\]Z\™YJ__KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[X™Y
__KÙÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[˜Üž\
__KÙÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[˜Üž\[Û˜L
K\Ë™[˜Üž\[[\Ë™[˜Üž\[Û“]™[[[\Ëœ\›Z\ÜÚ[ÛœÏ[[_K™ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[˜Üž\[Û“]™[Øš]LŽš]J__KYÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[™›Ü˜ÙX
__K™ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\]X]X
K\Ë™›Ü˜ÙOUÊÙ]N™K™›Ü˜ÙKY˜][˜[YNŒK˜[Y]N™OO™OOOLJK\Ë™œ›ÛOYK™œ›Û_\ËÏYKß_KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\]X]T˜[™ÙX
K\Ë™œ›ÛOYK™œ›Û_\ËÏYKß\Ë—Ý[šXÛÙT˜[™ÙOYK[šXÛÙT˜[™Ù_YÙ][šXÛÙT˜[™ÙJ
^Û]OV×KKÕW
ÊÌNXKYKQ—JÊKË]\Ë—Ý[šXÛÙT˜[™ÙNÙ›ÜŠ]ˆÙˆ‹œÜ]

K›X\
OO™Kš[J
JK™š[\ŠOOˆHYJJ\\‹œÜ]
XŠK›X\
OOžÛ]YK›X]Ú

NÜ™]\›ˆÜ\œÙR[
–ÌWKMŠNŒJK‹›[™ÝOOLI‰œ‹œ\Ú
–ÌJKKœ\Ú
ŠNÜ™]\›ˆŠ\Ë[šXÛÙT˜[™ÙXJ__KÙÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK^ÛYX
_VÒ]WJ
^Ý\ÖÕ—O]\ÖÕ—Kš[J
KœÜ]
×ÊËÊK™š[\ŠOO™I‰–ØØ[Ý[]XÛÜÙX[\˜^][š]X[^™X™XYX˜[Y]XKš[˜ÛY\ÊJJ__KÙÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK^ÛYS”Ø
__KÙÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK›\X™[Ø\ÙTš[\”Ù][™ØÛ˜Ù™˜J__KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK›Û[™›ØL
K\Ë™[X™Y[[\Ë›X\[[\ËœÝXœÙ]™[ÝÏ[[\Ë˜[Ø^\Ñ[X™Y[™]ÈK\Ë™Y˜][\Y˜XÙO[™]ÈK\Ë›™]™\‘[X™Y[™]È__KYÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK›Ü›QšY[š[[™Ø
__KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÜ›Ý\\™[
__KÙÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKY‘[\XØ]U˜[YX]QÜ›Ý\YÛ›Ü™X™[[Ý™XJ__KÙÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[˜ÛYVÛÛ[
__KYÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[˜Ü™[Y[[ØYØ›Û™X›ÜØ\™Û›XJ__K™ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[˜Ü™[Y[[Y\™ÙX
__KYÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[\˜XÝ]™X
__K™ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK›ÙØØ\ÙTš[\”Ù][™Ø›Û™XYÙTÙ]J__KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKX™[š[\˜L
K\Ë›˜[YOQÊK›˜[YKØœ\ÜJK\Ë˜˜]ÚÝ]][[\Ë™›\X™[[[\Ë™›Û[™›Ï[[\ËžÏ[[_K™ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK^[Ý]ØYÚ[˜]X[™[J__KYÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK]™[OO™OŒ
__KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[™X\š^™Y
__K™ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØØ[X
__K™ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØØ[TÙ]
__K™ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÙØL
K\Ë›[ÙO[[\Ë™\ÚÛ[[\ËÏ[[\Ë\šO[[_K™ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKX\L
K\Ë™\]X]O[™]ÈK\Ë™\]X]T˜[™ÙO[™]È__KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYY][R[™›ØL
K\Ë›X\[[_KYÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKY\ÜØYÙXL
K\Ë›\ÙÒY[[\ËœÙ]™\š]O[[_KÙÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKY\ÜØYÚ[™ØL
K\Ë›Y\ÜØYÙO[™]È__KÙÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[ÙXØ\[™Ý™\Üš]XJ__KÙÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[ÙYžP[››ÝØ
__KYÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\ÙÒYKOO™OLJ__K™ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜[YP]˜
__KYÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™]™\‘[X™Y
__KÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[X™\“ÙÛÜY\Ø[OO™OL‰‰™OMJ__K™ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÜ[XÝ[Û˜L
K\Ë™\Ý[˜][Û[[_KYÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ]]L
K\ËÏ[[\Ë\O[[\Ë\šO[[_K	ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ]]š[˜
__KWÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ]]ÓL
K\Ë\šO[[_KÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ™\œš[Ø›Û™X›Ý˜]ØšY[J__K—ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKXÚÙ]Ø
_VÒ]WJ
^Ý\ÖÕ—HOOX
˜	‰Š\ÖÕ—O]\ÖÕ—Kš[J
KœÜ]
×ÊËÊK™š[\ŠOO–ØÛÛ™šYØ]\Ù]Ø[\]X™˜ÛKš[˜ÛY\ÊJJJ__K—ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYÙSÙ™œÙ]
K\ËžUÊÙ]N™KžY˜][˜[YN˜\ÙVÔÙ][™Ø˜[Y]N™OOˆLJK\ËžOUÊÙ]N™KžKY˜][˜[YN˜\ÙVÔÙ][™Ø˜[Y]N™OOˆLJ__KWÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYÙT˜[™ÙX
_VÒ]WJ
^Û]O]\ÖÕ—Kš[J
KœÜ]
×ÊËÊK›X\
OOœ\œÙR[
KL
JKV×NÙ›ÜŠ]LYK›[™ÝÛŽÛŠÏLŠ]œ\Ú
KœÛXÙJ‹ŠÌŠJNÝ\ÖÕ—O]_KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYÚ[˜][Û˜ØÚ[\^\^ÚÜYÙX\^Û™ÑYÙXJ__K×ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYÚ[˜][Û“Ý™\œšYXØ›Û™X›Ü˜ÙQ\^›Ü˜ÙQ\^Û™ÑYÙX›Ü˜ÙQ\^ÚÜYÙX›Ü˜ÙTÚ[\^J__K×ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\KOOˆLJ__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛL
K\Ë›˜[YOYK›˜[Y_\Ë˜˜]ÚÝ]][[\Ë™›Û[™›Ï[[\Ëš›ÙÏ[[\Ë›YY][R[™›Ï[[\Ë›Ý]]š[[[\ËœYÙSÙ™œÙ][[\ËœÝ\O[[\ËžÏ[[_KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜L
K\Ë›˜[YOYK›˜[Y_\Ë˜YØ™Q^[œÚ[Û“]™[[[\Ë˜˜]ÚÝ]][[\Ë˜ÛÛ\™\ÜÚ[Û[[\Ë˜Ü™X]Ü[[\Ë™[˜Üž\[Û[[\Ë™›Û[™›Ï[[\Ëš[\˜XÝ]™O[[\Ë›[™X\š^™Y[[\Ë›Ü[XÝ[Û[[\Ëœ˜O[[\Ëœ›ÙXÙ\[[\Ëœ™[™\”ÛXÞO[[\ËœØÜš\[Ù[[[\ËœÚ[[š[[[\ËœÝX›Z]›Ü›X][[\ËYÙÙY[[\Ë™\œÚ[Û[[\ËšY]Ù\”™Y™\™[˜Ù\Ï[[\ËžÏ[[_KWÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜XL
K\Ë˜[Y[[\Ë˜ÛÛ™›Ü›X[˜ÙO[[\Ëš[˜ÛYVÛÛ[[[\Ëœ\[[_KÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\›Z\ÜÚ[ÛœØL
K\Ë˜XØÙ\ÜÚX›PÛÛ[[[\Ë˜Ú[™ÙO[[\Ë˜ÛÛ[ÛÜO[[\Ë™ØÝ[Y[\ÜÙ[X›O[[\Ë™›Ü›QšY[š[[™Ï[[\Ë›[ÙYžP[››ÝÏ[[\ËœZ[^Y]Y]O[[\Ëœš[[[\Ëœš[YÚ]X[]O[[_K—ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKXÚÕ˜^PžT”Ú^™X
__KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKXÝ\™X
__KWÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKZ[^Y]Y]X
__KÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™\Ù[˜ÙXØ™\Ù\™X\ÜÛÛ™X\ÜÛÛ™TÝXÝ\™XYÛ›Ü™X™[[Ý™XJ__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™\Ù[L
K\Ë˜™Z]š[Ü“Ý™\œšYO[[\Ë˜ØXÚO[[\Ë˜ÛÛ[[Û[[\Ë˜ÛÜY\Ï[[\Ë™\Ý[˜][Û[[\Ëš[˜Ü™[Y[[Y\™ÙO[[\Ë›^[Ý][[\Ë›Ý]][[\Ë›Ý™\œš[[[\ËœYÚ[˜][Û[[\ËœYÚ[˜][Û“Ý™\œšYO[[\ËœØÜš\[[\Ë˜[Y]O[[\Ëž[[\Ë™š]™\[™]ÈK\Ë›X™[š[\[™]ÈK\ËœÛ[™]ÈK\Ëœ[™]ÈK\ËœÏ[™]ÈK\ËœÝX›Z]\›[™]ÈK\ËÙXÛY[[™]ÈK\Ëžœ[™]È__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKš[
__K—ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKš[YÚ]X[]X
__KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKš[ØØ[[™ØØ\Y˜][›ÔØØ[[™ØJ__K—ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKš[\“˜[YX
__KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK›ÙXÙ\˜
__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØL
K\Ë›˜[YOYK›˜[Y_\Ë˜˜]ÚÝ]][[\Ë™›Û[™›Ï[[\Ëš›ÙÏ[[\Ë›YY][R[™›Ï[[\Ë›Ý]]š[[[\ËœÝ\O[[\ËžÏ[[_K×ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜[™ÙX
_VÒ]WJ
^Ý\ÖÕ—O]\ÖÕ—KœÜ]
ŠK›X\
OO™KœÜ]
X
K›X\
OOœ\œÙR[
Kš[J
KL
JJK™š[\ŠOO™K™]™\žJOOˆZ\Ó˜SŠJJJK›X\
OOŠK›[™ÝOOLI‰™Kœ\Ú
VÌJKJJ__K×ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™XÛÜ™
_VÒ]WJ
^Ý\ÖÕ—O]\ÖÕ—Kš[J
NÛ]O\\œÙR[
\ÖÕ—KL
NÈZ\Ó˜SŠJI‰™OL	‰Š\ÖÕ—OYJ__KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™[]˜[
_VÒ]WJ
^Ý\ÖÕ—O]\ÖÕ—Kš[J
KœÜ]
×ÊËÊ__KWÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™[˜[YX
_VÒ]WJ
^Ý\ÖÕ—O]\ÖÕ—Kš[J
K
\ÖÕ—KÓÝÙ\Ø\ÙJ
KœÝ\ÕÚ]
[
_™YÑ^
×ÓW×V×ÓW—×Ó_KWJ˜X
K\Ý
\ÖÕ—JJI‰JHH™[˜[YNˆ[˜[YH˜[YX
__KÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™[™\”ÛXÞXØÙ\™\˜ÛY[J__K×ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[”ØÜš\ØØ›ÝÛY[›Û™XÙ\™\˜J__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØÜš\L
K\Ë˜Ý\œ™[YÙO[[\Ë™^ÛYO[[\Ëœ[”ØÜš\Ï[[_KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØÜš\[Ù[ØX›Û™XJ__K—ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÙ]™\š]XØYÛ›Ü™X\œ›Ü˜[™›Ü›X][Û˜˜XÙXØ\›š[™ØJ__KWÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÚ[[š[L
K\Ë˜YÚ[[š[[[\Ëœš[\“˜[YO[[_K—ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ\X
K\Ë›[ÙOQÊK›[ÙKØ\ÙTš[\”Ù][™ØÛ˜Ù™˜J__KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ\›ÙX
__K—ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ\YÙXOOˆL
__KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝX›Z]›Ü›X]Ø[[YØ]X™˜[˜J__KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝX›Z]\›
__K—ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝXœÙ]™[ÝØLOO™OL	‰™OLL
__K—ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ\™\ÜÐ˜[›™\˜
__K—ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKYÙÙY
__K—ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[\]XL
K\Ë˜˜\ÙO[[\Ëœ™[]˜[[[\ËœÝ\YÙO[[\Ë\šO[[\ËžÛ[[_KÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™\ÚÛØ˜XÙX\œ›Ü˜[™›Ü›X][Û˜Ø\›š[™ØJ__KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØØ[Y[[ÜžXÝ\œ˜ÝÝ]Þ\Ý[X\šXJ__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[\]PØXÚX
K\Ë›X^[šY\ÏUÊÙ]N™K›X^[šY\ËY˜][˜[YNK˜[Y]N™OO™OLJ__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜XÙXL
K\Ë˜\™XO[™]È__K×ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜[œÙ›Ü›XL
K\Ë™Ü›Ý\\™[[[\ËšY‘[\O[[\Ë›˜[YP][[\ËœXÝ\™O[[\Ëœ™\Ù[˜ÙO[[\Ëœ™[˜[YO[[\ËÚ]\ÜXÙO[[_KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\XØ›Û™X\ØÚZNX\ØÚZR^ØÚ]˜^›]XØ[“[™Ý˜]]™XY\™ÙYJ__K—ÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK\šX
__KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜[Y]XØ™TÝX›Z]™Tš[™Q^XÝ]X™TØ]™XJ__KÏXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜[Y]P\›Ý˜[ÚYÛ˜]\™\Ø
_VÒ]WJ
^Ý\ÖÕ—O]\ÖÕ—Kš[J
KœÜ]
×ÊËÊK™š[\ŠOO–ØØÔ™XYXÜÝÚYÛ˜Kš[˜ÛY\ÊJJ__K—ÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜[Y][Û“Y\ÜØYÚ[™ØØ[Y\ÜØYÙ\Ò[™]šYX[X[Y\ÜØYÙ\ÕÙÙ]\˜š\œÝY\ÜØYÙSÛ›X›ÓY\ÜØYÙ\ØJ__KWÏXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™\œÚ[Û˜ØKØK˜KXKKŒØKŒ˜J__K	ÏXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK™\œÚ[ÛÛÛ›Û
K\Ë›Ý]]™[ÝÏQÊK›Ý]]™[ÝËØØ\›˜\œ›Ü˜\]XJK\ËœÛÝ\˜ÙPX›Ý™OQÊKœÛÝ\˜ÙPX›Ý™KØØ\›˜\œ›Ü˜JK\ËœÛÝ\˜ÙP™[ÝÏQÊKœÛÝ\˜ÙP™[ÝËØ\]XXZ[Z[˜J__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKšY]Ù\”™Y™\™[˜Ù\ØL
K\ËQ‘WÒ”ÐÛÛœÛÛO[[\ËQ‘WÒ”ÑXYÙÙ\[[\Ë˜YšY]Ù\”™Y™\™[˜Ù\Ï[[\Ë™\^Ü[Û[[\Ë™[™›Ü˜ÙO[[\Ë›[X™\“ÙÛÜY\Ï[[\ËœYÙT˜[™ÙO[[\ËœXÚÕ˜^PžT”Ú^™O[[\Ëœš[ØØ[[™Ï[[_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÙXÛY[L
K\Ë›˜[YOYK›˜[YOÙK›˜[YKš[J
N˜\Ë™›Û[™›Ï[[\ËžÏ[[_KXÛ\ÜÈ^[™È™žØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÚ]\ÜXÙXØ™\Ù\™Xš[X›Ü›X[^™Xš[Xš[XJ__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÚ[™ÝØ
_VÒ]WJ
^Û]O]\ÖÕ—KœÜ]
ŠK›X\
OOœ\œÙR[
Kš[J
KL
JNÚYŠKœÛÛYJOOš\Ó˜SŠJJJ^Ý\ÖÕ—OVÌNÜ™]\›ŸYK›[™ÝOOLI‰™Kœ\Ú
VÌJK\ÖÕ—OY__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKØL
K\Ë\šO[™]ÈK\ËžÛ[™]È__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKL
K\ËœXÚÙ]Ï[[_KÝXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛL
K\Ë™XYÏ[[\Ë\šO[[_KÝXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKœL
K\Ë›˜[YOYK›˜[YOÙK›˜[YKš[J
N˜\Ë˜˜]ÚÝ]][[\Ë™›\X™[[[\Ë™›Û[™›Ï[[\ËžÏ[[_KÝXÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈXÜ›Ø˜]
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈXÜ›Ø˜]ÊJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈQ‘WÒ”ÐÛÛœÛÛJJ^Ü™]\›ˆ™]Èš
J_\Ý]XÈQ‘WÒ”ÑXYÙÙ\ŠJ^Ü™]\›ˆ™]È
J_\Ý]XÈYÚ[[š[
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈYšY]Ù\”™Y™\™[˜Ù\ÊJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈY\Ý]JJ^Ü™]\›ˆ™]È
J_\Ý]XÈYØ™Q^[œÚ[Û“]™[
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈYÙ[
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈ[Ø^\Ñ[X™Y
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈ[Y
J^Ü™]\›ˆ™]Èš
J_\Ý]XÈ\™XJJ^Ü™]\›ˆ™]È
J_\Ý]XÈ]šX]\ÊJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈ]]ÔØ]™JJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ˜\ÙJJ^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ˜]ÚÝ]]
J^Ü™]\›ˆ™]ÈÚ
J_\Ý]XÈ™Z]š[Ü“Ý™\œšYJJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈØXÚJJ^Ü™]\›ˆ™]Èš
J_\Ý]XÈÚ[™ÙJJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈÛÛ[[ÛŠJ^Ü™]\›ˆ™]È
J_\Ý]XÈÛÛ\™\ÜÊJ^Ü™]\›ˆ™]Èš
J_\Ý]XÈÛÛ\™\ÜÓÙÚXØ[ÝXÝ\™JJ^Ü™]\›ˆ™]ÈZ
J_\Ý]XÈÛÛ\™\ÜÓØš™XÝÝ™X[JJ^Ü™]\›ˆ™]È	
J_\Ý]XÈÛÛ\™\ÜÚ[ÛŠJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈÛÛ™šYÊJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈÛÛ™›Ü›X[˜ÙJJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈÛÛ[ÛÜJJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈÛÜY\ÊJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈÜ™X]ÜŠJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈÝ\œ™[YÙJJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ]JJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈXYÊJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈY˜][\Y˜XÙJJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ\Ý[˜][ÛŠJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈØÝ[Y[\ÜÙ[X›JJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈš]™\ŠJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈ\^Ü[ÛŠJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ[˜[ZXÔ™[™\ŠJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈ[X™Y
J^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ[˜Üž\
J^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ[˜Üž\[ÛŠJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ[˜Üž\[Û“]™[
J^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈ[™›Ü˜ÙJJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈ\]X]JJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈ\]X]T˜[™ÙJJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ^ÛYJJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ^ÛYS”ÊJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ›\X™[
J^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ›Û[™›ÊJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ›Ü›QšY[š[[™ÊJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈÜ›Ý\\™[
J^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈY‘[\JJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ[˜ÛYVÛÛ[
J^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ[˜Ü™[Y[[ØY
J^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈ[˜Ü™[Y[[Y\™ÙJJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈ[\˜XÝ]™JJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈ›ÙÊJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈX™[š[\ŠJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ^[Ý]
J^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈ]™[
J^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈ[™X\š^™Y
J^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈØØ[JJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈØØ[TÙ]
J^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈÙÊJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈX\
J^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈYY][R[™›ÊJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈY\ÜØYÙJJ^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈY\ÜØYÚ[™ÊJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ[ÙJJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ[ÙYžP[››ÝÊJ^Ü™]\›ˆ™]ÈÙÊJ_\Ý]XÈ\ÙÒY
J^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈ˜[YP]ŠJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈ™]™\‘[X™Y
J^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈ[X™\“ÙÛÜY\ÊJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈÜ[XÝ[ÛŠJ^Ü™]\›ˆ™]È™ÊJ_\Ý]XÈÝ]]
J^Ü™]\›ˆ™]ÈYÊJ_\Ý]XÈÝ]]š[ŠJ^Ü™]\›ˆ™]È	ÊJ_\Ý]XÈÝ]]Ó
J^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈÝ™\œš[
J^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈXÚÙ]ÊJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈYÙSÙ™œÙ]
J^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈYÙT˜[™ÙJJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈYÚ[˜][ÛŠJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈYÚ[˜][Û“Ý™\œšYJJ^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈ\
J^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈÛ
J^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈŠJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ˜JJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈ\›Z\ÜÚ[ÛœÊJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈXÚÕ˜^PžT”Ú^™JJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈXÝ\™JJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈZ[^Y]Y]JJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈ™\Ù[˜ÙJJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ™\Ù[
J^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈš[
J^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈš[YÚ]X[]JJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈš[ØØ[[™ÊJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈš[\“˜[YJJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈ›ÙXÙ\ŠJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈÊJ^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈ˜[™ÙJJ^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈ™XÛÜ™
J^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈ™[]˜[
J^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ™[˜[YJJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈ™[™\”ÛXÞJJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ[”ØÜš\ÊJ^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈØÜš\
J^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈØÜš\[Ù[
J^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈÙ]™\š]JJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈÚ[[š[
J^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈÝ\JJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈÝ\›ÙJJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈÝ\YÙJJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈÝX›Z]›Ü›X]
J^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈÝX›Z]\›
J^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈÝXœÙ]™[ÝÊJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈÝ\™\ÜÐ˜[›™\ŠJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈYÙÙY
J^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈ[\]JJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈ[\]PØXÚJJ^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈ™\ÚÛ
J^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈÊJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈ˜XÙJJ^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈ˜[œÙ›Ü›JJ^Ü™]\›ˆ™]È×ÊJ_\Ý]XÈ\JJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈ\šJJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈ˜[Y]JJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈ˜[Y]P\›Ý˜[ÚYÛ˜]\™\ÊJ^Ü™]\›ˆ™]ÈÊJ_\Ý]XÈ˜[Y][Û“Y\ÜØYÚ[™ÊJ^Ü™]\›ˆ™]È—ÊJ_\Ý]XÈ™\œÚ[ÛŠJ^Ü™]\›ˆ™]ÈWÊJ_\Ý]XÈ™\œÚ[ÛÛÛ›Û
J^Ü™]\›ˆ™]È	ÊJ_\Ý]XÈšY]Ù\”™Y™\™[˜Ù\ÊJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈÙXÛY[
J^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈÚ]\ÜXÙJJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈÚ[™ÝÊJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈÊJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ
J^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈÛ
J^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈœ
J^Ü™]\›ˆ™]ÈÝŠJ__NÛ]S˜ÛÛ›™XÝ[Û”Ù]šYÝ˜\ˆ]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛÛ›™XÝ[Û”Ù]L
K\ËÜÙÛÛ›™XÝ[Û[™]ÈK\Ëž[ÛÛ›™XÝ[Û[™]ÈK\ËžÙÛÛ›™XÝ[Û[™]È__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Y™™XÝ]™R[œ]ÛXÞX
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Y™™XÝ]™SÝ]]ÛXÞX
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ü\˜][Û˜
K\ËšYYKšY\Ëš[œ]YKš[œ]\Ë›˜[YOYK›˜[Y_\Ë›Ý]]YK›Ý]]\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K]XÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹›ÛÝ[[Y[
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛØ\XÝ[Û˜
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KÝXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÛØ\Y™\ÜØ
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KÝXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\šX
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÜÙY™\ÜØ
K\ËšYYKšY\Ë›˜[YOYK›˜[Y_\Ë\ÙOYK\Ù_\Ë\ÙZ™YYK\ÙZ™YŸ_K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÜÙÛÛ›™XÝ[Û˜L
K\Ë™]Q\ØÜš\[ÛYK™]Q\ØÜš\[ÛŸ\Ë›˜[YOYK›˜[Y_\Ë™Y™™XÝ]™R[œ]ÛXÞO[[\Ë™Y™™XÝ]™SÝ]]ÛXÞO[[\Ë›Ü\˜][Û[[\ËœÛØ\XÝ[Û[[\ËœÛØ\Y™\ÜÏ[[\ËÜÙY™\ÜÏ[[_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[ÛÛ›™XÝ[Û˜L
K\Ë™]Q\ØÜš\[ÛYK™]Q\ØÜš\[ÛŸ\Ë›˜[YOYK›˜[Y_\Ë\šO[[_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ÙÛÛ›™XÝ[Û˜L
K\Ë™]Q\ØÜš\[ÛYK™]Q\ØÜš\[ÛŸ\Ë›˜[YOYK›˜[Y_\Ëœ›ÛÝ[[Y[[[\Ë\šO[[_KÝXÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈÛÛ›™XÝ[Û”Ù]
J^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈY™™XÝ]™R[œ]ÛXÞJJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈY™™XÝ]™SÝ]]ÛXÞJJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈÜ\˜][ÛŠJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ›ÛÝ[[Y[
J^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈÛØ\XÝ[ÛŠJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈÛØ\Y™\ÜÊJ^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈ\šJJ^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈÜÙY™\ÜÊJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈÜÙÛÛ›™XÝ[ÛŠJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ[ÛÛ›™XÝ[ÛŠJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈÙÛÛ›™XÝ[ÛŠJ^Ü™]\›ˆ™]ÈŠJ__NÛ]ÝS™]\Ù]ËšYÝ˜\ˆÝXÛ\ÜÈ^[™ÈÙžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠÝ‹]XJ_VØÙJ
^Ü™]\›ˆL_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠÝ‹]\Ù]ØL
K\Ë™]O[[\Ë”ÚYÛ˜]\™O[[V×ÙJJ^Û]YVÚNÊOOX]X	‰™VÛYOOOPÝŸOOXÚYÛ˜]\™X	‰™VÛYOOOSœÚYÛ˜]\™KšY
I‰Š\ÖÝOYJK\ÖÑWJJ__K]XÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈ]\Ù]ÊJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ]JJ^Ü™]\›ˆ™]ÈÝŠJ__NÛ]S›ØØ[TÙ]šYÝ˜\ˆÝXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ø[[™\”Þ[X›ÛØL
K\Ë›˜[YOXÜ™YÛÜšX[˜\Ë™^S˜[Y\Ï[™]ÈJŠK\Ë™\˜S˜[Y\Ï[[\Ë›Y\šYY[S˜[Y\Ï[[\Ë›[Û˜[Y\Ï[™]ÈJŠ__KÝXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ý\œ™[˜ÞTÞ[X›Û
K\Ë›˜[YOQÊK›˜[YKØÞ[X›Û\ÛÛ˜[YXXÚ[X[J__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Ý\œ™[˜ÞTÞ[X›ÛØL
K\Ë˜Ý\œ™[˜ÞTÞ[X›Û[™]ÈJÊ__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]T]\›˜
K\Ë›˜[YOQÊK›˜[YKØ[Û™ØYYÚÜJ__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]T]\›œØL
K\Ë™]T]\›[™]ÈJ
__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹]U[YTÞ[X›ÛØ
__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^X
__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹^S˜[Y\ØL
K\Ë˜X˜œUÊÙ]N™K˜X˜œ‹Y˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë™^O[™]ÈJÊ__K]XÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\˜X
__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\˜S˜[Y\ØL
K\Ë™\˜O[™]ÈJŠ__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ØØ[XL
K\Ë™\ØÏYK™\Øß\Ë›˜[YOX\ÛÛ˜[YX\Ë˜Ø[[™\”Þ[X›ÛÏ[[\Ë˜Ý\œ™[˜ÞTÞ[X›ÛÏ[[\Ë™]T]\›œÏ[[\Ë™]U[YTÞ[X›ÛÏ[[\Ë›[X™\”]\›œÏ[[\Ë›[X™\”Þ[X›ÛÏ[[\Ë[YT]\›œÏ[[\Ë\Q˜XÙ\Ï[[_KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹ØØ[TÙ]L
K\Ë›ØØ[O[™]È__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Y\šYY[X
__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹Y\šYY[S˜[Y\ØL
K\Ë›Y\šYY[O[™]ÈJŠ__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[Û
__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[Û˜[Y\ØL
K\Ë˜X˜œUÊÙ]N™K˜X˜œ‹Y˜][˜[YNŒ˜[Y]N™OO™OOOL_JK\Ë›[Û[™]ÈJLŠ__KÝXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[X™\”]\›˜
K\Ë›˜[YOQÊK›˜[YKØ[Û™ØYYÚÜJ__KÝXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[X™\”]\›œØL
K\Ë›[X™\”]\›[™]ÈJ
__KÝXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[X™\”Þ[X›Û
K\Ë›˜[YOQÊK›˜[YKØXÚ[X[Ü›Ý\[™Ø\˜Ù[Z[\Ø™\›ØJ__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[X™\”Þ[X›ÛØL
K\Ë›[X™\”Þ[X›Û[™]ÈJJ__KXÛ\ÜÈ^[™ÈYžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[YT]\›˜
K\Ë›˜[YOQÊK›˜[YKØ[Û™ØYYÚÜJ__K]XÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹[YT]\›œØL
K\Ë[YT]\›[™]ÈJ
__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\Q˜XÙXL
K\Ë›˜[YOYK›˜[Y__KXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š‹\Q˜XÙ\ØL
K\Ë\Q˜XÙO[™]È__K]XÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈØ[[™\”Þ[X›ÛÊJ^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈÝ\œ™[˜ÞTÞ[X›Û
J^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈÝ\œ™[˜ÞTÞ[X›ÛÊJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ]T]\›ŠJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ]T]\›œÊJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ]U[YTÞ[X›ÛÊJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ^JJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ^S˜[Y\ÊJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ\˜JJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ\˜S˜[Y\ÊJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈØØ[JJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈØØ[TÙ]
J^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈY\šYY[JJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈY\šYY[S˜[Y\ÊJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ[Û
J^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ[Û˜[Y\ÊJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ[X™\”]\›ŠJ^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈ[X™\”]\›œÊJ^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈ[X™\”Þ[X›Û
J^Ü™]\›ˆ™]ÈÝŠJ_\Ý]XÈ[X™\”Þ[X›ÛÊJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ[YT]\›ŠJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ[YT]\›œÊJ^Ü™]\›ˆ™]È]ŠJ_\Ý]XÈ\Q˜XÙJJ^Ü™]\›ˆ™]ÈŠJ_\Ý]XÈ\Q˜XÙ\ÊJ^Ü™]\›ˆ™]ÈŠJ__NÛ]	SœÚYÛ˜]\™KšYÝ˜\ˆ^OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š	‹ÚYÛ˜]\™XL
__KOXÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈÚYÛ˜]\™JJ^Ü™]\›ˆ™]È^JJ__NÛ]žOSœÝ[\ÚY]šYÝ˜\ˆžOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠžKÝ[\ÚY]L
__K^OXÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈÝ[\ÚY]
J^Ü™]\›ˆ™]ÈžJJ__NÛ]^OSžšYÝ˜\ˆÞOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\Š^KL
K\Ë]ZYYK]ZY\Ë[YTÝ[\YK[YTÝ[\\Ë˜ÛÛ™šYÏ[[\Ë˜ÛÛ›™XÝ[Û”Ù][[\Ë™]\Ù]Ï[[\Ë›ØØ[TÙ][[\ËœÝ[\ÚY][™]ÈK\Ë[\]O[[VÝ™JJ^Û]SÙVÚWNÜ™]\›ˆ	‰™VÛYOOO]šY_KÞOXÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈ
J^Ü™]\›ˆ™]ÈÞJJ__NÛ]ÞOSž[šYOTÞ[X›Û

K^O[™]ÈÙ]
ÛÛÜ‹™›Û™›ÛY˜[Z[K™›Û\Ú^™K™›Û\Ý™]Ú™›Û\Ý[K™›Û]ÙZYÚ›X\™Ú[‹›X\™Ú[‹X›ÝÛK›X\™Ú[‹[Y›X\™Ú[‹\šYÚ›X\™Ú[‹]Ü›]\‹\ÜXÚ[™Ë›[™KZZYÚ›Üœ[œËœYÙKXœ™XZËXY\‹œYÙKXœ™XZËX™Y›Ü™KœYÙKXœ™XZËZ[œÚYKX‹Z[\˜[X‹\ÝÜ^X[YÛ‹^YXÛÜ˜][Û‹^Z[™[™\XØ[X[YÛ‹ÚYÝÜËšÙ\›š[™Ë[[ÙKž˜KY›ÛZÜš^›Û[\ØØ[Kž˜KY›Û]™\XØ[\ØØ[Kž˜K\ÜXÙ\[‹ž˜K]X‹\ÝÜØœÜ]
˜
JKO[™]ÈX\
ÖØYÙKXœ™XZËXY\˜œ™XZÐY\˜KØYÙKXœ™XZËX™Y›Ü™Xœ™XZÐ™Y›Ü™XKØYÙKXœ™XZËZ[œÚYXœ™XZÒ[œÚYXKØÙ\›š[™Ë[[ÙXOO™OOOX›Û™XØ›Û™X˜›Ü›X[KØ˜KY›ÛZÜš^›Û[\ØØ[XOO˜ØØ[V
	ÓX]›X^
\œÙR[
JKÌL
KÑš^Y
Š_JXKØ˜KY›Û]™\XØ[\ØØ[XOO˜ØØ[VJ	ÓX]›X^
\œÙR[
JKÌL
KÑš^Y
Š_JXKØ˜K\ÜXÙ\[˜KØ˜K]X‹\ÝÜØKØ›Û\Ú^™X
K
OOŠO]™›ÛÚ^™OSX]˜XœÊÊJJK
ŽNJ™JJWKØ]\‹\ÜXÚ[™ØOO–
ÊJJWKØ[™KZZYÚOO–
ÊJJWKØX\™Ú[˜OO–
ÊJJWKØX\™Ú[‹X›ÝÛXOO–
ÊJJWKØX\™Ú[‹[YOO–
ÊJJWKØX\™Ú[‹\šYÚOO–
ÊJJWKØX\™Ú[‹]ÜOO–
ÊJJWKØ^Z[™[OO–
ÊJJWKØ›ÛY˜[Z[XOO™WKØ™\XØ[X[YÛ˜OO–
ÊJJWWJKžOK×ÊËÙËOKÖ×——JËÙË^OK×—ËÙÎÙ[˜Ý[ÛˆJKŠ^Û]SØš™XÝ˜Ü™X]J[
NÚYŠYJ\™]\›ˆŽÛ]OSØš™XÝ˜Ü™X]J[
NÙ›ÜŠ]Ý—[ÙˆKœÜ]
Ø
K›X\
OO™KœÜ]
˜ŠJJ^Û]OYK™Ù]

NÚYŠOOOX
XÛÛ[YNÛ]O[ŽÙI‰ŠO]\[ÙˆOOXÝš[™ØÙN™J‹JJK™[™ÕÚ]
ØØ[X
OÜ‹˜[œÙ›Ü›O\‹˜[œÙ›Ü›OØ	Ü–Ý_H	Ø_X˜Nœ–Ýœ™\XÙP[
ËJØK^KV—JKÙË
K
OOÕ\\Ø\ÙJ
JWOX_ZYŠ‹™›Û˜[Z[I‰–ŠÝ\Y˜XÙNœ‹™›Û˜[Z[KÙZYÚœ‹™›ÛÙZYÚ›Ü›X[ÜÝ\™Nœ‹™›ÛÝ[_›Ü›X[Ú^™NšK™›ÛÚ^™_KÉWK™›Ûš[™\‹ŠK‰‰œ‹™\XØ[[YÛ‰‰œ‹™\XØ[[YÛˆOOX	‰œ‹™›ÛÚ^™J^Û]ORÊ‹™›ÛÚ^™JNÜ‹™›ÛÚ^™OV
J‹NÊK‹™\XØ[[YÛV
X]œÚYÛŠÊ‹™\XØ[[YÛŠJJ™J‹ŒÌÌÊ_\™]\›ˆ‰‰œ‹™›ÛÚ^™I‰Š‹™›ÛÚ^™OXØ[Ê	Ü‹™›ÛÚ^™_H
ˆ˜\ŠK]Ý[\ØØ[KY˜XÝÜŠJX
KÙŠŠKŸY[˜Ý[ÛˆÞJJ^Ü™]\›ˆKœÝ[OÙKœÝ[KœÜ]
Ø
K™š[\ŠOOˆHYKš[J
JK›X\
OO™KœÜ]
˜ŠK›X\
OO™Kš[J
JJK™š[\Š
Ý—JOOŠOOX›ÛY˜[Z[X	‰™VÉWK\ÙY\Y˜XÙ\Ë˜Y
ŠK^Kš\Ê
JJK›X\
OO™Kš›Ú[Š˜
JKš›Ú[ŠØ
N˜[]ÞO[™]ÈÙ]
Ø›ÙX[JNÝ˜\ˆžOXÛ\ÜÈ^[™ÈÙžØÛÛœÝXÝÜŠK
^ÜÝ\\ŠÞK
K\ÖÛWOHLK\ËœÝ[OYKœÝ[_VÚÝWJJ^ÜÝ\\–ÚÝWJJK\ËœÝ[OYÞJ\Ê_VÕWJ
^Ü™]\›ˆWÞKš\Ê\ÖÚJ_VÞYJKHLJ^ÝÝ\ÖÛWOHLŠOYKœ™\XÙP[
K
K\ËœÝ[Kš[˜ÛY\Ê˜K\ÜXÙ\[ŽžY\Ø
_
OYKœ™\XÙP[
žK
JJKI‰Š\ÖÕ—JÏYJ_VØ™JKHL
^Û]SØš™XÝ˜Ü™X]J[
K^ÝÜ“˜S‹›ÝÛN“˜S‹Y“˜S‹šYÚ“˜SŸKO[[Ù›ÜŠ]ÙK[Ùˆ\ËœÝ[KœÜ]
Ø
K›X\
OO™KœÜ]
˜ŠJJ\ÝÚ]Ú
J^ØØ\ÙX›ÛY˜[Z[X›‹\Y˜XÙOP™

NØœ™XZÎØØ\ÙX›Û\Ú^™X›‹œÚ^™ORÊ
NØœ™XZÎØØ\ÙX›Û]ÙZYÚ›‹ÙZYÚ]Øœ™XZÎØØ\ÙX›Û\Ý[X›‹œÜÝ\™O]Øœ™XZÎØØ\ÙX]\‹\ÜXÚ[™Ø›‹›]\”ÜXÚ[™ÏRÊ
NØœ™XZÎØØ\ÙXX\™Ú[˜›]O]œÜ]
ÈÊK›X\
OO’ÊJJNÜÝÚ]Ú
K›[™Ý
^ØØ\ÙHNœ‹Ü\‹˜›ÝÛO\‹›Y\‹œšYÚYVÌNØœ™XZÎØØ\ÙHŽœ‹Ü\‹˜›ÝÛOYVÌK‹›Y\‹œšYÚYVÌWNØœ™XZÎØØ\ÙHÎœ‹ÜYVÌK‹˜›ÝÛOYVÌ—K‹›Y\‹œšYÚYVÌWNØœ™XZÎØØ\ÙHœ‹ÜYVÌK‹›YYVÌWK‹˜›ÝÛOYVÌ—K‹œšYÚYVÌ×NØœ™XZßXœ™XZÎØØ\ÙXX\™Ú[‹]Üœ‹ÜRÊ
NØœ™XZÎØØ\ÙXX\™Ú[‹X›ÝÛXœ‹˜›ÝÛORÊ
NØœ™XZÎØØ\ÙXX\™Ú[‹[Yœ‹›YRÊ
NØœ™XZÎØØ\ÙXX\™Ú[‹\šYÚœ‹œšYÚRÊ
NØœ™XZÎØØ\ÙX[™KZZYÚšORÊ
NØœ™XZßZYŠKœ\Ú]J‹‹JK\ÖÕ—JYK˜YÝš[™Ê\ÖÕ—JNÙ[ÙH›ÜŠ]Ùˆ\ÖÜ]WJ
J^ÚYŠÚOOOXÝ^
^ÙK˜YÝš[™ÊÕ—JNØÛÛ[Y_]Ø™JJ_]	‰™KœÜ›Û

_VÕWJJ^Û]V×NÚYŠ\ÖÒO^ØÚ[™[ŽK\ÖÓÝWJßJK›[™ÝOOL	‰ˆ]\ÖÕ—J\™]\›ˆK‘STNÛ]ŽÜ™]\›ˆ]\ÖÛWOÝ\ÖÕ—OÝ\ÖÕ—Kœ™\XÙP[
^K˜
N›ÚY\ÖÕ—_›ÚYKœÝXØÙ\ÜÊÛ˜[YN\ÖÚK]šX]\ÎžÚ™YŽ\Ëš™Y‹Ý[NšJ\ËœÝ[K\Ë\ÖÛWJ_KÚ[™[Ž˜[YN›ŸJ__K^OXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKX
K\Ëš™YV™ŠKš™YŠ__KžOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK˜
_VØ™JJ^ÙKœ\Ú›Û
ÝÙZYÚ˜›ÛJKÝ\\–Ø™JJKKœÜ›Û

__KOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK›ÙX
_VÕWJJ^Û]\Ý\\–ÕWJJKÚ[›ŸO]Ü™]\›ˆÊ‹›˜[YOX]˜‹˜]šX]\Ë˜Û\ÜÏVØ˜TšXÚK
NœK‘ST__KÞOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKœ˜
_VÚ™J
^Ü™]\›˜˜VØ™JJ^ÙK˜YÝš[™Ê˜
_VÕWJJ^Ü™]\›ˆKœÝXØÙ\ÜÊÛ˜[YN˜œ˜J__KÞOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[
_VÕWJJ^Û]V×NÚYŠ\ÖÒO^ØÚ[™[ŽK\ÖÓÝWJßJK›[™ÝOOL
\™]\›ˆKœÝXØÙ\ÜÊÛ˜[YN˜]˜]šX]\ÎžØÛ\ÜÎ–Ø˜TšXÚKÝ[Nžß_K˜[YN\ÖÕ—_JNÚYŠ›[™ÝOOLJ^Û]O]ÌNÚYŠK˜]šX]\ÏË˜Û\ÜËš[˜ÛY\Ê˜TšXÚ
J\™]\›ˆKœÝXØÙ\ÜÊJ_\™]\›ˆKœÝXØÙ\ÜÊÛ˜[YN˜]˜]šX]\ÎžØÛ\ÜÎ–Ø˜TšXÚKÝ[Nžß_KÚ[™[ŽJ__KÞOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKX
_VØ™JJ^ÙKœ\Ú›Û
ÜÜÝ\™N˜][XØJKÝ\\–Ø™JJKKœÜ›Û

__KOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKX
__K^OXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÛ
__KOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK
_VØ™JJ^ÜÝ\\–Ø™JKLJKK˜YÝš[™Ê˜
KK˜Y\˜J
KKœÜ›Û

_VÚ™J
^Ü™]\›ˆ\ÖÖWJ
VÜ]WJ
K˜]
LJOOO]\ÏÜÝ\\–Ú™J
NœÝ\\–Ú™J
JØ˜_KÞOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÜ[˜
__KÞOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝX˜
__K^OXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠKÝ\
__KžOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠK[
__K^OXÛ\ÜÈ^ÜÝ]XÖÒYJŠ^ÚYŠKš\ÓÝÛ”›Ü\J
J\™]\›ˆVÝJŠ_\Ý]XÈJJ^Ü™]\›ˆ™]È^JJ_\Ý]XÈŠJ^Ü™]\›ˆ™]ÈžJJ_\Ý]XÈ›ÙJJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈœŠJ^Ü™]\›ˆ™]ÈÞJJ_\Ý]XÈ[
J^Ü™]\›ˆ™]ÈÞJJ_\Ý]XÈJJ^Ü™]\›ˆ™]ÈÞJJ_\Ý]XÈJJ^Ü™]\›ˆ™]ÈJJ_\Ý]XÈÛ
J^Ü™]\›ˆ™]È^JJ_\Ý]XÈ
J^Ü™]\›ˆ™]ÈJJ_\Ý]XÈÜ[ŠJ^Ü™]\›ˆ™]ÈÞJJ_\Ý]XÈÝXŠJ^Ü™]\›ˆ™]ÈÞJJ_\Ý]XÈÝ\
J^Ü™]\›ˆ™]È^JJ_\Ý]XÈ[
J^Ü™]\›ˆ™]ÈžJJ__NÛ]žO^ØÛÛ™šYÎ˜Ý‹ÛÛ›™XÝ[ÛŽ”Ý‹]\Ù]Î‘]‹ØØ[TÙ]”]‹ÚYÛ˜]\™NKÝ[\ÚY]š^K[\]N‘ZœÞK[“^_NÝ˜\ˆOXÛ\ÜÞØÛÛœÝXÝÜŠJ^Ý\Ë›˜[Y\ÜXÙRYY_VÒYJK
^Ü™]\›ˆ™]ÈÙŠ\Ë›˜[Y\ÜXÙRYK
__KžOXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠLK›ÛÝØš™XÝ˜Ü™X]J[
JK\Ë™[[Y[[[\ÖÝOY_V×ÙJJ^Ü™]\›ˆ\Ë™[[Y[YKLVÒ]WJ
^ÜÝ\\–Ò]WJ
K\Ë™[[Y[[\]H[œÝ[˜Ù[ÙˆZ	‰Š\ÖÝKœÙ]
Ù\Ë™[[Y[
K\Ë™[[Y[[\]VÕJ\ÖÝJK\Ë™[[Y[[\]VÝO]\ÖÝJ__K^OXÛ\ÜÈ^[™ÈžØÛÛœÝXÝÜŠ
^ÜÝ\\ŠLKØš™XÝ˜Ü™X]J[
J_V×ÙJJ^Ü™]\›ˆL__KOXÛ\ÜÞØÛÛœÝXÝÜŠO[[
^Ý\Ë—Û˜[Y\ÜXÙTÝXÚÏV×K\Ë—ÛœÐYÛ›ÜÝXÓ]™[L\Ë—Û˜[Y\ÜXÙT™Yš^\Ï[™]ÈX\\Ë—Û˜[Y\ÜXÙ\Ï[™]ÈX\\Ë—Û™^œÒYSX]›X^
‹‹“Øš™XÝ˜[Y\Ê
K›X\

ÚY™_JOO™JJK\Ë—ØÝ\œ™[˜[Y\ÜXÙOY_™]ÈJ
ÊÝ\Ë—Û™^œÒY
_XZ[›ÛÝ
J^Ü™]\›ˆ™]ÈžJJ_XZ[
ÛœÔ™Yš^™K˜[YN]šX]\Î›‹˜[Y\ÜXÙNœ‹™Yš^\Îš_J^Û]O\ˆOO[[ÚYŠI‰Š\Ë—Û˜[Y\ÜXÙTÝXÚËœ\Ú
\Ë—ØÝ\œ™[˜[Y\ÜXÙJK\Ë—ØÝ\œ™[˜[Y\ÜXÙO]\Ë—ÜÙX\˜Ú˜[Y\ÜXÙJŠJKI‰\Ë—ØY˜[Y\ÜXÙT™Yš^
JK‹š\ÓÝÛ”›Ü\JÙ
J^Û]OSžK™]\Ù]Ë[–ÙÙK[[Ù›ÜŠ]Û‹W[ÙˆØš™XÝ™[šY\Ê
JZYŠ\Ë—ÙÙ]˜[Y\ÜXÙUÕ\ÙJŠOOOYJ^Ü^Þ˜Nš_NØœ™XZß\Û–ÙÙO\Ž™[]H–ÙÙ_[]Ï]\Ë—ÙÙ]˜[Y\ÜXÙUÕ\ÙJJOË–ÒYJŠ_™]È^NÜ™]\›ˆÖØÙJ
I‰\Ë—ÛœÐYÛ›ÜÝXÓ]™[
ÊË
__ÖØÙJ
JI‰ŠÖÚWO^Ú\Ó˜[Y\ÜXÙN˜K™Yš^\ÎšKœÐYÛ›ÜÝXÎ›ÖØÙJ
_JKßZ\ÓœÐYÛ›ÜÝXÊ
^Ü™]\›ˆ\Ë—ÛœÐYÛ›ÜÝXÓ]™[ŒWÜÙX\˜Ú˜[Y\ÜXÙJJ^Û]]\Ë—Û˜[Y\ÜXÙ\Ë™Ù]
JNÚYŠ
\™]\›ˆÙ›ÜŠ]Û‹ØÚXÚÎœŸW[ÙˆØš™XÝ™[šY\Ê
JZYŠŠJJ^ÚYŠSžVÛ—K
\™]\›ˆ\Ë—Û˜[Y\ÜXÙ\ËœÙ]
K
KØœ™XZß\™]\›ˆ[™]ÈJ
ÊÝ\Ë—Û™^œÒY
K\Ë—Û˜[Y\ÜXÙ\ËœÙ]
K
KWØY˜[Y\ÜXÙT™Yš^
J^Ù›ÜŠ]Ü™Yš^˜[YN›Ÿ[ÙˆJ^Û]O]\Ë—ÜÙX\˜Ú˜[Y\ÜXÙJŠK]\Ë—Û˜[Y\ÜXÙT™Yš^\Ë™Ù]

NÜŸ
V×K\Ë—Û˜[Y\ÜXÙT™Yš^\ËœÙ]
ŠJK‹œ\Ú
J__WÙÙ]˜[Y\ÜXÙUÕ\ÙJJ^ÚYŠYJ\™]\›ˆ\Ë—ØÝ\œ™[˜[Y\ÜXÙNÛ]]\Ë—Û˜[Y\ÜXÙT™Yš^\Ë™Ù]
JNÜ™]\›ˆË›[™ÝŒÝ˜]
LJNŠJ[šÛ›ÝÛˆ˜[Y\ÜXÙH™Yš^ˆ	Ù_K˜
K[
_XÛX[ŠJ^Û]Ú\Ó˜[Y\ÜXÙN™Yš^\Î›‹œÐYÛ›ÜÝXÎœŸOYNÝ	‰Š\Ë—ØÝ\œ™[˜[Y\ÜXÙO]\Ë—Û˜[Y\ÜXÙTÝXÚËœÜ

JK‰‰›‹™›Ü‘XXÚ

Ü™Yš^™_JOOžÝ\Ë—Û˜[Y\ÜXÙT™Yš^\Ë™Ù]
JKœÜ

_JK‰‰\Ë—ÛœÐYÛ›ÜÝXÓ]™[K__KžOXÛ\ÜÈH^[™È^ØÛÛœÝXÝÜŠO[[HLJ^ÜÝ\\Š
K\Ë—ØZ[\[™]ÈJJK\Ë—ÜÝXÚÏV×K\Ë—ÙÛØ˜[]O^Ý\ÙY\Y˜XÙ\Î›™]ÈÙ]K\Ë—ÚYÏ[™]ÈX\\Ë—ØÝ\œ™[]\Ë—ØZ[\‹˜Z[›ÛÝ
\Ë—ÚYÊK\Ë—Ù\œ›ÜÛÙO[ÝK“›Ñ\œ›Ü‹\Ë—ÝÚ]T™YÙ^K×—ÊÉË\Ë—Û˜œÜÏK×L
ËÙË\Ë—ÜšXÚ^]\\œÙJJ^ÚYŠ\Ëœ\œÙV[
JK\Ë—Ù\œ›ÜÛÙOOO[ÝK“›Ñ\œ›ÜŠ\™]\›ˆ\Ë—ØÝ\œ™[Ò]WJ
K\Ë—ØÝ\œ™[™[[Y[[Û•^
J^ÚYŠOYKœ™\XÙJ\Ë—Û˜œÜËOO™KœÛXÙJJJØ
K\Ë—ÜšXÚ^\Ë—ØÝ\œ™[ÕWJ
J^Ý\Ë—ØÝ\œ™[ÞYJK\Ë—ÜšXÚ^
NÜ™]\›Ÿ]\Ë—ÝÚ]T™YÙ^\Ý
J_\Ë—ØÝ\œ™[ÞYJKš[J
J_[ÛÙ]JJ^Ý\Ë—ØÝ\œ™[ÞYJJ_WÛZÐ]šX]\ÊK
^Û][[[[OSØš™XÝ˜Ü™X]JßJNÙ›ÜŠ]Û˜[YN˜K˜[YN›ß[ÙˆJZYŠOOOX[œØ
[ÐJHH][\H˜[Y\ÜXÙHYš[š][Ûˆ[ˆ	ÝO˜
N›[ÎÙ[ÙHYŠKœÝ\ÕÚ]
[œÎ˜
J^Û]OXKœÝXœÝš[™ÊŠNÜÏÏV×K‹œ\Ú
Ü™Yš^™K˜[YN›ßJ_Y[Ù^Û]OXKš[™^ÙŠ˜
NÚYŠOOOKLJZVØWO[ÎÙ[Ù^Û]ZVÙÙOÏÏSØš™XÝ˜Ü™X]J[
KÛ‹—OVØKœÛXÙJJKKœÛXÙJJÌJWKÏ]Û—_SØš™XÝ˜Ü™X]J[
NÜÖÜ—O[ß_\™]\›–Û‹‹W_WÙÙ]˜[YP[™™Yš^
K
^Û]YKš[™^ÙŠ˜
NÜ™]\›ˆOOKLOÖÙK[N–ÙKœÝXœÝš[™ÊŠÌJKØ™KœÝXœÝš[™ÊŠW_[Û™YÚ[‘[[Y[
KŠ^Û]Ü‹KWO]\Ë—ÛZÐ]šX]\ÊJKÛË×O]\Ë—ÙÙ]˜[YP[™™Yš^
K\Ë—ØZ[\‹š\ÓœÐYÛ›ÜÝXÊ
JKÏ]\Ë—ØZ[\‹˜Z[
ÛœÔ™Yš^œË˜[YN›Ë]šX]\Î˜K˜[Y\ÜXÙNœ‹™Yš^\Îš_JNÚYŠÖÉWO]\Ë—ÙÛØ˜[]KŠ^ØÖÒ]WJ
K\Ë—ØÝ\œ™[×ÙJÊI‰˜ÖÑJ\Ë—ÚYÊKÖÚÝWJ\Ë—ØZ[\ŠNÜ™]\›Ÿ]\Ë—ÜÝXÚËœ\Ú
\Ë—ØÝ\œ™[
K\Ë—ØÝ\œ™[Xß[Û‘[™[[Y[

^Û]]\Ë—ØÝ\œ™[ÚYŠ–ÚYJ
I‰\[Ùˆ–Õ—OOXÝš[™Ø
^Û][™]ÈNÝ—ÙÛØ˜[]O]\Ë—ÙÛØ˜[]NÛ]]œ\œÙJ–Õ—JNÛ–Õ—O[[–×ÙJŠ_[–Ò]WJ
K\Ë—ØÝ\œ™[]\Ë—ÜÝXÚËœÜ

K\Ë—ØÝ\œ™[×ÙJŠI‰›–ÑJ\Ë—ÚYÊK–ÚÝWJ\Ë—ØZ[\Š_[Û‘\œ›ÜŠJ^Ý\Ë—Ù\œ›ÜÛÙOY__KžOXÛ\ÜÈ^ØÛÛœÝXÝÜŠ
^Ýž^Ý\Ëœ›ÛÝ[™]ÈžJ
Kœ\œÙJK—ØÜ™X]QØÝ[Y[

JNÛ][™]ÈÚ
\Ëœ›ÛÝ
NÝ\Ë™›Ü›O[‹˜š[™

K\Ë™]R[™\[™]ÈZ
\Ëœ›ÛÝ‹™Ù]]J
JK\Ë™›Ü›VÉWK[\]O]\Ë™›Ü›_XØ]Ú
J^ÐJHH[ˆ\œ›ÜˆØØÝ\œ™Y\š[™È\œÚ[™È[™š[™[™Îˆ	Ù_X
__Z\Õ˜[Y

^Ü™]\›ˆHJ\Ëœ›ÛÝ	‰\Ë™›Ü›J_WØÜ™X]TYÙ\Ò[\Š
^Û]O]\Ë™›Ü›VÓYJ
NÜ™]\›ˆ™]È›ÛZ\ÙJ
ŠOOžÛ]J
OOžÝž^Û]YK›™^

NÛ‹™Û™OÝ
‹˜[YJNœÙ][Y[Ý]
‹
_XØ]Ú
J^ÛŠJ__NÜÙ][Y[Ý]
‹
_J_X\Þ[˜ÈØÜ™X]TYÙ\Ê
^Ýž^Ý\ËœYÙ\ÏX]ØZ]\Ë—ØÜ™X]TYÙ\Ò[\Š
K\Ë™[\Ï]\ËœYÙ\Ë˜Ú[™[‹›X\
OOžÛ]ÝÚYZYÚ›ŸOYK˜]šX]\ËœÝ[NÜ™]\›–Ì\œÙR[

K\œÙR[
ŠW_J_XØ]Ú
J^ÐJHH[ˆ\œ›ÜˆØØÝ\œ™Y\š[™È^[Ý]ˆ	Ù_X
__YÙ]›Ý[™[™Ð›Þ
J^Ü™]\›ˆ\Ë™[\ÖÙW_X\Þ[˜ÈÙ][TYÙ\Ê
^Ü™]\›ˆ\ËœYÙ\ß]ØZ]\Ë—ØÜ™X]TYÙ\Ê
K\Ë™[\Ë›[™Ý\Ù][XYÙ\ÊJ^Ý\Ë™›Ü›VÉWKš[XYÙ\ÏY_\Ù]›ÛÊJ^Ý\Ë™›Ü›VÉWK™›Ûš[™\[™]ÈY
JNÛ]V×NÙ›ÜŠ]HÙˆ\Ë™›Ü›VÉWK\ÙY\Y˜XÙ\ÊYOP™
JK\Ë™›Ü›VÉWK™›Ûš[™\‹™š[™
J_œ\Ú
JNÜ™]\›ˆ›[™ÝŒÝ›[X\[™›ÛÊK
^Ý\Ë™›Ü›VÉWK™›Ûš[™\‹˜Y
K
_X\Þ[˜ÈÙ]YÙ\Ê
^Ý\ËœYÙ\ß]ØZ]\Ë—ØÜ™X]TYÙ\Ê
NÛ]O]\ËœYÙ\ÎÜ™]\›ˆ\ËœYÙ\Ï[[_\Ù\šX[^™Q]JJ^Ü™]\›ˆ\Ë™]R[™\‹œÙ\šX[^™JJ_\Ý]XÈØÜ™X]QØÝ[Y[
J^Ü™]\›ˆVØÞžOÓØš™XÝ˜[Y\ÊJKš›Ú[Š
N™VØž_\Ý]XÈÙ]šXÚ^\Ò[
J^ÚYŠY_\[ÙˆHOXÝš[™Ø
\™]\›ˆ[Ýž^Û][™]ÈžJ^KL
Kœ\œÙJJNÚYŠVØ›ÙX[Kš[˜ÛY\ÊÚJJ^Û]OS^K˜›ÙJßJNÙVÑWJ
KY_[]]ÕWJ
NÚYŠ[‹œÝXØÙ\ÜÊ\™]\›ˆ[Û]Ú[œŸO[‹Ø]šX]\Îš_O\ŽÜ™]\›ˆI‰ŠK˜Û\ÜÉ‰ZK˜Û\ÜË™š[\ŠOOˆYKœÝ\ÕÚ]
˜X
JKK™\X]]Ø
KÚ[œ‹ÝŽÚ™J
__XØ]Ú
J^ÐJHH[ˆ\œ›ÜˆØØÝ\œ™Y\š[™È\œÚ[™ÈÙˆšXÚ^ˆ	Ù_X
_\™]\›ˆ[_KžOXÛ\ÜÞÜÝ]XÈÜ™X]QÛØ˜[ÊJ^Ü™]\›ˆ›ÛZ\ÙK˜[
ÙK™[œÝ\™PØ][ÙÊXÜ›Ñ›Ü›X
KK™[œÝ\™QØÊ˜Q]\Ù]Ø
KK™[œÝ\™PØ][ÙÊÝXÝ™YT›ÛÝ
KK™[œÝ\™PØ][ÙÊ˜\ÙU\›
KK™[œÝ\™PØ][ÙÊ]XÚY[Ø
KK™[œÝ\™PØ][ÙÊÛØ˜[ÛÛÜ”ÜXÙPØXÚX
WJK[Š
Ý‹‹KK×JOOŠÜ“X[˜YÙ\Ž™KXÜ›Ñ›Ü›N[œÝ[˜Ù[ÙˆÝ”‹™[\K˜Q]\Ù]Î›‹ÝXÝ™YT›ÛÝœ‹˜\ÙU\›šK]XÚY[Î˜KÛØ˜[ÛÛÜ”ÜXÙPØXÚN›ßJKOOŠJÜ™X]QÛØ˜[Îˆ‰Ù_H‹˜
K[
J_\Ý]XÈ\Þ[˜ÈÜ™X]JK‹‹KKËÊ^Û]ÏZOØ]ØZ]\Ë—ÙÙ]YÙR[™^
K‹œ“X[˜YÙ\ŠN›[Ü™]\›ˆ‹œ“X[˜YÙ\‹™[œÝ\™J\ËØÜ™X]XÙK‹‹KKËË×J_\Ý]XÈØÜ™X]JK‹‹OHLKO[[Ï[[Ï[[Ï[[
^Û]YK™™]ÚY”™YŠ
NÚYŠJ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]O[™Ù]
ÝX\X
NÚYŠO]H[œÝ[˜Ù[ÙˆÝK›˜[YN›[É‰ˆ[Ëš\ÊVÝKÕ\\Ø\ÙJ
WJJ\™]\›ˆ[Û]ØXÜ›Ñ›Ü›N™“X[˜YÙ\Ž™ŸO[‹][œÝ[˜Ù[ÙˆÝÔÝš[™Ê
N˜[››ÝÉÜ‹˜Ü™X]SØš’Y

_X^Þ™YŽ™K™YŽXÝ›ÝX\NKYœ[››Ý][Û‘ÛØ˜[Î›‹ÛÛXÝšY[ÎšKÜœ[‘šY[Î˜K™YY\X\˜[˜Ù\ÎˆZI‰™™Ù]
™YY\X\˜[˜Ù\Ø
OOOHLYÙR[™^œË]˜[X]Ü“Ü[ÛœÎ™‹™]˜[X]Ü“Ü[ÛœËYÙT™YŽ˜ßNÜÝÚ]Ú
J^ØØ\ÙX[šØœ™]\›ˆ™]ÈXŠ
NØØ\ÙX^œ™]\›ˆ™]È	J
NØØ\ÙXÚYÙ]›]O]
ÙXÝ›Ù^N˜•JNÜÝÚ]Ú
OYH[œÝ[˜Ù[ÙˆÙK›˜[YN›[J^ØØ\ÙXœ™]\›ˆ™]È^J
NØØ\ÙX˜œ™]\›ˆ™]ÈJ
NØØ\ÙXÚœ™]\›ˆ™]ÈžJ
NØØ\ÙXÚYØœ™]\›ˆ™]È^J
_\™]\›ˆJ[š[\[Y[YÚYÙ]šY[\H‰Ù_H‹˜[[™È˜XÚÈÈ˜\ÙHšY[\K˜
K™]ÈžJ
NØØ\ÙXÜ\œ™]\›ˆ™]ÈŠ
NØØ\ÙXœ™YU^œ™]\›ˆ™]È˜Š
NØØ\ÙX[™Xœ™]\›ˆ™]È˜Š
NØØ\ÙXÜ]X\™Xœ™]\›ˆ™]ÈXŠ
NØØ\ÙXÚ\˜ÛXœ™]\›ˆ™]ÈXŠ
NØØ\ÙXÛS[™Xœ™]\›ˆ™]ÈØŠ
NØØ\ÙXÛYÛÛ˜œ™]\›ˆ™]ÈØŠ
NØØ\ÙXØ\™]œ™]\›ˆ™]ÈØŠ
NØØ\ÙX[šØœ™]\›ˆ™]ÈŠ
NØØ\ÙXYÚYÚœ™]\›ˆ™]ÈXŠ
NØØ\ÙX[™\›[™Xœ™]\›ˆ™]ÈŠ
NØØ\ÙXÜ]ZYÙÛXœ™]\›ˆ™]È˜Š
NØØ\ÙXÝšZÙSÝ]œ™]\›ˆ™]ÈŠ
NØØ\ÙXÝ[\œ™]\›ˆ™]ÈXŠ
NØØ\ÙXš[P]XÚY[œ™]\›ˆ™]ÈŠ
NÙY˜][œ™]\›ˆ_JOØ[š[\[Y[Y[››Ý][Ûˆ\H‰Ý_H‹˜[[™È˜XÚÈÈ˜\ÙH[››Ý][Û‹˜˜[››Ý][Ûˆ\ÈZ\ÜÚ[™ÈH™\]Z\™YÔÝX\K˜
K™]ÈÞJ
__\Ý]XÈ\Þ[˜ÈÙÙ]YÙR[™^
KŠ^Ýž^Û]X]ØZ]K™™]ÚY”™Y\Þ[˜Ê
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ\™]\›‹LNÛ]O\‹™Ù]˜]Ê
NÚYŠH[œÝ[˜Ù[ÙˆŠ]ž^Ü™]\›ˆ]ØZ]‹™[œÝ\™PØ][ÙÊÙ]YÙR[™^ÚWJ_XØ]Ú
J^ÚÊÙÙ]YÙR[™^KH›ÝH˜[YYÙH™Y™\™[˜ÙNˆ‰Ù_H‹˜
_ZYŠ‹š\ÊÚYØ
J\™]\›‹LNÛ]OX]ØZ]‹™[œÝ\™QØÊ[TYÙ\Ø
NÙ›ÜŠ]OLÙONÙJÊÊ^Û]X]ØZ]‹™Ù]YÙJJKOX]ØZ]‹™[œÝ\™J‹[››Ý][ÛœØ
NÙ›ÜŠ]ˆÙˆJZYŠˆ[œÝ[˜Ù[Ùˆ‰‰•™J‹
J\™]\›ˆ__XØ]Ú
J^ÐJÙÙ]YÙR[™^ˆ‰Ù_H‹˜
_\™]\›‹L_\Ý]XÈÙ[™\˜]R[XYÙ\ÊKŠ^ÚYŠ[Š\™]\›ˆJÙ[™\˜]R[XYÙ\ÎˆÙ™œØÜ™Y[Ø[˜\È\È›ÝÝ\ÜYØ[››ÝØ]™HÜˆš[ÛÛYH[››Ý][ÛœÈÚ][XYÙ\Ë˜
K[Û]ŽÙ›ÜŠ]Øš]X\Y›‹š]X\š_[ÙˆJZI‰ŠŸ[™]ÈX\‹œÙ]
‹X‹˜Ü™X]R[XYÙJK
JJNÜ™]\›ˆŸ\Ý]XÈ\Þ[˜ÈØ]™S™]Ð[››Ý][ÛœÊK‹‹J^Û]OYKž™Y‹ËÏV×KÚ\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜY˜ßOYK›Ü[ÛœÎÙ›ÜŠ]ÙˆŠZYŠ[™[]Y
\ÝÚ]Ú
˜[››Ý][Û•\J^ØØ\ÙHK‘”‘QUVšYŠ[Ê^Û]O[™]ÈŠJNÙKœÙ]Y“˜[YJ˜\ÙQ›Û[™]XØX
KKœÙ]Y“˜[YJ\X›Û
KKœÙ]Y“˜[YJÝX\X\LX
KKœÙ]Y“˜[YJ[˜ÛÙ[™ØÚ[[œÚQ[˜ÛÙ[™Ø
KÏXK™Ù]™]Õ[\Ü˜\žT™YŠ
KKœ]
ËÙ]N™_J_\Ëœ\Ú
˜‹˜Ü™X]S™]Ð[››Ý][ÛŠKKÙ]˜[X]ÜŽ™K\ÚÎ˜\ÙQ›Û™YŽ›ßJJNØœ™XZÎØØ\ÙHK’QÒQÒ›œ]XYÚ[ÏÜËœ\Ú
X‹˜Ü™X]S™]Ð[››Ý][ÛŠKJJNœËœ\Ú
‹˜Ü™X]S™]Ð[››Ý][ÛŠKJJNØœ™XZÎØØ\ÙHK’S’ÎœËœ\Ú
‹˜Ü™X]S™]Ð[››Ý][ÛŠKJJNØœ™XZÎØØ\ÙHK”ÕST›]XÏØ]ØZ]Ë™Ù]
˜š]X\Y
N›[ÚYŠËš[XYÙTÝ™X[J^Û]Ú[XYÙTÝ™X[N™KÛX\ÚÔÝ™X[NO[ŽÚYŠ
^Û]XK™Ù]™]Õ[\Ü˜\žT™YŠ
NÚKœ]
‹Ù]NJKK™XÝœÙ]
ÓX\ÚØŠ_[][‹š[XYÙT™YXK™Ù]™]Õ[\Ü˜\žT™YŠ
NÚKœ]
‹Ù]N™_JK‹š[XYÙTÝ™X[O[‹œÛX\ÚÔÝ™X[O[[\Ëœ\Ú
X‹˜Ü™X]S™]Ð[››Ý][ÛŠKKÚ[XYÙN›ŸJJNØœ™XZÎØØ\ÙHK”ÒQÓUT‘NœËœ\Ú
X‹˜Ü™X]S™]Ð[››Ý][ÛŠKKßJJNØœ™XZß\™]\›žØ[››Ý][ÛœÎŠ]ØZ]›ÛZ\ÙK˜[
ÊJK™›]

__\Ý]XÈ\Þ[˜Èš[™]Ð[››Ý][ÛœÊK‹‹J^ÚYŠ\Š\™]\›ˆ[Û]ÛÜ[ÛœÎ˜K™YŽ›ßO]ÏV×NÙ›ÜŠ]ÈÙˆŠZYŠXË™[]Y
\ÝÚ]Ú
Ë˜[››Ý][Û•\J^ØØ\ÙHK‘”‘QUVœËœ\Ú
˜‹˜Ü™X]S™]Ôš[[››Ý][ÛŠKËËÙ]˜[X]ÜŽ\ÚÎ›‹]˜[X]Ü“Ü[ÛœÎ˜_JJNØœ™XZÎØØ\ÙHK’QÒQÒ˜Ëœ]XYÚ[ÏÜËœ\Ú
X‹˜Ü™X]S™]Ôš[[››Ý][ÛŠKËËÙ]˜[X]Ü“Ü[ÛœÎ˜_JJNœËœ\Ú
‹˜Ü™X]S™]Ôš[[››Ý][ÛŠKËËÙ]˜[X]Ü“Ü[ÛœÎ˜_JJNØœ™XZÎØØ\ÙHK’S’ÎœËœ\Ú
‹˜Ü™X]S™]Ôš[[››Ý][ÛŠKËËÙ]˜[X]Ü“Ü[ÛœÎ˜_JJNØœ™XZÎØØ\ÙHK”ÕST›]XKš\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜYØ]ØZ]OË™Ù]
Ë˜š]X\Y
N›[ÚYŠËš[XYÙTÝ™X[J^Û]Ú[XYÙTÝ™X[N™KÛX\ÚÔÝ™X[NO\ŽÝ	‰™K™XÝœÙ]
ÓX\ÚØ
K‹š[XYÙT™Y[™]È\ŠKK›[™Ý
K‹š[XYÙTÝ™X[O\‹œÛX\ÚÔÝ™X[O[[\Ëœ\Ú
X‹˜Ü™X]S™]Ôš[[››Ý][ÛŠKËËÚ[XYÙNœ‹]˜[X]Ü“Ü[ÛœÎ˜_JJNØœ™XZÎØØ\ÙHK”ÒQÓUT‘NœËœ\Ú
X‹˜Ü™X]S™]Ôš[[››Ý][ÛŠKËËÙ]˜[X]Ü“Ü[ÛœÎ˜_JJNØœ™XZß\™]\›ˆ›ÛZ\ÙK˜[
Ê__NÙ[˜Ý[ÛˆžJK[™]ÈZ[Û[\Y\œ˜^JÊJ^ÚYŠP\œ˜^Kš\Ð\œ˜^JJJ\™]\›ˆÛ]]™]ÈZ[Û[\Y\œ˜^JÊNÜÝÚ]Ú
K›[™Ý
^ØØ\ÙHœ™]\›ˆ[ØØ\ÙHNœ™]\›ˆ‹™Ü˜^K™Ù]™Ø’][JK‹
KŽØØ\ÙHÎœ™]\›ˆ‹œ™Ø‹™Ù]™Ø’][JK‹
KŽØØ\ÙHœ™]\›ˆ‹˜Û^ZË™Ù]™Ø’][JK‹
KŽÙY˜][œ™]\›ˆ_Y[˜Ý[ÛˆJK[[
^Ü™]\›ˆI‰\œ˜^K™œ›ÛJKOO™KÌMJ_Y[˜Ý[Ûˆ^JK
^Û]YK™Ù]\œ˜^J]XYÚ[Ø
NÚYŠY
‹[
_‹›[™ÝOOL‹›[™Ý	NŒ
\™]\›ˆ[Û][™]È›Ø]Ì\œ˜^J‹›[™Ý
NÙ›ÜŠ]OLO[‹›[™ÝÙONÙJÏN
^Û]ÚKKËËËKO[‹œÛXÙJKJÎ
KSX]›Z[ŠKËËJKSX]›X^
KËËJKOSX]›Z[ŠKË
KSX]›X^
KË
NÚYŠOO[[	‰ŠÌ_Ì—_OÌW_Ì×JJ\™]\›ˆ[Ü‹œÙ]
Ù‹‹KWKJ_\™]\›ˆŸY[˜Ý[ÛˆÞJKŠ^Û][™]È›Ø]Ì\œ˜^JÌKÌKÌLKÌLKÌJNÛYK˜^X[[YÛ™Y›Ý[™[™Ð›Þ
‹ŠNÛ]ÚKKË×O\ŽÚYŠOOO[ßOOO\Ê\™]\›–ÌKKVÌKVÌWWNÛ]ÏJVÌ—KYVÌJKÊËZJKJVÌ×KYVÌWJKÊËXJNÜ™]\›–ØËVÌKZJ˜ËVÌWKXJ›_]˜\ˆÞOXÛ\ÜÞØÛÛœÝXÝÜŠJ^Û]ÙXÝ™YŽ›‹[››Ý][Û‘ÛØ˜[Îœ‹™YŽšKÜœ[‘šY[Î˜_OYKÏXOË™Ù]
JNÛÉ‰œÙ]
\™[ÊK\ËœÙ]]J™Ù]

JK\ËœÙ]ÛÛ[Ê™Ù]
ÛÛ[Ø
JK\ËœÙ][ÙYšXØ][Û‘]J™Ù]
X
JK\ËœÙ]›YÜÊ™Ù]
˜
JK\ËœÙ]™XÝ[™ÛJ™Ù]\œ˜^J™XÝ
JK\ËœÙ]ÛÛÜŠ™Ù]\œ˜^JØ
JK\ËœÙ]›Ü™\”Ý[J
K\ËœÙ]\X\˜[˜ÙJ
K\ËœÙ]Ü[Û˜[ÛÛ[

NÛ]Ï]™Ù]
RØ
NÝ\ËœÙ]›Ü™\[™˜XÚÙÜ›Ý[™ÛÛÜœÊÊK\ËœÙ]›Ý][ÛŠË
K\Ëœ™YYKœ™Yˆ[œÝ[˜Ù[ÙˆÙKœ™YŽ›[\Ë—ÜÝ™X[\ÏV×K\Ë˜\X\˜[˜ÙI‰\Ë—ÜÝ™X[\Ëœ\Ú
\Ë˜\X\˜[˜ÙJNÛ]ÏHHJ\Ë™›YÜÉ™Ë“ÐÒÑQ
KHHJ\Ë™›YÜÉ™Ë“ÐÒÑQÓÓ•S•ÊNÚYŠ\Ë™]O^Ø[››Ý][Û‘›YÜÎ\Ë™›YÜË›Ü™\”Ý[N\Ë˜›Ü™\”Ý[KÛÛÜŽ\Ë˜ÛÛÜ‹˜XÚÙÜ›Ý[™ÛÛÜŽ\Ë˜˜XÚÙÜ›Ý[™ÛÛÜ‹›Ü™\ÛÛÜŽ\Ë˜›Ü™\ÛÛÜ‹›Ý][ÛŽ\Ëœ›Ý][Û‹ÛÛ[ÓØšŽ\Ë—ØÛÛ[Ë\Ð\X\˜[˜ÙNˆH]\Ë˜\X\˜[˜ÙKY™KšY[ÙYšXØ][Û‘]N\Ë›[ÙYšXØ][Û‘]K™XÝ\Ëœ™XÝ[™ÛKÝX\N™KœÝX\K\ÓÝÛØ[˜\ÎˆLK›Ô›Ý]NˆHJ\Ë™›YÜÉ™Ë““Ô“ÕUJK›ÒS˜É‰›\ÑY]X›NˆLKÝXÝ\™[‹L_K‹œÝXÝ™YT›ÛÝ
^Û]]™Ù]
ÝXÝ\™[
NÝ\Ë™]KœÝXÝ\™[[S[X™\‹š\Ò[YÙ\ŠŠI‰›LÛŽ‹LK‹œÝXÝ™YT›ÛÝ˜Y[››Ý][Û’YÔYÙJKœYÙT™Y‹Š_ZYŠK˜ÛÛXÝšY[Ê^Û]]™Ù]
ÚYØ
NÚYŠ\œ˜^Kš\Ð\œ˜^JŠJ^Û]OV×NÙ›ÜŠ]ÙˆŠ][œÝ[˜Ù[Ùˆ‰‰™Kœ\Ú
ÔÝš[™Ê
JNÙK›[™ÝOOL	‰Š\Ë™]KšÚYYÏYJ_]\Ë™]K˜XÝ[ÛœÏX
‹JK\Ë™]K™šY[˜[YO]\Ë—ØÛÛœÝXÝšY[˜[YJ
K\Ë™]KœYÙR[™^YKœYÙR[™^[]O]™Ù]
U
NÝH[œÝ[˜Ù[Ùˆ	‰Š\Ë™]Kš]]K›˜[YJK\Ë—Ú\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜYYK™]˜[X]Ü“Ü[ÛœËš\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜY\Ë—Ù˜[˜XÚÑ›ÛXÝ[[\Ë—Û™YY\X\˜[˜Ù\ÏHL_WÚ\Ñ›YÊK
^Ü™]\›ˆHJI
_WØZ[›YÜÊK
^Û]Ù›YÜÎ›ŸO]\ÎÜ™]\›ˆOOO]›ÚYÝOO]›ÚYÝ›ÚYÛ‰Ÿ™Ë”’S•›‰Ÿ™Ë’QSŸË”’S•™OÊŸYË”’S•Û‰Ÿ™Ë““Õ’QUßË’QSŽ›‰Ÿ™Ë’QSŸË““Õ’QUÊNŠ‰_ŠË’QSŸË““Õ’QUÊKÛ‰Ÿ™Ë”’S•›ŸË”’S•
_WÚ\ÕšY]ØX›JJ^Ü™]\›ˆ]\Ë—Ú\Ñ›YÊKË’S•’TÒP“JI‰ˆ]\Ë—Ú\Ñ›YÊKË““Õ’QUÊ_WÚ\Ôš[X›JJ^Ü™]\›ˆ\Ë—Ú\Ñ›YÊKË”’S•
I‰ˆ]\Ë—Ú\Ñ›YÊKË’QSŠI‰ˆ]\Ë—Ú\Ñ›YÊKË’S•’TÒP“J_[]\Ý™UšY]ÙY
K
^Û]YOË™Ù]
\Ë™]KšY
OË››ÕšY]ÎÜ™]\›ˆOO]›ÚYÝ\ËšY]ØX›I‰ˆ]\Ë—Ú\Ñ›YÊ\Ë™›YÜËË’QSŠNˆ[Ÿ[]\Ý™Tš[Y
J^Û]YOË™Ù]
\Ë™]KšY
OË››Ôš[Ü™]\›ˆOO]›ÚYÝ\Ëœš[X›Nˆ][]\Ý™UšY]ÙYÚ[‘Y][™ÊK[[
^Ü™]\›ˆOÈ]\Ë™]Kš\ÑY]X›Nˆ]Ëš\Ê\Ë™]KšY
_YÙ]šY]ØX›J
^Ü™]\›ˆ\Ë™]Kœ]XYÚ[ÏOO[[ÈLN\Ë™›YÜÏOOLÈL\Ë—Ú\ÕšY]ØX›J\Ë™›YÜÊ_YÙ]š[X›J
^Ü™]\›ˆ\Ë™]Kœ]XYÚ[ÏOO[[\Ë™›YÜÏOOLÈLN\Ë—Ú\Ôš[X›J\Ë™›YÜÊ_WÜ\œÙTÝš[™Ò[\ŠJ^Û]]\[ÙˆOOXÝš[™ØÙÙJJN˜Ü™]\›žÜÝŽ\Ž	‰š

K™\OOXØ˜˜_\Ù]Y˜][\X\˜[˜ÙJJ^Û]ÙXÝ[››Ý][Û‘ÛØ˜[Î›ŸOYK]
ÙXÝÙ^N˜XJ_‹˜XÜ›Ñ›Ü›K™Ù]
X
NÝ\Ë—ÙY˜][\X\˜[˜ÙO]\[ÙˆOXÝš[™ØÜŽ˜\Ë™]K™Y˜][\X\˜[˜ÙQ]OQÛ
\Ë—ÙY˜][\X\˜[˜ÙJ_\Ù]]JJ^Ý\Ë—Ý]O]\Ë—Ü\œÙTÝš[™Ò[\ŠJ_\Ù]ÛÛ[ÊJ^Ý\Ë—ØÛÛ[Ï]\Ë—Ü\œÙTÝš[™Ò[\ŠJ_\Ù][ÙYšXØ][Û‘]JJ^Ý\Ë›[ÙYšXØ][Û‘]O]\[ÙˆOOXÝš[™ØÙN›[\Ù]›YÜÊJ^Ý\Ë™›YÜÏS[X™\‹š\Ò[YÙ\ŠJI‰™OŒÙNŒ\Ë™›YÜÉ™Ë’S•’TÒP“I‰\Ë˜ÛÛœÝXÝÜ‹›˜[YHOOX[››Ý][Û˜	‰Š\Ë™›YÜ×YË’S•’TÒP“J_Z\Ñ›YÊJ^Ü™]\›ˆ\Ë—Ú\Ñ›YÊ\Ë™›YÜËJ_\Ù]™XÝ[™ÛJJ^Ý\Ëœ™XÝ[™ÛOZ
KÌJ_\Ù]ÛÛÜŠJ^Ý\Ë˜ÛÛÜUžJJ_\Ù][™Q[™[™ÜÊJ^ÚYŠ\Ë›[™Q[™[™ÜÏVØ›Û™X›Û™XK\œ˜^Kš\Ð\œ˜^JJI‰™K›[™ÝOOLŠY›ÜŠ]LÝŽÝ
ÊÊ^Û]YVÝNÚYŠˆ[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
‹›˜[YJ^ØØ\ÙX›Û™X˜ÛÛ[YNØØ\ÙXÜ]X\™X˜Ø\ÙXÚ\˜ÛX˜Ø\ÙXX[[Û™˜Ø\ÙXÜ[\œ›ÝØ˜Ø\ÙXÛÜÙY\œ›ÝØ˜Ø\ÙX]˜Ø\ÙX“Ü[\œ›ÝØ˜Ø\ÙXÛÜÙY\œ›ÝØ˜Ø\ÙXÛ\Ú\Ë›[™Q[™[™ÜÖÝO[‹›˜[YNØÛÛ[Y_PJYÛ›Üš[™È[˜[Y[™Q[™[™Îˆ	ÛŸX
__\Ù]›Ý][ÛŠK
^Ý\Ëœ›Ý][ÛLÛ]YH[œÝ[˜Ù[ÙˆÙK™Ù]
˜
_™Ù]
›Ý]X
_Ó[X™\‹š\Ò[YÙ\ŠŠI‰›ˆOOL	‰Š‰OLÍŒ	‰ŠŠÏLÍŒ
K‰NLOL	‰Š\Ëœ›Ý][Û[ŠJ_\Ù]›Ü™\[™˜XÚÙÜ›Ý[™ÛÛÜœÊJ^ÙH[œÝ[˜Ù[ÙˆÊ\Ë˜›Ü™\ÛÛÜUžJK™Ù]\œ˜^JØ
K[
K\Ë˜˜XÚÙÜ›Ý[™ÛÛÜUžJK™Ù]\œ˜^J‘Ø
K[
JN\Ë˜›Ü™\ÛÛÜ]\Ë˜˜XÚÙÜ›Ý[™ÛÛÜ[[\Ù]›Ü™\”Ý[JJ^ÚYŠ\Ë˜›Ü™\”Ý[O[™]ÈÞKH[œÝ[˜Ù[ÙˆŠZYŠKš\Ê”Ø
J^Û]YK™Ù]
”Ø
NÚYŠ[œÝ[˜Ù[ÙˆŠ^Û]O]™Ù]
\X
NÊY_™JK›Ü™\˜
JI‰Š\Ë˜›Ü™\”Ý[KœÙ]ÚY
™Ù]
Ø
K\Ëœ™XÝ[™ÛJK\Ë˜›Ü™\”Ý[KœÙ]Ý[J™Ù]
Ø
JK\Ë˜›Ü™\”Ý[KœÙ]\Ú\œ˜^J™Ù]\œ˜^J
JJ__Y[ÙHYŠKš\Ê›Ü™\˜
J^Û]YK™Ù]\œ˜^J›Ü™\˜
NÐ\œ˜^Kš\Ð\œ˜^J
I‰›[™ÝLÉ‰Š\Ë˜›Ü™\”Ý[KœÙ]Üš^›Û[ÛÜ›™\”˜Y]\ÊÌJK\Ë˜›Ü™\”Ý[KœÙ]™\XØ[ÛÜ›™\”˜Y]\ÊÌWJK\Ë˜›Ü™\”Ý[KœÙ]ÚY
Ì—K\Ëœ™XÝ[™ÛJK›[™ÝOOM	‰\Ë˜›Ü™\”Ý[KœÙ]\Ú\œ˜^JÌ×KL
J_Y[ÙH\Ë˜›Ü™\”Ý[KœÙ]ÚY

_\Ù]\X\˜[˜ÙJJ^Ý\Ë˜\X\˜[˜ÙO[[Û]YK™Ù]
T
NÚYŠJ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]]™Ù]
˜
NÚYŠˆ[œÝ[˜Ù[ÙˆŠ^Ý\Ë˜\X\˜[˜ÙO[ŽÜ™]\›ŸZYŠJˆ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]YK™Ù]
TØ
NÚYŠJˆ[œÝ[˜Ù[Ùˆ
_[‹š\Ê‹›˜[YJJ\™]\›ŽÛ]O[‹™Ù]
‹›˜[YJNÚH[œÝ[˜Ù[Ùˆ‰‰Š\Ë˜\X\˜[˜ÙOZJ_\Ù]Ü[Û˜[ÛÛ[
J^Ý\Ë›ØÏ[[Û]YK™Ù]
ÐØ
NÝ[œÝ[˜Ù[ÙˆÐJÙ]Ü[Û˜[ÛÛ[ˆÝ\Ü›ÜˆÓ˜[YKY[žH\È›Ý[\[Y[Y˜
N[œÝ[˜Ù[Ùˆ‰‰Š\Ë›ØÏ]
_X\Þ[˜ÈØY™\ÛÝ\˜Ù\ÊK
^Û]X]ØZ]™XÝ™Ù]\Þ[˜Ê™\ÛÝ\˜Ù\Ø
NÜ™]\›ˆ‰‰˜]ØZ]ÝK›ØY
‹K‹ž™YŠKŸX\Þ[˜ÈÙ]Ü\˜]Ü“\Ý
K‹Š^Û]Ú\ÓÝÛØ[˜\ÎšKY˜K™XÝ›ßO]\Ë™]KÏ]\Ë˜\X\˜[˜ÙKHHJI‰›‰˜Ë‘TÔVJNÚYŠ	‰Š\ËÚYOOL\ËšZYÚOOL
J\™]\›ˆ\Ë™]Kš\ÓÝÛØ[˜\ÏHLKÛÜ\Ý›™]È‹Ù\\˜]Q›Ü›NˆLKÙ\\˜]PØ[˜\ÎˆL_NÚYŠ\Ê^ÚYŠ[
\™]\›žÛÜ\Ý›™]È‹Ù\\˜]Q›Ü›NˆLKÙ\\˜]PØ[˜\ÎˆL_NÜÏ[™]ÈÛŠ
KË™XÝ[™]ÈŸ[]O\Ë™XÝX]ØZ]\Ë›ØY™\ÛÝ\˜Ù\ÊÙKÊK[]
K™Ù]\œ˜^J›Þ
KÌKWJK\
K™Ù]\œ˜^JX]š^
KÙJKOUÞJË‹
K[™]È‹ÎÜ™]\›ˆ\Ë›ØÉ‰ŠÏX]ØZ]Kœ\œÙSX\šÙYÛÛ[›ÜÊ\Ë›ØË[
JKÈOO]›ÚY	‰š˜YÜ
Ë˜™YÚ[“X\šÙYÛÛ[›ÜËØÐØ×JK˜YÜ
Ë˜™YÚ[[››Ý][Û‹ØKËKJK]ØZ]K™Ù]Ü\˜]Ü“\Ý
ÜÝ™X[NœË\ÚÎ™\ÛÝ\˜Ù\Î™Ü\˜]Ü“\Ýš˜[˜XÚÑ›ÛXÝ\Ë—Ù˜[˜XÚÑ›ÛXÝJK˜YÜ
Ë™[™[››Ý][Û‹×JKÈOO]›ÚY	‰š˜YÜ
Ë™[™X\šÙYÛÛ[×JK\Ëœ™\Ù]

KÛÜ\ÝšÙ\\˜]Q›Ü›NˆLKÙ\\˜]PØ[˜\Î›_X\Þ[˜ÈØ]™JK‹Š^Ü™]\›ˆ[YÙ]Ý™\›^\Õ^ÛÛ[

^Ü™]\›ˆL_YÙ]\Õ^ÛÛ[

^Ü™]\›ˆL_X\Þ[˜È^˜XÝ^ÛÛ[
KŠ^ÚYŠ]\Ë˜\X\˜[˜ÙJ\™]\›ŽÛ]X]ØZ]\Ë›ØY™\ÛÝ\˜Ù\ÊYK\Ë˜\X\˜[˜ÙJKOV×KOV×KÏ[[Ï^Ù\Ú\™YÚ^™N“X]’[™š[š]K™XYNˆL[œ]Y]YJK
^Ù›ÜŠ]ÙˆKš][\Ê]œÝˆOO]›ÚY	‰Šß]˜[œÙ›Ü›KœÛXÙJLŠKKœ\Ú
œÝŠKš\ÑSÓ	‰ŠKœ\Ú
Kš›Ú[Š
Kš[Q[™

JKK›[™ÝL
J__NÚYŠ]ØZ]K™Ù]^ÛÛ[
ÜÝ™X[N\Ë˜\X\˜[˜ÙK\ÚÎ™\ÛÝ\˜Ù\Îœ‹[˜ÛYSX\šÙYÛÛ[ˆLÙY\Ú]TÜXÙNˆLÚ[šÎœËšY]Ð›Þ›ŸJK\Ëœ™\Ù]

KK›[™Ý	‰šKœ\Ú
Kš›Ú[Š
Kš[Q[™

JKK›[™ÝŒ_VÌJ^Û]O]\Ë˜\X\˜[˜ÙK™XÝ[]
K™Ù]\œ˜^J›Þ
K[
K\
K™Ù]\œ˜^JX]š^
K[
NÝ\Ë™]K^ÜÚ][Û]\Ë—Ý˜[œÙ›Ü›TÚ[
ËŠK\Ë™]K^ÛÛ[Z__WÝ˜[œÙ›Ü›TÚ[
KŠ^Û]Ü™XÝœŸO]\Ë™]NÝVÌKWKŸVÌKKNÛ]OUÞJ‹ŠNÚVÍKO\–ÌKVÍWKO\–ÌWNÛ]OYKœÛXÙJ
NÜ™]\›ˆYK˜\U˜[œÙ›Ü›JKJKYK˜\U˜[œÙ›Ü›JKŠK_YÙ]šY[Øš™XÝ

^Ü™]\›ˆ\Ë™]KšÚYYÏÞÚY\Ë™]KšYXÝ[ÛœÎ\Ë™]K˜XÝ[ÛœË˜[YN\Ë™]K™šY[˜[YKÝ›ÚÙPÛÛÜŽ\Ë™]K˜›Ü™\ÛÛÜ‹š[ÛÛÜŽ\Ë™]K˜˜XÚÙÜ›Ý[™ÛÛÜ‹\N˜ÚYYÎ\Ë™]KšÚYYËYÙN\Ë™]KœYÙR[™^›Ý][ÛŽ\Ëœ›Ý][ÛŸN›[\™\Ù]

^Ù›ÜŠ]HÙˆ\Ë—ÜÝ™X[\ÊYKœ™\Ù]

_WØÛÛœÝXÝšY[˜[YJJ^ÚYŠYKš\Ê
I‰ˆYKš\Ê\™[
J\™]\›ˆJ[šÛ›ÝÛˆšY[˜[YK˜[[™È˜XÚÈÈ[\HšY[˜[YK˜
KÚYŠYKš\Ê\™[
J\™]\›ˆÙJK™Ù]

JNÛ]V×NÙKš\Ê
I‰[œÚY
ÙJK™Ù]

JJNÛ]YK[™]ÈYNÙ›ÜŠK›Øš’Y	‰œ‹œ]
K›Øš’Y
NÛ‹š\Ê\™[
I‰Š[‹™Ù]
\™[
KJJˆ[œÝ[˜Ù[ÙˆŠ_‹›Øš’Y	‰œ‹š\Ê‹›Øš’Y
JJNÊ[‹›Øš’Y	‰œ‹œ]
‹›Øš’Y
K‹š\Ê
I‰[œÚY
ÙJ‹™Ù]

JJNÜ™]\›ˆš›Ú[Š˜
_YÙ]ÚY

^Ü™]\›ˆ\Ë™]Kœ™XÝÌ—K]\Ë™]Kœ™XÝÌ_YÙ]ZYÚ

^Ü™]\›ˆ\Ë™]Kœ™XÝÌ×K]\Ë™]Kœ™XÝÌW__KÞOXÛ\ÜÞØÛÛœÝXÝÜŠ
^Ý\ËÚYLK\Ëœ˜]ÕÚYLK\ËœÝ[O]‹”ÓÓQ\Ë™\Ú\œ˜^OVÌ×K\ËšÜš^›Û[ÛÜ›™\”˜Y]\ÏL\Ë™\XØ[ÛÜ›™\”˜Y]\ÏL\Ù]ÚY
KVÌJ^ÚYŠH[œÝ[˜Ù[Ùˆ
^Ý\ËÚYLÜ™]\›ŸZYŠ\[ÙˆOOX[X™\˜
^ÚYŠOŒ
^Ý\Ëœ˜]ÕÚYYNÛ]JÌ—K]ÌJKÌ‹JÌ×K]ÌWJKÌŽÛŒ	‰œŒ	‰ŠO›ŸOœŠI‰ŠJ[››Ý][Û›Ü™\”Ý[KœÙ]ÚYHYÛ›Üš[™ÈÚYˆ	Ù_X
KOLJ_]\ËÚYY__\Ù]Ý[JJ^ÚYŠH[œÝ[˜Ù[Ùˆ
\ÝÚ]Ú
K›˜[YJ^ØØ\ÙXØ\ËœÝ[O]‹”ÓÓQØœ™XZÎØØ\ÙX\ËœÝ[O]‹‘TÒQØœ™XZÎØØ\ÙX˜\ËœÝ[O]‹‘U‘SQØœ™XZÎØØ\ÙXX\ËœÝ[O]‹’S”ÑUØœ™XZÎØØ\ÙXX\ËœÝ[O]‹•S‘T“S‘NØœ™XZÎÙY˜][˜œ™XZß_\Ù]\Ú\œ˜^JKHLJ^ÚYŠ\œ˜^Kš\Ð\œ˜^JJJ^Û]HLHLÙ›ÜŠ]ÙˆJZYŠ
ÝL
]Œ	‰ŠHLJNÙ[Ù^ÛHLNØœ™XZßYK›[™ÝOOL‰‰ˆ\Ê\Ë™\Ú\œ˜^OYK	‰\ËœÙ]Ý[J™Ù]

JJN\ËÚYLY[ÙHI‰Š\ËÚYL
_\Ù]Üš^›Û[ÛÜ›™\”˜Y]\ÊJ^Ó[X™\‹š\Ò[YÙ\ŠJI‰Š\ËšÜš^›Û[ÛÜ›™\”˜Y]\ÏYJ_\Ù]™\XØ[ÛÜ›™\”˜Y]\ÊJ^Ó[X™\‹š\Ò[YÙ\ŠJI‰Š\Ë™\XØ[ÛÜ›™\”˜Y]\ÏYJ__K^OXÛ\ÜÈ^[™ÈÞ^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝOYNÚYŠš\ÊT•
J^Û]O]™Ù]˜]ÊT•
NÝ\Ë™]Kš[”™\UÏYH[œÝ[˜Ù[ÙˆÙKÔÝš[™Ê
N›[Û]]™Ù]
•
NÝ\Ë™]Kœ™\U\O[ˆ[œÝ[˜Ù[ÙˆÛ‹›˜[YNš”‘T_[][[ÚYŠ\Ë™]Kœ™\U\OOOZ‘Ô“ÕT
^Û]O]™Ù]
T•
NÝ\ËœÙ]]JK™Ù]

JK\Ë™]K]SØš]\Ë—Ý]K\ËœÙ]ÛÛ[ÊK™Ù]
ÛÛ[Ø
JK\Ë™]K˜ÛÛ[ÓØš]\Ë—ØÛÛ[ËKš\ÊÜ™X][Û‘]X
OÊ\ËœÙ]Ü™X][Û‘]JK™Ù]
Ü™X][Û‘]X
JK\Ë™]K˜Ü™X][Û‘]O]\Ë˜Ü™X][Û‘]JN\Ë™]K˜Ü™X][Û‘]O[[Kš\ÊX
OÊ\ËœÙ][ÙYšXØ][Û‘]JK™Ù]
X
JK\Ë™]K›[ÙYšXØ][Û‘]O]\Ë›[ÙYšXØ][Û‘]JN\Ë™]K›[ÙYšXØ][Û‘]O[[YK™Ù]˜]ÊÜ\
KKš\ÊØ
OÊ\ËœÙ]ÛÛÜŠK™Ù]\œ˜^JØ
JK\Ë™]K˜ÛÛÜ]\Ë˜ÛÛÜŠN\Ë™]K˜ÛÛÜ[[Y[ÙH\Ë™]K]SØš]\Ë—Ý]K\ËœÙ]Ü™X][Û‘]J™Ù]
Ü™X][Û‘]X
JK\Ë™]K˜Ü™X][Û‘]O]\Ë˜Ü™X][Û‘]K]™Ù]˜]ÊÜ\
Kš\ÊØ
_
\Ë™]K˜ÛÛÜ[[
NÝ\Ë™]KœÜ\™Y[ˆ[œÝ[˜Ù[ÙˆÛ‹ÔÝš[™Ê
N›[š\ÊØ
I‰Š\Ë™]KœšXÚ^^žK™Ù]šXÚ^\Ò[
™Ù]
Ø
JJ_\Ù]Ü™X][Û‘]JJ^Ý\Ë˜Ü™X][Û‘]O]\[ÙˆOOXÝš[™ØÙN›[WÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ™K^˜NÝ›ÚÙPÛÛÜŽ›‹š[ÛÛÜŽœ‹›[™[ÙNšKÝ›ÚÙP[N˜Kš[[N›ËÚ[ÐØ[˜XÚÎœßJ^Û]Ï]\Ë™]Kœ™XÝVÌKÌKÌLKÌLKÌKVØXNÝ	‰›œ\Ú

K‰‰›œ\Ú
	Û–Ì_H	Û–ÌW_H	Û–Ì—_H‘Ø
K‰‰›œ\Ú
	Ü–Ì_H	Ü–ÌW_H	Ü–Ì—_H™Ø
NÛ]O]\Ë™]Kœ]XYÚ[ß›Ø]Ì\œ˜^K™œ›ÛJÝ\Ëœ™XÝ[™ÛVÌK\Ëœ™XÝ[™ÛVÌ×K\Ëœ™XÝ[™ÛVÌ—K\Ëœ™XÝ[™ÛVÌ×K\Ëœ™XÝ[™ÛVÌK\Ëœ™XÝ[™ÛVÌWK\Ëœ™XÝ[™ÛVÌ—K\Ëœ™XÝ[™ÛVÌWWJNÙ›ÜŠ]OL]K›[™ÝÙOÙJÏN
^Û]\ÊKœÝX˜\œ˜^JKJÎ
JNÛYKœ™XÝ›Ý[™[™Ð›Þ
‹‹Ê_[œ\Ú
X
NÛ][™]ÈŠJK[™]ÈŠJNÙ‹œÙ]Y“˜[YJÝX\X›Ü›X
NÛ][™]ÈÛŠš›Ú[Š
JNÜ™XÝY‹œÙ]
›L
NÛ]O[™]ÈŠJNÚI‰›KœÙ]Y“˜[YJ“XJKKœÙ]Y“[X™\ŠÐXJKKœÙ]Y“[X™\ŠØXÊNÛ][™]ÈŠJNÚœÙ]
ÔÌJNÛ]Ï[™]ÈŠJNÙËœÙ]
^ÔÝ]X
KËœÙ]
Øš™XÝ
NÛ]Ï[™]ÈŠJN×ËœÙ]
™\ÛÝ\˜Ù\ØÊKËœÙ]
›ÞÊK\Ë˜\X\˜[˜ÙO[™]ÈÛŠÑÔÌÜÈÑ›LØ
K\Ë˜\X\˜[˜ÙK™XÝWË\Ë—ÜÝ™X[\Ëœ\Ú
\Ë˜\X\˜[˜ÙK
_\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ð[››Ý][ÛŠK‹Š^Û]O]œ™YŸYK™Ù]™]Õ[\Ü˜\žT™YŠ
KOX]ØZ]\Ë˜Ü™X]S™]Ð\X\˜[˜ÙTÝ™X[JKŠKÎÚYŠJ^Û]YK™Ù]™]Õ[\Ü˜\žT™YŠ
NÛÏ]\Ë˜Ü™X]S™]ÑXÝ
KØ\™YŽœŸJK‹œ]
‹Ù]N˜_J_Y[ÙHÏ]\Ë˜Ü™X]S™]ÑXÝ
KßJNÓ[X™\‹š\Ò[YÙ\Šœ\™[™YRY
I‰›ËœÙ]
ÝXÝ\™[œ\™[™YRY
K‹œ]
KÙ]N›ßJNÛ]Ï^Ü™YŽš_NÚYŠœÜ\
^Û]]œÜ\ÚYŠ‹™[]Y
\™]\›ˆË™[]JÜ\
KË™[]JÛÛ[Ø
KË™[]JØ
KÎÛ]O\‹œ™YŸYK™Ù]™]Õ[\Ü˜\žT™YŠ
NÜ‹œ\™[ZNÛ]Ï]‹˜Ü™X]S™]ÑXÝ
‹JNÜ™]\›ˆ‹œ]
KÙ]N˜ßJKËœÙ]Y‘Yš[™Y
ÛÛ[ØÝ
‹˜ÛÛ[ÊJKËœÙ]
Ü\JKÜËÜ™YŽ˜_W_\™]\›ˆß\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ôš[[››Ý][ÛŠK‹Š^Û]OX]ØZ]\Ë˜Ü™X]S™]Ð\X\˜[˜ÙTÝ™X[J‹ŠKO]\Ë˜Ü™X]S™]ÑXÝ
‹OÞØ\š_NžßJKÏ[™]È\Ëœ›ÝÝ\K˜ÛÛœÝXÝÜŠÙXÝ˜K™YŽ[››Ý][Û‘ÛØ˜[Î™K]˜[X]Ü“Ü[ÛœÎœ‹™]˜[X]Ü“Ü[ÛœßJNÜ™]\›ˆ‹œ™Y‰‰ŠËœ™Y[Ëœ™Y•Ô™\XÙO[‹œ™YŠKß_KžOXÛ\ÜÈH^[™ÈÞ^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›‹[››Ý][Û‘ÛØ˜[ÎœŸOYKO]\Ë™]NÝ\Ë—Û™YY\X\˜[˜Ù\ÏYK›™YY\X\˜[˜Ù\ËK˜[››Ý][Û•\O[K•ÒQÑUK™šY[˜[YOOO]›ÚY	‰ŠK™šY[˜[YO]\Ë—ØÛÛœÝXÝšY[˜[YJ
JKK˜XÝ[ÛœÏOO]›ÚY	‰ŠK˜XÝ[ÛœÏX
‹JJNÛ]O]
ÙXÝÙ^N˜˜Ù]\œ˜^NˆLJNÚK™šY[˜[YO]\Ë—ÙXÛÙQ›Ü›U˜[YJJNÛ]Ï]
ÙXÝÙ^N˜˜Ù]\œ˜^NˆLJNÚYŠK™Y˜][šY[˜[YO]\Ë—ÙXÛÙQ›Ü›U˜[YJÊKOOO]›ÚY	‰œ‹ž˜Q]\Ù]Ê^Û]O]\Ë—Ý]KœÝŽÙI‰Š\Ë—Ú\Õ˜[YQœ›ÛVOHLK™šY[˜[YOXO\‹ž˜Q]\Ù]Ë™Ù]˜[YJJJ_XOOO]›ÚY	‰šK™Y˜][šY[˜[YHOO[[	‰ŠK™šY[˜[YOZK™Y˜][šY[˜[YJKK˜[\›˜]]™U^YÙJ™Ù]
X
_
K\ËœÙ]Y˜][\X\˜[˜ÙJJKKš\Ð\X\˜[˜Ù_]\Ë—Û™YY\X\˜[˜Ù\É‰šK™šY[˜[YHOO]›ÚY	‰šK™šY[˜[YHOO[[Û]Ï]
ÙXÝÙ^N˜•JNÚK™šY[\O\È[œÝ[˜Ù[ÙˆÜË›˜[YN›[Û]Ï]
ÙXÝÙ^N˜˜JK\‹˜XÜ›Ñ›Ü›K™Ù]
˜
KO]\Ë˜\X\˜[˜ÙOË™XÝ™Ù]
™\ÛÝ\˜Ù\Ø
NÝ\Ë—ÙšY[™\ÛÝ\˜Ù\Ï^ÛØØ[™\ÛÝ\˜Ù\Î˜ËXÜ›Ñ›Ü›T™\ÛÝ\˜Ù\Î›\X\˜[˜ÙT™\ÛÝ\˜Ù\ÎKY\™ÙY™\ÛÝ\˜Ù\Î”‹›Y\™ÙJÞ™YŽ›‹XÝ\œ˜^N–ØËKKY\™ÙTÝX‘XÝÎˆLJ_KK™šY[›YÜÏ]
ÙXÝÙ^N˜™˜JK
S[X™\‹š\Ò[YÙ\ŠK™šY[›YÜÊ_K™šY[›YÜÏ
I‰ŠK™šY[›YÜÏL
KKœ\ÜÝÛÜ™]\Ëš\ÑšY[›YÊË”TÔÕÓÔ‘
KKœ™XYÛ›O]\Ëš\ÑšY[›YÊË”‘PQÓ“JKKœ™\]Z\™Y]\Ëš\ÑšY[›YÊË”‘TURT‘Q
KKšY[]\Ë—Ú\Ñ›YÊK˜[››Ý][Û‘›YÜËË’QSŠ_\Ë—Ú\Ñ›YÊK˜[››Ý][Û‘›YÜËË““Õ’QUÊ_WÙXÛÙQ›Ü›U˜[YJJ^Ü™]\›ˆ\œ˜^Kš\Ð\œ˜^JJOÙK™š[\ŠOO\[ÙˆOOXÝš[™Ø
K›X\
OO™ÙJJJN™H[œÝ[˜Ù[ÙˆÙÙJK›˜[YJN\[ÙˆOOXÝš[™ØÙÙJJN›[Z\ÑšY[›YÊJ^Ü™]\›ˆHJ\Ë™]K™šY[›YÜÉ™J_WÚ\ÕšY]ØX›JJ^Ü™]\›ˆL[]\Ý™UšY]ÙY
K
^Ü™]\›ˆÝ\ËšY]ØX›NœÝ\\‹›]\Ý™UšY]ÙY
K
I‰ˆ]\Ë—Ú\Ñ›YÊ\Ë™›YÜËË““Õ’QUÊ_YÙ]›Ý][Û“X]š^
J^Û]YOË™Ù]
\Ë™]KšY
OËœ›Ý][ÛŽÜ™]\›ˆOO]›ÚY	‰Š]\Ëœ›Ý][ÛŠKOOLÑÙN“
\ËÚY\ËšZYÚ
_YÙ]›Ü™\[™˜XÚÙÜ›Ý[™\X\˜[˜Ù\ÊJ^Û]YOË™Ù]
\Ë™]KšY
OËœ›Ý][ÛŽÚYŠOO]›ÚY	‰Š]\Ëœ›Ý][ÛŠK]\Ë˜˜XÚÙÜ›Ý[™ÛÛÜ‰‰ˆ]\Ë˜›Ü™\ÛÛÜŠ\™]\›˜Û]]OOLOOLNØ	Ý\ËÚYH	Ý\ËšZYÚH™X˜	Ý\ËšZYÚH	Ý\ËÚYH™XXÚYŠ\Ë˜˜XÚÙÜ›Ý[™ÛÛÜ‰‰ŠX	Ò›
\Ë˜˜XÚÙÜ›Ý[™ÛÛÜ‹L
_H	ÛŸHˆ
K\Ë˜›Ü™\ÛÛÜŠ^Û]O]\Ë˜›Ü™\”Ý[KÚYNÜŠÏX	Ù_HÈ	Ò›
\Ë˜›Ü™\ÛÛÜ‹LJ_H	ÛŸHÈ\™]\›ˆŸX\Þ[˜ÈÙ]Ü\˜]Ü“\Ý
K‹Š^ÚYŠ‰˜ËS““ÕUSÓ”×Ñ“Ô“TÉ‰ˆJ\È[œÝ[˜Ù[Ùˆ^JI‰ˆ]\Ë™]K››ÒS	‰ˆ]\Ë™]Kš\ÓÝÛØ[˜\Ê\™]\›žÛÜ\Ý›™]È‹Ù\\˜]Q›Ü›NˆLÙ\\˜]PØ[˜\ÎˆL_NÚYŠ]\Ë—Ú\Õ^
\™]\›ˆÝ\\‹™Ù]Ü\˜]Ü“\Ý
K‹ŠNÛ]OX]ØZ]\Ë—ÙÙ]\X\˜[˜ÙJK‹ŠNÚYŠ\Ë˜\X\˜[˜ÙI‰šOOO[[
\™]\›ˆÝ\\‹™Ù]Ü\˜]Ü“\Ý
K‹ŠNÛ]O[™]ÈŽÚYŠ]\Ë—ÙY˜][\X\˜[˜Ù_OOO[[
\™]\›žÛÜ\Ý˜KÙ\\˜]Q›Ü›NˆLKÙ\\˜]PØ[˜\ÎˆL_NÛ]ÏHHJ\Ë™]Kš\ÓÝÛØ[˜\É‰›‰˜Ë‘TÔVJKÏVÌKKKVÌ\ËÚY\ËšZYÚKOUÞJ\Ë™]Kœ™XÝÊKÝ\Ë›ØÉ‰ŠX]ØZ]Kœ\œÙSX\šÙYÛÛ[›ÜÊ\Ë›ØË[
JKOO]›ÚY	‰˜K˜YÜ
Ë˜™YÚ[“X\šÙYÛÛ[›ÜËØÐØJKK˜YÜ
Ë˜™YÚ[[››Ý][Û‹Ý\Ë™]KšY\Ë™]Kœ™XÝK\Ë™Ù]›Ý][Û“X]š^
ŠK×JNÛ][™]ÈÛŠJNÜ™]\›ˆ]ØZ]K™Ù]Ü\˜]Ü“\Ý
ÜÝ™X[N™‹\ÚÎ™\ÛÝ\˜Ù\Î\Ë—ÙšY[™\ÛÝ\˜Ù\Ë›Y\™ÙY™\ÛÝ\˜Ù\ËÜ\˜]Ü“\Ý˜_JKK˜YÜ
Ë™[™[››Ý][Û‹×JKOO]›ÚY	‰˜K˜YÜ
Ë™[™X\šÙYÛÛ[×JKÛÜ\Ý˜KÙ\\˜]Q›Ü›NˆLKÙ\\˜]PØ[˜\Î›ß_WÙÙ]RÑXÝ
J^Û][™]ÈŠ[
NÜ™]\›ˆI‰œÙ]
˜JKœÙ]Y\œ˜^JØJ\Ë˜›Ü™\ÛÛÜŠJKœÙ]Y\œ˜^J‘ØJ\Ë˜˜XÚÙÜ›Ý[™ÛÛÜŠJKœÚ^™OŒÝ›[X[Y[™Ø]™YXÝ
K
^ß\Ù]˜[YJK‹Š^Û]ÙXÝšK™YŽ˜_O[
K\Ëœ™Y‹ŠNÚYŠZJYKœÙ]
˜
NÙ[ÙHYŠ\‹š\ÊJJ^Û]OZK˜ÛÛ™J
NÜ™]\›ˆKœÙ]
˜
K‹œ]
KÙ]N™_JK_\™]\›ˆ[X\Þ[˜ÈØ]™JK‹Š^Û]O[Ë™Ù]
\Ë™]KšY
KO]\Ë—ØZ[›YÜÊOË››ÕšY]ËOË››Ôš[
KÏZOË˜[YKÏZOËœ›Ý][ÛŽÚYŠÏOO]\Ë™]K™šY[˜[Y_ÏOO]›ÚY
^ÚYŠ]\Ë—Ú\Õ˜[YQœ›ÛVI‰œÏOO]›ÚY	‰˜OOO]›ÚY
\™]\›ŽÛß]\Ë™]K™šY[˜[Y_ZYŠÏOO]›ÚY	‰ˆ]\Ë—Ú\Õ˜[YQœ›ÛVI‰\œ˜^Kš\Ð\œ˜^JÊI‰\œ˜^Kš\Ð\œ˜^J\Ë™]K™šY[˜[YJI‰žYJË\Ë™]K™šY[˜[YJI‰˜OOO]›ÚY
\™]\›ŽÜÏOO]›ÚY	‰ŠÏ]\Ëœ›Ý][ÛŠNÛ][[ÚYŠ]\Ë—Û™YY\X\˜[˜Ù\É‰ŠX]ØZ]\Ë—ÙÙ]\X\˜[˜ÙJKË”ÐU‘KŠKOO[[	‰˜OOO]›ÚY
J\™]\›ŽÛ]OHLNÛË›™YY\X\˜[˜Ù\É‰ŠOHL[[
NÛ]Þ™YŽ™OYKY™™]ÚY”™YŠ\Ëœ™YŠNÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ][™]ÈŠ
NÙ›ÜŠ]HÙˆ‹™Ù]Ù^\Ê
JYHOOXT	‰œœÙ]
K‹™Ù]˜]ÊJJNÚYŠHOO]›ÚY	‰ŠœÙ]
˜JKOO[[	‰ˆ]JJ^Û]OY‹™Ù]˜]ÊT
NÙI‰œœÙ]
TJ_[]O^Ü]\Ë™]K™šY[˜[YK˜[YN›ßK]\ËœÙ]˜[YJ\œ˜^Kš\Ð\œ˜^JÊOÛË›X\
Ý
NšÝ
ÊKŠNÝ\Ë˜[Y[™Ø]™YXÝ
‹
NÛ]Ï]\Ë—ÙÙ]RÑXÝ
ÊNÚYŠÉ‰œœÙ]
RØÊK‹œ]
\Ëœ™Y‹Ù]Nœ˜N›K™YY\X\˜[˜Ù\Î_JKOO[[
^Û]OY™Ù]™]Õ[\Ü˜\žT™YŠ
K[™]ÈŠ
NÜœÙ]
T
KœÙ]
˜JNÛ]O]\Ë—ÙÙ]Ø]™QšY[™\ÛÝ\˜Ù\Ê
KO[™]ÈÛŠ
KÏXK™XÝ[™]ÈŠ
NÛËœÙ]Y“˜[YJÝX\X›Ü›X
KËœÙ]
™\ÛÝ\˜Ù\ØJNÛ]Ï\ÉLNOLÖÌ\ËÚY\ËšZYÚN–Ì\ËšZYÚ\ËÚYNÛËœÙ]
›ÞÊNÛ]O]\Ë™Ù]›Ý][Û“X]š^
ŠNÝHOOQÙI‰›ËœÙ]
X]š^JK‹œ]
KÙ]N˜K˜N›[™YY\X\˜[˜Ù\ÎˆL_J_\œÙ]
X‰Ø™J
_X
_X\Þ[˜ÈÙÙ]\X\˜[˜ÙJ‹‹J^ÚYŠ\Ë™]Kœ\ÜÝÛÜ™
\™]\›ˆ[Û]OZOË™Ù]
\Ë™]KšY
KËÚYŠI‰ŠÏXK™›Ü›X]Y˜[Y_K˜[YKXKœ›Ý][ÛŠKOO]›ÚY	‰›ÏOO]›ÚY	‰ˆ]\Ë—Û™YY\X\˜[˜Ù\É‰Š]\Ë—Ú\Õ˜[YQœ›ÛV_\Ë˜\X\˜[˜ÙJJ\™]\›ˆ[Û]O]\Ë™Ù]›Ü™\[™˜XÚÙÜ›Ý[™\X\˜[˜Ù\ÊJNÚYŠÏOO]›ÚY	‰ŠÏ]\Ë™]K™šY[˜[YK[Ê_
\œ˜^Kš\Ð\œ˜^JÊI‰›Ë›[™ÝOOLI‰ŠÏ[ÖÌJKJ\[ÙˆÏOXÝš[™Ø‘^XÝY˜[YXÈ™HHÝš[™ËˆŠKÏ[Ëš[Q[™

K\Ë™]K˜ÛÛX›É‰ŠÏ]\Ë™]K›Ü[ÛœË™š[™

Ù^Ü˜[YN™_JOO›ÏOOYJOË™\Ü^U˜[Y_ÊKÏOOX
J\™]\›˜Õ“PÈH	Ý_THSPØÛOO]›ÚY	‰Š]\Ëœ›Ý][ÛŠNÛ]KLKŽÝ\Ë™]K›][S[™OÊ[ËœÜ]
×—ß‹ÊK›X\
OO™K››Ü›X[^™J‘Ø
JKY‹›[™Ý
N™VÛËœ™\XÙJ×—ß‹Ë
K››Ü›X[^™J‘Ø
WNÛ]ÝÚYœZYÚ›_O]\ÎÊOONLOOLÌ
I‰ŠÜWOVÛKJK\Ë—ÙY˜][\X\˜[˜Ù_
\Ë™]K™Y˜][\X\˜[˜ÙQ]OQÛ
\Ë—ÙY˜][\X\˜[˜ÙOXÒ[™]XØHˆØ
JNÛ]X]ØZ]K—ÙÙ]›Û]J‹\Ë™]K™Y˜][\X\˜[˜ÙQ]K\Ë—ÙšY[™\ÛÝ\˜Ù\Ë›Y\™ÙY™\ÛÝ\˜Ù\ÊKËË‹OV×KHLNÙ›ÜŠ]HÙˆŠ^Û]Z™[˜ÛÙTÝš[™ÊJNÝ›[™ÝŒI‰ŠHL
KKœ\Ú
š›Ú[Š
J_ZYŠ‰‰œ‰˜Ë”ÐU‘J\™]\›žÛ™YY\X\˜[˜Ù\ÎˆLNÚYŠ‰‰\Ë—Ú\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜY
^Û]]\Ë™]K˜ÛÛXØ[Û›ÜÜXÙX˜Ø[œË\Ù\šY˜O[™]È
ž™Y‹ŠKOZK˜Ü™X]Q›Û™\ÛÝ\˜Ù\Ê‹š›Ú[Š
JKÏXK™Ù]˜]Ê›Û
NÚYŠ\Ë—ÙšY[™\ÛÝ\˜Ù\Ë›Y\™ÙY™\ÛÝ\˜Ù\Ëš\Ê›Û
J^Û]O]\Ë—ÙšY[™\ÛÝ\˜Ù\Ë›Y\™ÙY™\ÛÝ\˜Ù\Ë™Ù]
›Û
NÙ›ÜŠ]ÙˆË™Ù]Ù^\Ê
JYKœÙ]
Ë™Ù]˜]Ê
J_Y[ÙH\Ë—ÙšY[™\ÛÝ\˜Ù\Ë›Y\™ÙY™\ÛÝ\˜Ù\ËœÙ]
›ÛÊNÛ]ÏZK™›Û˜[YK›˜[YNÚX]ØZ]K—ÙÙ]›Û]J‹Ù›Û˜[YN˜Ë›ÛÚ^™NŒKJNÙ›ÜŠ]OL^K›[™ÝÙOÙJÊÊ^VÙWOS]
–ÙWJNÛ]SØš™XÝ˜\ÜÚYÛŠØš™XÝ˜Ü™X]J[
K\Ë™]K™Y˜][\X\˜[˜ÙQ]JNÝ\Ë™]K™Y˜][\X\˜[˜ÙQ]K™›ÛÚ^™OL\Ë™]K™Y˜][\X\˜[˜ÙQ]K™›Û˜[YOXËÙËË—O]\Ë—ØÛÛ\]Q›ÛÚ^™JKL‹MË
K\Ë™]K™Y˜][\X\˜[˜ÙQ]O[Y[ÙH\Ë—Ú\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜYJÙÙ]\X\˜[˜ÙNˆÙ™œØÜ™Y[Ø[˜\È\È›ÝÝ\ÜY[››Ý][ÛˆX^H›Ý™[™\ˆÛÜœ™XÝK˜
KÙËË—O]\Ë—ØÛÛ\]Q›ÛÚ^™JKL‹MË
NÛ]Z™\ØÙ[ÞZ\Ó˜SŠ
OÜÊŽ“X]›X^
Ê‹X]˜XœÊ
J—ÊNÛ]ÏSX]›Z[ŠX]™›ÛÜŠ
KWÊKÌŠKJKÏ]\Ë™]K^[YÛ›Y[ÚYŠ\Ë™]K›][S[™J\™]\›ˆ\Ë—ÙÙ]][[[™P\X\˜[˜ÙJËKËKË‹Ë‹JNÚYŠ\Ë™]K˜ÛÛXŠ\™]\›ˆ\Ë—ÙÙ]ÛÛX\X\˜[˜ÙJËVÌKËK‹Ë‹JNÛ]ÏTÊÞÚYŠÏOOLÏŒŠ\™]\›˜Õ“PÈH	Ý_P•
ÙÊØHH	Ñ
Š_H	Ñ
Ê_HH
	Ý
VÌJ_JHˆUHSPØÛ]]\Ë—Ü™[™\•^
VÌKËËÜÚYŒK‹ÊNÜ™]\›˜Õ“PÈH	Ý_P•
ÙÊØHHH	ÕHUHSPØ\Ý]XÈ\Þ[˜ÈÙÙ]›Û]JK‹Š^Û]O[™]È‹O^Ù›Û›[ÛÛ™J
^Ü™]\›ˆ\ß_KÙ›Û˜[YN›Ë›ÛÚ^™NœßO[ŽÜ™]\›ˆ]ØZ]Kš[™TÙ]›Û
‹ÛÉ‰“™Ù]
ÊK×K[KK[
KK™›ÛWÙÙ]^ÚY
K
^Ü™]\›ˆX]œÝ[T™XÚ\ÙJ˜Ú\œÕÑÛ\ÊJK›X\
OO™KÚY
JKÌYLßWØÛÛ\]Q›ÛÚ^™JK‹‹J^Û]Ù›ÛÚ^™N›ßO]\Ë™]K™Y˜][\X\˜[˜ÙQ]KÏJßLŠJ˜KÏSX]œ›Ý[™
KÜÊNÚYŠ[Ê^Û]YOO“X]™›ÛÜŠJŒL
KÌLÚYŠOOOKLJ^Û]O]\Ë—ÙÙ]^ÚY
‹ŠNÛÏ[
X]›Z[ŠKØKÚJJKÏL_Y[Ù^Û]O[‹œÜ]
×—ß‹ÊKV×NÙ›ÜŠ]HÙˆJ^Û]\‹™[˜ÛÙTÝš[™ÊJKš›Ú[Š
K\‹˜Ú\œÕÑÛ\Ê
KO\‹™Ù]Ú\”ÜÚ][ÛœÊ
NÙœ\Ú
Û[™NÛ\Î›‹ÜÚ][ÛœÎš_J_[][OžÛ]OLÙ›ÜŠ]HÙˆ
^Û]Ï]\Ë—ÜÜ][™J[‹‹JNÚYŠJÏ[Ë›[™Ý
›‹O™J\™]\›ˆL\™]\›ˆL_NÙ›ÜŠÏSX]›X^
ËJNÎÊ^ÚYŠÏYKØËÏ[
ËØJKŠÊJ^ØÊÊÎØÛÛ[Y_Xœ™XZß_[]Ù›Û˜[YNK›ÛÛÛÜŽ™O]\Ë™]K™Y˜][\X\˜[˜ÙQ]NÝ\Ë—ÙY˜][\X\˜[˜ÙOV[
Ù›ÛÚ^™N›Ë›Û˜[YNK›ÛÛÛÜŽ™J_\™]\›–Ý\Ë—ÙY˜][\X\˜[˜ÙKËKØ×_WÜ™[™\•^
K‹‹KKËÊ^Û]ÎØÏZOOOLOÊ‹]\Ë—ÙÙ]^ÚY
K
J›ŠKÌŽšOOOLÜ‹]\Ë—ÙÙ]^ÚY
K
J›‹[Î›ÎÛ]Q
ËXKœÚY
NÜ™]\›ˆKœÚYXËÏQ
ÊK	ÛH	ÜßH
	Ý
J_JH˜WÙÙ]Ø]™QšY[™\ÛÝ\˜Ù\ÊJ^Û]ÛØØ[™\ÛÝ\˜Ù\Î\X\˜[˜ÙT™\ÛÝ\˜Ù\Î›‹XÜ›Ñ›Ü›T™\ÛÝ\˜Ù\ÎœŸO]\Ë—ÙšY[™\ÛÝ\˜Ù\ËO]\Ë™]K™Y˜][\X\˜[˜ÙQ]OË™›Û˜[YNÚYŠZJ\™]\›ˆ‹™[\NÙ›ÜŠ]HÙ–Ý—JZYŠH[œÝ[˜Ù[ÙˆŠ^Û]YK™Ù]
›Û
NÚYŠ[œÝ[˜Ù[Ùˆ‰‰š\ÊJJ\™]\›ˆ_ZYŠˆ[œÝ[˜Ù[ÙˆŠ^Û]\‹™Ù]
›Û
NÚYŠˆ[œÝ[˜Ù[Ùˆ‰‰›‹š\ÊJJ^Û][™]ÈŠJNÜ‹œÙ]
K‹™Ù]˜]ÊJJNÛ]O[™]ÈŠJNÜ™]\›ˆKœÙ]
›ÛŠK‹›Y\™ÙJÞ™YŽ™KXÝ\œ˜^N–ØKKY\™ÙTÝX‘XÝÎˆLJ__\™]\›ˆ‹™[\_YÙ]šY[Øš™XÝ

^Ü™]\›ˆ[_K^OXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝOYNÝš\ÊQ
I‰Š\Ë™›YÜßYË’QS‹\Ë™]KšY[HLJ˜\˜ÛÙ\È\™H›ÝÝ\ÜY
JK\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]Kœ™XYÛ›I‰ˆ]\Ë™]K››ÒS\Ë—Ú\Õ^HL\[Ùˆ\Ë™]K™šY[˜[YHOXÝš[™Ø	‰Š\Ë™]K™šY[˜[YOX
NÛ]]
ÙXÝÙ^N˜XJNÊS[X™\‹š\Ò[YÙ\ŠŠ_ŒŠI‰Š[[
K\Ë™]K^[YÛ›Y[[ŽÛ]]
ÙXÝÙ^N˜X^[˜JNÊS[X™\‹š\Ò[YÙ\ŠŠ_
I‰ŠL
K\Ë™]K›X^[\‹\Ë™]K›][S[™O]\Ëš\ÑšY[›YÊË“USSS‘JK\Ë™]K˜ÛÛX]\Ëš\ÑšY[›YÊËÓÓPŠI‰ˆ]\Ë™]K›][S[™I‰ˆ]\Ë™]Kœ\ÜÝÛÜ™	‰ˆ]\Ëš\ÑšY[›YÊË‘’STÑSPÕ
I‰\Ë™]K›X^[ˆOOL\Ë™]K™Ó›ÝØÜ›Û]\Ëš\ÑšY[›YÊË‘Ó“ÕÐÔ“Ó
NÛ]Ù]NžØXÝ[ÛœÎš__O]\ÎÚYŠZJ\™]\›ŽÛ]OK×QŠ]_[YJWÊÎ’Ù^\Ý›ÚÙ_›Ü›X]
JÎ‘^
O×
×	È—OÊ×—	È—JÊV×	È—O×
NÉËÏHLNÊK‘›Ü›X]Ë›[™ÝOOLI‰šK’Ù^\Ý›ÚÙOË›[™ÝOOLI‰˜K\Ý
K‘›Ü›X]ÌJI‰˜K\Ý
K’Ù^\Ý›ÚÙVÌJ_K‘›Ü›X]Ë›[™ÝOOL	‰šK’Ù^\Ý›ÚÙOË›[™ÝOOLI‰˜K\Ý
K’Ù^\Ý›ÚÙVÌJ_K’Ù^\Ý›ÚÙOË›[™ÝOOL	‰šK‘›Ü›X]Ë›[™ÝOOLI‰˜K\Ý
K‘›Ü›X]ÌJJI‰ŠÏHL
NÛ]ÏV×NÚK‘›Ü›X]	‰œËœ\Ú
‹‹šK‘›Ü›X]
KK’Ù^\Ý›ÚÙI‰œËœ\Ú
‹‹šK’Ù^\Ý›ÚÙJKÉ‰Š[]HK’Ù^\Ý›ÚÙKK‘›Ü›X]\ÊNÙ›ÜŠ]HÙˆÊ^Û]YK›X]Ú
JNÚYŠ]
XÛÛ[YNÛ]]ÌWOOOX]X]Ì—KO\\œÙR[
‹L
NÚYŠZ\Ó˜SŠJI‰“X]™›ÛÜŠX]›ÙÌL
JJJÌOOO]Ì—K›[™Ý	‰ŠJÖ›”[
VÚWOÏÜŠK\Ë™]K™]][YQ›Ü›X]\‹[ÊXœ™XZÎÚYŠŠ^ËÒS_ÜßË\Ý
ŠOÊ\Ë™]K™]][YU\OX]][YK[ØØ[\Ë™]K[YTÝ\KÜÜËË\Ý
ŠOÌNŒ
N\Ë™]K™]][YU\OX]XØœ™XZß]\Ë™]K™]][YU\OX[YX\Ë™]K[YTÝ\KÜÜËË\Ý
ŠOÌNŒØœ™XZß_YÙ]\Õ^ÛÛ[

^Ü™]\›ˆH]\Ë˜\X\˜[˜ÙI‰ˆ]\Ë—Û™YY\X\˜[˜Ù\ßWÙÙ]ÛÛX\X\˜[˜ÙJK‹‹KKËËËJ^Û]ZKÝ\Ë™]K›X^[‹]\Ë™Ù]›Ü™\[™˜XÚÙÜ›Ý[™\X\˜[˜Ù\ÊJKV×KO]™Ù]Ú\”ÜÚ][ÛœÊŠNÙ›ÜŠ]ÙK[ÙˆJ\œ\Ú

	Ý
‹œÝXœÝš[™ÊK
J_JH˜
NÛ]\š›Ú[Š	Ñ

_H
NÜ™]\›˜Õ“PÈH	ÙŸP•
ÙJØHH	Ñ
Ê_H	Ñ
ÊØÊ_HH	ÚHUHSPØWÙÙ]][[[™P\X\˜[˜ÙJK‹‹KKËËËK
^Û]V×KZKLŠœËO^ÜÚYŒNÙ›ÜŠ]OLO]›[™ÝÙONÙJÊÊ^Û]O]ÙWK]\Ë—ÜÜ][™JK‹‹
NÙ›ÜŠ]LOY›[™ÝÝNÝ
ÊÊ^Û]OYÝKYOOOL	‰OOLËXËJK[
N‹]NÙ‹œ\Ú
\Ë—Ü™[™\•^
K‹‹KËKË
J__[]]\Ë™Ù]›Ü™\[™˜XÚÙÜ›Ý[™\X\˜[˜Ù\Ê
KÏY‹š›Ú[Š˜
NÜ™]\›˜Õ“PÈH	ÚP•
ÙJØHH	Ñ
J_HH	ÙßHUHSPØWÜÜ][™JK‹‹O^ßJ^ÙOZK›[™_NÛ]OZK™Û\ß˜Ú\œÕÑÛ\ÊJNÚYŠK›[™ÝLJ\™]\›–ÙWNÛ]ÏZKœÜÚ][Ûœß™Ù]Ú\”ÜÚ][ÛœÊJKÏ[‹ÌYLËÏV×KKLKOKLKKLKLLÙ›ÜŠ]LXK›[™ÝÝŽÝ
ÊÊ^Û]Û‹WO[ÖÝKOXVÝK[KÚY
œÎÛK[šXÛÙOOOXÜ
ÚœÊËœ\Ú
KœÝXœÝš[™Ê‹ŠJK[‹ZKLKKLJNŠ
ÏZ[‹OZK]
Nœ
ÚœÛOOKLOÊËœ\Ú
KœÝXœÝš[™Ê‹ŠJK[‹Z
NŠËœ\Ú
KœÝXœÝš[™Ê‹JJK]KY
ÌKKLKL
Nœ
ÏZ\™]\›ˆK›[™Ý	‰˜Ëœ\Ú
KœÝXœÝš[™Ê‹K›[™Ý
JKßX\Þ[˜È^˜XÝ^ÛÛ[
KŠ^Ø]ØZ]Ý\\‹™^˜XÝ^ÛÛ[
KŠNÛ]]\Ë™]K^ÛÛ[ÚYŠ\Š\™]\›ŽÛ]O\‹š›Ú[Š˜
NÚYŠOOO]\Ë™]K™šY[˜[YJ\™]\›ŽÛ]OZKœ™\XÙP[
ÊËŠŠÏ×‰ßJ
_×WJ_
ÊÊKÙË
K
OOØ	ÝX˜ÊØ
NÔ™YÑ^
—Ê‰Ø_WÊ‰
K\Ý
\Ë™]K™šY[˜[YJI‰Š\Ë™]K^ÛÛ[]\Ë™]K™šY[˜[YKœÜ]
˜
J_YÙ]šY[Øš™XÝ

^Ü™]\›žÚY\Ë™]KšY˜[YN\Ë™]K™šY[˜[YKY˜][˜[YN\Ë™]K™Y˜][šY[˜[Y_][[[™N\Ë™]K›][S[™K\ÜÝÛÜ™\Ë™]Kœ\ÜÝÛÜ™Ú\“[Z]\Ë™]K›X^[‹ÛÛXŽ\Ë™]K˜ÛÛX‹Y]X›Nˆ]\Ë™]Kœ™XYÛ›KY[Ž\Ë™]KšY[‹˜[YN\Ë™]K™šY[˜[YK™XÝ\Ë™]Kœ™XÝXÝ[ÛœÎ\Ë™]K˜XÝ[ÛœËYÙN\Ë™]KœYÙR[™^Ý›ÚÙPÛÛÜŽ\Ë™]K˜›Ü™\ÛÛÜ‹š[ÛÛÜŽ\Ë™]K˜˜XÚÙÜ›Ý[™ÛÛÜ‹›Ý][ÛŽ\Ëœ›Ý][Û‹]][YQ›Ü›X]\Ë™]K™]][YQ›Ü›X]\Ñ]][YRSˆH]\Ë™]K™]][YU\K\N˜^__KOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë˜ÚXÚÙY\X\˜[˜ÙO[[\Ë[˜ÚXÚÙY\X\˜[˜ÙO[[Û]]\Ëš\ÑšY[›YÊË”QSÊK]\Ëš\ÑšY[›YÊË”TÒ•UÓŠNÝ\Ë™]K˜ÚXÚÐ›ÞH]	‰ˆ[‹\Ë™]Kœ˜Y[Ð]Û]	‰ˆ[‹\Ë™]Kœ\Ú]Û[‹\Ë™]Kš\ÕÛÛ\Û›OHLK\Ë™]K˜ÚXÚÐ›ÞÝ\Ë—Ü›ØÙ\ÜÐÚXÚÐ›Þ
JN\Ë™]Kœ˜Y[Ð]ÛÝ\Ë—Ü›ØÙ\ÜÔ˜Y[Ð]ÛŠJN\Ë™]Kœ\Ú]ÛÊ\Ë™]Kš\ÓÝÛØ[˜\ÏHL\Ë™]K››ÒSHLK\Ë—Ü›ØÙ\ÜÔ\Ú]ÛŠJJNJ[˜[YšY[›YÜÈ›Üˆ]ÛˆÚYÙ][››Ý][Û˜
_X\Þ[˜ÈÙ]Ü\˜]Ü“\Ý
K‹Š^ÚYŠ\Ë™]Kœ\Ú]ÛŠ\™]\›ˆÝ\\‹™Ù]Ü\˜]Ü“\Ý
K‹LKŠNÛ]O[[O[[ÚYŠŠ^Û]O\‹™Ù]
\Ë™]KšY
NÚOYOÙK˜[YN›[OYOÙKœ›Ý][ÛŽ›[ZYŠOOO[[	‰\Ë˜\X\˜[˜ÙJ\™]\›ˆÝ\\‹™Ù]Ü\˜]Ü“\Ý
K‹ŠNÚOÏÏ]\Ë™]K˜ÚXÚÐ›ÞÝ\Ë™]K™šY[˜[YOOO]\Ë™]K™^Ü˜[YN\Ë™]K™šY[˜[YOOO]\Ë™]K˜]Û•˜[YNÛ]ÏZOÝ\Ë˜ÚXÚÙY\X\˜[˜ÙN\Ë[˜ÚXÚÙY\X\˜[˜ÙNÚYŠÊ^Û]O]\Ë˜\X\˜[˜ÙKÏ\
Ë™XÝ™Ù]\œ˜^JX]š^
KÙJNØI‰›Ë™XÝœÙ]
X]š^\Ë™Ù]›Ý][Û“X]š^
ŠJK\Ë˜\X\˜[˜ÙO[ÎÛ]Ï\Ý\\‹™Ù]Ü\˜]Ü“\Ý
K‹ŠNÜ™]\›ˆ\Ë˜\X\˜[˜ÙOZKË™XÝœÙ]
X]š^ÊKß\™]\›žÛÜ\Ý›™]È‹Ù\\˜]Q›Ü›NˆLKÙ\\˜]PØ[˜\ÎˆL__X\Þ[˜ÈØ]™JK‹Š^ÚYŠ\Ë™]K˜ÚXÚÐ›Þ
^Ý\Ë—ÜØ]™PÚXÚØ›Þ
K‹ŠNÜ™]\›Ÿ]\Ë™]Kœ˜Y[Ð]Û‰‰\Ë—ÜØ]™T˜Y[Ð]ÛŠK‹Š_X\Þ[˜ÈÜØ]™PÚXÚØ›Þ
K‹Š^ÚYŠ[Š\™]\›ŽÛ]O[‹™Ù]
\Ë™]KšY
KO]\Ë—ØZ[›YÜÊOË››ÕšY]ËOË››Ôš[
KÏZOËœ›Ý][Û‹ÏZOË˜[YNÚYŠÏOO]›ÚY	‰˜OOO]›ÚY	‰ŠÏOO]›ÚY\Ë™]K™šY[˜[YOOO]\Ë™]K™^Ü˜[YOOO\ÊJ\™]\›ŽÛ]ÏYKž™Y‹™™]ÚY”™YŠ\Ëœ™YŠNÚYŠJÈ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽØÏXË˜ÛÛ™J
KÏOO]›ÚY	‰ŠÏ]\Ëœ›Ý][ÛŠKÏOO]›ÚY	‰ŠÏ]\Ë™]K™šY[˜[YOOO]\Ë™]K™^Ü˜[YJNÛ]^Ü]\Ë™]K™šY[˜[YK˜[YNœÏÝ\Ë™]K™^Ü˜[YN˜KOS™Ù]
ÏÝ\Ë™]K™^Ü˜[YN˜Ù™˜
NÝ\ËœÙ]˜[YJËKKž™Y‹ŠKËœÙ]
TØJKËœÙ]
X‰Ø™J
_X
KHOO]›ÚY	‰˜ËœÙ]
˜JNÛ]]\Ë—ÙÙ]RÑXÝ
ÊNÙ	‰˜ËœÙ]
RØ
K‹œ]
\Ëœ™Y‹Ù]N˜Ë˜N›™YY\X\˜[˜Ù\ÎˆL_J_X\Þ[˜ÈÜØ]™T˜Y[Ð]ÛŠK‹Š^ÚYŠ[Š\™]\›ŽÛ]O[‹™Ù]
\Ë™]KšY
KO]\Ë—ØZ[›YÜÊOË››ÕšY]ËOË››Ôš[
KÏZOËœ›Ý][Û‹ÏZOË˜[YNÚYŠÏOO]›ÚY	‰˜OOO]›ÚY	‰ŠÏOO]›ÚY\Ë™]K™šY[˜[YOOO]\Ë™]K˜]Û•˜[YOOO\ÊJ\™]\›ŽÛ]ÏYKž™Y‹™™]ÚY”™YŠ\Ëœ™YŠNÚYŠJÈ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽØÏXË˜ÛÛ™J
KÏOO]›ÚY	‰ŠÏ]\Ë™]K™šY[˜[YOOO]\Ë™]K˜]Û•˜[YJKÏOO]›ÚY	‰ŠÏ]\Ëœ›Ý][ÛŠNÛ]^Ü]\Ë™]K™šY[˜[YK˜[YNœÏÝ\Ë™]K˜]Û•˜[YN˜KOS™Ù]
ÏÝ\Ë™]K˜]Û•˜[YN˜Ù™˜
NÜÉ‰\ËœÙ]˜[YJËKKž™Y‹ŠKËœÙ]
TØJKËœÙ]
X‰Ø™J
_X
KHOO]›ÚY	‰˜ËœÙ]
˜JNÛ]]\Ë—ÙÙ]RÑXÝ
ÊNÙ	‰˜ËœÙ]
RØ
K‹œ]
\Ëœ™Y‹Ù]N˜Ë˜N›™YY\X\˜[˜Ù\ÎˆL_J_WÙÙ]Y˜][ÚXÚÙY\X\˜[˜ÙJK
^Û]ÝÚY›‹ZYÚœŸO]\ËOVÌ‹—KOSX]›Z[Š‹ŠJ‹ŽËÎÝOOXÚXÚØÊÏ^ÝÚY‹ÍMJ˜KZYÚ‹ÌJ˜_KÏXØ
NOOX\ØØÊÏ^ÝÚY‹ÎLJ˜KZYÚ‹ÌJ˜_KÏX
NšŠÙÙ]Y˜][ÚXÚÙY\X\˜[˜ÙHH[œÝ\ÜY\Nˆ	ÝX
NÛ]ÏXH•Ô’œÖ˜Qˆ	Ø_HˆÈ	Ñ

‹[ËÚY
KÌŠ_H	Ñ

‹[ËšZYÚ
KÌŠ_H
	ÜßJHˆUX[™]ÈŠKž™YŠNÛœÙ]
›Ü›U\XJKœÙ]Y“˜[YJÝX\X›Ü›X
KœÙ]Y“˜[YJ\XØš™XÝ
KœÙ]
›ÞJKœÙ]
X]š^ÌKKJKœÙ]
[™ÝË›[™Ý
NÛ]O[™]ÈŠKž™YŠK[™]ÈŠKž™YŠNÙœÙ]
’œÖ˜Q˜\Ë™˜[˜XÚÑ›ÛXÝ
KKœÙ]
›Û
KœÙ]
™\ÛÝ\˜Ù\ØJK\Ë˜ÚXÚÙY\X\˜[˜ÙO[™]ÈÛŠÊK\Ë˜ÚXÚÙY\X\˜[˜ÙK™XÝ[\Ë—ÜÝ™X[\Ëœ\Ú
\Ë˜ÚXÚÙY\X\˜[˜ÙJ_WÜ›ØÙ\ÜÐÚXÚÐ›Þ
J^Û]YK™XÝ™Ù]
T
NÚYŠJ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]]™Ù]
˜
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]]\Ë—ÙXÛÙQ›Ü›U˜[YJK™XÝ™Ù]
TØ
JNÝ\[ÙˆOXÝš[™Ø	‰Š\Ë™]K™šY[˜[YO\ŠNÛ]O]\Ë™]K™šY[˜[YHOO[[	‰\Ë™]K™šY[˜[YHOOXÙ™˜Ý\Ë™]K™šY[˜[YN˜Y\ØO]\Ë—ÙXÛÙQ›Ü›U˜[YJ‹™Ù]Ù^\Ê
JNÚYŠK›[™ÝOOL
XKœ\Ú
Ù™˜JNÙ[ÙHYŠK›[™ÝOOLJXVÌOOOXÙ™˜ØKœ\Ú
JN˜K[œÚY
Ù™˜
NÙ[ÙHYŠKš[˜ÛY\ÊJJXK›[™ÝLKœ\Ú
Ù™˜JNÙ[Ù^Û]OXK™š[™
OO™HOOXÙ™˜
NØK›[™ÝLKœ\Ú
Ù™˜J_XKš[˜ÛY\Ê\Ë™]K™šY[˜[YJ_
\Ë™]K™šY[˜[YOXÙ™˜
K\Ë™]K™^Ü˜[YOXVÌWNÛ]Ï[‹™Ù]
\Ë™]K™^Ü˜[YJNÝ\Ë˜ÚXÚÙY\X\˜[˜ÙO[È[œÝ[˜Ù[ÙˆÛÎ›[Û]Ï[‹™Ù]
Ù™˜
NÝ\Ë[˜ÚXÚÙY\X\˜[˜ÙO\È[œÝ[˜Ù[ÙˆÜÎ›[\Ë˜ÚXÚÙY\X\˜[˜ÙOÝ\Ë—ÜÝ™X[\Ëœ\Ú
\Ë˜ÚXÚÙY\X\˜[˜ÙJN\Ë—ÙÙ]Y˜][ÚXÚÙY\X\˜[˜ÙJKÚXÚØ
K\Ë[˜ÚXÚÙY\X\˜[˜ÙI‰\Ë—ÜÝ™X[\Ëœ\Ú
\Ë[˜ÚXÚÙY\X\˜[˜ÙJK\Ë—Ù˜[˜XÚÑ›ÛXÝ]\Ë™˜[˜XÚÑ›ÛXÝ\Ë™]K™Y˜][šY[˜[YOOO[[	‰Š\Ë™]K™Y˜][šY[˜[YOXÙ™˜
_WÜ›ØÙ\ÜÔ˜Y[Ð]ÛŠJ^Ý\Ë™]K˜]Û•˜[YO[[Û]YK™XÝ™Ù]
\™[
NÚYŠ[œÝ[˜Ù[ÙˆŠ^Ý\Ëœ\™[YK™XÝ™Ù]˜]Ê\™[
NÛ]]™Ù]
˜
NÛˆ[œÝ[˜Ù[Ùˆ	‰Š\Ë™]K™šY[˜[YO]\Ë—ÙXÛÙQ›Ü›U˜[YJŠJ_[]YK™XÝ™Ù]
T
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ][‹™Ù]
˜
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÙ›ÜŠ]HÙˆ‹™Ù]Ù^\Ê
JZYŠHOOXÙ™˜
^Ý\Ë™]K˜]Û•˜[YO]\Ë—ÙXÛÙQ›Ü›U˜[YJJNØœ™XZß[]O\‹™Ù]
\Ë™]K˜]Û•˜[YJNÝ\Ë˜ÚXÚÙY\X\˜[˜ÙOZH[œÝ[˜Ù[ÙˆÚN›[Û]O\‹™Ù]
Ù™˜
NÝ\Ë[˜ÚXÚÙY\X\˜[˜ÙOXH[œÝ[˜Ù[ÙˆØN›[\Ë˜ÚXÚÙY\X\˜[˜ÙOÝ\Ë—ÜÝ™X[\Ëœ\Ú
\Ë˜ÚXÚÙY\X\˜[˜ÙJN\Ë—ÙÙ]Y˜][ÚXÚÙY\X\˜[˜ÙJK\ØØ
K\Ë[˜ÚXÚÙY\X\˜[˜ÙI‰\Ë—ÜÝ™X[\Ëœ\Ú
\Ë[˜ÚXÚÙY\X\˜[˜ÙJK\Ë—Ù˜[˜XÚÑ›ÛXÝ]\Ë™˜[˜XÚÑ›ÛXÝ\Ë™]K™Y˜][šY[˜[YOOO[[	‰Š\Ë™]K™Y˜][šY[˜[YOXÙ™˜
_WÜ›ØÙ\ÜÔ\Ú]ÛŠJ^Û]ÙXÝ[››Ý][Û‘ÛØ˜[Î›ŸOYNÚYŠ]š\ÊX
I‰ˆ]š\ÊPX
I‰ˆ]\Ë™]K˜[\›˜]]™U^
^ÐJ\Ú]ÛœÈÚ]Ý]XÝ[ÛˆXÝ[Û˜\šY\È\™H›ÝÝ\ÜY
NÜ™]\›Ÿ]\Ë™]Kš\ÕÛÛ\Û›OH]š\ÊX
I‰ˆ]š\ÊPX
KKœ\œÙQ\ÝXÝ[Û˜\žJÙ\ÝXÝ™\Ý[ØšŽ\Ë™]KØÐ˜\ÙU\››‹˜˜\ÙU\›ØÐ]XÚY[Î›‹˜]XÚY[ßJ_YÙ]šY[Øš™XÝ

^Û]OX]Û˜Ü™]\›ˆ\Ë™]K˜ÚXÚÐ›ÞÊOXÚXÚØ›Þ]\Ë™]K™^Ü˜[YJN\Ë™]Kœ˜Y[Ð]Û‰‰ŠOX˜Y[Ø]Û˜]\Ë™]K˜]Û•˜[YJKÚY\Ë™]KšY˜[YN\Ë™]K™šY[˜[Y_Ù™˜Y˜][˜[YN\Ë™]K™Y˜][šY[˜[YK^Ü˜[Y\ÎY]X›Nˆ]\Ë™]Kœ™XYÛ›K˜[YN\Ë™]K™šY[˜[YK™XÝ\Ë™]Kœ™XÝY[Ž\Ë™]KšY[‹XÝ[ÛœÎ\Ë™]K˜XÝ[ÛœËYÙN\Ë™]KœYÙR[™^Ý›ÚÙPÛÛÜŽ\Ë™]K˜›Ü™\ÛÛÜ‹š[ÛÛÜŽ\Ë™]K˜˜XÚÙÜ›Ý[™ÛÛÜ‹›Ý][ÛŽ\Ëœ›Ý][Û‹\N™__YÙ]˜[˜XÚÑ›ÛXÝ

^Û]O[™]ÈŽÜ™]\›ˆKœÙ]Y“˜[YJ˜\ÙQ›Û˜\‘[™Ø˜]Ø
KKœÙ]Y“˜[YJ\X˜[˜XÚÕ\X
KKœÙ]Y“˜[YJÝX\X˜[˜XÚÕ\X
KKœÙ]Y“˜[YJ[˜ÛÙ[™Ø˜\‘[™Ø˜]Ñ[˜ÛÙ[™Ø
KŠ\Ë˜[˜XÚÑ›ÛXÝJ__KžOXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÝ\Ëš[™XÙ\Ï]™Ù]\œ˜^JX
K\Ëš\Ò[™XÙ\ÏP\œ˜^Kš\Ð\œ˜^J\Ëš[™XÙ\ÊI‰\Ëš[™XÙ\Ë›[™ÝŒ\Ë™]K›Ü[ÛœÏV×NÛ]]
ÙXÝÙ^N˜ÜJNÚYŠ\œ˜^Kš\Ð\œ˜^JŠJY›ÜŠ]OL\‹›[™ÝÙOÙJÊÊ^Û][‹™™]ÚY”™YŠ–ÙWJKOP\œ˜^Kš\Ð\œ˜^J
NÝ\Ë™]K›Ü[ÛœÖÙWO^Ù^Ü˜[YN\Ë—ÙXÛÙQ›Ü›U˜[YJOÛ‹™™]ÚY”™YŠÌJN
K\Ü^U˜[YN\Ë—ÙXÛÙQ›Ü›U˜[YJOÛ‹™™]ÚY”™YŠÌWJN
__ZYŠ]\Ëš\Ò[™XÙ\Ê]\[Ùˆ\Ë™]K™šY[˜[YOOXÝš[™ØÝ\Ë™]K™šY[˜[YOVÝ\Ë™]K™šY[˜[YWN\Ë™]K™šY[˜[Y_V×NÙ[Ù^Ý\Ë™]K™šY[˜[YOV×NÛ]O]\Ë™]K›Ü[ÛœË›[™ÝÙ›ÜŠ]Ùˆ\Ëš[™XÙ\ÊS[X™\‹š\Ò[YÙ\Š
I‰L	‰I‰\Ë™]K™šY[˜[YKœ\Ú
\Ë™]K›Ü[ÛœÖÝK™^Ü˜[YJ_]\Ë™]K›Ü[ÛœË›[™ÝOOL	‰\Ë™]K™šY[˜[YK›[™ÝŒ	‰Š\Ë™]K›Ü[ÛœÏ]\Ë™]K™šY[˜[YK›X\
OOŠÙ^Ü˜[YN™K\Ü^U˜[YN™_JJJK\Ë™]K˜ÛÛX›Ï]\Ëš\ÑšY[›YÊËÓÓP“ÊK\Ë™]K›][TÙ[XÝ]\Ëš\ÑšY[›YÊË“USTÑSPÕ
K\Ë—Ú\Õ^HLYÙ]šY[Øš™XÝ

^Û]O]\Ë™]K˜ÛÛX›ÏØÛÛX›Ø›Þ˜\Ý›Þ]\Ë™]K™šY[˜[YK›[™ÝŒÝ\Ë™]K™šY[˜[YVÌN›[Ü™]\›žÚY\Ë™]KšY˜[YNY˜][˜[YN\Ë™]K™Y˜][šY[˜[YKY]X›Nˆ]\Ë™]Kœ™XYÛ›K˜[YN\Ë™]K™šY[˜[YK™XÝ\Ë™]Kœ™XÝ[R][\Î\Ë™]K™šY[˜[YK›[™Ý][\TÙ[XÝ[ÛŽ\Ë™]K›][TÙ[XÝY[Ž\Ë™]KšY[‹XÝ[ÛœÎ\Ë™]K˜XÝ[ÛœË][\Î\Ë™]K›Ü[ÛœËYÙN\Ë™]KœYÙR[™^Ý›ÚÙPÛÛÜŽ\Ë™]K˜›Ü™\ÛÛÜ‹š[ÛÛÜŽ\Ë™]K˜˜XÚÙÜ›Ý[™ÛÛÜ‹›Ý][ÛŽ\Ëœ›Ý][Û‹\N™__X[Y[™Ø]™YXÝ
K
^ÚYŠ]\Ëš\Ò[™XÙ\Ê\™]\›ŽÛ]YOË™Ù]
\Ë™]KšY
OË˜[YNÐ\œ˜^Kš\Ð\œ˜^JŠ_
VÛ—JNÛ]V×KÛÜ[ÛœÎš_O]\Ë™]NÙ›ÜŠ]OLLOZK›[™ÝÙONÙJÊÊZVÙWK™^Ü˜[YOOO[–ÝI‰Š‹œ\Ú
JK
ÏLJNÝœÙ]
XŠ_X\Þ[˜ÈÙÙ]\X\˜[˜ÙJK‹Š^ÚYŠ\Ë™]K˜ÛÛX›Ê\™]\›ˆÝ\\‹—ÙÙ]\X\˜[˜ÙJK‹ŠNÛ]KËÏ\Ë™Ù]
\Ë™]KšY
NÚYŠÉ‰ŠÏ\Ëœ›Ý][Û‹O\Ë˜[YJKÏOO]›ÚY	‰šOOO]›ÚY	‰ˆ]\Ë—Û™YY\X\˜[˜Ù\Ê\™]\›ˆ[ÚOOO]›ÚYÚO]\Ë™]K™šY[˜[YN\œ˜^Kš\Ð\œ˜^JJ_
OVÚWJNÛ]ÝÚY˜ËZYÚ›O]\ÎÊÏOONLÏOOLÌ
I‰ŠØËOVÛ×JNÛ]O]\Ë™]K›Ü[ÛœË›[™ÝV×NÙ›ÜŠ]OLÙONÙJÊÊ^Û]Ù^Ü˜[YNO]\Ë™]K›Ü[ÛœÖÙWNÚKš[˜ÛY\Ê
I‰™œ\Ú
J_]\Ë—ÙY˜][\X\˜[˜Ù_
\Ë™]K™Y˜][\X\˜[˜ÙQ]OQÛ
\Ë—ÙY˜][\X\˜[˜ÙOXÒ[™]XØHˆØ
JNÛ]X]ØZ]žK—ÙÙ]›Û]JK\Ë™]K™Y˜][\X\˜[˜ÙQ]K\Ë—ÙšY[™\ÛÝ\˜Ù\Ë›Y\™ÙY™\ÛÝ\˜Ù\ÊKÙ›ÛÚ^™N›_O]\Ë™]K™Y˜][\X\˜[˜ÙQ]NÚYŠJ\]\Ë—ÙY˜][\X\˜[˜ÙNÙ[Ù^Û]OJLJKÝKKLKŽÙ›ÜŠ]Ù\Ü^U˜[YN™_[Ùˆ\Ë™]K›Ü[ÛœÊ^Û]]\Ë—ÙÙ]^ÚY
KŠNÜ	‰Š\‹YJ_VÜWO]\Ë—ØÛÛ\]Q›ÛÚ^™JKËM‹‹LJ_[][J˜KÏJ[JKÌ‹ÏSX]™›ÛÜŠÚ
KLÚYŠ›[™ÝŒ
^Û]OSX]›Z[Š‹‹™
KSX]›X^
‹‹™
NÝSX]›X^
WÊÌJK™I‰ŠYJ_[]OSX]›Z[ŠŠ×ÊÌKJKVØÕ“PÈXHH	ØßH	ÛH™HÈ˜NÚYŠ›[™Ý
^Ø‹œ\Ú
ŒˆÍMŽˆŽML™Ø
NÙ›ÜŠ]HÙˆ
]YI‰™OI‰˜‹œ\Ú
H	ÛJK]ŠÌJJšH	ØßH	ÚH™H˜
_X‹œ\Ú
•HH	ÛHX
NÛ]^ÜÚYŒNÙ›ÜŠ]O]ŽÙONÙJÊÊ^Û]Ù\Ü^U˜[YNO]\Ë™]K›Ü[ÛœÖÙWKYOOO]ÙÎŒØ‹œ\Ú
\Ë—Ü™[™\•^
‹KË‹Z
ÛŠJ_\™]\›ˆ‹œ\Ú
UHSPØ
K‹š›Ú[Š˜
__K^OXÛ\ÜÈ^[™Èž^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë™]K™šY[˜[YO[[\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]K››ÒSH]\Ë™]Kš\ÓÝÛØ[˜\ßYÙ]šY[Øš™XÝ

^Ü™]\›žÚY\Ë™]KšY˜[YN›[YÙN\Ë™]KœYÙR[™^\N˜ÚYÛ˜]\™X__K	OXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë™]K››Ô›Ý]OHL\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]K››ÒSHLNÛ]ÙXÝOYNÝ\Ë™]K˜[››Ý][Û•\O[K•V\Ë™]Kš\Ð\X\˜[˜ÙOÝ\Ë™]K›˜[YOX›ÒXÛÛ˜Š\Ë™]Kœ™XÝÌWO]\Ë™]Kœ™XÝÌ×KLŒ‹\Ë™]Kœ™XÝÌ—O]\Ë™]Kœ™XÝÌJÌŒ‹\Ë™]K›˜[YO]š\Ê˜[YX
OÝ™Ù]
˜[YX
K›˜[YN˜›ÝX
Kš\ÊÝ]X
OÊ\Ë™]KœÝ]O]™Ù]
Ý]X
_[\Ë™]KœÝ]S[Ù[]™Ù]
Ý]S[Ù[
_[
NŠ\Ë™]KœÝ]O[[\Ë™]KœÝ]S[Ù[[[
__KXXÛ\ÜÈ^[™ÈÞ^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ[››Ý][Û‘ÛØ˜[Î›ŸOYNÝ\Ë™]K˜[››Ý][Û•\O[K“S’Ë\Ë™]K››ÒSHLNÛ]U^J\Ëœ™XÝ[™ÛJNÜ‰‰Š\Ë™]Kœ]XYÚ[Ï\ŠK\Ë™]K˜›Ü™\ÛÛÜŸ]\Ë™]K˜ÛÛÜ‹Kœ\œÙQ\ÝXÝ[Û˜\žJÙ\ÝXÝ™\Ý[ØšŽ\Ë™]KØÐ˜\ÙU\››‹˜˜\ÙU\›ØÐ]XÚY[Î›‹˜]XÚY[ßJ_YÙ]Ý™\›^\Õ^ÛÛ[

^Ü™]\›ˆL_KXÛ\ÜÈ^[™ÈÞ^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝOYNÝ\Ë™]K˜[››Ý][Û•\O[K”ÔT\Ë™]K››ÒSHLK
\ËÚYOOL\ËšZYÚOOL
I‰Š\Ë™]Kœ™XÝ[[
NÛ]]™Ù]
\™[
NÚYŠ[Š^ÐJÜ\[››Ý][Ûˆ\ÈHZ\ÜÚ[™ÈÜˆ[˜[Y\™[[››Ý][Û‹˜
NÜ™]\›ŸZYŠ\Ë™]Kœ\™[™XÝZ
‹™Ù]\œ˜^J™XÝ
K[
K\Ë™]K˜Ü™X][Û‘]O[‹™Ù]
Ü™X][Û‘]X
_™J‹™Ù]
•
K‘Ô“ÕT
I‰Š[‹™Ù]
T•
JK‹š\ÊX
OÊ\ËœÙ][ÙYšXØ][Û‘]J‹™Ù]
X
JK\Ë™]K›[ÙYšXØ][Û‘]O]\Ë›[ÙYšXØ][Û‘]JN\Ë™]K›[ÙYšXØ][Û‘]O[[‹š\ÊØ
OÊ\ËœÙ]ÛÛÜŠ‹™Ù]\œ˜^JØ
JK\Ë™]K˜ÛÛÜ]\Ë˜ÛÛÜŠN\Ë™]K˜ÛÛÜ[[]\ËšY]ØX›J^Û]O[‹™Ù]
˜
NÝ\Ë—Ú\ÕšY]ØX›JJI‰\ËœÙ]›YÜÊJ_]\ËœÙ]]J‹™Ù]

JK\Ë™]K]SØš]\Ë—Ý]K\ËœÙ]ÛÛ[Ê‹™Ù]
ÛÛ[Ø
JK\Ë™]K˜ÛÛ[ÓØš]\Ë—ØÛÛ[Ë‹š\ÊØ
I‰Š\Ë™]KœšXÚ^^žK™Ù]šXÚ^\Ò[
‹™Ù]
Ø
JJK\Ë™]K›Ü[HH]™Ù]
Ü[˜
_\Ý]XÈÜ™X]S™]ÑXÝ
KŠ^Û]ÛÛ[››Ý][ÛŽœ‹™XÝšK\™[˜_OYKÏ\Ÿ™]ÈŠ
NÜ™]\›ˆËœÙ]Y“›Ý^\ÝÊ\X™Ù]
[››Ý
JKËœÙ]Y“›Ý^\ÝÊÝX\X™Ù]
Ü\
JKËœÙ]Y“›Ý^\ÝÊÜ[˜LJKËœÙ]Y\œ˜^J™XÝJKËœÙ]
\™[JKß\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ð\X\˜[˜ÙTÝ™X[JKŠ^Ü™]\›ˆ[_K˜XÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]Kš\ÑY]X›OH]\Ë™]K››ÒS\Ë™]K››ÒSHLNÛ]Ø[››Ý][Û‘ÛØ˜[Î]˜[X]Ü“Ü[ÛœÎ›‹™YŽœŸOYNÚYŠ\Ë™]K˜[››Ý][Û•\O[K‘”‘QUV\ËœÙ]Y˜][\X\˜[˜ÙJJK\Ë—Ú\Ð\X\˜[˜ÙOHH]\Ë˜\X\˜[˜ÙK\Ë—Ú\Ð\X\˜[˜ÙJ^Û]Ù›ÛÛÛÜŽ™K›ÛÚ^™Nš_O\[
\Ë˜\X\˜[˜ÙK‹‹™ÛØ˜[ÛÛÜ”ÜXÙPØXÚJNÝ\Ë™]K™Y˜][\X\˜[˜ÙQ]K™›ÛÛÛÜYK\Ë™]K™Y˜][\X\˜[˜ÙQ]K™›ÛÚ^™OZ_LY[Ù^Ý\Ë™]K™Y˜][\X\˜[˜ÙQ]K™›ÛÚ^™_LLÛ]Ù›ÛÛÛÜŽ›ÛÚ^™N›ŸO]\Ë™]K™Y˜][\X\˜[˜ÙQ]NÚYŠ\Ë—ØÛÛ[ËœÝŠ^Ý\Ë™]K^ÛÛ[]\Ë—ØÛÛ[ËœÝ‹œÜ]
×—ß‹ÊK›X\
OO™Kš[Q[™

JNÛ]ØÛÛÜ™Î™K˜›ÞX]š^œŸOV™Ù]š\œÝÜÚ][Û’[™›Ê\Ëœ™XÝ[™ÛK\Ëœ›Ý][Û‹ŠNÝ\Ë™]K^ÜÚ][Û]\Ë—Ý˜[œÙ›Ü›TÚ[
KŠ_ZYŠ\Ë—Ú\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜY
^Û]OYK™XÝ™Ù]
ÐX
KO[™]È
‹Ø[œË\Ù\šY˜
NÝ\Ë˜\X\˜[˜ÙOXK˜Ü™X]P\X\˜[˜ÙJ\Ë—ØÛÛ[ËœÝ‹\Ëœ™XÝ[™ÛK\Ëœ›Ý][Û‹‹JK\Ë—ÜÝ™X[\Ëœ\Ú
\Ë˜\X\˜[˜ÙJ_Y[ÙHJœ™YU^[››Ý][ÛŽˆÙ™œØÜ™Y[Ø[˜\È\È›ÝÝ\ÜY[››Ý][ÛˆX^H›Ý™[™\ˆÛÜœ™XÝK˜
__YÙ]\Õ^ÛÛ[

^Ü™]\›ˆ\Ë—Ú\Ð\X\˜[˜Ù_\Ý]XÈÜ™X]S™]ÑXÝ
KØ\™YŽ›‹\œŸJ^Û]ØÛÛÜŽšK]N˜K›ÛÚ^™N›ËÛ[››Ý][ÛŽœË™XÝ˜Ë›Ý][ÛŽ›\Ù\ŽK˜[YN™OYK\ß™]ÈŠ
NÙ‹œÙ]Y“›Ý^\ÝÊ\X™Ù]
[››Ý
JK‹œÙ]Y“›Ý^\ÝÊÝX\X™Ù]
œ™YU^
JK‹œÙ]
ÏØX˜Ü™X][Û‘]X‰Ø™JJ_X
KÉ‰™‹™[]JØ
K‹œÙ]Y\œ˜^J™XÝÊNÛ]XÒ[ˆ	ÛßHˆ	Ò›
KL
_XÚYŠ‹œÙ]
X
K‹œÙ]Y‘Yš[™Y
ÛÛ[ØÝ

JK‹œÙ]Y“›Ý^\ÝÊ˜
K‹œÙ]Y“›Ý^\ÝÊ›Ü™\˜ÌJK‹œÙ]Y“[X™\Š›Ý]X
K‹œÙ]Y‘Yš[™Y
Ý
JJKŸŠ^Û]O[™]ÈŠ
NÙ‹œÙ]
TJKKœÙ]
˜ŸŠ_\™]\›ˆŸ\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ð\X\˜[˜ÙTÝ™X[JKŠ^Û]Ø˜\ÙQ›Û™YŽœ‹]˜[X]ÜŽšK\ÚÎœßO[‹ØÛÛÜŽ˜Ë›ÛÚ^™N›™XÝK›Ý][ÛŽ™˜[YN™ŸOYNÚYŠXÊ\™]\›ˆ[Û][™]ÈŠ
KO[™]ÈŠ
NÚYŠŠ[KœÙ]
[˜ŠNÙ[Ù^Û]O[™]ÈŠ
NÙKœÙ]Y“˜[YJ˜\ÙQ›Û[™]XØX
KKœÙ]Y“˜[YJ\X›Û
KKœÙ]Y“˜[YJÝX\X\LX
KKœÙ]Y“˜[YJ[˜ÛÙ[™ØÚ[[œÚQ[˜ÛÙ[™Ø
KKœÙ]
[˜J_\œÙ]
›ÛJNÛ]X]ØZ]žK—ÙÙ]›Û]JKËÙ›Û˜[YN˜[˜›ÛÚ^™N›K
KÙËË‹WO]K]‹YË^KWÎÙ	LNOL	‰ŠØ‹OVÞ—JNÛ]ÏY‹œÜ]
˜
KÏ[ÌYLËÏKLKÌV×NÙ›ÜŠ]HÙˆÊ^Û]Z™[˜ÛÙTÝš[™ÊJNÚYŠ›[™ÝŒJ\™]\›ˆ[ÙO]š›Ú[Š
Kœ\Ú
JNÛ]LZ˜Ú\œÕÑÛ\ÊJNÙ›ÜŠ]HÙˆŠ[ŠÏYKÚY
ÎÝÏSX]›X^
ËŠ_[]OLNÝÏ˜‰‰ŠOX‹ÝÊNÛ]LKÏXJ›ÏJK[ÊJ›OSÊ”Ë›[™ÝÐOž	‰Š^ÐJNÛ][
“X]›Z[ŠK
KK‹ÜÝÚ]Ú

^ØØ\ÙH”VÌKWKVÝVÌKVÌWK‹KOVÝVÌKVÌ×KZ×NØœ™XZÎØØ\ÙHL”VÌKLKKVÝVÌWK]VÌ—K‹KOVÝVÌWK]VÌKZ×NØœ™XZÎØØ\ÙHN”VËLKLWKVË]VÌ—K]VÌ×K‹KOVË]VÌ—K]VÌWKZ×NØœ™XZÎØØ\ÙHÌ”VÌLKKKVË]VÌ×KVÌK‹KOVË]VÌ×KVÌ—KZ×NØœ™XZß[]VØX	Ôš›Ú[Š
_HÛX	Ó‹š›Ú[Š
_H™HÈ˜•	Ò›
ËL
_XÈÒ[ˆ	Ñ
Š_H˜NÑ‹œ\Ú
	ÓKš›Ú[Š
_H
	Ý
ÌJ_JH˜
NÛ]YOQ
ÊNÙ›ÜŠ]OLKU›[™ÝÙOÙJÊÊ^Û]UÙWNÑ‹œ\Ú
IÙY_H
	Ý

_JH˜
_Q‹œ\Ú
UX
NÛ]OQ‹š›Ú[Š˜
K™O[™]ÈŠ
NÛ™KœÙ]
›Ü›U\XJK™KœÙ]Y“˜[YJÝX\X›Ü›X
K™KœÙ]Y“˜[YJ\XØš™XÝ
K™KœÙ]
›ÞJK™KœÙ]
™\ÛÝ\˜Ù\Ø
K™KœÙ]
X]š^ÌKK]VÌK]VÌWWJNÛ]™O[™]ÈÛŠJNÜ™]\›ˆ™K™XÝ[™K™__K˜XÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÝ\Ë™]K˜[››Ý][Û•\O[K“S‘K\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]K››ÒSHLNÛ][]
™Ù]\œ˜^J
KÌJNÚYŠ\Ë™]K›[™PÛÛÜ™[˜]\Ï[YK››Ü›X[^™T™XÝ
ŠK\ËœÙ][™Q[™[™ÜÊ™Ù]\œ˜^JX
JK\Ë™]K›[™Q[™[™ÜÏ]\Ë›[™Q[™[™ÜË]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJKO]™Ù]
ÐX
KORJžJ™Ù]\œ˜^JPØ
K[
JKÏXOÚN›[Ï]\Ë˜›Ü™\”Ý[KÚYKÏLŠœËVÝ\Ë™]K›[™PÛÛÜ™[˜]\ÖÌKXË\Ë™]K›[™PÛÛÜ™[˜]\ÖÌWKXË\Ë™]K›[™PÛÛÜ™[˜]\ÖÌ—JØË\Ë™]K›[™PÛÛÜ™[˜]\ÖÌ×JØ×NÛYKš[\œÙXÝ
\Ëœ™XÝ[™ÛK
_
\Ëœ™XÝ[™ÛO[
K\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜	ÜßHØÝ›ÚÙPÛÛÜŽ™Kš[ÛÛÜŽ˜KÝ›ÚÙP[NšKš[[N›ËÚ[ÐØ[˜XÚÎŠK
OOŠKœ\Ú
	Ü–Ì_H	Ü–ÌW_HX	Ü–Ì—_H	Ü–Ì×_HØ
KÝÌK\ËÍ×K\ËÌ—JÜËÌ×JÜ×J_J___KXXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÚYŠ\Ë™]K˜[››Ý][Û•\O[K”ÔUPT‘K\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]K››ÒSHLK]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJK]™Ù]
ÐX
KORJžJ™Ù]\œ˜^JPØ
K[
JKOZOÜŽ›[ÚYŠ\Ë˜›Ü™\”Ý[KÚYOOL	‰ˆZJ\™]\›ŽÝ\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜	Ý\Ë˜›Ü™\”Ý[KÚYHØÝ›ÚÙPÛÛÜŽ™Kš[ÛÛÜŽšKÝ›ÚÙP[Nœ‹š[[N˜KÚ[ÐØ[˜XÚÎŠK
OOžÛ]]ÍJÝ\Ë˜›Ü™\”Ý[KÚYÌ‹]ÍWJÝ\Ë˜›Ü™\”Ý[KÚYÌ‹O]Í—K]ÍK]\Ë˜›Ü™\”Ý[KÚYÏ]Ì×K]Í×K]\Ë˜›Ü™\”Ý[KÚYÜ™]\›ˆKœ\Ú
	ÛŸH	ÜŸH	Ø_H	ÛßH™X
KOÙKœ\Ú
˜
N™Kœ\Ú
Ø
KÝÌKÍ×KÌ—KÌ×W__J___KXXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÚYŠ\Ë™]K˜[››Ý][Û•\O[KÒTÓK]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJK]™Ù]
ÐX
KORJžJ™Ù]\œ˜^JPØ
K[
JKOZOÜŽ›[ÚYŠ\Ë˜›Ü™\”Ý[KÚYOOL	‰ˆZJ\™]\›ŽÛ]ÏMÌÊ“X][ŠX]”KÎ
NÝ\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜	Ý\Ë˜›Ü™\”Ý[KÚYHØÝ›ÚÙPÛÛÜŽ™Kš[ÛÛÜŽšKÝ›ÚÙP[Nœ‹š[[N˜KÚ[ÐØ[˜XÚÎŠK
OOžÛ]]ÌJÝ\Ë˜›Ü™\”Ý[KÚYÌ‹]ÌWK]\Ë˜›Ü™\”Ý[KÚYÌ‹O]Í—K]\Ë˜›Ü™\”Ý[KÚYÌ‹Ï]Í×JÝ\Ë˜›Ü™\”Ý[KÚYÌ‹Ï[ŠÊK[ŠKÌ‹\ŠÊË\ŠKÌ‹OJK[ŠKÌŠ›ËJË\ŠKÌŠ›ÎÜ™]\›ˆKœ\Ú
	ØßH	ÜßHX	ØÊÝ_H	ÜßH	Ø_H	Û
ÙH	Ø_H	ÛHØ	Ø_H	ÛYH	ØÊÝ_H	ÜŸH	ØßH	ÜŸHØ	ØË]_H	ÜŸH	ÛŸH	ÛYH	ÛŸH	ÛHØ	ÛŸH	Û
ÙH	ØË]_H	ÜßH	ØßH	ÜßHØ
KOÙKœ\Ú
˜
N™Kœ\Ú
Ø
KÝÌKÍ×KÌ—KÌ×W__J___KØXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÝ\Ë™]K˜[››Ý][Û•\O[K”ÓSS‘K\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]K››ÒSHLK\Ë™]K™\XÙ\Ï[[\È[œÝ[˜Ù[ÙˆØŸ
\ËœÙ][™Q[™[™ÜÊ™Ù]\œ˜^JX
JK\Ë™]K›[™Q[™[™ÜÏ]\Ë›[™Q[™[™ÜÊNÛ]]™Ù]\œ˜^J™\XÙ\Ø
NÚYŠY
‹[
J\™]\›ŽÛ]O]\Ë™]K™\XÙ\ÏQ›Ø]Ì\œ˜^K™œ›ÛJŠNÚYŠ]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJK]™Ù]
ÐX
KOUžJ™Ù]\œ˜^JPØ
K[
NØI‰RJJNÛ]ÎÛÏXOÝ\Ë˜ÛÛÜØK™]™\žJ
ŠOOOOYVÛ—JOØ˜˜˜˜˜˜ØÛ]Ï]\Ë˜›Ü™\”Ý[KÚYKÏLŠœËVÌKÌKÌLKÌLKÌNÙ›ÜŠ]OLZK›[™ÝÙOÙJÏLŠ[YKœ™XÝ›Ý[™[™Ð›Þ
VÙWKXËVÙJÌWKXËVÙWJØËVÙJÌWJØË
NÛYKš[\œÙXÝ
\Ëœ™XÝ[™ÛK
_
\Ëœ™XÝ[™ÛO[
K\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜	ÜßHØÝ›ÚÙPÛÛÜŽ™KÝ›ÚÙP[Nœ‹š[ÛÛÜŽ˜Kš[[N˜OÜŽ›[Ú[ÐØ[˜XÚÎŠK
OOžÙ›ÜŠ]LZK›[™ÝÝŽÝ
ÏLŠYKœ\Ú
	ÚVÝ_H	ÚVÝ
ÌW_H	ÝOOLØX˜X
NÜ™]\›ˆKœ\Ú
ÊKÝÌKÍ×KÌ—KÌ×W__J___KØXÛ\ÜÈ^[™ÈØžØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë™]K˜[››Ý][Û•\O[K”ÓQÓÓŸ_KØXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë™]K˜[››Ý][Û•\O[KÐT‘U_KXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]K››ÒSHLNÛ]ÙXÝ™YŽ›ŸOYNÝ\Ë™]K˜[››Ý][Û•\O[K’S’Ë\Ë™]Kš[šÓ\ÝÏV×K\Ë™]Kš\ÑY]X›OH]\Ë™]K››ÒS\Ë™]K››ÒSHLK\Ë™]K›ÜXÚ]O]™Ù]
ÐX
_NÛ]]™Ù]\œ˜^J[šÓ\Ý
NÚYŠ\œ˜^Kš\Ð\œ˜^JŠJ^Ù›ÜŠ]OL\‹›[™ÝÙOÊÊÙJ^ÚYŠP\œ˜^Kš\Ð\œ˜^J–ÙWJJXÛÛ[YNÛ][™]È›Ø]Ì\œ˜^J–ÙWK›[™Ý
NÝ\Ë™]Kš[šÓ\ÝËœ\Ú

NÙ›ÜŠ]OLO\–ÙWK›[™ÝÚONÚJÏLŠ^Û]O[‹™™]ÚY”™YŠ–ÙWVÚWJKÏ[‹™™]ÚY”™YŠ–ÙWVÚJÌWJNÝ\[ÙˆOOX[X™\˜	‰\[ÙˆÏOX[X™\˜	‰ŠÚWOXKÚJÌWO[Ê__ZYŠ]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJK]™Ù]
ÐX
KO]\Ë˜›Ü™\”Ý[KÚYKOLŠšKÏVÌKÌKÌLKÌLKÌNÙ›ÜŠ]HÙˆ\Ë™]Kš[šÓ\ÝÊY›ÜŠ]LYK›[™ÝÝŽÝ
ÏLŠ[YKœ™XÝ›Ý[™[™Ð›Þ
VÝKXKVÝ
ÌWKXKVÝJØKVÝ
ÌWJØKÊNÛYKš[\œÙXÝ
\Ëœ™XÝ[™ÛKÊ_
\Ëœ™XÝ[™ÛO[ÊK\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜	Ú_HØÝ›ÚÙPÛÛÜŽ™KÝ›ÚÙP[Nœ‹Ú[ÐØ[˜XÚÎŠK
OOžÙ›ÜŠ]Ùˆ\Ë™]Kš[šÓ\ÝÊ^Ù›ÜŠ]L]›[™ÝÛŽÛŠÏLŠYKœ\Ú
	ÝÛ—_H	ÝÛŠÌW_H	ÛOOLØX˜X
NÙKœ\Ú
Ø
_\™]\›–ÝÌKÍ×KÌ—KÌ×W__J___\Ý]XÈÜ™X]S™]ÑXÝ
KØ\™YŽ›‹\œŸJ^Û]ÛÛ[››Ý][ÛŽšKÛÛÜŽ˜K]N›ËÜXÚ]NœË]Î˜ËÝ][™\Î›™XÝK›Ý][ÛŽ™XÚÛ™\ÜÎ™‹\Ù\ŽœOYKOZ_™]ÈŠ
NÚYŠKœÙ]Y“›Ý^\ÝÊ\X™Ù]
[››Ý
JKKœÙ]Y“›Ý^\ÝÊÝX\X™Ù]
[šØ
JKKœÙ]
OØX˜Ü™X][Û‘]X‰Ø™JÊ_X
KKœÙ]Y\œ˜^J™XÝJKKœÙ]Y\œ˜^J[šÓ\ÝËœÚ[ßÏËœÚ[ÊKKœÙ]Y“›Ý^\ÝÊ˜
KKœÙ]Y“[X™\Š›Ý]X
KKœÙ]Y‘Yš[™Y
Ý

JK	‰›KœÙ]Y“˜[YJU[šÒYÚYÚ
KŒ
^Û]O[™]ÈŠ
NÛKœÙ]
”ØJKKœÙ]
ØŠ_ZYŠKœÙ]Y\œ˜^JØJJJKKœÙ]Y“[X™\ŠÐXÊKŸŠ^Û]O[™]ÈŠ
NÛKœÙ]
TJKKœÙ]
˜ŸŠ_\™]\›ˆ_\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ð\X\˜[˜ÙTÝ™X[JKŠ^ÚYŠK›Ý][™\Ê\™]\›ˆ\Ë˜Ü™X]S™]Ð\X\˜[˜ÙTÝ™X[Q›Ü’YÚYÚ
KŠNÛ]ØÛÛÜŽœ‹™XÝšK]Î˜KXÚÛ™\ÜÎ›ËÜXÚ]NœßOYNÚYŠ\Š\™]\›ˆ[Û]ÏVØ	ÛßHÈHˆH˜	Ò›
‹LJ_XNÜÈOOLI‰˜Ëœ\Ú
ÔŒÜØ
NÙ›ÜŠ]HÙˆK›[™\Ê^ØËœ\Ú
	Ñ
VÍJ_H	Ñ
VÍWJ_HX
NÙ›ÜŠ]M‹YK›[™ÝÝŽÝ
ÏMŠZYŠ\Ó˜SŠVÝJJXËœ\Ú
	Ñ
VÝ
ÍJ_H	Ñ
VÝ
ÍWJ_H
NÙ[Ù^Û]Û‹‹KKË×OYKœÛXÙJ
ÍŠNØËœ\Ú
Û‹‹KKË×K›X\

Kš›Ú[Š
JØØ
_YK›[™ÝOOM‰‰˜Ëœ\Ú
	Ñ
VÍJ_H	Ñ
VÍWJ_H
_XËœ\Ú
Ø
NÛ]XËš›Ú[Š˜
KO[™]ÈŠ
NÚYŠKœÙ]
›Ü›U\XJKKœÙ]Y“˜[YJÝX\X›Ü›X
KKœÙ]Y“˜[YJ\XØš™XÝ
KKœÙ]
›ÞJKKœÙ]
[™Ý›[™Ý
KÈOOLJ^Û]O[™]ÈŠ
K[™]ÈŠ
K[™]ÈŠ
NÜ‹œÙ]
ÐXÊK‹œÙ]Y“˜[YJ\X^ÔÝ]X
K‹œÙ]
ŒŠKKœÙ]
^ÔÝ]XŠKKœÙ]
™\ÛÝ\˜Ù\ØJ_[][™]ÈÛŠ
NÜ™]\›ˆ™XÝ]K\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ð\X\˜[˜ÙTÝ™X[Q›Ü’YÚYÚ
KŠ^Û]ØÛÛÜŽœ‹™XÝšKÝ][™\ÎžÛÝ][™N˜_KÜXÚ]N›ßOYNÚYŠ\Š\™]\›ˆ[Û]ÏVØ	Ò›
‹L
_XÔŒÜØNÜËœ\Ú
	Ñ
VÍJ_H	Ñ
VÍWJ_HX
NÙ›ÜŠ]OM‹XK›[™ÝÙOÙJÏMŠZYŠ\Ó˜SŠVÙWJJ\Ëœ\Ú
	Ñ
VÙJÍJ_H	Ñ
VÙJÍWJ_H
NÙ[Ù^Û]Ý‹‹KË×OXKœÛXÙJKJÍŠNÜËœ\Ú
Ý‹‹KË×K›X\

Kš›Ú[Š
JØØ
_\Ëœ\Ú
˜
NÛ]Ï\Ëš›Ú[Š˜
K[™]ÈŠ
NÛœÙ]
›Ü›U\XJKœÙ]Y“˜[YJÝX\X›Ü›X
KœÙ]Y“˜[YJ\XØš™XÝ
KœÙ]
›ÞJKœÙ]
[™ÝË›[™Ý
NÛ]O[™]ÈŠ
K[™]ÈŠ
NÝKœÙ]
^ÔÝ]X
KœÙ]
™\ÛÝ\˜Ù\ØJNÛ][™]ÈŠ
NÙœÙ]
ŒŠK‹œÙ]Y“˜[YJ“X][\X
KÈOOLI‰Š‹œÙ]
ØXÊK‹œÙ]Y“˜[YJ\X^ÔÝ]X
JNÛ][™]ÈÛŠÊNÜ™]\›ˆ™XÝ[_KXXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÚYŠ\Ë™]K˜[››Ý][Û•\O[K’QÒQÒ\Ë™]Kš\ÑY]X›OH]\Ë™]K››ÒS\Ë™]K››ÒSHLK\Ë™]K›ÜXÚ]O]™Ù]
ÐX
_K\Ë™]Kœ]XYÚ[ÏU^J[
J^Û]O]\Ë˜\X\˜[˜ÙOË™XÝ™Ù]
™\ÛÝ\˜Ù\Ø
NÚYŠ]\Ë˜\X\˜[˜Ù_YOËš\Ê^ÔÝ]X
J^Ý\Ë˜\X\˜[˜ÙI‰JYÚYÚ[››Ý][ÛˆHYÛ›Üš[™ÈZ[Z[ˆ\X\˜[˜ÙHÝ™X[K˜
NÛ]ORJ\Ë˜ÛÛÜ‹ÌKKJK]™Ù]
ÐX
NÝ\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹š[ÛÛÜŽ™K›[™[ÙN˜][\Xš[[Nœ‹Ú[ÐØ[˜XÚÎŠK
OOŠKœ\Ú
	ÝÌ_H	ÝÌW_HX	ÝÌ—_H	ÝÌ×_H	ÝÍ—_H	ÝÍ×_H	ÝÍ_H	ÝÍW_H˜
KÝÌKÍ×KÌ—KÌ×WJ_J__Y[ÙH\Ë™]KœÜ\™Y[[YÙ]Ý™\›^\Õ^ÛÛ[

^Ü™]\›ˆL\Ý]XÈÜ™X]S™]ÑXÝ
KØ\™YŽ›‹\œŸJ^Û]ØÛÛÜŽšK]N˜KÛ[››Ý][ÛŽ›ËÜXÚ]NœË™XÝ˜Ë›Ý][ÛŽ›\Ù\ŽK]XYÚ[Î™OYK[ß™]ÈŠ
NÚYŠ‹œÙ]Y“›Ý^\ÝÊ\X™Ù]
[››Ý
JK‹œÙ]Y“›Ý^\ÝÊÝX\X™Ù]
YÚYÚ
JK‹œÙ]
ÏØX˜Ü™X][Û‘]X‰Ø™JJ_X
K‹œÙ]Y\œ˜^J™XÝÊK‹œÙ]Y“›Ý^\ÝÊ˜
K‹œÙ]Y“›Ý^\ÝÊ›Ü™\˜ÌJK‹œÙ]Y“[X™\Š›Ý]X
K‹œÙ]Y\œ˜^J]XYÚ[Ø
K‹œÙ]Y\œ˜^JØJJJK‹œÙ]Y“[X™\ŠÐXÊK‹œÙ]Y‘Yš[™Y
Ý
JJKŸŠ^Û]O[™]ÈŠ
NÙ‹œÙ]
TJKKœÙ]
˜ŸŠ_\™]\›ˆŸ\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ð\X\˜[˜ÙTÝ™X[JKŠ^Û]ØÛÛÜŽœ‹™XÝšKÝ][™\Î˜KÜXÚ]N›ßOYNÚYŠ\Š\™]\›ˆ[Û]ÏVØ	Ò›
‹L
_XÔŒÜØKÏV×NÙ›ÜŠ]HÙˆJ^ØË›[™ÝLËœ\Ú
	Ñ
VÌJ_H	Ñ
VÌWJ_HX
NÙ›ÜŠ]L‹YK›[™ÝÝŽÝ
ÏLŠXËœ\Ú
	Ñ
VÝJ_H	Ñ
VÝ
ÌWJ_H
NØËœ\Ú

KËœ\Ú
Ëš›Ú[Š˜
J_\Ëœ\Ú
Š˜
NÛ]\Ëš›Ú[Š˜
KO[™]ÈŠ
NÝKœÙ]
›Ü›U\XJKKœÙ]Y“˜[YJÝX\X›Ü›X
KKœÙ]Y“˜[YJ\XØš™XÝ
KKœÙ]
›ÞJKKœÙ]
[™Ý›[™Ý
NÛ][™]ÈŠ
K[™]ÈŠ
NÙœÙ]
^ÔÝ]XŠKKœÙ]
™\ÛÝ\˜Ù\Ø
NÛ][™]ÈŠ
NÙ‹œÙ]
Œ
KœÙ]Y“˜[YJ“X][\X
KÈOOLI‰ŠœÙ]
ØXÊKœÙ]Y“˜[YJ\X^ÔÝ]X
JNÛ]O[™]ÈÛŠ
NÜ™]\›ˆK™XÝ]K__KXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÚYŠ\Ë™]K˜[››Ý][Û•\O[K•S‘T“S‘K\Ë™]Kœ]XYÚ[ÏU^J[
J^ÚYŠ]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJK]™Ù]
ÐX
NÝ\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜×HMÌHØÝ›ÚÙPÛÛÜŽ™KÝ›ÚÙP[Nœ‹Ú[ÐØ[˜XÚÎŠK
OOŠKœ\Ú
	ÝÍ_H	ÝÍWJÌKŒßHX	ÝÍ—_H	ÝÍ×JÌKŒßHØ
KÝÌKÍ×KÌ—KÌ×WJ_J__Y[ÙH\Ë™]KœÜ\™Y[[YÙ]Ý™\›^\Õ^ÛÛ[

^Ü™]\›ˆL_K˜XÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÚYŠ\Ë™]K˜[››Ý][Û•\O[K”ÔURQÑÓK\Ë™]Kœ]XYÚ[ÏU^J[
J^ÚYŠ]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJK]™Ù]
ÐX
NÝ\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜×HHØÝ›ÚÙPÛÛÜŽ™KÝ›ÚÙP[Nœ‹Ú[ÐØ[˜XÚÎŠK
OOžÛ]JÌWK]ÍWJKÍ‹[‹O]ÍKO]ÍWKÏ]Í—NÙKœ\Ú
	Ú_H	ØJÜŸHX
NÙÈJÏL‹\OOLÛŽŒKœ\Ú
	Ú_H	ØJÜŸH
NÝÚ[JOÊNÜ™]\›ˆKœ\Ú
Ø
KÝÍKKLŠ›‹ËJÌŠ›—__J__Y[ÙH\Ë™]KœÜ\™Y[[YÙ]Ý™\›^\Õ^ÛÛ[

^Ü™]\›ˆL_KXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYNÚYŠ\Ë™]K˜[››Ý][Û•\O[K”Õ’RÑSÕU\Ë™]Kœ]XYÚ[ÏU^J[
J^ÚYŠ]\Ë˜\X\˜[˜ÙJ^Û]ORJ\Ë˜ÛÛÜ‹ÌJK]™Ù]
ÐX
NÝ\Ë—ÜÙ]Y˜][\X\˜[˜ÙJÞ™YŽ›‹^˜N˜×HHØÝ›ÚÙPÛÛÜŽ™KÝ›ÚÙP[Nœ‹Ú[ÐØ[˜XÚÎŠK
OOŠKœ\Ú
	ÊÌJÝÍJKÌŸH	ÊÌWJÝÍWJKÌŸHX	ÊÌ—JÝÍ—JKÌŸH	ÊÌ×JÝÍ×JKÌŸHØ
KÝÌKÍ×KÌ—KÌ×WJ_J__Y[ÙH\Ë™]KœÜ\™Y[[YÙ]Ý™\›^\Õ^ÛÛ[

^Ü™]\›ˆL_KXXÛ\ÜÈ^[™È^^ÈÙO[[ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë™]K˜[››Ý][Û•\O[K”ÕST\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]Kš\ÑY]X›OH]\Ë™]K››ÒS\Ë™]K››ÒSHL_[]\Ý™UšY]ÙYÚ[‘Y][™ÊK[[
^Ü™]\›ˆOÝ\Ë™]Kš\ÑY]X›OÊ\ËˆÙOÏÏ]\Ë™]Kš\ÓÝÛØ[˜\Ë\Ë™]Kš\ÓÝÛØ[˜\ÏHLL
NˆLŠ\ËˆÙHOO[[	‰Š\Ë™]Kš\ÓÝÛØ[˜\Ï]\ËˆÙK\ËˆÙO[[
K]Ëš\Ê\Ë™]KšY
J_\Ý]XÈ\Þ[˜ÈÜ™X]R[XYÙJK
^Û]ÝÚY›‹ZYÚœŸOYKO[™]ÈÙ™œØÜ™Y[Ø[˜\Ê‹ŠKOZK™Ù]ÛÛ^
™Ø[NˆLJNØK™˜]Ò[XYÙJK
NÛ]ÏXK™Ù][XYÙQ]J‹ŠK™]KÏ[™]ÈZ[Ì\œ˜^JË˜Y™™\ŠKÏ\ËœÛÛYJ™Kš\Ó]Q[™X[ÙOO™OŒOLMN™OOŠIŒMJHOLMJNØÉ‰ŠK™š[Ý[OXÚ]XK™š[™XÝ
‹ŠKK™˜]Ò[XYÙJK
JNÛ]ZK˜ÛÛ™\Ð›ØŠÝ\N˜[XYÙKÚœYØ]X[]NŒ_JK[ŠOO™K˜\œ˜^PY™™\Š
JKOS™Ù]
Øš™XÝ
KS™Ù]
[XYÙX
K[™]ÈŠ
NÙ‹œÙ]
\XJK‹œÙ]
ÝX\X
K‹œÙ]
š]Ô\ÛÛ\Û™[
K‹œÙ]Y“˜[YJÛÛÜ”ÜXÙX]šXÙT‘Ð˜
K‹œÙ]Y“˜[YJš[\˜ÕXÛÙX
K‹œÙ]
›ÞÌ‹—JK‹œÙ]
ÚYŠK‹œÙ]
ZYÚŠNÛ][[ÚYŠÊ^Û]O[™]ÈZ[\œ˜^JË›[™Ý
NÚYŠ™Kš\Ó]Q[™X[ŠY›ÜŠ]L\Ë›[™ÝÝŽÝ
ÊÊYVÝO\ÖÝOŒÙ[ÙH›ÜŠ]L\Ë›[™ÝÝŽÝ
ÊÊYVÝO\ÖÝIŒMNÛ]O[™]ÈŠ
NÚKœÙ]
\XJKKœÙ]
ÝX\X
KKœÙ]
š]Ô\ÛÛ\Û™[
KKœÙ]Y“˜[YJÛÛÜ”ÜXÙX]šXÙQÜ˜^X
KKœÙ]
ÚYŠKKœÙ]
ZYÚŠK[™]ÈÛŠKJ_\™]\›žÚ[XYÙTÝ™X[N›™]ÈÛŠ]ØZ]ŠKÛX\ÚÔÝ™X[NœÚY›‹ZYÚœŸ_\Ý]XÈÜ™X]S™]ÑXÝ
KØ\™YŽ›‹\œŸJ^Û]Ù]NšKÛ[››Ý][ÛŽ˜K™XÝ›Ë›Ý][ÛŽœË\Ù\Ž˜ßOYKX_™]ÈŠ
NÚYŠœÙ]Y“›Ý^\ÝÊ\X™Ù]
[››Ý
JKœÙ]Y“›Ý^\ÝÊÝX\X™Ù]
Ý[\
JKœÙ]
OØX˜Ü™X][Û‘]X‰Ø™JJ_X
KœÙ]Y\œ˜^J™XÝÊKœÙ]Y“›Ý^\ÝÊ˜
KœÙ]Y“›Ý^\ÝÊ›Ü™\˜ÌJKœÙ]Y“[X™\Š›Ý]XÊKœÙ]Y‘Yš[™Y
Ý
ÊJKŸŠ^Û]O[™]ÈŠ
NÛœÙ]
TJKKœÙ]
˜ŸŠ_\™]\›ˆ\Ý]XÈ\Þ[˜ÈÝ
K
^Û]Ø\™PÛÛÝ\œÎ›‹ÛÛÜŽœ‹™XÝšK[™\Î˜KXÚÛ™\ÜÎ›ßOYNÚYŠ\Š\™]\›ˆ[Û]ÏVØ	ÛßHÈHˆH˜	Ò›
‹Š_XNÙ›ÜŠ]HÙˆJ^ÜËœ\Ú
	Ñ
VÍJ_H	Ñ
VÍWJ_HX
NÙ›ÜŠ]M‹YK›[™ÝÝŽÝ
ÏMŠZYŠ\Ó˜SŠVÝJJ\Ëœ\Ú
	Ñ
VÝ
ÍJ_H	Ñ
VÝ
ÍWJ_H
NÙ[Ù^Û]Û‹‹KKË×OYKœÛXÙJ
ÍŠNÜËœ\Ú
Û‹‹KKË×K›X\

Kš›Ú[Š
JØØ
_YK›[™ÝOOM‰‰œËœ\Ú
	Ñ
VÍJ_H	Ñ
VÍWJ_H
_\Ëœ\Ú
Ø˜˜Ø
NÛ]Ï\Ëš›Ú[Š˜
K[™]ÈŠ
NÛœÙ]
›Ü›U\XJKœÙ]Y“˜[YJÝX\X›Ü›X
KœÙ]Y“˜[YJ\XØš™XÝ
KœÙ]
›ÞJKœÙ]
[™ÝË›[™Ý
NÛ]O[™]ÈÛŠÊNÜ™]\›ˆK™XÝ[_\Ý]XÈ\Þ[˜ÈÜ™X]S™]Ð\X\˜[˜ÙTÝ™X[JKŠ^ÚYŠK›Û[››Ý][ÛŠ\™]\›ˆ[ÚYŠKš\ÔÚYÛ˜]\™J\™]\›ˆ\ËˆÝ
K
NÛ]Ü›Ý][ÛŽœŸOYKÚ[XYÙT™YŽšKÚY˜KZYÚ›ßO[‹š[XYÙKÏ[™]ÈŠ
KÏ[™]ÈŠ
NÜËœÙ]
Øš™XÝÊKËœÙ]
[LJNÛ]XH	Ø_H	ÛßHÛHÒ[LÈXO[™]ÈŠ
NÚYŠKœÙ]
›Ü›U\XJKKœÙ]Y“˜[YJÝX\X›Ü›X
KKœÙ]Y“˜[YJ\XØš™XÝ
KKœÙ]
›ÞÌK×JKKœÙ]
™\ÛÝ\˜Ù\ØÊKŠ^Û]OS
‹KÊNÝKœÙ]
X]š^J_[][™]ÈÛŠ
NÜ™]\›ˆ™XÝ]K_KXÛ\ÜÈ^[™È^^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ]ÙXÝ™YŽ›ŸOYK[™]È]J™Ù]
”Ø
KŠNÝ\Ë™]K˜[››Ý][Û•\O[K‘’SPUPÒQS•\Ë™]Kš\ÓÝÛØ[˜\Ï]\Ë™]K››Ô›Ý]K\Ë™]K››ÒSHLK\Ë™]K™š[O\‹œÙ\šX[^˜X›NÛ]O]™Ù]
˜[YX
NÝ\Ë™]K›˜[YOZH[œÝ[˜Ù[ÙˆÙÙJK›˜[YJN˜\Ú[˜Û]O]™Ù]
ØX
NÝ\Ë™]K™š[[O]\[ÙˆOOX[X™\˜	‰˜OL	‰˜OLOØN›[_NÛ]Ø^ÙÙ]Š
^Ü™]\›ˆŠ\Ë˜™]ÈZ[\œ˜^JÍËL‹MËŒ‹ËL‹MËŒ‹ËL‹MËŒ‹ËL‹MËŒ‹KKMŒKKMŒKKMŒKKMŒLKM‹ŒËLKM‹ŒËLKM‹ŒËLKM‹ŒË‹LMKŒK‹LMKŒK‹LMKŒK‹LMKŒWJJ_KÙ]Ê
^Ü™]\›ˆŠ\ËØ™]È[Ì\œ˜^JËMŽÍŽLÍ‹LÎMMN‹ŒŒLNNKLLLLÌÌLMÍNMËLŒ‹LMÌÌŒÌLÍKMMÌNNËMÍÌÍMM‹LNMNMMËMŒŒËLNNLMŒ‹NŒÍŽ‹MÍLLKLMLŒŒŽLLŒÍLÍLÌŽKLMMÎMLLLLŽMLMŒÌ‹ÍÌMÍÌLËLÍÌÎMÌÌ‹MÌMMNŽLKÎMŒËMŒÎÌÍKMMLÍÎMŽÎLLNNÍŽLLNÌÍŒÎMŒKLMŒÍLÌMLKLMŽMËMLMÍÎMÌÍLÌŽÌËLNLŒÍÌÍLÍÎMNLŒŒMÍŒËNÎLÌMŒ‹LÍLÌMMM‹LMLÌNLŒŒLÌŽLÌÍLËLMMMMÍŒÌ‹LLMÌÌŽLÎLMÍLÍNLÍÌŒŒ‹MÌŒLŒNMÎKÍŒŽLNKMÍËMŒNMNÍKLÌÍLŒNNMLÌÎLKLNNŒÌLLŽLMMKLMMŒÍMLKMMÍÍMKMÌMMÌKLNMNŒ‹LLLMLŒËLŒMLŒÎNKNÌÌÌLÌÍNKLÌŒLMÍLMMŒNNÎLÌLMLMKLMMLŒÌÌLLLŒŒLÍÎKÌNÎÌNKLÍÍMMLWJJ__NÙ[˜Ý[ÛˆØŠKŠ^Û]LMÌÌNNLËOKLÌMÌÌÎÎKOKLMÌÌNNMÏLÌMÌÌÎÎÏ[ŠÍÌ‰‹MÏ[™]ÈZ[\œ˜^JÊKNÙ›ÜŠLÛŽÊÊÛ
XÖÛOYVÝ
Ê×NØÖÛ
Ê×OLLŽÛ]\ËNÛ	‰ŠY
KÖÛ
Ê×O[ÉŒMKÖÛ
Ê×O[IŒMKÖÛ
Ê×O[ŒLÉŒMKÖÛ
Ê×O[ŒŒIŒMKÖÛ
Ê×O[ŒŽIŒMK
ÏLÎÛ][™]È[Ì\œ˜^JMŠKÚÎœŽ›_OYØŽÙ›ÜŠLÛÎÊ^Ù›ÜŠOLÝOMŽÊÊÝK
ÏM
Y–ÝWOXÖÛ_ÖÛ
ÌWOÖÛ
Ì—OMŸÖÛ
Ì×OÛ]O\‹ZKXKÏ[ËÙ›ÜŠOLÝOÊÊÝJ^ÝOMÊ]	›Ÿ	œË]JNOÌÊ\ÉœÉ›‹MJJÌIŒMJNOÊ]›—œËLÊJÍIŒMJNŠ[—ŠœÊKMÊIŒMJNÛ]\ËOYJÙ
ÜÝWJÙ–Ú_O[VÝWNÜÏ[‹]]
ÊO_OŒÌ‹XJ_O\Ÿ\\ŠÙ_OZJÝOXJÛŸÏ[ÊÜß\™]\›ˆ™]ÈZ[\œ˜^JÜ‰ŒMKŽ	ŒMKŒM‰ŒMKŒ	ŒMKIŒMKOŽ	ŒMKOŒM‰ŒMKOŒ	ŒMKIŒMKOŽ	ŒMKOŒM‰ŒMKOŒ	ŒMKÉŒMKÏŽ	ŒMKÏŒM‰ŒMKÏŒ	ŒMWJ_Y[˜Ý[Ûˆ˜ŠJ^Ýž^Ü™]\›ˆÙJJ_XØ]Ú

^Ü™]\›ˆJU‹NXÛÙ[™È˜Z[Yˆ‰ÝH‹˜
K__]˜\ˆXXÛ\ÜÈ^[™È^ØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë››ÙO[[[Û‘[™[[Y[
J^Û]\Ý\\‹›Û‘[™[[Y[
JNÚYŠ	‰™OOOX˜N™]\Ù]Ø
]›ÝÈ\Ë››ÙO]\œ›ÜŠX›Ü[™È]\Ù]S\œÙ\‹˜
__K˜XÛ\ÜÞØÛÛœÝXÝÜŠJ^ÚYŠK™]\Ù]Ê]\Ë››ÙO[™]ÈJÚ\Ð]šX]\ÎˆLJKœ\œÙQœ›ÛTÝš[™ÊK™]\Ù]ÊK™ØÝ[Y[[[Y[Ù[Ù^Û][™]ÈXŠÚ\Ð]šX]\ÎˆLJNÝž^Ýœ\œÙQœ›ÛTÝš[™ÊVØžJ_XØ]Úß]\Ë››ÙO]››Ù__YÙ]˜[YJJ^ÚYŠ]\Ë››Ù_YJ\™]\›˜Û]]\Ë››ÙKœÙX\˜Ú›ÙJÝ
JK
NÜ™]\›ˆÝ™š\œÝÚ[Ë››ÙS˜[YOOOX˜[YXÝ˜Ú[™[‹›X\
OO˜ŠK^ÛÛ[
JN˜Š^ÛÛ[
N˜_KXÛ\ÜÞÈÙNÈÝLKÌÈÛLKÌÈÜKLKÌÈÚOKLKÌÈØO[[ÈÛÏV×NÈÜÏV×NÈØÏKLNÈÛHLNØÛÛœÝXÝÜŠJ^Ý\ËˆÙOYNÛ]YK™]Kœ]XYÚ[ÎÚYŠ]
^ÖÝ\ËˆÝ\ËˆÛ‹\ËˆÜ‹\ËˆÚWOYK™]Kœ™XÝÜ™]\›ŸY›ÜŠ]OL]›[™ÝÙOŽÙJÏN
]\ËˆÝSX]›Z[Š\ËˆÝÙWJK\ËˆÜSX]›X^
\ËˆÜ‹ÙJÌ—JK\ËˆÛSX]›Z[Š\ËˆÛ‹ÙJÍWJK\ËˆÚOSX]›X^
\ËˆÚKÙJÌWJNÝ›[™ÝŽ	‰Š\ËˆØO]
_[Ý™\›\ÊJ^Ü™]\›ˆJ\ËˆÝYKˆÜŸ\ËˆÜYKˆÝ\ËˆÛYKˆÚ_\ËˆÚOYKˆÛŠ_HÝJK
^ÚYŠ\ËˆÝY_\ËˆÜY_\ËˆÛ]\ËˆÚO]
\™]\›ˆLNÛ]]\ËˆØNÚYŠ[Š\™]\›ˆLÚYŠ\ËˆØÏL
^Û]]\ËˆØÎÚYŠJ–Ü—OY_–ÜŠÌ—OY_–ÜŠÍWO]–ÜŠÌWO]
J\™]\›ˆLÝ\ËˆØÏKL_Y›ÜŠ]LO[‹›[™ÝÜNÜŠÏN
ZYŠJ–Ü—OY_–ÜŠÌ—OY_–ÜŠÍWO]–ÜŠÌWO]
J\™]\›ˆ\ËˆØÏ\‹LÜ™]\›ˆL_XYÛ\
KŠ^Ü™]\›ˆ\ËˆÝJK
OÊ\ËˆÜË›[™ÝŒ	‰Š\ËˆÛËœ\Ú
\ËˆÜËš›Ú[Š
JK\ËˆÜË›[™ÝL
K\ËˆÛËœ\Ú
ŠK\ËˆÛHLL
NŠ\Ë™\ØX›Q^˜PÚ\œÊ
KLJ_XY^˜PÚ\ŠJ^Ý\ËˆÛ	‰\ËˆÜËœ\Ú
J_Y\ØX›Q^˜PÚ\œÊ
^Ý\ËˆÛ	‰Š\ËˆÛHLK\ËˆÜË›[™ÝL
_\Ù]^

^Ý\ËˆÙK™]K›Ý™\›ZY^]\ËˆÛËš›Ú[Š
__KØXÛ\ÜÞÈÙO[™]ÈX\ØÛÛœÝXÝÜŠJ^Ù›ÜŠ]ÙˆJ^ÚYŠ]™]Kœ]XYÚ[É‰ˆ]™]Kœ™XÝ
XÛÛ[YNÛ]O[™]ÈŠ
NÙ›ÜŠ]Ý—[Ùˆ\ËˆÙJ]›Ý™\›\ÊJI‰ŠÛ‹˜Y
JN\ËˆÙKœÙ]
™]ÈÙ]
ÙWJJJNÝ\ËˆÙKœÙ]
K[
__XYÛ\
K‹Š^Û]OYVÍJÝÌ‹OYVÍWJÛ‹Ì‹ÎÙ›ÜŠ]ÙK[Ùˆ\ËˆÙJ^ÚYŠÊ^ÛËš\ÊJOÙK˜YÛ\
KKŠN™K™\ØX›Q^˜PÚ\œÊ
NØÛÛ[Y_YK˜YÛ\
KKŠI‰ŠÏ]
__XY^˜PÚ\ŠJ^Ù›ÜŠ]Ùˆ\ËˆÙKšÙ^\Ê
J]˜Y^˜PÚ\ŠJ_\Ù]^

^Ù›ÜŠ]HÙˆ\ËˆÙKšÙ^\Ê
JYKœÙ]^

__K	XÛ\ÜÞØÛÛœÝXÝÜŠK
^Ý\ËšYÚY_\Ë›ÝÏ]X[™
J^Ý\ËšYÚ	YKšYÚ\Ë›ÝÉYK›Ýß^ÜŠJ^Ý\ËšYÚYKšYÚ\Ë›Ý×YK›Ýß\ÚYšYÚ
J^ÙOLÌÊ\Ë›ÝÏ]\ËšYÚ™KLÌŸ\ËšYÚL
NŠ\Ë›ÝÏ]\Ë›ÝÏ™_\ËšYÚÌ‹YK\ËšYÚ]\ËšYÚ™_
_\›Ý]TšYÚ
J^Û]ŽÙIŒÌÊ]\Ë›ÝË]\ËšYÚ
NŠ]\Ë›ÝË]\ËšYÚ
KILÌK\Ë›ÝÏ]™_Ì‹YK\ËšYÚ[™_Ì‹Y_[›Ý

^Ý\ËšYÚ_\ËšYÚ\Ë›ÝÏ_\Ë›ÝßXY
J^Û]J\Ë›ÝÏŒ
JÊK›ÝÏŒ
KJ\ËšYÚŒ
JÊKšYÚŒ
NÝŽMMÌŽMI‰ŠŠÏLJK\Ë›ÝÏ]\ËšYÚ[ŸXÛÜUÊK
^ÙVÝO]\ËšYÚŒ	ŒMKVÝ
ÌWO]\ËšYÚŒM‰ŒMKVÝ
Ì—O]\ËšYÚŽ	ŒMKVÝ
Ì×O]\ËšYÚ	ŒMKVÝ
ÍO]\Ë›ÝÏŒ	ŒMKVÝ
ÍWO]\Ë›ÝÏŒM‰ŒMKVÝ
Í—O]\Ë›ÝÏŽ	ŒMKVÝ
Í×O]\Ë›ÝÉŒM_X\ÜÚYÛŠJ^Ý\ËšYÚYKšYÚ\Ë›ÝÏYK›Ýß_NÛ]Ø^ÙÙ]Ê
^Ü™]\›ˆŠ\ËØÛ™]È	
LLMŒÍLÍŒMÍÍN
K™]È	
NNMÍKŒŽLMÌJK™]È	
ÌLÌŒÍÌKÎMÎNJK™]È	
ÎLŒLMMÌËŒMÌÌŽMMM
K™]È	
MŒNNÌMŒËMŒŽÌŠK™]È	
MLMÌNLËÌLÎÍJK™]È	
LÍŒÍMÍŽLÍÍÌMMÎJK™]È	
ŽÌÍŒÌŒŒKÍŒMMŒ
K™]È	
ÍŒÎLÌÍÌÎM
K™]È	
ÌLNNKLMNMMŠK™]È	
ŒÌŒLÎLÌŒÍŒLÍ
K™]È	
MŽNNËÍNLÌNM
K™]È	
NLLÎÎŽNŒÎÊK™]È	
ŒMŒŒÎŒ‹NLLÌÍŒLLÊK™]È	
ŒMLËŒÌÎÌÌMÊK™]È	
ÌŒŒNÍÎMÍÍŽ
K™]È	
ÎÍLÎLKŒLÍN
K™]È	
ŒŒŒÍÍMÌLLLÎJK™]È	
ÍÌÎŒÍLŒÍÌÊK™]È	
ŒÍŒŽŒÎLÌÊK™]È	
ÍÌMNNËMMNNLLJK™]È	
LLMLLŒ‹NMÌLŒÍJK™]È	
MMMLMŽL‹ÌMÍLŒNLÌŠK™]È	
NNMŒN‹ŒNNMLÍÊK™]È	
MMŒŒ‹ÎNNMÌNLÌÎJK™]È	
ŽŒNÍÍKÍÎMŠK™]È	
ŽMLŽNMŽMNMÎJK™]È	
ÌŒLÌLÍÌKÌŒÌÌÍÎMMŠK™]È	
ÌÌÍMÌNLKLÍMÌŠK™]È	
ÍNLŽÌLKŽMLJK™]È	
LLÎLŽNLËÍÍNÌŒÎÊK™]È	
ÌÎNMKMŽÌMÎLÍŠK™]È	
ŒÌÌŒKLNMÎNM
K™]È	
ÍÌÍLŽNLL‹MMŒMÌÍ
K™]È	
LŽMÍMÌÍÌ‹MLŒŽMJK™]È	
LÎMŒNŒŽLKÎÌÎŒÊK™]È	
MŽMLNÍÌŒÍÍLÌÎL
K™]È	
NNŒLLKLMÍÍ
K™]È	
ŒMÍÌŒÍLLŒÍNLMŠK™]È	
MŽMMŒÍËÍÍÍŒÊK™]È	
ÌÌNLŒKLŽLŒÍŒ
K™]È	
ŽŒÌLKÌMNMÌÊK™]È	
ÌNMÌÌÍLNMLMÊK™]È	
ÌÍMÍÍÌKLŒŒMÌ
K™]È	
ÍLMŒNMËÍŒŒÍ
K™]È	
ÍŒÍLŽMÌÌMÍÍŠK™]È	
MMÌNLKMÌÌMNM
K™]È	
ÍMŒÌÍLLMŽMÌŒ
K™]È	
ÌŒÍÌÍÌLŒÍÍLŠK™]È	
LŽMŒM‹LÍŒÌNNMJK™]È	
NLŒMM‹ÍÍLŽMNLÊK™]È	
ÎNMÎÍËÍÎLLŽ
K™]È	
MNLÎMMÌKÌÌNÌÍÊK™]È	
LÌŒŽŒŒŒNÎLÌŒÍÊK™]È	
MLÍÌŒŒËŒÌÍNMJK™]È	
MÍÎÌÍÍÎKÍŒŒÍŽNJK™]È	
NMMMMŒŒŒŒ‹MMÍNNLLŠK™]È	
ŒLMKLLMNLŽLŽ
K™]È	
ŒŒÍÌÌL‹ÌMŽLÌŠK™]È	
ŒÍŒNLÍÍŒ
K™]È	
ŽÍÍNLÍŽNÍ
K™]È	
ÍMÌÍNËÍÌÌÌLLJK™]È	
ÌŒÌMÎKŽNNLÍLMMÌÊK™]È	
ÌÌŽLÌLŽNÎMNLŒÊK™]È	
ÌÎLMMŽMŒMÎLŽÎÎL
K™]È	
ÍLMLÌÌKMŒŽÌLJK™]È	
ÎMNÍŒ‹ÍMŽMLÍ
K™]È	
LNŒÌÌKŒÎNNLŠK™]È	
LMNÍNLMLÎMM
K™]È	
MÍŽLŒKÌÌLMLÌ
K™]È	
ŽLÎÍM‹ÌŒÎNLÌŠK™]È	
ŒÎLÌŽKÌŒŒŒÌMJK™]È	
ŽMÌMÌÌËNÍMŽÍŠK™]È	
LŒMŽMÌKLÎLŽLJK™]È	
LMÌÍŒŽNÍMMÌL
K™]È	
LLŒNŒNŽMÍÍŠK™]È	
LŽÌÍÌÍNMLMN
K™]È	
MLMLNMŒÍLNŠK™]È	
MŒÌMÎLMKNÌMÍŽ
K™]È	
NMŒÌM‹LŒNMNLJWJ__NÙ[˜Ý[ÛˆØŠK‹‹J^ÙK˜\ÜÚYÛŠ
KK˜[™
ŠKK˜\ÜÚYÛŠ
KK››Ý

KK˜[™
ŠKKžÜŠJ_Y[˜Ý[ÛˆŠK‹‹J^ÙK˜\ÜÚYÛŠ
KK˜[™
ŠKK˜\ÜÚYÛŠ
KK˜[™
ŠKKžÜŠJKK˜\ÜÚYÛŠŠKK˜[™
ŠKKžÜŠJ_Y[˜Ý[ÛˆXŠKŠ^ÙK˜\ÜÚYÛŠ
KKœ›Ý]TšYÚ
Ž
K‹˜\ÜÚYÛŠ
K‹œ›Ý]TšYÚ
Í
KKžÜŠŠK‹˜\ÜÚYÛŠ
K‹œ›Ý]TšYÚ
ÎJKKžÜŠŠ_Y[˜Ý[ÛˆŠKŠ^ÙK˜\ÜÚYÛŠ
KKœ›Ý]TšYÚ
M
K‹˜\ÜÚYÛŠ
K‹œ›Ý]TšYÚ
N
KKžÜŠŠK‹˜\ÜÚYÛŠ
K‹œ›Ý]TšYÚ
JKKžÜŠŠ_Y[˜Ý[ÛˆØŠKŠ^ÙK˜\ÜÚYÛŠ
KKœ›Ý]TšYÚ
JK‹˜\ÜÚYÛŠ
K‹œ›Ý]TšYÚ

KKžÜŠŠK‹˜\ÜÚYÛŠ
K‹œÚYšYÚ
ÊKKžÜŠŠ_Y[˜Ý[ÛˆØŠKŠ^ÙK˜\ÜÚYÛŠ
KKœ›Ý]TšYÚ
NJK‹˜\ÜÚYÛŠ
K‹œ›Ý]TšYÚ
ŒJKKžÜŠŠK‹˜\ÜÚYÛŠ
K‹œÚYšYÚ
ŠKKžÜŠŠ_Y[˜Ý[ÛˆXŠK‹HLJ^Û]KKËËËKÜÊO[™]È	
ÍNÌÍKÌŒÎÍÌLÌŠKO[™]È	
MMÌLLMMLŒÊKÏ[™]È	
ÎLŽLÍÌLÌŽNNJKÏ[™]È	
ÍMMŒŒÍŒMLLŽMÊKÏ[™]È	
MÌÌMMMKŽLÍÍNMÊK[™]È	
ŒÎMNŒÌKMÍLŒÌJKO[™]È	
ÍÍLLKMŽMÍŽÎJK[™]È	
LŒÌŒŽLËÌŒÍMŽ
JNŠO[™]È	
MÍÎLÌÍÌËLŒÍMÌŒ
KO[™]È	
ÌMLÍÍËŒŒÎÌÍNMJKÏ[™]È	
LLÎL‹ÌLMÍMÌŒÊKÏ[™]È	
ÍÌÍÍŒ‹MNMMÍLLŽJKÏ[™]È	
LÍNNLÌLNKŽLMÍMLLÍÊK[™]È	
ŒŒŽLÌMLLLNNJKO[™]È	
LŽÌÍŒÍKŒMLÎMMÊK[™]È	
MMMNLŒKÌÌÌÌŒJJNÛ]SX]˜ÙZ[

ŠÌMÊKÌLŽ
JŒLŽ[™]ÈZ[\œ˜^JŠKKÙ›ÜŠOLÛOŽÊÊÛJ\ÛWOYVÝ
Ê×NÜÛJÊ×OLLŽÛ]ÏY‹LMŽÛOÉ‰ŠOYÊKJÏLLKÛJÊ×O[ŒŽIŒMKÛJÊ×O[ŒŒIŒMKÛJÊ×O[ŒLÉŒMKÛJÊ×O[IŒMKÛJÊ×O[ÉŒMNÛ]ÏP\œ˜^J
NÙ›ÜŠOLÛOÛJÊÊWÖÛWO[™]È	

NÛ]ÚÎŸOPØ‹O[™]È	

K[™]È	

K[™]È	

KÏ[™]È	

KÏ[™]È	

KÏ[™]È	

K[™]È	

KO[™]È	

K[™]È	

KÏ[™]È	

KÏ[™]È	

KO[™]È	

KŽÙ›ÜŠOLÛOŽÊ^Ù›ÜŠLÚMŽÊÊÚ
WÖÚKšYÚ\ÛWOÛJÌWOMŸÛJÌ—OÛJÌ×KÖÚK›ÝÏ\ÛJÍOÛJÍWOMŸÛJÍ—OÛJÍ×KJÏNÙ›ÜŠLMŽÚÊÊÚ
ZWÖÚKØŠ‹ÖÚL—KJK‹˜Y
ÖÚM×JKØŠËÖÚLMWKJK‹˜Y
ÊK‹˜Y
ÖÚLM—JNÙ›ÜŠK˜\ÜÚYÛŠJK‹˜\ÜÚYÛŠJK˜\ÜÚYÛŠÊKË˜\ÜÚYÛŠÊKË˜\ÜÚYÛŠÊKË˜\ÜÚYÛŠ
K˜\ÜÚYÛŠJKK˜\ÜÚYÛŠ
KLÚÊÊÚ
Q˜\ÜÚYÛŠJKŠËËJK˜Y
ÊKØŠËËËJK˜Y
ÊK˜Y
–ÚJK˜Y
ÖÚJKXŠËKJKŠËK‹JKË˜Y
ÊKQKOU]ËÏPËË˜Y

KÏTËÏ^X‹^K‹˜\ÜÚYÛŠ
K‹˜Y
ÊKOZŽÚK˜Y
JKK˜Y
ŠKË˜Y

KË˜Y
ÊKË˜Y
ÊK˜Y
ÊKK˜Y

K˜Y
J_[]NÜ™]\›ˆÊO[™]ÈZ[\œ˜^J
KK˜ÛÜUÊK
KK˜ÛÜUÊK
KË˜ÛÜUÊKMŠKË˜ÛÜUÊK
KË˜ÛÜUÊKÌŠK˜ÛÜUÊK
JNŠO[™]ÈZ[\œ˜^J
KK˜ÛÜUÊK
KK˜ÛÜUÊK
KË˜ÛÜUÊKMŠKË˜ÛÜUÊK
KË˜ÛÜUÊKÌŠK˜ÛÜUÊK
KK˜ÛÜUÊK
K˜ÛÜUÊKMŠJK_Y[˜Ý[Ûˆ˜ŠKŠ^Ü™]\›ˆXŠK‹L
_[]X^ÙÙ]Ê
^Ü™]\›ˆŠ\ËØÌLLMŒÍLNNMÍKÌLÌŒÍÌKÎLŒLMMÌËMŒNNÌMŒËMLMÌNLËLÍŒÍMÍŽÌÍŒÌŒŒKÍŒÎLÌLNNKŒÌŒLÎMŽNNËNLLÎÎŒMŒŒÎŒ‹ŒMLËÌŒŒNÎÍLÎLKŒŒŒÍÍÍÌÎŒÍŒŽÍÌMNNËLLMLLŒ‹MMMLMŽL‹NNMŒN‹MMŒŒ‹ŽŒNÍÍKŽMLŽNMŽÌŒLÌLÍÌKÌÌÍMÌNLKÍNLŽÌLKLLÎLŽNLËÌÎNMKŒÌÌŒKÍÌÍLŽNLL‹LŽMÍMÌÍÌ‹LÎMŒNŒŽLKMŽMLNÍÌNNŒLLKŒMÍÌŒÍLMŽMMŒÍËÌÌNLŒKŽŒÌLKÌNMÌÌÌÍMÍÍÌKÍLMŒNMËÍŒÍLŽMMÌNLKÍMŒÌÍÌŒÍÌÍLŽMŒM‹NLŒMM‹ÎNMÎÍËMNLÎMMÌKLÌŒŽŒŒŒNMLÍÌŒŒËMÍÎÌÍÍÎKNMMMMŒŒŒŒ‹ŒLMKŒŒÍÌÌL‹ŒÍŒNLŽÍÍÍMÌÍNËÌŒÌMÎKÌÌŽLÌLŽNJ__NÙ[˜Ý[Ûˆ˜ŠK
^Ü™]\›ˆOOÌ‹]Y[˜Ý[ÛˆŠKŠ^Ü™]\›ˆIŸ™I›ŸY[˜Ý[Ûˆ˜ŠKŠ^Ü™]\›ˆI™I›—	›ŸY[˜Ý[ÛˆXŠJ^Ü™]\›ˆ˜ŠKŠW“˜ŠKLÊW“˜ŠKŒŠ_Y[˜Ý[ÛˆŠJ^Ü™]\›ˆ˜ŠKŠW“˜ŠKLJW“˜ŠKJ_Y[˜Ý[Ûˆ˜ŠJ^Ü™]\›ˆ˜ŠKÊW“˜ŠKN
W™OŒßY[˜Ý[Ûˆ˜ŠJ^Ü™]\›ˆ˜ŠKMÊW“˜ŠKNJW™OŒLY[˜Ý[Ûˆ˜ŠKŠ^Û]LMÍÎLÌÍÌËOLÌMLÍÍËOLLLÎL‹ÏLÍÌÍÍŒ‹ÏLLÍNNLÌLNKÏLŒŒŽLMLŽÌÍŒÍKOLMMMNLŒKSX]˜ÙZ[

ŠÎJKÍ
J[™]ÈZ[\œ˜^J
KNÙ›ÜŠLÜŽÊÊÜ
Y–ÜOYVÝ
Ê×NÙ–Ü
Ê×OLLŽÛ]YNÜ	‰ŠZ
K
ÏLË–Ü
Ê×O[ŒŽIŒMK–Ü
Ê×O[ŒŒIŒMK–Ü
Ê×O[ŒLÉŒMK–Ü
Ê×O[IŒMK–Ü
Ê×O[ÉŒMNÛ]Ï[™]ÈZ[Ì\œ˜^J
KÚÎ—ßOSXŽÙ›ÜŠLÜÊ^Ù›ÜŠOLÛOMŽÊÊÛJYÖÛWOY–ÜO–Ü
ÌWOMŸ–Ü
Ì—O–Ü
Ì×K
ÏMÙ›ÜŠOLMŽÛOÊÊÛJYÖÛWO^˜ŠÖÛKL—JJÙÖÛKM×JÔ˜ŠÖÛKLMWJJÙÖÛKLM—_Û]O\‹ZKXK[Ë\ËXËO[]KÎÙ›ÜŠOLÛOÊÊÛJ^XŠÓŠ
JÔŠ‹JJ×ÖÛWJÙÖÛWKÏRXŠJJÑ˜ŠKŠK^KO]‹ZY
Þ[‹]YKO^
ÔßÜ\ŠÙ_OZJÝOXJÛŸÏ[ÊÙÏ\ÊÚÏXÊÝŸ[
Þ_O]JØŸ\™]\›ˆ™]ÈZ[\œ˜^JÜŒ	ŒMKŒM‰ŒMKŽ	ŒMK‰ŒMKOŒ	ŒMKOŒM‰ŒMKOŽ	ŒMKIŒMKOŒ	ŒMKOŒM‰ŒMKOŽ	ŒMKIŒMKÏŒ	ŒMKÏŒM‰ŒMKÏŽ	ŒMKÉŒMKÏŒ	ŒMKÏŒM‰ŒMKÏŽ	ŒMKÉŒMKÏŒ	ŒMKÏŒM‰ŒMKÏŽ	ŒMKÉŒMKŒ	ŒMKŒM‰ŒMKŽ	ŒMK	ŒMKOŒ	ŒMKOŒM‰ŒMKOŽ	ŒMKIŒMWJ_]˜\ˆ˜XÛ\ÜÈ^[™È›žØÛÛœÝXÝÜŠKŠ^ÜÝ\\Š
K\ËœÝYK\Ë™XÝYK™XÝ\Ë™XÜž\[‹\Ë›™^Ú[šÏ[[\Ëš[š]X[^™YHL_\™XY›ØÚÊ
^Û]NÚYŠ\Ëš[š]X[^™YÙO]\Ë›™^Ú[šÎŠO]\ËœÝ‹™Ù]ž]\ÊLLŠK\Ëš[š]X[^™YHL
KYOË›[™Ý
^Ý\Ë™[ÙHLÜ™]\›Ÿ]\Ë›™^Ú[šÏ]\ËœÝ‹™Ù]ž]\ÊLLŠNÛ]]\Ë›™^Ú[šÏË›[™ÝŒ]\Ë™XÜž\ÙO[ŠK]
NÛ]]\Ë˜Y™™\“[™ÝO\ŠÙK›[™ÝÝ\Ë™[œÝ\™PY™™\ŠJKœÙ]
KŠK\Ë˜Y™™\“[™ÝZ__KXÛ\ÜÞØÛÛœÝXÝÜŠJ^Ý\Ë˜OL\Ë˜LÛ][™]ÈZ[\œ˜^JMŠKYK›[™ÝÙ›ÜŠ]OLÙOMŽÊÊÙJ]ÙWOYNÙ›ÜŠ]LOLÜMŽÊÊÜŠ^Û]O]Ü—NÚOZJØJÙVÜ‰[—IŒMKÜ—O]ÚWKÚWOX_]\ËœÏ]Y[˜Üž\›ØÚÊJ^Û]]\Ë˜K]\Ë˜‹]\ËœËOYK›[™ÝO[™]ÈZ[\œ˜^JJNÙ›ÜŠ]ÏLÛÏNÊÊÛÊ^Ý]
ÌIŒMNÛ]O\–ÝNÛ[ŠÚIŒMNÛ]Ï\–Û—NÜ–ÝO\Ë–Û—OZKVÛ×OYVÛ×Wœ–ÚJÜÉŒMW_\™]\›ˆ\Ë˜O]\Ë˜[‹_YXÜž\›ØÚÊJ^Ü™]\›ˆ\Ë™[˜Üž\›ØÚÊJ_Y[˜Üž\
J^Ü™]\›ˆ\Ë™[˜Üž\›ØÚÊJ__KXXÛ\ÜÞÙXÜž\›ØÚÊJ^Ü™]\›ˆ_Y[˜Üž\
J^Ü™]\›ˆ__KØXÛ\ÜÞ×ÜÏ[™]ÈZ[\œ˜^JÎNKLLNKLŒË‹LËLLKNMËKLËËMŒMKMÌKLNŒ‹LÌŒKLKLKÌKMÌËŒL‹MŒ‹MÍKMM‹MLMNL‹NËLËMËÎMŒËËŒL‹MKŒŽKKLLËŒM‹KŒKNNKÍKNMKMLKMMËNLŽŒ‹ŒÍKÎKMÎLMËKLÌK‹ËLLLMŒ‹NKŒMMÎKKŒËËLÌ‹ËŒKŒÍËÌ‹L‹MÍËLKL‹ŒËNLMËÍÍ‹ŒËŒŒÎKMÌLKËÍËLKLÌËŽKK‹LËŒMNKMŽKMŒËMËM‹MMËM‹KNN‹ŒNÌËM‹MKËŒLŒKL‹NKŒÍ‹MKMLKŽŒËNM‹MËL‹ŒKLLËKLMKM‹LŽKÎKŒŒÍ‹MLÍ‹ÌŒÎNŒŒŒ‹MLKŒNKŒLNLÌË‹Í‹L‹NMŒLKMÌ‹NMKMKŒŽLŒKŒÌKŒMKLKMKŒLËÎMŽKL‹ŒÍLKLŒ‹MÍN‹LŒÍË‹ŽM‹NNNŒÌ‹ŒŒKLM‹ÌKÍKNKLÎKLÎLL‹Œ‹NKL‹Ì‹Ë‹MMËLËËNKLÍNLËŽKMNŒKML‹MËLKŒMËM‹MMMKÌLÍKŒÌËŒ‹KŒŒËMMŒKLÍËLËNLKŒÌ‹LKMLËKMKMÍ‹NËŒ—JN×Ú[—ÜÏ[™]ÈZ[\œ˜^JÎ‹KL‹ŒLËMMKM‹NLKMŒËMNLŽKËŒMKLKLŒËMËLÌMMKËMKLÍKL‹M‹ËŽNM‹ŒŒ‹ŒÌËŒËLŒËMLM‹NMÍKŒKŒÎÍ‹MKLK‹LNMKÎ‹MŒKL‹ŒMËÍ‹MÎLNLKMŒ‹ÌËLKLÎKŒKÍËLM‹LLÍLML‹Œ‹ŒL‹ML‹ŒLËLKN‹M‹LLL‹Ì‹LËŒÍËNKŒNMŒKÌËMËMKMMËLÌ‹MŒM‹MÌKMNŒLKLËŒŽKNMÎKŽK‹ŒÌMËŒ‹ŒËMK‹NLËMÍKNKËKNKLÎLËNMKMËKÎKLËŒŒŒÍMLK‹ŒËŒ‹NŒÌLMKMLMÌ‹LM‹ÍŒÌKMÌËLËLÌËŒ‹KMKŒÌ‹ŽLMËŒŒËLLÌKK‹LLËŽKKNMËLÍËLLKNËNMMÌNLËL‹‹Œ‹ÍKNNŒLLŒKÌ‹MMŒNKNL‹MLŒŒKLÌKŒŒKMŽLKLÍ‹ËNNKKMÍËNM‹KÎKLŽŒÍ‹MKM‹KLËMŽKKNKÍLËKŒŽKLŒ‹MNKMËŒKMM‹ŒÎKMŒŒNKÍËMÍ‹KMÍ‹ŒŒÍKNËŒLÌKËMLËMËŒËËL‹N‹LNKŒMÎŒKLKŒNKKÌËL‹LWJN×ÛZ^[™]ÈZ[Ì\œ˜^JÌŒÍMÍNËÌMÍÍÌÍÍLÍËMNMÍLLÌÍMKŒÍLÌMMÌÎKNÍÎLÍM‹ŒLNŒMNMKNMÎŽÌMMŒÎLŒÍËLŒMLŒLLLNLLLNKMMÍMŒMŽNMLMÍÍÍLŽKÍÍÍNŽNL‹ÌŒLMÎKŒÍŽNNLŽLŽLËÍŒÍMÌÌÍŒÍŒÍÌÌËÌŽNLÎÍÍLŽÍŽKÌLŒŒŒM‹MÍÌMKŒÍŒŒLŒÎŒNLÎŒKŽÍLLŒÌÎM‹ŽLLÍËÌÍMLÍLNÌLÍMÍKÍÎLLŒËÍMÍŽÌLL‹ÌÍLÎMŽKÌÍÍÍŒMÌ‹ÎLMŒÍËÎMÍÍÍLÍM‹ÎLMËÍŒLN‹ŽÍMŒËÍÍŒŽLŽLÌÍŒÎLŽKÌLLLM‹ÌŒLMLÍKÌŒÍÌŽKŒMŽLÌÌNLLNNMKNNÍMNÌÌËŽNMÌŒMLNMÌÎËŒŽLŽŒLÌÍLËŽMLÌŽ‹LÌÌMŽÎËLMÌŽMÌMÍMNLKMLMÌMNMÍMÍÍKŒLLÍNÍŒNÌËMNMŒŒ‹ŽLLŒNMÍ‹ÍÌÍLKŽMÍŒMLMLŒÌŒLMŒŒÌMËLLŒŒLÎŒLÎMŽKŒÌŽLL‹ŒŽMÌŽMKÍÌLNŽMŒ‹ÍMÍNNLŽKÌMÎL‹ÍÍLÌLÌÌÌKÎÍŽNLÍÎMÎLKMÎŒŒŒŽMÍÍÍKLÌŽMÌÍ‹LLÎMÎMÌKLÍÍNLL‹MŒLNMÌÎKNMÍMŽÍÍŒÍŽLÍLKMÍÍLÍŽLMÍŒÌMLLËLÍÎNNŒÍÎKMŒŒNM‹ÍKLŽNÍŽNNLÌNMLKŽMMŒMÎMMMÌLKNNLŽKŒMÍÍÎM‹MÎŒÌNMKMŽÍÌLÌMMMŒŒMKLMŒÍLÎÎMŒÌLKMMLLÍÎLLÎNŽKLÍLLŒ‹ÍÍÍMÌLŒËÌÍÍMLÎLŒÎMMËÎMŒŒLMÌÎÎËÍŒÎLL‹LÌLÍLËMÌÌÌÍŒÌŽŽMÌKŒŒÍMÌÌŽLÍMMŽKÌNLÍMÌMÍMMMKÌMŽLÍÌŒŽÎŽMLŽKÎLMŒÌN‹ŒÌNLMÌKLŽMÍÎLL‹ÍÌÍŒMLÍËÍLMÍNLÌMÎÍLKÍÌÍÌLŽNLLŒMNLKLÍŒÌLMMÍŽMÍŒKMÍLÍŒÌŒLMËŒLNMMÌ‹MÌÌÌËNLMMLÌŽÍÌŒÌKLŽÍLLÎM‹ÍŽMMKNNMÍŒŒÍMMNMMÎNËLMÍŒNLŽNÍËŒÌNNLÌLŒÌKŽMÍŽŒÎÌMÎLŽMŒKÌNÎLÎ‹MÌŽMÌNMKLÎŽLNŒŒÍŒŒŽÌÌËŒÌÍÍMLÍLNÌLLÍKÍÍLÍLÌÍNLÍÍËÌÍÌ‹ÎLLMŒNMÌKÎÍÌNNLLMŽKŒLNNÎNNMÎÍ‹MÍŒÍËŒŒLLMÎŒŽMLLLÌËÌÌÎMŒMŒŽLŒÎLKÌŒÍÌ‹ŽMŽLMLËÎLÍŒŽLLŽÎÍLÍŽMKLÍÍÌMŽMŒKÍLÍMM‹ÍÌMNKÍÌNLŒÌ‹ÌŒÌMÌŒŒŒLËŒLMLNÎNMLLÌMÌËMÌMŽLLMÍLLŒÌKLLLÎNÎLŽŒLÍKMNLN‹LÍLÎNKMŽLL‹ÍMMŒËÍÌLLÌÌMÍŒKMÌÎMNL‹LLNNMKÍÍMMLMMÌKÎMŽMMŒŒÍŽKÎLÌÌŒŒÍÍMLËŽNLÎNM‹ÍMŽLMLŒLËÍŽMŒM‹ÌÍÍMŒNKÌÌÌÍMŒÌLMÌËŒÎÎMÍŒ‹ŒMŒLMÌÌKŒÎMMNÍ‹ÍÍMMMËŽŽMÍ‹ÌLŒLMÍËÌŽLNMŒŒŒMËÌÍÍÎÍŒ‹ÌËLNMÍ‹ÍMLLŽLËMÍMN‹ÍLÎMŒËLLML‹ŒÌŒÌËNLMÍLNMŒ‹MŒMNŒLËNLLÌÌŽL‹LMÍMLŒKLLLMNËMLLM‹LÌÌÌLÍÌMÌÌLMÌŽKÌÌÌMMŽMÌ‹ŒÌŽMLÍÌËŒÎMLNMNLMËÌŽÌNMŽLŒNKLŒÍÎNLŒÎMÍÍLËMMÌŒLMNMLMÍKŒMMŒN‹NLŽMÍËMÍMMÍÎNÍNMËÍŒLÍŽLŒ‹ÍÍÎMNKÍLNMLM‹ÌÌÎLMŒËLLNLL‹ÍÍÍÍÍŽKÍÌÎÌ‹MŒNŽËŽMÍÌLMMŽÌÍÌKÌMÎMŒÌÌMMKÌÍÌLMLÎŒÍÍŒŒKŒŒÌÌŒŒÌ‹ŒÍÌŒLÍÎMWJN×ÛZ^ÛÛ[™]ÈZ[\œ˜^JMŠK›X\

K
OOLŽÝNWŒÊNØÛÛœÝXÝÜŠ
^Ý\Ë˜Y™™\[™]ÈZ[\œ˜^JMŠK\Ë˜Y™™\”ÜÚ][ÛLWÙ^[™Ù^JJ^ÚŠØ[››ÝØ[Ù^[™Ù^XÛˆH˜\ÙHÛ\ÜÈŠ_WÙXÜž\
K
^Û]‹‹KO[™]ÈZ[\œ˜^JMŠNØKœÙ]
JNÙ›ÜŠ]OL]\Ë—ÚÙ^TÚ^™NÙOMŽÊÊÙK
ÊÛŠXVÙWW]Û—NÙ›ÜŠ]O]\Ë—ØÞXÛ\ÓÙ”™\]][Û‹LNÙOLNËKYJ^ÛXVÌL×KVÌL×OXVÎWKVÎWOXVÍWKVÍWOXVÌWKVÌWO[‹XVÌMKXVÌLKVÌMOXVÍ—KVÌLOXVÌ—KVÍ—O[‹VÌ—O\‹XVÌMWKXVÌLWKOXVÍ×KVÌMWOXVÌ×KVÌLWO[‹VÍ×O\‹VÌ×OZNÙ›ÜŠ]OLÙOMŽÊÊÙJXVÙWO]\Ë—Ú[—ÜÖØVÙWWNÙ›ÜŠ]LYJŒMŽÛMŽÊÊÛ‹
ÊÜŠXVÛ—W]Ü—NÙ›ÜŠ]OLÙOMŽÙJÏM
^Û]]\Ë—ÛZ^ØVÙWWK]\Ë—ÛZ^ØVÙJÌWWKO]\Ë—ÛZ^ØVÙJÌ—WKÏ]\Ë—ÛZ^ØVÙJÌ×WNÛ]œŽœšOŒM—šOM—›ÏŒ›ÏVÙWO[Œ	ŒMKVÙJÌWO[ŒM‰ŒMKVÙJÌ—O[Ž	ŒMKVÙJÌ×O[‰ŒM__[XVÌL×KVÌL×OXVÎWKVÎWOXVÍWKVÍWOXVÌWKVÌWO[‹XVÌMKXVÌLKVÌMOXVÍ—KVÌLOXVÌ—KVÍ—O[‹VÌ—O\‹XVÌMWKXVÌLWKOXVÍ×KVÌMWOXVÌ×KVÌLWO[‹VÍ×O\‹VÌ×OZNÙ›ÜŠ]OLÙOMŽÊÊÙJXVÙWO]\Ë—Ú[—ÜÖØVÙWWKVÙWW]ÙWNÜ™]\›ˆ_WÙ[˜Üž\
K
^Û]]\Ë—ÜË‹KKÏ[™]ÈZ[\œ˜^JMŠNÛËœÙ]
JNÙ›ÜŠ]OLÙOMŽÊÊÙJ[ÖÙWW]ÙWNÙ›ÜŠ]OLNÙO\Ë—ØÞXÛ\ÓÙ”™\]][ÛŽÙJÊÊ^Ù›ÜŠ]OLÙOMŽÊÊÙJ[ÖÙWO[–ÛÖÙWWNØO[ÖÌWKÖÌWO[ÖÍWKÖÍWO[ÖÎWKÖÎWO[ÖÌL×KÖÌL×OXKO[ÖÌ—KO[ÖÍ—KÖÌ—O[ÖÌLKÖÍ—O[ÖÌMKÖÌLOXKÖÌMOZKO[ÖÌ×KO[ÖÍ×K[ÖÌLWKÖÌ×O[ÖÌMWKÖÍ×OXKÖÌLWOZKÖÌMWO\ŽÙ›ÜŠ]OLÙOMŽÙJÏM
^Û][ÖÙWK[ÖÙJÌWKO[ÖÙJÌ—KO[ÖÙJÌ×NÜ]›—šW˜KÖÙWW\—\Ë—ÛZ^ÛÛÝ›—KÖÙJÌWW\—\Ë—ÛZ^ÛÛÛ—šWKÖÙJÌ—W\—\Ë—ÛZ^ÛÛÚW˜WKÖÙJÌ×W\—\Ë—ÛZ^ÛÛØW_Y›ÜŠ]LYJŒMŽÛMŽÊÊÛ‹
ÊÜŠ[ÖÛ—W]Ü—_Y›ÜŠ]OLÙOMŽÊÊÙJ[ÖÙWO[–ÛÖÙWWNØO[ÖÌWKÖÌWO[ÖÍWKÖÍWO[ÖÎWKÖÎWO[ÖÌL×KÖÌL×OXKO[ÖÌ—KO[ÖÍ—KÖÌ—O[ÖÌLKÖÍ—O[ÖÌMKÖÌLOXKÖÌMOZKO[ÖÌ×KO[ÖÍ×K[ÖÌLWKÖÌ×O[ÖÌMWKÖÍ×OXKÖÌLWOZKÖÌMWO\ŽÙ›ÜŠ]OL]\Ë—ÚÙ^TÚ^™NÙOMŽÊÊÙK
ÊÛŠ[ÖÙWW]Û—NÜ™]\›ˆßWÙXÜž\›ØÚÌŠK
^Û]YK›[™Ý]\Ë˜Y™™\‹O]\Ë˜Y™™\”ÜÚ][Û‹OV×KÏ]\Ëš]ŽÙ›ÜŠ]LÝŽÊÊÝ
^ÚYŠ–ÚWOYVÝK
ÊÚKOMŠXÛÛ[YNÛ]]\Ë—ÙXÜž\
‹\Ë—ÚÙ^JNÙ›ÜŠ]OLÙOMŽÊÊÙJ[–ÙWW[ÖÙWNÛÏ\‹Kœ\Ú
ŠK[™]ÈZ[\œ˜^JMŠKOLZYŠ\Ë˜Y™™\\‹\Ë˜Y™™\“[™ÝZK\Ëš][ËK›[™ÝOOL
\™]\›ˆ™]ÈZ[\œ˜^NÛ]ÏLMŠ˜K›[™ÝÚYŠ
^Û]OXK˜]
LJKYVÌMWNÚYŠLMŠ^Ù›ÜŠ]LMKLM‹]Û\ŽËK[ŠZYŠVÛ—HOO]
^ÝLØœ™XZß\ËO]VØK›[™ÝLWOYKœÝX˜\œ˜^JM‹]
__[]Ï[™]ÈZ[\œ˜^JÊNÙ›ÜŠ]OLLXK›[™ÝÙOŽÊÊÙK
ÏLMŠXËœÙ]
VÙWK
NÜ™]\›ˆßYXÜž\›ØÚÊK[[
^Û]YK›[™ÝO]\Ë˜Y™™\‹O]\Ë˜Y™™\”ÜÚ][ÛŽÚYŠŠ]\Ëš][ŽÙ[Ù^Ù›ÜŠ]LØOM‰‰ŽÊÊÝ
ÊØJZVØWOYVÝNÚYŠOMŠ\™]\›ˆ\Ë˜Y™™\“[™ÝXK™]ÈZ[\œ˜^NÝ\Ëš]ZKOYKœÝX˜\œ˜^JMŠ_\™]\›ˆ\Ë˜Y™™\[™]ÈZ[\œ˜^JMŠK\Ë˜Y™™\“[™ÝL\Ë™XÜž\›ØÚÏ]\Ë—ÙXÜž\›ØÚÌ‹\Ë™XÜž\›ØÚÊK
_Y[˜Üž\
K
^Û]YK›[™Ý]\Ë˜Y™™\‹O]\Ë˜Y™™\”ÜÚ][Û‹OV×NÝ[™]ÈZ[\œ˜^JMŠNÙ›ÜŠ]ÏLÛÏŽÊÊÛÊ^ÚYŠ–ÚWOYVÛ×K
ÊÚKOMŠXÛÛ[YNÙ›ÜŠ]OLÙOMŽÊÊÙJ\–ÙWW]ÙWNÛ]]\Ë—Ù[˜Üž\
‹\Ë—ÚÙ^JNÝ[‹Kœ\Ú
ŠK[™]ÈZ[\œ˜^JMŠKOLZYŠ\Ë˜Y™™\\‹\Ë˜Y™™\“[™ÝZK\Ëš]]K›[™ÝOOL
\™]\›ˆ™]ÈZ[\œ˜^NÛ]ÏLMŠ˜K›[™ÝÏ[™]ÈZ[\œ˜^JÊNÙ›ÜŠ]OLLXK›[™ÝÙOŽÊÊÙK
ÏLMŠ\ËœÙ]
VÙWK
NÜ™]\›ˆß_KØXÛ\ÜÈ^[™ÈØž×Ü˜ÛÛ[™]ÈZ[\œ˜^JÌMKK‹M‹Ì‹LŽËMLŒM‹MÌKÍËMMËMNNKNNMLKLËL‹ŒL‹MÎKLKLŒÎKNMËMKMËLMŒŽŒLKNKMËNMMNKÍËÍMLKL‹ŒLÌKŽKNLM‹ŒÌ‹ŒËMKK‹M‹Ì‹LŽËMLŒM‹MÌKÍËMMËMNNKNNMLKLËL‹ŒL‹MÎKLKLŒÎKNMËMKMËLMŒŽŒLKNKMËNMMNKÍËÍMLKL‹ŒLÌKŽKNLM‹ŒÌ‹ŒËMKK‹M‹Ì‹LŽËMLŒM‹MÌKÍËMMËMNNKNNMLKLËL‹ŒL‹MÎKLKLŒÎKNMËMKMËLMŒŽŒLKNKMËNMMNKÍËÍMLKL‹ŒLÌKŽKNLM‹ŒÌ‹ŒËMKK‹M‹Ì‹LŽËMLŒM‹MÌKÍËMMËMNNKNNMLKLËL‹ŒL‹MÎKLKLŒÎKNMËMKMËLMŒŽŒLKNKMËNMMNKÍËÍMLKL‹ŒLÌKŽKNLM‹ŒÌ‹ŒËMKK‹M‹Ì‹LŽËMLŒM‹MÌKÍËMMËMNNKNNMLKLËL‹ŒL‹MÎKLKLŒÎKNMËMKMËLMŒŽŒLKNKMËNMMNKÍËÍMLKL‹ŒLÌKŽKNLM‹ŒÌ‹ŒËMWJNØÛÛœÝXÝÜŠJ^ÜÝ\\Š
K\Ë—ØÞXÛ\ÓÙ”™\]][ÛLL\Ë—ÚÙ^TÚ^™OLMŒ\Ë—ÚÙ^O]\Ë—Ù^[™Ù^JJ_WÙ^[™Ù^JJ^Û]]\Ë—ÜË]\Ë—Ü˜ÛÛ‹[™]ÈZ[\œ˜^JMÍŠNÜ‹œÙ]
JNÙ›ÜŠ]OLM‹OLNÙOMÍŽÊÊÚJ^Û]O\–ÙKL×KÏ\–ÙKL—KÏ\–ÙKLWKÏ\–ÙKMNØO]ØWKÏ]Û×KÏ]Ü×KÏ]Ø×KW[–ÚWNÙ›ÜŠ]LÝÊÊÝ
\–ÙWOXW\–ÙKLM—KJÊË–ÙWO[×\–ÙKLM—KJÊË–ÙWO\×\–ÙKLM—KJÊË–ÙWOX×\–ÙKLM—KJÊß\™]\›ˆŸ_KØXÛ\ÜÈ^[™ÈØžØÛÛœÝXÝÜŠJ^ÜÝ\\Š
K\Ë—ØÞXÛ\ÓÙ”™\]][ÛLM\Ë—ÚÙ^TÚ^™OLŒ\Ë—ÚÙ^O]\Ë—Ù^[™Ù^JJ_WÙ^[™Ù^JJ^Û]]\Ë—ÜË[™]ÈZ[\œ˜^J
NÛ‹œÙ]
JNÛ]LKKKËÎÙ›ÜŠ]OLÌ‹ÏLNÙOÊÊØÊ^ÙILÌOLMÊO]ÚWKO]ØWKÏ]Û×KÏ]Ü×JN™ILÌOL	‰ŠO[–ÙKL×KO[–ÙKL—KÏ[–ÙKLWKÏ[–ÙKMKO]ÚWKO]ØWKÏ]Û×KÏ]Ü×KW\‹
LJOLM‰‰ŠJ—ŒÊIŒMJJNÙ›ÜŠ]LÝÊÊÝ
[–ÙWOZW[–ÙKLÌ—KJÊË–ÙWOXW[–ÙKLÌ—KJÊË–ÙWO[×[–ÙKLÌ—KJÊË–ÙWO\×[–ÙKLÌ—KJÊß\™]\›ˆŸ_KXXÛ\ÜÞ×Ú\Ú
KŠ^ÚŠXœÝ˜XÝY]ÙÚ\ÚØ[YŠ_XÚXÚÓÝÛ™\”\ÜÝÛÜ™
K‹Š^Û]O[™]ÈZ[\œ˜^JK›[™Ý
ÍMŠNÜ™]\›ˆKœÙ]
K
KKœÙ]
K›[™Ý
KKœÙ]
‹K›[™Ý
Ý›[™Ý
KYJ\Ë—Ú\Ú
KKŠKŠ_XÚXÚÕ\Ù\”\ÜÝÛÜ™
KŠ^Û][™]ÈZ[\œ˜^JK›[™Ý
Î
NÜ™]\›ˆ‹œÙ]
K
K‹œÙ]
K›[™Ý
KYJ\Ë—Ú\Ú
K‹×JKŠ_YÙ]ÝÛ™\’Ù^JK‹Š^Û]O[™]ÈZ[\œ˜^JK›[™Ý
ÍMŠNÜ™]\›ˆKœÙ]
K
KKœÙ]
K›[™Ý
KKœÙ]
‹K›[™Ý
Ý›[™Ý
K™]ÈØŠ\Ë—Ú\Ú
KKŠJK™XÜž\›ØÚÊ‹LK™]ÈZ[\œ˜^JMŠJ_YÙ]\Ù\’Ù^JKŠ^Û][™]ÈZ[\œ˜^JK›[™Ý
Î
NÜ™]\›ˆ‹œÙ]
K
K‹œÙ]
K›[™Ý
K™]ÈØŠ\Ë—Ú\Ú
K‹×JJK™XÜž\›ØÚÊ‹LK™]ÈZ[\œ˜^JMŠJ__K˜XÛ\ÜÈ^[™ÈXž×Ú\Ú
KŠ^Ü™]\›ˆ˜Š›[™Ý
__KXXÛ\ÜÈ^[™ÈXž×Ú\Ú
KŠ^Û]P˜Š›[™Ý
KœÝX˜\œ˜^JÌŠKOVÌKOLÙ›ÜŠØOK˜]
LJO˜KLÌŽÊ^Û]YK›[™Ý
Ü‹›[™Ý
Û‹›[™ÝÏ[™]ÈZ[\œ˜^J
KÏLÛËœÙ]
KÊKÊÏYK›[™ÝËœÙ]
‹ÊKÊÏ\‹›[™ÝËœÙ]
‹ÊNÛ]Ï[™]ÈZ[\œ˜^J

NÙ›ÜŠ]OLLÙOÙJÊËŠÏ]
XËœÙ]
ËŠNÚO[™]ÈØŠ‹œÝX˜\œ˜^JMŠJK™[˜Üž\
Ë‹œÝX˜\œ˜^JM‹ÌŠJNÛ]SX]œÝ[T™XÚ\ÙJKœÛXÙJMŠJILÎÛOOLÜP˜ŠKK›[™Ý
N›OOLOÜZ˜ŠKK›[™Ý
N›OOL‰‰ŠPXŠKK›[™Ý
JKJÊß\™]\›ˆ‹œÝX˜\œ˜^JÌŠ__KXÛ\ÜÞØÛÛœÝXÝÜŠK
^Ý\Ë”Ýš[™ÐÚ\\ÛÛœÝXÝÜYK\Ë”Ý™X[PÚ\\ÛÛœÝXÝÜ]XÜ™X]TÝ™X[JK
^Û][™]È\Ë”Ý™X[PÚ\\ÛÛœÝXÝÜŽÜ™]\›ˆ™]È˜ŠK[˜Ý[ÛŠK
^Ü™]\›ˆ‹™XÜž\›ØÚÊK
_J_YXÜž\Ýš[™ÊJ^Û][™]È\Ë”Ýš[™ÐÚ\\ÛÛœÝXÝÜ‹\ÙJJNÜ™]\›ˆ]™XÜž\›ØÚÊ‹L
KÙJŠ_Y[˜Üž\Ýš[™ÊJ^Û][™]È\Ë”Ýš[™ÐÚ\\ÛÛœÝXÝÜŽÚYŠ[œÝ[˜Ù[ÙˆØŠ^Û]LM‹YK›[™Ý	LMŽÙJÏTÝš[™Ë™œ›ÛPÚ\ÛÙJŠKœ™\X]
ŠNÛ][™]ÈZ[\œ˜^JMŠNØÜž\Ë™Ù]˜[™ÛU˜[Y\ÊŠNÛ]O\ÙJJNÚO]™[˜Üž\
KŠNÛ]O[™]ÈZ[\œ˜^JMŠÚK›[™Ý
NÜ™]\›ˆKœÙ]
ŠKKœÙ]
KMŠKÙJJ_[]\ÙJJNÜ™]\›ˆ]™[˜Üž\
ŠKÙJŠ__K˜XÛ\ÜÈ^ÜÝ]XÈÙ]ÙY˜][\ÜÝÛÜ™ž]\Ê
^Ü™]\›ˆŠ\ËÙY˜][\ÜÝÛÜ™ž]\Ø™]ÈZ[\œ˜^JÍNLKÎMÎLMËLÎKLÎ‹MKLK‹‹N‹ŒLŒ‹LŽËL‹MŽKMLËLKLŒ—JJ_HÙJK‹‹KKËËËK
^ÚYŠ
^Û]OSX]›Z[ŠLË›[™Ý
NÝ]œÝX˜\œ˜^JJ_Y[ÙHV×NÛ]YOOOMÛ™]ÈXŽ›™]È˜ŽÜ™]\›ˆ‹˜ÚXÚÕ\Ù\”\ÜÝÛÜ™
ËÊOÙ‹™Ù]\Ù\’Ù^JËJN›[™Ý	‰™‹˜ÚXÚÓÝÛ™\”\ÜÝÛÜ™
‹KŠOÙ‹™Ù]ÝÛ™\’Ù^JKK
N›[HÝ
‹‹KKËËÊ^Û]M
Ü‹›[™Ý
Ý›[™ÝO[™]ÈZ[\œ˜^J
KL‹ÚYŠŠY›ÜŠSX]›Z[ŠÌ‹‹›[™Ý
NÙÊÊÙ
]VÙO[–ÙNÙ›ÜŠLÙÌŽÊ]VÙ
Ê×OYK—ÙY˜][\ÜÝÛÜ™ž]\ÖÙŠÊ×NÝKœÙ]
‹
K
Ï\‹›[™ÝVÙ
Ê×OXIŒMKVÙ
Ê×OXOŽ	ŒMKVÙ
Ê×OXOŒM‰ŒMKVÙ
Ê×OXOŒ	ŒMKKœÙ]

K
Ï]›[™ÝÏM	‰ˆXÉ‰ŠK™š[
MK
Í
K
ÏM
NÛ]OWØŠK
K\ÏŒÎÚYŠÏLÊY›ÜŠLÙLÊÊÙŠ[OWØŠK
NÛ]Ï[KœÝX˜\œ˜^J
KËŽÚYŠÏLÊ^ÙLKœÙ]
K—ÙY˜][\ÜÝÛÜ™ž]\Ë
K
ÏLÌ‹KœÙ]

K
Ï]›[™ÝÏ[™]ÈŠÊKWË™[˜Üž\›ØÚÊØŠK
JKYË›[™ÝÛ][™]ÈZ[\œ˜^J
NÙ›ÜŠLNÙLNNÊÊÙŠ^Ù›ÜŠ]OLÙOÊÊÙJ[–ÙWOYÖÙWW™Ž×Ï[™]ÈŠŠKWË™[˜Üž\›ØÚÊŠ__Y[ÙHÏ[™]ÈŠÊKWË™[˜Üž\›ØÚÊK—ÙY˜][\ÜÝÛÜ™ž]\ÊNÜ™]\›ˆ‹™]™\žJ
K
OOšVÝOOOYJOÙÎ›[HÛŠ‹‹J^Û]O[™]ÈZ[\œ˜^JÌŠKÏLÏSX]›Z[ŠÌ‹›[™Ý
NÙ›ÜŠÛÏÎÊÊÛÊXVÛ×O]Û×NÛ]ÏLÙ›ÜŠÛÏÌŽÊXVÛÊÊ×OYK—ÙY˜][\ÜÝÛÜ™ž]\ÖØÊÊ×NÛ]WØŠKÊKOZOŒÎÚYŠLÊY›ÜŠÏLØÏLÊÊØÊ[WØŠ›[™Ý
NÛ]ŽÚYŠLÊ^Ù[ŽÛ]O[™]ÈZ[\œ˜^JJNÙ›ÜŠÏLNNØÏLØËKJ^Ù›ÜŠ]LÝNÊÊÝ
YVÝO[ÝW˜ÎÙ[™]ÈŠJKY™[˜Üž\›ØÚÊŠ__Y[ÙH[™]ÈŠœÝX˜\œ˜^JJJKY™[˜Üž\›ØÚÊŠNÜ™]\›ˆŸHÜŠK‹HLJ^Û]O[‹›[™ÝO[™]ÈZ[\œ˜^JJÎJNØKœÙ]
ŠNÛ]ÏZNÜ™]\›ˆVÛÊÊ×OYIŒMKVÛÊÊ×OYOŽ	ŒMKVÛÊÊ×OYOŒM‰ŒMKVÛÊÊ×O]	ŒMKVÛÊÊ×O]Ž	ŒMK‰‰ŠVÛÊÊ×OLLMKVÛÊÊ×OMKVÛÊÊ×OLLVÛÊÊ×ON
KØŠKÊKœÝX˜\œ˜^JX]›Z[ŠJÍKMŠJ_HÚJK‹‹J^ÚYŠJ[œÝ[˜Ù[Ùˆ
J]›ÝÈ™]ÈJ[˜[YÜž\š[\ˆ˜[YK˜
NÛ]O]\ËÏYK™Ù]
›˜[YJOË™Ù]
Ñ“X
NÚYŠ[ßË›˜[YOOOX›Û™X
\™]\›ˆ[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈXŸNÚYŠË›˜[YOOOXŒ˜
\™]\›ˆ[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈŠKˆÜŠ‹‹KLJJ_NÚYŠË›˜[YOOOXQTÕŒ˜
\™]\›ˆ[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈØŠKˆÜŠ‹‹KL
J_NÚYŠË›˜[YOOOXQTÕŒØ
\™]\›ˆ[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈØŠJ_NÝ›ÝÈ™]ÈJ[šÛ›ÝÛˆÜž\ÈY]Ù
_XÛÛœÝXÝÜŠKŠ^Û]YK™Ù]
š[\˜
NÚYŠT™J‹Ý[™\™
J]›ÝÈ™]ÈJ[šÛ›ÝÛˆ[˜Üž\[ÛˆY]Ù
NÝ\Ë™š[\“˜[YO\‹›˜[YK\Ë™XÝYNÛ]OYK™Ù]
˜
NÚYŠS[X™\‹š\Ò[YÙ\ŠJ_HOOLI‰šHOOL‰‰šHOOM	‰šHOOMJ]›ÝÈ™]ÈJ[œÝ\ÜY[˜Üž\[Ûˆ[ÛÜš]X
NÝ\Ë˜[ÛÜš]OZNÛ]OYK™Ù]
[™Ý
NÚYŠXJZYŠOLÊXOMÙ[Ù^Û]YK™Ù]
Ñ˜
KYK™Ù]
ÝQ˜
NÝ[œÝ[˜Ù[Ùˆ‰‰›ˆ[œÝ[˜Ù[Ùˆ	‰ŠœÝ\™\ÜÑ[˜Üž\[ÛHLO]™Ù]
‹›˜[YJOË™Ù]
[™Ý
_LŽO	‰ŠOLÊJ_ZYŠS[X™\‹š\Ò[YÙ\ŠJ_OINOL
]›ÝÈ™]ÈJ[˜[YÙ^H[™Ý
NÛ]Ï\ÙJK™Ù]
Ø
JKÏ\ÙJK™Ù]
X
JKÏ[ËœÝX˜\œ˜^JÌŠK\ËœÝX˜\œ˜^JÌŠKOYK™Ù]

KYK™Ù]
˜
KJOOOMOOOMJI‰™K™Ù]
[˜Üž\Y]Y]X
HOOHLNÝ\Ë™[˜Üž\Y]Y]OYŽÛ]\ÙJ
KNÚYŠŠ^ÚYŠOOMŠ]ž^Û]™JŠ_XØ]ÚÐJÚ\\•˜[œÙ›Ü›Q˜XÝÜžNˆ[˜X›HÈÛÛ™\UŽ[˜ÛÙY\ÜÝÛÜ™˜
_[O\ÙJŠ_[]ÚYŠHOOMJZ]\ËˆÝ
KËKKŠNÙ[Ù^Û][ËœÝX˜\œ˜^JÌ‹
K[ËœÝX˜\œ˜^J
K\ËœÝX˜\œ˜^J
KO\ËœÝX˜\œ˜^JÌ‹
KO\ËœÝX˜\œ˜^J
KO\ÙJK™Ù]
ÑX
JK\ÙJK™Ù]
QX
JK\ÙJK™Ù]
\›\Ø
JNÚ]\ËˆÙJKË‹‹KKK‹
_ZYŠZ
^ÚYŠ[Š]›ÝÈ™]ÈJ›È\ÜÝÛÜ™Ú]™[˜“‘QQÔTÔÕÓÔ‘
NÛ]O]\ËˆÛŠKËJNÚ]\ËˆÝ
KËKKŠ_ZYŠZ
]›ÝÈ™]ÈJ[˜ÛÜœ™XÝ\ÜÝÛÜ™’SÓÔ”‘PÕÔTÔÕÓÔ‘
NÚYŠOOOM	‰š›[™ÝMÊ\Ë™[˜Üž\[Û’Ù^O[™]ÈZ[\œ˜^JMŠK\Ë™[˜Üž\[Û’Ù^KœÙ]

JN\Ë™[˜Üž\[Û’Ù^OZOM
^Û]YK™Ù]
Ñ˜
NÝ[œÝ[˜Ù[Ùˆ‰‰ŠœÝ\™\ÜÑ[˜Üž\[ÛHL
K\Ë˜Ù]\ËœÝYYK™Ù]
ÝQ˜
_™Ù]
Y[]X
K\ËœÝ™YK™Ù]
Ý‘˜
_™Ù]
Y[]X
K\Ë™Y™YK™Ù]
Q‘˜
_\ËœÝYŸ_XÜ™X]PÚ\\•˜[œÙ›Ü›JK
^ÚYŠ\Ë˜[ÛÜš]OOOM\Ë˜[ÛÜš]OOOMJ\™]\›ˆ™]ÈŠ\ËˆÚJ\Ë˜Ù‹\ËœÝ™‹K\Ë™[˜Üž\[Û’Ù^JK\ËˆÚJ\Ë˜Ù‹\ËœÝY‹K\Ë™[˜Üž\[Û’Ù^JJNÛ]]\ËˆÜŠK\Ë™[˜Üž\[Û’Ù^KLJKY[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈŠŠ_NÜ™]\›ˆ™]ÈŠ‹Š__KXXÛ\ÜÞÈÙO[[ØÛÛœÝXÝÜŠK
^Ý\ËœÝ™X[OYK\Ëœ“X[˜YÙ\]\Ë™[šY\ÏV×K\Ë—Þ™Y”Ý\Ï[™]ÈÙ]\Ë—ØØXÚSX\[™]ÈX\\Ë—Ü[™[™Ô™YœÏ[™]ÈYK\Ë—Û™]Ô\œÚ\Ý[™Y“[O[[\Ë—Û™]Õ[\Ü˜\žT™Y“[O[[\Ë—Ü\œÚ\Ý[™YœÐØXÚO[[YÙ]™]Ô\œÚ\Ý[™YŠJ^Ý\Ë—Û™]Ô\œÚ\Ý[™Y“[OOO[[	‰Š\Ë—Û™]Ô\œÚ\Ý[™Y“[O]\Ë™[šY\Ë›[™ÝJNÛ]]\Ë—Û™]Ô\œÚ\Ý[™Y“[JÊÎÜ™]\›ˆ\Ë—ØØXÚSX\œÙ]
JK‹™Ù]

_YÙ]™]Õ[\Ü˜\žT™YŠ
^ÚYŠ\Ë—Û™]Õ[\Ü˜\žT™Y“[OOO[[	‰Š\Ë—Û™]Õ[\Ü˜\žT™Y“[O]\Ë™[šY\Ë›[™ÝK\Ë—Û™]Ô\œÚ\Ý[™Y“[JJ^Ý\Ë—Ü\œÚ\Ý[™YœÐØXÚO[™]ÈX\Ù›ÜŠ]O]\Ë—Û™]Õ[\Ü˜\žT™Y“[NÙO\Ë—Û™]Ô\œÚ\Ý[™Y“[NÙJÊÊ]\Ë—Ü\œÚ\Ý[™YœÐØXÚKœÙ]
K\Ë—ØØXÚSX\™Ù]
JJK\Ë—ØØXÚSX\™[]JJ_\™]\›ˆ‹™Ù]
\Ë—Û™]Õ[\Ü˜\žT™Y“[JÊË
_\™\Ù]™]Õ[\Ü˜\žT™YŠ
^ÚYŠ\Ë—Û™]Õ[\Ü˜\žT™Y“[O[[\Ë—Ü\œÚ\Ý[™YœÐØXÚJY›ÜŠ]ÙK[Ùˆ\Ë—Ü\œÚ\Ý[™YœÐØXÚJ]\Ë—ØØXÚSX\œÙ]
K
NÝ\Ë—Ü\œÚ\Ý[™YœÐØXÚO[[\Ù]Ý\™YŠJ^Ý\ËœÝ\™Y”]Y]YOVÙW_\\œÙJOHLJ^Û]ÙOÊJ[™^[™È[ˆØš™XÝØ
K]\Ëš[™^Øš™XÝÊ
JN]\Ëœ™XY™YŠ
K˜\ÜÚYÛ–™YŠ\ÊK\Ë˜Z[\]Û]ŽÝž^Û]™Ù]
[˜Üž\
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ™Y‹œ\œÙHH[˜[Y‘[˜Üž\ˆ™Y™\™[˜ÙNˆ‰Ù_H‹˜
_ZYŠˆ[œÝ[˜Ù[ÙˆŠ^Û]O]™Ù]
Q
KYOË›[™ÝÙVÌN˜Û‹œÝ\™\ÜÑ[˜Üž\[ÛHL\Ë™[˜Üž\[™]È˜Š‹‹\Ëœ“X[˜YÙ\‹œ\ÜÝÛÜ™
_[]ŽÝž^Ü]™Ù]
›ÛÝ
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ™Y‹œ\œÙHH[˜[Y”›ÛÝˆ™Y™\™[˜ÙNˆ‰Ù_H‹˜
_ZYŠˆ[œÝ[˜Ù[ÙˆŠ]ž^ÚYŠ‹™Ù]
YÙ\Ø
Z[œÝ[˜Ù[ÙˆŠ^Ý\Ëœ›ÛÝ\ŽÜ™]\›Ÿ_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJ™Y‹œ\œÙHH[˜[Y”YÙ\Èˆ™Y™\™[˜ÙNˆ‰Ù_H‹˜
_]›ÝÈOÛ™]È™J[˜[Y›ÛÝ™Y™\™[˜ÙK˜
N›™]ÈY_\›ØÙ\ÜÖ™Y•X›JJ^ÚYŠX›TÝ]X[ˆ\ß
\ËX›TÝ]O^Ù[žS[NŒÝ™X[TÜÎ™K›^\‹œÝ™X[KœÜË\œÙ\YŒN™K˜YŒK\œÙ\YŒŽ™K˜YŒŸJK^™J\Ëœ™XY™Y•X›JJK˜Z[\˜
J]›ÝÈ™]ÈJ[˜[Y™YˆX›NˆÛÝ[›Ýš[™˜Z[\ˆXÝ[Û˜\žX
NÛ]YK™Ù]ØšŠ
NÚYŠJ[œÝ[˜Ù[ÙˆŠI‰™XÝ	‰Š]™XÝ
KJ[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJ[˜[Y™YˆX›NˆÛÝ[›Ý\œÙH˜Z[\ˆXÝ[Û˜\žX
NÜ™]\›ˆ[]H\ËX›TÝ]K\™XY™Y•X›JJ^Û]YK›^\‹œÝ™X[K]\ËX›TÝ]NÝœÜÏ[‹œÝ™X[TÜËK˜YŒO[‹œ\œÙ\YŒKK˜YŒ[‹œ\œÙ\YŒŽÛ]ŽÙ›ÜŠÎÊ^ÚYŠJš\œÝ[žS[X[ˆŠ_J[žPÛÝ[[ˆŠJ^ÚYŠ™JYK™Ù]ØšŠ
K˜Z[\˜
JXœ™XZÎÛ‹™š\œÝ[žS[O\‹‹™[žPÛÝ[YK™Ù]ØšŠ
_[]O[‹™š\œÝ[žS[KO[‹™[žPÛÝ[ÚYŠS[X™\‹š\Ò[YÙ\ŠJ_S[X™\‹š\Ò[YÙ\ŠJJ]›ÝÈ™]ÈJ[˜[Y™YˆX›NˆÜ›Û™È\\È[ˆÝXœÙXÝ[ÛˆXY\˜
NÙ›ÜŠ][‹™[žS[NÜNÜŠÊÊ^Û‹œÝ™X[TÜÏ]œÜË‹™[žS[O\‹‹œ\œÙ\YŒOYK˜YŒK‹œ\œÙ\YŒYK˜YŒŽÛ]Ï^ßNÛË›Ù™œÙ]YK™Ù]ØšŠ
KË™Ù[YK™Ù]ØšŠ
NÛ]ÏYK™Ù]ØšŠ
NÚYŠÈ[œÝ[˜Ù[ÙˆJ\ÝÚ]Ú
Ë˜ÛY
^ØØ\ÙX˜›Ë™œ™YOHLØœ™XZÎØØ\ÙX˜›Ë[˜ÛÛ\™\ÜÙYHLØœ™XZßZYŠS[X™\‹š\Ò[YÙ\ŠË›Ù™œÙ]
_S[X™\‹š\Ò[YÙ\ŠË™Ù[Š_JË™œ™Y_Ë[˜ÛÛ\™\ÜÙY
J]›ÝÈ™]ÈJ[˜[Y[žH[ˆ™YˆÝXœÙXÝ[ÛŽˆ	Ú_K	Ø_X
NÜOOL	‰›Ë™œ™YI‰šOOOLI‰ŠOL
K\Ë™[šY\ÖÜŠÚW_
\Ë™[šY\ÖÜŠÚWO[Ê_[‹™[žS[OL‹œÝ™X[TÜÏ]œÜË‹œ\œÙ\YŒOYK˜YŒK‹œ\œÙ\YŒYK˜YŒ‹[]H‹™š\œÝ[žS[K[]H‹™[žPÛÝ[ZYŠ\Ë™[šY\ÖÌI‰ˆ]\Ë™[šY\ÖÌK™œ™YJ]›ÝÈ™]ÈJ[˜[Y™YˆX›Nˆ[™^XÝYš\œÝØš™XÝ
NÜ™]\›ˆŸ\›ØÙ\ÜÖ™Y”Ý™X[JJ^ÚYŠJÝ™X[TÝ]X[ˆ\ÊJ^Û]ÙXÝÜÎ›ŸOYK]™Ù]
Ø
KO]™Ù]
[™^
_Ì™Ù]
Ú^™X
WNÝ\ËœÝ™X[TÝ]O^Ù[žT˜[™Ù\ÎšKž]UÚYÎœ‹[žS[NŒÝ™X[TÜÎ›Ÿ_\™]\›ˆ\Ëœ™XY™Y”Ý™X[JJK[]H\ËœÝ™X[TÝ]KK™XÝ\™XY™Y”Ý™X[JJ^Û]]\ËœÝ™X[TÝ]NÙKœÜÏ]œÝ™X[TÜÎÛ]Û‹‹WO]˜ž]UÚYËO]™[žT˜[™Ù\ÎÙ›ÜŠØK›[™ÝŒÊ^Û]ÛË×OXNÚYŠS[X™\‹š\Ò[YÙ\ŠÊ_S[X™\‹š\Ò[YÙ\ŠÊJ]›ÝÈ™]ÈJ[˜[Y™Yˆ˜[™ÙHšY[Îˆ	ÛßK	ÜßX
NÚYŠS[X™\‹š\Ò[YÙ\ŠŠ_S[X™\‹š\Ò[YÙ\ŠŠ_S[X™\‹š\Ò[YÙ\ŠJJ]›ÝÈ™]ÈJ[˜[Y™Yˆ[žHšY[È[™Ýˆ	ÛßK	ÜßX
NÙ›ÜŠ]O]™[žS[NØOÎÊÊØJ^Ý™[žS[OXKœÝ™X[TÜÏYKœÜÎÛ]ÏLÏLLÙ›ÜŠ]LÝŽÊÊÝ
^Û]YK™Ù]ž]J
NÚYŠOOKLJ]›ÝÈ™]ÈJ[˜[Y™Yˆž]UÚYÈ	Ý\W	Ë˜
NÜÏ\Ï[OOL	‰ŠÏLJNÙ›ÜŠ]LÝŽÊÊÝ
^Û]YK™Ù]ž]J
NÚYŠOOKLJ]›ÝÈ™]ÈJ[˜[Y™Yˆž]UÚYÈ	ÛÙ™œÙ]	Ë˜
NØÏXÏY›ÜŠ]LÝNÊÊÝ
^Û]YK™Ù]ž]J
NÚYŠOOKLJ]›ÝÈ™]ÈJ[˜[Y™Yˆž]UÚYÈ	ÙÙ[™\˜][Û—	Ë˜
NÛ[[]O^ßNÜÝÚ]Ú
K›Ù™œÙ]XËK™Ù[[Ê^ØØ\ÙHK™œ™YOHLØœ™XZÎØØ\ÙHNK[˜ÛÛ\™\ÜÙYHLØœ™XZÎØØ\ÙHŽ˜œ™XZÎÙY˜][›ÝÈ™]ÈJ[˜[Y™Yˆ[žH\Nˆ	ÜßX
_]\Ë™[šY\ÖÛÊØW_
\Ë™[šY\ÖÛÊØWO]J_]™[žS[OLœÝ™X[TÜÏYKœÜËKœÜXÙJŠ__Z[™^Øš™XÝÊ
^Ù[˜Ý[ÛˆJK
^Û]XYVÝNÙ›ÜŠÜˆOOLL	‰œˆOOLLÉ‰œˆOOMŒ	‰ˆJ
ÊÝYK›[™Ý
NÊ[ŠÏTÝš[™Ë™œ›ÛPÚ\ÛÙJŠKYVÝNÜ™]\›ˆŸY[˜Ý[Ûˆ
KŠ^Û][‹›[™ÝOYK›[™ÝOLÙ›ÜŠÝNÊ^Û]OLÙ›ÜŠÚO‰‰™VÝ
ÚWOOO[–ÚWNÊJÊÚNÚYŠO\ŠXœ™XZÎÝ
ÊËJÊß\™]\›ˆ_[]K×Š[™ØšŸ
×Ê×
×ÊÛØšŸ™YŸ˜Z[\—Ê
W‹ÙËK×ŠÝ\™YŸ
×Ê×
×ÊÛØšŠW‹ÙËOK×Š
ÊWÊÊ
ÊWÊÛØš—‹ËO[™]ÈZ[\œ˜^JÌLM‹LMMËLKLLKLMJKÏ[™]ÈZ[\œ˜^JÌLMKLM‹MËLMLM‹LŒLMLKL—JKÏ[™]ÈZ[\œ˜^JÍË‹LKL—JNÝ\Ë™[šY\Ë›[™ÝL\Ë—ØØXÚSX\˜ÛX\Š
NÛ]Ï]\ËœÝ™X[NØËœÜÏLÛ]XË™Ù]ž]\Ê
KO[ÙJ
K[›[™ÝXËœÝ\V×KOV×NÙ›ÜŠÙÊ^Û][Ù—NÚYŠOON_OOLLOOLLßOOLÌŠ^ÊÊÙŽØÛÛ[Y_ZYŠOOLÍÊ^ÙÞÚYŠ
ÊÙ‹Y
Xœ™XZÎÚ[Ù—_]Ú[JOOLL	‰šOOLLÊNØÛÛ[Y_[]ÏYJŠKÎÚYŠËœÝ\ÕÚ]
™Y˜
I‰ŠË›[™ÝOOM×ËË\Ý
ÖÍJJJYŠÏ]
‹JKœ\Ú
ŠKŠÏ]
‹ÊNÙ[ÙHYŠÏZK™^XÊÊJ^Û]OWÖÌW_WÖÌ—_OYŠÙË›[™ÝKÏHLNÚYŠ]\Ë™[šY\ÖÙWJ[ÏHLÙ[ÙHYŠ\Ë™[šY\ÖÙWK™Ù[OO\Š]ž^Û™]ÈÚJÛ^\Ž›™]ÈšJË›XZÙTÝX”Ý™X[JJJ_JK™Ù]ØšŠ
KÏHLXØ]Ú
J^ÙH[œÝ[˜Ù[ÙˆOÐJ[™^Øš™XÝÈKHÚXÚÚ[™ÈØš™XÝ
	ÙßJNˆ‰Ù_H‹˜
N›ÏHL[É‰Š\Ë™[šY\ÖÙWO^ÛÙ™œÙ]™‹XËœÝ\Ù[Žœ‹[˜ÛÛ\™\ÜÙYˆLJK‹›\Ý[™^ZNÛ][‹™^XÊJNÜÊO[‹›\Ý[™^
ÌKY‹ÌWHOOX[™Øš˜	‰ŠJ[™^Øš™XÝÎˆ›Ý[™‰ÜÌW_Hˆ[œÚYHÙˆ[›Ý\ˆ›Øšˆ‹Ø]\ÙYžHZ\ÜÚ[™È™[™ØšˆˆKHžZ[™ÈÈ™XÛÝ™\‹˜
KKO\ÌWK›[™Ý
ÌJJN˜OYYŽÛ][œÝX˜\œ˜^J‹ŠØJK]
ÊNÝI‰šÝŠÍWO	‰ŠKœ\Ú
‹XËœÝ\
K\Ë—Þ™Y”Ý\Ë˜Y
‹XËœÝ\
JKŠÏX_Y[ÙHYŠËœÝ\ÕÚ]
˜Z[\˜
I‰ŠË›[™ÝOOMß×ËË\Ý
ÖÍ×JJJ^Üœ\Ú
ŠNÛ]OYŠÙË›[™ÝÜ‹›\Ý[™^YNÛ]\‹™^XÊJNÛÊ\‹›\Ý[™^
ÌKY‹–ÌWHOOXÝ\™Y˜	‰ŠJ[™^Øš™XÝÎˆ›Ý[™‰Û–ÌW_HˆY\ˆ˜Z[\ˆ‹Ø]\ÙYžHZ\ÜÚ[™ÈœÝ\™YˆˆKHžZ[™ÈÈ™XÛÝ™\‹˜
KO[–ÌWK›[™Ý
ÌJJNYY‹ŠÏ]Y[ÙHŠÏYË›[™Ý
Ì_Y›ÜŠ]HÙˆJ]\ËœÝ\™Y”]Y]YKœ\Ú
JK\Ëœ™XY™YŠL
NÛ]V×KÏHLNÙ›ÜŠ]HÙˆ
^ØËœÜÏYNÛ][™]ÈÚJÛ^\Ž›™]ÈšJÊK™YŽ\Ë[ÝÔÝ™X[\ÎˆL™XÛÝ™\žS[ÙNˆLJNÚYŠ^™J™Ù]ØšŠ
K˜Z[\˜
JXÛÛ[YNÛ]]™Ù]ØšŠ
NÛˆ[œÝ[˜Ù[Ùˆ‰‰Šœ\Ú
ŠK‹š\Ê[˜Üž\
I‰ŠÏHL
J_[]ËŽÙ›ÜŠ]HÙ–Ë‹‹šÙ[‘˜[˜XÚØ‹‹šJ^ÚYŠOOOXÙ[‘˜[˜XÚØ
^ÚYŠ]ŠXœ™XZÎÝ\Ë—ÙÙ[™\˜][Û‘˜[˜XÚÏHLØÛÛ[Y_[]HLNÝž^Û]YK™Ù]
›ÛÝ
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÛ][‹™Ù]
YÙ\Ø
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÛ]O\‹™Ù]
ÛÝ[
NÓ[X™\‹š\Ò[YÙ\ŠJI‰ŠHL
_XØ]Ú
J^ÝYNØÛÛ[Y_ZYŠ	‰ŠYßKš\Ê[˜Üž\
JI‰™Kš\ÊQ
J\™]\›ˆN×ÏY_ZYŠÊ\™]\›ˆÎÚYŠ\ËÜXÝ
\™]\›ˆ\ËÜXÝÚYŠZ›[™Ý
Y›ÜŠ]H[ˆ\Ë™[šY\Ê^ÚYŠSØš™XÝš\ÓÝÛŠ\Ë™[šY\ËJJXÛÛ[YNÛ]]\Ë™[šY\ÖÙWK^‹™Ù]
\œÙR[
JK™Ù[ŠKŽÝž^Ü]\Ë™™]Ú
Š_XØ]ÚØÛÛ[Y_ZYŠˆ[œÝ[˜Ù[Ùˆ‰‰Š\‹™XÝ
Kˆ[œÝ[˜Ù[Ùˆ‰‰œ‹š\Ê›ÛÝ
J\™]\›ˆŸ]›ÝÈ™]È™J[˜[YˆÝXÝ\™K˜
_\™XY™YŠOHLJ^Û]]\ËœÝ™X[K[™]ÈÙ]Ù›ÜŠÝ\ËœÝ\™Y”]Y]YK›[™ÝÊ^Ýž^Û]O]\ËœÝ\™Y”]Y]YVÌNÚYŠ‹š\ÊJJ^ÐJ™XY™YˆHÚÚ\[™È™YˆX›HÚ[˜ÙH]Ø\È[™XYH\œÙY˜
K\ËœÝ\™Y”]Y]YKœÚY

NØÛÛ[Y_[‹˜Y
JKœÜÏYJÝœÝ\Û][™]ÈÚJÛ^\Ž›™]ÈšJ
K™YŽ\Ë[ÝÔÝ™X[\ÎˆLJKO\‹™Ù]ØšŠ
KNÚYŠ™JK™Y˜
JXO]\Ëœ›ØÙ\ÜÖ™Y•X›JŠK\ËÜXÝXKOXK™Ù]
™Y”ÝX
K[X™\‹š\Ò[YÙ\ŠJI‰ˆ]\Ë—Þ™Y”Ý\Ëš\ÊJI‰Š\Ë—Þ™Y”Ý\Ë˜Y
JK\ËœÝ\™Y”]Y]YKœ\Ú
JK\ËˆÙOÏÏZJNÙ[ÙHYŠ[X™\‹š\Ò[YÙ\ŠJJ^ÚYŠS[X™\‹š\Ò[YÙ\Š‹™Ù]ØšŠ
J_^™J‹™Ù]ØšŠ
KØš˜
_J
O\‹™Ù]ØšŠ
JZ[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJ[˜[Y™YˆÝ™X[X
NÚYŠO]\Ëœ›ØÙ\ÜÖ™Y”Ý™X[JJK\ËÜXÝXKXJ]›ÝÈ™]ÈJ˜Z[YÈ™XY™YˆÝ™X[X
_Y[ÙH›ÝÈ™]ÈJ[˜[Y™YˆÝ™X[HXY\˜
NÚOXK™Ù]
™]˜
K[X™\‹š\Ò[YÙ\ŠJOÝ\ËœÝ\™Y”]Y]YKœ\Ú
JNšH[œÝ[˜Ù[Ùˆ‰‰\ËœÝ\™Y”]Y]YKœ\Ú
K›[J_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÚÊ
Ú[H™XY[™È™YŠNˆ
ÙJ_]\ËœÝ\™Y”]Y]YKœÚY

_ZYŠ\ËÜXÝ
\™]\›ˆ\ËÜXÝÚYŠYJ]›ÝÈ™]ÈY_YÙ]\Ý™Y”Ý™X[TÜÊ
^Ü™]\›ˆ\ËˆÙOÏÊ\Ë—Þ™Y”Ý\ËœÚ^™OŒÓX]›X^
‹‹\Ë—Þ™Y”Ý\ÊN›[
_YÙ][žJJ^Û]]\Ë™[šY\ÖÙWNÜ™]\›ˆ	‰ˆ]™œ™YI‰›Ù™œÙ]Ý›[Y™]ÚY”™YŠKHLJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÝ\Ë™™]Ú
K
N™_Y™]Ú
KHLJ^ÚYŠJH[œÝ[˜Ù[ÙˆŠJ]›ÝÈ\œ›ÜŠ™YˆØš™XÝ\È›ÝH™Y™\™[˜ÙX
NÛ]YK›[K]\Ë—ØØXÚSX\™Ù]
ŠNÚYŠˆOO]›ÚY
\™]\›ˆˆ[œÝ[˜Ù[Ùˆ‰‰ˆ\‹›Øš’Y	‰Š‹›Øš’YYKÔÝš[™Ê
JKŽÛ]O]\Ë™Ù][žJŠNÚYŠOOO[[
\™]\›ˆNÚYŠ\Ë—Ü[™[™Ô™YœËš\ÊJJ\™]\›ˆ\Ë—Ü[™[™Ô™YœËœ™[[Ý™JJKJYÛ›Üš[™ÈÚ\˜Ý[\ˆ™Y™\™[˜ÙNˆ	Ù_K˜
KÙNÝ\Ë—Ü[™[™Ô™YœËœ]
JNÝž^ÚOZK[˜ÛÛ\™\ÜÙYÝ\Ë™™]Ú[˜ÛÛ\™\ÜÙY
KK
N\Ë™™]ÚÛÛ\™\ÜÙY
KK
K\Ë—Ü[™[™Ô™YœËœ™[[Ý™JJ_XØ]Ú

^Ý›ÝÈ\Ë—Ü[™[™Ô™YœËœ™[[Ý™JJK\™]\›ˆH[œÝ[˜Ù[ÙˆÚK›Øš’YYKÔÝš[™Ê
NšH[œÝ[˜Ù[Ùˆ‰‰ŠK™XÝ›Øš’YYKÔÝš[™Ê
JK_Y™]Ú[˜ÛÛ\™\ÜÙY
KHLJ^Û]YK™Ù[‹OYK›[NÚYŠ™Ù[ˆOO\Š^Û]OX[˜ÛÛœÚ\Ý[Ù[™\˜][Ûˆ[ˆ™YŽˆ	Ù_XÚYŠ\Ë—ÙÙ[™\˜][Û‘˜[˜XÚÉ‰™Ù[Š\™]\›ˆJJK\Ë™™]Ú[˜ÛÛ\™\ÜÙY
‹™Ù]
K™Ù[ŠKŠNÝ›ÝÈ™]È™JJ_[]O[™]ÈÚJÛ^\Ž›™]ÈšJ\ËœÝ™X[K›XZÙTÝX”Ý™X[J›Ù™œÙ]
Ý\ËœÝ™X[KœÝ\
JK™YŽ\Ë[ÝÔÝ™X[\ÎˆLJKÏXK™Ù]ØšŠ
KÏXK™Ù]ØšŠ
KÏXK™Ù]ØšŠ
NÚYŠÈOOZ_ÈOO\ŸJÈ[œÝ[˜Ù[ÙˆJJ]›ÝÈ™]È™J˜Y
[˜ÛÛ\™\ÜÙY
H™Yˆ[žNˆ	Ù_X
NÚYŠË˜ÛYOOXØš˜
^ÚYŠË˜ÛYœÝ\ÕÚ]
Øš˜
I‰ŠO\\œÙR[
Ë˜ÛYœÝXœÝš[™ÊÊKL
KS[X™\‹š\Ó˜SŠJJJ\™]\›ˆNÝ›ÝÈ™]È™J˜Y
[˜ÛÛ\™\ÜÙY
H™Yˆ[žNˆ	Ù_X
_\™]\›ˆ]\Ë™[˜Üž\	‰ˆ[ØK™Ù]ØšŠ\Ë™[˜Üž\˜Ü™X]PÚ\\•˜[œÙ›Ü›JKŠJN˜K™Ù]ØšŠ
K[œÝ[˜Ù[ÙˆŸ\Ë—ØØXÚSX\œÙ]
K
KY™]ÚÛÛ\™\ÜÙY
KHLJ^Û]]›Ù™œÙ]O]\Ë™™]Ú
‹™Ù]
‹
JNÚYŠJH[œÝ[˜Ù[ÙˆŠJ]›ÝÈ™]ÈJ˜YØš”ÝHÝ™X[X
NÛ]OZK™XÝ™Ù]
š\œÝ
KÏZK™XÝ™Ù]
˜
NÚYŠS[X™\‹š\Ò[YÙ\ŠJ_S[X™\‹š\Ò[YÙ\ŠÊJ]›ÝÈ™]ÈJ[˜[Yš\œÝ[™ˆ\˜[Y]\œÈ›ÜˆØš”ÝHÝ™X[X
NÛ]Ï[™]ÈÚJÛ^\Ž›™]ÈšJJK™YŽ\Ë[ÝÔÝ™X[\ÎˆLJKÏP\œ˜^JÊKP\œ˜^JÊNÙ›ÜŠ]OLÙOÎÊÊÙJ^Û]\Ë™Ù]ØšŠ
NÚYŠS[X™\‹š\Ò[YÙ\Š
J]›ÝÈ™]ÈJ[˜[YØš™XÝ[X™\ˆ[ˆHØš”ÝHÝ™X[Nˆ	ÝX
NÛ]\Ë™Ù]ØšŠ
NÚYŠS[X™\‹š\Ò[YÙ\ŠŠJ]›ÝÈ™]ÈJ[˜[YØš™XÝÙ™œÙ][ˆHØš”ÝHÝ™X[Nˆ	ÛŸX
NØÖÙWO]Û]O]\Ë™Ù][žJ
NÚOË›Ù™œÙ]OO\‰‰šK™Ù[ˆOOYI‰ŠK™Ù[YJKÙWO[Ÿ[]OJKœÝ\
JØKP\œ˜^JÊNÙ›ÜŠ]OLÙOÎÊÊÙJ^Û]YOËLOÛÙJÌWK[ÙWN›ÚYÚYŠ
]›ÝÈ™]ÈJ[˜[YÙ™œÙ][ˆHØš”ÝHÝ™X[K˜
NÜÏ[™]ÈÚJÛ^\Ž›™]ÈšJK›XZÙTÝX”Ý™X[JJÛÙWKK™XÝ
JK™YŽ\Ë[ÝÔÝ™X[\ÎˆLJNÛ]\Ë™Ù]ØšŠ
NÚYŠÙWO[‹ˆ[œÝ[˜Ù[ÙˆŠXÛÛ[YNÛ]OXÖÙWK]\Ë™[šY\ÖØWNÙ‰‰™‹›Ù™œÙ]OO\‰‰™‹™Ù[OOYI‰\Ë—ØØXÚSX\œÙ]
KŠ_ZYŠYÝ™Ù[—KOO]›ÚY
]›ÝÈ™]È™J˜Y
ÛÛ\™\ÜÙY
H™Yˆ[žNˆ	Ù_X
NÜ™]\›ˆX\Þ[˜È™]ÚY”™Y\Þ[˜ÊK
^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÝ\Ë™™]Ú\Þ[˜ÊK
N™_X\Þ[˜È™]Ú\Þ[˜ÊK
^Ýž^Ü™]\›ˆ\Ë™™]Ú
K
_XØ]Ú
Š^ÚYŠJˆ[œÝ[˜Ù[ÙˆYJJ]›ÝÈŽÜ™]\›ˆ]ØZ]\Ëœ“X[˜YÙ\‹œ™\]Y\Ý˜[™ÙJ‹˜™YÚ[‹‹™[™
K\Ë™™]Ú\Þ[˜ÊK
__YÙ]Ø][ÙÓØšŠ
^Ü™]\›ˆ\Ëœ›ÛÝ_NÛ]	VÌŒL‹ÎL—NÝ˜\ˆ^XÛ\ÜÞÈÙOHLNÈÝ[[ØÛÛœÝXÝÜŠÜ“X[˜YÙ\Ž™K™YŽYÙR[™^›‹YÙQXÝœ‹™YŽšKÛØ˜[Y˜XÝÜžN˜K›ÛØXÚN›ËZ[[ÓX\ØXÚNœËÝ[™\™›Û]PØXÚN˜ËÛØ˜[ÛÛÜ”ÜXÙPØXÚN›ÛØ˜[[XYÙPØXÚNKÞ\Ý[Q›ÛØXÚN™›Û›[™[Ù\ÔÙ]™‹˜Q˜XÝÜžNœJ^Ý\Ëœ“X[˜YÙ\YK\ËœYÙR[™^[‹\ËœYÙQXÝ\‹\Ëž™Y]\Ëœ™YZK\Ë™›ÛØXÚO[Ë\Ë˜Z[[ÓX\ØXÚO\Ë\ËœÝ[™\™›Û]PØXÚOXË\Ë™ÛØ˜[ÛÛÜ”ÜXÙPØXÚO[\Ë™ÛØ˜[[XYÙPØXÚO]K\ËœÞ\Ý[Q›ÛØXÚOY\Ë››Û›[™[Ù\ÔÙ]Y‹\Ë™]˜[X]Ü“Ü[ÛœÏYK™]˜[X]Ü“Ü[ÛœË\Ëž˜Q˜XÝÜžO\Û]O^ÛØšŽŒNÝ\Ë—ÛØØ[Y˜XÝÜžOXÛ\ÜÈ^[™È^ÜÝ]XÈÜ™X]SØš’Y

^Ü™]\›˜	ÛŸWÉÊÊÛK›ØšŸX\Ý]XÈÙ]YÙSØš’Y

^Ü™]\›˜	ÚKÔÝš[™Ê
_X__HÛŠJ^Ü™]\›ˆ™]È›
Þ™YŽ\Ëž™Y‹[™\Ž™KYÙR[™^\ËœYÙR[™^Y˜XÝÜžN\Ë—ÛØØ[Y˜XÝÜžK›ÛØXÚN\Ë™›ÛØXÚKZ[[ÓX\ØXÚN\Ë˜Z[[ÓX\ØXÚKÝ[™\™›Û]PØXÚN\ËœÝ[™\™›Û]PØXÚKÛØ˜[ÛÛÜ”ÜXÙPØXÚN\Ë™ÛØ˜[ÛÛÜ”ÜXÙPØXÚKÛØ˜[[XYÙPØXÚN\Ë™ÛØ˜[[XYÙPØXÚKÞ\Ý[Q›ÛØXÚN\ËœÞ\Ý[Q›ÛØXÚKÜ[ÛœÎ\Ë™]˜[X]Ü“Ü[ÛœßJ_HÜŠKHLJ^Û]]
ÙXÝ\ËœYÙQXÝÙ^N™KÙ]\œ˜^NÝÜÚ[‘›Ý[™ˆL_JNÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JŠOÛ‹›[™ÝOOL_J–ÌZ[œÝ[˜Ù[ÙˆŠOÛ–ÌN”‹›Y\™ÙJÞ™YŽ\Ëž™Y‹XÝ\œ˜^N›ŸJN›ŸYÙ]ÛÛ[

^Ü™]\›ˆ\ËœYÙQXÝ™Ù]\œ˜^JÛÛ[Ø
_YÙ]™\ÛÝ\˜Ù\Ê
^Û]O]\ËˆÜŠ™\ÛÝ\˜Ù\Ø
NÜ™]\›ˆŠ\Ë™\ÛÝ\˜Ù\ØH[œÝ[˜Ù[ÙˆÙN”‹™[\J_HÚJJ^ÚYŠ\Ëž˜Q]J\™]\›ˆ\Ëž˜Q]K˜˜›ÞÛ]Z
\ËˆÜŠKL
K[
NÚYŠ
^ÚYŠÌ—K]ÌOŒ	‰Ì×K]ÌWOŒ
\™]\›ˆÐJ[\KÜˆ[˜[YÉÙ_H[žK˜
_\™]\›ˆ[YÙ]YYXP›Þ

^Ü™]\›ˆŠ\ËYYXP›Þ\ËˆÚJYYXP›Þ
_	Š_YÙ]Ü›Ü›Þ

^Ü™]\›ˆŠ\ËÜ›Ü›Þ\ËˆÚJÜ›Ü›Þ
_\Ë›YYXP›Þ
_YÙ]\Ù\•[š]

^Û]O]\ËœYÙQXÝ™Ù]
\Ù\•[š]
NÜ™]\›ˆŠ\Ë\Ù\•[š]\[ÙˆOOX[X™\˜	‰™OŒÙNŒJ_YÙ]šY]Ê
^Û]ØÜ›Ü›Þ™KYYXP›ÞO]\ÎÚYŠHOO]	‰ˆ^YJK
J^Û][YKš[\œÙXÝ
K
NÚYŠ‰‰›–Ì—K[–ÌOŒ	‰›–Ì×K[–ÌWOŒ
\™]\›ˆŠ\ËšY]ØŠNÐJ[\HÐÜ›Ü›Þ[™ÓYYXP›Þ[\œÙXÝ[Û‹˜
_\™]\›ˆŠ\ËšY]Ø
_YÙ]›Ý]J
^Û]O]\ËˆÜŠ›Ý]X
_Ü™]\›ˆINLOLÙOLÍŒÙIOLÍŒ™O	‰ŠOJILÍŒ
ÌÍŒ
ILÍŒ
N™OLŠ\Ë›Ý]XJ_HØJK
^ÚYŠ\Ë™]˜[X]Ü“Ü[ÛœËšYÛ›Ü™Q\œ›ÜœÊ^ÐJÙ]ÛÛ[Ý™X[HHYÛ›Üš[™ÈÝX‹\Ý™X[H
	ÝJNˆ‰Ù_H‹˜
NÜ™]\›Ÿ]›ÝÈ_X\Þ[˜ÈÙ]ÛÛ[Ý™X[J
^Û]OX]ØZ]\Ëœ“X[˜YÙ\‹™[œÝ\™J\ËÛÛ[
NÜ™]\›ˆH[œÝ[˜Ù[ÙˆÙN\œ˜^Kš\Ð\œ˜^JJOÛ™]È[ŠK\ËˆØK˜š[™
\ÊJN›™]ÈŸYÙ]˜Q]J
^Ü™]\›ˆŠ\Ë˜Q]X\Ëž˜Q˜XÝÜžOÞØ˜›Þ\Ëž˜Q˜XÝÜžK™Ù]›Ý[™[™Ð›Þ
\ËœYÙR[™^
_N›[
_X\Þ[˜ÈÛÊKŠ^Û]V×NÙ›ÜŠ]HÙˆJZYŠKšY
^Û]O^‹™œ›ÛTÝš[™ÊKšY
NÚYŠYJ^ÐJH›Û‹[[šÙY[››Ý][ÛˆØ[››Ý™H[ÙYšYYˆ	ÚKšYX
NØÛÛ[Y_ZYŠK™[]Y
^ÚYŠœ]
KJKKœÜ\™YŠ^Û]O^‹™œ›ÛTÝš[™ÊKœÜ\™YŠNÙI‰œ]
KJ_XÛÛ[Y_ZYŠKœÜ\Ë™[]Y
^Û]O^‹™œ›ÛTÝš[™ÊKœÜ\™YŠNÙI‰œ]
KJ_[Ëœ]
JKKœ™YYK‹œ\Ú
\Ëž™Y‹™™]Ú\Þ[˜ÊJK[ŠOOžÙH[œÝ[˜Ù[Ùˆ‰‰ŠK›Û[››Ý][ÛYK˜ÛÛ™J
J_K

OOžÐJØ[››Ý™]ÚÛ[››Ý][Û—›ÜŽˆ	Ù_K˜
_JJK[]HKšYX]ØZ]›ÛZ\ÙK˜[
Š_X\Þ[˜ÈØ]™S™]Ð[››Ý][ÛœÊK‹‹J^ÚYŠ\Ëž˜Q˜XÝÜžJ]›ÝÈ\œ›ÜŠNˆØ[››ÝØ]™H™]È[››Ý][ÛœË˜
NÛ]O]\ËˆÛŠJKÏ[™]ÈKÏ[™]ÈYNØ]ØZ]\ËˆÛÊ‹ËÊNÛ]Ï]\ËœYÙQXÝ]\Ë˜[››Ý][ÛœË™š[\ŠOOˆJH[œÝ[˜Ù[Ùˆ‰‰›Ëš\ÊJJJKOX]ØZ]žKœØ]™S™]Ð[››Ý][ÛœÊK‹‹JNÙ›ÜŠ]Ü™YŽ™_[ÙˆK˜[››Ý][ÛœÊYH[œÝ[˜Ù[Ùˆ‰‰ˆ\Ëš\ÊJI‰›œ\Ú
JNÛ]XË˜ÛÛ™J
NÙœÙ]
[››ÝØ
KKœ]
\Ëœ™Y‹Ù]N™JNÙ›ÜŠ]HÙˆÊZKœ]
KÙ]N›[J_X\Þ[˜ÈØ]™JK‹Š^Û]O]\ËˆÛŠJKOX]ØZ]\Ë—Ü\œÙY[››Ý][ÛœËÏV×NÙ›ÜŠ]HÙˆJ[Ëœ\Ú
KœØ]™JK‹ŠK˜Ø]Ú
[˜Ý[ÛŠJ^Ü™]\›ˆJØ]™HHYÛ›Üš[™È[››Ý][Ûˆ]H\š[™È‰Ý›˜[Y_Hˆ\ÚÎˆ‰Ù_H‹˜
K[JJNÜ™]\›ˆ›ÛZ\ÙK˜[
Ê_X\Þ[˜ÈØY™\ÛÝ\˜Ù\ÊJ^Ø]ØZ]
\ËˆÝÏÏ]\Ëœ“X[˜YÙ\‹™[œÝ\™J\Ë™\ÛÝ\˜Ù\Ø
JK]ØZ]ÝK›ØY
\Ëœ™\ÛÝ\˜Ù\ËK\Ëž™YŠ_X\Þ[˜ÈÜÊK
^Û]YOË™Ù]
™\ÛÝ\˜Ù\Ø
NÜ™]\›ˆˆ[œÝ[˜Ù[Ùˆ‰‰›‹œÚ^™OÊ]ØZ]ÝK›ØY
‹\Ëž™YŠK‹›Y\™ÙJÞ™YŽ\Ëž™Y‹XÝ\œ˜^N–Û‹\Ëœ™\ÛÝ\˜Ù\×KY\™ÙTÝX‘XÝÎˆLJJN\Ëœ™\ÛÝ\˜Ù\ßX\Þ[˜ÈÙ]Ü\˜]Ü“\Ý
Ú[™\Ž™KÚ[šÎ\ÚÎ›‹[[œ‹ØXÚRÙ^NšK[››Ý][Û”ÝÜ˜YÙN˜O[[[ÙYšYYYÎ›Ï[[J^Û]Ï]\Ë™Ù]ÛÛ[Ý™X[J
KO]\Ë›ØY™\ÛÝ\˜Ù\ÊÙJK]\ËˆÛŠJKJ\Ëž˜Q˜XÝÜžOÛ[“Ý
JJOË™Ù]
\ËœYÙR[™^
KT›ÛZ\ÙKœ™\ÛÛ™J[
KO[[ÚYŠŠ^Û]O]\Ëœ“X[˜YÙ\‹™[œÝ\™QØÊ[››Ý][Û‘ÛØ˜[Ø
K[™]ÈÙ]Ù›ÜŠ]Øš]X\Y™Kš]X\[ÙˆŠYI‰ˆ]	‰ˆ\‹š\ÊJI‰œ‹˜Y
JNÛ]Ú\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜYš_O]\Ë™]˜[X]Ü“Ü[ÛœÎÚYŠ‹œÚ^™OŒ
^Û]OY‹œÛXÙJ
NÙ›ÜŠ]Ý—[ÙˆJ]œÝ\ÕÚ]

I‰›‹˜š]X\	‰œ‹š\Ê‹˜š]X\Y
I‰™Kœ\Ú
ŠNÝPžK™Ù[™\˜]R[XYÙ\ÊK\Ëž™Y‹J_Y[ÙHPžK™Ù[™\˜]R[XYÙ\Ê‹\Ëž™Y‹JNÛO[™]ÈYKT›ÛZ\ÙK˜[
ÙK\ËˆÛÊ‹K[
WJK[Š
ÙWJOO™OÐžKœš[™]Ð[››Ý][ÛœÊK‹‹
N›[
_[]T›ÛZ\ÙK˜[
ÜËWJK[Š\Þ[˜ÊØWJOOžÛ]ÏX]ØZ]\ËˆÜÊK™XÝÙJKÏ[™]ÈŠ‹
NÜ™]\›ˆKœÙ[™
Ý\™[™\”YÙXÝ˜[œÜ\™[˜ÞN™š\Ð›[™[Ù\ÊË\Ë››Û›[™[Ù\ÔÙ]
KYÙR[™^\ËœYÙR[™^ØXÚRÙ^Nš_JK]ØZ]™Ù]Ü\˜]Ü“\Ý
ÜÝ™X[N˜K\ÚÎ›‹™\ÛÝ\˜Ù\Î›ËÜ\˜]Ü“\ÝœßJKßJKÙËË—OX]ØZ]›ÛZ\ÙK˜[
Ú\Ë—Ü\œÙY[››Ý][ÛœËJNÚYŠŠ^×ÏWË™š[\ŠOOˆJKœ™Y‰‰›Kš\ÊKœ™YŠJJNÙ›ÜŠ]OL]‹›[™ÝÙOÙJÊÊ^Û]]–ÙWNÚYŠ‹œ™Y•Ô™\XÙJ^Û]WË™š[™[™^
OO™Kœ™Y‰‰•™JKœ™Y‹‹œ™Y•Ô™\XÙJJNÜL	‰ŠËœÜXÙJ‹KŠK‹œÜXÙJKKKJKKJ__WÏWË˜ÛÛ˜Ø]
Š_ZYŠË›[™ÝOOL‰˜ËS““ÕUSÓ”×ÑTÐP“J\™]\›ˆË™›\Ú
L
KÛ[™Ý™ËÝ[[™ÝNÛ]OHHJ‰˜ËS““ÕUSÓ”×Ñ“Ô“TÊKHHJ‰˜Ë’T×ÑQUS‘ÊKHHJ‰˜ËS–JKÏHHJ‰˜Ë‘TÔVJKÏHHJ‰˜Ë”’S•
KÏV×NÙ›ÜŠ]HÙˆÊJÉ‰™K›]\Ý™UšY]ÙY
KJI‰™K›]\Ý™UšY]ÙYÚ[‘Y][™Ê‹Ê_É‰™K›]\Ý™Tš[Y
JJI‰Ëœ\Ú
K™Ù]Ü\˜]Ü“\Ý
‹‹JK˜Ø]Ú
[˜Ý[ÛŠJ^Ü™]\›ˆJÙ]Ü\˜]Ü“\ÝHYÛ›Üš[™È[››Ý][Ûˆ]H\š[™È‰Û‹›˜[Y_Hˆ\ÚÎˆ‰Ù_H‹˜
KÛÜ\Ý›[Ù\\˜]Q›Ü›NˆLKÙ\\˜]PØ[˜\ÎˆL__JJNÛ]X]ØZ]›ÛZ\ÙK˜[
ÊKOHLKHLNÙ›ÜŠ]ÛÜ\Ý™KÙ\\˜]Q›Ü›NÙ\\˜]PØ[˜\Î›Ÿ[Ùˆ
YË˜YÜ\Ý
JK_][ŽÜ™]\›ˆË™›\Ú
LÙ›Ü›N‘KØ[˜\Î‘JKÛ[™Ý™ËÝ[[™Ý_X\Þ[˜È^˜XÝ^ÛÛ[
Ú[™\Ž™K\ÚÎ[˜ÛYSX\šÙYÛÛ[›‹\ØX›S›Ü›X[^˜][ÛŽœ‹Ú[šÎšK[\œÙXÝÜŽ˜O[[J^Û]Ï]\Ë™Ù]ÛÛ[Ý™X[J
KÏ]\Ë›ØY™\ÛÝ\˜Ù\ÊYJKÏ]\Ëœ“X[˜YÙ\‹™[œÝ\™PØ][ÙÊ[™Ø
KÛWOX]ØZ]›ÛZ\ÙK˜[
ÛËË×JKX]ØZ]\ËˆÜÊ™XÝYJNÜ™]\›ˆ\ËˆÛŠJK™Ù]^ÛÛ[
ÜÝ™X[N›\ÚÎ™\ÛÝ\˜Ù\Î™[˜ÛYSX\šÙYÛÛ[›‹\ØX›S›Ü›X[^˜][ÛŽœ‹Ú[šÎšKšY]Ð›Þ\ËšY]Ë[™ÎK[\œÙXÝÜŽ˜_J_X\Þ[˜ÈÙ]ÝXÝ™YJ
^Û]OX]ØZ]\Ëœ“X[˜YÙ\‹™[œÝ\™PØ][ÙÊÝXÝ™YT›ÛÝ
NÚYŠYJ\™]\›ˆ[Ø]ØZ]\Ë—Ü\œÙY[››Ý][ÛœÎÝž^Û]X]ØZ]\Ëœ“X[˜YÙ\‹™[œÝ\™J\ËÜ\œÙTÝXÝ™YXÙWJNÜ™]\›ˆ]ØZ]\Ëœ“X[˜YÙ\‹™[œÝ\™JÙ\šX[^˜X›X
_XØ]Ú
J^Ü™]\›ˆJÙ]ÝXÝ™YNˆ‰Ù_H‹˜
K[_WÜ\œÙTÝXÝ™YJJ^Û][™]ÈÝJK\ËœYÙQXÝ
NÜ™]\›ˆœ\œÙJ\Ëœ™YŠKX\Þ[˜ÈÙ][››Ý][ÛœÑ]JKŠ^Û]X]ØZ]\Ë—Ü\œÙY[››Ý][ÛœÎÚYŠ‹›[™ÝOOL
\™]\›ˆŽÛ]OV×KOV×KËÏHHJ‰˜ËS–JKHHJ‰˜Ë‘TÔVJKOHHJ‰˜Ë”’S•
KV×NÙ›ÜŠ]ˆÙˆŠ^Û]\ß	‰›‹šY]ØX›NÊŸI‰›‹œš[X›JI‰šKœ\Ú
‹™]JK‹š\Õ^ÛÛ[	‰œÊÏÏÏ]\ËˆÛŠJKKœ\Ú
‹™^˜XÝ^ÛÛ[
ËËLKÌLKÌKÌKÌJK˜Ø]Ú
[˜Ý[ÛŠJ^ÐJÙ][››Ý][ÛœÑ]HHYÛ›Üš[™È^ÛÛ[\š[™È‰Ý›˜[Y_Hˆ\ÚÎˆ‰Ù_H‹˜
_JJJN›‹›Ý™\›^\Õ^ÛÛ[	‰œ‰‰™œ\Ú
Š_ZYŠ›[™ÝŒ
^Û][™]ÈØŠ
NØKœ\Ú
\Ë™^˜XÝ^ÛÛ[
Ú[™\Ž™K\ÚÎ[˜ÛYSX\šÙYÛÛ[ˆLK\ØX›S›Ü›X[^˜][ÛŽˆLKÚ[šÎ›[šY]Ð›Þ\ËšY]Ë[™Î›[[\œÙXÝÜŽ›ŸJK[Š

OOžÛ‹œÙ]^

_JJ_\™]\›ˆ]ØZ]›ÛZ\ÙK˜[
JK_YÙ][››Ý][ÛœÊ
^Û]O]\ËˆÜŠ[››ÝØ
NÜ™]\›ˆŠ\Ë[››Ý][ÛœØ\œ˜^Kš\Ð\œ˜^JJOÙN–×J_YÙ]Ü\œÙY[››Ý][ÛœÊ
^Û]O]\Ëœ“X[˜YÙ\‹™[œÝ\™J\Ë[››Ý][ÛœØ
K[Š\Þ[˜ÈOOžÚYŠK›[™ÝOOL
\™]\›ˆNÛ]Ý—OX]ØZ]›ÛZ\ÙK˜[
Ý\Ëœ“X[˜YÙ\‹™[œÝ\™QØÊ[››Ý][Û‘ÛØ˜[Ø
K\Ëœ“X[˜YÙ\‹™[œÝ\™QØÊšY[Øš™XÝØ
WJNÚYŠ]
\™]\›–×NÛ][Ë›Üœ[‘šY[ËOV×NÙ›ÜŠ]ˆÙˆJZKœ\Ú
žK˜Ü™X]J\Ëž™Y‹‹\Ë—ÛØØ[Y˜XÝÜžKLK‹[\Ëœ™YŠK˜Ø]Ú
[˜Ý[ÛŠJ^Ü™]\›ˆJÜ\œÙY[››Ý][ÛœÎˆ‰Ù_H‹˜
K[JJNÛ]OV×KËÎÙ›ÜŠ]HÙˆ]ØZ]›ÛZ\ÙK˜[
JJZYŠJ^ÚYŠH[œÝ[˜Ù[ÙˆžJ^ÊßV×JKœ\Ú
JNØÛÛ[Y_ZYŠH[œÝ[˜Ù[ÙˆŠ^ÊßV×JKœ\Ú
JNØÛÛ[Y_XKœ\Ú
J_\™]\›ˆÉ‰˜Kœ\Ú
‹‹œÊKÉ‰˜Kœ\Ú
‹‹›ÊK_JNÜ™]\›ˆ\ËˆÙOHLŠ\ËÜ\œÙY[››Ý][ÛœØJ_YÙ]œÐXÝ[ÛœÊ
^Û]OX
\Ëž™Y‹\ËœYÙQXÝ
NÜ™]\›ˆŠ\ËœÐXÝ[ÛœØJ_X\Þ[˜ÈÛÛXÝ[››Ý][ÛœÐžU\JK‹‹J^Û]ÜYÙR[™^˜_O]\ÎÚYŠ\ËˆÙJ^Û]OX]ØZ]\Ë—Ü\œÙY[››Ý][ÛœÎÙ›ÜŠ]Ù]N[ÙˆJJ[Ÿ‹š\Ê˜[››Ý][Û•\JJI‰ŠœYÙR[™^XK‹œ\Ú
›ÛZ\ÙKœ™\ÛÛ™J
JJNÜ™]\›Ÿ[]ÏX]ØZ]\Ëœ“X[˜YÙ\‹™[œÝ\™J\Ë[››Ý][ÛœØ
NÙ›ÜŠ]ÈÙˆÊ\‹œ\Ú
žK˜Ü™X]J\Ëž™Y‹ËK\Ë—ÛØØ[Y˜XÝÜžKLK[‹\Ëœ™YŠK[Š\Þ[˜ÈOžÚYŠ[Š\™]\›ˆ[ÚYŠ‹™]KœYÙR[™^XK‹š\Õ^ÛÛ[	‰›‹šY]ØX›J^Û]]\ËˆÛŠJNØ]ØZ]‹™^˜XÝ^ÛÛ[
‹ËLKÌLKÌKÌKÌJ_\™]\›ˆ‹™]_JK˜Ø]Ú
[˜Ý[ÛŠJ^Ü™]\›ˆJÛÛXÝ[››Ý][ÛœÐžU\Nˆ‰Ù_H‹˜
K[JJ__NÛ][™]ÈZ[\œ˜^JÌÍËŽÌWJKž[™]ÈZ[\œ˜^JÌLMKLM‹MËLMLM‹LŒLMLKL—JKž[™]ÈZ[\œ˜^JÌLKLLLLLKNL—JNÙ[˜Ý[Ûˆ^
KLLHLJ^Û]O]›[™ÝOYKœYZÐž]\ÊŠKÏXK›[™ÝZNÚYŠÏL
\™]\›ˆLNÚYŠŠ^Û]ZKLKXK›[™ÝLNÙ›ÜŠÜ[ŽÊ^Û]ÏLÙ›ÜŠÛÏI‰˜VÜ‹[×OOO]Û‹[×NÊ[ÊÊÎÚYŠÏZJ\™]\›ˆKœÜÊÏ\‹[‹LÜ‹K__Y[Ù^Û]LÙ›ÜŠÛ[ÎÊ^Û]LÙ›ÜŠÜI‰˜VÛŠÜ—OOO]Ü—NÊ\ŠÊÎÚYŠZJ\™]\›ˆKœÜÊÏ[‹LÛŠÊß_\™]\›ˆL_]˜\ˆ^XÛ\ÜÞÈÙO[™]ÈX\ÈÝ[[ØÛÛœÝXÝÜŠK
^ÚYŠ›[™ÝL
]›ÝÈ™]È™JHˆš[H\È[\KK™Kˆ]ÈÚ^™H\È™\›Èž]\Ë˜
NÝ\Ëœ“X[˜YÙ\YK\ËœÝ™X[O]\Ëž™Y[™]ÈXŠJNÛ]^Ù›ÛŒNÝ\Ë—ÙÛØ˜[Y˜XÝÜžOXÛ\ÜÞÜÝ]XÈÙ]ØÒY

^Ü™]\›˜×ÉÙK™ØÒYX\Ý]XÈÜ™X]Q›ÛY

^Ü™]\›˜‰ÊÊÛ‹™›ÛX\Ý]XÈÜ™X]SØš’Y

^ÚŠXœÝ˜XÝY]ÙÜ™X]SØš’YØ[YˆŠ_\Ý]XÈÙ]YÙSØš’Y

^ÚŠXœÝ˜XÝY]ÙÙ]YÙSØš’YØ[YˆŠ___\\œÙJJ^Ý\Ëž™Y‹œ\œÙJJK\Ë˜Ø][ÙÏ[™]ÈJ\Ëœ“X[˜YÙ\‹\Ëž™YŠ_YÙ][™X\š^˜][ÛŠ
^Û]O[[Ýž^ÙOSZK˜Ü™X]J\ËœÝ™X[J_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÚÊJ_\™]\›ˆŠ\Ë[™X\š^˜][Û˜J_YÙ]Ý\™YŠ
^Û]O]\ËœÝ™X[KLÚYŠ\Ë›[™X\š^˜][ÛŠ^ÚYŠKœ™\Ù]

K^
Kž
J^ÙKœÚÚ\
ŠNÛ]YKœYZÐž]J
NÙ›ÜŠÝ]
ŠNÊYKœÜÊÊËYKœYZÐž]J
NÝYKœÜËYKœÝ\_Y[Ù^Û]LL[ž›[™ÝOHLKOYK™[™Ù›ÜŠÈZI‰˜OŒÊXKO[‹\‹O	‰ŠOL
KKœÜÏXKOZ^
Kž‹L
NÚYŠJ^ÙKœÚÚ\
JNÛ]ŽÙÈYK™Ù]ž]J
NÝÚ[J]
ŠJNÛ]XÙ›ÜŠÛLÌ‰‰›MMÎÊ\ŠÏTÝš[™Ë™œ›ÛPÚ\ÛÙJŠKYK™Ù]ž]J
NÝ\\œÙR[
‹L
K\Ó˜SŠ
I‰ŠL
__\™]\›ˆŠ\ËÝ\™Y˜
_XÚXÚÒXY\Š
^Û]O]\ËœÝ™X[NÚYŠKœ™\Ù]

KZ^
K
J\™]\›ŽÙK›[Ý™TÝ\

KKœÚÚ\
›[™Ý
NÛ]XŽÙ›ÜŠÊYK™Ù]ž]J
JOŒÌ‰‰›[™ÝÎÊ]
ÏTÝš[™Ë™œ›ÛPÚ\ÛÙJŠNÒK\Ý

OÝ\ËˆÝ]J[˜[YˆXY\ˆ™\œÚ[ÛŽˆ	ÝX
_\\œÙTÝ\™YŠ
^Ý\Ëž™Y‹œÙ]Ý\™YŠ\ËœÝ\™YŠ_YÙ][TYÙ\Ê
^Û]OLÜ™]\›ˆO]\Ë˜Ø][ÙËš\ÐXÝX[[TYÙ\ÏÝ\Ë˜Ø][ÙË›[TYÙ\Î\Ëž˜Q˜XÝÜžOÝ\Ëž˜Q˜XÝÜžK™Ù][TYÙ\Ê
N\Ë›[™X\š^˜][ÛÝ\Ë›[™X\š^˜][Û‹›[TYÙ\Î\Ë˜Ø][ÙË›[TYÙ\ËŠ\Ë[TYÙ\ØJ_HÛŠKL
^Ü™]\›ˆ\œ˜^Kš\Ð\œ˜^JJOÙK™]™\žJOOžÚYŠO]\Ëž™Y‹™™]ÚY”™YŠJKJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆLNÚYŠKš\ÊÚYØ
J\™]\›ŠÊÝŒLÊJÚ\ÓÛ›QØÝ[Y[ÚYÛ˜]\™\ÎˆX^[][H™XÝ\œÚ[Ûˆ\™XXÚY
KLJN\ËˆÛŠK™Ù]
ÚYØ
K
NÛ]T™JK™Ù]
•
KÚYØ
KYK™Ù]
™XÝ
KOP\œ˜^Kš\Ð\œ˜^JŠI‰œ‹™]™\žJOO™OOOL
NÜ™]\›ˆ‰‰š_JNˆL_HÜŠK[™]ÈYJ^ÚYŠ\œ˜^Kš\Ð\œ˜^JJJY›ÜŠ]ˆÙˆJ^ÚYŠˆ[œÝ[˜Ù[ÙˆŠ^ÚYŠ‹š\ÊŠJXÛÛ[YNÛ‹œ]
Š_ZYŠ]\Ëž™Y‹™™]ÚY”™YŠŠKJˆ[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÚYŠ‹š\ÊÚYØ
J^Ý\ËˆÜŠ‹™Ù]
ÚYØ
KŠNØÛÛ[Y_ZYŠT™J‹™Ù]
•
KÚYØ
JXÛÛ[YNÛ]O\‹™Ù]
˜
NÚYŠJH[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÛ]OYK™Ù]
ÝX‘š[\˜
NÚH[œÝ[˜Ù[Ùˆ	‰˜Y
K›˜[YJ__YÙ]Þ˜TÝ™X[\Ê
^Û]ØXÜ›Ñ›Ü›N™_O]\Ë˜Ø][ÙÎÚYŠYJ\™]\›ˆ[Û]YK™Ù]
X
K[™]ÈX\
Øž[\]X]\Ù]ØÛÛ™šYØÛÛ›™XÝ[Û”Ù]ØØ[TÙ]Ý[\ÚY]ÞžK›X\
OO–ÙK[JJNÚYŠ[œÝ[˜Ù[Ùˆ‰‰ˆ]š\Ñ[\J\™]\›ˆ‹œÙ]
ž
KŽÚYŠP\œ˜^Kš\Ð\œ˜^J
_›[™ÝOOL
\™]\›ˆ[Ù›ÜŠ]OL]›[™ÝÙOŽÙJÏLŠ^Û]NÚYŠOYOOOLØž™OOO\‹LØÞžÙWK[‹š\ÊJJXÛÛ[YNÛ]O]\Ëž™Y‹™™]ÚY”™YŠÙJÌWJNÈJH[œÝ[˜Ù[ÙˆŠ_Kš\Ñ[\_‹œÙ]
KJ_\™]\›ˆŸYÙ]˜Q]\Ù]Ê
^Û]O]\Ë—Þ˜TÝ™X[\ÎÚYŠYJ\™]\›ˆŠ\Ë˜Q]\Ù]Ø[
NÙ›ÜŠ]Ù–Ø]\Ù]ØžJ^Û]YK™Ù]

NÚYŠŠ]ž^Û]OWÙJ‹™Ù]Ýš[™Ê
JK^ÖÝN™_NÜ™]\›ˆŠ\Ë˜Q]\Ù]Ø™]È˜ŠŠJ_XØ]ÚÐJHH[˜[Y]‹NÝš[™Ë˜
NØœ™XZß_\™]\›ˆŠ\Ë˜Q]\Ù]Ø[
_YÙ]˜Q]J
^Û]O]\Ë—Þ˜TÝ™X[\ÎÚYŠYJ\™]\›ˆ[Û]SØš™XÝ˜Ü™X]J[
NÙ›ÜŠ]Û‹—[ÙˆJZYŠŠ]ž^ÝÛ—OWÙJ‹™Ù]Ýš[™Ê
J_XØ]ÚÜ™]\›ˆJHH[˜[Y]‹NÝš[™Ë˜
K[\™]\›ˆYÙ]˜Q˜XÝÜžJ
^Û]NÜ™]\›ˆ\Ëœ“X[˜YÙ\‹™[˜X›V˜I‰\Ë˜Ø][ÙË›™YYÔ™[™\š[™É‰\Ë™›Ü›R[™›Ëš\Ö˜I‰ˆ]\Ë™›Ü›R[™›Ëš\ÐXÜ›Ñ›Ü›I‰ŠO]\Ëž˜Q]JKŠ\Ë˜Q˜XÝÜžXOÛ™]ÈžJJN›[
_YÙ]\Ô\™V˜J
^Ü™]\›ˆ\Ëž˜Q˜XÝÜžOÝ\Ëž˜Q˜XÝÜžKš\Õ˜[Y

NˆL_YÙ][›Ü–˜J
^Ü™]\›ˆ\Ëž˜Q˜XÝÜžOÝ\Ëž˜Q˜XÝÜžK™Ù]YÙ\Ê
N›[X\Þ[˜ÈÚJ
^Û]OX]ØZ]\Ëœ“X[˜YÙ\‹™[œÝ\™PØ][ÙÊ˜R[XYÙ\Ø
NÙI‰\Ëž˜Q˜XÝÜžKœÙ][XYÙ\ÊJ_X\Þ[˜ÈØJK
^Û]X]ØZ]\Ëœ“X[˜YÙ\‹™[œÝ\™PØ][ÙÊXÜ›Ñ›Ü›X
NÚYŠ[Š\™]\›ŽÛ]X]ØZ]‹™Ù]\Þ[˜Ê˜
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽØ]ØZ]ÝK›ØY
‹Ø›ÛK\Ëž™YŠNÛ]O\‹™Ù]
›Û
NÚYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]OSØš™XÝ˜\ÜÚYÛŠØš™XÝ˜Ü™X]J[
K\Ëœ“X[˜YÙ\‹™]˜[X]Ü“Ü[ÛœËÝ\ÙTÞ\Ý[Q›ÛÎˆL_JKØZ[[ÓX\ØXÚN›Ë›ÛØXÚNœËÝ[™\™›Û]PØXÚN˜ßO]\Ë˜Ø][ÙË[™]È›
Þ™YŽ\Ëž™Y‹[™\Ž™KYÙR[™^‹LKY˜XÝÜžN\Ë—ÙÛØ˜[Y˜XÝÜžK›ÛØXÚNœËZ[[ÓX\ØXÚN›ËÝ[™\™›Û]PØXÚN˜ËÜ[ÛœÎ˜_JKO[™]È‹V×K^ÙÙ]›Û

^Ü™]\›ˆ˜]
LJ_KÙ]›Û
J^Ùœ\Ú
J_KÛÛ™J
^Ü™]\›ˆ\ß_KJK‹JOO›š[™TÙ]›Û
‹Ó™Ù]
JKWK[K‹‹JK˜Ø]Ú
OOŠJØY˜Q›ÛÎˆ‰Ù_H‹˜
K[
JKOV×NÙ›ÜŠ]ÙK[ÙˆJ^Û]]™Ù]
›Û\ØÜš\Ü˜
NÚYŠJˆ[œÝ[˜Ù[ÙˆŠJXÛÛ[YNÛ][‹™Ù]
›Û˜[Z[X
NÜ\‹œ™\XÙP[
ÖÈJÊ
KÙË	X
NÛ]O[‹™Ù]
›ÛÙZYÚ
KOK[‹™Ù]
][XÐ[™ÛX
KÏ^Ù›Û˜[Z[Nœ‹›ÛÙZYÚšK][XÐ[™ÛN˜_NÕ
ÊI‰›Kœ\Ú

K[ÊJ_X]ØZ]›ÛZ\ÙK˜[
JNÛ]]\Ëž˜Q˜XÝÜžKœÙ]›ÛÊ
NÚYŠZ
\™]\›ŽØKšYÛ›Ü™Q\œ›ÜœÏHLK›[™ÝL›[™ÝLÛ]Ï[™]ÈÙ]Ù›ÜŠ]HÙˆ
UÊ	Ù_KT™YÝ[\˜
_Ë˜Y
JNÙËœÚ^™I‰šœ\Ú
’”ËQ˜[˜XÚØ
NÙ›ÜŠ]HÙˆ
ZYŠYËš\ÊJJY›ÜŠ]Ù–ÞÛ˜[YN˜™YÝ[\˜›ÛÙZYÚ][XÐ[™ÛNŒKÛ˜[YN˜›Û›ÛÙZYÚÌ][XÐ[™ÛNŒKÛ˜[YN˜][XØ›ÛÙZYÚ][XÐ[™ÛNŒLŸKÛ˜[YN˜›Û][XØ›ÛÙZYÚÌ][XÐ[™ÛNŒLŸWJ^Û]X	Ù_KIÝ›˜[Y_XÛKœ\Ú

‹ÊŠKÙ›Û˜[Z[N™K›ÛÙZYÚ™›ÛÙZYÚ][XÐ[™ÛNš][XÐ[™Û_JJ_X]ØZ]›ÛZ\ÙK˜[
JK\Ëž˜Q˜XÝÜžK˜\[™›ÛÊÊ_[ØY˜T™\ÛÝ\˜Ù\ÊK
^Ü™]\›ˆ›ÛZ\ÙK˜[
Ý\ËˆØJK
K˜Ø]Ú


OOžßJK\ËˆÚJ
WJ_\Ù\šX[^™V˜Q]JJ^Ü™]\›ˆ\Ëž˜Q˜XÝÜžOÝ\Ëž˜Q˜XÝÜžKœÙ\šX[^™Q]JJN›[YÙ]™\œÚ[ÛŠ
^Ü™]\›ˆ\Ë˜Ø][ÙË™\œÚ[ÛŸ\ËˆÝYÙ]›Ü›R[™›Ê
^Û]O^Ú\ÑšY[ÎˆLK\ÐXÜ›Ñ›Ü›NˆLK\Ö˜NˆLK\ÔÚYÛ˜]\™\ÎˆL_KØXÜ›Ñ›Ü›NO]\Ë˜Ø][ÙÎÚYŠ]
\™]\›ˆŠ\Ë›Ü›R[™›ØJNÝž^Û]]™Ù]
šY[Ø
KP\œ˜^Kš\Ð\œ˜^JŠI‰›‹›[™ÝŒÙKš\ÑšY[Ï\ŽÛ]O]™Ù]
X
NÙKš\Ö˜OP\œ˜^Kš\Ð\œ˜^JJI‰šK›[™ÝŒH[œÝ[˜Ù[Ùˆ‰‰ˆZKš\Ñ[\NÛ]OHHJ™Ù]
ÚYÑ›YÜØ
IŒJKÏXI‰\ËˆÛŠŠNÙKš\ÐXÜ›Ñ›Ü›O\‰‰ˆ[ËKš\ÔÚYÛ˜]\™\ÏX_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÐJØ[››Ý™]Ú›Ü›H[™›Ü›X][ÛŽˆ‰Ù_H‹˜
_\™]\›ˆŠ\Ë›Ü›R[™›ØJ_YÙ]ØÝ[Y[[™›Ê
^Û]ØØ][ÙÎ™K›Ü›R[™›Î™YŽ›ŸO]\Ë^Ô‘›Ü›X]™\œÚ[ÛŽ\Ë™\œÚ[Û‹[™ÝXYÙN™K›[™Ë[˜Üž\š[\“˜[YN›‹™[˜Üž\Ë™š[\“˜[YOÏÛ[\Ó[™X\š^™YˆH]\Ë›[™X\š^˜][Û‹\ÐXÜ›Ñ›Ü›T™\Ù[š\ÐXÜ›Ñ›Ü›K\ÖT™\Ù[š\Ö˜K\ÐÛÛXÝ[Û”™\Ù[ˆHYK˜ÛÛXÝ[Û‹\ÔÚYÛ˜]\™\Ô™\Ù[š\ÔÚYÛ˜]\™\ßKNÝž^ÚO[‹˜Z[\‹™Ù]
[™›Ø
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[ÙˆYJ]›ÝÈNÚÊHØÝ[Y[[™›Ü›X][ÛˆXÝ[Û˜\žH\È[˜[Y˜
_ZYŠJH[œÝ[˜Ù[ÙˆŠJ\™]\›ˆŠ\ËØÝ[Y[[™›ØŠNÙ›ÜŠ]ÙK[ÙˆJ^ÜÝÚ]Ú
J^ØØ\ÙX]X˜Ø\ÙX]]Ü˜˜Ø\ÙXÝXš™XÝ˜Ø\ÙXÙ^]ÛÜ™Ø˜Ø\ÙXÜ™X]Ü˜˜Ø\ÙX›ÙXÙ\˜˜Ø\ÙXÜ™X][Û‘]X˜Ø\ÙX[Ù]XšYŠ\[ÙˆOXÝš[™Ø
^Ü–ÙWOYÙJ
NØÛÛ[Y_Xœ™XZÎØØ\ÙX˜\YšYŠ[œÝ[˜Ù[Ùˆ
^Ü–ÙWO]ØÛÛ[Y_Xœ™XZÎÙY˜][›]ŽÜÝÚ]Ú
\[Ùˆ
^ØØ\ÙXÝš[™Ø›YÙJ
NØœ™XZÎØØ\ÙX[X™\˜˜Ø\ÙX›ÛÛX[˜›]Øœ™XZÎÙY˜][[œÝ[˜Ù[Ùˆ	‰Š]
NØœ™XZßZYŠOO]›ÚY
^ÐJ˜Y˜[YK›ÜˆÝ\ÝÛHÙ^H‰Ù_H‹[ˆ[™›Îˆ	ÝK˜
NØÛÛ[Y_\‹Ý\ÝÛOÏÏSØš™XÝ˜Ü™X]J[
K‹Ý\ÝÛVÙWO[ŽØÛÛ[Y_PJ˜Y˜[YK›ÜˆÙ^H‰Ù_H‹[ˆ[™›Îˆ	ÝK˜
_\™]\›ˆŠ\ËØÝ[Y[[™›ØŠ_YÙ]š[™Ù\œš[Ê
^Û]OLLXœ™\X]
MŠNÙ[˜Ý[ÛˆŠJ^Ü™]\›ˆ\[ÙˆOOXÝš[™Ø	‰™K›[™ÝOOLM‰‰™HOO][]]\Ëž™Y‹˜Z[\‹™Ù]
Q
KKNÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JŠI‰›Š–ÌJOÊO\ÙJ–ÌJK–ÌWHOO\–ÌI‰›Š–ÌWJI‰ŠO\ÙJ–ÌWJJJNšOWØŠ\ËœÝ™X[K™Ù]ž]T˜[™ÙJJKJKŠ\Ëš[™Ù\œš[ØÑYJJKOÑYJJN›[J_X\Þ[˜ÈÛÊJ^Û]ØØ][ÙÎ[™X\š^˜][ÛŽ›‹™YŽœŸO]\ËO^‹™Ù]
‹›Øš™XÝ[X™\‘š\œÝ
NÝž^Û]OX]ØZ]‹™™]Ú\Þ[˜ÊJNÚYŠH[œÝ[˜Ù[ÙˆŠ^Û]YK™Ù]˜]Ê\X
NÚYŠˆ[œÝ[˜Ù[Ùˆ‰‰ŠX]ØZ]‹™™]Ú\Þ[˜ÊŠJK™J‹YÙX
_YKš\Ê\X
I‰ˆYKš\ÊÚYØ
I‰™Kš\ÊÛÛ[Ø
J\™]\›ˆœYÙRÚYÐÛÝ[ØXÚKš\ÊJ_œYÙRÚYÐÛÝ[ØXÚKœ]
KJKœYÙR[™^ØXÚKš\ÊJ_œYÙR[™^ØXÚKœ]
K
KÙKW_]›ÝÈ™]ÈJH[™X\š^˜][ÛˆXÝ[Û˜\žHÙ\Û—	ÝÚ[ÈH˜[YYÙHXÝ[Û˜\žK˜
_XØ]Ú
Š^Ü™]\›ˆJÙÙ][™X\š^˜][Û”YÙNˆ‰Û‹›Y\ÜØYÙ_H‹˜
K™Ù]YÙQXÝ
J__YÙ]YÙJJ^Û]]\ËˆÙK™Ù]
JNÚYŠ
\™]\›ˆÛ]ØØ][ÙÎ›‹[™X\š^˜][ÛŽœ‹˜Q˜XÝÜžNš_O]\ËNÜ™]\›ˆOZOÔ›ÛZ\ÙKœ™\ÛÛ™JÔ‹™[\K[JNœËœYÙQš\œÝOOYOÝ\ËˆÛÊJN›‹™Ù]YÙQXÝ
JKOXK[Š
Ý—JOO›™]È^
Ü“X[˜YÙ\Ž\Ëœ“X[˜YÙ\‹™YŽ\Ëž™Y‹YÙR[™^™KYÙQXÝ™YŽœ‹ÛØ˜[Y˜XÝÜžN\Ë—ÙÛØ˜[Y˜XÝÜžK›ÛØXÚN›‹™›ÛØXÚKZ[[ÓX\ØXÚN›‹˜Z[[ÓX\ØXÚKÝ[™\™›Û]PØXÚN›‹œÝ[™\™›Û]PØXÚKÛØ˜[ÛÛÜ”ÜXÙPØXÚN›‹™ÛØ˜[ÛÛÜ”ÜXÙPØXÚKÛØ˜[[XYÙPØXÚN›‹™ÛØ˜[[XYÙPØXÚKÞ\Ý[Q›ÛØXÚN›‹œÞ\Ý[Q›ÛØXÚK›Û›[™[Ù\ÔÙ]›‹››Û›[™[Ù\ÔÙ]˜Q˜XÝÜžNš_JJK\ËˆÙKœÙ]
KJK_X\Þ[˜ÈÚXÚÑš\œÝYÙJOHLJ^ÚYŠYJ]ž^Ø]ØZ]\Ë™Ù]YÙJ
_XØ]Ú
J^ÚYŠH[œÝ[˜Ù[Ùˆ™J]›ÝÈ\ËˆÙK™[]J
K]ØZ]\Ë˜ÛX[\

K™]ÈY__X\Þ[˜ÈÚXÚÓ\ÝYÙJOHLJ^Û]ØØ][ÙÎ“X[˜YÙ\Ž›ŸO]\ÎÝœÙ]XÝX[[TYÙ\Ê
NÛ]ŽÝž^ÚYŠ]ØZ]›ÛZ\ÙK˜[
Û‹™[œÝ\™QØÊ˜Q˜XÝÜžX
K‹™[œÝ\™QØÊ[™X\š^˜][Û˜
K‹™[œÝ\™PØ][ÙÊ[TYÙ\Ø
WJK\Ëž˜Q˜XÝÜžJ\™]\›ŽÚYŠ]\Ë›[™X\š^˜][ÛÝ\Ë›[™X\š^˜][Û‹›[TYÙ\Î›[TYÙ\ËS[X™\‹š\Ò[YÙ\ŠŠJ]›ÝÈ™]ÈJYÙHÛÝ[\È›Ý[ˆ[YÙ\‹˜
NÚYŠLJ\™]\›ŽØ]ØZ]\Ë™Ù]YÙJ‹LJ_XØ]Ú
J^ÚYŠ\ËˆÙK™[]J‹LJK]ØZ]\Ë˜ÛX[\

KH[œÝ[˜Ù[Ùˆ™I‰ˆYJ]›ÝÈ™]ÈYNÐJÚXÚÓ\ÝYÙHH[˜[YÔYÙ\È™YHÐÛÝ[ˆ	ÜŸK˜
NÛ]NÝž^ØOX]ØZ]™Ù][YÙQXÝÊJ_XØ]Ú
Š^ÚYŠˆ[œÝ[˜Ù[Ùˆ™I‰ˆYJ]›ÝÈ™]ÈYNÝœÙ]XÝX[[TYÙ\ÊJNÜ™]\›ŸY›ÜŠ]ÙKÜ‹WW[ÙˆJ^Û]NÜˆ[œÝ[˜Ù[Ùˆ\œ›ÜÊOT›ÛZ\ÙKœ™Z™XÝ
ŠKK˜Ø]Ú


OOžßJJN˜OT›ÛZ\ÙKœ™\ÛÛ™J™]È^
Ü“X[˜YÙ\Ž›‹™YŽ\Ëž™Y‹YÙR[™^™KYÙQXÝœ‹™YŽšKÛØ˜[Y˜XÝÜžN\Ë—ÙÛØ˜[Y˜XÝÜžK›ÛØXÚN™›ÛØXÚKZ[[ÓX\ØXÚN˜Z[[ÓX\ØXÚKÝ[™\™›Û]PØXÚNœÝ[™\™›Û]PØXÚKÛØ˜[ÛÛÜ”ÜXÙPØXÚN\Ë™ÛØ˜[ÛÛÜ”ÜXÙPØXÚKÛØ˜[[XYÙPØXÚN™ÛØ˜[[XYÙPØXÚKÞ\Ý[Q›ÛØXÚNœÞ\Ý[Q›ÛØXÚK›Û›[™[Ù\ÔÙ]››Û›[™[Ù\ÔÙ]˜Q˜XÝÜžN›[JJK\ËˆÙKœÙ]
KJ_]œÙ]XÝX[[TYÙ\ÊKœÚ^™J__X\Þ[˜È›Û˜[˜XÚÊK
^Û]ØØ][ÙÎ›‹“X[˜YÙ\ŽœŸO]\ÎÙ›ÜŠ]HÙˆ]ØZ]›ÛZ\ÙK˜[
‹™›ÛØXÚJJZYŠK›ØYY˜[YOOOYJ^ÚK™˜[˜XÚÊ‹™]˜[X]Ü“Ü[ÛœÊNÜ™]\›Ÿ_X\Þ[˜ÈÛX[\
OHLJ^Ü™]\›ˆ\Ë˜Ø][ÙÏÝ\Ë˜Ø][ÙË˜ÛX[\
JN›J
_X\Þ[˜ÈÜÊK‹‹KKÊ^Û]Þ™YŽœßO]\ÎÚYŠJˆ[œÝ[˜Ù[ÙˆŠ_Kš\ÊŠJ\™]\›ŽØKœ]
ŠNÛ]ÏX]ØZ]Ë™™]Ú\Þ[˜ÊŠNÚYŠJÈ[œÝ[˜Ù[ÙˆŠJ\™]\›ŽÛ]X]ØZ]Ë™Ù]\Þ[˜ÊÝX\X
NÜÝÚ]Ú
[[œÝ[˜Ù[ÙˆÛ›˜[YN›[
^ØØ\ÙX[šØœ™]\›ŸZYŠËš\Ê
J^Û]YÙJ]ØZ]Ë™Ù]\Þ[˜Ê
JNÙOYOOOXÝ˜	Ù_K‰ÝXY[Ù^Û]XÎÙ›ÜŠÎÊ^ÚYŠ[‹™Ù]˜]Ê\™[
_ˆ[œÝ[˜Ù[ÙˆŠ^ÚYŠKš\ÊŠJXœ™XZÎÛX]ØZ]Ë™™]Ú\Þ[˜ÊŠ_ZYŠJˆ[œÝ[˜Ù[ÙˆŠJXœ™XZÎÚYŠ‹š\Ê
J^Û]YÙJ]ØZ]‹™Ù]\Þ[˜Ê
JNÙOYOOOXÝ˜	Ù_K‰ÝXØœ™XZß__ZYŠ	‰ˆXËš\Ê\™[
I‰”™JË™Ù]
ÝX\X
KÚYÙ]
I‰›Ëœ]
‹
K‹š\ÊJ_‹œÙ]
K×JK‹™Ù]
JKœ\Ú
žK˜Ü™X]JË‹K[LË[[
K[ŠOO™OË™Ù]šY[Øš™XÝ

JK˜Ø]Ú
[˜Ý[ÛŠJ^Ü™]\›ˆJØÛÛXÝšY[Øš™XÝÎˆ‰Ù_H‹˜
K[JJKXËš\ÊÚYØ
J\™]\›ŽÛ]OX]ØZ]Ë™Ù]\Þ[˜ÊÚYØ
NÚYŠ\œ˜^Kš\Ð\œ˜^JJJY›ÜŠ]ÙˆJX]ØZ]\ËˆÜÊK‹‹KKÊ_YÙ]šY[Øš™XÝÊ
^Û]O]\Ëœ“X[˜YÙ\‹™[œÝ\™QØÊ›Ü›R[™›Ø
K[Š\Þ[˜ÈOOžÚYŠYKš\ÑšY[Ê\™]\›ˆ[Û]X]ØZ]\Ë˜[››Ý][Û‘ÛØ˜[ÎÚYŠ]
\™]\›ˆ[Û]ØXÜ›Ñ›Ü›N›ŸO][™]ÈYKOSØš™XÝ˜Ü™X]J[
KO[™]ÈX\Ï[™]ÈNÙ›ÜŠ]HÙˆ‹™Ù]
šY[Ø
JX]ØZ]\ËˆÜÊ[KK‹ÊNÛ]ÏV×NÙ›ÜŠ]ÙK[ÙˆJ\Ëœ\Ú
›ÛZ\ÙK˜[

K[ŠOžÝ]™š[\ŠOOˆHYJK›[™ÝŒ	‰ŠVÙWO]
_JJNÜ™]\›ˆ]ØZ]›ÛZ\ÙK˜[
ÊKØ[šY[Î›JJOŒÚN›[Üœ[‘šY[Î›ß_JNÜ™]\›ˆŠ\ËšY[Øš™XÝØJ_YÙ]\Ò”ÐXÝ[ÛœÊ
^Û]O]\Ëœ“X[˜YÙ\‹™[œÝ\™QØÊÜ\œÙR\Ò”ÐXÝ[ÛœØ
NÜ™]\›ˆŠ\Ë\Ò”ÐXÝ[ÛœØJ_X\Þ[˜ÈÜ\œÙR\Ò”ÐXÝ[ÛœÊ
^Û]ÙKOX]ØZ]›ÛZ\ÙK˜[
Ý\Ëœ“X[˜YÙ\‹™[œÝ\™PØ][ÙÊœÐXÝ[ÛœØ
K\Ëœ“X[˜YÙ\‹™[œÝ\™QØÊšY[Øš™XÝØ
WJNÜ™]\›ˆOÈLË˜[šY[ÏÓØš™XÝ˜[Y\Ê˜[šY[ÊKœÛÛYJOO™KœÛÛYJOO™K˜XÝ[ÛœÈOO[[
JNˆL_YÙ]Ø[Ý[][Û“Ü™\’YÊ
^Û]O]\Ë˜Ø][ÙË˜XÜ›Ñ›Ü›OË™Ù]
ÓØ
NÚYŠP\œ˜^Kš\Ð\œ˜^JJ_K›[™ÝOOL
\™]\›ˆŠ\ËØ[Ý[][Û“Ü™\’YØ[
NÛ]V×NÙ›ÜŠ]ˆÙˆJ[ˆ[œÝ[˜Ù[Ùˆ‰‰œ\Ú
‹ÔÝš[™Ê
JNÜ™]\›ˆŠ\ËØ[Ý[][Û“Ü™\’YØ›[™ÝÝ›[
_YÙ][››Ý][Û‘ÛØ˜[Ê
^Ü™]\›ˆŠ\Ë[››Ý][Û‘ÛØ˜[ØžK˜Ü™X]QÛØ˜[Ê\Ëœ“X[˜YÙ\ŠJ__NÙ[˜Ý[ÛˆÞ
J^ÚYŠJ^Û]T
JNÚYŠ
\™]\›ˆš™YŽÐJ[˜[YXœÛÛ]HØÐ˜\ÙU\›ˆ‰Ù_H‹˜
_\™]\›ˆ[]˜\ˆÞXÛ\ÜÞØÛÛœÝXÝÜŠÙØÐ˜\ÙU\›™KØÒY[˜X›V˜N›‹]˜[X]Ü“Ü[ÛœÎœ‹[™\ŽšK\ÜÝÛÜ™˜_J^Ý\Ë—ÙØÐ˜\ÙU\›[Þ
JK\Ë—ÙØÒY]\Ë—Ü\ÜÝÛÜ™XK\Ë™[˜X›V˜O[‹‹š\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜY	‰Y™Kš\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜY‹š\Ò[XYÙQXÛÙ\”Ý\ÜY	‰Y™Kš\Ò[XYÙQXÛÙ\”Ý\ÜY\Ë™]˜[X]Ü“Ü[ÛœÏSØš™XÝ™œ™Y^™JŠK›‹œÙ]Ü[ÛœÊŠK\‹œÙ]Ü[ÛœÊŠK‹œÙ]Ü[ÛœÊŠNÛ]Ï^Ë‹‹œ‹[™\Žš_NØÜ‹œÙ]Ü[ÛœÊÊK‹œÙ]Ü[ÛœÊÊKÛ‹œÙ]Ü[ÛœÊÊ_YÙ]ØÒY

^Ü™]\›ˆ\Ë—ÙØÒYYÙ]\ÜÝÛÜ™

^Ü™]\›ˆ\Ë—Ü\ÜÝÛÜ™YÙ]ØÐ˜\ÙU\›

^Ü™]\›ˆ\Ë—ÙØÐ˜\ÙU\›Y[œÝ\™QØÊK
^Ü™]\›ˆ\Ë™[œÝ\™J\Ëœ‘ØÝ[Y[K
_Y[œÝ\™V™YŠK
^Ü™]\›ˆ\Ë™[œÝ\™J\Ëœ‘ØÝ[Y[ž™Y‹K
_Y[œÝ\™PØ][ÙÊK
^Ü™]\›ˆ\Ë™[œÝ\™J\Ëœ‘ØÝ[Y[˜Ø][ÙËK
_YÙ]YÙJJ^Ü™]\›ˆ\Ëœ‘ØÝ[Y[™Ù]YÙJJ_Y›Û˜[˜XÚÊK
^Ü™]\›ˆ\Ëœ‘ØÝ[Y[™›Û˜[˜XÚÊK
_XÛX[\
OHLJ^Ü™]\›ˆ\Ëœ‘ØÝ[Y[˜ÛX[\
J_X\Þ[˜È[œÝ\™JKŠ^ÚŠXœÝ˜XÝY]Ù[œÝ\™XØ[YŠ_\™\]Y\Ý˜[™ÙJK
^ÚŠXœÝ˜XÝY]Ù™\]Y\Ý˜[™ÙXØ[YŠ_\™\]Y\ÝØYYÝ™X[JOHLJ^ÚŠXœÝ˜XÝY]Ù™\]Y\ÝØYYÝ™X[XØ[YŠ_\Ù[™›ÙÜ™\ÜÚ]™Q]JJ^ÚŠXœÝ˜XÝY]ÙÙ[™›ÙÜ™\ÜÚ]™Q]XØ[YŠ_]\]T\ÜÝÛÜ™
J^Ý\Ë—Ü\ÜÝÛÜ™Y_]\›Z[˜]JJ^ÚŠXœÝ˜XÝY]Ù\›Z[˜]XØ[YŠ__KÞXÛ\ÜÈ^[™ÈÞØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJNÛ][™]ÈÛŠKœÛÝ\˜ÙJNÝ\Ëœ‘ØÝ[Y[[™]È^
\Ë
K\Ë—ÛØYYÝ™X[T›ÛZ\ÙOT›ÛZ\ÙKœ™\ÛÛ™J
_X\Þ[˜È[œÝ\™JKŠ^Û]YVÝNÜ™]\›ˆ\[ÙˆOX[˜Ý[Û˜Ü‹˜\JKŠNœŸ\™\]Y\Ý˜[™ÙJK
^Ü™]\›ˆ›ÛZ\ÙKœ™\ÛÛ™J
_\™\]Y\ÝØYYÝ™X[JOHLJ^Ü™]\›ˆ\Ë—ÛØYYÝ™X[T›ÛZ\Ù_]\›Z[˜]JJ^ß_KXÛ\ÜÈ^[™ÈÞØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\ËœÝ™X[SX[˜YÙ\[™]ÈŠKœÛÝ\˜ÙKÛ\ÙÒ[™\Ž™Kš[™\‹[™Ý™K›[™Ý\ØX›P]]Ñ™]Ú™K™\ØX›P]]Ñ™]Ú˜[™ÙPÚ[šÔÚ^™N™Kœ˜[™ÙPÚ[šÔÚ^™_JK\Ëœ‘ØÝ[Y[[™]È^
\Ë\ËœÝ™X[SX[˜YÙ\‹™Ù]Ý™X[J
J_X\Þ[˜È[œÝ\™JKŠ^Ýž^Û]YVÝNÜ™]\›ˆ\[ÙˆOX[˜Ý[Û˜Ü‹˜\JKŠNœŸXØ]Ú
Š^ÚYŠJˆ[œÝ[˜Ù[ÙˆYJJ]›ÝÈŽÜ™]\›ˆ]ØZ]\Ëœ™\]Y\Ý˜[™ÙJ‹˜™YÚ[‹‹™[™
K\Ë™[œÝ\™JKŠ__\™\]Y\Ý˜[™ÙJK
^Ü™]\›ˆ\ËœÝ™X[SX[˜YÙ\‹œ™\]Y\Ý˜[™ÙJK
_\™\]Y\ÝØYYÝ™X[JOHLJ^Ü™]\›ˆ\ËœÝ™X[SX[˜YÙ\‹œ™\]Y\Ý[Ú[šÜÊJ_\Ù[™›ÙÜ™\ÜÚ]™Q]JJ^Ý\ËœÝ™X[SX[˜YÙ\‹›Û”™XÙZ]™Q]JØÚ[šÎ™_J_]\›Z[˜]JJ^Ý\ËœÝ™X[SX[˜YÙ\‹˜X›Ü
J__NÛ]^^ÑUNŒKT”“ÔŽŒŸK^ÐÐSÑSŒKÐSÑSÐÓÓTUNŒ‹ÓÔÑNŒËS”UQUQNT”“ÔŽKS‹SÐÓÓTUNËÕT•ÐÓÓTUNŽNÙ[˜Ý[Ûˆž

^ßY[˜Ý[Ûˆ
J^ÚYŠH[œÝ[˜Ù[ÙˆY_H[œÝ[˜Ù[Ùˆ™_H[œÝ[˜Ù[Ùˆ_H[œÝ[˜Ù[ÙˆY_H[œÝ[˜Ù[Ùˆ™J\™]\›ˆNÜÝÚ]Ú
H[œÝ[˜Ù[Ùˆ\œ›ÜŸ\[ÙˆOOXØš™XÝ	‰™_ŠÜ˜\™X\ÛÛŽˆ^XÝYœ™X\ÛÛˆˆÈ™HH
ÜÜÚX›HÛÛ™Y
H\œ›Ü‹˜
KK›˜[YJ^ØØ\ÙXX›Ü^Ù\[Û˜œ™]\›ˆ™]ÈYJK›Y\ÜØYÙJNØØ\ÙX[˜[Y‘^Ù\[Û˜œ™]\›ˆ™]È™JK›Y\ÜØYÙJNØØ\ÙX\ÜÝÛÜ™^Ù\[Û˜œ™]\›ˆ™]ÈJK›Y\ÜØYÙKK˜ÛÙJNØØ\ÙX™\ÜÛœÙQ^Ù\[Û˜œ™]\›ˆ™]ÈYJK›Y\ÜØYÙKKœÝ]\ËK›Z\ÜÚ[™ÊNØØ\ÙX[šÛ›ÝÛ‘\œ›Ü‘^Ù\[Û˜œ™]\›ˆ™]È™JK›Y\ÜØYÙKK™]Z[Ê_\™]\›ˆ™]È™JK›Y\ÜØYÙKKÔÝš[™Ê
J_]˜\ˆ^XÛ\ÜÞÈÙO[™]ÈX›ÜÛÛ›Û\ŽØÛÛœÝXÝÜŠKŠ^Ý\ËœÛÝ\˜ÙS˜[YOYK\Ë\™Ù]˜[YO]\Ë˜ÛÛSØš[‹\Ë˜Ø[˜XÚÒYLK\ËœÝ™X[RYLK\ËœÝ™X[TÚ[šÜÏSØš™XÝ˜Ü™X]J[
K\ËœÝ™X[PÛÛ›Û\œÏSØš™XÝ˜Ü™X]J[
K\Ë˜Ø[˜XÚÐØ\Xš[]Y\ÏSØš™XÝ˜Ü™X]J[
K\Ë˜XÝ[Û’[™\SØš™XÝ˜Ü™X]J[
K‹˜Y]™[\Ý[™\ŠY\ÜØYÙX\ËˆÝ˜š[™
\ÊKÜÚYÛ˜[\ËˆÙKœÚYÛ˜[J_HÝ
Ù]N™_J^ÚYŠK\™Ù]˜[YHOO]\ËœÛÝ\˜ÙS˜[YJ\™]\›ŽÚYŠKœÝ™X[J^Ý\ËˆÜŠJNÜ™]\›ŸZYŠK˜Ø[˜XÚÊ^Û]YK˜Ø[˜XÚÒY]\Ë˜Ø[˜XÚÐØ\Xš[]Y\ÖÝNÚYŠ[Š]›ÝÈ\œ›ÜŠØ[››Ý™\ÛÛ™HØ[˜XÚÈ	ÝX
NÚYŠ[]H\Ë˜Ø[˜XÚÐØ\Xš[]Y\ÖÝKK˜Ø[˜XÚÏOO]^‘UJ[‹œ™\ÛÛ™JK™]JNÙ[ÙHYŠK˜Ø[˜XÚÏOO]^‘T”“ÔŠ[‹œ™Z™XÝ

Kœ™X\ÛÛŠJNÙ[ÙH›ÝÈ\œ›ÜŠ[™^XÝYØ[˜XÚÈØ\ÙX
NÜ™]\›Ÿ[]]\Ë˜XÝ[Û’[™\–ÙK˜XÝ[Û—NÚYŠ]
]›ÝÈ\œ›ÜŠ[šÛ›ÝÛˆXÝ[Ûˆœ›ÛHÛÜšÙ\Žˆ	ÙK˜XÝ[ÛŸX
NÚYŠK˜Ø[˜XÚÒY
^Û]]\ËœÛÝ\˜ÙS˜[YKYKœÛÝ\˜ÙS˜[YKO]\Ë˜ÛÛSØšŽÔ›ÛZ\ÙKžJK™]JK[Š[˜Ý[ÛŠ
^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ø[˜XÚÎ^‘UKØ[˜XÚÒY™K˜Ø[˜XÚÒY]NJ_K[˜Ý[ÛŠ
^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ø[˜XÚÎ^‘T”“Ô‹Ø[˜XÚÒY™K˜Ø[˜XÚÒY™X\ÛÛŽœ

_J_JNÜ™]\›ŸZYŠKœÝ™X[RY
^Ý\ËˆÛŠJNÜ™]\›Ÿ]
K™]J_[ÛŠK
^Û]]\Ë˜XÝ[Û’[™\ŽÚYŠ–ÙWJ]›ÝÈ\œ›ÜŠ\™H\È[™XYH[ˆXÝ[Û“˜[YHØ[Y‰Ù_H˜
NÛ–ÙWO]\Ù[™
KŠ^Ý\Ë˜ÛÛSØš‹œÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN\ËœÛÝ\˜ÙS˜[YK\™Ù]˜[YN\Ë\™Ù]˜[YKXÝ[ÛŽ™K]NKŠ_\Ù[™Ú]›ÛZ\ÙJKŠ^Û]]\Ë˜Ø[˜XÚÒY
ÊËOT›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
NÝ\Ë˜Ø[˜XÚÐØ\Xš[]Y\ÖÜ—OZNÝž^Ý\Ë˜ÛÛSØš‹œÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN\ËœÛÝ\˜ÙS˜[YK\™Ù]˜[YN\Ë\™Ù]˜[YKXÝ[ÛŽ™KØ[˜XÚÒYœ‹]NKŠ_XØ]Ú
J^ÚKœ™Z™XÝ
J_\™]\›ˆKœ›ÛZ\Ù_\Ù[™Ú]Ý™X[JK‹Š^Û]O]\ËœÝ™X[RY
ÊËO]\ËœÛÝ\˜ÙS˜[YKÏ]\Ë\™Ù]˜[YKÏ]\Ë˜ÛÛSØšŽÜ™]\›ˆ™]È™XYX›TÝ™X[JÜÝ\›OžÛ]ÏT›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
NÜ™]\›ˆ\ËœÝ™X[PÛÛ›Û\œÖÚWO^ØÛÛ›Û\Ž›‹Ý\Ø[˜Ë[Ø[›[Ø[˜Ù[Ø[›[\ÐÛÜÙYˆL_KËœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN˜K\™Ù]˜[YN›ËXÝ[ÛŽ™KÝ™X[RYšK]N\Ú\™YÚ^™N›‹™\Ú\™YÚ^™_KŠKËœ›ÛZ\Ù_K[™OOžÛ]T›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
NÜ™]\›ˆ\ËœÝ™X[PÛÛ›Û\œÖÚWKœ[Ø[]ËœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN˜K\™Ù]˜[YN›ËÝ™X[N™”SÝ™X[RYšK\Ú\™YÚ^™N™K™\Ú\™YÚ^™_JKœ›ÛZ\Ù_KØ[˜Ù[™OOžÓJH[œÝ[˜Ù[Ùˆ\œ›Ü‹Ø[˜Ù[]\Ý]™HH˜[Y™X\ÛÛ˜
NÛ]T›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
NÜ™]\›ˆ\ËœÝ™X[PÛÛ›Û\œÖÚWK˜Ø[˜Ù[Ø[]\ËœÝ™X[PÛÛ›Û\œÖÚWKš\ÐÛÜÙYHLËœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN˜K\™Ù]˜[YN›ËÝ™X[N™ÐSÑSÝ™X[RYšK™X\ÛÛŽœ
J_JKœ›ÛZ\Ù__KŠ_HÛŠJ^Û]YKœÝ™X[RY]\ËœÛÝ\˜ÙS˜[YKYKœÛÝ\˜ÙS˜[YKO]\Ë˜ÛÛSØš‹O]\ËÏ]\Ë˜XÝ[Û’[™\–ÙK˜XÝ[Û—KÏ^Ù[œ]Y]YJKOLKÊ^ÚYŠ\Ëš\ÐØ[˜Ù[Y
\™]\›ŽÛ]Ï]\Ë™\Ú\™YÚ^™NÝ\Ë™\Ú\™YÚ^™KOXKÏŒ	‰\Ë™\Ú\™YÚ^™OL	‰Š\ËœÚ[šÐØ\Xš[]OT›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
K\Ëœ™XYO]\ËœÚ[šÐØ\Xš[]Kœ›ÛZ\ÙJKKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™‘S”UQUQKÝ™X[RYÚ[šÎ™_KÊ_KÛÜÙJ
^Ý\Ëš\ÐØ[˜Ù[Y
\Ëš\ÐØ[˜Ù[YHLKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™ÓÔÑKÝ™X[RYJK[]HKœÝ™X[TÚ[šÜÖÝJ_K\œ›ÜŠJ^ÓJH[œÝ[˜Ù[Ùˆ\œ›Ü‹\œ›Üˆ]\Ý]™HH˜[Y™X\ÛÛ˜
K]\Ëš\ÐØ[˜Ù[Y	‰Š\Ëš\ÐØ[˜Ù[YHLKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™‘T”“Ô‹Ý™X[RY™X\ÛÛŽœ
J_JJ_KÚ[šÐØ\Xš[]N”›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
KÛ”[›[ÛØ[˜Ù[›[\ÐØ[˜Ù[YˆLK\Ú\™YÚ^™N™K™\Ú\™YÚ^™K™XYN›[NÜËœÚ[šÐØ\Xš[]Kœ™\ÛÛ™J
KËœ™XYO\ËœÚ[šÐØ\Xš[]Kœ›ÛZ\ÙK\ËœÝ™X[TÚ[šÜÖÝO\Ë›ÛZ\ÙKžJËK™]KÊK[Š[˜Ý[ÛŠ
^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™”ÕT•ÐÓÓTUKÝ™X[RYÝXØÙ\ÜÎˆLJ_K[˜Ý[ÛŠJ^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™”ÕT•ÐÓÓTUKÝ™X[RY™X\ÛÛŽœ
J_J_J_HÜŠJ^Û]YKœÝ™X[RY]\ËœÛÝ\˜ÙS˜[YKYKœÛÝ\˜ÙS˜[YKO]\Ë˜ÛÛSØš‹O]\ËœÝ™X[PÛÛ›Û\œÖÝKÏ]\ËœÝ™X[TÚ[šÜÖÝNÜÝÚ]Ú
KœÝ™X[J^ØØ\ÙH”ÕT•ÐÓÓTUN™KœÝXØÙ\ÜÏØKœÝ\Ø[œ™\ÛÛ™J
N˜KœÝ\Ø[œ™Z™XÝ

Kœ™X\ÛÛŠJNØœ™XZÎØØ\ÙH”SÐÓÓTUN™KœÝXØÙ\ÜÏØKœ[Ø[œ™\ÛÛ™J
N˜Kœ[Ø[œ™Z™XÝ

Kœ™X\ÛÛŠJNØœ™XZÎØØ\ÙH”SšYŠ[Ê^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™”SÐÓÓTUKÝ™X[RYÝXØÙ\ÜÎˆLJNØœ™XZß[Ë™\Ú\™YÚ^™OL	‰™K™\Ú\™YÚ^™OŒ	‰›ËœÚ[šÐØ\Xš[]Kœ™\ÛÛ™J
KË™\Ú\™YÚ^™OYK™\Ú\™YÚ^™K›ÛZ\ÙKžJË›Û”[ž
K[Š[˜Ý[ÛŠ
^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™”SÐÓÓTUKÝ™X[RYÝXØÙ\ÜÎˆLJ_K[˜Ý[ÛŠJ^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™”SÐÓÓTUKÝ™X[RY™X\ÛÛŽœ
J_J_JNØœ™XZÎØØ\ÙH‘S”UQUQNšYŠJK[œ]Y]YHÚÝ[]™HÝ™X[HÛÛ›Û\˜
KKš\ÐÛÜÙY
Xœ™XZÎØK˜ÛÛ›Û\‹™[œ]Y]YJK˜Ú[šÊNØœ™XZÎØØ\ÙHÓÔÑNšYŠJKÛÜÙHÚÝ[]™HÝ™X[HÛÛ›Û\˜
KKš\ÐÛÜÙY
Xœ™XZÎØKš\ÐÛÜÙYHLK˜ÛÛ›Û\‹˜ÛÜÙJ
K\ËˆÚJK
NØœ™XZÎØØ\ÙH‘T”“ÔŽ“JK\œ›ÜˆÚÝ[]™HÝ™X[HÛÛ›Û\˜
KK˜ÛÛ›Û\‹™\œ›ÜŠ
Kœ™X\ÛÛŠJK\ËˆÚJK
NØœ™XZÎØØ\ÙHÐSÑSÐÓÓTUN™KœÝXØÙ\ÜÏØK˜Ø[˜Ù[Ø[œ™\ÛÛ™J
N˜K˜Ø[˜Ù[Ø[œ™Z™XÝ

Kœ™X\ÛÛŠJK\ËˆÚJK
NØœ™XZÎØØ\ÙHÐSÑSšYŠ[ÊXœ™XZÎÛ]Ï\
Kœ™X\ÛÛŠNÔ›ÛZ\ÙKžJË›ÛØ[˜Ù[žÊK[Š[˜Ý[ÛŠ
^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™ÐSÑSÐÓÓTUKÝ™X[RYÝXØÙ\ÜÎˆLJ_K[˜Ý[ÛŠJ^ÚKœÜÝY\ÜØYÙJÜÛÝ\˜ÙS˜[YN›‹\™Ù]˜[YNœ‹Ý™X[N™ÐSÑSÐÓÓTUKÝ™X[RY™X\ÛÛŽœ
J_J_JKËœÚ[šÐØ\Xš[]Kœ™Z™XÝ
ÊKËš\ÐØ[˜Ù[YHL[]H\ËœÝ™X[TÚ[šÜÖÝNØœ™XZÎÙY˜][›ÝÈ\œ›ÜŠ[™^XÝYÝ™X[HØ\ÙX
__X\Þ[˜ÈÚJK
^Ø]ØZ]›ÛZ\ÙK˜[Ù]Y
ÙKœÝ\Ø[Ëœ›ÛZ\ÙKKœ[Ø[Ëœ›ÛZ\ÙKK˜Ø[˜Ù[Ø[Ëœ›ÛZ\ÙWJK[]H\ËœÝ™X[PÛÛ›Û\œÖÝ_Y\Ý›ÞJ
^Ý\ËˆÙOË˜X›Ü

K\ËˆÙO[[_NØ\Þ[˜È[˜Ý[Ûˆ
K‹Ù[˜Üž\œ[[J^Û]O\Ë˜Ü™X]PÚ\\•˜[œÙ›Ü›JK›[KK™Ù[ŠNÛ‹œ\Ú
	ÙK›[_H	ÙK™Ù[ŸHØš—˜
K[œÝ[˜Ù[ÙˆØ]ØZ]Þ
‹JN[œÝ[˜Ù[ÙˆØ]ØZ]Þ
‹JNŠ\œ˜^Kš\Ð\œ˜^J
_\œ˜^PY™™\‹š\ÕšY]Ê
JI‰˜]ØZ]ž
‹JK‹œ\Ú
™[™Øš—˜
_X\Þ[˜È[˜Ý[ÛˆÞ
KŠ^Ýœ\Ú

NÙ›ÜŠ]ˆÙˆK™Ù]Ù^\Ê
J]œ\Ú
É×Ý
Š_H
K]ØZ]^
K™Ù]˜]ÊŠKŠNÝœ\Ú
˜
_X\Þ[˜È[˜Ý[ÛˆÞ
KŠ^Û]YK™Ù]ž]\Ê
KÙXÝš_OYKØK×OX]ØZ]›ÛZ\ÙK˜[
ÚK™Ù]\Þ[˜Êš[\˜
KK™Ù]\Þ[˜ÊXÛÙT\›\Ø
WJKÏT™J\œ˜^Kš\Ð\œ˜^JJOØ]ØZ]Kž™Y‹™™]ÚY”™Y\Þ[˜ÊVÌJN˜K›]QXÛÙX
NÚYŠ‹›[™ÝLMŸÊ]ž^Û]O[™]ÈÛÛ\™\ÜÚ[Û”Ý™X[JY›]X
KYKÜš]X›K™Ù]Üš]\Š
NØ]ØZ]œ™XYKÜš]JŠK[Š\Þ[˜Ê
OOžØ]ØZ]œ™XYK]ØZ]˜ÛÜÙJ
_JK˜Ø]Ú


OOžßJNÛ]X]ØZ]™]È™\ÜÛœÙJKœ™XYX›JK˜\œ˜^PY™™\Š
NÜ[™]ÈZ[\œ˜^JŠNÛ]ËØOÜß
ÏP\œ˜^Kš\Ð\œ˜^JJOÖÓ™Ù]
›]QXÛÙX
K‹‹˜WN–Ó™Ù]
›]QXÛÙX
KWKÉ‰ŠP\œ˜^Kš\Ð\œ˜^JÊOÖÛ[‹‹›×N–Û[×JJN˜ÏS™Ù]
›]QXÛÙX
KÉ‰šKœÙ]
š[\˜ÊK	‰šKœÙ]
XÛÙT\›\Ø
_XØ]Ú
J^ÚÊÜš]TÝ™X[HHØ[››ÝÛÛ\™\ÜÈ]Nˆ‰Ù_H‹˜
_[]Ï[ÙJŠNÛ‰‰ŠÏ[‹™[˜Üž\Ýš[™ÊÊJKKœÙ]
[™ÝË›[™Ý
K]ØZ]Þ
KŠKœ\Ú
Ý™X[W˜Ë™[™Ý™X[X
_X\Þ[˜È[˜Ý[Ûˆž
KŠ^Ýœ\Ú
Ø
NÛ]HLÙ›ÜŠ]HÙˆJ\ÜHLNœ\Ú

K]ØZ]^
KŠNÝœ\Ú
X
_X\Þ[˜È[˜Ý[Ûˆ^
KŠ^ÙH[œÝ[˜Ù[ÙˆÝœ\Ú
É×Ý
K›˜[YJ_X
N™H[œÝ[˜Ù[ÙˆÝœ\Ú
	ÙK›[_H	ÙK™Ù[ŸH˜
N\œ˜^Kš\Ð\œ˜^JJ_\œ˜^PY™™\‹š\ÕšY]ÊJOØ]ØZ]ž
KŠN\[ÙˆOOXÝš[™ØÊ‰‰ŠO[‹™[˜Üž\Ýš[™ÊJJKœ\Ú

	Ý
J_JX
JN\[ÙˆOOX[X™\˜Ýœ\Ú

JJN\[ÙˆOOX›ÛÛX[˜Ýœ\Ú
KÔÝš[™Ê
JN™H[œÝ[˜Ù[ÙˆØ]ØZ]Þ
KŠN™H[œÝ[˜Ù[ÙˆØ]ØZ]Þ
KŠN™OOO[[Ýœ\Ú
[
NJ[š[™Y˜[YH[ˆÜš]\Žˆ	Ý\[Ùˆ_KX\ÙHš[HHYË˜
_Y[˜Ý[Ûˆž
K‹Š^Ù›ÜŠ]O]
Û‹LNÚO›‹LNÚKKJ\–ÚWOYIŒMKONÜ™]\›ˆŠÝY[˜Ý[Ûˆ
KŠ^Û]YK›[™ÝÙ›ÜŠ]OLÚOŽÚJÊÊ[–Ý
ÚWOYK˜Ú\ÛÙP]
JIŒMNÜ™]\›ˆ
ÜŸY[˜Ý[ÛˆÞ
K
^Û]SX]™›ÛÜŠ]K››ÝÊ
KÌYLÊK]™š[[˜[Y_OVÛ‹ÔÝš[™Ê
K‹KÔÝš[™Ê
K‹‹š[™›ÓX\˜[Y\Ê
WKOSX]œÝ[T™XÚ\ÙJK›X\
OO™K›[™Ý
JKÏ[™]ÈZ[\œ˜^JJKÏLÙ›ÜŠ]HÙˆJ\Ï^
KËÊNÜ™]\›ˆÙJØŠËË›[™Ý
J_Y[˜Ý[ÛˆÞ
K
^Û][™]ÈJÚ\Ð]šX]\ÎˆLJKœ\œÙQœ›ÛTÝš[™ÊJNÙ›ÜŠ]Þ˜N™_[Ùˆ
^ÚYŠYJXÛÛ[YNÛ]Ü]˜[YNœŸOYNÚYŠ]
XÛÛ[YNÛ]OYÝ

KO[‹™ØÝ[Y[[[Y[œÙX\˜Ú›ÙJK
NÈXI‰šK›[™ÝŒI‰ŠO[‹™ØÝ[Y[[[Y[œÙX\˜Ú›ÙJÚK˜]
LJWK
JKOØK˜Ú[›Ù\ÏP\œ˜^Kš\Ð\œ˜^JŠOÜ‹›X\
OO›™]È]J˜[YXJJN–Û™]È]JÝ^ŠWNJ›ÙH›Ý›Ý[™›Üˆ]ˆ	ÝX
_[]V×NÜ™]\›ˆ‹™ØÝ[Y[[[Y[™[\
ŠK‹š›Ú[Š
_X\Þ[˜È[˜Ý[ÛˆÞ
Þ™YŽ™KXÜ›Ñ›Ü›NXÜ›Ñ›Ü›T™YŽ›‹\Ö˜Nœ‹\Ö˜Q]\Ù]Ñ[žNšK˜Q]\Ù]Ô™YŽ˜K™YY\X\˜[˜Ù\Î›ËÚ[™Ù\ÎœßJ^ÚYŠ‰‰ˆZI‰ˆXI‰JHHØ[››ÝØ]™H]
K[É‰Š\ŸX_JJ\™]\›ŽÛ]Ï]˜ÛÛ™J
NÚYŠ‰‰ˆZJ^Û]O]™Ù]
X
KœÛXÙJ
NÙKœÜXÙJ‹]\Ù]Ø
KKœÜXÙJËJKËœÙ]
XJ_[É‰˜ËœÙ]
™YY\X\˜[˜Ù\ØL
KËœ]
‹Ù]N˜ßJ_Y[˜Ý[Ûˆ
Þ˜Q]N™K˜Q]\Ù]Ô™YŽÚ[™Ù\Î›‹™YŽœŸJ^ÙOOO[[	‰ŠOPÞ
‹™™]ÚY”™YŠ
K™Ù]Ýš[™Ê
KŠJNÛ]O[™]ÈÛŠJNÚK™XÝ[™]ÈŠŠKK™XÝœÙ]Y“˜[YJ\X[X™YYš[X
K‹œ]
Ù]Nš_J_X\Þ[˜È[˜Ý[Ûˆ^
K‹‹J^ÚKœ\Ú
™Y—˜
NÛ]OQ
ŠKÏLÙ›ÜŠ]Ü™YŽ™K]NœŸ[ÙˆŠYK›[OOOXVÛ×I‰ŠKœ\Ú
	ØVÛ×_H	ØVÛÊÌW_W˜
KÊÏLŠKOO[[ÚKœ\Ú
	ÓX]›Z[ŠK™Ù[ŠÌKMLÍJKÔÝš[™Ê
KœYÝ\
K
_H——˜
NŠKœ\Ú
	ÝÔÝš[™Ê
KœYÝ\
L
_H	ÓX]›Z[ŠK™Ù[‹MLÍJKÔÝš[™Ê
KœYÝ\
K
_H——˜
K
Ï\‹›[™Ý
NÚÞ
KŠKKœ\Ú
˜Z[\—˜
K]ØZ]Þ
‹JKKœ\Ú
œÝ\™Y—˜ÔÝš[™Ê
K‰IQSÑ—˜
_Y[˜Ý[Ûˆ
J^Û]V×NÙ›ÜŠ]Ü™YŽ›Ÿ[ÙˆJ[‹›[OOO]˜]
LŠJÝ˜]
LJOÝÝ›[™ÝLWJÏLNœ\Ú
‹›[KJNÜ™]\›ˆX\Þ[˜È[˜Ý[ÛˆÞ
K‹‹J^Û]OV×KÏLÏLÙ›ÜŠ]Ü™YŽ™K]NœŸ[ÙˆŠ^Û]ŽÛÏSX]›X^
Ë
KOO[[ÊSX]›Z[ŠK™Ù[ŠÌKMLÍJKKœ\Ú
Ì—JJNŠSX]›Z[ŠK™Ù[‹MLÍJKKœ\Ú
ÌK—JK
Ï\‹›[™Ý
KÏSX]›X^
ËŠ_\‹œÙ]
[™^
ŠJNÛ]ÏVÌK
ÊK
ÊWNÜ‹œÙ]
ØÊKÞ
KŠNÛ]SX]œÝ[T™XÚ\ÙJÊKO[™]ÈZ[\œ˜^J
˜K›[™Ý
K[™]ÈÛŠJNÙ™XÝ\ŽÛ]LÙ›ÜŠ]ÙK—[ÙˆJYXž
KÖÌK‹JKXž
ÖÌWK‹JKXž
‹ÖÌ—K‹JNØ]ØZ]
K›™]Ô™Y‹KßJKKœ\Ú
Ý\™Y—˜ÔÝš[™Ê
K‰IQSÑ—˜
_Y[˜Ý[ÛˆÞ
KŠ^ÚYŠ\œ˜^Kš\Ð\œ˜^J™š[RYÊI‰™š[RYË›[™ÝŒ
^Û]TÞ
K
NÛ‹œÙ]
QÝ™š[RYÖÌK—J__Y[˜Ý[Ûˆ^
KŠ^Û][™]ÈŠ[
NÜ‹œÙ]
™]˜KœÝ\™YŠNÛ]OYK›™]Ô™YŽÜ™]\›ˆÊœ]
KÙ]N˜JK‹œÙ]
Ú^™XK›[JÌJK‹œÙ]Y“˜[YJ\X™Y˜
JNœ‹œÙ]
Ú^™XK›[JKKœ›ÛÝ™YˆOO[[	‰œ‹œÙ]
›ÛÝKœ›ÛÝ™YŠKKš[™›Ô™YˆOO[[	‰œ‹œÙ]
[™›ØKš[™›Ô™YŠKK™[˜Üž\™YˆOO[[	‰œ‹œÙ]
[˜Üž\K™[˜Üž\™YŠKŸX\Þ[˜È[˜Ý[Ûˆž
KV×J^Û]V×NÙ›ÜŠ]ÚKÙ]N˜_W[ÙˆKš][\Ê
J^ÚYŠOOO[[\[ÙˆOOXÝš[™Ø
^Ü‹œ\Ú
Ü™YŽšK]N˜_JNØÛÛ[Y_X]ØZ]
KK‹
K‹œ\Ú
Ü™YŽšK]N›‹š›Ú[Š
_JK‹›[™ÝL\™]\›ˆ‹œÛÜ

K
OO™Kœ™Y‹›[K]œ™Y‹›[J_X\Þ[˜È[˜Ý[Ûˆ^
ÛÜšYÚ[˜[]N™K™Y’[™›ÎÚ[™Ù\Î›‹™YŽœ[[\Ö˜NšOHLK˜Q]\Ù]Ô™YŽ˜O[[\Ö˜Q]\Ù]Ñ[žN›ÏHLK™YY\X\˜[˜Ù\ÎœËXÜ›Ñ›Ü›T™YŽ˜Ï[[XÜ›Ñ›Ü›N›[[˜Q]NO[[\ÙV™Y”Ý™X[N™HL_J^Ø]ØZ]Þ
Þ™YŽœ‹XÜ›Ñ›Ü›N›XÜ›Ñ›Ü›T™YŽ˜Ë\Ö˜NšK\Ö˜Q]\Ù]Ñ[žN›Ë˜Q]\Ù]Ô™YŽ˜K™YY\X\˜[˜Ù\ÎœËÚ[™Ù\Î›ŸJKI‰•
Þ˜Q]NK˜Q]\Ù]Ô™YŽ˜KÚ[™Ù\Î›‹™YŽœŸJNÛ]P^
‹
KV×KOX]ØZ]ž
‹‹
KYK›[™ÝÏYK˜]
LJNÙÈOOLL	‰™ÈOOLLÉ‰Šœ\Ú
˜
K
ÏLJNÙ›ÜŠ]Ù]N™_[ÙˆJYHOO[[	‰œœ\Ú
JNØ]ØZ]
ÓÞ
K‹
N‘^
K‹
JNÛ]ÏYK›[™Ý
ÓX]œÝ[T™XÚ\ÙJ›X\
OO™K›[™Ý
JK[™]ÈZ[\œ˜^JÊNÝ‹œÙ]
JNÛ]OYK›[™ÝÙ›ÜŠ]HÙˆ
^O^
KKŠNÜ™]\›ˆŸ]˜\ˆžXÛ\ÜÞØÛÛœÝXÝÜŠJ^Ý\Ë—Û\ÙÒ[™\YK\Ë—ØÛÛ[[™Ý[[\Ë—Ù[™\]Y\Ý™XY\[[\Ë—Ü˜[™ÙT™\]Y\Ý™XY\œÏV×_YÙ][™XY\Š
^Ü™]\›ˆJ]\Ë—Ù[™\]Y\Ý™XY\‹•ÛÜšÙ\”Ý™X[K™Ù][™XY\ˆØ[ˆÛ›H™HØ[YÛ˜ÙK˜
K\Ë—Ù[™\]Y\Ý™XY\[™]È
\Ë—Û\ÙÒ[™\ŠK\Ë—Ù[™\]Y\Ý™XY\ŸYÙ]˜[™ÙT™XY\ŠK
^Û][™]Èž
K\Ë—Û\ÙÒ[™\ŠNÜ™]\›ˆ\Ë—Ü˜[™ÙT™\]Y\Ý™XY\œËœ\Ú
ŠKŸXØ[˜Ù[[™\]Y\ÝÊJ^Ý\Ë—Ù[™\]Y\Ý™XY\Ë˜Ø[˜Ù[
JNÙ›ÜŠ]Ùˆ\Ë—Ü˜[™ÙT™\]Y\Ý™XY\œËœÛXÙJ
J]˜Ø[˜Ù[
J__KXÛ\ÜÞØÛÛœÝXÝÜŠJ^Ý\Ë—Û\ÙÒ[™\YK\Ë›Û”›ÙÜ™\ÜÏ[[\Ë—ØÛÛ[[™Ý[[\Ë—Ú\Ô˜[™ÙTÝ\ÜYHLK\Ë—Ú\ÔÝ™X[Z[™ÔÝ\ÜYHLNÛ]]\Ë—Û\ÙÒ[™\‹œÙ[™Ú]Ý™X[JÙ]™XY\˜
NÝ\Ë—Ü™XY\]™Ù]™XY\Š
K\Ë—ÚXY\œÔ™XYO]\Ë—Û\ÙÒ[™\‹œÙ[™Ú]›ÛZ\ÙJ™XY\’XY\œÔ™XYX
K[ŠOOžÝ\Ë—Ú\ÔÝ™X[Z[™ÔÝ\ÜYYKš\ÔÝ™X[Z[™ÔÝ\ÜY\Ë—Ú\Ô˜[™ÙTÝ\ÜYYKš\Ô˜[™ÙTÝ\ÜY\Ë—ØÛÛ[[™ÝYK˜ÛÛ[[™ÝJ_YÙ]XY\œÔ™XYJ
^Ü™]\›ˆ\Ë—ÚXY\œÔ™XY_YÙ]ÛÛ[[™Ý

^Ü™]\›ˆ\Ë—ØÛÛ[[™ÝYÙ]\ÔÝ™X[Z[™ÔÝ\ÜY

^Ü™]\›ˆ\Ë—Ú\ÔÝ™X[Z[™ÔÝ\ÜYYÙ]\Ô˜[™ÙTÝ\ÜY

^Ü™]\›ˆ\Ë—Ú\Ô˜[™ÙTÝ\ÜYX\Þ[˜È™XY

^Û]Ý˜[YN™KÛ™NOX]ØZ]\Ë—Ü™XY\‹œ™XY

NÜ™]\›ˆÞÝ˜[YN›ÚYÛ™NˆLNžÝ˜[YN™K˜Y™™\‹Û™NˆL__XØ[˜Ù[
J^Ý\Ë—Ü™XY\‹˜Ø[˜Ù[
J__KžXÛ\ÜÞØÛÛœÝXÝÜŠKŠ^Ý\Ë—Û\ÙÒ[™\[‹\Ë›Û”›ÙÜ™\ÜÏ[[Û]]\Ë—Û\ÙÒ[™\‹œÙ[™Ú]Ý™X[JÙ]˜[™ÙT™XY\˜Ø™YÚ[Ž™K[™JNÝ\Ë—Ü™XY\\‹™Ù]™XY\Š
_YÙ]\ÔÝ™X[Z[™ÔÝ\ÜY

^Ü™]\›ˆL_X\Þ[˜È™XY

^Û]Ý˜[YN™KÛ™NOX]ØZ]\Ë—Ü™XY\‹œ™XY

NÜ™]\›ˆÞÝ˜[YN›ÚYÛ™NˆLNžÝ˜[YN™K˜Y™™\‹Û™NˆL__XØ[˜Ù[
J^Ý\Ë—Ü™XY\‹˜Ø[˜Ù[
J__K^XÛ\ÜÞØÛÛœÝXÝÜŠJ^Ý\Ë›˜[YOYK\Ë\›Z[˜]YHLK\Ë—ØØ\Xš[]OT›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
_YÙ]š[š\ÚY

^Ü™]\›ˆ\Ë—ØØ\Xš[]Kœ›ÛZ\Ù_Yš[š\Ú

^Ý\Ë—ØØ\Xš[]Kœ™\ÛÛ™J
_]\›Z[˜]J
^Ý\Ë\›Z[˜]YHLY[œÝ\™S›Ý\›Z[˜]Y

^ÚYŠ\Ë\›Z[˜]Y
]›ÝÈ\œ›ÜŠÛÜšÙ\ˆ\ÚÈØ\È\›Z[˜]Y
__KXÛ\ÜÞÜÝ]XÞÝ\[ÙˆÚ[™ÝÏ˜X	‰ˆ\‰‰\[ÙˆÙ[X	‰\[ÙˆÙ[‹œÜÝY\ÜØYÙOOX[˜Ý[Û˜	‰˜Û›Y\ÜØYÙX[ˆÙ[‰‰\Ëš[š]X[^™Qœ›ÛTÜ
Ù[Š_\Ý]XÈÙ]\
K
^Û]HLNÙK›ÛŠ\ÝOžÛŸ
HLKœÙ[™
\Ý[œÝ[˜Ù[ÙˆZ[\œ˜^JJ_JKK›ÛŠÛÛ™šYÝ\™XOOžÑ
K™\˜›ÜÚ]J_JKK›ÛŠÙ]ØÔ™\]Y\ÝOO\Ë˜Ü™X]QØÝ[Y[[™\ŠK
J_\Ý]XÈÜ™X]QØÝ[Y[[™\ŠK
^Û]‹HLKO[[O[™]ÈÙ]ÏSÊ
KÙØÒYœË\U™\œÚ[ÛŽ˜ßOYKXKŒMXÚYŠÈOO[
]›ÝÈ\œ›ÜŠHTH™\œÚ[Ûˆ‰ØßHˆÙ\È›ÝX]ÚHÛÜšÙ\ˆ™\œÚ[Ûˆ‰ÛH‹˜
NÛ]OJK
OO˜H	Ù_Kœ›ÝÝ\WÛÛZ[œÈ[™^XÝY[[Y\˜X›H›Ü\H‰ÝH‹\Èœ™XZÚ[™ÈK™Ëˆ›Ü‹‹‹š[—]\˜][ÛˆÙˆ	Ù_\Ë˜Ù›ÜŠ]H[žßJ]›ÝÈ\œ›ÜŠJØš™XÝJJNÙ›ÜŠ]H[–×J]›ÝÈ\œ›ÜŠJ\œ˜^XJJNÛ]\ÊØÝÛÜšÙ\˜[™]È^
Ë
NÙ[˜Ý[Ûˆ

^ÚYŠŠ]›ÝÈ\œ›ÜŠÛÜšÙ\ˆØ\È\›Z[˜]Y
_Y[˜Ý[ÛˆJJ^ØK˜Y
J_Y[˜Ý[Ûˆ
J^ÙK™š[š\Ú

KK™[]JJ_X\Þ[˜È[˜Ý[ÛˆÊJ^Ø]ØZ]‹™[œÝ\™QØÊÚXÚÒXY\˜
K]ØZ]‹™[œÝ\™QØÊ\œÙTÝ\™Y˜
K]ØZ]‹™[œÝ\™QØÊ\œÙXÙWJK]ØZ]‹™[œÝ\™QØÊÚXÚÑš\œÝYÙXÙWJK]ØZ]‹™[œÝ\™QØÊÚXÚÓ\ÝYÙXÙWJNÛ]X]ØZ]‹™[œÝ\™QØÊ\Ô\™V˜X
NÚYŠ
^Û]O[™]È^
ØY˜T™\ÛÝ\˜Ù\Ø
NÛJJK]ØZ]‹™[œÝ\™QØÊØY˜T™\ÛÝ\˜Ù\ØÙ‹WJK
J_[]Ü‹WOX]ØZ]›ÛZ\ÙK˜[
Û‹™[œÝ\™QØÊ[TYÙ\Ø
K‹™[œÝ\™QØÊš[™Ù\œš[Ø
WJNÜ™]\›žÛ[TYÙ\Îœ‹š[™Ù\œš[ÎšK[›Ü–˜NØ]ØZ]‹™[œÝ\™QØÊ[›Ü–˜X
N›[_X\Þ[˜È[˜Ý[ÛˆÊÙ]N™K\ÜÝÛÜ™\ØX›P]]Ñ™]Ú›‹˜[™ÙPÚ[šÔÚ^™Nœ‹[™Ý˜KØÐ˜\ÙU\››Ë[˜X›V˜N˜Ë]˜[X]Ü“Ü[ÛœÎ›J^Û]O^ÜÛÝ\˜ÙN›[\ØX›P]]Ñ™]Ú›‹ØÐ˜\ÙU\››ËØÒYœË[˜X›V˜N˜Ë]˜[X]Ü“Ü[ÛœÎ›[™\Ž™‹[™Ý˜K\ÜÝÛÜ™˜[™ÙPÚ[šÔÚ^™NœŸNÚYŠJ\™]\›ˆKœÛÝ\˜ÙOYK™]ÈÞ
JNÛ][™]Èž
ŠKOY™Ù][™XY\Š
KT›ÛZ\ÙKÚ]™\ÛÛ™\œÊ
KËÏV×KLÜ™]\›ˆKšXY\œÔ™XYK[Š[˜Ý[ÛŠ
^ÚYŠKš\Ô˜[™ÙTÝ\ÜY
^ÝKœÛÝ\˜ÙOYK›[™Ý[K˜ÛÛ[[™ÝK™\ØX›P]]Ñ™]Ú[Kš\ÔÝ™X[Z[™ÔÝ\ÜYÏ[™]È
JNÙ›ÜŠ]HÙˆÊYËœÙ[™›ÙÜ™\ÜÚ]™Q]JJN×ÏV×Kœ™\ÛÛ™JÊKO[[_JK˜Ø]Ú
[˜Ý[ÛŠJ^Úœ™Z™XÝ
JKO[[JK™]È›ÛZ\ÙJ[˜Ý[ÛŠK
^Û]Y[˜Ý[ÛŠÝ˜[YN™KÛ™NœŸJ^Ýž^ÚYŠ

KŠ^ÚYŠYÊ^Û]OIJÊN×ÏV×KI‰™K›[™ÝOOXI‰J™\ÜY[™Ý\ÈY™™\™[œ›ÛHXÝX[
KKœÛÝ\˜ÙOYKÏ[™]ÈÞ
JKœ™\ÛÛ™JÊ_ZO[[Ü™]\›Ÿ]ŠÏYK˜ž]S[™ÝKš\ÔÝ™X[Z[™ÔÝ\ÜY‹œÙ[™
ØÔ›ÙÜ™\ÜØÛØYY‹Ý[“X]›X^
‹K˜ÛÛ[[™Ý
_JKÏÙËœÙ[™›ÙÜ™\ÜÚ]™Q]JJN—Ëœ\Ú
JKKœ™XY

K[Š‹
_XØ]Ú
J^Ý
J__NÛKœ™XY

K[Š‹
_JK˜Ø]Ú
[˜Ý[ÛŠJ^Úœ™Z™XÝ
JKO[[JKOYOOžÙ˜Ø[˜Ù[[™\]Y\ÝÊJ_Kœ›ÛZ\Ù_Y[˜Ý[ÛˆŠJ^Ù[˜Ý[Ûˆ
J^Ü

K‹œÙ[™
Ù]ØØÜ’[™›Î™_J_Y[˜Ý[ÛˆJJ^ÚYŠ

KH[œÝ[˜Ù[ÙˆJ^Û][™]È^
\ÜÝÛÜ™^Ù\[ÛŽˆ™\ÜÛœÙH	ÙK˜ÛÙ_X
NÛJ
K‹œÙ[™Ú]›ÛZ\ÙJ\ÜÝÛÜ™™\]Y\ÝJK[Š[˜Ý[ÛŠÜ\ÜÝÛÜ™™_J^Ú

K‹\]T\ÜÝÛÜ™
JKJ
_JK˜Ø]Ú
[˜Ý[ÛŠ
^Ú

K‹œÙ[™
ØÑ^Ù\[Û˜J_J_Y[ÙH‹œÙ[™
ØÑ^Ù\[Û˜
JJ_Y[˜Ý[ÛˆJ
^Ü

KÊLJK[Š[˜Ý[ÛŠJ^ÚYŠ

KJH[œÝ[˜Ù[ÙˆYJJ^ÚJJNÜ™]\›Ÿ[‹œ™\]Y\ÝØYYÝ™X[J
K[Š[˜Ý[ÛŠ
^Ü

KÊL
K[ŠJ_J_J_\

KÊJK[Š[˜Ý[ÛŠJ^ÚYŠŠ]›ÝÈK\›Z[˜]J™]ÈYJÛÜšÙ\ˆØ\È\›Z[˜]Y˜
JK\œ›ÜŠÛÜšÙ\ˆØ\È\›Z[˜]Y
NÛYK‹œ™\]Y\ÝØYYÝ™X[JL
K[ŠOOžÙ‹œÙ[™
]SØYYÛ[™Ý™K˜ž]\Ë˜ž]S[™ÝJ_J_JK[ŠKJ_\™]\›ˆ‹›ÛŠÙ]YÙX[˜Ý[ÛŠJ^Ü™]\›ˆ‹™Ù]YÙJKœYÙR[™^
K[Š[˜Ý[ÛŠJ^Ü™]\›ˆ›ÛZ\ÙK˜[
Û‹™[œÝ\™JK›Ý]X
K‹™[œÝ\™JK™Y˜
K‹™[œÝ\™JK\Ù\•[š]
K‹™[œÝ\™JKšY]Ø
WJK[Š[˜Ý[ÛŠÙK‹—J^Ü™]\›žÜ›Ý]N™K™YŽ™Y”ÝŽËÔÝš[™Ê
OÏÛ[\Ù\•[š]›‹šY]ÎœŸ_J_J_JK‹›ÛŠÙ]YÙR[™^[˜Ý[ÛŠJ^Û]^‹™Ù]
K›[KK™Ù[ŠNÜ™]\›ˆ‹™[œÝ\™PØ][ÙÊÙ]YÙR[™^ÝJ_JK‹›ÛŠÙ]\Ý[˜][ÛœØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊ\Ý[˜][ÛœØ
_JK‹›ÛŠÙ]\Ý[˜][Û˜[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊÙ]\Ý[˜][Û˜ÙKšYJ_JK‹›ÛŠÙ]YÙSX™[Ø[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊYÙSX™[Ø
_JK‹›ÛŠÙ]YÙS^[Ý][˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊYÙS^[Ý]
_JK‹›ÛŠÙ]YÙS[ÙX[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊYÙS[ÙX
_JK‹›ÛŠÙ]šY]Ù\”™Y™\™[˜Ù\Ø[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊšY]Ù\”™Y™\™[˜Ù\Ø
_JK‹›ÛŠÙ]Ü[XÝ[Û˜[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊÜ[XÝ[Û˜
_JK‹›ÛŠÙ]]XÚY[Ø[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊ]XÚY[Ø
_JK‹›ÛŠÙ]ØÒ”ÐXÝ[ÛœØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊœÐXÝ[ÛœØ
_JK‹›ÛŠÙ]YÙR”ÐXÝ[ÛœØ[˜Ý[ÛŠÜYÙR[™^™_J^Ü™]\›ˆ‹™Ù]YÙJJK[ŠOO›‹™[œÝ\™JKœÐXÝ[ÛœØ
J_JK‹›ÛŠÙ][››Ý][ÛœÐžU\X\Þ[˜È[˜Ý[ÛŠÝ\\Î™KYÙR[™^\ÕÔÚÚ\J^Û]Ü‹WOX]ØZ]›ÛZ\ÙK˜[
Û‹™[œÝ\™QØÊ[TYÙ\Ø
K‹™[œÝ\™QØÊ[››Ý][Û‘ÛØ˜[Ø
WJNÚYŠZJ\™]\›ˆ[Û]OV×KÏV×KÏ[[Ýž^Ù›ÜŠ]ÏL\ŽØÏØÊÊÊ]Ëš\ÊÊ_
ß
Ï[™]È^
Ù][››Ý][ÛœÐžU\X
KJÊJKKœ\Ú
‹™Ù]YÙJÊK[Š\Þ[˜ÈO	‰˜ÛÛXÝ[››Ý][ÛœÐžU\J‹ËKËJ_×JJJNÜ™]\›ˆ]ØZ]›ÛZ\ÙK˜[
JK
]ØZ]›ÛZ\ÙK˜[
ÊJK™š[\ŠOOˆHYJ_Yš[˜[^ÜÉ‰š
Ê__JK‹›ÛŠÙ]Ý][™X[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊØÝ[Y[Ý][™X
_JK‹›ÛŠÙ]Ü[Û˜[ÛÛ[ÛÛ™šYØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊÜ[Û˜[ÛÛ[ÛÛ™šYØ
_JK‹›ÛŠÙ]\›Z\ÜÚ[ÛœØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊ\›Z\ÜÚ[ÛœØ
_JK‹›ÛŠÙ]Y]Y]X[˜Ý[ÛŠJ^Ü™]\›ˆ›ÛZ\ÙK˜[
Û‹™[œÝ\™QØÊØÝ[Y[[™›Ø
K‹™[œÝ\™PØ][ÙÊY]Y]X
WJ_JK‹›ÛŠÙ]X\šÒ[™›Ø[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™PØ][ÙÊX\šÒ[™›Ø
_JK‹›ÛŠÙ]]X[˜Ý[ÛŠJ^Ü™]\›ˆ‹œ™\]Y\ÝØYYÝ™X[J
K[ŠOO™K˜ž]\Ê_JK‹›ÛŠÙ][››Ý][ÛœØ[˜Ý[ÛŠÜYÙR[™^™K[[J^Ü™]\›ˆ‹™Ù]YÙJJK[Š[˜Ý[ÛŠŠ^Û][™]È^
Ù][››Ý][ÛœÎˆYÙH	Ù_X
NÜ™]\›ˆJŠK‹™Ù][››Ý][ÛœÑ]J‹‹
K[ŠOOŠ
ŠKJKOOžÝ›ÝÈ
ŠK_J_J_JK‹›ÛŠÙ]šY[Øš™XÝØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™QØÊšY[Øš™XÝØ
K[ŠOO™OË˜[šY[ß[
_JK‹›ÛŠ\Ò”ÐXÝ[ÛœØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™QØÊ\Ò”ÐXÝ[ÛœØ
_JK‹›ÛŠÙ]Ø[Ý[][Û“Ü™\’YØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™[œÝ\™QØÊØ[Ý[][Û“Ü™\’YØ
_JK‹›ÛŠØ]™QØÝ[Y[\Þ[˜È[˜Ý[ÛŠÚ\Ô\™V˜N™K[TYÙ\Î[››Ý][Û”ÝÜ˜YÙNœ‹š[[˜[YNš_J^Û]OVÛ‹œ™\]Y\ÝØYYÝ™X[J
K‹™[œÝ\™PØ][ÙÊXÜ›Ñ›Ü›X
K‹™[œÝ\™PØ][ÙÊXÜ›Ñ›Ü›T™Y˜
K‹™[œÝ\™QØÊÝ\™Y˜
K‹™[œÝ\™QØÊ™Y˜
K‹™[œÝ\™QØÊ[™X\š^˜][Û˜
K‹™[œÝ\™PØ][ÙÊÝXÝ™YT›ÛÝ
WKÏ[™]ÈKÏV×KÏYOÛ[“Ý
ŠKÛKËË—OX]ØZ]›ÛZ\ÙK˜[
JKOYË˜Z[\‹™Ù]˜]Ê›ÛÝ
_[ŽÚYŠÊ^ÝØ]ØZ]‹˜Ø[•\]TÝXÝ™YJÜ“X[˜YÙ\Ž›‹™]Ð[››Ý][ÛœÐžTYÙN˜ßJI‰Š]ŠN˜]ØZ]]K˜Ø[Ü™X]TÝXÝ\™U™YJØØ][ÙÔ™YŽžK“X[˜YÙ\Ž›‹™]Ð[››Ý][ÛœÐžTYÙN˜ßJI‰Š[[
NÛ]OPžK™Ù[™\˜]R[XYÙ\Ê‹˜[Y\Ê
KË‹™]˜[X]Ü“Ü[ÛœËš\ÓÙ™œØÜ™Y[Ø[˜\ÔÝ\ÜY
KXOO]›ÚYÜÎ–×NÙ›ÜŠ]Ü‹W[ÙˆÊ]œ\Ú
‹™Ù]YÙJŠK[ŠOžÛ][™]È^
Ø]™H
Y]ÜŠNˆYÙH	ÜŸX
NÜ™]\›ˆJŠKœØ]™S™]Ð[››Ý][ÛœÊ‹‹KKÊK™š[˜[J[˜Ý[ÛŠ
^Ú
Š_J_JJNØOO[[ÜËœ\Ú
›ÛZ\ÙK˜[

K[Š\Þ[˜Ê
OOžØ]ØZ]]K˜Ü™X]TÝXÝ\™U™YJÛ™]Ð[››Ý][ÛœÐžTYÙN˜Ë™YŽ™ËØ][ÙÔ™YŽžK“X[˜YÙ\Ž›‹Ú[™Ù\Î›ßJ_JJN˜‰‰œËœ\Ú
›ÛZ\ÙK˜[

K[Š\Þ[˜Ê
OOžØ]ØZ]‹\]TÝXÝ\™U™YJÛ™]Ð[››Ý][ÛœÐžTYÙN˜Ë“X[˜YÙ\Ž›‹Ú[™Ù\Î›ßJ_JJ_ZYŠJ\Ëœ\Ú
‹™[œÝ\™QØÊÙ\šX[^™V˜Q]XÜ—JJNÙ[ÙH›ÜŠ]OLÙOÙJÊÊ\Ëœ\Ú
‹™Ù]YÙJJK[Š[˜Ý[ÛŠ
^Û][™]È^
Ø]™NˆYÙH	Ù_X
NÜ™]\›ˆJŠKœØ]™J‹‹‹ÊK™š[˜[J[˜Ý[ÛŠ
^Ú
Š_J_JJNÛ]X]ØZ]›ÛZ\ÙK˜[
ÊKÏ[[ÚYŠJ^ÚYŠÏ^ÌKTÊ\™]\›ˆ˜ž]\ßY[ÙHYŠËœÚ^™OOOL
\™]\›ˆ˜ž]\ÎÛ]ÏY	‰H[œÝ[˜Ù[Ùˆ‰‰›Ë˜[Y\Ê
KœÛÛYJOO™K›™YY\X\˜[˜Ù\ÊKÏ]H[œÝ[˜Ù[Ùˆ‰‰K™Ù]
X
_[[[OHLNÚYŠ\œ˜^Kš\Ð\œ˜^JÊJ^Ù›ÜŠ]OL]Ë›[™ÝÙOÙJÏLŠ]ÖÙWOOOX]\Ù]Ø	‰Š]ÖÙJÌWKOHL
NÕOO[[	‰ŠYË™Ù]™]Õ[\Ü˜\žT™YŠ
J_Y[ÙHÉ‰J[œÝ\ÜYH\K˜
NÛ]SØš™XÝ˜Ü™X]J[
NÚYŠË˜Z[\Š^Û]O[™]ÈX\YË˜Z[\‹™Ù]
[™›Ø
_[ÚYŠ[œÝ[˜Ù[ÙˆŠY›ÜŠ]Û‹—[Ùˆ
]\[ÙˆOXÝš[™Ø	‰™KœÙ]
‹ÙJŠJNÑ^Ü›ÛÝ™YŽžK[˜Üž\™YŽ™Ë˜Z[\‹™Ù]˜]Ê[˜Üž\
_[™]Ô™YŽ™Ë™Ù]™]Õ[\Ü˜\žT™YŠ
K[™›Ô™YŽ™Ë˜Z[\‹™Ù]˜]Ê[™›Ø
_[[™›ÓX\™Kš[RYÎ™Ë˜Z[\‹™Ù]
Q
_[Ý\™YŽ—ÏÜ™Ë›\Ý™Y”Ý™X[TÜÏÏÜš[[˜[YNš__\™]\›ˆ^
ÛÜšYÚ[˜[]N›˜ž]\Ë™Y’[™›Î‘Ú[™Ù\Î›Ë™YŽ™Ë\Ö˜NˆH]Ë˜Q]\Ù]Ô™YŽ•\Ö˜Q]\Ù]Ñ[žN‘K™YY\X\˜[˜Ù\ÎËXÜ›Ñ›Ü›T™YŽ™XÜ›Ñ›Ü›NK˜Q]N”Ë\ÙV™Y”Ý™X[N™JËÜXÝ™Y˜
_JK™š[˜[J

OOžÙËœ™\Ù]™]Õ[\Ü˜\žT™YŠ
_J_JK‹›ÛŠÙ]Ü\˜]Ü“\Ý[˜Ý[ÛŠK
^Û]YKœYÙR[™^Û‹™Ù]YÙJŠK[Š[˜Ý[ÛŠŠ^Û]O[™]È^
Ù]Ü\˜]Ü“\ÝˆYÙH	ÜŸX
NÛJJNÛ]O[ÏTË’S‘“ÔÏÑ]K››ÝÊ
NŒÛ‹™Ù]Ü\˜]Ü“\Ý
Ú[™\Ž™‹Ú[šÎ\ÚÎšK[[™Kš[[ØXÚRÙ^N™K˜ØXÚRÙ^K[››Ý][Û”ÝÜ˜YÙN™K˜[››Ý][Û”ÝÜ˜YÙK[ÙYšYYYÎ™K›[ÙYšYYYßJK[Š[˜Ý[ÛŠJ^Ú
JKI‰šÊYÙOIÜŠÌ_HHÙ]Ü\˜]Ü“\Ýˆ[YOIÑ]K››ÝÊ
KX_[\Ë[IÙK›[™ÝX
K˜ÛÜÙJ
_K[˜Ý[ÛŠJ^Ú
JKZK\›Z[˜]Y	‰™\œ›ÜŠJ_J_J_JK‹›ÛŠÙ]^ÛÛ[[˜Ý[ÛŠK
^Û]ÜYÙR[™^œ‹[˜ÛYSX\šÙYÛÛ[šK\ØX›S›Ü›X[^˜][ÛŽ˜_OYNÛ‹™Ù]YÙJŠK[Š[˜Ý[ÛŠJ^Û][™]È^
Ù]^ÛÛ[ˆYÙH
ÜŠNÛJŠNÛ]Ï[ÏTË’S‘“ÔÏÑ]K››ÝÊ
NŒÙK™^˜XÝ^ÛÛ[
Ú[™\Ž™‹\ÚÎ›‹Ú[šÎ[˜ÛYSX\šÙYÛÛ[šK\ØX›S›Ü›X[^˜][ÛŽ˜_JK[Š[˜Ý[ÛŠ
^Ú
ŠKÉ‰šÊYÙOIÜŠÌ_HHÙ]^ÛÛ[ˆ[YOIÑ]K››ÝÊ
K\ß[\Ø
K˜ÛÜÙJ
_K[˜Ý[ÛŠJ^Ú
ŠK[‹\›Z[˜]Y	‰™\œ›ÜŠJ_J_J_JK‹›ÛŠÙ]ÝXÝ™YX[˜Ý[ÛŠJ^Ü™]\›ˆ‹™Ù]YÙJKœYÙR[™^
K[ŠOO›‹™[œÝ\™JKÙ]ÝXÝ™YX
J_JK‹›ÛŠ›Û˜[˜XÚØ[˜Ý[ÛŠJ^Ü™]\›ˆ‹™›Û˜[˜XÚÊKšYŠ_JK‹›ÛŠÛX[\[˜Ý[ÛŠJ^Ü™]\›ˆ‹˜ÛX[\
L
_JK‹›ÛŠ\›Z[˜]X[˜Ý[ÛŠJ^ÜHLÛ]V×NÚYŠŠ^Û‹\›Z[˜]J™]ÈYJÛÜšÙ\ˆØ\È\›Z[˜]Y˜
JNÛ]O[‹˜ÛX[\

NÝœ\Ú
JK[[Y[ÙHJ
NÚOËŠ™]ÈYJÛÜšÙ\ˆØ\È\›Z[˜]Y˜
JNÙ›ÜŠ]HÙˆJ]œ\Ú
K™š[š\ÚY
KK\›Z[˜]J
NÜ™]\›ˆ›ÛZ\ÙK˜[

K[Š[˜Ý[ÛŠ
^Ù‹™\Ý›ÞJ
K[[J_JK‹›ÛŠ™XYX[˜Ý[ÛŠ
^ÝŠJKO[[JK\Ý]XÈ[š]X[^™Qœ›ÛTÜ
J^Û][™]È^
ÛÜšÙ\˜XZ[˜JNÝ\ËœÙ]\
JKœÙ[™
™XYX[
__NÙÛØ˜[\ËœšœÕÛÜšÙ\^ÕÛÜšÙ\“Y\ÜØYÙR[™\Ž“_JJ
NÉË]\[ÙˆÙ[X	‰œÙ[‹›Ø‰‰›™]È›ØŠØ
Ù[‹•T“Ù[‹ÙXšÚ]T“
Kœ™]›ÚÙSØš™XÝT“
Ù[‹›ØØ][Û‹š™YŠNØ›KÝ\N˜^Ú˜]˜\ØÜš\ØÚ\œÙ]]]‹NJNÙ[˜Ý[ÛˆÛ
J^Û]Ýž^ÚYŠ^	‰ŠÙ[‹•T“Ù[‹ÙXšÚ]T“
K˜Ü™X]SØš™XÝT“

K]
]›ÝØÛ][™]ÈÛÜšÙ\ŠÛ˜[YN™OË›˜[Y_JNÜ™]\›ˆ‹˜Y]™[\Ý[™\Š\œ›Ü˜

OOžÊÙ[‹•T“Ù[‹ÙXšÚ]T“
Kœ™]›ÚÙSØš™XÝT“

_JKŸXØ]ÚÜ™]\›ˆ™]ÈÛÜšÙ\Š]N^Ú˜]˜\ØÜš\ØÚ\œÙ]]]‹N
Ù[˜ÛÙUT’PÛÛ\Û™[
›
KÛ˜[YN™OË›˜[Y_J__]˜\ˆÛX[Ù[\™[ØYÛY[˜Ý[ÛŠJ^Ü™]\›˜Ø
Ù_K^ßK[Y[˜Ý[ÛŠKŠ^Û]T›ÛZ\ÙKœ™\ÛÛ™J
NÚYŠ	‰›[™ÝŒ
^Û]OYØÝ[Y[™Ù][[Y[ÐžUYÓ˜[YJ[šØ
KOYØÝ[Y[œ]Y\žTÙ[XÝÜŠY]VÜ›Ü\OXÜÜ[›Û˜ÙWX
KOZOË››Û˜Ù_OË™Ù]]šX]J›Û˜ÙX
NÙ[˜Ý[ÛˆÊJ^Ü™]\›ˆ›ÛZ\ÙK˜[
K›X\
OO”›ÛZ\ÙKœ™\ÛÛ™JJK[ŠOOŠÜÝ]\Î˜[š[Y˜[YN™_JKOOŠÜÝ]\Î˜™Z™XÝY™X\ÛÛŽ™_JJJJ_\[Ê›X\
OžÚYŠ]Û
ŠK[ˆ
\™]\›ŽÕÝOHLÛ]]™[™ÕÚ]
˜ÜÜØ
KO\ØÜ™[HœÝ[\ÚY]—X˜ÚYŠŠY›ÜŠ]YK›[™ÝLNÛLÛ‹KJ^Û]OYVÛ—NÚYŠKš™YOO]	‰Š\ŸKœ™[OOXÝ[\ÚY]
J\™]\›ŸY[ÙHYŠØÝ[Y[œ]Y\žTÙ[XÝÜŠ[šÖÚ™YH‰ÝH—IÚ_X
J\™]\›ŽÛ]ÏYØÝ[Y[˜Ü™X]Q[[Y[
[šØ
NÚYŠËœ™[\ØÝ[\ÚY]ÛŸ
Ë˜\ÏXØÜš\
KË˜Ü›ÜÜÓÜšYÚ[XËš™Y]I‰›ËœÙ]]šX]J›Û˜ÙXJKØÝ[Y[šXY˜\[™Ú[
ÊKŠ\™]\›ˆ™]È›ÛZ\ÙJ
KŠOOžÛË˜Y]™[\Ý[™\ŠØYJKË˜Y]™[\Ý[™\Š\œ›Ü˜

OO›Š\œ›ÜŠ[˜X›HÈ™[ØYÔÔÈ›Üˆ	ÝX
JJ_J_JJ_Y[˜Ý[ÛˆJJ^Û][™]È]™[
š]Nœ™[ØY\œ›Ü˜ØØ[˜Ù[X›NˆLJNÚYŠœ^[ØYYKÚ[™ÝË™\Ü]Ú]™[

K]™Y˜][™]™[Y
]›ÝÈ_\™]\›ˆ‹[ŠOžÙ›ÜŠ]HÙˆ×JYKœÝ]\ÏOOX™Z™XÝY	‰šJKœ™X\ÛÛŠNÜ™]\›ˆJ
K˜Ø]Ú
J_J_KVÖØÝ[[X\žX×Š\™š[™\Ý[Y[ŸØš™]]›ß›Ùš[_Ý[[X\ž_Øš™XÝ]™JKÚWKØ^\šY[˜ÙX×Š^\šY[˜ÚX_\ÝÜšX[X›Ü˜[^\šY[˜Ù_[\Þ[Y[ÛÜšÈ\ÝÜžJKÚWKØÛÜ™TÚÚ[Ø×ŠÛÛ\][˜ÚX\ßXš[YY\Èš[˜Ú\[\ßÛÜ™HÚÚ[ßÙ^HÚÚ[ÊKÚWKØÛÛØ×Š\œ˜[ZY[\ßXÛ›ÛÙÖÚpëWX\ßXÚšXØ[ÚÚ[ßÛÛßXÚ›ÛÙÞJKÚWKØ›Ú™XÝØ×Š›ÞYXÝÜß›Ú™XÝÊKÚWKØÙ\YšXØ][ÛœØ×ŠÙ\YšXØXÚ[Û™\ßÝ\œÛÜßÙ\YšXØ][ÛœßÛÝ\œÙ\ß˜Z[š[™ÊKÚWKØYXØ][Û˜×ŠYXØXÚVÛðì×[Ÿ›Ü›XXÚVÛðì×[ˆXØYÙpêW[ZXØ_YXØ][ÛŸXØY[ZXÊKÚWKØ[™ÝXYÙ\Ø×ŠY[ÛX\ß[™ÝXYÙ\ÊKÚWWNÙ[˜Ý[ÛˆÛ
J^Û][™]ÈÓT\œÙ\Š
Kœ\œÙQœ›ÛTÝš[™ÊK\XØ][Û‹Þ[
NÜ™]\›ˆœ]Y\žTÙ[XÝÜ[
^X‹X˜
K™›Ü‘XXÚ
OO™Kœ™\XÙUÚ]
X
JKœ]Y\žTÙ[XÝÜ[
^›[™KXœ™XZË[™KXœ™XZØ
K™›Ü‘XXÚ
OO™Kœ™\XÙUÚ]
˜
JK\œ˜^K™œ›ÛJœ]Y\žTÙ[XÝÜ[
^œ^š
JK›X\
OO™K^ÛÛ[Ëš[J
_
K™š[\Š›ÛÛX[ŠKš›Ú[Š˜
_Y[˜Ý[ÛˆÛ
J^Ü™]\›ˆKœ™\XÙJ×‹ÙË
Kœ™\XÙJÖÈJ×‹ÙË˜
Kœ™\XÙJ×žÌËKÙË‚˜
Kš[J
_X\Þ[˜È[˜Ý[Ûˆ[
J^Û]YK›˜[YKÓÝÙ\Ø\ÙJ
KœÜ]
˜
KœÜ

_ÚYŠOOX˜
^Û]X]ØZ][


OOš[\Ü
‹Ü‹PØ^–RÌMKšœØ
K×JNÝ‘ÛØ˜[ÛÜšÙ\“Ü[ÛœËÛÜšÙ\”Ü[™]ÈÛÛ]X]ØZ]™Ù]ØÝ[Y[
Ù]N›™]ÈZ[\œ˜^J]ØZ]K˜\œ˜^PY™™\Š
J_JKœ›ÛZ\ÙKV×NÙ›ÜŠ]OLNÙO[‹›[TYÙ\ÎÙJÏLJ^Û]X]ØZ]
]ØZ]‹™Ù]YÙJJJK™Ù]^ÛÛ[

NÜ‹œ\Ú
š][\Ë›X\
OO˜Ý˜[ˆOÙKœÝŽ˜
Kš›Ú[Š
J_\™]\›ˆÛ
‹š›Ú[Š‚˜
J_ZYŠOOXØÞ
\™]\›ˆÛ

]ØZ][™^˜XÝ˜]Õ^
Ø\œ˜^PY™™\Ž˜]ØZ]K˜\œ˜^PY™™\Š
_JJK˜[YJNÚYŠØÙÙØKš[˜ÛY\Ê
J^Û]X]ØZ]
]ØZ]›™Y˜][›ØY\Þ[˜Ê]ØZ]K˜\œ˜^PY™™\Š
JJK™š[JÛÛ[ž[
OË˜\Þ[˜ÊÝš[™Ø
NÚYŠ]
]›ÝÈ\œ›ÜŠ[\˜Ú]›ÈÜ[‘ØÝ[Y[›ÈÛÛY[™HÛÛ[ž[˜
NÜ™]\›ˆÛ
Û

J_ZYŠØYÜÝ˜˜Kš[˜ÛY\Ê
J\™]\›ˆÛ
]ØZ]K^

JNÝ›ÝÈ\œ›ÜŠ›Ü›X]È›ÈÛÛ\]X›Kˆ\ØH‹ÐÖÑÑËQÔÕˆÈ•‹˜
_Y[˜Ý[Ûˆ›
K
^Û]X	Ù_H	ÝœÛXÙJL
_Xš[J
NÜ™]\›ˆ™š[™

ËWJOO™K\Ý
ŠJOË–Ì_Ý\ÝÛXY[˜Ý[Ûˆ[
J^Ü™]\›ˆÛ
JKœÜ]
×—Ê—‹ÊK›X\
OO™Kš[J
JK™š[\Š›ÛÛX[ŠK›X\

K
OOžÛ]YKœÜ]
˜
K›X\
OO™Kš[J
JK™š[\Š›ÛÛX[ŠK[–Ì_O[‹›[™ÝŒI‰Š‹›[™ÝMM_Î‰Ë\Ý
ŠJKOZOÜ‹œ™\XÙJÎ‰Ë
N˜›Ü]YH	Ý
Ì_XÏZOÛ‹œÛXÙJJKš›Ú[Š˜
N›‹š›Ú[Š˜
KÏZ›
KÊNÜ™]\›žÚY˜[\ÜIÝKIØ_XXY[™Î˜K^›Ë\™Ù]œËÝ\ÝÛU]NœÏOOXÝ\ÝÛXØN›ÚY_J_]˜\ˆ›VÖØÝ[[X\žX\™š[›Ù™\Ú[Û˜[›Ù™\ÜÚ[Û˜[Ý[[X\žXKØ^\šY[˜ÙX^\šY[˜ÚXX^\šY[˜ÙXKØÛÜ™TÚÚ[ØÛÛ\][˜ÚX\ØÛÜ™HÚÚ[ØKØÛÛØ\œ˜[ZY[\ÈHXÛ›ÛÙðëX\ØÛÛÈ	ˆXÚ›ÛÙÚY\ØKØ›Ú™XÝØ›ÞYXÝÜØ›Ú™XÝØKØÙ\YšXØ][ÛœØÙ\YšXØXÚ[Û™\ØÙ\YšXØ][ÛœØKØYXØ][Û˜YXØXÚpìÛ˜YXØ][Û˜KØ[™ÝXYÙ\ØY[ÛX\Ø[™ÝXYÙ\ØKØÝ\ÝÛXY]˜HÙXØÚpìÛ˜™]ÈÙXÝ[Û˜KØÚÚ\›È[œÙ\\˜È›Ý[œÙ\WNÙ[˜Ý[Ûˆ
Û[™Î™KÛ’[œÙ\ÛÛÜÙN›ŸJ^Û]Ü‹WOJ\ÙTÝ]JJ×JKØK×OJ\ÙTÝ]JJ
KÜË×OJ\ÙTÝ]JJLJKÛWOJ\ÙTÝ]JJ
KYOOOX\ØJK
OOšJO›‹›X\
O›‹šYOOYOÞË‹‹›‹‹‹N›ŠJKX\Þ[˜ÈOOžÛ]YK\™Ù]™š[\ÏË–ÌNÚYŠ
^ØÊL
KJ
KÊ›˜[YJNÝž^Û]OS[
]ØZ][

JNÚYŠYK›[™Ý
]›ÝÈ\œ›ÜŠØ›ÈÙH]XÝ0ìÈ^Ëˆ[ˆÙ°ëXHÙ\ˆ[˜H[XYÙ[ˆ\ØØ[™XYK˜˜›È^Ø\È]XÝYˆHˆX^H™HHØØ[›™Y[XYÙK˜
NÚJJ_XØ]Ú
J^ÚJ×JKJK›Y\ÜØYÙJ_Yš[˜[^ØÊLJKK\™Ù]˜[YOX__KO\‹™š[\ŠOO™K\™Ù]OOXÚÚ\	‰™K^š[J
JNÜ™]\›ŠËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜[\ÜÝ™\›^X›ÛN˜™\Ù[][Û˜Û“[Ý\ÙQÝÛŽ™OOžÙK\™Ù]OOYK˜Ý\œ™[\™Ù]	‰›Š
_KÚ[™[ŽŠËšœÞÊJÙXÝ[Û˜ØÛ\ÜÓ˜[YN˜[\Ü[™[›ÛN˜X[ÙØ˜\šXK[[Ù[Ž˜YX˜\šXK[X™[YžHŽ˜[\Ü]]XÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Xœ˜\žRXYÚ[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
JÜ[˜ØÛ\ÜÓ˜[YN˜^YXœ›ÝØÚ[™[Ž˜ÓÑPÐQ‘HSTÔ•JK
ËšœÞ
J˜ÚY˜[\Ü]]XÚ[™[Ž™Ø[\Ü\ˆÛÛ[šYÈH[ˆÕ˜˜[\Ü°ê\Ý[pêHÛÛ[JK
ËšœÞ
JØÚ[™[Ž™Ø™]š\ØH0ìÛ™HÙH[œÙ\\°èHØYH^È[\ÈH[ÙYšXØ\ˆ[ÕˆXšY\Ë˜˜™]šY]ÈÚ\™H]™\žH^›ØÚÈÚ[ÛÈ™Y›Ü™HHÜ[ˆ°ê\Ý[pêHÚ[™Ù\Ë˜JW_JK
ËšœÞ
J]Û˜ÛÛÛXÚÎ›‹˜\šXK[X™[Ž™ØÙ\œ˜\˜˜ÛÜÙXÚ[™[Ž˜0åØJW_JK\‹›[™Ý	‰ŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜[\ÜÝ\Ú[™[Ž–ÊËšœÞÊJX™[ØÛ\ÜÓ˜[YN˜š[X\žXÚ[™[Ž–ÜÏÙØ^Y[™ø )˜˜™XY[™ø )˜™ØÙ[XØÚ[Û˜\ˆØÝ[Y[Ø˜ÚÛÜÙHØÝ[Y[
ËšœÞ
J[œ]Ý\N˜š[X\ØX›YœËXØÙ\˜œ‹™ØÞ›Ù›ÙË›Y˜ÜÝ‹œ˜ÛÚ[™ÙNœJW_JK
ËšœÞ
JÛX[ØÚ[™[Ž™Ø‹ÛÜ™
™ØÞ
KÑÑÈH›Ü›X]ÜÈH^Ø˜‹ÛÜ™
™ØÞ
KÑÑË[™^›Ü›X]ØJK	‰ŠËšœÞ
JØÛ\ÜÓ˜[YN˜[\Ü\œ›Ü˜Ú[™[Ž›JW_JK‹›[™ÝŒ	‰ŠËšœÞÊJË‘œ˜YÛY[ØÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜[\Üš[XÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž˜_JK
ËšœÞÊJÜ[˜ØÚ[™[Ž–Ü‹›[™ÝØ›Ü]Y\È]XÝYÜØ˜]XÝY›ØÚÜØ_JW_JK
ËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜[\Ü›ØÚÜØÚ[™[Žœ‹›X\

K
OOŠËšœÞÊJ\XÛXØÛ\ÜÓ˜[YN˜[\Ü›ØÚØÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜[\Ü›ØÚÒXYÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–Ý
ÌKˆKšXY[™×_JK
ËšœÞÊJX™[ØÚ[™[Ž–ÙØ[œÙ\\ˆ[˜˜[œÙ\[Ø
ËšœÞ
JÙ[XÝÝ˜[YN™K\™Ù]ÛÚ[™ÙNO™ŠKšYÝ\™Ù]\™Ù]˜[Y_JKÚ[™[Ž“››X\

ÙK—JOOŠËšœÞ
JÜ[Û˜Ý˜[YN™KÚ[™[Ž™Ý›ŸKJJ_JW_JW_JKK\™Ù]OOXÝ\ÝÛX	‰ŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN˜[œ]šY[˜\šXK[X™[Ž™Ø0ë][ÈHHY]˜HÙXØÚpìÛ˜˜™]ÈÙXÝ[Ûˆ]X˜[YN™K˜Ý\ÝÛU]_ÛÚ[™ÙNO™ŠKšYØÝ\ÝÛU]N\™Ù]˜[Y_J_JK
ËšœÞ
J^\™XXØÛ\ÜÓ˜[YN˜[œ]šY[›ÝÜÎ“X]›Z[ŠX]›X^
ËK^œÜ]
˜
K›[™Ý
ÌJJK˜[YN™K^ÛÚ[™ÙNO™ŠKšYÝ^\™Ù]˜[Y_J_JW_KKšY
J_JK
ËšœÞÊJ›ÛÝ\˜ØÛ\ÜÓ˜[YN˜[\Ü›ÛÝ\˜Ú[™[Ž–ÊËšœÞ
J]Û˜ÛÛÛXÚÎŠ
OOšJ×JKÚ[™[Ž™Ø[YÚ\ˆÝ›È\˜Ú]›Ø˜ÚÛÜÙH[›Ý\ˆš[XJK
ËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
J]Û˜ÛÛÛXÚÎ›‹Ú[™[Ž™ØØ[˜Ù[\˜˜Ø[˜Ù[JK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜š[X\žX\ØX›Yˆ[K›[™ÝÛÛXÚÎŠ
OO
JKÚ[™[Ž™Ø[œÙ\\ˆÙ[XØÚ[Û˜YÜÈ
	ÛK›[™ÝJX˜[œÙ\Ù[XÝY
	ÛK›[™ÝJXJW_JW_JW_JW_J_J_]˜\ˆ›^Û˜[YN˜ÛÙXØY™KXÝ‹\ÝY[Ø™\œÚ[ÛŽ˜KXš]˜]NˆL\N˜[Ù[XØÜš\ÎžÙ]Ž˜š]XZ[˜ØÈK[›Ñ[Z]	‰ˆš]HZ[K\[™[˜ÚY\ÎžÈš]ZœËÜYÚ[‹\™XXÝŽ˜‹ŒŒ˜œÞš\˜ŒËŒLŒXX[[[Ý˜ŒKŒLŒœšœËY\ÝŽ˜KŒMX™XXÝ˜NKŒ‹˜œ™XXÝYÛHŽ˜NKŒ‹˜š]N˜ŒŒLØK]‘\[™[˜ÚY\ÎžÈ\\ËÜ™XXÝŽ˜NKŒ‹ŒM\\ËÜ™XXÝYÛHŽ˜NKŒ‹ŒØ\\ØÜš\˜KŽKŒØ_K[^Û˜[YN˜[^š]™\˜X]N˜\ÜXÚX[\ÝH[ˆÛÜÜH0êXÛšXÛØ[XZ[˜[^œš]™\˜P^[\K˜ÛÛXÛ™N˜
ÍLˆØØ][ÛŽ˜pê^XÛØ[šÙY[Ž˜[šÙY[‹˜ÛÛKÚ[‹Ø[^\š]™\˜KY[[ØÝÎ˜Ý[[X\žN˜›Ù™\Ú[Û˜[HÛÜÜH0êXÛšXÛÈÛÛˆ^\šY[˜ÚXH[ˆÚ\Ý[X\Ë™Y\ÈH][˜ÚpìÛˆH\ÝX\š[ÜËˆÜšY[YÈ[XYÛ°ìÜÝXÛÈY]0ìÙXÛËHØÝ[Y[XÚpìÛˆÛ\˜HHHYZ›Ü˜HH›ØÙ\ÛÜÈÜ\˜]]›ÜË˜ÚÚ[Î˜ÛÜÜH0êXÛšXÛÈ0­È[^0­ÈÚ[™ÝÜÈ0­È™Y\ÈÔÒT0­ÈØÝ[Y[XÚpìÛˆ0­ÈÚ]ÛÜ™TÚÚ[Î˜XÚšXØ[Ý\Ü0­È›ÝX›\ÚÛÝ[™È0­È™]ÛÜšÈXYÛ›ÜÝXÜÈ0­ÈÝ\ÝÛY\ˆÙ\šXÙXÛÛÎ˜Ú\Ý[X\ÈÜ\˜]]›ÜÎˆ[^0­ÈÚ[™ÝÜÈ0­ÈÚ[™ÝÜÈÙ\™\‚”™Y\ÈH[™œ˜Y\ÝXÝ\˜NˆÔÒT0­ÈÔ0­È”Â”ÛÜÜHHYZ[š\Ý˜XÚpìÛŽˆÙ\šXÙS›ÝÈ0­Èš\˜H0­ÈÛÛ™›Y[˜ÙBÓHH]]ÛX]^˜XÚpìÛŽˆ˜\Ú0­ÈÝÙ\”Ú[0­È]Û‚ÛÝYHš\X[^˜XÚpìÛŽˆUÔÈ0­È^\™H0­ÈØÚÙ\‚‘\Ø\œ›ÛÈH]ÜÎˆ›\ÚÈ0­ÈÔS]H0­ÈÚ]0­ÈÚ]X˜Ù\YšXØ][ÛœÎ˜Ù\YšXØXÚpìÛˆ0êXÛšXØHHZ™[\ÂÝ\œÛÈ›Ù™\Ú[Û˜[HZ™[\ØYXØ][ÛŽ˜[™Ù[šY\°ëXH[ˆÚ\Ý[X\È8 %[š]™\œÚYYHZ™[\ËŒX[™ÝXYÙ\Î˜\Üpì[Û8 %˜]]›Â’[™Û0ê\È8 %›Ù™\Ú[Û˜[›ØœÎ–ÞÜ›ÛN˜\ÜXÚX[\ÝH[ˆÛÜÜH0êXÛšXÛØÛÛ\[žN˜[\™\ØHHXÛ›ÛÙðëXX]\Î˜Œ8 %XÝX[YY[]Î˜][˜ÚpìÛˆHÙYÝZ[ZY[ÈH[˜ÚY[\ÈH\ÝX\š[ÜË‚‘XYÛ°ìÜÝXÛÈHÛÛ™XÝ]šYYÚ\Ý[X\ÈÜ\˜]]›ÜÈH\]Z\ÜÈHÙšXÚ[˜K‚‘ØÝ[Y[XÚpìÛˆHÛÛXÚ[Û™\È[ˆH˜\ÙHHÛÛ›ØÚ[ZY[Ë˜KÜ›ÛN˜0êXÛšXÛÈHÚ\Ý[X\ØÛÛ\[žN˜Ù\šXÚ[ÜÈ›Ù™\Ú[Û˜[\Ø]\Î˜ŒŒH8 %Œ[]Î˜[œÝ[XÚpìÛˆHX[[š[ZY[ÈH\ÝXÚ[Û™\ÈH˜X˜Z›Ë‚”ÛÜÜHH™Y\ÈØØ[\Ë™\Ü[ÜÈHXØÙ\ÛÈ™[[ÝÈÙYÝ\›Ë˜WK›Ú™XÝÎ–ÞÛ˜[YN˜›ÞYXÝÈ[[ÜÝ˜]]›ØÝXÚÎ˜˜]˜TØÜš\0­ÈS0­ÈÔÔØ\ØÜš\[ÛŽ˜\œ˜[ZY[HHZ™[\È\˜HÜ™Ø[š^˜\ˆ[™›Ü›XXÚpìÛˆHÚ[\YšXØ\ˆ[ˆ›ØÙ\ÛÈÜ\˜]]›Ë˜™\ÜÚ]ÜžN˜WKÝ\ÝÛTÙXÝ[ÛœÎ–×_K^Û˜[YN˜]N˜[XZ[˜Û™N˜ØØ][ÛŽ˜[šÙY[Ž˜ÝÎ˜Ý[[X\žN˜ÚÚ[Î˜ÛÜ™TÚÚ[Î˜ÛÛÎ˜Ù\YšXØ][ÛœÎ˜YXØ][ÛŽ˜[™ÝXYÙ\Î˜›ØœÎ–ÞÜ›ÛN˜ÛÛ\[žN˜]\Î˜[]Î˜WK›Ú™XÝÎ–×KÝ\ÝÛTÙXÝ[ÛœÎ–×_K^Ù\ÎžÝYÛ[™N˜H^\šY[˜ÚXKšY[ˆ™\Ù[YK˜Ø]™N˜ÝX\™\˜Ø]™Y˜8§$ÈÝX\™YØŽ˜\ØØ\™Ø\ˆ˜^YXœ›ÝÎ˜QUÔˆHÓÓ•S’QØ]N˜ÛÛœÝ^YHHÕ˜ÛÛ\]N˜ÛÛ\]ØXœÎ–Ø\™š[^\šY[˜ÚXXUH›ÞYXÝÜØ›Ü›XXÚpìÛ˜\Ùpì[ØK[˜[YN˜›ÛXœ™HÛÛ\]Ø›Ù™\ÜÚ[Û˜[]N˜0ë][È›Ù™\Ú[Û˜[[XZ[˜ÛÜœ™[ØÛ™N˜[0êY›Û›ØØØ][ÛŽ˜XšXØXÚpìÛ˜[šÎ˜[šÙY[ˆÈÜY›Û[ØÝ[[X\žN˜™\Ý[Y[ˆ›Ù™\Ú[Û˜[Ý[[X\žR[˜ÛÛœÙZ›Îˆø $ÍH0ë[™X\ÈÛÛˆ\ÜXÚX[YY^\šY[˜ÚXHH˜[Üˆ]YH\Ü\Ë˜^\šY[˜ÙN˜^\šY[˜ÚXX›ÛN˜Y\ÝØÛÛ\[žN˜[\™\ØX\š[Ù˜\š[ÙØXÚY]™[Y[Î˜ÙÜ›ÜÈH™\ÜÛœØXš[YY\Ø™[[Ý™N˜[[Z[˜\˜Y^\šY[˜ÙN˜;ï"ÈpìXY\ˆ^\šY[˜ÚXXÛÜ™N˜ÛÜ™HÚÚ[ÈÈÛÛ\][˜ÚX\ÈÙ[˜[\ØÛÜ™R[˜ÛÛ\][˜ÚX\È]YHHYš[™[ˆ›Ù™\Ú[Û˜[Y[KˆÙ\0è\˜[\ÈÛÛˆ0­ØÛÛÎ˜\œ˜[ZY[\ÈHXÛ›ÛÙðëX\ØÙ\YšXØ][ÛœÎ˜Ù\YšXØXÚ[Û™\ÈHÝ\œÛÜØ›Ú™XÝÎ˜›ÞYXÝÜØ›Ú™XÝ˜›ÞYXÝØ›Ú™XÝ˜[YN˜›ÛXœ™H[›ÞYXÝØÝXÚÎ˜XÛ›ÛÙðëX\Ø\ØÜš\[ÛŽ˜\ØÜš\ÚpìÛˆH™\Ý[YØ™\ÜÚ]ÜžN˜™\ÜÚ]Üš[Ø™\ÜÚ]ÜžR[˜T“HÚ]X‹Ú]XˆHÝ›È™\ÜÚ]Üš[È
ÜÚ[Û˜[
XY›Ú™XÝ˜;ï"ÈpìXY\ˆ›ÞYXÝØÙ^]ÛÜ™Î˜Xš[YY\ÈH[Xœ˜\ÈÛ]™XÙ^]ÛÜ™Ò[˜\ØH0ê\›Z[›ÜÈ™\Ù[\È[ˆH˜XØ[KÚY[\™H]YHÛÜœ™\ÜÛ™[ˆHH^\šY[˜ÚXH™X[˜YXØ][ÛŽ˜YXØXÚpìÛ˜[™ÝXYÙ\Î˜Y[ÛX\Ø[\]N˜[[X]Î˜UÈ\Ù[˜ÚX[]Ñ\ØÎ˜pè^[XHÛÛ\]Xš[YYÛÛˆš[›ÜØ[Ù\›Ž˜[Ù\››Ø[Ù\›‘\ØÎ˜pè\È\œÛÛ˜[YYš\ÝX[[˜ÛYTÝÎ˜[˜ÛZ\ˆ›ÝÙÜ˜Y°ëXXÝÒ[˜0æœØ[HðìÛÈÝX[™ÈÙXHYXÝXYH\˜HH˜XØ[K˜ÚÛÜÙTÝÎ˜Ù[XØÚ[Û˜\ˆ›ÝÙÜ˜Y°ëXX˜\ØØ\™Ø\ˆ™\œÚpìÛˆH^ÈUØ™]šY]Î˜’TÕH‘U’PX›Ùš[RXY[™Î˜\™š[›Ù™\Ú[Û˜[^\šY[˜ÙRXY[™Î˜^\šY[˜ÚXH›Ù™\Ú[Û˜[ÚÚ[ÒXY[™Î˜ÛÛ\][˜ÚX\ØÛÜ™RXY[™Î˜ÛÜ™HÚÚ[ØÛÛÒXY[™Î˜\œ˜[ZY[\ÈHXÛ›ÛÙðëX\Ø›Ú™XÝÒXY[™Î˜›ÞYXÝÜÈÙ[XØÚ[Û˜YÜØÙ\YšXØ][ÛœÒXY[™Î˜Ù\YšXØXÚ[Û™\ØYXØ][Û’XY[™Î˜YXØXÚpìÛ˜[™ÝXYÙ\ÒXY[™Î˜Y[ÛX\Ø]ÑÛÛÙ˜XÝ\˜HUÈÜ[Z^˜YX]Ñ]Z[˜[˜ØX™^˜YÜÈ\Ý0è[™\ˆ0­È^ÈÙ[XØÚ[Û˜X›H0­ÈÚ[ˆX›\ÈÛÛ\Z˜\ØØÓ[™ÝXYÙN˜Y[ÛXH[Õ˜Ü[Û˜[˜ÜÚ[Û˜[ˆ\ÈÙXØÚ[Û™\È˜XðëX\È›ÈÙH[\š[Y[˜ÛÝY˜ÛÜX\È[ˆHX™XÛÝY]N˜Ú[˜Ü›Ûš^˜XÚpìÛˆ[ˆHX™XÛÝY[›Î˜HÛÜXHØØ[ÚY[\™HÙHÛÛœÙ\˜KˆPÌˆX[Y[™HÝH\ÝÜšX[›ÝYÚYÎÈÛÛÙÛHš]™H™XÚX™H\˜Ú]›ÜÈ›Ü›X[\ÈHYÚX›\Ë˜Þ[˜Ô\ÜÝÛÜ™˜ÛÛ˜\ÙpìXHHPÌ˜ÛÛ›™XÝXÌŽ˜ÛÛ™XÝ\ˆPÌ˜\ØÛÛ›™XÝ˜\ØÛÛ™XÝ\˜ØYXÌŽ˜Ø\™Ø\ˆ\ÙHPÌ˜ÛÛ›™XÝš]™N˜ÛÛ™XÝ\ˆÛÛÙÛHš]™XØYš]™N˜Ø\™Ø\ˆ\ÙHš]™X^Ü˜XÚÝ\˜\ØØ\™Ø\ˆ™\Ü[Ø[\Ü˜XÚÝ\˜Xœš\ˆ™\Ü[ØÛÜÙN˜Ù\œ˜\˜ØØ[Û›N˜ÝX\™YÈØØ[ÛÛ›™XÝ[™Î˜ÛÛ™XÝ[™ø )˜ÛÛ›™XÝY˜PÌˆÛÛ™XÝYØÞ[˜Ú[™Î˜Ú[˜Ü›Ûš^˜[™ø )˜Þ[˜ÙY˜\Ý[›ÜÈÛÛ™XÝYÜÈXÝX[^˜YÜØÞ[˜Ñ\œ›ÜŽ˜\œ›ÜˆHÚ[˜Ü›Ûš^˜XÚpìÛ˜ÛÛ™›XÝ˜^\ÝH[˜H™\œÚpìÛˆpè\È™XÚY[Xš]™T™XYN˜ÛÛÙÛHš]™HÛÛ™XÝYØš]™P]˜Z[X›N˜\ÝÈ\˜HÛÛ™XÝ\˜š]™U[˜]˜Z[X›N˜ÛÛÙÛHš]™Hpî›ˆ›È\Ý0èHÛÛ™šYÝ\˜YØ\ÜÝÛÜ™Ø\›š[™Î˜\ÝHÛÛ˜\ÙpìXHÙH][^˜HÛÛ[Y[H\˜H[\ÝÜšX[š]˜YÈHPÌŽÈÛÛÙÛHš]™H›ÈH™XÙ\Ú]K˜š]™Qš[\Î˜ÝX\™H[\ÜXÚ[ÈH˜X˜Z›Ë[ˆØÝ[Y[ÈH[ˆˆÚ[ˆÚYœ˜\ˆ[ˆHØ\œ]HÛÜœ™\ÜÛ™Y[K˜ÛÝYØYY˜HÛÜXHÙ[XØÚ[Û˜YHYHØ\™ØYKˆ[ØHÝX\™\ˆ\˜HÛÛœÙ\˜\›HØØ[Y[K˜^PÝœÎ˜Z\ÈÕœØÜš][™ÐXÝ]™N˜\Ú\Ý[˜ÚXHH\ØÜš]\˜HXÝ]˜XÜš][™Ñ]Z[˜[˜]™YØYÜˆ™]š\ØHÜÙÜ˜Y°ëXHHÜ˜[pè]XØHÙYðî›ˆ[Y[ÛXHTËÑS‹Ú[ˆ[šX\ˆ[ÕˆHÝ›ÈÙ\šXÚ[Ë˜\ÝÜžN˜\ÝÜšX[ØY™]š\Ú[ÛŽ˜Ø\™Ø\ˆ™]š\ÚpìÛ˜Ý\ÝÛTÙXÝ[ÛœÎ˜ÙXØÚ[Û™\È\œÛÛ˜[^˜Y\ØÝ\ÝÛTÙXÝ[ÛŽ˜ÙXØÚpìÛˆ\œÛÛ˜[^˜YXÙXÝ[Û•]N˜0ë][ÈHHÙXØÚpìÛ˜ÙXÝ[ÛÛÛ[˜ÛÛ[šYØYÝ\ÝÛTÙXÝ[ÛŽ˜;ï"ÈpìXY\ˆÙXØÚpìÛˆ\œÛÛ˜[^˜YX™\Ù]]N˜™\ÝX›XÙ\ˆ0ë][ØÛÛÒ[˜YØH[˜HØ]YÛÜ°ëXHÜˆ0ë[™XHÛÛˆ[›Ü›X]ÈØ]YÛÜ°ëXNˆÛÛ[šYËˆ[^È[\š[Üˆ[Xšpê[ˆ[˜Ú[Û˜K˜[\ÜÝŽ˜[\Ü\ˆÕ˜X›Ý]\˜XÙ\˜ØHXX›Ý]\]N˜XÙ\˜ØHHÛÙPØY™HÕˆÝY[ØX›Ý]\ØÜš\[ÛŽ˜\XØXÚpìÛˆ\˜HÜ™X\‹Ü™Ø[š^˜\‹[\Ü\ˆH^Ü\ˆÝ\œ°ëXÝ[[\È›Ù™\Ú[Û˜[\Èš[[™ðï\ÈHÛÛ\]X›\ÈÛÛˆUË˜]™[ÜYžN˜\ÙpìXYÈH\Ø\œ›ÛYÈÜ˜™\œÚ[ÛŽ˜™\œÚpìÛ˜šYÚÎ˜0ªHŒˆÛÙPØY™KˆÙÜÈÜÈ\™XÚÜÈ™\Ù\˜YÜË˜›Ùš[U\Ù\Ž˜\™š[™]Ô›Ùš[N˜Ü™X\ˆ\™š[›Ùš[S˜[YN˜›ÛXœ™HHH\œÛÛ˜N˜K[ŽžÝYÛ[™N˜[Ý\ˆ^\šY[˜ÙKÛX\›H™\Ù[Y˜Ø]™N˜Ø]™XØ]™Y˜8§$ÈØ]™YŽ˜ÝÛ›ØY˜^YXœ›ÝÎ˜ÓÓ•S•QUÔ˜]N˜Z[[Ý\ˆ°ê\Ý[pêXÛÛ\]N˜ÛÛ\]XXœÎ–Ø›Ùš[X^\šY[˜ÙXU	ˆ›Ú™XÝØYXØ][Û˜\ÚYÛ˜K[˜[YN˜[˜[YX›Ù™\ÜÚ[Û˜[]N˜›Ù™\ÜÚ[Û˜[]X[XZ[˜[XZ[Û™N˜Û™XØØ][ÛŽ˜ØØ][Û˜[šÎ˜[šÙY[ˆÈÜ›Û[ØÝ[[X\žN˜›Ù™\ÜÚ[Û˜[Ý[[X\žXÝ[[X\žR[˜\ˆ\ÙHø $ÍH[™\ÈÈÝ]H[Ý\ˆÜXÚX[K^\šY[˜ÙH[™˜[YK˜^\šY[˜ÙN˜^\šY[˜ÙX›ÛN˜ÜÚ][Û˜ÛÛ\[žN˜ÛÛ\[žX\š[Ù˜]\ØXÚY]™[Y[Î˜XÚY]™[Y[È[™™\ÜÛœÚXš[]Y\Ø™[[Ý™N˜™[[Ý™XY^\šY[˜ÙN˜;ï"ÈY^\šY[˜ÙXÛÜ™N˜ÛÜ™HÚÚ[ØÛÜ™R[˜HØ\Xš[]Y\È]Yš[™H[Ý\ˆ›Ù™\ÜÚ[Û˜[›Ùš[KˆÙ\\˜]H[HÚ]0­ØÛÛÎ˜ÛÛÈ	ˆXÚ›ÛÙÚY\ØÙ\YšXØ][ÛœÎ˜Ù\YšXØ][ÛœÈ	ˆÛÝ\œÙ]ÛÜšØ›Ú™XÝÎ˜›Ú™XÝØ›Ú™XÝ˜›Ú™XÝ›Ú™XÝ˜[YN˜›Ú™XÝ˜[YXÝXÚÎ˜XÚ›ÛÙÞHÝXÚØ\ØÜš\[ÛŽ˜\ØÜš\[Ûˆ[™Ý]ÛÛYX™\ÜÚ]ÜžN˜™\ÜÚ]ÜžX™\ÜÚ]ÜžR[˜Ú]X‹Ú]XˆÜˆ[›Ý\ˆ™\ÜÚ]ÜžHT“
Ü[Û˜[
XY›Ú™XÝ˜;ï"ÈY›Ú™XÝÙ^]ÛÜ™Î˜ÚÚ[È[™Ù^]ÛÜ™ØÙ^]ÛÜ™Ò[˜\ÙH\›\Èœ›ÛHH›ØˆÜÝ[™ÈÚ[ˆ^H][HX]Ú[Ý\ˆ^\šY[˜ÙK˜YXØ][ÛŽ˜YXØ][Û˜[™ÝXYÙ\Î˜[™ÝXYÙ\Ø[\]N˜[\]X]Î˜UÈ\ÜÙ[X[]Ñ\ØÎ˜X^[][HØÜ™Y[š[™Ë\Þ\Ý[HÛÛ\]Xš[]X[Ù\›Ž˜[Ù\›˜[Ù\›‘\ØÎ˜[Ü™Hš\ÝX[\œÛÛ˜[]X[˜ÛYTÝÎ˜[˜ÛYHÝÙÜ˜\ÝÒ[˜\ÙH]Û›HÚ[ˆ\›ÜšX]H›ÜˆH\XØ][Û‹˜ÚÛÜÙTÝÎ˜ÚÛÜÙHÝÙÜ˜\˜ÝÛ›ØYUÈ^™\œÚ[Û˜™]šY]Î˜U‘H‘U’QUØ›Ùš[RXY[™Î˜›Ù™\ÜÚ[Û˜[Ý[[X\žX^\šY[˜ÙRXY[™Î˜›Ù™\ÜÚ[Û˜[^\šY[˜ÙXÚÚ[ÒXY[™Î˜ÚÚ[ØÛÜ™RXY[™Î˜ÛÜ™HÚÚ[ØÛÛÒXY[™Î˜ÛÛÈ	ˆXÚ›ÛÙÚY\Ø›Ú™XÝÒXY[™Î˜Ù[XÝY›Ú™XÝØÙ\YšXØ][ÛœÒXY[™Î˜Ù\YšXØ][ÛœØYXØ][Û’XY[™Î˜YXØ][Û˜[™ÝXYÙ\ÒXY[™Î˜[™ÝXYÙ\Ø]ÑÛÛÙ˜UËYœšY[™HÝXÝ\™X]Ñ]Z[˜Ý[™\™XY[™ÜÈ0­ÈÙ[XÝX›H^0­È›ÈÛÛ\^X›\ØØÓ[™ÝXYÙN˜°ê\Ý[pêH[™ÝXYÙXÜ[Û˜[˜Ü[Û˜[ˆ[\HÙXÝ[ÛœÈ\™H›Ýš[YÛÝY˜ÛÝYÛÜY\ØÛÝY]N˜ÛÝYÞ[˜Ú›Ûš^˜][Û˜ÛÝY[›Î˜[Ý\ˆØØ[ÛÜH\È[Ø^\È™\Ù\™YˆPÌˆÙY\È]È›ÝXÝY\ÝÜžNÈÛÛÙÛHš]™H™XÙZ]™\È›Ü›X[™XYX›Hš[\Ë˜Þ[˜Ô\ÜÝÛÜ™˜PÌˆ\ÜÝÛÜ™ÛÛ›™XÝXÌŽ˜ÛÛ›™XÝPÌ˜\ØÛÛ›™XÝ˜\ØÛÛ›™XÝØYXÌŽ˜ØYœ›ÛHPÌ˜ÛÛ›™XÝš]™N˜ÛÛ›™XÝÛÛÙÛHš]™XØYš]™N˜ØYœ›ÛHš]™X^Ü˜XÚÝ\˜ÝÛ›ØY˜XÚÝ\[\Ü˜XÚÝ\˜Ü[ˆ˜XÚÝ\ÛÜÙN˜ÛÜÙXØØ[Û›N˜Ø]™YØØ[XÛÛ›™XÝ[™Î˜ÛÛ›™XÝ[™ø )˜ÛÛ›™XÝY˜PÌˆÛÛ›™XÝYÞ[˜Ú[™Î˜Þ[˜Ú[™ø )˜Þ[˜ÙY˜ÛÛ›™XÝY\Ý[˜][ÛœÈ\]YÞ[˜Ñ\œ›ÜŽ˜Þ[˜Ú›Ûš^˜][Ûˆ\œ›Ü˜ÛÛ™›XÝ˜H™]Ù\ˆ™\œÚ[Ûˆ^\ÝØš]™T™XYN˜ÛÛÙÛHš]™HÛÛ›™XÝYš]™P]˜Z[X›N˜™XYHÈÛÛ›™XÝš]™U[˜]˜Z[X›N˜ÛÛÙÛHš]™H\È›ÝÛÛ™šYÝ\™YY]\ÜÝÛÜ™Ø\›š[™Î˜\È\ÜÝÛÜ™\È\ÙYÛ›H›ÜˆHš]˜]HPÌˆ\ÝÜžNÈÛÛÙÛHš]™HÙ\È›Ý™YY]˜š]™Qš[\Î˜Ø]™\ÈHÛÜšÜÜXÙKHØÝ[Y[[™[ˆ[™[˜Üž\Yˆ[œÚYHHX]Ú[™È›Û\‹˜ÛÝYØYY˜HÙ[XÝYÛÜHØ\ÈØYYˆ™\ÜÈØ]™HÈÙY\]ØØ[K˜^PÝœÎ˜^HÕœØÜš][™ÐXÝ]™N˜Üš][™È\ÜÚ\Ý[˜ÙHXÝ]™XÜš][™Ñ]Z[˜[Ý\ˆœ›ÝÜÙ\ˆÚXÚÜÈÜ[[™È[™Ü˜[[X\ˆ›ÜˆHÙ[XÝYTËÑSˆ[™ÝXYÙHÚ]Ý]Ù[™[™ÈHÕˆÈ[›Ý\ˆÙ\šXÙK˜\ÝÜžN˜\ÝÜžXØY™]š\Ú[ÛŽ˜ØY™]š\Ú[Û˜Ý\ÝÛTÙXÝ[ÛœÎ˜Ý\ÝÛHÙXÝ[ÛœØÝ\ÝÛTÙXÝ[ÛŽ˜Ý\ÝÛHÙXÝ[Û˜ÙXÝ[Û•]N˜ÙXÝ[Ûˆ]XÙXÝ[ÛÛÛ[˜ÛÛ[YÝ\ÝÛTÙXÝ[ÛŽ˜;ï"ÈYÝ\ÝÛHÙXÝ[Û˜™\Ù]]N˜™\Ù]]XÛÛÒ[˜\ÝHÛ™HØ]YÛÜžH\ˆ[™H\ÈØ]YÛÜžNˆÛÛ[ˆ^\Ý[™ÈZ[ˆ^Ý[ÛÜšÜË˜[\ÜÝŽ˜[\Ü°ê\Ý[pêXX›Ý]\˜X›Ý]X›Ý]\]N˜X›Ý]ÛÙPØY™HÕˆÝY[ØX›Ý]\ØÜš\[ÛŽ˜[ˆ\XØ][Ûˆ›ÜˆÜ™X][™ËÜ™Ø[š^š[™Ë[\Ü[™Ë[™^Ü[™È›Ù™\ÜÚ[Û˜[š[[™ÝX[UËYœšY[™H°ê\Ý[pê\Ë˜]™[ÜYžN˜\ÚYÛ™Y[™]™[ÜYžX™\œÚ[ÛŽ˜™\œÚ[Û˜šYÚÎ˜0ªHŒˆÛÙPØY™Kˆ[šYÚÈ™\Ù\™Y˜›Ùš[U\Ù\Ž˜›Ùš[X™]Ô›Ùš[N˜Ü™X]H›Ùš[X›Ùš[S˜[YN˜\œÛÛ‰ÜÈ˜[YN˜_NÙ[˜Ý[Ûˆ
J^ÚYŠY_\[ÙˆHOXØš™XÝ
\™]\›ˆLNÛ]YNÜ™]\›ˆ™\œÚ[ÛOOLI‰˜[ÛÜš]OOOXQTËQÐÓX	‰\[Ùˆ˜Ú\\^OXÝš[™ØY[˜Ý[Ûˆ›
J^Ü™]\›ˆKœ™\XÙJÖ×ÎŠÈŸKÙËX
Kœ™\XÙJ×ÊËÙË
Kš[J
KœÛXÙJL
_Õ˜Y[˜Ý[Ûˆ›
J^Ü™]\›ˆKœ™\XÙJÖÉˆ‰×KÙËOOŠÈ‰ˆŽ˜	˜[\ØŽ˜	›ØˆŽ˜	™ÝØ	È‰Î˜	œ][ÝØ‰ÈŽ˜	ˆÌÎNØJVÙW_J_Y[˜Ý[Ûˆ›
J^Ü™]\›ˆKœÜ]
˜
K›X\
OO™Kš[J
JK™š[\Š›ÛÛX[ŠK›X\
OOžÛ]YK›X]Ú
×—
—
ŠŠÏÊW
—
ŠŠŠIÊNÚYŠ
\™]\›žØØ]YÛÜžNÌWKš[J
Kœ™\XÙJÎ‰Ë
KÛÛ[Ì—Kš[J
_NÛ]YKš[™^ÙŠ˜
NÚYŠL
\™]\›žØØ]YÛÜžN˜ÛÛ[™_NÛ]YKœÛXÙJŠKš[J
KOYKœÛXÙJŠÌJKš[J
NÜ™]\›ˆÞØØ]YÛÜžNœ‹ÛÛ[š_NžØØ]YÛÜžN˜ÛÛ[™__J_Y[˜Ý[Ûˆ›
J^Ü™]\›ˆ›
JK›X\

ØØ]YÛÜžN™KÛÛ[JOO™OØ]ˆÛ\ÜÏHÛÛXØ]YÛÜžHÝ›Û™Ï‰Þ›
J_OÜÝ›Û™Ï‰ÝØ‰Þ›

_OÜ˜˜OÙ]˜˜‰Þ›

_OÜ˜
Kš›Ú[Š
_Y[˜Ý[Ûˆ
J^Ü™]\›ˆ›
JK›X\

ØØ]YÛÜžN™KÛÛ[JOO™OØÝ›Û™Ï‰Þ›
J_IÝØ˜˜OÜÝ›Û™Ï‰ÝØ	Õ[

_X˜OÜ˜˜‰Õ[

_OÜ˜
Kš›Ú[Š
_Y[˜Ý[Ûˆ[
J^Û]K×Ê×—WJÊWW

ÏÎ—×Ö×—ÊWJÊW
KÙÚKLXÙ›ÜŠ]HÙˆK›X]Ú[

J\ŠÏ^›
KœÛXÙJ‹Kš[™^
JKŠÏXH™YH‰Þ›
VÌ—J_H‰Þ›
VÌWJ_OØO˜JKš[™^ÏÌ
JÚVÌK›[™ÝÜ™]\›ˆŠÞ›
KœÛXÙJŠJ_Y[˜Ý[ÛˆÛ
K
^Û]YOËš[J
NÚYŠ[Š\™]\›˜Û]^›
ŠKO^›

NÜ™]\›‹×šÏÎ—×ËÚK\Ý
ŠOØÛ\ÜÏHœ™\ÜÚ]ÜžHÝ›Û™Ï‰Ú_NÜÝ›Û™ÏˆH™YH‰ÜŸH‰ÜŸOØOÜ˜˜Û\ÜÏHœ™\ÜÚ]ÜžHÝ›Û™Ï‰Ú_NÜÝ›Û™Ïˆ	ÜŸOÜ˜Y[˜Ý[ÛˆÛ
J^Û]YK›X]Ú
×—
—
ŠŠÏÊW
—
‰ÊNÜ™]\›ˆØÝ›Û™Ï‰Õ[
ÌWJ_OÜÝ›Û™Ï˜•[
J_Y[˜Ý[ÛˆÛ
KŠ^Û]JŠOO™KœÙXÝ[Û•]\ÏË–ÝOËš[J
_‹OJK
OOØÙXÝ[Û‰Þ›
J_OÚ‰ÝOÜÙXÝ[Û˜˜OYKš›ØœË™š[\ŠOO™Kœ›Û_K˜ÛÛ\[ž_K˜[]ÊK›X\
OO˜ˆ]ˆÛ\ÜÏH™[žHÏ‰Þ›
Kœ›ÛJ_H8 %	ÑÛ
K˜ÛÛ\[žJ_OÚÏ[YO‰Þ›
K™]\Ê_OÝ[YO‚ˆ[‰ÙK˜[]ËœÜ]
˜
K™š[\Š›ÛÛX[ŠK›X\
OO˜O‰Þ›
J_OÛO˜
Kš›Ú[Š
_OÝ[Ù]˜
Kš›Ú[Š
KÏYKœ›Ú™XÝË™š[\ŠOO™K›˜[Y_K™\ØÜš\[ÛŸKœ™\ÜÚ]ÜžJK›X\
OO˜ˆ]ˆÛ\ÜÏH™[žHÏ‰Þ›
K›˜[YJ_OÚÏÝ›Û™Ï‰Þ›
KœÝXÚÊ_OÜÝ›Û™Ï‰Ò
K™\ØÜš\[ÛŠ_IÕÛ
Kœ™\ÜÚ]ÜžK‹œ™\ÜÚ]ÜžJ_OÙ]˜
Kš›Ú[Š
KÏYK˜Ý\ÝÛTÙXÝ[ÛœË™š[\ŠOO™K]_K˜ÛÛ[
K›X\
OOšJK]_‹˜Ý\ÝÛTÙXÝ[Û‹
K˜ÛÛ[
JJKš›Ú[Š
NÜ™]\›˜YØÝ\H[[[™ÏH‰ÝHXYY]HÚ\œÙ]H]‹N]O‰Þ›
K›˜[Y_Õ˜
_OÝ]O‚ˆÝ[OYÙ^ÜÚ^™NMÛX\™Ú[ŽŒN[_X›Ù^Ù›ÛY˜[Z[N\šX[Ø[œË\Ù\šYŽØÛÛÜŽˆÌMÌŒÌÎÙ›Û\Ú^™NŒL\Û[™KZZYÚŒKŽÛX^]ÚYŒMÎ[NÛX\™Ú[Ž˜]]ßZXY\žØ›Ü™\‹X›ÝÛNŒÜÛÛYÌÌMMØMÜY[™ËX›ÝÛNŒLZ^Ù›Û\Ú^™NŒ\ÛX\™Ú[ŽŒØÛÛÜŽˆÌNLÍßZXY\ˆžØ›Ü™\ŽŒÛX\™Ú[ŽŒÜÙ›Û\Ú^™NŒMZXY\ˆÛX\™Ú[ŽŒÜ\ÙXÝ[ÛžÛX\™Ú[‹]ÜŒM\ÙXÝ[ÛˆžÙ›Û\Ú^™NŒL\Û]\‹\ÜXÚ[™Î‹Œ[NÝ^]˜[œÙ›Ü›N\\˜Ø\ÙNØÛÛÜŽˆÌÌMMØMØ›Ü™\‹X›ÝÛNŒ\ÛÛYØØ™YLNÜY[™ËX›ÝÛNŒÜ\ÛX\™Ú[ŽK™[ž^Øœ™XZËZ[œÚYN˜]›ÚYÛX\™Ú[ŽŽK™[žHÞÙ›Û\Ú^™NŒL\ÛX\™Ú[ŽŒK™[žH[Y^ØÛÛÜŽˆÍLŒÌ_][ÛX\™Ú[ŽNÜY[™ÎŒ[^ÛX\™Ú[ŽŒœKÛÛXØ]YÛÜž^Øœ™XZËZ[œÚYN˜]›ÚYÛX\™Ú[ŽŒÜKÛÛXØ]YÛÜžHÝ›Û™ÞÙ\Ü^N˜›ØÚÎØÛÛÜŽˆÌÎMXNÙ›Û\Ú^™NŽK\KÛÛXØ]YÛÜžHÛX\™Ú[ŽŒ\OÜÝ[OÚXY›ÙO‚ˆXY\O‰Þ›
K›˜[YJ_OÚO‰Þ›
K]J_OÚ‰ÖÙK™[XZ[KœÛ™KK›ØØ][Û—K™š[\Š›ÛÛX[ŠK›X\
›
Kš›Ú[Š0­È
_OÜ‰ÙK›[šÙY[Ø‰Þ›
K›[šÙY[Š_OÜ˜˜OÚXY\‚ˆ	ÚJŠ›Ùš[X‹œ›Ùš[RXY[™ÊKKœÝ[[X\žOØ‰Þ›
KœÝ[[X\žJ_OÜ˜˜
_Bˆ	ÚJŠ^\šY[˜ÙX‹™^\šY[˜ÙRXY[™ÊKJ_Bˆ	ÚJŠÛÜ™WÜÚÚ[Ø‹˜ÛÜ™RXY[™ÊK
K˜ÛÜ™TÚÚ[ÊJ_Bˆ	ÚJŠÛÛØ‹ÛÛÒXY[™ÊKKÛÛÏÕ›
KÛÛÊN˜
_Bˆ	ÚJŠ›Ú™XÝØ‹œ›Ú™XÝÒXY[™ÊKÊ_Bˆ	ÚJŠÙ\YšXØ][ÛœØ‹˜Ù\YšXØ][ÛœÒXY[™ÊK
K˜Ù\YšXØ][ÛœÊJ_IÜßBˆ	ÚJŠÚÚ[Ø‹œÚÚ[ÒXY[™ÊK
KœÚÚ[ÊJ_Bˆ	ÚJŠYXØ][Û˜‹™YXØ][Û’XY[™ÊK
K™YXØ][ÛŠJ_Bˆ	ÚJŠ[™ÝXYÙ\Ø‹›[™ÝXYÙ\ÒXY[™ÊK
K›[™ÝXYÙ\ÊJ_BˆØ›ÙOÚ[˜]˜\ˆOX[œ]šY[Ù[˜Ý[Ûˆ[

^Û]ÙKOJ\ÙTÝ]JJ[
KÛ‹—OJ\ÙTÝ]JJ\™š[
KÚKWOJ\ÙTÝ]JJ\Ø
KÛË×OJ\ÙTÝ]JJ]Ø
KØËOJ\ÙTÝ]JJLJKÝKOJ\ÙTÝ]JJLJKÙ‹OJ\ÙTÝ]JJLJKÛKOJ\ÙTÝ]JJØØ[
KÙË×OJ\ÙTÝ]JJ
KÝ‹WOJ\ÙTÝ]JJ
KØ‹×OJ\ÙTÝ]JJ[
KÐË×OJ\ÙTÝ]JJ
KÕWOJ\ÙTÝ]JJ×JKÑ×OJ\ÙTÝ]JJ
KÚËWOJ\ÙTÝ]JJ
KÓ‹YWOJ\ÙTÝ]JJßJKÒWOJ\ÙTÝ]JJ

OOYJ[Û[™Î˜\Ø[\]N˜]ØÝÓÛŽˆL_JJKÕË™WOJ\ÙTÝ]JJLJKÜ™KÙWOJ\ÙTÝ]JJ[
KÜÙKÙWOJ\ÙTÝ]JJLJKÙKÙWOJ\ÙTÝ]JJ[
KÝ™K™WOJ\ÙTÝ]JJ
KÞKÙWOJ\ÙTÝ]JJÙ[™\˜[
KÐÙKÙWOJ\ÙTÝ]JJLJKÕKYWOJ\ÙTÝ]JJLJKÏV–ÚWNÊ\ÙQY™™XÝ
J

OOžÛ]O[ØØ[ÝÜ˜YÙK™Ù]][JÛÙXØY™KXÝ˜
K[ØØ[ÝÜ˜YÙK™Ù]][JÛÙXØY™KXÝ‹\Ù][™ÜØ
KR[OX\ØÏX]ØÏHLNÚYŠJ]ž^Û]R”ÓÓ‹œ\œÙJJNÜ^Ë‹‹’[‹‹›Ú™XÝÎœ›Ú™XÝÏÏÒ[œ›Ú™XÝß_XØ]ÚßZYŠŠ]ž^Û]OR”ÓÓ‹œ\œÙJŠNÊK›[™ÏOOX\ØK›[™ÏOOX[˜
I‰ŠOYK›[™ÊK
K[\]OOOX]ØK[\]OOOX[Ù\›˜
I‰ŠÏYK[\]JKÏHHYKœÝÓÛŸXØ]Úß[]OYÙJYJ‹Û[™ÎšK[\]N›ËÝÓÛŽ˜ßJJK\JJNÕJJK
Ë‹‹’[‹‹™˜Ý‹›Ú™XÝÎ™˜Ý‹œ›Ú™XÝÏÏÖ×KÝ\ÝÛTÙXÝ[ÛœÎ™˜Ý‹˜Ý\ÝÛTÙXÝ[ÛœÏÏÖ×_JKJœÙ][™ÜË›[™ÊKÊœÙ][™ÜË[\]JK
œÙ][™ÜËœÝÓÛŠKJJ_K×JK
\ÙQY™™XÝ
J

OOžÐŠ
K[ŠYJKJŠ
J_K×JNÛ]OJ\ÙSY[[ÊJ

OOžÛ]VÙK›˜[YKK]KK™[XZ[KœÛ™KK›ØØ][Û‹KœÝ[[X\žKKœÚÚ[ËK™YXØ][Û—NÜ™]\›ˆX]œ›Ý[™
™š[\Š›ÛÛX[ŠK›[™ÝÝ›[™Ý
ŒL
_KÙWJKÙOJKŠOO
OŠË‹‹ÙWN›ŸJJKÙOJK‹ŠOO
OŠË‹‹›ØœÎš›ØœË›X\

JOOšOOOYOÞË‹‹Û—NœŸN
_JJKYOJK‹ŠOO
OŠË‹‹›Ú™XÝÎœ›Ú™XÝË›X\

JOOšOOOYOÞË‹‹Û—NœŸN
_JJK™OJK‹ŠOO
OŠË‹‹Ý\ÝÛTÙXÝ[ÛœÎ˜Ý\ÝÛTÙXÝ[ÛœË›X\

JOOšOOOYOÞË‹‹Û—NœŸN
_JJKYOJŠOO™KœÙXÝ[Û•]\ÏË–ÝOËš[J
_‹™OJKŠOO
OžÛ]^Ë‹‹œÙXÝ[Û•]\ÏÏÞß_NÜ™]\›ˆ‹š[J
OÜ–ÙWO[Ž™[]H–ÙWKË‹‹ÙXÝ[Û•]\ÎœŸ_JKOYOOžÛ]JK
OO–ÙOËš[J
Kš[J
WK™š[\Š›ÛÛX[ŠKš›Ú[Š‚˜
NÝ
OžÛ]\ÝXÝ\™YÛÛ™J
NÙ›ÜŠ]ÙˆJZYŠ\™Ù]OOXÝ\ÝÛX
\‹˜Ý\ÝÛTÙXÝ[ÛœËœ\Ú
Ý]N˜Ý\ÝÛU]OËš[J
_šXY[™ËÛÛ[^JNÙ[ÙHYŠ\™Ù]OOX^\šY[˜ÙX
\‹š›ØœËœ\Ú
Ü›ÛNšXY[™ËÛÛ\[žN˜]\Î˜[]Î^JNÙ[ÙHYŠ\™Ù]OOX›Ú™XÝØ
\‹œ›Ú™XÝËœ\Ú
Û˜[YNšXY[™ËÝXÚÎ˜\ØÜš\[ÛŽ^™\ÜÚ]ÜžN˜JNÙ[ÙHYŠ\™Ù]OOXÚÚ\
^Û]O]\™Ù]Ü–ÙWO[Š–ÙWK^
_\™]\›ˆŸJKÙJLJK
ØØ[
_K™OJ
OO›YJKÛ[™ÎšK[\]N›ËÝÓÛŽ˜ßJKYOJ
OOŠÜØÚ[XNŒ‹Ø]™Y]›™]È]J
KÒTÓÔÝš[™Ê
KÛÜšÜÜXÙN‘™J
_JKOJ
OOžÛ]Q™J
K\J
K]˜ÛÛXÝ[ÛœË™š[™
OO™KšYOO[‹˜ÛÛXÝ[Û’Y
NÜ™]\›žÙØÝ[Y[Y›‹šYÛÛXÝ[Û“˜[YNœË›˜[Y_Ù[™\˜[\œÜÙXš[P˜\ÙS˜[YN”›
‹›˜[Y_K›˜[Y_Õ˜
K[’Û
KKÊ__K™OJ
OOžÛ]Q™J
NÕJ
KJ
KØØ[ÝÜ˜YÙKœÙ]][JÛÙXØY™KXÝ˜”ÓÓ‹œÝš[™ÚYžJJJKØØ[ÝÜ˜YÙKœÙ]][JÛÙXØY™KXÝ‹\Ù][™ÜØ”ÓÓ‹œÝš[™ÚYžJÛ[™ÎšK[\]N›ËÝÓÛŽ˜ßJJK
L
KÙ][Y[Ý]


OO™
LJKM
_K™OYOOžÛ]ŽÚYŠKœØÚ[XOOOLŠ^ÚYŠY™JKÛÜšÜÜXÙJJ]›ÝÈ\œ›ÜŠ[™\Ü[ÈÛÛY[™H[˜HšX›[ÝXØHHÕœÈ[°è[YK˜
NÛYKÛÜšÜÜXÙ_Y[ÙHYŠKœØÚ[XOOOLI‰™K˜Ý‰‰™KœÙ][™ÜÊ[]YJK˜Ý‹KœÙ][™ÜÊNÙ[ÙH›ÝÈ\œ›ÜŠ[™\Ü[È›ÈÛÜœ™\ÜÛ™HHÛÙPØY™HÕˆÝY[Ë˜
NÛ]\JŠNÕJŠKJŠK
Ë‹‹’[‹‹œ‹˜Ý‹›Ú™XÝÎœ‹˜Ý‹œ›Ú™XÝÏÏÖ×KÝ\ÝÛTÙXÝ[ÛœÎœ‹˜Ý‹˜Ý\ÝÛTÙXÝ[ÛœÏÏÖ×_JKJ‹œÙ][™ÜË›[™ÊKÊ‹œÙ][™ÜË[\]JK
‹œÙ][™ÜËœÝÓÛŠKÊË˜ÛÝYØYY
_K™OX\Þ[˜Ê
OOžÚYŠJX‰‰ˆZß‰‰ˆ]ŠJ^Ú
Þ[˜Ú[™Ø
KÊ
NÝž^ÚYŠŠ^Û]ORYJ
KX]ØZ]ŠK]ØZ]JJKË‹˜ÜÜ™•ÚÙ[ŠNÝÊœ™]š\Ú[ÛŠKÊœ™]š\Ú[ÛŠKJ]ØZ]

J_ZÉ‰˜]ØZ]YJËYJ
KJ
JK
Þ[˜ÙY
_XØ]Ú
J^Û]YNÚ
œÝ]\ÏOOMOØÛÛ™›XÝ˜\œ›Ü˜
KÊ›Y\ÜØYÙJ___K™OX\Þ[˜Ê
OOžÔ™J
K]ØZ]™J
_KOX\Þ[˜Ê
OOžÚYŠŠ^Ú
ÛÛ›™XÝ[™Ø
KÊ
NÝž^Û]OX]ØZ]
ŠNÔÊJKÊK˜Ý\œ™[™]š\Ú[ÛŠKÊK˜Ý\œ™[™]š\Ú[ÛŠKJ]ØZ]

JK
ÛÛ›™XÝY
_XØ]Ú
J^Ú
\œ›Ü˜
KÊK›Y\ÜØYÙJ___KYOX\Þ[˜Ê
OOžØ‰‰˜]ØZ]Š‹˜ÜÜ™•ÚÙ[ŠK˜Ø]Ú


OO›ÚY
KÊ[
KÊ
KÊ
KJ×JK
ØØ[
_KÙOX\Þ[˜Ê
OOžÚYŠJXŸ]ŠJ]ž^Û]OX]ØZ]J
NÚYŠYJ]›ÝÈ\œ›ÜŠPÌˆÙ]°ëXH›ÈÛÛY[™H™\Ü[ÜË˜
NÞ™J
Kœ^[ØY
OØ]ØZ]ŠKœ^[ØYŠN™Kœ^[ØY
KÊKœ™]š\Ú[ÛŠK
ÛÛ›™XÝY
_XØ]Ú
J^Ú
\œ›Ü˜
KÊK›Y\ÜØYÙJ__KÙOX\Þ[˜Ê
OOžÚYŠJXŸ]ŸQ
J]ž^Û]OX]ØZ]Š
NÚYŠYJ]›ÝÈ\œ›ÜŠH™]š\ÚpìÛˆÙ[XØÚ[Û˜YHXH›È^\ÝK˜
NÞ™J
Kœ^[ØY
OØ]ØZ]ŠKœ^[ØYŠN™Kœ^[ØY
K
ÛÛ›™XÝY
_XØ]Ú
J^Ú
\œ›Ü˜
KÊK›Y\ÜØYÙJ__KÙOX\Þ[˜Ê
OOžÚYŠ‹™ÛÛÙÛPÛY[Y
]ž^ÐJ]ØZ]J‹™ÛÛÙÛPÛY[Y
JKÊË™š]™T™XYJ_XØ]Ú
J^Ú
\œ›Ü˜
KÊK›Y\ÜØYÙJ__KYOX\Þ[˜Ê
OOžÚYŠÊ]ž^Û]OX]ØZ]YJÊNÚYŠYJ]›ÝÈ\œ›ÜŠÛÛÙÛHš]™HÙ]°ëXH›ÈÛÛY[™H™\Ü[ÜË˜
NÞ™JJ_XØ]Ú
J^Ú
\œ›Ü˜
KÊK›Y\ÜØYÙJ__K™OJ
OOžÛ]OYØÝ[Y[˜Ü™X]Q[[Y[
X
NÙKš™YUT“˜Ü™X]SØš™XÝT“
™]È›ØŠÒ”ÓÓ‹œÝš[™ÚYžJYJ
K[ŠWKÝ\N˜\XØ][Û‹ÚœÛÛ˜JJKK™ÝÛ›ØYXÛÙPØY™KPÕ‹IÛ™]È]J
KÒTÓÔÝš[™Ê
KœÛXÙJL
_K˜˜XÚÝ\šœÛÛ˜K˜ÛXÚÊ
KT“œ™]›ÚÙSØš™XÝT“
Kš™YŠ_KYOX\Þ[˜ÈOOžÛ]YK\™Ù]™š[\ÏË–ÌNÚYŠ
]ž^Û]OR”ÓÓ‹œ\œÙJ]ØZ]^

JNÞ™J
JOØ]ØZ]ŠKŠN™J_XØ]Ú
J^Ú
\œ›Ü˜
KÊK›Y\ÜØYÙJ_Yš[˜[^ÙK\™Ù]˜[YOX_KO^ÛØØ[’Ë›ØØ[Û›KÛÛ›™XÝ[™Î’Ë˜ÛÛ›™XÝ[™ËÛÛ›™XÝY’Ë˜ÛÛ›™XÝYÞ[˜Ú[™Î’ËœÞ[˜Ú[™ËÞ[˜ÙY’ËœÞ[˜ÙY\œ›ÜŽ’ËœÞ[˜Ñ\œ›Ü‹ÛÛ™›XÝ’Ë˜ÛÛ™›XÝVÛWK™OYOOžÝ
Ë‹‹’[‹‹™K˜Ý‹›Ú™XÝÎ™K˜Ý‹œ›Ú™XÝÏÏÖ×KÝ\ÝÛTÙXÝ[ÛœÎ™K˜Ý‹˜Ý\ÝÛTÙXÝ[ÛœÏÏÖ×_JKJKœÙ][™ÜË›[™ÊKÊKœÙ][™ÜË[\]JK
KœÙ][™ÜËœÝÓÛŠ_KYOYOOžÛ]Q™J
K]™ØÝ[Y[Ë™š[™
OšYOOYJNÚYŠ[Š\™]\›ŽÛ]^Ë‹‹XÝ]™QØÝ[Y[Y™_NÕJŠKJŠK™JŠK™JLJK
ØØ[
_K	OYOOžÛ]Q™J
K]™ØÝ[Y[Ë™š[™
Oœ›Ùš[RYOOYI‰ˆ]˜\˜Ú]™Y
NÚYŠ[Š\™]\›ŽÛ]^Ë‹‹XÝ]™T›Ùš[RY™KXÝ]™QØÝ[Y[Y›‹šYNÕJŠKJŠK™JŠK
ØØ[
_K]J
OOžÚYŠ™ØÝ[Y[Ë›[™ÝLŒ
\™]\›ŽÛ]O]Ú[™ÝËœ›Û\
Ëœ›Ùš[S˜[YJOËš[J
NÚYŠYJ\™]\›ŽÛ]Q™J
K[™]È]J
KÒTÓÔÝš[™Ê
K[J›Ùš[X
KO^ÚY›JÝ˜
K˜[YN˜	Ù_H8 %Õ˜ÛÛXÝ[Û’Y˜Ù[™\˜[ÝŽœÝXÝ\™YÛÛ™J
KÙ][™ÜÎžÛ[™ÎšK[\]N˜]ØÝÓÛŽˆL_KÜ™X]Y]›‹\]Y]›‹\˜Ú]™YˆLK›Ùš[RYœŸKÏ^Ë‹‹›Ùš[\Î–Ë‹‹œ›Ùš[\ÏÏÖ×KÚYœ‹˜[YN™KÜ™X]Y]›ŸWKXÝ]™T›Ùš[RYœ‹XÝ]™QØÝ[Y[Y˜KšYØÝ[Y[Î–Ë‹‹™ØÝ[Y[ËW_NÕJÊKJÊK™JJK
ØØ[
_KJ
OOžÚYŠ]™Kš[J
_™ØÝ[Y[Ë›[™ÝLŒ
\™]\›ŽÛ]OQ™J
K\JJK[™]È]J
KÒTÓÔÝš[™Ê
K^ÚY›JÝ˜
K˜[YN™Kš[J
KÛÛXÝ[Û’YžKÝŽ™OOOXÛÜXÜÝXÝ\™YÛÛ™J˜ÝŠNœÝXÝ\™YÛÛ™J
KÙ][™ÜÎ™OOOXÛÜXÞË‹‹œÙ][™ÜßNžÛ[™ÎšK[\]N˜]ØÝÓÛŽˆL_KÜ™X]Y]›‹\]Y]›‹\˜Ú]™YˆLK›Ùš[RY™K˜XÝ]™T›Ùš[RYKO^Ë‹‹™KØÝ[Y[Î–Ë‹‹™K™ØÝ[Y[Ë—KXÝ]™QØÝ[Y[Yœ‹šYNÕJJKJJK™JŠKÙJ[
K™J
K™JLJK
ØØ[
_KYOOžÛ]Q™J
K]™ØÝ[Y[Ë™š[™
OšYOOYJNÚYŠ[Ÿ™ØÝ[Y[Ë›[™ÝLŒ
\™]\›ŽÛ][™]È]J
KÒTÓÔÝš[™Ê
KO^Ë‹‹œÝXÝ\™YÛÛ™JŠKY›JÝ˜
K˜[YN˜	Û‹›˜[Y_H8 %ÛÜXÜ™X]Y]œ‹\]Y]œ‹\˜Ú]™YˆL_KO^Ë‹‹ØÝ[Y[Î–Ë‹‹™ØÝ[Y[ËW_NÕJJKJJ_KJK
OOžÛ]Q™J
K[‹™ØÝ[Y[Ë™š[\ŠOOˆYK˜\˜Ú]™Y
NÚYŠ	‰œ‹›[™ÝLJ\™]\›ŽÛ]O[‹™ØÝ[Y[Ë›X\
O›‹šYOOYOÞË‹‹›‹\˜Ú]™Y\]Y]›™]È]J
KÒTÓÔÝš[™Ê
_N›ŠKO[‹˜XÝ]™QØÝ[Y[YÚYŠ	‰™OOOXJ^Û]ZK™š[™
Oˆ]˜\˜Ú]™Y	‰šYOOYJNÝ	‰ŠO]šY™J
J_[]Ï^Ë‹‹›‹ØÝ[Y[ÎšKXÝ]™QØÝ[Y[Y˜_NÕJÊKJÊ_K]YOOžÛ]R™ØÝ[Y[Ë™š[™
OšYOOYJNÚYŠ]Ë˜\˜Ú]™Y
\™]\›ŽÛ]ZOOOX\ØØ0¯Ñ[[Z[˜\ˆYš[š]]˜[Y[H8 '	Ý›˜[Y_x 'OØ˜\›X[™[H[]H8 '	Ý›˜[Y_x 'OØÚYŠ]Ú[™ÝË˜ÛÛ™š\›JŠJ\™]\›ŽÛ]^Ë‹‹’ØÝ[Y[Î’™ØÝ[Y[Ë™š[\ŠOšYOOYJ_NÕJŠKJŠ_K]J
OOžÛ]OZOOOX\ØØ›ÛXœ™HHHY]˜HÛÛXØÚpìÛŽ˜˜™]ÈÛÛXÝ[Ûˆ˜[YN˜]Ú[™ÝËœ›Û\
JOËš[J
NÚYŠ]
\™]\›ŽÛ]^Ë‹‹’ÛÛXÝ[ÛœÎ–Ë‹‹’˜ÛÛXÝ[ÛœËÚY›JÛÛXÝ[Û˜
K˜[YNÜ™\Ž’˜ÛÛXÝ[ÛœË›[™ÝW_NÕJŠKJŠ_KÝYOOžÛ]R™ØÝ[Y[Ë™š[™
OšYOOYJNÚYŠ]
\™]\›ŽÛ]ZOOOX\ØØY]›È›ÛXœ™H[ÕŽ˜˜™]ÈÕˆ˜[YN˜]Ú[™ÝËœ›Û\
‹›˜[YJOËš[J
NÚYŠ\ŸOO]›˜[YJ\™]\›ŽÛ]OQ™J
KÏ^Ë‹‹˜KØÝ[Y[Î˜K™ØÝ[Y[Ë›X\
OšYOOYOÞË‹‹˜[YNœ‹\]Y]›™]È]J
KÒTÓÔÝš[™Ê
_N
_NÕJÊKJÊK
ØØ[
_KÝJK
OOžÚYŠR˜ÛÛXÝ[ÛœËœÛÛYJOO™KšYOO]
J\™]\›ŽÛ]Q™J
K^Ë‹‹›‹ØÝ[Y[Î›‹™ØÝ[Y[Ë›X\
O›‹šYOOYOÞË‹‹›‹ÛÛXÝ[Û’Y\]Y]›™]È]J
KÒTÓÔÝš[™Ê
_N›Š_NÕJŠKJŠK
ØØ[
_KÝYOOžÛ]YK\™Ù]™š[\ÏË–ÌNÚYŠ]
\™]\›ŽÛ][™]Èš[T™XY\ŽÛ‹›Û›ØYJ
OO“ÙJÝØÝš[™Ê‹œ™\Ý[
JK‹œ™XY\Ñ]UT“

_KYOO™KœÜ]
˜
K™š[\Š›ÛÛX[ŠNÜ™]\›ŠËšœÞÊJXZ[˜Û[™ÎšKÜ[ÚXÚÎˆLÚ[™[Ž–ÊËšœÞÊJXY\˜ØÛ\ÜÓ˜[YN˜Ü˜\˜Ú[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜œ˜[™Ú[™[Ž–ÊËšœÞ
JÜ[˜ØÛ\ÜÓ˜[YN˜œ˜[™X\šØÚ[™[Ž˜ØJK
ËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
JÝ›Û™ØØÚ[™[Ž˜ÛÙPØY™HÕ˜JK
ËšœÞ
JÛX[ØÚ[™[Ž’ËYÛ[™_JW_JW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÜXÝ[ÛœØÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜›Ùš[TÝÚ]ÚÚ[™[Ž–ÊËšœÞÊJX™[ØÚ[™[Ž–ÒËœ›Ùš[U\Ù\‹
ËšœÞ
JÙ[XÝÝ˜[YN’˜XÝ]™T›Ùš[RYÛÚ[™ÙN™OO‰JK\™Ù]˜[YJKÚ[™[ŽŠœ›Ùš[\ÏÏÖ×JK›X\
OOŠËšœÞ
JÜ[Û˜Ý˜[YN™KšYÚ[™[Ž™K›˜[Y_KKšY
J_JW_JK
ËšœÞ
J]Û˜ÛÛÛXÚÎ™]]N’Ë›™]Ô›Ùš[K˜\šXK[X™[Ž’Ë›™]Ô›Ùš[KÚ[™[Ž˜;ï"ØJW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜[™ÔÝÚ]Ú˜\šXK[X™[Ž’Ë™ØÓ[™ÝXYÙKÚ[™[Ž–ÊËšœÞ
J]Û˜ØÛ\ÜÓ˜[YNšOOOX\ØØÙ[XÝY˜ÛÛXÚÎŠ
OO˜J\Ø
KÚ[™[Ž˜TØJK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YNšOOOX[˜ØÙ[XÝY˜ÛÛXÚÎŠ
OO˜J[˜
KÚ[™[Ž˜S˜JW_JK
ËšœÞÊJ]Û˜ØÛ\ÜÓ˜[YN˜Xœ˜\žP]Û˜ÛÛXÚÎŠ
OO›™JL
K]N˜	ÒË›^PÝœßNˆ	ÜJ
K›˜[Y_XÚ[™[Ž–Ø8¥©
ËšœÞ
JÜ[˜ØÚ[™[Ž’Ë›^PÝœßJW_JK
ËšœÞÊJ]Û˜ØÛ\ÜÓ˜[YN˜Xœ˜\žP]Û˜ÛÛXÚÎŠ
OOÙJL
KÚ[™[Ž–Ø8¡êH
ËšœÞ
JÜ[˜ØÚ[™[Ž’Ëš[\ÜÝŸJW_JK
ËšœÞÊJ]Û˜ØÛ\ÜÓ˜[YN˜Xœ˜\žP]Û˜ÛÛXÚÎŠ
OO‘YJL
KÚ[™[Ž–Ø8¤æ
ËšœÞ
JÜ[˜ØÚ[™[Ž’Ë˜X›Ý]\JW_JK
ËšœÞÊJ]Û˜ØÛ\ÜÓ˜[YN˜ÛÝY]Ûˆ	Û_XÛÛXÚÎŠ
OOœ
L
K]N’Ë˜ÛÝYÚ[™[Ž–Ø8¦ H
ËšœÞ
JÜ[˜ØÚ[™[Ž–_JW_JK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜ÚÜÝÛÛXÚÎ•™KÚ[™[ŽOÒËœØ]™Y’ËœØ]™_JK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜š[X\žXÛÛXÚÎŠ
OOÚ[™ÝËœš[

KÚ[™[Ž’ËœŸJW_JW_JK
ËšœÞÊJÙXÝ[Û˜ØÛ\ÜÓ˜[YN˜ÛÜšÜÜXÙXÚ[™[Ž–ÊËšœÞÊJ\ÚYXØÛ\ÜÓ˜[YN˜Y]Ü˜Ú[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Y]Ü’XYÚ[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
JÜ[˜ØÛ\ÜÓ˜[YN˜^YXœ›ÝØÚ[™[Ž’Ë™^YXœ›ÝßJK
ËšœÞ
JXØÚ[™[Ž’Ë]_JW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ØÛÜ™XÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–ÑK	X_JK
ËšœÞ
JÜ[˜ØÚ[™[Ž’Ë˜ÛÛ\]_JW_JW_JK
ËšœÞ
J˜]˜ØÛ\ÜÓ˜[YN˜XœØÚ[™[Ž–Ø\™š[^\šY[˜ÚXX]›Ü›XXÚ[Û˜\Ù[›ØK›X\

K
OOŠËšœÞÊJ]Û˜ØÛ\ÜÓ˜[YN›OOYOØXÝ]™X˜ÛÛXÚÎŠ
OOœŠJKÚ[™[Ž–ÊËšœÞ
JÜ[˜ØÚ[™[Ž
Ì_JKËXœÖÝW_KJJ_JKOOX\™š[	‰ŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜›Ü›QÜšYÚ[™[Ž–ÊËšœÞ
J›ÛX™[’Ë™[˜[YKÚYNˆLÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K›˜[YKÛÚ[™ÙN™OO“ÙJ˜[YXK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ëœ›Ù™\ÜÚ[Û˜[]KÚYNˆLÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K]KÛÚ[™ÙN™OO“ÙJ]XK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ë™[XZ[Ú[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K™[XZ[ÛÚ[™ÙN™OO“ÙJ[XZ[K\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’ËœÛ™KÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™KœÛ™KÛÚ[™ÙN™OO“ÙJÛ™XK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ë›ØØ][Û‹ÚYNˆLÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K›ØØ][Û‹ÛÚ[™ÙN™OO“ÙJØØ][Û˜K\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ë›[šËÚYNˆLÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K›[šÙY[‹ÛÚ[™ÙN™OO“ÙJ[šÙY[˜K\™Ù]˜[YJ_J_JK
ËšœÞÊJ›ÛX™[’ËœÝ[[X\žKÚYNˆLÚ[™[Ž–ÊËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎ‹˜[YN™KœÝ[[X\žKÛÚ[™ÙN™OO“ÙJÝ[[X\žXK\™Ù]˜[YJ_JK
ËšœÞ
JÛX[ØÛ\ÜÓ˜[YN˜[Ú[™[Ž’ËœÝ[[X\žR[JW_JW_JKOOX^\šY[˜ÚXX	‰ŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÝXÚØÚ[™[Ž–ÙKš›ØœË›X\

KŠOOŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜›ØØ\™Ú[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Ø\™]XÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–ÒË™^\šY[˜ÙKŠÌW_JK
ËšœÞ
J]Û˜ÛÛÛXÚÎŠ
OO
OOŠË‹‹™K›ØœÎ™Kš›ØœË™š[\Š
K
OOOO[Š_JJKÚ[™[Ž’Ëœ™[[Ý™_JW_JK
ËšœÞ
J›ÛX™[’Ëœ›ÛKÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™Kœ›ÛKÛÚ[™ÙN™OOšÙJ‹›ÛXK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ë˜ÛÛ\[žKÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K˜ÛÛ\[žKÛÚ[™ÙN™OOšÙJ‹ÛÛ\[žXK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ëœ\š[ÙÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K™]\ËÛÚ[™ÙN™OOšÙJ‹]\ØK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ë˜XÚY]™[Y[ËÚ[™[ŽŠËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎK˜[YN™K˜[]ËÛÚ[™ÙN™OOšÙJ‹[]ØK\™Ù]˜[YJ_J_JW_KŠJK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜YÛÛXÚÎŠ
OO
OOŠË‹‹™K›ØœÎ–Ë‹‹™Kš›ØœËÜ›ÛN˜ÛÛ\[žN˜]\Î˜[]Î˜W_JJKÚ[™[Ž’Ë˜Y^\šY[˜Ù_JW_JKOOX]	‰ŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÝXÚØÚ[™[Ž–ÊËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜Ü[Û˜[›ÝXÚ[™[Ž’Ë›Ü[Û˜[JK
ËšœÞÊJ›ÛX™[’Ë˜ÛÜ™KÚ[™[Ž–ÊËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎ˜[YN™K˜ÛÜ™TÚÚ[ËÛÚ[™ÙN™OO“ÙJÛÜ™TÚÚ[ØK\™Ù]˜[YJ_JK
ËšœÞ
JÛX[ØÛ\ÜÓ˜[YN˜[Ú[™[Ž’Ë˜ÛÜ™R[JW_JK
ËšœÞÊJ›ÛX™[’ËÛÛËÚ[™[Ž–ÊËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎË˜[YN™KÛÛËÛÚ[™ÙN™OO“ÙJÛÛØK\™Ù]˜[YJ_JK
ËšœÞ
JÛX[ØÛ\ÜÓ˜[YN˜[Ú[™[Ž’ËÛÛÒ[JW_JK
ËšœÞ
J›ÛX™[’Ë˜Ù\YšXØ][ÛœËÚ[™[ŽŠËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎ˜[YN™K˜Ù\YšXØ][ÛœËÛÚ[™ÙN™OO“ÙJÙ\YšXØ][ÛœØK\™Ù]˜[YJ_J_JK
ËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜ÝXšXYÚ[™[Ž’Ëœ›Ú™XÝßJKKœ›Ú™XÝË›X\

KŠOOŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜›ØØ\™Ú[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Ø\™]XÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–ÒËœ›Ú™XÝŠÌW_JK
ËšœÞ
J]Û˜ÛÛÛXÚÎŠ
OO
OOŠË‹‹™K›Ú™XÝÎ™Kœ›Ú™XÝË™š[\Š
K
OOOO[Š_JJKÚ[™[Ž’Ëœ™[[Ý™_JW_JK
ËšœÞ
J›ÛX™[’Ëœ›Ú™XÝ˜[YKÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K›˜[YKÛÚ[™ÙN™OOYJ‹˜[YXK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’ËœÝXÚËÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™KœÝXÚËÛÚ[™ÙN™OOYJ‹ÝXÚØK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ë™\ØÜš\[Û‹Ú[™[ŽŠËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎ˜[YN™K™\ØÜš\[Û‹ÛÚ[™ÙN™OOYJ‹\ØÜš\[Û˜K\™Ù]˜[YJ_J_JK
ËšœÞÊJ›ÛX™[’Ëœ™\ÜÚ]ÜžKÚ[™[Ž–ÊËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K\N˜\›XÙZÛ\Ž˜Î‹ËÙÚ]X‹˜ÛÛKË‹‹˜˜[YN™Kœ™\ÜÚ]ÜžOÏØÛÚ[™ÙN™OOYJ‹™\ÜÚ]ÜžXK\™Ù]˜[YJ_JK
ËšœÞ
JÛX[ØÛ\ÜÓ˜[YN˜[Ú[™[Ž’Ëœ™\ÜÚ]ÜžR[JW_JW_KŠJK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜YÛÛXÚÎŠ
OO
OOŠË‹‹™K›Ú™XÝÎ–Ë‹‹™Kœ›Ú™XÝËÛ˜[YN˜ÝXÚÎ˜\ØÜš\[ÛŽ˜™\ÜÚ]ÜžN˜W_JJKÚ[™[Ž’Ë˜Y›Ú™XÝJK
ËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜ÝXšXYÚ[™[Ž’Ë˜Ý\ÝÛTÙXÝ[ÛœßJKK˜Ý\ÝÛTÙXÝ[ÛœË›X\

KŠOOŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜›ØØ\™Ú[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Ø\™]XÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–ÒË˜Ý\ÝÛTÙXÝ[Û‹ŠÌW_JK
ËšœÞ
J]Û˜ÛÛÛXÚÎŠ
OO
OOŠË‹‹™KÝ\ÝÛTÙXÝ[ÛœÎ™K˜Ý\ÝÛTÙXÝ[ÛœË™š[\Š
K
OOOO[Š_JJKÚ[™[Ž’Ëœ™[[Ý™_JW_JK
ËšœÞ
J›ÛX™[’ËœÙXÝ[Û•]KÚ[™[ŽŠËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K˜[YN™K]KÛÚ[™ÙN™OOš™J‹]XK\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’ËœÙXÝ[ÛÛÛ[Ú[™[ŽŠËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎK˜[YN™K˜ÛÛ[ÛÚ[™ÙN™OOš™J‹ÛÛ[K\™Ù]˜[YJ_J_JW_KŠJK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜YÛÛXÚÎŠ
OO
OOŠË‹‹™KÝ\ÝÛTÙXÝ[ÛœÎ–Ë‹‹™K˜Ý\ÝÛTÙXÝ[ÛœËÝ]N˜ÛÛ[˜W_JJKÚ[™[Ž’Ë˜YÝ\ÝÛTÙXÝ[ÛŸJW_JKOOX›Ü›XXÚ[Û˜	‰ŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜›Ü›QÜšYÚ[™[Ž–ÊËšœÞÊJ›ÛX™[’ËšÙ^]ÛÜ™ËÚYNˆLÚ[™[Ž–ÊËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎK˜[YN™KœÚÚ[ËÛÚ[™ÙN™OO“ÙJÚÚ[ØK\™Ù]˜[YJ_JK
ËšœÞ
JÛX[ØÛ\ÜÓ˜[YN˜[Ú[™[Ž’ËšÙ^]ÛÜ™Ò[JW_JK
ËšœÞ
J›ÛX™[’Ë™YXØ][Û‹ÚYNˆLÚ[™[ŽŠËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎK˜[YN™K™YXØ][Û‹ÛÚ[™ÙN™OO“ÙJYXØ][Û˜K\™Ù]˜[YJ_J_JK
ËšœÞ
J›ÛX™[’Ë›[™ÝXYÙ\ËÚYNˆLÚ[™[ŽŠËšœÞ
J^\™XXØÛ\ÜÓ˜[YN”K›ÝÜÎ˜[YN™K›[™ÝXYÙ\ËÛÚ[™ÙN™OO“ÙJ[™ÝXYÙ\ØK\™Ù]˜[YJ_J_JW_JKOOX\Ù[›Ø	‰ŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜\ÚYÛ”[™[Ú[™[Ž–ÊËšœÞ
JØØÚ[™[Ž’Ë[\]_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜[\]PÚÚXÙ\ØÚ[™[Ž–ÊËšœÞÊJ]Û˜ØÛ\ÜÓ˜[YN›ÏOOX]ØØÙ[XÝY˜ÛÛXÚÎŠ
OOœÊ]Ø
KÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž’Ë˜]ßJK
ËšœÞ
JÜ[˜ØÚ[™[Ž’Ë˜]Ñ\ØßJW_JK
ËšœÞÊJ]Û˜ØÛ\ÜÓ˜[YN›ÏOOX[Ù\›˜ØÙ[XÝY˜ÛÛXÚÎŠ
OOœÊ[Ù\›˜
KÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž’Ë›[Ù\›ŸJK
ËšœÞ
JÜ[˜ØÚ[™[Ž’Ë›[Ù\›‘\ØßJW_JW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÙÙÛT›ÝØÚ[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž’Ëš[˜ÛYTÝßJK
ËšœÞ
JÜ[˜ØÚ[™[Ž’ËœÝÒ[JW_JK
ËšœÞ
J]Û˜È˜\šXK[X™[Ž’Ëš[˜ÛYTÝË˜\šXK\™\ÜÙYŽ˜ËÛ\ÜÓ˜[YN˜ÙÙÛH	ØÏØÛ˜˜XÛÛXÚÎŠ
OO›
XÊKÚ[™[ŽŠËšœÞ
JXßJ_JW_JKÉ‰ŠËšœÞÊJX™[ØÛ\ÜÓ˜[YN˜\ØYÚ[™[Ž–ÒË˜ÚÛÜÙTÝË
ËšœÞ
J[œ]Ý\N˜š[XXØÙ\˜[XYÙKÊ˜ÛÚ[™ÙN˜ÝJW_JK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜]Ñ^ÜÛÛXÚÎŠ
OOžÛ]VØ	ÙK›˜[Y_W‰ÙK]_W‰ÙK™[XZ[H	ÙKœÛ™_H	ÙK›ØØ][ÛŸW‰ÙK›[šÙY[ŸX	ÓYJ›Ùš[XËœ›Ùš[RXY[™ÊKÕ\\Ø\ÙJ
_W‰ÙKœÝ[[X\ž_X	ÓYJ^\šY[˜ÙXË™^\šY[˜ÙRXY[™ÊKÕ\\Ø\ÙJ
_W‰ÙKš›ØœË›X\
OO˜	ÙKœ›Û_H8 %	ÙK˜ÛÛ\[ž_H
	ÙK™]\ßJW‰ÙK˜[]ßX
Kš›Ú[Š‚˜
_XK˜ÛÜ™TÚÚ[É‰˜	ÓYJÛÜ™WÜÚÚ[ØË˜ÛÜ™RXY[™ÊKÕ\\Ø\ÙJ
_W‰ÙK˜ÛÜ™TÚÚ[ßXKÛÛÉ‰˜	ÓYJÛÛØËÛÛÒXY[™ÊKÕ\\Ø\ÙJ
_W‰ÙKÛÛßXKœ›Ú™XÝËœÛÛYJOO™K›˜[Y_K™\ØÜš\[ÛŸKœ™\ÜÚ]ÜžJI‰˜	ÓYJ›Ú™XÝØËœ›Ú™XÝÒXY[™ÊKÕ\\Ø\ÙJ
_W‰ÙKœ›Ú™XÝË›X\
OO˜	ÙK›˜[Y_H	ÙKœÝXÚßW‰ÙK™\ØÜš\[ÛŸIÙKœ™\ÜÚ]ÜžOØ‰ÒËœ™\ÜÚ]Üž_Nˆ	ÙKœ™\ÜÚ]Üž_X˜X
Kš›Ú[Š‚˜
_XK˜Ù\YšXØ][ÛœÉ‰˜	ÓYJÙ\YšXØ][ÛœØË˜Ù\YšXØ][ÛœÒXY[™ÊKÕ\\Ø\ÙJ
_W‰ÙK˜Ù\YšXØ][ÛœßX‹‹™K˜Ý\ÝÛTÙXÝ[ÛœË™š[\ŠOO™K]_K˜ÛÛ[
K›X\
OO˜	ÙK]KÕ\\Ø\ÙJ
_W‰ÙK˜ÛÛ[X
K	ÓYJYXØ][Û˜Ë™YXØ][Û’XY[™ÊKÕ\\Ø\ÙJ
_W‰ÙK™YXØ][ÛŸX	ÓYJ[™ÝXYÙ\ØË›[™ÝXYÙ\ÒXY[™ÊKÕ\\Ø\ÙJ
_W‰ÙK›[™ÝXYÙ\ßXK™š[\Š›ÛÛX[ŠKš›Ú[Š‚˜
KYØÝ[Y[˜Ü™X]Q[[Y[
X
NÛ‹š™YUT“˜Ü™X]SØš™XÝT“
™]È›ØŠÝKÝ\N˜^ÜZ[˜JJK‹™ÝÛ›ØYXÕ‹IÙK›˜[Y_Ø[™Y]XKIÚKÕ\\Ø\ÙJ
_KPUË‹˜ÛXÚÊ
_KÚ[™[Ž’ËJK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Üš][™ÔÝ]\ØÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–Ø8§$ÈËÜš][™ÐXÝ]™W_JK
ËšœÞ
JÜ[˜ØÚ[™[Ž’ËÜš][™Ñ]Z[JW_JW_JW_JK
ËšœÞÊJÙXÝ[Û˜ØÛ\ÜÓ˜[YN˜™]šY]Ô[™XÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜™]šY]ÕÜÚ[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
JÜ[˜ØÛ\ÜÓ˜[YN˜]™QÝJKËœ™]šY]×_JK
ËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜›ÛÛXÚ[™[Ž˜M0­ÈL	XJW_JK
ËšœÞÊJ\XÛXØÛ\ÜÓ˜[YN˜\\ˆ	ÛßXÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Ý’XY\˜Ú[™[Ž–ØÉ‰™KœÝÉ‰ŠËšœÞ
J[YØØÛ\ÜÓ˜[YN˜Ü˜Z]Ü˜Î™KœÝË[’Ëš[˜ÛYTÝßJK
ËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž™K›˜[Y_Ë™[˜[Y_JK
ËšœÞ
JØØÚ[™[Ž™K]_Ëœ›Ù™\ÜÚ[Û˜[]_JK
ËšœÞ
JØÚ[™[Ž–ÙK™[XZ[KœÛ™KK›ØØ][Û—K™š[\Š›ÛÛX[ŠKš›Ú[Š0­È
_JKK›[šÙY[‰‰ŠËšœÞ
JØÚ[™[Ž™K›[šÙY[ŸJW_JW_JK
ËšœÞ
J	Ý]N“YJ›Ùš[XËœ›Ùš[RXY[™ÊKY˜][]N’Ëœ›Ùš[RXY[™ËÛ•]PÚ[™ÙN™OO“™J›Ùš[XJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[ŽŠËšœÞ
JØÚ[™[Ž™KœÝ[[X\ž_J_JK
ËšœÞ
J	Ý]N“YJ^\šY[˜ÙXË™^\šY[˜ÙRXY[™ÊKY˜][]N’Ë™^\šY[˜ÙRXY[™ËÛ•]PÚ[™ÙN™OO“™J^\šY[˜ÙXJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[Ž™Kš›ØœË›X\

K
OOŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Ý’›Ø˜Ú[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜›Ø’XY[™ØÚ[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž™Kœ›Û_JK
ËšœÞ
JÜ[˜ØÚ[™[ŽŠËšœÞ
J[Ý˜[YN™K˜ÛÛ\[ž_J_JW_JK
ËšœÞ
J[YXØÚ[™[Ž™K™]\ßJW_JK
ËšœÞ
J[ØÚ[™[Ž›
K˜[]ÊK›X\

K
OOŠËšœÞ
JXØÚ[™[Ž™_K
J_JW_K
J_JKK˜ÛÜ™TÚÚ[É‰ŠËšœÞ
J	Ý]N“YJÛÜ™WÜÚÚ[ØË˜ÛÜ™RXY[™ÊKY˜][]N’Ë˜ÛÜ™RXY[™ËÛ•]PÚ[™ÙN™OO“™JÛÜ™WÜÚÚ[ØJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[ŽŠËšœÞ
JÝ˜[YN™K˜ÛÜ™TÚÚ[ßJ_JKKÛÛÉ‰ŠËšœÞ
J	Ý]N“YJÛÛØËÛÛÒXY[™ÊKY˜][]N’ËÛÛÒXY[™ËÛ•]PÚ[™ÙN™OO“™JÛÛØJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[ŽŠËšœÞ
J[Ý˜[YN™KÛÛßJ_JKKœ›Ú™XÝËœÛÛYJOO™K›˜[Y_K™\ØÜš\[ÛŸKœ™\ÜÚ]ÜžJI‰ŠËšœÞ
J	Ý]N“YJ›Ú™XÝØËœ›Ú™XÝÒXY[™ÊKY˜][]N’Ëœ›Ú™XÝÒXY[™ËÛ•]PÚ[™ÙN™OO“™J›Ú™XÝØJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[Ž™Kœ›Ú™XÝË™š[\ŠOO™K›˜[Y_K™\ØÜš\[ÛŸKœ™\ÜÚ]ÜžJK›X\

K
OOŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Ý”›Ú™XÝÚ[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž™K›˜[Y_JK
ËšœÞ
JÜ[˜ØÚ[™[Ž™KœÝXÚßJW_JK
ËšœÞ
JÝ˜[YN™K™\ØÜš\[ÛŸJKKœ™\ÜÚ]ÜžI‰ŠËšœÞÊJØÛ\ÜÓ˜[YN˜™\ÜÚ]ÜžXÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–ÒËœ™\ÜÚ]ÜžK˜_JK×šÏÎ—×ËÚK\Ý
Kœ™\ÜÚ]ÜžJOÊËšœÞ
JXÚ™YŽ™Kœ™\ÜÚ]ÜžKÚ[™[Ž™Kœ™\ÜÚ]Üž_JN™Kœ™\ÜÚ]ÜžW_JW_K
J_JKK˜Ù\YšXØ][ÛœÉ‰ŠËšœÞ
J	Ý]N“YJÙ\YšXØ][ÛœØË˜Ù\YšXØ][ÛœÒXY[™ÊKY˜][]N’Ë˜Ù\YšXØ][ÛœÒXY[™ËÛ•]PÚ[™ÙN™OO“™JÙ\YšXØ][ÛœØJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[ŽŠËšœÞ
JÝ˜[YN™K˜Ù\YšXØ][ÛœßJ_JKK˜Ý\ÝÛTÙXÝ[ÛœË™š[\ŠOO™K]_K˜ÛÛ[
K›X\

K
OOŠËšœÞ
J	Ý]N™K]_Ë˜Ý\ÝÛTÙXÝ[Û‹Ú[™[ŽŠËšœÞ
JÝ˜[YN™K˜ÛÛ[J_K	ÙK]_KIÝX
JK
ËšœÞ
J	Ý]N“YJÚÚ[ØËœÚÚ[ÒXY[™ÊKY˜][]N’ËœÚÚ[ÒXY[™ËÛ•]PÚ[™ÙN™OO“™JÚÚ[ØJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[ŽŠËšœÞ
JÝ˜[YN™KœÚÚ[ßJ_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÛÐÛÛØÚ[™[Ž–ÊËšœÞ
J	Ý]N“YJYXØ][Û˜Ë™YXØ][Û’XY[™ÊKY˜][]N’Ë™YXØ][Û’XY[™ËÛ•]PÚ[™ÙN™OO“™JYXØ][Û˜JK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[ŽŠËšœÞ
JÝ˜[YN™K™YXØ][ÛŸJ_JK
ËšœÞ
J	Ý]N“YJ[™ÝXYÙ\ØË›[™ÝXYÙ\ÒXY[™ÊKY˜][]N’Ë›[™ÝXYÙ\ÒXY[™ËÛ•]PÚ[™ÙN™OO“™J[™ÝXYÙ\ØJK™\Ù]X™[’Ëœ™\Ù]]KÚ[™[ŽŠËšœÞ
JÝ˜[YN™K›[™ÝXYÙ\ßJ_JW_JW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜]ÐÚXÚØÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–ÊËšœÞ
JÜ[˜ØÚ[™[Ž˜8§$ØJKË˜]ÑÛÛÙ_JK
ËšœÞ
JØÚ[™[Ž’Ë˜]Ñ]Z[JW_JW_JW_JKÉ‰ŠËšœÞ
JYKÛ[™ÎšKÛÜšÜÜXÙN’Ù[XÝYÛÛXÝ[ÛŽœ™KÚÝÐ\˜Ú]™YœÙK˜Y˜[YN™K˜YÛÛXÝ[ÛŽžKÜ™X][Û“[ÙN™KÛ”Ù[XÝÛÛXÝ[ÛŽ›ÙKÛ”ÚÝÐ\˜Ú]™Y˜ÙKÛ‘˜Y˜[YN˜™KÛ‘˜YÛÛXÝ[ÛŽ”ÙKÛ”Ý\Ü™X]N™OOžÛ]Q™J
K\J
NÕJ
KÙJJK™JOOOXÛÜXØ	Û‹›˜[Y_H8 %ÛÜX˜
KÙJ‹˜ÛÛXÝ[Û’Y
_KÛØ[˜Ù[Ü™X]NŠ
OOž×ÙJ[
K™J
_KÛÜ™X]NÛ“Ü[Ž”YKÛ‘\XØ]N›Û”™[˜[YN›ÝÛ“[Ý™NœÝÛ\˜Ú]™NœÛ‘[]Nš]ÛÜ™X]PÛÛXÝ[ÛŽ˜]ÛÛÜÙNŠ
OO›™JLJ_JKÙI‰ŠËšœÞ
JÛ[™ÎšKÛ’[œÙ\”KÛÛÜÙNŠ
OOÙJLJ_JKI‰ŠËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜X›Ý]Ý™\›^X›ÛN˜™\Ù[][Û˜Û“[Ý\ÙQÝÛŽ™OOžÙK\™Ù]OOYK˜Ý\œ™[\™Ù]	‰‘YJLJ_KÚ[™[ŽŠËšœÞÊJÙXÝ[Û˜ØÛ\ÜÓ˜[YN˜X›Ý][™[›ÛN˜X[ÙØ˜\šXK[[Ù[Ž˜YX˜\šXK[X™[YžHŽ˜X›Ý]]]XÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜X›Ý]XYÚ[™[Ž–ÊËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜X›Ý]ÙÛØÚ[™[Ž˜ØJK
ËšœÞ
J]Û˜ÛÛÛXÚÎŠ
OO‘YJLJK˜\šXK[X™[Ž’Ë˜ÛÜÙKÚ[™[Ž˜0åØJW_JK
ËšœÞ
JÜ[˜ØÛ\ÜÓ˜[YN˜^YXœ›ÝØÚ[™[Ž˜ÓÑPÐQ‘HÓÑ•ÐT‘XJK
ËšœÞ
J˜ÚY˜X›Ý]]]XÚ[™[Ž’Ë˜X›Ý]\]_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜X›Ý]™\œÚ[Û˜Ú[™[Ž–ÒË™\œÚ[Û‹›™\œÚ[Û—_JK
ËšœÞ
JØÚ[™[Ž’Ë˜X›Ý]\ØÜš\[ÛŸJK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜X›Ý]]]Ü˜Ú[™[Ž–ÊËšœÞ
JÜ[˜ØÚ[™[Ž’Ë™]™[ÜYž_JK
ËšœÞ
JÝ›Û™ØØÚ[™[Ž˜˜Z[YHðè[˜Ú^ˆðèY[ž˜JW_JK
ËšœÞ
JØÛ\ÜÓ˜[YN˜X›Ý]šYÚØÚ[™[Ž’ËœšYÚßJK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜š[X\žXÛÛXÚÎŠ
OO‘YJLJKÚ[™[Ž’Ë˜ÛÜÙ_JW_J_JK‰‰ŠËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜ÛÝYÝ™\›^X›ÛN˜™\Ù[][Û˜Û“[Ý\ÙQÝÛŽ™OOžÙK\™Ù]OOYK˜Ý\œ™[\™Ù]	‰œ
LJ_KÚ[™[ŽŠËšœÞÊJÙXÝ[Û˜ØÛ\ÜÓ˜[YN˜ÛÝY[™[›ÛN˜X[ÙØ˜\šXK[[Ù[Ž˜YX˜\šXK[X™[YžHŽ˜ÛÝY]]XÚ[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÛÝYXYÚ[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
JÜ[˜ØÛ\ÜÓ˜[YN˜^YXœ›ÝØÚ[™[Ž˜ÓÑPÐQ‘HÓÕQJK
ËšœÞ
J˜ÚY˜ÛÝY]]XÚ[™[Ž’Ë˜ÛÝY]_JW_JK
ËšœÞ
J]Û˜ÛÛÛXÚÎŠ
OOœ
LJK˜\šXK[X™[Ž’Ë˜ÛÜÙKÚ[™[Ž˜0åØJW_JK
ËšœÞ
JØÛ\ÜÓ˜[YN˜ÛÝY[›ØÚ[™[Ž’Ë˜ÛÝY[›ßJK
ËšœÞÊJX™[ØÚ[™[Ž–ÒËœÞ[˜Ô\ÜÝÛÜ™
ËšœÞ
J[œ]ØÛ\ÜÓ˜[YN”K\N˜\ÜÝÛÜ™]]ÐÛÛ\]N˜Ý\œ™[\\ÜÝÛÜ™˜[YN‹ÛÚ[™ÙN™OOžJK\™Ù]˜[YJ_JK
ËšœÞ
JÛX[ØÛ\ÜÓ˜[YN˜[Ú[™[Ž’Ëœ\ÜÝÛÜ™Ø\›š[™ßJW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÛÝY›ÝšY\˜Ú[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž˜[X^›ÛˆPÌ˜JK
ËšœÞ
JÜ[˜ØÚ[™[Ž˜Ø	ÒË˜ÛÛ›™XÝYH0­È™]š\ÚpìÛˆ	ÐßX’Ë›ØØ[Û›_JW_JK
ËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜ÛÝYXÝ[ÛœØÚ[™[Ž˜ÊËšœÞÊJË‘œ˜YÛY[ØÚ[™[Ž–ÊËšœÞ
J]Û˜ÛÛÛXÚÎ•ÙKÚ[™[Ž’Ë›ØYXÌŸJK
ËšœÞ
J]Û˜ÛÛÛXÚÎ•YKÚ[™[Ž’Ë™\ØÛÛ›™XÝJW_JNŠËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜š[X\žX\ØX›Yˆ]‹ÛÛXÚÎ’KÚ[™[Ž’Ë˜ÛÛ›™XÝXÌŸJ_JW_JK‰‰•›[™ÝŒ	‰ŠËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜™]š\Ú[Û”XÚÙ\˜Ú[™[Ž–ÊËšœÞÊJX™[ØÚ[™[Ž–ÒËš\ÝÜžK
ËšœÞ
JÙ[XÝØÛ\ÜÓ˜[YN”K˜[YN‘ÛÚ[™ÙN™OO“Ê[X™\ŠK\™Ù]˜[YJJKÚ[™[Ž•›X\
OOŠËšœÞÊJÜ[Û˜Ý˜[YN™Kœ™]š\Ú[Û‹Ú[™[Ž–ØØKœ™]š\Ú[Û‹0­È™]È]JKœØ]™Y]
KÓØØ[TÝš[™ÊJW_KKœ™]š\Ú[ÛŠJ_JW_JK
ËšœÞ
J]Û˜ÛÛÛXÚÎ‘ÙKÚ[™[Ž’Ë›ØY™]š\Ú[ÛŸJW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÛÝY›ÝšY\˜Ú[™[Ž–ÊËšœÞÊJ]˜ØÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž˜ÛÛÙÛHš]™XJK
ËšœÞ
JÜ[˜ØÚ[™[ŽšÏÒË™š]™T™XYN“‹™ÛÛÙÛPÛY[YÒË™š]™P]˜Z[X›N’Ë™š]™U[˜]˜Z[X›_JK
ËšœÞ
JÛX[ØÛ\ÜÓ˜[YN˜[Ú[™[Ž’Ë™š]™Qš[\ßJW_JK
ËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜ÛÝYXÝ[ÛœØÚ[™[ŽšÏÊËšœÞ
J]Û˜ÛÛÛXÚÎœYKÚ[™[Ž’Ë›ØYš]™_JNŠËšœÞ
J]Û˜Ù\ØX›YˆS‹™ÛÛÙÛPÛY[YÛÛXÚÎ’ÙKÚ[™[Ž’Ë˜ÛÛ›™XÝš]™_J_JW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÛÝYÜX›XÚ[™[Ž–ÊËšœÞ
J]Û˜ÛÛÛXÚÎ’™KÚ[™[Ž’Ë™^Ü˜XÚÝ\JK
ËšœÞÊJX™[ØÚ[™[Ž–ÒËš[\Ü˜XÚÝ\
ËšœÞ
J[œ]Ý\N˜š[XXØÙ\˜\XØ][Û‹ÚœÛÛ‹šœÛÛ˜ÛÚ[™ÙN–Y_JW_JW_JK
ËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÛÝY›ÝXÙH	Û_XÚ[™[Ž–ÖKÉ‰ŠËšœÞ
JÛX[ØÚ[™[Ž™ßJW_JK
ËšœÞ
J]Û˜ØÛ\ÜÓ˜[YN˜ÛÝYÛÜÙXÛÛXÚÎŠ
OOœ
LJKÚ[™[Ž’Ë˜ÛÜÙ_JW_J_JW_J_Y[˜Ý[Ûˆ›
ÛX™[™KÚYNÚ[™[Ž›ŸJ^Ü™]\›ŠËšœÞÊJX™[ØÛ\ÜÓ˜[YNØÚYX˜Ú[™[Ž–ÙK—_J_Y[˜Ý[Ûˆ[
Ý˜[YN™_J^Ü™]\›ŠËšœÞ
J]˜ØÛ\ÜÓ˜[YN˜ÛÛØ]YÛÜšY\ØÚ[™[Ž›
JK›X\

K
OO™K˜Ø]YÛÜžOÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜ÛÛØ]YÛÜžXÚ[™[Ž–ÊËšœÞ
J˜ØÚ[™[Ž™K˜Ø]YÛÜž_JK
ËšœÞ
JØÚ[™[Ž™K˜ÛÛ[JW_K	ÙK˜Ø]YÛÜž_KIÝX
NŠËšœÞ
JØÛ\ÜÓ˜[YN˜ÚÚ[^Ú[™[Ž™K˜ÛÛ[K
J_J_Y[˜Ý[Ûˆ
Ý˜[YN™_J^Ü™]\›ŠËšœÞ
JË‘œ˜YÛY[ØÚ[™[Ž›
JK›X\

K
OOŠËšœÞ
JØÛ\ÜÓ˜[YN˜ÝXÝ\™Y[™XÚ[™[Ž™K˜Ø]YÛÜžOÊËšœÞÊJË‘œ˜YÛY[ØÚ[™[Ž–ÊËšœÞÊJ˜ØÚ[™[Ž–ÙK˜Ø]YÛÜžKK˜ÛÛ[Ø˜˜_JKK˜ÛÛ[	‰ŠËšœÞÊJË‘œ˜YÛY[ØÚ[™[Ž–Ø
ËšœÞ
J›Ý˜[YN™K˜ÛÛ[JW_JW_JNŠËšœÞ
J›Ý˜[YN™K˜ÛÛ[J_K
J_J_Y[˜Ý[Ûˆ›
Ý˜[YN™_J^Û]V×KK×Ê×—WJÊWW

ÏÎ—×Ö×—ÊWJÊW
KÙÚKLÙ›ÜŠ]HÙˆK›X]Ú[
ŠJJKš[™^ÏÌ
Oœ‰‰œ\Ú
KœÛXÙJ‹Kš[™^
JKœ\Ú

ËšœÞ
JXÚ™YŽšVÌ—K\™Ù]˜Ø›[šØ™[˜›Ü™Y™\œ™\˜Ú[™[ŽšVÌW_K	ÚKš[™^KIÚVÌ—_X
JKJKš[™^ÏÌ
JÚVÌK›[™ÝÜ™]\›ˆK›[™Ý	‰œ\Ú
KœÛXÙJŠJK
ËšœÞ
JË‘œ˜YÛY[ØÚ[™[ŽJ_Y[˜Ý[Ûˆ[
Ý˜[YN™_J^Û]YK›X]Ú
×—
—
ŠŠÏÊW
—
‰ÊNÜ™]\›ˆÊËšœÞ
J˜ØÚ[™[ŽŠËšœÞ
J›Ý˜[YNÌW_J_JNŠËšœÞ
J›Ý˜[YN™_J_Y[˜Ý[Ûˆ	
Ý]N™KY˜][]NÛ•]PÚ[™ÙN›‹™\Ù]X™[œ‹Ú[™[Žš_J^Ü™]\›ŠËšœÞÊJÙXÝ[Û˜ØÛ\ÜÓ˜[YN˜Ý”ÙXÝ[Û˜Ú[™[Ž–ÊËšœÞÊJ]˜ØÛ\ÜÓ˜[YN˜Y]X›TÙXÝ[Û•]XÚ[™[Ž–ÊËšœÞ
J[œ]È˜\šXK[X™[ŽK˜[YN™KÛÚ[™ÙN™OO›ËŠK\™Ù]˜[YJK™XYÛ›Nˆ[ŸJK‰‰™HOO]	‰ŠËšœÞ
J]Û˜Ý\N˜]Û˜]Nœ‹˜\šXK[X™[Žœ‹ÛÛXÚÎŠ
OO›Š
KÚ[™[Ž˜8¡®˜JW_JKW_J_JË˜Ü™X]T›ÛÝ
JØÝ[Y[™Ù][[Y[žRY
›ÛÝ
JKœ™[™\Š
ËšœÞ
J”ÝšXÝ[ÙKØÚ[™[ŽŠËšœÞ
J[ßJ_JJNÙ^ÜÑ[\ÈN