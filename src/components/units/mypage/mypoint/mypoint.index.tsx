import React, { useState, MouseEvent } from "react";
import * as S from "./mypoint.index.styles";
import TapPointLoading from "./mypoint_loading";
import TapPointBuying from "./mypoint_buying";
import TapPointAll from "./mypoint_all";
import TapPointSelling from "./mypoint_selling";

export default function MyPoint(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<{
    name: string;
    index: number;
  }>({
    name: "전체내역",
    index: 0,
  });

  const MyPageHeadInfoButton = [
    { name: "전체내역", component: <TapPointAll /> },
    { name: "충전내역", component: <TapPointLoading /> },
    { name: "구매내역", component: <TapPointBuying /> },
    { name: "판매내역", component: <TapPointSelling /> },
  ];

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

  // 버튼 클릭으로 해당 data 값을 보여주기 위함
  const renderData = (): JSX.Element | undefined => {
    return (
      <S.TableWrap>
        {/* 해당 탭의 배열의 객체 name통해 컴포넌트 가져옴 */}
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
          {/* 서브 탭 버튼 */}
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
        {/* 해당 탭 data */}
        <div>{renderData()}</div>
      </S.MyPageBodyWrap>
    </S.Wrap>
  );
}

// 🎈 2024.08.06.화 /
// 해야할 것:
// 1. 나머지 탭 완성하기
// 2. 각 탭의 pagination의 count 완성하기 - 전체내역 탭은 해당 API의 count가 없어
//    각각의 탭의 count를 더해야 할 듯? 비효율 적으로 API 요청하므로 방법 찾기
// 3. 코드 정갈하게 하고 다른 탭이 있는 곳도 적용하기
// 4. 검색은 필요 없을 듯
// 5. 해당 페이지에서 나갔다 다시 오면 해당 탭 버튼 초기화 하기
//

// 🎈 2024.08.08.목 /
// 1. 로그인이 필요한 페이지에 대한 withAuth 즉 로그인 체크 완성
//    기존 refreshToken의 유무에 따라 로그인 확인을 했으나 문제점이 있었음
//      - 다른곳에서 로그아웃을 하고 로그인이 필요한 페이지 접속을 하면
//        ApolloClient의 cache에 의해 저장된 데이터가 보여질 뿐만 아니라
//        로그아웃으로 restoreAccessToken이 삭제 되었는데도 유효성 검사에 안걸림
//        새로고침을 해야 정상
//      - 이렇게 접속된 페이지에서 로그인 버튼 클릭으로 로그인 시도하면
//        유효성 검사에 accessToken이 없다고 떠 로그인 페이지로 계속 리턴
//        실제로는 로그인 되었으나 로그인 페이지로 이동됨
// 2. MyPoint에서 초기값이 없어 가장 탭 선택이 안 되어있고, data가 비어진 상태로 접속됨
//      - 객체의 state의 초기 값이 ""으로 비어있음
//      - 그로인데 해당 selectedValue.name을 통해 데이터 가져오는 로직에서 undefined를 반환
//
// 해결:
// 1. 로그인 시 sessionStorage에 setItem으로 accessToken을 저장하도록 했음
//    또한 로그아웃은 removeItem으로 삭제를 했으며
//    새로고침으로 ApolloClient에서 accessToken 발급을 setItem으로 새로운 accessToken으로 변경
//    이렇게 해당 스토리지에 저장된 accessToken을 확인하여 해당 로그인 필요 페이지 문제 해결
//      - 우려되는 점은 보안상 XSS 공격에 취약하다.
//      - 상태관리 라이브러리로 저장을 하면 해결이 되는데 리렌더링에 대한 문제와 새로고침 시
//        바로 새로운 accessToken을 받아오는 시간이 걸려 로그인을 해도 로그인 페이지 이동이 됨
//
// 2. 첫 마운트에 내 포인트 탭에 들어가면 서브 탭의 전체내역, 충전내역, 구매내역, 판매내역의
//    선택이 안되어있고 selectedValue.name에 따라 해당 data를 가져오는데 data를 못 가져옴
//    그래서 객체의 state인 selectedValue의 초기 값 name에 첫 번째 탭인 "전체내역"으로 해줬고
//    그로 인해 selectedValue.name의 값에 따라 data 가져오는 것 도 해결함
//
// 해야할 것:
// 1. 나머지 서브 탭 완성하기 - (구매, 판매내역)
// 2. pagination 해결하기
// 3. search는 삭제
// 4. Markets의 상품 구매기능 구현하기
// 5. 내 프로필 구현 - 프로필 이미지 변경은 완성함
//
// 자잘한 문제점:
// 1. Markets의 등록에 상품 이미지 등록 위치 정상화 하기
// 2. 등록 클릭 시 update 또는 refetch로 새로 등록한 상품 추가되게 하기
// 3. 등록 클릭 시 router로 페이지 이동하기
// 4. 서브 탭 클릭으로 초기화 되지 않는 문제 해결하기 - 스토리지 저장 문제
//

// 🎈 2024.08.09.금 /
// 1. 서브 탭에 대한(전체내역, 충전내역, 구매내역, 판매내역) data를 해당 태그 요소안에
//    data만 변경을 해서 넣어 줬음
//     - 하지만 해당 테이블의 head의 개수도 다르고 title도 달라 switch문을 통해
//       해당 JSX를 불러와서 해결을 하긴 했음...
// 1-1 문제점:
//      해당 /mypoint 컴포넌트에 모든 data를 useQuery
//      하고 있어 전체내역만 보고 있는데 다른 충전, 구매, 판매 data를 API 요청으로 가져옴..
// 1-2 문제점:
//      그래서 해당 배열의 객체에 routerQuery의 key를 추가해 탭 클릭에 대한 실행함수에
//      router.push로 이동을 하고 해당 컴포넌트를 따로 만들어 보여줬음
//      하지만 메인 MyPage의 탭인 내 장터, 내 포인트, 내 프로필이 초기화 되며
//      전체적으로 리렌더링이 일어나고 더 효율적이지 못한 것 같음...
// 1-3 해결:
//      1. 태그 요소의 스타일 부분을 그대로 복사해서 따로 분리하고 일일히 각각의 컴포넌트를 만듦
//      2. data를 각각의 컴포넌트에 필요한 것만 불러오니 mypoint에 들어가면 보고있는 data만
//         불러오고 있음
// 아쉬운점은 HTML의 스타일이 비슷해서 data만 넣어 변경을 할 수 있을 것 같은데
// 이 모든 data를 어떻게 해줘야 할지 생각이 안나고 보수에 있어 복잡해질 것 같아
// 각각의 컴포넌트를 만들어 짧게 만듦...
//
// 해야할 것:
// 1. emotion의 스타일을 다시 변수명 변경을 하고 다 따로 styles.ts 파일을 분리한다.
// 2. 분리하고 해당 data에 맞게 css 작업하기
// 3. 구매, 판매내역 data 불러오기
// 4. 내 장터의 나의상품, 마이찜 또한 불필요한 data API 요청을 하고 있음
//    앞서 해결한 것 처럼 각각의 컴포넌트 생성을 하든가 이는 data만 변경해 넣어주면 돼서
//    더 좋은 방법 찾기
// 5. 내 프로필 구현하기
//
// 당장 할 것:
// 1. Table의 Head 제목 추가
// 2. pagination 추가
//

// 🎈 2024.08.10.토 /
// 해야할 것:
// 1. pagination, search 필요한 곳에 추가
// 2. 구매내역의 값이 없어 아직 미완성
// 3. 구매 기능 구현
// 4. 내 장터 또한 각 컴포넌트화 해서 불 필요한 data요청 막기 - 다른 곳 또한 마찬가지
// 5. 내 프로필 완성하기 - 비번 변경, 충전 기능 구현하기
//

// 🎈 2024.08.11.일 /
// 1. 구매 기능 완 - MarketsDetail의 구매기능으로 구매내역이 필요해 넘어가 구현하고 왔음
//     - 단 구매 클릭으로 페이지 이동 or 영수증 페이지 구현하기
//     - refetch, update로 상품 리스트 업데이트와 내 포인트 refetch로 포인트 최신화 유지
//
// 문제였던..:
// 1. 구매 버튼을 클릭을 하면 User: name어쩌구 에러 메시지가 떴음
//    이유는 구매 API에서 buyer의 값이 null로 들어가 오류가 발생
// 2. buyer의 값을 어떻게 해줘야 하는지 계속 찾는 중 playGround에서 buyer를 사용을 했으나
//    buyer를 빼고 실행을 하니 해결됨
//
// 해야할 것:
// 1. 구매버튼을 클릭을 하면 페이지 이동으로 List or 영수증 페이지 만들어 이동하기
// 2. 구매버튼을 클릭을 하면 List update or refetch 하기 - 내 포이트 포함
// 3. 구매내역 구현하기
// 4. 내 프로필 페이지 완성하기
// 5. Markets의 판매중, 판매된 요소 MyPage와 같게 배열의 객체로 구분하고 각 data 컴포넌트
//    분리하여 불필요한 data API 요청 줄이기
// 6. 구매를 하고 페이지 이동을 하면 상관은 없으나 이동을 하지 않고 해당 상품 페이지에 있으면
//    렌더링이 일어나지 않아 구매버튼이 그대로 있음(사라지게는 할 수 있음)
//    그 상태로 구매 버튼 클릭을 하면 이미 판매된 상품이라고 에러 메시지가 뜸
//    이에 대한 처리 필요
//

// 🎈 2024.08.12.월 /
// 1. MyPoint의 대한 서브 탭 완성함
// 2. 전체내역의 pagination은 해당 Count의 API가 없어 최근 10개로만 보여줌
// 3. 구매, 판매내역의 검색창은 제외함 - 필요성 못 느낌..
// 4. 해당 서브 탭의 data를 fetchPolicy: "cache-and-network"를 사용해 항상 API 요청보냄
//      - 이유는 다른 사용자로 로그인 하면 이전의 사용자 data가 남아있음
//      - refetch도 생각 했으나 서브 탭의 클릭에 대한 refetch를 해줘야 하는데
//      - 그렇게 되면 또 여기서 refetch를 사용하기 위해 useQuery를 사용을 해야함..
//      - 사용에서는 cache를 사용해 서브 탭 이동간 API 요청이 없는 것이 좋지만
//      - 당장 좋은 방법으로는 cache-and-network를 사용하는게 좋다 생각함
//      - 더 좋은 방법이 있겠지만 생각안남..
//
// 해야할 것:
// 1. 내 프로필 완성하기 - 비밀번호 변경 + 포인트 충전(할 수 있으면..)
// 2. 내 장터 = 내 포인트의 서브 탭 처럼 컴포넌트 구성을 하기
//      - 불 필요한 API 요청 줄이고 유지보수 간편
//      - 단 똑같은 틀에 data만 변경해서 넣은 것이 아닌 각각의 컴포넌트 만들어야 함
//      - 나의상품, 마이찜 목록이 없으면 pagination 없애기
//
// 마지막:
//  - 위의 해야할 것 2가지 끝내면 끝이다.
//  - graphql의 play ground에서 추가로 API가 뭐가 있는지 확인하고
//  - 다른 컴포넌트 최적화 하기 - LayoutHeader의 로그인, Markets, Boards 등등
//  - 추가 로그인에 대한 refetchAccessToken에 대한 accessToken 리렌더링 해결하기
//
// MyProfile로 넘어감
