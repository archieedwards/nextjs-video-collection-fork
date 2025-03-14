import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { videos } from "@/data/videos";
import { searchParamsSchema } from "@/helpers/validation";
import { sortByCreatedAt, sortByTitle } from "@/helpers/sort";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Get raw values, let Zod handle the validation and defaults
  const rawInput = {
    searchTerm: searchParams.get("searchTerm") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    direction: searchParams.get("direction") ?? undefined,
    since: searchParams.get("since") ?? undefined,
    before: searchParams.get("before") ?? undefined,
    tags: searchParams.get("tags")?.split(",").filter(Boolean) ?? undefined,
  };

  const result = searchParamsSchema.safeParse(rawInput);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid search parameters",
        details: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const params = result.data;
  let filteredVideos = [...videos];

  filteredVideos = filteredVideos.filter(
    (video) =>
      video.created_at >= params.since && video.created_at <= params.before,
  );

  if (params.searchTerm) {
    filteredVideos = filteredVideos.filter((video) =>
      video.title.toLowerCase().includes(params.searchTerm!.toLowerCase()),
    );
  }

  if (params.tags.length > 0) {
    filteredVideos = filteredVideos.filter((video) =>
      params.tags.every((tag) => video.tags.includes(tag)),
    );
  }

  if (params.sort === "created_at") {
    filteredVideos.sort(sortByCreatedAt(params.direction));
  } else if (params.sort === "title") {
    filteredVideos.sort(sortByTitle(params.direction));
  }

  return NextResponse.json(filteredVideos);
}
