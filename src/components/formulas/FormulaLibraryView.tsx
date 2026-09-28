import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel, FormulaItem, FormulaCategory, FormulaType, DifficultyLevel } from '../../types';
import { EXHAUSTIVE_FORMULAS_DATA, searchExhaustiveFormulas } from '../../data/formulas';
import { MathRenderer } from '../common/MathRenderer';
import {
  Sigma,
  Bookmark,
  Search,
  Filter,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles,
  Zap,
  Award,
  ArrowRight,
  X,
  Compass,
} from 'lucide-react';

export const FormulaLibraryView: React.FC = () => {
  const {
    profile,
    isBookmarked,
    toggleBookmark,
    setCurrentView,
    setSelectedChapterId,
    playSound,
  } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<FormulaCategory>('all');
  const [selectedType, setSelectedType] = useState<FormulaType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<FormulaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabMode, setActiveTabMode] = useState<'catalog' | 'chapter_sheets'>('catalog');
  const [selectedChapterSheetId, setSelectedChapterSheetId] = useState<string>('c10_ch1');

  const categories: { id: FormulaCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Formulas', icon: 'Sigma' },
    { id: 'identities', label: 'Mathematical Identities', icon: 'Layers' },
    { id: 'geometry', label: 'Geometry & Theorems', icon: 'Compass' },
    { id: 'mensuration', label: 'Mensuration (Perimeter/Area/Vol)', icon: 'Layers' },
    { id: 'algebra', label: 'Algebra & Equations', icon: 'Zap' },
    { id: 'trigonometry', label: 'Trigonometry', icon: 'Compass' },
    { id: 'statistics', label: 'Statistics & Probability', icon: 'Award' },
    { id: 'numbers', label: 'Number Systems & Arithmetic', icon: 'Layers' },
    { id: 'shortcuts', label: 'Useful Techniques & Shortcuts', icon: 'Sparkles' },
  ];

  const formulaTypes: (FormulaType | 'all')[] = [
    'all',
    'Formula',
    'Identity',
    'Rule',
    'Property',
    'Theorem',
    'Result',
    'Conversion',
    'Shortcut',
  ];

  const filteredFormulas = useMemo(() => {
    return searchExhaustiveFormulas(searchQuery, {
      grade: selectedGrade,
      category: selectedCategory,
      formulaType: selectedType,
      difficulty: selectedDifficulty,
    });
  }, [searchQuery, selectedGrade, selectedCategory, selectedType, selectedDifficulty]);

  // Group chapters for Chapter Sheets mode
  const chapterSheets = useMemo(() => {
    const map = new Map<string, { id: string; name: string; grade: number; book: string; count: number }>();
    for (const f of EXHAUSTIVE_FORMULAS_DATA) {
      if (!map.has(f.chapterId)) {
        map.set(f.chapterId, {
          id: f.chapterId,
          name: f.chapterName,
          grade: f.grade,
          book: f.bookName || `Class ${f.grade} NCERT`,
          count: 0,
        });
      }
      map.get(f.chapterId)!.count += 1;
    }
    return Array.from(map.values()).sort((a, b) => b.grade - a.grade || a.name.localeCompare(b.name));
  }, []);

  const activeChapterData = useMemo(() => {
    const ch = chapterSheets.find(c => c.id === selectedChapterSheetId) || chapterSheets[0];
    const formulas = EXHAUSTIVE_FORMULAS_DATA.filter(f => f.chapterId === ch?.id);
    return { chapter: ch, formulas };
  }, [chapterSheets, selectedChapterSheetId]);

  const handleCopyLatex = (formula: FormulaItem) => {
    playSound('click');
    navigator.clipboard.writeText(formula.formulaLatex);
    setCopiedId(formula.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePracticeFormula = (formula: FormulaItem) => {
    playSound('click');
    setSelectedChapterId(formula.chapterId);
    setCurrentView('practice');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150 pb-16 max-w-7xl mx-auto">
      {/* 1. Header: Apple Educational SaaS Typographic Style */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-zinc-200/90 dark:border-zinc-800">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Exhaustive Reference Library · CBSE Classes 5–10 (2026–27)
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Complete Formula Library
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Every official formula, theorem result, identity, conversion rule, and textbook shortcut from current NCERT Mathematics textbooks.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            onClick={() => {
              playSound('click');
              setActiveTabMode('catalog');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTabMode === 'catalog'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            Formula Catalog ({filteredFormulas.length})
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTabMode('chapter_sheets');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTabMode === 'chapter_sheets'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            Chapter Formula Sheets
          </button>
        </div>
      </div>

      {activeTabMode === 'catalog' && (
        <>
          {/* 2. Category Navigation Ribbon */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Subject Categories
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
              {categories.map(cat => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playSound('click');
                      setSelectedCategory(cat.id);
                    }}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0 border ${
                      isActive
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-xs'
                        : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Search and Multi-Filters */}
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-4 shadow-xs">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search formulas by name, symbol (sin, θ, π, r), chapter, keyword (Heron, Pythagoras, quadratic)..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800 rounded-xl pl-11 pr-10 py-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              {/* Class Filter */}
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-zinc-400 dark:text-zinc-500">Class:</span>
                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg">
                  <button
                    onClick={() => setSelectedGrade('all')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      selectedGrade === 'all'
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-semibold shadow-2xs'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    All
                  </button>
                  {[5, 6, 7, 8, 9, 10].map(g => (
                    <button
                      key={g}
                      onClick={() => {
                        playSound('click');
                        setSelectedGrade(g as GradeLevel);
                      }}
                      className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                        selectedGrade === g
                          ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-semibold shadow-2xs'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <span className="font-medium text-zinc-400 dark:text-zinc-500">Type:</span>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value as any)}
                  className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="Formula">Formula</option>
                  <option value="Identity">Identity</option>
                  <option value="Rule">Rule</option>
                  <option value="Property">Property</option>
                  <option value="Theorem">Theorem</option>
                  <option value="Result">Result</option>
                  <option value="Conversion">Conversion</option>
                  <option value="Shortcut">Shortcut</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-zinc-400 dark:text-zinc-500">Difficulty:</span>
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value as any)}
                  className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy (Foundational)</option>
                  <option value="medium">Medium (Standard)</option>
                  <option value="hard">Hard (Advanced)</option>
                </select>
              </div>

              {/* Reset Filters */}
              {(selectedGrade !== 'all' || selectedCategory !== 'all' || selectedType !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedGrade('all');
                    setSelectedCategory('all');
                    setSelectedType('all');
                    setSelectedDifficulty('all');
                    setSearchQuery('');
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium ml-auto cursor-pointer"
                >
                  Reset all
                </button>
              )}
            </div>
          </div>

          {/* 4. Formulas Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
              <span>Showing {filteredFormulas.length} results</span>
              {filteredFormulas.length > 0 && <span>Click card for worked examples & exam tips</span>}
            </div>

            {filteredFormulas.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-3">
                <Sigma className="w-8 h-8 text-zinc-400 mx-auto" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">No matching formulas found</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try clearing your search query or adjusting your class and category filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedGrade('all');
                    setSelectedCategory('all');
                    setSelectedType('all');
                    setSelectedDifficulty('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium cursor-pointer"
                >
                  Show all formulas
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFormulas.map(formula => {
                  const isStarred = isBookmarked('formula', formula.id);
                  return (
                    <div
                      key={formula.id}
                      onClick={() => {
                        playSound('click');
                        setSelectedFormula(formula);
                      }}
                      className="group p-5 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Meta Badge Bar */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                Class {formula.grade} · {formula.chapterName}
                              </span>
                              {formula.formulaType && (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                                  {formula.formulaType}
                                </span>
                              )}
                              {formula.isShared && (
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
                                  Shared (Classes {formula.sharedInClasses?.join(', ')})
                                </span>
                              )}
                            </div>
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                              {formula.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => handleCopyLatex(formula)}
                              className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                              title="Copy formula LaTeX"
                            >
                              {copiedId === formula.id ? (
                                <Check className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              onClick={() => toggleBookmark('formula', formula.id)}
                              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                isStarred
                                  ? 'text-amber-500 bg-amber-500/10'
                                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                              }`}
                              title={isStarred ? 'Remove bookmark' : 'Bookmark formula'}
                            >
                              <Bookmark className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* LaTeX Equation Box */}
                        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-center text-center overflow-x-auto min-h-[4rem]">
                          <MathRenderer latex={formula.formulaLatex} displayMode />
                        </div>

                        {/* Meaning of symbols preview */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                            Variables & Meanings
                          </span>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {formula.variables.slice(0, 3).map((v, vIdx) => (
                              <div
                                key={vIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                              >
                                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                                  {v.symbol}:
                                </span>
                                <span className="line-clamp-1">{v.meaning}</span>
                              </div>
                            ))}
                            {formula.variables.length > 3 && (
                              <span className="text-[11px] text-zinc-400 self-center">
                                +{formula.variables.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: When to use & actions */}
                      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400 line-clamp-1 max-w-[70%]">
                          {formula.whenToUse}
                        </span>

                        <span className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Chapter Formula Sheets Mode */}
      {activeTabMode === 'chapter_sheets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Selector Sidebar */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-4 space-y-2 shadow-xs max-h-[80vh] overflow-y-auto">
            <div className="pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Select Curriculum Chapter
              </span>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Official textbook chapter formula sheets
              </p>
            </div>

            <div className="space-y-1">
              {chapterSheets.map(ch => {
                const isSelected = selectedChapterSheetId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      playSound('click');
                      setSelectedChapterSheetId(ch.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer text-xs flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Class {ch.grade}</span>
                      <span className="font-semibold block line-clamp-1">{ch.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0">
                      {ch.count} formulas
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chapter Formula Sheet Content */}
          <div className="lg:col-span-8 space-y-6">
            {activeChapterData.chapter && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                {/* Chapter Banner */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Class {activeChapterData.chapter.grade} · {activeChapterData.chapter.book}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {activeChapterData.chapter.name}
                  </h2>
                </div>

                {/* WHAT IS IN THIS CHAPTER Section */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      WHAT IS IN THIS CHAPTER?
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    This module covers core conceptual definitions, analytical properties, standard algebraic/geometric identities, step marking rules, and calculation formulas extracted from official NCERT textbooks.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                        {activeChapterData.formulas.length}
                      </span>
                      <span className="text-[10px] text-zinc-400">Formulas & Results</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">100%</span>
                      <span className="text-[10px] text-zinc-400">CBSE 2026-27 Aligned</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">KaTeX</span>
                      <span className="text-[10px] text-zinc-400">Exact Math Typeset</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Worked</span>
                      <span className="text-[10px] text-zinc-400">Step Solutions</span>
                    </div>
                  </div>
                </div>

                {/* COMPLETE FORMULA SHEET Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      COMPLETE FORMULA SHEET
                    </h3>
                    <span className="text-xs text-zinc-400">
                      {activeChapterData.formulas.length} official items
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeChapterData.formulas.map(f => (
                      <div
                        key={f.id}
                        className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                              {f.topicName} {f.subtopicName ? `· ${f.subtopicName}` : ''}
                            </span>
                            <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                              {f.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCopyLatex(f)}
                              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-md"
                              title="Copy formula"
                            >
                              {copiedId === f.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => toggleBookmark('formula', f.id)}
                              className={`p-1.5 rounded-md ${
                                isBookmarked('formula', f.id)
                                  ? 'text-amber-500'
                                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                              }`}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked('formula', f.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* LaTeX representation */}
                        <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70 text-center overflow-x-auto">
                          <MathRenderer latex={f.formulaLatex} displayMode />
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div className="p-3 rounded-lg bg-zinc-50/60 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">When to Use:</span>
                            <p className="text-zinc-500 dark:text-zinc-400">{f.whenToUse}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-zinc-50/60 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">Common Exam Trap:</span>
                            <p className="text-zinc-500 dark:text-zinc-400">{f.commonMistake || 'Watch negative signs and units.'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Detailed Formula Modal */}
      {selectedFormula && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedFormula(null)}
        >
          <div
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Class {selectedFormula.grade} · {selectedFormula.chapterName}
                  </span>
                  {selectedFormula.formulaType && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {selectedFormula.formulaType}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {selectedFormula.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedFormula(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Formula Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
              <div className="overflow-x-auto py-2">
                <MathRenderer latex={selectedFormula.formulaLatex} displayMode />
              </div>
              {selectedFormula.alternativeForm && (
                <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300 mr-2">Alternative Form:</span>
                  <MathRenderer latex={selectedFormula.alternativeForm} />
                </div>
              )}
            </div>

            {/* Meaning of Symbols Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Meaning of Variables & Symbols
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedFormula.variables.map((v, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-950/40 border border-zinc-200/70 dark:border-zinc-800/70 flex items-start gap-2"
                  >
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      {v.symbol}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">{v.meaning}</span>
                  </div>
                ))}
              </div>
              {selectedFormula.units && (
                <p className="text-[11px] text-zinc-400 pt-1">
                  <strong>Units:</strong> {selectedFormula.units}
                </p>
              )}
            </div>

            {/* When to use and conditions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">When to Use:</span>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{selectedFormula.whenToUse}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Conditions & Constraints:</span>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{selectedFormula.conditions || 'Standard domain constraints.'}</p>
              </div>
            </div>

            {/* Worked Example */}
            {selectedFormula.example && (
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                  Official Worked Example
                </span>
                <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {selectedFormula.example.problem}
                </div>
                <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                  {selectedFormula.example.steps.map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2">
                      <span className="text-zinc-400">{sIdx + 1}.</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                  Result: {selectedFormula.example.answer}
                </div>
              </div>
            )}

            {/* Exam Tip & Common Mistake */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedFormula.examTip && (
                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-300 space-y-1">
                  <span className="font-semibold flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Board Exam Tip:</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">{selectedFormula.examTip}</p>
                </div>
              )}

              {selectedFormula.commonMistake && (
                <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-rose-900 dark:text-rose-300 space-y-1">
                  <span className="font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Common Mistake to Avoid:</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">{selectedFormula.commonMistake}</p>
                </div>
              )}
            </div>

            {/* Action Buttons in Modal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark('formula', selectedFormula.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    isBookmarked('formula', selectedFormula.id)
                      ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked('formula', selectedFormula.id) ? 'fill-current' : ''}`} />
                  <span>{isBookmarked('formula', selectedFormula.id) ? 'Bookmarked' : 'Bookmark Formula'}</span>
                </button>

                <button
                  onClick={() => handleCopyLatex(selectedFormula)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                >
                  {copiedId === selectedFormula.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === selectedFormula.id ? 'Copied LaTeX!' : 'Copy Formula'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedFormula(null);
                  handlePracticeFormula(selectedFormula);
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-medium transition-colors cursor-pointer ml-auto"
              >
                <span>Practice This Concept</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
