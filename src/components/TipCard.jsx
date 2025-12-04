import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function TipCard({ tip, index }) {
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();
    return (
        <div className={`
                p-5 rounded-2xl border shadow-md transition cursor-pointer
                hover:shadow-xl hover:translate-y-0.5
                ${darkMode 
                    ? "bg-gray-800 border-gray-700 text-gray-100" 
                    : "bg-white border-gray-200 text-gray-800"}
            `}>

            <div className="text-3xl">{tip.icon || "💡"}</div>

            <h3 className="font-semibold text-lg text-gray-800 leading-tight">
                {index + 1}. {tip.title}
            </h3>

            <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {tip.short_description}
            </p>

            <Link
                to={`/tip/${tip.id}`}
                className={`font-medium mt-3 inline-block ${
                    darkMode ? "text-green-300 hover:underline" : "text-green-600 hover:underline"
                }`}
            >
                View Details →
            </Link>
        </div>
    );
}
