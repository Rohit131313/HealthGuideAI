import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSavedTips, removeTip } from "../services/localStorageService";
import { useAppContext } from "../context/AppContext";

export default function SavedTipsPage() {
    const [savedTips, setSavedTips] = useState([]);
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();

    useEffect(() => {
        setSavedTips(getSavedTips());
    }, []);

    const handleDelete = (id) => {
        removeTip(id);
        setSavedTips(getSavedTips());
    };

    if (savedTips.length === 0) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${
                    darkMode
                        ? "bg-gray-900 text-gray-100"
                        : "bg-gray-50 text-gray-800"
                }`}>
                <div className="max-w-3xl mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Saved Tips</h2>
                <p className="text-gray-600">You haven’t saved any tips yet.</p>

                <Link
                    to="/"
                    className={`cursor-pointer
                            ${darkMode
                                ? "text-green-300 hover:underline mt-4 inline-block"
                                : "text-green-600 hover:underline mt-4 inline-block"}
                        `}
                >
                    ← Go Back Home
                </Link>
            </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${
                darkMode
                    ? "bg-gray-900 text-gray-100"
                    : "bg-gray-50 text-gray-900"
            }`}>
            <div className="max-w-3xl mx-auto px-4 py-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Wellness Tips</h2>

            <div className="grid gap-6">
                {savedTips.map((tip) => (
                    <div
                        key={tip.id}
                        className={`rounded-2xl p-5 border shadow-md transition ${
                                darkMode
                                    ? "bg-gray-800 border-gray-700 hover:shadow-xl"
                                    : "bg-white border-gray-200 hover:shadow-lg"
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="text-3xl">{tip.icon || "💡"}</div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {tip.title}
                                    </h3>

                                    {/* Short description */}
                                    <p className={
                                                darkMode
                                                    ? "text-gray-300 text-sm mt-1"
                                                    : "text-gray-600 text-sm mt-1"
                                            }>
                                        {tip.short_description}
                                    </p>

                                    {/* NEW: Goal Info */}
                                    <p className={
                                                darkMode
                                                    ? "text-gray-400 text-xs mt-2"
                                                    : "text-gray-500 text-xs mt-2"
                                            }>
                                        <span className="font-semibold">Goal:</span> {tip.mainGoal || "—"}
                                        {tip.specificGoal && (
                                            <span className="text-gray-600"> • {tip.specificGoal}</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* DELETE BUTTON */}
                            <button
                                onClick={() => handleDelete(tip.id)}
                                className={`cursor-pointer
                                        ${darkMode
                                            ? "text-red-400 hover:underline text-sm"
                                            : "text-red-600 hover:underline text-sm"}
                                    `}
                            >
                                Remove
                            </button>
                        </div>

                        {/* VIEW DETAILS */}
                        <Link
                            to={`/tip/${tip.id}`}
                            className={
                                    darkMode
                                        ? "text-green-300 hover:underline mt-3 inline-block"
                                        : "text-green-600 hover:underline mt-3 inline-block"
                                }
                        >
                            View Full Details →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
