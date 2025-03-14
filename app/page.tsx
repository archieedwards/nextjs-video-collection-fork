import type { SearchParams, Video } from "@/types";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { VideosGrid } from "@/components/VideosGrid";

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
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Video Collection</h1>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
      <VideosGrid videos={videos} />
    </section>
  );
}
