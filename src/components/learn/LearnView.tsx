import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getChaptersByGrade } from '../../data/curriculum';
import { getOrBuildDeepChapterModule } from '../../data/chapterDeepData';
import { getNcertChapterPdf } from '../../data/ncertBooksData';
import { getFormulasByChapter } from '../../data/formulasData';
import { MathRenderer } from '../common/MathRenderer';
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  Bot,
  CheckSquare,
  AlertTriangle,
  Lightbulb,
  Zap,
  ArrowRight,
  ChevronRight,
  GraduationCap,
  ExternalLink,
  Download,
  FileText,
  HelpCircle,
  Clock,
  Compass,
  History,
  Layers,
  Sparkles,
  Maximize2,
} from 'lucide-react';

export const LearnView: React.FC = () => {
  const {
    profile,
    selectedChapterId,
    setSelectedChapterId,
    setCurrentView,
    isBookmarked,
    toggleBookmark,
    markTopicCompleted,
    progress,
    t,
    playSound,
  } = useApp();

  const chapters = getChaptersByGrade(profile.grade);
  const activeChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  // Learning Mode: 'mathverse' (interactive deep module) or 'ncert' (official PDF reader)
  const [learningMode, setLearningMode] = useState<'mathverse' | 'ncert'>('mathverse');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  // Fetch the full deep learning module for the active chapter
  const deepModule = getOrBuildDeepChapterModule(activeChapter);
  // Fetch matching NCERT chapter PDF
  const ncertPdf = getNcertChapterPdf(profile.grade, activeChapter.order);

  const activeTopic = activeChapter?.topics[activeTopicIndex] || activeChapter?.topics[0];
  const isTopicDone = activeTopic ? progress.completedTopics.includes(activeTopic.id) : false;
  const isChapterStarred = activeChapter ? isBookmarked('chapter', activeChapter.id) : false;

  const toggleHint = (id: string) => {
    playSound('click');
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-150 pb-20">
      {/* 1. Chapter Header & Primary Navigation */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              <span>Class {profile.grade} CBSE Mathematics</span>
              <span aria-hidden="true">·</span>
              <span>Chapter {activeChapter.order} of {chapters.length}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{activeChapter.weightageMarks} marks weightage</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex flex-wrap items-baseline gap-2">
              <span>Chapter {activeChapter.order}: {activeChapter.name}</span>
              {activeChapter.hindiName && (
                <span className="text-base sm:text-lg font-normal text-zinc-400 dark:text-zinc-500">
                  ({activeChapter.hindiName})
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {activeChapter.overview}
            </p>
          </div>

          {/* Quick Actions & Bookmark */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                playSound('click');
                toggleBookmark('chapter', activeChapter.id);
              }}
              className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isChapterStarred
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                  : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isChapterStarred ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isChapterStarred ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setCurrentView('practice');
              }}
              className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Practice</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setCurrentView('quiz');
              }}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Chapter Quiz</span>
            </button>
          </div>
        </div>

        {/* Horizontal Chapter Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 mt-5 scrollbar-none">
          {chapters.map(ch => {
            const isSelected = ch.id === activeChapter.id;
            const isDone = progress.completedChapters.includes(ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => {
                  playSound('click');
                  setSelectedChapterId(ch.id);
                  setActiveTopicIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold shadow-xs'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span>Ch {ch.order}</span>
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
              </button>
            );
          })}
        </div>

        {/* 2. LEARNING ↔ NCERT CONNECTION TOGGLE BAR */}
        <div className="flex items-center gap-3 pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            Select Study Mode:
          </span>

          <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <button
              onClick={() => {
                playSound('click');
                setLearningMode('mathverse');
              }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                learningMode === 'mathverse'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study in MATHVERSE</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setLearningMode('ncert');
              }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                learningMode === 'ncert'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read in NCERT</span>
            </button>
          </div>

          {ncertPdf && (
            <a
              href={ncertPdf.officialPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              <span>NCERT PDF ({ncertPdf.pdfCode})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 3. MODE A: READ IN NCERT */}
      {learningMode === 'ncert' && ncertPdf && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs space-y-0">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-500" />
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Official NCERT Textbook · Chapter {ncertPdf.chapterNumber}: {ncertPdf.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={ncertPdf.officialPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
              </a>
              <button
                onClick={() => setLearningMode('mathverse')}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Back to MATHVERSE
              </button>
            </div>
          </div>

          <div className="p-4 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center min-h-[580px]">
            <object
              data={ncertPdf.officialPdfUrl}
              type="application/pdf"
              className="w-full max-w-4xl h-[620px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white"
            >
              <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                <FileText className="w-10 h-10 mx-auto text-zinc-400" />
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Official NCERT Chapter PDF
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Access the complete official NCERT textbook PDF for Chapter {ncertPdf.chapterNumber}: {ncertPdf.title}.
                </p>
                <a
                  href={ncertPdf.officialPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open PDF Directly</span>
                </a>
              </div>
            </object>
          </div>
        </div>
      )}

      {/* 4. MODE B: STUDY IN MATHVERSE (COMPREHENSIVE LEARNING MODULE) */}
      {learningMode === 'mathverse' && (
        <div className="space-y-8 sm:space-y-10">
          {/* A. "WHAT'S INSIDE THIS CHAPTER" - CLEARLY VISIBLE SECTION */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Curriculum Roadmap
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                  What’s Inside This Chapter
                </h2>
              </div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {deepModule.whatsInside.length} core sections · CBSE 2026–27
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {deepModule.whatsInside.map((sec, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    playSound('click');
                    if (idx < activeChapter.topics.length) {
                      setActiveTopicIndex(idx);
                    }
                  }}
                  className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
                    <span className="font-mono font-medium">Sec {sec.sectionNumber}</span>
                    <span className="text-[10px]">{sec.ncertPageRange}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {sec.title}
                  </h3>
                  <div className="space-y-1 pt-1">
                    {sec.subtopics.map((sub, sIdx) => (
                      <div key={sIdx} className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* B. CHAPTER FOUNDATIONS (WHY IMPORTANT, LEARNING OUTCOMES, PREREQUISITES) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Why It Matters
              </span>
              <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                Mathematical Significance
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {deepModule.whyItIsImportant}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Learning Goals
              </span>
              <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                What You Will Master
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                {deepModule.whatStudentsWillLearn.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Prerequisites
              </span>
              <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                Required Prior Knowledge
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                {deepModule.prerequisites.map((pr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0 mt-1.5" />
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* C. TOPIC SELECTOR TABS & DETAILED EXPLANATION */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Topic {activeTopicIndex + 1} of {activeChapter.topics.length}
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {activeTopic?.name}
                </h2>
              </div>

              {/* Topic Completion Pill */}
              <button
                onClick={() => {
                  playSound('correct');
                  if (activeTopic) markTopicCompleted(activeTopic.id, activeChapter.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isTopicDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isTopicDone ? 'Topic Completed' : 'Mark as Mastered'}</span>
              </button>
            </div>

            {/* Topic Switcher Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {activeChapter.topics.map((tp, idx) => (
                <button
                  key={tp.id}
                  onClick={() => {
                    playSound('click');
                    setActiveTopicIndex(idx);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    idx === activeTopicIndex
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {idx + 1}. {tp.name}
                </button>
              ))}
            </div>

            {/* Concepts & Explanations */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Concepts & Theoretical Analysis
              </h3>
              <div className="space-y-3">
                {activeTopic?.concepts.map((concept, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-950/40 border border-zinc-200/70 dark:border-zinc-800/70 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed"
                  >
                    <MathRenderer text={concept} />
                  </div>
                ))}
              </div>
            </div>

            {/* Definitions & Terminology */}
            {activeTopic?.definitions && activeTopic.definitions.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Definitions & Precise Mathematical Terminology
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTopic.definitions.map((def, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1 bg-white dark:bg-zinc-900"
                    >
                      <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                        {def.term}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {def.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules & Properties */}
            {activeTopic?.properties && activeTopic.properties.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Key Rules & Axiomatic Properties
                </h3>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                  {activeTopic.properties.map((prop, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-1.5 shrink-0" />
                      <MathRenderer text={prop} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* D. COMPLETE FORMULA SHEET */}
          {(() => {
            const dbFormulas = getFormulasByChapter(activeChapter.id);
            const hasFormulas = dbFormulas.length > 0 || deepModule.importantFormulas.length > 0;
            if (!hasFormulas) return null;

            return (
              <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Official Curriculum Reference
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                      COMPLETE FORMULA SHEET
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Every official formula, identity, property, and theorem-result for {activeChapter.name}.
                    </p>
                  </div>
                  <span className="text-xs text-zinc-400">
                    {dbFormulas.length > 0 ? dbFormulas.length : deepModule.importantFormulas.length} formulas & results
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dbFormulas.length > 0
                    ? dbFormulas.map(f => (
                        <div
                          key={f.id}
                          className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {f.title}
                            </span>
                            {f.formulaType && (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                {f.formulaType}
                              </span>
                            )}
                          </div>

                          <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-lg text-center overflow-x-auto">
                            <MathRenderer latex={f.formulaLatex} displayMode />
                          </div>

                          <div className="space-y-1 text-xs">
                            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 block">
                              Variable Meanings:
                            </span>
                            {f.variables.map((v, vIdx) => (
                              <div key={vIdx} className="text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                                <code className="font-mono text-[11px] bg-zinc-200/70 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-800 dark:text-zinc-200">
                                  {v.symbol}
                                </code>
                                <span>: {v.meaning}</span>
                              </div>
                            ))}
                          </div>

                          {f.whenToUse && (
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                              <strong>When to use:</strong> {f.whenToUse}
                            </p>
                          )}
                        </div>
                      ))
                    : deepModule.importantFormulas.map((form, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-3"
                        >
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {form.name}
                          </div>

                          <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-lg text-center overflow-x-auto">
                            <MathRenderer text={`$$${form.latex}$$`} />
                          </div>

                          <div className="space-y-1 text-xs">
                            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 block">
                              Variable Meanings:
                            </span>
                            {form.variables.map((v, vIdx) => (
                              <div key={vIdx} className="text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                                <code className="font-mono text-[11px] bg-zinc-200/70 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-800 dark:text-zinc-200">
                                  {v.symbol}
                                </code>
                                <span>: {v.meaning}</span>
                              </div>
                            ))}
                          </div>

                          {form.conditions && (
                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                              Conditions: {form.conditions}
                            </p>
                          )}
                        </div>
                      ))}
                </div>
              </section>
            );
          })()}

          {/* E. DERIVATIONS & RIGOROUS PROOFS */}
          {deepModule.derivations && deepModule.derivations.length > 0 && (
            <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Step-by-Step Proofs
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                  Theorems & Derivations
                </h2>
              </div>

              {deepModule.derivations.map((drv, dIdx) => (
                <div key={dIdx} className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                  <div>
                    <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                      {drv.theoremName}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 italic">
                      "{drv.statement}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                    <div>
                      <span className="font-medium text-zinc-500">Given: </span>
                      <span className="text-zinc-800 dark:text-zinc-200">{drv.given}</span>
                    </div>
                    <div>
                      <span className="font-medium text-zinc-500">To Prove: </span>
                      <span className="text-zinc-800 dark:text-zinc-200">{drv.toProve}</span>
                    </div>
                  </div>

                  {/* Proof steps table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 text-[11px]">
                          <th className="py-2 pr-4 font-medium">Step</th>
                          <th className="py-2 font-medium">Mathematical Statement</th>
                          <th className="py-2 pl-4 font-medium">Justification / Reason</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                        {drv.proofSteps.map((st, sIdx) => (
                          <tr key={sIdx}>
                            <td className="py-2.5 pr-4 font-mono text-zinc-400">{sIdx + 1}</td>
                            <td className="py-2.5 font-medium">
                              <MathRenderer text={st.step} />
                            </td>
                            <td className="py-2.5 pl-4 text-zinc-500 dark:text-zinc-400">
                              {st.reason}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                    Conclusion: {drv.conclusion}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* F. STEP-BY-STEP SOLVED EXAMPLES */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Pedagogical Walkthroughs
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                  Step-by-Step Solved Examples
                </h2>
              </div>
              <span className="text-xs text-zinc-400">Exemplar & Board Standards</span>
            </div>

            <div className="space-y-5">
              {deepModule.solvedExamples.map((ex, eIdx) => (
                <div
                  key={eIdx}
                  className="p-5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        Example {ex.exampleNumber} · {ex.difficulty}
                      </span>
                      <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 mt-1.5">
                        {ex.problem}
                      </h3>
                    </div>
                  </div>

                  {/* Steps with "Why this step" */}
                  <div className="space-y-3 pt-2">
                    {ex.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl space-y-1.5"
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-mono text-[10px]">
                            {st.stepNumber}
                          </span>
                          <span>{st.description}</span>
                        </div>

                        {st.mathExpr && (
                          <div className="pl-7 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                            <MathRenderer text={st.mathExpr} />
                          </div>
                        )}

                        <div className="pl-7 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                          <span className="font-medium text-blue-600 dark:text-blue-400">Why this step:</span>
                          <span>{st.whyThisStep}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final Answer & Exam Tip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-zinc-100/70 dark:bg-zinc-800/50 rounded-xl text-xs">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Final Answer: <span className="text-blue-600 dark:text-blue-400">{ex.finalAnswer}</span>
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-[11px] flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{ex.examTip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* G. REAL-LIFE & STEM CONNECTIONS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Compass className="w-4 h-4" />
                <span>Real-Life Applications</span>
              </div>
              <div className="space-y-3">
                {deepModule.realLifeApplications.map((app, aIdx) => (
                  <div key={aIdx} className="space-y-1">
                    <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                      {app.field} · {app.useCase}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {app.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Layers className="w-4 h-4" />
                <span>Science, Engineering & Economics</span>
              </div>
              <div className="space-y-3">
                {deepModule.stemEconomicsConnections.map((conn, cIdx) => (
                  <div key={cIdx} className="space-y-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {conn.domain}
                    </span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-0.5">
                      {conn.connection}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* H. HISTORY & INDIAN MATHEMATICIANS CONTRIBUTIONS */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-400" />
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Historical Origins & Indian Mathematical Heritage
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Historical Timeline ({deepModule.historyOfMathematics.period})
              </span>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {deepModule.historyOfMathematics.story}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Indian Mathematicians & Heritage Contributions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {deepModule.indianMathematiciansContributions.map((ind, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 bg-white dark:bg-zinc-900"
                  >
                    <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                      {ind.scholar}
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      {ind.era} · <span className="italic">{ind.work}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                      {ind.contribution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* I. COMMON MISTAKES & EXAM STRATEGIES */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  CBSE Exam Preparedness
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                  Common Mistakes & Marking Scheme Insights
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deepModule.commonMistakes.map((mis, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 rounded-xl border border-rose-200/80 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/10 space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Pitfall: {mis.mistakeDescription}</span>
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 pl-5">
                    <span className="font-medium text-rose-600 dark:text-rose-400">Flawed Step: </span>
                    {mis.incorrectAttempt}
                  </div>
                  <div className="text-xs text-zinc-700 dark:text-zinc-300 pl-5">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">Correct Method: </span>
                    {mis.correctMethod}
                  </div>
                  <div className="text-[11px] text-zinc-500 pl-5 italic">
                    Reason: {mis.pedagogicalAdvice}
                  </div>
                </div>
              ))}
            </div>

            {/* Exam Tips */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                Examiner's Step-Marking Advice:
              </span>
              {deepModule.examTipsAndMarkingScheme.map((tip, tIdx) => (
                <div key={tIdx} className="text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>{tip.tip} ({tip.weightageAdvice})</span>
                </div>
              ))}
            </div>
          </section>

          {/* J. IMPORTANT QUESTION TYPES (MCQ, 2-MARK, 3-MARK, CASE-STUDY) */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Blueprint Analysis
              </span>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                CBSE Examination Question Types
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deepModule.importantQuestionTypes.map((qt, qIdx) => (
                <div
                  key={qIdx}
                  className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-2"
                >
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
                    {qt.category}
                  </span>
                  <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 pt-1">
                    {qt.typicalQuestion}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Strategy: </span>
                    {qt.strategy}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* K. QUICK REVISION & CHAPTER SUMMARY */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Rapid Synthesis
              </span>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                Quick Revision & Chapter Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-700 dark:text-zinc-300">
              {deepModule.quickRevisionKeyPoints.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-2 leading-relaxed border-t border-zinc-100 dark:border-zinc-800">
              {deepModule.chapterSummary}
            </p>
          </section>

          {/* L. PRACTICE QUESTIONS & NEXT ACTIONS */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-baseline justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Self-Evaluation
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                  Practice Questions
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {deepModule.practiceQuestions.map((pq, pqIdx) => {
                const isHintShown = !!revealedHints[pq.id];
                return (
                  <div
                    key={pq.id || pqIdx}
                    className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                        Q{pqIdx + 1}. {pq.question}
                      </div>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0">
                        {pq.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleHint(pq.id)}
                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        {isHintShown ? 'Hide Solution & Hint' : 'Show Solution & Hint'}
                      </button>
                    </div>

                    {isHintShown && (
                      <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-lg text-xs space-y-1.5 animate-in fade-in duration-150">
                        <div className="text-zinc-500">
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">Hint: </span>
                          {pq.hint}
                        </div>
                        <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                          Answer: {pq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Jump to Quiz & AI Tutor Bar */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Ready to test your mastery of Chapter {activeChapter.order}?
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentView('tutor');
                  }}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI TUTOR</span>
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentView('quiz');
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Start Chapter Quiz</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
