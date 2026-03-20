const state = {
    type: "Length",
    action: "Conversion",
    fromVal: null,
    fromUnit: "",
    toVal: null,
    toUnit: "",
    operator: "+"
};

document.addEventListener("DOMContentLoaded", async () => {
    console.log("App Initialisation started...");

    attachEventListeners();

    // UC-03: Fetch units
    await loadUnits("Length");

    document.querySelector(".type-card").classList.add("active");
    document.querySelector(".action-btn").classList.add("active");

    toggleOperators(false);
});

// UC-03
async function loadUnits(type) {
    try {
        const units = await getUnits(type);

        console.log("Units loaded:", units);

    } catch (err) {
        console.error("Error loading units:", err);
        showError("Failed to load units");
    }
}

function attachEventListeners() {
    console.log("Event listeners attached.");
}

function toggleOperators(show) {
    const operatorRow = document.getElementById("operator-row");
    if (!operatorRow) return;
    operatorRow.style.display = show ? "block" : "none";
}

function showError(msg) {
    alert(msg);
}

// // UC 8 Test Cases
console.log("Testing UC-08...");

const result1 = compareValues(1, "km", 500, "m", 1000, 500);
console.log(result1);
// Expected: 1 km is GREATER than 500 m

const result2 = compareValues(2, "kg", 2000, "g", 2000, 2000);
console.log(result2);
// Expected: 2 kg is EQUAL to 2000 g

const result3 = compareValues("a", "km", 5, "m", 0, 5);
console.log(result3);
// Expected: Invalid values — cannot compare



