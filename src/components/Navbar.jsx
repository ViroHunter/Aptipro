import React, { useState } from 'react';
import { Zap, BookOpen, Sliders, Award, Flame, Crown, User, School, LogIn, LogOut, Edit3, Trophy, ShieldCheck, Lock, GraduationCap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useApp } from '../context/AppContext';
import { AuthModal } from './Auth/AuthModal';
import { AdminAuthModal } from './Admin/AdminAuthModal';
import { FacultyAuthModal } from './Faculty/FacultyAuthModal';

export const Navbar = ({ activeTab, setActiveTab, onFacultyLogin }) => {
  const { stats, streak, userProfile, logoutUser } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isFacultyAuthOpen, setIsFacultyAuthOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Zap },
    { id: 'leaderboard', label: 'Rankings', icon: Trophy },
    { id: 'formulas', label: 'Formula Deck', icon: BookOpen },
    { id: 'custom', label: 'Custom Test', icon: Sliders },
    { id: 'achievements', label: 'Badges & XP', icon: Award },
    { id: 'faculty', label: 'Faculty Portal', icon: GraduationCap, isFaculty: true },
    { id: 'admin', label: 'Admin Portal', icon: ShieldCheck, isAdmin: true }
  ];

  // Helper for initials
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleTabClick = (item) => {
    if (item.isAdmin && activeTab !== 'admin') {
      setIsAdminAuthOpen(true);
    } else if (item.isFaculty && activeTab !== 'faculty') {
      setIsFacultyAuthOpen(true);
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition duration-200">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                  AptiPro
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Aptitude & Tech Mastery</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  {item.label}
                  {item.isAdmin && activeTab !== 'admin' && (
                    <Lock className="w-3 h-3 text-amber-500" />
                  )}
                  {item.isFaculty && activeTab !== 'faculty' && (
                    <Lock className="w-3 h-3 text-violet-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Profile, Gamification & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Streak Counter */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 font-bold text-xs shadow-sm">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{streak} Day Streak</span>
            </div>

            {/* User Profile Pill or Sign In Button */}
            {userProfile ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                    {getInitials(userProfile.name)}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                      {userProfile.name}
                    </div>
                    <div className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <School className="w-3 h-3 inline" />
                      <span className="truncate max-w-[100px]">{userProfile.college}</span>
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-fadeIn space-y-2">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{userProfile.name}</div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">{userProfile.username}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                        <School className="w-3.5 h-3.5 text-slate-400" />
                        <span>{userProfile.college}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsAuthOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Edit3 className="w-4 h-4 text-indigo-600" /> Edit Profile Details
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </button>
            )}

            <ThemeToggle />
          </div>

        </div>

        {/* Mobile Sub-Nav */}
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex justify-around bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-xs font-semibold flex-shrink-0 ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Auth / Edit Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        isEditMode={!!userProfile}
      />

      {/* Faculty Auth Passcode Modal */}
      <FacultyAuthModal
        isOpen={isFacultyAuthOpen}
        onClose={() => setIsFacultyAuthOpen(false)}
        onAuthenticated={(facultyDetails) => {
          if (onFacultyLogin) onFacultyLogin(facultyDetails);
          setActiveTab('faculty');
        }}
      />

      {/* Admin Auth PIN Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAuthenticated={() => setActiveTab('admin')}
      />
    </>
  );
};

