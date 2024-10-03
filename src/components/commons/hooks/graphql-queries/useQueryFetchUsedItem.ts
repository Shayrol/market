import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";

export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
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

export const useQueryFetchUsedItem = (): QueryResult<
  Pick<IQuery, "fetchUseditem">,
  IQueryFetchUseditemArgs
> => {
  const router = useRouter();

  const result = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.useditemId as string },
    // skip: !router.query.useditemId,
  });

  return result;
};

// import { gql, QueryResult, useQuery } from "@apollo/client";
// import { useMemo } from "react";
// import {
//   IQuery,
//   IQueryFetchUseditemArgs,
// } from "../../../../commons/types/generated/types";
// import { useRouter } from "next/router";

// const FETCH_USED_ITEM = gql`
//   query fetchUseditem($useditemId: ID!) {
//     fetchUseditem(useditemId: $useditemId) {
//       _id
//       name
//       remarks
//       contents
//       price
//       tags
//       images
//       pickedCount
//       useditemAddress {
//         zipcode
//         address
//         addressDetail
//         lat
//         lng
//       }
//       buyer {
//         _id
//         email
//         name
//       }
//       seller {
//         _id
//         email
//         name
//       }
//       soldAt
//       createdAt
//     }
//   }
// `;

// export const useQueryFetchUsedItem = (): QueryResult<
//   Pick<IQuery, "fetchUseditem">,
//   IQueryFetchUseditemArgs
// > => {
//   const router = useRouter();

//   const queryOptions = useMemo(
//     () => ({
//       variables: { useditemId: router.query.useditemId as string },
//       skip: !router.query.useditemId,
//     }),
//     [router.query.useditemId]
//   );

//   const result = useQuery<
//     Pick<IQuery, "fetchUseditem">,
//     IQueryFetchUseditemArgs
//   >(FETCH_USED_ITEM, queryOptions);

//   return result;
// };
