import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, ActivityEntry, QuizResult } from '@/types';
import { generateId } from '@/utils/helpers';
import { achievements } from '@/data/achievements';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginDemo: () => void;
  register: (data: { fullName: string; username: string; email: string; password: string }) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXp: (amount: number) => void;
  addActivity: (entry: Omit<ActivityEntry, 'id' | 'timestamp'>) => void;
  unlockAchievement: (achievementId: string) => boolean;
  completeLesson: (lessonId: string, xp: number) => void;
  completeChallenge: (challengeId: string, xp: number) => void;
  completeQuiz: (result: QuizResult) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'cyberlab_user';
const USERS_KEY = 'cyberlab_users';

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function loadUsers(): Record<string, { password: string; user: User }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

function saveUser(user: User | null) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

function saveUsers(users: Record<string, { password: string; user: User }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function createUser(data: { fullName: string; username: string; email: string; password: string }): User {
  return {
    id: generateId(),
    fullName: data.fullName,
    username: data.username,
    email: data.email,
    password: data.password,
    bio: 'Cybersecurity enthusiast on a learning journey.',
    avatarColor: '#00ff9d',
    joinedAt: new Date().toISOString(),
    xp: 50,
    level: 1,
    streak: 1,
    coursesCompleted: 0,
    challengesSolved: 0,
    completedLessons: [],
    completedCourses: [],
    completedChallenges: [],
    completedQuizzes: {},
    unlockedAchievements: ['a1'],
    activityLog: [
      { id: generateId(), type: 'login', title: 'Account Created', detail: 'Welcome to CyberLab!', timestamp: new Date().toISOString(), xp: 50 },
    ],
    favorites: [],
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser());

  useEffect(() => {
    saveUser(user);
  }, [user]);

  function register(data: { fullName: string; username: string; email: string; password: string }): { success: boolean; error?: string } {
    const users = loadUsers();
    const existing = Object.values(users).find(
      (u) => u.user.email.toLowerCase() === data.email.toLowerCase() || u.user.username.toLowerCase() === data.username.toLowerCase()
    );
    if (existing) return { success: false, error: 'An account with this email or username already exists.' };
    const newUser = createUser(data);
    users[newUser.id] = { password: data.password, user: newUser };
    saveUsers(users);
    setUser(newUser);
    return { success: true };
  }

  function login(email: string, password: string): { success: boolean; error?: string } {
    const users = loadUsers();
    const found = Object.values(users).find(
      (u) => u.user.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const updatedUser = { ...found.user, streak: found.user.streak + 0 };
    setUser(updatedUser);
    return { success: true };
  }

  function loginDemo() {
    const demoUser: User = {
      id: 'demo-user',
      fullName: 'Demo Defender',
      username: 'demo_defender',
      email: 'demo@cyberlab.io',
      password: 'demo',
      bio: 'Exploring CyberLab through the demo account.',
      avatarColor: '#00d4ff',
      joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      xp: 3200,
      level: 6,
      streak: 5,
      coursesCompleted: 2,
      challengesSolved: 8,
      completedLessons: ['c1l1', 'c1l2', 'c1l3', 'c4l1', 'c4l2'],
      completedCourses: [],
      completedChallenges: ['ch2', 'ch3', 'ch7', 'ch17'],
      completedQuizzes: {},
      unlockedAchievements: ['a1', 'a2', 'a3', 'a5'],
      activityLog: [
        { id: generateId(), type: 'challenge', title: 'Solved "Base64 Hidden Message"', detail: 'Cryptography challenge completed', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), xp: 75 },
        { id: generateId(), type: 'course', title: 'Completed lesson "SQL Injection"', detail: 'Web Application Security', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), xp: 50 },
        { id: generateId(), type: 'achievement', title: 'Earned "First Challenge" badge', detail: 'Solved first challenge', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), xp: 100 },
        { id: generateId(), type: 'quiz', title: 'Completed Cybersecurity Fundamentals Quiz', detail: 'Score: 8/10', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), xp: 160 },
      ],
      favorites: ['c1', 'c4'],
      isDemo: true,
    };
    setUser(demoUser);
  }

  function logout() {
    setUser(null);
  }

  function updateUser(updates: Partial<User>) {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }

  function addXp(amount: number) {
    setUser((prev) => {
      if (!prev) return prev;
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
  }

  function addActivity(entry: Omit<ActivityEntry, 'id' | 'timestamp'>) {
    setUser((prev) => {
      if (!prev) return prev;
      const newEntry: ActivityEntry = { ...entry, id: generateId(), timestamp: new Date().toISOString() };
      return { ...prev, activityLog: [newEntry, ...prev.activityLog].slice(0, 50) };
    });
  }

  function unlockAchievement(achievementId: string): boolean {
    let unlocked = false;
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.unlockedAchievements.includes(achievementId)) return prev;
      const achievement = achievements.find((a) => a.id === achievementId);
      if (!achievement) return prev;
      unlocked = true;
      const newXp = prev.xp + achievement.xp;
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
      const newEntry: ActivityEntry = {
        id: generateId(),
        type: 'achievement',
        title: `Earned "${achievement.name}" badge`,
        detail: achievement.description,
        timestamp: new Date().toISOString(),
        xp: achievement.xp,
      };
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        unlockedAchievements: [...prev.unlockedAchievements, achievementId],
        activityLog: [newEntry, ...prev.activityLog].slice(0, 50),
      };
    });
    return unlocked;
  }

  function completeLesson(lessonId: string, xp: number) {
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.completedLessons.includes(lessonId)) return prev;
      const newXp = prev.xp + xp;
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
      const newEntry: ActivityEntry = {
        id: generateId(),
        type: 'course',
        title: `Completed lesson`,
        detail: `Earned ${xp} XP`,
        timestamp: new Date().toISOString(),
        xp,
      };
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessons: [...prev.completedLessons, lessonId],
        activityLog: [newEntry, ...prev.activityLog].slice(0, 50),
      };
    });
  }

  function completeChallenge(challengeId: string, xp: number) {
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.completedChallenges.includes(challengeId)) return prev;
      const newXp = prev.xp + xp;
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
      const newEntry: ActivityEntry = {
        id: generateId(),
        type: 'challenge',
        title: `Solved challenge`,
        detail: `Earned ${xp} XP`,
        timestamp: new Date().toISOString(),
        xp,
      };
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        challengesSolved: prev.challengesSolved + 1,
        completedChallenges: [...prev.completedChallenges, challengeId],
        activityLog: [newEntry, ...prev.activityLog].slice(0, 50),
      };
    });
  }

  function completeQuiz(result: QuizResult) {
    setUser((prev) => {
      if (!prev) return prev;
      const newXp = prev.xp + result.xpEarned;
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
      const newEntry: ActivityEntry = {
        id: generateId(),
        type: 'quiz',
        title: `Completed quiz`,
        detail: `Score: ${result.correct}/${result.total} — Earned ${result.xpEarned} XP`,
        timestamp: new Date().toISOString(),
        xp: result.xpEarned,
      };
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedQuizzes: { ...prev.completedQuizzes, [result.quizId]: result },
        activityLog: [newEntry, ...prev.activityLog].slice(0, 50),
      };
    });
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    login,
    loginDemo,
    register,
    logout,
    updateUser,
    addXp,
    addActivity,
    unlockAchievement,
    completeLesson,
    completeChallenge,
    completeQuiz,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
