export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type ChallengeDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type ThemeMode = 'dark' | 'light';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  avatarColor: string;
  joinedAt: string;
  xp: number;
  level: number;
  streak: number;
  coursesCompleted: number;
  challengesSolved: number;
  completedLessons: string[];
  completedCourses: string[];
  completedChallenges: string[];
  completedQuizzes: Record<string, QuizResult>;
  unlockedAchievements: string[];
  activityLog: ActivityEntry[];
  favorites: string[];
  isDemo?: boolean;
}

export interface QuizResult {
  quizId: string;
  score: number;
  correct: number;
  incorrect: number;
  total: number;
  xpEarned: number;
  completedAt: string;
}

export interface ActivityEntry {
  id: string;
  type: 'course' | 'challenge' | 'quiz' | 'achievement' | 'login' | 'lab';
  title: string;
  detail: string;
  timestamp: string;
  xp?: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  icon: string;
  content: string;
  codeExample?: string;
  note?: string;
  tip?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  difficulty: Difficulty;
  duration: number;
  lessonsCount: number;
  xpReward: number;
  instructor: string;
  instructorBio: string;
  instructorAvatarColor: string;
  icon: string;
  rating: number;
  reviewsCount: number;
  enrolled: number;
  objectives: string[];
  requirements: string[];
  modules: Module[];
  reviews: CourseReview[];
}

export interface CourseReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: ChallengeDifficulty;
  xp: number;
  solves: number;
  description: string;
  objectives: string[];
  hints: string[];
  flag: string;
  terminalCommands: string[];
  scenario: string;
}

export interface Question {
  id: string;
  type: 'multiple' | 'truefalse';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  xpReward: number;
  questions: Question[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp: number;
  requirement: string;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  level: number;
  xp: number;
  challenges: number;
  badges: number;
  isCurrentUser?: boolean;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: number;
  xp: number;
  skills: string[];
  icon: string;
  scenario: string;
  tasks: string[];
}

export interface UserSettings {
  theme: ThemeMode;
  notifications: {
    courseReminders: boolean;
    challengeNotifications: boolean;
    achievementNotifications: boolean;
  };
  learningPreferences: {
    dailyGoal: number;
    preferredCategories: string[];
  };
}
