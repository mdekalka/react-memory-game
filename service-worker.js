"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/card-game/index.html","7aada7e991004b8c3474f990240c9886"],["/card-game/static/css/main.9a5950a4.css","39e6175be8460d57fd60ee44d5a9520c"],["/card-game/static/js/main.47aec5d9.js","b26ad2ff4a51a63c275681febd671bad"],["/card-game/static/media/Crossroad_At_Dawn.644e17dd.mp3","644e17ddfd37ee842373cc4ba61406e0"],["/card-game/static/media/a11.30360e88.png","30360e88d8fdc004892cb05f3325c0fb"],["/card-game/static/media/a12.f005b8e0.png","f005b8e01715c7f5915fd135b7f8bd27"],["/card-game/static/media/a14.e33a88f9.png","e33a88f90f2642e7fd41ee06006942e1"],["/card-game/static/media/a15.9bc1040f.png","9bc1040f9429289622730800999e7004"],["/card-game/static/media/a16.fd03dc00.png","fd03dc009b16a5efe68c997661f0d331"],["/card-game/static/media/a17.97264a31.png","97264a3160c541b3f002142c6c61d5b7"],["/card-game/static/media/a18.bd087a3b.png","bd087a3b3deb5bb4716d28a9536a3e19"],["/card-game/static/media/a19.a682595f.png","a682595f7f901655adbc7b4a45749ca6"],["/card-game/static/media/a2.4d619765.png","4d619765c4d5e049482c6fb8de160606"],["/card-game/static/media/a20.811edbb2.png","811edbb2a0ea9add83d5f3a9f9bb20ab"],["/card-game/static/media/a21.1b42e4ea.png","1b42e4ea13e51b47b919444bad6bcc91"],["/card-game/static/media/a22.b724da02.png","b724da027dbd8e40514f8e2e0762c958"],["/card-game/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/card-game/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/card-game/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/card-game/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/card-game/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/card-game/static/media/lineage2_logo.0f82067d.png","0f82067dd50c0e5aacc7003d5aca2f4d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),a=urlsToCacheKeys.has(t));var r="/card-game/index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(r,self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});