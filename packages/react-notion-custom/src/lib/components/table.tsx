import React from "react";
import type { TableArgs } from "../types";
import { getColorCss } from "../utils";

type TableProps = {
  children?: React.ReactNode;
} & TableArgs;

const Table: React.FC<TableProps> = ({ children, ...props }) => {
  const {
    table: { table_width, has_column_header, has_row_header },
  } = props;

  return (
    <div
      className={`notion-block notion-table ${getColorCss(props.table.color)}`}
    >
      <table
        className="notion-table-content"
        style={{ width: `${table_width * 100}%` }}
      >
        {has_column_header && (
          <thead>
            <tr>{has_row_header && <th></th>}</tr>
          </thead>
        )}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
