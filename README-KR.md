# react-notion-custom

React로 만드는 강력하고 유연한 Notion 페이지 렌더러

## 소개

react-notion-custom은 Notion의 강력한 콘텐츠 관리 기능과 React의 유연한 UI 구현 능력을 결합한 라이브러리입니다. 이 프로젝트는 개발자들이 Notion API를 활용하여 쉽게 커스터마이징 가능한 블로그나 웹사이트를 만들 수 있도록 돕습니다.

### 주요 특징

- **Notion 공식 API 사용**: 안정적이고 최신 기능을 지원합니다.
- **최대한의 커스텀 자유도**: 원하는 대로 컴포넌트를 수정하고 스타일을 변경할 수 있습니다.
- **고수준의 Notion 컴포넌트**: 실제 Notion과 유사한 고품질 컴포넌트를 제공합니다.
- **성능 최적화**: 대규모 Notion 페이지도 빠르게 로드하고 표시합니다.

## 설치

npm을 사용하여 react-notion-custom을 설치할 수 있습니다:

```bash
npm install react-notion-custom
```

## 기본 사용법

```jsx
import { Notion } from "react-notion-custom";

function MyNotionPage({ content }) {
  return (
    <Notion>
      <Notion.Cover src={content.cover} />
      <Notion.Body>
        <Notion.Title title={content.title} />
        <Notion.Blocks blocks={content.blocks} />
      </Notion.Body>
    </Notion>
  );
}
```

더 자세한 사용 방법은 [문서](https://your-docs-url.com)를 참조하세요.

## 프로젝트 구조

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

## 기여하기

react-notion-custom은 오픈소스 프로젝트로, 커뮤니티의 기여를 환영합니다. 기여 방법에 대한 자세한 내용은 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참조하세요.

## 로드맵

현재 진행 중인 주요 개발 항목:

1. 기본 Notion 블록 컴포넌트 구현
2. 고급 Notion 기능 지원 (데이터베이스 뷰, Synced Blocks 등)
3. 성능 최적화 및 코드 스플리팅
4. 테마 시스템 구현

자세한 로드맵은 [여기](./CONTRIBUTING-KR.md)에서 확인할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

## 연락처

질문이나 피드백이 있으시면 [이슈](https://github.com/your-repo/react-notion-custom/issues)를 생성하거나 [이메일](tmdeoans@snu.ac.kr)로 연락주세요.

---

react-notion-custom과 함께 여러분의 Notion 콘텐츠를 React로 쉽게 렌더링하세요!
