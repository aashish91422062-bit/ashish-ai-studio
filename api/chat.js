export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const { message } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API Key not found."
      });
    }

    return res.status(200).json({
      success: true,
      reply: "Backend connected successfully. Gemini API will be added in the next step."
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

}
