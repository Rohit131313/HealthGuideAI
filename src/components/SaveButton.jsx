import { useAppContext } from "../context/AppContext";

export default function SaveButton({ onClick, isSaved }) {
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();
    return (
        <button
            onClick={onClick}
            className={`
                cursor-pointer px-3 py-2 rounded-lg border transition
                ${darkMode
                    ? "border-gray-500 bg-gray-700 text-white hover:bg-gray-600"
                    : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200"}
                ${isSaved ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
            `}
            disabled={isSaved}
        >
            {isSaved ? "Saved ✓" : "Save Tip"}
        </button>
    );
}
