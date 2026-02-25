import { createProfile, getProfiles, deleteProfile, setActiveProfileId, getActiveProfileId } from '../app/storage.js';

function qs(sel){ return document.querySelector(sel); }
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function render(){
  const list = qs('[data-profiles-list]');
  const profiles = getProfiles();
  const active = getActiveProfileId();

  list.innerHTML = profiles.length ? profiles.map(p => `
    <div class="item" style="align-items:center;justify-content:space-between">
      <div style="min-width:0">
        <div style="font-weight:700">${escapeHtml(p.name || 'Unnamed')}</div>
        <div class="small">Year ${escapeHtml(p.yearGroup || '?')} · Start: ${escapeHtml(p.startDate || '—')}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">
        <button class="btn" data-action="select" data-id="${p.id}">${p.id===active?'Selected':'Select'}</button>
        <button class="btn" data-action="delete" data-id="${p.id}">Delete</button>
      </div>
    </div>
  `).join('') : `<div class="small">No profiles yet. Create one below.</div>`;
}

export function initProfilesPage(){
  const form = qs('[data-profile-form]');
  const msg = qs('[data-msg]');
  render();

  qs('[data-profiles-list]').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (action === 'select') setActiveProfileId(id);
    if (action === 'delete') deleteProfile(id);
    render();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = '';
    const name = qs('#childName').value.trim();
    const yearGroup = qs('#yearGroup').value;
    const startDate = qs('#startDate').value;

    try{
      const profile = createProfile({ name, yearGroup, startDate });
      msg.textContent = `Profile created: ${profile.name}`;
      form.reset();
      render();
    }catch(err){
      msg.textContent = err?.message || 'Could not create profile.';
    }
  });
}
