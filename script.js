// ---------- THEME TOGGLE ----------
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('justra-theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('justra-theme', next);
  });
})();

// ---------- HERO FLOW ANIMATION ----------
(function () {
  const flowCard = document.getElementById('flowCard');
  if (!flowCard) return;

  const stage1 = document.getElementById('stage1');
  const stage2 = document.getElementById('stage2');
  const stage3 = document.getElementById('stage3');
  const status = document.getElementById('flowStatus');
  const statusLabel = status.querySelector('.status-label');
  const releaseNum = document.getElementById('releaseNum');
  const conn1 = flowCard.querySelector('.conn-1');
  const conn2 = flowCard.querySelector('.conn-2');

  const TARGET_AMOUNT = 3000;
  let timer = null;

  function animateNumber(el, to, duration = 900) {
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(eased * to);
      el.textContent = '$' + v.toLocaleString();
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function reset() {
    [stage1, stage2, stage3].forEach(s => s.classList.remove('is-active'));
    [conn1, conn2].forEach(c => c.classList.remove('is-flowing'));
    status.dataset.state = 'locked';
    statusLabel.textContent = 'Funds locked';
    releaseNum.textContent = '$0';
  }

  function play() {
    reset();
    setTimeout(() => {
      stage1.classList.add('is-active');
      statusLabel.textContent = 'PR submitted';
    }, 400);

    setTimeout(() => {
      conn1.classList.add('is-flowing');
    }, 1400);

    setTimeout(() => {
      stage2.classList.add('is-active');
      statusLabel.textContent = 'AI verifying';
    }, 1700);

    setTimeout(() => {
      conn2.classList.add('is-flowing');
    }, 3500);

    setTimeout(() => {
      stage3.classList.add('is-active');
      status.dataset.state = 'released';
      statusLabel.textContent = 'Released';
      animateNumber(releaseNum, TARGET_AMOUNT, 800);
    }, 3800);

    timer = setTimeout(play, 7200);
  }

  // Start when in viewport
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!timer) play();
      } else {
        if (timer) { clearTimeout(timer); timer = null; reset(); }
      }
    });
  }, { threshold: 0.25 });
  io.observe(flowCard);
})();

// ---------- SECTION ENTRANCE ANIMATIONS ----------
(function () {
  const targets = document.querySelectorAll('.problem-card, .pillar, .price-card, .phase, .team-card, .flow-steps li');
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 600ms ease, transform 600ms ease';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const idx = Array.from(e.target.parentElement.children).indexOf(e.target);
        e.target.style.transitionDelay = (idx * 80) + 'ms';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(el => io.observe(el));
})();

// ---------- ACTIVE NAV LINK ----------
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
})();
