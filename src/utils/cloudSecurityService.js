// 100% Free Centralized Cloud Security & Global Passcode Sync Service

const CLOUD_BIN_ID = 'aptipro_cloud_security_v1';
const FREE_API_ENDPOINT = `https://api.jsonbin.io/v3/b`;
const MASTER_KEY = '$2a$10$AptiProSecurityKeyViroHunter2026';

// Cache keys for local fallback
const STORAGE_KEYS = {
  ADMIN_PASS: 'aptipro_admin_passcode',
  FACULTY_PASS: 'aptipro_faculty_passcode',
  CLOUD_SYNCED: 'aptipro_cloud_synced_time'
};

// Fetch live global passcodes from Centralized Cloud Store
export const fetchGlobalPasscodes = async () => {
  try {
    const localAdmin = localStorage.getItem(STORAGE_KEYS.ADMIN_PASS);
    const localFaculty = localStorage.getItem(STORAGE_KEYS.FACULTY_PASS);

    // Query Cloud Security Endpoint
    const res = await fetch(`https://kvdb.io/4N8pL9x485kS22w1uQv1b3/${CLOUD_BIN_ID}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.adminPasscode && data.facultyPasscode) {
        // Cache cloud values locally for fast sub-millisecond access
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

  // Fallback to local storage
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

  // Update local cache immediately
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, newAdminPass.trim());
  localStorage.setItem(STORAGE_KEYS.FACULTY_PASS, newFacultyPass.trim());
  localStorage.setItem(STORAGE_KEYS.CLOUD_SYNCED, Date.now().toString());

  try {
    // Post to global KV Security Store (100% Free)
    await fetch(`https://kvdb.io/4N8pL9x485kS22w1uQv1b3/${CLOUD_BIN_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: true, synced: true };
  } catch (err) {
    console.log('Passcode updated locally (Cloud sync pending connection)');
    return { success: true, synced: false };
  }
};
