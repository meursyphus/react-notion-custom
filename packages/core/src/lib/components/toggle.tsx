"use client";

import React, { useState, useCallback } from "react";
import type { ToggleArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type ToggleProps = {
  children?: React.ReactNode;
} & ToggleArgs;

const Toggle: React.FC<ToggleProps> & { Button: typeof ToggleButton } = ({
  children,
  ...props
}) => {
  const {
    toggle: { color, rich_text: texts },
  } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  console.log("props.blocks", props.blocks);

  let buttonElement: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  console.log("children", children);
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Toggle.Button) {
      buttonElement = child.props.children;
    } else {
      otherChildren.push(child);
      console.log("child", child);
    }
  });

  if (!buttonElement) {
    buttonElement = <DefaultButton open={open} />;
  }

  return (
    <div
      className={`notion-block notion-toggle  ${getColorCss(color)} ${open ? "notion-toggle-open" : ""}`}
      aria-expanded={open}
    >
      <div className="notion-toggle-content">
        <button onClick={toggleOpen} className="notion-toggle-button">
          {buttonElement}
        </button>
        <p>
          <RichText props={texts} />
        </p>
      </div>

      {otherChildren}
    </div>
  );
};

type DefaultButtonProps = {
  open: boolean;
};

const DefaultButton: React.FC<DefaultButtonProps> = ({ open }) => {
  return (
    <div
      className={`notion-toggle-button-arrow ${open ? "notion-toggle-button-arrow-opened" : ""}`}
    />
  );
};

const ToggleButton: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

Toggle.Button = ToggleButton;

export default Toggle;
