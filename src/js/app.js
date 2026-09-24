import { createElement } from "./render";
const url = "https://new-server-worker.onrender.com/news/unread";
const root = document.getElementById("root");

function skeletDraw() {
  return createElement(
    "div",
    { className: "news_container_skeleton" },
    createElement("div", { className: "title_skeleton" }),
    createElement("div", { className: "img_skeleton" }),
    createElement(
      "div",
      { className: "text_skeleton" },
      createElement("div", { className: "text_skeleton1" }),
      createElement("div", { className: "text_skeleton1" }),
    ),
  );
}

function modalPosition() {
  return createElement(
    "div",
    { className: "modal" },
    createElement(
      "div",
      { className: "modal__content" },
      createElement(
        "div",
        { className: "modal-text" },
        "Не удалось загрузить данные\n" +
          "\n" +
          "проверьте подключение \n" +
          "\n" +
          "и обновите страницу",
      ),
    ),
  );
}

function responseDraw(data) {
  return createElement(
    "div",
    { className: "news_respose" },
    createElement("div", { className: "title_respose" }, data.title),
    createElement("img", { className: "img_respose", src: data.image }),
    createElement(
      "div",
      { className: "text_respose" },
      createElement("div", { className: "text_respose1" }, data.text),
    ),
  );
}

let containerRef;

function showDOM() {
  return (containerRef = createElement(
    "div",
    { className: "container" },
    createElement(
      "div",
      { className: "constiner-info" },
      createElement("h3", { className: "title" }, "Новости мира кино"),
      createElement(
        "button",
        {
          className: "button-refresh",
          onclick: () => {
            console.log("CLICK");
            location.reload();
          },
        },
        "обновить",
      ),
    ),
  ));
}

root.appendChild(showDOM());
containerRef.appendChild(skeletDraw());
containerRef.appendChild(skeletDraw());
containerRef.appendChild(skeletDraw());

if (navigator.serviceWorker) {
  window.addEventListener("load", async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register("./service.worker.js");
        console.log("sw registered");
      }
    } catch (e) {
      console.log(e);
    }
  });
}

async function newsInformation() {
  try {
    const request = await fetch(url, {
      method: "GET",
    });

    if (request.status === 200) {
      const data = await request.json();
      containerRef.innerHTML = "";
      data.data.forEach((item) => {
        containerRef.appendChild(responseDraw(item));
      });
    }
    if (request.status === 500) {
      document.body.appendChild(modalPosition());
    }
  } catch (e) {
    console.log(e);
    document.body.appendChild(modalPosition());
  }
}

newsInformation();
