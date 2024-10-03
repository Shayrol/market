import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
} from "../../../../commons/types/generated/types";

const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export const useMutationCreateBoardComment = (): MutationTuple<
  Pick<IMutation, "createBoardComment">,
  IMutationCreateBoardCommentArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  return result;
};
