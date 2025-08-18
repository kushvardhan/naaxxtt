import { NextRequest, NextResponse } from "next/server";
import Question from "../../../../database/question.model";
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

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name image")
      .lean(); // Use lean() for better performance

    const isNextQuestion = totalQuestions > skipAmount + userQuestions.length;

    // Serialize the data properly
    const serializedQuestions = userQuestions.map((question: any) => ({
      _id: question._id.toString(),
      title: question.title || "",
      explanation: question.explanation || "",
      upvotes: question.upvotes || [],
      downvotes: question.downvotes || [],
      answers: question.answers || [],
      views: question.views || 0,
      createdAt: question.createdAt ? question.createdAt.toISOString() : null,
      tags: question.tags
        ? question.tags.map((tag: any) => ({
            _id: tag._id.toString(),
            name: tag.name || "",
          }))
        : [],
      author: question.author
        ? {
            _id: question.author._id.toString(),
            clerkId: question.author.clerkId || "",
            name: question.author.name || "Unknown User",
            image: question.author.image || "",
          }
        : null,
    }));

    return NextResponse.json({
      totalQuestions,
      questions: serializedQuestions,
      isNextQuestion,
    });
  } catch (error) {
    console.error("Error fetching user questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
