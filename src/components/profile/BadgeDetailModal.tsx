import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserBadge } from '../../data/badgeData';
import { BadgeInsignia } from './BadgeInsignia';
import { X, CheckCircle2, ArrowRight, Zap, Target } from 'lucide-react';

interface BadgeDetailModalProps {
  badge: UserBadge | null;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, onClose }) => {
  const { setCurrentView, playSound } = useApp();

  if (!badge) return null;

  const percent = badge.target > 0
    ? Math.min(100, Math.round(((badge.currentProgress || 0) / badge.target) * 100))
    : 0;

  const handleAction = () => {
    playSound('click');
    onClose();
    if (badge.category === 'quiz') {
      setCurrentView('quiz');
    } else if (badge.category === 'mastery') {
      setCurrentView('learn');
    } else {
      setCurrentView('practice');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-zinc-900/10 dark:shadow-black/40 text-center animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge Insignia */}
        <div className="flex justify-center mb-5">
          <BadgeInsignia
            iconName={badge.icon}
            tier={badge.tier}
            isUnlocked={badge.isUnlocked}
            size="xl"
          />
        </div>

        {/* Category & Tier Label */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
          <span>{badge.category}</span>
          <span aria-hidden="true">·</span>
          <span>{badge.tier} tier</span>
        </div>

        {/* Badge Title & Description */}
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
          {badge.name}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
          {badge.description}
        </p>

        {/* Milestone Requirements Card */}
        <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 mb-6 text-left space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-600 dark:text-zinc-300">
              Milestone Requirement
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 tabular-nums">
              {badge.currentProgress || 0} / {badge.target}
            </span>
          </div>

          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                badge.isUnlocked
                  ? 'bg-zinc-900 dark:bg-zinc-100'
                  : 'bg-blue-600 dark:bg-blue-500'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5">
            <span>{badge.criteria}</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>+{badge.xpReward} XP</span>
            </span>
          </div>
        </div>

        {/* Status / Action Footer */}
        {badge.isUnlocked ? (
          <div className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              Unlocked {badge.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString() : 'Active'}
            </span>
          </div>
        ) : (
          <button
            onClick={handleAction}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {badge.category === 'quiz'
                ? 'Take a Quiz'
                : badge.category === 'mastery'
                ? 'Master Concepts'
                : 'Practice Now'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
