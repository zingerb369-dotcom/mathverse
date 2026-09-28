/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { FirstLaunchSetup } from './components/setup/FirstLaunchSetup';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { LevelUpModal } from './components/gamification/LevelUpModal';
import { RankDetailsModal } from './components/gamification/RankDetailsModal';
import { XpToast } from './components/gamification/XpToast';

import { DashboardView } from './components/dashboard/DashboardView';
import { LearnView } from './components/learn/LearnView';
import { PracticeView } from './components/practice/PracticeView';
import { QuizView } from './components/quiz/QuizView';
import { Class10ExamView } from './components/exam10/Class10ExamView';
import { AiTutorView } from './components/tutor/AiTutorView';
import { FormulaLibraryView } from './components/formulas/FormulaLibraryView';
import { BookmarksView } from './components/bookmarks/BookmarksView';
import { ProgressView } from './components/progress/ProgressView';
import { SettingsView } from './components/settings/SettingsView';
import { ProfileView } from './components/profile/ProfileView';
import { NcertPdfView } from './components/ncert/NcertPdfView';
import { BadgeUnlockModal } from './components/profile/BadgeUnlockModal';

const AppContent: React.FC = () => {
  const { profile, currentView, setIsSearchOpen, unlockedBadgeModalData, closeBadgeModal } = useApp();

  // Keyboard shortcut ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  // If first launch or logged out, display login/sign up setup screen
  if (profile.isFirstLaunch || profile.isLoggedIn === false || !profile.name) {
    return <FirstLaunchSetup />;
  }

  const isTutorView = currentView === 'tutor';

  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans transition-colors">
      {/* Desktop Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <Header />

        {/* View Router - Expansive for AI Tutor workspace, padded for standard views */}
        {isTutorView ? (
          <main className="flex-1 overflow-hidden p-2 sm:p-3.5 lg:p-4 flex flex-col min-h-0 pb-18 lg:pb-4">
            <div className="w-full h-full flex flex-col min-h-0">
              <AiTutorView />
            </div>
          </main>
        ) : (
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto">
              {currentView === 'dashboard' && <DashboardView />}
              {currentView === 'learn' && <LearnView />}
              {currentView === 'practice' && <PracticeView />}
              {currentView === 'quiz' && <QuizView />}
              {currentView === 'exam10' && <Class10ExamView />}
              {currentView === 'formulas' && <FormulaLibraryView />}
              {currentView === 'ncert' && <NcertPdfView />}
              {currentView === 'bookmarks' && <BookmarksView />}
              {currentView === 'progress' && <ProgressView />}
              {currentView === 'profile' && <ProfileView />}
              {currentView === 'settings' && <SettingsView />}
            </div>
          </main>
        )}

        {/* Mobile / Tablet Bottom Navigation */}
        <MobileNav />
      </div>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal />

      {/* Rank & Levelling System Modals & Floating XP Toast */}
      <LevelUpModal />
      <RankDetailsModal />
      <XpToast />
      <BadgeUnlockModal
        badge={unlockedBadgeModalData?.badge || null}
        onClose={closeBadgeModal}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
