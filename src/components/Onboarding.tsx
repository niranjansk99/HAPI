import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CalmingTextScreen } from './onboarding/CalmingTextScreen';
import { SelectionScreen } from './onboarding/SelectionScreen';
import { MoodScreen } from "./onboarding/MoodScreen";
import jumpingVideo from '../assets/Jumping-vmake.mov';
import { Coffee, CloudLightning, Waves, BatteryLow, HelpCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    goals: [],
    experienceLevel: '',
    dailyGoal: '',
    reminderTime: '09:00',
    mood: 50, // Changed to number as expected by MoodScreen
    goal: '', // Added back
    experience: '' // Added back
  });

  const updateUserData = (key: string, value: any) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step === ) { // Changed from 6 to match actual steps
      onComplete();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const feelingsOptions = [
    {
      id: 'Calm',
      label: 'Calm',
      desc: 'Your mind is clear.',
      icon: Coffee,
      color: 'from-amber-300 to-yellow-400'
    },
    {
      id: 'Stressed',
      label: 'Stressed',
      desc: 'Lets bring back some balance.',
      icon: CloudLightning,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: 'Overwhelmed',
      label: 'Overwhelmed',
      desc: 'Sometimes its all too much - lets start small.',
      icon: Waves,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'Empty',
      label: 'Empty',
      desc: 'Lets see how we can charge you up again.',
      icon: BatteryLow,
      color: 'from-indigo-300 to-purple-300'
    },
    {
      id: 'Unsure',
      label: 'Unsure',
      desc: 'No worries - we will figure it out together!',
      icon: HelpCircle,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const steps = [
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
    <MoodScreen key="mood" onNext={nextStep} onBack={prevStep} userData={userData} updateUserData={updateUserData} />,
  ];

  return (
    <div className="bg-white min-h-screen">
      <AnimatePresence mode="wait">
        {steps[step]}
      </AnimatePresence>
      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-0 right-0 px-6">
        <div className="max-w-md mx-auto flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all ${index <= step ? 'bg-green-500' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
