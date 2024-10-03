import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

const FETCH_USED_ITEMS_COUNT_I_SOLID = gql`
  query fetchUseditemsCountISold {
    fetchUseditemsCountISold
  }
`;

export const useQueryFetchUsedItemsCountISold = (): QueryResult<
  Pick<IQuery, "fetchUseditemsCountISold">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchUseditemsCountISold">>(
    FETCH_USED_ITEMS_COUNT_I_SOLID
  );

  return result;
};
