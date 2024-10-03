import { QueryResult, gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const useQueryFetchBoards = (): QueryResult<
  Pick<IQuery, "fetchBoards">,
  IQueryFetchBoardsArgs
> => {
  const result = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  return result;
};
