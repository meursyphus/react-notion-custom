import React from "react";
import RichText from "./internal/rich-text";
import { VideoArgs } from "../types";
import { getYoutubeId } from "../utils";

type VideoProps = VideoArgs;
const Video: React.FC<VideoProps> = ({ ...props }) => {
  const {
    video: { type, file, external, caption },
  } = props;

  const renderVideoContent = () => {
    if (type === "file" && file != null) {
      return <video playsInline controls preload="metadata" src={file.url} />;
    } else if (type === "external" && external != null) {
      const youtubeId = getYoutubeId(external.url);
      if (youtubeId) {
        return (
          <iframe
            style={{ width: "100%", aspectRatio: "560 / 315", border: "none" }}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        );
      } else {
        return <div>unsupported embedded video</div>;
      }
    } else {
      return <div>unsupported video</div>;
    }
  };

  return (
    <div className="notion-block notion-video">
      <div className="notion-video-content">{renderVideoContent()}</div>
      {caption.length !== 0 && (
        <div className="notion-asset-caption">
          <RichText props={caption} />
        </div>
      )}
    </div>
  );
};

export default Video;
