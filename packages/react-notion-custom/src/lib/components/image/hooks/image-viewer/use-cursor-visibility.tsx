import { useState, useRef, useEffect, useCallback } from "react";

export const useCursorVisibility = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const cursorTimeOutRef = useRef<NodeJS.Timeout>();

  const handleMoveMouse = useCallback(() => {
    setCursorVisible(true);

    clearTimeout(cursorTimeOutRef.current);

    if (cursorTimeOutRef.current) {
      clearTimeout(cursorTimeOutRef.current);
    }

    cursorTimeOutRef.current = setTimeout(() => {
      setCursorVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return {
    cursorVisible,
    handleMoveMouse,
  };
};
