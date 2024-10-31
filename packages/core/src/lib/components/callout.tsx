"use client";

import React from "react";
import type { CalloutArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";
import Icon from "./internal/icon";

type CalloutProps = {
  children?: React.ReactNode;
} & CalloutArgs;

const Callout: React.FC<CalloutProps> = ({ children, ...props }) => {
  const { callout } = props;

  return (
    <div
      className={`notion-block notion-callout ${getColorCss(callout.color)}`}
    >
      <div className="notion-callout-content">
        <div className="notion-callout-icon" aria-hidden="true">
          <Icon icon={callout.icon} />
        </div>
        <div className="notion-callout-text">
          <RichText props={callout.rich_text} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Callout;
