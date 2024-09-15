# Contributing Guide

## 1. 소개

react-notion-custom 프로젝트에 관심을 가져주셔서 감사합니다!

우리의 목표는 Notion의 강력한 콘텐츠 관리 기능과 React의 유연한 UI 구현 능력을 결합하여, 개발자들이 쉽게 Notion 기반의 커스텀 블로그나 웹사이트를 만들 수 있게 하는 것입니다.

### 우리 프로젝트의 특별한 점

react-notion-custom은 다음과 같은 특징으로 다른 유사 라이브러리들과 차별화됩니다:

1. **Notion 공식 API 사용**: 우리는 Notion의 공식 API를 직접 활용합니다. 이를 통해 더 안정적이고 최신의 기능들을 지원할 수 있습니다.

2. **최대한의 커스텀 자유도**: 개발자들에게 최대한의 자유를 제공합니다. 원하는 대로 컴포넌트를 수정하고 스타일을 변경할 수 있습니다.

3. **고수준의 Notion 컴포넌트**: 우리는 실제 Notion과 거의 동일하게 보이는 고품질의 컴포넌트를 제공합니다. 이를 통해 사용자들에게 친숙하고 전문적인 느낌의 UI를 쉽게 구현할 수 있습니다.

4. **성능 최적화**: 효율적인 렌더링과 데이터 관리를 통해 대규모 Notion 페이지도 빠르게 로드하고 표시할 수 있습니다.

이러한 특징들을 통해, react-notion-custom은 개발자들에게 Notion의 강력함과 React의 유연성을 모두 제공하는 최고의 도구가 될 것입니다.

### 프로젝트 구조

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

- `react-notion-custom`: Notion API를 활용해 Notion 페이지를 React 컴포넌트로 렌더링하는 핵심 라이브러리
- `notion-dump`: Notion 페이지의 데이터를 추출하여 JSON 파일로 저장하는 CLI 도구
- `docs`: 프로젝트 문서 및 예제를 포함한 웹사이트
- `story`: Storybook을 이용한 UI 컴포넌트 테스트 및 문서화

### 초기 설정

프로젝트를 시작하려면 루트 디렉토리에서 다음 명령어를 실행하세요:

```
npm install
```

## 2. 기여 가이드라인

### PR 승인 프로세스

모든 Pull Request는 프로젝트 메인테이너 (@username)의 승인이 필요합니다.

### 메인테이너와 컨트리뷰터의 역할

- 메인테이너: 프로젝트의 방향성을 결정하고 코드 리뷰를 담당합니다.
- 컨트리뷰터: 버그 수정, 새로운 기능 제안 및 구현, 문서 개선 등에 참여할 수 있습니다.

### 이슈 및 PR 관리

- 메인테이너와 컨트리뷰터 모두 자유롭게 이슈를 생성하고 해결할 수 있습니다.
- 메인테이너는 기능별로 브랜치를 분리하여 PR을 요청해야 합니다.
- main 브랜치에 직접 push하는 것은 금지됩니다.

## 3. 개발 환경

우리는 PreviewJS와 VSCode를 활용하여 개발을 진행합니다. 이를 통해 각 컴포넌트를 브라우저에서 실시간으로 확인하면서 작업할 수 있습니다.

PreviewJS 설정 방법:

1. VSCode에서 PreviewJS 확장 프로그램을 설치합니다.
2. 프로젝트를 열고 컴포넌트 파일에서 우클릭 후 "Open Preview" 옵션을 선택합니다.

## 4. 프로젝트 로드맵

1. react-notion-custom 라이브러리 개발 및 배포
2. notion-dump CLI 도구 개발 및 배포
3. docs 프로젝트 개발
   - 프로젝트 소개 페이지 작성
     - NextJS를 활용한 블로그 작성 예제 포함
   - 상세한 사용 가이드 및 API 문서 작성
   - 프로젝트 블로그 운영
     - 정기적인 업데이트 및 changelog 공유

각 단계의 진행 상황과 세부 사항은 이슈 트래커에서 확인할 수 있습니다.

---

# 프로젝트 구조 설명

### react-notion-custom과 notion-dump의 역할

1. **notion-dump**:

   - Notion API를 사용하여 특정 Notion 페이지의 내용을 가져옵니다.
   - 가져온 데이터를 JSON 형식으로 변환하여 로컬에 저장합니다.
   - 이 과정을 통해 Notion 페이지의 구조와 내용을 쉽게 분석하고 사용할 수 있게 됩니다.

2. **react-notion-custom**:
   - notion-dump로 생성된 JSON 데이터를 입력으로 받습니다.
   - JSON 데이터를 분석하여 해당하는 React 컴포넌트로 변환합니다.
   - Notion의 각 블록 타입(텍스트, 이미지, 표 등)에 대응하는 React 컴포넌트를 제공합니다.
   - 사용자는 이 컴포넌트들을 커스터마이징하여 원하는 스타일과 기능을 추가할 수 있습니다.

### 프로세스 도식화

다음은 Notion 페이지가 react-notion-custom을 통해 렌더링되는 과정을 아스키 아트로 표현한 것입니다:

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

이 프로세스를 통해 사용자는 Notion 페이지의 내용을 그대로 가져와 React 애플리케이션에서 렌더링할 수 있으며, 필요에 따라 스타일과 기능을 커스터마이징할 수 있습니다.

---

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
| Bulleted List            | ❌ No     | `bulleted_list<ul>`                 |      |
| Numbered List            | ❌ No     | `numbered_list<ol>`                 |      |
| Heading 1                | ❌ No     | `header<h1>`                        |      |
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
