const display = document.querySelector('.display');
const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const remove = document.querySelector('.delete');

let firstOperand = false;
let secondOperand = false;
let firstOperator = false;

let firstNumber = "";
let secondNumber = "";
let firstOperation = "";

clear.addEventListener('click', () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    firstOperation = "";
    firstOperand = false;
    secondOperand = false;
    firstOperator = false;
});

remove.addEventListener('click', () => {
    if(firstOperator){
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = secondNumber;
    }
    else{
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber;
    }
});

operands.forEach((operand) => {
    operand.addEventListener('click', () =>{
        if (!firstOperator){
            firstNumber += operand.value;
            display.textContent = firstNumber;
        }
        else{
            secondNumber += operand.value;
            display.textContent = secondNumber;
            secondOperand = true;
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(secondOperand){
            firstNumber = operate(firstNumber, secondNumber, firstOperation);
            firstOperation = operator.value != "=" ? operator.value : "";
            secondNumber = "";
            secondOperand = false;
            display.textContent = firstNumber;
        }
        else{
            firstOperation = operator.value;
            firstOperator = true;
        }
    })
})

function operate(firstNumber, secondNumber, firstOperation){
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    if(firstOperation == '+'){
        return firstNumber + secondNumber;
    }
    else if(firstOperation == '-'){
        return firstNumber - secondNumber;
    }
    else if(firstOperation == '*'){
        return Math.round((firstNumber * secondNumber) * 100) / 100;
    }
    else if(firstOperation == '/'){
        return Math.round((firstNumber / secondNumber) * 100) / 100;
    }
}
