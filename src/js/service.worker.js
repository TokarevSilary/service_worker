import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

async function fetchResponse(event) {
  const url = new URL(event.request.url);
  let response;

  try {
    response = await fetch(url);
    return response;
  } catch (err) {
    return new Response(`Ошибка загрузки ${err.message}`, {
      status: 500,
    });
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(fetchResponse(event));
});
