# notion-dump 사용 가이드 및 기여 안내

[프로젝트 전체 기여 가이드 참고](../../CONTRIBUTING-KR.md)

## 목차

1. 개요
2. 사용 방법
3. Notion API 설정
4. 개발 및 테스트
5. 기여 가이드

## 1. 개요

notion-dump는 Notion 페이지의 데이터를 추출하여 로컬 파일 시스템에 JSON 형식으로 저장하는 CLI 도구입니다. 이 도구는 내부적으로 @cozy-blog/notion-client 라이브러리를 사용하여 Notion API와 통신합니다.

## 2. 사용 방법

### 로컬에서 실행하기

1. 프로젝트 클론 및 디렉토리 이동

   ```bash
   git clone https://github.com/meursyphus/react-notion-custom.git
   cd react-notion-custom
   ```

2. 의존성 설치

   ```bash
   // 루트 디렉토리에서 호출
   npm install
   ```

3. 프로젝트 빌드

   ```bash
   // 루트 디렉토리에서 호출
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
   - 페이지 URL 복사 (쿼리 스트링 포햄해도 가능)

## 4. 개발 및 테스트

- TypeScript 컴파일: `npm run build`
- 의존성 추가: package.json 업데이트 후 `npm install`

## 5. 기여 가이드

### 5.1 현재 개발된 기능

- CLI 스크립트 개발
- 페이지 데이터 추출
- 기본 출력 디렉토리 관리

### 5.2 아직 개발되지 않은 기능

- 이미지 처리 기능:
  이미지들을 모두 다운로드 받아서 저장합니다. block type의 image url을 다운받은 로컬 경로로 변경합니다.
  [ROOT_DIR]/
  └── [page-title_page-id]/
  ├── index.json
  └── images/
  ├── image1.jpg
  ├── image2.png
  └── ...
- Next.js 프로젝트 구조 지원
- 다양한 출력 형식 지원
  - 현재는 페이지 하나만 지원합니다. 하위 페이지나 데이터 베이스는 지원하지 않습니다.
- 문서화 및 예제 개선

### 5.3 기여 방법

1. 이슈 확인
2. 포크 및 브랜치 생성
3. 코드 작성 및 커밋
4. 풀 리퀘스트 생성
5. 코드 리뷰 및 머지

notion-dump의 발전에 여러분의 참여가 큰 힘이 됩니다. 함께 더 나은 도구를 만들어 나가요!
