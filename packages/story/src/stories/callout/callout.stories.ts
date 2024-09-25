import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./callout.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Callout",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Callout: Story = {
  args: {
    title: "Callout",
    blocks: blocks,
  },
};
