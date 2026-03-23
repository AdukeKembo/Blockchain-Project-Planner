
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectPlan } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          description: "A high-level category for a group of related tasks, like 'Blockchain Core Development' or 'API and User Interface'."
        },
        tasks: {
          type: Type.ARRAY,
          description: "A list of specific tasks within this category.",
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "A concise title for the task, e.g., 'Build a basic blockchain'."
              },
              description: {
                type: Type.STRING,
                description: "A one or two-sentence description of what the task involves."
              },
              technologies: {
                type: Type.ARRAY,
                description: "A list of key libraries, frameworks, or tools mentioned for this specific task.",
                items: {
                  type: Type.STRING
                }
              }
            },
            required: ["title", "description", "technologies"]
          }
        }
      },
      required: ["category", "tasks"]
    }
  };


export async function generateProjectPlan(description: string): Promise<string> {
    const prompt = `Based on the following project description, create a structured project plan. Group related items into distinct categories. For each category, list the specific tasks, provide a brief description for each task, and identify any key technologies or libraries mentioned for that task.

    Project Description:
    ---
    ${description}
    ---
    
    Generate the plan according to the provided JSON schema.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2
            },
        });

        const text = response.text.trim();
        if (!text) {
          throw new Error("Received an empty response from the API.");
        }
        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
}
