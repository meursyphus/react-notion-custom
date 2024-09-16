import React, { useMemo, useState } from "react";
import type { Heading_1_Args } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

interface Heading1Props {
  props: Heading_1_Args;
  children?: React.ReactNode;
}

const Heading1: React.FC<Heading1Props> = ({ props, children }) => {
  const {
    heading_1: { color, rich_text: texts, is_toggleable },
  } = props;
  const [open, setOpen] = useState(false);

  // Generate id to make it convenient to write TableOfContents
  const id = useMemo(
    () => texts.map(({ plain_text }) => plain_text).join(""),
    [texts],
  );

  const toggleOpen = () => setOpen(!open);

  const className = `${getColorCss(color)} notion-block notion-h1 notion-toggle ${open ? "notion-toggle-open" : ""}`;

  return (
    <div id={id} className={className}>
      {is_toggleable ? (
        <>
          <div className="notion-toggle-content">
            <button onClick={toggleOpen} className="notion-toggle-button">
              <div
                className={`notion-toggle-button-arrow ${open ? "notion-toggle-button-arrow-opened" : ""}`}
              />
            </button>
            <h1 className="notion-h-content notion-h1-content">
              <RichText props={texts} />
            </h1>
          </div>
          {children}
        </>
      ) : (
        <h1 className="notion-h-content notion-h1-content">
          <RichText props={texts} />
        </h1>
      )}
    </div>
  );
};

export default Heading1;
