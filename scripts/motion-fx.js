/*!
 * Meyar Almoallem (معيار المعلم) — homepage motion layer
 * Built on Motion (scripts/vendor/motion.min.js, MIT). Progressive
 * enhancement only: the inline <head> script adds .motion-ready when the
 * visitor has no reduced-motion preference; if anything here fails, the
 * class is removed and main.js falls back to its CSS reveal animations.
 */
(function () {
  "use strict";

  var html = document.documentElement;
  var M = window.Motion;

  if (!html.classList.contains("motion-ready")) {
    return;
  }
  if (!M) {
    html.classList.remove("motion-ready");
    return;
  }

  var animate = M.animate;
  var inView = M.inView;
  var scroll = M.scroll;
  var stagger = M.stagger;
  var hover = M.hover;
  var press = M.press;

  var EASE_OUT = [0.22, 1, 0.36, 1];
  var SPRING = { type: "spring", bounce: 0.28, duration: 0.9 };
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /* ------------------------------------------------------------ */
  /* Hero entrance                                                 */
  /* ------------------------------------------------------------ */

  function heroEntrance() {
    var copy = $$(".hero-eyebrow, .hero h1, .hero p.lede, .hero-actions, .hero-trust");
    animate(copy, { opacity: [0, 1], y: [28, 0] }, { duration: 0.8, ease: EASE_OUT, delay: stagger(0.09) });

    var media = $(".hero-media");
    if (media) {
      animate(media, { opacity: [0, 1], y: [70, 0], scale: [0.94, 1] }, Object.assign({ delay: 0.15 }, SPRING));
    }

    $$(".hero-chip").forEach(function (chip, i) {
      animate(chip, { opacity: [0, 1], scale: [0.6, 1] }, { type: "spring", bounce: 0.45, duration: 0.8, delay: 0.75 + i * 0.18 }).then(
        function () {
          // Gentle idle float once the chip has landed.
          animate(chip, { y: [0, -10, 0] }, { duration: 6, ease: "easeInOut", repeat: Infinity, delay: i * 1.5 });
        }
      );
    });

    var stats = $(".stats-grid");
    if (stats) {
      animate(stats, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, ease: EASE_OUT, delay: 0.55 });
    }
  }

  /* ------------------------------------------------------------ */
  /* Scroll-linked effects                                         */
  /* ------------------------------------------------------------ */

  function scrollEffects() {
    // Reading-progress bar along the top edge.
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    scroll(animate(bar, { scaleX: [0, 1] }, { ease: "linear" }));

    // Header picks up a shadow once the page leaves the top.
    var header = $(".site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Hero depth: phone drifts slower than the page, copy fades away.
    var hero = $(".hero");
    var banner = $(".hero-banner");
    var heroCopy = $(".hero-copy");
    var glow = $(".hero-glow");
    if (hero && banner) {
      var heroRange = { target: hero, offset: ["start start", "end start"] };
      scroll(animate(banner, { y: [0, 90] }, { ease: "linear" }), heroRange);
      if (heroCopy) {
        scroll(animate(heroCopy, { opacity: [1, 0.15], y: [0, -50] }, { ease: "linear" }), heroRange);
      }
      if (glow) {
        scroll(animate(glow, { scale: [1, 1.35], opacity: [1, 0.4] }, { ease: "linear" }), heroRange);
      }
    }

    // Screenshots float through their panels as they cross the viewport.
    $$(".gallery-item").forEach(function (item) {
      var img = $("img", item);
      if (!img) {
        return;
      }
      scroll(animate(img, { y: [14, -14] }, { ease: "linear" }), {
        target: item,
        offset: ["start end", "end start"]
      });
    });
  }

  /* ------------------------------------------------------------ */
  /* Scroll reveals — elements entering together share a stagger   */
  /* ------------------------------------------------------------ */

  function reveals() {
    var queue = [];
    var scheduled = false;

    function flush() {
      scheduled = false;
      var batch = queue;
      queue = [];
      animate(batch, { opacity: [0, 1], y: [36, 0] }, { duration: 0.75, ease: EASE_OUT, delay: stagger(0.07) });

      batch.forEach(function (el, i) {
        var num = $(".step-num", el);
        if (num) {
          animate(num, { scale: [0, 1], rotate: [-90, 0] }, { type: "spring", bounce: 0.5, duration: 0.9, delay: 0.2 + i * 0.07 });
        }
      });
    }

    $$(".reveal").forEach(function (el) {
      inView(
        el,
        function () {
          queue.push(el);
          if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(flush);
          }
        },
        { amount: 0.15, margin: "0px 0px -40px 0px" }
      );
    });
  }

  /* ------------------------------------------------------------ */
  /* Stat counters                                                 */
  /* ------------------------------------------------------------ */

  function counters() {
    $$(".stat dd").forEach(function (dd) {
      var match = /^(\d+)(.*)$/.exec(dd.textContent.trim());
      if (!match) {
        return;
      }
      var target = parseInt(match[1], 10);
      var suffix = match[2];
      dd.textContent = "0" + suffix;
      inView(
        dd,
        function () {
          animate(0, target, {
            duration: target > 20 ? 1.6 : 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.6,
            onUpdate: function (v) {
              dd.textContent = Math.round(v) + suffix;
            }
          });
        },
        { amount: 0.6 }
      );
    });
  }

  /* ------------------------------------------------------------ */
  /* Pointer interactions                                          */
  /* ------------------------------------------------------------ */

  function interactions() {
    // Tactile press on every button.
    press(".btn, .store-btn", function (el) {
      animate(el, { scale: 0.96 }, { type: "spring", stiffness: 700, damping: 30 });
      return function () {
        animate(el, { scale: 1 }, { type: "spring", stiffness: 500, damping: 20 });
      };
    });

    if (!canHover) {
      return;
    }

    // Feature/why cards: icon lifts, a soft spotlight follows the cursor.
    hover(".feature-card, .why-card, .step", function (card) {
      var icon = $(".feature-icon, .why-icon", card);
      if (icon) {
        animate(icon, { y: -4, scale: 1.08 }, { type: "spring", stiffness: 400, damping: 18 });
      }
      var move = function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      };
      card.addEventListener("pointermove", move);
      return function () {
        card.removeEventListener("pointermove", move);
        if (icon) {
          animate(icon, { y: 0, scale: 1 }, { type: "spring", stiffness: 400, damping: 22 });
        }
      };
    });

    // Screenshots tilt toward the cursor in 3D.
    hover(".gallery-item", function (item) {
      var pic = $("picture", item);
      if (!pic) {
        return;
      }
      var move = function (e) {
        var r = item.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        animate(pic, { rotateY: px * 14, rotateX: -py * 10, transformPerspective: 900 }, { type: "spring", stiffness: 260, damping: 24 });
      };
      item.addEventListener("pointermove", move);
      return function () {
        item.removeEventListener("pointermove", move);
        animate(pic, { rotateY: 0, rotateX: 0 }, { type: "spring", stiffness: 200, damping: 20 });
      };
    });

    // Hero phone leans slightly with the cursor across the hero.
    var hero = $(".hero");
    var media = $(".hero-banner picture");
    if (hero && media) {
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        animate(media, { rotateY: px * 10, rotateX: -py * 6, transformPerspective: 1200 }, { type: "spring", stiffness: 120, damping: 20 });
      });
      hero.addEventListener("pointerleave", function () {
        animate(media, { rotateY: 0, rotateX: 0 }, { type: "spring", stiffness: 120, damping: 20 });
      });
    }
  }

  try {
    heroEntrance();
    reveals();
    counters();
    scrollEffects();
    interactions();
  } catch (err) {
    // Never leave content hidden: hand control back to the CSS fallback.
    html.classList.remove("motion-ready");
    $$(".hero-media, .hero-chip, .stats-grid, .hero-eyebrow, .hero h1, .hero p.lede, .hero-actions, .hero-trust").forEach(function (el) {
      el.style.opacity = "";
    });
    if (window.console) {
      console.error("motion-fx:", err);
    }
  }
})();
