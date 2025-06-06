import { useEffect, useState } from "react";
import { isPlatform } from "@ionic/react";

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

  return { isMobile, isMobilePlatform: isPlatform("mobile") };
}
