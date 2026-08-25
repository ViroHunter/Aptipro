import React, { useState } from 'react';
import { Database, Plus, Upload, Sparkles, X, Check, HelpCircle, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioUtils';

export const QuestionBankModal = ({ isOpen, onClose, onImportQuestions }) => {
  const { soundEnabled } = useApp();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const sampleFormat = JSON.stringify([
    {
      "question": "What is the default port for SSH?",
      "category": "Cybersecurity & NetSec",
      "topic": "Network Ports",
      "difficulty": "Easy",
      "options": ["Port 21", "Port 22", "Port 80", "Port 443"],
      "correctIndex": 1,
      "explanation": "SSH uses port 22 for secure remote login."
    }
  ], null, 2);

  const handleImport = () => {
    try {
      if (!jsonText.trim()) {
        setError('Please paste valid JSON question data.');
        return;
      }

      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setError('JSON data must be an array of question objects.');
        return;
      }

      // Format questions
      const formatted = parsed.map((q, idx) => ({
        id: `imp_${Date.now()}_${idx}`,
        category: q.category || 'General Aptitude',
        topic: q.topic || 'General Practice',
        difficulty: q.difficulty || 'Medium',
        question: q.question || 'Custom Question',
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || 'Step-by-step solution.'
      }));

      onImportQuestions(formatted);
      playSound('correct', soundEnabled);
      setSuccessMsg(`Successfully imported ${formatted.length} custom questions!`);
      setError('');
      setJsonText('');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1500);
    } catch (e) {
      setError('Invalid JSON format! Please check the structure.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Expand Question Bank</h3>
              <p className="text-xs text-slate-400">Import custom JSON questions or paste external question papers</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-900 text-rose-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-900 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" /> {successMsg}
          </div>
        )}

        {/* JSON Textarea */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Paste Questions JSON Array
            </label>
            <button
              onClick={() => setJsonText(sampleFormat)}
              className="text-[11px] font-bold text-indigo-400 hover:underline"
            >
              Load Sample Template
            </button>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='Paste your JSON array of questions here...'
            className="w-full h-48 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Import Custom Questions
          </button>
        </div>

      </div>
    </div>
  );
};
