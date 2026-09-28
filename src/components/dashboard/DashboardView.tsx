import React from 'react';
import { useApp } from '../../context/AppContext';
import { getChaptersByGrade, getChapterById } from '../../data/curriculum';
import { getBadgesWithProgress } from '../../data/badgeData';
import { BadgeInsignia } from '../profile/BadgeInsignia';
import {
  ArrowRight,
  ChevronRight,
  BookOpen,
  CheckSquare,
  Zap,
  Bot,
  Sigma,
  Flame,
  Award,
  Clock,
  Target,
  FileCheck,
} from 'lucide-react';
import { DailyStreakTracker } from './DailyStreakTracker';

export const DashboardView: React.FC = () => {
  const {
    profile,
    progress,
    bookmarks,
    setCurrentView,
    setSelectedChapterId,
    setSelectedTopicId,
    playSound,
    t,
  } = useApp();

  const chapters = getChaptersByGrade(profile.grade);
  const totalChapters = chapters.length;

  const completedChaptersCount = progress.completedChapters.filter(cid =>
    chapters.some(c => c.id === cid)
  ).length;

  const overallPercent = totalChapters > 0
    ? Math.min(100, Math.round((completedChaptersCount / totalChapters) * 100))
    : 0;

  // Continue Learning chapter: last studied or first incomplete chapter
  const continueChapter =
    (progress.lastStudiedChapterId && getChapterById(progress.lastStudiedChapterId)) ||
    chapters.find(c => !progress.completedChapters.includes(c.id)) ||
    chapters[0];

  const continueChapterTopics = continueChapter?.topics || [];
  const completedTopicsCount = continueChapterTopics.filter(tp =>
    progress.completedTopics.includes(tp.id)
  ).length;

  const continuePercent = continueChapterTopics.length > 0
    ? Math.min(100, Math.round((completedTopicsCount / continueChapterTopics.length) * 100))
    : 0;

  // Accuracy calculation
  const accuracyPercent = progress.totalQuestionsSolved > 0
    ? Math.round((progress.totalCorrect / progress.totalQuestionsSolved) * 100)
    : 0;

  // Active badges data
  const allBadges = getBadgesWithProgress(
    progress.unlockedBadges || ['practice_first'],
    {
      currentStreak: progress.currentStreak || 1,
      totalCorrect: progress.totalCorrect || 0,
      totalQuestionsSolved: progress.totalQuestionsSolved || 0,
      quizHistoryCount: progress.quizHistory?.length || 0,
      quizzes90PlusCount: (progress.quizHistory || []).filter(q => q.percentage >= 90).length,
      hasFlawlessSession: (progress.practiceHistory || []).some(p => p.totalQuestions >= 10 && p.percentage === 100),
      hasMarathonSession: (progress.practiceHistory || []).some(p => p.totalQuestions >= 20),
      hasTimedSpeedPass: (progress.quizHistory || []).some(q => q.quizType === 'timed' && q.percentage >= 80),
      hasBoardMockPass: (progress.quizHistory || []).some(q => q.quizType === 'full_syllabus' || q.title.toLowerCase().includes('mock')),
      hasFlawlessQuiz: (progress.quizHistory || []).some(q => q.percentage === 100),
      completedChaptersCount: progress.completedChapters?.length || 0,
      bookmarkedFormulasCount: bookmarks?.formulaIds?.length || 0,
      xp: progress.xp || 0,
    },
    progress.badgeHistory || []
  );

  const unlockedBadges = allBadges.filter(b => b.isUnlocked);
  const nextMilestoneBadge = allBadges.find(b => !b.isUnlocked) || allBadges[0];

  // Up next syllabus chapters
  const activeChapters = chapters.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-12 sm:space-y-14 animate-in fade-in duration-150 pb-16">
      {/* 1. Header: Apple-style typographic quiet confidence */}
      <div className="pt-2 pb-2">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Class {profile.grade} · CBSE Mathematics
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
          MATHVERSE
        </h1>
        <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-normal mt-1">
          Mathematics, understood.
        </p>
      </div>

      {/* 2. Hero Anchor: Continue where you left off */}
      {continueChapter && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Continue where you left off
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Class {profile.grade} · {continueChapter.name}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {continueChapter.overview || continueChapter.description}
                </p>
              </div>

              {/* Clean unboxed progress indicator */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-32 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${continuePercent}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 tabular-nums">
                  {continuePercent}% complete
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {completedTopicsCount} of {continueChapterTopics.length} topics mastered
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                setSelectedChapterId(continueChapter.id);
                setCurrentView('learn');
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-sm transition-colors cursor-pointer shrink-0"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Daily Learning Streak Tracker */}
      <DailyStreakTracker />

      {/* 3. Section: Your learning */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Your learning
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Curriculum progression and chapter milestones for Class {profile.grade}.
            </p>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2 pt-1 sm:pt-0">
            <span>{completedChaptersCount} of {totalChapters} chapters</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-medium text-zinc-700 dark:text-zinc-300">{overallPercent}% syllabus</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeChapters.map(chap => {
            const chapTopics = chap.topics;
            const chapDone = chapTopics.filter(tp => progress.completedTopics.includes(tp.id)).length;
            const pct = chapTopics.length > 0 ? Math.round((chapDone / chapTopics.length) * 100) : 0;
            const isCompleted = progress.completedChapters.includes(chap.id);

            return (
              <div
                key={chap.id}
                onClick={() => {
                  playSound('click');
                  setSelectedChapterId(chap.id);
                  setCurrentView('learn');
                }}
                className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                    <span>Chapter {chap.order}</span>
                    <span className="tabular-nums">{chap.weightageMarks} marks</span>
                  </div>
                  <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                    {chap.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {chap.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {isCompleted ? 'Mastered' : `${chapDone} of ${chapTopics.length} topics`}
                    </span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300 tabular-nums">
                      {pct}%
                    </span>
                  </div>

                  <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-600 dark:bg-emerald-500'
                          : 'bg-zinc-900 dark:bg-zinc-100'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Section: Practice */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Practice
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Targeted workouts, accuracy tuning, and active problem solving.
            </p>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2 pt-1 sm:pt-0">
            <span className="tabular-nums font-medium text-zinc-700 dark:text-zinc-300">{progress.totalQuestionsSolved} solved</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{accuracyPercent}% accuracy</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chapter Workout Card */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  Focused Workout
                </span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {continueChapter?.name} Drill
                </h3>
              </div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                {continueChapter?.totalQuestionsCount || 20} questions available
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Step-by-step verified NCERT problems covering core theorems, proofs, and application questions.
            </p>

            <button
              onClick={() => {
                playSound('click');
                setCurrentView('practice');
              }}
              className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer pt-1"
            >
              <span>Start session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Daily Streak & Practice Milestone */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                <span>Daily Consistency</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium tabular-nums">
                  {progress.currentStreak} day streak
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Milestone in Reach
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {nextMilestoneBadge.name}: {nextMilestoneBadge.criteria}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Progress</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium tabular-nums">
                  {nextMilestoneBadge.currentProgress || 0} / {nextMilestoneBadge.target}
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round(((nextMilestoneBadge.currentProgress || 0) / nextMilestoneBadge.target) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Mastery */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Mastery
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Formal assessment simulations and verified badge collection.
            </p>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setCurrentView('profile');
            }}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 cursor-pointer pt-1 sm:pt-0"
          >
            <span>View badge collection</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Assessment & Mock Exams */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-4 shadow-xs">
            <div>
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Assessments & Mocks
              </span>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                CBSE Examination Ready
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Standard 80-mark blueprint mock examinations with step-marking schemes and timed speed challenges.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  playSound('click');
                  setCurrentView('quiz');
                }}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-xs transition-colors cursor-pointer"
              >
                Launch Mock Exam
              </button>
              {profile.grade === 10 && (
                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentView('exam10');
                  }}
                  className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-colors cursor-pointer"
                >
                  Class 10 Hub
                </button>
              )}
            </div>
          </div>

          {/* Badge Collection Spotlight */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl space-y-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                <span>Badge Collection</span>
                <span className="tabular-nums">
                  {unlockedBadges.length} of {allBadges.length} unlocked
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Recent Milestones
              </h3>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {unlockedBadges.slice(0, 4).map(b => (
                <div
                  key={b.id}
                  onClick={() => {
                    playSound('click');
                    setCurrentView('profile');
                  }}
                  title={`${b.name}: ${b.criteria}`}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <BadgeInsignia
                    iconName={b.icon}
                    tier={b.tier}
                    isUnlocked={true}
                    size="md"
                  />
                </div>
              ))}
              {unlockedBadges.length < 4 && (
                <div
                  onClick={() => {
                    playSound('click');
                    setCurrentView('profile');
                  }}
                  className="cursor-pointer transition-transform hover:scale-105 opacity-60"
                  title={`${nextMilestoneBadge.name}: ${nextMilestoneBadge.criteria}`}
                >
                  <BadgeInsignia
                    iconName={nextMilestoneBadge.icon}
                    tier={nextMilestoneBadge.tier}
                    isUnlocked={false}
                    size="md"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => {
                playSound('click');
                setCurrentView('profile');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer pt-2"
            >
              <span>Explore all milestones in profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Section: Explore */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Explore
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Formula compendiums, socratic AI reasoning, and personal bookmarks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => {
              playSound('click');
              setCurrentView('formulas');
            }}
            className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer space-y-2 shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Sigma className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              Formula Library
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              All Class 5–10 theorems, identities, and proofs categorized by chapter.
            </p>
          </div>

          <div
            onClick={() => {
              playSound('click');
              setCurrentView('tutor');
            }}
            className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer space-y-2 shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              Socratic Math Tutor
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Guided conceptual hints without spoiling step-by-step derivations.
            </p>
          </div>

          <div
            onClick={() => {
              playSound('click');
              setCurrentView('bookmarks');
            }}
            className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer space-y-2 shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              Personal Vault
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Saved formulas, challenging questions, and key revision topics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
