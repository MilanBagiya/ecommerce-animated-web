let tlCounter = gsap.timeline({});
let counter = { value: 0.5 };

let progress_bar = document.querySelector(".preloader-line"),
  logo_bar = document.querySelector(".logo-bar"),
  logo_bar_mob = document.querySelector(".logo-bar-mob"),
  bt_bar_3 = document.querySelector(".bt_bar_3"),
  bt_bar_4 = document.querySelector(".bt_bar_4"),
  header_text = document.querySelector(".animate-header-text"),
  bt_openmenu = document.querySelector(".menu-new__bt-burger"),
  footer_menu = document.querySelector("#footer-menu"),
  announcement_bar = document.querySelector(".announcement-bar"),
  scroller_section = document.querySelector("#scroller-section");

let lottie_sensivity = 14e3,
  lottie_sensivity2 = 2860,
  scroll_loop_once = !0,
  progress_path2,
  imageWidthCurrent = 250,
  imageHeightCurrent = 3460 / 14.4;
window.screen.width <= 479 &&
  ((imageWidthCurrent = 500), (imageHeightCurrent = 3460 / 3.6 / 2));

window.onload = () => {
  lottie_load(),
    tlCounter.to(counter, {
      value: 0,
      duration: 2,
      ease: Power1.easeOut,
      onComplete: function () {
        tlCounter.to(".announcement-bar", {
          opacity: 1,
          duration: 1,
          ease: "slow(0.5, 0.8, true)",
        });

        tlCounter.to(scroller_section, {
          opacity: 1,
        });
      },
    });
};
function lottie_load() {
  progress_bar.setAttribute(
    "style",
    "transition-duration: 300ms, 300ms !important;"
  );
  progress_bar.style.width = "100%";
  progress_bar.style.height = "0px";
  header_text.style.transform = "translate(0vh)";
  window.screen.width > 479
    ? (logo_bar.style.transform = "translate(0vh) scale(1)")
    : (logo_bar_mob.style.transform = "translate(0vh) scale(1)"),
    setTimeout(() => {
      bt_bar_3.style.opacity = "100";
      bt_openmenu.style.opacity = "100";
      footer_menu.style.opacity = "100";
    }, 1000);
}

progress_bar.style.width = "70%";
