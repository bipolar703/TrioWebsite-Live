import express from 'express';
import cors from 'cors';
import { translate } from 'google-translate-api-x';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { texts, from, to } = req.body;
    
    // Handle batch translations
    const translations = await Promise.all(
      texts.map(async (text: string) => {
        try {
          const result = await translate(text, { from, to });
          return result.text;
        } catch (error) {
          console.error('Translation error:', error);
          return text; // Return original text on error
        }
      })
    );

    res.json({ translations });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
}); 