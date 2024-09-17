import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./paragraph.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Paragraph",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Paragraph: Story = {
  args: {
    title: "Paragraph",
    blocks: blocks,
  },
};
