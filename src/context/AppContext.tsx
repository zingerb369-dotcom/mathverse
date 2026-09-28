import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  UserProgressData,
  BookmarksData,
  GradeLevel,
  LanguageCode,
  ThemeMode,
  PracticeSessionResult,
  QuizResult,
  RankBadge,
  DailyGoalItem,
} from '../types';
import {
  loadUserProfile,
  saveUserProfile,
  loadUserProgress,
  saveUserProgress,
  loadBookmarks,
  saveBookmarks,
  clearAllData,
  INITIAL_USER_PROFILE,
  INITIAL_USER_PROGRESS,
  INITIAL_BOOKMARKS,
  getFirstName,
  getInitials,
} from '../utils/storage';
import { TRANSLATIONS } from '../utils/translations';
import { soundManager } from '../utils/sound';
import {
  getRankByXp,
  getRankByLevel,
  getNextRank,
  getXpProgress,
  XP_REWARDS,
  RANK_BADGES,
} from '../data/rankData';
import { BADGE_DEFINITIONS, UserBadge } from '../data/badgeData';

export type AppView =
  | 'dashboard'
  | 'learn'
  | 'practice'
  | 'quiz'
  | 'exam10'
  | 'tutor'
  | 'formulas'
  | 'ncert'
  | 'bookmarks'
  | 'progress'
  | 'settings'
  | 'profile';

export interface XpToastInfo {
  id: number;
  message: string;
  amount: number;
}

interface AppContextType {
  profile: UserProfile;
  progress: UserProgressData;
  bookmarks: BookmarksData;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedChapterId: string | null;
  setSelectedChapterId: (id: string | null) => void;
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isRankModalOpen: boolean;
  setIsRankModalOpen: (open: boolean) => void;
  levelUpModalData: { rank: RankBadge } | null;
  closeLevelUpModal: () => void;
  unlockedBadgeModalData: { badge: UserBadge } | null;
  closeBadgeModal: () => void;
  checkAndUnlockBadge: (badgeId: string) => void;
  activeXpToast: XpToastInfo | null;
  awardXp: (amount: number, reason: string) => void;
  claimDailyGoal: (goalId: string) => void;
  claimAllDailyGoalsBonus: () => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  completeFirstLaunch: (name: string, grade: GradeLevel, email?: string) => void;
  login: (options: { name: string; email?: string; grade?: GradeLevel }) => void;
  logout: () => void;
  resetAll: () => void;
  toggleBookmark: (type: 'chapter' | 'topic' | 'formula' | 'question', id: string) => void;
  isBookmarked: (type: 'chapter' | 'topic' | 'formula' | 'question', id: string) => boolean;
  recordPracticeSession: (result: PracticeSessionResult) => void;
  recordQuizResult: (result: QuizResult) => void;
  markTopicCompleted: (topicId: string, chapterId: string) => void;
  addStudyMinutes: (minutes: number) => void;
  updateStreak: (days: number) => void;
  t: (key: string) => string;
  studentFirstName: string;
  studentInitials: string;
  playSound: (type: 'click' | 'correct' | 'incorrect' | 'fanfare') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile);
  const [progress, setProgress] = useState<UserProgressData>(loadUserProgress);
  const [bookmarks, setBookmarks] = useState<BookmarksData>(loadBookmarks);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRankModalOpen, setIsRankModalOpen] = useState<boolean>(false);
  const [levelUpModalData, setLevelUpModalData] = useState<{ rank: RankBadge } | null>(null);
  const [unlockedBadgeModalData, setUnlockedBadgeModalData] = useState<{ badge: UserBadge } | null>(null);
  const [activeXpToast, setActiveXpToast] = useState<XpToastInfo | null>(null);

  // Sync theme to document element with live matchMedia listener
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark =
        profile.theme === 'dark' ||
        (profile.theme === 'system' && mediaQuery.matches);

      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    applyTheme();

    if (profile.theme === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [profile.theme]);

  // Periodic active study time tracker (adds 1 minute every 60s of active app usage)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const updated = {
          ...prev,
          totalStudyMinutes: prev.totalStudyMinutes + 1,
        };
        saveUserProgress(updated);
        return updated;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Check and unlock streak badges when streak progresses
  useEffect(() => {
    const streak = progress.currentStreak || 1;
    if (streak >= 3) checkAndUnlockBadge('streak_3_days');
    if (streak >= 7) checkAndUnlockBadge('streak_7_days');
    if (streak >= 14) checkAndUnlockBadge('streak_14_days');
    if (streak >= 30) checkAndUnlockBadge('streak_30_days');
  }, [progress.currentStreak]);

  const updateProfile = (partial: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...partial };
      saveUserProfile(updated);
      return updated;
    });
  };

  const completeFirstLaunch = (name: string, grade: GradeLevel, email?: string) => {
    const updated: UserProfile = {
      ...profile,
      name: name.trim(),
      email: email ? email.trim() : profile.email || '',
      grade,
      isFirstLaunch: false,
      isLoggedIn: true,
    };
    setProfile(updated);
    saveUserProfile(updated);
    soundManager.playFanfare(profile.soundEnabled);
  };

  const login = (options: { name: string; email?: string; grade?: GradeLevel }) => {
    const updated: UserProfile = {
      ...profile,
      name: options.name.trim() || profile.name || 'Student',
      email: options.email ? options.email.trim() : profile.email || '',
      grade: options.grade ?? profile.grade,
      isFirstLaunch: false,
      isLoggedIn: true,
    };
    setProfile(updated);
    saveUserProfile(updated);
    soundManager.playFanfare(profile.soundEnabled);
  };

  const logout = () => {
    const updated: UserProfile = {
      ...profile,
      isLoggedIn: false,
      isFirstLaunch: true,
    };
    setProfile(updated);
    saveUserProfile(updated);
    soundManager.playClick(profile.soundEnabled);
  };

  const resetAll = () => {
    clearAllData();
    setProfile(INITIAL_USER_PROFILE);
    setProgress(INITIAL_USER_PROGRESS);
    setBookmarks(INITIAL_BOOKMARKS);
    setCurrentView('dashboard');
    setSelectedChapterId(null);
    setSelectedTopicId(null);
  };

  const toggleBookmark = (type: 'chapter' | 'topic' | 'formula' | 'question', id: string) => {
    soundManager.playClick(profile.soundEnabled);
    setBookmarks(prev => {
      let key: keyof BookmarksData;
      switch (type) {
        case 'chapter':
          key = 'chapterIds';
          break;
        case 'topic':
          key = 'topicIds';
          break;
        case 'formula':
          key = 'formulaIds';
          break;
        case 'question':
          key = 'questionIds';
          break;
      }
      const list = prev[key];
      const exists = list.includes(id);
      const updatedList = exists ? list.filter(item => item !== id) : [...list, id];
      const updatedBookmarks = { ...prev, [key]: updatedList };
      saveBookmarks(updatedBookmarks);

      // Check formula master achievement
      if (key === 'formulaIds' && updatedList.length >= 5) {
        unlockAchievement('formula_master');
      }

      // If a formula was newly bookmarked, award +15 XP
      if (key === 'formulaIds' && !exists) {
        awardXp(XP_REWARDS.FORMULA_BOOKMARK, 'Formula Bookmarked!');
        if (updatedBookmarks.formulaIds.length >= 10) {
          checkAndUnlockBadge('mastery_formula_vault');
        }
      }

      return updatedBookmarks;
    });
  };

  const isBookmarked = (type: 'chapter' | 'topic' | 'formula' | 'question', id: string): boolean => {
    switch (type) {
      case 'chapter':
        return bookmarks.chapterIds.includes(id);
      case 'topic':
        return bookmarks.topicIds.includes(id);
      case 'formula':
        return bookmarks.formulaIds.includes(id);
      case 'question':
        return bookmarks.questionIds.includes(id);
    }
  };

  const awardXp = (amount: number, reason: string) => {
    if (amount <= 0) return;

    setProgress(prev => {
      const oldXp = prev.xp || 0;
      const newXp = oldXp + amount;
      const oldRank = getRankByXp(oldXp);
      const newRank = getRankByXp(newXp);

      const unlockedRanks = [...(prev.unlockedRanks || [])];
      if (!unlockedRanks.includes(newRank.id)) {
        unlockedRanks.push(newRank.id);
      }

      const updated: UserProgressData = {
        ...prev,
        xp: newXp,
        level: newRank.level,
        unlockedRanks,
      };
      saveUserProgress(updated);

      if (newRank.level > oldRank.level) {
        soundManager.playFanfare(profile.soundEnabled);
        try {
          confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        } catch {}
        setLevelUpModalData({ rank: newRank });
      }

      return updated;
    });

    const toastId = Date.now();
    setActiveXpToast({ id: toastId, message: reason, amount });
    setTimeout(() => {
      setActiveXpToast(curr => (curr?.id === toastId ? null : curr));
    }, 3500);
  };

  const closeLevelUpModal = () => {
    setLevelUpModalData(null);
  };

  const closeBadgeModal = () => {
    setUnlockedBadgeModalData(null);
  };

  const checkAndUnlockBadge = (badgeId: string) => {
    const def = BADGE_DEFINITIONS.find(b => b.id === badgeId);
    if (!def) return;
    if ((progress.unlockedBadges || []).includes(badgeId)) return;

    const now = new Date().toISOString();
    const unlockedBadgeItem: UserBadge = {
      ...def,
      isUnlocked: true,
      currentProgress: def.target,
      unlockedAt: now,
    };

    setProgress(prev => {
      if ((prev.unlockedBadges || []).includes(badgeId)) return prev;
      const updatedUnlocked = [...(prev.unlockedBadges || []), badgeId];
      const updatedHistory = [...(prev.badgeHistory || []), { badgeId, unlockedAt: now }];

      const updated = {
        ...prev,
        unlockedBadges: updatedUnlocked,
        badgeHistory: updatedHistory,
      };
      saveUserProgress(updated);
      return updated;
    });

    soundManager.playFanfare(profile.soundEnabled);
    setUnlockedBadgeModalData({ badge: unlockedBadgeItem });
    awardXp(unlockedBadgeItem.xpReward, `Badge Unlocked: ${unlockedBadgeItem.name}!`);
  };

  const updateDailyGoalProgress = (goalId: string, incrementBy: number, setToValue?: number) => {
    setProgress(prev => {
      if (!prev.dailyGoals || !Array.isArray(prev.dailyGoals.goals)) return prev;
      const updatedGoals = prev.dailyGoals.goals.map(g => {
        if (g.id === goalId) {
          const nextVal = setToValue !== undefined ? setToValue : g.current + incrementBy;
          const isDone = nextVal >= g.target;
          return {
            ...g,
            current: Math.min(nextVal, g.target),
            completed: g.completed || isDone,
          };
        }
        return g;
      });

      const updated: UserProgressData = {
        ...prev,
        dailyGoals: {
          ...prev.dailyGoals,
          goals: updatedGoals,
        },
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const claimDailyGoal = (goalId: string) => {
    let goalReward = 0;
    let goalTitle = 'Daily Goal';

    setProgress(prev => {
      if (!prev.dailyGoals || !Array.isArray(prev.dailyGoals.goals)) return prev;
      const targetGoal = prev.dailyGoals.goals.find(g => g.id === goalId);
      if (!targetGoal || !targetGoal.completed || targetGoal.claimed) return prev;

      goalReward = targetGoal.xpReward || XP_REWARDS.DAILY_GOAL_CLAIM;
      goalTitle = targetGoal.title;

      const updatedGoals = prev.dailyGoals.goals.map(g =>
        g.id === goalId ? { ...g, claimed: true } : g
      );

      const updated: UserProgressData = {
        ...prev,
        dailyGoals: {
          ...prev.dailyGoals,
          goals: updatedGoals,
        },
      };
      saveUserProgress(updated);
      return updated;
    });

    if (goalReward > 0) {
      soundManager.playFanfare(profile.soundEnabled);
      awardXp(goalReward, `${goalTitle} Claimed!`);
    }
  };

  const claimAllDailyGoalsBonus = () => {
    let canClaim = false;

    setProgress(prev => {
      if (!prev.dailyGoals || prev.dailyGoals.allBonusClaimed) return prev;
      const allClaimed = prev.dailyGoals.goals.every(g => g.claimed);
      if (!allClaimed) return prev;

      canClaim = true;
      const updated: UserProgressData = {
        ...prev,
        dailyGoals: {
          ...prev.dailyGoals,
          allBonusClaimed: true,
        },
      };
      saveUserProgress(updated);
      return updated;
    });

    if (canClaim) {
      soundManager.playFanfare(profile.soundEnabled);
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
      awardXp(XP_REWARDS.DAILY_ALL_GOALS_BONUS, 'All Daily Goals Bonus!');
    }
  };

  const unlockAchievement = (achId: string) => {
    setProgress(prev => {
      const achs = prev.achievements.map(a => {
        if (a.id === achId && !a.isUnlocked) {
          soundManager.playFanfare(profile.soundEnabled);
          return { ...a, isUnlocked: true, progress: a.maxProgress, unlockedAt: new Date().toISOString() };
        }
        return a;
      });
      const updated = { ...prev, achievements: achs };
      saveUserProgress(updated);
      return updated;
    });
  };

  const updateAchievementProgress = (achId: string, currentVal: number) => {
    setProgress(prev => {
      const achs = prev.achievements.map(a => {
        if (a.id === achId) {
          const isNowUnlocked = currentVal >= a.maxProgress;
          if (isNowUnlocked && !a.isUnlocked) {
            soundManager.playFanfare(profile.soundEnabled);
          }
          return {
            ...a,
            progress: Math.min(currentVal, a.maxProgress),
            isUnlocked: a.isUnlocked || isNowUnlocked,
            unlockedAt: isNowUnlocked && !a.isUnlocked ? new Date().toISOString() : a.unlockedAt,
          };
        }
        return a;
      });
      const updated = { ...prev, achievements: achs };
      saveUserProgress(updated);
      return updated;
    });
  };

  const recordPracticeSession = (session: PracticeSessionResult) => {
    setProgress(prev => {
      const newTotalSolved = prev.totalQuestionsSolved + session.totalQuestions;
      const newTotalCorrect = prev.totalCorrect + session.correctCount;
      const newTotalIncorrect = prev.totalIncorrect + session.incorrectCount;
      const recentChaps = Array.from(new Set([session.chapterId, ...prev.recentChapterIds])).slice(0, 5);

      const updated: UserProgressData = {
        ...prev,
        totalQuestionsSolved: newTotalSolved,
        totalCorrect: newTotalCorrect,
        totalIncorrect: newTotalIncorrect,
        practiceHistory: [session, ...prev.practiceHistory].slice(0, 50),
        recentChapterIds: recentChaps,
        lastStudiedChapterId: session.chapterId,
      };
      saveUserProgress(updated);
      return updated;
    });

    updateAchievementProgress('ten_questions', progress.totalCorrect + session.correctCount);
    updateAchievementProgress('hundred_questions', progress.totalQuestionsSolved + session.totalQuestions);
    if (session.percentage === 100) {
      unlockAchievement('perfect_quiz');
    }

    // Award XP for Practice
    const correctXp = session.correctCount * XP_REWARDS.PRACTICE_CORRECT_ANSWER;
    let bonusXp = 0;
    if (session.percentage === 100) {
      bonusXp = XP_REWARDS.PRACTICE_PERFECT_BONUS;
    } else if (session.percentage >= 80) {
      bonusXp = XP_REWARDS.PRACTICE_HIGH_ACCURACY_BONUS;
    }
    const totalPracXp = correctXp + bonusXp;
    if (totalPracXp > 0) {
      awardXp(
        totalPracXp,
        `Practice: ${session.correctCount} Correct${bonusXp > 0 ? ` +${bonusXp} Accuracy Bonus!` : ''}`
      );
    }

    // Update Daily Goals
    updateDailyGoalProgress('goal_solve_questions', session.correctCount);
    if (session.percentage >= 70) {
      updateDailyGoalProgress('goal_score_high', 1, 1);
    }

    // Award Badges for Practice Milestones
    if (session.correctCount > 0) {
      checkAndUnlockBadge('practice_first');
    }
    const totalCorrectNow = progress.totalCorrect + session.correctCount;
    const totalSolvedNow = progress.totalQuestionsSolved + session.totalQuestions;

    if (totalCorrectNow >= 25) checkAndUnlockBadge('practice_apprentice');
    if (totalCorrectNow >= 50) checkAndUnlockBadge('practice_solver');
    if (totalSolvedNow >= 100) checkAndUnlockBadge('practice_centurion');
    if (totalSolvedNow >= 250) checkAndUnlockBadge('practice_master');

    if (session.totalQuestions >= 10 && session.percentage === 100) {
      checkAndUnlockBadge('practice_sharpshooter');
    }
    if (session.totalQuestions >= 20) {
      checkAndUnlockBadge('practice_marathon');
    }
  };

  const recordQuizResult = (result: QuizResult) => {
    setProgress(prev => {
      const newTotalSolved = prev.totalQuestionsSolved + result.questions.length;
      const newTotalCorrect = prev.totalCorrect + result.correct;
      const newTotalIncorrect = prev.totalIncorrect + result.incorrect;

      const updated: UserProgressData = {
        ...prev,
        totalQuestionsSolved: newTotalSolved,
        totalCorrect: newTotalCorrect,
        totalIncorrect: newTotalIncorrect,
        quizHistory: [result, ...prev.quizHistory].slice(0, 50),
      };
      saveUserProgress(updated);
      return updated;
    });

    unlockAchievement('first_quiz');
    if (result.percentage === 100) {
      unlockAchievement('perfect_quiz');
    }
    if (result.quizType === 'full_syllabus' || result.title.includes('Mock')) {
      unlockAchievement('board_ready');
    }

    // Award XP for Quiz
    let quizXp = XP_REWARDS.QUIZ_BASE + Math.round(result.percentage * 0.5);
    if (result.percentage === 100) {
      quizXp += XP_REWARDS.QUIZ_PERFECT_BONUS;
    }
    awardXp(
      quizXp,
      `Quiz: ${result.percentage}%${result.percentage === 100 ? ' (Perfect Score!)' : ''}`
    );

    // Update Daily Goals
    updateDailyGoalProgress('goal_solve_questions', result.correct);
    if (result.percentage >= 70) {
      updateDailyGoalProgress('goal_score_high', 1, 1);
    }

    // Award Badges for Quiz Milestones
    checkAndUnlockBadge('quiz_first');
    if ((progress.quizHistory?.length || 0) + 1 >= 5) {
      checkAndUnlockBadge('quiz_veteran');
    }
    if (result.percentage === 100) {
      checkAndUnlockBadge('quiz_perfect');
    }
    if (result.quizType === 'timed' && result.percentage >= 80) {
      checkAndUnlockBadge('quiz_speed');
    }
    if (result.quizType === 'full_syllabus' || result.title.toLowerCase().includes('mock')) {
      checkAndUnlockBadge('quiz_board_ready');
    }
    const highScoresCount = (progress.quizHistory || []).filter(q => q.percentage >= 90).length + (result.percentage >= 90 ? 1 : 0);
    if (highScoresCount >= 3) {
      checkAndUnlockBadge('quiz_top_percentile');
    }
  };

  const markTopicCompleted = (topicId: string, chapterId: string) => {
    let wasNew = false;
    let completedChaptersCount = 0;

    setProgress(prev => {
      if (prev.completedTopics.includes(topicId)) return prev;
      wasNew = true;
      const completedTopics = [...prev.completedTopics, topicId];
      const completedChapters = Array.from(new Set([...prev.completedChapters, chapterId]));
      completedChaptersCount = completedChapters.length;
      const recentChaps = Array.from(new Set([chapterId, ...prev.recentChapterIds])).slice(0, 5);

      const updated: UserProgressData = {
        ...prev,
        completedTopics,
        completedChapters,
        recentChapterIds: recentChaps,
        lastStudiedChapterId: chapterId,
      };
      saveUserProgress(updated);
      return updated;
    });

    if (wasNew) {
      unlockAchievement('first_chapter');
      awardXp(XP_REWARDS.TOPIC_COMPLETE, 'Curriculum Topic Mastered!');
      updateDailyGoalProgress('goal_complete_topic', 1, 1);

      if (completedChaptersCount >= 1) {
        checkAndUnlockBadge('mastery_first_chapter');
      }
      if (completedChaptersCount >= 3) {
        checkAndUnlockBadge('mastery_triple_domain');
      }
    }
  };

  const addStudyMinutes = (mins: number) => {
    setProgress(prev => {
      const updated = { ...prev, totalStudyMinutes: prev.totalStudyMinutes + mins };
      saveUserProgress(updated);
      return updated;
    });
  };

  const updateStreak = (days: number) => {
    const validDays = Math.max(1, Math.floor(days));
    setProgress(prev => {
      const updated = {
        ...prev,
        currentStreak: validDays,
        longestStreak: Math.max(prev.longestStreak, validDays),
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[profile.language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const playSound = (type: 'click' | 'correct' | 'incorrect' | 'fanfare') => {
    if (!profile.soundEnabled) return;
    switch (type) {
      case 'click':
        soundManager.playClick(true);
        break;
      case 'correct':
        soundManager.playCorrect(true);
        break;
      case 'incorrect':
        soundManager.playIncorrect(true);
        break;
      case 'fanfare':
        soundManager.playFanfare(true);
        break;
    }
  };

  const studentFirstName = getFirstName(profile.name);
  const studentInitials = getInitials(profile.name);

  return (
    <AppContext.Provider
      value={{
        profile,
        progress,
        bookmarks,
        currentView,
        setCurrentView,
        selectedChapterId,
        setSelectedChapterId,
        selectedTopicId,
        setSelectedTopicId,
        isSearchOpen,
        setIsSearchOpen,
        isRankModalOpen,
        setIsRankModalOpen,
        levelUpModalData,
        closeLevelUpModal,
        unlockedBadgeModalData,
        closeBadgeModal,
        checkAndUnlockBadge,
        activeXpToast,
        awardXp,
        claimDailyGoal,
        claimAllDailyGoalsBonus,
        updateProfile,
        completeFirstLaunch,
        login,
        logout,
        resetAll,
        toggleBookmark,
        isBookmarked,
        recordPracticeSession,
        recordQuizResult,
        markTopicCompleted,
        addStudyMinutes,
        updateStreak,
        t,
        studentFirstName,
        studentInitials,
        playSound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
