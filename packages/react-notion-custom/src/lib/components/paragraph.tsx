import React from "react";
import type { ParagraphArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type ParagraphProps = {
  children?: React.ReactNode;
} & ParagraphArgs;

const Paragraph: React.FC<ParagraphProps> = ({ children, ...props }) => {
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
