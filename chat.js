/* ==========================================
   Ashish AI Studio
   Version : V2.1 FINAL
   File : chat.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    if (!chatForm || !userInput || !chatBox) {
        console.log("Chat system not ready.");
        return;
    }

    function addMessage(message, type) {

        const div = document.createElement("div");

        div.className = type;

        div.innerHTML = message;

        chatBox.appendChild(div);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const message = userInput.value.trim();

        if (message === "") {
            alert("Please enter a message.");
            return;
        }

        addMessage("👤 " + message, "user-message");

        userInput.value = "";

        const typing = document.createElement("div");

        typing.className = "ai-message";

        typing.innerHTML = "🤖 AI is typing...";

        chatBox.appendChild(typing);

        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(function () {

            typing.remove();

            addMessage(
                "🤖 Thank you for your message.<br><br>Real AI Chat will be connected in Version 3.0.",
                "ai-message"
            );

        }, 1500);

    });

});
