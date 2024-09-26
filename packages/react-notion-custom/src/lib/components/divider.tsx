import React from "react";
import { DividerArgs } from "../types";

type DividerProps = DividerArgs;

const Divider: React.FC<DividerProps> = () => {
  return (
    <div className="notion-block notion-hr-container">
      <hr className="notion-hr" />
    </div>
  );
};

export default Divider;
