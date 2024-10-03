import { QueryResult, gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export const useQueryFetchBoardsCount = (): QueryResult<
  Pick<IQuery, "fetchBoardsCount">,
  IQueryFetchBoardsCountArgs
> => {
  const result = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  return result;
};
