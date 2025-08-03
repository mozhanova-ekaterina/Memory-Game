var l = Object.defineProperty;
var m = (c, e, t) =>
  e in c
    ? l(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (c[e] = t);
var i = (c, e, t) => m(c, typeof e != "symbol" ? e + "" : e, t);
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const n of o.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && r(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = t(s);
    fetch(s.href, o);
  }
})();
class u {
  constructor(e, t) {
    i(this, "board");
    i(this, "items");
    (this.items = e), (this.board = t);
  }
  draw() {
    this.items.forEach((e) => {
      this.board.insertAdjacentHTML(
        "beforeend",
        `
          <div class='game_item' id='${e.index}'>
            <div class='front'>
              <img src='${e.src}'  alt='image'/>
            </div>
            <div class='back'>
            </div>
          </div> 
        `
      );
    });
  }
  start() {
    this.draw(),
      document
        .querySelectorAll(".game_item")
        .forEach((t, r) =>
          t.addEventListener("click", (s) => this.handleClick(s, r))
        );
  }
  handleClick(e, t) {
    e.currentTarget.classList.add("open"), this.items[t].open(), this.check();
  }
  check() {
    const e = this.items.filter((t) => t.state === "open");
    e.length > 1 && e[0].src === e[1].src
      ? e.forEach((t) => {
          var r;
          t.done(),
            (r = document.getElementById(`${t.index}`)) == null ||
              r.classList.add("done");
        })
      : e.length > 1 &&
        e[0].index !== e[1].index &&
        setTimeout(() => {
          e.forEach((t) => {
            var r;
            t.close(),
              (r = document.getElementById(`${t.index}`)) == null ||
                r.classList.remove("open");
          });
        }, 500),
      setTimeout(() => {
        if (this.items.every((t) => t.state === "done")) {
          const t = document.querySelector(".win_text");
          document
            .querySelectorAll(".game_item")
            .forEach((r) => r.classList.add("win")),
            t && (t.style.display = "block");
        }
      }, 1e3);
  }
}
class p {
  constructor(e, t) {
    i(this, "src");
    i(this, "index");
    i(this, "state");
    (this.src = e), (this.index = t), this.close();
  }
  open() {
    this.state = "open";
  }
  close() {
    this.state = "close";
  }
  done() {
    this.state = "done";
  }
}
const d = document.querySelector(".game_board"),
  f = [
    { src: "1.jpg" },
    { src: "2.webp" },
    { src: "3.webp" },
    { src: "4.jpg" },
    { src: "5.jpg" },
    { src: "6.jpg" },
    { src: "7.webp" },
    { src: "8.jpg" },
    { src: "1.jpg" },
    { src: "2.webp" },
    { src: "3.webp" },
    { src: "4.jpg" },
    { src: "5.jpg" },
    { src: "6.jpg" },
    { src: "7.webp" },
    { src: "8.jpg" },
  ],
  h = f.map((c, e) => new p(c.src, e)).sort(() => Math.random() - 0.5);
var a;
d &&
  (new u(h, d).start(),
  (a = document.querySelector(".restart")) == null ||
    a.addEventListener("click", () => {
      window.location.reload();
    }));
