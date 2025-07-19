// /pages/api/popular-tags.ts
import { getTopPopularTags } from "../../../../lib/actions/tag.action";

export default async function handler(req, res) {
  try {
    const tags = await getTopPopularTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error("Popular tags error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// import { getTopPopularTags } from "../../../../lib/actions/tag.action";

// export default async function handler(req, res) {
//   try {
//     const tags = await getTopPopularTags();
//     res.status(200).json(tags);
//   } catch (error) {
//     console.error("Popular tags error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }