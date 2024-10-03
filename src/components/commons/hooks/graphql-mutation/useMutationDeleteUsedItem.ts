import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationDeleteUseditemArgs,
} from "../../../../commons/types/generated/types";

export const DELETE_USED_ITEM = gql`
  mutation deleteUseditem($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

export const useMutationDeleteUsedItem = (): MutationTuple<
  Pick<IMutation, "deleteUseditem">,
  IMutationDeleteUseditemArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM);

  return result;
};
