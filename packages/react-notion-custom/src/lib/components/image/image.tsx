import React, { useState, useEffect } from "react";
import type { ContextedBlock, ImageArgs } from "../../types";
import RichText from "../internal/rich-text";
import ImageViewer from "./image-viewer";
import { getImgUrlOrNull } from "./lib/get-image-url-or-null";

type ImageProps = {
  children: React.ReactNode;
} & ImageArgs;

const Image: React.FC<ImageProps> = ({ children, ...props }) => {
  const {
    image: { caption, type },
  } = props;

  const url = getImgUrlOrNull(props);
  const [urls, setUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!url) {
      return;
    }

    let startBlock: ContextedBlock = props;

    while (startBlock.context.parent !== null) {
      startBlock = startBlock.context.parent!;
    }
    while (startBlock.context.previous !== null) {
      startBlock = startBlock.context.previous!;
    }
    const extract = (block: ContextedBlock) => {
      const imgUrl = getImgUrlOrNull(block);
      if (imgUrl && !urls.includes(imgUrl)) {
        setUrls((prevUrls) => [...prevUrls, imgUrl]);
      }
      block.blocks.forEach(extract);
      if (block.context.after) extract(block.context.after);
    };

    extract(startBlock);
  }, [url, urls, props]);

  return (
    <>
      <figure className="notion-block notion-image">
        <div className="notion-image-content">
          {url ? (
            <ImageViewer
              url={url}
              urls={urls}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            >
              <img src={url} alt="posting image" />
            </ImageViewer>
          ) : (
            <p>unsupported type: {type}</p>
          )}
        </div>

        {caption.length !== 0 && (
          <figcaption className="notion-asset-caption">
            <RichText props={caption} />
          </figcaption>
        )}
      </figure>
      {children}
    </>
  );
};

export default Image;
