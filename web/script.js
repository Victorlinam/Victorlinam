// Create rolling balls in hero
function createBalls() {
  const container = document.getElementById('balls-container');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const ball = document.createElement('div');
    const size = Math.random() * 90 + 40;
    
    ball.className = 'ball';
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.left = `${Math.random() * 100}vw`;
    ball.style.animationDuration = `${Math.random() * 28 + 22}s`;
    ball.style.animationDelay = `-${Math.random() * 40}s`;
    ball.style.opacity = Math.random() * 0.5 + 0.25;
    
    container.appendChild(ball);
  }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') !== '#') {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Initialize everything
window.addEventListener('load', () => {
  createBalls();
});