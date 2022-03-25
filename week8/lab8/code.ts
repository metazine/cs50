// TODO: Add code to check answers to questions
document.addEventListener('DOMContentLoaded', () => {
    let buttons =  Array.prototype.slice.call (
        document.getElementsByClassName("button")
    )    
    checkButtonInput();

    let submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", () => {
        let inputValue = (<HTMLInputElement>document.getElementById("field-input")).value;
        let formResultText = document.getElementById("form-result")
        let fieldInputBox = document.getElementById("field-input")
        if (inputValue.toLowerCase() == "water") {
            formResultText.innerHTML = "That is correct";
            fieldInputBox.style.backgroundColor = "green";
        }
        else {
            fieldInputBox.style.backgroundColor = "red";
            formResultText.innerHTML = "That is wrong";
        }
        formResultText.style.display = "block";
    })
    
    function checkButtonInput(): void {
        buttons.forEach((button: { addEventListener: (arg0: string, arg1: () => void) => void; classList: { contains: (arg0: string) => any; }; style: string; }) => {
            button.addEventListener("click", () => {
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
