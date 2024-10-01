import { useState, useRef, useCallback } from "react";

export const useCursorVisibility = () => {
  const [isCursorVisible, setIsisCursorVisible] = useState(true);
  const cursorTimeOutRef = useRef<NodeJS.Timeout>();

  const handleMoveMouse = useCallback(() => {
    setIsisCursorVisible(true);

    clearTimeout(cursorTimeOutRef.current);

    if (cursorTimeOutRef.current) {
      clearTimeout(cursorTimeOutRef.current);
    }

    cursorTimeOutRef.current = setTimeout(() => {
      setIsisCursorVisible(false);
    }, 2000);
  }, []);

  return {
    isCursorVisible,
    handleMoveMouse,
  };
};
