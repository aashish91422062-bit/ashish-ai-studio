// Ashish AI Studio V4 Final

document.addEventListener("DOMContentLoaded", () => {

    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const clearBtn = document.getElementById("clearChatBtn");

    // Load saved chat
    const savedChat = localStorage.getItem("ashish_chat");

    if (savedChat) {
        chatBox.innerHTML = savedChat;
    }

    function saveChat() {
        localStorage.setItem("ashish_chat", chatBox.innerHTML);
    }

    function addMessage(text, sender) {

        const row = document.createElement("div");
        row.className = sender === "user" ? "user-row" : "ai-row";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.innerHTML = sender === "user" ? "👤" : "🤖";

        const message = document.createElement("div");
        message.className = "message";
        message.innerHTML = text;

        row.appendChild(avatar);
        row.appendChild(message);

        chatBox.appendChild(row);

        chatBox.scrollTop = chatBox.scrollHeight;

        saveChat();
    }

    chatForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const msg = userInput.value.trim();

        if (!msg) return;

        addMessage(msg, "user");

        userInput.value = "";

        const typing = document.createElement("div");

        typing.className = "ai-row";

        typing.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="message">Typing...</div>
        `;

        chatBox.appendChild(typing);

        chatBox.scrollTop = chatBox.scrollHeight;

        try {

            const response = await fetch("/api/chat", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    message: msg

                })

            });

            const data = await response.json();

            typing.remove();

            addMessage(data.reply || "No reply received.", "ai");

        } catch (err) {

            typing.remove();

            addMessage("❌ Unable to connect to AI.", "ai");

        }

    });

    clearBtn.onclick = () => {

        if (confirm("Delete all chats?")) {

            chatBox.innerHTML = "";

            localStorage.removeItem("ashish_chat");

        }

    };

});
