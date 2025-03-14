import type { Video } from "@/types";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";

import { formatDuration, formatViews, formatDate } from "@/helpers/format";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="h-full flex flex-col">
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
      <CardBody className="flex-grow flex flex-col gap-3">
        <span className="text-md font-semibold">{video.title}</span>
        <p className="text-sm text-gray-500 mt-auto">
          {formatViews(video.views)} <span className="mx-2">•</span>{" "}
          {formatDate(video.created_at)}
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <Chip key={tag} color="primary" variant="flat" size="sm">
              {tag}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
