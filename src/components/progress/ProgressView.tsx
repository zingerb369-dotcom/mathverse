import React from 'react';
import { useApp } from '../../context/AppContext';
import { getChaptersByGrade } from '../../data/curriculum';
import { RANK_BADGES, getRankByXp, getXpProgress } from '../../data/rankData';
import { RankBadgeIcon } from '../gamification/RankBadgeIcon';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  CheckSquare,
  Lock,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { profile, progress, setIsRankModalOpen, setCurrentView, playSound, t } = useApp();

  const chapters = getChaptersByGrade(profile.grade);
  const totalChapters = chapters.length;
  const completedChaptersCount = progress.completedChapters.filter(cid =>
    chapters.some(c => c.id === cid)
  ).length;

  const currentXp = progress.xp || 0;
  const currentRank = getRankByXp(currentXp);
  const xpInfo = getXpProgress(currentXp);

  const overallPercent = totalChapters > 0
    ? Math.min(100, Math.round((completedChaptersCount / totalChapters) * 100))
    : 0;

  const accuracyPercent = progress.totalQuestionsSolved > 0
    ? Math.round((progress.totalCorrect / progress.totalQuestionsSolved) * 100)
    : 0;

  return (
    <div className="space-y-10 sm:space-y-12 max-w-5xl mx-auto animate-in fade-in duration-150 pb-16">
      {/* Header */}
      <div className="pt-2 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Class {profile.grade} · Diagnostics & Analytics
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            {t('navProgress')}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              setCurrentView('profile');
            }}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View Badge Collection</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{t('overallProgress')}</span>
            <Target className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {overallPercent}%
          </div>
          <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block">
            {completedChaptersCount} of {totalChapters} chapters mastered
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{t('accuracy')}</span>
            <CheckSquare className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {accuracyPercent}%
          </div>
          <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${accuracyPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block">
            {progress.totalCorrect} / {progress.totalQuestionsSolved} solved
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{t('studyStreak')}</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {progress.currentStreak} <span className="text-sm font-normal text-zinc-500">{t('days')}</span>
          </div>
          <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${Math.min(100, (progress.currentStreak / 7) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block">
            Longest: {progress.longestStreak} days
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{t('studyTime')}</span>
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {Math.floor(progress.totalStudyMinutes / 60)}h {progress.totalStudyMinutes % 60}m
          </div>
          <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-700 dark:bg-zinc-300 rounded-full" style={{ width: '75%' }} />
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block">
            Active mathematical focus
          </span>
        </div>
      </div>

      {/* Chapters Completion Matrix */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h2 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
            Class {profile.grade} Chapter Mastery Matrix
          </h2>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {completedChaptersCount} of {totalChapters} finished
          </span>
        </div>

        <div className="space-y-2.5">
          {chapters.map(ch => {
            const isCompleted = progress.completedChapters.includes(ch.id);
            const completedTopicsInCh = ch.topics.filter(t => progress.completedTopics.includes(t.id)).length;
            const chPercent = ch.topics.length > 0
              ? Math.round((completedTopicsInCh / ch.topics.length) * 100)
              : 0;

            return (
              <div
                key={ch.id}
                className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-medium text-xs shrink-0">
                    {ch.order}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">
                      {ch.name}
                    </div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500">
                      {completedTopicsInCh} of {ch.topics.length} topics mastered
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:w-48">
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex-1">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-600 dark:bg-emerald-500'
                          : 'bg-blue-600 dark:bg-blue-500'
                      }`}
                      style={{ width: `${chPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 w-10 text-right tabular-nums">
                    {chPercent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Academic Rank Hierarchy */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <RankBadgeIcon
              iconName={currentRank.icon}
              level={currentRank.level}
              size="md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Academic Ranks & Levelling
                </h2>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  Level {currentRank.level}: {currentRank.title}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Earn experience points through daily targets, chapter completion, and examination accuracy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSound('click');
                setIsRankModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs transition-colors cursor-pointer"
            >
              XP Roadmap
            </button>
            <button
              onClick={() => {
                playSound('click');
                setCurrentView('profile');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-xs transition-colors cursor-pointer"
            >
              Badge Collection
            </button>
          </div>
        </div>

        {/* 10 Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {RANK_BADGES.map(rank => {
            const isUnlocked = currentXp >= rank.minXp;
            const isCurrent = currentRank.level === rank.level;

            return (
              <div
                key={rank.id}
                onClick={() => {
                  playSound('click');
                  setIsRankModalOpen(true);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isCurrent
                    ? 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-400 dark:border-zinc-600 shadow-xs'
                    : isUnlocked
                    ? 'bg-zinc-50/80 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    : 'bg-zinc-50/30 dark:bg-zinc-950/20 border-zinc-200/50 dark:border-zinc-800/40 opacity-50 hover:opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <RankBadgeIcon
                    iconName={rank.icon}
                    level={rank.level}
                    size="sm"
                  />
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </div>

                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Level {rank.level}
                  </div>
                  <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                    {rank.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {rank.minXp.toLocaleString()} XP
                  </div>
                </div>

                {isCurrent ? (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-center">
                    Current Rank
                  </span>
                ) : (
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate block">
                    {rank.subtitle}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Link to User Profile Badges */}
      <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Comprehensive Badge Collection
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            View unlocked milestone honors, active streak badges, practice sprint insignias, and CBSE mastery tiers.
          </p>
        </div>

        <button
          onClick={() => {
            playSound('click');
            setCurrentView('profile');
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-xs transition-colors cursor-pointer shrink-0"
        >
          <span>Open Profile & Badges</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
