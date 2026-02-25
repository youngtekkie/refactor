import { initApp } from './app/init.js';

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body?.dataset?.page || 'unknown';
  await initApp({ page });
});
