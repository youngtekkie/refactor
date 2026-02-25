const KEY_PROFILES = 'yta_profiles_v1';
const KEY_ACTIVE = 'yta_activeProfile_v1';

function safeParse(json, fallback){
  try { return JSON.parse(json); } catch { return fallback; }
}

export function ensureStorage(){
  if (!localStorage.getItem(KEY_PROFILES)) localStorage.setItem(KEY_PROFILES, JSON.stringify([]));
  if (!localStorage.getItem(KEY_ACTIVE)) localStorage.setItem(KEY_ACTIVE, JSON.stringify(null));
}

export function getProfiles(){
  return safeParse(localStorage.getItem(KEY_PROFILES), []);
}

export function saveProfiles(profiles){
  localStorage.setItem(KEY_PROFILES, JSON.stringify(profiles));
}

export function getActiveProfileId(){
  return safeParse(localStorage.getItem(KEY_ACTIVE), null);
}

export function setActiveProfileId(id){
  localStorage.setItem(KEY_ACTIVE, JSON.stringify(id));
}

export function createProfile({ name, yearGroup, startDate }){
  const profiles = getProfiles();

  const cleanedName = String(name || '').trim();
  if (!cleanedName) throw new Error('Enter a child name.');

  // Prevent accidental duplicates (same name + yearGroup)
  const exists = profiles.find(p =>
    (p.name || '').toLowerCase() === cleanedName.toLowerCase() &&
    String(p.yearGroup || '') === String(yearGroup || '')
  );
  if (exists) {
    // Allow, but create a new profile with suffix
    const suffix = new Date().toISOString().slice(0,10);
    name = `${cleanedName} (${suffix})`;
  }

  const id = `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
  const profile = {
    id,
    name: String(name).trim(),
    yearGroup: String(yearGroup || '').trim(),
    startDate: String(startDate || '').trim(),
    createdAt: new Date().toISOString(),
    learnerState: {
      typingRecords: [],
      mathsScores: {},
      codeProjects: {}
    }
  };
  profiles.push(profile);
  saveProfiles(profiles);
  setActiveProfileId(id);
  return profile;
}

export function deleteProfile(id){
  const profiles = getProfiles().filter(p => p.id !== id);
  saveProfiles(profiles);
  const active = getActiveProfileId();
  if (active === id) setActiveProfileId(profiles[0]?.id ?? null);
}

export function getProfile(id){
  return getProfiles().find(p => p.id === id) || null;
}
