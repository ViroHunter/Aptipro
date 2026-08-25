import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StatsOverview } from './components/Dashboard/StatsOverview';
import { DailyChallenge } from './components/Dashboard/DailyChallenge';
import { CategoryGrid } from './components/Dashboard/CategoryGrid';
import { WeakAreasCard } from './components/Dashboard/WeakAreasCard';
import { QuizEngine } from './components/Quiz/QuizEngine';
import { FormulaLibrary } from './components/FormulaDeck/FormulaLibrary';
import { CustomQuizBuilder } from './components/CustomQuiz/CustomQuizBuilder';
import { BadgesGrid } from './components/Achievements/BadgesGrid';
import { Leaderboard } from './components/Leaderboard/Leaderboard';
import { AdminPanel } from './components/Admin/AdminPanel';
import { FacultyPortal } from './components/Faculty/FacultyPortal';
import { AuthModal } from './components/Auth/AuthModal';
import { QUESTIONS as INITIAL_QUESTIONS, generateDynamicQuestion } from './data/questionsData';
import { useApp } from './context/AppContext';
import { Sparkles } from 'lucide-react';

export function App() {
  const { userProfile } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeTest, setActiveTest] = useState(null);
  const [facultyUser, setFacultyUser] = useState(null);

  const [questionBank, setQuestionBank] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_admin_questions');
      const custom = saved ? JSON.parse(saved) : [];
      return [...INITIAL_QUESTIONS, ...custom];
    } catch (e) {
      return INITIAL_QUESTIONS;
    }
  });

  // Active questions available for student practice quizzes (approved or seed questions)
  const activeQuestions = questionBank.filter(q => q.status === 'approved' || !q.status);

  const saveCustomQuestionsToStorage = (updatedList) => {
    try {
      // Filter out seed questions when saving custom/faculty questions
      const customOnly = updatedList.filter(q => q.id.startsWith('custom_') || q.id.startsWith('faculty_'));
      localStorage.setItem('aptipro_admin_questions', JSON.stringify(customOnly));
    } catch (e) {}
  };

  const handleAddQuestion = (newQ) => {
    const updated = [newQ, ...questionBank];
    setQuestionBank(updated);
    saveCustomQuestionsToStorage(updated);
  };

  const handleApproveQuestion = (qId) => {
    const updated = questionBank.map(q => q.id === qId ? { ...q, status: 'approved' } : q);
    setQuestionBank(updated);
    saveCustomQuestionsToStorage(updated);
  };

  const handleRejectQuestion = (qId) => {
    const updated = questionBank.filter(q => q.id !== qId);
    setQuestionBank(updated);
    saveCustomQuestionsToStorage(updated);
  };

  const handleDeleteQuestion = (qId) => {
    const updated = questionBank.filter(q => q.id !== qId);
    setQuestionBank(updated);
    saveCustomQuestionsToStorage(updated);
  };

  const startTestWithQuestions = (title, category, questionList, timeSec = 300) => {
    setActiveTest({
      title,
      category,
      questions: questionList,
      timeLimitSeconds: timeSec
    });
  };

  const handleStartCategoryPractice = (categoryName) => {
    const list = activeQuestions.filter(q => q.category === categoryName);
    const finalQuestions = list.length > 0 ? list : activeQuestions.slice(0, 5);
    startTestWithQuestions(`${categoryName} Practice`, categoryName, finalQuestions, 300);
  };

  const handleStartPracticeTopic = (topicName) => {
    const list = activeQuestions.filter(q => q.topic === topicName || q.category === topicName);
    const finalQuestions = list.length > 0 ? list : activeQuestions;
    startTestWithQuestions(`Targeted Practice: ${topicName}`, topicName, finalQuestions, 300);
  };

  const handleStartQuickPractice = () => {
    const shuffled = [...activeQuestions].sort(() => 0.5 - Math.random());
    startTestWithQuestions('Quick 5-Min Aptitude Quiz', 'Mixed Aptitude', shuffled.slice(0, 5), 300);
  };

  const handleStartInfinitePractice = () => {
    // Generate 5 dynamic infinite questions on the fly!
    const dynList = [
      generateDynamicQuestion('Quantitative Aptitude'),
      generateDynamicQuestion('Cybersecurity & NetSec'),
      generateDynamicQuestion('Quantitative Aptitude'),
      generateDynamicQuestion('Cybersecurity & NetSec'),
      generateDynamicQuestion('Quantitative Aptitude')
    ];
    startTestWithQuestions('⚡ Infinite AI Practice Mode', 'Infinite Generated Practice', dynList, 300);
  };

  if (activeTest) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
        <QuizEngine
          testConfig={activeTest}
          onExit={() => setActiveTest(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFacultyLogin={(details) => setFacultyUser(details)}
      />

      {/* Auto prompt login onboarding if first time user */}
      {!userProfile && (
        <AuthModal isOpen={true} />
      )}

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'dashboard' && (
          <div className="animate-fadeIn">
            {/* Header greeting & Infinite Practice Button */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  Welcome back, <span className="text-indigo-600 dark:text-indigo-400">{userProfile ? userProfile.name : 'Student'}</span> 👋
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {userProfile
                    ? `${userProfile.college} • ${userProfile.username}`
                    : 'Sharpen your quantitative skills, logical reasoning, and placement test readiness.'}
                </p>
              </div>

              {/* Action Button: Infinite AI Quiz Mode */}
              <div>
                <button
                  onClick={handleStartInfinitePractice}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs shadow-md transition"
                >
                  <Sparkles className="w-4 h-4" /> Infinite AI Quiz Mode
                </button>
              </div>
            </div>

            <StatsOverview />

            <DailyChallenge onStartFullPractice={handleStartQuickPractice} />

            <WeakAreasCard onStartPracticeTopic={handleStartPracticeTopic} />

            <CategoryGrid onSelectCategory={handleStartCategoryPractice} />
          </div>
        )}

        {activeTab === 'leaderboard' && <Leaderboard />}

        {activeTab === 'formulas' && <FormulaLibrary />}

        {activeTab === 'custom' && (
          <CustomQuizBuilder onStartCustomQuiz={(config) => setActiveTest(config)} />
        )}

        {activeTab === 'achievements' && <BadgesGrid />}

        {activeTab === 'faculty' && (
          <FacultyPortal
            facultyUser={facultyUser}
            questions={questionBank}
            onSubmitQuestion={handleAddQuestion}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            questions={questionBank}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onApproveQuestion={handleApproveQuestion}
            onRejectQuestion={handleRejectQuestion}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

