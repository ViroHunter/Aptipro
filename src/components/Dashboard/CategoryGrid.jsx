import React from 'react';
import { Calculator, Brain, BookOpen, BarChart3, Code, ShieldCheck, Play } from 'lucide-react';
import { CATEGORIES, QUESTIONS } from '../../data/questionsData';

export const CategoryGrid = ({ onSelectCategory }) => {
  const categoryConfigs = [
    {
      name: 'Quantitative Aptitude',
      icon: Calculator,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900',
      description: 'Percentages, Profit & Loss, Speed-Distance, Work-Time, Permutations & Probability.',
      topics: ['Profit & Loss', 'Speed & Distance', 'Work & Time', 'Probability']
    },
    {
      name: 'Logical Reasoning',
      icon: Brain,
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900',
      description: 'Series Completion, Blood Relations, Coding-Decoding, Syllogisms & Puzzles.',
      topics: ['Series', 'Blood Relations', 'Coding-Decoding', 'Syllogisms']
    },
    {
      name: 'Verbal Ability',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900',
      description: 'Grammar Rules, Sentence Correction, Synonyms-Antonyms & Para Jumbles.',
      topics: ['Grammar', 'Synonyms & Antonyms', 'Para Jumbles', 'Reading Comp']
    },
    {
      name: 'Data Interpretation',
      icon: BarChart3,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900',
      description: 'Bar Charts, Pie Charts, Tables & Data Analysis calculations.',
      topics: ['Pie Charts', 'Tables', 'Data Analysis', 'Percentage Ratios']
    },
    {
      name: 'Technical CS',
      icon: Code,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900',
      description: 'Data Structures, Algorithms, SQL Queries, OS & Networking MCQs.',
      topics: ['DSA', 'SQL & DBMS', 'Operating Systems', 'OOP Concepts']
    },
    {
      name: 'Cybersecurity & NetSec',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-700',
      bgColor: 'bg-teal-50/70 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900',
      description: 'Network Ports, Cryptography, Web Attacks (XSS/SQLi), OSI Firewall Layers & Hashing.',
      topics: ['NetSec & Ports', 'Cryptography', 'Web Attacks', 'WAF & Firewalls']
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Practice by Topic Category</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Choose a domain to start targeted practice tests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryConfigs.map((cat, idx) => {
          const Icon = cat.icon;
          const totalQ = QUESTIONS.filter(q => q.category === cat.name).length;

          return (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${cat.bgColor} shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${cat.color} text-white shadow-md shadow-indigo-500/10`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {totalQ} Questions
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {cat.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Topic Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cat.topics.map((t, tidx) => (
                    <span
                      key={tidx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectCategory(cat.name)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Practice {cat.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
