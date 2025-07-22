import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();

    const { question } = await request.json();
    console.log("🔍 Received question:", question);

    if (!question || question.trim() === "") {
      console.log("❗ Missing or empty question");
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    console.log("🔑 API Key Loaded:", process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
      console.log("❗ OPENAI_API_KEY is not configured");
      return NextResponse.json(
        {
          error:
            "OpenAI API key not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    console.log("📡 Sending request to OpenAI API...");

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: "You are a helpful assistant that provides clear and useful answers.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const rawText = await openAIResponse.text();
    console.log("📨 Raw OpenAI Response:", rawText);

    let responseData;
    try {
      responseData = JSON.parse(rawText);
      console.log("✅ Parsed OpenAI Response JSON:", responseData);
    } catch (parseError) {
      console.error("❌ Failed to parse OpenAI JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON returned from OpenAI." },
        { status: 500 }
      );
    }

    if (!openAIResponse.ok) {
      console.error("❌ OpenAI returned error status:", openAIResponse.status);
      return NextResponse.json(
        {
          error: responseData?.error?.message || "Unknown error from OpenAI.",
        },
        { status: openAIResponse.status }
      );
    }

    if (
      !responseData.choices ||
      !responseData.choices[0] ||
      !responseData.choices[0].message?.content
    ) {
      console.error("❌ OpenAI response missing expected structure.");
      return NextResponse.json(
        {
          error: "Invalid response from AI service. Please try again.",
        },
        { status: 500 }
      );
    }

    const reply = responseData.choices[0].message.content;
    console.log("✅ Final AI Reply:", reply);

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("🔥 ChatGPT API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI response. Please try again later.",
      },
      { status: 500 }
    );
  }
};
