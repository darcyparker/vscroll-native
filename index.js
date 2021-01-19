(()=>{"use strict";var e={42:(e,t,n)=>{var r=n(940),o=n(177);const i={name:"vscroll-native",version:"1.0.0-beta.2"};var a=new(function(){function e(){this.maxId=0,this.map=new Map}return e.prototype.add=function(e){var t={items:[]},n=new o.h4({consumer:e.consumer,element:e.element,datasource:e.datasource,run:function(n){(n.length||t.items.length)&&(e.onItemsChanged(t.items,n),t.items=n)}});t.workflow=n,this.map.set(e.id,t)},e.prototype.getBox=function(e){var t=this.map.get(e);if(!t)throw"Can't get the Workflow";return t},e.prototype.get=function(e){return this.getBox(e).workflow},e.prototype.clear=function(e){this.get(e).dispose(),this.map.delete(e)},e}()),s=function(){function e(e,t,n){this.id=a.maxId++,this.viewport=e,this.datasource=t,this.template=n,this.prepareViewport(),a.add({id:this.id,consumer:i,element:this.scrollable,datasource:this.datasource,onItemsChanged:this.updateViewport.bind(this)})}return e.prototype.dispose=function(){a.clear(this.id)},e.prototype.prepareViewport=function(){for(;this.viewport.firstChild;)this.viewport.removeChild(this.viewport.firstChild);this.scrollable=document.createElement("div"),this.scrollable.setAttribute("vscroll",""),this.viewport.append(this.scrollable);var e=document.createElement("div");e.setAttribute("data-padding-backward","");var t=document.createElement("div");t.setAttribute("data-padding-forward",""),this.scrollable.append(e),this.scrollable.append(t)},e.prototype.updateViewport=function(e,t){e.filter((function(e){return!t.includes(e)})).forEach((function(e){return e.element&&e.element.remove()}));var n=this.makeNewElements(e,t),r=n.list,o=n.before;r.forEach((function(e){return o.insertAdjacentElement("beforebegin",e)}))},e.prototype.makeNewElements=function(e,t){for(var n=a.get(this.id).scroller.viewport.paddings.forward.element,r=[],o=t.length-1;o>=0;o--){var i=t[o];if(e.includes(i)){if(r.length)break;n=i.element}else r.unshift(this.createItemElement(i))}return{before:n,list:r}},e.prototype.createItemElement=function(e){var t=document.createElement("div");return t.setAttribute("data-sid",e.nodeId),e.invisible&&(t.style.position="fixed",t.style.left="-99999px"),t.innerHTML=this.template(e.get()),t},e}(),c=(0,o.cK)(),l={viewport:document.getElementById("viewport"),core:document.getElementById("core"),consumer:document.getElementById("consumer"),counter:document.getElementById("counter"),minIndex:document.getElementById("minIndex"),maxIndex:document.getElementById("maxIndex"),reload:document.getElementById("reload"),scroll:document.getElementById("scroll")};Object.entries(l).forEach((function(e){var t=(0,r.CR)(e,2),n=t[0];if(!t[1])throw"No "+n+" element found"}));var d=new c({get:function(e,t,n){for(var r=[],o=e;o<=e+t-1;o++)r.push({id:o,text:"item #"+o});n(r)},devSettings:{debug:!1}});new s(l.viewport,d,(function(e){return'<div class="item"><span>'+e.data.id+"</span>) "+e.data.text+"</div>"}));var u=d.adapter;u.init$.once((function(){l.core.innerHTML=u.packageInfo.core.name+" v"+u.packageInfo.core.version,l.consumer.innerHTML=u.packageInfo.consumer.name+" v"+u.packageInfo.consumer.version})),u.isLoading$.on((function(e){var t=u.bufferInfo,n=t.minIndex,r=t.maxIndex,o=t.firstIndex,i=t.lastIndex;l.counter.innerHTML=isNaN(o)||isNaN(i)?"":String(i-o),l.minIndex.innerHTML=String(n),l.maxIndex.innerHTML=String(r)})),l.reload.addEventListener("click",(function(){return u.reload()})),l.scroll.addEventListener("click",(function(){return(0,r.mG)(void 0,void 0,void 0,(function(){var e;return(0,r.Jh)(this,(function(t){switch(t.label){case 0:e=!1,setTimeout((function(){return e=!0}),2e3),t.label=1;case 1:return e?[3,3]:(u.fix({scrollPosition:1/0}),[4,new Promise((function(e){return requestAnimationFrame((function(){return(0,r.mG)(void 0,void 0,void 0,(function(){return(0,r.Jh)(this,(function(t){switch(t.label){case 0:return[4,d.adapter.relax()];case 1:return t.sent(),e(void 0),[2]}}))}))}))}))]);case 2:return t.sent(),[3,1];case 3:return[2]}}))}))}))}},t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,n.x=e=>{},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0},t=[[42,216]],r=e=>{},o=(o,i)=>{for(var a,s,[c,l,d,u]=i,m=0,p=[];m<c.length;m++)s=c[m],n.o(e,s)&&e[s]&&p.push(e[s][0]),e[s]=0;for(a in l)n.o(l,a)&&(n.m[a]=l[a]);for(d&&d(n),o&&o(i);p.length;)p.shift()();return u&&t.push.apply(t,u),r()},i=self.webpackChunkvscroll_native=self.webpackChunkvscroll_native||[];function a(){for(var r,o=0;o<t.length;o++){for(var i=t[o],a=!0,s=1;s<i.length;s++){var c=i[s];0!==e[c]&&(a=!1)}a&&(t.splice(o--,1),r=n(n.s=i[0]))}return 0===t.length&&(n.x(),n.x=e=>{}),r}i.forEach(o.bind(null,0)),i.push=o.bind(null,i.push.bind(i));var s=n.x;n.x=()=>(n.x=s||(e=>{}),(r=a)())})(),n.x()})();
//# sourceMappingURL=index.js.map