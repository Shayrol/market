import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
    }
  }
`;

export const useMutationUpdateBoard = (): MutationTuple<
  Pick<IMutation, "updateBoard">,
  IMutationUpdateBoardArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  return result;
};
