# react-notion-custom

## 1. 프로젝트 개요

react-notion-custom은 Notion의 페이지를 React 컴포넌트로 렌더링하는 강력한 라이브러리입니다. Notion의 공식 API를 활용하여 높은 수준의 호환성과 성능을 제공하며, 개발자들에게 최대한의 커스터마이징 자유도를 제공합니다.

## 2. 주요 기능

- Notion의 모든 주요 블록 타입 지원
- 고도로 커스터마이징 가능한 컴포넌트 구조
- Notion의 스타일을 정확히 구현한 고품질 렌더링
- 효율적인 데이터 처리 및 렌더링 최적화

## 3. 프로젝트 구조

[프로젝트 폴더 구조 설명 필요]

## 4. 컴포넌트 개발 가이드

[컴포넌트 추가 방법 및 가이드라인 필요]

### Storybook 활용

[Story 작성 방법 및 가이드라인 필요]

## 5. 데이터 가져오기

### notion-dump 사용하기

[notion-dump를 사용한 데이터 추출 방법 설명 필요]

### @cozy-blog/notion-client 사용하기

[Notion API와 @cozy-blog/notion-client를 사용한 데이터 가져오기 방법 설명 필요]

## 6. 사용 방법

react-notion-custom을 사용하여 Notion 페이지를 렌더링하는 기본적인 방법은 다음과 같습니다:

```jsx
<Notion>
  <Notion.Cover src={content.cover} />
  <Notion.Body>
    <Notion.Title title={content.title} />
    <Notion.Blocks blocks={content.blocks} />
  </Notion.Body>
</Notion>
```

여기서 `content`는 `notion-dump`를 사용하여 추출한 Notion 페이지 데이터입니다. 내부적으로 `@cozy-blog/notion-client`를 사용하여 데이터를 처리합니다.

타입 정보를 사용하려면 다음과 같이 import할 수 있습니다:

```typescript
import type { ContentPullPage, Block } from "@cozy-blog/notion";
```

## 7. 지원되는 블록 타입

| Block Type               | 지원 여부 | Block Type Enum                     | 비고 |
| ------------------------ | --------- | ----------------------------------- | ---- |
| Page                     | ❌ No     | `page`                              |      |
| Text                     | ❌ No     | `text`                              |      |
| Bookmark                 | ❌ No     | `bookmark`                          |      |
| Bulleted List            | ❌ No     | `bulleted_list`                     |      |
| Numbered List            | ❌ No     | `numbered_list`                     |      |
| Heading 1                | ❌ No     | `header_h1`                         |      |
| Heading 2                | ❌ No     | `sub_header<h2>`                    |      |
| Heading 3                | ❌ No     | `sub_sub_header<h3>`                |      |
| Quote                    | ❌ No     | `quote`                             |      |
| Callout                  | ❌ No     | `callout`                           |      |
| Equation (block)         | ❌ No     | `equation`                          |      |
| Equation (inline)        | ❌ No     | `text`                              |      |
| Todos (checkboxes)       | ❌ No     | `to_do`                             |      |
| Table Of Contents        | ❌ No     | `table_of_contents`                 |      |
| Divider                  | ❌ No     | `divider`                           |      |
| Column                   | ❌ No     | `column`                            |      |
| Column List              | ❌ No     | `column_list`                       |      |
| Toggle                   | ❌ No     | `toggle<details>`                   |      |
| Image                    | ❌ No     | `image<img>`                        |      |
| Embed                    | ❌ No     | `embed`                             |      |
| Video                    | ❌ No     | `video iframe`                      |      |
| Figma                    | ❌ No     | `figma iframe`                      |      |
| Google Maps              | ❌ No     | `maps iframe`                       |      |
| Google Drive             | ❌ No     | `drive`                             |      |
| Tweet                    | ❌ No     | `tweet`                             |      |
| PDF                      | ❌ No     | `pdf`                               |      |
| Audio                    | ❌ No     | `audio`                             |      |
| File                     | ❌ No     | `file`                              |      |
| Link                     | ❌ No     | `text`                              |      |
| Page Link                | ❌ No     | `page`                              |      |
| External Page Link       | ❌ No     | `text`                              |      |
| Code (block)             | ❌ No     | `code`                              |      |
| Code (inline)            | ❌ No     | `text`                              |      |
| Collections              | ❌ No     |                                     |      |
| Collection View          | ❌ No     | `collection_view`                   |      |
| Collection View Table    | ❌ No     | `collection_view type = "table"`    |      |
| Collection View Gallery  | ❌ No     | `collection_view type = "gallery"`  |      |
| Collection View Board    | ❌ No     | `collection_view type = "board"`    |      |
| Collection View List     | ❌ No     | `collection_view type = "list"`     |      |
| Collection View Calendar | ❌ No     | `collection_view type = "calendar"` |      |
| Collection View Page     | ❌ No     | `collection_view_page`              |      |
