import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";
import RightSideBarClient from "./RightSideBarClient";

const RightSideBar = async () => {
  try {
    const hotQuestionsRaw = await getHotQuestions();
    const tagsRaw = await getTopPopularTags();
    // console.log("hotQuestionsRaw: ", hotQuestionsRaw);
    // console.log("tagsRaw: ", tagsRaw);

    // Extra serialization safety - ensure no MongoDB objects leak through
    const safeHotQuestions = JSON.parse(JSON.stringify(hotQuestionsRaw));
    const safeTags = JSON.parse(JSON.stringify(tagsRaw));

    console.log("safeHotQuestions: ", safeHotQuestions);
    console.log("safeTags: ", safeTags);

    // Map to clean data structure
    const hotQuestions = safeHotQuestions.map((q: any) => ({
      slug: `/question/${q._id}`,
      question: q.title,
    }));

    const popularTags = safeTags.map((tag: any) => ({
      tag: tag.name,
      count: tag.numberOfQuestions,
    }));

    // console.log("hotQuestions: ", hotQuestions);
    // console.log("popularTags: ", popularTags);

    return (
      <RightSideBarClient
        hotQuestions={safeHotQuestions}
        popularTags={safeTags}
      />
    );
  } catch (error) {
    console.error("RightSideBar error:", error);
    // Return empty data on error
    return <RightSideBarClient hotQuestions={[]} popularTags={[]} />;
  }
};

export default RightSideBar;
