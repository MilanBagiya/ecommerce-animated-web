class SearchForm extends HTMLElement {
  constructor() {
    super(),
      (this.input = this.querySelector('input[type="search"]')),
      (this.resetButton = this.querySelector('button[type="reset"]')),
      this.input &&
        (this.input.form.addEventListener("reset", this.onFormReset.bind(this)),
        this.input.addEventListener(
          "input",
          debounce((event) => {
            this.onChange(event);
          }, 300).bind(this)
        ));
  }
  toggleResetButton() {
    if (!this.resetButton) return;
    const resetIsHidden = this.resetButton.classList.contains("hidden");
    this.input.value.length > 0 && resetIsHidden
      ? this.resetButton.classList.remove("hidden")
      : this.input.value.length === 0 &&
        !resetIsHidden &&
        this.resetButton.classList.add("hidden");
  }
  onChange() {
    this.toggleResetButton();
  }
  shouldResetForm() {
    return !document.querySelector('[aria-selected="true"] a');
  }
  onFormReset(event) {
    event.preventDefault(),
      this.shouldResetForm() &&
        ((this.input.value = ""), this.input.focus(), this.toggleResetButton());
  }
}
customElements.define("search-form", SearchForm);

class PredictiveSearch extends SearchForm {
  constructor() {
    super(),
      (this.searchToggle = document.querySelector("[data-search-toggle]")),
      (this.navBackdrop = document.querySelector("[data-nav-backdrop]")),
      (this.cachedResults = {}),
      (this.predictiveSearchResults = this.querySelector(
        "[data-predictive-search]"
      )),
      (this.allPredictiveSearchInstances =
        document.querySelectorAll("predictive-search")),
      (this.isOpen = !1),
      (this.abortController = new AbortController()),
      (this.searchTerm = ""),
      this.setupEventListeners();
  }
  connectedCallback() {
    this.querySelectorAll("[data-suggested-search]").forEach((button) => {
      button.addEventListener("click", this.handleSuggestedSearchClick);
    });
  }
  setupEventListeners() {
    this.input.form.addEventListener("submit", this.onFormSubmit.bind(this)),
      this.input.addEventListener("focus", this.onFocus.bind(this)),
      this.addEventListener("keyup", this.onKeyup.bind(this)),
      this.addEventListener("keydown", this.onKeydown.bind(this)),
      (this.handleSuggestedSearchClick =
        this.handleSuggestedSearchClick.bind(this)),
      this.navBackdrop.addEventListener("click", () => {
        window.appState.predictiveSearch && this.close();
      }),
      this.searchToggle.addEventListener("click", this.toggleSearch.bind(this)),
      document.addEventListener("toggleMobileNav", () => this.close(!0, !1)),
      document.addEventListener("toggleCart", () => this.close(!0, !1)),
      document.addEventListener("toggleUser", () => this.close(!1));
  }
  getQuery() {
    return this.input.value.trim();
  }
  onChange() {
    super.onChange();
    const newSearchTerm = this.getQuery();
    if (
      ((!this.searchTerm || !newSearchTerm.startsWith(this.searchTerm)) &&
        this.querySelector(
          "#predictive-search-results-groups-wrapper"
        )?.remove(),
      this.updateSearchForTerm(this.searchTerm, newSearchTerm),
      (this.searchTerm = newSearchTerm),
      !this.searchTerm.length)
    ) {
      this.closeResults(!0);
      return;
    }
    this.getSearchResults(this.searchTerm);
  }
  onFormSubmit(event) {
    (!this.getQuery().length ||
      this.querySelector('[aria-selected="true"] a')) &&
      event.preventDefault();
  }
  onFormReset(event) {
    super.onFormReset(event),
      super.shouldResetForm() &&
        ((this.searchTerm = ""),
        this.abortController.abort(),
        (this.abortController = new AbortController()),
        this.closeResults(!0));
  }
  onFocus() {
    const currentSearchTerm = this.getQuery();
    currentSearchTerm.length &&
      (this.searchTerm !== currentSearchTerm
        ? this.onChange()
        : this.getAttribute("results") === "true"
        ? this.open()
        : this.getSearchResults(this.searchTerm));
  }
  onFocusOut() {
    setTimeout(() => {
      this.contains(document.activeElement) || this.close(!0);
    });
  }
  onKeyup(event) {
    switch (
      (this.getQuery().length || this.closeResults(!0),
      event.preventDefault(),
      event.code)
    ) {
      case "ArrowUp":
        this.switchOption("up");
        break;
      case "ArrowDown":
        this.switchOption("down");
        break;
      case "Enter":
        this.selectOption();
        break;
    }
  }
  onKeydown(event) {
    (event.code === "ArrowUp" || event.code === "ArrowDown") &&
      event.preventDefault();
  }
  updateSearchForTerm(previousTerm, newTerm) {
    const searchForTextElement = this.querySelector(
        "[data-predictive-search-search-for-text]"
      ),
      currentButtonText = searchForTextElement?.innerText;
    if (currentButtonText) {
      if (currentButtonText.match(new RegExp(previousTerm, "g")).length > 1)
        return;
      const newButtonText = currentButtonText.replace(previousTerm, newTerm);
      searchForTextElement.innerText = newButtonText;
    }
  }
  switchOption(direction) {
    if (!this.getAttribute("open")) return;
    const moveUp = direction === "up",
      selectedElement = this.querySelector('[aria-selected="true"]'),
      allVisibleElements = Array.from(
        this.querySelectorAll("li, button.predictive-search__item")
      ).filter((element) => element.offsetParent !== null);
    let activeElementIndex = 0;
    if (moveUp && !selectedElement) return;
    let selectedElementIndex = -1,
      i = 0;
    for (; selectedElementIndex === -1 && i <= allVisibleElements.length; )
      allVisibleElements[i] === selectedElement && (selectedElementIndex = i),
        i++;
    if (
      ((this.statusElement.textContent = ""),
      !moveUp && selectedElement
        ? (activeElementIndex =
            selectedElementIndex === allVisibleElements.length - 1
              ? 0
              : selectedElementIndex + 1)
        : moveUp &&
          (activeElementIndex =
            selectedElementIndex === 0
              ? allVisibleElements.length - 1
              : selectedElementIndex - 1),
      activeElementIndex === selectedElementIndex)
    )
      return;
    const activeElement = allVisibleElements[activeElementIndex];
    activeElement.setAttribute("aria-selected", !0),
      selectedElement && selectedElement.setAttribute("aria-selected", !1),
      this.input.setAttribute("aria-activedescendant", activeElement.id);
  }
  selectOption() {
    const selectedOption = this.querySelector(
      '[aria-selected="true"] a, button[aria-selected="true"]'
    );
    selectedOption && selectedOption.click();
  }
  getSearchResults(searchTerm) {
    const queryKey = searchTerm.replace(" ", "-").toLowerCase();
    if ((this.setLiveRegionLoadingState(), this.cachedResults[queryKey])) {
      this.renderSearchResults(this.cachedResults[queryKey]);
      return;
    }
    fetch(
      `${routes.predictive_search_url}?q=${encodeURIComponent(
        searchTerm
      )}&section_id=predictive-search`,
      { signal: this.abortController.signal }
    )
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          throw (this.close(!0), error);
        }
        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser()
          .parseFromString(text, "text/html")
          .querySelector("#shopify-section-predictive-search").innerHTML;
        this.allPredictiveSearchInstances.forEach(
          (predictiveSearchInstance) => {
            predictiveSearchInstance.cachedResults[queryKey] = resultsMarkup;
          }
        ),
          this.renderSearchResults(resultsMarkup);
      })
      .catch((error) => {
        if (error?.code !== 20) throw (this.close(!0), error);
      });
  }
  setLiveRegionLoadingState() {
    (this.statusElement =
      this.statusElement || this.querySelector(".predictive-search-status")),
      (this.loadingText =
        this.loadingText || this.getAttribute("data-loading-text")),
      this.setLiveRegionText(this.loadingText),
      this.setAttribute("loading", !0);
  }
  setLiveRegionText(statusText) {
    this.statusElement.setAttribute("aria-hidden", "false"),
      (this.statusElement.textContent = statusText),
      setTimeout(() => {
        this.statusElement.setAttribute("aria-hidden", "true");
      }, 1e3);
  }
  renderSearchResults(resultsMarkup) {
    (this.predictiveSearchResults.innerHTML = resultsMarkup),
      this.setAttribute("results", !0),
      this.setLiveRegionResults(),
      this.open();
  }
  setLiveRegionResults() {
    this.removeAttribute("loading"),
      this.setLiveRegionText(
        this.querySelector("[data-predictive-search-live-region-count-value]")
          .textContent
      ),
      this.querySelectorAll("[data-suggested-search]").forEach((button) => {
        button.addEventListener("click", this.handleSuggestedSearchClick);
      });
  }
  getResultsMaxHeight() {
    return (
      (this.resultsMaxHeight =
        window.innerHeight -
        document.querySelector(".section-header").getBoundingClientRect()
          .bottom),
      this.resultsMaxHeight
    );
  }
  toggleSearch(event) {
    event.preventDefault(), this.isOpen ? this.close(!0) : this.open();
  }
  open() {
    this.setAttribute("open", !0),
      this.input.setAttribute("aria-expanded", !0),
      (this.isOpen = !0),
      (window.appState.predictiveSearch = !0),
      this.classList.add("active"),
      document.body.classList.add("search-open");
    const event = new Event("toggleSearch", { bubbles: !0 });
    document.dispatchEvent(event),
      this.trapFocus(event, this),
      document.dispatchEvent(
        new CustomEvent("activeDropdown", { bubbles: !0 })
      ),
      this.lockScroll();
  }
  close(clearSearchTerm = !1, includeUnlockScroll = !0) {
    this.classList.remove("active"),
      document.body.classList.remove("search-open"),
      this.closeResults(clearSearchTerm),
      (this.isOpen = !1),
      (window.appState.predictiveSearch = !1),
      document.dispatchEvent(
        new CustomEvent("closedDropdown", { bubbles: !0 })
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
  closeResults(clearSearchTerm = !1) {
    (this.input.value = ""), this.removeAttribute("results");
    const selected = this.querySelector('[aria-selected="true"]');
    selected && selected.setAttribute("aria-selected", !1),
      this.input.setAttribute("aria-activedescendant", ""),
      this.removeAttribute("loading"),
      this.removeAttribute("open"),
      this.input.setAttribute("aria-expanded", !1),
      (this.predictiveSearchResults.innerHTML = ""),
      this.predictiveSearchResults.removeAttribute("style");
  }
  handleSuggestedSearchClick(event) {
    const searchTerm = event.currentTarget.getAttribute(
      "data-suggested-search"
    );
    this.input.value = searchTerm;
    const inputEvent = new Event("input");
    this.input.dispatchEvent(inputEvent);
  }
  trapFocus(event, container) {
    const focusableElements = container.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      ),
      firstFocusableElement = focusableElements[0],
      lastFocusableElement = focusableElements[focusableElements.length - 1];
    event.shiftKey
      ? document.activeElement === firstFocusableElement &&
        (lastFocusableElement.focus(), event.preventDefault())
      : document.activeElement === lastFocusableElement &&
        (firstFocusableElement.focus(), event.preventDefault()),
      (!document.activeElement ||
        !container.contains(document.activeElement)) &&
        firstFocusableElement.focus();
  }
}
customElements.define("predictive-search", PredictiveSearch);
