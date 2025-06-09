import { useLocation } from "react-router-dom";
import { useRef } from "react";

export function useQueryParams<T extends Record<string, string>>() {
  const location = useLocation();
  const initialParams = useRef<T | null>(null);

  if (initialParams.current === null) {
    const searchParams = new URLSearchParams(location.search);
    initialParams.current = Object.fromEntries(searchParams.entries()) as T;
  }

  return initialParams.current;
}
