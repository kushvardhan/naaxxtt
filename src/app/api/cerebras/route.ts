import { NextResponse } from "next/server";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import { connectToDatabase } from "../../../../lib/mongoose";

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY!,
});

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();
    const { question } = await request.json();
    console.log("Question to AI: ",question);
    if (!question?.trim()) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const completion = await cerebras.chat.completions.create({
      model: "gpt-oss-120b", // Cerebras model
      messages: [
        { role: "system", 
          content: `You are a knowledgeable and helpful expert answering questions on a Q&A website. 
                    Always provide clear, accurate, and detailed explanations. 
                    Adapt your answer to the topic: if it's technical, include code examples and step-by-step reasoning; 
                    if it's non-technical, provide structured explanations, relevant examples, and practical insights. 
                  Your goal is to give the most useful and easy-to-understand answer to the user’s question.` },
        { role: "user", content: question },
      ],
      max_completion_tokens: 1000,
    });
    console.log("completion of answer: ",completion);
    const reply = completion.choices[0]?.message?.content || "No response";
    console.log("Reply: ", reply);
     return new NextResponse(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error: any) {
    console.error("🔥 Cerebras API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response." },
      { status: 500 }
    );
  }
};
