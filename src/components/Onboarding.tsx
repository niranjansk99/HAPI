import { useState } from 'react';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { GoalScreen } from './onboarding/GoalScreen';
import { ExperienceScreen } from './onboarding/ExperienceScreen';
import { CurrentFeelingsScreen } from './onboarding/CurrentFeelingsScreen';
import { MoodScreen } from "./onboarding/MoodScreen";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    goal: '',
    experience: '',
    dailyGoal: '',
    reminderTime: '',
    mood: 50,
  });

  const updateUserData = (key: string, value: any) => {
    setUserData({ ...userData, [key]: value });
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const screens = [
    <WelcomeScreen key="welcome" onNext={nextStep} />,
    <GoalScreen key="goal" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
    <ExperienceScreen key="experience" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
    <CurrentFeelingsScreen key="daily" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
    <MoodScreen key="mood" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />, // ✅ added
    //<ReminderScreen key="reminder" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
    //<ReadyScreen key="ready" onNext={nextStep} onBack={prevStep} />
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {screens[currentStep]}

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-0 right-0 px-6">
        <div className="max-w-md mx-auto flex gap-2">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all ${index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
