import { generateAlgorithmStates } from "./algorithmService";

import { NextResponse } from "next/server";

// API endpoint for Groq
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile"; // Current model

export async function checkVisualization(code) {
  try {
    if (!code || typeof code !== "string") {
      throw new Error("Invalid code input");
    }

    const prompt = `
      Analyze this algorithm:
      ${code}
      
      Please check if this algorithm can be visualized and provide:
      1. Whether it's visualizable (true/false)
      2. Reason if not visualizable
      3. A simple initial input array if visualizable (numbers between 1-50)
      4. Any potential runtime issues or infinite loops
      
      Return in this exact JSON format:
      {
        "isVisualizable": boolean,
        "reason": "string explaining why not if false",
        "initialInput": [numbers] if true,
        "potentialIssues": "string describing any runtime concerns"
      }
    `;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid API response structure");
    }

    const cleanContent = data.choices[0].message.content
      .replace(/```json\n?|\n?```/g, "")
      .trim();

    try {
      const result = JSON.parse(cleanContent);

      // Validate result structure
      if (typeof result.isVisualizable !== "boolean") {
        throw new Error("Invalid visualization check result");
      }

      if (
        result.isVisualizable &&
        (!Array.isArray(result.initialInput) ||
          result.initialInput.length === 0)
      ) {
        result.initialInput = [5, 3, 8, 4, 2]; // Fallback array
      }

      return result;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Failed to parse visualization check result");
    }
  } catch (error) {
    console.error("Error checking visualization:", error);
    throw error;
  }
}
