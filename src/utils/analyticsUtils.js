export const calculateStats = (testHistory) => {
  if (!testHistory || testHistory.length === 0) {
    return {
      totalTests: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      totalTimeSeconds: 0,
      avgSpeedSeconds: 0,
      xp: 0,
      level: 1,
      levelTitle: 'Novice Aspirant',
      categoryAccuracy: {},
      weakTopics: []
    };
  }

  let totalTests = testHistory.length;
  let totalQuestions = 0;
  let correctAnswers = 0;
  let totalTimeSeconds = 0;
  let xp = 0;

  const topicStats = {};

  testHistory.forEach(test => {
    totalQuestions += test.totalQuestions || 0;
    correctAnswers += test.score || 0;
    totalTimeSeconds += test.timeTakenSeconds || 0;
    xp += (test.score || 0) * 10 + (test.percentage >= 80 ? 50 : 20);

    // Topic performance tracking
    if (test.answers) {
      Object.values(test.answers).forEach(item => {
        const cat = item.category || 'General';
        const topic = item.topic || 'General Aptitude';
        
        if (!topicStats[topic]) {
          topicStats[topic] = { correct: 0, total: 0, category: cat };
        }
        topicStats[topic].total += 1;
        if (item.isCorrect) {
          topicStats[topic].correct += 1;
        }
      });
    }
  });

  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const avgSpeedSeconds = totalQuestions > 0 ? Math.round(totalTimeSeconds / totalQuestions) : 0;

  // Level calculation
  const level = Math.floor(xp / 200) + 1;
  let levelTitle = 'Novice Aspirant';
  if (level >= 10) levelTitle = 'Grandmaster';
  else if (level >= 7) levelTitle = 'Aptitude Wizard';
  else if (level >= 5) levelTitle = 'Logic Scholar';
  else if (level >= 3) levelTitle = 'Quant Enthusiast';
  else if (level >= 2) levelTitle = 'Problem Solver';

  // Weak topics (accuracy < 60% with at least 3 questions attempted)
  const weakTopics = Object.entries(topicStats)
    .map(([topic, stat]) => ({
      topic,
      category: stat.category,
      accuracy: Math.round((stat.correct / stat.total) * 100),
      total: stat.total
    }))
    .filter(item => item.accuracy < 70 && item.total >= 2)
    .sort((a, b) => a.accuracy - b.accuracy);

  return {
    totalTests,
    totalQuestions,
    correctAnswers,
    accuracy,
    totalTimeSeconds,
    avgSpeedSeconds,
    xp,
    level,
    levelTitle,
    topicStats,
    weakTopics
  };
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
