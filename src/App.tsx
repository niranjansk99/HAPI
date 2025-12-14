import { useState } from 'react';
import { Home } from './components/Home';
import { Lessons } from './components/Lessons';
import { Progress } from './components/Progress';
import { Profile } from './components/Profile';
import { LessonDetail } from './components/LessonDetail';
import { JourneyScreen } from './components/JourneyScreen';
import { Achievements } from './components/Achievements';
import { Leaderboard } from './components/Leaderboard';
import { Shop } from './components/Shop';
import { DailyChallenge } from './components/DailyChallenge';
import { SettingsPage } from './components/SettingsPage';
import { Onboarding } from './components/Onboarding';
import { LandingPage } from './components/LandingPage';

export default function App() {

  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [userStats, setUserStats] = useState({
    streak: 5,
    points: 1250,
    level: 7,
    completedLessons: 23,
    gems: 150
  });

  const navigateToLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setCurrentPage('lesson-detail');
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    setCurrentPage('journey');
  };

  if (showLanding) {
    return <LandingPage onStart={() => {
      setShowLanding(false);
      setShowOnboarding(true);
    }} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} userStats={userStats} />;
      case 'lessons':
        return <Lessons onNavigate={setCurrentPage} userStats={userStats} setUserStats={setUserStats} navigateToLesson={navigateToLesson} />;
      case 'progress':
        return <Progress onNavigate={setCurrentPage} userStats={userStats} />;
      case 'profile':
        return <Profile onNavigate={setCurrentPage} userStats={userStats} />;
      case 'journey':
        return <JourneyScreen onNavigate={setCurrentPage} userStats={userStats} />;
      case 'lesson-detail':
        return <LessonDetail onNavigate={setCurrentPage} lesson={selectedLesson} userStats={userStats} setUserStats={setUserStats} />;
      case 'achievements':
        return <Achievements onNavigate={setCurrentPage} userStats={userStats} />;
      case 'leaderboard':
        return <Leaderboard onNavigate={setCurrentPage} userStats={userStats} />;
      case 'shop':
        return <Shop onNavigate={setCurrentPage} userStats={userStats} setUserStats={setUserStats} />;
      case 'daily-challenge':
        return <DailyChallenge onNavigate={setCurrentPage} userStats={userStats} setUserStats={setUserStats} />;
      case 'settings':
        return <SettingsPage onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} userStats={userStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {renderPage()}
    </div>
  );
}