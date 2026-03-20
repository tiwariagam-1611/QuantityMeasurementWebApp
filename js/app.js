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

        const selects = document.querySelectorAll(".input-box select");

        populateDropdown(selects[0], units);
        populateDropdown(selects[1], units);

    } catch (err) {
        console.error("Error loading units:", err);
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

//UC 11 Test
document.querySelectorAll(".type-card").forEach(card => {
    card.addEventListener("click", function () {
        const parent = card.parentElement.parentElement;
        setActive(parent, card, ".type-card");
    });
});

