import { Chapter } from '../../types';

export const CLASS_8_CHAPTERS: Chapter[] = [
  {
    id: 'c8_ch1',
    grade: 8,
    order: 1,
    name: 'Rational Numbers',
    hindiName: 'परिमेय संख्याएँ',
    description: 'Properties of rational numbers (closure, commutativity, associativity, distributivity), additive/multiplicative identities and inverses.',
    overview: 'Numbers of the form p/q (p, q integers, q ≠ 0). Master closure, commutative, associative, and distributive properties along with representation on number line.',
    weightageMarks: 6,
    keyFormulasCount: 3,
    totalQuestionsCount: 12,
    badge: 'Number Systems',
    topics: [
      {
        id: 'c8_ch1_t1',
        name: 'Properties and Operations of Rational Numbers',
        concepts: [
          'A number of the form p/q, where p and q are integers and q ≠ 0, is a rational number.',
          'Closure property: Rational numbers are closed under addition, subtraction, and multiplication (not closed under division because division by 0 is undefined).',
          'Commutative property: a + b = b + a, and a × b = b × a (not commutative for subtraction and division).',
          'Distributive property: a(b + c) = ab + ac.',
          'Additive identity is 0; Multiplicative identity is 1.',
          'Additive inverse of a/b is -a/b; Multiplicative inverse (reciprocal) of a/b is b/a.',
        ],
        definitions: [
          {
            term: 'Reciprocal',
            definition: 'The multiplicative inverse of a non-zero rational number a/b is b/a such that (a/b) × (b/a) = 1.',
          },
        ],
        properties: ['0 has no reciprocal / multiplicative inverse.'],
        importantFormulas: [
          'a(b + c) = ab + ac \\quad (\\text{Distributivity})',
          '\\frac{a}{b} + \\left(-\\frac{a}{b}\\right) = 0 \\quad (\\text{Additive Inverse})',
        ],
        solvedExamples: [
          {
            id: 'c8_ex1',
            title: 'Using Distributive Property',
            problem: 'Find using appropriate properties: (2/5) × (-3/7) - (1/14) - (3/7) × (3/5).',
            solutionSteps: [
              'Step 1: Regroup terms: (2/5) × (-3/7) - (3/7) × (3/5) - (1/14).',
              'Step 2: Rewrite: (-3/7) × [(2/5) + (3/5)] - (1/14).',
              'Step 3: (-3/7) × (5/5) - (1/14) = (-3/7) × 1 - (1/14) = -3/7 - 1/14.',
              'Step 4: Common denominator 14: (-6 - 1)/14 = -7/14 = -1/2.',
            ],
            finalAnswer: '-1/2',
          },
        ],
        applications: ['Financial budgeting, splitting proportions, recipe scaling.'],
        commonMistakes: [
          {
            mistake: 'Assuming rational numbers are closed under division.',
            correction: 'Division by zero is undefined, so rational numbers are not closed under division.',
            why: '5 / 0 has no defined value in mathematics.',
          },
        ],
        importantQuestions: ['Find 5 rational numbers between 2/3 and 4/5.'],
        quickRevisionSummary: [
          'Additive Identity = 0; Multiplicative Identity = 1.',
          'Reciprocal of a/b = b/a.',
          'Distributive rule: a(b+c) = ab + ac.',
        ],
      },
    ],
  },
  {
    id: 'c8_ch2',
    grade: 8,
    order: 2,
    name: 'Linear Equations in One Variable',
    hindiName: 'एक चर वाले रैखिक समीकरण',
    description: 'Solving linear equations with variables on one side and both sides, practical word applications.',
    overview: 'Equations of the form ax + b = c. Learn transposition method, balancing method, and applying equations to solve problems involving age, currency, and geometry.',
    weightageMarks: 8,
    keyFormulasCount: 2,
    totalQuestionsCount: 12,
    badge: 'Algebra',
    topics: [
      {
        id: 'c8_ch2_t1',
        name: 'Solving and Applying Linear Equations',
        concepts: [
          'An algebraic equation is an equality involving variables with highest exponent 1.',
          'Transposition: Moving a term from one side to the other reverses its operation (+ becomes -, × becomes ÷).',
          'Cross-multiplication method for rational expressions.',
        ],
        definitions: [
          {
            term: 'Linear Equation',
            definition: 'An equation where the highest degree of the variable involved is 1.',
          },
        ],
        properties: ['The value of the expression on the LHS remains equal to RHS when same operations are done on both sides.'],
        importantFormulas: ['ax + b = 0 \\implies x = -\\frac{b}{a}'],
        solvedExamples: [
          {
            id: 'c8_eq_ex1',
            title: 'Variable on Both Sides',
            problem: 'Solve: 5x + 9 = 5 + 3x.',
            solutionSteps: [
              'Step 1: Transpose 3x to LHS: 5x - 3x + 9 = 5.',
              'Step 2: 2x + 9 = 5.',
              'Step 3: Transpose 9 to RHS: 2x = 5 - 9 = -4.',
              'Step 4: Divide by 2: x = -4/2 = -2.',
            ],
            finalAnswer: 'x = -2',
          },
        ],
        applications: ['Speed-time calculation, coin and currency note counting, perimeter-dimension relations.'],
        commonMistakes: [
          {
            mistake: 'Forgetting to change sign when transposing across the equal sign.',
            correction: 'Always invert the sign: + becomes -, - becomes +.',
            why: 'Transposition is shorthand for subtracting or adding the quantity from both sides.',
          },
        ],
        importantQuestions: ['The ages of Rahul and Haroon are in the ratio 5:7. Four years later the sum of their ages will be 56 years. What are their present ages?'],
        quickRevisionSummary: [
          'Highest power of variable is 1.',
          'Transpose terms to isolate x.',
          'Verify solution by substituting back into LHS and RHS.',
        ],
      },
    ],
  },
  {
    id: 'c8_ch8',
    grade: 8,
    order: 3,
    name: 'Algebraic Expressions and Identities',
    hindiName: 'बीजीय व्यंजक एवं सर्वसमिकाएँ',
    description: 'Monomials, binomials, polynomials, multiplication of expressions, standard identities.',
    overview: 'Covers terms, factors, coefficients, multiplying algebraic expressions, and proving/applying the three standard algebraic identities.',
    weightageMarks: 8,
    keyFormulasCount: 4,
    totalQuestionsCount: 14,
    badge: 'Algebra',
    topics: [
      {
        id: 'c8_ch8_t1',
        name: 'Standard Algebraic Identities',
        concepts: [
          'Identity I: (a + b)² = a² + 2ab + b².',
          'Identity II: (a - b)² = a² - 2ab + b².',
          'Identity III: (a + b)(a - b) = a² - b².',
          'Identity IV: (x + a)(x + b) = x² + (a + b)x + ab.',
        ],
        definitions: [
          {
            term: 'Identity',
            definition: 'An equality which is true for all values of the variables involved.',
          },
        ],
        properties: ['An identity differs from an ordinary equation because an identity holds for EVERY value of the variable.'],
        importantFormulas: [
          '(a + b)^2 = a^2 + 2ab + b^2',
          '(a - b)^2 = a^2 - 2ab + b^2',
          'a^2 - b^2 = (a + b)(a - b)',
        ],
        solvedExamples: [
          {
            id: 'c8_ident_ex1',
            title: 'Evaluating using Identity',
            problem: 'Evaluate 103 × 104 without direct multiplication.',
            solutionSteps: [
              'Step 1: Write as (100 + 3)(100 + 4).',
              'Step 2: Use (x + a)(x + b) = x² + (a + b)x + ab with x = 100, a = 3, b = 4.',
              'Step 3: = 100² + (3 + 4)(100) + (3 × 4) = 10000 + 700 + 12 = 10712.',
            ],
            finalAnswer: '10712',
          },
        ],
        applications: ['Mental math shortcuts, geometric area expansions.'],
        commonMistakes: [
          {
            mistake: 'Writing (a + b)² = a² + b² (missing 2ab).',
            correction: '(a + b)² = a² + 2ab + b². Never forget the middle cross-term!',
            why: 'Expanding (a+b)(a+b) = a² + ab + ba + b² = a² + 2ab + b².',
          },
        ],
        importantQuestions: ['Using identity, evaluate: (i) 99², (ii) 51² - 49².'],
        quickRevisionSummary: [
          '(a+b)² = a² + 2ab + b².',
          '(a-b)² = a² - 2ab + b².',
          '(a+b)(a-b) = a² - b².',
        ],
      },
    ],
  },
  {
    id: 'c8_ch9',
    grade: 8,
    order: 4,
    name: 'Mensuration',
    hindiName: 'क्षेत्रमिति',
    description: 'Area of trapezium, general quadrilaterals, rhombus, surface area and volume of cube, cuboid, and cylinder.',
    overview: 'Calculate perimeter and area of 2D shapes (trapezium, rhombus) and total surface area and volume of 3D solids (cube, cuboid, cylinder).',
    weightageMarks: 10,
    keyFormulasCount: 5,
    totalQuestionsCount: 14,
    badge: 'Mensuration',
    topics: [
      {
        id: 'c8_ch9_t1',
        name: 'Area of Trapezium, Surface Area & Volume of 3D Solids',
        concepts: [
          'Area of Trapezium: (1/2) × (sum of parallel sides) × (distance between them) = (1/2)(a + b)h.',
          'Area of Rhombus: (1/2) × d₁ × d₂.',
          'Surface Area of Cuboid: 2(lb + bh + hl); Cube: 6a²; Cylinder: 2πr(r + h).',
          'Volume of Cuboid: l × b × h; Cube: a³; Cylinder: πr²h.',
        ],
        definitions: [
          {
            term: 'Trapezium',
            definition: 'A quadrilateral with at least one pair of parallel opposite sides.',
          },
        ],
        properties: ['1 m³ = 1000 litres; 1 cm³ = 1 mL.'],
        importantFormulas: [
          '\\text{Area of Trapezium} = \\frac{1}{2}(a + b)h',
          '\\text{Area of Rhombus} = \\frac{1}{2}d_1 d_2',
          '\\text{Volume of Cylinder} = \\pi r^2 h',
          '\\text{TSA of Cylinder} = 2\\pi r(r + h)',
        ],
        solvedExamples: [
          {
            id: 'c8_mens_ex1',
            title: 'Area of Trapezium',
            problem: 'The area of a trapezium is 34 cm² and the length of one of the parallel sides is 10 cm and its height is 4 cm. Find the length of the other parallel side.',
            solutionSteps: [
              'Step 1: Area = (1/2)(a + b)h. Here Area = 34, a = 10, h = 4.',
              'Step 2: 34 = (1/2)(10 + b) × 4 = 2(10 + b).',
              'Step 3: 10 + b = 34 / 2 = 17 ⇒ b = 17 - 10 = 7 cm.',
            ],
            finalAnswer: '7 cm',
          },
        ],
        applications: ['Storage tank capacities, civil grading, packaging box design.'],
        commonMistakes: [
          {
            mistake: 'Confusing 1 m³ with 100 litres.',
            correction: '1 m³ = 1000 litres.',
            why: '1 m = 100 cm, so 1 m³ = 1,000,000 cm³ = 1,000 litres (since 1,000 cm³ = 1 L).',
          },
        ],
        importantQuestions: ['A water tank is in the form of a cylinder whose radius is 1.5 m and length is 7 m. Find the quantity of water in litres that can be stored in the tank.'],
        quickRevisionSummary: [
          'Trapezium Area = (1/2)(sum of parallel sides) × height.',
          'Cylinder Volume = πr²h, TSA = 2πr(r+h).',
          '1 m³ = 1000 L.',
        ],
      },
    ],
  },
];
