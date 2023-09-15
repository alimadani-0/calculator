let primaryDisplayValue = '';

let primaryDisplay = document.querySelector('.primary-display');

function updatePrimaryDisplay(event) {
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

function numbersEventListeners() {
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => {
        button.addEventListener('click', updatePrimaryDisplay)
    })
}

numbersEventListeners()