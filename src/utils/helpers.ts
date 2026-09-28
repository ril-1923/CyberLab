export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100;
}

export function xpToNextLevel(currentXp: number): { current: number; needed: number; percent: number } {
  const level = calculateLevel(currentXp);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const xpInLevel = currentXp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const percent = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  return { current: xpInLevel, needed: xpNeeded, percent };
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(d);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
    case 'Beginner':
      return 'success';
    case 'Medium':
    case 'Intermediate':
      return 'warning';
    case 'Hard':
    case 'Advanced':
      return 'danger';
    case 'Expert':
      return 'expert';
    default:
      return 'secondary';
  }
}

export function getAvatarColor(seed: string): string {
  const colors = ['#00ff9d', '#00d4ff', '#ff6b6b', '#ffd93d', '#a78bfa', '#fb7185', '#34d399', '#60a5fa'];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}
