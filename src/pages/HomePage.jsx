import { useState } from "react";
import InputField from "../components/InputField";
import GoalDropdown from "../components/GoalDropdown";
import SpecificGoalField from "../components/SpecificGoalField";
import TipList from "../components/TipList";
import { generateShortTips } from "../services/aiService";
import { useAppContext } from "../context/AppContext";

export default function HomePage() {
    const goals = [
        "Weight Loss", "Muscle Gain", "Better Sleep", "Stress Relief",
        "Healthy Eating", "Mental Wellness", "Increase Energy",
        "General Fitness", "Heart Health", "Immunity Boost", "Skin Health"
    ];

    const genders = ["Male", "Female"];

    // CONTEXT
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();
    const { name, gender, age, mainGoal, specificGoal } = formData;

    // UI STATES 
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const isFormValid = name && gender && age && mainGoal;

    // HANDLE GENERATE TIPS 
    const handleGenerate = async () => {
        setErrorMsg("");
        setLoading(true);

        try {
            const profile = { name, gender, age, mainGoal, specificGoal };
            const generatedTips = await generateShortTips(profile);

            // Add Unique IDs - IMPORTANT for TipDetailPage to find the correct tip
            const tipsWithId = generatedTips.map((t, idx) => ({
                ...t,
                id: `${Date.now()}_${idx}`,
                mainGoal,
                specificGoal,
                name,
                gender,
                age,
                long_explanation: null,  // initially empty
                steps: [],
                expected_progress: ""
            }));

            setTips(tipsWithId);

            // Auto-scroll
            setTimeout(() => {
                document.getElementById("tips-section")?.scrollIntoView({ behavior: "smooth" });
            }, 200);

        } catch (err) {
            setErrorMsg("Something went wrong while generating tips. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div
            className={`min-h-screen pb-20 ${darkMode
                ? "bg-gray-900 text-gray-100"
                : "bg-gray-50 text-gray-900"
                }`}>
            <div className="max-w-3xl mx-auto px-4 py-8 pb-20">

                {/*  FORM BOX  */}
                <div className={`shadow-lg p-6 rounded-2xl border space-y-6 transition hover:shadow-xl ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                    }`}>

                    <h2 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"
                        }`}>Your Wellness Profile</h2>
                    <p className={
                        darkMode ? "text-gray-300" : "text-gray-600"
                    }>
                        Enter your details and get AI-personalized wellness recommendations.
                    </p>

                    {/* NAME */}
                    <InputField
                        label="Name"
                        value={name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    {/* Gender */}
                    <GoalDropdown
                        title="Gender"
                        value={gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        options={genders}
                        optiontitle="Select Gender"
                    />

                    {/* AGE */}
                    <InputField
                        type="number"
                        label="Age"
                        value={age}
                        onChange={(e) => {
                            let val = e.target.value;
                            setFormData({ ...formData, age: val });
                        }}
                        onBlur={() => {
                            let val = Number(age);

                            // Apply real restrictions ONLY onBlur
                            if (val < 12) val = 12;
                            if (val > 100) val = 100;

                            setFormData({ ...formData, age: val });
                        }}
                    />



                    {/* MAIN GOAL */}
                    <GoalDropdown
                        title="Main Goal"
                        value={mainGoal}
                        onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
                        options={goals}
                        optiontitle="Select Goal"
                    />

                    {/* SPECIFIC GOAL (only when mainGoal selected) */}
                    {mainGoal && (
                        <SpecificGoalField
                            value={specificGoal}
                            onChange={(e) => setFormData({ ...formData, specificGoal: e.target.value })}
                        />
                    )}

                    {/* ERROR */}
                    {errorMsg && (
                        <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                    )}

                    {/* GENERATE BUTTON */}
                    <button
                        disabled={!isFormValid || loading}
                        onClick={handleGenerate}
                        className={`w-full py-3 rounded-xl font-semibold cursor-pointer text-white transition shadow-md 
                        ${isFormValid && !loading
                                ? "bg-green-600 hover:bg-green-700 hover:shadow-lg"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Generating..." : "Generate Wellness Tips"}
                    </button>
                </div>

                {/*  TIPS SECTION  */}
                {tips.length > 0 && (
                    <div id="tips-section" className="mt-10">
                        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-100" : "text-gray-800"
                            }`}>
                            Your Personalized Wellness Tips
                        </h2>

                        <TipList tips={tips} />
                    </div>
                )}
            </div>
        </div>
    );
}
