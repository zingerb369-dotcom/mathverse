export interface DeepChapterModule {
  chapterId: string;
  grade: number;
  chapterOrder: number;
  chapterName: string;
  hindiName?: string;
  whatThisChapterIs: string;
  whyItIsImportant: string;
  whatStudentsWillLearn: string[];
  prerequisites: string[];
  whatsInside: {
    sectionNumber: string;
    title: string;
    subtopics: string[];
    ncertPageRange: string;
  }[];
  mainConcepts: {
    title: string;
    explanation: string;
    latexFormula?: string;
    keyPoints: string[];
  }[];
  definitions: {
    term: string;
    definition: string;
    notation?: string;
    example?: string;
  }[];
  rulesAndProperties: string[];
  importantFormulas: {
    name: string;
    latex: string;
    variables: { symbol: string; meaning: string }[];
    conditions: string;
  }[];
  derivations: {
    theoremName: string;
    statement: string;
    given: string;
    toProve: string;
    construction?: string;
    proofSteps: { step: string; reason: string }[];
    conclusion: string;
  }[];
  solvedExamples: {
    exampleNumber: number;
    difficulty: 'Basic' | 'Standard' | 'Board Level' | 'Exemplar';
    problem: string;
    givenAndRequired: string;
    steps: { stepNumber: number; description: string; mathExpr?: string; whyThisStep: string }[];
    finalAnswer: string;
    examTip: string;
  }[];
  visualExplanations: {
    title: string;
    description: string;
    diagramType: 'triangle' | 'coordinate' | 'numberline' | 'circle' | 'algebra' | 'statistics';
    diagramCaption: string;
  }[];
  realLifeApplications: {
    field: string;
    useCase: string;
    example: string;
  }[];
  stemEconomicsConnections: {
    domain: 'Physics' | 'Computer Science' | 'Engineering' | 'Economics' | 'Astronomy' | 'Architecture';
    connection: string;
  }[];
  historyOfMathematics: {
    period: string;
    story: string;
    keyFigures: string[];
  };
  indianMathematiciansContributions: {
    scholar: string;
    era: string;
    work: string;
    contribution: string;
  }[];
  commonMistakes: {
    mistakeDescription: string;
    incorrectAttempt: string;
    correctMethod: string;
    pedagogicalAdvice: string;
  }[];
  examTipsAndMarkingScheme: {
    tip: string;
    weightageAdvice: string;
  }[];
  importantQuestionTypes: {
    category: '1-Mark MCQ' | '2-Mark Short Answer' | '3-Mark Short Answer' | '5-Mark Long Answer / Proof' | '4-Mark Case-Study';
    typicalQuestion: string;
    strategy: string;
  }[];
  quickRevisionKeyPoints: string[];
  chapterSummary: string;
  practiceQuestions: {
    id: string;
    question: string;
    type: 'MCQ' | 'Short' | 'Proof' | 'Case Study';
    hint: string;
    answer: string;
  }[];
}

export const CHAPTER_DEEP_MODULES: Record<string, DeepChapterModule> = {
  // Class 10 Chapter 1: Real Numbers
  c10_ch1: {
    chapterId: 'c10_ch1',
    grade: 10,
    chapterOrder: 1,
    chapterName: 'Real Numbers',
    hindiName: 'वास्तविक संख्याएँ',
    whatThisChapterIs:
      'Real Numbers is the foundational gateway to higher mathematics in Class 10. It establishes the rigorous algebraic properties of the set of real numbers (ℝ), primarily focusing on the Fundamental Theorem of Arithmetic (unique prime factorisation of natural numbers > 1) and the formal proof of irrationality of numbers like √2, √3, and √5 using the technique of proof by contradiction (Reductio ad Absurdum).',
    whyItIsImportant:
      'Number theory forms the mathematical bedrock of all modern computer science, digital cryptography (such as RSA public-key encryption securing banking transactions), and algorithmic complexity. Mastery of divisibility, prime factorisation, and proof by contradiction develops the deductive reasoning required for higher algebra, calculus, and board examinations.',
    whatStudentsWillLearn: [
      'State and apply the Fundamental Theorem of Arithmetic to decompose any composite integer into unique prime factors.',
      'Compute the Highest Common Factor (HCF) and Least Common Multiple (LCM) of numbers using prime factorisation.',
      'Verify and utilize the relationship HCF(a, b) × LCM(a, b) = a × b for two positive integers.',
      'Prove rigorously why numbers of the form 6ⁿ or 4ⁿ cannot end with the digit 0 for any natural number n.',
      'Construct formal mathematical proofs by contradiction to establish that √2, √3, √5, and expressions like 3 + 2√5 are irrational.',
      'Differentiate between terminating and non-terminating recurring decimal expansions based on the prime factors of the denominator in p/q form.',
    ],
    prerequisites: [
      'Prime and composite numbers, factors, and divisibility rules from Classes 6–8.',
      'Rational numbers and basic irrational concepts from Class 9.',
      'Basic algebraic manipulation, squaring equations, and properties of integers.',
    ],
    whatsInside: [
      {
        sectionNumber: '1.1',
        title: 'Introduction & Arithmetic Foundations',
        subtopics: ['Review of real numbers ℝ', 'Prime vs. composite classification'],
        ncertPageRange: 'Pages 1–3',
      },
      {
        sectionNumber: '1.2',
        title: 'The Fundamental Theorem of Arithmetic',
        subtopics: ['Unique prime factorisation theorem', 'Factor tree method', 'HCF and LCM product relationship'],
        ncertPageRange: 'Pages 4–8',
      },
      {
        sectionNumber: '1.3',
        title: 'Revisiting Irrational Numbers',
        subtopics: ['Theorem: If p divides a², then p divides a', 'Proofs of irrationality of √2, √3, √5', 'Sum and product properties of irrationals'],
        ncertPageRange: 'Pages 9–14',
      },
      {
        sectionNumber: '1.4',
        title: 'Revisiting Rational Numbers & Decimals',
        subtopics: ['Prime factor form 2ⁿ5ᵐ of denominator', 'Terminating vs non-terminating decimals'],
        ncertPageRange: 'Pages 15–18',
      },
    ],
    mainConcepts: [
      {
        title: 'The Fundamental Theorem of Arithmetic',
        explanation:
          'Every composite number can be uniquely expressed (factorised) as a product of primes, apart from the order in which the prime factors occur. For example, 120 = 2³ × 3¹ × 5¹. No other combination of prime numbers can multiply to 120. This universality makes primes the "elementary particles" of arithmetic.',
        latexFormula: 'n = p_1^{a_1} \\cdot p_2^{a_2} \\cdots p_k^{a_k}',
        keyPoints: [
          'Unique factorization holds for every integer n > 1.',
          'HCF is obtained by taking the product of the lowest power of each common prime factor.',
          'LCM is obtained by taking the product of the highest power of every prime factor involved.',
        ],
      },
      {
        title: 'The Fundamental HCF-LCM Product Law',
        explanation:
          'For any two positive integers a and b, the product of their HCF and LCM is equal to the product of the numbers themselves. CAUTION: This relationship does NOT directly hold for three numbers (i.e. HCF(a,b,c) × LCM(a,b,c) ≠ a × b × c).',
        latexFormula: '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b',
        keyPoints: [
          'Directly gives the 4th unknown quantity when any 3 are provided.',
          'Saves computation time in CBSE board questions without recalculating LCM from scratch.',
        ],
      },
      {
        title: 'Proof of Irrationality by Contradiction',
        explanation:
          'We assume the negation of the statement (i.e., suppose √2 is rational). Hence, √2 = a/b where a and b are coprime integers (HCF(a,b) = 1) with b ≠ 0. Squaring gives 2b² = a², proving 2 divides a² and thus 2 divides a. Writing a = 2c leads to 2b² = 4c² or b² = 2c², meaning 2 divides b. This contradicts that a and b are coprime, proving √2 must be irrational.',
        latexFormula: '\\sqrt{p} \\notin \\mathbb{Q} \\quad \\text{for any prime } p',
        keyPoints: [
          'Key Lemma: If a prime p divides a², then p divides a.',
          'Always state that a and b are coprimes (having no common factor other than 1).',
        ],
      },
    ],
    definitions: [
      {
        term: 'Composite Number',
        definition: 'A natural number greater than 1 that has more than two factors (i.e. not prime).',
        notation: 'n \\in \\mathbb{N}, n > 1, n \\notin \\mathbb{P}',
        example: '4, 6, 8, 9, 10, 12, ...',
      },
      {
        term: 'Coprime Integers',
        definition: 'Two positive integers a and b whose only common positive factor is 1; their HCF is 1.',
        notation: '\\text{HCF}(a, b) = 1',
        example: '8 and 15 are coprime, even though neither 8 nor 15 is prime.',
      },
      {
        term: 'Irrational Number',
        definition: 'A real number that cannot be expressed as a ratio of two integers p/q (q ≠ 0); its decimal expansion is non-terminating and non-recurring.',
        notation: 'x \\in \\mathbb{R} \\setminus \\mathbb{Q}',
        example: '\\sqrt{2} = 1.41421356..., \\quad \\pi = 3.14159265...',
      },
    ],
    rulesAndProperties: [
      'The sum or difference of a rational number and an irrational number is always irrational (e.g. 3 + √5 is irrational).',
      'The product and quotient of a non-zero rational number and an irrational number is always irrational (e.g. 2√3 is irrational).',
      'If a number must end with the digit 0, its prime factorisation MUST contain both 2 and 5 (i.e. 2 × 5 = 10).',
      'For any rational number p/q in simplest form (HCF(p, q) = 1), the decimal expansion terminates if and only if the prime factorisation of q is of the form 2ⁿ5ᵐ, where n and m are non-negative integers.',
    ],
    importantFormulas: [
      {
        name: 'HCF-LCM Product Formula',
        latex: '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b',
        variables: [
          { symbol: 'a, b', meaning: 'The two positive integers' },
          { symbol: 'HCF(a, b)', meaning: 'Highest common divisor of a and b' },
          { symbol: 'LCM(a, b)', meaning: 'Least common multiple of a and b' },
        ],
        conditions: 'Valid strictly for two numbers only. Does not hold for three or more integers.',
      },
      {
        name: 'Terminating Decimal Condition',
        latex: 'q = 2^n \\cdot 5^m, \\quad n, m \\in \\mathbb{Z}_{\\ge 0}',
        variables: [
          { symbol: 'q', meaning: 'Denominator of rational number p/q in lowest terms' },
          { symbol: 'n, m', meaning: 'Powers of 2 and 5' },
        ],
        conditions: 'Fraction p/q must be reduced to lowest terms before factorising denominator.',
      },
    ],
    derivations: [
      {
        theoremName: 'Theorem 1.3: Divisibility Lemma for Primes',
        statement: 'Let p be a prime number. If p divides a², then p divides a, where a is a positive integer.',
        given: 'p is prime, a is a positive integer, and p divides a².',
        toProve: 'p divides a.',
        construction: 'Let the prime factorisation of a be a = p₁p₂···pₙ, where p₁, p₂, ..., pₙ are primes, not necessarily all distinct.',
        proofSteps: [
          { step: 'a = p₁ · p₂ ··· pₙ', reason: 'By Fundamental Theorem of Arithmetic' },
          { step: 'a² = (p₁ · p₂ ··· pₙ)(p₁ · p₂ ··· pₙ) = p₁² · p₂² ··· pₙ²', reason: 'Squaring both sides' },
          { step: 'We are given that p divides a².', reason: 'Hypothesis' },
          { step: 'By the uniqueness part of the Fundamental Theorem of Arithmetic, the only prime factors of a² are p₁, p₂, ..., pₙ.', reason: 'Unique factorisation' },
          { step: 'Therefore, p must be one of p₁, p₂, ..., pₙ.', reason: 'p is prime and divides a²' },
          { step: 'Since a = p₁ · p₂ ··· pₙ, p divides a.', reason: 'Because p is in the factorization of a' },
        ],
        conclusion: 'Hence, if a prime p divides a², it must divide a.',
      },
    ],
    solvedExamples: [
      {
        exampleNumber: 1,
        difficulty: 'Board Level',
        problem: 'Prove that √5 is an irrational number.',
        givenAndRequired: 'Given: 5 is a prime number. To Prove: √5 is irrational.',
        steps: [
          {
            stepNumber: 1,
            description: 'Assume the contrary, that √5 is a rational number.',
            mathExpr: '\\sqrt{5} = \\frac{a}{b}, \\quad \\text{where } a, b \\in \\mathbb{Z}, b \\neq 0, \\text{ and } \\text{HCF}(a, b) = 1',
            whyThisStep: 'Proof by contradiction assumes the statement is false, showing it leads to an impossibility.',
          },
          {
            stepNumber: 2,
            description: 'Square both sides of the equation.',
            mathExpr: '5 = \\frac{a^2}{b^2} \\implies 5b^2 = a^2',
            whyThisStep: 'Eliminates the square root to express the relationship purely in terms of integers.',
          },
          {
            stepNumber: 3,
            description: 'Deduce that 5 divides a² and therefore 5 divides a.',
            mathExpr: '5 \\mid a^2 \\implies 5 \\mid a \\implies a = 5c \\text{ for some integer } c',
            whyThisStep: 'By Theorem 1.3: if prime p divides a², then p divides a.',
          },
          {
            stepNumber: 4,
            description: 'Substitute a = 5c back into 5b² = a².',
            mathExpr: '5b^2 = (5c)^2 = 25c^2 \\implies b^2 = 5c^2',
            whyThisStep: 'This allows us to evaluate the divisibility of b.',
          },
          {
            stepNumber: 5,
            description: 'This means 5 divides b² and hence 5 divides b.',
            mathExpr: '5 \\mid b^2 \\implies 5 \\mid b',
            whyThisStep: 'Same prime divisibility theorem applied to b.',
          },
          {
            stepNumber: 6,
            description: 'Identify the contradiction.',
            mathExpr: '5 \\text{ is a common factor of both } a \\text{ and } b, \\text{ which contradicts } \\text{HCF}(a, b) = 1.',
            whyThisStep: 'Our initial premise that a and b are coprime has been violated.',
          },
        ],
        finalAnswer: 'Hence, our initial assumption was incorrect, and √5 is irrational. (Q.E.D.)',
        examTip: 'In CBSE Class 10 Board exams, this is a standard 3-mark question. Do not skip writing "where a and b are coprime", as it costs 1/2 mark in step marking.',
      },
      {
        exampleNumber: 2,
        difficulty: 'Standard',
        problem: 'Show that 6ⁿ cannot end with the digit 0 for any natural number n.',
        givenAndRequired: 'Given: The number is 6ⁿ, where n ∈ ℕ. To Prove: It cannot end with 0.',
        steps: [
          {
            stepNumber: 1,
            description: 'State the divisibility condition for a number to end with the digit 0.',
            mathExpr: '\\text{A number ends with } 0 \\iff 10 \\mid 6^n \\iff 2 \\text{ and } 5 \\text{ are prime factors of } 6^n.',
            whyThisStep: 'Any number ending in zero is a multiple of 10 = 2 × 5.',
          },
          {
            stepNumber: 2,
            description: 'Find the prime factorisation of 6ⁿ.',
            mathExpr: '6^n = (2 \\times 3)^n = 2^n \\times 3^n',
            whyThisStep: 'Decompose the base into prime numbers.',
          },
          {
            stepNumber: 3,
            description: 'Observe the prime factors present.',
            mathExpr: '\\text{The only prime factors of } 6^n \\text{ are } 2 \\text{ and } 3.',
            whyThisStep: 'By the Fundamental Theorem of Arithmetic, this factorisation is completely unique.',
          },
          {
            stepNumber: 4,
            description: 'Conclude absence of prime factor 5.',
            mathExpr: '5 \\text{ is not a prime factor of } 6^n \\implies 6^n \\text{ cannot end with digit } 0.',
            whyThisStep: 'Without 5, a factor of 10 can never be formed.',
          },
        ],
        finalAnswer: 'Hence, 6ⁿ can never end with the digit 0 for any natural number n.',
        examTip: 'Mention the "Fundamental Theorem of Arithmetic guarantees uniqueness of prime factors" for full marks.',
      },
    ],
    visualExplanations: [
      {
        title: 'The Real Number Line & Hierarchy of Sets',
        description:
          'Real numbers ℝ are partitioned completely into Rational Numbers ℚ (which include integers ℤ and natural numbers ℕ) and Irrational Numbers (numbers like π, e, √2, √3 which cannot be expressed as fractions).',
        diagramType: 'numberline',
        diagramCaption: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. The irrational numbers fill the infinite continuum gaps between rationals.',
      },
    ],
    realLifeApplications: [
      {
        field: 'Cryptography & Cyber Security',
        useCase: 'RSA Encryption Algorithm',
        example:
          'Online banking and password encryption rely on the difficulty of factorizing huge composite numbers (over 300 digits) into their two secret prime factors. Finding primes is easy, but factoring their product without the key takes supercomputers thousands of years!',
      },
      {
        field: 'Civil Engineering & Construction',
        useCase: 'Diagonal Dimensioning',
        example:
          'Builders setting square foundations use the 3-4-5 rule (Pythagorean triplet). Diagonal lengths of square structural bays often involve √2, which must be approximated precisely to avoid architectural misalignment.',
      },
      {
        field: 'Audio Engineering & Acoustics',
        useCase: 'Musical Tuning & Equal Temperament',
        example:
          'In modern piano tuning, each adjacent semitone frequency ratio is exactly 2^(1/12), an irrational number, ensuring instruments sound harmonic across all musical keys.',
      },
    ],
    stemEconomicsConnections: [
      {
        domain: 'Computer Science',
        connection:
          'Hash tables in computer programming use large prime numbers as modulo divisors (e.g. hash % prime) to avoid collisions and distribute data uniformly across memory buffers.',
      },
      {
        domain: 'Economics',
        connection:
          'Continuous compound interest formulas (A = Pe^(rt)) rely on the irrational mathematical constant e = 2.71828..., which emerged directly from limit studies of exponential growth in finance.',
      },
    ],
    historyOfMathematics: {
      period: '500 BCE – 300 BCE (Ancient Greece and India)',
      story:
        'The discovery of irrational numbers is traditionally credited to Hippasus of Metapontum (a follower of Pythagoras), who proved that the diagonal of a unit square cannot be represented as a ratio of whole numbers. The Pythagoreans, who believed that the entire universe was governed by integers ("All is Number"), were so shocked by this discovery that legend says Hippasus was thrown into the sea! Later, Euclid systematized the proof in his classic work "Elements" around 300 BCE.',
      keyFigures: ['Pythagoras', 'Hippasus of Metapontum', 'Euclid of Alexandria', 'Carl Friedrich Gauss'],
    },
    indianMathematiciansContributions: [
      {
        scholar: 'Baudhayana',
        era: 'c. 800 BCE',
        work: 'Baudhayana Sulba Sutra',
        contribution:
          'Gave one of the earliest recorded rational approximations for the square root of 2: √2 ≈ 1 + 1/3 + 1/(3×4) - 1/(3×4×34) = 577/408 ≈ 1.41421568..., which is correct to 5 decimal places!',
      },
      {
        scholar: 'Brahmagupta',
        era: '598–668 CE',
        work: 'Brahmasphutasiddhanta',
        contribution:
          'First mathematician in history to formulate explicit arithmetic operational rules for Zero (0) and negative numbers, laying the foundation for modern integer and real number systems.',
      },
      {
        scholar: 'Aryabhata',
        era: '476–550 CE',
        work: 'Aryabhatiya',
        contribution:
          'Approximated the irrational number π as 62832/20000 = 3.1416, explicitly noting in Sanskrit that this value is "asanna" (approximated), recognizing that π cannot be expressed as an exact fraction.',
      },
    ],
    commonMistakes: [
      {
        mistakeDescription: 'Confusing HCF and LCM prime factor exponents.',
        incorrectAttempt: 'Taking highest power for HCF and lowest power for LCM.',
        correctMethod: 'HCF is product of LOWEST power of common prime factors. LCM is product of HIGHEST power of all prime factors.',
        pedagogicalAdvice: 'Remember: HCF must divide both numbers, so it cannot be larger than the numbers; LCM must be divisible by both, so it cannot be smaller.',
      },
      {
        mistakeDescription: 'Applying HCF × LCM = a × b to three numbers.',
        incorrectAttempt: 'Writing HCF(a, b, c) × LCM(a, b, c) = a × b × c.',
        correctMethod: 'This formula is valid ONLY for two numbers. For 3 numbers, factorize directly or use the extended 3-variable formula.',
        pedagogicalAdvice: 'CBSE frequently sets trap questions with 3 numbers where students naively multiply all three.',
      },
    ],
    examTipsAndMarkingScheme: [
      {
        tip: 'In irrationality proofs, always explicitly state: "where a and b are integers, b ≠ 0, and HCF(a, b) = 1".',
        weightageAdvice: 'CBSE marking schemes deduct 1/2 to 1 mark if the coprime condition is missing.',
      },
      {
        tip: 'For questions like "Prove 3 + 2√5 is irrational", you can assume √5 is irrational (unless asked to prove it first), making it a 2-mark or 3-mark question.',
        weightageAdvice: 'Rearrange to isolate the root: √5 = (a/b - 3)/2 = (a - 3b)/(2b), and state LHS is irrational while RHS is rational.',
      },
    ],
    importantQuestionTypes: [
      {
        category: '1-Mark MCQ',
        typicalQuestion: 'If HCF(26, 169) = 13, then LCM(26, 169) is: (a) 26, (b) 52, (c) 338, (d) 13.',
        strategy: 'Directly use LCM = (a × b) / HCF = (26 × 169) / 13 = 2 × 169 = 338.',
      },
      {
        category: '2-Mark Short Answer',
        typicalQuestion: 'Explain why 7 × 11 × 13 + 13 and 7 × 6 × 5 × 4 × 3 × 2 × 1 + 5 are composite numbers.',
        strategy: 'Take out the common factor: 13(7 × 11 + 1) = 13(78). Since it has factors other than 1 and itself, it is composite by Fundamental Theorem.',
      },
      {
        category: '3-Mark Short Answer',
        typicalQuestion: 'Prove that √3 is irrational.',
        strategy: 'Use proof by contradiction with coprime integers a and b, show 3 divides a and 3 divides b.',
      },
      {
        category: '4-Mark Case-Study',
        typicalQuestion: 'A morning walk track: Three people step off together with step lengths 40 cm, 42 cm, and 45 cm. What minimum distance should each walk so all cover complete steps?',
        strategy: 'Recognize this as a Least Common Multiple (LCM) problem. Find LCM(40, 42, 45) = 2520 cm = 25.2 m.',
      },
    ],
    quickRevisionKeyPoints: [
      'Fundamental Theorem: Every composite number has a unique prime factorization.',
      'HCF(a, b) × LCM(a, b) = a × b (valid only for two numbers).',
      'If prime p divides a², then p divides a.',
      'A number ends with digit 0 if and only if both 2 and 5 are in its prime factorization.',
      'Rational + Irrational = Irrational; Non-zero Rational × Irrational = Irrational.',
      'Decimal expansion of p/q terminates iff q = 2ⁿ5ᵐ in lowest terms.',
    ],
    chapterSummary:
      'Chapter 1 (Real Numbers) bridges arithmetic and algebra in Class 10. By grounding number operations in the Fundamental Theorem of Arithmetic and proving the non-rational nature of radical roots, students gain the mathematical rigor essential for the study of polynomials, quadratics, and trigonometry.',
    practiceQuestions: [
      {
        id: 'c10_ch1_pq1',
        question: 'Find the HCF of 65 and 117 and express it in the form 65m + 117n.',
        type: 'Short',
        hint: 'Prime factorize 65 = 5 × 13 and 117 = 3² × 13. HCF = 13. Then find m and n by inspection or division algorithm.',
        answer: 'HCF = 13; m = 2, n = -1 (since 65(2) + 117(-1) = 130 - 117 = 13).',
      },
      {
        id: 'c10_ch1_pq2',
        question: 'Prove that 2 - 3√5 is an irrational number, given that √5 is irrational.',
        type: 'Proof',
        hint: 'Assume 2 - 3√5 = a/b is rational. Rearrange to get √5 = (2 - a/b)/3 = (2b - a)/(3b).',
        answer: 'Since a and b are integers, (2b - a)/(3b) is rational, meaning √5 is rational, contradicting the fact that √5 is irrational.',
      },
      {
        id: 'c10_ch1_pq3',
        question: 'What is the largest number that divides 70 and 125 leaving remainders 5 and 8 respectively?',
        type: 'Short',
        hint: 'Subtract remainders first: 70 - 5 = 65, and 125 - 8 = 117. Find HCF(65, 117).',
        answer: 'HCF(65, 117) = 13. The required largest number is 13.',
      },
    ],
  },

  // Class 10 Chapter 2: Polynomials
  c10_ch2: {
    chapterId: 'c10_ch2',
    grade: 10,
    chapterOrder: 2,
    chapterName: 'Polynomials',
    hindiName: 'बहुपद',
    whatThisChapterIs:
      'Polynomials deals with algebraic expressions of degree n with real coefficients. In Class 10, the curriculum focuses sharply on Quadratic Polynomials (degree 2) and Cubic Polynomials (degree 3), exploring the geometric meaning of their zeroes (points of intersection with the x-axis) and establishing the algebraic relationships between zeroes and their coefficients.',
    whyItIsImportant:
      'Polynomial equations model curved paths in physics (such as projectile trajectories, satellite dishes, rollercoasters, and suspension bridge cables). The relationship between zeroes and coefficients provides the direct gateway to solving quadratic equations, optimization problems, and calculus.',
    whatStudentsWillLearn: [
      'Interpret the geometrical meaning of the zeroes of linear, quadratic, and cubic polynomials as x-intercepts on the Cartesian plane.',
      'Determine the number of zeroes of a polynomial y = p(x) directly by counting intersections with the x-axis.',
      'Derive and utilize the relationships between zeroes and coefficients of a quadratic polynomial ax² + bx + c: Sum (α + β = -b/a) and Product (αβ = c/a).',
      'Formulate a quadratic polynomial when given the sum and product of its zeroes: p(x) = k[x² - (α + β)x + αβ].',
      'Solve symmetric algebraic expressions involving zeroes, such as α² + β², 1/α + 1/β, and α³ + β³.',
    ],
    prerequisites: [
      'Degree of a polynomial and polynomials in one variable from Class 9.',
      'Factorization of polynomials using splitting the middle term.',
      'Standard algebraic identities: (a+b)², (a-b)², a²-b², (a+b)³.',
    ],
    whatsInside: [
      {
        sectionNumber: '2.1',
        title: 'Geometrical Meaning of Zeroes',
        subtopics: ['Linear polynomial graph (straight line)', 'Quadratic polynomial graph (parabola opening upwards or downwards)', 'Counting real zeroes via x-intercepts'],
        ncertPageRange: 'Pages 19–27',
      },
      {
        sectionNumber: '2.2',
        title: 'Relationship Between Zeroes & Coefficients',
        subtopics: ['Quadratic polynomials: Sum α+β = -b/a, Product αβ = c/a', 'Cubic polynomials: Sum α+β+γ = -b/a, Pairwise αβ+βγ+γα = c/a, Product αβγ = -d/a'],
        ncertPageRange: 'Pages 28–35',
      },
    ],
    mainConcepts: [
      {
        title: 'Geometric Meaning of Zeroes (Parabolas)',
        explanation:
          'For a quadratic polynomial p(x) = ax² + bx + c (a ≠ 0), the graph is a smooth U-shaped curve called a Parabola. If a > 0, the parabola opens upwards; if a < 0, it opens downwards. The x-coordinates of the points where the graph intersects the x-axis are the real zeroes of the polynomial.',
        latexFormula: 'y = ax^2 + bx + c',
        keyPoints: [
          'If the parabola intersects the x-axis at two distinct points, it has 2 real zeroes.',
          'If it touches the x-axis at exactly one point, it has 2 equal real zeroes (1 distinct zero).',
          'If it does not intersect the x-axis, it has no real zeroes.',
        ],
      },
      {
        title: 'Zeroes and Coefficients Relationship',
        explanation:
          'Let α and β be the zeroes of the quadratic polynomial p(x) = ax² + bx + c. Then (x - α) and (x - β) are factors. Expanding k(x - α)(x - β) = k[x² - (α + β)x + αβ] and comparing with ax² + bx + c yields the fundamental relations.',
        latexFormula: '\\alpha + \\beta = -\\frac{b}{a} = -\\frac{\\text{Coefficient of } x}{\\text{Coefficient of } x^2}, \\quad \\alpha\\beta = \\frac{c}{a} = \\frac{\\text{Constant term}}{\\text{Coefficient of } x^2}',
        keyPoints: [
          'Sum of zeroes: α + β = -b/a',
          'Product of zeroes: αβ = c/a',
          'Quadratic polynomial: p(x) = k[x² - (Sum)x + (Product)]',
        ],
      },
    ],
    definitions: [
      {
        term: 'Zero of a Polynomial',
        definition: 'A real number k is called a zero of a polynomial p(x) if p(k) = 0.',
        notation: 'p(k) = 0',
        example: 'For p(x) = x² - 5x + 6, p(2) = 2² - 5(2) + 6 = 0, so 2 is a zero.',
      },
      {
        term: 'Parabola',
        definition: 'The symmetric, curved planar graph representing a quadratic function y = ax² + bx + c.',
        notation: 'a > 0 \\implies \\cup, \\quad a < 0 \\implies \\cap',
        example: 'The trajectory of a basketball thrown through the air traces an inverted parabola (a < 0).',
      },
    ],
    rulesAndProperties: [
      'A polynomial of degree n can have AT MOST n real zeroes.',
      'A linear polynomial (degree 1) has at most 1 zero (graph is a straight line).',
      'A quadratic polynomial (degree 2) has at most 2 zeroes (graph is a parabola).',
      'A cubic polynomial (degree 3) has at most 3 zeroes.',
      'Symmetric identities: α² + β² = (α + β)² - 2αβ, and (α - β)² = (α + β)² - 4αβ.',
    ],
    importantFormulas: [
      {
        name: 'Quadratic Polynomial Zero-Coefficient Relations',
        latex: '\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}',
        variables: [
          { symbol: 'α, β', meaning: 'The zeroes of quadratic polynomial' },
          { symbol: 'a', meaning: 'Coefficient of x² (a ≠ 0)' },
          { symbol: 'b', meaning: 'Coefficient of x' },
          { symbol: 'c', meaning: 'Constant term' },
        ],
        conditions: 'Valid for quadratic polynomials ax² + bx + c with real coefficients.',
      },
      {
        name: 'Construction of Quadratic Polynomial',
        latex: 'p(x) = k \\left[ x^2 - (\\alpha + \\beta)x + \\alpha\\beta \\right], \\quad k \\neq 0',
        variables: [
          { symbol: 'k', meaning: 'Any non-zero real constant' },
          { symbol: 'α + β', meaning: 'Sum of zeroes' },
          { symbol: 'αβ', meaning: 'Product of zeroes' },
        ],
        conditions: 'k is usually chosen as 1 or to eliminate fractional denominators.',
      },
    ],
    derivations: [
      {
        theoremName: 'Derivation of Zero-Coefficient Relations',
        statement: 'Derive α + β = -b/a and αβ = c/a for quadratic polynomial ax² + bx + c.',
        given: 'p(x) = ax² + bx + c (a ≠ 0) has zeroes α and β.',
        toProve: 'α + β = -b/a and αβ = c/a.',
        proofSteps: [
          { step: 'Since α and β are zeroes, (x - α) and (x - β) are factors of p(x).', reason: 'Factor Theorem' },
          { step: 'ax² + bx + c = k(x - α)(x - β), where k is a non-zero constant.', reason: 'Degree 2 identity' },
          { step: 'ax² + bx + c = k[x² - (α + β)x + αβ] = kx² - k(α + β)x + kαβ', reason: 'Expanding the RHS' },
          { step: 'Comparing coefficients of like powers of x on both sides: a = k, b = -k(α + β), c = kαβ', reason: 'Identity equality' },
          { step: 'b = -a(α + β) ⟹ α + β = -b/a', reason: 'Substituting k = a' },
          { step: 'c = a(αβ) ⟹ αβ = c/a', reason: 'Substituting k = a' },
        ],
        conclusion: 'Sum of zeroes = -b/a and Product of zeroes = c/a. (Derived)',
      },
    ],
    solvedExamples: [
      {
        exampleNumber: 1,
        difficulty: 'Board Level',
        problem: 'Find the zeroes of the quadratic polynomial 6x² - 3 - 7x and verify the relationship between the zeroes and coefficients.',
        givenAndRequired: 'Polynomial: 6x² - 7x - 3. Required: Zeroes and verification.',
        steps: [
          {
            stepNumber: 1,
            description: 'Rewrite the polynomial in standard descending order of powers.',
            mathExpr: 'p(x) = 6x^2 - 7x - 3',
            whyThisStep: 'Standard form ax² + bx + c avoids confusion with coefficients a = 6, b = -7, c = -3.',
          },
          {
            stepNumber: 2,
            description: 'Factorise by splitting the middle term.',
            mathExpr: '\\text{Product } = 6 \\times (-3) = -18, \\quad \\text{Sum } = -7 \\implies -9 \\text{ and } +2.',
            whyThisStep: 'Find two numbers with required product and sum.',
          },
          {
            stepNumber: 3,
            description: 'Group and factor.',
            mathExpr: '6x^2 - 9x + 2x - 3 = 3x(2x - 3) + 1(2x - 3) = (2x - 3)(3x + 1)',
            whyThisStep: 'Express as product of linear factors.',
          },
          {
            stepNumber: 4,
            description: 'Set p(x) = 0 to find zeroes.',
            mathExpr: '2x - 3 = 0 \\implies x = \\frac{3}{2}, \\quad 3x + 1 = 0 \\implies x = -\\frac{1}{3}',
            whyThisStep: 'Roots occur where the polynomial evaluates to 0.',
          },
          {
            stepNumber: 5,
            description: 'Verify Sum of Zeroes.',
            mathExpr: '\\alpha + \\beta = \\frac{3}{2} + \\left(-\\frac{1}{3}\\right) = \\frac{9 - 2}{6} = \\frac{7}{6}; \\quad -\\frac{b}{a} = -\\frac{-7}{6} = \\frac{7}{6}. \\quad \\text{Verified!}',
            whyThisStep: 'LHS equals RHS.',
          },
          {
            stepNumber: 6,
            description: 'Verify Product of Zeroes.',
            mathExpr: '\\alpha\\beta = \\left(\\frac{3}{2}\\right)\\left(-\\frac{1}{3}\\right) = -\\frac{3}{6} = -\\frac{1}{2}; \\quad \\frac{c}{a} = -\\frac{3}{6} = -\\frac{1}{2}. \\quad \\text{Verified!}',
            whyThisStep: 'LHS equals RHS.',
          },
        ],
        finalAnswer: 'Zeroes are 3/2 and -1/3. Relationships verified.',
        examTip: 'CBSE often mixes the order of terms (e.g. 6x² - 3 - 7x). Rearranging to standard form first is critical.',
      },
    ],
    visualExplanations: [
      {
        title: 'Parabolas and Real Zeroes',
        description:
          'The graph of a quadratic polynomial y = ax² + bx + c intersects the x-axis at points (x₁, 0) and (x₂, 0). If the parabola is completely above or below the x-axis, the discriminant D < 0 and there are zero real zeroes.',
        diagramType: 'coordinate',
        diagramCaption: 'Number of x-intercepts equals the number of real zeroes.',
      },
    ],
    realLifeApplications: [
      {
        field: 'Astrophysics & Satellite Communications',
        useCase: 'Parabolic Dish Antennas',
        example:
          'Satellite dishes and car headlights are parabolic cross-sections. Signals arriving parallel to the axis reflect off the polynomial surface and converge at a single point called the Focus.',
      },
      {
        field: 'Civil & Structural Engineering',
        useCase: 'Suspension Bridges',
        example:
          'The main suspension cables of bridges (like the Golden Gate Bridge or Howrah Bridge approaches) hang in a shape closely approximated by a quadratic polynomial curve to distribute tensile stress uniformly.',
      },
    ],
    stemEconomicsConnections: [
      {
        domain: 'Economics',
        connection:
          'Profit functions in microeconomics are frequently modeled as quadratics: Profit(q) = -a·q² + b·q - c. The vertex of the parabola indicates the maximum possible profit and the optimal production quantity q.',
      },
      {
        domain: 'Physics',
        connection:
          'The kinematic equation for vertical displacement under gravity h(t) = -1/2 g·t² + v₀·t + h₀ is a quadratic polynomial in time t.',
      },
    ],
    historyOfMathematics: {
      period: '800 CE – 1600 CE (Golden Age of Algebra)',
      story:
        'The word "Algebra" originates from the Arabic treatise "Al-Kitab al-mukhtasar fi hisab al-jabr wal-muqabala" written by Persian polymath Muhammad ibn Musa al-Khwarizmi in 820 CE. Later in Renaissance Italy, mathematicians Tartaglia, Cardano, and Ferrari developed the algebraic solutions for cubic and quartic polynomials.',
      keyFigures: ['Al-Khwarizmi', 'Gerolamo Cardano', 'Niccolò Tartaglia', 'François Viète'],
    },
    indianMathematiciansContributions: [
      {
        scholar: 'Sridhara (Sridharacharya)',
        era: 'c. 870–930 CE',
        work: 'Patiganita & Trisatika',
        contribution:
          'Formulated the celebrated "Sridharacharya Formula" for solving any quadratic equation by completing the square (multiply both sides by 4a, add b², and take the square root), which is taught globally as the Quadratic Formula today.',
      },
      {
        scholar: 'Bhaskara II (Bhaskaracharya)',
        era: '1114–1185 CE',
        work: 'Bijaganita & Lilavati',
        contribution:
          'Recognized that quadratic equations have two roots (including positive and negative roots) and discussed the nature of polynomial roots extensively.',
      },
    ],
    commonMistakes: [
      {
        mistakeDescription: 'Forgetting the negative sign in the sum of zeroes.',
        incorrectAttempt: 'Writing α + β = b/a.',
        correctMethod: 'α + β = -b/a (always has the minus sign).',
        pedagogicalAdvice: 'Think: "Minus b over a" for sum, "plus c over a" for product.',
      },
    ],
    examTipsAndMarkingScheme: [
      {
        tip: 'If α and β are zeroes, to find α² + β², use the identity (α + β)² - 2αβ. Do NOT calculate the roots individually if the question only asks for the value of the expression.',
        weightageAdvice: 'Using symmetric identities saves 3 minutes and avoids arithmetic errors with radical roots.',
      },
    ],
    importantQuestionTypes: [
      {
        category: '2-Mark Short Answer',
        typicalQuestion: 'If one zero of the quadratic polynomial 2x² - 3x + k is reciprocal of the other, find the value of k.',
        strategy: 'Let zeroes be α and 1/α. Product of zeroes = α × (1/α) = 1. Therefore c/a = 1 ⟹ k/2 = 1 ⟹ k = 2.',
      },
    ],
    quickRevisionKeyPoints: [
      'Zeroes are x-coordinates of points where y = p(x) crosses the x-axis.',
      'Number of real zeroes ≤ degree of polynomial.',
      'Sum of zeroes = -b/a; Product of zeroes = c/a.',
      'Quadratic equation: k[x² - (α+β)x + αβ] = 0.',
      'α² + β² = (α + β)² - 2αβ.',
    ],
    chapterSummary:
      'Polynomials establishes the essential link between algebra and geometry in Class 10. By connecting algebraic factorisation with parabolic graphs, students master the foundational tools for quadratic analysis.',
    practiceQuestions: [
      {
        id: 'c10_ch2_pq1',
        question: 'If α and β are the zeroes of the polynomial f(x) = x² - 5x + k such that α - β = 1, find the value of k.',
        type: 'Short',
        hint: 'Use (α - β)² = (α + β)² - 4αβ. Here α + β = 5 and αβ = k.',
        answer: '1² = 5² - 4k ⟹ 1 = 25 - 4k ⟹ 4k = 24 ⟹ k = 6.',
      },
    ],
  },
};

export function getDeepChapterModule(chapterId: string): DeepChapterModule | undefined {
  return CHAPTER_DEEP_MODULES[chapterId];
}

export function getOrBuildDeepChapterModule(chapter: {
  id: string;
  grade: number;
  order: number;
  name: string;
  hindiName?: string;
  description?: string;
  overview?: string;
  topics: {
    id: string;
    name: string;
    concepts: string[];
    definitions: { term: string; definition: string; latex?: string }[];
    properties: string[];
    importantFormulas: string[];
    solvedExamples: {
      id: string;
      title: string;
      problem: string;
      solutionSteps: string[];
      finalAnswer: string;
      whyThisStep?: string;
      examTip?: string;
    }[];
    applications: string[];
    commonMistakes: { mistake: string; correction: string; why: string }[];
    importantQuestions: string[];
    quickRevisionSummary: string[];
  }[];
}): DeepChapterModule {
  if (CHAPTER_DEEP_MODULES[chapter.id]) {
    return CHAPTER_DEEP_MODULES[chapter.id];
  }

  // Derive rich sections from the chapter's topics
  const allDefinitions = chapter.topics.flatMap(t =>
    t.definitions.map(d => ({
      term: d.term,
      definition: d.definition,
      notation: d.latex,
      example: `Standard CBSE example for ${d.term}`,
    }))
  );

  const allRules = chapter.topics.flatMap(t => t.properties);
  const allMistakes = chapter.topics.flatMap(t =>
    t.commonMistakes.map(m => ({
      mistakeDescription: m.mistake,
      incorrectAttempt: `Typical flawed assumption: ${m.mistake}`,
      correctMethod: m.correction,
      pedagogicalAdvice: m.why,
    }))
  );

  const allExamples = chapter.topics.flatMap((t, tIdx) =>
    t.solvedExamples.map((ex, exIdx) => ({
      exampleNumber: tIdx * 2 + exIdx + 1,
      difficulty: (exIdx === 0 ? 'Basic' : exIdx === 1 ? 'Standard' : 'Board Level') as any,
      problem: ex.problem,
      givenAndRequired: `Problem Statement from Topic: ${t.name}`,
      steps: ex.solutionSteps.map((stepStr, sIdx) => ({
        stepNumber: sIdx + 1,
        description: stepStr,
        mathExpr: '',
        whyThisStep: ex.whyThisStep || 'Apply core algebraic or geometric principle systematically.',
      })),
      finalAnswer: ex.finalAnswer,
      examTip: ex.examTip || 'Show every intermediate calculation step for full CBSE step marks.',
    }))
  );

  const whatsInsideList = chapter.topics.map((t, idx) => ({
    sectionNumber: `${chapter.order}.${idx + 1}`,
    title: t.name,
    subtopics: t.concepts.slice(0, 3),
    ncertPageRange: `Section ${chapter.order}.${idx + 1}`,
  }));

  const mainConceptsList = chapter.topics.map(t => ({
    title: t.name,
    explanation: t.concepts.join(' '),
    latexFormula: t.importantFormulas[0] || undefined,
    keyPoints: t.concepts,
  }));

  const formulasList = chapter.topics.flatMap(t =>
    t.importantFormulas.map((f, fIdx) => ({
      name: `${t.name} Formula ${fIdx + 1}`,
      latex: f,
      variables: [
        { symbol: 'Standard Variables', meaning: 'Refer to problem units and dimensional values' },
      ],
      conditions: `Valid in CBSE Class ${chapter.grade} standard conditions.`,
    }))
  );

  const applicationsList = chapter.topics.flatMap(t =>
    t.applications.map((app, aIdx) => ({
      field: aIdx === 0 ? 'Science & Engineering' : aIdx === 1 ? 'Economics & Commerce' : 'Daily Life',
      useCase: t.name,
      example: app,
    }))
  );

  return {
    chapterId: chapter.id,
    grade: chapter.grade,
    chapterOrder: chapter.order,
    chapterName: chapter.name,
    hindiName: chapter.hindiName,
    whatThisChapterIs:
      chapter.overview ||
      `Chapter ${chapter.order}: ${chapter.name} is an essential module of the CBSE/NCERT Class ${chapter.grade} curriculum, establishing core mathematical reasoning, algebraic manipulation, and geometric intuition.`,
    whyItIsImportant:
      `Mastery of ${chapter.name} develops analytical problem-solving abilities necessary for higher STEM coursework, CBSE examinations, and everyday quantitative literacy.`,
    whatStudentsWillLearn: [
      `Understand the foundational axioms, theorems, and definitions in ${chapter.name}.`,
      `Apply step-by-step mathematical methods to solve standard and competency-based NCERT problems.`,
      `Avoid common conceptual pitfalls and arithmetic oversights highlighted in CBSE marking schemes.`,
      `Connect mathematical formulas to real-world engineering, architecture, and technology applications.`,
    ],
    prerequisites: [
      `Basic arithmetic, integers, fractions, and algebraic expressions from prior grades.`,
      `Familiarity with standard NCERT terminology and dimensional units.`,
    ],
    whatsInside: whatsInsideList.length > 0 ? whatsInsideList : [
      {
        sectionNumber: `${chapter.order}.1`,
        title: 'Core Concepts and Definitions',
        subtopics: ['Fundamental theorems', 'Properties and applications'],
        ncertPageRange: 'Section 1',
      },
    ],
    mainConcepts: mainConceptsList.length > 0 ? mainConceptsList : [
      {
        title: chapter.name,
        explanation: chapter.description || chapter.overview || 'Core conceptual principles.',
        keyPoints: ['Comprehensive conceptual understanding', 'Step-by-step problem solving'],
      },
    ],
    definitions: allDefinitions.length > 0 ? allDefinitions : [
      {
        term: chapter.name,
        definition: chapter.description || 'Core mathematical topic.',
      },
    ],
    rulesAndProperties: allRules.length > 0 ? allRules : [
      'Always maintain consistent measurement units throughout calculations.',
      'Write the relevant formula before substituting values to secure step marks.',
    ],
    importantFormulas: formulasList,
    derivations: [
      {
        theoremName: `Core Theorem of ${chapter.name}`,
        statement: `Fundamental structural law governing ${chapter.name}.`,
        given: `Standard mathematical configuration in Class ${chapter.grade}.`,
        toProve: `Identity and validity of the formula.`,
        proofSteps: [
          { step: 'State the given initial conditions and axioms.', reason: 'Hypothesis' },
          { step: 'Perform required algebraic substitution or geometric construction.', reason: 'Standard rules' },
          { step: 'Deduce the final equivalence.', reason: 'Logical deduction' },
        ],
        conclusion: 'Hence verified and proven.',
      },
    ],
    solvedExamples: allExamples.length > 0 ? allExamples : [
      {
        exampleNumber: 1,
        difficulty: 'Standard',
        problem: `Standard illustrative problem on ${chapter.name}.`,
        givenAndRequired: 'Identify given parameters and unknown target.',
        steps: [
          {
            stepNumber: 1,
            description: 'Write down the standard formula and known values.',
            whyThisStep: 'CBSE step marking scheme allocates credit for formula specification.',
          },
          {
            stepNumber: 2,
            description: 'Substitute values with proper units and simplify.',
            whyThisStep: 'Carry out arithmetic operations methodically.',
          },
        ],
        finalAnswer: 'Computed final solution.',
        examTip: 'Box your final answer and verify with units.',
      },
    ],
    visualExplanations: [
      {
        title: `Visual Representation of ${chapter.name}`,
        description: `Geometric or graphical representation illustrating how ${chapter.name} behaves on the Cartesian coordinate plane or geometric figures.`,
        diagramType: 'coordinate',
        diagramCaption: `Illustration for Class ${chapter.grade} ${chapter.name}.`,
      },
    ],
    realLifeApplications: applicationsList.length > 0 ? applicationsList : [
      {
        field: 'Engineering & Construction',
        useCase: 'Structural and spatial calculations',
        example: `Engineers use principles of ${chapter.name} for planning, material calculations, and stability testing.`,
      },
      {
        field: 'Technology & Computing',
        useCase: 'Algorithmic models',
        example: `Software applications utilize ${chapter.name} for coordinate plotting, physics engines, and graphics rendering.`,
      },
    ],
    stemEconomicsConnections: [
      {
        domain: 'Physics',
        connection: `Physical systems and vector measurements directly implement the mathematics of ${chapter.name}.`,
      },
      {
        domain: 'Economics',
        connection: `Economic optimization, cost-benefit functions, and data projections depend on these core mathematical structures.`,
      },
    ],
    historyOfMathematics: {
      period: 'Classical & Renaissance Mathematical Eras',
      story: `The concepts of ${chapter.name} developed over centuries through international collaboration across ancient India, Greece, the Islamic Golden Age, and European Renaissance, progressively formalizing into modern mathematics.`,
      keyFigures: ['Euclid', 'Aryabhata', 'Brahmagupta', 'Bhaskara II', 'Rene Descartes', 'Carl Friedrich Gauss'],
    },
    indianMathematiciansContributions: [
      {
        scholar: 'Aryabhata (476–550 CE)',
        era: 'Classical Golden Age',
        work: 'Aryabhatiya',
        contribution: 'Pioneered algebraic methodologies, trigonometry table foundations, and accurate astronomical calculations.',
      },
      {
        scholar: 'Brahmagupta (598–668 CE)',
        era: 'Ujjain Observatory',
        work: 'Brahmasphutasiddhanta',
        contribution: 'Formulated operational rules for zero, negative numbers, and quadratic equations.',
      },
      {
        scholar: 'Bhaskara II (1114–1185 CE)',
        era: 'Medieval Period',
        work: 'Siddhanta Siromani (Lilavati, Bijaganita)',
        contribution: 'Advanced systematic algebra, solutions of indeterminate equations, and early infinitesimal concepts.',
      },
    ],
    commonMistakes: allMistakes.length > 0 ? allMistakes : [
      {
        mistakeDescription: 'Incorrect unit conversions during multi-step problems.',
        incorrectAttempt: 'Mixing centimeters and meters directly without conversion.',
        correctMethod: 'Always convert all measurements to standard SI units before applying formulas.',
        pedagogicalAdvice: 'Write units explicitly beside every number in calculation steps.',
      },
    ],
    examTipsAndMarkingScheme: [
      {
        tip: 'Write the governing formula first with correct symbols before substituting numerical values.',
        weightageAdvice: 'CBSE marking criteria designate 1/2 to 1 mark specifically for the formula step.',
      },
      {
        tip: 'Double check arithmetic calculations and write clear conclusion statements with units.',
        weightageAdvice: 'Final answer without units may incur a 1/2 mark penalty.',
      },
    ],
    importantQuestionTypes: [
      {
        category: '1-Mark MCQ',
        typicalQuestion: `Direct formula or property evaluation for ${chapter.name}.`,
        strategy: 'Recall definitions and properties quickly without lengthy calculations.',
      },
      {
        category: '2-Mark Short Answer',
        typicalQuestion: `Direct 2-step numerical or conceptual question on ${chapter.name}.`,
        strategy: 'State formula, substitute values, compute and verify.',
      },
      {
        category: '4-Mark Case-Study',
        typicalQuestion: `Real-life practical scenario applying ${chapter.name} in architecture, sports, or nature.`,
        strategy: 'Extract given data from context, identify corresponding mathematical parameters, and solve each sub-part systematically.',
      },
    ],
    quickRevisionKeyPoints: [
      ...chapter.topics.flatMap(t => t.quickRevisionSummary).slice(0, 8),
      'Verify all units and check answers with reverse substitution when possible.',
    ],
    chapterSummary:
      chapter.overview ||
      `Chapter ${chapter.order}: ${chapter.name} provides students with foundational competencies, connecting formal proofs, practical applications, and examination techniques.`,
    practiceQuestions: chapter.topics.flatMap((t, idx) =>
      t.importantQuestions.map((q, qIdx) => ({
        id: `pq_${chapter.id}_${idx}_${qIdx}`,
        question: q,
        type: 'Short' as const,
        hint: `Apply concepts from section ${t.name}.`,
        answer: 'Refer to step-by-step solved methodology above.',
      }))
    ),
  };
}
