let w = 480;
let h = 270;
let c = undefined;
let ctx = undefined;
let col1 = undefined;
let col2 = undefined;

// script for drawing on the background canvas
window.onload = () => {
  c = document.getElementById("main-background");
  ctx = c.getContext("2d");

  updateColors();

  w = c.scrollWidth / 4;
  h = w * (c.scrollHeight / c.scrollWidth);
  c.width = w;
  c.height = h;

  let angle = 0;
  const mf = 100;
  let particles = [];

  for (let i = 0; i < mf; i++) {
    particles.push({
      x: Math.random() * w - w/2,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      d: Math.pow(Math.random() * 0.7 + 0.1, 2) + 0.25,
    });
  }

  const drawParticles = () => {
    ctx.clearRect(0, 0, w, h);
    const grd = ctx.createRadialGradient(w/2-30, h/2-30, 0, w/2, h/2, Math.max(w/1.5, h/1.5));
    grd.addColorStop(1, "#000000");
    grd.addColorStop(0, `${col1}`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = `${col2}`;
    ctx.beginPath();
    for (let i = 0; i < mf; i++) {
      const f = particles[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    moveParticles();
  };

  const moveParticles = () => {
    angle += 0.0025;
    for (let i = 0; i < mf; i++) {
      const f = particles[i];
      f.y += f.d;
      f.x += Math.sin(2*angle) * 0.5;

      if (f.y > h || f.y < 0) {
        particles[i] = { x: f.x, y: f.y, r: f.r, d: -f.d };
      }
    }
  };

  setInterval(drawParticles, 40);
};

window.onresize = () => {
  w = c.scrollWidth / 4;
  h = w * (c.scrollHeight / c.scrollWidth);
  c.width = w;
  c.height = h;
};

const updateColors = () => {
  col1 = getComputedStyle(document.documentElement).getPropertyValue('--col-back-1');
  col2 = getComputedStyle(document.documentElement).getPropertyValue('--col-back-2');
};

document.querySelector('.theme-btn.blue').addEventListener('click', (e) => {
  document.documentElement.style.setProperty('--col-back-1', 'var(--col-back-blue-1)');
  document.documentElement.style.setProperty('--col-back-2', 'var(--col-back-blue-2)');
  updateColors();
});

document.querySelector('.theme-btn.orange').addEventListener('click', (e) => {
  document.documentElement.style.setProperty('--col-back-1', 'var(--col-back-orange-1)');
  document.documentElement.style.setProperty('--col-back-2', 'var(--col-back-orange-2)');
  updateColors();
});

document.querySelector('.theme-btn.green').addEventListener('click', (e) => {
  document.documentElement.style.setProperty('--col-back-1', 'var(--col-back-green-1)');
  document.documentElement.style.setProperty('--col-back-2', 'var(--col-back-green-2)');
  updateColors();
});

document.querySelector('.theme-btn.purple').addEventListener('click', (e) => {
  document.documentElement.style.setProperty('--col-back-1', 'var(--col-back-purple-1)');
  document.documentElement.style.setProperty('--col-back-2', 'var(--col-back-purple-2)');
  updateColors();
});

