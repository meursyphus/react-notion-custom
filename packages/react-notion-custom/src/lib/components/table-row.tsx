import React from "react";
import type { TableRowArgs, TextArgs } from "../types";
import RichText from "./internal/rich-text";

type TableRowProps = TableRowArgs;

const TableRow: React.FC<TableRowProps> = ({ table_row }) => {
  const { cells } = table_row;

  return (
    <tr className="notion-table-row">
      {cells.map((cell, index) => (
        <td key={index} className="notion-table-cell">
          <RichText
            props={cell.map((text: Partial<TextArgs>) => ({
              type: text.type || "text",
              text: text.text || { content: "" },
              annotations: text.annotations || {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: text.plain_text || "",
              href: text.href || null,
            }))}
          />
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
