import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { searchParamsSchema } from "@/helpers/validation";
import { sortByCreatedAt, sortByTitle } from "@/helpers/sort";
import { ThumbnailUrl, Video, VideoTag } from "@/types";

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
      { status: 400 }
    );
  }

  const params = result.data;

  try {
    // Get all videos and their tags from the database
    const dbVideos = await prisma.video.findMany({
      include: {
        tags: true,
      },
    });

    // Transform the data to match the expected format
    let filteredVideos: Video[] = dbVideos.map((video) => ({
      ...video,
      thumbnail_url: video.thumbnailUrl as ThumbnailUrl,
      created_at: video.createdAt.toISOString(),
      tags: video.tags.map((tag) => tag.name) as VideoTag[],
    }));

    // Apply the same filtering logic as before
    filteredVideos = filteredVideos.filter(
      (video) =>
        video.created_at >= params.since && video.created_at <= params.before
    );

    if (params.searchTerm) {
      filteredVideos = filteredVideos.filter((video) =>
        video.title.toLowerCase().includes(params.searchTerm!.toLowerCase())
      );
    }

    if (params.tags.length > 0) {
      filteredVideos = filteredVideos.filter((video) =>
        params.tags.every((tag) => video.tags.includes(tag))
      );
    }

    const sortFn = params.sort === "title" ? sortByTitle : sortByCreatedAt;

    filteredVideos.sort((a, b) => sortFn(params.direction)(a as any, b as any));

    const total = filteredVideos.length;
    const start = (Number(params.page) - 1) * Number(params.per_page);
    const end = start + Number(params.per_page);

    return NextResponse.json({
      items: filteredVideos.slice(start, end),
      total,
      page: Number(params.page),
      per_page: Number(params.per_page),
      total_pages: Math.ceil(total / Number(params.per_page)),
    });
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
