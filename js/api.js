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

// UC-JS-04: Fetch Conversion Record

async function getConversion(from, to) {
    try {
        const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json(); // always array

        if (!data.length) {
            throw new Error("Conversion not available for this pair");
        }

        return data[0]; // return single object

    } catch (error) {
        console.error("Error in getConversion:", error);
        throw error; 
    }
}

// UC-JS-05: Save History

async function saveHistory(record) {
    try {
        const res = await fetch(`${BASE_URL}/history`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(record)
        });

        return await res.json();

    } catch (error) {
        console.error("Error saving history:", error);
    }
}

// UC-JS-06: Load History

async function getHistory() {
    try {
        const res = await fetch(`${BASE_URL}/history?_sort=timestamp&_order=desc`);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("Error fetching history:", error);
        return []; // fallback
    }
}