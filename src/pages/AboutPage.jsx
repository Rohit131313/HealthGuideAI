import { useAppContext } from "../context/AppContext";

export default function AboutPage() {
    const { darkMode } = useAppContext();

    return (
        <div
            className={`min-h-screen px-4 py-10 ${
                darkMode
                    ? "bg-gray-900 text-gray-100"
                    : "bg-gray-50 text-gray-900"
            }`}
        >
            <div className="max-w-3xl mx-auto space-y-6">

                <h1 className="text-3xl font-bold">About HealthGuideAI</h1>

                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    HealthGuideAI is a lightweight AI-powered wellness assistant
                    designed to generate personalized health tips based on your
                    profile, goals, and lifestyle.
                </p>

                <div
                    className={`p-6 rounded-2xl border shadow-md ${
                        darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"
                    }`}
                >
                    <h2 className="text-xl font-semibold mb-2">What it does:</h2>

                    <ul className="list-disc ml-6 space-y-2">
                        <li>Generates personalized wellness tips</li>
                        <li>Provides detailed step-by-step guidance</li>
                        <li>Lets you save helpful tips for later</li>
                        <li>Fully supports light and dark mode</li>
                    </ul>
                </div>

                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    Built with ❤️ using React, Tailwind CSS, and Gemini AI.
                </p>
            </div>
        </div>
    );
}
