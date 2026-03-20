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