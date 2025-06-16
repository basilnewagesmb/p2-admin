"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "@/lib/utils";
import { Input } from "@heroui/input";

interface DateRangePickerProps {
  name: string; // e.g. "Reports"
  labelName?: string;
  onlyLabel?: boolean; // If true, only show the label without the date inputs
  startDateLabel?: string;
  endDateLabel?: string;
}

export function DateRangePicker({
  name,
  labelName,
  onlyLabel = false,
  startDateLabel = "Start Date",
  endDateLabel = "End Date",
}: DateRangePickerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [startDate, setStartDate] = useState(
    () => searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(
    () => searchParams.get("endDate") || ""
  );

  useEffect(() => {
    const start = searchParams.get("startDate") || "";
    const end = searchParams.get("endDate") || "";
    setStartDate(start);
    setEndDate(end);
  }, [searchParams]);

  const handleDateChange = useCallback(
    debounce((startDate: string, endDate: string) => {
      const currentParams = new URLSearchParams(window.location.search);

      if (startDate.trim()) {
        currentParams.set("startDate", startDate.trim());
      } else {
        currentParams.delete("startDate");
      }

      if (endDate.trim()) {
        currentParams.set("endDate", endDate.trim());
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

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    handleDateChange(value, endDate);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    handleDateChange(startDate, value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
      <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
      {!onlyLabel && (
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-2/3 lg:w-1/2">
          <div className="flex-1">
            <Input
              type="date"
              label={startDateLabel}
              labelPlacement="inside"
              className="w-full"
              value={startDate}
              onChange={({ target }) => handleStartDateChange(target.value)}
              aria-label={startDateLabel}
            />
          </div>
          <div className="flex-1">
            <Input
              type="date"
              label={endDateLabel}
              labelPlacement="inside"
              className="w-full"
              value={endDate}
              onChange={({ target }) => handleEndDateChange(target.value)}
              aria-label={endDateLabel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
