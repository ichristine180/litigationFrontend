import { useEffect } from "react";

export const useFixedFooter = () => {
  useEffect(() => {
    const footer = document.getElementById("footer");
    footer.style.position = "fixed";
  }, []);
};
export const getPosition = (item) => {
  if (item.role === 1) return "Officer";
  if (item.role === 2) return "Lawyer";
  if (item.role === 3) return "Managing P";
};
