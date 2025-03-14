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
    replace(`${pathname}?${params.toString()}`);
  };

  const since = searchParams.get("since");
  const before = searchParams.get("before");

  useEffect(() => {
    validateAndUpdateDates(since, before);
  }, [since, before]);

  return (
    <div className="flex gap-2 items-center">
      <DatePicker
        label="From"
        className="w-[140px]"
        defaultValue={since ? parseDate(since) : undefined}
        variant="flat"
        isInvalid={hasError}
        size="sm"
        onChange={handleFromDateChange}
      />
      <DatePicker
        label="To"
        className="w-[140px]"
        defaultValue={before ? parseDate(before) : undefined}
        variant="flat"
        isInvalid={hasError}
        size="sm"
        onChange={handleToDateChange}
      />
    </div>
  );
}
