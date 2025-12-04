# 모심 - 장례 전문 서비스 웹사이트

Version 1.1 - 바닐라 JavaScript 구현

## 프로젝트 구조

```
mosim/
├── index.html          # 메인 페이지
├── estimate.html       # 장례 견적 페이지 (다단계 설문)
├── urgent.html         # 긴급 임종 접수
├── reviews.html        # 고객 후기
├── styles.css          # 전역 스타일
├── estimate.css        # 견적 페이지 전용 스타일
├── main.js            # 네비게이션 및 사이드바 로직
└── estimate.js        # 견적 페이지 다단계 폼 로직
```

## 주요 기능

### 1. 네비게이션
- **데스크톱**: 고정 헤더 with 핵심 메뉴
- **모바일**: 오프캔버스 사이드바 with Split Panel

### 2. 모바일 사이드바 구조
- **A영역**: 24시간 고객센터 (긴급 CTA), 로그인/회원가입
- **B영역**: 핵심 퀵 링크 (100원 상조, 장례 견적, 실제 후기, 임종 접수)
- **C영역**: 주 메뉴 (상담/계약, 상품 안내, 장례 절차, 읽을거리, 회사 소개, 고객 문의)
- **Split Panel**: 고객 문의 선택 시 우측에 상세 옵션 표시

### 3. UX 개선사항
- ✅ 활성 상태(Active State): 현재 페이지 시각적 강조
- ✅ 터치 영역: 최소 44x44px 확보
- ✅ Split Panel: 메뉴 이동 없이 정보 접근

### 4. 장례 견적 페이지
- **1단계**: 사용자 의도 파악 (비용/절차/둘 다)
- **2단계**: 선택에 따른 분기 설문
- **3단계**: 연락처 정보 입력
- **4단계**: 완료 메시지

## 실행 방법

### 로컬 서버 실행
```powershell
# Python이 설치되어 있는 경우
python -m http.server 8000

# 또는 Node.js http-server 사용
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

### Visual Studio Code Live Server
1. Live Server 확장 설치
2. `index.html` 우클릭 → "Open with Live Server"

## 디자인 시스템

### 컬러 팔레트
- Primary: `#E91E63` (모심 핑크)
- Secondary: `#F06292`
- Accent: `#C2185B`
- Dark: `#880E4F`
- Light: `#FCE4EC`
- Emergency: `#D32F2F`

### 타이포그래피
- 폰트: Noto Sans KR
- 헤딩: 700 (Bold)
- 본문: 400 (Regular)
- 강조: 500 (Medium)

### 터치 영역
- 최소 크기: 44x44px
- 모든 버튼, 링크, 인터랙티브 요소에 적용

## 페이지 목록

### 구현 완료
- ✅ index.html - 메인 페이지
- ✅ estimate.html - 장례 견적 (다단계 설문)
- ✅ urgent.html - 긴급 임종 접수
- ✅ reviews.html - 고객 후기

### 추가 구현 필요
- products.html - 상품 안내
- process.html - 장례 절차
- about.html - 회사 소개
- login.html - 로그인/회원가입

## 브라우저 지원
- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- 모바일 브라우저

## 라이선스
© 2025 모심. All rights reserved.
