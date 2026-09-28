import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserBadge } from '../../data/badgeData';
import { BadgeInsignia } from './BadgeInsignia';
import { X, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface BadgeUnlockModalProps {
  badge: UserBadge | null;
  onClose: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badge, onClose }) => {
  const { playSound } = useApp();

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Milestone Achieved
        </span>

        <div className="flex justify-center mb-4">
          <BadgeInsignia
            iconName={badge.icon}
            tier={badge.tier}
            isUnlocked={true}
            size="xl"
          />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
          {badge.name}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          {badge.description}
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-3 mb-5 text-xs text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
          <span>{badge.criteria}</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>+{badge.xpReward} XP</span>
          </span>
        </div>

        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Collect Badge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
