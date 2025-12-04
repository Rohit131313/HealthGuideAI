import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AppContext = createContext();

// Provider Component
export function AppProvider({ children }) {

    // Global Form State 
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        mainGoal: "",
        specificGoal: "",
    });

    // Global Tips State (Short + Detailed) 
    const [tips, setTips] = useState([]);

    // Dark Mode State (persisted)
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    // Save in localStorage + update <html> (optional)
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);

    
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <AppContext.Provider
            value={{
                formData,
                setFormData,
                tips,
                setTips,
                darkMode,
                setDarkMode
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
