# Offline readiness checklist (M1)

Open `debug.html` and confirm:
- Global contract OK
- Storage OK
- **External resources: OK** (should be zero)

Manual checks:
- Disconnect internet (or use DevTools > Network > Offline)
- Reload `index.html` via a local web server (recommended) and confirm:
  - Hero video loads (local file)
  - Navigation works
  - Profiles can be created and persist on refresh
