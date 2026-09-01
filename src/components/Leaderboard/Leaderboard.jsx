import React, { useState } from 'react';
import { Trophy, Crown, Award, Medal, School, Target, Zap, Search, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Leaderboard = () => {
  const { stats, userProfile, registeredStudents } = useApp();
  const [filter, setFilter] = useState('global'); // 'global', 'college'

  // Source registered students from AppContext / Cloud Security Store
  const sourceStudents = registeredStudents && registeredStudents.length > 0 ? registeredStudents : [];

  // Build ranking entries for all registered students
  let allEntries = sourceStudents.map((s) => {
    const isCurrent = userProfile && (
      (userProfile.username && s.username === userProfile.username) || 
      (userProfile.name && s.name.toLowerCase() === userProfile.name.toLowerCase())
    );
    return {
      id: s.id || s.username,
      name: s.name,
      username: s.username,
      college: s.college,
      xp: isCurrent ? stats.xp : (s.xp || 0),
      accuracy: isCurrent ? stats.accuracy : (s.accuracy || 0),
      testsCompleted: isCurrent ? stats.totalTests : (s.testsSolved || s.testsCompleted || 0),
      isCurrentUser: isCurrent
    };
  });

  // Ensure current user is present if logged in
  if (userProfile && !allEntries.some(s => s.isCurrentUser)) {
    allEntries.unshift({
      id: 'user_active',
      isCurrentUser: true,
      name: userProfile.name,
      username: userProfile.username,
      college: userProfile.college,
      xp: stats.xp || 0,
      accuracy: stats.accuracy || 0,
      testsCompleted: stats.totalTests || 0
    });
  }

  // Deterministic Multi-Tier Ranking Sort Engine:
  // 1. XP Points (Primary)
  // 2. Accuracy % (Secondary)
  // 3. Tests Completed (Tertiary)
  // 4. Alphabetical Name (Tie-breaker)
  allEntries.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    if (b.testsCompleted !== a.testsCompleted) return b.testsCompleted - a.testsCompleted;
    return a.name.localeCompare(b.name);
  });

  // Assign Global Ranks
  allEntries = allEntries.map((student, idx) => ({
    ...student,
    rank: idx + 1
  }));

  // Find user's global standing
  const userGlobalRankObj = allEntries.find(s => s.isCurrentUser);

  // Filter list by college if selected
  let displayList = allEntries;
  if (filter === 'college' && userProfile?.college) {
    const userCol = userProfile.college.toLowerCase().trim();
    displayList = allEntries
      .filter(s => s.college.toLowerCase().includes(userCol) || s.isCurrentUser)
      .map((student, idx) => ({
        ...student,
        rank: idx + 1 // College rank
      }));
  }

  const currentUserDisplayObj = displayList.find(s => s.isCurrentUser) || userGlobalRankObj;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 animate-fadeIn space-y-8">
      
      {/* Leaderboard Header & User Rank Highlight */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-800/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold uppercase">
            <Trophy className="w-4 h-4 text-amber-400" /> Live Registered Student Rankings
          </div>
          <h2 className="text-3xl font-extrabold text-white">Top Aptitude & Cyber Security Standings</h2>
          <p className="text-xs text-slate-300">
            Real-time standings computed strictly by Total XP, Accuracy Rate, and Tests Solved.
          </p>
        </div>

        {/* Current User Standing Card */}
        <div className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center sm:text-right relative z-10 w-full md:w-auto flex flex-col items-center md:items-end">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-300">
            Your {filter === 'college' ? 'College' : 'Global'} Standing
          </span>
          <div className="text-3xl font-extrabold text-amber-400 flex items-center gap-2 mt-1">
            <Crown className="w-6 h-6" /> Rank #{currentUserDisplayObj?.rank || 1}
          </div>
          <div className="text-xs text-slate-200 font-semibold mt-1">
            {stats.xp} XP • {stats.accuracy}% Accuracy
          </div>
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Active Student Leaderboard ({displayList.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Strictly ordered by XP, Accuracy % and Solved Tests</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setFilter('global')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === 'global' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            Global Standings
          </button>
          <button
            onClick={() => setFilter('college')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === 'college' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <School className="w-3.5 h-3.5 inline mr-1" /> My College
          </button>
        </div>
      </div>

      {/* Top Podium & Leaderboard Content */}
      {displayList.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
          <Trophy className="w-12 h-12 text-amber-500/60 mx-auto animate-bounce" />
          <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">No Registered Student Rankings Yet</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Sign in with your profile and start solving practice tests to earn real XP, build accuracy, and claim your place on the global standings!
          </p>
        </div>
      ) : (
        <>
          {/* Top Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayList.slice(0, 3).map((student) => {
          let rankBadge = 'bg-amber-400 text-slate-950 border-amber-300';
          let borderStyle = 'border-amber-400/60';
          let crownColor = 'text-amber-400';

          if (student.rank === 2) {
            rankBadge = 'bg-slate-300 text-slate-950 border-slate-200';
            borderStyle = 'border-slate-300/60';
            crownColor = 'text-slate-300';
          } else if (student.rank === 3) {
            rankBadge = 'bg-amber-700 text-white border-amber-600';
            borderStyle = 'border-amber-600/60';
            crownColor = 'text-amber-600';
          }

          return (
            <div
              key={`${student.rank}_${student.name}`}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 ${borderStyle} shadow-lg relative flex flex-col justify-between ${
                student.isCurrentUser ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-9 h-9 rounded-xl font-extrabold text-sm flex items-center justify-center border shadow-sm ${rankBadge}`}>
                    #{student.rank}
                  </div>
                  <Crown className={`w-6 h-6 ${crownColor}`} />
                </div>

                <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  {student.name}
                  {student.isCurrentUser && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">YOU</span>
                  )}
                </h4>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{student.username}</div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-2">
                  <School className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{student.college}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                <span className="text-amber-500 text-sm">⚡ {student.xp} XP</span>
                <span className="text-emerald-600 dark:text-emerald-400">🎯 {student.accuracy}% Accuracy</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">College / Institution</th>
                <th className="py-4 px-6 text-center">XP Points</th>
                <th className="py-4 px-6 text-center">Accuracy</th>
                <th className="py-4 px-6 text-center">Tests Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayList.map((student) => (
                <tr
                  key={`${student.rank}_${student.username}`}
                  className={`transition ${
                    student.isCurrentUser
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {/* Rank Column */}
                  <td className="py-4 px-6 font-extrabold">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs ${
                      student.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                      student.rank === 2 ? 'bg-slate-300 text-slate-950 font-black' :
                      student.rank === 3 ? 'bg-amber-700 text-white font-black' : 'text-slate-500'
                    }`}>
                      #{student.rank}
                    </span>
                  </td>

                  {/* Student Name */}
                  <td className="py-4 px-6">
                    <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      {student.name}
                      {student.isCurrentUser && (
                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-indigo-600 text-white">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{student.username}</div>
                  </td>

                  {/* College */}
                  <td className="py-4 px-6 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{student.college}</span>
                    </div>
                  </td>

                  {/* XP */}
                  <td className="py-4 px-6 text-center font-extrabold text-amber-500">
                    ⚡ {student.xp}
                  </td>

                  {/* Accuracy */}
                  <td className="py-4 px-6 text-center font-bold text-emerald-600 dark:text-emerald-400">
                    {student.accuracy}%
                  </td>

                  {/* Tests Completed */}
                  <td className="py-4 px-6 text-center font-bold text-slate-700 dark:text-slate-300">
                    {student.testsCompleted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

    </div>
  );
};
