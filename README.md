# 편한 법전 (GitHub Pages)

초성 검색·조문번호 키패드·탭으로 보는 법령 뷰어. 설치형 웹앱(PWA)입니다.

- 주소: https://shoon85.github.io/law/
- 기능 개발·추가 건의: https://open.kakao.com/o/gBiikBVi

## 파일
| 파일 | 역할 |
|---|---|
| index.html | 앱 전체 |
| sw.js | 서비스워커 (오프라인 실행) |
| manifest.webmanifest | 앱 이름·아이콘 (설치용) |
| icon-*.png | 아이콘 |
| .nojekyll | GitHub Pages가 파일을 가공하지 않고 그대로 올리게 함 |

## 수정본 올릴 때
index.html을 고쳤으면 sw.js 맨 위 VERSION 값도 바꿔서(예: lawbook-v9-3 → lawbook-v9-4) 함께 올리세요.
GitHub Pages는 파일을 최대 10분 정도 캐시하므로, 올린 직후 바로 안 바뀌면 잠시 뒤 앱을 다시 여세요.
