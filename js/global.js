function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}
document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute("role", "button"),
    summary.setAttribute(
      "aria-expanded",
      summary.parentNode.hasAttribute("open")
    ),
    summary.nextElementSibling.getAttribute("id") &&
      summary.setAttribute("aria-controls", summary.nextElementSibling.id),
    summary.addEventListener("click", (event) => {
      event.currentTarget.setAttribute(
        "aria-expanded",
        !event.currentTarget.closest("details").hasAttribute("open")
      );
    }),
    !summary.closest("header-drawer") &&
      summary.parentElement.addEventListener("keyup", onKeyUpEscape);
});
const trapFocusHandlers = {};
function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container),
    first = elements[0],
    last = elements[elements.length - 1];
  removeTrapFocus(),
    (trapFocusHandlers.focusin = (event) => {
      (event.target !== container &&
        event.target !== last &&
        event.target !== first) ||
        document.addEventListener("keydown", trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.focusout = function () {
      document.removeEventListener("keydown", trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.keydown = function (event) {
      event.code.toUpperCase() === "TAB" &&
        (event.target === last &&
          !event.shiftKey &&
          (event.preventDefault(), first.focus()),
        (event.target === container || event.target === first) &&
          event.shiftKey &&
          (event.preventDefault(), last.focus()));
    }),
    document.addEventListener("focusout", trapFocusHandlers.focusout),
    document.addEventListener("focusin", trapFocusHandlers.focusin),
    elementToFocus.focus();
}
try {
  document.querySelector(":focus-visible");
} catch {
  focusVisiblePolyfill();
}
function focusVisiblePolyfill() {
  const navKeys = [
    "ARROWUP",
    "ARROWDOWN",
    "ARROWLEFT",
    "ARROWRIGHT",
    "TAB",
    "ENTER",
    "SPACE",
    "ESCAPE",
    "HOME",
    "END",
    "PAGEUP",
    "PAGEDOWN",
  ];
  let currentFocusedElement = null,
    mouseClick = null;
  window.addEventListener("keydown", (event) => {
    navKeys.includes(event.code.toUpperCase()) && (mouseClick = !1);
  }),
    window.addEventListener("mousedown", (event) => {
      mouseClick = !0;
    }),
    window.addEventListener(
      "focus",
      () => {
        currentFocusedElement &&
          currentFocusedElement.classList.remove("focused"),
          !mouseClick &&
            ((currentFocusedElement = document.activeElement),
            currentFocusedElement.classList.add("focused"));
      },
      !0
    );
}
function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach((video) => {
    video.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }),
    document.querySelectorAll(".js-vimeo").forEach((video) => {
      video.contentWindow.postMessage('{"method":"pause"}', "*");
    }),
    document.querySelectorAll("video").forEach((video) => video.pause()),
    document.querySelectorAll("product-model").forEach((model) => {
      model.modelViewerUI && model.modelViewerUI.pause();
    });
}
function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener("focusin", trapFocusHandlers.focusin),
    document.removeEventListener("focusout", trapFocusHandlers.focusout),
    document.removeEventListener("keydown", trapFocusHandlers.keydown),
    elementToFocus && elementToFocus.focus();
}
function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== "ESCAPE") return;
  const openDetailsElement = event.target.closest("details[open]");
  if (!openDetailsElement) return;
  const summaryElement = openDetailsElement.querySelector("summary");
  openDetailsElement.removeAttribute("open"),
    summaryElement.setAttribute("aria-expanded", !1),
    summaryElement.focus();
}
class QuantityInput extends HTMLElement {
  constructor() {
    super(),
      (this.input = this.querySelector("input")),
      (this.input.style.width = `${
        parseInt(this.input.value, 10).toString().length
      }ch`),
      (this.changeEvent = new Event("change", { bubbles: !0 })),
      this.querySelectorAll("button").forEach((button) =>
        button.addEventListener("click", this.onButtonClick.bind(this))
      );
  }
  onButtonClick(e) {
    e.preventDefault();
    const previousValue = this.input.value;
    e.target.name === "plus" ? this.input.stepUp() : this.input.stepDown(),
      (this.input.style.width = `${
        parseInt(this.input.value, 10).toString().length
      }ch`),
      previousValue !== this.input.value &&
        (this.input.value == 0 && (this.input.value = 0),
        this.input.dispatchEvent(this.changeEvent));
  }
}
customElements.define("quantity-input", QuantityInput);
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t), (t = setTimeout(() => fn.apply(this, args), wait));
  };
}
typeof window.Shopify > "u" && (window.Shopify = {}),
  (Shopify.bind = function (fn, scope) {
    return function () {
      return fn.apply(scope, arguments);
    };
  }),
  (Shopify.setSelectorByValue = function (selector, value) {
    for (var i = 0, count = selector.options.length; i < count; i++) {
      var option = selector.options[i];
      if (value == option.value || value == option.innerHTML)
        return (selector.selectedIndex = i), i;
    }
  }),
  (Shopify.addListener = function (target, eventName, callback) {
    target.addEventListener
      ? target.addEventListener(eventName, callback, !1)
      : target.attachEvent("on" + eventName, callback);
  }),
  (Shopify.postLink = function (path, options) {
    options = options || {};
    var method = options.method || "post",
      params = options.parameters || {},
      form = document.createElement("form");
    form.setAttribute("method", method), form.setAttribute("action", path);
    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden"),
        hiddenField.setAttribute("name", key),
        hiddenField.setAttribute("value", params[key]),
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form),
      form.submit(),
      document.body.removeChild(form);
  }),
  (Shopify.CountryProvinceSelector = function (
    country_domid,
    province_domid,
    options
  ) {
    (this.countryEl = document.getElementById(country_domid)),
      (this.provinceEl = document.getElementById(province_domid)),
      (this.provinceContainer = document.getElementById(
        options.hideElement || province_domid
      )),
      Shopify.addListener(
        this.countryEl,
        "change",
        Shopify.bind(this.countryHandler, this)
      ),
      this.initCountry(),
      this.initProvince();
  }),
  (Shopify.CountryProvinceSelector.prototype = {
    initCountry: function () {
      var value = this.countryEl.getAttribute("data-default");
      Shopify.setSelectorByValue(this.countryEl, value), this.countryHandler();
    },
    initProvince: function () {
      var value = this.provinceEl.getAttribute("data-default");
      value &&
        this.provinceEl.options.length > 0 &&
        Shopify.setSelectorByValue(this.provinceEl, value);
    },
    countryHandler: function (e) {
      var opt = this.countryEl.options[this.countryEl.selectedIndex],
        raw = opt.getAttribute("data-provinces"),
        provinces = JSON.parse(raw);
      if (
        (this.clearOptions(this.provinceEl), provinces && provinces.length == 0)
      )
        this.provinceContainer.style.display = "none";
      else {
        for (var i = 0; i < provinces.length; i++) {
          var opt = document.createElement("option");
          (opt.value = provinces[i][0]),
            (opt.innerHTML = provinces[i][1]),
            this.provinceEl.appendChild(opt);
        }
        this.provinceContainer.style.display = "";
      }
    },
    clearOptions: function (selector) {
      for (; selector.firstChild; ) selector.removeChild(selector.firstChild);
    },
    setOptions: function (selector, values) {
      for (var i = 0, count = values.length; i < values.length; i++) {
        var opt = document.createElement("option");
        (opt.value = values[i]),
          (opt.innerHTML = values[i]),
          selector.appendChild(opt);
      }
    },
  });
class VariantSelects extends HTMLElement {
  constructor() {
    super(), this.addEventListener("change", this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions(),
      this.updateMasterId(),
      this.toggleAddButton(!0, "", !1);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (variant) =>
        !variant.options
          .map((option, index) => this.options[index] === option)
          .includes(!1)
    );
  }
  toggleAddButton(disable = !0, text, modifyClass = !0) {
    const productForm = document.getElementById(
      `product-form-${this.dataset.section}`
    );
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]'),
      addButtonText = productForm.querySelector('[name="add"] > span');
    addButton &&
      (disable
        ? (addButton.setAttribute("disabled", "disabled"),
          text && (addButtonText.textContent = text))
        : (addButton.removeAttribute("disabled"),
          (addButtonText.textContent = window.variantStrings.addToCart)));
  }
  setUnavailable() {
    const button = document.getElementById(
        `product-form-${this.dataset.section}`
      ),
      addButton = button.querySelector('[name="add"]'),
      addButtonText = button.querySelector('[name="add"] > span'),
      price = document.getElementById(`price-${this.dataset.section}`);
    addButton &&
      ((addButtonText.textContent = window.variantStrings.unavailable),
      price && price.classList.add("visibility-hidden"));
  }
  getVariantData() {
    return (
      (this.variantData =
        this.variantData ||
        JSON.parse(
          this.querySelector('[type="application/json"]').textContent
        )),
      this.variantData
    );
  }
}
customElements.define("variant-selects", VariantSelects);
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }
  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll("fieldset"));
    this.options = fieldsets.map(
      (fieldset) =>
        Array.from(fieldset.querySelectorAll("input")).find(
          (radio) => radio.checked
        ).value
    );
  }
}
customElements.define("variant-radios", VariantRadios);
