import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./toggle.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Toggle",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Toggle: Story = {
  args: {
    title: "Toggle",
    blocks: blocks,
  },
};
