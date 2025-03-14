import type { Video } from "@/types";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";

import { formatDuration, formatViews, formatDate } from "@/helpers/format";

interface VideoCardProps {
  video: Video;
  imageWidth?: number;
  imageHeight?: number;
}

export function VideoCard({
  video,
  imageWidth = 300,
  imageHeight = 200,
}: VideoCardProps) {
  return (
    <Card className="w-[300px] h-full flex flex-col">
      <CardHeader className="p-0 overflow-hidden aspect-[3/2] relative">
        <Image
          removeWrapper
          src={video.thumbnail_url}
          alt={video.title}
          width={imageWidth}
          height={imageHeight}
          radius="none"
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
