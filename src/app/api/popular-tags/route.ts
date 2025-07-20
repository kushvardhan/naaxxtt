import { NextResponse } from "next/server";
import { getTopPopularTags } from "../../../../lib/actions/tag.action";

export async function GET() {
  try {
    console.log("Fetching popular tags...");
    const popularTags = await getTopPopularTags();
    console.log("Popular tags fetched:", popularTags);

    // Ensure we return a proper JSON response
    return NextResponse.json(popularTags || [], {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching popular tags:", error);
    return NextResponse.json([], {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
