import { isEqual, merge } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { PaginationParams } from "../features/shared/types/pagination";
import { URLSerializer } from "../features/shared/types/serializer";
import usePagination from "./usePagination";
import useURLParams from "./useURLParams";

export default function useQuerySerializer<Q extends PaginationParams>(
  defaultSearch: Q,
  serializer: URLSerializer<Partial<Q>>
) {
  const { pagination, changePagination } = usePagination();
  const [URLParams, setURLParams] = useURLParams(serializer);
  const [queryParams, setQueryParams] = useState<Q>({ ...defaultSearch, ...URLParams });
  const search = useCallback((query: Q) => {
    setQueryParams((old) => {
      // NOTE: pagination could be undefined when mounted
      const merged = merge(query, { page: old.page, page_size: old.page_size });
      if (isEqual(query, old)) return old;
      return { ...merged, page: 1 };
    });
  }, []);

  useEffect(() => {
    setURLParams(queryParams);
  }, [queryParams, setURLParams]);

  useEffect(() => {
    setQueryParams((old) => ({
      ...old,
      ...pagination,
    }));
  }, [pagination]);

  return { queryParams, search, changePagination };
}
