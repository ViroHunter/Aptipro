import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, CheckCircle2, Bookmark, AlertCircle, ArrowLeft, ArrowRight, Layers, FileCheck } from 'lucide-react';
import { formatTime } from '../../utils/analyticsUtils';
import { MockExamScorecard } from './MockExamScorecard';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const MockExamEngine = ({ mockExamConfig, onExit }) => {
  const { soundEnabled } = useApp();

  const [activeSectionId, setActiveSectionId] = useState(mockExamConfig.sections[0].id);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(mockExamConfig.totalTimeSeconds);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [examResult, setExamResult] = useState(null);

  // Active section questions
  const activeSection = mockExamConfig.sections.find(s => s.id === activeSectionId) || mockExamConfig.sections[0];
  const activeQuestions = activeSection.questions;
  const currentQuestion = activeQuestions[activeQuestionIndex] || activeQuestions[0];

  // Countdown timer effect
  useEffect(() => {
    if (isExamSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleForceSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamSubmitted]);

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleToggleReview = (qId) => {
    setMarkedForReview(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleForceSubmit = () => {
    const finalTimeTaken = mockExamConfig.totalTimeSeconds - timeLeft;
    setExamResult({
      title: mockExamConfig.title,
      badge: mockExamConfig.badge,
      sections: mockExamConfig.sections,
      allQuestions: mockExamConfig.allQuestions,
      totalQuestions: mockExamConfig.totalQuestions,
      userAnswers,
      timeTakenSeconds: finalTimeTaken
    });
    setIsExamSubmitted(true);
    playSound('correct', soundEnabled);
  };

  const handleSubmitExam = () => {
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = mockExamConfig.totalQuestions - answeredCount;

    let confirmMsg = `Are you sure you want to submit your Mock Exam?\n\nAnswered: ${answeredCount} / ${mockExamConfig.totalQuestions}`;
    if (unansweredCount > 0) {
      confirmMsg += `\nUnanswered: ${unansweredCount} questions remaining!`;
    }

    if (window.confirm(confirmMsg)) {
      handleForceSubmit();
    }
  };

  if (isExamSubmitted && examResult) {
    return (
      <MockExamScorecard
        mockResult={examResult}
        onRetake={() => {
          setIsExamSubmitted(false);
          setUserAnswers({});
          setMarkedForReview([]);
          setTimeLeft(mockExamConfig.totalTimeSeconds);
        }}
        onExit={onExit}
      />
    );
  }

  const isLastQuestionInSection = activeQuestionIndex === activeQuestions.length - 1;
  const isFirstQuestionInSection = activeQuestionIndex === 0;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-fadeIn space-y-6">
      
      {/* Header & Timer Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {mockExamConfig.badge}
            </span>
            <span className="text-[11px] text-slate-400">Strict Timed Exam</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {mockExamConfig.title}
          </h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-400 font-mono font-extrabold text-lg flex items-center gap-2 shadow-inner">
            <Clock className="w-5 h-5 text-amber-500 animate-pulse" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={handleSubmitExam}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <FileCheck className="w-4 h-4" /> Submit Exam
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
        {mockExamConfig.sections.map((sec, idx) => {
          const isActive = sec.id === activeSectionId;
          const sectionAnswered = sec.questions.filter(q => userAnswers[q.id] !== undefined).length;

          return (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSectionId(sec.id);
                setActiveQuestionIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition flex-shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Section {idx + 1}: {sec.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {sectionAnswered}/{sec.questions.length} Qs
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Test Body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Active Question Box */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-extrabold text-sm flex items-center justify-center">
                Q{activeQuestionIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase">
                {activeSection.name} • Question {activeQuestionIndex + 1} of {activeQuestions.length}
              </span>
            </div>

            <button
              onClick={() => handleToggleReview(currentQuestion.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                markedForReview.includes(currentQuestion.id)
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${markedForReview.includes(currentQuestion.id) ? 'fill-current' : ''}`} />
              {markedForReview.includes(currentQuestion.id) ? 'Marked for Review' : 'Mark for Review'}
            </button>
          </div>

          {/* Question Statement */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((optionText, optIdx) => {
              const isSelected = userAnswers[currentQuestion.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl text-xs font-extrabold flex items-center justify-center border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{optionText}</span>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={isFirstQuestionInSection}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                isFirstQuestionInSection
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={() => setActiveQuestionIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
              disabled={isLastQuestionInSection}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                isLastQuestionInSection
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md'
              }`}
            >
              Next Question <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
            {activeSection.name} Question Palette
          </h4>

          <div className="grid grid-cols-5 gap-2">
            {activeQuestions.map((q, idx) => {
              const isAns = userAnswers[q.id] !== undefined;
              const isRev = markedForReview.includes(q.id);
              const isCurr = idx === activeQuestionIndex;

              let btnClass = 'bg-slate-100 dark:bg-slate-950 text-slate-600 border-slate-200 dark:border-slate-800';
              if (isCurr) {
                btnClass = 'ring-2 ring-indigo-500 bg-indigo-600 text-white font-extrabold';
              } else if (isRev) {
                btnClass = 'bg-amber-500 text-slate-950 font-extrabold';
              } else if (isAns) {
                btnClass = 'bg-emerald-600 text-white font-extrabold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`h-9 rounded-xl text-xs flex items-center justify-center border transition ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Palette Legend */}
          <div className="space-y-2 text-[11px] pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Answered
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Marked for Review
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-950 border inline-block" /> Unanswered
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
