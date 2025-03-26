import type { SearchParams } from "@/types";

import { Button } from "@heroui/button";
import Link from "next/link";

import { VideosGrid } from "@/components/VideosGrid";
import { VideoSearch } from "@/components/VideoSearch";
import { VideoSort } from "@/components/VideoSort";
import { VideoDateFilter } from "@/components/VideoDateFilter";
import { VideoTagFilter } from "@/components/VideoTagFilter";
import { ErrorMessage } from "@/components/ErrorMessage";
import { VideoPagination } from "@/components/VideoPagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const url = new URL(
    "/api/videos",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
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
  if (typeof params.tags === "string") {
    url.searchParams.set("tags", params.tags);
  }
  if (params.page) {
    url.searchParams.set("page", params.page.toString());
  }
  if (params.per_page) {
    url.searchParams.set("per_page", params.per_page.toString());
  }

  const res = await fetch(url);
  const data = await res.json();

  const hasError = !res.ok;
  const errorStatus = hasError ? res.status : null;
  const errorMessage = hasError
    ? data.details?.[0]?.message + ` (${errorStatus})` ||
      data.error ||
      "Unknown error"
    : null;

  return (
    <section className="flex flex-col items-center justify-center gap-10 py-4 md:py-10">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <VideoSearch />
          <Button as={Link} href="/create" color="primary">
            Create video
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center sm:justify-end">
          <VideoTagFilter />
          <VideoDateFilter />
          <VideoSort />
        </div>
      </div>
      {hasError ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          <VideosGrid videos={data.items} />
          <VideoPagination
            page={Number(data.page)}
            total_pages={Number(data.total_pages)}
          />
        </>
      )}
    </section>
  );
}
