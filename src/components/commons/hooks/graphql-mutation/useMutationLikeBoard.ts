import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationLikeBoardArgs,
} from "../../../../commons/types/generated/types";

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const useMutationLikeBoard = (): MutationTuple<
  Pick<IMutation, "likeBoard">,
  IMutationLikeBoardArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  return result;
};
