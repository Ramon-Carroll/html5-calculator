document.addEventListener("DOMContentLoaded", function() {
    var entryScreen = document.getElementById("entry-screen");
    var operationScreen = document.getElementById("operation-screen");
    var decimalCanBeUsed = true;
    var negativeCanBeUsed = true;
    var evalComplete = true;
    var expression; // operationScreen.value;
    var lastChar; //expression[expression.length - 1];
    var secondToLastChar; //expression[expression.length - 2];
    document.getElementById("calculator").addEventListener("click", function(event) {
        var buttonValue = event.target.innerHTML;
        //User clicked 0 button
        if (buttonValue === "0") {
            expression = operationScreen.value;
            lastChar = expression[expression.length - 1];
            if (lastChar !== undefined && lastChar !== " ") {
                entryScreen.value += buttonValue
                operationScreen.value += buttonValue;
            }
        }
        else if (!isNaN(buttonValue) && buttonValue !== "0") { ////We clicked a number that is not 0
            //Is this a new operation? If so, we need to clear the screen first.
            entryScreen.value += buttonValue
            operationScreen.value += buttonValue;

        }
        else if (buttonValue === ".") {
            //Decimal can only be used once per operation
            if (decimalCanBeUsed === true) {
                entryScreen.value += buttonValue;
                operationScreen.value += buttonValue;
                decimalCanBeUsed = false;
            }

        }
        else if (buttonValue === "+") {
            expression = operationScreen.value;
            lastChar = expression[expression.length - 1];
            //If last char is a number
            if (!isNaN(lastChar) && lastChar !== " ") {
                entryScreen.value = "";
                operationScreen.value += " ";
                operationScreen.value += buttonValue;
                operationScreen.value += " ";
                decimalCanBeUsed = true;
                negativeCanBeUsed = true;
            }
        }
        else if (buttonValue === "-") { //Operates as both the negative and minus button.
            expression = operationScreen.value;
            lastChar = expression[expression.length - 1];
            var thirdToLastChar = expression[expression.length - 3];

            if (!isNaN(lastChar) && lastChar !== " " && lastChar !== ".") {
                entryScreen.value = "";
                operationScreen.value += " ";
                operationScreen.value += buttonValue;
                operationScreen.value += " ";
                decimalCanBeUsed = true;
                negativeCanBeUsed = true;
            }
            else if (negativeCanBeUsed && lastChar !== ".") { //Use negative instead of minus
                entryScreen.value = "-";
                operationScreen.value += buttonValue;
                decimalCanBeUsed = true;
                negativeCanBeUsed = false;
            }

        }
        else if (buttonValue === "÷") {
            expression = operationScreen.value;
            lastChar = expression[expression.length - 1];
            if (!isNaN(lastChar) && lastChar !== " ") {
                entryScreen.value = "";
                operationScreen.value += " ";
                operationScreen.value += "÷";
                operationScreen.value += " ";
                decimalCanBeUsed = true;
                negativeCanBeUsed = true;
            }

        }
        else if (buttonValue === "x") {
            expression = operationScreen.value;
            lastChar = expression[expression.length - 1];
            if (!isNaN(lastChar) && lastChar !== " ") {
                entryScreen.value = "";
                operationScreen.value += " ";
                operationScreen.value += buttonValue;
                operationScreen.value += " ";
                decimalCanBeUsed = true;
                negativeCanBeUsed = true;
            }

        }
        else if (buttonValue === "%") {
            //As long as there is a number on the entry screen
            if (entryScreen.value !== undefined && !isNaN(entryScreen.value) && entryScreen.value !== "") {
                expression = operationScreen.value;
                var percentage = entryScreen.value / 100.0;
                var arrayedExpression = expression.split(" ");
                arrayedExpression[arrayedExpression.length - 1] = arrayedExpression[arrayedExpression.length - 3] * percentage;
                expression = arrayedExpression.join(" ");
                operationScreen.value = expression;
                entryScreen.value = " ";

            }

        }
        else if (buttonValue === "C") {
            entryScreen.value = "";
            operationScreen.value = "";
            decimalCanBeUsed = true;
            negativeCanBeUsed = true;

        }
        else if (buttonValue === "=") {
            entryScreen.value = "";
            var xChar = /x/g;
            var slashChar = /÷/g;
            expression = operationScreen.value;
            expression = expression.replace(xChar, "*"); //Convert all x's to *'s, so eval can read it.
            expression = expression.replace(slashChar, "/"); //Likewise, convert  ÷'s to /, so eval can know to divide.
            operationScreen.value = eval(expression);
            decimalCanBeUsed = true;
            negativeCanBeUsed = true;
            evalComplete = true;
        }
    });
})