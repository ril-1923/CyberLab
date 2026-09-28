import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ToastProvider } from '@/components/Toast';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoadingState } from '@/components/LoadingState';

const LandingPage = lazy(() => import('@/pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const CoursesPage = lazy(() => import('@/pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const CourseDetailsPage = lazy(() => import('@/pages/CourseDetailsPage').then(m => ({ default: m.CourseDetailsPage })));
const LearningPage = lazy(() => import('@/pages/LearningPage').then(m => ({ default: m.LearningPage })));
const ChallengesPage = lazy(() => import('@/pages/ChallengesPage').then(m => ({ default: m.ChallengesPage })));
const ChallengeDetailsPage = lazy(() => import('@/pages/ChallengeDetailsPage').then(m => ({ default: m.ChallengeDetailsPage })));
const QuizListPage = lazy(() => import('@/pages/QuizListPage').then(m => ({ default: m.QuizListPage })));
const QuizPage = lazy(() => import('@/pages/QuizPage').then(m => ({ default: m.QuizPage })));
const LeaderboardPage = lazy(() => import('@/pages/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })));
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage').then(m => ({ default: m.AchievementsPage })));
const LabsPage = lazy(() => import('@/pages/LabsPage').then(m => ({ default: m.LabsPage })));
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <ToastProvider>
            <HashRouter>
              <Suspense fallback={<div className="cyber-grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingState /></div>}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
                  <Route path="/courses/:id" element={<ProtectedRoute><CourseDetailsPage /></ProtectedRoute>} />
                  <Route path="/learning/:id" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />
                  <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
                  <Route path="/challenges/:id" element={<ProtectedRoute><ChallengeDetailsPage /></ProtectedRoute>} />
                  <Route path="/quiz" element={<ProtectedRoute><QuizListPage /></ProtectedRoute>} />
                  <Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                  <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
                  <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
                  <Route path="/labs" element={<ProtectedRoute><LabsPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
            </HashRouter>
          </ToastProvider>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
