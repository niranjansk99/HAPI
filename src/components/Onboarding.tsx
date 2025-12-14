import { useState } from 'react';
import { CalmingTextScreen } from './onboarding/CalmingTextScreen';
import { SelectionScreen } from './onboarding/SelectionScreen';
import jumpingVideo from '../assets/Jumping-vmake.mov';
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
import * as LucideIcons from 'lucide-react';
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

  const feelingsOptions = [
    {
      id: 'Calm',
      label: 'Calm',
      desc: 'Your mind is clear.',
      icon: LucideIcons.Coffee,
      color: 'from-amber-300 to-yellow-400'
    },
    {
      id: 'Stressed',
      label: 'Stressed',
      desc: 'Lets bring back some balance.',
      icon: LucideIcons.CloudLightning,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: 'Overwhelmed',
      label: 'Overwhelmed',
      desc: 'Sometimes its all too much - lets start small.',
      icon: LucideIcons.Waves,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'Empty',
      label: 'Empty',
      desc: 'Lets see how we can charge you up again.',
      icon: LucideIcons.BatteryLow,
      color: 'from-indigo-300 to-purple-300'
    },
    {
      id: 'Unsure',
      label: 'Unsure',
      desc: 'No worries - we will figure it out together!',
      icon: LucideIcons.HelpCircle,
      color: 'from-purple-400 to-pink-500'
    }
  ];


  const screens = [
    <CalmingTextScreen
      key="welcome"
      onNext={nextStep}
      videoSrc={jumpingVideo}
      headline="Welcome to HAPI"
      subtext={<>
        You don’t have to have it all figured out
        <br /><br /><br />
        Many people feel lost at some point in their life. You’re not behind. You’re human.
      </>}
      buttonText="Get Started"
    />,
    <CalmingTextScreen
      key="goal"
      onNext={nextStep}
      onBack={prevStep}
      videoSrc={jumpingVideo}
      subtext={<>
        Feeling overwhelmed doesn’t mean something is wrong with you.
        <br /><br /><br />
        It often means you’re at a point where something new wants to begin.
      </>}
      buttonText="Go ahead"
    />,
    <CalmingTextScreen
      key="experience"
      onNext={nextStep}
      onBack={prevStep}
      videoSrc={jumpingVideo}
      subtext={<>
        Hapi is here to walk with you.
        <br /><br /><br />
        No pressure. No judgment. Just hoonest questions - at your pace.
      </>}
      buttonText="Go ahead"
    />,
    <SelectionScreen
      key="daily"
      onNext={nextStep}
      onBack={prevStep}
      headline="How are you feeling right now?"
      subline="Don't overthink it - just follow you first intention"
      options={feelingsOptions}
      selectedValues={userData.dailyGoal}
      onSelect={(val) => updateUserData('dailyGoal', val)}
      topIcon="✨"
    />,
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