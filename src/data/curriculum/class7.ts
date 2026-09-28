import { Chapter } from '../../types';

export const CLASS_7_CHAPTERS: Chapter[] = [
  {
    id: 'c7_ch1',
    grade: 7,
    order: 1,
    name: 'Integers',
    hindiName: 'पूर्णांक',
    description: 'Properties of addition and subtraction of integers, multiplication and division of integers.',
    overview: 'Explore positive and negative integers on the number line, sign rules in multiplication/division, and closure, commutative, associative and distributive properties.',
    weightageMarks: 8,
    keyFormulasCount: 3,
    totalQuestionsCount: 12,
    badge: 'Number Systems',
    topics: [
      {
        id: 'c7_ch1_t1',
        name: 'Multiplication and Division of Integers',
        concepts: [
          'Product of two positive integers is positive: (+) × (+) = (+).',
          'Product of two negative integers is positive: (-) × (-) = (+).',
          'Product of one positive and one negative integer is negative: (+) × (-) = (-).',
          'Multiplication distributes over addition: a × (b + c) = (a × b) + (a × c).',
          'Division by zero is meaningless; a ÷ 1 = a; a ÷ (-1) = -a.',
        ],
        definitions: [
          {
            term: 'Integer',
            definition: 'A whole number (not a fractional number) that can be positive, negative, or zero: {... -3, -2, -1, 0, 1, 2, 3 ...}.',
          },
        ],
        properties: ['The product of an even number of negative integers is positive, while the product of an odd number is negative.'],
        importantFormulas: [
          '(-a) \\times (-b) = a \\times b',
          '(-a) \\times b = -(a \\times b)',
          'a \\times (b + c) = (a \\times b) + (a \\times c)',
        ],
        solvedExamples: [
          {
            id: 'c7_ex1',
            title: 'Evaluating with Distributive Property',
            problem: 'Evaluate (-48) × 26 + (-48) × (-36).',
            solutionSteps: [
              'Step 1: Take (-48) common using distributivity: (-48) × [26 + (-36)].',
              'Step 2: Calculate inside bracket: 26 - 36 = -10.',
              'Step 3: Multiply: (-48) × (-10) = 480.',
            ],
            finalAnswer: '480',
          },
        ],
        applications: ['Bank balances (credits and debits), temperature scales above/below freezing point.'],
        commonMistakes: [
          {
            mistake: 'Thinking (-) + (-) = (+).',
            correction: 'Sum of two negative numbers is negative: (-3) + (-5) = -8. Only multiplication gives positive.',
            why: 'Moving left twice on a number line lands further in the negative territory.',
          },
        ],
        importantQuestions: ['In a quiz, positive marks are given for correct answers and negative marks for incorrect answers. If Jack’s scores in 5 successive rounds were 25, -5, -10, 15, and 10, what was his total?'],
        quickRevisionSummary: [
          '(-) × (-) = (+).',
          '(-) × (+) = (-).',
          'Division by 0 is undefined.',
        ],
      },
    ],
  },
  {
    id: 'c7_ch6',
    grade: 7,
    order: 2,
    name: 'The Triangle and its Properties',
    hindiName: 'त्रिभुज और उसके गुण',
    description: 'Medians, altitudes, exterior angle property, angle sum property, triangle inequality, Pythagoras property.',
    overview: 'Discover the geometry of triangles: sum of angles is 180°, exterior angle equals sum of interior opposite angles, and Pythagoras property for right-angled triangles.',
    weightageMarks: 10,
    keyFormulasCount: 3,
    totalQuestionsCount: 14,
    badge: 'Geometry',
    topics: [
      {
        id: 'c7_ch6_t1',
        name: 'Exterior Angle and Pythagoras Property',
        concepts: [
          'Exterior Angle Theorem: An exterior angle of a triangle is equal to the sum of its interior opposite angles.',
          'Angle Sum Property: The total measure of the three angles of a triangle is 180°.',
          'Triangle Inequality: The sum of the lengths of any two sides of a triangle is greater than the length of the third side.',
          'Pythagoras Property: In a right-angled triangle, (Hypotenuse)² = (Base)² + (Perpendicular)²',
        ],
        definitions: [
          {
            term: 'Median of a Triangle',
            definition: 'A line segment connecting a vertex to the midpoint of the opposite side.',
          },
          {
            term: 'Altitude of a Triangle',
            definition: 'The perpendicular line segment drawn from a vertex to the line containing the opposite side.',
          },
        ],
        properties: ['The hypotenuse is the longest side in any right-angled triangle.'],
        importantFormulas: [
          '\\angle \\text{Ext} = \\angle 1 + \\angle 2',
          '\\text{Hypotenuse}^2 = \\text{Base}^2 + \\text{Perpendicular}^2',
        ],
        solvedExamples: [
          {
            id: 'c7_tri_ex1',
            title: 'Pythagoras Property Application',
            problem: 'A 15 m long ladder reached a window 12 m high from the ground on placing it against a wall at a distance a. Find the distance of the foot of the ladder from the wall.',
            solutionSteps: [
              'Step 1: In the right triangle, ladder is Hypotenuse = 15 m, height is Perpendicular = 12 m, base = a.',
              'Step 2: By Pythagoras theorem: 15² = 12² + a².',
              'Step 3: 225 = 144 + a² ⇒ a² = 225 - 144 = 81.',
              'Step 4: a = √81 = 9 m.',
            ],
            finalAnswer: '9 m',
          },
        ],
        applications: ['Checking right angles in construction using 3-4-5 rule, ramp slopes.'],
        commonMistakes: [
          {
            mistake: 'Applying Pythagoras property to non-right triangles.',
            correction: 'Pythagoras property is STRICTLY applicable only to right-angled triangles.',
            why: 'The geometric proof depends directly on the 90° angle orthogonality.',
          },
        ],
        importantQuestions: ['Can a triangle have sides 3 cm, 6 cm, and 7 cm? Justify using triangle inequality.'],
        quickRevisionSummary: [
          'Sum of angles = 180°.',
          'Exterior angle = sum of interior opposites.',
          'Hypotenuse² = Base² + Altitude².',
        ],
      },
    ],
  },
];
