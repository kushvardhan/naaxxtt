"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formUrlQuery } from "../../../lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: {
    name: string,
    value: string,
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get('filter');

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
        <div className="line-clamp-1 flex-1 text-left">
          <SelectValue placeholder="Select a Filter" />
        </div>
        </SelectTrigger>
        <SelectContent className="text-black dark:text-white text-regular border-none bg-zinc-100 dark:bg-zinc-950">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value} className="cursor-pointer focus:bg-zinc-300 dark:focus:bg-zinc-800">
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filter