import type { VideoTag } from "@/types";

import { notFound } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Clock, Eye, Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";

import { formatDuration, formatViews, formatDate } from "@/helpers/format";

async function getVideo(id: string) {
  const url = new URL(
    `/api/videos/${id}`,
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  );

  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch video");
  }

  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params;
  const video = await getVideo(id);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button
          as={Link}
          href="/"
          color="primary"
          variant="light"
          className="mb-6"
          startContent={<ChevronLeft size={20} />}
        >
          Back to Home
        </Button>
        <Card>
          <CardHeader className="p-0 overflow-hidden aspect-video relative">
            <Image
              removeWrapper
              src={video.thumbnail_url}
              alt={video.title}
              width={1200}
              height={675}
              radius="none"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/75 text-white text-base rounded-lg z-10">
              {formatDuration(video.duration)}
            </span>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 py-6">
            <h1 className="text-3xl font-bold">{video.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Eye size={20} />
                <span>{formatViews(video.views)} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{formatDuration(video.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{formatDate(video.created_at)}</span>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag: VideoTag) => (
                <Chip key={tag} color="primary" variant="flat" size="md">
                  {tag}
                </Chip>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
