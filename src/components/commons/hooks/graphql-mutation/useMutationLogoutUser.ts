import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  OperationVariables,
  gql,
  useMutation,
} from "@apollo/client";
import { IMutation } from "../../../../commons/types/generated/types";

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export const useLogoutUser = (): MutationTuple<
  Pick<IMutation, "logoutUser">,
  OperationVariables,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<Pick<IMutation, "logoutUser">>(LOGOUT_USER);

  return result;
};
