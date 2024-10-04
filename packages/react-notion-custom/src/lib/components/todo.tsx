import React from "react";
import { TodoArgs } from "../types";
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
      <div
        aria-checked={checked}
        className={`notion-to-do-content ${checked ? "notion-to-do-checked" : ""}`}
      >
        <div className="notion-to-do-checkbox">
          <CheckBox checked={checked} />
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

interface CheckBoxProps {
  checked: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked }) => {
  return (
    <div
      className={`notion-property-checkbox ${
        checked
          ? "notion-property-checkbox-checked"
          : "notion-property-checkbox-unchecked"
      }`}
    >
      {checked ? (
        <svg
          viewBox="-1 -1 14 14"
          className="check"
          style={{
            width: "12px",
            height: "12px",
            display: "block",
            flexShrink: 0,
            backfaceVisibility: "hidden",
            fill: "white",
          }}
        >
          <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 16 16"
          className="checkboxSquare"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            flexShrink: 0,
            backfaceVisibility: "hidden",
          }}
        >
          <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z" />
        </svg>
      )}
    </div>
  );
};
