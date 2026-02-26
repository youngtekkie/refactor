import { setHeaderHeightVar, wireNavToggle, setActiveNav } from './dom.js';
import { ensureStorage } from './storage.js';
import { renderFooterYear, wireOfflineBanner } from './ui.js';
import { initProfilesPage } from '../features/profiles.js';
import { initDebugPage } from '../features/debug.js';

function ensureGlobalContract() {
  if (!window.YTA) window.YTA = {};
  window.YTA.version = '0.1.0';
  window.YTA.ready = false;
}

export async function initApp({ page }) {
  ensureGlobalContract();
  ensureStorage();
  setHeaderHeightVar();
  wireNavToggle();
  setActiveNav();
  renderFooterYear();
  wireOfflineBanner();

  // Expose shared utilities for debug
  window.YTA.storage = await import('./storage.js');
  window.YTA.dom = await import('./dom.js');

  window.YTA.ready = true;

  // Page initialisers (Milestone 0)
  if (page === 'profiles') initProfilesPage();
  if (page === 'debug') initDebugPage();
}
