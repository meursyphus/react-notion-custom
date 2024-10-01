import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./code.json";
import { getCodeExampleJson } from "./getCodeExampleJson";
import {
  java,
  javascript,
  dart,
  kotlin,
  typescript,
  markdown,
  python,
  sql,
  elixir,
  go,
} from "./support-code-examples";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Code",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Code: Story = {
  args: {
    title: "Code",
    blocks: blocks,
  },
};
export const Dart: Story = {
  args: {
    title: "Dart",
    blocks: getCodeExampleJson(dart, "dart"),
  },
};

export const Java: Story = {
  args: {
    title: "Java",
    blocks: getCodeExampleJson(java, "java"),
  },
};

export const Javascript: Story = {
  args: {
    title: "Javascript",
    blocks: getCodeExampleJson(javascript, "javascript"),
  },
};

export const Kotlin: Story = {
  args: {
    title: "Kotlin",
    blocks: getCodeExampleJson(kotlin, "kotlin"),
  },
};

export const Typescript: Story = {
  args: {
    title: "Typescript",
    blocks: getCodeExampleJson(typescript, "typescript"),
  },
};

export const Markdown: Story = {
  args: {
    title: "Markdown",
    blocks: getCodeExampleJson(markdown, "markdown"),
  },
};

export const Python: Story = {
  args: {
    title: "Python",
    blocks: getCodeExampleJson(python, "python"),
  },
};

export const Sql: Story = {
  args: {
    title: "Sql",
    blocks: getCodeExampleJson(sql, "sql"),
  },
};

export const Go: Story = {
  args: {
    title: "Go",
    blocks: getCodeExampleJson(go, "go"),
  },
};

export const Elixir: Story = {
  args: {
    title: "Elixir",
    blocks: getCodeExampleJson(elixir, "elixir"),
  },
};
