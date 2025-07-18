import RightSideBarClient from "./RightSideBarClient";
import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";

const RightSideBar = async () => {
  const hotQuestionsRaw = await getHotQuestions();
  const tagsRaw = await getTopPopularTags();

  // Convert hotQuestions to plain objects
  const hotQuestions = (hotQuestionsRaw || []).slice(0, 5).map((q: any) => ({
    slug: `/question/${q._id?.toString() ?? ""}`,
    question: q.title ?? "Untitled",
  }));

  // Convert tags to plain objects
  const popularTags = (tagsRaw || []).map((tag: any) => ({
    tag: tag.name ?? tag.tag ?? "Unknown",
    count: Number(tag.numberOfQuestions ?? tag.count ?? 0),
  }));

  console.log(hotQuestions, popularTags);

  return (
    <h1>HWJOEJ</h1>
    
  );
};

export default RightSideBar;
