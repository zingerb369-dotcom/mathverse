import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel, DifficultyLevel, QuestionItem, PracticeSessionResult } from '../../types';
import { getChaptersByGrade } from '../../data/curriculum';
import { filterQuestions, PRACTICE_QUESTIONS } from '../../data/questionsData';
import { MathRenderer } from '../common/MathRenderer';
import { getRankByXp, XP_REWARDS } from '../../data/rankData';
import { RankBadgeIcon } from '../gamification/RankBadgeIcon';
import confetti from 'canvas-confetti';
import {
  CheckSquare,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Filter,
  Zap,
} from 'lucide-react';

export const PracticeView: React.FC = () => {
  const { profile, progress, recordPracticeSession, playSound, t } = useApp();

  // Configuration state
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(profile.grade);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');
  const [questionCount, setQuestionCount] = useState<number>(5);

  // Active session state
  const [isPracticing, setIsPracticing] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  useEffect(() => {
    let interval: any;
    if (isPracticing && !isFinished) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPracticing, isFinished, startTime]);

  const chapters = getChaptersByGrade(selectedGrade);

  const startPractice = () => {
    let list = filterQuestions(selectedGrade, selectedChapterId, selectedDifficulty);
    if (list.length === 0) {
      // Fallback to all grade questions if filter is too narrow
      list = filterQuestions(selectedGrade, selectedChapterId);
    }
    if (list.length === 0) {
      list = PRACTICE_QUESTIONS.filter(q => q.grade === selectedGrade);
    }
    if (list.length === 0) {
      list = PRACTICE_QUESTIONS;
    }

    const shuffled = [...list].sort(() => 0.5 - Math.random()).slice(0, questionCount);
    setSessionQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedQuestions({});
    setStartTime(Date.now());
    setElapsedSeconds(0);
    setIsFinished(false);
    setIsPracticing(true);
    playSound('click');
  };

  const currentQ = sessionQuestions[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (submittedQuestions[currentQ.id]) return;
    playSound('click');
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleSubmitCurrentAnswer = () => {
    if (!userAnswers[currentQ.id] || submittedQuestions[currentQ.id]) return;
    const isCorrect = userAnswers[currentQ.id] === currentQ.correctAnswer;
    playSound(isCorrect ? 'correct' : 'incorrect');
    setSubmittedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const finishPractice = () => {
    setIsFinished(true);
    setIsPracticing(false);

    let correct = 0;
    let incorrect = 0;
    const weakTopicsSet = new Set<string>();

    sessionQuestions.forEach(q => {
      const uAns = userAnswers[q.id];
      if (uAns === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
        weakTopicsSet.add(q.topicName || q.chapterName);
      }
    });

    const pct = Math.round((correct / sessionQuestions.length) * 100);

    const sessionResult: PracticeSessionResult = {
      id: 'prac_' + Date.now(),
      date: new Date().toISOString(),
      grade: selectedGrade,
      chapterId: selectedChapterId === 'all' ? (sessionQuestions[0]?.chapterId || 'all') : selectedChapterId,
      chapterName: selectedChapterId === 'all' ? 'Mixed Chapters' : (chapters.find(c => c.id === selectedChapterId)?.name || 'Practice'),
      difficulty: selectedDifficulty,
      totalQuestions: sessionQuestions.length,
      correctCount: correct,
      incorrectCount: incorrect,
      score: correct,
      percentage: pct,
      timeSpentSeconds: elapsedSeconds,
      weakTopics: Array.from(weakTopicsSet),
      answers: sessionQuestions.map(q => ({
        questionId: q.id,
        userAnswer: userAnswers[q.id] || 'Not answered',
        isCorrect: userAnswers[q.id] === q.correctAnswer,
      })),
    };

    recordPracticeSession(sessionResult);

    if (pct >= 80) {
      playSound('fanfare');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <span>Adaptive Practice Arena</span>
            <span aria-hidden="true">·</span>
            <span>CBSE Curriculum 2026–27</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Mathematics Practice</h1>
        </div>

        {isPracticing && (
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-indigo-300">
            <Clock className="w-4 h-4" />
            <span>
              {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Setup Form (when not practicing and not finished) */}
      {!isPracticing && !isFinished && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm border-b border-slate-800 pb-3">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span>Configure Your Practice Session</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Class Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Class
              </label>
              <select
                value={selectedGrade}
                onChange={e => {
                  setSelectedGrade(Number(e.target.value) as GradeLevel);
                  setSelectedChapterId('all');
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-indigo-500"
              >
                {[5, 6, 7, 8, 9, 10].map(g => (
                  <option key={g} value={g}>Class {g}</option>
                ))}
              </select>
            </div>

            {/* Chapter Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Chapter
              </label>
              <select
                value={selectedChapterId}
                onChange={e => setSelectedChapterId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-indigo-500"
              >
                <option value="all">All Chapters (Mixed Practice)</option>
                {chapters.map(c => (
                  <option key={c.id} value={c.id}>
                    Ch {c.order}: {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['easy', 'medium', 'hard', 'challenge'] as DifficultyLevel[]).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setSelectedDifficulty(d);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                      selectedDifficulty === d
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Questions Count
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setQuestionCount(cnt);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      questionCount === cnt
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startPractice}
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
          >
            <Play className="w-4 h-4" />
            <span>{t('startSession')}</span>
          </button>
        </div>
      )}

      {/* Active Question Solving Arena */}
      {isPracticing && currentQ && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Question Stepper */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-indigo-400">
              Question {currentIndex + 1} of {sessionQuestions.length}
            </span>
            <span className="capitalize">{currentQ.difficulty} · {currentQ.chapterName}</span>
          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / sessionQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            {/* Case study context if present */}
            {currentQ.caseStudyContext && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-900/50 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-indigo-400 block mb-1">Case Study Scenario:</span>
                {currentQ.caseStudyContext}
              </div>
            )}

            {/* Assertion & Reason context */}
            {currentQ.assertion && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs sm:text-sm">
                <div><span className="font-bold text-slate-200">Assertion (A): </span>{currentQ.assertion}</div>
                <div><span className="font-bold text-slate-200">Reason (R): </span>{currentQ.reason}</div>
              </div>
            )}

            <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* Render options for MCQ, Multiple Select, True/False, or Assertion Reason */}
            {currentQ.options && (
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, oidx) => {
                  const isSelected = userAnswers[currentQ.id] === opt;
                  const isSubmitted = submittedQuestions[currentQ.id];
                  const isCorrect = opt === currentQ.correctAnswer;

                  let optStyles = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isSelected && !isSubmitted) {
                    optStyles = 'bg-indigo-600/20 border-indigo-500 text-indigo-200 font-semibold';
                  } else if (isSubmitted) {
                    if (isCorrect) {
                      optStyles = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optStyles = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={oidx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${optStyles}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Fill in the blank text input */}
            {currentQ.type === 'fill_blank' && (
              <div className="pt-2">
                <input
                  type="text"
                  disabled={submittedQuestions[currentQ.id]}
                  value={userAnswers[currentQ.id] || ''}
                  onChange={e => setUserAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value.trim() }))}
                  placeholder="Type your exact numerical answer here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Check/Submit current button */}
            {!submittedQuestions[currentQ.id] && (
              <button
                type="button"
                disabled={!userAnswers[currentQ.id]}
                onClick={handleSubmitCurrentAnswer}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                {t('submitAnswer')}
              </button>
            )}

            {/* Comprehensive Solution Box when submitted */}
            {submittedQuestions[currentQ.id] && (
              <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {userAnswers[currentQ.id] === currentQ.correctAnswer ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5" /> Correct! Well solved.
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-5 h-5" /> Let&apos;s understand where the mistake happened:
                    </span>
                  )}
                </div>

                {/* Specific Mistake Explanation */}
                {userAnswers[currentQ.id] !== currentQ.correctAnswer && (
                  <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs sm:text-sm text-rose-300">
                    <span className="font-bold block text-xs uppercase mb-1">
                      {t('mistakeExplanation')}:
                    </span>
                    {currentQ.mistakeExplanation}
                  </div>
                )}

                {/* Correct Method */}
                <div className="p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs sm:text-sm text-indigo-300">
                  <span className="font-bold block text-xs uppercase mb-1">
                    {t('correctMethod')}:
                  </span>
                  {currentQ.correctMethod}
                </div>

                {/* Step-by-Step Solution */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    {t('stepByStepSolution')}:
                  </span>
                  {currentQ.stepByStepSolution.map((step, sidx) => (
                    <div key={sidx} className="text-xs sm:text-sm text-slate-300 p-2 rounded bg-slate-900/60">
                      {step}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-400">{t('finalAnswer')}:</span>
                  <span className="font-bold text-emerald-400">{currentQ.finalAnswer}</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                playSound('click');
                setCurrentIndex(prev => prev - 1);
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs font-medium text-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('previousQuestion')}</span>
            </button>

            {currentIndex < sessionQuestions.length - 1 ? (
              <button
                onClick={() => {
                  playSound('click');
                  setCurrentIndex(prev => prev + 1);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{t('nextQuestion')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finishPractice}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
              >
                <span>{t('finish')}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Post-Practice Report Summary */}
      {isFinished && (
        <div className="max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
              <Award className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white">Practice Session Completed!</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Here is your diagnostic performance summary based on CBSE assessment standards.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Questions</div>
              <div className="text-lg font-bold text-white mt-1">{sessionQuestions.length}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-xs text-emerald-400">Correct</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                {sessionQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-xs text-rose-400">Incorrect</div>
              <div className="text-lg font-bold text-rose-400 mt-1">
                {sessionQuestions.filter(q => userAnswers[q.id] !== q.correctAnswer).length}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-xs text-cyan-400">Time Taken</div>
              <div className="text-lg font-bold text-cyan-400 mt-1">
                {Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s
              </div>
            </div>
          </div>

          {/* XP Earned Banner */}
          {(() => {
            const correctCount = sessionQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
            const pct = Math.round((correctCount / sessionQuestions.length) * 100);
            const baseEarned = correctCount * XP_REWARDS.PRACTICE_CORRECT_ANSWER;
            const bonus = pct === 100 ? XP_REWARDS.PRACTICE_PERFECT_BONUS : pct >= 80 ? XP_REWARDS.PRACTICE_HIGH_ACCURACY_BONUS : 0;
            const totalEarned = baseEarned + bonus;
            const currentRank = getRankByXp(progress.xp || 0);

            return (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-900 border border-amber-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>+{totalEarned} Experience Points Earned!</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      +{baseEarned} Base XP {bonus > 0 ? `+ ${bonus} Accuracy Bonus` : ''} · Current Rank: <strong className="text-indigo-300">{currentRank.title}</strong>
                    </div>
                  </div>
                </div>

                <RankBadgeIcon
                  iconName={currentRank.icon}
                  level={currentRank.level}
                  size="sm"
                  className="shrink-0"
                />
              </div>
            );
          })()}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <button
              onClick={startPractice}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Another Set</span>
            </button>
            <button
              onClick={() => {
                setIsFinished(false);
                setIsPracticing(false);
              }}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
            >
              Configure Parameters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
