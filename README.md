# Foot Salon
`개인 프로젝트`

<br>

## 💻 프로젝트 소개
> **축구에 관한 모든 정보 & 축구를 좋아하는 사람들의 이야기 공간**

<br>

- Figma를 활용하여 전체 UI 디자인 및 설계
- Atomic Design Pattern을 활용하여 프로젝트 구조 설계
- React Hook Form을 활용하여 Form 작성
- Rendering 최적화
- Semantic tag를 사용하여 웹 접근성 향상, SEO 최적화
- 가독성 향상, 유지보수를 위하여 프로젝트 진행 중, 진행 후 Code Refactoring

<br>

#### <a href="https://github.com/itsyuna/Foot-Salon/wiki">더 자세하게🔍 WIKI로 이동</a>

<br>

## 🛠 기술 스택
<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled--components-DB7093?style=flat-square&logo=Styledcomponents&logoColor=white"/>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>
</div>

<br>

## 📌 주요 기능
### Home - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-Home">상세 보기🔍</a>
- Carousel - 매주 축구 사진 업데이트
- 실시간 각 리그별 팀 순위/득점자 순위 테이블
    - ‘로딩중’ 표시
    - 에러 or 데이터 없을 시 메시지 표시
- 남자 축구 국가대표 경기 일정
    - 평가전/국제 대회로 나누어서 정보 제공
    - 경기 시간 or 날짜가 지나면 자동으로 종료 표시
    - 국제대회 - D-DAY 설정
        - ‘D-00’ / D-DAY! / 종료로 나뉨

<br>
          
### Header - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-Header">상세 보기🔍</a>
- Login/Logout 버튼
- Nickname 표시
- 새로고침 시 로딩중 - Spinner 아이콘 활성화

<br>

### Footer - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-Footer">상세 보기🔍</a>
- Contact 정보
    - Github
    - Email - Email 보내기 페이지
      - 관리자(개발자)에게 이메일 보내기

<br>

### 회원가입 - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85">상세 보기🔍</a>
- 닉네임,이메일 중복 체크
- Form 공백 시/형식에 맞지 않을 시 안내 문구 활성화

<br>
  
### 로그인 - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-%EB%A1%9C%EA%B7%B8%EC%9D%B8">상세 보기🔍</a>
- 이메일,비밀번호 맞지 않을 시 안내 문구 활성화
- Form 공백 시/형식에 맞지 않을 시 안내 문구 활성화

<br>
  
### 축구 하이라이트 영상 - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-%EC%B6%95%EA%B5%AC-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8-%EC%98%81%EC%83%81">상세 보기🔍</a>
* 전세계 축구 하이라이트 영상
* 검색 기능 - Scroll 하지 않고, 원하는 팀 검색

<br>

### 게시판 - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-%EA%B2%8C%EC%8B%9C%ED%8C%90">상세 보기🔍</a>
- 게시글 작성/읽기/업데이트/삭제 
- 최신순/오래된 순으로 게시글 정렬
- 이미지 업로드
- 댓글 기능
    - 댓글 작성/읽기/업데이트/삭제
    - 댓글 수 표시
    - '첫 댓글', 수정 시 수정 시각 & '수정됨' 문구 추가

<br>
 
### 축구 다이어리 - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-%EC%B6%95%EA%B5%AC-%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC">상세 보기🔍</a>
- 다이어리 작성/읽기/업데이트/삭제
- K리그/해외 축구, 집관/직관 분류
- 경기 결과 감정 이모티콘 사용(Lose/Draw/Win)
- Filter
    - 최신순/오래된 순
    - 경기 결과 (Lose/Draw/Win)
    - K리그/해외 축구
    - 달마다 리스트 분류
- 달마다 통계 분석
    - 응원 경기 수, 경기 결과, 집관/직관

<br>
      
### 사진 기록 & 공유 - <a href="https://github.com/itsyuna/Foot-Salon/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%7C-Photos">상세 보기🔍</a>
- 키워드로 사진 검색
- Filter
    - 모든 사진
    - 내가 올린 사진 
- Modal창 오픈
    - 사진 업로드/보기/업데이트/삭제
    - 사진 기록/수정 Editor
    - 사진 크게 보기
