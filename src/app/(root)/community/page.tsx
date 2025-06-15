import { getAllUser } from "../../../../lib/actions/user.action";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import { Button } from "@/components/Shared/button";
import { ThemeContext } from "../../../../context/ThemeContext";
import {useState,useContext} from 'react';

const page = async () => {
  const result = await getAllUser();
  console.log('result of getAllUser: ',result);

  type Tag = {
    _id: string;
    name: string;
  };

  type Author = {
    name: string;
    image: string;
  };

  type Question = {
    _id: string;
    title: string;
    tags: Tag[];
    user: Author;
    upvotes: number;
    answers: number;
    views: number;
    createdAt: string;
  };

  type Props = {
    mappedQuestions: Question[];
  };

  const Tags = [
    { tag: "New User" },
    { tag: "Old User" },
    { tag: "Top Contributors" },
  ];

  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className="w-full h-[calc(100vh-130px)] mt-[130px] overflow-y-scroll scrollbar-hidden ">
        <div
          className={`flex w-full mt-2 justify-between items-center scrollbar-hidden py-3 px-2 gap-4 ${
            isDark ? "bg-black" : "bg-white"
          }`}
        >
          <h1
            className={`text-2xl lg:text-4xl font-bold font-mono tracking-wide ${
              isDark ? "text-zinc-100" : "text-black"
            }`}
          >
            <span className="tracking-wider">Communityy</span> Page
          </h1>
        </div>

        {/* Search + Dropdown for tags */}
        <div
          className={`mt-7 flex gap-4 flex-wrap items-center  ${
            isDark ? "bg-black" : "bg-white"
          }`}
        >
          {/* Search Bar */}
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            placeholder="Search for amazing minds"
            otherClasses="flex-1 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Dropdown for sm/md screens */}
          <div className="block ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="font-mono px-3 py-2 text-sm flex items-center gap-3">
                  Select Filters
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className={`w-48 rounded-md py-1 px-2 max-h-56 overflow-y-auto ${
                  isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
                }`}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div
                  className="flex flex-col gap-1"
                  style={{
                    overflowY: "scroll",
                    scrollbarWidth: "none", 
                    msOverflowStyle: "none",
                  }}
                >
                  {Tags.map((item, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      checked={selectedTags.includes(item.tag)}
                      onCheckedChange={() => toggleTag(item.tag)}
                      className={`font-mono text-sm border-b last:border-none ${
                        isDark
                          ? "border-zinc-700 hover:bg-zinc-900"
                          : "border-gray-200 hover:bg-gray-300"
                      }`}
                      style={{}}
                    >
                      {item.tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <section className="mt-10 flex flex-wrap gap-3">
          {result?.users?.length > 0 ? (
            result?.users?.map((user) => <div key={user.name}>{user.name}</div>)
          ) : (
            <div>User not found</div>
          )}
        </section>
      </div>
    </>
  );
};

export default page;
