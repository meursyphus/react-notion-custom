import React from "react";
import type { ParagraphArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

interface ParagraphProps {
  props: ParagraphArgs;
  children?: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ props, children }) => {
  const {
    paragraph: { color, rich_text: texts },
  } = props;

  return (
    <div className={`notion-block notion-paragraph ${getColorCss(color)}`}>
      <p className="notion-paragraph-content">
        <RichText props={texts} />
      </p>
      {children}
    </div>
  );
};

export default Paragraph;
