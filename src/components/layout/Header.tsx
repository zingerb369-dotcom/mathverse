import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Moon,
  Sun,
  Laptop,
  Zap,
  LogOut,
  Check,
} from 'lucide-react';
import { getRankByXp } from '../../data/rankData';
import { RankBadgeIcon } from '../gamification/RankBadgeIcon';

export const Header: React.FC = () => {
  const {
    profile,
    updateProfile,
    progress,
    setCurrentView,
    setIsSearchOpen,
    setIsRankModalOpen,
    studentFirstName,
    studentInitials,
    logout,
    t,
    playSound,
  } = useApp();

  const currentRank = getRankByXp(progress.xp || 0);

  const cycleTheme = () => {
    playSound('click');
    if (profile.theme === 'dark') {
      updateProfile({ theme: 'light' });
    } else if (profile.theme === 'light') {
      updateProfile({ theme: 'system' });
    } else {
      updateProfile({ theme: 'dark' });
    }
  };

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Search Bar Button */}
      <button
        onClick={() => {
          playSound('click');
          setIsSearchOpen(true);
        }}
        className="flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-sm w-44 sm:w-64 cursor-pointer shadow-xs"
      >
        <Search className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
        <span className="truncate text-xs sm:text-sm">{t('searchPlaceholder')}</span>
        <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono uppercase bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 dark:text-zinc-400">
          ⌘K
        </kbd>
      </button>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Rank & XP Badge Pill */}
        <button
          onClick={() => {
            playSound('click');
            setIsRankModalOpen(true);
          }}
          title="Click to view all Ranks and XP progress"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer group"
        >
          <RankBadgeIcon
            iconName={currentRank.icon}
            level={currentRank.level}
            size="sm"
          />
          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
              {currentRank.title}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 tabular-nums flex items-center gap-1 leading-none">
              <span>{(progress.xp || 0).toLocaleString()} XP</span>
            </div>
          </div>
          <span className="sm:hidden text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Lv.{currentRank.level}
          </span>
        </button>

        {/* Streak indicator with animated flame & sparks + interactive slider */}
        {(() => {
          const streak = progress.currentStreak || 1;
          const isTier2 = streak >= 3;
          const isTier3 = streak >= 7;
          const isTier4 = streak >= 14;
          const isTier5 = streak >= 30;

          const flameScale = Math.min(1.28, 0.95 + streak * 0.006);

          const outerGradStops = isTier4 ? (
            <>
              <stop offset="0%" stopColor="#70d6ff" />
              <stop offset="25%" stopColor="#ff70a6" />
              <stop offset="60%" stopColor="#ff9770" />
              <stop offset="100%" stopColor="#ffd670" />
            </>
          ) : isTier3 ? (
            <>
              <stop offset="0%" stopColor="#48cae4" />
              <stop offset="35%" stopColor="#f72585" />
              <stop offset="70%" stopColor="#fb8500" />
              <stop offset="100%" stopColor="#d90429" />
            </>
          ) : isTier2 ? (
            <>
              <stop offset="0%" stopColor="#ffe600" />
              <stop offset="35%" stopColor="#ff6d00" />
              <stop offset="70%" stopColor="#f72585" />
              <stop offset="100%" stopColor="#9e0059" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ffb703" />
              <stop offset="35%" stopColor="#fb8500" />
              <stop offset="70%" stopColor="#f72585" />
              <stop offset="100%" stopColor="#d90429" />
            </>
          );

          const innerGradStops = isTier4 ? (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#cbf3f0" />
              <stop offset="100%" stopColor="#2ec4b6" />
            </>
          ) : isTier3 ? (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#caf0f8" />
              <stop offset="100%" stopColor="#ffb703" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fff3b0" />
              <stop offset="100%" stopColor="#ffb703" />
            </>
          );

          return (
            <div
              title={`${streak} day study streak!`}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors select-none group"
            >
              <div
                style={{ transform: `scale(${flameScale})` }}
                className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center animate-float glow-phase-8 shrink-0 transition-transform duration-300"
              >
                <svg className="w-9 h-9 sm:w-12 sm:h-12 animate-flame-base overflow-visible" viewBox="0 0 100 100" fill="none">
                  <defs>
                    <linearGradient id="outerGrad" x1="50" y1="2" x2="50" y2="94" gradientUnits="userSpaceOnUse">
                      {outerGradStops}
                    </linearGradient>
                    <linearGradient id="innerGrad" x1="50" y1="38" x2="50" y2="84" gradientUnits="userSpaceOnUse">
                      {innerGradStops}
                    </linearGradient>
                    <filter id="sparkGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M50 2C50 2 20 32 20 60C20 78 33 94 50 94C67 94 80 78 80 60C80 32 50 2 50 2Z" fill="url(#outerGrad)"/>
                  <path d="M50 38C50 38 36 56 36 71C36 80 42 84 50 84C58 84 64 80 64 71C64 56 50 38 50 38Z" fill="url(#innerGrad)"/>

                  {/* Tier 1 Base Sparks (Always active) */}
                  <circle cx="48" cy="38" r="2.2" fill={isTier4 ? "#70d6ff" : "#ffe066"} className="animate-spark-1" filter="url(#sparkGlow)" />
                  <circle cx="60" cy="50" r="1.8" fill={isTier4 ? "#ff70a6" : "#ff9933"} className="animate-spark-2" filter="url(#sparkGlow)" />
                  <circle cx="36" cy="54" r="1.6" fill={isTier3 ? "#48cae4" : "#ffc04d"} className="animate-spark-3" filter="url(#sparkGlow)" />
                  <circle cx="52" cy="22" r="1.4" fill="#fff5cc" className="animate-spark-4" filter="url(#sparkGlow)" />

                  {/* Tier 2 Sparks (3+ days) */}
                  {isTier2 && (
                    <>
                      <circle cx="42" cy="46" r="2.0" fill="#ffb703" className="animate-spark-5" filter="url(#sparkGlow)" />
                      <circle cx="58" cy="32" r="1.8" fill="#fb5607" className="animate-spark-6" filter="url(#sparkGlow)" />
                    </>
                  )}

                  {/* Tier 3 Sparks (7+ days) */}
                  {isTier3 && (
                    <>
                      <circle cx="50" cy="18" r="2.4" fill="#00f5d4" className="animate-spark-7" filter="url(#sparkGlow)" />
                      <circle cx="34" cy="38" r="1.7" fill="#7b2cbf" className="animate-spark-8" filter="url(#sparkGlow)" />
                    </>
                  )}
                </svg>
              </div>

              <div className="flex flex-col text-left">
                <span className="tabular-nums font-bold text-xs sm:text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  {streak} {t('days')}
                </span>
              </div>
            </div>
          );
        })()}

        {/* Study Reminder Notice icon if active */}
        {profile.studyReminderEnabled && (
          <div
            title={`${t('activeReminderNotice')} ${profile.studyReminderTime}`}
            className="flex items-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-help p-1.5"
          >
            <Bell className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Theme cycle button */}
        <button
          onClick={cycleTheme}
          title={`Current Theme: ${profile.theme}`}
          className="p-1.5 sm:p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {profile.theme === 'dark' && <Moon className="w-4 h-4" />}
          {profile.theme === 'light' && <Sun className="w-4 h-4" />}
          {profile.theme === 'system' && <Laptop className="w-4 h-4" />}
        </button>

        {/* User Profile Avatar Link */}
        <button
          onClick={() => {
            playSound('click');
            setCurrentView('profile');
          }}
          className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800 hover:opacity-85 transition-opacity cursor-pointer"
          title="Open Profile & Badges"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-medium text-xs shadow-xs">
            {studentInitials}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1 leading-tight">
              {studentFirstName}
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Class {profile.grade}
            </div>
          </div>
        </button>

        {/* Sign Out / Switch Account */}
        <button
          onClick={() => {
            playSound('click');
            logout();
          }}
          className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
          title="Sign Out / Switch Account"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
