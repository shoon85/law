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
| prec/ | 조문별 판례 색인 (법령마다 나눠 둔 JSON) |
| tools/build_prec_index.py | 판례 색인을 만드는 스크립트 |
| .github/workflows/prec-index.yml | 매달 판례 색인을 자동으로 다시 만드는 설정 |
| .nojekyll | GitHub Pages가 파일을 가공하지 않고 그대로 올리게 함 |

## 수정본 올릴 때
index.html을 고쳤으면 sw.js 맨 위 VERSION 값도 바꿔서(예: lawbook-v9-5 → lawbook-v9-6) 함께 올리세요.
GitHub Pages는 파일을 최대 10분 정도 캐시하므로, 올린 직후 바로 안 바뀌면 잠시 뒤 앱을 다시 여세요.

## 판례 색인
- 판례는 legalize-kr/precedent-kr(국가법령정보센터 공개 판례) 자료입니다. 앱은 prec/ 색인으로 조문별 판례 수를 보여 주고, 판례 본문은 누를 때 받아 기기에 저장합니다.
- 매월 2일 새벽 GitHub Actions가 색인을 다시 만들어 prec/에 올립니다. 바로 갱신하려면 저장소 › Actions › "판례 색인 갱신" › Run workflow.
- 직접 만들 때: `git clone --depth 1 https://github.com/legalize-kr/precedent-kr` 후 `python3 tools/build_prec_index.py precedent-kr prec`
