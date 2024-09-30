import React from "react";
import type { TableArgs } from "../types";
import { getColorCss } from "../utils";
import TableRow from "./table-row";

type TableProps = TableArgs;

const Table: React.FC<TableProps> = (props) => {
  const {
    table: { table_width, has_column_header, has_row_header },
    blocks,
  } = props;

  return (
    <div
      className={`notion-block notion-table ${getColorCss(props.table.color)}`}
    >
      <table
        className="notion-table-content"
        style={{ width: `${table_width * 100}%` }}
      >
        <tbody>
          {blocks.map((block, index) => {
            if (block.type !== "table_row" || !block.table_row) {
              return null;
            }
            return (
              <TableRow
                key={block.id}
                cells={block.table_row.cells}
                isHeader={has_column_header && index === 0}
                hasRowHeader={has_row_header}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
