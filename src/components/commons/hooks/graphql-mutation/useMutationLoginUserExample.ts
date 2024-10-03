import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  OperationVariables,
  gql,
  useMutation,
} from "@apollo/client";
import { IMutation } from "../../../../commons/types/generated/types";

const LOGIN_USER_EXAMPLE = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const useMutationLoginUserExample = (): MutationTuple<
  Pick<IMutation, "loginUserExample">,
  OperationVariables,
  DefaultContext,
  ApolloCache<any>
> => {
  const result =
    useMutation<Pick<IMutation, "loginUserExample">>(LOGIN_USER_EXAMPLE);

  return result;
};
