import { type TableRowArgs } from "../types";
import RichText from "./internal/rich-text";

type TableRowProps = {
  children: React.ReactNode;
} & TableRowArgs;

const TableRow: React.FC<TableRowProps> = ({ ...props }) => {
  const {
    table_row: { cells },
  } = props;

  return (
    <tr className="notion-table-row">
      {cells.map((cell, index) => (
        <td key={"td" + cells + index}>
          <RichText props={cell} />
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
