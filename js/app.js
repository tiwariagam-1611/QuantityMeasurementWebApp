const state = {
    type: "Length",
    action: "Conversion",
    fromVal: null,
    fromUnit: "",
    toVal: null,
    toUnit: "",
    operator: "+"
};

const conversionCache = {};

document.addEventListener("DOMContentLoaded", async () => {
    attachEventListeners();
    await loadUnits("Length");
    toggleOperators(false);
    renderHistory(await getHistory());
});

async function loadUnits(type) {
    const units = await getUnits(type);

    const fromEl = document.getElementById("from-unit");
    const toEl = document.getElementById("to-unit");

    populateDropdown(fromEl, units);
    populateDropdown(toEl, units);

    if (units.length >= 2) {
        state.fromUnit = units[0].symbol;
        state.toUnit = units[1].symbol;

        fromEl.value = state.fromUnit;
        toEl.value = state.toUnit;
    }
}

function attachEventListeners() {
    const fromInput = document.getElementById("from-value");
    const toInput = document.getElementById("to-value");
    const fromSelect = document.getElementById("from-unit");
    const toSelect = document.getElementById("to-unit");

    // TYPE
    document.querySelectorAll(".type-card").forEach(card => {
        card.addEventListener("click", async () => {
            state.type = card.dataset.type;
            setActive(document.getElementById("type-selector"), card, ".type-card");

            fromInput.value = "";
            toInput.value = "";
            showResult("—", "");

            await loadUnits(state.type);
        });
    });

    // ACTION
    document.querySelectorAll(".action-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            state.action = btn.dataset.action;
            setActive(document.getElementById("action-selector"), btn, ".action-btn");

            toggleOperators(state.action === "Arithmetic");
            toInput.disabled = (state.action === "Conversion");

            showResult("—", "");
        });
    });

    // INPUT EVENTS (debounced, no duplicates)
    let timeout;
    fromInput.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(calculate, 300);
    });
    toInput.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(calculate, 300);
    });

    fromSelect.addEventListener("change", calculate);
    toSelect.addEventListener("change", calculate);

    document.querySelectorAll(".operator-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            state.operator = btn.dataset.op;
            calculate();
        });
    });
}

async function calculate() {
    try {
        state.fromVal = parseFloat(document.getElementById("from-value").value);
        state.fromUnit = document.getElementById("from-unit").value;
        state.toUnit = document.getElementById("to-unit").value;


        if (state.action !== "Conversion") {
            state.toVal = parseFloat(document.getElementById("to-value").value);
        } else {
            state.toVal = null;
        }

        if (!state.fromUnit || !state.toUnit ||
            state.fromUnit === "-- Select Unit --" ||
            state.toUnit === "-- Select Unit --") return;

        if (state.action === "Conversion" && isNaN(state.fromVal)) return;
        if ((state.action === "Comparison" || state.action === "Arithmetic") &&
            (isNaN(state.fromVal) || isNaN(state.toVal))) return;

        let result;
        let expression = "";

        // ================= CONVERSION =================
        if (state.action === "Conversion") {
            if (state.fromUnit === state.toUnit) {
                result = state.fromVal;
            } else {
                const key = `${state.fromUnit}_${state.toUnit}`;
                let conv = conversionCache[key];
                if (!conv) {
                    conv = await getConversion(state.fromUnit, state.toUnit);
                    conversionCache[key] = conv;
                }
                result = applyConversion(state.fromVal, conv);
            }

            document.getElementById("to-value").value = result;
            showResult(result, state.toUnit);
            expression = `${state.fromVal} ${state.fromUnit} → ${state.toUnit}`;
        }

        // ================= COMPARISON =================
        else if (state.action === "Comparison") {
            let base2 = state.toVal;
            if (state.fromUnit !== state.toUnit) {
                const key = `${state.toUnit}_${state.fromUnit}`;
                let conv = conversionCache[key];
                if (!conv) {
                    conv = await getConversion(state.toUnit, state.fromUnit);
                    conversionCache[key] = conv;
                }
                base2 = applyConversion(state.toVal, conv);
            }

            result = compareValues(
                state.fromVal,
                state.fromUnit,
                state.toVal,
                state.toUnit,
                state.fromVal,
                base2
            );

            showResult(result, "");
            expression = `${state.fromVal} ${state.fromUnit} ? ${state.toVal} ${state.toUnit}`;
        }

        // ================= ARITHMETIC =================
        else {
            let v2 = state.toVal;
            if (state.fromUnit !== state.toUnit) {
                const key = `${state.toUnit}_${state.fromUnit}`;
                let conv = conversionCache[key];
                if (!conv) {
                    conv = await getConversion(state.toUnit, state.fromUnit);
                    conversionCache[key] = conv;
                }
                v2 = applyConversion(state.toVal, conv);
            }

            result = performArithmetic(state.fromVal, v2, state.operator);
            showResult(result, state.fromUnit);
            expression = `${state.fromVal} ${state.operator} ${state.toVal} (${state.toUnit})`;
        }

        // ================= SAVE HISTORY =================
        if (result !== undefined && result !== null && result !== "") {
            const record = {
                type: state.type,
                action: state.action,
                expression,
                result,
                timestamp: new Date().toISOString()
            };
            await saveHistory(record);
            renderHistory(await getHistory());
        }
    } catch (e) {
        showResult("Error: " + e.message, "");
    }
}
