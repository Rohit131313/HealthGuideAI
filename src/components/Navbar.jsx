import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
    const { darkMode, setDarkMode } = useAppContext();

    return (
        <nav className={`
            sticky top-0 z-50 px-6 py-4 flex items-center justify-between
            shadow-sm border-b 
            ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"}
        `}>
            {/* Left side */}
            <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <Link to="/" className="text-xl font-bold">
                    HealthGuideAI
                </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
                <Link to="/" className={darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-green-600"}>
                    Home
                </Link>

                <Link to="/saved" className={darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-green-600"}>
                    Saved Tips
                </Link>

                <Link to="/about" className={darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-green-600"}>
                    About
                </Link>

                {/* 🌙 Dark Mode Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`
                        cursor-pointer px-3 py-1 rounded-lg text-sm border
                        transition-all duration-300
                        ${darkMode 
                            ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700" 
                            : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"}
                    `}
                >
                    {darkMode ? "🌞 Light" : "🌙 Dark"}
                </button>
            </div>
        </nav>
    );
}
