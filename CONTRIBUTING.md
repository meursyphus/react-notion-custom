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

Thank you for your interest in the react-notion-custom project!

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

react-notion-custom differentiates itself from other similar libraries with the following features:

1. **Using Notion's Official API**: We directly utilize Notion's official API, allowing us to support more stable and up-to-date features.

2. **Maximum Customization Freedom**: We provide developers with maximum freedom. You can modify components and change styles as desired.

3. **High-Level Notion Components**: We provide high-quality components that look almost identical to the actual Notion. This allows users to easily implement a familiar and professional-looking UI.

4. **Performance Optimization**: Through efficient rendering and data management, we can quickly load and display large Notion pages.

With these features, react-notion-custom aims to be the best tool for developers, providing both the power of Notion and the flexibility of React.

### Project Structure

```
react-notion-custom/
├── packages/
│   ├── react-notion-custom/
│   ├── notion-dump/
│   ├── docs/
│   └── story/
├── README.md
└── CONTRIBUTING.md
```

- `react-notion-custom`: Core library that renders Notion pages as React components using the Notion API
- `notion-dump`: CLI tool that extracts Notion page data and saves it as JSON files
- `docs`: Website containing project documentation and examples
- `story`: UI component testing and documentation using Storybook

### Initial Setup

To start the project, run the following command in the root directory:

```
npm install
```

## 2. Contribution Guidelines

### 2.1 Contribution Process

1. Fork the project.
2. Clone it locally: `git clone https://github.com/YOUR_USERNAME/react-notion-custom.git`
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

1. Ensure Node.js and npm are installed.
2. After cloning the project, run `npm install` in the root directory to install all dependencies.

### 3.2 PreviewJS Setup

PreviewJS allows you to view Storybook directly in your editor, which is very convenient for development.

1. Install the [PreviewJS](https://previewjs.com/) extension in VSCode.
2. Open the project and select "Open Preview" in each story code.

![previewjs](./previewjs.png)

### 3.3 Component Development Guidelines

When developing react-notion-custom components, please follow these guidelines:

1. Storybook Development:

   - Write stories for each component and test various states and props through Storybook.
   - You can run Storybook from the root directory with `npm run story:start`.

2. Using PreviewJS:

   - Using PreviewJS in VSCode allows you to develop while viewing Storybook directly in your editor, which is very efficient.

3. Component Naming and Structure:
   - Write component names in PascalCase.
   - Write component file names and folder names in lowercase. Use dashes (-) for spaces.

## 4. Project Roadmap

### 1. Development and Deployment of react-notion-custom Library

### 2. Development and Deployment of notion-dump CLI Tool

### 3. Development of docs Project

- Writing project introduction page
  - Including blog writing example using NextJS
- Writing detailed usage guide and API documentation
- Operating project blog
  - Regular updates and sharing changelog

You can check the progress and details of each stage in the issue tracker.

## 5. Project Structure Explanation

### Roles of react-notion-custom and notion-dump

1. **notion-dump**:

   - Retrieves content of specific Notion pages using the Notion API.
   - Converts retrieved data to JSON format and saves it locally.
   - This process allows easy analysis and use of Notion page structure and content.

2. **react-notion-custom**:
   - Takes JSON data generated by notion-dump as input.
   - Analyzes JSON data and converts it to corresponding React components.
   - Provides React components corresponding to each Notion block type (text, image, table, etc.).
   - Users can customize these components to add desired styles and functions.

### Process Diagram

The following ASCII art represents the process of rendering a Notion page through react-notion-custom:

```
+-------------+     +-------------+     +-------------------+
|   Notion    |     | notion-dump |     | react-notion-custom |
|   Page      | --> |   (CLI)     | --> |    (Library)      |
+-------------+     +-------------+     +-------------------+
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

- [How to contribute to react-notion-custom](./packages/react-notion-custom/CONTRIBUTING.md)
  - React component development, Notion API integration, performance optimization, etc.
- [How to contribute to notion-dump](./packages/notion-dump/CONTRIBUTING.md)
  - CLI tool development, improvement of Notion data extraction and conversion logic, etc.
- [How to contribute to documentation](./packages/docs/CONTRIBUTING.md)
  - Writing documentation, improving example code, multilingual support, etc.

Please refer to the respective links for detailed contribution methods for each project.
