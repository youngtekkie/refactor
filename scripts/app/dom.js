export function setHeaderHeightVar() {
  const header = document.querySelector('header.site-header');
  const apply = () => {
    const h = header ? header.getBoundingClientRect().height : 72;
    document.documentElement.style.setProperty('--headerH', `${Math.round(h)}px`);
  };
  apply();
  window.addEventListener('resize', apply);
}

export function wireNavToggle(){
  const btn = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-nav-panel]');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const open = panel.dataset.open === 'true';
    panel.dataset.open = open ? 'false' : 'true';
    panel.style.display = open ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  // click outside closes
  document.addEventListener('click', (e) => {
    if (panel.dataset.open !== 'true') return;
    const inside = panel.contains(e.target) || btn.contains(e.target);
    if (!inside){
      panel.dataset.open = 'false';
      panel.style.display = 'none';
      btn.setAttribute('aria-expanded','false');
    }
  });
}

export function setActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  const mark = (a) => {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current','page');
  };
  document.querySelectorAll('nav.site-nav a').forEach(mark);
  document.querySelectorAll('[data-nav-panel] a').forEach(mark);
}
