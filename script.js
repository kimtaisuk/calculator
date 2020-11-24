
let currentNumber = "";
let previousNumber = "";
let operatorKey = undefined;
let operatorDisplayed = "";
let operatorDataset = "";
let computedNumber = "";
let displayNumber = "";
let memoryNumber = "";

let numberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let numberDisplay = document.getElementById('number-display');
let operationDisplay = document.getElementById('operation-display');

let equalButton = document.getElementById('equal');
let deleteButton = document.getElementById('delete');
let clearButton = document.getElementById('clear');
let signButton = document.getElementById('+-');
let percentButton = document.getElementById('percentage');

let memoryClearButton = document.querySelector("[data-memory='MC']")
let memoryRecallButton = document.querySelector("[data-memory='MR']")
let memoryPlusButton = document.querySelector("[data-memory='M+']")
let memoryMinusButton = document.querySelector("[data-memory='M-']")

//let plusButton = document.querySelector('#plus');

deleteButton.addEventListener("click", () => {
    deleteNumber();
    updateDisplayNumber();
}
);

equalButton.addEventListener("click", () => {
    clickEqual();
    updateDisplayNumber();
}
);

clearButton.addEventListener("click", () => {
    clearNumber();
    updateDisplayNumber();
}
);

signButton.addEventListener("click", () => {
    switchSign();
    updateDisplayNumber();
}
);
percentButton.addEventListener("click", () => {
    getPercentage();
    updateDisplayNumber();
}
);

memoryClearButton.addEventListener("click", () => {
    memoryClear();
}
);

memoryPlusButton.addEventListener("click", () => {
    memoryPlus();
}
);

memoryMinusButton.addEventListener("click", () => {
    memoryMinus();
}
);

memoryRecallButton.addEventListener("click", () => {
    memoryRecall();
    updateDisplayNumber();
}
);

numberButtons.forEach(numberButton => numberButton.addEventListener("click", () => {
    appendNumber(numberButton.dataset.number);
    updateDisplayNumber();
}));

document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (isNaN(event.key)) {
        if (event.key !== ".") {
            return;
        }
    }
    document.getElementById(event.key).click();
});

document.addEventListener("keydown", (event) => {
    event.preventDefault();
    console.log(event.key);
    if (event.key === "Enter") {
        document.getElementById("equal").click();
    }
    else if (event.key === "%") {
        document.getElementById("percentage").click();
    }
    else if (event.key === "Backspace") {
        document.getElementById("delete").click();
    }

});


operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", () => {
    clickOperator(operatorButton);
    updateDisplayNumber();
}));


document.addEventListener("keydown", event => {
    let operatorArray = ["+", "-", "*", "/", "^"];
    if (operatorArray.includes(event.key)) {
        console.log(event.key)
        clickOperatorByKeyboard(event.key);
        updateDisplayNumber();
    }

    // 
    // 
});

//document.addEventListener("keydown",clickButton)
//numberButtons.addEventListener("click",clickButton);


//numberButton.addEventListener("keydown",clickNumber);



function appendNumber(number) {
    // if (isNaN(parseInt(number)) || number !== ".") {
    //     return;
    // }

    let numberLength = currentNumber.replace(".", "").replace("-", "").length;
    if ((number === "." && currentNumber.includes(".")) || (numberLength > 9)) {
        return;
    }

    if (currentNumber === "" || currentNumber === "0") {
        if (number === "0") {
            currentNumber = "0";
        }
        else if (number === ".") {
            currentNumber = "0";
            currentNumber = currentNumber.concat(number);
        }
        else {
            currentNumber = number;
        }
    }
    else {
        currentNumber = currentNumber.concat(number);
    }

    displayNumber = currentNumber;
}

function clickOperator(operatorButton) {
    if (previousNumber === "" && currentNumber === "") {
        return;
    }
    compute();

    operatorDataset = operatorButton.dataset;
    operatorKey = operatorDataset.operator;
    operatorDisplayed = operatorButton.innerHTML;


    if (currentNumber !== "") {
        previousNumber = currentNumber;
    }
    currentNumber = "";
    displayNumber = currentNumber;
}

function clickOperatorByKeyboard(operatorKeyboard) {

    compute();
    operatorKey = operatorKeyboard;

    switch (operatorKeyboard) {
        case "+":
            operatorDisplayed = "+";
            break

        case "-":
            operatorDisplayed = "-";
            break
        case "*":
            operatorDisplayed = "&times";
            break
        case "/":
            operatorDisplayed = "&divide";
            break
        case "^":
            operatorDisplayed = "^";
            break
        default:
            return
    }


    if (currentNumber !== "") {
        previousNumber = currentNumber;
    }
    currentNumber = "";
    displayNumber = currentNumber;
}

function compute() {
    const prevN = parseFloat(previousNumber);
    const currN = parseFloat(currentNumber);

    if (isNaN(prevN) || isNaN(currN)) {
        return;
    }


    switch (operatorKey) {
        case "+":
            computedNumber = prevN + currN;
            computedNumber = computedNumber.toString();
            break

        case "-":
            computedNumber = prevN - currN;
            computedNumber = computedNumber.toString();
            break
        case "*":
            computedNumber = prevN * currN;
            computedNumber = computedNumber.toString();
            break
        case "/":
            computedNumber = prevN / currN;
            computedNumber = computedNumber.toString();
            break
        case "^":
            computedNumber = Math.pow(prevN, currN);
            computedNumber = computedNumber.toString();
            break
        default:
            return
    }
    currentNumber = computedNumber;
    operatorKey = undefined;
    operatorDisplayed = "";
    computedNumber = "";



}

function updateDisplayNumber() {
    //displayNumber = parseFloat(currentNumber).toString();

    formatNumber();
    numberDisplay.innerText = displayNumber;
    operationDisplay.innerHTML = previousNumber + " " + operatorDisplayed;
}

function formatNumber() {
    let numberArray;
    if (displayNumber.includes(".")) {
        let integer = "";
        let decimal = "";

        numberArray = displayNumber.split(".");
        integer = numberArray[0];
        decimal = numberArray[1];

        let integerFloat = parseFloat(integer);

        if (integer === '') {
            integer = '0';
        }
        else if (Number.isInteger(integerFloat)) {
            integer = integerFloat.toLocaleString("en-US");
        }

        else {
            displayNumber = integer + "." + decimal;
        }
    }
    /*
    let numberArray;
    let displayFloat = Math.abs(parseFloat(displayNumber));


    
    if (displayNumber === "") {
        return;
    }
    if (displayFloat > 1e100) {
        displayNumber = displayFloat.toExponential(3).toString();
    }
    else if (displayFloat >= 1e9) {
        displayNumber = displayFloat.toExponential(4).toString();
    } 
    else if (displayFloat < 1e-9 && displayFloat > 0) { 
        displayNumber = displayFloat.toExponential(4).toString();
    } 
    else if (displayNumber.includes(".")) {
        let integer ="";
        let decimal ="";

        numberArray = displayNumber.split(".");
        integer = numberArray[0];
        decimal = numberArray[1];

        let integerFloat = parseFloat(integer);

        console.log(decimal);
        let integerLength = integer.replace('-','').length;
        let decimalLength = decimal.length;
        console.log(decimalLength);
        if (integer==='') {
            integer= '0';
        }
        else if (Number.isInteger(integerFloat)) {
            integer = integerFloat.toLocaleString("en-US");
        }

        if (integerLength + decimalLength > 9) {
            displayFloat = Math.round(displayFloat * Math.pow(10,9-integerLength))/Math.pow(10,9-integerLength);
            console.log(displayFloat);
            if (displayFloat >= 1e9) {
                displayNumber = displayFloat.toExponential(4).toString();
            }
            else {
                displayNumber = displayFloat.toLocaleString("en-US");
            }

        }
        else {
            displayNumber = integer + "." + decimal;
        }
 

    }
    else {
        displayNumber = parseFloat(displayNumber).toLocaleString("en-US");;
    }*/

}

function switchSign() {
    if (currentNumber === "") {
        return;
    }

    currentNumber = -1 * parseFloat(currentNumber);
    currentNumber = currentNumber.toString();
    displayNumber = currentNumber;

}

function clearNumber() {

    if (currentNumber !== "") {
        currentNumber = "";
        displayNumber = "";
    }
    else {
        if (previousNumber !== "") {
            previousNumber = "";
            operatorKey = undefined;
            operatorDisplayed = "";
            computedNumber = "";
        }
    }
}

function deleteNumber() {
    if (currentNumber === "") {
        return;
    }
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    displayNumber = currentNumber;
}

function getPercentage() {
    if (currentNumber === "") {
        return;
    }

    currentNumber = parseFloat(currentNumber) / 100;
    currentNumber = currentNumber.toString();
    displayNumber = currentNumber;
}

function clickEqual() {

    compute();
    if (currentNumber !== "") {
        previousNumber = currentNumber;
    }

    currentNumber = "";
    displayNumber = currentNumber;


    /*if (isNaN(parseFloat(computedNumber))) {
        displayNumber = previousNumber;
    }  
    else
    {
        displayNumber = computedNumber;        
    }*/
}

function memoryClear() {
    memoryNumber = "";
}

function memoryRecall() {
    if (memoryNumber !== "") {
        currentNumber = memoryNumber;
        displayNumber = currentNumber;
    }
}

function memoryPlus() {
    if (memoryNumber === "") {
        memoryNumber = "0";
    }
    let memNumb = parseInt(memoryNumber);
    let currN = parseInt(currentNumber);
    memNumb = memNumb + currN;
    memoryNumber = memNumb.toString();
}

function memoryMinus() {
    if (memoryNumber === "") {
        memoryNumber = "0";
    }
    let memNumb = parseInt(memoryNumber);
    let currN = parseInt(currentNumber);
    memNumb = memNumb - currN;
    memoryNumber = memNumb.toString();
}



