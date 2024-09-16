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

## 1. 프로젝트 개요 및 기여 안내

react-notion-custom은 Notion의 페이지를 React 컴포넌트로 렌더링하는 강력한 라이브러리입니다. Notion의 공식 API를 활용하여 높은 수준의 호환성과 성능을 제공하며, 개발자들에게 최대한의 커스터마이징 자유도를 제공합니다.

### 주요 특징:

- Notion 공식 API 활용: 지속 가능한 개발과 안정적인 기능 제공
- 높은 커스터마이징 자유도: 개발자의 필요에 맞는 유연한 사용 가능
- 다양한 Notion 컴포넌트 지원: 지속적으로 확장되는 컴포넌트 라이브러리

react-notion-custom은 다른 유사 라이브러리와 달리 Notion의 공식 API를 직접 활용합니다. 이는 Notion의 업데이트에 신속하게 대응할 수 있고, 장기적으로 안정적이고 신뢰할 수 있는 개발을 가능하게 합니다. 우리는 이를 통해 개발자 여러분에게 더 나은 경험과 가치를 제공하고자 합니다.

현재 우리는 다양한 Notion 컴포넌트들을 지원하고 있으며, 지속적으로 더 많은 컴포넌트를 추가하고 있습니다. 여러분의 관심과 기여는 이 프로젝트를 더욱 풍성하게 만드는 원동력이 됩니다.

### 기여 안내:

우리는 개발자 커뮤니티의 적극적인 참여를 환영합니다. 버그 리포트, 새로운 기능 제안, 문서 개선 등 어떤 형태의 기여도 큰 도움이 됩니다. 기여 방법에 대한 자세한 가이드는 이 문서의 후반부에서 확인하실 수 있습니다.

### 기본 사용 예시:

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

이 예시에서 `content`는 Notion 페이지의 데이터를 나타냅니다. 데이터 가져오기 및 상세한 사용 방법은 이 문서의 후속 섹션에서 자세히 다룰 예정입니다.

react-notion-custom과 함께 여러분의 프로젝트에 Notion의 강력함을 더해보세요!

## 2. @cozy-blog/notion-client 소개 및 Notion 블록 구조

[@cozy-blog/notion-client](https://github.com/cozy-blog/svelte-notion-page/tree/temp/packages/notion-client)는 Notion의 공식 SDK를 래핑하고 확장한 라이브러리입니다. 이 라이브러리는 [Notion API](https://developers.notion.com/docs/getting-started)를 더 효과적으로 사용할 수 있게 해주는 추가 기능을 제공합니다.

### 주요 특징

1. **재귀적 블록 가져오기**: Notion의 공식 SDK는 직계 자식 블록만 가져오는 반면, 이 라이브러리는 모든 깊이의 자식 블록을 재귀적으로 가져옵니다.

2. **전체 페이지 정보 가져오기**: `fetchFullPage` 함수를 통해 페이지의 모든 블록과 그 하위 블록을 포함한 전체 페이지 정보를 가져올 수 있습니다.

### 사용 방법

먼저, [Notion API 키를 생성](https://developers.notion.com/docs/authorization)해야 합니다. API 키를 얻은 후 다음과 같이 사용할 수 있습니다:

```typescript
import { Client } from "@cozy-blog/notion-client";

const client = new Client({ auth: YOUR_NOTION_API_KEY });

// 전체 페이지 정보 가져오기
const fullPage = await client.fetchFullPage("YOUR_PAGE_ID");
```

## 3. Notion 블록 구조

Notion의 데이터 구조는 페이지와 블록으로 구성됩니다. 각 블록은 특정 타입을 가지며, 다른 블록을 포함할 수 있습니다. 자세한 API 구조는 [Notion API 문서](https://developers.notion.com/docs/getting-started)에서 확인할 수 있습니다.

### 블록의 기본 구조

모든 블록은 다음과 같은 공통 속성을 가집니다:

- `id`: 블록의 고유 식별자
- `type`: 블록의 타입 (예: "paragraph", "heading_1", "to_do" 등)
- `has_children`: 하위 블록 포함 여부 (boolean)
- `created_time`: 생성 시간
- `last_edited_time`: 마지막 수정 시간

### 블록 타입별 특성

각 블록 타입은 `[type]`이라는 키를 가지며, 이 키에 해당 타입의 고유한 데이터가 포함됩니다.

예시:

```typescript
{
  id: "block_id",
  type: "paragraph",
  paragraph: {
    rich_text: [{ type: "text", text: { content: "Hello, world!" } }]
  },
  has_children: false
}
```

### 전체 페이지 구조

`fetchFullPage` 함수로 가져온 전체 페이지 데이터는 다음과 같은 구조를 가집니다:

```typescript
type ContentfulPage = PageObjectResponse & { blocks: Block[] };

type Block = BlockObjectResponse & { blocks: Block[] };
```

여기서 `blocks` 배열은 해당 페이지 또는 블록의 모든 하위 블록을 포함하며, 이는 재귀적 구조를 가집니다.

### 주요 블록 타입

- `paragraph`: 일반 텍스트 단락
- `heading_1`, `heading_2`, `heading_3`: 제목
- `bulleted_list_item`, `numbered_list_item`: 목록 항목
- `to_do`: 체크박스 항목
- `image`: 이미지
- `code`: 코드 블록
- `quote`: 인용구
- `callout`: 강조 블록

각 블록 타입은 고유한 속성을 가지며, 이를 통해 다양한 콘텐츠를 표현할 수 있습니다.

## 4.랜더링 과정 설명

### Notion 컴포넌트 사용법

react-notion-custom의 기본 사용 인터페이스는 다음과 같습니다:

```jsx
<Notion components={customComponents}>
  <Notion.Cover src={coverImageSrc} />
  <Notion.Body>
    <Notion.Title title={pageTitle} />
    <Notion.Blocks blocks={blocks} />
  </Notion.Body>
</Notion>
```

### Components 타입

`Notion` 컴포넌트에 주입되는 `components`의 타입은 다음과 같습니다:

```typescript
type NotionComponents = Record<string, React.ComponentType<any>>;

const customComponents: NotionComponents = {
  paragraph: ParagraphComponent,
  heading_1: Heading1Component,
  // ... 기타 블록 타입에 대한 컴포넌트
};
```

여기서 `key`는 Notion 블록의 타입(예: 'paragraph', 'heading_1' 등)이고, `value`는 해당 타입을 렌더링할 React 컴포넌트입니다.

### 데이터 전처리 과정

```
+----------------------+
|    Notion API        |
|    Block Data        |
| +------------------+ |
| | Block            | |
| | - id             | |
| | - type           | |
| | - has_children   | |
| | - [type_specific]| |
| +------------------+ |
+----------------------+
           |
           | (Input)
           v
+---------------------------+
| resolveToContextedBlocks  |
| +-------------------------+
| | For each block:         |
| | +---------------------+ |
| | |resolveToContextedBlo| |
| | |ck (recursive)       | |
| | +---------------------+ |
| |   |                     |
| |   v                     |
| | Map parent-child        |
| | relationships           |
| +-------------------------+
|   |
|   v
| Map sibling relationships |
+---------------------------+
           |
           | (Output)
           v
+---------------------------+
|     ContextedBlocks       |
| +-------------------------+
| | ContextedBlock          |
| | - ...Block properties   |
| | - context:              |
| |   - previous (sibling)  |
| |   - next (sibling)      |
| |   - parent              |
| | - blocks (children)     |
| +-------------------------+
+---------------------------+
           |
           | (Used by)
           v
    +----------------+
    | Notion.Blocks  |
    | Component      |
    +----------------+
```

react-notion-custom은 Notion API에서 가져온 블록 데이터를 UI 렌더링에 최적화된 형태로 전처리합니다. 이 과정에서 `ContextedBlock`이라는 새로운 타입을 정의하여 사용합니다.

### ContextedBlock

`ContextedBlock`은 기존 `Block` 타입을 확장하여 다음과 같은 추가 정보를 포함합니다:

- 이전 블록 (형제 관계)
- 다음 블록 (형제 관계)
- 부모 블록

이러한 추가 정보는 특정 블록 컴포넌트에서 유용하게 사용될 수 있습니다.

### 전처리 함수

다음은 블록 데이터를 `ContextedBlock`으로 변환하는 전처리 함수의 예시입니다:

```typescript
function resolveToContextedBlock(
  block: Block,
  previous: ContextedBlock | null = null,
  parent: ContextedBlock | null = null,
): ContextedBlock {
  const { blocks: children } = block;
  const thisBlock: ContextedBlock = {
    ...block,
    blocks: [],
    context: { previous, parent },
  };
  if (children == null) return thisBlock;
  const childContextBlocks = [] as ContextedBlock[];
  let previousChildBlock: ContextedBlock | null = null;
  children.forEach((child, i) => {
    const contextChildBlock = resolveToContextedBlock(
      child,
      previousChildBlock,
      thisBlock,
    );
    childContextBlocks[i] = contextChildBlock;
    previousChildBlock = contextChildBlock;
  });
  thisBlock.blocks = childContextBlocks;
  return thisBlock;
}

function resolveToContextedBlocks(blocks: Block[]) {
  const contextedBlocks = blocks.map((block) =>
    resolveToContextedBlock(block, null, null),
  );
  contextedBlocks.forEach((current, i) => {
    if (i !== 0) {
      current.context.previous = contextedBlocks[i - 1];
    }
    if (i < contextedBlocks.length - 1) {
      current.context.after = contextedBlocks[i + 1];
    }
  });
  return contextedBlocks;
}
```

### 렌더링 프로세스

```
+-------------------+      +------------------+
|   Custom          |      |   Default        |
|   Components      |      |   Components     |
+-------------------+      +------------------+
          |                         |
          |   +-----------------+   |
          +-->|     Notion      |<--+
              |    Component    |
              |(React.Provider) |
              +-----------------+
                    |     |
         +----------+     +------------+
         |                             |
+----------------+             +----------------+
| Notion.Cover   |             | Notion.Body    |
+----------------+             +----------------+
                                       |
                               +----------------+
                               | Notion.Title   |
                               +----------------+
                                       |
                               +----------------+
                               | Notion.Blocks  |
                               +----------------+
                                       |
                                       v
                               +----------------+
                               | Rendered       |
                               | Notion Page    |
                               +----------------+
```

### Notion 컴포넌트

`Notion` 컴포넌트는 전체 Notion 페이지의 컨테이너 역할을 합니다. 이 컴포넌트는 React Context를 사용하여 커스텀 컴포넌트를 하위 컴포넌트들에게 제공합니다.

```jsx
import React from "react";
import { NotionContext } from "./context";
import { defaultComponents } from "./components";

export function Notion({ components, children }) {
  const mergedComponents = { ...defaultComponents, ...components };
  return (
    <NotionContext.Provider value={mergedComponents}>
      {children}
    </NotionContext.Provider>
  );
}
```

### Notion.Blocks 컴포넌트

`Notion.Blocks` 컴포넌트는 블록 데이터의 전처리와 렌더링을 담당합니다.

```jsx
import React, { useMemo } from "react";
import { resolveToContextedBlocks } from "./utils";
import { InternalBlocks } from "./InternalBlocks";

export function Blocks({ blocks }) {
  const contextedBlocks = useMemo(
    () => resolveToContextedBlocks(blocks),
    [blocks],
  );

  return <InternalBlocks blocks={contextedBlocks} />;
}

Notion.Blocks = Blocks;
```

### InternalBlocks 컴포넌트

`InternalBlocks` 컴포넌트는 실제로 블록을 재귀적으로 렌더링하는 역할을 합니다.

```jsx
import React, { useContext } from "react";
import { NotionContext } from "./context";

export function InternalBlocks({ blocks }) {
  const components = useContext(NotionContext);

  return blocks.map((block) => {
    const Component = components[block.type] || components.fallback;
    return (
      <Component key={block.id} {...block}>
        {block.has_children && <InternalBlocks blocks={block.blocks} />}
      </Component>
    );
  });
}
```

### 컴포넌트 커스터마이징

사용자는 `Notion` 컴포넌트에 `components` prop을 통해 커스텀 컴포넌트를 제공할 수 있습니다:

```jsx
import { Notion } from "react-notion-custom";
import CustomParagraph from "./CustomParagraph";

const customComponents = {
  paragraph: CustomParagraph,
};

function MyNotionPage({ blocks }) {
  return (
    <Notion components={customComponents}>
      <Notion.Blocks blocks={blocks} />
    </Notion>
  );
}
```

### 요약

1. 블록 데이터는 `ContextedBlock`으로 전처리되어 추가적인 컨텍스트 정보를 포함합니다.
2. `Notion` 컴포넌트는 커스텀 컴포넌트를 Context를 통해 제공합니다.
3. `Notion.Blocks` 컴포넌트는 재귀적으로 블록을 렌더링합니다.
4. 각 블록은 제공된 커스텀 컴포넌트 또는 기본 컴포넌트를 사용하여 렌더링됩니다.
5. 사용자는 커스텀 컴포넌트를 제공하여 렌더링을 커스터마이징할 수 있습니다.

이 구조는 유연성과 확장성을 제공하며, Notion의 복잡한 문서 구조를 효과적으로 렌더링하면서도 사용자의 요구에 맞게 조정할 수 있게 합니다.

## 5. 프로젝트 구조

react-notion-custom 프로젝트의 구조는 다음과 같습니다:

```
react-notion-custom/
├── lib/
│   ├── index.ts
│   ├── index.css
│   ├── components/
│   │   ├── paragraph.tsx
│   │   ├── heading-1.tsx
│   │   ├── toggle.tsx
│   │   └── ...
│   └── types.ts
└── ...
```

### 주요 파일 및 폴더 설명

1. `lib/index.ts`

   - 이 파일은 라이브러리의 최종 진입점입니다.
   - 번들링 시 이 파일을 기준으로 패키지가 생성됩니다.
   - `Notion`, `NotionBlocks`, `NotionBody` 등의 주요 컴포넌트가 여기서 정의되고 export됩니다.

2. `lib/index.css`

   - Notion 컴포넌트들의 기본 스타일을 정의한 스타일시트입니다.

3. `lib/components/`

   - 사전 정의된 Notion 블록 컴포넌트들이 위치한 폴더입니다.
   - 각 파일은 특정 Notion 블록 타입에 대응하는 React 컴포넌트를 포함합니다.
   - 예: `paragraph.tsx`, `heading-1.tsx`, `toggle.tsx` 등

4. `lib/types.ts`
   - 프로젝트에서 사용되는 타입 정의들이 모여있는 파일입니다.
   - `ContextedBlock` 등의 주요 타입이 여기서 정의됩니다.

### 코드 스타일 및 구조적 특징

1. 파일 및 폴더 명명 규칙

   - 모든 파일명과 폴더명은 소문자로 작성됩니다.
   - 띄어쓰기가 필요한 경우 대시(-)로 구분합니다.

2. 모듈 구조

   - 각 모듈에서 외부로 export하는 컴포넌트와 함수는 파일의 최상단에 위치시킵니다.
   - 내부 구현에 사용되는 함수나 컴포넌트는 export되는 항목들 아래에 배치합니다.

3. 컴포넌트 작성 스타일

   - React 컴포넌트들은 호이스팅을 고려하여 `function` 키워드를 사용해 선언합니다.

4. 내부 사용 컴포넌트
   - 특정 파일 내에서만 사용되는 컴포넌트나 함수는 별도의 파일로 분리하지 않고, 해당 파일 내에서 정의하고 사용합니다.

이러한 구조와 규칙들은 프로젝트의 일관성을 유지하고, 다른 개발자들이 쉽게 이해하고 기여할 수 있도록 돕습니다. 또한, 번들 크기를 최적화하고 효율적인 트리 쉐이킹을 가능하게 하는 구조를 지향합니다.
