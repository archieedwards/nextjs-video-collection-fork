"use client";

import { Pagination } from "@heroui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface VideoPaginationProps {
  page: number;
  total_pages: number;
}

export function VideoPagination({ page, total_pages }: VideoPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  if (total_pages <= 1) return null;

  return (
    <div className="flex justify-center w-full">
      <Pagination
        showControls
        page={page}
        total={total_pages}
        variant="bordered"
        size="lg"
        onChange={handlePageChange}
      />
    </div>
  );
}
