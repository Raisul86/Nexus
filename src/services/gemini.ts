import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getPostIdeaSuggestion = async (interests: string[] = ['technology', 'photography', 'travel']) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a social media assistant for Nexus Social. Generate 3 short, engaging post ideas for a user interested in: ${interests.join(', ')}. Return them as a simple bulleted list.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate ideas at this time.";
  }
};
