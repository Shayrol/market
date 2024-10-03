import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  gql,
  useMutation,
} from "@apollo/client";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../../commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export const useMutationUploadFile = (): MutationTuple<
  Pick<IMutation, "uploadFile">,
  IMutationUploadFileArgs,
  DefaultContext,
  ApolloCache<any>
> => {
  const resultUploadFile = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  return resultUploadFile;
};
