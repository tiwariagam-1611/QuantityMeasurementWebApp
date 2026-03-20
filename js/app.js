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

// // UC 7 Test Cases
// document.addEventListener("DOMContentLoaded", () => {
    
//     console.log("Testing UC-07...");

//     // Test 1: Factor-based (km → m)
//     const conv1 = { factor: 1000, formula: null };
//     const res1 = applyConversion(2, conv1);
//     console.log("2 km → m =", res1); // Expected: 2000

//     // Test 2: Formula-based (C → F)
//     const conv2 = { factor: null, formula: "(x*9/5)+32" };
//     const res2 = applyConversion(10, conv2);
//     console.log("10 C → F =", res2); // Expected: 50

//     // Test 3: Same unit
//     const res3 = applyConversion(5, null);
//     console.log("Same unit =", res3); // Expected: 5

//     // Test 4: Invalid input
//     try {
//         applyConversion("abc", conv1);
//     } catch (e) {
//         console.log("Error test:", e.message); // Expected: Invalid number
//     }

// });