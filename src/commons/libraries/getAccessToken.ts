// graphql-request 버전을 7.0.1에서 6.1.0으로 수정을 하니 됨...
// refetchToken으로 새로운 accessToken을 발급받는 곳
// ApolloSetting에서도 실행하기 위해 graphQLClient를 사용한다.
//

import { GraphQLClient, gql } from "graphql-request";
import { IMutation } from "../types/generated/types";

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphQLClient = new GraphQLClient(
      "https://backend-practice.codebootcamp.co.kr/graphql",
      // credentials: "include"는 위의 url로 API 요청을 할 때
      // 쿠키와 같은 자격증명 정보를 보낸다.
      // same-origin와 omit 옵션도 있음
      { credentials: "include" }
    );
    const result = await graphQLClient.request<
      Pick<IMutation, "restoreAccessToken">
    >(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(`오류: ${error.message}`);
  }
};
