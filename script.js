                                  /* ================================
                                      Simple Calculator Logic
                                    ================================ */

/* === Select DOM elements === */
const display = document.getElementById("calc-display");

// Number buttons (0–9 and .)
const numberButtons = document.querySelectorAll(".btn-num");

// Operator buttons (+, -, ×, ÷, %)
const operatorButtons = document.querySelectorAll(".btn-operator");

// Functional buttons (C, ⌫)
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const percentButton = document.getElementById("percent");

/* === Calculator state === */
let currentInput = "";   // The current number being typed
let previousInput = "";  // The number before the operator
let currentOperator = null; // Stores the current operator symbol


   // Utility Functions


/**
 * Update the calculator display
 */
function updateDisplay() {
  display.value = currentInput || previousInput || "0";
}

/**
 * Clear all stored data
 */
function clearAll() {
  currentInput = "";
  previousInput = "";
  currentOperator = null;
  updateDisplay();
}

/**
 * Delete the last character in the current input
 */
function deleteLast() {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay();
}

/**
 * Handle number or decimal button press
 */
function appendNumber(number) {
  // Prevent multiple decimals
  if (number === "." && currentInput.includes(".")) return;

  // Append the number
  currentInput += number;
  updateDisplay();
}

/**
 * Handle operator button press
 */
function chooseOperator(operator) {
  // If no current input but there's already a previous input, change the operator
  if (currentInput === "" && previousInput !== "") {
    currentOperator = operator;
    return;
  }

  // If there was a previous operation, compute first
  if (previousInput !== "") {
    calculate();
  }

  currentOperator = operator;
  previousInput = currentInput;
  currentInput = "";
}

/**
 * Perform calculation based on stored values and operator
 */
function calculate() {
  if (currentOperator === null || currentInput === "" || previousInput === "") return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case "+":
      result = prev + curr;
      break;
    case "−":
    case "-":
      result = prev - curr;
      break;
    case "×":
    case "*":
      result = prev * curr;
      break;
    case "÷":
    case "/":
      if (curr === 0) {
        result = "Error";
        break;
      }
      result = prev / curr;
      break;
    case "%":
      result = prev % curr;
      break;
    default:
      return;
  }

  // Update calculator state
  currentInput = result.toString();
  previousInput = "";
  currentOperator = null;
  updateDisplay();
}

/**
 * Convert current input to percentage 
 */
function convertToPercent() {
  if (currentInput === "") return;
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

/* ================================
   Event Listeners
   ================================ */

// Number buttons
numberButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    appendNumber(btn.textContent);
  });
});

// Operator buttons
operatorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    chooseOperator(btn.textContent);
  });
});

// Clear, delete, equals, and percent
clearButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", deleteLast);
equalsButton.addEventListener("click", calculate);
percentButton.addEventListener("click", convertToPercent);


   //Keyboard Support (optional)

document.addEventListener("keydown", e => {
  if (!isNaN(e.key) || e.key === ".") appendNumber(e.key);
  if (["+", "-", "*", "/", "%"].includes(e.key)) chooseOperator(e.key);
  if (e.key === "Enter" || e.key === "=") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") clearAll();
});
