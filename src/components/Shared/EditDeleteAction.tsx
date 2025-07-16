"use client";

import { deleteAnswer } from "../../../lib/actions/answer.action"; 
import { deleteQuestion } from "../../../lib/actions/question.action"; 
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`)
  };

  const handleDelete = async () => {
    if(type === 'Question') {
      // Delete question
      await deleteQuestion({ 
        questionId: JSON.parse(itemId), 
        path: pathname 
      })
      console.log("qUESTION Deleted");
    } else if(type === 'Answer') {
      // Delete answer
      await deleteAnswer({ 
        answerId: JSON.parse(itemId), 
        path: pathname 
      })
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'Question' && (
        <Image 
          src="/assets/icons/edit.svg"
          title="Edit"
          alt="Edit"
          width={21}
          height={21}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

        <Image 
          src="/assets/icons/trash.svg"
          title="Delete"
          alt="Delete"
          width={21}
          height={21}
          className="cursor-pointer object-contain "
          onClick={handleDelete}
        />
    </div>
  )
}

export default EditDeleteAction