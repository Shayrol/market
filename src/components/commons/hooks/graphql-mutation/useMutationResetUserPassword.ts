import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationResetUserPasswordArgs,
} from "../../../../commons/types/generated/types";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

export const useMutationResetUserPassword = (): MutationTuple<
  Pick<IMutation, "resetUserPassword">,
  IMutationResetUserPasswordArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "resetUserPassword">,
    IMutationResetUserPasswordArgs
  >(RESET_USER_PASSWORD);

  return result;
};
