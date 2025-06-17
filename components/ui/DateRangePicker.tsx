"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "@/lib/utils";
import { DateRangePicker } from "@heroui/date-picker";
import { parseDate, CalendarDate } from "@internationalized/date";

interface DateRangePickerProps {
  name: string; // e.g. "Reports"
  labelName?: string;
  onlyLabel?: boolean; // If true, only show the label without the date inputs
  startDateLabel?: string;
  endDateLabel?: string;
}

export function DateRangePickerComponent({
  name,
  labelName,
  onlyLabel = false,
  startDateLabel = "Start Date",
  endDateLabel = "End Date",
}: DateRangePickerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [startDate, setStartDate] = useState<CalendarDate | undefined>(() => {
    const date = searchParams.get("startDate");
    return date ? parseDate(date) : undefined;
  });
  const [endDate, setEndDate] = useState<CalendarDate | undefined>(() => {
    const date = searchParams.get("endDate");
    return date ? parseDate(date) : undefined;
  });

  useEffect(() => {
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    setStartDate(start ? parseDate(start) : undefined);
    setEndDate(end ? parseDate(end) : undefined);
  }, [searchParams]);

  const handleDateChange = useCallback(
    debounce((value: { start: CalendarDate; end: CalendarDate } | null) => {
      const currentParams = new URLSearchParams(window.location.search);

      if (value?.start) {
        currentParams.set("startDate", value.start.toString());
      } else {
        currentParams.delete("startDate");
      }

      if (value?.end) {
        currentParams.set("endDate", value.end.toString());
      } else {
        currentParams.delete("endDate");
      }

      currentParams.set("page", "1");

      router.replace(
        `${window.location.pathname}?${currentParams.toString()}`,
        {
          scroll: false,
        }
      );
    }, 500),
    [router]
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
      <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
      {!onlyLabel && (
        <div className="w-full max-w-xs">
          <DateRangePicker
            value={startDate && endDate ? { start: startDate, end: endDate } : undefined}
            onChange={handleDateChange}
            label={startDateLabel}
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
