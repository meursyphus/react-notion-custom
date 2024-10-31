# 기여 가이드

## 목차

1. 소개
   - 1.1 프로젝트 개요
   - 1.2 우리 프로젝트의 특별한 점
   - 1.3 프로젝트 구조
2. 기여 가이드라인
   - 2.1 기여 프로세스
   - 2.2 PR 승인 프로세스
   - 2.3 메인테이너와 기여자의 역할
   - 2.4 이슈와 PR 관리
3. 개발 환경 및 가이드라인
   - 3.1 개발 환경 설정
   - 3.2 PreviewJS 설정
   - 3.3 컴포넌트 개발 가이드라인
4. 프로젝트 로드맵
5. 프로젝트 구조 설명

## 1. 소개

NotionPresso 프로젝트에 관심을 가져주셔서 감사합니다!

우리의 목표는 Notion의 강력한 콘텐츠 관리 기능과 React의 유연한 UI 구현을 결합하여, 개발자들이 Notion을 기반으로 커스텀 블로그나 웹사이트를 쉽게 만들 수 있도록 하는 것입니다.

```jsx
<Notion>
  <Notion.Cover src={content.cover} />
  <Notion.Body>
    <Notion.Title title={content.title} />
    <Notion.Blocks blocks={content.blocks} />
  </Notion.Body>
</Notion>
```

### 우리 프로젝트의 특별한 점

NotionPresso는 다음과 같은 특징으로 다른 유사 라이브러리들과 차별화됩니다:

1. **Notion 공식 API 사용**: Notion의 공식 API를 직접 활용하여 더 안정적이고 최신 기능을 지원할 수 있습니다.

2. **최대한의 커스터마이징 자유도**: 개발자들에게 최대한의 자유를 제공합니다. 원하는 대로 컴포넌트를 수정하고 스타일을 변경할 수 있습니다.

3. **고수준의 Notion 컴포넌트**: 실제 Notion과 거의 동일하게 보이는 고품질 컴포넌트를 제공합니다. 이를 통해 사용자들은 친숙하고 전문적인 UI를 쉽게 구현할 수 있습니다.

4. **성능 최적화**: 효율적인 렌더링과 데이터 관리를 통해 큰 Notion 페이지도 빠르게 로드하고 표시할 수 있습니다.

이러한 특징들을 통해 NotionPresso는 Notion의 파워와 React의 유연성을 동시에 제공하는 최고의 도구가 되고자 합니다.

### 프로젝트 구조

```
notionpresso/
├── packages/
│   ├── core/              # @notionpresso/react 패키지
│   └── story/            # 컴포넌트 스토리
├── README.md
└── CONTRIBUTING.md
```

- `core`: Notion API를 사용하여 Notion 페이지를 React 컴포넌트로 렌더링하는 핵심 라이브러리
- `story`: Storybook을 사용한 UI 컴포넌트 테스트 및 문서화

### 초기 설정

프로젝트를 시작하려면 루트 디렉토리에서 다음 명령어를 실행하세요:

```
npm install
```

## 2. 기여 가이드라인

### 2.1 기여 프로세스

1. 프로젝트를 Fork 합니다.
2. 로컬에 클론합니다: `git clone https://github.com/notionpresso/react.git`
3. 의존성을 설치합니다: `npm install`
4. 새 브랜치를 만듭니다: `git checkout -b feature/your-feature-name`
   - 브랜치 이름은 `feature/`, `fix/`, `docs/` 등으로 시작하고 간단한 설명이 뒤따릅니다.
5. 변경사항을 커밋합니다: `git commit -m "Add some feature"`
6. Fork한 저장소에 푸시합니다: `git push origin feature/your-feature-name`
7. Pull Request를 생성합니다.

작업 중 중간 리뷰나 피드백을 요청하고 싶다면 PR 제목에 `[DRAFT]`를 붙일 수 있습니다.

### 2.2 PR 승인 프로세스

모든 Pull Request는 프로젝트 메인테이너인 문대승의 승인이 필요합니다.
PR은 모두 영어로 작성해주세요.

### 2.3 메인테이너와 기여자의 역할

- 메인테이너: 프로젝트 방향을 결정하고 코드 리뷰를 담당합니다.
- 기여자: 버그 수정, 새로운 기능 제안 및 구현, 문서 개선 등에 참여할 수 있습니다.

### 2.4 이슈와 PR 관리

- 메인테이너와 기여자 모두 자유롭게 이슈를 생성하고 해결할 수 있습니다.
- 메인테이너는 PR 요청 시 기능별로 별도의 브랜치를 생성해야 합니다.
- main 브랜치로의 직접 푸시는 금지됩니다.

## 3. 개발 환경 및 가이드라인

### 3.1 개발 환경 설정

1. mise 설치:

   - mise는 모든 기여자가 동일한 Node.js 버전을 사용하도록 보장하는 다중 언어 개발 환경 관리자입니다.
   - https://mise.jdx.dev/getting-started.html 의 지침에 따라 mise를 설치하세요.

2. 프로젝트 클론 및 mise 설정:

   - 프로젝트를 클론한 후 프로젝트 루트 디렉토리로 이동합니다.
   - `mise install`을 실행하여 지정된 Node.js 버전을 설치합니다.

3. Node.js 설치 확인:

   - `node -v`를 실행하여 올바른 Node.js 버전이 설치되었는지 확인합니다.
   - 버전은 프로젝트 루트의 `.mise.toml` 파일에 지정된 것과 일치해야 합니다.

4. 프로젝트 의존성 설치:
   - 루트 디렉토리에서 `npm install`을 실행하여 모든 의존성을 설치합니다.

참고: mise를 사용하면 시스템에 설치된 다른 Node.js 버전에 관계없이 이 프로젝트에 지정된 정확한 Node.js 버전을 사용할 수 있습니다.

### 3.2 PreviewJS 설정

PreviewJS를 사용하면 에디터에서 직접 Storybook을 볼 수 있어서 개발에 매우 편리합니다.

1. VSCode에 [PreviewJS](https://previewjs.com/) 확장을 설치합니다.
2. 프로젝트를 열고 각 스토리 코드에서 "Open Preview"를 선택합니다.

### 3.3 컴포넌트 개발 가이드라인

NotionPresso 컴포넌트를 개발할 때는 다음 가이드라인을 따라주세요:

1. Storybook 개발:

   - 각 컴포넌트에 대한 스토리를 작성하고 Storybook을 통해 다양한 상태와 props를 테스트합니다.
   - 루트 디렉토리에서 `npm run story:start`로 Storybook을 실행할 수 있습니다.

2. PreviewJS 사용:

   - VSCode에서 PreviewJS를 사용하면 에디터에서 직접 Storybook을 보면서 개발할 수 있어 매우 효율적입니다.

3. 컴포넌트 이름 및 구조:
   - 컴포넌트 이름은 PascalCase로 작성합니다.
   - 컴포넌트 파일 이름과 폴더 이름은 kebab-case를 사용합니다. 즉, 모든 단어를 소문자로 쓰고 하이픈(-)으로 구분합니다. 예) `text-block.tsx`

## 4. 프로젝트 로드맵

### 1. @notionpresso/react 라이브러리 개발 및 배포

### 2. @notionpresso/cli 도구 개발 및 배포

### 3. docs 프로젝트 개발

- 프로젝트 소개 페이지 작성
  - NextJS를 사용한 블로그 작성 예제 포함
- 상세 사용 가이드 및 API 문서 작성
- 프로젝트 블로그 운영
  - 정기적인 업데이트와 변경 로그 공유

각 단계의 진행 상황과 세부 내용은 이슈 트래커에서 확인할 수 있습니다.

## 5. 프로젝트 구조 설명

### @notionpresso/react와 @notionpresso/cli의 역할

1. **@notionpresso/cli**:

   - Notion API를 사용하여 특정 Notion 페이지의 내용을 가져옵니다.
   - 가져온 데이터를 JSON 형식으로 변환하여 로컬에 저장합니다.
   - `npx npresso` 명령어를 통해 사용할 수 있습니다.
   - 이 과정을 통해 Notion 페이지의 구조와 내용을 쉽게 분석하고 활용할 수 있습니다.

2. **@notionpresso/react**:
   - @notionpresso/cli가 생성한 JSON 데이터를 입력으로 받습니다.
   - JSON 데이터를 분석하여 해당하는 React 컴포넌트로 변환합니다.
   - 각 Notion 블록 타입(텍스트, 이미지, 테이블 등)에 대응하는 React 컴포넌트를 제공합니다.
   - 사용자는 이 컴포넌트들을 커스터마이징하여 원하는 스타일과 기능을 추가할 수 있습니다.

### 프로세스 다이어그램

다음 ASCII 아트는 NotionPresso를 통해 Notion 페이지를 렌더링하는 과정을 나타냅니다:

```
+-------------+     +----------------+     +------------------+
|   Notion    |     | @notionpresso/ |     | @notionpresso/   |
|   Page      | --> |      cli       | --> |      react       |
+-------------+     +----------------+     +------------------+
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

이 과정을 통해 사용자는 Notion 페이지 내용을 그대로 가져와서 React 애플리케이션에서 렌더링할 수 있으며, 필요에 따라 스타일과 기능을 커스터마이징할 수 있습니다.

---

각 하위 프로젝트별 기여 가이드:

- [@notionpresso/react 기여 방법](./packages/core/CONTRIBUTING.md)
  - React 컴포넌트 개발, Notion API 통합, 성능 최적화 등

각 프로젝트의 자세한 기여 방법은 해당 링크를 참조해주세요.
