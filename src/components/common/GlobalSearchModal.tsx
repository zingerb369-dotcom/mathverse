import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { FORMULAS_DATA } from '../../data/formulasData';
import { PRACTICE_QUESTIONS } from '../../data/questionsData';
import { MathRenderer } from './MathRenderer';
import { Search, X, BookOpen, Sigma, HelpCircle, FileText, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setCurrentView, setSelectedChapterId, setSelectedTopicId, playSound, t } = useApp();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const matches: {
      id: string;
      type: 'chapter' | 'topic' | 'formula' | 'question' | 'definition';
      title: string;
      subtitle: string;
      grade: number;
      action: () => void;
      preview?: string;
    }[] = [];

    // Search Chapters
    ALL_CURRICULUM_CHAPTERS.forEach(ch => {
      if (ch.name.toLowerCase().includes(q) || (ch.hindiName && ch.hindiName.toLowerCase().includes(q)) || ch.description.toLowerCase().includes(q)) {
        matches.push({
          id: ch.id,
          type: 'chapter',
          title: `Class ${ch.grade} · ${ch.name}`,
          subtitle: ch.description,
          grade: ch.grade,
          action: () => {
            setSelectedChapterId(ch.id);
            setCurrentView('learn');
            setIsSearchOpen(false);
          },
        });
      }

      // Search Topics & Definitions
      ch.topics.forEach(tp => {
        if (tp.name.toLowerCase().includes(q) || tp.concepts.some(c => c.toLowerCase().includes(q))) {
          matches.push({
            id: tp.id,
            type: 'topic',
            title: `Class ${ch.grade} · ${tp.name}`,
            subtitle: `In chapter: ${ch.name}`,
            grade: ch.grade,
            action: () => {
              setSelectedChapterId(ch.id);
              setSelectedTopicId(tp.id);
              setCurrentView('learn');
              setIsSearchOpen(false);
            },
          });
        }

        tp.definitions.forEach(def => {
          if (def.term.toLowerCase().includes(q) || def.definition.toLowerCase().includes(q)) {
            matches.push({
              id: def.term,
              type: 'definition',
              title: def.term,
              subtitle: def.definition,
              grade: ch.grade,
              action: () => {
                setSelectedChapterId(ch.id);
                setSelectedTopicId(tp.id);
                setCurrentView('learn');
                setIsSearchOpen(false);
              },
            });
          }
        });
      });
    });

    // Search Formulas
    FORMULAS_DATA.forEach(fm => {
      if (
        fm.title.toLowerCase().includes(q) ||
        fm.chapterName.toLowerCase().includes(q) ||
        fm.whenToUse.toLowerCase().includes(q) ||
        fm.formulaLatex.toLowerCase().includes(q)
      ) {
        matches.push({
          id: fm.id,
          type: 'formula',
          title: fm.title,
          subtitle: `Class ${fm.grade} · ${fm.chapterName}`,
          preview: fm.formulaLatex,
          grade: fm.grade,
          action: () => {
            setCurrentView('formulas');
            setIsSearchOpen(false);
          },
        });
      }
    });

    // Search Questions
    PRACTICE_QUESTIONS.forEach(qs => {
      if (qs.questionText.toLowerCase().includes(q) || qs.chapterName.toLowerCase().includes(q)) {
        matches.push({
          id: qs.id,
          type: 'question',
          title: `Class ${qs.grade} · ${qs.chapterName}`,
          subtitle: qs.questionText,
          grade: qs.grade,
          action: () => {
            setCurrentView('practice');
            setIsSearchOpen(false);
          },
        });
      }
    });

    return matches.slice(0, 15);
  }, [query, setCurrentView, setSelectedChapterId, setSelectedTopicId, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 mr-2 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              playSound('click');
              setIsSearchOpen(false);
            }}
            className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-slate-800/40">
          {query.trim().length < 2 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              Type at least 2 characters to search across CBSE Classes 5–10 chapters, formulas, definitions, and questions.
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No results found for &ldquo;{query}&rdquo;. Try another mathematical term like &ldquo;Pythagoras&rdquo;, &ldquo;Quadratic&rdquo;, or &ldquo;Triangle&rdquo;.
            </div>
          )}

          {results.map(item => (
            <div
              key={item.id + item.type}
              onClick={() => {
                playSound('click');
                item.action();
              }}
              className="pt-2 first:pt-0"
            >
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-800/70 transition-colors flex items-start gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-indigo-400 shrink-0 mt-0.5 group-hover:border-indigo-500/40">
                  {item.type === 'chapter' && <BookOpen className="w-4 h-4" />}
                  {item.type === 'topic' && <FileText className="w-4 h-4" />}
                  {item.type === 'formula' && <Sigma className="w-4 h-4" />}
                  {item.type === 'question' && <HelpCircle className="w-4 h-4" />}
                  {item.type === 'definition' && <FileText className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-indigo-300 truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 shrink-0 capitalize">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </p>
                  {item.preview && (
                    <div className="mt-1.5 p-1.5 bg-slate-950/60 rounded border border-slate-800 text-xs text-indigo-300">
                      <MathRenderer latex={item.preview} />
                    </div>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 shrink-0 mt-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
