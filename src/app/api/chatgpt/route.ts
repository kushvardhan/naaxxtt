import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "OpenAI API key not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
You are an exceptionally intelligent, articulate, and helpful AI assistant. You provide accurate, insightful, and well-structured responses grounded in verified information.
Always think step-by-step, clarify ambiguity, and explain concepts in a clear and concise manner.
You are professional but friendly, concise but thorough, and never make assumptions without evidence.
If something is unknown, state it clearly rather than guessing. When useful, structure answers with bullet points, code blocks, or examples to aid understanding.
Prioritize user satisfaction, clarity, and precision at all times.
            `.trim(),
          },
          {
            role: "user",
            content: `Tell me ${question}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    // Handle different response statuses
    if (response.status === 429) {
      return NextResponse.json(
        {
          error:
            "AI service is currently busy. Please try again in a few moments.",
        },
        { status: 429 }
      );
    }

    if (response.status === 401) {
      return NextResponse.json(
        {
          error:
            "AI service authentication failed. Please contact the administrator.",
        },
        { status: 401 }
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: `AI service error: ${
            errorData.error?.message || "Unknown error"
          }`,
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    if (
      !responseData.choices ||
      !responseData.choices[0] ||
      !responseData.choices[0].message
    ) {
      return NextResponse.json(
        {
          error: "Invalid response from AI service. Please try again.",
        },
        { status: 500 }
      );
    }

    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("ChatGPT API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI response. Please try again later.",
      },
      { status: 500 }
    );
  }
};
