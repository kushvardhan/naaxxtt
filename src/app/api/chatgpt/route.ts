import { NextResponse } from "next/server";

const callOpenAIWithRetry = async (payload: any, retries = 3, delay = 1000): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (response.status !== 429) {
      return response;
    }

    console.warn(`⚠️ OpenAI Rate Limited (429). Retrying in ${delay}ms... [Attempt ${i + 1}/${retries}]`);
    await new Promise(res => setTimeout(res, delay));
    delay *= 2; // exponential backoff
  }

  throw new Error("Too many requests. Please try again later.");
};

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are an exceptionally intelligent, articulate, and helpful AI assistant. You provide accurate, insightful, and well-structured responses grounded in verified information. 
Always think step-by-step, clarify ambiguity, and explain concepts in a clear and concise manner.
You are professional but friendly, concise but thorough, and never make assumptions without evidence. 
If something is unknown, state it clearly rather than guessing. When useful, structure answers with bullet points, code blocks, or examples to aid understanding.
Prioritize user satisfaction, clarity, and precision at all times.
          `.trim()
        },
        {
          role: 'user',
          content: `Tell me ${question}`
        }
      ]
    };

    const response = await callOpenAIWithRetry(payload);
    const responseData = await response.json();

    const reply = responseData.choices?.[0]?.message?.content || "Sorry, no answer generated.";
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
