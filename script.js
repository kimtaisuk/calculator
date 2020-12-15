
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
    
    if (isNaN(event.key)) {
        if (event.key !== ".") {
            return;
        }
    }
    event.preventDefault();
    document.getElementById(event.key).click();
});

document.addEventListener("keydown", (event) => {
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

    //displayNumber = formatNumber(displayNumber);
    numberDisplay.innerText = formatNumber(displayNumber);
    operationDisplay.innerHTML = "";
    if (operatorDisplayed != "") {
        operationDisplay.innerHTML = formatNumber(previousNumber) + " " + operatorDisplayed;
    }
    
}

function formatNumber(number) {
    if (number == "") {
        return number = "";
    }

    let numberArray, integerLength, decimalLength;
    let integer = "";
    let decimal = "";

    number = number.toString();
    let numberTotalLength = number.replace(".","").replace("-","").length;
   


    
    if (numberTotalLength > 10 || number.includes("e")) {
        
        number = parseFloat(number).toExponential();
        if (number.replace("-","").replace(".","").length > 10) {
            let expForm = number.split("e");
            let baseNum = expForm[0];
            let expNum = expForm[1];
            let precisionLength = 9-expNum.length; 
            let precisionPower = Math.pow(10,precisionLength)
            
            baseNum = Math.round(parseFloat(baseNum) * precisionPower) / precisionPower;
            
            //baseNum = parseFloat(baseNum).toFixed(precisionLength);
            number = baseNum + "e" + expNum;
        } 
    }
    else if (number.includes(".")){
         
            numberArray = number.split(".");
            integer = numberArray[0];
            decimal = numberArray[1];        
            integerLength = integer.replace('-','').length;
            decimalLength = decimal.length;
    
            let integerFloat = parseFloat(integer);
    
            if (integer === '') {
                integer = '0';
            }
            else {
                integer = integerFloat.toLocaleString("en-US");
            }


            number = integer + "." + decimal;
        
    }

    else {
        number = parseFloat(number).toLocaleString("en-US");
    }

    return number;

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
    if (currentNumber === "" || formatNumber(currentNumber).includes("e")) {
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

    displayNumber = currentNumber;
    
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
    if (currentNumber == "") {
        return;
    }
    if (memoryNumber === "") {
        memoryNumber = "0";
    }
    let memNumb = parseFloat(memoryNumber);
    let currN = parseFloat(currentNumber);
    memNumb = memNumb + currN;
    memoryNumber = memNumb.toString();
}

function memoryMinus() {
    if (currentNumber == "") {
        return;
    }
    if (memoryNumber === "") {
        memoryNumber = "0";
    }
    let memNumb = parseFloat(memoryNumber);
    let currN = parseFloat(currentNumber);
    memNumb = memNumb - currN;
    memoryNumber = memNumb.toString();
}



