import React, { useMemo, useState } from "react";
import type { Heading_3_Args } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

interface Heading3Props {
  props: Heading_3_Args;
  children?: React.ReactNode;
}

const Heading3: React.FC<Heading3Props> = ({ props, children }) => {
  const {
    heading_3: { color, rich_text: texts, is_toggleable },
  } = props;
  const [open, setOpen] = useState(false);

  // Generate id to make it convenient to write TableOfContents
  const id = useMemo(
    () => texts.map(({ plain_text }) => plain_text).join(""),
    [texts],
  );

  const toggleOpen = () => setOpen(!open);

  const className = `${getColorCss(color)} notion-block notion-h3 notion-toggle ${open ? "notion-toggle-open" : ""}`;

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
            <h3 className="notion-h-content notion-h3-content">
              <RichText props={texts} />
            </h3>
          </div>
          {children}
        </>
      ) : (
        <h3 className="notion-h-content notion-h3-content">
          <RichText props={texts} />
        </h3>
      )}
    </div>
  );
};

export default Heading3;
