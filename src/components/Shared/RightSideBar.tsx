import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";
import RightSideBarClient from "./RightSideBarClient";

const RightSideBar = async () => {
  const hotQuestionsRaw = await getHotQuestions();
  const tagsRaw = await getTopPopularTags();

  const hotQuestions = hotQuestionsRaw.map((q: any) => ({
    slug: `/question/${q._id?.toString() || ""}`,
    question: q.title || "Untitled",
  }));

  const popularTags = tagsRaw.map((tag: any) => ({
    tag: tag.name || tag.tag || "Unknown",
    count: Number(tag.numberOfQuestions || tag.count || 0),
    _id: tag._id?.toString?.() || String(tag._id) || undefined,
  }));

  console.log("from right bar: ", hotQuestions, popularTags);

  return (
    <RightSideBarClient hotQuestions={hotQuestions} popularTags={popularTags} />
  );
};

export default RightSideBar;
