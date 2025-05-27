// const GROQ_API_KEY = "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";

// export async function OPTIONS(request) {
//   return new Response(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//       "Access-Control-Allow-Headers":
//         "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Authorization",
//     },
//   });
// }

// export async function POST(request) {
//   try {
//     const { messages, code } = await request.json();

//     // Prepare the prompt for the LLM
//     const lastUserMessage = messages[messages.length - 1].content;
//     const conversationHistory = messages
//       .slice(0, -1)
//       .map((m) => `${m.role}: ${m.content}`)
//       .join("\n");

//     const prompt = `
// You are a helpful code assistant. The user has submitted some code and needs help with it.

// Here is the user's code:
// \`\`\`
// ${code}
// \`\`\`

// Previous conversation:
// ${conversationHistory}

// User's question: ${lastUserMessage}

// Please provide a helpful response that:
// 1. Answers the user's question specifically
// 2. References the code when appropriate
// 3. Provides clear explanations
// 4. Offers code improvements when relevant
// 5. Is concise but thorough

// Response:
//     `.trim();

//     // Call the LLM API (using llama3-70b-8192)
//     const apiUrl = "https://api.groq.com/v1/chat/completions";
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${GROQ_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "llama3-70b-8192",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 1000,
//       }),
//     });

//     if (!response.ok) {
//       console.error("API Response:", await response.text());
//       throw new Error(
//         `LLM API error: ${response.status} ${response.statusText}`
//       );
//     }

//     const data = await response.json();

//     if (!data.choices?.[0]?.message?.content) {
//       throw new Error("Invalid response format from LLM API");
//     }

//     return new Response(
//       JSON.stringify({
//         response: data.choices[0].message.content,
//         status: "success",
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Chat error:", error.message);
//     return new Response(
//       JSON.stringify({
//         error:
//           error.message || "An error occurred while processing your request",
//         status: "error",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         },
//       }
//     );
//   }
// }

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
    const { messages, code } = await request.json();

    // Validate request parameters
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Missing or invalid 'messages' parameter",
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

    // Prepare the prompt for the LLM
    const lastUserMessage = messages[messages.length - 1].content;
    const conversationHistory = messages
      .slice(0, -1)
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
You are a helpful code assistant. The user has submitted some code and needs help with it.

Here is the user's code:
\`\`\`
${code}
\`\`\`

Previous conversation:
${conversationHistory}

User's question: ${lastUserMessage}

Please provide a helpful response that:
1. Answers the user's question specifically
2. References the code when appropriate
3. Provides clear explanations
4. Offers code improvements when relevant
5. Is concise but thorough

Response:
    `.trim();

    // Call the LLM API (using llama3-70b-8192)
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error("API Response:", await response.text());
      throw new Error(
        `LLM API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from LLM API");
    }

    return new Response(
      JSON.stringify({
        response: data.choices[0].message.content,
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
    console.error("Chat error:", error.message);
    return new Response(
      JSON.stringify({
        error:
          error.message || "An error occurred while processing your request",
        status: "error",
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
