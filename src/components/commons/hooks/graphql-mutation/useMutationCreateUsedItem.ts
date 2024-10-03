import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemArgs,
} from "../../../../commons/types/generated/types";

const CREATE_USED_ITEM = gql`
  mutation createUseditem($createUseditemInput: CreateUseditemInput!) {
    createUseditem(createUseditemInput: $createUseditemInput) {
      _id
      images
    }
  }
`;

export const useMutationCreateUsedItem = (): MutationTuple<
  Pick<IMutation, "createUseditem">,
  IMutationCreateUseditemArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  return result;
};
