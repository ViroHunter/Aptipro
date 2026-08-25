import React from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeakAreasCard = ({ onStartPracticeTopic }) => {
  const { stats } = useApp();
  const weakTopics = stats.weakTopics || [];

  if (weakTopics.length === 0) {
    return (
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-md">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">No Critical Weak Areas Detected</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Keep completing practice tests! AptiPro will analyze your performance and highlight topics needing improvement.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 shadow-md">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">Recommended Practice Areas</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Topics where your accuracy is below 70%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {weakTopics.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                {item.category}
              </span>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">{item.topic}</h5>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-extrabold text-rose-500">{item.accuracy}% Accuracy</span>
                <span className="text-[11px] text-slate-400">({item.total} Qs)</span>
              </div>
            </div>

            <button
              onClick={() => onStartPracticeTopic(item.topic)}
              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-200 transition"
              title="Practice this weak topic"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
