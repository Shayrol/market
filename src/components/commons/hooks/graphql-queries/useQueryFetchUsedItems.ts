import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($isSoldout: Boolean, $search: String, $page: Int) {
    fetchUseditems(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      # buyer
      seller {
        _id
        name
        picture
      }
      soldAt
      createdAt
      pickedCount
    }
  }
`;

export const useQueryFetchUsedItems = (): QueryResult<
  Pick<IQuery, "fetchUseditems">,
  IQueryFetchUseditemsArgs
> => {
  const result = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS);

  return result;
};
