# GitHub Pages CI/CD 구축 기록

## 문서 목적

이 문서는 `llm-wiki-master`의 공개 블로그 사이트를 GitHub Pages로 배포하기 위해 무엇을 구축했고, 어떤 GitHub 설정이 필요했고, 무엇이 아직 선택 사항으로 남아 있는지를 기록한다.

대상 독자:

- 개인 블로그 운영자인 나
- 나중에 같은 구성을 다시 재현해야 하는 미래의 나
- 노션에 운영 기록을 남기고 싶은 나

기록일:

- 2026-04-13

현재 상태:

- GitHub Pages 배포 성공

## 한 줄 결론

현재 구성은 **CI/CD**다.

- **CI**: `main`에 푸시하면 GitHub Actions가 의존성을 설치하고 Astro 사이트를 빌드한다.
- **CD**: 빌드 산출물을 GitHub Pages로 자동 배포한다.

정확히 말하면 지금의 CI는 **빌드 검증 중심의 가벼운 CI**다. 아직 `lint`, `test`, `content validation`은 붙어 있지 않다.

## 이번에 구현한 것

| 영역 | 한 일 | 결과 |
| --- | --- | --- |
| 볼트 구조 | `raw/`, `wiki/`, `journal/`, `publish/`, `site/`, `ops/` 분리 | 비공개 기록과 공개 산출물이 섞이지 않음 |
| 공개 사이트 | `site/` 아래 Astro 사이트 구축 | `publish/posts/`만 읽어서 공개 사이트 생성 |
| 배포 워크플로우 | `.github/workflows/deploy-pages.yml` 추가 | `main` 푸시 시 배포 가능 |
| Git 전략 | `main` + `codex/*` 규칙 정리 | 안정 브랜치와 단기 작업 브랜치 분리 |
| Pages 설정 | Pages Source를 `GitHub Actions`로 변경 | 브랜치 배포가 아닌 워크플로우 배포 사용 |
| Environment 설정 | `github-pages` 환경에서 `main` 허용 | deploy 단계 차단 해제 |
| Project Pages 경로 | `/llmObsidianWiki/` 기준으로 Astro base path 설정 | 정적 자산과 경로가 Pages 주소와 일치 |
| 운영 문서 | `ops/` 아래 setup/runbook 문서 추가 | 나중에 재현 가능한 운영 문서 확보 |

## 전체 워크플로우

```mermaid
flowchart LR
  A["Obsidian에서 글 작성"] --> B["publish/posts로 승격"]
  B --> C["main에 push"]
  C --> D["GitHub Actions build job"]
  D --> E["GitHub Actions deploy job"]
  E --> F["GitHub Pages 공개 사이트"]
```

## CI와 CD 구분

| 구분 | 현재 역할 | 구현 여부 | 설명 |
| --- | --- | --- | --- |
| CI | 의존성 설치와 사이트 빌드 | 완료 | 사이트가 정상 컴파일되는지 검증 |
| CI | lint, test, 콘텐츠 검증 | 미구현 | 다음 단계에서 강화 가능 |
| CD | 아티팩트 업로드와 GitHub Pages 배포 | 완료 | 실제 공개 사이트까지 자동 반영 |

## 꼭 필요했던 GitHub 설정

### 1. Settings > Pages

- `Source = GitHub Actions`

왜 필요했는가:

- 이 저장소는 `branch publish`가 아니라 `workflow publish` 구조를 사용하기 때문

### 2. Settings > Actions > General

- Actions 활성화
- GitHub-authored actions 허용 또는 전체 actions 허용

왜 필요했는가:

- 워크플로우가 `checkout`, `setup-node`, `configure-pages`, `upload-pages-artifact`, `deploy-pages` 같은 GitHub 액션을 사용하기 때문

### 3. Settings > Environments > github-pages

- `Deployment branches and tags`에서 `main` 허용

왜 필요했는가:

- 처음에는 환경 보호 규칙이 `main` 배포를 막아서 `deploy`만 실패했기 때문

## Environment 섹션 설명

### Deployment protection rules

배포 전에 거치는 보호 규칙이다.

예를 들면:

- 승인자 필요
- self-review 금지
- 일정 시간 대기
- 특정 사용자만 배포 허용

개인 블로그 기준 권장:

- 최대한 단순하게 유지
- 승인자나 대기 시간은 굳이 두지 않아도 됨

### Environment secrets

특정 environment에서만 쓰는 민감한 비밀 값이다.

예시:

- API 키
- 배포 토큰
- 외부 서비스 비밀키

현재 권장:

- 비워두기

이유:

- 현재 GitHub Pages 배포는 내장 `GITHUB_TOKEN`만으로 충분히 동작함

### Environment variables

특정 environment에서만 쓰는 비민감 설정값이다.

예시:

- 공개 URL
- 환경 이름
- 표시용 값

현재 권장:

- 비워두기

중요한 이유:

- environment variable은 그 environment를 직접 사용하는 job에서만 읽힌다
- 현재 워크플로우에서는 `deploy` job만 `github-pages` environment를 사용한다
- `build` job에서는 읽지 못하므로 `PUBLIC_SITE_URL` 같은 값은 **repository variable**로 두는 것이 맞다

## 놓치기 쉬운 설정

| 설정 | 지금 필수인가 | 권장 상태 | 이유 |
| --- | --- | --- | --- |
| `PUBLIC_SITE_URL` repository variable | 선택 | `https://seonwook61.github.io/llmObsidianWiki/` | 나중에 canonical URL, SEO 메타데이터에 유용 |
| Custom domain | 아직 아님 | 나중에 | 사이트가 안정화된 뒤 연결 |
| `ads.txt` | 아직 아님 | 나중에 | AdSense 준비 단계에서 필요 |
| `About`, `Privacy`, `Contact` 페이지 | 이미 준비됨 | 유지 | 신뢰성과 운영 준비도 향상 |
| `main` 브랜치 보호 규칙 | 선택 | 나중에 고려 | 운영이 익숙해지면 실수 방지용으로 유용 |
| `lint/test` job | 선택이지만 추천 | 나중에 추가 | 빌드 외 품질 검증 강화 |

## 이번 설정에서 건드린 주요 파일

### 핵심 문서

- `README.md`
- `AGENTS.md`
- `index.md`
- `log.md`

### 운영 문서

- `ops/blog-architecture.md`
- `ops/publishing-runbook.md`
- `ops/git-workflow.md`
- `ops/github-pages-setup.md`
- `ops/notion-ops-db.md`
- `ops/automation-map.md`
- `ops/templates/notion-ops-database.sql`

### 사이트 및 배포

- `site/astro.config.mjs`
- `.github/workflows/deploy-pages.yml`

## 현재 상태 요약

### 검증 완료

- 로컬 Astro build 성공
- GitHub Actions build 성공
- GitHub Pages deploy 성공

### 아직 보류

- Notion 운영 DB 생성
- n8n 연동
- custom domain
- AdSense
- lint/test 같은 CI 강화

## 다음 추천 단계

1. `ops/templates/notion-ops-database.sql` 기반으로 Notion 운영 DB 생성
2. repository variable `PUBLIC_SITE_URL` 추가
3. 실제 글 3~5개 발행해서 운영 흐름 검증
4. lint 또는 content validation을 CI에 추가
5. 콘텐츠가 쌓이면 `ads.txt`와 AdSense 준비

## 노션에 저장하는 방법

### 이 Markdown 파일

권장 방식:

- 노션 일반 페이지에는 이 파일 내용을 그대로 복붙

왜:

- 설명형 문서는 Markdown 붙여넣기가 가장 자연스럽고 읽기 좋음

### CSV 파일

권장 방식:

- 노션 데이터베이스 또는 표 형태 관리가 필요할 때 import

왜:

- 체크리스트, 설정 현황, 상태 관리에는 CSV가 더 적합함
