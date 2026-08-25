export const FORMULAS = [
  {
    id: 'f1',
    category: 'Quantitative Aptitude',
    topic: 'Percentages & Profit Loss',
    title: 'Profit, Loss & Markup Formulas',
    formula: 'Profit % = (Profit / CP) × 100 | Discount % = (Discount / MP) × 100',
    explanation: 'Cost Price (CP), Selling Price (SP), Marked Price (MP). Profit = SP - CP. Loss = CP - SP. Discount = MP - SP.',
    example: 'If an item bought for $80 is sold for $100, Profit % = (20/80) × 100 = 25%.',
    shortcut: 'If CP of X items = SP of Y items, then Profit % = ((X - Y)/Y) × 100.'
  },
  {
    id: 'f2',
    category: 'Quantitative Aptitude',
    topic: 'Speed, Distance & Time',
    title: 'Relative Speed & Average Speed',
    formula: 'Avg Speed = 2XY / (X + Y) [For equal distances] | Relative Speed (Opposite) = S1 + S2',
    explanation: 'When two objects move in opposite directions, add their speeds. When moving in the same direction, subtract them.',
    example: 'A car goes at 60 km/h and returns at 40 km/h. Avg speed = 2(60)(40)/(60+40) = 48 km/h.',
    shortcut: 'Convert km/h to m/s by multiplying with 5/18. Convert m/s to km/h by multiplying with 18/5.'
  },
  {
    id: 'f3',
    category: 'Quantitative Aptitude',
    topic: 'Work & Time',
    title: 'Combined Work Rate Formula',
    formula: 'Combined Rate = 1/A + 1/B | Days together = (A × B) / (A + B)',
    explanation: 'If A completes a job in A days and B completes it in B days, one day work is (1/A + 1/B).',
    example: 'A takes 10 days, B takes 15 days. Together = (10 × 15) / (10 + 15) = 150 / 25 = 6 days.',
    shortcut: 'M1 × D1 × H1 / W1 = M2 × D2 × H2 / W2 (Chain Rule for workers, days, hours, and work units).'
  },
  {
    id: 'f4',
    category: 'Quantitative Aptitude',
    topic: 'Permutations & Combinations',
    title: 'nPr and nCr Formulas',
    formula: 'nPr = n! / (n - r)! | nCr = n! / [r! × (n - r)!]',
    explanation: 'Use Permutation (nPr) when order MATTERS (e.g. secret code, arrangements). Use Combination (nCr) when order DOES NOT matter (e.g. selecting a team).',
    example: 'Select 3 students out of 5: 5C3 = 5 × 4 × 3 / (3 × 2 × 1) = 10 ways.',
    shortcut: 'nCr = nC(n-r). E.g., 100C98 = 100C2 = (100 × 99)/2 = 4950.'
  },
  {
    id: 'f5',
    category: 'Quantitative Aptitude',
    topic: 'Probability',
    title: 'Basic Probability & Odds',
    formula: 'P(A) = Favorable Outcomes / Total Outcomes | P(A or B) = P(A) + P(B) - P(A ∩ B)',
    explanation: '0 ≤ P(A) ≤ 1. Probability of impossible event is 0, certain event is 1.',
    example: 'Rolling an even number on a 6-sided die: 3/6 = 1/2 = 0.5.',
    shortcut: 'Complement rule: P(At least one) = 1 - P(None).'
  },
  {
    id: 'f6',
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    title: 'Standard Generation Table & Symbols',
    formula: '(+) = Male, (-) = Female, (=) = Married, (-) = Siblings, (|) = Generation Gap',
    explanation: 'Break down complex relationships by converting sentence fragments step-by-step from right to left.',
    example: '"Pointing to a photo, X said: He is the son of my father\'s only daughter." => father\'s only daughter = self or sister; son = nephew or son.',
    shortcut: 'Always assign genders (+ or -) first to avoid confusion with unisex names.'
  },
  {
    id: 'f7',
    category: 'Logical Reasoning',
    topic: 'Syllogisms',
    title: 'Euler Diagram & Venn Rules',
    formula: 'All A are B (A ⊂ B) | No A is B (A ∩ B = ∅) | Some A are B (A ∩ B ≠ ∅)',
    explanation: 'A conclusion is valid ONLY if it follows in EVERY possible Venn Diagram construction.',
    example: 'Statements: All Dogs are Cats. All Cats are Animals. => Conclusion: All Dogs are Animals (DEFINITELY TRUE).',
    shortcut: 'If both premises are affirmative ("All" or "Some"), negative conclusions ("No" or "Some not") CANNOT be definite.'
  },
  {
    id: 'f8',
    category: 'Verbal Ability',
    topic: 'Grammar Rules',
    title: 'Subject-Verb Agreement & Parallelism',
    formula: 'Singular Subject + Singular Verb | Plural Subject + Plural Verb',
    explanation: 'Words joined to a singular subject by "with", "along with", "together with", "as well as" do not affect verb number.',
    example: 'Incorrect: The manager along with his staff were present. Correct: ...was present.',
    shortcut: 'Either...or / Neither...nor: Verb agrees with the subject NEAREST to it.'
  },
  {
    id: 'f9',
    category: 'Data Interpretation',
    topic: 'Data Analysis',
    title: 'Percentage Change & Ratio Tricks',
    formula: '% Increase = [(New Value - Old Value) / Old Value] × 100',
    explanation: 'When comparing pie charts or bar graphs, convert ratios to percentages for quick visual comparison.',
    example: 'Sales grew from 400 to 500: % Change = (100 / 400) × 100 = 25%.',
    shortcut: 'Approximation trick: Round 498/998 to 500/1000 = 50% for fast mental estimation in DI.'
  },
  {
    id: 'f10',
    category: 'Technical CS',
    topic: 'Data Structures & Algorithms',
    title: 'Big-O Time Complexities Cheat Sheet',
    formula: 'O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2ⁿ)',
    explanation: 'Array lookup by index: O(1). Binary Search: O(log N). Linear Search: O(N). Merge/Quick Sort: O(N log N). Nested Loops: O(N²).',
    example: 'Binary Search on 1,000,000 sorted elements takes max ~20 comparisons (log₂ 10⁶ ≈ 20).',
    shortcut: 'Master Theorem for T(n) = aT(n/b) + f(n) enables quick recurrence relation bounds.'
  },
  {
    id: 'f11',
    category: 'Cybersecurity & NetSec',
    topic: 'Network Security',
    title: 'Essential Cyber Port Numbers Cheat Sheet',
    formula: 'FTP: 21 | SSH: 22 | DNS: 53 | HTTP: 80 | HTTPS: 443 | RDP: 3389',
    explanation: 'Known network ports assigned by IANA for core protocols used in vulnerability scanning and firewall rules.',
    example: 'A web server running HTTPS communicates securely over TCP port 443.',
    shortcut: 'Remember 80 vs 443: Port 80 is HTTP (plain text), Port 443 is HTTPS (encrypted with SSL/TLS).'
  },
  {
    id: 'f12',
    category: 'Cybersecurity & NetSec',
    topic: 'Cryptography',
    title: 'Symmetric vs Asymmetric Encryption Rules',
    formula: 'Symmetric: 1 Shared Key | Asymmetric: Public Key (Encrypt) + Private Key (Decrypt)',
    explanation: 'Symmetric algorithms (AES, 3DES) are extremely fast for bulk data. Asymmetric algorithms (RSA, ECC) handle key distribution & digital signatures.',
    example: 'TLS handshake uses Asymmetric RSA/ECC to exchange a Symmetric AES session key.',
    shortcut: 'CIA Triad: Confidentiality (Encryption), Integrity (Hashing/MAC), Availability (Redundancy/DDoS defense).'
  }
];
