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
      className="group flex items-center gap-2 rounded-md bg-light-800 dark:bg-dark-300 px-3 py-2 transition-colors duration-200 hover:bg-light-700 dark:hover:bg-dark-400"
    >
      <Badge className="text-[10px] font-medium leading-[13px] rounded-md border-none bg-transparent text-light-400 dark:text-light-500 px-0 py-0">
        #{name}
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
