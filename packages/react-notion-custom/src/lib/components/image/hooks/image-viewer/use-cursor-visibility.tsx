import { useState, useRef, useCallback } from "react";

export const useCursorVisibility = (isScaleFocus: boolean) => {
  const [isCursorVisible, setIsisCursorVisible] = useState(true);
  const cursorTimeOutRef = useRef<NodeJS.Timeout>();

  const handleMoveMouse = useCallback(() => {
    setIsisCursorVisible(true);

    clearTimeout(cursorTimeOutRef.current);

    if (cursorTimeOutRef.current) {
      clearTimeout(cursorTimeOutRef.current);
    }

    if (!isScaleFocus) {
      cursorTimeOutRef.current = setTimeout(() => {
        setIsisCursorVisible(false);
      }, 2000);
    }
  }, [isScaleFocus]);

  return {
    isCursorVisible,
    handleMoveMouse,
  };
};
