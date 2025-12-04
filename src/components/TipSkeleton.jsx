import { useAppContext } from "../context/AppContext";

export default function TipSkeleton() {
    const { darkMode } = useAppContext();

    return (
        <div
            className={`
                p-5 rounded-2xl border shadow-md animate-pulse
                ${darkMode 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"}
            `}
        >
            <div className="h-6 w-10 bg-gray-400/40 rounded mb-4"></div>

            <div className="h-4 w-2/3 bg-gray-400/40 rounded mb-2"></div>
            <div className="h-3 w-full bg-gray-400/40 rounded mb-1"></div>
            <div className="h-3 w-5/6 bg-gray-400/40 rounded"></div>

            <div className="h-4 w-28 bg-gray-400/40 rounded mt-4"></div>
        </div>
    );
}
