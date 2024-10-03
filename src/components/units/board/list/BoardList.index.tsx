import { useRecoilState } from "recoil";
import { getDate } from "../../../../commons/libraries/utils";
import { useMoveToPage } from "../../../commons/hooks/customs/useMoveToPage";
import { useSearch } from "../../../commons/hooks/customs/useSearch";
import { useQueryFetchBoards } from "../../../commons/hooks/graphql-queries/useQueryFetchBoards";
import { useQueryFetchBoardsCount } from "../../../commons/hooks/graphql-queries/useQueryFetchBoardsCount";
import * as S from "./BoardList.index.styles";
import { v4 as uuidv4 } from "uuid";
import { isEditState } from "../../../../commons/stores";
import { useRouter } from "next/router";
import TestSearch from "../../../commons/searchbars/testSearch/search.index";
import { useQueryFetchBoardsOfTheBest } from "../../../commons/hooks/graphql-queries/useQueryFetchBoardstOfTheBest";
import BoardsPagination from "../../../commons/pagination/Boards_pagination/pagination.index";

const SECRET = "@#$%";

export default function BoardListIndex(): JSX.Element {
  const { keyword, onChangeKeyword } = useSearch();
  const [, setIsEdit] = useRecoilState(isEditState);
  const router = useRouter();
  const { onClickMoveToPage } = useMoveToPage();

  const { data, refetch } = useQueryFetchBoards();
  const { data: dataBest, refetch: refetchBest } =
    useQueryFetchBoardsOfTheBest();
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQueryFetchBoardsCount();

  const onClickNewPage = (): void => {
    void router.push("/boards/new");
    setIsEdit(true);
  };

  return (
    <S.Wrapper>
      <S.H3>Best</S.H3>
      <S.BestWrap>
        {dataBest?.fetchBoardsOfTheBest.map((el) => {
          const validImage = el.images?.find((img) => img !== "");

          return (
            <S.BestBoard
              key={el._id}
              onClick={onClickMoveToPage(`/boards/${el._id}`)}
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
                  {el.title !== "" ? el.title : "undefined"}
                </S.BestBoardTitle>
                <S.BestBoardUser>
                  <S.WriterWrap>
                    <S.Writer>{el.writer}</S.Writer>
                    <S.Date>{getDate(el.createdAt)}</S.Date>
                  </S.WriterWrap>
                  <S.BoardLikeWrap>
                    {/* 이미지 저작권 링크:
                    <a href="https://www.flaticon.com/kr/free-icons/" title="좋은 아이콘">좋은 아이콘 제작자: Anggara - Flaticon</a>
                  */}
                    <S.Vector src="/images/board/list/like.png" />
                    <S.LikeCount>{el.likeCount}</S.LikeCount>
                  </S.BoardLikeWrap>
                </S.BestBoardUser>
              </S.BestBoardUserWrap>
            </S.BestBoard>
          );
        })}
      </S.BestWrap>
      <TestSearch
        refetch={refetch}
        refetchBoardsCount={refetchBoardsCount}
        onChangeKeyword={onChangeKeyword}
      />
      <S.TableTop />
      <S.Row>
        <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.Row>
      {data?.fetchBoards.map((el) => (
        <S.RowList key={el._id}>
          <S.ColumnBasic>
            {String(el._id).slice(-4).toUpperCase()}
          </S.ColumnBasic>
          <S.ColumnTitle onClick={onClickMoveToPage(`/boards/${el._id}`)}>
            {el.title
              .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
              .split(SECRET)
              .map((el) => (
                <S.TextToken key={uuidv4()} isMatched={keyword === el}>
                  {el}
                </S.TextToken>
              ))}
          </S.ColumnTitle>
          <S.ColumnBasic>{el.writer}</S.ColumnBasic>
          <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
        </S.RowList>
      ))}
      <S.TableBottom />
      <S.Footer>
        <BoardsPagination
          refetch={refetch}
          count={dataBoardsCount?.fetchBoardsCount}
          keyword={keyword} // keyword를 전달합니다.
        />
        <S.Button onClick={onClickNewPage}>
          <S.PencilIcon src="/images/board/list/write.png" />
          게시물 등록하기
        </S.Button>
      </S.Footer>
    </S.Wrapper>
  );
}

// 리펙토링 23/12/06/수 1일차 board의 list 페이지 container를 사용 안하고
// hoc를 사용해 use로 시작하는 함수를 import해서 코드의 길이들 줄인다.
// 이떄 재사용 가능한 다른 곳에서도 사용할 수 있게 컴포넌트를 만들어 사용한다.
// 메모 / 24-구조분해할당(destructuring), REST 파라미터 / Custom-hooks-Use 사용.txt 참고

// 다음 리펙토링 할 것 : 나머지 write 컴포넌트 리펙토링 하기

// 추가 공부가 필요한 것: 커스텀 훅이랑 hoc, hof 좀 더 알아보기

// 🎈 2024.06.03.월 /
// 게시글 List에 Best 게시글 목록을 가져옴
//
// 해결해야할 것:
// 1. 현재 게시글이 4개지만 그 이상일 때 어떻게 보여줄지 모름
// 2. 클릭시 BoardDetail로 이동하게 해야 함
// 3. 해당 BoardDetail에서 like, unlike 클릭을 통한 기능 구현
//
//
// 🎈 2024.06.07.금 /
// 1. Best 게시글은 4개만 보여주고 있음
// 2. 해당 Best 게시글 클릭 시 BoardDetail로 이동함
// 3. like 클릭 시 refetch를 하지 않고 update를 통해 cache 데이터를 수정함
// 4. 이로써 BoardDetail에서 like count가 증가 하고 다시 BoardList로 이동을 하면
//    like count가 증가한 상태로 적용이 됨

// 해결해야할 것:
// 1. BoardDetail에서 like count 증가를 통해 좋아요 갯수를 통한 게시글 순서 변동이
//    일어나야 하는데 일어나지 않음
//    해당 dataBest를 리렌더링을 해줘야 할 필요가 있음
// 2. like, unlike 번튼 스타일 / unlike 기능 구현하기
// 3. 로그인 관련 기능 구현 /

// 로그인 같은 경우
// 게시글 작성, 댓글 로그인 시 입력이 가능하게 하고
// 마이페이지 구현
// 게시글, 댓글 경우 프로필 사진 만들기
// 그럼 게시글 작성페이지에서 writer, password에 대해 수정을 해야함
// 회원가입을 하면 해당 아이디를 writer에 적용을 하고
// password 부분에서는 고민 해봐야 할 듯
// 로그인에 사용한 password를 가져와 사용을 할 수 있으면 사용을 하고 그렇지 못하면
// ------------------------
// 찾아본 결과 게시글 작성은 비회원 전용으로 만들어진 게시물이다.
// 회원이 필요한 곳은 상품등록 및 구매로 나중에 User를 사용하는 것으로 보인다.
//
//
// 🎈 2024.06.18.화 /
// 1. ApolloSetting을 가면 accessToken의 errorLink와 getAccessToken()을 해보면
// 2. JWT 구현은 했으나 새로고침을 하면 API요청이 여러번 실행되는 현상이 있음

// 🎈 2024.06.24.월 /
// 리렌더링 부분, API 중복 요청을 해결을 할려고 했으나 잘 안됨고
// 며칠동안 진행이 안됨.... 최적화는 뒷전으로 미루고 먼저 완성하는데 힘쓸 것.
// 1. 리렌더링은 API요청, Recoil 업데이트 등으로 리렌더링이 무수히 발생
// 2. API요청 또한 accessToken으로 중복 API가 발생하는 걸로 보고는 있음,,

// 해야할 것:
// 1. 우선 새로고침을 하지 않으면 API 부분에서는 문제없이 돌아감
// 2. BoardOfTheBest를 최신데이터를 likeCount의 캐시에 수정된 데이터로 렌더링
//    하는걸 찾아 보기 - 단순 likeCount 수에 따라 위치 변경을 위해 API요청은 낭비라 생각함.
//    (BoardList로 이동할 때마다 API 요청 줄이기)
// 3. 로그인 하면 프로필, 로그아웃 버튼 CSS 처리
// 4. 회원가입 페이지 구현
// 5. 마이프로필 페이지 구현
