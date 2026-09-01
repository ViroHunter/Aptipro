import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateStats } from '../utils/analyticsUtils';
import { BADGES } from '../data/badgesData';
import { fetchGlobalStudents, updateGlobalStudents } from '../utils/cloudSecurityService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [testHistory, setTestHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_streak');
      return saved !== null ? parseInt(saved, 10) : 1;
    } catch (e) {
      return 1;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_sound');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_dark');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  const [registeredStudents, setRegisteredStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_registered_students');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync registered students from Centralized Cloud on mount
  useEffect(() => {
    fetchGlobalStudents().then(cloudStudents => {
      if (Array.isArray(cloudStudents)) {
        setRegisteredStudents(cloudStudents);
      }
    });
  }, []);

  // Verify 24-hour / daily streak continuity on mount
  useEffect(() => {
    const lastTestTimestamp = localStorage.getItem('aptipro_last_timestamp');
    if (lastTestTimestamp) {
      const lastTime = parseInt(lastTestTimestamp, 10);
      const now = Date.now();
      const hoursPassed = (now - lastTime) / (1000 * 60 * 60);

      if (hoursPassed >= 48) {
        setStreak(0);
        localStorage.setItem('aptipro_streak', '0');
      }
    }
  }, []);

  // Sync dark mode class with html root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('aptipro_dark', JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist history & bookmarks
  useEffect(() => {
    localStorage.setItem('aptipro_history', JSON.stringify(testHistory));
  }, [testHistory]);

  useEffect(() => {
    localStorage.setItem('aptipro_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('aptipro_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('aptipro_user', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('aptipro_user');
    }
  }, [userProfile]);

  const stats = calculateStats(testHistory);

  const loginUser = ({ name, username, college }) => {
    const formattedUsername = username.trim().startsWith('@') 
      ? username.trim() 
      : `@${username.trim()}`;
    
    const profile = {
      name: name.trim(),
      username: formattedUsername,
      college: college.trim(),
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setUserProfile(profile);

    // Register student with exact real stats (0 by default if new)
    const newStudent = {
      id: `st_${Date.now()}`,
      name: profile.name,
      username: profile.username,
      college: profile.college,
      joinedDate: profile.joinedDate,
      xp: stats.xp || 0,
      accuracy: stats.accuracy || 0,
      testsSolved: stats.totalTests || 0,
      certUnlocked: stats.accuracy >= 75 && stats.totalTests >= 3
    };

    setRegisteredStudents(prev => {
      const exists = prev.some(s => s.username === formattedUsername || s.name === profile.name);
      let updated;
      if (exists) {
        updated = prev.map(s => (s.username === formattedUsername || s.name === profile.name) ? { ...s, ...newStudent } : s);
      } else {
        updated = [newStudent, ...prev];
      }
      updateGlobalStudents(updated);
      return updated;
    });
  };

  const logoutUser = () => {
    setUserProfile(null);
  };

  const removeStudentFromRoster = (studentId) => {
    setRegisteredStudents(prev => {
      const filtered = prev.filter(s => s.id !== studentId);
      updateGlobalStudents(filtered);
      return filtered;
    });
  };

  const addTestResult = (result) => {
    const updatedHistory = [result, ...testHistory];
    setTestHistory(updatedHistory);

    const newStats = calculateStats(updatedHistory);

    // Update real stats for logged in student in roster
    if (userProfile) {
      setRegisteredStudents(prev => {
        const updated = prev.map(s => {
          if (s.username === userProfile.username || s.name === userProfile.name) {
            return {
              ...s,
              xp: newStats.xp,
              accuracy: newStats.accuracy,
              testsSolved: newStats.totalTests,
              certUnlocked: newStats.accuracy >= 75 && newStats.totalTests >= 3
            };
          }
          return s;
        });
        updateGlobalStudents(updated);
        return updated;
      });
    }

    const lastTestDate = localStorage.getItem('aptipro_last_date');
    const lastTestTimestamp = localStorage.getItem('aptipro_last_timestamp');
    const now = Date.now();
    const today = new Date().toDateString();

    if (lastTestDate !== today) {
      let newStreak = 1;
      if (lastTestTimestamp) {
        const hoursPassed = (now - parseInt(lastTestTimestamp, 10)) / (1000 * 60 * 60);
        if (hoursPassed < 48) {
          newStreak = streak + 1;
        }
      }
      setStreak(newStreak);
      localStorage.setItem('aptipro_streak', newStreak.toString());
      localStorage.setItem('aptipro_last_date', today);
      localStorage.setItem('aptipro_last_timestamp', now.toString());
    } else {
      localStorage.setItem('aptipro_last_timestamp', now.toString());
    }
  };

  const toggleBookmark = (questionId) => {
    setBookmarks(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const resetProgress = () => {
    setTestHistory([]);
    setBookmarks([]);
    setStreak(0);
    localStorage.removeItem('aptipro_history');
    localStorage.removeItem('aptipro_bookmarks');
    localStorage.removeItem('aptipro_streak');
    localStorage.removeItem('aptipro_last_date');
    localStorage.removeItem('aptipro_last_timestamp');
  };

  // Check unlocked badges
  const unlockedBadges = BADGES.filter(badge => badge.checkUnlocked(stats, testHistory, streak));

  return (
    <AppContext.Provider
      value={{
        userProfile,
        testHistory,
        bookmarks,
        streak,
        soundEnabled,
        darkMode,
        stats,
        unlockedBadges,
        registeredStudents,
        removeStudentFromRoster,
        loginUser,
        logoutUser,
        addTestResult,
        toggleBookmark,
        toggleSound,
        toggleDarkMode,
        resetProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
