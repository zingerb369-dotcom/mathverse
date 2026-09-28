import { RankBadge, DailyGoalsData } from '../types';

export const XP_REWARDS = {
  TOPIC_COMPLETE: 35,
  CHAPTER_COMPLETE: 120,
  PRACTICE_CORRECT_ANSWER: 10,
  PRACTICE_HIGH_ACCURACY_BONUS: 25,
  PRACTICE_PERFECT_BONUS: 50,
  QUIZ_BASE: 60,
  QUIZ_PERFECT_BONUS: 50,
  DAILY_GOAL_CLAIM: 50,
  DAILY_ALL_GOALS_BONUS: 100,
  FORMULA_BOOKMARK: 15,
};

export const RANK_BADGES: RankBadge[] = [
  {
    level: 1,
    id: 'number_novice',
    title: 'Number Novice',
    subtitle: 'Foundation Builder',
    description: 'Began the mathematical voyage. Grounded in number concepts and foundational arithmetic.',
    minXp: 0,
    maxXp: 250,
    icon: 'Compass',
    tierColor: {
      badgeBg: 'bg-slate-800',
      text: 'text-slate-300',
      border: 'border-slate-700',
      glow: 'shadow-slate-500/20',
      gradient: 'from-slate-700 to-slate-900',
    },
    perks: [
      'Access to Class 5–10 NCERT Chapter Index',
      'Interactive formula bookmarking',
      'Basic step-by-step solutions',
    ],
  },
  {
    level: 2,
    id: 'math_apprentice',
    title: 'Math Apprentice',
    subtitle: 'Curriculum Explorer',
    description: 'Demonstrated consistent practice across fundamental topics, solving basic equations and arithmetic structures.',
    minXp: 250,
    maxXp: 600,
    icon: 'Zap',
    tierColor: {
      badgeBg: 'bg-emerald-950/70',
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      glow: 'shadow-emerald-500/20',
      gradient: 'from-emerald-600 to-teal-800',
    },
    perks: [
      'Custom Practice Session filtering',
      'Daily Practice Challenge streaks',
      'Adaptive difficulty suggestions',
    ],
  },
  {
    level: 3,
    id: 'equation_explorer',
    title: 'Equation Explorer',
    subtitle: 'Symbolic Thinker',
    description: 'Proficient in variable manipulation, linear systems, and fractional algebraic reasoning.',
    minXp: 600,
    maxXp: 1100,
    icon: 'Sparkles',
    tierColor: {
      badgeBg: 'bg-sky-950/70',
      text: 'text-sky-400',
      border: 'border-sky-500/40',
      glow: 'shadow-sky-500/20',
      gradient: 'from-sky-600 to-cyan-800',
    },
    perks: [
      'Timed Quiz speed challenge mode',
      'Detailed mistake breakdown logs',
      'Performance diagnostic cards',
    ],
  },
  {
    level: 4,
    id: 'algebra_adept',
    title: 'Algebra Adept',
    subtitle: 'Polynomial Strategist',
    description: 'Mastered factorization, polynomial division, quadratic formulations, and arithmetic progressions.',
    minXp: 1100,
    maxXp: 1800,
    icon: 'Sigma',
    tierColor: {
      badgeBg: 'bg-indigo-950/70',
      text: 'text-indigo-400',
      border: 'border-indigo-500/40',
      glow: 'shadow-indigo-500/20',
      gradient: 'from-indigo-600 to-blue-800',
    },
    perks: [
      'Full Syllabus Mixed Mock generator',
      'Enhanced AI Tutor derivation steps',
      'Formula derivation shortcuts',
    ],
  },
  {
    level: 5,
    id: 'geometry_guardian',
    title: 'Geometry Guardian',
    subtitle: 'Spatial Virtuoso',
    description: 'Understands Euclidean axioms, triangle congruency, circle theorems, and coordinate geometry mappings.',
    minXp: 1800,
    maxXp: 2700,
    icon: 'ShieldCheck',
    tierColor: {
      badgeBg: 'bg-violet-950/70',
      text: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-violet-500/20',
      gradient: 'from-violet-600 to-purple-800',
    },
    perks: [
      'Competency-based case study question bank',
      'Visual diagram explanations',
      'Chapter mastery certificates',
    ],
  },
  {
    level: 6,
    id: 'theorem_tactician',
    title: 'Theorem Tactician',
    subtitle: 'Proof Architect',
    description: 'Capable of rigorous mathematical proofs, deductive logic, and multi-step geometric arguments.',
    minXp: 2700,
    maxXp: 3800,
    icon: 'Award',
    tierColor: {
      badgeBg: 'bg-amber-950/70',
      text: 'text-amber-400',
      border: 'border-amber-500/40',
      glow: 'shadow-amber-500/20',
      gradient: 'from-amber-600 to-yellow-800',
    },
    perks: [
      'Assertion & Reasoning advanced test packs',
      'Detailed time-per-question telemetry',
      'Golden Rank Badge icon glow',
    ],
  },
  {
    level: 7,
    id: 'trigonometry_titan',
    title: 'Trigonometry Titan',
    subtitle: 'Ratio & Elevation Master',
    description: 'Commands trigonometric ratios, identities, angle heights, distances, and unit circle symmetries.',
    minXp: 3800,
    maxXp: 5200,
    icon: 'Flame',
    tierColor: {
      badgeBg: 'bg-orange-950/70',
      text: 'text-orange-400',
      border: 'border-orange-500/40',
      glow: 'shadow-orange-500/20',
      gradient: 'from-orange-600 to-rose-800',
    },
    perks: [
      'Class 10 Board Accelerator High-Difficulty sets',
      'Complex identity verification drills',
      'Priority doubt solving in AI Tutor',
    ],
  },
  {
    level: 8,
    id: 'math_scholar',
    title: 'Math Scholar',
    subtitle: 'Statistical Analyst',
    description: 'Excels at central tendency metrics, cumulative frequency ogives, probability distribution, and surface mensuration.',
    minXp: 5200,
    maxXp: 7000,
    icon: 'Star',
    tierColor: {
      badgeBg: 'bg-rose-950/70',
      text: 'text-rose-400',
      border: 'border-rose-500/40',
      glow: 'shadow-rose-500/20',
      gradient: 'from-rose-600 to-pink-800',
    },
    perks: [
      'Scholar Distinction emblem on Profile',
      'Full 80-mark CBSE blueprint mock simulations',
      'Advanced analytical review graphs',
    ],
  },
  {
    level: 9,
    id: 'calculus_master',
    title: 'Calculus Master',
    subtitle: 'Infinitesimal Pioneer',
    description: 'Ascended beyond standard board curriculum into higher mathematical intuition, rates of change, and advanced problem solving.',
    minXp: 7000,
    maxXp: 10000,
    icon: 'Crown',
    tierColor: {
      badgeBg: 'bg-fuchsia-950/70',
      text: 'text-fuchsia-400',
      border: 'border-fuchsia-500/40',
      glow: 'shadow-fuchsia-500/20',
      gradient: 'from-fuchsia-600 via-purple-600 to-indigo-800',
    },
    perks: [
      'Calculus Master Crown Badge in Header & Profile',
      'All Chapter Master Challenge Tests unlocked',
      'Board Topper 100/100 practice blueprint',
    ],
  },
  {
    level: 10,
    id: 'mathverse_grandmaster',
    title: 'Mathverse Grandmaster',
    subtitle: 'Universal Mathematician',
    description: 'The pinnacle of MATHVERSE. Complete mathematical fluency across CBSE syllabus, competitions, and theoretical foundations.',
    minXp: 10000,
    maxXp: Infinity,
    icon: 'Trophy',
    tierColor: {
      badgeBg: 'bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-amber-950/80',
      text: 'text-amber-300',
      border: 'border-amber-400/60',
      glow: 'shadow-amber-400/30',
      gradient: 'from-amber-400 via-rose-500 to-indigo-500',
    },
    perks: [
      'Permanent Cosmic Grandmaster Aura & Trophy',
      'Infinite practice sets across all categories',
      'Featured in Hall of Champions',
    ],
  },
];

export function getRankByLevel(level: number): RankBadge {
  return RANK_BADGES.find(r => r.level === level) || RANK_BADGES[0];
}

export function getRankByXp(xp: number): RankBadge {
  const safeXp = Math.max(0, xp || 0);
  for (let i = RANK_BADGES.length - 1; i >= 0; i--) {
    if (safeXp >= RANK_BADGES[i].minXp) {
      return RANK_BADGES[i];
    }
  }
  return RANK_BADGES[0];
}

export function getNextRank(xp: number): RankBadge | null {
  const safeXp = Math.max(0, xp || 0);
  const currentRank = getRankByXp(safeXp);
  if (currentRank.level >= RANK_BADGES.length) {
    return null;
  }
  return RANK_BADGES[currentRank.level]; // index is next level (0-based)
}

export function getXpProgress(xp: number): {
  currentRank: RankBadge;
  nextRank: RankBadge | null;
  percent: number;
  currentTierXp: number;
  requiredTierXp: number;
  remainingXp: number;
} {
  const safeXp = Math.max(0, xp || 0);
  const currentRank = getRankByXp(safeXp);
  const nextRank = getNextRank(safeXp);

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      percent: 100,
      currentTierXp: safeXp - currentRank.minXp,
      requiredTierXp: 0,
      remainingXp: 0,
    };
  }

  const tierSpan = nextRank.minXp - currentRank.minXp;
  const currentTierXp = safeXp - currentRank.minXp;
  const remainingXp = nextRank.minXp - safeXp;
  const percent = Math.min(100, Math.max(0, Math.round((currentTierXp / tierSpan) * 100)));

  return {
    currentRank,
    nextRank,
    percent,
    currentTierXp,
    requiredTierXp: tierSpan,
    remainingXp,
  };
}

export function createDefaultDailyGoals(dateStr: string): DailyGoalsData {
  return {
    date: dateStr,
    allBonusClaimed: false,
    goals: [
      {
        id: 'goal_solve_questions',
        title: 'Target Practice',
        description: 'Solve 5 practice or quiz questions correctly',
        target: 5,
        current: 0,
        completed: false,
        claimed: false,
        xpReward: 50,
      },
      {
        id: 'goal_complete_topic',
        title: 'Curriculum Sprint',
        description: 'Understand and master 1 curriculum topic or chapter',
        target: 1,
        current: 0,
        completed: false,
        claimed: false,
        xpReward: 50,
      },
      {
        id: 'goal_score_high',
        title: 'Precision Focus',
        description: 'Score at least 70% in any practice session or quiz',
        target: 1,
        current: 0,
        completed: false,
        claimed: false,
        xpReward: 50,
      },
    ],
  };
}
