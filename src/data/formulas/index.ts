import { FormulaItem, GradeLevel, FormulaCategory, FormulaType, DifficultyLevel } from '../../types';
import { CLASS_10_FORMULAS } from './class10Formulas';
import { CLASS_9_FORMULAS } from './class9Formulas';
import { CLASS_8_FORMULAS } from './class8Formulas';
import { CLASS_7_FORMULAS } from './class7Formulas';
import { CLASS_6_FORMULAS } from './class6Formulas';
import { CLASS_5_FORMULAS } from './class5Formulas';

export const EXHAUSTIVE_FORMULAS_DATA: FormulaItem[] = [
  ...CLASS_10_FORMULAS,
  ...CLASS_9_FORMULAS,
  ...CLASS_8_FORMULAS,
  ...CLASS_7_FORMULAS,
  ...CLASS_6_FORMULAS,
  ...CLASS_5_FORMULAS,
];

export interface FormulaFilterOptions {
  grade?: GradeLevel | 'all';
  chapterId?: string;
  category?: FormulaCategory;
  formulaType?: FormulaType | 'all';
  difficulty?: DifficultyLevel | 'all';
}

export function getFormulasByGrade(grade: GradeLevel): FormulaItem[] {
  return EXHAUSTIVE_FORMULAS_DATA.filter(f => f.grade === Number(grade));
}

export function getFormulasByChapter(chapterId: string): FormulaItem[] {
  return EXHAUSTIVE_FORMULAS_DATA.filter(f => f.chapterId === chapterId);
}

export function getFormulasByCategory(category: FormulaCategory): FormulaItem[] {
  if (category === 'all') return EXHAUSTIVE_FORMULAS_DATA;
  return EXHAUSTIVE_FORMULAS_DATA.filter(f => f.category === category);
}

export function getFormulasByType(type: FormulaType): FormulaItem[] {
  return EXHAUSTIVE_FORMULAS_DATA.filter(f => f.formulaType === type);
}

export function getSharedFormulas(): FormulaItem[] {
  return EXHAUSTIVE_FORMULAS_DATA.filter(f => f.isShared);
}

export function searchExhaustiveFormulas(
  query: string,
  filters?: FormulaFilterOptions
): FormulaItem[] {
  const q = (query || '').toLowerCase().trim();

  return EXHAUSTIVE_FORMULAS_DATA.filter(f => {
    // Grade filter
    if (filters?.grade && filters.grade !== 'all' && f.grade !== Number(filters.grade)) {
      return false;
    }

    // Chapter filter
    if (filters?.chapterId && filters.chapterId !== 'all' && f.chapterId !== filters.chapterId) {
      return false;
    }

    // Category filter
    if (filters?.category && filters.category !== 'all' && f.category !== filters.category) {
      return false;
    }

    // Formula type filter
    if (filters?.formulaType && filters.formulaType !== 'all' && f.formulaType !== filters.formulaType) {
      return false;
    }

    // Difficulty filter
    if (filters?.difficulty && filters.difficulty !== 'all' && f.difficulty !== filters.difficulty) {
      return false;
    }

    // Query text search
    if (q) {
      const matchTitle = f.title.toLowerCase().includes(q);
      const matchChapter = f.chapterName.toLowerCase().includes(q);
      const matchTopic = f.topicName.toLowerCase().includes(q);
      const matchSubtopic = (f.subtopicName || '').toLowerCase().includes(q);
      const matchFormula = f.formulaLatex.toLowerCase().includes(q);
      const matchUse = (f.whenToUse || '').toLowerCase().includes(q);
      const matchExplanation = (f.explanation || '').toLowerCase().includes(q);
      const matchVariables = f.variables.some(
        v => v.symbol.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q)
      );

      if (
        !matchTitle &&
        !matchChapter &&
        !matchTopic &&
        !matchSubtopic &&
        !matchFormula &&
        !matchUse &&
        !matchExplanation &&
        !matchVariables
      ) {
        return false;
      }
    }

    return true;
  });
}
