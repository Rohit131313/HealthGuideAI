const SAVED_TIPS_KEY = "savedWellnessTips";

// Returns an array of all saved tips.

export function getSavedTips() {
    try {
        const raw = localStorage.getItem(SAVED_TIPS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read saved tips:", err);
        return [];
    }
}


// Saves a single tip object.
// Ensures no duplicates.

export function saveTip(tip) {
    try {
        const existing = getSavedTips();

        const filtered = existing.filter((t) => String(t.id) !== String(tip.id));

        const updated = [...filtered, tip];

        localStorage.setItem(SAVED_TIPS_KEY, JSON.stringify(updated));

    } catch (err) {
        console.error("Failed to save tip:", err);
    }
}

// Checks if a tip with a given ID is already saved.

export function isAlreadySaved(id) {
    const saved = getSavedTips();
    return saved.some((t) => String(t.id) === String(id));
}

// Removes a saved tip by ID.

export function removeTip(id) {
    try {
        const saved = getSavedTips();
        const updated = saved.filter((t) => String(t.id) !== String(id));
        localStorage.setItem(SAVED_TIPS_KEY, JSON.stringify(updated));
    } catch (err) {
        console.error("Failed to remove tip:", err);
    }
}
