# NotionPresso: Create Your Custom Blog with Notion

[한국어 버전(Korean Version)](./README-KR.md)

## 🚀 Build Your Own Website with Notion + Next.js!

With NotionPresso, you can combine Notion's powerful content management capabilities with Next.js's modern web features to create a fully customizable website or blog. Stop wasting time on complex CMS or database setups. Manage your content in Notion and create a stunning website with NotionPresso!

### This project consists of two core tools:

1. **@notionpresso/cli**: Extracts content from Notion pages and converts it into JSON files.
2. **@notionpresso/react**: Renders the extracted Notion content as React components.

## 🌟 Key Features

- **Uses Notion's Official API**: Always supports stable and latest features.
- **Perfect Customization**: Modify and style all components as you wish.
- **High-Quality Notion Components**: Provides components that look exactly like real Notion.
- **Optimized Performance**: Quickly loads and renders even large Notion pages.
- **Easy Content Management**: Manage content directly in Notion and reflect it on your website in real-time.

## 🚀 Getting Started: Create Your Own Notion Blog

### 1. Prepare Your Notion Page

1. Create a new page in Notion and write your content.
2. Set the page to public and copy the share link.

### 2. Get Your Notion Page ID

1. Go to your content page in Notion.
2. Click the 'Share' button in the top right corner and enable the 'Share to web' option to make the page public.
3. Copy the link. The URL will be in this format:
   ```
   https://www.notion.so/your-page-title-1234567890abcdef12345678
   ```
4. The last part of the URL (e.g., `1234567890abcdef12345678`) is your page ID.

### 3. Get Your Notion Integration Token

1. Go to the [Notion developer portal](https://www.notion.so/my-integrations).
2. Click 'New integration' to create a new integration.
3. Set the integration name and permissions, then click 'Submit'.
4. Copy and save the **Internal Integration Token** that's generated.

### 4. Extract Content with @notionpresso/cli

```bash
npm install -g @notionpresso/cli
npresso --page YOUR_PAGE_URL --auth YOUR_INTEGRATION_TOKEN
```

### 5. Set Up Next.js Project with Template

```bash
git clone https://github.com/notionpresso/nextjs-blog-template.git my-blog
cd my-blog
npm install
```

### 6. Render Page with @notionpresso/react

```jsx
import { Notion } from "@notionpresso/react";
import notionData from "./notion-data.json";

function HomePage() {
  return (
    <Notion>
      <Notion.Cover src={notionData.cover} />
      <Notion.Body>
        <Notion.Title title={notionData.title} />
        <Notion.Blocks blocks={notionData.blocks} />
      </Notion.Body>
    </Notion>
  );
}

export default HomePage;
```

### 7. Deploy

Deploy your Next.js app to Cloudflare Pages or Vercel and share your Notion blog with the world!

## 📚 Detailed Usage

For more detailed usage instructions and advanced customization options, please visit our [documentation](https://notionpresso.com).

## 🛠 Installation

```bash
npm install @notionpresso/react @notionpresso/cli
```

## 🗺 Roadmap

1. Expand support for various Notion block types
2. Performance optimization including code splitting and data caching
3. Integrate SEO optimization tools
4. Enhance multilingual support

For detailed development plans, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## 🤝 Contributing

NotionPresso welcomes your contributions! Whether it's bug reports, feature suggestions, or code contributions, please feel free to participate in any form. For more details, please check [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

This project is distributed under the MIT License. For more details, please refer to the [LICENSE](./LICENSE) file.

## 📮 Contact

If you have any questions or feedback, please create a [GitHub issue](https://github.com/notionpresso/react/issues) or contact us via [email](mailto:helper.notionpresso@gmail.com).

---

Create a fantastic website with your Notion content using NotionPresso! 🎉
