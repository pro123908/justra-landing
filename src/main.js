import "./style.css";
import { inject } from "@vercel/analytics";

inject();

// ---------- THEME TOGGLE ----------
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("justra-theme");
  if (saved === "light" || saved === "dark")
    root.setAttribute("data-theme", saved);
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("justra-theme", next);
  });
})();

// ---------- HERO FLOW ANIMATION ----------
(function () {
  const flowCard = document.getElementById("flowCard");
  if (!flowCard) return;

  const stage1 = document.getElementById("stage1");
  const stage2 = document.getElementById("stage2");
  const stage3 = document.getElementById("stage3");
  const status = document.getElementById("flowStatus");
  const statusLabel = status.querySelector(".status-label");
  const releaseNum = document.getElementById("releaseNum");
  const conn1 = flowCard.querySelector(".conn-1");
  const conn2 = flowCard.querySelector(".conn-2");

  const TARGET_AMOUNT = 3000;
  let timer = null;

  function animateNumber(el, to, duration = 900) {
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(eased * to);
      el.textContent = "$" + v.toLocaleString();
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function reset() {
    [stage1, stage2, stage3].forEach((s) => s.classList.remove("is-active"));
    [conn1, conn2].forEach((c) => c.classList.remove("is-flowing"));
    status.dataset.state = "locked";
    statusLabel.textContent = "Funds locked";
    releaseNum.textContent = "$0";
  }

  function play() {
    reset();
    setTimeout(() => {
      stage1.classList.add("is-active");
      statusLabel.textContent = "PR submitted";
    }, 400);

    setTimeout(() => {
      conn1.classList.add("is-flowing");
    }, 1400);

    setTimeout(() => {
      stage2.classList.add("is-active");
      statusLabel.textContent = "AI verifying";
    }, 1700);

    setTimeout(() => {
      conn2.classList.add("is-flowing");
    }, 3500);

    setTimeout(() => {
      stage3.classList.add("is-active");
      status.dataset.state = "released";
      statusLabel.textContent = "Released";
      animateNumber(releaseNum, TARGET_AMOUNT, 800);
    }, 3800);

    timer = setTimeout(play, 7200);
  }

  // Start when in viewport
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!timer) play();
        } else {
          if (timer) {
            clearTimeout(timer);
            timer = null;
            reset();
          }
        }
      });
    },
    { threshold: 0.25 },
  );
  io.observe(flowCard);
})();

// ---------- SECTION ENTRANCE ANIMATIONS ----------
(function () {
  const targets = document.querySelectorAll(
    ".problem-card, .pillar, .price-card, .biz-card, .phase, .team-card, .team-card-new, .flow-steps li",
  );
  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 600ms ease, transform 600ms ease";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const idx = Array.from(e.target.parentElement.children).indexOf(
            e.target,
          );
          e.target.style.transitionDelay = idx * 80 + "ms";
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  targets.forEach((el) => io.observe(el));
})();

// ---------- ACTIVE NAV LINK ----------
(function () {
  const links = document.querySelectorAll(".nav-links a");
  const sections = Array.from(links)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle(
              "active",
              l.getAttribute("href") === "#" + e.target.id,
            ),
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => io.observe(s));
})();

// ---------- SCROLL PROGRESS BAR ----------
(function () {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  function update() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

// ---------- CURSOR SPOTLIGHT ----------
(function () {
  const el = document.getElementById("cursor-spotlight");
  if (!el || window.matchMedia("(pointer: coarse)").matches) return;
  let visible = false;
  document.addEventListener(
    "mousemove",
    (e) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
      if (!visible) {
        el.style.opacity = "1";
        visible = true;
      }
    },
    { passive: true },
  );
  document.addEventListener("mouseleave", () => {
    el.style.opacity = "0";
    visible = false;
  });
})();

// ---------- NAV SCROLL ELEVATION ----------
(function () {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  function update() {
    nav.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

// ---------- MOBILE HAMBURGER ----------
(function () {
  const btn = document.getElementById("navHamburger");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// ---------- BACK TO TOP ----------
(function () {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("is-visible", window.scrollY > 400);
    },
    { passive: true },
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
})();

// ---------- STAT COUNTER ----------
(function () {
  const stats = document.querySelectorAll("[data-count]");
  if (!stats.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();
        function frame(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        io.unobserve(el);
      });
    },
    { threshold: 0.6 },
  );
  stats.forEach((el) => io.observe(el));
})();

// ---------- FAQ ACCORDION ----------
(function () {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((i) => i.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });
})();

// ---------- SECTION HEAD REVEAL ----------
(function () {
  const heads = document.querySelectorAll(".section-head, .team-head, .how-it-works, .biz-footer");
  heads.forEach((el) => el.classList.add("section-head-hidden"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("section-head-hidden");
          e.target.classList.add("section-head-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  heads.forEach((el) => io.observe(el));
})();

// ---------- CTA CARD REVEAL ----------
(function () {
  const card = document.querySelector(".cta-card");
  if (!card) return;
  card.classList.add("cta-card-hidden");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("cta-card-hidden");
          e.target.classList.add("cta-card-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  io.observe(card);
})();

// ---------- FAQ ITEM REVEAL ----------
(function () {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((el, i) => {
    el.classList.add("faq-item-hidden");
    el.style.transitionDelay = i * 55 + "ms";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("faq-item-hidden");
          e.target.classList.add("faq-item-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
})();

// ---------- TRUST STRIP REVEAL ----------
(function () {
  const strip = document.querySelector(".trust-strip");
  if (!strip) return;
  strip.classList.add("trust-strip-hidden");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("trust-strip-hidden");
          e.target.classList.add("trust-strip-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  io.observe(strip);
})();

// ---------- PROBLEM NOTE REVEAL ----------
(function () {
  const note = document.querySelector(".problem-note");
  if (!note) return;
  note.style.opacity = "0";
  note.style.transform = "translateY(14px)";
  note.style.transition = "opacity 600ms ease 200ms, transform 600ms ease 200ms";
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  io.observe(note);
})();

// ---------- WAITLIST FORMS ----------
(function () {
  function handleWaitlist(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input ? input.value : "";
      const success = document.createElement("div");
      success.className = "form-success";
      success.innerHTML =
        "<span class=\"check-ico\">✓</span><span>You're on the list! We'll reach out at <strong>" +
        email +
        "</strong></span>";
      form.replaceWith(success);
    });
  }
  document.querySelectorAll(".waitlist-form").forEach(handleWaitlist);
})();
