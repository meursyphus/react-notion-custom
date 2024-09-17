import { Notion, type Block } from "react-notion-custom";

export default function StoryComponent({
  blocks,
  title,
  cover,
}: {
  blocks: Block[];
  title?: string;
  cover?: string;
}) {
  return (
    <Notion>
      <Notion.Cover src={cover} />
      <Notion.Body>
        <Notion.Title title={title} />
        <Notion.Blocks blocks={blocks} />
      </Notion.Body>
    </Notion>
  );
}
