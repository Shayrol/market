import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

export const FETCH_USED_ITEMS_OF_THE_BEST = gql`
  query fetchUseditemsOfTheBest {
    fetchUseditemsOfTheBest {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      createdAt
      seller {
        _id
        name
        email
        picture
        # userPoint
        createdAt
      }
    }
  }
`;

export const useQueryFetchUsedItemsOfTheBest = (): QueryResult<
  Pick<IQuery, "fetchUseditemsOfTheBest">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchUseditemsOfTheBest">>(
    FETCH_USED_ITEMS_OF_THE_BEST
  );

  return result;
};
