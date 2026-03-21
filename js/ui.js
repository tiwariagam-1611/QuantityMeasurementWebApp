// UC-JS-10: Populate Unit Dropdown

function populateDropdown(selectEl, units) {

    // check if select element exists
    if (!selectEl) {
        console.warn("select element not found");
        return;
    }

    // clear existing options
    selectEl.innerHTML = "";

    // default option
    const defaultOpt = document.createElement("option");
    defaultOpt.textContent = "-- Select Unit --";
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    selectEl.appendChild(defaultOpt);

    // add unit options
    units.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.symbol;
        opt.textContent = `${u.label} (${u.symbol})`;
        selectEl.appendChild(opt);
    });
}

// UC-JS-11: Set Active Button

function setActive(parentEl, clickedEl, childSelector) {

    // check parent exists
    if (!parentEl) {
        return;
    }

    // remove active from all children
    parentEl.querySelectorAll(childSelector).forEach(el => {
        el.classList.remove("active");
    });

    // add active to clicked element
    clickedEl.classList.add("active");
}


// UC-JS-12: Show Result

function showResult(value, unitSymbol) {

    const valueEl = document.querySelector("#result-value");
    const unitEl = document.querySelector("#result-unit");

    // check elements exist
    if (!valueEl || !unitEl) {
        console.warn("Result elements not found");
        return;
    }

    // handle null/undefined value
    if (value === null || value === undefined) {
        valueEl.textContent = "—";
        unitEl.textContent = "";
        return;
    }

    // set result
    valueEl.textContent = value;
    unitEl.textContent = unitSymbol || "";

    // highlight effect
    valueEl.classList.add("highlight");

    setTimeout(() => {
        valueEl.classList.remove("highlight");
    }, 1500);
}

// UC-JS-13: Toggle Operator Row

function toggleOperators(show) {

    const operatorRow = document.querySelector("#operator-selector");

    // check if element exists
    if (!operatorRow) {
        console.warn("operator row not found");
        return;
    }

    // show or hide
    operatorRow.style.display = show ? "flex" : "none";
}

// UC-JS-14: Render History List

function renderHistory(records) {

    const list = document.querySelector("#history-list");

    // check element exists
    if (!list) {
        console.warn("history list not found");
        return;
    }

    // handle undefined
    if (!records) {
        records = [];
    }

    // clear existing
    list.innerHTML = "";

    // empty case
    if (!records.length) {
        list.innerHTML = "<li>No history yet.</li>";
        return;
    }

    // populate list
    records.forEach(r => {
        const li = document.createElement("li");

        li.textContent = `${r.expression} = ${r.result} (${new Date(r.timestamp).toLocaleString()})`;

        list.appendChild(li);
    });
}