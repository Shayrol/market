import { QueryResult, gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      createdAt
    }
  }
`;

export const useQueryFetchBoard = (): QueryResult<
  Pick<IQuery, "fetchBoard">,
  IQueryFetchBoardArgs
> => {
  const router = useRouter();
  const result = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: String(router.query.boardId),
      },
    }
  );

  return result;
};
