export type AbstractionBand =
  | 'Machine-near'
  | 'Systems-level'
  | 'Systems/application'
  | 'Managed application'
  | 'High-level general-purpose'
  | 'High-level statistical'
  | 'High-level scripting'
  | 'High-level domain-specific';

export interface LanguageRecord {
  id: string;
  name: string;
  usageRank: number; // 1 to 17 based on 2025 survey usage
  abstractionBand: AbstractionBand;
  bandOrder: number; // 1 (lowest level) to 8 (highest level domain-specific)
  firstAppearance: string; // Original text, e.g. "Late 1940s", "1972"
  numericYear: number; // For chronological sorting and timeline math
  usagePercentage: number; // e.g. 7.1, 22.0
  footnote?: string;
  executionModel: string;
  memoryManagement: string;
  typeSystem: string;
  primaryEcosystem: string;
  overview: string;
  surveyContext: string;
}

export interface BandMeta {
  name: AbstractionBand;
  order: number;
  description: string;
  hardwareProximity: string;
  typicalCharacteristics: string;
  color: {
    base: string; // Hex for charts/bars
    hover: string;
    bgSubtle: string;
    border: string;
    text: string;
    badgeBg: string;
  };
}

export const ABSTRACTION_BANDS: Record<AbstractionBand, BandMeta> = {
  'Machine-near': {
    name: 'Machine-near',
    order: 1,
    description: 'Direct translation of machine instructions for specific CPU architectures without abstract virtual layers.',
    hardwareProximity: 'Closest to silicon registers, flags, and hardware buses',
    typicalCharacteristics: 'Manual register allocation, direct memory addresses, zero runtime overhead, CPU-specific instruction sets.',
    color: {
      base: '#475569', // Slate 600
      hover: '#334155',
      bgSubtle: '#F1F5F9', // Slate 100
      border: '#CBD5E1', // Slate 300
      text: '#1E293B', // Slate 800
      badgeBg: '#E2E8F0', // Slate 200
    },
  },
  'Systems-level': {
    name: 'Systems-level',
    order: 2,
    description: 'Compiled directly to native machine code with deterministic memory layout and minimal or no runtime.',
    hardwareProximity: 'Direct pointer arithmetic, native ABI, OS kernel interfaces',
    typicalCharacteristics: 'Manual or borrow-checked memory allocation, zero-cost abstractions, predictable execution latency, OS development.',
    color: {
      base: '#4F46E5', // Indigo 600
      hover: '#4338CA',
      bgSubtle: '#EEF2FF', // Indigo 50
      border: '#C7D2FE', // Indigo 200
      text: '#312E81', // Indigo 900
      badgeBg: '#E0E7FF', // Indigo 100
    },
  },
  'Systems/application': {
    name: 'Systems/application',
    order: 3,
    description: 'Compiled to native binary with an embedded runtime managing concurrency, network polling, and garbage collection.',
    hardwareProximity: 'Compiled native machine code with runtime abstraction layer',
    typicalCharacteristics: 'Built-in concurrent scheduling (goroutines), fast compilation, automated memory reclamation without explicit VM.',
    color: {
      base: '#0284C7', // Sky 600
      hover: '#0369A1',
      bgSubtle: '#F0F9FF', // Sky 50
      border: '#BAE6FD', // Sky 200
      text: '#0C4A6E', // Sky 900
      badgeBg: '#E0F2FE', // Sky 100
    },
  },
  'Managed application': {
    name: 'Managed application',
    order: 4,
    description: 'Executes within a managed runtime or virtual machine (JVM, CLR, ARC) with automatic memory safety and sandboxing.',
    hardwareProximity: 'Abstract virtual machine or automated reference counting layer',
    typicalCharacteristics: 'Bytecode compilation, JIT optimization, garbage collection or ARC, extensive standard enterprise libraries.',
    color: {
      base: '#0D9488', // Teal 600
      hover: '#0F766E',
      bgSubtle: '#F0FDFA', // Teal 50
      border: '#99F6E4', // Teal 200
      text: '#134E4A', // Teal 900
      badgeBg: '#CCFBF1', // Teal 100
    },
  },
  'High-level general-purpose': {
    name: 'High-level general-purpose',
    order: 5,
    description: 'Expressive dynamic or static languages prioritizing programmer velocity, broad domain versatility, and rapid prototyping.',
    hardwareProximity: 'High abstraction from memory and hardware, interpreted or JIT-compiled',
    typicalCharacteristics: 'Dynamic or inferred typing, rich standard libraries, universal package ecosystems, ubiquitous across web and AI.',
    color: {
      base: '#D97706', // Amber 600
      hover: '#B45309',
      bgSubtle: '#FFFBEB', // Amber 50
      border: '#FDE68A', // Amber 200
      text: '#78350F', // Amber 900
      badgeBg: '#FEF3C7', // Amber 100
    },
  },
  'High-level statistical': {
    name: 'High-level statistical',
    order: 6,
    description: 'Specialized for mathematical modeling, vectorized matrix manipulation, and empirical data analysis.',
    hardwareProximity: 'Domain-abstracted vector execution over underlying BLAS/LAPACK routines',
    typicalCharacteristics: 'First-class data frames, vectorized operations, specialized statistical algorithms, academic publication graphics.',
    color: {
      base: '#7C3AED', // Violet 600
      hover: '#6D28D9',
      bgSubtle: '#F5F3FF', // Violet 50
      border: '#DDD6FE', // Violet 200
      text: '#4C1D95', // Violet 900
      badgeBg: '#EDE9FE', // Violet 100
    },
  },
  'High-level scripting': {
    name: 'High-level scripting',
    order: 7,
    description: 'Designed for orchestrating system utilities, piping I/O streams, and automating administrative pipelines.',
    hardwareProximity: 'Process-level orchestration and operating system IPC glue',
    typicalCharacteristics: 'String-centric data passing, process spawning, file descriptor manipulation, standard Unix pipeline integration.',
    color: {
      base: '#E11D48', // Rose 600
      hover: '#BE123C',
      bgSubtle: '#FFF1F2', // Rose 50
      border: '#FECDD3', // Rose 200
      text: '#881337', // Rose 900
      badgeBg: '#FFE4E6', // Rose 100
    },
  },
  'High-level domain-specific': {
    name: 'High-level domain-specific',
    order: 8,
    description: 'Declarative query languages describing desired results rather than algorithmic step-by-step procedures.',
    hardwareProximity: 'Query planner and relational storage engine abstraction',
    typicalCharacteristics: 'Declarative relational algebra, declarative joins, schema-enforced set operations, engine-optimized execution plans.',
    color: {
      base: '#EA580C', // Orange 600
      hover: '#C2410C',
      bgSubtle: '#FFF7ED', // Orange 50
      border: '#FED7AA', // Orange 200
      text: '#7C2D12', // Orange 900
      badgeBg: '#FFEDD5', // Orange 100
    },
  },
};

const RAW_LANGUAGES: Omit<LanguageRecord, 'usageRank'>[] = [
  {
    id: 'assembly',
    name: 'Assembly languages',
    abstractionBand: 'Machine-near',
    bandOrder: 1,
    firstAppearance: 'Late 1940s',
    numericYear: 1949,
    usagePercentage: 7.1,
    executionModel: 'Direct CPU Instruction Mapping',
    memoryManagement: 'Manual Register & Address Offsets',
    typeSystem: 'Untyped (Raw Bytes & Words)',
    primaryEcosystem: 'Firmware, Bootloaders, Real-Time OS, Cryptographic Primitives',
    overview: 'Assembly languages represent a family of architecture-specific symbolic notations corresponding 1:1 with CPU opcodes. They provide zero abstraction over registers, memory segments, and flags.',
    surveyContext: 'Reported by 7.1% of 2025 Stack Overflow respondents, reflecting specialists working in embedded systems, reverse engineering, hardware bring-up, and kernel optimization.',
  },
  {
    id: 'c',
    name: 'C',
    abstractionBand: 'Systems-level',
    bandOrder: 2,
    firstAppearance: '1972',
    numericYear: 1972,
    usagePercentage: 22.0,
    executionModel: 'Native Machine Code (Compiled)',
    memoryManagement: 'Manual (malloc / free)',
    typeSystem: 'Static, Weak / Nominal',
    primaryEcosystem: 'Operating System Kernels (Linux, Windows, Darwin), Microcontrollers, Runtime Engines',
    overview: 'Created by Dennis Ritchie at Bell Labs to construct Unix, C remains the bedrock lingua franca of computing, offering minimal runtime abstraction and predictable performance.',
    surveyContext: 'Employed by 22.0% of respondents in 2025, anchoring foundational infrastructure, database storage engines, graphics drivers, and embedded microcontrollers worldwide.',
  },
  {
    id: 'cpp',
    name: 'C++',
    abstractionBand: 'Systems-level',
    bandOrder: 2,
    firstAppearance: '1985',
    numericYear: 1985,
    usagePercentage: 23.5,
    executionModel: 'Native Machine Code (Compiled)',
    memoryManagement: 'Manual / RAII Smart Pointers',
    typeSystem: 'Static, Strong, Multi-paradigm',
    primaryEcosystem: 'AAA Game Engines (Unreal), Web Browsers (Chromium), High-Frequency Trading, Financial Modeling',
    overview: 'Conceived by Bjarne Stroustrup as "C with Classes", modern C++ has evolved into a powerhouse providing zero-overhead abstractions, compile-time metaprogramming, and direct hardware control.',
    surveyContext: 'Reported by 23.5% of developers in 2025, driven by demanding latency requirements in gaming, rendering pipelines, embedded robotics, and quantitative finance.',
  },
  {
    id: 'rust',
    name: 'Rust',
    abstractionBand: 'Systems-level',
    bandOrder: 2,
    firstAppearance: '2010',
    numericYear: 2010,
    usagePercentage: 14.8,
    executionModel: 'Native Machine Code via LLVM',
    memoryManagement: 'Compile-time Ownership & Borrow Checker',
    typeSystem: 'Static, Strong, Affine / Linear Types',
    primaryEcosystem: 'Cloud Infrastructure, OS Components (Linux Kernel modules), WebAssembly, Cryptography',
    overview: 'Engineered at Mozilla Research to achieve memory safety without garbage collection. Its strict compiler ownership model eliminates data races and spatial memory vulnerabilities.',
    surveyContext: 'Reached 14.8% adoption in the 2025 survey, continuing its multi-year rise as major tech infrastructure transitions critical C/C++ services to memory-safe implementations.',
  },
  {
    id: 'go',
    name: 'Go',
    abstractionBand: 'Systems/application',
    bandOrder: 3,
    firstAppearance: '2009',
    numericYear: 2009,
    usagePercentage: 16.4,
    executionModel: 'Native Machine Code with Lightweight Runtime',
    memoryManagement: 'Concurrent Tracing Garbage Collector',
    typeSystem: 'Static, Structural Interfaces',
    primaryEcosystem: 'Cloud-Native Infrastructure (Kubernetes, Docker, Terraform), Microservices, Network Proxies',
    overview: 'Developed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Combines lightning-fast compilation, native CSP concurrency (goroutines/channels), and straightforward syntax.',
    surveyContext: 'Chosen by 16.4% of surveyed developers, Go is the undisputed standard engine powering modern distributed cloud infrastructure and container orchestration platforms.',
  },
  {
    id: 'java',
    name: 'Java',
    abstractionBand: 'Managed application',
    bandOrder: 4,
    firstAppearance: '1995',
    numericYear: 1995,
    usagePercentage: 29.4,
    executionModel: 'Java Virtual Machine (Bytecode + JIT HotSpot)',
    memoryManagement: 'Generational Garbage Collection (G1, ZGC)',
    typeSystem: 'Static, Strong, Class-based OOP',
    primaryEcosystem: 'Enterprise Backends (Spring Boot), Banking Systems, Big Data (Hadoop, Spark, Kafka), Android Legacy',
    overview: 'Launched by Sun Microsystems under the banner "Write Once, Run Anywhere". The JVM architecture provides cross-platform hardware isolation, dynamic profiling, and battle-tested garbage collection.',
    surveyContext: 'Retaining 29.4% in 2025, Java remains the enterprise standard for high-throughput transactional backends, large-scale financial ledgers, and streaming data pipelines.',
  },
  {
    id: 'csharp',
    name: 'C#',
    abstractionBand: 'Managed application',
    bandOrder: 4,
    firstAppearance: '2000',
    numericYear: 2000,
    usagePercentage: 27.8,
    executionModel: 'Common Language Runtime (.NET Core CLR)',
    memoryManagement: 'Generational Tracing Garbage Collector',
    typeSystem: 'Static, Strong, Nominal with Pattern Matching',
    primaryEcosystem: 'Enterprise APIs (.NET 9), Game Development (Unity Engine), Desktop Applications, Cloud Microservices',
    overview: 'Designed by Anders Hejlsberg at Microsoft. Over two decades, C# has transformed into an open-source, cross-platform runtime renowned for developer ergonomics, async/await, and Unity gaming.',
    surveyContext: 'Adopted by 27.8% of developers in 2025, maintaining immense strength across both corporate software ecosystems and global video game production.',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    abstractionBand: 'Managed application',
    bandOrder: 4,
    firstAppearance: '2011',
    numericYear: 2011,
    usagePercentage: 10.8,
    executionModel: 'JVM Bytecode, Native LLVM, or JavaScript',
    memoryManagement: 'Host Runtime GC / Automated Reference Counting',
    typeSystem: 'Static, Strong, Null-Safe Type System',
    primaryEcosystem: 'Modern Android Apps (Google Preferred), Kotlin Multiplatform (KMP), Server-Side Services',
    overview: 'Created by JetBrains as a pragmatic, 100% interoperable JVM alternative that eliminates null-pointer exceptions and boilerplate through coroutines and expressive conciseness.',
    surveyContext: 'Maintained 10.8% developer adoption in 2025, solidifying its role as the premier standard for Android mobile software engineering and expanding into multiplatform client code.',
  },
  {
    id: 'swift',
    name: 'Swift',
    abstractionBand: 'Managed application',
    bandOrder: 4,
    firstAppearance: '2014',
    numericYear: 2014,
    usagePercentage: 5.4,
    executionModel: 'Compiled Native Binary via LLVM',
    memoryManagement: 'Automatic Reference Counting (ARC)',
    typeSystem: 'Static, Strong, Protocol-Oriented',
    primaryEcosystem: 'Apple Platforms (iOS, macOS, watchOS, visionOS), Server-Side Swift (Vapor)',
    overview: 'Introduced by Apple to succeed Objective-C. Swift unites the performance and safety of modern compiled languages with expressive script-like ergonomics and deterministic ARC cleanup.',
    surveyContext: 'Reported by 5.4% of developers, closely matching the specialist developer segment dedicated to iOS and macOS native app production and Apple device ecosystems.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    abstractionBand: 'High-level general-purpose',
    bandOrder: 5,
    firstAppearance: '1995',
    numericYear: 1995,
    usagePercentage: 66.0,
    executionModel: 'JIT Engines (V8, JavaScriptCore, SpiderMonkey)',
    memoryManagement: 'Automatic Garbage Collection',
    typeSystem: 'Dynamic, Weak, Prototype-based',
    primaryEcosystem: 'Universal Web Browsers, Node.js, Bun, Serverless Edge Runtimes',
    overview: 'Created in 10 days by Brendan Eich at Netscape. Today it is the single most ubiquitous execution runtime on earth, powering every browser tab and millions of serverless backends.',
    surveyContext: 'Ranked #1 overall with 66.0% of respondents reporting extensive work in 2025, anchoring virtually all client-side frontends and ubiquitous web applications.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    abstractionBand: 'High-level general-purpose',
    bandOrder: 5,
    firstAppearance: '2012',
    numericYear: 2012,
    usagePercentage: 43.6,
    executionModel: 'Transpiles to JavaScript (Runs on V8 / JS Engines)',
    memoryManagement: 'Host JS Engine Garbage Collector',
    typeSystem: 'Static, Structural Type System with Generics',
    primaryEcosystem: 'Full-Stack Web (React, Next.js, Node.js), Large-Scale Enterprise Codebases',
    overview: 'Architected by Anders Hejlsberg at Microsoft to bring static typing and enterprise scale to JavaScript without breaking its web-native runtime compatibility.',
    surveyContext: 'Commanded 43.6% of developer use in 2025, continuing to be the preferred choice for modern frontend engineering and scalable Node/Bun backend architectures.',
  },
  {
    id: 'php',
    name: 'PHP',
    abstractionBand: 'High-level general-purpose',
    bandOrder: 5,
    firstAppearance: '1995',
    numericYear: 1995,
    usagePercentage: 18.9,
    executionModel: 'Interpreted / JIT Bytecode (Zend Engine)',
    memoryManagement: 'Per-Request Reference Counting & Cycle Collector',
    typeSystem: 'Gradual / Dynamic with Strong Type Hints',
    primaryEcosystem: 'Web Content Management (WordPress), Web Frameworks (Laravel, Symfony)',
    overview: 'Initiated by Rasmus Lerdorf as "Personal Home Page Tools". Powered by modern PHP 8.x with JIT compilation, strict types, and the vast WordPress and Laravel ecosystems.',
    surveyContext: 'Maintained 18.9% developer presence in 2025, enduring as a major workhorse for content management systems and web commerce storefronts.',
  },
  {
    id: 'ruby',
    name: 'Ruby',
    abstractionBand: 'High-level general-purpose',
    bandOrder: 5,
    firstAppearance: '1995',
    numericYear: 1995,
    usagePercentage: 6.4,
    executionModel: 'Interpreted / YJIT Compiler (CRuby)',
    memoryManagement: 'Mark-and-Sweep Generational GC',
    typeSystem: 'Dynamic, Strong, Pure Object-Oriented',
    primaryEcosystem: 'Web Startups (Ruby on Rails), Developer Tooling (Homebrew, CocoaPods)',
    overview: 'Conceived by Yukihiro Matsumoto ("Matz") to maximize developer happiness and expressiveness. Catalyzed rapid web startup growth through the convention-over-configuration Rails framework.',
    surveyContext: 'Used by 6.4% in 2025, heavily sustained by productive startup engineering teams, mature Rails applications (Shopify, GitHub, Basecamp), and developer CLI automation.',
  },
  {
    id: 'python',
    name: 'Python',
    abstractionBand: 'High-level general-purpose',
    bandOrder: 5,
    firstAppearance: '1991',
    numericYear: 1991,
    usagePercentage: 57.9,
    executionModel: 'Bytecode Interpreted (CPython, PyPy) + Native C Bindings',
    memoryManagement: 'Reference Counting with Cyclic Garbage Collector',
    typeSystem: 'Dynamic, Strong, Optional Type Annotations',
    primaryEcosystem: 'Artificial Intelligence, Machine Learning (PyTorch, TensorFlow), Data Science, Automation Scripts',
    overview: 'Created by Guido van Rossum with an emphasis on code readability and clean syntax. Its low cognitive friction made it the lingua franca of machine learning, AI, and scientific data computing.',
    surveyContext: 'Achieved 57.9% in 2025 (#3 overall), driven by the global expansion of generative AI, large language models, computer vision, and academic data science pipelines.',
  },
  {
    id: 'r',
    name: 'R',
    abstractionBand: 'High-level statistical',
    bandOrder: 6,
    firstAppearance: '1993',
    numericYear: 1993,
    usagePercentage: 4.9,
    executionModel: 'Interpreted S-language Variant with Vectorized C/Fortran Kernels',
    memoryManagement: 'Automatic Garbage Collection (In-Memory Data Frames)',
    typeSystem: 'Dynamic, Vector-oriented, Functional',
    primaryEcosystem: 'Academic Research, Biostatistics, Clinical Trials, ggplot2 Visualization, Tidyverse',
    overview: 'Implemented by Ross Ihaka and Robert Gentleman at the University of Auckland. Tailored specifically for data analysts, biometricians, and statisticians who require rigorous mathematical testing.',
    surveyContext: 'Recorded at 4.9% in 2025, reflecting a concentrated but vital domain of statisticians, epidemiological researchers, and published academic researchers.',
  },
  {
    id: 'bash',
    name: 'Bash',
    abstractionBand: 'High-level scripting',
    bandOrder: 7,
    firstAppearance: '1989¹',
    numericYear: 1989,
    usagePercentage: 48.7,
    footnote: 'The survey reports the combined category Bash/Shell, rather than Bash alone.',
    executionModel: 'Interpreted Unix Shell Commands & Subprocesses',
    memoryManagement: 'OS Process Memory Cleanup',
    typeSystem: 'Untyped (Everything is a String or Stream)',
    primaryEcosystem: 'DevOps, CI/CD Workflows, Linux Server Administration, Dockerfile Automation',
    overview: 'The Bourne Again SHell written by Brian Fox for GNU. Serves as the universal command language for Unix-like operating systems and the backbone of modern container build and deploy pipelines.',
    surveyContext: 'Reported by 48.7% of respondents (combined Bash/Shell category), proving its indispensability for terminal operations, CI/CD runners, and DevOps infrastructure orchestration.',
  },
  {
    id: 'sql',
    name: 'SQL',
    abstractionBand: 'High-level domain-specific',
    bandOrder: 8,
    firstAppearance: '1974',
    numericYear: 1974,
    usagePercentage: 58.6,
    executionModel: 'Declarative Query Compilation & Execution Engine',
    memoryManagement: 'Managed by Database Buffer Pool & Engine',
    typeSystem: 'Static, Relational Tuple Typing',
    primaryEcosystem: 'Relational Databases (PostgreSQL, MySQL, SQLite), Analytical Warehouses (Snowflake, BigQuery)',
    overview: 'Structured Query Language developed at IBM by Donald Chamberlin and Raymond Boyce based on Edgar F. Codd’s relational model. Expresses declarative set transformations rather than procedural loops.',
    surveyContext: 'Captured 58.6% (#2 overall) in 2025, demonstrating that declarative data storage and retrieval remains fundamental across virtually every software discipline and technology stack.',
  },
];

export const PROGRAMMING_LANGUAGES: LanguageRecord[] = [...RAW_LANGUAGES]
  .sort((a, b) => b.usagePercentage - a.usagePercentage)
  .map((lang, idx) => ({ ...lang, usageRank: idx + 1 }));

export interface InterpretationNote {
  id: string;
  title: string;
  detail: string;
  sourceContext: string;
}

export const INTERPRETATION_NOTES: InterpretationNote[] = [
  {
    id: 'approximate-order',
    title: 'Approximate Ordering by Broad Bands',
    detail: '“Low-level to high-level” is approximate. Languages within the same band should not be interpreted as having a precise linear order.',
    sourceContext: 'Computer architecture abstractions exist on multidimensional spectrums (memory access, runtime overhead, typing, compilation target); broad bands prevent misleading false precision.',
  },
  {
    id: 'assembly-family',
    title: 'Assembly Represents a Language Family',
    detail: 'Assembly refers to a family of machine-specific languages, not one language with a single launch date.',
    sourceContext: 'Different CPU instruction architectures (x86, ARM, RISC-V, MIPS, Z80) each have distinct assembly dialects dating from the late 1940s to the present day.',
  },
  {
    id: 'survey-sample',
    title: 'Stack Overflow Survey Sample & Selection Bias',
    detail: 'The usage figures describe the Stack Overflow survey sample, not the entire global developer population. Respondents were recruited mainly through Stack Overflow-owned channels, which creates selection bias toward active Stack Overflow users.',
    sourceContext: 'Survey figures refer to respondents who reported extensive work with the language in the 2025 survey. Respondents could select multiple languages, so the percentages do not total 100%.',
  },
  {
    id: 'html-css-excluded',
    title: 'Exclusion of HTML and CSS',
    detail: 'HTML and CSS are excluded because they are markup and style-sheet languages rather than programming languages.',
    sourceContext: 'While fundamental to web design and frequently used by web developers, they lack Turing-complete imperative or declarative programming constructs required for this index.',
  },
  {
    id: 'code-share-removed',
    title: 'Removal of Estimated Code-Share Metric',
    detail: 'The estimated code-share column has been removed because no reliable global dataset measures what percentage of newly written code belongs to each language.',
    sourceContext: 'Public repository telemetry (e.g. GitHub lines of code) is heavily skewed by generated files, vendored dependencies, and private enterprise codebases that cannot be audited.',
  },
  {
    id: 'bash-combined',
    title: 'Footnote ¹: Combined Bash/Shell Survey Metric',
    detail: 'The survey reports the combined category Bash/Shell, rather than Bash alone.',
    sourceContext: 'Includes users reporting POSIX sh, Zsh, Bash, Fish, and other Unix shell environments under a single unified survey question.',
  },
];
