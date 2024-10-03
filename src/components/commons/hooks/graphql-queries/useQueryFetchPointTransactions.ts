import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchPointTransactionsArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_POINT_TRANSACTIONS = gql`
  query fetchPointTransactions($page: Int, $search: String) {
    fetchPointTransactions(page: $page, search: $search) {
      _id
      impUid
      amount
      balance
      status
      createdAt
    }
  }
`;

export const useQueryFetchPointTransactions = (): QueryResult<
  Pick<IQuery, "fetchPointTransactions">,
  IQueryFetchPointTransactionsArgs
> => {
  const result = useQuery<
    Pick<IQuery, "fetchPointTransactions">,
    IQueryFetchPointTransactionsArgs
  >(FETCH_POINT_TRANSACTIONS);

  return result;
};

// { fetchPolicy: "cache-and-network" }로 다른 사람의 계정으로 로그인 해서
// 새로운 데이터를 가져왔음 - 단 해당 데이터를 계속 새로운 data를 가져옴 불 필요한 API 요청.

// 그래서 로그아웃을 할 때 ApolloClient의 cache를 초기화 해 다시 새로 데이터 받아오도록 함
//   - LayoutHeader의 로그아웃 실행함수 참고
// 이렇게 해서 한 번만 data 요청을 하고 로그아웃 전 까지 cache data 사용으로
// 추가 API 요청 없음
