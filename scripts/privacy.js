/*!
 * Meyar Almoallem — Privacy Policy page behaviour (standalone, dedicated to privacy.html)
 * Vanilla JS, no dependencies, no build step. Never touches the rendered policy text,
 * only adds navigation/search/reading utilities around it.
 */
(function () {
  "use strict";

  var doc = document;

  /* ------------------------------------------------------------ */
  /* Footer year                                                   */
  /* ------------------------------------------------------------ */

  function initYear() {
    doc.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------ */
  /* Mobile nav toggle                                             */
  /* ------------------------------------------------------------ */

  function initNav() {
    var toggle = doc.querySelector(".nav-toggle");
    var nav = doc.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    doc.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  /* ------------------------------------------------------------ */
  /* Reading progress bar                                          */
  /* ------------------------------------------------------------ */

  function initProgress() {
    var bar = doc.getElementById("progress-bar");
    if (!bar) return;
    var ticking = false;

    function update() {
      var scrollTop = window.scrollY || doc.documentElement.scrollTop;
      var height = doc.documentElement.scrollHeight - doc.documentElement.clientHeight;
      var pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ------------------------------------------------------------ */
  /* Estimated reading time                                        */
  /* ------------------------------------------------------------ */

  function initReadingTime() {
    var article = doc.querySelector(".doc");
    var out = doc.getElementById("reading-time-value");
    if (!article || !out) return;
    var words = (article.textContent.match(/\S+/g) || []).length;
    var minutes = Math.max(1, Math.round(words / 200));
    var isAr = doc.documentElement.lang === "ar";
    out.textContent = isAr ? minutes + " دقيقة قراءة" : minutes + " min read";
  }

  /* ------------------------------------------------------------ */
  /* Back to top                                                   */
  /* ------------------------------------------------------------ */

  function initBackToTop() {
    var btn = doc.getElementById("back-to-top");
    if (!btn) return;
    var ticking = false;

    function update() {
      var show = (window.scrollY || doc.documentElement.scrollTop) > 480;
      btn.classList.toggle("is-visible", show);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      doc.getElementById("main").focus({ preventScroll: true });
    });
  }

  /* ------------------------------------------------------------ */
  /* Copy support email                                            */
  /* ------------------------------------------------------------ */

  function initCopyEmail() {
    var btn = doc.getElementById("btn-copy-email");
    if (!btn) return;
    var email = btn.getAttribute("data-email") || "";
    var defaultLabel = btn.querySelector(".btn-label");

    btn.addEventListener("click", function () {
      var done = function () {
        var original = defaultLabel.textContent;
        var isAr = doc.documentElement.lang === "ar";
        defaultLabel.textContent = isAr ? "تم النسخ ✓" : "Copied ✓";
        btn.disabled = true;
        setTimeout(function () {
          defaultLabel.textContent = original;
          btn.disabled = false;
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, done);
      } else {
        var temp = doc.createElement("textarea");
        temp.value = email;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        doc.body.appendChild(temp);
        temp.select();
        try {
          doc.execCommand("copy");
        } catch (e) {
          /* clipboard unavailable — ignore */
        }
        doc.body.removeChild(temp);
        done();
      }
    });
  }

  /* ------------------------------------------------------------ */
  /* Print                                                         */
  /* ------------------------------------------------------------ */

  function initPrint() {
    var btn = doc.getElementById("btn-print");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.print();
    });
  }

  /* ------------------------------------------------------------ */
  /* TOC: active-section highlight via IntersectionObserver        */
  /* ------------------------------------------------------------ */

  function initTocActive() {
    var sections = doc.querySelectorAll(".doc-section[id]");
    var tocLinks = doc.querySelectorAll(".toc-body a[href^='#']");
    if (!sections.length || !tocLinks.length || !("IntersectionObserver" in window)) return;

    var linkById = {};
    tocLinks.forEach(function (link) {
      linkById[link.getAttribute("href").slice(1)] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkById[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(function (l) {
              l.classList.remove("is-active");
            });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------ */
  /* Search panel toggle                                           */
  /* ------------------------------------------------------------ */

  function initSearchToggle() {
    var toggle = doc.getElementById("search-toggle");
    var panel = doc.getElementById("search-panel");
    var input = doc.getElementById("search-input");
    if (!toggle || !panel || !input) return;

    toggle.addEventListener("click", function () {
      var isHidden = panel.hasAttribute("hidden");
      if (isHidden) {
        panel.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        input.focus();
      } else {
        panel.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hasAttribute("hidden")) {
        panel.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
      // Slash (/) opens search from anywhere, unless typing in a field already.
      if (event.key === "/" && panel.hasAttribute("hidden")) {
        var tag = (event.target && event.target.tagName) || "";
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          event.preventDefault();
          toggle.click();
        }
      }
    });
  }

  /* ------------------------------------------------------------ */
  /* Instant search: highlight + jump, across AR and EN content     */
  /* ------------------------------------------------------------ */

  function initSearch() {
    var input = doc.getElementById("search-input");
    var article = doc.querySelector(".doc");
    var statusEl = doc.getElementById("search-status");
    var prevBtn = doc.getElementById("search-prev");
    var nextBtn = doc.getElementById("search-next");
    var closeBtn = doc.getElementById("search-close");
    if (!input || !article) return;

    var marks = [];
    var currentMatch = -1;

    function clearMarks() {
      article.querySelectorAll("mark[data-search-mark]").forEach(function (mark) {
        var parent = mark.parentNode;
        parent.replaceChild(doc.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
      marks = [];
      currentMatch = -1;
    }

    function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function walkAndHighlight(root, regex) {
      var walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var textNodes = [];
      var node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && node.parentElement.closest("script,style")) continue;
        regex.lastIndex = 0;
        if (regex.test(node.nodeValue)) textNodes.push(node);
      }
      textNodes.forEach(function (textNode) {
        var text = textNode.nodeValue;
        var frag = doc.createDocumentFragment();
        var lastIndex = 0;
        var match;
        regex.lastIndex = 0;
        while ((match = regex.exec(text))) {
          if (match.index > lastIndex) {
            frag.appendChild(doc.createTextNode(text.slice(lastIndex, match.index)));
          }
          var mark = doc.createElement("mark");
          mark.setAttribute("data-search-mark", "");
          mark.textContent = match[0];
          frag.appendChild(mark);
          marks.push(mark);
          lastIndex = match.index + match[0].length;
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
        if (lastIndex < text.length) {
          frag.appendChild(doc.createTextNode(text.slice(lastIndex)));
        }
        textNode.parentNode.replaceChild(frag, textNode);
      });
    }

    function updateStatus() {
      var isAr = doc.documentElement.lang === "ar";
      if (!marks.length) {
        statusEl.textContent = input.value.trim() ? (isAr ? "لا نتائج" : "No results") : "";
        return;
      }
      var pos = currentMatch + 1;
      statusEl.textContent = isAr ? pos + " من " + marks.length : pos + " of " + marks.length;
    }

    function goToMatch(index) {
      if (!marks.length) return;
      if (currentMatch >= 0 && marks[currentMatch]) marks[currentMatch].classList.remove("is-current");
      currentMatch = (index + marks.length) % marks.length;
      var mark = marks[currentMatch];
      mark.classList.add("is-current");
      mark.scrollIntoView({ behavior: "smooth", block: "center" });
      updateStatus();
    }

    function runSearch() {
      clearMarks();
      var query = input.value.trim();
      if (query.length < 2) {
        updateStatus();
        return;
      }
      var regex = new RegExp(escapeRegExp(query), "gi");
      walkAndHighlight(article, regex);
      if (marks.length) {
        goToMatch(0);
      } else {
        updateStatus();
      }
    }

    var debounceTimer;
    input.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runSearch, 180);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        goToMatch(currentMatch + (event.shiftKey ? -1 : 1));
      }
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { goToMatch(currentMatch - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goToMatch(currentMatch + 1); });
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        input.value = "";
        clearMarks();
        updateStatus();
        var panel = doc.getElementById("search-panel");
        var toggle = doc.getElementById("search-toggle");
        if (panel) panel.setAttribute("hidden", "");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
    }
  }

  doc.addEventListener("DOMContentLoaded", function () {
    initYear();
    initNav();
    initProgress();
    initReadingTime();
    initBackToTop();
    initCopyEmail();
    initPrint();
    initTocActive();
    initSearchToggle();
    initSearch();
  });
})();
