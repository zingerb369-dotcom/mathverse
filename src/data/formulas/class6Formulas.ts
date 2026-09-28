import { FormulaItem } from '../../types';

export const CLASS_6_FORMULAS: FormulaItem[] = [
  // ==========================================
  // CHAPTER 1: PATTERNS IN MATHEMATICS
  // ==========================================
  {
    id: 'f_c6_1_1',
    grade: 6,
    bookName: 'Ganita Prakash (Class VI NCERT)',
    chapterNumber: 1,
    chapterId: 'c6_ch1',
    chapterName: 'Patterns in Mathematics',
    topicName: 'Number Sequences and Visual Patterns',
    subtopicName: 'Triangular and Square Numbers',
    title: 'Triangular Numbers and Matchstick Pattern Formula',
    formulaLatex: 'T_n = \\frac{n(n + 1)}{2} = 1 + 2 + 3 + \\dots + n, \\quad S_n = n^2',
    alternativeForm: '\\text{Matchstick Linear Pattern: } M = an + b',
    variables: [
      { symbol: 'n', meaning: 'Step number or pattern index (n = 1, 2, 3, ...)' },
      { symbol: 'Tn', meaning: 'nth triangular number (1, 3, 6, 10, 15, ...)' },
      { symbol: 'Sn', meaning: 'nth square number (1, 4, 9, 16, 25, ...)' },
      { symbol: 'M', meaning: 'Total number of matchsticks required for n repetitions' },
    ],
    units: 'Count (integers)',
    conditions: 'n must be a positive natural number.',
    whenToUse: 'Finding the number of dots in triangular arrangements, matchsticks needed for repeated shapes (like letters or polygons).',
    explanation: 'Triangular numbers represent dots packed into equilateral triangles. The sum of two consecutive triangular numbers is always a square number: Tn-1 + Tn = n².',
    example: {
      problem: 'Find the 6th triangular number and check if T5 + T6 equals 6².',
      steps: [
        'T₆ = 6(6 + 1) / 2 = 6 × 7 / 2 = 21',
        'T₅ = 5(6) / 2 = 15',
        'Check sum: T₅ + T₆ = 15 + 21 = 36 = 6²',
      ],
      answer: 'T₆ = 21 and 15 + 21 = 36 = 6²',
    },
    relatedFormulae: ['Sum of first n natural numbers in Class 10 AP'],
    commonMistake: 'Multiplying n by itself instead of n × (n + 1) / 2.',
    examTip: 'The sum of any two consecutive triangular numbers always gives the square of the larger index: T(n-1) + T(n) = n².',
    difficulty: 'easy',
    formulaType: 'Rule',
    category: 'numbers',
    isShared: true,
    sharedInClasses: [5, 6, 10],
  },

  // ==========================================
  // CHAPTER 3: NUMBER PLAY (DIVISIBILITY TESTS)
  // ==========================================
  {
    id: 'f_c6_3_1',
    grade: 6,
    bookName: 'Ganita Prakash (Class VI NCERT)',
    chapterNumber: 3,
    chapterId: 'c6_ch3',
    chapterName: 'Number Play',
    topicName: 'Divisibility Rules',
    subtopicName: 'Tests of Divisibility',
    title: 'The Master Collection of Divisibility Rules (2, 3, 4, 5, 6, 8, 9, 10, 11)',
    formulaLatex: '\\begin{aligned} \\text{Divisible by 2: } & \\text{Last digit is even (0, 2, 4, 6, 8)} \\\\[2pt] \\text{Divisible by 3: } & \\text{Sum of all digits is a multiple of 3} \\\\[2pt] \\text{Divisible by 4: } & \\text{Number formed by last two digits is divisible by 4} \\\\[2pt] \\text{Divisible by 5: } & \\text{Last digit is 0 or 5} \\\\[2pt] \\text{Divisible by 6: } & \\text{Divisible by BOTH 2 and 3} \\\\[2pt] \\text{Divisible by 8: } & \\text{Number formed by last three digits is divisible by 8} \\\\[2pt] \\text{Divisible by 9: } & \\text{Sum of all digits is a multiple of 9} \\\\[2pt] \\text{Divisible by 10: } & \\text{Last digit is 0} \\\\[2pt] \\text{Divisible by 11: } & |\\text{Sum(Odd place digits)} - \\text{Sum(Even place digits)}| = 0 \\text{ or mult of 11} \\end{aligned}',
    alternativeForm: '\\text{Co-prime rule: If a number is divisible by two co-prime numbers, it is divisible by their product}',
    variables: [
      { symbol: 'n', meaning: 'Any positive integer tested for divisibility' },
    ],
    units: 'Pure numbers',
    conditions: 'Applies to base-10 representations.',
    whenToUse: 'Simplifying fractions, finding prime factors, rapid mental arithmetic in exam questions.',
    explanation: 'Mathematical shortcuts derived from the powers of 10 that test whether a number divides evenly without performing long division.',
    example: {
      problem: 'Test whether 61809 is divisible by 11.',
      steps: [
        'Sum of digits at odd places (from right): 9 + 8 + 6 = 23',
        'Sum of digits at even places (from right): 0 + 1 = 1',
        'Difference = 23 - 1 = 22',
        'Since 22 is a multiple of 11 (22 = 11 × 2), 61809 is divisible by 11.',
      ],
      answer: 'Yes, divisible by 11',
    },
    relatedFormulae: ['Prime factorisation', 'HCF and LCM algorithms'],
    commonMistake: 'Counting odd/even places as odd/even digits themselves (it refers to the POSITION from the right, not the value of the digit!).',
    examTip: 'To check divisibility by 6, check the last digit first (must be even). Only if it is even do you need to add the digits for 3!',
    difficulty: 'easy',
    formulaType: 'Rule',
    category: 'shortcuts',
    isShared: true,
    sharedInClasses: [5, 6, 7, 8, 9, 10],
  },

  // ==========================================
  // CHAPTER 6: PERIMETER AND AREA
  // ==========================================
  {
    id: 'f_c6_6_1',
    grade: 6,
    bookName: 'Ganita Prakash (Class VI NCERT)',
    chapterNumber: 6,
    chapterId: 'c6_ch6',
    chapterName: 'Perimeter and Area',
    topicName: 'Perimeter of Regular Polygons',
    subtopicName: 'Perimeter Formulas',
    title: 'Perimeter and Area of Rectangles, Squares & Regular Polygons',
    formulaLatex: 'P_{\\text{rectangle}} = 2(l + b), \\quad P_{\\text{square}} = 4s, \\quad P_{\\text{regular } n\\text{-gon}} = n \\times s, \\quad A_{\\text{rectangle}} = l \\times b, \\quad A_{\\text{square}} = s^2',
    alternativeForm: 'l = \\frac{A}{b}, \\quad b = \\frac{A}{l}, \\quad s = \\sqrt{A}',
    variables: [
      { symbol: 'l, b', meaning: 'Length and breadth of rectangle' },
      { symbol: 's', meaning: 'Side length of square or regular polygon' },
      { symbol: 'n', meaning: 'Number of equal sides of a regular polygon (e.g. 3 for equilateral triangle, 5 for pentagon, 6 for hexagon)' },
    ],
    units: 'Perimeter in cm or m; Area in cm² or m²',
    conditions: 'Lengths and breadths must be converted to the same unit before multiplying.',
    whenToUse: 'Border ribbon, fencing around a park, tiles needed to cover a floor.',
    explanation: 'Perimeter is the total boundary distance around a closed figure; area is the number of unit squares that fit inside.',
    example: {
      problem: 'Find the cost of fencing a square park of side 250 m at the rate of ₹20 per metre.',
      steps: [
        'Side s = 250 m',
        'Perimeter = 4 × s = 4 × 250 = 1000 m',
        'Cost = 1000 m × ₹20/m = ₹20,000',
      ],
      answer: 'Cost = ₹20,000',
    },
    relatedFormulae: ['Area of 4 walls of a room = 2h(l + b)'],
    commonMistake: 'Calculating area when fencing is asked (fencing is PERIMETER; grass/paving is AREA).',
    examTip: 'Always check units: if length is 2 m and breadth is 50 cm, convert 2 m to 200 cm first!',
    difficulty: 'easy',
    formulaType: 'Formula',
    category: 'mensuration',
    isShared: true,
    sharedInClasses: [5, 6, 7, 8],
  },

  // ==========================================
  // CHAPTER 8: RATIO AND PROPORTION
  // ==========================================
  {
    id: 'f_c6_8_1',
    grade: 6,
    bookName: 'Ganita Prakash (Class VI NCERT)',
    chapterNumber: 8,
    chapterId: 'c6_ch8',
    chapterName: 'Ratio and Proportion',
    topicName: 'Proportion & Unitary Method',
    subtopicName: 'Cross Product Rule and Unit Value',
    title: 'Proportion Rule and the Unitary Method',
    formulaLatex: 'a : b :: c : d \\iff \\frac{a}{b} = \\frac{c}{d} \\iff a \\times d = b \\times c \\quad (\\text{Product of Extremes} = \\text{Product of Means})',
    alternativeForm: '\\text{Unitary Method: } \\text{Cost of } n \\text{ items} = \\left( \\frac{\\text{Total Cost of } m \\text{ items}}{m} \\right) \\times n',
    variables: [
      { symbol: 'a, d', meaning: 'Extremes of the proportion' },
      { symbol: 'b, c', meaning: 'Means of the proportion' },
      { symbol: 'm, n', meaning: 'Given quantity and target quantity in unitary method' },
    ],
    units: 'Matched problem units (ratios are dimensionless)',
    conditions: 'Both terms in a ratio must be in the identical units of measurement before computing.',
    whenToUse: 'Comparing quantities, price scaling, recipes, scale drawings, speed comparisons.',
    explanation: 'Four quantities are in proportion if the ratio of the first two equals the ratio of the last two. The unitary method first calculates the value of one unit, then scales to the target quantity.',
    example: {
      problem: 'If the cost of 6 cans of juice is ₹210, then what is the cost of 4 cans of juice?',
      steps: [
        'Cost of 6 cans = ₹210',
        'Cost of 1 can = 210 / 6 = ₹35 (Unit value)',
        'Cost of 4 cans = 35 × 4 = ₹140',
      ],
      answer: '₹140',
    },
    relatedFormulae: ['Direct Proportion in Class 8'],
    commonMistake: 'Writing a ratio between different units without converting (e.g. ratio of 30 cm to 2 m is NOT 30:2, it is 30:200 = 3:20).',
    examTip: 'Always convert both quantities to the smaller unit (e.g. convert meters to centimeters, kilograms to grams) before setting up a ratio.',
    difficulty: 'easy',
    formulaType: 'Rule',
    category: 'shortcuts',
    isShared: true,
    sharedInClasses: [5, 6, 7, 8],
  },
];
