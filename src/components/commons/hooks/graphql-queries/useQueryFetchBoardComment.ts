import { QueryResult, gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";

export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export const useQueryFetchBoardComment = (): QueryResult<
  Pick<IQuery, "fetchBoardComments">,
  IQueryFetchBoardCommentsArgs
> => {
  const router = useRouter();
  const result = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });

  return result;
};
