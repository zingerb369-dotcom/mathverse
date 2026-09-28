import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getChapterById } from '../../data/curriculum';
import { FORMULAS_DATA } from '../../data/formulasData';
import { PRACTICE_QUESTIONS } from '../../data/questionsData';
import { MathRenderer } from '../common/MathRenderer';
import {
  Bookmark,
  Trash2,
  BookOpen,
  Sigma,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const {
    bookmarks,
    toggleBookmark,
    setSelectedChapterId,
    setCurrentView,
    playSound,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'chapters' | 'formulas' | 'questions'>('all');

  const bookmarkedChapters = bookmarks.chapterIds
    .map(id => getChapterById(id))
    .filter((c): c is import('../../types').Chapter => Boolean(c));
  const bookmarkedFormulas = bookmarks.formulaIds
    .map(id => FORMULAS_DATA.find(f => f.id === id))
    .filter((f): f is import('../../types').FormulaItem => Boolean(f));
  const bookmarkedQuestions = bookmarks.questionIds
    .map(id => PRACTICE_QUESTIONS.find(q => q.id === id))
    .filter((q): q is import('../../types').QuestionItem => Boolean(q));

  const totalBookmarks =
    bookmarkedChapters.length + bookmarkedFormulas.length + bookmarkedQuestions.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
            <span>Saved Repository</span>
            <span aria-hidden="true">·</span>
            <span>Personal Bookmarks</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{t('savedBookmarks')}</h1>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: `All (${totalBookmarks})` },
            { id: 'chapters', label: `Chapters (${bookmarkedChapters.length})` },
            { id: 'formulas', label: `Formulas (${bookmarkedFormulas.length})` },
            { id: 'questions', label: `Questions (${bookmarkedQuestions.length})` },
          ].map(tb => (
            <button
              key={tb.id}
              onClick={() => {
                playSound('click');
                setActiveTab(tb.id as any);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tb.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </div>

      {totalBookmarks === 0 && (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
          <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="font-bold text-slate-300">{t('noBookmarks')}</h3>
          <p className="text-xs text-slate-500">
            Bookmark important theorems, formulas, or tricky questions during study sessions to review them anytime here.
          </p>
        </div>
      )}

      {/* Chapters Section */}
      {(activeTab === 'all' || activeTab === 'chapters') && bookmarkedChapters.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Saved Chapters ({bookmarkedChapters.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarkedChapters.map(ch => ch && (
              <div
                key={ch.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition-all group"
              >
                <div
                  onClick={() => {
                    playSound('click');
                    setSelectedChapterId(ch.id);
                    setCurrentView('learn');
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    Ch {ch.order}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500">Class {ch.grade}</div>
                    <div className="font-semibold text-slate-200 text-sm truncate group-hover:text-indigo-300 transition-colors">
                      {ch.name}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleBookmark('chapter', ch.id)}
                  title="Remove bookmark"
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulas Section */}
      {(activeTab === 'all' || activeTab === 'formulas') && bookmarkedFormulas.length > 0 && (
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Saved Formulas ({bookmarkedFormulas.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookmarkedFormulas.map(fm => fm && (
              <div
                key={fm.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-semibold uppercase">
                      Class {fm.grade} · {fm.chapterName}
                    </span>
                    <h3 className="font-bold text-sm text-slate-200 mt-0.5">{fm.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleBookmark('formula', fm.id)}
                    title="Remove bookmark"
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center overflow-x-auto">
                  <MathRenderer latex={fm.formulaLatex} displayMode />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
