import { QuestionItem } from '../types';

export interface Exam10MockTest {
  id: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  description: string;
  sections: {
    name: string;
    description: string;
    marksPerQuestion: number;
    questionIds: string[];
  }[];
}

export const EXAM_10_MOCK_TESTS: Exam10MockTest[] = [
  {
    id: 'mock_c10_full_1',
    title: 'CBSE Class 10 Mathematics Standard Mock Paper 1 (2026–27 Blueprint)',
    durationMinutes: 45, // condensed for web practice
    totalMarks: 40,
    description: 'Aligned with CBSE 2026–27 Board pattern including MCQs, Assertion-Reason, Short Answer, and Case Study.',
    sections: [
      {
        name: 'Section A (MCQs & Assertion-Reason)',
        description: '1 Mark objective questions',
        marksPerQuestion: 1,
        questionIds: ['q_c10_1', 'q_c10_2', 'q_c10_3', 'q_c10_ar1'],
      },
      {
        name: 'Section B (Short Answer & Numericals)',
        description: '2 Mark conceptual questions',
        marksPerQuestion: 2,
        questionIds: ['q_c10_fib1', 'q_c10_match1'],
      },
      {
        name: 'Section C (Competency Case Study)',
        description: '4 Mark Real-World Competency Problem',
        marksPerQuestion: 4,
        questionIds: ['q_c10_cs1'],
      },
    ],
  },
  {
    id: 'mock_c10_algebra_speed',
    title: 'High-Speed Unit Test: Algebra Mastery (Polynomials, Linear & Quadratic)',
    durationMinutes: 20,
    totalMarks: 20,
    description: 'High-yield Board questions testing roots, discriminant, and consistency criteria.',
    sections: [
      {
        name: 'Section A',
        description: 'Speed MCQs',
        marksPerQuestion: 1,
        questionIds: ['q_c10_2', 'q_c10_ar1'],
      },
      {
        name: 'Section B',
        description: 'Analytical Case Study',
        marksPerQuestion: 4,
        questionIds: ['q_c10_cs1'],
      },
    ],
  },
];

export const CBSE_10_BLUEPRINT_TIPS = [
  {
    title: 'Standard vs Basic Mathematics Paper Blueprint',
    detail: 'Both papers follow the same NCERT syllabus. Standard Maths tests deeper problem-solving and multi-step derivations, while Basic Maths focuses on direct definitions and formula applications.',
  },
  {
    title: 'Step Marking Discipline',
    detail: 'CBSE marks strictly in stages: Formula statement (1/2 mark), Value substitution with units (1/2 to 1 mark), Intermediate algebraic simplification (1 mark), and Final answer with proper units (1/2 mark). Always write the formula first!',
  },
  {
    title: 'Case-Study Question Strategy (16 Marks Total in Board)',
    detail: 'Read the context once for gist, then jump directly to the sub-questions. Often the sub-questions require specific formula substitutions from Class 10 AP, Coordinate Geometry, or Mensuration without needing the entire paragraph.',
  },
  {
    title: 'Assertion-Reason Rule of Thumb',
    detail: 'First test whether Assertion (A) is true or false on its own. Next test Reason (R). Only if BOTH are individually true, check: "Does R directly cause or prove A?"',
  },
];
