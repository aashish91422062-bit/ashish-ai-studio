import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: 'Please enter a message.' });
    }

    const jsonPath = path.join(process.cwd(), 'data', 'knowledge.json');
    const fileData = fs.readFileSync(jsonPath, 'utf-8');
    const knowledgeBase = JSON.parse(fileData);

    const query = message.toLowerCase();
    const match = knowledgeBase.find(item => item.question.toLowerCase().includes(query));

    if (match) {
      return res.status(200).json({ reply: match.answer });
    } else {
      return res.status(200).json({ reply: 'Sorry, I couldn\'t find any information for that.' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ reply: 'Internal Server Error' });
  }
}
