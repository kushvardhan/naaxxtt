import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";
import RightSideBarClient from "./RightSideBarClient";

const RightSideBar = async () => {
  try {
    const hotQuestionsRaw = await getHotQuestions();
    const tagsRaw = await getTopPopularTags();

    // Extra serialization safety - ensure no MongoDB objects leak through
    const safeHotQuestions = JSON.parse(JSON.stringify(hotQuestionsRaw));
    const safeTags = JSON.parse(JSON.stringify(tagsRaw));

    // Map to clean data structure
    const hotQuestions = safeHotQuestions.map((q: any) => ({
      slug: `/question/${q._id}`,
      question: q.title,
    }));

    const popularTags = safeTags.map((tag: any) => ({
      tag: tag.name,
      count: tag.numberOfQuestions,
    }));

    return (
      <RightSideBarClient
        hotQuestions={hotQuestions}
        popularTags={popularTags}
      />
    );
  } catch (error) {
    console.error("RightSideBar error:", error);
    // Return empty data on error
    return <RightSideBarClient hotQuestions={[]} popularTags={[]} />;
  }
};

export default RightSideBar;
