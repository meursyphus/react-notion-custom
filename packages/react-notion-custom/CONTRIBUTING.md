# react-notion-custom Contributing Guide

[한국어 버전(Korean Version)](./CONTRIBUTING-KR.md)

[Refer to the overall project contribution guide](../../CONTRIBUTING.md)

## Table of Contents

1. Project Overview and Contribution Guide
2. Introduction to @cozy-blog/notion-client
3. Notion Block Structure
4. Rendering Process Explanation
5. Project Structure
6. New Component Writing Guide
7. Guide to Fetching Notion Data
8. Supported Notion Block Types
9. Project Roadmap

## 1. Overview

react-notion-custom is a powerful library that renders Notion pages as React components. It utilizes Notion's official API to provide a high level of compatibility and performance, while offering developers maximum customization freedom.

### Key Features:

- Utilization of Notion's Official API: Enables sustainable development and stable feature support
- High Degree of Customization Freedom: Allows flexible use according to developer needs
- Support for Various Notion Components: Continuously expanding component library
- Performance Optimization: Efficiently renders and manages data to quickly load and display large Notion pages

Unlike other similar libraries, react-notion-custom directly utilizes Notion's official API. This allows for quick responses to Notion updates and enables long-term stable and reliable development. Through this, we aim to provide developers with a better experience and value.

Currently, we support various Notion components and are continuously adding more. Your interest and contribution are the driving force that makes this project even richer.

### Contribution Guide:

We welcome active participation from the developer community. Any form of contribution, including bug reports, new feature suggestions, and documentation improvements, is of great help. You can find detailed guides on how to contribute in the latter part of this document.

### Basic Usage Example:

Here's a basic way to render a Notion page using react-notion-custom:

```jsx
<Notion>
  <Notion.Cover src={content.cover} />
  <Notion.Body>
    <Notion.Title title={content.title} />
    <Notion.Blocks blocks={content.blocks} />
  </Notion.Body>
</Notion>
```

In this example, `content` represents the data of a Notion page. We will cover data fetching and detailed usage methods in subsequent sections of this document.

Add Notion's power to your project with react-notion-custom!

## 2. Introduction to @cozy-blog/notion-client and Notion Block Structure

[@cozy-blog/notion-client](https://github.com/cozy-blog/svelte-notion-page/tree/temp/packages/notion-client) is a library that wraps and extends Notion's official SDK. This library provides additional features that allow more effective use of the [Notion API](https://developers.notion.com/docs/getting-started).

### Key Features

1. **Recursive Block Fetching**: While Notion's official SDK only fetches direct child blocks, this library recursively fetches child blocks of all depths.

2. **Fetching Full Page Information**: Through the `fetchFullPage` function, you can fetch the entire page information including all blocks and their sub-blocks.

### Usage

First, you need to [generate a Notion API key](https://developers.notion.com/docs/authorization). After obtaining the API key, you can use it as follows:

```typescript
import { Client } from "@cozy-blog/notion-client";

const client = new Client({ auth: YOUR_NOTION_API_KEY });

// Fetching full page information
const fullPage = await client.fetchFullPage("YOUR_PAGE_ID");
```

### Notion Block Structure

Notion's data structure consists of pages and blocks. Each block has a specific type and can contain other blocks. Detailed API structure can be found in the [Notion API documentation](https://developers.notion.com/docs/getting-started).

#### Basic Block Structure

All blocks have the following common properties:

- `id`: Unique identifier of the block
- `type`: Type of the block (e.g., "paragraph", "heading_1", "to_do", etc.)
- `has_children`: Whether it contains child blocks (boolean)
- `created_time`: Creation time
- `last_edited_time`: Last edit time

#### Block Type-Specific Characteristics

Each block type has a key named `[type]`, which contains data specific to that type.

Example:

```typescript
{
  id: "block_id",
  type: "paragraph",
  paragraph: {
    rich_text: [{ type: "text", text: { content: "Hello, world!" } }]
  },
  has_children: false
}
```

#### Full Page Structure

The full page data fetched by the `fetchFullPage` function has the following structure:

```typescript
type ContentfulPage = PageObjectResponse & { blocks: Block[] };

type Block = BlockObjectResponse & { blocks: Block[] };
```

Here, the `blocks` array includes all child blocks of the page or block, and this has a recursive structure.

#### Main Block Types

- `paragraph`: General text paragraph
- `heading_1`, `heading_2`, `heading_3`: Headings
- `bulleted_list_item`, `numbered_list_item`: List items
- `to_do`: Checkbox item
- `image`: Image
- `code`: Code block
- `quote`: Quote
- `callout`: Callout block

Each block type has unique properties, allowing the expression of various content.

## 4. Rendering Process Explanation

### Notion Component Usage

The basic usage interface of react-notion-custom is as follows:

```jsx
<Notion components={customComponents}>
  <Notion.Cover src={coverImageSrc} />
  <Notion.Body>
    <Notion.Title title={pageTitle} />
    <Notion.Blocks blocks={blocks} />
  </Notion.Body>
</Notion>
```

### Components Type

The type of `components` injected into the `Notion` component is as follows:

```typescript
type NotionComponents = Record<string, React.ComponentType<any>>;

const customComponents: NotionComponents = {
  paragraph: ParagraphComponent,
  heading_1: Heading1Component,
  // ... components for other block types
};
```

Here, `key` is the type of Notion block (e.g., 'paragraph', 'heading_1', etc.), and `value` is the React component to render that type.

### Data Preprocessing

```
+----------------------+
|    Notion API        |
|    Block Data        |
| +------------------+ |
| | Block            | |
| | - id             | |
| | - type           | |
| | - has_children   | |
| | - [type_specific]| |
| +------------------+ |
+----------------------+
           |
           | (Input)
           v
+---------------------------+
| resolveToContextedBlocks  |
| +-------------------------+
| | For each block:         |
| | +---------------------+ |
| | |resolveToContextedBlo| |
| | |ck (recursive)       | |
| | +---------------------+ |
| |   |                     |
| |   v                     |
| | Map parent-child        |
| | relationships           |
| +-------------------------+
|   |
|   v
| Map sibling relationships |
+---------------------------+
           |
           | (Output)
           v
+---------------------------+
|     ContextedBlocks       |
| +-------------------------+
| | ContextedBlock          |
| | - ...Block properties   |
| | - context:              |
| |   - previous (sibling)  |
| |   - next (sibling)      |
| |   - parent              |
| | - blocks (children)     |
| +-------------------------+
+---------------------------+
           |
           | (Used by)
           v
    +----------------+
    | Notion.Blocks  |
    | Component      |
    +----------------+
```

react-notion-custom preprocesses the block data fetched from the Notion API into a form optimized for UI rendering. In this process, it defines and uses a new type called `ContextedBlock`.

### ContextedBlock

`ContextedBlock` extends the existing `Block` type to include the following additional information:

- Previous block (sibling relationship)
- Next block (sibling relationship)
- Parent block

This additional information can be useful in specific block components.

### Preprocessing Function

Here's an example of a preprocessing function that converts block data to `ContextedBlock`:

```typescript
function resolveToContextedBlock(
  block: Block,
  previous: ContextedBlock | null = null,
  parent: ContextedBlock | null = null,
): ContextedBlock {
  const { blocks: children } = block;
  const thisBlock: ContextedBlock = {
    ...block,
    blocks: [],
    context: { previous, parent },
  };
  if (children == null) return thisBlock;
  const childContextBlocks = [] as ContextedBlock[];
  let previousChildBlock: ContextedBlock | null = null;
  children.forEach((child, i) => {
    const contextChildBlock = resolveToContextedBlock(
      child,
      previousChildBlock,
      thisBlock,
    );
    childContextBlocks[i] = contextChildBlock;
    previousChildBlock = contextChildBlock;
  });
  thisBlock.blocks = childContextBlocks;
  return thisBlock;
}

function resolveToContextedBlocks(blocks: Block[]) {
  const contextedBlocks = blocks.map((block) =>
    resolveToContextedBlock(block, null, null),
  );
  contextedBlocks.forEach((current, i) => {
    if (i !== 0) {
      current.context.previous = contextedBlocks[i - 1];
    }
    if (i < contextedBlocks.length - 1) {
      current.context.after = contextedBlocks[i + 1];
    }
  });
  return contextedBlocks;
}
```

### Rendering Process

```
+-------------------+      +------------------+
|   Custom          |      |   Default        |
|   Components      |      |   Components     |
+-------------------+      +------------------+
          |                         |
          |   +-----------------+   |
          +-->|     Notion      |<--+
              |    Component    |
              |(React.Provider) |
              +-----------------+
                    |     |
         +----------+     +------------+
         |                             |
+----------------+             +----------------+
| Notion.Cover   |             | Notion.Body    |
+----------------+             +----------------+
                                       |
                               +----------------+
                               | Notion.Title   |
                               +----------------+
                                       |
                               +----------------+
                               | Notion.Blocks  |
                               +----------------+
                                       |
                                       v
                               +----------------+
                               | Rendered       |
                               | Notion Page    |
                               +----------------+
```

### Notion Component

The `Notion` component serves as a container for the entire Notion page. This component uses React Context to provide custom components to its child components.

```jsx
import React from "react";
import { NotionContext } from "./context";
import { defaultComponents } from "./components";

export function Notion({ components, children }) {
  const mergedComponents = { ...defaultComponents, ...components };
  return (
    <NotionContext.Provider value={mergedComponents}>
      {children}
    </NotionContext.Provider>
  );
}
```

### Notion.Blocks Component

The `Notion.Blocks` component is responsible for preprocessing and rendering block data.

```jsx
import React, { useMemo } from "react";
import { resolveToContextedBlocks } from "./utils";
import { InternalBlocks } from "./InternalBlocks";

export function Blocks({ blocks }) {
  const contextedBlocks = useMemo(
    () => resolveToContextedBlocks(blocks),
    [blocks],
  );

  return <InternalBlocks blocks={contextedBlocks} />;
}

Notion.Blocks = Blocks;
```

### InternalBlocks Component

The `InternalBlocks` component is responsible for recursively rendering blocks.

```jsx
import React, { useContext } from "react";
import { NotionContext } from "./context";

export function InternalBlocks({ blocks }) {
  const components = useContext(NotionContext);

  return blocks.map((block) => {
    const Component = components[block.type] || components.fallback;
    return (
      <Component key={block.id} {...block}>
        {block.has_children && <InternalBlocks blocks={block.blocks} />}
      </Component>
    );
  });
}
```

### Component Customization

Users can provide custom components through the `components` prop of the `Notion` component:

```jsx
import { Notion } from "react-notion-custom";
import CustomParagraph from "./CustomParagraph";

const customComponents = {
  paragraph: CustomParagraph,
};

function MyNotionPage({ blocks }) {
  return (
    <Notion components={customComponents}>
      <Notion.Blocks blocks={blocks} />
    </Notion>
  );
}
```

### Summary

1. Block data is preprocessed into `ContextedBlock` to include additional context information.
2. The `Notion` component provides custom components through Context.
3. The `Notion.Blocks` component recursively renders blocks.
4. Each block is rendered using the provided custom component or default component.
5. Users can customize rendering by providing custom components.

This structure provides flexibility and extensibility, effectively rendering Notion's complex document structure while allowing adjustments to user requirements.

## 5. Project Structure

The structure of the react-notion-custom project is as follows:

```
react-notion-custom/
├── lib/
│   ├── index.ts
│   ├── index.css
│   ├── components/
│   │   ├── paragraph.tsx
│   │   ├── heading-1.tsx
│   │   ├── toggle.tsx
│   │   └── ...
│   └── types.ts
└── ...
```

### Description of Key Files and Folders

1. `lib/index.ts`

   - This file is the final entry point of the library.
   - The package is created based on this file during bundling.
   - Major components such as `Notion`, `NotionBlocks`, `NotionBody` are defined and exported here.

2. `lib/index.css`

   - This stylesheet defines the basic styles of Notion components.

3. `lib/components/`

   - This folder contains predefined Notion block components.
   - Each file includes a React component corresponding to a specific Notion block type.
   - Examples: `paragraph.tsx`, `heading-1.tsx`, `toggle.tsx`, etc.

4. `lib/types.ts`
   - This file contains type definitions used in the project.
   - Major types such as `ContextedBlock` are defined here.
5. `lib/utils/`
   - Functions used in multiple places are all gathered in this folder.

### Code Style and Structural Characteristics

1. File and Folder Naming Conventions

   - All file names and folder names are written in lowercase.
   - Hyphens (-) are used for spaces when needed.

2. Module Structure

   - Components and functions exported externally from each module are placed at the top of the file.
   - Functions or components used for internal implementation are placed below the exported items.

3. Component Writing Style

   - React components are declared using the `function` keyword, considering hoisting.

4. Internal Use Components
   - Components or functions used only within a specific file are not separated into separate files, but are defined and used within that file.

These structures and rules help maintain consistency in the project and make it easier for other developers to understand and contribute. They also aim for a structure that optimizes bundle size and enables efficient tree shaking.

## 6. New Component Writing Guide

### Overview

When adding new components to the react-notion-custom project, please follow these guidelines. These guidelines help maintain project consistency and standardize the development process.

### Reference Materials

The overall design and HTML structure follow the conventions of the [svelte-notion-page](https://github.com/cozy-blog/svelte-notion-page/tree/temp/packages/svelte-notion-page) library. This library is the Svelte version of the library we're creating.

### Component Writing Rules

1. File Location: Create new components under the `lib/components/` folder.
2. File Name: Write component names in lowercase, separating spaces with hyphens (-). (e.g., `numbered-list-item.tsx`)
3. Component Structure:
   - Always add the `notion-block` class to the top-level element.
   - Also add the `notion-{component-name}` class to the top-level element.
   - Use semantic tags as much as possible.
4. CSS: Define all styles in `lib/index.css`. Do not write styles within the component file.
5. All CSS class names start with `notion-`.

Example:

```jsx
import React from 'react';
import type { NumberedListItemArgs } from '../types';
import { getColorCss } from '../utils/getColorCss';
import { numberedListItemMarker } from '../utils/listItemMarker';
import RichText from './base/richtext/RichText';

function NumberedListItem({ props }: { props: NumberedListItemArgs }) {
  const {
    numbered_list_item: { rich_text: texts, color }
  } = props;
  const { marker, format } = numberedListItemMarker.getMarker(props);

  return (
    <ol
      data-notion-marker-format={format}
      className={`notion-block notion-list-numbered ${getColorCss(color)}`}
    >
      <li className="notion-display-contents">
        <div className="notion-list-numbered-content">
          <span data-notion-marker-format={format} className="notion-list-marker">{marker}</span>
          <p>
            <RichText props={texts} />
          </p>
        </div>
        {/* children will be rendered here */}
      </li>
    </ol>
  );
}

export default NumberedListItem;
```

#### Writing Storybook

Whenever you add a new component, you must also write a corresponding Storybook example.

1. Location: Create a folder with the same name as the component under the `story/stories/` folder.
2. File Structure:
   - `index.ts`: Defines the story for that component.
   - `data.json`: Includes Notion page information to be used for rendering.

Example (`story/stories/numbered-list-item/index.ts`):

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { NumberedListItem } from "../../../lib/components/numbered-list-item";
import data from "./data.json";

const meta: Meta<typeof NumberedListItem> = {
  title: "Notion Blocks/NumberedListItem",
  component: NumberedListItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberedListItem>;

export const Default: Story = {
  args: {
    props: data,
  },
};
```

#### Checklist

Please check the following items when adding a new component:

- [ ] Add new component file to `lib/components/` folder
- [ ] Export new component in `lib/components/index.ts`
- [ ] Add necessary styles to `lib/index.css`
- [ ] Add Storybook example for the component in `story/stories/` folder

By following this guide when adding new components, you can maintain project consistency and create components that other developers can easily understand and use.

## 7. Guide to Fetching Notion Data

### Overview

To use react-notion-custom, you need to fetch data from Notion pages. This guide explains two methods of fetching data.

### 1. Using notion-dump

[Not available yet as it's still under development]

notion-dump is currently under development and, when completed, will be a tool that can easily extract Notion page data.

### 2. Using @cozy-blog/notion-client

@cozy-blog/notion-client is a library that wraps the Notion API, making it easy to fetch Notion page data.

#### Installation

```bash
npm install @cozy-blog/notion-client
```

#### Usage Example

Here's a TypeScript script example of fetching Notion page data using @cozy-blog/notion-client:

```typescript
import { Client } from "@cozy-blog/notion-client";

async function fetchNotionPage() {
  // Set up Notion API key
  const client = new Client({ auth: "YOUR_NOTION_API_KEY" });

  // Set page ID
  const pageId = "YOUR_PAGE_ID";

  try {
    // Fetch full page information
    const fullPage = await client.fetchFullPage(pageId);

    // Output result to console
    console.log(JSON.stringify(fullPage, null, 2));

    // Or save to file
    // require('fs').writeFileSync('notion_page_data.json', JSON.stringify(fullPage, null, 2));
  } catch (error) {
    console.error("Error fetching Notion page:", error);
  }
}

fetchNotionPage();
```

#### Running in VSCode

1. Install the Code Runner plugin in VSCode.
2. Save the above script as a `.ts` file.
3. Replace `YOUR_NOTION_API_KEY` and `YOUR_PAGE_ID` with actual values.
4. Open the file and click the run button (▶️) in the top right corner or press `Ctrl+Alt+N` (Windows/Linux) or `Control+Option+N` (Mac) to run the script.

#### Precautions

- Handle the Notion API key with care for security. Do not upload it to public repositories.
- The fetched data is in a format that can be directly passed to react-notion-custom components.

Through this method, you can fetch Notion page data and use it with react-notion-custom.

## 8. Supported Notion Block Types

Here's a list of Notion block types currently supported in react-notion-custom. This list will be continuously updated.

| Block Type               | Support Status | Block Type Enum        | Note |
| ------------------------ | -------------- | ---------------------- | ---- |
| Paragraph                | ✅ Yes         | `paragraph`            |      |
| Heading 1                | ✅ Yes         | `heading_1`            |      |
| Heading 2                | ✅ Yes         | `heading_2`            |      |
| Heading 3                | ✅ Yes         | `heading_3`            |      |
| Bulleted List Item       | ✅ Yes         | `bulleted_list_item`   |      |
| Numbered List Item       | ✅ Yes         | `numbered_list_item`   |      |
| To-do                    | ❌ No          | `to_do`                |      |
| Toggle                   | ✅ Yes         | `toggle`               |      |
| Quote                    | ✅ Yes         | `quote`                |      |
| Callout                  | ✅ Yes         | `callout`              |      |
| Equation                 | ❌ No          | `equation`             |      |
| Code                     | ✅ Yes         | `code`                 |      |
| Image                    | ❌ No          | `image`                |      |
| Video                    | ✅ Yes         | `video`                |      |
| Bookmark                 | ❌ No          | `bookmark`             |      |
| Divider                  | ✅ Yes         | `divider`              |      |
| Table                    | ❌ No          | `table`                |      |
| Table Row                | ❌ No          | `table_row`            |      |
| Column                   | ✅ Yes         | `column`               |      |
| Column List              | ✅ Yes         | `column_list`          |      |
| Audio                    | ❌ No          | `audio`                |      |
| Synced Block             | ❌ No          | `synced_block`         |      |
| Table Of Contents        | ❌ No          | `table_of_contents`    |      |
| Embed                    | ❌ No          | `embed`                |      |
| Figma                    | ❌ No          | `figma`                |      |
| Google Maps              | ❌ No          | `maps`                 |      |
| Google Drive             | ❌ No          | `drive`                |      |
| Tweet                    | ❌ No          | `tweet`                |      |
| PDF                      | ❌ No          | `pdf`                  |      |
| File                     | ❌ No          | `file`                 |      |
| Link                     | ❌ No          | `text` (inline)        |      |
| Page Link                | ❌ No          | `page`                 |      |
| External Page Link       | ❌ No          | `text` (inline)        |      |
| Collections              | ❌ No          | -                      |      |
| Collection View          | ❌ No          | `collection_view`      |      |
| Collection View Table    | ❌ No          | `collection_view`      |      |
| Collection View Gallery  | ❌ No          | `collection_view`      |      |
| Collection View Board    | ❌ No          | `collection_view`      |      |
| Collection View List     | ❌ No          | `collection_view`      |      |
| Collection View Calendar | ❌ No          | `collection_view`      |      |
| Collection View Page     | ❌ No          | `collection_view_page` |      |

Currently, not all block types are supported (❌ No). This project is in its early stages of development, and we plan to gradually support more block types through future updates.

## 9. Project Roadmap

Here's an introduction to the future development plans for the react-notion-custom project. This roadmap may change depending on the project's progress.

### Stage 1: Implementing Basic Components

We plan to implement support for the following Notion block types first:

- Paragraph
- Heading 1, 2, 3
- Bulleted List Item
- Numbered List Item
- To-do
- Quote
- Callout
- Image
- Code

### Stage 2: Implementing Advanced Components

After implementing basic components, we plan to sequentially add the following components:

- Table
- Equation
- Video
- Bookmark
- Divider
- Audio
- File

### Stage 3: Performance Optimization

- Introduce code splitting
  - Separate heavy modules (e.g., equation rendering, code highlighting) to load only when needed
  - Improve user experience and reduce initial loading time

### Stage 4: Advanced Features and Usability Improvements

- Introduce compound component pattern
  - Improve each component to be more flexible and easier to customize
  - Allow users to easily modify and extend individual parts of components
- Implement theme system
  - Add functionality for users to easily change overall style

### Stage 5: Support for Advanced Notion Features

- Database views (Table, Gallery, List, Calendar, etc.)
- Synced Blocks
- Linked databases

### Continuous Improvement

- Improve existing components based on user feedback
- Continuously respond to new Notion features
- Performance optimization and bug fixes

This roadmap suggests the direction of project development, but priorities may be adjusted according to community requirements and feedback. We will strive to listen to users' opinions and reflect them in the project.
