---
title: "Obsidian 블로그에 GitHub Pages CI/CD 연결하기"
slug: "obsidian-github-pages-ci-cd"
date: 2026-04-13
domain: it
category: workflow
tags:
  - github-pages
  - github-actions
  - astro
  - obsidian
status: published
summary: "Obsidian 기반 글쓰기 구조 위에 Astro 사이트를 올리고 GitHub Actions와 Pages 설정을 맞춰 자동 배포까지 연결한 기록."
canonical_channel: github-pages
source_notes:
  - "[[ops/github-pages-setup]]"
  - "[[ops/reports/2026-04-13-github-pages-ci-cd-retro]]"
  - "[[ops/publishing-runbook]]"
related_journal_notes:
  - "[[journal/daily/2026/2026-04-13]]"
adsense_ready: false
series: "blog-ops"
---

# Obsidian 블로그에 GitHub Pages CI/CD 연결하기

오늘은 Obsidian 기반 블로그 구조 위에 실제 공개 사이트를 붙이는 작업을 했다. 목표는 단순했다. 로컬에서만 끝나는 정리 시스템이 아니라, `publish/posts/`에 들어간 글이 `main` 브랜치 푸시만으로 공개 사이트까지 반영되게 만드는 것이었다.

## 왜 이 작업이 필요했나

Obsidian에서 글을 잘 쓰는 것과 공개 블로그를 안정적으로 운영하는 것은 다른 문제다. 원고는 잘 정리되어 있어도, 매번 수동으로 배포하거나 경로를 옮겨야 한다면 글쓰기 흐름이 금방 끊긴다.

그래서 이번에는 아래 흐름이 자동으로 이어지도록 맞췄다.

- Obsidian에서 글 작성
- `publish/posts/`에 공개 원고 저장
- `main`에 푸시
- GitHub Actions가 사이트 빌드
- GitHub Pages가 자동 배포

## 실제로 한 일

먼저 공개 사이트의 기준이 되는 Astro 프로젝트를 `site/` 아래에 만들고, 사이트가 `publish/posts/`만 읽도록 구조를 고정했다. 이렇게 하면 비공개 저널이나 내부 위키는 공개 대상에서 자동으로 제외된다.

그다음 GitHub Actions 워크플로우를 추가해서 `main`에 푸시하면 빌드와 배포가 연속으로 돌도록 연결했다. 여기까지는 비교적 순조로웠지만, 실제 배포 단계에서는 GitHub 설정 쪽에서 막히는 부분이 있었다.

## 막혔던 지점

처음에는 `build`는 성공했지만 `deploy`가 실패했다. 원인은 코드가 아니라 GitHub 저장소 설정이었다.

핵심 문제는 세 가지였다.

1. Pages의 `Source`가 `Deploy from a branch`로 되어 있었다.
2. Actions 실행 권한이 워크플로우 구조와 정확히 맞는지 확인이 필요했다.
3. `github-pages` environment에서 `main` 브랜치 배포가 허용되지 않아 배포가 차단됐다.

즉, GitHub Actions 파일만 있다고 끝나는 게 아니라 Pages와 Environment 설정이 함께 맞아야 했다.

## 어떻게 해결했나

해결 순서는 아래와 같았다.

1. `Settings > Pages`에서 `Source`를 `GitHub Actions`로 변경
2. `Settings > Actions > General`에서 GitHub 제공 actions 실행 허용
3. `Settings > Environments > github-pages`에서 `main` 브랜치 배포 허용
4. Astro의 base path를 `/llmObsidianWiki/`에 맞게 수정
5. 다시 워크플로우를 실행해 build와 deploy를 재검증

이 과정을 거친 뒤에는 실제로 GitHub Pages 배포가 성공했고, 공개 사이트 주소에서도 반영 결과를 확인할 수 있었다.

## 이번 작업으로 배운 점

가장 크게 배운 점은 CI와 CD를 구분해서 봐야 한다는 것이다. 이번 구성은 분명히 CI/CD이지만, CI는 아직 빌드 성공 여부만 확인하는 가벼운 단계다. 나중에는 lint, 테스트, 콘텐츠 검증까지 붙여야 더 안정적인 배포 파이프라인이 된다.

또 하나는 GitHub Pages가 생각보다 “설정 상태”의 영향을 많이 받는다는 점이다. 워크플로우 파일이 맞아도 `Pages Source`, `Actions permissions`, `Environment rule` 중 하나만 어긋나면 배포는 쉽게 막힌다.

## 지금 남은 다음 단계

이제 기본 배포 흐름은 갖춰졌으니, 다음 단계는 운영 품질을 높이는 일이다.

- `PUBLIC_SITE_URL` 같은 repository variable 정리
- Notion 운영 DB에 발행 메타데이터 누적
- 실제 글 3~5개 더 발행해서 흐름 검증
- lint 또는 콘텐츠 검증을 CI에 추가
- 나중에 `ads.txt`, custom domain, AdSense 준비

## 정리

오늘 작업은 “Obsidian에서 정리한 글을 GitHub Pages까지 자동으로 보낸다”는 핵심 흐름을 실제로 연결한 날이었다. 이제부터는 글을 쓰는 일과 배포하는 일이 분리되지 않고, 하나의 워크플로우 안에서 이어질 수 있다.

## References

- `ops/github-pages-setup.md`
- `ops/reports/2026-04-13-github-pages-ci-cd-retro.md`
- `ops/publishing-runbook.md`
