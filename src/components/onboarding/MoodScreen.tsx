import { MoodSliderPage } from "./MoodSliderPage";

type MoodScreenProps = {
    onNext: () => void;
    onBack: () => void;
    userData: {
        mood?: number;
        goal: string;
        experience: string;
        dailyGoal: string;
        reminderTime: string;
    };
    updateUserData: (key: string, value: any) => void;
};

export function MoodScreen({ onNext, onBack, userData, updateUserData }: MoodScreenProps) {
    return (
        <div className="max-w-md mx-auto px-6 pt-12">
            <h1 className="text-2xl font-bold">Pick your current mood</h1>
            <p className="text-gray-600 mt-2">This helps personalize your experience.</p>

            <div className="mt-6">
                <MoodSliderPage
                    value={userData.mood ?? 60}
                    onChange={(v) => updateUserData("mood", v)}
                    title="How do you feel right now?"
                />
            </div>

            <div className="mt-8 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="px-4 py-2 rounded-lg bg-white shadow border"
                >
                    Back
                </button>

                <button
                    onClick={onNext}
                    className="px-5 py-2 rounded-lg bg-green-600 text-white shadow"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}