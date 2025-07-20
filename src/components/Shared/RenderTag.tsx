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
      className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-400 dark:border-zinc-500 hover:bg-zinc-200/50 dark:hover:bg-zinc-950 bg-light-800 dark:bg-dark-300 px-2 py-1 transition-all duration-200 hover:bg-light-700 hover:dark:bg-dark-100"
    >
      <Badge className="text-sm font-medium bg-transparent text-light-400 dark:text-light-500 px-0 py-0 border-none">
        #{name}
      </Badge>

      {showCount && (
        <span className="text-sm font-medium rounded-full px-2 py-[2px] bg-dark-300 text-light-900 dark:bg-light-700 dark:text-dark-900 transition-colors duration-200">
          {totalQuestions}
        </span>
      )}
    </Link>
  );
};

export default RenderTag;
