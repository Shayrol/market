import { useEffect, useRef, useState } from "react";
import * as S from "./MarketsList.index.styles";
import { getDate } from "../../../../commons/libraries/getDate";
import InfiniteScroll from "react-infinite-scroller";
import { useRecoilValue } from "recoil";
import { isAccessToken } from "../../../../commons/stores";
import { useRouter } from "next/router";
import { useQueryFetchUsedItemsOfTheBest } from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItemsOfTheBest";
import { useQueryFetchUsedItems } from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItems";
import { IUseditem } from "../../../../commons/types/generated/types";
import Search from "../../../commons/searchbars/Markets/search.index";
import { v4 as uuidv4 } from "uuid";

// key 값을 el._id가 아닌 uuidV4()를 사용을 했는데 중복된 key 값을 사용을 해 오류 메시지가 뜸
// 중복된 key를 사용한 곳은 Best, TodayItems, Item 이렇게 사용을 하고 있다.

export default function MarketsList(): JSX.Element {
  const { data, refetch, fetchMore } = useQueryFetchUsedItems();
  const { data: dataBest } = useQueryFetchUsedItemsOfTheBest();

  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState("");
  const accessToken = useRecoilValue(isAccessToken);
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const onClickSold = async (): Promise<void> => {
    if (scrollableDivRef.current) scrollableDivRef.current.scrollTo({ top: 0 });
    setIsFetching(true);
    // void를 사용하면 스크롤 이동이 끝나지도 않았는데 refetch가 실행되어 현재 스크롤 위치에서
    // 해당되는 page API 요청이 일어난다.
    // 그래서 await으로 서버로부터 받아오는 시간을 사용해 스크롤 이동을 끝내고 top: 0의 page을
    // 요청할 수 있다.

    await refetch({
      isSoldout: false,
      page: 1,
      search: keyword,
    });
    setIsActiveBtn(false);
    setIsFetching(false);
  };

  const onClickSoldOut = async (): Promise<void> => {
    if (scrollableDivRef.current) scrollableDivRef.current.scrollTo({ top: 0 });
    setIsFetching(true);
    await refetch({
      isSoldout: true,
      search: keyword,
      page: 1,
    });
    setIsActiveBtn(true);
    setIsFetching(false);
  };
  const nextPage = Math.ceil((data?.fetchUseditems.length ?? 10) / 10) + 1;
  const onLoadMore = async (): Promise<void> => {
    if (isFetching) return;
    await fetchMore({
      variables: {
        isSoldout: isActiveBtn,
        page: nextPage,
        search: keyword,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditems) return prev;
        return {
          fetchUseditems: [
            ...(prev.fetchUseditems ?? []),
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  const onClickNewItem = (): void => {
    if (!accessToken) {
      alert("로그인 후 이용가능합니다.");
    } else {
      void router.push("/markets/new");
    }
  };

  const onSearch = async (): Promise<void> => {
    if (scrollableDivRef.current) scrollableDivRef.current.scrollTo({ top: 0 });
    await refetch({
      isSoldout: isActiveBtn,
      page: 1,
      search: keyword,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  const handleSearchKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === "Enter") {
      await onSearch();
    }
  };

  // 배열이라 저장이 안됨 - usedItem이 아닌 usedItems를 사용해야하나?
  const [todayItemList, setTodayItemList] = useState<IUseditem[]>([]);

  // 로컬에 저장된 key의 정보를 setTodayItemList로 저장을 해 추가 및 새로고침에도 유지한다.
  useEffect(() => {
    const todayItems = sessionStorage.getItem("todayItems");
    if (todayItems) {
      setTodayItemList(JSON.parse(todayItems));
    }
  }, []);

  // 해당 게시글 이동 및 로컬스토리지 추가 및 업데이트 작업
  const onClickMoveToPage = (todayItem: IUseditem): void => {
    void router.push(`/markets/${todayItem._id}`);

    const todayItems: IUseditem[] = JSON.parse(
      sessionStorage.getItem("todayItems") ?? "[]"
    );
    // if (!todayItems) return;
    // 배열의 중복확인에 some, include가 있음
    // some: 배열의 요소가 객체인 경우
    // include: 배열의 요소가 단순 값인 경우
    const isItemAlreadySaved = todayItems.some(
      (item) => item._id === todayItem._id
    );

    if (!isItemAlreadySaved) {
      // setTodayItemList(todayItems);
      todayItems.push(todayItem);
      sessionStorage.setItem("todayItems", JSON.stringify(todayItems));
    }

    console.log("todayitem: ", todayItemList);
  };

  // 최근 본 상품 리스트 삭제
  const onClickTodayList = (): void => {
    setTodayItemList([]);
    sessionStorage.removeItem("todayItems");
  };

  return (
    <S.Wrap>
      {/* TodayItems */}
      {todayItemList.length !== 0 ? (
        <S.TodayItemsWrap>
          <S.TodayP>최근 본 상품</S.TodayP>
          <S.TodayDelete onClick={onClickTodayList}>삭제</S.TodayDelete>

          {todayItemList.map((el) => {
            const validImage = el.images?.find((img) => img !== "");

            return (
              <S.TodayItems
                key={uuidv4()}
                onClick={() => onClickMoveToPage(el)}
              >
                <S.TodayItemsImg
                  src={
                    validImage
                      ? `https://storage.googleapis.com/${validImage}`
                      : "/images/board/list/NotImage.png"
                  }
                />
                <S.TitleWrap>
                  <S.TodayTitle key={uuidv4()}>{el.name}</S.TodayTitle>
                  <S.TodayRemarks key={uuidv4()}>{el.remarks}</S.TodayRemarks>
                </S.TitleWrap>
                <S.PriceFavoriteWrap>
                  <S.TodayPrice key={uuidv4()}>{`${el.price?.toLocaleString(
                    "ko-KR"
                  )}원`}</S.TodayPrice>
                  <S.FavoriteWrap>
                    <S.TodayFavoriteImg src="/images/markets/list/ic_favorite.png" />
                    <S.TodayPickedCount>{el.pickedCount}</S.TodayPickedCount>
                  </S.FavoriteWrap>
                </S.PriceFavoriteWrap>
                <S.TodayTags key={el._id}>
                  {el.tags?.length === 0 ?? !el.tags
                    ? "#no-tag"
                    : el.tags
                        .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
                        .join(" ")}
                </S.TodayTags>
              </S.TodayItems>
            );
          })}
        </S.TodayItemsWrap>
      ) : (
        <></>
      )}

      {/* {todayItemList.length === 0 ? (
        <></>
        ) : (
          <S.TodayItemsWrap>
          <p>최근 본 상품</p>
          <div>
            {todayItemList.map((el, index) => (
              <div key={el}>{dataUsedItem?.fetchUseditem.name}</div>
            ))}
          </div>
        </S.TodayItemsWrap>
      )} */}

      <S.H3>Best</S.H3>
      <S.BestWrap>
        {dataBest?.fetchUseditemsOfTheBest.map((el, index) => {
          const validImage = el.images?.find((img) => img !== "");

          return (
            <S.BestBoard
              // key={`${el._id}-${index}`}
              key={uuidv4()}
              onClick={() => onClickMoveToPage(el)}
            >
              <S.BestBoardImgWrap>
                <S.BestImg
                  src={
                    validImage
                      ? `https://storage.googleapis.com/${validImage}`
                      : "/images/board/list/NotImage.png"
                  }
                />
              </S.BestBoardImgWrap>
              <S.BestBoardUserWrap>
                <S.BestBoardTitle>
                  {el.name !== "" ? el.name : "undefined"}
                </S.BestBoardTitle>
                <S.BestBoardUser>
                  <S.WriterWrap>
                    <S.Writer>{el.seller?.name}</S.Writer>
                    <S.Date>{getDate(el.createdAt)}</S.Date>
                  </S.WriterWrap>
                  <S.BoardLikeWrap>
                    {/* 이미지 저작권 링크:
                    <a href="https://www.flaticon.com/kr/free-icons/" title="좋은 아이콘">좋은 아이콘 제작자: Anggara - Flaticon</a>
                  */}
                    <S.Vector src="/images/markets/list/ic_favorite.png" />
                    <S.LikeCount>{el.pickedCount}</S.LikeCount>
                  </S.BoardLikeWrap>
                </S.BestBoardUser>
              </S.BestBoardUserWrap>
            </S.BestBoard>
          );
        })}
      </S.BestWrap>
      <S.SoldWrap>
        <S.ItemBtnWrap>
          <S.SoldBtn onClick={onClickSold} isActive={isActiveBtn}>
            판매중상품
          </S.SoldBtn>
          <S.SoldOutBtn onClick={onClickSoldOut} isActive={isActiveBtn}>
            판매된상품
          </S.SoldOutBtn>
          <S.Button onClick={onClickNewItem}>상품 등록하기</S.Button>
        </S.ItemBtnWrap>
        <S.SearchWrap>
          {/* <S.SearchInput
            type="text"
            value={keyword}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            placeholder="검색어를 입력하세요"
          />
          <S.SearchBtn onClick={onSearch}>검색</S.SearchBtn> */}
          <Search
            refetch={refetch}
            isActiveBtn={isActiveBtn}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        </S.SearchWrap>
      </S.SoldWrap>
      <S.ItemsWrap ref={scrollableDivRef}>
        <InfiniteScroll
          pageStart={1}
          loadMore={onLoadMore}
          // 검색 결과에 상품이 없거나 1페이지 이내면 API가 page: 1, page: 2 두 번 요청 방지
          hasMore={
            (data?.fetchUseditems.length ?? 0) !== 0
              ? (data?.fetchUseditems.length ?? 0) + 10 === nextPage * 10
                ? true
                : false
              : false
          }
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {/* 검색 결과 없을 시 보여질 화면을 위한 조건 */}
          {data?.fetchUseditems && data.fetchUseditems.length > 0 ? (
            data.fetchUseditems.map((item) => {
              // 게시글에서 썸네일로 보여질 첫 이미지 - (빈 요소 제외 가장 첫 번째 이미지 )
              const validImage = item.images?.find((image) => image !== "");

              // 판매자 프로필 이미지
              const sellerPicture = String(item.seller?.picture);

              return (
                <S.ItemWrap
                  key={uuidv4()}
                  onClick={() => onClickMoveToPage(item)}
                >
                  <S.ItemInfoWrap>
                    <S.ItemImg
                      src={
                        validImage
                          ? `https://storage.googleapis.com/${validImage}`
                          : "/images/board/list/NotImage.png"
                      }
                      alt="Item image"
                    />
                    <S.ItemInfo>
                      <S.ContentsWrap>
                        <S.Title>
                          {item.name.length === 0 ? "제목없음" : item.name}
                        </S.Title>
                        <S.Remarks>
                          <S.RemarksP title="부가설명">
                            {item.remarks.length === 0
                              ? "부가설명 없음"
                              : item.remarks}
                          </S.RemarksP>
                        </S.Remarks>
                      </S.ContentsWrap>
                      <S.Tags>
                        tag:{" "}
                        {item.tags?.length === 0 ?? !item.tags
                          ? "#no-tag"
                          : item.tags
                              .map((tag) =>
                                tag.startsWith("#") ? tag : `#${tag}`
                              )
                              .join(" ")}
                      </S.Tags>
                      {/* <div>이미지: {validImage}</div> */}
                      <S.UserInfo>
                        <S.Picture
                          src={
                            sellerPicture !== "null"
                              ? `https://storage.googleapis.com/${sellerPicture}`
                              : "/images/markets/list/ic_profile.png"
                          }
                        />
                        <S.Name>{item.seller?.name}</S.Name>
                        <S.PickedCountImg src="/images/markets/list/ic_favorite.png" />
                        <S.PickedCount>{item.pickedCount}</S.PickedCount>
                      </S.UserInfo>
                      {/* <div>팔림: {getDate(item.soldAt)}</div> */}
                    </S.ItemInfo>
                  </S.ItemInfoWrap>
                  <S.PriceWrap>
                    <S.PriceImg src="/images/markets/list/price_won.png" />
                    <S.ItemPrice>
                      {/* JS에서 천 단위 원화 표시 지원 - ₩ 스타일도 나라별 줄 수 있음 */}
                      {item.price?.toLocaleString("ko-KR")}원
                    </S.ItemPrice>
                  </S.PriceWrap>
                </S.ItemWrap>
              );
            })
          ) : (
            <S.NoSearchResults>검색 결과 없음</S.NoSearchResults>
          )}
        </InfiniteScroll>
      </S.ItemsWrap>
      <S.WrapBottom></S.WrapBottom>
    </S.Wrap>
  );
}

// 🎈 2024.07.05.금 /
// 1. UsedItems함수를 통해 sold, soldOut의 상품글을 불려올 수 있고
//    이미지 또한 제대로 가져오고 있음
// 2. sold와 soldOut은 refetch를 통해 변경을 했으며
//    page, search도 추가로 줄 수 있다.
//
// 해야할 것:
// 1. pagination, search 구현
// 2. 상품 페이지 만들기
// 3. 상품 등록 페이지 만들기
//

// 🎈 2024.07.06.토 /
/* 
<S.Tags>
  tag:{" "}
  {item.tags?.length === 0 ?? !item.tags
    ? "#no-tag"
    : item.tags
        .map((tag) => (tag.startsWith("#") ? tag : `#${tag.trim()}`))
        .join(" ")}
</S.Tags> 
*/
// 태그에서 태그가 없거나, #이 안 붙어있거나, 각 태그끼리 공백이 없는 경우 해결해준다.
// 1. 배열형식의 태그를 확인하기 위해 길이로 유무를 판단한다.
// 2. 삼항연산자로 없으면 #no-tag를 출력
// 3. 있으면 map 함수를 통해 각 tag의 #이 있는지를 확인하고 있으면 그대로 없으면 추가
// 4. #$로 없는 tag를 붙이고 tag.trim()은 tag앞뒤에 공백을 지우는데 할 필요없음
// 4. 마지막 join으로 각 태그로 공백 추가 이미 추가 되어있어도 한 번만 공백이 추가됨

// 즉 startsWith("무언가")를 사용하면 배열의 각 요소에서 "무언가"로 시작하는 요소를 찾고
// trim()은 앞뒤 불필요한 공백을 지워준다.

// 해야할 것:
// 1. 판매 상품, 판매된 상품 번트 완성하기
// 2. 검색기능 구현
// 3. 날짜검색 구현
// 4. infinity scroll 구현
//

// 🎈 2024.07.06.토 /
// 1. InfiniteScroll 구현했음
// 2. LayoutHeader에서 프로필 사진 변경으로 이미지 체인지가 안됨 refetch()로 해결
// 3. Layout은 width를 꽉찬 화면으로 하고 싶었는데 뭐가 문제인지 width: 100% 를 하면
//    가로 스크롤 바가 엄청 길어져 버튼 클릭도 안됨 이는 BoarderList에 해당이 되는데
//    Markets 페이지는 정상적으로 됨 ㅡㅡ;
//
// 해야할 것:
// 1. 판매중, 판매된 버튼 완성하기
// 2. 검색기능 및 날짜별 검색 구현 - (날짜는 따로 API요청에 포함되어있는게 없어 따로 해야할 듯)
// 3. 검색을 하고 해당 스크롤 내려도 검색된 내용을 불러오는지 확인
// 4. 상품 등록하기 버튼 및 기능 구현 - (비회원 시 로그인 창 띄우기)
// 5. 또는 상품 상세보기 구현 - (아무거나 먼저 구현해도 상관 ㄴ)
//

// 🎈 2024.07.08.월 /
// 1. 상품 검색 만들었음
// 2. 상품 검색된 상태에서 판매중, 판매된 버튼 클릭을 해도 검색 내용이 초기화 안되게 함
//
// 해야할 것:
// 1. 상품 검색을 하면 키워드로 색상 강조 - 할지 말지 고민중
// 2. 상품에 대한 상세보기 BoardDetail와 같음
// 3. 상품 등록 페이지 구현
// 4. 상품 등록, 해당 상품 댓글, 구매 등 로그인 상태로만 가능하게 하기

// 대부분 완성 - MarketsDetail로 넘어감
//

// 🎈 2024.07.28.일 /
// 1. 검색을 하면 판매중, 판매된 버튼 클릭으로 상품 오류 해결함
//    단 해당 검색한 상품이 10개 이하 또는 없으면 API 요청이 두번 감
//    - (page: 1, page: 2 요청감)
//
// 해야할 것:
// 1. 이러한 요청 문제 해결하기
//

// 🎈 2024.07.29.월 /
// 1. 검색으로 게시글이 없거나 10개 이하면 API 요청이 2번 가는 현상 해결함
//    - 무한스크롤의 hasMore의 역할은 true면 onLoadMore가 실행이 되는데
//    - onLoadMore의 함수에는 data를 refetch하는 로직이 있음
//    - 그래서 데이터가 없는데도 refetch하는 현상이 있었음
//    - data?.fetchMarkets.length로 게시글 갯수를 가져오고
//    - nextPage * 10을 해 비교하여 해결함
// 2. 검색 결과가 없으면 "검색 결과가 없습니다." 문구가 뜨게 했음
//

// 해야할 것:
// 1. 검색창, 검색 버튼 디자인 하기
// 2. 본인 게시글 삭제 추가하기
// 3. 최근 본 게시글 띄우기
// 4. 판매된 상품 클릭 시 Best 목록을 판매된 Best로 변경하기
// 5. 마이페이지 구현
//

// 🎈 2024.07.30.화 /
// 1. 최근 본 상품에서 localStorage 저장을 할 수는 있지만 해당 item의 정보를
//    불러올 수는 data를 어떻게 불러와야 하는지 찾아야 함
// - 해당 useQueryFetchUsedItem에서 variable를 router.query.useditemId로 되어있음
// - 여기서 추가로 recoil을 사용해 저장한 id를 router.query.useditemId 외 추가로
// - 넣어주면 될 듯 함
// - recoil 사용해 적용했지만 배열이라 안됐음

//
// 추가로 해결함:
// 1. data.fetchMarkets.map((item) => ()을 통해 사용한 item은 _id,name,contents 등의
//    정보가 담겨있다.
// 2. 클릭 시 실행 함수에 인자 값으로 정보를 넘겨주는데
//    IUseditem의 타입을 사용해야 한다. 이는 연습으로 section23-23-06 참고
// 3. 로컬에 저장을 하고 불러와 useState에 저장을 해 해당 state를 사용해 최근 본 상품을
//    불러 올 수 있게 된다.
//
// 해야할 것:
// 1. 최근 본 상품 완성하기 --------- 모듈화 하기 및 css 완성하기
// 2. MarketDetail에서 저장된 지도 위치 있으면 지도 띄우기 or 찜 기능
// 3. 마이페이지 구현

// MarketsDetail로 넘어감
