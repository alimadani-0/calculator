let primaryDisplayValue = '';

let primaryDisplay = document.querySelector('.primary-display');

function updatePrimaryDisplay(event) {
    const input = event.currentTarget.textContent;
    if (!(input === '0' && primaryDisplayValue ==='0')) {
        primaryDisplayValue = primaryDisplayValue === '0' ? input : primaryDisplayValue + input;
        primaryDisplay.textContent = primaryDisplayValue;
    };
}

function numbersEventListeners() {
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => {
        button.addEventListener('click', updatePrimaryDisplay)
    })
}

numbersEventListeners()