import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { QuestValidationResult } from "./types";

// FIX: Initialize the GoogleGenAI client according to guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMapsResponse = async (
  prompt: string,
  location: { latitude: number; longitude: number } | null
): Promise<GenerateContentResponse> => {
  const config: {
    tools: { googleMaps: {} }[];
    toolConfig?: any;
  } = {
    tools: [{ googleMaps: {} }],
  };

  if (location) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    };
  }

  // FIX: Use ai.models.generateContent for map-grounded responses
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: config,
  });

  return response;
};

export const analyzeVideo = async (
  videoBase64: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  const videoPart = {
    inlineData: {
      data: videoBase64,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  // FIX: Use gemini-2.5-pro for complex video analysis tasks
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: { parts: [videoPart, textPart] },
  });

  return response.text;
};

export const validateQuestCreation = async (
  title: string,
  description: string,
  budget: number
): Promise<QuestValidationResult> => {

  const prompt = `
    Analyze the following task posting for a platform called TaskTribe.
    
    Rules:
    1.  The platform is for short-term "quests" or "gigs", not permanent or full-time jobs. A quest should be a single, completable task.
    2.  The budget is in Indian Rupees (₹). Analyze if the budget is realistic for the described task. It can be low if it's a simple task.
    3.  Suggest a more descriptive and appealing description for the quest.
    4.  Your entire response must be in the specified JSON format.

    Task Title: "${title}"
    Task Description: "${description}"
    Proposed Budget: ₹${budget}
    `;

  // FIX: Define a response schema for structured JSON output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
        isJobPosting: { type: Type.BOOLEAN },
        jobPostingReason: { type: Type.STRING },
        isBudgetRealistic: { type: Type.BOOLEAN },
        suggestedMaxBudget: { type: Type.NUMBER },
        suggestion: { type: Type.STRING },
        improvedDescription: { type: Type.STRING },
    },
  };
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as QuestValidationResult;
};
