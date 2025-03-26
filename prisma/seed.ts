import { PrismaClient } from "@prisma/client";

import { videos } from "../data/videos";

const prisma = new PrismaClient();

async function main() {
  console.log("Creating videos with tags...");
  for (const video of videos) {
    await prisma.video.upsert({
      where: { id: video.id },
      update: {},
      create: {
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnail_url,
        createdAt: new Date(video.created_at),
        duration: video.duration,
        views: video.views,
        tags: {
          connectOrCreate: video.tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
