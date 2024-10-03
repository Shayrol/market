import { Tooltip } from "antd";
import { getDate } from "../../../../commons/libraries/getDate";
import {
  FETCH_USED_ITEM,
  useQueryFetchUsedItem,
} from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItem";
import * as S from "./MarketsDetail.index.styles";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  QUERY_USER_LOGGED_IN,
  useQueryFetchUserLoggedIn,
} from "../../../commons/hooks/graphql-queries/useQueryFetchUserLoggedIn";

import { useRecoilValue } from "recoil";
import { isAccessToken } from "../../../../commons/stores";
import { useMutationDeleteUsedItem } from "../../../commons/hooks/graphql-mutation/useMutationDeleteUsedItem";
import { FETCH_USED_ITEMS } from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItems";
import { useMutationToggleUsedItemPick } from "../../../commons/hooks/graphql-mutation/useMutationToggleUsedItemPick";
import KakaoMapDetail from "../../../commons/hooks/KaKaoMap/useKakaoMap.infoDetail";
import { useMutationCreatePointTransactionOfBuyingAndSelling } from "../../../commons/hooks/graphql-mutation/useMutationPointTransactionOfBuyingAndSelling";
import { useApolloClient } from "@apollo/client";
import { FETCH_USED_ITEMS_I_PICKED } from "../../../commons/hooks/graphql-queries/useQueryFetchUsedIPicked";
import {
  IQuery,
  IQueryFetchUseditemsIPickedArgs,
  IUseditem,
} from "../../../../commons/types/generated/types";
import { FETCH_USED_ITEMS_OF_THE_BEST } from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItemsOfTheBest";
import { FETCH_POINT_TRANSACTIONS_OF_BUYING } from "../../../commons/hooks/graphql-queries/useQueryfetchPointTransactionsOfBuying";
import { FETCH_POINT_TRANSACTIONS_OF_LOADING } from "../../../commons/hooks/graphql-queries/useQueryFetchPointTransactionsOfLoading";
import { FETCH_POINT_TRANSACTIONS } from "../../../commons/hooks/graphql-queries/useQueryFetchPointTransactions";
import { FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING } from "../../../commons/hooks/graphql-queries/useQueryFetchPointTransactionsCountOfBuying";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function MarketDetail(): JSX.Element {
  const { data, refetch } = useQueryFetchUsedItem();
  const { data: dataLogin } = useQueryFetchUserLoggedIn();
  const [deleteUseditem] = useMutationDeleteUsedItem();
  const [toggleUseditemPick] = useMutationToggleUsedItemPick();
  const [createPointTransactionOfBuyingAndSelling] =
    useMutationCreatePointTransactionOfBuyingAndSelling();
  const [contents, setContents] = useState("");
  const accessToken = useRecoilValue(isAccessToken);
  const router = useRouter();
  const client = useApolloClient();

  useEffect(() => {
    const sanitizedContents = DOMPurify.sanitize(
      String(data?.fetchUseditem.contents)
    );
    if (data?.fetchUseditem.contents) {
      setContents(sanitizedContents);
    }
  }, [data?.fetchUseditem.contents]);

  const onClickMoveToMarketsList = (): void => {
    void router.push("/markets");
  };
  console.log(data?.fetchUseditem.seller?._id);

  // 수정버튼
  const onClickUpdate = (): void => {
    if (!accessToken) {
      alert("로그인후 이용가능합니다.");
    } else {
      void router.push(`/markets/${router.query.useditemId}/Edit`);
    }
  };

  // 삭제버튼
  const onClickDelete = async (): Promise<void> => {
    await deleteUseditem({
      variables: { useditemId: String(router.query.useditemId) },
      refetchQueries: [
        {
          query: FETCH_USED_ITEMS,
          variables: { useditemId: String(router.query.useditemId) },
        },
      ],
    });
    void router.push("/markets");
  };

  // 상품 찜 기능
  const onClickPicked = async (): Promise<void> => {
    if (!accessToken) return alert("로그인 후 이용 가능합니다.");
    void toggleUseditemPick({
      variables: {
        useditemId: String(router.query.useditemId),
      },
      optimisticResponse: {
        toggleUseditemPick: (data?.fetchUseditem.pickedCount ?? 0) + 1,
      },
      update: (cache, { data }) => {
        if (typeof data?.toggleUseditemPick === "number") {
          cache.modify({
            // 상세히 cache의 데이터를 찾음
            id: cache.identify({
              __typename: "Useditem",
              _id: String(router.query.useditemId),
            }),
            // 해당 API의 Useditem 타입에 있는 pickedCount를 업데이트함
            fields: {
              pickedCount() {
                return data?.toggleUseditemPick; // 최신 데이터를 pickedCount에 수정
              },
            },
          });
        } else {
          alert("usedPick에 문제가 있습니다.");
        }
      },
      // 다시 새로운 데이터를 가져옴 - refetch로 API 요청됨
      refetchQueries: [
        {
          query: FETCH_USED_ITEMS_I_PICKED,
          variables: {
            search: "",
            page: 1,
          },
        },
        {
          query: FETCH_USED_ITEMS_OF_THE_BEST,
        },
      ],
    });
  };

  // 구매하기
  const onClickBuyingAndSelling = async (): Promise<void> => {
    if (!accessToken) {
      alert("로그인후 이용가능합니다.");
    } else {
      const result = await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId: String(data?.fetchUseditem._id),
        },
        refetchQueries: [
          {
            query: FETCH_POINT_TRANSACTIONS_OF_BUYING,
          },
          {
            query: FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING,
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
      const existingTransactions = client.readQuery({
        query: FETCH_POINT_TRANSACTIONS,
      });

      const transactionsArray = existingTransactions?.fetchPointTransactions;

      if (existingTransactions) {
        const updateTransactions = [
          result.data?.createPointTransactionOfBuyingAndSelling,
          ...transactionsArray,
        ].slice(0, 10);

        client.writeQuery({
          query: FETCH_POINT_TRANSACTIONS,
          data: {
            fetchPointTransactions: updateTransactions,
          },
        });
      }
      void router.push("/markets");
      // 영수증 페이지 이동하기 - 나중에...만듦...
    }
  };

  return (
    <S.Wrap>
      <S.ContentsWrap>
        <S.TitlesWrap>
          <S.TitleWrap>
            <S.Title>
              {data?.fetchUseditem.name ? data?.fetchUseditem.name : "제목없음"}
            </S.Title>
            <S.Remarks>
              {data?.fetchUseditem.remarks
                ? data?.fetchUseditem.remarks
                : "부가설명 없음"}
            </S.Remarks>
          </S.TitleWrap>
          <S.PickedCountWrap>
            <S.PickedCountImg
              src="/images/markets/detail/ic_favorite.png"
              onClick={onClickPicked}
            />
            <S.PickedCount>{data?.fetchUseditem.pickedCount}</S.PickedCount>
          </S.PickedCountWrap>
        </S.TitlesWrap>
        <S.Price>
          {data?.fetchUseditem.price?.toLocaleString("ko-KR")}원
        </S.Price>
        {data?.fetchUseditem.images
          ?.filter((el) => el)
          .map((el, index) => (
            <S.ContentsImage
              src={`https://storage.googleapis.com/${el}`}
              key={el + index}
            />
          ))}
        {
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: contents,
            }}
          />
        }
        <S.TagsWrap>
          <S.Tags>
            {data?.fetchUseditem.tags?.length === 0 ?? !data?.fetchUseditem.tags
              ? "#no-tag"
              : data?.fetchUseditem.tags
                  .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
                  .join(" ")}
          </S.Tags>
        </S.TagsWrap>
        <S.KakaoMapWrap>
          {!data?.fetchUseditem.useditemAddress?.addressDetail ? (
            <></>
          ) : (
            <KakaoMapDetail />
          )}
        </S.KakaoMapWrap>
      </S.ContentsWrap>

      <S.UserWrap>
        <S.WriterImg
          src={
            data?.fetchUseditem.seller?.picture !== null ?? undefined
              ? `https://storage.googleapis.com/${data?.fetchUseditem.seller?.picture}`
              : "/images/markets/list/ic_profile.png"
          }
        />
        <S.WriterTimeWrap>
          <S.WriterInfo>{data?.fetchUseditem.seller?.name}</S.WriterInfo>
          <S.TimeInfo>{getDate(data?.fetchUseditem.createdAt)}</S.TimeInfo>
        </S.WriterTimeWrap>
        <S.Tooltip>
          <S.TooltipImg src="/images/board/detail/link.png" />
          <Tooltip
            placement="topRight"
            title={`${
              data?.fetchUseditem.useditemAddress?.addressDetail ?? "주소미입력"
            }`}
          >
            <S.TooltipImg src="/images/board/detail/location.png" />
          </Tooltip>
        </S.Tooltip>
      </S.UserWrap>
      <S.FooterWrap>
        <S.FooterBtnWrap>
          <S.FooterBtn onClick={onClickMoveToMarketsList}>목록</S.FooterBtn>
          {accessToken ? (
            dataLogin?.fetchUserLoggedIn._id ===
            data?.fetchUseditem.seller?._id ? (
              <>
                <S.PrimaryButton onClick={onClickUpdate}>
                  수정하기
                </S.PrimaryButton>
                <S.PrimaryButton onClick={onClickDelete}>
                  삭제하기
                </S.PrimaryButton>
              </>
            ) : (
              <>
                {data?.fetchUseditem.buyer !== null ? (
                  <></>
                ) : (
                  <S.PrimaryButton onClick={onClickBuyingAndSelling}>
                    구매하기
                  </S.PrimaryButton>
                )}
              </>
            )
          ) : (
            <div style={{ width: "100%" }}>
              {data?.fetchUseditem.buyer !== null ? (
                <></>
              ) : (
                <S.PrimaryButton onClick={onClickBuyingAndSelling}>
                  구매하기
                </S.PrimaryButton>
              )}
            </div>
          )}
        </S.FooterBtnWrap>
      </S.FooterWrap>
    </S.Wrap>
  );
}

// 🎈 2024.07.09.화 /
// 1. 제목이 name였음 seller와 buyer의 name은 다름
// 2. 대부분 기능은 잘 동작하는 듯 함

// 해야할 것:
// 1. 구매하기, 찜 하기 등 구현을 하고 로그인 시에만 동작하기
// 2. 상품 Detail에서 피그마 디자인과 비슷하게 구현하기
// 3. 상품 등록 페이지도 구현하기
// 4. 화이팅...
//

// 🎈 2024.07.11.목 /
// 1. LayoutHeader의 포인트 충전기능 구현 했음
// 2. MarketsDetail의 구매하기 버튼을 로그인 시에만 함수 실행할 수 있게 함
//    (accessToken을 useRecoilState가 아닌 useRecoilValue로 했음 리렌더링 최소)
//
// 해야할 것:
// 1. 구매하기 버튼 클릭으로 구매 API 요청 보내기
// 2. MarketsList의 상품등록하기 페이지 구현
// 3. 마이페이지 구현

// MarketsWriter.index.tsx로 넘어감

// 🎈 2024.07.31.수 /
// 1. 찜 기능 추가됨
// 2. 최근 본 상품 완료 - 단 localStorage에 저장을 해서 찜을 해서 count가 변경이 되어도
//    localStorage에 저장된 값은 이전의 count여서 반영 안됨
// 3. 최근 본 상품 전체 삭제 버튼 생성함

// 해야할 것:
// 1. 등록한 위치에 지도 위치를 띄울 것
//    단 지도 위치를 등록 하지 않았다면 지도는 안 보이게 할 것
// 2. 상품 등록에 지도 위치 지정 손보기
//     - 상세 위치 입력이 뭔가 부족한 듯 마음에 안듦
//     - MarketsDetail에서 주소 툴팁 정보 수정
// 3. 마이페이지 구현
//

// 🎈 2024.08.01.목 /
// 1. MarketDetail에 저장된 위치를 카카오 맵이 출력되게 함 - 상세주소 없으면 안나옴
// 2. marker에 상세주소 출력이 되도록 customOverlay 사용

// 해야할 것:
// 1. 상세 위치 입력 뭔가 부족함 - 입력을 안하면 alert으로 한번 권유창 띄우기?
// 2. 마이페이지 구현

// MyPage로 이동
//

// 🎈 2024.08.11.일 / myPoint 하다 구매하기 기능 구현이 필요해 잠시 왔다 감
// 1. 구매 기능 완
//     - 단 구매 클릭으로 페이지 이동 or 영수증 페이지 구현하기
//     - refetch, update로 상품 리스트 업데이트와 내 포인트 refetch로 포인트 최신화 유지
