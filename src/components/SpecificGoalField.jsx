import { useAppContext } from "../context/AppContext";

export default function SpecificGoalField({ value, onChange }) {
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();
    return (
        <div className="flex flex-col w-full">
            <label className={`${darkMode ? "text-gray-200" : "text-gray-700"} font-medium`}>Specific Goal (optional)</label>
            <input
                placeholder="Ex: build a big chest, reduce belly fat..."
                value={value}
                onChange={onChange}
                className={`
                    w-full px-4 py-2 rounded-xl border outline-none transition
                    ${darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-600"}
                `}
            />
        </div>
    );
}
