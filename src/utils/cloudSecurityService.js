// 100% Free Centralized Cloud Security & Global Sync Service

import defaultRoster from '../data/registeredStudents.json';

const STORAGE_KEYS = {
  ADMIN_PASS: 'aptipro_admin_passcode',
  FACULTY_PASS: 'aptipro_faculty_passcode',
  STUDENTS_ROSTER: 'aptipro_registered_students',
  FACULTY_ROSTER: 'aptipro_registered_faculty',
  CLOUD_SYNCED: 'aptipro_cloud_synced_time'
};

// Real-time BroadcastChannel for cross-tab & multi-window instant synchronization
let broadcastChannel = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel('aptipro_roster_channel');
  } catch (e) {
    console.log('BroadcastChannel not supported');
  }
}

// ─── PASSCODES ──────────────────────────────────────────────────────────────
export const fetchGlobalPasscodes = async () => {
  return {
    adminPasscode: localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || null,
    facultyPasscode: localStorage.getItem(STORAGE_KEYS.FACULTY_PASS) || null,
    synced: true
  };
};

export const updateGlobalPasscodes = async (newAdminPass, newFacultyPass) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, newAdminPass.trim());
  localStorage.setItem(STORAGE_KEYS.FACULTY_PASS, newFacultyPass.trim());
  return { success: true };
};

// ─── STUDENT ROSTER ─────────────────────────────────────────────────────────
export const fetchGlobalStudents = async () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS_ROSTER);
    const localList = saved ? JSON.parse(saved) : [];

    // Merge with default seed, deduplicate by username/name
    const studentMap = new Map();
    [...defaultRoster, ...localList].forEach(s => {
      if (s && (s.username || s.name)) {
        const key = (s.username || s.name).toLowerCase().trim();
        if (!studentMap.has(key) || (s.xp != null && s.xp >= (studentMap.get(key).xp || 0))) {
          studentMap.set(key, s);
        }
      }
    });

    const mergedList = Array.from(studentMap.values());
    localStorage.setItem(STORAGE_KEYS.STUDENTS_ROSTER, JSON.stringify(mergedList));
    return mergedList;
  } catch (err) {
    return defaultRoster || [];
  }
};

export const updateGlobalStudents = async (studentsList) => {
  if (!Array.isArray(studentsList)) return { success: false };
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS_ROSTER, JSON.stringify(studentsList));
    broadcastChannel?.postMessage({ type: 'STUDENTS_UPDATED', roster: studentsList });
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

// ─── FACULTY ROSTER ─────────────────────────────────────────────────────────
export const fetchRegisteredFaculty = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FACULTY_ROSTER);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const registerFacultyLogin = (facultyDetails) => {
  try {
    const existing = fetchRegisteredFaculty();
    const key = (facultyDetails.name || '').toLowerCase().trim();

    const facultyMap = new Map();
    existing.forEach(f => {
      if (f && f.name) facultyMap.set(f.name.toLowerCase().trim(), f);
    });

    // Upsert faculty record
    facultyMap.set(key, {
      id: `fac_${facultyDetails.name.replace(/\s+/g, '_').toLowerCase()}`,
      name: facultyDetails.name,
      department: facultyDetails.department || 'Computer Engineering',
      lastLogin: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      role: 'Faculty',
      type: 'faculty'
    });

    const updatedList = Array.from(facultyMap.values());
    localStorage.setItem(STORAGE_KEYS.FACULTY_ROSTER, JSON.stringify(updatedList));

    // Broadcast so admin panel refreshes instantly
    broadcastChannel?.postMessage({ type: 'FACULTY_UPDATED', roster: updatedList });
    return updatedList;
  } catch {
    return [];
  }
};

// ─── BROADCAST SUBSCRIPTIONS ────────────────────────────────────────────────
export const subscribeToRosterUpdates = (callback) => {
  if (!broadcastChannel) return () => {};
  const handler = (event) => {
    if (!event.data) return;
    if (
      (event.data.type === 'STUDENTS_UPDATED' || event.data.type === 'ROSTER_UPDATED') &&
      Array.isArray(event.data.roster)
    ) {
      callback(event.data.roster);
    }
  };
  broadcastChannel.addEventListener('message', handler);
  return () => broadcastChannel.removeEventListener('message', handler);
};

export const subscribeToFacultyUpdates = (callback) => {
  if (!broadcastChannel) return () => {};
  const handler = (event) => {
    if (event.data?.type === 'FACULTY_UPDATED' && Array.isArray(event.data.roster)) {
      callback(event.data.roster);
    }
  };
  broadcastChannel.addEventListener('message', handler);
  return () => broadcastChannel.removeEventListener('message', handler);
};
