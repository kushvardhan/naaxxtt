import { getAllTags } from "../../../../lib/actions/tag.action";
import TagsClient from "@/components/Shared/TagsClient";

export interface Tag {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  followers: string[];
  createdOn: string;
}

const TagsPage = async () => {
  const result = await getAllTags();
  console.log('result of getAllTags: ', result);

  return <TagsClient tags={result?.tags || []} />;
};

export default TagsPage;
