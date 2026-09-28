export type BadgeCategory = 'streak' | 'practice' | 'quiz' | 'mastery';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface UserBadge {
  id: string;
  name: string;
  category: BadgeCategory;
  description: string;
  criteria: string;
  icon: string;
  tier: BadgeTier;
  target: number;
  currentProgress?: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  xpReward: number;
}

export const BADGE_DEFINITIONS: Omit<UserBadge, 'isUnlocked' | 'currentProgress' | 'unlockedAt'>[] = [
  // --- Streaks ---
  {
    id: 'streak_spark',
    name: 'First Spark',
    category: 'streak',
    description: 'Began the daily mathematical habit with consistent focus.',
    criteria: '3-day consecutive study streak',
    icon: 'Flame',
    tier: 'bronze',
    target: 3,
    xpReward: 50,
  },
  {
    id: 'streak_focus',
    name: 'Week of Focus',
    category: 'streak',
    description: 'Demonstrated steadfast discipline across a full seven-day learning cycle.',
    criteria: '7-day consecutive study streak',
    icon: 'Flame',
    tier: 'silver',
    target: 7,
    xpReward: 100,
  },
  {
    id: 'streak_discipline',
    name: 'Fortnight of Discipline',
    category: 'streak',
    description: 'Maintained uninterrupted mathematical momentum for two weeks.',
    criteria: '14-day consecutive study streak',
    icon: 'Calendar',
    tier: 'gold',
    target: 14,
    xpReward: 200,
  },
  {
    id: 'streak_unstoppable',
    name: 'Unstoppable Momentum',
    category: 'streak',
    description: 'An elite 30-day streak cementing deep mathematical mastery and daily habit.',
    criteria: '30-day consecutive study streak',
    icon: 'Zap',
    tier: 'platinum',
    target: 30,
    xpReward: 500,
  },

  // --- Practice Milestones ---
  {
    id: 'practice_first',
    name: 'First Equation',
    category: 'practice',
    description: 'Solved your inaugural practice question in the interactive workshop.',
    criteria: 'Solve 1 practice question correctly',
    icon: 'CheckCircle2',
    tier: 'bronze',
    target: 1,
    xpReward: 25,
  },
  {
    id: 'practice_apprentice',
    name: 'Diligent Apprentice',
    category: 'practice',
    description: 'Built confidence by solving 25 practice problems across curriculum topics.',
    criteria: 'Solve 25 practice questions correctly',
    icon: 'Target',
    tier: 'bronze',
    target: 25,
    xpReward: 75,
  },
  {
    id: 'practice_solver',
    name: 'Problem Solver',
    category: 'practice',
    description: 'Reached a milestone of 50 verified solutions across CBSE chapters.',
    criteria: 'Solve 50 practice questions correctly',
    icon: 'Compass',
    tier: 'silver',
    target: 50,
    xpReward: 150,
  },
  {
    id: 'practice_centurion',
    name: 'Centurion Solver',
    category: 'practice',
    description: 'Conquered 100 mathematical problems with rigorous problem-solving rigor.',
    criteria: 'Solve 100 practice questions',
    icon: 'Award',
    tier: 'gold',
    target: 100,
    xpReward: 250,
  },
  {
    id: 'practice_master',
    name: 'Master Practitioner',
    category: 'practice',
    description: 'An extraordinary milestone of 250 solved problems across algebra, geometry, and calculus.',
    criteria: 'Solve 250 practice questions',
    icon: 'ShieldCheck',
    tier: 'platinum',
    target: 250,
    xpReward: 600,
  },
  {
    id: 'practice_sharpshooter',
    name: 'Sharpshooter',
    category: 'practice',
    description: 'Achieved flawless 100% accuracy in a practice session of 10 or more questions.',
    criteria: '100% accuracy on $\\ge$10 questions in a session',
    icon: 'Crosshair',
    tier: 'gold',
    target: 1,
    xpReward: 200,
  },
  {
    id: 'practice_marathon',
    name: 'Session Marathon',
    category: 'practice',
    description: 'Completed 20 questions in a single deep-work practice session without pausing.',
    criteria: '20 questions solved in one session',
    icon: 'Timer',
    tier: 'silver',
    target: 1,
    xpReward: 120,
  },

  // --- Quiz Milestones ---
  {
    id: 'quiz_first',
    name: 'Trial by Fire',
    category: 'quiz',
    description: 'Stepped into the formal assessment arena and completed your first quiz.',
    criteria: 'Complete 1 chapter or mixed quiz',
    icon: 'BookOpen',
    tier: 'bronze',
    target: 1,
    xpReward: 50,
  },
  {
    id: 'quiz_veteran',
    name: 'Exam Veteran',
    category: 'quiz',
    description: 'Tested knowledge across 5 comprehensive evaluations under timed conditions.',
    criteria: 'Complete 5 quizzes',
    icon: 'FileCheck',
    tier: 'silver',
    target: 5,
    xpReward: 150,
  },
  {
    id: 'quiz_perfect',
    name: 'Cent Percent',
    category: 'quiz',
    description: 'Attained a perfect 100% score on a full syllabus or chapter examination.',
    criteria: 'Score 100% on any quiz',
    icon: 'Sparkles',
    tier: 'gold',
    target: 1,
    xpReward: 250,
  },
  {
    id: 'quiz_speed',
    name: 'Rapid Mind',
    category: 'quiz',
    description: 'Conquered a timed speed challenge quiz with at least 80% accuracy.',
    criteria: 'Score $\\ge$80% on a Timed Speed Challenge',
    icon: 'Hourglass',
    tier: 'silver',
    target: 1,
    xpReward: 150,
  },
  {
    id: 'quiz_board_ready',
    name: 'Board Candidate',
    category: 'quiz',
    description: 'Completed a full 80-mark CBSE blueprint mock examination simulation.',
    criteria: 'Complete a Full Syllabus Board Mock',
    icon: 'GraduationCap',
    tier: 'gold',
    target: 1,
    xpReward: 300,
  },
  {
    id: 'quiz_top_percentile',
    name: 'Top Percentile',
    category: 'quiz',
    description: 'Scored 90% or higher across three distinct examination sittings.',
    criteria: 'Score $\\ge$90% on 3 separate quizzes',
    icon: 'Crown',
    tier: 'platinum',
    target: 3,
    xpReward: 500,
  },

  // --- Mastery Milestones ---
  {
    id: 'mastery_first_chapter',
    name: 'Chapter Conquered',
    category: 'mastery',
    description: 'Mastered every single concept and topic inside a complete NCERT chapter.',
    criteria: 'Complete 100% topics in any chapter',
    icon: 'Layers',
    tier: 'bronze',
    target: 1,
    xpReward: 100,
  },
  {
    id: 'mastery_triple_domain',
    name: 'Triple Domain',
    category: 'mastery',
    description: 'Fully cleared and mastered three distinct mathematical chapters in the curriculum.',
    criteria: 'Master 3 complete chapters',
    icon: 'Sigma',
    tier: 'silver',
    target: 3,
    xpReward: 250,
  },
  {
    id: 'mastery_formula_vault',
    name: 'Formula Vault',
    category: 'mastery',
    description: 'Assembled a personal handbook of 10 essential mathematical formulas.',
    criteria: 'Bookmark 10 key formulas',
    icon: 'Bookmark',
    tier: 'silver',
    target: 10,
    xpReward: 150,
  },
  {
    id: 'mastery_grandmaster',
    name: 'Grandmaster Ascendant',
    category: 'mastery',
    description: 'Accumulated over 10,000 XP and ascended to Mathverse Grandmaster status.',
    criteria: 'Reach Level 10 Grandmaster Rank',
    icon: 'Trophy',
    tier: 'platinum',
    target: 10000,
    xpReward: 1000,
  },
];

export function getBadgesWithProgress(
  unlockedBadgeIds: string[] = [],
  progressData: {
    currentStreak: number;
    totalCorrect: number;
    totalQuestionsSolved: number;
    quizHistoryCount: number;
    quizzes90PlusCount: number;
    hasFlawlessSession: boolean;
    hasMarathonSession: boolean;
    hasTimedSpeedPass: boolean;
    hasBoardMockPass: boolean;
    hasFlawlessQuiz: boolean;
    completedChaptersCount: number;
    bookmarkedFormulasCount: number;
    xp: number;
  },
  badgeHistory: { badgeId: string; unlockedAt: string }[] = []
): UserBadge[] {
  return BADGE_DEFINITIONS.map(def => {
    let current = 0;

    switch (def.id) {
      case 'streak_spark':
      case 'streak_focus':
      case 'streak_discipline':
      case 'streak_unstoppable':
        current = progressData.currentStreak || 0;
        break;

      case 'practice_first':
      case 'practice_apprentice':
      case 'practice_solver':
      case 'practice_centurion':
      case 'practice_master':
        current = progressData.totalCorrect || 0;
        break;

      case 'practice_sharpshooter':
        current = progressData.hasFlawlessSession ? 1 : 0;
        break;

      case 'practice_marathon':
        current = progressData.hasMarathonSession ? 1 : 0;
        break;

      case 'quiz_first':
      case 'quiz_veteran':
        current = progressData.quizHistoryCount || 0;
        break;

      case 'quiz_perfect':
        current = progressData.hasFlawlessQuiz ? 1 : 0;
        break;

      case 'quiz_speed':
        current = progressData.hasTimedSpeedPass ? 1 : 0;
        break;

      case 'quiz_board_ready':
        current = progressData.hasBoardMockPass ? 1 : 0;
        break;

      case 'quiz_top_percentile':
        current = progressData.quizzes90PlusCount || 0;
        break;

      case 'mastery_first_chapter':
      case 'mastery_triple_domain':
        current = progressData.completedChaptersCount || 0;
        break;

      case 'mastery_formula_vault':
        current = progressData.bookmarkedFormulasCount || 0;
        break;

      case 'mastery_grandmaster':
        current = progressData.xp || 0;
        break;

      default:
        current = 0;
    }

    const isUnlocked = unlockedBadgeIds.includes(def.id) || current >= def.target;
    const historyItem = badgeHistory.find(h => h.badgeId === def.id);

    return {
      ...def,
      currentProgress: Math.min(current, def.target),
      isUnlocked,
      unlockedAt: historyItem?.unlockedAt || (isUnlocked ? new Date().toISOString() : undefined),
    };
  });
}
