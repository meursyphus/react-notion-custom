import React from "react";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import type { TextArgs, TableRowArgs } from "../types";
import RichText from "./internal/rich-text";

type TableRowProps = TableRowArgs & {
  isHeader?: boolean;
  hasRowHeader?: boolean;
};

const convertRichTextToTextArgs = (
  richText: RichTextItemResponse,
): TextArgs => {
  if (richText.type !== "text") {
    throw new Error("Unsupported rich text type");
  }

  return {
    type: "text",
    text: {
      content: richText.text.content,
      link: richText.text.link ? { url: richText.text.link.url } : undefined,
    },
    annotations: richText.annotations,
    plain_text: richText.plain_text,
    href: richText.href || undefined,
  };
};

const TableRow: React.FC<TableRowProps> = ({
  cells,
  isHeader,
  hasRowHeader,
}) => {
  if (!Array.isArray(cells)) {
    return null;
  }

  return (
    <tr className="notion-table-row">
      {cells.map((cell, index) => {
        const CellTag = isHeader || (hasRowHeader && index === 0) ? "th" : "td";
        return (
          <CellTag key={index} className="notion-table-cell">
            <RichText props={cell.map(convertRichTextToTextArgs)} />
          </CellTag>
        );
      })}
    </tr>
  );
};

export default TableRow;
