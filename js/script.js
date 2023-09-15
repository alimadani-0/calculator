let primaryDisplayValue = '';
// let secondaryDisplayValue = '';

let operand = null;
let operator = '';

let primaryDisplay = document.querySelector('.primary-display');
let secondaryDisplay = document.querySelector('.secondary-display');

const calc = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
    '%': a => a / 100,
}

function inputDigit(event) {
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
    primaryDisplay.textContent = primaryDisplayValue;
}

function updateCalculatorVariables(value, oper) {
    operand = value;
    operator = oper;
}

function updateDisplayParams() {
    secondaryDisplay.textContent = operand + ' ' + operator;
    primaryDisplayValue = '';
}

function operatorHandler(event) {
    const value = parseFloat(primaryDisplay.textContent);
    const oper = event.currentTarget.textContent;
    updateCalculatorVariables(value, oper);
    updateDisplayParams();
}

function operate(value) {
    return calc[operator](value, operand);
}

function equal() {
    const value = parseFloat(primaryDisplay.textContent);
    const result = operate(value);

    secondaryDisplay.textContent = `${operand} ${operator} ${value} =`;
    primaryDisplayValue = `${result}`;
    primaryDisplay.textContent = primaryDisplayValue;
}

function actionHandler(event) {
    const action = event.currentTarget.textContent;
    if (action === '=') equal();
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