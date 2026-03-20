// UC-JS-07: Apply Conversion

function applyConversion(value, convObj) {

    // check invalid number
    if (isNaN(value)) {
        throw new Error("Invalid number");
    }

    // same unit case (alternate flow)
    if (!convObj) {
        return value;
    }

    // factor-based conversion
    if (convObj.factor !== null) {
        return parseFloat((value * convObj.factor).toFixed(6));
    }

    // formula-based conversion
    try {
        const expr = convObj.formula.replace("x", value);
        const result = eval(expr);

        return parseFloat(result.toFixed(6));

    } catch (e) {
        throw new Error("Bad formula");
    }
}

// UC-JS-08: Compare Values

function compareValues(v1, u1, v2, u2, base1, base2) {

    // check invalid values
    if (isNaN(v1) || isNaN(v2)) {
        return "Invalid values — cannot compare";
    }

    // compare base values
    if (base1 > base2) {
        return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
    }

    if (base1 < base2) {
        return `${v1} ${u1} is LESS than ${v2} ${u2}`;
    }

    return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
}