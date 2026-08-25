import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateStats } from '../utils/analyticsUtils';
import { BADGES } from '../data/badgesData';

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

  // Verify 24-hour / daily streak continuity on mount
  useEffect(() => {
    const lastTestTimestamp = localStorage.getItem('aptipro_last_timestamp');
    if (lastTestTimestamp) {
      const lastTime = parseInt(lastTestTimestamp, 10);
      const now = Date.now();
      const hoursPassed = (now - lastTime) / (1000 * 60 * 60);

      // If more than 48 hours passed without solving any test, reset streak to 0
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

  const loginUser = ({ name, username, college }) => {
    const formattedUsername = username.trim().startsWith('@') 
      ? username.trim() 
      : `@${username.trim()}`;
    const profile = {
      name: name.trim(),
      username: formattedUsername,
      college: college.trim(),
      joinedDate: new Date().toISOString()
    };
    setUserProfile(profile);
  };

  const logoutUser = () => {
    setUserProfile(null);
  };

  const addTestResult = (result) => {
    const updatedHistory = [result, ...testHistory];
    setTestHistory(updatedHistory);

    const lastTestDate = localStorage.getItem('aptipro_last_date');
    const lastTestTimestamp = localStorage.getItem('aptipro_last_timestamp');
    const now = Date.now();
    const today = new Date().toDateString();

    if (lastTestDate !== today) {
      let newStreak = 1;
      if (lastTestTimestamp) {
        const hoursPassed = (now - parseInt(lastTestTimestamp, 10)) / (1000 * 60 * 60);
        // If solved within 48 hours, increment streak, otherwise reset to 1
        if (hoursPassed < 48) {
          newStreak = streak + 1;
        }
      }
      setStreak(newStreak);
      localStorage.setItem('aptipro_streak', newStreak.toString());
      localStorage.setItem('aptipro_last_date', today);
      localStorage.setItem('aptipro_last_timestamp', now.toString());
    } else {
      // Already solved a category today, update timestamp
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

  const stats = calculateStats(testHistory);

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
