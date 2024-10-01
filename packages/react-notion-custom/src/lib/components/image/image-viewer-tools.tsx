import React from "react";

import { motion } from "framer-motion";

import Icon from "./assets";
import Tooltip from "./image-viewer-tools-tooltip";

type ImageViewerToolsProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  toPreviousImage: () => void;
  toNextImage: () => void;
  scale: number;
  scaleUp: () => void;
  scaleDown: () => void;
  scaleInputFocused: boolean;
  setScaleInputFocused: (focused: boolean) => void;
  onScaleInputFocus: () => void;
  onScaleInputBlur: () => void;
  onScaleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
};

const ImageViewerTools: React.FC<ImageViewerToolsProps> = ({
  hasPrevious,
  hasNext,
  setIsOpened,
  toPreviousImage,
  toNextImage,
  scale,
  scaleUp,
  scaleDown,
  scaleInputFocused,
  setScaleInputFocused,
  onScaleInputFocus,
  onScaleInputBlur,
  onScaleInputChange,
  onDownload,
}) => {
  return (
    <motion.nav className="notion-image-viewer-tools">
      <div className="notion-image-viewer-controls">
        <Tooltip content="Previous Image">
          <motion.button
            aria-label="image tools previous button"
            aria-disabled={!hasPrevious}
            disabled={!hasPrevious}
            onClick={toPreviousImage}
          >
            <img src={Icon.ArrowBack} alt="image tools previous button" />
          </motion.button>
        </Tooltip>

        <Tooltip content="Next Image">
          <motion.button
            aria-label="image tools next button"
            aria-disabled={!hasNext}
            disabled={!hasNext}
            onClick={toNextImage}
          >
            <img src={Icon.ArrowForward} alt="image tools next button" />
          </motion.button>
        </Tooltip>
      </div>

      <div className="notion-image-viewer-scaler">
        <Tooltip content="Scale Down">
          <motion.button
            aria-label="image scale down button"
            onClick={scaleDown}
          >
            <img src={Icon.Minus} alt="image scale down button" />
          </motion.button>
        </Tooltip>

        {scaleInputFocused ? (
          <div
            className="notion-image-viewer-scaler-input"
            aria-label="scaler input"
            aria-disabled={scaleInputFocused}
          >
            <input
              type="number"
              defaultValue={Math.round(scale * 100)}
              onBlur={onScaleInputBlur}
              onFocus={onScaleInputFocus}
              onChange={onScaleInputChange}
              autoFocus
            />
            <span>%</span>
          </div>
        ) : (
          <Tooltip content="Set Scale">
            <motion.button
              className="notion-image-viewer-scaler-input-button"
              onClick={() => setScaleInputFocused(true)}
            >
              <span>{Math.round(scale * 100)}%</span>
            </motion.button>
          </Tooltip>
        )}
        <Tooltip content="Scale up">
          <motion.button
            aria-label="image tools scale up button"
            onClick={scaleUp}
          >
            <img src={Icon.Plus} alt="image tools scale up button" />
          </motion.button>
        </Tooltip>
      </div>

      <Tooltip content="Download Image">
        <motion.button
          className="notion-image-viewer-tools-download"
          aria-label="image download button"
          onClick={onDownload}
        >
          <img src={Icon.Download} alt="image download" />
        </motion.button>
      </Tooltip>

      <Tooltip content="Close Viewer">
        <motion.button
          aria-label="image viewer close button"
          className="notion-image-viewer-tools-close"
          onClick={() => setIsOpened(false)}
        >
          <img src={Icon.Close} alt="image viewer close button" />
        </motion.button>
      </Tooltip>
    </motion.nav>
  );
};

export default ImageViewerTools;
