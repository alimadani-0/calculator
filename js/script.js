let primaryDisplayValue = '';

let operand = null;
let operator = '';

let operatorPressed = true;
let equalPressed = false;
let infinityResult = false;

let primaryDisplay = document.querySelector('.primary-display');
let secondaryDisplay = document.querySelector('.secondary-display');

const calc = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
    '%': a => a / 100,
}

function crop(value) {
    return value.toString().slice(0, 16);
}

function inputDigit(event) {
    if ((equalPressed && !operatorPressed) || infinityResult) allClear();

    const input = event.currentTarget.textContent;
    if (input === '.') {
        if (primaryDisplayValue.includes(input)) {
            primaryDisplayValue = primaryDisplayValue;
        } else {
            primaryDisplayValue = primaryDisplayValue === ''
                ? '0' + input
                : primaryDisplayValue + input;
        };
    } else if (input === '0') {
        primaryDisplayValue = primaryDisplayValue === '0'
            ? primaryDisplayValue
            : primaryDisplayValue + input;
    } else {
        primaryDisplayValue = primaryDisplayValue === '0'
            ? input
            : primaryDisplayValue + input;
    };
    primaryDisplay.textContent = crop(primaryDisplayValue);

    operatorPressed = false;
    equalPressed = false;
    infinityResult = false;
}

function updateCalculatorVariables(value, oper) {
    operand = value;
    operator = oper;
}

function updateDisplayParams() {
    secondaryDisplay.innerHTML
        = operand + ' '
        + '<span class="red">' + operator
        + '</span>';
    primaryDisplayValue = '';
}

function operatorHandler(event) {
    const oper = event.currentTarget.textContent;
    let value = 0;
    if (!infinityResult && (operand || !operatorPressed)) {
        if (operand && !operatorPressed && !equalPressed) {
            value = operate(parseFloat(primaryDisplay.textContent));
        } else if (!operatorPressed) {
            value = parseFloat(primaryDisplay.textContent);
        } else {
            value = operand;
        }
        updateCalculatorVariables(value, oper);
        updateDisplayParams();

        operatorPressed = true;
    }
}

function operate(value) {
    const result = calc[operator](operand, value);
    if (result !== Infinity) return result;
    infinityResult = true;
    return '😵';
}

function equal() {
    if (!equalPressed && !infinityResult) {
        const value = parseFloat(primaryDisplay.textContent);
        const result = operate(value);

        secondaryDisplay.innerHTML
            = operand + ' <span class="red">'
            + operator + '</span> ' + value
            + ' <span class="red">=</span>';
        primaryDisplayValue = `${result}`;
        primaryDisplay.textContent = crop(primaryDisplayValue);

        equalPressed = true;
    }
}

function clear() {
    primaryDisplayValue = '';
    primaryDisplay.textContent = primaryDisplayValue;

    operatorPressed = true;
}

function allClear() {
    operand = null;
    operator = '';

    operatorPressed = true;
    equalPressed = false;
    infinityResult = false;

    secondaryDisplay.innerHTML = '';
    primaryDisplayValue = '';
    primaryDisplay.textContent = primaryDisplayValue;
}

function percentage() {
    const value = parseFloat(primaryDisplay.textContent);
    if (value) {
        const result = calc['%'](value);

        secondaryDisplay.innerHTML
            = `${value} <span class="red">%</span>`;
        primaryDisplay.textContent = result;
    }
}

function actionHandler(event) {
    const action = event.currentTarget.textContent;
    if (action === '=') equal();
    if (action === 'C') clear();
    if (action === 'AC') allClear();
    if (action === '%') percentage();
}

function numbersEventListeners() {
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => button.addEventListener('click', inputDigit));
}

function operatorsEventListeners() {
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => button.addEventListener('click', operatorHandler));
}

function actionEventListeners() {
    const actionButtons = document.querySelectorAll('.action');
    actionButtons.forEach(button => button.addEventListener('click', actionHandler));
}

numbersEventListeners();
operatorsEventListeners();
actionEventListeners();