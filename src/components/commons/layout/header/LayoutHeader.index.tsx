import { useRouter } from "next/router";
import * as S from "./LayoutHeader.styles";
import {
  QUERY_USER_LOGGED_IN,
  useQueryFetchUserLoggedIn,
} from "../../hooks/graphql-queries/useQueryFetchUserLoggedIn";
import { useLogoutUser } from "../../hooks/graphql-mutation/useMutationLogoutUser";
import { useRecoilState } from "recoil";
import { isAccessToken } from "../../../../commons/stores";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutationUpdateUser } from "../../hooks/graphql-mutation/useMutationUpdateUser";
import { useMutationUploadFile } from "../../hooks/graphql-mutation/uesMutationUploadFile";
import { useMutationCreatePointTransactionOfLoading } from "../../hooks/graphql-mutation/useMutationCreatePointTransactionOfLoading";
import Script from "next/script";
import { useApolloClient } from "@apollo/client";
import { message } from "antd";
import {
  FETCH_POINT_TRANSACTIONS_OF_LOADING,
  useQueryFetchPointTransactionsOfLoading,
} from "../../hooks/graphql-queries/useQueryFetchPointTransactionsOfLoading";
import { FETCH_POINT_TRANSACTIONS } from "../../hooks/graphql-queries/useQueryFetchPointTransactions";
import { FETCH_POINT_TRANSACTIONS_COUNT_OF_LOAD } from "../../hooks/graphql-queries/useQueryFetchPointTransactionsCountOfLoad";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();
  const { data, refetch } = useQueryFetchUserLoggedIn();
  const [logoutUser] = useLogoutUser();
  const [updateUser] = useMutationUpdateUser();
  const [uploadFile] = useMutationUploadFile();
  const [createPointTransactionOfLoading] =
    useMutationCreatePointTransactionOfLoading();
  // const { refetch: refetchLoading } = useQueryFetchPointTransactionsOfLoading();
  const outside = useRef<HTMLDivElement | null>(null);
  const ProfileRef = useRef<HTMLInputElement>(null);
  const [isModal, setIsModal] = useState(false);
  const isFirstRef = useRef(true);

  const [accessToken, setAccessToken] = useRecoilState(isAccessToken);

  // 로그아웃 성공 창 띄우기 - AnTd
  const [messageApi, contextHolder] = message.useMessage();
  // 로그아웃
  const client = useApolloClient(); // ApolloClient()에서 cache 가져옴

  const onClickLogout = async (): Promise<void> => {
    const result = await logoutUser();
    try {
      if (result.data?.logoutUser) {
        // 먼저 accessToken을 삭제하고 상태를 초기화
        window.sessionStorage.removeItem("accessToken");
        setAccessToken("");

        // 그런 다음 cache를 초기화하여 모든 데이터를 삭제
        // client.resetStore(): cache를 초기화하고 다시 API 요청으로 data 불러옴
        // client.clearStore(): cache를 초기화하고 끝
        await client.clearStore();

        // 로그아웃 성공 메시지를 보여주기 - AnTd
        void messageApi.open({
          type: "success",
          content: "로그아웃 성공",
        });
      }
    } catch (error) {
      if (error instanceof Error) alert("로그아웃 에러");
    }
  };

  const onClickLogo = (): void => {
    void router.push("/boards");
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/login");
    // 로그인 클릭 시 현재 페이지 주소 저장
    window.sessionStorage.setItem("prevPath", router.asPath);
    // window.sessionStorage.setItem("accessToken", accessToken);
  };
  const onClickMoveToSignUp = (): void => {
    void router.push("/signup");
  };

  // 모달 버튼
  const onClickProfileMore = (e: React.MouseEvent): void => {
    e.stopPropagation(); // 추가 이벤트 동작 막기 위함
    setIsModal((prevState) => !prevState);
  };

  // 모달 프로필 사진 변경
  const onChangeProfileImg = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    // 구글 스토리지에 먼저 저장
    const resultFile = await uploadFile({ variables: { file } });
    const picture = resultFile.data?.uploadFile.url;
    console.log("사진 변경: ", picture);
    await updateUser({
      variables: {
        updateUserInput: {
          name: data?.fetchUserLoggedIn.name,
          picture,
        },
      },
    });
    void refetch();
  };

  const onClickProfileImgRef = (): void => {
    ProfileRef.current?.click();
  };

  // 모달 열고 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (outside.current && !outside.current.contains(e.target as Node)) {
        setIsModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 로그인 시 이전 유저정보 최신화 작업
  // useEffect(() => {
  //   if (isFirstRef.current) {
  //     void refetch();
  //     isFirstRef.current = false;
  //   }
  // }, []);

  const onClickReload = (): void => {
    void refetch();
  };

  const onClickPointTransaction = (): void => {
    window.IMP.init("imp49910675");
    window.IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        name: "100,000 포인트충전",
        amount: 100000,
      },
      async (rsp: any): Promise<void> => {
        if (rsp.success === true) {
          const result = await createPointTransactionOfLoading({
            variables: {
              impUid: rsp.imp_uid,
            },
            refetchQueries: [
              {
                query: FETCH_POINT_TRANSACTIONS_OF_LOADING,
              },
              {
                query: FETCH_POINT_TRANSACTIONS_COUNT_OF_LOAD,
              },
              // {
              //   query: FETCH_POINT_TRANSACTIONS,
              // },
              {
                query: QUERY_USER_LOGGED_IN,
              },
            ],
          });

          // 캐시 업데이트
          const existingTransaction = client.readQuery({
            query: FETCH_POINT_TRANSACTIONS,
          });

          const transactionsArray = existingTransaction?.fetchPointTransactions;

          if (existingTransaction) {
            const updateTransaction = [
              result.data?.createPointTransactionOfLoading,
              ...transactionsArray,
            ].slice(0, 10);
            client.writeQuery({
              query: FETCH_POINT_TRANSACTIONS,
              data: {
                fetchPointTransactions: updateTransaction,
              },
            });
          }
        }
      }
    );
  };

  return (
    <S.Wrap>
      {contextHolder}
      <S.InfoWrap>
        <Script
          src="https://cdn.iamport.kr/v1/iamport.js"
          strategy="afterInteractive"
          onLoad={() => {
            window.IMP.init("imp49910675");
          }}
        />
        <S.Logo onClick={onClickLogo}>Logo</S.Logo>
        {router.asPath.startsWith("/mypage") ? (
          <></>
        ) : (
          <S.LoginMore>
            {accessToken !== "" ? (
              <>
                {/* 유저 상세정보 열고 닫기 */}
                <S.LoggedInWrap onClick={onClickProfileMore}>
                  {/* Image */}
                  <S.IcProfileImg
                    src={
                      !data?.fetchUserLoggedIn.picture
                        ? "/images/loginProfile/ic_profile.png"
                        : `http://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`
                    }
                  />
                  <S.IcMoreImg
                    className="child"
                    src="/images/loginProfile/ic_more.png"
                  />

                  {/* 유저 상세정보 */}
                  {isModal && (
                    <S.Union ref={outside}>
                      <S.ProfileMoreWrap>
                        <S.ProfileMoreImgSettingWrap
                          onClick={onClickProfileImgRef}
                        >
                          {/* setting Image */}
                          <input
                            type="file"
                            style={{ display: "none" }}
                            ref={ProfileRef}
                            onChange={onChangeProfileImg}
                          />
                          <S.ProfileImg
                            src={
                              !data?.fetchUserLoggedIn.picture
                                ? "/images/loginProfile/ic_profile.png"
                                : `http://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`
                            }
                          />
                          <S.SettingImg src="/images/loginProfile/settingProfile.png" />
                        </S.ProfileMoreImgSettingWrap>
                        <S.ProfileUserInfo>
                          <S.ProfileName>
                            {/* {data?.fetchUserLoggedIn.name} */}
                            {data?.fetchUserLoggedIn.name}
                          </S.ProfileName>
                          <S.PointWrap>
                            <S.ProfilePoint>
                              {data?.fetchUserLoggedIn.userPoint?.amount
                                ? data.fetchUserLoggedIn.userPoint.amount.toLocaleString(
                                    "ko-KR"
                                  )
                                : 0}
                              p
                            </S.ProfilePoint>
                            <S.Reload
                              src="/images/loginProfile/Reload.png"
                              onClick={onClickReload}
                            />
                          </S.PointWrap>
                        </S.ProfileUserInfo>
                      </S.ProfileMoreWrap>
                      <S.ProfileFunc>
                        <S.ChargeWrap>
                          <S.ChargeImg src="/images/loginProfile/pig.png" />
                          <S.ChargeTxt onClick={onClickPointTransaction}>
                            충전하기
                          </S.ChargeTxt>
                        </S.ChargeWrap>
                        <S.Line></S.Line>
                        <S.LogoutWrap>
                          <S.LogoutImg src="/images/loginProfile/logout.png" />
                          <S.LogoutTxt onClick={onClickLogout}>
                            로그아웃
                          </S.LogoutTxt>
                        </S.LogoutWrap>
                      </S.ProfileFunc>
                    </S.Union>
                  )}
                </S.LoggedInWrap>
              </>
            ) : (
              <>
                <S.Login onClick={onClickMoveToLogin}>로그인</S.Login>
                <S.Join onClick={onClickMoveToSignUp}>회원가입</S.Join>
              </>
            )}
          </S.LoginMore>
        )}
      </S.InfoWrap>
    </S.Wrap>
  );
}

// 🎈2024.06.22.토 /
// 성공:
// 1. 로그인, 프로필, 로그아웃 기능 구현
// 2. 로그인 후 새로고침을 해도 로그인 유지됨

// 실패:
// 1. API 여러번 요청가는 문제가 있음
// 2. 로그인 후 /boards로 이동을 하는데 새로고침해야 로그인 -> 로그아웃 버튼이 바뀜
// 3. loggedIn API 요청이 여러번 일어남

// 문제:
// 1. 로그인 후 /boards로 이동을 하는데 정상적으로 API 요청함(중복요청 없음)
// 2. 이후 새로고침을 하면 또 로그인 유저정보요청(loggedIn) 여러번 하고 다른 API요청도
//    여러번 함...
// 3. 새로고침만 아니면 문제되는 일은 없음

// 정리:
// 1. 해당 컴포넌트가 여러번 실행이 됨 7번 콘솔에 찍힘
//    콘솔을 보면 data?.fetchUserLoggedIn 이 부분 때문에 여러번 리렌더링이 일어나고
//    값이 들어오고 나서 끝남..
//    즉 해당 fetchUserLoggedIn API 값을 받아올 때까지 리렌더링 하는 것으로 의심..

// 2. ApolloSetting의 useEffect가 초반에 실행이 되어 같은 API가 여러번 요청되는
//    부분으로 의심..
//    이 부분때문에 fetchBoards, fetchBoarCount, fetchBoardOfBest가 여러번 또는
//    실패한 API 요청이 일어남 (실사용에는 문제없음)

// 해야할 것:
// 1. 로그인에 대해 생긴 문제 해결하기 - (1순위)
// 2. 회원가입 페이지 구현 - (2순위)
// 3. 로그인 프로필 상세 구현하기 - (3순위)
// 4. 로그인 useForm 작성 - (후순위)
// 5. 상품페이지 만들고 상품등록 or 상품구매 클릭 시 로그인 된 유저만 이용되게 하기 - (후순위)
//
//

// 🎈2024.06.23.일 /
// 1. 우선 로그아웃인 상태에서 useFetchUserLoggedIn의 계정정보 API 요청을 계속 보냄
//    불필요한 요청이므로 skip을 사용해 해결 - (useQueryFetchUserLoggedIn 확인)
// 2. 로그인을 하면 다 정상적인데 새로고침을 하면 문제가 생김
//    - 먼저 다른 fetchBoards, fetchBoardsCount 등 API 요청이 여러번 일어남
//    - useFetchUserLoggedIn의 API 요청이 3~4번 일어나는데 accessToken을 받면 멈춤
//
// 사용에 있어서는 큰 문제는 없지만 BoardList, LayoutHeader 컴포넌트가 여러번 리렌더링이 일어남
//
// 먼저 해봐야 할 것:
// 1. 새로고침을 하지 않으면 다 정상적으로 API 요청을 하고 된다.
// 2. 하지만 새로고침만 중복 API 요청이 가고 간혈적으로 정상적으로 API 요청이 갈 때도 있다.
// 3. 로그아웃 상태에서 새로고침을 해도 정상적이였는데 무슨 이유인지 고장남...

// 🎈2024.06.28.금 /
// 1. 유저정보 불러오기 성공
// 2. 프로필 기본 이미지, 설정 이미지, 로그아웃 이미지 있음
//
// 해야할 것:
// 1. modal처럼 프로필 클릭을 하면 이름, 포인트 정보 보이기
// 2. 로그아웃 버튼도 같이 추가
// 3. navigationBar 에서 마이페이지 클릭을 하면 상세 유저정보 불러오기
// 4. 마이페이지는 로그인 한 사람만 들어갈 수 있게 하기
//
// 우선순위:
// 1. 로그인 후 프로필 CSS 완성하기
// 2. 마이페이지 CSS 구현
// 3. 마이페이지 API 요청 성공
// 4. 비번 변경 API 구현
// 5. 상품, 포인트 충전 등등...
//

// 🎈2024.06.29.토 /
// 1. 로그인 시 유저정보 css 완성
// 2. 모달 직접 만듦 - 클릭하면 상세정보가 보이고 다른 곳에 클릭을 해도 사라지게 함
//
// 해야할 것:
// 1. 상세정보 CSS 완성하기
// 2. 마이페이지 또는 상품 페이지 구현
//

// 🎈2024.07.01.월 /
// 1. 로그인 시 상세정보 완성
// 2. 로그아웃 후 다른 아이디 로그인 시 이전의 유저정보가 있음
//    새로고침을 해야 됨 - 그래서 useEffect로 수정함
// 3. 새로고침을 하니까 유저 정보가 초기화 되어 못 가지고 옴 - FetchUserLoggedIn에서
//    fetchPolicy를 cache-only에서 cache-first로 수정함
//    cache-only: 서버요청없이 저장된 데이터만 가지고 옴
//    cache-first: 먼저 저장된 데이터 확인 후 없으면 서버에 요청으로 데이터 가지고 옴
//
// 해야할 것:
// 1. 상세정보의 이미지 변경 완성하기
// 2. 충전하기 구현 또는 충전 페이지 필요시 충전 페이지 or 상품 페이지 구현하기
// 3. 충전 시 Point가 자릿 수 찍히는지 확인

// 🎈2024.07.03.수 /
// 1. 상세정보 이미지 변경 완성
//
// 해야할 것:
// 1. 마이페이지 구현하기
// 2. 상품페이지 구혀하기

// 🎈2024.07.05.금 /
// 1. data?.fetchUserLoggedIn.picture === "" 조건을 이렇게 해서
//    이미지 유무를 판단했는데 이상하게 http://storage.googleapis.com/undefined로
//    요청이가 한번 실패를 하고 한 번더 요청을 해서 이미지 데이터를 가져왔음
// 2. 이렇게 하니 생긴 문제를 !data?.fetchUserLoggedIn.picture로 하니 해결됨 내 이틀이..
// 3. 로그인 시 이전 유저 데이터가 남아있는 현상이 있었는데 이전 방법으로
//    useEffect로 refetch()를 했으나 무슨 이유인지 FetchUserLoggedIn API 요청이 두 번 나감
//    한번은 null인 값을 보냄 아마 첫 번째 문제였던 picture 때문인 듯..
//    리렌더링을 최소화 하고자 useRef를 사용해 첫 마운트 때만 refetch()를 진행함
