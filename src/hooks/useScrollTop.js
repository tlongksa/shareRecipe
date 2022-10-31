/** @format */

import { useEffect } from "react";

const useScrollTop = () => {
  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  });
};

export default useScrollTop;
