import React, { useMemo, useState } from "react";
import type { Heading_2_Args } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

interface Heading2Props {
  props: Heading_2_Args;
  children?: React.ReactNode;
}

const Heading2: React.FC<Heading2Props> = ({ props, children }) => {
  const {
    heading_2: { color, rich_text: texts, is_toggleable },
  } = props;
  const [open, setOpen] = useState(false);

  // Generate id to make it convenient to write TableOfContents
  const id = useMemo(
    () => texts.map(({ plain_text }) => plain_text).join(""),
    [texts],
  );

  const toggleOpen = () => setOpen(!open);

  const className = `${getColorCss(color)} notion-block notion-h2 notion-toggle ${open ? "notion-toggle-open" : ""}`;

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
            <h2 className="notion-h-content notion-h2-content">
              <RichText props={texts} />
            </h2>
          </div>
          {children}
        </>
      ) : (
        <h2 className="notion-h-content notion-h2-content">
          <RichText props={texts} />
        </h2>
      )}
    </div>
  );
};

export default Heading2;
