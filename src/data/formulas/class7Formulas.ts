import { FormulaItem } from '../../types';

export const CLASS_7_FORMULAS: FormulaItem[] = [
  // ==========================================
  // CHAPTER 1: INTEGERS
  // ==========================================
  {
    id: 'f_c7_1_1',
    grade: 7,
    bookName: 'Mathematics (Class VII NCERT)',
    chapterNumber: 1,
    chapterId: 'c7_ch1',
    chapterName: 'Integers',
    topicName: 'Multiplication and Division of Integers',
    subtopicName: 'Signs Rules',
    title: 'Rules of Signs for Integer Multiplication and Division',
    formulaLatex: '(+) \\times (+) = (+), \\quad (+) \\times (-) = (-), \\quad (-) \\times (-) = (+), \\quad \\frac{(-a)}{b} = \\frac{a}{(-b)} = -\\frac{a}{b}, \\quad \\frac{(-a)}{(-b)} = \\frac{a}{b}',
    alternativeForm: '(-1)^{\\text{odd}} = -1, \\quad (-1)^{\\text{even}} = +1, \\quad a \\div 0 = \\text{Undefined}',
    variables: [
      { symbol: 'a, b', meaning: 'Any positive integers (b ≠ 0)' },
    ],
    units: 'Signed integers',
    conditions: 'Division by zero is strictly undefined. For an odd count of negative factors, the product is negative; for an even count, the product is positive.',
    whenToUse: 'Multiplying multiple signed numbers, evaluating integer algebra, temperatures, debt/credit problems.',
    explanation: 'Like signs yield a positive result; unlike signs yield a negative result. Negative signs can be pulled out or canceled in pairs.',
    example: {
      problem: 'Find the product: (-18) × (-10) × 9.',
      steps: [
        'Count negative factors: two negatives (even number) ⇒ result will be positive.',
        '(-18) × (-10) = +180',
        '180 × 9 = 1620',
      ],
      answer: '+1620',
    },
    relatedFormulae: ['Additive inverse: a + (-a) = 0'],
    commonMistake: 'Writing (-a) + (-b) as positive (multiplication rules do NOT apply to addition! Sum of two negatives is negative!).',
    examTip: 'Count the negative signs first: if count is odd, put a minus sign immediately; if even, put a plus sign; then multiply the absolute numbers.',
    difficulty: 'easy',
    formulaType: 'Rule',
    category: 'numbers',
    isShared: true,
    sharedInClasses: [6, 7, 8],
  },

  // ==========================================
  // CHAPTER 3: DATA HANDLING
  // ==========================================
  {
    id: 'f_c7_3_1',
    grade: 7,
    bookName: 'Mathematics (Class VII NCERT)',
    chapterNumber: 3,
    chapterId: 'c7_ch3',
    chapterName: 'Data Handling',
    topicName: 'Representative Values',
    subtopicName: 'Mean, Median, Mode, Range',
    title: 'Central Tendency and Range Formulas',
    formulaLatex: '\\text{Mean} = \\frac{\\text{Sum of all observations}}{\\text{Number of observations}} = \\frac{\\sum x}{n}, \\quad \\text{Range} = \\text{Highest} - \\text{Lowest}',
    alternativeForm: '\\text{Mode} = \\text{Most frequently occurring value}, \\quad \\text{Median} = \\text{Middle value when arranged in order}',
    variables: [
      { symbol: 'x', meaning: 'Values of individual observations' },
      { symbol: 'n', meaning: 'Total count of observations' },
    ],
    units: 'Same units as dataset values',
    conditions: 'For median, data MUST be sorted in ascending or descending order first.',
    whenToUse: 'Summarizing test marks, temperatures, heights, and sales data.',
    explanation: 'Mean calculates the arithmetic balance point; Range measures spread; Mode measures most popular choice; Median measures exact midpoint.',
    example: {
      problem: 'Find the mean and range of the data: 6, 15, 120, 50, 100, 80, 10, 15, 8, 10, 15.',
      steps: [
        'Sum = 6 + 15 + 120 + 50 + 100 + 80 + 10 + 15 + 8 + 10 + 15 = 429',
        'Count n = 11 observations',
        'Mean = 429 / 11 = 39',
        'Highest = 120, Lowest = 6 ⇒ Range = 120 - 6 = 114',
      ],
      answer: 'Mean = 39, Range = 114',
    },
    relatedFormulae: ['Mode of data', 'Median of data'],
    commonMistake: 'Finding the median without sorting the numbers in ascending order first.',
    examTip: 'Mode can have more than one value if two numbers tie for highest frequency (bimodal). Mean always lies between the lowest and highest values.',
    difficulty: 'easy',
    formulaType: 'Formula',
    category: 'statistics',
    isShared: true,
    sharedInClasses: [6, 7, 8, 9, 10],
  },

  // ==========================================
  // CHAPTER 6: TRIANGLE AND PROPERTIES
  // ==========================================
  {
    id: 'f_c7_6_1',
    grade: 7,
    bookName: 'Mathematics (Class VII NCERT)',
    chapterNumber: 6,
    chapterId: 'c7_ch6',
    chapterName: 'The Triangle and its Properties',
    topicName: 'Triangle Inequality & Right Triangle',
    subtopicName: 'Side Sum Inequality and Pythagoras Property',
    title: 'Triangle Inequality Property and Pythagoras Property',
    formulaLatex: 'a + b > c, \\quad b + c > a, \\quad c + a > b; \\qquad c^2 = a^2 + b^2 \\quad (\\text{when } \\angle C = 90^\\circ)',
    alternativeForm: '\\text{Difference of any two sides is less than the third side: } |a - b| < c',
    variables: [
      { symbol: 'a, b, c', meaning: 'Lengths of the three sides of the triangle' },
    ],
    units: 'Length units (cm)',
    conditions: 'Valid for every Euclidean triangle.',
    whenToUse: 'Checking whether a triangle is possible with given side lengths, finding bounds for a missing side.',
    explanation: 'The sum of the lengths of any two sides of a triangle must be strictly greater than the length of the third side.',
    example: {
      problem: 'Can a triangle have sides of lengths 2 cm, 3 cm, and 5 cm?',
      steps: [
        'Check sum of two smaller sides: 2 + 3 = 5 cm',
        'Is 2 + 3 > 5? No, 5 is equal to 5, not strictly greater.',
        'Therefore, no triangle is possible with these lengths.',
      ],
      answer: 'No triangle possible',
    },
    relatedFormulae: ['Pythagorean triplets', 'Angle sum property'],
    commonMistake: 'Allowing equality (e.g. 2 + 3 = 5 forms a flat collapsed line, not a triangle!).',
    examTip: 'Shortcut: To check if 3 lengths form a triangle, simply check if the sum of the two SMALLER sides is strictly greater than the LARGEST side.',
    difficulty: 'easy',
    formulaType: 'Property',
    category: 'geometry',
    isShared: true,
    sharedInClasses: [7, 8, 9],
  },

  // ==========================================
  // CHAPTER 7: COMPARING QUANTITIES
  // ==========================================
  {
    id: 'f_c7_7_1',
    grade: 7,
    bookName: 'Mathematics (Class VII NCERT)',
    chapterNumber: 7,
    chapterId: 'c7_ch7',
    chapterName: 'Comparing Quantities',
    topicName: 'Simple Interest',
    subtopicName: 'Basic Interest Formula',
    title: 'Simple Interest and Total Amount Formula',
    formulaLatex: 'I = \\frac{P \\times R \\times T}{100}, \\quad A = P + I = P \\left(1 + \\frac{R \\times T}{100}\\right)',
    alternativeForm: 'P = \\frac{100 \\times I}{R \\times T}, \\quad R = \\frac{100 \\times I}{P \\times T}, \\quad T = \\frac{100 \\times I}{P \\times R}',
    variables: [
      { symbol: 'I', meaning: 'Simple Interest earned or owed' },
      { symbol: 'P', meaning: 'Principal (original sum invested or borrowed)' },
      { symbol: 'R', meaning: 'Rate of interest in percent per annum (% p.a.)' },
      { symbol: 'T', meaning: 'Time period strictly expressed in years' },
      { symbol: 'A', meaning: 'Total amount to be repaid: Principal + Interest' },
    ],
    units: 'Currency (₹) and Time (years)',
    conditions: 'Time T must be in years. If given in months, divide by 12. If given in days, divide by 365.',
    whenToUse: 'Basic loans, fixed deposits, simple savings plans.',
    explanation: 'Simple interest accrues uniformly every year on the original principal sum alone.',
    example: {
      problem: 'Find the simple interest and amount on ₹4500 at 8% per annum for 3 years.',
      steps: [
        'P = 4500, R = 8, T = 3',
        'I = (4500 × 8 × 3) / 100 = 45 × 24 = ₹1080',
        'Amount A = P + I = ₹4500 + ₹1080 = ₹5580',
      ],
      answer: 'Interest = ₹1080, Amount = ₹5580',
    },
    relatedFormulae: ['Compound interest in Class 8'],
    commonMistake: 'Using time in months directly without converting to years (e.g. using T = 6 instead of 6/12 = 0.5 years).',
    examTip: 'To convert months to years: T = months / 12. Always write the unit years before calculating.',
    difficulty: 'easy',
    formulaType: 'Formula',
    category: 'algebra',
    isShared: true,
    sharedInClasses: [6, 7, 8],
  },

  // ==========================================
  // CHAPTER 9: PERIMETER AND AREA
  // ==========================================
  {
    id: 'f_c7_9_1',
    grade: 7,
    bookName: 'Mathematics (Class VII NCERT)',
    chapterNumber: 9,
    chapterId: 'c7_ch9',
    chapterName: 'Perimeter and Area',
    topicName: 'Parallelogram, Triangle, and Circle',
    subtopicName: 'Standard 2D Areas and Circumference',
    title: 'Perimeter and Area of 2D Figures (Rectangle, Triangle, Circle)',
    formulaLatex: '\\begin{aligned} \\text{Rectangle: } & P = 2(l + b), \\; A = l \\times b \\\\[2pt] \\text{Triangle: } & A = \\frac{1}{2} b h \\\\[2pt] \\text{Parallelogram: } & A = b \\times h \\\\[2pt] \\text{Circle: } & C = 2\\pi r = \\pi d, \\; A = \\pi r^2 \\end{aligned}',
    alternativeForm: '1\\text{ m}^2 = 10{,}000\\text{ cm}^2, \\quad 1\\text{ hectare} = 10{,}000\\text{ m}^2',
    variables: [
      { symbol: 'l, b', meaning: 'Length and breadth of rectangle' },
      { symbol: 'b, h', meaning: 'Base and corresponding perpendicular height' },
      { symbol: 'r, d', meaning: 'Radius and diameter of circle (d = 2r)' },
      { symbol: 'π', meaning: 'Constant ratio: Circumference / Diameter ≈ 22/7 or 3.14' },
    ],
    units: 'Perimeter in cm or m; Area in cm², m², or hectares',
    conditions: 'In triangles and parallelograms, height h must be strictly perpendicular to the chosen base b.',
    whenToUse: 'Fencing costs (perimeter), tiling or carpeting costs (area), wheel rotation distances (circumference).',
    explanation: 'Perimeter measures the boundary distance around a closed plane figure; Area measures the two-dimensional region enclosed inside.',
    example: {
      problem: 'Find the circumference and area of a circle with radius 14 cm (use π = 22/7).',
      steps: [
        'r = 14 cm',
        'Circumference C = 2 × (22 / 7) × 14 = 2 × 22 × 2 = 88 cm',
        'Area A = (22 / 7) × 14² = (22 / 7) × 196 = 22 × 28 = 616 cm²',
      ],
      answer: 'C = 88 cm, A = 616 cm²',
    },
    relatedFormulae: ['Area between concentric circles: A = π(R² - r²)'],
    commonMistake: 'Confusing 2πr (circumference, 1D length) with πr² (area, 2D square units).',
    examTip: 'Distance traveled by a wheel in n revolutions = n × Circumference = n × 2πr.',
    difficulty: 'easy',
    formulaType: 'Formula',
    category: 'mensuration',
    isShared: true,
    sharedInClasses: [5, 6, 7, 8, 9, 10],
  },
];
