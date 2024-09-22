# notion-dump

Notion 페이지의 데이터를 추출하여 로컬에 JSON 형식으로 저장하는 CLI 도구입니다.

## 기능

- Notion 페이지의 전체 데이터를 JSON 파일로 저장
- 간단한 명령어로 Notion 페이지 데이터 백업

## 설치

현재 `notion-dump`는 npm에 배포되지 않았습니다. 로컬에서 직접 사용하려면 아래의 단계를 따라주세요.

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

## 사용 방법

1. Notion API 토큰 발급받기
2. 통합을 Notion 페이지에 연결하기
3. Notion 페이지 URL 얻기
4. 스크립트 실행
   ```bash
   node ./packages/notion-dump/dist/notion-dump.es.js --page <NotionPageURL> --auth <YourAPIToken>
   ```

## 옵션 설명

- `--page`: (필수) Notion 페이지의 URL
- `--auth`: (필수) Notion API 통합의 토큰

## 출력 결과

- 현재 작업 디렉토리에 `content/[page-id]/index.json` 파일이 생성됩니다.
- `content` 폴더가 없으면 자동으로 생성됩니다.
- 동일한 페이지 ID의 파일이 이미 있으면 덮어쓰기됩니다.

## 주의사항

- 이미지 다운로드 기능은 아직 구현되지 않았습니다.
- 출력 디렉토리와 파일명은 기본값으로 설정되며, 사용자 지정 옵션은 지원하지 않습니다.
- Notion 데이터베이스 추출 기능은 지원하지 않습니다.

## 기여

기여를 환영합니다! 자세한 내용은 [기여 가이드](./CONTRIBUTING-KR.md)를 참고해주세요.

## 라이선스

MIT 라이선스를 따릅니다.
