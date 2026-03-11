// ─── Language Type ────────────────────────────────────────────────────────────

export type Lang = "en" | "my";

// ─── Translation Shape ────────────────────────────────────────────────────────

export interface Translations {
  // Hero / Auth
  portalTitle: string;
  portalSubtitle: string;
  students: string;
  courses: string;
  uptime: string;
  // Login & Register
  welcomeBack: string;
  createAccount: string;
  signInSubtitle: string;
  registerSubtitle: string;
  signIn: string;
  register: string;
  universityEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  studentId: string;
  signingIn: string;
  creatingAccount: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  studentIdPlaceholder: string;
  passwordMismatch: string;
  // Dashboard / Nav
  overview: string;
  myCourses: string;
  schedule: string;
  grades: string;
  authToken: string;
  studentPanel: string;
  signOut: string;
  semester: string;
  mainNav: string;
  // Overview page
  goodDay: string;
  overviewSubtitle: string;
  enrolledCourses: string;
  currentGpa: string;
  attendance: string;
  outstandingFees: string;
  gettingStarted: string;
  gettingStartedDesc: string;
  // Token page
  jwtTitle: string;
  jwtDesc: string;
  rawToken: string;
  copyToken: string;
  copied: string;
  headerDecoded: string;
  payloadDecoded: string;
  algorithmType: string;
  claims: string;
  noToken: string;
  // Placeholder pages
  coursesDesc: string;
  scheduleDesc: string;
  gradesDesc: string;
  // Misc
  language: string;
}

// ─── English ──────────────────────────────────────────────────────────────────

const en: Translations = {
  portalTitle: "University\nStudent Portal",
  portalSubtitle: "Your academic journey, unified in one place. Access courses, grades, and more.",
  students: "Students",
  courses: "Courses",
  uptime: "Uptime",
  welcomeBack: "Welcome back",
  createAccount: "Create account",
  signInSubtitle: "Sign in to your student account",
  registerSubtitle: "Register with your university email",
  signIn: "Sign In",
  register: "Register",
  universityEmail: "University Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  firstName: "First Name",
  lastName: "Last Name",
  studentId: "Student ID",
  signingIn: "Signing in...",
  creatingAccount: "Creating account...",
  emailPlaceholder: "student@university.edu",
  passwordPlaceholder: "••••••••",
  studentIdPlaceholder: "e.g. STU-2024-001",
  passwordMismatch: "Passwords do not match.",
  overview: "Overview",
  myCourses: "My Courses",
  schedule: "Schedule",
  grades: "Grades",
  authToken: "Auth Token",
  studentPanel: "Student Panel",
  signOut: "← Sign Out",
  semester: "Spring 2025",
  mainNav: "Main",
  goodDay: "Good day",
  overviewSubtitle: "Here's your academic overview for this semester.",
  enrolledCourses: "Enrolled Courses",
  currentGpa: "Current GPA",
  attendance: "Attendance",
  outstandingFees: "Outstanding Fees",
  gettingStarted: "🚀 Getting Started:",
  gettingStartedDesc:
    "This dashboard is connected to your C# JWT backend. Use the sidebar to explore modules. Check the Auth Token tab to inspect your JWT.",
  jwtTitle: "🔐 Your JWT Authentication Token",
  jwtDesc:
    "Your JWT token is stored in localStorage and sent with every API request. It contains your identity and expires based on your backend settings.",
  rawToken: "RAW TOKEN",
  copyToken: "Copy Token",
  copied: "✓ Copied!",
  headerDecoded: "HEADER (decoded)",
  payloadDecoded: "PAYLOAD (decoded)",
  algorithmType: "Algorithm & Type:",
  claims: "Claims:",
  noToken: "No token found",
  coursesDesc: "Course enrollment module — connect to your C# API endpoint GET /api/courses/my-courses",
  scheduleDesc: "Timetable module — connect to GET /api/schedule/student/{id}",
  gradesDesc: "Grades module — connect to GET /api/grades/student/{id}",
  language: "Language",
};

// ─── Burmese ──────────────────────────────────────────────────────────────────

const my: Translations = {
  portalTitle: "တက္ကသိုလ်\nကျောင်းသားပေါ်တယ်",
  portalSubtitle:
    "သင်၏ပညာရေးခရီး၊ တစ်နေရာတည်းတွင် စုစည်းထားသည်။ သင်တန်းများ၊ အဆင့်များနှင့် အခြားအရာများကို ဝင်ရောက်ကြည့်ရှုပါ။",
  students: "ကျောင်းသားများ",
  courses: "သင်တန်းများ",
  uptime: "လည်ပတ်မှု",
  welcomeBack: "ကြိုဆိုပါသည်",
  createAccount: "အကောင့်ဖန်တီးပါ",
  signInSubtitle: "သင်၏ကျောင်းသားအကောင့်သို့ ဝင်ရောက်ပါ",
  registerSubtitle: "တက္ကသိုလ်အီးမေးလ်ဖြင့် မှတ်ပုံတင်ပါ",
  signIn: "ဝင်ရောက်မည်",
  register: "မှတ်ပုံတင်မည်",
  universityEmail: "တက္ကသိုလ်အီးမေးလ်",
  password: "စကားဝှက်",
  confirmPassword: "စကားဝှက် အတည်ပြုပါ",
  firstName: "နာမည်",
  lastName: "မျိုးနွယ်အမည်",
  studentId: "ကျောင်းသားနံပါတ်",
  signingIn: "ဝင်ရောက်နေသည်...",
  creatingAccount: "အကောင့်ဖန်တီးနေသည်...",
  emailPlaceholder: "student@university.edu",
  passwordPlaceholder: "••••••••",
  studentIdPlaceholder: "ဥပမာ - STU-2024-001",
  passwordMismatch: "စကားဝှက်များ မတိုက်ဆိုင်ပါ။",
  overview: "အကျဉ်းချုပ်",
  myCourses: "ကျွန်ုပ်၏သင်တန်းများ",
  schedule: "အချိန်ဇယား",
  grades: "အဆင့်များ",
  authToken: "အထောက်အထားတိုကင်",
  studentPanel: "ကျောင်းသားပင်မစာမျက်နှာ",
  signOut: "← ထွက်မည်",
  semester: "နွေဦးဘာသာ ၂၀၂၅",
  mainNav: "မီနူး",
  goodDay: "မင်္ဂလာပါ",
  overviewSubtitle: "ဤသည်မှာ ဤသုံးလပတ်အတွက် သင်၏ပညာရေးအကျဉ်းချုပ်ဖြစ်သည်။",
  enrolledCourses: "တက်ရောက်သောသင်တန်းများ",
  currentGpa: "လက်ရှိ GPA",
  attendance: "တက်ရောက်မှု",
  outstandingFees: "ကျန်ရှိသောကြေးငွေ",
  gettingStarted: "🚀 စတင်ရန်:",
  gettingStartedDesc:
    "ဤ dashboard သည် သင်၏ C# JWT backend နှင့် ချိတ်ဆက်ထားသည်။ မော်ဂျူးများကို လေ့လာရန် sidebar ကို အသုံးပြုပါ။ JWT ကို စစ်ဆေးရန် Auth Token တက်ဘ်ကို ကြည့်ပါ။",
  jwtTitle: "🔐 သင်၏ JWT အထောက်အထားတိုကင်",
  jwtDesc: "သင်၏ JWT တိုကင်ကို localStorage တွင် သိမ်းဆည်းထားပြီး API တောင်းဆိုမှုတိုင်းနှင့်အတူ ပေးပို့သည်။",
  rawToken: "မူရင်းတိုကင်",
  copyToken: "တိုကင်ကူးယူမည်",
  copied: "✓ ကူးယူပြီး!",
  headerDecoded: "ခေါင်းစဉ် (ဖြည်ဆန်ပြီး)",
  payloadDecoded: "အချက်အလက် (ဖြည်ဆန်ပြီး)",
  algorithmType: "အယ်လဂိုရီသမ် နှင့် အမျိုးအစား:",
  claims: "တောင်းဆိုချက်များ:",
  noToken: "တိုကင်မတွေ့ပါ",
  coursesDesc: "သင်တန်းမှတ်ပုံတင်မော်ဂျူး — C# API GET /api/courses/my-courses နှင့် ချိတ်ဆက်ပါ",
  scheduleDesc: "အချိန်ဇယားမော်ဂျူး — GET /api/schedule/student/{id} နှင့် ချိတ်ဆက်ပါ",
  gradesDesc: "အဆင့်မော်ဂျူး — GET /api/grades/student/{id} နှင့် ချိတ်ဆက်ပါ",
  language: "ဘာသာစကား",
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const i18n: Record<Lang, Translations> = { en, my };