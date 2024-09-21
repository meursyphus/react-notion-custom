import React from "react";
import type { BulletedListItemArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type BulletedListItemProps = {
  children?: React.ReactNode;
} & BulletedListItemArgs;

const BulletedListItem: React.FC<BulletedListItemProps> = ({
  children,
  ...props
}) => {
  const {
    bulleted_list_item: { color, rich_text: texts },
  } = props;

  return (
    <ul className={`notion-block notion-bulleted-list ${getColorCss(color)}`}>
      <li className="notion-bulleted-list-item">
        <span className="notion-bulleted-list-item-content">
          <RichText props={texts} />
        </span>
        {children}
      </li>
    </ul>
  );
};

export default BulletedListItem;
