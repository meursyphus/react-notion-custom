"use client";

import React, { useState, useCallback } from "react";
import type { ToggleArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type ToggleProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onChangeOpen?: (open: boolean) => void;
} & ToggleArgs;

const Toggle: React.FC<ToggleProps> & { Icon: typeof ToggleIcon } = ({
  children,
  onChangeOpen,
  ...props
}) => {
  const {
    toggle: { color, rich_text: texts },
  } = props;

  const [open, setOpen] = useState(false);

  let iconElement: React.ReactNode = <DefaultToggleIcon open={open} />;
  const otherChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Toggle.Icon) {
      iconElement = child.props.children;
    } else {
      otherChildren.push(child);
    }
  });

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => {
      if (onChangeOpen) {
        onChangeOpen(!prevOpen);
      }

      return !prevOpen;
    });
  }, [setOpen, onChangeOpen]);

  return (
    <div
      className={`notion-block notion-toggle  ${getColorCss(color)} ${open ? "notion-toggle-open" : ""}`}
      aria-expanded={open}
    >
      <div className="notion-toggle-content">
          <button onClick={toggleOpen} className="notion-toggle-button">
          {iconElement}
        </button>
        <p>
          <RichText props={texts} />
        </p>
      </div>

      {otherChildren}
    </div>
  );
};

type DefaultToggleIconProps = {
  open: boolean;
};

const DefaultToggleIcon = ({ open }: DefaultToggleIconProps) => {
  return (
          <div
            className={`notion-toggle-button-arrow-box ${open ? "notion-toggle-button-arrow-box-opened" : ""}`}
          >
            <div className="notion-toggle-button-arrow"/>
          </div>
  );
};

const ToggleIcon: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

Toggle.Icon = ToggleIcon;

export default Toggle;
