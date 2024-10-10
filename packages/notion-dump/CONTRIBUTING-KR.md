# notion-dump 사용 가이드 및 기여 안내

[프로젝트 전체 기여 가이드 참고](../../CONTRIBUTING-KR.md)

## 목차

1. 개요
2. 설치 및 사용 방법
3. Notion API 설정
4. CLI 옵션
5. 출력 구조
6. 개발 및 테스트
7. 기여 가이드

## 1. 개요

notion-dump는 Notion 페이지의 데이터를 추출하여 로컬 파일 시스템에 JSON 형식으로 저장하는 CLI 도구입니다. 이 도구는 내부적으로 @cozy-blog/notion-client 라이브러리를 사용하여 Notion API와 통신합니다. Next.js 프로젝트 구조를 기본적으로 지원하며, 이미지 처리 기능을 포함하고 있습니다.

## 2. 설치 및 사용 방법

### 로컬에서 실행하기

1. 프로젝트 클론 및 디렉토리 이동

   ```bash
   git clone https://github.com/meursyphus/react-notion-custom.git
   cd react-notion-custom
   ```

2. 의존성 설치

   ```bash
   npm install
   ```

3. 프로젝트 빌드

   ```bash
   npm run cli:build
   ```

4. 스크립트 실행

   ```bash
   node ./packages/notion-dump/dist/notion-dump.es.js --page <NotionPageURL> --auth <YourAPIToken>
   ```

   또는 npm link를 사용하여 전역 명령어처럼 사용:

   ```bash
   npm link
   notion-dump --page <NotionPageURL> --auth <YourAPIToken>
   npm unlink
   ```

## 3. Notion API 설정

1. Notion API 토큰 발급받기

   - Notion 개발자 페이지에서 새 통합 생성
   - "Read content" 권한 선택
   - Internal Integration Token 복사

2. 통합을 Notion 페이지에 연결하기

   - 대상 페이지의 "연결" 설정에서 통합 추가

3. Notion 페이지 URL 얻기
   - 페이지 URL 복사 (쿼리 스트링 포함해도 가능)

## 4. CLI 옵션

notion-dump는 다음과 같은 CLI 옵션을 제공합니다:

- `--page <NotionPageURL>`: (필수) Notion 페이지 URL
- `--auth <YourAPIToken>`: (필수) Notion API 토큰
- `--dir <path>`: JSON 파일이 저장될 디렉토리를 지정합니다. 기본값은 `./notion-data`입니다.
- `--image-dir <path>`: 이미지 파일이 저장될 디렉토리를 지정합니다. 기본값은 `./public/notion-data`입니다.

예시:

```bash
notion-dump --page https://www.notion.so/mypage --auth secret_token --dir ./my-data --image-dir ./public/my-notion-data
```

## 5. 출력 구조

notion-dump는 기본적으로 Next.js 프로젝트 구조를 고려하여 데이터를 저장합니다:

```
my-notion-blog/
├── notion-data/
│   ├── page-id-1.json
│   ├── page-id-2.json
│   └── ...
└── public/
    └── notion-data/
        ├── page-id-1/
        │   ├── image1.png
        │   └── image2.jpg
        ├── page-id-2/
        │   └── image1.png
        └── ...
```

- `notion-data/`: 각 Notion 페이지의 내용과 구조를 담은 JSON 파일이 저장됩니다. 파일명은 페이지 ID를 기반으로 합니다.
- `public/notion-data/`: 페이지에 포함된 이미지들이 각 페이지 ID별로 구분되어 저장됩니다. 이 구조는 Next.js의 정적 파일 제공 방식과 호환됩니다.

JSON 파일 내의 이미지 URL은 자동으로 로컬 경로로 변환되어 저장됩니다.

## 6. 개발 및 테스트

- TypeScript 컴파일: `npm run build`
- 의존성 추가: package.json 업데이트 후 `npm install`

## 7. 기여 가이드

### 7.1 현재 개발된 기능

- CLI 스크립트 개발
- 페이지 데이터 추출
- 기본 출력 디렉토리 관리
- 이미지 처리 기능

### 7.2 개발 중인 기능

- 하위 페이지 및 데이터베이스 지원
- 다양한 출력 형식 지원
- 문서화 및 예제 개선

### 7.3 기여 방법

1. 이슈 확인
2. 포크 및 브랜치 생성
3. 코드 작성 및 커밋
4. 풀 리퀘스트 생성
5. 코드 리뷰 및 머지

notion-dump의 발전에 여러분의 참여가 큰 힘이 됩니다. 함께 더 나은 도구를 만들어 나가요!
