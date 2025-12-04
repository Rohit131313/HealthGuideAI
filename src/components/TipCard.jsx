import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TipCard({ tip, index }) {
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`
                p-5 rounded-2xl border shadow-md transition cursor-pointer
                hover:shadow-xl hover:translate-y-0.5
                ${darkMode 
                    ? "bg-gray-800 border-gray-700 text-gray-100" 
                    : "bg-white border-gray-200 text-gray-800"}
            `}
        >
            <div className="text-3xl">{tip.icon}</div>
            
            <h3 className="font-semibold text-lg leading-tight">
                {index + 1}. {tip.title}
            </h3>

            <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {tip.short_description}
            </p>

            <Link
                to={`/tip/${tip.id}`}
                state={{ tip }}
                className={`font-medium mt-3 inline-block ${
                    darkMode ? "text-green-300 hover:underline" : "text-green-600 hover:underline"
                }`}
            >
                View Details →
            </Link>
        </motion.div>
    );
}
