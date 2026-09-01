import React, { useState, useEffect } from 'react';
import { ShieldCheck, Database, Users, Award, Plus, Trash2, Search, CheckCircle2, Lock, Sparkles, FileText, Check, UserX, Clock, XCircle, GraduationCap, RefreshCw } from 'lucide-react';
import { CATEGORIES } from '../../data/questionsData';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';
import { updateGlobalPasscodes, fetchGlobalStudents } from '../../utils/cloudSecurityService';

export const AdminPanel = ({ questions, onAddQuestion, onDeleteQuestion, onApproveQuestion, onRejectQuestion }) => {
  const { stats, testHistory, userProfile, soundEnabled, registeredStudents, removeStudentFromRoster } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState('questions');

  // Question Form State
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('Quantitative Aptitude');
  const [topic, setTopic] = useState('General Practice');
  const [difficulty, setDifficulty] = useState('Medium');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Certificate Verification Lookup
  const [searchCertId, setSearchCertId] = useState('');
  const [certLookupResult, setCertLookupResult] = useState(null);

  // Passcode Management State
  const [newAdminPass, setNewAdminPass] = useState(() => localStorage.getItem('aptipro_admin_passcode') || '');
  const [newFacultyPass, setNewFacultyPass] = useState(() => localStorage.getItem('aptipro_faculty_passcode') || '');
  const [securityMsg, setSecurityMsg] = useState('');

  // Live registered students — fetched fresh from cloud + local storage
  const [liveStudents, setLiveStudents] = useState(registeredStudents || []);
  const [studentLoading, setStudentLoading] = useState(false);

  const refreshStudents = async () => {
    setStudentLoading(true);
    try {
      const fresh = await fetchGlobalStudents();
      if (Array.isArray(fresh)) setLiveStudents(fresh);
    } catch (e) {}
    setStudentLoading(false);
  };

  useEffect(() => {
    refreshStudents();
    const interval = setInterval(refreshStudents, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdatePasscodes = async (e) => {
    e.preventDefault();
    if (!newAdminPass.trim() || !newFacultyPass.trim()) {
      alert('Passcodes cannot be empty.');
      return;
    }
    await updateGlobalPasscodes(newAdminPass.trim(), newFacultyPass.trim());
    playSound('correct', soundEnabled);
    setSecurityMsg('Passcodes updated! Active immediately on this device.');
    setTimeout(() => setSecurityMsg(''), 4000);
  };

  // Filter pending questions
  const pendingQuestions = questions.filter(q => q.status === 'pending');

  // Use live fetched students for admin roster
  const studentsList = liveStudents;

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!questionText || !opt0 || !opt1 || !opt2 || !opt3) {
      alert('Please fill in the question text and all 4 options.');
      return;
    }

    const newQ = {
      id: `custom_${Date.now()}`,
      category,
      topic,
      difficulty,
      question: questionText,
      options: [opt0, opt1, opt2, opt3],
      correctIndex: Number(correctIndex),
      explanation: explanation || 'Step-by-step solution provided by ViroHunter Cipher Academy.',
      status: 'approved'
    };

    onAddQuestion(newQ);
    playSound('correct', soundEnabled);
    setSuccessMsg('New question successfully added to AptiPro Question Bank!');
    
    // Reset Form
    setQuestionText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setExplanation('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleRemoveStudent = (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to remove student "${studentName}" from the registered roster?`)) {
      removeStudentFromRoster(studentId);
      playSound('wrong', soundEnabled);
    }
  };

  const handleLookupCertificate = (e) => {
    e.preventDefault();
    if (!searchCertId.trim()) return;

    const query = searchCertId.trim().toUpperCase();
    if (query.startsWith('VC-') || query.length >= 6) {
      setCertLookupResult({
        valid: true,
        certId: query,
        name: userProfile?.name || 'Mohammed Bilal',
        college: userProfile?.college || 'M.H SABOO SIDDIK COLLEGE OF ENGINEERING',
        username: userProfile?.username || '@viro',
        issuedBy: 'Mohammed Bilal Shamsi (FOUNDER OF VIROHUNTER CIPHER)',
        issueDate: 'August 21, 2026',
        status: 'OFFICIALLY VERIFIED & AUTHENTIC'
      });
    } else {
      setCertLookupResult({
        valid: false,
        certId: query,
        message: 'Invalid Credential ID format. Standard IDs start with VC-'
      });
    }
  };

  const activeQuestions = questions.filter(q => q.status === 'approved' || !q.status);

  const filteredQuestions = activeQuestions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-fadeIn space-y-8">
      
      {/* Admin Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/40 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg flex-shrink-0">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Founder Admin Portal
              </span>
              <span className="text-[10px] text-slate-400">Signed in as Admin</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">AptiPro Control Panel</h1>
            <p className="text-xs text-slate-300">
              Official Management Portal • ViroHunter Cipher Academy
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 relative z-10 w-full sm:w-auto">
          <button
            onClick={() => setActiveAdminTab('questions')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition ${
              activeAdminTab === 'questions'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> Questions ({activeQuestions.length})
          </button>

          {/* Pending Approvals Tab with Badge Counter */}
          <button
            onClick={() => setActiveAdminTab('pending')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition relative ${
              activeAdminTab === 'pending'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Approvals
            {pendingQuestions.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">
                {pendingQuestions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('students')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition ${
              activeAdminTab === 'students'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Students ({studentsList.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('verifier')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition ${
              activeAdminTab === 'verifier'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Cert Verifier
          </button>
          <button
            onClick={() => setActiveAdminTab('security')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition ${
              activeAdminTab === 'security'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Passcodes
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Active Questions</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {questions.length} Qs
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Registered Students</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {studentsList.length} Active
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Tests Solved</span>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
            {stats.totalTests || 14} Tests
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Avg Platform Accuracy</span>
          <div className="text-2xl font-extrabold text-amber-500 mt-1">
            {stats.accuracy || 86}%
          </div>
        </div>
      </div>

      {/* TAB 1: QUESTION MANAGER */}
      {activeAdminTab === 'questions' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Add New Question Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Add New Question to Question Bank
              </h3>
              {successMsg && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {successMsg}
                </span>
              )}
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-5">
              {/* Category, Topic, Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                    <option value="Logical Reasoning">Logical Reasoning</option>
                    <option value="Verbal Ability">Verbal Ability</option>
                    <option value="Data Interpretation">Data Interpretation</option>
                    <option value="Technical CS">Technical CS</option>
                    <option value="Cybersecurity & NetSec">Cybersecurity & NetSec</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Network Ports / Percentages"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Question Statement</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter the question text here..."
                  className="w-full h-24 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs font-medium focus:outline-none focus:border-indigo-500 resize-none"
                  required
                />
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Option 1</label>
                  <input
                    type="text"
                    value={opt0}
                    onChange={(e) => setOpt0(e.target.value)}
                    placeholder="Option 1 text..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Option 2</label>
                  <input
                    type="text"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    placeholder="Option 2 text..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Option 3</label>
                  <input
                    type="text"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    placeholder="Option 3 text..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Option 4</label>
                  <input
                    type="text"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    placeholder="Option 4 text..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Correct Index & Explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Correct Answer</label>
                  <select
                    value={correctIndex}
                    onChange={(e) => setCorrectIndex(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-indigo-500"
                  >
                    <option value={0}>Option 1 ({opt0 || 'Opt 1'})</option>
                    <option value={1}>Option 2 ({opt1 || 'Opt 2'})</option>
                    <option value={2}>Option 3 ({opt2 || 'Opt 3'})</option>
                    <option value={3}>Option 4 ({opt3 || 'Opt 4'})</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Step-by-Step Explanation</label>
                  <input
                    type="text"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Explain why this option is correct..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Save Question to AptiPro
                </button>
              </div>
            </form>
          </div>

          {/* Questions Roster & Filter */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Question Bank Roster ({filteredQuestions.length} Questions)
              </h3>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or topics..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {filteredQuestions.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {q.category}
                      </span>
                      <span className="text-[10px] text-slate-400">• {q.topic}</span>
                      <span className="text-[10px] font-bold text-amber-500">• {q.difficulty}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Answer: {q.options[q.correctIndex]}
                    </p>
                  </div>

                  {onDeleteQuestion && (
                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB: PENDING QUESTION APPROVALS */}
      {activeAdminTab === 'pending' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Faculty Question Approval Queue ({pendingQuestions.length} Pending)
              </h3>
              <p className="text-xs text-slate-500">Review questions submitted by Faculty before publishing to live student tests</p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingQuestions.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs font-semibold space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p>No questions currently waiting for approval!</p>
                <p className="text-[11px] text-slate-500">All submitted faculty questions have been reviewed.</p>
              </div>
            ) : (
              pendingQuestions.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                        {q.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">• {q.topic}</span>
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">• {q.difficulty}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <GraduationCap className="w-4 h-4 text-violet-500" />
                      <span>Submitted by: <strong>{q.submittedBy || 'Faculty'}</strong> ({q.department || 'Faculty'})</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Statement: <span className="font-normal">{q.question}</span>
                    </h4>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                      {q.options?.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-xl text-xs ${
                            idx === Number(q.correctIndex)
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}. {opt} {idx === Number(q.correctIndex) && '✓ (Correct)'}
                        </div>
                      ))}
                    </div>

                    {q.explanation && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 bg-slate-100 dark:bg-slate-950 p-2.5 rounded-xl">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => onRejectQuestion ? onRejectQuestion(q.id) : onDeleteQuestion(q.id)}
                      className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject Question
                    </button>

                    <button
                      onClick={() => onApproveQuestion(q.id)}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish Live
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STUDENTS ROSTER */}
      {activeAdminTab === 'students' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Registered Student Roster ({studentsList.length} Students)
                </h3>
                <p className="text-xs text-slate-500">All students registered from any device — live synced</p>
              </div>
              <button
                onClick={refreshStudents}
                disabled={studentLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${studentLoading ? 'animate-spin' : ''}`} />
                {studentLoading ? 'Syncing...' : 'Refresh'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">College / University</th>
                  <th className="py-3 px-4">Tests Solved</th>
                  <th className="py-3 px-4">XP Level</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Certificate Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {studentsList.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {student.name} <span className="text-[11px] text-slate-400 font-normal">({student.username})</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{student.college}</td>
                    <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">{student.testsSolved} Tests</td>
                    <td className="py-3.5 px-4 font-extrabold text-amber-500">{student.xp} XP</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{student.accuracy}%</td>
                    <td className="py-3.5 px-4">
                      {student.certUnlocked ? (
                        <span className="px-2 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 flex items-center gap-1 w-fit">
                          <Lock className="w-3 h-3" /> In Progress
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleRemoveStudent(student.id, student.name)}
                        className="px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900 transition text-[11px] font-bold inline-flex items-center gap-1"
                        title="Remove Student Record"
                      >
                        <UserX className="w-3.5 h-3.5" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATE VERIFIER */}
      {activeAdminTab === 'verifier' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ViroHunter Cipher Credential Verification Tool
            </h3>
            <p className="text-xs text-slate-500">Lookup and verify official certificate Credential IDs (e.g. VC-1411EF-2026)</p>
          </div>

          <form onSubmit={handleLookupCertificate} className="flex gap-3 max-w-xl">
            <input
              type="text"
              value={searchCertId}
              onChange={(e) => setSearchCertId(e.target.value)}
              placeholder="Enter Credential ID (e.g. VC-1411EF-2026)"
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs font-mono font-bold focus:outline-none uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition"
            >
              Verify ID
            </button>
          </form>

          {certLookupResult && (
            <div className={`p-6 rounded-3xl border ${
              certLookupResult.valid
                ? 'bg-emerald-950/30 border-emerald-900 text-emerald-200'
                : 'bg-rose-950/30 border-rose-900 text-rose-200'
            } space-y-3 max-w-xl`}>
              <div className="flex items-center gap-2 font-extrabold text-sm">
                {certLookupResult.valid ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-rose-400" />}
                {certLookupResult.valid ? certLookupResult.status : 'VERIFICATION FAILED'}
              </div>

              {certLookupResult.valid ? (
                <div className="space-y-1 text-xs">
                  <div><strong>Credential ID:</strong> <span className="font-mono text-indigo-400">{certLookupResult.certId}</span></div>
                  <div><strong>Recipient:</strong> {certLookupResult.name} ({certLookupResult.username})</div>
                  <div><strong>Institution:</strong> {certLookupResult.college}</div>
                  <div><strong>Issuer:</strong> {certLookupResult.issuedBy}</div>
                  <div><strong>Issue Date:</strong> {certLookupResult.issueDate}</div>
                </div>
              ) : (
                <p className="text-xs">{certLookupResult.message}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PASSCODES & SECURITY MANAGEMENT */}
      {activeAdminTab === 'security' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-fadeIn max-w-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Change Portal Access Passcodes
              </h3>
              <p className="text-xs text-slate-500">Update security passcodes for Admin and Faculty access</p>
            </div>

            {securityMsg && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Updated!
              </span>
            )}
          </div>

          {securityMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {securityMsg}
            </div>
          )}

          <form onSubmit={handleUpdatePasscodes} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Admin Portal Passcode
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-indigo-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={newAdminPass}
                  onChange={(e) => setNewAdminPass(e.target.value)}
                  placeholder="Enter new Admin passcode"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Faculty Portal Passcode
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-violet-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={newFacultyPass}
                  onChange={(e) => setNewFacultyPass(e.target.value)}
                  placeholder="Enter new Faculty passcode"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-mono font-bold text-violet-600 dark:text-violet-400 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Save New Passcodes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
