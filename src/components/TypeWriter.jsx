import { useEffect, useState } from "react";

export default function Typewriter({ text = "", speed = 20, className = "",  onComplete = () => {}}) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (!text) return;

        let index = 0;
        setDisplayed("");  // RESET PROPERLY before typing starts

        const interval = setInterval(() => {
            index++;
            setDisplayed(text.substring(0, index));

            if (index >= text.length) {
                clearInterval(interval);
                onComplete();
            }
        }, speed);

        return () => clearInterval(interval);  // cleanup
    }, [text]);

    return <p className={className}>{displayed}</p>;
}
