"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { HeadingsArgs, HeadingConfig } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type HeadingsProps = {
  children?: React.ReactNode;
} & HeadingsArgs;

const Headings: React.FC<HeadingsProps> = ({ children, type, ...props }) => {
  const {
    [type]: { color, rich_text: texts, is_toggleable },
  } = props;

  const [open, setOpen] = useState(false);

  const { headingTag: HeadingTag, headingClassName } =
    useMemo<HeadingConfig>(() => {
      switch (type) {
        case "heading_2":
          return { headingTag: "h2", headingClassName: "notion-h2" };
        case "heading_3":
          return { headingTag: "h3", headingClassName: "notion-h3" };
        default:
          return { headingTag: "h1", headingClassName: "notion-h1" };
      }
    }, [type]);

  // Generate id to make it convenient to write TableOfContents
  const id = useMemo(
    () => texts.map(({ plain_text }) => plain_text).join(""),
    [texts],
  );

  const toggleOpen = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  return (
    <div
      id={id}
      className={`notion-block notion-toggle ${headingClassName} ${getColorCss(color)} ${open ? "notion-toggle-open" : ""}`}
    >
      {is_toggleable ? (
        <>
          <div className="notion-toggle-content">
            <button
              onClick={toggleOpen}
              className="notion-toggle-button"
              aria-expanded={open}
            >
              <div
                className={`notion-toggle-button-arrow ${open ? "notion-toggle-button-arrow-opened" : ""}`}
              />
            </button>
            <HeadingTag
              className={`notion-h-content ${headingClassName}-content`}
            >
              <RichText props={texts} />
            </HeadingTag>
          </div>
          {children}
        </>
      ) : (
        <HeadingTag className={`notion-h-content ${headingClassName}-content`}>
          <RichText props={texts} />
        </HeadingTag>
      )}
    </div>
  );
};

export default Headings;
