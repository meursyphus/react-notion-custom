import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./equation.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Equation",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Equation: Story = {
  args: {
    title: "Equation",
    blocks: blocks,
  },
};
