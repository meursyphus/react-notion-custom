"use client";

import React, { useState, useCallback } from "react";
import type { ToggleArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type ToggleProps = {
  children?: React.ReactNode;
} & ToggleArgs;

const Toggle: React.FC<ToggleProps> = ({
  customElement,
  children,
  ...props
}) => {
  const {
    toggle: { color, rich_text: texts },
  } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  let buttonElement: React.ReactNode = customElement;

  if (!customElement) {
    buttonElement = <DefaultToggleIcon />;
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
            {buttonElement}
          </div>
        </button>
        <p>
          <RichText props={texts} />
        </p>
      </div>

      {children}
    </div>
  );
};

const DefaultToggleIcon: React.FC = () => {
  return <div className="notion-toggle-button-arrow" />;
};

export default Toggle;
