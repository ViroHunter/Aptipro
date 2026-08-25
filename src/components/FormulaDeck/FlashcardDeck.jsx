import React, { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { FORMULAS } from '../../data/formulasData';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const FlashcardDeck = () => {
  const { soundEnabled } = useApp();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = FORMULAS[index];

  const handleFlip = () => {
    setFlipped(!flipped);
    playSound('select', soundEnabled);
  };

  const handleNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % FORMULAS.length);
    playSound('select', soundEnabled);
  };

  const handlePrev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + FORMULAS.length) % FORMULAS.length);
    playSound('select', soundEnabled);
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Flashcard Mode ({index + 1} of {FORMULAS.length})
        </span>
        <button
          onClick={handleFlip}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
        >
          <RotateCw className="w-3.5 h-3.5" /> Flip Card
        </button>
      </div>

      {/* Card Container */}
      <div
        onClick={handleFlip}
        className="cursor-pointer min-h-[280px] p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white border border-indigo-800/50 shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:scale-[1.01]"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
              {card.category}
            </span>
            <span className="text-xs text-slate-400 font-semibold">{card.topic}</span>
          </div>

          {!flipped ? (
            <div className="py-6 text-center space-y-3">
              <h3 className="text-2xl font-extrabold text-white">{card.title}</h3>
              <p className="text-xs text-indigo-300 font-medium">(Click card to reveal formula & shortcut)</p>
            </div>
          ) : (
            <div className="py-2 space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 font-mono font-bold text-emerald-300 text-sm">
                {card.formula}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{card.explanation}</p>
              {card.shortcut && (
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  ⚡ Shortcut: {card.shortcut}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-slate-400 font-semibold pt-4 border-t border-indigo-800/40">
          {flipped ? 'Showing Solution' : 'Question Prompt'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
        >
          Next Card <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
