/* ==========================================
   Ashish AI Studio
   Version : V3.0
   File : chat.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    if (!chatForm || !userInput || !chatBox) {
        console.log("Chat page not ready.");
        return;
    }

    function addMessage(message, type) {

        const div = document.createElement("div");

        div.className = type;

        div.innerHTML = message;

        chatBox.appendChild(div);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const message = userInput.value.trim();

        if (message === "") return;

        addMessage("👤 " + message, "user-message");

        userInput.value = "";

        const typing = document.createElement("div");
        typing.className = "ai-message";
        typing.innerHTML = "🤖 AI is typing...";
        chatBox.appendChild(typing);

        chatBox.scrollTop = chatBox.scrollHeight;

        try {

            const response = await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });

            const data = await response.json();

            typing.remove();

            addMessage("🤖 " + (data.reply || "No reply received."), "ai-message");

        } catch (error) {

            typing.remove();

            addMessage(
                "❌ Unable to connect to AI server.",
                "ai-message"
            );

            console.error(error);

        }

    });

});
