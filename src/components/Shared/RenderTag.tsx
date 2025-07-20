import Link from 'next/link';
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 hover:bg-light-800 dark:hover:bg-dark-300 group"
    >
      <Badge className="text-[10px] font-medium leading-[13px] bg-light-800 dark:bg-dark-300 text-light-400 dark:text-light-500 rounded-md border-none px-4 py-2 uppercase transition-colors duration-200 group-hover:bg-light-700 dark:group-hover:bg-dark-400">
        {name}
      </Badge>

      {showCount && (
        <p className="text-[12px] font-medium leading-[15.6px] text-dark-500 dark:text-light-700 group-hover:text-dark-800 dark:group-hover:text-light-100 transition-colors">
          {totalQuestions}
        </p>
      )}
    </Link>
  );
};

export default RenderTag;
