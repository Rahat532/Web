function appendNumber(num) {
    document.getElementById('display').value += num;
}

function appendOperator(op) {
    document.getElementById('display').value += op;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        let result = eval(document.getElementById('display').value);
        if (isNaN(result)) {
            showModal("Invalid Calculation");
        } else {
            document.getElementById('display').value = result;
        }
    } catch (e) {
        showModal("Invalid Expression");
    }
}

/* Modal Functions */
function showModal(message) {
    document.getElementById("modal-message").textContent = message;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

window.onload = function() {
    showModal("Welcome to the Colorful Calculator!");
};

