import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
} from "../../../../commons/types/generated/types";

const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      # buyer {
      #   _id
      #   name
      #   email
      #   createdAt
      # }
      seller {
        _id
        name
        createdAt
      }
      soldAt
      createdAt
    }
  }
`;

export const useMutationCreatePointTransactionOfBuyingAndSelling =
  (): MutationTuple<
    Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs,
    DefaultContext,
    ApolloCache<any>
  > => {
    const result = useMutation<
      Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
      IMutationCreatePointTransactionOfBuyingAndSellingArgs
    >(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING);

    return result;
  };
