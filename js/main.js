(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === "childList")
        for (const c of r.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && s(c);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function i(n) {
    const r = {};
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = i(n);
    fetch(n.href, r);
  }
})(),
  ((o) => {
    window.NodeList &&
      !NodeList.prototype.forEach &&
      (NodeList.prototype.forEach = Array.prototype.forEach),
      document.addEventListener("DOMContentLoaded", () => {
        var e, i, s, n, r, c;
        const u = {
            logLevel: (e = o?.logLevel) != null ? e : "silent",
            ignoreHidden: (i = o?.ignoreHidden) != null ? i : !1,
            minBandwidth:
              o != null && o.minBandwidth ? Number(o.minBandwidth) : 0,
            reduceData: (s = o?.reduceData) != null ? s : !1,
          },
          p = (t, l = "") => {
            u.logLevel === "verbose" && window.console.log(`lazyvids: ${t}`, l);
          },
          d = (t, l = "") => {
            u.logLevel !== "silent" && window.console.warn(`lazyvids: ${t}`, l);
          },
          y = typeof window.IntersectionObserver == "function";
        let w;
        if (
          u.reduceData &&
          u.minBandwidth &&
          (((n = navigator.connection) == null ? void 0 : n.downlink) <
            u.minBandwidth ||
            ((r = navigator.connection) != null && r.saveData))
        ) {
          d(
            `Slow connection (${
              (c = navigator.connection) == null ? void 0 : c.downlink
            }mbps). Lazy autoplay disabled.`
          );
          return;
        }
        const b = (t) => {
            (t.muted = !0),
              (t.autoplay = !0),
              t.play() !== void 0
                ? t
                    .play()
                    .then(() => (t.dataset.lazyvids = "loaded"))
                    .catch((l) => d("Autoplay blocked by browser for:", t))
                : (t.dataset.lazyvids = "loaded");
          },
          E = (t) => {
            var l, a;
            if (
              ((l = t.style) == null ? void 0 : l.display) === "none" ||
              (u.ignoreHidden &&
                ((a = t.style) == null ? void 0 : a.visibility) === "hidden")
            )
              return !1;
            const h = getComputedStyle(t);
            return h.getPropertyValue("display") === "none" ||
              (u.ignoreHidden && h.getPropertyValue("visibility") === "hidden")
              ? !1
              : t.parentNode && t.parentNode !== document
              ? E(t.parentNode)
              : !0;
          },
          A = (t, l) => {
            t.forEach((a) => {
              window.requestAnimationFrame(() => {
                const h = a.target;
                a.isIntersecting !== !1 &&
                  E(h) !== !1 &&
                  (b(h), l.unobserve(h));
              });
            });
          };
        y && (w = new IntersectionObserver(A));
        const m = (t) => {
            if (y === !1) {
              b(t), d("Unsupported browser. Lazy autoplay disabled.");
              return;
            }
            (t.dataset.lazyvids = "unloaded"), w.observe(t);
          },
          L =
            "video[data-lazyvids]:not([data-lazyvids=loaded]):not([data-lazyvids=false])",
          v = document.querySelectorAll(L);
        p(
          `Initialised \u2014 ${v.length} ${
            v.length === 1 ? "video" : "videos"
          } detected`
        ),
          v.forEach((t) => m(t));
        const S = (t) => {
            t.forEach((l) => {
              l.addedNodes.forEach((a) => {
                if (
                  a.tagName === "VIDEO" &&
                  a.dataset.lazyvids !== void 0 &&
                  a.dataset.lazyvids !== "loaded" &&
                  a.dataset.lazyvids !== "false"
                ) {
                  m(a);
                  return;
                }
                a.hasChildNodes() !== !1 &&
                  a.querySelectorAll(L).forEach((h) => m(h));
              });
            });
          },
          I = {
            childList: !0,
            subtree: !0,
          };
        new MutationObserver(S).observe(document, I);
      });
  })(window.lazyvidsConfig || {}),
  (window.appState = {
    cartDrawer: !1,
    nav: !1,
    predictiveSearch: !1,
  });
const T = document.querySelector(".header__desktop-nav"),
  g = [...document.querySelectorAll("[data-section-theme]")];
let x = 0,
  f = "up";
const k = {
    root: null,
    threshold: 0,
  },
  D = (o) => {
    const e = g.findIndex((i) => i == o.target);
    return e >= g.length - 1 ? o.target : g[e + 1];
  },
  P = (o) => {
    const e = o.dataset.sectionTheme;
    document.documentElement.style.setProperty("--main-nav", e);
  },
  C = (o) =>
    !!((f === "down" && !o.isIntersecting) || (f === "up" && o.isIntersecting)),
  O = (o, e) => {
    o.forEach((i) => {
      window.scrollY > x ? (f = "down") : (f = "up"), (x = window.scrollY);
      const s = f === "down" ? D(i) : i.target;
      C(i) && P(s);
    });
  },
  q = new IntersectionObserver(O, k);
g.forEach((o) => {
  q.observe(o);
});
class z extends HTMLElement {
  constructor() {
    super(),
      (this.infoToggle = this.querySelector("[data-info-toggle]")),
      (this.infoPanel = this.querySelector("[data-info-panel]"));
  }
  connectedCallback() {
    this.init();
  }
  init() {
    this.dataset.cardProductMediaInitialised ||
      ((this.dataset.cardProductMediaInitialised = !0),
      !(!this.infoToggle || !this.infoPanel) &&
        (this.infoToggle.setAttribute("aria-expanded", "false"),
        (this.infoToggle.textContent = "i"),
        this.infoToggle.addEventListener("click", () => {
          this.infoPanel.classList.toggle("active"),
            this.infoToggle.classList.toggle("active");
          let e = this.infoToggle.getAttribute("aria-expanded") === "true";
          this.infoToggle.setAttribute("aria-expanded", !e),
            (this.infoToggle.textContent = e ? "i" : "\u274C");
        })));
  }
}
customElements.define("card-product-media", z);
class N extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.init();
  }
  handleClick(e) {
    const i = e.currentTarget,
      s = e.target.closest(".accordion__toggle");
    if (!s) return;
    const n = s.getAttribute("aria-controls"),
      r = i.querySelector(`#${n}`),
      c = s.getAttribute("aria-multiselectable"),
      u = i.querySelectorAll(".accordion__toggle"),
      p = i.querySelectorAll(".accordion__panel");
    c !== "true"
      ? (u.forEach((d) => {
          d !== s && d.setAttribute("aria-expanded", !1);
        }),
        p.forEach((d) => {
          d === r
            ? s.getAttribute("aria-expanded") === "true"
              ? (s.setAttribute("aria-expanded", !1), (d.style.height = 0))
              : (s.setAttribute("aria-expanded", !0),
                (d.style.height = `${d.scrollHeight}px`))
            : (d.style.height = 0);
        }))
      : c === "true" &&
        (s.getAttribute("aria-expanded") === "true"
          ? (s.setAttribute("aria-expanded", !1), (r.style.height = 0))
          : (s.setAttribute("aria-expanded", !0),
            (r.style.height = `${r.scrollHeight}px`)));
  }
  init() {
    this.dataset.accordionInitialised ||
      (this.querySelectorAll(".accordion__panel").forEach((i) => {
        i.classList.contains("show-panel") &&
          (i.style.height = `${i.scrollHeight}px`);
      }),
      this.addEventListener("click", this.handleClick.bind(this)),
      (this.dataset.accordionInitialised = !0));
  }
}
customElements.define("accordion-component", N);
class $ extends HTMLElement {
  constructor() {
    super(),
      (this.triggerId = this.getAttribute("data-modal-trigger-id")),
      (this.modalTriggers = document.querySelectorAll(
        `[data-modal-trigger-id="${this.triggerId}"]`
      )),
      (this.modalDrawerIsOpen = !1);
  }
  connectedCallback() {
    (this.modalDrawerBackdrop = this.querySelector(
      "[data-modal-drawer-backdrop]"
    )),
      (this.modalDrawerCloseButton = this.querySelector(
        "[data-modal-drawer-close]"
      )),
      this.modalTriggers.forEach((e) => {
        e.addEventListener("click", this.open.bind(this));
      }),
      this.modalDrawerBackdrop.addEventListener("click", this.close.bind(this)),
      this.modalDrawerCloseButton.addEventListener(
        "click",
        this.close.bind(this)
      ),
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  open() {
    (this.modalDrawerIsOpen = !0),
      this.classList.add("active"),
      document.body.classList.add("modal-drawer-open"),
      this.addEventListener(
        "transitionend",
        () => {
          const e = this,
            i = this.modalDrawerCloseButton;
          trapFocus(e, i);
        },
        {
          once: !0,
        }
      ),
      this.lockScroll();
  }
  close() {
    event.stopPropagation(),
      (this.modalDrawerIsOpen = !1),
      this.classList.remove("active"),
      document.body.classList.remove("modal-drawer-open"),
      this.unlockScroll();
  }
  lockScroll() {
    const e = window.scrollY;
    document.documentElement.style.setProperty("--scroll-y", `${e}px`),
      (document.body.style.position = "fixed"),
      (document.body.style.width = "100%"),
      (document.body.style.top = `-${e}px`);
  }
  unlockScroll() {
    const e = document.body.style.top;
    (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.width = ""),
      window.scrollTo(0, parseInt(e || "0") * -1);
  }
  handleKeyDown(e) {
    (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) &&
      this.modalDrawerIsOpen &&
      this.close();
  }
}
customElements.define("modal-drawer", $);
