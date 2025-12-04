import { createContext, useContext, useState, useCallback } from "react";
import { motion } from "framer-motion";

const PopUpContext = createContext();

export function PopUpProvider({ children }) {
    const [popup, setPopup] = useState(null);

    const showPopup = useCallback((message, type = "success") => {
        setPopup({ message, type });

        setTimeout(() => setPopup(null), 2500); // auto hide
    }, []);

    return (
        <PopUpContext.Provider value={{ showPopup }}>
            {children}

            {/* Popup Element */}
            {popup && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`
                        fixed bottom-6 left-1/2 -translate-x-1/2 
                        px-5 py-3 rounded-xl text-white shadow-lg
                        z-50
                        ${popup.type === "error" ? "bg-red-600" : "bg-green-600"}
                    `}
                >
                    {popup.message}
                </motion.div>


            )}
        </PopUpContext.Provider>
    );
}

export function usePopup() {
    return useContext(PopUpContext);
}
