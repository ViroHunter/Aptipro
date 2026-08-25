export const CATEGORIES = [
  'Quantitative Aptitude',
  'Logical Reasoning',
  'Verbal Ability',
  'Data Interpretation',
  'Technical CS',
  'Cybersecurity & NetSec'
];

export const QUESTIONS = [
  // --- Quantitative Aptitude ---
  {
    id: 'q1',
    category: 'Quantitative Aptitude',
    topic: 'Percentages & Profit Loss',
    difficulty: 'Easy',
    question: 'A shopkeeper marks an item 40% above the cost price and gives a discount of 20% on the marked price. What is the net profit percentage?',
    options: ['12%', '15%', '18%', '20%'],
    correctIndex: 0,
    explanation: 'Let Cost Price (CP) = $100.\nMarked Price (MP) = 100 + 40% of 100 = $140.\nSelling Price (SP) = 140 - 20% of 140 = 140 - 28 = $112.\nNet Profit = SP - CP = 112 - 100 = $12.\nNet Profit % = (12 / 100) × 100 = 12%.'
  },
  {
    id: 'q2',
    category: 'Quantitative Aptitude',
    topic: 'Speed, Distance & Time',
    difficulty: 'Medium',
    question: 'A train 150 meters long crosses a pole in 9 seconds. How long will it take to cross a platform 250 meters long at the same speed?',
    options: ['15 seconds', '20 seconds', '24 seconds', '30 seconds'],
    correctIndex: 2,
    explanation: 'Speed of train = Length of train / time taken to cross pole = 150m / 9s = 50/3 m/s.\nTotal distance to cross platform = Length of train + Length of platform = 150m + 250m = 400m.\nTime required = Total distance / Speed = 400 / (50/3) = (400 × 3) / 50 = 24 seconds.'
  },
  {
    id: 'q3',
    category: 'Quantitative Aptitude',
    topic: 'Work & Time',
    difficulty: 'Medium',
    question: 'A can complete a project in 12 days, and B can complete it in 18 days. They start working together, but A leaves 3 days before the work is finished. In how many total days was the work completed?',
    options: ['8 days', '9 days', '10 days', '11 days'],
    correctIndex: 1,
    explanation: 'Work rates per day: A = 1/12, B = 1/18.\nLet total days taken = T.\nA worked for (T - 3) days and B worked for T days.\nWork done by A + Work done by B = 1\n(T - 3)/12 + T/18 = 1\nLCM of 12 and 18 is 36.\n3(T - 3) + 2T = 36\n3T - 9 + 2T = 36\n5T = 45 => T = 9 days.'
  },
  {
    id: 'q4',
    category: 'Quantitative Aptitude',
    topic: 'Permutations & Combinations',
    difficulty: 'Hard',
    question: 'In how many different ways can the letters of the word "APTITUDE" be arranged such that all the vowels always come together?',
    options: ['1,440', '2,880', '4,320', '5,760'],
    correctIndex: 2,
    explanation: 'Word: "APTITUDE"\nTotal letters = 8.\nVowels in the word = A, I, U, E (4 vowels).\nConsonants = P, T, T, D (4 consonants with "T" repeating 2 times).\n\nStep 1: Group all 4 vowels as a single entity: (AIUE).\nNow entities to arrange = 4 consonants + 1 vowel group = 5 entities.\nNumber of ways to arrange 5 entities with 2 identical T\'s = 5! / 2! = 120 / 2 = 60 ways.\n\nStep 2: Arrange the 4 distinct vowels inside the vowel group = 4! = 24 ways.\n\nTotal arrangements = 60 × 24 = 4,320 ways.'
  },
  {
    id: 'q5',
    category: 'Quantitative Aptitude',
    topic: 'Probability',
    difficulty: 'Easy',
    question: 'Two fair dice are thrown simultaneously. What is the probability that the sum of the numbers appearing on top is a multiple of 4?',
    options: ['1/4', '5/12', '1/3', '7/36'],
    correctIndex: 0,
    explanation: 'Total possible outcomes when 2 dice are thrown = 6 × 6 = 36.\nSum can be 2, 3, 4, ..., 12.\nMultiples of 4 between 2 and 12 are 4, 8, and 12.\n\nOutcomes with sum 4: (1,3), (2,2), (3,1) -> 3 outcomes\nOutcomes with sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) -> 5 outcomes\nOutcomes with sum 12: (6,6) -> 1 outcome\n\nTotal favorable outcomes = 3 + 5 + 1 = 9.\nProbability = 9 / 36 = 1/4.'
  },
  {
    id: 'q5_2',
    category: 'Quantitative Aptitude',
    topic: 'Averages & Ratios',
    difficulty: 'Easy',
    question: 'The average weight of 8 men is increased by 2.5 kg when a new man comes in place of one of them weighing 65 kg. What is the weight of the new man?',
    options: ['75 kg', '85 kg', '82.5 kg', '90 kg'],
    correctIndex: 1,
    explanation: 'Increase in total weight = 8 × 2.5 kg = 20 kg.\nWeight of the new man = Weight of replaced man + Increase in total weight = 65 kg + 20 kg = 85 kg.'
  },
  {
    id: 'q5_3',
    category: 'Quantitative Aptitude',
    topic: 'Simple & Compound Interest',
    difficulty: 'Medium',
    question: 'A sum of money compounded annually doubles itself in 5 years. In how many years will it become 8 times itself at the same compound interest rate?',
    options: ['10 years', '12 years', '15 years', '20 years'],
    correctIndex: 2,
    explanation: 'Under compound interest:\nPrincipal becomes 2 times in 5 years.\nTo become 8 times (which is 2³ times):\nTime taken = 3 × 5 years = 15 years.'
  },
  {
    id: 'q5_4',
    category: 'Quantitative Aptitude',
    topic: 'Mixture & Alligation',
    difficulty: 'Hard',
    question: 'In what ratio must water be mixed with milk costing $12 per liter so that the mixture is worth $9 per liter?',
    options: ['1 : 3', '1 : 4', '2 : 5', '3 : 4'],
    correctIndex: 0,
    explanation: 'By Rule of Alligation:\nCost of Water = $0, Cost of Milk = $12, Mean Price = $9.\nRatio of Water to Milk = (Cost of Milk - Mean Price) : (Mean Price - Cost of Water)\nRatio = (12 - 9) : (9 - 0) = 3 : 9 = 1 : 3.'
  },

  // --- Logical Reasoning ---
  {
    id: 'q6',
    category: 'Logical Reasoning',
    topic: 'Number & Letter Series',
    difficulty: 'Easy',
    question: 'Find the missing term in the sequence: 7, 13, 25, 49, 97, ?',
    options: ['181', '193', '195', '201'],
    correctIndex: 2,
    explanation: 'Observe the pattern between consecutive terms:\n7 × 2 - 1 = 13\n13 × 2 - 1 = 25\n25 × 2 - 1 = 49\n49 × 2 - 1 = 97\n97 × 2 - 1 = 194 - 1 = 195.\nHence, the missing term is 195.'
  },
  {
    id: 'q7',
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    difficulty: 'Medium',
    question: 'Pointing to a gentleman, Deepak said, "His only brother is the father of my daughter\'s father." How is the gentleman related to Deepak?',
    options: ['Father', 'Uncle', 'Brother', 'Grandfather'],
    correctIndex: 1,
    explanation: 'Break down the statement from Deepak\'s perspective:\n- "My daughter\'s father" = Deepak himself.\n- "Father of my daughter\'s father" = Deepak\'s father.\n- "His only brother is the father of my daughter\'s father" => The gentleman\'s only brother is Deepak\'s father.\n- Therefore, the gentleman is Deepak\'s Father\'s brother, which means he is Deepak\'s Uncle.'
  },
  {
    id: 'q8',
    category: 'Logical Reasoning',
    topic: 'Coding-Decoding',
    difficulty: 'Medium',
    question: 'In a certain code language, "SYSTEM" is written as "SYSMET" and "NEARER" is written as "AENRER". How will "FRACTION" be written in that code?',
    options: ['CARFNOIT', 'NOITCARF', 'CARFTINO', 'ARFCNOIT'],
    correctIndex: 0,
    explanation: 'Pattern analysis:\n- "SYSTEM" (6 letters) is split into two halves: "SYS" and "TEM".\n- First half "SYS" remains "SYS" (reversed or middle fixed).\n- Second half "TEM" is reversed to "MET". Result: SYSMET.\n- "NEARER" split into "NEA" and "RER" -> "NEA" reversed is "AEN", "RER" reversed is "RER" -> AENRER.\n\nNow for "FRACTION" (8 letters):\n- First 4 letters: "FRAC" reversed becomes "CARF".\n- Last 4 letters: "TION" reversed becomes "NOIT".\n- Combined: "CARFNOIT".'
  },
  {
    id: 'q9',
    category: 'Logical Reasoning',
    topic: 'Syllogisms',
    difficulty: 'Hard',
    question: 'Statements:\n1. All computers are laptops.\n2. Some laptops are smartphones.\n3. No smartphone is a tablet.\n\nConclusions:\nI. Some computers being smartphones is a possibility.\nII. No tablet is a laptop.',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both conclusions I & II follow', 'Neither conclusion follows'],
    correctIndex: 0,
    explanation: 'Analysis:\n- Statement 1: All computers are inside Laptops.\n- Statement 2: Laptops overlap with Smartphones.\n- Statement 3: Smartphones and Tablets are disjoint.\n\nConclusion I: "Some computers being smartphones is a possibility". Since computers are inside laptops and laptops overlap with smartphones, computers CAN overlap with smartphones without violating any rule. Hence, it is a valid possibility! (Follows)\n\nConclusion II: "No tablet is a laptop". There is no rule stopping Tablets from overlapping with the non-smartphone portion of Laptops. Hence, this statement is not definitely true. (Does not follow)\n\nAnswer: Only conclusion I follows.'
  },
  {
    id: 'q9_2',
    category: 'Logical Reasoning',
    topic: 'Direction Sense',
    difficulty: 'Easy',
    question: 'A person walks 5 km North, turns Right and walks 3 km, then turns Right and walks 5 km. In which direction and how far is he from the starting point?',
    options: ['3 km East', '5 km West', '3 km South', '8 km East'],
    correctIndex: 0,
    explanation: 'Path breakdown:\n1. North: 5 km (+Y)\n2. Right (East): 3 km (+X)\n3. Right (South): 5 km (-Y)\nNet Y movement = 5 - 5 = 0 km.\nNet X movement = 3 km East.\nDistance = 3 km East of starting point.'
  },
  {
    id: 'q9_3',
    category: 'Logical Reasoning',
    topic: 'Clocks & Calendars',
    difficulty: 'Medium',
    question: 'At what angle are the hands of a clock inclined at 15 minutes past 3 o\'clock?',
    options: ['0°', '7.5°', '12°', '15°'],
    correctIndex: 1,
    explanation: 'At 3:15:\nMinute hand is exactly at 15 minutes mark (90°).\nHour hand moves 0.5° per minute.\nIn 15 minutes, hour hand moves = 15 × 0.5° = 7.5° past 3 (90° + 7.5° = 97.5°).\nAngle difference = 97.5° - 90° = 7.5°.'
  },

  // --- Verbal Ability ---
  {
    id: 'q10',
    category: 'Verbal Ability',
    topic: 'Sentence Correction',
    difficulty: 'Easy',
    question: 'Choose the grammatically correct sentence from the following options:',
    options: [
      'Neither the manager nor the employees was present at the meeting.',
      'Neither the manager nor the employees were present at the meeting.',
      'Neither the manager nor the employees is present at the meeting.',
      'Neither the manager or the employees were present at the meeting.'
    ],
    correctIndex: 1,
    explanation: 'Rule of Subject-Verb Agreement with "Neither...nor":\nWhen two subjects are joined by "neither...nor", the verb agrees with the subject closest to it.\nHere, the closest subject to the verb is "the employees" (plural).\nTherefore, the plural verb "were" must be used.\nCorrect sentence: "Neither the manager nor the employees were present at the meeting."'
  },
  {
    id: 'q11',
    category: 'Verbal Ability',
    topic: 'Synonyms & Antonyms',
    difficulty: 'Medium',
    question: 'Select the word most NEARLY OPPOSITE in meaning to "METICULOUS":',
    options: ['Careful', 'Sloppy', 'Scrupulous', 'Detailed'],
    correctIndex: 1,
    explanation: '"Meticulous" means showing great attention to detail; careful and precise.\nSynonyms: Careful, Scrupulous, Detailed, Painstaking.\nAntonyms: Sloppy, Careless, Negligent.\nTherefore, the opposite in meaning is "Sloppy".'
  },
  {
    id: 'q12',
    category: 'Verbal Ability',
    topic: 'Para Jumbles',
    difficulty: 'Hard',
    question: 'Rearrange the sentences (P, Q, R, S) into a coherent paragraph:\nP: This rapid digitization has transformed traditional business operations.\nQ: Over the past decade, cloud computing has experienced exponential growth.\nR: Consequently, cybersecurity has become a paramount priority for organizations worldwide.\nS: Companies of all sizes now rely heavily on remote server networks.',
    options: ['Q - S - P - R', 'Q - P - S - R', 'S - Q - P - R', 'P - Q - S - R'],
    correctIndex: 0,
    explanation: 'Logical Ordering:\n- Q introduces the central topic ("Cloud computing growth over the past decade") -> Opening sentence Q.\n- S elaborates on cloud computing usage ("Companies of all sizes now rely on remote server networks").\n- P summarizes the effect of this shift ("This rapid digitization has transformed traditional operations").\n- R concludes with the consequence ("Consequently, cybersecurity has become a paramount priority").\nSequence: Q - S - P - R.'
  },
  {
    id: 'q12_2',
    category: 'Verbal Ability',
    topic: 'Idioms & Phrases',
    difficulty: 'Easy',
    question: 'What is the meaning of the idiom "To burn the midnight oil"?',
    options: ['To waste electricity', 'To work or study late into the night', 'To start a fire accidentally', 'To cause trouble'],
    correctIndex: 1,
    explanation: '"To burn the midnight oil" means to study or work hard late into the night.'
  },

  // --- Data Interpretation ---
  {
    id: 'q13',
    category: 'Data Interpretation',
    topic: 'Data Analysis',
    difficulty: 'Medium',
    question: 'In a company of 500 employees, 60% are male. Among the female employees, 40% are in managerial roles. How many female employees are in non-managerial roles?',
    options: ['80', '120', '140', '160'],
    correctIndex: 1,
    explanation: 'Total employees = 500.\nMale employees = 60% of 500 = 300.\nFemale employees = 500 - 300 = 200 (or 40% of 500 = 200).\nFemale managers = 40% of 200 = 80.\nFemale non-managers = Total females - Female managers = 200 - 80 = 120.'
  },
  {
    id: 'q13_2',
    category: 'Data Interpretation',
    topic: 'Pie Chart Analysis',
    difficulty: 'Medium',
    question: 'A pie chart shows monthly household expenditure: Food = 35%, Rent = 25%, Education = 20%, Savings = 20%. If total monthly income is $4,000, how much more is spent on Food than Education?',
    options: ['$400', '$600', '$800', '$1,000'],
    correctIndex: 1,
    explanation: 'Food % = 35%, Education % = 20%.\nDifference = 35% - 20% = 15%.\nDollar difference = 15% of $4,000 = (15 / 100) × 4000 = $600.'
  },

  // --- Technical CS ---
  {
    id: 'q14',
    category: 'Technical CS',
    topic: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    question: 'What is the worst-case time complexity of QuickSort when bad pivot selection occurs (e.g. sorted array with first element as pivot)?',
    options: ['O(N log N)', 'O(N)', 'O(N²)', 'O(log N)'],
    correctIndex: 2,
    explanation: 'Worst-case in QuickSort occurs when the pivot chosen consistently divides the array into unbalanced partitions (e.g., 0 elements and N-1 elements).\nIn this case, the recurrence relation becomes T(N) = T(N-1) + O(N), which solves to O(N²).\nNote: Average-case time complexity is O(N log N).'
  },
  {
    id: 'q15',
    category: 'Technical CS',
    topic: 'Operating Systems & DBMS',
    difficulty: 'Easy',
    question: 'Which SQL keyword is used to eliminate duplicate rows from the query result set?',
    options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'GROUP BY'],
    correctIndex: 1,
    explanation: 'The `SELECT DISTINCT` statement is used in SQL to return only distinct (different/unique) values by removing duplicate rows from the output.\nExample: `SELECT DISTINCT category FROM products;`'
  },
  {
    id: 'q15_2',
    category: 'Technical CS',
    topic: 'Computer Networks & OS',
    difficulty: 'Medium',
    question: 'Which scheduling algorithm can cause "Starvation" where low-priority processes may never get executed?',
    options: ['Round Robin (RR)', 'First-Come First-Served (FCFS)', 'Priority Scheduling', 'Shortest Remaining Time First (SRTF)'],
    correctIndex: 2,
    explanation: 'Priority Scheduling can cause starvation if high-priority processes continually enter the queue. Low-priority processes may wait indefinitely. Solution: Aging technique.'
  },

  // --- Cybersecurity & NetSec ---
  {
    id: 'q16',
    category: 'Cybersecurity & NetSec',
    topic: 'Network Security & Firewalls',
    difficulty: 'Easy',
    question: 'Which default network port is used for secure encrypted web traffic (HTTPS)?',
    options: ['Port 80', 'Port 22', 'Port 443', 'Port 8080'],
    correctIndex: 2,
    explanation: 'Standard Network Ports:\n- Port 80: HTTP (Unencrypted Web Traffic)\n- Port 22: SSH (Secure Shell)\n- Port 443: HTTPS (HTTP over TLS/SSL Encrypted)\n- Port 8080: HTTP Alternate / Proxy Server'
  },
  {
    id: 'q17',
    category: 'Cybersecurity & NetSec',
    topic: 'Web Attacks & Vulnerabilities',
    difficulty: 'Medium',
    question: 'An attacker injects malicious client-side JavaScript code into a vulnerable web page, which executes when another user views the page. What type of attack is this?',
    options: ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'Buffer Overflow'],
    correctIndex: 1,
    explanation: 'Definitions:\n- Cross-Site Scripting (XSS): Injecting malicious browser-executable scripts (JS) into trusted websites.\n- SQL Injection: Injecting database queries via user inputs.\n- CSRF: Forging unauthorized requests from a user trusted by an app.\n- Buffer Overflow: Overwriting adjacent memory addresses by sending excess data.'
  },
  {
    id: 'q18',
    category: 'Cybersecurity & NetSec',
    topic: 'Cryptography',
    difficulty: 'Hard',
    question: 'Which of the following statements accurately distinguishes Symmetric Encryption from Asymmetric Encryption?',
    options: [
      'Symmetric encryption uses two keys (Public & Private); Asymmetric uses one shared key.',
      'Symmetric encryption is computationally slower than Asymmetric encryption.',
      'Symmetric encryption uses the same key for encryption & decryption; Asymmetric uses a Public/Private key pair.',
      'Asymmetric encryption cannot be used for digital signatures or key exchanges.'
    ],
    correctIndex: 2,
    explanation: 'Key Cryptographic Concepts:\n- Symmetric Encryption (e.g. AES, DES): Uses a SINGLE shared secret key for both encryption and decryption. Faster and efficient for bulk data.\n- Asymmetric Encryption (e.g. RSA, ECC): Uses a KEY PAIR (Public key to encrypt, Private key to decrypt). Solves key distribution problems and provides non-repudiation.'
  },
  {
    id: 'q19',
    category: 'Cybersecurity & NetSec',
    topic: 'Malware & Information Security',
    difficulty: 'Medium',
    question: 'What fundamental property differentiates a cryptographic Hash function (e.g. SHA-256) from an Encryption algorithm (e.g. AES)?',
    options: [
      'Hash functions are one-way (irreversible), whereas encryption is two-way (decryption with key).',
      'Hash functions require a private key, while encryption requires no key.',
      'Encryption produces fixed-length outputs regardless of input size, while hash functions produce variable length.',
      'Hash functions can be decrypted using a master certificate.'
    ],
    correctIndex: 0,
    explanation: 'Key distinction:\n- Hashing: A one-way mathematical function that maps data of arbitrary size to a fixed bit string (digest). It cannot be inverted or decrypted (e.g., used for password storage & data integrity checks).\n- Encryption: A two-way transformation designed to scramble data so it can be safely decrypted back to plain text using a secret decryption key.'
  },
  {
    id: 'q20',
    category: 'Cybersecurity & NetSec',
    topic: 'Network Security & Firewalls',
    difficulty: 'Hard',
    question: 'At which layer of the OSI model does a Web Application Firewall (WAF) operate to inspect HTTP requests for attacks like SQLi and XSS?',
    options: ['Layer 3 (Network Layer)', 'Layer 4 (Transport Layer)', 'Layer 7 (Application Layer)', 'Layer 2 (Data Link Layer)'],
    correctIndex: 2,
    explanation: 'OSI Layer Inspection:\n- Layer 3 Firewalls: Filter based on IP addresses and ICMP packets.\n- Layer 4 Firewalls: Stateful inspection based on TCP/UDP ports.\n- Layer 7 (Application Layer) Firewalls / WAFs: Deep packet inspection of Layer 7 protocol payloads (HTTP/HTTPS headers, URLs, cookies, and POST bodies) to block web application exploits like SQL Injection and XSS.'
  },
  {
    id: 'q21',
    category: 'Cybersecurity & NetSec',
    topic: 'Network Security & Ports',
    difficulty: 'Easy',
    question: 'Which network protocol and port are commonly targeted for brute-force attacks on Linux servers for remote administrative access?',
    options: ['FTP (Port 21)', 'SSH (Port 22)', 'Telnet (Port 23)', 'SMTP (Port 25)'],
    correctIndex: 1,
    explanation: 'SSH (Secure Shell) on Port 22 is the standard protocol for encrypted remote command-line login. Attackers frequently scan and target Port 22 with automated password guessing (brute-force) attacks.'
  },
  {
    id: 'q22',
    category: 'Cybersecurity & NetSec',
    topic: 'Web Attacks & Vulnerabilities',
    difficulty: 'Medium',
    question: 'What is the primary defense against SQL Injection (SQLi) vulnerabilities in web applications?',
    options: [
      'Using Client-Side JavaScript Validation',
      'Using Parameterized Queries / Prepared Statements',
      'Enabling HTTPS on the web server',
      'Using strong admin passwords'
    ],
    correctIndex: 1,
    explanation: 'Parameterized Queries (Prepared Statements) ensure that user input is treated strictly as data parameters rather than executable SQL code, completely preventing SQL Injection.'
  }
];

// DYNAMIC INFINITE QUESTION GENERATOR
export const generateDynamicQuestion = (category = 'Quantitative Aptitude') => {
  const timestamp = Date.now();
  
  if (category === 'Cybersecurity & NetSec') {
    const ports = [
      { name: 'DNS (Domain Name System)', port: 53 },
      { name: 'RDP (Remote Desktop Protocol)', port: 3389 },
      { name: 'FTP (File Transfer Protocol)', port: 21 },
      { name: 'SMTP (Simple Mail Transfer)', port: 25 },
      { name: 'MySQL Database', port: 3306 }
    ];
    const item = ports[Math.floor(Math.random() * ports.length)];
    const fakePorts = [80, 443, 22, 8080, 110, 143].filter(p => p !== item.port).slice(0, 3);
    const opts = [...fakePorts, item.port].sort(() => 0.5 - Math.random());

    return {
      id: `dyn_${timestamp}`,
      category: 'Cybersecurity & NetSec',
      topic: 'Network Security & Ports',
      difficulty: 'Medium',
      question: `What is the standard IANA network port used by ${item.name}?`,
      options: opts.map(p => `Port ${p}`),
      correctIndex: opts.indexOf(item.port),
      explanation: `Standard Port Assignment: ${item.name} operates on default network Port ${item.port}.`
    };
  }

  // Quantitative dynamic generator (Percentages / Math)
  const val1 = Math.floor(Math.random() * 80) + 20;
  const val2 = Math.floor(Math.random() * 40) + 10;
  const answer = Math.round((val1 * val2) / 10);
  const fake1 = answer + 5;
  const fake2 = answer - 4;
  const fake3 = answer + 12;
  const opts = [answer, fake1, fake2, fake3].sort(() => 0.5 - Math.random());

  return {
    id: `dyn_${timestamp}`,
    category: 'Quantitative Aptitude',
    topic: 'Dynamic Numerical Reasoning',
    difficulty: 'Medium',
    question: `Calculate ${val2}% of ${val1 * 10}:`,
    options: opts.map(o => String(o)),
    correctIndex: opts.indexOf(answer),
    explanation: `Calculation: ${val2}% of ${val1 * 10} = (${val2} / 100) × ${val1 * 10} = ${answer}.`
  };
};
