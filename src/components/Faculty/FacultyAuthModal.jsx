import React, { useState } from 'react';
import { GraduationCap, Lock, Key, X, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

const FOUNDER_SETUP_KEY = 'AptiPro@Founder#2026';

export const FacultyAuthModal = ({ isOpen, onClose, onAuthenticated }) => {
  const { soundEnabled } = useApp();
  const [passcode, setPasscode] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  // Setup / Reset state
  const [showSetup, setShowSetup] = useState(false);
  const [founderKey, setFounderKey] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [setupMsg, setSetupMsg] = useState('');

  if (!isOpen) return null;

  const isPasscodeConfigured = () => {
    const saved = localStorage.getItem('aptipro_faculty_passcode');
    return saved && saved.trim() !== '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!facultyName.trim()) {
      setError('Please enter your Faculty Name.');
      return;
    }

    const savedPass = localStorage.getItem('aptipro_faculty_passcode');

    if (!savedPass || savedPass.trim() === '') {
      setError('Faculty Passcode not configured yet. Click "Setup / Reset" below.');
      return;
    }

    if (passcode.trim() === savedPass.trim()) {
      playSound('correct', soundEnabled);
      setError('');
      onAuthenticated({
        name: facultyName.trim(),
        department: department.trim() || 'Computer Engineering'
      });
      onClose();
    } else {
      playSound('wrong', soundEnabled);
      setError('Incorrect Faculty Passcode!');
    }
  };

  const handleSetup = (e) => {
    e.preventDefault();
    if (founderKey.trim() !== FOUNDER_SETUP_KEY) {
      setSetupMsg('Invalid Founder Key. Access denied.');
      return;
    }
    if (!newPass.trim() || newPass.trim().length < 6) {
      setSetupMsg('Passcode must be at least 6 characters.');
      return;
    }
    if (newPass.trim() !== confirmPass.trim()) {
      setSetupMsg('Passcodes do not match. Please retry.');
      return;
    }
    localStorage.setItem('aptipro_faculty_passcode', newPass.trim());
    setSetupMsg('✅ Faculty Passcode configured! Faculty members can now log in.');
    setShowSetup(false);
    setNewPass('');
    setConfirmPass('');
    setFounderKey('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-violet-600 text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Faculty Portal Login</h3>
              <p className="text-xs text-slate-400">Question Contributor Access</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-900 text-rose-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}
        {setupMsg && (
          <div className={`p-3 rounded-xl text-xs font-semibold ${setupMsg.startsWith('✅') ? 'bg-emerald-950/60 border border-emerald-900 text-emerald-300' : 'bg-rose-950/60 border border-rose-900 text-rose-300'}`}>
            {setupMsg}
          </div>
        )}

        {/* Normal Login Form */}
        {!showSetup && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Faculty / Professor Name
              </label>
              <input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="e.g. Prof. Sharma"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Department / Subject
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Computer Science / Aptitude"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Enter Faculty Passcode
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Faculty passcode..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-violet-400 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs shadow-lg shadow-violet-600/30 transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Enter Faculty Portal
            </button>

            <button
              type="button"
              onClick={() => { setShowSetup(true); setError(''); setSetupMsg(''); }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <Settings className="w-3.5 h-3.5" /> {isPasscodeConfigured() ? 'Forgot / Reset Passcode (Founder Only)' : 'First Time Setup (Founder Only)'}
            </button>
          </form>
        )}

        {/* Setup / Reset Form */}
        {showSetup && (
          <form onSubmit={handleSetup} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-900 text-amber-300 text-xs font-semibold">
              🔐 Founder Reset — Enter your secret Founder Key to set a new Faculty Passcode.
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Founder Secret Key</label>
              <input
                type="password"
                value={founderKey}
                onChange={(e) => setFounderKey(e.target.value)}
                placeholder="Enter Founder Key..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">New Faculty Passcode</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Min 6 characters..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-violet-400 focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Confirm Passcode</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Repeat passcode..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-violet-400 focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setShowSetup(false); setSetupMsg(''); }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold text-xs transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" /> Set Passcode
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
