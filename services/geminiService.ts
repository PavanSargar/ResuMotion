import { GoogleGenAI } from '@google/genai';

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not defined in environment variables');
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export async function polishContent(text: string, type: 'summary' | 'bullet'): Promise<string> {
  const ai = getAiClient();
  if (!ai) return text;

  const prompt =
    type === 'summary'
      ? `Rewrite the following professional summary to be more punchy, tech-focused, and impactful. Keep it under 50 words. Do not add markdown or quotes.\n\nText: ${text}`
      : `Rewrite the following resume bullet point to use strong action verbs, include metrics if implied, and sound more impressive for a tech role. Do not add markdown or quotes.\n\nText: ${text}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return text;
  }
}

export async function generateSummary(role: string, skills: string[]): Promise<string> {
  const ai = getAiClient();
  if (!ai) return '';

  const prompt = `Write a professional resume summary for a ${role} proficient in ${skills.join(', ')}. Keep it under 40 words, professional, and confident.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || '';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return '';
  }
}
