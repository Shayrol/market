import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
} from "../../../../commons/types/generated/types";

const CREATE_USED_ITEM_QUESTION = gql`
  mutation createUseditemQuestion(
    $createUseditemQuestionInput: CreateUseditemQuestionInput!
    $useditemId: ID!
  ) {
    createUseditemQuestion(
      createUseditemQuestionInput: $createUseditemQuestionInput
      useditemId: $useditemId
    ) {
      _id
      contents
      # useditem {
      #   _id
      #   name
      #   remarks
      #   contents
      #   price
      #   images
      # }
      user {
        _id
        email
        name
      }
      createdAt
    }
  }
`;

export const useMutationCreateUsedItemQuestion = (): MutationTuple<
  Pick<IMutation, "createUseditemQuestion">,
  IMutationCreateUseditemQuestionArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION);

  return result;
};
