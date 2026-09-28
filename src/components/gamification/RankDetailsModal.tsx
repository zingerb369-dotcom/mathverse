import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RANK_BADGES, getXpProgress, getRankByXp, XP_REWARDS } from '../../data/rankData';
import { RankBadgeIcon } from './RankBadgeIcon';
import {
  X,
  Award,
  Zap,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  BookOpen,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';

export const RankDetailsModal: React.FC = () => {
  const { isRankModalOpen, setIsRankModalOpen, progress, playSound } = useApp();
  const [selectedRankLevel, setSelectedRankLevel] = useState<number>(progress.level || 1);

  if (!isRankModalOpen) return null;

  const currentXp = progress.xp || 0;
  const currentRank = getRankByXp(currentXp);
  const xpInfo = getXpProgress(currentXp);
  const activeInspectRank = RANK_BADGES.find(r => r.level === selectedRankLevel) || currentRank;
  const isInspectedUnlocked = currentXp >= activeInspectRank.minXp;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Academic Rank Progression
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Accumulate Experience Points (XP) through problem-solving and curriculum mastery.
            </p>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setIsRankModalOpen(false);
            }}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Standing Banner */}
        <div className="p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <RankBadgeIcon
                iconName={currentRank.icon}
                level={currentRank.level}
                size="lg"
              />
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Level {currentRank.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentRank.subtitle}</span>
                </div>
                <div className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {currentRank.title}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums font-medium mt-0.5">
                  {currentXp.toLocaleString()} Total XP
                </div>
              </div>
            </div>

            {/* Next Rank Progress Meter */}
            <div className="sm:w-72 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {xpInfo.nextRank ? `Next: ${xpInfo.nextRank.title}` : 'Grandmaster Tier'}
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                  {xpInfo.percent}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${xpInfo.percent}%` }}
                />
              </div>
              <div className="text-[11px] text-zinc-400 text-right tabular-nums">
                {xpInfo.nextRank
                  ? `${xpInfo.remainingXp.toLocaleString()} XP to Level ${xpInfo.nextRank.level}`
                  : 'Maximum Level Reached'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body: Left Rank Track & Right Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
          {/* Left: 10 Rank Cards List */}
          <div className="md:col-span-6 p-4 sm:p-5 space-y-2 overflow-y-auto max-h-[420px]">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-1">
              Curriculum Ranks (Classes 5–10)
            </div>

            {RANK_BADGES.map(rank => {
              const isUnlocked = currentXp >= rank.minXp;
              const isCurrent = currentRank.level === rank.level;
              const isSelected = selectedRankLevel === rank.level;

              return (
                <div
                  key={rank.id}
                  onClick={() => {
                    playSound('click');
                    setSelectedRankLevel(rank.level);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800/90 border-zinc-300 dark:border-zinc-700'
                      : isUnlocked
                      ? 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
                      : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/50 dark:border-zinc-800/40 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <RankBadgeIcon
                      iconName={rank.icon}
                      level={rank.level}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                        <span>Level {rank.level}</span>
                        {isCurrent && (
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            (Current)
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {rank.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 tabular-nums">
                        {rank.minXp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Inspected Rank Details */}
          <div className="md:col-span-6 p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[420px]">
            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <RankBadgeIcon
                    iconName={activeInspectRank.icon}
                    level={activeInspectRank.level}
                    size="md"
                  />
                  <div>
                    <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Level {activeInspectRank.level} Rank
                    </div>
                    <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {activeInspectRank.title}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                    isInspectedUnlocked
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400'
                      : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500'
                  }`}
                >
                  {isInspectedUnlocked ? 'Unlocked' : `${activeInspectRank.minXp} XP`}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {activeInspectRank.description}
              </p>

              <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-700/80">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Privileges & Learning Unlocks:
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                  {activeInspectRank.perks.map((perk, pidx) => (
                    <li key={pidx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How to Earn XP */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                How to Earn Experience Points
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">+{XP_REWARDS.PRACTICE_CORRECT_ANSWER} XP</div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">Correct Question</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">+{XP_REWARDS.TOPIC_COMPLETE} XP</div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">Curriculum Topic</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">+{XP_REWARDS.QUIZ_BASE}–110 XP</div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">Completed Quiz</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">+{XP_REWARDS.DAILY_ALL_GOALS_BONUS} XP</div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">All Daily Goals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Current: <strong className="text-zinc-900 dark:text-zinc-100">{currentRank.title}</strong>
          </div>
          <button
            onClick={() => {
              playSound('click');
              setIsRankModalOpen(false);
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
