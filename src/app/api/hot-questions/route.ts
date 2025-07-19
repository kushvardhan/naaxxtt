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


// import { getHotQuestions } from "../../../../lib/actions/question.action";

// export default async function handler(req, res) {
//   try {
//     const questions = await getHotQuestions();
//     res.status(200).json(questions);
//   } catch (error) {
//     console.error("Hot questions error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
