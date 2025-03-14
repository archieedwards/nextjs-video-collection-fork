import type { SearchParams, Video } from "@/types";

import { VideosGrid } from "@/components/VideosGrid";
import { VideoSearch } from "@/components/VideoSearch";

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

  url.searchParams.set("searchTerm", params.searchTerm || "");
  url.searchParams.set("sort", params.sort || "");
  url.searchParams.set("direction", params.direction || "");
  url.searchParams.set("since", params.since || "");
  url.searchParams.set("before", params.before || "");

  const res = await fetch(url);
  const videos: Video[] = await res.json();

  return (
    <section className="flex flex-col items-center justify-center gap-10 py-4 md:py-10">
      <VideoSearch />
      <VideosGrid videos={videos} />
    </section>
  );
}
