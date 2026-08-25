import React from 'react';
import { Bookmark, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export const QuestionPalette = ({
  questions,
  currentIndex,
  onSelectQuestion,
  answers,
  markedForReview,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-between animate-slideLeft">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">Question Palette</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-sm">
            Close ✕
          </button>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-6 font-semibold">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500" /> Answered
          </div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500" /> Review
          </div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <span className="w-3 h-3 rounded-full bg-indigo-600" /> Current
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" /> Unattempted
          </div>
        </div>

        {/* Question Grid Buttons */}
        <div className="grid grid-cols-5 gap-2.5 max-h-[60vh] overflow-y-auto p-1">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = answers[q.id] !== undefined;
            const isMarked = markedForReview.includes(q.id);

            let bgStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
            if (isAnswered) bgStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';
            if (isMarked) bgStyle = 'bg-amber-500 text-slate-950 font-bold border-amber-400';
            if (isCurrent) bgStyle = 'ring-2 ring-indigo-600 dark:ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 font-extrabold ' + bgStyle;

            return (
              <button
                key={q.id}
                onClick={() => {
                  onSelectQuestion(idx);
                  onClose();
                }}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xs transition duration-150 relative ${bgStyle}`}
              >
                {idx + 1}
                {isMarked && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
        Total {questions.length} Questions in this session
      </div>
    </div>
  );
};
