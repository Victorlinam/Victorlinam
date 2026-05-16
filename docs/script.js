const canvas = document.getElementById('warp-canvas');
const ctx = canvas.getContext('2d');
const nodes = Array.from({ length: 75 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  vx: (Math.random() - 0.5) * 0.8,
  vy: (Math.random() - 0.5) * 0.8,
  size: Math.random() * 2.2 + 0.5
}));

let pointer = { x: innerWidth / 2, y: innerHeight / 2 };

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const n of nodes) {
    const dx = pointer.x - n.x;
    const dy = pointer.y - n.y;
    const dist = Math.hypot(dx, dy) || 1;
    const pull = Math.max(0, 120 - dist) / 120;

    n.vx += (dx / dist) * pull * 0.03;
    n.vy += (dy / dist) * pull * 0.03;
    n.vx *= 0.97;
    n.vy *= 0.97;
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,214,10,0.9)';
    ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.strokeStyle = `rgba(255,183,3,${(1 - d / 120) * 0.38})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

document.addEventListener('pointermove', (e) => {
  pointer = { x: e.clientX, y: e.clientY };
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('open');
});

resize();
addEventListener('resize', resize);
draw();
