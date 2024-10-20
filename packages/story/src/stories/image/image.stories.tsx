import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./image.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Image",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Image: Story = {
  args: {
    title: "Image",
    blocks: blocks,
  },
};
