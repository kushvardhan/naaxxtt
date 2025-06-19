import TagsClient from "@/components/Shared/TagsClient";
import { getAllTags } from "../../../../lib/actions/tag.action";

export interface Tag {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  followers: string[];
  createdOn: string;
}

const TagsPage = async () => {
  try {
    const result = await getAllTags();
    console.log("result of getAllTags: ", result);

    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
        <TagsClient tags={result?.tags || []} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching tags:", error);
    return <TagsClient tags={[]} />;
  }
};

export default TagsPage;
