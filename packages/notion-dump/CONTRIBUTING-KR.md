# notion-dump 사용 가이드 및 기여 안내

## 목차

1. 개요
2. 사용 방법
3. 개발 및 테스트
4. 기여 가이드

## 개요

notion-dump는 Notion 페이지의 데이터를 추출하여 로컬 파일 시스템에 저장하는 CLI 도구입니다. 이 도구는 내부적으로 @cozy-blog/notion-client를 사용하여 Notion API와 통신합니다.

## npm에 배포하기

notion-dump를 npm에 배포하여 npx로 실행 가능하게 만드는 방법에 대해서는 [이 가이드](https://deepgram.com/learn/npx-script)를 참조하세요. 배포가 완료되면 다음과 같이 npx로 실행할 수 있습니다:

```bash
npx notion-dump --page-id YOUR_PAGE_ID [--out OUTPUT_DIR] [--dir ROOT_DIR]
```

## 로컬에서 실행하기

개발 중이거나 로컬에서 테스트하려면 다음 단계를 따르세요:

1. 프로젝트를 클론하고 디렉토리로 이동합니다:

   ```bash
   git clone https://github.com/your-repo/notion-dump.git
   cd notion-dump
   ```

2. 의존성을 설치합니다:

   ```bash
   npm install
   ```

3. 로컬에서 실행합니다:

   ```bash
   node cli.js --page-id YOUR_PAGE_ID [--out OUTPUT_DIR] [--dir ROOT_DIR]
   ```

4. (선택사항) 실행 파일로 만들기:
   ```bash
   chmod +x cli.js
   ```
   이후 다음과 같이 실행할 수 있습니다:
   ```bash
   node ./cli.js --page-id YOUR_PAGE_ID [--out OUTPUT_DIR] [--dir ROOT_DIR]
   ```

## 개발 및 테스트

로컬에서 개발하고 테스트하는 동안에는 `npm link`를 사용하여 전역적으로 사용할 수 있습니다:

1. 프로젝트 디렉토리에서 다음 명령어를 실행합니다:

   ```bash
   npm link
   ```

2. 이제 전역적으로 `notion-dump` 명령어를 사용할 수 있습니다:

   ```bash
   notion-dump --page-id YOUR_PAGE_ID
   ```

3. 개발이 완료되면 링크를 해제합니다:
   ```bash
   npm unlink
   ```

이러한 방법으로 로컬에서 개발 및 테스트를 진행할 수 있습니다. 변경사항을 테스트하고 확인한 후에 pull request를 제출하여 프로젝트에 기여할 수 있습니다.

## 사용 예시

```bash
npx notion-dump --page-id 123456789abcdef --out ./custom-output --dir ./my-project/public
```

## 명령어 옵션

- `--page-id`: (필수) 추출할 Notion 페이지의 ID
- `--out`: (선택) 출력 디렉토리 이름. 기본값은 페이지 {제목-아이디}
- `--dir`: (선택) 루트 디렉토리 경로. 기본값은 NextJS 프로젝트 구조를 기준으로 설정됨

## 출력 구조

```
[ROOT_DIR]/
└── [page-title_page-id]/
    ├── index.json
    └── images/
        ├── image1.jpg
        ├── image2.png
        └── ...
```

- `index.json`: 페이지 내용을 JSON 형식으로 저장
- `images/`: 페이지에 포함된 모든 이미지 파일을 저장하는 디렉토리

## 이미지 처리

- 이미지 파일은 `images/` 디렉토리에 저장됩니다.
- 이미지 파일명은 Notion의 캡션 정보를 참고하거나, 없을 경우 `image1`, `image2` 등의 형식으로 지정됩니다.
- JSON 파일 내의 이미지 블록 정보는 로컬 파일 경로로 업데이트됩니다.

## 중복 실행 처리

- 같은 페이지에 대해 도구를 여러 번 실행할 경우, 기존 데이터는 새로운 데이터로 덮어쓰기됩니다.
- 이미지 폴더의 경우, 사용되지 않는 이미지는 제거되고 새로운 이미지가 추가됩니다.

## 기여 가이드

notion-dump는 오픈소스 프로젝트로, 지속적인 개선과 발전을 위해 커뮤니티의 기여를 환영합니다. 다음은 현재 진행 중이거나 기여가 필요한 주요 개발 항목들입니다:

1. CLI 스크립트 개발

   - `notion-dump` 명령어 구현
   - 명령행 인자 파싱 및 처리
   - 에러 핸들링 및 사용자 피드백 개선

2. 이미지 처리 기능 개발

   - Notion API로부터 이미지 다운로드
   - 이미지 파일명 생성 로직 구현
   - 이미지 경로 정보 업데이트

3. 출력 구조 최적화

   - `index.json` 파일 생성 및 구조화
   - 페이지 제목과 ID를 활용한 디렉토리 명명 규칙 적용

4. NextJS 프로젝트 구조 지원

   - 기본 출력 경로를 NextJS 프로젝트 구조에 맞게 설정

5. 증분 업데이트 기능 구현

   - 변경된 내용만 효율적으로 업데이트하는 로직 개발

6. 데이터베이스 추출 기능 확장

   - Notion 데이터베이스 전체를 추출하는 기능 추가

7. 다양한 출력 형식 지원

   - JSON 외에 Markdown, HTML 등의 형식으로 변환 기능 구현

8. 문서화 및 예제 개선
   - 사용자 가이드 및 API 문서 작성
   - 다양한 사용 사례에 대한 예제 코드 제공

기여하고 싶으신 분들은 GitHub 저장소를 방문하여 이슈를 확인하거나 새로운 기능 제안을 해주세요. 풀 리퀘스트는 언제나 환영합니다!

notion-dump의 발전에 여러분의 참여가 큰 힘이 됩니다. 함께 더 나은 도구를 만들어 나가요!
