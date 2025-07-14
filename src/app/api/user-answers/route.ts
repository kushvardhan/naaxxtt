import { NextRequest, NextResponse } from "next/server";
import Answer from "../../../../database/answer.model";
import { connectToDatabase } from "../../../../lib/mongoose";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("question", "_id title")
      .populate("author", "_id clerkId name image")
      .lean(); // Use lean() for better performance

    const isNextAnswer = totalAnswers > skipAmount + userAnswers.length;

    // Serialize the data properly
    const serializedAnswers = userAnswers.map((answer: any) => ({
      _id: answer._id.toString(),
      content: answer.content || "",
      upvotes: answer.upvotes || [],
      downvotes: answer.downvotes || [],
      createdAt: answer.createdAt ? answer.createdAt.toISOString() : null,
      question: answer.question
        ? {
            _id: answer.question._id.toString(),
            title: answer.question.title || "Unknown Question",
          }
        : null,
      author: answer.author
        ? {
            _id: answer.author._id.toString(),
            clerkId: answer.author.clerkId || "",
            name: answer.author.name || "Unknown User",
            image: answer.author.image || "",
          }
        : null,
    }));

    return NextResponse.json({
      totalAnswers,
      answers: serializedAnswers,
      isNextAnswer,
    });
  } catch (error) {
    console.error("Error fetching user answers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
