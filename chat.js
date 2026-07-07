// Ashish AI Studio V4

document.addEventListener("DOMContentLoaded", () => {
// Load old chat
const oldChat = localStorage.getItem("ashish_chat");

if(oldChat){
    chatBox.innerHTML = oldChat;
}
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    function addMessage(text, type) {

    const row = document.createElement("div");
    row.className = (type === "ai-message") ? "ai-row" : "user-row";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = (type === "ai-message") ? "🤖" : "👤";

    const msg = document.createElement("div");
    msg.className = "message";
    msg.innerHTML = text;
if(type === "ai-message"){

    const copyBtn = document.createElement("button");

    copyBtn.className = "copy-btn";

    copyBtn.innerHTML = "📋 Copy";

    copyBtn.onclick = () => {

        navigator.clipboard.writeText(msg.innerText);

        copyBtn.innerHTML = "✅ Copied";

        setTimeout(()=>{
            copyBtn.innerHTML="📋 Copy";
        },1500);

    };

    msg.appendChild(document.createElement("br"));

    msg.appendChild(copyBtn);

}
    row.appendChild(avatar);
    row.appendChild(msg);

    chatBox.appendChild(row);

    chatBox.scrollTop = chatBox.scrollHeight;
    }

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
        typing.innerHTML = `
<div class="typing">
<span></span>
<span></span>
<span></span>
</div>
`;
        chatBox.appendChild(typing);

        chatBox.scrollTop = chatBox.scrollHeight;
localStorage.setItem("ashish_chat", chatBox.innerHTML);
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
