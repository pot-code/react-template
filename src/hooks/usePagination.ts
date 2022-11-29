import { useCallback, useState } from "react";
import { PaginationParams } from "../features/shared/types/pagination";

export default function usePagination(defaultPagination?: PaginationParams) {
  const [pagination, setPagination] = useState<PaginationParams | undefined>(defaultPagination);
  const changePagination = useCallback((page: number, page_size: number) => {
    setPagination((old) => {
      if (!old) return { page, page_size };
      if (old.page_size !== page_size) return { ...old, page_size, page: 1 };
      return { ...old, page };
    });
  }, []);

  return { pagination, changePagination };
}
