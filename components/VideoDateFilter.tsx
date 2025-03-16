"use client";

import { DatePicker } from "@heroui/date-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseDate, type CalendarDate } from "@internationalized/date";
import { useState, useEffect } from "react";

import { dateRangeSchema } from "@/helpers/validation";

export function VideoDateFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [hasError, setHasError] = useState(false);

  const validateAndUpdateDates = (
    since: string | null,
    before: string | null,
  ) => {
    const result = dateRangeSchema.safeParse({
      since: since || undefined,
      before: before || undefined,
    });

    setHasError(!result.success);

    return result.success;
  };

  const handleFromDateChange = (date: CalendarDate | null) => {
    const params = new URLSearchParams(searchParams);
    const before = params.get("before");

    if (date) {
      const dateStr = date.toString();

      if (validateAndUpdateDates(dateStr, before)) {
        params.set("since", dateStr);
      }
    } else {
      params.delete("since");
      validateAndUpdateDates(null, before);
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleToDateChange = (date: CalendarDate | null) => {
    const params = new URLSearchParams(searchParams);
    const since = params.get("since");

    if (date) {
      const dateStr = date.toString();

      if (validateAndUpdateDates(since, dateStr)) {
        params.set("before", dateStr);
      }
    } else {
      params.delete("before");
      validateAndUpdateDates(since, null);
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  const since = searchParams.get("since");
  const before = searchParams.get("before");

  useEffect(() => {
    validateAndUpdateDates(since, before);
  }, [since, before]);

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
      <DatePicker
        label="From"
        defaultValue={since ? parseDate(since) : undefined}
        variant="flat"
        isInvalid={hasError}
        size="sm"
        onChange={handleFromDateChange}
      />
      <DatePicker
        label="To"
        defaultValue={before ? parseDate(before) : undefined}
        variant="flat"
        isInvalid={hasError}
        size="sm"
        onChange={handleToDateChange}
      />
    </div>
  );
}
