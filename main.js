function changeTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
}

fetch('./symbols.json')
    .then(response => response.json())
    .then(data => {
        const keys = document.getElementById('keys');

        data.symbols.forEach(symbol => {

            const key = document.createElement('button');

            key.textContent = symbol.value;

            if (symbol.type === 'operator') {
                key.classList.add('operatorBtn');
            }

            if (symbol.type === 'clear') {
                key.classList.add('clearBtn')
            }

            key.addEventListener('click', () => {
                keyClick(symbol.value);
            })

            keys.appendChild(key);
        });
    })


let expression = '';

function keyClick(value) {
    const resultInput = document.getElementById('result');
    const expressionInput = document.getElementById('expression');

    if (value === '=') {
        try {
            const result = eval(expression);
            resultInput.value = result;
            setTimeout(() => {
                expression = '';
                expressionInput.value = expression;
                resultInput.value = '';
            }, 4000)
        } catch (error) {
            resultInput.value = 'Error';
            expression = '';
            expressionInput.value = expression;
        }
    } else if (value === 'C') {
        resultInput.value = '';
        expression = '';
        expressionInput.value = expression;
    } else if (value === '⌫') {
        expression = expression.slice(0, -1);
        expressionInput.value = expressionInput.value.slice(0, -1);
    } else {
        expression += value;
        expressionInput.value = expression;
    }
}
