// TODO: Add code to check answers to questions
document.addEventListener('DOMContentLoaded', function () {
    var buttons = Array.prototype.slice.call(document.getElementsByClassName("button"));
    checkButtonInput();
    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function () {
        var inputValue = document.getElementById("field-input").value;
        var formResultText = document.getElementById("form-result");
        var fieldInputBox = document.getElementById("field-input");
        if (inputValue.toLowerCase() == "water") {
            formResultText.innerHTML = "That is correct";
            fieldInputBox.style.backgroundColor = "green";
        }
        else {
            fieldInputBox.style.backgroundColor = "red";
            formResultText.innerHTML = "That is wrong";
        }
        formResultText.style.display = "block";
    });
    function checkButtonInput() {
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                if (button.classList.contains("wrong")) {
                    button.style = ("background-color: red;");
                    document.getElementById("wrong-answer-text").style.display = "block";
                    document.getElementById("correct-answer-text").style.display = "none";
                }
                else if (button.classList.contains("correct")) {
                    button.style = ("background-color: green;");
                    document.getElementById("correct-answer-text").style.display = "block";
                    document.getElementById("wrong-answer-text").style.display = "none";
                }
            });
        });
    }
});
