import { Chapter } from '../../types';

export const CLASS_10_CHAPTERS: Chapter[] = [
  {
    id: 'c10_ch1',
    grade: 10,
    order: 1,
    name: 'Real Numbers',
    hindiName: 'वास्तविक संख्याएँ',
    description: 'Fundamental Theorem of Arithmetic, irrationality proofs, prime factorisation.',
    overview: 'In Class 10, Real Numbers covers prime factorisation, HCF and LCM relationships, and rigorous proof of irrationality for √2, √3, and √5 using contradiction.',
    weightageMarks: 6,
    keyFormulasCount: 3,
    totalQuestionsCount: 15,
    badge: 'Unit I: Number Systems',
    topics: [
      {
        id: 'c10_ch1_t1',
        name: 'The Fundamental Theorem of Arithmetic',
        concepts: [
          'Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.',
          'Relation between HCF and LCM of two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b.',
          'Note that HCF(a, b, c) × LCM(a, b, c) ≠ a × b × c for three numbers.',
        ],
        definitions: [
          {
            term: 'Composite Number',
            definition: 'A positive integer greater than 1 that has at least one divisor other than 1 and itself.',
          },
          {
            term: 'Fundamental Theorem of Arithmetic',
            definition: 'Every integer n > 1 can be uniquely written as a product of prime powers: n = p₁^a₁ · p₂^a₂ ··· pₖ^aₖ.',
          },
        ],
        properties: [
          'HCF is the product of the smallest power of each common prime factor involved in the numbers.',
          'LCM is the product of the greatest power of each prime factor involved in the numbers.',
        ],
        importantFormulas: [
          '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b',
          '\\text{LCM}(a, b) = \\frac{a \\times b}{\\text{HCF}(a, b)}',
        ],
        solvedExamples: [
          {
            id: 'ex_1',
            title: 'HCF and LCM via Prime Factorisation',
            problem: 'Find the HCF and LCM of 96 and 404 by the prime factorisation method, then verify HCF × LCM = Product.',
            solutionSteps: [
              'Step 1: Write prime factors: 96 = 2⁵ × 3 and 404 = 2² × 101.',
              'Step 2: HCF(96, 404) = 2² = 4.',
              'Step 3: LCM(96, 404) = 2⁵ × 3 × 101 = 32 × 3 × 101 = 9696.',
              'Step 4: Verification: HCF × LCM = 4 × 9696 = 38784. Product = 96 × 404 = 38784. Verified!',
            ],
            finalAnswer: 'HCF = 4, LCM = 9696',
            whyThisStep: 'Always identify the common prime factors first with lowest exponent for HCF, and highest exponent for LCM.',
            examTip: 'CBSE marks 1 mark for prime factorization, 1 mark for HCF/LCM, and 1 mark for the verification step.',
          },
        ],
        applications: [
          'Finding traffic light synchronisation cycles or minimum track laps using LCM.',
          'Dividing items into equal packets without leftovers using HCF.',
        ],
        commonMistakes: [
          {
            mistake: 'Applying HCF(a, b, c) × LCM(a, b, c) = a × b × c for three numbers.',
            correction: 'This formula holds strictly for two positive integers only.',
            why: 'Prime factor distributions over three numbers lead to multiple overlapping terms.',
          },
        ],
        importantQuestions: [
          'Explain why 7 × 11 × 13 + 13 is a composite number.',
          'Check whether 6ⁿ can end with the digit 0 for any natural number n.',
        ],
        quickRevisionSummary: [
          'Fundamental Theorem guarantees unique prime factorisation.',
          'HCF(a, b) × LCM(a, b) = a × b.',
          '6ⁿ cannot end in 0 because its prime factors contain only 2 and 3, not 5.',
        ],
      },
      {
        id: 'c10_ch1_t2',
        name: 'Revisiting Irrational Numbers',
        concepts: [
          'A number s is called irrational if it cannot be written in the form p/q, where p and q are integers and q ≠ 0.',
          'Theorem: Let p be a prime number. If p divides a², then p divides a, where a is a positive integer.',
          'Method of Contradiction: We assume √p is rational, express as coprime a/b, and arrive at a contradiction.',
        ],
        definitions: [
          {
            term: 'Irrational Number',
            definition: 'A real number whose decimal expansion is non-terminating and non-recurring.',
          },
          {
            term: 'Coprime Integers',
            definition: 'Two integers a and b are coprime if their highest common factor (HCF) is 1.',
          },
        ],
        properties: [
          'The sum or difference of a rational and an irrational number is irrational.',
          'The product and quotient of a non-zero rational and an irrational number is irrational.',
        ],
        importantFormulas: [
          '\\sqrt{p} \\notin \\mathbb{Q} \\quad \\text{for any prime } p',
        ],
        solvedExamples: [
          {
            id: 'ex_2',
            title: 'Proof that √5 is Irrational',
            problem: 'Prove that √5 is an irrational number.',
            solutionSteps: [
              'Step 1: Assume to the contrary that √5 is rational. Then √5 = a/b, where a and b are coprime integers and b ≠ 0.',
              'Step 2: Squaring both sides: 5 = a²/b² ⇒ 5b² = a². Hence, 5 divides a².',
              'Step 3: By theorem, if 5 divides a², then 5 divides a. So let a = 5c for some integer c.',
              'Step 4: Substituting a: 5b² = (5c)² = 25c² ⇒ b² = 5c². Thus, 5 divides b², which implies 5 divides b.',
              'Step 5: Therefore, 5 is a common factor of both a and b. This contradicts our assumption that a and b are coprime.',
              'Step 6: Hence, our assumption was false; √5 is irrational.',
            ],
            finalAnswer: 'Proved √5 is irrational by contradiction',
            examTip: 'Writing "where a and b are coprime integers" is mandatory for full marks in CBSE Board exams.',
          },
        ],
        applications: [
          'Diagonal of a unit square (√2) and golden ratio in architecture.',
        ],
        commonMistakes: [
          {
            mistake: 'Forgetting to state that a and b are coprime.',
            correction: 'Always explicitly declare HCF(a, b) = 1 at the start.',
            why: 'The entire proof hinges on creating a contradiction with the coprimality assumption.',
          },
        ],
        importantQuestions: [
          'Prove that 3 + 2√5 is irrational, given that √5 is irrational.',
          'Prove that 1/√2 is irrational.',
        ],
        quickRevisionSummary: [
          'Theorem: if prime p | a², then p | a.',
          'Proof by contradiction establishes √2, √3, √5 are irrational.',
          'Rational ± Irrational = Irrational; Non-zero Rational × Irrational = Irrational.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch2',
    grade: 10,
    order: 2,
    name: 'Polynomials',
    hindiName: 'बहुपद',
    description: 'Geometrical meaning of zeroes, relationship between zeroes and coefficients of quadratic polynomials.',
    overview: 'Covers linear, quadratic, and cubic polynomials, graph intersections with the x-axis, and relations: sum of zeroes α+β = -b/a and product αβ = c/a.',
    weightageMarks: 4,
    keyFormulasCount: 3,
    totalQuestionsCount: 14,
    badge: 'Unit II: Algebra',
    topics: [
      {
        id: 'c10_ch2_t1',
        name: 'Zeroes and Coefficients of a Quadratic Polynomial',
        concepts: [
          'A quadratic polynomial p(x) = ax² + bx + c (a ≠ 0) has at most 2 zeroes, α and β.',
          'Sum of zeroes: α + β = -b/a = -(coefficient of x)/(coefficient of x²).',
          'Product of zeroes: αβ = c/a = (constant term)/(coefficient of x²).',
          'A quadratic polynomial with zeroes α and β is given by k[x² - (α + β)x + αβ].',
        ],
        definitions: [
          {
            term: 'Zero of a Polynomial',
            definition: 'A real number k is a zero of polynomial p(x) if p(k) = 0.',
          },
        ],
        properties: [
          'Geometrically, the zeroes of p(x) are the x-coordinates of the points where the graph y = p(x) intersects the x-axis.',
          'The graph of y = ax² + bx + c is a parabola opening upwards if a > 0, and downwards if a < 0.',
        ],
        importantFormulas: [
          '\\alpha + \\beta = -\\frac{b}{a}',
          '\\alpha \\beta = \\frac{c}{a}',
          'p(x) = k[x^2 - (\\alpha + \\beta)x + \\alpha \\beta]',
        ],
        solvedExamples: [
          {
            id: 'poly_ex1',
            title: 'Find zeroes and verify relationship',
            problem: 'Find the zeroes of the quadratic polynomial x² + 7x + 10, and verify the relationship between zeroes and coefficients.',
            solutionSteps: [
              'Step 1: Factorise x² + 7x + 10 = x² + 5x + 2x + 10 = (x + 2)(x + 5).',
              'Step 2: Zeroes are given by (x + 2)(x + 5) = 0 ⇒ α = -2, β = -5.',
              'Step 3: Sum of zeroes = (-2) + (-5) = -7. From formula: -b/a = -7/1 = -7. Verified!',
              'Step 4: Product of zeroes = (-2)(-5) = 10. From formula: c/a = 10/1 = 10. Verified!',
            ],
            finalAnswer: 'Zeroes are -2 and -5',
          },
        ],
        applications: [
          'Trajectory of a basketball or cricket ball in flight.',
          'Architectural parabolic arch bridges.',
        ],
        commonMistakes: [
          {
            mistake: 'Writing α + β = b/a instead of -b/a.',
            correction: 'Remember the negative sign: α + β = -b/a.',
            why: 'Expanding k(x - α)(x - β) = k[x² - (α+β)x + αβ] yields -k(α+β) for the x coefficient.',
          },
        ],
        importantQuestions: [
          'Find a quadratic polynomial whose sum and product of zeroes are -1/4 and 1/4 respectively.',
          'If α and β are zeroes of x² - 6x + a, find the value of a if 3α + 2β = 20.',
        ],
        quickRevisionSummary: [
          'Number of zeroes = number of intersections with the x-axis.',
          'Sum: α + β = -b/a, Product: αβ = c/a.',
          'Quadratic formula: x² - (Sum)x + Product.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch3',
    grade: 10,
    order: 3,
    name: 'Pair of Linear Equations in Two Variables',
    hindiName: 'दो चर वाले रैखिक समीकरण युग्म',
    description: 'Graphical method, algebraic methods (Substitution and Elimination), consistency conditions.',
    overview: 'Study systems of two linear equations: a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0. Learn consistency criteria via coefficient ratios and solve real-world problems.',
    weightageMarks: 6,
    keyFormulasCount: 3,
    totalQuestionsCount: 16,
    badge: 'Unit II: Algebra',
    topics: [
      {
        id: 'c10_ch3_t1',
        name: 'Consistency & Algebraic Solution Methods',
        concepts: [
          'Unique solution (Intersecting lines): a₁/a₂ ≠ b₁/b₂.',
          'Infinitely many solutions (Coincident lines): a₁/a₂ = b₁/b₂ = c₁/c₂.',
          'No solution (Parallel lines / Inconsistent): a₁/a₂ = b₁/b₂ ≠ c₁/c₂.',
          'Substitution method and Elimination method.',
        ],
        definitions: [
          {
            term: 'Consistent System',
            definition: 'A pair of linear equations having at least one solution.',
          },
        ],
        properties: [
          'Lines intersecting at exactly one point produce a unique solution (x, y).',
          'Parallel lines never meet, giving zero common points.',
        ],
        importantFormulas: [
          '\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2} \\implies \\text{Unique solution}',
          '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\implies \\text{Infinitely many}',
          '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2} \\implies \\text{No solution (Inconsistent)}',
        ],
        solvedExamples: [
          {
            id: 'lineq_ex1',
            title: 'Elimination Method',
            problem: 'Solve by elimination: 2x + 3y = 11 and 2x - 4y = -24.',
            solutionSteps: [
              'Step 1: Subtract equation (2) from equation (1): (2x + 3y) - (2x - 4y) = 11 - (-24).',
              'Step 2: 7y = 35 ⇒ y = 5.',
              'Step 3: Substitute y = 5 in eq (1): 2x + 3(5) = 11 ⇒ 2x = 11 - 15 = -4 ⇒ x = -2.',
            ],
            finalAnswer: 'x = -2, y = 5',
          },
        ],
        applications: ['Age problems, speed/distance/time, upstream/downstream boat problems.'],
        commonMistakes: [
          {
            mistake: 'Mixing up constant sides when comparing c₁/c₂.',
            correction: 'Ensure both equations are in standard form a₁x + b₁y + c₁ = 0 or a₁x + b₁y = -c₁.',
            why: 'A sign flip on one side invalidates ratio comparisons.',
          },
        ],
        importantQuestions: [
          'For what value of k will the equations have infinitely many solutions: 2x + 3y = 7 and (k-1)x + (k+2)y = 3k?',
        ],
        quickRevisionSummary: [
          'Intersecting lines: a₁/a₂ ≠ b₁/b₂.',
          'Parallel lines: a₁/a₂ = b₁/b₂ ≠ c₁/c₂.',
          'Coincident lines: a₁/a₂ = b₁/b₂ = c₁/c₂.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch4',
    grade: 10,
    order: 4,
    name: 'Quadratic Equations',
    hindiName: 'द्विघात समीकरण',
    description: 'Standard form ax² + bx + c = 0, factorisation, quadratic formula, discriminant and nature of roots.',
    overview: 'Master standard quadratic equations, derivation and use of Sridharacharya’s quadratic formula, and analysing nature of roots via Discriminant D = b² - 4ac.',
    weightageMarks: 6,
    keyFormulasCount: 3,
    totalQuestionsCount: 16,
    badge: 'Unit II: Algebra',
    topics: [
      {
        id: 'c10_ch4_t1',
        name: 'Quadratic Formula & Nature of Roots',
        concepts: [
          'Standard form: ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0.',
          'Discriminant D = b² - 4ac.',
          'If D > 0: Two distinct real roots: x = (-b ± √D) / 2a.',
          'If D = 0: Two equal real roots: x = -b / 2a.',
          'If D < 0: No real roots.',
        ],
        definitions: [
          {
            term: 'Discriminant',
            definition: 'The expression D = b² - 4ac that determines the nature of the roots of a quadratic equation.',
          },
        ],
        properties: [
          'When D is a perfect square and coefficients are rational, roots are rational.',
          'Equal roots condition D = 0 is a favorite in CBSE board questions to find unknown parameter k.',
        ],
        importantFormulas: [
          'D = b^2 - 4ac',
          'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        ],
        solvedExamples: [
          {
            id: 'quad_ex1',
            title: 'Condition for Equal Roots',
            problem: 'Find the values of k for which 2x² + kx + 3 = 0 has two equal roots.',
            solutionSteps: [
              'Step 1: Compare with ax² + bx + c = 0: a = 2, b = k, c = 3.',
              'Step 2: For equal roots, Discriminant D = 0 ⇒ b² - 4ac = 0.',
              'Step 3: k² - 4(2)(3) = 0 ⇒ k² - 24 = 0 ⇒ k² = 24.',
              'Step 4: k = ±√24 = ±2√6.',
            ],
            finalAnswer: 'k = ±2√6',
            examTip: 'Never forget the ± sign when taking square roots!',
          },
        ],
        applications: ['Optimizing dimensions of rectangular parks, speed calculations in rail/air travel.'],
        commonMistakes: [
          {
            mistake: 'Writing only the positive root, e.g. k = +2√6.',
            correction: 'A square root equation k² = 24 has two solutions: k = ±2√6.',
            why: 'Both (+2√6)² and (-2√6)² yield 24.',
          },
        ],
        importantQuestions: [
          'A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream. Find the speed of the stream.',
        ],
        quickRevisionSummary: [
          'D = b² - 4ac decides root existence and multiplicity.',
          'D > 0: two distinct real roots.',
          'D = 0: two equal real roots.',
          'D < 0: no real roots.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch5',
    grade: 10,
    order: 5,
    name: 'Arithmetic Progressions',
    hindiName: 'समान्तर श्रेढ़ी',
    description: 'nth term of an AP, sum of first n terms, real-life situational applications.',
    overview: 'An AP is a sequence where each term is obtained by adding a fixed common difference d to the preceding term. Master formulas an = a + (n-1)d and Sn = n/2 [2a + (n-1)d].',
    weightageMarks: 6,
    keyFormulasCount: 3,
    totalQuestionsCount: 15,
    badge: 'Unit II: Algebra',
    topics: [
      {
        id: 'c10_ch5_t1',
        name: 'nth Term and Sum of First n Terms',
        concepts: [
          'General AP: a, a+d, a+2d, ..., where a is the first term and d is the common difference.',
          'nth term: an = a + (n - 1)d.',
          'Sum of first n terms: Sn = (n/2)[2a + (n - 1)d] = (n/2)[a + l], where l is the last term.',
          'Relation between Sn and an: an = Sn - Sn-1.',
        ],
        definitions: [
          {
            term: 'Common Difference (d)',
            definition: 'The difference between any term and its preceding term: d = aₖ₊₁ - aₖ.',
          },
        ],
        properties: [
          'If a, b, c are in AP, then 2b = a + c (b is the arithmetic mean of a and c).',
          'Common difference d can be positive, negative, or zero.',
        ],
        importantFormulas: [
          'a_n = a + (n - 1)d',
          'S_n = \\frac{n}{2}[2a + (n - 1)d]',
          'S_n = \\frac{n}{2}[a + l]',
          'a_n = S_n - S_{n-1}',
        ],
        solvedExamples: [
          {
            id: 'ap_ex1',
            title: 'Finding number of terms from Sum',
            problem: 'How many terms of the AP: 9, 17, 25, ... must be taken to give a sum of 636?',
            solutionSteps: [
              'Step 1: First term a = 9, common difference d = 17 - 9 = 8, Sn = 636.',
              'Step 2: Sn = (n/2)[2(9) + (n - 1)(8)] = (n/2)[18 + 8n - 8] = (n/2)[8n + 10] = n(4n + 5).',
              'Step 3: 4n² + 5n - 636 = 0.',
              'Step 4: Factorise: 4n² + 53n - 48n - 636 = 0 ⇒ n(4n + 53) - 12(4n + 53) = 0.',
              'Step 5: (4n + 53)(n - 12) = 0. Since n must be a positive integer, n = 12.',
            ],
            finalAnswer: 'n = 12 terms',
          },
        ],
        applications: ['Loan repayment installments, stack layouts, production rate increases.'],
        commonMistakes: [
          {
            mistake: 'Accepting negative or fractional values for n.',
            correction: 'n represents the number of terms and must strictly be a positive integer (natural number).',
            why: 'You cannot have a -5th or 2.5th term in a sequence.',
          },
        ],
        importantQuestions: [
          'If the sum of first 7 terms of an AP is 49 and that of 17 terms is 289, find the sum of first n terms.',
        ],
        quickRevisionSummary: [
          'an = a + (n-1)d.',
          'Sn = (n/2)(first + last) = (n/2)[2a + (n-1)d].',
          'an = Sn - Sn-1.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch6',
    grade: 10,
    order: 6,
    name: 'Triangles',
    hindiName: 'त्रिभुज',
    description: 'Basic Proportionality Theorem (Thales Theorem) and similarity criteria (AAA, SSS, SAS).',
    overview: 'Explore geometric similarity where figures have the same shape but not necessarily the same size. Master the proof and applications of Basic Proportionality Theorem (BPT).',
    weightageMarks: 8,
    keyFormulasCount: 2,
    totalQuestionsCount: 14,
    badge: 'Unit IV: Geometry',
    topics: [
      {
        id: 'c10_ch6_t1',
        name: 'Basic Proportionality Theorem & Similarity Criteria',
        concepts: [
          'Basic Proportionality Theorem (BPT / Thales Theorem): If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.',
          'Converse of BPT: If a line divides any two sides of a triangle in the same ratio, then the line is parallel to the third side.',
          'Criteria for similarity of triangles: AAA (or AA), SSS, and SAS.',
        ],
        definitions: [
          {
            term: 'Similar Triangles (∼)',
            definition: 'Two triangles are similar if their corresponding angles are equal and their corresponding sides are in the same ratio (proportional).',
          },
        ],
        properties: [
          'If two angles of one triangle are respectively equal to two angles of another, the triangles are similar (AA similarity).',
        ],
        importantFormulas: [
          '\\text{In } \\triangle ABC, \\text{ if } DE \\parallel BC \\implies \\frac{AD}{DB} = \\frac{AE}{EC}',
          '\\triangle ABC \\sim \\triangle DEF \\implies \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF}',
        ],
        solvedExamples: [
          {
            id: 'tri_ex1',
            title: 'Applying BPT',
            problem: 'In △ABC, DE ∥ BC. If AD = 1.5 cm, DB = 3 cm, AE = 1 cm, find EC.',
            solutionSteps: [
              'Step 1: Since DE ∥ BC, by Basic Proportionality Theorem: AD/DB = AE/EC.',
              'Step 2: Substitute given values: 1.5 / 3 = 1 / EC.',
              'Step 3: 1/2 = 1 / EC ⇒ EC = 2 cm.',
            ],
            finalAnswer: 'EC = 2 cm',
          },
        ],
        applications: ['Indirect measurement of tree or building heights using shadow similarity.'],
        commonMistakes: [
          {
            mistake: 'Assuming congruence rules (like RHS) directly imply equality of sides for similar triangles.',
            correction: 'Similar triangles have proportional sides, not necessarily equal sides.',
            why: 'Scale factor k may be different from 1.',
          },
        ],
        importantQuestions: [
          'State and prove Basic Proportionality Theorem.',
          'A vertical pole of length 6 m casts a shadow 4 m long on the ground and at the same time a tower casts a shadow 28 m long. Find the height of the tower.',
        ],
        quickRevisionSummary: [
          'BPT: Line parallel to base divides remaining sides proportionally.',
          'AA similarity is sufficient to prove two triangles similar.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch7',
    grade: 10,
    order: 7,
    name: 'Coordinate Geometry',
    hindiName: 'निर्देशांक ज्यामिति',
    description: 'Distance formula, section formula (internal division), midpoint formula.',
    overview: 'Bridge algebra and geometry using Cartesian coordinates. Calculate distance between points in a plane, find internal division points, and identify collinearity or geometric types.',
    weightageMarks: 6,
    keyFormulasCount: 3,
    totalQuestionsCount: 14,
    badge: 'Unit III: Coordinate Geometry',
    topics: [
      {
        id: 'c10_ch7_t1',
        name: 'Distance and Section Formulas',
        concepts: [
          'Distance between P(x₁, y₁) and Q(x₂, y₂): d = √[(x₂ - x₁)² + (y₂ - y₁)²].',
          'Distance of a point P(x, y) from origin (0, 0): OP = √(x² + y²).',
          'Section Formula: Coordinates of point P(x, y) dividing line segment AB internally in ratio m₁:m₂ are: x = (m₁x₂ + m₂x₁) / (m₁ + m₂), y = (m₁y₂ + m₂y₁) / (m₁ + m₂).',
          'Midpoint of AB: ((x₁ + x₂)/2, (y₁ + y₂)/2).',
        ],
        definitions: [
          {
            term: 'Collinear Points',
            definition: 'Three or more points that lie on the same straight line.',
          },
        ],
        properties: [
          'Points A, B, C are collinear if AB + BC = AC (where AC is the longest segment).',
          'To show a quadrilateral is a parallelogram, show its diagonals bisect each other using the midpoint formula.',
        ],
        importantFormulas: [
          'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
          'P(x, y) = \\left( \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2} \\right)',
          'M(x, y) = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)',
        ],
        solvedExamples: [
          {
            id: 'coord_ex1',
            title: 'Section Formula Ratio Finding',
            problem: 'Find the ratio in which the y-axis divides the line segment joining points (5, -6) and (-1, -4). Also find the point of intersection.',
            solutionSteps: [
              'Step 1: Let the ratio be k:1. Any point on the y-axis has x-coordinate = 0.',
              'Step 2: By section formula, x = [k(-1) + 1(5)] / (k + 1) = (-k + 5)/(k + 1).',
              'Step 3: Set x = 0 ⇒ (-k + 5)/(k + 1) = 0 ⇒ -k + 5 = 0 ⇒ k = 5. So ratio is 5:1.',
              'Step 4: Find y-coordinate: y = [5(-4) + 1(-6)] / (5 + 1) = (-20 - 6)/6 = -26/6 = -13/3.',
            ],
            finalAnswer: 'Ratio = 5:1, Point of intersection = (0, -13/3)',
          },
        ],
        applications: ['GPS navigation route mapping, computer graphics object placement.'],
        commonMistakes: [
          {
            mistake: 'Cross-multiplying m₁ with x₁ instead of x₂.',
            correction: 'Remember m₁ pairs with the opposite endpoint (x₂, y₂), while m₂ pairs with (x₁, y₁).',
            why: 'Standard internal division formula weights towards the opposite side.',
          },
        ],
        importantQuestions: [
          'Find a relation between x and y such that the point (x, y) is equidistant from the points (3, 6) and (-3, 4).',
        ],
        quickRevisionSummary: [
          'Distance formula: d = √[(Δx)² + (Δy)²].',
          'Section formula: (m₁x₂ + m₂x₁)/(m₁+m₂).',
          'Points on x-axis have y=0; points on y-axis have x=0.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch8',
    grade: 10,
    order: 8,
    name: 'Introduction to Trigonometry',
    hindiName: 'त्रिकोणमिति का परिचय',
    description: 'Trigonometric ratios (sin, cos, tan, cosec, sec, cot), values at 0°, 30°, 45°, 60°, 90°, and fundamental identity sin²θ + cos²θ = 1.',
    overview: 'Study relationships between side lengths and acute angles of right triangles. Master table of specific angle values and trigonometric identity proofs.',
    weightageMarks: 8,
    keyFormulasCount: 4,
    totalQuestionsCount: 18,
    badge: 'Unit V: Trigonometry',
    topics: [
      {
        id: 'c10_ch8_t1',
        name: 'Trigonometric Ratios and Fundamental Identities',
        concepts: [
          'In a right triangle: sin θ = Perpendicular/Hypotenuse, cos θ = Base/Hypotenuse, tan θ = Perpendicular/Base.',
          'Reciprocal ratios: cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ.',
          'Standard angles table (0°, 30°, 45°, 60°, 90°).',
          'Trigonometric Identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ.',
        ],
        definitions: [
          {
            term: 'Trigonometry',
            definition: 'Branch of mathematics that studies relationships between sides and angles of triangles.',
          },
        ],
        properties: [
          'The value of sin θ or cos θ never exceeds 1 (since hypotenuse is the longest side).',
          'tan θ = sin θ / cos θ and cot θ = cos θ / sin θ.',
        ],
        importantFormulas: [
          '\\sin^2\\theta + \\cos^2\\theta = 1',
          '1 + \\tan^2\\theta = \\sec^2\\theta',
          '1 + \\cot^2\\theta = \\text{cosec}^2\\theta',
        ],
        solvedExamples: [
          {
            id: 'trig_ex1',
            title: 'Proving an Identity',
            problem: 'Prove that (sin θ - 2 sin³θ) / (2 cos³θ - cos θ) = tan θ.',
            solutionSteps: [
              'Step 1: Factor numerator and denominator: LHS = [sin θ (1 - 2 sin²θ)] / [cos θ (2 cos²θ - 1)].',
              'Step 2: Express 1 as sin²θ + cos²θ in numerator: 1 - 2 sin²θ = (sin²θ + cos²θ) - 2 sin²θ = cos²θ - sin²θ.',
              'Step 3: Express 1 in denominator: 2 cos²θ - (sin²θ + cos²θ) = cos²θ - sin²θ.',
              'Step 4: Substitute back: LHS = [sin θ (cos²θ - sin²θ)] / [cos θ (cos²θ - sin²θ)] = sin θ / cos θ = tan θ = RHS. Proved!',
            ],
            finalAnswer: 'LHS = RHS = tan θ',
          },
        ],
        applications: ['Radar systems, aviation descent angles, sound wave modeling.'],
        commonMistakes: [
          {
            mistake: 'Writing sin(A + B) = sin A + sin B.',
            correction: 'Trigonometric functions do not obey the algebraic distributive law.',
            why: 'sin is a ratio operator, not a multiplier.',
          },
        ],
        importantQuestions: [
          'Prove that (cosec θ - cot θ)² = (1 - cos θ)/(1 + cos θ).',
          'Evaluate: (5 cos² 60° + 4 sec² 30° - tan² 45°) / (sin² 30° + cos² 30°).',
        ],
        quickRevisionSummary: [
          'sin²θ + cos²θ = 1.',
          'sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1.',
          'sin and cos values always lie between 0 and 1 for acute angles.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch9',
    grade: 10,
    order: 9,
    name: 'Some Applications of Trigonometry',
    hindiName: 'त्रिकोणमिति के कुछ अनुप्रयोग',
    description: 'Heights and Distances, Angle of Elevation, Angle of Depression, multi-step word problems.',
    overview: 'Apply trigonometric ratios to compute inaccessible heights and distances using line-of-sight angles of elevation and depression.',
    weightageMarks: 4,
    keyFormulasCount: 2,
    totalQuestionsCount: 12,
    badge: 'Unit V: Trigonometry',
    topics: [
      {
        id: 'c10_ch9_t1',
        name: 'Heights and Distances',
        concepts: [
          'Line of sight: The line drawn from the eye of an observer to the point in the object viewed.',
          'Angle of elevation: The angle formed by the line of sight with the horizontal when the point being viewed is above the horizontal level.',
          'Angle of depression: The angle formed when the point viewed is below the horizontal level.',
        ],
        definitions: [
          {
            term: 'Angle of Elevation',
            definition: 'Angle between horizontal plane and observer line-of-sight pointing upward.',
          },
          {
            term: 'Angle of Depression',
            definition: 'Angle between horizontal plane and observer line-of-sight pointing downward.',
          },
        ],
        properties: [
          'The angle of depression of point B from top of tower A is equal to the angle of elevation of point A from point B (alternate interior angles).',
        ],
        importantFormulas: [
          '\\tan \\theta = \\frac{\\text{Height (Perpendicular)}}{\\text{Distance (Base)}}',
        ],
        solvedExamples: [
          {
            id: 'height_ex1',
            title: 'Tower Height from Two Angles',
            problem: 'A tower stands vertically on the ground. From a point on the ground, which is 15 m away from the foot of the tower, the angle of elevation of the top of the tower is found to be 60°. Find the height of the tower.',
            solutionSteps: [
              'Step 1: Let AB be the tower of height h, and C be the observation point at distance BC = 15 m.',
              'Step 2: In right △ABC, tan 60° = AB / BC = h / 15.',
              'Step 3: Since tan 60° = √3, we have √3 = h / 15 ⇒ h = 15√3 m.',
            ],
            finalAnswer: 'Height = 15√3 m (approx 25.98 m)',
          },
        ],
        applications: ['Measuring widths of rivers, satellite dish orientations, airplane altitudes.'],
        commonMistakes: [
          {
            mistake: 'Drawing the angle of depression with the vertical wall instead of the horizontal line.',
            correction: 'Angle of depression is ALWAYS measured between the line of sight and the HORIZONTAL.',
            why: 'By definition, elevation and depression angles refer to the horizontal baseline.',
          },
        ],
        importantQuestions: [
          'The shadow of a tower standing on a level ground is found to be 40 m longer when the Sun’s altitude is 30° than when it is 60°. Find the height of the tower.',
        ],
        quickRevisionSummary: [
          'Always draw a neat labeled diagram first.',
          'Elevation = Depression due to alternate interior angles.',
          'Use tan θ = h / d in most 2-triangle problems.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch10',
    grade: 10,
    order: 10,
    name: 'Circles',
    hindiName: 'वृत्त',
    description: 'Tangents to a circle, radius-tangent perpendicularity theorem, tangents from an external point theorem.',
    overview: 'Explore tangents to a circle: Theorem 10.1 (radius is perpendicular to tangent at point of contact) and Theorem 10.2 (lengths of tangents drawn from an external point to a circle are equal).',
    weightageMarks: 6,
    keyFormulasCount: 2,
    totalQuestionsCount: 14,
    badge: 'Unit IV: Geometry',
    topics: [
      {
        id: 'c10_ch10_t1',
        name: 'Tangents and Tangent Theorems',
        concepts: [
          'A tangent to a circle is a line that intersects the circle at only one point.',
          'Theorem 10.1: The tangent at any point of a circle is perpendicular to the radius through the point of contact.',
          'Theorem 10.2: The lengths of tangents drawn from an external point to a circle are equal (PA = PB).',
          'Tangents from an external point subtend equal angles at the centre.',
        ],
        definitions: [
          {
            term: 'Point of Contact',
            definition: 'The common single point where a tangent touches the circle.',
          },
        ],
        properties: [
          'There is no tangent to a circle passing through a point lying inside the circle.',
          'There are exactly two tangents from a point lying outside the circle.',
        ],
        importantFormulas: [
          'PA = PB \\quad (\\text{lengths of tangents from external point } P)',
          'OP \\perp AB \\quad (\\text{line joining external point and centre bisects chord of contact})',
        ],
        solvedExamples: [
          {
            id: 'circ_ex1',
            title: 'Angle between Tangents',
            problem: 'If tangents PA and PB from a point P to a circle with centre O are inclined to each other at an angle of 80°, then find ∠POA.',
            solutionSteps: [
              'Step 1: OA ⊥ PA and OB ⊥ PB ⇒ ∠OAP = 90° and ∠OBP = 90°.',
              'Step 2: In quadrilateral OAPB, sum of angles is 360° ⇒ ∠AOB + 80° + 90° + 90° = 360° ⇒ ∠AOB = 100°.',
              'Step 3: Line OP bisects ∠AOB ⇒ ∠POA = ∠AOB / 2 = 100° / 2 = 50°.',
            ],
            finalAnswer: '∠POA = 50°',
          },
        ],
        applications: ['Gear transmission systems, wheels rolling on pavement, pulley systems.'],
        commonMistakes: [
          {
            mistake: 'Assuming a tangent can cross the circle at two points.',
            correction: 'A line intersecting at two points is a secant, not a tangent.',
            why: 'A tangent has exactly one point of contact with the circumference.',
          },
        ],
        importantQuestions: [
          'Prove that the lengths of tangents drawn from an external point to a circle are equal.',
          'A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.',
        ],
        quickRevisionSummary: [
          'Radius ⊥ Tangent at point of contact.',
          'Tangents from external point are equal in length (PA = PB).',
          'Opposite sides of circumscribing quadrilateral have equal sums.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch11',
    grade: 10,
    order: 11,
    name: 'Areas Related to Circles',
    hindiName: 'वृत्तों से संबंधित क्षेत्रफल',
    description: 'Area of sector and segment of a circle, arc length calculations, clock and pendulum problems.',
    overview: 'Calculate areas of plane figures combining circles, sectors, segments, and polygons with sector formula (θ/360°) × πr² and segment area = area of sector - area of corresponding triangle.',
    weightageMarks: 4,
    keyFormulasCount: 3,
    totalQuestionsCount: 14,
    badge: 'Unit VI: Mensuration',
    topics: [
      {
        id: 'c10_ch11_t1',
        name: 'Sector and Segment Areas',
        concepts: [
          'Length of an arc of a sector of angle θ: l = (θ/360°) × 2πr.',
          'Area of a sector of angle θ: Area = (θ/360°) × πr².',
          'Area of minor segment = Area of sector - Area of triangle formed by radii and chord.',
          'Area of major sector = πr² - Area of minor sector.',
        ],
        definitions: [
          {
            term: 'Sector of a Circle',
            definition: 'The portion of the circular region enclosed by two radii and the corresponding arc.',
          },
          {
            term: 'Segment of a Circle',
            definition: 'The portion of the circular region enclosed between a chord and the corresponding arc.',
          },
        ],
        properties: [
          'Area of triangle formed by radii r at central angle θ is (1/2)r² sin θ.',
        ],
        importantFormulas: [
          '\\text{Arc Length } l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r',
          '\\text{Area of Sector} = \\frac{\\theta}{360^\\circ} \\times \\pi r^2',
          '\\text{Area of Segment} = \\frac{\\theta}{360^\\circ} \\times \\pi r^2 - \\frac{1}{2}r^2 \\sin\\theta',
        ],
        solvedExamples: [
          {
            id: 'area_circ_ex1',
            title: 'Area swept by Minute Hand',
            problem: 'The length of the minute hand of a clock is 14 cm. Find the area swept by the minute hand in 5 minutes.',
            solutionSteps: [
              'Step 1: In 60 minutes, minute hand rotates 360°. In 5 minutes, angle θ = (360°/60) × 5 = 30°.',
              'Step 2: Radius r = 14 cm.',
              'Step 3: Area swept = (θ/360°) × πr² = (30/360) × (22/7) × 14 × 14 = (1/12) × 22 × 2 × 14 = (1/12) × 616 = 154/3 cm².',
            ],
            finalAnswer: '154/3 cm² (approx 51.33 cm²)',
          },
        ],
        applications: ['Wiper blade sweep areas on car windshields, circular lawn sprinkler coverage.'],
        commonMistakes: [
          {
            mistake: 'Using diameter instead of radius in πr².',
            correction: 'Always divide diameter by 2 first to obtain radius r.',
            why: 'r² is quarter of d².',
          },
        ],
        importantQuestions: [
          'A chord of a circle of radius 12 cm subtends an angle of 120° at the centre. Find the area of the corresponding segment of the circle. (Use π = 3.14 and √3 = 1.73)',
        ],
        quickRevisionSummary: [
          'Sector Area = (θ/360°) × πr².',
          'Arc Length = (θ/360°) × 2πr.',
          'Segment Area = Sector Area - Triangle Area.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch12',
    grade: 10,
    order: 12,
    name: 'Surface Areas and Volumes',
    hindiName: 'पृष्ठीय क्षेत्रफल और आयतन',
    description: 'Surface areas and volumes of combinations of solids (cubes, cuboids, spheres, hemispheres, cones, cylinders).',
    overview: 'Solve problems involving composite solids created by joining cylinders, cones, and hemispheres. Note: Frustum of cone is deleted from the 2026-27 syllabus.',
    weightageMarks: 6,
    keyFormulasCount: 4,
    totalQuestionsCount: 14,
    badge: 'Unit VI: Mensuration',
    topics: [
      {
        id: 'c10_ch12_t1',
        name: 'Combinations of Solids',
        concepts: [
          'Total surface area of a combined solid is the sum of the exposed surface areas of its parts (not the sum of total surface areas, because contacting faces become internal).',
          'Total volume of a combined solid is simply the algebraic sum of the individual component volumes.',
        ],
        definitions: [
          {
            term: 'Composite Solid',
            definition: 'A 3-dimensional solid created by joining two or more basic geometric solids together.',
          },
        ],
        properties: [
          'When an object is melted and recast into another shape, its total volume remains invariant (unchanged).',
        ],
        importantFormulas: [
          '\\text{Cylinder Volume} = \\pi r^2 h, \\quad \\text{CSA} = 2\\pi r h',
          '\\text{Cone Volume} = \\frac{1}{3}\\pi r^2 h, \\quad \\text{CSA} = \\pi r l \\quad (l = \\sqrt{r^2 + h^2})',
          '\\text{Hemisphere Volume} = \\frac{2}{3}\\pi r^3, \\quad \\text{CSA} = 2\\pi r^2, \\quad \\text{TSA} = 3\\pi r^2',
          '\\text{Sphere Volume} = \\frac{4}{3}\\pi r^3, \\quad \\text{Surface Area} = 4\\pi r^2',
        ],
        solvedExamples: [
          {
            id: 'solids_ex1',
            title: 'Toy made of Cone and Hemisphere',
            problem: 'A toy is in the form of a cone of radius 3.5 cm mounted on a hemisphere of same radius. The total height of the toy is 15.5 cm. Find the total surface area of the toy.',
            solutionSteps: [
              'Step 1: Radius r = 3.5 cm. Total height = 15.5 cm. Height of cone h = 15.5 - 3.5 = 12 cm.',
              'Step 2: Slant height of cone l = √(r² + h²) = √(3.5² + 12²) = √(12.25 + 144) = √156.25 = 12.5 cm.',
              'Step 3: Total Surface Area = Curved Surface Area of Cone + Curved Surface Area of Hemisphere = πrl + 2πr² = πr(l + 2r).',
              'Step 4: TSA = (22/7) × 3.5 × (12.5 + 2 × 3.5) = 11 × (12.5 + 7) = 11 × 19.5 = 214.5 cm².',
            ],
            finalAnswer: 'Total Surface Area = 214.5 cm²',
          },
        ],
        applications: ['Storage silos, medicine capsules, circus tents, ice cream cones.'],
        commonMistakes: [
          {
            mistake: 'Adding total surface areas of the individual components.',
            correction: 'Only exposed curved faces count; internal touching circular bases must NOT be added.',
            why: 'Once joined, the interface base is enclosed inside the solid.',
          },
        ],
        importantQuestions: [
          'A solid toy is in the form of a hemisphere surmounted by a right circular cone. If the volume of the toy is 216π cm³, find the dimensions.',
        ],
        quickRevisionSummary: [
          'Volume is always additive when solids are combined.',
          'Surface area includes only the outer exposed boundaries.',
          'Slant height of cone: l = √(r² + h²).',
        ],
      },
    ],
  },
  {
    id: 'c10_ch13',
    grade: 10,
    order: 13,
    name: 'Statistics',
    hindiName: 'सांख्यिकी',
    description: 'Mean of grouped data (Direct method & Assumed Mean method), Mode of grouped data, Median of grouped data.',
    overview: 'Analyze frequency distributions of grouped data. Learn formulas for Mean x̄, Mode, and Median, and empirical formula: 3 Median = Mode + 2 Mean.',
    weightageMarks: 7,
    keyFormulasCount: 4,
    totalQuestionsCount: 15,
    badge: 'Unit VII: Statistics & Probability',
    topics: [
      {
        id: 'c10_ch13_t1',
        name: 'Mean, Mode and Median of Grouped Data',
        concepts: [
          'Direct Method for Mean: x̄ = (∑ fᵢxᵢ) / (∑ fᵢ), where xᵢ is the class mark (Upper + Lower)/2.',
          'Assumed Mean Method: x̄ = a + (∑ fᵢdᵢ) / (∑ fᵢ), where dᵢ = xᵢ - a.',
          'Mode of grouped data: Mode = l + [(f₁ - f₀)/(2f₁ - f₀ - f₂)] × h, where modal class has highest frequency.',
          'Median of grouped data: Median = l + [(n/2 - cf)/f] × h.',
          'Empirical relationship: 3 Median = Mode + 2 Mean.',
        ],
        definitions: [
          {
            term: 'Modal Class',
            definition: 'The class interval having the maximum frequency in a frequency distribution.',
          },
          {
            term: 'Median Class',
            definition: 'The class interval whose cumulative frequency is just greater than or equal to n/2.',
          },
        ],
        properties: [
          'The class mark of an interval is the midpoint: xᵢ = (Upper limit + Lower limit) / 2.',
          'Cumulative frequency table must be strictly constructed for finding median.',
        ],
        importantFormulas: [
          '\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i} = a + \\frac{\\sum f_i d_i}{\\sum f_i}',
          '\\text{Mode} = l + \\left( \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\right) h',
          '\\text{Median} = l + \\left( \\frac{\\frac{n}{2} - \\text{cf}}{f} \\right) h',
          '3\\,\\text{Median} = \\text{Mode} + 2\\,\\text{Mean}',
        ],
        solvedExamples: [
          {
            id: 'stat_ex1',
            title: 'Calculating Mode of Grouped Data',
            problem: 'The marks obtained by 30 students in a test are: Class 10-25 (f=2), 25-40 (f=3), 40-55 (f=7), 55-70 (f=6), 70-85 (f=6), 85-100 (f=6). Find the mode.',
            solutionSteps: [
              'Step 1: Maximum frequency is 7, corresponding to class interval 40 - 55. So modal class is 40 - 55.',
              'Step 2: Lower limit l = 40, class size h = 15, f₁ = 7, f₀ = 3, f₂ = 6.',
              'Step 3: Mode = l + [(f₁ - f₀)/(2f₁ - f₀ - f₂)] × h = 40 + [(7 - 3)/(2(7) - 3 - 6)] × 15.',
              'Step 4: Mode = 40 + [4 / (14 - 9)] × 15 = 40 + (4/5) × 15 = 40 + 12 = 52.',
            ],
            finalAnswer: 'Mode = 52',
          },
        ],
        applications: ['Census population metrics, insurance policy risk tables, student performance analysis.'],
        commonMistakes: [
          {
            mistake: 'Using cumulative frequency cf of the median class instead of the preceding class.',
            correction: 'cf in the median formula strictly represents the cumulative frequency of the PRECEDING class.',
            why: 'n/2 - cf measures the remaining counts inside the current median class.',
          },
        ],
        importantQuestions: [
          'If the median of a distribution of 60 observations is 28.5, find the values of missing frequencies x and y (classes: 0-10, 10-20, ... 50-60).',
        ],
        quickRevisionSummary: [
          'Mean x̄ = ∑(fᵢxᵢ) / ∑fᵢ.',
          'Mode = l + [(f₁ - f₀)/(2f₁ - f₀ - f₂)]h.',
          'Median = l + [(n/2 - cf)/f]h.',
          'Empirical rule: 3 Median = Mode + 2 Mean.',
        ],
      },
    ],
  },
  {
    id: 'c10_ch14',
    grade: 10,
    order: 14,
    name: 'Probability',
    hindiName: 'प्रायिकता',
    description: 'Classical theoretical probability, sure and impossible events, complementary events P(E) + P(not E) = 1.',
    overview: 'Theoretical probability P(E) = (Number of outcomes favourable to E) / (Number of all possible outcomes of experiment). Covers coins, dice, and deck of 52 cards.',
    weightageMarks: 4,
    keyFormulasCount: 2,
    totalQuestionsCount: 14,
    badge: 'Unit VII: Statistics & Probability',
    topics: [
      {
        id: 'c10_ch14_t1',
        name: 'Classical Probability & Card Problems',
        concepts: [
          'Theoretical probability: P(E) = n(E) / n(S).',
          'Probability of a sure event is 1; probability of an impossible event is 0.',
          'For any event E: 0 ≤ P(E) ≤ 1.',
          'Complementary events: P(E) + P(Ē) = 1, where Ē denotes "not E".',
          'Standard deck of 52 playing cards: 4 suits (Spades, Clubs, Hearts, Diamonds), 26 Red, 26 Black, 12 Face cards (Kings, Queens, Jacks).',
        ],
        definitions: [
          {
            term: 'Elementary Event',
            definition: 'An event having only one outcome of the random experiment.',
          },
        ],
        properties: [
          'The sum of the probabilities of all the elementary events of an experiment is 1.',
        ],
        importantFormulas: [
          'P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes}}',
          'P(E) + P(\\bar{E}) = 1',
          '0 \\le P(E) \\le 1',
        ],
        solvedExamples: [
          {
            id: 'prob_ex1',
            title: 'Drawing from Deck of 52 Cards',
            problem: 'One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting: (i) a king of red colour, (ii) a face card.',
            solutionSteps: [
              'Step 1: Total possible outcomes n(S) = 52.',
              'Step 2: (i) Red kings are King of Hearts and King of Diamonds (2 cards). P(Red King) = 2/52 = 1/26.',
              'Step 3: (ii) Face cards are Kings, Queens, Jacks (4 of each = 12 cards). P(Face Card) = 12/52 = 3/13.',
            ],
            finalAnswer: '(i) 1/26, (ii) 3/13',
          },
        ],
        applications: ['Weather forecasting, game theory, medical diagnostic testing.'],
        commonMistakes: [
          {
            mistake: 'Counting Aces as face cards.',
            correction: 'Aces are NOT face cards. Only Kings, Queens, and Jacks are face cards (12 in total).',
            why: 'Aces do not picture human faces.',
          },
        ],
        importantQuestions: [
          'Two dice are thrown simultaneously. What is the probability that the sum of the two numbers appearing on top is 8?',
        ],
        quickRevisionSummary: [
          'P(E) = Favourable / Total.',
          '0 ≤ P(E) ≤ 1.',
          'P(not E) = 1 - P(E).',
          'Deck of cards: 52 cards, 12 face cards, 4 aces.',
        ],
      },
    ],
  },
];
