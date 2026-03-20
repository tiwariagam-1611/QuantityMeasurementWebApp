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


// USE CASE 9 TEST CASE
console.log("Testing UC-09...");

console.log(performArithmetic(10, 5, "+")); 
// 15

console.log(performArithmetic(10, 5, "-")); 
// 5

console.log(performArithmetic(10, 5, "*")); 
// 50

console.log(performArithmetic(10, 5, "/")); 
// 2

try {
    console.log(performArithmetic(10, 0, "/"));
} catch (e) {
    console.log(e.message); // Divide by zero
}



