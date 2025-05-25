document.getElementById("submitButton").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const statusMsg = document.getElementById("status");

    if (!email.includes("@")) {
        statusMsg.textContent = "Podaj poprawny adres e-mail!";
        statusMsg.style.color = "red";
        statusMsg.style.display = "block";
        return;
    }

    statusMsg.textContent = "Dziękujemy! Twoje dane zostały zapisane.";
    statusMsg.style.color = "green";
    statusMsg.style.display = "block";
});
