import type { Video } from "@/types";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Badge } from "@heroui/badge";

import { formatDuration, formatViews, formatDate } from "@/helpers/format";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card>
      <CardHeader className="p-0 overflow-hidden aspect-video relative">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/75 text-white text-sm rounded z-10">
          {formatDuration(video.duration)}
        </span>
      </CardHeader>
      <CardBody>
        <h4 className="text-lg font-semibold">{video.title}</h4>
        <p className="text-sm text-gray-500">
          {formatViews(video.views)} <span className="mx-2">•</span>{" "}
          {formatDate(video.created_at)}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {video.tags.map((tag) => (
            <Badge key={tag} color="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
