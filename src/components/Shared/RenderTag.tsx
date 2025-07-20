import Link from 'next/link'
import React from 'react'
import { Badge } from "@/components/ui/badge"

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="text-[10px] font-medium leading-[13px] bg-light-800 dark:bg-dark-300 text-light-400 dark:text-light-500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {showCount && (
        <p className="text-[12px] font-medium leading-[15.6px] text-dark-500 dark:text-light-700">
          {totalQuestions}
        </p>
      )}
    </Link>
  );
};

export default RenderTag;
