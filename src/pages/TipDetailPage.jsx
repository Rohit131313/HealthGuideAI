import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateDetailedTip } from "../services/aiService";
import {
    saveTip,
    isAlreadySaved,
    getSavedTips,
    removeTip,
} from "../services/localStorageService";
import SaveButton from "../components/SaveButton";
import { useAppContext } from "../context/AppContext";
import { usePopup } from "../context/PopUpContext";
import Typewriter from "../components/TypeWriter";
import { motion } from "framer-motion";

export default function TipDetailPage() {
    const { showPopup } = usePopup();
    const navigate = useNavigate();
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();

    const { id } = useParams();

    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [saved, setSaved] = useState(false);
    const [showSteps, setShowSteps] = useState(false);
    const [showExpected, setShowExpected] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);


    // Helper: find tip in saved tips
    const loadTipFromStorage = (tipId) => {
        const saved = getSavedTips();
        return saved.find((t) => String(t.id) === String(tipId)) || null;
    };

    // Load tip (Context → SavedTips → Redirect) 
    useEffect(() => {
        if (!id) return;

        // 1. Try to find in context (BEST SOURCE)
        const contextTip = tips.find((t) => String(t.id) === String(id));
        if (contextTip) {
            setTip(contextTip);
            setSaved(isAlreadySaved(contextTip.id));
            return;
        }

        // 2. Check Saved Tips (only long saved tips)
        const storedTip = loadTipFromStorage(id);
        if (storedTip) {
            setTip(storedTip);
            setSaved(true);
            return;
        }

        // 3. Nothing found → invalid / expired → go home
        navigate("/", { replace: true });
    }, [id, tips, navigate]);

    // Fetch details from AI ONLY IF needed 
    useEffect(() => {
        if (!tip) return;

        const needsDetails =
            !tip.long_explanation ||
            !Array.isArray(tip.steps) ||
            tip.steps.length === 0;

        if (!needsDetails) return; // ALREADY HAS DETAILS → DO NOT REGENERATE

        const profile = {
            name: tip.name || "",
            gender: tip.gender || "",
            age: tip.age || "",
            mainGoal: tip.mainGoal || "",
            specificGoal: tip.specificGoal || "",
        };

        const fetchDetails = async () => {
            setErrorMsg("");
            setLoading(true);

            try {
                const details = await generateDetailedTip(tip.title, profile);

                const merged = {
                    ...tip,
                    long_explanation:
                        typeof details.long_explanation === "string"
                            ? details.long_explanation
                            : "",
                    steps: Array.isArray(details.steps) ? details.steps : [],
                    expected_progress:
                        typeof details.expected_progress === "string"
                            ? details.expected_progress
                            : "",
                };

                // Update TipDetailPage state
                setTip(merged);

                // ⭐ Update context tips so HomePage & refresh use detailed version
                setTips((prev) =>
                    prev.map((t) => (t.id === merged.id ? merged : t))
                );

                // Update saved tips if already saved
                if (isAlreadySaved(merged.id)) {
                    removeTip(merged.id);
                    saveTip(merged);
                    setSaved(true);
                }
            } catch (err) {
                // console.error("Failed to generate detailed tip:", err);
                // setErrorMsg("Unable to fetch detailed explanation right now. Please try again.");
                showPopup("AI couldn't fetch details. Try again.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [tip, setTips]);

    const handleSave = () => {
        if (!tip) return;

        if (isAlreadySaved(tip.id)) {
            removeTip(tip.id);
            setSaved(false);
            showPopup("Removed from favorites.", "error");
        } else {
            saveTip(tip);
            setSaved(true);
            showPopup("Saved to favorites.", "success");
        }
    };


    const handleRetry = () => {
        setTip((prev) => ({
            ...prev,
            long_explanation: undefined,
            steps: [],
        }));
    };

    if (!tip) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${darkMode
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-50 text-gray-700"
                    }`}
            >
                <p>Loading tip...</p>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen ${darkMode
                ? "bg-gray-900 text-gray-100"
                : "bg-gray-50 text-gray-900"
                }`}>
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate("/")}
                        className={`cursor-pointer
                            ${darkMode
                                ? "text-green-300 hover:underline"
                                : "text-green-600 hover:underline"}
                        }`}
                    >
                        ← Back
                    </button>
                </div>

                <div className={`rounded-2xl shadow-lg border p-6 space-y-5 ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                    }`}>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-4xl mb-2">{tip.icon || "🩺"}</div>
                            <h1 className={`text-2xl font-bold leading-tight ${darkMode
                                ? "text-gray-100"
                                : "text-gray-800"
                                }`}>
                                {tip.title}
                            </h1>
                            <p className={
                                darkMode
                                    ? "text-gray-300 text-sm mt-2"
                                    : "text-gray-500 text-sm mt-2"
                            }>
                                <span className="font-medium">Goal:</span> {tip.mainGoal}
                                {tip.specificGoal && (
                                    <span className="text-gray-600"> • {tip.specificGoal}</span>
                                )}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <SaveButton onClick={handleSave} isSaved={saved} />
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className={`p-4 rounded-lg ${darkMode
                            ? "bg-gray-700 text-gray-200"
                            : "bg-gray-50 text-gray-600"
                            }`}>
                            Almost there… preparing a clear path to follow…
                        </div>
                    )}

                    {/* Error */}
                    {errorMsg && (
                        <div className={`p-4 rounded-lg border space-y-2 ${darkMode
                            ? "bg-red-900/40 border-red-700 text-red-100"
                            : "bg-red-50 border-red-100 text-red-700"
                            }`}>
                            <div>{errorMsg}</div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleRetry}
                                    className="cursor-pointer px-3 py-2 bg-green-600 text-white rounded-lg"
                                >
                                    Retry
                                </button>
                                <button
                                    onClick={() => setErrorMsg("")}
                                    className={`cursor-pointer px-3 py-2 rounded-lg border ${darkMode
                                        ? "border-gray-500"
                                        : "border-gray-300"
                                        }`}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Long Explanation */}
                    {tip.long_explanation && !loading && (
                        <div className={
                            darkMode
                                ? "text-gray-100 leading-relaxed"
                                : "text-gray-700 leading-relaxed"
                        }>
                            {/* {console.log(tip.long_explanation)} */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Typewriter
                                    text={tip.long_explanation}
                                    speed={15}
                                    onComplete={() => setShowSteps(true)}
                                />
                            </motion.div>

                        </div>
                    )}

                    {/* Steps */}
                    {tip.steps && tip.steps.length > 0 && showSteps && !loading && (
                        <div>
                            <h3 className={`text-lg font-semibold mt-2 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                                Steps
                            </h3>

                            <ul
                                className={
                                    darkMode
                                        ? "list-disc ml-6 mt-2 space-y-2 text-gray-100"
                                        : "list-disc ml-6 mt-2 space-y-2 text-gray-700"
                                }
                            >
                                {tip.steps.map((s, i) => {
                                    if (i > currentStep) return null; // 👈 Hide future steps

                                    return (
                                        <li key={i}>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Typewriter
                                                    text={s}
                                                    speed={15}
                                                    onComplete={() => {
                                                        if (i === tip.steps.length - 1) {
                                                            // Last step → start expected progress
                                                            setShowExpected(true);
                                                        } else {
                                                            // Reveal next step
                                                            setCurrentStep(i + 1);
                                                        }
                                                    }}
                                                />
                                            </motion.div>

                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}


                    {/* Expected Progress */}
                    {tip.expected_progress && showExpected && !loading && (
                        <div
                            className={`p-4 rounded-xl border ${darkMode
                                ? "bg-green-900/30 border-green-700 text-green-100"
                                : "bg-green-50 border-green-100 text-gray-700"
                                }`}
                        >
                            <h4 className="font-semibold">Expected Progress</h4>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Typewriter
                                    text={tip.expected_progress}
                                    speed={20}
                                />
                            </motion.div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
