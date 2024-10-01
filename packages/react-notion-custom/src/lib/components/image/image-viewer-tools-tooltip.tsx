import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ImageViewerToolsToolTipProps = {
  content: string;
  children: React.ReactNode;
  className?: string;
};

const ImageViewerToolsToolTip: React.FC<ImageViewerToolsToolTipProps> = ({
  content,
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="notion-image-viewer-tooltip-container"
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.p
            className={`notion-image-viewer-tooltip ${className}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -5 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {content}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageViewerToolsToolTip;
