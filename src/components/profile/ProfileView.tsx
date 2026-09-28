import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getBadgesWithProgress, UserBadge, BadgeCategory } from '../../data/badgeData';
import { getRankByXp, getXpProgress } from '../../data/rankData';
import { BadgeInsignia } from './BadgeInsignia';
import { BadgeDetailModal } from './BadgeDetailModal';
import {
  Flame,
  CheckCircle2,
  Clock,
  Target,
  Award,
  Zap,
  ChevronRight,
  Filter,
  Check,
  Edit2,
  Lock,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    profile,
    updateProfile,
    progress,
    bookmarks,
    setIsRankModalOpen,
    setCurrentView,
    studentFirstName,
    playSound,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<BadgeCategory | 'all'>('all');
  const [selectedBadge, setSelectedBadge] = useState<UserBadge | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  // Compute stats for badges
  const currentStreak = progress.currentStreak || 1;
  const totalCorrect = progress.totalCorrect || 0;
  const totalQuestionsSolved = progress.totalQuestionsSolved || 0;
  const quizHistoryCount = progress.quizHistory?.length || 0;
  const quizzes90PlusCount = (progress.quizHistory || []).filter(q => q.percentage >= 90).length;
  const hasFlawlessSession = (progress.practiceHistory || []).some(
    p => p.totalQuestions >= 10 && p.percentage === 100
  );
  const hasMarathonSession = (progress.practiceHistory || []).some(
    p => p.totalQuestions >= 20
  );
  const hasTimedSpeedPass = (progress.quizHistory || []).some(
    q => q.quizType === 'timed' && q.percentage >= 80
  );
  const hasBoardMockPass = (progress.quizHistory || []).some(
    q => q.quizType === 'full_syllabus' || q.title.toLowerCase().includes('mock')
  );
  const hasFlawlessQuiz = (progress.quizHistory || []).some(q => q.percentage === 100);
  const completedChaptersCount = progress.completedChapters?.length || 0;
  const bookmarkedFormulasCount = bookmarks?.formulaIds?.length || 0;
  const xp = progress.xp || 0;

  const allBadges = getBadgesWithProgress(
    progress.unlockedBadges || ['practice_first'],
    {
      currentStreak,
      totalCorrect,
      totalQuestionsSolved,
      quizHistoryCount,
      quizzes90PlusCount,
      hasFlawlessSession,
      hasMarathonSession,
      hasTimedSpeedPass,
      hasBoardMockPass,
      hasFlawlessQuiz,
      completedChaptersCount,
      bookmarkedFormulasCount,
      xp,
    },
    progress.badgeHistory || []
  );

  const filteredBadges = activeCategory === 'all'
    ? allBadges
    : allBadges.filter(b => b.category === activeCategory);

  const unlockedCount = allBadges.filter(b => b.isUnlocked).length;
  const totalBadgesCount = allBadges.length;

  const currentRank = getRankByXp(xp);
  const xpInfo = getXpProgress(xp);

  const accuracy = totalQuestionsSolved > 0
    ? Math.round((totalCorrect / totalQuestionsSolved) * 100)
    : 0;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    playSound('click');
    updateProfile({ name: nameInput.trim() });
    setIsEditingName(false);
  };

  const categories: { id: BadgeCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: allBadges.length },
    { id: 'streak', label: 'Streaks', count: allBadges.filter(b => b.category === 'streak').length },
    { id: 'practice', label: 'Practice', count: allBadges.filter(b => b.category === 'practice').length },
    { id: 'quiz', label: 'Quizzes', count: allBadges.filter(b => b.category === 'quiz').length },
    { id: 'mastery', label: 'Mastery', count: allBadges.filter(b => b.category === 'mastery').length },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12 animate-in fade-in duration-150 pb-16">
      {/* Header Profile Identity */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span>Class {profile.grade} CBSE</span>
              <span aria-hidden="true">·</span>
              <span>Academic Profile</span>
            </div>

            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 bg-transparent border-b border-zinc-300 dark:border-zinc-700 outline-none pb-0.5"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {profile.name || 'Mathematics Student'}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                  title="Edit name"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
              <span>Joined {new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
              <span aria-hidden="true">·</span>
              <span>Level {currentRank.level} {currentRank.title}</span>
            </div>
          </div>

          {/* Rank Quick Card */}
          <div
            onClick={() => {
              playSound('click');
              setIsRankModalOpen(true);
            }}
            className="flex items-center gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer group shrink-0"
          >
            <div>
              <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Academic Standing
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {currentRank.title}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                {xp.toLocaleString()} XP
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
          </div>
        </div>
      </div>

      {/* Quantitative Summary (Unboxed, clean, whitespace-driven) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-1">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Study Streak
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {currentStreak} <span className="text-sm font-normal text-zinc-500">days</span>
          </div>
          <div className="text-[11px] text-zinc-400">
            Longest: {progress.longestStreak} days
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-1">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Problems Solved
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {totalQuestionsSolved}
          </div>
          <div className="text-[11px] text-zinc-400">
            {totalCorrect} verified correct
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-1">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Problem Accuracy
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {accuracy}%
          </div>
          <div className="text-[11px] text-zinc-400">
            Overall precision rate
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-1">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Active Study Time
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {Math.floor(progress.totalStudyMinutes / 60)}h {progress.totalStudyMinutes % 60}m
          </div>
          <div className="text-[11px] text-zinc-400">
            Total active practice
          </div>
        </div>
      </div>

      {/* Badge Collection Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Badge Collection
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Honors awarded for consistency, problem-solving volume, and examination mastery.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            <span>{unlockedCount} of {totalBadgesCount} unlocked</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400 dark:text-zinc-500">
              {Math.round((unlockedCount / totalBadgesCount) * 100)}%
            </span>
          </div>
        </div>

        {/* Apple-style Filter Segmented Tabs */}
        <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSound('click');
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 text-[11px] opacity-60 tabular-nums">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredBadges.map(badge => {
            const percent = badge.target > 0
              ? Math.min(100, Math.round(((badge.currentProgress || 0) / badge.target) * 100))
              : 0;

            return (
              <div
                key={badge.id}
                onClick={() => {
                  playSound('click');
                  setSelectedBadge(badge);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  badge.isUnlocked
                    ? 'bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                    : 'bg-zinc-50/70 dark:bg-zinc-900/30 border-zinc-200/60 dark:border-zinc-800/50 opacity-75 hover:opacity-100 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <BadgeInsignia
                    iconName={badge.icon}
                    tier={badge.tier}
                    isUnlocked={badge.isUnlocked}
                    size="md"
                  />

                  <div className="text-right">
                    {badge.isUnlocked ? (
                      <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 tabular-nums">
                        {badge.currentProgress || 0} / {badge.target}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-0.5">
                    {badge.category} · {badge.tier}
                  </div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {badge.description}
                  </p>
                </div>

                {/* Progress bar or unlock date */}
                <div className="pt-1">
                  {badge.isUnlocked ? (
                    <div className="text-[11px] text-zinc-400 dark:text-zinc-500">
                      {badge.criteria}
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                        {badge.criteria}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </div>
  );
};
