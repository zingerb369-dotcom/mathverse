import {
  UserProfile,
  UserProgressData,
  BookmarksData,
  Achievement,
  DailyGoalsData,
} from '../types';
import { createDefaultDailyGoals, getRankByXp } from '../data/rankData';

const PROFILE_KEY = 'mathverse_user_profile_v1';
const PROGRESS_KEY = 'mathverse_user_progress_v1';
const BOOKMARKS_KEY = 'mathverse_bookmarks_v1';

export function getInitials(name: string): string {
  if (!name || typeof name !== 'string') return 'MV';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'MV';
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getFirstName(name: string): string {
  if (!name || typeof name !== 'string') return 'Student';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts[0] || 'Student';
}

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_chapter',
    title: 'First Step',
    description: 'Complete your very first mathematics chapter',
    icon: 'BookOpen',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'ten_questions',
    title: 'Problem Solver',
    description: 'Solve 10 practice or quiz questions correctly',
    icon: 'CheckCircle2',
    progress: 0,
    maxProgress: 10,
    isUnlocked: false,
  },
  {
    id: 'hundred_questions',
    title: 'Math Centurion',
    description: 'Solve 100 questions across curriculum practice',
    icon: 'Award',
    progress: 0,
    maxProgress: 100,
    isUnlocked: false,
  },
  {
    id: 'first_quiz',
    title: 'Quiz Novice',
    description: 'Complete any chapter or mixed syllabus quiz',
    icon: 'Zap',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'perfect_quiz',
    title: 'Perfectionist',
    description: 'Score 100% on any practice test or quiz',
    icon: 'Sparkles',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'seven_day_streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day consecutive study streak',
    icon: 'Flame',
    progress: 0,
    maxProgress: 7,
    isUnlocked: false,
  },
  {
    id: 'formula_master',
    title: 'Formula Master',
    description: 'Save 5 essential formulas to your bookmarks',
    icon: 'Sigma',
    progress: 0,
    maxProgress: 5,
    isUnlocked: false,
  },
  {
    id: 'board_ready',
    title: 'Board Ready',
    description: 'Complete a full syllabus or timed mock test',
    icon: 'GraduationCap',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: '',
  email: '',
  isLoggedIn: false,
  grade: 10,
  language: 'en',
  theme: 'dark',
  isFirstLaunch: true,
  createdAt: new Date().toISOString(),
  studyReminderEnabled: true,
  studyReminderTime: '18:00',
  notificationsEnabled: true,
  soundEnabled: true,
};

export const INITIAL_USER_PROGRESS: UserProgressData = {
  xp: 320, // Start as an active student (Rank 2: Math Apprentice)
  level: 2,
  unlockedRanks: ['number_novice', 'math_apprentice'],
  unlockedBadges: ['practice_first'],
  badgeHistory: [{ badgeId: 'practice_first', unlockedAt: new Date().toISOString() }],
  dailyGoals: createDefaultDailyGoals(new Date().toISOString().split('T')[0]),
  completedTopics: [],
  completedChapters: [],
  totalQuestionsSolved: 5,
  totalCorrect: 4,
  totalIncorrect: 1,
  practiceHistory: [],
  quizHistory: [],
  recentChapterIds: [],
  totalStudyMinutes: 24,
  currentStreak: 1,
  longestStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  achievements: DEFAULT_ACHIEVEMENTS,
};

export const INITIAL_BOOKMARKS: BookmarksData = {
  chapterIds: [],
  topicIds: [],
  formulaIds: [],
  questionIds: [],
};

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return INITIAL_USER_PROFILE;
    return { ...INITIAL_USER_PROFILE, ...JSON.parse(raw) };
  } catch {
    return INITIAL_USER_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage', err);
  }
}

export function loadUserProgress(): UserProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const today = new Date().toISOString().split('T')[0];

    if (!raw) return INITIAL_USER_PROGRESS;
    const parsed = JSON.parse(raw);

    // Compute or migrate XP if missing
    let currentXp = typeof parsed.xp === 'number' ? parsed.xp : 0;
    if (currentXp === 0 && (parsed.totalCorrect > 0 || (parsed.completedTopics && parsed.completedTopics.length > 0))) {
      currentXp =
        (parsed.completedChapters?.length || 0) * 120 +
        (parsed.completedTopics?.length || 0) * 35 +
        (parsed.totalCorrect || 0) * 10 +
        (parsed.quizHistory?.length || 0) * 75;
    }
    if (currentXp === 0) {
      currentXp = 320; // Default friendly starting point
    }

    const currentRank = getRankByXp(currentXp);
    const unlockedRanks: string[] = parsed.unlockedRanks || ['number_novice', 'math_apprentice'];
    if (!unlockedRanks.includes(currentRank.id)) {
      unlockedRanks.push(currentRank.id);
    }

    const unlockedBadges: string[] = Array.isArray(parsed.unlockedBadges)
      ? parsed.unlockedBadges
      : ['practice_first'];
    const badgeHistory = Array.isArray(parsed.badgeHistory)
      ? parsed.badgeHistory
      : [{ badgeId: 'practice_first', unlockedAt: new Date().toISOString() }];

    // Refresh daily goals if new day
    let dailyGoals: DailyGoalsData = parsed.dailyGoals;
    if (!dailyGoals || dailyGoals.date !== today || !Array.isArray(dailyGoals.goals)) {
      dailyGoals = createDefaultDailyGoals(today);
    }

    return {
      ...INITIAL_USER_PROGRESS,
      ...parsed,
      xp: currentXp,
      level: currentRank.level,
      unlockedRanks,
      unlockedBadges,
      badgeHistory,
      dailyGoals,
      achievements: DEFAULT_ACHIEVEMENTS.map(def => {
        const existing = (parsed.achievements || []).find((a: Achievement) => a.id === def.id);
        return existing || def;
      }),
    };
  } catch {
    return INITIAL_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgressData): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function loadBookmarks(): BookmarksData {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return INITIAL_BOOKMARKS;
    return { ...INITIAL_BOOKMARKS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_BOOKMARKS;
  }
}

export function saveBookmarks(bookmarks: BookmarksData): void {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (err) {
    console.error('Failed to save bookmarks to localStorage', err);
  }
}

const TUTOR_HISTORY_KEY = 'mathverse_tutor_history_v1';

export interface SavedTutorSession {
  id: string;
  title: string;
  date: string;
  grade: number;
  messages: Array<{
    id: string;
    sender: 'user' | 'tutor';
    text: string;
    time: string;
    isError?: boolean;
    errorMessage?: string;
  }>;
}

export function loadTutorSessions(): SavedTutorSession[] {
  try {
    const raw = localStorage.getItem(TUTOR_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveTutorSessions(sessions: SavedTutorSession[]): void {
  try {
    localStorage.setItem(TUTOR_HISTORY_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save tutor sessions to localStorage', err);
  }
}

export function clearAllData(): void {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(BOOKMARKS_KEY);
    localStorage.removeItem(TUTOR_HISTORY_KEY);
  } catch (err) {
    console.error('Failed to clear data', err);
  }
}
