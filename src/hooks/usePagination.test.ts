import { act, renderHook } from "@testing-library/react-hooks";
import usePagination from "./usePagination";

test("empty data", () => {
  const { result } = renderHook(() => usePagination());

  expect(result.current.pagination).toBeUndefined();
});

test("init data", () => {
  const { result } = renderHook(() =>
    usePagination({
      page: 1,
      page_size: 10,
    })
  );

  expect(result.current.pagination).toEqual({
    page: 1,
    page_size: 10,
  });
});

test("change pagination", () => {
  const { result } = renderHook(() =>
    usePagination({
      page: 1,
      page_size: 10,
    })
  );

  act(() => {
    result.current.changePagination(undefined, 2);
  });
  expect(result.current.pagination).toEqual({
    page: 1,
    page_size: 2,
  });

  act(() => {
    result.current.changePagination(2);
  });
  expect(result.current.pagination).toEqual({
    page: 2,
    page_size: 2,
  });

  act(() => {
    result.current.changePagination(2, 10);
  });
  expect(result.current.pagination).toEqual({
    page: 1,
    page_size: 10,
  });
});
