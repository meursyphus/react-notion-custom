import React from "react";

const Column: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="notion-column">{children}</div>
      <div className="notion-column-spacer" />
    </>
  );
};

export default Column;
