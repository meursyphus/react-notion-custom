import React from "react";
import type { BulletedListItemArgs } from "../types";
import { bulletedListItemMarker, getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type BulletedListItemProps = {
  children?: React.ReactNode;
} & BulletedListItemArgs;

const BulletedListItem: React.FC<BulletedListItemProps> = ({
  children,
  ...props
}) => {
  const {
    bulleted_list_item: { rich_text: texts, color },
  } = props;
  const { marker, format } = bulletedListItemMarker.getMarker(props);

  return (
    <ul
      data-notion-marker-format={format}
      className={`notion-block notion-list-bulleted ${getColorCss(color)}`}
    >
      <li className="notion-display-contents">
        <div className="notion-list-bulleted-content">
          <span
            data-notion-marker-format={format}
            className="notion-list-marker"
          >
            {marker}
          </span>
          <p>
            <RichText props={texts} />
          </p>
        </div>
        {children}
      </li>
    </ul>
  );
};

export default BulletedListItem;
