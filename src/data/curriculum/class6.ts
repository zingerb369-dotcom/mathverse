import { Chapter } from '../../types';

export const CLASS_6_CHAPTERS: Chapter[] = [
  {
    id: 'c6_ch1',
    grade: 6,
    order: 1,
    name: 'Knowing Our Numbers',
    hindiName: 'अपनी संख्याओं की जानकारी',
    description: 'Comparing numbers, large numbers in practice (Indian and International numeral systems), estimation, Roman numerals.',
    overview: 'Learn to read, write, compare, and estimate 6-digit to 8-digit numbers. Master Indian system (Lakhs, Crores) and International system (Millions, Billions).',
    weightageMarks: 8,
    keyFormulasCount: 2,
    totalQuestionsCount: 12,
    badge: 'Number Systems',
    topics: [
      {
        id: 'c6_ch1_t1',
        name: 'Indian and International Number Systems & Roman Numerals',
        concepts: [
          'Indian System: Ones, Tens, Hundreds, Thousands, Ten Thousands, Lakhs, Ten Lakhs, Crores.',
          'International System: Ones, Tens, Hundreds, Thousands, Ten Thousands, Hundred Thousands, Millions, Ten Millions, Hundred Millions.',
          'Conversion: 1 Million = 10 Lakhs; 10 Million = 1 Crore; 1 Billion = 100 Crores.',
          'Roman Numerals: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.',
        ],
        definitions: [
          {
            term: 'Place Value',
            definition: 'The numerical value that a digit has by virtue of its position in a number.',
          },
        ],
        properties: ['Roman numerals V, L, and D are never subtracted or repeated.'],
        importantFormulas: [
          '1 \\text{ Million} = 10 \\text{ Lakhs}',
          '1 \\text{ Crore} = 10 \\text{ Millions}',
        ],
        solvedExamples: [
          {
            id: 'c6_ex1',
            title: 'International System Placement',
            problem: 'Insert commas suitably and write the name according to International System of Numeration: 78921092.',
            solutionSteps: [
              'Step 1: In the International system, place commas after every three digits from the right: 78,921,092.',
              'Step 2: Read group by group: 78 Million, 921 Thousand, 92.',
              'Step 3: Seventy-eight million nine hundred twenty-one thousand ninety-two.',
            ],
            finalAnswer: '78,921,092 : Seventy-eight million nine hundred twenty-one thousand ninety-two',
          },
        ],
        applications: ['Census populations, government budgetary allocations.'],
        commonMistakes: [
          {
            mistake: 'Placing commas in sets of 2 after the first 3 in International system.',
            correction: 'International system uses commas strictly every 3 digits throughout: 3, 3, 3.',
            why: 'Indian system uses 3, then 2, 2, 2; International strictly uses triads.',
          },
        ],
        importantQuestions: ['Write in Roman numerals: (a) 73, (b) 92, (c) 149.'],
        quickRevisionSummary: [
          '1 Million = 10 Lakhs.',
          '1 Crore = 10 Millions.',
          'Roman symbols: I, V, X, L, C, D, M.',
        ],
      },
    ],
  },
  {
    id: 'c6_ch3',
    grade: 6,
    order: 2,
    name: 'Playing with Numbers',
    hindiName: 'संख्याओं के साथ खेलना',
    description: 'Factors and multiples, prime and composite numbers, tests for divisibility of numbers, common factors and multiples (HCF and LCM).',
    overview: 'Explore factor trees, divisibility rules for 2, 3, 4, 5, 6, 8, 9, 10, 11, and finding Highest Common Factor (HCF) and Lowest Common Multiple (LCM).',
    weightageMarks: 10,
    keyFormulasCount: 2,
    totalQuestionsCount: 14,
    badge: 'Number Systems',
    topics: [
      {
        id: 'c6_ch3_t1',
        name: 'Divisibility Rules, HCF and LCM',
        concepts: [
          'Divisible by 3 if sum of digits is a multiple of 3.',
          'Divisible by 4 if last two digits form a number divisible by 4.',
          'Divisible by 9 if sum of digits is divisible by 9.',
          'Divisible by 11 if difference between sum of digits at odd places and sum of digits at even places is 0 or divisible by 11.',
          'HCF is the greatest number that divides the given numbers without leaving a remainder.',
          'LCM is the smallest number that is a multiple of all the given numbers.',
        ],
        definitions: [
          {
            term: 'Prime Number',
            definition: 'A number greater than 1 that has only two factors: 1 and the number itself.',
          },
        ],
        properties: ['2 is the smallest and the only even prime number. 1 is neither prime nor composite.'],
        importantFormulas: [
          '\\text{HCF} \\times \\text{LCM} = \\text{Product of two numbers}',
        ],
        solvedExamples: [
          {
            id: 'c6_hcf_ex1',
            title: 'Finding HCF and LCM',
            problem: 'Find the LCM of 12, 16, and 24 by common division method.',
            solutionSteps: [
              'Step 1: Divide by 2: (12, 16, 24) → (6, 8, 12).',
              'Step 2: Divide by 2: (6, 8, 12) → (3, 4, 6).',
              'Step 3: Divide by 2: (3, 4, 6) → (3, 2, 3).',
              'Step 4: Divide by 2: (3, 2, 3) → (3, 1, 3).',
              'Step 5: Divide by 3: (3, 1, 3) → (1, 1, 1).',
              'Step 6: LCM = 2 × 2 × 2 × 2 × 3 = 48.',
            ],
            finalAnswer: 'LCM = 48',
          },
        ],
        applications: ['Bells ringing together intervals, floor tiling.'],
        commonMistakes: [
          {
            mistake: 'Considering 1 as a prime number.',
            correction: '1 is NEITHER prime nor composite.',
            why: 'Prime numbers must have exactly two distinct positive factors (1 has only one).',
          },
        ],
        importantQuestions: ['Find the least 3-digit number which is divisible by 6, 8 and 12.'],
        quickRevisionSummary: [
          '2 is the only even prime number.',
          'Divisibility by 3 and 9 uses digit sum.',
          'LCM of numbers is always ≥ their HCF.',
        ],
      },
    ],
  },
];
