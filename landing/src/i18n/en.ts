import type { Dict } from "./ru";

export const en: Dict = {
  htmlLang: "en",

  meta: {
    title: "Nova Lingua — a language you won't drop",
    description:
      "Nova Lingua runs in-person language classes in small, stable groups. Tyumen, 74 Maksima Gorkogo St. English, Spanish, Chinese, Russian as a foreign language.",
  },

  nav: [
    { href: "#kak", label: "How it works" },
    { href: "#programmy", label: "Programmes" },
    { href: "#prepodavateli", label: "Teachers" },
    { href: "#otzyvy", label: "Reviews" },
    { href: "#voprosy", label: "Questions" },
  ],

  header: {
    signUp: "Book a class",
    signUpAria: "Book a free trial class",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileCta: "Book a free trial class",
    languageLabel: "Page language",
  },

  hero: {
    eyebrow: "Tyumen · 74 Maksima Gorkogo St · since 2012",
    title: "A language you won't drop",
    lead: "A small group that stays the same, one teacher, one fixed evening a week. In person, in central Tyumen.",
    cta: "Free trial class",
    ctaAria: "Book a class",
    photoAlt:
      "A Nova Lingua teacher holding textbooks in a classroom with English, Spanish, Chinese and Russian flags",
    stats: [
      { value: "2012", label: "Teaching since" },
      { value: "100+", label: "Students" },
      { value: "up to 6", label: "Per group" },
    ],
    languagesCount: "4",
    languagesLabel: "languages: English, Spanish, Chinese, Russian as a foreign language",
    trialFree: "The trial class is free",
  },

  why: {
    title: "Why people usually quit",
    lead: "It is not about ability. One class gets moved, another gets missed, and by November catching up feels awkward.",
    minutesValue: "3 min",
    minutesLabel: "is how long you speak in ninety minutes in a group of twelve",
    onlineTitle: "Online is easy to cancel",
    onlineText: "A class you don't have to travel to can be postponed forever.",
  },

  comparison: {
    title: "What we do differently",
    colUsual: "At a typical language school",
    colNova: "At Nova Lingua",
    rows: [
      {
        usual: "10–12 people, you speak for three minutes a class",
        nova: "Up to six people, you speak every class",
      },
      {
        usual: "Teachers rotate, the group keeps changing",
        nova: "The same group and the same teacher throughout",
      },
      {
        usual: "The timetable is rebuilt every week",
        nova: "The same evening every week: Tue and Thu at 19:00",
      },
      {
        usual: "An online class that is easy to cancel",
        nova: "In-person classes only, in central Tyumen",
      },
      {
        usual: "You hear about a reschedule an hour before",
        nova: "We warn you in advance, with notifications on VK",
      },
    ],
  },

  quiz: {
    title: "Not sure which level to start at",
    lead: "Eight questions about what you can already do in practice. Three minutes, and we show the result right away.",
    kicker: "Self-assessment",
    idleTitle: "Your level: A1 to C1",
    idleText: "Three answer options, no grammar involved.",
    start: "Take the test",
    progressAria: "Test progress",
    answersAria: "Answer options",
    counter: (n: number, total: number) => `${n} of ${total}`,
    questions: [
      "I can introduce myself and say a few simple sentences about my life",
      "I understand simple questions from a shop assistant or waiter and can reply",
      "I can hold a short conversation about my plans for the day",
      "I get the main point of an article or video on a familiar topic",
      "I can explain my opinion and give an example without pausing on every word",
      "I follow native speakers talking to each other if the topic is familiar",
      "I can write a business email or handle work matters in a negotiation",
      "I discuss abstract and specialised topics freely, rarely searching for words",
    ],
    answerYes: "Yes, easily",
    answerMaybe: "With effort, but I manage",
    answerNo: "No",
    answerYesAria: "Answer: yes, easily",
    answerMaybeAria: "Answer: with effort, but I manage",
    answerNoAria: "Answer: no",
    resultBadge: "Your level is",
    results: {
      A1: {
        title: "Starting from the basics, and that's fine",
        text: "The basics are familiar, but speaking is still hard. In a small beginners group you build practice fast, without fearing mistakes in front of others.",
      },
      A2: {
        title: "You already have something to build on",
        text: "Everyday topics come easily. Next comes fluency and vocabulary built through conversation, not through a textbook.",
      },
      B1: {
        title: "You can get by, but confidence is missing",
        text: "You understand more than you say. In a small group where everyone speaks often, that gap closes quickly.",
      },
      B2: {
        title: "You speak well, and nuance is where you grow",
        text: "You handle everyday and work topics with ease. Next comes precision of phrasing and conversation on specialised subjects.",
      },
      C1: {
        title: "A confident user's level",
        text: "You rarely search for words and follow native speakers by ear. At the trial class we'll find a group where you won't be bored.",
      },
    },
    resultCta: "Book a trial class",
    restart: "Start over",
  },

  programs: {
    title: "Programmes",
    lead: "All classes are held in person at 74 Maksima Gorkogo St. Evening groups, weekdays.",
    groupsLabel: "Groups",
    otherLabel: "Other formats",
    perMonth: "per month",
    featured: {
      lang: "English",
      title: "English for work",
      desc: "For level A2 and above. Email, calls, negotiations, presentations.",
      schedule: "Twice a week, 90 minutes, up to 6 people",
      price: "8 900 ₽",
    },
    groups: [
      {
        lang: "English",
        title: "English from scratch",
        desc: "For adults starting for the first time, or who only remember school lessons.",
        schedule: "2×90 min, up to 6 people",
        price: "7 900 ₽",
      },
      {
        lang: "Spanish",
        title: "Spanish at any level",
        desc: "From any level. Speaking practice from the very first class.",
        schedule: "2×90 min, up to 6 people",
        price: "8 400 ₽",
      },
      {
        lang: "Chinese",
        title: "Chinese from scratch",
        desc: "For beginners and continuing students. Special attention to tones and characters.",
        schedule: "2×90 min, up to 5 people",
        price: "9 900 ₽",
      },
      {
        lang: "Russian",
        title: "Russian as a foreign language",
        desc: "For those who moved to Tyumen to work or study. Paperwork, clinics, work, daily life.",
        schedule: "2×90 min, up to 6 people",
        price: "8 400 ₽",
      },
    ],
    formats: [
      {
        title: "One-to-one classes",
        desc: "Any of the four languages, 60 minutes. The same teacher and a fixed slot, with a programme built around your goal.",
        price: "2 600 ₽",
      },
      {
        title: "Teenagers 14–17",
        desc: "English for those who need a living language, not a term grade. 2×90 min, up to 6 people.",
        price: "7 400 ₽",
      },
    ],
  },

  teachers: {
    title: "Who teaches the classes",
    lead: "In a small group the teacher matters more than the syllabus. Pick a name to read more: this is exactly the person you will be taught by.",
    photoAltSuffix: "Nova Lingua teacher",
    items: [
      {
        name: "Anna Vetrova",
        langs: "English, Spanish",
        bio: "Philology at Tyumen State University, CELTA certified. Spent four years in Madrid, taught corporate courses at a logistics company.",
        quote:
          "\"Adults usually arrive convinced they have a bad memory. Almost always it turns out the problem isn't memory, it's that nobody let them open their mouth for ten years.\"",
      },
      {
        name: "Mark Selivanov",
        langs: "English",
        bio: "Linguistics at Tyumen State University. DipTESOL. Six years in Dublin, worked in fintech support, using English eight hours a day.",
        quote:
          "\"I bring real letters and call recordings to class. Nobody will ever hear a textbook dialogue in real life.\"",
      },
      {
        name: "Darya Khromova",
        langs: "Chinese",
        bio: "HSK 6, studied at Beijing Language and Culture University. Three years in Chengdu teaching Russian to Chinese students, which also showed her how Chinese speakers hear our speech.",
        quote:
          "\"Tones aren't difficult, they're unfamiliar. The difference is that unfamiliar goes away after a month of regular practice.\"",
      },
      {
        name: "Olga Tenyakova",
        langs: "Russian as a foreign language, English",
        bio: "Master's in teaching Russian as a foreign language. Eight years working with people who moved to Russia, from trades to IT.",
        quote:
          "\"The first goal isn't grammar. It's that a person can go to a government office alone and not fear a phone call.\"",
      },
    ],
  },

  reviews: {
    title: "What students say",
    lead: "We publish reviews with the name, the programme and how long the person has studied. You can meet every one of them at 74 Maksima Gorkogo St.",
    featured: {
      photoAlt: "Irina, a Nova Lingua student",
      quote:
        "\"I used to negotiate with suppliers through an interpreter and lost half the meaning every time. I ran the last four calls with our Turkish partners myself.\"",
      note: "Mark brought our own real emails to class and broke down why one phrasing works and another annoys the person reading it.",
      name: "Irina, 34",
      role: "Head of procurement",
      program: "English for work",
      duration: "Studying for 1 year 2 months · teacher Mark",
    },
    items: [
      {
        quote:
          "\"I studied Spanish for travel, with no career goals at all. Eight months later, in Valencia, I explained myself at a pharmacy without a translation app for the first time in my life. There are five of us in the group, and that's the point: staying silent isn't an option, your turn comes every ten minutes.\"",
        name: "Sergey, 41, dentist",
        meta: "Spanish · 8 months",
      },
      {
        quote:
          "\"I arrived certain I was B1, because I understand TV series. At the trial class they told me honestly it was A2 and offered a different group. I sulked for exactly one day. Ten months on, I speak more freely than the friends who still think they're B1.\"",
        name: "Polina, 27, designer",
        meta: "English from scratch · 10 months",
      },
      {
        quote:
          "\"I fly to a factory in Guangzhou two or three times a year. A year and a half ago I could only say hello; now I handle everything myself: taxis, restaurants, short work conversations on the floor. Partners react to that more strongly than to any interpreted negotiation.\"",
        name: "Dmitry, 38, engineer",
        meta: "Chinese · 1 year 6 months",
      },
      {
        quote:
          "\"I moved to Tyumen for work and my wife handled everything for the first few months. Seven months of classes later I go to the clinic and government offices myself and fill in the paperwork unaided. From the start Olga built the lessons around what I actually needed that week.\"",
        name: "Nurlan, 31, power engineer",
        meta: "Russian as a foreign language · 7 months",
      },
    ],
  },

  steps: {
    title: "How booking works",
    items: [
      {
        n: "Step 1",
        title: "You send a request",
        text: "Three fields: name, contact and language. Nothing else to fill in.",
      },
      {
        n: "Step 2",
        title: "An administrator calls you back the same day",
        text: "They'll ask about your level, a convenient time and your goal, match you to a group and name the nearest trial class date.",
      },
      {
        n: "Step 3",
        title: "You come to the trial class",
        text: "A real class with a teacher and other students, not an interview or a sales pitch. Afterwards you decide whether to continue. If it isn't right for you, you owe nothing.",
      },
    ],
  },

  faq: {
    title: "Questions",
    items: [
      {
        q: "Do you teach online?",
        a: "No, all classes are in person. That's a deliberate choice: a class you have to travel to is missed far less often and almost never put off until tomorrow. If online is essential for you, it's fairer to say straight away that we aren't a fit.",
      },
      {
        q: "I don't know my level. Which group will I go to?",
        a: "You can take the test on this page, but your level is settled by the teacher at the trial class. If the group turns out to be the wrong pace for you, the administrator will offer another one. That's a normal situation and it's resolved before classes start, not after.",
      },
      {
        q: "What if I miss a class?",
        a: "A missed class can be made up. The administrator will find a slot in another group at your level, or one-to-one time with the teacher, so you don't fall behind the programme.",
      },
      {
        q: "I travel for work a lot. Will a group work for me?",
        a: "If the trips are regular, the one-to-one format usually suits better, because the schedule can be rebuilt around you. Mention it to the administrator on the call and they'll suggest the right option.",
      },
      {
        q: "What if I don't like the teacher?",
        a: "Tell the administrator. Moving you to another group is easier than losing a student, and in a small school that takes one conversation.",
      },
      {
        q: "How many people will be in the group?",
        a: "Up to six. For Chinese, up to five. That's the upper limit; usually it's fewer.",
      },
      {
        q: "Is the trial class really free?",
        a: "Yes. You come to a real class, study together with the group, and decide afterwards. Payment is only discussed if you decide to continue.",
      },
      {
        q: "How do I pay for classes?",
        a: "Monthly, at the start of the month. We accept cash, cards and SBP transfers.",
      },
      {
        q: "Where are you located?",
        a: "Tyumen, 74 Maksima Gorkogo St, next to 400-letiya Tyumeni Square. Three classrooms: two for groups and one for one-to-one classes.",
      },
    ],
  },

  cta: {
    title: "Come to a class and decide from experience",
    lead: "One class shows more than this entire website: how the teacher works, who is in the group, whether the pace suits you. The trial is free and commits you to nothing.",
    navLabels: ["Language", "Experience", "Contact"],
    addressLine1: "Tyumen, 74 Maksima Gorkogo St",
    addressLine2: "next to 400-letiya Tyumeni Square",
    stepCounter: (n: number) => `Step ${n} of 3`,
    sentCounter: "Request sent",
    titles: ["Which language do you want to learn?", "What's your experience?", "Where should we call you?"],
    doneTitle: "Done",
    langs: [
      { label: "English", note: "Groups of up to 6, weekday evenings" },
      { label: "Spanish", note: "Groups of up to 6, weekday evenings" },
      { label: "Chinese", note: "Groups of up to 6, weekday evenings" },
      { label: "Russian as a foreign language", note: "For those who moved to Russia" },
    ],
    levels: [
      { label: "Starting from zero", note: "Never studied it, or forgot almost everything" },
      { label: "I remember some", note: "School or courses a long time ago" },
      { label: "I speak, but with effort", note: "You understand more than you say" },
      { label: "I speak fluently", note: "You need practice and specialised vocabulary" },
    ],
    nameLabel: "Your name",
    contactLabel: "Phone or email",
    submit: "Book a free trial class",
    disclaimer: "Free, commits you to nothing. We reply within the day.",
    successText:
      "An administrator will contact you within the day and match you to a group and the nearest trial class date.",
    sendAnother: "Send another one",
    hintDefault: "Takes less than a minute",
    back: "Back",
    nameError: "Enter your name",
    contactError: "Enter a phone number or email",
  },

  footer: {
    logoAlt: "Nova Lingua",
    line1: "Tyumen, 74 Maksima Gorkogo St · next to 400-letiya Tyumeni Square",
    line2: "English · Spanish · Chinese · Russian as a foreign language",
    line3: "Teaching since 2012",
  },
};
