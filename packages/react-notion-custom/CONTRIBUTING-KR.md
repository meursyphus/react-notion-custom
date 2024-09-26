# react-notion-custom 기여 안내

[프로젝트 전체 기여 가이드 참고](../../CONTRIBUTING-KR.md)

## 목차

1. 프로젝트 개요 및 기여 안내
2. @cozy-blog/notion-client 소개
3. Notion 블록 구조
4. 렌더링 과정 설명
5. 프로젝트 구조
6. 새 컴포넌트 작성 가이드
7. Notion 데이터 가져오기 가이드
8. 지원되는 Notion 블록 타입
9. 프로젝트 로드맵

## 1. 개요

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

### Notion 블록 구조

Notion의 데이터 구조는 페이지와 블록으로 구성됩니다. 각 블록은 특정 타입을 가지며, 다른 블록을 포함할 수 있습니다. 자세한 API 구조는 [Notion API 문서](https://developers.notion.com/docs/getting-started)에서 확인할 수 있습니다.

#### 블록의 기본 구조

모든 블록은 다음과 같은 공통 속성을 가집니다:

- `id`: 블록의 고유 식별자
- `type`: 블록의 타입 (예: "paragraph", "heading_1", "to_do" 등)
- `has_children`: 하위 블록 포함 여부 (boolean)
- `created_time`: 생성 시간
- `last_edited_time`: 마지막 수정 시간

#### 블록 타입별 특성

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

#### 전체 페이지 구조

`fetchFullPage` 함수로 가져온 전체 페이지 데이터는 다음과 같은 구조를 가집니다:

```typescript
type ContentfulPage = PageObjectResponse & { blocks: Block[] };

type Block = BlockObjectResponse & { blocks: Block[] };
```

여기서 `blocks` 배열은 해당 페이지 또는 블록의 모든 하위 블록을 포함하며, 이는 재귀적 구조를 가집니다.

#### 주요 블록 타입

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
5. `lib/utils/`
   - 여러 곳에서 쓰는 함수들은 전부 이 폴더에 모여있습니다.

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

## 6. 새 컴포넌트 작성 가이드

### 개요

react-notion-custom 프로젝트에 새 컴포넌트를 추가할 때는 다음 가이드라인을 따라주세요. 이 가이드라인은 프로젝트의 일관성을 유지하고 개발 프로세스를 표준화하는 데 도움이 됩니다.

### 참고 자료

전체적인 디자인과 HTML 구조는 [svelte-notion-page](https://github.com/cozy-blog/svelte-notion-page/tree/temp/packages/svelte-notion-page) 라이브러리의 컨벤션을 따릅니다. 이 라이브러리는 우리가 만들고자 하는 라이브러리의 Svelte 버전입니다.

### 컴포넌트 작성 규칙

1. 파일 위치: 새 컴포넌트는 `lib/components/` 폴더 아래에 생성합니다.
2. 파일명: 컴포넌트 이름은 소문자로 작성하고, 띄어쓰기는 대시(-)로 구분합니다. (예: `numbered-list-item.tsx`)
3. 컴포넌트 구조:
   - 최상위 요소에는 항상 `notion-block` 클래스를 추가합니다.
   - 컴포넌트 이름을 딴 `notion-{컴포넌트 이름}` 클래스도 최상위 요소에 추가합니다.
   - 가능한 한 시맨틱 태그를 사용합니다.
4. CSS: 모든 스타일은 `lib/index.css`에 정의합니다. 컴포넌트 파일 내부에 스타일을 작성하지 않습니다.
5. 모든 css 클래스명은 `notion-`으로 시작합니다.

예시:

```jsx
import React from 'react';
import type { NumberedListItemArgs } from '../types';
import { getColorCss } from '../utils/getColorCss';
import { numberedListItemMarker } from '../utils/listItemMarker';
import RichText from './base/richtext/RichText';

function NumberedListItem({ props }: { props: NumberedListItemArgs }) {
  const {
    numbered_list_item: { rich_text: texts, color }
  } = props;
  const { marker, format } = numberedListItemMarker.getMarker(props);

  return (
    <ol
      data-notion-marker-format={format}
      className={`notion-block notion-list-numbered ${getColorCss(color)}`}
    >
      <li className="notion-display-contents">
        <div className="notion-list-numbered-content">
          <span data-notion-marker-format={format} className="notion-list-marker">{marker}</span>
          <p>
            <RichText props={texts} />
          </p>
        </div>
        {/* children will be rendered here */}
      </li>
    </ol>
  );
}

export default NumberedListItem;
```

#### Storybook 작성

새 컴포넌트를 추가할 때마다 해당하는 Storybook 예제도 함께 작성해야 합니다.

1. 위치: `story/stories/` 폴더 아래에 컴포넌트 이름과 동일한 폴더를 생성합니다.
2. 파일 구조:
   - `index.ts`: 해당 컴포넌트의 스토리를 정의합니다.
   - `data.json`: 렌더링에 사용할 Notion 페이지 정보를 포함합니다.

예시 (`story/stories/numbered-list-item/index.ts`):

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { NumberedListItem } from "../../../lib/components/numbered-list-item";
import data from "./data.json";

const meta: Meta<typeof NumberedListItem> = {
  title: "Notion Blocks/NumberedListItem",
  component: NumberedListItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberedListItem>;

export const Default: Story = {
  args: {
    props: data,
  },
};
```

#### 체크리스트

새 컴포넌트를 추가할 때 다음 항목을 확인해주세요:

- [ ] `lib/components/` 폴더에 새 컴포넌트 파일 추가
- [ ] `lib/components/index.ts`에 새 컴포넌트 export
- [ ] `lib/index.css`에 필요한 스타일 추가
- [ ] `story/stories/` 폴더에 해당 컴포넌트의 Storybook 예제 추가

이 가이드를 따라 새 컴포넌트를 추가하면, 프로젝트의 일관성을 유지하고 다른 개발자들이 쉽게 이해하고 사용할 수 있는 컴포넌트를 만들 수 있습니다.

## 7. Notion 데이터 가져오기 가이드

### 개요

react-notion-custom을 사용하기 위해서는 Notion 페이지의 데이터를 가져와야 합니다. 이 가이드에서는 데이터를 가져오는 두 가지 방법에 대해 설명합니다.

### 1. notion-dump 사용하기

[아직 개발되지 않아서 사용불가]

notion-dump는 현재 개발 중이며, 완성되면 Notion 페이지 데이터를 쉽게 추출할 수 있는 도구가 될 예정입니다.

### 2. @cozy-blog/notion-client 사용하기

@cozy-blog/notion-client는 Notion API를 래핑한 라이브러리로, Notion 페이지 데이터를 쉽게 가져올 수 있습니다.

#### 설치

```bash
npm install @cozy-blog/notion-client
```

#### 사용 예시

다음은 @cozy-blog/notion-client를 사용하여 Notion 페이지 데이터를 가져오는 TypeScript 스크립트 예시입니다:

```typescript
import { Client } from "@cozy-blog/notion-client";

async function fetchNotionPage() {
  // Notion API 키 설정
  const client = new Client({ auth: "YOUR_NOTION_API_KEY" });

  // 페이지 ID 설정
  const pageId = "YOUR_PAGE_ID";

  try {
    // 전체 페이지 정보 가져오기
    const fullPage = await client.fetchFullPage(pageId);

    // 결과를 콘솔에 출력
    console.log(JSON.stringify(fullPage, null, 2));

    // 또는 파일로 저장
    // require('fs').writeFileSync('notion_page_data.json', JSON.stringify(fullPage, null, 2));
  } catch (error) {
    console.error("Error fetching Notion page:", error);
  }
}

fetchNotionPage();
```

#### VSCode에서 실행하기

1. VSCode에서 Code Runner 플러그인을 설치합니다.
2. 위의 스크립트를 `.ts` 파일로 저장합니다.
3. `YOUR_NOTION_API_KEY`와 `YOUR_PAGE_ID`를 실제 값으로 교체합니다.
4. 파일을 열고 우측 상단의 실행 버튼(▶️)을 클릭하거나 `Ctrl+Alt+N`(Windows/Linux) 또는 `Control+Option+N`(Mac)을 눌러 스크립트를 실행합니다.

#### 주의사항

- Notion API 키는 보안에 주의하여 관리해야 합니다. 공개 저장소에 업로드하지 마세요.
- 가져온 데이터는 react-notion-custom 컴포넌트에 직접 전달할 수 있는 형식입니다.

이 방법을 통해 Notion 페이지 데이터를 가져와 react-notion-custom과 함께 사용할 수 있습니다.

## 8. 지원되는 Notion 블록 타입

현재 react-notion-custom에서 지원되는 Notion 블록 타입들의 목록입니다. 이 목록은 지속적으로 업데이트될 예정입니다.

| Block Type               | 지원 여부 | Block Type Enum        | 비고 |
| ------------------------ | --------- | ---------------------- | ---- |
| Paragraph                | ✅ Yes    | `paragraph`            |      |
| Heading 1                | ✅ Yes    | `heading_1`            |      |
| Heading 2                | ✅ Yes    | `heading_2`            |      |
| Heading 3                | ✅ Yes    | `heading_3`            |      |
| Bulleted List Item       | ✅ Yes    | `bulleted_list_item`   |      |
| Numbered List Item       | ❌ No     | `numbered_list_item`   |      |
| To-do                    | ❌ No     | `to_do`                |      |
| Toggle                   | ❌ No     | `toggle`               |      |
| Quote                    | ❌ No     | `quote`                |      |
| Callout                  | ❌ No     | `callout`              |      |
| Equation                 | ❌ No     | `equation`             |      |
| Code                     | ❌ No     | `code`                 |      |
| Image                    | ❌ No     | `image`                |      |
| Video                    | ❌ No     | `video`                |      |
| Bookmark                 | ❌ No     | `bookmark`             |      |
| Divider                  | ❌ No     | `divider`              |      |
| Table                    | ❌ No     | `table`                |      |
| Table Row                | ❌ No     | `table_row`            |      |
| Column                   | ❌ No     | `column`               |      |
| Column List              | ❌ No     | `column_list`          |      |
| Audio                    | ❌ No     | `audio`                |      |
| Synced Block             | ❌ No     | `synced_block`         |      |
| Table Of Contents        | ❌ No     | `table_of_contents`    |      |
| Embed                    | ❌ No     | `embed`                |      |
| Figma                    | ❌ No     | `figma`                |      |
| Google Maps              | ❌ No     | `maps`                 |      |
| Google Drive             | ❌ No     | `drive`                |      |
| Tweet                    | ❌ No     | `tweet`                |      |
| PDF                      | ❌ No     | `pdf`                  |      |
| File                     | ❌ No     | `file`                 |      |
| Link                     | ❌ No     | `text` (inline)        |      |
| Page Link                | ❌ No     | `page`                 |      |
| External Page Link       | ❌ No     | `text` (inline)        |      |
| Collections              | ❌ No     | -                      |      |
| Collection View          | ❌ No     | `collection_view`      |      |
| Collection View Table    | ❌ No     | `collection_view`      |      |
| Collection View Gallery  | ❌ No     | `collection_view`      |      |
| Collection View Board    | ❌ No     | `collection_view`      |      |
| Collection View List     | ❌ No     | `collection_view`      |      |
| Collection View Calendar | ❌ No     | `collection_view`      |      |
| Collection View Page     | ❌ No     | `collection_view_page` |      |

현재 모든 블록 타입이 지원되지 않고 있습니다 (❌ No). 이 프로젝트는 개발 초기 단계에 있으며, 향후 업데이트를 통해 점진적으로 더 많은 블록 타입을 지원할 예정입니다.

## 9. 프로젝트 로드맵

react-notion-custom 프로젝트의 향후 개발 계획을 소개합니다. 이 로드맵은 프로젝트의 진행 상황에 따라 변경될 수 있습니다.

### 1단계: 기본 컴포넌트 구현

우선적으로 다음 Notion 블록 타입들에 대한 지원을 구현할 예정입니다:

- Paragraph
- Heading 1, 2, 3
- Bulleted List Item
- Numbered List Item
- To-do
- Toggle
- Quote
- Callout
- Image
- Code

### 2단계: 고급 컴포넌트 구현

기본 컴포넌트 구현 후, 다음 컴포넌트들을 순차적으로 추가할 계획입니다:

- Table
- Equation
- Video
- Bookmark
- Divider
- Audio
- File

### 3단계: 성능 최적화

- 코드 스플리팅 도입
  - 무거운 모듈(예: 수식 렌더링, 코드 하이라이팅)은 별도로 분리하여 필요시에만 로드
  - 사용자 경험 개선 및 초기 로딩 시간 단축

### 4단계: 고급 기능 및 사용성 개선

- 컴파운드 컴포넌트 패턴 도입
  - 각 컴포넌트를 더 유연하고 커스터마이즈하기 쉽게 개선
  - 사용자가 컴포넌트의 개별 부분을 쉽게 수정하고 확장할 수 있도록 함
- 테마 시스템 구현
  - 사용자가 전체적인 스타일을 쉽게 변경할 수 있는 기능 추가

### 5단계: 고급 Notion 기능 지원

- 데이터베이스 뷰 (Table, Gallery, List, Calendar 등)
- Synced Blocks
- linked databases

### 지속적인 개선

- 사용자 피드백을 반영한 기존 컴포넌트 개선
- 새로운 Notion 기능에 대한 지속적인 대응
- 성능 최적화 및 버그 수정

이 로드맵은 프로젝트의 발전 방향을 제시하지만, 커뮤니티의 요구사항과 피드백에 따라 우선순위가 조정될 수 있습니다. 우리는 사용자들의 의견을 경청하고 프로젝트에 반영하기 위해 노력할 것입니다.
