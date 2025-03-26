-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "views" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "video_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VideoToVideoTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_VideoToVideoTag_A_fkey" FOREIGN KEY ("A") REFERENCES "videos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_VideoToVideoTag_B_fkey" FOREIGN KEY ("B") REFERENCES "video_tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "video_tags_name_key" ON "video_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_VideoToVideoTag_AB_unique" ON "_VideoToVideoTag"("A", "B");

-- CreateIndex
CREATE INDEX "_VideoToVideoTag_B_index" ON "_VideoToVideoTag"("B");
