import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

export const FETCH_POINT_TRANSACTIONS_COUNT_OF_LOAD = gql`
  query fetchPointTransactionsCountOfLoading {
    fetchPointTransactionsCountOfLoading
  }
`;

export const useQueryFetchPointTransactionsCountOfLoad = (): QueryResult<
  Pick<IQuery, "fetchPointTransactionsCountOfLoading">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchPointTransactionsCountOfLoading">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_LOAD
  );

  return result;
};
