import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./table.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Table",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Table: Story = {
  args: {
    title: "Table",
    blocks: blocks,
  },
};
