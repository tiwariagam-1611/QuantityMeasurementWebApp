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

// UC-JS-15: Handle Type Card Click

function attachEventListeners() {

    const typeCards = document.querySelectorAll(".type-card");

    const typeSelector = document.querySelector("#type-selector");

    const fromInput = document.getElementById("from-value");
    const toInput = document.getElementById("to-value");

    const fromSelect = document.getElementById("from-unit");
    const toSelect = document.getElementById("to-unit");

    typeCards.forEach(card => {

        card.addEventListener("click", async () => {

            try {
                // update state
                state.type = card.dataset.type;

                // highlight selected
                setActive(typeSelector, card, ".type-card");

                // clear inputs + result
                fromInput.value = "";
                toInput.value = "";
                showResult(0, "");

                // fetch new units
                const units = await getUnits(state.type);

                // populate dropdowns
                populateDropdown(fromSelect, units);
                populateDropdown(toSelect, units);

                // reset unit selection in state
                state.fromUnit = "";
                state.toUnit = "";

            } catch (err) {
                console.error("Error loading units:", err);
                alert("Failed to load units");
            }

        });

    });
}


// UC-JS-16: Handle Action Tab Click

const actionButtons = document.querySelectorAll(".action-btn");
const actionSelector = document.querySelector("#action-selector");

actionButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        // update state
        state.action = btn.dataset.action;

        // highlight selected button
        setActive(actionSelector, btn, ".action-btn");

        // show/hide operator row
        toggleOperators(state.action === "Arithmetic");

        // reset result
        showResult(0, "");
    });

});

