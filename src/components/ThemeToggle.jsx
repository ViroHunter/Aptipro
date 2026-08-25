import React from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playSound } from '../utils/audioUtils';

export const ThemeToggle = () => {
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useApp();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          playSound('select', soundEnabled);
          toggleSound();
        }}
        title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition"
      >
        {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> : <VolumeX className="w-5 h-5" />}
      </button>

      <button
        onClick={() => {
          playSound('select', soundEnabled);
          toggleDarkMode();
        }}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition"
      >
        {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
      </button>
    </div>
  );
};
