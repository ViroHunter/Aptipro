// Preset Blueprints for Full-Length Placement Mock Exams

export const MOCK_EXAM_PRESETS = [
  {
    id: 'tcs_nqt_full',
    title: 'National Level Campus Placement Mock (TCS / Infosys Pattern)',
    badge: 'Standard 45-Min Exam',
    description: 'Comprehensive 15-question placement assessment covering Quantitative, Logical Reasoning, and Technical CS/CyberSec sections.',
    totalTimeMinutes: 45,
    cutoffPercentage: 60,
    sections: [
      {
        id: 'sec_quant',
        name: 'Quantitative Aptitude',
        category: 'Quantitative Aptitude',
        questionCount: 5,
        cutoffPercentage: 60,
        weight: 33.3
      },
      {
        id: 'sec_logical',
        name: 'Logical Reasoning & DI',
        category: 'Logical Reasoning',
        questionCount: 5,
        cutoffPercentage: 60,
        weight: 33.3
      },
      {
        id: 'sec_tech',
        name: 'Technical CS & Cybersecurity',
        category: 'Cybersecurity & NetSec',
        questionCount: 5,
        cutoffPercentage: 60,
        weight: 33.3
      }
    ]
  },
  {
    id: 'cybersec_specialist_mock',
    title: 'Cybersecurity & Tech Specialist Exam',
    badge: 'Specialist 30-Min Exam',
    description: 'Advanced 10-question technical diagnostic focusing on Network Security, Ports, Protocols, and Technical CS concepts.',
    totalTimeMinutes: 30,
    cutoffPercentage: 70,
    sections: [
      {
        id: 'sec_netsec',
        name: 'Network & System Security',
        category: 'Cybersecurity & NetSec',
        questionCount: 5,
        cutoffPercentage: 70,
        weight: 50
      },
      {
        id: 'sec_tech_cs',
        name: 'Technical CS & Algorithms',
        category: 'Technical CS',
        questionCount: 5,
        cutoffPercentage: 70,
        weight: 50
      }
    ]
  },
  {
    id: 'quick_placement_diagnostic',
    title: 'Express 15-Minute Placement Diagnostic',
    badge: 'Speed Diagnostic',
    description: 'Fast-track 6-question assessment designed for quick evaluation across Quantitative, Verbal, and Technical domains.',
    totalTimeMinutes: 15,
    cutoffPercentage: 65,
    sections: [
      {
        id: 'sec_quant_fast',
        name: 'Quantitative Basics',
        category: 'Quantitative Aptitude',
        questionCount: 2,
        cutoffPercentage: 50,
        weight: 33.3
      },
      {
        id: 'sec_verbal_fast',
        name: 'Verbal Ability',
        category: 'Verbal Ability',
        questionCount: 2,
        cutoffPercentage: 50,
        weight: 33.3
      },
      {
        id: 'sec_tech_fast',
        name: 'CyberSec & Systems',
        category: 'Cybersecurity & NetSec',
        questionCount: 2,
        cutoffPercentage: 50,
        weight: 33.3
      }
    ]
  }
];

// Helper to assemble full mock exam from available question bank
export const generateMockExamFromPreset = (preset, questionBank) => {
  const assembledSections = preset.sections.map(section => {
    // Find questions matching category or fallback to all questions
    let matches = questionBank.filter(q => (q.status === 'approved' || !q.status) && q.category === section.category);
    if (matches.length < section.questionCount) {
      // Fallback matching
      const extra = questionBank.filter(q => (q.status === 'approved' || !q.status) && !matches.includes(q));
      matches = [...matches, ...extra];
    }
    // Shuffle and pick section questions
    const selectedQs = matches.sort(() => 0.5 - Math.random()).slice(0, section.questionCount);

    return {
      ...section,
      questions: selectedQs.map((q, idx) => ({
        ...q,
        sectionId: section.id,
        sectionName: section.name,
        questionIndexInSection: idx + 1
      }))
    };
  });

  const allQuestions = assembledSections.flatMap(s => s.questions);

  return {
    presetId: preset.id,
    title: preset.title,
    badge: preset.badge,
    totalTimeSeconds: preset.totalTimeMinutes * 60,
    sections: assembledSections,
    totalQuestions: allQuestions.length,
    allQuestions
  };
};
