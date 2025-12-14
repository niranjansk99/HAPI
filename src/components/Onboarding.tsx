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
import { Screen11 } from './onboarding/Screen11';
import { Screen12 } from './onboarding/Screen12';
import { Screen13 } from './onboarding/Screen13';
import { Screen14 } from './onboarding/Screen14';
import { Screen15 } from './onboarding/Screen15';
import { Screen16 } from './onboarding/Screen16';
import { Screen17 } from './onboarding/Screen17';
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
    worldValue: "",
    identityStyle: "",
    checkInFeeling: "",
    mostTrueParts: "",
    shareObservationConsent: false,
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

    <Screen11
      key="screen-11"
      onNext={nextStep}
      onBack={prevStep}
      userData={userData}
      updateUserData={updateUserData}
    />,

    <Screen12
      key="screen-12"
      onNext={nextStep}
      onBack={prevStep}
      userData={userData}
      updateUserData={updateUserData}
    />,

    <Screen13 key="screen-13"
      onNext={nextStep} />,

    <Screen14 key="screen-14"
      onNext={nextStep}
      onBack={prevStep}
      userData={userData}
      updateUserData={updateUserData} />,

    <Screen15 key="screen-15"
      onNext={nextStep}
      onBack={prevStep}
      userData={userData}
      updateUserData={updateUserData} />,

    <Screen16 key="screen-16"
      onNext={nextStep}
    />,

    <Screen17
      key="screen-17"
      onNext={nextStep}
      onBack={prevStep}
      userData={userData}
      updateUserData={updateUserData}
    />,

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
