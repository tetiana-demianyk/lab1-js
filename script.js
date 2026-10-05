function triangle(val1, type1, val2, type2) {
    // Перетворення градусів у радіани та навпаки
    const toRadians = deg => (deg * Math.PI) / 180;
    const toDegrees = rad => (rad * 180) / Math.PI;

    // Перевірка на некоректні / нечислові / від'ємні значення
    if (typeof val1 !== "number" || typeof val2 !== "number" || isNaN(val1) || isNaN(val2) || val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "Zero or negative input";
    }

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Некоректні типи аргументів. Будь ласка, прочитайте інструкцію.");
        return "failed";
    }

    let a, b, c, alpha, beta;

    const p1 = { val: val1, type: type1 };
    const p2 = { val: val2, type: type2 };

    const has = (t) => p1.type === t || p2.type === t;
    const get = (t) => (p1.type === t ? p1.val : p2.val);

    // 1. ДВА КАТЕТИ (leg + leg)
    if (p1.type === "leg" && p2.type === "leg") {
        a = p1.val;
        b = p2.val;
        c = Math.sqrt(a * a + b * b);
        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    }
    // 2. КАТЕТ ТА ГІПОТЕНУЗА (leg + hypotenuse)
    else if (has("leg") && has("hypotenuse")) {
        const leg = get("leg");
        const hyp = get("hypotenuse");

        if (leg >= hyp) {
            console.log("Катет не може бути більшим або рівним гіпотенузі!");
            return "Zero or negative input";
        }

        a = leg;
        c = hyp;
        b = Math.sqrt(c * c - a * a);
        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;
    }
    // 3. КАТЕТ ТА ПРИЛЕГЛИЙ КУТ (leg + adjacent angle)
    else if (has("leg") && has("adjacent angle")) {
        a = get("leg");
        beta = get("adjacent angle");

        if (beta <= 0 || beta >= 90) {
            console.log("Кут повинен бути гострим (від 0 до 90 градусів)");
            return "Zero or negative input";
        }

        alpha = 90 - beta;
        c = a / Math.cos(toRadians(beta));
        b = Math.sqrt(c * c - a * a);
    }
    // 4. КАТЕТ ТА ПРОТИЛЕЖНИЙ КУТ (leg + opposite angle)
    else if (has("leg") && has("opposite angle")) {
        a = get("leg");
        alpha = get("opposite angle");

        if (alpha <= 0 || alpha >= 90) {
            console.log("Кут повинен бути гострим (від 0 до 90 градусів)");
            return "Zero or negative input";
        }

        beta = 90 - alpha;
        c = a / Math.sin(toRadians(alpha));
        b = Math.sqrt(c * c - a * a);
    }
    // 5. ГІПОТЕНУЗА ТА ГОСТРИЙ КУТ (hypotenuse + angle)
    else if (has("hypotenuse") && has("angle")) {
        c = get("hypotenuse");
        alpha = get("angle");

        if (alpha <= 0 || alpha >= 90) {
            console.log("Кут повинен бути гострим (від 0 до 90 градусів)");
            return "Zero or negative input";
        }

        beta = 90 - alpha;
        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
    }
    // Якщо комбінація типів некоректна/несумісна
    else {
        console.log("Несумісна пара типів. Прочитайте інструкцію.");
        return "failed";
    }

    // Виведення результатів
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);

    return "success";
}