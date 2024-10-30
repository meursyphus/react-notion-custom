import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  useCursorVisibility,
  useImageNavigation,
  useImageScale,
} from "./hooks/image-viewer";

import { getCursorStyle } from "./lib";

import ImageViewerTools from "./image-viewer-tools";

type ImageViewerProps = {
  children: React.ReactNode;
  urls: string[];
  url: string;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ImageViewer: React.FC<ImageViewerProps> = ({
  url,
  urls,
  children,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const { toNextImage, toPreviousImage, hasNext, hasPrevious } =
    useImageNavigation(currentImageIndex, setCurrentImageIndex, urls.length);

  const {
    imageRef,
    scaleInputRef,
    isScaleFocus,
    setIsScaleFocus,
    handleScaleBlur,
    handleScaleFocus,
    handleScaleEnter,
    handleScaleChange,
    scale,
    displayScale,
    setScale,
    setDisplayScale,
    scaleOriginX,
    scaleOriginY,
    handleZoomInOut,
    handleScaleUp,
    handleScaleDown,
  } = useImageScale();

  const { isCursorVisible, handleMoveMouse } = useCursorVisibility();

  useEffect(() => {
    if (currentImageIndex || isOpened) {
      setScale(1);
      setDisplayScale(100);
    }
  }, [isOpened, currentImageIndex, setScale, setDisplayScale]);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "visible";
      return;
    }

    imageRef.current?.focus();

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyDownEvents: { [key: string]: () => void } = {
        Escape: () => setIsOpened(false),
        "+": handleScaleUp,
        "=": handleScaleUp,
        "-": handleScaleDown,
        ArrowLeft: toPreviousImage,
        ArrowRight: toNextImage,
      };
      const action = keyDownEvents[e.key];

      if (action) {
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    imageRef,
    isOpened,
    handleScaleUp,
    handleScaleDown,
    toNextImage,
    toPreviousImage,
  ]);

  const handleImageClick = useCallback(
    (clickedUrl: string) => {
      const index = urls.findIndex((imgUrl) => imgUrl === clickedUrl);
      if (index !== -1) {
        setCurrentImageIndex(index);
        setIsOpened(true);
      }
    },
    [urls, setCurrentImageIndex, setIsOpened],
  );

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="notion-viewer-opener"
        onClick={() => handleImageClick(url)}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpened && (
          <motion.div
            role="dialog"
            className={`notion-image-viewer-container`}
            aria-modal="true"
            onMouseMove={handleMoveMouse}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            tabIndex={-1}
          >
            <button
              className="notion-image-viewer-overlay"
              onClick={() => setIsOpened(false)}
            />
            <motion.img
              key={urls[currentImageIndex]}
              ref={imageRef}
              className={`notion-image-viewer-container-image`}
              src={urls[currentImageIndex]}
              alt="posting image"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: `${scaleOriginX * 100}% ${scaleOriginY * 100}%`,
                cursor: isCursorVisible ? getCursorStyle(scale) : "none",
              }}
              onClick={handleZoomInOut}
            />

            {(isCursorVisible || isScaleFocus) && (
              <ImageViewerTools
                url={urls[currentImageIndex]}
                currentImageIndex={currentImageIndex}
                imageLength={urls.length}
                scaleInputRef={scaleInputRef}
                scale={scale}
                displayScale={displayScale}
                setIsOpened={setIsOpened}
                onScaleUp={handleScaleUp}
                onScaleDown={handleScaleDown}
                isScaleFocus={isScaleFocus}
                setIsScaleFocus={setIsScaleFocus}
                onScaleBlur={handleScaleBlur}
                onScaleFocus={handleScaleFocus}
                onScaleEnter={handleScaleEnter}
                onScaleChange={handleScaleChange}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                toPreviousImage={toPreviousImage}
                toNextImage={toNextImage}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageViewer;
