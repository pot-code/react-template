import { act, renderHook } from "@testing-library/react";
import { OptionalPaginationParams } from "../types/pagination";
import usePaginatedSearch from "./usePaginatedSearch";

test("empty init params", () => {
  const { result } = renderHook(() => usePaginatedSearch());

  expect(result.current.params).toEqual({});
});

test("init params", () => {
  interface SearchParams {
    name: string;
    value: string;
  }
  const { result } = renderHook(() =>
    usePaginatedSearch<SearchParams>({
      name: "hello",
      value: "world",
    })
  );

  expect(result.current.params).toEqual({
    name: "hello",
    value: "world",
  });
});

test("change pagination", () => {
  interface SearchParams {
    name: string;
    value: string;
  }
  const { result } = renderHook(() =>
    usePaginatedSearch<SearchParams>({
      name: "hello",
      value: "world",
    })
  );

  act(() => {
    result.current.changePagination(1, 2);
  });
  expect(result.current.params).toEqual({
    name: "hello",
    value: "world",
    page: 1,
    page_size: 2,
  });

  act(() => {
    result.current.changePagination(2, 2);
  });
  expect(result.current.params).toEqual({
    name: "hello",
    value: "world",
    page: 2,
    page_size: 2,
  });
});

test("new search should reset pagination", () => {
  interface SearchParams {
    name: string;
    value: string;
  }
  const { result } = renderHook(() =>
    usePaginatedSearch<SearchParams>(
      {
        name: "hello",
        value: "world",
      },
      {
        page: 1,
        page_size: 5,
      }
    )
  );

  act(() => {
    result.current.changePagination(2);
  });
  expect(result.current.pagination).toEqual({
    page: 2,
    page_size: 5,
  });

  act(() => {
    result.current.search({
      name: "hello",
      value: "react",
    });
  });
  expect(result.current.pagination).toEqual({
    page: 1,
    page_size: 5,
  });
});

test("patch should reset pagination", () => {
  interface SearchParams extends OptionalPaginationParams {
    name: string;
    value: string;
  }
  const { result } = renderHook(() =>
    usePaginatedSearch<SearchParams>({
      name: "hello",
      value: "world",
    })
  );

  act(() => {
    result.current.changePagination(2, 5);
  });
  act(() => {
    result.current.patch({
      value: "react",
    });
  });
  expect(result.current.params).toEqual({
    name: "hello",
    value: "react",
    page: 1,
    page_size: 5,
  });
});
