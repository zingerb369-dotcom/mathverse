import { FormulaItem, GradeLevel } from '../types';
import {
  EXHAUSTIVE_FORMULAS_DATA,
  getFormulasByGrade as getFormulasByGradeAgg,
  getFormulasByChapter as getFormulasByChapterAgg,
  getFormulasByCategory as getFormulasByCategoryAgg,
  getFormulasByType as getFormulasByTypeAgg,
  getSharedFormulas as getSharedFormulasAgg,
  searchExhaustiveFormulas,
  FormulaFilterOptions,
} from './formulas';

export const FORMULAS_DATA: FormulaItem[] = EXHAUSTIVE_FORMULAS_DATA;

export {
  EXHAUSTIVE_FORMULAS_DATA,
  getFormulasByChapterAgg as getFormulasByChapter,
  getFormulasByCategoryAgg as getFormulasByCategory,
  getFormulasByTypeAgg as getFormulasByType,
  getSharedFormulasAgg as getSharedFormulas,
  searchExhaustiveFormulas,
};

export type { FormulaFilterOptions };

export function getFormulasByGrade(grade: GradeLevel): FormulaItem[] {
  return getFormulasByGradeAgg(grade);
}

export function searchFormulas(query: string, grade?: GradeLevel): FormulaItem[] {
  return searchExhaustiveFormulas(query, { grade: grade || 'all' });
}
