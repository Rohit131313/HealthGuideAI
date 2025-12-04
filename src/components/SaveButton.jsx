import { motion } from "framer-motion";

export default function SaveButton({ onClick, isSaved }) {
    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.4 }}
            onClick={onClick}
            className={`cursor-pointer text-xl ${
                isSaved ? "text-green-500" : "text-gray-400"
            }`}
        >
            {isSaved ? "❤️" : "🤍"}
        </motion.button>
    );
}
