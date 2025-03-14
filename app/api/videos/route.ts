import type { NextRequest } from "next/server";
import type { SortOption, SortDirection } from "@/types";

import { NextResponse } from "next/server";

import { videos } from "@/data/videos";
import { isValidISODate } from "@/helpers/validation";
import { sortByCreatedAt, sortByTitle } from "@/helpers/sort";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("searchTerm");
    const sort = (searchParams.get("sort") as SortOption) || "created_at";
    const direction =
      (searchParams.get("direction") as SortDirection) || "desc";
    const since = searchParams.get("since") || "1970-01-01";
    const before =
      searchParams.get("before") || new Date().toISOString().split("T")[0];

    if (!isValidISODate(since)) {
      return NextResponse.json(
        { error: "Invalid since date format. Use YYYY-MM-DD or ISO 8601" },
        { status: 400 },
      );
    }

    if (!isValidISODate(before)) {
      return NextResponse.json(
        { error: "Invalid before date format. Use YYYY-MM-DD or ISO 8601" },
        { status: 400 },
      );
    }

    let filteredVideos = [...videos];

    const sinceDate = new Date(
      since.includes("T") ? since : `${since}T00:00:00Z`,
    ).getTime();
    const beforeDate = new Date(
      before.includes("T") ? before : `${before}T23:59:59Z`,
    ).getTime();

    filteredVideos = filteredVideos.filter((video) => {
      const videoDate = new Date(video.created_at).getTime();

      return videoDate >= sinceDate && videoDate <= beforeDate;
    });

    if (searchTerm) {
      filteredVideos = filteredVideos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sort === "created_at") {
      filteredVideos.sort(sortByCreatedAt(direction));
    } else if (sort === "title") {
      filteredVideos.sort(sortByTitle(direction));
    }

    return NextResponse.json(filteredVideos);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to load videos: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 },
    );
  }
}
