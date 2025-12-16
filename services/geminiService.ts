import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly and helpful AI assistant for BSc students (Computer Science and IT). Your name is 'BSc Study Hub AI'. You help students with exam preparation, clearing subject doubts, syllabus guidance, and app usage. You are capable of responding in English, Hindi, and Marathi based on the user's language. Keep answers concise, academic, and encouraging.",
      }
    });

    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};
