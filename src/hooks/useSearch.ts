import { merge } from "lodash-es";
import { useCallback, useState } from "react";

export interface PatchFn<T> {
  (partialParams: Partial<T>): void;
}

export interface SearchFn<T> {
  (params: T): void;
}

export default function useSearch<T>(initSearch?: T) {
  const [params, setParams] = useState<T | undefined>(initSearch);
  const search = useCallback<SearchFn<T>>((newParams: T) => {
    setParams(newParams);
  }, []);
  const patch = useCallback<PatchFn<T>>((partialParams) => {
    setParams((old) => {
      const merged = merge({}, old, partialParams);
      return merged;
    });
  }, []);

  return { params, search, patch };
}
