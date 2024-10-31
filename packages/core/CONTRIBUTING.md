# Contributing Guide

## Table of Contents

1. Introduction
   - 1.1 Project Overview
   - 1.2 What Makes Our Project Special
   - 1.3 Project Structure
2. Contribution Guidelines
   - 2.1 Contribution Process
   - 2.2 PR Approval Process
   - 2.3 Roles of Maintainers and Contributors
   - 2.4 Issue and PR Management
3. Development Environment and Guidelines
   - 3.1 Setting Up the Development Environment
   - 3.2 PreviewJS Setup
   - 3.3 Component Development Guidelines
4. Project Roadmap
5. Project Structure Explanation

## 1. Introduction

Thank you for your interest in the NotionPresso project!

Our goal is to combine Notion's powerful content management capabilities with React's flexible UI implementation, enabling developers to easily create custom blogs or websites based on Notion.

```jsx
<Notion>
  <Notion.Cover src={content.cover} />
  <Notion.Body>
    <Notion.Title title={content.title} />
    <Notion.Blocks blocks={content.blocks} />
  </Notion.Body>
</Notion>
```

### What Makes Our Project Special

NotionPresso differentiates itself from other similar libraries with the following features:

1. **Using Notion's Official API**: We directly utilize Notion's official API, allowing us to support more stable and up-to-date features.

2. **Maximum Customization Freedom**: We provide developers with maximum freedom. You can modify components and change styles as desired.

3. **High-Level Notion Components**: We provide high-quality components that look almost identical to the actual Notion. This allows users to easily implement a familiar and professional-looking UI.

4. **Performance Optimization**: Through efficient rendering and data management, we can quickly load and display large Notion pages.

With these features, NotionPresso aims to be the best tool for developers, providing both the power of Notion and the flexibility of React.

### Project Structure

```
notionpresso/
├── packages/
│   ├── core/              # @notionpresso/react package
│   └── story/            # Component stories
├── README.md
└── CONTRIBUTING.md
```

- `core`: Core library that renders Notion pages as React components using the Notion API
- `story`: UI component testing and documentation using Storybook

### Initial Setup

To start the project, run the following command in the root directory:

```
npm install
```

## 2. Contribution Guidelines

### 2.1 Contribution Process

1. Fork the project.
2. Clone it locally: `git clone https://github.com/notionpresso/react.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`
   - Branch names should start with `feature/`, `fix/`, `docs/`, etc., followed by a brief description.
5. Commit your changes: `git commit -m "Add some feature"`
6. Push to your forked repository: `git push origin feature/your-feature-name`
7. Create a Pull Request.

You can add `[DRAFT]` to the PR title to request intermediate review or feedback during your work.

### 2.2 PR Approval Process

All Pull Requests require approval from the project maintainer, Moon-DaeSeung.
Please write all PRs in English.

### 2.3 Roles of Maintainers and Contributors

- Maintainers: Determine the project direction and are responsible for code reviews.
- Contributors: Can participate in bug fixes, proposing and implementing new features, improving documentation, etc.

### 2.4 Issue and PR Management

- Both maintainers and contributors can freely create and resolve issues.
- Maintainers must create separate branches for features when requesting PRs.
- Direct pushing to the main branch is prohibited.

## 3. Development Environment and Guidelines

### 3.1 Setting Up the Development Environment

1. Install mise:

   - mise is a polyglot development environment manager that ensures all contributors use the same Node.js version.
   - Install mise by following the instructions at https://mise.jdx.dev/getting-started.html

2. Clone the project and set up mise:

   - After cloning the project, navigate to the project root directory.
   - Run `mise install` to install the specified Node.js version.

3. Verify Node.js installation:

   - Run `node -v` to confirm that the correct Node.js version is installed.
   - The version should match the one specified in the `.mise.toml` file in the project root.

4. Install project dependencies:
   - Run `npm install` in the root directory to install all dependencies.

Note: Using mise ensures that you're using the exact Node.js version specified for this project, regardless of any other Node.js installations on your system.

### 3.2 PreviewJS Setup

PreviewJS allows you to view Storybook directly in your editor, which is very convenient for development.

1. Install the [PreviewJS](https://previewjs.com/) extension in VSCode.
2. Open the project and select "Open Preview" in each story code.

### 3.3 Component Development Guidelines

When developing NotionPresso components, please follow these guidelines:

1. Storybook Development:

   - Write stories for each component and test various states and props through Storybook.
   - You can run Storybook from the root directory with `npm run story:start`.

2. Using PreviewJS:

   - Using PreviewJS in VSCode allows you to develop while viewing Storybook directly in your editor, which is very efficient.

3. Component Naming and Structure:
   - Write component names in PascalCase.
   - Use kebab-case for component file names and folder names. This means that all words are lowercase and separated by a hyphen (-). e.g) `text-block.tsx`

## 4. Project Roadmap

### 1. Development and Deployment of @notionpresso/react Library

### 2. Development and Deployment of @notionpresso/cli Tool

### 3. Development of docs Project

- Writing project introduction page
  - Including blog writing example using NextJS
- Writing detailed usage guide and API documentation
- Operating project blog
  - Regular updates and sharing changelog

You can check the progress and details of each stage in the issue tracker.

## 5. Project Structure Explanation

### Roles of @notionpresso/react and @notionpresso/cli

1. **@notionpresso/cli**:

   - Retrieves content of specific Notion pages using the Notion API.
   - Converts retrieved data to JSON format and saves it locally.
   - Can be used via `npx npresso` command.
   - This process allows easy analysis and use of Notion page structure and content.

2. **@notionpresso/react**:
   - Takes JSON data generated by @notionpresso/cli as input.
   - Analyzes JSON data and converts it to corresponding React components.
   - Provides React components corresponding to each Notion block type (text, image, table, etc.).
   - Users can customize these components to add desired styles and functions.

### Process Diagram

The following ASCII art represents the process of rendering a Notion page through NotionPresso:

```
+-------------+     +----------------+     +------------------+
|   Notion    |     | @notionpresso/ |     | @notionpresso/   |
|   Page      | --> |      cli       | --> |      react       |
+-------------+     +----------------+     +------------------+
      |                    |                      |
      |                    |                      |
      v                    v                      v
 +---------+        +-----------+         +----------------+
 | Content |        |   JSON    |         | React Components |
 | • Text  |        | {         |         | <NotionPage>   |
 | • Image | -----> |   "blocks"|  -----> | <TextBlock>    |
 | • Table |        |   ...     |         | <ImageBlock>   |
 | • ...   |        | }         |         | ...            |
 +---------+        +-----------+         +----------------+
                                                  |
                                                  |
                                                  v
                                          +--------------+
                                          | Rendered Page |
                                          | (Customizable)|
                                          +--------------+
```

Through this process, users can import Notion page content as-is and render it in a React application, while customizing styles and functions as needed.

---

Contribution guides for each sub-project:

- [How to contribute to @notionpresso/react](./packages/core/CONTRIBUTING.md)
  - React component development, Notion API integration, performance optimization, etc.

Please refer to the respective links for detailed contribution methods for each project.
