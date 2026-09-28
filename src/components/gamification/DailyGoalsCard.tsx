import React from 'react';
import { useApp } from '../../context/AppContext';
import { XP_REWARDS } from '../../data/rankData';
import {
  Target,
  CheckCircle2,
  Zap,
  Sparkles,
  Gift,
  Flame,
  ArrowRight,
} from 'lucide-react';

export const DailyGoalsCard: React.FC = () => {
  const { progress, claimDailyGoal, claimAllDailyGoalsBonus, setCurrentView, playSound } = useApp();

  const dailyGoals = progress.dailyGoals;
  if (!dailyGoals || !Array.isArray(dailyGoals.goals)) return null;

  const allCompleted = dailyGoals.goals.every(g => g.completed);
  const allClaimed = dailyGoals.goals.every(g => g.claimed);
  const completedCount = dailyGoals.goals.filter(g => g.completed).length;

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">Daily Learning Goals</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {completedCount}/3 Done
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Complete your daily syllabus targets to earn bonus XP and unlock higher ranks.
            </p>
          </div>
        </div>

        {/* All Goals Bonus Badge / Button */}
        {allClaimed ? (
          !dailyGoals.allBonusClaimed ? (
            <button
              onClick={() => {
                playSound('fanfare');
                claimAllDailyGoalsBonus();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 animate-pulse cursor-pointer shrink-0"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Claim +{XP_REWARDS.DAILY_ALL_GOALS_BONUS} XP Super Bonus!</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 px-3 py-1 rounded-xl bg-amber-950/40 border border-amber-500/30 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Daily Bonuses Claimed!</span>
            </div>
          )
        ) : null}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {dailyGoals.goals.map(goal => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));

          return (
            <div
              key={goal.id}
              className={`p-4 rounded-2xl border transition-all space-y-2.5 flex flex-col justify-between ${
                goal.claimed
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : goal.completed
                  ? 'bg-indigo-950/30 border-indigo-500/50 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/50 border-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-sm text-slate-200">
                    {goal.title}
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 shrink-0 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-amber-400" />
                    <span>+{goal.xpReward} XP</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {goal.description}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Progress</span>
                  <span className="font-bold text-slate-200">
                    {goal.current} / {goal.target}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      goal.completed ? 'bg-emerald-400' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Claim / Status Action */}
                <div className="pt-1">
                  {goal.claimed ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium py-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Reward Claimed</span>
                    </div>
                  ) : goal.completed ? (
                    <button
                      onClick={() => {
                        playSound('fanfare');
                        claimDailyGoal(goal.id);
                      }}
                      className="w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Claim +{goal.xpReward} XP</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        playSound('click');
                        if (goal.id === 'goal_complete_topic') {
                          setCurrentView('learn');
                        } else {
                          setCurrentView('practice');
                        }
                      }}
                      className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Start Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
