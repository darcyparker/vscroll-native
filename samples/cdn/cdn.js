(({Scroller:e,Datasource:t})=>{const o=document.getElementById("viewport"),a=new t({get:(e,t,o)=>{const a=[];for(let o=e;o<=e+t-1;o++)a.push({id:o,text:"item #"+o});o(a)}});new e({element:o,datasource:a,template:e=>`<div class="item"><span>${e.data.id}</span>) ${e.data.text}</div>`});a.adapter.init$.once((()=>{console.log("It works"),console.log(a.adapter.packageInfo.core),console.log(a.adapter.packageInfo.consumer)}))})(VScrollNative);