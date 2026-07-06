export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        reply: "No message received"
      });
    }

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

    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        reply: data?.error?.message || "API Error"
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") ||
      null;

    if (!reply) {
      return res.status(500).json({
        success: false,
        reply: "No valid response from Gemini",
        raw: data
      });
    }

    return res.status(200).json({
      success: true,
      reply: reply
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
}
