import React from "react";
import { TodoArgs } from "../types";
import RichText from "./internal/rich-text";
import { getColorCss } from "../utils";

type TodoProps = {
  children?: React.ReactNode;
} & TodoArgs;

const Todo: React.FC<TodoProps> = ({ children, ...props }) => {
  const {
    to_do: { color, rich_text: texts, checked },
  } = props;

  return (
    <div className={`notion-block notion-to-do ${getColorCss(color)}`}>
      <div
        aria-checked={checked}
        className={`notion-to-do-content ${checked ? "notion-to-do-checked" : ""}`}
      >
        <div className="notion-to-do-checkbox">
          <input type="checkbox" checked={checked} readOnly />
        </div>
        <p className="notion-to-do-text">
          <RichText props={texts} />
        </p>
      </div>
      {children}
    </div>
  );
};

export default Todo;
