import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationUpdateBoardCommentArgs,
} from "../../../../commons/types/generated/types";

const UPDATE_BOARD_COMMENTS = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
      boardCommentId: $boardCommentId
    ) {
      _id
    }
  }
`;

export const useMutationUpdateBoardComment = (): MutationTuple<
  Pick<IMutation, "updateBoardComment">,
  IMutationUpdateBoardCommentArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENTS);

  return result;
};
