import React from 'react';
import { Target, CheckCircle2, Zap, Clock, Award, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StatsOverview = () => {
  const { stats } = useApp();

  const statCards = [
    {
      label: 'Overall Accuracy',
      value: `${stats.accuracy}%`,
      subtext: `${stats.correctAnswers} of ${stats.totalQuestions} correct`,
      icon: Target,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900'
    },
    {
      label: 'Questions Solved',
      value: stats.totalQuestions,
      subtext: `Across ${stats.totalTests} test session(s)`,
      icon: CheckCircle2,
      color: 'from-indigo-500 to-violet-600',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900'
    },
    {
      label: 'Avg Speed / Ques',
      value: `${stats.avgSpeedSeconds}s`,
      subtext: stats.avgSpeedSeconds < 60 ? '⚡ Excellent speed!' : 'Needs speed practice',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900'
    },
    {
      label: 'XP & Level',
      value: `${stats.xp} XP`,
      subtext: `Level ${stats.level}: ${stats.levelTitle}`,
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`p-5 rounded-2xl border ${card.bgColor} shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.label}
              </span>
              <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${card.textColor}`}>
                {card.value}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
