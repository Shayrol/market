import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

const FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING = gql`
  query fetchPointTransactionsCountOfSelling {
    fetchPointTransactionsCountOfSelling
  }
`;

export const useQueryFetchPointTransactionsCountOfSelling = (): QueryResult<
  Pick<IQuery, "fetchPointTransactionsCountOfSelling">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchPointTransactionsCountOfSelling">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING
  );

  return result;
};
