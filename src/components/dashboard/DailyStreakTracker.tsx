import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Bell,
  BellOff,
  Shield,
  Award,
  ArrowRight,
  Sparkles,
  Clock,
} from 'lucide-react';

export const DailyStreakTracker: React.FC = () => {
  const {
    progress,
    profile,
    updateProfile,
    claimDailyGoal,
    claimAllDailyGoalsBonus,
    setCurrentView,
    playSound,
  } = useApp();

  const [notificationTestSent, setNotificationTestSent] = useState<boolean>(false);
  const [showReminderSettings, setShowReminderSettings] = useState<boolean>(false);

  const currentStreak = progress.currentStreak || 1;
  const longestStreak = Math.max(progress.longestStreak || 1, currentStreak);
  const todayStr = new Date().toISOString().split('T')[0];
  const isPracticedToday = progress.dailyPracticeCompletedDate === todayStr || (progress.totalQuestionsSolved > 0);

  // Compute the 7 days of the current week (Monday to Sunday)
  const today = new Date();
  const currentDayOfWeek = (today.getDay() + 6) % 7; // 0 for Monday, 6 for Sunday
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDayOfWeek);

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dayStr = d.toISOString().split('T')[0];
    const isPast = i < currentDayOfWeek;
    const isToday = i === currentDayOfWeek;
    const isFuture = i > currentDayOfWeek;
    const dayLabel = ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i];
    const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i];

    // Completed if it's past and within the streak, or if it's today and practiced
    const isCompleted = isToday
      ? isPracticedToday
      : isPast && currentDayOfWeek - i < currentStreak;

    return {
      index: i,
      label: dayLabel,
      name: dayName,
      dateNum: d.getDate(),
      dayStr,
      isPast,
      isToday,
      isFuture,
      isCompleted,
    };
  });

  // Next milestone calculation
  const milestones = [
    { days: 3, label: '3-Day Novice', xp: 50, badge: 'streak_3_days' },
    { days: 7, label: '7-Day Week Warrior', xp: 100, badge: 'streak_7_days' },
    { days: 14, label: '14-Day Consistency Master', xp: 200, badge: 'streak_14_days' },
    { days: 30, label: '30-Day Math Legend', xp: 500, badge: 'streak_30_days' },
  ];

  const nextMilestone = milestones.find((m) => m.days > currentStreak) || milestones[milestones.length - 1];
  const prevMilestoneDays = milestones.filter((m) => m.days <= currentStreak).pop()?.days || 0;
  const milestoneProgress = Math.min(
    100,
    Math.round(
      ((currentStreak - prevMilestoneDays) / Math.max(1, nextMilestone.days - prevMilestoneDays)) * 100
    )
  );

  const dailyGoals = progress.dailyGoals?.goals || [];
  const allGoalsCompleted = dailyGoals.every((g) => g.completed);
  const allBonusClaimed = progress.dailyGoals?.allBonusClaimed;

  const handleToggleNotifications = async () => {
    playSound('click');
    const newState = !profile.studyReminderEnabled;
    updateProfile({
      studyReminderEnabled: newState,
      notificationsEnabled: newState,
    });

    if (newState && 'Notification' in window && Notification.permission !== 'granted') {
      try {
        await Notification.requestPermission();
      } catch {
        // Ignored in non-supported environments
      }
    }
  };

  const handleTestNotification = () => {
    playSound('fanfare');
    setNotificationTestSent(true);

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('MATHVERSE · Daily Learning Streak', {
          body: `Keep your ${currentStreak}-day streak alive! Practice 5 minutes of Class ${profile.grade} mathematics today.`,
          icon: '/favicon.ico',
        });
      } catch {
        // Fallback
      }
    }

    setTimeout(() => {
      setNotificationTestSent(false);
    }, 4000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Top Header: Streak Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
                {currentStreak}
              </span>
              <span className="text-base sm:text-lg font-medium text-zinc-600 dark:text-zinc-400">
                {currentStreak === 1 ? 'Day Streak' : 'Days Streak'}
              </span>
              <span
                className={`ml-1.5 text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  isPracticedToday
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {isPracticedToday ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active today</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Study today to keep</span>
                  </>
                )}
              </span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Personal record: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{longestStreak} days</strong> · Consistent daily practice compounds mastery
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowReminderSettings(!showReminderSettings)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
              profile.studyReminderEnabled
                ? 'bg-blue-50/60 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900'
                : 'bg-zinc-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
            }`}
            title="Configure study reminders & notifications"
          >
            {profile.studyReminderEnabled ? (
              <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            ) : (
              <BellOff className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span>Reminders</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              setCurrentView('practice');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Practice now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Inline Reminder Drawer (if toggled) */}
      {showReminderSettings && (
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 text-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Daily Study Reminder & Notifications
              </h4>
              <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                Get a subtle prompt each evening to protect your streak before midnight.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={profile.studyReminderEnabled}
                  onChange={handleToggleNotifications}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {profile.studyReminderEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </label>

              {profile.studyReminderEnabled && (
                <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <input
                    type="time"
                    value={profile.studyReminderTime || '18:00'}
                    onChange={(e) => updateProfile({ studyReminderTime: e.target.value })}
                    className="bg-transparent border-0 p-0 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
              )}

              <button
                onClick={handleTestNotification}
                className="px-2.5 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium transition-colors cursor-pointer"
              >
                {notificationTestSent ? 'Sent!' : 'Test notification'}
              </button>
            </div>
          </div>

          {notificationTestSent && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                Notification test delivered: "Keep your {currentStreak}-day streak alive with Class {profile.grade} practice!"
              </span>
            </div>
          )}
        </div>
      )}

      {/* Week Calendar Strip & Milestone */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Weekly 7-day strip */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Consistency</span>
            </span>
            <span>This Week</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <div
                key={day.index}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all ${
                  day.isToday
                    ? 'bg-zinc-100/90 dark:bg-zinc-800/90 border-zinc-300 dark:border-zinc-700 shadow-xs'
                    : 'bg-zinc-50/60 dark:bg-zinc-950/40 border-zinc-100 dark:border-zinc-800/60'
                }`}
              >
                <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase">
                  {day.name}
                </span>

                <div className="my-1">
                  {day.isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : day.isToday ? (
                    <div className="w-6 h-6 rounded-full bg-amber-500/15 dark:bg-amber-400/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-semibold text-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-[10px] text-zinc-400">
                      {day.dateNum}
                    </div>
                  )}
                </div>

                <span
                  className={`text-[10px] tabular-nums ${
                    day.isToday
                      ? 'font-bold text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {day.dateNum}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone & Streak Shield */}
        <div className="md:col-span-5 p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-950/40 border border-zinc-200/70 dark:border-zinc-800/70 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-500" />
                <span>Next Milestone</span>
              </span>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {nextMilestone.label}
              </h4>
            </div>

            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              +{nextMilestone.xp} XP
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Goal: {nextMilestone.days} consecutive days</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 tabular-nums">
                {currentStreak} / {nextMilestone.days} d
              </span>
            </div>

            <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${milestoneProgress}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <Shield className="w-3 h-3" />
              <span>Streak Freeze Shield: 1 Free Safe Day</span>
            </span>
            <span className="text-zinc-400">Never lose progress</span>
          </div>
        </div>
      </div>

      {/* Daily Goals Subsection */}
      {dailyGoals.length > 0 && (
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Today's Learning Goals</span>
            </span>

            {allGoalsCompleted && !allBonusClaimed && (
              <button
                onClick={() => claimAllDailyGoalsBonus()}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1"
              >
                <span>Claim All Bonus (+100 XP)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {dailyGoals.map((goal) => {
              const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));

              return (
                <div
                  key={goal.id}
                  className="p-3 rounded-xl bg-zinc-50/60 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between space-y-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {goal.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 tabular-nums">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {goal.description}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          goal.completed
                            ? 'bg-emerald-600 dark:bg-emerald-400'
                            : 'bg-zinc-900 dark:bg-zinc-100'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-0.5">
                      <span className="text-zinc-400">Reward</span>
                      {goal.claimed ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Claimed ✓
                        </span>
                      ) : goal.completed ? (
                        <button
                          onClick={() => claimDailyGoal(goal.id)}
                          className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          Claim +{goal.xpReward} XP
                        </button>
                      ) : (
                        <span className="text-zinc-500 font-medium">+{goal.xpReward} XP</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
