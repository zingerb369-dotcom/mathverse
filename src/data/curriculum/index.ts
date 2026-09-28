import { Chapter, GradeLevel } from '../../types';
import { CLASS_10_CHAPTERS } from './class10';
import { CLASS_9_CHAPTERS } from './class9';
import { CLASS_8_CHAPTERS } from './class8';
import { CLASS_7_CHAPTERS } from './class7';
import { CLASS_6_CHAPTERS } from './class6';
import { CLASS_5_CHAPTERS } from './class5';

export const ALL_CURRICULUM_CHAPTERS: Chapter[] = [
  ...CLASS_10_CHAPTERS,
  ...CLASS_9_CHAPTERS,
  ...CLASS_8_CHAPTERS,
  ...CLASS_7_CHAPTERS,
  ...CLASS_6_CHAPTERS,
  ...CLASS_5_CHAPTERS,
];

export function getChaptersByGrade(grade: GradeLevel): Chapter[] {
  switch (Number(grade)) {
    case 10:
      return CLASS_10_CHAPTERS;
    case 9:
      return CLASS_9_CHAPTERS;
    case 8:
      return CLASS_8_CHAPTERS;
    case 7:
      return CLASS_7_CHAPTERS;
    case 6:
      return CLASS_6_CHAPTERS;
    case 5:
      return CLASS_5_CHAPTERS;
    default:
      return CLASS_10_CHAPTERS;
  }
}

export function getChapterById(chapterId: string): Chapter | undefined {
  return ALL_CURRICULUM_CHAPTERS.find(c => c.id === chapterId);
}
