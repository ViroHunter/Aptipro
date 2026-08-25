import React, { useState, useRef } from 'react';
import { ShieldCheck, Award, Printer, Download, X, School, Lock, CheckCircle2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BADGES } from '../../data/badgesData';

export const CertificateModal = ({ isOpen, onClose, allCompleted = false }) => {
  const { stats, unlockedBadges, userProfile } = useApp();
  const [bypassLock, setBypassLock] = useState(false);
  const certRef = useRef(null);

  if (!isOpen) return null;

  const isUnlocked = allCompleted || bypassLock;

  const displayName = userProfile?.name || 'Cyber Security Aspirant';
  const displayCollege = userProfile?.college || 'Security & Aptitude Academy';
  const displayUsername = userProfile?.username || '@aspirant';

  const certId = `VC-${Math.abs(stats.xp * 7919 + 48271).toString(16).toUpperCase()}-2026`;
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');

    // Draw Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 760);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 760);

    // Draw Gold Outer Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 1160, 720);

    // Inner Fine Border
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 1136, 696);

    // Header Subtitle
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🛡️ VIROHUNTER CIPHER SECURITY & APTITUDE ACADEMY', 600, 90);

    // Title
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold uppercase 42px serif';
    ctx.fillText('CERTIFICATE OF MASTERY', 600, 155);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('APTITUDE, REASONING & NETWORK SECURITY MASTERY', 600, 195);

    // Awarded text
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 20px serif';
    ctx.fillText('This certificate is proudly awarded to', 600, 260);

    // Recipient Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(displayName, 600, 325);

    // College & Handle
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`${displayCollege}  •  ${displayUsername}`, 600, 365);

    // Description
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '16px sans-serif';
    ctx.fillText('for successfully completing all 8 required Aptitude & Cybersecurity Mastery Achievements,', 600, 420);
    ctx.fillText('demonstrating outstanding proficiency in Quantitative Analysis, Logical Reasoning, and Network Security.', 600, 445);

    // Stats Box
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(250, 490, 700, 60);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(250, 490, 700, 60);

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`🏆 All 8 Achievements Unlocked    •    ⚡ ${stats.xp} Total XP Earned    •    🎯 ${stats.accuracy}% Accuracy`, 600, 526);

    // Footer Credential ID & Date
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('CREDENTIAL ID:', 70, 630);
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(certId, 70, 655);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Issued: ${issueDate}`, 70, 680);

    // Seal
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(600, 650, 42, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(600, 650, 38, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#fde68a';
    ctx.textAlign = 'center';
    ctx.font = 'extrabold 10px sans-serif';
    ctx.fillText('VIROHUNTER', 600, 646);
    ctx.font = '8px sans-serif';
    ctx.fillText('VERIFIED', 600, 660);

    // Signature - Founder Mohammed Bilal Shamsi
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold italic 22px serif';
    ctx.fillText('Mohammed Bilal Shamsi', 1130, 640);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('FOUNDER OF VIROHUNTER CIPHER', 1130, 662);
    ctx.fillStyle = '#818cf8';
    ctx.font = '11px sans-serif';
    ctx.fillText('ViroHunter Cipher Security Academy', 1130, 680);

    // Trigger Download
    const link = document.createElement('a');
    link.download = `Virohunter_Cipher_Certificate_${displayName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const unlockedIds = unlockedBadges.map(b => b.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-indigo-900 text-white rounded-3xl p-6 sm:p-8 w-full max-w-4xl shadow-2xl space-y-6 my-8">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${
              isUnlocked
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {isUnlocked ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <span className={`text-[10px] uppercase tracking-widest font-extrabold ${
                isUnlocked ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {isUnlocked ? 'Verified Official Credential' : 'Certificate Locked'}
              </span>
              <h3 className="text-lg font-extrabold text-white">Virohunter Cipher Certificate</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <>
                <button
                  onClick={handleDownloadImage}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition"
                >
                  <Download className="w-4 h-4" /> Download Certificate PNG
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
                >
                  <Printer className="w-4 h-4" /> Print / PDF
                </button>
              </>
            )}
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOCKED STATE INTERFACE */}
        {!isUnlocked ? (
          <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="text-xl font-extrabold text-white">Official Certificate Locked</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You have completed <strong className="text-amber-400">{unlockedBadges.length} of {BADGES.length}</strong> achievements. Complete all 8 achievements to issue your official verified certificate!
              </p>
            </div>

            {/* Achievement Progress Checklist */}
            <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left text-xs pt-2">
              {BADGES.map((b) => {
                const isBadgeDone = unlockedIds.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      isBadgeDone
                        ? 'bg-emerald-950/30 border-emerald-900 text-emerald-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span>{b.name}</span>
                    {isBadgeDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-slate-600">Locked</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Test / Dev Unlock Button */}
            <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Want to test certificate preview & download right now?
              </span>
              <button
                onClick={() => setBypassLock(true)}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Test Unlock & Download Now
              </button>
            </div>

          </div>
        ) : (
          /* UNLOCKED CERTIFICATE DISPLAY FRAME */
          <>
            {/* Student Details Info Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs gap-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Certified Student:</span>
                <span className="font-bold text-emerald-400">{displayName}</span>
                <span className="text-slate-500">({displayUsername})</span>
              </div>

              <div className="flex items-center gap-2">
                <School className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-300 font-semibold">{displayCollege}</span>
              </div>
            </div>

            <div
              ref={certRef}
              id="printable-certificate"
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border-4 border-amber-500/60 shadow-2xl relative overflow-hidden text-center space-y-6 animate-fadeIn"
            >
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <ShieldCheck className="w-96 h-96 text-amber-400" />
              </div>

              {/* Certificate Top Issuer Brand */}
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-extrabold text-xs tracking-widest uppercase shadow-inner">
                  <ShieldCheck className="w-4 h-4" /> Virohunter Cipher Security & Aptitude Academy
                </div>
                <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent uppercase drop-shadow-md">
                  Certificate of Mastery
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 tracking-widest uppercase">
                  Aptitude, Reasoning & Network Security Mastery
                </p>
              </div>

              {/* Recipient Section */}
              <div className="py-4 space-y-3 relative z-10">
                <p className="text-xs sm:text-sm font-serif italic text-slate-300">This certificate is proudly awarded to</p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide border-b-2 border-amber-500/40 inline-block pb-2 px-6">
                  {displayName}
                </h2>
                <div className="text-xs text-amber-400/90 font-bold uppercase tracking-wider">
                  {displayCollege} • {displayUsername}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed pt-2">
                  for successfully completing all 8 required Aptitude & Cybersecurity Mastery Achievements, demonstrating outstanding proficiency in Quantitative Analysis, Logical Reasoning, and Network Security Concepts.
                </p>
              </div>

              {/* Badge Unlocked Stats */}
              <div className="flex flex-wrap justify-center gap-4 py-2 relative z-10 text-xs font-bold">
                <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300">
                  🏆 All 8 Achievements Unlocked
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300">
                  ⚡ {stats.xp} Total XP Earned
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300">
                  🎯 {stats.accuracy}% Overall Accuracy
                </span>
              </div>

              {/* Certificate Footer / Signature & Seal */}
              <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                
                {/* Left: Verification Code */}
                <div className="text-left space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Credential ID</div>
                  <div className="font-mono text-xs font-bold text-indigo-400">{certId}</div>
                  <div className="text-[10px] text-slate-400">Issued: {issueDate}</div>
                </div>

                {/* Middle: Official Virohunter Seal */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-1 text-center border border-amber-400/50">
                    <ShieldCheck className="w-6 h-6 text-amber-400 mb-0.5" />
                    <span className="text-[7px] font-extrabold uppercase text-amber-300 tracking-tighter">VIROHUNTER</span>
                    <span className="text-[6px] text-slate-400">VERIFIED</span>
                  </div>
                </div>

                {/* Right: Signature - Founder Mohammed Bilal Shamsi */}
                <div className="text-right space-y-1">
                  <div className="font-serif italic text-lg font-bold text-amber-400">Mohammed Bilal Shamsi</div>
                  <div className="w-36 border-b border-slate-700 ml-auto" />
                  <div className="text-[10px] uppercase font-bold text-slate-400">FOUNDER OF VIROHUNTER CIPHER</div>
                  <div className="text-[9px] text-indigo-400 font-semibold">ViroHunter Cipher Academy</div>
                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};
