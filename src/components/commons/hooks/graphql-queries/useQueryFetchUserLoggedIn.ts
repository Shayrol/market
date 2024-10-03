import { OperationVariables, QueryResult, gql, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";

export const QUERY_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
        createdAt
      }
    }
  }
`;

export const useQueryFetchUserLoggedIn = (): QueryResult<
  Pick<IQuery, "fetchUserLoggedIn">,
  OperationVariables
> => {
  const result = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(
    QUERY_USER_LOGGED_IN,
    {
      fetchPolicy: "cache-first",
    }
  );

  return result;
};
