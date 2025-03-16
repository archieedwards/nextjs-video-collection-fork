import { z } from "zod";

import { videoTags } from "@/data/videoTags";

const DEFAULT_PARAMS = {
  sort: "created_at",
  direction: "desc",
  since: "1970-01-01",
  before: new Date().toISOString(),
  page: "1",
  per_page: "20",
} as const;

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}/, "Invalid date format");

const pageSchema = z.string().regex(/^\d+$/, "Invalid page number");

const baseDateRangeSchema = z.object({
  since: dateStringSchema.default(DEFAULT_PARAMS.since),
  before: dateStringSchema.default(DEFAULT_PARAMS.before),
});

const dateRangeRefinement = {
  message: "Invalid date range",
  path: ["since", "before"] as [string, string],
  check: (data: { since: string; before: string }) => data.since <= data.before,
} as const;

export const dateRangeSchema = baseDateRangeSchema.refine(
  dateRangeRefinement.check,
  {
    message: dateRangeRefinement.message,
    path: dateRangeRefinement.path,
  },
);

const baseSearchParamsSchema = z.object({
  searchTerm: z.string().optional(),
  sort: z.enum(["created_at", "title"]).default(DEFAULT_PARAMS.sort),
  direction: z.enum(["asc", "desc"]).default(DEFAULT_PARAMS.direction),
  tags: z.array(z.enum(videoTags)).default(() => []),
  page: pageSchema.default(DEFAULT_PARAMS.page),
  per_page: pageSchema.default(DEFAULT_PARAMS.per_page),
});

export const searchParamsSchema = baseSearchParamsSchema
  .merge(baseDateRangeSchema)
  .refine(dateRangeRefinement.check, {
    message: dateRangeRefinement.message,
    path: dateRangeRefinement.path,
  });

export type ValidatedSearchParams = z.infer<typeof searchParamsSchema>;
