import { NextResponse } from "next/server";

// API endpoint for Groq
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile"; // Current model

export async function generateAlgorithmStates(code, inputArray) {
  try {
    if (!code || !inputArray || !Array.isArray(inputArray)) {
      throw new Error("Invalid input parameters");
    }

    const inputArrayCopy = JSON.parse(JSON.stringify(inputArray));

    const response = await fetch("/api/algorithm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "generate",
        code,
        inputArray: inputArrayCopy,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `API error: ${response.status}`);
      } catch {
        throw new Error(
          `API error (${response.status}): ${errorText.slice(0, 100)}`
        );
      }
    }

    const responseData = await response.json();

    if (!responseData.states || !Array.isArray(responseData.states)) {
      console.warn("API returned invalid states");
      return {
        states: [createDefaultState(inputArrayCopy)],
        generateFunction: (array) => [createDefaultState(array)],
      };
    }

    // Normalize states first
    const normalizedStates = normalizeStates(
      responseData.states,
      inputArrayCopy
    );

    // Create and validate generation function
    let generateFunction;
    try {
      // First, validate the function string
      if (typeof responseData.generateFunction !== "string") {
        throw new Error("Invalid generate function format");
      }

      // Create function with proper context and error handling
      const functionBody = `
        try {
          ${responseData.generateFunction}
        } catch (error) {
          console.error('Generate function execution error:', error);
          return [createDefaultState(array)];
        }
      `;

      generateFunction = new Function(
        "array",
        "createDefaultState",
        functionBody
      );

      // Test the function with the input array
      const testResult = generateFunction(inputArrayCopy, createDefaultState);

      // Validate test result
      if (!Array.isArray(testResult) || testResult.length === 0) {
        throw new Error("Generation function must return an array of states");
      }

      // Create the final wrapped function
      const wrappedFunction = (array) => {
        try {
          const states = generateFunction(array, createDefaultState);
          return normalizeStates(states, array);
        } catch (error) {
          console.error("Generate function runtime error:", error);
          return [createDefaultState(array, error.message)];
        }
      };

      // Final validation
      const finalTest = wrappedFunction(inputArrayCopy);
      if (!Array.isArray(finalTest) || finalTest.length === 0) {
        throw new Error("Wrapped function validation failed");
      }

      generateFunction = wrappedFunction;
    } catch (error) {
      console.error("Generate function creation/validation failed:", error);
      generateFunction = (array) => [
        createDefaultState(array, "Failed to create generation function"),
      ];
    }

    return {
      states: normalizedStates,
      generateFunction,
    };
  } catch (error) {
    console.error("Error generating algorithm states:", error);
    return {
      states: [createDefaultState(inputArrayCopy, error.message)],
      generateFunction: (array) => [createDefaultState(array, error.message)],
    };
  }
}

function createDefaultState(array, errorMessage = null) {
  return {
    array: Array.isArray(array) ? [...array] : [1, 2, 3, 4, 5],
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
    action: errorMessage ? "error" : "initial",
    description: errorMessage
      ? `Error: ${errorMessage}`
      : `Initial array: [${array.join(", ")}]`,
    finalPositions: [],
  };
}

function normalizeStates(states, originalArray) {
  if (!Array.isArray(states) || states.length === 0) {
    return [createDefaultState(originalArray)];
  }

  const normalizedStates = states.map((state) => {
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
      action: state.action || "unknown",
      description: state.description || "Step in progress",
      finalPositions: Array.isArray(state.finalPositions)
        ? [...state.finalPositions]
        : [],
    };

    // Handle indices
    if (state.indices) {
      Object.keys(normalized.indices).forEach((key) => {
        if (state.indices[key] !== undefined) {
          normalized.indices[key] = state.indices[key];
        }
      });
    }

    // Handle variables safely
    if (state.variables && typeof state.variables === "object") {
      normalized.variables = { ...state.variables };
    }

    return normalized;
  });

  // Ensure first state is marked as initial
  if (normalizedStates.length > 0) {
    normalizedStates[0].action = "initial";
    normalizedStates[0].description = `Initial array: [${originalArray.join(", ")}]`;
  }

  return normalizedStates;
}

export async function analyzeAlgorithm(code, inputArray, expectedOutput) {
  try {
    const response = await fetch("/api/algorithm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "analyze",
        code,
        inputArray,
        expectedOutput,
      }),
    });

    // Get response as text first for debugging
    const responseText = await response.text();

    if (!response.ok) {
      console.error("API error response:", responseText);
      throw new Error(`Failed to analyze algorithm: ${response.status}`);
    }

    // Try to parse the JSON response
    try {
      const responseData = JSON.parse(responseText);
      return responseData.analysis;
    } catch (jsonError) {
      console.error("JSON parsing error in analyze:", jsonError);
      throw new Error(`Failed to parse API response: ${jsonError.message}`);
    }
  } catch (error) {
    console.error("Error analyzing algorithm:", error);
    return {
      analysis: `Error analyzing algorithm: ${error.message}`,
      isCorrect: false,
    };
  }
}

export async function getAlgorithmComplexity(code) {
  try {
    const prompt = `
      Analyze this algorithm and provide its complexities:
      ${code}

      Return the analysis in this exact JSON format without any additional text or markdown:
      {
        "timeComplexity": {
          "best": "O(n log n)",
          "average": "O(n log n)",
          "worst": "O(n²)"
        },
        "spaceComplexity": "O(n)",
        "explanation": "Brief explanation of why these complexities occur"
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
        temperature: 0.1, // Lower temperature for more consistent analysis
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Clean and parse the response
    const cleanContent = data.choices[0].message.content
      .replace(/```json\n?|\n?```/g, "")
      .trim();

    const result = JSON.parse(cleanContent);

    // Validate the response format
    if (!result.timeComplexity || !result.spaceComplexity) {
      throw new Error("Invalid complexity analysis format");
    }

    return result;
  } catch (error) {
    console.error("Error analyzing complexity:", error);
    return {
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      explanation: "Default complexity analysis for comparison-based sorting",
    };
  }
}
