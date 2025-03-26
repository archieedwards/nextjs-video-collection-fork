import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { ThumbnailUrl, Video, VideoTag } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const video = await prisma.video.findUnique({
      where: { id: params.id },
      include: { tags: true },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Transform to match expected format
    const transformedVideo: Video = {
      ...video,
      thumbnail_url: video.thumbnailUrl as ThumbnailUrl,
      created_at: video.createdAt.toISOString(),
      tags: video.tags.map((tag) => tag.name) as VideoTag[],
    };

    return NextResponse.json(transformedVideo);
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
