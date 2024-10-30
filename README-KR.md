# NotionPresso: Notion으로 나만의 맞춤 블로그 만들기

[영문 버전(English Version)](./README.md)

## 🚀 Notion + React로 나만의 웹사이트를 만들어보세요!

NotionPresso를 사용하면 Notion의 강력한 콘텐츠 관리 기능과 React의 유연한 UI를 결합하여 완전히 맞춤화 가능한 웹사이트나 블로그를 만들 수 있습니다. 복잡한 CMS나 데이터베이스 설정에 시간을 낭비하지 마세요. Notion에서 콘텐츠를 관리하고 NotionPresso로 멋진 웹사이트를 만들어보세요!

### 이 프로젝트는 두 가지 핵심 도구로 구성되어 있습니다:

1. **@notionpresso/cli**: Notion 페이지에서 콘텐츠를 추출하여 JSON 파일로 변환합니다.
2. **@notionpresso/react**: 추출된 Notion 콘텐츠를 React 컴포넌트로 렌더링합니다.

## 🌟 주요 기능

- **Notion 공식 API 사용**: 항상 안정적이고 최신 기능을 지원합니다.
- **완벽한 커스터마이징**: 모든 컴포넌트를 원하는 대로 수정하고 스타일링할 수 있습니다.
- **고품질 Notion 컴포넌트**: 실제 Notion과 똑같이 보이는 컴포넌트를 제공합니다.
- **최적화된 성능**: 대용량 Notion 페이지도 빠르게 로드하고 렌더링합니다.
- **쉬운 콘텐츠 관리**: Notion에서 직접 콘텐츠를 관리하고 실시간으로 웹사이트에 반영할 수 있습니다.

## 🚀 시작하기: 나만의 Notion 블로그 만들기

### 1. Notion 페이지 준비하기

1. Notion에서 새 페이지를 만들고 콘텐츠를 작성합니다.
2. 페이지를 공개로 설정하고 공유 링크를 복사합니다.

### 2. Notion 페이지 ID 얻기

1. Notion에서 콘텐츠 페이지로 이동합니다.
2. 오른쪽 상단의 '공유' 버튼을 클릭하고 '웹에 공유' 옵션을 활성화하여 페이지를 공개로 설정합니다.
3. 링크를 복사합니다. URL은 다음과 같은 형식입니다:
   ```
   https://www.notion.so/your-page-title-1234567890abcdef12345678
   ```
4. URL의 마지막 부분(예: `1234567890abcdef12345678`)이 페이지 ID입니다.

### 3. Notion 통합 토큰 얻기

1. [Notion 개발자 포털](https://www.notion.so/my-integrations)로 이동합니다.
2. '새 통합 만들기'를 클릭하여 새 통합을 생성합니다.
3. 통합 이름과 권한을 설정한 후 '제출'을 클릭합니다.
4. 생성된 **Internal Integration Token**을 복사하여 저장합니다.

### 4. @notionpresso/cli로 콘텐츠 추출하기

```bash
npx npresso --page-id YOUR_PAGE_ID --token YOUR_INTEGRATION_TOKEN
```

### 5. React 프로젝트 설정하기

```bash
npm create vite@latest my-notion-blog -- --template react-ts
cd my-notion-blog
npm install @notionpresso/react
```

### 6. @notionpresso/react로 페이지 렌더링하기

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

### 7. 배포하기

Next.js 앱을 Vercel이나 Netlify에 배포하고 여러분의 Notion 블로그를 세상에 공개하세요!

## 📚 상세 사용법

더 자세한 사용 지침과 고급 커스터마이징 옵션은 [미완성] 을 참조해 주세요.

## 🛠 설치

```bash
npm install @notionpresso/react @notionpresso/cli
```

## 🗺 로드맵

1. 다양한 Notion 블록 유형에 대한 지원 확대
2. 코드 분할 및 데이터 캐싱을 포함한 성능 최적화
3. SEO 최적화 도구 통합
4. 다국어 지원 강화

자세한 개발 계획은 [CONTRIBUTING-KR.md](./CONTRIBUTING-KR.md)를 참조해 주세요.

## 🤝 기여하기

React-Notion-Custom은 여러분의 기여를 환영합니다! 버그 리포트, 기능 제안, 또는 코드 기여 등 어떤 형태로든 참여해 주세요. 자세한 내용은 [CONTRIBUTING-KR.md](./CONTRIBUTING-KR.md)를 확인해 주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조해 주세요.

## 📮 연락처

질문이나 피드백이 있으시면 [GitHub 이슈](https://github.com/notionpresso/react/issues)를 생성하거나 [이메일](https://helper.notionpresso@gmail.com)로 연락해 주세요.

---

NotionPresso로 Notion 콘텐츠를 이용해 멋진 웹사이트를 만들어보세요! 🎉
