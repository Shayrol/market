import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationUpdateUserArgs,
} from "../../../../commons/types/generated/types";

const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      name
      picture
    }
  }
`;

export const useMutationUpdateUser = (): MutationTuple<
  Pick<IMutation, "updateUser">,
  IMutationUpdateUserArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);

  return result;
};
