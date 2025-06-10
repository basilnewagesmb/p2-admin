"use client";

import { Pagination } from "@heroui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationClientProps {
  totalPages: number;
  currentPage: number;
}

export function PaginationClient({ totalPages, currentPage }: PaginationClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onPageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString()); // update page param
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Pagination
      total={totalPages}
      initialPage={currentPage}
      color="primary"
      onChange={onPageChange}
    />
  );
}
