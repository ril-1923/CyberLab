import type { Achievement } from '@/types';

export const achievements: Achievement[] = [
  { id: 'a1', name: 'First Login', description: 'Welcome to CyberLab! You have taken the first step.', icon: 'bi-door-open', xp: 50, requirement: 'Log in to your account' },
  { id: 'a2', name: 'First Course', description: 'You started your first course. Knowledge is power.', icon: 'bi-book', xp: 100, requirement: 'Start your first course' },
  { id: 'a3', name: 'First Challenge', description: 'You solved your first challenge. The lab recognizes you.', icon: 'bi-flag', xp: 100, requirement: 'Solve your first challenge' },
  { id: 'a4', name: '10 Challenges', description: 'Ten challenges solved. You are getting serious.', icon: 'bi-trophy', xp: 250, requirement: 'Solve 10 challenges' },
  { id: 'a5', name: 'Quiz Master', description: 'You completed your first quiz. Test your knowledge further.', icon: 'bi-patch-question', xp: 150, requirement: 'Complete a quiz' },
  { id: 'a6', name: '7 Day Streak', description: 'Seven days of consistent learning. Discipline is key.', icon: 'bi-fire', xp: 200, requirement: 'Maintain a 7-day learning streak' },
  { id: 'a7', name: 'Cyber Defender', description: 'Completed the Cybersecurity Fundamentals course.', icon: 'bi-shield-check', xp: 300, requirement: 'Complete the Cybersecurity Fundamentals course' },
  { id: 'a8', name: 'Network Guardian', description: 'Mastered the Network Security course.', icon: 'bi-hdd-network', xp: 300, requirement: 'Complete the Network Security Mastery course' },
  { id: 'a9', name: 'Web Security Specialist', description: 'Completed the Web Application Security course.', icon: 'bi-globe', xp: 300, requirement: 'Complete the Web Application Security course' },
  { id: 'a10', name: 'Elite Hacker', description: 'Solved 5 Expert-level challenges. Elite status achieved.', icon: 'bi-lightning-charge', xp: 500, requirement: 'Solve 5 Expert difficulty challenges' },
  { id: 'a11', name: 'Course Completer', description: 'Completed your first full course. Dedication pays off.', icon: 'bi-mortarboard', xp: 250, requirement: 'Complete any course fully' },
  { id: 'a12', name: 'Level 10', description: 'Reached level 10. You are advancing rapidly.', icon: 'bi-star', xp: 400, requirement: 'Reach level 10' },
];

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}
