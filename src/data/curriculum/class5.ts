import { Chapter } from '../../types';

export const CLASS_5_CHAPTERS: Chapter[] = [
  {
    id: 'c5_ch1',
    grade: 5,
    order: 1,
    name: 'The Fish Tale',
    hindiName: 'मछली उछली',
    description: 'Large numbers, place values up to Lakhs and Crores, speed, distance, time, and money calculations in fishing contexts.',
    overview: 'Introduces numbers up to 1 Crore through engaging stories. Practice practical multiplication, division, speed = distance / time, and business profit/loss calculations.',
    weightageMarks: 10,
    keyFormulasCount: 2,
    totalQuestionsCount: 12,
    badge: 'Number Concepts',
    topics: [
      {
        id: 'c5_ch1_t1',
        name: 'Large Numbers, Speed and Distance',
        concepts: [
          '1 Lakh = 1,00,000 (1 followed by 5 zeroes).',
          '1 Crore = 1,00,00,000 (1 followed by 7 zeroes).',
          'Distance = Speed × Time; Time = Distance / Speed.',
          'Calculating total catch and price: Total Price = Weight (kg) × Rate per kg.',
        ],
        definitions: [
          {
            term: 'Lakh',
            definition: 'One hundred thousand (100,000) in the Indian number system.',
          },
        ],
        properties: ['There are 100 Lakhs in 1 Crore.'],
        importantFormulas: [
          '\\text{Distance} = \\text{Speed} \\times \\text{Time}',
          '\\text{Time} = \\frac{\\text{Distance}}{\\text{Speed}}',
        ],
        solvedExamples: [
          {
            id: 'c5_ex1',
            title: 'Motor Boat Speed Calculation',
            problem: 'A motor boat travels at a speed of 20 km per hour. How far would the motor boat go in three and a half hours?',
            solutionSteps: [
              'Step 1: Distance = Speed × Time.',
              'Step 2: Speed = 20 km/h, Time = 3.5 hours.',
              'Step 3: In 3 hours it goes: 20 × 3 = 60 km.',
              'Step 4: In half an hour it goes: 20 / 2 = 10 km.',
              'Step 5: Total distance = 60 + 10 = 70 km.',
            ],
            finalAnswer: '70 km',
          },
        ],
        applications: ['Travel planning, market shopping estimations.'],
        commonMistakes: [
          {
            mistake: 'Counting 6 zeroes in 1 Lakh.',
            correction: '1 Lakh has 5 zeroes: 1,00,000.',
            why: '100 × 1000 = 100,000 (five zeroes).',
          },
        ],
        importantQuestions: ['If a fisherman catches 40 kg of fish every trip and earns ₹60 per kg, how much will he earn in 5 trips?'],
        quickRevisionSummary: [
          '1 Lakh = 100 thousands (5 zeroes).',
          '1 Crore = 100 Lakhs (7 zeroes).',
          'Distance = Speed × Time.',
        ],
      },
    ],
  },
  {
    id: 'c5_ch4',
    grade: 5,
    order: 2,
    name: 'Parts and Wholes',
    hindiName: 'हिस्से और पूरे',
    description: 'Fractions of a collection and shape, equivalent fractions, comparing fractions, dividing into equal parts.',
    overview: 'Learn fractions as parts of a whole or set. Understand numerator, denominator, half (1/2), quarter (1/4), three-quarters (3/4), and equivalent fractions.',
    weightageMarks: 10,
    keyFormulasCount: 2,
    totalQuestionsCount: 12,
    badge: 'Fractions',
    topics: [
      {
        id: 'c5_ch4_t1',
        name: 'Understanding Fractions & Equivalent Fractions',
        concepts: [
          'Fraction = Numerator / Denominator (Parts considered / Total equal parts).',
          'Equivalent fractions represent the same portion of a whole (e.g. 1/2 = 2/4 = 4/8).',
          'Finding fraction of a quantity: (Numerator / Denominator) × Quantity.',
        ],
        definitions: [
          {
            term: 'Fraction',
            definition: 'A number representing a part of a whole or a collection of objects.',
          },
        ],
        properties: ['Multiplying or dividing both numerator and denominator by the same non-zero number produces an equivalent fraction.'],
        importantFormulas: [
          '\\frac{a}{b} = \\frac{a \\times k}{b \\times k}',
        ],
        solvedExamples: [
          {
            id: 'c5_frac_ex1',
            title: 'Fraction of a Group',
            problem: 'There are 20 stars in a box. 1/4 of them are colored red. How many stars are red?',
            solutionSteps: [
              'Step 1: Number of red stars = (1/4) of 20.',
              'Step 2: Divide total stars by denominator: 20 ÷ 4 = 5.',
              'Step 3: Multiply by numerator: 5 × 1 = 5 red stars.',
            ],
            finalAnswer: '5 stars',
          },
        ],
        applications: ['Sharing food portions, measuring recipe ingredients, clock quarter-hours.'],
        commonMistakes: [
          {
            mistake: 'Adding denominators when adding like fractions: 1/4 + 2/4 = 3/8.',
            correction: 'Only add numerators: 1/4 + 2/4 = 3/4. The denominator stays unchanged.',
            why: 'The size of each piece (fourths) has not changed, only the count of pieces.',
          },
        ],
        importantQuestions: ['Write three equivalent fractions of 2/5.'],
        quickRevisionSummary: [
          'Numerator = count of parts taken; Denominator = total equal parts.',
          'To make equivalent fractions, multiply numerator and denominator by the same number.',
        ],
      },
    ],
  },
  {
    id: 'c5_ch11',
    grade: 5,
    order: 3,
    name: 'Area and its Boundary',
    hindiName: 'क्षेत्रफल और उसका घेरा',
    description: 'Perimeter (boundary) of squares and rectangles, area of squares and rectangles, practical tiling problems.',
    overview: 'Differentiate between the boundary (perimeter) and the surface enclosed (area). Discover formulas: Perimeter of rectangle = 2(l + b), Area = l × b, and tile fitting.',
    weightageMarks: 10,
    keyFormulasCount: 4,
    totalQuestionsCount: 12,
    badge: 'Mensuration',
    topics: [
      {
        id: 'c5_ch11_t1',
        name: 'Perimeter and Area of Rectangles and Squares',
        concepts: [
          'Perimeter is the length of the boundary around a closed figure.',
          'Perimeter of Rectangle = 2 × (Length + Breadth).',
          'Perimeter of Square = 4 × Side.',
          'Area is the amount of surface enclosed by a closed figure.',
          'Area of Rectangle = Length × Breadth.',
          'Area of Square = Side × Side.',
        ],
        definitions: [
          {
            term: 'Perimeter',
            definition: 'The total distance around the outside boundary of a two-dimensional shape.',
          },
          {
            term: 'Area',
            definition: 'The measurement of the surface space enclosed within a boundary, measured in square units.',
          },
        ],
        properties: ['Two shapes can have the same perimeter but different areas.'],
        importantFormulas: [
          '\\text{Perimeter of Rectangle} = 2(l + b)',
          '\\text{Area of Rectangle} = l \\times b',
          '\\text{Area of Square} = \\text{side}^2',
        ],
        solvedExamples: [
          {
            id: 'c5_area_ex1',
            title: 'Fencing and Tiling a Garden',
            problem: 'A rectangular garden is 12 m long and 8 m wide. (a) Find length of fence needed. (b) Find area of garden.',
            solutionSteps: [
              'Step 1: Length of fence = Perimeter = 2 × (l + b) = 2 × (12 + 8) = 2 × 20 = 40 m.',
              'Step 2: Area of garden = Length × Breadth = 12 × 8 = 96 sq m.',
            ],
            finalAnswer: 'Fence = 40 m, Area = 96 sq m',
          },
        ],
        applications: ['Carpet sizing, garden fencing, picture framing.'],
        commonMistakes: [
          {
            mistake: 'Using linear units (cm or m) for area instead of square units (sq cm or cm²).',
            correction: 'Area is always expressed in square units (e.g. cm², m²).',
            why: 'Area measures two-dimensional surface coverage.',
          },
        ],
        importantQuestions: ['A square carrom board has a perimeter of 320 cm. How much is its area?'],
        quickRevisionSummary: [
          'Perimeter = distance around edge.',
          'Rectangle: P = 2(l + b), Area = l × b.',
          'Square: P = 4s, Area = s × s.',
        ],
      },
    ],
  },
];
