// src/utils/llama.ts
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf";

export const generateConcertResponse = async (message: string) => {
  try {
    const systemPrompt = `You are KonserKita AI Assistant, a helpful concert recommendation system for an Indonesian concert ticket website. 
    You provide recommendations and answer questions about concerts, tickets, and music in Indonesia. 
    Always respond in Indonesian language. Be friendly and concise.
    Current available concerts:
    1. Tulus - 15 Feb 2025 - Gelora Bung Karno, Jakarta - Rp 750.000
    2. Raisa - 20 Feb 2025 - ICE BSD, Tangerang - Rp 850.000
    3. Maliq & D'Essentials - 1 Mar 2025 - Summarecon Mall Serpong - Rp 500.000

    Human: ${message}
    Assistant:`;

    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: systemPrompt,
        parameters: {
          max_length: 200,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
        }
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const result = await response.json();
    return result[0]?.generated_text?.split("Assistant:")[1]?.trim() || 
           "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error('Error calling Llama:', error);
    return "Maaf, terjadi kesalahan. Silakan coba lagi nanti.";
  }
};