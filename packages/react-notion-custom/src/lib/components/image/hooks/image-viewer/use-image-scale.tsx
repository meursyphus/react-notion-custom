import { useState, useRef, useCallback, useEffect } from "react";

import { scaleRound } from "../../lib";

export const useImageScale = () => {
  const [scale, setScale] = useState<number>(1);
  const [displayScale, setDisplayScale] = useState<number>(100);

  const [scaleOriginX, setScaleOriginX] = useState(0.5);
  const [scaleOriginY, setScaleOriginY] = useState(0.5);

  const [isScaleFocus, setIsScaleFocus] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const scaleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isScaleFocus) {
      imageRef.current?.focus();
      scaleInputRef.current?.select();
    }
  }, [isScaleFocus]);

  const handleScaleFocus = useCallback(() => {
    setIsScaleFocus(true);
  }, []);

  const handleScaleBlur = useCallback(() => {
    const displayScaleValue = scaleRound(scaleRound(displayScale));
    setIsScaleFocus(false);
    setScale(displayScaleValue / 100);
    setDisplayScale(displayScaleValue);
  }, [displayScale]);

  const handleScaleEnter = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        const displayScaleValue = scaleRound(scaleRound(displayScale));
        setIsScaleFocus(false);
        const newScale = displayScaleValue / 100;
        setScale(newScale);
        setDisplayScale(displayScaleValue);
      }
    },
    [displayScale],
  );

  const handleScaleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setDisplayScale(+value);

      if (!isScaleFocus) {
        const newScale = Math.max(50, Math.min(200, +displayScale)) / 100;
        setScale(newScale);
      }
    },
    [displayScale, isScaleFocus],
  );

  const handleZoomInOut = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (!imageRef.current) {
        return;
      }

      if (scale === 0.5) {
        setScale(1);
        setDisplayScale(100);
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
      setDisplayScale(newScale * 100);

      setScaleOriginX(currentMouseX);
      setScaleOriginY(currentMouseY);

      imageRef.current.style.transition = "transform 0.3s ease";
    },
    [scale],
  );

  const handleScaleUp = useCallback(() => {
    setScale((previousScale) => Math.min(previousScale + 0.5, 2));
    setDisplayScale((previousDisplayScale) => {
      return Math.min(+previousDisplayScale + 50, 200);
    });
  }, []);

  const handleScaleDown = useCallback(() => {
    setScale((previousScale) => Math.max(previousScale - 0.5, 0.5));
    setDisplayScale((previousDisplayScale) => {
      return Math.max(+previousDisplayScale - 50, 50);
    });
  }, []);

  return {
    imageRef,
    scaleInputRef,
    isScaleFocus,
    setIsScaleFocus,
    handleScaleBlur,
    handleScaleFocus,
    handleScaleChange,
    handleScaleEnter,
    scale,
    displayScale,
    setScale,
    setDisplayScale,
    scaleOriginX,
    scaleOriginY,
    handleZoomInOut,
    handleScaleUp,
    handleScaleDown,
  };
};
