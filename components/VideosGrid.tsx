import type { Video } from "@/types";

import { VideoCard } from "./VideoCard";

interface VideosGridProps {
  videos?: Video[];
}

export function VideosGrid({ videos = [] }: VideosGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
