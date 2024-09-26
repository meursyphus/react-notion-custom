import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./bulleted-list-item.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/BulletedListItem",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const BulletedListItem: Story = {
  args: {
    title: "Bulleted List Item",
    blocks: blocks,
  },
};
