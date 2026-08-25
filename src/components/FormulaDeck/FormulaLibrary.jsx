import React, { useState } from 'react';
import { Search, BookOpen, Layers, Zap, Sparkles } from 'lucide-react';
import { FORMULAS } from '../../data/formulasData';
import { FlashcardDeck } from './FlashcardDeck';

export const FormulaLibrary = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('library'); // 'library', 'flashcards'

  const categories = ['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation', 'Technical CS'];

  const filtered = FORMULAS.filter(item => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchQuery = item.title.toLowerCase().includes(search.toLowerCase()) ||
                       item.topic.toLowerCase().includes(search.toLowerCase()) ||
                       item.formula.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Formula & Shortcut Cheat Deck
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Essential aptitude formulas, speed tricks, and rules for quick revision.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('library')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              viewMode === 'library' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5 inline mr-1" /> Library View
          </button>
          <button
            onClick={() => setViewMode('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              viewMode === 'flashcards' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1" /> Flashcards
          </button>
        </div>
      </div>

      {viewMode === 'flashcards' ? (
        <FlashcardDeck />
      ) : (
        <>
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search formulas or topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 sm:pb-0">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Formulas Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{item.topic}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>

                {/* Formula Highlight */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs font-bold border border-slate-800 shadow-inner">
                  {item.formula}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.explanation}
                </p>

                {item.example && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100">📌 Example: </span>
                    {item.example}
                  </div>
                )}

                {item.shortcut && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-start gap-2 border border-amber-200 dark:border-amber-900">
                    <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item.shortcut}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};
