import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel, LanguageCode, ThemeMode } from '../../types';
import {
  User,
  Globe,
  Sun,
  Moon,
  Laptop,
  Bell,
  Volume2,
  VolumeX,
  RotateCcw,
  Info,
  Check,
  ChevronRight,
  LogOut,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, resetAll, logout, playSound, t } = useApp();

  const [nameInput, setNameInput] = useState(profile.name);
  const [gradeInput, setGradeInput] = useState<GradeLevel>(profile.grade);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    playSound('click');
    updateProfile({
      name: nameInput.trim(),
      grade: gradeInput,
    });
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ur', label: 'Urdu', native: 'اردو' },
    { code: 'de', label: 'German', native: 'Deutsch' },
    { code: 'ru', label: 'Russian', native: 'Русский' },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 max-w-4xl mx-auto animate-in fade-in duration-150 pb-16">
      {/* Header */}
      <div className="pt-2 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            System Preferences
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            {t('navSettings')}
          </h1>
        </div>
      </div>

      {/* Profile & Class Configuration Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <User className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Student Identity & Curriculum Level
          </h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {t('studentName')}
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="Enter student name..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-xl p-3 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {t('selectClass')}
              </label>
              <select
                value={gradeInput}
                onChange={e => setGradeInput(Number(e.target.value) as GradeLevel)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-xl p-3 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-colors"
              >
                {[5, 6, 7, 8, 9, 10].map(g => (
                  <option key={g} value={g}>Class {g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <span>{t('saveChanges')}</span>
            </button>

            {saveFeedback && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Profile saved successfully
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Language Selection Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <Globe className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t('language')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {languages.map(lang => {
            const isSelected = profile.language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  playSound('click');
                  updateProfile({ language: lang.code });
                }}
                className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-950 font-medium shadow-xs'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="text-sm font-medium">{lang.native}</div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{lang.label}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Theme Appearance Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <Sun className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t('theme')}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'dark' as ThemeMode, label: t('darkMode'), icon: Moon },
            { id: 'light' as ThemeMode, label: t('lightMode'), icon: Sun },
            { id: 'system' as ThemeMode, label: t('systemMode'), icon: Laptop },
          ].map(thm => {
            const Icon = thm.icon;
            const isSelected = profile.theme === thm.id;
            return (
              <button
                key={thm.id}
                onClick={() => {
                  playSound('click');
                  updateProfile({ theme: thm.id });
                }}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-950 shadow-xs'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{thm.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Study Reminder & Audio Controls */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <Bell className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Reminders & Audio
          </h2>
        </div>

        {/* Study Reminder Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <div className="font-medium text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
              {t('studyReminder')}
            </div>
            <div className="text-[11px] text-zinc-500">
              Enable daily reminder banner and schedule prompt
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile.studyReminderEnabled}
              onChange={e => {
                playSound('click');
                updateProfile({ studyReminderEnabled: e.target.checked });
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900 dark:peer-checked:bg-zinc-100"></div>
          </label>
        </div>

        {/* Reminder Time Picker if enabled */}
        {profile.studyReminderEnabled && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60 text-xs">
            <span className="text-zinc-600 dark:text-zinc-400 font-medium">{t('reminderTime')}</span>
            <input
              type="time"
              value={profile.studyReminderTime}
              onChange={e => updateProfile({ studyReminderTime: e.target.value })}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg px-2.5 py-1 text-xs outline-none"
            />
          </div>
        )}

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            {profile.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            )}
            <div>
              <div className="font-medium text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                {t('soundEffects')}
              </div>
              <div className="text-[11px] text-zinc-500">
                Synthesized Web Audio clicks, correct chimes and fanfare
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile.soundEnabled}
              onChange={e => {
                const checked = e.target.checked;
                updateProfile({ soundEnabled: checked });
                if (checked) playSound('click');
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900 dark:peer-checked:bg-zinc-100"></div>
          </label>
        </div>
      </section>

      {/* About MATHVERSE & Reset Danger Zone */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <Info className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t('aboutMathverse')}
          </h2>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {t('aboutDesc')}
        </p>

        {/* Student Account & Authentication Card */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
              Student Account ({profile.email || 'Logged in student'})
            </div>
            <div className="text-[11px] text-zinc-400 dark:text-zinc-500">
              Signed in as {profile.name || 'Student Scholar'} · Class {profile.grade} CBSE
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              logout();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out / Switch Account</span>
          </button>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="font-medium text-xs text-rose-600 dark:text-rose-400">{t('resetProgress')}</div>
            <div className="text-[11px] text-zinc-400 dark:text-zinc-500">
              Clear completed chapters, quiz scores, badge history, bookmarks and streak.
            </div>
          </div>

          {!showResetConfirm ? (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-medium text-xs transition-colors cursor-pointer shrink-0"
            >
              {t('resetProgress')}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playSound('incorrect');
                  resetAll();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-xs transition-colors cursor-pointer"
              >
                {t('cancel')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
