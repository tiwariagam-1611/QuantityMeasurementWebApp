// UC-JS-03: Fetch Units by Type

const BASE_URL = "http://localhost:3000";

/**
 * Fetch units based on selected type (Length, Weight, etc.)
 * @param {string} type
 * @returns {Array} list of units
 */
async function getUnits(type) {
    try {
        const res = await fetch(`${BASE_URL}/units?type=${type}`);

        // Always check response
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        return data; // returns array of units

    } catch (error) {
        console.error("Error in getUnits:", error);
        return []; // fail-safe (important)
    }
}