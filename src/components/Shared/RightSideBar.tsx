import RightSideBarClient from "./RightSideBarClient";
import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";

const RightSideBar = async () => {
  const hotQuestionsRaw = await getHotQuestions();
  const tagsRaw = await getTopPopularTags();

  const hotQuestions = (hotQuestionsRaw || []).slice(0, 5).map((q: any) => ({
    slug: `/question/${q._id?.toString() ?? ""}`,
    question: q.title ?? "Untitled",
  }));

  const popularTags = (tagsRaw || []).map((tag: any) => ({
    tag: tag.name ?? tag.tag ?? "Unknown",
    count: tag.numberOfQuestions ?? tag.count ?? 0,
  }));

  return (
    <RightSideBarClient
      hotQuestions={hotQuestions}
      popularTags={popularTags}
    />
  );
};

export default RightSideBar;
