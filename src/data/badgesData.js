export const BADGES = [
  {
    id: 'first_step',
    name: 'First Step',
    description: 'Completed your first aptitude practice test',
    icon: 'Footprints',
    color: 'from-blue-500 to-indigo-600',
    checkUnlocked: (stats) => stats.totalTests >= 1
  },
  {
    id: 'sharpshooter',
    name: 'Sharpshooter',
    description: 'Achieved 100% accuracy in any test',
    icon: 'Target',
    color: 'from-emerald-500 to-teal-600',
    checkUnlocked: (stats, history) => history && history.some(t => t.percentage === 100)
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Average time under 45 seconds per question',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    checkUnlocked: (stats) => stats.totalQuestions >= 10 && stats.avgSpeedSeconds <= 45
  },
  {
    id: 'quant_master',
    name: 'Quant Master',
    description: 'Solved 25+ Quantitative Aptitude questions',
    icon: 'Calculator',
    color: 'from-purple-500 to-pink-600',
    checkUnlocked: (stats, history) => {
      let count = 0;
      history?.forEach(h => {
        if (h.category === 'Quantitative Aptitude') count += h.totalQuestions;
      });
      return count >= 25;
    }
  },
  {
    id: 'logic_wizard',
    name: 'Logic Wizard',
    description: 'Solved 25+ Logical Reasoning questions',
    icon: 'Brain',
    color: 'from-cyan-500 to-blue-600',
    checkUnlocked: (stats, history) => {
      let count = 0;
      history?.forEach(h => {
        if (h.category === 'Logical Reasoning') count += h.totalQuestions;
      });
      return count >= 25;
    }
  },
  {
    id: 'cyber_defender',
    name: 'Cyber Defender',
    description: 'Solved 5+ Cybersecurity & NetSec questions',
    icon: 'ShieldCheck',
    color: 'from-emerald-600 to-teal-700',
    checkUnlocked: (stats, history) => {
      let count = 0;
      history?.forEach(h => {
        if (h.category === 'Cybersecurity & NetSec') count += h.totalQuestions;
      });
      return count >= 5;
    }
  },
  {
    id: 'streak_warrior',
    name: 'Streak Warrior',
    description: 'Maintained a 3-day practice streak',
    icon: 'Flame',
    color: 'from-rose-500 to-red-600',
    checkUnlocked: (stats, history, streak) => (streak || 0) >= 3
  },
  {
    id: 'grandmaster_prep',
    name: 'Aptitude Pro',
    description: 'Earned 1,000+ XP in AptiPro',
    icon: 'Crown',
    color: 'from-amber-400 to-yellow-600',
    checkUnlocked: (stats) => stats.xp >= 1000
  }
];
