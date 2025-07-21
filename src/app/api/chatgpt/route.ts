import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  console.log(question);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
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
          }, {
            role: 'user',
            content: `Tell me ${question}`
          }
        ]
      })
    })
    console.log("resp 4U94H: ",response);
    const responseData = await response.json();
    const reply = responseData.choices[0].message.content;
    console.log("responseData4U94H: ",responseData);
    console.log("reply4U94H: ",reply);

    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}