import { useEffect, useState } from "react";

export function useDevice() {
  const getIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 768;

  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    function handleResize() {
      setIsMobile(getIsMobile());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
}
