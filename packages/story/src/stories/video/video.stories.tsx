import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./video.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Video",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Video: Story = {
  args: {
    title: "Video",
    blocks: blocks,
  },
};
