import { NextResponse } from "next/server";
import { getHotQuestions } from "../../../../lib/actions/question.action";

export async function GET() {
  try {
    console.log("Fetching hot questions...");
    const hotQuestions = await getHotQuestions();
    console.log("Hot questions fetched:", hotQuestions);

    // Ensure we return a proper JSON response
    return NextResponse.json(hotQuestions || [], {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching hot questions:", error);
    return NextResponse.json([], {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
