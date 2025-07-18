import { NextResponse } from "next/server";
import { getTopPopularTags } from "../../../../lib/actions/tag.action";

export async function GET() {
  try {
    const popularTags = await getTopPopularTags();
    return NextResponse.json(popularTags);
  } catch (error) {
    console.error("Error fetching popular tags:", error);
    return NextResponse.json([], { status: 500 });
  }
}
