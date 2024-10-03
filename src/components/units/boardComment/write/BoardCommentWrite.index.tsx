import { ChangeEvent, useState } from "react";
import { useMutationCreateBoardComment } from "../../../commons/hooks/graphql-mutation/useMutationCreateBoardComment";
import { useRouter } from "next/router";

export default function BoardCommentWrite(): JSX.Element {
  const [createBoardComment] = useMutationCreateBoardComment();
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const router = useRouter();

  const onClickComment = async (): Promise<void> => {
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
    });
    console.log("댓글등록: ", result);
  };
  const onChangeWrite = (e: ChangeEvent<HTMLInputElement>): void => {
    const W = e.target.value;
    setWriter(W);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const W = e.target.value;
    setPassword(W);
  };
  const onChangeContent = (e: ChangeEvent<HTMLInputElement>): void => {
    const W = e.target.value;
    setContents(W);
  };

  return (
    <div>
      <input type="text" placeholder="write" onChange={onChangeWrite} />
      <input
        type="password"
        placeholder="password"
        onChange={onChangePassword}
      />
      <input type="text" placeholder="content" onChange={onChangeContent} />

      <button onClick={onClickComment}>클릭</button>
    </div>
  );
}
