// import { getUnits, getHistory } from "./api.js";
// import { populateDropdown, renderHistory } from "./ui.js";

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
    await loadUnits("Length");

    document.querySelector(".type-card").classList.add("active");
    document.querySelector(".action-btn").classList.add("active");

    toggleOperators(false);
    await loadHistory();
});

async function loadUnits(type) {
    try {
        const units = await getUnits(type);
        const selects = document.querySelectorAll(".input-box select");
        populateDropdown(selects[0], units);
        populateDropdown(selects[1], units);
    } catch (err) {
        console.error("Error loading units:", err);
        showError("Failed to load units");
    }
}

async function loadHistory() {
    try {
        const history = await getHistory();
        renderHistory(history);
    } catch (err) {
        console.error("Error loading history:", err);
        showError("Failed to load history");
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
