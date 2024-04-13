class Cart extends HTMLElement {
  constructor() {
    super(),
      (this.cartToggle = document.querySelector("[data-cart-toggle]")),
      (this.navBackdrop = document.querySelector("[data-nav-backdrop]")),
      (this.cartDrawerIsOpen = !1),
      location.hash.substr(1) === "cart" &&
        ((this.cartDrawerIsOpen = !0), this.open()),
      document.addEventListener("itemAdded", () => this.open(!1));
  }
  connectedCallback() {
    this.navBackdrop.addEventListener("click", () => {
      window.appState.cartDrawer && this.close();
    }),
      this.cartToggle.addEventListener("click", this.toggleCart.bind(this)),
      document.addEventListener("toggleMobileNav", () => this.close(!1)),
      document.addEventListener("toggleSearch", () => this.close(!1)),
      window.location.hash === "#cart" &&
        ((this.cartDrawerIsOpen = !0), this.open());
  }
  toggleCart(event) {
    event.preventDefault(), this.cartDrawerIsOpen ? this.close() : this.open();
  }
  open(triggeredBy) {
    (this.cartDrawerIsOpen = !0),
      (window.appState.cartDrawer = !0),
      triggeredBy && this.setActiveElement(triggeredBy),
      this.classList.add("active"),
      document.body.classList.add("cart-open");
    const event = new Event("toggleCart");
    document.dispatchEvent(event),
      this.addEventListener(
        "transitionend",
        () => {
          const containerToTrapFocusOn = this,
            focusElement = this.classList.contains("no-items")
              ? document.querySelector("button[type='submit']")
              : this.querySelector(".cart__checkout-button");
        },
        {
          once: !0,
        }
      ),
      document.dispatchEvent(
        new CustomEvent("activeDropdown", {
          bubbles: !0,
        })
      ),
      this.lockScroll();
  }
  close(includeUnlockScroll = !0) {
    (this.cartDrawerIsOpen = !1),
      (window.appState.cartDrawer = !1),
      this.classList.remove("active"),
      document.body.classList.remove("cart-open"),
      document.dispatchEvent(
        new CustomEvent("closedDropdown", {
          bubbles: !0,
        })
      ),
      includeUnlockScroll && this.unlockScroll();
  }
  lockScroll() {
    if (document.body.style.position === "fixed") return;
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`),
      (document.body.style.position = "fixed"),
      (document.body.style.width = "100%"),
      (document.body.style.top = `-${scrollY}px`);
  }
  unlockScroll() {
    const scrollY = document.body.style.top;
    (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.width = ""),
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }
  setActiveElement(element) {
    this.activeElement = element;
  }
}
customElements.define("cart-drawer", Cart);
