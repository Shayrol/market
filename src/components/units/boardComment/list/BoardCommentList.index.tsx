import { useMutationDeleteBoardComment } from "../../../commons/hooks/graphql-mutation/useMutationDeleteBoardComment";
import {
  FETCH_BOARD_COMMENTS,
  useQueryFetchBoardComment,
} from "../../../commons/hooks/graphql-queries/useQueryFetchBoardComment";
import * as S from "./BoardCommentList.index.styles";
import { useRouter } from "next/router";
import { getDate } from "../../../../commons/libraries/getDate";

import { ChangeEvent, useState, MouseEvent, useRef } from "react";
import { useMutationCreateBoardComment } from "../../../commons/hooks/graphql-mutation/useMutationCreateBoardComment";
import { useMutationUpdateBoardComment } from "../../../commons/hooks/graphql-mutation/useMutationUpdateBoardComment";
import { IUpdateBoardCommentInput } from "../../../../commons/types/generated/types";

export default function BoardCommentList(): JSX.Element {
  const { data } = useQueryFetchBoardComment();
  const [deleteBoardComment] = useMutationDeleteBoardComment();
  const [updateBoardComment] = useMutationUpdateBoardComment();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onClickDeleteComment = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    const password = prompt("비밀번호를 입력하세요.");
    try {
      if (!(event.target instanceof HTMLDivElement)) {
        alert("시스템에 문제가 있습니다.");
        return;
      }

      const boardCommentId = event.target.id;
      console.log("id 값: ", event.target.id);
      console.log("password: ", password);
      await deleteBoardComment({
        variables: {
          password,
          boardCommentId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // 게시글 등록
  const [createBoardComment] = useMutationCreateBoardComment();

  const onClickCommentSubmit = async (): Promise<void> => {
    if (writer === "" && contents === "") {
      alert("내용을 입력하세요");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력하세요");
      return;
    }
    const result = await createBoardComment({
      variables: {
        boardId: String(router.query.boardId),
        createBoardCommentInput: {
          writer,
          password,
          contents,
          rating: 4,
        },
      },
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
    console.log("댓글등록: ", result);
    setWriter("");
    setPassword("");
    setContents("");
  };

  // 댓글 수정
  const onClickCommentUpdate = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    try {
      if (!(event.target instanceof HTMLDivElement)) {
        alert("게시글이 올바르지 않습니다");
        return;
      }

      const updateBoardCommentInput: IUpdateBoardCommentInput = { rating: 4 };
      if (contents !== "") updateBoardCommentInput.contents = contents;

      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId: commentId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setIsEdit(false);
      setCommentId("");
      setWriter("");
      setPassword("");
      setContents("");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // 해당 댓글 id 저장용도
  const onClickIsEdit = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;
    if (!target.id) {
      alert("게시글이 올바르지 않습니다");
      return;
    }
    // 해당 댓글의 id와 같은지 확인
    const comment = data?.fetchBoardComments.find(
      (comment) => comment._id === target.id
    );
    if (comment) {
      setIsEdit(true);
      setCommentId(comment._id);
      setWriter(String(comment.writer));
      setContents(comment.contents);
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const onChangeWrite = (e: ChangeEvent<HTMLInputElement>): void => {
    setWriter(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(e.target.value);
  };

  return (
    <S.Wrap>
      {data?.fetchBoardComments.map((el, index) => (
        <S.CommentWrap key={index}>
          <S.CommentListWrap>
            <S.CommentList>{el.writer}</S.CommentList>
            <S.CommentCreatedAt>{getDate(el.createdAt)}</S.CommentCreatedAt>
          </S.CommentListWrap>
          <S.CommentContent>{el.contents}</S.CommentContent>
          <S.CommentBtnWrap>
            <S.CommentEditDlt id={el._id} onClick={onClickIsEdit}>
              수정
            </S.CommentEditDlt>
            <S.CommentEditDlt id={el._id} onClick={onClickDeleteComment}>
              삭제
            </S.CommentEditDlt>
          </S.CommentBtnWrap>
        </S.CommentWrap>
      ))}
      <S.Line></S.Line>
      <S.CommentWriteWrap>
        <S.InputWrite
          type="text"
          placeholder="작성자"
          onChange={onChangeWrite}
          value={writer}
          readOnly={isEdit && commentId !== ""}
        />
        <S.InputPassword
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
          value={password}
        />
        <S.TextArea
          placeholder="content"
          onChange={onChangeContent}
          value={contents}
          ref={inputRef}
        />
        <S.CommentWriteBtnWrap>
          <S.CommentWriteBtn
            onClick={isEdit ? onClickCommentUpdate : onClickCommentSubmit}
          >
            {isEdit ? "수정" : "등록"}
          </S.CommentWriteBtn>
        </S.CommentWriteBtnWrap>
      </S.CommentWriteWrap>
    </S.Wrap>
  );
}

// 🎈 2024.05.27.월 /
// 댓글 삭제 기능 구현했음
//
// 해야할 것:
// 1. 댓글 List 부분 스타일 마무리
// 2. 댓글 Write 부분 스타일 마무리
// 3. 댓글 갯수가 10개 넘어가면 이전의 댓글 사라짐
//    pagination 구현하기
// 4. 댓글 별점기능 구현하기
// 5. 게시글 좋아요 싫어요 구현하기
//
//
// 🎈 2024.05.28.화 /
// List 스타일 마무리 했고 rating(별점)은 추가 하지 않도록 했음
//
// 해야할 것:
// 1. Write 부분 스타일 마무리
// 2. Comment pagination 추가하기
// 3. Comment 수정하기 추가하기
// 4. 게시글 좋아요 싫어요 구현하기
//
// 댓글 부분 끝나면 로그인 구현과 마이페이지, 상품등록에 대해 구현 할 것
// 나중에는 로그인 시에만 자신이 등록한 게시글, 댓글에 수정 / 삭제 버튼이 보이도록
// 구현할 수 있으면 할 예정
// 그러기 위해서는 로그인에 대한 JWT에 대한 이해와 리프레쉬 토큰에 대해 알고 있어야 하고
// 해당 로그인 시에만 보여지는 페이지를 만들어야 함 / 마이페이지, 상품 등록 페이지 등등
//
//
// 🎈 2024.05.28.화 /
// 수정하기에 대해 구현을 했음
// 수정 클릭 시 스크롤 이동으로 입력창으로 이동이 되고
// 입력창의 수정을 클릭 하면 수정 됨
// 원하는 건 댓글의 수정을 클릭을 하면 해당 댓글에서 수정 가능한 입력창으로 변경이
// 일어나면 좋았는데 그러기 위해서는 수정 컴포넌트와 등록 컴포넌트를 따로
// 구분을 해야 가능하다.
//
// 현재 수정을 클릭을 하면 해당 입력창으로 스크롤 이동이 되어 수정을 할 수 있고
// 추가 하고싶게 있다면 수정 클릭 후 취소 버튼 구현과
// modal를 띄워 수정할 수 있게 만드는 것이 좋다고 생각한다.
//
// 해야할 것:
// 1. 취소버튼 구현(선택사항)
// 2. 게시글 좋아요 / 싫어요 버튼 구현
// 3. 게시글 댓글 10개 초과를 위해 pagination 기능 구현 여기서
//    무한 스크롤을 사용하거나 버튼 클릭 이동을 하면 될 듯?
