import { OperationVariables, QueryResult, gql, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

export const FETCH_BOARD_BEST = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        address
        zipcode
      }
      createdAt
    }
  }
`;

export const useQueryFetchBoardsOfTheBest = (): QueryResult<
  Pick<IQuery, "fetchBoardsOfTheBest">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchBoardsOfTheBest">>(
    FETCH_BOARD_BEST,
    {
      fetchPolicy: "cache-first",
    }
  );

  return result;
};
