import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { videos } from "@/data/videos";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const video = videos.find((v) => v.id === params.id);

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(video);
}
