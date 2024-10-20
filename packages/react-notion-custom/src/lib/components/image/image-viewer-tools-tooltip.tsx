import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ImageViewerToolsToolTipProps = {
  content: string;
  children: React.ReactNode;
  className?: string;
  hint: string;
  disabled?: boolean;
};

const ImageViewerToolsToolTip: React.FC<ImageViewerToolsToolTipProps> = ({
  children,
  className,
  content,
  hint,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="notion-image-viewer-tooltip-container"
    >
      {children}
      {!disabled && (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className={`notion-image-viewer-tooltip ${className}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: -5 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p>{content}</p>

              <p>{hint}</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ImageViewerToolsToolTip;
