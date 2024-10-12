import type { TableArgs } from "../types";

type TableProps = { children: React.ReactNode } & TableArgs;

const Table: React.FC<TableProps> = ({ children, ...props }) => {
  const {
    table: { has_column_header, has_row_header },
  } = props;

  return (
    <table className="notion-block notion-table">
      <tbody
        className={`
            notion-table-content
            ${has_column_header ? "notion-has-column-header" : ""} 
            ${has_row_header ? "notion-has-row-header" : ""}
            `}
      >
        {children}
      </tbody>
    </table>
  );
};

export default Table;
