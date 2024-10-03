import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationUpdateUseditemArgs,
} from "../../../../commons/types/generated/types";

const UPDATE_USED_ITEM = gql`
  mutation updateUseditem(
    $useditemId: ID!
    $updateUseditemInput: UpdateUseditemInput!
  ) {
    updateUseditem(
      useditemId: $useditemId
      updateUseditemInput: $updateUseditemInput
    ) {
      _id
      images
      useditemAddress {
        lat
        lng
        addressDetail
      }
    }
  }
`;

export const useMutationUpdateUsedItem = (): MutationTuple<
  Pick<IMutation, "updateUseditem">,
  IMutationUpdateUseditemArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);

  return result;
};
