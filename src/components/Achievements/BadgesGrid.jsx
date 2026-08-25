import React, { useState } from 'react';
import { Crown, Award, Footprints, Target, Zap, Calculator, Brain, Flame, Lock, CheckCircle2, ShieldCheck, FileCheck, Sparkles } from 'lucide-react';
import { BADGES } from '../../data/badgesData';
import { useApp } from '../../context/AppContext';
import { CertificateModal } from './CertificateModal';

const iconMap = {
  Footprints,
  Target,
  Zap,
  Calculator,
  Brain,
  ShieldCheck,
  Flame,
  Crown
};

export const BadgesGrid = () => {
  const { stats, unlockedBadges } = useApp();
  const [isCertOpen, setIsCertOpen] = useState(false);

  const unlockedIds = unlockedBadges.map(b => b.id);
  const currentLevelProgress = Math.min(100, Math.round(((stats.xp % 200) / 200) * 100));
  const isAllUnlocked = unlockedBadges.length === BADGES.length;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 animate-fadeIn space-y-8">
      
      {/* Virohunter Cipher Certificate Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-amber-500/40 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400">
                Official Certification
              </span>
              {isAllUnlocked ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Unlocked (8/8 Tasks Done)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" /> Locked ({unlockedBadges.length}/8 Tasks Done)
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Virohunter Cipher Certificate of Mastery</h2>
            <p className="text-xs text-slate-300 mt-1">
              Complete all 8 achievements to unlock your official verified certificate by Virohunter Cipher Security & Aptitude Academy.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 relative z-10 w-full sm:w-auto">
          <button
            onClick={() => setIsCertOpen(true)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-xs tracking-wide shadow-xl transition ${
              isAllUnlocked
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400'
            }`}
          >
            {isAllUnlocked ? (
              <>
                <FileCheck className="w-4 h-4" /> Claim Official Certificate
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> View Certificate & Lock Status
              </>
            )}
          </button>
        </div>
      </div>

      {/* XP Level Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-300">Level {stats.level}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">{stats.levelTitle}</h2>
          <p className="text-xs text-slate-300">Earn XP by solving aptitude questions and completing test sessions!</p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full md:w-72 bg-slate-900/80 p-4 rounded-2xl border border-indigo-800/40 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Progress to Lvl {stats.level + 1}</span>
            <span className="text-amber-400">{stats.xp} XP</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Achievements & Badges ({unlockedBadges.length} of {BADGES.length} Unlocked)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Unlock badges as you improve your aptitude speed and accuracy</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedIds.includes(badge.id);
            const Icon = iconMap[badge.icon] || Award;

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900 shadow-md'
                    : 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
                        isUnlocked ? `bg-gradient-to-tr ${badge.color}` : 'bg-slate-400 dark:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        allCompleted={isAllUnlocked}
      />

    </div>
  );
};
