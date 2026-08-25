import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Clock, Printer, RefreshCw, ArrowRight, Award, BookOpen, Layers } from 'lucide-react';
import { formatTime } from '../../utils/analyticsUtils';
import { useApp } from '../../context/AppContext';

export const MockExamScorecard = ({ mockResult, onRetake, onExit }) => {
  const { userProfile } = useApp();

  // Evaluate section cutoffs
  const sectionBreakdown = mockResult.sections.map(sec => {
    const secQuestions = sec.questions;
    let secScore = 0;
    secQuestions.forEach(q => {
      if (mockResult.userAnswers[q.id] === q.correctIndex) {
        secScore += 1;
      }
    });
    const secPct = Math.round((secScore / secQuestions.length) * 100);
    const passedCutoff = secPct >= sec.cutoffPercentage;

    return {
      ...sec,
      score: secScore,
      total: secQuestions.length,
      percentage: secPct,
      passedCutoff
    };
  });

  const allSectionsPassed = sectionBreakdown.every(s => s.passedCutoff);
  const totalScore = sectionBreakdown.reduce((acc, curr) => acc + curr.score, 0);
  const totalQuestions = mockResult.totalQuestions;
  const overallPercentage = Math.round((totalScore / totalQuestions) * 100);

  useEffect(() => {
    if (allSectionsPassed) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 }
      });
    }
  }, [allSectionsPassed]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn print:p-0 print:max-w-none">
      
      {/* Header Banner */}
      <div className={`p-8 rounded-3xl text-white shadow-2xl mb-8 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 ${
        allSectionsPassed
          ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/40'
          : 'bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border border-amber-500/40'
      }`}>
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border uppercase tracking-wider flex items-center gap-1.5 ${
              allSectionsPassed
                ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40'
                : 'bg-amber-500/30 text-amber-200 border-amber-400/40'
            }`}>
              {allSectionsPassed ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {allSectionsPassed ? 'TIER-1 PLACEMENT QUALIFIED' : 'SECTIONAL CUTOFF MISSING'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {mockResult.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Candidate: <strong>{userProfile?.name || 'Student'}</strong> ({userProfile?.college || 'AptiPro Candidate'}) • {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Score Pill */}
        <div className={`flex-shrink-0 w-36 h-36 rounded-3xl border-4 flex flex-col items-center justify-center text-center shadow-2xl ${
          allSectionsPassed
            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
            : 'bg-amber-950/80 border-amber-400 text-amber-300'
        }`}>
          <span className="text-4xl font-extrabold">{overallPercentage}%</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
            {totalScore} / {totalQuestions} Marks
          </span>
        </div>
      </div>

      {/* Action Bar (Hide during print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF Scorecard
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetake}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition"
          >
            <RefreshCw className="w-4 h-4" /> Retake Exam
          </button>
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs transition"
          >
            Exit Scorecard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sectional Performance Cards Grid */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Sectional Cutoff Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sectionBreakdown.map((sec) => (
            <div
              key={sec.id}
              className={`p-5 rounded-3xl border shadow-sm space-y-3 ${
                sec.passedCutoff
                  ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-900'
                  : 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{sec.name}</span>
                {sec.passedCutoff ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Cutoff Met
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Below Cutoff
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {sec.score} / {sec.total} <span className="text-xs text-slate-500">({sec.percentage}%)</span>
                </span>
                <span className="text-xs text-slate-400">Required: {sec.cutoffPercentage}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    sec.passedCutoff ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${sec.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item-by-item Solution Breakdown */}
      <div className="space-y-6">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Complete Exam Answer Key & Explanations
        </h3>

        {mockResult.allQuestions.map((q, idx) => {
          const userAns = mockResult.userAnswers[q.id];
          const isCorrect = userAns === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-3xl border ${
                isCorrect
                  ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-950'
                  : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-950'
              } shadow-sm space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase">
                  {q.sectionName} • Question {idx + 1}
                </span>
                {isCorrect ? (
                  <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Correct (+1 Mark)
                  </span>
                ) : (
                  <span className="text-xs font-extrabold text-rose-500 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Incorrect (0 Marks)
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt, optIdx) => {
                  const isUserSel = userAns === optIdx;
                  const isCorrectOpt = optIdx === q.correctIndex;
                  let optStyle = 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300';
                  if (isCorrectOpt) optStyle = 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300';
                  else if (isUserSel) optStyle = 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold border border-rose-300';

                  return (
                    <div key={optIdx} className={`p-2.5 rounded-xl border ${optStyle}`}>
                      {String.fromCharCode(65 + optIdx)}. {opt}
                      {isCorrectOpt && ' ✓ (Correct)'}
                      {isUserSel && !isCorrectOpt && ' ✗ (Your Answer)'}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <p className="text-xs text-slate-600 dark:text-slate-400 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-xl">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
