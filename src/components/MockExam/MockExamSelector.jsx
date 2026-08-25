import React from 'react';
import { ShieldCheck, Clock, Award, Play, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { MOCK_EXAM_PRESETS, generateMockExamFromPreset } from '../../data/mockExamsData';

export const MockExamSelector = ({ questions, onStartMockExam }) => {
  const handleSelectPreset = (preset) => {
    const assembledMock = generateMockExamFromPreset(preset, questions);
    onStartMockExam(assembledMock);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-fadeIn space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Campus Hiring Simulation
            </span>
            <span className="text-[10px] text-slate-400">Strict Timed Exams</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Full-Length Placement Mock Exams
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Simulate official placement assessments (TCS, Infosys, Wipro, CyberSec Specialist). Feature multi-sectional cutoffs, timed navigation, and printable readiness scorecards.
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Preset Blueprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_EXAM_PRESETS.map((preset) => (
          <div
            key={preset.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-500/50 transition duration-200 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {preset.badge}
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {preset.totalTimeMinutes} Mins
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              {/* Sections List */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Included Sections & Cutoffs:
                </span>
                {preset.sections.map((sec, idx) => (
                  <div key={sec.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {idx + 1}. {sec.name} ({sec.questionCount} Qs)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      Cutoff: {sec.cutoffPercentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSelectPreset(preset)}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Mock Exam ({preset.totalTimeMinutes}m)
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
