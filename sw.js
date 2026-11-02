const CACHE='life-os-v4';
const THEME=`<style id="life-os-theme">
:root{--bg:#08090b!important;--panel:#111318!important;--panel2:#171a21!important;--line:#292e38!important;--green:#57d9a0!important;--muted:#9299a6!important;--white:#f4f6f8!important;--red:#ff7d8b!important}
html{background:#08090b!important}body{background:radial-gradient(ellipse at 15% -10%,rgba(87,217,160,.08),transparent 34%),radial-gradient(ellipse at 95% 0,rgba(80,110,180,.08),transparent 30%),#08090b!important;color:#f4f6f8!important}
.side,.card{background:linear-gradient(145deg,#13161c,#0f1116)!important;border-color:#292e38!important}.side{box-shadow:0 18px 45px rgba(0,0,0,.25)!important}
.nav{background:transparent!important;color:#8f97a5!important}.nav.active{background:rgba(87,217,160,.10)!important;color:#70e5ae!important;border-color:rgba(87,217,160,.22)!important}
.hero{background:radial-gradient(circle at 85% 10%,rgba(87,217,160,.12),transparent 34%),linear-gradient(120deg,#171b22,#101217)!important;border-color:#2c333e!important}
.eyebrow{color:#65dca5!important}.muted{color:#9299a6!important}
button{background:#181b21!important;border-color:#303640!important;color:#eef1f4!important}button:hover{background:#20242b!important;border-color:rgba(87,217,160,.45)!important}button.primary{background:linear-gradient(135deg,#63dfaa,#3fbd89)!important;color:#07130e!important;box-shadow:0 8px 24px rgba(63,189,137,.14)!important}
input,select{background:#0d0f13!important;border-color:#2c313a!important;color:#f4f6f8!important}input:focus,select:focus{border-color:#57d9a0!important;box-shadow:0 0 0 3px rgba(87,217,160,.08)!important}
.progress{background:#292e37!important}.progress span{background:linear-gradient(90deg,#42bd8a,#72e2b0)!important}.coach{background:linear-gradient(120deg,#151d1b,#111419)!important;border-color:rgba(87,217,160,.20)!important}.tag{color:#75e5b1!important;background:rgba(87,217,160,.09)!important;border-color:rgba(87,217,160,.18)!important}.task,.habit{border-bottom-color:#252a33!important}.timer{color:#6de0ad!important;text-shadow:0 0 30px rgba(87,217,160,.10)!important}.logo{background:linear-gradient(145deg,#1b3b32,#151d21)!important;border-color:rgba(87,217,160,.25)!important;color:#70e5ae!important}
</style>`;
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./','./index.html','./manifest.webmanifest'])))});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(async response=>{const text=await response.text();const themed=text.includes('</head>')?text.replace('</head>',THEME+'</head>'):text;const result=new Response(themed,{status:response.status,statusText:response.statusText,headers:response.headers});caches.open(CACHE).then(cache=>cache.put('./index.html',result.clone()));return result}).catch(()=>caches.match('./index.html')));return;
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})));
});