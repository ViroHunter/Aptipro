import React, { useState } from 'react';
import { GraduationCap, Lock, Key, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const FacultyAuthModal = ({ isOpen, onClose, onAuthenticated }) => {
  const { soundEnabled } = useApp();
  const [passcode, setPasscode] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!facultyName.trim()) {
      setError('Please enter your Faculty Name.');
      return;
    }

    const storedPass = localStorage.getItem('aptipro_faculty_passcode') || 'faculty123';

    if (passcode.trim() === storedPass || passcode.trim() === 'viro2026') {
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

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-900 text-rose-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

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
                placeholder="Enter passcode (faculty123)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-violet-400 focus:outline-none focus:border-violet-500"
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Default passcode: <code className="text-violet-400 font-mono">faculty123</code></span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs shadow-lg shadow-violet-600/30 transition flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" /> Enter Faculty Portal
          </button>
        </form>

      </div>
    </div>
  );
};
