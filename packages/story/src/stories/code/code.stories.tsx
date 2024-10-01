import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./code.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Divider",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Divider: Story = {
  args: {
    title: "Code",
    blocks: blocks,
  },
};
