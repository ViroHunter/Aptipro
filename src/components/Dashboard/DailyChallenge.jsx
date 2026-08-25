import React, { useState } from 'react';
import { Flame, CheckCircle, XCircle, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { QUESTIONS } from '../../data/questionsData';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const DailyChallenge = ({ onStartFullPractice }) => {
  const { soundEnabled } = useApp();
  // Pick Q1 as Daily Challenge or deterministic based on day
  const dailyQuestion = QUESTIONS[0];

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index) => {
    if (submitted) return;
    setSelectedOption(index);
    playSound('select', soundEnabled);
  };

  const handleSubmit = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    const isCorrect = selectedOption === dailyQuestion.correctIndex;
    playSound(isCorrect ? 'correct' : 'incorrect', soundEnabled);
  };

  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50 relative overflow-hidden">
      
      {/* Background Glow Overlay */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-indigo-800/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">Daily Challenge</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                {dailyQuestion.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Question of the Day</h2>
          </div>
        </div>

        <button
          onClick={onStartFullPractice}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
        >
          <Sparkles className="w-4 h-4" /> Start Quick 5-Min Quiz
        </button>
      </div>

      {/* Question Box */}
      <div className="space-y-4">
        <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
          {dailyQuestion.question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {dailyQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === dailyQuestion.correctIndex;
            
            let btnStyle = 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-200';
            if (submitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200 font-bold';
              }
            } else if (isSelected) {
              btnStyle = 'bg-indigo-600/40 border-indigo-400 text-white font-bold ring-2 ring-indigo-500/50';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                className={`p-3.5 rounded-xl border text-left text-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {submitted && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />}
                {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Submit Action or Solution Box */}
        {!submitted ? (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-md ${
                selectedOption !== null
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="mt-4 p-4 rounded-2xl bg-indigo-900/40 border border-indigo-700/50 text-slate-200 text-xs sm:text-sm leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-300">
              <HelpCircle className="w-4 h-4" /> Detailed Explanation:
            </div>
            <p className="whitespace-pre-line text-slate-300">{dailyQuestion.explanation}</p>
          </div>
        )}
      </div>

    </div>
  );
};
