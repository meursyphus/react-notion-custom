import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./quote.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Quote",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Quote: Story = {
  args: {
    title: "Quote",
    blocks: blocks,
  },
};
