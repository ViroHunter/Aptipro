import React, { useState } from 'react';
import { User, AtSign, School, Sparkles, ShieldCheck, ArrowRight, X, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const AuthModal = ({ isOpen, onClose, isEditMode = false }) => {
  const { userProfile, loginUser, soundEnabled } = useApp();

  const [name, setName] = useState(userProfile?.name || '');
  const [username, setUsername] = useState(userProfile?.username ? userProfile.username.replace(/^@/, '') : '');
  const [college, setCollege] = useState(userProfile?.college || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your Full Name.');
      return;
    }
    if (!username.trim()) {
      setError('Please enter a Username.');
      return;
    }
    if (!college.trim()) {
      setError('Please enter your College or Institution name.');
      return;
    }

    setError('');
    loginUser({ name, username, college });
    playSound('correct', soundEnabled);
    if (onClose) onClose();
  };

  const collegeSuggestions = [
    'MIT (Massachusetts Institute of Technology)',
    'Stanford University',
    'IIT Bombay',
    'Oxford University',
    'UC Berkeley',
    'University of Cambridge'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative space-y-6">
        
        {/* Close Button if edit mode */}
        {isEditMode && onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {isEditMode ? 'Edit Student Profile' : 'Welcome to AptiPro'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isEditMode
              ? 'Update your student details & college info'
              : 'Sign in with your details to start practicing & issue your certified credentials!'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Username
            </label>
            <div className="relative">
              <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. alex_cyber"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* College / Institution Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              College / Institution Name
            </label>
            <div className="relative mb-2">
              <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. Stanford University"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Quick College Suggestion Chips */}
            <div className="flex flex-wrap gap-1.5">
              {collegeSuggestions.slice(0, 3).map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCollege(item)}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition"
                >
                  + {item.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-4"
          >
            {isEditMode ? 'Save Profile Changes' : 'Start Learning & Practice'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
