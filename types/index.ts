import { SVGProps } from "react";

import { videoTags } from "@/data/videoTags";
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SortOption = "created_at" | "title";
export type SortDirection = "asc" | "desc";

export type VideoTag = (typeof videoTags)[number];
export type ThumbnailUrl =
  `https://picsum.photos/seed/video${number}/${number}/${number}`;
export type Video = {
  id: string;
  title: string;
  thumbnail_url: ThumbnailUrl;
  created_at: string;
  duration: number;
  views: number;
  tags: VideoTag[];
};

export type SearchParams = {
  searchTerm?: string;
  sort?: SortOption;
  direction?: SortDirection;
  since?: string;
  before?: string;
  tags?: VideoTag[];
  page?: number;
  per_page?: number;
};
