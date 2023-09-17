import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    size: "xl",
  });
  useEffect(() => {
    function handleResize() {
      let size = "xl";
      if (window.innerWidth < 480) {
        size = "sm";
      }
      if (window.innerWidth >= 480 && window.innerWidth < 768) {
        size = "md";
      }
      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        size = "lg";
      }

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        size,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
