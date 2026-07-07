// Ashish AI Studio V4

document.addEventListener("DOMContentLoaded", () => {

    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    function addMessage(text, type) {

        const div = document.createElement("div");
        div.className = type;
        div.innerHTML = text;

        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const message = userInput.value.trim();

        if (!message) return;

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
                    message
                })

            });

            const data = await response.json();

            typing.remove();

            addMessage(
                "🤖 " + (data.reply || "No reply received."),
                "ai-message"
            );

        } catch (err) {

            typing.remove();

            addMessage(
                "❌ Unable to connect to AI Server.",
                "ai-message"
            );

            console.error(err);

        }

    });

});
