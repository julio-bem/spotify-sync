if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const o=e=>s(e,c),l={module:{uri:c},exports:t,require:o};i[c]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-ba62cffe"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BDijlM5b.js",revision:null},{url:"assets/index-BgwIQwOJ.js",revision:null},{url:"assets/index-CCs5iy5n.js",revision:null},{url:"index.html",revision:"4c849032acb2d3b68c3b12d974c669e7"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"maskable-icon-512x512.png",revision:"1b235e46c029f7435eae8aa7b8dec592"},{url:"pwa-192x192.png",revision:"fa5d9a70835c453c537d84c64ae7ab52"},{url:"pwa-512x512.png",revision:"0cbf3d5168087953ac956a9b75347636"},{url:"pwa-64x64.png",revision:"1be03155c3bb2bc198656b561416fec9"},{url:"manifest.webmanifest",revision:"1cbc213aad8b587712f9a596b2731568"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>e.hostname.includes("api.spotify.com")),new e.CacheFirst({cacheName:"api-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
