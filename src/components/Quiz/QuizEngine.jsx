import React, { useState, useEffect } from 'react';
import { Clock, Calculator, Edit3, Grid, Bookmark, Check, ChevronLeft, ChevronRight, AlertTriangle, Send } from 'lucide-react';
import { QuestionPalette } from './QuestionPalette';
import { CalculatorModal } from './CalculatorModal';
import { ScratchpadModal } from './ScratchpadModal';
import { QuizResults } from './QuizResults';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';
import { formatTime } from '../../utils/analyticsUtils';

export const QuizEngine = ({ testConfig, onExit }) => {
  const { soundEnabled, addTestResult, bookmarks, toggleBookmark } = useApp();

  const [questions] = useState(testConfig.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  
  // Modals state
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(testConfig.timeLimitSeconds || 300);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteQuiz();
          return 0;
        }
        if (prev <= 10 && prev > 0) {
          playSound('tick', soundEnabled);
        }
        return prev - 1;
      });
      setTimeTaken(t => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  const currentQ = questions[currentIndex];
  const selectedOption = answers[currentQ.id];
  const isCurrentMarked = markedForReview.includes(currentQ.id);

  const handleSelectOption = (optIdx) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
    playSound('select', soundEnabled);
  };

  const handleClearOption = () => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleMark = () => {
    setMarkedForReview(prev =>
      prev.includes(currentQ.id)
        ? prev.filter(id => id !== currentQ.id)
        : [...prev, currentQ.id]
    );
  };

  const handleCompleteQuiz = () => {
    setIsFinished(true);
    playSound('complete', soundEnabled);

    let score = 0;
    const answeredMap = {};

    questions.forEach(q => {
      const userChoice = answers[q.id];
      const isCorrect = userChoice === q.correctIndex;
      if (isCorrect) score += 1;

      answeredMap[q.id] = {
        questionId: q.id,
        category: q.category,
        topic: q.topic,
        userAnswer: userChoice,
        correctAnswer: q.correctIndex,
        isCorrect
      };
    });

    const percentage = Math.round((score / questions.length) * 100);

    const resultObj = {
      id: 'test_' + Date.now(),
      testName: testConfig.title || 'Aptitude Practice',
      category: testConfig.category || 'Mixed Aptitude',
      score,
      totalQuestions: questions.length,
      percentage,
      timeTakenSeconds: timeTaken,
      answers: answeredMap,
      userAnswers: answers,
      questions,
      date: new Date().toISOString()
    };

    addTestResult(resultObj);
    setFinalResult(resultObj);
  };

  if (isFinished && finalResult) {
    return (
      <QuizResults
        result={finalResult}
        onRetake={() => {
          setIsFinished(false);
          setAnswers({});
          setMarkedForReview([]);
          setCurrentIndex(0);
          setTimeLeft(testConfig.timeLimitSeconds || 300);
          setTimeTaken(0);
        }}
        onGoDashboard={onExit}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 animate-fadeIn">
      
      {/* Test Header Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
            {testConfig.category || 'Practice Test'}
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {testConfig.title || 'Aptitude Assessment'}
          </h2>
        </div>

        {/* Timer & Tools */}
        <div className="flex items-center gap-3">
          {/* Timer Display */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-extrabold text-sm border shadow-inner ${
            timeLeft < 60 ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Calculator Trigger */}
          <button
            onClick={() => setIsCalcOpen(true)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
            title="Open Scientific Calculator"
          >
            <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </button>

          {/* Scratchpad Trigger */}
          <button
            onClick={() => setIsScratchpadOpen(true)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
            title="Open Scratchpad"
          >
            <Edit3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </button>

          {/* Question Palette Trigger */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5 font-bold text-xs"
            title="Question Palette"
          >
            <Grid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Palette</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 mb-6">
        
        {/* Question Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase">
              {currentQ.category} • {currentQ.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                isCurrentMarked
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isCurrentMarked ? 'fill-current' : ''}`} />
              {isCurrentMarked ? 'Marked for Review' : 'Mark for Review'}
            </button>

            <button
              onClick={() => toggleBookmark(currentQ.id)}
              className={`p-2 rounded-xl transition ${
                bookmarks.includes(currentQ.id) ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Bookmark Question"
            >
              <Bookmark className={`w-4 h-4 ${bookmarks.includes(currentQ.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
          {currentQ.question}
        </div>

        {/* Options Grid */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base transition-all duration-150 flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 dark:border-slate-700 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {isSelected && <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedOption !== undefined && (
              <button
                onClick={handleClearOption}
                className="text-xs font-bold text-slate-500 hover:text-rose-500 transition"
              >
                Clear Choice
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-1 shadow-md shadow-indigo-600/20"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsConfirmSubmitOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <Send className="w-4 h-4" /> Submit Exam
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Modals */}
      <QuestionPalette
        questions={questions}
        currentIndex={currentIndex}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
        answers={answers}
        markedForReview={markedForReview}
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />

      <CalculatorModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
      />

      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Confirm Submit Modal */}
      {isConfirmSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Ready to Submit?</h3>
            
            <p className="text-xs text-slate-600 dark:text-slate-400">
              You have answered {Object.keys(answers).length} out of {questions.length} questions.
              {markedForReview.length > 0 && ` (${markedForReview.length} marked for review)`}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setIsConfirmSubmitOpen(false);
                  handleCompleteQuiz();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
