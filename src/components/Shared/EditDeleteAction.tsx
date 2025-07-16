"use client";

import { deleteAnswer } from "../../../lib/actions/answer.action"; 
import { deleteQuestion } from "../../../lib/actions/question.action"; 
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/sonner"; // ✅ adjust this import path as needed

interface Props {
  type: "Question" | "Answer";
  itemId: string;
  questionId?: string; // needed for deleting an Answer
}

const EditDeleteAction = ({ type, itemId, questionId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      if (type === "Question") {
        await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
        toast.success("Question deleted");
        router.push("/");
      } else if (type === "Answer") {
        await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
        toast.success("Answer deleted");
        if (questionId) router.push(`/question/${questionId}`);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image 
          src="/assets/icons/edit.svg"
          title="Edit"
          alt="Edit"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image 
        src="/assets/icons/trash.svg"
        title="Delete"
        alt="Delete"
        width={20}
        height={20}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
