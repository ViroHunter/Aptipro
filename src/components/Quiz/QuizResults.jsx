import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, Clock, RefreshCw, BookOpen, ArrowRight, Bookmark, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTime } from '../../utils/analyticsUtils';

export const QuizResults = ({ result, onRetake, onGoDashboard }) => {
  const { bookmarks, toggleBookmark } = useApp();

  const isPassed = result.percentage >= 75;

  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [isPassed]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Banner */}
      <div className={`p-8 rounded-3xl text-white shadow-2xl mb-8 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 ${
        isPassed
          ? 'bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 border border-emerald-500/40'
          : 'bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border border-rose-500/40'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border uppercase tracking-wider flex items-center gap-1.5 ${
              isPassed
                ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40'
                : 'bg-amber-500/30 text-amber-200 border-amber-400/40'
            }`}>
              {isPassed ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
              {isPassed ? 'Level Cleared (75%+ Passed)' : '75% Pass Score Required'}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white">
            {isPassed ? '🎉 QUALIFIED FOR NEXT ROUND!' : '⚠️ LEVEL NOT PASSED'}
          </h2>
          
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            {isPassed
              ? `Outstanding work! You scored ${result.percentage}% (${result.score}/${result.totalQuestions}), exceeding the required 75% threshold to advance!`
              : `You scored ${result.percentage}% (${result.score}/${result.totalQuestions}). A minimum score of 75% is required to pass this level and unlock the next round.`}
          </p>
        </div>

        {/* Score Ring */}
        <div className={`flex-shrink-0 w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center text-center shadow-2xl ${
          isPassed
            ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300'
            : 'bg-rose-950/60 border-rose-400 text-rose-300'
        }`}>
          <span className="text-3xl font-extrabold">{result.percentage}%</span>
          <span className="text-[10px] uppercase font-extrabold tracking-wider">
            {isPassed ? 'PASSED (75%+)' : 'NEEDS 75%+'}
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 uppercase">Correct</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 mt-1">
            <CheckCircle2 className="w-5 h-5" /> {result.score}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 uppercase">Incorrect / Skipped</span>
          <div className="text-2xl font-extrabold text-rose-500 flex items-center justify-center gap-1 mt-1">
            <XCircle className="w-5 h-5" /> {result.totalQuestions - result.score}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 uppercase">Time Taken</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-1 mt-1">
            <Clock className="w-5 h-5" /> {formatTime(result.timeTakenSeconds)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 uppercase">XP Earned</span>
          <div className="text-2xl font-extrabold text-amber-500 flex items-center justify-center gap-1 mt-1">
            <Award className="w-5 h-5" /> +{isPassed ? result.score * 15 + 30 : result.score * 5}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        <button
          onClick={onRetake}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition ${
            !isPassed
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold'
              : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          {!isPassed ? '🔁 Retry Level (Require 75% to Qualify)' : 'Retake Level'}
        </button>

        <button
          onClick={onGoDashboard}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-xs shadow-lg transition ${
            isPassed
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          {isPassed ? 'Proceed to Next Round / Dashboard' : 'Back to Dashboard'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Item-by-item Solution Breakdown */}
      <div className="space-y-6">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Step-by-Step Solutions & Analysis
        </h3>

        {result.questions.map((q, idx) => {
          const userAns = result.userAnswers[q.id];
          const isCorrect = userAns === q.correctIndex;
          const isBookmarked = bookmarks.includes(q.id);

          return (
            <div
              key={q.id}
              className={`p-6 rounded-3xl border ${
                isCorrect
                  ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-950'
                  : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-950'
              } shadow-sm space-y-4`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center ${
                    isCorrect ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    Q{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase">{q.category} • {q.topic}</span>
                </div>

                <button
                  onClick={() => toggleBookmark(q.id)}
                  className={`p-2 rounded-xl transition ${
                    isBookmarked ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                {q.question}
              </p>

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const isUserSelection = userAns === optIdx;
                  const isCorrectOpt = optIdx === q.correctIndex;

                  let optClass = 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800';
                  if (isCorrectOpt) {
                    optClass = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold';
                  } else if (isUserSelection && !isCorrectOpt) {
                    optClass = 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-bold';
                  }

                  return (
                    <div key={optIdx} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}>
                      <span>{opt}</span>
                      {isCorrectOpt && <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Correct Answer</span>}
                      {isUserSelection && !isCorrectOpt && <span className="text-[10px] uppercase font-bold text-rose-500">Your Answer</span>}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">💡 Step-by-Step Explanation:</span>
                {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
