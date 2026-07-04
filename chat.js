/* ==========================================
   Ashish AI Studio
   Version : V2.0
   File : chat.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const sendButton = document.querySelector("button");
    const inputBox = document.querySelector("input");

    sendButton.addEventListener("click", function () {

        const message = inputBox.value.trim();

        if (message === "") {
            alert("Please enter a message.");
            return;
        }

        alert("Your message: " + message);

        inputBox.value = "";

    });

});
