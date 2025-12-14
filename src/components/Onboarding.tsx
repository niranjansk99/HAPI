import { useState } from 'react';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { GoalScreen } from './onboarding/GoalScreen';
import { ExperienceScreen } from './onboarding/ExperienceScreen';
import { DailyGoalScreen } from './onboarding/DailyGoalScreen';
//import { ReminderScreen } from './onboarding/ReminderScreen';
import { ReadyScreen } from './onboarding/ReadyScreen';
import { MoodScreen } from "./onboarding/MoodScreen";
import { TooMuchScreen } from './onboarding/TooMuchScreen';
import { ReassuranceScreen } from './onboarding/ReassuranceScreen';
import { CalmMomentScreen } from './onboarding/CalmMomentScreen';
import { Screen9 } from './onboarding/Screen9';
import { Screen10 } from './onboarding/Screen10';
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
    tooMuchToday: "a_bit",
    calmMomentText: "",
    calmMomentNone: false,
    momentFeelGoodReason: "",
  });

  const updateUserData = (key: string, value: any) => {
    setUserData({ ...userData, [key]: value });
  };

  const nextStep = () => {
    setCurrentStep((s) => {
      const next = s + 1;
      if (next >= screens.length) {
        onComplete();
        return s; // keep last valid step
      }
      return next;
    });
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
    <DailyGoalScreen key="daily" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
    <MoodScreen key="mood" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
    <TooMuchScreen key="toomuch" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
    <ReassuranceScreen key="reassurance" onNext={nextStep} />,
    <CalmMomentScreen
      key="calm-moment"
      onNext={nextStep}
      onBack={prevStep}
      userData={userData}
      updateUserData={updateUserData}
    />,
    <Screen9
      key="screen-9"
      onNext={nextStep}
      onBack={prevStep}
      userData={userData}
      updateUserData={updateUserData}
    />,
    <Screen10 key="screen-10" onNext={nextStep} />,
    <ReadyScreen key="ready" onNext={nextStep} onBack={prevStep} />
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {screens[currentStep]}

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-0 right-0 px-6">
        <div className="max-w-md mx-auto flex gap-2">
          {[...Array(screens.length)].map((_, index) => (
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
