import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationDislikeBoardArgs,
} from "../../../../commons/types/generated/types";

const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;

export const useMutationDisLikeBoard = (): MutationTuple<
  Pick<IMutation, "dislikeBoard">,
  IMutationDislikeBoardArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "dislikeBoard">,
    IMutationDislikeBoardArgs
  >(DISLIKE_BOARD);

  return result;
};
