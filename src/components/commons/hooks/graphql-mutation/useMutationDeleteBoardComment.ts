import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
} from "../../../../commons/types/generated/types";

const DELETE_BOARD_COMMENT = gql`
  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
  }
`;

export const useMutationDeleteBoardComment = (): MutationTuple<
  Pick<IMutation, "deleteBoardComment">,
  IMutationDeleteBoardCommentArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);

  return result;
};
