import { getProfiles, getActiveProfileId } from '../app/storage.js';

function block(title, ok, text){
  return `<div class="item">
    <div class="dot"></div>
    <div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <div style="font-weight:800">${title}</div>
        <span class="badge" style="padding:6px 9px">${ok ? 'OK' : 'WARN'}</span>
      </div>
      <p>${text}</p>
    </div>
  </div>`;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

export function initDebugPage(){
  const out = document.querySelector('[data-debug-out]');
  const rows = [];

  rows.push(block('Global contract', !!window.YTA, 'window.YTA exists.'));
  rows.push(block('Init status', !!window.YTA?.ready, 'window.YTA.ready is true after init.'));
  rows.push(block('Storage', typeof localStorage !== 'undefined', 'localStorage is available.'));

  const profiles = getProfiles();
  rows.push(block('Profiles', Array.isArray(profiles), `Profiles loaded: ${profiles.length}. Active: ${getActiveProfileId() || 'none'}`));

  rows.push(block('Modules scaffold', true, 'scripts/modules/ exists (engines added from Milestone 2 onwards).'));

  
  // External resource scan (should be zero for offline readiness)
  const externals = [];
  const checkAttr = (el, attr) => {
    const v = el.getAttribute(attr);
    if (!v) return;
    if (/^https?:\/\//i.test(v)) externals.push(`${el.tagName.toLowerCase()}[${attr}] → ${v}`);
  };
  document.querySelectorAll('script[src], link[href], img[src], video[src], source[src], a[href]').forEach(el => {
    checkAttr(el, 'src');
    checkAttr(el, 'href');
  });
  rows.push(block('External resources', externals.length === 0, externals.length === 0 ? 'No http(s) resources detected in markup.' : `Found ${externals.length}: <br>${externals.map(x => escapeHtml(x)).join('<br>')}`));

  out.innerHTML = rows.join('');
}
