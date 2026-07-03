/*!
 * Meyar Almoallem (معيار المعلم) — marketing site behaviour
 * Vanilla JS, no dependencies, no build step.
 */
(function () {
  "use strict";

  var LANG_KEY = "meyarm-lang";
  var html = document.documentElement;

  /* ------------------------------------------------------------ */
  /* Language toggle (AR default, matches the app's forced RTL)   */
  /* ------------------------------------------------------------ */

  function applyLang(lang) {
    var isAr = lang === "ar";
    html.lang = isAr ? "ar" : "en";
    html.dir = isAr ? "rtl" : "ltr";
    html.setAttribute("data-lang", isAr ? "ar" : "en");

    var title = html.getAttribute(isAr ? "data-title-ar" : "data-title-en");
    if (title) {
      document.title = title;
    }

    var metaDesc = document.querySelector('meta[name="description"]');
    var desc = html.getAttribute(isAr ? "data-desc-ar" : "data-desc-en");
    if (metaDesc && desc) {
      metaDesc.setAttribute("content", desc);
    }

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.textContent = isAr ? "English" : "العربية";
      btn.setAttribute("aria-label", isAr ? "Switch to English" : "التبديل إلى العربية");
    });

    document.querySelectorAll("[data-placeholder-ar]").forEach(function (field) {
      var placeholder = field.getAttribute(isAr ? "data-placeholder-ar" : "data-placeholder-en");
      if (placeholder) {
        field.setAttribute("placeholder", placeholder);
      }
    });
  }

  function initLang() {
    var stored = null;
    try {
      stored = localStorage.getItem(LANG_KEY);
    } catch (e) {
      /* localStorage unavailable (private mode) — fall back to default */
    }
    applyLang(stored === "en" ? "en" : "ar");

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = html.getAttribute("data-lang") === "ar" ? "en" : "ar";
        applyLang(next);
        try {
          localStorage.setItem(LANG_KEY, next);
        } catch (e) {
          /* ignore persistence failure */
        }
      });
    });
  }

  /* ------------------------------------------------------------ */
  /* Mobile nav toggle                                             */
  /* ------------------------------------------------------------ */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) {
        return;
      }
      if (nav.contains(event.target) || toggle.contains(event.target)) {
        return;
      }
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  /* ------------------------------------------------------------ */
  /* Footer year                                                   */
  /* ------------------------------------------------------------ */

  function initYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------ */
  /* Highlight active nav link based on current path                */
  /* ------------------------------------------------------------ */

  function initActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ------------------------------------------------------------ */
  /* Scroll-reveal animations                                      */
  /* ------------------------------------------------------------ */

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) {
      return;
    }
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el, index) {
      el.style.setProperty("--reveal-delay", Math.min(index % 4, 3) * 0.08 + "s");
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------ */
  /* Screenshot gallery lightbox                                   */
  /* ------------------------------------------------------------ */

  function initLightbox() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox-trigger]"));
    var lightbox = document.getElementById("lightbox");
    if (!triggers.length || !lightbox) {
      return;
    }

    var imgEl = lightbox.querySelector(".lightbox-inner img");
    var captionEl = lightbox.querySelector(".lightbox-caption");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-nav.prev");
    var nextBtn = lightbox.querySelector(".lightbox-nav.next");
    var currentIndex = 0;
    var lastFocused = null;

    function show(index) {
      currentIndex = (index + triggers.length) % triggers.length;
      var trigger = triggers[currentIndex];
      var src = trigger.getAttribute("data-full") || trigger.querySelector("img").src;
      var captionAr = trigger.getAttribute("data-caption-ar") || "";
      var captionEn = trigger.getAttribute("data-caption-en") || "";
      imgEl.src = src;
      imgEl.alt = trigger.querySelector("img").alt || "";
      var isAr = html.getAttribute("data-lang") !== "en";
      captionEl.textContent = isAr ? captionAr : captionEn;
    }

    function open(index) {
      lastFocused = document.activeElement;
      show(index);
      lightbox.classList.add("is-open");
      lightbox.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("hidden", "");
      document.body.style.overflow = "";
      if (lastFocused) {
        lastFocused.focus();
      }
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener("click", function () {
        open(index);
      });
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () {
      show(currentIndex - 1);
    });
    nextBtn.addEventListener("click", function () {
      show(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        show(html.dir === "rtl" ? currentIndex - 1 : currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        show(html.dir === "rtl" ? currentIndex + 1 : currentIndex - 1);
      } else if (event.key === "Tab") {
        // Trap focus inside the dialog: only close/prev/next are reachable.
        var focusable = [prevBtn, nextBtn, closeBtn];
        var currentPos = focusable.indexOf(document.activeElement);
        event.preventDefault();
        var nextPos = event.shiftKey
          ? (currentPos - 1 + focusable.length) % focusable.length
          : (currentPos + 1) % focusable.length;
        focusable[nextPos < 0 ? 0 : nextPos].focus();
      }
    });
  }

  /* ------------------------------------------------------------ */
  /* Legal page: sticky sidebar active-section highlight            */
  /* ------------------------------------------------------------ */

  function initLegalActiveToc() {
    var article = document.querySelector(".legal-article");
    var tocLinks = document.querySelectorAll(".legal-toc a[href^='#']");
    if (!article || !tocLinks.length || !("IntersectionObserver" in window)) {
      return;
    }

    var sections = article.querySelectorAll("section[id]");
    var linkBySection = {};
    tocLinks.forEach(function (link) {
      linkBySection[link.getAttribute("href").slice(1)] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkBySection[entry.target.id];
          if (!link) {
            return;
          }
          if (entry.isIntersecting) {
            tocLinks.forEach(function (l) {
              l.classList.remove("is-active");
            });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------ */
  /* Legal page: in-page search with highlight + prev/next          */
  /* ------------------------------------------------------------ */

  function initLegalSearch() {
    var input = document.getElementById("legal-search-input");
    var article = document.querySelector(".legal-article");
    var statusEl = document.getElementById("legal-search-status");
    var prevBtn = document.getElementById("legal-search-prev");
    var nextBtn = document.getElementById("legal-search-next");
    var tocItems = document.querySelectorAll(".legal-toc li");
    if (!input || !article) {
      return;
    }

    var marks = [];
    var currentMatch = -1;

    function clearMarks() {
      article.querySelectorAll("mark[data-search-mark]").forEach(function (mark) {
        var parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
      marks = [];
      currentMatch = -1;
    }

    function resetSectionVisibility() {
      article.querySelectorAll("section[id]").forEach(function (section) {
        section.hidden = false;
      });
      tocItems.forEach(function (li) {
        li.hidden = false;
      });
    }

    function walkAndHighlight(root, regex) {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var textNodes = [];
      var node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && node.parentElement.closest("script,style")) {
          continue;
        }
        if (regex.test(node.nodeValue)) {
          textNodes.push(node);
        }
        regex.lastIndex = 0;
      }
      textNodes.forEach(function (textNode) {
        var text = textNode.nodeValue;
        var frag = document.createDocumentFragment();
        var lastIndex = 0;
        var match;
        regex.lastIndex = 0;
        while ((match = regex.exec(text))) {
          if (match.index > lastIndex) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
          }
          var mark = document.createElement("mark");
          mark.setAttribute("data-search-mark", "");
          mark.textContent = match[0];
          frag.appendChild(mark);
          marks.push(mark);
          lastIndex = match.index + match[0].length;
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        textNode.parentNode.replaceChild(frag, textNode);
      });
    }

    function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function goToMatch(index) {
      if (!marks.length) {
        return;
      }
      if (currentMatch >= 0 && marks[currentMatch]) {
        marks[currentMatch].classList.remove("is-current");
      }
      currentMatch = (index + marks.length) % marks.length;
      var mark = marks[currentMatch];
      mark.classList.add("is-current");
      mark.scrollIntoView({ behavior: "smooth", block: "center" });
      updateStatus();
    }

    function updateStatus() {
      var isAr = html.getAttribute("data-lang") !== "en";
      if (!marks.length) {
        statusEl.textContent = input.value.trim()
          ? isAr
            ? "لا نتائج"
            : "No results"
          : "";
        return;
      }
      var pos = currentMatch + 1;
      statusEl.textContent = isAr ? pos + " من " + marks.length : pos + " of " + marks.length;
    }

    function runSearch() {
      clearMarks();
      resetSectionVisibility();
      var query = input.value.trim();
      if (query.length < 2) {
        updateStatus();
        return;
      }
      var regex = new RegExp(escapeRegExp(query), "gi");
      walkAndHighlight(article, regex);

      article.querySelectorAll("section[id]").forEach(function (section) {
        var hasMatch = section.querySelector("mark[data-search-mark]");
        section.hidden = !hasMatch;
        var tocLink = document.querySelector('.legal-toc a[href="#' + section.id + '"]');
        if (tocLink) {
          tocLink.closest("li").hidden = !hasMatch;
        }
      });

      if (marks.length) {
        goToMatch(0);
      } else {
        updateStatus();
      }
    }

    var debounceTimer;
    input.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runSearch, 200);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        goToMatch(currentMatch + (event.shiftKey ? -1 : 1));
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goToMatch(currentMatch - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goToMatch(currentMatch + 1);
      });
    }
  }

  /* ------------------------------------------------------------ */
  /* Copy-to-clipboard buttons (e.g. support email)                 */
  /* ------------------------------------------------------------ */

  function initCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      var value = btn.getAttribute("data-copy") || "";
      var resetTimer;

      btn.addEventListener("click", function () {
        var done = function () {
          clearTimeout(resetTimer);
          btn.classList.add("is-copied");
          btn.disabled = true;
          resetTimer = setTimeout(function () {
            btn.classList.remove("is-copied");
            btn.disabled = false;
          }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(done, done);
        } else {
          var temp = document.createElement("textarea");
          temp.value = value;
          temp.style.position = "fixed";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.select();
          try {
            document.execCommand("copy");
          } catch (e) {
            /* clipboard unavailable — ignore */
          }
          document.body.removeChild(temp);
          done();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initNav();
    initYear();
    initActiveNav();
    initReveal();
    initLightbox();
    initLegalActiveToc();
    initLegalSearch();
    initCopyButtons();
  });
})();
