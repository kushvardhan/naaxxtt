import RightSideBarClient from "./RightSideBarClient";
import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";

const RightSideBar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();

  const cleanTags = (popularTags || []).map((tag: any) => ({
    tag: tag.name ?? tag.tag ?? "Unknown",
    count: tag.numberOfQuestions ?? tag.count ?? 0,
  }));

  return (
    <RightSideBarClient
      hotQuestions={hotQuestions || []}
      popularTags={cleanTags}
    />
  );
};

export default RightSideBar;
