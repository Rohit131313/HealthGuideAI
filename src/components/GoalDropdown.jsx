import { useAppContext } from "../context/AppContext";

export default function GoalDropdown({ title, value, onChange, optiontitle, options }) {
    const { formData, setFormData, tips, setTips, darkMode, setDarkMode } = useAppContext();
    return (
        <div className="flex flex-col w-full">
            <label className={`${darkMode ? "text-gray-200" : "text-gray-700"} font-medium`}>{title}</label>
            <select
                value={value}
                onChange={onChange}
                className={`
                    w-full px-4 py-2 rounded-xl border outline-none transition
                    ${darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-green-400"
                        : "bg-gray-100 border-gray-300 text-gray-900 focus:border-green-600"}
                `}
            >
                <option value="">{optiontitle}</option>
                {options.map((goal, idx) => (
                    <option key={idx} value={goal}>{goal}</option>
                ))}
            </select>
        </div>
    );
}
