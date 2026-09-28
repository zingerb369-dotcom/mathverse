export type GradeLevel = 5 | 6 | 7 | 8 | 9 | 10;

export type LanguageCode = 'en' | 'hi' | 'ur' | 'de' | 'ru';

export type ThemeMode = 'dark' | 'light' | 'system';

export type QuestionType =
  | 'mcq'
  | 'multiple_select'
  | 'fill_blank'
  | 'short_answer'
  | 'long_answer'
  | 'assertion_reason'
  | 'case_study'
  | 'word_problem'
  | 'numerical'
  | 'true_false'
  | 'match';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'challenge';

export interface UserProfile {
  name: string;
  email?: string;
  isLoggedIn?: boolean;
  grade: GradeLevel;
  language: LanguageCode;
  theme: ThemeMode;
  isFirstLaunch: boolean;
  createdAt: string;
  studyReminderEnabled: boolean;
  studyReminderTime: string; // e.g. "18:00"
  notificationsEnabled: boolean;
  soundEnabled: boolean;
}

export type FormulaCategory =
  | 'all'
  | 'identities'
  | 'geometry'
  | 'mensuration'
  | 'statistics'
  | 'algebra'
  | 'trigonometry'
  | 'numbers'
  | 'shortcuts';

export type FormulaType =
  | 'Formula'
  | 'Identity'
  | 'Rule'
  | 'Property'
  | 'Theorem'
  | 'Result'
  | 'Conversion'
  | 'Shortcut';

export interface FormulaItem {
  id: string;
  grade: GradeLevel;
  bookName?: string;
  chapterNumber?: number;
  chapterId: string;
  chapterName: string;
  topicName: string;
  subtopicName?: string;
  title: string;
  formulaLatex: string;
  alternativeForm?: string;
  variables: { symbol: string; meaning: string }[];
  units?: string;
  conditions?: string;
  whenToUse: string;
  explanation?: string;
  example: {
    problem: string;
    steps: string[];
    answer: string;
  };
  relatedFormulae?: string[];
  commonMistake?: string;
  examTip?: string;
  difficulty?: DifficultyLevel;
  formulaType?: FormulaType;
  category?: FormulaCategory;
  isShared?: boolean;
  sharedInClasses?: number[];
  assessmentLevel?: 'Basic' | 'Standard' | 'Both';
}

export interface QuestionItem {
  id: string;
  grade: GradeLevel;
  chapterId: string;
  chapterName: string;
  topicId: string;
  topicName: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  questionText: string;
  latex?: string;
  diagramSvg?: string;
  options?: string[];
  correctAnswer: string | string[]; // string or array for multiple_select / match
  matchPairs?: { left: string; right: string }[];
  assertion?: string;
  reason?: string;
  caseStudyContext?: string;
  subQuestions?: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  mistakeExplanation: string;
  correctMethod: string;
  stepByStepSolution: string[];
  finalAnswer: string;
  marks?: number;
  cbseCompetencyTag?: string;
}

export interface SolvedExample {
  id: string;
  title: string;
  problem: string;
  solutionSteps: string[];
  finalAnswer: string;
  whyThisStep?: string;
  examTip?: string;
}

export interface Topic {
  id: string;
  name: string;
  concepts: string[];
  definitions: { term: string; definition: string; latex?: string }[];
  properties: string[];
  importantFormulas: string[];
  solvedExamples: SolvedExample[];
  applications: string[];
  commonMistakes: { mistake: string; correction: string; why: string }[];
  importantQuestions: string[];
  quickRevisionSummary: string[];
}

export interface Chapter {
  id: string;
  grade: GradeLevel;
  order: number;
  name: string;
  hindiName?: string;
  description: string;
  overview: string;
  weightageMarks: number; // CBSE approximate weightage
  topics: Topic[];
  keyFormulasCount: number;
  totalQuestionsCount: number;
  badge?: string;
}

export interface PracticeSessionResult {
  id: string;
  date: string;
  grade: GradeLevel;
  chapterId: string;
  chapterName: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  weakTopics: string[];
  answers: {
    questionId: string;
    userAnswer: any;
    isCorrect: boolean;
  }[];
}

export interface QuizResult {
  id: string;
  date: string;
  title: string;
  quizType: 'quick' | 'chapter' | 'mixed' | 'timed' | 'challenge' | 'full_syllabus';
  grade: GradeLevel;
  chapterName?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeTakenSeconds: number;
  weakAreas: string[];
  strongAreas: string[];
  questions: {
    question: QuestionItem;
    userAnswer: any;
    isCorrect: boolean;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
}

export type BadgeCategory = 'streak' | 'practice' | 'quiz' | 'mastery';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface UserBadge {
  id: string;
  name: string;
  category: BadgeCategory;
  description: string;
  criteria: string;
  icon: string;
  tier: BadgeTier;
  target: number;
  currentProgress?: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  xpReward: number;
}

export interface RankBadge {
  level: number;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  minXp: number;
  maxXp: number;
  icon: string;
  tierColor: {
    badgeBg: string;
    text: string;
    border: string;
    glow: string;
    gradient: string;
  };
  perks: string[];
}

export interface DailyGoalItem {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  claimed: boolean;
  xpReward: number;
}

export interface DailyGoalsData {
  date: string;
  goals: DailyGoalItem[];
  allBonusClaimed: boolean;
}

export interface UserProgressData {
  xp: number; // Current accumulated Experience Points
  level: number; // Current level 1 to 10
  unlockedRanks: string[]; // List of rank IDs or titles unlocked
  unlockedBadges: string[]; // List of badge IDs unlocked
  badgeHistory: { badgeId: string; unlockedAt: string }[];
  dailyGoals: DailyGoalsData;
  completedTopics: string[]; // topicIds
  completedChapters: string[]; // chapterIds
  totalQuestionsSolved: number;
  totalCorrect: number;
  totalIncorrect: number;
  practiceHistory: PracticeSessionResult[];
  quizHistory: QuizResult[];
  lastStudiedChapterId?: string;
  recentChapterIds: string[];
  totalStudyMinutes: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyPracticeCompletedDate?: string;
  achievements: Achievement[];
}

export interface BookmarksData {
  chapterIds: string[];
  topicIds: string[];
  formulaIds: string[];
  questionIds: string[];
}
