import { useEffect } from "react";

export const useFixedFooter = () => {
  useEffect(() => {
    const footer = document.getElementById("footer");
    footer.style.position = "fixed";
  }, []);
};
