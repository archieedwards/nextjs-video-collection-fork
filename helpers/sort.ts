import type { Video } from "@/types";
import type { SortDirection } from "@/types";

export const sortByCreatedAt =
  (direction: SortDirection) => (a: Video, b: Video) => {
    const comparison =
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

    return direction === "asc" ? -comparison : comparison;
  };

export const sortByTitle =
  (direction: SortDirection) => (a: Video, b: Video) => {
    const comparison = a.title.localeCompare(b.title);

    return direction === "asc" ? comparison : -comparison;
  };
