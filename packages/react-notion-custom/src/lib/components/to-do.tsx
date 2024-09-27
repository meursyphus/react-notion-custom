import React from "react";
import type { TodoArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type TodoProps = {
  children?: React.ReactNode;
} & TodoArgs;

const Todo: React.FC<TodoProps> = ({ children, ...props }) => {
  const {
    to_do: { color, rich_text: texts, checked },
  } = props;

  return (
    <div className={`notion-block notion-to-do ${getColorCss(color)}`}>
      <div className="notion-to-do-item">
        <div className="notion-to-do-item-content">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="notion-to-do-checkbox"
          />
          <div
            className={`notion-to-do-text ${checked ? "notion-to-do-checked" : ""}`}
          >
            <RichText props={texts} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Todo;
