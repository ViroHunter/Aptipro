import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, Edit3, Trash2, StickyNote } from 'lucide-react';

export const ScratchpadModal = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw', 'erase'
  const [notesText, setNotesText] = useState('');

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    if (mode === 'erase') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 16;
    } else {
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
    }
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2 font-bold text-sm text-indigo-400">
            <StickyNote className="w-5 h-5" />
            <span>Virtual Scratchpad & Rough Notes</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('draw')}
              className={`p-1.5 rounded-lg border text-xs font-bold transition flex items-center gap-1 ${
                mode === 'draw' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Pen
            </button>
            <button
              onClick={() => setMode('erase')}
              className={`p-1.5 rounded-lg border text-xs font-bold transition flex items-center gap-1 ${
                mode === 'erase' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" /> Eraser
            </button>
            <button
              onClick={clearCanvas}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-400 border border-slate-700 text-xs font-bold transition flex items-center gap-1"
              title="Clear drawings"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden mb-4 cursor-crosshair">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full touch-none"
          />
        </div>

        {/* Text Note Area */}
        <textarea
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
          placeholder="Type rough equations or step numbers here..."
          className="w-full h-20 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none font-mono"
        />
      </div>
    </div>
  );
};
