import React, { useState } from 'react';
import { Sliders, Play, CheckCircle, Clock, Zap } from 'lucide-react';
import { CATEGORIES, QUESTIONS } from '../../data/questionsData';

export const CustomQuizBuilder = ({ onStartCustomQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(5);

  const availableFiltered = QUESTIONS.filter((q) => {
    const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  const handleLaunch = () => {
    // Shuffle available questions
    const shuffled = [...availableFiltered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(numQuestions, shuffled.length));

    if (selected.length === 0) return;

    onStartCustomQuiz({
      title: `Custom Test (${selectedCategory})`,
      category: selectedCategory,
      questions: selected,
      timeLimitSeconds: timeLimitMinutes * 60
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-fadeIn">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Custom Quiz Generator</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tailor your exam parameters for targeted practice</p>
            </div>
          </div>
        </div>

        {/* Form Options */}
        <div className="space-y-6">
          
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Select Category
            </label>
            <div className="flex flex-wrap gap-2">
              {['All', ...CATEGORIES].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Difficulty Level
            </label>
            <div className="flex gap-3">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition border ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count & Time Limit sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Number of Questions
                </label>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">{numQuestions} Qs</span>
              </div>
              <input
                type="range"
                min="3"
                max={Math.max(3, availableFiltered.length)}
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
              <span className="text-[11px] text-slate-400">Max available: {availableFiltered.length}</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Time Limit (Minutes)
                </label>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">{timeLimitMinutes} Mins</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
              <span className="text-[11px] text-slate-400">~{Math.round((timeLimitMinutes * 60) / numQuestions)}s per question</span>
            </div>
          </div>

        </div>

        {/* Launch Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {availableFiltered.length > 0
              ? `Ready to generate ${Math.min(numQuestions, availableFiltered.length)} custom question test`
              : 'No questions match selected filters!'}
          </div>

          <button
            onClick={handleLaunch}
            disabled={availableFiltered.length === 0}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-sm transition shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" /> Start Custom Test Now
          </button>
        </div>

      </div>
    </div>
  );
};
