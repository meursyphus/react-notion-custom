import { ColumnListArgs } from "../types";

const ColumnList: React.FC<{ children: React.ReactNode } & ColumnListArgs> = ({
  children,
  ...props
}) => {
  const columnCount = props.blocks?.length ?? 0;

  return (
    <div
      style={{ ["--notion-column-count" as string]: columnCount }}
      className="notion-block notion-column-list"
    >
      {children}
    </div>
  );
};

export default ColumnList;
