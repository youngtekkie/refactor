export function renderFooterYear(){
  const el = document.querySelector('[data-year]');
  if (el) el.textContent = String(new Date().getFullYear());
}

export function wireOfflineBanner(){
  const banner = document.querySelector('[data-offline-banner]');
  if (!banner) return;
  function update(){
    const offline = navigator.onLine === false;
    banner.classList.toggle('show', offline);
  }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}
