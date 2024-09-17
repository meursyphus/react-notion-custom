# React-Notion-Custom: Create Your Custom Blog with Notion

[한국어 버전(Korean Version)](./README-KR.md)

## 🚀 Build Your Own Website with Notion + React!

With React-Notion-Custom, you can combine Notion's powerful content management capabilities with React's flexible UI to create a fully customizable website or blog. Stop wasting time on complex CMS or database setups. Manage your content in Notion and create a stunning website with React-Notion-Custom!

### This project consists of two core tools:

1. **notion-dump**: Extracts content from Notion pages and converts it into JSON files.
2. **react-notion-custom**: Renders the extracted Notion content as React components.

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

### 2. Extract Content with notion-dump

```bash
npx notion-dump --page-id YOUR_PAGE_ID
```

### 3. Set Up React Project

```bash
npm create vite@latest my-notion-blog -- --template react-ts
cd my-notion-blog
npm install react-notion-custom
```

### 4. Render Page with React-Notion-Custom

```jsx
import { Notion } from "react-notion-custom";
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

### 5. Deploy

Deploy your Next.js app to Vercel or Netlify and share your Notion blog with the world!

## 📚 Detailed Usage

For more detailed usage instructions and advanced customization options, please refer to [Incomplete].

## 🛠 Installation

```bash
npm install react-notion-custom notion-dump
```

## 🗺 Roadmap

1. Expand support for various Notion block types
2. Performance optimization including code splitting and data caching
3. Integrate SEO optimization tools
4. Enhance multilingual support

For detailed development plans, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## 🤝 Contributing

React-Notion-Custom welcomes your contributions! Whether it's bug reports, feature suggestions, or code contributions, please feel free to participate in any form. For more details, please check [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

This project is distributed under the MIT License. For more details, please refer to the [LICENSE](./LICENSE) file.

## 📮 Contact

If you have any questions or feedback, please create a [GitHub issue](https://github.com/your-repo/react-notion-custom/issues) or contact us via [email](tmdeoans@snu.ac.kr).

---

Create a fantastic website with your Notion content using React-Notion-Custom! 🎉
