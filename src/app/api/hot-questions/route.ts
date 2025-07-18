import { NextResponse } from "next/server";
import { getHotQuestions } from "../../../../lib/actions/question.action";

export async function GET() {
  try {
    const hotQuestions = await getHotQuestions();
    return NextResponse.json(hotQuestions);
  } catch (error) {
    console.error("Error fetching hot questions:", error);
    return NextResponse.json([], { status: 500 });
  }
}
