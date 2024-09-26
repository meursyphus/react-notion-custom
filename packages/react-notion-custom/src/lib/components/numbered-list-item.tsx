"use client";

import React from "react";
import type { NumberedListItemArgs } from "../types";
import { getColorCss, numberedListItemMarker } from "../utils";
import RichText from "./internal/rich-text";

type NumberedListProps = {
  children?: React.ReactNode;
} & NumberedListItemArgs;

const NumberedListItem: React.FC<NumberedListProps> = ({
  children,
  ...props
}) => {
  const {
    numbered_list_item: { rich_text: texts, color },
  } = props;
  const { marker, format } = numberedListItemMarker.getMarker(props);

  return (
    <ol
      data-notion-marker-format={format}
      className={`notion-block notion-list-numbered ${getColorCss(color)}`}
    >
      <li className="notion-display-contents">
        <div className="notion-list-numbered-content">
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
    </ol>
  );
};

export default NumberedListItem;
