import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const polishContent = async (text: string, type: 'summary' | 'bullet'): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return text; // Fallback if no API key
  }

  const prompt = type === 'summary' 
    ? `Rewrite the following professional summary to be more punchy, tech-focused, and impactful. Keep it under 50 words. Do not add markdown or quotes.\n\nText: ${text}`
    : `Rewrite the following resume bullet point to use strong action verbs, include metrics if implied, and sound more impressive for a tech role. Do not add markdown or quotes.\n\nText: ${text}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text;
  }
};

export const generateSummary = async (role: string, skills: string[]): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "";

  const prompt = `Write a professional resume summary for a ${role} proficient in ${skills.join(', ')}. Keep it under 40 words, professional, and confident.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "";
  }
};