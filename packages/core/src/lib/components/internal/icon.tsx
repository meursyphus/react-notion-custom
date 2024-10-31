import React from "react";

type IconType = "emoji" | "file" | "external";

interface IconProps {
  icon: {
    type: IconType;
    emoji?: string;
    file?: {
      url: string;
    };
    external?: {
      url: string;
    };
  };
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  switch (icon.type) {
    case "emoji":
      return <span className="notion-emoji">{icon.emoji}</span>;
    case "file":
      return (
        <img
          className="notion-icon notion-icon-file"
          src={icon.file?.url}
          alt="File Icon"
        />
      );
    case "external":
      return (
        <img
          className="notion-icon notion-icon-external"
          src={icon.external?.url}
          alt="External Icon"
        />
      );
    default:
      return null;
  }
};

export default Icon;
