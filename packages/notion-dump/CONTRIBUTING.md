# notion-dump Usage Guide and Contribution Guidelines

[한국어버전](./CONTRIBUTING-KR.md)

[Refer to the project-wide contribution guide](../../CONTRIBUTING.md)

## Table of Contents

1. Overview
2. Installation and Usage
3. Notion API Setup
4. CLI Options
5. Output Structure
6. Development and Testing
7. Contribution Guide

## 1. Overview

notion-dump is a CLI tool that extracts data from Notion pages and saves it in JSON format to the local file system. This tool internally uses the @cozy-blog/notion-client library to communicate with the Notion API. It supports the Next.js project structure by default and includes image processing functionality.

## 2. Installation and Usage

### Running Locally

1. Clone the project and navigate to the directory

   ```bash
   git clone https://github.com/meursyphus/react-notion-custom.git
   cd react-notion-custom
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Build the project

   ```bash
   npm run cli:build
   ```

4. Run the script

   ```bash
   node ./packages/notion-dump/dist/notion-dump.es.js --page <NotionPageURL> --auth <YourAPIToken>
   ```

   Or use npm link to use it as a global command:

   ```bash
   npm link
   notion-dump --page <NotionPageURL> --auth <YourAPIToken>
   npm unlink
   ```

## 3. Notion API Setup

1. Obtain a Notion API token

   - Create a new integration on the Notion developers page
   - Select "Read content" permission
   - Copy the Internal Integration Token

2. Connect the integration to your Notion page

   - Add the integration in the "Connections" settings of the target page

3. Get the Notion page URL
   - Copy the page URL (including query string is fine)

## 4. CLI Options

notion-dump provides the following CLI options:

- `--page <NotionPageURL>`: (Required) Notion page URL
- `--auth <YourAPIToken>`: (Required) Notion API token
- `--dir <path>`: Specifies the directory where JSON files will be saved. Default is `./notion-data`
- `--image-dir <path>`: Specifies the directory where image files will be saved. Default is `./public/notion-data`

Example:

```bash
notion-dump --page https://www.notion.so/mypage --auth secret_token --dir ./my-data --image-dir ./public/my-notion-data
```

## 5. Output Structure

notion-dump saves data considering the Next.js project structure by default:

```
my-notion-blog/
├── notion-data/
│   ├── page-id-1.json
│   ├── page-id-2.json
│   └── ...
└── public/
    └── notion-data/
        ├── page-id-1/
        │   ├── image1.png
        │   └── image2.jpg
        ├── page-id-2/
        │   └── image1.png
        └── ...
```

- `notion-data/`: JSON files containing the content and structure of each Notion page are saved here. File names are based on the page ID.
- `public/notion-data/`: Images included in the pages are saved here, organized by page ID. This structure is compatible with Next.js static file serving.

Image URLs in the JSON files are automatically converted to local paths when saved.

## 6. Development and Testing

- TypeScript compilation: `npm run build`
- Adding dependencies: Update package.json, then `npm install`

## 7. Contribution Guide

### 7.1 Currently Developed Features

- CLI script development
- Page data extraction
- Basic output directory management
- Image processing functionality

### 7.2 Features Under Development

- Support for subpages and databases
- Support for various output formats
- Documentation and example improvements

### 7.3 How to Contribute

1. Check issues
2. Fork and create a branch
3. Write code and commit
4. Create a pull request
5. Code review and merge

Your participation is a great strength in the development of notion-dump. Let's create a better tool together!
