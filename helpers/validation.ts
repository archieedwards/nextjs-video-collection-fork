import { z } from "zod";

import { sanitizeInput } from "@/helpers/sanitize";
import { videoTags } from "@/data/videoTags";

const DEFAULT_PARAMS = {
  sort: "created_at",
  direction: "desc",
  since: new Date("1970-01-01"),
  before: new Date(),
  page: "1",
  per_page: "20",
} as const;

const pageSchema = z.string().transform((val) => {
  const input = Number(val);

  if (isNaN(input) || input < 1) {
    throw new Error("Invalid page number");
  }

  return input.toString();
});

const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const dateStringSchema = z
  .string()
  .regex(isoDateRegex, { message: "Invalid date format" })
  .transform((val) => new Date(val))
  .pipe(z.date().transform((d) => d.toISOString().split("T")[0]));

export const validateDateString = (dateStr: string) => {
  const result = dateStringSchema.safeParse(dateStr);

  return result.success;
};

const baseDateRangeSchema = z.object({
  since: z
    .string()
    .regex(isoDateRegex, { message: "Invalid date format" })
    .transform((val) => new Date(val))
    .pipe(
      z
        .date()
        .min(new Date("1970-01-01"), { message: "Invalid start date" })
        .transform((d) => d.toISOString().split("T")[0]),
    )
    .default(DEFAULT_PARAMS.since.toISOString().split("T")[0]),
  before: z
    .string()
    .regex(isoDateRegex, { message: "Invalid date format" })
    .transform((val) => new Date(val))
    .pipe(
      z
        .date()
        .max(new Date(Date.now()), { message: "Invalid end date" })
        .transform((d) => d.toISOString().split("T")[0]),
    )
    .default(DEFAULT_PARAMS.before.toISOString().split("T")[0]),
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

export const searchTermSchema = z
  .string({ message: "Invalid search term" })
  .trim()
  .transform(sanitizeInput)
  .pipe(
    z.string({ message: "Invalid search term" }).max(100, {
      message: "Search term too long",
    }),
  )
  .default("");

const baseSearchParamsSchema = z.object({
  searchTerm: searchTermSchema,
  sort: z
    .enum(["created_at", "title"], {
      message: "Invalid sorting",
    })
    .default(DEFAULT_PARAMS.sort),
  direction: z
    .enum(["asc", "desc"], {
      message: "Invalid sorting",
    })
    .default(DEFAULT_PARAMS.direction),
  tags: z
    .array(z.enum(videoTags), {
      message: "Invalid tags",
    })
    .default(() => []),
  page: pageSchema.default(DEFAULT_PARAMS.page),
  per_page: pageSchema.default(DEFAULT_PARAMS.per_page),
});

export const searchParamsSchema = baseSearchParamsSchema
  .merge(baseDateRangeSchema)
  .refine(dateRangeRefinement.check, {
    message: dateRangeRefinement.message,
    path: dateRangeRefinement.path,
  });
