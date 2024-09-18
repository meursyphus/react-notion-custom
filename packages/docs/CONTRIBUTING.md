# Documentation Guide and Contribution

[한국어 버전(Korean Version)](./CONTRIBUTING-KR.md)

[Refer to the overall project contribution guide](../../CONTRIBUTING.md)

## Table of Contents

1. Website Structure
2. Page-specific Content
3. Technology Stack
4. Content Management
5. Multilingual Support
6. Development Roadmap
7. Additional Notes

## 1. Website Structure

```
/
├── Landing Page
├── Documentation (Docs)
├── Blog
├── Showcase
└── [Other Pages]
```

## 2. Page-specific Content

### 2.1 Landing Page

- Project introduction
- Key features highlight
- Self-hosting guide with Notion (tutorial format)
- "Get Started" button (linking to documentation)

### 2.2 Documentation (Docs)

```
+------------------+
|    Sidebar       |
|  - Category 1    |
|    - Document 1  |
|    - Document 2  |
|  - Category 2    |
|    - Document 3  |
|    - Document 4  |
+------------------+
|                  |
|    Content       |
|                  |
| [Document Content]|
|                  |
+------------------+
```

### 2.3 Blog

- Posts about development process, updates, tips, etc.
- Sorting functionality by tags and dates

### 2.4 Showcase

- Display of users' custom Notion pages
- Filtering and sorting functionality

## 3. Technology Stack

- Frontend: Next.js
- CSS: TailwindCSS
- UI Library: Radix UI or Aceternity UI (used as needed)
- Markdown Rendering: Refer to Next.js official documentation

## 4. Content Management

### 4.1 Documentation (Docs)

- Location: `/content/docs/[lang]/[category]/[document].md`
- Frontmatter:
  - group: category
  - order: document order
  - title: document title
  - description: document description

### 4.2 Blog

- Location: `/content/blog/[lang]/[post].md`
- Frontmatter:
  - title: post title
  - description: post description
  - date: publication date

## 5. Multilingual Support

- Supported languages: Korean (kr), English (en), Chinese (cn)
- Markdown files: Managed separately for each language
- UI text: Use multilingual support library

## 6. Development Roadmap

1. Basic Next.js project setup
2. TailwindCSS integration
3. Markdown rendering system implementation
4. Multilingual support system implementation
5. Landing page development
6. Documentation page development
7. Blog page development
8. Showcase page development
9. UI/UX improvements and optimization
10. Content creation and translation
11. Beta testing and feedback collection
12. Official launch

## 7. Additional Notes

- Manage documents and blog posts in Markdown format
- Include practical examples using the react-notion-custom library on the landing page
- Encourage continuous content updates and community participation
