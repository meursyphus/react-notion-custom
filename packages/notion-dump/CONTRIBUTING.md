# notion-dump Usage Guide and Contribution Guidelines

[한국어버전](./CONTRIBUTING-KR.md)

[Refer to the overall project contribution guide](../../CONTRIBUTING.md)

## Table of Contents

1. Overview
2. Usage
3. Notion API Setup
4. Development and Testing
5. Contribution Guide

## 1. Overview

notion-dump is a CLI tool that extracts data from Notion pages and saves it in JSON format to the local file system. This tool internally uses the @cozy-blog/notion-client library to communicate with the Notion API.

## 2. Usage

### Running Locally

1. Clone the project and navigate to the directory

   ```bash
   git clone https://github.com/meursyphus/react-notion-custom.git
   cd react-notion-custom
   ```

2. Install dependencies

   ```bash
   # Run this in the root directory
   npm install
   ```

3. Build the project

   ```bash
   # Run this in the root directory
   npm run cli:build
   ```

4. Run the script

   ```bash
   node ./packages/notion-dump/dist/notion-dump.es.js --page <NotionPageURL> --auth <YourAPIToken>
   ```

   Alternatively, use npm link to use it as a global command:

   ```bash
   npm link
   notion-dump --page <NotionPageURL> --auth <YourAPIToken>
   npm unlink
   ```

## 3. Notion API Setup

1. Obtain a Notion API token

   - Create a new integration on the Notion developers page
   - Select the "Read content" permission
   - Copy the Internal Integration Token

2. Connect the integration to a Notion page

   - Add the integration in the "Connections" settings of the target page

3. Get the Notion page URL
   - Copy the page URL (including query strings is acceptable)

## 4. Development and Testing

- TypeScript compilation: `npm run build`
- Adding dependencies: Update package.json, then run `npm install`

## 5. Contribution Guide

### 5.1 Currently Developed Features

- CLI script development
- Page data extraction
- Basic output directory management

### 5.2 Features Yet to be Developed

- Image processing functionality:
  Downloads all images and saves them. Changes the image URL in block types to the downloaded local path.
  ```
  [ROOT_DIR]/
  └── [page-title_page-id]/
     ├── index.json
     └── images/
        ├── image1.jpg
        ├── image2.png
        └── ...
  ```
- Support for Next.js project structure
- Support for various output formats
  - Currently only supports single pages. Subpages or databases are not supported.
- Documentation and example improvements

### 5.3 How to Contribute

1. Check issues
2. Fork and create a branch
3. Write code and commit
4. Create a pull request
5. Code review and merge

Your participation is crucial to the development of notion-dump. Let's create a better tool together!
