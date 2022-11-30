import { useCallback, useState } from "react";
import { OptionalPaginationParams } from "../types/pagination";

export interface ChangePaginationFn {
  (page?: number, page_size?: number): void;
}

export default function usePagination(defaultPagination?: OptionalPaginationParams) {
  const [pagination, setPagination] = useState<OptionalPaginationParams | undefined>(defaultPagination);
  const changePagination = useCallback<ChangePaginationFn>((page?: number, page_size?: number) => {
    if (page && page_size)
      setPagination((old) => {
        if (old && old.page_size !== page_size) return { page: 1, page_size };
        return { page, page_size };
      });
    else if (page) setPagination((old) => ({ ...old, page }));
    else if (page_size) setPagination({ page: 1, page_size });
  }, []);

  return { pagination, changePagination };
}
