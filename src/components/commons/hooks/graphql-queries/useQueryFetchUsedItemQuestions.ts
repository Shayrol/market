import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";

export const FETCH_USED_ITEM_QUESTIONS = gql`
  query fetchUseditemQuestions($page: Int, $useditemId: ID!) {
    fetchUseditemQuestions(page: $page, useditemId: $useditemId) {
      _id
      contents
      useditem {
        _id
        # name
        # remarks
        # contents
        # price
        # tags
        # images
        # pickedCount
      }
      user {
        _id
        email
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchUsedItemQuestions = (): QueryResult<
  Pick<IQuery, "fetchUseditemQuestions">,
  IQueryFetchUseditemQuestionsArgs
> => {
  const router = useRouter();
  const result = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: { page: 1, useditemId: String(router.query.useditemId) },
  });

  return result;
};
