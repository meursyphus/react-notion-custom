import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./toggle.json";

import { Toggle } from "@notionpresso/react";
import type { ToggleArgs } from "@notionpresso/react";
import { useState } from "react";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Toggle",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const ToggleStory: Story = {
  name: "Toggle",
  args: {
    title: "Toggle",
    blocks: blocks,
  },
};

type ToggleProps = ToggleArgs & {
  children?: React.ReactNode;
};

const CustomToggle = ({ children, ...props }: ToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Toggle {...props} onChangeOpen={handleChangeOpen}>
      <Toggle.Icon>
        {isOpen ? (
          <div
            style={{
              width: "10px",
              height: "3px",
              cursor: "pointer",
              backgroundColor: "orange",
            }}
          />
        ) : (
          <div
            style={{
              width: "3px",
              height: "10px",
              cursor: "pointer",
              backgroundColor: "orange",
            }}
          />
        )}
      </Toggle.Icon>
      {children}
    </Toggle>
  );
};

export const CustomToggleStory: Story = {
  name: "Custom Toggle",
  args: {
    title: "Custom Toggle",
    blocks: blocks,
    custom: {
      toggle: CustomToggle,
    },
  },
};
