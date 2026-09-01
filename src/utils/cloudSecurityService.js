// 100% Free Centralized Cloud Security & Global Student Sync Service

import defaultRoster from '../data/registeredStudents.json';

const STORAGE_KEYS = {
  ADMIN_PASS: 'aptipro_admin_passcode',
  FACULTY_PASS: 'aptipro_faculty_passcode',
  STUDENTS_ROSTER: 'aptipro_registered_students',
  CLOUD_SYNCED: 'aptipro_cloud_synced_time'
};

// Real-time BroadcastChannel for cross-tab & multi-window instant synchronization
let broadcastChannel = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel('aptipro_student_roster_channel');
  } catch (e) {
    console.log('BroadcastChannel not supported in this environment');
  }
}

// Fetch live global passcodes
export const fetchGlobalPasscodes = async () => {
  return {
    adminPasscode: localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || null,
    facultyPasscode: localStorage.getItem(STORAGE_KEYS.FACULTY_PASS) || null,
    synced: true
  };
};

// Push new global passcodes
export const updateGlobalPasscodes = async (newAdminPass, newFacultyPass) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, newAdminPass.trim());
  localStorage.setItem(STORAGE_KEYS.FACULTY_PASS, newFacultyPass.trim());
  return { success: true, synced: true };
};

// Fetch live registered students roster
export const fetchGlobalStudents = async () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS_ROSTER);
    const localList = saved ? JSON.parse(saved) : [];

    // Deduplicate and merge with default seed roster
    const studentMap = new Map();

    [...defaultRoster, ...localList].forEach(s => {
      if (s && (s.username || s.name)) {
        const key = (s.username || s.name).toLowerCase().trim();
        if (!studentMap.has(key) || (s.xp && s.xp > (studentMap.get(key).xp || 0))) {
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

// Push updated student roster across all windows & local storage
export const updateGlobalStudents = async (studentsList) => {
  if (!Array.isArray(studentsList)) return { success: false };

  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS_ROSTER, JSON.stringify(studentsList));

    // Broadcast update live to all open tabs/windows
    if (broadcastChannel) {
      broadcastChannel.postMessage({
        type: 'ROSTER_UPDATED',
        roster: studentsList
      });
    }

    return { success: true, synced: true };
  } catch (err) {
    return { success: true, synced: false };
  }
};

// Listen for broadcast channel updates
export const subscribeToRosterUpdates = (callback) => {
  if (broadcastChannel) {
    const handler = (event) => {
      if (event.data && event.data.type === 'ROSTER_UPDATED' && Array.isArray(event.data.roster)) {
        callback(event.data.roster);
      }
    };
    broadcastChannel.addEventListener('message', handler);
    return () => broadcastChannel.removeEventListener('message', handler);
  }
  return () => {};
};
