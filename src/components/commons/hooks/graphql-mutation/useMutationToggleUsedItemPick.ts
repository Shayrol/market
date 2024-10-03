import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationToggleUseditemPickArgs,
} from "../../../../commons/types/generated/types";

export const TOGGLE_USED_ITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

export const useMutationToggleUsedItemPick = (): MutationTuple<
  Pick<IMutation, "toggleUseditemPick">,
  IMutationToggleUseditemPickArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const result = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USED_ITEM_PICK);

  return result;
};
