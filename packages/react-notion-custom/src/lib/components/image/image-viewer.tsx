import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ImageViewerTools from "./image-viewer-tools";
import {
  useCursorVisibility,
  useImageDownload,
  useImageNavigation,
  useImageScale,
} from "./hooks/image-viewer";

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
    scaleInputFocused,
    setScaleInputFocused,
    handleScaleInputBlur,
    handleScaleInputFocus,
    handleScaleInputChange,
    scale,
    scaleOriginX,
    scaleOriginY,
    handleZoomInOut,
    scaleUp,
    scaleDown,
  } = useImageScale();

  const { cursorVisible, handleMoveMouse } = useCursorVisibility();
  const { handleDownload } = useImageDownload(urls[currentImageIndex]);

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyDownEvents: { [key: string]: () => void } = {
        Escape: () => setIsOpened(false),
        "+": scaleUp,
        "-": scaleDown,
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
  }, [isOpened, scaleUp, scaleDown, toNextImage, toPreviousImage]);

  const handleImageClick = useCallback(
    (clickedUrl: string) => {
      const index = urls.findIndex((imgUrl) => imgUrl === clickedUrl); // 클릭한 URL의 인덱스 찾기
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
            className={`notion-image-viewer-container ${cursorVisible ? "" : "notion-hide-cursor"}`}
            aria-modal="true"
            onMouseMove={handleMoveMouse}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            tabIndex={-1}
          >
            <button
              onClick={() => setIsOpened(false)}
              className="notion-image-viewer-overlay"
            />
            <motion.img
              key={urls[currentImageIndex]}
              ref={imageRef}
              className={`notion-image-viewer-container-image ${cursorVisible ? "" : "notion-hide-cursor"}`}
              src={urls[currentImageIndex]}
              alt="posting image"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: `${scaleOriginX * 100}% ${scaleOriginY * 100}%`,
                cursor:
                  scale === 1
                    ? "zoom-in"
                    : scale > 1
                      ? "zoom-out"
                      : scale < 1
                        ? "zoom-in"
                        : "zoom-out",
              }}
              onClick={handleZoomInOut}
            />

            <ImageViewerTools
              scale={scale}
              scaleUp={scaleUp}
              setIsOpened={setIsOpened}
              scaleDown={scaleDown}
              scaleInputFocused={scaleInputFocused}
              setScaleInputFocused={setScaleInputFocused}
              onScaleInputBlur={handleScaleInputBlur}
              onScaleInputChange={handleScaleInputChange}
              onScaleInputFocus={handleScaleInputFocus}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              toPreviousImage={toPreviousImage}
              toNextImage={toNextImage}
              onDownload={handleDownload}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageViewer;
