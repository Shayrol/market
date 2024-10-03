import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  OperationVariables,
  gql,
  useMutation,
} from "@apollo/client";
import { IMutation } from "../../../../commons/types/generated/types";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const useMutationLoginUser = (): MutationTuple<
  Pick<IMutation, "loginUser">,
  OperationVariables,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<Pick<IMutation, "loginUser">>(LOGIN_USER);

  return result;
};
