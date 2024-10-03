import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
} from "../../../../commons/types/generated/types";

const CREATE_USED_ITEM_QUESTION_ANSWER = gql`
  mutation createUseditemQuestionAnswer(
    $useditemQuestionId: ID!
    $createUseditemQuestionAnswerInput: CreateUseditemQuestionAnswerInput!
  ) {
    createUseditemQuestionAnswer(
      useditemQuestionId: $useditemQuestionId
      createUseditemQuestionAnswerInput: $createUseditemQuestionAnswerInput
    ) {
      _id
      contents
      useditemQuestion {
        _id
        #   # contents
        #   useditem {
        #     _id
        #   }
      }
      user {
        _id
        name
      }
      createdAt
    }
  }
`;

export const useMutationCreateUsedItemQuestionAnswer = (): MutationTuple<
  Pick<IMutation, "createUseditemQuestionAnswer">,
  IMutationCreateUseditemQuestionAnswerArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEM_QUESTION_ANSWER);

  return result;
};
