"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "@/lib/utils";
import { Input } from "@heroui/input";

interface SearchableHeaderProps {
  name: string; // e.g. "Users"
  labelName?: string;
  onlyLabel?: boolean; // If true, only show the label without the input
}

export function SearchableHeader({
  name,
  labelName,
  onlyLabel = false,
}: SearchableHeaderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchKey, setSearchKey] = useState(() => searchParams.get("q") || "");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchKey(q);
  }, [searchParams]);

  const handleSearch = useCallback(
    debounce((term: string) => {
      const currentParams = new URLSearchParams(window.location.search);

      if (term.trim()) {
        currentParams.set("q", term.trim());
      } else {
        currentParams.delete("q");
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
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            label={labelName || "Search"}
            labelPlacement="inside"
            className="w-full"
            value={searchKey}
            onChange={({ target }) => {
              setSearchKey(target.value);
              handleSearch(target.value);
            }}
            aria-label="Search"
          />
        </div>
      )}
    </div>
  );
}
