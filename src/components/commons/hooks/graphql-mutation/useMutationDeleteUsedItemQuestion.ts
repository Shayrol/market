import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
} from "../../../../commons/types/generated/types";

const DELETE_USED_ITEM_QUESTION = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;

export const useMutationDeleteUsedItemQuestion = (): MutationTuple<
  Pick<IMutation, "deleteUseditemQuestion">,
  IMutationDeleteUseditemQuestionArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  return result;
};
