"use client";

import React, { useState, useCallback } from "react";
import type { ToggleArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type ToggleProps = {
  children?: React.ReactNode;
} & ToggleArgs;

const Toggle: React.FC<ToggleProps> & { Icon: typeof ToggleIcon } = ({
  children,
  ...props
}) => {
  const {
    toggle: { color, rich_text: texts },
  } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  let iconElement: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Toggle.Icon) {
      iconElement = child.props.children;
    } else {
      otherChildren.push(child);
    }
  });

  if (!iconElement) {
    iconElement = <div className="notion-toggle-button-arrow" />;
  }

  return (
    <div
      className={`notion-block notion-toggle  ${getColorCss(color)} ${open ? "notion-toggle-open" : ""}`}
      aria-expanded={open}
    >
      <div className="notion-toggle-content">
        <button onClick={toggleOpen} className={`notion-toggle-button`}>
          <div
            className={`${open ? "notion-toggle-button-opened" : "notion-toggle-button-closed"}`}
          >
            {iconElement}
          </div>
        </button>
        <p>
          <RichText props={texts} />
        </p>
      </div>

      {otherChildren}
    </div>
  );
};

const ToggleIcon: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

Toggle.Icon = ToggleIcon;

export default Toggle;
