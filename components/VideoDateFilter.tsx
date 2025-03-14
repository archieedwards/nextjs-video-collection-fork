"use client";

import { DatePicker } from "@heroui/date-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseDate, type CalendarDate } from "@internationalized/date";

export function VideoDateFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFromDateChange = (date: CalendarDate | null) => {
    const params = new URLSearchParams(searchParams);

    if (date) {
      params.set("since", date.toString());
    } else {
      params.delete("since");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleToDateChange = (date: CalendarDate | null) => {
    const params = new URLSearchParams(searchParams);

    if (date) {
      params.set("before", date.toString());
    } else {
      params.delete("before");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const since = searchParams.get("since");
  const before = searchParams.get("before");

  return (
    <div className="flex gap-2 items-center">
      <DatePicker
        label="From"
        className="w-[140px]"
        defaultValue={since ? parseDate(since) : undefined}
        variant="flat"
        size="sm"
        onChange={handleFromDateChange}
      />
      <DatePicker
        label="To"
        className="w-[140px]"
        defaultValue={before ? parseDate(before) : undefined}
        variant="flat"
        size="sm"
        onChange={handleToDateChange}
      />
    </div>
  );
}
