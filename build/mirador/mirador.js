//! Mirador 0.9.0
//! Built on 2014-08-29
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);

var Handlebars = (function() {
// handlebars/safe-string.js
var __module4__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module3__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  var SafeString = __dependency1__;

  var isArray = Array.isArray;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr] || "&amp;";
  }

  function extend(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  }

  __exports__.extend = extend;function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (!string && string !== 0) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;
  return __exports__;
})(__module4__);

// handlebars/exception.js
var __module5__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(/* message */) {
    var tmp = Error.prototype.constructor.apply(this, arguments);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module2__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  /*globals Exception, Utils */
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "1.1.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '>= 1.0.0'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var toString = Object.prototype.toString,
      objectType = '[object Object]';

  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }

  function isArray(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  }

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn, inverse) {
      if (toString.call(name) === objectType) {
        if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        if (inverse) { fn.not = inverse; }
        this.helpers[name] = fn;
      }
    },

    registerPartial: function(name, str) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = str;
      }
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Error("Missing helper: '" + arg + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;

      if (isFunction(context)) { context = context.call(this); }

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });

    instance.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0)
              data.last  = (i === (context.length-1));
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) { data.key = key; }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      if (!Utils.isEmpty(context)) return options.fn(context);
    });

    instance.registerHelper('log', function(context, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, context);
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, obj) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, obj);
        }
      }
    }
  };
  __exports__.logger = logger;
  function log(level, obj) { logger.log(level, obj); }

  __exports__.log = log;var createFrame = function(object) {
    var obj = {};
    Utils.extend(obj, object);
    return obj;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module3__, __module5__);

// handlebars/runtime.js
var __module6__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  /*global Utils */
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Error("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Error("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  // TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    if (!env) {
      throw new Error("No environment passed to template");
    }

    var invokePartialWrapper;
    if (env.compile) {
      invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
        // TODO : Check this for all inputs and the options handling (partial flag, etc). This feels
        // like there should be a common exec path
        var result = invokePartial.apply(this, arguments);
        if (result) { return result; }

        var options = { helpers: helpers, partials: partials, data: data };
        partials[name] = env.compile(partial, { data: data !== undefined }, env);
        return partials[name](context, options);
      };
    } else {
      invokePartialWrapper = function(partial, name /* , context, helpers, partials, data */) {
        var result = invokePartial.apply(this, arguments);
        if (result) { return result; }
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      };
    }

    // Just add water
    var container = {
      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = {};
          Utils.extend(ret, common);
          Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: programWithDepth,
      noop: noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var namespace = options.partial ? options : env,
          helpers,
          partials;

      if (!options.partial) {
        helpers = options.helpers;
        partials = options.partials;
      }
      var result = templateSpec.call(
            container,
            namespace, context,
            helpers,
            partials,
            options.data);

      if (!options.partial) {
        checkRevision(container.compilerInfo);
      }

      return result;
    };
  }

  __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var prog = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    prog.program = i;
    prog.depth = args.length;
    return prog;
  }

  __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
    var prog = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    prog.program = i;
    prog.depth = 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;
  return __exports__;
})(__module3__, __module5__, __module2__);

// handlebars.runtime.js
var __module1__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module2__, __module4__, __module5__, __module3__, __module6__);

// handlebars/compiler/ast.js
var __module7__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;

  function ProgramNode(statements, inverseStrip, inverse) {
    this.type = "program";
    this.statements = statements;
    this.strip = {};

    if(inverse) {
      this.inverse = new ProgramNode(inverse, inverseStrip);
      this.strip.right = inverseStrip.left;
    } else if (inverseStrip) {
      this.strip.left = inverseStrip.right;
    }
  }

  __exports__.ProgramNode = ProgramNode;function MustacheNode(rawParams, hash, open, strip) {
    this.type = "mustache";
    this.hash = hash;
    this.strip = strip;

    var escapeFlag = open[3] || open[2];
    this.escaped = escapeFlag !== '{' && escapeFlag !== '&';

    var id = this.id = rawParams[0];
    var params = this.params = rawParams.slice(1);

    // a mustache is an eligible helper if:
    // * its id is simple (a single part, not `this` or `..`)
    var eligibleHelper = this.eligibleHelper = id.isSimple;

    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    this.isHelper = eligibleHelper && (params.length || hash);

    // if a mustache is an eligible helper but not a definite
    // helper, it is ambiguous, and will be resolved in a later
    // pass or at runtime.
  }

  __exports__.MustacheNode = MustacheNode;function PartialNode(partialName, context, strip) {
    this.type         = "partial";
    this.partialName  = partialName;
    this.context      = context;
    this.strip = strip;
  }

  __exports__.PartialNode = PartialNode;function BlockNode(mustache, program, inverse, close) {
    if(mustache.id.original !== close.path.original) {
      throw new Exception(mustache.id.original + " doesn't match " + close.path.original);
    }

    this.type = "block";
    this.mustache = mustache;
    this.program  = program;
    this.inverse  = inverse;

    this.strip = {
      left: mustache.strip.left,
      right: close.strip.right
    };

    (program || inverse).strip.left = mustache.strip.right;
    (inverse || program).strip.right = close.strip.left;

    if (inverse && !program) {
      this.isInverse = true;
    }
  }

  __exports__.BlockNode = BlockNode;function ContentNode(string) {
    this.type = "content";
    this.string = string;
  }

  __exports__.ContentNode = ContentNode;function HashNode(pairs) {
    this.type = "hash";
    this.pairs = pairs;
  }

  __exports__.HashNode = HashNode;function IdNode(parts) {
    this.type = "ID";

    var original = "",
        dig = [],
        depth = 0;

    for(var i=0,l=parts.length; i<l; i++) {
      var part = parts[i].part;
      original += (parts[i].separator || '') + part;

      if (part === ".." || part === "." || part === "this") {
        if (dig.length > 0) { throw new Exception("Invalid path: " + original); }
        else if (part === "..") { depth++; }
        else { this.isScoped = true; }
      }
      else { dig.push(part); }
    }

    this.original = original;
    this.parts    = dig;
    this.string   = dig.join('.');
    this.depth    = depth;

    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

    this.stringModeValue = this.string;
  }

  __exports__.IdNode = IdNode;function PartialNameNode(name) {
    this.type = "PARTIAL_NAME";
    this.name = name.original;
  }

  __exports__.PartialNameNode = PartialNameNode;function DataNode(id) {
    this.type = "DATA";
    this.id = id;
  }

  __exports__.DataNode = DataNode;function StringNode(string) {
    this.type = "STRING";
    this.original =
      this.string =
      this.stringModeValue = string;
  }

  __exports__.StringNode = StringNode;function IntegerNode(integer) {
    this.type = "INTEGER";
    this.original =
      this.integer = integer;
    this.stringModeValue = Number(integer);
  }

  __exports__.IntegerNode = IntegerNode;function BooleanNode(bool) {
    this.type = "BOOLEAN";
    this.bool = bool;
    this.stringModeValue = bool === "true";
  }

  __exports__.BooleanNode = BooleanNode;function CommentNode(comment) {
    this.type = "comment";
    this.comment = comment;
  }

  __exports__.CommentNode = CommentNode;
  return __exports__;
})(__module5__);

// handlebars/compiler/parser.js
var __module9__ = (function() {
  "use strict";
  var __exports__;
  /* Jison generated parser */
  var handlebars = (function(){
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"partial_option0":27,"inMustache_repetition0":28,"inMustache_option0":29,"dataName":30,"param":31,"STRING":32,"INTEGER":33,"BOOLEAN":34,"hash":35,"hash_repetition_plus0":36,"hashSegment":37,"ID":38,"EQUALS":39,"DATA":40,"pathSegments":41,"SEP":42,"$accept":0,"$end":1},
  terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",38:"ID",39:"EQUALS",40:"DATA",42:"SEP"},
  productions_: [0,[3,2],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[35,1],[37,3],[26,1],[26,1],[26,1],[30,2],[21,1],[41,3],[41,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[36,1],[36,2]],
  performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1: return new yy.ProgramNode($$[$0-1]);
  break;
  case 2:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0]);
  break;
  case 3:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0]);
  break;
  case 4:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], []);
  break;
  case 5:this.$ = new yy.ProgramNode($$[$0]);
  break;
  case 6:this.$ = new yy.ProgramNode([]);
  break;
  case 7:this.$ = new yy.ProgramNode([]);
  break;
  case 8:this.$ = [$$[$0]];
  break;
  case 9: $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
  break;
  case 10:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]);
  break;
  case 11:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]);
  break;
  case 12:this.$ = $$[$0];
  break;
  case 13:this.$ = $$[$0];
  break;
  case 14:this.$ = new yy.ContentNode($$[$0]);
  break;
  case 15:this.$ = new yy.CommentNode($$[$0]);
  break;
  case 16:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 17:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 18:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
  break;
  case 19:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 20:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 21:this.$ = new yy.PartialNode($$[$0-2], $$[$0-1], stripFlags($$[$0-3], $$[$0]));
  break;
  case 22:this.$ = stripFlags($$[$0-1], $$[$0]);
  break;
  case 23:this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]];
  break;
  case 24:this.$ = [[$$[$0]], null];
  break;
  case 25:this.$ = $$[$0];
  break;
  case 26:this.$ = new yy.StringNode($$[$0]);
  break;
  case 27:this.$ = new yy.IntegerNode($$[$0]);
  break;
  case 28:this.$ = new yy.BooleanNode($$[$0]);
  break;
  case 29:this.$ = $$[$0];
  break;
  case 30:this.$ = new yy.HashNode($$[$0]);
  break;
  case 31:this.$ = [$$[$0-2], $$[$0]];
  break;
  case 32:this.$ = new yy.PartialNameNode($$[$0]);
  break;
  case 33:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0]));
  break;
  case 34:this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0]));
  break;
  case 35:this.$ = new yy.DataNode($$[$0]);
  break;
  case 36:this.$ = new yy.IdNode($$[$0]);
  break;
  case 37: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2];
  break;
  case 38:this.$ = [{part: $$[$0]}];
  break;
  case 41:this.$ = [];
  break;
  case 42:$$[$0-1].push($$[$0]);
  break;
  case 45:this.$ = [$$[$0]];
  break;
  case 46:$$[$0-1].push($$[$0]);
  break;
  }
  },
  table: [{3:1,4:2,8:3,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,10],22:[1,12],23:[1,13],25:[1,14]},{1:[3]},{5:[1,15],8:16,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,10],22:[1,12],23:[1,13],25:[1,14]},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],25:[2,8]},{4:19,6:17,7:18,8:3,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,20],20:[2,7],22:[1,12],23:[1,13],25:[1,14]},{4:19,6:21,7:18,8:3,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,20],20:[2,7],22:[1,12],23:[1,13],25:[1,14]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{17:22,21:23,30:24,38:[1,27],40:[1,26],41:25},{17:28,21:23,30:24,38:[1,27],40:[1,26],41:25},{17:29,21:23,30:24,38:[1,27],40:[1,26],41:25},{17:30,21:23,30:24,38:[1,27],40:[1,26],41:25},{21:32,26:31,32:[1,33],33:[1,34],38:[1,27],41:25},{1:[2,1]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{10:35,20:[1,36]},{4:37,8:3,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,10],20:[2,6],22:[1,12],23:[1,13],25:[1,14]},{7:38,8:16,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,20],20:[2,5],22:[1,12],23:[1,13],25:[1,14]},{17:22,18:[1,39],21:23,30:24,38:[1,27],40:[1,26],41:25},{10:40,20:[1,36]},{18:[1,41]},{18:[2,41],24:[2,41],28:42,32:[2,41],33:[2,41],34:[2,41],38:[2,41],40:[2,41]},{18:[2,24],24:[2,24]},{18:[2,36],24:[2,36],32:[2,36],33:[2,36],34:[2,36],38:[2,36],40:[2,36],42:[1,43]},{21:44,38:[1,27],41:25},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],38:[2,38],40:[2,38],42:[2,38]},{18:[1,45]},{18:[1,46]},{24:[1,47]},{18:[2,39],21:49,27:48,38:[1,27],41:25},{18:[2,32],38:[2,32]},{18:[2,33],38:[2,33]},{18:[2,34],38:[2,34]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{21:50,38:[1,27],41:25},{8:16,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,10],20:[2,2],22:[1,12],23:[1,13],25:[1,14]},{4:51,8:3,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,10],20:[2,4],22:[1,12],23:[1,13],25:[1,14]},{14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{18:[2,43],21:55,24:[2,43],29:52,30:59,31:53,32:[1,56],33:[1,57],34:[1,58],35:54,36:60,37:61,38:[1,62],40:[1,26],41:25},{38:[1,63]},{18:[2,35],24:[2,35],32:[2,35],33:[2,35],34:[2,35],38:[2,35],40:[2,35]},{14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{18:[1,64]},{18:[2,40]},{18:[1,65]},{8:16,9:4,11:5,12:6,13:7,14:[1,8],15:[1,9],16:[1,11],19:[1,10],20:[2,3],22:[1,12],23:[1,13],25:[1,14]},{18:[2,23],24:[2,23]},{18:[2,42],24:[2,42],32:[2,42],33:[2,42],34:[2,42],38:[2,42],40:[2,42]},{18:[2,44],24:[2,44]},{18:[2,25],24:[2,25],32:[2,25],33:[2,25],34:[2,25],38:[2,25],40:[2,25]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],38:[2,26],40:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],38:[2,27],40:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],38:[2,28],40:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],38:[2,29],40:[2,29]},{18:[2,30],24:[2,30],37:66,38:[1,67]},{18:[2,45],24:[2,45],38:[2,45]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],38:[2,38],39:[1,68],40:[2,38],42:[2,38]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],38:[2,37],40:[2,37],42:[2,37]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,46],24:[2,46],38:[2,46]},{39:[1,68]},{21:55,30:59,31:69,32:[1,56],33:[1,57],34:[1,58],38:[1,27],40:[1,26],41:25},{18:[2,31],24:[2,31],38:[2,31]}],
  defaultActions: {15:[2,1],49:[2,40]},
  parseError: function parseError(str, hash) {
      throw new Error(str);
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      this.yy.parser = this;
      if (typeof this.lexer.yylloc == "undefined")
          this.lexer.yylloc = {};
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
      var ranges = this.lexer.options && this.lexer.options.ranges;
      if (typeof this.yy.parseError === "function")
          this.parseError = this.yy.parseError;
      function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
      }
      function lex() {
          var token;
          token = self.lexer.lex() || 1;
          if (typeof token !== "number") {
              token = self.symbols_[token] || token;
          }
          return token;
      }
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == "undefined") {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                  expected = [];
                  for (p in table[state])
                      if (this.terminals_[p] && p > 2) {
                          expected.push("'" + this.terminals_[p] + "'");
                      }
                  if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                  } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                  }
                  this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
              }
          }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                      recovering--;
              } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
              if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }
  };


  function stripFlags(open, close) {
    return {
      left: open[2] === '~',
      right: close[0] === '~' || close[1] === '~'
    };
  }

  /* Jison generated lexer */
  var lexer = (function(){
  var lexer = ({EOF:1,
  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },
  setInput:function (input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
          if (this.options.ranges) this.yylloc.range = [0,0];
          this.offset = 0;
          return this;
      },
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) this.yylloc.range[1]++;

          this._input = this._input.slice(1);
          return ch;
      },
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length-1);
          this.matched = this.matched.substr(0, this.matched.length-1);

          if (lines.length-1) this.yylineno -= lines.length-1;
          var r = this.yylloc.range;

          this.yylloc = {first_line: this.yylloc.first_line,
            last_line: this.yylineno+1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
                this.yylloc.first_column - len
            };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
      },
  more:function () {
          this._more = true;
          return this;
      },
  less:function (n) {
          this.unput(this.match.slice(n));
      },
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
      },
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c+"^";
      },
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) this.done = true;

          var token,
              match,
              tempMatch,
              index,
              col,
              lines;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i=0;i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (!this.options.flex) break;
              }
          }
          if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {first_line: this.yylloc.last_line,
                             last_line: this.yylineno+1,
                             first_column: this.yylloc.last_column,
                             last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                  this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                      {text: "", token: null, line: this.yylineno});
          }
      },
  lex:function lex() {
          var r = this.next();
          if (typeof r !== 'undefined') {
              return r;
          } else {
              return this.lex();
          }
      },
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },
  popState:function popState() {
          return this.conditionStack.pop();
      },
  _currentRules:function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
      },
  topState:function () {
          return this.conditionStack[this.conditionStack.length-2];
      },
  pushState:function begin(condition) {
          this.begin(condition);
      }});
  lexer.options = {};
  lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


  function strip(start, end) {
    return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
  }


  var YYSTATE=YY_START
  switch($avoiding_name_collisions) {
  case 0:
                                     if(yy_.yytext.slice(-2) === "\\\\") {
                                       strip(0,1);
                                       this.begin("mu");
                                     } else if(yy_.yytext.slice(-1) === "\\") {
                                       strip(0,1);
                                       this.begin("emu");
                                     } else {
                                       this.begin("mu");
                                     }
                                     if(yy_.yytext) return 14;

  break;
  case 1:return 14;
  break;
  case 2:
                                     if(yy_.yytext.slice(-1) !== "\\") this.popState();
                                     if(yy_.yytext.slice(-1) === "\\") strip(0,1);
                                     return 14;

  break;
  case 3:strip(0,4); this.popState(); return 15;
  break;
  case 4:return 25;
  break;
  case 5:return 16;
  break;
  case 6:return 20;
  break;
  case 7:return 19;
  break;
  case 8:return 19;
  break;
  case 9:return 23;
  break;
  case 10:return 22;
  break;
  case 11:this.popState(); this.begin('com');
  break;
  case 12:strip(3,5); this.popState(); return 15;
  break;
  case 13:return 22;
  break;
  case 14:return 39;
  break;
  case 15:return 38;
  break;
  case 16:return 38;
  break;
  case 17:return 42;
  break;
  case 18:/*ignore whitespace*/
  break;
  case 19:this.popState(); return 24;
  break;
  case 20:this.popState(); return 18;
  break;
  case 21:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 32;
  break;
  case 22:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 32;
  break;
  case 23:return 40;
  break;
  case 24:return 34;
  break;
  case 25:return 34;
  break;
  case 26:return 33;
  break;
  case 27:return 38;
  break;
  case 28:yy_.yytext = strip(1,2); return 38;
  break;
  case 29:return 'INVALID';
  break;
  case 30:return 5;
  break;
  }
  };
  lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s])))/,/^(?:false(?=([~}\s])))/,/^(?:-?[0-9]+(?=([~}\s])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
  lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"INITIAL":{"rules":[0,1,30],"inclusive":true}};
  return lexer;})()
  parser.lexer = lexer;
  function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();__exports__ = handlebars;
  return __exports__;
})();

// handlebars/compiler/base.js
var __module8__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var parser = __dependency1__;
  var AST = __dependency2__;

  __exports__.parser = parser;

  function parse(input) {
    // Just return if an already-compile AST was passed in.
    if(input.constructor === AST.ProgramNode) { return input; }

    parser.yy = AST;
    return parser.parse(input);
  }

  __exports__.parse = parse;
  return __exports__;
})(__module9__, __module7__);

// handlebars/compiler/javascript-compiler.js
var __module11__ = (function(__dependency1__) {
  "use strict";
  var __exports__;
  var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
  var log = __dependency1__.log;

  function Literal(value) {
    this.value = value;
  }

  function JavaScriptCompiler() {}

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name /* , type*/) {
      var wrap,
          ret;
      if (parent.indexOf('depth') === 0) {
        wrap = true;
      }

      if (/^[0-9]+$/.test(name)) {
        ret = parent + "[" + name + "]";
      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        ret = parent + "." + name;
      }
      else {
        ret = parent + "['" + name + "']";
      }

      if (wrap) {
        return '(' + parent + ' && ' + ret + ')';
      } else {
        return ret;
      }
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return {
          appendToBuffer: true,
          content: string,
          toString: function() { return "buffer += " + string + ";"; }
        };
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options || {};

      log('debug', this.environment.disassemble() + "\n\n");

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        environments: [],
        aliases: { }
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.registers = { list: [] };
      this.compileStack = [];
      this.inlineStack = [];

      this.compileChildren(environment, options);

      var opcodes = environment.opcodes, opcode;

      this.i = 0;

      for(var l=opcodes.length; this.i<l; this.i++) {
        opcode = opcodes[this.i];

        if(opcode.opcode === 'DECLARE') {
          this[opcode.name] = opcode.value;
        } else {
          this[opcode.opcode].apply(this, opcode.args);
        }

        // Reset the stripNext flag if it was not set by this operation.
        if (opcode.opcode !== this.stripNext) {
          this.stripNext = false;
        }
      }

      // Flush any trailing content that might be pending.
      this.pushSource('');

      return this.createFunctionContext(asObject);
    },

    preamble: function() {
      var out = [];

      if (!this.isChild) {
        var namespace = this.namespace;

        var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
        if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
        if (this.options.data) { copies = copies + " data = data || {};"; }
        out.push(copies);
      } else {
        out.push('');
      }

      if (!this.environment.isSimple) {
        out.push(", buffer = " + this.initializeBuffer());
      } else {
        out.push("");
      }

      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = out;
    },

    createFunctionContext: function(asObject) {
      var locals = this.stackVars.concat(this.registers.list);

      if(locals.length > 0) {
        this.source[1] = this.source[1] + ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      if (!this.isChild) {
        for (var alias in this.context.aliases) {
          if (this.context.aliases.hasOwnProperty(alias)) {
            this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
          }
        }
      }

      if (this.source[1]) {
        this.source[1] = "var " + this.source[1].substring(2) + ";";
      }

      // Merge children
      if (!this.isChild) {
        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
      }

      if (!this.environment.isSimple) {
        this.pushSource("return buffer;");
      }

      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

      for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
        params.push("depth" + this.environment.depths.list[i]);
      }

      // Perform a second pass over the output to merge content when possible
      var source = this.mergeSource();

      if (!this.isChild) {
        var revision = COMPILER_REVISION,
            versions = REVISION_CHANGES[revision];
        source = "this.compilerInfo = ["+revision+",'"+versions+"'];\n"+source;
      }

      if (asObject) {
        params.push(source);

        return Function.apply(this, params);
      } else {
        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
        log('debug', functionSource + "\n\n");
        return functionSource;
      }
    },
    mergeSource: function() {
      // WARN: We are not handling the case where buffer is still populated as the source should
      // not have buffer append operations as their final action.
      var source = '',
          buffer;
      for (var i = 0, len = this.source.length; i < len; i++) {
        var line = this.source[i];
        if (line.appendToBuffer) {
          if (buffer) {
            buffer = buffer + '\n    + ' + line.content;
          } else {
            buffer = line.content;
          }
        } else {
          if (buffer) {
            source += 'buffer += ' + buffer + ';\n  ';
            buffer = undefined;
          }
          source += line + '\n  ';
        }
      }
      return source;
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      this.replaceStack(function(current) {
        params.splice(1, 0, current);
        return "blockHelperMissing.call(" + params.join(", ") + ")";
      });
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      var current = this.topStack();
      params.splice(1, 0, current);

      // Use the options value generated from the invocation
      params[params.length-1] = 'options';

      this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      }
      if (this.stripNext) {
        content = content.replace(/^\s+/, '');
      }

      this.pendingContent = content;
    },

    // [strip]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Removes any trailing whitespace from the prior content node and flags
    // the next operation for stripping if it is a content node.
    strip: function() {
      if (this.pendingContent) {
        this.pendingContent = this.pendingContent.replace(/\s+$/, '');
      }
      this.stripNext = 'strip';
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      // Force anything that is inlined onto the stack so we don't have duplication
      // when we examine local
      this.flushInline();
      var local = this.popStack();
      this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
      if (this.environment.isSimple) {
        this.pushSource("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.context.aliases.escapeExpression = 'this.escapeExpression';

      this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      if(this.lastContext !== depth) {
        this.lastContext = depth;
      }
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(name) {
      this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral('depth' + this.lastContext);
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.context.aliases.functionType = '"function"';

      this.replaceStack(function(current) {
        return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
      });
    },

    // [lookup]
    //
    // On stack, before: value, ...
    // On stack, after: value[name], ...
    //
    // Replace the value on the stack with the result of looking
    // up `name` on `value`
    lookup: function(name) {
      this.replaceStack(function(current) {
        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
      });
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function() {
      this.push('data');
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string, type) {
      this.pushStackLiteral('depth' + this.lastContext);

      this.pushString(type);

      if (typeof string === 'string') {
        this.pushString(string);
      } else {
        this.pushStackLiteral(string);
      }
    },

    emptyHash: function() {
      this.pushStackLiteral('{}');

      if (this.options.stringParams) {
        this.register('hashTypes', '{}');
        this.register('hashContexts', '{}');
      }
    },
    pushHash: function() {
      this.hash = {values: [], types: [], contexts: []};
    },
    popHash: function() {
      var hash = this.hash;
      this.hash = undefined;

      if (this.options.stringParams) {
        this.register('hashContexts', '{' + hash.contexts.join(',') + '}');
        this.register('hashTypes', '{' + hash.types.join(',') + '}');
      }
      this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.inlineStack.push(expr);
      return expr;
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name) {
      this.context.aliases.helperMissing = 'helpers.helperMissing';

      var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

      this.push(helper.name + ' || ' + nonHelper);
      this.replaceStack(function(name) {
        return name + ' ? ' + name + '.call(' +
            helper.callParams + ") " + ": helperMissing.call(" +
            helper.helperMissingParams + ")";
      });
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.push(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name, helperCall) {
      this.context.aliases.functionType = '"function"';

      this.pushStackLiteral('{}');    // Hash value
      var helper = this.setupHelper(0, name, helperCall);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
      var nextStack = this.nextStack();

      this.pushSource('if (' + nextStack + ' = ' + helperName + ') { ' + nextStack + ' = ' + nextStack + '.call(' + helper.callParams + '); }');
      this.pushSource('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '.call(' + helper.callParams + ') : ' + nextStack + '; }');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      }

      this.context.aliases.self = "this";
      this.push("self.invokePartial(" + params.join(", ") + ")");
    },

    // [assignToHash]
    //
    // On stack, before: value, hash, ...
    // On stack, after: hash, ...
    //
    // Pops a value and hash off the stack, assigns `hash[key] = value`
    // and pushes the hash back onto the stack.
    assignToHash: function(key) {
      var value = this.popStack(),
          context,
          type;

      if (this.options.stringParams) {
        type = this.popStack();
        context = this.popStack();
      }

      var hash = this.hash;
      if (context) {
        hash.contexts.push("'" + key + "': " + context);
      }
      if (type) {
        hash.types.push("'" + key + "': " + type);
      }
      hash.values.push("'" + key + "': (" + value + ")");
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        var index = this.matchExistingProgram(child);

        if (index == null) {
          this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
          index = this.context.programs.length;
          child.index = index;
          child.name = 'program' + index;
          this.context.programs[index] = compiler.compile(child, options, this.context);
          this.context.environments[index] = child;
        } else {
          child.index = index;
          child.name = 'program' + index;
        }
      }
    },
    matchExistingProgram: function(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return i;
        }
      }
    },

    programExpression: function(guid) {
      this.context.aliases.self = "this";

      if(guid == null) {
        return "self.noop";
      }

      var child = this.environment.children[guid],
          depths = child.depths.list, depth;

      var programParams = [child.index, child.name, "data"];

      for(var i=0, l = depths.length; i<l; i++) {
        depth = depths[i];

        if(depth === 1) { programParams.push("depth0"); }
        else { programParams.push("depth" + (depth - 1)); }
      }

      return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
    },

    register: function(name, val) {
      this.useRegister(name);
      this.pushSource(name + " = " + val + ";");
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      return this.push(new Literal(item));
    },

    pushSource: function(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
        this.pendingContent = undefined;
      }

      if (source) {
        this.source.push(source);
      }
    },

    pushStack: function(item) {
      this.flushInline();

      var stack = this.incrStack();
      if (item) {
        this.pushSource(stack + " = " + item + ";");
      }
      this.compileStack.push(stack);
      return stack;
    },

    replaceStack: function(callback) {
      var prefix = '',
          inline = this.isInline(),
          stack;

      // If we are currently inline then we want to merge the inline statement into the
      // replacement statement via ','
      if (inline) {
        var top = this.popStack(true);

        if (top instanceof Literal) {
          // Literals do not need to be inlined
          stack = top.value;
        } else {
          // Get or create the current stack name for use by the inline
          var name = this.stackSlot ? this.topStackName() : this.incrStack();

          prefix = '(' + this.push(name) + ' = ' + top + '),';
          stack = this.topStack();
        }
      } else {
        stack = this.topStack();
      }

      var item = callback.call(this, stack);

      if (inline) {
        if (this.inlineStack.length || this.compileStack.length) {
          this.popStack();
        }
        this.push('(' + prefix + item + ')');
      } else {
        // Prevent modification of the context depth variable. Through replaceStack
        if (!/^stack/.test(stack)) {
          stack = this.nextStack();
        }

        this.pushSource(stack + " = (" + prefix + item + ");");
      }
      return stack;
    },

    nextStack: function() {
      return this.pushStack();
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var inlineStack = this.inlineStack;
      if (inlineStack.length) {
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            this.pushStack(entry);
          }
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },

    popStack: function(wrapped) {
      var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        if (!inline) {
          this.stackSlot--;
        }
        return item;
      }
    },

    topStack: function(wrapped) {
      var stack = (this.isInline() ? this.inlineStack : this.compileStack),
          item = stack[stack.length - 1];

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        return item;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, '\\u2029') + '"';
    },

    setupHelper: function(paramSize, name, missingParams) {
      var params = [];
      this.setupParams(paramSize, params, missingParams);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        name: foundHelper,
        callParams: ["depth0"].concat(params).join(", "),
        helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
      };
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(paramSize, params, useRegister) {
      var options = [], contexts = [], types = [], param, inverse, program;

      options.push("hash:" + this.popStack());

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          this.context.aliases.self = "this";
          program = "self.noop";
        }

        if (!inverse) {
         this.context.aliases.self = "this";
          inverse = "self.noop";
        }

        options.push("inverse:" + inverse);
        options.push("fn:" + program);
      }

      for(var i=0; i<paramSize; i++) {
        param = this.popStack();
        params.push(param);

        if(this.options.stringParams) {
          types.push(this.popStack());
          contexts.push(this.popStack());
        }
      }

      if (this.options.stringParams) {
        options.push("contexts:[" + contexts.join(",") + "]");
        options.push("types:[" + types.join(",") + "]");
        options.push("hashContexts:hashContexts");
        options.push("hashTypes:hashTypes");
      }

      if(this.options.data) {
        options.push("data:data");
      }

      options = "{" + options.join(",") + "}";
      if (useRegister) {
        this.register('options', options);
        params.push('options');
      } else {
        params.push(options);
      }
      return params.join(", ");
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
      return true;
    }
    return false;
  };

  __exports__ = JavaScriptCompiler;
  return __exports__;
})(__module2__);

// handlebars/compiler/compiler.js
var __module10__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;
  var parse = __dependency2__.parse;
  var JavaScriptCompiler = __dependency3__;
  var AST = __dependency4__;

  function Compiler() {}

  __exports__.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    disassemble: function() {
      var opcodes = this.opcodes, opcode, out = [], params, param;

      for (var i=0, l=opcodes.length; i<l; i++) {
        opcode = opcodes[i];

        if (opcode.opcode === 'DECLARE') {
          out.push("DECLARE " + opcode.name + "=" + opcode.value);
        } else {
          params = [];
          for (var j=0; j<opcode.args.length; j++) {
            param = opcode.args[j];
            if (typeof param === "string") {
              param = "\"" + param.replace("\n", "\\n") + "\"";
            }
            params.push(param);
          }
          out.push(opcode.opcode + " " + params.join(" "));
        }
      }

      return out.join("\n");
    },

    equals: function(other) {
      var len = this.opcodes.length;
      if (other.opcodes.length !== len) {
        return false;
      }

      for (var i = 0; i < len; i++) {
        var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
        if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
          return false;
        }
        for (var j = 0; j < opcode.args.length; j++) {
          if (opcode.args[j] !== otherOpcode.args[j]) {
            return false;
          }
        }
      }

      len = this.children.length;
      if (other.children.length !== len) {
        return false;
      }
      for (i = 0; i < len; i++) {
        if (!this.children[i].equals(other.children[i])) {
          return false;
        }
      }

      return true;
    },

    guid: 0,

    compile: function(program, options) {
      this.opcodes = [];
      this.children = [];
      this.depths = {list: []};
      this.options = options;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.accept(program);
    },

    accept: function(node) {
      var strip = node.strip || {},
          ret;
      if (strip.left) {
        this.opcode('strip');
      }

      ret = this[node.type](node);

      if (strip.right) {
        this.opcode('strip');
      }

      return ret;
    },

    program: function(program) {
      var statements = program.statements;

      for(var i=0, l=statements.length; i<l; i++) {
        this.accept(statements[i]);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var type = this.classifyMustache(mustache);

      if (type === "helper") {
        this.helperMustache(mustache, program, inverse);
      } else if (type === "simple") {
        this.simpleMustache(mustache);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('blockValue');
      } else {
        this.ambiguousMustache(mustache, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, pair, val;

      this.opcode('pushHash');

      for(var i=0, l=pairs.length; i<l; i++) {
        pair = pairs[i];
        val  = pair[1];

        if (this.options.stringParams) {
          if(val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode('getContext', val.depth || 0);
          this.opcode('pushStringParam', val.stringModeValue, val.type);
        } else {
          this.accept(val);
        }

        this.opcode('assignToHash', pair[0]);
      }
      this.opcode('popHash');
    },

    partial: function(partial) {
      var partialName = partial.partialName;
      this.usePartial = true;

      if(partial.context) {
        this.ID(partial.context);
      } else {
        this.opcode('push', 'depth0');
      }

      this.opcode('invokePartial', partialName.name);
      this.opcode('append');
    },

    content: function(content) {
      this.opcode('appendContent', content.string);
    },

    mustache: function(mustache) {
      var options = this.options;
      var type = this.classifyMustache(mustache);

      if (type === "simple") {
        this.simpleMustache(mustache);
      } else if (type === "helper") {
        this.helperMustache(mustache);
      } else {
        this.ambiguousMustache(mustache);
      }

      if(mustache.escaped && !options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousMustache: function(mustache, program, inverse) {
      var id = mustache.id,
          name = id.parts[0],
          isBlock = program != null || inverse != null;

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.opcode('invokeAmbiguous', name, isBlock);
    },

    simpleMustache: function(mustache) {
      var id = mustache.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperMustache: function(mustache, program, inverse) {
      var params = this.setupFullMustacheParams(mustache, program, inverse),
          name = mustache.id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.options.knownHelpersOnly) {
        throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
      } else {
        this.opcode('invokeHelper', params.length, name);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts[0]);
      }

      for(var i=1, l=id.parts.length; i<l; i++) {
        this.opcode('lookup', id.parts[i]);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      if (data.id.isScoped || data.id.depth) {
        throw new Exception('Scoped data references are not supported: ' + data.original);
      }

      this.opcode('lookupData');
      var parts = data.id.parts;
      for(var i=0, l=parts.length; i<l; i++) {
        this.opcode('lookup', parts[i]);
      }
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    INTEGER: function(integer) {
      this.opcode('pushLiteral', integer.integer);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
    },

    declare: function(name, value) {
      this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
    },

    addDepth: function(depth) {
      if(isNaN(depth)) { throw new Error("EWOT"); }
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifyMustache: function(mustache) {
      var isHelper   = mustache.isHelper;
      var isEligible = mustache.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      if (isEligible && !isHelper) {
        var name = mustache.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      var i = params.length, param;

      while(i--) {
        param = params[i];

        if(this.options.stringParams) {
          if(param.depth) {
            this.addDepth(param.depth);
          }

          this.opcode('getContext', param.depth || 0);
          this.opcode('pushStringParam', param.stringModeValue, param.type);
        } else {
          this[param.type](param);
        }
      }
    },

    setupMustacheParams: function(mustache) {
      var params = mustache.params;
      this.pushParams(params);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    },

    // this will replace setupMustacheParams when we're done
    setupFullMustacheParams: function(mustache, program, inverse) {
      var params = mustache.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    }
  };

  function precompile(input, options) {
    if (input == null || (typeof input !== 'string' && input.constructor !== AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
    }

    options = options || {};
    if (!('data' in options)) {
      options.data = true;
    }

    var ast = parse(input);
    var environment = new Compiler().compile(ast, options);
    return new JavaScriptCompiler().compile(environment, options);
  }

  __exports__.precompile = precompile;function compile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
    }

    options = options || {};

    if (!('data' in options)) {
      options.data = true;
    }

    var compiled;

    function compileInput() {
      var ast = parse(input);
      var environment = new Compiler().compile(ast, options);
      var templateSpec = new JavaScriptCompiler().compile(environment, options, undefined, true);
      return env.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    return function(context, options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled.call(this, context, options);
    };
  }

  __exports__.compile = compile;
  return __exports__;
})(__module5__, __module8__, __module11__, __module7__);

// handlebars.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  var Handlebars = __dependency1__;

  // Compiler imports
  var AST = __dependency2__;
  var Parser = __dependency3__.parser;
  var parse = __dependency3__.parse;
  var Compiler = __dependency4__.Compiler;
  var compile = __dependency4__.compile;
  var precompile = __dependency4__.precompile;
  var JavaScriptCompiler = __dependency5__;

  var _create = Handlebars.create;
  var create = function() {
    var hb = _create();

    hb.compile = function(input, options) {
      return compile(input, options, hb);
    };
    hb.precompile = precompile;

    hb.AST = AST;
    hb.Compiler = Compiler;
    hb.JavaScriptCompiler = JavaScriptCompiler;
    hb.Parser = Parser;
    hb.parse = parse;

    return hb;
  };

  Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module7__, __module8__, __module10__, __module11__);

  return __module0__;
})();

//! OpenSeadragon 1.1.1
//! Built on 2014-06-25
//! Git commit: v1.1.1-13-a52b907-dirty
//! http://openseadragon.github.io
//! License: http://openseadragon.github.io/license/
window.OpenSeadragon=window.OpenSeadragon||function(a){return new OpenSeadragon.Viewer(a)},function(a){a.version={versionStr:"1.1.1",major:parseInt("1",10),minor:parseInt("1",10),revision:parseInt("1",10)};var b={"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regexp","[object Object]":"object"},c=Object.prototype.toString,d=Object.prototype.hasOwnProperty;a.isFunction=function(b){return"function"===a.type(b)},a.isArray=Array.isArray||function(b){return"array"===a.type(b)},a.isWindow=function(a){return a&&"object"==typeof a&&"setInterval"in a},a.type=function(a){return null===a||void 0===a?String(a):b[c.call(a)]||"object"},a.isPlainObject=function(b){if(!b||"object"!==OpenSeadragon.type(b)||b.nodeType||a.isWindow(b))return!1;if(b.constructor&&!d.call(b,"constructor")&&!d.call(b.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in b);return void 0===c||d.call(b,c)},a.isEmptyObject=function(a){for(var b in a)return!1;return!0},a.supportsCanvas=function(){var b=document.createElement("canvas");return!(!a.isFunction(b.getContext)||!b.getContext("2d"))}()}(OpenSeadragon),function(a){function b(a,b){return b&&a!=document.body?document.body:a.offsetParent}a.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=arguments.length,i=!1,j=1;for("boolean"==typeof g&&(i=g,g=arguments[1]||{},j=2),"object"==typeof g||OpenSeadragon.isFunction(g)||(g={}),h===j&&(g=this,--j);h>j;j++)if(a=arguments[j],null!==a||void 0!==a)for(b in a)c=g[b],d=a[b],g!==d&&(i&&d&&(OpenSeadragon.isPlainObject(d)||(e=OpenSeadragon.isArray(d)))?(e?(e=!1,f=c&&OpenSeadragon.isArray(c)?c:[]):f=c&&OpenSeadragon.isPlainObject(c)?c:{},g[b]=OpenSeadragon.extend(i,f,d)):void 0!==d&&(g[b]=d));return g},a.extend(a,{DEFAULT_SETTINGS:{xmlPath:null,tileSources:null,tileHost:null,initialPage:0,crossOriginPolicy:!1,panHorizontal:!0,panVertical:!0,constrainDuringPan:!1,wrapHorizontal:!1,wrapVertical:!1,visibilityRatio:.5,minPixelRatio:.5,defaultZoomLevel:0,minZoomLevel:null,maxZoomLevel:null,clickTimeThreshold:300,clickDistThreshold:5,dblClickTimeThreshold:300,dblClickDistThreshold:20,springStiffness:6.5,animationTime:1.2,gestureSettingsMouse:{scrollToZoom:!0,clickToZoom:!0,dblClickToZoom:!1,pinchToZoom:!1,flickEnabled:!1,flickMinSpeed:120,flickMomentum:.25},gestureSettingsTouch:{scrollToZoom:!1,clickToZoom:!1,dblClickToZoom:!0,pinchToZoom:!0,flickEnabled:!0,flickMinSpeed:120,flickMomentum:.25},gestureSettingsPen:{scrollToZoom:!1,clickToZoom:!0,dblClickToZoom:!1,pinchToZoom:!1,flickEnabled:!1,flickMinSpeed:120,flickMomentum:.25},gestureSettingsUnknown:{scrollToZoom:!1,clickToZoom:!1,dblClickToZoom:!0,pinchToZoom:!0,flickEnabled:!0,flickMinSpeed:120,flickMomentum:.25},zoomPerClick:2,zoomPerScroll:1.2,zoomPerSecond:1,blendTime:0,alwaysBlend:!1,autoHideControls:!0,immediateRender:!1,minZoomImageRatio:.9,maxZoomPixelRatio:1.1,pixelsPerWheelLine:40,autoResize:!0,showSequenceControl:!0,sequenceControlAnchor:null,preserveViewport:!1,navPrevNextWrap:!1,showNavigationControl:!0,navigationControlAnchor:null,showZoomControl:!0,showHomeControl:!0,showFullPageControl:!0,showRotationControl:!1,controlsFadeDelay:2e3,controlsFadeLength:1500,mouseNavEnabled:!0,showNavigator:!1,navigatorId:null,navigatorPosition:null,navigatorSizeRatio:.2,navigatorMaintainSizeRatio:!1,navigatorTop:null,navigatorLeft:null,navigatorHeight:null,navigatorWidth:null,navigatorAutoResize:!0,degrees:0,opacity:1,layersAspectRatioEpsilon:1e-4,showReferenceStrip:!1,referenceStripScroll:"horizontal",referenceStripElement:null,referenceStripHeight:null,referenceStripWidth:null,referenceStripPosition:"BOTTOM_LEFT",referenceStripSizeRatio:.2,collectionRows:3,collectionLayout:"horizontal",collectionMode:!1,collectionTileSize:800,collectionReflection:!1,collectionBorder:!1,imageLoaderLimit:0,maxImageCacheCount:200,timeout:3e4,useCanvas:!0,prefixUrl:"/images/",navImages:{zoomIn:{REST:"zoomin_rest.png",GROUP:"zoomin_grouphover.png",HOVER:"zoomin_hover.png",DOWN:"zoomin_pressed.png"},zoomOut:{REST:"zoomout_rest.png",GROUP:"zoomout_grouphover.png",HOVER:"zoomout_hover.png",DOWN:"zoomout_pressed.png"},home:{REST:"home_rest.png",GROUP:"home_grouphover.png",HOVER:"home_hover.png",DOWN:"home_pressed.png"},fullpage:{REST:"fullpage_rest.png",GROUP:"fullpage_grouphover.png",HOVER:"fullpage_hover.png",DOWN:"fullpage_pressed.png"},rotateleft:{REST:"rotateleft_rest.png",GROUP:"rotateleft_grouphover.png",HOVER:"rotateleft_hover.png",DOWN:"rotateleft_pressed.png"},rotateright:{REST:"rotateright_rest.png",GROUP:"rotateright_grouphover.png",HOVER:"rotateright_hover.png",DOWN:"rotateright_pressed.png"},previous:{REST:"previous_rest.png",GROUP:"previous_grouphover.png",HOVER:"previous_hover.png",DOWN:"previous_pressed.png"},next:{REST:"next_rest.png",GROUP:"next_grouphover.png",HOVER:"next_hover.png",DOWN:"next_pressed.png"}},debugMode:!1,debugGridColor:"#437AB2"},SIGNAL:"----seadragon----",delegate:function(a,b){return function(){var c=arguments;return void 0===c&&(c=[]),b.apply(a,c)}},BROWSERS:{UNKNOWN:0,IE:1,FIREFOX:2,SAFARI:3,CHROME:4,OPERA:5},getElement:function(a){return"string"==typeof a&&(a=document.getElementById(a)),a},getElementPosition:function(c){var d,e,f=new a.Point;for(c=a.getElement(c),d="fixed"==a.getElementStyle(c).position,e=b(c,d);e;)f.x+=c.offsetLeft,f.y+=c.offsetTop,d&&(f=f.plus(a.getPageScroll())),c=e,d="fixed"==a.getElementStyle(c).position,e=b(c,d);return f},getElementOffset:function(b){b=a.getElement(b);var c,d,e=b&&b.ownerDocument,f={top:0,left:0};return e?(c=e.documentElement,"undefined"!=typeof b.getBoundingClientRect&&(f=b.getBoundingClientRect()),d=e==e.window?e:9===e.nodeType?e.defaultView||e.parentWindow:!1,new a.Point(f.left+(d.pageXOffset||c.scrollLeft)-(c.clientLeft||0),f.top+(d.pageYOffset||c.scrollTop)-(c.clientTop||0))):new a.Point},getElementSize:function(b){return b=a.getElement(b),new a.Point(b.clientWidth,b.clientHeight)},getElementStyle:document.documentElement.currentStyle?function(b){return b=a.getElement(b),b.currentStyle}:function(b){return b=a.getElement(b),window.getComputedStyle(b,"")},pointInElement:function(b,c){b=a.getElement(b);var d=a.getElementOffset(b),e=a.getElementSize(b);return c.x>=d.x&&c.x<d.x+e.x&&c.y<d.y+e.y&&c.y>=d.y},getEvent:function(b){return a.getEvent=b?function(a){return a}:function(){return window.event},a.getEvent(b)},getMousePosition:function(b){if("number"==typeof b.pageX)a.getMousePosition=function(b){var c=new a.Point;return b=a.getEvent(b),c.x=b.pageX,c.y=b.pageY,c};else{if("number"!=typeof b.clientX)throw new Error("Unknown event mouse position, no known technique.");a.getMousePosition=function(b){var c=new a.Point;return b=a.getEvent(b),c.x=b.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,c.y=b.clientY+document.body.scrollTop+document.documentElement.scrollTop,c}}return a.getMousePosition(b)},getPageScroll:function(){var b=document.documentElement||{},c=document.body||{};if("number"==typeof window.pageXOffset)a.getPageScroll=function(){return new a.Point(window.pageXOffset,window.pageYOffset)};else if(c.scrollLeft||c.scrollTop)a.getPageScroll=function(){return new a.Point(document.body.scrollLeft,document.body.scrollTop)};else{if(!b.scrollLeft&&!b.scrollTop)return new a.Point(0,0);a.getPageScroll=function(){return new a.Point(document.documentElement.scrollLeft,document.documentElement.scrollTop)}}return a.getPageScroll()},setPageScroll:function(b){if("undefined"!=typeof window.scrollTo)a.setPageScroll=function(a){window.scrollTo(a.x,a.y)};else{var c=a.getPageScroll();if(c.x===b.x&&c.y===b.y)return;document.body.scrollLeft=b.x,document.body.scrollTop=b.y;var d=a.getPageScroll();if(d.x!==c.x&&d.y!==c.y)return void(a.setPageScroll=function(a){document.body.scrollLeft=a.x,document.body.scrollTop=a.y});if(document.documentElement.scrollLeft=b.x,document.documentElement.scrollTop=b.y,d=a.getPageScroll(),d.x!==c.x&&d.y!==c.y)return void(a.setPageScroll=function(a){document.documentElement.scrollLeft=a.x,document.documentElement.scrollTop=a.y});a.setPageScroll=function(){}}return a.setPageScroll(b)},getWindowSize:function(){var b=document.documentElement||{},c=document.body||{};if("number"==typeof window.innerWidth)a.getWindowSize=function(){return new a.Point(window.innerWidth,window.innerHeight)};else if(b.clientWidth||b.clientHeight)a.getWindowSize=function(){return new a.Point(document.documentElement.clientWidth,document.documentElement.clientHeight)};else{if(!c.clientWidth&&!c.clientHeight)throw new Error("Unknown window size, no known technique.");a.getWindowSize=function(){return new a.Point(document.body.clientWidth,document.body.clientHeight)}}return a.getWindowSize()},makeCenteredNode:function(b){b=a.getElement(b);var c=[a.makeNeutralElement("div"),a.makeNeutralElement("div"),a.makeNeutralElement("div")];return a.extend(c[0].style,{display:"table",height:"100%",width:"100%"}),a.extend(c[1].style,{display:"table-row"}),a.extend(c[2].style,{display:"table-cell",verticalAlign:"middle",textAlign:"center"}),c[0].appendChild(c[1]),c[1].appendChild(c[2]),c[2].appendChild(b),c[0]},makeNeutralElement:function(a){var b=document.createElement(a),c=b.style;return c.background="transparent none",c.border="none",c.margin="0px",c.padding="0px",c.position="static",b},now:function(){return a.now=Date.now?Date.now:function(){return(new Date).getTime()},a.now()},makeTransparentImage:function(b){return a.makeTransparentImage=function(b){var c=a.makeNeutralElement("img");return c.src=b,c},a.Browser.vendor==a.BROWSERS.IE&&a.Browser.version<7&&(a.makeTransparentImage=function(b){var c=a.makeNeutralElement("img"),d=null;return d=a.makeNeutralElement("span"),d.style.display="inline-block",c.onload=function(){d.style.width=d.style.width||c.width+"px",d.style.height=d.style.height||c.height+"px",c.onload=null,c=null},c.src=b,d.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+b+"', sizingMethod='scale')",d}),a.makeTransparentImage(b)},setElementOpacity:function(b,c,d){var e,f;b=a.getElement(b),d&&!a.Browser.alpha&&(c=Math.round(c)),a.Browser.opacity?b.style.opacity=1>c?c:"":1>c?(e=Math.round(100*c),f="alpha(opacity="+e+")",b.style.filter=f):b.style.filter=""},addClass:function(b,c){b=a.getElement(b),b.className?-1===(" "+b.className+" ").indexOf(" "+c+" ")&&(b.className+=" "+c):b.className=c},indexOf:function(a,b,c){return this.indexOf=Array.prototype.indexOf?function(a,b,c){return a.indexOf(b,c)}:function(a,b,c){var d,e,f=c?c:0;if(!a)throw new TypeError;if(e=a.length,0===e||f>=e)return-1;for(0>f&&(f=e-Math.abs(f)),d=f;e>d;d++)if(a[d]===b)return d;return-1},this.indexOf(a,b,c)},removeClass:function(b,c){var d,e,f=[];for(b=a.getElement(b),d=b.className.split(/\s+/),e=0;e<d.length;e++)d[e]&&d[e]!==c&&f.push(d[e]);b.className=f.join(" ")},addEvent:function(){if(window.addEventListener)return function(b,c,d,e){b=a.getElement(b),b.addEventListener(c,d,e)};if(window.attachEvent)return function(b,c,d){b=a.getElement(b),b.attachEvent("on"+c,d)};throw new Error("No known event model.")}(),removeEvent:function(){if(window.removeEventListener)return function(b,c,d,e){b=a.getElement(b),b.removeEventListener(c,d,e)};if(window.detachEvent)return function(b,c,d){b=a.getElement(b),b.detachEvent("on"+c,d)};throw new Error("No known event model.")}(),cancelEvent:function(b){b=a.getEvent(b),a.cancelEvent=b.preventDefault?function(a){a.preventDefault()}:function(b){b=a.getEvent(b),b.cancel=!0,b.returnValue=!1},a.cancelEvent(b)},stopEvent:function(b){b=a.getEvent(b),a.stopEvent=b.stopPropagation?function(a){a.stopPropagation()}:function(b){b=a.getEvent(b),b.cancelBubble=!0},a.stopEvent(b)},createCallback:function(a,b){var c,d=[];for(c=2;c<arguments.length;c++)d.push(arguments[c]);return function(){var c,e=d.concat([]);for(c=0;c<arguments.length;c++)e.push(arguments[c]);return b.apply(a,e)}},getUrlParameter:function(a){var b=d[a];return b?b:null},getUrlProtocol:function(a){var b=a.match(/^([a-z]+:)\/\//i);return null===b?window.location.protocol:b[1].toLowerCase()},createAjaxRequest:function(b){var c;try{c=!!new ActiveXObject("Microsoft.XMLHTTP")}catch(d){c=!1}if(c)a.createAjaxRequest=window.XMLHttpRequest?function(a){return a?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")};else{if(!window.XMLHttpRequest)throw new Error("Browser doesn't support XMLHttpRequest.");a.createAjaxRequest=function(){return new XMLHttpRequest}}return a.createAjaxRequest(b)},makeAjaxRequest:function(b,c,d){var e=a.getUrlProtocol(b),f=a.createAjaxRequest("file:"===e);if(!a.isFunction(c))throw new Error("makeAjaxRequest requires a success callback");f.onreadystatechange=function(){if(4==f.readyState){f.onreadystatechange=function(){};var g="http:"===e||"https:"===e?200:0;f.status===g?c(f):(a.console.log("AJAX request returned %d: %s",f.status,b),a.isFunction(d)&&d(f))}};try{f.open("GET",b,!0),f.send(null)}catch(g){var h=g.message,i=a.Browser.vendor==a.BROWSERS.IE&&a.Browser.version<10;i&&"undefined"!=typeof g.number&&-2147024891==g.number&&(h+="\nSee http://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx#xdomain"),a.console.log("%s while making AJAX request: %s",g.name,h),f.onreadystatechange=function(){},a.isFunction(d)&&d(f,g)}},jsonp:function(b){var c,d=b.url,e=document.head||document.getElementsByTagName("head")[0]||document.documentElement,f=b.callbackName||"openseadragon"+a.now(),g=window[f],h="$1"+f+"$2",i=b.param||"callback",j=b.callback;d=d.replace(/(\=)\?(&|$)|\?\?/i,h),d+=(/\?/.test(d)?"&":"?")+i+"="+f,window[f]=function(b){if(g)window[f]=g;else try{delete window[f]}catch(c){}j&&a.isFunction(j)&&j(b)},c=document.createElement("script"),(void 0!==b.async||!1!==b.async)&&(c.async="async"),b.scriptCharset&&(c.charset=b.scriptCharset),c.src=d,c.onload=c.onreadystatechange=function(a,b){(b||!c.readyState||/loaded|complete/.test(c.readyState))&&(c.onload=c.onreadystatechange=null,e&&c.parentNode&&e.removeChild(c),c=void 0)},e.insertBefore(c,e.firstChild)},createFromDZI:function(){throw"OpenSeadragon.createFromDZI is deprecated, use Viewer.open."},parseXml:function(b){if(window.DOMParser)a.parseXml=function(a){var b,c=null;return b=new DOMParser,c=b.parseFromString(a,"text/xml")};else{if(!window.ActiveXObject)throw new Error("Browser doesn't support XML DOM.");a.parseXml=function(a){var b=null;return b=new ActiveXObject("Microsoft.XMLDOM"),b.async=!1,b.loadXML(a),b}}return a.parseXml(b)},imageFormatSupported:function(a){return a=a?a:"",!!c[a.toLowerCase()]}}),a.Browser={vendor:a.BROWSERS.UNKNOWN,version:0,alpha:!0};var c={bmp:!1,jpeg:!0,jpg:!0,png:!0,tif:!1,wdp:!1},d={};!function(){var b,c=(navigator.appName,navigator.appVersion),e=navigator.userAgent;switch(navigator.appName){case"Microsoft Internet Explorer":window.attachEvent&&window.ActiveXObject&&(a.Browser.vendor=a.BROWSERS.IE,a.Browser.version=parseFloat(e.substring(e.indexOf("MSIE")+5,e.indexOf(";",e.indexOf("MSIE")))));break;case"Netscape":window.addEventListener&&(e.indexOf("Firefox")>=0?(a.Browser.vendor=a.BROWSERS.FIREFOX,a.Browser.version=parseFloat(e.substring(e.indexOf("Firefox")+8))):e.indexOf("Safari")>=0?(a.Browser.vendor=e.indexOf("Chrome")>=0?a.BROWSERS.CHROME:a.BROWSERS.SAFARI,a.Browser.version=parseFloat(e.substring(e.substring(0,e.indexOf("Safari")).lastIndexOf("/")+1,e.indexOf("Safari")))):(b=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,}) "),null!==b.exec(e)&&(a.Browser.vendor=a.BROWSERS.IE,a.Browser.version=parseFloat(RegExp.$1))));break;case"Opera":a.Browser.vendor=a.BROWSERS.OPERA,a.Browser.version=parseFloat(c)}var f,g,h,i=window.location.search.substring(1),j=i.split("&");for(h=0;h<j.length;h++)f=j[h],g=f.indexOf("="),g>0&&(d[f.substring(0,g)]=decodeURIComponent(f.substring(g+1)));a.Browser.alpha=!(a.Browser.vendor==a.BROWSERS.IE&&a.Browser.version<9||a.Browser.vendor==a.BROWSERS.CHROME&&a.Browser.version<2),a.Browser.opacity=!(a.Browser.vendor==a.BROWSERS.IE&&a.Browser.version<9)}();var e=function(){};a.console=window.console||{log:e,debug:e,info:e,warn:e,error:e},function(b){var c=b.requestAnimationFrame||b.mozRequestAnimationFrame||b.webkitRequestAnimationFrame||b.msRequestAnimationFrame,d=b.cancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelAnimationFrame||b.msCancelAnimationFrame;if(c&&d)a.requestAnimationFrame=function(){return c.apply(b,arguments)},a.cancelAnimationFrame=function(){return d.apply(b,arguments)};else{var e,f=[],g=[],h=0;a.requestAnimationFrame=function(b){return f.push([++h,b]),e||(e=setInterval(function(){if(f.length){var b=a.now(),c=g;for(g=f,f=c;g.length;)g.shift()[1](b)}else clearInterval(e),e=void 0},20)),h},a.cancelAnimationFrame=function(a){var b,c;for(b=0,c=f.length;c>b;b+=1)if(f[b][0]===a)return void f.splice(b,1);for(b=0,c=g.length;c>b;b+=1)if(g[b][0]===a)return void g.splice(b,1)}}}(window),a._processDZIError=function(a){var b=a.getElementsByTagName("Message")[0],c=b.firstChild.nodeValue;throw new Error(c)}}(OpenSeadragon),function(a){var b={supportsFullScreen:!1,isFullScreen:function(){return!1},getFullScreenElement:function(){return null},requestFullScreen:function(){},exitFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",fullScreenErrorEventName:""};document.exitFullscreen?(b.supportsFullScreen=!0,b.getFullScreenElement=function(){return document.fullscreenElement},b.requestFullScreen=function(a){return a.requestFullscreen()},b.exitFullScreen=function(){document.exitFullscreen()},b.fullScreenEventName="fullscreenchange",b.fullScreenErrorEventName="fullscreenerror"):document.msExitFullscreen?(b.supportsFullScreen=!0,b.getFullScreenElement=function(){return document.msFullscreenElement},b.requestFullScreen=function(a){return a.msRequestFullscreen()},b.exitFullScreen=function(){document.msExitFullscreen()},b.fullScreenEventName="MSFullscreenChange",b.fullScreenErrorEventName="MSFullscreenError"):document.webkitExitFullscreen?(b.supportsFullScreen=!0,b.getFullScreenElement=function(){return document.webkitFullscreenElement},b.requestFullScreen=function(a){return a.webkitRequestFullscreen()},b.exitFullScreen=function(){document.webkitExitFullscreen()},b.fullScreenEventName="webkitfullscreenchange",b.fullScreenErrorEventName="webkitfullscreenerror"):document.webkitCancelFullScreen?(b.supportsFullScreen=!0,b.getFullScreenElement=function(){return document.webkitCurrentFullScreenElement},b.requestFullScreen=function(a){return a.webkitRequestFullScreen()},b.exitFullScreen=function(){document.webkitCancelFullScreen()},b.fullScreenEventName="webkitfullscreenchange",b.fullScreenErrorEventName="webkitfullscreenerror"):document.mozCancelFullScreen&&(b.supportsFullScreen=!0,b.getFullScreenElement=function(){return document.mozFullScreenElement},b.requestFullScreen=function(a){return a.mozRequestFullScreen()},b.exitFullScreen=function(){document.mozCancelFullScreen()},b.fullScreenEventName="mozfullscreenchange",b.fullScreenErrorEventName="mozfullscreenerror"),b.isFullScreen=function(){return null!==b.getFullScreenElement()},b.cancelFullScreen=function(){a.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead."),b.exitFullScreen()},a.extend(a,b)}(OpenSeadragon),function(a){a.EventSource=function(){this.events={}},a.EventSource.prototype={addHandler:function(b,c,d){var e=this.events[b];e||(this.events[b]=e=[]),c&&a.isFunction(c)&&(e[e.length]={handler:c,userData:d||null})},removeHandler:function(b,c){var d,e=this.events[b],f=[];if(e&&a.isArray(e)){for(d=0;d<e.length;d++)e[d].handler!==c&&f.push(e[d]);this.events[b]=f}},removeAllHandlers:function(a){if(a)this.events[a]=[];else for(var b in this.events)this.events[b]=[]},getHandler:function(a){var b=this.events[a];return b&&b.length?(b=1===b.length?[b[0]]:Array.apply(null,b),function(a,c){var d,e=b.length;for(d=0;e>d;d++)b[d]&&(c.eventSource=a,c.userData=b[d].userData,b[d].handler(c))}):null},raiseEvent:function(a,b){var c=this.getHandler(a);c&&(b||(b={}),c(this,b))}}}(OpenSeadragon),function(a){function b(b){var c,d,e=_[b.hash];if(!e.tracking){for(d=0;d<a.MouseTracker.subscribeEvents.length;d++)c=a.MouseTracker.subscribeEvents[d],a.addEvent(b.element,c,e[c],!1);e.tracking=!0}}function c(b){var c,d,f=_[b.hash];if(f.tracking){for(d=0;d<a.MouseTracker.subscribeEvents.length;d++)c=a.MouseTracker.subscribeEvents[d],a.removeEvent(b.element,c,f[c],!1);e(b),f.tracking=!1}}function d(b){var c=_[b.hash];c.capturing||(a.MouseTracker.supportsMouseCapture?b.element.setCapture(!0):(a.addEvent(window,"mouseup",c.mouseupcaptured,!0),a.addEvent(window,"mousemove",c.mousemovecaptured,!0)),c.capturing=!0)}function e(b){var c=_[b.hash];c.capturing&&(a.MouseTracker.supportsMouseCapture?b.element.releaseCapture():(a.removeEvent(window,"mousemove",c.mousemovecaptured,!0),a.removeEvent(window,"mouseup",c.mouseupcaptured,!0)),c.capturing=!1)}function f(b){var c;if(a.MouseTracker.unprefixedPointerEvents)c=b.pointerType;else switch(b.pointerType){case 2:c="touch";break;case 3:c="pen";break;case 4:c="mouse";break;default:c=""}return c}function g(b){return a.getMousePosition(b)}function h(a,b){return i(g(a),b)}function i(b,c){var d=a.getElementOffset(c);return b.minus(d)}function j(b,c){return new a.Point((b.x+c.x)/2,(b.y+c.y)/2)}function k(b,c){b.clickHandler&&a.cancelEvent(c)}function l(b,c){b.dblClickHandler&&a.cancelEvent(c)}function m(b,c){var d;b.keyHandler&&(c=a.getEvent(c),d=b.keyHandler({eventSource:b,position:h(c,b.element),keyCode:c.keyCode?c.keyCode:c.charCode,shift:c.shiftKey,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),d||a.cancelEvent(c))}function n(b,c){var d;b.focusHandler&&(c=a.getEvent(c),d=b.focusHandler({eventSource:b,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),d===!1&&a.cancelEvent(c))}function o(b,c){var d;b.blurHandler&&(c=a.getEvent(c),d=b.blurHandler({eventSource:b,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),d===!1&&a.cancelEvent(c))}function p(a,b){r(a,b,b)}function q(b,c){c=a.getEvent(c);var d={target:c.target||c.srcElement,type:"wheel",shiftKey:c.shiftKey||!1,clientX:c.clientX,clientY:c.clientY,pageX:c.pageX?c.pageX:c.clientX,pageY:c.pageY?c.pageY:c.clientY,deltaMode:"MozMousePixelScroll"==c.type?0:1,deltaX:0,deltaZ:0};d.deltaY="mousewheel"==a.MouseTracker.wheelEventName?-1/a.DEFAULT_SETTINGS.pixelsPerWheelLine*c.wheelDelta:c.detail,r(b,d,c)}function r(b,c,d){var e,f=0;f=c.deltaY<0?1:-1,b.scrollHandler&&(e=b.scrollHandler({eventSource:b,pointerType:"mouse",position:h(c,b.element),scroll:f,shift:c.shiftKey,isTouchEvent:!1,originalEvent:d,preventDefaultAction:!1,userData:b.userData}),e===!1&&a.cancelEvent(d))}function s(a,b){if(a===b)return!1;for(;b&&b!==a;)b=b.parentNode;return b===a}function t(b,c){var d;c=a.getEvent(c),this===c.relatedTarget||s(this,c.relatedTarget)||(d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:g(c),currentTime:a.now()},U(b,c,[d]))}function u(b,c){var d;c=a.getEvent(c),this===c.relatedTarget||s(this,c.relatedTarget)||(d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:g(c),currentTime:a.now()},V(b,c,[d]))}function v(b,c){var d;c=a.getEvent(c),d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:g(c),currentTime:a.now()},U(b,c,[d])}function w(b,c){var d;c=a.getEvent(c),d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:g(c),currentTime:a.now()},V(b,c,[d])}function x(b,c){var e;c=a.getEvent(c),e={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:g(c),currentTime:a.now()},W(b,c,[e],c.button)&&(a.stopEvent(c),d(b)),(b.clickHandler||b.dblClickHandler||b.pressHandler||b.dragHandler||b.dragEndHandler)&&a.cancelEvent(c)}function y(a,b){A(a,b)}function z(b,c){A(b,c),a.stopEvent(c)}function A(b,c){var d;c=a.getEvent(c),d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:g(c),currentTime:a.now()},X(b,c,[d],c.button)&&e(b)}function B(a,b){D(a,b)}function C(b,c){D(b,c),a.stopEvent(c)}function D(b,c){var d;c=a.getEvent(c),d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:g(c),currentTime:a.now()},Y(b,c,[d])}function E(b,c){var d,e=c.changedTouches.length,f=[];for(d=0;e>d;d++)f.push({id:c.changedTouches[d].identifier,type:"touch",currentPos:g(c.changedTouches[d]),currentTime:a.now()});U(b,c,f)}function F(b,c){var d,e=c.changedTouches.length,f=[];for(d=0;e>d;d++)f.push({id:c.changedTouches[d].identifier,type:"touch",currentPos:g(c.changedTouches[d]),currentTime:a.now()});V(b,c,f)}function G(b,c){var d,e,f=c.changedTouches.length,h=[];for(d=a.now(),e=0;f>e;e++)h.push({id:c.changedTouches[e].identifier,type:"touch",currentPos:g(c.changedTouches[e]),currentTime:d});a.MouseTracker.haveTouchEnter||U(b,c,h),W(b,c,h,0),a.cancelEvent(c)}function H(b,c){var d,e,f=c.changedTouches.length,h=[];for(d=a.now(),e=0;f>e;e++)h.push({id:c.changedTouches[e].identifier,type:"touch",currentPos:g(c.changedTouches[e]),currentTime:d});X(b,c,h,0),!a.MouseTracker.haveTouchEnter&&f>0&&V(b,c,h),a.cancelEvent(c)}function I(b,c){var d,e=c.changedTouches.length,f=[];for(d=0;e>d;d++)f.push({id:c.changedTouches[d].identifier,type:"touch",currentPos:g(c.changedTouches[d]),currentTime:a.now()});Y(b,c,f),a.cancelEvent(c)}function J(a,b){var c,d=b.changedTouches.length,e=[];for(c=0;d>c;c++)e.push({id:b.changedTouches[c].identifier,type:"touch"});Z(a,b,e)}function K(a,b){return b.stopPropagation(),b.preventDefault(),!1}function L(a,b){return b.stopPropagation(),b.preventDefault(),!1}function M(b,c){var d;d={id:c.pointerId,type:f(c),isPrimary:c.isPrimary,currentPos:g(c),currentTime:a.now()},U(b,c,[d])}function N(b,c){var d;d={id:c.pointerId,type:f(c),isPrimary:c.isPrimary,currentPos:g(c),currentTime:a.now()},V(b,c,[d])}function O(b,c){var d;d={id:c.pointerId,type:f(c),isPrimary:c.isPrimary,currentPos:g(c),currentTime:a.now()},W(b,c,[d],c.button)&&(a.MouseTracker.unprefixedPointerEvents?c.currentTarget.setPointerCapture(c.pointerId):c.currentTarget.msSetPointerCapture(c.pointerId),a.stopEvent(c)),(b.clickHandler||b.dblClickHandler||b.pressHandler||b.dragHandler||b.dragEndHandler||b.pinchHandler)&&a.cancelEvent(c)}function P(b,c){var d;d={id:c.pointerId,type:f(c),isPrimary:c.isPrimary,currentPos:g(c),currentTime:a.now()},X(b,c,[d],c.button)&&(a.MouseTracker.unprefixedPointerEvents?c.currentTarget.releasePointerCapture(c.pointerId):c.currentTarget.msReleasePointerCapture(c.pointerId))}function Q(b,c){var d;d={id:c.pointerId,type:f(c),isPrimary:c.isPrimary,currentPos:g(c),currentTime:a.now()},Y(b,c,[d])}function R(a,b){var c;c={id:b.pointerId,type:f(b)},Z(a,b,[c])}function S(a,b){return b.hasOwnProperty("isPrimary")||(b.isPrimary=0===a.getLength()?!0:!1),b.speed=0,b.direction=0,b.contactPos=b.currentPos,b.contactTime=b.currentTime,b.lastPos=b.currentPos,b.lastTime=b.currentTime,a.add(b)}function T(a,b){var c,d;return a.getById(b.id)?(c=a.removeById(b.id),b.hasOwnProperty("isPrimary")||(d=a.getPrimary(),d||(d=a.getByIndex(0),d&&(d.isPrimary=!0)))):c=a.getLength(),c}function U(b,c,d){var e,f,g,h,j=b.getActivePointersListByType(d[0].type),k=d.length;for(e=0;k>e;e++)f=d[e],g=j.getById(f.id),g?(g.insideElement=!0,g.lastPos=g.currentPos,g.lastTime=g.currentTime,g.currentPos=f.currentPos,g.currentTime=f.currentTime,f=g):(f.captured=!1,f.insideElementPressed=!1,f.insideElement=!0,S(j,f)),b.enterHandler&&(h=b.enterHandler({eventSource:b,pointerType:f.type,position:i(f.currentPos,b.element),buttons:j.buttons,insideElementPressed:f.insideElementPressed,buttonDownAny:0!==j.buttons,isTouchEvent:"touch"===f.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),h===!1&&a.cancelEvent(c))}function V(b,c,d){var e,f,g,h,j=(_[b.hash],b.getActivePointersListByType(d[0].type)),k=d.length;for(e=0;k>e;e++)f=d[e],g=j.getById(f.id),g&&(g.captured?(g.insideElement=!1,g.lastPos=g.currentPos,g.lastTime=g.currentTime,g.currentPos=f.currentPos,g.currentTime=f.currentTime):T(j,g),f=g),b.exitHandler&&(h=b.exitHandler({eventSource:b,pointerType:f.type,position:i(f.currentPos,b.element),buttons:j.buttons,insideElementPressed:g?g.insideElementPressed:!1,buttonDownAny:0!==j.buttons,isTouchEvent:"touch"===f.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),h===!1&&a.cancelEvent(c))}function W(b,c,d,e){var f,g,h,k,l=_[b.hash],m=b.getActivePointersListByType(d[0].type),n=d.length;if("undefined"!=typeof c.buttons?m.buttons=c.buttons:0===e?m.buttons|=1:1===e?m.buttons|=4:2===e?m.buttons|=2:3===e?m.buttons|=8:4===e?m.buttons|=16:5===e&&(m.buttons|=32),0!==e&&1!==e)return!1;for(g=0;n>g;g++)h=d[g],k=m.getById(h.id),k?(k.captured=!0,k.insideElementPressed=!0,k.insideElement=!0,k.contactPos=h.currentPos,k.contactTime=h.currentTime,k.lastPos=k.currentPos,k.lastTime=k.currentTime,k.currentPos=h.currentPos,k.currentTime=h.currentTime,h=k):(h.captured=!0,h.insideElementPressed=!0,h.insideElement=!0,S(m,h)),m.contacts++,(b.dragHandler||b.dragEndHandler||b.pinchHandler)&&a.MouseTracker.gesturePointVelocityTracker.addPoint(b,h),1===m.contacts?b.pressHandler&&(f=b.pressHandler({eventSource:b,pointerType:h.type,position:i(h.contactPos,b.element),buttons:m.buttons,isTouchEvent:"touch"===h.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),f===!1&&a.cancelEvent(c)):2===m.contacts&&b.pinchHandler&&"touch"===h.type&&(l.pinchGPoints=m.asArray(),l.lastPinchDist=l.currentPinchDist=l.pinchGPoints[0].currentPos.distanceTo(l.pinchGPoints[1].currentPos),l.lastPinchCenter=l.currentPinchCenter=j(l.pinchGPoints[0].currentPos,l.pinchGPoints[1].currentPos));return!0}function X(b,c,d,e){var f,g,h,k,l,m,n,o=_[b.hash],p=b.getActivePointersListByType(d[0].type),q=d.length,r=!1,s=!1;if("undefined"!=typeof c.buttons?p.buttons=c.buttons:0===e?p.buttons^=-2:1===e?p.buttons^=-5:2===e?p.buttons^=-3:3===e?p.buttons^=-9:4===e?p.buttons^=-17:5===e&&(p.buttons^=-33),0!==e&&1!==e)return!1;for(k=0;q>k;k++)l=d[k],m=p.getById(l.id),m&&(m.captured&&(m.captured=!1,r=!0,s=!0),m.lastPos=m.currentPos,m.lastTime=m.currentTime,m.currentPos=l.currentPos,m.currentTime=l.currentTime,m.insideElement||T(p,m),g=m.currentPos,h=m.currentTime,s?(p.contacts--,(b.dragHandler||b.dragEndHandler||b.pinchHandler)&&a.MouseTracker.gesturePointVelocityTracker.removePoint(b,m),0===p.contacts?(b.releaseHandler&&(f=b.releaseHandler({eventSource:b,pointerType:m.type,position:i(g,b.element),buttons:p.buttons,insideElementPressed:m.insideElementPressed,insideElementReleased:m.insideElement,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),f===!1&&a.cancelEvent(c)),b.dragEndHandler&&!m.currentPos.equals(m.contactPos)&&(f=b.dragEndHandler({eventSource:b,pointerType:m.type,position:i(m.currentPos,b.element),speed:m.speed,direction:m.direction,shift:c.shiftKey,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),f===!1&&a.cancelEvent(c)),(b.clickHandler||b.dblClickHandler)&&m.insideElement&&(n=h-m.contactTime<=b.clickTimeThreshold&&m.contactPos.distanceTo(g)<=b.clickDistThreshold,b.clickHandler&&(f=b.clickHandler({eventSource:b,pointerType:m.type,position:i(m.currentPos,b.element),quick:n,shift:c.shiftKey,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),f===!1&&a.cancelEvent(c)),b.dblClickHandler&&n&&(p.clicks++,1===p.clicks?(o.lastClickPos=g,o.dblClickTimeOut=setTimeout(function(){p.clicks=0},b.dblClickTimeThreshold)):2===p.clicks&&(clearTimeout(o.dblClickTimeOut),p.clicks=0,o.lastClickPos.distanceTo(g)<=b.dblClickDistThreshold&&(f=b.dblClickHandler({eventSource:b,pointerType:m.type,position:i(m.currentPos,b.element),shift:c.shiftKey,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),f===!1&&a.cancelEvent(c)),o.lastClickPos=null)))):2===p.contacts&&b.pinchHandler&&"touch"===m.type&&(o.pinchGPoints=p.asArray(),o.lastPinchDist=o.currentPinchDist=o.pinchGPoints[0].currentPos.distanceTo(o.pinchGPoints[1].currentPos),o.lastPinchCenter=o.currentPinchCenter=j(o.pinchGPoints[0].currentPos,o.pinchGPoints[1].currentPos))):b.releaseHandler&&(f=b.releaseHandler({eventSource:b,pointerType:m.type,position:i(g,b.element),buttons:p.buttons,insideElementPressed:m.insideElementPressed,insideElementReleased:m.insideElement,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),f===!1&&a.cancelEvent(c)));
return r}function Y(b,c,d){var e,f,g,h,k,l,m=_[b.hash],n=b.getActivePointersListByType(d[0].type),o=d.length;for("undefined"!=typeof c.buttons&&(n.buttons=c.buttons),e=0;o>e;e++)f=d[e],g=n.getById(f.id),g?(f.hasOwnProperty("isPrimary")&&(g.isPrimary=f.isPrimary),g.lastPos=g.currentPos,g.lastTime=g.currentTime,g.currentPos=f.currentPos,g.currentTime=f.currentTime):(f.captured=!1,f.insideElementPressed=!1,f.insideElement=!0,S(n,f));b.stopHandler&&"mouse"===d[0].type&&(clearTimeout(b.stopTimeOut),b.stopTimeOut=setTimeout(function(){$(b,c,d[0].type)},b.stopDelay)),0===n.contacts?b.moveHandler&&(l=b.moveHandler({eventSource:b,pointerType:d[0].type,position:i(d[0].currentPos,b.element),buttons:n.buttons,isTouchEvent:"touch"===d[0].type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),l===!1&&a.cancelEvent(c)):1===n.contacts?(b.moveHandler&&(g=n.asArray()[0],l=b.moveHandler({eventSource:b,pointerType:g.type,position:i(g.currentPos,b.element),buttons:n.buttons,isTouchEvent:"touch"===g.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),l===!1&&a.cancelEvent(c)),b.dragHandler&&(g=n.asArray()[0],k=g.currentPos.minus(g.lastPos),l=b.dragHandler({eventSource:b,pointerType:g.type,position:i(g.currentPos,b.element),buttons:n.buttons,delta:k,speed:g.speed,direction:g.direction,shift:c.shiftKey,isTouchEvent:"touch"===g.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),l===!1&&a.cancelEvent(c))):2===n.contacts&&(b.moveHandler&&(h=n.asArray(),l=b.moveHandler({eventSource:b,pointerType:h[0].type,position:i(j(h[0].currentPos,h[1].currentPos),b.element),buttons:n.buttons,isTouchEvent:"touch"===h[0].type,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),l===!1&&a.cancelEvent(c)),b.pinchHandler&&"touch"===d[0].type&&(k=m.pinchGPoints[0].currentPos.distanceTo(m.pinchGPoints[1].currentPos),k!=m.currentPinchDist&&(m.lastPinchDist=m.currentPinchDist,m.currentPinchDist=k,m.lastPinchCenter=m.currentPinchCenter,m.currentPinchCenter=j(m.pinchGPoints[0].currentPos,m.pinchGPoints[1].currentPos),l=b.pinchHandler({eventSource:b,pointerType:"touch",gesturePoints:m.pinchGPoints,lastCenter:i(m.lastPinchCenter,b.element),center:i(m.currentPinchCenter,b.element),lastDistance:m.lastPinchDist,distance:m.currentPinchDist,shift:c.shiftKey,originalEvent:c,preventDefaultAction:!1,userData:b.userData}),l===!1&&a.cancelEvent(c))))}function Z(a,b,c){X(a,b,c,0),V(a,b,c)}function $(a,b,c){a.stopHandler&&a.stopHandler({eventSource:a,pointerType:c,position:h(b,a.element),buttons:a.getActivePointersListByType(c).buttons,isTouchEvent:"touch"===c,originalEvent:b,preventDefaultAction:!1,userData:a.userData})}var _={};a.MouseTracker=function(b){var c=arguments;a.isPlainObject(b)||(b={element:c[0],clickTimeThreshold:c[1],clickDistThreshold:c[2]}),this.hash=Math.random(),this.element=a.getElement(b.element),this.clickTimeThreshold=b.clickTimeThreshold,this.clickDistThreshold=b.clickDistThreshold,this.dblClickTimeThreshold=b.dblClickTimeThreshold,this.dblClickDistThreshold=b.dblClickDistThreshold,this.userData=b.userData||null,this.stopDelay=b.stopDelay||50,this.enterHandler=b.enterHandler||null,this.exitHandler=b.exitHandler||null,this.pressHandler=b.pressHandler||null,this.releaseHandler=b.releaseHandler||null,this.moveHandler=b.moveHandler||null,this.scrollHandler=b.scrollHandler||null,this.clickHandler=b.clickHandler||null,this.dblClickHandler=b.dblClickHandler||null,this.dragHandler=b.dragHandler||null,this.dragEndHandler=b.dragEndHandler||null,this.pinchHandler=b.pinchHandler||null,this.stopHandler=b.stopHandler||null,this.keyHandler=b.keyHandler||null,this.focusHandler=b.focusHandler||null,this.blurHandler=b.blurHandler||null;var d=this;_[this.hash]={click:function(a){k(d,a)},dblclick:function(a){l(d,a)},keypress:function(a){m(d,a)},focus:function(a){n(d,a)},blur:function(a){o(d,a)},wheel:function(a){p(d,a)},mousewheel:function(a){q(d,a)},DOMMouseScroll:function(a){q(d,a)},MozMousePixelScroll:function(a){q(d,a)},mouseover:function(a){t(d,a)},mouseout:function(a){u(d,a)},mouseenter:function(a){v(d,a)},mouseleave:function(a){w(d,a)},mousedown:function(a){x(d,a)},mouseup:function(a){y(d,a)},mouseupcaptured:function(a){z(d,a)},mousemove:function(a){B(d,a)},mousemovecaptured:function(a){C(d,a)},touchenter:function(a){E(d,a)},touchleave:function(a){F(d,a)},touchstart:function(a){G(d,a)},touchend:function(a){H(d,a)},touchmove:function(a){I(d,a)},touchcancel:function(a){J(d,a)},gesturestart:function(a){K(d,a)},gesturechange:function(a){L(d,a)},pointerenter:function(a){M(d,a)},MSPointerEnter:function(a){M(d,a)},pointerleave:function(a){N(d,a)},MSPointerLeave:function(a){N(d,a)},pointerdown:function(a){O(d,a)},MSPointerDown:function(a){O(d,a)},pointerup:function(a){P(d,a)},MSPointerUp:function(a){P(d,a)},pointermove:function(a){Q(d,a)},MSPointerMove:function(a){Q(d,a)},pointercancel:function(a){R(d,a)},MSPointerCancel:function(a){R(d,a)},tracking:!1,activePointersLists:[],capturing:!1,lastClickPos:null,dblClickTimeOut:null,pinchGPoints:[],lastPinchDist:0,currentPinchDist:0,lastPinchCenter:null,currentPinchCenter:null}},a.MouseTracker.prototype={destroy:function(){c(this),this.element=null},isTracking:function(){return _[this.hash].tracking},setTracking:function(a){return a?b(this):c(this),this},getActivePointersListByType:function(b){var c,d,e=_[this.hash],f=e.activePointersLists.length;for(c=0;f>c;c++)if(e.activePointersLists[c].type===b)return e.activePointersLists[c];return d=new a.MouseTracker.GesturePointList(b),e.activePointersLists.push(d),d},enterHandler:function(){},exitHandler:function(){},pressHandler:function(){},releaseHandler:function(){},moveHandler:function(){},scrollHandler:function(){},clickHandler:function(){},dblClickHandler:function(){},dragHandler:function(){},dragEndHandler:function(){},pinchHandler:function(){},stopHandler:function(){},keyHandler:function(){},focusHandler:function(){},blurHandler:function(){}},a.MouseTracker.gesturePointVelocityTracker=function(){var b=[],c=0,d=0,e=function(a,b){return a.hash.toString()+b.type+b.id.toString()},f=function(){var c,e,f,g,h,i,j=b.length,k=a.now();for(g=k-d,d=k,c=0;j>c;c++)e=b[c],f=e.gPoint,f.direction=Math.atan2(f.currentPos.y-e.lastPos.y,f.currentPos.x-e.lastPos.x),h=e.lastPos.distanceTo(f.currentPos),e.lastPos=f.currentPos,i=1e3*h/(g+1),f.speed=.75*i+.25*f.speed},g=function(g,h){var i=e(g,h);b.push({guid:i,gPoint:h,lastPos:h.currentPos}),1===b.length&&(d=a.now(),c=window.setInterval(f,50))},h=function(a,d){var f,g=e(a,d),h=b.length;for(f=0;h>f;f++)if(b[f].guid===g){b.splice(f,1),h--,0===h&&window.clearInterval(c);break}};return{addPoint:g,removePoint:h}}(),a.MouseTracker.wheelEventName=a.Browser.vendor==a.BROWSERS.IE&&a.Browser.version>8||"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",a.MouseTracker.supportsMouseCapture=function(){var b=document.createElement("div");return a.isFunction(b.setCapture)&&a.isFunction(b.releaseCapture)}(),a.MouseTracker.subscribeEvents=["click","dblclick","keypress","focus","blur",a.MouseTracker.wheelEventName],"DOMMouseScroll"==a.MouseTracker.wheelEventName&&a.MouseTracker.subscribeEvents.push("MozMousePixelScroll"),window.PointerEvent?(a.MouseTracker.subscribeEvents.push("pointerenter","pointerleave","pointerdown","pointerup","pointermove","pointercancel"),a.MouseTracker.unprefixedPointerEvents=!0,a.MouseTracker.maxTouchPoints=navigator.maxTouchPoints?navigator.maxTouchPoints:0,a.MouseTracker.haveTouchEnter=!0,a.MouseTracker.haveMouseEnter=!0):window.MSPointerEvent?(a.MouseTracker.subscribeEvents.push("MSPointerEnter","MSPointerLeave","MSPointerDown","MSPointerUp","MSPointerMove","MSPointerCancel"),a.MouseTracker.unprefixedPointerEvents=!1,a.MouseTracker.maxTouchPoints=navigator.msMaxTouchPoints?navigator.msMaxTouchPoints:0,a.MouseTracker.haveTouchEnter=!0,a.MouseTracker.haveMouseEnter=!0):(a.MouseTracker.subscribeEvents.push("mouseover","mouseout","mousedown","mouseup","mousemove"),a.MouseTracker.haveMouseEnter=!1,"ontouchstart"in window?(a.MouseTracker.subscribeEvents.push("touchstart","touchend","touchmove","touchcancel"),"ontouchenter"in window?(a.MouseTracker.subscribeEvents.push("touchenter","touchleave"),a.MouseTracker.haveTouchEnter=!0):a.MouseTracker.haveTouchEnter=!1):a.MouseTracker.haveTouchEnter=!1,"ongesturestart"in window&&a.MouseTracker.subscribeEvents.push("gesturestart","gesturechange"),a.MouseTracker.mousePointerId="legacy-mouse",a.MouseTracker.maxTouchPoints=10),a.MouseTracker.GesturePointList=function(a){this._gPoints=[],this.type=a,this.buttons=0,this.contacts=0,this.clicks=0},a.MouseTracker.GesturePointList.prototype={getLength:function(){return this._gPoints.length},asArray:function(){return this._gPoints},add:function(a){return this._gPoints.push(a)},removeById:function(a){var b,c=this._gPoints.length;for(b=0;c>b;b++)if(this._gPoints[b].id===a){this._gPoints.splice(b,1);break}return this._gPoints.length},getByIndex:function(a){return a<this._gPoints.length?this._gPoints[a]:null},getById:function(a){var b,c=this._gPoints.length;for(b=0;c>b;b++)if(this._gPoints[b].id===a)return this._gPoints[b];return null},getPrimary:function(){var a,b=this._gPoints.length;for(a=0;b>a;a++)if(this._gPoints[a].isPrimary)return this._gPoints[a];return null}}}(OpenSeadragon),function(a){a.ControlAnchor={NONE:0,TOP_LEFT:1,TOP_RIGHT:2,BOTTOM_RIGHT:3,BOTTOM_LEFT:4,ABSOLUTE:5},a.Control=function(b,c,d){var e=b.parentNode;"number"==typeof c&&(a.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; please use an options object instead.  Support for this deprecated variant is scheduled for removal in December 2013"),c={anchor:c}),c.attachToViewer="undefined"==typeof c.attachToViewer?!0:c.attachToViewer,this.autoFade="undefined"==typeof c.autoFade?!0:c.autoFade,this.element=b,this.anchor=c.anchor,this.container=d,this.anchor==a.ControlAnchor.ABSOLUTE?(this.wrapper=a.makeNeutralElement("div"),this.wrapper.style.position="absolute",this.wrapper.style.top="number"==typeof c.top?c.top+"px":c.top,this.wrapper.style.left="number"==typeof c.left?c.left+"px":c.left,this.wrapper.style.height="number"==typeof c.height?c.height+"px":c.height,this.wrapper.style.width="number"==typeof c.width?c.width+"px":c.width,this.wrapper.style.margin="0px",this.wrapper.style.padding="0px",this.element.style.position="relative",this.element.style.top="0px",this.element.style.left="0px",this.element.style.height="100%",this.element.style.width="100%"):(this.wrapper=a.makeNeutralElement("div"),this.wrapper.style.display="inline-block",this.anchor==a.ControlAnchor.NONE&&(this.wrapper.style.width=this.wrapper.style.height="100%")),this.wrapper.appendChild(this.element),c.attachToViewer?this.anchor==a.ControlAnchor.TOP_RIGHT||this.anchor==a.ControlAnchor.BOTTOM_RIGHT?this.container.insertBefore(this.wrapper,this.container.firstChild):this.container.appendChild(this.wrapper):e.appendChild(this.wrapper)},a.Control.prototype={destroy:function(){this.wrapper.removeChild(this.element),this.container.removeChild(this.wrapper)},isVisible:function(){return"none"!=this.wrapper.style.display},setVisible:function(b){this.wrapper.style.display=b?this.anchor==a.ControlAnchor.ABSOLUTE?"block":"inline-block":"none"},setOpacity:function(b){this.element[a.SIGNAL]&&a.Browser.vendor==a.BROWSERS.IE?a.setElementOpacity(this.element,b,!0):a.setElementOpacity(this.wrapper,b,!0)}}}(OpenSeadragon),function(a){function b(a,b){var c,d=a.controls;for(c=d.length-1;c>=0;c--)if(d[c].element==b)return c;return-1}a.ControlDock=function(b){var c,d,e=["topleft","topright","bottomright","bottomleft"];for(a.extend(!0,this,{id:"controldock-"+a.now()+"-"+Math.floor(1e6*Math.random()),container:a.makeNeutralElement("div"),controls:[]},b),this.container.onsubmit=function(){return!1},this.element&&(this.element=a.getElement(this.element),this.element.appendChild(this.container),this.element.style.position="relative",this.container.style.width="100%",this.container.style.height="100%"),d=0;d<e.length;d++)c=e[d],this.controls[c]=a.makeNeutralElement("div"),this.controls[c].style.position="absolute",c.match("left")&&(this.controls[c].style.left="0px"),c.match("right")&&(this.controls[c].style.right="0px"),c.match("top")&&(this.controls[c].style.top="0px"),c.match("bottom")&&(this.controls[c].style.bottom="0px");this.container.appendChild(this.controls.topleft),this.container.appendChild(this.controls.topright),this.container.appendChild(this.controls.bottomright),this.container.appendChild(this.controls.bottomleft)},a.ControlDock.prototype={addControl:function(c,d){c=a.getElement(c);var e=null;if(!(b(this,c)>=0)){switch(d.anchor){case a.ControlAnchor.TOP_RIGHT:e=this.controls.topright,c.style.position="relative",c.style.paddingRight="0px",c.style.paddingTop="0px";break;case a.ControlAnchor.BOTTOM_RIGHT:e=this.controls.bottomright,c.style.position="relative",c.style.paddingRight="0px",c.style.paddingBottom="0px";break;case a.ControlAnchor.BOTTOM_LEFT:e=this.controls.bottomleft,c.style.position="relative",c.style.paddingLeft="0px",c.style.paddingBottom="0px";break;case a.ControlAnchor.TOP_LEFT:e=this.controls.topleft,c.style.position="relative",c.style.paddingLeft="0px",c.style.paddingTop="0px";break;case a.ControlAnchor.ABSOLUTE:e=this.container,c.style.margin="0px",c.style.padding="0px";break;default:case a.ControlAnchor.NONE:e=this.container,c.style.margin="0px",c.style.padding="0px"}this.controls.push(new a.Control(c,d,e)),c.style.display="inline-block"}},removeControl:function(c){c=a.getElement(c);var d=b(this,c);return d>=0&&(this.controls[d].destroy(),this.controls.splice(d,1)),this},clearControls:function(){for(;this.controls.length>0;)this.controls.pop().destroy();return this},areControlsEnabled:function(){var a;for(a=this.controls.length-1;a>=0;a--)if(this.controls[a].isVisible())return!0;return!1},setControlsEnabled:function(a){var b;for(b=this.controls.length-1;b>=0;b--)this.controls[b].setVisible(a);return this}}}(OpenSeadragon),function($){function _getSafeElemSize(a){return a=$.getElement(a),new $.Point(0===a.clientWidth?1:a.clientWidth,0===a.clientHeight?1:a.clientHeight)}function getTileSourceImplementation(viewer,tileSource,successCallback,failCallback){var _this=viewer;"string"==$.type(tileSource)&&(tileSource.match(/\s*<.*/)?tileSource=$.parseXml(tileSource):tileSource.match(/\s*[\{\[].*/)&&(tileSource=eval("("+tileSource+")"))),setTimeout(function(){if("string"==$.type(tileSource))tileSource=new $.TileSource(tileSource,function(a){successCallback(a.tileSource)}),tileSource.addHandler("open-failed",function(a){failCallback(a)});else if($.isPlainObject(tileSource)||tileSource.nodeType)if($.isFunction(tileSource.getTileUrl)){var a=new $.TileSource(tileSource);a.getTileUrl=tileSource.getTileUrl,successCallback(a)}else{var b=$.TileSource.determineType(_this,tileSource);if(!b)return void failCallback({message:"Unable to load TileSource",source:tileSource});var c=b.prototype.configure.apply(_this,[tileSource]),d=new b(c);successCallback(d)}else successCallback(tileSource)},1)}function openTileSource(a,b){var c,d=a;return d.source&&d.close(),THIS[d.hash].prevContainerSize=_getSafeElemSize(d.container),d.collectionMode?(d.source=new $.TileSourceCollection({rows:d.collectionRows,layout:d.collectionLayout,tileSize:d.collectionTileSize,tileSources:d.tileSources,tileMargin:d.collectionTileMargin}),d.viewport=d.viewport?d.viewport:new $.Viewport({collectionMode:!0,collectionTileSource:d.source,collectionBorder:d.collectionBorder,collectionReflection:d.collectionReflection,containerSize:THIS[d.hash].prevContainerSize,contentSize:d.source.dimensions,springStiffness:d.springStiffness,animationTime:d.animationTime,showNavigator:!1,minZoomImageRatio:1,maxZoomPixelRatio:1,viewer:d,degrees:d.degrees})):(b&&(d.source=b),d.viewport=d.viewport?d.viewport:new $.Viewport({containerSize:THIS[d.hash].prevContainerSize,contentSize:d.source.dimensions,springStiffness:d.springStiffness,animationTime:d.animationTime,minZoomImageRatio:d.minZoomImageRatio,maxZoomPixelRatio:d.maxZoomPixelRatio,visibilityRatio:d.visibilityRatio,wrapHorizontal:d.wrapHorizontal,wrapVertical:d.wrapVertical,defaultZoomLevel:d.defaultZoomLevel,minZoomLevel:d.minZoomLevel,maxZoomLevel:d.maxZoomLevel,viewer:d,degrees:d.degrees})),d.preserveViewport&&d.viewport.resetContentSize(d.source.dimensions),d.source.overlays=d.source.overlays||[],d.drawer=new $.Drawer({viewer:d,source:d.source,viewport:d.viewport,element:d.drawersContainer,opacity:d.opacity,maxImageCacheCount:d.maxImageCacheCount,imageLoaderLimit:d.imageLoaderLimit,minZoomImageRatio:d.minZoomImageRatio,wrapHorizontal:d.wrapHorizontal,wrapVertical:d.wrapVertical,immediateRender:d.immediateRender,blendTime:d.blendTime,alwaysBlend:d.alwaysBlend,minPixelRatio:d.collectionMode?0:d.minPixelRatio,timeout:d.timeout,debugMode:d.debugMode,debugGridColor:d.debugGridColor,crossOriginPolicy:d.crossOriginPolicy}),d.drawers=[d.drawer],d.drawer.canRotate()||(d.rotateLeft&&(c=d.buttons.buttons.indexOf(d.rotateLeft),d.buttons.buttons.splice(c,1),d.buttons.element.removeChild(d.rotateLeft.element)),d.rotateRight&&(c=d.buttons.buttons.indexOf(d.rotateRight),d.buttons.buttons.splice(c,1),d.buttons.element.removeChild(d.rotateRight.element))),d.showNavigator&&!d.collectionMode&&(d.navigator?d.navigator.open(b):d.navigator=new $.Navigator({id:d.navigatorId,position:d.navigatorPosition,sizeRatio:d.navigatorSizeRatio,maintainSizeRatio:d.navigatorMaintainSizeRatio,top:d.navigatorTop,left:d.navigatorLeft,width:d.navigatorWidth,height:d.navigatorHeight,autoResize:d.navigatorAutoResize,tileSources:b,tileHost:d.tileHost,prefixUrl:d.prefixUrl,viewer:d})),d.showReferenceStrip&&!d.referenceStrip&&(d.referenceStrip=new $.ReferenceStrip({id:d.referenceStripElement,position:d.referenceStripPosition,sizeRatio:d.referenceStripSizeRatio,scroll:d.referenceStripScroll,height:d.referenceStripHeight,width:d.referenceStripWidth,tileSources:d.tileSources,tileHost:d.tileHost,prefixUrl:d.prefixUrl,viewer:d})),THIS[d.hash].animating=!1,THIS[d.hash].forceRedraw=!0,d._updateRequestId=scheduleUpdate(d,updateMulti),VIEWERS[d.hash]=d,loadOverlays(d),d.raiseEvent("open",{source:b}),d}function loadOverlays(a){a.currentOverlays=[];for(var b=0;b<a.overlays.length;b++)a.currentOverlays[b]=getOverlayObject(a,a.overlays[b]);for(var c=0;c<a.source.overlays.length;c++)a.currentOverlays[b+c]=getOverlayObject(a,a.source.overlays[c])}function getOverlayObject(a,b){if(b instanceof $.Overlay)return b;var c=null;if(b.element)c=$.getElement(b.element);else{var d=b.id?b.id:"openseadragon-overlay-"+Math.floor(1e7*Math.random());c=$.getElement(b.id),c||(c=document.createElement("a"),c.href="#/overlay/"+d),c.id=d,$.addClass(c,b.className?b.className:"openseadragon-overlay")}var e=b.location;e||(e=b.width&&b.height?void 0!==b.px?a.viewport.imageToViewportRectangle(new $.Rect(b.px,b.py,b.width,b.height)):new $.Rect(b.x,b.y,b.width,b.height):void 0!==b.px?a.viewport.imageToViewportCoordinates(new $.Point(b.px,b.py)):new $.Point(b.x,b.y));var f=b.placement;return f&&"string"===$.type(f)&&(f=$.OverlayPlacement[b.placement.toUpperCase()]),new $.Overlay({element:c,location:e,placement:f,onDraw:b.onDraw,checkResize:b.checkResize})}function getOverlayIndex(a,b){var c;for(c=a.length-1;c>=0;c--)if(a[c].element===b)return c;return-1}function drawOverlays(a,b,c){var d,e=b.length;for(d=0;e>d;d++)b[d].drawHTML(c,a)}function scheduleUpdate(a,b){return $.requestAnimationFrame(function(){b(a)})}function scheduleControlsFade(a){$.requestAnimationFrame(function(){updateControlsFade(a)})}function beginControlsAutoHide(a){a.autoHideControls&&(a.controlsShouldFade=!0,a.controlsFadeBeginTime=$.now()+a.controlsFadeDelay,window.setTimeout(function(){scheduleControlsFade(a)},a.controlsFadeDelay))}function updateControlsFade(a){var b,c,d,e;if(a.controlsShouldFade){for(b=$.now(),c=b-a.controlsFadeBeginTime,d=1-c/a.controlsFadeLength,d=Math.min(1,d),d=Math.max(0,d),e=a.controls.length-1;e>=0;e--)a.controls[e].autoFade&&a.controls[e].setOpacity(d);d>0&&scheduleControlsFade(a)}}function abortControlsAutoHide(a){var b;for(a.controlsShouldFade=!1,b=a.controls.length-1;b>=0;b--)a.controls[b].setOpacity(1)}function onFocus(){abortControlsAutoHide(this)}function onBlur(){beginControlsAutoHide(this)}function onCanvasClick(a){var b;!a.preventDefaultAction&&this.viewport&&a.quick&&(b=this.gestureSettingsByDeviceType(a.pointerType),b.clickToZoom&&(this.viewport.zoomBy(a.shift?1/this.zoomPerClick:this.zoomPerClick,this.viewport.pointFromPixel(a.position,!0)),this.viewport.applyConstraints())),this.raiseEvent("canvas-click",{tracker:a.eventSource,position:a.position,quick:a.quick,shift:a.shift,originalEvent:a.originalEvent})}function onCanvasDblClick(a){var b;!a.preventDefaultAction&&this.viewport&&(b=this.gestureSettingsByDeviceType(a.pointerType),b.dblClickToZoom&&(this.viewport.zoomBy(a.shift?1/this.zoomPerClick:this.zoomPerClick,this.viewport.pointFromPixel(a.position,!0)),this.viewport.applyConstraints())),this.raiseEvent("canvas-double-click",{tracker:a.eventSource,position:a.position,shift:a.shift,originalEvent:a.originalEvent})}function onCanvasDrag(a){var b;!a.preventDefaultAction&&this.viewport&&(b=this.gestureSettingsByDeviceType(a.pointerType),this.panHorizontal||(a.delta.x=0),this.panVertical||(a.delta.y=0),this.viewport.panBy(this.viewport.deltaPointsFromPixels(a.delta.negate()),b.flickEnabled),this.constrainDuringPan&&this.viewport.applyConstraints()),this.raiseEvent("canvas-drag",{tracker:a.eventSource,position:a.position,delta:a.delta,speed:a.speed,direction:a.direction,shift:a.shift,originalEvent:a.originalEvent})}function onCanvasDragEnd(a){var b;if(!a.preventDefaultAction&&this.viewport&&(b=this.gestureSettingsByDeviceType(a.pointerType),b.flickEnabled&&a.speed>=b.flickMinSpeed)){var c=b.flickMomentum*a.speed*Math.cos(a.direction),d=b.flickMomentum*a.speed*Math.sin(a.direction),e=this.viewport.pixelFromPoint(this.viewport.getCenter(!0)),f=this.viewport.pointFromPixel(new $.Point(e.x-c,e.y-d));this.panHorizontal||(f.x=e.x),this.panVertical||(f.y=e.y),this.viewport.panTo(f,!1),this.viewport.applyConstraints()}this.raiseEvent("canvas-drag-end",{tracker:a.eventSource,position:a.position,speed:a.speed,direction:a.direction,shift:a.shift,originalEvent:a.originalEvent})}function onCanvasRelease(a){var b;a.insideElementPressed&&this.viewport&&(b=this.gestureSettingsByDeviceType(a.pointerType),b.flickEnabled||this.viewport.applyConstraints()),this.raiseEvent("canvas-release",{tracker:a.eventSource,position:a.position,insideElementPressed:a.insideElementPressed,insideElementReleased:a.insideElementReleased,originalEvent:a.originalEvent})}function onCanvasPinch(a){var b,c,d,e;return!a.preventDefaultAction&&this.viewport&&(b=this.gestureSettingsByDeviceType(a.pointerType),b.pinchToZoom&&(c=this.viewport.pointFromPixel(a.center,!0),d=this.viewport.pointFromPixel(a.lastCenter,!0),e=d.minus(c),this.panHorizontal||(e.x=0),this.panVertical||(e.y=0),this.viewport.zoomBy(a.distance/a.lastDistance,c,!0),this.viewport.panBy(e,!0),this.viewport.applyConstraints())),this.raiseEvent("canvas-pinch",{tracker:a.eventSource,gesturePoints:a.gesturePoints,lastCenter:a.lastCenter,center:a.center,lastDistance:a.lastDistance,distance:a.distance,shift:a.shift,originalEvent:a.originalEvent}),!1}function onCanvasScroll(a){var b,c;return!a.preventDefaultAction&&this.viewport&&(b=this.gestureSettingsByDeviceType(a.pointerType),b.scrollToZoom&&(c=Math.pow(this.zoomPerScroll,a.scroll),this.viewport.zoomBy(c,this.viewport.pointFromPixel(a.position,!0)),this.viewport.applyConstraints())),this.raiseEvent("canvas-scroll",{tracker:a.eventSource,position:a.position,scroll:a.scroll,shift:a.shift,originalEvent:a.originalEvent}),!1}function onContainerExit(a){a.insideElementPressed||(THIS[this.hash].mouseInside=!1,THIS[this.hash].animating||beginControlsAutoHide(this)),this.raiseEvent("container-exit",{tracker:a.eventSource,position:a.position,buttons:a.buttons,insideElementPressed:a.insideElementPressed,buttonDownAny:a.buttonDownAny,originalEvent:a.originalEvent})}function onContainerPress(a){"touch"!==a.pointerType||$.MouseTracker.haveTouchEnter||(THIS[this.hash].mouseInside=!0,abortControlsAutoHide(this))}function onContainerRelease(a){(!a.insideElementReleased||"touch"===a.pointerType&&!$.MouseTracker.haveTouchEnter)&&(THIS[this.hash].mouseInside=!1,THIS[this.hash].animating||beginControlsAutoHide(this)),this.raiseEvent("container-release",{tracker:a.eventSource,position:a.position,insideElementPressed:a.insideElementPressed,insideElementReleased:a.insideElementReleased,originalEvent:a.originalEvent})}function onContainerEnter(a){THIS[this.hash].mouseInside=!0,abortControlsAutoHide(this),this.raiseEvent("container-enter",{tracker:a.eventSource,position:a.position,buttons:a.buttons,insideElementPressed:a.insideElementPressed,buttonDownAny:a.buttonDownAny,originalEvent:a.originalEvent})}function updateMulti(a){return a.source?(updateOnce(a),void(a.source&&(a._updateRequestId=scheduleUpdate(a,updateMulti)))):void(a._updateRequestId=null)}function updateOnce(a){var b,c;if(a.source){if(a.autoResize&&(b=_getSafeElemSize(a.container),!b.equals(THIS[a.hash].prevContainerSize))){var d=a.viewport.getBounds(),e=a.viewport.getCenter();resizeViewportAndRecenter(a,b,d,e),THIS[a.hash].prevContainerSize=b,THIS[a.hash].forceRedraw=!0}c=a.viewport.update(),a.referenceStrip&&(c=a.referenceStrip.update(a.viewport)||c),!THIS[a.hash].animating&&c&&(a.raiseEvent("animation-start"),abortControlsAutoHide(a)),c?(updateDrawers(a),drawOverlays(a.viewport,a.currentOverlays,a.overlaysContainer),a.navigator&&a.navigator.update(a.viewport),a.raiseEvent("animation")):(THIS[a.hash].forceRedraw||drawersNeedUpdate(a))&&(updateDrawers(a),drawOverlays(a.viewport,a.currentOverlays,a.overlaysContainer),a.navigator&&a.navigator.update(a.viewport),THIS[a.hash].forceRedraw=!1),THIS[a.hash].animating&&!c&&(a.raiseEvent("animation-finish"),THIS[a.hash].mouseInside||beginControlsAutoHide(a)),THIS[a.hash].animating=c}}function resizeViewportAndRecenter(a,b,c,d){var e=a.viewport;e.resize(b,!0);var f=1/a.source.aspectRatio,g=c.width<=1?c.width:1,h=c.height<=f?c.height:f,i=new $.Rect(d.x-g/2,d.y-h/2,g,h);e.fitBounds(i,!0)}function updateDrawers(a){for(var b=0;b<a.drawers.length;b++)a.drawers[b].update()}function drawersNeedUpdate(a){for(var b=0;b<a.drawers.length;b++)if(a.drawers[b].needsUpdate())return!0;return!1}function resolveUrl(a,b){return a?a+b:b}function beginZoomingIn(){THIS[this.hash].lastZoomTime=$.now(),THIS[this.hash].zoomFactor=this.zoomPerSecond,THIS[this.hash].zooming=!0,scheduleZoom(this)}function beginZoomingOut(){THIS[this.hash].lastZoomTime=$.now(),THIS[this.hash].zoomFactor=1/this.zoomPerSecond,THIS[this.hash].zooming=!0,scheduleZoom(this)}function endZooming(){THIS[this.hash].zooming=!1}function scheduleZoom(a){$.requestAnimationFrame($.delegate(a,doZoom))}function doZoom(){var a,b,c;THIS[this.hash].zooming&&this.viewport&&(a=$.now(),b=a-THIS[this.hash].lastZoomTime,c=Math.pow(THIS[this.hash].zoomFactor,b/1e3),this.viewport.zoomBy(c),this.viewport.applyConstraints(),THIS[this.hash].lastZoomTime=a,scheduleZoom(this))}function doSingleZoomIn(){this.viewport&&(THIS[this.hash].zooming=!1,this.viewport.zoomBy(this.zoomPerClick/1),this.viewport.applyConstraints())}function doSingleZoomOut(){this.viewport&&(THIS[this.hash].zooming=!1,this.viewport.zoomBy(1/this.zoomPerClick),this.viewport.applyConstraints())}function lightUp(){this.buttons.emulateEnter(),this.buttons.emulateExit()}function onHome(){this.viewport&&this.viewport.goHome()}function onFullScreen(){this.isFullPage()&&!$.isFullScreen()?this.setFullPage(!1):this.setFullScreen(!this.isFullPage()),this.buttons&&this.buttons.emulateExit(),this.fullPageButton.element.focus(),this.viewport&&this.viewport.applyConstraints()}function onRotateLeft(){if(this.viewport){var a=this.viewport.getRotation();0===a?a=270:a-=90,this.viewport.setRotation(a)}}function onRotateRight(){if(this.viewport){var a=this.viewport.getRotation();270===a?a=0:a+=90,this.viewport.setRotation(a)}}function onPrevious(){var a=THIS[this.hash].sequence-1;this.navPrevNextWrap&&0>a&&(a+=this.tileSources.length),this.goToPage(a)}function onNext(){var a=THIS[this.hash].sequence+1;this.navPrevNextWrap&&a>=this.tileSources.length&&(a=0),this.goToPage(a)}var THIS={},VIEWERS={};$.Viewer=function(a){var b,c=arguments,d=this;if($.isPlainObject(a)||(a={id:c[0],xmlPath:c.length>1?c[1]:void 0,prefixUrl:c.length>2?c[2]:void 0,controls:c.length>3?c[3]:void 0,overlays:c.length>4?c[4]:void 0}),a.config&&($.extend(!0,a,a.config),delete a.config),$.extend(!0,this,{id:a.id,hash:a.hash||a.id,element:null,container:null,keyboardCommandArea:null,canvas:null,overlays:[],overlaysContainer:null,previousBody:[],customControls:[],source:null,drawer:null,drawers:[],drawersContainer:null,viewport:null,navigator:null,collectionViewport:null,collectionDrawer:null,navImages:null,buttons:null,profiler:null},$.DEFAULT_SETTINGS,a),"undefined"==typeof this.hash)throw new Error("A hash must be defined, either by specifying options.id or options.hash.");"undefined"!=typeof THIS[this.hash]&&$.console.warn("Hash "+this.hash+" has already been used."),THIS[this.hash]={fsBoundsDelta:new $.Point(1,1),prevContainerSize:null,animating:!1,forceRedraw:!1,mouseInside:!1,group:null,zooming:!1,zoomFactor:null,lastZoomTime:null,sequenced:!1,sequence:0,fullPage:!1,onfullscreenchange:null},this._updateRequestId=null,this.currentOverlays=[],$.EventSource.call(this),this.addHandler("open-failed",function(a){var b=$.getString("Errors.OpenFailed",a.eventSource,a.message);d._showMessage(b)}),$.ControlDock.call(this,a);var e;for(this.xmlPath&&(this.tileSources=[this.xmlPath]),this.tileSources&&($.isArray(this.tileSources)?(this.tileSources.length>1&&(THIS[this.hash].sequenced=!0),this.initialPage>this.tileSources.length-1&&(this.initialPage=this.tileSources.length-1),e=this.tileSources[this.initialPage],THIS[this.hash].sequence=this.initialPage):e=this.tileSources),this.element=this.element||document.getElementById(this.id),this.canvas=$.makeNeutralElement("div"),this.keyboardCommandArea=$.makeNeutralElement("textarea"),this.drawersContainer=$.makeNeutralElement("div"),this.overlaysContainer=$.makeNeutralElement("div"),this.canvas.className="openseadragon-canvas",function(a){a.width="100%",a.height="100%",a.overflow="hidden",a.position="absolute",a.top="0px",a.left="0px",void 0!==a["touch-action"]?a["touch-action"]="none":void 0!==a["-ms-touch-action"]&&(a["-ms-touch-action"]="none")}(this.canvas.style),this.container.className="openseadragon-container",function(a){a.width="100%",a.height="100%",a.position="relative",a.overflow="hidden",a.left="0px",a.top="0px",a.textAlign="left"}(this.container.style),this.keyboardCommandArea.className="keyboard-command-area",function(a){a.width="100%",a.height="100%",a.overflow="hidden",a.position="absolute",a.top="0px",a.left="0px",a.resize="none"}(this.keyboardCommandArea.style),this.container.insertBefore(this.canvas,this.container.firstChild),this.container.insertBefore(this.keyboardCommandArea,this.container.firstChild),this.element.appendChild(this.container),this.canvas.appendChild(this.drawersContainer),this.canvas.appendChild(this.overlaysContainer),this.bodyWidth=document.body.style.width,this.bodyHeight=document.body.style.height,this.bodyOverflow=document.body.style.overflow,this.docOverflow=document.documentElement.style.overflow,this.keyboardCommandArea.innerTracker=new $.MouseTracker({_this:this,element:this.keyboardCommandArea,focusHandler:function(a){if(!a.preventDefaultAction){var b=$.getElementPosition(this.element);window.scrollTo(0,b.y)}},keyHandler:function(a){if(!a.preventDefaultAction)switch(a.keyCode){case 61:return d.viewport.zoomBy(1.1),d.viewport.applyConstraints(),!1;case 45:return d.viewport.zoomBy(.9),d.viewport.applyConstraints(),!1;case 48:return d.viewport.goHome(),d.viewport.applyConstraints(),!1;
case 119:case 87:case 38:return a.shift?d.viewport.zoomBy(1.1):d.viewport.panBy(new $.Point(0,-.05)),d.viewport.applyConstraints(),!1;case 115:case 83:case 40:return a.shift?d.viewport.zoomBy(.9):d.viewport.panBy(new $.Point(0,.05)),d.viewport.applyConstraints(),!1;case 97:case 37:return d.viewport.panBy(new $.Point(-.05,0)),d.viewport.applyConstraints(),!1;case 100:case 39:return d.viewport.panBy(new $.Point(.05,0)),d.viewport.applyConstraints(),!1;default:return!0}}}).setTracking(!0),this.innerTracker=new $.MouseTracker({element:this.canvas,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,dblClickTimeThreshold:this.dblClickTimeThreshold,dblClickDistThreshold:this.dblClickDistThreshold,clickHandler:$.delegate(this,onCanvasClick),dblClickHandler:$.delegate(this,onCanvasDblClick),dragHandler:$.delegate(this,onCanvasDrag),dragEndHandler:$.delegate(this,onCanvasDragEnd),releaseHandler:$.delegate(this,onCanvasRelease),scrollHandler:$.delegate(this,onCanvasScroll),pinchHandler:$.delegate(this,onCanvasPinch)}).setTracking(this.mouseNavEnabled?!0:!1),this.outerTracker=new $.MouseTracker({element:this.container,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,dblClickTimeThreshold:this.dblClickTimeThreshold,dblClickDistThreshold:this.dblClickDistThreshold,enterHandler:$.delegate(this,onContainerEnter),exitHandler:$.delegate(this,onContainerExit),pressHandler:$.delegate(this,onContainerPress),releaseHandler:$.delegate(this,onContainerRelease)}).setTracking(this.mouseNavEnabled?!0:!1),this.toolbar&&(this.toolbar=new $.ControlDock({element:this.toolbar})),this.bindStandardControls(),this.bindSequenceControls(),e&&(this.open(e),this.tileSources.length>1&&this._updateSequenceButtons(this.initialPage)),b=0;b<this.customControls.length;b++)this.addControl(this.customControls[b].id,{anchor:this.customControls[b].anchor});$.requestAnimationFrame(function(){beginControlsAutoHide(d)})},$.extend($.Viewer.prototype,$.EventSource.prototype,$.ControlDock.prototype,{isOpen:function(){return!!this.source},openDzi:function(a){return this.open(a)},openTileSource:function(a){return this.open(a)},open:function(a){var b=this;return b._hideMessage(),getTileSourceImplementation(b,a,function(a){openTileSource(b,a)},function(a){b.raiseEvent("open-failed",a)}),this},close:function(){return null!==this._updateRequestId&&($.cancelAnimationFrame(this._updateRequestId),this._updateRequestId=null),this.navigator&&this.navigator.close(),this.clearOverlays(),this.drawersContainer.innerHTML="",this.overlaysContainer.innerHTML="",this.source=null,this.drawer=null,this.drawers=[],this.viewport=this.preserveViewport?this.viewport:null,VIEWERS[this.hash]=null,delete VIEWERS[this.hash],this.raiseEvent("close"),this},destroy:function(){if(this.close(),this.removeAllHandlers(),this.element)for(;this.element.firstChild;)this.element.removeChild(this.element.firstChild);this.keyboardCommandArea&&this.keyboardCommandArea.innerTracker.destroy(),this.innerTracker&&this.innerTracker.destroy(),this.outerTracker&&this.outerTracker.destroy(),this.canvas=null,this.keyboardCommandArea=null,this.container=null,this.element=null},isMouseNavEnabled:function(){return this.innerTracker.isTracking()},setMouseNavEnabled:function(a){return this.innerTracker.setTracking(a),this.raiseEvent("mouse-enabled",{enabled:a}),this},areControlsEnabled:function(){var a,b=this.controls.length;for(a=0;a<this.controls.length;a++)b=b&&this.controls[a].isVisibile();return b},setControlsEnabled:function(a){return a?abortControlsAutoHide(this):beginControlsAutoHide(this),this.raiseEvent("controls-enabled",{enabled:a}),this},isFullPage:function(){return THIS[this.hash].fullPage},setFullPage:function(a){var b,c,d=document.body,e=d.style,f=document.documentElement.style,g=this;if(a==this.isFullPage())return this;var h={fullPage:a,preventDefaultAction:!1};if(this.raiseEvent("pre-full-page",h),h.preventDefaultAction)return this;if(a){for(this.elementSize=$.getElementSize(this.element),this.pageScroll=$.getPageScroll(),this.elementMargin=this.element.style.margin,this.element.style.margin="0",this.elementPadding=this.element.style.padding,this.element.style.padding="0",this.bodyMargin=e.margin,this.docMargin=f.margin,e.margin="0",f.margin="0",this.bodyPadding=e.padding,this.docPadding=f.padding,e.padding="0",f.padding="0",this.bodyWidth=e.width,this.bodyHeight=e.height,e.width="100%",e.height="100%",this.previousBody=[],THIS[this.hash].prevElementParent=this.element.parentNode,THIS[this.hash].prevNextSibling=this.element.nextSibling,THIS[this.hash].prevElementWidth=this.element.style.width,THIS[this.hash].prevElementHeight=this.element.style.height,b=d.childNodes.length,c=0;b>c;c++)this.previousBody.push(d.childNodes[0]),d.removeChild(d.childNodes[0]);this.toolbar&&this.toolbar.element&&(this.toolbar.parentNode=this.toolbar.element.parentNode,this.toolbar.nextSibling=this.toolbar.element.nextSibling,d.appendChild(this.toolbar.element),$.addClass(this.toolbar.element,"fullpage")),$.addClass(this.element,"fullpage"),d.appendChild(this.element),this.element.style.height=$.getWindowSize().y+"px",this.element.style.width=$.getWindowSize().x+"px",this.toolbar&&this.toolbar.element&&(this.element.style.height=$.getElementSize(this.element).y-$.getElementSize(this.toolbar.element).y+"px"),THIS[this.hash].fullPage=!0,$.delegate(this,onContainerEnter)({})}else{for(this.element.style.margin=this.elementMargin,this.element.style.padding=this.elementPadding,e.margin=this.bodyMargin,f.margin=this.docMargin,e.padding=this.bodyPadding,f.padding=this.docPadding,e.width=this.bodyWidth,e.height=this.bodyHeight,d.removeChild(this.element),b=this.previousBody.length,c=0;b>c;c++)d.appendChild(this.previousBody.shift());$.removeClass(this.element,"fullpage"),THIS[this.hash].prevElementParent.insertBefore(this.element,THIS[this.hash].prevNextSibling),this.toolbar&&this.toolbar.element&&(d.removeChild(this.toolbar.element),$.removeClass(this.toolbar.element,"fullpage"),this.toolbar.parentNode.insertBefore(this.toolbar.element,this.toolbar.nextSibling),delete this.toolbar.parentNode,delete this.toolbar.nextSibling),this.element.style.width=THIS[this.hash].prevElementWidth,this.element.style.height=THIS[this.hash].prevElementHeight;var i=0,j=function(){$.setPageScroll(g.pageScroll);var a=$.getPageScroll();i++,(10>i&&a.x!==g.pageScroll.x||a.y!==g.pageScroll.y)&&$.requestAnimationFrame(j)};$.requestAnimationFrame(j),THIS[this.hash].fullPage=!1,$.delegate(this,onContainerExit)({})}return this.navigator&&this.viewport&&this.navigator.update(this.viewport),this.raiseEvent("full-page",{fullPage:a}),this},setFullScreen:function(a){var b=this;if(!$.supportsFullScreen)return this.setFullPage(a);if($.isFullScreen()===a)return this;var c={fullScreen:a,preventDefaultAction:!1};if(this.raiseEvent("pre-full-screen",c),c.preventDefaultAction)return this;if(a){if(this.setFullPage(!0),!this.isFullPage())return this;this.fullPageStyleWidth=this.element.style.width,this.fullPageStyleHeight=this.element.style.height,this.element.style.width="100%",this.element.style.height="100%";var d=function(){var a=$.isFullScreen();a||($.removeEvent(document,$.fullScreenEventName,d),$.removeEvent(document,$.fullScreenErrorEventName,d),b.setFullPage(!1),b.isFullPage()&&(b.element.style.width=b.fullPageStyleWidth,b.element.style.height=b.fullPageStyleHeight)),b.navigator&&b.viewport&&b.navigator.update(b.viewport),b.raiseEvent("full-screen",{fullScreen:a})};$.addEvent(document,$.fullScreenEventName,d),$.addEvent(document,$.fullScreenErrorEventName,d),$.requestFullScreen(document.body)}else $.exitFullScreen();return this},isVisible:function(){return"hidden"!=this.container.style.visibility},setVisible:function(a){return this.container.style.visibility=a?"":"hidden",this.raiseEvent("visible",{visible:a}),this},addLayer:function(a){function b(a){c.raiseEvent("add-layer-failed",a)}var c=this,d=a.tileSource;if(!this.isOpen())throw new Error("An image must be loaded before adding layers.");if(!d)throw new Error("No tile source provided as new layer.");if(this.collectionMode)throw new Error("Layers not supported in collection mode.");return getTileSourceImplementation(this,d,function(d){if(d instanceof Array)return void b({message:"Sequences can not be added as layers.",source:d,options:a});for(var e=0;e<c.drawers.length;e++){var f=c.drawers[e].source.aspectRatio,g=f-d.aspectRatio;if(Math.abs(g)>c.layersAspectRatioEpsilon)return void b({message:"Aspect ratio mismatch with layer "+e+".",source:d,options:a})}var h=new $.Drawer({viewer:c,source:d,viewport:c.viewport,element:c.drawersContainer,opacity:void 0!==a.opacity?a.opacity:c.opacity,maxImageCacheCount:c.maxImageCacheCount,imageLoaderLimit:c.imageLoaderLimit,minZoomImageRatio:c.minZoomImageRatio,wrapHorizontal:c.wrapHorizontal,wrapVertical:c.wrapVertical,immediateRender:c.immediateRender,blendTime:c.blendTime,alwaysBlend:c.alwaysBlend,minPixelRatio:c.minPixelRatio,timeout:c.timeout,debugMode:c.debugMode,debugGridColor:c.debugGridColor});c.drawers.push(h),void 0!==a.level&&c.setLayerLevel(h,a.level),THIS[c.hash].forceRedraw=!0,c.raiseEvent("add-layer",{options:a,drawer:h})},function(c){c.options=a,b(c)}),this},getLayerAtLevel:function(a){if(a>=this.drawers.length)throw new Error("Level bigger than number of layers.");return this.drawers[a]},getLevelOfLayer:function(a){return $.indexOf(this.drawers,a)},getLayersCount:function(){return this.drawers.length},setLayerLevel:function(a,b){var c=this.getLevelOfLayer(a);if(b>=this.drawers.length)throw new Error("Level bigger than number of layers.");if(b===c||-1===c)return this;if(0===b||0===c){if(THIS[this.hash].sequenced)throw new Error("Cannot reassign base level when in sequence mode.");this.drawer=0===b?a:this.getLayerAtLevel(b),this.source=this.drawer.source}if(this.drawers.splice(c,1),this.drawers.splice(b,0,a),this.drawersContainer.removeChild(a.canvas),0===b){var d=this.drawers[1].canvas;d.parentNode.insertBefore(a.canvas,d)}else{var e=this.drawers[b-1].canvas;e.parentNode.insertBefore(a.canvas,e.nextSibling)}return this.raiseEvent("layer-level-changed",{drawer:a,previousLevel:c,newLevel:b}),this},removeLayer:function(a){var b=this.drawers.indexOf(a);if(-1===b)return this;if(0===b){if(THIS[this.hash].sequenced)throw new Error("Cannot remove base layer when in sequence mode.");if(1===this.drawers.length)return this.close(),this;this.drawer=this.drawers[1]}return this.drawers.splice(b,1),this.drawersContainer.removeChild(a.canvas),this.raiseEvent("remove-layer",{drawer:a}),this},forceRedraw:function(){return THIS[this.hash].forceRedraw=!0,this},bindSequenceControls:function(){var a=$.delegate(this,onFocus),b=$.delegate(this,onBlur),c=$.delegate(this,onNext),d=$.delegate(this,onPrevious),e=this.navImages,f=!0;return this.showSequenceControl&&THIS[this.hash].sequenced&&((this.previousButton||this.nextButton)&&(f=!1),this.previousButton=new $.Button({element:this.previousButton?$.getElement(this.previousButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.PreviousPage"),srcRest:resolveUrl(this.prefixUrl,e.previous.REST),srcGroup:resolveUrl(this.prefixUrl,e.previous.GROUP),srcHover:resolveUrl(this.prefixUrl,e.previous.HOVER),srcDown:resolveUrl(this.prefixUrl,e.previous.DOWN),onRelease:d,onFocus:a,onBlur:b}),this.nextButton=new $.Button({element:this.nextButton?$.getElement(this.nextButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.NextPage"),srcRest:resolveUrl(this.prefixUrl,e.next.REST),srcGroup:resolveUrl(this.prefixUrl,e.next.GROUP),srcHover:resolveUrl(this.prefixUrl,e.next.HOVER),srcDown:resolveUrl(this.prefixUrl,e.next.DOWN),onRelease:c,onFocus:a,onBlur:b}),this.navPrevNextWrap||this.previousButton.disable(),f&&!this.collectionMode&&(this.paging=new $.ButtonGroup({buttons:[this.previousButton,this.nextButton],clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold}),this.pagingControl=this.paging.element,this.toolbar?this.toolbar.addControl(this.pagingControl,{anchor:$.ControlAnchor.BOTTOM_RIGHT}):this.addControl(this.pagingControl,{anchor:this.sequenceControlAnchor||$.ControlAnchor.TOP_LEFT}))),this},bindStandardControls:function(){var a=$.delegate(this,beginZoomingIn),b=$.delegate(this,endZooming),c=$.delegate(this,doSingleZoomIn),d=$.delegate(this,beginZoomingOut),e=$.delegate(this,doSingleZoomOut),f=$.delegate(this,onHome),g=$.delegate(this,onFullScreen),h=$.delegate(this,onRotateLeft),i=$.delegate(this,onRotateRight),j=$.delegate(this,onFocus),k=$.delegate(this,onBlur),l=this.navImages,m=[],n=!0;return this.showNavigationControl&&((this.zoomInButton||this.zoomOutButton||this.homeButton||this.fullPageButton||this.rotateLeftButton||this.rotateRightButton)&&(n=!1),this.showZoomControl&&(m.push(this.zoomInButton=new $.Button({element:this.zoomInButton?$.getElement(this.zoomInButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.ZoomIn"),srcRest:resolveUrl(this.prefixUrl,l.zoomIn.REST),srcGroup:resolveUrl(this.prefixUrl,l.zoomIn.GROUP),srcHover:resolveUrl(this.prefixUrl,l.zoomIn.HOVER),srcDown:resolveUrl(this.prefixUrl,l.zoomIn.DOWN),onPress:a,onRelease:b,onClick:c,onEnter:a,onExit:b,onFocus:j,onBlur:k})),m.push(this.zoomOutButton=new $.Button({element:this.zoomOutButton?$.getElement(this.zoomOutButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.ZoomOut"),srcRest:resolveUrl(this.prefixUrl,l.zoomOut.REST),srcGroup:resolveUrl(this.prefixUrl,l.zoomOut.GROUP),srcHover:resolveUrl(this.prefixUrl,l.zoomOut.HOVER),srcDown:resolveUrl(this.prefixUrl,l.zoomOut.DOWN),onPress:d,onRelease:b,onClick:e,onEnter:d,onExit:b,onFocus:j,onBlur:k}))),this.showHomeControl&&m.push(this.homeButton=new $.Button({element:this.homeButton?$.getElement(this.homeButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.Home"),srcRest:resolveUrl(this.prefixUrl,l.home.REST),srcGroup:resolveUrl(this.prefixUrl,l.home.GROUP),srcHover:resolveUrl(this.prefixUrl,l.home.HOVER),srcDown:resolveUrl(this.prefixUrl,l.home.DOWN),onRelease:f,onFocus:j,onBlur:k})),this.showFullPageControl&&m.push(this.fullPageButton=new $.Button({element:this.fullPageButton?$.getElement(this.fullPageButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.FullPage"),srcRest:resolveUrl(this.prefixUrl,l.fullpage.REST),srcGroup:resolveUrl(this.prefixUrl,l.fullpage.GROUP),srcHover:resolveUrl(this.prefixUrl,l.fullpage.HOVER),srcDown:resolveUrl(this.prefixUrl,l.fullpage.DOWN),onRelease:g,onFocus:j,onBlur:k})),this.showRotationControl&&(m.push(this.rotateLeftButton=new $.Button({element:this.rotateLeftButton?$.getElement(this.rotateLeftButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.RotateLeft"),srcRest:resolveUrl(this.prefixUrl,l.rotateleft.REST),srcGroup:resolveUrl(this.prefixUrl,l.rotateleft.GROUP),srcHover:resolveUrl(this.prefixUrl,l.rotateleft.HOVER),srcDown:resolveUrl(this.prefixUrl,l.rotateleft.DOWN),onRelease:h,onFocus:j,onBlur:k})),m.push(this.rotateRightButton=new $.Button({element:this.rotateRightButton?$.getElement(this.rotateRightButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:$.getString("Tooltips.RotateRight"),srcRest:resolveUrl(this.prefixUrl,l.rotateright.REST),srcGroup:resolveUrl(this.prefixUrl,l.rotateright.GROUP),srcHover:resolveUrl(this.prefixUrl,l.rotateright.HOVER),srcDown:resolveUrl(this.prefixUrl,l.rotateright.DOWN),onRelease:i,onFocus:j,onBlur:k}))),n&&(this.buttons=new $.ButtonGroup({buttons:m,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold}),this.navControl=this.buttons.element,this.addHandler("open",$.delegate(this,lightUp)),this.toolbar?this.toolbar.addControl(this.navControl,{anchor:$.ControlAnchor.TOP_LEFT}):this.addControl(this.navControl,{anchor:this.navigationControlAnchor||$.ControlAnchor.TOP_LEFT}))),this},currentPage:function(){return THIS[this.hash].sequence},goToPage:function(a){return a>=0&&a<this.tileSources.length&&(this.raiseEvent("page",{page:a}),THIS[this.hash].sequence=a,this._updateSequenceButtons(a),this.open(this.tileSources[a]),this.referenceStrip&&this.referenceStrip.setFocus(a)),this},addOverlay:function(a,b,c,d){var e;return e=$.isPlainObject(a)?a:{element:a,location:b,placement:c,onDraw:d},a=$.getElement(e.element),getOverlayIndex(this.currentOverlays,a)>=0?this:(this.currentOverlays.push(getOverlayObject(this,e)),THIS[this.hash].forceRedraw=!0,this.raiseEvent("add-overlay",{element:a,location:e.location,placement:e.placement}),this)},updateOverlay:function(a,b,c){var d;return a=$.getElement(a),d=getOverlayIndex(this.currentOverlays,a),d>=0&&(this.currentOverlays[d].update(b,c),THIS[this.hash].forceRedraw=!0,this.raiseEvent("update-overlay",{element:a,location:b,placement:c})),this},removeOverlay:function(a){var b;return a=$.getElement(a),b=getOverlayIndex(this.currentOverlays,a),b>=0&&(this.currentOverlays[b].destroy(),this.currentOverlays.splice(b,1),THIS[this.hash].forceRedraw=!0,this.raiseEvent("remove-overlay",{element:a})),this},clearOverlays:function(){for(;this.currentOverlays.length>0;)this.currentOverlays.pop().destroy();return THIS[this.hash].forceRedraw=!0,this.raiseEvent("clear-overlay",{}),this},_updateSequenceButtons:function(a){this.nextButton&&(this.tileSources.length-1===a?this.navPrevNextWrap||this.nextButton.disable():this.nextButton.enable()),this.previousButton&&(a>0?this.previousButton.enable():this.navPrevNextWrap||this.previousButton.disable())},_showMessage:function(a){this._hideMessage();var b=$.makeNeutralElement("div");b.appendChild(document.createTextNode(a)),this.messageDiv=$.makeCenteredNode(b),$.addClass(this.messageDiv,"openseadragon-message"),this.container.appendChild(this.messageDiv)},_hideMessage:function(){var a=this.messageDiv;a&&(a.parentNode.removeChild(a),delete this.messageDiv)},gestureSettingsByDeviceType:function(a){switch(a){case"mouse":return this.gestureSettingsMouse;case"touch":return this.gestureSettingsTouch;case"pen":return this.gestureSettingsPen;default:return this.gestureSettingsUnknown}}})}(OpenSeadragon),function(a){function b(a){this.drag?this.drag=!1:this.viewer.viewport&&(this.viewer.viewport.panTo(this.viewport.pointFromPixel(a.position)),this.viewer.viewport.applyConstraints())}function c(a){this.viewer.viewport&&(this.drag=!0,this.panHorizontal||(a.delta.x=0),this.panVertical||(a.delta.y=0),this.viewer.viewport.panBy(this.viewport.deltaPointsFromPixels(a.delta)))}function d(a){a.insideElementPressed&&this.viewer.viewport&&this.viewer.viewport.applyConstraints()}function e(a){return this.viewer.raiseEvent("navigator-scroll",{tracker:a.eventSource,position:a.position,scroll:a.scroll,shift:a.shift,originalEvent:a.originalEvent}),!1}a.Navigator=function(f){var g,h,i,j=f.viewer;f.id?(this.element=document.getElementById(f.id),f.controlOptions={anchor:a.ControlAnchor.NONE,attachToViewer:!1,autoFade:!1}):(f.id="navigator-"+a.now(),this.element=a.makeNeutralElement("div"),f.controlOptions={anchor:a.ControlAnchor.TOP_RIGHT,attachToViewer:!0,autoFade:!0},f.position&&("BOTTOM_RIGHT"==f.position?f.controlOptions.anchor=a.ControlAnchor.BOTTOM_RIGHT:"BOTTOM_LEFT"==f.position?f.controlOptions.anchor=a.ControlAnchor.BOTTOM_LEFT:"TOP_RIGHT"==f.position?f.controlOptions.anchor=a.ControlAnchor.TOP_RIGHT:"TOP_LEFT"==f.position?f.controlOptions.anchor=a.ControlAnchor.TOP_LEFT:"ABSOLUTE"==f.position&&(f.controlOptions.anchor=a.ControlAnchor.ABSOLUTE,f.controlOptions.top=f.top,f.controlOptions.left=f.left,f.controlOptions.height=f.height,f.controlOptions.width=f.width))),this.element.id=f.id,this.element.className+=" navigator",f=a.extend(!0,{sizeRatio:a.DEFAULT_SETTINGS.navigatorSizeRatio},f,{element:this.element,showNavigator:!1,mouseNavEnabled:!1,showNavigationControl:!1,showSequenceControl:!1,immediateRender:!0,blendTime:0,animationTime:0,autoResize:f.autoResize}),f.minPixelRatio=this.minPixelRatio=j.minPixelRatio,this.borderWidth=2,this.fudge=new a.Point(1,1),this.totalBorderWidths=new a.Point(2*this.borderWidth,2*this.borderWidth).minus(this.fudge),f.controlOptions.anchor!=a.ControlAnchor.NONE&&!function(a,b){a.margin="0px",a.border=b+"px solid #555",a.padding="0px",a.background="#000",a.opacity=.8,a.overflow="hidden"}(this.element.style,this.borderWidth),this.displayRegion=a.makeNeutralElement("div"),this.displayRegion.id=this.element.id+"-displayregion",this.displayRegion.className="displayregion",function(a,b){a.position="relative",a.top="0px",a.left="0px",a.fontSize="0px",a.overflow="hidden",a.border=b+"px solid #900",a.margin="0px",a.padding="0px",a.background="transparent",a["float"]="left",a.cssFloat="left",a.styleFloat="left",a.zIndex=999999999,a.cursor="default"}(this.displayRegion.style,this.borderWidth),this.element.innerTracker=new a.MouseTracker({element:this.element,dragHandler:a.delegate(this,c),clickHandler:a.delegate(this,b),releaseHandler:a.delegate(this,d),scrollHandler:a.delegate(this,e)}).setTracking(!0),j.addControl(this.element,f.controlOptions),f.controlOptions.anchor!=a.ControlAnchor.ABSOLUTE&&f.controlOptions.anchor!=a.ControlAnchor.NONE&&(f.width&&f.height?(this.element.style.height="number"==typeof f.height?f.height+"px":f.height,this.element.style.width="number"==typeof f.width?f.width+"px":f.width):(g=a.getElementSize(j.element),this.element.style.height=Math.round(g.y*f.sizeRatio)+"px",this.element.style.width=Math.round(g.x*f.sizeRatio)+"px",this.oldViewerSize=g),h=a.getElementSize(this.element),this.elementArea=h.x*h.y),this.oldContainerSize=new a.Point(0,0),a.Viewer.apply(this,[f]),this.element.getElementsByTagName("div")[0].appendChild(this.displayRegion),i=this.element.getElementsByTagName("textarea")[0],i&&i.parentNode.removeChild(i)},a.extend(a.Navigator.prototype,a.EventSource.prototype,a.Viewer.prototype,{updateSize:function(){if(this.viewport){var b=new a.Point(0===this.container.clientWidth?1:this.container.clientWidth,0===this.container.clientHeight?1:this.container.clientHeight);if(!b.equals(this.oldContainerSize)){var c=this.viewport.getBounds(),d=this.viewport.getCenter();this.viewport.resize(b,!0);var e=1/this.source.aspectRatio,f=c.width<=1?c.width:1,g=c.height<=e?c.height:e,h=new a.Rect(d.x-f/2,d.y-g/2,f,g);this.viewport.fitBounds(h,!0),this.oldContainerSize=b,this.drawer.update()}}},update:function(b){var c,d,e,f,g,h;c=a.getElementSize(this.viewer.element),c.equals(this.oldViewerSize)||(this.oldViewerSize=c,this.maintainSizeRatio?(d=c.x*this.sizeRatio,e=c.y*this.sizeRatio):(d=Math.sqrt(this.elementArea*(c.x/c.y)),e=this.elementArea/d),this.element.style.width=Math.round(d)+"px",this.element.style.height=Math.round(e)+"px",this.updateSize()),b&&this.viewport&&(f=b.getBounds(!0),g=this.viewport.pixelFromPoint(f.getTopLeft(),!1),h=this.viewport.pixelFromPoint(f.getBottomRight(),!1).minus(this.totalBorderWidths),function(a){a.top=Math.round(g.y)+"px",a.left=Math.round(g.x)+"px";var b=Math.abs(g.x-h.x),c=Math.abs(g.y-h.y);a.width=Math.round(Math.max(b,0))+"px",a.height=Math.round(Math.max(c,0))+"px"}(this.displayRegion.style))},open:function(b){this.updateSize();var c=this.viewer.viewport.containerSize.times(this.sizeRatio);return this.minPixelRatio=b.tileSize>c.x||b.tileSize>c.y?Math.min(c.x,c.y)/b.tileSize:this.viewer.minPixelRatio,a.Viewer.prototype.open.apply(this,[b])}})}(OpenSeadragon),function(a){var b={Errors:{Dzc:"Sorry, we don't support Deep Zoom Collections!",Dzi:"Hmm, this doesn't appear to be a valid Deep Zoom Image.",Xml:"Hmm, this doesn't appear to be a valid Deep Zoom Image.",ImageFormat:"Sorry, we don't support {0}-based Deep Zoom Images.",Security:"It looks like a security restriction stopped us from loading this Deep Zoom Image.",Status:"This space unintentionally left blank ({0} {1}).",OpenFailed:"Unable to open {0}: {1}"},Tooltips:{FullPage:"Toggle full page",Home:"Go home",ZoomIn:"Zoom in",ZoomOut:"Zoom out",NextPage:"Next page",PreviousPage:"Previous page",RotateLeft:"Rotate left",RotateRight:"Rotate right"}};a.extend(a,{getString:function(c){var d,e=c.split("."),f=null,g=arguments,h=b;for(d=0;d<e.length-1;d++)h=h[e[d]]||{};return f=h[e[d]],"string"!=typeof f&&(a.console.debug("Untranslated source string:",c),f=""),f.replace(/\{\d+\}/g,function(a){var b=parseInt(a.match(/\d+/),10)+1;return b<g.length?g[b]:""})},setString:function(a,c){var d,e=a.split("."),f=b;for(d=0;d<e.length-1;d++)f[e[d]]||(f[e[d]]={}),f=f[e[d]];f[e[d]]=c}})}(OpenSeadragon),function(a){a.Point=function(a,b){this.x="number"==typeof a?a:0,this.y="number"==typeof b?b:0},a.Point.prototype={plus:function(b){return new a.Point(this.x+b.x,this.y+b.y)},minus:function(b){return new a.Point(this.x-b.x,this.y-b.y)},times:function(b){return new a.Point(this.x*b,this.y*b)},divide:function(b){return new a.Point(this.x/b,this.y/b)},negate:function(){return new a.Point(-this.x,-this.y)},distanceTo:function(a){return Math.sqrt(Math.pow(this.x-a.x,2)+Math.pow(this.y-a.y,2))},apply:function(b){return new a.Point(b(this.x),b(this.y))},equals:function(b){return b instanceof a.Point&&this.x===b.x&&this.y===b.y},rotate:function(b,c){var d=b*Math.PI/180,e=Math.cos(d)*(this.x-c.x)-Math.sin(d)*(this.y-c.y)+c.x,f=Math.sin(d)*(this.x-c.x)+Math.cos(d)*(this.y-c.y)+c.y;return new a.Point(e,f)},toString:function(){return"("+Math.round(this.x)+","+Math.round(this.y)+")"}}}(OpenSeadragon),function($){function processResponse(xhr){var responseText=xhr.responseText,status=xhr.status,statusText,data;if(!xhr)throw new Error($.getString("Errors.Security"));if(200!==xhr.status&&0!==xhr.status)throw status=xhr.status,statusText=404==status?"Not Found":xhr.statusText,new Error($.getString("Errors.Status",status,statusText));if(responseText.match(/\s*<.*/))try{data=xhr.responseXML&&xhr.responseXML.documentElement?xhr.responseXML:$.parseXml(responseText)}catch(e){data=xhr.responseText}else data=responseText.match(/\s*[\{\[].*/)?eval("("+responseText+")"):responseText;return data}$.TileSource=function(a){var b,c,d=null,e=arguments;for(b=$.isPlainObject(a)?a:{width:e[0],height:e[1],tileSize:e[2],tileOverlap:e[3],minLevel:e[4],maxLevel:e[5]},$.EventSource.call(this),$.extend(!0,this,b),c=0;c<arguments.length;c++)if($.isFunction(arguments[c])){d=arguments[c],this.addHandler("ready",function(a){d(a)});break}"string"==$.type(arguments[0])?(this.aspectRatio=1,this.dimensions=new $.Point(10,10),this.tileSize=0,this.tileOverlap=0,this.minLevel=0,this.maxLevel=0,this.ready=!1,this.getImageInfo(arguments[0])):(this.ready=!0,this.aspectRatio=b.width&&b.height?b.width/b.height:1,this.dimensions=new $.Point(b.width,b.height),this.tileSize=b.tileSize?b.tileSize:0,this.tileOverlap=b.tileOverlap?b.tileOverlap:0,this.minLevel=b.minLevel?b.minLevel:0,this.maxLevel=void 0!==b.maxLevel&&null!==b.maxLevel?b.maxLevel:b.width&&b.height?Math.ceil(Math.log(Math.max(b.width,b.height))/Math.log(2)):0,d&&$.isFunction(d)&&d(this))},$.TileSource.prototype={getLevelScale:function(a){var b,c={};for(b=0;b<=this.maxLevel;b++)c[b]=1/Math.pow(2,this.maxLevel-b);return this.getLevelScale=function(a){return c[a]},this.getLevelScale(a)},getNumTiles:function(a){var b=this.getLevelScale(a),c=Math.ceil(b*this.dimensions.x/this.tileSize),d=Math.ceil(b*this.dimensions.y/this.tileSize);return new $.Point(c,d)},getPixelRatio:function(a){var b=this.dimensions.times(this.getLevelScale(a)),c=1/b.x,d=1/b.y;return new $.Point(c,d)},getClosestLevel:function(a){var b,c,d=Math.floor(Math.max(a.x,a.y)/this.tileSize);for(b=this.minLevel;b<this.maxLevel&&(c=this.getNumTiles(b),!(Math.max(c.x,c.y)+1>=d));b++);return Math.max(0,b-1)},getTileAtPoint:function(a,b){var c=b.times(this.dimensions.x).times(this.getLevelScale(a)),d=Math.floor(c.x/this.tileSize),e=Math.floor(c.y/this.tileSize);return new $.Point(d,e)},getTileBounds:function(a,b,c){var d=this.dimensions.times(this.getLevelScale(a)),e=0===b?0:this.tileSize*b-this.tileOverlap,f=0===c?0:this.tileSize*c-this.tileOverlap,g=this.tileSize+(0===b?1:2)*this.tileOverlap,h=this.tileSize+(0===c?1:2)*this.tileOverlap,i=1/d.x;return g=Math.min(g,d.x-e),h=Math.min(h,d.y-f),new $.Rect(e*i,f*i,g*i,h*i)},getImageInfo:function(a){var b,c,d,e,f,g,h,i=this;a&&(f=a.split("/"),g=f[f.length-1],h=g.lastIndexOf("."),h>-1&&(f[f.length-1]=g.slice(0,h))),c=function(b){"string"==typeof b&&(b=$.parseXml(b));var c=$.TileSource.determineType(i,b,a);return c?(e=c.prototype.configure.apply(i,[b,a]),d=new c(e),i.ready=!0,void i.raiseEvent("ready",{tileSource:d})):void i.raiseEvent("open-failed",{message:"Unable to load TileSource",source:a})},a.match(/\.js$/)?(b=a.split("/").pop().replace(".js",""),$.jsonp({url:a,async:!1,callbackName:b,callback:c})):$.makeAjaxRequest(a,function(a){var b=processResponse(a);c(b)},function(b,c){var d;try{d="HTTP "+b.status+" attempting to load TileSource"}catch(e){var f;f="undefined"!=typeof c&&c.toString?c.toString():"Unknown error",d=f+" attempting to load TileSource"}i.raiseEvent("open-failed",{message:d,source:a})})},supports:function(){return!1},configure:function(){throw new Error("Method not implemented.")},getTileUrl:function(){throw new Error("Method not implemented.")},tileExists:function(a,b,c){var d=this.getNumTiles(a);return a>=this.minLevel&&a<=this.maxLevel&&b>=0&&c>=0&&b<d.x&&c<d.y}},$.extend(!0,$.TileSource.prototype,$.EventSource.prototype),$.TileSource.determineType=function(a,b,c){var d;for(d in OpenSeadragon)if(d.match(/.+TileSource$/)&&$.isFunction(OpenSeadragon[d])&&$.isFunction(OpenSeadragon[d].prototype.supports)&&OpenSeadragon[d].prototype.supports.call(a,b,c))return OpenSeadragon[d];$.console.error("No TileSource was able to open %s %s",c,b)}}(OpenSeadragon),function(a){function b(b,d){if(!d||!d.documentElement)throw new Error(a.getString("Errors.Xml"));var e,f,g,h,i,j=d.documentElement,k=j.tagName,l=null,m=[];if("Image"==k)try{if(h=j.getElementsByTagName("Size")[0],l={Image:{xmlns:"http://schemas.microsoft.com/deepzoom/2008",Url:j.getAttribute("Url"),Format:j.getAttribute("Format"),DisplayRect:null,Overlap:parseInt(j.getAttribute("Overlap"),10),TileSize:parseInt(j.getAttribute("TileSize"),10),Size:{Height:parseInt(h.getAttribute("Height"),10),Width:parseInt(h.getAttribute("Width"),10)}}},!a.imageFormatSupported(l.Image.Format))throw new Error(a.getString("Errors.ImageFormat",l.Image.Format.toUpperCase()));for(e=j.getElementsByTagName("DisplayRect"),i=0;i<e.length;i++)f=e[i],g=f.getElementsByTagName("Rect")[0],m.push({Rect:{X:parseInt(g.getAttribute("X"),10),Y:parseInt(g.getAttribute("Y"),10),Width:parseInt(g.getAttribute("Width"),10),Height:parseInt(g.getAttribute("Height"),10),MinLevel:parseInt(f.getAttribute("MinLevel"),10),MaxLevel:parseInt(f.getAttribute("MaxLevel"),10)}});return m.length&&(l.Image.DisplayRect=m),c(b,l)}catch(n){throw n instanceof Error?n:new Error(a.getString("Errors.Dzi"))}else{if("Collection"==k)throw new Error(a.getString("Errors.Dzc"));if("Error"==k)return a._processDZIError(j)}throw new Error(a.getString("Errors.Dzi"))}function c(b,c){var d,e,f=c.Image,g=f.Url,h=f.Format,i=f.Size,j=f.DisplayRect||[],k=parseInt(i.Width,10),l=parseInt(i.Height,10),m=parseInt(f.TileSize,10),n=parseInt(f.Overlap,10),o=[];for(e=0;e<j.length;e++)d=j[e].Rect,o.push(new a.DisplayRect(parseInt(d.X,10),parseInt(d.Y,10),parseInt(d.Width,10),parseInt(d.Height,10),parseInt(d.MinLevel,10),parseInt(d.MaxLevel,10)));return a.extend(!0,{width:k,height:l,tileSize:m,tileOverlap:n,minLevel:null,maxLevel:null,tilesUrl:g,fileFormat:h,displayRects:o},c)}a.DziTileSource=function(b){var c,d,e,f;if(f=a.isPlainObject(b)?b:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4],fileFormat:arguments[5],displayRects:arguments[6],minLevel:arguments[7],maxLevel:arguments[8]},this._levelRects={},this.tilesUrl=f.tilesUrl,this.fileFormat=f.fileFormat,this.displayRects=f.displayRects,this.displayRects)for(c=this.displayRects.length-1;c>=0;c--)for(d=this.displayRects[c],e=d.minLevel;e<=d.maxLevel;e++)this._levelRects[e]||(this._levelRects[e]=[]),this._levelRects[e].push(d);
a.TileSource.apply(this,[f])},a.extend(a.DziTileSource.prototype,a.TileSource.prototype,{supports:function(a){var b;return a.Image?b=a.Image.xmlns:a.documentElement&&"Image"==a.documentElement.tagName&&(b=a.documentElement.namespaceURI),"http://schemas.microsoft.com/deepzoom/2008"==b||"http://schemas.microsoft.com/deepzoom/2009"==b},configure:function(d,e){var f;return f=a.isPlainObject(d)?c(this,d):b(this,d),e&&!f.tilesUrl&&(f.tilesUrl=e.replace(/([^\/]+)\.(dzi|xml|js)(\?.*|$)/,"$1_files/"),f.queryParams=-1!=e.search(/\.(dzi|xml|js)\?/)?e.match(/\?.*/):""),f},getTileUrl:function(a,b,c){return[this.tilesUrl,a,"/",b,"_",c,".",this.fileFormat,this.queryParams].join("")},tileExists:function(a,b,c){var d,e,f,g,h,i,j,k=this._levelRects[a];if(!k||!k.length)return!0;for(j=k.length-1;j>=0;j--)if(d=k[j],!(a<d.minLevel||a>d.maxLevel)&&(e=this.getLevelScale(a),f=d.x*e,g=d.y*e,h=f+d.width*e,i=g+d.height*e,f=Math.floor(f/this.tileSize),g=Math.floor(g/this.tileSize),h=Math.ceil(h/this.tileSize),i=Math.ceil(i/this.tileSize),b>=f&&h>b&&c>=g&&i>c))return!0;return!1}})}(OpenSeadragon),function(a){function b(b,e){if(!e||!e.documentElement)throw new Error(a.getString("Errors.Xml"));var f=e.documentElement,g=f.tagName,h=null;if("info"==g)try{return h={ns:f.namespaceURI},c(f,h),d(b,h)}catch(i){throw i instanceof Error?i:new Error(a.getString("Errors.IIIF"))}throw new Error(a.getString("Errors.IIIF"))}function c(b,d,e){var f,g;if(3==b.nodeType&&e)g=b.nodeValue.trim(),g.match(/^\d*$/)&&(g=Number(g)),d[e]?(a.isArray(d[e])||(d[e]=[d[e]]),d[e].push(g)):d[e]=g;else if(1==b.nodeType)for(f=0;f<b.childNodes.length;f++)c(b.childNodes[f],d,b.nodeName)}function d(a,b){return b.image_host&&(b.tilesUrl=b.image_host),b}a.IIIFTileSource=function(b){if(a.extend(!0,this,b),!(this.height&&this.width&&this.identifier&&this.tilesUrl))throw new Error("IIIF required parameters not provided.");if(b.tileSize=this.tile_width,!b.maxLevel){var c=-1,d=this.scale_factors||this.scale_factor;if(d instanceof Array)for(var e=0;e<d.length;e++){var f=Number(d[e]);!isNaN(f)&&f>c&&(c=f)}b.maxLevel=0>c?Number(Math.ceil(Math.log(Math.max(this.width,this.height),2))):c}a.TileSource.apply(this,[b])},a.extend(a.IIIFTileSource.prototype,a.TileSource.prototype,{supports:function(a){return a.ns&&"http://library.stanford.edu/iiif/image-api/ns/"==a.ns||a.profile&&("http://library.stanford.edu/iiif/image-api/compliance.html#level1"==a.profile||"http://library.stanford.edu/iiif/image-api/compliance.html#level2"==a.profile||"http://library.stanford.edu/iiif/image-api/compliance.html#level3"==a.profile||"http://library.stanford.edu/iiif/image-api/compliance.html"==a.profile)||a.documentElement&&"info"==a.documentElement.tagName&&"http://library.stanford.edu/iiif/image-api/ns/"==a.documentElement.namespaceURI},configure:function(c,e){var f,g,h;return g=a.isPlainObject(c)?d(this,c):b(this,c),e&&!g.tilesUrl&&(f=e.split("/"),f.pop(),f=f.join("/"),"http"!==e.substring(0,4)&&(h=location.protocol+"//"+location.host,f=h+f),g.tilesUrl=f.replace(c.identifier,"")),g},getTileUrl:function(a,b,c){var d,e,f,g,h,i,j="0",k="native.jpg",l=Math.pow(.5,this.maxLevel-a),m=Math.ceil(this.width*l),n=Math.ceil(this.height*l),o=Math.ceil(this.tileSize/l),p=Math.ceil(this.tileSize/l);return m<this.tile_width&&n<this.tile_height?(i=m+",",d="full"):(e=b*o,f=c*p,g=Math.min(o,this.width-e),h=Math.min(p,this.height-f),i=Math.ceil(g*l)+",",d=[e,f,g,h].join(",")),[this.tilesUrl,this.identifier,d,i,j,k].join("/")}})}(OpenSeadragon),function(a){a.IIIF1_1TileSource=function(b){if(a.extend(!0,this,b),!(this.height&&this.width&&this["@id"]))throw new Error("IIIF required parameters not provided.");if(this.profile&&"http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0"==this.profile)throw new Error("IIIF Image API 1.1 compliance level 1 or greater is required.");if(this.tile_width)b.tileSize=this.tile_width;else if(this.tile_height)b.tileSize=this.tile_height;else{for(var c=Math.min(this.height,this.width),d=[256,512,1024],e=[],f=0;f<d.length;f++)d[f]<=c&&e.push(d[f]);b.tileSize=e.length>0?Math.max.apply(null,e):c,this.tile_width=b.tileSize,this.tile_height=b.tileSize}if(!b.maxLevel){var g=-1,h=this.scale_factors||this.scale_factor;if(h instanceof Array)for(var i=0;i<h.length;i++){var j=Number(h[i]);!isNaN(j)&&j>g&&(g=j)}b.maxLevel=0>g?Number(Math.ceil(Math.log(Math.max(this.width,this.height),2))):g}a.TileSource.apply(this,[b])},a.extend(a.IIIF1_1TileSource.prototype,a.TileSource.prototype,{supports:function(a){return a["@context"]&&"http://library.stanford.edu/iiif/image-api/1.1/context.json"==a["@context"]},configure:function(a){return a},getTileUrl:function(a,b,c){var d,e,f,g,h,i,j,k="0",l="native.jpg",m=Math.pow(.5,this.maxLevel-a),n=Math.ceil(this.width*m),o=Math.ceil(this.height*m),p=Math.ceil(this.tileSize/m),q=Math.ceil(this.tileSize/m);return n<this.tile_width&&o<this.tile_height?(i=n+",",d="full"):(e=b*p,f=c*q,g=Math.min(p,this.width-e),h=Math.min(q,this.height-f),i=Math.ceil(g*m)+",",d=[e,f,g,h].join(",")),j=[this["@id"],d,i,k,l].join("/")}})}(OpenSeadragon),function(a){a.OsmTileSource=function(b){var c;c=a.isPlainObject(b)?b:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4]},c.width&&c.height||(c.width=65572864,c.height=65572864),c.tileSize||(c.tileSize=256,c.tileOverlap=0),c.tilesUrl||(c.tilesUrl="http://tile.openstreetmap.org/"),c.minLevel=8,a.TileSource.apply(this,[c])},a.extend(a.OsmTileSource.prototype,a.TileSource.prototype,{supports:function(a){return a.type&&"openstreetmaps"==a.type},configure:function(a){return a},getTileUrl:function(a,b,c){return this.tilesUrl+(a-8)+"/"+b+"/"+c+".png"}})}(OpenSeadragon),function(a){a.TmsTileSource=function(b){var c;c=a.isPlainObject(b)?b:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4]};var d,e=256*Math.ceil(c.width/256),f=256*Math.ceil(c.height/256);d=e>f?e/256:f/256,c.maxLevel=Math.ceil(Math.log(d)/Math.log(2))-1,c.tileSize=256,c.width=e,c.height=f,a.TileSource.apply(this,[c])},a.extend(a.TmsTileSource.prototype,a.TileSource.prototype,{supports:function(a){return a.type&&"tiledmapservice"==a.type},configure:function(a){return a},getTileUrl:function(a,b,c){var d=this.getNumTiles(a).y-1;return this.tilesUrl+a+"/"+b+"/"+(d-c)+".png"}})}(OpenSeadragon),function(a){function b(b){var c,d,e=[];for(d=0;d<b.length;d++)c=b[d],c.height&&c.width&&c.url&&(c.url.toLowerCase().match(/^.*\.(png|jpg|jpeg|gif)$/)||c.mimetype&&c.mimetype.toLowerCase().match(/^.*\/(png|jpg|jpeg|gif)$/))?e.push({url:c.url,width:Number(c.width),height:Number(c.height)}):a.console.error("Unsupported image format: %s",c.url?c.url:"<no URL>");return e.sort(function(a,b){return a.height-b.height})}function c(b,c){if(!c||!c.documentElement)throw new Error(a.getString("Errors.Xml"));var e,f,g=c.documentElement,h=g.tagName,i=null,j=[];if("image"==h)try{for(i={type:g.getAttribute("type"),levels:[]},j=g.getElementsByTagName("level"),f=0;f<j.length;f++)e=j[f],i.levels.push({url:e.getAttribute("url"),width:parseInt(e.getAttribute("width"),10),height:parseInt(e.getAttribute("height"),10)});return d(b,i)}catch(k){throw k instanceof Error?k:new Error("Unknown error parsing Legacy Image Pyramid XML.")}else{if("collection"==h)throw new Error("Legacy Image Pyramid Collections not yet supported.");if("error"==h)throw new Error("Error: "+c)}throw new Error("Unknown element "+h)}function d(a,b){return b.levels}a.LegacyTileSource=function(c){var d,e,f;a.isArray(c)&&(d={type:"legacy-image-pyramid",levels:c}),d.levels=b(d.levels),d.levels.length>0?(e=d.levels[d.levels.length-1].width,f=d.levels[d.levels.length-1].height):(e=0,f=0,a.console.error("No supported image formats found")),a.extend(!0,d,{width:e,height:f,tileSize:Math.max(f,e),tileOverlap:0,minLevel:0,maxLevel:d.levels.length>0?d.levels.length-1:0}),a.TileSource.apply(this,[d]),this.levels=d.levels},a.extend(a.LegacyTileSource.prototype,a.TileSource.prototype,{supports:function(a){return a.type&&"legacy-image-pyramid"==a.type||a.documentElement&&"legacy-image-pyramid"==a.documentElement.getAttribute("type")},configure:function(b){var e;return e=a.isPlainObject(b)?d(this,b):c(this,b)},getLevelScale:function(a){var b=0/0;return this.levels.length>0&&a>=this.minLevel&&a<=this.maxLevel&&(b=this.levels[a].width/this.levels[this.maxLevel].width),b},getNumTiles:function(b){var c=this.getLevelScale(b);return c?new a.Point(1,1):new a.Point(0,0)},getTileAtPoint:function(){return new a.Point(0,0)},getTileUrl:function(a){var b=null;return this.levels.length>0&&a>=this.minLevel&&a<=this.maxLevel&&(b=this.levels[a].url),b}})}(OpenSeadragon),function(a){a.TileSourceCollection=function(b){var c;c=a.isPlainObject(b)?b:{tileSize:arguments[0],tileSources:arguments[1],rows:arguments[2],layout:arguments[3]},c.layout||(c.layout="horizontal");var d=0,e=1,f=Math.ceil(c.tileSources.length/c.rows),g=f>=c.rows?f:c.rows;"horizontal"==c.layout?(c.width=c.tileSize*f,c.height=c.tileSize*c.rows):(c.height=c.tileSize*f,c.width=c.tileSize*c.rows);for(var h=0;h<c.tileSources.length;h++)if(a.isPlainObject(c.tileSources[h])&&c.tileSources[h].width&&c.tileSources[h].height&&!c.tileSources[h].aspectRatio){var i=c.tileSources[h].width/c.tileSources[h].height;c.tileSources[h].aspectRatio=i}for(c.tileOverlap=-c.tileMargin,c.tilesPerRow=f;e<c.tileSize*g;)e=2*e,d++;c.minLevel=d,a.TileSource.apply(this,[c])},a.extend(a.TileSourceCollection.prototype,a.TileSource.prototype,{getTileBounds:function(b,c,d){var e=c;"horizontal"==this.layout?this.rows>1&&(e=d):e=d;var f=this.tileSources[e],g=1,h=0,i=0,j=1;if(a.isPlainObject(f))if(g=Math.min(f.aspectRatio,1),this.rows>1&&1==this.tilesPerRow){for(var k=0;k<this.tileSources.length;k++)this.tileSources[k].aspectRatio<j&&(j=this.tileSources[k].aspectRatio);h=j,g>j&&(i=(g-j)/g)}else{if(0===e)h=1;else{for(var l=0,m=e-1;m>=0;m--){var n=this.tileSources[m];h+=Math.min(n.aspectRatio,1),l++}h/=l}for(var o=0;o<this.tileSources.length;o++)i+=Math.max(0,1-this.tileSources[o].aspectRatio)}var p=this.dimensions.times(this.getLevelScale(b)),q=this.tileSize*c-this.tileOverlap,r=this.tileSize*d-this.tileOverlap,s=this.tileSize+1*this.tileOverlap,t=this.tileSize+1*this.tileOverlap,u=1/p.x,v=this.tileSize*i/this.tileSources.length*u;return s=Math.min(s,p.x-q),t=Math.min(t,p.y-r),"horizontal"==this.layout?1==this.rows?new a.Rect(q*u*h+v,r*u,s*u*g,t*u):new a.Rect(q*u,r*u+v,s*u*j,t*u):new a.Rect(q*u,r*u,s*u,t*u)},configure:function(){},getTileUrl:function(){return null}})}(OpenSeadragon),function(a){function b(b){a.requestAnimationFrame(function(){c(b)})}function c(c){var d,e,f;c.shouldFade&&(d=a.now(),e=d-c.fadeBeginTime,f=1-e/c.fadeLength,f=Math.min(1,f),f=Math.max(0,f),c.imgGroup&&a.setElementOpacity(c.imgGroup,f,!0),f>0&&b(c))}function d(c){c.shouldFade=!0,c.fadeBeginTime=a.now()+c.fadeDelay,window.setTimeout(function(){b(c)},c.fadeDelay)}function e(b){b.shouldFade=!1,b.imgGroup&&a.setElementOpacity(b.imgGroup,1,!0)}function f(b,c){b.element.disabled||(c>=a.ButtonState.GROUP&&b.currentState==a.ButtonState.REST&&(e(b),b.currentState=a.ButtonState.GROUP),c>=a.ButtonState.HOVER&&b.currentState==a.ButtonState.GROUP&&(b.imgHover&&(b.imgHover.style.visibility=""),b.currentState=a.ButtonState.HOVER),c>=a.ButtonState.DOWN&&b.currentState==a.ButtonState.HOVER&&(b.imgDown&&(b.imgDown.style.visibility=""),b.currentState=a.ButtonState.DOWN))}function g(b,c){b.element.disabled||(c<=a.ButtonState.HOVER&&b.currentState==a.ButtonState.DOWN&&(b.imgDown&&(b.imgDown.style.visibility="hidden"),b.currentState=a.ButtonState.HOVER),c<=a.ButtonState.GROUP&&b.currentState==a.ButtonState.HOVER&&(b.imgHover&&(b.imgHover.style.visibility="hidden"),b.currentState=a.ButtonState.GROUP),c<=a.ButtonState.REST&&b.currentState==a.ButtonState.GROUP&&(d(b),b.currentState=a.ButtonState.REST))}a.ButtonState={REST:0,GROUP:1,HOVER:2,DOWN:3},a.Button=function(b){var c=this;a.EventSource.call(this),a.extend(!0,this,{tooltip:null,srcRest:null,srcGroup:null,srcHover:null,srcDown:null,clickTimeThreshold:a.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:a.DEFAULT_SETTINGS.clickDistThreshold,fadeDelay:0,fadeLength:2e3,onPress:null,onRelease:null,onClick:null,onEnter:null,onExit:null,onFocus:null,onBlur:null},b),this.element=b.element||a.makeNeutralElement("div"),b.element||(this.imgRest=a.makeTransparentImage(this.srcRest),this.imgGroup=a.makeTransparentImage(this.srcGroup),this.imgHover=a.makeTransparentImage(this.srcHover),this.imgDown=a.makeTransparentImage(this.srcDown),this.imgRest.alt=this.imgGroup.alt=this.imgHover.alt=this.imgDown.alt=this.tooltip,this.element.style.position="relative",this.imgGroup.style.position=this.imgHover.style.position=this.imgDown.style.position="absolute",this.imgGroup.style.top=this.imgHover.style.top=this.imgDown.style.top="0px",this.imgGroup.style.left=this.imgHover.style.left=this.imgDown.style.left="0px",this.imgHover.style.visibility=this.imgDown.style.visibility="hidden",a.Browser.vendor==a.BROWSERS.FIREFOX&&a.Browser.version<3&&(this.imgGroup.style.top=this.imgHover.style.top=this.imgDown.style.top=""),this.element.appendChild(this.imgRest),this.element.appendChild(this.imgGroup),this.element.appendChild(this.imgHover),this.element.appendChild(this.imgDown)),this.addHandler("press",this.onPress),this.addHandler("release",this.onRelease),this.addHandler("click",this.onClick),this.addHandler("enter",this.onEnter),this.addHandler("exit",this.onExit),this.addHandler("focus",this.onFocus),this.addHandler("blur",this.onBlur),this.currentState=a.ButtonState.GROUP,this.fadeBeginTime=null,this.shouldFade=!1,this.element.style.display="inline-block",this.element.style.position="relative",this.element.title=this.tooltip,this.tracker=new a.MouseTracker({element:this.element,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,enterHandler:function(b){b.insideElementPressed?(f(c,a.ButtonState.DOWN),c.raiseEvent("enter",{originalEvent:b.originalEvent})):b.buttonDownAny||f(c,a.ButtonState.HOVER)},focusHandler:function(a){this.enterHandler(a),c.raiseEvent("focus",{originalEvent:a.originalEvent})},exitHandler:function(b){g(c,a.ButtonState.GROUP),b.insideElementPressed&&c.raiseEvent("exit",{originalEvent:b.originalEvent})},blurHandler:function(a){this.exitHandler(a),c.raiseEvent("blur",{originalEvent:a.originalEvent})},pressHandler:function(b){f(c,a.ButtonState.DOWN),c.raiseEvent("press",{originalEvent:b.originalEvent})},releaseHandler:function(b){b.insideElementPressed&&b.insideElementReleased?(g(c,a.ButtonState.HOVER),c.raiseEvent("release",{originalEvent:b.originalEvent})):b.insideElementPressed?g(c,a.ButtonState.GROUP):f(c,a.ButtonState.HOVER)},clickHandler:function(a){a.quick&&c.raiseEvent("click",{originalEvent:a.originalEvent})},keyHandler:function(a){return 13===a.keyCode?(c.raiseEvent("click",{originalEvent:a.originalEvent}),c.raiseEvent("release",{originalEvent:a.originalEvent}),!1):!0}}).setTracking(!0),g(this,a.ButtonState.REST)},a.extend(a.Button.prototype,a.EventSource.prototype,{notifyGroupEnter:function(){f(this,a.ButtonState.GROUP)},notifyGroupExit:function(){g(this,a.ButtonState.REST)},disable:function(){this.notifyGroupExit(),this.element.disabled=!0,a.setElementOpacity(this.element,.2,!0)},enable:function(){this.element.disabled=!1,a.setElementOpacity(this.element,1,!0),this.notifyGroupEnter()}})}(OpenSeadragon),function(a){a.ButtonGroup=function(b){a.extend(!0,this,{buttons:[],clickTimeThreshold:a.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:a.DEFAULT_SETTINGS.clickDistThreshold,labelText:""},b);var c,d=this.buttons.concat([]),e=this;if(this.element=b.element||a.makeNeutralElement("div"),!b.group)for(this.label=a.makeNeutralElement("label"),this.element.style.display="inline-block",this.element.appendChild(this.label),c=0;c<d.length;c++)this.element.appendChild(d[c].element);this.tracker=new a.MouseTracker({element:this.element,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,enterHandler:function(){var a;for(a=0;a<e.buttons.length;a++)e.buttons[a].notifyGroupEnter()},exitHandler:function(a){var b;if(!a.insideElementPressed)for(b=0;b<e.buttons.length;b++)e.buttons[b].notifyGroupExit()},pressHandler:function(b){if("touch"===b.pointerType&&!a.MouseTracker.haveTouchEnter){var c;for(c=0;c<e.buttons.length;c++)e.buttons[c].notifyGroupEnter()}},releaseHandler:function(b){var c;if(!b.insideElementReleased||"touch"===b.pointerType&&!a.MouseTracker.haveTouchEnter)for(c=0;c<e.buttons.length;c++)e.buttons[c].notifyGroupExit()}}).setTracking(!0)},a.ButtonGroup.prototype={emulateEnter:function(){this.tracker.enterHandler({eventSource:this.tracker})},emulateExit:function(){this.tracker.exitHandler({eventSource:this.tracker})}}}(OpenSeadragon),function(a){a.Rect=function(a,b,c,d){this.x="number"==typeof a?a:0,this.y="number"==typeof b?b:0,this.width="number"==typeof c?c:0,this.height="number"==typeof d?d:0},a.Rect.prototype={getAspectRatio:function(){return this.width/this.height},getTopLeft:function(){return new a.Point(this.x,this.y)},getBottomRight:function(){return new a.Point(this.x+this.width,this.y+this.height)},getTopRight:function(){return new a.Point(this.x+this.width,this.y)},getBottomLeft:function(){return new a.Point(this.x,this.y+this.height)},getCenter:function(){return new a.Point(this.x+this.width/2,this.y+this.height/2)},getSize:function(){return new a.Point(this.width,this.height)},equals:function(b){return b instanceof a.Rect&&this.x===b.x&&this.y===b.y&&this.width===b.width&&this.height===b.height},rotate:function(b,c){var d,e=this.width,f=this.height;if(b=(b+360)%360,b%90!==0)throw new Error("Currently only 0, 90, 180, and 270 degrees are supported.");if(0===b)return new a.Rect(this.x,this.y,this.width,this.height);switch(c=c||this.getCenter(),b){case 90:d=this.getBottomLeft(),e=this.height,f=this.width;break;case 180:d=this.getBottomRight();break;case 270:d=this.getTopRight(),e=this.height,f=this.width;break;default:d=this.getTopLeft()}return d=d.rotate(b,c),new a.Rect(d.x,d.y,e,f)},toString:function(){return"["+Math.round(100*this.x)+","+Math.round(100*this.y)+","+Math.round(100*this.width)+"x"+Math.round(100*this.height)+"]"}}}(OpenSeadragon),function(a){function b(b){var c=Number(this.element.style.marginLeft.replace("px","")),e=Number(this.element.style.marginTop.replace("px","")),f=Number(this.element.style.width.replace("px","")),g=Number(this.element.style.height.replace("px","")),h=a.getElementSize(this.viewer.canvas);return this.dragging=!0,this.element&&("horizontal"==this.scroll?-b.delta.x>0?c>-(f-h.x)&&(this.element.style.marginLeft=c+2*b.delta.x+"px",d(this,h.x,c+2*b.delta.x)):-b.delta.x<0&&0>c&&(this.element.style.marginLeft=c+2*b.delta.x+"px",d(this,h.x,c+2*b.delta.x)):-b.delta.y>0?e>-(g-h.y)&&(this.element.style.marginTop=e+2*b.delta.y+"px",d(this,h.y,e+2*b.delta.y)):-b.delta.y<0&&0>e&&(this.element.style.marginTop=e+2*b.delta.y+"px",d(this,h.y,e+2*b.delta.y))),!1}function c(b){var c=Number(this.element.style.marginLeft.replace("px","")),e=Number(this.element.style.marginTop.replace("px","")),f=Number(this.element.style.width.replace("px","")),g=Number(this.element.style.height.replace("px","")),h=a.getElementSize(this.viewer.canvas);return this.element&&("horizontal"==this.scroll?b.scroll>0?c>-(f-h.x)&&(this.element.style.marginLeft=c-60*b.scroll+"px",d(this,h.x,c-60*b.scroll)):b.scroll<0&&0>c&&(this.element.style.marginLeft=c-60*b.scroll+"px",d(this,h.x,c-60*b.scroll)):b.scroll<0?e>h.y-g&&(this.element.style.marginTop=e+60*b.scroll+"px",d(this,h.y,e+60*b.scroll)):b.scroll>0&&0>e&&(this.element.style.marginTop=e+60*b.scroll+"px",d(this,h.y,e+60*b.scroll))),!1}function d(b,c,d){var e,f,g,h,i,j,k;for(e="horizontal"==b.scroll?b.panelWidth:b.panelHeight,f=Math.ceil(c/e)+5,g=Math.ceil((Math.abs(d)+c)/e)+1,f=g-f,f=0>f?0:f,j=f;g>j&&j<b.panels.length;j++)k=b.panels[j],k.activePanel||(h=new a.Viewer({id:k.id,tileSources:[b.viewer.tileSources[j]],element:k,navigatorSizeRatio:b.sizeRatio,showNavigator:!1,mouseNavEnabled:!1,showNavigationControl:!1,showSequenceControl:!1,immediateRender:!0,blendTime:0,animationTime:0}),h.displayRegion=a.makeNeutralElement("textarea"),h.displayRegion.id=k.id+"-displayregion",h.displayRegion.className="displayregion",i=h.displayRegion.style,i.position="relative",i.top="0px",i.left="0px",i.fontSize="0px",i.overflow="hidden",i.float="left",i.cssFloat="left",i.styleFloat="left",i.zIndex=999999999,i.cursor="default",i.width=b.panelWidth-4+"px",i.height=b.panelHeight-4+"px",h.displayRegion.innerTracker=new a.MouseTracker({element:h.displayRegion}),k.getElementsByTagName("div")[0].appendChild(h.displayRegion),k.activePanel=!0)}function e(a){var b=a.eventSource.element;return"horizontal"==this.scroll?b.style.marginBottom="0px":b.style.marginLeft="0px",!1}function f(b){var c=b.eventSource.element;return"horizontal"==this.scroll?c.style.marginBottom="-"+a.getElementSize(c).y/2+"px":c.style.marginLeft="-"+a.getElementSize(c).x/2+"px",!1}function g(a){switch(a.keyCode){case 61:return c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null}),!1;case 45:return c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null}),!1;case 48:case 119:case 87:case 38:return c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null}),!1;case 115:case 83:case 40:return c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null}),!1;case 97:case 37:return c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null}),!1;case 100:case 39:return c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null}),!1;default:return!0}}var h={};a.ReferenceStrip=function(i){var j,k,l,m=this,n=i.viewer,o=a.getElementSize(n.element);for(i.id||(i.id="referencestrip-"+a.now(),this.element=a.makeNeutralElement("div"),this.element.id=i.id,this.element.className="referencestrip"),i=a.extend(!0,{sizeRatio:a.DEFAULT_SETTINGS.referenceStripSizeRatio,position:a.DEFAULT_SETTINGS.referenceStripPosition,scroll:a.DEFAULT_SETTINGS.referenceStripScroll,clickTimeThreshold:a.DEFAULT_SETTINGS.clickTimeThreshold},i,{element:this.element,showNavigator:!1,mouseNavEnabled:!1,showNavigationControl:!1,showSequenceControl:!1}),a.extend(this,i),h[this.id]={animating:!1},this.minPixelRatio=this.viewer.minPixelRatio,k=this.element.style,k.marginTop="0px",k.marginRight="0px",k.marginBottom="0px",k.marginLeft="0px",k.left="0px",k.bottom="0px",k.border="0px",k.background="#000",k.position="relative",a.setElementOpacity(this.element,.8),this.viewer=n,this.innerTracker=new a.MouseTracker({element:this.element,dragHandler:a.delegate(this,b),scrollHandler:a.delegate(this,c),enterHandler:a.delegate(this,e),exitHandler:a.delegate(this,f),keyHandler:a.delegate(this,g)}).setTracking(!0),i.width&&i.height?(this.element.style.width=i.width+"px",this.element.style.height=i.height+"px",n.addControl(this.element,{anchor:a.ControlAnchor.BOTTOM_LEFT})):"horizontal"==i.scroll?(this.element.style.width=o.x*i.sizeRatio*n.tileSources.length+12*n.tileSources.length+"px",this.element.style.height=o.y*i.sizeRatio+"px",n.addControl(this.element,{anchor:a.ControlAnchor.BOTTOM_LEFT})):(this.element.style.height=o.y*i.sizeRatio*n.tileSources.length+12*n.tileSources.length+"px",this.element.style.width=o.x*i.sizeRatio+"px",n.addControl(this.element,{anchor:a.ControlAnchor.TOP_LEFT})),this.panelWidth=o.x*this.sizeRatio+8,this.panelHeight=o.y*this.sizeRatio+8,this.panels=[],l=0;l<n.tileSources.length;l++)j=a.makeNeutralElement("div"),j.id=this.element.id+"-"+l,j.style.width=m.panelWidth+"px",j.style.height=m.panelHeight+"px",j.style.display="inline",j.style.float="left",j.style.cssFloat="left",j.style.styleFloat="left",j.style.padding="2px",j.innerTracker=new a.MouseTracker({element:j,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,pressHandler:function(b){b.eventSource.dragging=a.now()},releaseHandler:function(b){var c=b.eventSource,d=c.element.id,e=Number(d.split("-")[2]),f=a.now();b.insideElementPressed&&b.insideElementReleased&&c.dragging&&f-c.dragging<c.clickTimeThreshold&&(c.dragging=null,n.goToPage(e))}}).setTracking(!0),this.element.appendChild(j),j.activePanel=!1,this.panels.push(j);d(this,"vertical"==this.scroll?o.y:o.y,0),this.setFocus(0)},a.extend(a.ReferenceStrip.prototype,a.EventSource.prototype,a.Viewer.prototype,{setFocus:function(b){var c,f=a.getElement(this.element.id+"-"+b),g=a.getElementSize(this.viewer.canvas),h=Number(this.element.style.width.replace("px","")),i=Number(this.element.style.height.replace("px","")),j=-Number(this.element.style.marginLeft.replace("px","")),k=-Number(this.element.style.marginTop.replace("px",""));this.currentSelected!==f&&(this.currentSelected&&(this.currentSelected.style.background="#000"),this.currentSelected=f,this.currentSelected.style.background="#999","horizontal"==this.scroll?(c=Number(b)*(this.panelWidth+3),c>j+g.x-this.panelWidth?(c=Math.min(c,h-g.x),this.element.style.marginLeft=-c+"px",d(this,g.x,-c)):j>c&&(c=Math.max(0,c-g.x/2),this.element.style.marginLeft=-c+"px",d(this,g.x,-c))):(c=Number(b)*(this.panelHeight+3),c>k+g.y-this.panelHeight?(c=Math.min(c,i-g.y),this.element.style.marginTop=-c+"px",d(this,g.y,-c)):k>c&&(c=Math.max(0,c-g.y/2),this.element.style.marginTop=-c+"px",d(this,g.y,-c))),this.currentPage=b,a.getElement(f.id+"-displayregion").focus(),e.call(this,{eventSource:this.innerTracker}))},update:function(){return h[this.id].animating?(a.console.log("image reference strip update"),!0):!1}})}(OpenSeadragon),function(a){a.DisplayRect=function(b,c,d,e,f,g){a.Rect.apply(this,[b,c,d,e]),this.minLevel=f,this.maxLevel=g},a.extend(a.DisplayRect.prototype,a.Rect.prototype)}(OpenSeadragon),function(a){function b(a,b){return(1-Math.exp(a*-b))/(1-Math.exp(-a))}a.Spring=function(b){var c=arguments;"object"!=typeof b&&(b={initial:c.length&&"number"==typeof c[0]?c[0]:0,springStiffness:c.length>1?c[1].springStiffness:5,animationTime:c.length>1?c[1].animationTime:1.5}),a.extend(!0,this,b),this.current={value:"number"==typeof this.initial?this.initial:0,time:a.now()},this.start={value:this.current.value,time:this.current.time},this.target={value:this.current.value,time:this.current.time}},a.Spring.prototype={resetTo:function(a){this.target.value=a,this.target.time=this.current.time,this.start.value=this.target.value,this.start.time=this.target.time},springTo:function(a){this.start.value=this.current.value,this.start.time=this.current.time,this.target.value=a,this.target.time=this.start.time+1e3*this.animationTime},shiftBy:function(a){this.start.value+=a,this.target.value+=a},update:function(){this.current.time=a.now(),this.current.value=this.current.time>=this.target.time?this.target.value:this.start.value+(this.target.value-this.start.value)*b(this.springStiffness,(this.current.time-this.start.time)/(this.target.time-this.start.time))}}}(OpenSeadragon),function(a){function b(b){a.extend(!0,this,{timeout:a.DEFAULT_SETTINGS.timeout,jobId:null,crossOriginPolicy:a.DEFAULT_SETTINGS.crossOriginPolicy},b),this.image=null}function c(a,b,c){var d;a.jobsInProgress--,(!a.jobLimit||a.jobsInProgress<a.jobLimit)&&a.jobQueue.length>0&&(d=a.jobQueue.shift(),d.start()),c(b.image)}b.prototype={start:function(){var a=this;this.image=new Image,a.crossOriginPolicy!==!1&&(this.image.crossOrigin=this.crossOriginPolicy),this.image.onload=function(){a.finish(!0)},this.image.onabort=this.image.onerror=function(){a.finish(!1)},this.jobId=window.setTimeout(function(){a.finish(!1)},this.timeout),this.image.src=this.src},finish:function(a){this.image.onload=this.image.onerror=this.image.onabort=null,a||(this.image=null),this.jobId&&window.clearTimeout(this.jobId),this.callback(this)}},a.ImageLoader=function(){a.extend(!0,this,{jobLimit:a.DEFAULT_SETTINGS.imageLoaderLimit,jobQueue:[],jobsInProgress:0,crossOriginPolicy:a.DEFAULT_SETTINGS.crossOriginPolicy})},a.ImageLoader.prototype={addJob:function(a){var d=this,e=function(b){c(d,b,a.callback)},f={src:a.src,callback:e},g=new b(f);!this.jobLimit||this.jobsInProgress<this.jobLimit?(g.start(),this.jobsInProgress++):this.jobQueue.push(g)}}}(OpenSeadragon),function(a){var b={};a.Tile=function(a,b,c,d,e,f){this.level=a,this.x=b,this.y=c,this.bounds=d,this.exists=e,this.url=f,this.loaded=!1,this.loading=!1,this.element=null,this.imgElement=null,this.image=null,this.style=null,this.position=null,this.size=null,this.blendStart=null,this.opacity=null,this.distance=null,this.visibility=null,this.beingDrawn=!1,this.lastTouchTime=0},a.Tile.prototype={toString:function(){return this.level+"/"+this.x+"_"+this.y},drawHTML:function(b){return this.loaded&&this.image?(this.element||(this.element=a.makeNeutralElement("div"),this.imgElement=a.makeNeutralElement("img"),this.imgElement.src=this.url,this.imgElement.style.msInterpolationMode="nearest-neighbor",this.imgElement.style.width="100%",this.imgElement.style.height="100%",this.style=this.element.style,this.style.position="absolute"),this.element.parentNode!=b&&b.appendChild(this.element),this.imgElement.parentNode!=this.element&&this.element.appendChild(this.imgElement),this.style.top=this.position.y+"px",this.style.left=this.position.x+"px",this.style.height=this.size.y+"px",this.style.width=this.size.x+"px",void a.setElementOpacity(this.element,this.opacity)):void a.console.warn("Attempting to draw tile %s when it's not yet loaded.",this.toString())},drawCanvas:function(c,d){var e,f,g=this.position,h=this.size;return this.loaded&&(this.image||b[this.url])?(c.globalAlpha=this.opacity,1==c.globalAlpha&&this.url.match(".png")&&c.clearRect(g.x+1,g.y+1,h.x-2,h.y-2),b[this.url]||(f=document.createElement("canvas"),f.width=this.image.width,f.height=this.image.height,e=f.getContext("2d"),e.drawImage(this.image,0,0),b[this.url]=e,this.image=null),e=b[this.url],d({context:c,tile:this,rendered:e}),void c.drawImage(e.canvas,0,0,e.canvas.width,e.canvas.height,g.x,g.y,h.x,h.y)):void a.console.warn("Attempting to draw tile %s when it's not yet loaded.",this.toString())},unload:function(){this.imgElement&&this.imgElement.parentNode&&this.imgElement.parentNode.removeChild(this.imgElement),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),b[this.url]&&delete b[this.url],this.element=null,this.imgElement=null,this.image=null,this.loaded=!1,this.loading=!1}}}(OpenSeadragon),function(a){a.OverlayPlacement={CENTER:0,TOP_LEFT:1,TOP:2,TOP_RIGHT:3,RIGHT:4,BOTTOM_RIGHT:5,BOTTOM:6,BOTTOM_LEFT:7,LEFT:8},a.Overlay=function(b,c,d){var e;e=a.isPlainObject(b)?b:{element:b,location:c,placement:d},this.element=e.element,this.scales=e.location instanceof a.Rect,this.bounds=new a.Rect(e.location.x,e.location.y,e.location.width,e.location.height),this.position=new a.Point(e.location.x,e.location.y),this.size=new a.Point(e.location.width,e.location.height),this.style=e.element.style,this.placement=e.location instanceof a.Point?e.placement:a.OverlayPlacement.TOP_LEFT,this.onDraw=e.onDraw,this.checkResize=void 0===e.checkResize?!0:e.checkResize},a.Overlay.prototype={adjust:function(b,c){switch(this.placement){case a.OverlayPlacement.TOP_LEFT:break;case a.OverlayPlacement.TOP:b.x-=c.x/2;break;case a.OverlayPlacement.TOP_RIGHT:b.x-=c.x;break;case a.OverlayPlacement.RIGHT:b.x-=c.x,b.y-=c.y/2;break;case a.OverlayPlacement.BOTTOM_RIGHT:b.x-=c.x,b.y-=c.y;break;case a.OverlayPlacement.BOTTOM:b.x-=c.x/2,b.y-=c.y;break;case a.OverlayPlacement.BOTTOM_LEFT:b.y-=c.y;break;case a.OverlayPlacement.LEFT:b.y-=c.y/2;break;default:case a.OverlayPlacement.CENTER:b.x-=c.x/2,b.y-=c.y/2}},destroy:function(){var a=this.element,b=this.style;a.parentNode&&(a.parentNode.removeChild(a),a.prevElementParent&&(b.display="none",document.body.appendChild(a))),this.onDraw=null,b.top="",b.left="",b.position="",this.scales&&(b.width="",b.height="")},drawHTML:function(b,c){var d,e,f=this.element,g=this.style,h=this.scales,i=c.degrees,j=c.pixelFromPoint(this.bounds.getTopLeft(),!0);if(f.parentNode!=b&&(f.prevElementParent=f.parentNode,f.prevNextSibling=f.nextSibling,b.appendChild(f),this.size=a.getElementSize(f)),d=h?c.deltaPixelsFromPoints(this.bounds.getSize(),!0):this.checkResize?a.getElementSize(f):this.size,this.position=j,this.size=d,this.adjust(j,d),j=j.apply(Math.floor),d=d.apply(Math.ceil),0!==i&&this.scales){e=new a.Point(d.x/2,d.y/2);
var k=new a.Point(c.viewer.drawer.canvas.width/2,c.viewer.drawer.canvas.height/2);j=j.plus(e).rotate(i,k).minus(e),d=d.rotate(i,new a.Point(0,0)),d=new a.Point(Math.abs(d.x),Math.abs(d.y))}this.onDraw?this.onDraw(j,d,f):(g.left=j.x+"px",g.top=j.y+"px",g.position="absolute",g.display="block",h&&(g.width=d.x+"px",g.height=d.y+"px"))},update:function(b,c){this.scales=b instanceof a.Rect,this.bounds=new a.Rect(b.x,b.y,b.width,b.height),this.placement=b instanceof a.Point?c:a.OverlayPlacement.TOP_LEFT}}}(OpenSeadragon),function(a){function b(b){b.updateAgain=!1,b.viewer&&b.viewer.raiseEvent("update-viewport",{});for(var d,e,g,h,i,j,l,m,n=null,o=!1,q=a.now(),r=b.viewport.getContainerSize(),s=b.viewport.getBounds(!0),t=s.getTopLeft(),u=s.getBottomRight(),v=b.viewport.deltaPixelsFromPoints(b.source.getPixelRatio(0),!0).x,w=Math.max(b.source.minLevel,Math.floor(Math.log(b.minZoomImageRatio)/Math.log(2))),x=Math.min(Math.abs(b.source.maxLevel),Math.abs(Math.floor(Math.log(v/b.minPixelRatio)/Math.log(2)))),y=b.viewport.degrees;b.lastDrawn.length>0;)d=b.lastDrawn.pop(),d.beingDrawn=!1;if(b.canvas.innerHTML="",b.useCanvas&&((b.canvas.width!=r.x||b.canvas.height!=r.y)&&(b.canvas.width=r.x,b.canvas.height=r.y),b.context.clearRect(0,0,r.x,r.y)),90===y||270===y){var z=s.rotate(y);t=z.getTopLeft(),u=z.getBottomRight()}if(!(!b.wrapHorizontal&&(u.x<0||t.x>1)||!b.wrapVertical&&(u.y<0||t.y>b.normHeight))){b.wrapHorizontal||(t.x=Math.max(t.x,0),u.x=Math.min(u.x,1)),b.wrapVertical||(t.y=Math.max(t.y,0),u.y=Math.min(u.y,b.normHeight)),w=Math.min(w,x);var A;for(e=x;e>=w;e--){if(A=!1,g=b.viewport.deltaPixelsFromPoints(b.source.getPixelRatio(e),!0).x,!o&&g>=b.minPixelRatio||e==w)A=!0,o=!0;else if(!o)continue;if(h=b.viewport.deltaPixelsFromPoints(b.source.getPixelRatio(e),!1).x,i=b.viewport.deltaPixelsFromPoints(b.source.getPixelRatio(Math.max(b.source.getClosestLevel(b.viewport.containerSize)-1,0)),!1).x,j=b.immediateRender?1:i,l=Math.min(1,(g-.5)/.5),m=j/Math.abs(j-h),n=c(b,o,A,e,l,m,t,u,q,n),k(b.coverage,e))break}p(b,b.lastDrawn),n&&(f(b,n,q),b.updateAgain=!0)}}function c(a,b,c,e,f,g,h,i,j,k){var l,m,o,p,q,r=a.viewport.pixelFromPoint(a.viewport.getCenter());for(a.viewer&&a.viewer.raiseEvent("update-level",{havedrawn:b,level:e,opacity:f,visibility:g,topleft:h,bottomright:i,currenttime:j,best:k}),o=a.source.getTileAtPoint(e,h),p=a.source.getTileAtPoint(e,i),q=a.source.getNumTiles(e),n(a.coverage,e),a.wrapHorizontal||(p.x=Math.min(p.x,q.x-1)),a.wrapVertical||(p.y=Math.min(p.y,q.y-1)),l=o.x;l<=p.x;l++)for(m=o.y;m<=p.y;m++)k=d(a,c,b,l,m,e,f,g,r,q,j,k);return k}function d(a,b,c,d,f,g,j,k,n,p,q,r){var s=e(d,f,g,a.source,a.tilesMatrix,q,p,a.normHeight),t=b;if(a.viewer&&a.viewer.raiseEvent("update-tile",{tile:s}),m(a.coverage,g,d,f,!1),!s.exists)return r;if(c&&!t&&(l(a.coverage,g,d,f)?m(a.coverage,g,d,f,!0):t=!0),!t)return r;if(h(s,a.source.tileOverlap,a.viewport,n,k),s.loaded){var u=i(a,s,d,f,g,j,q);u&&(a.updateAgain=!0)}else s.loading||(r=o(r,s));return r}function e(b,c,d,e,f,g,h,i){var j,k,l,m,n,o;return f[d]||(f[d]={}),f[d][b]||(f[d][b]={}),f[d][b][c]||(j=(h.x+b%h.x)%h.x,k=(h.y+c%h.y)%h.y,l=e.getTileBounds(d,j,k),m=e.tileExists(d,j,k),n=e.getTileUrl(d,j,k),l.x+=1*(b-j)/h.x,l.y+=i*(c-k)/h.y,f[d][b][c]=new a.Tile(d,b,c,l,m,n)),o=f[d][b][c],o.lastTouchTime=g,o}function f(a,b,c){a.viewport.collectionMode?(a.midUpdate=!1,g(a,b,c)):(b.loading=!0,a.imageLoader.addJob({src:b.url,callback:function(d){g(a,b,c,d)}}))}function g(b,c,d,e){var f,g,h,i,j,k,l,m,n,o;if(c.loading=!1,b.midUpdate)return void a.console.warn("Tile load callback in middle of drawing routine.");if(e||b.viewport.collectionMode){if(d<b.lastResetTime)return void a.console.log("Ignoring tile %s loaded before reset: %s",c,c.url)}else if(a.console.log("Tile %s failed to load: %s",c,c.url),!b.debugMode)return void(c.exists=!1);if(c.loaded=!0,c.image=e,f=b.tilesLoaded.length,b.tilesLoaded.length>=b.maxImageCacheCount){for(g=Math.ceil(Math.log(b.source.tileSize)/Math.log(2)),h=null,k=-1,o=b.tilesLoaded.length-1;o>=0;o--)l=b.tilesLoaded[o],l.level<=b.cutoff||l.beingDrawn||(h?(m=l.lastTouchTime,i=h.lastTouchTime,n=l.level,j=h.level,(i>m||m==i&&n>j)&&(h=l,k=o)):(h=l,k=o));h&&k>=0&&(h.unload(),f=k)}b.tilesLoaded[f]=c,b.updateAgain=!0}function h(b,c,d,e,f){var g=b.bounds.getTopLeft(),h=b.bounds.getSize(),i=d.pixelFromPoint(g,!0),j=d.pixelFromPoint(g,!1),k=d.deltaPixelsFromPoints(h,!0),l=d.deltaPixelsFromPoints(h,!1),m=j.plus(l.divide(2)),n=e.distanceTo(m);c||(k=k.plus(new a.Point(1,1))),b.position=i,b.size=k,b.distance=n,b.visibility=f}function i(a,b,c,d,e,f,g){var h,i,j=1e3*a.blendTime;if(b.blendStart||(b.blendStart=g),h=g-b.blendStart,i=j?Math.min(1,h/j):1,a.alwaysBlend&&(i*=f),b.opacity=i,a.lastDrawn.push(b),1==i)m(a.coverage,e,c,d,!0);else if(j>h)return!0;return!1}function j(a){a.tilesMatrix={},a.tilesLoaded=[]}function k(a,b,c,d){var e,f,g,h;if(!a[b])return!1;if(void 0===c||void 0===d){e=a[b];for(g in e)if(e.hasOwnProperty(g)){f=e[g];for(h in f)if(f.hasOwnProperty(h)&&!f[h])return!1}return!0}return void 0===a[b][c]||void 0===a[b][c][d]||a[b][c][d]===!0}function l(a,b,c,d){return void 0===c||void 0===d?k(a,b+1):k(a,b+1,2*c,2*d)&&k(a,b+1,2*c,2*d+1)&&k(a,b+1,2*c+1,2*d)&&k(a,b+1,2*c+1,2*d+1)}function m(b,c,d,e,f){return b[c]?(b[c][d]||(b[c][d]={}),void(b[c][d][e]=f)):void a.console.warn("Setting coverage for a tile before its level's coverage has been reset: %s",c)}function n(a,b){a[b]={}}function o(a,b){return a?b.visibility>a.visibility?b:b.visibility==a.visibility&&b.distance<a.distance?b:a:b}function p(b,c){var d,e,f,g,h,i,j,k,l=function(a){b.viewer&&b.viewer.raiseEvent("tile-drawing",a)};for(d=c.length-1;d>=0;d--){if(e=c[d],b.viewport.collectionMode?(f=e.x+"/"+e.y,h=b.viewport,k=h.collectionTileSource,b.collectionOverlays[f]?(g=b.collectionOverlays[f],g.viewport&&(g.viewport.resize(e.size,!0),g.viewport.goHome(!0))):(i="horizontal"==k.layout?e.y+e.x*k.rows:e.x+e.y*k.rows,j=i<k.tileSources.length?k.tileSources[i]:null,j&&(b.collectionOverlays[f]=g=new a.Viewer({hash:h.viewer.hash+"-"+f,element:a.makeNeutralElement("div"),mouseNavEnabled:!1,showNavigator:!1,showSequenceControl:!1,showNavigationControl:!1,tileSources:[j]}),b.viewport.collectionBorder&&(g.element.style.border="1px solid rgba(255,255,255,0.38)"),b.viewport.collectionReflection&&(g.element.style["-webkit-box-reflect"]="below 0px -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(62%,transparent),to(rgba(255,255,255,0.62)))"),b.viewer.addOverlay(g.element,e.bounds)))):(b.useCanvas?0!==b.viewport.degrees?(q(e,b.canvas,b.context,b.viewport.degrees),e.drawCanvas(b.context,l),r(e,b.canvas,b.context)):e.drawCanvas(b.context,l):e.drawHTML(b.canvas),e.beingDrawn=!0),b.debugMode)try{s(b,e,c.length,d)}catch(m){a.console.error(m)}b.viewer&&b.viewer.raiseEvent("tile-drawn",{tile:e})}}function q(a,b,c,d){var e=b.width/2,f=b.height/2,g=a.position.x-e,h=a.position.y-f;c.save(),c.translate(e,f),c.rotate(Math.PI/180*d),a.position.x=g,a.position.y=h}function r(a,b,c){var d=b.width/2,e=b.height/2,f=a.position.x+d,g=a.position.y+e;a.position.x=f,a.position.y=g,c.restore()}function s(a,b,c,d){a.useCanvas&&(a.context.save(),a.context.lineWidth=2,a.context.font="small-caps bold 13px ariel",a.context.strokeStyle=a.debugGridColor,a.context.fillStyle=a.debugGridColor,a.context.strokeRect(b.position.x,b.position.y,b.size.x,b.size.y),0===b.x&&0===b.y&&(a.context.fillText("Zoom: "+a.viewport.getZoom(),b.position.x,b.position.y-30),a.context.fillText("Pan: "+a.viewport.getBounds().toString(),b.position.x,b.position.y-20)),a.context.fillText("Level: "+b.level,b.position.x+10,b.position.y+20),a.context.fillText("Column: "+b.x,b.position.x+10,b.position.y+30),a.context.fillText("Row: "+b.y,b.position.x+10,b.position.y+40),a.context.fillText("Order: "+d+" of "+c,b.position.x+10,b.position.y+50),a.context.fillText("Size: "+b.size.toString(),b.position.x+10,b.position.y+60),a.context.fillText("Position: "+b.position.toString(),b.position.x+10,b.position.y+70),a.context.restore())}{var t=(a.getWindowSize(),a.Browser.vendor),u=a.Browser.version;t==a.BROWSERS.FIREFOX||t==a.BROWSERS.OPERA||t==a.BROWSERS.SAFARI&&u>=4||t==a.BROWSERS.CHROME&&u>=2||t==a.BROWSERS.IE&&u>=9}a.Drawer=function(b){var c=arguments;a.isPlainObject(b)||(b={source:c[0],viewport:c[1],element:c[2]}),a.extend(!0,this,{viewer:null,imageLoader:new a.ImageLoader,tilesMatrix:{},tilesLoaded:[],coverage:{},lastDrawn:[],lastResetTime:0,midUpdate:!1,updateAgain:!0,collectionOverlays:{},opacity:a.DEFAULT_SETTINGS.opacity,maxImageCacheCount:a.DEFAULT_SETTINGS.maxImageCacheCount,minZoomImageRatio:a.DEFAULT_SETTINGS.minZoomImageRatio,wrapHorizontal:a.DEFAULT_SETTINGS.wrapHorizontal,wrapVertical:a.DEFAULT_SETTINGS.wrapVertical,immediateRender:a.DEFAULT_SETTINGS.immediateRender,blendTime:a.DEFAULT_SETTINGS.blendTime,alwaysBlend:a.DEFAULT_SETTINGS.alwaysBlend,minPixelRatio:a.DEFAULT_SETTINGS.minPixelRatio,debugMode:a.DEFAULT_SETTINGS.debugMode,timeout:a.DEFAULT_SETTINGS.timeout,crossOriginPolicy:a.DEFAULT_SETTINGS.crossOriginPolicy},b),this.useCanvas=a.supportsCanvas&&(this.viewer?this.viewer.useCanvas:!0),this.container=a.getElement(this.element),this.canvas=a.makeNeutralElement(this.useCanvas?"canvas":"div"),this.context=this.useCanvas?this.canvas.getContext("2d"):null,this.normHeight=this.source.dimensions.y/this.source.dimensions.x,this.element=this.container,this.container.dir="ltr",this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.style.position="absolute",a.setElementOpacity(this.canvas,this.opacity,!0),this.container.style.textAlign="left",this.container.appendChild(this.canvas)},a.Drawer.prototype={addOverlay:function(b,c,d,e){return a.console.error("drawer.addOverlay is deprecated. Use viewer.addOverlay instead."),this.viewer.addOverlay(b,c,d,e),this},updateOverlay:function(b,c,d){return a.console.error("drawer.updateOverlay is deprecated. Use viewer.updateOverlay instead."),this.viewer.updateOverlay(b,c,d),this},removeOverlay:function(b){return a.console.error("drawer.removeOverlay is deprecated. Use viewer.removeOverlay instead."),this.viewer.removeOverlay(b),this},clearOverlays:function(){return a.console.error("drawer.clearOverlays is deprecated. Use viewer.clearOverlays instead."),this.viewer.clearOverlays(),this},setOpacity:function(b){return this.opacity=b,a.setElementOpacity(this.canvas,this.opacity,!0),this},getOpacity:function(){return this.opacity},needsUpdate:function(){return this.updateAgain},numTilesLoaded:function(){return this.tilesLoaded.length},reset:function(){return j(this),this.lastResetTime=a.now(),this.updateAgain=!0,this},update:function(){return this.midUpdate=!0,b(this),this.midUpdate=!1,this},canRotate:function(){return this.useCanvas}}}(OpenSeadragon),function(a){a.Viewport=function(b){var c=arguments;c.length&&c[0]instanceof a.Point&&(b={containerSize:c[0],contentSize:c[1],config:c[2]}),b.config&&(a.extend(!0,b,b.config),delete b.config),a.extend(!0,this,{containerSize:null,contentSize:null,zoomPoint:null,viewer:null,springStiffness:a.DEFAULT_SETTINGS.springStiffness,animationTime:a.DEFAULT_SETTINGS.animationTime,minZoomImageRatio:a.DEFAULT_SETTINGS.minZoomImageRatio,maxZoomPixelRatio:a.DEFAULT_SETTINGS.maxZoomPixelRatio,visibilityRatio:a.DEFAULT_SETTINGS.visibilityRatio,wrapHorizontal:a.DEFAULT_SETTINGS.wrapHorizontal,wrapVertical:a.DEFAULT_SETTINGS.wrapVertical,defaultZoomLevel:a.DEFAULT_SETTINGS.defaultZoomLevel,minZoomLevel:a.DEFAULT_SETTINGS.minZoomLevel,maxZoomLevel:a.DEFAULT_SETTINGS.maxZoomLevel,degrees:a.DEFAULT_SETTINGS.degrees},b),this.centerSpringX=new a.Spring({initial:0,springStiffness:this.springStiffness,animationTime:this.animationTime}),this.centerSpringY=new a.Spring({initial:0,springStiffness:this.springStiffness,animationTime:this.animationTime}),this.zoomSpring=new a.Spring({initial:1,springStiffness:this.springStiffness,animationTime:this.animationTime}),this.resetContentSize(this.contentSize),this.goHome(!0),this.update()},a.Viewport.prototype={resetContentSize:function(b){return this.contentSize=b,this.contentAspectX=this.contentSize.x/this.contentSize.y,this.contentAspectY=this.contentSize.y/this.contentSize.x,this.fitWidthBounds=new a.Rect(0,0,1,this.contentAspectY),this.fitHeightBounds=new a.Rect(0,0,this.contentAspectY,this.contentAspectY),this.homeBounds=new a.Rect(0,0,1,this.contentAspectY),this.viewer&&this.viewer.raiseEvent("reset-size",{contentSize:b}),this},getHomeZoom:function(){var a=this.contentAspectX/this.getAspectRatio();return this.defaultZoomLevel?this.defaultZoomLevel:a>=1?1:a},getHomeBounds:function(){var b=this.homeBounds.getCenter(),c=1/this.getHomeZoom(),d=c/this.getAspectRatio();return new a.Rect(b.x-c/2,b.y-d/2,c,d)},goHome:function(a){return this.viewer&&this.viewer.raiseEvent("home",{immediately:a}),this.fitBounds(this.getHomeBounds(),a)},getMinZoom:function(){var a=this.getHomeZoom(),b=this.minZoomLevel?this.minZoomLevel:this.minZoomImageRatio*a;return Math.min(b,a)},getMaxZoom:function(){var a=this.maxZoomLevel?this.maxZoomLevel:this.contentSize.x*this.maxZoomPixelRatio/this.containerSize.x;return Math.max(a,this.getHomeZoom())},getAspectRatio:function(){return this.containerSize.x/this.containerSize.y},getContainerSize:function(){return new a.Point(this.containerSize.x,this.containerSize.y)},getBounds:function(b){var c=this.getCenter(b),d=1/this.getZoom(b),e=d/this.getAspectRatio();return new a.Rect(c.x-d/2,c.y-e/2,d,e)},getCenter:function(b){var c,d,e,f,g,h,i,j,k=new a.Point(this.centerSpringX.current.value,this.centerSpringY.current.value),l=new a.Point(this.centerSpringX.target.value,this.centerSpringY.target.value);return b?k:this.zoomPoint?(c=this.pixelFromPoint(this.zoomPoint,!0),d=this.getZoom(),e=1/d,f=e/this.getAspectRatio(),g=new a.Rect(k.x-e/2,k.y-f/2,e,f),h=this.zoomPoint.minus(g.getTopLeft()).times(this.containerSize.x/g.width),i=h.minus(c),j=i.divide(this.containerSize.x*d),l.plus(j)):l},getZoom:function(a){return a?this.zoomSpring.current.value:this.zoomSpring.target.value},applyConstraints:function(a){var b,c,d,e,f,g,h,i=this.getZoom(),j=Math.max(Math.min(i,this.getMaxZoom()),this.getMinZoom()),k=0,l=0;return i!=j&&this.zoomTo(j,this.zoomPoint,a),b=this.getBounds(),c=this.visibilityRatio*b.width,d=this.visibilityRatio*b.height,e=b.x+b.width,f=1-b.x,g=b.y+b.height,h=this.contentAspectY-b.y,this.wrapHorizontal||(c>e&&(k=c-e),c>f&&(k=k?(k+f-c)/2:f-c)),this.wrapVertical||(d>g&&(l=d-g),d>h&&(l=l?(l+h-d)/2:h-d)),(k||l||a)&&(b.x+=k,b.y+=l,b.width>1&&(b.x=.5-b.width/2),b.height>this.contentAspectY&&(b.y=this.contentAspectY/2-b.height/2),this.fitBounds(b,a)),this.viewer&&this.viewer.raiseEvent("constrain",{immediately:a}),this},ensureVisible:function(a){return this.applyConstraints(a)},fitBounds:function(b,c){var d,e,f,g,h=this.getAspectRatio(),i=b.getCenter(),j=new a.Rect(b.x,b.y,b.width,b.height);return j.getAspectRatio()>=h?(j.height=b.width/h,j.y=i.y-j.height/2):(j.width=b.height*h,j.x=i.x-j.width/2),this.panTo(this.getCenter(!0),!0),this.zoomTo(this.getZoom(!0),null,!0),d=this.getBounds(),e=this.getZoom(),f=1/j.width,f==e||j.width==d.width?this.panTo(i,c):(g=d.getTopLeft().times(this.containerSize.x/d.width).minus(j.getTopLeft().times(this.containerSize.x/j.width)).divide(this.containerSize.x/d.width-this.containerSize.x/j.width),this.zoomTo(f,g,c))},fitVertically:function(a){var b=this.getCenter();return this.wrapHorizontal&&(b.x=(1+b.x%1)%1,this.centerSpringX.resetTo(b.x),this.centerSpringX.update()),this.wrapVertical&&(b.y=(this.contentAspectY+b.y%this.contentAspectY)%this.contentAspectY,this.centerSpringY.resetTo(b.y),this.centerSpringY.update()),this.fitBounds(this.fitHeightBounds,a)},fitHorizontally:function(a){var b=this.getCenter();return this.wrapHorizontal&&(b.x=(this.contentAspectX+b.x%this.contentAspectX)%this.contentAspectX,this.centerSpringX.resetTo(b.x),this.centerSpringX.update()),this.wrapVertical&&(b.y=(1+b.y%1)%1,this.centerSpringY.resetTo(b.y),this.centerSpringY.update()),this.fitBounds(this.fitWidthBounds,a)},panBy:function(b,c){var d=new a.Point(this.centerSpringX.target.value,this.centerSpringY.target.value);return b=b.rotate(-this.degrees,new a.Point(0,0)),this.panTo(d.plus(b),c)},panTo:function(a,b){return b?(this.centerSpringX.resetTo(a.x),this.centerSpringY.resetTo(a.y)):(this.centerSpringX.springTo(a.x),this.centerSpringY.springTo(a.y)),this.viewer&&this.viewer.raiseEvent("pan",{center:a,immediately:b}),this},zoomBy:function(b,c,d){return c instanceof a.Point&&!isNaN(c.x)&&!isNaN(c.y)&&(c=c.rotate(-this.degrees,new a.Point(this.centerSpringX.target.value,this.centerSpringY.target.value))),this.zoomTo(this.zoomSpring.target.value*b,c,d)},zoomTo:function(b,c,d){return this.zoomPoint=c instanceof a.Point&&!isNaN(c.x)&&!isNaN(c.y)?c:null,d?this.zoomSpring.resetTo(b):this.zoomSpring.springTo(b),this.viewer&&this.viewer.raiseEvent("zoom",{zoom:b,refPoint:c,immediately:d}),this},setRotation:function(a){if(!this.viewer||!this.viewer.drawer.canRotate())return this;if(a=(a+360)%360,a%90!==0)throw new Error("Currently only 0, 90, 180, and 270 degrees are supported.");return this.degrees=a,this.viewer.forceRedraw(),this},getRotation:function(){return this.degrees},resize:function(b,c){var d,e=this.getBounds(),f=e;return this.containerSize=new a.Point(b.x,b.y),c&&(d=b.x/this.containerSize.x,f.width=e.width*d,f.height=f.width/this.getAspectRatio()),this.viewer&&this.viewer.raiseEvent("resize",{newContainerSize:b,maintain:c}),this.fitBounds(f,!0)},update:function(){var a,b,c,d,e=this.centerSpringX.current.value,f=this.centerSpringY.current.value,g=this.zoomSpring.current.value;return this.zoomPoint&&(a=this.pixelFromPoint(this.zoomPoint,!0)),this.zoomSpring.update(),this.zoomPoint&&this.zoomSpring.current.value!=g?(b=this.pixelFromPoint(this.zoomPoint,!0),c=b.minus(a),d=this.deltaPointsFromPixels(c,!0),this.centerSpringX.shiftBy(d.x),this.centerSpringY.shiftBy(d.y)):this.zoomPoint=null,this.centerSpringX.update(),this.centerSpringY.update(),this.centerSpringX.current.value!=e||this.centerSpringY.current.value!=f||this.zoomSpring.current.value!=g},deltaPixelsFromPoints:function(a,b){return a.times(this.containerSize.x*this.getZoom(b))},deltaPointsFromPixels:function(a,b){return a.divide(this.containerSize.x*this.getZoom(b))},pixelFromPoint:function(a,b){var c=this.getBounds(b);return a.minus(c.getTopLeft()).times(this.containerSize.x/c.width)},pointFromPixel:function(a,b){var c=this.getBounds(b);return a.divide(this.containerSize.x/c.width).plus(c.getTopLeft())},viewportToImageCoordinates:function(b,c){return 1==arguments.length?this.viewportToImageCoordinates(b.x,b.y):new a.Point(b*this.contentSize.x,c*this.contentSize.y*this.contentAspectX)},imageToViewportCoordinates:function(b,c){return 1==arguments.length?this.imageToViewportCoordinates(b.x,b.y):new a.Point(b/this.contentSize.x,c/this.contentSize.y/this.contentAspectX)},imageToViewportRectangle:function(b,c,d,e){var f,g,h;return 1==arguments.length?(h=b,this.imageToViewportRectangle(h.x,h.y,h.width,h.height)):(f=this.imageToViewportCoordinates(b,c),g=this.imageToViewportCoordinates(d,e),new a.Rect(f.x,f.y,g.x,g.y))},viewportToImageRectangle:function(b,c,d,e){var f,g,h;return 1==arguments.length?(h=b,this.viewportToImageRectangle(h.x,h.y,h.width,h.height)):(f=this.viewportToImageCoordinates(b,c),g=this.viewportToImageCoordinates(d,e),new a.Rect(f.x,f.y,g.x,g.y))},viewerElementToImageCoordinates:function(a){var b=this.pointFromPixel(a,!0);return this.viewportToImageCoordinates(b)},imageToViewerElementCoordinates:function(a){var b=this.imageToViewportCoordinates(a);return this.pixelFromPoint(b,!0)},windowToImageCoordinates:function(a){var b=a.minus(OpenSeadragon.getElementPosition(this.viewer.element));return this.viewerElementToImageCoordinates(b)},imageToWindowCoordinates:function(a){var b=this.imageToViewerElementCoordinates(a);return b.plus(OpenSeadragon.getElementPosition(this.viewer.element))},viewerElementToViewportCoordinates:function(a){return this.pointFromPixel(a,!0)},viewportToViewerElementCoordinates:function(a){return this.pixelFromPoint(a,!0)},windowToViewportCoordinates:function(a){var b=a.minus(OpenSeadragon.getElementPosition(this.viewer.element));return this.viewerElementToViewportCoordinates(b)},viewportToWindowCoordinates:function(a){var b=this.viewportToViewerElementCoordinates(a);return b.plus(OpenSeadragon.getElementPosition(this.viewer.element))},viewportToImageZoom:function(a){var b=this.viewer.source.dimensions.x,c=this.getContainerSize().x,d=c/b;return a*d},imageToViewportZoom:function(a){var b=this.viewer.source.dimensions.x,c=this.getContainerSize().x,d=b/c;return a*d}}}(OpenSeadragon);
//# sourceMappingURL=openseadragon.min.js.map
d3=function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function i(){}function u(){}function a(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function o(){}function c(n){function t(){for(var t,r=e,i=-1,u=r.length;++i<u;)(t=r[i].on)&&t.apply(this,arguments);return n}var e=[],r=new i;return t.on=function(t,i){var u,a=r.get(t);return arguments.length<2?a&&a.on:(a&&(a.on=null,e=e.slice(0,u=e.indexOf(a)).concat(e.slice(u+1)),r.remove(t)),i&&e.push(r.set(t,{on:i})),n)},t}function l(){ua.event.stopPropagation(),ua.event.preventDefault()}function f(){for(var n,t=ua.event;n=t.sourceEvent;)t=n;return t}function s(n,t){function e(){n.on(t,null)}n.on(t,function(){l(),e()},!0),setTimeout(e,0)}function h(n){for(var t=new o,e=0,r=arguments.length;++e<r;)t[arguments[e]]=c(t);return t.of=function(e,r){return function(i){try{var u=i.sourceEvent=ua.event;i.target=n,ua.event=i,t[i.type].apply(e,r)}finally{ua.event=u}}},t}function g(n,t){var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>pa&&(oa.scrollX||oa.scrollY)){e=ua.select(aa.body).append("svg").style("position","absolute").style("top",0).style("left",0);var i=e[0][0].getScreenCTM();pa=!(i.f||i.e),e.remove()}return pa?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var u=n.getBoundingClientRect();return[t.clientX-u.left-n.clientLeft,t.clientY-u.top-n.clientTop]}function p(n){for(var t=-1,e=n.length,r=[];++t<e;)r.push(n[t]);return r}function d(n){return Array.prototype.slice.call(n)}function m(n){return va(n,wa),n}function v(n){return function(){return ya(n,this)}}function y(n){return function(){return Ma(n,this)}}function M(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function i(){this.setAttribute(n,t)}function u(){this.setAttributeNS(n.space,n.local,t)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=ua.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?o:a:n.local?u:i}function x(n){return n.trim().replace(/\s+/g," ")}function b(n){return RegExp("(?:^|\\s+)"+ua.requote(n)+"(?:\\s+|$)","g")}function _(n,t){function e(){for(var e=-1;++e<i;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<i;)n[e](this,r)}n=n.trim().split(/\s+/).map(w);var i=n.length;return"function"==typeof t?r:e}function w(n){var t=b(n);return function(e,r){if(i=e.classList)return r?i.add(n):i.remove(n);var i=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(i)||e.setAttribute("class",x(i+" "+n))):e.setAttribute("class",x(i.replace(t," ")))}}function S(n,t,e){function r(){this.style.removeProperty(n)}function i(){this.style.setProperty(n,t,e)}function u(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?u:i}function E(n,t){function e(){delete this[n]}function r(){this[n]=t}function i(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?i:r}function k(n){return{__data__:n}}function A(n){return function(){return _a(this,n)}}function N(n){return arguments.length||(n=ua.ascending),function(t,e){return!t-!e||n(t.__data__,e.__data__)}}function q(){}function T(n,t,e){function r(){var t=this[a];t&&(this.removeEventListener(n,t,t.$),delete this[a])}function i(){var i=c(t,da(arguments));r.call(this),this.addEventListener(n,this[a]=i,i.$=e),i._=t}function u(){var t,e=RegExp("^__on([^.]+)"+ua.requote(n)+"$");for(var r in this)if(t=r.match(e)){var i=this[r];this.removeEventListener(t[1],i,i.$),delete this[r]}}var a="__on"+n,o=n.indexOf("."),c=C;o>0&&(n=n.substring(0,o));var l=ka.get(n);return l&&(n=l,c=z),o?t?i:r:t?q:u}function C(n,t){return function(e){var r=ua.event;ua.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{ua.event=r}}}function z(n,t){var e=C(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||r.compareDocumentPosition(t)&8)||e.call(t,n)}}function D(n,t){for(var e=0,r=n.length;r>e;e++)for(var i,u=n[e],a=0,o=u.length;o>a;a++)(i=u[a])&&t(i,a,e);return n}function j(n){return va(n,Aa),n}function L(){}function F(n,t,e){return new H(n,t,e)}function H(n,t,e){this.h=n,this.s=t,this.l=e}function P(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?u+(a-u)*n/60:180>n?a:240>n?u+(a-u)*(240-n)/60:u}function i(n){return Math.round(r(n)*255)}var u,a;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,a=.5>=e?e*(1+t):e+t-e*t,u=2*e-a,tt(i(n+120),i(n),i(n-120))}function R(n){return n>0?1:0>n?-1:0}function O(n){return Math.acos(Math.max(-1,Math.min(1,n)))}function Y(n){return n>1?Da/2:-1>n?-Da/2:Math.asin(n)}function U(n){return(Math.exp(n)-Math.exp(-n))/2}function I(n){return(Math.exp(n)+Math.exp(-n))/2}function V(n){return(n=Math.sin(n/2))*n}function X(n,t,e){return new Z(n,t,e)}function Z(n,t,e){this.h=n,this.c=t,this.l=e}function B(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),$(e,Math.cos(n*=La)*t,Math.sin(n)*t)}function $(n,t,e){return new J(n,t,e)}function J(n,t,e){this.l=n,this.a=t,this.b=e}function G(n,t,e){var r=(n+16)/116,i=r+t/500,u=r-e/200;return i=W(i)*Ra,r=W(r)*Oa,u=W(u)*Ya,tt(nt(3.2404542*i-1.5371385*r-.4985314*u),nt(-.969266*i+1.8760108*r+.041556*u),nt(.0556434*i-.2040259*r+1.0572252*u))}function K(n,t,e){return n>0?X(Math.atan2(e,t)*Fa,Math.sqrt(t*t+e*e),n):X(0/0,0/0,n)}function W(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function Q(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function nt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function tt(n,t,e){return new et(n,t,e)}function et(n,t,e){this.r=n,this.g=t,this.b=e}function rt(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function it(n,t,e){var r,i,u,a=0,o=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(i=r[2].split(","),r[1]){case"hsl":return e(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);case"rgb":return t(ct(i[0]),ct(i[1]),ct(i[2]))}return(u=Va.get(n))?t(u.r,u.g,u.b):(null!=n&&n.charAt(0)==="#"&&(n.length===4?(a=n.charAt(1),a+=a,o=n.charAt(2),o+=o,c=n.charAt(3),c+=c):n.length===7&&(a=n.substring(1,3),o=n.substring(3,5),c=n.substring(5,7)),a=parseInt(a,16),o=parseInt(o,16),c=parseInt(c,16)),t(a,o,c))}function ut(n,t,e){var r,i,u=Math.min(n/=255,t/=255,e/=255),a=Math.max(n,t,e),o=a-u,c=(a+u)/2;return o?(i=.5>c?o/(a+u):o/(2-a-u),r=n==a?(t-e)/o+(e>t?6:0):t==a?(e-n)/o+2:(n-t)/o+4,r*=60):(r=0/0,i=c>0&&1>c?0:r),F(r,i,c)}function at(n,t,e){n=ot(n),t=ot(t),e=ot(e);var r=Q((.4124564*n+.3575761*t+.1804375*e)/Ra),i=Q((.2126729*n+.7151522*t+.072175*e)/Oa),u=Q((.0193339*n+.119192*t+.9503041*e)/Ya);return $(116*i-16,500*(r-i),200*(i-u))}function ot(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function ct(n){var t=parseFloat(n);return n.charAt(n.length-1)==="%"?Math.round(2.55*t):t}function lt(n){return"function"==typeof n?n:function(){return n}}function ft(n){return n}function st(n){return function(t,e,r){return arguments.length===2&&"function"==typeof e&&(r=e,e=null),ht(t,e,n,r)}}function ht(n,t,e,r){function i(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=e.call(u,c)}catch(r){return a.error.call(u,r),void 0}a.load.call(u,n)}else a.error.call(u,c)}var u={},a=ua.dispatch("progress","load","error"),o={},c=new(oa.XDomainRequest&&/^(http(s)?:)?\/\//.test(n)?XDomainRequest:XMLHttpRequest);return"onload"in c?c.onload=c.onerror=i:c.onreadystatechange=function(){c.readyState>3&&i()},c.onprogress=function(n){var t=ua.event;ua.event=n;try{a.progress.call(u,c)}finally{ua.event=t}},u.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?o[n]:(null==t?delete o[n]:o[n]=t+"",u)},u.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",u):t},u.response=function(n){return e=n,u},["get","post"].forEach(function(n){u[n]=function(){return u.send.apply(u,[n].concat(da(arguments)))}}),u.send=function(e,r,i){if(arguments.length===2&&"function"==typeof r&&(i=r,r=null),c.open(e,n,!0),null==t||"accept"in o||(o.accept=t+",*/*"),c.setRequestHeader)for(var a in o)c.setRequestHeader(a,o[a]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=i&&u.on("error",i).on("load",function(n){i(null,n)}),c.send(null==r?null:r),u},u.abort=function(){return c.abort(),u},ua.rebind(u,a,"on"),null==r?u:u.get(gt(r))}function gt(n){return n.length===1?function(t,e){n(null==t?e:null)}:n}function pt(n,t){function e(n,e,u){arguments.length<3&&(u=e,e=null);var a=ua.xhr(n,t,u);return a.row=function(n){return arguments.length?a.response((e=n)==null?r:i(n)):e},a.row(e)}function r(n){return e.parse(n.responseText)}function i(n){return function(t){return e.parse(t.responseText,n)}}function a(t){return t.map(o).join(n)}function o(n){return c.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var c=RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var i=Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(i(n),e)}:i})},e.parseRows=function(n,t){function e(){if(f>=c)return a;if(i)return i=!1,u;var t=f;if(n.charCodeAt(t)===34){for(var e=t;e++<c;)if(n.charCodeAt(e)===34){if(n.charCodeAt(e+1)!==34)break;++e}f=e+2;var r=n.charCodeAt(e+1);return 13===r?(i=!0,n.charCodeAt(e+2)===10&&++f):10===r&&(i=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;c>f;){var r=n.charCodeAt(f++),o=1;if(10===r)i=!0;else if(13===r)i=!0,n.charCodeAt(f)===10&&(++f,++o);else if(r!==l)continue;return n.substring(t,f-o)}return n.substring(t)}for(var r,i,u={},a={},o=[],c=n.length,f=0,s=0;(r=e())!==a;){for(var h=[];r!==u&&r!==a;)h.push(r),r=e();(!t||(h=t(h,s++)))&&o.push(h)}return o},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new u,i=[];return t.forEach(function(n){for(var t in n)r.has(t)||i.push(r.add(t))}),[i.map(o).join(n)].concat(t.map(function(t){return i.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(a).join("\n")},e}function dt(){var n=mt(),t=vt()-n;t>24?(isFinite(t)&&(clearTimeout($a),$a=setTimeout(dt,t)),Ba=0):(Ba=1,Ja(dt))}function mt(){for(var n=Date.now(),t=Xa;t;)n>=t.time&&(t.flush=t.callback(n-t.time)),t=t.next;return n}function vt(){for(var n,t=Xa,e=1/0;t;)t.flush?t=n?n.next=t.next:Xa=t.next:(t.time<e&&(e=t.time),t=(n=t).next);return Za=n,e}function yt(n,t){var e=Math.pow(10,Math.abs(8-t)*3);return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function Mt(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function xt(n){return n+""}function bt(n,t){n&&uo.hasOwnProperty(n.type)&&uo[n.type](n,t)}function _t(n,t,e){var r,i=-1,u=n.length-e;for(t.lineStart();++i<u;)r=n[i],t.point(r[0],r[1]);t.lineEnd()}function wt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)_t(n[e],t,1);t.polygonEnd()}function St(){function n(n,t){n*=La,t=t*La/2+Da/4;var e=n-r,a=Math.cos(t),o=Math.sin(t),c=u*o,l=i*a+c*Math.cos(e),f=c*Math.sin(e);oo+=Math.atan2(f,l),r=n,i=a,u=o}var t,e,r,i,u;co.point=function(a,o){co.point=n,r=(t=a)*La,i=Math.cos(o=(e=o)*La/2+Da/4),u=Math.sin(o)},co.lineEnd=function(){n(t,e)}}function Et(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function kt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function At(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Nt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function qt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Tt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Ct(n){return[Math.atan2(n[1],n[0]),Math.asin(Math.max(-1,Math.min(1,n[2])))]}function zt(n,t){return Math.abs(n[0]-t[0])<ja&&Math.abs(n[1]-t[1])<ja}function Dt(n,t){if(!lo){++fo,n*=La;var e=Math.cos(t*=La);so+=(e*Math.cos(n)-so)/fo,ho+=(e*Math.sin(n)-ho)/fo,go+=(Math.sin(t)-go)/fo}}function jt(){var n,t;lo=1,Lt(),lo=2;var e=po.point;po.point=function(r,i){e(n=r,t=i)},po.lineEnd=function(){po.point(n,t),Ft(),po.lineEnd=Ft}}function Lt(){function n(n,i){n*=La;var u=Math.cos(i*=La),a=u*Math.cos(n),o=u*Math.sin(n),c=Math.sin(i),l=Math.atan2(Math.sqrt((l=e*c-r*o)*l+(l=r*a-t*c)*l+(l=t*o-e*a)*l),t*a+e*o+r*c);fo+=l,so+=l*(t+(t=a)),ho+=l*(e+(e=o)),go+=l*(r+(r=c))}var t,e,r;lo>1||(1>lo&&(lo=1,fo=so=ho=go=0),po.point=function(i,u){i*=La;var a=Math.cos(u*=La);t=a*Math.cos(i),e=a*Math.sin(i),r=Math.sin(u),po.point=n})}function Ft(){po.point=Dt}function Ht(){return!0}function Pt(n,t,e,r,i){var u=[],a=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(zt(e,r)){i.lineStart();for(var o=0;t>o;++o)i.point((e=n[o])[0],e[1]);return i.lineEnd(),void 0}var c={point:e,points:n,other:null,visited:!1,entry:!0,subject:!0},l={point:e,points:[e],other:c,visited:!1,entry:!1,subject:!1};c.other=l,u.push(c),a.push(l),c={point:r,points:[r],other:null,visited:!1,entry:!1,subject:!0},l={point:r,points:[r],other:c,visited:!1,entry:!0,subject:!1},c.other=l,u.push(c),a.push(l)}}),a.sort(t),Rt(u),Rt(a),u.length){if(e)for(var o=1,c=!e(a[0].point),l=a.length;l>o;++o)a[o].entry=c=!c;for(var f,s,h,g=u[0];;){for(f=g;f.visited;)if((f=f.next)===g)return;s=f.points,i.lineStart();do{if(f.visited=f.other.visited=!0,f.entry){if(f.subject)for(var o=0;o<s.length;o++)i.point((h=s[o])[0],h[1]);else r(f.point,f.next.point,1,i);f=f.next}else{if(f.subject){s=f.prev.points;for(var o=s.length;--o>=0;)i.point((h=s[o])[0],h[1])}else r(f.point,f.prev.point,-1,i);f=f.prev}f=f.other,s=f.points}while(!f.visited);i.lineEnd()}}}function Rt(n){if(t=n.length){for(var t,e,r=0,i=n[0];++r<t;)i.next=e=n[r],e.prev=i,i=e;i.next=e=n[0],e.prev=i}}function Ot(n,t,e){return function(r){function i(t,e){n(t,e)&&r.point(t,e)}function u(n,t){m.point(n,t)}function a(){v.point=u,m.lineStart()}function o(){v.point=i,m.lineEnd()}function c(n,t){M.point(n,t),d.push([n,t])}function l(){M.lineStart(),d=[]}function f(){c(d[0][0],d[0][1]),M.lineEnd();var n,t=M.clean(),e=y.buffer(),i=e.length;if(!i)return p=!0,g+=It(d,-1),d=null,void 0;if(d=null,1&t){n=e[0],h+=It(n,1);var u,i=n.length-1,a=-1;for(r.lineStart();++a<i;)r.point((u=n[a])[0],u[1]);return r.lineEnd(),void 0}i>1&&2&t&&e.push(e.pop().concat(e.shift())),s.push(e.filter(Yt))}var s,h,g,p,d,m=t(r),v={point:i,lineStart:a,lineEnd:o,polygonStart:function(){v.point=c,v.lineStart=l,v.lineEnd=f,p=!1,g=h=0,s=[],r.polygonStart()},polygonEnd:function(){v.point=i,v.lineStart=a,v.lineEnd=o,s=ua.merge(s),s.length?Pt(s,Vt,null,e,r):(-ja>h||p&&-ja>g)&&(r.lineStart(),e(null,null,1,r),r.lineEnd()),r.polygonEnd(),s=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}},y=Ut(),M=t(y);return v}}function Yt(n){return n.length>1}function Ut(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:q,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function It(n,t){if(!(e=n.length))return 0;for(var e,r,i,u=0,a=0,o=n[0],c=o[0],l=o[1],f=Math.cos(l),s=Math.atan2(t*Math.sin(c)*f,Math.sin(l)),h=1-t*Math.cos(c)*f,g=s;++u<e;)o=n[u],f=Math.cos(l=o[1]),r=Math.atan2(t*Math.sin(c=o[0])*f,Math.sin(l)),i=1-t*Math.cos(c)*f,Math.abs(h-2)<ja&&Math.abs(i-2)<ja||(Math.abs(i)<ja||Math.abs(h)<ja||(Math.abs(Math.abs(r-s)-Da)<ja?i+h>2&&(a+=4*(r-s)):a+=Math.abs(h-2)<ja?4*(r-g):((3*Da+r-s)%(2*Da)-Da)*(h+i)),g=s,s=r,h=i);return a}function Vt(n,t){return((n=n.point)[0]<0?n[1]-Da/2-ja:Da/2-n[1])-((t=t.point)[0]<0?t[1]-Da/2-ja:Da/2-t[1])}function Xt(n){var t,e=0/0,r=0/0,i=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(u,a){var o=u>0?Da:-Da,c=Math.abs(u-e);Math.abs(c-Da)<ja?(n.point(e,r=(r+a)/2>0?Da/2:-Da/2),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(o,r),n.point(u,r),t=0):i!==o&&c>=Da&&(Math.abs(e-i)<ja&&(e-=i*ja),Math.abs(u-o)<ja&&(u-=o*ja),r=Zt(e,r,u,a),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(o,r),t=0),n.point(e=u,r=a),i=o},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function Zt(n,t,e,r){var i,u,a=Math.sin(n-e);return Math.abs(a)>ja?Math.atan((Math.sin(t)*(u=Math.cos(r))*Math.sin(e)-Math.sin(r)*(i=Math.cos(t))*Math.sin(n))/(i*u*a)):(t+r)/2}function Bt(n,t,e,r){var i;if(null==n)i=e*Da/2,r.point(-Da,i),r.point(0,i),r.point(Da,i),r.point(Da,0),r.point(Da,-i),r.point(0,-i),r.point(-Da,-i),r.point(-Da,0),r.point(-Da,i);else if(Math.abs(n[0]-t[0])>ja){var u=(n[0]<t[0]?1:-1)*Da;i=e*u/2,r.point(-u,i),r.point(0,i),r.point(u,i)}else r.point(t[0],t[1])}function $t(n){function t(n,t){return Math.cos(n)*Math.cos(t)>u}function e(n){var e,u,c,l,f;return{lineStart:function(){l=c=!1,f=1},point:function(s,h){var g,p=[s,h],d=t(s,h),m=a?d?0:i(s,h):d?i(s+(0>s?Da:-Da),h):0;if(!e&&(l=c=d)&&n.lineStart(),d!==c&&(g=r(e,p),(zt(e,g)||zt(p,g))&&(p[0]+=ja,p[1]+=ja,d=t(p[0],p[1]))),d!==c)f=0,d?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(o&&e&&a^d){var v;m&u||!(v=r(p,e,!0))||(f=0,a?(n.lineStart(),n.point(v[0][0],v[0][1]),n.point(v[1][0],v[1][1]),n.lineEnd()):(n.point(v[1][0],v[1][1]),n.lineEnd(),n.lineStart(),n.point(v[0][0],v[0][1])))}!d||e&&zt(e,p)||n.point(p[0],p[1]),e=p,c=d,u=m},lineEnd:function(){c&&n.lineEnd(),e=null},clean:function(){return f|(l&&c)<<1}}}function r(n,t,e){var r=Et(n),i=Et(t),a=[1,0,0],o=At(r,i),c=kt(o,o),l=o[0],f=c-l*l;if(!f)return!e&&n;var s=u*c/f,h=-u*l/f,g=At(a,o),p=qt(a,s),d=qt(o,h);Nt(p,d);var m=g,v=kt(p,m),y=kt(m,m),M=v*v-y*(kt(p,p)-1);if(!(0>M)){var x=Math.sqrt(M),b=qt(m,(-v-x)/y);if(Nt(b,p),b=Ct(b),!e)return b;var _,w=n[0],S=t[0],E=n[1],k=t[1];w>S&&(_=w,w=S,S=_);var A=S-w,N=Math.abs(A-Da)<ja,q=N||ja>A;if(!N&&E>k&&(_=E,E=k,k=_),q?N?E+k>0^b[1]<(Math.abs(b[0]-w)<ja?E:k):E<=b[1]&&b[1]<=k:A>Da^(w<=b[0]&&b[0]<=S)){var T=qt(m,(-v+x)/y);return Nt(T,p),[b,Ct(T)]}}}function i(t,e){var r=a?n:Da-n,i=0;return-r>t?i|=1:t>r&&(i|=2),-r>e?i|=4:e>r&&(i|=8),i}var u=Math.cos(n),a=u>0,o=Math.abs(u)>ja,c=oe(n,6*La);return Ot(t,e,c)}function Jt(n,t,e,r){function i(r,i){return Math.abs(r[0]-n)<ja?i>0?0:3:Math.abs(r[0]-e)<ja?i>0?2:1:Math.abs(r[1]-t)<ja?i>0?1:0:i>0?3:2}function u(n,t){return a(n.point,t.point)}function a(n,t){var e=i(n,1),r=i(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}function o(i,u){var a=u[0]-i[0],o=u[1]-i[1],c=[0,1];return Math.abs(a)<ja&&Math.abs(o)<ja?n<=i[0]&&i[0]<=e&&t<=i[1]&&i[1]<=r:Gt(n-i[0],a,c)&&Gt(i[0]-e,-a,c)&&Gt(t-i[1],o,c)&&Gt(i[1]-r,-o,c)?(c[1]<1&&(u[0]=i[0]+c[1]*a,u[1]=i[1]+c[1]*o),c[0]>0&&(i[0]+=c[0]*a,i[1]+=c[0]*o),!0):!1}return function(c){function l(u){var a=i(u,-1),o=f([0===a||3===a?n:e,a>1?r:t]);return o}function f(n){for(var t=0,e=M.length,r=n[1],i=0;e>i;++i)for(var u,a=1,o=M[i],c=o.length,l=o[0];c>a;++a)u=o[a],l[1]<=r?u[1]>r&&s(l,u,n)>0&&++t:u[1]<=r&&s(l,u,n)<0&&--t,l=u;return 0!==t}function s(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(t[1]-n[1])}function h(u,o,c,l){var f=0,s=0;if(null==u||(f=i(u,c))!==(s=i(o,c))||a(u,o)<0^c>0){do l.point(0===f||3===f?n:e,f>1?r:t);while((f=(f+c+4)%4)!==s)}else l.point(o[0],o[1])}function g(i,u){return i>=n&&e>=i&&u>=t&&r>=u}function p(n,t){g(n,t)&&c.point(n,t)}function d(){T.point=v,M&&M.push(x=[]),A=!0,k=!1,S=E=0/0}function m(){y&&(v(b,_),w&&k&&q.rejoin(),y.push(q.buffer())),T.point=p,k&&c.lineEnd()}function v(n,t){n=Math.max(-vo,Math.min(vo,n)),t=Math.max(-vo,Math.min(vo,t));var e=g(n,t);if(M&&x.push([n,t]),A)b=n,_=t,w=e,A=!1,e&&(c.lineStart(),c.point(n,t));else if(e&&k)c.point(n,t);else{var r=[S,E],i=[n,t];o(r,i)?(k||(c.lineStart(),c.point(r[0],r[1])),c.point(i[0],i[1]),e||c.lineEnd()):e&&(c.lineStart(),c.point(n,t))}S=n,E=t,k=e}var y,M,x,b,_,w,S,E,k,A,N=c,q=Ut(),T={point:p,lineStart:d,lineEnd:m,polygonStart:function(){c=q,y=[],M=[]},polygonEnd:function(){c=N,(y=ua.merge(y)).length?(c.polygonStart(),Pt(y,u,l,h,c),c.polygonEnd()):f([n,t])&&(c.polygonStart(),c.lineStart(),h(null,null,1,c),c.lineEnd(),c.polygonEnd()),y=M=x=null}};return T}}function Gt(n,t,e){if(Math.abs(t)<ja)return 0>=n;var r=n/t;if(t>0){if(r>e[1])return!1;r>e[0]&&(e[0]=r)}else{if(r<e[0])return!1;r<e[1]&&(e[1]=r)}return!0}function Kt(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function Wt(n){function t(t){function r(e,r){e=n(e,r),t.point(e[0],e[1])}function u(){f=0/0,d.point=a,t.lineStart()}function a(r,u){var a=Et([r,u]),o=n(r,u);e(f,s,l,h,g,p,f=o[0],s=o[1],l=r,h=a[0],g=a[1],p=a[2],i,t),t.point(f,s)}function o(){d.point=r,t.lineEnd()}function c(){var n,r,c,m,v,y,M;u(),d.point=function(t,e){a(n=t,r=e),c=f,m=s,v=h,y=g,M=p,d.point=a},d.lineEnd=function(){e(f,s,l,h,g,p,c,m,n,v,y,M,i,t),d.lineEnd=o,o()}}var l,f,s,h,g,p,d={point:r,lineStart:u,lineEnd:o,polygonStart:function(){t.polygonStart(),d.lineStart=c},polygonEnd:function(){t.polygonEnd(),d.lineStart=u}};return d}function e(t,i,u,a,o,c,l,f,s,h,g,p,d,m){var v=l-t,y=f-i,M=v*v+y*y;if(M>4*r&&d--){var x=a+h,b=o+g,_=c+p,w=Math.sqrt(x*x+b*b+_*_),S=Math.asin(_/=w),E=Math.abs(Math.abs(_)-1)<ja?(u+s)/2:Math.atan2(b,x),k=n(E,S),A=k[0],N=k[1],q=A-t,T=N-i,C=y*q-v*T;(C*C/M>r||Math.abs((v*q+y*T)/M-.5)>.3)&&(e(t,i,u,a,o,c,A,N,E,x/=w,b/=w,_,d,m),m.point(A,N),e(A,N,E,x,b,_,l,f,s,h,g,p,d,m))}}var r=.5,i=16;return t.precision=function(n){return arguments.length?(i=(r=n*n)>0&&16,t):Math.sqrt(r)},t}function Qt(n){return ne(function(){return n})()}function ne(n){function t(n){return n=a(n[0]*La,n[1]*La),[n[0]*f+o,c-n[1]*f]}function e(n){return n=a.invert((n[0]-o)/f,(c-n[1])/f),n&&[n[0]*Fa,n[1]*Fa]}function r(){a=Kt(u=re(d,m,v),i);var n=i(g,p);return o=s-n[0]*f,c=h+n[1]*f,t}var i,u,a,o,c,l=Wt(function(n,t){return n=i(n,t),[n[0]*f+o,c-n[1]*f]}),f=150,s=480,h=250,g=0,p=0,d=0,m=0,v=0,y=mo,M=ft,x=null,b=null;return t.stream=function(n){return te(u,y(l(M(n))))},t.clipAngle=function(n){return arguments.length?(y=null==n?(x=n,mo):$t((x=+n)*La),t):x},t.clipExtent=function(n){return arguments.length?(b=n,M=null==n?ft:Jt(n[0][0],n[0][1],n[1][0],n[1][1]),t):b},t.scale=function(n){return arguments.length?(f=+n,r()):f},t.translate=function(n){return arguments.length?(s=+n[0],h=+n[1],r()):[s,h]},t.center=function(n){return arguments.length?(g=n[0]%360*La,p=n[1]%360*La,r()):[g*Fa,p*Fa]},t.rotate=function(n){return arguments.length?(d=n[0]%360*La,m=n[1]%360*La,v=n.length>2?n[2]%360*La:0,r()):[d*Fa,m*Fa,v*Fa]},ua.rebind(t,l,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&e,r()}}function te(n,t){return{point:function(e,r){r=n(e*La,r*La),e=r[0],t.point(e>Da?e-2*Da:-Da>e?e+2*Da:e,r[1])},sphere:function(){t.sphere()},lineStart:function(){t.lineStart()},lineEnd:function(){t.lineEnd()},polygonStart:function(){t.polygonStart()},polygonEnd:function(){t.polygonEnd()}}}function ee(n,t){return[n,t]}function re(n,t,e){return n?t||e?Kt(ue(n),ae(t,e)):ue(n):t||e?ae(t,e):ee}function ie(n){return function(t,e){return t+=n,[t>Da?t-2*Da:-Da>t?t+2*Da:t,e]}}function ue(n){var t=ie(n);return t.invert=ie(-n),t}function ae(n,t){function e(n,t){var e=Math.cos(t),o=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),f=l*r+o*i;return[Math.atan2(c*u-f*a,o*r-l*i),Math.asin(Math.max(-1,Math.min(1,f*u+c*a)))]}var r=Math.cos(n),i=Math.sin(n),u=Math.cos(t),a=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),o=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),f=l*u-c*a;return[Math.atan2(c*u+l*a,o*r+f*i),Math.asin(Math.max(-1,Math.min(1,f*r-o*i)))]},e}function oe(n,t){var e=Math.cos(n),r=Math.sin(n);return function(i,u,a,o){null!=i?(i=ce(e,i),u=ce(e,u),(a>0?u>i:i>u)&&(i+=2*a*Da)):(i=n+2*a*Da,u=n);for(var c,l=a*t,f=i;a>0?f>u:u>f;f-=l)o.point((c=Ct([e,-r*Math.cos(f),-r*Math.sin(f)]))[0],c[1])}}function ce(n,t){var e=Et(t);e[0]-=n,Tt(e);var r=O(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-ja)%(2*Math.PI)}function le(n,t,e){var r=ua.range(n,t-ja,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function fe(n,t,e){var r=ua.range(n,t-ja,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function se(n){return n.source}function he(n){return n.target}function ge(n,t,e,r){var i=Math.cos(t),u=Math.sin(t),a=Math.cos(r),o=Math.sin(r),c=i*Math.cos(n),l=i*Math.sin(n),f=a*Math.cos(e),s=a*Math.sin(e),h=2*Math.asin(Math.sqrt(V(r-t)+i*a*V(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*f,i=e*l+t*s,a=e*u+t*o;return[Math.atan2(i,r)*Fa,Math.atan2(a,Math.sqrt(r*r+i*i))*Fa]}:function(){return[n*Fa,t*Fa]};return p.distance=h,p}function pe(){function n(n,i){var u=Math.sin(i*=La),a=Math.cos(i),o=Math.abs((n*=La)-t),c=Math.cos(o);yo+=Math.atan2(Math.sqrt((o=a*Math.sin(o))*o+(o=r*u-e*a*c)*o),e*u+r*a*c),t=n,e=u,r=a}var t,e,r;Mo.point=function(i,u){t=i*La,e=Math.sin(u*=La),r=Math.cos(u),Mo.point=n},Mo.lineEnd=function(){Mo.point=Mo.lineEnd=q}}function de(n){var t=0,e=Da/3,r=ne(n),i=r(t,e);return i.parallels=function(n){return arguments.length?r(t=n[0]*Da/180,e=n[1]*Da/180):[180*(t/Da),180*(e/Da)]},i}function me(n,t){function e(n,t){var e=Math.sqrt(u-2*i*Math.sin(t))/i;return[e*Math.sin(n*=i),a-e*Math.cos(n)]}var r=Math.sin(n),i=(r+Math.sin(t))/2,u=1+r*(2*i-r),a=Math.sqrt(u)/i;return e.invert=function(n,t){var e=a-t;return[Math.atan2(n,e)/i,Y((u-(n*n+e*e)*i*i)/(2*i))]},e}function ve(){function n(n,t){bo+=i*n-r*t,r=n,i=t}var t,e,r,i;ko.point=function(u,a){ko.point=n,t=r=u,e=i=a},ko.lineEnd=function(){n(t,e)}}function ye(n,t){_o>n&&(_o=n),n>So&&(So=n),wo>t&&(wo=t),t>Eo&&(Eo=t)}function Me(){function n(n,t){a.push("M",n,",",t,u)}function t(n,t){a.push("M",n,",",t),o.point=e}function e(n,t){a.push("L",n,",",t)}function r(){o.point=n}function i(){a.push("Z")}var u=xe(4.5),a=[],o={point:n,lineStart:function(){o.point=t},lineEnd:r,polygonStart:function(){o.lineEnd=i},polygonEnd:function(){o.lineEnd=r,o.point=n},pointRadius:function(n){return u=xe(n),o},result:function(){if(a.length){var n=a.join("");return a=[],n}}};return o}function xe(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function be(n,t){lo||(so+=n,ho+=t,++go)}function _e(){function n(n,r){var i=n-t,u=r-e,a=Math.sqrt(i*i+u*u);so+=a*(t+n)/2,ho+=a*(e+r)/2,go+=a,t=n,e=r}var t,e;if(1!==lo){if(!(1>lo))return;lo=1,so=ho=go=0}No.point=function(r,i){No.point=n,t=r,e=i}}function we(){No.point=be}function Se(){function n(n,t){var e=i*n-r*t;so+=e*(r+n),ho+=e*(i+t),go+=3*e,r=n,i=t}var t,e,r,i;2>lo&&(lo=2,so=ho=go=0),No.point=function(u,a){No.point=n,t=r=u,e=i=a},No.lineEnd=function(){n(t,e)}}function Ee(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,a,0,2*Da)}function e(t,e){n.moveTo(t,e),o.point=r}function r(t,e){n.lineTo(t,e)}function i(){o.point=t}function u(){n.closePath()}var a=4.5,o={point:t,lineStart:function(){o.point=e},lineEnd:i,polygonStart:function(){o.lineEnd=u},polygonEnd:function(){o.lineEnd=i,o.point=t},pointRadius:function(n){return a=n,o},result:q};return o}function ke(n){var t=Wt(function(t,e){return n([t*Fa,e*Fa])});return function(n){return n=t(n),{point:function(t,e){n.point(t*La,e*La)},sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}}function Ae(n,t){function e(t,e){var r=Math.cos(t),i=Math.cos(e),u=n(r*i);return[u*i*Math.sin(t),u*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),i=t(r),u=Math.sin(i),a=Math.cos(i);return[Math.atan2(n*u,r*a),Math.asin(r&&e*u/r)]},e}function Ne(n,t){function e(n,t){var e=Math.abs(Math.abs(t)-Da/2)<ja?0:a/Math.pow(i(t),u);return[e*Math.sin(u*n),a-e*Math.cos(u*n)]}var r=Math.cos(n),i=function(n){return Math.tan(Da/4+n/2)},u=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(i(t)/i(n)),a=r*Math.pow(i(n),u)/u;return u?(e.invert=function(n,t){var e=a-t,r=R(u)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/u,2*Math.atan(Math.pow(a/r,1/u))-Da/2]},e):Te}function qe(n,t){function e(n,t){var e=u-t;return[e*Math.sin(i*n),u-e*Math.cos(i*n)]}var r=Math.cos(n),i=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),u=r/i+n;return Math.abs(i)<ja?ee:(e.invert=function(n,t){var e=u-t;return[Math.atan2(n,e)/i,u-R(i)*Math.sqrt(n*n+e*e)]},e)}function Te(n,t){return[n,Math.log(Math.tan(Da/4+t/2))]}function Ce(n){var t,e=Qt(n),r=e.scale,i=e.translate,u=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=i.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var a=u.apply(e,arguments);if(a===e){if(t=null==n){var o=Da*r(),c=i();u([[c[0]-o,c[1]-o],[c[0]+o,c[1]+o]])}}else t&&(a=null);return a},e.clipExtent(null)}function ze(n,t){var e=Math.cos(t)*Math.sin(n);return[Math.log((1+e)/(1-e))/2,Math.atan2(Math.tan(t),Math.cos(n))]}function De(n){function t(t){function a(){l.push("M",u(n(f),o))}for(var c,l=[],f=[],s=-1,h=t.length,g=lt(e),p=lt(r);++s<h;)i.call(this,c=t[s],s)?f.push([+g.call(this,c,s),+p.call(this,c,s)]):f.length&&(a(),f=[]);return f.length&&a(),l.length?l.join(""):null}var e=je,r=Le,i=Ht,u=Fe,a=u.key,o=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(i=n,t):i},t.interpolate=function(n){return arguments.length?(a="function"==typeof n?u=n:(u=jo.get(n)||Fe).key,t):a},t.tension=function(n){return arguments.length?(o=n,t):o},t}function je(n){return n[0]}function Le(n){return n[1]}function Fe(n){return n.join("L")}function He(n){return Fe(n)+"Z"}function Pe(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("V",(r=n[t])[1],"H",r[0]);return i.join("")}function Re(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r=n[t])[0],"V",r[1]);return i.join("")}function Oe(n,t){return n.length<4?Fe(n):n[1]+Ie(n.slice(1,n.length-1),Ve(n,t))}function Ye(n,t){return n.length<3?Fe(n):n[0]+Ie((n.push(n[0]),n),Ve([n[n.length-2]].concat(n,[n[1]]),t))}function Ue(n,t){return n.length<3?Fe(n):n[0]+Ie(n,Ve(n,t))}function Ie(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return Fe(n);var e=n.length!=t.length,r="",i=n[0],u=n[1],a=t[0],o=a,c=1;if(e&&(r+="Q"+(u[0]-a[0]*2/3)+","+(u[1]-a[1]*2/3)+","+u[0]+","+u[1],i=n[1],c=2),t.length>1){o=t[1],u=n[c],c++,r+="C"+(i[0]+a[0])+","+(i[1]+a[1])+","+(u[0]-o[0])+","+(u[1]-o[1])+","+u[0]+","+u[1];for(var l=2;l<t.length;l++,c++)u=n[c],o=t[l],r+="S"+(u[0]-o[0])+","+(u[1]-o[1])+","+u[0]+","+u[1]}if(e){var f=n[c];r+="Q"+(u[0]+o[0]*2/3)+","+(u[1]+o[1]*2/3)+","+f[0]+","+f[1]}return r}function Ve(n,t){for(var e,r=[],i=(1-t)/2,u=n[0],a=n[1],o=1,c=n.length;++o<c;)e=u,u=a,a=n[o],r.push([i*(a[0]-e[0]),i*(a[1]-e[1])]);return r}function Xe(n){if(n.length<3)return Fe(n);var t=1,e=n.length,r=n[0],i=r[0],u=r[1],a=[i,i,i,(r=n[1])[0]],o=[u,u,u,r[1]],c=[i,",",u];for(Ge(c,a,o);++t<e;)r=n[t],a.shift(),a.push(r[0]),o.shift(),o.push(r[1]),Ge(c,a,o);for(t=-1;++t<2;)a.shift(),a.push(r[0]),o.shift(),o.push(r[1]),Ge(c,a,o);return c.join("")}function Ze(n){if(n.length<4)return Fe(n);for(var t,e=[],r=-1,i=n.length,u=[0],a=[0];++r<3;)t=n[r],u.push(t[0]),a.push(t[1]);for(e.push(Je(Ho,u)+","+Je(Ho,a)),--r;++r<i;)t=n[r],u.shift(),u.push(t[0]),a.shift(),a.push(t[1]),Ge(e,u,a);return e.join("")}function Be(n){for(var t,e,r=-1,i=n.length,u=i+4,a=[],o=[];++r<4;)e=n[r%i],a.push(e[0]),o.push(e[1]);for(t=[Je(Ho,a),",",Je(Ho,o)],--r;++r<u;)e=n[r%i],a.shift(),a.push(e[0]),o.shift(),o.push(e[1]),Ge(t,a,o);return t.join("")}function $e(n,t){var e=n.length-1;if(e)for(var r,i,u=n[0][0],a=n[0][1],o=n[e][0]-u,c=n[e][1]-a,l=-1;++l<=e;)r=n[l],i=l/e,r[0]=t*r[0]+(1-t)*(u+i*o),r[1]=t*r[1]+(1-t)*(a+i*c);return Xe(n)}function Je(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Ge(n,t,e){n.push("C",Je(Lo,t),",",Je(Lo,e),",",Je(Fo,t),",",Je(Fo,e),",",Je(Ho,t),",",Je(Ho,e))}function Ke(n,t){return(t[1]-n[1])/(t[0]-n[0])
}function We(n){for(var t=0,e=n.length-1,r=[],i=n[0],u=n[1],a=r[0]=Ke(i,u);++t<e;)r[t]=(a+(a=Ke(i=u,u=n[t+1])))/2;return r[t]=a,r}function Qe(n){for(var t,e,r,i,u=[],a=We(n),o=-1,c=n.length-1;++o<c;)t=Ke(n[o],n[o+1]),Math.abs(t)<1e-6?a[o]=a[o+1]=0:(e=a[o]/t,r=a[o+1]/t,i=e*e+r*r,i>9&&(i=3*t/Math.sqrt(i),a[o]=i*e,a[o+1]=i*r));for(o=-1;++o<=c;)i=(n[Math.min(c,o+1)][0]-n[Math.max(0,o-1)][0])/(6*(1+a[o]*a[o])),u.push([i||0,a[o]*i||0]);return u}function nr(n){return n.length<3?Fe(n):n[0]+Ie(n,Qe(n))}function tr(n,t,e,r){var i,u,a,o,c,l,f;return i=r[n],u=i[0],a=i[1],i=r[t],o=i[0],c=i[1],i=r[e],l=i[0],f=i[1],(f-a)*(o-u)-(c-a)*(l-u)>0}function er(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function rr(n,t,e,r){var i=n[0],u=e[0],a=t[0]-i,o=r[0]-u,c=n[1],l=e[1],f=t[1]-c,s=r[1]-l,h=(o*(c-l)-s*(i-u))/(s*a-o*f);return[i+h*a,c+h*f]}function ir(n,t){var e={list:n.map(function(n,t){return{index:t,x:n[0],y:n[1]}}).sort(function(n,t){return n.y<t.y?-1:n.y>t.y?1:n.x<t.x?-1:n.x>t.x?1:0}),bottomSite:null},r={list:[],leftEnd:null,rightEnd:null,init:function(){r.leftEnd=r.createHalfEdge(null,"l"),r.rightEnd=r.createHalfEdge(null,"l"),r.leftEnd.r=r.rightEnd,r.rightEnd.l=r.leftEnd,r.list.unshift(r.leftEnd,r.rightEnd)},createHalfEdge:function(n,t){return{edge:n,side:t,vertex:null,l:null,r:null}},insert:function(n,t){t.l=n,t.r=n.r,n.r.l=t,n.r=t},leftBound:function(n){var t=r.leftEnd;do t=t.r;while(t!=r.rightEnd&&i.rightOf(t,n));return t=t.l},del:function(n){n.l.r=n.r,n.r.l=n.l,n.edge=null},right:function(n){return n.r},left:function(n){return n.l},leftRegion:function(n){return n.edge==null?e.bottomSite:n.edge.region[n.side]},rightRegion:function(n){return n.edge==null?e.bottomSite:n.edge.region[Po[n.side]]}},i={bisect:function(n,t){var e={region:{l:n,r:t},ep:{l:null,r:null}},r=t.x-n.x,i=t.y-n.y,u=r>0?r:-r,a=i>0?i:-i;return e.c=n.x*r+n.y*i+.5*(r*r+i*i),u>a?(e.a=1,e.b=i/r,e.c/=r):(e.b=1,e.a=r/i,e.c/=i),e},intersect:function(n,t){var e=n.edge,r=t.edge;if(!e||!r||e.region.r==r.region.r)return null;var i=e.a*r.b-e.b*r.a;if(Math.abs(i)<1e-10)return null;var u,a,o=(e.c*r.b-r.c*e.b)/i,c=(r.c*e.a-e.c*r.a)/i,l=e.region.r,f=r.region.r;l.y<f.y||l.y==f.y&&l.x<f.x?(u=n,a=e):(u=t,a=r);var s=o>=a.region.r.x;return s&&u.side==="l"||!s&&u.side==="r"?null:{x:o,y:c}},rightOf:function(n,t){var e=n.edge,r=e.region.r,i=t.x>r.x;if(i&&n.side==="l")return 1;if(!i&&n.side==="r")return 0;if(e.a===1){var u=t.y-r.y,a=t.x-r.x,o=0,c=0;if(!i&&e.b<0||i&&e.b>=0?c=o=u>=e.b*a:(c=t.x+t.y*e.b>e.c,e.b<0&&(c=!c),c||(o=1)),!o){var l=r.x-e.region.l.x;c=e.b*(a*a-u*u)<l*u*(1+2*a/l+e.b*e.b),e.b<0&&(c=!c)}}else{var f=e.c-e.a*t.x,s=t.y-f,h=t.x-r.x,g=f-r.y;c=s*s>h*h+g*g}return n.side==="l"?c:!c},endPoint:function(n,e,r){n.ep[e]=r,n.ep[Po[e]]&&t(n)},distance:function(n,t){var e=n.x-t.x,r=n.y-t.y;return Math.sqrt(e*e+r*r)}},u={list:[],insert:function(n,t,e){n.vertex=t,n.ystar=t.y+e;for(var r=0,i=u.list,a=i.length;a>r;r++){var o=i[r];if(!(n.ystar>o.ystar||n.ystar==o.ystar&&t.x>o.vertex.x))break}i.splice(r,0,n)},del:function(n){for(var t=0,e=u.list,r=e.length;r>t&&e[t]!=n;++t);e.splice(t,1)},empty:function(){return u.list.length===0},nextEvent:function(n){for(var t=0,e=u.list,r=e.length;r>t;++t)if(e[t]==n)return e[t+1];return null},min:function(){var n=u.list[0];return{x:n.vertex.x,y:n.ystar}},extractMin:function(){return u.list.shift()}};r.init(),e.bottomSite=e.list.shift();for(var a,o,c,l,f,s,h,g,p,d,m,v,y,M=e.list.shift();;)if(u.empty()||(a=u.min()),M&&(u.empty()||M.y<a.y||M.y==a.y&&M.x<a.x))o=r.leftBound(M),c=r.right(o),h=r.rightRegion(o),v=i.bisect(h,M),s=r.createHalfEdge(v,"l"),r.insert(o,s),d=i.intersect(o,s),d&&(u.del(o),u.insert(o,d,i.distance(d,M))),o=s,s=r.createHalfEdge(v,"r"),r.insert(o,s),d=i.intersect(s,c),d&&u.insert(s,d,i.distance(d,M)),M=e.list.shift();else{if(u.empty())break;o=u.extractMin(),l=r.left(o),c=r.right(o),f=r.right(c),h=r.leftRegion(o),g=r.rightRegion(c),m=o.vertex,i.endPoint(o.edge,o.side,m),i.endPoint(c.edge,c.side,m),r.del(o),u.del(c),r.del(c),y="l",h.y>g.y&&(p=h,h=g,g=p,y="r"),v=i.bisect(h,g),s=r.createHalfEdge(v,y),r.insert(l,s),i.endPoint(v,Po[y],m),d=i.intersect(l,s),d&&(u.del(l),u.insert(l,d,i.distance(d,h))),d=i.intersect(s,f),d&&u.insert(s,d,i.distance(d,h))}for(o=r.right(r.leftEnd);o!=r.rightEnd;o=r.right(o))t(o.edge)}function ur(n){return n.x}function ar(n){return n.y}function or(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function cr(n,t,e,r,i,u){if(!n(t,e,r,i,u)){var a=.5*(e+i),o=.5*(r+u),c=t.nodes;c[0]&&cr(n,c[0],e,r,a,o),c[1]&&cr(n,c[1],a,r,i,o),c[2]&&cr(n,c[2],e,o,a,u),c[3]&&cr(n,c[3],a,o,i,u)}}function lr(n,t){n=ua.rgb(n),t=ua.rgb(t);var e=n.r,r=n.g,i=n.b,u=t.r-e,a=t.g-r,o=t.b-i;return function(n){return"#"+rt(Math.round(e+u*n))+rt(Math.round(r+a*n))+rt(Math.round(i+o*n))}}function fr(n){var t=[n.a,n.b],e=[n.c,n.d],r=hr(t),i=sr(t,e),u=hr(gr(e,t,-i))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Fa,this.translate=[n.e,n.f],this.scale=[r,u],this.skew=u?Math.atan2(i,u)*Fa:0}function sr(n,t){return n[0]*t[0]+n[1]*t[1]}function hr(n){var t=Math.sqrt(sr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function gr(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function pr(n,t){return t-=n=+n,function(e){return n+t*e}}function dr(n,t){var e,r=[],i=[],u=ua.transform(n),a=ua.transform(t),o=u.translate,c=a.translate,l=u.rotate,f=a.rotate,s=u.skew,h=a.skew,g=u.scale,p=a.scale;return o[0]!=c[0]||o[1]!=c[1]?(r.push("translate(",null,",",null,")"),i.push({i:1,x:pr(o[0],c[0])},{i:3,x:pr(o[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),l!=f?(l-f>180?f+=360:f-l>180&&(l+=360),i.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:pr(l,f)})):f&&r.push(r.pop()+"rotate("+f+")"),s!=h?i.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:pr(s,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),i.push({i:e-4,x:pr(g[0],p[0])},{i:e-2,x:pr(g[1],p[1])})):(p[0]!=1||p[1]!=1)&&r.push(r.pop()+"scale("+p+")"),e=i.length,function(n){for(var t,u=-1;++u<e;)r[(t=i[u]).i]=t.x(n);return r.join("")}}function mr(n,t){var e,r={},i={};for(e in n)e in t?r[e]=Mr(e)(n[e],t[e]):i[e]=n[e];for(e in t)e in n||(i[e]=t[e]);return function(n){for(e in r)i[e]=r[e](n);return i}}function vr(n,t){var e,r,i,u,a,o=0,c=0,l=[],f=[];for(n+="",t+="",Oo.lastIndex=0,r=0;e=Oo.exec(t);++r)e.index&&l.push(t.substring(o,c=e.index)),f.push({i:l.length,x:e[0]}),l.push(null),o=Oo.lastIndex;for(o<t.length&&l.push(t.substring(o)),r=0,u=f.length;(e=Oo.exec(n))&&u>r;++r)if(a=f[r],a.x==e[0]){if(a.i)if(l[a.i+1]==null)for(l[a.i-1]+=a.x,l.splice(a.i,1),i=r+1;u>i;++i)f[i].i--;else for(l[a.i-1]+=a.x+l[a.i+1],l.splice(a.i,2),i=r+1;u>i;++i)f[i].i-=2;else if(l[a.i+1]==null)l[a.i]=a.x;else for(l[a.i]=a.x+l[a.i+1],l.splice(a.i+1,1),i=r+1;u>i;++i)f[i].i--;f.splice(r,1),u--,r--}else a.x=pr(parseFloat(e[0]),parseFloat(a.x));for(;u>r;)a=f.pop(),l[a.i+1]==null?l[a.i]=a.x:(l[a.i]=a.x+l[a.i+1],l.splice(a.i+1,1)),u--;return l.length===1?l[0]==null?(a=f[0].x,function(n){return a(n)+""}):function(){return t}:function(n){for(r=0;u>r;++r)l[(a=f[r]).i]=a.x(n);return l.join("")}}function yr(n,t){for(var e,r=ua.interpolators.length;--r>=0&&!(e=ua.interpolators[r](n,t)););return e}function Mr(n){return"transform"==n?dr:yr}function xr(n,t){var e,r=[],i=[],u=n.length,a=t.length,o=Math.min(n.length,t.length);for(e=0;o>e;++e)r.push(yr(n[e],t[e]));for(;u>e;++e)i[e]=n[e];for(;a>e;++e)i[e]=t[e];return function(n){for(e=0;o>e;++e)i[e]=r[e](n);return i}}function br(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function _r(n){return function(t){return 1-n(1-t)}}function wr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function Sr(n){return n*n}function Er(n){return n*n*n}function kr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Ar(n){return function(t){return Math.pow(t,n)}}function Nr(n){return 1-Math.cos(n*Da/2)}function qr(n){return Math.pow(2,10*(n-1))}function Tr(n){return 1-Math.sqrt(1-n*n)}function Cr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/(2*Da)*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,10*-r)*Math.sin(2*(r-e)*Da/t)}}function zr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Dr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function jr(n,t){n=ua.hcl(n),t=ua.hcl(t);var e=n.h,r=n.c,i=n.l,u=t.h-e,a=t.c-r,o=t.l-i;return isNaN(a)&&(a=0,r=isNaN(r)?t.c:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return B(e+u*n,r+a*n,i+o*n)+""}}function Lr(n,t){n=ua.hsl(n),t=ua.hsl(t);var e=n.h,r=n.s,i=n.l,u=t.h-e,a=t.s-r,o=t.l-i;return isNaN(a)&&(a=0,r=isNaN(r)?t.s:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return P(e+u*n,r+a*n,i+o*n)+""}}function Fr(n,t){n=ua.lab(n),t=ua.lab(t);var e=n.l,r=n.a,i=n.b,u=t.l-e,a=t.a-r,o=t.b-i;return function(n){return G(e+u*n,r+a*n,i+o*n)+""}}function Hr(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Pr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function Rr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function Or(n){for(var t=n.source,e=n.target,r=Ur(t,e),i=[t];t!==r;)t=t.parent,i.push(t);for(var u=i.length;e!==r;)i.splice(u,0,e),e=e.parent;return i}function Yr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Ur(n,t){if(n===t)return n;for(var e=Yr(n),r=Yr(t),i=e.pop(),u=r.pop(),a=null;i===u;)a=i,i=e.pop(),u=r.pop();return a}function Ir(n){n.fixed|=2}function Vr(n){n.fixed&=-7}function Xr(n){n.fixed|=4,n.px=n.x,n.py=n.y}function Zr(n){n.fixed&=-5}function Br(n,t,e){var r=0,i=0;if(n.charge=0,!n.leaf)for(var u,a=n.nodes,o=a.length,c=-1;++c<o;)u=a[c],null!=u&&(Br(u,t,e),n.charge+=u.charge,r+=u.charge*u.cx,i+=u.charge*u.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var l=t*e[n.point.index];n.charge+=n.pointCharge=l,r+=l*n.point.x,i+=l*n.point.y}n.cx=r/n.charge,n.cy=i/n.charge}function $r(n,t){return ua.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=Wr,n}function Jr(n){return n.children}function Gr(n){return n.value}function Kr(n,t){return t.value-n.value}function Wr(n){return ua.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function Qr(n){return n.x}function ni(n){return n.y}function ti(n,t,e){n.y0=t,n.y=e}function ei(n){return ua.range(n.length)}function ri(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function ii(n){for(var t,e=1,r=0,i=n[0][1],u=n.length;u>e;++e)(t=n[e][1])>i&&(r=e,i=t);return r}function ui(n){return n.reduce(ai,0)}function ai(n,t){return n+t[1]}function oi(n,t){return ci(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function ci(n,t){for(var e=-1,r=+n[0],i=(n[1]-r)/t,u=[];++e<=t;)u[e]=i*e+r;return u}function li(n){return[ua.min(n),ua.max(n)]}function fi(n,t){return n.parent==t.parent?1:2}function si(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function hi(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function gi(n,t){var e=n.children;if(e&&(i=e.length))for(var r,i,u=-1;++u<i;)t(r=gi(e[u],t),n)>0&&(n=r);return n}function pi(n,t){return n.x-t.x}function di(n,t){return t.x-n.x}function mi(n,t){return n.depth-t.depth}function vi(n,t){function e(n,r){var i=n.children;if(i&&(a=i.length))for(var u,a,o=null,c=-1;++c<a;)u=i[c],e(u,o),o=u;t(n,r)}e(n,null)}function yi(n){for(var t,e=0,r=0,i=n.children,u=i.length;--u>=0;)t=i[u]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function Mi(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function xi(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function bi(n,t){return n.value-t.value}function _i(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function wi(n,t){n._pack_next=t,t._pack_prev=n}function Si(n,t){var e=t.x-n.x,r=t.y-n.y,i=n.r+t.r;return i*i-e*e-r*r>.001}function Ei(n){function t(n){f=Math.min(n.x-n.r,f),s=Math.max(n.x+n.r,s),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(l=e.length)){var e,r,i,u,a,o,c,l,f=1/0,s=-1/0,h=1/0,g=-1/0;if(e.forEach(ki),r=e[0],r.x=-r.r,r.y=0,t(r),l>1&&(i=e[1],i.x=i.r,i.y=0,t(i),l>2))for(u=e[2],qi(r,i,u),t(u),_i(r,u),r._pack_prev=u,_i(u,i),i=r._pack_next,a=3;l>a;a++){qi(r,i,u=e[a]);var p=0,d=1,m=1;for(o=i._pack_next;o!==i;o=o._pack_next,d++)if(Si(o,u)){p=1;break}if(1==p)for(c=r._pack_prev;c!==o._pack_prev&&!Si(c,u);c=c._pack_prev,m++);p?(m>d||d==m&&i.r<r.r?wi(r,i=o):wi(r=c,i),a--):(_i(r,u),i=u,t(u))}var v=(f+s)/2,y=(h+g)/2,M=0;for(a=0;l>a;a++)u=e[a],u.x-=v,u.y-=y,M=Math.max(M,u.r+Math.sqrt(u.x*u.x+u.y*u.y));n.r=M,e.forEach(Ai)}}function ki(n){n._pack_next=n._pack_prev=n}function Ai(n){delete n._pack_next,delete n._pack_prev}function Ni(n,t,e,r){var i=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,i)for(var u=-1,a=i.length;++u<a;)Ni(i[u],t,e,r)}function qi(n,t,e){var r=n.r+e.r,i=t.x-n.x,u=t.y-n.y;if(r&&(i||u)){var a=t.r+e.r,o=i*i+u*u;a*=a,r*=r;var c=.5+(r-a)/(2*o),l=Math.sqrt(Math.max(0,2*a*(r+o)-(r-=o)*r-a*a))/(2*o);e.x=n.x+c*i+l*u,e.y=n.y+c*u-l*i}else e.x=n.x+r,e.y=n.y}function Ti(n){return 1+ua.max(n,function(n){return n.y})}function Ci(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function zi(n){var t=n.children;return t&&t.length?zi(t[0]):n}function Di(n){var t,e=n.children;return e&&(t=e.length)?Di(e[t-1]):n}function ji(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Li(n,t){var e=n.x+t[3],r=n.y+t[0],i=n.dx-t[1]-t[3],u=n.dy-t[0]-t[2];return 0>i&&(e+=i/2,i=0),0>u&&(r+=u/2,u=0),{x:e,y:r,dx:i,dy:u}}function Fi(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Hi(n){return n.rangeExtent?n.rangeExtent():Fi(n.range())}function Pi(n,t,e,r){var i=e(n[0],n[1]),u=r(t[0],t[1]);return function(n){return u(i(n))}}function Ri(n,t){var e,r=0,i=n.length-1,u=n[r],a=n[i];return u>a&&(e=r,r=i,i=e,e=u,u=a,a=e),(t=t(a-u))&&(n[r]=t.floor(u),n[i]=t.ceil(a)),n}function Oi(n,t,e,r){var i=[],u=[],a=0,o=Math.min(n.length,t.length)-1;for(n[o]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<=o;)i.push(e(n[a-1],n[a])),u.push(r(t[a-1],t[a]));return function(t){var e=ua.bisect(n,t,1,o)-1;return u[e](i[e](t))}}function Yi(n,t,e,r){function i(){var i=Math.min(n.length,t.length)>2?Oi:Pi,c=r?Rr:Pr;return a=i(n,t,c,e),o=i(t,n,c,yr),u}function u(n){return a(n)}var a,o;return u.invert=function(n){return o(n)},u.domain=function(t){return arguments.length?(n=t.map(Number),i()):n},u.range=function(n){return arguments.length?(t=n,i()):t},u.rangeRound=function(n){return u.range(n).interpolate(Hr)},u.clamp=function(n){return arguments.length?(r=n,i()):r},u.interpolate=function(n){return arguments.length?(e=n,i()):e},u.ticks=function(t){return Xi(n,t)},u.tickFormat=function(t,e){return Zi(n,t,e)},u.nice=function(){return Ri(n,Ii),i()},u.copy=function(){return Yi(n,t,e,r)},i()}function Ui(n,t){return ua.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Ii(n){return n=Math.pow(10,Math.round(Math.log(n)/Math.LN10)-1),n&&{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}}function Vi(n,t){var e=Fi(n),r=e[1]-e[0],i=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),u=t/r*i;return.15>=u?i*=10:.35>=u?i*=5:.75>=u&&(i*=2),e[0]=Math.ceil(e[0]/i)*i,e[1]=Math.floor(e[1]/i)*i+.5*i,e[2]=i,e}function Xi(n,t){return ua.range.apply(ua,Vi(n,t))}function Zi(n,t,e){var r=-Math.floor(Math.log(Vi(n,t)[2])/Math.LN10+.01);return ua.format(e?e.replace(no,function(n,t,e,i,u,a,o,c,l,f){return[t,e,i,u,a,o,c,l||"."+(r-2*("%"===f)),f].join("")}):",."+r+"f")}function Bi(n,t,e,r,i){function u(t){return n(e(t))}function a(){return e===$i?{floor:o,ceil:c}:{floor:function(n){return-c(-n)},ceil:function(n){return-o(-n)}}}function o(n){return Math.pow(t,Math.floor(Math.log(n)/Math.log(t)))}function c(n){return Math.pow(t,Math.ceil(Math.log(n)/Math.log(t)))}return u.invert=function(t){return r(n.invert(t))},u.domain=function(t){return arguments.length?(t[0]<0?(e=Gi,r=Ki):(e=$i,r=Ji),n.domain((i=t.map(Number)).map(e)),u):i},u.base=function(n){return arguments.length?(t=+n,u):t},u.nice=function(){return n.domain(Ri(i,a).map(e)),u},u.ticks=function(){var i=Fi(n.domain()),u=[];if(i.every(isFinite)){var a=Math.log(t),o=Math.floor(i[0]/a),c=Math.ceil(i[1]/a),l=r(i[0]),f=r(i[1]),s=t%1?2:t;if(e===Gi)for(u.push(-Math.pow(t,-o));o++<c;)for(var h=s-1;h>0;h--)u.push(-Math.pow(t,-o)*h);else{for(;c>o;o++)for(var h=1;s>h;h++)u.push(Math.pow(t,o)*h);u.push(Math.pow(t,o))}for(o=0;u[o]<l;o++);for(c=u.length;u[c-1]>f;c--);u=u.slice(o,c)}return u},u.tickFormat=function(n,i){if(arguments.length<2&&(i=Jo),!arguments.length)return i;var a,o=Math.log(t),c=Math.max(.1,n/u.ticks().length),l=e===Gi?(a=-1e-12,Math.floor):(a=1e-12,Math.ceil);return function(n){return n/r(o*l(e(n)/o+a))<=c?i(n):""}},u.copy=function(){return Bi(n.copy(),t,e,r,i)},Ui(u,n)}function $i(n){return Math.log(0>n?0:n)}function Ji(n){return Math.exp(n)}function Gi(n){return-Math.log(n>0?0:-n)}function Ki(n){return-Math.exp(-n)}function Wi(n,t,e){function r(t){return n(i(t))}var i=Qi(t),u=Qi(1/t);return r.invert=function(t){return u(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(i)),r):e},r.ticks=function(n){return Xi(e,n)},r.tickFormat=function(n,t){return Zi(e,n,t)},r.nice=function(){return r.domain(Ri(e,Ii))},r.exponent=function(a){return arguments.length?(i=Qi(t=a),u=Qi(1/t),n.domain(e.map(i)),r):t},r.copy=function(){return Wi(n.copy(),t,e)},Ui(r,n)}function Qi(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function nu(n,t){function e(t){return a[((u.get(t)||u.set(t,n.push(t)))-1)%a.length]}function r(t,e){return ua.range(n.length).map(function(n){return t+e*n})}var u,a,o;return e.domain=function(r){if(!arguments.length)return n;n=[],u=new i;for(var a,o=-1,c=r.length;++o<c;)u.has(a=r[o])||u.set(a,n.push(a));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(a=n,o=0,t={t:"range",a:arguments},e):a},e.rangePoints=function(i,u){arguments.length<2&&(u=0);var c=i[0],l=i[1],f=(l-c)/(Math.max(1,n.length-1)+u);return a=r(n.length<2?(c+l)/2:c+f*u/2,f),o=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(i,u,c){arguments.length<2&&(u=0),arguments.length<3&&(c=u);var l=i[1]<i[0],f=i[l-0],s=i[1-l],h=(s-f)/(n.length-u+2*c);return a=r(f+h*c,h),l&&a.reverse(),o=h*(1-u),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(i,u,c){arguments.length<2&&(u=0),arguments.length<3&&(c=u);var l=i[1]<i[0],f=i[l-0],s=i[1-l],h=Math.floor((s-f)/(n.length-u+2*c)),g=s-f-(n.length-u)*h;return a=r(f+Math.round(g/2),h),l&&a.reverse(),o=Math.round(h*(1-u)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return o},e.rangeExtent=function(){return Fi(t.a[0])},e.copy=function(){return nu(n,t)},e.domain(n)}function tu(n,t){function e(){var e=0,u=t.length;for(i=[];++e<u;)i[e-1]=ua.quantile(n,e/u);return r}function r(n){return isNaN(n=+n)?0/0:t[ua.bisect(i,n)]}var i;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(ua.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return i},r.copy=function(){return tu(n,t)},e()}function eu(n,t,e){function r(t){return e[Math.max(0,Math.min(a,Math.floor(u*(t-n))))]}function i(){return u=e.length/(t-n),a=e.length-1,r}var u,a;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],i()):[n,t]},r.range=function(n){return arguments.length?(e=n,i()):e},r.copy=function(){return eu(n,t,e)},i()}function ru(n,t){function e(e){return t[ua.bisect(n,e)]}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.copy=function(){return ru(n,t)},e}function iu(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Xi(n,t)},t.tickFormat=function(t,e){return Zi(n,t,e)},t.copy=function(){return iu(n)},t}function uu(n){return n.innerRadius}function au(n){return n.outerRadius}function ou(n){return n.startAngle}function cu(n){return n.endAngle}function lu(n){for(var t,e,r,i=-1,u=n.length;++i<u;)t=n[i],e=t[0],r=t[1]+nc,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function fu(n){function t(t){function c(){d.push("M",o(n(v),s),f,l(n(m.reverse()),s),"Z")}for(var h,g,p,d=[],m=[],v=[],y=-1,M=t.length,x=lt(e),b=lt(i),_=e===r?function(){return g}:lt(r),w=i===u?function(){return p}:lt(u);++y<M;)a.call(this,h=t[y],y)?(m.push([g=+x.call(this,h,y),p=+b.call(this,h,y)]),v.push([+_.call(this,h,y),+w.call(this,h,y)])):m.length&&(c(),m=[],v=[]);return m.length&&c(),d.length?d.join(""):null}var e=je,r=je,i=0,u=Le,a=Ht,o=Fe,c=o.key,l=o,f="L",s=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(i=u=n,t):u},t.y0=function(n){return arguments.length?(i=n,t):i},t.y1=function(n){return arguments.length?(u=n,t):u},t.defined=function(n){return arguments.length?(a=n,t):a},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?o=n:(o=jo.get(n)||Fe).key,l=o.reverse||o,f=o.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(s=n,t):s},t}function su(n){return n.radius}function hu(n){return[n.x,n.y]}function gu(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+nc;return[e*Math.cos(r),e*Math.sin(r)]}}function pu(){return 64}function du(){return"circle"}function mu(n){var t=Math.sqrt(n/Da);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function vu(n,t){return va(n,ac),n.id=t,n}function yu(n,t,e,r){var i=n.id;return D(n,"function"==typeof e?function(n,u,a){n.__transition__[i].tween.set(t,r(e.call(n,n.__data__,u,a)))}:(e=r(e),function(n){n.__transition__[i].tween.set(t,e)}))}function Mu(n){return null==n&&(n=""),function(){this.textContent=n}}function xu(n,t,e,r){var u=n.__transition__||(n.__transition__={active:0,count:0}),a=u[e];if(!a){var o=r.time;return a=u[e]={tween:new i,event:ua.dispatch("start","end"),time:o,ease:r.ease,delay:r.delay,duration:r.duration},++u.count,ua.timer(function(r){function i(r){return u.active>e?l():(u.active=e,h.start.call(n,f,t),a.tween.forEach(function(e,r){(r=r.call(n,f,t))&&d.push(r)}),c(r)||ua.timer(c,0,o),1)}function c(r){if(u.active!==e)return l();for(var i=(r-g)/p,a=s(i),o=d.length;o>0;)d[--o].call(n,a);return i>=1?(l(),h.end.call(n,f,t),1):void 0}function l(){return--u.count?delete u[e]:delete n.__transition__,1}var f=n.__data__,s=a.ease,h=a.event,g=a.delay,p=a.duration,d=[];return r>=g?i(r):ua.timer(i,g,o),1},0,o),a}}function bu(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function _u(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function wu(n,t,e){if(r=[],e&&t.length>1){for(var r,i,u,a=Fi(n.domain()),o=-1,c=t.length,l=(t[1]-t[0])/++e;++o<c;)for(i=e;--i>0;)(u=+t[o]-i*l)>=a[0]&&r.push(u);for(--o,i=0;++i<e&&(u=+t[o]+i*l)<a[1];)r.push(u)}return r}function Su(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Eu(n,t,e){function r(t){var e=n(t),r=u(e,1);return r-t>t-e?e:r}function i(e){return t(e=n(new gc(e-1)),1),e}function u(n,e){return t(n=new gc(+n),e),n}function a(n,r,u){var a=i(n),o=[];if(u>1)for(;r>a;)e(a)%u||o.push(new Date(+a)),t(a,1);else for(;r>a;)o.push(new Date(+a)),t(a,1);return o}function o(n,t,e){try{gc=Su;var r=new Su;return r._=n,a(r,t,e)}finally{gc=Date}}n.floor=n,n.round=r,n.ceil=i,n.offset=u,n.range=a;var c=n.utc=ku(n);return c.floor=c,c.round=ku(r),c.ceil=ku(i),c.offset=ku(u),c.range=o,n}function ku(n){return function(t,e){try{gc=Su;var r=new Su;return r._=t,n(r,e)._}finally{gc=Date}}}function Au(n,t,e,r){for(var i,u,a=0,o=t.length,c=e.length;o>a;){if(r>=c)return-1;if(i=t.charCodeAt(a++),37===i){if(u=Cc[t.charAt(a++)],!u||(r=u(n,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function Nu(n){return RegExp("^(?:"+n.map(ua.requote).join("|")+")","i")}function qu(n){for(var t=new i,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function Tu(n,t,e){n+="";var r=n.length;return e>r?Array(e-r+1).join(t)+n:n}function Cu(n,t,e){Sc.lastIndex=0;var r=Sc.exec(t.substring(e));return r?e+=r[0].length:-1}function zu(n,t,e){wc.lastIndex=0;var r=wc.exec(t.substring(e));return r?e+=r[0].length:-1}function Du(n,t,e){Ac.lastIndex=0;var r=Ac.exec(t.substring(e));return r?(n.m=Nc.get(r[0].toLowerCase()),e+=r[0].length):-1}function ju(n,t,e){Ec.lastIndex=0;var r=Ec.exec(t.substring(e));return r?(n.m=kc.get(r[0].toLowerCase()),e+=r[0].length):-1}function Lu(n,t,e){return Au(n,""+Tc.c,t,e)}function Fu(n,t,e){return Au(n,""+Tc.x,t,e)}function Hu(n,t,e){return Au(n,""+Tc.X,t,e)}function Pu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+=r[0].length):-1}function Ru(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.y=Ou(+r[0]),e+=r[0].length):-1}function Ou(n){return n+(n>68?1900:2e3)}function Yu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+=r[0].length):-1}function Uu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+=r[0].length):-1}function Iu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+=r[0].length):-1}function Vu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+=r[0].length):-1}function Xu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+=r[0].length):-1}function Zu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+=r[0].length):-1}function Bu(n,t,e){var r=Dc.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}function $u(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(Math.abs(t)/60),i=Math.abs(t)%60;return e+Tu(r,"0",2)+Tu(i,"0",2)}function Ju(n){return n.toISOString()}function Gu(n,t,e){function r(t){return n(t)}return r.invert=function(t){return Ku(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(Ku)},r.nice=function(n){return r.domain(Ri(r.domain(),function(){return n}))},r.ticks=function(e,i){var u=Fi(r.domain());if("function"!=typeof e){var a=u[1]-u[0],o=a/e,c=ua.bisect(Lc,o);if(c==Lc.length)return t.year(u,e);if(!c)return n.ticks(e).map(Ku);Math.log(o/Lc[c-1])<Math.log(Lc[c]/o)&&--c,e=t[c],i=e[1],e=e[0].range}return e(u[0],new Date(+u[1]+1),i)},r.tickFormat=function(){return e},r.copy=function(){return Gu(n.copy(),t,e)},Ui(r,n)}function Ku(n){return new Date(n)}function Wu(n){return function(t){for(var e=n.length-1,r=n[e];!r[1](t);)r=n[--e];return r[0](t)}}function Qu(n){var t=new Date(n,0,1);return t.setFullYear(n),t}function na(n){var t=n.getFullYear(),e=Qu(t),r=Qu(t+1);return t+(n-e)/(r-e)}function ta(n){var t=new Date(Date.UTC(n,0,1));return t.setUTCFullYear(n),t}function ea(n){var t=n.getUTCFullYear(),e=ta(t),r=ta(t+1);return t+(n-e)/(r-e)}function ra(n){return JSON.parse(n.responseText)}function ia(n){var t=aa.createRange();return t.selectNode(aa.body),t.createContextualFragment(n.responseText)}var ua={version:"3.1.10"};Date.now||(Date.now=function(){return+new Date});var aa=document,oa=window;try{aa.createElement("div").style.setProperty("opacity",0,"")}catch(ca){var la=oa.CSSStyleDeclaration.prototype,fa=la.setProperty;la.setProperty=function(n,t,e){fa.call(this,n,t+"",e)}}ua.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},ua.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},ua.min=function(n,t){var e,r,i=-1,u=n.length;if(arguments.length===1){for(;++i<u&&((e=n[i])==null||e!=e);)e=void 0;for(;++i<u;)(r=n[i])!=null&&e>r&&(e=r)}else{for(;++i<u&&((e=t.call(n,n[i],i))==null||e!=e);)e=void 0;for(;++i<u;)(r=t.call(n,n[i],i))!=null&&e>r&&(e=r)}return e},ua.max=function(n,t){var e,r,i=-1,u=n.length;if(arguments.length===1){for(;++i<u&&((e=n[i])==null||e!=e);)e=void 0;for(;++i<u;)(r=n[i])!=null&&r>e&&(e=r)}else{for(;++i<u&&((e=t.call(n,n[i],i))==null||e!=e);)e=void 0;for(;++i<u;)(r=t.call(n,n[i],i))!=null&&r>e&&(e=r)}return e},ua.extent=function(n,t){var e,r,i,u=-1,a=n.length;if(arguments.length===1){for(;++u<a&&((e=i=n[u])==null||e!=e);)e=i=void 0;for(;++u<a;)(r=n[u])!=null&&(e>r&&(e=r),r>i&&(i=r))}else{for(;++u<a&&((e=i=t.call(n,n[u],u))==null||e!=e);)e=void 0;for(;++u<a;)(r=t.call(n,n[u],u))!=null&&(e>r&&(e=r),r>i&&(i=r))}return[e,i]},ua.sum=function(n,t){var e,r=0,i=n.length,u=-1;if(arguments.length===1)for(;++u<i;)isNaN(e=+n[u])||(r+=e);else for(;++u<i;)isNaN(e=+t.call(n,n[u],u))||(r+=e);return r},ua.mean=function(t,e){var r,i=t.length,u=0,a=-1,o=0;if(arguments.length===1)for(;++a<i;)n(r=t[a])&&(u+=(r-u)/++o);else for(;++a<i;)n(r=e.call(t,t[a],a))&&(u+=(r-u)/++o);return o?u:void 0},ua.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),i=+n[r-1],u=e-r;return u?i+u*(n[r]-i):i},ua.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?ua.quantile(t.sort(ua.ascending),.5):void 0},ua.bisector=function(n){return{left:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n.call(t,t[u],u)<e?r=u+1:i=u}return r},right:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;e<n.call(t,t[u],u)?i=u:r=u+1}return r}}};var sa=ua.bisector(function(n){return n});ua.bisectLeft=sa.left,ua.bisect=ua.bisectRight=sa.right,ua.shuffle=function(n){for(var t,e,r=n.length;r;)e=Math.random()*r--|0,t=n[r],n[r]=n[e],n[e]=t;return n},ua.permute=function(n,t){for(var e=[],r=-1,i=t.length;++r<i;)e[r]=n[t[r]];return e},ua.zip=function(){if(!(i=arguments.length))return[];for(var n=-1,e=ua.min(arguments,t),r=Array(e);++n<e;)for(var i,u=-1,a=r[n]=Array(i);++u<i;)a[u]=arguments[u][n];return r},ua.transpose=function(n){return ua.zip.apply(ua,n)},ua.keys=function(n){var t=[];for(var e in n)t.push(e);return t},ua.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},ua.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},ua.merge=function(n){return Array.prototype.concat.apply([],n)},ua.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw Error("infinite range");var i,u=[],a=e(Math.abs(r)),o=-1;if(n*=a,t*=a,r*=a,0>r)for(;(i=n+r*++o)>t;)u.push(i/a);else for(;(i=n+r*++o)<t;)u.push(i/a);return u},ua.map=function(n){var t=new i;for(var e in n)t.set(e,n[e]);return t},r(i,{has:function(n){return ha+n in this},get:function(n){return this[ha+n]},set:function(n,t){return this[ha+n]=t},remove:function(n){return n=ha+n,n in this&&delete this[n]},keys:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===ga&&n.call(this,t.substring(1),this[t])}});var ha="\0",ga=ha.charCodeAt(0);ua.nest=function(){function n(t,o,c){if(c>=a.length)return r?r.call(u,o):e?o.sort(e):o;for(var l,f,s,h,g=-1,p=o.length,d=a[c++],m=new i;++g<p;)(h=m.get(l=d(f=o[g])))?h.push(f):m.set(l,[f]);return t?(f=t(),s=function(e,r){f.set(e,n(t,r,c))}):(f={},s=function(e,r){f[e]=n(t,r,c)}),m.forEach(s),f}function t(n,e){if(e>=a.length)return n;var r=[],i=o[e++];return n.forEach(function(n,i){r.push({key:n,values:t(i,e)})}),i?r.sort(function(n,t){return i(n.key,t.key)}):r}var e,r,u={},a=[],o=[];return u.map=function(t,e){return n(e,t,0)},u.entries=function(e){return t(n(ua.map,e,0),0)},u.key=function(n){return a.push(n),u},u.sortKeys=function(n){return o[a.length-1]=n,u},u.sortValues=function(n){return e=n,u},u.rollup=function(n){return r=n,u},u},ua.set=function(n){var t=new u;if(n)for(var e=0;e<n.length;e++)t.add(n[e]);return t},r(u,{has:function(n){return ha+n in this
},add:function(n){return this[ha+n]=!0,n},remove:function(n){return n=ha+n,n in this&&delete this[n]},values:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===ga&&n.call(this,t.substring(1))}}),ua.behavior={},ua.rebind=function(n,t){for(var e,r=1,i=arguments.length;++r<i;)n[e=arguments[r]]=a(n,t,t[e]);return n},ua.dispatch=function(){for(var n=new o,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=c(n);return n},o.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(arguments.length===2){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},ua.event=null,ua.mouse=function(n){return g(n,f())};var pa=/WebKit/.test(oa.navigator.userAgent)?-1:0,da=d;try{da(aa.documentElement.childNodes)[0].nodeType}catch(ma){da=p}var va=[].__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]};ua.touches=function(n,t){return arguments.length<2&&(t=f().touches),t?da(t).map(function(t){var e=g(n,t);return e.identifier=t.identifier,e}):[]},ua.behavior.drag=function(){function n(){this.on("mousedown.drag",t).on("touchstart.drag",t)}function t(){function n(){var n=a.parentNode;return null!=f?ua.touches(n).filter(function(n){return n.identifier===f})[0]:ua.mouse(n)}function t(){if(!a.parentNode)return i();var t=n(),e=t[0]-h[0],r=t[1]-h[1];g|=e|r,h=t,l(),o({type:"drag",x:t[0]+u[0],y:t[1]+u[1],dx:e,dy:r})}function i(){o({type:"dragend"}),g&&(l(),ua.event.target===c&&s(p,"click")),p.on(null!=f?"touchmove.drag-"+f:"mousemove.drag",null).on(null!=f?"touchend.drag-"+f:"mouseup.drag",null)}var u,a=this,o=e.of(a,arguments),c=ua.event.target,f=ua.event.touches?ua.event.changedTouches[0].identifier:null,h=n(),g=0,p=ua.select(oa).on(null!=f?"touchmove.drag-"+f:"mousemove.drag",t).on(null!=f?"touchend.drag-"+f:"mouseup.drag",i,!0);r?(u=r.apply(a,arguments),u=[u.x-h[0],u.y-h[1]]):u=[0,0],null==f&&l(),o({type:"dragstart"})}var e=h(n,"drag","dragstart","dragend"),r=null;return n.origin=function(t){return arguments.length?(r=t,n):r},ua.rebind(n,e,"on")};var ya=function(n,t){return t.querySelector(n)},Ma=function(n,t){return t.querySelectorAll(n)},xa=aa.documentElement,ba=xa.matchesSelector||xa.webkitMatchesSelector||xa.mozMatchesSelector||xa.msMatchesSelector||xa.oMatchesSelector,_a=function(n,t){return ba.call(n,t)};"function"==typeof Sizzle&&(ya=function(n,t){return Sizzle(n,t)[0]||null},Ma=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},_a=Sizzle.matchesSelector),ua.selection=function(){return Na};var wa=ua.selection.prototype=[];wa.select=function(n){var t,e,r,i,u=[];"function"!=typeof n&&(n=v(n));for(var a=-1,o=this.length;++a<o;){u.push(t=[]),t.parentNode=(r=this[a]).parentNode;for(var c=-1,l=r.length;++c<l;)(i=r[c])?(t.push(e=n.call(i,i.__data__,c)),e&&"__data__"in i&&(e.__data__=i.__data__)):t.push(null)}return m(u)},wa.selectAll=function(n){var t,e,r=[];"function"!=typeof n&&(n=y(n));for(var i=-1,u=this.length;++i<u;)for(var a=this[i],o=-1,c=a.length;++o<c;)(e=a[o])&&(r.push(t=da(n.call(e,e.__data__,o))),t.parentNode=e);return m(r)};var Sa={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};ua.ns={prefix:Sa,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),Sa.hasOwnProperty(e)?{space:Sa[e],local:n}:n}},wa.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=ua.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(M(t,n[t]));return this}return this.each(M(n,t))},ua.requote=function(n){return n.replace(Ea,"\\$&")};var Ea=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;wa.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=n.trim().split(/^|\s+/g)).length,i=-1;if(t=e.classList){for(;++i<r;)if(!t.contains(n[i]))return!1}else for(t=e.getAttribute("class");++i<r;)if(!b(n[i]).test(t))return!1;return!0}for(t in n)this.each(_(t,n[t]));return this}return this.each(_(n,t))},wa.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(S(e,n[e],t));return this}if(2>r)return oa.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(S(n,t,e))},wa.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(E(t,n[t]));return this}return this.each(E(n,t))},wa.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},wa.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},wa.append=function(n){function t(){return this.appendChild(aa.createElementNS(this.namespaceURI,n))}function e(){return this.appendChild(aa.createElementNS(n.space,n.local))}return n=ua.ns.qualify(n),this.select(n.local?e:t)},wa.insert=function(n,t){function e(e,r){return this.insertBefore(aa.createElementNS(this.namespaceURI,n),t.call(this,e,r))}function r(e,r){return this.insertBefore(aa.createElementNS(n.space,n.local),t.call(this,e,r))}return n=ua.ns.qualify(n),"function"!=typeof t&&(t=v(t)),this.select(n.local?r:e)},wa.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},wa.data=function(n,t){function e(n,e){var r,u,a,o=n.length,s=e.length,h=Math.min(o,s),g=Array(s),p=Array(s),d=Array(o);if(t){var m,v=new i,y=new i,M=[];for(r=-1;++r<o;)m=t.call(u=n[r],u.__data__,r),v.has(m)?d[r]=u:v.set(m,u),M.push(m);for(r=-1;++r<s;)m=t.call(e,a=e[r],r),(u=v.get(m))?(g[r]=u,u.__data__=a):y.has(m)||(p[r]=k(a)),y.set(m,a),v.remove(m);for(r=-1;++r<o;)v.has(M[r])&&(d[r]=n[r])}else{for(r=-1;++r<h;)u=n[r],a=e[r],u?(u.__data__=a,g[r]=u):p[r]=k(a);for(;s>r;++r)p[r]=k(e[r]);for(;o>r;++r)d[r]=n[r]}p.update=g,p.parentNode=g.parentNode=d.parentNode=n.parentNode,c.push(p),l.push(g),f.push(d)}var r,u,a=-1,o=this.length;if(!arguments.length){for(n=Array(o=(r=this[0]).length);++a<o;)(u=r[a])&&(n[a]=u.__data__);return n}var c=j([]),l=m([]),f=m([]);if("function"==typeof n)for(;++a<o;)e(r=this[a],n.call(r,r.parentNode.__data__,a));else for(;++a<o;)e(r=this[a],n);return l.enter=function(){return c},l.exit=function(){return f},l},wa.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},wa.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=A(n));for(var u=0,a=this.length;a>u;u++){i.push(t=[]),t.parentNode=(e=this[u]).parentNode;for(var o=0,c=e.length;c>o;o++)(r=e[o])&&n.call(r,r.__data__,o)&&t.push(r)}return m(i)},wa.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],i=r.length-1,u=r[i];--i>=0;)(e=r[i])&&(u&&u!==e.nextSibling&&u.parentNode.insertBefore(e,u),u=e);return this},wa.sort=function(n){n=N.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},wa.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(T(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(T(n,t,e))};var ka=ua.map({mouseenter:"mouseover",mouseleave:"mouseout"});ka.forEach(function(n){"on"+n in aa&&ka.remove(n)}),wa.each=function(n){return D(this,function(t,e,r){n.call(t,t.__data__,e,r)})},wa.call=function(n){var t=da(arguments);return n.apply(t[0]=this,t),this},wa.empty=function(){return!this.node()},wa.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,i=e.length;i>r;r++){var u=e[r];if(u)return u}return null};var Aa=[];ua.selection.enter=j,ua.selection.enter.prototype=Aa,Aa.append=wa.append,Aa.insert=wa.insert,Aa.empty=wa.empty,Aa.node=wa.node,Aa.select=function(n){for(var t,e,r,i,u,a=[],o=-1,c=this.length;++o<c;){r=(i=this[o]).update,a.push(t=[]),t.parentNode=i.parentNode;for(var l=-1,f=i.length;++l<f;)(u=i[l])?(t.push(r[l]=e=n.call(i.parentNode,u.__data__,l)),e.__data__=u.__data__):t.push(null)}return m(a)},wa.transition=function(){var n,t,e=rc||++oc,r=[],i=Object.create(cc);i.time=Date.now();for(var u=-1,a=this.length;++u<a;){r.push(n=[]);for(var o=this[u],c=-1,l=o.length;++c<l;)(t=o[c])&&xu(t,c,e,i),n.push(t)}return vu(r,e)},ua.select=function(n){var t=["string"==typeof n?ya(n,aa):n];return t.parentNode=xa,m([t])},ua.selectAll=function(n){var t=da("string"==typeof n?Ma(n,aa):n);return t.parentNode=xa,m([t])};var Na=ua.select(xa);ua.behavior.zoom=function(){function n(){this.on("mousedown.zoom",o).on("mousemove.zoom",f).on(Ca+".zoom",c).on("dblclick.zoom",g).on("touchstart.zoom",p).on("touchmove.zoom",d).on("touchend.zoom",p)}function t(n){return[(n[0]-w[0])/S,(n[1]-w[1])/S]}function e(n){return[n[0]*S+w[0],n[1]*S+w[1]]}function r(n){S=Math.max(E[0],Math.min(E[1],n))}function i(n,t){t=e(t),w[0]+=n[0]-t[0],w[1]+=n[1]-t[1]}function u(){M&&M.domain(y.range().map(function(n){return(n-w[0])/S}).map(y.invert)),b&&b.domain(x.range().map(function(n){return(n-w[1])/S}).map(x.invert))}function a(n){u(),ua.event.preventDefault(),n({type:"zoom",scale:S,translate:w})}function o(){function n(){c=1,i(ua.mouse(r),h),a(u)}function e(){c&&l(),f.on("mousemove.zoom",null).on("mouseup.zoom",null),c&&ua.event.target===o&&s(f,"click.zoom")}var r=this,u=k.of(r,arguments),o=ua.event.target,c=0,f=ua.select(oa).on("mousemove.zoom",n).on("mouseup.zoom",e),h=t(ua.mouse(r));oa.focus(),l()}function c(){m||(m=t(ua.mouse(this))),r(Math.pow(2,qa()*.002)*S),i(ua.mouse(this),m),a(k.of(this,arguments))}function f(){m=null}function g(){var n=ua.mouse(this),e=t(n),u=Math.log(S)/Math.LN2;r(Math.pow(2,ua.event.shiftKey?Math.ceil(u)-1:Math.floor(u)+1)),i(n,e),a(k.of(this,arguments))}function p(){var n=ua.touches(this),e=Date.now();if(v=S,m={},n.forEach(function(n){m[n.identifier]=t(n)}),l(),n.length===1){if(500>e-_){var u=n[0],o=t(n[0]);r(2*S),i(u,o),a(k.of(this,arguments))}_=e}}function d(){var n=ua.touches(this),t=n[0],e=m[t.identifier];if(u=n[1]){var u,o=m[u.identifier];t=[(t[0]+u[0])/2,(t[1]+u[1])/2],e=[(e[0]+o[0])/2,(e[1]+o[1])/2],r(ua.event.scale*v)}i(t,e),_=null,a(k.of(this,arguments))}var m,v,y,M,x,b,_,w=[0,0],S=1,E=Ta,k=h(n,"zoom");return n.translate=function(t){return arguments.length?(w=t.map(Number),u(),n):w},n.scale=function(t){return arguments.length?(S=+t,u(),n):S},n.scaleExtent=function(t){return arguments.length?(E=null==t?Ta:t.map(Number),n):E},n.x=function(t){return arguments.length?(M=t,y=t.copy(),w=[0,0],S=1,n):M},n.y=function(t){return arguments.length?(b=t,x=t.copy(),w=[0,0],S=1,n):b},ua.rebind(n,k,"on")};var qa,Ta=[0,1/0],Ca="onwheel"in aa?(qa=function(){return-ua.event.deltaY*(ua.event.deltaMode?120:1)},"wheel"):"onmousewheel"in aa?(qa=function(){return ua.event.wheelDelta},"mousewheel"):(qa=function(){return-ua.event.detail},"MozMousePixelScroll");L.prototype.toString=function(){return this.rgb()+""},ua.hsl=function(n,t,e){return arguments.length===1?n instanceof H?F(n.h,n.s,n.l):it(""+n,ut,F):F(+n,+t,+e)};var za=H.prototype=new L;za.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),F(this.h,this.s,this.l/n)},za.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),F(this.h,this.s,n*this.l)},za.rgb=function(){return P(this.h,this.s,this.l)};var Da=Math.PI,ja=1e-6,La=Da/180,Fa=180/Da;ua.hcl=function(n,t,e){return arguments.length===1?n instanceof Z?X(n.h,n.c,n.l):n instanceof J?K(n.l,n.a,n.b):K((n=at((n=ua.rgb(n)).r,n.g,n.b)).l,n.a,n.b):X(+n,+t,+e)};var Ha=Z.prototype=new L;Ha.brighter=function(n){return X(this.h,this.c,Math.min(100,this.l+Pa*(arguments.length?n:1)))},Ha.darker=function(n){return X(this.h,this.c,Math.max(0,this.l-Pa*(arguments.length?n:1)))},Ha.rgb=function(){return B(this.h,this.c,this.l).rgb()},ua.lab=function(n,t,e){return arguments.length===1?n instanceof J?$(n.l,n.a,n.b):n instanceof Z?B(n.l,n.c,n.h):at((n=ua.rgb(n)).r,n.g,n.b):$(+n,+t,+e)};var Pa=18,Ra=.95047,Oa=1,Ya=1.08883,Ua=J.prototype=new L;Ua.brighter=function(n){return $(Math.min(100,this.l+Pa*(arguments.length?n:1)),this.a,this.b)},Ua.darker=function(n){return $(Math.max(0,this.l-Pa*(arguments.length?n:1)),this.a,this.b)},Ua.rgb=function(){return G(this.l,this.a,this.b)},ua.rgb=function(n,t,e){return arguments.length===1?n instanceof et?tt(n.r,n.g,n.b):it(""+n,tt,P):tt(~~n,~~t,~~e)};var Ia=et.prototype=new L;Ia.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,i=30;return t||e||r?(t&&i>t&&(t=i),e&&i>e&&(e=i),r&&i>r&&(r=i),tt(Math.min(255,Math.floor(t/n)),Math.min(255,Math.floor(e/n)),Math.min(255,Math.floor(r/n)))):tt(i,i,i)},Ia.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),tt(Math.floor(n*this.r),Math.floor(n*this.g),Math.floor(n*this.b))},Ia.hsl=function(){return ut(this.r,this.g,this.b)},Ia.toString=function(){return"#"+rt(this.r)+rt(this.g)+rt(this.b)};var Va=ua.map({aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"});Va.forEach(function(n,t){Va.set(n,it(t,tt,P))}),ua.functor=lt,ua.xhr=st(ft),ua.csv=pt(",","text/csv"),ua.tsv=pt("	","text/tab-separated-values");var Xa,Za,Ba,$a;ua.timer=function(n,t,e){if(arguments.length<3){if(arguments.length<2)t=0;else if(!isFinite(t))return;e=Date.now()}var r=e+t,i={callback:n,time:r,next:null};Za?Za.next=i:Xa=i,Za=i,Ba||($a=clearTimeout($a),Ba=1,Ja(dt))},ua.timer.flush=function(){mt(),vt()};var Ja=oa.requestAnimationFrame||oa.webkitRequestAnimationFrame||oa.mozRequestAnimationFrame||oa.oRequestAnimationFrame||oa.msRequestAnimationFrame||function(n){setTimeout(n,17)},Ga=".",Ka=",",Wa=[3,3],Qa=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"].map(yt);ua.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=ua.round(n,Mt(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,Math.floor((0>=e?e+1:e-1)/3)*3))),Qa[8+e/3]},ua.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)},ua.format=function(n){var t=no.exec(n),e=t[1]||" ",r=t[2]||">",i=t[3]||"",u=t[4]||"",a=t[5],o=+t[6],c=t[7],l=t[8],f=t[9],s=1,h="",g=!1;switch(l&&(l=+l.substring(1)),(a||"0"===e&&"="===r)&&(a=e="0",r="=",c&&(o-=Math.floor((o-1)/4))),f){case"n":c=!0,f="g";break;case"%":s=100,h="%",f="f";break;case"p":s=100,h="%",f="r";break;case"b":case"o":case"x":case"X":u&&(u="0"+f.toLowerCase());case"c":case"d":g=!0,l=0;break;case"s":s=-1,f="r"}"#"===u&&(u=""),"r"!=f||l||(f="g"),null!=l&&("g"==f?l=Math.max(1,Math.min(21,l)):("e"==f||"f"==f)&&(l=Math.max(0,Math.min(20,l)))),f=to.get(f)||xt;var p=a&&c;return function(n){if(g&&n%1)return"";var t=0>n||0===n&&0>1/n?(n=-n,"-"):i;if(0>s){var d=ua.formatPrefix(n,l);n=d.scale(n),h=d.symbol}else n*=s;n=f(n,l),!a&&c&&(n=eo(n));var m=u.length+n.length+(p?0:t.length),v=o>m?Array(m=o-m+1).join(e):"";return p&&(n=eo(v+n)),Ga&&n.replace(".",Ga),t+=u,("<"===r?t+n+v:">"===r?v+t+n:"^"===r?v.substring(0,m>>=1)+t+n+v.substring(m):t+(p?n:v+n))+h}};var no=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,to=ua.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=ua.round(n,Mt(n,t))).toFixed(Math.max(0,Math.min(20,Mt(n*(1+1e-15),t))))}}),eo=ft;if(Wa){var ro=Wa.length;eo=function(n){for(var t=n.lastIndexOf("."),e=t>=0?"."+n.substring(t+1):(t=n.length,""),r=[],i=0,u=Wa[0];t>0&&u>0;)r.push(n.substring(t-=u,t+u)),u=Wa[i=(i+1)%ro];return r.reverse().join(Ka||"")+e}}ua.geo={},ua.geo.stream=function(n,t){n&&io.hasOwnProperty(n.type)?io[n.type](n,t):bt(n,t)};var io={Feature:function(n,t){bt(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,i=e.length;++r<i;)bt(e[r].geometry,t)}},uo={Sphere:function(n,t){t.sphere()},Point:function(n,t){var e=n.coordinates;t.point(e[0],e[1])},MultiPoint:function(n,t){for(var e,r=n.coordinates,i=-1,u=r.length;++i<u;)e=r[i],t.point(e[0],e[1])},LineString:function(n,t){_t(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)_t(e[r],t,0)},Polygon:function(n,t){wt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)wt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,i=e.length;++r<i;)bt(e[r],t)}};ua.geo.area=function(n){return ao=0,ua.geo.stream(n,co),ao};var ao,oo,co={sphere:function(){ao+=4*Da},point:q,lineStart:q,lineEnd:q,polygonStart:function(){oo=0,co.lineStart=St},polygonEnd:function(){var n=2*oo;ao+=0>n?4*Da+n:n,co.lineStart=co.lineEnd=co.point=q}};ua.geo.bounds=function(){function n(n,t){M.push(x=[f=n,h=n]),s>t&&(s=t),t>g&&(g=t)}function t(t,e){var r=Et([t*La,e*La]);if(v){var i=At(v,r),u=[i[1],-i[0],0],a=At(u,i);Tt(a),a=Ct(a);var c=t-p,l=c>0?1:-1,d=a[0]*Fa*l,m=Math.abs(c)>180;if(m^(d>l*p&&l*t>d)){var y=a[1]*Fa;y>g&&(g=y)}else if(d=(d+360)%360-180,m^(d>l*p&&l*t>d)){var y=-a[1]*Fa;s>y&&(s=y)}else s>e&&(s=e),e>g&&(g=e);m?p>t?o(f,t)>o(f,h)&&(h=t):o(t,h)>o(f,h)&&(f=t):h>=f?(f>t&&(f=t),t>h&&(h=t)):t>p?o(f,t)>o(f,h)&&(h=t):o(t,h)>o(f,h)&&(f=t)}else n(t,e);v=r,p=t}function e(){b.point=t}function r(){x[0]=f,x[1]=h,b.point=n,v=null}function i(n,e){if(v){var r=n-p;y+=Math.abs(r)>180?r+(r>0?360:-360):r}else d=n,m=e;co.point(n,e),t(n,e)}function u(){co.lineStart()}function a(){i(d,m),co.lineEnd(),Math.abs(y)>ja&&(f=-(h=180)),x[0]=f,x[1]=h,v=null}function o(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function l(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var f,s,h,g,p,d,m,v,y,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=i,b.lineStart=u,b.lineEnd=a,y=0,co.polygonStart()},polygonEnd:function(){co.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>oo?(f=-(h=180),s=-(g=90)):y>ja?g=90:-ja>y&&(s=-90),x[0]=f,x[1]=h}};return function(n){g=h=-(f=s=1/0),M=[],ua.geo.stream(n,b),M.sort(c);for(var t,e=1,r=M.length,i=M[0],u=[i];r>e;++e)t=M[e],l(t[0],i)||l(t[1],i)?(o(i[0],t[1])>o(i[0],i[1])&&(i[1]=t[1]),o(t[0],i[1])>o(i[0],i[1])&&(i[0]=t[0])):u.push(i=t);for(var a,t,p=-1/0,r=u.length-1,e=0,i=u[r];r>=e;i=t,++e)t=u[e],(a=o(i[1],t[0]))>p&&(p=a,f=t[0],h=i[1]);return M=x=null,[[f,s],[h,g]]}}(),ua.geo.centroid=function(n){lo=fo=so=ho=go=0,ua.geo.stream(n,po);var t;return fo&&Math.abs(t=Math.sqrt(so*so+ho*ho+go*go))>ja?[Math.atan2(ho,so)*Fa,Math.asin(Math.max(-1,Math.min(1,go/t)))*Fa]:void 0};var lo,fo,so,ho,go,po={sphere:function(){2>lo&&(lo=2,fo=so=ho=go=0)},point:Dt,lineStart:Lt,lineEnd:Ft,polygonStart:function(){2>lo&&(lo=2,fo=so=ho=go=0),po.lineStart=jt},polygonEnd:function(){po.lineStart=Lt}},mo=Ot(Ht,Xt,Bt),vo=1e9;ua.geo.projection=Qt,ua.geo.projectionMutator=ne,(ua.geo.equirectangular=function(){return Qt(ee)}).raw=ee.invert=ee,ua.geo.rotation=function(n){function t(t){return t=n(t[0]*La,t[1]*La),t[0]*=Fa,t[1]*=Fa,t}return n=re(n[0]%360*La,n[1]*La,n.length>2?n[2]*La:0),t.invert=function(t){return t=n.invert(t[0]*La,t[1]*La),t[0]*=Fa,t[1]*=Fa,t},t},ua.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=re(-n[0]*La,-n[1]*La,0).invert,i=[];return e(null,null,1,{point:function(n,e){i.push(n=t(n,e)),n[0]*=Fa,n[1]*=Fa}}),{type:"Polygon",coordinates:[i]}}var t,e,r=[0,0],i=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=oe((t=+r)*La,i*La),n):t},n.precision=function(r){return arguments.length?(e=oe(t*La,(i=+r)*La),n):i},n.angle(90)},ua.geo.distance=function(n,t){var e,r=(t[0]-n[0])*La,i=n[1]*La,u=t[1]*La,a=Math.sin(r),o=Math.cos(r),c=Math.sin(i),l=Math.cos(i),f=Math.sin(u),s=Math.cos(u);return Math.atan2(Math.sqrt((e=s*a)*e+(e=l*f-c*s*o)*e),c*f+l*s*o)},ua.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return ua.range(Math.ceil(u/m)*m,i,m).map(h).concat(ua.range(Math.ceil(l/v)*v,c,v).map(g)).concat(ua.range(Math.ceil(r/p)*p,e,p).filter(function(n){return Math.abs(n%m)>ja}).map(f)).concat(ua.range(Math.ceil(o/d)*d,a,d).filter(function(n){return Math.abs(n%v)>ja}).map(s))}var e,r,i,u,a,o,c,l,f,s,h,g,p=10,d=p,m=90,v=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(u).concat(g(c).slice(1),h(i).reverse().slice(1),g(l).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(u=+t[0][0],i=+t[1][0],l=+t[0][1],c=+t[1][1],u>i&&(t=u,u=i,i=t),l>c&&(t=l,l=c,c=t),n.precision(y)):[[u,l],[i,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],o=+t[0][1],a=+t[1][1],r>e&&(t=r,r=e,e=t),o>a&&(t=o,o=a,a=t),n.precision(y)):[[r,o],[e,a]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(m=+t[0],v=+t[1],n):[m,v]},n.minorStep=function(t){return arguments.length?(p=+t[0],d=+t[1],n):[p,d]},n.precision=function(t){return arguments.length?(y=+t,f=le(o,a,90),s=fe(r,e,y),h=le(l,c,90),g=fe(u,i,y),n):y},n.majorExtent([[-180,-90+ja],[180,90-ja]]).minorExtent([[-180,-80-ja],[180,80+ja]])},ua.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||i.apply(this,arguments)]}}var t,e,r=se,i=he;return n.distance=function(){return ua.geo.distance(t||r.apply(this,arguments),e||i.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(i=t,e="function"==typeof t?null:t,n):i},n.precision=function(){return arguments.length?n:0},n},ua.geo.interpolate=function(n,t){return ge(n[0]*La,n[1]*La,t[0]*La,t[1]*La)},ua.geo.length=function(n){return yo=0,ua.geo.stream(n,Mo),yo};var yo,Mo={sphere:q,point:q,lineStart:pe,lineEnd:q,polygonStart:q,polygonEnd:q};(ua.geo.conicEqualArea=function(){return de(me)}).raw=me,ua.geo.albers=function(){return ua.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},ua.geo.albersUsa=function(){function n(n){var u=n[0],a=n[1];return t=null,e(u,a),t||(r(u,a),t)||i(u,a),t}var t,e,r,i,u=ua.geo.albers(),a=ua.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),o=ua.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=u.scale(),e=u.translate(),r=(n[0]-e[0])/t,i=(n[1]-e[1])/t;return(i>=.12&&.234>i&&r>=-.425&&-.214>r?a:i>=.166&&.234>i&&r>=-.214&&-.115>r?o:u).invert(n)},n.stream=function(n){var t=u.stream(n),e=a.stream(n),r=o.stream(n);return{point:function(n,i){t.point(n,i),e.point(n,i),r.point(n,i)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(u.precision(t),a.precision(t),o.precision(t),n):u.precision()},n.scale=function(t){return arguments.length?(u.scale(t),a.scale(.35*t),o.scale(t),n.translate(u.translate())):u.scale()},n.translate=function(t){if(!arguments.length)return u.translate();var l=u.scale(),f=+t[0],s=+t[1];return e=u.translate(t).clipExtent([[f-.455*l,s-.238*l],[f+.455*l,s+.238*l]]).stream(c).point,r=a.translate([f-.307*l,s+.201*l]).clipExtent([[f-.425*l+ja,s+.12*l+ja],[f-.214*l-ja,s+.234*l-ja]]).stream(c).point,i=o.translate([f-.205*l,s+.212*l]).clipExtent([[f-.214*l+ja,s+.166*l+ja],[f-.115*l-ja,s+.234*l-ja]]).stream(c).point,n},n.scale(1070)};var xo,bo,_o,wo,So,Eo,ko={point:q,lineStart:q,lineEnd:q,polygonStart:function(){bo=0,ko.lineStart=ve},polygonEnd:function(){ko.lineStart=ko.lineEnd=ko.point=q,xo+=Math.abs(bo/2)}},Ao={point:ye,lineStart:q,lineEnd:q,polygonStart:q,polygonEnd:q},No={point:be,lineStart:_e,lineEnd:we,polygonStart:function(){No.lineStart=Se},polygonEnd:function(){No.point=be,No.lineStart=_e,No.lineEnd=we}};ua.geo.path=function(){function n(n){return n&&ua.geo.stream(n,r(i.pointRadius("function"==typeof u?+u.apply(this,arguments):u))),i.result()}var t,e,r,i,u=4.5;return n.area=function(n){return xo=0,ua.geo.stream(n,r(ko)),xo},n.centroid=function(n){return lo=so=ho=go=0,ua.geo.stream(n,r(No)),go?[so/go,ho/go]:void 0},n.bounds=function(n){return So=Eo=-(_o=wo=1/0),ua.geo.stream(n,r(Ao)),[[_o,wo],[So,Eo]]},n.projection=function(e){return arguments.length?(r=(t=e)?e.stream||ke(e):ft,n):t},n.context=function(t){return arguments.length?(i=(e=t)==null?new Me:new Ee(t),n):e},n.pointRadius=function(t){return arguments.length?(u="function"==typeof t?t:+t,n):u},n.projection(ua.geo.albersUsa()).context(null)};var qo=Ae(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(ua.geo.azimuthalEqualArea=function(){return Qt(qo)}).raw=qo;var To=Ae(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},ft);(ua.geo.azimuthalEquidistant=function(){return Qt(To)}).raw=To,(ua.geo.conicConformal=function(){return de(Ne)}).raw=Ne,(ua.geo.conicEquidistant=function(){return de(qe)}).raw=qe;var Co=Ae(function(n){return 1/n},Math.atan);(ua.geo.gnomonic=function(){return Qt(Co)}).raw=Co,Te.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Da/2]},(ua.geo.mercator=function(){return Ce(Te)}).raw=Te;var zo=Ae(function(){return 1},Math.asin);(ua.geo.orthographic=function(){return Qt(zo)}).raw=zo;var Do=Ae(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(ua.geo.stereographic=function(){return Qt(Do)}).raw=Do,ze.invert=function(n,t){return[Math.atan2(U(n),Math.cos(t)),Y(Math.sin(t)/I(n))]},(ua.geo.transverseMercator=function(){return Ce(ze)}).raw=ze,ua.geom={},ua.svg={},ua.svg.line=function(){return De(ft)};var jo=ua.map({linear:Fe,"linear-closed":He,"step-before":Pe,"step-after":Re,basis:Xe,"basis-open":Ze,"basis-closed":Be,bundle:$e,cardinal:Ue,"cardinal-open":Oe,"cardinal-closed":Ye,monotone:nr});jo.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var Lo=[0,2/3,1/3,0],Fo=[0,1/3,2/3,0],Ho=[0,1/6,2/3,1/6];ua.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,i,u,a,o,c,l,f,s,h,g,p,d=lt(e),m=lt(r),v=n.length,y=v-1,M=[],x=[],b=0;if(d===je&&r===Le)t=n;else for(u=0,t=[];v>u;++u)t.push([+d.call(this,i=n[u],u),+m.call(this,i,u)]);for(u=1;v>u;++u)(t[u][1]<t[b][1]||t[u][1]==t[b][1]&&t[u][0]<t[b][0])&&(b=u);for(u=0;v>u;++u)u!==b&&(c=t[u][1]-t[b][1],o=t[u][0]-t[b][0],M.push({angle:Math.atan2(c,o),index:u}));for(M.sort(function(n,t){return n.angle-t.angle}),g=M[0].angle,h=M[0].index,s=0,u=1;y>u;++u){if(a=M[u].index,g==M[u].angle){if(o=t[h][0]-t[b][0],c=t[h][1]-t[b][1],l=t[a][0]-t[b][0],f=t[a][1]-t[b][1],o*o+c*c>=l*l+f*f){M[u].index=-1;continue}M[s].index=-1}g=M[u].angle,s=u,h=a}for(x.push(b),u=0,a=0;2>u;++a)M[a].index>-1&&(x.push(M[a].index),u++);for(p=x.length;y>a;++a)if(!(M[a].index<0)){for(;!tr(x[p-2],x[p-1],M[a].index,t);)--p;x[p++]=M[a].index}var _=[];for(u=p-1;u>=0;--u)_.push(n[x[u]]);return _}var e=je,r=Le;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},ua.geom.polygon=function(n){return n.area=function(){for(var t=0,e=n.length,r=n[e-1][1]*n[0][0]-n[e-1][0]*n[0][1];++t<e;)r+=n[t-1][1]*n[t][0]-n[t-1][0]*n[t][1];return.5*r},n.centroid=function(t){var e,r,i=-1,u=n.length,a=0,o=0,c=n[u-1];for(arguments.length||(t=-1/(6*n.area()));++i<u;)e=c,c=n[i],r=e[0]*c[1]-c[0]*e[1],a+=(e[0]+c[0])*r,o+=(e[1]+c[1])*r;return[a*t,o*t]},n.clip=function(t){for(var e,r,i,u,a,o,c=-1,l=n.length,f=n[l-1];++c<l;){for(e=t.slice(),t.length=0,u=n[c],a=e[(i=e.length)-1],r=-1;++r<i;)o=e[r],er(o,f,u)?(er(a,f,u)||t.push(rr(a,o,f,u)),t.push(o)):er(a,f,u)&&t.push(rr(a,o,f,u)),a=o;f=u}return t},n},ua.geom.delaunay=function(n){var t=n.map(function(){return[]}),e=[];return ir(n,function(e){t[e.region.l.index].push(n[e.region.r.index])}),t.forEach(function(t,r){var i=n[r],u=i[0],a=i[1];t.forEach(function(n){n.angle=Math.atan2(n[0]-u,n[1]-a)}),t.sort(function(n,t){return n.angle-t.angle});for(var o=0,c=t.length-1;c>o;o++)e.push([i,t[o],t[o+1]])}),e},ua.geom.voronoi=function(n){function t(n){var t,r,a,o=n.map(function(){return[]}),c=lt(i),l=lt(u),f=n.length,s=1e6;if(c===je&&l===Le)t=n;else for(t=[],a=0;f>a;++a)t.push([+c.call(this,r=n[a],a),+l.call(this,r,a)]);if(ir(t,function(n){var t,e,r,i,u,a;n.a===1&&n.b>=0?(t=n.ep.r,e=n.ep.l):(t=n.ep.l,e=n.ep.r),n.a===1?(u=t?t.y:-s,r=n.c-n.b*u,a=e?e.y:s,i=n.c-n.b*a):(r=t?t.x:-s,u=n.c-n.a*r,i=e?e.x:s,a=n.c-n.a*i);var c=[r,u],l=[i,a];o[n.region.l.index].push(c,l),o[n.region.r.index].push(c,l)}),o=o.map(function(n,e){var r=t[e][0],i=t[e][1],u=n.map(function(n){return Math.atan2(n[0]-r,n[1]-i)
}),a=ua.range(n.length).sort(function(n,t){return u[n]-u[t]});return a.filter(function(n,t){return!t||u[n]-u[a[t-1]]>ja}).map(function(t){return n[t]})}),o.forEach(function(n,e){var r=n.length;if(!r)return n.push([-s,-s],[-s,s],[s,s],[s,-s]);if(!(r>2)){var i=t[e],u=n[0],a=n[1],o=i[0],c=i[1],l=u[0],f=u[1],h=a[0],g=a[1],p=Math.abs(h-l),d=g-f;if(Math.abs(d)<ja){var m=f>c?-s:s;n.push([-s,m],[s,m])}else if(ja>p){var v=l>o?-s:s;n.push([v,-s],[v,s])}else{var m=(l-o)*(g-f)>(h-l)*(f-c)?s:-s,y=Math.abs(d)-p;Math.abs(y)<ja?n.push([0>d?m:-m,m]):(y>0&&(m*=-1),n.push([-s,m],[s,m]))}}}),e)for(a=0;f>a;++a)e(o[a]);for(a=0;f>a;++a)o[a].point=n[a];return o}var e,r=null,i=je,u=Le;return arguments.length?t(n):(t.x=function(n){return arguments.length?(i=n,t):i},t.y=function(n){return arguments.length?(u=n,t):u},t.size=function(n){return arguments.length?(null==n?e=null:(r=[+n[0],+n[1]],e=ua.geom.polygon([[0,0],[0,r[1]],r,[r[0],0]]).clip),t):r},t.links=function(n){var t,e,r,a=n.map(function(){return[]}),o=[],c=lt(i),l=lt(u),f=n.length;if(c===je&&l===Le)t=n;else for(r=0;f>r;++r)t.push([+c.call(this,e=n[r],r),+l.call(this,e,r)]);return ir(t,function(t){var e=t.region.l.index,r=t.region.r.index;a[e][r]||(a[e][r]=a[r][e]=!0,o.push({source:n[e],target:n[r]}))}),o},t.triangles=function(n){if(i===je&&u===Le)return ua.geom.delaunay(n);var t,e,r,a,o,c=lt(i),l=lt(u);for(a=0,t=[],o=n.length;o>a;++a)e=[+c.call(this,r=n[a],a),+l.call(this,r,a)],e.data=r,t.push(e);return ua.geom.delaunay(t).map(function(n){return n.map(function(n){return n.data})})},t)};var Po={l:"r",r:"l"};ua.geom.quadtree=function(n,t,e,r,i){function u(n){function u(n,t,e,r,i,u,a,o){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,f=n.y;if(null!=c)if(Math.abs(c-e)+Math.abs(f-r)<.01)l(n,t,e,r,i,u,a,o);else{var s=n.point;n.x=n.y=n.point=null,l(n,s,c,f,i,u,a,o),l(n,t,e,r,i,u,a,o)}else n.x=e,n.y=r,n.point=t}else l(n,t,e,r,i,u,a,o)}function l(n,t,e,r,i,a,o,c){var l=.5*(i+o),f=.5*(a+c),s=e>=l,h=r>=f,g=(h<<1)+s;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=or()),s?i=l:o=l,h?a=f:c=f,u(n,t,e,r,i,a,o,c)}var f,s,h,g,p,d,m,v,y,M=lt(o),x=lt(c);if(null!=t)d=t,m=e,v=r,y=i;else if(v=y=-(d=m=1/0),s=[],h=[],p=n.length,a)for(g=0;p>g;++g)f=n[g],f.x<d&&(d=f.x),f.y<m&&(m=f.y),f.x>v&&(v=f.x),f.y>y&&(y=f.y),s.push(f.x),h.push(f.y);else for(g=0;p>g;++g){var b=+M(f=n[g],g),_=+x(f,g);d>b&&(d=b),m>_&&(m=_),b>v&&(v=b),_>y&&(y=_),s.push(b),h.push(_)}var w=v-d,S=y-m;w>S?y=m+w:v=d+S;var E=or();if(E.add=function(n){u(E,n,+M(n,++g),+x(n,g),d,m,v,y)},E.visit=function(n){cr(n,E,d,m,v,y)},g=-1,null==t){for(;++g<p;)u(E,n[g],s[g],h[g],d,m,v,y);--g}else n.forEach(E.add);return s=h=n=f=null,E}var a,o=je,c=Le;return(a=arguments.length)?(o=ur,c=ar,3===a&&(i=e,r=t,e=t=0),u(n)):(u.x=function(n){return arguments.length?(o=n,u):o},u.y=function(n){return arguments.length?(c=n,u):c},u.size=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=e=0,r=+n[0],i=+n[1]),u):null==t?null:[r,i]},u)},ua.interpolateRgb=lr,ua.transform=function(n){var t=aa.createElementNS(ua.ns.prefix.svg,"g");return(ua.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new fr(e?e.matrix:Ro)})(n)},fr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var Ro={a:1,b:0,c:0,d:1,e:0,f:0};ua.interpolateNumber=pr,ua.interpolateTransform=dr,ua.interpolateObject=mr,ua.interpolateString=vr;var Oo=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;ua.interpolate=yr,ua.interpolators=[function(n,t){var e=typeof t;return("string"===e?Va.has(t)||/^(#|rgb\(|hsl\()/.test(t)?lr:vr:t instanceof L?lr:"object"===e?Array.isArray(t)?xr:mr:pr)(n,t)}],ua.interpolateArray=xr;var Yo=function(){return ft},Uo=ua.map({linear:Yo,poly:Ar,quad:function(){return Sr},cubic:function(){return Er},sin:function(){return Nr},exp:function(){return qr},circle:function(){return Tr},elastic:Cr,back:zr,bounce:function(){return Dr}}),Io=ua.map({"in":ft,out:_r,"in-out":wr,"out-in":function(n){return wr(_r(n))}});ua.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=Uo.get(e)||Yo,r=Io.get(r)||ft,br(r(e.apply(null,Array.prototype.slice.call(arguments,1))))},ua.interpolateHcl=jr,ua.interpolateHsl=Lr,ua.interpolateLab=Fr,ua.interpolateRound=Hr,ua.layout={},ua.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Or(n[e]));return t}},ua.layout.chord=function(){function n(){var n,l,s,h,g,p={},d=[],m=ua.range(u),v=[];for(e=[],r=[],n=0,h=-1;++h<u;){for(l=0,g=-1;++g<u;)l+=i[h][g];d.push(l),v.push(ua.range(u)),n+=l}for(a&&m.sort(function(n,t){return a(d[n],d[t])}),o&&v.forEach(function(n,t){n.sort(function(n,e){return o(i[t][n],i[t][e])})}),n=(2*Da-f*u)/n,l=0,h=-1;++h<u;){for(s=l,g=-1;++g<u;){var y=m[h],M=v[y][g],x=i[y][M],b=l,_=l+=x*n;p[y+"-"+M]={index:y,subindex:M,startAngle:b,endAngle:_,value:x}}r[y]={index:y,startAngle:s,endAngle:l,value:(l-s)/n},l+=f}for(h=-1;++h<u;)for(g=h-1;++g<u;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,i,u,a,o,c,l={},f=0;return l.matrix=function(n){return arguments.length?(u=(i=n)&&i.length,e=r=null,l):i},l.padding=function(n){return arguments.length?(f=n,e=r=null,l):f},l.sortGroups=function(n){return arguments.length?(a=n,e=r=null,l):a},l.sortSubgroups=function(n){return arguments.length?(o=n,e=null,l):o},l.sortChords=function(n){return arguments.length?(c=n,e&&t(),l):c},l.chords=function(){return e||n(),e},l.groups=function(){return r||n(),r},l},ua.layout.force=function(){function n(n){return function(t,e,r,i){if(t.point!==n){var u=t.cx-n.x,a=t.cy-n.y,o=1/Math.sqrt(u*u+a*a);if(d>(i-e)*o){var c=t.charge*o*o;return n.px-=u*c,n.py-=a*c,!0}if(t.point&&isFinite(o)){var c=t.pointCharge*o*o;n.px-=u*c,n.py-=a*c}}return!t.charge}}function t(n){n.px=ua.event.x,n.py=ua.event.y,o.resume()}var e,r,i,u,a,o={},c=ua.dispatch("start","tick","end"),l=[1,1],f=.9,s=Vo,h=Xo,g=-30,p=.1,d=.8,m=[],v=[];return o.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,o,s,h,d,y,M,x,b=m.length,_=v.length;for(e=0;_>e;++e)o=v[e],s=o.source,h=o.target,M=h.x-s.x,x=h.y-s.y,(d=M*M+x*x)&&(d=r*u[e]*((d=Math.sqrt(d))-i[e])/d,M*=d,x*=d,h.x-=M*(y=s.weight/(h.weight+s.weight)),h.y-=x*y,s.x+=M*(y=1-y),s.y+=x*y);if((y=r*p)&&(M=l[0]/2,x=l[1]/2,e=-1,y))for(;++e<b;)o=m[e],o.x+=(M-o.x)*y,o.y+=(x-o.y)*y;if(g)for(Br(t=ua.geom.quadtree(m),r,a),e=-1;++e<b;)(o=m[e]).fixed||t.visit(n(o));for(e=-1;++e<b;)o=m[e],o.fixed?(o.x=o.px,o.y=o.py):(o.x-=(o.px-(o.px=o.x))*f,o.y-=(o.py-(o.py=o.y))*f);c.tick({type:"tick",alpha:r})},o.nodes=function(n){return arguments.length?(m=n,o):m},o.links=function(n){return arguments.length?(v=n,o):v},o.size=function(n){return arguments.length?(l=n,o):l},o.linkDistance=function(n){return arguments.length?(s="function"==typeof n?n:+n,o):s},o.distance=o.linkDistance,o.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,o):h},o.friction=function(n){return arguments.length?(f=+n,o):f},o.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,o):g},o.gravity=function(n){return arguments.length?(p=+n,o):p},o.theta=function(n){return arguments.length?(d=+n,o):d},o.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),ua.timer(o.tick)),o):r},o.start=function(){function n(n,r){for(var i,u=t(e),a=-1,o=u.length;++a<o;)if(!isNaN(i=u[a][n]))return i;return Math.random()*r}function t(){if(!c){for(c=[],r=0;p>r;++r)c[r]=[];for(r=0;d>r;++r){var n=v[r];c[n.source.index].push(n.target),c[n.target.index].push(n.source)}}return c[e]}var e,r,c,f,p=m.length,d=v.length,y=l[0],M=l[1];for(e=0;p>e;++e)(f=m[e]).index=e,f.weight=0;for(e=0;d>e;++e)f=v[e],typeof f.source=="number"&&(f.source=m[f.source]),typeof f.target=="number"&&(f.target=m[f.target]),++f.source.weight,++f.target.weight;for(e=0;p>e;++e)f=m[e],isNaN(f.x)&&(f.x=n("x",y)),isNaN(f.y)&&(f.y=n("y",M)),isNaN(f.px)&&(f.px=f.x),isNaN(f.py)&&(f.py=f.y);if(i=[],"function"==typeof s)for(e=0;d>e;++e)i[e]=+s.call(this,v[e],e);else for(e=0;d>e;++e)i[e]=s;if(u=[],"function"==typeof h)for(e=0;d>e;++e)u[e]=+h.call(this,v[e],e);else for(e=0;d>e;++e)u[e]=h;if(a=[],"function"==typeof g)for(e=0;p>e;++e)a[e]=+g.call(this,m[e],e);else for(e=0;p>e;++e)a[e]=g;return o.resume()},o.resume=function(){return o.alpha(.1)},o.stop=function(){return o.alpha(0)},o.drag=function(){return e||(e=ua.behavior.drag().origin(ft).on("dragstart.force",Ir).on("drag.force",t).on("dragend.force",Vr)),arguments.length?(this.on("mouseover.force",Xr).on("mouseout.force",Zr).call(e),void 0):e},ua.rebind(o,c,"on")};var Vo=20,Xo=1;ua.layout.hierarchy=function(){function n(t,a,o){var c=i.call(e,t,a);if(t.depth=a,o.push(t),c&&(l=c.length)){for(var l,f,s=-1,h=t.children=[],g=0,p=a+1;++s<l;)f=n(c[s],p,o),f.parent=t,h.push(f),g+=f.value;r&&h.sort(r),u&&(t.value=g)}else u&&(t.value=+u.call(e,t,a)||0);return t}function t(n,r){var i=n.children,a=0;if(i&&(o=i.length))for(var o,c=-1,l=r+1;++c<o;)a+=t(i[c],l);else u&&(a=+u.call(e,n,r)||0);return u&&(n.value=a),a}function e(t){var e=[];return n(t,0,e),e}var r=Kr,i=Jr,u=Gr;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(i=n,e):i},e.value=function(n){return arguments.length?(u=n,e):u},e.revalue=function(n){return t(n,0),n},e},ua.layout.partition=function(){function n(t,e,r,i){var u=t.children;if(t.x=e,t.y=t.depth*i,t.dx=r,t.dy=i,u&&(a=u.length)){var a,o,c,l=-1;for(r=t.value?r/t.value:0;++l<a;)n(o=u[l],e,c=o.value*r,i),e+=c}}function t(n){var e=n.children,r=0;if(e&&(i=e.length))for(var i,u=-1;++u<i;)r=Math.max(r,t(e[u]));return 1+r}function e(e,u){var a=r.call(this,e,u);return n(a[0],0,i[0],i[1]/t(a[0])),a}var r=ua.layout.hierarchy(),i=[1,1];return e.size=function(n){return arguments.length?(i=n,e):i},$r(e,r)},ua.layout.pie=function(){function n(u){var a=u.map(function(e,r){return+t.call(n,e,r)}),o=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof i?i.apply(this,arguments):i)-o)/ua.sum(a),l=ua.range(u.length);null!=e&&l.sort(e===Zo?function(n,t){return a[t]-a[n]}:function(n,t){return e(u[n],u[t])});var f=[];return l.forEach(function(n){var t;f[n]={data:u[n],value:t=a[n],startAngle:o,endAngle:o+=t*c}}),f}var t=Number,e=Zo,r=0,i=2*Da;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(i=t,n):i},n};var Zo={};ua.layout.stack=function(){function n(o,c){var l=o.map(function(e,r){return t.call(n,e,r)}),f=l.map(function(t){return t.map(function(t,e){return[u.call(n,t,e),a.call(n,t,e)]})}),s=e.call(n,f,c);l=ua.permute(l,s),f=ua.permute(f,s);var h,g,p,d=r.call(n,f,c),m=l.length,v=l[0].length;for(g=0;v>g;++g)for(i.call(n,l[0][g],p=d[g],f[0][g][1]),h=1;m>h;++h)i.call(n,l[h][g],p+=f[h-1][g][1],f[h][g][1]);return o}var t=ft,e=ei,r=ri,i=ti,u=Qr,a=ni;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:Bo.get(t)||ei,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:$o.get(t)||ri,n):r},n.x=function(t){return arguments.length?(u=t,n):u},n.y=function(t){return arguments.length?(a=t,n):a},n.out=function(t){return arguments.length?(i=t,n):i},n};var Bo=ua.map({"inside-out":function(n){var t,e,r=n.length,i=n.map(ii),u=n.map(ui),a=ua.range(r).sort(function(n,t){return i[n]-i[t]}),o=0,c=0,l=[],f=[];for(t=0;r>t;++t)e=a[t],c>o?(o+=u[e],l.push(e)):(c+=u[e],f.push(e));return f.reverse().concat(l)},reverse:function(n){return ua.range(n.length).reverse()},"default":ei}),$o=ua.map({silhouette:function(n){var t,e,r,i=n.length,u=n[0].length,a=[],o=0,c=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];r>o&&(o=r),a.push(r)}for(e=0;u>e;++e)c[e]=(o-a[e])/2;return c},wiggle:function(n){var t,e,r,i,u,a,o,c,l,f=n.length,s=n[0],h=s.length,g=[];for(g[0]=c=l=0,e=1;h>e;++e){for(t=0,i=0;f>t;++t)i+=n[t][e][1];for(t=0,u=0,o=s[e][0]-s[e-1][0];f>t;++t){for(r=0,a=(n[t][e][1]-n[t][e-1][1])/(2*o);t>r;++r)a+=(n[r][e][1]-n[r][e-1][1])/o;u+=a*n[t][e][1]}g[e]=c-=i?u/i*o:0,l>c&&(l=c)}for(e=0;h>e;++e)g[e]-=l;return g},expand:function(n){var t,e,r,i=n.length,u=n[0].length,a=1/i,o=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];if(r)for(t=0;i>t;t++)n[t][e][1]/=r;else for(t=0;i>t;t++)n[t][e][1]=a}for(e=0;u>e;++e)o[e]=0;return o},zero:ri});ua.layout.histogram=function(){function n(n,u){for(var a,o,c=[],l=n.map(e,this),f=r.call(this,l,u),s=i.call(this,f,l,u),u=-1,h=l.length,g=s.length-1,p=t?1:1/h;++u<g;)a=c[u]=[],a.dx=s[u+1]-(a.x=s[u]),a.y=0;if(g>0)for(u=-1;++u<h;)o=l[u],o>=f[0]&&o<=f[1]&&(a=c[ua.bisect(s,o,1,g)-1],a.y+=p,a.push(n[u]));return c}var t=!0,e=Number,r=li,i=oi;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=lt(t),n):r},n.bins=function(t){return arguments.length?(i="number"==typeof t?function(n){return ci(n,t)}:lt(t),n):i},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},ua.layout.tree=function(){function n(n,i){function u(n,t){var r=n.children,i=n._tree;if(r&&(a=r.length)){for(var a,c,l,f=r[0],s=f,h=-1;++h<a;)l=r[h],u(l,c),s=o(l,c,s),c=l;yi(n);var g=.5*(f._tree.prelim+l._tree.prelim);t?(i.prelim=t._tree.prelim+e(n,t),i.mod=i.prelim-g):i.prelim=g}else t&&(i.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,i=-1;for(t+=n._tree.mod;++i<r;)a(e[i],t)}}function o(n,t,r){if(t){for(var i,u=n,a=n,o=t,c=n.parent.children[0],l=u._tree.mod,f=a._tree.mod,s=o._tree.mod,h=c._tree.mod;o=hi(o),u=si(u),o&&u;)c=si(c),a=hi(a),a._tree.ancestor=n,i=o._tree.prelim+s-u._tree.prelim-l+e(o,u),i>0&&(Mi(xi(o,n,r),n,i),l+=i,f+=i),s+=o._tree.mod,l+=u._tree.mod,h+=c._tree.mod,f+=a._tree.mod;o&&!hi(a)&&(a._tree.thread=o,a._tree.mod+=s-f),u&&!si(c)&&(c._tree.thread=u,c._tree.mod+=l-h,r=n)}return r}var c=t.call(this,n,i),l=c[0];vi(l,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),u(l),a(l,-l._tree.prelim);var f=gi(l,di),s=gi(l,pi),h=gi(l,mi),g=f.x-e(f,s)/2,p=s.x+e(s,f)/2,d=h.depth||1;return vi(l,function(n){n.x=(n.x-g)/(p-g)*r[0],n.y=n.depth/d*r[1],delete n._tree}),c}var t=ua.layout.hierarchy().sort(null).value(null),e=fi,r=[1,1];return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(r=t,n):r},$r(n,t)},ua.layout.pack=function(){function n(n,i){var u=t.call(this,n,i),a=u[0];a.x=0,a.y=0,vi(a,function(n){n.r=Math.sqrt(n.value)}),vi(a,Ei);var o=r[0],c=r[1],l=Math.max(2*a.r/o,2*a.r/c);if(e>0){var f=e*l/2;vi(a,function(n){n.r+=f}),vi(a,Ei),vi(a,function(n){n.r-=f}),l=Math.max(2*a.r/o,2*a.r/c)}return Ni(a,o/2,c/2,1/l),u}var t=ua.layout.hierarchy().sort(bi),e=0,r=[1,1];return n.size=function(t){return arguments.length?(r=t,n):r},n.padding=function(t){return arguments.length?(e=+t,n):e},$r(n,t)},ua.layout.cluster=function(){function n(n,i){var u,a=t.call(this,n,i),o=a[0],c=0;vi(o,function(n){var t=n.children;t&&t.length?(n.x=Ci(t),n.y=Ti(t)):(n.x=u?c+=e(n,u):0,n.y=0,u=n)});var l=zi(o),f=Di(o),s=l.x-e(l,f)/2,h=f.x+e(f,l)/2;return vi(o,function(n){n.x=(n.x-s)/(h-s)*r[0],n.y=(1-(o.y?n.y/o.y:1))*r[1]}),a}var t=ua.layout.hierarchy().sort(null).value(null),e=fi,r=[1,1];return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(r=t,n):r},$r(n,t)},ua.layout.treemap=function(){function n(n,t){for(var e,r,i=-1,u=n.length;++i<u;)r=(e=n[i]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var u=e.children;if(u&&u.length){var a,o,c,l=s(e),f=[],h=u.slice(),p=1/0,d="slice"===g?l.dx:"dice"===g?l.dy:"slice-dice"===g?e.depth&1?l.dy:l.dx:Math.min(l.dx,l.dy);for(n(h,l.dx*l.dy/e.value),f.area=0;(c=h.length)>0;)f.push(a=h[c-1]),f.area+=a.area,"squarify"!==g||(o=r(f,d))<=p?(h.pop(),p=o):(f.area-=f.pop().area,i(f,d,l,!1),d=Math.min(l.dx,l.dy),f.length=f.area=0,p=1/0);f.length&&(i(f,d,l,!0),f.length=f.area=0),u.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var u,a=s(t),o=r.slice(),c=[];for(n(o,a.dx*a.dy/t.value),c.area=0;u=o.pop();)c.push(u),c.area+=u.area,u.z!=null&&(i(c,u.z?a.dx:a.dy,a,!o.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,i=0,u=1/0,a=-1,o=n.length;++a<o;)(e=n[a].area)&&(u>e&&(u=e),e>i&&(i=e));return r*=r,t*=t,r?Math.max(t*i*p/r,r/(t*u*p)):1/0}function i(n,t,e,r){var i,u=-1,a=n.length,o=e.x,l=e.y,f=t?c(n.area/t):0;if(t==e.dx){for((r||f>e.dy)&&(f=e.dy);++u<a;)i=n[u],i.x=o,i.y=l,i.dy=f,o+=i.dx=Math.min(e.x+e.dx-o,f?c(i.area/f):0);i.z=!0,i.dx+=e.x+e.dx-o,e.y+=f,e.dy-=f}else{for((r||f>e.dx)&&(f=e.dx);++u<a;)i=n[u],i.x=o,i.y=l,i.dx=f,l+=i.dy=Math.min(e.y+e.dy-l,f?c(i.area/f):0);i.z=!1,i.dy+=e.y+e.dy-l,e.x+=f,e.dx-=f}}function u(r){var i=a||o(r),u=i[0];return u.x=0,u.y=0,u.dx=l[0],u.dy=l[1],a&&o.revalue(u),n([u],u.dx*u.dy/u.value),(a?e:t)(u),h&&(a=i),i}var a,o=ua.layout.hierarchy(),c=Math.round,l=[1,1],f=null,s=ji,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return u.size=function(n){return arguments.length?(l=n,u):l},u.padding=function(n){function t(t){var e=n.call(u,t,t.depth);return null==e?ji(t):Li(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Li(t,n)}if(!arguments.length)return f;var r;return s=(f=n)==null?ji:(r=typeof n)=="function"?t:"number"===r?(n=[n,n,n,n],e):e,u},u.round=function(n){return arguments.length?(c=n?Math.round:Number,u):c!=Number},u.sticky=function(n){return arguments.length?(h=n,a=null,u):h},u.ratio=function(n){return arguments.length?(p=n,u):p},u.mode=function(n){return arguments.length?(g=n+"",u):g},$r(u,o)},ua.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,i;do e=Math.random()*2-1,r=Math.random()*2-1,i=e*e+r*r;while(!i||i>1);return n+t*e*Math.sqrt(-2*Math.log(i)/i)}},logNormal:function(){var n=ua.random.normal.apply(ua,arguments);return function(){return Math.exp(n())}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t/n}}},ua.scale={},ua.scale.linear=function(){return Yi([0,1],[0,1],yr,!1)},ua.scale.log=function(){return Bi(ua.scale.linear().domain([0,Math.LN10]),10,$i,Ji,[1,10])};var Jo=ua.format(".0e");ua.scale.pow=function(){return Wi(ua.scale.linear(),1,[0,1])},ua.scale.sqrt=function(){return ua.scale.pow().exponent(.5)},ua.scale.ordinal=function(){return nu([],{t:"range",a:[[]]})},ua.scale.category10=function(){return ua.scale.ordinal().range(Go)},ua.scale.category20=function(){return ua.scale.ordinal().range(Ko)},ua.scale.category20b=function(){return ua.scale.ordinal().range(Wo)},ua.scale.category20c=function(){return ua.scale.ordinal().range(Qo)};var Go=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],Ko=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],Wo=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"],Qo=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];ua.scale.quantile=function(){return tu([],[])},ua.scale.quantize=function(){return eu(0,1,[0,1])},ua.scale.threshold=function(){return ru([.5],[0,1])},ua.scale.identity=function(){return iu([0,1])},ua.svg.arc=function(){function n(){var n=t.apply(this,arguments),u=e.apply(this,arguments),a=r.apply(this,arguments)+nc,o=i.apply(this,arguments)+nc,c=(a>o&&(c=a,a=o,o=c),o-a),l=Da>c?"0":"1",f=Math.cos(a),s=Math.sin(a),h=Math.cos(o),g=Math.sin(o);return c>=tc?n?"M0,"+u+"A"+u+","+u+" 0 1,1 0,"+-u+"A"+u+","+u+" 0 1,1 0,"+u+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+u+"A"+u+","+u+" 0 1,1 0,"+-u+"A"+u+","+u+" 0 1,1 0,"+u+"Z":n?"M"+u*f+","+u*s+"A"+u+","+u+" 0 "+l+",1 "+u*h+","+u*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+l+",0 "+n*f+","+n*s+"Z":"M"+u*f+","+u*s+"A"+u+","+u+" 0 "+l+",1 "+u*h+","+u*g+"L0,0"+"Z"}var t=uu,e=au,r=ou,i=cu;return n.innerRadius=function(e){return arguments.length?(t=lt(e),n):t},n.outerRadius=function(t){return arguments.length?(e=lt(t),n):e},n.startAngle=function(t){return arguments.length?(r=lt(t),n):r},n.endAngle=function(t){return arguments.length?(i=lt(t),n):i},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,u=(r.apply(this,arguments)+i.apply(this,arguments))/2+nc;return[Math.cos(u)*n,Math.sin(u)*n]},n};var nc=-Da/2,tc=2*Da-1e-6;ua.svg.line.radial=function(){var n=De(lu);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},Pe.reverse=Re,Re.reverse=Pe,ua.svg.area=function(){return fu(ft)},ua.svg.area.radial=function(){var n=fu(lu);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},ua.svg.chord=function(){function n(n,o){var c=t(this,u,n,o),l=t(this,a,n,o);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,l)?i(c.r,c.p1,c.r,c.p0):i(c.r,c.p1,l.r,l.p0)+r(l.r,l.p1,l.a1-l.a0)+i(l.r,l.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var i=t.call(n,e,r),u=o.call(n,i,r),a=c.call(n,i,r)+nc,f=l.call(n,i,r)+nc;return{r:u,a0:a,a1:f,p0:[u*Math.cos(a),u*Math.sin(a)],p1:[u*Math.cos(f),u*Math.sin(f)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Da)+",1 "+t}function i(n,t,e,r){return"Q 0,0 "+r}var u=se,a=he,o=su,c=ou,l=cu;return n.radius=function(t){return arguments.length?(o=lt(t),n):o},n.source=function(t){return arguments.length?(u=lt(t),n):u},n.target=function(t){return arguments.length?(a=lt(t),n):a},n.startAngle=function(t){return arguments.length?(c=lt(t),n):c},n.endAngle=function(t){return arguments.length?(l=lt(t),n):l},n},ua.svg.diagonal=function(){function n(n,i){var u=t.call(this,n,i),a=e.call(this,n,i),o=(u.y+a.y)/2,c=[u,{x:u.x,y:o},{x:a.x,y:o},a];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=se,e=he,r=hu;return n.source=function(e){return arguments.length?(t=lt(e),n):t},n.target=function(t){return arguments.length?(e=lt(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},ua.svg.diagonal.radial=function(){var n=ua.svg.diagonal(),t=hu,e=n.projection;return n.projection=function(n){return arguments.length?e(gu(t=n)):t},n},ua.svg.symbol=function(){function n(n,r){return(ec.get(t.call(this,n,r))||mu)(e.call(this,n,r))}var t=du,e=pu;return n.type=function(e){return arguments.length?(t=lt(e),n):t},n.size=function(t){return arguments.length?(e=lt(t),n):e},n};var ec=ua.map({circle:mu,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*uc)),e=t*uc;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/ic),e=t*ic/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/ic),e=t*ic/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});ua.svg.symbolTypes=ec.keys();var rc,ic=Math.sqrt(3),uc=Math.tan(30*La),ac=[],oc=0,cc={ease:kr,delay:0,duration:250};ac.call=wa.call,ac.empty=wa.empty,ac.node=wa.node,ua.transition=function(n){return arguments.length?rc?n.transition():n:Na.transition()},ua.transition.prototype=ac,ac.select=function(n){var t,e,r,i=this.id,u=[];"function"!=typeof n&&(n=v(n));for(var a=-1,o=this.length;++a<o;){u.push(t=[]);for(var c=this[a],l=-1,f=c.length;++l<f;)(r=c[l])&&(e=n.call(r,r.__data__,l))?("__data__"in r&&(e.__data__=r.__data__),xu(e,l,i,r.__transition__[i]),t.push(e)):t.push(null)}return vu(u,i)},ac.selectAll=function(n){var t,e,r,i,u,a=this.id,o=[];"function"!=typeof n&&(n=y(n));for(var c=-1,l=this.length;++c<l;)for(var f=this[c],s=-1,h=f.length;++s<h;)if(r=f[s]){u=r.__transition__[a],e=n.call(r,r.__data__,s),o.push(t=[]);for(var g=-1,p=e.length;++g<p;)xu(i=e[g],g,a,u),t.push(i)}return vu(o,a)},ac.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=A(n));for(var u=0,a=this.length;a>u;u++){i.push(t=[]);for(var e=this[u],o=0,c=e.length;c>o;o++)(r=e[o])&&n.call(r,r.__data__,o)&&t.push(r)}return vu(i,this.id,this.time).ease(this.ease())},ac.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):D(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},ac.attr=function(n,t){function e(){this.removeAttribute(o)}function r(){this.removeAttributeNS(o.space,o.local)}function i(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(o);return e!==n&&(t=a(e,n),function(n){this.setAttribute(o,t(n))})})}function u(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(o.space,o.local);return e!==n&&(t=a(e,n),function(n){this.setAttributeNS(o.space,o.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var a=Mr(n),o=ua.ns.qualify(n);return yu(this,"attr."+n,t,o.local?u:i)},ac.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(i));return r&&function(n){this.setAttribute(i,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(i.space,i.local));return r&&function(n){this.setAttributeNS(i.space,i.local,r(n))}}var i=ua.ns.qualify(n);return this.tween("attr."+n,i.local?r:e)},ac.style=function(n,t,e){function r(){this.style.removeProperty(n)}function i(t){return null==t?r:(t+="",function(){var r,i=oa.getComputedStyle(this,null).getPropertyValue(n);return i!==t&&(r=a(i,t),function(t){this.style.setProperty(n,r(t),e)})})}var u=arguments.length;if(3>u){if("string"!=typeof n){2>u&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}var a=Mr(n);return yu(this,"style."+n,t,i)},ac.styleTween=function(n,t,e){function r(r,i){var u=t.call(this,r,i,oa.getComputedStyle(this,null).getPropertyValue(n));return u&&function(t){this.style.setProperty(n,u(t),e)}}return arguments.length<3&&(e=""),this.tween("style."+n,r)},ac.text=function(n){return yu(this,"text",n,Mu)},ac.remove=function(){return this.each("end.transition",function(){var n;!this.__transition__&&(n=this.parentNode)&&n.removeChild(this)})},ac.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=ua.ease.apply(ua,arguments)),D(this,function(e){e.__transition__[t].ease=n}))},ac.delay=function(n){var t=this.id;return D(this,"function"==typeof n?function(e,r,i){e.__transition__[t].delay=n.call(e,e.__data__,r,i)|0}:(n|=0,function(e){e.__transition__[t].delay=n}))},ac.duration=function(n){var t=this.id;return D(this,"function"==typeof n?function(e,r,i){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,i)|0)}:(n=Math.max(1,0|n),function(e){e.__transition__[t].duration=n}))},ac.each=function(n,t){var e=this.id;if(arguments.length<2){var r=cc,i=rc;rc=e,D(this,function(t,r,i){cc=t.__transition__[e],n.call(t,t.__data__,r,i)}),cc=r,rc=i}else D(this,function(r){r.__transition__[e].event.on(n,t)});return this},ac.transition=function(){for(var n,t,e,r,i=this.id,u=++oc,a=[],o=0,c=this.length;c>o;o++){a.push(n=[]);for(var t=this[o],l=0,f=t.length;f>l;l++)(e=t[l])&&(r=Object.create(e.__transition__[i]),r.delay+=r.duration,xu(e,l,u,r)),n.push(e)}return vu(a,u)},ua.svg.axis=function(){function n(n){n.each(function(){var n,s=ua.select(this),h=null==l?e.ticks?e.ticks.apply(e,c):e.domain():l,g=null==t?e.tickFormat?e.tickFormat.apply(e,c):String:t,p=wu(e,h,f),d=s.selectAll(".tick.minor").data(p,String),m=d.enter().insert("line",".tick").attr("class","tick minor").style("opacity",1e-6),v=ua.transition(d.exit()).style("opacity",1e-6).remove(),y=ua.transition(d).style("opacity",1),M=s.selectAll(".tick.major").data(h,String),x=M.enter().insert("g","path").attr("class","tick major").style("opacity",1e-6),b=ua.transition(M.exit()).style("opacity",1e-6).remove(),_=ua.transition(M).style("opacity",1),w=Hi(e),S=s.selectAll(".domain").data([0]),E=(S.enter().append("path").attr("class","domain"),ua.transition(S)),k=e.copy(),A=this.__chart__||k;this.__chart__=k,x.append("line"),x.append("text");var N=x.select("line"),q=_.select("line"),T=M.select("text").text(g),C=x.select("text"),z=_.select("text");switch(r){case"bottom":n=bu,m.attr("y2",u),y.attr("x2",0).attr("y2",u),N.attr("y2",i),C.attr("y",Math.max(i,0)+o),q.attr("x2",0).attr("y2",i),z.attr("x",0).attr("y",Math.max(i,0)+o),T.attr("dy",".71em").style("text-anchor","middle"),E.attr("d","M"+w[0]+","+a+"V0H"+w[1]+"V"+a);break;case"top":n=bu,m.attr("y2",-u),y.attr("x2",0).attr("y2",-u),N.attr("y2",-i),C.attr("y",-(Math.max(i,0)+o)),q.attr("x2",0).attr("y2",-i),z.attr("x",0).attr("y",-(Math.max(i,0)+o)),T.attr("dy","0em").style("text-anchor","middle"),E.attr("d","M"+w[0]+","+-a+"V0H"+w[1]+"V"+-a);break;case"left":n=_u,m.attr("x2",-u),y.attr("x2",-u).attr("y2",0),N.attr("x2",-i),C.attr("x",-(Math.max(i,0)+o)),q.attr("x2",-i).attr("y2",0),z.attr("x",-(Math.max(i,0)+o)).attr("y",0),T.attr("dy",".32em").style("text-anchor","end"),E.attr("d","M"+-a+","+w[0]+"H0V"+w[1]+"H"+-a);break;case"right":n=_u,m.attr("x2",u),y.attr("x2",u).attr("y2",0),N.attr("x2",i),C.attr("x",Math.max(i,0)+o),q.attr("x2",i).attr("y2",0),z.attr("x",Math.max(i,0)+o).attr("y",0),T.attr("dy",".32em").style("text-anchor","start"),E.attr("d","M"+a+","+w[0]+"H0V"+w[1]+"H"+a)}if(e.ticks)x.call(n,A),_.call(n,k),b.call(n,k),m.call(n,A),y.call(n,k),v.call(n,k);else{var D=k.rangeBand()/2,j=function(n){return k(n)+D};x.call(n,j),_.call(n,j)}})}var t,e=ua.scale.linear(),r=lc,i=6,u=6,a=6,o=3,c=[10],l=null,f=0;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in fc?t+"":lc,n):r},n.ticks=function(){return arguments.length?(c=arguments,n):c},n.tickValues=function(t){return arguments.length?(l=t,n):l},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t,e){if(!arguments.length)return i;var r=arguments.length-1;return i=+t,u=r>1?+e:i,a=r>0?+arguments[r]:i,n},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(t){return arguments.length?(f=+t,n):f},n};var lc="bottom",fc={top:1,right:1,bottom:1,left:1};ua.svg.brush=function(){function n(u){u.each(function(){var u,a=ua.select(this),l=a.selectAll(".background").data([0]),s=a.selectAll(".extent").data([0]),h=a.selectAll(".resize").data(f,String);a.style("pointer-events","all").on("mousedown.brush",i).on("touchstart.brush",i),l.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),s.enter().append("rect").attr("class","extent").style("cursor","move"),h.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return sc[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),h.style("display",n.empty()?"none":null),h.exit().remove(),o&&(u=Hi(o),l.attr("x",u[0]).attr("width",u[1]-u[0]),e(a)),c&&(u=Hi(c),l.attr("y",u[0]).attr("height",u[1]-u[0]),r(a)),t(a)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)][0]+","+s[+/^s/.test(n)][1]+")"})}function e(n){n.select(".extent").attr("x",s[0][0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1][0]-s[0][0])}function r(n){n.select(".extent").attr("y",s[0][1]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",s[1][1]-s[0][1])}function i(){function i(){var n=ua.event.changedTouches;
return n?ua.touches(y,n)[0]:ua.mouse(y)}function f(){ua.event.keyCode==32&&(E||(m=null,k[0]-=s[1][0],k[1]-=s[1][1],E=2),l())}function h(){ua.event.keyCode==32&&2==E&&(k[0]+=s[1][0],k[1]+=s[1][1],E=0,l())}function g(){var n=i(),u=!1;v&&(n[0]+=v[0],n[1]+=v[1]),E||(ua.event.altKey?(m||(m=[(s[0][0]+s[1][0])/2,(s[0][1]+s[1][1])/2]),k[0]=s[+(n[0]<m[0])][0],k[1]=s[+(n[1]<m[1])][1]):m=null),w&&p(n,o,0)&&(e(b),u=!0),S&&p(n,c,1)&&(r(b),u=!0),u&&(t(b),x({type:"brush",mode:E?"move":"resize"}))}function p(n,t,e){var r,i,a=Hi(t),o=a[0],c=a[1],l=k[e],f=s[1][e]-s[0][e];return E&&(o-=l,c-=f+l),r=Math.max(o,Math.min(c,n[e])),E?i=(r+=l)+f:(m&&(l=Math.max(o,Math.min(c,2*m[e]-r))),r>l?(i=r,r=l):i=l),s[0][e]!==r||s[1][e]!==i?(u=null,s[0][e]=r,s[1][e]=i,!0):void 0}function d(){g(),b.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),ua.select("body").style("cursor",null),A.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),x({type:"brushend"}),l()}var m,v,y=this,M=ua.select(ua.event.target),x=a.of(y,arguments),b=ua.select(y),_=M.datum(),w=!/^(n|s)$/.test(_)&&o,S=!/^(e|w)$/.test(_)&&c,E=M.classed("extent"),k=i(),A=ua.select(oa).on("mousemove.brush",g).on("mouseup.brush",d).on("touchmove.brush",g).on("touchend.brush",d).on("keydown.brush",f).on("keyup.brush",h);if(E)k[0]=s[0][0]-k[0],k[1]=s[0][1]-k[1];else if(_){var N=+/w$/.test(_),q=+/^n/.test(_);v=[s[1-N][0]-k[0],s[1-q][1]-k[1]],k[0]=s[N][0],k[1]=s[q][1]}else ua.event.altKey&&(m=k.slice());b.style("pointer-events","none").selectAll(".resize").style("display",null),ua.select("body").style("cursor",M.style("cursor")),x({type:"brushstart"}),g(),l()}var u,a=h(n,"brushstart","brush","brushend"),o=null,c=null,f=hc[0],s=[[0,0],[0,0]];return n.x=function(t){return arguments.length?(o=t,f=hc[!o<<1|!c],n):o},n.y=function(t){return arguments.length?(c=t,f=hc[!o<<1|!c],n):c},n.extent=function(t){var e,r,i,a,l;return arguments.length?(u=[[0,0],[0,0]],o&&(e=t[0],r=t[1],c&&(e=e[0],r=r[0]),u[0][0]=e,u[1][0]=r,o.invert&&(e=o(e),r=o(r)),e>r&&(l=e,e=r,r=l),s[0][0]=0|e,s[1][0]=0|r),c&&(i=t[0],a=t[1],o&&(i=i[1],a=a[1]),u[0][1]=i,u[1][1]=a,c.invert&&(i=c(i),a=c(a)),i>a&&(l=i,i=a,a=l),s[0][1]=0|i,s[1][1]=0|a),n):(t=u||s,o&&(e=t[0][0],r=t[1][0],u||(e=s[0][0],r=s[1][0],o.invert&&(e=o.invert(e),r=o.invert(r)),e>r&&(l=e,e=r,r=l))),c&&(i=t[0][1],a=t[1][1],u||(i=s[0][1],a=s[1][1],c.invert&&(i=c.invert(i),a=c.invert(a)),i>a&&(l=i,i=a,a=l))),o&&c?[[e,i],[r,a]]:o?[e,r]:c&&[i,a])},n.clear=function(){return u=null,s[0][0]=s[0][1]=s[1][0]=s[1][1]=0,n},n.empty=function(){return o&&s[0][0]===s[1][0]||c&&s[0][1]===s[1][1]},ua.rebind(n,a,"on")};var sc={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},hc=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]];ua.time={};var gc=Date,pc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Su.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){dc.setUTCDate.apply(this._,arguments)},setDay:function(){dc.setUTCDay.apply(this._,arguments)},setFullYear:function(){dc.setUTCFullYear.apply(this._,arguments)},setHours:function(){dc.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){dc.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){dc.setUTCMinutes.apply(this._,arguments)},setMonth:function(){dc.setUTCMonth.apply(this._,arguments)},setSeconds:function(){dc.setUTCSeconds.apply(this._,arguments)},setTime:function(){dc.setTime.apply(this._,arguments)}};var dc=Date.prototype,mc="%a %b %e %X %Y",vc="%m/%d/%Y",yc="%H:%M:%S",Mc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],xc=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],bc=["January","February","March","April","May","June","July","August","September","October","November","December"],_c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];ua.time.year=Eu(function(n){return n=ua.time.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),ua.time.years=ua.time.year.range,ua.time.years.utc=ua.time.year.utc.range,ua.time.day=Eu(function(n){var t=new gc(1970,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),ua.time.days=ua.time.day.range,ua.time.days.utc=ua.time.day.utc.range,ua.time.dayOfYear=function(n){var t=ua.time.year(n);return Math.floor((n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*6e4)/864e5)},pc.forEach(function(n,t){n=n.toLowerCase(),t=7-t;var e=ua.time[n]=Eu(function(n){return(n=ua.time.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+Math.floor(t)*7)},function(n){var e=ua.time.year(n).getDay();return Math.floor((ua.time.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});ua.time[n+"s"]=e.range,ua.time[n+"s"].utc=e.utc.range,ua.time[n+"OfYear"]=function(n){var e=ua.time.year(n).getDay();return Math.floor((ua.time.dayOfYear(n)+(e+t)%7)/7)}}),ua.time.week=ua.time.sunday,ua.time.weeks=ua.time.sunday.range,ua.time.weeks.utc=ua.time.sunday.utc.range,ua.time.weekOfYear=ua.time.sundayOfYear,ua.time.format=function(n){function t(t){for(var r,i,u,a=[],o=-1,c=0;++o<e;)n.charCodeAt(o)===37&&(a.push(n.substring(c,o)),(i=qc[r=n.charAt(++o)])!=null&&(r=n.charAt(++o)),(u=Tc[r])&&(r=u(t,null==i?"e"===r?" ":"0":i)),a.push(r),c=o+1);return a.push(n.substring(c,o)),a.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0},r=Au(e,n,t,0);if(r!=t.length)return null;"p"in e&&(e.H=e.H%12+e.p*12);var i=new gc;return i.setFullYear(e.y,e.m,e.d),i.setHours(e.H,e.M,e.S,e.L),i},t.toString=function(){return n},t};var wc=Nu(Mc),Sc=Nu(xc),Ec=Nu(bc),kc=qu(bc),Ac=Nu(_c),Nc=qu(_c),qc={"-":"",_:" ",0:"0"},Tc={a:function(n){return xc[n.getDay()]},A:function(n){return Mc[n.getDay()]},b:function(n){return _c[n.getMonth()]},B:function(n){return bc[n.getMonth()]},c:ua.time.format(mc),d:function(n,t){return Tu(n.getDate(),t,2)},e:function(n,t){return Tu(n.getDate(),t,2)},H:function(n,t){return Tu(n.getHours(),t,2)},I:function(n,t){return Tu(n.getHours()%12||12,t,2)},j:function(n,t){return Tu(1+ua.time.dayOfYear(n),t,3)},L:function(n,t){return Tu(n.getMilliseconds(),t,3)},m:function(n,t){return Tu(n.getMonth()+1,t,2)},M:function(n,t){return Tu(n.getMinutes(),t,2)},p:function(n){return n.getHours()>=12?"PM":"AM"},S:function(n,t){return Tu(n.getSeconds(),t,2)},U:function(n,t){return Tu(ua.time.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Tu(ua.time.mondayOfYear(n),t,2)},x:ua.time.format(vc),X:ua.time.format(yc),y:function(n,t){return Tu(n.getFullYear()%100,t,2)},Y:function(n,t){return Tu(n.getFullYear()%1e4,t,4)},Z:$u,"%":function(){return"%"}},Cc={a:Cu,A:zu,b:Du,B:ju,c:Lu,d:Uu,e:Uu,H:Iu,I:Iu,L:Zu,m:Yu,M:Vu,p:Bu,S:Xu,x:Fu,X:Hu,y:Ru,Y:Pu},zc=/^\s*\d+/,Dc=ua.map({am:0,pm:1});ua.time.format.utc=function(n){function t(n){try{gc=Su;var t=new gc;return t._=n,e(t)}finally{gc=Date}}var e=ua.time.format(n);return t.parse=function(n){try{gc=Su;var t=e.parse(n);return t&&t._}finally{gc=Date}},t.toString=e.toString,t};var jc=ua.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");ua.time.format.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Ju:jc,Ju.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},Ju.toString=jc.toString,ua.time.second=Eu(function(n){return new gc(Math.floor(n/1e3)*1e3)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*1e3)},function(n){return n.getSeconds()}),ua.time.seconds=ua.time.second.range,ua.time.seconds.utc=ua.time.second.utc.range,ua.time.minute=Eu(function(n){return new gc(Math.floor(n/6e4)*6e4)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*6e4)},function(n){return n.getMinutes()}),ua.time.minutes=ua.time.minute.range,ua.time.minutes.utc=ua.time.minute.utc.range,ua.time.hour=Eu(function(n){var t=n.getTimezoneOffset()/60;return new gc((Math.floor(n/36e5-t)+t)*36e5)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*36e5)},function(n){return n.getHours()}),ua.time.hours=ua.time.hour.range,ua.time.hours.utc=ua.time.hour.utc.range,ua.time.month=Eu(function(n){return n=ua.time.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),ua.time.months=ua.time.month.range,ua.time.months.utc=ua.time.month.utc.range;var Lc=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Fc=[[ua.time.second,1],[ua.time.second,5],[ua.time.second,15],[ua.time.second,30],[ua.time.minute,1],[ua.time.minute,5],[ua.time.minute,15],[ua.time.minute,30],[ua.time.hour,1],[ua.time.hour,3],[ua.time.hour,6],[ua.time.hour,12],[ua.time.day,1],[ua.time.day,2],[ua.time.week,1],[ua.time.month,1],[ua.time.month,3],[ua.time.year,1]],Hc=[[ua.time.format("%Y"),Ht],[ua.time.format("%B"),function(n){return n.getMonth()}],[ua.time.format("%b %d"),function(n){return n.getDate()!=1}],[ua.time.format("%a %d"),function(n){return n.getDay()&&n.getDate()!=1}],[ua.time.format("%I %p"),function(n){return n.getHours()}],[ua.time.format("%I:%M"),function(n){return n.getMinutes()}],[ua.time.format(":%S"),function(n){return n.getSeconds()}],[ua.time.format(".%L"),function(n){return n.getMilliseconds()}]],Pc=ua.scale.linear(),Rc=Wu(Hc);Fc.year=function(n,t){return Pc.domain(n.map(na)).ticks(t).map(Qu)},ua.time.scale=function(){return Gu(ua.scale.linear(),Fc,Rc)};var Oc=Fc.map(function(n){return[n[0].utc,n[1]]}),Yc=[[ua.time.format.utc("%Y"),Ht],[ua.time.format.utc("%B"),function(n){return n.getUTCMonth()}],[ua.time.format.utc("%b %d"),function(n){return n.getUTCDate()!=1}],[ua.time.format.utc("%a %d"),function(n){return n.getUTCDay()&&n.getUTCDate()!=1}],[ua.time.format.utc("%I %p"),function(n){return n.getUTCHours()}],[ua.time.format.utc("%I:%M"),function(n){return n.getUTCMinutes()}],[ua.time.format.utc(":%S"),function(n){return n.getUTCSeconds()}],[ua.time.format.utc(".%L"),function(n){return n.getUTCMilliseconds()}]],Uc=Wu(Yc);return Oc.year=function(n,t){return Pc.domain(n.map(ea)).ticks(t).map(ta)},ua.time.scale.utc=function(){return Gu(ua.scale.linear(),Oc,Uc)},ua.text=st(function(n){return n.responseText}),ua.json=function(n,t){return ht(n,"application/json",ra,t)},ua.html=function(n,t){return ht(n,"text/html",ia,t)},ua.xml=st(function(n){return n.responseXML}),ua}();
/*! Tiny Pub/Sub - v0.7.0 - 2013-01-29
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
(function(n){var u=n({});n.subscribe=function(){u.on.apply(u,arguments)},n.unsubscribe=function(){u.off.apply(u,arguments)},n.publish=function(){u.trigger.apply(u,arguments)}})(jQuery);
/*! jQuery UI - v1.9.2 - 2014-04-02
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.slider.js, jquery.ui.sortable.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e,t){function i(t,i){var s,n,r,o=t.nodeName.toLowerCase();return"area"===o?(s=t.parentNode,n=s.name,t.href&&n&&"map"===s.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&a(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&a(t)}function a(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var s=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.ui.version||(e.extend(e.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,i){return"number"==typeof t?this.each(function(){var a=this;setTimeout(function(){e(a).focus(),i&&i.call(a)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var a,s,n=e(this[0]);n.length&&n[0]!==document;){if(a=n.css("position"),("absolute"===a||"relative"===a||"fixed"===a)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++s)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,a){return!!e.data(t,a[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var a=e.attr(t,"tabindex"),s=isNaN(a);return(s||a>=0)&&i(t,!s)}}),e(function(){var t=document.body,i=t.appendChild(i=document.createElement("div"));i.offsetHeight,e.extend(i.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=100===i.offsetHeight,e.support.selectstart="onselectstart"in i,t.removeChild(i).style.display="none"}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,a){function s(t,i,a,s){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,a&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===a?["Left","Right"]:["Top","Bottom"],r=a.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+a]=function(i){return i===t?o["inner"+a].call(this):this.each(function(){e(this).css(r,s(this,i)+"px")})},e.fn["outer"+a]=function(t,i){return"number"!=typeof t?o["outer"+a].call(this,t):this.each(function(){e(this).css(r,s(this,t,!0,i)+"px")})}}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=6===parseFloat(t[1],10)}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,a){var s,n=e.ui[t].prototype;for(s in a)n.plugins[s]=n.plugins[s]||[],n.plugins[s].push([i,a[s]])},call:function(e,t,i){var a,s=e.plugins[t];if(s&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(a=0;s.length>a;a++)e.options[s[a][0]]&&s[a][1].apply(e.element,i)}},contains:e.contains,hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var a=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return t[a]>0?!0:(t[a]=1,s=t[a]>0,t[a]=0,s)},isOverAxis:function(e,t,i){return e>t&&t+i>e},isOver:function(t,i,a,s,n,r){return e.ui.isOverAxis(t,a,n)&&e.ui.isOverAxis(i,s,r)}}))})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,a=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(n){}a(t)},e.widget=function(i,s,a){var n,r,o,h,l=i.split(".")[0];i=i.split(".")[1],n=l+"-"+i,a||(a=s,s=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},r=e[l][i],o=e[l][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:a.version,_proto:e.extend({},a),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(a,function(t,i){e.isFunction(i)&&(a[t]=function(){var e=function(){return s.prototype[t].apply(this,arguments)},a=function(e){return s.prototype[t].apply(this,e)};return function(){var t,s=this._super,n=this._superApply;return this._super=e,this._superApply=a,t=i.apply(this,arguments),this._super=s,this._superApply=n,t}}())}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},a,{constructor:o,namespace:l,widgetName:i,widgetBaseClass:n,widgetFullName:n}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var a,n,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(a in r[o])n=r[o][a],r[o].hasOwnProperty(a)&&n!==t&&(i[a]=e.isPlainObject(n)?e.isPlainObject(i[a])?e.widget.extend({},i[a],n):e.widget.extend({},n):n);return i},e.widget.bridge=function(i,a){var n=a.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,a=e.data(this,n);return a?e.isFunction(a[r])&&"_"!==r.charAt(0)?(s=a[r].apply(a,h),s!==a&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,n);t?t.option(r||{})._init():e.data(this,n,new a(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetName,this),e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var a,n,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},a=i.split("."),i=a.shift(),a.length){for(n=o[i]=e.widget.extend({},this.options[i]),r=0;a.length-1>r;r++)n[a[r]]=n[a[r]]||{},n=n[a[r]];if(i=a.pop(),s===t)return n[i]===t?null:n[i];n[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,a){var n,r=this;"boolean"!=typeof i&&(a=s,s=i,i=!1),a?(s=n=e(s),this.bindings=this.bindings.add(s)):(a=s,s=this.element,n=this.widget()),e.each(a,function(a,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=a.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?n.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var a,n,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],n=i.originalEvent)for(a in n)a in i||(i[a]=n[a]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,a,n){"string"==typeof a&&(a={effect:a});var r,o=a?a===!0||"number"==typeof a?i:a.effect||i:t;a=a||{},"number"==typeof a&&(a={duration:a}),r=!e.isEmptyObject(a),a.complete=n,a.delay&&s.delay(a.delay),r&&e.effects&&(e.effects.effect[o]||e.uiBackCompat!==!1&&e.effects[o])?s[t](a):o!==t&&s[o]?s[o](a.duration,a.easing,n):s.queue(function(i){e(this)[t](),n&&n.call(s[0]),i()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,a=1===i.which,n="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return a&&!n&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(e,t){function i(e,t,i){return[parseInt(e[0],10)*(d.test(e[0])?t/100:1),parseInt(e[1],10)*(d.test(e[1])?i/100:1)]}function s(t,i){return parseInt(e.css(t,i),10)||0}e.ui=e.ui||{};var a,n=Math.max,r=Math.abs,o=Math.round,l=/left|center|right/,h=/top|center|bottom/,u=/[\+\-]\d+%?/,c=/^\w+/,d=/%$/,p=e.fn.position;e.position={scrollbarWidth:function(){if(a!==t)return a;var i,s,n=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),r=n.children()[0];return e("body").append(n),i=r.offsetWidth,n.css("overflow","scroll"),s=r.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(t){var i=t.isWindow?"":t.element.css("overflow-x"),s=t.isWindow?"":t.element.css("overflow-y"),a="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,n="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return p.apply(this,arguments);t=e.extend({},t);var a,d,f,m,g,v=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),_=v[0],x=(t.collision||"flip").split(" "),k={};return 9===_.nodeType?(d=v.width(),f=v.height(),m={top:0,left:0}):e.isWindow(_)?(d=v.width(),f=v.height(),m={top:v.scrollTop(),left:v.scrollLeft()}):_.preventDefault?(t.at="left top",d=f=0,m={top:_.pageY,left:_.pageX}):(d=v.outerWidth(),f=v.outerHeight(),m=v.offset()),g=e.extend({},m),e.each(["my","at"],function(){var e,i,s=(t[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):h.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=h.test(s[1])?s[1]:"center",e=u.exec(s[0]),i=u.exec(s[1]),k[this]=[e?e[0]:0,i?i[0]:0],t[this]=[c.exec(s[0])[0],c.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===t.at[0]?g.left+=d:"center"===t.at[0]&&(g.left+=d/2),"bottom"===t.at[1]?g.top+=f:"center"===t.at[1]&&(g.top+=f/2),a=i(k.at,d,f),g.left+=a[0],g.top+=a[1],this.each(function(){var l,h,u=e(this),c=u.outerWidth(),p=u.outerHeight(),_=s(this,"marginLeft"),w=s(this,"marginTop"),D=c+_+s(this,"marginRight")+b.width,T=p+w+s(this,"marginBottom")+b.height,S=e.extend({},g),M=i(k.my,u.outerWidth(),u.outerHeight());"right"===t.my[0]?S.left-=c:"center"===t.my[0]&&(S.left-=c/2),"bottom"===t.my[1]?S.top-=p:"center"===t.my[1]&&(S.top-=p/2),S.left+=M[0],S.top+=M[1],e.support.offsetFractions||(S.left=o(S.left),S.top=o(S.top)),l={marginLeft:_,marginTop:w},e.each(["left","top"],function(i,s){e.ui.position[x[i]]&&e.ui.position[x[i]][s](S,{targetWidth:d,targetHeight:f,elemWidth:c,elemHeight:p,collisionPosition:l,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:t.my,at:t.at,within:y,elem:u})}),e.fn.bgiframe&&u.bgiframe(),t.using&&(h=function(e){var i=m.left-S.left,s=i+d-c,a=m.top-S.top,o=a+f-p,l={target:{element:v,left:m.left,top:m.top,width:d,height:f},element:{element:u,left:S.left,top:S.top,width:c,height:p},horizontal:0>s?"left":i>0?"right":"center",vertical:0>o?"top":a>0?"bottom":"middle"};c>d&&d>r(i+s)&&(l.horizontal="center"),p>f&&f>r(a+o)&&(l.vertical="middle"),l.important=n(r(i),r(s))>n(r(a),r(o))?"horizontal":"vertical",t.using.call(this,e,l)}),u.offset(e.extend(S,{using:h}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,a=s.isWindow?s.scrollLeft:s.offset.left,r=s.width,o=e.left-t.collisionPosition.marginLeft,l=a-o,h=o+t.collisionWidth-r-a;t.collisionWidth>r?l>0&&0>=h?(i=e.left+l+t.collisionWidth-r-a,e.left+=l-i):e.left=h>0&&0>=l?a:l>h?a+r-t.collisionWidth:a:l>0?e.left+=l:h>0?e.left-=h:e.left=n(e.left-o,e.left)},top:function(e,t){var i,s=t.within,a=s.isWindow?s.scrollTop:s.offset.top,r=t.within.height,o=e.top-t.collisionPosition.marginTop,l=a-o,h=o+t.collisionHeight-r-a;t.collisionHeight>r?l>0&&0>=h?(i=e.top+l+t.collisionHeight-r-a,e.top+=l-i):e.top=h>0&&0>=l?a:l>h?a+r-t.collisionHeight:a:l>0?e.top+=l:h>0?e.top-=h:e.top=n(e.top-o,e.top)}},flip:{left:function(e,t){var i,s,a=t.within,n=a.offset.left+a.scrollLeft,o=a.width,l=a.isWindow?a.scrollLeft:a.offset.left,h=e.left-t.collisionPosition.marginLeft,u=h-l,c=h+t.collisionWidth-o-l,d="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+d+p+f+t.collisionWidth-o-n,(0>i||r(u)>i)&&(e.left+=d+p+f)):c>0&&(s=e.left-t.collisionPosition.marginLeft+d+p+f-l,(s>0||c>r(s))&&(e.left+=d+p+f))},top:function(e,t){var i,s,a=t.within,n=a.offset.top+a.scrollTop,o=a.height,l=a.isWindow?a.scrollTop:a.offset.top,h=e.top-t.collisionPosition.marginTop,u=h-l,c=h+t.collisionHeight-o-l,d="top"===t.my[1],p=d?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-n,e.top+p+f+m>u&&(0>s||r(u)>s)&&(e.top+=p+f+m)):c>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-l,e.top+p+f+m>c&&(i>0||c>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,a,n,r=document.getElementsByTagName("body")[0],o=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(n in s)t.style[n]=s[n];t.appendChild(o),i=r||document.documentElement,i.insertBefore(t,i.firstChild),o.style.cssText="position: absolute; left: 10.7432222px;",a=e(o).offset().left,e.support.offsetFractions=a>10&&11>a,t.innerHTML="",i.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var i=e.fn.position;e.fn.position=function(s){if(!s||!s.offset)return i.call(this,s);var a=s.offset.split(" "),n=s.at.split(" ");return 1===a.length&&(a[1]=a[0]),/^\d/.test(a[0])&&(a[0]="+"+a[0]),/^\d/.test(a[1])&&(a[1]="+"+a[1]),1===n.length&&(/left|center|right/.test(n[0])?n[1]="center":(n[1]=n[0],n[0]="center")),i.call(this,e.extend(s,{at:n[0]+a[0]+" "+n[1]+a[1],offset:t}))}}(jQuery)})(jQuery);(function(e){var t=0,i={},a={};i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="hide",a.height=a.paddingTop=a.paddingBottom=a.borderTopWidth=a.borderBottomWidth="show",e.widget("ui.accordion",{version:"1.9.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var i=this.accordionId="ui-accordion-"+(this.element.attr("id")||++t),a=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset"),this.headers=this.element.find(a.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this._hoverable(this.headers),this._focusable(this.headers),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(),a.collapsible||a.active!==!1&&null!=a.active||(a.active=0),0>a.active&&(a.active+=this.headers.length),this.active=this._findActive(a.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top"),this.active.next().addClass("ui-accordion-content-active").show(),this._createIcons(),this.refresh(),this.element.attr("role","tablist"),this.headers.attr("role","tab").each(function(t){var a=e(this),s=a.attr("id"),n=a.next(),r=n.attr("id");s||(s=i+"-header-"+t,a.attr("id",s)),r||(r=i+"-panel-"+t,n.attr("id",r)),a.attr("aria-controls",r),n.attr("aria-labelledby",s)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._on(this.headers,{keydown:"_keydown"}),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._setupEvents(a.event)},_getCreateEventData:function(){return{header:this.active,content:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),undefined):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t),undefined)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,a=this.headers.length,s=this.headers.index(t.target),n=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:n=this.headers[(s+1)%a];break;case i.LEFT:case i.UP:n=this.headers[(s-1+a)%a];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:n=this.headers[0];break;case i.END:n=this.headers[a-1]}n&&(e(t.target).attr("tabIndex",-1),e(n).attr("tabIndex",0),n.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t,i,a=this.options.heightStyle,s=this.element.parent();"fill"===a?(e.support.minHeight||(i=s.css("overflow"),s.css("overflow","hidden")),t=s.height(),this.element.siblings(":visible").each(function(){var i=e(this),a=i.css("position");"absolute"!==a&&"fixed"!==a&&(t-=i.outerHeight(!0))}),i&&s.css("overflow",i),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===a&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height())}).height(t))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={};t&&(e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._on(this.headers,i))},_eventHandler:function(t){var i=this.options,a=this.active,s=e(t.currentTarget),n=s[0]===a[0],r=n&&i.collapsible,o=r?e():s.next(),h=a.next(),l={oldHeader:a,oldPanel:h,newHeader:r?e():s,newPanel:o};t.preventDefault(),n&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=r?!1:this.headers.index(s),this.active=n?e():s,this._toggle(l),a.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&a.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),n||(s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),s.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,a=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=a,this.options.animate?this._animate(i,a,t):(a.hide(),i.show(),this._toggleComplete(t)),a.attr({"aria-expanded":"false","aria-hidden":"true"}),a.prev().attr("aria-selected","false"),i.length&&a.length?a.prev().attr("tabIndex",-1):i.length&&this.headers.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(e,t,s){var n,r,o,h=this,l=0,u=e.length&&(!t.length||e.index()<t.index()),d=this.options.animate||{},c=u&&d.down||d,p=function(){h._toggleComplete(s)};return"number"==typeof c&&(o=c),"string"==typeof c&&(r=c),r=r||c.easing||d.easing,o=o||c.duration||d.duration,t.length?e.length?(n=e.show().outerHeight(),t.animate(i,{duration:o,easing:r,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(a,{duration:o,easing:r,complete:p,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?l+=i.now:"content"!==h.options.heightStyle&&(i.now=Math.round(n-t.outerHeight()-l),l=0)}}),undefined):t.animate(i,o,r,p):e.animate(a,o,r,p)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.uiBackCompat!==!1&&(function(e,t){e.extend(t.options,{navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}});var i=t._create;t._create=function(){if(this.options.navigation){var t=this,a=this.element.find(this.options.header),s=a.next(),n=a.add(s).find("a").filter(this.options.navigationFilter)[0];n&&a.add(s).each(function(i){return e.contains(this,n)?(t.options.active=Math.floor(i/2),!1):undefined})}i.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{heightStyle:null,autoHeight:!0,clearStyle:!1,fillSpace:!1});var i=t._create,a=t._setOption;e.extend(t,{_create:function(){this.options.heightStyle=this.options.heightStyle||this._mergeHeightStyle(),i.call(this)},_setOption:function(e){("autoHeight"===e||"clearStyle"===e||"fillSpace"===e)&&(this.options.heightStyle=this._mergeHeightStyle()),a.apply(this,arguments)},_mergeHeightStyle:function(){var e=this.options;return e.fillSpace?"fill":e.clearStyle?"content":e.autoHeight?"auto":undefined}})}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options.icons,{activeHeader:null,headerSelected:"ui-icon-triangle-1-s"});var i=t._createIcons;t._createIcons=function(){this.options.icons&&(this.options.icons.activeHeader=this.options.icons.activeHeader||this.options.icons.headerSelected),i.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){t.activate=t._activate;var i=t._findActive;t._findActive=function(e){return-1===e&&(e=!1),e&&"number"!=typeof e&&(e=this.headers.index(this.headers.filter(e)),-1===e&&(e=!1)),i.call(this,e)}}(jQuery,jQuery.ui.accordion.prototype),jQuery.ui.accordion.prototype.resize=jQuery.ui.accordion.prototype.refresh,function(e,t){e.extend(t.options,{change:null,changestart:null});var i=t._trigger;t._trigger=function(e,t,a){var s=i.apply(this,arguments);return s?("beforeActivate"===e?s=i.call(this,"changestart",t,{oldHeader:a.oldHeader,oldContent:a.oldPanel,newHeader:a.newHeader,newContent:a.newPanel}):"activate"===e&&(s=i.call(this,"change",t,{oldHeader:a.oldHeader,oldContent:a.oldPanel,newHeader:a.newHeader,newContent:a.newPanel})),s):!1}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{animate:null,animated:"slide"});var i=t._create;t._create=function(){var e=this.options;null===e.animate&&(e.animate=e.animated?"slide"===e.animated?300:"bounceslide"===e.animated?{duration:200,down:{easing:"easeOutBounce",duration:1e3}}:e.animated:!1),i.call(this)}}(jQuery,jQuery.ui.accordion.prototype))})(jQuery);(function(e){var t=0;e.widget("ui.autocomplete",{version:"1.9.2",defaultElement:"<input>",options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,i,a;this.isMultiLine=this._isMultiLine(),this.valueMethod=this.element[this.element.is("input,textarea")?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(s){if(this.element.prop("readOnly"))return t=!0,a=!0,i=!0,undefined;t=!1,a=!1,i=!1;var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:t=!0,this._move("previousPage",s);break;case n.PAGE_DOWN:t=!0,this._move("nextPage",s);break;case n.UP:t=!0,this._keyEvent("previous",s);break;case n.DOWN:t=!0,this._keyEvent("next",s);break;case n.ENTER:case n.NUMPAD_ENTER:this.menu.active&&(t=!0,s.preventDefault(),this.menu.select(s));break;case n.TAB:this.menu.active&&this.menu.select(s);break;case n.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(s),s.preventDefault());break;default:i=!0,this._searchTimeout(s)}},keypress:function(a){if(t)return t=!1,a.preventDefault(),undefined;if(!i){var s=e.ui.keyCode;switch(a.keyCode){case s.PAGE_UP:this._move("previousPage",a);break;case s.PAGE_DOWN:this._move("nextPage",a);break;case s.UP:this._keyEvent("previous",a);break;case s.DOWN:this._keyEvent("next",a)}}},input:function(e){return a?(a=!1,e.preventDefault(),undefined):(this._searchTimeout(e),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(e),this._change(e),undefined)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo||"body")[0]).menu({input:e(),role:null}).zIndex(this.element.zIndex()+1).hide().data("menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(a){a.target===t.element[0]||a.target===i||e.contains(i,a.target)||t.close()})})},menufocus:function(t,i){if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),undefined;var a=i.item.data("ui-autocomplete-item")||i.item.data("item.autocomplete");!1!==this._trigger("focus",t,{item:a})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(a.value):this.liveRegion.text(a.value)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item")||t.item.data("item.autocomplete"),a=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=a,this._delay(function(){this.previous=a,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),e.fn.bgiframe&&this.menu.element.bgiframe(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this.document.find(t||"body")[0]),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_isMultiLine:function(){return this.element.is("textarea")?!0:this.element.is("input")?!1:this.element.prop("isContentEditable")},_initSource:function(){var t,i,a=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,a){a(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,s){a.xhr&&a.xhr.abort(),a.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){s(e)},error:function(){s([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):undefined},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,i=++t;return function(a){i===t&&e.__response(a),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var i=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(i,t),this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var a=this;e.each(i,function(e,i){a._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<a>").text(i.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[e](t),undefined):(this.search(null,t),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var a=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return a.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments),this.options.disabled||this.cancelSearch||(t=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.text(t))}})})(jQuery);(function(e){var t,i,a,s,n="ui-button ui-widget ui-state-default ui-corner-all",r="ui-state-hover ui-state-active ",o="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",h=function(){var t=e(this).find(":ui-button");setTimeout(function(){t.button("refresh")},1)},l=function(t){var i=t.name,a=t.form,s=e([]);return i&&(s=a?e(a).find("[name='"+i+"']"):e("[name='"+i+"']",t.ownerDocument).filter(function(){return!this.form})),s};e.widget("ui.button",{version:"1.9.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,h),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var r=this,o=this.options,u="checkbox"===this.type||"radio"===this.type,d=u?"":"ui-state-active",c="ui-state-focus";null===o.label&&(o.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(n).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){o.disabled||this===t&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){o.disabled||e(this).removeClass(d)}).bind("click"+this.eventNamespace,function(e){o.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){r.buttonElement.addClass(c)}).bind("blur"+this.eventNamespace,function(){r.buttonElement.removeClass(c)}),u&&(this.element.bind("change"+this.eventNamespace,function(){s||r.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(e){o.disabled||(s=!1,i=e.pageX,a=e.pageY)}).bind("mouseup"+this.eventNamespace,function(e){o.disabled||(i!==e.pageX||a!==e.pageY)&&(s=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return o.disabled||s?!1:(e(this).toggleClass("ui-state-active"),r.buttonElement.attr("aria-pressed",r.element[0].checked),undefined)}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(o.disabled||s)return!1;e(this).addClass("ui-state-active"),r.buttonElement.attr("aria-pressed","true");var t=r.element[0];l(t).not(t).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return o.disabled?!1:(e(this).addClass("ui-state-active"),t=this,r.document.one("mouseup",function(){t=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return o.disabled?!1:(e(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(t){return o.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",o.disabled),this._resetButton()},_determineButtonType:function(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(n+" "+r+" "+o).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(t?this.element.prop("disabled",!0):this.element.prop("disabled",!1),undefined):(this._resetButton(),undefined)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?l(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var t=this.buttonElement.removeClass(o),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),a=this.options.icons,s=a.primary&&a.secondary,n=[];a.primary||a.secondary?(this.options.text&&n.push("ui-button-text-icon"+(s?"s":a.primary?"-primary":"-secondary")),a.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+a.primary+"'></span>"),a.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+a.secondary+"'></span>"),this.options.text||(n.push(s?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):n.push("ui-button-text-only"),t.addClass(n.join(" "))}}),e.widget("ui.buttonset",{version:"1.9.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(e){var t="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(t,"mouseout",function(){$(this).removeClass("ui-state-hover"),-1!=this.className.indexOf("ui-datepicker-prev")&&$(this).removeClass("ui-datepicker-prev-hover"),-1!=this.className.indexOf("ui-datepicker-next")&&$(this).removeClass("ui-datepicker-next-hover")}).delegate(t,"mouseover",function(){$.datepicker._isDisabledDatepicker(instActive.inline?e.parent()[0]:instActive.input[0])||($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),-1!=this.className.indexOf("ui-datepicker-prev")&&$(this).addClass("ui-datepicker-prev-hover"),-1!=this.className.indexOf("ui-datepicker-next")&&$(this).addClass("ui-datepicker-next-hover"))})}function extendRemove(e,t){$.extend(e,t);for(var i in t)(null==t[i]||t[i]==undefined)&&(e[i]=t[i]);return e}$.extend($.ui,{datepicker:{version:"1.9.2"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline="div"==nodeName||"span"==nodeName;target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),"input"==nodeName?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(e,t){var i=e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:i,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:t,dpDiv:t?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(e,t){var i=$(e);t.append=$([]),t.trigger=$([]),i.hasClass(this.markerClassName)||(this._attachments(i,t),i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,i,a){t.settings[i]=a}).bind("getData.datepicker",function(e,i){return this._get(t,i)}),this._autoSize(t),$.data(e,PROP_NAME,t),t.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,t){var i=this._get(t,"appendText"),a=this._get(t,"isRTL");t.append&&t.append.remove(),i&&(t.append=$('<span class="'+this._appendClass+'">'+i+"</span>"),e[a?"before":"after"](t.append)),e.unbind("focus",this._showDatepicker),t.trigger&&t.trigger.remove();var s=this._get(t,"showOn");if(("focus"==s||"both"==s)&&e.focus(this._showDatepicker),"button"==s||"both"==s){var n=this._get(t,"buttonText"),r=this._get(t,"buttonImage");t.trigger=$(this._get(t,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:r,alt:n,title:n}):$('<button type="button"></button>').addClass(this._triggerClass).html(""==r?n:$("<img/>").attr({src:r,alt:n,title:n}))),e[a?"before":"after"](t.trigger),t.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==e[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=e[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(e[0])):$.datepicker._showDatepicker(e[0]),!1})}},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t=new Date(2009,11,20),i=this._get(e,"dateFormat");if(i.match(/[DM]/)){var a=function(e){for(var t=0,i=0,a=0;e.length>a;a++)e[a].length>t&&(t=e[a].length,i=a);return i};t.setMonth(a(this._get(e,i.match(/MM/)?"monthNames":"monthNamesShort"))),t.setDate(a(this._get(e,i.match(/DD/)?"dayNames":"dayNamesShort"))+20-t.getDay())}e.input.attr("size",this._formatDate(e,t).length)}},_inlineDatepicker:function(e,t){var i=$(e);i.hasClass(this.markerClassName)||(i.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",function(e,i,a){t.settings[i]=a}).bind("getData.datepicker",function(e,i){return this._get(t,i)}),$.data(e,PROP_NAME,t),this._setDate(t,this._getDefaultDate(t),!0),this._updateDatepicker(t),this._updateAlternate(t),t.settings.disabled&&this._disableDatepicker(e),t.dpDiv.css("display","block"))},_dialogDatepicker:function(e,t,i,a,s){var n=this._dialogInst;if(!n){this.uuid+=1;var r="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+r+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),n=this._dialogInst=this._newInst(this._dialogInput,!1),n.settings={},$.data(this._dialogInput[0],PROP_NAME,n)}if(extendRemove(n.settings,a||{}),t=t&&t.constructor==Date?this._formatDate(n,t):t,this._dialogInput.val(t),this._pos=s?s.length?s:[s.pageX,s.pageY]:null,!this._pos){var o=document.documentElement.clientWidth,h=document.documentElement.clientHeight,l=document.documentElement.scrollLeft||document.body.scrollLeft,u=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[o/2-100+l,h/2-150+u]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),n.settings.onSelect=i,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,n),this},_destroyDatepicker:function(e){var t=$(e),i=$.data(e,PROP_NAME);if(t.hasClass(this.markerClassName)){var a=e.nodeName.toLowerCase();$.removeData(e,PROP_NAME),"input"==a?(i.append.remove(),i.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"==a||"span"==a)&&t.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(e){var t=$(e),i=$.data(e,PROP_NAME);if(t.hasClass(this.markerClassName)){var a=e.nodeName.toLowerCase();if("input"==a)e.disabled=!1,i.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if("div"==a||"span"==a){var s=t.children("."+this._inlineClass);s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t})}},_disableDatepicker:function(e){var t=$(e),i=$.data(e,PROP_NAME);if(t.hasClass(this.markerClassName)){var a=e.nodeName.toLowerCase();if("input"==a)e.disabled=!0,i.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if("div"==a||"span"==a){var s=t.children("."+this._inlineClass);s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t}),this._disabledInputs[this._disabledInputs.length]=e}},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]==e)return!0;return!1},_getInst:function(e){try{return $.data(e,PROP_NAME)}catch(t){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,t,i){var a=this._getInst(e);if(2==arguments.length&&"string"==typeof t)return"defaults"==t?$.extend({},$.datepicker._defaults):a?"all"==t?$.extend({},a.settings):this._get(a,t):null;var s=t||{};if("string"==typeof t&&(s={},s[t]=i),a){this._curInst==a&&this._hideDatepicker();var n=this._getDateDatepicker(e,!0),r=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");extendRemove(a.settings,s),null!==r&&s.dateFormat!==undefined&&s.minDate===undefined&&(a.settings.minDate=this._formatDate(a,r)),null!==o&&s.dateFormat!==undefined&&s.maxDate===undefined&&(a.settings.maxDate=this._formatDate(a,o)),this._attachments($(e),a),this._autoSize(a),this._setDate(a,n),this._updateAlternate(a),this._updateDatepicker(a)}},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(e){var t=$.datepicker._getInst(e.target),i=!0,a=t.dpDiv.is(".ui-datepicker-rtl");if(t._keyEvent=!0,$.datepicker._datepickerShowing)switch(e.keyCode){case 9:$.datepicker._hideDatepicker(),i=!1;break;case 13:var s=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",t.dpDiv);s[0]&&$.datepicker._selectDay(e.target,t.selectedMonth,t.selectedYear,s[0]);var n=$.datepicker._get(t,"onSelect");if(n){var r=$.datepicker._formatDate(t);n.apply(t.input?t.input[0]:null,[r,t])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&$.datepicker._clearDate(e.target),i=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&$.datepicker._gotoToday(e.target),i=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,a?1:-1,"D"),i=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,-7,"D"),i=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,a?-1:1,"D"),i=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,7,"D"),i=e.ctrlKey||e.metaKey;break;default:i=!1}else 36==e.keyCode&&e.ctrlKey?$.datepicker._showDatepicker(this):i=!1;i&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var t=$.datepicker._getInst(e.target);if($.datepicker._get(t,"constrainInput")){var i=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),a=String.fromCharCode(e.charCode==undefined?e.keyCode:e.charCode);return e.ctrlKey||e.metaKey||" ">a||!i||i.indexOf(a)>-1}},_doKeyUp:function(e){var t=$.datepicker._getInst(e.target);if(t.input.val()!=t.lastVal)try{var i=$.datepicker.parseDate($.datepicker._get(t,"dateFormat"),t.input?t.input.val():null,$.datepicker._getFormatConfig(t));i&&($.datepicker._setDateFromField(t),$.datepicker._updateAlternate(t),$.datepicker._updateDatepicker(t))}catch(a){$.datepicker.log(a)}return!0},_showDatepicker:function(e){if(e=e.target||e,"input"!=e.nodeName.toLowerCase()&&(e=$("input",e.parentNode)[0]),!$.datepicker._isDisabledDatepicker(e)&&$.datepicker._lastInput!=e){var t=$.datepicker._getInst(e);$.datepicker._curInst&&$.datepicker._curInst!=t&&($.datepicker._curInst.dpDiv.stop(!0,!0),t&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var i=$.datepicker._get(t,"beforeShow"),a=i?i.apply(e,[e,t]):{};if(a!==!1){extendRemove(t.settings,a),t.lastVal=null,$.datepicker._lastInput=e,$.datepicker._setDateFromField(t),$.datepicker._inDialog&&(e.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(e),$.datepicker._pos[1]+=e.offsetHeight);var s=!1;$(e).parents().each(function(){return s|="fixed"==$(this).css("position"),!s});var n={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};if($.datepicker._pos=null,t.dpDiv.empty(),t.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(t),n=$.datepicker._checkOffset(t,n,s),t.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":s?"fixed":"absolute",display:"none",left:n.left+"px",top:n.top+"px"}),!t.inline){var r=$.datepicker._get(t,"showAnim"),o=$.datepicker._get(t,"duration"),h=function(){var e=t.dpDiv.find("iframe.ui-datepicker-cover");if(e.length){var i=$.datepicker._getBorders(t.dpDiv);e.css({left:-i[0],top:-i[1],width:t.dpDiv.outerWidth(),height:t.dpDiv.outerHeight()})}};t.dpDiv.zIndex($(e).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&($.effects.effect[r]||$.effects[r])?t.dpDiv.show(r,$.datepicker._get(t,"showOptions"),o,h):t.dpDiv[r||"show"](r?o:null,h),r&&o||h(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),$.datepicker._curInst=t}}}},_updateDatepicker:function(e){this.maxRows=4;var t=$.datepicker._getBorders(e.dpDiv);instActive=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i=e.dpDiv.find("iframe.ui-datepicker-cover");i.length&&i.css({left:-t[0],top:-t[1],width:e.dpDiv.outerWidth(),height:e.dpDiv.outerHeight()}),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var a=this._getNumberOfMonths(e),s=a[1],n=17;if(e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),s>1&&e.dpDiv.addClass("ui-datepicker-multi-"+s).css("width",n*s+"em"),e.dpDiv[(1!=a[0]||1!=a[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e==$.datepicker._curInst&&$.datepicker._datepickerShowing&&e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&e.input[0]!=document.activeElement&&e.input.focus(),e.yearshtml){var r=e.yearshtml;setTimeout(function(){r===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),r=e.yearshtml=null},0)}},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkOffset:function(e,t,i){var a=e.dpDiv.outerWidth(),s=e.dpDiv.outerHeight(),n=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,o=document.documentElement.clientWidth+(i?0:$(document).scrollLeft()),h=document.documentElement.clientHeight+(i?0:$(document).scrollTop());return t.left-=this._get(e,"isRTL")?a-n:0,t.left-=i&&t.left==e.input.offset().left?$(document).scrollLeft():0,t.top-=i&&t.top==e.input.offset().top+r?$(document).scrollTop():0,t.left-=Math.min(t.left,t.left+a>o&&o>a?Math.abs(t.left+a-o):0),t.top-=Math.min(t.top,t.top+s>h&&h>s?Math.abs(s+r):0),t},_findPos:function(e){for(var t=this._getInst(e),i=this._get(t,"isRTL");e&&("hidden"==e.type||1!=e.nodeType||$.expr.filters.hidden(e));)e=e[i?"previousSibling":"nextSibling"];var a=$(e).offset();return[a.left,a.top]},_hideDatepicker:function(e){var t=this._curInst;if(t&&(!e||t==$.data(e,PROP_NAME))&&this._datepickerShowing){var i=this._get(t,"showAnim"),a=this._get(t,"duration"),s=function(){$.datepicker._tidyDialog(t)};$.effects&&($.effects.effect[i]||$.effects[i])?t.dpDiv.hide(i,$.datepicker._get(t,"showOptions"),a,s):t.dpDiv["slideDown"==i?"slideUp":"fadeIn"==i?"fadeOut":"hide"](i?a:null,s),i||s(),this._datepickerShowing=!1;var n=this._get(t,"onClose");n&&n.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if($.datepicker._curInst){var t=$(e.target),i=$.datepicker._getInst(t[0]);(t[0].id!=$.datepicker._mainDivId&&0==t.parents("#"+$.datepicker._mainDivId).length&&!t.hasClass($.datepicker.markerClassName)&&!t.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||t.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=i)&&$.datepicker._hideDatepicker()}},_adjustDate:function(e,t,i){var a=$(e),s=this._getInst(a[0]);this._isDisabledDatepicker(a[0])||(this._adjustInstDate(s,t+("M"==i?this._get(s,"showCurrentAtPos"):0),i),this._updateDatepicker(s))},_gotoToday:function(e){var t=$(e),i=this._getInst(t[0]);if(this._get(i,"gotoCurrent")&&i.currentDay)i.selectedDay=i.currentDay,i.drawMonth=i.selectedMonth=i.currentMonth,i.drawYear=i.selectedYear=i.currentYear;else{var a=new Date;i.selectedDay=a.getDate(),i.drawMonth=i.selectedMonth=a.getMonth(),i.drawYear=i.selectedYear=a.getFullYear()}this._notifyChange(i),this._adjustDate(t)},_selectMonthYear:function(e,t,i){var a=$(e),s=this._getInst(a[0]);s["selected"+("M"==i?"Month":"Year")]=s["draw"+("M"==i?"Month":"Year")]=parseInt(t.options[t.selectedIndex].value,10),this._notifyChange(s),this._adjustDate(a)},_selectDay:function(e,t,i,a){var s=$(e);if(!$(a).hasClass(this._unselectableClass)&&!this._isDisabledDatepicker(s[0])){var n=this._getInst(s[0]);n.selectedDay=n.currentDay=$("a",a).html(),n.selectedMonth=n.currentMonth=t,n.selectedYear=n.currentYear=i,this._selectDate(e,this._formatDate(n,n.currentDay,n.currentMonth,n.currentYear))}},_clearDate:function(e){var t=$(e);this._getInst(t[0]),this._selectDate(t,"")},_selectDate:function(e,t){var i=$(e),a=this._getInst(i[0]);t=null!=t?t:this._formatDate(a),a.input&&a.input.val(t),this._updateAlternate(a);var s=this._get(a,"onSelect");s?s.apply(a.input?a.input[0]:null,[t,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var t=this._get(e,"altField");if(t){var i=this._get(e,"altFormat")||this._get(e,"dateFormat"),a=this._getDate(e),s=this.formatDate(i,a,this._getFormatConfig(e));$(t).each(function(){$(this).val(s)})}},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t=new Date(e.getTime());t.setDate(t.getDate()+4-(t.getDay()||7));var i=t.getTime();return t.setMonth(0),t.setDate(1),Math.floor(Math.round((i-t)/864e5)/7)+1},parseDate:function(e,t,i){if(null==e||null==t)throw"Invalid arguments";if(t="object"==typeof t?""+t:t+"",""==t)return null;var a=(i?i.shortYearCutoff:null)||this._defaults.shortYearCutoff;a="string"!=typeof a?a:(new Date).getFullYear()%100+parseInt(a,10);for(var s=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,n=(i?i.dayNames:null)||this._defaults.dayNames,r=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,o=(i?i.monthNames:null)||this._defaults.monthNames,h=-1,l=-1,u=-1,d=-1,c=!1,p=function(t){var i=e.length>y+1&&e.charAt(y+1)==t;return i&&y++,i},m=function(e){var i=p(e),a="@"==e?14:"!"==e?20:"y"==e&&i?4:"o"==e?3:2,s=RegExp("^\\d{1,"+a+"}"),n=t.substring(v).match(s);if(!n)throw"Missing number at position "+v;return v+=n[0].length,parseInt(n[0],10)},f=function(e,i,a){var s=$.map(p(e)?a:i,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)}),n=-1;if($.each(s,function(e,i){var a=i[1];return t.substr(v,a.length).toLowerCase()==a.toLowerCase()?(n=i[0],v+=a.length,!1):undefined}),-1!=n)return n+1;throw"Unknown name at position "+v},g=function(){if(t.charAt(v)!=e.charAt(y))throw"Unexpected literal at position "+v;v++},v=0,y=0;e.length>y;y++)if(c)"'"!=e.charAt(y)||p("'")?g():c=!1;else switch(e.charAt(y)){case"d":u=m("d");break;case"D":f("D",s,n);break;case"o":d=m("o");break;case"m":l=m("m");break;case"M":l=f("M",r,o);break;case"y":h=m("y");break;case"@":var b=new Date(m("@"));h=b.getFullYear(),l=b.getMonth()+1,u=b.getDate();break;case"!":var b=new Date((m("!")-this._ticksTo1970)/1e4);h=b.getFullYear(),l=b.getMonth()+1,u=b.getDate();break;case"'":p("'")?g():c=!0;break;default:g()}if(t.length>v){var _=t.substr(v);if(!/^\s+/.test(_))throw"Extra/unparsed characters found in date: "+_}if(-1==h?h=(new Date).getFullYear():100>h&&(h+=(new Date).getFullYear()-(new Date).getFullYear()%100+(a>=h?0:-100)),d>-1)for(l=1,u=d;;){var k=this._getDaysInMonth(h,l-1);if(k>=u)break;l++,u-=k}var b=this._daylightSavingAdjust(new Date(h,l-1,u));if(b.getFullYear()!=h||b.getMonth()+1!=l||b.getDate()!=u)throw"Invalid date";return b},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var a=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,s=(i?i.dayNames:null)||this._defaults.dayNames,n=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,o=function(t){var i=e.length>c+1&&e.charAt(c+1)==t;return i&&c++,i},h=function(e,t,i){var a=""+t;if(o(e))for(;i>a.length;)a="0"+a;return a},l=function(e,t,i,a){return o(e)?a[t]:i[t]},u="",d=!1;if(t)for(var c=0;e.length>c;c++)if(d)"'"!=e.charAt(c)||o("'")?u+=e.charAt(c):d=!1;else switch(e.charAt(c)){case"d":u+=h("d",t.getDate(),2);break;case"D":u+=l("D",t.getDay(),a,s);break;case"o":u+=h("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=h("m",t.getMonth()+1,2);break;case"M":u+=l("M",t.getMonth(),n,r);break;case"y":u+=o("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":u+=t.getTime();break;case"!":u+=1e4*t.getTime()+this._ticksTo1970;break;case"'":o("'")?u+="'":d=!0;break;default:u+=e.charAt(c)}return u},_possibleChars:function(e){for(var t="",i=!1,a=function(t){var i=e.length>s+1&&e.charAt(s+1)==t;return i&&s++,i},s=0;e.length>s;s++)if(i)"'"!=e.charAt(s)||a("'")?t+=e.charAt(s):i=!1;else switch(e.charAt(s)){case"d":case"m":case"y":case"@":t+="0123456789";break;case"D":case"M":return null;case"'":a("'")?t+="'":i=!0;break;default:t+=e.charAt(s)}return t},_get:function(e,t){return e.settings[t]!==undefined?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!=e.lastVal){var i,a,s=this._get(e,"dateFormat"),n=e.lastVal=e.input?e.input.val():null;i=a=this._getDefaultDate(e);var r=this._getFormatConfig(e);try{i=this.parseDate(s,n,r)||a}catch(o){this.log(o),n=t?"":n}e.selectedDay=i.getDate(),e.drawMonth=e.selectedMonth=i.getMonth(),e.drawYear=e.selectedYear=i.getFullYear(),e.currentDay=n?i.getDate():0,e.currentMonth=n?i.getMonth():0,e.currentYear=n?i.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(e,t,i){var a=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},s=function(t){try{return $.datepicker.parseDate($.datepicker._get(e,"dateFormat"),t,$.datepicker._getFormatConfig(e))}catch(i){}for(var a=(t.toLowerCase().match(/^c/)?$.datepicker._getDate(e):null)||new Date,s=a.getFullYear(),n=a.getMonth(),r=a.getDate(),o=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,h=o.exec(t);h;){switch(h[2]||"d"){case"d":case"D":r+=parseInt(h[1],10);break;case"w":case"W":r+=7*parseInt(h[1],10);break;case"m":case"M":n+=parseInt(h[1],10),r=Math.min(r,$.datepicker._getDaysInMonth(s,n));break;case"y":case"Y":s+=parseInt(h[1],10),r=Math.min(r,$.datepicker._getDaysInMonth(s,n))}h=o.exec(t)}return new Date(s,n,r)},n=null==t||""===t?i:"string"==typeof t?s(t):"number"==typeof t?isNaN(t)?i:a(t):new Date(t.getTime());return n=n&&"Invalid Date"==""+n?i:n,n&&(n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0)),this._daylightSavingAdjust(n)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var a=!t,s=e.selectedMonth,n=e.selectedYear,r=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=r.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=r.getMonth(),e.drawYear=e.selectedYear=e.currentYear=r.getFullYear(),s==e.selectedMonth&&n==e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(a?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""==e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(e){var t=this._get(e,"stepMonths"),i="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(i,-t,"M")},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(i,+t,"M")},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(i)},selectDay:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(i,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(i,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(i,this,"Y"),!1}};$(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t=new Date;t=this._daylightSavingAdjust(new Date(t.getFullYear(),t.getMonth(),t.getDate()));var i=this._get(e,"isRTL"),a=this._get(e,"showButtonPanel"),s=this._get(e,"hideIfNoPrevNext"),n=this._get(e,"navigationAsDateFormat"),r=this._getNumberOfMonths(e),o=this._get(e,"showCurrentAtPos"),h=this._get(e,"stepMonths"),l=1!=r[0]||1!=r[1],u=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),d=this._getMinMaxDate(e,"min"),c=this._getMinMaxDate(e,"max"),p=e.drawMonth-o,m=e.drawYear;if(0>p&&(p+=12,m--),c){var f=this._daylightSavingAdjust(new Date(c.getFullYear(),c.getMonth()-r[0]*r[1]+1,c.getDate()));for(f=d&&d>f?d:f;this._daylightSavingAdjust(new Date(m,p,1))>f;)p--,0>p&&(p=11,m--)}e.drawMonth=p,e.drawYear=m;var g=this._get(e,"prevText");g=n?this.formatDate(g,this._daylightSavingAdjust(new Date(m,p-h,1)),this._getFormatConfig(e)):g;var v=this._canAdjustMonth(e,-1,m,p)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+g+'"><span class="ui-icon ui-icon-circle-triangle-'+(i?"e":"w")+'">'+g+"</span></a>":s?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+g+'"><span class="ui-icon ui-icon-circle-triangle-'+(i?"e":"w")+'">'+g+"</span></a>",y=this._get(e,"nextText");y=n?this.formatDate(y,this._daylightSavingAdjust(new Date(m,p+h,1)),this._getFormatConfig(e)):y;var b=this._canAdjustMonth(e,1,m,p)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(i?"w":"e")+'">'+y+"</span></a>":s?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(i?"w":"e")+'">'+y+"</span></a>",_=this._get(e,"currentText"),k=this._get(e,"gotoCurrent")&&e.currentDay?u:t;_=n?this.formatDate(_,k,this._getFormatConfig(e)):_;var x=e.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(e,"closeText")+"</button>",D=a?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(i?x:"")+(this._isInRange(e,k)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+_+"</button>":"")+(i?"":x)+"</div>":"",w=parseInt(this._get(e,"firstDay"),10);w=isNaN(w)?0:w;var T=this._get(e,"showWeek"),S=this._get(e,"dayNames");this._get(e,"dayNamesShort");var M=this._get(e,"dayNamesMin"),N=this._get(e,"monthNames"),C=this._get(e,"monthNamesShort"),A=this._get(e,"beforeShowDay"),P=this._get(e,"showOtherMonths"),j=this._get(e,"selectOtherMonths");this._get(e,"calculateWeek")||this.iso8601Week;for(var I=this._getDefaultDate(e),F="",H=0;r[0]>H;H++){var E="";this.maxRows=4;for(var z=0;r[1]>z;z++){var L=this._daylightSavingAdjust(new Date(m,p,e.selectedDay)),O=" ui-corner-all",R="";if(l){if(R+='<div class="ui-datepicker-group',r[1]>1)switch(z){case 0:R+=" ui-datepicker-group-first",O=" ui-corner-"+(i?"right":"left");break;case r[1]-1:R+=" ui-datepicker-group-last",O=" ui-corner-"+(i?"left":"right");break;default:R+=" ui-datepicker-group-middle",O=""}R+='">'}R+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+O+'">'+(/all|left/.test(O)&&0==H?i?b:v:"")+(/all|right/.test(O)&&0==H?i?v:b:"")+this._generateMonthYearHeader(e,p,m,d,c,H>0||z>0,N,C)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";for(var W=T?'<th class="ui-datepicker-week-col">'+this._get(e,"weekHeader")+"</th>":"",Y=0;7>Y;Y++){var J=(Y+w)%7;W+="<th"+((Y+w+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+S[J]+'">'+M[J]+"</span></th>"}R+=W+"</tr></thead><tbody>";var Q=this._getDaysInMonth(m,p);m==e.selectedYear&&p==e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,Q));var B=(this._getFirstDayOfMonth(m,p)-w+7)%7,K=Math.ceil((B+Q)/7),V=l?this.maxRows>K?this.maxRows:K:K;this.maxRows=V;for(var U=this._daylightSavingAdjust(new Date(m,p,1-B)),G=0;V>G;G++){R+="<tr>";for(var q=T?'<td class="ui-datepicker-week-col">'+this._get(e,"calculateWeek")(U)+"</td>":"",Y=0;7>Y;Y++){var X=A?A.apply(e.input?e.input[0]:null,[U]):[!0,""],Z=U.getMonth()!=p,et=Z&&!j||!X[0]||d&&d>U||c&&U>c;q+='<td class="'+((Y+w+6)%7>=5?" ui-datepicker-week-end":"")+(Z?" ui-datepicker-other-month":"")+(U.getTime()==L.getTime()&&p==e.selectedMonth&&e._keyEvent||I.getTime()==U.getTime()&&I.getTime()==L.getTime()?" "+this._dayOverClass:"")+(et?" "+this._unselectableClass+" ui-state-disabled":"")+(Z&&!P?"":" "+X[1]+(U.getTime()==u.getTime()?" "+this._currentClass:"")+(U.getTime()==t.getTime()?" ui-datepicker-today":""))+'"'+(Z&&!P||!X[2]?"":' title="'+X[2]+'"')+(et?"":' data-handler="selectDay" data-event="click" data-month="'+U.getMonth()+'" data-year="'+U.getFullYear()+'"')+">"+(Z&&!P?"&#xa0;":et?'<span class="ui-state-default">'+U.getDate()+"</span>":'<a class="ui-state-default'+(U.getTime()==t.getTime()?" ui-state-highlight":"")+(U.getTime()==u.getTime()?" ui-state-active":"")+(Z?" ui-priority-secondary":"")+'" href="#">'+U.getDate()+"</a>")+"</td>",U.setDate(U.getDate()+1),U=this._daylightSavingAdjust(U)
}R+=q+"</tr>"}p++,p>11&&(p=0,m++),R+="</tbody></table>"+(l?"</div>"+(r[0]>0&&z==r[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),E+=R}F+=E}return F+=D+($.ui.ie6&&!e.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),e._keyEvent=!1,F},_generateMonthYearHeader:function(e,t,i,a,s,n,r,o){var h=this._get(e,"changeMonth"),l=this._get(e,"changeYear"),u=this._get(e,"showMonthAfterYear"),d='<div class="ui-datepicker-title">',c="";if(n||!h)c+='<span class="ui-datepicker-month">'+r[t]+"</span>";else{var p=a&&a.getFullYear()==i,m=s&&s.getFullYear()==i;c+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var f=0;12>f;f++)(!p||f>=a.getMonth())&&(!m||s.getMonth()>=f)&&(c+='<option value="'+f+'"'+(f==t?' selected="selected"':"")+">"+o[f]+"</option>");c+="</select>"}if(u||(d+=c+(!n&&h&&l?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",n||!l)d+='<span class="ui-datepicker-year">'+i+"</span>";else{var g=this._get(e,"yearRange").split(":"),v=(new Date).getFullYear(),y=function(e){var t=e.match(/c[+-].*/)?i+parseInt(e.substring(1),10):e.match(/[+-].*/)?v+parseInt(e,10):parseInt(e,10);return isNaN(t)?v:t},b=y(g[0]),_=Math.max(b,y(g[1]||""));for(b=a?Math.max(b,a.getFullYear()):b,_=s?Math.min(_,s.getFullYear()):_,e.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';_>=b;b++)e.yearshtml+='<option value="'+b+'"'+(b==i?' selected="selected"':"")+">"+b+"</option>";e.yearshtml+="</select>",d+=e.yearshtml,e.yearshtml=null}return d+=this._get(e,"yearSuffix"),u&&(d+=(!n&&h&&l?"":"&#xa0;")+c),d+="</div>"},_adjustInstDate:function(e,t,i){var a=e.drawYear+("Y"==i?t:0),s=e.drawMonth+("M"==i?t:0),n=Math.min(e.selectedDay,this._getDaysInMonth(a,s))+("D"==i?t:0),r=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(a,s,n)));e.selectedDay=r.getDate(),e.drawMonth=e.selectedMonth=r.getMonth(),e.drawYear=e.selectedYear=r.getFullYear(),("M"==i||"Y"==i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),s=i&&i>t?i:t;return s=a&&s>a?a:s},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,a){var s=this._getNumberOfMonths(e),n=this._daylightSavingAdjust(new Date(i,a+(0>t?t:s[0]*s[1]),1));return 0>t&&n.setDate(this._getDaysInMonth(n.getFullYear(),n.getMonth())),this._isInRange(e,n)},_isInRange:function(e,t){var i=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max");return(!i||t.getTime()>=i.getTime())&&(!a||t.getTime()<=a.getTime())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,a){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var s=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(a,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),s,this._getFormatConfig(e))}}),$.fn.datepicker=function(e){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv),$.datepicker.initialized=!0);var t=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!=e&&"getDate"!=e&&"widget"!=e?"option"==e&&2==arguments.length&&"string"==typeof arguments[1]?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t)):this.each(function(){"string"==typeof e?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this].concat(t)):$.datepicker._attachDatepicker(this,e)}):$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.9.2",window["DP_jQuery_"+dpuuid]=$})(jQuery);(function(e,t){var i="ui-dialog ui-widget ui-widget-content ui-corner-all ",a={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},s={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};e.widget("ui.dialog",{version:"1.9.2",options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),"string"!=typeof this.originalTitle&&(this.originalTitle=""),this.oldPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.options.title=this.options.title||this.originalTitle;var a,s,n,r,o,h=this,l=this.options,u=l.title||"&#160;";a=(this.uiDialog=e("<div>")).addClass(i+l.dialogClass).css({display:"none",outline:0,zIndex:l.zIndex}).attr("tabIndex",-1).keydown(function(t){l.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE&&(h.close(t),t.preventDefault())}).mousedown(function(e){h.moveToTop(!1,e)}).appendTo("body"),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(a),s=(this.uiDialogTitlebar=e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown",function(){a.focus()}).prependTo(a),n=e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role","button").click(function(e){e.preventDefault(),h.close(e)}).appendTo(s),(this.uiDialogTitlebarCloseText=e("<span>")).addClass("ui-icon ui-icon-closethick").text(l.closeText).appendTo(n),r=e("<span>").uniqueId().addClass("ui-dialog-title").html(u).prependTo(s),o=(this.uiDialogButtonPane=e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),(this.uiButtonSet=e("<div>")).addClass("ui-dialog-buttonset").appendTo(o),a.attr({role:"dialog","aria-labelledby":r.attr("id")}),s.find("*").add(s).disableSelection(),this._hoverable(n),this._focusable(n),l.draggable&&e.fn.draggable&&this._makeDraggable(),l.resizable&&e.fn.resizable&&this._makeResizable(),this._createButtons(l.buttons),this._isOpen=!1,e.fn.bgiframe&&a.bgiframe(),this._on(a,{keydown:function(i){if(l.modal&&i.keyCode===e.ui.keyCode.TAB){var s=e(":tabbable",a),n=s.filter(":first"),r=s.filter(":last");return i.target!==r[0]||i.shiftKey?i.target===n[0]&&i.shiftKey?(r.focus(1),!1):t:(n.focus(1),!1)}}})},_init:function(){this.options.autoOpen&&this.open()},_destroy:function(){var e,t=this.oldPosition;this.overlay&&this.overlay.destroy(),this.uiDialog.hide(),this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},close:function(t){var i,a,s=this;if(this._isOpen&&!1!==this._trigger("beforeClose",t))return this._isOpen=!1,this.overlay&&this.overlay.destroy(),this.options.hide?this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",t)}):(this.uiDialog.hide(),this._trigger("close",t)),e.ui.dialog.overlay.resize(),this.options.modal&&(i=0,e(".ui-dialog").each(function(){this!==s.uiDialog[0]&&(a=e(this).css("z-index"),isNaN(a)||(i=Math.max(i,a)))}),e.ui.dialog.maxZ=i),this},isOpen:function(){return this._isOpen},moveToTop:function(t,i){var a,s=this.options;return s.modal&&!t||!s.stack&&!s.modal?this._trigger("focus",i):(s.zIndex>e.ui.dialog.maxZ&&(e.ui.dialog.maxZ=s.zIndex),this.overlay&&(e.ui.dialog.maxZ+=1,e.ui.dialog.overlay.maxZ=e.ui.dialog.maxZ,this.overlay.$el.css("z-index",e.ui.dialog.overlay.maxZ)),a={scrollTop:this.element.scrollTop(),scrollLeft:this.element.scrollLeft()},e.ui.dialog.maxZ+=1,this.uiDialog.css("z-index",e.ui.dialog.maxZ),this.element.attr(a),this._trigger("focus",i),this)},open:function(){if(!this._isOpen){var t,i=this.options,a=this.uiDialog;return this._size(),this._position(i.position),a.show(i.show),this.overlay=i.modal?new e.ui.dialog.overlay(this):null,this.moveToTop(!0),t=this.element.find(":tabbable"),t.length||(t=this.uiDialogButtonPane.find(":tabbable"),t.length||(t=a)),t.eq(0).focus(),this._isOpen=!0,this._trigger("open"),this}},_createButtons:function(t){var i=this,a=!1;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),"object"==typeof t&&null!==t&&e.each(t,function(){return!(a=!0)}),a?(e.each(t,function(t,a){var s,n;a=e.isFunction(a)?{click:a,text:t}:a,a=e.extend({type:"button"},a),n=a.click,a.click=function(){n.apply(i.element[0],arguments)},s=e("<button></button>",a).appendTo(i.uiButtonSet),e.fn.button&&s.button()}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog)):this.uiDialog.removeClass("ui-dialog-buttons")},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,a=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(a,s){e(this).addClass("ui-dialog-dragging"),i._trigger("dragStart",a,t(s))},drag:function(e,a){i._trigger("drag",e,t(a))},stop:function(s,n){a.position=[n.position.left-i.document.scrollLeft(),n.position.top-i.document.scrollTop()],e(this).removeClass("ui-dialog-dragging"),i._trigger("dragStop",s,t(n)),e.ui.dialog.overlay.resize()}})},_makeResizable:function(i){function a(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}i=i===t?this.options.resizable:i;var s=this,n=this.options,r=this.uiDialog.css("position"),o="string"==typeof i?i:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:n.maxWidth,maxHeight:n.maxHeight,minWidth:n.minWidth,minHeight:this._minHeight(),handles:o,start:function(t,i){e(this).addClass("ui-dialog-resizing"),s._trigger("resizeStart",t,a(i))},resize:function(e,t){s._trigger("resize",e,a(t))},stop:function(t,i){e(this).removeClass("ui-dialog-resizing"),n.height=e(this).height(),n.width=e(this).width(),s._trigger("resizeStop",t,a(i)),e.ui.dialog.overlay.resize()}}).css("position",r).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(t){var i,a=[],s=[0,0];t?(("string"==typeof t||"object"==typeof t&&"0"in t)&&(a=t.split?t.split(" "):[t[0],t[1]],1===a.length&&(a[1]=a[0]),e.each(["left","top"],function(e,t){+a[e]===a[e]&&(s[e]=a[e],a[e]=t)}),t={my:a[0]+(0>s[0]?s[0]:"+"+s[0])+" "+a[1]+(0>s[1]?s[1]:"+"+s[1]),at:a.join(" ")}),t=e.extend({},e.ui.dialog.prototype.options.position,t)):t=e.ui.dialog.prototype.options.position,i=this.uiDialog.is(":visible"),i||this.uiDialog.show(),this.uiDialog.position(t),i||this.uiDialog.hide()},_setOptions:function(t){var i=this,n={},r=!1;e.each(t,function(e,t){i._setOption(e,t),e in a&&(r=!0),e in s&&(n[e]=t)}),r&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(t,a){var s,n,r=this.uiDialog;switch(t){case"buttons":this._createButtons(a);break;case"closeText":this.uiDialogTitlebarCloseText.text(""+a);break;case"dialogClass":r.removeClass(this.options.dialogClass).addClass(i+a);break;case"disabled":a?r.addClass("ui-dialog-disabled"):r.removeClass("ui-dialog-disabled");break;case"draggable":s=r.is(":data(draggable)"),s&&!a&&r.draggable("destroy"),!s&&a&&this._makeDraggable();break;case"position":this._position(a);break;case"resizable":n=r.is(":data(resizable)"),n&&!a&&r.resizable("destroy"),n&&"string"==typeof a&&r.resizable("option","handles",a),n||a===!1||this._makeResizable(a);break;case"title":e(".ui-dialog-title",this.uiDialogTitlebar).html(""+(a||"&#160;"))}this._super(t,a)},_size:function(){var t,i,a,s=this.options,n=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),i=Math.max(0,s.minHeight-t),"auto"===s.height?e.support.minHeight?this.element.css({minHeight:i,height:"auto"}):(this.uiDialog.show(),a=this.element.css("height","auto").height(),n||this.uiDialog.hide(),this.element.height(Math.max(a,i))):this.element.height(Math.max(s.height-t,0)),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),e.extend(e.ui.dialog,{uuid:0,maxZ:0,getTitleId:function(e){var t=e.attr("id");return t||(this.uuid+=1,t=this.uuid),"ui-dialog-title-"+t},overlay:function(t){this.$el=e.ui.dialog.overlay.create(t)}}),e.extend(e.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(e){return e+".dialog-overlay"}).join(" "),create:function(i){0===this.instances.length&&(setTimeout(function(){e.ui.dialog.overlay.instances.length&&e(document).bind(e.ui.dialog.overlay.events,function(i){return e(i.target).zIndex()<e.ui.dialog.overlay.maxZ?!1:t})},1),e(window).bind("resize.dialog-overlay",e.ui.dialog.overlay.resize));var a=this.oldInstances.pop()||e("<div>").addClass("ui-widget-overlay");return e(document).bind("keydown.dialog-overlay",function(t){var s=e.ui.dialog.overlay.instances;0!==s.length&&s[s.length-1]===a&&i.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE&&(i.close(t),t.preventDefault())}),a.appendTo(document.body).css({width:this.width(),height:this.height()}),e.fn.bgiframe&&a.bgiframe(),this.instances.push(a),a},destroy:function(t){var i=e.inArray(t,this.instances),a=0;-1!==i&&this.oldInstances.push(this.instances.splice(i,1)[0]),0===this.instances.length&&e([document,window]).unbind(".dialog-overlay"),t.height(0).width(0).remove(),e.each(this.instances,function(){a=Math.max(a,this.css("z-index"))}),this.maxZ=a},height:function(){var t,i;return e.ui.ie?(t=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),i=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),i>t?e(window).height()+"px":t+"px"):e(document).height()+"px"},width:function(){var t,i;return e.ui.ie?(t=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),i=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),i>t?e(window).width()+"px":t+"px"):e(document).width()+"px"},resize:function(){var t=e([]);e.each(e.ui.dialog.overlay.instances,function(){t=t.add(this)}),t.css({width:0,height:0}).css({width:e.ui.dialog.overlay.width(),height:e.ui.dialog.overlay.height()})}}),e.extend(e.ui.dialog.overlay.prototype,{destroy:function(){e.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){"original"!=this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(t),this.handle?(e(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),i.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,i){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!i){var a=this._uiHash();if(this._trigger("drag",t,a)===!1)return this._mouseUp({}),!1;this.position=a.position}return this.options.axis&&"y"==this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"==this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=!1;e.ui.ddmanager&&!this.options.dropBehaviour&&(i=e.ui.ddmanager.drop(this,t)),this.dropped&&(i=this.dropped,this.dropped=!1);for(var a=this.element[0],s=!1;a&&(a=a.parentNode);)a==document&&(s=!0);if(!s&&"original"===this.options.helper)return!1;if("invalid"==this.options.revert&&!i||"valid"==this.options.revert&&i||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,i)){var n=this;e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){n._trigger("stop",t)!==!1&&n._clear()})}else this._trigger("stop",t)!==!1&&this._clear();return!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){var i=this.options.handle&&e(this.options.handle,this.element).length?!1:!0;return e(this.options.handle,this.element).find("*").andSelf().each(function(){this==t.target&&(i=!0)}),i},_createHelper:function(t){var i=this.options,a=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t])):"clone"==i.helper?this.element.clone().removeAttr("id"):this.element;return a.parents("body").length||a.appendTo("parent"==i.appendTo?this.element[0].parentNode:i.appendTo),a[0]==this.element[0]||/(fixed|absolute)/.test(a.css("position"))||a.css("position","absolute"),a},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"==this.cssPosition&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&"html"==this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"==this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;if("parent"==t.containment&&(t.containment=this.helper[0].parentNode),("document"==t.containment||"window"==t.containment)&&(this.containment=["document"==t.containment?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,"document"==t.containment?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,("document"==t.containment?0:e(window).scrollLeft())+e("document"==t.containment?document:window).width()-this.helperProportions.width-this.margins.left,("document"==t.containment?0:e(window).scrollTop())+(e("document"==t.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(t.containment)||t.containment.constructor==Array)t.containment.constructor==Array&&(this.containment=t.containment);else{var i=e(t.containment),a=i[0];if(!a)return;i.offset();var s="hidden"!=e(a).css("overflow");this.containment=[(parseInt(e(a).css("borderLeftWidth"),10)||0)+(parseInt(e(a).css("paddingLeft"),10)||0),(parseInt(e(a).css("borderTopWidth"),10)||0)+(parseInt(e(a).css("paddingTop"),10)||0),(s?Math.max(a.scrollWidth,a.offsetWidth):a.offsetWidth)-(parseInt(e(a).css("borderLeftWidth"),10)||0)-(parseInt(e(a).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(s?Math.max(a.scrollHeight,a.offsetHeight):a.offsetHeight)-(parseInt(e(a).css("borderTopWidth"),10)||0)-(parseInt(e(a).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i}},_convertPositionTo:function(t,i){i||(i=this.position);var a="absolute"==t?1:-1,s=(this.options,"absolute"!=this.cssPosition||this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent),n=/(html|body)/i.test(s[0].tagName);return{top:i.top+this.offset.relative.top*a+this.offset.parent.top*a-("fixed"==this.cssPosition?-this.scrollParent.scrollTop():n?0:s.scrollTop())*a,left:i.left+this.offset.relative.left*a+this.offset.parent.left*a-("fixed"==this.cssPosition?-this.scrollParent.scrollLeft():n?0:s.scrollLeft())*a}},_generatePosition:function(t){var i=this.options,a="absolute"!=this.cssPosition||this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,s=/(html|body)/i.test(a[0].tagName),n=t.pageX,r=t.pageY;if(this.originalPosition){var o;if(this.containment){if(this.relative_container){var l=this.relative_container.offset();o=[this.containment[0]+l.left,this.containment[1]+l.top,this.containment[2]+l.left,this.containment[3]+l.top]}else o=this.containment;t.pageX-this.offset.click.left<o[0]&&(n=o[0]+this.offset.click.left),t.pageY-this.offset.click.top<o[1]&&(r=o[1]+this.offset.click.top),t.pageX-this.offset.click.left>o[2]&&(n=o[2]+this.offset.click.left),t.pageY-this.offset.click.top>o[3]&&(r=o[3]+this.offset.click.top)}if(i.grid){var h=i.grid[1]?this.originalPageY+Math.round((r-this.originalPageY)/i.grid[1])*i.grid[1]:this.originalPageY;r=o?h-this.offset.click.top<o[1]||h-this.offset.click.top>o[3]?h-this.offset.click.top<o[1]?h+i.grid[1]:h-i.grid[1]:h:h;var u=i.grid[0]?this.originalPageX+Math.round((n-this.originalPageX)/i.grid[0])*i.grid[0]:this.originalPageX;n=o?u-this.offset.click.left<o[0]||u-this.offset.click.left>o[2]?u-this.offset.click.left<o[0]?u+i.grid[0]:u-i.grid[0]:u:u}}return{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"==this.cssPosition?-this.scrollParent.scrollTop():s?0:a.scrollTop()),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"==this.cssPosition?-this.scrollParent.scrollLeft():s?0:a.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]==this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,i,a){return a=a||this._uiHash(),e.ui.plugin.call(this,t,[i,a]),"drag"==t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,i,a)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i){var a=e(this).data("draggable"),s=a.options,n=e.extend({},i,{item:a.element});a.sortables=[],e(s.connectToSortable).each(function(){var i=e.data(this,"sortable");i&&!i.options.disabled&&(a.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i){var a=e(this).data("draggable"),s=e.extend({},i,{item:a.element});e.each(a.sortables,function(){this.instance.isOver?(this.instance.isOver=0,a.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"==a.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,s))})},drag:function(t,i){var a=e(this).data("draggable"),s=this;e.each(a.sortables,function(){var n=!1,r=this;this.instance.positionAbs=a.positionAbs,this.instance.helperProportions=a.helperProportions,this.instance.offset.click=a.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(n=!0,e.each(a.sortables,function(){return this.instance.positionAbs=a.positionAbs,this.instance.helperProportions=a.helperProportions,this.instance.offset.click=a.offset.click,this!=r&&this.instance._intersectsWith(this.instance.containerCache)&&e.ui.contains(r.instance.element[0],this.instance.element[0])&&(n=!1),n})),n?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(s).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=a.offset.click.top,this.instance.offset.click.left=a.offset.click.left,this.instance.offset.parent.left-=a.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=a.offset.parent.top-this.instance.offset.parent.top,a._trigger("toSortable",t),a.dropped=this.instance.element,a.currentItem=a.element,this.instance.fromOutside=a),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),a._trigger("fromSortable",t),a.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),i=e(this).data("draggable").options;t.css("cursor")&&(i._cursor=t.css("cursor")),t.css("cursor",i.cursor)},stop:function(){var t=e(this).data("draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i){var a=e(i.helper),s=e(this).data("draggable").options;a.css("opacity")&&(s._opacity=a.css("opacity")),a.css("opacity",s.opacity)},stop:function(t,i){var a=e(this).data("draggable").options;a._opacity&&e(i.helper).css("opacity",a._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("draggable");t.scrollParent[0]!=document&&"HTML"!=t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var i=e(this).data("draggable"),a=i.options,s=!1;i.scrollParent[0]!=document&&"HTML"!=i.scrollParent[0].tagName?(a.axis&&"x"==a.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-t.pageY<a.scrollSensitivity?i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop+a.scrollSpeed:t.pageY-i.overflowOffset.top<a.scrollSensitivity&&(i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop-a.scrollSpeed)),a.axis&&"y"==a.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-t.pageX<a.scrollSensitivity?i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft+a.scrollSpeed:t.pageX-i.overflowOffset.left<a.scrollSensitivity&&(i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft-a.scrollSpeed))):(a.axis&&"x"==a.axis||(t.pageY-e(document).scrollTop()<a.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-a.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<a.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+a.scrollSpeed))),a.axis&&"y"==a.axis||(t.pageX-e(document).scrollLeft()<a.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-a.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<a.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+a.scrollSpeed)))),s!==!1&&e.ui.ddmanager&&!a.dropBehaviour&&e.ui.ddmanager.prepareOffsets(i,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("draggable"),i=t.options;t.snapElements=[],e(i.snap.constructor!=String?i.snap.items||":data(draggable)":i.snap).each(function(){var i=e(this),a=i.offset();this!=t.element[0]&&t.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:a.top,left:a.left})})},drag:function(t,i){for(var a=e(this).data("draggable"),s=a.options,n=s.snapTolerance,r=i.offset.left,o=r+a.helperProportions.width,l=i.offset.top,h=l+a.helperProportions.height,u=a.snapElements.length-1;u>=0;u--){var d=a.snapElements[u].left,c=d+a.snapElements[u].width,p=a.snapElements[u].top,m=p+a.snapElements[u].height;if(r>d-n&&c+n>r&&l>p-n&&m+n>l||r>d-n&&c+n>r&&h>p-n&&m+n>h||o>d-n&&c+n>o&&l>p-n&&m+n>l||o>d-n&&c+n>o&&h>p-n&&m+n>h){if("inner"!=s.snapMode){var f=n>=Math.abs(p-h),g=n>=Math.abs(m-l),v=n>=Math.abs(d-o),y=n>=Math.abs(c-r);f&&(i.position.top=a._convertPositionTo("relative",{top:p-a.helperProportions.height,left:0}).top-a.margins.top),g&&(i.position.top=a._convertPositionTo("relative",{top:m,left:0}).top-a.margins.top),v&&(i.position.left=a._convertPositionTo("relative",{top:0,left:d-a.helperProportions.width}).left-a.margins.left),y&&(i.position.left=a._convertPositionTo("relative",{top:0,left:c}).left-a.margins.left)}var b=f||g||v||y;if("outer"!=s.snapMode){var f=n>=Math.abs(p-l),g=n>=Math.abs(m-h),v=n>=Math.abs(d-r),y=n>=Math.abs(c-o);f&&(i.position.top=a._convertPositionTo("relative",{top:p,left:0}).top-a.margins.top),g&&(i.position.top=a._convertPositionTo("relative",{top:m-a.helperProportions.height,left:0}).top-a.margins.top),v&&(i.position.left=a._convertPositionTo("relative",{top:0,left:d}).left-a.margins.left),y&&(i.position.left=a._convertPositionTo("relative",{top:0,left:c-a.helperProportions.width}).left-a.margins.left)}!a.snapElements[u].snapping&&(f||g||v||y||b)&&a.options.snap.snap&&a.options.snap.snap.call(a.element,t,e.extend(a._uiHash(),{snapItem:a.snapElements[u].item})),a.snapElements[u].snapping=f||g||v||y||b}else a.snapElements[u].snapping&&a.options.snap.release&&a.options.snap.release.call(a.element,t,e.extend(a._uiHash(),{snapItem:a.snapElements[u].item})),a.snapElements[u].snapping=!1}}}),e.ui.plugin.add("draggable","stack",{start:function(){var t=e(this).data("draggable").options,i=e.makeArray(e(t.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});if(i.length){var a=parseInt(i[0].style.zIndex)||0;e(i).each(function(e){this.style.zIndex=a+e}),this[0].style.zIndex=a+i.length}}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i){var a=e(i.helper),s=e(this).data("draggable").options;a.css("zIndex")&&(s._zIndex=a.css("zIndex")),a.css("zIndex",s.zIndex)},stop:function(t,i){var a=e(this).data("draggable").options;a._zIndex&&e(i.helper).css("zIndex",a._zIndex)}})})(jQuery);(function(e){e.widget("ui.droppable",{version:"1.9.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var t=this.options,i=t.accept;this.isover=0,this.isout=1,this.accept=e.isFunction(i)?i:function(e){return e.is(i)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){for(var t=e.ui.ddmanager.droppables[this.options.scope],i=0;t.length>i;i++)t[i]==this&&t.splice(i,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){"accept"==t&&(this.accept=e.isFunction(i)?i:function(e){return e.is(i)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!=this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!=this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var a=i||e.ui.ddmanager.current;if(!a||(a.currentItem||a.element)[0]==this.element[0])return!1;var s=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"droppable");return t.options.greedy&&!t.options.disabled&&t.options.scope==a.options.scope&&t.accept.call(t.element[0],a.currentItem||a.element)&&e.ui.intersect(a,e.extend(t,{offset:t.element.offset()}),t.options.tolerance)?(s=!0,!1):undefined}),s?!1:this.accept.call(this.element[0],a.currentItem||a.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(a)),this.element):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(t,i,a){if(!i.offset)return!1;var s=(t.positionAbs||t.position.absolute).left,n=s+t.helperProportions.width,r=(t.positionAbs||t.position.absolute).top,o=r+t.helperProportions.height,l=i.offset.left,h=l+i.proportions.width,u=i.offset.top,d=u+i.proportions.height;switch(a){case"fit":return s>=l&&h>=n&&r>=u&&d>=o;case"intersect":return s+t.helperProportions.width/2>l&&h>n-t.helperProportions.width/2&&r+t.helperProportions.height/2>u&&d>o-t.helperProportions.height/2;case"pointer":var c=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,p=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,m=e.ui.isOver(p,c,u,l,i.proportions.height,i.proportions.width);return m;case"touch":return(r>=u&&d>=r||o>=u&&d>=o||u>r&&o>d)&&(s>=l&&h>=s||n>=l&&h>=n||l>s&&n>h);default:return!1}},e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var a=e.ui.ddmanager.droppables[t.options.scope]||[],s=i?i.type:null,n=(t.currentItem||t.element).find(":data(droppable)").andSelf();e:for(var r=0;a.length>r;r++)if(!(a[r].options.disabled||t&&!a[r].accept.call(a[r].element[0],t.currentItem||t.element))){for(var o=0;n.length>o;o++)if(n[o]==a[r].element[0]){a[r].proportions.height=0;continue e}a[r].visible="none"!=a[r].element.css("display"),a[r].visible&&("mousedown"==s&&a[r]._activate.call(a[r],i),a[r].offset=a[r].element.offset(),a[r].proportions={width:a[r].element[0].offsetWidth,height:a[r].element[0].offsetHeight})}},drop:function(t,i){var a=!1;return e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(a=this._drop.call(this,i)||a),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,i)))}),a},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var a=e.ui.intersect(t,this,this.options.tolerance),s=a||1!=this.isover?a&&0==this.isover?"isover":null:"isout";if(s){var n;if(this.options.greedy){var r=this.options.scope,o=this.element.parents(":data(droppable)").filter(function(){return e.data(this,"droppable").options.scope===r});o.length&&(n=e.data(o[0],"droppable"),n.greedyChild="isover"==s?1:0)}n&&"isover"==s&&(n.isover=0,n.isout=1,n._out.call(n,i)),this[s]=1,this["isout"==s?"isover":"isout"]=0,this["isover"==s?"_over":"_out"].call(this,i),n&&"isout"==s&&(n.isout=0,n.isover=1,n._over.call(n,i))}}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}}})(jQuery);jQuery.effects||function(e,t){var i=e.uiBackCompat!==!1,a="ui-effects-";e.effects={effect:{}},function(t,i){function a(e,t,i){var a=c[t.type]||{};return null==e?i||!t.def?null:t.def:(e=a.floor?~~e:parseFloat(e),isNaN(e)?t.def:a.mod?(e+a.mod)%a.mod:0>e?0:e>a.max?a.max:e)}function s(e){var a=u(),s=a._rgba=[];return e=e.toLowerCase(),m(l,function(t,n){var r,o=n.re.exec(e),h=o&&n.parse(o),l=n.space||"rgba";return h?(r=a[l](h),a[d[l].cache]=r[d[l].cache],s=a._rgba=r._rgba,!1):i}),s.length?("0,0,0,0"===s.join()&&t.extend(s,r.transparent),a):r[e]}function n(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var r,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),h=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],u=t.Color=function(e,i,a,s){return new t.Color.fn.parse(e,i,a,s)},d={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},c={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},p=u.support={},f=t("<p>")[0],m=t.each;f.style.cssText="background-color:rgba(1,1,1,.5)",p.rgba=f.style.backgroundColor.indexOf("rgba")>-1,m(d,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),u.fn=t.extend(u.prototype,{parse:function(n,o,h,l){if(n===i)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(o),o=i);var c=this,p=t.type(n),f=this._rgba=[];return o!==i&&(n=[n,o,h,l],p="array"),"string"===p?this.parse(s(n)||r._default):"array"===p?(m(d.rgba.props,function(e,t){f[t.idx]=a(n[t.idx],t)}),this):"object"===p?(n instanceof u?m(d,function(e,t){n[t.cache]&&(c[t.cache]=n[t.cache].slice())}):m(d,function(t,i){var s=i.cache;m(i.props,function(e,t){if(!c[s]&&i.to){if("alpha"===e||null==n[e])return;c[s]=i.to(c._rgba)}c[s][t.idx]=a(n[e],t,!0)}),c[s]&&0>e.inArray(null,c[s].slice(0,3))&&(c[s][3]=1,i.from&&(c._rgba=i.from(c[s])))}),this):i},is:function(e){var t=u(e),a=!0,s=this;return m(d,function(e,n){var r,o=t[n.cache];return o&&(r=s[n.cache]||n.to&&n.to(s._rgba)||[],m(n.props,function(e,t){return null!=o[t.idx]?a=o[t.idx]===r[t.idx]:i})),a}),a},_space:function(){var e=[],t=this;return m(d,function(i,a){t[a.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var i=u(e),s=i._space(),n=d[s],r=0===this.alpha()?u("transparent"):this,o=r[n.cache]||n.to(r._rgba),h=o.slice();return i=i[n.cache],m(n.props,function(e,s){var n=s.idx,r=o[n],l=i[n],u=c[s.type]||{};null!==l&&(null===r?h[n]=l:(u.mod&&(l-r>u.mod/2?r+=u.mod:r-l>u.mod/2&&(r-=u.mod)),h[n]=a((l-r)*t+r,s)))}),this[s](h)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),a=i.pop(),s=u(e)._rgba;return u(t.map(i,function(e,t){return(1-a)*s[t]+a*e}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),a=i.pop();return e&&i.push(~~(255*a)),"#"+t.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),u.fn.parse.prototype=u.fn,d.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,a=e[0]/255,s=e[1]/255,n=e[2]/255,r=e[3],o=Math.max(a,s,n),h=Math.min(a,s,n),l=o-h,u=o+h,d=.5*u;return t=h===o?0:a===o?60*(s-n)/l+360:s===o?60*(n-a)/l+120:60*(a-s)/l+240,i=0===d||1===d?d:.5>=d?l/u:l/(2-u),[Math.round(t)%360,i,d,null==r?1:r]},d.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],a=e[2],s=e[3],r=.5>=a?a*(1+i):a+i-a*i,o=2*a-r;return[Math.round(255*n(o,r,t+1/3)),Math.round(255*n(o,r,t)),Math.round(255*n(o,r,t-1/3)),s]},m(d,function(e,s){var n=s.props,r=s.cache,o=s.to,l=s.from;u.fn[e]=function(e){if(o&&!this[r]&&(this[r]=o(this._rgba)),e===i)return this[r].slice();var s,h=t.type(e),d="array"===h||"object"===h?e:arguments,c=this[r].slice();return m(n,function(e,t){var i=d["object"===h?e:t.idx];null==i&&(i=c[t.idx]),c[t.idx]=a(i,t)}),l?(s=u(l(c)),s[r]=c,s):u(c)},m(n,function(i,a){u.fn[i]||(u.fn[i]=function(s){var n,r=t.type(s),o="alpha"===i?this._hsla?"hsla":"rgba":e,l=this[o](),u=l[a.idx];return"undefined"===r?u:("function"===r&&(s=s.call(this,u),r=t.type(s)),null==s&&a.empty?this:("string"===r&&(n=h.exec(s),n&&(s=u+parseFloat(n[2])*("+"===n[1]?1:-1))),l[a.idx]=s,this[o](l)))})})}),m(o,function(e,i){t.cssHooks[i]={set:function(e,a){var n,r,o="";if("string"!==t.type(a)||(n=s(a))){if(a=u(n||a),!p.rgba&&1!==a._rgba[3]){for(r="backgroundColor"===i?e.parentNode:e;(""===o||"transparent"===o)&&r&&r.style;)try{o=t.css(r,"backgroundColor"),r=r.parentNode}catch(h){}a=a.blend(o&&"transparent"!==o?o:"_default")}a=a.toRgbaString()}try{e.style[i]=a}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=u(e.elem,i),e.end=u(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}}),t.cssHooks.borderColor={expand:function(e){var t={};return m(["Top","Right","Bottom","Left"],function(i,a){t["border"+a+"Color"]=e}),t}},r=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(){var t,i,a=this.ownerDocument.defaultView?this.ownerDocument.defaultView.getComputedStyle(this,null):this.currentStyle,s={};if(a&&a.length&&a[0]&&a[a[0]])for(i=a.length;i--;)t=a[i],"string"==typeof a[t]&&(s[e.camelCase(t)]=a[t]);else for(t in a)"string"==typeof a[t]&&(s[t]=a[t]);return s}function a(t,i){var a,s,r={};for(a in i)s=i[a],t[a]!==s&&(n[a]||(e.fx.step[a]||!isNaN(parseFloat(s)))&&(r[a]=s));return r}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(jQuery.style(e.elem,i,e.end),e.setAttr=!0)}}),e.effects.animateClass=function(t,n,r,o){var h=e.speed(n,r,o);return this.queue(function(){var n,r=e(this),o=r.attr("class")||"",l=h.children?r.find("*").andSelf():r;l=l.map(function(){var t=e(this);return{el:t,start:i.call(this)}}),n=function(){e.each(s,function(e,i){t[i]&&r[i+"Class"](t[i])})},n(),l=l.map(function(){return this.end=i.call(this.el[0]),this.diff=a(this.start,this.end),this}),r.attr("class",o),l=l.map(function(){var t=this,i=e.Deferred(),a=jQuery.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,a),i.promise()}),e.when.apply(e,l.get()).done(function(){n(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(r[0])})})},e.fn.extend({_addClass:e.fn.addClass,addClass:function(t,i,a,s){return i?e.effects.animateClass.call(this,{add:t},i,a,s):this._addClass(t)},_removeClass:e.fn.removeClass,removeClass:function(t,i,a,s){return i?e.effects.animateClass.call(this,{remove:t},i,a,s):this._removeClass(t)},_toggleClass:e.fn.toggleClass,toggleClass:function(i,a,s,n,r){return"boolean"==typeof a||a===t?s?e.effects.animateClass.call(this,a?{add:i}:{remove:i},s,n,r):this._toggleClass(i,a):e.effects.animateClass.call(this,{toggle:i},a,s,n)},switchClass:function(t,i,a,s,n){return e.effects.animateClass.call(this,{add:i,remove:t},a,s,n)}})}(),function(){function s(t,i,a,s){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(s=i,a=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(s=a,a=i,i={}),e.isFunction(a)&&(s=a,a=null),i&&e.extend(t,i),a=a||i.duration,t.duration=e.fx.off?0:"number"==typeof a?a:a in e.fx.speeds?e.fx.speeds[a]:e.fx.speeds._default,t.complete=s||i.complete,t}function n(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?!1:i&&e.effects[t]?!1:!0}e.extend(e.effects,{version:"1.9.2",save:function(e,t){for(var i=0;t.length>i;i++)null!==t[i]&&e.data(a+t[i],e[0].style[t[i]])},restore:function(e,i){var s,n;for(n=0;i.length>n;n++)null!==i[n]&&(s=e.data(a+i[n]),s===t&&(s=""),e.css(i[n],s))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var i,a;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":a=0;break;case"center":a=.5;break;case"right":a=1;break;default:a=e[1]/t.width}return{x:a,y:i}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},a=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),s={width:t.width(),height:t.height()},n=document.activeElement;try{n.id}catch(r){n=document.body}return t.wrap(a),(t[0]===n||e.contains(t[0],n))&&e(n).focus(),a=t.parent(),"static"===t.css("position")?(a.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,a){i[a]=t.css(a),isNaN(parseInt(i[a],10))&&(i[a]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(s),a.css(i).show()},removeWrapper:function(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t},setTransition:function(t,i,a,s){return s=s||{},e.each(i,function(e,i){var n=t.cssUnit(i);n[0]>0&&(s[i]=n[0]*a+n[1])}),s}}),e.fn.extend({effect:function(){function t(t){function i(){e.isFunction(n)&&n.call(s[0]),e.isFunction(t)&&t()}var s=e(this),n=a.complete,r=a.mode;(s.is(":hidden")?"hide"===r:"show"===r)?i():o.call(s[0],a,i)}var a=s.apply(this,arguments),n=a.mode,r=a.queue,o=e.effects.effect[a.effect],h=!o&&i&&e.effects[a.effect];return e.fx.off||!o&&!h?n?this[n](a.duration,a.complete):this.each(function(){a.complete&&a.complete.call(this)}):o?r===!1?this.each(t):this.queue(r||"fx",t):h.call(this,{options:a,duration:a.duration,callback:a.complete,mode:a.mode})},_show:e.fn.show,show:function(e){if(n(e))return this._show.apply(this,arguments);var t=s.apply(this,arguments);return t.mode="show",this.effect.call(this,t)},_hide:e.fn.hide,hide:function(e){if(n(e))return this._hide.apply(this,arguments);var t=s.apply(this,arguments);return t.mode="hide",this.effect.call(this,t)},__toggle:e.fn.toggle,toggle:function(t){if(n(t)||"boolean"==typeof t||e.isFunction(t))return this.__toggle.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)},cssUnit:function(t){var i=this.css(t),a=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(a=[parseFloat(i),t])}),a}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}()}(jQuery);(function(e){var t=/up|down|vertical/,i=/up|left|vertical|horizontal/;e.effects.effect.blind=function(a,s){var n,r,o,l=e(this),h=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(l,a.mode||"hide"),d=a.direction||"up",c=t.test(d),p=c?"height":"width",m=c?"top":"left",f=i.test(d),g={},v="show"===u;l.parent().is(".ui-effects-wrapper")?e.effects.save(l.parent(),h):e.effects.save(l,h),l.show(),n=e.effects.createWrapper(l).css({overflow:"hidden"}),r=n[p](),o=parseFloat(n.css(m))||0,g[p]=v?r:0,f||(l.css(c?"bottom":"right",0).css(c?"top":"left","auto").css({position:"absolute"}),g[m]=v?o:r+o),v&&(n.css(p,0),f||n.css(m,o+r)),n.animate(g,{duration:a.duration,easing:a.easing,queue:!1,complete:function(){"hide"===u&&l.hide(),e.effects.restore(l,h),e.effects.removeWrapper(l),s()}})}})(jQuery);(function(e){e.effects.effect.bounce=function(t,i){var a,s,n,r=e(this),o=["position","top","bottom","left","right","height","width"],l=e.effects.setMode(r,t.mode||"effect"),h="hide"===l,u="show"===l,d=t.direction||"up",c=t.distance,p=t.times||5,m=2*p+(u||h?1:0),f=t.duration/m,g=t.easing,v="up"===d||"down"===d?"top":"left",y="up"===d||"left"===d,b=r.queue(),_=b.length;for((u||h)&&o.push("opacity"),e.effects.save(r,o),r.show(),e.effects.createWrapper(r),c||(c=r["top"===v?"outerHeight":"outerWidth"]()/3),u&&(n={opacity:1},n[v]=0,r.css("opacity",0).css(v,y?2*-c:2*c).animate(n,f,g)),h&&(c/=Math.pow(2,p-1)),n={},n[v]=0,a=0;p>a;a++)s={},s[v]=(y?"-=":"+=")+c,r.animate(s,f,g).animate(n,f,g),c=h?2*c:c/2;h&&(s={opacity:0},s[v]=(y?"-=":"+=")+c,r.animate(s,f,g)),r.queue(function(){h&&r.hide(),e.effects.restore(r,o),e.effects.removeWrapper(r),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,m+1))),r.dequeue()}})(jQuery);(function(e){e.effects.effect.clip=function(t,i){var a,s,n,r=e(this),o=["position","top","bottom","left","right","height","width"],l=e.effects.setMode(r,t.mode||"hide"),h="show"===l,u=t.direction||"vertical",d="vertical"===u,c=d?"height":"width",p=d?"top":"left",m={};e.effects.save(r,o),r.show(),a=e.effects.createWrapper(r).css({overflow:"hidden"}),s="IMG"===r[0].tagName?a:r,n=s[c](),h&&(s.css(c,0),s.css(p,n/2)),m[c]=h?n:0,m[p]=h?0:n/2,s.animate(m,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){h||r.hide(),e.effects.restore(r,o),e.effects.removeWrapper(r),i()}})}})(jQuery);(function(e){e.effects.effect.drop=function(t,i){var a,s=e(this),n=["position","top","bottom","left","right","opacity","height","width"],r=e.effects.setMode(s,t.mode||"hide"),o="show"===r,l=t.direction||"left",h="up"===l||"down"===l?"top":"left",u="up"===l||"left"===l?"pos":"neg",d={opacity:o?1:0};e.effects.save(s,n),s.show(),e.effects.createWrapper(s),a=t.distance||s["top"===h?"outerHeight":"outerWidth"](!0)/2,o&&s.css("opacity",0).css(h,"pos"===u?-a:a),d[h]=(o?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+a,s.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===r&&s.hide(),e.effects.restore(s,n),e.effects.removeWrapper(s),i()}})}})(jQuery);(function(e){e.effects.effect.explode=function(t,i){function a(){b.push(this),b.length===d*c&&s()}function s(){p.css({visibility:"visible"}),e(b).remove(),f||p.hide(),i()}var n,r,o,l,h,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,c=d,p=e(this),m=e.effects.setMode(p,t.mode||"hide"),f="show"===m,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/c),y=Math.ceil(p.outerHeight()/d),b=[];for(n=0;d>n;n++)for(l=g.top+n*y,u=n-(d-1)/2,r=0;c>r;r++)o=g.left+r*v,h=r-(c-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-r*v,top:-n*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:o+(f?h*v:0),top:l+(f?u*y:0),opacity:f?0:1}).animate({left:o+(f?0:h*v),top:l+(f?0:u*y),opacity:f?1:0},t.duration||500,t.easing,a)}})(jQuery);(function(e){e.effects.effect.fade=function(t,i){var a=e(this),s=e.effects.setMode(a,t.mode||"toggle");a.animate({opacity:s},{queue:!1,duration:t.duration,easing:t.easing,complete:i})}})(jQuery);(function(e){e.effects.effect.fold=function(t,i){var a,s,n=e(this),r=["position","top","bottom","left","right","height","width"],o=e.effects.setMode(n,t.mode||"hide"),l="show"===o,h="hide"===o,u=t.size||15,d=/([0-9]+)%/.exec(u),c=!!t.horizFirst,p=l!==c,m=p?["width","height"]:["height","width"],f=t.duration/2,g={},v={};e.effects.save(n,r),n.show(),a=e.effects.createWrapper(n).css({overflow:"hidden"}),s=p?[a.width(),a.height()]:[a.height(),a.width()],d&&(u=parseInt(d[1],10)/100*s[h?0:1]),l&&a.css(c?{height:0,width:u}:{height:u,width:0}),g[m[0]]=l?s[0]:u,v[m[1]]=l?s[1]:0,a.animate(g,f,t.easing).animate(v,f,t.easing,function(){h&&n.hide(),e.effects.restore(n,r),e.effects.removeWrapper(n),i()})}})(jQuery);(function(e){e.effects.effect.highlight=function(t,i){var a=e(this),s=["backgroundImage","backgroundColor","opacity"],n=e.effects.setMode(a,t.mode||"show"),r={backgroundColor:a.css("backgroundColor")};"hide"===n&&(r.opacity=0),e.effects.save(a,s),a.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(r,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===n&&a.hide(),e.effects.restore(a,s),i()}})}})(jQuery);(function(e){e.effects.effect.pulsate=function(t,i){var a,s=e(this),n=e.effects.setMode(s,t.mode||"show"),r="show"===n,o="hide"===n,l=r||"hide"===n,h=2*(t.times||5)+(l?1:0),u=t.duration/h,d=0,c=s.queue(),p=c.length;for((r||!s.is(":visible"))&&(s.css("opacity",0).show(),d=1),a=1;h>a;a++)s.animate({opacity:d},u,t.easing),d=1-d;s.animate({opacity:d},u,t.easing),s.queue(function(){o&&s.hide(),i()}),p>1&&c.splice.apply(c,[1,0].concat(c.splice(p,h+1))),s.dequeue()}})(jQuery);(function(e){e.effects.effect.puff=function(t,i){var a=e(this),s=e.effects.setMode(a,t.mode||"hide"),n="hide"===s,r=parseInt(t.percent,10)||150,o=r/100,h={height:a.height(),width:a.width(),outerHeight:a.outerHeight(),outerWidth:a.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:s,complete:i,percent:n?r:100,from:n?h:{height:h.height*o,width:h.width*o,outerHeight:h.outerHeight*o,outerWidth:h.outerWidth*o}}),a.effect(t)},e.effects.effect.scale=function(t,i){var a=e(this),s=e.extend(!0,{},t),n=e.effects.setMode(a,t.mode||"effect"),r=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"hide"===n?0:100),o=t.direction||"both",h=t.origin,l={height:a.height(),width:a.width(),outerHeight:a.outerHeight(),outerWidth:a.outerWidth()},u={y:"horizontal"!==o?r/100:1,x:"vertical"!==o?r/100:1};s.effect="size",s.queue=!1,s.complete=i,"effect"!==n&&(s.origin=h||["middle","center"],s.restore=!0),s.from=t.from||("show"===n?{height:0,width:0,outerHeight:0,outerWidth:0}:l),s.to={height:l.height*u.y,width:l.width*u.x,outerHeight:l.outerHeight*u.y,outerWidth:l.outerWidth*u.x},s.fade&&("show"===n&&(s.from.opacity=0,s.to.opacity=1),"hide"===n&&(s.from.opacity=1,s.to.opacity=0)),a.effect(s)},e.effects.effect.size=function(t,i){var a,s,n,r=e(this),o=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],u=["fontSize"],d=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(r,t.mode||"effect"),f=t.restore||"effect"!==p,m=t.scale||"both",g=t.origin||["middle","center"],v=r.css("position"),y=f?o:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&r.show(),a={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()},"toggle"===t.mode&&"show"===p?(r.from=t.to||b,r.to=t.from||a):(r.from=t.from||("show"===p?b:a),r.to=t.to||("hide"===p?b:a)),n={from:{y:r.from.height/a.height,x:r.from.width/a.width},to:{y:r.to.height/a.height,x:r.to.width/a.width}},("box"===m||"both"===m)&&(n.from.y!==n.to.y&&(y=y.concat(d),r.from=e.effects.setTransition(r,d,n.from.y,r.from),r.to=e.effects.setTransition(r,d,n.to.y,r.to)),n.from.x!==n.to.x&&(y=y.concat(c),r.from=e.effects.setTransition(r,c,n.from.x,r.from),r.to=e.effects.setTransition(r,c,n.to.x,r.to))),("content"===m||"both"===m)&&n.from.y!==n.to.y&&(y=y.concat(u).concat(l),r.from=e.effects.setTransition(r,u,n.from.y,r.from),r.to=e.effects.setTransition(r,u,n.to.y,r.to)),e.effects.save(r,y),r.show(),e.effects.createWrapper(r),r.css("overflow","hidden").css(r.from),g&&(s=e.effects.getBaseline(g,a),r.from.top=(a.outerHeight-r.outerHeight())*s.y,r.from.left=(a.outerWidth-r.outerWidth())*s.x,r.to.top=(a.outerHeight-r.to.outerHeight)*s.y,r.to.left=(a.outerWidth-r.to.outerWidth)*s.x),r.css(r.from),("content"===m||"both"===m)&&(d=d.concat(["marginTop","marginBottom"]).concat(u),c=c.concat(["marginLeft","marginRight"]),l=o.concat(d).concat(c),r.find("*[width]").each(function(){var i=e(this),a={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&e.effects.save(i,l),i.from={height:a.height*n.from.y,width:a.width*n.from.x,outerHeight:a.outerHeight*n.from.y,outerWidth:a.outerWidth*n.from.x},i.to={height:a.height*n.to.y,width:a.width*n.to.x,outerHeight:a.height*n.to.y,outerWidth:a.width*n.to.x},n.from.y!==n.to.y&&(i.from=e.effects.setTransition(i,d,n.from.y,i.from),i.to=e.effects.setTransition(i,d,n.to.y,i.to)),n.from.x!==n.to.x&&(i.from=e.effects.setTransition(i,c,n.from.x,i.from),i.to=e.effects.setTransition(i,c,n.to.x,i.to)),i.css(i.from),i.animate(i.to,t.duration,t.easing,function(){f&&e.effects.restore(i,l)})})),r.animate(r.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){0===r.to.opacity&&r.css("opacity",r.from.opacity),"hide"===p&&r.hide(),e.effects.restore(r,y),f||("static"===v?r.css({position:"relative",top:r.to.top,left:r.to.left}):e.each(["top","left"],function(e,t){r.css(t,function(t,i){var a=parseInt(i,10),s=e?r.to.left:r.to.top;return"auto"===i?s+"px":a+s+"px"})})),e.effects.removeWrapper(r),i()}})}})(jQuery);(function(e){e.effects.effect.shake=function(t,i){var a,s=e(this),n=["position","top","bottom","left","right","height","width"],r=e.effects.setMode(s,t.mode||"effect"),o=t.direction||"left",h=t.distance||20,l=t.times||3,u=2*l+1,d=Math.round(t.duration/u),c="up"===o||"down"===o?"top":"left",p="up"===o||"left"===o,f={},m={},g={},v=s.queue(),y=v.length;for(e.effects.save(s,n),s.show(),e.effects.createWrapper(s),f[c]=(p?"-=":"+=")+h,m[c]=(p?"+=":"-=")+2*h,g[c]=(p?"-=":"+=")+2*h,s.animate(f,d,t.easing),a=1;l>a;a++)s.animate(m,d,t.easing).animate(g,d,t.easing);s.animate(m,d,t.easing).animate(f,d/2,t.easing).queue(function(){"hide"===r&&s.hide(),e.effects.restore(s,n),e.effects.removeWrapper(s),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),s.dequeue()}})(jQuery);(function(e){e.effects.effect.slide=function(t,i){var a,s=e(this),n=["position","top","bottom","left","right","width","height"],r=e.effects.setMode(s,t.mode||"show"),o="show"===r,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(s,n),s.show(),a=t.distance||s["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(s).css({overflow:"hidden"}),o&&s.css(l,u?isNaN(a)?"-"+a:-a:a),d[l]=(o?u?"+=":"-=":u?"-=":"+=")+a,s.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===r&&s.hide(),e.effects.restore(s,n),e.effects.removeWrapper(s),i()}})}})(jQuery);(function(e){e.effects.effect.transfer=function(t,i){var a=e(this),s=e(t.to),n="fixed"===s.css("position"),r=e("body"),o=n?r.scrollTop():0,h=n?r.scrollLeft():0,l=s.offset(),u={top:l.top-o,left:l.left-h,height:s.innerHeight(),width:s.innerWidth()},d=a.offset(),c=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.className).css({top:d.top-o,left:d.left-h,height:a.innerHeight(),width:a.innerWidth(),position:n?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){c.remove(),i()})}})(jQuery);(function(e){var t=!1;e.widget("ui.menu",{version:"1.9.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(i){var s=e(i.target).closest(".ui-menu-item");!t&&s.not(".ui-state-disabled").length&&(t=!0,this.select(i),s.has(".ui-menu").length?this.expand(i):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var i=e(t.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(i){e(i.target).closest(".ui-menu").length||this.collapseAll(i),t=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function i(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,a,n,r,o,h=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:h=!1,a=this.previousFilter||"",n=String.fromCharCode(t.keyCode),r=!1,clearTimeout(this.filterTimer),n===a?r=!0:n=a+n,o=RegExp("^"+i(n),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),s=r&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(n=String.fromCharCode(t.keyCode),o=RegExp("^"+i(n),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),s.length?(this.focus(t,s),s.length>1?(this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,i=this.options.icons.submenu,s=this.element.find(this.options.menus);s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),s=t.prev("a"),a=e("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(a),t.attr("aria-labelledby",s.attr("id"))}),t=s.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-—–\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,a,n,r,o;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,a=t.offset().top-this.activeMenu.offset().top-i-s,n=this.activeMenu.scrollTop(),r=this.activeMenu.height(),o=t.height(),0>a?this.activeMenu.scrollTop(n+a):a+o>r&&this.activeMenu.scrollTop(n+a-r+o))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[t]()),this.focus(i,s)},nextPage:function(t){var i,s,a;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,a=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-a}),this.focus(t,i)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(t),undefined)},previousPage:function(t){var i,s,a;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,a=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+a>0}),this.focus(t,i)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(t),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)}})})(jQuery);(function(e,t){e.widget("ui.progressbar",{version:"1.9.2",options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return e===t?this._value():(this._setOption("value",e),this)},_setOption:function(e,t){"value"===e&&(this.options.value=t,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),this._super(e,t)},_value:function(){var e=this.options.value;return"number"!=typeof e&&(e=0),Math.min(this.options.max,Math.max(this.min,e))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var e=this.value(),t=this._percentage();this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),this.valueDiv.toggle(e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(t.toFixed(0)+"%"),this.element.attr("aria-valuenow",e)}})})(jQuery);(function(e){e.widget("ui.resizable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var t=this,i=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=i.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor==String){"all"==this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw");var s=this.handles.split(",");this.handles={};for(var a=0;s.length>a;a++){var n=e.trim(s[a]),r="ui-resizable-"+n,o=e('<div class="ui-resizable-handle '+r+'"></div>');o.css({zIndex:i.zIndex}),"se"==n&&o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[n]=".ui-resizable-"+n,this.element.append(o)}}this._renderAxis=function(t){t=t||this.element;for(var i in this.handles){if(this.handles[i].constructor==String&&(this.handles[i]=e(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var s=e(this.handles[i],this.element),a=0;a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth();var n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");t.css(n,a),this._proportionallyResize()}e(this.handles[i]).length}},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!t.resizing){if(this.className)var e=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);t.axis=e&&e[1]?e[1]:"se"}}),i.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){i.disabled||(e(this).removeClass("ui-resizable-autohide"),t._handles.show())}).mouseleave(function(){i.disabled||t.resizing||(e(this).addClass("ui-resizable-autohide"),t._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){t(this.element);var i=this.element;this.originalElement.css({position:i.css("position"),width:i.outerWidth(),height:i.outerHeight(),top:i.css("top"),left:i.css("left")}).insertAfter(i),i.remove()}return this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_mouseCapture:function(t){var i=!1;for(var s in this.handles)e(this.handles[s])[0]==t.target&&(i=!0);return!this.options.disabled&&i},_mouseStart:function(i){var s=this.options,a=this.element.position(),n=this.element;this.resizing=!0,this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()},(n.is(".ui-draggable")||/absolute/.test(n.css("position")))&&n.css({position:"absolute",top:a.top,left:a.left}),this._renderProxy();var r=t(this.helper.css("left")),o=t(this.helper.css("top"));s.containment&&(r+=e(s.containment).scrollLeft()||0,o+=e(s.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:r,top:o},this.size=this._helper?{width:n.outerWidth(),height:n.outerHeight()}:{width:n.width(),height:n.height()},this.originalSize=this._helper?{width:n.outerWidth(),height:n.outerHeight()}:{width:n.width(),height:n.height()},this.originalPosition={left:r,top:o},this.sizeDiff={width:n.outerWidth()-n.width(),height:n.outerHeight()-n.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof s.aspectRatio?s.aspectRatio:this.originalSize.width/this.originalSize.height||1;var h=e(".ui-resizable-"+this.axis).css("cursor");return e("body").css("cursor","auto"==h?this.axis+"-resize":h),n.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(e){var t=this.helper,i=(this.options,this.originalMousePosition),s=this.axis,a=e.pageX-i.left||0,n=e.pageY-i.top||0,r=this._change[s];if(!r)return!1;var o=r.apply(this,[e,a,n]);return this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(o=this._updateRatio(o,e)),o=this._respectSize(o,e),this._propagate("resize",e),t.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(o),this._trigger("resize",e,this.ui()),!1},_mouseStop:function(t){this.resizing=!1;var i=this.options,s=this;if(this._helper){var a=this._proportionallyResizeElements,n=a.length&&/textarea/i.test(a[0].nodeName),r=n&&e.ui.hasScroll(a[0],"left")?0:s.sizeDiff.height,o=n?0:s.sizeDiff.width,h={width:s.helper.width()-o,height:s.helper.height()-r},l=parseInt(s.element.css("left"),10)+(s.position.left-s.originalPosition.left)||null,u=parseInt(s.element.css("top"),10)+(s.position.top-s.originalPosition.top)||null;i.animate||this.element.css(e.extend(h,{top:u,left:l})),s.helper.height(s.size.height),s.helper.width(s.size.width),this._helper&&!i.animate&&this._proportionallyResize()}return e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,s,a,n,r,o=this.options;r={minWidth:i(o.minWidth)?o.minWidth:0,maxWidth:i(o.maxWidth)?o.maxWidth:1/0,minHeight:i(o.minHeight)?o.minHeight:0,maxHeight:i(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=r.minHeight*this.aspectRatio,a=r.minWidth/this.aspectRatio,s=r.maxHeight*this.aspectRatio,n=r.maxWidth/this.aspectRatio,t>r.minWidth&&(r.minWidth=t),a>r.minHeight&&(r.minHeight=a),r.maxWidth>s&&(r.maxWidth=s),r.maxHeight>n&&(r.maxHeight=n)),this._vBoundaries=r},_updateCache:function(e){this.options,this.offset=this.helper.offset(),i(e.left)&&(this.position.left=e.left),i(e.top)&&(this.position.top=e.top),i(e.height)&&(this.size.height=e.height),i(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=(this.options,this.position),s=this.size,a=this.axis;return i(e.height)?e.width=e.height*this.aspectRatio:i(e.width)&&(e.height=e.width/this.aspectRatio),"sw"==a&&(e.left=t.left+(s.width-e.width),e.top=null),"nw"==a&&(e.top=t.top+(s.height-e.height),e.left=t.left+(s.width-e.width)),e},_respectSize:function(e,t){var s=(this.helper,this._vBoundaries),a=(this._aspectRatio||t.shiftKey,this.axis),n=i(e.width)&&s.maxWidth&&s.maxWidth<e.width,r=i(e.height)&&s.maxHeight&&s.maxHeight<e.height,o=i(e.width)&&s.minWidth&&s.minWidth>e.width,h=i(e.height)&&s.minHeight&&s.minHeight>e.height;o&&(e.width=s.minWidth),h&&(e.height=s.minHeight),n&&(e.width=s.maxWidth),r&&(e.height=s.maxHeight);var l=this.originalPosition.left+this.originalSize.width,u=this.position.top+this.size.height,d=/sw|nw|w/.test(a),c=/nw|ne|n/.test(a);o&&d&&(e.left=l-s.minWidth),n&&d&&(e.left=l-s.maxWidth),h&&c&&(e.top=u-s.minHeight),r&&c&&(e.top=u-s.maxHeight);var p=!e.width&&!e.height;return p&&!e.left&&e.top?e.top=null:p&&!e.top&&e.left&&(e.left=null),e},_proportionallyResize:function(){if(this.options,this._proportionallyResizeElements.length)for(var t=this.helper||this.element,i=0;this._proportionallyResizeElements.length>i;i++){var s=this._proportionallyResizeElements[i];if(!this.borderDif){var a=[s.css("borderTopWidth"),s.css("borderRightWidth"),s.css("borderBottomWidth"),s.css("borderLeftWidth")],n=[s.css("paddingTop"),s.css("paddingRight"),s.css("paddingBottom"),s.css("paddingLeft")];this.borderDif=e.map(a,function(e,t){var i=parseInt(e,10)||0,s=parseInt(n[t],10)||0;return i+s})}s.css({height:t.height()-this.borderDif[0]-this.borderDif[2]||0,width:t.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var t=this.element,i=this.options;if(this.elementOffset=t.offset(),this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var s=e.ui.ie6?1:0,a=e.ui.ie6?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-s+"px",top:this.elementOffset.top-s+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=(this.options,this.originalSize),s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=(this.options,this.originalSize),a=this.originalPosition;return{top:a.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!=t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("resizable"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).data("resizable"),a=s.options,n=s.originalSize,r=s.originalPosition,o={height:s.size.height-n.height||0,width:s.size.width-n.width||0,top:s.position.top-r.top||0,left:s.position.left-r.left||0},h=function(t,s){e(t).each(function(){var t=e(this),a=e(this).data("resizable-alsoresize"),n={},r=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(e,t){var i=(a[t]||0)+(o[t]||0);i&&i>=0&&(n[t]=i||null)}),t.css(n)})};"object"!=typeof a.alsoResize||a.alsoResize.nodeType?h(a.alsoResize):e.each(a.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).data("resizable"),s=i.options,a=i._proportionallyResizeElements,n=a.length&&/textarea/i.test(a[0].nodeName),r=n&&e.ui.hasScroll(a[0],"left")?0:i.sizeDiff.height,o=n?0:i.sizeDiff.width,h={width:i.size.width-o,height:i.size.height-r},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};a&&a.length&&e(a[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var i=e(this).data("resizable"),s=i.options,a=i.element,n=s.containment,r=n instanceof e?n.get(0):/parent/.test(n)?a.parent().get(0):n;if(r)if(i.containerElement=e(r),/document/.test(n)||n==document)i.containerOffset={left:0,top:0},i.containerPosition={left:0,top:0},i.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight};else{var o=e(r),h=[];e(["Top","Right","Left","Bottom"]).each(function(e,i){h[e]=t(o.css("padding"+i))}),i.containerOffset=o.offset(),i.containerPosition=o.position(),i.containerSize={height:o.innerHeight()-h[3],width:o.innerWidth()-h[1]};var l=i.containerOffset,u=i.containerSize.height,d=i.containerSize.width,c=e.ui.hasScroll(r,"left")?r.scrollWidth:d,p=e.ui.hasScroll(r)?r.scrollHeight:u;i.parentData={element:r,left:l.left,top:l.top,width:c,height:p}}},resize:function(t){var i=e(this).data("resizable"),s=i.options,a=(i.containerSize,i.containerOffset),n=(i.size,i.position),r=i._aspectRatio||t.shiftKey,o={top:0,left:0},h=i.containerElement;h[0]!=document&&/static/.test(h.css("position"))&&(o=a),n.left<(i._helper?a.left:0)&&(i.size.width=i.size.width+(i._helper?i.position.left-a.left:i.position.left-o.left),r&&(i.size.height=i.size.width/i.aspectRatio),i.position.left=s.helper?a.left:0),n.top<(i._helper?a.top:0)&&(i.size.height=i.size.height+(i._helper?i.position.top-a.top:i.position.top),r&&(i.size.width=i.size.height*i.aspectRatio),i.position.top=i._helper?a.top:0),i.offset.left=i.parentData.left+i.position.left,i.offset.top=i.parentData.top+i.position.top;var l=Math.abs((i._helper?i.offset.left-o.left:i.offset.left-o.left)+i.sizeDiff.width),u=Math.abs((i._helper?i.offset.top-o.top:i.offset.top-a.top)+i.sizeDiff.height),d=i.containerElement.get(0)==i.element.parent().get(0),c=/relative|absolute/.test(i.containerElement.css("position"));d&&c&&(l-=i.parentData.left),l+i.size.width>=i.parentData.width&&(i.size.width=i.parentData.width-l,r&&(i.size.height=i.size.width/i.aspectRatio)),u+i.size.height>=i.parentData.height&&(i.size.height=i.parentData.height-u,r&&(i.size.width=i.size.height*i.aspectRatio))},stop:function(){var t=e(this).data("resizable"),i=t.options,s=(t.position,t.containerOffset),a=t.containerPosition,n=t.containerElement,r=e(t.helper),o=r.offset(),h=r.outerWidth()-t.sizeDiff.width,l=r.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("resizable"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("resizable");t.options,t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("resizable");t.options,t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(t){var i=e(this).data("resizable"),s=i.options,a=i.size,n=i.originalSize,r=i.originalPosition,o=i.axis;s._aspectRatio||t.shiftKey,s.grid="number"==typeof s.grid?[s.grid,s.grid]:s.grid;var h=Math.round((a.width-n.width)/(s.grid[0]||1))*(s.grid[0]||1),l=Math.round((a.height-n.height)/(s.grid[1]||1))*(s.grid[1]||1);/^(se|s|e)$/.test(o)?(i.size.width=n.width+h,i.size.height=n.height+l):/^(ne)$/.test(o)?(i.size.width=n.width+h,i.size.height=n.height+l,i.position.top=r.top-l):/^(sw)$/.test(o)?(i.size.width=n.width+h,i.size.height=n.height+l,i.position.left=r.left-h):(i.size.width=n.width+h,i.size.height=n.height+l,i.position.top=r.top-l,i.position.left=r.left-h)}});var t=function(e){return parseInt(e,10)||0},i=function(e){return!isNaN(parseInt(e,10))}})(jQuery);(function(e){e.widget("ui.selectable",e.ui.mouse,{version:"1.9.2",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var t=this;this.element.addClass("ui-selectable"),this.dragged=!1;var i;this.refresh=function(){i=e(t.options.filter,t.element[0]),i.addClass("ui-selectee"),i.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=i.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var i=this;if(this.opos=[t.pageX,t.pageY],!this.options.disabled){var s=this.options;this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.clientX,top:t.clientY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().andSelf().each(function(){var s=e.data(this,"selectable-item");if(s){var a=!t.metaKey&&!t.ctrlKey||!s.$element.hasClass("ui-selected");return s.$element.removeClass(a?"ui-unselecting":"ui-selected").addClass(a?"ui-selecting":"ui-unselecting"),s.unselecting=!a,s.selecting=a,s.selected=a,a?i._trigger("selecting",t,{selecting:s.element}):i._trigger("unselecting",t,{unselecting:s.element}),!1}})}},_mouseDrag:function(t){var i=this;if(this.dragged=!0,!this.options.disabled){var s=this.options,a=this.opos[0],n=this.opos[1],r=t.pageX,o=t.pageY;if(a>r){var h=r;r=a,a=h}if(n>o){var h=o;o=n,n=h}return this.helper.css({left:a,top:n,width:r-a,height:o-n}),this.selectees.each(function(){var h=e.data(this,"selectable-item");if(h&&h.element!=i.element[0]){var l=!1;"touch"==s.tolerance?l=!(h.left>r||a>h.right||h.top>o||n>h.bottom):"fit"==s.tolerance&&(l=h.left>a&&r>h.right&&h.top>n&&o>h.bottom),l?(h.selected&&(h.$element.removeClass("ui-selected"),h.selected=!1),h.unselecting&&(h.$element.removeClass("ui-unselecting"),h.unselecting=!1),h.selecting||(h.$element.addClass("ui-selecting"),h.selecting=!0,i._trigger("selecting",t,{selecting:h.element}))):(h.selecting&&((t.metaKey||t.ctrlKey)&&h.startselected?(h.$element.removeClass("ui-selecting"),h.selecting=!1,h.$element.addClass("ui-selected"),h.selected=!0):(h.$element.removeClass("ui-selecting"),h.selecting=!1,h.startselected&&(h.$element.addClass("ui-unselecting"),h.unselecting=!0),i._trigger("unselecting",t,{unselecting:h.element}))),h.selected&&(t.metaKey||t.ctrlKey||h.startselected||(h.$element.removeClass("ui-selected"),h.selected=!1,h.$element.addClass("ui-unselecting"),h.unselecting=!0,i._trigger("unselecting",t,{unselecting:h.element}))))}}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,this.options,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}})})(jQuery);(function(e){var t=5;e.widget("ui.slider",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var i,s,a=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),r="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",o=[];for(this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(a.disabled?" ui-slider-disabled ui-disabled":"")),this.range=e([]),a.range&&(a.range===!0&&(a.values||(a.values=[this._valueMin(),this._valueMin()]),a.values.length&&2!==a.values.length&&(a.values=[a.values[0],a.values[0]])),this.range=e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+("min"===a.range||"max"===a.range?" ui-slider-range-"+a.range:""))),s=a.values&&a.values.length||1,i=n.length;s>i;i++)o.push(r);this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(e){e.preventDefault()}).mouseenter(function(){a.disabled||e(this).addClass("ui-state-hover")}).mouseleave(function(){e(this).removeClass("ui-state-hover")}).focus(function(){a.disabled?e(this).blur():(e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),e(this).addClass("ui-state-focus"))}).blur(function(){e(this).removeClass("ui-state-focus")}),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)}),this._on(this.handles,{keydown:function(i){var s,a,n,r,o=e(i.target).data("ui-slider-handle-index");switch(i.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(i.target).addClass("ui-state-active"),s=this._start(i,o),s===!1))return}switch(r=this.options.step,a=n=this.options.values&&this.options.values.length?this.values(o):this.value(),i.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(a+(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(a-(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(a===this._valueMax())return;n=this._trimAlignValue(a+r);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(a===this._valueMin())return;n=this._trimAlignValue(a-r)}this._slide(i,o,n)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}),this._refreshValue(),this._animateOff=!1},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,a,n,r,o,h,l,u=this,d=this.options;return d.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),a=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));a>i&&(a=i,n=e(this),r=t)}),d.range===!0&&this.values(1)===d.min&&(r+=1,n=e(this.handles[r])),o=this._start(t,r),o===!1?!1:(this._mouseSliding=!0,this._handleIndex=r,n.addClass("ui-state-active").focus(),h=n.offset(),l=!e(t.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-n.width()/2,top:t.pageY-h.top-n.height()/2-(parseInt(n.css("borderTopWidth"),10)||0)-(parseInt(n.css("borderBottomWidth"),10)||0)+(parseInt(n.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,r,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,a,n;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),a=this._valueMax()-this._valueMin(),n=this._valueMin()+s*a,this._trimAlignValue(n)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,a,n;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(a=this.values(),a[t]=i,n=this._trigger("slide",e,{handle:this.handles[t],value:i,values:a}),s=this.values(t?0:1),n!==!1&&this.values(t,i,!0))):i!==this.value()&&(n=this._trigger("slide",e,{handle:this.handles[t],value:i}),n!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(t,i){var s,a,n;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),undefined;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,a=arguments[0],n=0;s.length>n;n+=1)s[n]=this._trimAlignValue(a[n]),this._change(null,n);this._refreshValue()},_setOption:function(t,i){var s,a=0;switch(e.isArray(this.options.values)&&(a=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments),t){case"disabled":i?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.prop("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.prop("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;a>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,i,s,a,n,r=this.options.range,o=this.options,h=this,l=this._animateOff?!1:o.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,o.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:o.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:o.animate}))),t=i}):(s=this.value(),a=this._valueMin(),n=this._valueMax(),i=n!==a?100*((s-a)/(n-a)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,o.animate),"min"===r&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},o.animate),"max"===r&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:o.animate}),"min"===r&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},o.animate),"max"===r&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:o.animate}))}})})(jQuery);(function(e){e.widget("ui.sortable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,i){"disabled"===t?(this.options[t]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,i){var s=this;if(this.reverting)return!1;if(this.options.disabled||"static"==this.options.type)return!1;this._refreshItems(t);var a=null;if(e(t.target).parents().each(function(){return e.data(this,s.widgetName+"-item")==s?(a=e(this),!1):undefined}),e.data(t.target,s.widgetName+"-item")==s&&(a=e(t.target)),!a)return!1;if(this.options.handle&&!i){var n=!1;if(e(this.options.handle,a).find("*").andSelf().each(function(){this==t.target&&(n=!0)}),!n)return!1}return this.currentItem=a,this._removeCurrentsFromItems(),!0},_mouseStart:function(t,i,s){var a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&(e("body").css("cursor")&&(this._storedCursor=e("body").css("cursor")),e("body").css("cursor",a.cursor)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(var n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!a.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll){var i=this.options,s=!1;this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<i.scrollSensitivity?this.scrollParent[0].scrollTop=s=this.scrollParent[0].scrollTop+i.scrollSpeed:t.pageY-this.overflowOffset.top<i.scrollSensitivity&&(this.scrollParent[0].scrollTop=s=this.scrollParent[0].scrollTop-i.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<i.scrollSensitivity?this.scrollParent[0].scrollLeft=s=this.scrollParent[0].scrollLeft+i.scrollSpeed:t.pageX-this.overflowOffset.left<i.scrollSensitivity&&(this.scrollParent[0].scrollLeft=s=this.scrollParent[0].scrollLeft-i.scrollSpeed)):(t.pageY-e(document).scrollTop()<i.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-i.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<i.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+i.scrollSpeed)),t.pageX-e(document).scrollLeft()<i.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-i.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<i.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+i.scrollSpeed))),s!==!1&&e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"==this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"==this.options.axis||(this.helper[0].style.top=this.position.top+"px");for(var a=this.items.length-1;a>=0;a--){var n=this.items[a],r=n.item[0],o=this._intersectsWithPointer(n);if(o&&n.instance===this.currentContainer&&r!=this.currentItem[0]&&this.placeholder[1==o?"next":"prev"]()[0]!=r&&!e.contains(this.placeholder[0],r)&&("semi-dynamic"==this.options.type?!e.contains(this.element[0],r):!0)){if(this.direction=1==o?"down":"up","pointer"!=this.options.tolerance&&!this._intersectsWithSides(n))break;this._rearrange(t,n),this._trigger("change",t,this._uiHash());break}}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,a=this.placeholder.offset();this.reverting=!0,e(this.helper).animate({left:a.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:a.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"==this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!=this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,a=s+this.helperProportions.height,n=e.left,r=n+e.width,o=e.top,h=o+e.height,l=this.offset.click.top,u=this.offset.click.left,c=s+l>o&&h>s+l&&t+u>n&&r>t+u;return"pointer"==this.options.tolerance||this.options.forcePointerForContainers||"pointer"!=this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?c:t+this.helperProportions.width/2>n&&r>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>o&&h>a-this.helperProportions.height/2},_intersectsWithPointer:function(t){var i="x"===this.options.axis||e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.options.axis||e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),a=i&&s,n=this._getDragVerticalDirection(),r=this._getDragHorizontalDirection();return a?this.floating?r&&"right"==r||"down"==n?2:1:n&&("down"==n?2:1):!1},_intersectsWithSides:function(t){var i=e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),a=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"==n&&s||"left"==n&&!s:a&&("down"==a&&i||"up"==a&&!i)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!=e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!=e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor==String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var i=[],s=[],a=this._connectWith();if(a&&t)for(var n=a.length-1;n>=0;n--)for(var r=e(a[n]),o=r.length-1;o>=0;o--){var h=e.data(r[o],this.widgetName);h&&h!=this&&!h.options.disabled&&s.push([e.isFunction(h.options.items)?h.options.items.call(h.element):e(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}s.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var n=s.length-1;n>=0;n--)s[n][0].each(function(){i.push(this)});return e(i)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]==e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i=this.items,s=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],a=this._connectWith();if(a&&this.ready)for(var n=a.length-1;n>=0;n--)for(var r=e(a[n]),o=r.length-1;o>=0;o--){var h=e.data(r[o],this.widgetName);h&&h!=this&&!h.options.disabled&&(s.push([e.isFunction(h.options.items)?h.options.items.call(h.element[0],t,{item:this.currentItem}):e(h.options.items,h.element),h]),this.containers.push(h))}for(var n=s.length-1;n>=0;n--)for(var l=s[n][1],u=s[n][0],o=0,c=u.length;c>o;o++){var d=e(u[o]);d.data(this.widgetName+"-item",l),i.push({item:d,instance:l,width:0,height:0,left:0,top:0})}},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var i=this.items.length-1;i>=0;i--){var s=this.items[i];if(s.instance==this.currentContainer||!this.currentContainer||s.item[0]==this.currentItem[0]){var a=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item;t||(s.width=a.outerWidth(),s.height=a.outerHeight());var n=a.offset();s.left=n.left,s.top=n.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var i=this.containers.length-1;i>=0;i--){var n=this.containers[i].element.offset();this.containers[i].containerCache.left=n.left,this.containers[i].containerCache.top=n.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight()}return this},_createPlaceholder:function(t){t=t||this;var i=t.options;if(!i.placeholder||i.placeholder.constructor==String){var s=i.placeholder;i.placeholder={element:function(){var i=e(document.createElement(t.currentItem[0].nodeName)).addClass(s||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return s||(i.style.visibility="hidden"),i},update:function(e,a){(!s||i.forcePlaceholderSize)&&(a.height()||a.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),a.width()||a.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}}t.placeholder=e(i.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),i.placeholder.update(t,t.placeholder)},_contactContainers:function(t){for(var i=null,s=null,a=this.containers.length-1;a>=0;a--)if(!e.contains(this.currentItem[0],this.containers[a].element[0]))if(this._intersectsWith(this.containers[a].containerCache)){if(i&&e.contains(this.containers[a].element[0],i.element[0]))continue;i=this.containers[a],s=a}else this.containers[a].containerCache.over&&(this.containers[a]._trigger("out",t,this._uiHash(this)),this.containers[a].containerCache.over=0);if(i)if(1===this.containers.length)this.containers[s]._trigger("over",t,this._uiHash(this)),this.containers[s].containerCache.over=1;else{for(var n=1e4,r=null,o=this.containers[s].floating?"left":"top",h=this.containers[s].floating?"width":"height",l=this.positionAbs[o]+this.offset.click[o],u=this.items.length-1;u>=0;u--)if(e.contains(this.containers[s].element[0],this.items[u].item[0])&&this.items[u].item[0]!=this.currentItem[0]){var c=this.items[u].item.offset()[o],d=!1;Math.abs(c-l)>Math.abs(c+this.items[u][h]-l)&&(d=!0,c+=this.items[u][h]),n>Math.abs(c-l)&&(n=Math.abs(c-l),r=this.items[u],this.direction=d?"up":"down")}if(!r&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[s],r?this._rearrange(t,r,null,!0):this._rearrange(t,null,this.containers[s].element,!0),this._trigger("change",t,this._uiHash()),this.containers[s]._trigger("change",t,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[s]._trigger("over",t,this._uiHash(this)),this.containers[s].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"==i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!=i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(""==s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(""==s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"==this.cssPosition&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&"html"==this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"==this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;if("parent"==t.containment&&(t.containment=this.helper[0].parentNode),("document"==t.containment||"window"==t.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"==t.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"==t.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),!/^(document|window|parent)$/.test(t.containment)){var i=e(t.containment)[0],s=e(t.containment).offset(),a="hidden"!=e(i).css("overflow");this.containment=[s.left+(parseInt(e(i).css("borderLeftWidth"),10)||0)+(parseInt(e(i).css("paddingLeft"),10)||0)-this.margins.left,s.top+(parseInt(e(i).css("borderTopWidth"),10)||0)+(parseInt(e(i).css("paddingTop"),10)||0)-this.margins.top,s.left+(a?Math.max(i.scrollWidth,i.offsetWidth):i.offsetWidth)-(parseInt(e(i).css("borderLeftWidth"),10)||0)-(parseInt(e(i).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,s.top+(a?Math.max(i.scrollHeight,i.offsetHeight):i.offsetHeight)-(parseInt(e(i).css("borderTopWidth"),10)||0)-(parseInt(e(i).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"==t?1:-1,a=(this.options,"absolute"!=this.cssPosition||this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent),n=/(html|body)/i.test(a[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"==this.cssPosition?-this.scrollParent.scrollTop():n?0:a.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"==this.cssPosition?-this.scrollParent.scrollLeft():n?0:a.scrollLeft())*s}},_generatePosition:function(t){var i=this.options,s="absolute"!=this.cssPosition||this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(s[0].tagName);"relative"!=this.cssPosition||this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset());var n=t.pageX,r=t.pageY;if(this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(n=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(n=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)),i.grid)){var o=this.originalPageY+Math.round((r-this.originalPageY)/i.grid[1])*i.grid[1];r=this.containment?o-this.offset.click.top<this.containment[1]||o-this.offset.click.top>this.containment[3]?o-this.offset.click.top<this.containment[1]?o+i.grid[1]:o-i.grid[1]:o:o;var h=this.originalPageX+Math.round((n-this.originalPageX)/i.grid[0])*i.grid[0];n=this.containment?h-this.offset.click.left<this.containment[0]||h-this.offset.click.left>this.containment[2]?h-this.offset.click.left<this.containment[0]?h+i.grid[0]:h-i.grid[0]:h:h}return{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"==this.cssPosition?-this.scrollParent.scrollTop():a?0:s.scrollTop()),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"==this.cssPosition?-this.scrollParent.scrollLeft():a?0:s.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"==this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var a=this.counter;this._delay(function(){a==this.counter&&this.refreshPositions(!s)})},_clear:function(t,i){this.reverting=!1;var s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]==this.currentItem[0]){for(var a in this._storedCSS)("auto"==this._storedCSS[a]||"static"==this._storedCSS[a])&&(this._storedCSS[a]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!i&&s.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev==this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent==this.currentItem.parent()[0]||i||s.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(i||(s.push(function(e){this._trigger("remove",e,this._uiHash())}),s.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer))));for(var a=this.containers.length-1;a>=0;a--)i||s.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[a])),this.containers[a].containerCache.over&&(s.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[a])),this.containers[a].containerCache.over=0);if(this._storedCursor&&e("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"==this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!i){this._trigger("beforeStop",t,this._uiHash());for(var a=0;s.length>a;a++)s[a].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}if(i||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null,!i){for(var a=0;s.length>a;a++)s[a].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}})})(jQuery);(function(e){function t(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.widget("ui.spinner",{version:"1.9.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},i=this.element;return e.each(["min","max","step"],function(e,s){var a=i.attr(s);void 0!==a&&a.length&&(t[s]=a)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){if("culture"===e||"numberFormat"===e){var i=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(i)),void 0}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),this._super(e,t),"disabled"===e&&(t?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:t(function(e){this._super(e),this._value(this.element.val())}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:t(function(e){this._stepUp(e)}),_stepUp:function(e){this._spin((e||1)*this.options.step)},stepDown:t(function(e){this._stepDown(e)}),_stepDown:function(e){this._spin((e||1)*-this.options.step)},pageUp:t(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:t(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(t(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})})(jQuery);(function(e,t){function i(){return++a}function s(e){return e.hash.length>1&&e.href.replace(n,"")===location.href.replace(n,"").replace(/\s/g,"%20")}var a=0,n=/#.*$/;e.widget("ui.tabs",{version:"1.9.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var i=this,s=this.options,a=s.active,n=location.hash.substring(1);this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",s.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs(),null===a&&(n&&this.tabs.each(function(i,s){return e(s).attr("aria-controls")===n?(a=i,!1):t}),null===a&&(a=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===a||-1===a)&&(a=this.tabs.length?0:!1)),a!==!1&&(a=this.tabs.index(this.tabs.eq(a)),-1===a&&(a=s.collapsible?!1:0)),s.active=a,!s.collapsible&&s.active===!1&&this.anchors.length&&(s.active=0),e.isArray(s.disabled)&&(s.disabled=e.unique(s.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return i.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(this.options.active):e(),this._refresh(),this.active.length&&this.load(s.active)},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(i){var s=e(this.document[0].activeElement).closest("li"),a=this.tabs.index(s),n=!0;if(!this._handlePageNav(i)){switch(i.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:a++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,a--;break;case e.ui.keyCode.END:a=this.anchors.length-1;break;case e.ui.keyCode.HOME:a=0;break;case e.ui.keyCode.SPACE:return i.preventDefault(),clearTimeout(this.activating),this._activate(a),t;case e.ui.keyCode.ENTER:return i.preventDefault(),clearTimeout(this.activating),this._activate(a===this.options.active?!1:a),t;default:return}i.preventDefault(),clearTimeout(this.activating),a=this._focusNextTab(a,n),i.ctrlKey||(s.attr("aria-selected","false"),this.tabs.eq(a).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",a)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(i){return i.altKey&&i.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):i.altKey&&i.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):t},_findNextTab:function(t,i){function s(){return t>a&&(t=0),0>t&&(t=a),t}for(var a=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,i){return"active"===e?(this._activate(i),t):"disabled"===e?(this._setupDisabled(i),t):(this._super(e,i),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",i),i||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(i),"heightStyle"===e&&this._setupHeightStyle(i),t)},_tabId:function(e){return e.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(i,a){var n,r,o,h=e(a).uniqueId().attr("id"),l=e(a).closest("li"),u=l.attr("aria-controls");s(a)?(n=a.hash,r=t.element.find(t._sanitizeSelector(n))):(o=t._tabId(l),n="#"+o,r=t.element.find(n),r.length||(r=t._createPanel(o),r.insertAfter(t.panels[i-1]||t.tablist)),r.attr("aria-live","polite")),r.length&&(t.panels=t.panels.add(r)),u&&l.data("ui-tabs-aria-controls",u),l.attr({"aria-controls":n.substring(1),"aria-labelledby":h}),r.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var i,s=0;i=this.tabs[s];s++)t===!0||-1!==e.inArray(s,t)?e(i).addClass("ui-state-disabled").attr("aria-disabled","true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var i={click:function(e){e.preventDefault()}};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s,a=this.element.parent();"fill"===t?(e.support.minHeight||(s=a.css("overflow"),a.css("overflow","hidden")),i=a.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),s&&a.css("overflow",s),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,a=e(t.currentTarget),n=a.closest("li"),r=n[0]===s[0],o=r&&i.collapsible,h=o?e():this._getPanelForTab(n),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:o?e():n,newPanel:h};t.preventDefault(),n.hasClass("ui-state-disabled")||n.hasClass("ui-tabs-loading")||this.running||r&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=o?!1:this.tabs.index(n),this.active=r?e():n,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(n),t),this._toggle(t,u))},_toggle:function(t,i){function s(){n.running=!1,n._trigger("activate",t,i)}function a(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),r.length&&n.options.show?n._show(r,n.options.show,s):(r.show(),s())}var n=this,r=i.newPanel,o=i.oldPanel;this.running=!0,o.length&&this.options.hide?this._hide(o,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),a()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),o.hide(),a()),o.attr({"aria-expanded":"false","aria-hidden":"true"}),i.oldTab.attr("aria-selected","false"),r.length&&o.length?i.oldTab.attr("tabIndex",-1):r.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),r.attr({"aria-expanded":"true","aria-hidden":"false"}),i.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var s=this.options.disabled;s!==!1&&(i===t?s=!1:(i=this._getIndex(i),s=e.isArray(s)?e.map(s,function(e){return e!==i?e:null}):e.map(this.tabs,function(e,t){return t!==i?t:null})),this._setupDisabled(s))},disable:function(i){var s=this.options.disabled;if(s!==!0){if(i===t)s=!0;else{if(i=this._getIndex(i),-1!==e.inArray(i,s))return;s=e.isArray(s)?e.merge([i],s).sort():[i]}this._setupDisabled(s)}},load:function(t,i){t=this._getIndex(t);var a=this,n=this.tabs.eq(t),r=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),h={tab:n,panel:o};s(r[0])||(this.xhr=e.ajax(this._ajaxSettings(r,i,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(n.addClass("ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){o.html(e),a._trigger("load",i,h)},1)}).complete(function(e,t){setTimeout(function(){"abort"===t&&a.panels.stop(!1,!0),n.removeClass("ui-tabs-loading"),o.removeAttr("aria-busy"),e===a.xhr&&delete a.xhr},1)})))},_ajaxSettings:function(t,i,s){var a=this;return{url:t.attr("href"),beforeSend:function(t,n){return a._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:n},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),e.uiBackCompat!==!1&&(e.ui.tabs.prototype._ui=function(e,t){return{tab:e,panel:t,index:this.anchors.index(e)}},e.widget("ui.tabs",e.ui.tabs,{url:function(e,t){this.anchors.eq(e).attr("href",t)}}),e.widget("ui.tabs",e.ui.tabs,{options:{ajaxOptions:null,cache:!1},_create:function(){this._super();var i=this;this._on({tabsbeforeload:function(s,a){return e.data(a.tab[0],"cache.tabs")?(s.preventDefault(),t):(a.jqXHR.success(function(){i.options.cache&&e.data(a.tab[0],"cache.tabs",!0)}),t)}})},_ajaxSettings:function(t,i,s){var a=this.options.ajaxOptions;return e.extend({},a,{error:function(e,t){try{a.error(e,t,s.tab.closest("li").index(),s.tab[0])}catch(i){}}},this._superApply(arguments))},_setOption:function(e,t){"cache"===e&&t===!1&&this.anchors.removeData("cache.tabs"),this._super(e,t)},_destroy:function(){this.anchors.removeData("cache.tabs"),this._super()},url:function(e){this.anchors.eq(e).removeData("cache.tabs"),this._superApply(arguments)}}),e.widget("ui.tabs",e.ui.tabs,{abort:function(){this.xhr&&this.xhr.abort()}}),e.widget("ui.tabs",e.ui.tabs,{options:{spinner:"<em>Loading&#8230;</em>"},_create:function(){this._super(),this._on({tabsbeforeload:function(e,t){if(e.target===this.element[0]&&this.options.spinner){var i=t.tab.find("span"),s=i.html();i.html(this.options.spinner),t.jqXHR.complete(function(){i.html(s)})}}})}}),e.widget("ui.tabs",e.ui.tabs,{options:{enable:null,disable:null},enable:function(t){var i,s=this.options;(t&&s.disabled===!0||e.isArray(s.disabled)&&-1!==e.inArray(t,s.disabled))&&(i=!0),this._superApply(arguments),i&&this._trigger("enable",null,this._ui(this.anchors[t],this.panels[t]))},disable:function(t){var i,s=this.options;(t&&s.disabled===!1||e.isArray(s.disabled)&&-1===e.inArray(t,s.disabled))&&(i=!0),this._superApply(arguments),i&&this._trigger("disable",null,this._ui(this.anchors[t],this.panels[t]))}}),e.widget("ui.tabs",e.ui.tabs,{options:{add:null,remove:null,tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},add:function(i,s,a){a===t&&(a=this.anchors.length);var n,r,o=this.options,h=e(o.tabTemplate.replace(/#\{href\}/g,i).replace(/#\{label\}/g,s)),l=i.indexOf("#")?this._tabId(h):i.replace("#","");return h.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy",!0),h.attr("aria-controls",l),n=a>=this.tabs.length,r=this.element.find("#"+l),r.length||(r=this._createPanel(l),n?a>0?r.insertAfter(this.panels.eq(-1)):r.appendTo(this.element):r.insertBefore(this.panels[a])),r.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(),n?h.appendTo(this.tablist):h.insertBefore(this.tabs[a]),o.disabled=e.map(o.disabled,function(e){return e>=a?++e:e}),this.refresh(),1===this.tabs.length&&o.active===!1&&this.option("active",0),this._trigger("add",null,this._ui(this.anchors[a],this.panels[a])),this},remove:function(t){t=this._getIndex(t);var i=this.options,s=this.tabs.eq(t).remove(),a=this._getPanelForTab(s).remove();return s.hasClass("ui-tabs-active")&&this.anchors.length>2&&this._activate(t+(this.anchors.length>t+1?1:-1)),i.disabled=e.map(e.grep(i.disabled,function(e){return e!==t}),function(e){return e>=t?--e:e}),this.refresh(),this._trigger("remove",null,this._ui(s.find("a")[0],a[0])),this}}),e.widget("ui.tabs",e.ui.tabs,{length:function(){return this.anchors.length}}),e.widget("ui.tabs",e.ui.tabs,{options:{idPrefix:"ui-tabs-"},_tabId:function(t){var s=t.is("li")?t.find("a[href]"):t;return s=s[0],e(s).closest("li").attr("aria-controls")||s.title&&s.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF\-]/g,"")||this.options.idPrefix+i()}}),e.widget("ui.tabs",e.ui.tabs,{options:{panelTemplate:"<div></div>"},_createPanel:function(t){return e(this.options.panelTemplate).attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)}}),e.widget("ui.tabs",e.ui.tabs,{_create:function(){var e=this.options;null===e.active&&e.selected!==t&&(e.active=-1===e.selected?!1:e.selected),this._super(),e.selected=e.active,e.selected===!1&&(e.selected=-1)},_setOption:function(e,t){if("selected"!==e)return this._super(e,t);var i=this.options;this._super("active",-1===t?!1:t),i.selected=i.active,i.selected===!1&&(i.selected=-1)},_eventHandler:function(){this._superApply(arguments),this.options.selected=this.options.active,this.options.selected===!1&&(this.options.selected=-1)}}),e.widget("ui.tabs",e.ui.tabs,{options:{show:null,select:null},_create:function(){this._super(),this.options.active!==!1&&this._trigger("show",null,this._ui(this.active.find(".ui-tabs-anchor")[0],this._getPanelForTab(this.active)[0]))},_trigger:function(e,t,i){var s,a,n=this._superApply(arguments);return n?("beforeActivate"===e?(s=i.newTab.length?i.newTab:i.oldTab,a=i.newPanel.length?i.newPanel:i.oldPanel,n=this._super("select",t,{tab:s.find(".ui-tabs-anchor")[0],panel:a[0],index:s.closest("li").index()})):"activate"===e&&i.newTab.length&&(n=this._super("show",t,{tab:i.newTab.find(".ui-tabs-anchor")[0],panel:i.newPanel[0],index:i.newTab.closest("li").index()})),n):!1}}),e.widget("ui.tabs",e.ui.tabs,{select:function(e){if(e=this._getIndex(e),-1===e){if(!this.options.collapsible||-1===this.options.selected)return;e=this.options.selected}this.anchors.eq(e).trigger(this.options.event+this.eventNamespace)}}),function(){var t=0;e.widget("ui.tabs",e.ui.tabs,{options:{cookie:null},_create:function(){var e,t=this.options;null==t.active&&t.cookie&&(e=parseInt(this._cookie(),10),-1===e&&(e=!1),t.active=e),this._super()},_cookie:function(i){var s=[this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+ ++t)];return arguments.length&&(s.push(i===!1?-1:i),s.push(this.options.cookie)),e.cookie.apply(null,s)},_refresh:function(){this._super(),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_eventHandler:function(){this._superApply(arguments),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_destroy:function(){this._super(),this.options.cookie&&this._cookie(null,this.options.cookie)}})}(),e.widget("ui.tabs",e.ui.tabs,{_trigger:function(t,i,s){var a=e.extend({},s);return"load"===t&&(a.panel=a.panel[0],a.tab=a.tab.find(".ui-tabs-anchor")[0]),this._super(t,i,a)}}),e.widget("ui.tabs",e.ui.tabs,{options:{fx:null},_getFx:function(){var t,i,s=this.options.fx;return s&&(e.isArray(s)?(t=s[0],i=s[1]):t=i=s),s?{show:i,hide:t}:null},_toggle:function(e,i){function s(){n.running=!1,n._trigger("activate",e,i)}function a(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),r.length&&h.show?r.animate(h.show,h.show.duration,function(){s()}):(r.show(),s())}var n=this,r=i.newPanel,o=i.oldPanel,h=this._getFx();return h?(n.running=!0,o.length&&h.hide?o.animate(h.hide,h.hide.duration,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),a()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),o.hide(),a()),t):this._super(e,i)}}))})(jQuery);(function(e){function t(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")))}function i(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),a=e.inArray(i,s);-1!==a&&s.splice(a,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby")}var s=0;e.widget("ui.tooltip",{version:"1.9.2",options:{content:function(){return e(this).attr("title")},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,i){var s=this;return"disabled"===t?(this[i?"_disable":"_enable"](),this.options[t]=i,void 0):(this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t)}),void 0)},_disable:function(){var t=this;e.each(this.tooltips,function(i,s){var a=e.Event("blur");a.target=a.currentTarget=s[0],t.close(a,!0)}),this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,t))},_updateContent:function(e,t){var i,s=this.options.content,a=this,n=t?t.type:null;return"string"==typeof s?this._open(t,e,s):(i=s.call(e[0],function(i){e.data("ui-tooltip-open")&&a._delay(function(){t&&(t.type=n),this._open(t,e,i)})}),i&&this._open(t,e,i),void 0)},_open:function(i,s,a){function n(e){l.of=e,r.is(":hidden")||r.position(l)}var r,o,h,l=e.extend({},this.options.position);if(a){if(r=this._find(s),r.length)return r.find(".ui-tooltip-content").html(a),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),r=this._tooltip(s),t(s,r.attr("id")),r.find(".ui-tooltip-content").html(a),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:n}),n(i)):r.position(e.extend({of:s},this.options.position)),r.hide(),this._show(r,this.options.show),this.options.show&&this.options.show.delay&&(h=setInterval(function(){r.is(":visible")&&(n(l.of),clearInterval(h))},e.fx.interval)),this._trigger("open",i,{tooltip:r}),o={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var i=e.Event(t);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(r)}},i&&"mouseover"!==i.type||(o.mouseleave="close"),i&&"focusin"!==i.type||(o.focusout="close"),this._on(!0,s,o)}},close:function(t){var s=this,a=e(t?t.currentTarget:this.element),n=this._find(a);this.closing||(a.data("ui-tooltip-title")&&a.attr("title",a.data("ui-tooltip-title")),i(a),n.stop(!0),this._hide(n,this.options.hide,function(){s._removeTooltip(e(this))}),a.removeData("ui-tooltip-open"),this._off(a,"mouseleave focusout keyup"),a[0]!==this.element[0]&&this._off(a,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t]}),this.closing=!0,this._trigger("close",t,{tooltip:n}),this.closing=!1)},_tooltip:function(t){var i="ui-tooltip-"+s++,a=e("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return e("<div>").addClass("ui-tooltip-content").appendTo(a),a.appendTo(this.document[0].body),e.fn.bgiframe&&a.bgiframe(),this.tooltips[i]=t,a},_find:function(t){var i=t.data("ui-tooltip-id");return i?e("#"+i):e()},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(i,s){var a=e.Event("blur");a.target=a.currentTarget=s[0],t.close(a,!0),e("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);
/*! URI.js v1.13.2 http://medialize.github.io/URI.js/ */
/* build contains: IPv6.js, punycode.js, SecondLevelDomains.js, URI.js, URITemplate.js */
(function(f,n){"object"===typeof exports?module.exports=n():"function"===typeof define&&define.amd?define(n):f.IPv6=n(f)})(this,function(f){var n=f&&f.IPv6;return{best:function(g){g=g.toLowerCase().split(":");var h=g.length,d=8;""===g[0]&&""===g[1]&&""===g[2]?(g.shift(),g.shift()):""===g[0]&&""===g[1]?g.shift():""===g[h-1]&&""===g[h-2]&&g.pop();h=g.length;-1!==g[h-1].indexOf(".")&&(d=7);var m;for(m=0;m<h&&""!==g[m];m++);if(m<d)for(g.splice(m,1,"0000");g.length<d;)g.splice(m,0,"0000");for(m=0;m<d;m++){for(var h=
g[m].split(""),f=0;3>f;f++)if("0"===h[0]&&1<h.length)h.splice(0,1);else break;g[m]=h.join("")}var h=-1,n=f=0,k=-1,u=!1;for(m=0;m<d;m++)u?"0"===g[m]?n+=1:(u=!1,n>f&&(h=k,f=n)):"0"===g[m]&&(u=!0,k=m,n=1);n>f&&(h=k,f=n);1<f&&g.splice(h,f,"");h=g.length;d="";""===g[0]&&(d=":");for(m=0;m<h;m++){d+=g[m];if(m===h-1)break;d+=":"}""===g[h-1]&&(d+=":");return d},noConflict:function(){f.IPv6===this&&(f.IPv6=n);return this}}});
(function(f){function n(a){throw RangeError(B[a]);}function g(a,b){for(var c=a.length;c--;)a[c]=b(a[c]);return a}function h(a,b){return g(a.split(l),b).join(".")}function d(a){for(var b=[],c=0,d=a.length,l,e;c<d;)l=a.charCodeAt(c++),55296<=l&&56319>=l&&c<d?(e=a.charCodeAt(c++),56320==(e&64512)?b.push(((l&1023)<<10)+(e&1023)+65536):(b.push(l),c--)):b.push(l);return b}function m(a){return g(a,function(a){var b="";65535<a&&(a-=65536,b+=D(a>>>10&1023|55296),a=56320|a&1023);return b+=D(a)}).join("")}function w(a,
b){return a+22+75*(26>a)-((0!=b)<<5)}function r(a,b,c){var d=0;a=c?z(a/H):a>>1;for(a+=z(a/b);a>v*t>>1;d+=p)a=z(a/v);return z(d+(v+1)*a/(a+x))}function k(b){var c=[],d=b.length,l,e=0,B=E,k=F,g,v,f,h,u;g=b.lastIndexOf(a);0>g&&(g=0);for(v=0;v<g;++v)128<=b.charCodeAt(v)&&n("not-basic"),c.push(b.charCodeAt(v));for(g=0<g?g+1:0;g<d;){v=e;l=1;for(f=p;;f+=p){g>=d&&n("invalid-input");h=b.charCodeAt(g++);h=10>h-48?h-22:26>h-65?h-65:26>h-97?h-97:p;(h>=p||h>z((q-e)/l))&&n("overflow");e+=h*l;u=f<=k?s:f>=k+t?t:
f-k;if(h<u)break;h=p-u;l>z(q/h)&&n("overflow");l*=h}l=c.length+1;k=r(e-v,l,0==v);z(e/l)>q-B&&n("overflow");B+=z(e/l);e%=l;c.splice(e++,0,B)}return m(c)}function u(b){var c,l,e,B,g,k,v,h,f,u=[],m,y,A;b=d(b);m=b.length;c=E;l=0;g=F;for(k=0;k<m;++k)f=b[k],128>f&&u.push(D(f));for((e=B=u.length)&&u.push(a);e<m;){v=q;for(k=0;k<m;++k)f=b[k],f>=c&&f<v&&(v=f);y=e+1;v-c>z((q-l)/y)&&n("overflow");l+=(v-c)*y;c=v;for(k=0;k<m;++k)if(f=b[k],f<c&&++l>q&&n("overflow"),f==c){h=l;for(v=p;;v+=p){f=v<=g?s:v>=g+t?t:v-g;
if(h<f)break;A=h-f;h=p-f;u.push(D(w(f+A%h,0)));h=z(A/h)}u.push(D(w(h,0)));g=r(l,y,e==B);l=0;++e}++l;++c}return u.join("")}var y="object"==typeof exports&&exports,A="object"==typeof module&&module&&module.exports==y&&module,C="object"==typeof global&&global;if(C.global===C||C.window===C)f=C;var e,q=2147483647,p=36,s=1,t=26,x=38,H=700,F=72,E=128,a="-",b=/^xn--/,c=/[^ -~]/,l=/\x2E|\u3002|\uFF0E|\uFF61/g,B={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)",
"invalid-input":"Invalid input"},v=p-s,z=Math.floor,D=String.fromCharCode,G;e={version:"1.2.3",ucs2:{decode:d,encode:m},decode:k,encode:u,toASCII:function(a){return h(a,function(a){return c.test(a)?"xn--"+u(a):a})},toUnicode:function(a){return h(a,function(a){return b.test(a)?k(a.slice(4).toLowerCase()):a})}};if("function"==typeof define&&"object"==typeof define.amd&&define.amd)define(function(){return e});else if(y&&!y.nodeType)if(A)A.exports=e;else for(G in e)e.hasOwnProperty(G)&&(y[G]=e[G]);else f.punycode=
e})(this);
(function(f,n){"object"===typeof exports?module.exports=n():"function"===typeof define&&define.amd?define(n):f.SecondLevelDomains=n(f)})(this,function(f){var n=f&&f.SecondLevelDomains,g={list:{ac:" com gov mil net org ",ae:" ac co gov mil name net org pro sch ",af:" com edu gov net org ",al:" com edu gov mil net org ",ao:" co ed gv it og pb ",ar:" com edu gob gov int mil net org tur ",at:" ac co gv or ",au:" asn com csiro edu gov id net org ",ba:" co com edu gov mil net org rs unbi unmo unsa untz unze ",bb:" biz co com edu gov info net org store tv ",
bh:" biz cc com edu gov info net org ",bn:" com edu gov net org ",bo:" com edu gob gov int mil net org tv ",br:" adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",bs:" com edu gov net org ",bz:" du et om ov rg ",ca:" ab bc mb nb nf nl ns nt nu on pe qc sk yk ",ck:" biz co edu gen gov info net org ",
cn:" ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",co:" com edu gov mil net nom org ",cr:" ac c co ed fi go or sa ",cy:" ac biz com ekloges gov ltd name net org parliament press pro tm ","do":" art com edu gob gov mil net org sld web ",dz:" art asso com edu gov net org pol ",ec:" com edu fin gov info med mil net org pro ",eg:" com edu eun gov mil name net org sci ",er:" com edu gov ind mil net org rochest w ",es:" com edu gob nom org ",
et:" biz com edu gov info name net org ",fj:" ac biz com info mil name net org pro ",fk:" ac co gov net nom org ",fr:" asso com f gouv nom prd presse tm ",gg:" co net org ",gh:" com edu gov mil org ",gn:" ac com gov net org ",gr:" com edu gov mil net org ",gt:" com edu gob ind mil net org ",gu:" com edu gov net org ",hk:" com edu gov idv net org ",id:" ac co go mil net or sch web ",il:" ac co gov idf k12 muni net org ","in":" ac co edu ernet firm gen gov i ind mil net nic org res ",iq:" com edu gov i mil net org ",
ir:" ac co dnssec gov i id net org sch ",it:" edu gov ",je:" co net org ",jo:" com edu gov mil name net org sch ",jp:" ac ad co ed go gr lg ne or ",ke:" ac co go info me mobi ne or sc ",kh:" com edu gov mil net org per ",ki:" biz com de edu gov info mob net org tel ",km:" asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",kn:" edu gov net org ",kr:" ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
kw:" com edu gov net org ",ky:" com edu gov net org ",kz:" com edu gov mil net org ",lb:" com edu gov net org ",lk:" assn com edu gov grp hotel int ltd net ngo org sch soc web ",lr:" com edu gov net org ",lv:" asn com conf edu gov id mil net org ",ly:" com edu gov id med net org plc sch ",ma:" ac co gov m net org press ",mc:" asso tm ",me:" ac co edu gov its net org priv ",mg:" com edu gov mil nom org prd tm ",mk:" com edu gov inf name net org pro ",ml:" com edu gov net org presse ",mn:" edu gov org ",
mo:" com edu gov net org ",mt:" com edu gov net org ",mv:" aero biz com coop edu gov info int mil museum name net org pro ",mw:" ac co com coop edu gov int museum net org ",mx:" com edu gob net org ",my:" com edu gov mil name net org sch ",nf:" arts com firm info net other per rec store web ",ng:" biz com edu gov mil mobi name net org sch ",ni:" ac co com edu gob mil net nom org ",np:" com edu gov mil net org ",nr:" biz com edu gov info net org ",om:" ac biz co com edu gov med mil museum net org pro sch ",
pe:" com edu gob mil net nom org sld ",ph:" com edu gov i mil net ngo org ",pk:" biz com edu fam gob gok gon gop gos gov net org web ",pl:" art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",pr:" ac biz com edu est gov info isla name net org pro prof ",ps:" com edu gov net org plo sec ",pw:" belau co ed go ne or ",ro:" arts com firm info nom nt org rec store tm www ",rs:" ac co edu gov in org ",
sb:" com edu gov net org ",sc:" com edu gov net org ",sh:" co com edu gov net nom org ",sl:" com edu gov net org ",st:" co com consulado edu embaixada gov mil net org principe saotome store ",sv:" com edu gob org red ",sz:" ac co org ",tr:" av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",tt:" aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",tw:" club com ebiz edu game gov idv mil net org ",mu:" ac co com gov net or org ",mz:" ac co edu gov org ",
na:" co com ",nz:" ac co cri geek gen govt health iwi maori mil net org parliament school ",pa:" abo ac com edu gob ing med net nom org sld ",pt:" com edu gov int net nome org publ ",py:" com edu gov mil net org ",qa:" com edu gov mil net org ",re:" asso com nom ",ru:" ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
rw:" ac co com edu gouv gov int mil net ",sa:" com edu gov med net org pub sch ",sd:" com edu gov info med net org tv ",se:" a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",sg:" com edu gov idn net org per ",sn:" art com edu gouv org perso univ ",sy:" com edu gov mil net news org ",th:" ac co go in mi net or ",tj:" ac biz co com edu go gov info int mil name net nic org test web ",tn:" agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
tz:" ac co go ne or ",ua:" biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",ug:" ac co go ne or org sc ",uk:" ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
us:" dni fed isa kids nsn ",uy:" com edu gub mil net org ",ve:" co com edu gob info mil net org web ",vi:" co com k12 net org ",vn:" ac biz com edu gov health info int name net org pro ",ye:" co com gov ltd me net org plc ",yu:" ac co edu gov org ",za:" ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",zm:" ac co com edu gov net org sch "},has:function(h){var d=h.lastIndexOf(".");if(0>=d||d>=h.length-1)return!1;
var f=h.lastIndexOf(".",d-1);if(0>=f||f>=d-1)return!1;var n=g.list[h.slice(d+1)];return n?0<=n.indexOf(" "+h.slice(f+1,d)+" "):!1},is:function(f){var d=f.lastIndexOf(".");if(0>=d||d>=f.length-1||0<=f.lastIndexOf(".",d-1))return!1;var m=g.list[f.slice(d+1)];return m?0<=m.indexOf(" "+f.slice(0,d)+" "):!1},get:function(f){var d=f.lastIndexOf(".");if(0>=d||d>=f.length-1)return null;var m=f.lastIndexOf(".",d-1);if(0>=m||m>=d-1)return null;var n=g.list[f.slice(d+1)];return!n||0>n.indexOf(" "+f.slice(m+
1,d)+" ")?null:f.slice(m+1)},noConflict:function(){f.SecondLevelDomains===this&&(f.SecondLevelDomains=n);return this}};return g});
(function(f,n){"object"===typeof exports?module.exports=n(require("./punycode"),require("./IPv6"),require("./SecondLevelDomains")):"function"===typeof define&&define.amd?define(["./punycode","./IPv6","./SecondLevelDomains"],n):f.URI=n(f.punycode,f.IPv6,f.SecondLevelDomains,f)})(this,function(f,n,g,h){function d(a,b){if(!(this instanceof d))return new d(a,b);void 0===a&&(a="undefined"!==typeof location?location.href+"":"");this.href(a);return void 0!==b?this.absoluteTo(b):this}function m(a){return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g,
"\\$1")}function w(a){return void 0===a?"Undefined":String(Object.prototype.toString.call(a)).slice(8,-1)}function r(a){return"Array"===w(a)}function k(a,b){var c,d;if(r(b)){c=0;for(d=b.length;c<d;c++)if(!k(a,b[c]))return!1;return!0}var e=w(b);c=0;for(d=a.length;c<d;c++)if("RegExp"===e){if("string"===typeof a[c]&&a[c].match(b))return!0}else if(a[c]===b)return!0;return!1}function u(a,b){if(!r(a)||!r(b)||a.length!==b.length)return!1;a.sort();b.sort();for(var c=0,d=a.length;c<d;c++)if(a[c]!==b[c])return!1;
return!0}function y(a){return escape(a)}function A(a){return encodeURIComponent(a).replace(/[!'()*]/g,y).replace(/\*/g,"%2A")}var C=h&&h.URI;d.version="1.13.0";var e=d.prototype,q=Object.prototype.hasOwnProperty;d._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,duplicateQueryParameters:d.duplicateQueryParameters,escapeQuerySpace:d.escapeQuerySpace}};d.duplicateQueryParameters=!1;d.escapeQuerySpace=!0;d.protocol_expression=
/^[a-z][a-z0-9.+-]*$/i;d.idn_expression=/[^a-z0-9\.-]/i;d.punycode_expression=/(xn--)/i;d.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;d.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
d.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;d.findUri={start:/\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,end:/[\s\r\n]|$/,trim:/[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/};d.defaultPorts={http:"80",https:"443",ftp:"21",gopher:"70",ws:"80",wss:"443"};d.invalid_hostname_characters=
/[^a-zA-Z0-9\.-]/;d.domAttributes={a:"href",blockquote:"cite",link:"href",base:"href",script:"src",form:"action",img:"src",area:"href",iframe:"src",embed:"src",source:"src",track:"src",input:"src"};d.getDomAttribute=function(a){if(a&&a.nodeName){var b=a.nodeName.toLowerCase();return"input"===b&&"image"!==a.type?void 0:d.domAttributes[b]}};d.encode=A;d.decode=decodeURIComponent;d.iso8859=function(){d.encode=escape;d.decode=unescape};d.unicode=function(){d.encode=A;d.decode=decodeURIComponent};d.characters=
{pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig,map:{"%24":"$","%26":"&","%2B":"+","%2C":",","%3B":";","%3D":"=","%3A":":","%40":"@"}},decode:{expression:/[\/\?#]/g,map:{"/":"%2F","?":"%3F","#":"%23"}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,map:{"%3A":":","%2F":"/","%3F":"?","%23":"#","%5B":"[","%5D":"]","%40":"@","%21":"!","%24":"$","%26":"&","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+","%2C":",","%3B":";","%3D":"="}}}};d.encodeQuery=
function(a,b){var c=d.encode(a+"");void 0===b&&(b=d.escapeQuerySpace);return b?c.replace(/%20/g,"+"):c};d.decodeQuery=function(a,b){a+="";void 0===b&&(b=d.escapeQuerySpace);try{return d.decode(b?a.replace(/\+/g,"%20"):a)}catch(c){return a}};d.recodePath=function(a){a=(a+"").split("/");for(var b=0,c=a.length;b<c;b++)a[b]=d.encodePathSegment(d.decode(a[b]));return a.join("/")};d.decodePath=function(a){a=(a+"").split("/");for(var b=0,c=a.length;b<c;b++)a[b]=d.decodePathSegment(a[b]);return a.join("/")};
var p={encode:"encode",decode:"decode"},s,t=function(a,b){return function(c){return d[b](c+"").replace(d.characters[a][b].expression,function(c){return d.characters[a][b].map[c]})}};for(s in p)d[s+"PathSegment"]=t("pathname",p[s]);d.encodeReserved=t("reserved","encode");d.parse=function(a,b){var c;b||(b={});c=a.indexOf("#");-1<c&&(b.fragment=a.substring(c+1)||null,a=a.substring(0,c));c=a.indexOf("?");-1<c&&(b.query=a.substring(c+1)||null,a=a.substring(0,c));"//"===a.substring(0,2)?(b.protocol=null,
a=a.substring(2),a=d.parseAuthority(a,b)):(c=a.indexOf(":"),-1<c&&(b.protocol=a.substring(0,c)||null,b.protocol&&!b.protocol.match(d.protocol_expression)?b.protocol=void 0:"file"===b.protocol?a=a.substring(c+3):"//"===a.substring(c+1,c+3)?(a=a.substring(c+3),a=d.parseAuthority(a,b)):(a=a.substring(c+1),b.urn=!0)));b.path=a;return b};d.parseHost=function(a,b){var c=a.indexOf("/"),d;-1===c&&(c=a.length);"["===a.charAt(0)?(d=a.indexOf("]"),b.hostname=a.substring(1,d)||null,b.port=a.substring(d+2,c)||
null,"/"===b.port&&(b.port=null)):a.indexOf(":")!==a.lastIndexOf(":")?(b.hostname=a.substring(0,c)||null,b.port=null):(d=a.substring(0,c).split(":"),b.hostname=d[0]||null,b.port=d[1]||null);b.hostname&&"/"!==a.substring(c).charAt(0)&&(c++,a="/"+a);return a.substring(c)||"/"};d.parseAuthority=function(a,b){a=d.parseUserinfo(a,b);return d.parseHost(a,b)};d.parseUserinfo=function(a,b){var c=a.indexOf("/"),l=-1<c?a.lastIndexOf("@",c):a.indexOf("@");-1<l&&(-1===c||l<c)?(c=a.substring(0,l).split(":"),b.username=
c[0]?d.decode(c[0]):null,c.shift(),b.password=c[0]?d.decode(c.join(":")):null,a=a.substring(l+1)):(b.username=null,b.password=null);return a};d.parseQuery=function(a,b){if(!a)return{};a=a.replace(/&+/g,"&").replace(/^\?*&*|&+$/g,"");if(!a)return{};for(var c={},l=a.split("&"),e=l.length,f,k,g=0;g<e;g++)f=l[g].split("="),k=d.decodeQuery(f.shift(),b),f=f.length?d.decodeQuery(f.join("="),b):null,c[k]?("string"===typeof c[k]&&(c[k]=[c[k]]),c[k].push(f)):c[k]=f;return c};d.build=function(a){var b="";a.protocol&&
(b+=a.protocol+":");a.urn||!b&&!a.hostname||(b+="//");b+=d.buildAuthority(a)||"";"string"===typeof a.path&&("/"!==a.path.charAt(0)&&"string"===typeof a.hostname&&(b+="/"),b+=a.path);"string"===typeof a.query&&a.query&&(b+="?"+a.query);"string"===typeof a.fragment&&a.fragment&&(b+="#"+a.fragment);return b};d.buildHost=function(a){var b="";if(a.hostname)b=d.ip6_expression.test(a.hostname)?b+("["+a.hostname+"]"):b+a.hostname;else return"";a.port&&(b+=":"+a.port);return b};d.buildAuthority=function(a){return d.buildUserinfo(a)+
d.buildHost(a)};d.buildUserinfo=function(a){var b="";a.username&&(b+=d.encode(a.username),a.password&&(b+=":"+d.encode(a.password)),b+="@");return b};d.buildQuery=function(a,b,c){var l="",e,f,k,g;for(f in a)if(q.call(a,f)&&f)if(r(a[f]))for(e={},k=0,g=a[f].length;k<g;k++)void 0!==a[f][k]&&void 0===e[a[f][k]+""]&&(l+="&"+d.buildQueryParameter(f,a[f][k],c),!0!==b&&(e[a[f][k]+""]=!0));else void 0!==a[f]&&(l+="&"+d.buildQueryParameter(f,a[f],c));return l.substring(1)};d.buildQueryParameter=function(a,
b,c){return d.encodeQuery(a,c)+(null!==b?"="+d.encodeQuery(b,c):"")};d.addQuery=function(a,b,c){if("object"===typeof b)for(var l in b)q.call(b,l)&&d.addQuery(a,l,b[l]);else if("string"===typeof b)void 0===a[b]?a[b]=c:("string"===typeof a[b]&&(a[b]=[a[b]]),r(c)||(c=[c]),a[b]=a[b].concat(c));else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");};d.removeQuery=function(a,b,c){var l;if(r(b))for(c=0,l=b.length;c<l;c++)a[b[c]]=void 0;else if("object"===typeof b)for(l in b)q.call(b,
l)&&d.removeQuery(a,l,b[l]);else if("string"===typeof b)if(void 0!==c)if(a[b]===c)a[b]=void 0;else{if(r(a[b])){l=a[b];var e={},f,k;if(r(c))for(f=0,k=c.length;f<k;f++)e[c[f]]=!0;else e[c]=!0;f=0;for(k=l.length;f<k;f++)void 0!==e[l[f]]&&(l.splice(f,1),k--,f--);a[b]=l}}else a[b]=void 0;else throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");};d.hasQuery=function(a,b,c,l){if("object"===typeof b){for(var e in b)if(q.call(b,e)&&!d.hasQuery(a,e,b[e]))return!1;return!0}if("string"!==
typeof b)throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");switch(w(c)){case "Undefined":return b in a;case "Boolean":return a=Boolean(r(a[b])?a[b].length:a[b]),c===a;case "Function":return!!c(a[b],b,a);case "Array":return r(a[b])?(l?k:u)(a[b],c):!1;case "RegExp":return r(a[b])?l?k(a[b],c):!1:Boolean(a[b]&&a[b].match(c));case "Number":c=String(c);case "String":return r(a[b])?l?k(a[b],c):!1:a[b]===c;default:throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
}};d.commonPath=function(a,b){var c=Math.min(a.length,b.length),d;for(d=0;d<c;d++)if(a.charAt(d)!==b.charAt(d)){d--;break}if(1>d)return a.charAt(0)===b.charAt(0)&&"/"===a.charAt(0)?"/":"";if("/"!==a.charAt(d)||"/"!==b.charAt(d))d=a.substring(0,d).lastIndexOf("/");return a.substring(0,d+1)};d.withinString=function(a,b,c){c||(c={});var l=c.start||d.findUri.start,e=c.end||d.findUri.end,f=c.trim||d.findUri.trim,k=/[a-z0-9-]=["']?$/i;for(l.lastIndex=0;;){var g=l.exec(a);if(!g)break;g=g.index;if(c.ignoreHtml){var h=
a.slice(Math.max(g-3,0),g);if(h&&k.test(h))continue}var h=g+a.slice(g).search(e),u=a.slice(g,h).replace(f,"");c.ignore&&c.ignore.test(u)||(h=g+u.length,u=b(u,g,h,a),a=a.slice(0,g)+u+a.slice(h),l.lastIndex=g+u.length)}l.lastIndex=0;return a};d.ensureValidHostname=function(a){if(a.match(d.invalid_hostname_characters)){if(!f)throw new TypeError('Hostname "'+a+'" contains characters other than [A-Z0-9.-] and Punycode.js is not available');if(f.toASCII(a).match(d.invalid_hostname_characters))throw new TypeError('Hostname "'+
a+'" contains characters other than [A-Z0-9.-]');}};d.noConflict=function(a){if(a)return a={URI:this.noConflict()},h.URITemplate&&"function"===typeof h.URITemplate.noConflict&&(a.URITemplate=h.URITemplate.noConflict()),h.IPv6&&"function"===typeof h.IPv6.noConflict&&(a.IPv6=h.IPv6.noConflict()),h.SecondLevelDomains&&"function"===typeof h.SecondLevelDomains.noConflict&&(a.SecondLevelDomains=h.SecondLevelDomains.noConflict()),a;h.URI===this&&(h.URI=C);return this};e.build=function(a){if(!0===a)this._deferred_build=
!0;else if(void 0===a||this._deferred_build)this._string=d.build(this._parts),this._deferred_build=!1;return this};e.clone=function(){return new d(this)};e.valueOf=e.toString=function(){return this.build(!1)._string};p={protocol:"protocol",username:"username",password:"password",hostname:"hostname",port:"port"};t=function(a){return function(b,c){if(void 0===b)return this._parts[a]||"";this._parts[a]=b||null;this.build(!c);return this}};for(s in p)e[s]=t(p[s]);p={query:"?",fragment:"#"};t=function(a,
b){return function(c,d){if(void 0===c)return this._parts[a]||"";null!==c&&(c+="",c.charAt(0)===b&&(c=c.substring(1)));this._parts[a]=c;this.build(!d);return this}};for(s in p)e[s]=t(s,p[s]);p={search:["?","query"],hash:["#","fragment"]};t=function(a,b){return function(c,d){var e=this[a](c,d);return"string"===typeof e&&e.length?b+e:e}};for(s in p)e[s]=t(p[s][1],p[s][0]);e.pathname=function(a,b){if(void 0===a||!0===a){var c=this._parts.path||(this._parts.hostname?"/":"");return a?d.decodePath(c):c}this._parts.path=
a?d.recodePath(a):"/";this.build(!b);return this};e.path=e.pathname;e.href=function(a,b){var c;if(void 0===a)return this.toString();this._string="";this._parts=d._parts();var l=a instanceof d,e="object"===typeof a&&(a.hostname||a.path||a.pathname);a.nodeName&&(e=d.getDomAttribute(a),a=a[e]||"",e=!1);!l&&e&&void 0!==a.pathname&&(a=a.toString());if("string"===typeof a)this._parts=d.parse(a,this._parts);else if(l||e)for(c in l=l?a._parts:a,l)q.call(this._parts,c)&&(this._parts[c]=l[c]);else throw new TypeError("invalid input");
this.build(!b);return this};e.is=function(a){var b=!1,c=!1,e=!1,f=!1,k=!1,h=!1,u=!1,p=!this._parts.urn;this._parts.hostname&&(p=!1,c=d.ip4_expression.test(this._parts.hostname),e=d.ip6_expression.test(this._parts.hostname),b=c||e,k=(f=!b)&&g&&g.has(this._parts.hostname),h=f&&d.idn_expression.test(this._parts.hostname),u=f&&d.punycode_expression.test(this._parts.hostname));switch(a.toLowerCase()){case "relative":return p;case "absolute":return!p;case "domain":case "name":return f;case "sld":return k;
case "ip":return b;case "ip4":case "ipv4":case "inet4":return c;case "ip6":case "ipv6":case "inet6":return e;case "idn":return h;case "url":return!this._parts.urn;case "urn":return!!this._parts.urn;case "punycode":return u}return null};var x=e.protocol,H=e.port,F=e.hostname;e.protocol=function(a,b){if(void 0!==a&&a&&(a=a.replace(/:(\/\/)?$/,""),!a.match(d.protocol_expression)))throw new TypeError('Protocol "'+a+"\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]");return x.call(this,
a,b)};e.scheme=e.protocol;e.port=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a&&(0===a&&(a=null),a&&(a+="",":"===a.charAt(0)&&(a=a.substring(1)),a.match(/[^0-9]/))))throw new TypeError('Port "'+a+'" contains characters other than [0-9]');return H.call(this,a,b)};e.hostname=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a){var c={};d.parseHost(a,c);a=c.hostname}return F.call(this,a,b)};e.host=function(a,b){if(this._parts.urn)return void 0===a?"":this;
if(void 0===a)return this._parts.hostname?d.buildHost(this._parts):"";d.parseHost(a,this._parts);this.build(!b);return this};e.authority=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a)return this._parts.hostname?d.buildAuthority(this._parts):"";d.parseAuthority(a,this._parts);this.build(!b);return this};e.userinfo=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.username)return"";var c=d.buildUserinfo(this._parts);return c.substring(0,
c.length-1)}"@"!==a[a.length-1]&&(a+="@");d.parseUserinfo(a,this._parts);this.build(!b);return this};e.resource=function(a,b){var c;if(void 0===a)return this.path()+this.search()+this.hash();c=d.parse(a);this._parts.path=c.path;this._parts.query=c.query;this._parts.fragment=c.fragment;this.build(!b);return this};e.subdomain=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.length-this.domain().length-
1;return this._parts.hostname.substring(0,c)||""}c=this._parts.hostname.length-this.domain().length;c=this._parts.hostname.substring(0,c);c=RegExp("^"+m(c));a&&"."!==a.charAt(a.length-1)&&(a+=".");a&&d.ensureValidHostname(a);this._parts.hostname=this._parts.hostname.replace(c,a);this.build(!b);return this};e.domain=function(a,b){if(this._parts.urn)return void 0===a?"":this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.match(/\./g);
if(c&&2>c.length)return this._parts.hostname;c=this._parts.hostname.length-this.tld(b).length-1;c=this._parts.hostname.lastIndexOf(".",c-1)+1;return this._parts.hostname.substring(c)||""}if(!a)throw new TypeError("cannot set domain empty");d.ensureValidHostname(a);!this._parts.hostname||this.is("IP")?this._parts.hostname=a:(c=RegExp(m(this.domain())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a));this.build(!b);return this};e.tld=function(a,b){if(this._parts.urn)return void 0===a?"":
this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.lastIndexOf("."),c=this._parts.hostname.substring(c+1);return!0!==b&&g&&g.list[c.toLowerCase()]?g.get(this._parts.hostname)||c:c}if(a)if(a.match(/[^a-zA-Z0-9-]/))if(g&&g.is(a))c=RegExp(m(this.tld())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a);else throw new TypeError('TLD "'+a+'" contains characters other than [A-Z0-9]');else{if(!this._parts.hostname||
this.is("IP"))throw new ReferenceError("cannot set TLD on non-domain host");c=RegExp(m(this.tld())+"$");this._parts.hostname=this._parts.hostname.replace(c,a)}else throw new TypeError("cannot set TLD empty");this.build(!b);return this};e.directory=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path&&!this._parts.hostname)return"";if("/"===this._parts.path)return"/";var c=this._parts.path.length-this.filename().length-1,c=this._parts.path.substring(0,
c)||(this._parts.hostname?"/":"");return a?d.decodePath(c):c}c=this._parts.path.length-this.filename().length;c=this._parts.path.substring(0,c);c=RegExp("^"+m(c));this.is("relative")||(a||(a="/"),"/"!==a.charAt(0)&&(a="/"+a));a&&"/"!==a.charAt(a.length-1)&&(a+="/");a=d.recodePath(a);this._parts.path=this._parts.path.replace(c,a);this.build(!b);return this};e.filename=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";
var c=this._parts.path.lastIndexOf("/"),c=this._parts.path.substring(c+1);return a?d.decodePathSegment(c):c}c=!1;"/"===a.charAt(0)&&(a=a.substring(1));a.match(/\.?\//)&&(c=!0);var e=RegExp(m(this.filename())+"$");a=d.recodePath(a);this._parts.path=this._parts.path.replace(e,a);c?this.normalizePath(b):this.build(!b);return this};e.suffix=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";var c=this.filename(),e=c.lastIndexOf(".");
if(-1===e)return"";c=c.substring(e+1);c=/^[a-z0-9%]+$/i.test(c)?c:"";return a?d.decodePathSegment(c):c}"."===a.charAt(0)&&(a=a.substring(1));if(c=this.suffix())e=a?RegExp(m(c)+"$"):RegExp(m("."+c)+"$");else{if(!a)return this;this._parts.path+="."+d.recodePath(a)}e&&(a=d.recodePath(a),this._parts.path=this._parts.path.replace(e,a));this.build(!b);return this};e.segment=function(a,b,c){var d=this._parts.urn?":":"/",e=this.path(),f="/"===e.substring(0,1),e=e.split(d);void 0!==a&&"number"!==typeof a&&
(c=b,b=a,a=void 0);if(void 0!==a&&"number"!==typeof a)throw Error('Bad segment "'+a+'", must be 0-based integer');f&&e.shift();0>a&&(a=Math.max(e.length+a,0));if(void 0===b)return void 0===a?e:e[a];if(null===a||void 0===e[a])if(r(b)){e=[];a=0;for(var k=b.length;a<k;a++)if(b[a].length||e.length&&e[e.length-1].length)e.length&&!e[e.length-1].length&&e.pop(),e.push(b[a])}else{if(b||"string"===typeof b)""===e[e.length-1]?e[e.length-1]=b:e.push(b)}else b||"string"===typeof b&&b.length?e[a]=b:e.splice(a,
1);f&&e.unshift("");return this.path(e.join(d),c)};e.segmentCoded=function(a,b,c){var e,f;"number"!==typeof a&&(c=b,b=a,a=void 0);if(void 0===b){a=this.segment(a,b,c);if(r(a))for(e=0,f=a.length;e<f;e++)a[e]=d.decode(a[e]);else a=void 0!==a?d.decode(a):void 0;return a}if(r(b))for(e=0,f=b.length;e<f;e++)b[e]=d.decode(b[e]);else b="string"===typeof b?d.encode(b):b;return this.segment(a,b,c)};var E=e.query;e.query=function(a,b){if(!0===a)return d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);
if("function"===typeof a){var c=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace),e=a.call(this,c);this._parts.query=d.buildQuery(e||c,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!b);return this}return void 0!==a&&"string"!==typeof a?(this._parts.query=d.buildQuery(a,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace),this.build(!b),this):E.call(this,a,b)};e.setQuery=function(a,b,c){var e=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);
if("object"===typeof a)for(var f in a)q.call(a,f)&&(e[f]=a[f]);else if("string"===typeof a)e[a]=void 0!==b?b:null;else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");this._parts.query=d.buildQuery(e,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);"string"!==typeof a&&(c=b);this.build(!c);return this};e.addQuery=function(a,b,c){var e=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);d.addQuery(e,a,void 0===b?null:b);this._parts.query=
d.buildQuery(e,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);"string"!==typeof a&&(c=b);this.build(!c);return this};e.removeQuery=function(a,b,c){var e=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);d.removeQuery(e,a,b);this._parts.query=d.buildQuery(e,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);"string"!==typeof a&&(c=b);this.build(!c);return this};e.hasQuery=function(a,b,c){var e=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);
return d.hasQuery(e,a,b,c)};e.setSearch=e.setQuery;e.addSearch=e.addQuery;e.removeSearch=e.removeQuery;e.hasSearch=e.hasQuery;e.normalize=function(){return this._parts.urn?this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build():this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()};e.normalizeProtocol=function(a){"string"===typeof this._parts.protocol&&(this._parts.protocol=this._parts.protocol.toLowerCase(),
this.build(!a));return this};e.normalizeHostname=function(a){this._parts.hostname&&(this.is("IDN")&&f?this._parts.hostname=f.toASCII(this._parts.hostname):this.is("IPv6")&&n&&(this._parts.hostname=n.best(this._parts.hostname)),this._parts.hostname=this._parts.hostname.toLowerCase(),this.build(!a));return this};e.normalizePort=function(a){"string"===typeof this._parts.protocol&&this._parts.port===d.defaultPorts[this._parts.protocol]&&(this._parts.port=null,this.build(!a));return this};e.normalizePath=
function(a){if(this._parts.urn||!this._parts.path||"/"===this._parts.path)return this;var b,c=this._parts.path,e="",f,k;"/"!==c.charAt(0)&&(b=!0,c="/"+c);c=c.replace(/(\/(\.\/)+)|(\/\.$)/g,"/").replace(/\/{2,}/g,"/");b&&(e=c.substring(1).match(/^(\.\.\/)+/)||"")&&(e=e[0]);for(;;){f=c.indexOf("/..");if(-1===f)break;else if(0===f){c=c.substring(3);continue}k=c.substring(0,f).lastIndexOf("/");-1===k&&(k=f);c=c.substring(0,k)+c.substring(f+3)}b&&this.is("relative")&&(c=e+c.substring(1));c=d.recodePath(c);
this._parts.path=c;this.build(!a);return this};e.normalizePathname=e.normalizePath;e.normalizeQuery=function(a){"string"===typeof this._parts.query&&(this._parts.query.length?this.query(d.parseQuery(this._parts.query,this._parts.escapeQuerySpace)):this._parts.query=null,this.build(!a));return this};e.normalizeFragment=function(a){this._parts.fragment||(this._parts.fragment=null,this.build(!a));return this};e.normalizeSearch=e.normalizeQuery;e.normalizeHash=e.normalizeFragment;e.iso8859=function(){var a=
d.encode,b=d.decode;d.encode=escape;d.decode=decodeURIComponent;this.normalize();d.encode=a;d.decode=b;return this};e.unicode=function(){var a=d.encode,b=d.decode;d.encode=A;d.decode=unescape;this.normalize();d.encode=a;d.decode=b;return this};e.readable=function(){var a=this.clone();a.username("").password("").normalize();var b="";a._parts.protocol&&(b+=a._parts.protocol+"://");a._parts.hostname&&(a.is("punycode")&&f?(b+=f.toUnicode(a._parts.hostname),a._parts.port&&(b+=":"+a._parts.port)):b+=a.host());
a._parts.hostname&&a._parts.path&&"/"!==a._parts.path.charAt(0)&&(b+="/");b+=a.path(!0);if(a._parts.query){for(var c="",e=0,k=a._parts.query.split("&"),g=k.length;e<g;e++){var h=(k[e]||"").split("="),c=c+("&"+d.decodeQuery(h[0],this._parts.escapeQuerySpace).replace(/&/g,"%26"));void 0!==h[1]&&(c+="="+d.decodeQuery(h[1],this._parts.escapeQuerySpace).replace(/&/g,"%26"))}b+="?"+c.substring(1)}return b+=d.decodeQuery(a.hash(),!0)};e.absoluteTo=function(a){var b=this.clone(),c=["protocol","username",
"password","hostname","port"],e,f;if(this._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");a instanceof d||(a=new d(a));b._parts.protocol||(b._parts.protocol=a._parts.protocol);if(this._parts.hostname)return b;for(e=0;f=c[e];e++)b._parts[f]=a._parts[f];b._parts.path?".."===b._parts.path.substring(-2)&&(b._parts.path+="/"):(b._parts.path=a._parts.path,b._parts.query||(b._parts.query=a._parts.query));"/"!==b.path().charAt(0)&&(a=a.directory(),b._parts.path=(a?
a+"/":"")+b._parts.path,b.normalizePath());b.build();return b};e.relativeTo=function(a){var b=this.clone().normalize(),c,e,f,k;if(b._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");a=(new d(a)).normalize();c=b._parts;e=a._parts;f=b.path();k=a.path();if("/"!==f.charAt(0))throw Error("URI is already relative");if("/"!==k.charAt(0))throw Error("Cannot calculate a URI relative to another relative URI");c.protocol===e.protocol&&(c.protocol=null);if(c.username===
e.username&&c.password===e.password&&null===c.protocol&&null===c.username&&null===c.password&&c.hostname===e.hostname&&c.port===e.port)c.hostname=null,c.port=null;else return b.build();if(f===k)return c.path="",b.build();a=d.commonPath(b.path(),a.path());if(!a)return b.build();e=e.path.substring(a.length).replace(/[^\/]*$/,"").replace(/.*?\//g,"../");c.path=e+c.path.substring(a.length);return b.build()};e.equals=function(a){var b=this.clone();a=new d(a);var c={},e={},f={},k;b.normalize();a.normalize();
if(b.toString()===a.toString())return!0;c=b.query();e=a.query();b.query("");a.query("");if(b.toString()!==a.toString()||c.length!==e.length)return!1;c=d.parseQuery(c,this._parts.escapeQuerySpace);e=d.parseQuery(e,this._parts.escapeQuerySpace);for(k in c)if(q.call(c,k)){if(!r(c[k])){if(c[k]!==e[k])return!1}else if(!u(c[k],e[k]))return!1;f[k]=!0}for(k in e)if(q.call(e,k)&&!f[k])return!1;return!0};e.duplicateQueryParameters=function(a){this._parts.duplicateQueryParameters=!!a;return this};e.escapeQuerySpace=
function(a){this._parts.escapeQuerySpace=!!a;return this};return d});
(function(f,n){"object"===typeof exports?module.exports=n(require("./URI")):"function"===typeof define&&define.amd?define(["./URI"],n):f.URITemplate=n(f.URI,f)})(this,function(f,n){function g(d){if(g._cache[d])return g._cache[d];if(!(this instanceof g))return new g(d);this.expression=d;g._cache[d]=this;return this}function h(d){this.data=d;this.cache={}}var d=n&&n.URITemplate,m=Object.prototype.hasOwnProperty,w=g.prototype,r={"":{prefix:"",separator:",",named:!1,empty_name_separator:!1,encode:"encode"},
"+":{prefix:"",separator:",",named:!1,empty_name_separator:!1,encode:"encodeReserved"},"#":{prefix:"#",separator:",",named:!1,empty_name_separator:!1,encode:"encodeReserved"},".":{prefix:".",separator:".",named:!1,empty_name_separator:!1,encode:"encode"},"/":{prefix:"/",separator:"/",named:!1,empty_name_separator:!1,encode:"encode"},";":{prefix:";",separator:";",named:!0,empty_name_separator:!1,encode:"encode"},"?":{prefix:"?",separator:"&",named:!0,empty_name_separator:!0,encode:"encode"},"&":{prefix:"&",
separator:"&",named:!0,empty_name_separator:!0,encode:"encode"}};g._cache={};g.EXPRESSION_PATTERN=/\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g;g.VARIABLE_PATTERN=/^([^*:]+)((\*)|:(\d+))?$/;g.VARIABLE_NAME_PATTERN=/[^a-zA-Z0-9%_]/;g.expand=function(d,f){var h=r[d.operator],m=h.named?"Named":"Unnamed",n=d.variables,e=[],q,p,s;for(s=0;p=n[s];s++)q=f.get(p.name),q.val.length?e.push(g["expand"+m](q,h,p.explode,p.explode&&h.separator||",",p.maxlength,p.name)):q.type&&e.push("");return e.length?h.prefix+e.join(h.separator):
""};g.expandNamed=function(d,g,h,m,n,e){var q="",p=g.encode;g=g.empty_name_separator;var s=!d[p].length,t=2===d.type?"":f[p](e),x,r,w;r=0;for(w=d.val.length;r<w;r++)n?(x=f[p](d.val[r][1].substring(0,n)),2===d.type&&(t=f[p](d.val[r][0].substring(0,n)))):s?(x=f[p](d.val[r][1]),2===d.type?(t=f[p](d.val[r][0]),d[p].push([t,x])):d[p].push([void 0,x])):(x=d[p][r][1],2===d.type&&(t=d[p][r][0])),q&&(q+=m),h?q+=t+(g||x?"=":"")+x:(r||(q+=f[p](e)+(g||x?"=":"")),2===d.type&&(q+=t+","),q+=x);return q};g.expandUnnamed=
function(d,g,h,n,m){var e="",q=g.encode;g=g.empty_name_separator;var p=!d[q].length,s,t,r,w;r=0;for(w=d.val.length;r<w;r++)m?t=f[q](d.val[r][1].substring(0,m)):p?(t=f[q](d.val[r][1]),d[q].push([2===d.type?f[q](d.val[r][0]):void 0,t])):t=d[q][r][1],e&&(e+=n),2===d.type&&(s=m?f[q](d.val[r][0].substring(0,m)):d[q][r][0],e+=s,e=h?e+(g||t?"=":""):e+","),e+=t;return e};g.noConflict=function(){n.URITemplate===g&&(n.URITemplate=d);return g};w.expand=function(d){var f="";this.parts&&this.parts.length||this.parse();
d instanceof h||(d=new h(d));for(var m=0,n=this.parts.length;m<n;m++)f+="string"===typeof this.parts[m]?this.parts[m]:g.expand(this.parts[m],d);return f};w.parse=function(){var d=this.expression,f=g.EXPRESSION_PATTERN,h=g.VARIABLE_PATTERN,m=g.VARIABLE_NAME_PATTERN,n=[],e=0,q,p,s;for(f.lastIndex=0;;){p=f.exec(d);if(null===p){n.push(d.substring(e));break}else n.push(d.substring(e,p.index)),e=p.index+p[0].length;if(!r[p[1]])throw Error('Unknown Operator "'+p[1]+'" in "'+p[0]+'"');if(!p[3])throw Error('Unclosed Expression "'+
p[0]+'"');q=p[2].split(",");for(var t=0,w=q.length;t<w;t++){s=q[t].match(h);if(null===s)throw Error('Invalid Variable "'+q[t]+'" in "'+p[0]+'"');if(s[1].match(m))throw Error('Invalid Variable Name "'+s[1]+'" in "'+p[0]+'"');q[t]={name:s[1],explode:!!s[3],maxlength:s[4]&&parseInt(s[4],10)}}if(!q.length)throw Error('Expression Missing Variable(s) "'+p[0]+'"');n.push({expression:p[0],operator:p[1],variables:q})}n.length||n.push(d);this.parts=n;return this};h.prototype.get=function(d){var f=this.data,
g={type:0,val:[],encode:[],encodeReserved:[]},h;if(void 0!==this.cache[d])return this.cache[d];this.cache[d]=g;f="[object Function]"===String(Object.prototype.toString.call(f))?f(d):"[object Function]"===String(Object.prototype.toString.call(f[d]))?f[d](d):f[d];if(void 0!==f&&null!==f)if("[object Array]"===String(Object.prototype.toString.call(f))){h=0;for(d=f.length;h<d;h++)void 0!==f[h]&&null!==f[h]&&g.val.push([void 0,String(f[h])]);g.val.length&&(g.type=3)}else if("[object Object]"===String(Object.prototype.toString.call(f))){for(h in f)m.call(f,
h)&&void 0!==f[h]&&null!==f[h]&&g.val.push([h,String(f[h])]);g.val.length&&(g.type=2)}else g.type=1,g.val.push([void 0,String(f)]);return g};f.expand=function(d,h){var m=(new g(d)).expand(h);return new f(m)};return g});

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.12
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));

/* mousetrap v1.4.6 craig.is/killing/mice */
(function(J,r,f){function s(a,b,d){a.addEventListener?a.addEventListener(b,d,!1):a.attachEvent("on"+b,d)}function A(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return h[a.which]?h[a.which]:B[a.which]?B[a.which]:String.fromCharCode(a.which).toLowerCase()}function t(a){a=a||{};var b=!1,d;for(d in n)a[d]?b=!0:n[d]=0;b||(u=!1)}function C(a,b,d,c,e,v){var g,k,f=[],h=d.type;if(!l[a])return[];"keyup"==h&&w(a)&&(b=[a]);for(g=0;g<l[a].length;++g)if(k=
l[a][g],!(!c&&k.seq&&n[k.seq]!=k.level||h!=k.action||("keypress"!=h||d.metaKey||d.ctrlKey)&&b.sort().join(",")!==k.modifiers.sort().join(","))){var m=c&&k.seq==c&&k.level==v;(!c&&k.combo==e||m)&&l[a].splice(g,1);f.push(k)}return f}function K(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function x(a,b,d,c){m.stopCallback(b,b.target||b.srcElement,d,c)||!1!==a(b,d)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?
b.stopPropagation():b.cancelBubble=!0)}function y(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=A(a);b&&("keyup"==a.type&&z===b?z=!1:m.handleKey(b,K(a),a))}function w(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function L(a,b,d,c){function e(b){return function(){u=b;++n[a];clearTimeout(D);D=setTimeout(t,1E3)}}function v(b){x(d,b,a);"keyup"!==c&&(z=A(b));setTimeout(t,10)}for(var g=n[a]=0;g<b.length;++g){var f=g+1===b.length?v:e(c||E(b[g+1]).action);F(b[g],f,c,a,g)}}function E(a,b){var d,
c,e,f=[];d="+"===a?["+"]:a.split("+");for(e=0;e<d.length;++e)c=d[e],G[c]&&(c=G[c]),b&&"keypress"!=b&&H[c]&&(c=H[c],f.push("shift")),w(c)&&f.push(c);d=c;e=b;if(!e){if(!p){p={};for(var g in h)95<g&&112>g||h.hasOwnProperty(g)&&(p[h[g]]=g)}e=p[d]?"keydown":"keypress"}"keypress"==e&&f.length&&(e="keydown");return{key:c,modifiers:f,action:e}}function F(a,b,d,c,e){q[a+":"+d]=b;a=a.replace(/\s+/g," ");var f=a.split(" ");1<f.length?L(a,f,b,d):(d=E(a,d),l[d.key]=l[d.key]||[],C(d.key,d.modifiers,{type:d.action},
c,a,e),l[d.key][c?"unshift":"push"]({callback:b,modifiers:d.modifiers,action:d.action,seq:c,level:e,combo:a}))}var h={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},B={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},H={"~":"`","!":"1",
"@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},G={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},p,l={},q={},n={},D,z=!1,I=!1,u=!1;for(f=1;20>f;++f)h[111+f]="f"+f;for(f=0;9>=f;++f)h[f+96]=f;s(r,"keypress",y);s(r,"keydown",y);s(r,"keyup",y);var m={bind:function(a,b,d){a=a instanceof Array?a:[a];for(var c=0;c<a.length;++c)F(a[c],b,d);return this},
unbind:function(a,b){return m.bind(a,function(){},b)},trigger:function(a,b){if(q[a+":"+b])q[a+":"+b]({},a);return this},reset:function(){l={};q={};return this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable},handleKey:function(a,b,d){var c=C(a,b,d),e;b={};var f=0,g=!1;for(e=0;e<c.length;++e)c[e].seq&&(f=Math.max(f,c[e].level));for(e=0;e<c.length;++e)c[e].seq?c[e].level==f&&(g=!0,
b[c[e].seq]=1,x(c[e].callback,d,c[e].combo,c[e].seq)):g||x(c[e].callback,d,c[e].combo);c="keypress"==d.type&&I;d.type!=u||w(a)||c||t(b);I=g&&"keydown"==d.type}};J.Mousetrap=m;"function"===typeof define&&define.amd&&define(m)})(window,document);

/*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.1.6
 */
!function(a,b){"use strict";var c,d,e=a,f=e.document,g=e.navigator,h=e.setTimeout,i=e.encodeURIComponent,j=e.ActiveXObject,k=e.Error,l=e.Number.parseInt||e.parseInt,m=e.Number.parseFloat||e.parseFloat,n=e.Number.isNaN||e.isNaN,o=e.Math.round,p=e.Date.now,q=e.Object.keys,r=e.Object.defineProperty,s=e.Object.prototype.hasOwnProperty,t=e.Array.prototype.slice,u=function(){var a=function(a){return a};if("function"==typeof e.wrap&&"function"==typeof e.unwrap)try{var b=f.createElement("div"),c=e.unwrap(b);1===b.nodeType&&c&&1===c.nodeType&&(a=e.unwrap)}catch(d){}return a}(),v=function(a){return t.call(a,0)},w=function(){var a,c,d,e,f,g,h=v(arguments),i=h[0]||{};for(a=1,c=h.length;c>a;a++)if(null!=(d=h[a]))for(e in d)s.call(d,e)&&(f=i[e],g=d[e],i!==g&&g!==b&&(i[e]=g));return i},x=function(a){var b,c,d,e;if("object"!=typeof a||null==a)b=a;else if("number"==typeof a.length)for(b=[],c=0,d=a.length;d>c;c++)s.call(a,c)&&(b[c]=x(a[c]));else{b={};for(e in a)s.call(a,e)&&(b[e]=x(a[e]))}return b},y=function(a,b){for(var c={},d=0,e=b.length;e>d;d++)b[d]in a&&(c[b[d]]=a[b[d]]);return c},z=function(a,b){var c={};for(var d in a)-1===b.indexOf(d)&&(c[d]=a[d]);return c},A=function(a){if(a)for(var b in a)s.call(a,b)&&delete a[b];return a},B=function(a,b){if(a&&1===a.nodeType&&a.ownerDocument&&b&&(1===b.nodeType&&b.ownerDocument&&b.ownerDocument===a.ownerDocument||9===b.nodeType&&!b.ownerDocument&&b===a.ownerDocument))do{if(a===b)return!0;a=a.parentNode}while(a);return!1},C=function(a){var b;return"string"==typeof a&&a&&(b=a.split("#")[0].split("?")[0],b=a.slice(0,a.lastIndexOf("/")+1)),b},D=function(a){var b,c;return"string"==typeof a&&a&&(c=a.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]?b=c[1]:(c=a.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]&&(b=c[1]))),b},E=function(){var a,b;try{throw new k}catch(c){b=c}return b&&(a=b.sourceURL||b.fileName||D(b.stack)),a},F=function(){var a,c,d;if(f.currentScript&&(a=f.currentScript.src))return a;if(c=f.getElementsByTagName("script"),1===c.length)return c[0].src||b;if("readyState"in c[0])for(d=c.length;d--;)if("interactive"===c[d].readyState&&(a=c[d].src))return a;return"loading"===f.readyState&&(a=c[c.length-1].src)?a:(a=E())?a:b},G=function(){var a,c,d,e=f.getElementsByTagName("script");for(a=e.length;a--;){if(!(d=e[a].src)){c=null;break}if(d=C(d),null==c)c=d;else if(c!==d){c=null;break}}return c||b},H=function(){var a=C(F())||G()||"";return a+"ZeroClipboard.swf"},I={bridge:null,version:"0.0.0",pluginType:"unknown",disabled:null,outdated:null,unavailable:null,deactivated:null,overdue:null,ready:null},J="11.0.0",K={},L={},M=null,N={ready:"Flash communication is established",error:{"flash-disabled":"Flash is disabled or not installed","flash-outdated":"Flash is too outdated to support ZeroClipboard","flash-unavailable":"Flash is unable to communicate bidirectionally with JavaScript","flash-deactivated":"Flash is too outdated for your browser and/or is configured as click-to-activate","flash-overdue":"Flash communication was established but NOT within the acceptable time limit"}},O={swfPath:H(),trustedDomains:a.location.host?[a.location.host]:[],cacheBust:!0,forceEnhancedClipboard:!1,flashLoadTimeout:3e4,autoActivate:!0,bubbleEvents:!0,containerId:"global-zeroclipboard-html-bridge",containerClass:"global-zeroclipboard-container",swfObjectId:"global-zeroclipboard-flash-bridge",hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",forceHandCursor:!1,title:null,zIndex:999999999},P=function(a){if("object"==typeof a&&null!==a)for(var b in a)if(s.call(a,b))if(/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(b))O[b]=a[b];else if(null==I.bridge)if("containerId"===b||"swfObjectId"===b){if(!cb(a[b]))throw new Error("The specified `"+b+"` value is not valid as an HTML4 Element ID");O[b]=a[b]}else O[b]=a[b];{if("string"!=typeof a||!a)return x(O);if(s.call(O,a))return O[a]}},Q=function(){return{browser:y(g,["userAgent","platform","appName"]),flash:z(I,["bridge"]),zeroclipboard:{version:Fb.version,config:Fb.config()}}},R=function(){return!!(I.disabled||I.outdated||I.unavailable||I.deactivated)},S=function(a,b){var c,d,e,f={};if("string"==typeof a&&a)e=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)s.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&Fb.on(c,a[c]);if(e&&e.length){for(c=0,d=e.length;d>c;c++)a=e[c].replace(/^on/,""),f[a]=!0,K[a]||(K[a]=[]),K[a].push(b);if(f.ready&&I.ready&&Fb.emit({type:"ready"}),f.error){var g=["disabled","outdated","unavailable","deactivated","overdue"];for(c=0,d=g.length;d>c;c++)if(I[g[c]]===!0){Fb.emit({type:"error",name:"flash-"+g[c]});break}}}return Fb},T=function(a,b){var c,d,e,f,g;if(0===arguments.length)f=q(K);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)s.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&Fb.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=K[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return Fb},U=function(a){var b;return b="string"==typeof a&&a?x(K[a])||null:x(K)},V=function(a){var b,c,d;return a=db(a),a&&!jb(a)?"ready"===a.type&&I.overdue===!0?Fb.emit({type:"error",name:"flash-overdue"}):(b=w({},a),ib.call(this,b),"copy"===a.type&&(d=pb(L),c=d.data,M=d.formatMap),c):void 0},W=function(){if("boolean"!=typeof I.ready&&(I.ready=!1),!Fb.isFlashUnusable()&&null===I.bridge){var a=O.flashLoadTimeout;"number"==typeof a&&a>=0&&h(function(){"boolean"!=typeof I.deactivated&&(I.deactivated=!0),I.deactivated===!0&&Fb.emit({type:"error",name:"flash-deactivated"})},a),I.overdue=!1,nb()}},X=function(){Fb.clearData(),Fb.blur(),Fb.emit("destroy"),ob(),Fb.off()},Y=function(a,b){var c;if("object"==typeof a&&a&&"undefined"==typeof b)c=a,Fb.clearData();else{if("string"!=typeof a||!a)return;c={},c[a]=b}for(var d in c)"string"==typeof d&&d&&s.call(c,d)&&"string"==typeof c[d]&&c[d]&&(L[d]=c[d])},Z=function(a){"undefined"==typeof a?(A(L),M=null):"string"==typeof a&&s.call(L,a)&&delete L[a]},$=function(a){return"undefined"==typeof a?x(L):"string"==typeof a&&s.call(L,a)?L[a]:void 0},_=function(a){if(a&&1===a.nodeType){c&&(xb(c,O.activeClass),c!==a&&xb(c,O.hoverClass)),c=a,wb(a,O.hoverClass);var b=a.getAttribute("title")||O.title;if("string"==typeof b&&b){var d=mb(I.bridge);d&&d.setAttribute("title",b)}var e=O.forceHandCursor===!0||"pointer"===yb(a,"cursor");Cb(e),Bb()}},ab=function(){var a=mb(I.bridge);a&&(a.removeAttribute("title"),a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.top="1px"),c&&(xb(c,O.hoverClass),xb(c,O.activeClass),c=null)},bb=function(){return c||null},cb=function(a){return"string"==typeof a&&a&&/^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a)},db=function(a){var b;if("string"==typeof a&&a?(b=a,a={}):"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(b=a.type),b){!a.target&&/^(copy|aftercopy|_click)$/.test(b.toLowerCase())&&(a.target=d),w(a,{type:b.toLowerCase(),target:a.target||c||null,relatedTarget:a.relatedTarget||null,currentTarget:I&&I.bridge||null,timeStamp:a.timeStamp||p()||null});var e=N[a.type];return"error"===a.type&&a.name&&e&&(e=e[a.name]),e&&(a.message=e),"ready"===a.type&&w(a,{target:null,version:I.version}),"error"===a.type&&(/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(a.name)&&w(a,{target:null,minimumVersion:J}),/^flash-(outdated|unavailable|deactivated|overdue)$/.test(a.name)&&w(a,{version:I.version})),"copy"===a.type&&(a.clipboardData={setData:Fb.setData,clearData:Fb.clearData}),"aftercopy"===a.type&&(a=qb(a,M)),a.target&&!a.relatedTarget&&(a.relatedTarget=eb(a.target)),a=fb(a)}},eb=function(a){var b=a&&a.getAttribute&&a.getAttribute("data-clipboard-target");return b?f.getElementById(b):null},fb=function(a){if(a&&/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)){var c=a.target,d="_mouseover"===a.type&&a.relatedTarget?a.relatedTarget:b,g="_mouseout"===a.type&&a.relatedTarget?a.relatedTarget:b,h=Ab(c),i=e.screenLeft||e.screenX||0,j=e.screenTop||e.screenY||0,k=f.body.scrollLeft+f.documentElement.scrollLeft,l=f.body.scrollTop+f.documentElement.scrollTop,m=h.left+("number"==typeof a._stageX?a._stageX:0),n=h.top+("number"==typeof a._stageY?a._stageY:0),o=m-k,p=n-l,q=i+o,r=j+p,s="number"==typeof a.movementX?a.movementX:0,t="number"==typeof a.movementY?a.movementY:0;delete a._stageX,delete a._stageY,w(a,{srcElement:c,fromElement:d,toElement:g,screenX:q,screenY:r,pageX:m,pageY:n,clientX:o,clientY:p,x:o,y:p,movementX:s,movementY:t,offsetX:0,offsetY:0,layerX:0,layerY:0})}return a},gb=function(a){var b=a&&"string"==typeof a.type&&a.type||"";return!/^(?:(?:before)?copy|destroy)$/.test(b)},hb=function(a,b,c,d){d?h(function(){a.apply(b,c)},0):a.apply(b,c)},ib=function(a){if("object"==typeof a&&a&&a.type){var b=gb(a),c=K["*"]||[],d=K[a.type]||[],f=c.concat(d);if(f&&f.length){var g,h,i,j,k,l=this;for(g=0,h=f.length;h>g;g++)i=f[g],j=l,"string"==typeof i&&"function"==typeof e[i]&&(i=e[i]),"object"==typeof i&&i&&"function"==typeof i.handleEvent&&(j=i,i=i.handleEvent),"function"==typeof i&&(k=w({},a),hb(i,j,[k],b))}return this}},jb=function(a){var b=a.target||c||null,e="swf"===a._source;delete a._source;var f=["flash-disabled","flash-outdated","flash-unavailable","flash-deactivated","flash-overdue"];switch(a.type){case"error":-1!==f.indexOf(a.name)&&w(I,{disabled:"flash-disabled"===a.name,outdated:"flash-outdated"===a.name,unavailable:"flash-unavailable"===a.name,deactivated:"flash-deactivated"===a.name,overdue:"flash-overdue"===a.name,ready:!1});break;case"ready":var g=I.deactivated===!0;w(I,{disabled:!1,outdated:!1,unavailable:!1,deactivated:!1,overdue:g,ready:!g});break;case"beforecopy":d=b;break;case"copy":var h,i,j=a.relatedTarget;!L["text/html"]&&!L["text/plain"]&&j&&(i=j.value||j.outerHTML||j.innerHTML)&&(h=j.value||j.textContent||j.innerText)?(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",h),i!==h&&a.clipboardData.setData("text/html",i)):!L["text/plain"]&&a.target&&(h=a.target.getAttribute("data-clipboard-text"))&&(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",h));break;case"aftercopy":Fb.clearData(),b&&b!==vb()&&b.focus&&b.focus();break;case"_mouseover":Fb.focus(b),O.bubbleEvents===!0&&e&&(b&&b!==a.relatedTarget&&!B(a.relatedTarget,b)&&kb(w({},a,{type:"mouseenter",bubbles:!1,cancelable:!1})),kb(w({},a,{type:"mouseover"})));break;case"_mouseout":Fb.blur(),O.bubbleEvents===!0&&e&&(b&&b!==a.relatedTarget&&!B(a.relatedTarget,b)&&kb(w({},a,{type:"mouseleave",bubbles:!1,cancelable:!1})),kb(w({},a,{type:"mouseout"})));break;case"_mousedown":wb(b,O.activeClass),O.bubbleEvents===!0&&e&&kb(w({},a,{type:a.type.slice(1)}));break;case"_mouseup":xb(b,O.activeClass),O.bubbleEvents===!0&&e&&kb(w({},a,{type:a.type.slice(1)}));break;case"_click":d=null,O.bubbleEvents===!0&&e&&kb(w({},a,{type:a.type.slice(1)}));break;case"_mousemove":O.bubbleEvents===!0&&e&&kb(w({},a,{type:a.type.slice(1)}))}return/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)?!0:void 0},kb=function(a){if(a&&"string"==typeof a.type&&a){var b,c=a.target||null,d=c&&c.ownerDocument||f,g={view:d.defaultView||e,canBubble:!0,cancelable:!0,detail:"click"===a.type?1:0,button:"number"==typeof a.which?a.which-1:"number"==typeof a.button?a.button:d.createEvent?0:1},h=w(g,a);c&&d.createEvent&&c.dispatchEvent&&(h=[h.type,h.canBubble,h.cancelable,h.view,h.detail,h.screenX,h.screenY,h.clientX,h.clientY,h.ctrlKey,h.altKey,h.shiftKey,h.metaKey,h.button,h.relatedTarget],b=d.createEvent("MouseEvents"),b.initMouseEvent&&(b.initMouseEvent.apply(b,h),b._source="js",c.dispatchEvent(b)))}},lb=function(){var a=f.createElement("div");return a.id=O.containerId,a.className=O.containerClass,a.style.position="absolute",a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.height="1px",a.style.zIndex=""+Db(O.zIndex),a},mb=function(a){for(var b=a&&a.parentNode;b&&"OBJECT"===b.nodeName&&b.parentNode;)b=b.parentNode;return b||null},nb=function(){var a,b=I.bridge,c=mb(b);if(!b){var d=ub(e.location.host,O),g="never"===d?"none":"all",h=sb(O),i=O.swfPath+rb(O.swfPath,O);c=lb();var j=f.createElement("div");c.appendChild(j),f.body.appendChild(c);var k=f.createElement("div"),l="activex"===I.pluginType;k.innerHTML='<object id="'+O.swfObjectId+'" name="'+O.swfObjectId+'" width="100%" height="100%" '+(l?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'type="application/x-shockwave-flash" data="'+i+'"')+">"+(l?'<param name="movie" value="'+i+'"/>':"")+'<param name="allowScriptAccess" value="'+d+'"/><param name="allowNetworking" value="'+g+'"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="'+h+'"/></object>',b=k.firstChild,k=null,u(b).ZeroClipboard=Fb,c.replaceChild(b,j)}return b||(b=f[O.swfObjectId],b&&(a=b.length)&&(b=b[a-1]),!b&&c&&(b=c.firstChild)),I.bridge=b||null,b},ob=function(){var a=I.bridge;if(a){var b=mb(a);b&&("activex"===I.pluginType&&"readyState"in a?(a.style.display="none",function c(){if(4===a.readyState){for(var d in a)"function"==typeof a[d]&&(a[d]=null);a.parentNode&&a.parentNode.removeChild(a),b.parentNode&&b.parentNode.removeChild(b)}else h(c,10)}()):(a.parentNode&&a.parentNode.removeChild(a),b.parentNode&&b.parentNode.removeChild(b))),I.ready=null,I.bridge=null,I.deactivated=null}},pb=function(a){var b={},c={};if("object"==typeof a&&a){for(var d in a)if(d&&s.call(a,d)&&"string"==typeof a[d]&&a[d])switch(d.toLowerCase()){case"text/plain":case"text":case"air:text":case"flash:text":b.text=a[d],c.text=d;break;case"text/html":case"html":case"air:html":case"flash:html":b.html=a[d],c.html=d;break;case"application/rtf":case"text/rtf":case"rtf":case"richtext":case"air:rtf":case"flash:rtf":b.rtf=a[d],c.rtf=d}return{data:b,formatMap:c}}},qb=function(a,b){if("object"!=typeof a||!a||"object"!=typeof b||!b)return a;var c={};for(var d in a)if(s.call(a,d)){if("success"!==d&&"data"!==d){c[d]=a[d];continue}c[d]={};var e=a[d];for(var f in e)f&&s.call(e,f)&&s.call(b,f)&&(c[d][b[f]]=e[f])}return c},rb=function(a,b){var c=null==b||b&&b.cacheBust===!0;return c?(-1===a.indexOf("?")?"?":"&")+"noCache="+p():""},sb=function(a){var b,c,d,f,g="",h=[];if(a.trustedDomains&&("string"==typeof a.trustedDomains?f=[a.trustedDomains]:"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(f=a.trustedDomains)),f&&f.length)for(b=0,c=f.length;c>b;b++)if(s.call(f,b)&&f[b]&&"string"==typeof f[b]){if(d=tb(f[b]),!d)continue;if("*"===d){h.length=0,h.push(d);break}h.push.apply(h,[d,"//"+d,e.location.protocol+"//"+d])}return h.length&&(g+="trustedOrigins="+i(h.join(","))),a.forceEnhancedClipboard===!0&&(g+=(g?"&":"")+"forceEnhancedClipboard=true"),"string"==typeof a.swfObjectId&&a.swfObjectId&&(g+=(g?"&":"")+"swfObjectId="+i(a.swfObjectId)),g},tb=function(a){if(null==a||""===a)return null;if(a=a.replace(/^\s+|\s+$/g,""),""===a)return null;var b=a.indexOf("//");a=-1===b?a:a.slice(b+2);var c=a.indexOf("/");return a=-1===c?a:-1===b||0===c?null:a.slice(0,c),a&&".swf"===a.slice(-4).toLowerCase()?null:a||null},ub=function(){var a=function(a){var b,c,d,e=[];if("string"==typeof a&&(a=[a]),"object"!=typeof a||!a||"number"!=typeof a.length)return e;for(b=0,c=a.length;c>b;b++)if(s.call(a,b)&&(d=tb(a[b]))){if("*"===d){e.length=0,e.push("*");break}-1===e.indexOf(d)&&e.push(d)}return e};return function(b,c){var d=tb(c.swfPath);null===d&&(d=b);var e=a(c.trustedDomains),f=e.length;if(f>0){if(1===f&&"*"===e[0])return"always";if(-1!==e.indexOf(b))return 1===f&&b===d?"sameDomain":"always"}return"never"}}(),vb=function(){try{return f.activeElement}catch(a){return null}},wb=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)||a.classList.add(b),a;if(b&&"string"==typeof b){var c=(b||"").split(/\s+/);if(1===a.nodeType)if(a.className){for(var d=" "+a.className+" ",e=a.className,f=0,g=c.length;g>f;f++)d.indexOf(" "+c[f]+" ")<0&&(e+=" "+c[f]);a.className=e.replace(/^\s+|\s+$/g,"")}else a.className=b}return a},xb=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)&&a.classList.remove(b),a;if("string"==typeof b&&b){var c=b.split(/\s+/);if(1===a.nodeType&&a.className){for(var d=(" "+a.className+" ").replace(/[\n\t]/g," "),e=0,f=c.length;f>e;e++)d=d.replace(" "+c[e]+" "," ");a.className=d.replace(/^\s+|\s+$/g,"")}}return a},yb=function(a,b){var c=e.getComputedStyle(a,null).getPropertyValue(b);return"cursor"!==b||c&&"auto"!==c||"A"!==a.nodeName?c:"pointer"},zb=function(){var a,b,c,d=1;return"function"==typeof f.body.getBoundingClientRect&&(a=f.body.getBoundingClientRect(),b=a.right-a.left,c=f.body.offsetWidth,d=o(b/c*100)/100),d},Ab=function(a){var b={left:0,top:0,width:0,height:0};if(a.getBoundingClientRect){var c,d,g,h=a.getBoundingClientRect();"pageXOffset"in e&&"pageYOffset"in e?(c=e.pageXOffset,d=e.pageYOffset):(g=zb(),c=o(f.documentElement.scrollLeft/g),d=o(f.documentElement.scrollTop/g));var i=f.documentElement.clientLeft||0,j=f.documentElement.clientTop||0;b.left=h.left+c-i,b.top=h.top+d-j,b.width="width"in h?h.width:h.right-h.left,b.height="height"in h?h.height:h.bottom-h.top}return b},Bb=function(){var a;if(c&&(a=mb(I.bridge))){var b=Ab(c);w(a.style,{width:b.width+"px",height:b.height+"px",top:b.top+"px",left:b.left+"px",zIndex:""+Db(O.zIndex)})}},Cb=function(a){I.ready===!0&&(I.bridge&&"function"==typeof I.bridge.setHandCursor?I.bridge.setHandCursor(a):I.ready=!1)},Db=function(a){if(/^(?:auto|inherit)$/.test(a))return a;var b;return"number"!=typeof a||n(a)?"string"==typeof a&&(b=Db(l(a,10))):b=a,"number"==typeof b?b:"auto"},Eb=function(a){function b(a){var b=a.match(/[\d]+/g);return b.length=3,b.join(".")}function c(a){return!!a&&(a=a.toLowerCase())&&(/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a)||"chrome.plugin"===a.slice(-13))}function d(a){a&&(i=!0,a.version&&(l=b(a.version)),!l&&a.description&&(l=b(a.description)),a.filename&&(k=c(a.filename)))}var e,f,h,i=!1,j=!1,k=!1,l="";if(g.plugins&&g.plugins.length)e=g.plugins["Shockwave Flash"],d(e),g.plugins["Shockwave Flash 2.0"]&&(i=!0,l="2.0.0.11");else if(g.mimeTypes&&g.mimeTypes.length)h=g.mimeTypes["application/x-shockwave-flash"],e=h&&h.enabledPlugin,d(e);else if("undefined"!=typeof a){j=!0;try{f=new a("ShockwaveFlash.ShockwaveFlash.7"),i=!0,l=b(f.GetVariable("$version"))}catch(n){try{f=new a("ShockwaveFlash.ShockwaveFlash.6"),i=!0,l="6.0.21"}catch(o){try{f=new a("ShockwaveFlash.ShockwaveFlash"),i=!0,l=b(f.GetVariable("$version"))}catch(p){j=!1}}}}I.disabled=i!==!0,I.outdated=l&&m(l)<m(J),I.version=l||"0.0.0",I.pluginType=k?"pepper":j?"activex":i?"netscape":"unknown"};Eb(j);var Fb=function(){return this instanceof Fb?void("function"==typeof Fb._createClient&&Fb._createClient.apply(this,v(arguments))):new Fb};r(Fb,"version",{value:"2.1.6",writable:!1,configurable:!0,enumerable:!0}),Fb.config=function(){return P.apply(this,v(arguments))},Fb.state=function(){return Q.apply(this,v(arguments))},Fb.isFlashUnusable=function(){return R.apply(this,v(arguments))},Fb.on=function(){return S.apply(this,v(arguments))},Fb.off=function(){return T.apply(this,v(arguments))},Fb.handlers=function(){return U.apply(this,v(arguments))},Fb.emit=function(){return V.apply(this,v(arguments))},Fb.create=function(){return W.apply(this,v(arguments))},Fb.destroy=function(){return X.apply(this,v(arguments))},Fb.setData=function(){return Y.apply(this,v(arguments))},Fb.clearData=function(){return Z.apply(this,v(arguments))},Fb.getData=function(){return $.apply(this,v(arguments))},Fb.focus=Fb.activate=function(){return _.apply(this,v(arguments))},Fb.blur=Fb.deactivate=function(){return ab.apply(this,v(arguments))},Fb.activeElement=function(){return bb.apply(this,v(arguments))};var Gb=0,Hb={},Ib=0,Jb={},Kb={};w(O,{autoActivate:!0});var Lb=function(a){var b=this;b.id=""+Gb++,Hb[b.id]={instance:b,elements:[],handlers:{}},a&&b.clip(a),Fb.on("*",function(a){return b.emit(a)}),Fb.on("destroy",function(){b.destroy()}),Fb.create()},Mb=function(a,b){var c,d,e,f={},g=Hb[this.id]&&Hb[this.id].handlers;if("string"==typeof a&&a)e=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)s.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.on(c,a[c]);if(e&&e.length){for(c=0,d=e.length;d>c;c++)a=e[c].replace(/^on/,""),f[a]=!0,g[a]||(g[a]=[]),g[a].push(b);if(f.ready&&I.ready&&this.emit({type:"ready",client:this}),f.error){var h=["disabled","outdated","unavailable","deactivated","overdue"];for(c=0,d=h.length;d>c;c++)if(I[h[c]]){this.emit({type:"error",name:"flash-"+h[c],client:this});break}}}return this},Nb=function(a,b){var c,d,e,f,g,h=Hb[this.id]&&Hb[this.id].handlers;if(0===arguments.length)f=q(h);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)s.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=h[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return this},Ob=function(a){var b=null,c=Hb[this.id]&&Hb[this.id].handlers;return c&&(b="string"==typeof a&&a?c[a]?c[a].slice(0):[]:x(c)),b},Pb=function(a){if(Ub.call(this,a)){"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(a=w({},a));var b=w({},db(a),{client:this});Vb.call(this,b)}return this},Qb=function(a){a=Wb(a);for(var b=0;b<a.length;b++)if(s.call(a,b)&&a[b]&&1===a[b].nodeType){a[b].zcClippingId?-1===Jb[a[b].zcClippingId].indexOf(this.id)&&Jb[a[b].zcClippingId].push(this.id):(a[b].zcClippingId="zcClippingId_"+Ib++,Jb[a[b].zcClippingId]=[this.id],O.autoActivate===!0&&Xb(a[b]));var c=Hb[this.id]&&Hb[this.id].elements;-1===c.indexOf(a[b])&&c.push(a[b])}return this},Rb=function(a){var b=Hb[this.id];if(!b)return this;var c,d=b.elements;a="undefined"==typeof a?d.slice(0):Wb(a);for(var e=a.length;e--;)if(s.call(a,e)&&a[e]&&1===a[e].nodeType){for(c=0;-1!==(c=d.indexOf(a[e],c));)d.splice(c,1);var f=Jb[a[e].zcClippingId];if(f){for(c=0;-1!==(c=f.indexOf(this.id,c));)f.splice(c,1);0===f.length&&(O.autoActivate===!0&&Yb(a[e]),delete a[e].zcClippingId)}}return this},Sb=function(){var a=Hb[this.id];return a&&a.elements?a.elements.slice(0):[]},Tb=function(){this.unclip(),this.off(),delete Hb[this.id]},Ub=function(a){if(!a||!a.type)return!1;if(a.client&&a.client!==this)return!1;var b=Hb[this.id]&&Hb[this.id].elements,c=!!b&&b.length>0,d=!a.target||c&&-1!==b.indexOf(a.target),e=a.relatedTarget&&c&&-1!==b.indexOf(a.relatedTarget),f=a.client&&a.client===this;return d||e||f?!0:!1},Vb=function(a){if("object"==typeof a&&a&&a.type){var b=gb(a),c=Hb[this.id]&&Hb[this.id].handlers["*"]||[],d=Hb[this.id]&&Hb[this.id].handlers[a.type]||[],f=c.concat(d);if(f&&f.length){var g,h,i,j,k,l=this;for(g=0,h=f.length;h>g;g++)i=f[g],j=l,"string"==typeof i&&"function"==typeof e[i]&&(i=e[i]),"object"==typeof i&&i&&"function"==typeof i.handleEvent&&(j=i,i=i.handleEvent),"function"==typeof i&&(k=w({},a),hb(i,j,[k],b))}return this}},Wb=function(a){return"string"==typeof a&&(a=[]),"number"!=typeof a.length?[a]:a},Xb=function(a){if(a&&1===a.nodeType){var b=function(a){(a||(a=e.event))&&("js"!==a._source&&(a.stopImmediatePropagation(),a.preventDefault()),delete a._source)},c=function(c){(c||(c=e.event))&&(b(c),Fb.focus(a))};a.addEventListener("mouseover",c,!1),a.addEventListener("mouseout",b,!1),a.addEventListener("mouseenter",b,!1),a.addEventListener("mouseleave",b,!1),a.addEventListener("mousemove",b,!1),Kb[a.zcClippingId]={mouseover:c,mouseout:b,mouseenter:b,mouseleave:b,mousemove:b}}},Yb=function(a){if(a&&1===a.nodeType){var b=Kb[a.zcClippingId];if("object"==typeof b&&b){for(var c,d,e=["move","leave","enter","out","over"],f=0,g=e.length;g>f;f++)c="mouse"+e[f],d=b[c],"function"==typeof d&&a.removeEventListener(c,d,!1);delete Kb[a.zcClippingId]}}};Fb._createClient=function(){Lb.apply(this,v(arguments))},Fb.prototype.on=function(){return Mb.apply(this,v(arguments))},Fb.prototype.off=function(){return Nb.apply(this,v(arguments))},Fb.prototype.handlers=function(){return Ob.apply(this,v(arguments))},Fb.prototype.emit=function(){return Pb.apply(this,v(arguments))},Fb.prototype.clip=function(){return Qb.apply(this,v(arguments))},Fb.prototype.unclip=function(){return Rb.apply(this,v(arguments))},Fb.prototype.elements=function(){return Sb.apply(this,v(arguments))},Fb.prototype.destroy=function(){return Tb.apply(this,v(arguments))},Fb.prototype.setText=function(a){return Fb.setData("text/plain",a),this},Fb.prototype.setHtml=function(a){return Fb.setData("text/html",a),this},Fb.prototype.setRichText=function(a){return Fb.setData("application/rtf",a),this},Fb.prototype.setData=function(){return Fb.setData.apply(this,v(arguments)),this},Fb.prototype.clearData=function(){return Fb.clearData.apply(this,v(arguments)),this},Fb.prototype.getData=function(){return Fb.getData.apply(this,v(arguments))},"function"==typeof define&&define.amd?define(function(){return Fb}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?module.exports=Fb:a.ZeroClipboard=Fb}(function(){return this||window}());
//# sourceMappingURL=ZeroClipboard.min.map
window.Mirador = window.Mirador || function(config) {

  // pass the config through the save and restore process,
  // returning the config that will, in fact, populate the
  // application.
  Mirador.saveController = new Mirador.SaveController(config);

  config = Mirador.saveController.currentConfig;

  // initialise application 
  Mirador.viewer = new Mirador.Viewer(config);
  
};


(function($) {

  /**
   * Default values for settings
   */
  $.DEFAULT_SETTINGS = {

    'workspaceAutoSave': true,

    'currentWorkspaceType': 'singleObject',

    'availableWorkspaces': ['singleObject', 'compare', 'bookReading', 'quad'],
      
    'workspaces' : {
       'singleObject': {
            'slots': [{
            }],
            'label': 'Single Object',
            'addNew': false,
            'move': false,
            'iconClass': 'image'
        },
        'compare': {
          'slots': [{
            type: "column",
            size: 50
          },
          {
            type: "column",
            size: 50
          }],
            'label': 'Compare',
            'iconClass': 'columns'
        },
        
        'bookReading': {
            'slots': [
              {}
            ],
            'defaultWindowOptions': {
            },
            'label': 'Book Reading',
            'addNew': true,
            'move': false,
            'iconClass': 'book'
        },
        'quad': {
          'slots': [
            { type: 'column',
              size: 50,
              positions: [{
                type: 'row', 
                size:50
              },
              { 
                type: 'row',
                size:50
              }]
          },
            { type: 'column',
              size: 50,
              positions: [{
                type: 'row', 
                size:50
              },
              { 
                type: 'row',
                size:50
              }]
          }],
            'label': 'quad',
            'iconClass': 'th-large'
        }
        // add new workspace types by appending a 
        // profile with plugin initialisation code:
        // $.DEFAULT_SETTINGS.workspaces['myNwqWorkspace'] = {...}
    },
    
    'windowObjects' : [
      /** within a single object, the following options:
      *   "loadedManifest": [manifestURI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json"
      *   "availableViews" : defaults to ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'], any subset removes others
      *   "viewType" : one of ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'] - if using availableViews, must be in subset
      *   "canvasID": [canvas URI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/canvas/canvas-12"
      *   "bottomPanel" : [true, false]
      *   "sidePanel" : [true, false]
      *   "overlay" : [true, false]
      *   "windowOptions" : [data specific to the view type, such as OSD bounds and zoom level - automatically saved in SaveController]
      *   "id" : [unique window ID - set by application and automatically saved in SaveController],
      **/
    ],
    
    // main (top) menu
    'mainMenu': {
      'autoHide': true,
      'height': 25,
      'width': '100%'
    },

   'repoImages' : {
      'Yale University': 'yale_logo.jpeg',
      'Stanford University': 'sul_logo.jpeg',
      'Harvard University': 'harvard_logo.png',
      'other': 'iiif_logo.png'
    },

    // // metadata view
    // unclear what options should exist here.
    // 'metadataView': {
    //   'height': 400,
    //   'width': 600
    // },

    // // metadata view
    //
    // What can we learn from this and the
    // openi https://github.com/CtrHellenicStudies/OpenSeaDragonAnnotation
    // annotator-based branches of the RC? 
    //
    // 'openLayersAnnotoriusView': {
    //   'appId': 'lQ9BqPkPRVJR4Qbe652BapTP2JVDNzS0G2k6GCWW', // Parse.com app id
    //   'jsKey': 'VbYdon3U70Wi8aht9Y8Z2eRk3FmOsO2n1lQhx1vV', // Parse.com js_key
    //   'height': 400,
    //   'width': 600,
    //   'maxSize': 2500, // max longest side to load in open layers
    //   'maxZoomLevel': 4
    // },
    
    'annotationEndpoint': {
      'url': '',
      'storeId': 123,
      'APIKey': '23983hf98j3f9283jf2983fj'
    },
    
    // parameters of saving system
    'saveController': {
        // TODO: make saving a function of significant user action, not timed intervals.
    },

    'sharingEndpoint': {
      'url': '',
      'storeId': 123,
      'APIKey': '23983hf98j3f9283jf2983fj'
    },

    // linked image views configuration
    'lockController' : {
      'lockProfile' : 'lazyZoom',
      'notifyMaxMin' : true
    }
  };

}(Mirador));

(function($) {

    $.Viewer = function(options) {

        jQuery.extend(true, this, {
            id:                     options.id,
            hash:                   options.id,
            data:                   null,
            element:                null,
            canvas:                 null,
            currentWorkspaceType:       null,
            activeWorkspace:        null,
            availableWorkspaces:    null,
            mainMenu:               null,
            //mainMenuLoadWindowCls:  '.mirador-main-menu .load-window',
            workspaceAutoSave:      $.DEFAULT_SETTINGS.workspaceAutoSave,
            windowSize:             {},
            resizeRatio:            {},
            currentWorkspaceVisible: true,
            overlayStates:           {'workspacesPanelVisible': false, 'manifestsPanelVisible': false, 'optionsPanelVisible': false, 'bookmarkPanelVisible': false},
            manifests:               {}
        }, $.DEFAULT_SETTINGS, options);

        // get initial manifests
        this.element = this.element || jQuery('#' + this.id);

        if (this.data) {
            this.init();
        }

    };

    $.Viewer.prototype = {

        init: function() {
            // retrieve manifests
            this.manifests = this.getManifestsData();

            // add main menu
            this.mainMenu = new $.MainMenu({ parent: this, appendTo: this.element });

            // add viewer area
            this.canvas = jQuery('<div/>')
            .addClass('mirador-viewer')
            .appendTo(this.element);

            // add workspace configuration
            this.activeWorkspace = new $.Workspace({type: this.currentWorkspaceType, parent: this, appendTo: this.element.find('.mirador-viewer') });

            // add workspaces panel
            this.workspacesPanel = new $.WorkspacesPanel({appendTo: this.element.find('.mirador-viewer'), parent: this});

            // add workset select menu (hidden by default) 
            this.manifestsPanel = new $.ManifestsPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });
            
            this.bookmarkPanel = new $.BookmarkPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });
            
            //set this to be displayed
            this.set('currentWorkspaceVisible', true);
            
            this.bindEvents();
        },
        
        bindEvents: function() {
           var _this = this;
           jQuery.subscribe('manifestAdded', function(event, newManifest, repository) {
               if (_this.windowObjects) {
                   jQuery.each(_this.windowObjects, function(index, object) {
                       if (object.loadedManifest === newManifest) {
                           _this.loadManifestFromConfig(object);
                       }
                   });
               }
           });
        },
        
        get: function(prop, parent) {
            if (parent) {
                return this[parent][prop];
            }
            return this[prop];
        },

        set: function(prop, value, options) {
            var _this = this;
            if (options) {
                this[options.parent][prop] = value;
            } else {
                this[prop] = value;
            }
            jQuery.publish(prop + '.set', value);
        },

        switchWorkspace: function(type) {
          _this = this;

          console.log(type);
          _this.activeWorkspace.element.remove();
          delete _this.activeWorkspace;

          _this.activeWorkspace = new $.Workspace({type: type, parent: this, appendTo: this.element.find('.mirador-viewer') });
          
          _this.toggleSwitchWorkspace();
        },
        
        // Sets state of overlays that layer over the UI state
        toggleOverlay: function(state) {
           var _this = this;
           //first confirm all others are off
           jQuery.each(this.overlayStates, function(oState, value) {
              if (state !== oState) {
                 _this.set(oState, false, {parent: 'overlayStates'});
              }
           });
           var currentState = this.get(state, 'overlayStates');
           this.set(state, !currentState, {parent: 'overlayStates'});
        },
        
        toggleLoadWindow: function(targetSlot) {
            this.toggleOverlay('manifestsPanelVisible');
        },
        
        toggleSwitchWorkspace: function() {
            this.toggleOverlay('workspacesPanelVisible');
        },
        
        toggleBookmarkPanel: function() {
            this.toggleOverlay('bookmarkPanelVisible');
        },

        getManifestsData: function() {
            var _this = this,
            manifests = {},
            loadingOrder = [];

            jQuery.each(_this.data, function(index, collection) {
                if (_this.hasWidgets(collection)) {
                    loadingOrder.unshift(index);
                } else {
                    loadingOrder.push(index);
                }
            });

            jQuery.each(loadingOrder, function(index, order) {
                var manifest = _this.data[order];
                var url = manifest.manifestUri;

                if (!jQuery.isEmptyObject(manifest)) {
                    // populate blank object for immediate, synchronous return
                    manifests[url] = null;
                    _this.addManifestFromUrl(url, manifest.location ? manifest.location : '');
                }

            });

            return manifests;
        },
        
        hasWidgets: function(collection) {
            return (
                typeof collection.widgets !== 'undefined' &&
                collection.widgets &&
                !jQuery.isEmptyObject(collection.widgets) &&
                collection.widgets.length > 0
            );
        },

        addManifestFromUrl: function(url, location) {
            var _this = this,
            dfd = jQuery.Deferred();

            var manifest = new $.Manifest(url, dfd);

            dfd.done(function(loaded) {
                if (loaded && !_this.manifests[url]) {
                    _this.manifests[url] = manifest.jsonLd;
                    _this.manifests[url].miradorRepository = location;
                    jQuery.publish('manifestAdded', [url, location]);
                }
            });
        },
        
        loadManifestFromConfig: function(options) {
           var windowConfig = {
           currentFocus : options.viewType,
           focuses : options.availableViews,
           currentImageID : options.canvasID,
           id : options.id,
           focusOptions : options.windowOptions,
           bottomPanelAvailable : options.bottomPanel,
           sidePanelAvailable : options.sidePanel,
           overlayAvailable : options.overlay
           };
           this.addManifestToWorkspace(options.loadedManifest, windowConfig);
        },
        
        addManifestToWorkspace: function(manifestURI, windowConfig) {
            var manifest = this.manifests[manifestURI],
            _this = this;
            windowConfig.manifest = manifest;
            jQuery.each(this.overlayStates, function(oState, value) {
                _this.set(oState, false, {parent: 'overlayStates'});
            });
            
            // If the chooseManifest panel was not invoked from a 
            // particular slot, but rather from the selectObject menu,
            // then let the viewer decide where to put the resulting window
            // according to the workspace type.
              // slotID is appended to event name so only 
              // the invoking slot initialises a new window in 
              // itself.
              jQuery.publish('manifestToSlot', windowConfig); 
        },
        
        toggleImageViewInWorkspace: function(imageID, manifestURI) {
           this.addManifestToWorkspace(manifestURI, 
              {currentFocus: 'ImageView', 
              currentImageID: imageID});
        },
        
        toggleThumbnailsViewInWorkspace: function(manifestURI) {
           this.addManifestToWorkspace(manifestURI,
              {currentFocus: 'ThumbnailsView', 
              currentImageID: null});
        }
    };

}(Mirador));


(function($) {

  $.Widget = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.Widget.prototype = {

  };

}(Mirador));


(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      type:             null,
      workspaceSlotCls: 'slot',
      focusedSlot:      null,
      slots:            null,
      appendTo:         null,
      parent:           null

    }, options);

    this.element  = this.element || jQuery('<div class="workspace-container">');
    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);

      if (this.focusedSlot === null) {
        // set the focused slot to the first in the list
        this.focusedSlot = 0;
      }
      
      if (!this.slots) { 
        this.slots = [];
        this.slots.push(new $.Slot({
          slotId: 0,
          focused: true,
          parent: this,
          appendTo: this.element
        }));
        this.element.append(this.template({ slots: $.DEFAULT_SETTINGS.workspaces[this.type].slots }));
      } else {
        this.element.append(this.template(this.slots));
      }

      this.bindEvents();
    },
    template: function(tplData) {

      var template = Handlebars.compile([
        '{{#each slots}}',
        '{{/each }}'
      ].join(''));

      var previousTemplate;

      Handlebars.registerHelper('insertParentSlot', function(children, options) {
        var out = '';

        if (options.fn !== undefined) {
          previousTemplate = options.fn;
        }

        children.forEach(function(child) {
          out = out + previousTemplate(child);
        });
        
        return out;
      });

      Handlebars.registerHelper('tocLevel', function(id, label, level, children) {
        var caret = '<i class="fa fa-caret-right caret"></i>',
        cert = '<i class="fa fa-certificate star"></i>';
        return '<h' + (level+1) + '><a class="toc-link" data-rangeID="' + id + '">' + caret + cert + '<span class="label">' + label + '</span></a></h' + (level+1) + '>';
      });

      return template(tplData);
    },

    bindEvents: function() {
      var _this = this;
    },

    addSlot: function() {

    },
    removeSlot: function() {

    },
    clearSlot: function(slotId) {
      if (this.slots[slodId].windowElement) { 
        this.slots[slotId].windowElement.remove();
      }
      this.slots[slotId].window = new $.Window();
    },
    addItem: function(slotID) {
      this.focusedSlot = slotID;
      this.parent.toggleLoadWindow();
    },
    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },
    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    }
  };

}(Mirador));


(function($) {

  $.BookmarkPanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      parent: null,
      jsonblob: null,
      zeroclient: null
    }, options);

    this.init();

  };

  $.BookmarkPanel.prototype = {
    init: function () {
      this.element = jQuery(this.template()).appendTo(this.appendTo);
      this.zeroclient = new ZeroClipboard(this.element.find('.mirador-icon-copy'));
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      // handle subscribed events
      jQuery.subscribe('bookmarkPanelVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });
    },
    
    postSuccess: function() {
       
    },

    hide: function() {
      jQuery(this.element).hide({effect: "slide", direction: "up", duration: 1000, easing: "swing"});    
    },

    show: function() {
      var _this = this,
      ajaxType = 'POST',
      ajaxURL = "http://jsonblob.com/api/jsonBlob";
      
      if (this.jsonblob) {
          ajaxType = 'PUT';
          ajaxURL = ajaxURL + "/" + this.jsonblob;
      }
      jQuery.ajax({
          type: ajaxType,
          url: ajaxURL, 
          data: JSON.stringify(Mirador.saveController.currentConfig), 
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          },
          success: function(data, textStatus, request) {
              if (!_this.jsonblob) {
                  _this.jsonblob = request.getResponseHeader('X-Jsonblob');
              }
              var bookmarkURL = window.location.href.replace(window.location.hash, '') + "?json="+_this.jsonblob;
              _this.element.find('#share-url').val(bookmarkURL);
              //TODO if flash isn't available to browser, auto highlight the URL
         }
      });
      jQuery(this.element).show({effect: "slide", direction: "up", duration: 1000, easing: "swing"});
    },

    template: Handlebars.compile([
       '<div id="bookmark-panel">',
         '<h3>Bookmark or Share Your Workspace</h3>',
         '<span>',
         'URL: <input id="share-url" type="text"></input>',
         '<a href="javascript:;" class="mirador-btn mirador-icon-copy" data-clipboard-target="share-url"><i class="fa fa-files-o fa-lg"></i></a>',
         '</span>',
       '</div>'
    ].join(''))
  };

}(Mirador));


(function($) {

    $.MainMenu = function(options) {

        jQuery.extend(true, this, {
            parent:                     null,
            element:                    null,
            mainMenuHeight:             $.DEFAULT_SETTINGS.mainMenu.height,
            mainMenuWidth:              $.DEFAULT_SETTINGS.mainMenu.width,
            windowOptionsMenu:          null,
            loadWindow:                 null,
            clearLocalStorage:          '',
            viewerCls:                  'mirador-viewer',
            mainMenuBarCls:             'mirador-main-menu-bar',
            mainMenuCls:                'mirador-main-menu',
            windowOptionsMenuCls:       'mirador-window-options-menu',
            clearLocalStorageCls:       'clear-local-storage',
            clearLocalStorageDialogCls: 'mirador-main-menu-clear-local-storage',
            collectionsListingCls:      'mirador-listing-collections'
        }, options);

        this.element  = this.element || jQuery('<div/>');

        this.init();
    };


    $.MainMenu.prototype = {

        init: function() {
            this.element
            .addClass(this.mainMenuBarCls)
            .height(this.mainMenuHeight)
            .width(this.mainMenuWidth)
            .appendTo(this.appendTo);


            this.element.append(this.template({
                mainMenuCls: this.mainMenuCls
            }));

            this.bindEvents();
        },

        bindEvents: function() {
            var _this = this;
            this.element.find('.load-window').on('click', function() { _this.parent.toggleLoadWindow(); });
            this.element.find('.switch-workspace').on('click', function() { _this.parent.toggleSwitchWorkspace(); });
            this.element.find('.bookmark-workspace').on('click', function() { _this.parent.toggleBookmarkPanel(); });
        },

        template: Handlebars.compile([
        '<ul class="{{mainMenuCls}}">',
          '<li>',
            '<a href="javascript:;" class="bookmark-workspace" title="Bookmark Workspace">',
              '<span class="icon-bookmark-workspace"></span>Bookmark',
            '</a>',
          '</li>',
          '<li>',
            '<a href="javascript:;" class="load-window" title="Load Window">',
              '<span class="icon-load-window"></span>Select Object',
            '</a>',
          '</li>',
          '<li>',
            '<a href="javascript:;" class="window-options" title="Window Options">',
              '<span class="icon-window-options"></span>Options',
            '</a>',
          '</li>',
          '<li>',
            '<a href="javascript:;" class="switch-workspace" title="Switch Workspace">',
              '<span class="icon-window-options"></span>Switch Workspace',
            '</a>',
          '</li>',
        '</ul>'
      ].join(''))
    };
}(Mirador));

(function($) {

    $.ManifestListItem = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            parent:                     null,
            manifestId:                 null,
            loadStatus:                 null,
            thumbHeight:                80,
            resultsWidth:               0,  //based on screen width
            maxPreviewImagesWidth:      0,
            repoWidth:                  80,
            metadataWidth:              200,
            margin:                     15,
            remainingItemsMinWidth:     80,  //set a minimum width for the "more" image
            imagesTotalWidth:           0
        }, options);

        this.init();
        
    };

    $.ManifestListItem.prototype = {

        init: function() {
           var _this = this;
           //need a better way of calculating this because JS can't get width and margin of hidden elements, so must manually set that info
           //ultimately use 95% of space available, since sometimes it still displays too many images
           this.maxPreviewImagesWidth = this.resultsWidth - (this.repoWidth + this.margin + this.metadataWidth + this.margin + this.remainingItemsMinWidth);
           this.maxPreviewImagesWidth = this.maxPreviewImagesWidth * 0.95;
          
           this.element = jQuery(this.template(this.fetchTplData(this.manifestId))).prependTo(this.parent.manifestListElement).hide().fadeIn('slow');

           var remainingOffset = this.repoWidth + this.margin + this.metadataWidth + this.margin + this.imagesTotalWidth;
           this.element.find('.remaining-items').css('left', remainingOffset);

           this.bindEvents();
        },

        fetchTplData: function() {
          var _this = this;

          var manifest = $.viewer.manifests[_this.manifestId];

          var tplData = { 
            label: manifest.label,
            repository: manifest.miradorRepository,
            canvasCount: manifest.sequences[0].canvases.length,
            images: []
          };
          
          tplData.repoImage = (function() {
            var repo = tplData.repository;
            if (tplData.repository === '(Added from URL)') {
               repo = '';
            }            
            var imageName = $.DEFAULT_SETTINGS.repoImages[repo || 'other'];

            return 'images/' + imageName;
          })();

          for ( var i=0; i < manifest.sequences[0].canvases.length; i++) {
            var canvas = manifest.sequences[0].canvases[i],
            resource = canvas.images[0].resource['default'] ? canvas.images[0].resource['default'] : canvas.images[0].resource,
            service = resource.service,
            url = $.Iiif.getUriWithHeight(service['@id'], _this.thumbHeight),
            aspectRatio = resource.height/resource.width,
            width = (_this.thumbHeight/aspectRatio);
            
            _this.imagesTotalWidth += (width + _this.margin);
            if (_this.imagesTotalWidth >= _this.maxPreviewImagesWidth) {
               _this.imagesTotalWidth -= (width + _this.margin);
               break;
            }
                        
            tplData.images.push({
              url: url,
              width: width,
              height: _this.thumbHeight,
              id: canvas['@id']
            });
          }
          
          tplData.remaining = (function() {
              var remaining = manifest.sequences[0].canvases.length - tplData.images.length;
              if (remaining > 0) {
                return remaining;
              }
            })();

          return tplData;
        },

        render: function() {

        },

        bindEvents: function() {
          var _this = this;
          
          this.element.find('img').on('load', function() {
            jQuery(this).hide().fadeIn(750);
          });
          
          this.element.find('.select-metadata').on('click', function() {
              $.viewer.toggleThumbnailsViewInWorkspace(_this.manifestId);
          });

          this.element.find('.preview-image').on('click', function() {
            $.viewer.toggleImageViewInWorkspace(jQuery(this).attr('data-image-id'), _this.manifestId);
          });
        },

        hide: function() {
            var _this = this;
        },

        show: function() {
            var _this = this;
        },

        template: Handlebars.compile([
                      '<li>',
                      '<div class="repo-image">',
                        '<img src="{{repoImage}}" alt="repoImg">',
                      '</div>',
                      '<div class="select-metadata">',
                          '<h3 class="manifest-title">{{label}}</h3>',
                          '<h4 >{{canvasCount}} items</h4>',
                      '{{#if repository}}',
                          '<h4 class="repository-label">{{repository}}</h4>',
                      '{{/if}}',
                      '</div>',
                      '<div class="preview-images">',
                      '{{#each images}}',
                        '<img src="{{url}}" width="{{width}}" height="{{height}}" class="preview-image flash" data-image-id="{{id}}">',
                      '{{/each}}',
                      '</div>',
                       '{{#if remaining}}',
                         '<div class="remaining-items"><h3>{{remaining}} more</h3></div>',
                       '{{/if}}',
                      '</li>'
        ].join(''))
    };

}(Mirador));


(function ($) {
  return 'blank';
})(Mirador);

(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            listItems:                  null,
            appendTo:                   null,
            parent:                     null,
            manifestListItems:          [],
            manifestListElement:        null,
            manifestLoadStatusIndicator: null,
            resultsWidth:               0
        }, options);

        var _this = this;
        _this.init();
        
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            this.element = jQuery(this.template()).appendTo(this.appendTo);
            this.manifestListElement = this.element.find('ul');
            
            //this code gives us the max width of the results area, used to determine how many preview images to show
            //cloning the element and adjusting the display and visibility means it won't break the normal flow
            var clone = this.element.clone().css("visibility","hidden").css("display", "block").appendTo(this.appendTo);
            this.resultsWidth = clone.find('#select-results').outerWidth();
            clone.remove();
            
            // this.manifestLoadStatus = new $.ManifestLoadStatusIndicator({parent: this});
            this.bindEvents();
        },

        bindEvents: function() {
            var _this = this;
            // handle interface events
            this.element.find('form#url-load-form').on('submit', function() {
                event.preventDefault();
                var url = jQuery(this).find('input').val();
                _this.parent.addManifestFromUrl(url, "(Added from URL)");
            });

            // handle subscribed events
            jQuery.subscribe('manifestsPanelVisible.set', function(_, stateValue) {
               if (stateValue) { _this.show(); return; }
                _this.hide();
            });
            jQuery.subscribe('manifestAdded', function(event, newManifest, repository) {
              _this.manifestListItems.push(new $.ManifestListItem({ parent: _this, manifestId: newManifest, resultsWidth: _this.resultsWidth }));
            });
            
            //Filter manifests based on user input
            this.element.find('#manifest-search').on('keyup input', function() {
               if (this.value.length > 0) {
                  _this.element.find('.items-listing li').show().filter(function() {
                     return jQuery(this).text().toLowerCase().indexOf(_this.element.find('#manifest-search').val().toLowerCase()) === -1;
                  }).hide();
               } else {
                  _this.element.find('.items-listing li').show();
               }
            });
        },
        
        toggleImageView: function(imageID, manifestURI) {
            this.parent.toggleImageViewInWorkspace(imageID, manifestURI);
        },
        
        toggleThumbnailsView: function(manifestURI) {
            this.parent.toggleThumbnailsViewInWorkspace(manifestURI);
        },

        hide: function() {
            var _this = this;
            jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
        },

        show: function() {
            var _this = this;

            jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
        },

        template: Handlebars.compile([
          '<div id="manifest-select-menu">',
          '<div class="container">',
              '<div id="load-controls">',
              '<form action="" id="manifest-search-form">',
                  '<input id="manifest-search" type="text" name="manifest-filter" placeholder="Filter objects...">',
              '</form>',
              '<form action="" id="url-load-form">',
                  '<h2>Add new item from URL</h2>',
                  '<input type="text" name="url-load" placeholder="http://...">',
              '</form>',
              '</div>',
              '<div id="select-results">',
                  '<ul class="items-listing">',
                  '</ul>',
              '</div>',
              '</div>',
          '</div>'
        ].join(''))
    };

}(Mirador));


(function($) {

  $.WorkspacesPanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      parent: null
    }, options);

    this.init();

  };

  $.WorkspacesPanel.prototype = {
    init: function () {
      var _this = this,
      workspaceTemplate = [];
      
      jQuery.each(this.parent.availableWorkspaces, function(index, value) {
        workspaceTemplate.push({
          dataClass: value,
          label : _this.parent.workspaces[value].label,
          iconClass: _this.parent.workspaces[value].iconClass
        });
      });

      this.element = jQuery(this.template({ workspaces : workspaceTemplate})).appendTo(this.appendTo);
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      // handle subscribed events
      jQuery.subscribe('workspacesPanelVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });

      jQuery('#workspace-select-menu').find('.workspace-option').on('click', function() {
        console.log(jQuery(this));
        $.viewer.switchWorkspace(jQuery(this).data('workspaceType'));
      });
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
    },

    template: Handlebars.compile([
       '<div id="workspace-select-menu">',
         '<h1>Choose Workspace Type</h1>',
         '<ul class="workspaces-listing">',
           '{{#each workspaces}}',
             '<li class="workspace-option" data-workspace-type="{{dataClass}}">',
               '<a href="javascrippt:void(0);" name="{{label}}">',
                 '<i class="fa fa-{{iconClass}} workspace-icon"></i>',
                 '<h2 class="workspace-label">{{label}}</h2>',
               '</a>',
             '</li>',
           '{{/each}}',
         '</ul>',
       '</div>'
    ].join(''))
  };

}(Mirador));


(function($){

    $.ImagePromise = function(imageUri) {

        jQuery.extend(true, this, {
            uri: imageUri,
            dimensions: [],
            dfd: null
        });
        
        dfd = jQuery.Deferred();
        return this.loadImageDataFromURI(dfd);
    };

    $.ImagePromise.prototype = {

        loadImageDataFromURI: function(dfd) {
            var img = new Image();
            var self = this;
        
            img.onload = function() {
                dfd.resolveWith(self, [img.src]);
            };
        
            img.onerror = function() {
                dfd.rejectWith(self, [img.src]);
            };
        
            dfd.fail(function() {
                console.log('image failed to load: ' + img.src);
            });
        
            img.src = self.uri;
            return dfd.promise();
        }
    };

}(Mirador));

(function($){

    $.Manifest = function(manifestUri, dfd) {

        jQuery.extend(true, this, {
            jsonLd: null,
            uri: manifestUri
        });

        this.loadManifestDataFromURI(dfd);
    };

    $.Manifest.prototype = {

        loadManifestDataFromURI: function(dfd) {
            var _this = this;

            jQuery.ajax({
                url: _this.uri,
                dataType: 'json',
                async: true,

                success: function(jsonLd) {
                    _this.jsonLd = jsonLd;
                    dfd.resolve(true);
                },

                error: function() {
                    console.log('Failed loading ' + _this.uri);
                    dfd.resolve(false);
                }
            });

        }
    };

}(Mirador));

(function($) {

  $.ManifestsSearch = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.ManifestsSearch.prototype = {

  };

}(Mirador));


(function($) {

  $.WorkspaceLockController = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.WorkspaceLockController.prototype = {

  };

}(Mirador));


(function($) {

  $.WorkspaceMenuBar = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.WorkspaceMenuBar.prototype = {

  };

}(Mirador));


(function($) {

  $.Slot = function(options) {

    jQuery.extend(true, this, {
      workspaceSlotCls: 'slot',
      slotID:           1,
      focused:          null,
      appendTo:         null,
      parent:           null,
      window:           null,
      windowElement:    null

    }, options);

    this.init();

  };

  $.Slot.prototype = {
    init: function () {
      this.element = jQuery(this.template({
        workspaceSlotCls: this.workspaceSlotCls,
        slotID: 1
      }));
      this.element.appendTo(this.appendTo);

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      // Slot only subscribes under its own name,
      // so it will be the only one whose function is
      // called to create a window when the 
      // load menu is invoked from it.
      jQuery.subscribe('manifestToSlot', function(e, windowConfig) { 
        _this.clearSlot();
        if (_this.window && !windowConfig.id) {
           windowConfig.id = _this.window.id;
        }
        windowConfig.appendTo = _this.element;
        if (_this.window) {
          _this.window.update(windowConfig);
        } else {
          _this.window = new $.Window(windowConfig);
        }
      });
      
      this.element.find('.addItemLink').on('click', function(){ _this.addItem(); });
    },

    clearSlot: function() {
      if (this.window) { 
        this.window.element.toggle('scale').fadeOut();
        this.window.element.remove();
      }
    },

    resize: function() {
      // There will only be a handle on 
      // the bottom and top of the slot if it is
      // in a column, and on the left and right if
      // it is in a row. If the parent has more 
      // than one child, then it becomes resizeable,
      // and will likewise affect the layout of its
      // siblings within their row or column.
      
      // On resize, the width must update with the 
      // mouse position, and the other slots in
      // the same parent must take up the same share
      // of remaining space in the parent as they
      // currently do in the resulting grown or 
      // shrunken remaining space.
      
      // 1.) check the current layout in parent to 
      // match the children of the common parent.

      // 2.) 
      // 
    },

    addItem: function() {
      _this = this;
      _this.focused = true;
      _this.parent.addItem(_this.slotID);
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div id="{{slotID}}" class="{{workspaceSlotCls}}">',
                                 '<div class="slotIconContainer">',
                                 '<h1 class="plus">+</h1>',
                                 '<h1>Add Item to Workspace</h1>',
                                 '</div>',
                                 '<a class="addItemLink"></a>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));


(function($) {

  $.WorkspaceStatusBar = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.WorkspaceStatusBar.prototype = {

  };

}(Mirador));


(function($) {

  $.Window = function(options) {

    jQuery.extend(this, {
      element:           null,
      scrollImageRatio:  0.9,
      appendTo:          null,
      manifest:          null,
      currentImageID:    null,
      focusImages:       [],
      imagesList:        null,
      currentImageMode:  'ImageView',
      imageModes:        ['ImageView', 'BookView'],
      currentFocus:      'ThumbnailsView',
      focuses:           ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'],
      focusModules:           {'ThumbnailsView': null, 'ImageView': null, 'ScrollView': null, 'BookView': null},
      focusOverlaysAvailable: {
        'ThumbnailsView': {
          'overlay' : {'MetadataView' : false}, 
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'' : false}
        },
        'ImageView': {
          'overlay' : {'MetadataView' : false}, 
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'ThumbnailsView' : true}
        },
        'ScrollView': {
          'overlay' : {'MetadataView' : false}, 
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'' : false}
        },
        'BookView': {
          'overlay' : {'MetadataView' : false},
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'ThumbnailsView' : true}
        }
      },
      focusOptions: null,
      id : null,
      sidePanel: null,
      bottomPanel: null,
      overlay: null
    }, options);

    this.init();

  };

  $.Window.prototype = {
    init: function () {
      _this = this,
      manifest = _this.manifest,
      focusState = _this.currentFocus,
      templateData = {};
      if (!_this.id) {
         _this.id = $.genUUID();
      }

      _this.element = jQuery(this.template()).appendTo(this.appendTo).hide().fadeIn(300);
      
      if (manifest.sequences[0].viewingHint) {
           if (manifest.sequences[0].viewingHint.toLowerCase() !== 'paged') {
              //disable bookview for this object because it's not a paged object
              this.focuses = jQuery.grep(this.focuses, function(value) {
                 return value !== 'BookView';
              });
           }
       }
      
      //remove any imageModes that are not available as a focus
      jQuery.map(this.imageModes, function(value, index) {
         if (jQuery.inArray(value, this.focuses) === -1) return null;  
         return item;
      });

      _this.imagesList = $.getImagesListByManifest(_this.manifest);
      if (!_this.currentImageID) {
        _this.currentImageID = _this.imagesList[0]['@id'];
      }

      //check config
      if (typeof this.bottomPanelAvailable !== 'undefined' && !this.bottomPanelAvailable) {
         jQuery.each(this.focusOverlaysAvailable, function(key, value) {
            _this.focusOverlaysAvailable[key].bottomPanel = {'' : false};
         });
      }
      if (typeof this.sidePanelAvailable !== 'undefined' && !this.sidePanelAvailable) {
         jQuery.each(this.focusOverlaysAvailable, function(key, value) {
            _this.focusOverlaysAvailable[key].sidePanel = {'' : false};
         });
      }
      if (typeof this.overlayAvailable !== 'undefined' && !this.overlayAvailable) {
         jQuery.each(this.focusOverlaysAvailable, function(key, value) {
            _this.focusOverlaysAvailable[key].overlay = {'' : false};
         });
      } else {
        templateData.MetadataView = true;
      }

      //determine if any buttons should be hidden in template
      jQuery.each(this.focuses, function(index, value) {
         templateData[value] = true;
      });
      templateData.title = manifest.label;      
      _this.element.prepend(_this.manifestInfoTemplate(templateData));

      //clear any existing objects
      _this.clearViews();
      _this.clearPanelsAndOverlay();

      //attach view and toggle view, which triggers the attachment of panels or overlays
      _this.bindNavigation();
      switch(focusState) {
        case 'ThumbnailsView':
          _this.toggleThumbnails(_this.currentImageID);
          break;
        case 'ImageView':
          _this.toggleImageView(_this.currentImageID);
          break;
        case 'BookView':
          _this.toggleBookView(_this.currentImageID);
          break;
        case 'ScrollView':
          _this.toggleScrollView(_this.currentImageID);
          break;
        default:
          break;
      }

      this.bindEvents();
    },
    
    update: function(options) {
      jQuery.extend(this, options);
      this.init();
    },

    bindEvents: function() {
      var _this = this;

      jQuery(window).resize($.debounce(function(){
        if (_this.focusModules.ScrollView) {
          var containerHeight = _this.element.find('.view-container').height();
          var triggerShow = false;
          if (_this.currentFocus === "ScrollView") {
            triggerShow = true;
          }
          _this.focusModules.ScrollView.reloadImages(Math.floor(containerHeight * _this.scrollImageRatio), triggerShow);
        }
      }, 300));

    },

    clearViews: function() {
      var _this = this;
      jQuery.each(_this.focusModules, function(key, value) {
        _this.focusModules[key] = null;
      });
    },

    clearPanelsAndOverlay: function() {
      this.sidePanel = null;
      this.bottomPanel = null;
      this.overlay = null;
    },

    //only panels and overlay available to this view, make rest hidden while on this view
    updatePanelsAndOverlay: function(state) {
      var _this = this;

      jQuery.each(this.focusOverlaysAvailable[state], function(panelType, viewOptions) {
        jQuery.each(viewOptions, function(view, displayed) {
          //instantiate any panels that exist for this view but are still null
          if (view !== '' && _this[panelType] === null) {
            _this[panelType] = new $[view]({
              manifest: _this.manifest, 
              appendTo: _this.element.find('.'+panelType), 
              parent: _this, 
              panel: true, 
              imageID: _this.currentImageID, 
              imagesList: _this.imagesList,
              thumbInfo: {thumbsHeight: 80, listingCssCls: 'panel-listing-thumbs', thumbnailCls: 'panel-thumbnail-view'}
            });
          }
          
          //refresh displayed in case TableOfContents module changed it
          displayed = _this.focusOverlaysAvailable[state][panelType][view];

          //toggle any valid panels
          if (view !== '' && displayed) {   
            _this.togglePanels(panelType, displayed, view, state);
          }

          //hide any panels instantiated but not available to this view
          if (view === '' && _this[panelType]) {
            _this.togglePanels(panelType, displayed, view, state);
          }

          //lastly, adjust height for non-existent panels
          if (view === '') {
            _this.adjustFocusSize(panelType, displayed);
          }

          //update current image for all valid panels
        });
      });

      //update panels with current image
      if (this.bottomPanel) { this.bottomPanel.updateFocusImages(this.focusImages); }
    },

    get: function(prop, parent) {
      if (parent) {
        return this[parent][prop];
      }
      return this[prop];
    },

    set: function(prop, value, options) {
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
    },
    
    setTOCBoolean: function(boolValue) {
      var _this = this;
      jQuery.each(this.focusOverlaysAvailable, function(key, value) {
         _this.focusOverlaysAvailable[key].sidePanel.TableOfContents = boolValue;
      });
    },

    togglePanels: function(panelType, panelState, viewType, focusState) {
      //update state in focusOverlaysAvailable
      this.focusOverlaysAvailable[focusState][panelType][viewType] = panelState;
      this[panelType].toggle(panelState);
      this.adjustFocusSize(panelType, panelState);
    },

    minMaxBottomPanel: function(element) {
      if (element.hasClass('mirador-icon-minimize')) {
        //hide all other siblings, change icon to maximize, change height of parent
        element.removeClass('mirador-icon-minimize').addClass('mirador-icon-maximize');
        element.siblings().hide();
        element.parent().addClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustHeight('focus-bottom-panel-minimized', false);
      } else {
        //show all other siblings, change icon to minimize, change height of parent
        element.removeClass('mirador-icon-maximize').addClass('mirador-icon-minimize');
        element.siblings().show();
        element.parent().removeClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustHeight('focus-bottom-panel-minimized', true);
      }
    },
    
    minMaxSidePanel: function(element) {
      if (element.hasClass('mirador-icon-minimize')) {
        //hide all other siblings, change icon to maximize, change height of parent
        element.removeClass('mirador-icon-minimize').addClass('mirador-icon-maximize');
        element.siblings().hide();
        element.parent().addClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustWidth('focus-side-panel-minimized', false);
      } else {
        //show all other siblings, change icon to minimize, change height of parent
        element.removeClass('mirador-icon-maximize').addClass('mirador-icon-minimize');
        element.siblings().show();
        element.parent().removeClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustWidth('focus-side-panel-minimized', true);
      }
    },

    adjustFocusSize: function(panelType, panelState) {
      if (panelType === 'bottomPanel') {
        this.focusModules[this.currentFocus].adjustHeight('focus-max-height', panelState);
      } else if (panelType === 'sidePanel') {
        this.focusModules[this.currentFocus].adjustWidth('focus-max-width', panelState);
      } else {}
    },

    toggleMetadataOverlay: function(focusState) {
      var _this = this;
      var currentState = this.focusOverlaysAvailable[focusState].overlay.MetadataView;
      if (currentState) {
        this.element.find('.mirador-icon-metadata-view').removeClass('selected');
      } else {
        this.element.find('.mirador-icon-metadata-view').addClass('selected');
      }
      //set overlay for all focus types to same value
      jQuery.each(this.focusOverlaysAvailable, function(focusType, options) {
        if (focusState !== focusType) {
          this.overlay.MetadataView = !currentState;
        }
      });
      //and then do toggling for current focus
      this.togglePanels('overlay', !currentState, 'MetadataView', focusState);
    },

    toggleFocus: function(focusState, imageMode) {
      var _this = this;

      this.currentFocus = focusState;
      if (imageMode && jQuery.inArray(imageMode, this.imageModes) > -1) {
        this.currentImageMode = imageMode;
      }
      //set other focusStates to false (toggle to display none)
      jQuery.each(this.focusModules, function(focusKey, module) {
        if (module && focusState !== focusKey) {
          module.toggle(false);
        }
      });
      this.focusModules[focusState].toggle(true);
      this.updateManifestInfo();
      this.updatePanelsAndOverlay(focusState);
      jQuery.publish("focusUpdated", {
                       id: _this.id, 
                       viewType: _this.currentFocus, 
                       canvasID: _this.currentImageID, 
                       imageMode: _this.currentImageMode, 
                       loadedManifest: _this.manifest['@id']});
    },

    toggleThumbnails: function(imageID) {
      if (this.focusModules.ThumbnailsView === null) {
        this.focusModules.ThumbnailsView = new $.ThumbnailsView( {manifest: this.manifest, appendTo: this.element.find('.view-container'), parent: this, imageID: this.currentImageID, imagesList: this.imagesList} );
      } else {
        var view = this.focusModules.ThumbnailsView;
        view.updateImage(imageID);
      }
      this.toggleFocus('ThumbnailsView', '');
    },

    toggleImageView: function(imageID) {
      this.currentImageID = imageID;
      if (this.focusModules.ImageView === null) {
        this.focusModules.ImageView = new $.ImageView( {manifest: this.manifest, 
                                                        appendTo: this.element.find('.view-container'), 
                                                        parent: this, 
                                                        imageID: imageID, 
                                                        imagesList: this.imagesList,
                                                        osdOptions: this.focusOptions} );
      } else {
        var view = this.focusModules.ImageView;
        view.updateImage(imageID);
      }
      this.toggleFocus('ImageView', 'ImageView');
    },

    toggleBookView: function(imageID) {
      this.currentImageID = imageID;
      if (this.focusModules.BookView === null) {
        this.focusModules.BookView = new $.BookView( {manifest: this.manifest, 
                                                      appendTo: this.element.find('.view-container'), 
                                                      parent: this, 
                                                      imageID: imageID, 
                                                      imagesList: this.imagesList,
                                                      osdOptions: this.focusOptions} );
      } else {
        var view = this.focusModules.BookView;
        view.updateImage(imageID);
      }
      this.toggleFocus('BookView', 'BookView');
    },

    toggleScrollView: function(imageID) {
      this.currentImageID = imageID;
      if (this.focusModules.ScrollView === null) {
        var containerHeight = this.element.find('.view-container').height();
        this.focusModules.ScrollView = new $.ScrollView( 
                                                            {manifest: this.manifest, 
                                                              appendTo: this.element.find('.view-container'), 
                                                              parent: this, 
                                                              imageID: this.currentImageID, 
                                                              imagesList: this.imagesList, 
                                                              thumbInfo: {thumbsHeight: Math.floor(containerHeight * this.scrollImageRatio), listingCssCls: 'scroll-listing-thumbs', thumbnailCls: 'scroll-view'}}
                                                           );
      } else {
        var view = this.focusModules.ScrollView;
        view.updateImage(imageID);
      }
      this.toggleFocus('ScrollView', '');    
    },

    loadImageModeFromPanel: function(imageID) {
      var _this = this;
      switch(_this.currentImageMode) {
        case 'ImageView':
          _this.toggleImageView(imageID);
        break;
        case 'BookView':
          _this.toggleBookView(imageID);
        break;
        default:
          break;
      }
    },

    updateFocusImages: function(imageList) {
      this.focusImages = imageList;
    },

    setCurrentImageID: function(imageID) {
      var _this = this;
      this.currentImageID = imageID;
      this.loadImageModeFromPanel(imageID);
      jQuery.publish(('currentImageIDUpdated.' + _this.id), {newImageID : imageID});
    },

    setCursorFrameStart: function(canvasID) {
    },

    updateManifestInfo: function() {
      var _this = this;
      this.element.find('.window-manifest-navigation').children().removeClass('selected');
      switch(_this.currentFocus) {
        case 'ThumbnailsView':
          //hide thumbnails button and highlight currentImageMode?
          _this.element.find('.mirador-icon-thumbnails-view').addClass('selected');
        break;
        case 'ImageView':
          //highlight Single Image View option
          _this.element.find('.mirador-icon-image-view').addClass('selected');
        break;
        case 'BookView':
          //highlight Book View option
          _this.element.find('.mirador-icon-image-view').addClass('selected');
        break;
        case 'ScrollView':
          //highlight Scroll View option
          _this.element.find('.mirador-icon-scroll-view').addClass('selected');
        break;
        default:
          break;
      }

      if (this.focusOverlaysAvailable[this.currentFocus].overlay.MetadataView) {
        this.element.find('.mirador-icon-metadata-view').addClass('selected');
      }
    },

    // based on currentFocus
    bindNavigation: function() {
      var _this = this;
      this.element.find('.mirador-icon-thumbnails-view').on('click', function() {
        _this.toggleThumbnails(_this.currentImageID);
      });

      this.element.find('.mirador-icon-metadata-view').on('click', function() {
        _this.toggleMetadataOverlay(_this.currentFocus);
      });

      this.element.find('.mirador-icon-image-view').mouseenter(
        function() {
        _this.element.find('.image-list').stop().slideFadeToggle(300);
      }).mouseleave(
      function() {
        _this.element.find('.image-list').stop().slideFadeToggle(300);
      });

      this.element.find('.single-image-option').on('click', function() {
        _this.toggleImageView(_this.currentImageID);
      });

      this.element.find('.book-option').on('click', function() {
        _this.toggleBookView(_this.currentImageID);
      });

      this.element.find('.mirador-icon-scroll-view').on('click', function() {
        _this.toggleScrollView(_this.currentImageID);
      });

      this.element.find('.mirador-thumb-panel').on('click', function() {
        _this.minMaxBottomPanel(jQuery(this));
      });
      
      this.element.find('.mirador-side-panel').on('click', function() {
        _this.minMaxSidePanel(jQuery(this));
      });
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div class="window">',
                                 '<div class="content-container">',
                                 '<div class="sidePanel">',
                                 '<span class="mirador-btn mirador-side-panel mirador-icon-minimize"></span>',
                                 '</div>',
                                 '<div class="view-container">',
                                 '<div class="overlay"></div>',
                                 '<div class="bottomPanel">',
                                 '<span class="mirador-btn mirador-thumb-panel mirador-icon-minimize"></span>',
                                 '</div>',
                                 '</div>',
                                 '</div>',
                                 '</div>'
    ].join('')),

    manifestInfoTemplate: Handlebars.compile([
                                             '<div class="manifest-info">',
                                             '<div class="window-manifest-navigation">',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-image-view"><i class="fa fa-photo fa-2x"></i>',
                                             '<ul class="image-list">',
                                             '{{#if ImageView}}',
                                             '<li class="single-image-option">Single Image View</li>',
                                             '{{/if}}',
                                             '{{#if BookView}}',
                                             '<li class="book-option">Book View</li>',
                                             '{{/if}}',
                                             '</ul>',
                                             '</a>',
                                             '{{#if ThumbnailsView}}',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-thumbnails-view"></a>',
                                             '{{/if}}',
                                             '{{#if ScrollView}}',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-scroll-view"></a>',
                                             '{{/if}}',
                                             '{{#if MetadataView}}',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-metadata-view"></a>',
                                             '{{/if}}',
                                             '</div>',
                                             '<h3 class="window-manifest-title">{{title}}</h3>',
                                             '</div>'
    ].join(''))
  };

}(Mirador));


(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      sidePanel:  null,
      bottomPanel:       null,
      regionController:  null,
      parent:            null,
      stateEvents:       {},
      showList:          true,
      annotationListUrls:    null,
      annotations:       [],
      commentAnnotations: 0,
      textAnnotations: 0,
      visible:        false,
      selectedAnnotation: null,
      hoveredAnnotation: null,
      annotationListCls: 'mirador-annotation-list',
      filter: null
    }, options);

    this.init();
  };


  $.AnnotationsLayer.prototype = {

    init: function() {
      var _this = this;

      // returns a promise object constructed using 
      // jQuery.when.apply(this, [deferred array]);
      _this.getAnnotations().done( function() {
        // _this.bottomPanel = new $.AnnotationBottomPanel({parent: _this});
        // _this.regionController = new $.AnnotationLayerRegionController({parent: _this});
        // _this.sidePanel = new $.AnnotationLayerSidePanel({parent: _this});
      });

      this.bindEvents();
    },

    get: function(prop) {
      return this[prop];
    },

    set: function(prop, value, options) {
      _this = this;
      this[prop] = value;
      jQuery.publish(prop + ':set', value, options);
    },

    getAnnotations: function() {
      var _this = this,
      requests = [];

      // not the best solution, but this resets the
      // annotations whenever more are fetched, 
      // effectively clearing them on next()/previous().
      _this.set('annotations', []);

      if (!_this.annotationListUrls) {
        _this.annotations = [];
        return jQuery.when(function() { return; });
      }

      jQuery.each(_this.annotationListUrls, function(index, url) {
        var request =  jQuery.ajax(
          {
          url: url,
          dataType: 'json',
          async: true,
          cache: false,
          success: function(jsonLd) {
            jQuery.each(jsonLd.resources, function(index, resource) {
              var annotation = {
                region: $.parseRegion(resource.on),
                title: null,
                content: resource.resource.full ? resource.resource.full.chars : resource.resource.chars,
                type: (resource.motivation).split(':')[1],
                id: $.genUUID()
              };          

              annotation.osdFrame = $.getOsdFrame(annotation.region, _this.parent.currentImg);

              _this.annotations.push(annotation);
            });

          },

          error: function() {
            console.log('Failed loading ' + uri);
          }
        });

        requests.push(request);

      });

      return jQuery.when.apply(this, requests);
    },

    bindEvents: function() {
      var _this = this;

      // model events
      // _this.event('visible:set').subscribe( function(value) {
      //     if (value === false) { _this.hide(); } else { _this.show(); }
      // });
      // _this.event('disabled:set').subscribe( function(value) {
      //     if (value === true) { _this.hide(); } else { _this.show(); }
      // });
      // _this.event('selectedAnnotation:set').subscribe( function(value, options) {
      //     if (value === null) {
      //         _this.deselect(); 
      //         return;
      //     }
      //     _this.focusSelected(value, options);
      // });
      // _this.event('hoveredAnnotation:set').subscribe( function(value, options) {
      //     _this.accentHovered(value, options);
      // });
      // _this.event('annotationListUrls:set').subscribe( function(value, options) {
      //     if (value) { console.log(value); }
      //     _this.changePage();
      // });
      // _this.event('filter:set').subscribe( function(value, options) {
      //     _this.filterAnnotations(value, options);
      // });
    },

    computeAnnotationStats: function() {
      var comments = 0,
      transcriptions = 0; 

      jQuery.each(_this.annotations, function(index, annotation) {
        if (annotation.type === 'commenting') { comments ++; } else { transcriptions ++; }
      });

      _this.commentAnnotations = comments;
      _this.textAnnotations = transcriptions;
    },

    setVisible: function() {
      var _this = this;

      if (_this.get('visible') === false) {
        _this.set("visible", true);
      }  else {
        _this.set("visible", false);
      }
    },

    changePage: function() {
      var _this = this;

      if (_this.annotations === null) {
        _this.set('visible', false);
        return;
      }

      if ( _this.selectedAnnotation ) {
        _this.set('selectedAnnotation', null);
      }

      _this.getAnnotations().done( function() {
        _this.sidePanel.render();
        _this.regionController.render();
      });
    },

    accentHovered: function(id, source) {
      var _this = this;

      if (source === 'listing') {
        _this.regionController.accentHovered(id);
      } else {
        _this.sidePanel.accentHovered(id);
      }
    },

    focusSelected: function(id, source) {
      var _this = this;

      _this.sidePanel.focusSelected(id, source);
      _this.regionController.focusSelected(id);
      _this.bottomPanel.focusSelected(id);
    },

    deselect: function() {
      var _this = this;

      _this.bottomPanel.deselect();
      _this.sidePanel.deselect();
      _this.regionController.deselect();
    },

    filterAnnotations: function(filter, options) {
      _this = this;

      filteredAnnos = jQuery.grep(_this.annotations, function(a) { return a.type !== filter; } ),
      filteredIds = jQuery.map(filteredAnnos, function(a) { return a.id; }),
      filteredRegions = jQuery.map(filteredIds, function(id) { 
        var idString = '#region_' + id;
        return jQuery(idString);
      }),
      filteredListings = jQuery.map(filteredIds, function(id) { 
        var idString = '#listing_' + id;
        return jQuery(idString);
      });

      _this.parent.element.find('.annotation').fadeIn();
      _this.parent.element.find('.annotationListing').slideDown();
      _this.bottomPanel.deselect();

      if (filter === '') { return; }

      jQuery(filteredRegions).map(function() { return this.toArray(); }).fadeOut();
      jQuery(filteredListings).map(function() { return this.toArray(); }).slideUp();
    },

    append: function(item) {
      this.element.append(item);
    },

    show: function() {
      var _this = this;
      this.parent.parent.element.find('.mirador-widget-content').css('padding-right', _this.width);
      this.sidePanel.show();
      this.regionController.show();
      this.bottomPanel.show();
    },

    hide: function() {
      this.parent.parent.element.find('.mirador-widget-content').css('padding-right', 0);
      this.sidePanel.hide();
      this.regionController.hide();
      this.bottomPanel.hide();
      // ensures the user won't accidentally be unable to view annotation details in 
      // the annotation layer in the future. Resets the default visibility of the 
      // bottom panel to true.
      this.bottomPanel.hidden = false;
    }

  };

}(Mirador));

// TODO: If paged object, then need opposite page (can do simple algorithm to use even/odd page number to start)
// If continuous, then need to stitch all (use order)
// If individual, no stitching (this view shouldn't do anything?)
// next and previous not needed
// no locking needed
(function($) {

  $.BookView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      currentImgIndex:  0,
      stitchList:       [],
      element:          null,
      imageID:          null,
      imagesList:       [],
      focusImages:      [],
      manifest:         null,
      viewingDirection: 'left-to-right',
      viewingHint:      'paged',
      osd:              null,
      osdCls:           'mirador-osd',
      osdOptions: {
        osdBounds:        null,
        zoomLevel:        null
      },
      parent:           null,
      stitchTileMargin: 10
    }, options);

    this.init();
  };


  $.BookView.prototype = {
  
    init: function() {
       if (this.imageID !== null) {
         this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
       }
       
       if (!this.osdOptions) {
          this.osdOptions = {
            osdBounds:        null,
            zoomLevel:        null
          };
       }
              
       this.currentImg = this.imagesList[this.currentImgIndex];
       
       this.element = jQuery(this.template()).appendTo(this.appendTo);
       
       if (this.manifest.sequences[0].viewingDirection) {
           this.viewingDirection = this.manifest.sequences[0].viewingDirection.toLowerCase();
       }
       if (this.manifest.sequences[0].viewingHint) {
           this.viewingHint = this.manifest.sequences[0].viewingHint.toLowerCase();
       }
       
       this.stitchList = this.getStitchList();
       this.createOpenSeadragonInstance();
    },
    
    template: Handlebars.compile([
      '<div class="book-view">',
       '</div>'
    ].join('')),
    
    toolbarTemplate: Handlebars.compile([
      '<div id="osd-toolbar" class="toolbar">',
      '<a class="mirador-btn mirador-icon-previous"></a>',
      '<a id="zoom-in" class="mirador-btn mirador-icon-zoom-in"></a>', 
      '<a id="zoom-out" class="mirador-btn mirador-icon-zoom-out"></a>',
      '<a id="home" class="mirador-btn mirador-icon-home"></a>',
      '<a id="full-page" class="mirador-btn mirador-icon-full-page"></a>',
      '<a class="mirador-btn mirador-icon-next"></a>',
      '</div>'
    ].join('')),
    
    bindOSDEvents: function() {
       var _this = this;
       
       this.element.find('.mirador-icon-next').on('click', function() {
          _this.next();
       });
       
       this.element.find('.mirador-icon-previous').on('click', function() {
          _this.previous();
       });
    },
    
    setZoom: function() {
         var _this = this;
         this.osdOptions.zoomLevel = this.osd.viewport.getZoom();
         jQuery.publish("imageZoomUpdated", {
                       id: _this.parent.id, 
                       zoomLevel: _this.osdOptions.zoomLevel
                       });
    },
    
    setBounds: function() {
         var _this = this;
         this.osdOptions.osdBounds = this.osd.viewport.getBounds(true);
         jQuery.publish("imageBoundsUpdated", {
                       id: _this.parent.id, 
                       osdBounds: {x: _this.osdOptions.osdBounds.x, y: _this.osdOptions.osdBounds.y, width: _this.osdOptions.osdBounds.width, height: _this.osdOptions.osdBounds.height}
                       });
    },
    
    toggle: function(stateValue) {
        if (stateValue) { 
            this.show(); 
        } else {
            this.hide();
        }
    },
    
    hide: function() {
        jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    },
    
    adjustWidth: function(className, hasClass) {
       if (hasClass) {
           this.parent.element.find('.view-container').removeClass(className);
       } else {
           this.parent.element.find('.view-container').addClass(className);
       }
    },
    
    adjustHeight: function(className, hasClass) {
        if (hasClass) {
           this.element.removeClass(className);
        } else {
           this.element.addClass(className);
        }
    },
    
    updateImage: function(imageID) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.stitchList = this.getStitchList();
        this.osdOptions = {
            osdBounds:        null,
            zoomLevel:        null
          };
        this.osd.close();
        this.createOpenSeadragonInstance();
    },

    createOpenSeadragonInstance: function() {
      var osdId = 'mirador-osd-' + $.genUUID(),
      osdToolBarId = osdId + '-toolbar',
      elemOsd,
      tileSources = [],
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      jQuery.each(this.stitchList, function(index, image) {
          var imageUrl = $.Iiif.getImageUrl(image);
          var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json';
          var infoJson = $.getJsonFromUrl(infoJsonUrl, false);
          tileSources.push($.Iiif.prepJsonForOsd(infoJson));
      });

      elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdId)
      .appendTo(this.element);
      jQuery(this.toolbarTemplate()).appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           elemOsd.attr('id'),
        'tileSources':  tileSources,
	'collectionMode':     'true',
	'collectionRows':     1, 
	'collectionTileMargin': this.stitchTileMargin,
	'collectionTileSize': 1600
      });
      
      this.bindOSDEvents();

      this.osd.addHandler('open', function(){
        if (_this.osdOptions) {
          if (_this.osdOptions.zoomLevel) {
            _this.osd.viewport.zoomTo(_this.osdOptions.zoomLevel, null, true);
          }
          if (_this.osdOptions.osdBounds) {
            var rect = new OpenSeadragon.Rect(_this.osdOptions.osdBounds.x, _this.osdOptions.osdBounds.y, _this.osdOptions.osdBounds.width, _this.osdOptions.osdBounds.height);
            _this.osd.viewport.fitBounds(rect, true);
          }
        }
        
        _this.osd.addHandler('zoom', function() {
            _this.setZoom();
          });
       
          _this.osd.addHandler('pan', function() {
            _this.setBounds();
          });
      });

      //this.stitchOptions();
    },

    // next two pages for paged objects
    // need next single page for lining pages up
    // don't need for continuous or individuals
    next: function() {
      var next;
      if (this.currentImgIndex % 2 === 0) {
        next = this.currentImgIndex + 1;
      } else {
        next = this.currentImgIndex + 2;
      }
      if (next < this.imagesList.length) {
        this.parent.setCurrentImageID(this.imagesList[next]['@id']);
      }
    },

    // previous two pages for paged objects
    // need previous single page for lining things up
    // don't need for continuous or individuals
    previous: function() {
      var prev;
      if (this.currentImgIndex % 2 === 0) {
        prev = this.currentImgIndex - 2;
      } else {
        prev = this.currentImgIndex - 1;
      }
      if (prev >= 0) {
        this.parent.setCurrentImageID(this.imagesList[prev]['@id']);
      }
    },
    
    getStitchList: function() {
    // Need to check metadata for object type and viewing direction
    // Default to 'paged' and 'left-to-right'
    // Set index(es) for any other images to stitch with selected image
    var stitchList = [],
    leftIndex = [],
    rightIndex = [],
    topIndex = [],
    bottomIndex = [],
    _this = this;
    
    this.focusImages = [];
    
    if (this.viewingHint === 'individuals') {
       // don't do any stitching, display like an imageView
    } else if (this.viewingHint === 'paged') {
       // determine the other image for this pair based on index and viewingDirection
       if (this.currentImgIndex === 0 || this.currentImgIndex === this.imagesList.length-1) {
           //first page (front cover) or last page (back cover), display on its own
          stitchList = [this.currentImg];
       } else if (this.currentImgIndex % 2 === 0) {
            // even, get previous page.  set order in array based on viewingDirection
            switch (this.viewingDirection) {
                case "left-to-right":
                    leftIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.imagesList[this.currentImgIndex-1], this.currentImg];
                    break;
                case "right-to-left":
                    rightIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex-1]];
                    break;
                case "top-to-bottom":
                    topIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.imagesList[this.currentImgIndex-1], this.currentImg];
                    break;
                case "bottom-to-top":
                    bottomIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex-1]];
                    break;
                default:
                    break;
            }
       } else {
            // odd, get next page
            switch (this.viewingDirection) {
                case "left-to-right":
                    rightIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex+1]];
                    break;
                case "right-to-left":
                    leftIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.imagesList[this.currentImgIndex+1], this.currentImg];
                    break;
                case "top-to-bottom":
                    bottomIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex+1]];
                    break;
                case "bottom-to-top":
                    topIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.imagesList[this.currentImgIndex+1], this.currentImg];
                    break;
                default:
                    break;
            }
       }
    } else if (this.viewingHint === 'continuous') {
       // TODO: stitch all images together per the viewingDirection
    } else {
       // undefined viewingHint, don't do anything
    }
    
    //set the focusImages for highlighting in panels
    jQuery.each(stitchList, function(index, image) {
        _this.focusImages.push(image['@id']);
    });
    this.parent.updateFocusImages(this.focusImages);
    return stitchList;
  }

    // remove or add canvses to make pages line up
    /*stitchOptions: function() {  
      //clear options
      var options = [];

      this.clearStitchOptions();

      // if there is only one image, don't show options to remove images
      if (this.stitchList.length == 2) {
          options.push({
              label: "Remove image from page view",
              imgIndex: this.currentImgIndex
          });
          options.push({
              label: "Insert empty canvas between images"
              imgIndex: this.currentImgIndex
          });

          this.elemStitchOptions.tooltipster({
              arrow: true,
              content: $.Templates.stitchView.stitchOptions({options: options}),
              interactive: true,
              position: 'bottom',
              theme: '.tooltipster-mirador'
          });
       }
    },

    clearStitchOptions: function() {
      if (this.elemStitchOptions.data('plugin_tooltipster') !== '') {
        this.elemStitchOptions.tooltipster('destroy');
      }

      this.elemStitchOptions.hide();
      },*/
  };

}(Mirador));

(function($) {

  $.ImageView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      currentImgIndex:  0,
      imageID:          null,
      imagesList:       [],
      element:          null,
      parent:           null,
      manifest:         null,
      osd:              null,
      osdOptions: {
        osdBounds:        null,
        zoomLevel:        null
      },
      osdCls: 'mirador-osd'
    }, options);
    
    this.init();
  };


  $.ImageView.prototype = {
  
    init: function() {    
        if (this.imageID !== null) {
            this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
        }
        if (!this.osdOptions) {
          this.osdOptions = {
            osdBounds:        null,
            zoomLevel:        null
          };
        }
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.element = jQuery(this.template()).appendTo(this.appendTo);

        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        this.addAnnotationsLayer();
        this.parent.updateFocusImages([this.imageID]);
    },
    
    template: Handlebars.compile([
      '<div class="image-view">',
       '</div>'
    ].join('')),
    
    toolbarTemplate: Handlebars.compile([
      '<div id="osd-toolbar" class="toolbar">',
      '<a class="mirador-btn mirador-icon-previous"></a>',
      '<a id="zoom-in" class="mirador-btn mirador-icon-zoom-in"></a>', 
      '<a id="zoom-out" class="mirador-btn mirador-icon-zoom-out"></a>',
      '<a id="home" class="mirador-btn mirador-icon-home"></a>',
      '<a id="full-page" class="mirador-btn mirador-icon-full-page"></a>',
      '<a class="mirador-btn mirador-icon-next"></a>',
      '</div>'
    ].join('')),
    
    bindOSDEvents: function() {
       var _this = this;
       
       this.element.find('.mirador-icon-next').on('click', function() {
          _this.next();
       });
       
       this.element.find('.mirador-icon-previous').on('click', function() {
          _this.previous();
       });
    },
    
    setZoom: function() {
         var _this = this;
         this.osdOptions.zoomLevel = this.osd.viewport.getZoom();
         jQuery.publish("imageZoomUpdated", {
                       id: _this.parent.id, 
                       zoomLevel: _this.osdOptions.zoomLevel
                       });
    },
    
    setBounds: function() {
         var _this = this;
         this.osdOptions.osdBounds = this.osd.viewport.getBounds(true);
         jQuery.publish("imageBoundsUpdated", {
                       id: _this.parent.id, 
                       osdBounds: {x: _this.osdOptions.osdBounds.x, y: _this.osdOptions.osdBounds.y, width: _this.osdOptions.osdBounds.width, height: _this.osdOptions.osdBounds.height}
                       });
    },
    
    toggle: function(stateValue) {
        if (stateValue) { 
            this.show(); 
        } else {
            this.hide();
        }
    },
    
    hide: function() {
        jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    },
    
    adjustWidth: function(className, hasClass) {
       if (hasClass) {
           this.parent.element.find('.view-container').removeClass(className);
       } else {
           this.parent.element.find('.view-container').addClass(className);
       }
    },
    
    adjustHeight: function(className, hasClass) {
        if (hasClass) {
           this.element.removeClass(className);
        } else {
           this.element.addClass(className);
        }
    },

    createOpenSeadragonInstance: function(imageUrl) {
      var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json',
      osdID = 'mirador-osd-' + $.genUUID(),
      infoJson,
      elemOsd,
      _this = this;
      
      this.element.find('.' + this.osdCls).remove();

      infoJson = $.getJsonFromUrl(infoJsonUrl, false);

      elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdID)
      .appendTo(this.element);
      jQuery(this.toolbarTemplate()).appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           osdID,
        'tileSources':  $.Iiif.prepJsonForOsd(infoJson)
      });
            
      this.bindOSDEvents();
      
      this.osd.addHandler('open', function(){
        if (_this.osdOptions) {
          if (_this.osdOptions.zoomLevel) {
            _this.osd.viewport.zoomTo(_this.osdOptions.zoomLevel, null, true);
          }
          if (_this.osdOptions.osdBounds) {
            var rect = new OpenSeadragon.Rect(_this.osdOptions.osdBounds.x, _this.osdOptions.osdBounds.y, _this.osdOptions.osdBounds.width, _this.osdOptions.osdBounds.height);
            _this.osd.viewport.fitBounds(rect, true);
          }
        }
        
        _this.osd.addHandler('zoom', function() {
            _this.setZoom();
          });
       
          _this.osd.addHandler('pan', function() {
            _this.setBounds();
          });
      });
    },

    addAnnotationsLayer: function() {
      var annotationListUrls;

      if (this.currentImg.otherContent) {
        annotationListUrls = jQuery.map(this.currentImg.otherContent, function( annotation ){

          if (annotation['@id'].indexOf(".json") >= 0) {
            return annotation['@id'];
          }

          return (annotation['@id'] + ".json");
        });
      }
      
      this.annotationsLayer = new $.AnnotationsLayer({
        parent: this,
        annotationListUrls: annotationListUrls
      });
      
    },
    
    updateImage: function(imageID) {
        this.imageID = imageID;
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.osdOptions = {
            osdBounds:        null,
            zoomLevel:        null
          };
        this.osd.close();
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        this.parent.updateFocusImages([imageID]);
    },
    
    next: function() {
      var next = this.currentImgIndex + 1;

      if (next < this.imagesList.length) {
        this.parent.setCurrentImageID(this.imagesList[next]['@id']);
      }
    },

    previous: function() {
      var prev = this.currentImgIndex - 1;

      if (prev >= 0) {
        this.parent.setCurrentImageID(this.imagesList[prev]['@id']);
      }
    }

  };

}(Mirador));

(function($) {

  $.WidgetMenuBar = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.WidgetMenuBar.prototype = {

  };

}(Mirador));


(function($) {

  $.MetadataView = function(options) {

    jQuery.extend(this, {
      manifest:             null,
      element:              null,
      parent:               null,
      metadataTypes:        null,
      metadataListingCls:   'metadata-listing'
    }, options);

    this.init();
  };


  $.MetadataView.prototype = {

    init: function() {
      var _this = this,
          tplData = {
            metadataListingCls: this.metadataListingCls
          };
          
      this.metadataTypes = {};

      this.metadataTypes.about = $.getMetadataAbout(_this.manifest);
      this.metadataTypes.details = $.getMetadataDetails(_this.manifest);
      this.metadataTypes.rights = $.getMetadataRights(_this.manifest);
      this.metadataTypes.links = $.getMetadataLinks(_this.manifest);
      this.metadataTypes.metadata = $.getMetadataFields(_this.manifest);

      jQuery.each(this.metadataTypes, function(metadataKey, metadataValue) {
        tplData[metadataKey] = [];

        jQuery.each(metadataValue, function(key, value) {
          if (typeof value === 'object') {
            value = $.stringifyObject(value);
          }

          if (typeof value === 'string' && value !== '') {
            tplData[metadataKey].push({
              label: $.extractLabelFromAttribute(key),
              value: _this.addLinksToUris(value)
            });
          }
        });
      });

      this.element = jQuery(this.template(tplData)).appendTo(this.appendTo);

      this.bindEvents();
    },

    bindEvents: function() {
    },

    toggle: function(stateValue) {
        if (stateValue) { 
            this.show(); 
        } else {
            this.hide();
        }
    },
    
    show: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        element.show({effect: "slide", direction: "right", duration: 1000, easing: "swing"});    
    },
    
    hide: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        element.hide({effect: "slide", direction: "right", duration: 1000, easing: "swing"});    
    },

    addLinksToUris: function(text) {
      // http://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text
      var regexUrl = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/gi,
          textWithLinks = text,
          matches;

      if (typeof text === 'string') {
        matches = text.match(regexUrl);

        if (matches) {
          jQuery.each(matches, function(index, match) {
            textWithLinks = textWithLinks.replace(match, '<a href="' + match + '" target="_blank">' + match + '</a>');
          });
        }
      }

      return textWithLinks;
    },
    
    template: Handlebars.compile([
    '<div class="sub-title">Details (Metadata about physical object/intellectual work):</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each details}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>',
        '<div class="sub-title">Rights Metadata:</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each rights}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>',
        '<div class="sub-title">Linking Metadata:</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each links}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>',
        '<div class="sub-title">About (Metadata about this manuscript\'s manifest file):</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each about}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>'
    ].join(''), { noEscape: true })

  };


}(Mirador));
(function($) {

  $.WidgetScale = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.WidgetScale.prototype = {

  };

}(Mirador));


(function($) {

  $.ScrollView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      0,
      imageID:              null,
      focusImages:          [],
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbInfo:            {thumbsHeight: 150, listingCssCls: 'listing-thumbs', thumbnailCls: 'thumbnail-view'},
      parent:               null,
      panel:                false,
      lazyLoadingFactor:    1.5  //should be >= 1
    }, options);
    
    jQuery.extend($.ScrollView.prototype, $.ThumbnailsView.prototype);
    this.init();
  };
  
}(Mirador));

(function($) {

  $.WidgetStatusBar = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.WidgetStatusBar.prototype = {

  };

}(Mirador));


(function($) {

  $.ThumbnailsView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      0,
      imageID:              null,
      focusImages:          [],
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbInfo:            {thumbsHeight: 150, listingCssCls: 'listing-thumbs', thumbnailCls: 'thumbnail-view'},
      parent:               null,
      panel:                false,
      lazyLoadingFactor:    1.5  //should be >= 1
    }, options);
    
    this.init();
  };


  $.ThumbnailsView.prototype = {

    init: function() {
        if (this.imageID !== null) {
            this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
        }

        this.loadContent();
        this.bindEvents();
        },

    loadContent: function() {
      var _this = this,
      tplData = {
        defaultHeight:  this.thumbInfo.thumbsHeight,
        listingCssCls:  this.thumbInfo.listingCssCls,
        thumbnailCls:   this.thumbInfo.thumbnailCls
      };

      tplData.thumbs = jQuery.map(this.imagesList, function(image, index) {
        var aspectRatio = image.height/image.width,
        width = (_this.thumbInfo.thumbsHeight/aspectRatio);

        return {
          thumbUrl: $.Iiif.getUriWithHeight($.getImageUrlForCanvas(image), _this.thumbInfo.thumbsHeight),
          title:    image.label,
          id:       image['@id'],
          width:    width,
          highlight: _this.currentImgIndex === index ? 'highlight' : ''
        };
      });
      
      this.element = jQuery(_this.template(tplData)).appendTo(this.appendTo);
    },
    
    updateImage: function(imageID) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.element.find('.highlight').removeClass('highlight');
        this.element.find("img[data-image-id='"+imageID+"']").addClass('highlight');
        this.element.find("img[data-image-id='"+imageID+"']").parent().addClass('highlight');
    },
    
    updateFocusImages: function(focusList) {
        var _this = this;
        this.element.find('.highlight').removeClass('highlight');
        jQuery.each(focusList, function(index, imageID) {
           _this.element.find("img[data-image-id='"+imageID+"']").addClass('highlight');
           _this.element.find("img[data-image-id='"+imageID+"']").parent().addClass('highlight');
        });
    },

    currentImageChanged: function() {
      var _this = this,
      target = _this.element.find('.highlight'),
      scrollPosition = _this.element.scrollLeft() + (target.position().left + target.width()/2) - _this.element.width()/2;
      _this.element.scrollTo(scrollPosition, 900);
    },
    
    bindEvents: function() {
        var _this = this;
        _this.element.find('img').on('load', function() {
           jQuery(this).hide().fadeIn(750);
        });
                
        jQuery(_this.element).scroll(function() {
          jQuery.each(_this.element.find("img"), function(key, value) {
                if ($.isOnScreen(value, _this.lazyLoadingFactor) && !jQuery(value).attr("src")) {
                    var url = jQuery(value).attr("data");
                    _this.loadImage(value, url);
                }
            });
        });
        
        //add any other events that would trigger thumbnail display (resize, etc)
                
        _this.element.find('.thumbnail-image').on('click', function() {
          var canvasID = jQuery(this).attr('data-image-id');
          _this.parent.setCurrentImageID(canvasID);
        });

        jQuery.subscribe(('currentImageIDUpdated.' + _this.parent.id), function(imageID) {
          _this.currentImageChanged();
        });
    },
    
    toggle: function(stateValue) {
        if (stateValue) { 
            this.show(); 
        } else {
            this.hide();
        }
    },
    
    loadImage: function(imageElement, url) {
        var _this = this,
        imagepromise = new $.ImagePromise(url);

        imagepromise.done(function(image) {
            jQuery(imageElement).attr('src', image);
        });
    },
    
    reloadImages: function(newThumbHeight, triggerShow) {
       var _this = this;
       this.thumbInfo.thumbsHeight = newThumbHeight;
       
       jQuery.each(this.imagesList, function(index, image) {
          var aspectRatio = image.height/image.width,
          width = (_this.thumbInfo.thumbsHeight/aspectRatio),
          newThumbURL = $.Iiif.getUriWithHeight($.getImageUrlForCanvas(image), _this.thumbInfo.thumbsHeight),
          id = image['@id'];
          var imageElement = _this.element.find('img[data-image-id="'+id+'"]');
          imageElement.attr('data', newThumbURL).attr('height', _this.thumbInfo.thumbsHeight).attr('width', width).attr('src', '');
       });
       if (triggerShow) {
          this.show();
       }
    },
    
    template: Handlebars.compile([
      '<div class="{{thumbnailCls}}">',
        '<ul class="{{listingCssCls}}">',
          '{{#thumbs}}',
            '<li class="{{highlight}}">',
                '<img class="thumbnail-image {{highlight}}" title="{{title}}" data-image-id="{{id}}" src="" data="{{thumbUrl}}" height="{{../defaultHeight}}" width="{{width}}">',
                '<div class="thumb-label">{{title}}</div>',
            '</li>',
          '{{/thumbs}}',
        '</ul>',
       '</div>'
    ].join('')),
      
    hide: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        element.hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        var _this = this;
        element.show({
        effect: "fade", 
        duration: 1000, 
        easing: "easeInCubic", 
        complete: function() {
            jQuery.each(_this.element.find("img"), function(key, value) {
                   if ($.isOnScreen(value, _this.lazyLoadingFactor) && !jQuery(value).attr("src")) {
                      var url = jQuery(value).attr("data");
                      _this.loadImage(value, url);
                   }
                });
        }
        
        });
    },
    
    adjustWidth: function(className, hasClass) {
       if (hasClass) {
           this.parent.element.find('.view-container').removeClass(className);
       } else {
           this.parent.element.find('.view-container').addClass(className);
       }
    },
    
    adjustHeight: function(className, hasClass) {
        if (hasClass) {
           this.element.removeClass(className);
        } else {
           this.element.addClass(className);
        }
    }

  };
  
  

}(Mirador));

(function($) {

  $.TableOfContents = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      parent:            null,
      previousSelectedElements: [],
      selectedElements: [],
      openElements:     [],
      hoveredElement:   [],
      selectContext:    null,
      tocData: {},
      active: null
    }, options);

    this.init();

  };

  $.TableOfContents.prototype = {
    init: function () {
      var _this = this;
      if (!_this.manifest.structures) {
        _this.hide();
        _this.parent.setTOCBoolean(false);
        return;
      } else {
        _this.parent.setTOCBoolean(true);
        this.ranges = this.setRanges();
        this.element = jQuery(this.template({ ranges: this.getTplData() })).appendTo(this.appendTo);
        this.tocData = this.initTocData();
        this.selectedElements = $.getRangeIDByCanvasID(this.manifest, this.parent.currentImageID);
        this.element.find('.has-child ul').hide();
        this.bindEvents();
        this.render();
      }
    },

    setRanges: function() {
      var _this = this,
      ranges = [];
      jQuery.each(_this.manifest.structures, function(index, range) {
        if (range['@type'] === 'sc:Range') {
          ranges.push({
            id: range['@id'],
            canvases: range.canvases,
            within: range.within,
            label: range.label
          });
        }
      });

      return ranges;

    },

    getTplData: function() {  
      var _this = this,
      ranges = _this.extractRangeTrees(_this.ranges);
      
      if (ranges.length < 2) {
        ranges = ranges[0].children;
      }

      return ranges;
    },

    initTocData: function() {
      var _this = this,
      tocData = {};

      jQuery.each(_this.ranges, function(index, item) {
        var rangeID = item.id,
        attrString = '[data-rangeid="' + rangeID +'"]';

        tocData[item.id] = {
          element: _this.element.find(attrString).closest('li') //,
          // open: false,
          // selected: false,
          // hovered: false
        };
      });

      return tocData;
    },

    extractRangeTrees: function(rangeList) {
      var tree, parent;
      // Recursively build tree/table of contents data structure
      // Begins with the list of topmost categories
      function unflatten(flatRanges, parent, tree) {
        // To aid recursion, define the tree if it does not exist,
        // but use the tree that is being recursively built
        // by the call below.
        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : {id: "root", label: "Table of Contents" };
        var children = jQuery.grep(flatRanges, function(child) { if (!child.within) { child.within = 'root'; } return child.within == parent.id; });
        if ( children.length ) {
          if ( parent.id === 'root') {
            // If there are children and their parent's 
            // id is a root, bind them to the tree object.
            // 
            // This begins the construction of the object,
            // and all non-top-level children are now
            // bound the these base nodes set on the tree
            // object.
            children.forEach(function(child) {
              child.level = 0;
            });
            tree = children;   
          } else {
            // If the parent does not have a top-level id,
            // bind the children to the parent node in this
            // recursion level before handing it over for
            // another spin. 
            //
            // Because "child" is passed as 
            // the second parameter in the next call, 
            // in the next iteration "parent" will be the
            // first child bound here.
            children.forEach(function(child) { 
              child.level = parent.level+1;
            });
            parent.children = children;
          }
          // The function cannot continue to the return 
          // statement until this line stops being called, 
          // which only happens when "children" is empty.
          jQuery.each( children, function( index, child ){ unflatten( flatRanges, child ); } );                    
        }
        return tree;
      }

      return unflatten(rangeList);
    },

    render: function() {
      var _this = this,
      toDeselect = jQuery.map(_this.previousSelectedElements, function(rangeID) {
            return _this.tocData[rangeID].element.toArray();
      }),
      toSelect = jQuery.map(_this.selectedElements, function(rangeID) {
            return _this.tocData[rangeID].element.toArray();
      }),
      toOpen = jQuery.map(_this.selectedElements, function(rangeID) {
          if ((jQuery.inArray(rangeID, _this.openElements) < 0) && (jQuery.inArray(rangeID, _this.previousSelectedElements) < 0)) {
            return _this.tocData[rangeID].element.toArray();
          }
      }),
      toClose = jQuery.map(_this.previousSelectedElements, function(rangeID) {
          if ((jQuery.inArray(rangeID, _this.openElements) < 0) && (jQuery.inArray(rangeID, _this.selectedElements) < 0)) {
            return _this.tocData[rangeID].element.toArray();
          }
      });

      // Deselect elements
      jQuery(toDeselect).removeClass('selected');
      
      // Select new elements
      jQuery(toSelect).addClass('selected');
      
      // Scroll to new elements
      scroll();
      
      // Open new ones
      jQuery(toOpen).toggleClass('open').find('ul:first').slideFadeToggle();
      // Close old ones (find way to keep scroll position).
      jQuery(toClose).toggleClass('open').find('ul:first').slideFadeToggle(400, 'swing', scroll);
       
      // Get the sum of the outer height of all elements to be removed.
      // Subtract from current parent height to retreive the new height.
      // Scroll with respect to this. 
      scroll();

      function scroll() {
        var head = _this.element.find('.selected').first();
        _this.element.scrollTo(head, 400);
      } 

    },

    bindEvents: function() {
      var _this = this;
      // var eventString = _this.parent.id

      jQuery.subscribe('focusChanged', function(_, manifest, focusFrame) {
      });
      
      jQuery.subscribe('cursorFrameUpdated', function(_, manifest, cursorBounds) {
      });
        
      jQuery.subscribe(('currentImageIDUpdated.' + _this.parent.id), function(event, imageID) {
        if (!_this.manifest.structures) { return; }
        _this.setSelectedElements($.getRangeIDByCanvasID(_this.manifest, imageID.newImageID));
        _this.render();
      });

      jQuery('.toc-link').on('click', function() {
        event.stopPropagation();
        // The purpose of the immediate event is to update the data on the parent
        // by calling its "set" function. 
        // 
        // The parent (window) then emits an event notifying all panels of 
        // the update, so they can respond in their own unique ways
        // without window having to know anything about their DOMs or 
        // internal structure. 
        var rangeID = jQuery(this).data().rangeid,
        canvasID = jQuery.grep(_this.manifest.structures, function(item) { return item['@id'] == rangeID; })[0].canvases[0],
        isLeaf = jQuery(this).closest('li').hasClass('leaf-item');

        // if ( _this.parent.currentFocus === 'ThumbnailsView' & !isLeaf) {
        //   _this.parent.setCursorFrameStart(canvasID);
        // } else {
          _this.parent.setCurrentImageID(canvasID);
        // }
      });
      
      jQuery('.caret').on('click', function() {
        event.stopPropagation();
        
        var rangeID = jQuery(this).parent().data().rangeid;
        _this.setOpenItem(rangeID); 

        // For now it's alright if this data gets lost in the fray.
        jQuery(this).closest('li').toggleClass('open').find('ul:first').slideFadeToggle();

        // The parent (window) then emits an event notifying all panels of 
        // the update, so they can respond in their own unique ways
        // without window having to know anything about their DOMs or 
        // internal structure. 
      });
      
      _this.element.on('mouseleave', function() {
        var head = _this.element.find('.selected').first();
        _this.element.stop().delay(1800).scrollTo(head, 1000);
        _this.setActive(false);
      });
      
      _this.element.on('mouseenter', function() {
        _this.element.stop();
        _this.setActive(true);
      });

    },

    setActive: function(active) {
      _this.active = active;
    },

    setOpenItem: function(rangeID) {
      _this = this;

      if (jQuery.inArray(rangeID, _this.openElements)<0) {
        _this.openElements.push(rangeID);
      } else {
        _this.openElements.splice(jQuery.inArray(rangeID, _this.openElements), 1);
      }
    },

    // focusCursorFrame: function() {
    //   console.log('focusCursorFrame');
    // },

    // hoverItem: function() {
    //   console.log('hoverItem');
    // },

    setSelectedElements: function(rangeIDs) {
      _this = this;

      _this.previousSelectedElements = _this.selectedElements;
      _this.selectedElements = rangeIDs;
    },

    // returnToPlace: function() {
    //   console.log('returnToPlace');
    // },

    template: function(tplData) {

      var template = Handlebars.compile([
        '<ul class="toc">',
          '{{#nestedRangeLevel ranges}}',
            '<li class="{{#if children}}has-child{{else}}leaf-item{{/if}}"">',
              '{{{tocLevel id label level children}}}',
              '{{#if children}}',
                '<ul>',
                '{{{nestedRangeLevel children}}}',
                '</ul>',
              '{{/if}}',
            '<li>',
          '{{/nestedRangeLevel}}',
        '</ul>'
      ].join(''));

      var previousTemplate;

      Handlebars.registerHelper('nestedRangeLevel', function(children, options) {
        var out = '';

        if (options.fn !== undefined) {
          previousTemplate = options.fn;
        }

        children.forEach(function(child) {
          out = out + previousTemplate(child);
        });
        
        return out;
      });

      Handlebars.registerHelper('tocLevel', function(id, label, level, children) {
        var caret = '<i class="fa fa-caret-right caret"></i>',
        cert = '<i class="fa fa-certificate star"></i>';
        return '<h' + (level+1) + '><a class="toc-link" data-rangeID="' + id + '">' + caret + cert + '<span class="label">' + label + '</span></a></h' + (level+1) + '>';
      });

      return template(tplData);
    },

    toggle: function(stateValue) {
      if (!this.manifest.structures) { stateValue = false; }
      if (stateValue) { 
        this.show(); 
      } else {
        this.hide();
      }
    },
    
    hide: function() {
      jQuery(this.appendTo).hide();
      this.parent.element.find('.view-container').addClass('focus-max-width');
    },

    show: function() {
      jQuery(this.appendTo).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
      this.parent.element.find('.view-container').removeClass('focus-max-width');
    }
    
  };

}(Mirador));


(function($) {

  $.WidgetViewport = function(options) {

     jQuery.extend(true, this, {

     }, $.DEFAULT_SETTINGS, options);

  };

  $.WidgetViewport.prototype = {

  };

}(Mirador));


(function($) {

  $.EventHarness = function(options) {

     jQuery.extend(true, this, {
         type: null
     }, $.DEFAULT_SETTINGS, options);

  };

  $.EventHarness.prototype = {

  };

}(Mirador));



(function($) {

  $.Iiif = {

    // Temporary method to create Stanford IIIF URI from Stanford stacks non-IIIF URI
    getUri: function(uri) {
      var iiifUri = uri,
      match = /http?:\/\/stacks.stanford.edu\/image\/(\w+\/\S+)/i.exec(uri);

      if (match && match.length === 2) {
        iiifUri = 'https://stacks.stanford.edu/image/iiif/' + encodeURIComponent(match[1]);
      }

      return iiifUri;
    },
    
    getImageUrl: function(image) {

      if (!image.images[0].resource.service) {
        id = image.images[0].resource['default'].service['@id'];
        id = id.replace(/\/$/, "");
        return id;
      }
      
      var id = image.images[0].resource.service['@id'];
      id = id.replace(/\/$/, "");

      return id;
    },


    getUriWithHeight: function(uri, height) {
      uri = uri.replace(/\/$/, '');
      return this.getUri(uri) + '/full/,' + height + '/0/native.jpg';
    },


    prepJsonForOsd: function(json) {
      json.image_host    = this.getImageHostUrl(json);
      json.scale_factors = this.packageScaleFactors(json);
      json.profile       = json.profile.replace(/image-api\/1.\d/, 'image-api');

      if (!json.tile_width) {
        json.tile_width = 256;
        json.tile_height = 256;
      }

      return json;
    },


    getImageHostUrl: function(json) {
      var regex,
          matches = [];

      if (!json.hasOwnProperty('image_host')) {

        json.image_host = json.tilesUrl || json['@id'] || '';

       if (json.hasOwnProperty('identifier')) {
          regex = new RegExp('/?' + json.identifier + '/?$', 'i');
          json.image_host = json.image_host.replace(regex, '');

        } else {
          regex = new RegExp('(.*)\/(.*)$');
          matches = regex.exec(json.image_host);

          if (matches.length > 1) {
            json.image_host = matches[1];
            json.identifier = matches[2];
          }
        }
      }

      return json.image_host;
    },


    packageScaleFactors: function(json) {
      var newScaleFactors = [];

      if (json.hasOwnProperty('scale_factors') && jQuery.isArray(json.scale_factors)) {
        for (var i = 0; i < json.scale_factors.length; i++) {
          newScaleFactors.push(i);
        }
      }

      return newScaleFactors;
    }

  };


}(Mirador));


// for scroll view
// source: http://stackoverflow.com/questions/14035083/jquery-bind-event-on-scroll-stops
jQuery.fn.scrollStop = function(callback) {
  $(this).scroll(function() {
    var self  = this,
    $this = $(self);

    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }

    $this.data('scrollTimeout', setTimeout(callback, 250, self));
  });
};


// for resize events
// source: https://github.com/f/jquery.resizestop
(function($) {
  var slice = Array.prototype.slice;

  // Special event definition
  $.extend($.event.special, {
    resizestop: {
      add: function(handle) {
        var handler = handle.handler;

        $(this).resize(function(e) {
          clearTimeout(handler._timer);
          e.type = 'resizestop';

          var _proxy = $.proxy(handler, this, e);
          handler._timer = setTimeout(_proxy, handle.data || 200);
        });
      }
    },

    resizestart: {
      add: function(handle) {
        var handler = handle.handler;

        $(this).on('resize', function(e) {
          clearTimeout(handler._timer);

          if (!handler._started) {
            e.type = 'resizestart';
            handler.apply(this, arguments);
            handler._started = true;
          }

          handler._timer = setTimeout($.proxy(function() {
            handler._started = false;
          }, this), handle.data || 300);
        });
      }
    }
  });

  // binding and currying the shortcuts.
  $.extend($.fn, {
    resizestop: function() {
      $(this).on.apply(this, ["resizestop"].concat(slice.call(arguments)));
    },
    resizestart: function() {
      $(this).on.apply(this, ["resizestart"].concat(slice.call(arguments)));
    }
  });
})(jQuery);

(function($) {

  $.OpenSeadragon = function(options) {

    var osd = OpenSeadragon(

      jQuery.extend({
        preserveViewport: true,
        visibilityRatio:  1,
        minZoomLevel:     0,
        defaultZoomLevel: 0,
        prefixUrl:        'images/openseadragon/',
        autoHideControls: false,
        zoomInButton:   "zoom-in",
        zoomOutButton:  "zoom-out",
        homeButton:     "home",
        fullPageButton: "full-page"
      }, options)

    );
    
    var div = document.getElementById("osd-toolbar");

    osd.addControl(div, {anchor: OpenSeadragon.ControlAnchor.BOTTOM_RIGHT});
    
    div = document.createElement("div");
    var anno = document.createElement("a");
    anno.className = 'mirador-btn mirador-icon-annotations';
    var i = document.createElement("i");
    i.className = "fa fa-comments fa-lg";
    anno.appendChild(i);
    
    var choices = document.createElement("a");
    choices.className = "mirador-btn mirador-icon-choices";

	div.appendChild(anno);
	div.appendChild(choices);
	osd.addControl(div, {anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT});

    return osd;

  };

}(Mirador));
(function($) {

  $.SaveController = function(config) {

    jQuery.extend(true, this, {
      currentConfig: null,
      originalConfig: null, // Don't know if we really need this.
      shareEndpoint: null, // the place where POST requests for new saved sessions will go 
      historySize: null, // wishful thinking for later.
      sessionID: null
    }, $.DEFAULT_SETTINGS.saveController, config.saveController);

    this.init(config);

  };

  $.SaveController.prototype = {

    init: function(config) {
      var _this = this;
      var sessionID = window.location.hash.substring(1); // will return empty string if none exists, causing the or statement below to evaluate to false, generating a new sesssionID.
      
      if (sessionID) {
        this.sessionID =  sessionID;
      } else {
        this.sessionID = $.genUUID(); // might want a cleaner thing for the url.
      }
      
      if (localStorage.getItem(this.sessionID)) {
        this.currentConfig = JSON.parse(localStorage.getItem(sessionID));
      } else {
        var paramURL = window.location.search.substring(1);
        if (paramURL) {
          var params = paramURL.split('=');
          var jsonblob = params[1];
          var ajaxURL = "http://jsonblob.com/api/jsonBlob/"+jsonblob;
          jQuery.ajax({
           type: 'GET',
           url: ajaxURL, 
           headers: { 
             'Accept': 'application/json',
             'Content-Type': 'application/json' 
            },
            success: function(data, textStatus, request) {
              _this.currentConfig = data;
           },
           async: false
         });
          //get json from jsonblob and set currentConfig to it
        } else {
           this.currentConfig = config;
        }
    }        
    //add UUIDs to parts of config that need them
    if (this.currentConfig.windowObjects) {
        jQuery.each(this.currentConfig.windowObjects, function(index, window) {
            if (!window.id) {
                window.id = $.genUUID();
            }
        });
    }
    // see: http://html5demos.com/history and http://diveintohtml5.info/history.html
    // put history stuff here, for a great cross-browser demo, see: http://browserstate.github.io/history.js/demo/
    //http://stackoverflow.com/questions/17801614/popstate-passing-popped-state-to-event-handler
        
    //also remove ?json bit so it's a clean URL
    var cleanURL = window.location.href.replace(window.location.search, "");
    if (window.location.hash) {
        history.replaceState(this.currentConfig, "Mirador Session", cleanURL);
    } else {
        history.replaceState(this.currentConfig, "Mirador Session", cleanURL+"#"+this.sessionID);
    }

    this.bindEvents();
      
  },

    set: function(prop, value, options) {
      // when a property of the config is updated,
      // save it to localStore.
      if (options) {
          this[options.parent][prop] = value;
      } else {
          this[prop] = value;
      }
      this.save();
    },

    bindEvents: function() {
      var _this = this;
      // listen to existing events and use the 
      // available data to update the appropriate 
      // field in the stored config.
      
      jQuery.subscribe('focusUpdated', function(event, options) {
        var windowObjects = _this.currentConfig.windowObjects;
        if (windowObjects && windowObjects.length > 0) {
            jQuery.each(windowObjects, function(index, window){
                if (window.id === options.id) {
                    jQuery.extend(windowObjects[index], options);
                }
            });
        } else {
           windowObjects = [options];
        }
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });
      
      jQuery.subscribe("imageZoomUpdated", function(event, options) {
        var windowObjects = _this.currentConfig.windowObjects;
        if (windowObjects && windowObjects.length > 0) {
            jQuery.each(windowObjects, function(index, window){
                if (window.id === options.id) {
                    if (!windowObjects[index].windowOptions) {
                      windowObjects[index].windowOptions = {};
                    }
                    windowObjects[index].windowOptions.zoomLevel = options.zoomLevel;
                }
            });
        }
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });
      
      jQuery.subscribe("imageBoundsUpdated", function(event, options) {
        var windowObjects = _this.currentConfig.windowObjects;
        if (windowObjects && windowObjects.length > 0) {
            jQuery.each(windowObjects, function(index, window){
                if (window.id === options.id) {
                    if (!windowObjects[index].windowOptions) {
                      windowObjects[index].windowOptions = {};
                    }
                    windowObjects[index].windowOptions.osdBounds = options.osdBounds;
                }
            });
        }
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });
      
      jQuery.subscribe('manifestAdded', function(event, url, repository) {
        var data = _this.currentConfig.data;
        var objectInConfig = false;
        jQuery.each(data, function(index, manifestObject){
            if (manifestObject.manifestUri === url) {
                objectInConfig = true;
            }
        });
        if (!objectInConfig) {
            data.push({"manifestUri":url, "location":repository});
            _this.set("data", data, {parent: "currentConfig"});
        }
      });
      
      jQuery.subscribe('etc...', function(junk) {
        // handle adding the property in the appropriate place 
        // in this.currentConfig by passing to the _this.set(), 
        // which "saves" to localstore as a side effect.

      });

      // We could have simply listened to the 'set' event that
      // would have been emitted by objects when their models were
      // updated and sent the results to a parser function that
      // would extract the calling object's properties in the config
      // and updated them if they were different, but we can't 
      // currently do that the way the app is written, since we 
      // didn't actually follow that patttern almost anywhere. 
      // 
      // jQuery.subscribe('set', function(junk) {
      //  // 1.) send the junk to a parser function
      //  // 2.) use this.set(parsedJunk) to update
      //  // this.currentConfig, with the sideEffect of
      //  // saving to localStorage. 
      //
      // });

      // you may need to bind another event here that responds to the
      // user navigating history, for the purpose of popping the 
      // history entry back off. 

    },

    save: function() {
      _this = this;

      // the hash must be stringified because
      // localStorage is a key:value store that
      // only accepts strings.

      localStorage.setItem(_this.sessionID, JSON.stringify(_this.currentConfig));
    }

  };

}(Mirador));

(function($) {

  $.isValidView = function(view) {
    return (typeof $.DEFAULT_SETTINGS.availableViews.view === 'undefined');
  };


  $.inArrayToBoolean = function(index) {
    return index === -1 ? false : true;
  };


  $.castToArray = function(obj) {
    return (typeof obj === 'string') ? [obj] : obj;
  };


  // Removes duplicates from an array.
  $.getUniques = function(arr) {
    var temp = {},
    unique = [];

    for (var i = 0; i < arr.length; i++) {
      temp[arr[i]] = true;
    }

    for (var k in temp) {
      unique.push(k);
    }

    return unique;
  };


  $.getTitlePrefix = function(details) {
    var prefixes = [];

    if (details && details.label) {
      prefixes.push(details.label);
    }

    return prefixes.join(' / ');
  };


  $.trimString = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };


  $.trimStringBy = function(str, length) {
    if (str.length > length) {
      str = str.substr(0, length) + '...';
    }

    return str;
  };


  // Base code from https://github.com/padolsey/prettyprint.js. Modified to fit Mirador needs
  $.stringifyObject = function(obj, nestingMargin) {
    var type = typeof obj,
        str,
        first = true,
        increment = 15,
        delimiter = '<br/>';

    if (obj instanceof RegExp) {
      return '/' + obj.source + '/';
    }

    if (typeof nestingMargin === 'undefined') {
      nestingMargin = 0;
    }

    if (obj instanceof Array) {
      str = '[ ';

      jQuery.each(obj, function (i, item) {
        str += (i === 0 ? '' : ', ') + $.stringifyObject(item, nestingMargin + increment);
      });

      return str + ' ]';
    }

    if (typeof obj === 'object') {
      str = '<div style="margin-left:' +  nestingMargin + 'px">';

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          str += (first ? '' : delimiter) + i + ': ' + $.stringifyObject(obj[i], nestingMargin + increment);
          first = false;
        }
      }

      return str + '</div>';
    }


    return obj.toString();
  };


  $.getJsonFromUrl = function(url, async) {
    var json;

    jQuery.ajax({
      url: url,
      dataType: 'json',
      async: async || false,

      success: function(data) {
        json = data;
      },

      error: function(xhr, status, error) {
        console.error(xhr, status, error);
      }
    });

    return json;
  };


  $.getViewLabel = function(type) {
    var view = $.DEFAULT_SETTINGS.availableViews[type];

    return (view && view.label) ? view.label : type;
  };


  $.extractLabelFromAttribute = function(attr) {
    var label = attr;

    label = label.replace(/^@/, '');
    label = label.replace(/([A-Z])/g, ' $1');
    label = label.replace(/\s{2,}/g, ' ');
    label = label.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return label;
  };


  $.toString = function(obj, delimiter) {
    var str = '',
    joint = delimiter || ' ';

    if (jQuery.type(obj) === 'string') {
      str = obj;
    }

    if (jQuery.isArray(obj)) {
      str = obj.join(joint);
    }

    return str;
  };


  /* --------------------------------------------------------------------------
     Methods related to manifest data
     -------------------------------------------------------------------------- */

  $.getManifestIdByUri = function(uri) {
    var id;

    id = jQuery.map($.manifests, function(manifest, manifestId) {
      if (uri === manifest.uri) {
        return manifestId;
      }
    });

    return id[0] || id;
  };
  
  $.getMetadataAbout = function(jsonLd) {
      return {
         '@context': jsonLd['@context'] || '',
         '@id':      jsonLd['@id'] || ''
        };
    };

  $.getMetadataDetails = function(jsonLd) {
      return {
          'label':        jsonLd.label || '',
          'agent':        jsonLd.agent || '',
          'location':     jsonLd.location || '',
          'date':         jsonLd.date || '',
          'description':  jsonLd.description || ''
        };
    };

  $.getMetadataFields = function(jsonLd) {
      // parse and store metadata pairs (API 1.0)
      var mdList = {};
      if (typeof jsonLd.metadata !== 'undefined') {
          jQuery.each(jsonLd.metadata, function(index, item) {
              mdList[item.label] = item.value;
            });
        }
        return mdList;
   };

   $.getMetadataRights =function(jsonLd) {
       return {
           'license':      jsonLd.license || '',
           'attribution':  jsonLd.attribution || ''
        };
   };

   $.getMetadataLinks = function(jsonLd) {
      return {
          'service':  jsonLd.service || '',
          'seeAlso':  jsonLd.seeAlso || '',
          'within':   jsonLd.within || ''
        };
   };

  $.getImagesListByManifestId = function(manifestId) {
    return $.manifests[manifestId].sequences[0].imagesList;
  };

  $.getImageIndexById = function(imagesList, id) {
      var imgIndex = 0;

      jQuery.each(imagesList, function(index, img) {
        if ($.trimString(img['@id']) === $.trimString(id)) {
          imgIndex = index;
        }
      });

      return imgIndex;
    };
    
  $.getImagesListByManifest = function(manifest) {
    return manifest.sequences[0].canvases;
  };
  
  $.getImageUrlForCanvas = function(canvas) {
    var resource = canvas.images[0].resource;
    var service = resource['default'] ? resource['default'].service : resource.service;
    return service['@id'];
  };
  
  $.getImageTitleForCanvas = function(canvas) {
    
  };

  $.getCollectionTitle = function(metadata) {
    return metadata.details.label || '';
  };


  $.getImageTitlesAndIds = function(images) {
    var data = [];

    jQuery.each(images, function(index, image) {
      data.push({
        'title': image.title,
        'id': image.id
      });
    });

    return data;
  };


  $.genUUID = function() {
    var idNum = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });

    return "uuid-" + idNum;
  };
  
  jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
            return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
  };


  $.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;

    if (typeof options !== 'undefined') {
      options = {};
    }

    var later = function() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };


  $.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  $.parseRegion  = function(url) {
    url = new URI(url);
    var regionString = url.hash();
    regionArray = regionString.split('=')[1].split(',');
    return regionArray;
  };

  $.getOsdFrame = function(region, currentImg) {
    var imgWidth = currentImg.width,
    imgHeight = currentImg.height,
    canvasWidth = currentImg.canvasWidth,
    canvasHeight = currentImg.canvasHeight,
    widthNormaliser = imgWidth/canvasWidth,
    heightNormaliser = imgHeight/canvasHeight,
    rectX = (region[0]*widthNormaliser)/imgWidth,
    rectY = (region[1]*heightNormaliser)/imgWidth,
    rectW = (region[2]*widthNormaliser)/imgWidth,
    rectH = (region[3]*heightNormaliser)/imgWidth;

    var osdFrame = new OpenSeadragon.Rect(rectX,rectY,rectW,rectH);

    return osdFrame;
  };
  
  // http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
  $.isOnScreen = function(elem, outsideViewportFactor) {
    var factor = 1;
    if (outsideViewportFactor) {
       factor = outsideViewportFactor;
    }
    var win = jQuery(window);
    var viewport = {
      top : (win.scrollTop() * factor),
      left : (win.scrollLeft() * factor)
    };
    viewport.bottom = (viewport.top + win.height()) * factor;
    viewport.right = (viewport.left + win.width()) * factor;

    var el = jQuery(elem);
    var bounds = el.offset();
    bounds.bottom = bounds.top + el.height();
    bounds.right = bounds.left + el.width();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  };

  $.getRangeIDByCanvasID = function(manifest, canvasID /*, [given parent range] (for multiple ranges, later) */) {
    var ranges = jQuery.grep(manifest.structures, function(range) { return jQuery.inArray(canvasID, range.canvases) > -1; }),
    rangeIDs = jQuery.map(ranges,  function(range) { return range['@id']; });

    return rangeIDs;

  };

}(Mirador));
