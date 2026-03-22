function populateDropdown(selectEl, units) {

    if (!selectEl) return;

    selectEl.innerHTML = "";

    units.forEach(u => {
        const o = document.createElement("option");
        o.value = u.symbol;
        o.textContent = `${u.label} (${u.symbol})`;
        selectEl.appendChild(o);
    });
}


function setActive(parent, clicked, selector) {
    if (!parent) return;

    parent.querySelectorAll(selector).forEach(el => el.classList.remove("active"));
    clicked.classList.add("active");
}


function showResult(value, unit) {

    const v = document.getElementById("result-value");
    const u = document.getElementById("result-unit");

    if (!v || !u) return;

    if (value === null || value === undefined) {
        v.textContent = "—";
        u.textContent = "";
        return;
    }

    v.textContent = value;
    u.textContent = unit || "";

    v.classList.add("highlight");
    setTimeout(() => v.classList.remove("highlight"), 500);
}


function toggleOperators(show) {
    const el = document.getElementById("operator-selector");
    if (!el) return;
    el.style.display = show ? "flex" : "none";
}

function renderHistory(records) {

    const list = document.getElementById("history-list");
    if (!list) return;

    list.innerHTML = "";

    if (!records || records.length === 0) {
        list.innerHTML = '<li class="list-group-item">No history yet.</li>';
        return;
    }

    records.forEach(r => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        li.textContent = `${r.expression} = ${r.result}`;

        list.appendChild(li);
    });
}