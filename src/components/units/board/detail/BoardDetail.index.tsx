import { useRouter } from "next/router";
import * as S from "./BoardDetail.index.styles";
import { Tooltip } from "antd";
import { getDate } from "../../../../commons/libraries/getDate";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../../commons/stores";
import { useQueryFetchBoard } from "../../../commons/hooks/graphql-queries/useQueryFetchBoard";
import { useMutationLikeBoard } from "../../../commons/hooks/graphql-mutation/useMutationLikeBoard";
import { useMutationDisLikeBoard } from "../../../commons/hooks/graphql-mutation/useMutationDisLikeBoard";
import { FETCH_BOARD_BEST } from "../../../commons/hooks/graphql-queries/useQueryFetchBoardstOfTheBest";
import { v4 as uuidv4 } from "uuid";

export default function BoardDetail(): JSX.Element {
  const router = useRouter();
  const [contents, setContents] = useState("");
  const [, setIsEdit] = useRecoilState(isEditState);

  // 🎈 if문의 내용을 사용하면 useQueryFetchBoard()의 API 요청에 문제가 생기는데
  // 🎈 새로고침할 때에 문제가 생긴다.
  // ✨ 예상되는 문제는 해당 BoardDetail에서 사용한 router를 사용한 fetchBoard의 데이터를
  // ✨ 가져오는 것이 아닌 useQueryFetchBoard()의 router.query.boardId의 데이터를 가져와
  // ✨ writer, title, contents 등의 데이터를 보여주고 있어 생긴 문제라 생각된다.
  // ✨ 그래서 해당 if문의 router의 boardId를 가져와 return의 값을 반화했는데
  // ✨ useQueryFetchBoard() 내에서 다시 useRouter()를 사용해 boardId를 사용해
  // ✨ 생긴 문제라 생각 된다.
  // ✨ 즉 해당 컴포넌트(BoardDetail)에서 router의 boardId를 사용해 return을 반환했는데
  // ✨ 외부에서의 router를 사용한 커스텀 훅(useQueryFetchBoard)을 사용으로 생긴 문제라 생각
  // ❗ 그래서 내부 컴포넌트(BoardDetail)에서 사용한 router로 useQuery를 사용해 fetchBoard의
  // ❗ router.query.boardId 사용은 문제없이 실행이 되었음!!

  const { data } = useQueryFetchBoard();
  const [likeBoard] = useMutationLikeBoard();
  const [dislikeBoard] = useMutationDisLikeBoard();

  // 수정
  const onClickMoveToBoardEdit = (): void => {
    void router.push(`/boards/${router.query.boardId}/edit`);
    setIsEdit(false);
  };

  // 목록
  const onClickMoveToBoardList = (): void => {
    void router.push("/boards");
  };

  // contents / CSR으로 호출을 위한 useEffect 사용
  useEffect(() => {
    if (data?.fetchBoard.contents) {
      const sanitizedContents = DOMPurify.sanitize(data?.fetchBoard.contents);
      setContents(sanitizedContents);
    }
  }, [data?.fetchBoard.contents]);

  const onClickLike = (): void => {
    void likeBoard({
      variables: {
        boardId: String(router.query.boardId),
      },
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      update: (cache, { data }) => {
        if (typeof data?.likeBoard === "number") {
          cache.modify({
            id: cache.identify({
              __typename: "Board",
              _id: String(router.query.boardId),
            }),
            fields: {
              likeCount() {
                return data.likeBoard; // 업데이트된 likeCount 반환
              },
            },
          });
        } else {
          alert("likeCount 에러");
        }
      },
      // Best의 좋아요 수에 따라 배열 순서 변경을 위함
      refetchQueries: [
        {
          query: FETCH_BOARD_BEST,
        },
      ],
    });
  };

  const onClickDisLike = (): void => {
    void dislikeBoard({
      variables: {
        boardId: String(router.query.boardId),
      },
      optimisticResponse: {
        dislikeBoard: (data?.fetchBoard.dislikeCount ?? 0) + 1,
      },
      update: (cache, { data }) => {
        if (typeof data?.dislikeBoard === "number") {
          cache.modify({
            id: cache.identify({
              __typename: "Board",
              _id: String(router.query.boardId),
            }),
            fields: {
              dislikeCount() {
                return data.dislikeBoard; // 업데이트된 dislikeCount 반환
              },
            },
          });
        } else {
          alert("disLikeCount 에러");
        }
      },
    });
  };

  return (
    <S.Wrap>
      <S.TitleWrap>
        <S.Title>{data?.fetchBoard.title}</S.Title>
      </S.TitleWrap>

      <S.ContentsWrap>
        {data?.fetchBoard.images
          ?.filter((el) => el)
          .map((el) => (
            <S.ContentsImage
              src={`https://storage.googleapis.com/${el}`}
              key={uuidv4()} // 각 이미지에 대해 고유한 key 생성
            />
          ))}
        {
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: contents,
            }}
          />
        }
      </S.ContentsWrap>

      <S.UserWrap>
        <S.WriterImg src="/images/avatar.png" />
        <S.WriterTimeWrap>
          <S.WriterInfo>{data?.fetchBoard.writer}</S.WriterInfo>
          <S.TimeInfo>{getDate(data?.fetchBoard.createdAt)}</S.TimeInfo>
        </S.WriterTimeWrap>
        <S.Tooltip>
          <S.TooltipImg src="/images/board/detail/link.png" />
          <Tooltip
            placement="topRight"
            title={`${data?.fetchBoard.boardAddress?.address ?? "주소미입력"} ${
              data?.fetchBoard.boardAddress?.addressDetail ?? ""
            }`}
          >
            <S.TooltipImg src="/images/board/detail/location.png" />
          </Tooltip>
        </S.Tooltip>
      </S.UserWrap>
      <S.FooterWrap>
        <S.LikeCountWrap>
          <S.LikeCountBtnWrap onClick={onClickLike}>
            <S.LikeCountImg src="/images/board/detail/up.png" />
            <S.LikeCount>{data?.fetchBoard.likeCount}</S.LikeCount>
          </S.LikeCountBtnWrap>

          <S.DislikeCountBtnWrap onClick={onClickDisLike}>
            <S.LikeCountImg src="/images/board/detail/down.png" />
            <S.LikeCount>{data?.fetchBoard.dislikeCount}</S.LikeCount>
          </S.DislikeCountBtnWrap>
        </S.LikeCountWrap>
        <S.FooterBtnWrap>
          <S.FooterBtn onClick={onClickMoveToBoardList}>목록</S.FooterBtn>
          <S.FooterBtn onClick={onClickMoveToBoardEdit}>수정</S.FooterBtn>
          <S.FooterBtn>삭제</S.FooterBtn>
        </S.FooterBtnWrap>
      </S.FooterWrap>
    </S.Wrap>
  );
}

// 🎈2024.04.13
// 게시글 BoardDetail에서 새로고침을 하면 에러가 발생을 했음
// hook에 대한 에러였음
// if문을 통해 boardId가 string이면 데이터를 가져오도록 했는데 여기서 string이 아니면
// return으로 아래 useQuery 즉 hook이 실행이 되지 않아 오류 또는 콘솔에 경고 메시지가 뜬다.
// hook은 꼭 한 번 실행을 해야하는 조건이 있어 조건문에 사용하는 것은 좋지 못 하다.
// 그래서 boardId: String()으로 타입을 고정시켜서 해결을 했다.

// 🎈2024.04.15
// DOMPurify를 새로고침을 하면 에러가 발생했다.
// 이는 DOM에서 동작을 하는 것 이기에 SSR이 아닌 CSR 환경에서만
// 실행이 된다.
// 그래서 조건을 걸어줘서 SSR에서는 실행이 안되게 하고 CSR에서 실행이
// 되도록 해줘야 한다.

// 즉 react-Quill과 같이 요소를 지원하는 라이브러리 그리고 SSR에서 지원이 안되는
// 것 들은 dynamic을 통해 CSR에서 렌더링이 되도록 해준다.
// 그 외 요소가 아닌 라이브러리는 typeof window를 통해 브라우저 환경인지를 확인을 해
// SSR에서 실행이 안 되도록 해줘야 한다.
// {typeof window !== "undefined" && (
//   <div
//     dangerouslySetInnerHTML={{
//       __html: DOMPurify.sanitize(String(data?.fetchBoard.contents)),
//     }}
//   />
// )}
// typeof window 환경을 확인하는데 &&통해 undefined가 거짓이면 뒤에 것이 실행이 안되고
// 참이면 실행이 되어 contents가 보여지게 된다.
// 브라우저 환경 비교는 3가지 있다.
// 1. useEffect
// 2. process.browser
// 3. typeof window

// 4월15일 이후 해야할 것
// 1. boardDetail 완성하기
// 2. 수정하기 클릭을 하면 기존 writer, title, contents 등 유지하도록 하기

// 🎈2024.04.16
// 1. css 스타일 마음에 안듦
// 2. 버튼 수정과 삭제 손 봐야함
//  수정:
//     2-1. 수정 클릭 시 기존의 데이터가 남아 있도록 해야 함
//  삭제:
//     2-1. 삭제 클릭 시 삭제되는 API 요청을 보내도록 해야 함
// 3. 수정 페이지 만들고 게시글 뿐만 아닌 상품페이지, 마이페이지 등
//    여러 API 활용한 페이지 만들기
// 4. 중요❗ - BoardWrite에서 이미지 등록에 대한 최적화 필요
//          - 현 이미지 선택하면 구글 스토리지에 저장이 됨
//          - 이를 임시저장하는 방식으로 게시글 등록을 안해도 불필요한 이미지 저장을 막음

// 🎈2024.05.01
// 1. 커스텀 훅을 이용한 useQuery의 router 사용의 문제점 해결
// 2. 수정하기 클릭을 했을 때 기존 입력 내용을 유지하고 변경사항 있는지 체크 및 중복 업로드 구현
//    - 기존 데이터에 변경된 부분만 API 요청하기

// 🎈2024.06.11.화 /
// 좋아요/싫어요 카운트 마무리 끝남 + BoardList에서도 bestBoard 잘 마무리 됨
//
// 해야할 것:
// 1. 로그인 시스템 구현...
// 2. 장바구니 및 상품 시스템 구현
