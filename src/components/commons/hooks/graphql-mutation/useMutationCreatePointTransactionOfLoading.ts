import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
} from "../../../../commons/types/generated/types";

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
      updatedAt
    }
  }
`;

export const useMutationCreatePointTransactionOfLoading = (): any => {
  const result = useMutation<
    Pick<IMutation, "createPointTransactionOfLoading">,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_TRANSACTION_OF_LOADING);

  return result;
};
