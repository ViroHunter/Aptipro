import React, { useState } from 'react';
import { X, Calculator as CalcIcon, Delete } from 'lucide-react';

export const CalculatorModal = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');

  if (!isOpen) return null;

  const handleBtn = (val) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === 'DEL') {
      setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (val === '=') {
      try {
        // Safe evaluation for basic math expressions
        const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/').replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setDisplay(String(Number(res.toFixed(6))));
      } catch (e) {
        setDisplay('Error');
      }
    } else if (val === '√') {
      try {
        const num = parseFloat(display);
        setDisplay(String(Math.sqrt(num)));
      } catch (e) {
        setDisplay('Error');
      }
    } else if (val === 'x²') {
      try {
        const num = parseFloat(display);
        setDisplay(String(num * num));
      } catch (e) {
        setDisplay('Error');
      }
    } else {
      setDisplay(prev => (prev === '0' || prev === 'Error' ? val : prev + val));
    }
  };

  const buttons = [
    ['C', 'DEL', '√', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'x²', '=']
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-xs shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
            <CalcIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Virtual Aptitude Calculator</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display Screen */}
        <div className="bg-slate-900 text-right text-2xl font-mono font-bold text-emerald-400 p-3 rounded-xl mb-4 overflow-x-auto border border-slate-800 shadow-inner min-h-[50px] flex items-center justify-end">
          {display}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn, idx) => {
            const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
            const isFunction = ['C', 'DEL', '√', 'x²'].includes(btn);

            let style = 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700';
            if (isOperator) style = 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold';
            if (isFunction) style = 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold';
            if (btn === '=') style = 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold';

            return (
              <button
                key={idx}
                onClick={() => handleBtn(btn)}
                className={`py-3 rounded-xl font-semibold text-base transition duration-150 flex items-center justify-center ${style}`}
              >
                {btn === 'DEL' ? <Delete className="w-4 h-4" /> : btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
