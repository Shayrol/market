import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemsISoldArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_USED_ITEMS_I_SOLD = gql`
  query fetchUseditemsISold($search: String, $page: Int) {
    fetchUseditemsISold(search: $search, page: $page) {
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

export const useQueryFetchUsedItemsISold = (): QueryResult<
  Pick<IQuery, "fetchUseditemsISold">,
  IQueryFetchUseditemsISoldArgs
> => {
  const result = useQuery<
    Pick<IQuery, "fetchUseditemsISold">,
    IQueryFetchUseditemsISoldArgs
  >(FETCH_USED_ITEMS_I_SOLD);

  return result;
};
