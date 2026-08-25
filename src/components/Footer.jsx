import React from 'react';
import { Zap, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200">AptiPro</span>
          <span className="text-xs text-slate-500">© {new Date().getFullYear()} AptiPro Engine</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Instant Performance Analytics
          </span>
          <span>•</span>
          <span>Quantitative, Logical & Verbal Prep</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Job Aspirants
          </span>
        </div>

      </div>
    </footer>
  );
};
