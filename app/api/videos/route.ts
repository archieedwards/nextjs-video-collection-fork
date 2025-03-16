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
    page: searchParams.get("page") ?? undefined,
    per_page: searchParams.get("per_page") ?? undefined,
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

  const total = filteredVideos.length;
  const page = Number(params.page);
  const per_page = Number(params.per_page);
  const start = (page - 1) * per_page;
  const end = start + per_page;

  return NextResponse.json({
    items: filteredVideos.slice(start, end),
    total,
    page,
    per_page,
    total_pages: Math.ceil(total / per_page),
  });
}
