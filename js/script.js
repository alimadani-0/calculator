let primaryDisplayValue = '';
// let secondaryDisplayValue = '';

let operand = null;
let operator = '';

let operatorPressed = false;

let primaryDisplay = document.querySelector('.primary-display');
let secondaryDisplay = document.querySelector('.secondary-display');

const calc = {
    '+': (a, b) => a + b,
    '-': (a, b) => b - a,
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
    operatorPressed = false;
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
    const oper = event.currentTarget.textContent;
    let value = 0;
    if (operand && !operatorPressed) {
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

function clear() {
    primaryDisplayValue = '';
    primaryDisplay.textContent = primaryDisplayValue;
    operatorPressed = true;
}

function actionHandler(event) {
    const action = event.currentTarget.textContent;
    if (action === '=') equal();
    if (action === 'C') clear();
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