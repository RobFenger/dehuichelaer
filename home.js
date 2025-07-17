//swipe-function for mobile
!(function (t, e) {
  "use strict";
  "function" != typeof t.CustomEvent &&
    ((t.CustomEvent = function (t, n) {
      n = n || { bubbles: !1, cancelable: !1, detail: void 0 };
      var a = e.createEvent("CustomEvent");
      return a.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), a;
    }),
    (t.CustomEvent.prototype = t.Event.prototype)),
    e.addEventListener(
      "touchstart",
      function (t) {
        if ("true" === t.target.getAttribute("data-swipe-ignore")) return;
        (s = t.target),
          (r = Date.now()),
          (n = t.touches[0].clientX),
          (a = t.touches[0].clientY),
          (u = 0),
          (i = 0);
      },
      !1
    ),
    e.addEventListener(
      "touchmove",
      function (t) {
        if (!n || !a) return;
        var e = t.touches[0].clientX,
          r = t.touches[0].clientY;
        (u = n - e), (i = a - r);
      },
      !1
    ),
    e.addEventListener(
      "touchend",
      function (t) {
        if (s !== t.target) return;
        var e = parseInt(l(s, "data-swipe-threshold", "20"), 10),
          o = parseInt(l(s, "data-swipe-timeout", "500"), 10),
          c = Date.now() - r,
          d = "",
          p = t.changedTouches || t.touches || [];
        Math.abs(u) > Math.abs(i)
          ? Math.abs(u) > e &&
            c < o &&
            (d = u > 0 ? "swiped-left" : "swiped-right")
          : Math.abs(i) > e &&
            c < o &&
            (d = i > 0 ? "swiped-up" : "swiped-down");
        if ("" !== d) {
          var b = {
            dir: d.replace(/swiped-/, ""),
            touchType: (p[0] || {}).touchType || "direct",
            xStart: parseInt(n, 10),
            xEnd: parseInt((p[0] || {}).clientX || -1, 10),
            yStart: parseInt(a, 10),
            yEnd: parseInt((p[0] || {}).clientY || -1, 10),
          };
          s.dispatchEvent(
            new CustomEvent("swiped", {
              bubbles: !0,
              cancelable: !0,
              detail: b,
            })
          ),
            s.dispatchEvent(
              new CustomEvent(d, { bubbles: !0, cancelable: !0, detail: b })
            );
        }
        (n = null), (a = null), (r = null);
      },
      !1
    );
  var n = null,
    a = null,
    u = null,
    i = null,
    r = null,
    s = null;
  function l(t, n, a) {
    for (; t && t !== e.documentElement; ) {
      var u = t.getAttribute(n);
      if (u) return u;
      t = t.parentNode;
    }
    return a;
  }
})(window, document);

const box = document.getElementById("box");

window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY;
  const scrollFraction = scrollTop / maxScroll;

  const maxRotation = 720;
  const rotation = scrollFraction * maxRotation;

  box.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
});

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");

let cardsWithIndex = [];
let dotsWithIndex = [];

function updateCards(upOrDown) {
  if (upOrDown != "up" && upOrDown != "down") {
    // init cardsWithIndex
    cardsWithIndex = Array.from(cards).map((card, index) => {
      return { card, index };
    });

    //init dotsWithIndex
    dotsWithIndex = Array.from(dots).map((dot, index) => {
      return { dot, index };
    });
  }

  updateDots(upOrDown);

  cardsWithIndex = cardsWithIndex.map(({ card, index }) => {
    if (upOrDown == "up") {
      index += 1;
    } else if (upOrDown == "down") {
      index -= 1;
    }

    if (index == cards.length) {
      index = 0;
    } else if (index == -1) {
      index = cards.length - 1;
    }

    const leftPosition = index * (100 / 3) + "%";
    card.style.left = leftPosition;

    card.classList.remove("active");

    if (index == 1) {
      card.classList.add("active");
    }

    return { card, index };
  });
}

function updateDots(upOrDown) {
  dotsWithIndex = dotsWithIndex.map(({ dot, index }) => {
    if (upOrDown == "up") {
      index -= 1;
    } else if (upOrDown == "down") {
      index += 1;
    }

    if (index == dots.length) {
      index = 0;
    } else if (index == -1) {
      index = dots.length - 1;
    }

    dot.classList.remove("active");

    if (index == 0) {
      dot.classList.add("active");
    }

    return { dot, index };
  });
}

function nextSlide() {
  updateCards("up");
}

function prevSlide() {
  updateCards("down");
}

// Initialiseer de actieve kaart bij laden
updateCards();

const sliderContainer = document.querySelector(".slider-container");

sliderContainer.addEventListener("swiped-right", nextSlide);
sliderContainer.addEventListener("swiped-left", prevSlide);

// --------------------- animation trigger

/*Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
$(document).ready(function () {
  //window and animation items
  var animation_elements = $.find(".animation-element");
  var web_window = $(window);

  //check to see if any animation containers are currently in view
  function check_if_in_view() {
    //get current window information
    var window_height = web_window.height();
    var window_top_position = web_window.scrollTop();
    var window_bottom_position = window_top_position + window_height;

    //iterate through elements to see if its in view
    $.each(animation_elements, function () {
      //get the element sinformation
      var element = $(this);
      var element_height = $(element).outerHeight();
      var element_top_position = $(element).offset().top;
      var element_bottom_position = element_top_position + element_height;

      //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
      if (
        element_bottom_position >= window_top_position &&
        element_top_position <= window_bottom_position
      ) {
        element.addClass("in-view");
      } else {
        element.removeClass("in-view");
      }
    });
  }

  //on or scroll, detect elements in view
  $(window).on("scroll resize", function () {
    check_if_in_view();
  });
  //trigger our scroll event on initial load
  $(window).trigger("scroll");
});

// translations
const translations = {
  en: {
    titleOne: "FIGHTER FOR THE\u00A0",
    titleTwo: "LOST CAUSE",
    descriptionOne: `The soul of the city is being wiped away by big capital and well-known trendy concepts. Especially in new residential areas, there is no longer any space for small, local entrepreneurs.`,
    descriptionTwo: `Support the small local entrepreneur by signing the petition or ordering a poster of your favorite non-existent toko.`,
    petition: `SIGN THE PETITION`,
    why: "WHY?",
    standUp: `The Huichelaar rises up for the cause that brings a neighborhood to life,
    connects people, and dares to break the monotony. We are putting pressure on municipalities and developers to lower rents for authentic entrepreneurs and are offering free campaign materials to those who truly want to contribute something that is needed. And for that, we need your help, fighter.`,
    emailNote: `We only use your email address to confirm your signature<br/>(and you will not receive a confirmation email)`,
    lostBusiness: `MEET THE <br/> LOST BUSINESSES`,
    become: `Become a Huichelaar yourself and order a poster of a non-existent toko or a T-shirt!`,
  },
  nl: {
    titleOne: "VECHTER VOOR DE\u00A0",
    titleTwo: "VERLOREN ZAAK",
    descriptionOne: `De ziel van de stad wordt weggevaagd door groot kapitaal en bekende
    trendy concepten. Zeker in nieuwbouwwijken is inmiddels geen ruimte
    meer voor kleine, lokale ondernemers.`,
    descriptionTwo: `Steun de lokale kleine ondernemer door de petitie te tekenen of een
    poster te bestellen van jouw favoriete niet-bestaande toko`,
    petition: `TEKEN DE PETITIE`,
    why: "WAAROM?",
    standUp: `De Huichelaer staat op voor de zaak die een buurt laat leven,
    verbindt en de eentonigheid durft te doorbreken. We zetten druk op
    gemeente en ontwikkelaars om de huren te verlagen voor authentieke
    ondernemers, en bieden gratis campagnemateriaal aan voor wie écht iets
    wil toevoegen waar behoefte aan is. En daar hebben we jouw hulp bij
    nodig strijder.`,
    emailNote: `We gebruiken je e-mailadres alleen om je handtekening te bevestigen<br/>(en je krijgt geen bevestigingsmail)`,
    lostBusiness: `MAAK KENNIS MET DE <br />
    VERLOREN ZAKEN`,
    become: `Word ook een Huichelaar en bestel een poster van een niet-bestaande
    toko of een T-shirt!`,
  },
};

// -------------
// language selector

document.addEventListener("DOMContentLoaded", () => {
  enFlag = document.getElementById("en-flag");
  nlFlag = document.getElementById("nl-flag");

  const savedLang = localStorage.getItem("lang") || "nl";
  setLanguage(savedLang);
});

function setLanguage(lang) {
  language = lang;

  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = translations[lang][key] || `[${key}]`;
  });

  if (language == "nl") {
    nlFlag.style.display = "none";
    enFlag.style.display = "flex";
  } else {
    enFlag.style.display = "none";
    nlFlag.style.display = "flex";
  }
}

setLanguage(language);
