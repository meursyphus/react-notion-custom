# notion-dump Usage Guide and Contribution Instructions

[Refer to the overall project contribution guide](../../CONTRIBUTING.md)

## Table of Contents

1. Overview
2. Usage
3. Development and Testing
4. Contribution Guide

## Overview

notion-dump is a CLI tool that extracts data from Notion pages and saves it to the local file system. This tool internally uses @cozy-blog/notion-client to communicate with the Notion API.

## Publishing to npm

For instructions on how to publish notion-dump to npm and make it executable with npx, refer to [this guide](https://deepgram.com/learn/npx-script). Once published, you can run it with npx as follows:

```bash
npx notion-dump --page-id YOUR_PAGE_ID [--out OUTPUT_DIR] [--dir ROOT_DIR]
```

## Running Locally

If you're developing or want to test locally, follow these steps:

1. Clone the project and navigate to the directory:
   ```bash
   git clone https://github.com/your-repo/notion-dump.git
   cd notion-dump
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run locally:
   ```bash
   node cli.js --page-id YOUR_PAGE_ID [--out OUTPUT_DIR] [--dir ROOT_DIR]
   ```
4. (Optional) Make it executable:
   ```bash
   chmod +x cli.js
   ```
   Then you can run it like this:
   ```bash
   node ./cli.js --page-id YOUR_PAGE_ID [--out OUTPUT_DIR] [--dir ROOT_DIR]
   ```

## Development and Testing

While developing and testing locally, you can use `npm link` to use it globally:

1. Run the following command in the project directory:
   ```bash
   npm link
   ```
2. Now you can use the `notion-dump` command globally:
   ```bash
   notion-dump --page-id YOUR_PAGE_ID
   ```
3. When development is complete, unlink:
   ```bash
   npm unlink
   ```
   This way, you can develop and test locally. After testing and verifying changes, you can submit a pull request to contribute to the project.

## Usage Example

```bash
npx notion-dump --page-id 123456789abcdef --out ./custom-output --dir ./my-project/public
```

## Command Options

- `--page-id`: (Required) ID of the Notion page to extract
- `--out`: (Optional) Output directory name. Default is page {title-id}
- `--dir`: (Optional) Root directory path. Default is set based on NextJS project structure

## Output Structure

```
[ROOT_DIR]/
└── [page-title_page-id]/
    ├── index.json
    └── images/
        ├── image1.jpg
        ├── image2.png
        └── ...
```

- `index.json`: Stores page content in JSON format
- `images/`: Directory storing all image files included in the page

## Image Processing

- Image files are saved in the `images/` directory.
- Image filenames are determined based on Notion's caption information, or if not available, in the format of `image1`, `image2`, etc.
- Image block information in the JSON file is updated with local file paths.

## Handling Duplicate Runs

- If the tool is run multiple times for the same page, existing data is overwritten with new data.
- For the image folder, unused images are removed and new images are added.

## Contribution Guide

notion-dump is an open-source project, and we welcome community contributions for continuous improvement and development. Here are the main development items currently in progress or in need of contribution:

1. CLI Script Development

   - Implement the `notion-dump` command
   - Parse and handle command-line arguments
   - Improve error handling and user feedback

2. Image Processing Feature Development

   - Download images from Notion API
   - Implement image filename generation logic
   - Update image path information

3. Output Structure Optimization

   - Generate and structure `index.json` file
   - Apply directory naming convention using page title and ID

4. NextJS Project Structure Support

   - Set default output path to match NextJS project structure

5. Implement Incremental Update Feature

   - Develop logic to efficiently update only changed content

6. Expand Database Extraction Feature

   - Add feature to extract entire Notion databases

7. Support Various Output Formats

   - Implement conversion to formats other than JSON, such as Markdown and HTML

8. Improve Documentation and Examples
   - Write user guides and API documentation
   - Provide example code for various use cases

If you'd like to contribute, please visit the GitHub repository to check issues or suggest new features. Pull requests are always welcome!

Your participation is a great strength in the development of notion-dump. Let's create a better tool together!
