import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./numbered-list-item.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/NumberedListItem",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const NumberedListItem: Story = {
  args: {
    title: "NumberedListItem",
    blocks: blocks,
  },
};
