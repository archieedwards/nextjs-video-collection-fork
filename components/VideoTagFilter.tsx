"use client";

import type { Selection } from "@react-types/shared";

import { Select, SelectItem } from "@heroui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { videoTags } from "@/data/videoTags";

export function VideoTagFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleTagsChange = (keys: Selection) => {
    const params = new URLSearchParams(searchParams);
    const selectedTags = Array.from(keys);

    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    } else {
      params.delete("tags");
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  const tags = searchParams.get("tags")?.split(",") || [];

  return (
    <Select
      label="Filter by tags"
      selectionMode="multiple"
      selectedKeys={tags}
      className="w-full sm:w-[200px]"
      variant="flat"
      size="sm"
      onSelectionChange={handleTagsChange}
    >
      {videoTags.map((tag) => (
        <SelectItem key={tag}>{tag}</SelectItem>
      ))}
    </Select>
  );
}
