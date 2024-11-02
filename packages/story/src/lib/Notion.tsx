import { Notion, type Block } from "../../../core/src/lib";

export default function StoryComponent({
  blocks,
  title,
  cover,
  custom,
}: {
  blocks: Block[];
  title?: string;
  cover?: string;
  custom?: Record<string, React.ComponentType<any>>;
}) {
  return (
    <Notion custom={custom}>
      <Notion.Cover src={cover} />
      <Notion.Body>
        <Notion.Title title={title} />
        <Notion.Blocks blocks={blocks} />
      </Notion.Body>
    </Notion>
  );
}
