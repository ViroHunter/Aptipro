import React, { useState } from 'react';
import { GraduationCap, Plus, CheckCircle2, Clock, AlertCircle, FileText, Send, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const FacultyPortal = ({ facultyUser, questions, onSubmitQuestion }) => {
  const { soundEnabled } = useApp();
  const [activeTab, setActiveTab] = useState('upload');

  // Form State
  const [category, setCategory] = useState('Quantitative Aptitude');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionText, setQuestionText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filter faculty's own submissions or all pending submissions
  const mySubmissions = questions.filter(q => 
    q.submittedBy === facultyUser?.name || q.status === 'pending'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText || !opt0 || !opt1 || !opt2 || !opt3 || !topic) {
      alert('Please complete all required fields including topic and options.');
      return;
    }

    const newQ = {
      id: `faculty_${Date.now()}`,
      category,
      topic: topic.trim(),
      difficulty,
      question: questionText.trim(),
      options: [opt0.trim(), opt1.trim(), opt2.trim(), opt3.trim()],
      correctIndex: Number(correctIndex),
      explanation: explanation.trim() || `Submitted by ${facultyUser?.name || 'Faculty'} (${facultyUser?.department || 'Department'})`,
      status: 'pending',
      submittedBy: facultyUser?.name || 'Faculty Member',
      department: facultyUser?.department || 'General',
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onSubmitQuestion(newQ);
    playSound('correct', soundEnabled);
    setSuccessMsg('Question submitted successfully! Sent to Founder Admin for review.');

    // Reset Form
    setQuestionText('');
    setTopic('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setExplanation('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-fadeIn space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-violet-500/40 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg flex-shrink-0">
            <GraduationCap className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-violet-500/20 text-violet-300 border border-violet-500/40">
                Faculty Contributor Portal
              </span>
              <span className="text-[10px] text-slate-400">Limited Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Welcome, {facultyUser?.name || 'Professor'}
            </h1>
            <p className="text-xs text-slate-300">
              {facultyUser?.department || 'Academic Contributor'} • Question Creation & Quality Management
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 relative z-10 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition ${
              activeTab === 'upload'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Submit Question
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition ${
              activeTab === 'submissions'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> My Submissions ({mySubmissions.length})
          </button>
        </div>
      </div>

      {/* Info Notice Box */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-3">
        <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <div>
          <strong>Admin Verification Notice:</strong> Questions submitted by Faculty undergo mandatory Admin review. Once approved by Founder Admin, your questions will be published live into student practice tests.
        </div>
      </div>

      {/* TAB 1: UPLOAD QUESTION */}
      {activeTab === 'upload' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              Create & Submit New Question
            </h3>
            {successMsg && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {successMsg}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category, Topic, Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-violet-500"
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
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Topic Name *</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Profit & Loss / OS Concepts"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Difficulty Level *</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-violet-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Question Statement *</label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Write clear and accurate question text here..."
                className="w-full h-28 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs font-medium focus:outline-none focus:border-violet-500 resize-none"
                required
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Option A *</label>
                <input
                  type="text"
                  value={opt0}
                  onChange={(e) => setOpt0(e.target.value)}
                  placeholder="Option A text..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Option B *</label>
                <input
                  type="text"
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  placeholder="Option B text..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Option C *</label>
                <input
                  type="text"
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  placeholder="Option C text..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Option D *</label>
                <input
                  type="text"
                  value={opt3}
                  onChange={(e) => setOpt3(e.target.value)}
                  placeholder="Option D text..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Correct Index & Explanation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Correct Option *</label>
                <select
                  value={correctIndex}
                  onChange={(e) => setCorrectIndex(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-violet-500"
                >
                  <option value={0}>Option A ({opt0 || 'Opt A'})</option>
                  <option value={1}>Option B ({opt1 || 'Opt B'})</option>
                  <option value={2}>Option C ({opt2 || 'Opt C'})</option>
                  <option value={3}>Option D ({opt3 || 'Opt D'})</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Detailed Explanation</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Provide step-by-step solution derivation..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs shadow-lg shadow-violet-600/30 transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Question for Admin Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: MY SUBMISSIONS */}
      {activeTab === 'submissions' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 animate-fadeIn">
          <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              Submission Log & Approval Status
            </h3>
            <p className="text-xs text-slate-500">Track status of questions you submitted for review</p>
          </div>

          <div className="space-y-3">
            {mySubmissions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                No submitted questions found yet. Click "Submit Question" to create your first item!
              </div>
            ) : (
              mySubmissions.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                        {q.category}
                      </span>
                      <span className="text-[10px] text-slate-400">• {q.topic}</span>
                      <span className="text-[10px] font-bold text-amber-500">• {q.difficulty}</span>
                    </div>

                    <div>
                      {q.status === 'pending' && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending Admin Review
                        </span>
                      )}
                      {q.status === 'approved' && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved & Live
                        </span>
                      )}
                      {q.status === 'rejected' && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
                  
                  <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1">
                    <span><strong>Correct Option:</strong> {q.options[q.correctIndex]}</span>
                    <span>• Submitted by {q.submittedBy || facultyUser?.name}</span>
                    {q.submittedAt && <span>• {q.submittedAt}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
