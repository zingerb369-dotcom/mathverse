import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel } from '../../types';
import {
  CheckCircle2,
  ArrowRight,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  User,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

export const FirstLaunchSetup: React.FC = () => {
  const { completeFirstLaunch, login, playSound } = useApp();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [grade, setGrade] = useState<GradeLevel>(10);
  const [targetGoal, setTargetGoal] = useState<'board_prep' | 'full_score' | 'foundation'>('board_prep');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const gradesList: GradeLevel[] = [5, 6, 7, 8, 9, 10];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email or Student ID.');
      playSound('incorrect');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError('Password must be at least 4 characters.');
      playSound('incorrect');
      return;
    }

    // Extract student display name from email or default
    const derivedName = email.includes('@')
      ? email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : email.trim();

    playSound('click');
    login({
      name: derivedName,
      email: email.trim(),
      grade,
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full student name.');
      playSound('incorrect');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      playSound('incorrect');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError('Password must be at least 4 characters.');
      playSound('incorrect');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      playSound('incorrect');
      return;
    }

    playSound('click');
    completeFirstLaunch(name.trim(), grade, email.trim());
  };

  const handleQuickDemoSignIn = () => {
    playSound('click');
    login({
      name: 'Shumail Najam',
      email: 'shumail@mathverse.edu',
      grade: 10,
    });
  };

  const handleGuestContinue = () => {
    playSound('click');
    completeFirstLaunch('Student Scholar', 10, 'guest@mathverse.edu');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 sm:p-6 relative select-none">
      {/* Subtle background radial ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-lg bg-zinc-900/95 border border-zinc-800 rounded-3xl p-6 sm:p-9 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Brand Header */}
        <div className="text-center mb-6 space-y-2.5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-950 font-bold text-xl tracking-tight shadow-md mx-auto">
            MV
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              CBSE & NCERT Academic Session 2026–27
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mt-1">
              Welcome to MATHVERSE
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed">
              Sign in or create your student account to sync progress, quizzes, and AI tutor explanations.
            </p>
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex rounded-xl bg-zinc-950 p-1 border border-zinc-800/90 mb-5">
          <button
            type="button"
            onClick={() => {
              playSound('click');
              setTab('signin');
              setError('');
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              tab === 'signin'
                ? 'bg-zinc-100 text-zinc-950 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              setTab('signup');
              setError('');
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-zinc-100 text-zinc-950 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account / Sign Up</span>
          </button>
        </div>

        {/* Error notice */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Email address or Student ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. student@mathverse.edu"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-600 outline-none text-xs sm:text-sm font-medium transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-zinc-300">
                  Password
                </label>
                <span className="text-[11px] text-zinc-500">Min 4 chars</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl pl-10 pr-10 py-2.5 text-zinc-100 placeholder-zinc-600 outline-none text-xs sm:text-sm font-medium transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Class selection */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">
                  Select your class
                </label>
                <span className="text-[11px] text-zinc-500">Curriculum 2026–27</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {gradesList.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setGrade(g);
                    }}
                    className={`py-2 px-1 rounded-xl border text-center transition-colors cursor-pointer ${
                      grade === g
                        ? 'bg-zinc-100 border-zinc-100 text-zinc-950 font-bold shadow-xs'
                        : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <span className="block text-[9px] uppercase text-zinc-500">Cls</span>
                    <span className="text-sm font-semibold">{g}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-950 text-blue-600 accent-blue-500"
                />
                <span>Remember me on this browser</span>
              </label>
              <button
                type="button"
                onClick={handleQuickDemoSignIn}
                className="text-xs text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
              >
                1-Click Demo Login
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md mt-2"
            >
              <span>Sign In to MATHVERSE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* SIGN UP FORM */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Full student name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Shumail Najam"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-600 outline-none text-xs sm:text-sm font-medium transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="student@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-600 outline-none text-xs sm:text-sm font-medium transition-colors"
                />
              </div>
            </div>

            {/* Class selection */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">
                  Select your class
                </label>
                <span className="text-[11px] text-zinc-500">Curriculum 2026–27</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {gradesList.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setGrade(g);
                    }}
                    className={`py-2 px-1 rounded-xl border text-center transition-colors cursor-pointer ${
                      grade === g
                        ? 'bg-zinc-100 border-zinc-100 text-zinc-950 font-bold shadow-xs'
                        : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <span className="block text-[9px] uppercase text-zinc-500">Cls</span>
                    <span className="text-sm font-semibold">{g}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                  Create password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 outline-none text-xs sm:text-sm font-medium transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                  Confirm password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 outline-none text-xs sm:text-sm font-medium transition-colors"
                />
              </div>
            </div>

            {/* Academic Target */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-medium text-zinc-300">
                Primary Academic Target
              </label>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <button
                  type="button"
                  onClick={() => setTargetGoal('board_prep')}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    targetGoal === 'board_prep'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  Board Mastery
                </button>
                <button
                  type="button"
                  onClick={() => setTargetGoal('full_score')}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    targetGoal === 'full_score'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  Score 100/100
                </button>
                <button
                  type="button"
                  onClick={() => setTargetGoal('foundation')}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    targetGoal === 'foundation'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  Foundation
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md mt-2"
            >
              <span>Create Account & Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Feature bullets */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CBSE 2026–27 Verified</span>
          </div>
          <button
            type="button"
            onClick={handleGuestContinue}
            className="text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
          >
            Continue as Guest Student →
          </button>
        </div>
      </div>
    </div>
  );
};
