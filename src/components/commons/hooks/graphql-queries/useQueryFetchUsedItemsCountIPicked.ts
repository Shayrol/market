import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

const FETCH_USED_ITEMS_COUNT_I_PICKED = gql`
  query fetchUseditemsCountIPicked {
    fetchUseditemsCountIPicked
  }
`;

export const useQueryFetchUsedItemsCountIPicked = (): QueryResult<
  Pick<IQuery, "fetchUseditemsCountIPicked">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchUseditemsCountIPicked">>(
    FETCH_USED_ITEMS_COUNT_I_PICKED
  );

  return result;
};
