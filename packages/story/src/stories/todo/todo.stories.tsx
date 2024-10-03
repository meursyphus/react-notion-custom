import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./todo.json";
import { Todo, TodoArgs } from "react-notion-custom";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Todo",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const TodoStory: Story = {
  name: "Todo",
  args: {
    title: "Todo",
    blocks: blocks,
  },
};

type TodoProps = TodoArgs & {
  children?: React.ReactNode;
};

const CustomTodo = (props: TodoProps) => {
  return (
    <Todo {...props}>
      <Todo.CheckBox>
        <input
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            appearance: "none",
            cursor: "pointer",
            margin: "auto 6px",
            padding: "0",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: props.to_do.checked ? "red" : "transparent",
            border: "1px solid black",
          }}
          checked={props.to_do.checked}
          type="checkbox"
        />
      </Todo.CheckBox>
    </Todo>
  );
};

export const CustomTodoStory: Story = {
  name: "Custom Todo",
  args: {
    title: "Custom Todo",
    blocks: blocks,
    custom: {
      to_do: CustomTodo,
    },
  },
};
