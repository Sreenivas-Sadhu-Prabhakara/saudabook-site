/* SaudaBook explainer — tiny interactions, no dependencies.
   1) Sticky-nav active-link highlight on scroll.
   2) Smooth scroll for in-page anchors (with reduced-motion respect).
   3) Signature touch: the hero match card is a live deal book. The top
      match (Anil ↔ Whitefield 3BHK, score 100) moves scored -> visit
      scheduled -> confirmation queued, then the card flips to the next
      buyer. A live demo of match-and-drive-the-deal. */

(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Active nav link on scroll ---------- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links a[href^="#"]')
  );
  var sections = links
    .map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          var a = byId[e.target.id];
          if (!a) return;
          if (e.isIntersecting) {
            links.forEach(function (l) {
              l.style.color = "";
            });
            a.style.color = "var(--accent)";
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      io.observe(s);
    });
  }

  /* ---------- 2. Smooth scroll for anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (ev) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      ev.preventDefault();
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", id);
    });
  });

  /* ---------- 3. Signature: the deal book drives itself ---------- */
  var rows = document.getElementById("mc-rows");
  var liveScore = document.getElementById("mc-live-score");
  var caption = document.getElementById("mc-caption");

  if (!rows || !liveScore || !caption) return;

  // The top match row is the one that "closes itself".
  var topRow = rows.querySelector(".match-row");

  // Cycle: scored (100) -> visit scheduled -> confirmation queued -> reset.
  var stages = [
    {
      caption: "Top match scores 100 → schedule the site visit → confirmation queued.",
      flash: false
    },
    {
      caption: "Site visit booked for tomorrow 11am — address + ask sent to Anil.",
      flash: true
    },
    {
      caption: "WhatsApp confirmation queued in your outbox. That's one deal, driven.",
      flash: false
    }
  ];

  var i = 0;

  function applyStage(s) {
    caption.textContent = s.caption;
    if (topRow && s.flash) {
      topRow.classList.add("flash");
      setTimeout(function () {
        topRow.classList.remove("flash");
      }, 900);
    }
  }

  function advance() {
    i = (i + 1) % stages.length;
    applyStage(stages[i]);
  }

  // Reduced motion: show the fulfilled end-state once, don't loop.
  if (reduceMotion) {
    caption.textContent =
      "Scored 100 → visit booked → confirmation queued — the whole deal, driven.";
    return;
  }

  // Only animate while the widget is on screen (saves work, feels intentional).
  var running = false;
  var timer = null;

  function loop() {
    timer = setTimeout(function () {
      advance();
      loop();
    }, i === 0 ? 2600 : 2000);
  }

  var vis = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) {
          running = true;
          loop();
        } else if (!e.isIntersecting && running) {
          running = false;
          clearTimeout(timer);
        }
      });
    },
    { threshold: 0.35 }
  );
  vis.observe(rows.closest(".matchcard"));
})();
