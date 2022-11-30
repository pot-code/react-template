import { act, renderHook } from "@testing-library/react-hooks";
import useSearch from "./useSearch";

test("empty init params", () => {
  const { result } = renderHook(() => useSearch());

  expect(result.current.params).toBeUndefined();
});

test("init params", () => {
  interface SearchParams {
    name: string;
    value: string;
  }

  const { result } = renderHook(() =>
    useSearch<SearchParams>({
      name: "foo",
      value: "bar",
    })
  );

  expect(result.current.params).toEqual({
    name: "foo",
    value: "bar",
  });
});

test("search with init params", () => {
  interface SearchParams {
    name: string;
    value: string;
  }

  const { result } = renderHook(() =>
    useSearch<SearchParams>({
      name: "foo",
      value: "bar",
    })
  );

  act(() => {
    result.current.search({
      name: "hello",
      value: "world",
    });
  });
  expect(result.current.params).toEqual({
    name: "hello",
    value: "world",
  });
});

test("patch search params", () => {
  interface SearchParams {
    name: string;
    value: string;
  }
  const { result } = renderHook(() => useSearch<SearchParams>());

  act(() => {
    result.current.search({
      name: "hello",
      value: "world",
    });
  });
  act(() => {
    result.current.patch({
      name: "what",
    });
  });
  expect(result.current.params).toEqual({
    name: "what",
    value: "world",
  });
});
