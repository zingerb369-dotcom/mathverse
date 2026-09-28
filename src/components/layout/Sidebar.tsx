import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Zap,
  GraduationCap,
  Bot,
  Sigma,
  Bookmark,
  TrendingUp,
  Settings,
  Award,
  FileText,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, profile, t, playSound } = useApp();

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; highlight?: boolean }[] = [
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { id: 'learn', label: t('navLearn'), icon: BookOpen },
    { id: 'practice', label: t('navPractice'), icon: CheckSquare },
    { id: 'quiz', label: t('navQuiz'), icon: Zap },
    ...(profile.grade === 10
      ? [{ id: 'exam10' as AppView, label: t('navExamPrep'), icon: GraduationCap, highlight: true }]
      : []),
    { id: 'tutor', label: t('navAiTutor'), icon: Bot },
    { id: 'formulas', label: t('navFormulas'), icon: Sigma },
    { id: 'ncert', label: 'NCERT PDFs', icon: FileText },
    { id: 'bookmarks', label: t('navBookmarks'), icon: Bookmark },
    { id: 'progress', label: t('navProgress'), icon: TrendingUp },
    { id: 'profile', label: 'Profile & Badges', icon: Award },
    { id: 'settings', label: t('navSettings'), icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 p-4 shrink-0 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-2.5 py-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
          MV
        </div>
        <div>
          <span className="font-semibold text-base tracking-tight text-zinc-900 dark:text-zinc-100 block leading-tight">
            MATHVERSE
          </span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">
            Classes 5–10 CBSE
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto pr-1">
        {navItems.map(item => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound('click');
                setCurrentView(item.id);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer ${
                isActive
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-400 dark:text-zinc-500'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Academic Year Notice */}
      <div className="pt-3 mt-auto border-t border-zinc-200 dark:border-zinc-800/80 px-2">
        <div className="text-[11px] text-zinc-400 dark:text-zinc-500 flex flex-col gap-0.5">
          <span className="font-medium text-zinc-600 dark:text-zinc-400">CBSE / NCERT</span>
          <span>{t('syllabusYear')}</span>
        </div>
      </div>
    </aside>
  );
};
