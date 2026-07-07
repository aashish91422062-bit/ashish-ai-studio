export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method Not Allowed"
    });
  }

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    // ===== Local Knowledge =====

    const text = message.toLowerCase();

    if (text.includes("your name")) {
      return res.status(200).json({
        reply: "My name is Ashish AI Studio."
      });
    }

    if (text.includes("who made you")) {
      return res.status(200).json({
        reply: "I was created by Ashish Kumar."
      });
    }

    if (text.includes("hello") || text.includes("hi")) {
      return res.status(200).json({
        reply: "Hello 👋 Welcome to Ashish AI Studio."
      });
    }

    // ===== Gemini API =====

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        reply: data?.error?.message || "Gemini API Error"
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return res.status(200).json({
      reply
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      reply: "Internal Server Error"
    });

  }

}
