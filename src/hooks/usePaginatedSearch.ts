import { merge } from "lodash-es";
import { useCallback, useMemo } from "react";
import { OptionalPaginationParams } from "../types/pagination";
import usePagination from "./usePagination";
import useSearch, { PatchFn, SearchFn } from "./useSearch";

export default function usePaginatedSearch<T>(initParams?: T, initPagination?: OptionalPaginationParams) {
  const { pagination, changePagination } = usePagination(initPagination);
  const { params, search, patch } = useSearch<T>(initParams);
  const queryParams = useMemo(() => merge({}, pagination, params), [pagination, params]);
  const paginationAwarePatch = useCallback<PatchFn<T>>(
    (partialParams) => {
      patch(partialParams);
      if (pagination) {
        const { page } = pagination;
        if (page) changePagination(1);
      }
    },
    [pagination, patch, changePagination]
  );
  const paginationAwareSearch = useCallback<SearchFn<T>>(
    (newParams) => {
      search(newParams);
      if (pagination) {
        const { page } = pagination;
        if (page) changePagination(1);
      }
    },
    [changePagination, pagination, search]
  );

  return {
    params: queryParams,
    pagination,
    search: paginationAwareSearch,
    patch: paginationAwarePatch,
    changePagination,
  };
}
