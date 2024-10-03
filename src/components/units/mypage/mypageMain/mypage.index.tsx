import { MouseEvent, useState } from "react";
import TapMyPageISold from "./mypageMain_iSold";
import TapMyPagePicked from "./mypageMain_Picked";
import * as S from "./mypage.index.styles";

export default function MyPageMain(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<{
    name: string;
    index: number;
  }>({
    name: "나의상품",
    index: 0,
  });

  // 서브 탭
  const MyPageHeadInfoButton = [
    { name: "나의상품", component: <TapMyPageISold /> },
    { name: "마이찜", component: <TapMyPagePicked /> },
  ];

  // 서브 탭 실행 함수
  const onClickTap = (
    event: MouseEvent<HTMLDivElement>,
    index: number
  ): void => {
    const newValue = event.currentTarget.id;
    setSelectedValue({
      name: newValue,
      index,
    });
  };

  // 서브 탭의 해당 컴포넌트 실행 함수
  const renderData = (): JSX.Element | undefined => {
    return (
      <S.TableWrap>
        {MyPageHeadInfoButton.map((el) => {
          if (el.name === selectedValue.name && el.component) {
            return <div key={el.name}>{el.component}</div>;
          }
          return null;
        })}
      </S.TableWrap>
    );
  };

  return (
    <S.Wrap>
      <S.MyPageHeadWrap>
        <S.MyPageHeadBtn>
          {MyPageHeadInfoButton.map((el, index) => (
            <S.MyPageInfoBtn
              key={el.name}
              id={el.name}
              onClick={(event) => onClickTap(event, index)}
              selected={selectedValue.name === el.name}
            >
              {el.name}
            </S.MyPageInfoBtn>
          ))}
        </S.MyPageHeadBtn>
      </S.MyPageHeadWrap>
      <S.MyPageBodyWrap>
        <div>{renderData()}</div>
      </S.MyPageBodyWrap>
    </S.Wrap>
  );
}

// 🎈 2024.07.04.목 /

// page에 boards 안에 /boards/[boardId] 가 있는 것 처럼
// router.push를 사용을 하거나
// ul, li를 사용해 화면을 보여줄지 확인을 하는데
//
// 나는 pages/mypage에서 /profile 과 /repassword 이렇게 추가를 해줄 것이다.
// boardId와 같은 방식
//

// 기본 MyPage에서는 프로필 사진, 닉네임 변경을 할 수 있게 하고
// 탭의 종류는 비밀번호 변경, 포인트 관리, 등이 있고
// 나중에 상품 구매, 판매관련 정보와 충전 등 추가할 것임
//
// 우선 계정에 대한 수정할 수 있는 부분은 프로필사진, 이름, 비밀번호 변경이 있다.
// 현재 비밀번호를 입력하면 새로운 비밀번호 설정을 할 수 있는 기능.
// 정리:
// 1. 탭은 내 장터, 내 프로필, 내 포인트, 비밀번호 변경 이렇게 만들 것.
// 2. 마이페이지 탭을 만드는데 이름, 사진 변경이 가능하게 한다.
// 3. 내 장터는 나의 상품 / 마이찜 태그가 있는데 틀을 그대로 데이터만 갈아끼우는 방식
// 4. 내 포인트도 같은 방식을 사용할 것
// 5. 비밀번호 변경은 현재 비밀번호 입력을 하고 새비밀번호,새비밀번호확인 인증되면 변경 ok

// 해야할 것:
// 1. 우선 마이페이지보다 상품페이지 먼저 만들기
// 2. 상품페이지에서 베스트 상품, 판매중 상품, 판매된 상품, 오늘 본 상품 이렇게 있다.
// 3. 해당 상품페이지는 로그인 시 접속이 가능하게 만들 것이고
// 4. 댓글에는 대댓글이 가능하게 구현할 것
//

// 🎈 2024.08.02.금 /
// 1. Header, Navigation, Banner의 width를 화면 꽉차게 했음
// 2. 마이페이지의 탭(내 장터, 내 포인트, 내 프로필)을 Layout에 추가
//    이는 startWith를 통해 "/mypage"로 시작하는 주소만 마이페이지 탭이 보이도록 함
// 3. 해당 탭 이동 주소 페이지 만듦 - /myshopping, /mypoint, /myprofile
//
// 해야할 것:
// 1. 탭 완성하기 - 특히 해당 탭인 상태에서 색상 표시 유지 하기
//    router의 asPath나 query를 사용해 조건을 걸든 찾기
// 2. 해당 탭 이동에 대한 page 화면 완성하기 - shopping, point, profile 등
//    탭 완성이 빠르면 shopping 늦으면 간단한 profile 하기
//

// 🎈 2024.08.03.토 /
// 1. 마이페이지 탭 90% 완성
//     - 탭 전체 높이 지정해줘야 함, 다른 추가 문제점 생길 수 있음.
//
// 해야할 것:
// 1. 각 탭에 보여질 페이지 만들기
//     1) 내 장터
//     2) 내 포인트
//     3) 내 프로필
//

// 🎈 2024.08.04.일 /
// 1. 내 장터의 나의상품, 마이찜 버튼 기능 완
//
// 해야할 것:
// 1. 검색과 페이지 이동 구현 - 나의상품, 마이찜 이동으로 데이터 초기화하는데 refetch를 해줘야 됨...
// 2. 스타일 완성하기
// 3. pagination 구현
//

// 🎈 2024.08.05.월 /
// 1. search, pagination 완
//    단 search에 대한 page 개수 안됨 - ItemCountISold에 대한 search값을 안 받고 있음
//
// 해야할 것:
// 1. css 스타일 완성
// 2. search에 대한 pagination 해결
// 3. 마이찜에 대한 search, pagination 구현
//     - 나의상품과 마이찜의 search와 pagination은 같은거 사용하되 다르게 동작하기
// 4. 클릭으로 해당 상품 들어가기 - (MarketDetail)
// 5. 상품 등록하기에서 등록버튼 클릭을 하면 /markets로 이동을 하고 update하기
//

// 🎈 2024.08.06.화 /
// 1. 스타일 완
// 2. 검색에 대한 결과에서 해당 개수를 지원하고 있지 않아 pagination 조절이 안됨
// 3. 나의상품, 마이찜 불러오기 완
//
// 해야할 것:
// 1. 내 포인트 페이지 완성하기
// 2. 마이찜 클릭 후 다른 페이지 이동 후 되 돌아왔을 때 나의상품으로 버튼 초기화하기
// 3. 마이페이지 로그인 후 접속 가능하게 하기
//
// 사소한 문제점 (먼저 할 수 있으면 하기):
// 1. 상품 등록 시 marketsList로 이동하기
// 2. 마이페이지의 내 장터에서 해당 상품 클릭 시 이동하기
// 3. MarketsDetail에서 목록 버튼 클릭 시 이전 페이지로 이동하기
//    - 로그인 버튼 처럼 스토리지에 저장해서 해결하기
// 4. 구매하기 버튼 구현하기 - 현 등록하기 페이지로 이동됨
// 5. 판매된 상품에는 구매하기 버튼 없애기
// 6. 리렌더링 최소화 하기
//
// MyPage의 MyPoint로 이동
//
//

// 🎈 2024.08.13.화 /
// 1. 각 탭의(나의상품, 마이찜)의 컴포넌트만 구현하면 됨
//
// 해야할 것:
// 1. 나의상품, 마이찜 각각의 컴포넌트 생성
// 2. 이렇게 되면 markets의 탭 또한 배열을 통한 data 보여주기 해보기
// 3. refreshToken을 보내 accessToken 업데이트 하는 ApolloSetting에서의
//    useEffect로 인한 중복 API 요청 일어남, 이부분 해결하기
// 4. 게시글, 상품의 Best API 좋아요 수에 따라 위치 이동으로 매번 API 요청을 하는데
//    이 부분 해결해 보기 - 조건을 걸어 좋아요 클릭 시 refetch 실행 등
// 5. Layout의 Banner 이미지 변경하기
// 6. Layout의 Header의 로그인으로 인한 리렌더링 및 LoggedIn API 중복 요청 해결하기
//

// 🎈 2024.08.14.수 /
// 1. 각 탭의(나의상품, 마이찜) 완성
// 2. 해당 탭의 Search, pagination 완성
//    각각의 서브 탭 컴포넌트에 Search, pagination 커스텀 훅을 따로 사용을 해 리렌더링에 대한
//    오류 사라짐

// 3. 각 서브 탭에 Search를 사용하다 보니 searchBar위치가 이상해짐
//    그래서 MyPageMain의 Wrap(해당 주소에서 Layout를 제외한 모든 영역)을
//    position: relative로 부모의 기준을 잡고
//    다른 컴포넌트에 있는 Search를 position: absolute로 위치를 잡음
//    꼭 MyPageMain의 Wrap이 아닌 Search가 있는 컴포넌트의 Wrap 기준으로 위치를 잡아도
//    되지만 전자가 더 쉽게 위치 잡을 수 있었음

// 4. 로그아웃 하고 다른 계정으로 로그인 시 이전의 계정 data가 남아있음
//    이는 ApolloClient의 cache가 저장되어있고 남아 있어 생긴 문제
//    그래서 로그아웃 할 때 cache 삭제를 통해 해결함
//    useApolloClient를 import 하고 변수에 담아 실행 함수내에 .resetStore()해주면 된다.
//    변수 선언 시 컴포넌트 최상단에 해줘야 에러 없음
//    자세한 설명은 LayoutHeader의 로그아웃 실행함수 참고
//
// 해야할 것:
// 1. refreshToken으로 인한 리렌더링 문제 해결하기
// 2. 로그인 하면 fetchUserLoggedIn 또는 로그아웃인 상태에도 해당 API 요청이 여러번
//    요청을 했으나 현재 그렇게 않음... ㅎ..해결!
// 3. banner 이미지 변경
// 4. bast 상품, 게시글 refetch 최적화 해보기
// 5. 가능하면 최근본 상품에서 각각의 유저마다 데이터 가져오기.. 가능하면;
// 6. 회원가입 useForm 비밀번호 확인 해당 MyProfile의 비밀번호 변경 처럼 수정하기
// 7. 로그인 input 요소 form 태그 사용과 useForm으로 변경하기
// 8. 테스트 코드 공부
// 9. 배포 공부
// 10. 파일 경로, 이름 정리 + 주석
//
// Markets의 서브 탭(판매중상품, 판매된상품) 또한 배열을 통한 방법으로 하려 했으나
// 같은 API로 refetch를 통한 data 값만 변경을 하고 있어 그대로 유지하고
// Search 부분 손보기
//
// 먼저할 것:
// 1. 상품 등록 시 router 이동 하기
// 2. 충전 시 refetch로 데이터 최신
//    - refetch가 아닌 cache를 직접 수정을 해결
//    - client.readQuery와 client.writeQuery 사용
// readQuery: 수정하고자 하는 Query문을 가져온다.
// writeQuery: 어떻게 수정할지 data입력한다.
// 3. ✨client 수정으로 충전 뿐만 아닌 나의찜, 나의상품 등 refetch 없이 캐시 수정으로
//    업데이트 하기
//      - 나의상품 완
//      - 구매내역, 판매내역, 나의찜 해야함
//     나의찜을 하려는데 해당 toggleUseditemPick의 반환하는 값이 없고
//     기존의 data가 없어 수정 추가가 안됨
//     또한 현재 해당 tlqkf 안된다.
//     타입 넣고 해도 안됨;;
//
//
// refetch는 data를 같은 공간에서 사용할 때 하는 것이 불 필요한 API 요청을
// 줄일 수 있다 생각함
//

// 🎈 2024.08.16.금 /
// 1. Best 상품의 refetch는 해당 UsedItemPicked를 클릭 시 refetchQuery로 API 요청함
// 2. MyPage에서 각각의 서브 탭에 대한 cache 수정 및 refetch 했음
//     - pick은 Best와 IPicked 가 있어 refetch로 진행을 해야 배열의 순서에 맞게
//       렌더링 됨
//     - 또한 다른 서브탭에서 pagination이 있는 탭은 refetch를 해야 count에 맞게
//       page 증가를 하고 그렇게 않으면 count 또한 client.readQuery / writeQuery를
//       해야하는 번거로움이 있음 - refetch보다 이 방법이 더 좋을 수 있지만 편의성은
//       refetch가 더 편하다.
//   다른 서브 탭의 pagination 사용하고 있다면 변경 예정
//
// 해야할 것:
// 1. 서브 탭의 pagination 있는 곳은 refetch로 새로운 데이터 받아오기
// 2. refreshToken에 대한 리렌더링 해결하기 - useContext 또는 Recoil의 state가 아닌 다른..
// 3. Board 최적화.
// 4. Header 최적화.
// 5. ApolloClient 최적화
// 6. 배포
//

// 🎈 2024.08.17.토 /
// 1. 서브 탭 pagination 있는 곳 refetch로 변경
// 2. Board - 우선 Best와 search시 pagination 번호 초기화 했음
// 3. MyPage에서 다른 아이디로 다시 로그인 하면 이전에 data 처리 방법 찾는중
//
// 해야할 것:
// 1. Header 최적화 - 로그인 시 LoggedIn API가 여러번 호출 됨
// 2. ApolloClient 최적화 - accessToken
// 3. markets의 상품 댓글, 대댓글 구현
// 4. Banner 이미지 변경
// 5. 배포
//
// 로그인 data 처리는 useApolloClient로 삭제하는 걸 추천하고 있음
// 로그아웃으로 cache를 삭제해 보안에 안전하게 지켜주는 방식인 듯..
// 여기서 발생하는 api 요청은 불가피 하는듯?
// 일단 cache 삭제하는 방식으로 했음.

// MarketsDetailComment로 이동
//
