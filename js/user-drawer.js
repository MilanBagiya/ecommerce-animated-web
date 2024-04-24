class user extends HTMLElement {
  constructor() {
    super(),
      (this.userToggle = document.querySelector("[data-user-toggle]")),
      (this.navBackdrop = document.querySelector("[data-nav-backdrop]")),
      (this.userDrawerIsOpen = !1),
      location.hash.substr(1) === "user" &&
        ((this.userDrawerIsOpen = !0), this.open()),
      document.addEventListener("itemAdded", () => this.open(!1));
  }
  connectedCallback() {
    this.navBackdrop.addEventListener("click", () => {
      window.appState.userDrawer && this.close();
    }),
      this.userToggle.addEventListener("click", this.toggleUser.bind(this)),
      document.addEventListener("toggleMobileNav", () => this.close(!1)),
      document.addEventListener("toggleSearch", () => this.close(!1)),
      document.addEventListener("toggleCart", () => this.close(!1)),
      window.location.hash === "#user" &&
        ((this.userDrawerIsOpen = !0), this.open());
  }
  toggleUser(event) {
    event.preventDefault(), this.userDrawerIsOpen ? this.close() : this.open();
  }
  open(triggeredBy) {
    (this.userDrawerIsOpen = !0),
      (window.appState.userDrawer = !0),
      triggeredBy && this.setActiveElement(triggeredBy),
      this.classList.add("active"),
      document.body.classList.add("user-open");
    const event = new Event("toggleUser");
    document.dispatchEvent(event),
      this.addEventListener("transitionend", () => {}, {
        once: !0,
      }),
      document.dispatchEvent(
        new CustomEvent("activeDropdown", {
          bubbles: !0,
        })
      ),
      this.lockScroll();
  }
  close(includeUnlockScroll = !0) {
    (this.userDrawerIsOpen = !1),
      (window.appState.userDrawer = !1),
      this.classList.remove("active"),
      document.body.classList.remove("user-open"),
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
customElements.define("user-drawer", user);
