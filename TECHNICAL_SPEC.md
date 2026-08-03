# Blog Writer App 기술 명세서

## 1. 프로젝트 개요
- 프로젝트명: Blog Writer App
- 목적: 네이버 블로그 상위 노출 기준을 반영한 글 구조를 빠르게 생성하고, Markdown으로 변환해 사용자가 네이버 블로그에 빠르게 붙여넣을 수 있도록 지원하는 정적 웹 앱
- 호스팅: GitHub Pages (`docs/` 폴더)
- 대상 사용자: 블로거, 콘텐츠 마케터, 개인 창작자, SEO 콘텐츠 기획자
- 구현 형태: 정적 SPA 스타일 HTML/CSS/Vanilla JavaScript

## 2. 현재 구현된 핵심 기능
### 2.1 글 작성 입력
- 제목, 부제목, 요약, 인트로 입력
- 키워드, 태그, CTA 입력
- 이미지 URL 목록 입력(쉼표 구분)
- 권장 이미지 수 안내: 현재 8장 기준

### 2.2 섹션 편집
- 섹션 추가 및 제거
- 각 섹션 구성 요소:
  - 소제목
  - 리드 문장
  - 핵심 포인트(쉼표 구분)
  - Takeaway
- 기본 5개 섹션 템플릿 제공

### 2.3 출력 및 변환
- 미리보기 생성
- Markdown 변환
- Markdown 클립보드 복사
- Markdown 파일 내보내기

### 2.4 템플릿/드래프트 관리
- 템플릿 이름 입력 후 저장
- 저장된 템플릿을 선택해 불러오기
- 브라우저 로컬스토리지에 드래프트 자동 저장/로드
- 양식 초기화 기능

### 2.5 배포 및 개발 보조
- GitHub Pages 자동 배포(`docs/` 폴더)
- GitHub Actions 기반 CI: lint, format, Playwright 테스트

## 3. 기술 스택
- 프론트엔드: HTML, CSS, Vanilla JavaScript
- 정적 서버: GitHub Pages
- CI: GitHub Actions
- 테스트: Playwright
- 패키지/도구: npm, eslint, prettier, html-validate, markdownlint, http-server, start-server-and-test, wait-on

## 4. 파일 및 앱 구조
### 4.1 루트 디렉터리
- `docs/` — 배포용 HTML/CSS/JS
- `blog_writer_app/` — 개발용 복사본 및 백업
- `naver_blog_structure.py` — 템플릿 생성/벤치마크 스크립트
- `package.json`, `package-lock.json` — npm 스크립트 및 의존성
- `.github/workflows/ci.yml` — GitHub Actions CI
- `TECHNICAL_SPEC.md` — 기술 명세서
- `README_CI.md` — CI 설명

### 4.2 `docs/` 상세
- `docs/index.html` — 앱 UI
- `docs/style.css` — 스타일 정의
- `docs/app.js` — 앱 로직

## 5. 주요 화면 및 UI 흐름
### 5.1 초기 화면
- 제목/부제목/요약/인트로 입력 필드
- 섹션 편집 영역
- 이미지 URL 입력 필드
- `생성`, `예시 로드`, `양식 초기화`, `Markdown 복사`, `Markdown 내보내기` 버튼
- 템플릿 저장/불러오기 인터페이스

### 5.2 생성 및 미리보기
- `생성` 클릭 시 입력값을 수집하고 Markdown/HTML 미리보기를 생성
- `미리보기` 탭과 `Markdown` 탭을 전환 가능
- 현재 단어 수 및 이미지 개수 경고 표시

### 5.3 템플릿 저장 및 드래프트
- 템플릿 이름 입력 후 저장
- 로컬스토리지에 저장된 템플릿 목록에서 선택 후 불러오기
- 페이지 개방 시 기존 드래프트가 있으면 자동 복원

## 6. 데이터 모델 및 동작 규칙
### 6.1 입력 모델
- `title`: 문자열
- `subtitle`: 문자열
- `summary`: 문자열
- `intro`: 문자열
- `keywords`: 쉼표 구분 문자열 → 배열
- `tags`: 쉼표 구분 문자열 → 배열
- `images`: 쉼표 구분 문자열 → 배열
- `cta`: 문자열
- `sections`: 배열
  - `heading`: 문자열
  - `lead`: 문자열
  - `bullets`: 쉼표 구분 문자열 → 배열
  - `takeaway`: 문자열

### 6.2 Markdown 변환 규칙
- 제목: `# ${title}`
- 부제목: `**${subtitle}**`
- 요약/인트로: 단락으로 변환
- 섹션: `### ${heading}` + `lead` + 리스트 포인트 + `**Takeaway:** ${takeaway}`
- 메타: `**키워드:**`, `**태그:**`, `**이미지 URL:**`, `**추천 CTA:**`

### 6.3 로컬 저장 규칙
- `bwa_templates`: 로컬스토리지에 템플릿 배열 저장
- `bwa_draft`: 현재 작성 중인 입력값 및 섹션 데이터를 저장

## 7. CI/CD 설계
### 7.1 GitHub Actions 워크플로
- `CI — Lint, Format, Test`:
  - `npm ci`
  - `npm run lint`
  - `npm run format:check`
  - `npx playwright install --with-deps`
  - `npx start-server-and-test --verbose --timeout 30000 "npm:start" http://localhost:3000 "npm test"`
- `Deploy to GitHub Pages`:
  - `actions/configure-pages`
  - `actions/upload-pages-artifact`
  - `actions/deploy-pages`

### 7.2 로컬 개발 스크립트
- `npm start` — `http-server docs -p 3000`
- `npm test` — Playwright 실행
- `npm run lint` — HTML/Markdown/JS 린트
- `npm run format:check` — Prettier 검증

## 8. 테스트 전략
### 8.1 자동화 테스트
- Playwright E2E:
  - 화면 로드 및 제목 검증
  - 예시 로드 및 생성 흐름
  - 섹션 추가 및 렌더링 검증
  - Markdown 다운로드 파일 내용 검증
  - 클립보드 복사 성공 및 실패 알림 검증

### 8.2 수동 검증
- 모바일/데스크탑 브라우저에서 입력, 생성, 복사, 다운로드 확인
- 로컬스토리지 드래프트 저장/복원 확인

## 9. 운영 및 향후 확장
### 9.1 운영
- GitHub Issues로 버그/기능 요구사항 관리
- GitHub Pages로 정적 호스팅

### 9.2 향후 확장 아이디어
- 네이버 API 자동 게시 연동
- 이미지 업로드 및 CDN 지원
- 사용자 계정 기반 템플릿 관리
- AI 추천 입력 / 자동 요약 생성
- 블로그 포스트 SEO 점수 예측

## 10. 요구사항 정리
- 사용자는 템플릿 기반 네이버 블로그 글 구조를 쉽게 작성하고 저장/로드할 수 있어야 한다.
- 사용자는 입력 내용을 Markdown 및 HTML 미리보기 형태로 즉시 확인할 수 있어야 한다.
- 시스템은 로컬에 드래프트를 저장하고 다음 방문 시 복원해야 한다.
- CI는 린트, 포맷, E2E 테스트를 자동 실행해야 한다.
- 배포는 GitHub Pages로 자동화되어야 한다.

---
작성: 현재 앱 구현 상태 기준 기술 명세서. 필요한 경우 이 문서를 기반으로 추가 요구사항, 화면 설계, API 설계 문서를 확장할 수 있습니다.
