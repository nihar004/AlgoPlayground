// // File: /app/api/create-path-chat/route.js

// import { NextResponse } from "next/server";

// // Ensure you have the Groq SDK installed: npm install groq-sdk
// // Although we'll use fetch here as per your example structure.

// // const GROQ_API_KEY = process.env.GROQ_API_KEY; // Use environment variable

// // CORS Headers - Reusable
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*", // Adjust in production!
//   "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//   "Access-Control-Allow-Headers":
//     "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Authorization",
// };

// // Handle OPTIONS requests for CORS preflight
// export async function OPTIONS(request) {
//   return new Response(null, { status: 200, headers: corsHeaders });
// }

// // Handle POST requests for chat interaction
// export async function POST(request) {
//   if (!GROQ_API_KEY) {
//     console.error("GROQ_API_KEY is not set in environment variables.");
//     return NextResponse.json(
//       {
//         error: "API key configuration error.",
//         status: "error",
//       },
//       { status: 500, headers: corsHeaders }
//     );
//   }

//   try {
//     const { messages, notesDataCategories } = await request.json();

//     // --- Input Validation ---
//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json(
//         {
//           error: "Missing or invalid 'messages' parameter.",
//           status: "error",
//         },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     if (
//       !notesDataCategories ||
//       !Array.isArray(notesDataCategories) ||
//       notesDataCategories.length === 0
//     ) {
//       return NextResponse.json(
//         {
//           error:
//             "Missing or invalid 'notesDataCategories' parameter. Provide available topic categories.",
//           status: "error",
//         },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     // --- Prompt Engineering ---
//     // Extract the last user message and format history for context
//     const conversationHistory = messages
//       .map((m) => `${m.role}: ${m.content}`)
//       .join("\n");

//     // Define the LLM's role and instructions clearly
//     const systemPrompt = `
// You are an AI assistant helping a user create a personalized learning path for Data Structures and Algorithms (DSA).
// Your goal is to understand the user's needs by asking clarifying questions.

// Available learning categories based on the provided data: ${notesDataCategories.join(", ")}.
// Topics also have difficulty levels like 'easy', 'medium'.

// Follow these steps CONVERSATIONALLY:
// 1.  Start by asking the user what specific topic or area they want to focus on (e.g., 'Arrays', 'Graphs', 'Sorting', 'Interview Prep', 'General DSA Fundamentals'). Offer suggestions if they are unsure.
// 2.  Once the focus area is clear, ask about their current skill level (e.g., 'beginner', 'intermediate', 'advanced').
// 3.  Then, ask about their primary learning goal (e.g., 'prepare for technical interviews', 'build a specific project', 'master the concepts for academics', 'improve problem-solving skills').
// 4.  Keep track of the answers provided by the user within the conversation flow.
// 5.  Once you have gathered Focus Area, Skill Level, and Goal, ask the user to suggest a name for their custom learning path.
// 6.  AFTER you have collected ALL four pieces of information (Focus, Level, Goal, Name), AND ONLY THEN, respond ONLY with a JSON object containing the collected details AND a status indicating completion. The JSON object MUST follow this exact format:
//     \`\`\`json
//     {
//       "status": "complete",
//       "parameters": {
//         "focus": "...",
//         "level": "...",
//         "goal": "...",
//         "name": "..."
//       }
//     }
//     \`\`\`
//     Replace "..." with the actual information gathered from the user. DO NOT include any other text, explanation, or formatting around this JSON object when the process is complete.

// If you haven't gathered all four pieces of information yet, continue the conversation by asking the *next* relevant question clearly and concisely. Allow the user to type their response or choose from options if you provide them. Be friendly and helpful.
// `.trim();

//     // Prepare messages for the Groq API
//     const apiMessages = [
//       { role: "system", content: systemPrompt },
//       // Include previous user/assistant messages from the input `messages` array
//       ...messages.map(({ role, content }) => ({ role, content })),
//     ];

//     // --- Call Groq LLM API ---
//     const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${GROQ_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "llama-3.3-70b-versatile",
//         messages: apiMessages,
//         temperature: 0.7, // Adjust for creativity vs. predictability
//         max_tokens: 500, // Adjust based on expected response length
//         // stream: false, // Set to true if you want streaming later
//       }),
//     });

//     // --- Response Handling ---
//     if (!response.ok) {
//       const errorBody = await response.text();
//       console.error("Groq API Error Response:", errorBody);
//       throw new Error(
//         `LLM API error: ${response.status} ${response.statusText}`
//       );
//     }

//     const data = await response.json();

//     if (!data.choices?.[0]?.message?.content) {
//       console.error("Invalid response format from LLM API:", data);
//       throw new Error("Invalid response format from LLM API");
//     }

//     const llmResponseContent = data.choices[0].message.content.trim();

//     // --- Check if LLM signaled completion ---
//     try {
//       // Attempt to parse the response as JSON ONLY IF it looks like the completion signal
//       if (
//         llmResponseContent.startsWith("{") &&
//         llmResponseContent.endsWith("}") &&
//         llmResponseContent.includes('"status": "complete"')
//       ) {
//         const parsedResponse = JSON.parse(llmResponseContent);
//         if (parsedResponse.status === "complete" && parsedResponse.parameters) {
//           // Return the structured parameters
//           return NextResponse.json(parsedResponse, {
//             status: 200,
//             headers: corsHeaders,
//           });
//         }
//       }
//       // If not the completion signal, return the text response for the next step
//       return NextResponse.json(
//         { response: llmResponseContent, status: "in-progress" },
//         { status: 200, headers: corsHeaders }
//       );
//     } catch (parseError) {
//       // If JSON parsing fails but it wasn't the completion signal, treat as normal text response
//       console.warn(
//         "LLM response wasn't the expected completion JSON, treating as text:",
//         parseError
//       );
//       return NextResponse.json(
//         { response: llmResponseContent, status: "in-progress" },
//         { status: 200, headers: corsHeaders }
//       );
//     }
//   } catch (error) {
//     console.error("Chat API Error:", error);
//     return NextResponse.json(
//       {
//         error:
//           error.message || "An error occurred while processing your request.",
//         status: "error",
//       },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

// File: /app/api/create-path-chat/route.js

import { NextResponse } from "next/server";

// Ensure you have the Groq SDK installed if you switch from fetch: npm install groq-sdk

// --- Environment Variable ---
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// --- CORS Headers (Reusable) ---
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // IMPORTANT: Restrict this in production! e.g., your frontend domain
  "Access-Control-Allow-Methods": "POST, OPTIONS", // Only allow POST and OPTIONS
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Specify allowed headers
};

// --- OPTIONS Handler (for CORS preflight) ---
export async function OPTIONS(request) {
  // Respond to preflight requests for CORS
  return new Response(null, { status: 200, headers: corsHeaders });
}

// --- POST Handler (for chat interaction) ---
export async function POST(request) {
  // 1. Check API Key Configuration
  if (!GROQ_API_KEY) {
    console.error(
      "SERVER ERROR: GROQ_API_KEY is not set in environment variables."
    );
    // Return JSON error response
    return NextResponse.json(
      { error: "API key configuration error on server.", status: "error" },
      { status: 500, headers: corsHeaders } // Use 500 for server config issues
    );
  }

  try {
    // 2. Parse Request Body
    const { messages, notesDataCategories } = await request.json();

    // 3. Input Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'messages' parameter.", status: "error" },
        { status: 400, headers: corsHeaders } // Use 400 for bad client requests
      );
    }
    if (!notesDataCategories || !Array.isArray(notesDataCategories)) {
      // Allow empty categories, but log a warning if it's unexpected
      console.warn(
        "Warning: 'notesDataCategories' parameter is missing or invalid. AI suggestions might be limited."
      );
      // Proceed without categories if necessary, or return error if they are required:
      // return NextResponse.json(
      //  { error: "Missing or invalid 'notesDataCategories' parameter.", status: "error" },
      //  { status: 400, headers: corsHeaders }
      // );
    }

    // 4. --- Prompt Engineering ---
    // Extract conversation history for context (excluding the system prompt if passed from client)
    const conversationHistory = messages
      .filter((m) => m.role !== "system") // Filter out any system messages from client history
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    // --- REVISED System Prompt ---
    const systemPrompt = `
You are an AI assistant specialized in helping users create personalized learning paths for Data Structures and Algorithms (DSA). Your primary goal is to understand the user's needs through a structured, friendly conversation.

Available learning topic categories (use these for suggestions and understanding focus): ${(notesDataCategories || []).join(", ")}.
Topics also have difficulty levels like 'easy', 'medium', 'hard'.

**Your Conversational Process (Strictly Follow):**

1.  **Initiate:** Start by warmly asking the user what specific topic or DSA area they want to focus on. Provide examples like 'Arrays', 'Graphs', 'Sorting', 'Interview Prep', or 'General DSA Fundamentals'. If they are unsure, offer these suggestions.
2.  **Clarify Focus:** Ensure you have a clear understanding of their chosen focus area based on the available categories or user input.
3.  **Assess Skill Level:** Once the focus is clear, ask about their current skill level (e.g., 'beginner', 'intermediate', 'advanced').
4.  **Determine Goal:** After getting the skill level, ask about their primary learning goal (e.g., 'prepare for technical interviews', 'build a specific project', 'master concepts for academics', 'improve problem-solving skills').
5.  **Request Path Name:** Once you have gathered Focus Area, Skill Level, AND Goal, ask the user to suggest a name for their custom learning path.
6.  **Track Information:** Keep track of the user's answers (Focus, Level, Goal, Name) throughout the conversation.

**Crucial Output Instruction:**

*   **DURING the conversation (Steps 1-5):** Respond naturally, ask the *next* required question clearly and concisely. Be friendly and helpful.
*   **AFTER you have successfully gathered ALL FOUR pieces of information (Focus, Level, Goal, Name) AND ONLY THEN:** Your **FINAL** response **MUST** be **ONLY** the JSON object specified below.
*   **DO NOT** include *any* introductory text (like "Okay, here is the JSON:", "Great! Here are the details:"), explanations, apologies, concluding remarks, or *any* other text whatsoever outside of the JSON structure in that final response. The response must start directly with \`{\` and end directly with \`}\`.

**Required JSON Format (ONLY for the final response):**
\`\`\`json
{
  "status": "complete",
  "parameters": {
    "focus": "...",
    "level": "...",
    "goal": "...",
    "name": "..."
  }
}
\`\`\`
(Replace "..." with the actual information gathered from the user).

If you are still missing any of the four pieces of information, continue the conversation by asking the next relevant question based on the steps above.
`.trim();

    // 5. Prepare Messages for LLM API
    // Start with the system prompt, then add the user/assistant history from the client request
    const apiMessages = [
      { role: "system", content: systemPrompt },
      // Include previous user/assistant messages passed from the client
      ...messages.filter((m) => m.role !== "system"), // Ensure no duplicate system messages
    ];

    console.log(
      "Sending messages to Groq API:",
      JSON.stringify(apiMessages, null, 2)
    ); // DEBUG: Log messages being sent

    // 6. --- Call Groq LLM API ---
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions"; // Use Groq's OpenAI-compatible endpoint
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`, // Use the API key from environment variables
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Specify the desired model
        messages: apiMessages, // Pass the prepared messages array
        temperature: 0.6, // Slightly lower temp for more predictable structured output
        max_tokens: 500, // Max tokens for the response (adjust as needed)
        // stream: false, // Set to true if you adapt frontend for streaming later
      }),
    });

    // 7. --- Handle LLM API Response ---
    if (!response.ok) {
      // Log detailed error from Groq API if possible
      const errorBody = await response.text();
      console.error(`Groq API Error (${response.status}):`, errorBody);
      // Return a generic error to the client
      throw new Error(`LLM API request failed with status ${response.status}`);
    }

    // Parse the successful JSON response from Groq
    const data = await response.json();
    console.log("Received from Groq API:", JSON.stringify(data, null, 2)); // DEBUG: Log the raw response

    // Extract the content from the first choice
    const llmResponseContent = data.choices?.[0]?.message?.content?.trim();

    if (!llmResponseContent) {
      console.error(
        "Invalid response format from LLM API - missing content:",
        data
      );
      throw new Error("Received invalid or empty response format from LLM.");
    }

    // 8. --- Check if LLM signaled completion (JSON output) ---
    try {
      // Check if the response *looks like* the target JSON structure
      if (
        llmResponseContent.startsWith("{") &&
        llmResponseContent.endsWith("}")
      ) {
        const parsedResponse = JSON.parse(llmResponseContent);
        // Validate the structure VERY strictly based on the prompt
        if (
          parsedResponse.status === "complete" &&
          parsedResponse.parameters &&
          typeof parsedResponse.parameters.focus === "string" &&
          typeof parsedResponse.parameters.level === "string" &&
          typeof parsedResponse.parameters.goal === "string" &&
          typeof parsedResponse.parameters.name === "string"
        ) {
          console.log("LLM signaled completion with valid parameters."); // DEBUG
          // Return the structured parameters as JSON
          return NextResponse.json(parsedResponse, {
            status: 200,
            headers: corsHeaders,
          });
        } else {
          // It looked like JSON, but didn't match the expected structure
          console.warn(
            "LLM response looked like JSON but failed validation:",
            parsedResponse
          );
          // Fall through to treat as a normal text response
        }
      }
      // If not the completion signal JSON, return the text response for conversation continuation
      console.log("LLM response is conversational (in-progress)."); // DEBUG
      return NextResponse.json(
        { response: llmResponseContent, status: "in-progress" },
        { status: 200, headers: corsHeaders }
      );
    } catch (parseError) {
      // If JSON parsing fails on something that wasn't the completion signal anyway, treat as normal text response
      console.warn(
        "LLM response wasn't the expected completion JSON, treating as text. Parse Error:",
        parseError.message
      );
      return NextResponse.json(
        { response: llmResponseContent, status: "in-progress" }, // Send the raw content back
        { status: 200, headers: corsHeaders }
      );
    }
  } catch (error) {
    // 9. --- Global Error Handling ---
    console.error("Chat API Endpoint Error:", error); // Log the detailed error on the server
    // Return a generic 500 error response to the client
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred on the server.",
        status: "error",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
