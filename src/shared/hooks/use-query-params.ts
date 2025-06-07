import { useLocation } from "react-router-dom";

export function useQueryParams<T extends Record<string, string>>() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const params = Object.fromEntries(searchParams.entries()) as T;

  return params;
}
