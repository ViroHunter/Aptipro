// 100% Free Centralized Cloud Security & Global Passcode Sync Service

const CLOUD_BIN_ID = 'aptipro_cloud_security_v1';
const STUDENTS_BIN_ID = 'aptipro_registered_students_v2';

// Cache keys for local fallback
const STORAGE_KEYS = {
  ADMIN_PASS: 'aptipro_admin_passcode',
  FACULTY_PASS: 'aptipro_faculty_passcode',
  STUDENTS_ROSTER: 'aptipro_registered_students',
  CLOUD_SYNCED: 'aptipro_cloud_synced_time'
};

// Fetch live global passcodes from Centralized Cloud Store
export const fetchGlobalPasscodes = async () => {
  try {
    const res = await fetch(`https://kvdb.io/4N8pL9x485kS22w1uQv1b3/${CLOUD_BIN_ID}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.adminPasscode && data.facultyPasscode) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, data.adminPasscode);
        localStorage.setItem(STORAGE_KEYS.FACULTY_PASS, data.facultyPasscode);
        localStorage.setItem(STORAGE_KEYS.CLOUD_SYNCED, Date.now().toString());

        return {
          adminPasscode: data.adminPasscode,
          facultyPasscode: data.facultyPasscode,
          synced: true
        };
      }
    }
  } catch (err) {
    console.log('Cloud sync falling back to local cache');
  }

  return {
    adminPasscode: localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || null,
    facultyPasscode: localStorage.getItem(STORAGE_KEYS.FACULTY_PASS) || null,
    synced: false
  };
};

// Push new global passcodes across all devices worldwide
export const updateGlobalPasscodes = async (newAdminPass, newFacultyPass) => {
  const payload = {
    adminPasscode: newAdminPass.trim(),
    facultyPasscode: newFacultyPass.trim(),
    updatedAt: new Date().toISOString(),
    updatedBy: 'Founder Admin'
  };

  localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, newAdminPass.trim());
  localStorage.setItem(STORAGE_KEYS.FACULTY_PASS, newFacultyPass.trim());

  try {
    await fetch(`https://kvdb.io/4N8pL9x485kS22w1uQv1b3/${CLOUD_BIN_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: true, synced: true };
  } catch (err) {
    return { success: true, synced: false };
  }
};

// Fetch live global registered students
export const fetchGlobalStudents = async () => {
  try {
    const res = await fetch(`https://kvdb.io/4N8pL9x485kS22w1uQv1b3/${STUDENTS_BIN_ID}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        localStorage.setItem(STORAGE_KEYS.STUDENTS_ROSTER, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.log('Cloud student sync falling back to local storage');
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS_ROSTER);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

// Push updated student roster across all devices worldwide
export const updateGlobalStudents = async (studentsList) => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS_ROSTER, JSON.stringify(studentsList));

  try {
    await fetch(`https://kvdb.io/4N8pL9x485kS22w1uQv1b3/${STUDENTS_BIN_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentsList)
    });
    return { success: true, synced: true };
  } catch (err) {
    return { success: true, synced: false };
  }
};
