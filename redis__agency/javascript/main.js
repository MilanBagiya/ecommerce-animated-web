var popupIsOpen = false;
let tlCounter = gsap.timeline({});

const openPopup = document.querySelectorAll('[popup="open"]');
const closePopup = document.querySelectorAll('[popup="close"]');

let progress_bar = document.querySelector(".preloader-line"),
  logo_bar = document.querySelector(".logo-bar"),
  logo_bar_mob = document.querySelector(".logo-bar-mob"),
  header_text = document.querySelector(".animate-header-text"),
  redis_img = document.querySelector(".lottie-container"),
  bt_openmenu = document.querySelector(".menu-new__bt-burger");

let lottie_target = document.querySelector("#target-lottie"),
  lottie_sensivity = 14e3,
  lottie_sensivity2 = 2860,
  scroll_loop_once = !0,
  a = "https://uploads-ssl.webflow.com/6266eeaffe48d61a4d9852b0/",
  b = "_redis_team-",
  progress_path2,
  imageWidthCurrent = 250,
  imageHeightCurrent = 3460 / 14.4;
window.screen.width <= 479 &&
  ((imageWidthCurrent = 500), (imageHeightCurrent = 3460 / 3.6 / 2));

let counter = { value: 0.5 };

openPopup.forEach((el) => {
  el.addEventListener("click", function () {
    popupIsOpen = true;
  });
});

closePopup.forEach((el) => {
  el.addEventListener("click", function () {
    popupIsOpen = false;
  });
});

window.onload = () => {
  lottie_load(),
    tlCounter.to(counter, {
      value: 0,
      duration: 4,
      ease: Power1.easeOut,
      onUpdate: counterChange,
    });
};

function counterChange() {
  progress_path2 = Math.abs(
    (scroller_4.y % lottie_sensivity2) / lottie_sensivity2 + counter.value
  );
}

function lerp(e, r, t) {
  return e * (1 - t) + r * t;
}

let lerpProgress = 0,
  prevFrame = 0;
gsap.registerPlugin(ScrollTrigger);

const rows = 10,
  columns = 10,
  missingImages = 0,
  frame_count = 99,
  imageWidth = imageWidthCurrent,
  imageHeight = imageHeightCurrent,
  horizDiff = imageWidth / 10,
  vertDiff = imageHeight / 10;

gsap.set(lottie_target, { width: horizDiff + "vw", height: vertDiff + "vw" });

const setPos = gsap.quickSetter(lottie_target, "background-position"),
  obj = { num: 0 };

let baseTimeLine = gsap.timeline();

baseTimeLine.to(obj, {
  num: 99,
  ease: "steps(99)",
  duration: 2,
  repeat: 2,
  onUpdate: () =>
    setPos(`
    ${-Math.abs((obj.num % 10) * horizDiff)}vw
    ${-Math.abs(Math.floor(obj.num / 10) * vertDiff)}vw
  `),
});

gsap.registerPlugin(MotionPathPlugin);
var path_tween = gsap.to(".lottie-wrapper", {
  ease: "linear",
  motionPath: { path: "#path", align: "#path", alignOrigin: [0.5, 0.5] },
});
let scroll_wrapper_1 = document.getElementsByClassName("global-wrapper")[0],
  scroll_wrapper_2 = document.getElementsByClassName("image__container")[0],
  scroll_wrapper_3 = document.getElementsByClassName("image__container")[0],
  target_1 = document.getElementById("target"),
  windowHeight_1 = scroll_wrapper_1.clientHeight,
  windowInnerHeight = window.innerHeight,
  newScrollY = 0;
if (window.screen.width > 479) {
  window.addEventListener("resize", check_device);
  var scroller_1 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.15,
      speed: 0,
      y: 0,
    },
    scroller_2 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.12,
      speed: 0,
      y: 0,
    },
    scroller_3 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.1,
      speed: 0,
      y: 0,
    },
    scroller_4 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.18,
      speed: 0,
      y: 0,
    };
} else
  var scroller_1 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.04,
      speed: 0,
      y: 0,
    },
    scroller_2 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.045,
      speed: 0,
      y: 0,
    },
    scroller_3 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.05,
      speed: 0,
      y: 0,
    },
    scroller_4 = {
      wheelMultiplier: getLineHeight(),
      ease: 0.055,
      speed: 0,
      y: 0,
    };

let touch_up = 0,
  touch_down = 0,
  touch_path = 0,
  touch_speed = 0.05,
  touch_inertia = 0,
  point_click = !1,
  first_click = !1;

function pointer_move(e) {
  if (popupIsOpen === false) {
    if (((touch_up = e.touches[0].clientY), !0 == point_click)) {
      if (!0 == first_click) {
        let r =
          0.07 * Math.pow(Math.abs((touch_path = touch_up - touch_down)), 1.05);
        r > 0.5
          ? ((scroller_1.speed -=
              touch_path * scroller_1.wheelMultiplier * touch_speed * r),
            (scroller_2.speed -=
              touch_path * scroller_2.wheelMultiplier * touch_speed * r),
            (scroller_3.speed -=
              touch_path * scroller_3.wheelMultiplier * touch_speed * r),
            (scroller_4.speed -=
              touch_path * scroller_4.wheelMultiplier * touch_speed * r))
          : ((scroller_1.speed -=
              touch_path * scroller_1.wheelMultiplier * touch_speed),
            (scroller_2.speed -=
              touch_path * scroller_2.wheelMultiplier * touch_speed),
            (scroller_3.speed -=
              touch_path * scroller_3.wheelMultiplier * touch_speed),
            (scroller_4.speed -=
              touch_path * scroller_4.wheelMultiplier * touch_speed));
      }
      first_click = !0;
    }
    touch_down = e.touches[0].clientY;
  }
}
function point_down() {
  Math.abs(scroller_1.speed) > 1 &&
    ((scroller_1.speed = 0),
    (scroller_2.speed = 0),
    (scroller_3.speed = 0),
    (scroller_4.speed = 0)),
    (point_click = !0);
}
function point_cancel() {
  (point_click = !1), (first_click = !1);
}
function onWheel(e) {
  if (popupIsOpen === false) {
    var r,
      t = e.wheelDelta;
    (r = t ? (t = e.deltaY || e.detail || 0) / 120 : t / 120),
      (scroller_1.speed += r * scroller_1.wheelMultiplier),
      (scroller_2.speed += r * scroller_2.wheelMultiplier),
      (scroller_3.speed += r * scroller_3.wheelMultiplier),
      (scroller_4.speed += r * scroller_4.wheelMultiplier);
  }
}
function getLineHeight() {
  var e = document.createElement("div");
  (e.style["font-size"] = "128ex"), document.body.appendChild(e);
  var r = getComputedStyle(e).getPropertyValue("font-size"),
    t = parseFloat(r, 10) / 128;
  return document.body.removeChild(e), t;
}
function onFrame() {
  (scroller_1.speed += -this.scroller_1.speed * this.scroller_1.ease),
    (scroller_2.speed += -this.scroller_2.speed * this.scroller_2.ease),
    (scroller_3.speed += -this.scroller_3.speed * this.scroller_3.ease),
    (scroller_4.speed += -this.scroller_4.speed * this.scroller_4.ease),
    (scroller_1.y -= Math.round(1e3 * scroller_1.speed) / 1e3),
    (scroller_2.y -= Math.round(1e3 * scroller_2.speed) / 1e3),
    (scroller_3.y -= Math.round(1e3 * scroller_3.speed) / 1e3);
  var e = scroller_1.y % windowHeight_1;

  e !== newScrollY &&
    (TweenLite.set(target_1, { rotate: 0.01, y: e, force3D: !0 }),
    (e = scroller_1.y));
  let s = Math.abs((scroller_4.y % lottie_sensivity) / lottie_sensivity);
  (lerpProgress = lerp(
    prevFrame,
    (progress_path2 = Math.abs(
      (scroller_4.y % lottie_sensivity2) / lottie_sensivity2 + counter.value
    )),
    0.01
  )),
    (prevFrame = progress_path2),
    baseTimeLine.progress(lerpProgress),
    path_tween.progress(s);
  let c = Math.cos(5e-4 * scroller_4.y);
  (lottie_target.style.transform = "rotate(" + 30 * c + "deg)"),
    window.requestAnimationFrame(onFrame);
}

onFrame();

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
      bt_openmenu.style.opacity = "100";
    }, 500),
    setTimeout(() => {
      (redis_img.style.transform = "translate(0vh) rotate(-33deg)"),
        window.addEventListener("touchstart", point_down),
        window.addEventListener("touchend", point_cancel),
        window.addEventListener("touchmove", pointer_move),
        window.addEventListener("wheel", onWheel);
    }, 700);
}

function check_device() {
  document.location.reload();
}
progress_bar.style.width = "70%";

const pageTransition = document.querySelector(".transition");
