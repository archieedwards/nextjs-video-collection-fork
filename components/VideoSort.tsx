"use client";

import type { SortDirection } from "@/types";

import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

export function VideoSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleDirection = () => {
    const params = new URLSearchParams(searchParams);
    const currentDirection = (params.get("direction") ||
      "asc") as SortDirection;

    params.set("direction", currentDirection === "asc" ? "desc" : "asc");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center justify-end">
      <Select
        defaultSelectedKeys={[searchParams.get("sort") || "created_at"]}
        label="Sort by"
        className="w-[200px]"
        size="sm"
        onChange={(value) => handleSortChange(value.target.value)}
      >
        <SelectItem key="created_at">Creation date</SelectItem>
        <SelectItem key="title">Title</SelectItem>
      </Select>
      <Button
        isIconOnly
        variant="flat"
        aria-label="Toggle sort direction"
        size="lg"
        onPress={toggleDirection}
      >
        {(searchParams.get("direction") || "asc") === "asc" ? (
          <ArrowUpNarrowWide />
        ) : (
          <ArrowDownNarrowWide />
        )}
      </Button>
    </div>
  );
}
