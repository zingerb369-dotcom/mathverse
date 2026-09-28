import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { QuestionItem, QuizResult } from '../../types';
import { getChaptersByGrade } from '../../data/curriculum';
import { getQuestionsByGrade, PRACTICE_QUESTIONS } from '../../data/questionsData';
import { getRankByXp, XP_REWARDS } from '../../data/rankData';
import { RankBadgeIcon } from '../gamification/RankBadgeIcon';
import confetti from 'canvas-confetti';
import {
  Zap,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Flame,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { profile, progress, recordQuizResult, playSound, t } = useApp();

  type QuizMode = 'quick' | 'chapter' | 'mixed' | 'timed' | 'challenge' | 'full_syllabus';

  const [activeMode, setActiveMode] = useState<QuizMode | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalQuizTime, setTotalQuizTime] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [resultData, setResultData] = useState<QuizResult | null>(null);

  const chapters = getChaptersByGrade(profile.grade);

  // Countdown timer for timed quizzes
  useEffect(() => {
    let timer: any;
    if (isQuizActive && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizActive, isFinished, timeLeft]);

  const startQuiz = (mode: QuizMode) => {
    setActiveMode(mode);
    const pool = getQuestionsByGrade(profile.grade).length > 0
      ? getQuestionsByGrade(profile.grade)
      : PRACTICE_QUESTIONS;

    let selected: QuestionItem[] = [];
    let durationSeconds = 0;

    switch (mode) {
      case 'quick':
        selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
        durationSeconds = 300; // 5 mins
        break;
      case 'chapter':
        const chPool = pool.filter(q => selectedChapterId === 'all' || q.chapterId === selectedChapterId);
        selected = [...(chPool.length > 0 ? chPool : pool)].sort(() => 0.5 - Math.random()).slice(0, 8);
        durationSeconds = 480; // 8 mins
        break;
      case 'timed':
        selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
        durationSeconds = 600; // 10 mins (1 min per question)
        break;
      case 'challenge':
        const hardPool = pool.filter(q => q.difficulty === 'hard' || q.difficulty === 'challenge');
        selected = [...(hardPool.length > 0 ? hardPool : pool)].sort(() => 0.5 - Math.random()).slice(0, 6);
        durationSeconds = 720; // 12 mins
        break;
      case 'full_syllabus':
        selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 15);
        durationSeconds = 1200; // 20 mins
        break;
      case 'mixed':
      default:
        selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
        durationSeconds = 900; // 15 mins
        break;
    }

    setQuizQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(durationSeconds);
    setTotalQuizTime(durationSeconds);
    setIsFinished(false);
    setIsQuizActive(true);
    playSound('click');
  };

  const submitQuiz = (autoTriggered = false) => {
    setIsQuizActive(false);
    setIsFinished(true);

    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const weakMap: Record<string, number> = {};
    const strongMap: Record<string, number> = {};

    quizQuestions.forEach(q => {
      const userAns = answers[q.id];
      const topic = q.topicName || q.chapterName;
      if (!userAns) {
        skipped++;
      } else if (userAns === q.correctAnswer) {
        correct++;
        strongMap[topic] = (strongMap[topic] || 0) + 1;
      } else {
        incorrect++;
        weakMap[topic] = (weakMap[topic] || 0) + 1;
      }
    });

    const pct = Math.round((correct / quizQuestions.length) * 100);
    const timeSpent = totalQuizTime - timeLeft;

    const res: QuizResult = {
      id: 'quiz_' + Date.now(),
      date: new Date().toISOString(),
      title: `${activeMode?.toUpperCase()} QUIZ - Class ${profile.grade}`,
      quizType: activeMode || 'quick',
      grade: profile.grade,
      score: correct,
      totalMarks: quizQuestions.length,
      percentage: pct,
      correct,
      incorrect,
      skipped,
      timeTakenSeconds: timeSpent > 0 ? timeSpent : totalQuizTime,
      weakAreas: Object.keys(weakMap),
      strongAreas: Object.keys(strongMap),
      questions: quizQuestions.map(q => ({
        question: q,
        userAnswer: answers[q.id] || 'Skipped',
        isCorrect: answers[q.id] === q.correctAnswer,
      })),
    };

    setResultData(res);
    recordQuizResult(res);

    if (pct >= 80) {
      playSound('fanfare');
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } else if (pct >= 50) {
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const quizModes = [
    {
      id: 'quick' as QuizMode,
      title: 'Quick Quiz',
      desc: '5 questions in 5 minutes. Perfect for a fast daily mental workout.',
      badge: '5 mins',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    },
    {
      id: 'chapter' as QuizMode,
      title: 'Chapter Quiz',
      desc: '8 in-depth questions targeted strictly to one NCERT chapter.',
      badge: '8 mins',
      color: 'from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30',
    },
    {
      id: 'timed' as QuizMode,
      title: 'Timed Pressure Quiz',
      desc: '10 questions with real-time countdown timer to build exam speed.',
      badge: '10 mins',
      color: 'from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30',
    },
    {
      id: 'challenge' as QuizMode,
      title: 'Challenge / HOTS Quiz',
      desc: 'Higher Order Thinking Skills (HOTS) questions to stretch your reasoning.',
      badge: '12 mins',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    },
    {
      id: 'mixed' as QuizMode,
      title: 'Mixed Syllabus Quiz',
      desc: 'Inter-chapter mixed questions mimicking standard periodic school tests.',
      badge: '15 mins',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'full_syllabus' as QuizMode,
      title: 'Full Syllabus Test',
      desc: 'Comprehensive benchmark test covering the complete CBSE 2026–27 curriculum.',
      badge: '20 mins',
      color: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30',
    },
  ];

  const currentQ = quizQuestions[currentIndex];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Quiz Portal Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <span>CBSE Class {profile.grade} Assessments</span>
            <span aria-hidden="true">·</span>
            <span>Adaptive Quiz Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Mathematics Quizzes</h1>
        </div>

        {isQuizActive && (
          <div className="flex items-center gap-2 font-mono text-sm px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400">
            <Clock className="w-4 h-4" />
            <span>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Mode Selection Grid */}
      {!isQuizActive && !isFinished && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizModes.map(qm => (
              <div
                key={qm.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${qm.color}`}>
                      {qm.badge}
                    </span>
                    <Zap className="w-4 h-4 text-slate-500" />
                  </div>
                  <h3 className="font-bold text-base text-slate-100 mb-1">{qm.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{qm.desc}</p>
                </div>

                {qm.id === 'chapter' && (
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Choose Chapter:</label>
                    <select
                      value={selectedChapterId}
                      onChange={e => setSelectedChapterId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 outline-none"
                    >
                      <option value="all">All Chapters</option>
                      {chapters.map(c => (
                        <option key={c.id} value={c.id}>
                          Ch {c.order}: {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={() => startQuiz(qm.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all cursor-pointer text-center"
                >
                  Start {qm.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Quiz View */}
      {isQuizActive && currentQ && (
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-indigo-400">
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
            <span>Answered: {Object.keys(answers).length} / {quizQuestions.length}</span>
          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
              {currentQ.questionText}
            </div>

            {currentQ.options && (
              <div className="space-y-2 pt-2">
                {currentQ.options.map((opt, oidx) => {
                  const isSelected = answers[currentQ.id] === opt;
                  return (
                    <button
                      key={oidx}
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-500 text-white font-semibold shadow-xs'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Controls */}
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
              <span>Previous</span>
            </button>

            {currentIndex < quizQuestions.length - 1 ? (
              <button
                onClick={() => {
                  playSound('click');
                  setCurrentIndex(prev => prev + 1);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => submitQuiz(false)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
              >
                <span>Submit & Complete Quiz</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Post-Quiz Results & Performance Analysis */}
      {isFinished && resultData && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-white">Quiz Completed!</h2>
              <div className="text-3xl font-extrabold text-indigo-400">
                {resultData.percentage}%
              </div>
              <p className="text-xs text-slate-400">
                Score: {resultData.score} out of {resultData.totalMarks} marks
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-emerald-400">Correct</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{resultData.correct}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-rose-400">Incorrect</div>
                <div className="text-lg font-bold text-rose-400 mt-1">{resultData.incorrect}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Skipped</div>
                <div className="text-lg font-bold text-slate-400 mt-1">{resultData.skipped}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-cyan-400">Time Taken</div>
                <div className="text-lg font-bold text-cyan-400 mt-1">
                  {Math.floor(resultData.timeTakenSeconds / 60)}m {resultData.timeTakenSeconds % 60}s
                </div>
              </div>
            </div>

            {/* XP Earned Highlight */}
            {(() => {
              const baseQuizXp = XP_REWARDS.QUIZ_BASE + Math.round(resultData.percentage * 0.5);
              const perfectBonus = resultData.percentage === 100 ? XP_REWARDS.QUIZ_PERFECT_BONUS : 0;
              const totalQuizXp = baseQuizXp + perfectBonus;
              const currentRank = getRankByXp(progress.xp || 0);

              return (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-900 border border-amber-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 fill-amber-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>+{totalQuizXp} Experience Points Awarded!</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Accuracy score: {resultData.percentage}% {perfectBonus > 0 ? '+ 100% Perfect Bonus!' : ''} · Academic Rank: <strong className="text-indigo-300">{currentRank.title}</strong>
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

            {/* Performance Analysis */}
            {resultData.weakAreas.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Weak Areas Requiring Revision</span>
                </div>
                <p className="text-xs text-slate-300">
                  You missed questions in: {resultData.weakAreas.join(', ')}. Review these concepts in the Learn section!
                </p>
              </div>
            )}

            {/* Review Solutions Accordion/List */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-400" />
                <span>Question-by-Question Solution Review</span>
              </h3>

              <div className="space-y-3">
                {resultData.questions.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm ${
                      item.isCorrect
                        ? 'bg-slate-950/60 border-emerald-900/30'
                        : 'bg-slate-950/60 border-rose-900/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-slate-200">
                        Q{idx + 1}. {item.question.questionText}
                      </div>
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className={item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                        Your answer: {item.userAnswer}
                      </span>
                      {!item.isCorrect && (
                        <span className="text-emerald-400 font-medium">
                          Correct: {item.question.correctAnswer}
                        </span>
                      )}
                    </div>

                    {!item.isCorrect && (
                      <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                        <span className="text-indigo-400 font-semibold">Solution: </span>
                        {item.question.stepByStepSolution.join(' ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setIsFinished(false);
                  setIsQuizActive(false);
                  setResultData(null);
                }}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Take Another Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
