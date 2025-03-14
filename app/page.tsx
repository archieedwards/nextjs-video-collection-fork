import type { SearchParams, Video } from "@/types";

import { VideosGrid } from "@/components/VideosGrid";
import { VideoSearch } from "@/components/VideoSearch";
import { VideoSort } from "@/components/VideoSort";
import { VideoDateFilter } from "@/components/VideoDateFilter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const url = new URL(
    "/api/videos",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  );

  if (params.searchTerm) {
    url.searchParams.set("searchTerm", params.searchTerm);
  }
  if (params.sort) {
    url.searchParams.set("sort", params.sort);
  }
  if (params.direction) {
    url.searchParams.set("direction", params.direction);
  }
  if (params.since) {
    url.searchParams.set("since", params.since);
  }
  if (params.before) {
    url.searchParams.set("before", params.before);
  }

  const res = await fetch(url);
  const videos: Video[] = await res.json();

  return (
    <section className="flex flex-col items-center justify-center gap-10 py-4 md:py-10">
      <div className="w-full flex flex-col gap-4">
        <VideoSearch />
        <div className="flex gap-4 items-center justify-end">
          <VideoDateFilter />
          <VideoSort />
        </div>
      </div>
      <VideosGrid videos={videos} />
    </section>
  );
}
