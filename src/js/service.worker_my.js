// console.log(self.__WB_MANIFEST);
// import { precacheAndRoute } from "workbox-precaching";
//
// precacheAndRoute(self.__WB_MANIFEST);
// const CACHE_PATH = ["/", "/main.js", "/main.css"];
//
// async function cachePrioryty(event) {
//   const cacheResponse = await caches.match(event.request);
//   if (cacheResponse) {
//     return cacheResponse;
//   }
//
//   let response;
//
//   try {
//     response = await fetch(event.request);
//   } catch (err) {
//     return new Response(err.status, err.statusText);
//   }
//
//   const cache = await caches.open("static-data");
//   await cache.put(event.request, response.clone());
//
//   return response;
// }

// async function fetchPrioryty(event) {
//   let response;
//
//   try {
//     response = await fetch(event.request);
//     return response;
//   } catch (error) {
//     return new Response(error.status, error.statusText);
//   }
// }

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open("static-data").then((cache) => {
//       return cache.addAll(["./", "./main.js", "./main.css"]);
//     }),
//   );
// });
//
// self.addEventListener("fetch", (event) => {
//   if (event.request.method !== "GET") {
//     return;
//   }
//
//   const url = new URL(event.request.url);
//
//   if (CACHE_PATH.includes(url.pathname)) {
//     event.respondWith(cachePrioryty(event));
//
//     return;
//   } else {
//     event.respondWith(fetchPrioryty(event));
//
//     return;
//   }
// });
