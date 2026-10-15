export function makeTilt(selector, maxDeg = 9) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll(selector).forEach((el) => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = 'true';

    const baseTransform = () => {
      const t = getComputedStyle(el).transform;
      return t === 'none' ? '' : `${t} `;
    };

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `${baseTransform()}perspective(1000px) rotateX(${(py * -maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}
