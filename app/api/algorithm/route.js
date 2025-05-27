// import { NextResponse } from "next/server";

// // API endpoint for Groq
// const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
// const GROQ_API_KEY = "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";
// const MODEL = "llama-3.3-70b-versatile"; // Current model

// // Function to generate algorithm states based on code
// async function generateAlgorithmStates(code, inputArray) {
//   try {
//     console.log("Generating algorithm states for array:", inputArray);

//     const prompt = `z
// I have a JavaScript algorithm implementation:
// ${code}
// Please create ONLY a state generation function that captures all the important steps in this algorithm for visualization purposes. The function should:
// 1. Create a snapshot of the array at each significant step
// 2. Track all variables and indices used in the algorithm (like i, j, key, etc.)
// 3. Label each step with a clear action (e.g., "compare", "swap", "insert")
// 4. Include a beginner-friendly description of what's happening at each step
// 5. Mark elements that are in their final position when applicable

// IMPORTANT: Your function MUST follow this EXACT state format for each step:
// {
//   array: [...], // Copy of the array at this step
//   indices: {    // All index variables used in the algorithm
//     i: null,    // Main loop index (if applicable)
//     j: null,    // Secondary loop index (if applicable)
//     minIndex: null, // For selection sort, quicksort pivot index, etc.
//     current: null,  // Current element being processed
//   },
//   variables: {  // Any other algorithm-specific variables
//     // Examples: sum, count, key, pivot value, etc.
//   },
//   action: "",   // One word describing the current action: "compare", "swap", "insert", etc.
//   description: "", // A beginner-friendly explanation of this step
//   finalPositions: [] // Array of indices that are in their final sorted position
// }

// Return the function as a complete, executable JavaScript function with this signature:
// function generateStates(arr) {
//   // Your implementation here that STRICTLY follows the format above
//   // Return an array of state objects
// }`;

//     console.log("Sending request to LLM API...");

//     // Call the LLM API with timeout
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

//     try {
//       const response = await fetch(GROQ_API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${GROQ_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: MODEL,
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.3,
//           max_tokens: 2500,
//         }),
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("LLM API error response:", errorText);

//         try {
//           const errorData = JSON.parse(errorText);
//           throw new Error(
//             `API error: ${errorData.error?.message || response.statusText}`
//           );
//         } catch (jsonError) {
//           throw new Error(
//             `LLM API error (${response.status}): ${errorText.slice(0, 100)}`
//           );
//         }
//       }

//       const data = await response.json();
//       console.log("LLM API Response received");

//       const generatedCode = data.choices[0].message.content;
//       console.log("Generated Code Length:", generatedCode.length);

//       // Extract the function code using a more robust method that handles code blocks
//       let functionCode = extractFunctionCode(generatedCode);

//       if (!functionCode) {
//         console.error("Could not extract function from LLM response");
//         throw new Error("Failed to extract valid function from API response");
//       }

//       console.log("Function code extracted, length:", functionCode.length);

//       // Execute the function with the input array
//       const states = executeGeneratedFunction(functionCode, inputArray);
//       console.log(`Generated ${states.length} states`);

//       // Post-process states to normalize format
//       return normalizeStates(states, inputArray);
//     } catch (error) {
//       clearTimeout(timeoutId);
//       throw error;
//     }
//   } catch (error) {
//     console.error("Failed to generate algorithm states:", error);
//     // Return a minimal default state instead of throwing
//     return [createDefaultState(inputArray, error.message)];
//   }
// }

// // Helper function to extract function code from LLM response
// function extractFunctionCode(response) {
//   try {
//     // First, look for code blocks with ```javascript
//     const codeBlockRegex =
//       /```(?:javascript|js)?\s*(function\s+generateStates[\s\S]*?)\s*```/;
//     const codeBlockMatch = response.match(codeBlockRegex);

//     if (codeBlockMatch && codeBlockMatch[1]) {
//       return codeBlockMatch[1];
//     }

//     // If no code blocks, try to find the function directly
//     const functionRegex =
//       /(function\s+generateStates\s*\(\s*arr\s*\)\s*\{[\s\S]*?\n\})/;
//     const functionMatch = response.match(functionRegex);

//     if (functionMatch && functionMatch[1]) {
//       return functionMatch[1];
//     }

//     // Try with arrow function syntax
//     const arrowFunctionRegex =
//       /((?:const|let|var)?\s*generateStates\s*=\s*\(\s*arr\s*\)\s*=>\s*\{[\s\S]*?\n\})/;
//     const arrowMatch = response.match(arrowFunctionRegex);

//     if (arrowMatch && arrowMatch[1]) {
//       return arrowMatch[1];
//     }

//     return null;
//   } catch (error) {
//     console.error("Error extracting function code:", error);
//     return null;
//   }
// }

// // Helper function to execute the generated function
// function executeGeneratedFunction(functionCode, inputArray) {
//   try {
//     // Clean up the function code - remove example usage if present
//     const cleanedCode = functionCode.replace(/\/\/\s*Example[\s\S]*$/, "");

//     // Validate syntax
//     validateSyntax(cleanedCode);

//     // Wrap the function in a module and execute it
//     const fullCode = `
//       ${cleanedCode}
//       return generateStates([...inputArray]);
//     `;

//     // Create and execute the function
//     const generatedFunction = new Function("inputArray", fullCode);

//     // Wrap execution in try-catch to get more helpful errors
//     try {
//       const states = generatedFunction([...inputArray]); // Pass a copy to avoid mutation

//       // Basic validation of returned states
//       if (!Array.isArray(states)) {
//         throw new Error("Function did not return an array");
//       }

//       if (states.length === 0) {
//         throw new Error("Function returned an empty array");
//       }

//       return states;
//     } catch (executionError) {
//       console.error("Function execution error:", executionError);
//       throw new Error(`Function execution failed: ${executionError.message}`);
//     }
//   } catch (error) {
//     console.error("Function execution failed:", error);
//     // Return a minimal default state instead of throwing
//     return [createDefaultState(inputArray, error.message)];
//   }
// }

// // Function to validate JavaScript syntax
// function validateSyntax(code) {
//   try {
//     // Using Function constructor to validate syntax without executing
//     new Function(code);
//     return true;
//   } catch (error) {
//     console.error("Syntax validation failed:", error.message);
//     throw new Error(`Invalid generated code: ${error.message.split("\n")[0]}`);
//   }
// }

// // Helper function to create a default state
// function createDefaultState(array, errorMessage = null) {
//   return {
//     array: Array.isArray(array) ? [...array] : [1, 2, 3, 4, 5],
//     indices: {
//       i: null,
//       j: null,
//       minIndex: null,
//       current: null,
//     },
//     variables: {},
//     action: errorMessage ? "error" : "start",
//     description: errorMessage
//       ? `Error: ${errorMessage}`
//       : `Initial array: [${array.join(", ")}]`,
//     finalPositions: [],
//   };
// }

// // Helper function to normalize states
// function normalizeStates(states, originalArray) {
//   if (!Array.isArray(states) || states.length === 0) {
//     return [createDefaultState(originalArray)];
//   }

//   return states.map((state) => {
//     // Create a normalized state with all expected fields
//     const normalized = {
//       array: Array.isArray(state.array) ? [...state.array] : [...originalArray],
//       indices: {
//         i: null,
//         j: null,
//         minIndex: null,
//         current: null,
//         pivotIndex: null,
//         compareIndices: null,
//         swapIndices: null,
//       },
//       variables: {},
//       action: state.action || "",
//       description: state.description || "",
//       finalPositions: [],
//     };

//     // Handle different naming patterns for final positions
//     if (state.finalPositions && Array.isArray(state.finalPositions)) {
//       normalized.finalPositions = [...state.finalPositions];
//     } else if (state.completed && Array.isArray(state.completed)) {
//       normalized.finalPositions = [...state.completed];
//     }

//     // Handle the case where indices might be in variables
//     if (state.variables) {
//       // Copy all variables
//       normalized.variables = { ...state.variables };

//       // Move index-related variables to indices
//       const indexKeys = ["i", "j", "minIndex", "current", "pivotIndex"];
//       indexKeys.forEach((key) => {
//         if (state.variables[key] !== undefined) {
//           normalized.indices[key] = state.variables[key];
//           delete normalized.variables[key]; // Remove from variables
//         }
//       });
//     }

//     // Handle the case where indices is already defined
//     if (state.indices) {
//       // Merge with normalized.indices, preserving our structure
//       Object.keys(state.indices).forEach((key) => {
//         normalized.indices[key] = state.indices[key];
//       });
//     }

//     // Handle marked elements (for comparisons, etc.)
//     if (state.marked && Array.isArray(state.marked)) {
//       normalized.indices.compareIndices = [...state.marked];
//     }

//     return normalized;
//   });
// }

// // Function to analyze algorithm and check for correctness
// async function analyzeAlgorithm(code, inputArray, expectedOutput) {
//   try {
//     const prompt = `
// Analyze this algorithm implementation:
// ${code}
// For input array: ${JSON.stringify(inputArray)}
// Expected output: ${JSON.stringify(expectedOutput)}
// Does this algorithm correctly solve the problem? If not, identify issues and suggest corrections.
// `;

//     // Call the LLM API with timeout
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

//     try {
//       const response = await fetch(GROQ_API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${GROQ_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: MODEL,
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.3,
//         }),
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("LLM API error response (analyze):", errorText);
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return {
//         analysis: data.choices[0].message.content,
//         isCorrect: data.choices[0].message.content
//           .toLowerCase()
//           .includes("correctly"),
//       };
//     } catch (error) {
//       clearTimeout(timeoutId);
//       throw error;
//     }
//   } catch (error) {
//     console.error("Failed to analyze algorithm:", error);
//     return {
//       analysis: `Error analyzing algorithm: ${error.message}`,
//       isCorrect: false,
//     };
//   }
// }

// // API endpoint handlers
// export async function POST(request) {
//   try {
//     // Parse request body with error handling
//     let requestBody;
//     try {
//       requestBody = await request.json();
//     } catch (parseError) {
//       console.error("Failed to parse request body:", parseError);
//       return NextResponse.json(
//         { error: "Invalid JSON in request body" },
//         { status: 400 }
//       );
//     }

//     const { action, code, inputArray, expectedOutput } = requestBody;

//     // Validate request parameters
//     if (!action) {
//       return NextResponse.json(
//         { error: "Missing 'action' parameter" },
//         { status: 400 }
//       );
//     }

//     if (!code) {
//       return NextResponse.json(
//         { error: "Missing 'code' parameter" },
//         { status: 400 }
//       );
//     }

//     if (!Array.isArray(inputArray)) {
//       return NextResponse.json(
//         { error: "Missing or invalid 'inputArray' parameter" },
//         { status: 400 }
//       );
//     }

//     console.log(
//       `Processing ${action} request for array of length ${inputArray.length}`
//     );

//     if (action === "generate") {
//       try {
//         const states = await generateAlgorithmStates(code, inputArray);
//         return NextResponse.json({ states });
//       } catch (error) {
//         console.error("Error in generate action:", error);
//         return NextResponse.json(
//           {
//             error: error.message,
//             states: [createDefaultState(inputArray, error.message)],
//           },
//           { status: 500 }
//         );
//       }
//     } else if (action === "analyze") {
//       try {
//         const analysis = await analyzeAlgorithm(
//           code,
//           inputArray,
//           expectedOutput
//         );
//         return NextResponse.json({ analysis });
//       } catch (error) {
//         console.error("Error in analyze action:", error);
//         return NextResponse.json(
//           {
//             error: error.message,
//             analysis: {
//               analysis: `Error analyzing algorithm: ${error.message}`,
//               isCorrect: false,
//             },
//           },
//           { status: 500 }
//         );
//       }
//     } else {
//       return NextResponse.json({ error: "Invalid action" }, { status: 400 });
//     }
//   } catch (error) {
//     console.error("Unhandled API error:", error);
//     return NextResponse.json(
//       {
//         error: `Unhandled error: ${error.message}`,
//         states: [],
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google AI
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_API_KEY || "AIzaSyASA0ITCAGnwEW-k83vm-FGf3ngVMwdnqk"
);
const MODEL_NAME = "gemini-1.5-pro"; // or "gemini-pro" for the lighter model

// Helper function to extract function code from AI response
function extractFunctionCode(response) {
  try {
    // First, look for code blocks with ```javascript
    const codeBlockRegex =
      /```(?:javascript|js)?\s*(function\s+generateStates[\s\S]*?)\s*```/;
    const codeBlockMatch = response.match(codeBlockRegex);

    if (codeBlockMatch && codeBlockMatch[1]) {
      return codeBlockMatch[1];
    }

    // If no code blocks, try to find the function directly
    const functionRegex =
      /(function\s+generateStates\s*\(\s*arr\s*\)\s*\{[\s\S]*?\n\})/;
    const functionMatch = response.match(functionRegex);

    if (functionMatch && functionMatch[1]) {
      return functionMatch[1];
    }

    // Try with arrow function syntax
    const arrowFunctionRegex =
      /((?:const|let|var)?\s*generateStates\s*=\s*\(\s*arr\s*\)\s*=>\s*\{[\s\S]*?\n\})/;
    const arrowMatch = response.match(arrowFunctionRegex);

    if (arrowMatch && arrowMatch[1]) {
      return arrowMatch[1];
    }

    return null;
  } catch (error) {
    console.error("Error extracting function code:", error);
    return null;
  }
}

// Helper function to execute the generated function
function executeGeneratedFunction(functionCode, inputArray) {
  try {
    // Clean up the function code - remove example usage if present
    const cleanedCode = functionCode.replace(/\/\/\s*Example[\s\S]*$/, "");

    // Validate syntax
    validateSyntax(cleanedCode);

    // Wrap the function in a module and execute it
    const fullCode = `
      ${cleanedCode}
      return generateStates([...inputArray]);
    `;

    // Create and execute the function
    const generatedFunction = new Function("inputArray", fullCode);

    // Wrap execution in try-catch to get more helpful errors
    try {
      const states = generatedFunction([...inputArray]); // Pass a copy to avoid mutation

      // Basic validation of returned states
      if (!Array.isArray(states)) {
        throw new Error("Function did not return an array");
      }

      if (states.length === 0) {
        throw new Error("Function returned an empty array");
      }

      return states;
    } catch (executionError) {
      console.error("Function execution error:", executionError);
      throw new Error(`Function execution failed: ${executionError.message}`);
    }
  } catch (error) {
    console.error("Function execution failed:", error);
    // Return a minimal default state instead of throwing
    return [createDefaultState(inputArray, error.message)];
  }
}

// Function to validate JavaScript syntax
function validateSyntax(code) {
  try {
    // Using Function constructor to validate syntax without executing
    new Function(code);
    return true;
  } catch (error) {
    console.error("Syntax validation failed:", error.message);
    throw new Error(`Invalid generated code: ${error.message.split("\n")[0]}`);
  }
}

// Helper function to create a default state
function createDefaultState(array, errorMessage = null) {
  return {
    array: Array.isArray(array) ? [...array] : [1, 2, 3, 4, 5],
    indices: {
      i: null,
      j: null,
      minIndex: null,
      current: null,
    },
    variables: {},
    action: errorMessage ? "error" : "start",
    description: errorMessage
      ? `Error: ${errorMessage}`
      : `Initial array: [${array.join(", ")}]`,
    finalPositions: [],
  };
}

// Helper function to normalize states
function normalizeStates(states, originalArray) {
  if (!Array.isArray(states) || states.length === 0) {
    return [createDefaultState(originalArray)];
  }

  return states.map((state) => {
    // Create a normalized state with all expected fields
    const normalized = {
      array: Array.isArray(state.array) ? [...state.array] : [...originalArray],
      indices: {
        i: null,
        j: null,
        minIndex: null,
        current: null,
        pivotIndex: null,
        compareIndices: null,
        swapIndices: null,
      },
      variables: {},
      action: state.action || "",
      description: state.description || "",
      finalPositions: [],
    };

    // Handle different naming patterns for final positions
    if (state.finalPositions && Array.isArray(state.finalPositions)) {
      normalized.finalPositions = [...state.finalPositions];
    } else if (state.completed && Array.isArray(state.completed)) {
      normalized.finalPositions = [...state.completed];
    }

    // Handle the case where indices might be in variables
    if (state.variables) {
      // Copy all variables
      normalized.variables = { ...state.variables };

      // Move index-related variables to indices
      const indexKeys = ["i", "j", "minIndex", "current", "pivotIndex"];
      indexKeys.forEach((key) => {
        if (state.variables[key] !== undefined) {
          normalized.indices[key] = state.variables[key];
          delete normalized.variables[key]; // Remove from variables
        }
      });
    }

    // Handle the case where indices is already defined
    if (state.indices) {
      // Merge with normalized.indices, preserving our structure
      Object.keys(state.indices).forEach((key) => {
        normalized.indices[key] = state.indices[key];
      });
    }

    // Handle marked elements (for comparisons, etc.)
    if (state.marked && Array.isArray(state.marked)) {
      normalized.indices.compareIndices = [...state.marked];
    }

    return normalized;
  });
}

// Function to generate algorithm states based on code
async function generateAlgorithmStates(code, inputArray) {
  try {
    console.log("Generating algorithm states for array:", inputArray);

    const prompt = `I have a JavaScript algorithm implementation:
${code}
Please create ONLY a state generation function that captures all the important steps in this algorithm for visualization purposes. The function should:
1. Create a snapshot of the array at each significant step
2. Track all variables and indices used in the algorithm (like i, j, key, etc.)
3. Label each step with a clear action (e.g., "compare", "swap", "insert")
4. Include a beginner-friendly description of what's happening at each step
5. Mark elements that are in their final position when applicable

IMPORTANT: Your function MUST follow this EXACT state format for each step:
{
  array: [...], // Copy of the array at this step
  indices: {    // All index variables used in the algorithm
    i: null,    // Main loop index (if applicable)
    j: null,    // Secondary loop index (if applicable)
    minIndex: null, // For selection sort, quicksort pivot index, etc.
    current: null,  // Current element being processed
  },
  variables: {  // Any other algorithm-specific variables
    // Examples: sum, count, key, pivot value, etc.
  },
  action: "",   // One word describing the current action: "compare", "swap", "insert", etc.
  description: "", // A beginner-friendly explanation of this step
  finalPositions: [] // Array of indices that are in their final sorted position
}

Return the function as a complete, executable JavaScript function with this signature:
function generateStates(arr) {
  // Your implementation here that STRICTLY follows the format above
  // Return an array of state objects
}`;

    console.log("Sending request to Google AI API...");

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const generatedCode = response.text();

    console.log("Generated Code Length:", generatedCode.length);

    // Extract the function code
    let functionCode = extractFunctionCode(generatedCode);

    if (!functionCode) {
      console.error("Could not extract function from AI response");
      throw new Error("Failed to extract valid function from API response");
    }

    console.log("Function code extracted, length:", functionCode.length);

    // Execute the function with the input array
    const states = executeGeneratedFunction(functionCode, inputArray);
    console.log(`Generated ${states.length} states`);

    // Post-process states to normalize format
    return normalizeStates(states, inputArray);
  } catch (error) {
    console.error("Failed to generate algorithm states:", error);
    return [createDefaultState(inputArray, error.message)];
  }
}

// Function to analyze algorithm and check for correctness
async function analyzeAlgorithm(code, inputArray, expectedOutput) {
  try {
    const prompt = `
Analyze this algorithm implementation:
${code}
For input array: ${JSON.stringify(inputArray)}
Expected output: ${JSON.stringify(expectedOutput)}
Does this algorithm correctly solve the problem? If not, identify issues and suggest corrections.
`;

    console.log("Sending analysis request to Google AI API...");

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const analysisText = response.text();

    return {
      analysis: analysisText,
      isCorrect: analysisText.toLowerCase().includes("correctly"),
    };
  } catch (error) {
    console.error("Failed to analyze algorithm:", error);
    return {
      analysis: `Error analyzing algorithm: ${error.message}`,
      isCorrect: false,
    };
  }
}

// API endpoint handler
export async function POST(request) {
  try {
    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { action, code, inputArray, expectedOutput } = requestBody;

    // Validate request parameters
    if (!action) {
      return NextResponse.json(
        { error: "Missing 'action' parameter" },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: "Missing 'code' parameter" },
        { status: 400 }
      );
    }

    if (!Array.isArray(inputArray)) {
      return NextResponse.json(
        { error: "Missing or invalid 'inputArray' parameter" },
        { status: 400 }
      );
    }

    console.log(
      `Processing ${action} request for array of length ${inputArray.length}`
    );

    if (action === "generate") {
      try {
        const states = await generateAlgorithmStates(code, inputArray);
        return NextResponse.json({ states });
      } catch (error) {
        console.error("Error in generate action:", error);
        return NextResponse.json(
          {
            error: error.message,
            states: [createDefaultState(inputArray, error.message)],
          },
          { status: 500 }
        );
      }
    } else if (action === "analyze") {
      try {
        const analysis = await analyzeAlgorithm(
          code,
          inputArray,
          expectedOutput
        );
        return NextResponse.json({ analysis });
      } catch (error) {
        console.error("Error in analyze action:", error);
        return NextResponse.json(
          {
            error: error.message,
            analysis: {
              analysis: `Error analyzing algorithm: ${error.message}`,
              isCorrect: false,
            },
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Unhandled API error:", error);
    return NextResponse.json(
      {
        error: `Unhandled error: ${error.message}`,
        states: [],
      },
      { status: 500 }
    );
  }
}
