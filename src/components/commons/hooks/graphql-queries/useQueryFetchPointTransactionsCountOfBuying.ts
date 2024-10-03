import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

export const FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING = gql`
  query fetchPointTransactionsCountOfBuying {
    fetchPointTransactionsCountOfBuying
  }
`;

export const useQueryFetchPointTransactionsCountOfBuying = (): QueryResult<
  Pick<IQuery, "fetchPointTransactionsCountOfBuying">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchPointTransactionsCountOfBuying">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING
  );

  return result;
};
