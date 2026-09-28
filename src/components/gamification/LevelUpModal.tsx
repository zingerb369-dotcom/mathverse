import React from 'react';
import { useApp } from '../../context/AppContext';
import { RankBadgeIcon } from './RankBadgeIcon';
import { Sparkles, CheckCircle2, Award, ArrowRight, X } from 'lucide-react';

export const LevelUpModal: React.FC = () => {
  const { levelUpModalData, closeLevelUpModal, playSound } = useApp();

  if (!levelUpModalData) return null;

  const { rank } = levelUpModalData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl text-center animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            closeLevelUpModal();
          }}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Kicker */}
        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Academic Standing Unlocked
        </span>

        {/* Rank Icon */}
        <div className="flex justify-center mb-4">
          <RankBadgeIcon
            iconName={rank.icon}
            level={rank.level}
            size="xl"
          />
        </div>

        {/* Level & Title */}
        <div className="space-y-0.5 mb-3">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Level {rank.level} · {rank.subtitle}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {rank.title}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-3.5 text-left">
          {rank.description}
        </p>

        {/* Perks Unlocked */}
        <div className="text-left bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 mb-6 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Privileges Unlocked:
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {rank.perks.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            playSound('click');
            closeLevelUpModal();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
