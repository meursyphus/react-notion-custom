import { useState, useRef, useCallback } from "react";

export const useImageScale = () => {
  const [scaleInputFocused, setScaleInputFocused] = useState(false);

  const [scale, setScale] = useState<number>(1);
  const [scaleOriginX, setScaleOriginX] = useState(0.5);
  const [scaleOriginY, setScaleOriginY] = useState(0.5);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleScaleInputFocus = useCallback(() => {
    setScaleInputFocused(true);
  }, []);

  const handleScaleInputBlur = useCallback(() => {
    setScaleInputFocused(false);
  }, []);

  const handleScaleInputChange = useCallback(() => {}, []);

  const handleZoomInOut = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (!imageRef.current) {
        return;
      }

      if (scale === 0.5) {
        setScale(1);
        setScaleOriginX(0.5);
        setScaleOriginY(0.5);
        return;
      }

      const { width, height, top, left } =
        imageRef.current.getBoundingClientRect();

      const currentMouseX = (event.clientX - left) / width;
      const currentMouseY = (event.clientY - top) / height;

      const newScale = scale === 1 ? 1.5 : 1;
      setScale(newScale);

      setScaleOriginX(currentMouseX);
      setScaleOriginY(currentMouseY);

      imageRef.current.style.transition = "transform 0.3s ease";
    },
    [scale],
  );

  const scaleUp = useCallback(() => {
    setScale((previousScale) => Math.min(previousScale + 0.5, 2));
  }, []);

  const scaleDown = useCallback(() => {
    setScale((previousScale) => Math.max(previousScale - 0.5, 0.5));
  }, []);

  return {
    imageRef,
    scaleInputFocused,
    setScaleInputFocused,
    handleScaleInputBlur,
    handleScaleInputFocus,
    handleScaleInputChange,
    scale,
    setScale,
    scaleOriginX,
    scaleOriginY,
    handleZoomInOut,
    scaleUp,
    scaleDown,
  };
};
