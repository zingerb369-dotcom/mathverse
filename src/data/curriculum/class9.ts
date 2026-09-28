import { Chapter } from '../../types';

export const CLASS_9_CHAPTERS: Chapter[] = [
  {
    id: 'c9_ch1',
    grade: 9,
    order: 1,
    name: 'Number Systems',
    hindiName: 'संख्या पद्धति',
    description: 'Irrational numbers, real numbers and their decimal expansions, operations on real numbers, laws of exponents.',
    overview: 'Explores the complete real number system, representation of real numbers on the number line, rationalising denominators with surds, and laws of exponents.',
    weightageMarks: 10,
    keyFormulasCount: 4,
    totalQuestionsCount: 14,
    badge: 'Unit I: Number Systems',
    topics: [
      {
        id: 'c9_ch1_t1',
        name: 'Real Numbers and Laws of Exponents',
        concepts: [
          'Rational numbers have terminating or non-terminating recurring decimal expansions.',
          'Irrational numbers have non-terminating non-recurring decimal expansions.',
          'Rationalising the denominator: multiplying numerator and denominator by the conjugate of a ± √b.',
          'Laws of exponents for real numbers: a^p · a^q = a^(p+q), (a^p)^q = a^(pq), a^p / a^q = a^(p-q), a^p · b^p = (ab)^p.',
        ],
        definitions: [
          {
            term: 'Rationalisation',
            definition: 'The process of eliminating radicals from the denominator of a fraction.',
          },
        ],
        properties: ['Between any two distinct real numbers, there are infinitely many rational and irrational numbers.'],
        importantFormulas: [
          'a^p \\cdot a^q = a^{p+q}',
          '\\frac{1}{a + \\sqrt{b}} = \\frac{a - \\sqrt{b}}{a^2 - b}',
          '\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}',
        ],
        solvedExamples: [
          {
            id: 'c9_ex1',
            title: 'Rationalising Denominator',
            problem: 'Rationalise the denominator of 1 / (7 + 3√2).',
            solutionSteps: [
              'Step 1: Multiply numerator and denominator by conjugate (7 - 3√2).',
              'Step 2: Numerator = 7 - 3√2.',
              'Step 3: Denominator = (7 + 3√2)(7 - 3√2) = 7² - (3√2)² = 49 - 18 = 31.',
              'Step 4: Result is (7 - 3√2) / 31.',
            ],
            finalAnswer: '(7 - 3√2) / 31',
          },
        ],
        applications: ['Signal processing, engineering scaling, scientific notation calculations.'],
        commonMistakes: [
          {
            mistake: 'Assuming √a + √b = √(a + b).',
            correction: 'Radicals cannot be merged across addition: √a + √b ≠ √(a+b).',
            why: 'Consider a=9, b=16: √9 + √16 = 3 + 4 = 7, but √(9+16) = √25 = 5.',
          },
        ],
        importantQuestions: ['Express 0.2353535... in the form p/q where p and q are integers and q ≠ 0.'],
        quickRevisionSummary: [
          'Terminating or recurring = Rational.',
          'Non-terminating non-recurring = Irrational.',
          'Conjugate of a + √b is a - √b.',
        ],
      },
    ],
  },
  {
    id: 'c9_ch2',
    grade: 9,
    order: 2,
    name: 'Polynomials',
    hindiName: 'बहुपद',
    description: 'Degree of polynomial, zeroes, Factor Theorem, Remainder Theorem, algebraic identities.',
    overview: 'Master polynomials in one variable, Factor Theorem for factorisation of cubics, and key identities like (x+y+z)², x³+y³+z³ - 3xyz.',
    weightageMarks: 12,
    keyFormulasCount: 5,
    totalQuestionsCount: 16,
    badge: 'Unit II: Algebra',
    topics: [
      {
        id: 'c9_ch2_t1',
        name: 'Factor Theorem and Algebraic Identities',
        concepts: [
          'Factor Theorem: (x - a) is a factor of p(x) if and only if p(a) = 0.',
          'Identities: (x + y + z)² = x² + y² + z² + 2xy + 2yz + 2zx.',
          'Cubic Identities: (x ± y)³ = x³ ± y³ ± 3xy(x ± y).',
          'Special: x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx). If x + y + z = 0, then x³ + y³ + z³ = 3xyz.',
        ],
        definitions: [
          {
            term: 'Degree of Polynomial',
            definition: 'The highest power of the variable in a polynomial with non-zero coefficient.',
          },
        ],
        properties: ['A polynomial of degree n has at most n real zeroes.'],
        importantFormulas: [
          '(x+y+z)^2 = x^2+y^2+z^2+2xy+2yz+2zx',
          'x^3+y^3+z^3 - 3xyz = (x+y+z)(x^2+y^2+z^2-xy-yz-zx)',
          '\\text{If } x+y+z=0 \\implies x^3+y^3+z^3 = 3xyz',
        ],
        solvedExamples: [
          {
            id: 'c9_poly_ex1',
            title: 'Evaluating without direct multiplication',
            problem: 'Evaluate (-12)³ + 7³ + 5³ without actually calculating the cubes.',
            solutionSteps: [
              'Step 1: Let x = -12, y = 7, z = 5.',
              'Step 2: Check sum: x + y + z = -12 + 7 + 5 = 0.',
              'Step 3: Since x + y + z = 0, x³ + y³ + z³ = 3xyz.',
              'Step 4: 3(-12)(7)(5) = -36 × 35 = -1260.',
            ],
            finalAnswer: '-1260',
          },
        ],
        applications: ['Trajectory analysis, volume optimization, economics cost functions.'],
        commonMistakes: [
          {
            mistake: 'Classifying 1/x or √x + 2 as a polynomial.',
            correction: 'In a polynomial, exponents of variables must strictly be non-negative integers.',
            why: 'Negative or fractional exponents violate the definition of a polynomial.',
          },
        ],
        importantQuestions: ['Factorise: x³ - 23x² + 142x - 120 using the Factor Theorem.'],
        quickRevisionSummary: [
          'Zeroes are roots of p(x) = 0.',
          'Factor theorem: p(a)=0 ⇔ (x-a) divides p(x).',
          'If x+y+z=0, x³+y³+z³ = 3xyz.',
        ],
      },
    ],
  },
  {
    id: 'c9_ch6',
    grade: 9,
    order: 3,
    name: 'Lines and Angles',
    hindiName: 'रेखाएँ और कोण',
    description: 'Linear pair axiom, vertically opposite angles, parallel lines and transversal, angle sum property.',
    overview: 'Explore geometry axioms and theorems: vertically opposite angles are equal, alternate interior angles are equal for parallel lines, and sum of angles of a triangle is 180°.',
    weightageMarks: 6,
    keyFormulasCount: 3,
    totalQuestionsCount: 14,
    badge: 'Unit IV: Geometry',
    topics: [
      {
        id: 'c9_ch6_t1',
        name: 'Transversal Theorems & Angle Sum Property',
        concepts: [
          'Linear Pair Axiom: If a ray stands on a line, then the sum of two adjacent angles so formed is 180°.',
          'Vertically opposite angles are equal when two lines intersect.',
          'Parallel lines intersected by a transversal: alternate interior angles are equal; interior angles on same side of transversal are supplementary.',
          'The sum of the angles of a triangle is 180°.',
        ],
        definitions: [
          {
            term: 'Linear Pair',
            definition: 'A pair of adjacent angles whose non-common sides form opposite rays.',
          },
        ],
        properties: ['An exterior angle of a triangle is equal to the sum of its two interior opposite angles.'],
        importantFormulas: [
          '\\angle A + \\angle B + \\angle C = 180^\\circ \\quad (\\text{Angle Sum Property})',
          '\\angle \\text{Ext} = \\angle \\text{Int}_1 + \\angle \\text{Int}_2',
        ],
        solvedExamples: [
          {
            id: 'c9_lines_ex1',
            title: 'Parallel Lines Angle Calculation',
            problem: 'In a figure, AB ∥ CD. If ∠APQ = 50° and ∠PRD = 127°, find x and y.',
            solutionSteps: [
              'Step 1: Since AB ∥ CD and PQ is transversal, alternate interior angles are equal: x = ∠APQ = 50°.',
              'Step 2: PR is also a transversal. So ∠APR = ∠PRD = 127°.',
              'Step 3: From figure, ∠APR = ∠APQ + y = 50° + y.',
              'Step 4: 50° + y = 127° ⇒ y = 77°.',
            ],
            finalAnswer: 'x = 50°, y = 77°',
          },
        ],
        applications: ['Architectural truss designing, navigation bearings.'],
        commonMistakes: [
          {
            mistake: 'Assuming alternate angles are always equal even when lines are NOT parallel.',
            correction: 'Alternate angles are equal ONLY when the lines are strictly parallel.',
            why: 'Parallelism is a mandatory precondition for transversal angle equality.',
          },
        ],
        importantQuestions: ['Prove that the sum of the angles of a triangle is 180°.'],
        quickRevisionSummary: [
          'Linear pair sum = 180°.',
          'Parallel lines ⇔ Alternate interior angles equal.',
          'Triangle interior angle sum = 180°.',
        ],
      },
    ],
  },
  {
    id: 'c9_ch7',
    grade: 9,
    order: 4,
    name: 'Triangles',
    hindiName: 'त्रिभुज',
    description: 'Congruence criteria (SAS, ASA, AAS, SSS, RHS), properties of isosceles triangles.',
    overview: 'Study geometric congruence where figures coincide completely. Master five congruence criteria and proofs regarding angles opposite to equal sides.',
    weightageMarks: 8,
    keyFormulasCount: 2,
    totalQuestionsCount: 14,
    badge: 'Unit IV: Geometry',
    topics: [
      {
        id: 'c9_ch7_t1',
        name: 'Congruence Criteria & Isosceles Properties',
        concepts: [
          'Two figures are congruent if they have the same shape and same size.',
          'Congruence Criteria: SAS (Side-Angle-Side), ASA (Angle-Side-Angle), AAS (Angle-Angle-Side), SSS (Side-Side-Side), RHS (Right angle-Hypotenuse-Side).',
          'Angles opposite to equal sides of an isosceles triangle are equal.',
          'Sides opposite to equal angles of a triangle are equal.',
        ],
        definitions: [
          {
            term: 'CPCTC',
            definition: 'Corresponding Parts of Congruent Triangles are Congruent.',
          },
        ],
        properties: ['AAA is NOT a congruence criterion (only a similarity criterion).'],
        importantFormulas: [
          '\\triangle ABC \\cong \\triangle DEF \\implies AB=DE, BC=EF, AC=DF, \\angle A=\\angle D',
        ],
        solvedExamples: [
          {
            id: 'c9_tri_ex1',
            title: 'Isosceles Triangle Proof',
            problem: 'In △ABC, AD is the perpendicular bisector of BC. Show that △ABC is an isosceles triangle in which AB = AC.',
            solutionSteps: [
              'Step 1: In △ABD and △ACD: BD = CD (given D is midpoint of BC).',
              'Step 2: ∠ADB = ∠ADC = 90° (AD ⊥ BC).',
              'Step 3: AD = AD (Common side).',
              'Step 4: By SAS congruence criterion, △ABD ≅ △ACD.',
              'Step 5: Therefore, AB = AC (by CPCTC). Hence △ABC is isosceles.',
            ],
            finalAnswer: 'AB = AC proved by SAS and CPCTC',
          },
        ],
        applications: ['Structural stability in bridge building, roof truss engineering.'],
        commonMistakes: [
          {
            mistake: 'Using SSA or ASS as a congruence rule.',
            correction: 'SSA is not a valid congruence criterion in Euclidean geometry.',
            why: 'Two non-congruent triangles can share two sides and a non-included angle.',
          },
        ],
        importantQuestions: ['Prove that angles opposite to equal sides of an isosceles triangle are equal.'],
        quickRevisionSummary: [
          'Congruence rules: SAS, ASA, AAS, SSS, RHS.',
          'In isosceles triangle: equal sides ⇔ equal base angles.',
          'CPCTC transfers equality to all corresponding elements.',
        ],
      },
    ],
  },
  {
    id: 'c9_ch10',
    grade: 9,
    order: 5,
    name: 'Heron’s Formula',
    hindiName: 'हीरोन का सूत्र',
    description: 'Area of triangle using semi-perimeter s = (a + b + c)/2 and √[s(s-a)(s-b)(s-c)].',
    overview: 'Calculate triangle areas when all three side lengths are given without knowing the altitude.',
    weightageMarks: 4,
    keyFormulasCount: 2,
    totalQuestionsCount: 12,
    badge: 'Unit V: Mensuration',
    topics: [
      {
        id: 'c9_ch10_t1',
        name: 'Area of a Triangle by Heron’s Formula',
        concepts: [
          'Semi-perimeter s = (a + b + c) / 2.',
          'Area of triangle = √[s(s - a)(s - b)(s - c)].',
          'Area of equilateral triangle with side a: (√3 / 4) a².',
        ],
        definitions: [
          {
            term: 'Semi-Perimeter (s)',
            definition: 'Half the perimeter of a polygon; for a triangle, s = (a + b + c)/2.',
          },
        ],
        properties: ['Applies universally to scalene, isosceles, and equilateral triangles.'],
        importantFormulas: [
          's = \\frac{a + b + c}{2}',
          '\\text{Area} = \\sqrt{s(s - a)(s - b)(s - c)}',
          '\\text{Area}_{\\text{Equilateral}} = \\frac{\\sqrt{3}}{4}a^2',
        ],
        solvedExamples: [
          {
            id: 'c9_heron_ex1',
            title: 'Triangle Area with Sides 13, 14, 15',
            problem: 'Find the area of a triangle with sides 13 cm, 14 cm, and 15 cm.',
            solutionSteps: [
              'Step 1: Find semi-perimeter: s = (13 + 14 + 15)/2 = 42/2 = 21 cm.',
              'Step 2: Calculate differences: s - a = 21 - 13 = 8, s - b = 21 - 14 = 7, s - c = 21 - 15 = 6.',
              'Step 3: Area = √[21 × 8 × 7 × 6] = √[(3 × 7) × (2³ ) × 7 × (2 × 3)].',
              'Step 4: Group pairs: √(3² × 7² × 2⁴) = 3 × 7 × 2² = 21 × 4 = 84 cm².',
            ],
            finalAnswer: '84 cm²',
          },
        ],
        applications: ['Land surveying of triangular plots, sail-making.'],
        commonMistakes: [
          {
            mistake: 'Forgetting to take square root at the final step.',
            correction: 'Heron’s formula involves √. Calculate square root of product.',
            why: 's(s-a)(s-b)(s-c) has dimension of length⁴, so the square root yields length² (area).',
          },
        ],
        importantQuestions: ['The sides of a triangular field are 40 m, 24 m, and 32 m. Find its area and the cost of turfing at ₹5 per m².'],
        quickRevisionSummary: [
          's = (a + b + c) / 2.',
          'Area = √[s(s-a)(s-b)(s-c)].',
          'For equilateral triangle: (√3/4)a².',
        ],
      },
    ],
  },
];
