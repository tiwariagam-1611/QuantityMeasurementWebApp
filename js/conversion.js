function applyConversion(value, convObj) {

    if (isNaN(value)) throw new Error("Invalid number");

    if (!convObj) return value;

    // Factor-based conversion
    if (convObj.factor !== null && convObj.factor !== undefined) {
        return parseFloat((value * convObj.factor).toFixed(6));
    }

    // Formula-based conversion
    try {
        const expr = convObj.formula.replace("x", value);

        const result = Function('"use strict"; return (' + expr + ')')();

        return parseFloat(result.toFixed(6));
    } catch {
        throw new Error("Bad formula");
    }
}


function compareValues(v1, u1, v2, u2, base1, base2) {

    if (isNaN(base1) || isNaN(base2)) {
        return "Invalid values — cannot compare";
    }

    if (base1 > base2) return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
    if (base1 < base2) return `${v1} ${u1} is LESS than ${v2} ${u2}`;

    return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
}


function performArithmetic(v1, v2, op) {

    switch (op) {
        case "+": return parseFloat((v1 + v2).toFixed(6));
        case "-": return parseFloat((v1 - v2).toFixed(6));
        case "*": return parseFloat((v1 * v2).toFixed(6));
        case "/":
            if (v2 === 0) throw new Error("Divide by zero");
            return parseFloat((v1 / v2).toFixed(6));
        default:
            throw new Error("Unknown operator");
    }
}