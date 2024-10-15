## 기술 스택
React / Next.js / Typescript / Apollo / GraphQL / Emotion

## 자유게시판 + 중고마켓
> 자유게시판
로그인 인증 없이 누구나 게시글 작성을 할 수 있습니다.
댓글 또한 누구나 달 수 있으며 수정, 삭제를 등록에 사용한 비밀번호로 가능합니다.

> 중고마켓
로그인 인증을 통해 유저 정보를 가져올 수 있으며, 상품 등록, 수정, 삭제와 충전을 통해 상품 구매를 할 수 있습니다.
마이페이지를 구현해 자신이 등록한 상품, 마이찜한 상품 목록을 확인할 수 있으며
포인트 내역으로 충전, 구매, 판매 내역을 확인 할 수 있습니다.

Layout을 통해 header, navigation, banner를 사용했습니다.

header
로고, 로그인 및 회원가입을 구성 했습니다.

- 로그인 시 헤더
![헤더01](https://github.com/user-attachments/assets/ed536b0a-7f01-4ea1-8183-5f3e87d0107e) 

> 유저 정보 모달

![헤더02](https://github.com/user-attachments/assets/3833e25c-2225-494e-9788-8540181b8ae0)
프로필, 충전, 로그아웃을 할 수 있으며 포트원을 통해 충전을 할 수 있습니다.

> 중고마켓
![마켓01](https://github.com/user-attachments/assets/2ca2d434-4e16-4ab8-944b-ff78df4a773e)
로그인 이후 검색어로 "맥북" 검색한 상태

> 중고마켓 상세
![마켓02](https://github.com/user-attachments/assets/735633e0-485e-40a4-80b8-2fdd26b753d4)
상품의 상세 내용이 담겨 있습니다. 상품 정보, 거래 장소, 찜 기능, 구매하기 버튼 등이 구성되어 있습니다.

> 중고마켓 등록
![마켓03](https://github.com/user-attachments/assets/84bb5ee2-3682-4bcc-9939-05de68cfcf53)
제목, 내용, 가격, 태그, 위치, 이미지 등 성정할 수 있으며 해당 상품을 등록 할 수 있습니다.

> 마이페이지
![마이페이지01](https://github.com/user-attachments/assets/85e7fc2c-21f2-4988-bf34-987bfd643806)
![마이페이지02](https://github.com/user-attachments/assets/5b7cc24c-553e-44ab-ae3a-ac24588f55a4)
![마이페이지03](https://github.com/user-attachments/assets/8f33d7fc-0829-4952-a277-34f2fd4ff861)


```bash

```



판매중상품
판매중인 상품 목록을 무한 스크롤을 통해 볼 수 있으며 이미지, 제목, 태그, 가격, 판매자 등 정보를 표시하고 있습니다.
또한 검색으로 해당 상품의 제목을 통해 원하는 상품 검색할 수 있습니다.

판매된상품
판매중상품과 동일한 방식 입니다.

