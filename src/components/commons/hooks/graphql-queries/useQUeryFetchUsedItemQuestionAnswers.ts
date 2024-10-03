import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_USED_ITEM_QUESTION_ANSWERS = gql`
  query fetchUseditemQuestionAnswers($page: Int, $useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(
      page: $page
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      useditemQuestion {
        _id
      }
      user {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

// 해당 variables는 댓글의 id값을 가져와야한다. - 해당 컴포넌트에서는 해당 컴포넌트에
// 선언하고 직접 id 넣음
export const useFetchUsedItemQuestionAnswers = (): QueryResult<
  Pick<IQuery, "fetchUseditemQuestionAnswers">,
  IQueryFetchUseditemQuestionAnswersArgs
> => {
  const result = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTION_ANSWERS);

  return result;
};
