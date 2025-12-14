import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CalmingTextScreen } from './onboarding/CalmingTextScreen';
import { SelectionScreen } from './onboarding/SelectionScreen';
import { InformationScreen } from './onboarding/InformationScreen';
import { InputScreen } from './onboarding/InputScreen';
import { SequenceScreen } from './onboarding/SequenceScreen';
import { ReadyScreen } from './onboarding/ReadyScreen';
import jumpingVideo from '../assets/Jumping-vmake.webm';
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
    shareObservationConsent: null as null | boolean,
    screen18Preference: "" as "" | "helpful" | "unsure" | "practical",

  });

  const updateUserData = (key: string, value: any) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    // Branching Logic
    if (currentStep === 15) { // Screen 17 (Index 15)
      if (userData.shareObservationConsent === true) {
        setCurrentStep(16); // Go to SequenceScreen (Yes path)
      } else {
        setCurrentStep(17); // Go to SelectionScreen (No path / Screen 19)
      }
      return;
    }

    if (currentStep === 16) { // SequenceScreen (Index 16)
      setCurrentStep(18); // Skip SelectionScreen, go to Screen 20
      return;
    }

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
    // Merging Point Back Logic (Screen 19 is at index 17)
    if (currentStep === 17) {
      // If we are on Screen 19 and consent is false (No path), we skip SequenceScreen (16) and go back to 15
      if (userData.shareObservationConsent === false) {
        setCurrentStep(15);
        return;
      }
      // If consent is true (Yes path), default behavior (17 -> 16) is correct
    }

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

  const tooMuchOptions = [
    {
      id: "yes_definitely",
      label: "Yes, definitely",
      emoji: "😮‍💨",
      color: "from-rose-400 to-red-500",
      desc: "It felt heavy today",
      icon: LucideIcons.Circle // Placeholder icon as Screen uses emoji
    },
    {
      id: "a_bit",
      label: "A bit",
      emoji: "😵‍💫",
      color: "from-amber-400 to-orange-500",
      desc: "Some moments were intense",
      icon: LucideIcons.Circle
    },
    {
      id: "not_really",
      label: "Not really",
      emoji: "🙂",
      color: "from-emerald-400 to-teal-500",
      desc: "It was manageable",
      icon: LucideIcons.Circle
    },
  ];

  const momentFeelGoodOptions = [
    "Being with someone",
    "Feeling understood",
    "Doing something with my hands",
    "Being outside",
    "Having no pressure",
    "I don’t know",
  ].map(opt => ({
    id: opt,
    label: opt,
    desc: "",
    icon: LucideIcons.Circle, // Placeholder
    color: "from-green-50 to-green-100", // Subtle selection color
    recommended: false
  }));

  const worldValueOptions = [
    "Kindness",
    "Gratitude",
    "Freedom",
    "Creativity",
    "Stability",
    "Connection",
    "I’m not sure",
  ].map(opt => ({
    id: opt,
    label: opt,
    desc: "",
    icon: LucideIcons.Circle,
    color: "from-green-50 to-green-100",
    recommended: false
  }));

  const identityStyleOptions = [
    "Helping people directly",
    "Creating something",
    "Working with nature animals",
    "Expressing ideas / stories",
    "I don’t know yet",
  ].map(opt => ({
    id: opt,
    label: opt,
    desc: "",
    icon: LucideIcons.Circle,
    color: "from-green-50 to-green-100",
    recommended: false
  }));

  const checkInFeelingOptions = [
    "A bit lighter",
    "Seen / understood",
    "Still unsure",
    "Overwhelmed",
    "I don’t really know",
  ].map(opt => ({
    id: opt,
    label: opt,
    desc: "",
    icon: LucideIcons.Circle,
    color: "from-green-50 to-green-100",
    recommended: false
  }));

  const mostTruePartsOptions = [
    "Feeling connected to others",
    "Feeling calm and without pressure",
    "Giving something to others",
    "Having direction, even if small",
    "I’m not sure yet",
  ].map(opt => ({
    id: opt,
    label: opt,
    desc: "",
    icon: LucideIcons.Circle,
    color: "from-green-50 to-green-100",
    recommended: false
  }));

  const screen18YesBullets = [
    "As you were answering, one thing became very clear.",
    "You seem to feel most at peace when there’s space. When no one is rushing you.\nWhen nothing is expected from you.",
    "And that’s actually something really beautiful.",
    "It often means you’re someone who listens deeply.",
    "Someone who feels a lot.",
    "Someone who gives more when things feel honest and calm.",
    "There’s nothing wrong with needing space.",
    "For many people, that’s exactly where they feel most like themselves.",
    "This doesn’t mean you’re lost.",
    "It usually means you’re in a moment where you’re becoming more aware of what truly matters to you.",
  ];

  const screen18NoOptions = [
    { id: "helpful", label: "Yes, that sounds helpful", value: "helpful", desc: "", icon: LucideIcons.Circle, color: "from-green-50 to-green-100" },
    { id: "unsure", label: "I’m not sure yet", value: "unsure", desc: "", icon: LucideIcons.Circle, color: "from-green-50 to-green-100" },
    { id: "practical", label: "I just want something practical", value: "practical", desc: "", icon: LucideIcons.Circle, color: "from-green-50 to-green-100" },
  ];

  const screens = [
    // 0
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
    // 1
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
    // 2
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
    // 3
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
    // 4
    <SelectionScreen
      key="toomuch"
      onNext={nextStep}
      onBack={prevStep}
      headline="Did today feel like too much?"
      subline="Choose the option that fits best"
      options={tooMuchOptions}
      selectedValues={userData.tooMuchToday}
      onSelect={(val) => updateUserData('tooMuchToday', val)}
      topIcon={
        userData.tooMuchToday === 'yes_definitely' ? '😮‍💨' :
          userData.tooMuchToday === 'a_bit' ? '😵‍💫' : '🙂'
      }
    />,
    // 5
    <InformationScreen
      key="reassurance"
      onNext={nextStep}
      icon="🌱"
      headline="Thanks for telling me."
      subline="You don’t need to solve anything today."
    />,
    // 6
    <InputScreen
      key="calm-moment"
      onNext={nextStep}
      onBack={prevStep}
      headline="Can you remember a moment where you felt calm or okay recently?"
      subline="A quick note is enough — one sentence is fine."
      placeholder="Example: When I had my tea in the morning and the house was quiet…"
      text={userData.calmMomentText}
      setText={(val) => updateUserData('calmMomentText', val)}
      topIcon="🫧"
      allowSkip={true}
      skipText="Nothing comes to mind"
      isSkipped={userData.calmMomentNone}
      onSkip={(val) => updateUserData('calmMomentNone', val)}
    />,
    // 7
    <SelectionScreen
      key="screen-9"
      onNext={nextStep}
      onBack={prevStep}
      headline="What do you think made this moment feel good?"
      subline="Pick the option that fits best — there’s no wrong answer."
      options={momentFeelGoodOptions}
      selectedValues={userData.momentFeelGoodReason}
      onSelect={(val) => updateUserData('momentFeelGoodReason', val)}
      topIcon="✨"
    />,
    // 8
    <InformationScreen
      key="screen-10"
      onNext={nextStep}
      icon="🌱"
      headline="You don’t need perfect answers. Patterns matter more than clarity"
    />,
    // 9
    <SelectionScreen
      key="screen-11"
      onNext={nextStep}
      onBack={prevStep}
      headline="If one thing mattered more in the world, what should it be?"
      subline="Pick the option that fits best — there’s no wrong answer."
      options={worldValueOptions}
      selectedValues={userData.worldValue}
      onSelect={(val) => updateUserData('worldValue', val)}
      topIcon="✨"
    />,
    // 10
    <SelectionScreen
      key="screen-12"
      onNext={nextStep}
      onBack={prevStep}
      headline="Which of these feels more like you?"
      subline="Choose the closest fit — you can always change this later."
      options={identityStyleOptions}
      selectedValues={userData.identityStyle}
      onSelect={(val) => updateUserData('identityStyle', val)}
      topIcon="✨"
    />,
    // 11
    <InformationScreen
      key="screen-13"
      onNext={nextStep}
      icon="🌱"
      headline="Many people find their direction by listening, not forcing."
    />,
    // 12
    <SelectionScreen
      key="screen-14"
      onNext={nextStep}
      onBack={prevStep}
      headline="Before we move forward — let me check in with you"
      subline="How do you feel right now, after answering these questions?"
      options={checkInFeelingOptions}
      selectedValues={userData.checkInFeeling}
      onSelect={(val) => updateUserData('checkInFeeling', val)}
      topIcon="💭"
    />,
    // 13
    <SelectionScreen
      key="screen-15"
      onNext={nextStep}
      onBack={prevStep}
      headline="What parts of your answers felt most true to you?"
      subline="Choose the one that feels closest — you can always change it later."
      options={mostTruePartsOptions}
      selectedValues={userData.mostTrueParts}
      onSelect={(val) => updateUserData('mostTrueParts', val)}
      topIcon="🧭"
    />,
    // 14
    <InformationScreen
      key="screen-16"
      onNext={nextStep}
      icon="🌱"
      headline="You don’t need clarity to move forward. You only need honesty — and you’re already doing that."
    />,
    // 15 (Branching Point - Screen 17)
    <SelectionScreen
      key="screen-17"
      onNext={nextStep}
      onBack={prevStep}
      headline="Can I share something I noticed about you?"
      subline="You’re always free to say no."
      options={[
        { id: "true", label: "Yes", desc: "", icon: LucideIcons.Circle, color: "from-green-50 to-green-100" },
        { id: "false", label: "No", desc: "", icon: LucideIcons.Circle, color: "from-green-50 to-green-100" }
      ]}
      selectedValues={userData.shareObservationConsent ? "true" : "false"}
      onSelect={(val) => updateUserData('shareObservationConsent', val === "true")}
      topIcon="💬"
    />,
    // 16 (Yes Path - Screen 18 Yes)
    <SequenceScreen
      key="screen-18-yes"
      onNext={nextStep}
      onBack={prevStep}
      icon="🌿"
      headline="Something I noticed"
      bullets={screen18YesBullets}
    />,
    // 17 (No Path - Screen 19)
    <SelectionScreen
      key="screen-19"
      onNext={nextStep}
      onBack={prevStep}
      headline="I won’t tell you who you are. But I can help you notice patterns — if you want."
      subline="What would you prefer?"
      options={screen18NoOptions}
      selectedValues={userData.screen18Preference}
      onSelect={(val) => updateUserData("screen18Preference", val)}
      topIcon="🧭"
    />,

    // 18 (Screen 20 - Merged)
    <InformationScreen
      key="screen-20"
      onNext={nextStep}
      icon="🧭"
      headline="Most people don’t have one single purpose. They have a direction — a range where things feel right."
    />,

    // 19 (Screen 24)
    <InformationScreen
      key="screen-24"
      onNext={nextStep}
      icon="👣"
      headline="This is not about finding answers. It’s about trying things."
      subline="Small actions create clarity. You don’t need motivation — just one step."
    />,

    // 20 (End)
    <ReadyScreen key="ready" onNext={nextStep} onBack={prevStep} />
  ];


  return (
    <div className="bg-white min-h-screen">
      <AnimatePresence mode="wait">
        {screens[currentStep]}
      </AnimatePresence>
      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-0 right-0 px-6">
        <div className="max-w-md mx-auto flex gap-2">
          {screens.map((_, index) => (
            // Don't show progress for hidden path steps if we aren't on them
            // Simplified: just show all dots
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