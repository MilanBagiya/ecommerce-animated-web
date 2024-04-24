class o extends HTMLElement {
  constructor() {
    super(),
      (this.navBackdrop = document.querySelector("[data-nav-backdrop]")),
      (this.header = this.closest(".header-section")),
      (this.desktopNav = this.querySelector(".header__desktop-nav")),
      (this.navBackground = this.querySelector(".header__nav-background")),
      (this.headerLevel1Links = this.querySelectorAll("[data-nav-level-1]")),
      (this.dropdownToggles = this.querySelectorAll("[data-menu-toggle]")),
      (this.dropdownMenus = this.querySelectorAll("[data-dropdown-menu]")),
      (this.activeToggle = null),
      (this.hasActiveDropdown = !1),
      (this.mobileNavToggle = this.querySelector("[data-mobile-nav-toggle]")),
      (this.mobileNav = this.querySelector("[data-mobile-nav]")),
      (this.mobileNavIsActive = !1);
  }
  connectedCallback() {
    this.watchHeaderLevel1Links(),
      this.handleDropdownMenus(),
      this.mobileNavToggle.addEventListener(
        "click",
        this.toggleMobileNav.bind(this)
      ),
      this.navBackdrop.addEventListener("click", this.resetNav.bind(this)),
      this.navBackdrop.addEventListener("click", () => {
        window.appState.nav && this.resetMobileNav();
      }),
      document.addEventListener("toggleCart", this.resetNav.bind(this)),
      document.addEventListener("toggleCart", () => this.resetMobileNav(!1)),
      document.addEventListener("toggleSearch", this.resetNav.bind(this)),
      document.addEventListener("toggleSearch", () => this.resetMobileNav(!1)),
      document.addEventListener("keydown", this.handleKeyDown.bind(this)),
      this.desktopNav.addEventListener(
        "mouseover",
        this.updateNavBackground.bind(this)
      ),
      this.desktopNav.addEventListener(
        "mouseleave",
        this.resetNavBackground.bind(this)
      );
    const e = window.matchMedia("(min-width: 800px)");
    e.addEventListener
      ? e.addEventListener("change", this.handleResize.bind(this))
      : e.addListener(this.handleResize.bind(this));
  }
  handleResize() {
    this.resetNav(), this.resetMobileNav();
  }
  updateNavBackground(e) {
    let i = e.target.closest("[data-nav-level-1]");
    i &&
      ((this.navBackground.style.width = `${i.clientWidth}px`),
      (this.navBackground.style.transform = `translateX(${i.parentElement.offsetLeft}px)`),
      this.headerLevel1Links.forEach((t) => {
        t.classList.remove("is-red");
      }));
  }
  resetNavBackground() {
    this.hasActiveDropdown &&
      ((this.navBackground.style.width = `${this.activeToggle.clientWidth}px`),
      (this.navBackground.style.transform = `translateX(${this.activeToggle.parentElement.offsetLeft}px)`),
      (this.navBackground.style.opacity = 1),
      this.activeToggle.classList.add("is-red"));
  }
  watchHeaderLevel1Links() {
    this.headerLevel1Links.forEach((e) => {
      e.addEventListener("mouseenter", this.updateNavBackground.bind(this)),
        e.addEventListener("focus", this.updateNavBackground.bind(this));
    });
  }
  handleDropdownMenus() {
    this.dropdownToggles.forEach((e) => {
      e.addEventListener("click", (i) => {
        i.preventDefault();
        const t = this.querySelector(
          `[data-dropdown-menu="${e.dataset.menuToggle}"]`
        );
        if (
          (this.dropdownMenus.forEach((s) => {
            s !== t &&
              s.classList.contains("is-shown") &&
              (s.classList.remove("is-shown"),
              s.setAttribute("aria-expanded", "false"),
              this.querySelector(
                `[data-menu-toggle="${s.dataset.dropdownMenu}"]`
              ).classList.remove("is-active"));
          }),
          t.classList.contains("is-shown"))
        )
          t.classList.remove("is-shown"),
            e.classList.remove("is-active"),
            t.setAttribute("aria-expanded", "false"),
            document.body.classList.remove("dropdown-active"),
            (this.activeToggle = null),
            (this.hasActiveDropdown = !1),
            this.headerLevel1Links.forEach((s) => {
              s.classList.remove("is-red");
            }),
            this.navBackground.style.removeProperty("opacity"),
            document.dispatchEvent(
              new CustomEvent("closedDropdown", {
                bubbles: !0,
              })
            );
        else {
          t.classList.add("is-shown"),
            e.classList.add("is-active"),
            t.setAttribute("aria-expanded", "true"),
            document.body.classList.add("dropdown-active"),
            this.headerLevel1Links.forEach((a) => {
              a.classList.remove("is-red");
            }),
            (this.activeToggle = e),
            (this.hasActiveDropdown = !0);
          const s = t.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
          );
          s.length > 0 && s[0].focus(),
            document.dispatchEvent(
              new CustomEvent("activeDropdown", {
                bubbles: !0,
              })
            );
        }
      });
    });
  }
  resetNav() {
    this.dropdownMenus.forEach((e) => {
      e.classList.contains("is-shown") &&
        (e.classList.remove("is-shown"),
        e.setAttribute("aria-expanded", "false"),
        this.querySelector(
          `[data-menu-toggle="${e.dataset.dropdownMenu}"]`
        ).classList.remove("is-active"));
    }),
      document.body.classList.remove("dropdown-active"),
      (this.activeToggle = null),
      (this.hasActiveDropdown = !1),
      this.navBackground.style.removeProperty("opacity"),
      this.headerLevel1Links.forEach((e) => {
        e.classList.remove("is-red");
      }),
      document.dispatchEvent(
        new CustomEvent("closedDropdown", {
          bubbles: !0,
        })
      );
  }
  resetNavOnResize() {
    window.matchMedia("(max-width: 800px)").matches
      ? this.resetNav()
      : this.resetMobileNav();
  }
  openMobileNav() {
    this.lockScroll(),
      (this.mobileNavIsActive = !0),
      (window.appState.nav = !0),
      this.mobileNav.setAttribute("aria-expanded", "true"),
      this.navBackdrop.classList.add("is-shown"),
      this.mobileNav.classList.add("is-shown"),
      document.body.classList.add("menu-active");
    const e = new Event("toggleMobileNav", {
      bubbles: !0,
    });
    document.dispatchEvent(e),
      document.dispatchEvent(
        new CustomEvent("activeDropdown", {
          bubbles: !0,
        })
      );
  }
  resetMobileNav(e = !0) {
    (this.mobileNavIsActive = !1),
      (window.appState.nav = !1),
      this.mobileNav.setAttribute("aria-expanded", "false"),
      this.mobileNav.classList.remove("is-shown"),
      this.navBackdrop.classList.remove("is-shown"),
      document.body.classList.remove("menu-active"),
      document.dispatchEvent(
        new CustomEvent("closedDropdown", {
          bubbles: !0,
        })
      ),
      e && this.unlockScroll();
  }
  toggleMobileNav() {
    this.mobileNavIsActive ? this.resetMobileNav() : this.openMobileNav();
  }
  lockScroll() {
    if (document.body.style.position === "fixed") return;
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
    if (
      ((e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) &&
        (this.mobileNavIsActive ? this.resetMobileNav() : this.resetNav()),
      e.key === "Tab" || e.keyCode === 9)
    ) {
      const i = Array.from(this.dropdownMenus).find((t) =>
        t.classList.contains("is-shown")
      );
      i && this.trapFocus(e, i),
        this.mobileNavIsActive && this.trapFocus(e, this.mobileNav);
    }
  }
  trapFocus(e, i) {
    const t = i.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      ),
      s = t[0],
      a = t[t.length - 1];
    e.shiftKey
      ? document.activeElement === s && (a.focus(), e.preventDefault())
      : document.activeElement === a && (s.focus(), e.preventDefault()),
      (!document.activeElement || !i.contains(document.activeElement)) &&
        s.focus();
  }
}
customElements.define("sticky-header", o);
