
// Grid canvas
(function() {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
  }
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const s = 60;
    ctx.strokeStyle = 'rgba(0,229,255,0.045)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += s) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += s) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    // Horizon glow
    const grd = ctx.createRadialGradient(canvas.width/2, canvas.height, 10, canvas.width/2, canvas.height, canvas.height * 0.7);
    grd.addColorStop(0, 'rgba(0,229,255,0.07)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();
})();

// Custom cursor
(function() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animate() {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

// Reveal on scroll
(function() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// Typewriter on hero tagline
(function() {
  const el = document.querySelector('.hero-tagline');
  if (!el) return;
  const orig = el.innerHTML;
  el.innerHTML = '';
  let i = 0;
  const plain = el.parentElement.querySelector('.hero-tagline');
  function type() {
    if (i <= orig.length) {
      el.innerHTML = orig.slice(0, i);
      i++;
      setTimeout(type, i < 20 ? 60 : 18);
    }
  }
  setTimeout(type, 800);
})();

// Skill bars animate when visible
(function() {
  const bars = document.querySelectorAll('.skill-level-fill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'fillBar 1.2s ease-out forwards';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => { b.style.transform = 'scaleX(0)'; b.style.animation = 'none'; io.observe(b); });
})();
