import Image from "next/image";

interface QuestionCardProps {
  question: {
    _id: string;
    title: string;
    tags: { _id: string; name: string }[];
    user: { name: string; image: string };
    upvotes: number;
    answers: number;
    views: number;
    createdAt: string;
  };
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="p-4 border rounded-md shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{question.title}</h2>

      <div className="mt-2 flex gap-2 flex-wrap">
        {question.tags.map((tag) => (
          <span
            key={tag._id}
            className="bg-gray-200 px-2 py-0.5 text-xs rounded-md"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="mt-3 flex justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Image
            src={
              question.user.image ||
              "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
            }
            alt={question.user.name}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
          />
          <span>{question.user.name}</span>
        </div>

        <div className="flex gap-4 text-xs">
          <span>👍 {question.upvotes}</span>
          <span>💬 {question.answers}</span>
          <span>👁️ {question.views}</span>
        </div>
      </div>
    </div>
  );
}
