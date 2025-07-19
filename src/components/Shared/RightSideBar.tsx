"use server";

import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";
import RightSideBarClient from "@/components/Shared/RightSideBarClient";


const RightSideBar = async () => {
  try {
    const hotQuestionsRaw = await getHotQuestions();
    const tagsRaw = await getTopPopularTags();

    const hotQuestions = hotQuestionsRaw.map((q: any) => ({
      slug: `/question/${q._id}`,
      question: q.title,
    }));

    const popularTags = tagsRaw.map((tag: any) => ({
      tag: tag.name,
      count: tag.numberOfQuestions,
    }));

    console.log("hotQuestions: ", hotQuestions);
    console.log("popularTags: ", popularTags);

    return (
      <RightSideBarClient
        hotQuestions={hotQuestions}
        popularTags={popularTags}
      />
    );
  } catch (error) {
    console.error("RightSideBar error:", error);
    return <RightSideBarClient hotQuestions={[]} popularTags={[]} />;
  }
};

export default RightSideBar;
