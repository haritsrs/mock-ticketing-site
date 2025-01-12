// src/utils/openai.ts
import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, make API calls from backend
});

export const generateConcertResponse = async (message: string) => {
  try {
    const systemPrompt = `You are KonserKita AI Assistant, a helpful concert recommendation system for an Indonesian concert ticket website. 
    You provide recommendations and answer questions about concerts, tickets, and music in Indonesia. 
    Always respond in Indonesian language. Be friendly and concise.
    Current available concerts:
    1. Tulus - 15 Feb 2025 - Gelora Bung Karno, Jakarta - Rp 750.000
    2. Raisa - 20 Feb 2025 - ICE BSD, Tangerang - Rp 850.000
    3. Maliq & D'Essentials - 1 Mar 2025 - Summarecon Mall Serpong - Rp 500.000`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return "Maaf, terjadi kesalahan. Silakan coba lagi nanti.";
  }
};