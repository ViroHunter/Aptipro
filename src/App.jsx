import React, { useState, useEffect } from 'react';
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
import { MockExamSelector } from './components/MockExam/MockExamSelector';
import { MockExamEngine } from './components/MockExam/MockExamEngine';
import { AuthModal } from './components/Auth/AuthModal';
import { AdminAuthModal } from './components/Admin/AdminAuthModal';
import { FacultyAuthModal } from './components/Faculty/FacultyAuthModal';
import { QUESTIONS as INITIAL_QUESTIONS, generateDynamicQuestion } from './data/questionsData';
import { useApp } from './context/AppContext';
import { Sparkles, ShieldCheck, GraduationCap, Lock } from 'lucide-react';
import { registerFacultyLogin } from './utils/cloudSecurityService';

// Detect secret portal param from URL (?portal=admin or ?portal=faculty)
function getPortalParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get('portal'); // 'admin' | 'faculty' | null
}

export function App() {
  const { userProfile } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeTest, setActiveTest] = useState(null);
  const [activeMockExam, setActiveMockExam] = useState(null);
  const [facultyUser, setFacultyUser] = useState(null);

  // Secret portal detection
  const portalParam = getPortalParam();
  const [portalMode] = useState(portalParam); // 'admin' | 'faculty' | null

  // Auth state for secret portals
  const [isAdminAuth, setIsAdminAuth] = useState(() => sessionStorage.getItem('aptipro_admin_auth') === 'true');
  const [isFacultyAuth, setIsFacultyAuth] = useState(() => sessionStorage.getItem('aptipro_faculty_auth') === 'true');
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isFacultyAuthOpen, setIsFacultyAuthOpen] = useState(false);

  // If portal mode is active, prompt auth on load if not already authenticated
  useEffect(() => {
    if (portalMode === 'admin' && !isAdminAuth) {
      setIsAdminAuthOpen(true);
    } else if (portalMode === 'faculty' && !isFacultyAuth) {
      setIsFacultyAuthOpen(true);
    }
  }, []);

  const [questionBank, setQuestionBank] = useState(() => {
    try {
      const saved = localStorage.getItem('aptipro_admin_questions');
      const custom = saved ? JSON.parse(saved) : [];
      return [...INITIAL_QUESTIONS, ...custom];
    } catch (e) {
      return INITIAL_QUESTIONS;
    }
  });

  const activeQuestions = questionBank.filter(q => q.status === 'approved' || !q.status);

  const saveCustomQuestionsToStorage = (updatedList) => {
    try {
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
    setActiveTest({ title, category, questions: questionList, timeLimitSeconds: timeSec });
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
    const dynList = [
      generateDynamicQuestion('Quantitative Aptitude'),
      generateDynamicQuestion('Cybersecurity & NetSec'),
      generateDynamicQuestion('Quantitative Aptitude'),
      generateDynamicQuestion('Cybersecurity & NetSec'),
      generateDynamicQuestion('Quantitative Aptitude')
    ];
    startTestWithQuestions('⚡ Infinite AI Practice Mode', 'Infinite Generated Practice', dynList, 300);
  };

  // ─── SECRET ADMIN PORTAL MODE ───────────────────────────────────────────────
  if (portalMode === 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Admin Portal Header */}
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-white text-lg">AptiPro Admin Portal</div>
              <div className="text-xs text-slate-400">Founder & Administrator Access</div>
            </div>
          </div>
          {isAdminAuth && (
            <button
              onClick={() => {
                sessionStorage.removeItem('aptipro_admin_auth');
                setIsAdminAuth(false);
                setIsAdminAuthOpen(true);
              }}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 transition"
            >
              <Lock className="w-3.5 h-3.5" /> Lock Portal
            </button>
          )}
        </header>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {isAdminAuth ? (
            <AdminPanel
              questions={questionBank}
              onAddQuestion={handleAddQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onApproveQuestion={handleApproveQuestion}
              onRejectQuestion={handleRejectQuestion}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
              <div className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-600/30">
                <ShieldCheck className="w-12 h-12 text-indigo-400 mx-auto" />
              </div>
              <h2 className="text-xl font-extrabold text-white">Admin Access Required</h2>
              <p className="text-slate-400 text-sm max-w-xs">This is a restricted area. Only the Founder can access this portal.</p>
              <button
                onClick={() => setIsAdminAuthOpen(true)}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Enter Admin Passcode
              </button>
            </div>
          )}
        </main>

        <AdminAuthModal
          isOpen={isAdminAuthOpen}
          onClose={() => setIsAdminAuthOpen(false)}
          onAuthenticated={() => {
            sessionStorage.setItem('aptipro_admin_auth', 'true');
            setIsAdminAuth(true);
            setIsAdminAuthOpen(false);
          }}
        />
      </div>
    );
  }

  // ─── SECRET FACULTY PORTAL MODE ─────────────────────────────────────────────
  if (portalMode === 'faculty') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Faculty Portal Header */}
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-white text-lg">AptiPro Faculty Portal</div>
              <div className="text-xs text-slate-400">
                {facultyUser ? `Welcome, ${facultyUser.name} — ${facultyUser.department}` : 'Question Contributor Access'}
              </div>
            </div>
          </div>
          {isFacultyAuth && (
            <button
              onClick={() => {
                sessionStorage.removeItem('aptipro_faculty_auth');
                setIsFacultyAuth(false);
                setFacultyUser(null);
                setIsFacultyAuthOpen(true);
              }}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 transition"
            >
              <Lock className="w-3.5 h-3.5" /> Lock Portal
            </button>
          )}
        </header>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {isFacultyAuth ? (
            <FacultyPortal
              facultyUser={facultyUser}
              questions={questionBank}
              onSubmitQuestion={handleAddQuestion}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
              <div className="p-4 rounded-2xl bg-violet-600/20 border border-violet-600/30">
                <GraduationCap className="w-12 h-12 text-violet-400 mx-auto" />
              </div>
              <h2 className="text-xl font-extrabold text-white">Faculty Access Required</h2>
              <p className="text-slate-400 text-sm max-w-xs">This portal is for authorized faculty members only.</p>
              <button
                onClick={() => setIsFacultyAuthOpen(true)}
                className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Enter Faculty Passcode
              </button>
            </div>
          )}
        </main>

        <FacultyAuthModal
          isOpen={isFacultyAuthOpen}
          onClose={() => setIsFacultyAuthOpen(false)}
          onAuthenticated={(details) => {
            sessionStorage.setItem('aptipro_faculty_auth', 'true');
            setIsFacultyAuth(true);
            setFacultyUser(details);
            setIsFacultyAuthOpen(false);
            // Auto-register faculty in admin panel roster
            registerFacultyLogin(details);
          }}
        />
      </div>
    );
  }

  // ─── MAIN STUDENT WEBSITE ────────────────────────────────────────────────────
  if (activeTest) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
        <QuizEngine testConfig={activeTest} onExit={() => setActiveTest(null)} />
      </div>
    );
  }

  if (activeMockExam) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
        <MockExamEngine mockExamConfig={activeMockExam} onExit={() => setActiveMockExam(null)} />
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

      {!userProfile && <AuthModal isOpen={true} />}

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'dashboard' && (
          <div className="animate-fadeIn">
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

        {activeTab === 'mock' && (
          <MockExamSelector
            questions={questionBank}
            onStartMockExam={(config) => setActiveMockExam(config)}
          />
        )}

        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'formulas' && <FormulaLibrary />}
        {activeTab === 'custom' && (
          <CustomQuizBuilder onStartCustomQuiz={(config) => setActiveTest(config)} />
        )}
        {activeTab === 'achievements' && <BadgesGrid />}
      </main>

      <Footer />
    </div>
  );
}
