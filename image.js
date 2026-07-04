/* ==========================================
   Project : Ashish AI Studio
   Version : V2.0
   File : image.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector("button");
    const input = document.querySelector("input");

    button.addEventListener("click", function () {

        const prompt = input.value.trim();

        if (prompt === "") {
            alert("Please enter an image description.");
            return;
        }

        alert("Image Prompt:\n\n" + prompt);

        input.value = "";

    });

});
