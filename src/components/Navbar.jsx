import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
    const { darkMode, setDarkMode } = useAppContext();
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <nav className={`
            sticky top-0 z-50 w-full
            border-b shadow-sm
            ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"}
        `}>
            
            {/* TOP BAR */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <Link to="/" className="text-xl font-bold">HealthGuideAI</Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className={darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-green-600"}>
                        Home
                    </Link>

                    <Link to="/saved" className={darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-green-600"}>
                        Saved Tips
                    </Link>

                    <Link to="/about" className={darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-green-600"}>
                        About
                    </Link>

                    {/* Dark Mode */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`
                            cursor-pointer px-3 py-1 rounded-lg text-sm border transition
                            ${darkMode 
                                ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700" 
                                : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"}
                        `}
                    >
                        {darkMode ? "🌞 Light" : "🌙 Dark"}
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <button 
                    className="md:hidden text-2xl cursor-pointer"
                    onClick={toggleMenu}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu — Animated */}
            <div
                className={`
                    md:hidden overflow-hidden transition-all duration-300
                    ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div className={`flex flex-col gap-3 px-4 py-4 border-t 
                    ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                >
                    <Link 
                        to="/" 
                        onClick={() => setOpen(false)}
                        className={`${darkMode ? "text-gray-300" : "text-gray-700"} hover:text-green-500`}
                    >
                        Home
                    </Link>

                    <Link 
                        to="/saved" 
                        onClick={() => setOpen(false)}
                        className={`${darkMode ? "text-gray-300" : "text-gray-700"} hover:text-green-500`}
                    >
                        Saved Tips
                    </Link>

                    <Link 
                        to="/about" 
                        onClick={() => setOpen(false)}
                        className={`${darkMode ? "text-gray-300" : "text-gray-700"} hover:text-green-500`}
                    >
                        About
                    </Link>

                    <button
                        onClick={() => { setDarkMode(!darkMode); setOpen(false); }}
                        className={`
                            cursor-pointer px-3 py-2 rounded-lg border text-left
                            ${darkMode 
                                ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700" 
                                : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"}
                        `}
                    >
                        {darkMode ? "🌞 Switch to Light Mode" : "🌙 Switch to Dark Mode"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
