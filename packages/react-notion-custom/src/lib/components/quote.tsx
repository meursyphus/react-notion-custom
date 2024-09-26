import type { QuoteArgs } from "..";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type QuoteProps = {
  children: React.ReactNode;
} & QuoteArgs;

const Quote: React.FC<QuoteProps> = ({ children, ...props }) => {
  const {
    quote: { color, rich_text: texts },
  } = props;

  return (
    <div className={`notion-block notion-quote ${getColorCss(color)}`}>
      <div className="notion-quote-content">
        <p>
          <RichText props={texts} />
        </p>
        <slot />
      </div>
    </div>
  );
};

export default Quote;
