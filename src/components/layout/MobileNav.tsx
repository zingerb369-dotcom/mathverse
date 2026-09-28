import React, { useState, useEffect } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Zap,
  MoreHorizontal,
  GraduationCap,
  Bot,
  Sigma,
  Bookmark,
  TrendingUp,
  Settings,
  Award,
  X,
  FileText,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, profile, t, playSound } = useApp();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Automatically dismiss more menu if the user scrolls anywhere on the screen
  useEffect(() => {
    if (!isMoreOpen) return;
    const handleScroll = () => {
      setIsMoreOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, [isMoreOpen]);

  // When switching views, ensure drawer is closed
  useEffect(() => {
    setIsMoreOpen(false);
  }, [currentView]);

  const primaryItems: { id: AppView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { id: 'learn', label: t('navLearn'), icon: BookOpen },
    { id: 'tutor', label: t('navAiTutor'), icon: Bot },
    { id: 'practice', label: t('navPractice'), icon: CheckSquare },
    { id: 'quiz', label: t('navQuiz'), icon: Zap },
  ];

  const secondaryItems: { id: AppView; label: string; icon: React.FC<{ className?: string }> }[] = [
    ...(profile.grade === 10
      ? [{ id: 'exam10' as AppView, label: t('navExamPrep'), icon: GraduationCap }]
      : []),
    { id: 'formulas', label: t('navFormulas'), icon: Sigma },
    { id: 'ncert', label: 'NCERT PDFs', icon: FileText },
    { id: 'bookmarks', label: t('navBookmarks'), icon: Bookmark },
    { id: 'progress', label: t('navProgress'), icon: TrendingUp },
    { id: 'profile', label: 'Profile & Badges', icon: Award },
    { id: 'settings', label: t('navSettings'), icon: Settings },
  ];

  // If in tutor view, hide the fixed bottom bar to maximize the chat workspace
  if (currentView === 'tutor') {
    return null;
  }

  return (
    <>
      {/* Clean Drawer for secondary navigation with auto-dismiss on scroll or tap */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden animate-in fade-in duration-100"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="absolute bottom-16 inset-x-3 max-w-lg mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-2xl space-y-2 animate-in slide-in-from-bottom duration-150"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Explore MATHVERSE
              </span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                title="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 max-h-[60vh] overflow-y-auto">
              {secondaryItems.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playSound('click');
                      setCurrentView(item.id);
                      setIsMoreOpen(false);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main bottom navigation bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-16 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around px-2">
        {primaryItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound('click');
                setCurrentView(item.id);
                setIsMoreOpen(false);
              }}
              className={`flex flex-col items-center justify-center gap-1 min-w-[54px] py-1 transition-colors cursor-pointer ${
                isActive
                  ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-tight truncate max-w-[64px]">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More button */}
        <button
          onClick={() => {
            playSound('click');
            setIsMoreOpen(prev => !prev);
          }}
          className={`flex flex-col items-center justify-center gap-1 min-w-[54px] py-1 transition-colors cursor-pointer ${
            isMoreOpen || secondaryItems.some(i => i.id === currentView)
              ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
              : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
          title="More sections"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">More</span>
        </button>
      </div>
    </>
  );
};
