import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemsIPickedArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_USED_ITEMS_I_PICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
        lat
        lng
        createdAt
      }
      buyer {
        _id
        email
        name
        picture
      }
      seller {
        _id
        email
        name
        picture
      }
      soldAt
      createdAt
    }
  }
`;

export const useQueryFetchUsedItemsIPicked = (): QueryResult<
  Pick<IQuery, "fetchUseditemsIPicked">,
  IQueryFetchUseditemsIPickedArgs
> => {
  const result = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USED_ITEMS_I_PICKED, { variables: { search: "", page: 1 } });

  return result;
};
