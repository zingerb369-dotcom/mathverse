import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EXAM_10_MOCK_TESTS, CBSE_10_BLUEPRINT_TIPS } from '../../data/exam10Data';
import { PRACTICE_QUESTIONS } from '../../data/questionsData';
import {
  GraduationCap,
  FileCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  Info,
  HelpCircle,
} from 'lucide-react';

export const Class10ExamView: React.FC = () => {
  const { setCurrentView, playSound, t } = useApp();
  const [activeTab, setActiveTab] = useState<'mock_tests' | 'case_study' | 'assertion_reason' | 'blueprint'>('mock_tests');

  const caseStudyQuestions = PRACTICE_QUESTIONS.filter(q => q.grade === 10 && q.type === 'case_study');
  const assertionQuestions = PRACTICE_QUESTIONS.filter(q => q.grade === 10 && q.type === 'assertion_reason');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-900/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
          <span>CBSE Class 10 Board Accelerator</span>
          <span aria-hidden="true">·</span>
          <span>Session 2026–27</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {t('class10Title')}
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {t('class10Subtitle')}
        </p>

        {/* Disclaimer per brief */}
        <div className="mt-4 flex items-center gap-2 text-xs text-indigo-300/80 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-900/40">
          <Info className="w-4 h-4 shrink-0" />
          <span>
            Practice modules are strictly aligned with the 2026–27 CBSE Board Assessment Scheme and NCERT pattern.
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'mock_tests', label: t('mockTests') },
          { id: 'case_study', label: t('caseStudies') },
          { id: 'assertion_reason', label: t('assertionReason') },
          { id: 'blueprint', label: 'CBSE Marking Blueprint' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              playSound('click');
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mock Tests List */}
      {activeTab === 'mock_tests' && (
        <div className="space-y-4">
          {EXAM_10_MOCK_TESTS.map(mock => (
            <div
              key={mock.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-indigo-400">
                    <Clock className="w-3.5 h-3.5" />
                    {mock.durationMinutes} Minutes
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{mock.totalMarks} Marks</span>
                  <span aria-hidden="true">·</span>
                  <span>{mock.sections.length} Sections</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{mock.title}</h3>
                <p className="text-xs text-slate-400">{mock.description}</p>
              </div>

              <button
                onClick={() => {
                  playSound('click');
                  setCurrentView('quiz');
                }}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
              >
                <span>Start Mock Exam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Case Study Questions */}
      {activeTab === 'case_study' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            In CBSE Board Examinations, 3 Case-Study based questions of 4 marks each (total 12-16 marks) appear. Each case study tests applied mathematical competency in real-life contexts.
          </div>

          {caseStudyQuestions.map(cs => (
            <div key={cs.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Case Study · {cs.chapterName}
                </span>
                <span className="text-xs font-semibold text-slate-400">4 Marks</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cs.caseStudyContext}
              </div>

              {cs.subQuestions && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Sub-Questions (Attempt All):
                  </span>
                  {cs.subQuestions.map((sq, sidx) => (
                    <div key={sq.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-2">
                      <div className="text-xs sm:text-sm font-semibold text-slate-200">
                        {sidx + 1}. {sq.question}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {sq.options.map((opt, oidx) => (
                          <div
                            key={oidx}
                            className={`p-2 rounded-lg border ${
                              opt === sq.correctAnswer
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-semibold'
                                : 'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-400 pt-1">
                        <span className="text-indigo-400 font-medium">Explanation: </span>
                        {sq.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Assertion & Reason */}
      {activeTab === 'assertion_reason' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            Assertion & Reason questions require rigorous logical verification. Always check if both statements are independently true, then verify causality.
          </div>

          {assertionQuestions.map(ar => (
            <div key={ar.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {ar.chapterName}
                </span>
                <span className="text-xs font-semibold text-slate-400">1 Mark</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-indigo-300">Assertion (A): </span>
                  <span className="text-slate-200">{ar.assertion}</span>
                </div>
                <div>
                  <span className="font-bold text-indigo-300">Reason (R): </span>
                  <span className="text-slate-200">{ar.reason}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/50 text-xs sm:text-sm text-emerald-300">
                <span className="font-bold block text-xs uppercase mb-1">Correct Answer:</span>
                {ar.correctAnswer}
              </div>

              <div className="text-xs text-slate-400 space-y-1">
                <span className="font-bold text-slate-300 block">Step-by-Step Reason:</span>
                {ar.stepByStepSolution.map((st, i) => (
                  <div key={i}>• {st}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blueprint & Scoring Guide */}
      {activeTab === 'blueprint' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CBSE_10_BLUEPRINT_TIPS.map((tip, idx) => (
              <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{tip.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{tip.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
