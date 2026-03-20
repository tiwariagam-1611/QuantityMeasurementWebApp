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