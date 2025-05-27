import { NextResponse } from "next/server";

const GROQ_API_KEY = "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";

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":
        "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Authorization",
    },
  });
}

export async function POST(request) {
  try {
    const { code } = await request.json();

    // Validate request parameters
    if (!code) {
      return new Response(
        JSON.stringify({
          error: "Missing 'code' parameter",
          status: "error",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const prompt = `
You are a code formatter. Format the following code to ensure:
1. Proper indentation (use 2 spaces)
2. Consistent spacing around operators
3. Proper line breaks
4. Clean array and object formatting
5. No logic changes - only formatting

CODE TO FORMAT:
\`\`\`
${code}
\`\`\`

Return ONLY the formatted code without any additional text or markdown.
`.trim();

    // Call the LLM API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.1, // Lower temperature for more consistent formatting
          max_tokens: 4000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const formattedCode = data.choices[0].message.content
      .trim()
      // Remove any markdown code blocks if present
      .replace(/```[\w]*\n|```$/g, "")
      .trim();

    return new Response(
      JSON.stringify({
        formattedCode,
        status: "success",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Code formatting error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to format code",
        status: "error",
        formattedCode: code, // Return original code as fallback
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
