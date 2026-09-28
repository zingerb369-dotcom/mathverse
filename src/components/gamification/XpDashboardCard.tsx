import React from 'react';
import { useApp } from '../../context/AppContext';
import { getRankByXp, getXpProgress } from '../../data/rankData';
import { RankBadgeIcon } from './RankBadgeIcon';
import { Award, Zap, ChevronRight, Sparkles } from 'lucide-react';

export const XpDashboardCard: React.FC = () => {
  const { progress, setIsRankModalOpen, playSound } = useApp();

  const currentXp = progress.xp || 0;
  const currentRank = getRankByXp(currentXp);
  const xpInfo = getXpProgress(currentXp);

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-5 sm:p-6 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Rank Badge & Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <RankBadgeIcon
              iconName={currentRank.icon}
              level={currentRank.level}
              size="lg"
              showGlow
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
                Rank Level {currentRank.level}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-semibold text-slate-400">
                {currentRank.subtitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentRank.title}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs mt-1">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                <span>{currentXp.toLocaleString()} Total XP</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">
                {xpInfo.nextRank
                  ? `${xpInfo.remainingXp.toLocaleString()} XP to ${xpInfo.nextRank.title}`
                  : 'Maximum Rank Achieved'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Progress Meter & Browse Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:w-96">
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                {xpInfo.nextRank ? `Progress to Level ${xpInfo.nextRank.level}` : 'Grandmaster Tier'}
              </span>
              <span className="font-bold text-indigo-300">
                {xpInfo.percent}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-800/90 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${xpInfo.percent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>{xpInfo.currentTierXp} XP</span>
              <span>{xpInfo.requiredTierXp > 0 ? `${xpInfo.requiredTierXp} XP` : 'Peak'}</span>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setIsRankModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>View All Ranks</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
