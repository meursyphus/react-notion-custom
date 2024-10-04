import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./todo.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Todo",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Todo: Story = {
  args: {
    title: "Todo",
    blocks: blocks,
  },
};
