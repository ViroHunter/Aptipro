import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, X, Check, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const AdminAuthModal = ({ isOpen, onClose, onAuthenticated }) => {
  const { soundEnabled } = useApp();
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const savedPasscode = localStorage.getItem('aptipro_admin_passcode');
  const isFirstTimeSetup = !savedPasscode;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFirstTimeSetup) {
      if (!passcode.trim()) {
        setError('Please enter a passcode.');
        return;
      }
      if (passcode.length < 4) {
        setError('Passcode must be at least 4 characters long.');
        return;
      }
      if (passcode !== confirmPasscode) {
        setError('Passcodes do not match! Please verify.');
        return;
      }

      // Save custom passcode on first time setup
      localStorage.setItem('aptipro_admin_passcode', passcode.trim());
      playSound('correct', soundEnabled);
      setError('');
      onAuthenticated();
      onClose();
    } else {
      // Login with existing custom passcode
      if (passcode.trim() === savedPasscode) {
        playSound('correct', soundEnabled);
        setError('');
        onAuthenticated();
        onClose();
      } else {
        playSound('wrong', soundEnabled);
        setError('Incorrect Admin Passcode!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {isFirstTimeSetup ? 'First-Time Admin Setup' : 'Admin Authentication'}
              </h3>
              <p className="text-xs text-slate-400">
                {isFirstTimeSetup ? 'Create your custom Admin Passcode' : 'Founder & Administrator Access'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isFirstTimeSetup && (
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>No default passcodes exist. Create your secure Admin Passcode below to initialize the portal.</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-900 text-rose-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              {isFirstTimeSetup ? 'Create Admin Passcode' : 'Enter Admin Passcode'}
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={isFirstTimeSetup ? 'Create new passcode...' : 'Enter your passcode...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-emerald-400 focus:outline-none focus:border-indigo-500"
                autoFocus
                required
              />
            </div>
          </div>

          {isFirstTimeSetup && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Confirm Admin Passcode
              </label>
              <div className="relative">
                <Check className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  placeholder="Re-enter passcode to confirm..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-emerald-400 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" /> {isFirstTimeSetup ? 'Set Passcode & Enter Admin Portal' : 'Unlock Admin Portal'}
          </button>
        </form>

      </div>
    </div>
  );
};
