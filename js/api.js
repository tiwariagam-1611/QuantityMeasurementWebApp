const BASE_URL = "http://localhost:3000";

// Fetch units
async function getUnits(type) {
    const res = await fetch(`${BASE_URL}/units?type=${type}`);
    if (!res.ok) throw new Error("Failed to fetch units");
    return await res.json();
}

// Fetch conversion
async function getConversion(from, to) {
    const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);
    const data = await res.json();

    if (data.length) return data[0];

    // 🔁 auto reverse
    const reverseRes = await fetch(`${BASE_URL}/conversions?from=${to}&to=${from}`);
    const reverseData = await reverseRes.json();

    if (reverseData.length && reverseData[0].factor) {
        return { factor: 1 / reverseData[0].factor };
    }

    throw new Error("No conversion found");
}

// Save history
async function saveHistory(record) {
    try {
        const res = await fetch(`${BASE_URL}/history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...record,
                id: Date.now().toString()
            })
        });

        return await res.json();
    } catch (e) {
        console.error("History save failed", e);
    }
}

// Get history
async function getHistory() {
    try {
        const res = await fetch(`${BASE_URL}/history`);
        const data = await res.json();

        // sort manually
        return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (e) {
        console.error("History fetch failed", e);
        return [];
    }
}