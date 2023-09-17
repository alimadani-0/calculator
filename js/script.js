const DOT = ['Period', 'NumpadDecimal'];
const ACTIONS_KEYBOARD_CODES = [['Equal', 'NumpadEqual'],
                                ['Backspace', 'Delete'],
                                'Escape']

let primaryDisplayValue = '';

let operand = null;
let operator = '';

let operatorPressed = true;
let equalPressed = false;
let infinityResult = false;
let shiftPressed = false;

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

function inputDigit(input) {
    if ((equalPressed && !operatorPressed) || infinityResult) allClear();

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

function digitHandler(event) {
    let input = '';
    if (event.type === 'click') input = event.currentTarget.textContent;
    if (event.type === 'keydown') input = event.code.substr(-1);
    if (DOT.includes(input)) input = '.';
    inputDigit(input);
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
    let action = '';
    if (event.type === 'click') action = event.currentTarget.textContent;
    if (event.type === 'keydown') action = event.code;

    if (action === '=') equal();
    if (ACTIONS_KEYBOARD_CODES[0].includes(action)) equal();

    if (action === 'C') clear();
    if (ACTIONS_KEYBOARD_CODES[1].includes(action)) clear();

    if (action === 'AC') allClear();
    if (action === ACTIONS_KEYBOARD_CODES[2]) allClear();

    if (action === '%') percentage();
}

function keyboardHandler(event) {
    const code = event.code;
    if (!isNaN(code.substr(-1))) {
        if (code.includes('Numpad') || code.includes('Digit')) {
            digitHandler(event);
        };
    } else if (DOT.includes(code)) {
        digitHandler(event);
    } else if (ACTIONS_KEYBOARD_CODES.flat().includes(code)) {
        actionHandler(event);
    }
}

function numbersEventListeners() {
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => button.addEventListener('click', digitHandler));
}

function operatorsEventListeners() {
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => button.addEventListener('click', operatorHandler));
}

function actionEventListeners() {
    const actionButtons = document.querySelectorAll('.action');
    actionButtons.forEach(button => button.addEventListener('click', actionHandler));
}

function keyboardEventListener() {
    document.addEventListener('keydown', keyboardHandler);
}

numbersEventListeners();
operatorsEventListeners();
actionEventListeners();
keyboardEventListener();