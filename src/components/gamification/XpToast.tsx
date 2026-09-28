import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap } from 'lucide-react';

export const XpToast: React.FC = () => {
  const { activeXpToast } = useApp();

  if (!activeXpToast) return null;

  return (
    <div className="fixed top-18 right-4 sm:right-6 z-50 pointer-events-none animate-in slide-in-from-top-2 fade-in duration-150">
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-black/5 dark:shadow-black/40">
        <div className="w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-amber-500 flex items-center justify-center shrink-0">
          <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
        </div>
        <div>
          <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
            <span>+{activeXpToast.amount} XP</span>
            <span className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400">
              {activeXpToast.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
